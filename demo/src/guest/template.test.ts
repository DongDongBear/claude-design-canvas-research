import { describe, expect, it } from "vitest";
import { parseStaticTemplate } from "./template";

const logic =
  '<script type="text/x-dc" data-dc-script>class Component extends DCLogic { renderVals() { return {}; } }</script>';

describe("静态 x-dc 运行边界", () => {
  it("保留模板编号与 helmet 样式，同时移除脚本、事件和嵌入页面", () => {
    const template = parseStaticTemplate(
      `<title>原始画板</title><x-dc><helmet><style onload="alert(1)">h1 {color:blue}</style><title>画板标题</title></helmet><h1 data-dc-tpl="1" onclick="alert(1)">Hello</h1><a data-dc-tpl="2" href="javascript:alert(1)">Link</a><iframe src="/other"></iframe><script>throw new Error('should not execute')</script></x-dc>${logic}`,
    );
    expect(template.title).toBe("画板标题");
    expect(template.head[0]?.textContent).toContain("color:blue");
    expect(template.head[0]?.hasAttribute("onload")).toBe(false);
    expect(
      template.content.querySelector('[data-dc-tpl="1"]')?.textContent,
    ).toBe("Hello");
    expect(
      template.content.querySelector("[onclick],iframe,script,helmet"),
    ).toBeNull();
    expect(template.content.querySelector("a")?.hasAttribute("href")).toBe(
      false,
    );
  });

  it("动态 Logic 或绑定明确拒绝，不静默伪装成静态页面", () => {
    expect(() =>
      parseStaticTemplate("<x-dc><div>{{name}}</div></x-dc>"),
    ).toThrow("动态模板绑定");
    expect(() =>
      parseStaticTemplate('<x-dc><div sc-if="show">Hello</div></x-dc>'),
    ).toThrow("动态模板绑定");
    expect(() =>
      parseStaticTemplate(
        '<x-dc><h1>Hello</h1></x-dc><script type="text/x-dc">class Component extends DCLogic { renderVals() { return { name: "Hello" }; } }</script>',
      ),
    ).toThrow("动态行为");
    expect(() => parseStaticTemplate("<x-dc></x-dc><x-dc></x-dc>")).toThrow(
      "只能包含一个",
    );
  });
});
