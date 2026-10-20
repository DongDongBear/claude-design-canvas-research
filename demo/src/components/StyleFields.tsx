import { useEffect, useRef, useState } from "react";
import type { ElementDetails } from "../contracts";

interface StyleField {
  property: string;
  label: string;
  values?: readonly string[];
  wide?: boolean;
}
const groups: { title: string; fields: StyleField[] }[] = [
  {
    title: "Layout",
    fields: [
      {
        property: "display",
        label: "Display",
        values: [
          "block",
          "flex",
          "grid",
          "inline",
          "inline-block",
          "inline-flex",
          "none",
        ],
      },
      {
        property: "position",
        label: "Position",
        values: ["static", "relative", "absolute", "fixed", "sticky"],
      },
      {
        property: "width",
        label: "Width",
        values: ["auto", "100%", "fit-content", "max-content", "min-content"],
      },
      {
        property: "height",
        label: "Height",
        values: ["auto", "100%", "fit-content", "max-content", "min-content"],
      },
      { property: "gap", label: "Gap" },
      { property: "flex-grow", label: "Grow" },
    ],
  },
  {
    title: "Spacing",
    fields: [
      { property: "padding", label: "Padding", wide: true },
      { property: "margin", label: "Margin", wide: true },
    ],
  },
  {
    title: "Text",
    fields: [
      { property: "font-family", label: "Font family", wide: true },
      { property: "font-size", label: "Size" },
      {
        property: "font-weight",
        label: "Weight",
        values: ["400", "500", "600", "700", "normal", "bold"],
      },
      { property: "line-height", label: "Line height" },
      { property: "letter-spacing", label: "Letter spacing" },
      { property: "color", label: "Color" },
      {
        property: "text-align",
        label: "Align",
        values: ["left", "center", "right", "justify", "start", "end"],
      },
    ],
  },
  {
    title: "Appearance",
    fields: [
      { property: "background-color", label: "Background", wide: true },
      { property: "opacity", label: "Opacity" },
      { property: "border-radius", label: "Radius" },
      { property: "border", label: "Border", wide: true },
    ],
  },
];

export function StyleFields({
  element,
  onChange,
}: {
  element: ElementDetails;
  onChange: (property: string, value: string) => void;
}) {
  const [draft, setDraft] = useState<Record<string, string>>({});
  const cancelled = useRef(new Set<string>());
  useEffect(() => {
    setDraft({});
    cancelled.current.clear();
  }, [element.tid]);
  const discard = (property: string) =>
    setDraft((previous) => {
      const next = { ...previous };
      delete next[property];
      return next;
    });
  return (
    <div className="style-fields">
      <div className="style-fields-note">
        Computed values appear as placeholders. Enter a CSS value and leave the
        field to apply it. Clear an edited field to remove its inline override.
      </div>
      {groups.map((group) => (
        <section className="property-group" key={group.title}>
          <h3>{group.title}</h3>
          <div className="style-field-grid">
            {group.fields.map((field) => (
              <label
                key={`${element.tid}:${field.property}`}
                className={`style-field ${field.wide ? "style-field-wide" : ""}`}
              >
                <span>{field.label}</span>
                <input
                  aria-label={`Style ${field.property}`}
                  value={draft[field.property] ?? ""}
                  placeholder={element.computed[field.property] || "Not set"}
                  title={`${field.property}: ${element.computed[field.property] || "not set"}`}
                  list={field.values ? `css-${field.property}` : undefined}
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(event) =>
                    setDraft((previous) => ({
                      ...previous,
                      [field.property]: event.target.value,
                    }))
                  }
                  onBlur={(event) => {
                    if (cancelled.current.delete(field.property)) return;
                    if (Object.hasOwn(draft, field.property)) {
                      onChange(field.property, event.currentTarget.value);
                      discard(field.property);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                    if (event.key === "Escape") {
                      cancelled.current.add(field.property);
                      discard(field.property);
                      event.currentTarget.blur();
                    }
                  }}
                />
                {field.values && (
                  <datalist id={`css-${field.property}`}>
                    {field.values.map((value) => (
                      <option key={value} value={value} />
                    ))}
                  </datalist>
                )}
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
