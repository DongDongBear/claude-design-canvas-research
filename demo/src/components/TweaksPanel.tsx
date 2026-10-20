import { Icon } from "./Icon";

export function TweaksPanel() {
  return (
    <div className="inspector-empty">
      <div className="empty-selection-icon tweaks-icon">
        <Icon name="layers" size={23} />
      </div>
      <h2>No tweaks declared</h2>
      <p>
        The recovered project doesn’t expose tweak controls. Select an element
        and use Properties or Code to edit the real HTML instead.
      </p>
      <div className="scope-note">
        <strong>What this reconstruction includes</strong>
        <p>
          DOM selection, layer inspection, inline CSS, text edits, artboards,
          camera controls, and file persistence.
        </p>
        <p>
          Original project scripts, Claude services, and collaboration are
          outside this independent demo.
        </p>
      </div>
    </div>
  );
}
