import type { DesignActions, DesignState, Panel } from "../contracts";
import { Icon } from "./Icon";
import { Layers } from "./Layers";
import { PropertiesPanel } from "./PropertiesPanel";
import { CodePanel } from "./CodePanel";
import { TweaksPanel } from "./TweaksPanel";

const panels: { id: Panel; title: string }[] = [
  { id: "properties", title: "Properties" },
  { id: "code", title: "Code" },
  { id: "tweaks", title: "Tweaks" },
];

export function Inspector({
  state,
  actions,
}: {
  state: DesignState;
  actions: DesignActions;
}) {
  const artboardProperties =
    state.panel === "code" && state.selection && !state.selection.tid;
  return (
    <aside className="inspector" aria-label="Design inspector">
      <div className="inspector-header">
        <div
          className="inspector-tabs"
          role="tablist"
          aria-label="Inspector panels"
        >
          {panels.map((panel, index) => (
            <button
              key={panel.id}
              id={`tab-${panel.id}`}
              role="tab"
              tabIndex={state.panel === panel.id ? 0 : -1}
              aria-selected={state.panel === panel.id}
              aria-controls={`panel-${panel.id}`}
              className={state.panel === panel.id ? "tab-active" : ""}
              onClick={() => actions.onPanel(panel.id)}
              onKeyDown={(event) => {
                let next: number;
                if (event.key === "ArrowRight")
                  next = (index + 1) % panels.length;
                else if (event.key === "ArrowLeft")
                  next = (index + panels.length - 1) % panels.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = panels.length - 1;
                else return;
                event.preventDefault();
                actions.onPanel(panels[next].id);
                (
                  event.currentTarget.parentElement?.children[next] as
                    HTMLButtonElement | undefined
                )?.focus();
              }}
            >
              {panel.title}
            </button>
          ))}
        </div>
        <button
          className="icon-button close-panel"
          aria-label="Close inspector"
          onClick={actions.onTogglePanel}
        >
          <Icon name="close" size={14} />
        </button>
      </div>
      {state.panel !== "tweaks" && <Layers state={state} actions={actions} />}
      <div
        className="inspector-body"
        id={`panel-${state.panel}`}
        role="tabpanel"
        aria-labelledby={`tab-${state.panel}`}
        tabIndex={0}
      >
        {state.panel === "properties" || artboardProperties ? (
          <PropertiesPanel state={state} actions={actions} />
        ) : state.panel === "code" ? (
          <CodePanel state={state} actions={actions} />
        ) : (
          <TweaksPanel />
        )}
      </div>
      <div className="inspector-footer">
        <span className="reconstruction-badge">RECONSTRUCTED</span>
        <span>HTML canvas · v1</span>
      </div>
    </aside>
  );
}
