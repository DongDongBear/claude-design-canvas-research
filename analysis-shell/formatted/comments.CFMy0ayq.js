var xe = /^#[A-Za-z_-][A-Za-z0-9_-]{0,31}$/,
  De = /^\[data-id="[A-Za-z0-9_-]{1,64}"\]$/,
  Ue = /^[A-Za-z0-9_-]{1,64}$/,
  He = /^[a-z][a-z0-9-]{0,23}:nth-of-type\([1-9][0-9]{0,3}\)$/;
function Te(e) {
  const t = e.length <= 1024 ? e.split(" > ") : [];
  return (
    t.length >= 1 &&
    t.length <= 10 &&
    t.every((o, r) => He.test(o) || (r === 0 && (xe.test(o) || De.test(o))))
  );
}
function z(e) {
  if (e === document.body || e === document.documentElement)
    return e.tagName.toLowerCase() + ":nth-of-type(1)";
  const t = [];
  let o = e;
  for (let r = 0; o && o.parentElement && r < 10; r++) {
    if (o.id) {
      const d = "#" + CSS.escape(o.id);
      if (xe.test(d)) {
        t.unshift(d);
        break;
      }
    }
    const u = o.getAttribute("data-id");
    if (u !== null && Ue.test(u)) {
      const d = '[data-id="' + u + '"]',
        x = o.ownerDocument.querySelectorAll(d);
      if (x.length === 1 && x[0] === o) {
        t.unshift(d);
        break;
      }
    }
    let p = 1;
    for (let d = o.previousElementSibling; d; d = d.previousElementSibling)
      d.tagName === o.tagName && p++;
    (t.unshift(o.tagName.toLowerCase() + ":nth-of-type(" + p + ")"),
      (o = o.parentElement));
  }
  return t.join(" > ").slice(0, 1e3);
}
var Xe = 4096,
  Ge = /^[a-z][a-z0-9-]{0,23}$/;
function ge(e, t) {
  let o = t >>> 0;
  for (let r = 0; r < e.length; r++)
    ((o ^= e.charCodeAt(r)), (o = Math.imul(o, 16777619) >>> 0));
  return o >>> 0;
}
function ze(e) {
  const t = e.replace(/\s+/g, " ").trim();
  if (t.length < 8) return "";
  const o = Array.from({ length: 64 }, () => 0);
  for (let p = 0; p + 4 <= t.length; p++) {
    const d = t.slice(p, p + 4),
      x = ge(d, 2166136261),
      A = ge(d, 16777619);
    for (let O = 0; O < 32; O++)
      ((o[O] += ((x >>> O) & 1) === 1 ? 1 : -1),
        (o[32 + O] += ((A >>> O) & 1) === 1 ? 1 : -1));
  }
  let r = 0,
    u = 0;
  for (let p = 0; p < 32; p++)
    (o[p] > 0 && (r |= 1 << p), o[32 + p] > 0 && (u |= 1 << p));
  return (
    (u >>> 0).toString(16).padStart(8, "0") +
    (r >>> 0).toString(16).padStart(8, "0")
  );
}
function ve(e) {
  const t = e.tagName.toLowerCase();
  if (!Ge.test(t)) return null;
  const o = ze((e.textContent ?? "").slice(0, Xe));
  return o === "" ? { v: 1, tag: t } : { v: 1, tag: t, h: o };
}
function Ye(e) {
  for (let t = 0; t < e.length; t++) {
    const o = e.charCodeAt(t);
    if (o >= 55296 && o <= 56319) {
      const r = e.charCodeAt(t + 1);
      if (!(r >= 56320 && r <= 57343)) return !1;
      t++;
    } else if (o >= 56320 && o <= 57343) return !1;
  }
  return !0;
}
function Be(e, t, o) {
  const r = document.createRange();
  return (r.selectNodeContents(e), r.setEnd(t, o), r.toString().length);
}
function B(e) {
  const t = e.getBoundingClientRect();
  if (e !== document.documentElement && e !== document.body)
    return { top: t.top, left: t.left, width: t.width, height: t.height };
  const o = e,
    r = e !== document.scrollingElement;
  return {
    left: t.left - (r ? o.scrollLeft : 0),
    top: t.top - (r ? o.scrollTop : 0),
    width:
      o.scrollWidth > o.clientWidth + 1
        ? Math.max(t.width, o.scrollWidth)
        : t.width,
    height:
      o.scrollHeight > o.clientHeight + 1
        ? Math.max(t.height, o.scrollHeight)
        : t.height,
  };
}
function Q(e, t, o) {
  const r = B(e),
    u = (p) => Math.min(1, Math.max(0, p));
  return {
    x: u((t - r.left) / Math.max(1, r.width)),
    y: u((o - r.top) / Math.max(1, r.height)),
  };
}
function $e(e, t) {
  return {
    x: Math.max(0, e + (scrollX || 0)),
    y: Math.max(0, t + (scrollY || 0)),
  };
}
var We = /^(button|checkbox|color|file|hidden|image|radio|range|reset|submit)$/;
function qe(e) {
  if (!(e instanceof HTMLElement)) return !1;
  if ("readOnly" in e && "disabled" in e && "type" in e) {
    const t = e;
    return !t.disabled && !t.readOnly && !We.test(t.type);
  }
  return e.isContentEditable;
}
function ee() {
  let e = document.activeElement;
  for (; e?.shadowRoot?.activeElement;) e = e.shadowRoot.activeElement;
  return e;
}
var Ke = 1e3,
  Ze = 1500,
  te = 700,
  Ve = "artifact-sync",
  Ae = -1 / 0,
  ne = !1,
  ye = -1 / 0,
  _e = !1,
  we = (e) => {
    const t = e;
    return (
      (t.pointerType === "touch" || t.pointerType === "pen") &&
      t.isPrimary !== !1
    );
  };
function Je() {
  if (_e) return;
  ((_e = !0),
    addEventListener(
      "pointerup",
      (o) => {
        o.isTrusted && we(o) && (Ae = performance.now());
      },
      { capture: !0, passive: !0 },
    ));
  const e = (o) => {
      ne = o.isTrusted;
    },
    t = () => {
      ne = !1;
    };
  (addEventListener("touchstart", e, { capture: !0, passive: !0 }),
    addEventListener("touchend", t, { capture: !0, passive: !0 }),
    addEventListener("touchcancel", t, { capture: !0, passive: !0 }));
}
function Ce() {
  const e = typeof window < "u" ? window.event : void 0;
  return e !== void 0 && e.isTrusted && e.type === "pointerup" && we(e);
}
function Qe() {
  return Ce() || performance.now() - Ae <= Ke;
}
function et() {
  const e = performance.now(),
    t = () => {
      (removeEventListener("touchend", o, !0),
        removeEventListener("touchstart", t, !0));
    },
    o = (r) => {
      (t(), r.cancelable && performance.now() - e <= te && r.preventDefault());
    };
  (addEventListener("touchend", o, { capture: !0, passive: !1 }),
    addEventListener("touchstart", t, { capture: !0, passive: !0 }),
    setTimeout(t, te));
}
function tt() {
  const e = document.createElement("input");
  ((e.type = "text"),
    (e.tabIndex = -1),
    (e.autocapitalize = "sentences"),
    e.setAttribute("data-frame-keyboard-hold", ""),
    e.addEventListener("beforeinput", (o) => o.preventDefault()),
    (e.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;margin:0;padding:0;border:0;opacity:0.01;color:transparent;caret-color:transparent;background:transparent;font-size:16px;pointer-events:none;z-index:-2147483648"));
  const t = window.visualViewport;
  return (
    t &&
      ((e.style.top = `${t.offsetTop}px`),
      (e.style.left = `${t.offsetLeft}px`)),
    e
  );
}
function nt(e = {}) {
  let t = null,
    o = null;
  try {
    if (
      e.skip === !0 ||
      !(navigator.maxTouchPoints > 0) ||
      document.visibilityState !== "visible" ||
      !Qe() ||
      performance.now() - ye <= te ||
      document.documentElement.hasAttribute(Ve) ||
      ((o = ee()), qe(o))
    )
      return null;
    if (
      ((t = tt()),
      document.documentElement.append(t),
      t.focus({ preventScroll: !0 }),
      ee() !== t)
    )
      return (t.remove(), null);
  } catch {
    return (t?.remove(), null);
  }
  ye = performance.now();
  const r = t,
    u = o;
  let p = !1;
  const d = (A) => {
      if (!p) {
        ((p = !0), clearTimeout(x));
        try {
          document.hasFocus() &&
            ee() === r &&
            (A && u instanceof HTMLElement && u.isConnected
              ? u.focus({ preventScroll: !0 })
              : r.blur());
        } catch {}
        r.remove();
      }
    },
    x = setTimeout(() => d(!1), Ze);
  return (
    r.addEventListener("blur", () => setTimeout(() => d(!1), 0), { once: !0 }),
    r.addEventListener("keydown", () => d(!1), { once: !0 }),
    (ne || Ce()) && et(),
    {
      settle: (A) => {
        A || d(!0);
      },
    }
  );
}
function ot(e) {
  return e !== null && typeof e == "object" ? e : null;
}
function rt(e) {
  return typeof e == "number" && Number.isInteger(e) && e >= 0 && e < 2 ** 31;
}
function st(e) {
  const t = ot(e);
  return (
    t !== null &&
    t.__frame_cap_rewired === !0 &&
    (t.caps === void 0 ||
      (Array.isArray(t.caps) && t.caps.every((o) => typeof o == "string"))) &&
    (t.brokerGen === void 0 || rt(t.brokerGen))
  );
}
var it =
  "may not have run: the artifact was updated before this call was answered";
function ct(e, t, o, r) {
  let u = t.brokerGen;
  return (
    e.on((p) => {
      if (!st(p)) return;
      const d = p.brokerGen !== void 0 && u !== void 0 && p.brokerGen !== u;
      if (
        ((u = p.brokerGen ?? u),
        r.gone && p.caps !== void 0 && !p.caps.includes(o))
      ) {
        r.gone();
        return;
      }
      (d && r.cut?.(), r.again?.());
    }),
    { stamp: (p) => (u === void 0 ? p : { ...p, brokerGen: u }) }
  );
}
var at = /^\/_f\/[A-Za-z0-9_-]{1,64}(?=\/|$)/;
function lt(e, t) {
  const o = new URL(e),
    r = at.exec(o.pathname),
    u = r ? new URL(`${r[0]}/`, o) : new URL("./", t),
    p = r?.[0] === o.pathname ? u.pathname : o.pathname;
  let d = null;
  if (o.origin === u.origin && p.startsWith(u.pathname)) {
    ((d = p.slice(u.pathname.length)),
      (d === "" || d.endsWith("/")) && (d += "index.html"));
    try {
      d = decodeURIComponent(d);
    } catch {
      d = null;
    }
  }
  return { root: u, name: d };
}
function ut(e) {
  if (
    e === "" ||
    e.length > 512 ||
    e.includes("?") ||
    e.includes("#") ||
    e.split("/").some((t) => t === "")
  )
    return !1;
  try {
    return decodeURIComponent(new URL(e, "https://x/").pathname.slice(1)) === e;
  } catch {
    return !1;
  }
}
function ft() {
  try {
    let e = location.href;
    try {
      const t = performance.getEntriesByType?.("navigation")?.[0],
        o = new URL(t?.name || e);
      o.origin === location.origin && (e = o.href);
    } catch {}
    return lt(e, document.baseURI);
  } catch {
    return null;
  }
}
function dt(e) {
  const t = e ? e.name : null;
  return t !== null && t !== "index.html" && ut(t) ? t : null;
}
function pt(e) {
  if (e.shell) return e.shell;
  const t = e.shellOrigin;
  return {
    post(o, r) {
      if (r?.activation) {
        parent.postMessage(o, { targetOrigin: t, includeUserActivation: !0 });
        return;
      }
      if (r?.transfer) {
        parent.postMessage(o, t, r.transfer);
        return;
      }
      parent.postMessage(o, t);
    },
    on: (o, r) => mt((u) => u === t, o, r),
  };
}
function mt(e, t, o) {
  const r = (u) => {
    u.source !== parent || !e(u.origin) || t(u.data, u);
  };
  return (
    addEventListener("message", r, o),
    () => removeEventListener("message", r, o)
  );
}
var ht = 13e4,
  gt = 9e5,
  vt = "comments_before_send",
  be = 128,
  yt =
    /[\p{Cc}\p{Cf}\p{Cs}\p{Default_Ignorable_Code_Point}\p{Noncharacter_Code_Point}\u2028\u2029]/u;
function _t(e) {
  return (
    Te(e) ||
    (e.length <= be && new TextEncoder().encode(e).length <= be && !yt.test(e))
  );
}
function Y(e) {
  const t = innerWidth || 1,
    o = innerHeight || 1,
    r = (d, x, A) =>
      (Math.min(Math.max(d, 0), A) + Math.max(Math.min(x, A), 0)) / 2,
    u = r(e.left, e.right, t),
    p = r(e.top, e.bottom, o);
  return { px: u, py: p, x: u / t, y: p / o };
}
function Ee(e, t, o) {
  const r = (u, p, d) => Math.min(Math.max(u, p), d);
  return $e(r(t, e.left, e.right), r(o, e.top, e.bottom));
}
function bt(e) {
  const t = pt(e);
  Je();
  const o = "userActivation" in MessageEvent.prototype;
  let r = 0;
  const u = new Map(),
    p = ct(t, e, "comments", {
      cut: () => {
        for (const i of u.values())
          (clearTimeout(i.timer),
            i.reject({ code: "upstream_error", message: it }));
        u.clear();
      },
    });
  t.on((i) => {
    const n = i;
    if (!n) return;
    const a = typeof n.id == "string" ? n.id : null;
    if (!a) return;
    const m = u.get(a);
    if (m) {
      if (n.__frame_cap_ack === !0) {
        (clearTimeout(m.timer),
          (m.timer = setTimeout(() => {
            (u.delete(a),
              m.reject({
                code: "upstream_error",
                message: "no verdict from shell after prompt",
              }));
          }, gt)));
        return;
      }
      n.__frame_cap_r === !0 &&
        (u.delete(a),
        clearTimeout(m.timer),
        n.error !== null && n.error !== void 0
          ? m.reject(n.error)
          : m.resolve(n.result));
    }
  });
  const d = (i, n) =>
      new Promise((a, m) => {
        const h = "k" + ++r,
          s = setTimeout(() => {
            (u.delete(h),
              m({ code: "upstream_error", message: "no reply from shell" }));
          }, ht);
        u.set(h, { resolve: a, reject: m, timer: s });
        try {
          const g = p.stamp({
            __frame_cap: !0,
            cap: "comments",
            id: h,
            method: i,
            args: n,
          });
          t.post(g, { activation: o });
        } catch {
          (u.delete(h),
            clearTimeout(s),
            m({
              code: "invalid",
              message: "arguments are not structured-cloneable",
            }));
        }
      }),
    x = e.capabilities?.comments?.config,
    A = x?.customAnchors === !0,
    O = x?.composer_only !== !0,
    oe = /^[a-z_]{1,32}$/,
    Me = /^[\x21-\x7e]{1,64}$/,
    Se = 4096,
    Pe = 1024,
    ke = 256,
    Oe = 500;
  let T = null,
    _ = null;
  const M = [],
    $ = () => {
      t.post({ __fc_bs: { on: M.length > 0 } });
    };
  let W = !1,
    U = !1;
  const re = () => {
    t.post({
      __fc_ca: {
        on: !0,
        reg: se,
        ...(_?.claude ? { claude: !0 } : {}),
        ...(_?.move ? { move: !0 } : {}),
        ...(W ? { hotkey: !0 } : {}),
        ...(U ? { pinsOutsideMode: !0 } : {}),
      },
    });
  };
  let se = 0,
    R = !1,
    ie = !1,
    H = !1,
    ce = !0;
  const ae = dt(ft()),
    le = (i) => {
      const n = nt({ skip: H || !ce }),
        a = d("openComposer", [ae === null ? i : { ...i, file: ae }]);
      return (
        a.then(
          (m) => n?.settle(m?.opened === !0),
          () => n?.settle(!1),
        ),
        a
      );
    };
  let q = 0;
  const Re = 300;
  let X = null,
    j = [],
    N = null,
    K = !1,
    Z = !1;
  const ue = (i) => {
      window.__FC_CA = { on: i };
      try {
        dispatchEvent(new Event("__fc_ca_change"));
      } catch {}
    },
    L = (i) => {
      try {
        i();
      } catch {}
    },
    fe = () => {
      if (!_ || !N) return;
      const i = Object.create(null);
      for (const [n, a] of Object.entries(N))
        i[n] = { x: a.x - (scrollX || 0), y: a.y - (scrollY || 0) };
      t.post({ __fc_placed: { placed: i } });
    },
    je = () => {
      Z ||
        ((Z = !0),
        queueMicrotask(() => {
          ((Z = !1), fe());
        }));
    },
    V = () => {
      K ||
        ((K = !0),
        requestAnimationFrame(() => {
          ((K = !1), fe());
        }));
    },
    de = () => !!_ && !!N && (R || (U && j.length > 0));
  (addEventListener(
    "scroll",
    () => {
      de() && V();
    },
    { capture: !0, passive: !0 },
  ),
    addEventListener("resize", () => {
      de() && V();
    }));
  const Le = (i) => {
    const n = i;
    return !n ||
      typeof n != "object" ||
      typeof n.id != "string" ||
      n.id === "" ||
      n.id.length > 256 ||
      typeof n.anchor != "string" ||
      n.anchor.length > 1024
      ? null
      : {
          id: n.id,
          anchor: n.anchor,
          resolved: n.resolved === !0,
          active: n.active === !0,
        };
  };
  t.on((i) => {
    const n = i;
    if (!n || typeof n != "object") return;
    const a = n.__fc_mode;
    if (a && typeof a == "object") {
      const c = a.on === !0;
      ((ie = c && a.regions === !0), (ce = !c || a.drafts !== !1));
      const f = c && a.composing === !0;
      if (f !== H) {
        H = f;
        const y = _;
        y?.composing && L(() => y.composing(f));
      }
      if (c !== R) {
        ((R = c), c ? (q += 1) : (j = []));
        const y = _;
        if (y) {
          const { byKey: b } = a;
          L(() =>
            c && typeof b == "boolean" ? y.mode(c, { byKey: b }) : y.mode(c),
          );
        }
        c && y && N && V();
      }
      (_ && re(), M.length > 0 && $());
      return;
    }
    const m = n.__fc_threads;
    if (m && typeof m == "object" && Array.isArray(m.threads)) {
      const c = _;
      if (!c) return;
      ((j = m.threads.map(Le).filter((f) => f !== null)),
        L(() => c.threads(j.map((f) => ({ ...f })))));
      return;
    }
    const h = n.__fc_claude;
    if (h && typeof h == "object") {
      const c = _;
      if (
        c?.claude &&
        typeof h.id == "string" &&
        h.id !== "" &&
        h.id.length <= 256 &&
        typeof h.state == "string" &&
        oe.test(h.state)
      ) {
        const f = {
          id: h.id,
          state: h.state,
          canOpen: h.canOpen === !0,
          ...(typeof h.reason == "string" && oe.test(h.reason)
            ? { reason: h.reason }
            : {}),
          ...(typeof h.shell == "string" && Me.test(h.shell)
            ? { shell: h.shell }
            : {}),
        };
        L(() => c.claude(f));
      }
      return;
    }
    const s = n.__fc_move;
    if (s && typeof s == "object") {
      const c = s.n,
        f = s.id;
      if (
        typeof c != "number" ||
        !Number.isInteger(c) ||
        typeof f != "string" ||
        f === "" ||
        f.length > 256
      )
        return;
      const y = () => {
          t.post({ __fc_moved: { n: c, id: f, refused: !0 } });
        },
        b = _;
      if (
        !b?.move ||
        !R ||
        !j.some((P) => P.id === f) ||
        typeof s.x != "number" ||
        typeof s.y != "number" ||
        !Number.isFinite(s.x) ||
        !Number.isFinite(s.y)
      ) {
        y();
        return;
      }
      const w = { x: s.x + (scrollX || 0), y: s.y + (scrollY || 0) };
      let C;
      try {
        C = b.move(f, w);
      } catch {
        y();
        return;
      }
      Promise.resolve(C).then(
        (P) => {
          const F = P;
          if (_ !== b || !F || typeof F != "object") {
            y();
            return;
          }
          const { anchor: J, at: G, ...E } = F,
            k = he(J, G, E);
          if (!("payload" in k)) {
            y();
            return;
          }
          t.post({ __fc_moved: { n: c, id: f, ...k.payload } });
        },
        () => y(),
      );
      return;
    }
    const g = n.__fc_fast;
    if (g && typeof g == "object") {
      const c = g.n;
      if (typeof c != "number" || !Number.isInteger(c)) return;
      const f = () => {
          t.post({ __fc_fasted: { n: c, handled: !1 } });
        },
        y = M.slice(),
        { text: b, anchor: w, label: C } = g;
      if (
        y.length === 0 ||
        T !== null ||
        typeof b != "string" ||
        b.trim() === "" ||
        new TextEncoder().encode(b).length > Se ||
        !(w === null || (typeof w == "string" && w !== "" && w.length <= Pe)) ||
        !(C === void 0 || (typeof C == "string" && C.length <= ke))
      ) {
        f();
        return;
      }
      const P = { n: c, stop: new AbortController() };
      T = P;
      const F = (E, k) => {
          if (T !== P) return;
          T = null;
          const I = !P.stop.signal.aborted,
            D = k !== void 0 ? { reply: k } : {};
          I && (E || k !== void 0)
            ? t.post({ __fc_fasted: { n: c, handled: E, ...D } })
            : f();
        },
        J = { text: b, anchor: w, ...(C !== void 0 ? { label: C } : {}) },
        G = (E) =>
          typeof E == "string" &&
          E.trim() !== "" &&
          new TextEncoder().encode(E).length <= Oe
            ? E
            : void 0;
      (async () => {
        let E;
        for (const k of y) {
          if (T !== P) return;
          if (!M.includes(k)) continue;
          let I;
          try {
            I = await k(J, { signal: P.stop.signal });
          } catch {
            continue;
          }
          const D = I && typeof I == "object" ? I : {};
          if (D.handled === !0) {
            F(!0, G(D.reply));
            return;
          }
          E ??= G(D.reply);
        }
        F(!1, E);
      })();
      return;
    }
    const l = n.__fc_fast_stop;
    if (l && typeof l == "object") {
      if (T !== null && T.n === l.n) {
        const c = T;
        ((T = null), c.stop.abort());
      }
      return;
    }
    const v = n.__fc_reveal;
    if (v && typeof v == "object" && typeof v.id == "string") {
      const c = v.id,
        f = _;
      f && j.some((y) => y.id === c) && L(() => f.reveal(c));
    }
  });
  const pe = (i) => {
      if (i instanceof Element) {
        if (!i.isConnected) return null;
        const a = Y(i.getBoundingClientRect());
        return { vx: a.px, vy: a.py };
      }
      const n = i;
      return !n ||
        typeof n != "object" ||
        typeof n.x != "number" ||
        typeof n.y != "number" ||
        !Number.isFinite(n.x) ||
        !Number.isFinite(n.y)
        ? null
        : { vx: n.x - (scrollX || 0), vy: n.y - (scrollY || 0) };
    },
    Ne = (i) => typeof i == "string" && i !== "" && _t(i),
    Fe = 1024,
    me = (i, n) => {
      const a = i[n];
      if (!(a === void 0 || a === ""))
        return typeof a == "string" && a.length <= Fe ? a : null;
    },
    he = (i, n, a) => {
      if (!Ne(i))
        return {
          message:
            "compose takes a non-empty anchor: a name of at most 128 bytes with no control or invisible characters, or a domAnchor() path (a path through a tag longer than 24 characters or outside a-z, 0-9 and hyphen is judged as a name)",
        };
      if (!O && !Te(i))
        return {
          message:
            "under the composer_only form compose keeps only a domAnchor() path through ordinary tags (a-z, 0-9, hyphen, at most 24 characters); a page-invented name, or a path through any other tag, is not kept there",
        };
      let m,
        h,
        s = !1;
      if (a !== void 0) {
        if (!a || typeof a != "object")
          return {
            message: "compose options are an object: {label?, detail?, area?}",
          };
        const l = a;
        s = l.area === !0;
        const v = me(l, "label"),
          c = me(l, "detail");
        if (v === null || c === null)
          return {
            message:
              "compose label and detail are strings of at most 1024 UTF-16 units (the shell keeps at most 128 bytes of the label and 512 of the detail as plain text, or nothing); empty means none",
          };
        ((m = v), (h = c));
      }
      let g;
      if (n instanceof Element) {
        if (!n.isConnected)
          return { message: "compose takes an Element in the document" };
        if (n.closest("[data-uncommentable]") !== null) return { excluded: !0 };
        const l = Y(n.getBoundingClientRect());
        g = { path: i, x: l.x, y: l.y, pin: Q(n, l.px, l.py), rect: B(n) };
      } else {
        const l = pe(n);
        if (!l)
          return {
            message:
              "compose takes an Element or a {x, y} point in document CSS px",
          };
        const v = innerWidth || 1,
          c = innerHeight || 1,
          f = (y) => Math.min(1, Math.max(0, y));
        g = {
          path: i,
          x: f(l.vx / v),
          y: f(l.vy / c),
          pin: { x: 0.5, y: 0.5 },
          rect: { top: l.vy, left: l.vx, width: 0, height: 0 },
        };
      }
      return (
        m !== void 0 && (g.label = m),
        h !== void 0 && (g.detail = h),
        s && (g.area = !0),
        { payload: g }
      );
    },
    S = e.pipe("comments"),
    Ie = (i) => {
      if (typeof i != "function")
        throw new TypeError(
          "comments.onSendToClaude requires a listener function",
        );
      const n = (a, m) => i(a, m);
      return (
        M.push(n),
        M.length === 1 && $(),
        () => {
          const a = M.indexOf(n);
          a < 0 ||
            (M.splice(a, 1),
            M.length === 0 && (T?.stop.abort(), (T = null), $()));
        }
      );
    };
  e.mount("comments", {
    create: S.wrap("create", (i) => d("create", [i])),
    reply: S.wrap("reply", (i, n) => d("reply", [i, n])),
    sendToClaude: S.wrap("sendToClaude", (i) => d("sendToClaude", [i])),
    canSendToClaude: S.wrap("canSendToClaude", () => d("canSendToClaude", [])),
    ...(e.flags.has(vt) && { onSendToClaude: Ie }),
    resolve: S.wrap("resolve", (i, n) => d("resolve", [i, n])),
    delete: S.wrap("delete", (i) => d("delete", [i])),
    openComposer: S.wrap("openComposer", (i) => {
      const n = i,
        a = n?.element !== void 0,
        m = n?.range !== void 0;
      if (!n || a === m)
        return Promise.reject({
          code: "invalid",
          message: "openComposer takes {element} or {range}",
        });
      let h;
      try {
        if (a) {
          const s = n.element;
          if (!(s instanceof Element) || !s.isConnected)
            return Promise.reject({
              code: "invalid",
              message: "openComposer takes an Element in the document",
            });
          if (s.closest("[data-uncommentable]") !== null)
            return Promise.resolve({ opened: !1 });
          const g = s.getBoundingClientRect(),
            l = Y(g),
            v = ve(s),
            c = s.getClientRects().length > 0;
          h = {
            path: z(s),
            x: l.x,
            y: l.y,
            pin: Q(s, l.px, l.py),
            ...(v ? { sig: v } : {}),
            ...(c ? { doc: Ee(g, l.px, l.py) } : {}),
            rect: B(s),
          };
        } else {
          const s = n.range;
          if (
            !(s instanceof Range) ||
            !(
              s.commonAncestorContainer.isConnected &&
              s.commonAncestorContainer.ownerDocument === document
            )
          )
            return Promise.reject({
              code: "invalid",
              message: "openComposer takes a Range in the document",
            });
          const g = s.commonAncestorContainer,
            l = g instanceof Element ? g : g.parentElement;
          if (!l)
            return Promise.reject({
              code: "invalid",
              message: "openComposer takes a Range in the document",
            });
          if (l.closest("[data-uncommentable]") !== null)
            return Promise.resolve({ opened: !1 });
          const v = s.getBoundingClientRect(),
            c = Y(v),
            f = s.toString(),
            y =
              f !== "" &&
              f.length <= 512 &&
              new TextEncoder().encode(f).length <= 512 &&
              Ye(f),
            b = y ? Be(l, s.startContainer, s.startOffset) : 0,
            w = ve(l),
            C = s.getClientRects().length > 0;
          h = {
            path: z(l),
            x: c.x,
            y: c.y,
            pin: Q(l, c.px, c.py),
            ...(w ? { sig: w } : {}),
            ...(C ? { doc: Ee(v, c.px, c.py) } : {}),
            rect: B(l),
            ...(y && b <= 16777216 ? { span: { start: b, quote: f } } : {}),
          };
        }
      } catch {
        return Promise.reject({
          code: "invalid",
          message: "openComposer could not read the target's geometry",
        });
      }
      return le(h);
    }),
    anchorFor: S.wrap("anchorFor", (i) => {
      if (!(i instanceof Element) || !i.isConnected)
        return Promise.reject({
          code: "invalid",
          message: "anchorFor takes an Element in the document",
        });
      const n = i.getBoundingClientRect(),
        a = innerWidth || 1,
        m = innerHeight || 1,
        h = (s, g, l) =>
          (Math.min(Math.max(s, 0), l) + Math.max(Math.min(g, l), 0)) / 2 / l;
      return Promise.resolve({
        path: z(i),
        x: h(n.left, n.right, a),
        y: h(n.top, n.bottom, m),
      });
    }),
    customAnchors: S.wrap("customAnchors", (i) => {
      if (!A)
        return Promise.reject({
          code: "not_granted",
          message:
            "customAnchors is not declared by this artifact's served version",
        });
      const n = i;
      if (
        !n ||
        typeof n != "object" ||
        typeof n.mode != "function" ||
        typeof n.threads != "function" ||
        typeof n.reveal != "function" ||
        (n.composing !== void 0 && typeof n.composing != "function") ||
        (n.claude !== void 0 && typeof n.claude != "function") ||
        (n.move !== void 0 && typeof n.move != "function") ||
        (n.hotkey !== void 0 && typeof n.hotkey != "boolean") ||
        (n.pinsOutsideMode !== void 0 && typeof n.pinsOutsideMode != "boolean")
      )
        return Promise.reject({
          code: "invalid",
          message:
            "customAnchors takes {mode, threads, reveal} callbacks, optional composing, claude and move callbacks, and optional hotkey and pinsOutsideMode booleans",
        });
      if (_)
        return Promise.reject({
          code: "invalid",
          message:
            "a customAnchors override is already registered - release() it first",
        });
      ((_ = {
        mode: n.mode,
        threads: n.threads,
        reveal: n.reveal,
        ...(typeof n.composing == "function" ? { composing: n.composing } : {}),
        ...(typeof n.claude == "function" ? { claude: n.claude } : {}),
        ...(typeof n.move == "function" ? { move: n.move } : {}),
      }),
        (se += 1),
        (W = n.hotkey === !0 && o),
        (U = n.pinsOutsideMode === !0),
        ue(!0),
        re());
      const a = _;
      queueMicrotask(() => {
        _ === a &&
          (R && L(() => a.mode(!0)),
          H && a.composing && L(() => a.composing(!0)));
      });
      const m = () => _ === a,
        h = {
          compose: (s, g, l) => {
            if (!m())
              return Promise.reject({
                code: "invalid",
                message: "this customAnchors registration was released",
              });
            const v = he(s, g, l);
            return "message" in v
              ? Promise.reject({ code: "invalid", message: v.message })
              : "excluded" in v
                ? Promise.resolve({ opened: !1 })
                : le(v.payload);
          },
          open: (s, g) => {
            if (!m())
              return Promise.reject({
                code: "invalid",
                message: "this customAnchors registration was released",
              });
            if (typeof s != "string" || s === "" || s.length > 256)
              return Promise.reject({
                code: "invalid",
                message: "open takes a thread id from the threads callback",
              });
            const l = pe(g);
            return l
              ? (t.post({ __fc_open: { id: s, x: l.vx, y: l.vy } }),
                Promise.resolve())
              : Promise.reject({
                  code: "invalid",
                  message:
                    "open takes an Element or a {x, y} point in document CSS px",
                });
          },
          placed: (s) => {
            if (!m()) return;
            const g = s;
            if (!g || typeof g != "object") return;
            const l = Object.create(null);
            for (const [v, c] of Object.entries(g)) {
              if (v === "" || v.length > 256) continue;
              const f = c;
              !f ||
                typeof f != "object" ||
                typeof f.x != "number" ||
                typeof f.y != "number" ||
                !Number.isFinite(f.x) ||
                !Number.isFinite(f.y) ||
                (l[v] = { x: f.x, y: f.y });
            }
            ((N = l), je());
          },
          domAnchor: (s, g) => {
            if (!(s instanceof Element) || !s.isConnected)
              throw new TypeError("domAnchor takes an Element in the document");
            const l = z(s),
              v = s.getBoundingClientRect(),
              c = g,
              f =
                c &&
                typeof c == "object" &&
                typeof c.clientX == "number" &&
                typeof c.clientY == "number",
              y = f ? c.clientX : (v.left + v.right) / 2,
              b = f ? c.clientY : (v.top + v.bottom) / 2;
            return [l, { x: y + (scrollX || 0), y: b + (scrollY || 0) }];
          },
          ...(o
            ? {
                enterMode: () => {
                  !m() || R || t.post({ __fc_enter: !0 }, { activation: !0 });
                },
              }
            : {}),
          exitMode: () => {
            if (!m() || !R) return;
            const s = q;
            (t.post({ __fc_exit: !0 }),
              X !== null && clearTimeout(X),
              (X = setTimeout(() => {
                ((X = null), m() && R && q === s && t.post({ __fc_exit: !0 }));
              }, Re)));
          },
          openClaude: (s) => {
            if (!m() || typeof s != "string" || s === "" || s.length > 256)
              return;
            const g = { __fc_claude_open: { id: s } };
            t.post(g, { activation: o });
          },
          release: () => {
            m() &&
              ((_ = null),
              (j = []),
              (W = !1),
              (U = !1),
              (N = null),
              ue(!1),
              t.post({ __fc_ca: { on: !1 } }));
          },
          get areas() {
            return m() && ie;
          },
        };
      return Promise.resolve(h);
    }),
  });
}
export { bt as install };
