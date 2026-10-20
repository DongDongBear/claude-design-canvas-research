function bt(e, t, n) {
  const r = [...t.values()].filter((o) =>
    o.targets.some((a) => a.startsWith(e + ".")),
  );
  return {
    wrap(o, a) {
      const c = `${e}.${o}`,
        i = r.filter((l) => l.targets.includes(c));
      return i.length === 0
        ? (...l) => {
            try {
              return a(...l);
            } catch (m) {
              return Promise.reject(m);
            }
          }
        : (...l) => {
            let m = l;
            for (const s of i) {
              const p = s.module.parameters;
              if (p)
                try {
                  m = p(m);
                } catch {
                  return Promise.reject({
                    code: "transform_error",
                    id: s.id,
                    scope: e,
                    message: "parameters transform failed",
                  });
                }
            }
            let h;
            try {
              h = a(...m);
            } catch (s) {
              h = Promise.reject(s);
            }
            return h.then(
              (s) => {
                for (let p = i.length - 1; p >= 0; p--) {
                  const f = i[p],
                    y = f.module.returns;
                  if (y)
                    try {
                      s = y(s);
                    } catch {
                      return (n({ id: f.id, scope: e, leg: "returns" }), s);
                    }
                }
                return s;
              },
              (s) => {
                for (let p = i.length - 1; p >= 0; p--) {
                  const f = i[p],
                    y = f.module.throws;
                  if (y)
                    try {
                      s = y(s);
                    } catch {
                      return (
                        n({ id: f.id, scope: e, leg: "throws" }),
                        Promise.reject(s)
                      );
                    }
                }
                return Promise.reject(s);
              },
            );
          };
    },
  };
}
function Er(e, t, n, r = () => {}) {
  const o = new Set(e.changes ?? []),
    a = new Map();
  for (const c of o) {
    const i = t[c];
    i && a.set(c, i);
  }
  return {
    contract: e.contract,
    changes: o,
    flags: new Set(e.flags ?? []),
    capabilities: e.capabilities ?? {},
    capBudgets: e.capBudgets ?? {},
    brokerGen: e.brokerGen,
    transforms: a,
    shellOrigin: n.shellOrigin,
    mount: n.mount,
    ...(n.hooks && { hooks: n.hooks }),
    ...(n.shell && { shell: n.shell }),
    pipe: (c) => bt(c, a, r),
  };
}
var Et = [
  "TypeError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "DataCloneError",
  "QuotaExceededError",
  "AbortError",
  "TimeoutError",
  "SecurityError",
  "Error",
  "other",
];
function wt(e) {
  return typeof e == "string" && Et.includes(e) ? e : "other";
}
var St = Object.freeze({ until: null, now: !1 }),
  kt = "__claude_hot_in",
  Lt = (e) => (e === void 0 ? kt : "__claude_hot_in:" + e),
  Ce = 1500,
  _t = /^[a-z0-9._:-]{1,64}$/,
  Re = ["none", "hot-restart", "hard-reload"];
function Tt(e, t) {
  return Re.indexOf(e) >= Re.indexOf(t) ? e : t;
}
var At = ["asset", "doc", "added", "removed"];
var It = "preflight.js",
  Mt = 1500,
  Ot = 8192,
  Pt = /^[0-9a-f]{64}$/,
  ye = Object.freeze({ "15m": 9e5, "1h": 36e5, "24h": 864e5, "7d": 6048e5 }),
  Ct = /^\d{4}-\d{2}-\d{2}(?:$|T.*(?:Z|[+-]\d{2}:?\d{2})$)/i;
function Rt(e) {
  return (
    typeof e == "string" &&
    (e === "now" ||
      Object.hasOwn(ye, e) ||
      (e.length <= 40 && Ct.test(e) && Number.isFinite(Date.parse(e))))
  );
}
function xt(e) {
  if (e === null) return null;
  const t = Se(e);
  if (t === null || Array.isArray(e)) return;
  const { deadline: n, required: r, note: o } = t,
    a = {};
  if (n !== void 0) {
    if (n !== null && !Rt(n)) return;
    a.deadline = n;
  }
  if (r !== void 0) {
    if (r !== "hot-restart" && r !== "hard-reload") return;
    a.required = r;
  }
  if (o !== void 0) {
    if (typeof o != "string" || !_t.test(o)) return;
    a.note = o;
  }
  return Object.freeze(a);
}
function Se(e) {
  return e !== null && typeof e == "object" ? e : null;
}
function xe(e) {
  if (e == null || typeof e == "string") return !0;
  const t = Se(e);
  return t !== null && typeof t.doc == "string" && typeof t.profile == "string";
}
function Dt(e) {
  const t = Se(e);
  return (
    t !== null &&
    typeof t.path == "string" &&
    At.includes(t.kind) &&
    xe(t.from) &&
    xe(t.to)
  );
}
function Nt(e) {
  return e === null ? null : Object.freeze(e.filter(Dt));
}
var Je = 256,
  Ht = 3,
  O = new Map(),
  P = new Set(),
  re = new Set(),
  U = new Map(),
  F = new Map(),
  oe = new Set(),
  ie = new Set(),
  E,
  V = !1;
function jt() {
  return V;
}
var Qe;
function Ut(e) {
  Qe = e;
}
var q = 0,
  Y = () => {};
function z(e, t) {
  try {
    e?.(t);
  } catch {}
}
function ke(e) {
  try {
    return new DOMException(e, "AbortError");
  } catch (t) {
    return t;
  }
}
var et = () =>
    ke(
      "play() was not carried out because the artifact was hidden when it was called; call play() again if playback is still wanted",
    ),
  Ft = () =>
    ke(
      "The play() request was interrupted because the media was removed from the document",
    );
function X(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    "paused" in e &&
    typeof e.pause == "function"
  );
}
function Z(e, t = !1) {
  try {
    if (!e.paused) {
      q++;
      try {
        e.pause();
      } finally {
        q--;
      }
      (t && !O.has(e) && (P.size >= Je && zt(), P.add(e)),
        O.set(e, e.isConnected));
    }
  } catch {}
}
function Le(e) {
  try {
    if (
      (ie.has(e) || (ie.add(e), e.addEventListener("statechange", tt)),
      e.state === "running")
    ) {
      (re.add(e), q++);
      try {
        Promise.resolve(e.suspend()).catch(Y);
      } finally {
        q--;
      }
    }
  } catch {}
}
function zt() {
  for (const e of P)
    try {
      O.get(e) === !0 && !e.isConnected && (O.delete(e), P.delete(e));
    } catch {}
}
function tt() {
  V && Le(this);
}
var qt = (e) => O.has(e) && !P.has(e);
function De(e) {
  try {
    const t = e.duration,
      n = typeof t == "number" && t <= Ht;
    return e.loop || e.muted || e.volume === 0 || !n;
  } catch {
    return !0;
  }
}
function Bt(e) {
  if (X(e))
    return (!e.paused && q === 0 && Z(e, !0), Ne(U, e, e.isConnected, !0));
  if (typeof e.resume == "function") return Ne(F, e, !1, !1);
}
function Ne(e, t, n, r) {
  let o = e.get(t);
  if (o) o.connected = n;
  else {
    if (e.size >= Je) return r ? Promise.reject(et()) : void 0;
    let a = Y,
      c = Y;
    ((o = {
      promise: new Promise((i, l) => {
        ((a = i), (c = l));
      }),
      resolve: a,
      reject: c,
      connected: n,
    }),
      e.set(t, o));
  }
  return o.promise;
}
function nt(e) {
  try {
    Promise.resolve(e.release()).catch(Y);
  } catch {}
}
function Kt() {
  return Promise.reject(
    new DOMException(
      "The requesting page is not visible: the panel showing it is closed.",
      "NotAllowedError",
    ),
  );
}
function $t(e) {
  X(e) ? Z(e, !0) : "released" in e ? nt(e) : Le(e);
}
function Wt(e) {
  if (!(q > 0))
    if (X(e)) {
      const t = U.get(e);
      (U.delete(e),
        O.delete(e),
        P.delete(e),
        z(
          t?.reject,
          ke("The play() request was interrupted by a call to pause()"),
        ));
    } else {
      const t = F.get(e);
      (F.delete(e), re.delete(e), z(t?.resolve));
    }
}
function rt(e) {
  X(e.target) && Z(e.target, !0);
}
function ve(e) {
  if (e.nodeType === 9) {
    const t = e;
    oe.has(t) || (oe.add(t), t.addEventListener("play", rt, !0));
  }
  for (const t of e.querySelectorAll("audio,video")) Z(t);
  for (const t of e.querySelectorAll("*"))
    if ((t.shadowRoot && ve(t.shadowRoot), t.localName === "iframe")) {
      let n = null;
      try {
        n = t.contentDocument;
      } catch {}
      n && ve(n);
    }
}
function ee(e, t) {
  try {
    Promise.resolve(X(e) ? e.play() : e.resume()).then(
      t?.resolve,
      t?.reject ?? Y,
    );
  } catch (n) {
    z(t?.reject, n);
  }
}
function wr(e, t) {
  Vt(e, t);
  try {
    Qe?.();
  } catch {}
}
function Vt(e, t) {
  if (((E = t ?? E), !e)) {
    if (V) return;
    ((V = !0),
      E && ((E.gate = Bt), (E.refuse = Kt), (E.onStart = $t), (E.onStop = Wt)));
    try {
      ve(document);
    } catch {}
    if (E) {
      for (const n of E.media) Z(n);
      for (const n of E.contexts) Le(n);
      for (const n of E.wakeLocks) nt(n);
      E.wakeLocks.clear();
    }
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    return;
  }
  ((V = !1),
    E &&
      ((E.gate = null),
      (E.refuse = null),
      (E.onStart = null),
      (E.onStop = null)));
  for (const n of oe)
    try {
      n.removeEventListener("play", rt, !0);
    } catch {}
  oe.clear();
  for (const n of ie)
    try {
      n.removeEventListener("statechange", tt);
    } catch {}
  ie.clear();
  for (const [n, r] of U)
    try {
      r.connected && !n.isConnected
        ? z(r.reject, Ft())
        : !qt(n) && !De(n)
          ? z(r.reject, et())
          : ee(n, r);
    } catch (o) {
      z(r.reject, o);
    }
  for (const [n, r] of O)
    try {
      const o = r && !n.isConnected,
        a = P.has(n) && !De(n);
      !U.has(n) && !o && !a && ee(n);
    } catch {}
  (O.clear(), P.clear());
  for (const n of re)
    try {
      !F.has(n) && n.state !== "closed" && ee(n);
    } catch {}
  re.clear();
  for (const [n, r] of F) ee(n, r);
  (U.clear(), F.clear());
}
var _e = {
    post: (e, t) =>
      t?.activation
        ? parent.postMessage(e, {
            targetOrigin: "*",
            includeUserActivation: !0,
          })
        : parent.postMessage(e, "*"),
  },
  C = _e;
function se(e) {
  const t = e.composedPath ? e.composedPath() : [e.target];
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (r && r.matches && r.matches("a[href],area[href]")) return r;
  }
  return e.target && e.target.closest
    ? e.target.closest("a[href],area[href]")
    : null;
}
function ot(e, t) {
  const n = (
    t.getAttribute("target") ??
    document.querySelector("base[target]")?.getAttribute("target") ??
    ""
  ).toLowerCase();
  return (
    e.type === "auxclick" ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    !["", "_self", "_top", "_parent"].includes(n)
  );
}
function ge(e) {
  if (window === top || (e.type === "auxclick" && e.button !== 1)) return;
  const t = se(e);
  if (!t) return;
  const n = t.getAttribute("href");
  if (!n || n.trim()[0] === "#") return;
  let r;
  try {
    r = new URL(n, document.baseURI);
  } catch {
    return;
  }
  (r.protocol === "http:" || r.protocol === "https:") &&
    r.origin !== location.origin &&
    (e.preventDefault(),
    C.post(
      { __frame_nav: !0, url: r.href, rawHref: n, newTab: ot(e, t) },
      "userActivation" in MessageEvent.prototype ? { activation: !0 } : void 0,
    ));
}
function He(e) {
  if (
    window === top ||
    e.defaultPrevented ||
    (e.type === "auxclick" && e.button !== 1)
  )
    return;
  const t = se(e);
  if (!t) return;
  const n = t.getAttribute("href");
  if (!n || n.charAt(0) !== "#" || n.length <= 1) return;
  let r;
  try {
    r = new URL(n, document.baseURI);
  } catch {
    return;
  }
  r.origin === location.origin &&
    C.post({ __frame_nav: !0, url: r.href, rawHref: n, newTab: ot(e, t) });
}
var je = {};
function K(e) {
  if (window === top) return;
  const t = Date.now();
  t - (je[e] || 0) < 500 ||
    ((je[e] = t), C.post({ __frame_engaged: !0, kind: e }));
}
var Yt = 2e3,
  Ue = ["wheel", "touchstart", "touchmove", "keydown", "pointerdown"],
  Te = 0;
function Gt(e) {
  e.isTrusted && ((Te = Date.now()), ce());
}
var Xt = 15e3,
  ae = !1,
  be = 0,
  $ = 0;
function Zt() {
  return document.visibilityState === "visible" && !jt();
}
var Ee,
  Fe = (e) => !e.paused && !e.ended;
function Jt() {
  try {
    for (const e of document.querySelectorAll("video,audio"))
      if (Fe(e)) return !0;
    for (const e of Ee?.media ?? []) if (Fe(e)) return !0;
    for (const e of Ee?.contexts ?? []) if (e.state === "running") return !0;
  } catch {}
  return !1;
}
function ce() {
  ae && $ && ((ae = !1), C.post({ __frame_idle: !0, idle: !1 }));
}
function te() {
  if (!Zt()) {
    $ = 0;
    return;
  }
  const e = Date.now();
  ($ || (($ = e), ce()),
    Jt() && ((be = e), ce()),
    !ae &&
      e - Math.max(Te, be, $) >= 3e5 &&
      ((ae = !0), C.post({ __frame_idle: !0, idle: !0 })));
}
var ze = 0;
function it(e) {
  if (window === top || e.button !== 0) return;
  const t = se(e);
  if (!(!t || !t.hasAttribute("download"))) {
    try {
      const n = new URL(t.getAttribute("href") ?? "", document.baseURI);
      if (
        (n.protocol === "http:" || n.protocol === "https:") &&
        n.origin !== new URL(document.baseURI).origin
      )
        return;
    } catch {
      return;
    }
    setTimeout(() => {
      const n = Date.now();
      e.defaultPrevented ||
        n - ze < 1e3 ||
        ((ze = n), C.post({ __frame_blocked: !0, kind: "download" }));
    }, 0);
  }
}
function Qt(e) {
  e.defaultPrevented || ge(e);
}
var qe = !1;
function en() {
  if (qe || window === top) return;
  qe = !0;
  const e = HTMLAnchorElement.prototype,
    t = Object.getPrototypeOf(e),
    n = (r, o) => {
      r instanceof HTMLAnchorElement &&
        !r.isConnected &&
        r.hasAttribute("download") &&
        (o === void 0 || o?.type === "click") &&
        (r.addEventListener("click", Qt, { once: !0 }),
        r.addEventListener("click", it, { once: !0 }));
    };
  try {
    ((e.click = function () {
      (n(this), t.click.call(this));
    }),
      (e.dispatchEvent = function (r) {
        return (n(this, r), t.dispatchEvent.call(this, r));
      }));
  } catch {}
}
function tn(e) {
  if (
    window === top ||
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  )
    return;
  const t = se(e);
  if (!t || t.hasAttribute("download")) return;
  const n = t.getAttribute("href")?.trim(),
    r = (t.getAttribute("target") ?? "").toLowerCase();
  if (!n || n[0] !== "#" || (r !== "" && r !== "_self")) return;
  let o, a;
  try {
    ((o = new URL(n, location.href)), (a = new URL(n, document.baseURI).href));
  } catch {
    return;
  }
  o.href !== a && (e.preventDefault(), location.assign(o.href));
}
function Sr(e) {
  ((C = e ?? _e),
    addEventListener("click", ge, !0),
    addEventListener("auxclick", ge, !0),
    addEventListener("click", He),
    addEventListener("auxclick", He),
    addEventListener("click", tn),
    addEventListener("click", it, !0),
    en());
}
function kr(e, t, n) {
  ((C = t ?? _e), (Ee = n));
  for (let r = 0; r < Ue.length; r++)
    addEventListener(Ue[r], Gt, { capture: !0, passive: !0 });
  (addEventListener(
    "scroll",
    (r) => {
      r.isTrusted && Date.now() - Te < Yt && K("scroll");
    },
    { capture: !0, passive: !0 },
  ),
    addEventListener(
      "pointermove",
      (r) => {
        r.isTrusted && ((be = Date.now()), ce(), K("pointer"));
      },
      { capture: !0, passive: !0 },
    ),
    addEventListener(
      "click",
      (r) => {
        r.isTrusted && K("click");
      },
      { capture: !0, passive: !0 },
    ),
    e?.pointer && K("pointer"),
    e?.click && K("click"),
    window !== top &&
      (te(),
      document.addEventListener("visibilitychange", te),
      Ut(te),
      setInterval(te, Xt)));
}
function Lr(e, t, n) {
  const r = n ?? { post: (m) => parent.postMessage(m, e) };
  let o = -1,
    a = 0;
  const c = () => {
      a = 0;
      const m = Math.max(
        document.documentElement.scrollHeight,
        document.body ? document.body.scrollHeight : 0,
      );
      m !== o && ((o = m), r.post({ __frame_size: !0, h: m }));
    },
    i = () => {
      a || (a = setTimeout(c, 200));
    },
    l = new ResizeObserver(i);
  (l.observe(document.documentElement),
    document.body && l.observe(document.body),
    document.addEventListener("load", i, !0),
    document.fonts?.ready.then(i, () => {}),
    addEventListener("beforeprint", () => {
      ((o = -1), c());
    }),
    (t.cb = () => {
      ((o = -1), i());
    }),
    i());
}
var nn = /([^\t\n\f\r =,]+)[^=,]*[\t\n\f\r =]*([^\t\n\f\r =,]*)/g;
function rn(e) {
  let t = "";
  for (const [, n = "", r = ""] of e.matchAll(nn))
    n.toLowerCase() === "viewport-fit" && (t = r.toLowerCase());
  return t;
}
function at(e, t) {
  const n = Document.prototype.querySelectorAll.call(e, `meta[name="${t}" i]`);
  return n.item(n.length - 1)?.getAttribute("content") ?? "";
}
function on(e) {
  return rn(at(e, "viewport")) === "cover";
}
function _r() {
  return on(document);
}
function Tr() {
  return (
    at(document, "claude:viewport-fit-sides").trim().toLowerCase() === "cover"
  );
}
var an = /^(checkbox|radio|range|button|submit|reset|image)$/i;
function ct(e) {
  if (document.designMode === "on") return !0;
  const t = e.composedPath()[0] ?? e.target;
  if (!(t instanceof Element)) return !1;
  const n = t.closest("input,textarea,select");
  return n !== null &&
    !(n.tagName === "INPUT" && an.test(n.getAttribute("type") ?? ""))
    ? !0
    : t instanceof HTMLElement && t.isContentEditable;
}
var cn = /^(button|checkbox|color|file|hidden|image|radio|range|reset|submit)$/;
function pe(e) {
  if (!(e instanceof HTMLElement)) return !1;
  if ("readOnly" in e && "disabled" in e && "type" in e) {
    const t = e;
    return !t.disabled && !t.readOnly && !cn.test(t.type);
  }
  return e.isContentEditable;
}
var sn = Object.freeze({ __frame_escape: !0, __fc_escape: !0 });
function ln(e) {
  return e instanceof HTMLElement && e.popover !== "manual";
}
function un(e) {
  if (document.fullscreenElement) return !0;
  const t = [document];
  for (const r of e) r instanceof ShadowRoot && t.push(r);
  const n = () => t.some((r) => r.querySelector("dialog:modal") !== null);
  try {
    return (
      n() ||
      t.some((r) =>
        Array.from(r.querySelectorAll("[popover]:popover-open")).some(ln),
      )
    );
  } catch {
    try {
      return n();
    } catch {
      return !1;
    }
  }
}
var fn = 500;
function dn(e, t) {
  return !(
    e.defaultPrevented ||
    e.repeat ||
    e.isComposing ||
    e.keyCode === 229 ||
    e.timeStamp - t < fn ||
    e.ctrlKey ||
    e.altKey ||
    e.metaKey ||
    e.shiftKey ||
    ct(e)
  );
}
function Ar(e, t) {
  let n = null,
    r = -1 / 0;
  (addEventListener(
    "compositionend",
    (o) => {
      r = o.timeStamp;
    },
    !0,
  ),
    (e.cb = (o) => {
      o.key === "Escape" && un(o.composedPath()) && (n = o);
    }),
    addEventListener("keydown", (o) => {
      const a = o === n;
      ((n = null),
        !(o.key !== "Escape" || a || !dn(o, r)) &&
          setTimeout(() => {
            o.defaultPrevented || t(sn);
          }, 0));
    }));
}
var Be = "largest-contentful-paint";
function pn() {
  if (document.visibilityState === "hidden") return 0;
  let e = 1 / 0;
  for (const t of performance.getEntriesByType?.("visibility-state") ?? [])
    t.name === "hidden" && t.startTime < e && (e = t.startTime);
  return e;
}
function Ir(e) {
  if (
    typeof PerformanceObserver > "u" ||
    !PerformanceObserver.supportedEntryTypes?.includes(Be)
  )
    return;
  const t = pn();
  if (t === 0) return;
  let n = -1,
    r = !1;
  const o = (h) => {
      for (const s of h) {
        const p = s.renderTime || s.loadTime || s.startTime;
        p < t && (n = p);
      }
    },
    a = new PerformanceObserver((h) => o(h.getEntries())),
    c = () => {
      n >= 0 && e.post({ __frame_vital: { name: "lcp", value: n } });
    },
    i = ["keydown", "click", "pointerdown"],
    l = () => {
      document.visibilityState === "hidden" && m();
    };
  function m() {
    if (!r) {
      ((r = !0), o(a.takeRecords()), a.disconnect());
      for (const h of i) removeEventListener(h, m, !0);
      (removeEventListener("pagehide", m),
        document.removeEventListener("visibilitychange", l),
        c());
    }
  }
  try {
    a.observe({ type: Be, buffered: !0 });
  } catch {
    return;
  }
  for (const h of i) addEventListener(h, m, { once: !0, capture: !0 });
  (addEventListener("pagehide", m),
    document.addEventListener("visibilitychange", l));
}
var mn = /^[a-z0-9_]{1,48}$/,
  hn = new Set(["id", "key", "meta", "ctrl", "shift", "skipInEditable"]);
function yn(e) {
  if (e === null || typeof e != "object") return null;
  const t = e;
  if (
    Object.keys(t).some((r) => !hn.has(r)) ||
    typeof t.id != "string" ||
    !mn.test(t.id) ||
    typeof t.key != "string" ||
    t.key.length === 0 ||
    t.key.length > 32 ||
    (t.meta !== !0 && t.ctrl !== !0)
  )
    return null;
  const n = { id: t.id, key: t.key };
  for (const r of ["meta", "ctrl", "shift", "skipInEditable"])
    if (t[r] === !0) n[r] = !0;
    else if (t[r] !== void 0) return null;
  return n;
}
function vn(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e.slice(0, 16)) {
    const r = yn(n);
    r !== null && t.push(r);
  }
  return t;
}
function gn(e, t) {
  if (e.isComposing || e.keyCode === 229 || typeof e.key != "string")
    return null;
  const n = e.key.toLowerCase();
  for (const r of t)
    if (
      n === r.key.toLowerCase() &&
      e.metaKey === (r.meta === !0) &&
      e.ctrlKey === (r.ctrl === !0) &&
      e.shiftKey === (r.shift === !0) &&
      !e.altKey
    ) {
      if (r.skipInEditable && ct(e)) continue;
      return r;
    }
  return null;
}
function Mr(e, t, n) {
  const r = vn(t);
  r.length !== 0 &&
    (e.cb = (o) => {
      const a = gn(o, r);
      if (
        a === null ||
        o.defaultPrevented ||
        document.fullscreenElement ||
        (o.preventDefault(), o.repeat)
      )
        return;
      let c = !1;
      const i = o.preventDefault.bind(o);
      try {
        Object.defineProperty(o, "preventDefault", {
          configurable: !0,
          value: () => {
            ((c = !0), i());
          },
        });
      } catch {}
      setTimeout(() => {
        c || n({ __frame_host_key: !0, id: a.id });
      }, 0);
    });
}
var bn = /^rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)$/,
  En = "rgba(0, 0, 0, 0.5)",
  ne = new Map(),
  wn = 8;
function Ke(e) {
  const t = bn.exec(e);
  if (t)
    return [Number(t[1]), Number(t[2]), Number(t[3]), Number(t[4] ?? 1) * 255];
  let n = ne.get(e);
  if (!n) {
    const r = new OffscreenCanvas(1, 1).getContext("2d", {
      willReadFrequently: !0,
    });
    ((r.fillStyle = En), (r.fillStyle = e), r.fillRect(0, 0, 1, 1));
    const [o, a, c, i] = r.getImageData(0, 0, 1, 1).data;
    ((n = [o, a, c, i]), ne.size >= wn && ne.clear(), ne.set(e, n));
  }
  return n;
}
var Sn = 64,
  kn = 8;
function* Ln(e) {
  const { clientWidth: t, clientHeight: n } = e.ownerDocument.documentElement;
  if (!t || !n) return;
  let r = e,
    o;
  for (let a = 0; a < kn; a++) {
    let c;
    if (
      ((r = [...r.children].find(
        (i) => (
          (c = i.getBoundingClientRect()),
          c.width >= t - 1 &&
            c.height >= n - 1 &&
            (!o ||
              (c.left <= o.left + 1 &&
                c.right >= o.right - 1 &&
                c.height >= o.height - 1))
        ),
      )),
      !r)
    )
      return;
    (yield r, (o = c));
  }
}
function _n(e) {
  try {
    for (const t of "documentElement" in e
      ? [e.documentElement, e.body]
      : Ln(e)) {
      const {
        backgroundColor: n,
        backgroundImage: r,
        backgroundSize: o,
      } = t.ownerDocument.defaultView.getComputedStyle(t);
      let a;
      if (r === "none") {
        const i = t
            .getAnimations?.()
            .find(
              (m) =>
                "transitionProperty" in m &&
                m.transitionProperty === "background-color",
            )
            ?.effect?.getKeyframes()
            .pop(),
          l = Ke(String(i?.backgroundColor ?? n));
        if (l[3] === 0) continue;
        a = [l];
      } else
        a = (
          (/^auto(?: auto)?(?:,|$)/.test(o)
            ? /^[\w-]*gradient\((?:[^()]|\([^()]*\))*\)/.exec(r)
            : null)?.[0].match(/[\w-]{1,16}\([^()]*\)/g) ?? []
        ).map(Ke);
      if (a.length === 0) return null;
      const c = [0, 1, 2].map(
        (i) => a.reduce((l, m) => l + m[i], 0) / a.length,
      );
      return a.every(
        (i) => i[3] === 255 && c.every((l, m) => Math.abs(i[m] - l) <= Sn),
      )
        ? `#${c.map((i) => Math.round(i).toString(16).padStart(2, "0")).join("")}`
        : null;
    }
  } catch {}
  return null;
}
function Tn(e, t, n = 0, r = null) {
  const o = "documentElement" in e ? e : e.ownerDocument;
  let a = r,
    c = -1 / 0,
    i;
  const l = () => {
      const f = o.documentElement;
      if (!o.defaultView || (e !== o && !(f?.clientWidth && f.clientHeight)))
        return;
      const y = _n(e);
      y !== a && ((a = y), t(y));
    },
    m = () => {
      (clearTimeout(i), (i = void 0), (c = performance.now()), l());
    },
    h = () => {
      const f = c + n - performance.now();
      f <= 0 ? m() : (i ??= setTimeout(m, f));
    },
    s = [() => clearTimeout(i)],
    p = (f, y, g, k = !1) => {
      (f.addEventListener(y, g, k),
        s.push(() => f.removeEventListener(y, g, k)));
    };
  try {
    l();
    const f = o.defaultView;
    for (const g of ["load", "error"])
      p(
        o,
        g,
        (k) => {
          (k.target instanceof f.HTMLLinkElement ||
            k.target instanceof f.HTMLStyleElement) &&
            h();
        },
        !0,
      );
    for (const g of [
      "load",
      "resize",
      "transitionend",
      "transitioncancel",
      "animationend",
    ])
      p(f, g, h);
    p(f.matchMedia("(prefers-color-scheme: dark)"), "change", h);
    const y = new f.MutationObserver(h);
    s.push(() => y.disconnect());
    for (const g of [o.documentElement, o.body])
      y.observe(g, { attributes: !0 });
    e !== o && y.observe(e, { attributes: !0, childList: !0, subtree: !0 });
  } catch {}
  return () => {
    for (const f of s)
      try {
        f();
      } catch {}
  };
}
function Or(e) {
  let t = !1;
  (Tn(document, (n) => {
    ((t = !0), e(n));
  }),
    t || e(null));
}
var An = (function () {
    const t = typeof document < "u" && document.createElement("link").relList;
    return t && t.supports && t.supports("modulepreload")
      ? "modulepreload"
      : "preload";
  })(),
  In = function (e) {
    return "/" + e;
  },
  $e = {},
  Mn = function (t, n, r) {
    let o = Promise.resolve();
    if (n && n.length > 0) {
      let m = function (s) {
          return Promise.all(
            s.map((p) =>
              Promise.resolve(p).then(
                (f) => ({ status: "fulfilled", value: f }),
                (f) => ({ status: "rejected", reason: f }),
              ),
            ),
          );
        },
        h = function (s) {
          return import.meta.resolve
            ? import.meta.resolve(s)
            : new URL(s, import.meta.url).href;
        };
      const c = document.getElementsByTagName("link"),
        i = document.querySelector("meta[property=csp-nonce]"),
        l = i?.nonce || i?.getAttribute("nonce");
      o = m(
        n.map((s) => {
          if (((s = In(s, r)), (s = h(s)), s in $e)) return;
          $e[s] = !0;
          const p = s.endsWith(".css");
          for (let y = c.length - 1; y >= 0; y--) {
            const g = c[y];
            if (g.href === s && (!p || g.rel === "stylesheet")) return;
          }
          const f = document.createElement("link");
          if (
            ((f.rel = p ? "stylesheet" : An),
            p || (f.as = "script"),
            (f.crossOrigin = ""),
            (f.href = s),
            l && f.setAttribute("nonce", l),
            document.head.appendChild(f),
            p)
          )
            return new Promise((y, g) => {
              (f.addEventListener("load", y),
                f.addEventListener("error", () =>
                  g(new Error(`Unable to preload CSS for ${s}`)),
                ));
            });
        }),
      );
    }
    function a(c) {
      const i = new Event("vite:preloadError", { cancelable: !0 });
      if (((i.payload = c), window.dispatchEvent(i), !i.defaultPrevented))
        throw c;
    }
    return o.then((c) => {
      for (const i of c || []) i.status === "rejected" && a(i.reason);
      return t().catch(a);
    });
  },
  we = ["pointerdown", "pointerup", "click", "keydown", "keyup"],
  st = 256,
  On = 8192,
  Ae = 32,
  lt = 128,
  Pn = 1e4,
  Cn = 3,
  Rn = 30,
  xn = /^(?:text|search|url|tel|)$/,
  We = /\b(?:off|new-password|current-password|one-time-code|cc-[a-z-]+)\b/i,
  Dn =
    "a[href],area[href],button,input[type=submit],input[type=reset],input[type=image],input[type=file]",
  Nn = "http://www.w3.org/1999/xlink";
function Hn(e) {
  return e.closest(Dn) !== null ||
    e.closest("a")?.hasAttributeNS(Nn, "href") === !0
    ? !1
    : ut(e) || e.closest("label") === null;
}
var jn =
    /^(?:pass(?:word|wd|code|phrase)?|pwd|secret|token|apikey|cv[vc]|ssn|iban|pin|(?:card|cc|account|acct|routing)(?:number|num|no))\d*$/,
  Un = /^(?:api key|(?:card|cc|account|acct|routing) (?:number|num|no))\d*$/;
function Fn(e) {
  return [e.name, e.id].some((t) => {
    const n = t
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .split(/[^a-z0-9]+/);
    return n.some((r, o) => jn.test(r) || Un.test(`${r} ${n[o + 1] ?? ""}`));
  });
}
function ut(e) {
  return (
    e instanceof HTMLInputElement ||
    e instanceof HTMLTextAreaElement ||
    e instanceof HTMLSelectElement
  );
}
function Ve(e) {
  return e.__artifactSecret === !0;
}
function zn(e) {
  for (const t of [":autofill", ":-webkit-autofill"])
    try {
      if (e.matches(t)) return !0;
    } catch {}
  return !1;
}
function Ie(e) {
  return ut(e)
    ? Ve(e) ||
        zn(e) ||
        (e instanceof HTMLInputElement && e.type === "password") ||
        Fn(e) ||
        We.test(e.getAttribute("autocomplete") ?? "") ||
        We.test(e.form?.getAttribute("autocomplete") ?? "")
    : e instanceof Element &&
        (Ve(e) ||
          e.isContentEditable === !0 ||
          (
            e.closest("[contenteditable]")?.getAttribute("contenteditable") ??
            "false"
          ).toLowerCase() !== "false");
}
function qn() {
  return [...document.querySelectorAll("input[id],textarea[id],select[id]")];
}
function Ye(e) {
  return (Object.defineProperty(e, "isReplay", { value: !0 }), e);
}
function Bn(e) {
  const t = [...e.options];
  let n = t.length - 1;
  for (; n >= 0 && !t[n].hasAttribute("selected");) n--;
  return n >= 0 ? n : t.length > 0 && !e.multiple ? 0 : -1;
}
function Kn() {
  const e = { form: [] },
    t = [];
  for (const r of document.querySelectorAll("[id]")) {
    if (t.length >= Ae) break;
    const o = Math.round(r.scrollTop),
      a = Math.round(r.scrollLeft);
    (o !== 0 || a !== 0) &&
      r.id &&
      r.id.length <= lt &&
      r !== document.body &&
      r !== document.documentElement &&
      r !== document.scrollingElement &&
      t.push([r.id, o, a]);
  }
  t.length > 0 && (e.scroll = t);
  const n = document.hasFocus() ? document.activeElement : null;
  if (n instanceof HTMLElement && n.id && n !== document.body && !Ie(n)) {
    ((e.focusId = n.id),
      G(n) && n.value.length <= On && (e.focusValue = n.value));
    const r = n;
    try {
      typeof r.selectionStart == "number" &&
        typeof r.selectionEnd == "number" &&
        (e.sel = [r.selectionStart, r.selectionEnd]);
    } catch {}
  }
  return e;
}
function $n(e) {
  if (!(e instanceof HTMLInputElement) || !/^(?:range|color)$/.test(e.type))
    return e.defaultValue;
  const t = document.createElement("input");
  for (const n of ["type", "min", "max", "step", "value"])
    t.setAttribute(n, e.getAttribute(n) ?? "");
  return t.value;
}
function ft(e) {
  return (Array.isArray(e) ? e.slice(0, Ae) : []).filter(
    (t) =>
      Array.isArray(t) &&
      typeof t[0] == "string" &&
      typeof t[1] == "number" &&
      typeof t[2] == "number" &&
      Number.isFinite(t[1] + t[2]),
  );
}
function Wn(e, t, n) {
  return (
    e.scrollHeight - e.clientHeight >= Math.abs(t) - 1 &&
    e.scrollWidth - e.clientWidth >= Math.abs(n) - 1
  );
}
function dt(e, t, n) {
  let r = !0;
  for (const [o, a, c] of ft(e)) {
    const i = document.getElementById(o);
    if (i === null) r = !1;
    else {
      if (n.has(i)) continue;
      if (i.scrollTop !== 0 || i.scrollLeft !== 0) n.add(i);
      else {
        const l = Wn(i, a, c);
        if (l || t) {
          try {
            i.scrollTo({ top: a, left: c, behavior: "instant" });
          } catch {
            ((i.scrollTop = a), (i.scrollLeft = c));
          }
          (l || i.scrollTop !== 0 || i.scrollLeft !== 0) && n.add(i);
        }
        r &&= l;
      }
    }
  }
  return r;
}
function Vn(e, t, n) {
  const r = e.scroll ?? [];
  for (const [o, a, c, i] of ft(t)) {
    if (r.length >= Ae) break;
    const l = document.getElementById(o);
    i === void 0 &&
      o.length <= lt &&
      (l === null || !n.has(l)) &&
      !r.some((m) => m[0] === o) &&
      r.push([o, Math.round(a), Math.round(c), 1]);
  }
  r.length > 0 && (e.scroll = r);
}
function Yn(e, t) {
  const n = e.focusId ? document.getElementById(e.focusId) : null,
    r = typeof e.focusValue == "string" ? e.focusValue : void 0;
  if (e.sel && G(n) && (r === void 0 || n.value === r))
    try {
      n.setSelectionRange(e.sel[0], e.sel[1]);
    } catch {}
  (pt(e), dt(e.scroll, !1, t));
}
function pt(e) {
  const t = e.focusId ? document.getElementById(e.focusId) : null,
    n = document.activeElement;
  t &&
    document.hasFocus() &&
    (n === null || n === document.body) &&
    t.focus({ preventScroll: !0 });
}
function Gn(e) {
  const t = e;
  return (
    t !== null &&
    typeof t == "object" &&
    typeof t.seq == "number" &&
    typeof t.t == "number" &&
    typeof t.type == "string" &&
    we.includes(t.type)
  );
}
function Xn(e, t) {
  let n = null;
  try {
    ((n = e.getItem(t)), e.removeItem(t));
  } catch {
    return [];
  }
  if (n === null) return [];
  try {
    const r = JSON.parse(n);
    return Array.isArray(r) ? r.filter(Gn).slice(0, st) : [];
  } catch {
    return [];
  }
}
function G(e) {
  return (
    e instanceof HTMLTextAreaElement ||
    (e instanceof HTMLInputElement && xn.test(e.type))
  );
}
var Zn = /^(?:.|Backspace|Delete|Shift|CapsLock)$/;
function Jn(e) {
  return e instanceof HTMLSelectElement
    ? e.selectedIndex === Bn(e)
    : e instanceof HTMLInputElement &&
        (e.type === "checkbox" || e.type === "radio")
      ? e.checked === e.defaultChecked
      : e.value === $n(e);
}
function Qn(e) {
  const t = typeof e?.focusValue == "string" ? e.focusValue : void 0,
    n = new Set();
  for (const r of qn())
    (r.id === e?.focusId && t !== void 0 && G(r)
      ? r.value !== t
      : !(r instanceof HTMLInputElement && r.type === "radio") && !Jn(r)) &&
      n.add(r.id);
  return n;
}
function er(e, t) {
  return (
    e.type === "click" &&
    typeof e.checked == "boolean" &&
    t instanceof HTMLInputElement &&
    (t.type === "checkbox" || t.type === "radio")
  );
}
function tr(e, t) {
  const n = e.targetId ? document.getElementById(e.targetId) : null,
    r =
      n ??
      (typeof e.x == "number" && typeof e.y == "number"
        ? document.elementFromPoint(e.x, e.y)
        : null) ??
      document.activeElement ??
      document.body;
  if (
    !r ||
    (er(e, n)
      ? n.checked === e.checked
      : n !== null && t.pageOwned.has(n.id)) ||
    (e.type === "click" && (!n || !Hn(n))) ||
    ((e.type === "keydown" || e.type === "keyup") && e.key === "Escape")
  )
    return;
  const o = { bubbles: !0, cancelable: !0, composed: !0 };
  let a;
  if (e.type === "keydown" || e.type === "keyup")
    a = new KeyboardEvent(e.type, { ...o, key: e.key, code: e.code });
  else {
    const s = { ...o, clientX: e.x, clientY: e.y, button: e.button ?? 0 };
    a =
      e.type !== "click" && typeof PointerEvent == "function"
        ? new PointerEvent(e.type, s)
        : new MouseEvent(e.type, s);
  }
  if (
    (r.dispatchEvent(Ye(a)),
    e.type === "pointerdown" && G(n) && n.value !== "" && t.stopped.add(n),
    e.type !== "keydown" || typeof e.key != "string")
  )
    return;
  const c = e.key,
    i = n;
  if (!G(i) || i.readOnly || i.disabled || Ie(i)) return;
  if (!Zn.test(c)) {
    t.stopped.add(i);
    return;
  }
  if (a.defaultPrevented) return;
  const l = c.length === 1;
  if (t.stopped.has(i) || !(l || c === "Backspace" || c === "Delete")) return;
  document.activeElement !== i && i.focus({ preventScroll: !0 });
  let m = i.selectionStart ?? i.value.length,
    h = i.selectionEnd ?? i.value.length;
  (!l &&
    m === h &&
    ((m = c === "Backspace" ? Math.max(0, m - 1) : m),
    (h = c === "Delete" ? Math.min(i.value.length, h + 1) : h)),
    i.setRangeText(l ? c : "", m, h, "end"),
    i.dispatchEvent(
      Ye(
        new InputEvent("input", {
          bubbles: !0,
          data: l ? c : null,
          inputType: l
            ? "insertText"
            : c === "Backspace"
              ? "deleteContentBackward"
              : "deleteContentForward",
        }),
      ),
    ));
}
var j = setTimeout,
  nr = clearTimeout;
function Pr(e) {
  const t = e.boot,
    n = t.fetch,
    r = e.boot.storage ?? {
      getItem() {
        throw new Error("no storage");
      },
    },
    o = Lt(e.boot.key);
  let a = !1;
  try {
    a = /^(?:Mac|iP)/.test(navigator.platform);
  } catch {}
  const c =
    typeof requestAnimationFrame == "function"
      ? requestAnimationFrame
      : (u) => j(u, 16);
  let i = !1,
    l = null;
  (addEventListener(
    "compositionstart",
    () => {
      i = !0;
    },
    !0,
  ),
    addEventListener(
      "compositionend",
      () => {
        ((i = !1), l?.(), (l = null));
      },
      !0,
    ));
  const m = (u) =>
    new Promise((d) => {
      const v = l,
        b = () => {
          (v?.(), d());
        };
      ((l = b),
        j(() => {
          (l === b && (l = v), d());
        }, u));
    });
  let h = 0,
    s = !1,
    p = !1;
  const f = [],
    y = (u) => {
      try {
        if (u.isReplay === !0 || f.length >= st) return;
        const d = u;
        let v = d.key,
          b = d.code;
        if (typeof v == "string" && Ie(u.composedPath?.()[0] ?? u.target))
          return;
        const M =
            u.target instanceof Element && u.target.id ? u.target.id : void 0,
          D =
            typeof v == "string" &&
            v.length === 1 &&
            !/[A-Za-z0-9\s]/.test(v) &&
            (d.getModifierState?.("AltGraph") === !0 ||
              (a && d.altKey && !d.ctrlKey && !d.metaKey)),
          L =
            typeof v != "string" || D
              ? null
              : d.isComposing || v === "Process" || v === "Dead"
                ? "Process"
                : d.metaKey
                  ? "Meta"
                  : d.ctrlKey
                    ? "Control"
                    : d.altKey
                      ? "AltGraph"
                      : null;
        if (L !== null) {
          const H = f[f.length - 1];
          if (
            u.type !== "keydown" ||
            (H?.code === "" && H.key === L && H.targetId === M)
          )
            return;
          ((v = L), (b = ""));
        }
        const _ = { seq: ++h, t: Math.round(u.timeStamp), type: u.type },
          T = u;
        (typeof T.clientX == "number" &&
          u.type !== "keydown" &&
          u.type !== "keyup" &&
          ((_.x = Math.round(T.clientX)),
          (_.y = Math.round(T.clientY)),
          (_.button = T.button)),
          typeof v == "string" && ((_.key = v), (_.code = b)),
          M !== void 0 && (_.targetId = M));
        const N = u.target;
        (u.type === "click" &&
          N instanceof HTMLInputElement &&
          (N.type === "checkbox" || N.type === "radio") &&
          (_.checked = N.checked),
          f.push(_),
          r.setItem(e.inSlot(), JSON.stringify(f)));
      } catch {}
    },
    g = () => {
      s = !0;
      for (const u of we) removeEventListener(u, y, !0);
    },
    k = () => {
      if (!s) {
        ((s = !0), (p = !0));
        try {
          r.removeItem(e.inSlot());
        } catch {}
        for (const u of we)
          addEventListener(u, y, { capture: !0, passive: !0 });
        addEventListener("pagehide", g, { once: !0 });
      }
    };
  let I = !1;
  for (const u of ["keydown", "pointerdown"])
    addEventListener(
      u,
      (d) => {
        I ||= d.isTrusted;
      },
      { capture: !0, passive: !0 },
    );
  let w;
  const S = new WeakSet();
  let R = 0;
  const x = () => {
      try {
        w?.dom && Yn(w.dom, S);
      } catch {}
    },
    le = (u) => {
      try {
        return s || I || dt(w?.dom?.scroll, u, S);
      } catch {
        return !0;
      }
    },
    ue = () => {
      const u = Xn(r, o);
      for (const d of u) h = Math.max(h, d.seq);
      return u;
    };
  let B = null;
  const fe = (u) => {
      const d = w;
      if (p || d === void 0) return;
      if (((p = !0), typeof d.lastInputSeq != "number")) {
        !s && !I && x();
        return;
      }
      const v = d.lastInputSeq,
        b = () => {
          if (((B = null), s)) return;
          if (I) {
            ue();
            return;
          }
          x();
          const M = ue().filter((L) => L.seq > v);
          if (M.length === 0) return;
          let D;
          try {
            D = { pageOwned: Qn(d.dom), stopped: new Set() };
          } catch {
            return;
          }
          for (const L of M)
            try {
              tr(L, D);
            } catch {}
          ue();
        };
      i && !u ? ((B = b), m(Ce).then(() => B?.())) : b();
    },
    Me =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((u) => addEventListener("load", () => u(), { once: !0 }));
  let J = !1,
    Q = !1;
  const de = new Map();
  let Oe = 0,
    Pe = t.ver;
  const ht = (u) => {
      try {
        const d = new URL(u, t.entry);
        if (t.ver === "" || d.origin !== new URL(t.entry).origin) return "";
        for (const v of [t.ver, ...t.priors])
          if (d.pathname.startsWith(`/_f/${v}/`)) return v;
      } catch {}
      return "";
    },
    yt = (u) => {
      t.ver !== Pe && ((Pe = t.ver), (Q = !1), de.clear());
      const d = de.get(u) ?? 0;
      if (J || Q || d >= 3 || n === null) return;
      ((Q = !0), de.set(u, d + 1));
      const v = ++Oe,
        b = t.ver,
        M = u === b ? t.entry : t.entry.replace(`/_f/${b}/`, () => `/_f/${u}/`),
        D = () => J || t.ver !== b;
      (async () => {
        for (let L = 0; ; L++) {
          const _ = await n(M, {
            method: "HEAD",
            cache: "no-store",
            credentials: "same-origin",
          });
          if (D()) return;
          const T = _.status,
            N = T === 401 || T === 403 || T === 404;
          if (!N && T !== 410) return;
          const H = N ? or[L] : void 0;
          if (H === void 0) {
            T !== 401 &&
              ((J = !0), e.hot.restart({ note: "own_version_gone" }));
            return;
          }
          if ((await new Promise((gt) => j(gt, H)), D())) return;
        }
      })()
        .catch(() => {})
        .finally(() => {
          v === Oe && (Q = !1);
        });
    },
    vt = (u) => {
      try {
        if (J || u instanceof ErrorEvent) return;
        const d = u.target,
          v =
            d instanceof HTMLScriptElement
              ? d.src
              : d instanceof HTMLLinkElement
                ? d.href
                : d instanceof HTMLImageElement
                  ? d.currentSrc || d.src
                  : "",
          b = v ? ht(v) : "";
        b && yt(b);
      } catch {}
    };
  (t.ver && t.entry && addEventListener("error", vt, !0),
    e.attachExtras({
      capture() {
        try {
          B === null ? fe(!0) : B();
        } catch {}
        const u = !I && Date.now() - R <= Pn ? w?.dom?.scroll : void 0;
        ((w = void 0), k());
        let d;
        try {
          ((d = Kn()), Vn(d, u, S));
        } catch {}
        return { lastInputSeq: h, ...(d ? { dom: d } : {}) };
      },
      afterStart(u, d) {
        if (!s) {
          if (((w = u), (R = Date.now()), typeof u?.lastInputSeq != "number"))
            try {
              r.removeItem(o);
            } catch {}
          if (d) {
            (x(), j(() => c(() => fe(!1)), 0));
            return;
          }
          (c(x), Me.then(() => c(() => fe(!1))));
        }
      },
      settle() {
        return le(!1)
          ? null
          : new Promise((u) => {
              let d = 0;
              const v = () => {
                const b = le(!1);
                ((d += 1),
                  (b || d >= Cn) && u(),
                  !b && (d < Rn ? c(v) : Me.then(() => c(() => le(!0)))));
              };
              c(v);
            });
      },
      afterReveal() {
        try {
          !s && !I && w?.dom && pt(w.dom);
        } catch {}
      },
      holdForIme() {
        return i ? m(Ce) : null;
      },
      release() {
        g();
        try {
          r.removeItem(e.inSlot());
        } catch {}
      },
      assess: {
        run: (u, d) => lr(e.boot, u.preflight ?? "", ar(u), d),
        timeout: (u) => W(u.preflight ?? "", "timeout", mt),
      },
    }));
}
var rr = [300, 400],
  or = [200, 300, 500],
  mt = Object.freeze({ error: "timeout" });
function ir(e) {
  try {
    return wt(e?.name);
  } catch {
    return "other";
  }
}
function ar(e) {
  return Object.freeze({
    ver: e.from.ver,
    seq: e.from.seq,
    to: Object.freeze({ ver: e.to.ver, seq: e.to.seq }),
    changed: Nt(e.changed),
    required: e.required,
    deadline: Object.freeze({ ...e.deadline }),
  });
}
function cr(e, t) {
  if (e === null) return St;
  const n = e === "now" ? t : Object.hasOwn(ye, e) ? t + ye[e] : Date.parse(e);
  return Object.freeze({ until: n, now: n <= t });
}
async function sr(e, t) {
  if (Number(e.headers.get("content-length")) > t)
    return (e.body?.cancel().catch(() => {}), null);
  const n = e.body?.getReader();
  if (!n) {
    const a = await e.blob();
    return a.size > t ? null : a;
  }
  const r = [];
  let o = 0;
  for (;;) {
    const { done: a, value: c } = await n.read();
    if (a) return new Blob(r);
    if (((o += c.byteLength), o > t)) return (n.cancel().catch(() => {}), null);
    r.push(c);
  }
}
function W(e, t, n, r) {
  return Object.freeze({
    update: Object.freeze({ preflight: e, assessed: n, ...r }),
    verdict: Object.freeze({ assessed: n, preflight: t }),
  });
}
function lr(e, t, n, r) {
  return new Promise((o) => {
    let a = !1,
      c = null;
    const i = (p) => {
        if (a) return !1;
        ((a = !0), o(p));
        try {
          nr(m);
        } catch {}
        return !0;
      },
      l = (p, f) => {
        if (
          i(
            W(
              t,
              p,
              Object.freeze(
                f === void 0 ? { error: p } : { error: p, errName: f },
              ),
            ),
          ) &&
          (p === "invalid" || p === "throw")
        )
          try {
            console.warn("claude.hot: preflight", f ?? p);
          } catch {}
      },
      m = j(() => {
        i(W(t, "timeout", mt));
        try {
          c?.abort();
        } catch {}
      }, Mt),
      h = (p) => new Promise((f) => j(f, p));
    (async () => {
      const p = e.fetch;
      if (!Pt.test(t)) {
        l("invalid");
        return;
      }
      if (p === null) {
        l("load");
        return;
      }
      try {
        c = new AbortController();
      } catch {}
      const f = new URL("/_cas/" + t + "/" + It, location.origin).href;
      let y = null;
      for (let R = 0; ; R++) {
        try {
          y = await p(f, {
            credentials: "same-origin",
            cache: "default",
            ...(c !== null && { signal: c.signal }),
          });
        } catch {
          l("load");
          return;
        }
        if (y.ok) break;
        if (y.status !== 401 && y.status !== 403 && y.status !== 404) {
          l("load");
          return;
        }
        const x = rr[R];
        if (x === void 0) {
          l("authz");
          return;
        }
        if ((await h(x), a)) return;
      }
      const g = await sr(y, Ot);
      if (g === null) {
        l("invalid");
        return;
      }
      if (a) return;
      let k;
      const I = URL.createObjectURL(new Blob([g], { type: "text/javascript" }));
      try {
        k = await Mn(() => import(I), []);
      } catch {
        l("invalid");
        return;
      } finally {
        try {
          URL.revokeObjectURL(I);
        } catch {}
      }
      const w = k?.default;
      if (typeof w != "function") {
        l("invalid");
        return;
      }
      if (a) return;
      let S;
      try {
        S = xt(await w(n, r));
      } catch (R) {
        l("throw", ir(R));
        return;
      }
      S === void 0
        ? l("invalid")
        : i(
            S === null
              ? W(t, "none", null)
              : W(t, "ok", S, {
                  ...(S.required !== void 0 && {
                    required: Tt(n.required, S.required),
                  }),
                  ...(S.deadline !== void 0 && {
                    deadline: cr(S.deadline, Date.now()),
                  }),
                }),
          );
    })().catch(() => l("load"));
  });
}
function me() {
  const e = document.activeElement;
  return e === null || e === document.body;
}
var ur = 250;
function Cr() {
  let e = null,
    t = 0,
    n = 0,
    r = null,
    o = !1;
  const a = (s) => {
      clearTimeout(n);
      const p = s.composedPath()[0] ?? s.target;
      ((e = s.relatedTarget === null && pe(p) ? p : null),
        (t = s.timeStamp),
        e !== null &&
          (n = window.setTimeout(() => {
            e = null;
          }, 0)));
    },
    c = () => {
      (clearTimeout(n), (e = null), (r = null));
    },
    i = () => {
      o = !0;
    },
    l = (s) => {
      const p = document.activeElement,
        f = e !== null && s.timeStamp - t <= ur ? e : null;
      ((r = pe(p) ? p : me() ? f : null),
        clearTimeout(n),
        (e = null),
        (o = !1));
    };
  let m = 0;
  const h = () => {
    const s = r;
    ((r = null),
      window.clearTimeout(m),
      !(s === null || o || !me()) &&
        (m = window.setTimeout(() => {
          if (!(o || !me() || !s.isConnected || !pe(s)))
            try {
              s.focus({ preventScroll: !0 });
            } catch {}
        }, 0)));
  };
  return (
    document.addEventListener("focusout", a, !0),
    document.addEventListener("focusin", c, !0),
    document.addEventListener("pointerdown", i, !0),
    addEventListener("blur", l),
    addEventListener("focus", h),
    () => {
      (clearTimeout(n),
        clearTimeout(m),
        document.removeEventListener("focusout", a, !0),
        document.removeEventListener("focusin", c, !0),
        document.removeEventListener("pointerdown", i, !0),
        removeEventListener("blur", l),
        removeEventListener("focus", h));
    }
  );
}
function fr(e) {
  return String.fromCharCode(e);
}
var dr = "This browser isn" + fr(8217) + "t supported",
  A = {
    safari: "Update macOS and Safari to open this artifact.",
    ios: "Update iOS to open this artifact.",
    ipados: "Update iPadOS to open this artifact.",
    iosMaybe: "An iOS update may fix this, if one is available.",
    ipadosMaybe: "An iPadOS update may fix this, if one is available.",
    other: "Update it to open this artifact.",
  };
function pr(e, t, n) {
  if (/iPhone|iPod/.test(e)) return "phone";
  if (/iPad/.test(e)) return "tablet";
  if (e.includes("Macintosh") && t > 1 && /AppleWebKit\/(?!537\.36)/.test(e))
    return n < 600 ? "phone" : "tablet";
}
function he(e, t) {
  return e * 100 + t < 2602 && !(e === 18 && t === 4);
}
function Ge(e, t) {
  const n = t.exec(e);
  return n ? [Number(n[1]), Number(n[2] ?? 0)] : void 0;
}
function mr(e, t, n) {
  const r = pr(e, t, n),
    [o, a] = r === "phone" ? [A.ios, A.iosMaybe] : [A.ipados, A.ipadosMaybe];
  if (/CriOS\/|FxiOS\/|EdgiOS\//.test(e)) return r ? a : A.other;
  const c = / Safari\//.test(e) ? Ge(e, / Version\/(\d+)(?:\.(\d+))?/) : void 0;
  if (!r) return e.includes("Macintosh") && c && he(...c) ? A.safari : A.other;
  if (c) return he(...c) ? o : A.other;
  const i = Ge(e, / OS (\d+)(?:_(\d+))?/);
  return !i || i[0] * 100 + i[1] >= 1807 ? a : he(...i) ? o : A.other;
}
function hr() {
  try {
    return mr(
      navigator.userAgent,
      navigator.maxTouchPoints,
      Math.min(screen.width, screen.height),
    );
  } catch {}
  return A.other;
}
var yr = 100,
  vr = setTimeout,
  Xe =
    ':host{all:initial}.layer{position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483647;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 24px 12vh;background:#fff;background:Canvas;color:#1f1e1d;color:CanvasText;font:15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center}.tile{width:60px;height:60px;margin-bottom:20px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(127,127,127,.14);background:color-mix(in srgb,CanvasText 7%,Canvas)}svg{width:22px;height:22px;opacity:.72}h1{margin:0 0 8px;max-width:16em;font:400 28px/1.2 ui-serif,Georgia,serif}p{margin:0;max-width:24em;opacity:.7}@media (min-width:640px){h1{font-size:34px}}',
  Ze = "http://www.w3.org/2000/svg";
function gr() {
  const e = document.createElementNS(Ze, "svg");
  (e.setAttribute("viewBox", "0 0 24 24"),
    e.setAttribute("fill", "none"),
    e.setAttribute("stroke", "currentColor"),
    e.setAttribute("stroke-width", "1.5"),
    e.setAttribute("stroke-linecap", "round"),
    e.setAttribute("stroke-linejoin", "round"),
    e.setAttribute("aria-hidden", "true"));
  const t = document.createElementNS(Ze, "path");
  return (
    t.setAttribute(
      "d",
      "M10.3 4.2a2 2 0 0 1 3.4 0l7.5 12.8a2 2 0 0 1-1.7 3H4.5a2 2 0 0 1-1.7-3zM12 9.5v4m0 3h.01",
    ),
    e.append(t),
    e
  );
}
function br(e) {
  try {
    if ("adoptedStyleSheets" in e && typeof CSSStyleSheet == "function") {
      const n = new CSSStyleSheet();
      (n.replaceSync(Xe), (e.adoptedStyleSheets = [n]));
      return;
    }
  } catch {}
  const t = document.createElement("style");
  ((t.textContent = Xe), e.append(t));
}
function Rr() {
  const e = document.documentElement,
    t = document.createElement("div");
  t.setAttribute("data-frame-runtime-notice", "");
  const n = t.attachShadow({ mode: "closed" });
  br(n);
  const r = document.createElement("div");
  ((r.className = "layer"),
    (r.style.colorScheme = e.style.colorScheme || "light dark"),
    r.setAttribute("role", "alert"));
  const o = document.createElement("div");
  ((o.className = "tile"), o.append(gr()));
  const a = document.createElement("h1"),
    c = document.createElement("p");
  (r.append(o, a, c),
    n.append(r),
    e.append(t),
    vr(() => {
      t.isConnected && ((a.textContent = dr), (c.textContent = hr()));
    }, yr));
  let i = !1;
  try {
    i = getComputedStyle(r).position === "fixed";
  } catch {}
  i || t.remove();
}
var xr = {};
export {
  xr as TRANSFORMS,
  wr as applyHostVisible,
  Er as buildBoot,
  _r as declaresCover,
  Tr as declaresSides,
  Rr as drawRefusedNotice,
  Ar as installEscapeForward,
  Cr as installFocusKeep,
  Mr as installHostKeyForward,
  Pr as installHotExtras,
  Ir as installPaintReporter,
  Lr as installSizeReporter,
  Or as watchBackground,
  kr as wireEngagement,
  Sr as wireNav,
};
