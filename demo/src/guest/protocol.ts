import type { GuestCommand, Tool } from "../contracts";

const channel = "canvas-reconstruction";
const tools = new Set<Tool>(["select", "hand", "text", "rectangle", "note"]);

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fields(
  value: Record<string, unknown>,
  names: readonly string[],
): boolean {
  return Object.keys(value).every((key) => names.includes(key));
}

function tid(value: unknown): value is string | undefined {
  return (
    value === undefined ||
    (typeof value === "string" && /^[A-Za-z0-9_-]{1,128}$/.test(value))
  );
}

function tool(value: unknown): value is Tool {
  return typeof value === "string" && tools.has(value as Tool);
}

export function isGuestCommand(value: unknown): value is GuestCommand {
  if (!record(value) || value.channel !== channel) return false;
  if (value.type === "select") {
    return fields(value, ["channel", "type", "tid"]) && tid(value.tid);
  }
  if (value.type === "tool") {
    return fields(value, ["channel", "type", "tool"]) && tool(value.tool);
  }
  if (value.type !== "document") return false;
  return (
    fields(value, [
      "channel",
      "type",
      "html",
      "file",
      "selectedTid",
      "tool",
      "revision",
    ]) &&
    typeof value.html === "string" &&
    value.html.length <= 5_000_000 &&
    typeof value.file === "string" &&
    value.file.length > 0 &&
    value.file.length <= 512 &&
    typeof value.revision === "number" &&
    Number.isSafeInteger(value.revision) &&
    value.revision >= 0 &&
    tid(value.selectedTid) &&
    tool(value.tool)
  );
}
