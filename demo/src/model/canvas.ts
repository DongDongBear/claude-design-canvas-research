import type { Board } from "../contracts";

export interface CanvasData {
  title: string;
  boards: Board[];
  original: Record<string, unknown>;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function finite(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function parseCanvas(
  value: unknown,
  files: Record<string, string>,
): CanvasData {
  if (!isRecord(value) || !isRecord(value.boards))
    throw new Error("canvas.json 必须包含 boards 对象。");
  const boardMap = value.boards;
  const order = Array.isArray(value.order)
    ? value.order.filter((file): file is string => typeof file === "string")
    : [];
  const names = [
    ...new Set([
      ...order,
      ...Object.keys(boardMap),
      ...Object.keys(files).filter((file) => file.endsWith(".dc.html")),
    ]),
  ];
  const boards: Board[] = [];
  for (const file of names) {
    if (!file.endsWith(".dc.html")) continue;
    if (typeof files[file] !== "string")
      throw new Error(`画板文件不存在：${file}`);
    const entry = isRecord(boardMap[file]) ? boardMap[file] : {};
    boards.push({
      file,
      title:
        typeof entry.title === "string"
          ? entry.title
          : file.replace(/\.dc\.html$/, ""),
      x: finite(entry.x, boards.length * 880),
      y: finite(entry.y, 0),
      w: Math.max(1, finite(entry.w, 800)),
      h: Math.max(1, finite(entry.h, 600)),
      ...(typeof entry.page === "string" ? { page: entry.page } : {}),
    });
  }
  return {
    title: typeof value.title === "string" ? value.title : "设计画布",
    boards,
    original: structuredClone(value),
  };
}

export function serializeCanvas(data: CanvasData): Record<string, unknown> {
  const oldBoards = isRecord(data.original.boards) ? data.original.boards : {};
  const boards: Record<string, unknown> = {};
  for (const board of data.boards) {
    const oldValue = oldBoards[board.file];
    const old = isRecord(oldValue) ? structuredClone(oldValue) : {};
    const entry: Record<string, unknown> = {
      ...old,
      x: board.x,
      y: board.y,
      w: board.w,
      h: board.h,
      title: board.title,
    };
    if (board.page !== undefined) entry.page = board.page;
    boards[board.file] = entry;
  }
  return {
    ...structuredClone(data.original),
    title: data.title,
    boards,
    order: data.boards.map((board) => board.file),
  };
}
