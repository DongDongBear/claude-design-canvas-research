const nonTextTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  "script",
  "style",
  "helmet",
  "title",
  "iframe",
  "object",
  "canvas",
  "audio",
  "video",
  "textarea",
  "select",
]);

export function isTextEditableElement(element: Element): boolean {
  return (
    element instanceof HTMLElement &&
    element.children.length === 0 &&
    !nonTextTags.has(element.tagName.toLowerCase())
  );
}

/** 模型提交和 Guest 渲染共享同一静态能力边界。 */
export function assertStaticDocument(
  source: Document,
  template: Element,
): void {
  if (
    /\{\{[\s\S]*?\}\}/.test(template.innerHTML) ||
    template.querySelector("x-import,template,sc-if,sc-for") ||
    [...template.querySelectorAll("*")].some(
      (element) =>
        element.tagName.toLowerCase().startsWith("sc-") ||
        [...element.attributes].some((attribute) =>
          /^(?:sc-|:|@)/.test(attribute.name),
        ),
    )
  ) {
    throw new Error(
      "此画板包含动态模板绑定。当前还原仅运行静态 x-dc，未执行原 Logic。",
    );
  }
  for (const script of source.querySelectorAll(
    'script[type="text/x-dc"],script[data-dc-script]',
  )) {
    const logic = (script.textContent ?? "").replace(/\s+/g, "");
    if (
      !/^classComponentextendsDCLogic\{renderVals\(\)\{return\{\};?\}\};?$/.test(
        logic,
      )
    ) {
      throw new Error(
        "此画板的 Logic 包含动态行为，当前还原无法执行。请使用静态模板。",
      );
    }
  }
}
