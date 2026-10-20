import type { DesignActions, DesignState } from "../contracts";
import { Icon } from "./Icon";

export function Header({
  state,
  actions,
}: {
  state: DesignState;
  actions: DesignActions;
}) {
  return (
    <header className="app-header">
      <div className="project-identity">
        <span className="project-mark" aria-hidden="true">
          ✳
        </span>
        <div>
          <h1>{state.title || "Untitled canvas"}</h1>
          <span className="project-subtitle">
            Design canvas <span>·</span> React + TypeScript reconstruction
          </span>
        </div>
      </div>
      <div className="header-actions">
        <span className={`save-status save-${state.save}`} role="status">
          <Icon name={state.save === "error" ? "alert" : "check"} size={13} />
          {state.save === "saved"
            ? "Saved on this device"
            : state.save === "saving"
              ? "Saving…"
              : "Save failed"}
        </span>
        <div className="history-actions">
          <button
            className="icon-button"
            aria-label="Undo"
            title="Undo · ⌘Z"
            disabled={!state.canUndo}
            onClick={actions.onUndo}
          >
            <Icon name="undo" />
          </button>
          <button
            className="icon-button"
            aria-label="Redo"
            title="Redo · ⇧⌘Z"
            disabled={!state.canRedo}
            onClick={actions.onRedo}
          >
            <Icon name="redo" />
          </button>
        </div>
        <button className="add-board-button" onClick={actions.onAddBoard}>
          <Icon name="plus" size={15} />
          New artboard
        </button>
      </div>
    </header>
  );
}
