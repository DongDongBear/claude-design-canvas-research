import type { CSSProperties } from "react";

const paths: Record<string, string> = {
  select: "m5 3 14 9-7 1-3 7L5 3Z",
  hand: "M8 11V6a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v5c0 5-3 8-7 8-3 0-5-2-7-5l-2-3a1.5 1.5 0 0 1 2-2l2 2Z",
  text: "M4 5V3h16v2M12 3v18M8 21h8",
  rectangle: "M4 4h16v16H4Z",
  note: "M5 3h14v12l-6 6H5V3Zm8 18v-6h6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  undo: "m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12",
  redo: "m16 4 5 5-5 5m5-5H10a6 6 0 0 0 0 12",
  chevron: "m9 5 7 7-7 7",
  down: "m6 9 6 6 6-6",
  close: "m6 6 12 12M6 18 18 6",
  panel: "M3 4h18v16H3Zm12 0v16",
  fit: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  trash: "M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  layers: "m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5",
  board: "M7 2v20M17 2v20M2 7h20M2 17h20",
  check: "m5 12 4 4L19 6",
  alert: "m12 3 10 18H2L12 3Zm0 6v5m0 3v1",
  cursor: "M12 2v4m0 12v4M2 12h4m12 0h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
};

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 16, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d={paths[name] ?? paths.rectangle} />
    </svg>
  );
}
