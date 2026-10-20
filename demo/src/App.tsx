import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import type { DesignActions, Tool } from "./contracts";
import { Workbench } from "./components/Workbench";
import type { DesignService } from "./model/DesignService";
import type { ActivityService } from "./activity/ActivityService";

/** React 绑定层：领域动作交给 Service，DOM 测量仅提供视口尺寸。 */
export function App({
  service,
  activity,
}: {
  service: DesignService;
  activity: ActivityService;
}) {
  const host = useRef<HTMLDivElement>(null);
  const state = useSyncExternalStore(service.subscribe, service.getSnapshot);
  useEffect(() => {
    activity.updateProject({
      boards: state.boards,
      camera: state.camera,
      enabled: true,
    });
  }, [activity, state.boards, state.camera]);
  useEffect(() => () => activity.dispose(), [activity]);
  const actions = useMemo<DesignActions>(
    () => ({
      onTool: (tool) => service.setTool(tool),
      onPanel: (panel) => service.setPanel(panel),
      onTogglePanel: () => service.togglePanel(),
      onSelectBoard: (file) => service.selectBoard(file),
      onSelectLayer: (tid) => service.selectLayer(tid),
      onBoardChange: (file, patch) => service.updateBoard(file, patch),
      onStyleChange: (style) => service.updateElementStyle(style),
      onTextChange: (text) => service.updateElementText(text),
      onStylePropertyChange: (property, value) =>
        service.updateElementProperty(property, value),
      onPan: (dx, dy) => service.pan(dx, dy),
      onZoom: (factor, x, y) => service.zoomAt(factor, x, y),
      onFit: () => {
        const rect = host.current
          ?.querySelector("[data-canvas-viewport]")
          ?.getBoundingClientRect();
        if (rect) service.fit(rect.width, rect.height);
      },
      onUndo: () => service.undo(),
      onRedo: () => service.redo(),
      onAddBoard: () => service.addBoard(),
      onDelete: () => service.deleteSelection(),
    }),
    [service],
  );

  useEffect(() => {
    void service.initialize();
    const keydown = (event: KeyboardEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest('input, textarea, [contenteditable="true"]')
      )
        return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (event.shiftKey) service.redo();
        else service.undo();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing)
        return;
      const tools: Record<string, Tool> = {
        v: "select",
        h: "hand",
        t: "text",
        r: "rectangle",
        n: "note",
      };
      const tool = tools[event.key.toLowerCase()];
      if (tool) {
        event.preventDefault();
        service.setTool(tool);
      }
      if (event.shiftKey && event.code === "Digit1") {
        event.preventDefault();
        actions.onFit();
      }
    };
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (service.getSnapshot().save !== "saved") {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("beforeunload", beforeUnload);
      service.dispose();
    };
  }, [service, actions]);

  return (
    <div ref={host} className="app-root">
      <Workbench
        state={state}
        actions={actions}
        activity={activity}
        onGuest={(file, event) => {
          if (event.type === "shortcut") {
            if (event.revision !== service.getSnapshot().revision) return;
            if (event.action === "fit") actions.onFit();
            else if (event.action === "undo") service.undo();
            else if (event.action === "redo") service.redo();
            else service.setTool(event.action);
          } else service.receiveGuest(file, event);
        }}
      />
      {state.save === "error" && (
        <div className="save-recovery" role="alert">
          <span>{state.error || "保存失败，请重试。"}</span>
          <button onClick={() => service.retrySave()}>重试保存</button>
        </div>
      )}
    </div>
  );
}
