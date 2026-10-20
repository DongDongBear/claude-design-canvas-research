import { assertStaticDocument } from "../model/staticTemplate";

export interface StaticTemplate {
  content: DocumentFragment;
  head: HTMLElement[];
  title: string;
}

const blockedTags =
  "script,iframe,frame,frameset,object,embed,base,meta,link,portal";
const resourceAttributes = new Set([
  "src",
  "href",
  "xlink:href",
  "poster",
  "action",
  "formaction",
]);

function resourceUrl(value: string): boolean {
  if (value.trim().startsWith("#")) return true;
  if (/^data:image\/(?:png|jpeg|gif|webp|svg\+xml);/i.test(value.trim()))
    return true;
  try {
    const url = new URL(value, location.href);
    return (
      url.origin === location.origin &&
      ["http:", "https:"].includes(url.protocol)
    );
  } catch {
    return false;
  }
}

function sanitizeTree(root: ParentNode): void {
  root.querySelectorAll(blockedTags).forEach((node) => node.remove());
  for (const element of root.querySelectorAll("*")) {
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase();
      if (
        name.startsWith("on") ||
        ["srcdoc", "srcset", "autofocus", "contenteditable"].includes(name)
      ) {
        element.removeAttribute(attribute.name);
      } else if (
        resourceAttributes.has(name) &&
        !resourceUrl(attribute.value)
      ) {
        element.removeAttribute(attribute.name);
      }
    }
    if (element.matches("a,button,input,textarea,select,[tabindex]"))
      element.setAttribute("tabindex", "-1");
  }
}

export function parseStaticTemplate(html: string): StaticTemplate {
  const source = new DOMParser().parseFromString(html, "text/html");
  const templates = source.querySelectorAll("x-dc");
  if (templates.length !== 1)
    throw new Error("画板需要且只能包含一个 x-dc 模板。");
  const template = templates[0];
  assertStaticDocument(source, template);
  const head: HTMLElement[] = [];
  let title = source.title || "静态模板画板";
  for (const helmet of template.querySelectorAll("helmet")) {
    for (const node of helmet.children) {
      if (node instanceof HTMLStyleElement) {
        const style = document.createElement("style");
        style.textContent = node.textContent;
        style.media = node.media;
        head.push(style);
      }
      if (node instanceof HTMLTitleElement) title = node.textContent ?? title;
      if (
        node instanceof HTMLLinkElement &&
        node.rel === "stylesheet" &&
        resourceUrl(node.href)
      ) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = node.href;
        head.push(link);
      }
    }
    helmet.remove();
  }
  sanitizeTree(template);
  const content = document.createDocumentFragment();
  for (const node of [...template.childNodes])
    content.append(document.importNode(node, true));
  return { content, head, title };
}
