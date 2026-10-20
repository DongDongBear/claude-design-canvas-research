import type { GuestCommand, GuestEvent, Tool } from "../contracts";
import { measureElement } from "./measurement";
import { isGuestCommand } from "./protocol";
import { parseStaticTemplate } from "./template";
import { isTextEditableElement } from "../model/staticTemplate";

type WithoutRevision<Event> = Event extends unknown
  ? Omit<Event, "revision">
  : never;
type GuestIntent = WithoutRevision<GuestEvent>;

interface Drag {
  pointerId: number;
  screenX: number;
  screenY: number;
}

interface TextEdit {
  element: HTMLElement;
  tid: string;
  original: string;
  rendered: string;
}

type DeferredIntent =
  | { type: "pick"; tid: string }
  | {
      type: "insert";
      kind: "text" | "rectangle" | "note";
      x: number;
      y: number;
    };

function requiredElement(root: HTMLElement, selector: string): HTMLElement {
  const element = root.querySelector(selector);
  if (!(element instanceof HTMLElement))
    throw new Error(`缺少 Guest 节点：${selector}`);
  return element;
}

export class GuestService {
  private readonly surface: HTMLElement;
  private readonly ring: HTMLElement;
  private readonly error: HTMLElement;
  private readonly hint: HTMLElement;
  private readonly resizeObserver: ResizeObserver;
  private readonly mutationObserver: MutationObserver;
  private selectedTid: string | undefined;
  private revision: number | undefined;
  private file: string | undefined;
  private html: string | undefined;
  private awaitingRevision: number | undefined;
  private deferredIntent: DeferredIntent | undefined;
  private tool: Tool = "select";
  private drag: Drag | undefined;
  private edit: TextEdit | undefined;
  private headNodes: HTMLElement[] = [];
  private frame: number | undefined;
  private disposed = false;
  private started = false;
  private spaceHeld = false;

  constructor(root: HTMLElement) {
    this.surface = requiredElement(root, "[data-guest-surface]");
    this.ring = requiredElement(root, "[data-guest-ring]");
    this.error = requiredElement(root, "[data-guest-error]");
    this.hint = requiredElement(root, "[data-guest-hint]");
    this.resizeObserver = new ResizeObserver(this.scheduleMeasure);
    this.mutationObserver = new MutationObserver(this.scheduleMeasure);
  }

  start(): () => void {
    if (this.started) throw new Error("GuestService 不能重复启动");
    this.started = true;
    window.addEventListener("message", this.onMessage);
    window.addEventListener("resize", this.scheduleMeasure);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerEnd);
    window.addEventListener("pointercancel", this.onPointerEnd);
    window.addEventListener("blur", this.onWindowBlur);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("load", this.scheduleMeasure, true);
    document.fonts.addEventListener("loadingdone", this.scheduleMeasure);
    this.surface.addEventListener("pointerdown", this.onPointerDown);
    this.surface.addEventListener("dblclick", this.onDoubleClick);
    this.surface.addEventListener("click", this.onClick);
    this.surface.addEventListener("submit", this.onSubmit);
    this.surface.addEventListener("wheel", this.onWheel, { passive: false });
    this.surface.addEventListener("scroll", this.scheduleMeasure, true);
    this.surface.addEventListener("focusout", this.onFocusOut);
    this.surface.addEventListener("beforeinput", this.onBeforeInput);
    this.resizeObserver.observe(this.surface);
    this.mutationObserver.observe(this.surface, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    this.post({ channel: "canvas-reconstruction", type: "ready" });
    return this.dispose;
  }

  private readonly dispose = (): void => {
    if (this.disposed) return;
    this.disposed = true;
    this.finishText(false);
    this.deferredIntent = undefined;
    this.finishDrag();
    if (this.frame !== undefined) cancelAnimationFrame(this.frame);
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
    this.headNodes.forEach((node) => node.remove());
    window.removeEventListener("message", this.onMessage);
    window.removeEventListener("resize", this.scheduleMeasure);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerEnd);
    window.removeEventListener("pointercancel", this.onPointerEnd);
    window.removeEventListener("blur", this.onWindowBlur);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("load", this.scheduleMeasure, true);
    document.fonts.removeEventListener("loadingdone", this.scheduleMeasure);
    this.surface.removeEventListener("pointerdown", this.onPointerDown);
    this.surface.removeEventListener("dblclick", this.onDoubleClick);
    this.surface.removeEventListener("click", this.onClick);
    this.surface.removeEventListener("submit", this.onSubmit);
    this.surface.removeEventListener("wheel", this.onWheel);
    this.surface.removeEventListener("scroll", this.scheduleMeasure, true);
    this.surface.removeEventListener("focusout", this.onFocusOut);
    this.surface.removeEventListener("beforeinput", this.onBeforeInput);
  };

  private post(event: GuestIntent): void {
    if (this.disposed || window.parent === window) return;
    if (event.type === "ready") {
      window.parent.postMessage(event, location.origin);
    } else if (this.revision !== undefined) {
      const message: GuestEvent = { ...event, revision: this.revision };
      window.parent.postMessage(message, location.origin);
    }
  }

  private readonly onMessage = (event: MessageEvent<unknown>): void => {
    if (
      event.source !== window.parent ||
      event.origin !== location.origin ||
      !isGuestCommand(event.data)
    )
      return;
    this.receive(event.data);
  };

  private receive(command: GuestCommand): void {
    if (command.type === "document") {
      if (
        this.revision !== undefined &&
        command.file === this.file &&
        command.revision < this.revision
      )
        return;
      const sameDocument =
        command.file === this.file && command.html === this.html;
      if (!sameDocument) {
        this.finishText(false);
        this.finishDrag();
      }
      if (command.file !== this.file) {
        this.awaitingRevision = undefined;
        this.deferredIntent = undefined;
      }
      this.file = command.file;
      this.html = command.html;
      this.revision = command.revision;
      if (command.selectedTid !== this.selectedTid)
        this.deferredIntent = undefined;
      if (
        sameDocument &&
        this.edit &&
        (command.selectedTid !== this.edit.tid || command.tool !== this.tool)
      ) {
        this.finishText(true);
      }
      this.selectedTid = command.selectedTid;
      this.tool = command.tool;
      if (!sameDocument) this.loadDocument(command.html);
      if (
        this.awaitingRevision !== undefined &&
        command.revision > this.awaitingRevision
      ) {
        this.awaitingRevision = undefined;
        const deferred = this.deferredIntent;
        this.deferredIntent = undefined;
        if (deferred && this.error.hidden) this.dispatchIntent(deferred);
      }
    } else if (command.type === "select") {
      if (command.tid !== this.selectedTid) this.deferredIntent = undefined;
      if (this.edit && command.tid !== this.edit.tid) this.finishText(true);
      this.selectedTid = command.tid;
    } else {
      if (command.tool !== this.tool) this.finishText(true);
      this.tool = command.tool;
    }
    this.updateCursor();
    this.scheduleMeasure();
  }

  private loadDocument(html: string): void {
    this.headNodes.forEach((node) => node.remove());
    this.headNodes = [];
    this.error.hidden = true;
    this.ring.hidden = true;
    try {
      const template = parseStaticTemplate(html);
      this.surface.replaceChildren(template.content);
      this.headNodes = template.head;
      document.head.append(...this.headNodes);
      document.title = template.title;
    } catch (error) {
      this.surface.replaceChildren();
      this.error.textContent =
        error instanceof Error ? error.message : "静态模板无法加载。";
      this.error.hidden = false;
    }
  }

  private targetAt(event: MouseEvent): Element | undefined {
    const target =
      event.target instanceof Element
        ? event.target.closest("[data-dc-tpl]")
        : null;
    return target && this.surface.contains(target) ? target : undefined;
  }

  private selectedElement(): Element | undefined {
    if (!this.selectedTid) return;
    return [...this.surface.querySelectorAll("[data-dc-tpl]")].find(
      (element) => element.getAttribute("data-dc-tpl") === this.selectedTid,
    );
  }

  private dispatchIntent(intent: DeferredIntent): void {
    // 文本提交会推进父模型代次；同次点击需等新文档确认，不能重用旧代次。
    if (this.awaitingRevision !== undefined) {
      this.deferredIntent = intent;
      return;
    }
    if (intent.type === "insert") {
      this.post({ channel: "canvas-reconstruction", ...intent });
      return;
    }
    const element = [...this.surface.querySelectorAll("[data-dc-tpl]")].find(
      (candidate) => candidate.getAttribute("data-dc-tpl") === intent.tid,
    );
    if (!element) return;
    this.selectedTid = intent.tid;
    const details = measureElement(element);
    this.post({
      channel: "canvas-reconstruction",
      type: "pick",
      tid: intent.tid,
      details,
    });
    this.scheduleMeasure();
  }

  private readonly scheduleMeasure = (): void => {
    if (this.disposed || this.frame !== undefined) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      const element = this.selectedElement();
      this.ring.hidden = !element;
      if (!element) return;
      const details = measureElement(element);
      const rect = element.getBoundingClientRect();
      Object.assign(this.ring.style, {
        left: `${rect.x}px`,
        top: `${rect.y}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      });
      this.post({ channel: "canvas-reconstruction", type: "inspect", details });
    });
  };

  private updateCursor(): void {
    this.surface.style.cursor = this.drag
      ? "grabbing"
      : this.tool === "hand" || this.spaceHeld
        ? "grab"
        : this.tool === "select"
          ? "default"
          : "crosshair";
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0 && event.button !== 1) return;
    if (
      this.edit &&
      event.target instanceof Node &&
      this.edit.element.contains(event.target)
    )
      return;
    this.finishText(true);
    event.preventDefault();
    if (this.tool === "hand" || this.spaceHeld || event.button === 1) {
      this.drag = {
        pointerId: event.pointerId,
        screenX: event.screenX,
        screenY: event.screenY,
      };
      this.surface.setPointerCapture(event.pointerId);
      this.updateCursor();
      return;
    }
    if (this.tool !== "select") {
      this.dispatchIntent({
        type: "insert",
        kind: this.tool,
        x: event.clientX,
        y: event.clientY,
      });
      return;
    }
    const element = this.targetAt(event);
    if (!element) return;
    const tid = element.getAttribute("data-dc-tpl");
    if (tid) this.dispatchIntent({ type: "pick", tid });
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.drag || this.drag.pointerId !== event.pointerId) return;
    const dx = event.screenX - this.drag.screenX;
    const dy = event.screenY - this.drag.screenY;
    this.drag = {
      pointerId: event.pointerId,
      screenX: event.screenX,
      screenY: event.screenY,
    };
    if (dx || dy)
      this.post({ channel: "canvas-reconstruction", type: "pan", dx, dy });
  };

  private readonly onPointerEnd = (event: PointerEvent): void => {
    if (this.drag?.pointerId === event.pointerId) this.finishDrag();
  };

  private finishDrag(): void {
    if (this.drag && this.surface.hasPointerCapture(this.drag.pointerId)) {
      this.surface.releasePointerCapture(this.drag.pointerId);
    }
    this.drag = undefined;
    this.updateCursor();
  }

  private readonly onWindowBlur = (): void => {
    this.spaceHeld = false;
    this.finishDrag();
    this.finishText(true);
  };

  private readonly onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    if (this.edit) return;
    const unit =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1;
    if (event.ctrlKey || event.metaKey) {
      const factor = Math.exp(
        -Math.max(-500, Math.min(500, event.deltaY * unit)) * 0.002,
      );
      this.post({
        channel: "canvas-reconstruction",
        type: "zoom",
        factor,
        x: event.clientX,
        y: event.clientY,
      });
    } else {
      this.post({
        channel: "canvas-reconstruction",
        type: "pan",
        dx: -event.deltaX * unit,
        dy: -event.deltaY * unit,
      });
    }
  };

  private readonly onClick = (event: MouseEvent): void => {
    if (!this.edit) event.preventDefault();
  };

  private readonly onSubmit = (event: Event): void => {
    event.preventDefault();
  };

  private readonly onDoubleClick = (event: MouseEvent): void => {
    if (this.tool !== "select" || this.spaceHeld) return;
    const element = this.targetAt(event);
    if (
      !(element instanceof HTMLElement) ||
      !isTextEditableElement(element) ||
      !element.textContent?.trim()
    )
      return;
    const tid = element.getAttribute("data-dc-tpl");
    if (!tid) return;
    event.preventDefault();
    this.finishText(true);
    const original = element.textContent ?? "";
    element.contentEditable = "plaintext-only";
    this.edit = {
      element,
      tid,
      original,
      rendered: element.innerText.replace(/\r\n/g, "\n"),
    };
    element.focus();
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    this.hint.hidden = false;
  };

  private readonly onFocusOut = (event: FocusEvent): void => {
    if (this.edit?.element === event.target) this.finishText(true);
  };

  private readonly onBeforeInput = (event: InputEvent): void => {
    if (
      !this.edit ||
      !(event.target instanceof Node) ||
      !this.edit.element.contains(event.target)
    ) {
      event.preventDefault();
    }
  };

  private finishText(commit: boolean): void {
    const edit = this.edit;
    if (!edit) return;
    this.edit = undefined;
    const text = edit.element.innerText.replace(/\r\n/g, "\n");
    edit.element.removeAttribute("contenteditable");
    edit.element.textContent = edit.original;
    window.getSelection()?.removeAllRanges();
    this.hint.hidden = true;
    if (commit && text !== edit.rendered && text !== edit.original) {
      this.awaitingRevision = this.revision;
      this.post({
        channel: "canvas-reconstruction",
        type: "text",
        tid: edit.tid,
        text,
      });
    }
    this.scheduleMeasure();
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.isComposing || event.keyCode === 229) return;
    if (this.edit) {
      if (
        event.key === "Escape" ||
        (event.key === "Enter" && !event.shiftKey)
      ) {
        event.preventDefault();
        event.stopPropagation();
        this.finishText(event.key === "Enter");
      }
      return;
    }
    if (
      event.target instanceof HTMLElement &&
      event.target.closest("input,textarea,select,[contenteditable]")
    )
      return;
    const modifier = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();
    let action: "undo" | "redo" | "fit" | Tool | undefined;
    if (modifier && key === "z") action = event.shiftKey ? "redo" : "undo";
    else if (modifier && key === "y") action = "redo";
    else if (
      !modifier &&
      !event.altKey &&
      event.shiftKey &&
      event.code === "Digit1"
    )
      action = "fit";
    else if (!modifier && !event.altKey && !event.shiftKey) {
      const tools: Partial<Record<string, Tool>> = {
        v: "select",
        h: "hand",
        t: "text",
        r: "rectangle",
        n: "note",
      };
      action = tools[key];
    }
    if (action) {
      event.preventDefault();
      this.post({ channel: "canvas-reconstruction", type: "shortcut", action });
      return;
    }
    if (event.code === "Space") {
      event.preventDefault();
      this.spaceHeld = true;
      this.updateCursor();
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    if (event.code !== "Space") return;
    this.spaceHeld = false;
    this.updateCursor();
  };
}
