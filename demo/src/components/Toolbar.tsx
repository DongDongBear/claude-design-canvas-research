import type { DesignActions, DesignState, Tool } from "../contracts";
import { Icon } from "./Icon";

const tools: { tool: Tool; label: string; key: string }[] = [
  { tool: "select", label: "Select", key: "V" },
  { tool: "hand", label: "Hand", key: "H" },
  { tool: "text", label: "Text", key: "T" },
  { tool: "rectangle", label: "Rectangle", key: "R" },
  { tool: "note", label: "Note", key: "N" },
];

export function Toolbar({
  state,
  actions,
  onZoom,
}: {
  state: DesignState;
  actions: DesignActions;
  onZoom: (factor: number) => void;
}) {
  return (
    <>
      <div className="canvas-toolbar" role="toolbar" aria-label="Canvas tools">
        <span className="page-label">Page 1</span>
        <span className="toolbar-divider" />
        {tools.map(({ tool, label, key }) => (
          <button
            key={tool}
            className={`tool-button ${state.tool === tool ? "is-active" : ""}`}
            aria-label={label}
            aria-pressed={state.tool === tool}
            title={`${label} · ${key}`}
            onClick={() => actions.onTool(tool)}
          >
            <Icon name={tool} size={17} />
          </button>
        ))}
      </div>
      <div className="view-toolbar" role="toolbar" aria-label="Canvas view">
        <button
          className={`tool-button ${state.panelOpen ? "is-active" : ""}`}
          aria-label="Toggle properties panel"
          aria-pressed={state.panelOpen}
          title="Toggle properties panel"
          onClick={actions.onTogglePanel}
        >
          <Icon name="panel" size={17} />
        </button>
        <span className="toolbar-divider" />
        <button
          className="icon-button zoom-step"
          aria-label="Zoom out"
          onClick={() => onZoom(1 / 1.2)}
        >
          <Icon name="minus" size={13} />
        </button>
        <button
          className="zoom-value"
          onClick={actions.onFit}
          title="Fit all artboards"
        >
          {Math.round(state.camera.scale * 100)}%
        </button>
        <button
          className="icon-button zoom-step"
          aria-label="Zoom in"
          onClick={() => onZoom(1.2)}
        >
          <Icon name="plus" size={13} />
        </button>
        <button
          className="icon-button"
          aria-label="Fit all artboards"
          title="Fit all artboards · ⇧1"
          onClick={actions.onFit}
        >
          <Icon name="fit" size={14} />
        </button>
      </div>
    </>
  );
}
