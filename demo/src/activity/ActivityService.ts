import type { Board, Camera } from "../contracts";
import {
  activityTipIndex,
  activityTips,
  cursorScreenPosition,
  deriveActivity,
  nextTipDelay,
} from "./activityState";
import type { ActivityCursor, AwaitedBoard } from "./activityState";

export interface ActivityClock {
  now(): number;
  after(delay: number, callback: () => void): () => void;
}
export interface ActivityProject {
  boards: readonly Board[];
  /** 当前页可见、已排除 frameless 的画板；单页消费者可省略。 */
  artboardsHere?: readonly Board[];
  camera: Camera;
  page?: string;
  editing?: boolean;
  enabled?: boolean;
}
export interface ActivitySnapshot {
  working: boolean;
  simulation: boolean;
  cursor: ActivityCursor;
  position?: { left: number; top: number };
  boxes: readonly Board[];
  pendingCount: number;
  tip: string;
  tipIndex: number;
}

const browserClock: ActivityClock = {
  now: () => Date.now(),
  after(delay, callback) {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  },
};

/** 领域事件驱动的生成进度；演示事件不会修改设计文档或调用 Claude。 */
export class ActivityService {
  private project: ActivityProject = {
    boards: [],
    camera: { x: 0, y: 0, scale: 1 },
    enabled: false,
  };
  private working = false;
  private heard = false;
  private simulation = false;
  private boxed: AwaitedBoard[] = [];
  private boxedThisTurn = false;
  private arrivedThisTurn = false;
  private lastProgressAt?: number;
  private tipStartedAt?: number;
  private cancelWake?: () => void;
  private cancelIdle?: () => void;
  private disposed = false;
  private listeners = new Set<() => void>();
  private snapshot: ActivitySnapshot = {
    working: false,
    simulation: false,
    cursor: { at: "none" },
    boxes: [],
    pendingCount: 0,
    tip: "Claude is working…",
    tipIndex: -1,
  };

  constructor(private readonly clock: ActivityClock = browserClock) {}

  getSnapshot = (): ActivitySnapshot => this.snapshot;
  subscribe = (listener: () => void): (() => void) => {
    if (this.disposed) return () => {};
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  updateProject(project: ActivityProject): void {
    if (this.disposed) return;
    this.project = {
      ...project,
      boards: [...project.boards],
      artboardsHere: project.artboardsHere
        ? [...project.artboardsHere]
        : undefined,
      camera: { ...project.camera },
    };
    this.publish();
  }

  setWorking(working: boolean): void {
    if (this.disposed) return;
    this.cancelIdle?.();
    this.cancelIdle = undefined;
    if (working) {
      this.heard = true;
      this.working = true;
      if (this.boxed.length > 0) this.boxedThisTurn = true;
      this.publish();
    } else {
      // 原包 ETn / eM：idle 延后 2s，避免 activity 信号短暂中断闪烁。
      this.cancelIdle = this.clock.after(2000, () => {
        if (this.disposed) return;
        this.cancelIdle = undefined;
        this.working = false;
        this.arrivedThisTurn = false;
        if (this.boxedThisTurn || (this.heard && this.boxed.length > 0))
          this.boxed = [];
        this.boxedThisTurn = false;
        this.publish();
      });
    }
  }

  setAwaitedBoards(boards: readonly AwaitedBoard[], progressed = true): void {
    if (this.disposed) return;
    this.boxed = boards.map((board) => ({ ...board, spec: { ...board.spec } }));
    if (progressed) this.lastProgressAt = this.clock.now();
    if (this.working && boards.length > 0) this.boxedThisTurn = true;
    this.publish();
  }

  arriveBoard(file: string): void {
    if (this.disposed) return;
    const before = this.boxed.length;
    this.boxed = this.boxed.filter((board) => board.spec.file !== file);
    if (this.working && this.boxed.length !== before)
      this.arrivedThisTurn = true;
    this.lastProgressAt = this.clock.now();
    this.publish();
  }

  startSimulation(board?: Board): void {
    if (this.disposed) return;
    this.stopSimulation();
    this.simulation = true;
    this.project = { ...this.project, enabled: true, editing: true };
    this.setWorking(true);
    if (board)
      this.setAwaitedBoards([{ spec: board, page: this.project.page }]);
  }

  completeSimulation(): void {
    if (!this.simulation || this.disposed) return;
    for (const board of [...this.boxed]) this.arriveBoard(board.spec.file);
  }

  stopSimulation(): void {
    if (this.disposed) return;
    this.cancelIdle?.();
    this.cancelIdle = undefined;
    this.working = false;
    this.heard = false;
    this.simulation = false;
    this.boxed = [];
    this.boxedThisTurn = false;
    this.arrivedThisTurn = false;
    this.lastProgressAt = undefined;
    this.publish();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.cancelIdle?.();
    this.cancelWake?.();
    this.cancelIdle = this.cancelWake = undefined;
    this.listeners.clear();
  }

  private publish(): void {
    this.cancelWake?.();
    this.cancelWake = undefined;
    const now = this.clock.now();
    const artboardsHere = this.project.artboardsHere ?? this.project.boards;
    const projection = deriveActivity({
      on: this.project.enabled === true,
      now,
      working: this.working,
      heard: this.heard,
      lastProgressAt: this.lastProgressAt,
      boxedThisTurn: this.boxedThisTurn,
      arrivedThisTurn: this.arrivedThisTurn,
      boxed: this.boxed,
      page: this.project.page,
      pageEmpty: artboardsHere.length === 0,
      lastHere: artboardsHere.at(-1)?.file,
      editing: this.project.editing !== false,
    });
    const rotating =
      projection.cursor.at === "tips" && projection.cursor.rotate;
    if (rotating && this.tipStartedAt === undefined) this.tipStartedAt = now;
    if (!rotating) this.tipStartedAt = undefined;
    const elapsed =
      this.tipStartedAt === undefined ? 0 : now - this.tipStartedAt;
    const tipIndex = rotating ? activityTipIndex(elapsed) : -1;
    this.snapshot = {
      working: this.working,
      simulation: this.simulation,
      cursor: projection.cursor,
      position: cursorScreenPosition(
        projection.cursor,
        projection.boxes,
        artboardsHere,
        this.project.camera,
      ),
      boxes: projection.boxes,
      pendingCount: projection.toCome,
      tip: tipIndex < 0 ? "Claude is working…" : activityTips[tipIndex],
      tipIndex,
    };
    const tipWakeAt = rotating ? now + nextTipDelay(elapsed) : undefined;
    const wakeAt =
      projection.wakeAt === undefined
        ? tipWakeAt
        : tipWakeAt === undefined
          ? projection.wakeAt
          : Math.min(projection.wakeAt, tipWakeAt);
    if (wakeAt !== undefined)
      this.cancelWake = this.clock.after(Math.max(0, wakeAt - now), () => {
        if (!this.disposed) this.publish();
      });
    for (const listener of this.listeners) listener();
  }
}
