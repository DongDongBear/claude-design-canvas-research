import { afterEach, describe, expect, it, vi } from "vitest";
import type { Board } from "../contracts";
import { ActivityService } from "./ActivityService";
import {
  activityTipIndex,
  cursorScreenPosition,
  deriveActivity,
} from "./activityState";
import type { ActivityInput } from "./activityState";

const board: Board = {
  file: "A.dc.html",
  title: "A",
  x: 100,
  y: 200,
  w: 800,
  h: 600,
};
const input: ActivityInput = {
  on: true,
  now: 0,
  working: true,
  heard: true,
  boxedThisTurn: false,
  arrivedThisTurn: false,
  boxed: [],
  pageEmpty: true,
  editing: true,
};

describe("原包 ADt / CDt 的领域契约", () => {
  it("仅空画布且 working 才展示初始 tips；已有画板不凭空显示光标", () => {
    expect(deriveActivity(input).cursor).toEqual({ at: "tips", rotate: true });
    expect(
      deriveActivity({ ...input, pageEmpty: false, lastHere: board.file })
        .cursor,
    ).toEqual({ at: "none" });
    expect(deriveActivity({ ...input, editing: false }).cursor).toEqual({
      at: "none",
    });
  });
  it("优先第一个等待画板；全为 arriving 时选择最后一个", () => {
    const second = { ...board, file: "B.dc.html" };
    expect(
      deriveActivity({
        ...input,
        boxed: [{ spec: board, arriving: true }, { spec: second }],
      }).cursor,
    ).toEqual({ at: "box", file: second.file });
    expect(
      deriveActivity({
        ...input,
        boxed: [
          { spec: board, arriving: true },
          { spec: second, arriving: true },
        ],
      }).cursor,
    ).toEqual({ at: "box", file: second.file });
  });
  it("画板按当前页过滤，抵达后停在本页最后一个画板上方", () => {
    expect(
      deriveActivity({
        ...input,
        page: "other",
        boxed: [{ spec: board }],
        pageEmpty: false,
      }).cursor,
    ).toEqual({ at: "none" });
    expect(
      deriveActivity({
        ...input,
        pageEmpty: false,
        arrivedThisTurn: true,
        lastHere: board.file,
      }).cursor,
    ).toEqual({ at: "rest", file: board.file });
  });
  it("缺省活动信号用 90s 光标 / 600s 占位超时；显式 idle 覆盖超时", () => {
    const fallback = {
      ...input,
      working: false,
      heard: false,
      lastProgressAt: 0,
      boxed: [{ spec: board }],
    };
    expect(deriveActivity({ ...fallback, now: 89_999 }).cursor.at).toBe("box");
    expect(deriveActivity({ ...fallback, now: 90_000 }).cursor.at).toBe("none");
    expect(deriveActivity({ ...fallback, now: 90_000 }).toCome).toBe(1);
    expect(deriveActivity({ ...fallback, now: 600_000 }).toCome).toBe(0);
    expect(deriveActivity({ ...fallback, heard: true }).toCome).toBe(0);
  });
  it("缩放改变世界位置，屏幕内 18 / -72 偏移保持不变", () => {
    expect(
      cursorScreenPosition({ at: "box", file: board.file }, [board], [board], {
        x: 50,
        y: 100,
        scale: 2,
      }),
    ).toEqual({ left: 118, top: 218 });
    expect(
      cursorScreenPosition({ at: "rest", file: board.file }, [], [board], {
        x: 50,
        y: 100,
        scale: 0.5,
      }),
    ).toEqual({ left: 25, top: -22 });
  });
  it("提示从 3s 起，每 5s 轮换，9 条后循环", () => {
    expect([0, 2999, 3000, 7999, 8000, 48000].map(activityTipIndex)).toEqual([
      -1, -1, 0, 0, 1, 0,
    ]);
  });
});

describe("ActivityService 生命周期", () => {
  afterEach(() => vi.useRealTimers());
  it("构造不读取时钟、不创建 timer；idle 的 2s grace 可被 working 取消", () => {
    vi.useFakeTimers();
    const now = vi.fn(() => Date.now());
    const service = new ActivityService({
      now,
      after(delay, callback) {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
      },
    });
    expect(now).not.toHaveBeenCalled();
    service.updateProject({
      boards: [],
      camera: { x: 0, y: 0, scale: 1 },
      enabled: true,
    });
    service.setWorking(true);
    service.setWorking(false);
    vi.advanceTimersByTime(1999);
    expect(service.getSnapshot().working).toBe(true);
    service.setWorking(true);
    vi.advanceTimersByTime(1);
    expect(service.getSnapshot().working).toBe(true);
    service.setWorking(false);
    vi.advanceTimersByTime(2000);
    expect(service.getSnapshot().working).toBe(false);
    service.dispose();
    expect(vi.getTimerCount()).toBe(0);
  });
  it("本机演示顺序为 box → rest → none，不改传入设计文档", () => {
    const service = new ActivityService();
    service.updateProject({
      boards: [board],
      camera: { x: 0, y: 0, scale: 1 },
      enabled: true,
    });
    service.startSimulation(board);
    expect(service.getSnapshot().cursor).toEqual({
      at: "box",
      file: board.file,
    });
    service.completeSimulation();
    expect(service.getSnapshot().cursor).toEqual({
      at: "rest",
      file: board.file,
    });
    service.stopSimulation();
    expect(service.getSnapshot().cursor.at).toBe("none");
    expect(board).toEqual({
      file: "A.dc.html",
      title: "A",
      x: 100,
      y: 200,
      w: 800,
      h: 600,
    });
    service.dispose();
  });
  it("dispose 幂等，取消提示定时并禁止后续通知", () => {
    vi.useFakeTimers();
    const service = new ActivityService();
    const listener = vi.fn();
    service.subscribe(listener);
    service.updateProject({
      boards: [],
      camera: { x: 0, y: 0, scale: 1 },
      enabled: true,
    });
    service.startSimulation();
    vi.advanceTimersByTime(3000);
    expect(service.getSnapshot().tipIndex).toBe(0);
    service.dispose();
    service.dispose();
    listener.mockClear();
    vi.advanceTimersByTime(20_000);
    service.setWorking(true);
    expect(listener).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
  it("显式 artboardsHere 使用当前页，而不是项目里其他页的画板", () => {
    const service = new ActivityService();
    service.updateProject({
      boards: [board],
      artboardsHere: [],
      camera: { x: 0, y: 0, scale: 1 },
      page: "empty",
      enabled: true,
    });
    service.startSimulation();
    expect(service.getSnapshot().cursor).toEqual({ at: "tips", rotate: true });
    service.dispose();
  });
});
