import { describe, expect, it } from "vitest";
import { TemplateModel } from "./TemplateModel";

const logic =
  '<script type="text/x-dc" data-dc-script>class Component extends DCLogic { renderVals() { return {}; } }</script>';
const documentOf = (content: string, opening = "<x-dc>"): string =>
  `<!doctype html><html><head><title>边界样本</title></head><body>${opening}${content}</x-dc>${logic}</body></html>`;

function paragraph(model: TemplateModel): string {
  const layer = model.getLayers().find((candidate) => candidate.tag === "p");
  if (!layer) throw new Error("边界样本缺少 p 图层。");
  return layer.id;
}

describe("模板源码边界回归", () => {
  it("起始标签的引号内大于号不影响模板区间，外层属性与 Logic 保持原字节", () => {
    const opening = "<x-dc data-note=\">ok\" data-other='a > b'>";
    const model = new TemplateModel(documentOf("<p>A</p>", opening));
    model.setText(paragraph(model), "B");
    expect(model.serialize()).toContain(`${opening}<p>B</p></x-dc>`);
    expect(model.serialize()).toContain(logic);
  });

  it("注释、脚本和文字中的假标签不冒充真实模板", () => {
    const before =
      '<!-- <x-dc>comment</x-dc> --><script>const sample = "<x-dc>string</x-dc>";</script>';
    const source = before + documentOf("<p>1 < 2</p>");
    const model = new TemplateModel(source);
    model.setText(paragraph(model), "真实文本");
    expect(model.serialize().startsWith(before)).toBe(true);
    expect(model.serialize()).toContain("<p>真实文本</p></x-dc>");
  });

  it("void 元素拒绝无法序列化的文字修改", () => {
    const model = new TemplateModel(documentOf('<input value="原值">'));
    const input = model
      .getLayers()
      .find((candidate) => candidate.tag === "input");
    if (!input) throw new Error("边界样本缺少 input 图层。");
    const source = model.serialize();
    expect(() => model.setText(input.id, "无法保存的文字")).toThrow(
      "不能保存文字",
    );
    expect(model.serialize()).toBe(source);
  });

  it("在模型提交前拒绝 Guest 无法运行的控制属性与动态 Logic", () => {
    expect(
      () => new TemplateModel(documentOf('<p sc-if="false">动态</p>')),
    ).toThrow("动态模板");
    expect(
      () =>
        new TemplateModel(
          documentOf("<p>静态</p>").replace(
            "return {};",
            "return { title: this.state.title };",
          ),
        ),
    ).toThrow("动态行为");
  });

  it("结构删除保留存活编号，源码重载生成新 scope 并清理原文中的内部编号", () => {
    const model = new TemplateModel(
      documentOf('<p data-dc-tpl="stale">A</p><p>B</p>'),
    );
    const layers = model.getLayers();
    const removed = layers[0].id;
    const survivor = layers[1].id;
    model.remove(removed);
    expect(model.getElement(removed)).toBeUndefined();
    expect(model.getElement(survivor)?.text).toBe("B");
    expect(model.serialize()).not.toContain("data-dc-tpl");
    const reloaded = new TemplateModel(model.serialize());
    expect(reloaded.getElement(survivor)).toBeUndefined();
  });

  it("单项 CSS 使用浏览器声明修改与移除，保留其他样式和自定义属性", () => {
    const model = new TemplateModel(
      documentOf('<p style="color: blue; margin: 4px; --accent: gold">A</p>'),
    );
    const tid = paragraph(model);
    model.setStyleProperty(tid, "font-size", "24px");
    model.setStyleProperty(tid, "--accent", "tomato");
    model.setStyleProperty(tid, "margin", "");
    const element = document.createElement("div");
    element.setAttribute("style", model.getElement(tid)?.style || "");
    expect(element.style.color).toBe("blue");
    expect(element.style.fontSize).toBe("24px");
    expect(element.style.getPropertyValue("--accent")).toBe("tomato");
    expect(element.style.getPropertyValue("margin")).toBe("");
  });

  it("无效 CSS 属性和值不会修改模板，文字可编辑性来自真实叶节点", () => {
    const model = new TemplateModel(
      documentOf('<main><p style="color:blue">A</p><input></main>'),
    );
    const tid = paragraph(model);
    const before = model.serialize();
    for (const property of [
      "backgroundColor",
      "color;display",
      "not-a-real-css-property",
    ]) {
      expect(() => model.setStyleProperty(tid, property, "red")).toThrow();
    }
    expect(() => model.setStyleProperty(tid, "width", "not-a-length")).toThrow(
      "无效的 CSS 值",
    );
    expect(model.serialize()).toBe(before);
    expect(model.getElement(tid)?.textEditable).toBe(true);
    for (const layer of model
      .getLayers()
      .filter(
        (candidate) => candidate.tag === "main" || candidate.tag === "input",
      )) {
      expect(model.getElement(layer.id)?.textEditable).toBe(false);
    }
  });
});
