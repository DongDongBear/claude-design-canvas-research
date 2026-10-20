import type { DesignActions, DesignState } from "../contracts";
import { Icon } from "./Icon";

export function Layers({
  state,
  actions,
}: {
  state: DesignState;
  actions: DesignActions;
}) {
  const board = state.boards.find(
    (item) => item.file === state.selection?.file,
  );
  return (
    <section className="layers-section" aria-label="Layers">
      <div className="section-heading">
        <span>Layers</span>
        <span className="muted-text">
          {state.layers.length ? state.layers.length : state.boards.length}
        </span>
      </div>
      <div className="layers-scroll">
        {state.boards.map((item) => (
          <div key={item.file}>
            <button
              className={`layer-row board-layer-row ${state.selection?.file === item.file && !state.selection.tid ? "layer-selected" : ""}`}
              onClick={() => actions.onSelectBoard(item.file)}
              title={item.file}
            >
              <Icon name="down" size={11} />
              <Icon name="board" size={13} />
              <span>{item.title}</span>
            </button>
            {board?.file === item.file &&
              state.layers.map((layer) => (
                <button
                  key={layer.id}
                  className={`layer-row ${state.selection?.tid === layer.id ? "layer-selected" : ""} ${layer.hidden ? "layer-hidden" : ""}`}
                  style={{ paddingLeft: 19 + Math.min(layer.depth, 12) * 12 }}
                  onClick={() => actions.onSelectLayer(layer.id)}
                  title={`${layer.tag} · ${layer.id}`}
                >
                  <span className="layer-type">
                    {[
                      "h1",
                      "h2",
                      "h3",
                      "p",
                      "span",
                      "strong",
                      "label",
                      "a",
                      "button",
                    ].includes(layer.tag)
                      ? "T"
                      : layer.tag === "img"
                        ? "◇"
                        : "#"}
                  </span>
                  <span>{layer.label || layer.tag}</span>
                </button>
              ))}
          </div>
        ))}
        {!state.boards.length && (
          <p className="layers-empty">Your artboards will appear here.</p>
        )}
      </div>
    </section>
  );
}
