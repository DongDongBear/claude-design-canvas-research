import { beforeEach, describe, expect, it } from "vitest";
import type { DesignPort } from "./contracts";
import { TemplateModel } from "./model/TemplateModel";
import { DesignService } from "./model/DesignService";
import {
  BrowserDesignPort,
  DESIGN_STORAGE_KEY,
} from "./services/BrowserDesignPort";

const FILE = "Fixture.dc.html";
const LOGIC =
  '<script type="text/x-dc" data-dc-script>\nclass Component extends DCLogic { renderVals() { return {}; } }\n</script>';
const SCAFFOLD_SCRIPT =
  "<script>globalThis.__designContractLogicRan = true;</script>";
const HTML = `<!doctype html><html><head><title>Fixture</title>${SCAFFOLD_SCRIPT}</head><body><x-dc><helmet><style>button { font: inherit; }</style></helmet><main><button style="color: blue">Hello</button></main></x-dc>${LOGIC}</body></html>`;

function fixture(title = "Contract fixture") {
  return {
    canvas: {
      v: 3,
      title,
      boards: { [FILE]: { title: "Fixture", x: 0, y: 0, w: 400, h: 300 } },
      order: [FILE],
      pages: [],
    },
    files: { [FILE]: HTML },
  };
}

function deferred<T>() {
  let settle: ((value: T) => void) | undefined;
  let fail: ((reason: Error) => void) | undefined;
  const promise = new Promise<T>((resolve, reject) => {
    settle = resolve;
    fail = reject;
  });
  return {
    promise,
    resolve(value: T) {
      if (!settle) throw new Error("Deferred 尚未初始化");
      settle(value);
    },
    reject(error: Error) {
      if (!fail) throw new Error("Deferred 尚未初始化");
      fail(error);
    },
  };
}

class ControlledPort implements DesignPort {
  readonly saved: Array<{ canvas: unknown; files: Record<string, string> }> =
    [];
  loadHandler: DesignPort["load"] = async () => fixture();
  saveHandler: DesignPort["save"] = async () => {};
  load() {
    return this.loadHandler();
  }
  async save(canvas: unknown, files: Record<string, string>) {
    this.saved.push({ canvas: structuredClone(canvas), files: { ...files } });
    await this.saveHandler(canvas, files);
  }
}

function buttonTid(model: TemplateModel): string {
  const button = model.getLayers().find((layer) => layer.tag === "button");
  if (!button) throw new Error("缺少测试按钮");
  return button.id;
}

describe("TemplateModel 的发布事实", () => {
  it("预览和层索引不污染原件，Logic 保留且不会被执行", () => {
    const model = new TemplateModel(HTML);
    const initial = model.serialize();
    expect(initial).toContain(LOGIC);
    expect(initial).toContain(SCAFFOLD_SCRIPT);
    expect(model.preview()).toContain("Hello");
    expect(model.preview()).toContain("data-dc-tpl=");
    expect(model.getLayers().some((layer) => layer.tag === "button")).toBe(
      true,
    );
    expect(model.serialize()).toBe(initial);
    expect(model.serialize()).not.toContain("data-dc-tpl=");
    expect(Object.hasOwn(globalThis, "__designContractLogicRan")).toBe(false);
  });

  it("文本与样式编辑经序列化重载后保持，同时保留外层 scaffold", () => {
    const model = new TemplateModel(HTML);
    const tid = buttonTid(model);
    model.setText(tid, "Edited content");
    model.setStyle(tid, "color: red; font-weight: 600");
    const saved = model.serialize();
    expect(saved).toContain(LOGIC);
    expect(saved).toContain("<title>Fixture</title>");
    expect(saved).toContain("button { font: inherit; }");
    expect(saved).not.toContain("data-dc-tpl=");
    const reloaded = new TemplateModel(saved);
    const button = reloaded.getElement(buttonTid(reloaded));
    expect(button?.text).toBe("Edited content");
    expect(button?.style).toContain("color: red");
  });
});

describe("DesignService 的真实注入 consumer", () => {
  it("load 失败呈现错误，并可用同一 consumer 重新初始化", async () => {
    const port = new ControlledPort();
    port.loadHandler = async () => {
      throw new Error("fixture read denied");
    };
    const service = new DesignService(port);
    await service.initialize();
    expect(service.getSnapshot().status).toBe("error");
    expect(service.getSnapshot().error).toContain("fixture read denied");
    port.loadHandler = async () => fixture();
    await service.initialize();
    expect(service.getSnapshot().status).toBe("ready");
    expect(service.getSnapshot().error).toBeUndefined();
    service.dispose();
  });

  it("load 后编辑、撤销、重做，保存最终文件而非预览 markup", async () => {
    const port = new ControlledPort();
    const service = new DesignService(port);
    await service.initialize();
    expect(service.getSnapshot().status).toBe("ready");
    service.selectBoard(FILE);
    const layer = service
      .getSnapshot()
      .layers.find((item) => item.tag === "button");
    if (!layer) throw new Error("层索引未绑定");
    service.selectLayer(layer.id);
    service.updateElementText("Persisted text");
    service.updateElementStyle("color: red");
    expect(service.getSnapshot().canUndo).toBe(true);
    service.undo();
    const undone = new TemplateModel(service.getSource(FILE));
    expect(undone.getElement(buttonTid(undone))?.style).toContain("blue");
    service.redo();
    await service.flush();
    expect(service.getSnapshot().save).toBe("saved");
    const last = port.saved.at(-1);
    expect(last?.files[FILE]).toContain("Persisted text");
    expect(last?.files[FILE]).toContain(LOGIC);
    expect(last?.files[FILE]).toContain("color: red");
    service.dispose();
  });

  it("存储失败如实呈现并允许同一模型重试", async () => {
    const port = new ControlledPort();
    port.saveHandler = async () => {
      throw new Error("fixture quota exhausted");
    };
    const service = new DesignService(port);
    await service.initialize();
    service.updateBoard(FILE, { title: "Unsaved title" });
    await service.flush();
    expect(service.getSnapshot().save).toBe("error");
    expect(service.getSnapshot().error).toContain("fixture quota exhausted");
    port.saveHandler = async () => {};
    service.retrySave();
    await service.flush();
    expect(service.getSnapshot().save).toBe("saved");
    expect(service.getSnapshot().boards[0]?.title).toBe("Unsaved title");
    service.dispose();
  });

  it("单属性编辑保留其他 inline CSS，空值只移除目标属性并保存", async () => {
    const port = new ControlledPort();
    const service = new DesignService(port);
    await service.initialize();
    const button = service
      .getSnapshot()
      .layers.find((layer) => layer.tag === "button");
    if (!button) throw new Error("缺少属性图层");
    service.selectLayer(button.id);
    expect(service.getSnapshot().element?.textEditable).toBe(true);
    service.updateElementProperty("opacity", "0.5");
    await service.flush();
    const saved = port.saved.at(-1)?.files[FILE];
    if (!saved) throw new Error("属性变更未进入保存 consumer");
    const edited = new DOMParser()
      .parseFromString(saved, "text/html")
      .querySelector("button");
    expect(edited?.style.getPropertyValue("opacity")).toBe("0.5");
    expect(edited?.style.getPropertyValue("color")).toBe("blue");
    service.updateElementProperty("opacity", "");
    await service.flush();
    const removed = new DOMParser()
      .parseFromString(service.getSource(FILE), "text/html")
      .querySelector("button");
    expect(removed?.style.getPropertyValue("opacity")).toBe("");
    expect(removed?.style.getPropertyValue("color")).toBe("blue");
    expect(port.saved.at(-1)?.files[FILE]).toBe(service.getSource(FILE));
    service.dispose();
  });

  it("无效 CSS 如实报错且不新增历史、revision 或保存", async () => {
    const port = new ControlledPort();
    const service = new DesignService(port);
    await service.initialize();
    const button = service
      .getSnapshot()
      .layers.find((layer) => layer.tag === "button");
    if (!button) throw new Error("缺少待验证图层");
    service.selectLayer(button.id);
    const before = service.getSnapshot();
    const source = service.getSource(FILE);
    service.updateElementProperty("color", "definitely-not-a-color");
    await service.flush();
    expect(service.getSnapshot().error).toBeTruthy();
    expect(service.getSnapshot().revision).toBe(before.revision);
    expect(service.getSnapshot().canUndo).toBe(false);
    expect(service.getSnapshot().canRedo).toBe(false);
    expect(service.getSource(FILE)).toBe(source);
    expect(port.saved).toHaveLength(0);
    service.dispose();
  });

  it("旧 load 的迟到结果不能覆盖更新 scope", async () => {
    const port = new ControlledPort();
    const first = deferred<Awaited<ReturnType<DesignPort["load"]>>>();
    let loads = 0;
    port.loadHandler = () =>
      ++loads === 1 ? first.promise : Promise.resolve(fixture("Second scope"));
    const service = new DesignService(port);
    const obsolete = service.initialize();
    await service.initialize();
    first.resolve(fixture("Stale scope"));
    await obsolete;
    expect(service.getSnapshot().title).toBe("Second scope");
    service.dispose();
  });

  it("重新初始化先等待已授权旧 save 完成，再读取持久化事实", async () => {
    const port = new ControlledPort();
    const pending = deferred<void>();
    const operations: string[] = [];
    let persisted: Awaited<ReturnType<DesignPort["load"]>> = fixture();
    port.loadHandler = async () => {
      operations.push("load");
      return persisted;
    };
    port.saveHandler = async (canvas, files) => {
      operations.push("save-start");
      await pending.promise;
      persisted = { canvas, files };
      operations.push("save-finish");
    };
    const service = new DesignService(port);
    await service.initialize();
    service.updateBoard(FILE, { title: "Saved before reinitialization" });
    const initializing = service.initialize();
    expect(operations).toEqual(["load", "save-start"]);
    pending.resolve();
    await initializing;
    expect(operations).toEqual(["load", "save-start", "save-finish", "load"]);
    expect(service.getSnapshot().boards[0]?.title).toBe(
      "Saved before reinitialization",
    );
    service.dispose();
  });

  it("dispose 后未完成 load 不能回写或通知", async () => {
    const port = new ControlledPort();
    const pending = deferred<Awaited<ReturnType<DesignPort["load"]>>>();
    port.loadHandler = () => pending.promise;
    const service = new DesignService(port);
    let notifications = 0;
    service.subscribe(() => {
      notifications += 1;
    });
    const loading = service.initialize();
    service.dispose();
    const before = notifications;
    pending.resolve(fixture());
    await loading;
    expect(notifications).toBe(before);
    expect(service.getSnapshot().status).not.toBe("ready");
  });

  it("旧 revision 保存失败不能覆盖新 revision 的成功状态", async () => {
    const port = new ControlledPort();
    const pending = deferred<void>();
    let saves = 0;
    port.saveHandler = () =>
      ++saves === 1 ? pending.promise : Promise.resolve();
    const service = new DesignService(port);
    await service.initialize();
    const errors: string[] = [];
    service.subscribe(() => {
      if (service.getSnapshot().save === "error")
        errors.push(service.getSnapshot().error ?? "error");
    });
    service.updateBoard(FILE, { title: "First revision" });
    await Promise.resolve();
    service.updateBoard(FILE, { title: "Latest revision" });
    pending.reject(new Error("obsolete save failed"));
    await service.flush();
    expect(service.getSnapshot().boards[0]?.title).toBe("Latest revision");
    expect(service.getSnapshot().save).toBe("saved");
    expect(errors).toEqual([]);
    service.dispose();
  });

  it("dispose 后旧 save 的失败不能回写或通知", async () => {
    const port = new ControlledPort();
    const pending = deferred<void>();
    port.saveHandler = () => pending.promise;
    const service = new DesignService(port);
    await service.initialize();
    let notifications = 0;
    service.subscribe(() => {
      notifications += 1;
    });
    service.updateBoard(FILE, { title: "Pending save" });
    const saving = service.flush();
    service.dispose();
    const before = service.getSnapshot();
    const count = notifications;
    pending.reject(new Error("disposed save failed"));
    await saving;
    expect(service.getSnapshot()).toBe(before);
    expect(notifications).toBe(count);
  });

  it("被删除图层的旧 guest tid 不得命中另一存活图层", async () => {
    const port = new ControlledPort();
    port.loadHandler = async () => ({
      ...fixture(),
      files: {
        [FILE]: HTML.replace(
          '<button style="color: blue">Hello</button>',
          "<button>A</button><button>B</button>",
        ),
      },
    });
    const service = new DesignService(port);
    await service.initialize();
    const first = service
      .getSnapshot()
      .layers.find((layer) => layer.tag === "button");
    if (!first) throw new Error("缺少待删除图层");
    service.selectLayer(first.id);
    service.deleteSelection();
    const before = service.getSource(FILE);
    service.receiveGuest(FILE, {
      channel: "canvas-reconstruction",
      type: "text",
      revision: service.getSnapshot().revision,
      tid: first.id,
      text: "stale mutation",
    });
    await service.flush();
    expect(service.getSource(FILE)).toBe(before);
    expect(service.getSource(FILE)).toContain(">B</button>");
    service.dispose();
  });

  it("同一 tid 的旧 revision 文本消息不能覆盖更新的属性编辑", async () => {
    const port = new ControlledPort();
    const service = new DesignService(port);
    await service.initialize();
    const button = service
      .getSnapshot()
      .layers.find((layer) => layer.tag === "button");
    if (!button) throw new Error("缺少文本图层");
    service.selectLayer(button.id);
    const previousRevision = service.getSnapshot().revision;
    service.updateElementText("Props B");
    service.receiveGuest(FILE, {
      channel: "canvas-reconstruction",
      type: "text",
      revision: previousRevision,
      tid: button.id,
      text: "Queued A",
    });
    expect(service.getSource(FILE)).toContain("Props B");
    expect(service.getSource(FILE)).not.toContain("Queued A");
    service.receiveGuest(FILE, {
      channel: "canvas-reconstruction",
      type: "text",
      revision: service.getSnapshot().revision,
      tid: button.id,
      text: "Current C",
    });
    await service.flush();
    expect(service.getSource(FILE)).toContain("Current C");
    service.dispose();
  });

  it("同内容源码提交不清理选区，也不产生重复保存", async () => {
    const port = new ControlledPort();
    const service = new DesignService(port);
    await service.initialize();
    const button = service
      .getSnapshot()
      .layers.find((layer) => layer.tag === "button");
    if (!button) throw new Error("缺少源码选区");
    service.selectLayer(button.id);
    const before = service.getSnapshot();
    service.updateSource(FILE, service.getSource(FILE));
    await service.flush();
    expect(service.getSnapshot().selection).toEqual(before.selection);
    expect(service.getSnapshot().revision).toBe(before.revision);
    expect(port.saved).toHaveLength(0);
    service.dispose();
  });
});

describe("BrowserDesignPort 仅 mock 同源外部 I/O", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("首次只读取两个静态原件，save 单个 envelope，重载优先保存数据", async () => {
    const requests: string[] = [];
    const initialCanvas = fixture().canvas;
    const referenceCanvas = {
      ...initialCanvas,
      boards: { "Composed.dc.html": initialCanvas.boards[FILE] },
      order: ["Composed.dc.html"],
    };
    const request: typeof fetch = async (input) => {
      requests.push(String(input));
      return new Response(
        String(input).endsWith(".json")
          ? JSON.stringify(referenceCanvas)
          : HTML,
      );
    };
    const port = new BrowserDesignPort(window.localStorage, request);
    const service = new DesignService(port);
    await service.initialize();
    expect(service.getSnapshot().status).toBe("ready");
    expect(requests).toEqual([
      "/reference/canvas.json",
      "/reference/Composed.dc.html",
    ]);
    expect(service.getSource("Composed.dc.html")).toBe(HTML);
    await port.save(fixture("Saved fixture").canvas, fixture().files);
    expect(window.localStorage.length).toBe(1);
    expect(port.exportSaved()).toBe(
      window.localStorage.getItem(DESIGN_STORAGE_KEY),
    );
    expect((await port.load()).canvas).toEqual(fixture("Saved fixture").canvas);
    expect(requests).toHaveLength(2);
    port.resetSaved();
    expect(port.exportSaved()).toBeNull();
    service.dispose();
  });

  it("坏 envelope、schema 和缺失文件拒绝读取且不覆盖坏数据", async () => {
    const request: typeof fetch = async () => {
      throw new Error("不应读取参考文件");
    };
    const port = new BrowserDesignPort(window.localStorage, request);
    for (const serialized of [
      "{",
      "null",
      '{"schema":2}',
      '{"schema":1,"canvas":{}}',
      '{"schema":1,"canvas":{},"files":{"A.dc.html":4}}',
    ]) {
      window.localStorage.setItem(DESIGN_STORAGE_KEY, serialized);
      await expect(port.load()).rejects.toThrow();
      expect(window.localStorage.getItem(DESIGN_STORAGE_KEY)).toBe(serialized);
    }
  });

  it("setItem 失败抛给 Service，已保存 aggregate 不被拆分或清空", async () => {
    const previous = JSON.stringify({ schema: 1, ...fixture() });
    let stored = previous;
    let writes = 0;
    const storage = {
      getItem: () => stored,
      setItem: () => {
        writes += 1;
        throw new Error("storage denied");
      },
      removeItem: () => {
        stored = "";
      },
    };
    const request: typeof fetch = async () => {
      throw new Error("不应发起请求");
    };
    const port = new BrowserDesignPort(storage, request);
    await expect(port.save(fixture().canvas, fixture().files)).rejects.toThrow(
      "storage denied",
    );
    expect(writes).toBe(1);
    expect(stored).toBe(previous);
  });

  it("删除最后画板后的空文件集合可保存，缺失映射仍非法", async () => {
    const request: typeof fetch = async () => {
      throw new Error("不应发起请求");
    };
    const port = new BrowserDesignPort(window.localStorage, request);
    const canvas = { v: 3, title: "Empty design", boards: {}, order: [] };
    await port.save(canvas, {});
    expect(await port.load()).toEqual({ canvas, files: {} });
  });
});
