export type Tool = "select" | "hand" | "text" | "rectangle" | "note";
export type Panel = "properties" | "code" | "tweaks";
export interface Camera {
  x: number;
  y: number;
  scale: number;
}
export interface Board {
  file: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  page?: string;
}
export interface Layer {
  id: string;
  tag: string;
  label: string;
  depth: number;
  hidden: boolean;
}
export interface Selection {
  file: string;
  tid?: string;
}
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface ElementDetails {
  tid: string;
  tag: string;
  label: string;
  style: string;
  text: string;
  textEditable: boolean;
  rect: Rect;
  computed: Record<string, string>;
}
export interface DesignState {
  status: "loading" | "ready" | "error";
  error?: string;
  title: string;
  boards: Board[];
  camera: Camera;
  tool: Tool;
  panel: Panel;
  panelOpen: boolean;
  selection?: Selection;
  layers: Layer[];
  element?: ElementDetails;
  previews: Record<string, string>;
  canUndo: boolean;
  canRedo: boolean;
  save: "saved" | "saving" | "error";
  revision: number;
}
export type GuestCommand =
  | {
      channel: "canvas-reconstruction";
      type: "document";
      html: string;
      file: string;
      selectedTid?: string;
      tool: Tool;
      revision: number;
    }
  | { channel: "canvas-reconstruction"; type: "select"; tid?: string }
  | { channel: "canvas-reconstruction"; type: "tool"; tool: Tool };
export type GuestEvent =
  | { channel: "canvas-reconstruction"; type: "ready" }
  | ({ revision: number } & (
      | {
          channel: "canvas-reconstruction";
          type: "pick";
          tid: string;
          details: ElementDetails;
        }
      | {
          channel: "canvas-reconstruction";
          type: "inspect";
          details: ElementDetails;
        }
      | {
          channel: "canvas-reconstruction";
          type: "text";
          tid: string;
          text: string;
        }
      | {
          channel: "canvas-reconstruction";
          type: "shortcut";
          action: "undo" | "redo" | "fit" | Tool;
        }
      | {
          channel: "canvas-reconstruction";
          type: "pan";
          dx: number;
          dy: number;
        }
      | {
          channel: "canvas-reconstruction";
          type: "zoom";
          factor: number;
          x: number;
          y: number;
        }
      | {
          channel: "canvas-reconstruction";
          type: "insert";
          kind: "text" | "rectangle" | "note";
          x: number;
          y: number;
        }
    ));
export interface DesignPort {
  load(): Promise<{ canvas: unknown; files: Record<string, string> }>;
  save(canvas: unknown, files: Record<string, string>): Promise<void>;
}

export interface DesignActions {
  onTool(tool: Tool): void;
  onPanel(panel: Panel): void;
  onTogglePanel(): void;
  onSelectBoard(file: string): void;
  onSelectLayer(tid: string): void;
  onBoardChange(file: string, patch: Partial<Board>): void;
  onStyleChange(style: string): void;
  onTextChange(text: string): void;
  onStylePropertyChange(property: string, value: string): void;
  onPan(dx: number, dy: number): void;
  onZoom(factor: number, x: number, y: number): void;
  onFit(): void;
  onUndo(): void;
  onRedo(): void;
  onAddBoard(): void;
  onDelete(): void;
}
