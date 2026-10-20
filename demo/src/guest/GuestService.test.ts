import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { GuestCommand, GuestEvent } from "../contracts";
import { GuestService } from "./GuestService";

class ResizeObserverStub {
  observe() {}
  disconnect() {}
}

const channel = "canvas-reconstruction";
const html =
  '<x-dc><p data-dc-tpl="t1-1">First</p><p data-dc-tpl="t1-2">Second</p></x-dc>';
let restore: (() => void) | undefined;
let stop: (() => void) | undefined;
let events: GuestEvent[];

function send(command: GuestCommand): void {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: command,
      origin: location.origin,
      source: window.parent,
    }),
  );
}

function documentCommand(revision: number, source = html): Extract<GuestCommand, { type: 'document' }> {
  return {
    channel,
    type: "document",
    revision,
    file: "Test.dc.html",
    html: source,
    selectedTid: "t1-1",
    tool: "select",
  };
}

function element(tid: string): HTMLElement {
  const item = document.querySelector(`[data-dc-tpl="${tid}"]`);
  if (!(item instanceof HTMLElement)) throw new Error("缺少测试节点");
  return item;
}

beforeEach(() => {
  events = [];
  const previousParent = Object.getOwnPropertyDescriptor(window, "parent");
  const previousFonts = Object.getOwnPropertyDescriptor(document, "fonts");
  const previousInnerText = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "innerText",
  );
  Object.defineProperty(window, "parent", {
    configurable: true,
    value: { postMessage: (event: GuestEvent) => events.push(event) },
  });
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: new EventTarget(),
  });
  // jsdom 没有布局；这里只补浏览器文本 I/O，不断言外观或像素。
  Object.defineProperty(HTMLElement.prototype, "innerText", {
    configurable: true,
    get() {
      return this.textContent ?? "";
    },
  });
  vi.stubGlobal("ResizeObserver", ResizeObserverStub);
  document.body.innerHTML =
    '<div id="guest"><main data-guest-surface></main><div data-guest-ring></div><div data-guest-error></div><div data-guest-hint></div></div>';
  const root = document.getElementById("guest");
  if (!root) throw new Error("缺少测试挂载点");
  stop = new GuestService(root).start();
  restore = () => {
    if (previousParent) Object.defineProperty(window, "parent", previousParent);
    if (previousFonts) Object.defineProperty(document, "fonts", previousFonts);
    else Reflect.deleteProperty(document, "fonts");
    if (previousInnerText)
      Object.defineProperty(
        HTMLElement.prototype,
        "innerText",
        previousInnerText,
      );
    else Reflect.deleteProperty(HTMLElement.prototype, "innerText");
  };
});

afterEach(() => {
  stop?.();
  restore?.();
  vi.unstubAllGlobals();
  document.body.replaceChildren();
});

describe("Guest 文本事务与文档代次", () => {
  it("提交文本后点击另一层，等新文档确认后再按新代次选择", () => {
    send(documentCommand(0));
    element("t1-1").dispatchEvent(
      new MouseEvent("dblclick", { bubbles: true }),
    );
    element("t1-1").textContent = "Changed";
    element("t1-2").dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true, button: 0 }),
    );
    expect(events.filter((event) => event.type === "text")).toEqual([
      { channel, type: "text", revision: 0, tid: "t1-1", text: "Changed" },
    ]);
    expect(events.some((event) => event.type === "pick")).toBe(false);
    send(documentCommand(1, html.replace("First", "Changed")));
    expect(
      events.filter((event) => event.type === "pick").at(-1),
    ).toMatchObject({ type: "pick", revision: 1, tid: "t1-2" });
  });

  it("同一HTML的其他画板变更仅推进代次，不丢掉当前草稿", () => {
    send(documentCommand(0));
    const first = element("t1-1");
    first.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    first.textContent = "Draft";
    send(documentCommand(1));
    expect(element("t1-1")).toBe(first);
    expect(first.textContent).toBe("Draft");
    first.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );
    expect(
      events.filter((event) => event.type === "text").at(-1),
    ).toMatchObject({ type: "text", revision: 1, text: "Draft" });
  });

  it("恢复为源码原文是无操作，后续选择无需等待不存在的新版本", () => {
    send(documentCommand(0));
    const first = element("t1-1");
    let rendered = "FIRST";
    Object.defineProperty(first, "innerText", {
      configurable: true,
      get: () => rendered,
    });
    first.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    rendered = "First";
    element("t1-2").dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true, button: 0 }),
    );
    expect(events.some((event) => event.type === "text")).toBe(false);
    expect(
      events.filter((event) => event.type === "pick").at(-1),
    ).toMatchObject({ revision: 0, tid: "t1-2" });
  });

  it("同源之外或非父窗口的文档命令不能替换画板", () => {
    const command = documentCommand(0);
    window.dispatchEvent(
      new MessageEvent("message", {
        data: command,
        origin: "https://foreign.invalid",
        source: window.parent,
      }),
    );
    window.dispatchEvent(
      new MessageEvent("message", {
        data: command,
        origin: location.origin,
        source: window,
      }),
    );
    expect(document.querySelector("[data-dc-tpl]")).toBeNull();
    send(command);
    expect(element("t1-1").textContent).toBe("First");
  });

  it("新父层选择优先于等待文本确认期间缓存的旧点击", () => {
    send(documentCommand(0));
    element("t1-1").dispatchEvent(
      new MouseEvent("dblclick", { bubbles: true }),
    );
    element("t1-1").textContent = "Changed";
    element("t1-2").dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true, button: 0 }),
    );
    send({ channel, type: "select", tid: undefined });
    send({
      ...documentCommand(1, html.replace("First", "Changed")),
      selectedTid: undefined,
    });
    expect(events.some((event) => event.type === "pick")).toBe(false);
  });
});
