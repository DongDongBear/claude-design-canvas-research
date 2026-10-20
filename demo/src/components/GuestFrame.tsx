import { useEffect, useRef } from "react";
import type {
  ElementDetails,
  GuestCommand,
  GuestEvent,
  Tool,
} from "../contracts";

export interface GuestFrameProps {
  file: string;
  html: string;
  revision: number;
  selectedTid?: string;
  tool: Tool;
  scale: number;
  onGuest: (file: string, event: GuestEvent) => void;
}

function isDetails(value: unknown): value is ElementDetails {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const rect = item.rect as Record<string, unknown> | undefined;
  return (
    ["tid", "tag", "label", "style", "text"].every(
      (key) => typeof item[key] === "string",
    ) &&
    typeof item.textEditable === "boolean" &&
    !!rect &&
    ["x", "y", "w", "h"].every(
      (key) => typeof rect[key] === "number" && Number.isFinite(rect[key]),
    ) &&
    !!item.computed &&
    typeof item.computed === "object" &&
    Object.values(item.computed).every((value) => typeof value === "string")
  );
}

function isGuestEvent(value: unknown): value is GuestEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Record<string, unknown>;
  if (event.channel !== "canvas-reconstruction") return false;
  const number = (key: string) =>
    typeof event[key] === "number" && Number.isFinite(event[key]);
  if (
    event.type !== "ready" &&
    (!number("revision") ||
      !Number.isSafeInteger(event.revision) ||
      Number(event.revision) < 0)
  )
    return false;
  switch (event.type) {
    case "ready":
      return true;
    case "pick":
      return (
        typeof event.tid === "string" &&
        isDetails(event.details) &&
        event.tid === event.details.tid
      );
    case "inspect":
      return isDetails(event.details);
    case "text":
      return typeof event.tid === "string" && typeof event.text === "string";
    case "shortcut":
      return [
        "undo",
        "redo",
        "fit",
        "select",
        "hand",
        "text",
        "rectangle",
        "note",
      ].includes(String(event.action));
    case "pan":
      return number("dx") && number("dy");
    case "zoom":
      return (
        number("factor") &&
        Number(event.factor) > 0 &&
        number("x") &&
        number("y")
      );
    case "insert":
      return (
        ["text", "rectangle", "note"].includes(String(event.kind)) &&
        number("x") &&
        number("y")
      );
    default:
      return false;
  }
}

export function GuestFrame(props: GuestFrameProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const ready = useRef(false);
  const latest = useRef(props);
  latest.current = props;

  useEffect(() => {
    const onMessage = (event: MessageEvent<unknown>) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow ||
        !isGuestEvent(event.data)
      )
        return;
      const current = latest.current;
      if (event.data.type === "ready") {
        ready.current = true;
        const command: GuestCommand = {
          channel: "canvas-reconstruction",
          type: "document",
          html: current.html,
          file: current.file,
          selectedTid: current.selectedTid,
          tool: current.tool,
          revision: current.revision,
        };
        frame.current.contentWindow?.postMessage(
          command,
          window.location.origin,
        );
        return;
      }
      current.onGuest(current.file, event.data);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    const command: GuestCommand = {
      channel: "canvas-reconstruction",
      type: "document",
      html: props.html,
      file: props.file,
      selectedTid: props.selectedTid,
      tool: props.tool,
      revision: props.revision,
    };
    frame.current?.contentWindow?.postMessage(command, window.location.origin);
  }, [props.html, props.file, props.revision]);

  useEffect(() => {
    if (!ready.current) return;
    const command: GuestCommand = {
      channel: "canvas-reconstruction",
      type: "select",
      tid: props.selectedTid,
    };
    frame.current?.contentWindow?.postMessage(command, window.location.origin);
  }, [props.selectedTid]);

  useEffect(() => {
    if (!ready.current) return;
    const command: GuestCommand = {
      channel: "canvas-reconstruction",
      type: "tool",
      tool: props.tool,
    };
    frame.current?.contentWindow?.postMessage(command, window.location.origin);
  }, [props.tool]);

  return (
    <iframe
      ref={frame}
      className="artboard-frame"
      src="/guest.html"
      title={`Artboard: ${props.file}`}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
