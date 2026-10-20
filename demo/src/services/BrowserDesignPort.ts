import type { DesignPort } from "../contracts";

export const DESIGN_STORAGE_KEY = "claude-canvas-reconstruction:v1";

type BrowserStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type Snapshot = Awaited<ReturnType<DesignPort["load"]>>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertJson(value: unknown, depth = 0): void {
  if (depth > 64) throw new Error("保存数据嵌套过深");
  if (value === null || typeof value === "string" || typeof value === "boolean")
    return;
  if (typeof value === "number" && Number.isFinite(value)) return;
  if (Array.isArray(value)) {
    for (const entry of value) assertJson(entry, depth + 1);
    return;
  }
  if (
    isRecord(value) &&
    [Object.prototype, null].includes(Object.getPrototypeOf(value))
  ) {
    for (const entry of Object.values(value)) assertJson(entry, depth + 1);
    return;
  }
  throw new Error("画布保存数据必须是完整的 JSON 数据");
}

function snapshot(canvas: unknown, files: unknown): Snapshot {
  if (!isRecord(canvas)) throw new Error("画布数据缺失或格式无效");
  assertJson(canvas);
  if (!isRecord(files)) throw new Error("作品文件映射缺失");
  const result: Record<string, string> = {};
  for (const [name, content] of Object.entries(files)) {
    if (!name || name.includes("\0") || typeof content !== "string") {
      throw new Error("作品文件名或 HTML 内容无效");
    }
    Object.defineProperty(result, name, {
      value: content,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }
  return { canvas, files: result };
}

function decodeSaved(serialized: string): Snapshot {
  const value: unknown = JSON.parse(serialized);
  if (
    !isRecord(value) ||
    value.schema !== 1 ||
    !Object.hasOwn(value, "canvas")
  ) {
    throw new Error("浏览器保存数据版本或结构无效；请先导出备份，再显式重置");
  }
  return snapshot(value.canvas, value.files);
}

/** localStorage 是注入的同源外部 I/O mock；领域编辑、历史和规则由模型负责。 */
export class BrowserDesignPort implements DesignPort {
  constructor(
    private readonly storage: BrowserStorage,
    private readonly request: typeof fetch,
  ) {}

  async load(): Promise<Snapshot> {
    const saved = this.storage.getItem(DESIGN_STORAGE_KEY);
    if (saved !== null) return decodeSaved(saved);
    const [canvasResponse, htmlResponse] = await Promise.all([
      this.request("/reference/canvas.json"),
      this.request("/reference/Composed.dc.html"),
    ]);
    if (!canvasResponse.ok || !htmlResponse.ok)
      throw new Error("读取原始参考作品失败");
    const canvas: unknown = await canvasResponse.json();
    return snapshot(canvas, { "Composed.dc.html": await htmlResponse.text() });
  }

  async save(canvas: unknown, files: Record<string, string>): Promise<void> {
    const data = snapshot(canvas, files);
    // 单次 setItem 使 canvas 与所有文件共享一个原子替换边界；异常必须交给 Service 呈现。
    this.storage.setItem(
      DESIGN_STORAGE_KEY,
      JSON.stringify({ schema: 1, ...data }),
    );
  }

  exportSaved(): string | null {
    return this.storage.getItem(DESIGN_STORAGE_KEY);
  }

  resetSaved(): void {
    this.storage.removeItem(DESIGN_STORAGE_KEY);
  }
}
