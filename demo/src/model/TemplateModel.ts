import type { Layer } from "../contracts";
import { assertStaticDocument, isTextEditableElement } from "./staticTemplate";

export interface TemplateElement {
  tid: string;
  tag: string;
  label: string;
  style: string;
  text: string;
  textEditable: boolean;
}

const editorAttribute = "data-dc-tpl";
const nonvisualTags = new Set([
  "helmet",
  "style",
  "script",
  "meta",
  "link",
  "title",
]);

function labelOf(element: Element): string {
  const name = element.getAttribute("aria-label") || element.getAttribute("id");
  if (name) return name;
  const text = (element.textContent || "").replace(/\s+/g, " ").trim();
  return text ? text.slice(0, 48) : element.tagName.toLowerCase();
}

function templateRange(source: string): { start: number; end: number } {
  let cursor = 0;
  let start: number | undefined;
  let end: number | undefined;
  while (cursor < source.length) {
    const offset = source.indexOf("<", cursor);
    if (offset === -1) break;
    if (source.startsWith("<!--", offset)) {
      const commentEnd = source.indexOf("-->", offset + 4);
      if (commentEnd === -1) break;
      cursor = commentEnd + 3;
      continue;
    }
    const token = /^<(\/?)([a-z][\w:-]*)/i.exec(source.slice(offset));
    if (!token && !["!", "?"].includes(source[offset + 1])) {
      cursor = offset + 1;
      continue;
    }
    let quote = "";
    let boundary = offset + 1;
    for (; boundary < source.length; boundary++) {
      const character = source[boundary];
      if (quote) {
        if (character === quote) quote = "";
      } else if (character === '"' || character === "'") quote = character;
      else if (character === ">") break;
    }
    if (boundary >= source.length) break;
    cursor = boundary + 1;
    if (!token) continue;
    const name = token[2].toLowerCase();
    const closing = token[1] === "/";
    if (name === "x-dc") {
      if (closing) {
        if (start === undefined || end !== undefined)
          throw new Error("画板的 <x-dc> 起止标签不匹配。");
        end = offset;
      } else {
        if (start !== undefined || /\/\s*>$/.test(source.slice(offset, cursor)))
          throw new Error("每份画板文件只允许一个完整的 <x-dc> 模板。");
        start = cursor;
      }
    }
    if (
      !closing &&
      [
        "script",
        "style",
        "textarea",
        "title",
        "xmp",
        "iframe",
        "noembed",
        "noframes",
      ].includes(name)
    ) {
      const rawClosing = new RegExp(`</${name}\\s*>`, "ig");
      rawClosing.lastIndex = cursor;
      const match = rawClosing.exec(source);
      cursor = match ? match.index + match[0].length : source.length;
    }
  }
  if (start === undefined || end === undefined)
    throw new Error("画板必须包含一个完整的 <x-dc> 模板。");
  return { start, end };
}

/** 只编辑 detached 模板；保存时原样保留模板两侧的脚手架和 Logic。 */
export class TemplateModel {
  private static instanceCount = 0;
  private readonly instanceId = `t${++TemplateModel.instanceCount}`;
  private nextTid = 0;
  private readonly template: HTMLTemplateElement;
  private readonly prefix: string;
  private readonly suffix: string;
  private readonly byTid = new Map<string, Element>();
  private cleanContent: string;
  private changed = false;

  constructor(source: string) {
    const { start, end } = templateRange(source);
    const parsed = new DOMParser().parseFromString(source, "text/html");
    const templates = parsed.querySelectorAll("x-dc");
    if (templates.length !== 1)
      throw new Error("画板需要且只能包含一个 x-dc 模板。");
    assertStaticDocument(parsed, templates[0]);
    this.prefix = source.slice(0, start);
    this.suffix = source.slice(end);
    this.cleanContent = source.slice(start, end);
    this.template = document.createElement("template");
    this.template.innerHTML = this.cleanContent;
    this.changed =
      this.template.content.querySelector(`[${editorAttribute}]`) !== null;
    this.restamp();
  }

  serialize(): string {
    if (this.changed) {
      const clone = this.template.content.cloneNode(true);
      if (!(clone instanceof DocumentFragment))
        throw new Error("模板副本创建失败。");
      for (const element of clone.querySelectorAll(`[${editorAttribute}]`))
        element.removeAttribute(editorAttribute);
      const holder = document.createElement("template");
      holder.content.append(clone);
      this.cleanContent = holder.innerHTML;
      this.changed = false;
    }
    return this.prefix + this.cleanContent + this.suffix;
  }

  preview(): string {
    return this.prefix + this.template.innerHTML + this.suffix;
  }

  getLayers(): Layer[] {
    const layers: Layer[] = [];
    const walk = (parent: ParentNode, depth: number): void => {
      for (const child of Array.from(parent.children)) {
        if (nonvisualTags.has(child.tagName.toLowerCase())) continue;
        const id = child.getAttribute(editorAttribute);
        if (!id) continue;
        layers.push({
          id,
          tag: child.tagName.toLowerCase(),
          label: labelOf(child),
          depth,
          hidden:
            child.hasAttribute("hidden") ||
            /(?:^|;)\s*display\s*:\s*none(?:\s*!important)?\s*(?:;|$)/i.test(
              child.getAttribute("style") || "",
            ),
        });
        walk(child, depth + 1);
      }
    };
    walk(this.template.content, 0);
    return layers;
  }

  getElement(tid: string): TemplateElement | undefined {
    const element = this.byTid.get(tid);
    if (!element || nonvisualTags.has(element.tagName.toLowerCase()))
      return undefined;
    return {
      tid,
      tag: element.tagName.toLowerCase(),
      label: labelOf(element),
      style: element.getAttribute("style") || "",
      text: element.textContent || "",
      textEditable: isTextEditableElement(element),
    };
  }

  setStyle(tid: string, style: string): void {
    const element = this.requireElement(tid);
    if (element.getAttribute("style") === style) return;
    if (style.trim()) element.setAttribute("style", style);
    else element.removeAttribute("style");
    this.changed = true;
  }

  setStyleProperty(tid: string, property: string, value: string): void {
    const element = this.requireElement(tid);
    if (
      !/^(?:[a-z][a-z0-9]*(?:-[a-z0-9]+)*|-(?:webkit|moz|ms|o)-[a-z0-9-]+|--[A-Za-z_][A-Za-z0-9_-]*)$/.test(
        property,
      )
    ) {
      throw new Error("CSS 属性名必须是小写标准属性或 -- 自定义属性。");
    }
    if (!(element instanceof HTMLElement) && !(element instanceof SVGElement))
      throw new Error("此元素不支持 CSS 样式编辑。");
    const probe = document.createElement("div").style;
    probe.setProperty(property, "initial");
    if (!probe.getPropertyValue(property))
      throw new Error(`浏览器不支持 CSS 属性：${property}`);
    const removing = value.trim() === "";
    if (!removing) {
      probe.removeProperty(property);
      probe.setProperty(property, value);
      if (!probe.getPropertyValue(property))
        throw new Error(`无效的 CSS 值：${property}: ${value}`);
    }
    const previous = element.getAttribute("style");
    if (removing) {
      element.style.setProperty(property, "");
      element.style.removeProperty(property);
    } else element.style.setProperty(property, value);
    if (!element.style.length) element.removeAttribute("style");
    if (element.getAttribute("style") !== previous) this.changed = true;
  }

  setText(tid: string, text: string): void {
    const element = this.requireElement(tid);
    // 容器文本替换会销毁子图层，必须通过源码显式修改结构。
    if (element.children.length > 0)
      throw new Error(
        "此元素包含子图层，请选中文字叶节点，或在源码面板修改结构。",
      );
    if (!isTextEditableElement(element))
      throw new Error("此元素不能保存文字内容，请选择文字元素。");
    if (element.textContent === text) return;
    element.textContent = text;
    this.changed = true;
  }

  remove(tid: string): void {
    this.requireElement(tid).remove();
    this.changed = true;
    this.restamp();
  }

  insert(kind: "text" | "rectangle" | "note", x: number, y: number): string {
    if (!Number.isFinite(x) || !Number.isFinite(y))
      throw new Error("插入位置必须是有限坐标。");
    const element = document.createElement("div");
    const geometry = `position: absolute; left: ${Math.round(x)}px; top: ${Math.round(y)}px; box-sizing: border-box;`;
    if (kind === "rectangle") {
      element.setAttribute(
        "style",
        `${geometry} width: 160px; height: 100px; background: #dbeafe; border: 1px solid #93c5fd; border-radius: 8px;`,
      );
      element.setAttribute("aria-label", "矩形");
    } else if (kind === "note") {
      element.setAttribute(
        "style",
        `${geometry} width: 220px; min-height: 140px; padding: 20px; background: #fff3b0; color: #53451e; font: 16px/1.5 system-ui, sans-serif; box-shadow: 0 3px 12px #00000014;`,
      );
      element.textContent = "写下一条便笺";
    } else {
      element.setAttribute(
        "style",
        `${geometry} min-width: 100px; padding: 4px; color: #1f1f1f; font: 24px/1.4 system-ui, sans-serif;`,
      );
      element.textContent = "输入文字";
    }
    this.template.content.append(element);
    this.changed = true;
    this.restamp();
    const tid = element.getAttribute(editorAttribute);
    if (!tid) throw new Error("新增元素未获得模板编号。");
    return tid;
  }

  private requireElement(tid: string): Element {
    const element = this.byTid.get(tid);
    if (!element || !this.getElement(tid))
      throw new Error("选中的模板元素已不存在。");
    return element;
  }

  private restamp(): void {
    const previous = new Map(this.byTid);
    this.byTid.clear();
    for (const element of this.template.content.querySelectorAll("*")) {
      const old = element.getAttribute(editorAttribute);
      // 同一模板内保留存活元素编号；不同模板实例永不复用旧消息的寻址。
      const tid =
        old && previous.get(old) === element
          ? old
          : `${this.instanceId}-${++this.nextTid}`;
      element.setAttribute(editorAttribute, tid);
      this.byTid.set(tid, element);
    }
  }
}
