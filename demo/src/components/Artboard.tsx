import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { Board, DesignActions, GuestEvent, Tool } from "../contracts";
import { GuestFrame } from "./GuestFrame";
import { Icon } from "./Icon";

export interface ArtboardProps {
  board: Board;
  html: string;
  revision: number;
  selected: boolean;
  selectedTid?: string;
  scale: number;
  tool: Tool;
  actions: DesignActions;
  onGuest: (file: string, event: GuestEvent) => void;
}

export function Artboard({
  board,
  html,
  revision,
  selected,
  selectedTid,
  scale,
  tool,
  actions,
  onGuest,
}: ArtboardProps) {
  const gesture = useRef<
    { x: number; y: number; board: Board; resize: boolean } | undefined
  >(undefined);
  const preview = useRef<Partial<Board> | undefined>(undefined);
  const [presentation, setPresentation] = useState<Partial<Board>>({});
  const start = (event: PointerEvent<HTMLElement>, resize = false) => {
    if (event.button !== 0) return;
    event.stopPropagation();
    actions.onSelectBoard(board.file);
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      board: { ...board },
      resize,
    };
    preview.current = undefined;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    const current = gesture.current;
    if (!current) return;
    const dx = (event.clientX - current.x) / scale;
    const dy = (event.clientY - current.y) / scale;
    preview.current = current.resize
      ? {
          w: Math.max(120, Math.round(current.board.w + dx)),
          h: Math.max(100, Math.round(current.board.h + dy)),
        }
      : {
          x: Math.round(current.board.x + dx),
          y: Math.round(current.board.y + dy),
        };
    setPresentation(preview.current);
  };
  const finish = (cancel = false) => {
    if (!cancel && preview.current)
      actions.onBoardChange(board.file, preview.current);
    gesture.current = undefined;
    preview.current = undefined;
    setPresentation({});
  };
  return (
    <section
      className={`artboard ${selected ? "artboard-selected" : ""}`}
      aria-label={board.title}
      style={
        {
          left: presentation.x ?? board.x,
          top: presentation.y ?? board.y,
          width: presentation.w ?? board.w,
          height: presentation.h ?? board.h,
          "--inverse-scale": 1 / scale,
        } as CSSProperties
      }
    >
      <div
        className="artboard-caption"
        onPointerDown={(event) => start(event)}
        onPointerMove={move}
        onPointerUp={() => finish()}
        onPointerCancel={() => finish(true)}
        title="Drag to move artboard"
      >
        <span>{board.title}</span>
        <span className="artboard-dimensions">
          {Math.round(presentation.w ?? board.w)} ×{" "}
          {Math.round(presentation.h ?? board.h)}
        </span>
        <button
          aria-label={`Fit canvas around ${board.title}`}
          title="Fit all artboards"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={actions.onFit}
        >
          <Icon name="fit" size={13} />
        </button>
      </div>
      <GuestFrame
        revision={revision}
        file={board.file}
        html={html}
        selectedTid={selectedTid}
        scale={scale}
        tool={tool}
        onGuest={onGuest}
      />
      {selected && (
        <>
          <span className="selection-corner corner-nw" />
          <span className="selection-corner corner-ne" />
          <span className="selection-corner corner-sw" />
          <button
            className="selection-corner corner-se resize-handle"
            aria-label={`Resize ${board.title}`}
            title="Drag to resize artboard"
            onPointerDown={(event) => start(event, true)}
            onPointerMove={move}
            onPointerUp={() => finish()}
            onPointerCancel={() => finish(true)}
          />
        </>
      )}
    </section>
  );
}
