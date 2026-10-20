import { useSyncExternalStore } from "react";
import type { ActivityService } from "./ActivityService";
import "./activity.css";

/** 屏幕空间 overlay；位置与可见性由 ActivityService 提供。 */
export function ActivityOverlay({ service }: { service: ActivityService }) {
  const state = useSyncExternalStore(service.subscribe, service.getSnapshot);
  if (state.cursor.at === "none") return null;
  const tips = state.cursor.at === "tips";
  return (
    <div
      className={`activity-overlay${tips ? " activity-overlay-tips" : ""}`}
      data-activity-cursor={state.cursor.at}
      style={
        state.position
          ? { left: state.position.left, top: state.position.top }
          : undefined
      }
      aria-hidden="true"
    >
      <span className="activity-cursor-unit">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="activity-cursor-arrow"
        >
          <path
            d="M1.64838 2.00811C1.39707 1.20393 2.19198 0.468453 2.97425 0.781363L13.5673 5.01857C14.4224 5.36064 14.3996 6.57901 13.5322 6.88879L9.87018 8.19667C9.33014 8.38954 8.89887 8.80494 8.6859 9.33737L7.06512 13.3893C6.71565 14.263 5.46282 14.2143 5.18216 13.3162L1.64838 2.00811Z"
            fill="#6250d6"
            stroke="#fff"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={tips ? "activity-cursor-tip" : "activity-cursor-label"}
        >
          {tips ? state.tip : "Claude"}
        </span>
      </span>
    </div>
  );
}
