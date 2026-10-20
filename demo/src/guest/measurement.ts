import type { ElementDetails } from "../contracts";
import { isTextEditableElement } from "../model/staticTemplate";

const computedProperties = [
  "display",
  "position",
  "width",
  "height",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "gap",
  "flex-grow",
  "color",
  "background-color",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "text-align",
  "border-radius",
  "border",
  "box-shadow",
  "opacity",
  "transform",
] as const;

export function measureElement(element: Element): ElementDetails {
  const rect = element.getBoundingClientRect();
  const computed = getComputedStyle(element);
  return {
    tid: element.getAttribute("data-dc-tpl") ?? "",
    tag: element.tagName.toLowerCase(),
    label:
      element.getAttribute("aria-label") ||
      element.id ||
      element.tagName.toLowerCase(),
    style: element.getAttribute("style") ?? "",
    text: element.textContent ?? "",
    textEditable: isTextEditableElement(element),
    rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
    computed: Object.fromEntries(
      computedProperties.map((key) => [key, computed.getPropertyValue(key)]),
    ),
  };
}
