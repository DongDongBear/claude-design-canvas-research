import { useSyncExternalStore } from "react";
import type { Board } from "../contracts";
import type { ActivityService } from "./ActivityService";
import "./activity.css";

export function ActivityControls({
  service,
  boards,
}: {
  service: ActivityService;
  boards: readonly Board[];
}) {
  const state = useSyncExternalStore(service.subscribe, service.getSnapshot);
  return (
    <aside className="activity-controls" aria-label="本机协议演示">
      <span className="activity-controls-title">本机协议演示</span>
      <span className="activity-controls-note">模拟事件 · 不调用 Claude</span>
      <div className="activity-controls-actions">
        <button
          type="button"
          onClick={() => service.startSimulation(boards[0])}
        >
          演示紫色光标
        </button>
        <button
          type="button"
          disabled={!state.simulation || state.pendingCount === 0}
          onClick={() => service.completeSimulation()}
        >
          模拟文件到达
        </button>
        <button
          type="button"
          disabled={!state.simulation}
          onClick={() => service.stopSimulation()}
        >
          结束演示
        </button>
      </div>
      <span role="status" className="activity-controls-status">
        {!state.simulation
          ? "未运行"
          : state.pendingCount > 0
            ? `working · 等待 ${state.pendingCount} 个画板`
            : state.cursor.at === "rest"
              ? "working · 文件已到达"
              : "working · 空画布提示"}
      </span>
    </aside>
  );
}
