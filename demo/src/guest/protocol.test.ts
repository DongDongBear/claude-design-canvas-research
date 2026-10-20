import { describe, expect, it } from "vitest";
import { isGuestCommand } from "./protocol";

const channel = "canvas-reconstruction";

describe("Guest 命令边界", () => {
  it("只接受三种完整的受限命令", () => {
    expect(
      isGuestCommand({
        channel,
        type: "document",
        file: "Main.dc.html",
        html: "<x-dc />",
        selectedTid: "t1-12",
        tool: "select",
        revision: 3,
      }),
    ).toBe(true);
    expect(isGuestCommand({ channel, type: "select" })).toBe(true);
    expect(isGuestCommand({ channel, type: "tool", tool: "hand" })).toBe(true);
  });

  it("拒绝未知字段、工具、非法编号和过大文档", () => {
    expect(
      isGuestCommand({ channel, type: "select", tid: "1", html: "surprise" }),
    ).toBe(false);
    expect(isGuestCommand({ channel, type: "tool", tool: "execute" })).toBe(
      false,
    );
    expect(isGuestCommand({ channel, type: "select", tid: '1\"] body' })).toBe(
      false,
    );
    expect(
      isGuestCommand({
        channel,
        type: "document",
        file: "Main.dc.html",
        html: "x".repeat(5_000_001),
        tool: "select",
        revision: 0,
      }),
    ).toBe(false);
    expect(
      isGuestCommand({
        channel,
        type: "document",
        file: "Main.dc.html",
        html: "",
        tool: "select",
        selectedTid: null,
        revision: 0,
      }),
    ).toBe(false);
  });

  it("文档代次必须存在且是非负安全整数", () => {
    const document = {
      channel,
      type: "document",
      file: "Main.dc.html",
      html: "<x-dc />",
      tool: "select",
    };
    expect(isGuestCommand(document)).toBe(false);
    expect(isGuestCommand({ ...document, revision: -1 })).toBe(false);
    expect(isGuestCommand({ ...document, revision: 0.5 })).toBe(false);
    expect(
      isGuestCommand({ ...document, revision: Number.MAX_SAFE_INTEGER + 1 }),
    ).toBe(false);
  });
});
