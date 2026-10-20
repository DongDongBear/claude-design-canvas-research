import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import type { DesignActions, DesignState, GuestEvent } from "../contracts";
import { Artboard } from "./Artboard";
import { Toolbar } from "./Toolbar";
import { Icon } from "./Icon";
import type { ActivityService } from "../activity/ActivityService";
import { ActivityOverlay } from "../activity/ActivityOverlay";
import { ActivityControls } from "../activity/ActivityControls";

export function Canvas({
  state,
  actions,
  activity,
  onGuest,
}: {
  state: DesignState;
  actions: DesignActions;
  activity: ActivityService;
  onGuest: (file: string, event: GuestEvent) => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | undefined>(undefined);
  const latest = useRef(actions);
  latest.current = actions;
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      if ((event.target as HTMLElement).closest("button")) return;
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        const rect = element.getBoundingClientRect();
        latest.current.onZoom(
          Math.exp(-event.deltaY * 0.01),
          event.clientX - rect.left,
          event.clientY - rect.top,
        );
      } else latest.current.onPan(-event.deltaX, -event.deltaY);
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, []);
  const start = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.target !== event.currentTarget &&
      !(event.target as HTMLElement).classList.contains("canvas-world")
    )
      return;
    if (event.button !== 0 && event.button !== 1) return;
    event.preventDefault();
    pointer.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointer.current) return;
    actions.onPan(
      event.clientX - pointer.current.x,
      event.clientY - pointer.current.y,
    );
    pointer.current = { x: event.clientX, y: event.clientY };
  };
  const zoom = (factor: number) => {
    const rect = viewport.current?.getBoundingClientRect();
    if (rect) actions.onZoom(factor, rect.width / 2, rect.height / 2);
  };
  return (
    <div
      ref={viewport}
      data-canvas-viewport
      className={`canvas-viewport tool-${state.tool}`}
      aria-label="Canvas"
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={() => {
        pointer.current = undefined;
      }}
      onPointerCancel={() => {
        pointer.current = undefined;
      }}
    >
      <div
        className="canvas-world"
        style={{
          transform: `translate(${-state.camera.x * state.camera.scale}px, ${-state.camera.y * state.camera.scale}px) scale(${state.camera.scale})`,
        }}
      >
        {state.boards.map((board) => (
          <Artboard
            revision={state.revision}
            key={board.file}
            board={board}
            html={state.previews[board.file] ?? ""}
            selected={state.selection?.file === board.file}
            selectedTid={
              state.selection?.file === board.file
                ? state.selection.tid
                : undefined
            }
            scale={state.camera.scale}
            tool={state.tool}
            actions={actions}
            onGuest={onGuest}
          />
        ))}
      </div>
      <Toolbar state={state} actions={actions} onZoom={zoom} />
      <ActivityOverlay service={activity} />
      <ActivityControls service={activity} boards={state.boards} />
      {state.status === "loading" && (
        <div className="canvas-message" role="status">
          <span className="loading-spinner" />
          Loading the recovered canvas…
        </div>
      )}
      {state.status === "error" && (
        <div className="canvas-message canvas-error" role="alert">
          <Icon name="alert" size={25} />
          <strong>Couldn’t open the canvas</strong>
          <span>{state.error || "Reload the page to try again."}</span>
        </div>
      )}
      {state.status === "ready" && !state.boards.length && (
        <div className="canvas-message">
          <Icon name="board" size={28} />
          <strong>A blank canvas</strong>
          <span>Add an artboard to start designing.</span>
          <button className="primary-button" onClick={actions.onAddBoard}>
            New artboard
          </button>
        </div>
      )}
      {state.status !== "error" && state.error && (
        <div className="canvas-error-banner" role="alert">
          <Icon name="alert" size={16} />
          <span>{state.error}</span>
        </div>
      )}
      <div className="canvas-footnote">
        <span className="status-dot" />
        {state.boards.length} artboard{state.boards.length === 1 ? "" : "s"}
        <span className="footnote-separator">·</span>
        <span>Scroll to pan · ⌘/Ctrl + scroll to zoom</span>
      </div>
    </div>
  );
}
