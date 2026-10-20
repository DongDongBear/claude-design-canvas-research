import { describe, expect, it } from "vitest";
import type { DesignPort } from "../contracts";
import { DesignService } from "./DesignService";

const file = "Selection.dc.html";
const html = '<!doctype html><html><head><title>选择衔接</title></head><body><x-dc><p>A</p><p>B</p></x-dc></body></html>';

class SelectionPort implements DesignPort {
  savedFiles: Record<string, string> = {};

  async load() {
    return {
      canvas: { v: 3, title: "选择衔接", boards: { [file]: { x: 0, y: 0, w: 400, h: 300 } }, order: [file] },
      files: { [file]: html },
    };
  }

  async save(_canvas: unknown, files: Record<string, string>): Promise<void> {
    this.savedFiles = { ...files };
  }
}

describe("Host 选择与 Guest 文字提交衔接", () => {
  it("Host 已选择 B 后仍保存 A 的当前代次编辑，同时保留 B 选区", async () => {
    const port = new SelectionPort();
    const service = new DesignService(port);
    await service.initialize();
    const layers = service.getSnapshot().layers.filter(layer => layer.tag === "p");
    expect(layers).toHaveLength(2);
    const [a, b] = layers;
    service.selectLayer(a.id);
    const revision = service.getSnapshot().revision;
    service.selectLayer(b.id);
    service.receiveGuest(file, {
      channel: "canvas-reconstruction", type: "text", revision,
      tid: a.id, text: "A 已提交的编辑",
    });
    await service.flush();
    expect(service.getSource(file)).toContain("<p>A 已提交的编辑</p><p>B</p>");
    expect(port.savedFiles[file]).toContain("<p>A 已提交的编辑</p><p>B</p>");
    expect(service.getSnapshot().selection).toEqual({ file, tid: b.id });
    expect(service.getSnapshot().element?.text).toBe("B");
    expect(service.getSnapshot().canUndo).toBe(true);
    expect(service.getSnapshot().save).toBe("saved");
    service.dispose();
  });
});
