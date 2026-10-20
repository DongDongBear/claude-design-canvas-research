import { useEffect, useState } from "react";
import type { DesignActions, DesignState } from "../contracts";
import { Icon } from "./Icon";

export function CodePanel({
  state,
  actions,
}: {
  state: DesignState;
  actions: DesignActions;
}) {
  const element = state.element;
  const [style, setStyle] = useState(element?.style ?? "");
  useEffect(
    () => setStyle(element?.style ?? ""),
    [element?.tid, element?.style, state.selection?.file],
  );
  if (!element)
    return (
      <div className="inspector-empty">
        <div className="empty-selection-icon">
          <Icon name="code" size={23} />
        </div>
        <h2>HTML, directly editable</h2>
        <p>
          Choose an element on the artboard or in Layers. Its inline CSS will
          appear here.
        </p>
        <div className="code-example">
          <span>&lt;div</span> style=<em>"padding: 24px;"</em>
          <span>&gt;</span>
          <br />
          &nbsp; Your design, real HTML.
          <br />
          <span>&lt;/div&gt;</span>
        </div>
        <p className="helper-text">
          Edits update the template and persist on this device. Undo and redo
          remain available.
        </p>
      </div>
    );
  const dirty = style !== element.style;
  return (
    <div className="code-content">
      <div className="code-element">
        <code>&lt;{element.tag}&gt;</code>
        <span title={element.label}>{element.label}</span>
        <small>{element.tid}</small>
      </div>
      <div className="code-editor-heading">
        <span>Inline CSS</span>
        <span className={`code-dirty ${dirty ? "has-changes" : ""}`}>
          {dirty ? "Unsaved changes" : "In sync"}
        </span>
      </div>
      <textarea
        className="css-editor"
        aria-label="Inline CSS"
        value={style}
        onChange={(event) => setStyle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            actions.onStyleChange(style);
          }
        }}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        placeholder={"color: #1f1f1f;\npadding: 24px;"}
      />
      <div className="code-editor-footer">
        <button
          className="secondary-button"
          disabled={!dirty}
          onClick={() => setStyle(element.style)}
        >
          Reset
        </button>
        <button
          className="primary-button"
          disabled={!dirty}
          onClick={() => actions.onStyleChange(style)}
        >
          Apply CSS <kbd>⌘↵</kbd>
        </button>
      </div>
      <p className="helper-text code-help">
        Write CSS declarations for this element. The browser applies valid CSS
        immediately after you click Apply.
      </p>
    </div>
  );
}
