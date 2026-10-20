import type {
  Board,
  DesignPort,
  DesignState,
  ElementDetails,
  GuestEvent,
  Panel,
  Selection,
  Tool,
} from "../contracts";
import { parseCanvas, serializeCanvas, type CanvasData } from "./canvas";
import { TemplateModel } from "./TemplateModel";

interface HistoryEntry {
  canvas: Record<string, unknown>;
  files: Record<string, string>;
  selection?: Selection;
  elementIndex?: number;
}

const emptyRect = { x: 0, y: 0, w: 0, h: 0 };
const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));
const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

/** 画布事实、历史与保存唯一 owner；构造不做 I/O，UI 只订阅快照。 */
export class DesignService {
  private state: DesignState = {
    status: "loading",
    title: "设计画布",
    boards: [],
    camera: { x: -60, y: -80, scale: 0.5 },
    tool: "select",
    panel: "properties",
    panelOpen: true,
    layers: [],
    previews: {},
    canUndo: false,
    canRedo: false,
    save: "saved",
    revision: 0,
  };
  private readonly listeners = new Set<() => void>();
  private canvas: CanvasData = {
    title: "设计画布",
    boards: [],
    original: { v: 3, boards: {}, order: [] },
  };
  private files: Record<string, string> = {};
  private models = new Map<string, TemplateModel>();
  private past: HistoryEntry[] = [];
  private future: HistoryEntry[] = [];
  private epoch = 0;
  private initializationRequest = 0;
  private disposed = false;
  private saveRequested = false;
  private saveTask: Promise<void> | undefined;

  constructor(private readonly port: DesignPort) {}

  getSnapshot = (): DesignState => this.state;

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  async initialize(): Promise<void> {
    const request = ++this.initializationRequest;
    this.disposed = false;
    this.setState({ status: "loading", error: undefined });
    // 先让已获准的旧写入结束，再读取新设计，避免迟到写覆盖新加载的事实。
    if (this.saveTask) await this.flush();
    if (this.disposed || request !== this.initializationRequest) return;
    const epoch = ++this.epoch;
    try {
      const loaded = await this.port.load();
      if (!this.isCurrent(epoch)) return;
      const canvas = parseCanvas(loaded.canvas, loaded.files);
      const models = new Map<string, TemplateModel>();
      for (const board of canvas.boards)
        models.set(board.file, new TemplateModel(loaded.files[board.file]));
      this.canvas = canvas;
      this.models = models;
      this.files = { ...loaded.files };
      this.past = [];
      this.future = [];
      this.saveRequested = false;
      const selection = canvas.boards[0]
        ? { file: canvas.boards[0].file }
        : undefined;
      this.refresh({
        status: "ready",
        error: undefined,
        selection,
        element: undefined,
        save: "saved",
        revision: 0,
      });
    } catch (error) {
      if (this.isCurrent(epoch))
        this.setState({ status: "error", error: errorMessage(error) });
    }
  }

  dispose(): void {
    this.disposed = true;
    this.epoch++;
    this.initializationRequest++;
    this.saveRequested = false;
    this.listeners.clear();
  }

  setTool(tool: Tool): void {
    this.setState({ tool });
  }
  setPanel(panel: Panel): void {
    this.setState({ panel, panelOpen: true });
  }
  togglePanel(): void {
    this.setState({ panelOpen: !this.state.panelOpen });
  }

  selectBoard(file: string): void {
    if (!this.models.has(file)) return;
    this.refresh({ selection: { file }, element: undefined });
  }

  selectLayer(tid: string): void {
    const file = this.state.selection?.file;
    if (!file || !this.models.get(file)?.getElement(tid)) return;
    this.refresh({ selection: { file, tid }, element: undefined });
  }

  updateBoard(file: string, patch: Partial<Board>): void {
    if (!this.canvas.boards.some((board) => board.file === file)) return;
    this.mutate(() => {
      this.canvas.boards = this.canvas.boards.map((board) => {
        if (board.file !== file) return board;
        const next = { ...board };
        for (const property of ["x", "y", "w", "h"] as const) {
          const value = patch[property];
          if (value !== undefined) {
            if (
              !Number.isFinite(value) ||
              ((property === "w" || property === "h") && value < 1)
            )
              throw new Error("画板位置和尺寸必须有效，宽高至少为 1。");
            next[property] = value;
          }
        }
        if (patch.title !== undefined) next.title = patch.title;
        if (patch.page !== undefined) next.page = patch.page;
        return next;
      });
    });
  }

  updateElementStyle(style: string): void {
    this.editSelection((model, tid) => model.setStyle(tid, style));
  }

  updateElementProperty(property: string, value: string): void {
    this.editSelection((model, tid) =>
      model.setStyleProperty(tid, property, value),
    );
  }

  updateElementText(text: string): void {
    this.editSelection((model, tid) => model.setText(tid, text));
  }

  getSource(file = this.state.selection?.file): string {
    return file
      ? this.models.get(file)?.serialize() || this.files[file] || ""
      : "";
  }

  updateSource(file: string, source: string): void {
    if (!this.models.has(file)) return;
    if (this.getSource(file) === source) return;
    this.mutate(() => {
      const model = new TemplateModel(source);
      this.models.set(file, model);
      this.files[file] = model.serialize();
      this.state = { ...this.state, selection: { file }, element: undefined };
    });
  }

  pan(dx: number, dy: number): void {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
    const camera = this.state.camera;
    this.setState({
      camera: {
        ...camera,
        x: camera.x - dx / camera.scale,
        y: camera.y - dy / camera.scale,
      },
    });
  }

  zoomAt(factor: number, screenX: number, screenY: number): void {
    if (
      !Number.isFinite(factor) ||
      factor <= 0 ||
      !Number.isFinite(screenX) ||
      !Number.isFinite(screenY)
    )
      return;
    const camera = this.state.camera;
    const scale = clamp(camera.scale * factor, 0.05, 40);
    const x = camera.x + screenX / camera.scale - screenX / scale;
    const y = camera.y + screenY / camera.scale - screenY / scale;
    this.setState({ camera: { x, y, scale } });
  }

  fit(width: number, height: number): void {
    if (!this.canvas.boards.length || width <= 0 || height <= 0) return;
    const left = Math.min(...this.canvas.boards.map((board) => board.x));
    const top = Math.min(...this.canvas.boards.map((board) => board.y));
    const right = Math.max(
      ...this.canvas.boards.map((board) => board.x + board.w),
    );
    const bottom = Math.max(
      ...this.canvas.boards.map((board) => board.y + board.h),
    );
    const scale = clamp(
      Math.min(
        Math.max(1, width - 120) / (right - left),
        Math.max(1, height - 120) / (bottom - top),
      ),
      0.05,
      2,
    );
    this.setState({
      camera: {
        scale,
        x: (left + right) / 2 - width / scale / 2,
        y: (top + bottom) / 2 - height / scale / 2,
      },
    });
  }

  undo(): void {
    this.travel(this.past, this.future);
  }
  redo(): void {
    this.travel(this.future, this.past);
  }

  addBoard(): void {
    this.mutate(() => {
      let index = 1;
      while (this.files[`Artboard-${index}.dc.html`] !== undefined) index++;
      const file = `Artboard-${index}.dc.html`;
      const x = this.canvas.boards.length
        ? Math.max(...this.canvas.boards.map((board) => board.x + board.w)) + 80
        : 0;
      const board: Board = {
        file,
        title: `画板 ${index}`,
        x,
        y: 0,
        w: 800,
        h: 600,
      };
      const source = `<!doctype html>\n<html lang="zh-CN">\n<head><meta charset="utf-8"><title>画板 ${index}</title><script src="./support.js"></script></head>\n<body>\n<x-dc>\n<helmet><style>body{margin:0;background:#fff}</style></helmet>\n<div style="min-height:100%;box-sizing:border-box;padding:48px;background:#fff;color:#1f1f1f;font-family:system-ui,sans-serif"><h1 style="margin:0;font-size:32px">新的画板</h1><p style="font-size:16px;color:#6e6e6e">双击文字开始编辑，或从工具栏添加内容。</p></div>\n</x-dc>\n<script type="text/x-dc" data-dc-script>class Component extends DCLogic { renderVals() { return {}; } }</script>\n</body>\n</html>\n`;
      this.canvas.boards = [...this.canvas.boards, board];
      this.models.set(file, new TemplateModel(source));
      this.files[file] = source;
      this.state = {
        ...this.state,
        selection: { file },
        element: undefined,
        tool: "select",
      };
    });
  }

  deleteSelection(): void {
    const selection = this.state.selection;
    if (!selection) return;
    this.mutate(() => {
      if (selection.tid) {
        this.models.get(selection.file)?.remove(selection.tid);
        this.state = {
          ...this.state,
          selection: { file: selection.file },
          element: undefined,
        };
      } else {
        this.canvas.boards = this.canvas.boards.filter(
          (board) => board.file !== selection.file,
        );
        this.models.delete(selection.file);
        delete this.files[selection.file];
        const file = this.canvas.boards[0]?.file;
        this.state = {
          ...this.state,
          selection: file ? { file } : undefined,
          element: undefined,
        };
      }
    });
  }

  receiveGuest(file: string, event: GuestEvent): void {
    if (this.state.status !== "ready" || !this.models.has(file)) return;
    if (
      (event.type === "text" ||
        event.type === "pick" ||
        event.type === "inspect" ||
        event.type === "insert") &&
      (!("revision" in event) || event.revision !== this.state.revision)
    )
      return;
    const model = this.models.get(file);
    if (!model) return;
    if (event.type === "pan") this.pan(event.dx, event.dy);
    if (event.type === "zoom") {
      const board = this.canvas.boards.find(
        (candidate) => candidate.file === file,
      );
      if (!board) return;
      const camera = this.state.camera;
      this.zoomAt(
        event.factor,
        (board.x - camera.x + event.x) * camera.scale,
        (board.y - camera.y + event.y) * camera.scale,
      );
    }
    if (event.type === "pick" || event.type === "inspect") {
      const tid = event.type === "pick" ? event.tid : event.details.tid;
      const fact = model.getElement(tid);
      if (!fact) return;
      if (
        event.type === "inspect" &&
        (this.state.selection?.file !== file ||
          this.state.selection.tid !== tid)
      )
        return;
      this.refresh({
        selection: { file, tid },
        element: { ...event.details, ...fact },
      });
    }
    if (event.type === "text") {
      if (!model.getElement(event.tid)) return;
      // 文字提交可能由较晚的 Host 选择触发；保存旧编辑不能夺回当前选区。
      this.mutate(() => model.setText(event.tid, event.text));
    }
    if (event.type === "insert") {
      this.mutate(() => {
        const tid = model.insert(event.kind, event.x, event.y);
        this.state = {
          ...this.state,
          selection: { file, tid },
          element: undefined,
          tool: "select",
        };
      });
    }
  }

  retrySave(): void {
    if (this.state.status !== "ready" || this.disposed) return;
    this.requestSave();
  }

  async flush(): Promise<void> {
    while (this.saveTask) await this.saveTask;
  }

  private editSelection(
    change: (model: TemplateModel, tid: string) => void,
  ): void {
    const selection = this.state.selection;
    if (!selection?.tid) return;
    const model = this.models.get(selection.file);
    if (!model) return;
    const tid = selection.tid;
    this.mutate(() => change(model, tid));
  }

  private mutate(change: () => void): void {
    if (this.state.status !== "ready" || this.disposed) return;
    const previous = this.capture();
    try {
      change();
      const next = this.capture();
      if (
        JSON.stringify(previous.canvas) === JSON.stringify(next.canvas) &&
        JSON.stringify(previous.files) === JSON.stringify(next.files)
      )
        return;
      this.past.push(previous);
      if (this.past.length > 100) this.past.shift();
      this.future = [];
      this.refresh({ revision: this.state.revision + 1, error: undefined });
      this.requestSave();
    } catch (error) {
      this.restore(previous);
      this.refresh({ error: errorMessage(error) });
    }
  }

  private travel(from: HistoryEntry[], to: HistoryEntry[]): void {
    if (!from.length || this.state.status !== "ready" || this.disposed) return;
    const target = from[from.length - 1];
    const previous = this.capture();
    try {
      this.restore(target);
      from.pop();
      to.push(previous);
      this.refresh({
        revision: this.state.revision + 1,
        error: undefined,
        element: undefined,
      });
      this.requestSave();
    } catch (error) {
      this.restore(previous);
      this.refresh({ error: errorMessage(error) });
    }
  }

  private capture(): HistoryEntry {
    const files = { ...this.files };
    for (const [file, model] of this.models) files[file] = model.serialize();
    const selection = this.state.selection;
    const elementIndex = selection?.tid
      ? this.models
          .get(selection.file)
          ?.getLayers()
          .findIndex((layer) => layer.id === selection.tid)
      : undefined;
    return {
      canvas: serializeCanvas(this.canvas),
      files,
      selection: selection ? { file: selection.file } : undefined,
      ...(elementIndex !== undefined && elementIndex >= 0
        ? { elementIndex }
        : {}),
    };
  }

  private restore(entry: HistoryEntry): void {
    const canvas = parseCanvas(entry.canvas, entry.files);
    const models = new Map<string, TemplateModel>();
    for (const board of canvas.boards)
      models.set(board.file, new TemplateModel(entry.files[board.file]));
    this.canvas = canvas;
    this.files = { ...entry.files };
    this.models = models;
    const selectedFile = entry.selection?.file;
    const selectedTid =
      selectedFile !== undefined && entry.elementIndex !== undefined
        ? models.get(selectedFile)?.getLayers()[entry.elementIndex]?.id
        : undefined;
    const selection = selectedFile
      ? { file: selectedFile, ...(selectedTid ? { tid: selectedTid } : {}) }
      : undefined;
    this.state = { ...this.state, selection, element: undefined };
  }

  private refresh(patch: Partial<DesignState> = {}): void {
    const selection =
      patch.selection !== undefined ? patch.selection : this.state.selection;
    const model = selection ? this.models.get(selection.file) : undefined;
    const fact = selection?.tid ? model?.getElement(selection.tid) : undefined;
    const measured =
      patch.element === undefined ? this.state.element : patch.element;
    const element: ElementDetails | undefined = fact
      ? {
          ...fact,
          rect: measured?.tid === fact.tid ? measured.rect : emptyRect,
          computed: measured?.tid === fact.tid ? measured.computed : {},
        }
      : undefined;
    const previews: Record<string, string> = {};
    for (const [file, template] of this.models)
      previews[file] = template.preview();
    this.setState({
      ...patch,
      title: this.canvas.title,
      boards: this.canvas.boards.map((board) => ({ ...board })),
      layers: model?.getLayers() || [],
      previews,
      element,
      canUndo: this.past.length > 0,
      canRedo: this.future.length > 0,
    });
  }

  private requestSave(): void {
    this.saveRequested = true;
    this.setState({ save: "saving", error: undefined });
    if (this.saveTask) return;
    const epoch = this.epoch;
    this.saveTask = this.drainSaves(epoch).finally(() => {
      this.saveTask = undefined;
      if (this.saveRequested && !this.disposed && this.state.status === "ready")
        this.requestSave();
    });
  }

  private async drainSaves(epoch: number): Promise<void> {
    while (this.saveRequested && this.isCurrent(epoch)) {
      this.saveRequested = false;
      const snapshot = this.capture();
      const revision = this.state.revision;
      try {
        await this.port.save(snapshot.canvas, snapshot.files);
        if (!this.isCurrent(epoch)) return;
        if (!this.saveRequested && revision === this.state.revision)
          this.setState({ save: "saved", error: undefined });
      } catch (error) {
        if (!this.isCurrent(epoch)) return;
        if (!this.saveRequested && revision === this.state.revision)
          this.setState({
            save: "error",
            error: `保存失败：${errorMessage(error)}`,
          });
      }
    }
  }

  private isCurrent(epoch: number): boolean {
    return !this.disposed && this.epoch === epoch;
  }

  private setState(patch: Partial<DesignState>): void {
    if (this.disposed) return;
    this.state = { ...this.state, ...patch };
    for (const listener of this.listeners) listener();
  }
}
