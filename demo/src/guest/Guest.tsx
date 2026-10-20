import { useEffect, useRef } from "react";
import { GuestService } from "./GuestService";

export function Guest() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const service = new GuestService(root.current);
    return service.start();
  }, []);

  return (
    <div ref={root} className="guest-root">
      <main data-guest-surface />
      <div data-guest-ring aria-hidden="true" hidden />
      <div data-guest-error role="alert" hidden />
      <div data-guest-hint hidden>
        Enter 完成 · Shift+Enter 换行 · Esc 取消
      </div>
    </div>
  );
}
