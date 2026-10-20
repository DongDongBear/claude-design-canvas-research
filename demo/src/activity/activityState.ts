import type { Board, Camera } from "../contracts";

export type ActivityCursor =
  | { at: "none" }
  | { at: "tips"; rotate: boolean }
  | { at: "box" | "rest"; file: string };

export interface AwaitedBoard {
  spec: Board;
  page?: string;
  arriving?: boolean;
}
export interface ActivityInput {
  on: boolean;
  now: number;
  working: boolean;
  heard: boolean;
  lastProgressAt?: number;
  boxedThisTurn: boolean;
  arrivedThisTurn: boolean;
  boxed: readonly AwaitedBoard[];
  page?: string;
  pageEmpty: boolean;
  lastHere?: string;
  editing: boolean;
}
export interface ActivityProjection {
  boxes: readonly Board[];
  cursor: ActivityCursor;
  toCome: number;
  wakeAt?: number;
}

/** 对照原包 ADt：显式 working 优先，未收到活动事件时才使用进度超时。 */
export function deriveActivity(input: ActivityInput): ActivityProjection {
  if (!input.on) return { boxes: [], cursor: { at: "none" }, toCome: 0 };
  const expiresAt =
    input.lastProgressAt === undefined
      ? undefined
      : input.lastProgressAt + 600_000;
  const explicit = input.heard || input.working;
  const active = explicit
    ? input.working
    : expiresAt !== undefined && input.now < expiresAt;
  const here = active
    ? input.boxed.filter((board) => board.page === input.page)
    : [];
  const firstWaiting = here.find((board) => board.arriving !== true);
  const hadBoxes = input.boxedThisTurn || input.boxed.length > 0;
  const cursorExpiresAt =
    input.lastProgressAt === undefined
      ? undefined
      : input.lastProgressAt + 90_000;
  const fallbackCursor =
    !explicit &&
    active &&
    cursorExpiresAt !== undefined &&
    input.now < cursorExpiresAt;
  let cursor: ActivityCursor = { at: "none" };
  if ((input.working || fallbackCursor) && input.editing) {
    if (firstWaiting) cursor = { at: "box", file: firstWaiting.spec.file };
    else if (here.length > 0)
      cursor = { at: "box", file: here[here.length - 1].spec.file };
    else if (input.working) {
      if (input.pageEmpty) cursor = { at: "tips", rotate: !hadBoxes };
      else if (
        (hadBoxes || input.arrivedThisTurn) &&
        input.lastHere !== undefined
      )
        cursor = { at: "rest", file: input.lastHere };
    }
  }
  return {
    boxes: here.map((board) => board.spec),
    cursor,
    toCome: active ? input.boxed.length : 0,
    wakeAt:
      !active || explicit
        ? undefined
        : fallbackCursor && cursorExpiresAt !== undefined
          ? Math.min(cursorExpiresAt, expiresAt ?? cursorExpiresAt)
          : expiresAt,
  };
}

/** 对照原包 CDt：字形在屏幕中恒定，画板内偏移 18px，完成后停在上方 72px。 */
export function cursorScreenPosition(
  cursor: ActivityCursor,
  boxes: readonly Board[],
  boards: readonly Board[],
  camera: Camera,
): { left: number; top: number } | undefined {
  if (cursor.at !== "box" && cursor.at !== "rest") return undefined;
  const board = (cursor.at === "box" ? boxes : boards).find(
    (item) => item.file === cursor.file,
  );
  if (!board) return undefined;
  return {
    left: (board.x - camera.x) * camera.scale + (cursor.at === "box" ? 18 : 0),
    top: (board.y - camera.y) * camera.scale + (cursor.at === "box" ? 18 : -72),
  };
}

export const activityTips = [
  "Double-click text to edit it.",
  "Comment on any part, and Claude can revise it.",
  "Invite people to view, comment, or edit.",
  "Use @ in a comment to mention someone.",
  "Drag in a picture from your computer.",
  "Every edit saves automatically.",
  "People you share with see your changes live.",
  "Drag an artboard by its title to move it.",
  "Select any element to comment on it.",
] as const;

export function activityTipIndex(elapsed: number): number {
  return elapsed < 3000
    ? -1
    : Math.floor((elapsed - 3000) / 5000) % activityTips.length;
}

export function nextTipDelay(elapsed: number): number {
  return elapsed < 3000 ? 3000 - elapsed : 5000 - ((elapsed - 3000) % 5000);
}
