import { useEffect, useState } from "react";
import type { DesignActions, DesignState } from "../contracts";
import { Icon } from "./Icon";
import { StyleFields } from "./StyleFields";

export function PropertiesPanel({
  state,
  actions,
}: {
  state: DesignState;
  actions: DesignActions;
}) {
  const board = state.boards.find(
    (item) => item.file === state.selection?.file,
  );
  const element = state.element;
  const [text, setText] = useState(element?.text ?? "");
  useEffect(
    () => setText(element?.text ?? ""),
    [element?.tid, element?.text, board?.file],
  );
  if (!board)
    return (
      <div className="inspector-empty">
        <div className="empty-selection-icon">
          <Icon name="cursor" size={24} />
        </div>
        <h2>Make something yours</h2>
        <p>
          Select an element on the artboard to inspect its HTML, edit text, or
          change inline CSS.
        </p>
        <div className="keyboard-hints">
          <span>Select</span>
          <kbd>V</kbd>
          <span>Pan canvas</span>
          <kbd>H</kbd>
          <span>Add text</span>
          <kbd>T</kbd>
          <span>Rectangle</span>
          <kbd>R</kbd>
          <span>Sticky note</span>
          <kbd>N</kbd>
        </div>
      </div>
    );
  const setNumber = (key: "w" | "h" | "x" | "y", input: HTMLInputElement) => {
    const value = Number(input.value);
    if (input.value.trim() && Number.isFinite(value) && value !== board[key])
      actions.onBoardChange(board.file, { [key]: value });
    else input.value = String(board[key]);
  };
  return (
    <div className="property-content">
      <div className="selection-heading">
        <span className="selection-type">
          {element ? `<${element.tag}>` : "Artboard"}
        </span>
        <strong title={element?.label ?? board.title}>
          {element?.label ?? board.title}
        </strong>
        {element && <span className="element-id">{element.tid}</span>}
      </div>
      {!element && (
        <>
          <div className="property-group">
            <h3>Artboard</h3>
            <label className="field-label">
              Name
              <input
                key={`${board.file}:title:${board.title}`}
                defaultValue={board.title}
                onBlur={(event) => {
                  if (event.currentTarget.value !== board.title)
                    actions.onBoardChange(board.file, {
                      title: event.currentTarget.value,
                    });
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.currentTarget.blur();
                }}
              />
            </label>
            <div className="field-grid">
              {(["w", "h", "x", "y"] as const).map((key) => (
                <label
                  className="number-field"
                  key={`${board.file}:${key}:${board[key]}`}
                >
                  <span>{key.toUpperCase()}</span>
                  <input
                    type="number"
                    aria-label={`Artboard ${key === "w" ? "width" : key === "h" ? "height" : key}`}
                    min={key === "w" || key === "h" ? 1 : undefined}
                    defaultValue={Math.round(board[key])}
                    onBlur={(event) => setNumber(key, event.currentTarget)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                    }}
                  />
                  <small>px</small>
                </label>
              ))}
            </div>
          </div>
          <div className="property-group">
            <h3>HTML file</h3>
            <code className="file-label">{board.file}</code>
            <p className="helper-text">
              Click content inside the artboard to select a DOM element. Drag
              the artboard label to move it.
            </p>
          </div>
        </>
      )}
      {element && (
        <>
          <div className="property-group">
            <h3>
              Geometry{" "}
              <span className="readonly-label">Measured in browser</span>
            </h3>
            <div className="field-grid">
              {(["x", "y", "w", "h"] as const).map((key) => (
                <div className="number-field readonly-field" key={key}>
                  <span>{key.toUpperCase()}</span>
                  <output>{Math.round(element.rect[key] * 10) / 10}</output>
                  <small>px</small>
                </div>
              ))}
            </div>
          </div>
          <div className="property-group">
            <div className="property-group-heading">
              <h3>Text content</h3>
              <span className="muted-text">{text.length} characters</span>
            </div>
            <textarea
              className="text-content-editor"
              aria-label="Element text content"
              value={text}
              disabled={!element.textEditable}
              onChange={(event) => setText(event.target.value)}
              spellCheck={false}
              rows={element.textEditable ? 4 : 3}
            />
            <button
              className="secondary-button full-width"
              disabled={!element.textEditable || text === element.text}
              onClick={() => actions.onTextChange(text)}
            >
              Apply text
            </button>
            <p className="helper-text">
              {element.textEditable
                ? "Edit this text leaf without changing any other layer."
                : "Select a text leaf to edit its content. Containers and non-text elements keep their child layers."}
            </p>
          </div>
          <StyleFields
            key={`${board.file}:${element.tid}`}
            element={element}
            onChange={actions.onStylePropertyChange}
          />
          <div className="property-group">
            <button
              className="secondary-button full-width"
              onClick={() => actions.onPanel("code")}
            >
              <Icon name="code" size={14} />
              Edit all inline CSS
            </button>
          </div>
        </>
      )}
      <div className="property-group danger-group">
        <button className="delete-button" onClick={actions.onDelete}>
          <Icon name="trash" size={14} />
          Delete {element ? "element" : "artboard"}
        </button>
      </div>
    </div>
  );
}
