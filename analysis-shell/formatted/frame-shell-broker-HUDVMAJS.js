import { Ec as e, ph as t } from "./preload-helper-B-PsknVJ.js";
import {
  _ as n,
  b as r,
  f as i,
  g as a,
  h as o,
  l as s,
  m as c,
  p as l,
  u,
  v as d,
  x as f,
  y as p,
} from "./vendor-frame-DaQ5k-Tx.js";
import {
  BQ as ie,
  Du as Fe,
  Gs as z,
  I7 as ye,
  IT as h,
  KQ as P,
  Ki as Oe,
  LC as R,
  Md as de,
  Ne as je,
  PF as ze,
  QP as g,
  RI as ee,
  Rv as N,
  SG as w,
  TA as m,
  U$ as Le,
  UB as D,
  U_ as ke,
  XR as Ie,
  XT as se,
  Zm as Re,
  bF as O,
  bH as pe,
  bs as L,
  cN as xe,
  cw as S,
  dG as x,
  dU as Se,
  eG as y,
  eP as Te,
  fU as ue,
  fh as Me,
  gD as T,
  gX as re,
  hN as Ce,
  hk as E,
  hy as ce,
  iJ as fe,
  ib as oe,
  j4 as Ae,
  jo as ne,
  k8 as j,
  lN as Pe,
  lV as ae,
  lq as De,
  m4 as k,
  nT as ge,
  nf as b,
  oT as we,
  os as be,
  pN as te,
  pX as me,
  tO as A,
  t_ as I,
  tf as C,
  tp as Be,
  v4 as v,
  vo as le,
  vz as F,
  x5 as he,
  y7 as Ve,
  yG as _,
  ya as ve,
  zB as Ee,
  zJ as _e,
  zV as Ne,
  zj as M,
} from "./shared-frame-CIAC0KKy.js";
import { PL as He, Qz as We, kv as Ue } from "./shared-frame-boot-C59TeSGR.js";
function Ge(e, t) {
  if (!t) return e;
  if ("any" in AbortSignal) return AbortSignal.any([e, t]);
  let n = new AbortController();
  if (e.aborted || t.aborted) return (n.abort(), n.signal);
  let r = () => n.abort();
  return (
    e.addEventListener("abort", r, { once: !0 }),
    t.addEventListener("abort", r, { once: !0 }),
    n.signal
  );
}
var Ke = { call: 12e4, servers: 65e3, authorize: 3e4 },
  B = 13e4,
  qe = 2e3;
function Je(e, t, n, r, i, a, o, s, c) {
  let l = e.org ? `?org=${encodeURIComponent(e.org)}` : "",
    u = () => {
      let e = (c?.() ?? [])
        .map((e) => `card=${encodeURIComponent(e)}`)
        .join("&");
      return e === "" ? l : `${l}${l ? "&" : "?"}${e}`;
    },
    d = (n, r) =>
      fetch(`/api/frame/mcp/${t}${u()}`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", ...e.cpHeaders },
        body: n,
        signal: Ge(et(r), s),
      }).then(async (e) => ({
        status: e.status,
        ok: e.ok,
        text: await e.text(),
        noStore: e.headers.get("X-Frame-Mcp-No-Store") === "1",
        sent: n,
      })),
    f = Math.min(Ke[t], o ?? 1 / 0),
    p = typeof n == "string" ? n : JSON.stringify(n);
  if (r === null) return d(p, f);
  let m = Date.now();
  return d(p, f).then((e) => {
    if (e.status !== 400 || s?.aborted) return e;
    let n = Math.min((o ?? 13e4) - (Date.now() - m), Ke[t]) - qe;
    if (n <= 0) return e;
    let c = JSON.parse(p),
      l = c[r];
    return (
      delete c[r],
      d(JSON.stringify(c), n).then((e) => (e.ok && i(a, l), e))
    );
  });
}
function Ye(e) {
  let { slug: t, server: n, tool: r, mcpToken: i } = JSON.parse(e);
  return JSON.stringify({ slug: t, server: n, tool: r, mcpToken: i });
}
function Xe(e) {
  return Ze(e) !== null;
}
function Ze(e) {
  try {
    let t = JSON.parse(e).error;
    return typeof t?.code == "string" ? t.code : null;
  } catch {
    return null;
  }
}
var Qe = (e) => e.trim() === "not a writer";
function $e(e) {
  if (Qe(e)) return !0;
  try {
    let t = JSON.parse(e);
    return typeof t?.reason == "string" && t.reason !== "";
  } catch {
    return !1;
  }
}
var et = (e) => {
  if ("timeout" in AbortSignal) return AbortSignal.timeout(e);
  let t = new AbortController();
  return (setTimeout(() => t.abort(), e), t.signal);
};
function tt(e) {
  return e.org ? `?org=${encodeURIComponent(e.org)}` : "";
}
function nt(e, t, n, r) {
  let i = tt(e),
    a = n ? `${i}${i ? "&" : "?"}src=${n}` : i;
  return fetch(`/api/frame/mcp/servers${a}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...e.cpHeaders },
    body: JSON.stringify({
      slug: e.frameUuid,
      mcpToken: t.value,
      ...(r !== void 0 && { ask: r }),
    }),
    signal: et(65e3),
  });
}
function rt(e) {
  return e === "_transforms" ||
    e === "_ldx" ||
    e === "mcp" ||
    e === "self" ||
    e === "artifact" ||
    e === "db" ||
    e === "assets" ||
    e === "sample" ||
    e === "comments" ||
    e === "dictation" ||
    e === "speech" ||
    e === "downloads" ||
    e === "paste" ||
    e === "tts" ||
    e === "permissions" ||
    e === "user" ||
    e === "network" ||
    e === "room" ||
    e === "embed" ||
    e === "endpoints" ||
    e === "files" ||
    e === "reads"
    ? e
    : "other";
}
var it = new Set([
  "install",
  "csp",
  "eval",
  "offline",
  "net",
  "http",
  "mime",
  "served",
  "timeout",
]);
function at(e, t) {
  let n = t?.__frame_cap_recovered;
  if (n && typeof n == "object") {
    e.report("cap-load-recovered", rt(n.cap));
    return;
  }
  let r = t?.__frame_cap_telemetry;
  if (!r || typeof r != "object") return;
  if (r.kind === "cap-load-error") {
    let t = rt(r.cap),
      n = r.phase;
    e.report(
      "cap-load-error",
      typeof n == "string" && it.has(n) ? `${t}:${n}` : t,
    );
    return;
  }
  let i = r.leg;
  e.report(
    "transform-error",
    i === "returns" || i === "throws" ? i : "unknown",
  );
}
var ot = 286720,
  st = 131072,
  ct = 40;
function lt(e) {
  let t = 262143,
    n = ot,
    r = [[e, 0]];
  for (; r.length > 0;) {
    let [e, i] = r.pop();
    if (typeof e == "string") {
      if (((n -= e.length), n < 0)) return !1;
      continue;
    }
    if (!(typeof e != "object" || !e)) {
      if (i > ct) return !1;
      if (Array.isArray(e)) {
        if (e.length > st || ((t -= e.length), t < 0)) return !1;
        for (let t of e) r.push([t, i + 1]);
      } else {
        if (ArrayBuffer.isView(e)) return !1;
        let a = Object.getPrototypeOf(e);
        if (a !== Object.prototype && a !== null) return !1;
        let o = 0;
        for (let a in e)
          if (Object.prototype.hasOwnProperty.call(e, a)) {
            if (++o > st || ((n -= a.length), n < 0) || --t < 0) return !1;
            r.push([e[a], i + 1]);
          }
      }
    }
  }
  return !0;
}
var ut = 1048576,
  dt = 64;
function ft(e, t) {
  let n = (t >> 1) - 1,
    r = t,
    i = [e],
    a = [0];
  for (; i.length > 0;) {
    let e = i.pop(),
      t = a.pop() ?? 0;
    if (typeof e == "string" || e instanceof String) {
      if (((r -= e.length), r < 0)) return !1;
      continue;
    }
    if (!(typeof e != "object" || !e)) {
      if (t > dt) return !1;
      if (Array.isArray(e) || ArrayBuffer.isView(e)) {
        let o = e.length,
          s = typeof o == "number" ? o : 0;
        if (((n -= s), n < 0)) return !1;
        if (Array.isArray(e)) for (let n of e) (i.push(n), a.push(t + 1));
        else if (((r -= s * 5), r < 0)) return !1;
        continue;
      }
      for (let o in e) {
        if (!Object.prototype.hasOwnProperty.call(e, o)) continue;
        if (--n < 0 || ((r -= o.length), r < 0)) return !1;
        let s = e[o];
        s !== void 0 && (i.push(s), a.push(t + 1));
      }
    }
  }
  return !0;
}
function pt(e) {
  try {
    let t = JSON.parse(e)?.error;
    return typeof t?.code != "string" || t.code === ""
      ? null
      : typeof t.message == "string" && t.message !== ""
        ? { code: t.code, message: t.message }
        : { code: t.code };
  } catch {
    return null;
  }
}
function V(e, t, n) {
  if (n === void 0) return e.order.length;
  for (let r = 0; r < e.order.length; r++) {
    let i = e.docs.get(e.order[r]);
    if (i !== void 0 && n(t, i) < 0) return r;
  }
  return e.order.length;
}
function mt(e, t, n) {
  let r = V(e, t, n);
  return (
    e.docs.set(t.id, t),
    e.order.splice(r, 0, t.id),
    {
      type: "added",
      id: t.id,
      uid: t.uid,
      v: t.v,
      data: t.data,
      oldIndex: -1,
      newIndex: r,
    }
  );
}
function ht(e, t, n) {
  let r = e.order.indexOf(t.id);
  (e.order.splice(r, 1), e.docs.set(t.id, t));
  let i = V(e, t, n);
  return (
    e.order.splice(i, 0, t.id),
    {
      type: "modified",
      id: t.id,
      uid: t.uid,
      v: t.v,
      data: t.data,
      oldIndex: r,
      newIndex: i,
    }
  );
}
function gt(e, t) {
  let n = e.docs.get(t);
  if (n === void 0) return null;
  let r = e.order.indexOf(t);
  return (
    e.docs.delete(t),
    e.order.splice(r, 1),
    {
      type: "removed",
      id: n.id,
      uid: n.uid,
      v: n.v,
      data: n.data,
      oldIndex: r,
      newIndex: -1,
    }
  );
}
function _t(e, t) {
  if (e === t) return !0;
  if (
    typeof e != "object" ||
    typeof t != "object" ||
    e === null ||
    t === null ||
    Array.isArray(e) !== Array.isArray(t)
  )
    return !1;
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++) if (!_t(e[n], t[n])) return !1;
    return !0;
  }
  let n = e,
    r = t,
    i = Object.keys(n);
  if (i.length !== Object.keys(r).length) return !1;
  for (let e of i)
    if (!Object.prototype.hasOwnProperty.call(r, e) || !_t(n[e], r[e]))
      return !1;
  return !0;
}
function vt(e, t) {
  return e === "" || t === "" || e === t;
}
function yt(e, t, n, r = { resurrects: () => !1 }) {
  let i = [];
  if (n) {
    let n = new Set(t.map((e) => e.id)),
      r = e.order.filter((e) => !n.has(e));
    for (let t of r) {
      let n = gt(e, t);
      n !== null && i.push(n);
    }
  }
  for (let a = 0; a < t.length; a++) {
    let o = t[a],
      s = e.docs.get(o.id);
    if (!n) {
      s === void 0 && !r.resurrects(o) && i.push(mt(e, o, r.cmp));
      continue;
    }
    if (s === void 0) {
      (e.docs.set(o.id, o),
        e.order.splice(a, 0, o.id),
        i.push({
          type: "added",
          id: o.id,
          uid: o.uid,
          v: o.v,
          data: o.data,
          oldIndex: -1,
          newIndex: a,
        }));
      continue;
    }
    let c = e.order.indexOf(o.id);
    if (!vt(s.uid, o.uid))
      (e.order.splice(c, 1),
        i.push({
          type: "removed",
          id: s.id,
          uid: s.uid,
          v: s.v,
          data: s.data,
          oldIndex: c,
          newIndex: -1,
        }),
        e.docs.set(o.id, o),
        e.order.splice(a, 0, o.id),
        i.push({
          type: "added",
          id: o.id,
          uid: o.uid,
          v: o.v,
          data: o.data,
          oldIndex: -1,
          newIndex: a,
        }));
    else if (o.v > s.v) {
      let t = { ...o, uid: o.uid === "" ? s.uid : o.uid };
      (e.order.splice(c, 1),
        e.docs.set(o.id, t),
        e.order.splice(a, 0, o.id),
        i.push({
          type: "modified",
          id: t.id,
          uid: t.uid,
          v: t.v,
          data: t.data,
          oldIndex: c,
          newIndex: a,
        }));
    } else
      (s.uid === "" || o.uid === "") && (o.v < s.v || !_t(s.data, o.data))
        ? (e.order.splice(c, 1),
          e.docs.set(o.id, o),
          e.order.splice(a, 0, o.id),
          i.push({
            type: "modified",
            id: o.id,
            uid: o.uid,
            v: o.v,
            data: o.data,
            oldIndex: c,
            newIndex: a,
          }))
        : (s.uid === "" &&
            o.uid !== "" &&
            e.docs.set(o.id, { ...s, uid: o.uid }),
          c !== a && (e.order.splice(c, 1), e.order.splice(a, 0, o.id)));
  }
  return i;
}
var bt = class e {
    cmp;
    state = { docs: new Map(), order: [] };
    snapshotSeen = null;
    everDelivered = !1;
    tombstones = new Set();
    static MAX_TOMBSTONES = 512;
    lastRejected = 0;
    constructor(e) {
      this.cmp = e;
    }
    get size() {
      return this.state.order.length;
    }
    view() {
      return this.state.order.map((e) => {
        let n = this.state.docs.get(e);
        if (n === void 0)
          throw t(
            Error("cache order/docs desync"),
            "cache order/docs desync",
            "literal",
          );
        return { ...n };
      });
    }
    get(e) {
      let t = this.state.docs.get(e);
      return t === void 0 ? void 0 : { ...t };
    }
    beginSnapshot() {
      (this.tombstones.clear(), (this.snapshotSeen = new Set()));
    }
    demoted() {
      this.tombstones.clear();
    }
    fence() {
      let e = this.snapshotSeen;
      if (((this.snapshotSeen = null), e === null)) return [];
      let t = [],
        n = this.state.order.filter((t) => !e.has(t));
      for (let e of n) {
        let n = gt(this.state, e);
        n !== null && t.push(n);
      }
      return this.deliver(t);
    }
    applyOps(e) {
      let t = [];
      for (let n of e) {
        let e = n.c === "removed" || n.c === "gone";
        this.snapshotSeen !== null && !e && this.snapshotSeen.add(n.id);
        let r = this.state.docs.get(n.id);
        if (e) {
          if (r !== void 0 && vt(n.uid, r.uid) && n.v >= r.v) {
            let e = gt(this.state, n.id);
            e !== null && t.push(e);
          }
          this.entomb(n.id);
          continue;
        }
        let i = {
          id: n.id,
          uid: n.uid === "" && r !== void 0 ? r.uid : n.uid,
          v: n.v,
          data: n.data,
        };
        if ((this.tombstones.delete(n.id), r === void 0))
          t.push(mt(this.state, i, this.cmp));
        else if (vt(r.uid, n.uid))
          n.v > r.v
            ? t.push(ht(this.state, i, this.cmp))
            : r.uid === "" &&
              n.uid !== "" &&
              (this.snapshotSeen !== null && (n.v < r.v || !_t(r.data, n.data))
                ? t.push(ht(this.state, i, this.cmp))
                : this.state.docs.set(n.id, { ...r, uid: n.uid }));
        else {
          let e = gt(this.state, n.id);
          (e !== null && t.push(e), t.push(mt(this.state, i, this.cmp)));
        }
      }
      return this.deliver(t);
    }
    reconcile(e, t = {}) {
      return (
        (this.lastRejected = 0),
        this.deliver(
          yt(this.state, e, t.authoritative !== !1, {
            cmp: this.cmp,
            resurrects: (e) => {
              let t = this.tombstones.has(e.id);
              return (t && this.lastRejected++, t);
            },
          }),
        )
      );
    }
    entomb(t) {
      if (
        (this.tombstones.delete(t),
        this.tombstones.add(t),
        this.tombstones.size > e.MAX_TOMBSTONES)
      ) {
        let e = this.tombstones.values().next().value;
        e !== void 0 && this.tombstones.delete(e);
      }
    }
    deliver(e) {
      let t = this.everDelivered ? e : e.filter((e) => e.type !== "removed");
      return (
        t.some((e) => e.type !== "removed") && (this.everDelivered = !0),
        t
      );
    }
  },
  xt = class {
    limit;
    active = 0;
    waiting = [];
    constructor(e) {
      this.limit = e;
    }
    async run(e) {
      this.active < this.limit
        ? this.active++
        : await new Promise((e) => this.waiting.push(e));
      try {
        return await e();
      } finally {
        let e = this.waiting.shift();
        e === void 0 ? this.active-- : e();
      }
    }
  },
  H = class {
    slots = new Map();
    run(e, t) {
      let n = this.slots.get(e);
      if (n === void 0) return this.start(e, t);
      if (n.queued === null) {
        let r;
        n.queued = {
          result: new Promise((n) => {
            r = () => n(this.start(e, t));
          }),
          start: r,
        };
      }
      return n.queued.result;
    }
    start(e, t) {
      let n = { queued: null };
      this.slots.set(e, n);
      let r = new Promise((e) => e(t())),
        i = () => {
          n.queued === null ? this.slots.delete(e) : n.queued.start();
        };
      return (r.then(i, i), r);
    }
  },
  St = class {
    tail = Promise.resolve();
    queued = 0;
    admitted = [];
    get waiting() {
      return this.queued;
    }
    onNextAdmission(e) {
      return (
        this.admitted.push(e),
        () => {
          let t = this.admitted.indexOf(e);
          t !== -1 && this.admitted.splice(t, 1);
        }
      );
    }
    run(e) {
      this.queued++;
      for (let e of this.admitted.splice(0)) e();
      let t = this.tail.then(() => (this.queued--, e()));
      return (
        (this.tail = t.then(
          () => void 0,
          () => void 0,
        )),
        t
      );
    }
  };
function Ct() {
  let e = globalThis.navigator?.locks;
  return typeof e?.request == "function"
    ? { request: (t, n, r) => e.request(t, n, () => r()) }
    : null;
}
var wt = "ctrl:joined",
  Tt = "ctrl:opened",
  Et = "ctrl:stream_reset",
  Dt = "ctrl:stream_denied",
  Ot = "ctrl:close",
  kt = /^db\.\d{1,3}$/;
function At(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return typeof t.lane != "string" ||
    !Array.isArray(t.stores) ||
    !t.stores.every((e) => typeof e == "string")
    ? null
    : { lane: t.lane, stores: t.stores };
}
function jt(e, t, n) {
  if (typeof e != "string" || e === "") return "UNKNOWN";
  let r = e.toUpperCase(),
    i = r.startsWith(t) ? r.slice(t.length) : r;
  return n.includes(i) ? i : "UNKNOWN";
}
var Mt = [
  "GRANT",
  "RATE",
  "STREAM_LIMIT",
  "NOT_JOINED",
  "UNAVAILABLE",
  "LANE_DISABLED",
  "DENIED",
  "BAD_SPEC",
];
function Nt(e) {
  return jt(e, "STREAM_DENIED_REASON_", Mt);
}
function Pt(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return typeof t.stream != "string" || !kt.test(t.stream)
    ? null
    : { stream: t.stream, reason: t.reason };
}
function Ft(e) {
  let t = Pt(e);
  return t === null ? null : { stream: t.stream };
}
function It(e) {
  return { stream: e.stream, grant: e.grant, spec: e.spec, since: e.since };
}
function Lt(e) {
  return { stream: e };
}
function U(e) {
  return { opens: e.map(It) };
}
function Rt(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  if (t.phase !== void 0 && t.phase !== "snapshot" && t.phase !== "tail")
    return null;
  let n = t.phase === "tail" ? "tail" : "snapshot",
    r = [];
  if (t.ops !== void 0) {
    if (!Array.isArray(t.ops)) return null;
    for (let e of t.ops) {
      let t = zt(e);
      if (t === null) return null;
      r.push(t);
    }
  }
  return {
    ...(typeof t.pos == "string" && t.pos !== "" ? { pos: t.pos } : {}),
    phase: n,
    more: t.more === !0,
    snapshotEnd: t.snapshot_end === !0,
    ops: r,
  };
}
function zt(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  if (
    (t.c !== "added" &&
      t.c !== "modified" &&
      t.c !== "removed" &&
      t.c !== "gone") ||
    typeof t.id != "string" ||
    t.id === "" ||
    typeof t.uid != "string" ||
    t.uid === "" ||
    typeof t.v != "number" ||
    !Number.isInteger(t.v) ||
    t.v < 1
  )
    return null;
  let n;
  if (t.si !== void 0) {
    if (!Array.isArray(t.si) || !t.si.every((e) => typeof e == "number"))
      return null;
    n = t.si;
  }
  let r = t.c === "added" || t.c === "modified",
    i = t.data === void 0 ? (r && t.ref !== !0 ? {} : void 0) : t.data;
  return {
    c: t.c,
    id: t.id,
    uid: t.uid,
    v: t.v,
    ...(i === void 0 ? {} : { data: i }),
    ...(t.ref === !0 ? { ref: !0 } : {}),
    ...(n === void 0 ? {} : { si: n }),
  };
}
var Bt = 1e4,
  Vt = 16,
  Ht = { ok: !1, transient: !0 };
function Ut(e) {
  return !e.ok && e.transient === !0;
}
var Wt = class {
    deps;
    streams = new Map();
    derefGate = new xt(Vt);
    constructor(e) {
      this.deps = e;
    }
    onStreamOpened(e) {
      (this.retireStream(e),
        this.streams.set(e, {
          pending: [],
          inSnapshot: !1,
          chain: Promise.resolve(),
          dooms: new Set(),
        }));
    }
    onStreamClosed(e) {
      this.retireStream(e);
    }
    retireStream(e) {
      let t = this.streams.get(e);
      if (t !== void 0) {
        this.streams.delete(e);
        for (let e of t.dooms) e();
        t.dooms.clear();
      }
    }
    handle(e) {
      let t = this.streams.get(e.stream);
      if (t === void 0) return;
      let n = Rt(e.payload);
      if (n === null) {
        ((t.pending = []), this.deps.onDecodeError(e.stream));
        return;
      }
      if (t.pending.length + n.ops.length > Bt) {
        (this.retireStream(e.stream), this.deps.onOverflow(e.stream));
        return;
      }
      if ((t.pending.push(...n.ops), n.more)) return;
      let r = t.pending;
      t.pending = [];
      let i = { phase: n.phase, snapshotEnd: n.snapshotEnd, pos: n.pos };
      t.chain = t.chain
        .then(() => this.apply(e.stream, t, r, i))
        .catch(() => void 0);
    }
    async apply(e, t, n, r) {
      let i = await this.resolveRefs(e, t, n),
        a = this.deps.cacheFor(e);
      if (a === null || this.streams.get(e) !== t) return;
      if (i === null) {
        (this.retireStream(e), this.deps.onDerefUnavailable(e));
        return;
      }
      (r.phase === "snapshot" || r.snapshotEnd) &&
        !t.inSnapshot &&
        ((t.inSnapshot = !0), a.beginSnapshot());
      let o = a.applyOps(i);
      if (r.snapshotEnd) {
        for (let e of a.fence()) o.push(e);
        t.inSnapshot = !1;
      }
      (r.pos !== void 0 &&
        (r.snapshotEnd || r.phase === "tail") &&
        this.deps.recordPos(e, r.pos),
        r.snapshotEnd && this.deps.onFence(e),
        this.deps.deliver(e, o, { phase: r.phase, fence: r.snapshotEnd }));
    }
    async resolveRefs(e, t, n) {
      if (!n.some((e) => e.ref === !0)) return n;
      let r = !1,
        i,
        a = new Promise((e) => {
          i = () => {
            ((r = !0), e(Ht));
          };
        });
      t.dooms.add(i);
      try {
        let o = await Promise.all(
          n.map(async (n) => {
            if (n.ref !== !0) return n;
            let o = await this.derefGate.run(() => {
              if (r || this.streams.get(e) !== t) return Promise.resolve(Ht);
              let o = Promise.resolve()
                .then(() => this.deps.deref(e, n.id))
                .catch(() => Ht)
                .then((e) => (Ut(e) && i(), e));
              return Promise.race([o, a]);
            });
            return o.ok
              ? { ...n, ref: void 0, data: o.data }
              : Ut(o)
                ? null
                : { c: "removed", id: n.id, uid: n.uid, v: n.v };
          }),
        );
        return o.some((e) => e === null) ? null : o;
      } finally {
        (t.dooms.delete(i), i());
      }
    }
  },
  Gt =
    "This artifact's database is full, so new data isn't being saved. Ask Claude to optimize data storage.",
  Kt = {
    invalid_argument: "The request was malformed or exceeds a limit.",
    resource_exhausted: "Too many requests or subscriptions; retry later.",
    quota_exceeded: Gt,
    unavailable: "The document store is temporarily unavailable; retry later.",
    revoked: "This view's access to the document store was withdrawn.",
  };
function W(e, t) {
  return { code: e, message: t ?? Kt[e] };
}
var qt = {
  invalid_argument: {
    account_write_not_permitted: () =>
      "Your account can't change this artifact's data. Ask your admin for permission.",
  },
  quota_exceeded: {
    docs_per_collection: () =>
      "Part of this artifact's database is full, so new data isn't being saved there. Ask Claude to optimize data storage.",
    docs_per_database: () => Gt,
    bytes_per_database: () =>
      "This artifact's database has reached its storage limit, so new data isn't being saved. Delete data this artifact no longer needs.",
    databases_per_org: (e) =>
      `This organization has reached its ${e === null ? "limit on" : `limit of ${e}`} artifact databases.`,
  },
  resource_exhausted: {
    active_leases: () =>
      "This artifact's database has too many active leases. Release some or try again after they expire.",
    rate_limited: () => "Too many requests. Try again shortly.",
    refused_writes: () =>
      "This write was refused several times and is paused. Check the document path, the data, and this viewer's access.",
    write_capacity: () => "Too many concurrent writes. Try again shortly.",
    scan_budget: () =>
      "This query scans too many documents. Narrow the query or its filters.",
    response_budget: () =>
      "This query's result is too large. Request fewer documents.",
  },
};
function Jt(e, t, n) {
  let r = Zt(e),
    i = qt[r],
    a =
      i !== void 0 && typeof t == "string" && Object.hasOwn(i, t)
        ? i[t]
        : void 0;
  return a === void 0
    ? W(r)
    : W(
        r,
        a(
          typeof n == "number" && Number.isSafeInteger(n) && n > 0
            ? n.toLocaleString("en-US")
            : null,
        ),
      );
}
function Yt(e) {
  return e === 404
    ? "revoked"
    : e === 400
      ? "invalid_argument"
      : e === 429
        ? "resource_exhausted"
        : "unavailable";
}
var Xt = {
  invalid_argument: "invalid_argument",
  resource_exhausted: "resource_exhausted",
  quota_exceeded: "quota_exceeded",
  unavailable: "unavailable",
  "data-unavailable": "unavailable",
  "upstream-error": "unavailable",
  "not-found": "invalid_argument",
  not_found: "invalid_argument",
  bad_request: "invalid_argument",
  not_declared: "invalid_argument",
  rate_limited: "resource_exhausted",
  quota_or_rate: "resource_exhausted",
  busy: "unavailable",
  store_unavailable: "unavailable",
  capdecl_unavailable: "unavailable",
  upstream_auth: "unavailable",
  upstream_error: "unavailable",
  "invalid-argument": "invalid_argument",
  "resource-exhausted": "resource_exhausted",
};
function Zt(e) {
  return typeof e == "string" && Object.hasOwn(Xt, e) ? Xt[e] : "unavailable";
}
var Qt = 3,
  $t = 2e3,
  en = 3e4,
  tn = 1e3,
  nn = 6e4,
  rn = 256,
  an = en;
function on(e) {
  let t = e?.trim() ?? "";
  return /^\d+$/.test(t) ? Number(t) * 1e3 : void 0;
}
function sn(e) {
  let t = e.now ?? Date.now,
    n = new Map(),
    r = 0,
    i = (e, t) => {
      (n.delete(e),
        n.size >= rn && n.delete(n.keys().next().value),
        n.set(e, t));
    },
    a = (e, t) => ({
      streak: 0,
      tripped: !1,
      probing: !1,
      probeId: 0,
      blockedUntil: 0,
      idleProbe: !1,
      pressedUntil: 0,
      cooldownMs: $t,
      rttMs: e,
      paced: t,
    }),
    o = (e, t) => {
      ((e.probing = !0),
        (e.probeId = ++r),
        (e.idleProbe ||= t - Math.max(e.blockedUntil, e.pressedUntil) > an),
        (e.pressedUntil = Math.max(e.pressedUntil, t)));
    },
    s = (e, n) => {
      let r = Math.min(Math.max(tn, e.rttMs), en);
      return (
        (e.pressedUntil = Math.max(e.pressedUntil, t() + r)),
        { error: n, delayMs: r }
      );
    };
  return {
    check(e, r) {
      let i = n.get(e);
      if (i === void 0) return null;
      let a = t();
      if (i.paced !== void 0) {
        if (a < i.paced.until) return s(i, i.paced.err);
        i.paced = void 0;
      }
      return !i.tripped || i.err === void 0
        ? null
        : r !== void 0 && i.floor !== void 0 && r < i.floor
          ? ((i.pressedUntil = Math.max(i.pressedUntil, a)), null)
          : i.probing || a < i.blockedUntil
            ? s(i, i.err)
            : (o(i, a), null);
    },
    holding(e, r) {
      let i = n.get(e);
      if (i === void 0) return !1;
      let a = t();
      return i.paced !== void 0 && a < i.paced.until
        ? !0
        : !i.tripped ||
            i.err === void 0 ||
            (r !== void 0 && i.floor !== void 0 && r < i.floor)
          ? !1
          : i.probing || a < i.blockedUntil;
    },
    release(e) {
      let r = n.get(e);
      r === void 0 ||
        !r.probing ||
        ((r.probing = !1),
        r.tripped && (r.blockedUntil = Math.max(r.blockedUntil, t() + $t)));
    },
    probeOut(e) {
      let t = n.get(e);
      return t?.probing === !0 ? t.probeId : void 0;
    },
    resetWhere(e) {
      for (let t of n.keys()) e(t) && n.delete(t);
    },
    note(r, o, s = {}) {
      if (o === null) {
        if ((n.delete(r), s.freed !== !1))
          for (let t of e.frees?.[r] ?? []) n.delete(t);
        return;
      }
      let c = t(),
        l = n.get(r);
      if (e.pacedCodes?.has(o.code)) {
        l ??= a(s.rttMs ?? 0);
        let e = Math.min(s.retryAfterMs ?? $t, nn);
        ((l.paced = { err: o, until: Math.max(l.paced?.until ?? 0, c + e) }),
          l.probing && l.idleProbe
            ? (l = a(l.rttMs, l.paced))
            : l.tripped &&
              (l.blockedUntil = Math.max(l.blockedUntil, l.paced.until)),
          (l.probing = !1),
          (l.rttMs = s.rttMs ?? l.rttMs),
          i(r, l));
        return;
      }
      if (!e.stateCodes.has(o.code)) {
        n.delete(r);
        return;
      }
      if (
        ((l === void 0 ||
          l.err === void 0 ||
          l.err.code !== o.code ||
          (l.probing && l.idleProbe)) &&
          (l = a(s.rttMs ?? 0, l?.paced)),
        i(r, l),
        (l.err = o),
        (l.rttMs = s.rttMs ?? l.rttMs),
        s.size !== void 0 && (l.floor = Math.min(l.floor ?? s.size, s.size)),
        l.tripped)
      ) {
        if (!l.probing) return;
        ((l.probing = !1),
          (l.cooldownMs = Math.min(l.cooldownMs * 2, en)),
          (l.blockedUntil = c + l.cooldownMs));
        return;
      }
      ((l.streak += 1),
        l.streak >= Qt &&
          ((l.tripped = !0), (l.blockedUntil = c + l.cooldownMs)));
    },
  };
}
var cn = 2e4,
  ln = 15e3,
  un = 13e4,
  dn = 2e3,
  fn = 100,
  pn = 200,
  mn = 2e3,
  hn = 6e3,
  gn = 0.4,
  _n = "refused_writes",
  vn = new Set(["resource_exhausted"]),
  yn = " This write was not sent: it is still paused.",
  bn = "batch",
  xn = "account_write_not_permitted",
  Sn = new Set(["invalid_argument"]),
  Cn = "write",
  wn = "rate_limited",
  Tn = 6e4,
  En = 1e3,
  Dn = 2e3,
  On = 32,
  kn = 5e3,
  An = 3e4,
  jn = "frame-db-doc:",
  Mn = 60;
function Nn(e) {
  let t = e.lastIndexOf(".");
  if (t < 0) return null;
  let n = e.slice(t + 1);
  return /^\d{1,12}$/.test(n) ? Number(n) : null;
}
function Pn(e, t) {
  let n = Nn(e);
  return n !== null && n - t / 1e3 <= Mn;
}
function G(e, t) {
  return un - (t - e) - dn >= cn;
}
var Fn = { kind: "err", err: W("revoked") },
  In = new Set(["quota_exceeded"]),
  Ln = "bytes_per_database",
  Rn =
    " This write was not sent: the last few writes to this collection were refused for the same reason, so only an occasional later write is sent to check whether that has changed.",
  zn = 256;
function Bn(e) {
  let t = typeof e.path == "string" ? e.path : "";
  return "set " + t.slice(0, Math.max(0, t.lastIndexOf("/")));
}
function Vn(e) {
  try {
    let t = JSON.stringify(e);
    return t === void 0 ? void 0 : new TextEncoder().encode(t).length;
  } catch {
    return;
  }
}
function Hn(e) {
  return { kind: "kept", out: e.out, transport: e.transport };
}
function Un(e, t) {
  let n = e?.results;
  if (!Array.isArray(n) || n.length !== t.length) return null;
  let r = [];
  for (let [e, i] of t.entries()) {
    let t = n[e]?.version;
    if (i.verb === "delete") r.push(null);
    else if (typeof t == "number") r.push(t);
    else return null;
  }
  return r;
}
function Wn(e, t) {
  return e + " " + t;
}
var Gn = class {
    now;
    held = null;
    probing = !1;
    constructor(e) {
      this.now = e;
    }
    holding() {
      return this.held === null ||
        !(this.probing || this.now() < this.held.until)
        ? null
        : { error: this.held.err, delayMs: En };
    }
    check() {
      let e = this.holding();
      if (e !== null || this.held === null) return e;
      let t = this.now();
      return t >= this.held.spentUntil && t - this.held.until >= Dn
        ? ((this.held = null), null)
        : ((this.probing = !0), "probe");
    }
    refused(e, t) {
      let n = this.now();
      ((this.held = {
        err: e,
        until: Math.max(this.held?.until ?? 0, n + Math.min(t, Tn)),
        spentUntil: Math.max(this.held?.spentUntil ?? 0, n + t),
        since: n,
      }),
        (this.probing = !1));
    }
    answered(e) {
      this.held !== null &&
        e >= this.held.since &&
        ((this.held = null), (this.probing = !1));
    }
    probeDone() {
      this.probing &&= ((this.held = null), !1);
    }
  },
  Kn = { run: (e) => e() },
  qn = {
    kind: "err",
    err: W(
      "unavailable",
      "This write was not sent: earlier writes from this page were still pending when its reply window closed; retry it.",
    ),
  },
  Jn = {
    kind: "err",
    err: W(
      "unavailable",
      "This read was not sent: earlier reads of this artifact's data were still pending when its reply window closed; retry it.",
    ),
  },
  Yn = [
    "idem",
    "ops",
    "path",
    "collection",
    "data",
    "replace",
    "where",
    "orderBy",
    "limit",
    "cursor",
    "holder",
    "ttlMs",
  ];
function Xn() {}
function Zn(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Qn(e) {
  return e.outage && e.pauseMs !== void 0
    ? Math.min(e.pauseMs, hn) * (1 + Math.random() * gn)
    : Math.min(e.pauseMs ?? fn, mn) + Math.random() * pn;
}
function $n(e) {
  let t = e === null ? NaN : typeof e == "number" ? e : Number(e.trim());
  return Number.isInteger(t) && t > 0 ? t * 1e3 : void 0;
}
function er(e, t) {
  return { out: e, retryable: !1, ...(t === void 0 ? {} : { detail: t }) };
}
var tr = new Set([400, 405, 411, 413, 414, 415, 422, 431]);
function nr(e) {
  let t = e.refusal;
  return t !== void 0 && t.env === null && tr.has(t.status);
}
function rr(e) {
  try {
    let t = JSON.parse(e)?.error;
    return typeof t?.code == "string" && t.code !== ""
      ? {
          code: t.code,
          kind: t.kind,
          limit: t.limit,
          ...(t.verb === void 0 ? {} : { verb: t.verb }),
        }
      : null;
  } catch {
    return null;
  }
}
var ir = class {
    deps;
    constructor(e) {
      this.deps = e;
    }
    call(e, t, n, r) {
      let i = n === void 0 ? { verb: e } : { token: n, verb: e };
      for (let e of Yn) t[e] !== void 0 && (i[e] = t[e]);
      return this.post("/call", i, r, t.src);
    }
    subscribe(e, t, n) {
      return this.post(
        "/subscribe",
        t === void 0 ? { spec: e } : { token: t, spec: e },
        n,
      );
    }
    async post(e, t, n, r) {
      let i = this.deps.fetchFn ?? ((e, t) => fetch(e, t));
      try {
        let a =
            this.deps.endpoint?.(e) ??
            "/api/frame/db/" +
              encodeURIComponent(this.deps.slug) +
              e +
              this.deps.query,
          o = await i(
            r === void 0
              ? a
              : a +
                  (a.includes("?") ? "&" : "?") +
                  "src=" +
                  encodeURIComponent(r),
            {
              ...this.deps.requestInit,
              method: "POST",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
                ...this.deps.cpHeaders,
              },
              body: JSON.stringify(t),
              ...(this.deps.signalFor === void 0
                ? {}
                : { signal: this.deps.signalFor(n) }),
            },
            n,
          ),
          s = $n(o.headers.get("Retry-After")),
          c = s === void 0 ? {} : { retryAfterMs: s },
          l = await o.text();
        if (!o.ok) return { ok: !1, status: o.status, env: rr(l), ...c };
        try {
          let e = JSON.parse(l);
          return { ok: !0, status: o.status, result: e, env: null, ...c };
        } catch {
          return { ok: !0, status: o.status, malformed: !0, env: null };
        }
      } catch (e) {
        return (this.deps.markHandled?.(e), null);
      }
    }
  },
  ar = class {
    deps;
    door;
    minting = new Map();
    writeOrder;
    reads;
    pacer;
    docPacer;
    pausedWrites;
    barredWrites;
    rateHold;
    closed = !1;
    closing = new AbortController();
    waived = new Map();
    paused = new Set();
    known = new Map();
    ahead = null;
    constructor(e) {
      ((this.deps = e),
        (this.door = e.door ?? new ir(e)),
        (this.writeOrder = e.writeOrder ?? new St()),
        (this.reads = e.readGate ?? new xt(On)),
        (this.pacer = sn({ stateCodes: In, now: () => this.now() })),
        (this.docPacer = sn({ stateCodes: In, now: () => this.now() })),
        (this.pausedWrites = sn({
          stateCodes: new Set(),
          pacedCodes: vn,
          now: () => this.now(),
        })),
        (this.barredWrites = sn({ stateCodes: Sn, now: () => this.now() })),
        (this.rateHold = new Gn(() => this.now())));
    }
    close() {
      ((this.closed = !0), this.closing.abort());
      for (let e of this.paused) e();
      this.paused.clear();
    }
    async inTurn(e, t) {
      let n = this.deps.docTurns ?? null,
        r = jn + this.deps.slug + ":" + e;
      if (
        n === null ||
        e === "" ||
        this.closed ||
        this.writeOrder.waiting > 0 ||
        (this.waived.get(r) ?? 0) > this.now()
      )
        return t();
      this.waived.delete(r);
      let i = new AbortController(),
        a = () => i.abort();
      this.closing.signal.addEventListener("abort", a);
      let o = this.writeOrder.onNextAdmission(a),
        s = setTimeout(() => {
          let e = this.now();
          for (let [t, n] of this.waived) n <= e && this.waived.delete(t);
          (this.waived.set(r, e + An), a());
        }, kn),
        c = () => {
          (clearTimeout(s),
            o(),
            this.closing.signal.removeEventListener("abort", a));
        },
        l = null,
        u = () => (c(), (l ??= t()));
      try {
        return await n.request(r, { signal: i.signal }, u);
      } catch {
        return await u();
      } finally {
        c();
      }
    }
    async call(e, t, n) {
      return this.surface(await this.readLeg(e, t, n ?? this.now()));
    }
    async read(e, t, n) {
      let r = n ?? this.now(),
        i = await this.readLeg(e, t, r);
      if (!i.retryable && !i.outage) return this.surface(i);
      let a = Qn(i);
      if ((await (this.deps.sleep?.(a) ?? Zn(a)), this.closed)) return Fn;
      if (!G(r, this.now())) return this.surface(i);
      let o = await this.readLeg(e, t, r);
      return this.surface(o.out === Jn ? i : o);
    }
    readLeg(e, t, n) {
      return this.reads
        .run(() => {
          if (this.closed) return Promise.resolve(er(Fn));
          if (!G(n, this.now())) return Promise.resolve(er(Jn, "unsent"));
          let r = this.rateHold.check();
          return r !== null && r !== "probe"
            ? Promise.resolve(r)
            : this.leg(e, t, n)
                .finally(() => {
                  r === "probe" && this.rateHold.probeDone();
                })
                .then((e) => (e.out === qn ? er(Jn, "unsent") : e));
        })
        .then((e) => ("delayMs" in e ? this.refuse(e).then((e) => er(e)) : e));
    }
    async sendQueued(e, t = { quiet: !1 }) {
      let n = t.wanted ?? (() => !0),
        r = t.resend === !0 ? { wait: !0 } : {},
        i = {
          idem: e.idem,
          path: e.path,
          ...(e.data === void 0 ? {} : { data: e.data }),
          ...(e.replace === void 0 ? {} : { replace: e.replace }),
        },
        a = this.deps.writeOrder ?? Kn,
        o = null;
      for (; !this.closed && n();) {
        let s = await a.run(async () => {
          if (this.closed || !n()) return null;
          let a = this.writeGate(e.verb, i, { existing: t.existing === !0 }),
            o = this.lapsing(e.verb, a, !0);
          if (o !== null) return o;
          let s = this.barred();
          if ("held" in s) return { ...s.held, ...r };
          let c = null;
          try {
            if (((c = this.paced(a)), c !== null)) return { ...c, ...r };
            let t = await this.writeLeg(e.verb, i, a.path, n);
            return (
              t !== null &&
                !("delayMs" in t) &&
                this.pace(a.key, e.verb, a.path, a.replace, t, a.size),
              t
            );
          } finally {
            (c === null && a.breaker?.pacer.release(a.breaker.key),
              this.releaseBarred(s.probe));
          }
        });
        if (s === null || !("delayMs" in s)) {
          o = s;
          break;
        }
        if (s.wait !== !0)
          return {
            out: this.localOut(s),
            transport: !1,
            answered: !0,
            ...(s.refused ? { drop: "refused" } : {}),
            delayMs: s.delayMs,
          };
        await this.pause(s.delayMs);
      }
      if (o === null) return "detached";
      let s = this.queuedVerdict(o, t.quiet);
      if (s === "detached") return s;
      if (o.paused) return { ...s, drop: "refused" };
      if (t.resend !== !0 && nr(o)) {
        let e = { kind: "err", err: W("invalid_argument") };
        return { ...s, out: e, drop: "unsendable" };
      }
      return o.outage && o.pauseMs !== void 0
        ? { ...s, retryAfterMs: o.pauseMs }
        : s;
    }
    queuedVerdict(e, t) {
      if (
        (e.out.kind === "err" &&
          e.out.err.code === "revoked" &&
          e.detail === void 0) ||
        e.detail === "401" ||
        e.detail === "403"
      )
        return "detached";
      let n =
          e.detail === "fetch-failed" ||
          e.detail === "malformed-response" ||
          e.detail === "408",
        r = e.detail === void 0;
      return { out: t ? e.out : this.surface(e), transport: n, answered: r };
    }
    batchable(e, t) {
      let n = this.writeGate(e.verb, e, t);
      return !(
        this.pausedWrites.holding(Wn(e.verb, n.path)) ||
        this.barredWrites.holding(Cn) ||
        n.breaker?.pacer.holding(n.breaker.key, n.size) === !0
      );
    }
    async sendQueuedBatch(e, t, n = { quiet: !1 }) {
      let r = n.wanted ?? (() => !0),
        i = {
          idem: t,
          ops: e.map((e) => ({
            op: e.verb,
            path: e.path,
            ...(e.data === void 0 ? {} : { data: e.data }),
            ...(e.replace === void 0 ? {} : { replace: e.replace }),
          })),
        },
        a = e.map((e, t) => this.writeGate(e.verb, e, n.hints?.[t])),
        o = this.deps.writeOrder ?? Kn,
        s = null;
      for (; !this.closed && r();) {
        let t = await o.run(async () => {
          if (this.closed || !r()) return null;
          let t = this.rateHold.holding();
          return t === null
            ? n.resend !== !0 &&
              !e.every((e, t) => this.batchable(e, n.hints?.[t]))
              ? "held"
              : this.writeLeg(bn, i, "", r)
            : { ...t, wait: !0 };
        });
        if (t === "held") return { kind: "refused", why: "held" };
        if (t === null || !("delayMs" in t)) {
          s = t;
          break;
        }
        await this.pause(t.delayMs);
      }
      let c = s === null ? "detached" : this.queuedVerdict(s, n.quiet);
      if (s === null || c === "detached") return "detached";
      if (s.out.kind === "ok") {
        let t = Un(s.out.result, e);
        if (t === null)
          return (
            n.quiet || this.deps.report?.("malformed-response"),
            {
              kind: "kept",
              out: { kind: "err", err: W("unavailable") },
              transport: !1,
            }
          );
        for (let [t, n] of e.entries()) {
          let e = a[t];
          this.pace(e.key, n.verb, e.path, e.replace, s, e.size);
        }
        let r = s.out.result.usage;
        return {
          kind: "ok",
          versions: t,
          ...(r === void 0 ? {} : { usage: r }),
        };
      }
      let l = s.refusal?.status,
        u = s.refusal?.env ?? null,
        { code: d } = s.out.err;
      if (s.paused)
        return {
          kind: "refused",
          why: "paused",
          ...(s.pauseMs === void 0 ? {} : { retryAfterMs: s.pauseMs }),
        };
      if (s.barred) return { kind: "refused", why: "barred" };
      if (l === 413) return { kind: "refused", why: "oversize" };
      if (u === null && l !== void 0 && l >= 400 && l < 500) {
        if (l === 429) return { ...Hn(c), precommit: !0 };
        if (n.resend !== !0 && l !== 404 && l !== 408)
          return { kind: "refused", why: "unsupported" };
      }
      return u !== null && (d === "invalid_argument" || d === "quota_exceeded")
        ? {
            kind: "refused",
            why:
              l === 400 && u.verb !== bn && u.kind === void 0
                ? "unsupported"
                : "store",
          }
        : {
            ...Hn(c),
            ...(u !== null && (l === 429 || (l === 409 && u.code === "busy"))
              ? { precommit: !0 }
              : {}),
            ...(s.outage && s.pauseMs !== void 0
              ? { retryAfterMs: s.pauseMs }
              : {}),
          };
    }
    write(e, t, n) {
      let r = this.now(),
        i = async () => {
          if (this.closed) return Fn;
          if (!G(r, this.now())) return this.surface(er(qn, "unsent"));
          let i = this.writeGate(e, t, n),
            a = this.lapsing(e, i, !1) ?? this.paced(i);
          if (a !== null) return a;
          let { key: o, path: s, replace: c, size: l } = i;
          try {
            let n = await this.writeLeg(e, t, s, r);
            if (n === null)
              return this.closed ? Fn : this.surface(er(qn, "unsent"));
            if ("delayMs" in n) return n;
            if (!n.retryable)
              return (this.pace(o, e, s, c, n, l), this.surface(n));
            let i = Qn(n);
            await (this.deps.sleep?.(i) ?? Zn(i));
            let a = await this.writeLeg(e, t, s, r);
            return a === null
              ? this.closed
                ? Fn
                : this.surface(n)
              : "delayMs" in a
                ? a
                : (this.pace(o, e, s, c, a, l), this.surface(a));
          } finally {
            i.breaker?.pacer.release(i.breaker.key);
          }
        };
      return this.writeOrder
        .run(() => this.unlessBarred(r, i))
        .then((e) => ("delayMs" in e ? this.refuse(e) : e));
    }
    writeGate(e, t, n) {
      let r = e === "set" ? Bn(t) : null,
        i = typeof t.path == "string" ? t.path : "",
        a = r !== null && (this.known.get(i) ?? n?.existing === !0),
        o = r === null ? void 0 : (n?.bytes ?? Vn(t.data)),
        s =
          r === null
            ? null
            : a
              ? { pacer: this.docPacer, key: i }
              : { pacer: this.pacer, key: r };
      return {
        key: r,
        path: i,
        replace: a,
        ...(o === void 0 ? {} : { size: o }),
        breaker: s,
      };
    }
    lapsing(e, t, n) {
      let r = this.pausedWrites.check(Wn(e, t.path));
      if (r !== null) return { ...r, note: yn, refused: !0 };
      let i = n ? this.rateHold.holding() : null;
      return i === null ? null : { ...i, wait: !0 };
    }
    paced(e) {
      let t = e.breaker?.pacer.check(e.breaker.key, e.size) ?? null;
      return t === null ? null : { ...t, note: Rn };
    }
    barred() {
      let e = this.barredWrites.probeOut(Cn),
        t = this.barredWrites.check(Cn),
        n = this.barredWrites.probeOut(Cn);
      return t === null ? { probe: n === e ? void 0 : n } : { held: t };
    }
    releaseBarred(e) {
      e !== void 0 &&
        this.barredWrites.probeOut(Cn) === e &&
        this.barredWrites.release(Cn);
    }
    async unlessBarred(e, t) {
      let n =
        this.closed || !G(e, this.now()) ? { probe: void 0 } : this.barred();
      if ("held" in n) return n.held;
      try {
        return await t();
      } finally {
        this.releaseBarred(n.probe);
      }
    }
    async writeLeg(e, t, n, r) {
      let i = () => (typeof r == "number" ? G(r, this.now()) : r());
      if (this.closed || !i()) return null;
      let a = this.rateHold.check();
      if (a !== null && a !== "probe") return { ...a, wait: !0 };
      try {
        return await this.inTurn(e === "acquire" ? "" : n, async () =>
          this.closed || !i()
            ? null
            : this.leg(e, t, typeof r == "number" ? r : this.now()),
        );
      } finally {
        a === "probe" && this.rateHold.probeDone();
      }
    }
    async refuse(e) {
      return (await this.pause(e.delayMs), this.closed ? Fn : this.localOut(e));
    }
    async pause(e) {
      if (this.closed) return;
      let t,
        n = new Promise((e) => (t = e));
      (this.paused.add(t),
        (this.deps.sleep?.(e) ?? Zn(e)).then(t),
        await n,
        this.paused.delete(t));
    }
    localOut(e) {
      let t = e.error;
      return { kind: "err", err: W(t.code, t.message + (e.note ?? "")) };
    }
    learn(e, t) {
      (this.known.delete(e),
        this.known.size >= zn &&
          this.known.delete(this.known.keys().next().value),
        this.known.set(e, t));
    }
    pace(e, t, n, r, i, a) {
      if (i.detail !== void 0 || i.retryable || i.spent) return;
      let o = i.out.kind === "err" ? i.out.err : null;
      if (
        (!i.paused &&
          o?.code !== "unavailable" &&
          o?.code !== "revoked" &&
          this.barredWrites.note(Cn, i.barred ? o : null),
        i.out.kind === "ok")
      ) {
        if (
          (this.pausedWrites.resetWhere(
            (e) => e.slice(e.indexOf(" ") + 1) === n,
          ),
          t === "delete")
        ) {
          (this.learn(n, !1),
            this.pacer.resetWhere(() => !0),
            this.docPacer.resetWhere(() => !0));
          return;
        }
        ((t === "set" || t === "update") &&
          (this.learn(n, !0), this.docPacer.note(n, null)),
          e !== null && !r && this.pacer.note(e, null));
        return;
      }
      if (i.paused) {
        this.pausedWrites.note(
          Wn(t, n),
          i.out.err,
          i.pauseMs === void 0 ? {} : { retryAfterMs: i.pauseMs },
        );
        return;
      }
      let { code: s } = i.out.err;
      if (e !== null && s !== "unavailable" && s !== "revoked") {
        if (i.forSize) {
          let t = a === void 0 ? {} : { size: a };
          r
            ? this.docPacer.note(n, i.out.err, t)
            : this.pacer.note(e, i.out.err, t);
          return;
        }
        (In.has(s) && this.learn(n, !1),
          this.pacer.note(e, i.out.err, { size: 0 }),
          this.docPacer.note(n, null));
      }
    }
    surface(e) {
      return (e.detail !== void 0 && this.deps.report?.(e.detail), e.out);
    }
    async leg(e, t, n) {
      let r = this.token(),
        i = this.refreshDue(r) ? r : null,
        a = cn;
      if (
        i !== null &&
        ((r = await this.refreshAhead(i)),
        (a = Math.min(cn, un - (this.now() - n) - dn)),
        r !== null && a <= 0)
      )
        return er(qn, "unsent");
      if (r === null) return er({ kind: "err", err: W("revoked") });
      let o = this.now(),
        s = await this.door.call(e, t, r, a);
      if (
        s !== null &&
        s.status === 401 &&
        r === void 0 &&
        this.deps.onUnauthorized !== void 0
      ) {
        if ((await this.deps.onUnauthorized().catch(() => void 0), this.closed))
          return er(Fn);
        let r = un - (this.now() - n) - dn;
        r > 0 && (s = await this.door.call(e, t, void 0, Math.min(ln, r)));
      } else if (
        s !== null &&
        (s.status === 403 || s.status === 401) &&
        r !== void 0 &&
        s.env === null &&
        this.deps.onAuthStale !== void 0
      ) {
        if (
          this.closed ||
          (await this.deps.onAuthStale().catch(() => void 0), this.closed)
        )
          return er(Fn);
        let i = this.token(),
          a = un - (this.now() - n) - dn;
        i != null &&
          i !== r &&
          a > 0 &&
          (s = await this.door.call(e, t, i, Math.min(ln, a)));
      }
      if (s === null)
        return er({ kind: "err", err: W("unavailable") }, "fetch-failed");
      if (s.ok)
        return s.malformed
          ? er({ kind: "err", err: W("unavailable") }, "malformed-response")
          : (this.rateHold.answered(o), er({ kind: "ok", result: s.result }));
      let c = s.retryAfterMs === void 0 ? {} : { pauseMs: s.retryAfterMs },
        { env: l } = s;
      if (l !== null) {
        let e = Jt(l.code, l.kind, l.limit),
          t = s.status === 429 && l.kind === _n,
          n =
            s.status === 429 && l.kind === wn && e.code === "resource_exhausted"
              ? s.retryAfterMs
              : void 0;
        n === void 0 ? this.rateHold.answered(o) : this.rateHold.refused(e, n);
        let r =
            (!t &&
              (n ?? 0) <= mn &&
              s.status === 429 &&
              e.code !== "quota_exceeded" &&
              l.kind !== "scan_budget" &&
              l.kind !== "response_budget") ||
            (s.status === 409 && l.code === "busy"),
          i =
            s.status === 503 &&
            l.code === "unavailable" &&
            s.retryAfterMs !== void 0;
        return {
          out: { kind: "err", err: e },
          retryable: r,
          refusal: { status: s.status, env: l },
          ...c,
          ...(t ? { paused: !0 } : {}),
          ...(n === void 0 ? {} : { spent: !0 }),
          ...(e.code === "quota_exceeded" && l.kind === Ln
            ? { forSize: !0 }
            : {}),
          ...(i ? { outage: !0 } : {}),
          ...(Sn.has(e.code) && l.kind === xn ? { barred: !0 } : {}),
        };
      }
      let u = s.status === 429;
      return {
        out: {
          kind: "err",
          err: W(s.gone ? "revoked" : this.statusCode(s.status)),
        },
        retryable: u,
        refusal: { status: s.status, env: null },
        ...c,
        detail: s.detail ?? String(s.status),
      };
    }
    subscribe(e, t) {
      let n = this.minting.get(e);
      if (n !== void 0) return n;
      let r = this.mintOnce(t).finally(() => this.minting.delete(e));
      return (this.minting.set(e, r), r);
    }
    async mintOnce(e) {
      let t = this.token(),
        n = this.refreshDue(t) ? t : null;
      if ((n !== null && (t = await this.refreshAhead(n)), t === null))
        return { kind: "unavailable" };
      let r = await this.door.subscribe(e, t, n === null ? cn : ln);
      if (
        r !== null &&
        r.status === 401 &&
        t === void 0 &&
        this.deps.onUnauthorized !== void 0
      ) {
        if ((await this.deps.onUnauthorized().catch(() => void 0), this.closed))
          return { kind: "unavailable" };
        r = await this.door.subscribe(e, void 0, ln);
      } else if (
        r !== null &&
        (r.status === 403 || r.status === 401) &&
        t !== void 0 &&
        r.env === null
      ) {
        if (
          this.closed ||
          (await this.deps.onAuthStale?.().catch(() => void 0), this.closed)
        )
          return { kind: "unavailable" };
        let n = this.token();
        n != null && n !== t && (r = await this.door.subscribe(e, n, ln));
      }
      if (r === null) return { kind: "unavailable" };
      let i = r.env?.code ?? null;
      if (
        r.gone ||
        (r.status === 404 && i === null && this.statusCode(404) === "revoked")
      )
        return { kind: "revoked" };
      if (!r.ok)
        return {
          kind:
            (i === null ? this.statusCode(r.status) : Zt(i)) ===
            "invalid_argument"
              ? "rejected"
              : "unavailable",
        };
      let a = r.malformed ? null : (r.result ?? null);
      return typeof a != "object" ||
        !a ||
        typeof a.grant != "string" ||
        a.grant === ""
        ? { kind: "unavailable" }
        : {
            kind: "ok",
            grant: a.grant,
            spec: a.spec,
            expiresIn: typeof a.expires_in == "number" ? a.expires_in : 0,
          };
    }
    token() {
      return this.deps.token === void 0 ? void 0 : this.deps.token();
    }
    now() {
      return this.deps.now?.() ?? Date.now();
    }
    refreshDue(e) {
      return (
        typeof e == "string" &&
        this.deps.onAuthStale !== void 0 &&
        !(this.ahead?.token === e && this.ahead.settled) &&
        Pn(e, this.now())
      );
    }
    async refreshAhead(e) {
      if (this.ahead?.token !== e) {
        let t = { token: e, settled: !1, done: Promise.resolve() };
        ((t.done = (this.deps.onAuthStale?.() ?? Promise.resolve())
          .then(Xn, Xn)
          .then(() => {
            t.settled = !0;
            let n = this.token();
            typeof n == "string" &&
              n !== e &&
              Pn(n, this.now()) &&
              (t.token = n);
          })),
          (this.ahead = t));
      }
      return (
        await this.ahead.done,
        this.closed ? null : (this.token() ?? null)
      );
    }
    statusCode(e) {
      let t = Yt(e);
      return t === "revoked" ? (this.deps.bareNotFound ?? "revoked") : t;
    }
  },
  or = class {
    nextToken = 1;
    pending = new Map();
    get hasPending() {
      return this.pending.size > 0;
    }
    get hasConfirmed() {
      for (let e of this.pending.values())
        if (e.confirmedV !== void 0) return !0;
      return !1;
    }
    stage(e, t, n, r) {
      let i = this.nextToken++;
      return (
        this.pending.set(i, {
          token: i,
          id: e,
          kind: t,
          data: n,
          stagedUid: r,
        }),
        i
      );
    }
    confirm(e, t, n) {
      let r = this.pending.get(e);
      r !== void 0 && ((r.confirmedV = t), (r.confirmedAt = n));
    }
    reject(e) {
      this.pending.delete(e);
    }
    awaiting(e) {
      return this.pending.get(e)?.confirmedV !== void 0;
    }
    noteRemoved(e) {
      for (let t of this.pending.values()) t.id === e && (t.removedSince = !0);
    }
    noteAuthoritative(e) {
      for (let t of this.pending.values())
        t.confirmedAt !== void 0 && t.confirmedAt < e && (t.caughtUp = !0);
    }
    absorb(e) {
      let t = [];
      for (let [n, r] of this.pending) {
        if (r.confirmedV === void 0) continue;
        let i = e(r.id),
          a = i !== void 0 && r.stagedUid !== void 0 && !vt(r.stagedUid, i.uid);
        (r.caughtUp === !0 ||
          (r.kind === "delete"
            ? i === void 0 || a
            : (i !== void 0 && (i.v >= r.confirmedV || a)) ||
              (i === void 0 &&
                (r.stagedUid !== void 0 || r.removedSince === !0)))) &&
          (this.pending.delete(n), t.push(r.id));
      }
      return t;
    }
    stages(e) {
      for (let t of this.pending.values()) if (t.id === e) return !0;
      return !1;
    }
    view(e, t) {
      let n = e.map((e) => ({ ...e, pending: !1 }));
      for (let e of this.pending.values()) {
        let t = n.findIndex((t) => t.id === e.id);
        if (e.kind === "delete") {
          t !== -1 && n.splice(t, 1);
          continue;
        }
        if (t === -1) {
          e.kind !== "update" &&
            n.push({ id: e.id, uid: "", v: 0, data: e.data, pending: !0 });
          continue;
        }
        let r = n[t].data,
          i =
            e.kind === "update" && mr(r) && mr(e.data) ? sr(r, e.data) : e.data;
        n[t] = { ...n[t], data: i, pending: !0 };
      }
      return (t !== void 0 && n.sort(t), n);
    }
  };
function sr(e, t) {
  return lr(e, t, !1);
}
function cr(e, t) {
  return lr(e, t, !0);
}
function lr(e, t, n) {
  let r = { ...e };
  for (let [e, i] of Object.entries(t)) {
    if (!n && ur(i)) {
      delete r[e];
      continue;
    }
    let t = Object.prototype.hasOwnProperty.call(r, e) ? r[e] : void 0,
      a = i;
    (pr(i) && ((a = lr(pr(t) ? t : {}, i, n)), !pr(t) && dr(a) && !dr(i))) ||
      Object.defineProperty(r, e, {
        value: a,
        writable: !0,
        enumerable: !0,
        configurable: !0,
      });
  }
  return r;
}
function ur(e) {
  if (!mr(e)) return !1;
  let t = Object.keys(e);
  return t.length === 1 && t[0] === "__delete__" && e.__delete__ === !0;
}
function dr(e) {
  return mr(e) && Object.keys(e).length === 0;
}
function fr(e) {
  return !dr(e) && dr(sr({}, e));
}
function pr(e) {
  if (!mr(e) || ur(e)) return !1;
  let t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function mr(e) {
  return typeof e == "object" && !!e && !Array.isArray(e);
}
var hr = /^[A-Za-z0-9_\-.~:@+]+$/,
  gr = 200,
  _r = 1e3,
  vr = 16,
  yr = 262144,
  br = 32,
  xr = { maxStreams: 64, maxFilters: 10, maxLimit: 1e3 },
  Sr = Object.assign(Object.create(null), {
    "==": "eq",
    "!=": "ne",
    "<": "lt",
    "<=": "lte",
    ">": "gt",
    ">=": "gte",
    in: "in",
    "not-in": "not-in",
    "array-contains": "array-contains",
  }),
  Cr = new Set(["in", "not-in"]),
  wr = 30;
function K(e, t) {
  let n = t === "doc" ? "document" : "collection";
  if (typeof e != "string" || e.length === 0)
    return W("invalid_argument", `A ${n} path must be a non-empty string.`);
  let r = new TextEncoder().encode(e).length;
  if (r > _r)
    return W(
      "invalid_argument",
      `A path is at most ${_r} bytes; this one is ${r}.`,
    );
  let i = e.split("/");
  if (i.some((e) => e.length === 0))
    return W(
      "invalid_argument",
      "A path has an empty segment (a leading, trailing, or doubled '/').",
    );
  let a = i.length;
  if (a > vr)
    return W(
      "invalid_argument",
      `A path has at most ${vr} segments; this one has ${a}.`,
    );
  if (t === "doc" && a % 2 != 0)
    return W(
      "invalid_argument",
      `A document path has an even number of segments (collection/id pairs); this one has ${a}, which is a collection path.`,
    );
  if (t === "collection" && a % 2 != 1)
    return W(
      "invalid_argument",
      `A collection path has an odd number of segments; this one has ${a}, which is a document path.`,
    );
  for (let e of i) {
    if (e === "." || e === "..")
      return W("invalid_argument", "A path segment cannot be '.' or '..'.");
    let t = new TextEncoder().encode(e).length;
    if (t > gr)
      return W(
        "invalid_argument",
        `A path segment is at most ${gr} bytes; one here is ${t}.`,
      );
    if (!hr.test(e))
      return W(
        "invalid_argument",
        "Path segments use only letters, digits, and _ - . ~ : @ + characters.",
      );
  }
  return e;
}
function Tr(e) {
  if (typeof e != "object" || !e || Array.isArray(e))
    return W("invalid_argument", "A document body must be a plain object.");
  let t;
  try {
    t = new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return W("invalid_argument", "A document body must be JSON-serializable.");
  }
  return t > yr
    ? W("invalid_argument", "The document body exceeds the size limit.")
    : Dr(e, br)
      ? W("invalid_argument", "The document body nests too deeply.")
      : t;
}
function Er(e) {
  let t = Tr(e);
  return typeof t == "number" ? null : t;
}
function Dr(e, t) {
  if (typeof e != "object" || !e || ur(e)) return !1;
  if (t === 0) return !0;
  for (let n of Array.isArray(e) ? e : Object.values(e))
    if (Dr(n, t - 1)) return !0;
  return !1;
}
function Or(e) {
  return typeof e == "string" &&
    e.length > 0 &&
    e.length <= gr &&
    !e.includes(".")
    ? e
    : null;
}
function kr(e, t) {
  let n = K(e.collection, "collection");
  if (typeof n != "string") return n;
  let r = { kind: "query", c: n };
  if (e.where !== void 0) {
    if (!Array.isArray(e.where) || e.where.length > t.maxFilters)
      return W("invalid_argument", "Too many filters.");
    let n = [];
    for (let t of e.where) {
      let e = jr(t);
      if (e === null) return W("invalid_argument", "Invalid filter.");
      n.push(e);
    }
    n.length > 0 && (r.w = n);
  }
  if (e.orderBy !== void 0) {
    let t = Mr(e.orderBy);
    if (t === null) return W("invalid_argument", "Invalid orderBy.");
    r.o = t;
  }
  if (e.limit !== void 0) {
    if (
      typeof e.limit != "number" ||
      !Number.isInteger(e.limit) ||
      e.limit < 1 ||
      e.limit > t.maxLimit
    )
      return W("invalid_argument", "Invalid limit.");
    r.l = e.limit;
  }
  return r;
}
function Ar(e) {
  let t = K(e, "doc");
  return typeof t == "string" ? { kind: "doc", c: t } : t;
}
function jr(e) {
  if (typeof e != "object" || !e) return null;
  let t = e,
    n = Or(t.f);
  if (n === null || typeof t.op != "string") return null;
  let r = Sr[t.op];
  return r === void 0 ||
    (Cr.has(r) && (!Array.isArray(t.v) || t.v.length === 0 || t.v.length > wr))
    ? null
    : { field: n, op: r, value: t.v };
}
function Mr(e) {
  if (typeof e != "object" || !e) return null;
  let t = e,
    n = Or(t.f);
  return n === null ||
    n.startsWith("-") ||
    (t.dir !== "asc" && t.dir !== "desc")
    ? null
    : { f: n, dir: t.dir };
}
function Nr(e) {
  return JSON.stringify({
    kind: e.kind,
    c: e.c,
    ...(e.w === void 0
      ? {}
      : { w: e.w.map((e) => ({ field: e.field, op: e.op, value: e.value })) }),
    ...(e.o === void 0 ? {} : { o: { f: e.o.f, dir: e.o.dir } }),
    ...(e.l === void 0 ? {} : { l: e.l }),
  });
}
var Pr = (e, t) => (e.id < t.id ? -1 : +(e.id > t.id));
function Fr(e) {
  if (e.kind === "doc") return;
  let t = e.o;
  if (t === void 0) return Pr;
  let n = t.dir === "desc" ? -1 : 1;
  return (e, r) => {
    let i = Ir(e.data, t.f),
      a = Ir(r.data, t.f);
    if ((i === void 0) != (a === void 0)) return i === void 0 ? 1 : -1;
    let o = Lr(i, a);
    return o === 0 ? Pr(e, r) : o * n;
  };
}
function Ir(e, t) {
  if (!(typeof e != "object" || !e || Array.isArray(e)))
    return Object.hasOwn(e, t) ? e[t] : void 0;
}
function Lr(e, t) {
  let n = zr(e),
    r = zr(t);
  return n === r
    ? typeof e == "number" && typeof t == "number"
      ? e === t
        ? 0
        : e < t
          ? -1
          : 1
      : typeof e == "string" && typeof t == "string"
        ? Rr(e, t)
        : typeof e == "boolean" && typeof t == "boolean"
          ? e === t
            ? 0
            : e
              ? 1
              : -1
          : 0
    : n - r;
}
function Rr(e, t) {
  let n = Math.min(e.length, t.length);
  for (let r = 0; r < n; r++) {
    let n = e.charCodeAt(r),
      i = t.charCodeAt(r);
    if (n !== i)
      return (
        n >= 55296 &&
          i >= 55296 &&
          ((n += n < 57344 ? 8192 : -2048), (i += i < 57344 ? 8192 : -2048)),
        n < i ? -1 : 1
      );
  }
  return e.length - t.length;
}
function zr(e) {
  return e === null
    ? 0
    : typeof e == "boolean"
      ? 1
      : typeof e == "number"
        ? 2
        : typeof e == "string"
          ? 3
          : 4;
}
var Br = 999,
  Vr = class {
    byName = new Map();
    get count() {
      return this.byName.size;
    }
    mint(e, t = 64) {
      if (this.byName.size >= t) return null;
      for (let t = 0; t <= Br; t++) {
        let n = "db." + t;
        if (!this.byName.has(n)) {
          let t = { name: n, specKey: e };
          return (this.byName.set(n, t), t);
        }
      }
      return null;
    }
    has(e) {
      return this.byName.has(e);
    }
    get(e) {
      return this.byName.get(e);
    }
    release(e) {
      this.byName.delete(e);
    }
    all() {
      return [...this.byName.values()];
    }
    clear() {
      this.byName.clear();
    }
  };
function Hr(e, t) {
  return (
    (e === "no_fence" && (t === "open" || t === "live")) ||
    (e === "opened_timeout" && t === "opening")
  );
}
var Ur = 4e3,
  Wr = 3e4,
  Gr = 500,
  Kr = 1e3,
  qr = 3e4,
  Jr = 6,
  Yr = 5e3,
  Xr = 3e4,
  Zr = 3e5,
  Qr = new TextEncoder();
function $r(e, t, n) {
  try {
    return Qr.encode(JSON.stringify({ kind: e, slug: t, payload: n })).length;
  } catch {
    return 1 / 0;
  }
}
var ei = class {
  deps;
  table = new Vr();
  recs = new Map();
  laneDb = !1;
  laneSuspect = !1;
  rateHoldUntil = 0;
  rateHoldRung = 0;
  rateHoldSpan = 0;
  lastRateAt = -1 / 0;
  socketGen = 0;
  resumeArmed = !1;
  stopped = !1;
  unsubs = [];
  constructor(e) {
    ((this.deps = e),
      this.unsubs.push(
        e.sync.onLaneCtrl((e) => this.onLaneCtrl(e)),
        e.sync.onDown(() => this.onDown()),
      ));
    let t = At(e.sync.currentJoined());
    this.laneDb = t !== null && t.stores.includes("db");
  }
  addStream(e) {
    if (this.stopped) return null;
    let t = this.table.mint(e);
    if (t === null) return null;
    let n = {
      name: t.name,
      specKey: e,
      state: "demoted",
      parked: !1,
      grantRetried: !1,
      rateRetries: 0,
      transientRetries: 0,
      resuming: !1,
      openSentAt: 0,
      openedTimer: null,
      fenceTimer: null,
      retryTimer: null,
    };
    return (
      this.recs.set(n.name, n),
      this.canOpen()
        ? this.beginOpen(n)
        : this.demote(
            n,
            this.blockedReason(),
            !0,
            this.deps.resumeFromPos === !0,
          ),
      { name: n.name, close: () => this.closeStream(n) }
    );
  }
  abortStream(e, t) {
    let n = this.recs.get(e);
    n === void 0 ||
      this.stopped ||
      n.state === "demoted" ||
      ((n.state === "opening" || n.state === "open" || n.state === "live") &&
        !Hr(t, n.state) &&
        this.deps.sync.sendCtrl(Ot, Lt(n.name)),
      this.demote(n, t));
  }
  noteFence(e) {
    let t = this.recs.get(e);
    t !== void 0 &&
      t.state === "open" &&
      ((t.state = "live"),
      (t.transientRetries = 0),
      this.clearTimers(t),
      t.resuming || this.deps.metrics.fenceLatency(Date.now() - t.openSentAt));
  }
  stop() {
    this.stopped = !0;
    for (let e of Array.from(this.recs.values())) this.closeStream(e);
    for (let e of this.unsubs) e();
  }
  canOpen() {
    return (
      this.laneDb &&
      this.deps.bootStream &&
      !this.laneSuspect &&
      !this.rateHeld()
    );
  }
  rateHeld() {
    return Date.now() < this.rateHoldUntil;
  }
  blockedReason() {
    return this.deps.bootStream
      ? this.laneDb
        ? this.laneSuspect
          ? "opened_timeout"
          : "denied_rate"
        : this.deps.sync.currentJoined() === null
          ? "no_joined"
          : "no_lane_db"
      : "boot_stream_false";
  }
  onLaneCtrl(e) {
    if (!this.stopped)
      switch (e.kind) {
        case wt:
          this.onJoined(e.payload);
          return;
        case Tt: {
          let t = Ft(e.payload);
          t !== null && this.onOpened(t.stream);
          return;
        }
        case Dt: {
          let t = Pt(e.payload);
          t !== null && this.onDenied(t.stream, t.reason);
          return;
        }
        case Et: {
          let t = Pt(e.payload);
          t !== null && this.onReset(t.stream);
          return;
        }
        default:
          return;
      }
  }
  onJoined(e) {
    let t = At(e);
    if (
      ((this.laneDb = t !== null && t.stores.includes("db")),
      (this.rateHoldUntil = 0),
      !this.canOpen())
    ) {
      this.resumeArmed = !1;
      return;
    }
    let n = [];
    for (let e of this.recs.values())
      e.state === "demoted" && !e.parked && n.push(e);
    if (this.resumeArmed && n.length > 0) {
      ((this.resumeArmed = !1), this.resumeAll(n));
      return;
    }
    this.resumeArmed = !1;
    for (let e of n) this.beginOpen(e);
  }
  async resumeAll(e) {
    let t = this.socketGen,
      n = (this.deps.resumeJitterMs ?? Gr) * Math.random();
    if (
      (await new Promise((e) => setTimeout(e, n)),
      t !== this.socketGen || this.stopped)
    )
      return;
    let r = e.filter(
        (e) => this.recs.get(e.name) === e && e.state === "demoted",
      ),
      i = await Promise.all(
        r.map(async (e) => ({ rec: e, m: await this.deps.mint(e.specKey) })),
      );
    if (t !== this.socketGen || this.stopped) return;
    let a = this.rateHeld(),
      o = [],
      s = [];
    for (let { rec: e, m: t } of i) {
      if (this.recs.get(e.name) !== e || e.state !== "demoted") continue;
      if (t.kind === "revoked") {
        this.deps.onStopped();
        return;
      }
      if (t.kind !== "ok") {
        this.demoteOnMint(e, t.kind);
        continue;
      }
      if (a) {
        this.demote(e, "denied_rate", !0, !0);
        continue;
      }
      let n = this.deps.posFor(e.specKey, e.name);
      ((e.resuming = n !== null),
        o.push({ stream: e.name, grant: t.grant, spec: t.spec, since: n }),
        s.push(e));
    }
    if (o.length !== 0) {
      for (let e of o)
        e.since === null && this.deps.codec.onStreamOpening?.(e.stream);
      if (this.deps.sync.sendCtrl("ctrl:resume", U(o))) {
        for (let e of s) this.markOpening(e);
        return;
      }
      if (this.deps.sync.currentJoined() === null) {
        for (let e of s) this.demote(e, "socket_down");
        return;
      }
      o.forEach((e, t) => this.sendOpen(s[t], e));
    }
  }
  sendOpen(e, t) {
    let n = It(t);
    if ($r("ctrl:open", this.deps.slug, n) > 65536) {
      ((e.parked = !0), this.demote(e, "send_too_large"));
      return;
    }
    if (
      (t.since === null && this.deps.codec.onStreamOpening?.(e.name),
      this.deps.sync.sendCtrl("ctrl:open", n))
    ) {
      this.markOpening(e);
      return;
    }
    this.demote(e, "socket_down");
  }
  beginOpen(e) {
    let t = this.socketGen;
    ((e.state = "minting"),
      this.deps.mint(e.specKey).then((n) => {
        if (
          t !== this.socketGen ||
          this.stopped ||
          this.recs.get(e.name) !== e ||
          e.state !== "minting"
        )
          return;
        if (n.kind === "revoked") {
          this.deps.onStopped();
          return;
        }
        if (n.kind !== "ok") {
          this.demoteOnMint(e, n.kind);
          return;
        }
        if (this.rateHeld()) {
          this.demote(e, "denied_rate", !0, this.deps.resumeFromPos === !0);
          return;
        }
        let r = this.deps.posFor(e.specKey, e.name);
        ((e.resuming = r !== null),
          this.sendOpen(e, {
            stream: e.name,
            grant: n.grant,
            spec: n.spec,
            since: r,
          }));
      }));
  }
  markOpening(e) {
    ((e.state = "opening"),
      (e.openSentAt = Date.now()),
      this.clearTimers(e),
      (e.openedTimer = setTimeout(() => {
        ((this.laneSuspect = !0), this.demote(e, "opened_timeout"));
      }, this.deps.openedTimeoutMs ?? Ur)));
  }
  onOpened(e) {
    let t = this.recs.get(e);
    if (t === void 0 || t.state === "demoted") {
      this.deps.sync.sendCtrl(Ot, Lt(e));
      return;
    }
    if (t.state === "opening") {
      if (
        ((t.state = "open"),
        (t.rateRetries = 0),
        (this.laneSuspect = !1),
        this.clearTimers(t),
        this.deps.codec.onStreamOpened(e),
        this.deps.onStreamMode(t.name, "stream"),
        this.deps.metrics.mode("stream"),
        t.resuming)
      ) {
        this.deps.onResumed(e);
        return;
      }
      t.fenceTimer = setTimeout(() => {
        (this.deps.metrics.streamNoFence(), this.demote(t, "no_fence"));
      }, this.deps.fenceTimeoutMs ?? Wr);
    }
  }
  onDenied(e, t) {
    let n = Nt(t);
    n === "RATE" && this.holdSocket();
    let r = this.recs.get(e);
    if (r !== void 0) {
      if (n === "GRANT" && !r.grantRetried && !r.parked) {
        ((r.grantRetried = !0),
          this.clearTimers(r),
          (r.state = "demoted"),
          this.beginOpen(r));
        return;
      }
      if (n === "RATE" && !r.parked) {
        this.demote(r, "denied_rate");
        return;
      }
      (n === "DENIED" && (r.parked = !0), this.demote(r, "denied"));
    }
  }
  ensureRetry(e, t = !1) {
    this.stopped ||
      this.recs.get(e.name) !== e ||
      e.state !== "demoted" ||
      e.parked ||
      e.retryTimer !== null ||
      !this.laneDb ||
      !this.deps.bootStream ||
      (t && this.armRateRetry(e)) ||
      this.armTransientRetry(e);
  }
  armRateRetry(e) {
    return e.rateRetries >= (this.deps.rateRetryMax ?? Jr)
      ? !1
      : (this.armRetry(e, this.rateDelay(e.rateRetries++), !0), !0);
  }
  rateDelay(e) {
    let t = this.deps.rateRetryBaseMs ?? Kr,
      n = this.deps.rateRetryCapMs ?? qr,
      r = Math.min(n, t * 2 ** Math.min(e, 30));
    return r / 2 + (Math.random() * r) / 2;
  }
  holdSocket() {
    let e = Date.now(),
      t = this.deps.rateHoldForgetMs ?? Yr;
    (e - this.lastRateAt > Math.max(t, 2 * this.rateHoldSpan) &&
      (this.rateHoldRung = 0),
      (this.lastRateAt = e),
      !(e < this.rateHoldUntil) &&
        ((this.rateHoldSpan = this.rateDelay(this.rateHoldRung++)),
        (this.rateHoldUntil = e + this.rateHoldSpan)));
  }
  armTransientRetry(e) {
    let t = e.transientRetries++,
      n = this.deps.transientRetryBaseMs ?? Xr,
      r = this.deps.transientRetryCapMs ?? Zr,
      i = Math.min(r, n * 2 ** Math.min(t, 16));
    this.armRetry(e, i / 2 + (Math.random() * i) / 2, !1);
  }
  armRetry(e, t, n) {
    let r = this.socketGen;
    e.retryTimer = setTimeout(() => {
      if (
        ((e.retryTimer = null),
        r !== this.socketGen ||
          this.stopped ||
          this.recs.get(e.name) !== e ||
          e.state !== "demoted" ||
          e.parked)
      )
        return;
      if (!this.laneDb || !this.deps.bootStream || (n && this.laneSuspect)) {
        this.ensureRetry(e);
        return;
      }
      let t = this.rateHoldUntil - Date.now();
      if (t > 0) {
        let r = (this.deps.resumeJitterMs ?? Gr) * Math.random();
        this.armRetry(e, t + r, n);
        return;
      }
      this.beginOpen(e);
    }, t);
  }
  onReset(e) {
    let t = this.recs.get(e);
    if (t === void 0) return;
    (this.deps.codec.onStreamClosed(e),
      this.deps.onStreamReset(t.name),
      this.deps.clearPos(t.specKey, t.name));
    let n = !t.parked && this.canOpen();
    (this.demote(t, "server_reset", !1),
      n ? this.beginOpen(t) : this.ensureRetry(t, this.rateHeld()));
  }
  onDown() {
    (this.socketGen++,
      (this.laneSuspect = !1),
      (this.rateHoldUntil = 0),
      (this.rateHoldRung = 0),
      (this.rateHoldSpan = 0),
      (this.laneDb = !1),
      (this.resumeArmed = !0));
    for (let e of this.recs.values()) {
      if (
        ((e.rateRetries = 0), (e.transientRetries = 0), e.state === "demoted")
      ) {
        this.clearTimers(e);
        continue;
      }
      (this.deps.codec.onStreamClosed(e.name), this.demote(e, "socket_down"));
    }
  }
  demoteOnMint(e, t) {
    if (t === "rejected") {
      ((e.parked = !0), this.demote(e, "mint_rejected"));
      return;
    }
    this.demote(e, "mint_unavailable");
  }
  demote(e, t, n = !0, r = !1) {
    this.clearTimers(e);
    let i = e.state === "open" || e.state === "live";
    (Hr(t, e.state) && this.deps.sync.sendCtrl(Ot, Lt(e.name)),
      i && this.deps.codec.onStreamClosed(e.name),
      (e.state = "demoted"),
      (e.grantRetried = !1),
      r || this.deps.clearPos(e.specKey, e.name),
      this.deps.onStreamMode(e.name, "poll"),
      this.deps.metrics.demote(t),
      this.deps.metrics.mode("poll"),
      n && this.ensureRetry(e, t === "denied_rate"));
  }
  closeStream(e) {
    (this.clearTimers(e),
      (e.state === "opening" || e.state === "open" || e.state === "live") &&
        (this.deps.sync.sendCtrl(Ot, Lt(e.name)),
        this.deps.codec.onStreamClosed(e.name)),
      this.recs.delete(e.name),
      this.table.release(e.name));
  }
  clearTimers(e) {
    (e.openedTimer !== null && clearTimeout(e.openedTimer),
      e.fenceTimer !== null && clearTimeout(e.fenceTimer),
      e.retryTimer !== null && clearTimeout(e.retryTimer),
      (e.openedTimer = null),
      (e.fenceTimer = null),
      (e.retryTimer = null));
  }
};
function ti(e, t) {
  return "fsdb:pos:" + e + ":" + q(t);
}
function q(e) {
  let t = 3735928559 ^ e.length,
    n = 1103547991 ^ e.length;
  for (let r = 0; r < e.length; r++) {
    let i = e.charCodeAt(r);
    ((t = Math.imul(t ^ i, 2654435761)), (n = Math.imul(n ^ i, 1597334677)));
  }
  return (
    (t =
      Math.imul(t ^ (t >>> 16), 2246822507) ^
      Math.imul(n ^ (n >>> 13), 3266489909)),
    (n =
      Math.imul(n ^ (n >>> 16), 2246822507) ^
      Math.imul(t ^ (t >>> 13), 3266489909)),
    (4294967296 * (2097151 & n) + (t >>> 0)).toString(36) +
      "." +
      e.length.toString(36)
  );
}
var ni = class {
    slug;
    storage;
    mem = new Map();
    storageOk = !0;
    constructor(e, t) {
      ((this.slug = e), (this.storage = t));
    }
    get(e) {
      let t = ti(this.slug, e),
        n = this.mem.get(t);
      if (n !== void 0) return n;
      let r = this.read(t);
      return (r !== null && this.mem.set(t, r), r);
    }
    record(e, t) {
      let n = ti(this.slug, e);
      (this.mem.set(n, t), this.write(n, t));
    }
    clear(e) {
      let t = ti(this.slug, e);
      (this.mem.delete(t), this.remove(t));
    }
    read(e) {
      if (!this.storageOk || this.storage === null) return null;
      try {
        return this.storage.getItem(e);
      } catch {
        return ((this.storageOk = !1), null);
      }
    }
    write(e, t) {
      if (!(!this.storageOk || this.storage === null))
        try {
          this.storage.setItem(e, t);
        } catch {
          this.storageOk = !1;
        }
    }
    remove(e) {
      if (!(!this.storageOk || this.storage === null))
        try {
          this.storage.removeItem(e);
        } catch {
          this.storageOk = !1;
        }
    }
  },
  ri = "frame-db-cache",
  ii = "subs",
  ai = "frame-db-outbox",
  oi = "rows",
  si = 6048e5,
  ci = 4194304,
  li = "s:",
  ui = "o:",
  di = "__oseq:",
  fi = 16,
  pi = "__meta",
  mi = "__wipedAt",
  hi = "__viewer",
  gi = 36e5,
  _i = 6e4,
  vi = 9e5,
  yi = new TextEncoder(),
  bi = class extends Error {
    constructor() {
      (super("outbox full"), e(this, "outbox full"));
    }
  };
function xi(e, t, n) {
  return !t || t === "-" || !n ? null : `${e ?? "-"}:${t}:${n}:`;
}
function Si(e, t) {
  return !t || t === "-" ? null : `${e ?? "-"}:${t}`;
}
function J(e, t) {
  return li + e + q(t);
}
function Ci(e) {
  let t = e;
  return (
    !!t &&
    typeof t == "object" &&
    typeof t.id == "string" &&
    typeof t.uid == "string" &&
    typeof t.v == "number"
  );
}
function wi(e) {
  let t = e;
  return (
    !!t &&
    typeof t == "object" &&
    typeof t.specKey == "string" &&
    Array.isArray(t.entries) &&
    (t.pos === null || typeof t.pos == "string") &&
    (t.posAt === null || typeof t.posAt == "number") &&
    typeof t.size == "number" &&
    typeof t.savedAt == "number" &&
    typeof t.expiresAt == "number" &&
    typeof t.lastUsed == "number"
  );
}
function Ti(e) {
  let t = e;
  return (
    !!t &&
    typeof t == "object" &&
    typeof t.seq == "number" &&
    typeof t.owner == "string" &&
    typeof t.idem == "string" &&
    (t.verb === "set" || t.verb === "update" || t.verb === "delete") &&
    typeof t.path == "string" &&
    typeof t.enqueuedAt == "number" &&
    typeof t.size == "number" &&
    (t.failures === void 0 || typeof t.failures == "number") &&
    (t.firstFailedAt === void 0 || typeof t.firstFailedAt == "number")
  );
}
function Ei(e, t) {
  return ui + e + String(t).padStart(fi, "0");
}
var Di = typeof indexedDB > "u",
  Oi = new Map(),
  ki = 0;
function Ai(e, t) {
  let n = Oi.get(e);
  if (n) {
    if (n.savedAt > t.savedAt) return;
    ki -= n.size;
  }
  if ((Oi.set(e, t), (ki += t.size), ki <= 8388608)) return;
  let r = [...Oi.entries()].sort((e, t) => e[1].lastUsed - t[1].lastUsed);
  for (let [e, t] of r) {
    if (ki <= 8388608) break;
    (Oi.delete(e), (ki -= t.size));
  }
}
function ji(e, t, n) {
  let r = Oi.get(e);
  return r
    ? r.expiresAt <= n
      ? (Oi.delete(e), (ki -= r.size), null)
      : r.specKey === t
        ? ((r.lastUsed = n), r)
        : null
    : null;
}
function Mi(e) {
  let t = Oi.get(e);
  t && (Oi.delete(e), (ki -= t.size));
}
function Ni(e) {
  for (let [t, n] of Oi) t.startsWith(e) && (Oi.delete(t), (ki -= n.size));
}
var Pi = { name: ri, store: ii, dbp: null, closedByVersionChange: !1 },
  Fi = { name: ai, store: oi, dbp: null, closedByVersionChange: !1 };
function Ii(e) {
  return (
    (e.dbp ??= new Promise((n, r) => {
      let i = indexedDB.open(e.name, 1),
        a = !1;
      ((i.onupgradeneeded = () => {
        i.result.objectStoreNames.contains(e.store) ||
          ((a = !0), i.result.createObjectStore(e.store));
      }),
        (i.onsuccess = () => {
          let t = i.result;
          if (a && e.closedByVersionChange) {
            na += 1;
            try {
              t.transaction(e.store, "readwrite")
                .objectStore(e.store)
                .put({ at: Date.now() }, mi);
            } catch {}
          }
          ((e.closedByVersionChange = !1),
            (t.onversionchange = () => {
              ((e.closedByVersionChange = !0), t.close(), (e.dbp = null));
            }),
            (t.onclose = () => {
              ((e.closedByVersionChange = !0), (e.dbp = null));
            }),
            n(t));
        }),
        (i.onerror = () => {
          ((e.dbp = null),
            r(
              i.error ??
                t(
                  Error("indexedDB open failed"),
                  "indexedDB open failed",
                  "literal",
                ),
            ));
        }));
    })),
    e.dbp
  );
}
function Li(e) {
  return new Promise((n, r) => {
    ((e.onsuccess = () => n(e.result)),
      (e.onerror = () =>
        r(e.error ?? t(Error("request failed"), "request failed", "literal"))));
  });
}
async function Ri(e, n, r) {
  let i = await Ii(e);
  return new Promise((a, o) => {
    let s,
      c = null,
      l = i.transaction(e.store, n);
    ((l.oncomplete = () => {
      c === null ? a(s) : o(c);
    }),
      (l.onabort = l.onerror =
        (e) => {
          let n = e?.target?.error ?? null;
          o(
            c ??
              n ??
              l.error ??
              t(Error("transaction failed"), "transaction failed", "literal"),
          );
        }),
      Promise.resolve()
        .then(() => r(l.objectStore(e.store)))
        .then(
          (e) => {
            s = e;
          },
          (e) => {
            c =
              e ??
              t(
                Error("transaction callback failed"),
                "transaction callback failed",
                "literal",
              );
            try {
              l.abort();
            } catch {}
          },
        ));
  });
}
async function zi(e) {
  let t = await Li(e.get(pi));
  return {
    total: typeof t?.total == "number" ? t.total : 0,
    count: typeof t?.count == "number" ? t.count : 0,
  };
}
async function Bi(e, t, n) {
  let r = await zi(e),
    i = { total: Math.max(0, r.total + t), count: Math.max(0, r.count + n) };
  return (await Li(e.put(i, pi)), i);
}
async function Vi(e, t, n) {
  let r = await Li(e.get(mi));
  return !!r && typeof r.at == "number" && (t <= r.at || r.at >= n);
}
async function Hi(e, t) {
  let n = await Li(e.get(hi));
  return n !== void 0 && !t.startsWith(`${String(n.v)}:`);
}
function Ui(e) {
  return e instanceof DOMException && e.name === "QuotaExceededError";
}
async function Wi(e, t, n, r, i, a, o) {
  return Ri(Pi, "readwrite", async (s) => {
    if (r !== na || i !== aa(e, t) || (await Vi(s, a, o)) || (await Hi(s, e)))
      return null;
    let c = await Li(s.get(t));
    if (typeof c?.savedAt == "number" && c.savedAt > n.savedAt) return null;
    await Li(s.put(n, t));
    let l = typeof c?.size == "number" ? c.size : 0;
    return (await Bi(s, n.size - l, +(c === void 0))).total;
  });
}
async function Gi() {
  await Ri(
    Pi,
    "readwrite",
    (e) =>
      new Promise((n, r) => {
        let i = Date.now(),
          a = [],
          o = e.openCursor();
        ((o.onerror = () =>
          r(o.error ?? t(Error("cursor failed"), "cursor failed", "literal"))),
          (o.onsuccess = () => {
            let t = o.result;
            if (t) {
              let e = t.key;
              if (typeof e == "string" && e.startsWith(li)) {
                let n = t.value;
                !wi(n) || n.expiresAt <= i
                  ? t.delete()
                  : a.push({ key: e, size: n.size, lastUsed: n.lastUsed });
              } else if (typeof e == "string" && e.startsWith(ui)) {
                let e = t.value;
                (!Ti(e) || e.enqueuedAt + 6048e5 <= i) && t.delete();
              } else
                e !== pi &&
                  e !== mi &&
                  e !== hi &&
                  !(typeof e == "string" && e.startsWith(di)) &&
                  t.delete();
              t.continue();
              return;
            }
            a.sort((e, t) => t.lastUsed - e.lastUsed);
            let r = 0,
              s = 0;
            for (let t of a)
              r + t.size <= 67108864
                ? ((r += t.size), (s += 1))
                : e.delete(t.key);
            (e.put({ total: r, count: s }, pi), n());
          }));
      }),
  );
}
async function Ki() {
  return Ri(
    Fi,
    "readwrite",
    (e) =>
      new Promise((n, r) => {
        let i = Date.now(),
          a = 0,
          o = IDBKeyRange.bound(ui, "o:\uFFFF"),
          s = e.openCursor(o);
        ((s.onerror = () =>
          r(s.error ?? t(Error("cursor failed"), "cursor failed", "literal"))),
          (s.onsuccess = () => {
            let e = s.result;
            if (!e) {
              n(a);
              return;
            }
            let t = e.value;
            (Ti(t)
              ? t.enqueuedAt + 6048e5 <= i && (e.delete(), a++)
              : e.delete(),
              e.continue());
          }));
      }),
  );
}
async function qi(e) {
  await Ri(
    Pi,
    "readwrite",
    (n) =>
      new Promise((r, i) => {
        let a = IDBKeyRange.bound(e, e + "\uFFFF"),
          o = 0,
          s = 0,
          c = n.openCursor(a);
        ((c.onerror = () =>
          i(c.error ?? t(Error("cursor failed"), "cursor failed", "literal"))),
          (c.onsuccess = () => {
            let e = c.result;
            if (e) {
              let t = e.value;
              ((o += typeof t?.size == "number" ? t.size : 0),
                (s += 1),
                e.delete(),
                e.continue());
              return;
            }
            if (s === 0) {
              r();
              return;
            }
            Bi(n, -o, -s)
              .then(() => r())
              .catch(i);
          }));
      }),
  );
}
async function Ji(e, t) {
  let n = Date.now(),
    r = J(e, t),
    i = (e) => {
      if (e === null) return null;
      let t = new Set();
      for (let n of e.entries) {
        if (!Ci(n) || t.has(n.id)) return null;
        t.add(n.id);
      }
      let r = e.pos !== null && e.posAt !== null && e.posAt + 6048e5 > n;
      return {
        entries: e.entries.map((e) => ({ ...e })),
        pos: r ? e.pos : null,
        posAt: r ? e.posAt : null,
        savedAt: e.savedAt,
        size: e.size,
      };
    };
  if (Di) return i(ji(r, t, n));
  let a;
  try {
    a = await Ri(Pi, "readonly", (e) => Li(e.get(r)));
  } catch {
    return ((Di = !0), i(ji(r, t, n)));
  }
  if (!wi(a)) return null;
  let o = a;
  return o.expiresAt <= n
    ? (Ri(Pi, "readwrite", async (e) => {
        let t = await Li(e.get(r));
        wi(t) &&
          t.expiresAt <= Date.now() &&
          (e.delete(r), await Bi(e, -t.size, -1));
      }).catch(() => void 0),
      null)
    : o.specKey === t
      ? (n - o.lastUsed >= gi &&
          Ri(Pi, "readwrite", async (e) => {
            let t = await Li(e.get(r));
            wi(t) && t.savedAt === o.savedAt && e.put({ ...t, lastUsed: n }, r);
          }).catch(() => void 0),
        i(o))
      : null;
}
async function Yi(e, t, n, r) {
  let i = na,
    a = J(e, t),
    o = aa(e, a),
    s;
  try {
    s =
      yi.encode(t).byteLength +
      yi.encode(JSON.stringify(n.entries)).byteLength +
      (n.pos === null ? 0 : yi.encode(n.pos).byteLength);
  } catch {
    return (await Xi(e, t), 0);
  }
  if (s > 4194304) return (await Xi(e, t), 0);
  let c = Date.now(),
    l = {
      specKey: t,
      entries: n.entries,
      pos: n.pos,
      posAt: n.pos === null ? null : n.posAt,
      size: s,
      savedAt: c,
      lastUsed: c,
      expiresAt: c + si,
    };
  if (!Di && c < ea) return null;
  if (!Di)
    try {
      let t = await Wi(e, a, l, i, o, r.observedAt, r.mountedAt);
      return (
        (ta = 0),
        t !== null && t > 67108864 && (await Gi()),
        t === null ? null : s
      );
    } catch (t) {
      if (Ui(t))
        try {
          await Gi();
          let t = await Wi(e, a, l, i, o, r.observedAt, r.mountedAt);
          return ((ta = 0), t === null ? null : s);
        } catch (e) {
          return (
            Ui(e) &&
              Date.now() >= ea &&
              ((ea = Date.now() + Math.min(vi, _i * 2 ** ta)), (ta += 1)),
            null
          );
        }
      Di = !0;
    }
  return i === na && o === aa(e, a) ? (Ai(a, l), s) : null;
}
async function Xi(e, t) {
  let n = J(e, t);
  if ((ra.set(n, (ra.get(n) ?? 0) + 1), Mi(n), !(typeof indexedDB > "u")))
    try {
      await Ri(Pi, "readwrite", async (e) => {
        let t = await Li(e.get(n));
        t &&
          (e.delete(n),
          await Bi(e, -(typeof t.size == "number" ? t.size : 0), -1));
      });
    } catch {
      Di = !0;
    }
}
async function Zi(e) {
  ia.set(e, (ia.get(e) ?? 0) + 1);
  let t = li + e;
  if ((Ni(t), !(typeof indexedDB > "u")))
    try {
      await qi(t);
    } catch {
      Di = !0;
    }
}
var Qi = !1;
async function $i() {
  if (Qi || typeof indexedDB > "u") return 0;
  Qi = !0;
  let [e, t] = await Promise.allSettled([Gi(), Ki()]);
  return (
    (e.status === "rejected" || t.status === "rejected") && (Di = !0),
    t.status === "fulfilled" ? t.value : 0
  );
}
var ea = 0,
  ta = 0,
  na = 0,
  ra = new Map(),
  ia = new Map();
function aa(e, t) {
  return (ra.get(t) ?? 0) + (ia.get(e) ?? 0);
}
async function oa() {
  ((na += 1), Oi.clear(), (ki = 0), da.clear());
  let e = Date.now() - 1;
  typeof indexedDB > "u" || (await Promise.allSettled([sa(Pi, e), sa(Fi, e)]));
}
async function sa(e, t) {
  try {
    await Ri(e, "readwrite", async (e) => {
      let n = await Li(e.get(mi)),
        r = typeof n?.at == "number" ? Math.max(n.at, t) : t;
      (e.clear(), e.put({ at: r }, mi));
    });
  } catch {
    ((Di = !0), ua(e));
  }
}
async function ca(e, t) {
  if (typeof indexedDB > "u") return;
  let n = !1,
    r = (e) => () => {
      (n || ((n = !0), (na += 1)), e());
    };
  await Promise.allSettled([
    la(
      Pi,
      e,
      t,
      r(() => {
        (Oi.clear(), (ki = 0));
      }),
    ),
    la(
      Fi,
      e,
      t,
      r(() => da.clear()),
    ),
  ]);
}
async function la(e, t, n, r) {
  try {
    await Ri(e, "readwrite", async (e) => {
      if ((await Li(e.get(hi)))?.v !== t) {
        let t = await Li(e.get(mi)),
          i = typeof t?.at == "number" ? Math.max(t.at, n - 1) : n - 1;
        (r(), e.clear(), e.put({ at: i }, mi));
      }
      e.put({ v: t }, hi);
    });
  } catch {
    ((Di = !0), ua(e));
  }
}
function ua(e) {
  try {
    let t = indexedDB.deleteDatabase(e.name),
      n = () => {
        try {
          let t = indexedDB.open(e.name, 1);
          ((t.onupgradeneeded = () => {
            try {
              t.result.createObjectStore(e.store);
            } catch {}
          }),
            (t.onerror = () => void 0),
            (t.onsuccess = () => {
              let n = t.result;
              try {
                let t = n.transaction(e.store, "readwrite"),
                  r = t.objectStore(e.store);
                (r.clear(), r.put({ at: Date.now() }, mi));
                let i = () => n.close();
                ((t.oncomplete = i), (t.onabort = i), (t.onerror = i));
              } catch {
                n.close();
              }
            }));
        } catch {}
      };
    ((t.onsuccess = n), (t.onerror = n));
  } catch {}
}
var da = new Map(),
  fa = 0;
function pa(e) {
  let t = da.get(e);
  return (t || ((t = []), da.set(e, t)), t);
}
function ma(e, t) {
  return (
    e.length + (t === void 0 ? 0 : yi.encode(JSON.stringify(t)).byteLength)
  );
}
function ha(e) {
  return e.size - e.path.length;
}
function ga(e) {
  return ma(e.path, e.data);
}
async function _a(e, n) {
  let r = Date.now();
  if (Di) return pa(e).slice();
  let i = [];
  try {
    let a = await Ri(
      Fi,
      "readwrite",
      (n) =>
        new Promise((a, o) => {
          let s = ui + e,
            c = IDBKeyRange.bound(s, s + "\uFFFF"),
            l = [],
            u = n.openCursor(c);
          ((u.onerror = () =>
            o(
              u.error ?? t(Error("cursor failed"), "cursor failed", "literal"),
            )),
            (u.onsuccess = () => {
              let e = u.result;
              if (e) {
                let t = e.value;
                (Ti(t)
                  ? t.enqueuedAt + 6048e5 <= r
                    ? (e.delete(), i.push(t))
                    : l.push(t)
                  : e.delete(),
                  e.continue());
                return;
              }
              l.sort((e, t) => e.seq - t.seq);
              for (let e of l) fa = Math.max(fa, e.seq);
              a(l);
            }));
        }),
    );
    return (i.length > 0 && n?.(i), a);
  } catch {
    return ((Di = !0), pa(e).slice());
  }
}
async function va(e, t, n, r, i, a) {
  return Ri(Fi, "readwrite", async (o) => {
    if (r !== na || (await Vi(o, Date.now(), a)) || (await Hi(o, e)))
      return null;
    let s = di + e,
      c = await Li(o.get(s)),
      l = Math.max(typeof c?.next == "number" ? c.next : 1, i + 1),
      u = { ...t, seq: l, size: n, enqueuedAt: Date.now() };
    return (
      await Li(o.put(u, Ei(e, l))),
      await Li(o.put({ next: l + 1 }, s)),
      (fa = Math.max(fa, l)),
      u
    );
  });
}
async function ya(e, t, n) {
  let r = ga(t);
  if (n.count + 1 > 1e3 || n.bytes + r > 8388608) throw new bi();
  let i = na;
  if (!Di && n.memoryOnly !== !0)
    try {
      let a = await va(e, t, r, i, n.minSeq, n.mountedAt);
      if (a !== null) return a;
    } catch (a) {
      if (Ui(a))
        try {
          await Promise.allSettled([Gi(), Ki()]);
          let a = await va(e, t, r, i, n.minSeq, n.mountedAt);
          if (a !== null) return a;
        } catch {}
      else Di = !0;
    }
  fa = Math.max(fa, n.minSeq) + 1;
  let a = { ...t, seq: fa, size: r, enqueuedAt: Date.now(), volatile: !0 };
  return (i === na && pa(e).push(a), a);
}
async function ba(e, t, n) {
  let r = { ...t, size: ga(t) };
  if (Di || t.volatile) {
    let n = pa(e),
      i = n.findIndex((e) => e.seq === t.seq);
    return i !== -1 && ((n[i] = r), !0);
  }
  try {
    return await Ri(Fi, "readwrite", async (i) => {
      let a = Ei(e, t.seq);
      return (await Vi(i, Date.now(), n)) ||
        (await Hi(i, e)) ||
        (await Li(i.get(a))) === void 0
        ? !1
        : (await Li(i.put(r, a)), !0);
    });
  } catch (e) {
    return (Ui(e) || (Di = !0), !1);
  }
}
async function xa(e, t, n) {
  if (Di || t.every((e) => e.volatile)) {
    let n = pa(e),
      r = t.map((e) => n.findIndex((t) => t.seq === e.seq));
    if (r.includes(-1)) return !1;
    for (let [e, i] of r.entries()) n[i] = t[e];
    return !0;
  }
  if (t.some((e) => e.volatile)) return !1;
  try {
    return await Ri(Fi, "readwrite", async (r) => {
      if ((await Vi(r, Date.now(), n)) || (await Hi(r, e))) return !1;
      for (let n of t)
        if ((await Li(r.get(Ei(e, n.seq)))) === void 0) return !1;
      for (let n of t) await Li(r.put(n, Ei(e, n.seq)));
      return !0;
    });
  } catch (e) {
    return (Ui(e) || (Di = !0), !1);
  }
}
async function Sa(e, t) {
  let n = t.filter((e) => e.volatile).map((e) => e.seq),
    r = da.get(e);
  r &&
    n.length > 0 &&
    da.set(
      e,
      r.filter((e) => !n.includes(e.seq)),
    );
  let i = t.filter((e) => !e.volatile).map((e) => e.seq);
  if (!(typeof indexedDB > "u" || i.length === 0))
    try {
      await Ri(Fi, "readwrite", (t) => {
        for (let n of i) t.delete(Ei(e, n));
      });
    } catch {
      Di = !0;
    }
}
function Ca(e, t) {
  return {
    load: (t) => Ji(e, t),
    save: (n, r, i) => Yi(e, n, r, { observedAt: i, mountedAt: t }),
    remove: (t) => Xi(e, t),
    removeAll: () => Zi(e),
  };
}
var wa = 2e3,
  Ta = 1e3,
  Ea = 3e4,
  Da = 4,
  Oa = 0.8,
  ka = 0.4,
  Aa = 3,
  ja = class {
    deps;
    mode = "poll";
    modeGen = 0;
    timer = null;
    dueAt = 0;
    inFlight = !1;
    rerunAfterFlight = !1;
    initialDelivered = !1;
    lastComplete = null;
    failures = 0;
    rateRefusals = 0;
    stopped = !1;
    lastRefillAt = -1 / 0;
    refillPending = !1;
    refillTimer = null;
    flightIsRefill = !1;
    prepaid = !1;
    discards = 0;
    unsubVisibility = null;
    constructor(e) {
      this.deps = e;
    }
    start() {
      ((this.unsubVisibility = this.deps.onVisibility(() =>
        this.onVisibilityFlip(),
      )),
        this.poll());
    }
    setMode(e) {
      this.stopped ||
        this.mode === e ||
        ((this.mode = e),
        this.modeGen++,
        (this.prepaid = !1),
        (this.discards = 0),
        (this.failures = 0),
        (this.rateRefusals = 0),
        (this.flightIsRefill = !1),
        (this.rerunAfterFlight = !1),
        this.clearTimer(),
        e === "poll" &&
          ((this.refillPending = !1),
          this.clearRefillTimer(),
          (this.initialDelivered = !1),
          (this.lastComplete = null),
          this.poll()));
    }
    noteOwnWrite() {
      this.stopped || this.mode !== "poll" || this.poll();
    }
    requestRefill() {
      if (!this.stopped) {
        if (this.rateRefusals > 0 && this.refillTimer !== null) {
          this.refillPending = !0;
          return;
        }
        ((this.discards = 0),
          (this.prepaid = !1),
          this.clearRefillTimer(),
          this.scheduleRefill());
      }
    }
    scheduleRefill() {
      if (this.stopped) return;
      let e = this.lastRefillAt + this.chainSpacingMs() - Date.now();
      if (this.inFlight || e > 0 || this.refillTimer !== null) {
        ((this.refillPending = !0),
          !this.inFlight &&
            this.refillTimer === null &&
            (this.refillTimer = setTimeout(() => {
              ((this.refillTimer = null), this.fireRefill());
            }, e)));
        return;
      }
      this.fireRefill();
    }
    stop() {
      ((this.stopped = !0),
        this.clearTimer(),
        this.clearRefillTimer(),
        this.unsubVisibility?.(),
        (this.unsubVisibility = null));
    }
    fireRefill() {
      if (this.inFlight) {
        this.refillPending = !0;
        return;
      }
      if (
        ((this.refillPending = !1), !(this.stopped || this.mode !== "stream"))
      ) {
        if (this.deps.needRefill !== void 0 && !this.deps.needRefill()) {
          ((this.prepaid = !1),
            (this.discards = 0),
            (this.failures = 0),
            (this.rateRefusals = 0));
          return;
        }
        if (this.prepaid) this.prepaid = !1;
        else {
          if (
            this.deps.tryChargeRefill !== void 0 &&
            !this.deps.tryChargeRefill()
          ) {
            this.deps.onRefillRefused?.();
            return;
          }
          this.discards = 0;
        }
        ((this.lastRefillAt = Date.now()),
          (this.flightIsRefill = !0),
          this.poll());
      }
    }
    async poll() {
      if (this.stopped || this.inFlight) {
        this.rerunAfterFlight = !this.stopped;
        return;
      }
      ((this.inFlight = !0), this.clearTimer());
      let e = this.deps.epoch?.(),
        t = this.modeGen,
        n = this.flightIsRefill;
      this.flightIsRefill = !1;
      let r;
      try {
        r = await this.deps.runQuery();
      } catch {
        r = { kind: "unavailable" };
      }
      if (((this.inFlight = !1), !this.stopped)) {
        if (r.kind === "revoked") {
          (this.stop(), this.deps.onStopped());
          return;
        }
        if (r.kind === "rejected") {
          (this.stop(), this.deps.onRejected?.(r.err));
          return;
        }
        if (r.kind === "unavailable" || r.kind === "rate_limited") {
          (this.failures++,
            (this.rateRefusals =
              r.kind === "rate_limited" ? this.rateRefusals + 1 : 0),
            this.mode === "stream"
              ? (n && ((this.prepaid = !0), (this.refillPending = !0)),
                this.refillPending
                  ? this.armRefillRetry()
                  : (this.rateRefusals = 0))
              : this.rerunAfterFlight
                ? ((this.rerunAfterFlight = !1), this.poll())
                : this.scheduleBackoff());
          return;
        }
        if (
          ((this.failures = 0),
          (this.rateRefusals = 0),
          t !== this.modeGen ||
            (this.mode === "stream" && e !== this.deps.epoch?.()))
        )
          this.reaskDiscarded(n);
        else {
          let e = this.deps.cache.reconcile(r.entries, {
            authoritative: this.mode === "poll" && r.complete,
          });
          ((e.length > 0 ||
            !this.initialDelivered ||
            r.complete !== this.lastComplete ||
            (this.mode === "poll" &&
              r.complete &&
              (this.deps.awaitingEcho?.() ?? !1))) &&
            (this.deps.deliver(e, {
              initial: !this.initialDelivered,
              complete: r.complete,
            }),
            (this.initialDelivered = !0),
            (this.lastComplete = r.complete)),
            n &&
            this.mode === "stream" &&
            this.deps.cache.lastRejected > 0 &&
            this.discards < Aa &&
            (this.deps.needRefill?.() ?? !1)
              ? this.reaskDiscarded(!0)
              : ((this.discards = 0), (this.prepaid = !1)));
        }
        if (
          (this.refillPending && this.scheduleRefill(), this.rerunAfterFlight)
        ) {
          ((this.rerunAfterFlight = !1), this.poll());
          return;
        }
        this.scheduleNext();
      }
    }
    reaskDiscarded(e) {
      let t = this.deps.needRefill?.() ?? !0;
      if (this.mode !== "stream" || !e || !t) {
        ((this.prepaid = !1), (this.discards = 0));
        return;
      }
      (this.discards++, (this.prepaid = !0), (this.refillPending = !0));
    }
    chainSpacingMs() {
      return this.discards > Aa
        ? (this.deps.backoffMaxMs ?? Ea)
        : (this.deps.refillSpacingMs ?? wa);
    }
    armRefillRetry() {
      if (this.refillTimer !== null) return;
      let e =
          this.rateRefusals > 0
            ? this.nextWaitMs(this.deps.visibleMs)
            : this.failureWaitMs(this.deps.visibleMs),
        t = this.lastRefillAt + this.chainSpacingMs() - Date.now();
      this.refillTimer = setTimeout(
        () => {
          ((this.refillTimer = null), this.fireRefill());
        },
        Math.max(e, t),
      );
    }
    scheduleNext() {
      this.stopped || this.mode !== "poll" || this.setTimer(this.nextWaitMs());
    }
    nextWaitMs(e = this.cadenceMs()) {
      return (
        (this.rateRefusals > 0
          ? Math.min(
              Math.max(e, this.deps.hiddenMs),
              e * 2 ** Math.min(this.rateRefusals - 1, 10),
            )
          : e) *
        (Oa + ka * Math.random())
      );
    }
    cadenceMs() {
      return this.deps.isVisible() ? this.deps.visibleMs : this.deps.hiddenMs;
    }
    backoffMs() {
      let e = this.deps.backoffBaseMs ?? Ta,
        t = this.deps.backoffMaxMs ?? Ea,
        n = Math.min(t, e * 2 ** Math.min(this.failures - 1, 10));
      return Math.max(1, n * Math.random());
    }
    failureWaitMs(e = this.cadenceMs()) {
      return this.failures > Da
        ? Math.max(this.backoffMs(), this.nextWaitMs(e))
        : this.backoffMs();
    }
    scheduleBackoff() {
      this.stopped ||
        this.mode !== "poll" ||
        this.setTimer(
          this.rateRefusals > 0 ? this.nextWaitMs() : this.failureWaitMs(),
        );
    }
    onVisibilityFlip() {
      if (!(this.stopped || this.mode !== "poll" || this.inFlight)) {
        if (this.rateRefusals > 0 && this.timer !== null) {
          let e = Math.max(0, this.dueAt - Date.now());
          this.setTimer(Math.min(e, this.nextWaitMs()));
          return;
        }
        (this.clearTimer(), this.scheduleNext());
      }
    }
    setTimer(e) {
      (this.clearTimer(),
        (this.dueAt = Date.now() + e),
        (this.timer = setTimeout(() => void this.poll(), e)));
    }
    clearTimer() {
      (this.timer !== null && clearTimeout(this.timer), (this.timer = null));
    }
    clearRefillTimer() {
      (this.refillTimer !== null && clearTimeout(this.refillTimer),
        (this.refillTimer = null));
    }
  },
  Ma = class {
    isOpen;
    onUnrouted;
    codecs = new Map();
    constructor(e, t) {
      ((this.isOpen = e), (this.onUnrouted = t));
    }
    register(e, t) {
      return (
        this.codecs.set(e, t),
        () => {
          this.codecs.get(e) === t && this.codecs.delete(e);
        }
      );
    }
    dispatch(e) {
      if (
        typeof e.stream != "string" ||
        e.stream === "" ||
        typeof e.kind != "string"
      )
        return (this.onUnrouted(), !1);
      let t = this.codecs.get(e.kind);
      return t === void 0 || !this.isOpen(e.stream)
        ? (this.onUnrouted(), !1)
        : (t({
            kind: e.kind,
            stream: e.stream,
            actor: e.actor,
            payload: e.payload,
          }),
          !0);
    }
  };
function Na(e, t) {
  let n = [],
    r = e.map((e) => ({ id: e.id, data: e.data })),
    i = new Set(t.map((e) => e.id));
  for (let e = r.length - 1; e >= 0; e--)
    i.has(r[e].id) ||
      (n.push({ type: "removed", id: r[e].id, oldIndex: e, newIndex: -1 }),
      r.splice(e, 1));
  let a = new Map(e.map((e) => [e.id, e])),
    o = new Map(r.map((e, t) => [e.id, t])),
    s = [];
  for (let e = 0; e < t.length; e++) {
    let n = a.get(t[e].id),
      r = o.get(t[e].id);
    n !== void 0 &&
      r !== void 0 &&
      _t(n.data, t[e].data) &&
      s.push({ nextIdx: e, workPos: r });
  }
  let c = new Set();
  for (let e of Pa(s.map((e) => e.workPos))) c.add(s[e].nextIdx);
  for (let e = 0; e < t.length; e++) {
    if (c.has(e)) continue;
    let i = t[e],
      o = r.findIndex((e) => e.id === i.id);
    o !== -1 && r.splice(o, 1);
    let s = e === 0 ? 0 : r.findIndex((n) => n.id === t[e - 1].id) + 1;
    (r.splice(s, 0, { id: i.id, data: i.data }),
      !(o !== -1 && o === s && _t(a.get(i.id)?.data, i.data)) &&
        n.push(
          o === -1
            ? {
                type: "added",
                id: i.id,
                data: i.data,
                oldIndex: -1,
                newIndex: s,
              }
            : {
                type: "modified",
                id: i.id,
                data: i.data,
                oldIndex: o,
                newIndex: s,
              },
        ));
  }
  return n;
}
function Pa(e) {
  let t = [],
    n = Array.from(e, () => -1);
  for (let r = 0; r < e.length; r++) {
    let i = 0,
      a = t.length;
    for (; i < a;) {
      let n = (i + a) >> 1;
      e[t[n]] < e[r] ? (i = n + 1) : (a = n);
    }
    (i > 0 && (n[r] = t[i - 1]), (t[i] = r));
  }
  let r = [],
    i = t.length > 0 ? t[t.length - 1] : -1;
  for (; i !== -1;) (r.push(i), (i = n[i]));
  return r.reverse();
}
var Fa = 50;
function Ia(e) {
  let t = e ?? {},
    n = (e, t) => (typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t),
    r = (e, t) => Math.max(e, t);
  return {
    poll: {
      visibleMs: r(n(t.poll?.visibleMs, 3e4), 5e3),
      hiddenMs: r(n(t.poll?.hiddenMs, 3e5), 3e4),
    },
    limits: {
      maxStreams: n(t.limits?.maxStreams, xr.maxStreams),
      maxFilters: n(t.limits?.maxFilters, xr.maxFilters),
      maxLimit: n(t.limits?.maxLimit, xr.maxLimit),
    },
    stream: t.stream === !0,
    offline: t.offline === !0,
    transport: t.transport === "mcp" ? "mcp" : "rest",
    batch: Math.min(Math.trunc(n(t.batch, 0)), Fa),
  };
}
var La = 1e3,
  Ra = 262144,
  za = 864e5,
  Ba = 400,
  Va = 3,
  Ha = 2e3,
  Ua = 5,
  Wa = 2e3,
  Ga = 64,
  Ka = 1e3,
  qa = 250,
  Ja = 6e4,
  Ya = [],
  Xa = 32,
  Za = new Set(["set", "update", "delete", "acquire"]),
  Qa = 1e3,
  $a = class {
    deps;
    subs = new Map();
    streamToSub = new Map();
    openStreams = new Set();
    pos;
    lane;
    codec;
    registry;
    unsubs = [];
    refillTokens = 20;
    refillStamp = Date.now();
    stopped = !1;
    tick = 0;
    local;
    outbox;
    outboxTransport;
    restaged = new Map();
    refusals = new Set();
    lastRefusalAt = -1 / 0;
    churn = new Map();
    pageReads = new H();
    constructor(e) {
      ((this.deps = e),
        (this.pos = new ni(e.slug, e.storage)),
        (this.local = e.local ?? null),
        (this.outbox = e.outbox ?? null));
      let { http: t } = e,
        n = (e) => ({
          existing: this.cached(e.path),
          ...(e.data === void 0 ? {} : { bytes: ha(e) }),
        }),
        r = e.config.transport === "rest" ? e.config.batch : 0;
      if (
        ((this.outboxTransport =
          this.outbox === null
            ? null
            : {
                send: (e, n) =>
                  t.sendQueued(e, { ...n, existing: this.cached(e.path) }),
                ...(t.batchable !== void 0 && t.sendQueuedBatch !== void 0
                  ? {
                      batch: {
                        max: r,
                        clear: (e) => t.batchable(e, n(e)),
                        send: (e, r, i) =>
                          t.sendQueuedBatch(e, r, { ...i, hints: e.map(n) }),
                      },
                    }
                  : {}),
              }),
        (this.codec = new Wt({
          cacheFor: (e) => this.subOfStream(e)?.cache ?? null,
          deref: (e, t) => this.deref(e, t),
          recordPos: (e, t) => {
            let n = this.subOfStream(e);
            if (n !== void 0) {
              if (this.local === null) {
                this.pos.record(n.specKey, t);
                return;
              }
              ((n.pos = t),
                (n.posAt = Date.now()),
                (n.localDirty = !0),
                this.schedulePersist(n));
            }
          },
          deliver: (e, t, n) => {
            let r = this.subOfStream(e);
            if (r === void 0) return;
            (oo(r, t),
              n.fence && r.overlay.noteAuthoritative(r.openIssuedAt),
              (t.length > 0 || n.fence) && r.streamEpoch++,
              t.length > 0 && (r.localDirty = !0));
            let i = r.spec.l;
            (!n.fence &&
              i !== void 0 &&
              r.lastSent.length >= i &&
              r.cache.size < i &&
              r.fenceReached &&
              r.pump.requestRefill(),
              this.deliver(r, { fence: n.fence, touched: t }));
          },
          onFence: (e) => this.fenced(e),
          onDecodeError: (t) => {
            (e.metrics.durableUnrouted(),
              this.lane?.abortStream(t, "codec_decode_error"));
          },
          onDerefUnavailable: (e) =>
            this.lane?.abortStream(e, "deref_unavailable"),
          onOverflow: (e) => this.lane?.abortStream(e, "codec_overflow"),
        })),
        (this.registry = new Ma(
          (e) => this.openStreams.has(e),
          () => e.metrics.durableUnrouted(),
        )),
        this.registry.register("store:db", (e) => this.codec.handle(e)),
        e.config.stream && e.durableSync !== null
          ? ((this.lane = new ei({
              sync: e.durableSync,
              slug: e.slug,
              bootStream: !0,
              mint: (e) => this.mint(e),
              posFor: (e, t) => {
                let n = this.subOfStream(t);
                return n === void 0
                  ? null
                  : this.local === null
                    ? to(n)
                      ? n.resumePos
                      : null
                    : n.pos;
              },
              clearPos: (e, t) => this.clearPos(e, t),
              metrics: e.metrics,
              codec: {
                onStreamOpening: (e) => {
                  let t = this.subOfStream(e);
                  t !== void 0 && (t.openIssuedAt = ++this.tick);
                },
                onStreamOpened: (e) => {
                  (this.openStreams.add(e), this.codec.onStreamOpened(e));
                  let t = this.subOfStream(e);
                  t !== void 0 && (t.fenceReached = !1);
                },
                onStreamClosed: (e) => {
                  (this.openStreams.delete(e), this.codec.onStreamClosed(e));
                },
              },
              onStreamMode: (e, t) => this.onStreamMode(e, t),
              onStreamReset: (e) => this.forgetLocal(this.subOfStream(e)),
              resumeFromPos: this.local !== null,
              onResumed: (e) =>
                this.local === null ? this.fenced(e) : this.onResumed(e),
              onStopped: () => this.stopAll(),
            })),
            this.unsubs.push(
              e.durableSync.onStream((e) => void this.registry.dispatch(e)),
            ))
          : (this.lane = null),
        this.local !== null &&
          this.unsubs.push(
            e.onVisibility(() => {
              if (!e.isVisible())
                for (let e of this.subs.values()) this.flushPersist(e);
            }),
          ),
        this.outbox !== null && this.outboxTransport !== null)
      ) {
        let t = this.outbox;
        (t.attach(this.outboxTransport, {
          onSettle: (e, t, n) => this.onOutboxSettle(e, t, n),
          onRevoked: () => this.stopAll(),
          onAdopted: (e) =>
            this.restage(
              e,
              [...this.subs.values()].filter((e) => !e.hydrating),
            ),
          onEvent: (e) => this.deps.metrics.outbox(e),
        }),
          e.onOnline !== void 0 &&
            this.unsubs.push(e.onOnline(() => void t.reclaim())),
          e.durableSync !== null &&
            this.unsubs.push(
              e.durableSync.onLaneCtrl((e) => {
                e.kind === "ctrl:joined" && t.reclaim();
              }),
            ));
      }
    }
    async handleVerb(e, t) {
      if (this.stopped) return { error: W("revoked") };
      if (this.deps.readOnly === !0 && Za.has(e)) return this.refuseWrite();
      switch (e) {
        case "get":
          return this.docVerb(t, (e) =>
            this.pageReads.run(Nr({ kind: "doc", c: e }), () =>
              this.shapeGet(e),
            ),
          );
        case "set":
          return this.writeVerb(t, "set");
        case "update":
          return this.writeVerb(t, "update");
        case "delete":
          return this.deleteVerb(t);
        case "acquire":
          return this.acquireVerb(t);
        case "query":
          return this.queryVerb(t);
        case "subscribe":
          return this.subscribeVerb(t);
        case "unsubscribe":
          return this.unsubscribeVerb(t);
        default:
          return { error: W("invalid_argument", "unknown method " + e) };
      }
    }
    stop() {
      ((this.stopped = !0),
        this.deps.http.close(),
        this.settleRefusals(),
        this.outboxTransport !== null &&
          this.outbox?.detach(this.outboxTransport),
        this.lane?.stop());
      for (let e of this.subs.values())
        (e.pump.stop(), this.flushPersist(e), this.clearLinger(e));
      (this.subs.clear(), this.streamToSub.clear());
      for (let e of this.unsubs) e();
    }
    refuseWrite() {
      let e = Date.now(),
        t = e - this.lastRefusalAt < Qa ? Qa : 0;
      return (
        (this.lastRefusalAt = e + t),
        new Promise((e) => {
          let n = {
            settle: e,
            timer: setTimeout(() => {
              (this.refusals.delete(n), e({ error: W("invalid_argument") }));
            }, t),
          };
          this.refusals.add(n);
        })
      );
    }
    settleRefusals() {
      for (let e of this.refusals)
        (clearTimeout(e.timer), e.settle({ error: W("revoked") }));
      this.refusals.clear();
    }
    async docVerb(e, t) {
      let n = K((e[0] ?? {}).path, "doc");
      return typeof n == "string" ? t(n) : { error: n };
    }
    async shapeGet(e) {
      let t = await this.deps.http.read("get", { path: e });
      return this.mapOutcome(t, (t) => {
        let n = t,
          r = e.split("/").pop() ?? "";
        return n !== null && n.exists === !0
          ? { id: r, exists: !0, data: n.data }
          : { id: r, exists: !1 };
      });
    }
    async writeVerb(e, t) {
      let n = K((e[0] ?? {}).path, "doc");
      if (typeof n != "string") return { error: n };
      let r = Tr(e[1]);
      if (typeof r != "number") return { error: r };
      let i = e[1],
        a = this.stageOwnWrite(n, t, i),
        o = { path: n, data: i, ...(t === "set" ? { replace: !0 } : {}) },
        s =
          this.outbox === null
            ? await this.deps.http.write(t, o, {
                existing: a.existing,
                bytes: r,
              })
            : await this.outbox.enqueue({ verb: t, ...o });
      if (s.kind === "ok") {
        let e = s.result?.version;
        return (
          this.settleOwnWrite(a, typeof e == "number" ? e : 0),
          { result: void 0 }
        );
      }
      return (this.settleOwnWrite(a, null), this.mapOutcome(s, () => void 0));
    }
    async deleteVerb(e) {
      let t = K((e[0] ?? {}).path, "doc");
      if (typeof t != "string") return { error: t };
      let n = this.stageOwnWrite(t, "delete", void 0),
        r =
          this.outbox === null
            ? await this.deps.http.write("delete", { path: t })
            : await this.outbox.enqueue({ verb: "delete", path: t });
      return r.kind === "ok"
        ? (this.settleOwnWrite(n, 2 ** 53 - 1), { result: void 0 })
        : (this.settleOwnWrite(n, null), this.mapOutcome(r, () => void 0));
    }
    async acquireVerb(e) {
      let t = K((e[0] ?? {}).path, "doc");
      if (typeof t != "string") return { error: t };
      let n = e[1] ?? {};
      if (typeof n.holder != "string" || n.holder === "")
        return {
          error: W("invalid_argument", "acquire requires a holder string."),
        };
      if (this.outbox?.backingOff === !0) return { error: W("unavailable") };
      let r = { path: t, holder: n.holder };
      if (
        (typeof n.ttlMs == "number" &&
          Number.isFinite(n.ttlMs) &&
          n.ttlMs > 0 &&
          (r.ttlMs = Math.min(Math.max(Math.trunc(n.ttlMs), 1e3), 6e5)),
        n.data !== void 0)
      ) {
        let e = Er(n.data);
        if (e !== null) return { error: e };
        r.data = n.data;
      }
      let i = await this.deps.http.write("acquire", r);
      return this.mapOutcome(i, (e) => e);
    }
    async queryVerb(e) {
      let t = kr(this.rawQuery(e[0]), this.deps.config.limits);
      return "code" in t
        ? { error: t }
        : this.pageReads.run(Nr(t), () => this.readQuery(t));
    }
    async readQuery(e) {
      let t = await this.readQueryPages(
        e,
        () => !this.stopped,
        () => !1,
        "read",
      );
      if (t.kind === "err") {
        let e =
          t.err.code === "invalid_argument" && !t.firstPage
            ? W("unavailable")
            : t.err;
        return this.mapOutcome({ kind: "err", err: e }, (e) => e);
      }
      let n = t.entries,
        r = Fr(e);
      return (
        r !== void 0 && n.sort(r),
        { result: { docs: n.map((e) => ({ id: e.id, data: e.data })) } }
      );
    }
    subscribeVerb(e) {
      let t = e[0],
        n = typeof t == "string" ? this.subs.get(t) : void 0;
      if (
        typeof t != "string" ||
        t === "" ||
        t.length > 32 ||
        (n !== void 0 && n.lingerTimer === null)
      )
        return { error: W("invalid_argument", "Invalid subscription id.") };
      let r = e[1] ?? {},
        i =
          typeof r.path == "string"
            ? Ar(r.path)
            : kr(this.rawQuery(e[1]), this.deps.config.limits);
      if ("code" in i) return { error: i };
      let a = i,
        o = Nr(a);
      this.noteSubscribe(o);
      let s = this.lingeringSub(o);
      if ((n !== void 0 && n !== s && this.dropSub(n), s !== void 0))
        return (this.adopt(s, t), { result: {} });
      if (this.subs.size >= this.deps.config.limits.maxStreams) {
        let e = this.lingeringSub();
        e !== void 0 && this.dropSub(e);
      }
      if (this.subs.size >= this.deps.config.limits.maxStreams)
        return {
          error: W("resource_exhausted", "Too many active subscriptions."),
        };
      let c = Fr(a),
        l = {
          subId: t,
          spec: a,
          specKey: o,
          cmp: c,
          cache: new bt(c),
          overlay: new or(),
          pump: null,
          laneClose: null,
          streamName: null,
          fenceReached: !1,
          resumePos: null,
          readLanded: !1,
          streamEpoch: 0,
          readIssuedAt: 0,
          openIssuedAt: 0,
          mode: "poll",
          modeGen: 0,
          lastSent: [],
          lastMeta: null,
          dead: !1,
          everDefinitive: !1,
          persistTimer: null,
          definitiveAt: 0,
          localDirty: !0,
          pos: null,
          posAt: null,
          lastReadEpoch: -1,
          rowBytes: 0,
          rowSavedAt: 0,
          hydrateTimer: null,
          hydrating: !1,
          resumeFenceTimer: null,
          resumeGen: 0,
          lingerTimer: null,
          replayTimer: null,
          replayOwed: !1,
          replayDueAt: 0,
        };
      return (
        (l.pump = new ja({
          cache: l.cache,
          runQuery: () => {
            let e = l.mode,
              t = l.modeGen,
              n = l.streamEpoch;
            return (
              (l.readIssuedAt = ++this.tick),
              this.runSpecQuery(
                a,
                () => !l.dead && !this.stopped,
                () =>
                  l.modeGen !== t || (e === "stream" && l.streamEpoch !== n),
                "call",
              )
            );
          },
          deliver: (e, t) => {
            ((l.readLanded = t.complete),
              (l.lastReadEpoch = l.streamEpoch),
              oo(l, e),
              t.complete &&
                l.mode === "poll" &&
                l.overlay.noteAuthoritative(l.readIssuedAt),
              e.length > 0 && (l.localDirty = !0),
              this.deliver(l, { touched: e }),
              this.outbox?.kick());
          },
          onStopped: () => this.stopAll(),
          onRejected: (e) => this.failSub(l, e),
          visibleMs: this.deps.config.poll.visibleMs,
          hiddenMs: this.deps.config.poll.hiddenMs,
          isVisible: () => this.deps.isVisible(),
          onVisibility: (e) => this.deps.onVisibility(e),
          epoch: () => l.streamEpoch,
          awaitingEcho: () => l.overlay.hasConfirmed,
          needRefill: () =>
            !l.dead &&
            l.fenceReached &&
            l.spec.l !== void 0 &&
            l.cache.size < l.spec.l,
          tryChargeRefill: () => this.chargeRefill(),
          onRefillRefused: () =>
            this.failSub(
              l,
              W("resource_exhausted", "The windowed-refill budget is spent."),
            ),
        })),
        this.subs.set(t, l),
        this.local === null
          ? (this.restagePending(l), this.openStream(l), l.pump.start())
          : (l.pump.start(), this.hydrateThenOpen(l, this.local)),
        { result: {} }
      );
    }
    async hydrateThenOpen(e, t) {
      e.hydrating = !0;
      let n = await new Promise((n) => {
        ((e.hydrateTimer = setTimeout(() => n(null), Ba)),
          t.load(e.specKey).then(
            (e) => n(e),
            () => n(null),
          ));
      }).finally(() => {
        e.hydrateTimer !== null &&
          (clearTimeout(e.hydrateTimer), (e.hydrateTimer = null));
      });
      if (
        ((e.hydrating = !1),
        !(e.dead || this.stopped || this.subs.get(e.subId) !== e))
      ) {
        if (n !== null) {
          let t = e.lastMeta === null && e.cache.size === 0;
          (t &&
            (e.cache.reconcile(n.entries),
            (e.localDirty = Date.now() - n.savedAt > za),
            (e.rowSavedAt = n.savedAt),
            (e.rowBytes = n.size),
            this.restagePending(e, { quiet: !0 }),
            this.deliver(e, {})),
            n.pos !== null &&
              (t || e.readLanded) &&
              ((e.pos = n.pos), (e.posAt = n.posAt)));
        }
        (this.restagePending(e), this.openStream(e));
      }
    }
    restagePending(e, t = {}) {
      this.outbox !== null && this.restage(this.outbox.pending(), [e], t);
    }
    openStream(e) {
      if (e.dead || this.stopped || this.lane === null) return;
      let t = this.lane.addStream(e.specKey);
      (t !== null &&
        ((e.streamName = t.name),
        (e.laneClose = t.close),
        this.streamToSub.set(t.name, e.subId)),
        (e.resumePos = this.pos.get(e.specKey)));
    }
    unsubscribeVerb(e) {
      let t = e[0];
      if (typeof t != "string") return { error: W("invalid_argument") };
      let n = this.subs.get(t);
      return n === void 0
        ? { result: {} }
        : (this.noteUnsubscribe(n.specKey),
          this.churning(n.specKey)
            ? n.lingerTimer === null &&
              (this.flushPersist(n),
              this.clearLinger(n),
              (n.lingerTimer = setTimeout(() => this.dropSub(n), Ka)))
            : this.dropSub(n),
          { result: {} });
    }
    churnEntry(e) {
      let t = this.churn.get(e);
      return (
        t === void 0 &&
          (this.churn.size >= Ga && this.churn.clear(),
          (t = { resubs: [], unsubAt: -1 / 0 }),
          this.churn.set(e, t)),
        t
      );
    }
    noteSubscribe(e) {
      let t = this.churnEntry(e),
        n = Date.now();
      n - t.unsubAt > Wa ||
        (t.resubs.push(n), t.resubs.length > Ua && t.resubs.shift());
    }
    noteUnsubscribe(e) {
      this.churnEntry(e).unsubAt = Date.now();
    }
    churning(e) {
      let t = this.churn.get(e);
      return (
        t !== void 0 && t.resubs.length >= Ua && Date.now() - t.resubs[0] <= Wa
      );
    }
    lingeringSub(e) {
      for (let t of this.subs.values())
        if (
          t.lingerTimer !== null &&
          !t.dead &&
          (e === void 0 || t.specKey === e)
        )
          return t;
    }
    adopt(e, t) {
      this.clearLinger(e);
      let n = e.subId;
      (this.subs.delete(n),
        (e.subId = t),
        this.subs.set(t, e),
        e.streamName !== null && this.streamToSub.set(e.streamName, t));
      for (let e of this.restaged.values()) {
        let r = e.get(n);
        r !== void 0 && (e.delete(n), e.set(t, r));
      }
      if (((e.replayOwed = !0), e.lastMeta !== null)) {
        let t = Date.now();
        (e.replayDueAt === 0 && (e.replayDueAt = t + qa),
          (e.replayTimer = setTimeout(
            () => {
              ((e.replayTimer = null), this.deliver(e, {}));
            },
            Math.max(0, e.replayDueAt - t),
          )));
      }
    }
    clearLinger(e) {
      (e.lingerTimer !== null &&
        (clearTimeout(e.lingerTimer), (e.lingerTimer = null)),
        e.replayTimer !== null &&
          (clearTimeout(e.replayTimer), (e.replayTimer = null)));
    }
    rawQuery(e) {
      let t = e ?? {};
      return {
        collection: t.collection,
        where: t.where,
        orderBy: t.orderBy,
        limit: t.limit,
      };
    }
    subOfStream(e) {
      let t = this.streamToSub.get(e);
      return t === void 0 ? void 0 : this.subs.get(t);
    }
    subOfSpec(e) {
      for (let t of this.subs.values()) if (t.specKey === e) return t;
    }
    async mint(e) {
      let t = this.subOfSpec(e);
      if (t === void 0) return { kind: "unavailable" };
      let n = await this.deps.http.subscribe(e, t.spec);
      return n.kind === "ok"
        ? { kind: "ok", grant: n.grant, spec: n.spec }
        : { kind: n.kind };
    }
    async deref(e, t) {
      let n = this.subOfStream(e);
      if (n === void 0) return { ok: !1 };
      let r = K(n.spec.kind === "doc" ? n.spec.c : n.spec.c + "/" + t, "doc");
      if (typeof r != "string") return { ok: !1, transient: !0 };
      let i = await this.deps.http.call("get", { path: r });
      if (
        (i.kind === "err" &&
          (await new Promise((e) => setTimeout(e, 250 + Math.random() * 250)),
          (i = await this.deps.http.call("get", { path: r }))),
        i.kind !== "ok")
      )
        return { ok: !1, transient: !0 };
      let a = i.result;
      return a !== null && a.exists === !0
        ? { ok: !0, data: a.data }
        : { ok: !1 };
    }
    async runSpecQuery(e, t, n, r) {
      let i = (e, t) =>
        e.code === "revoked"
          ? { kind: "revoked" }
          : e.code === "invalid_argument" && t
            ? { kind: "rejected", err: e }
            : e.code === "resource_exhausted"
              ? { kind: "rate_limited" }
              : { kind: "unavailable" };
      if (e.kind === "query") {
        let a = await this.readQueryPages(e, t, n, r);
        return a.kind === "ok" ? a : i(a.err, a.firstPage);
      }
      let a = await this.callSpec(e, r);
      if (a.kind !== "ok") return i(a.err, !0);
      let o = a.result;
      return o === null || o.exists !== !0
        ? { kind: "ok", entries: [], complete: !0 }
        : {
            kind: "ok",
            entries: [
              {
                id: e.c.split("/").pop() ?? "",
                uid: typeof o.uid == "string" ? o.uid : "",
                v: typeof o.version == "number" ? o.version : 0,
                data: o.data,
              },
            ],
            complete: !0,
          };
    }
    async readQueryPages(e, t, n, r) {
      let i = [],
        a = new Map(),
        o = Date.now(),
        s;
      for (let c = 0; c < Xa; c++) {
        if (s !== void 0 && !t())
          return { kind: "err", err: W("unavailable"), firstPage: !1 };
        if (s !== void 0 && (n() || !G(o, Date.now()))) break;
        let c = await this.callSpec(
          e,
          r,
          s === void 0
            ? void 0
            : {
                cursor: s,
                ...(e.l === void 0 ? {} : { limit: e.l - i.length }),
              },
          o,
        );
        if (c.kind !== "ok")
          return { kind: "err", err: c.err, firstPage: s === void 0 };
        let l = c.result;
        for (let e of Array.isArray(l?.docs) ? l.docs : []) {
          if (typeof e.id != "string") continue;
          let t = {
              id: e.id,
              uid: typeof e.uid == "string" ? e.uid : "",
              v: typeof e.version == "number" ? e.version : 0,
              data: e.data,
            },
            n = a.get(e.id);
          n === void 0
            ? (a.set(e.id, i.length), i.push(t))
            : (t.v > i[n].v || t.uid !== i[n].uid) && (i[n] = t);
        }
        let u = no(e) ? void 0 : l?.nextCursor;
        if (
          typeof u != "string" ||
          u === "" ||
          (e.l !== void 0 && i.length >= e.l)
        )
          return { kind: "ok", entries: i, complete: !0 };
        if (u === s) break;
        s = u;
      }
      return { kind: "ok", entries: i, complete: !1 };
    }
    callSpec(e, t, n, r) {
      return e.kind === "doc"
        ? this.deps.http[t]("get", { path: e.c })
        : this.deps.http[t](
            "query",
            {
              collection: e.c,
              ...(e.w === void 0 ? {} : { where: e.w }),
              ...(no(e) ? { orderBy: e.o } : {}),
              limit: e.l ?? this.deps.config.limits.maxLimit,
              ...n,
            },
            r,
          );
    }
    mapOutcome(e, t) {
      return e.kind === "ok"
        ? { result: t(e.result) }
        : e.err.code === "revoked"
          ? (this.stopAll(), { error: W("revoked") })
          : { error: e.err };
    }
    stageOwnWrite(e, t, n, r = this.subs.values(), i = {}) {
      let a = [],
        o = [],
        s = !1,
        c = e.split("/"),
        l = c[c.length - 1],
        u = c.slice(0, -1).join("/");
      for (let c of r)
        c.dead ||
          (eo(c, e, u) &&
            (o.push(c),
            (s ||= c.cache.get(l) !== void 0),
            (c.spec.kind !== "query" || c.spec.w === void 0) &&
              (c.spec.kind !== "query" ||
                c.spec.l === void 0 ||
                (this.outbox !== null && c.cache.get(l) !== void 0)) &&
              (a.push([c, c.overlay.stage(l, t, n, c.cache.get(l)?.uid)]),
              i.quiet !== !0 && this.deliver(c, {}))));
      return { staged: a, affected: o, existing: s };
    }
    cached(e) {
      let t = e.lastIndexOf("/"),
        n = e.slice(0, Math.max(0, t)),
        r = e.slice(t + 1);
      for (let t of this.subs.values())
        if (!t.dead && eo(t, e, n) && t.cache.get(r) !== void 0) return !0;
      return !1;
    }
    restage(e, t, n = {}) {
      for (let r of e) {
        let e = this.restaged.get(io(r)),
          i = t.filter((t) => !t.dead && !(e?.has(t.subId) ?? !1));
        if (i.length === 0) continue;
        let { staged: a } = this.stageOwnWrite(r.path, r.verb, r.data, i, n);
        for (let [t, n] of a) ((e ??= new Map()), e.set(t.subId, n));
        e !== void 0 && this.restaged.set(io(r), e);
      }
    }
    onOutboxSettle(e, t, n) {
      if (this.stopped) return;
      let r = this.restaged.get(io(e));
      this.restaged.delete(io(e));
      let i = [];
      if (r !== void 0)
        for (let [e, t] of r) {
          let n = this.subs.get(e);
          n !== void 0 && !n.dead && i.push([n, t]);
        }
      let a = n ? i.map(([e]) => e) : this.stageTargets(e.path).affected,
        o = t.kind === "ok" ? t.result?.version : void 0;
      this.settleOwnWrite(
        { staged: i, affected: a },
        t.kind === "ok"
          ? e.verb === "delete"
            ? 2 ** 53 - 1
            : typeof o == "number"
              ? o
              : 0
          : null,
      );
    }
    stageTargets(e) {
      let t = e.split("/").slice(0, -1).join("/"),
        n = [];
      for (let r of this.subs.values())
        !r.dead &&
          (r.spec.kind === "doc" ? r.spec.c === e : r.spec.c === t) &&
          n.push(r);
      return { affected: n };
    }
    settleOwnWrite(e, t) {
      for (let [n, r] of e.staged)
        (t === null
          ? n.overlay.reject(r)
          : (n.overlay.confirm(r, t, ++this.tick),
            setTimeout(() => {
              !n.dead &&
                !this.stopped &&
                n.overlay.awaiting(r) &&
                this.deps.metrics.overlayAged();
            }, Ja)),
          this.deliver(n, {}));
      if (t !== null)
        for (let t of e.affected)
          !t.dead && t.mode === "poll" && t.pump.noteOwnWrite();
    }
    failSub(e, t) {
      e.dead ||
        this.stopped ||
        (e.lingerTimer === null &&
          this.deps.postEvent(ro(e.subId, t.code, t.message)),
        this.dropSub(e));
    }
    chargeRefill() {
      let e = Math.floor((Date.now() - this.refillStamp) / 3e4);
      return (
        e > 0 &&
          ((this.refillTokens = Math.min(20, this.refillTokens + e)),
          (this.refillStamp += e * 3e4)),
        this.refillTokens <= 0 ? !1 : (this.refillTokens--, !0)
      );
    }
    fenced(e) {
      let t = this.subOfStream(e);
      (t !== void 0 && (t.fenceReached = !0), this.lane?.noteFence(e));
    }
    onStreamMode(e, t) {
      let n = this.subOfStream(e);
      if (n === void 0) return;
      let r = n.mode === "stream";
      (n.mode !== t && n.modeGen++,
        (n.mode = t),
        n.resumeGen++,
        t === "poll" &&
          ((n.fenceReached = !1),
          r && (n.readLanded = !1),
          n.cache.demoted(),
          (n.resumePos = null),
          this.pos.clear(n.specKey),
          this.clearResumeFence(n)),
        n.pump.setMode(t));
    }
    deliver(e, t) {
      if (e.dead || this.stopped) return;
      let n = e.overlay.absorb((t) => e.cache.get(t)),
        r = e.overlay.view(e.cache.view(), e.cmp);
      e.spec.l !== void 0 && r.length > e.spec.l && (r = r.slice(0, e.spec.l));
      let i = { fromCache: !to(e), hasPendingWrites: e.overlay.hasPending },
        a = e.replayOwed ? Ya : e.lastSent,
        o = Na(a, r);
      if (
        (this.outbox !== null && ao(a, r, o), t.touched !== void 0 && a !== Ya)
      ) {
        let i = (t) => n.includes(t) || e.overlay.stages(t),
          a = e.spec.l === void 0 || r.length < e.spec.l;
        so(t.touched, r, o, i, (t) => e.cache.get(t), a);
      }
      let s =
          e.lastMeta === null ||
          e.lastMeta.fromCache !== i.fromCache ||
          e.lastMeta.hasPendingWrites !== i.hasPendingWrites,
        c = e.lastMeta === null || e.replayOwed;
      (i.fromCache ||
        ((e.everDefinitive = !0),
        (e.definitiveAt = Date.now()),
        !e.localDirty &&
          e.definitiveAt - e.rowSavedAt > za &&
          (e.localDirty = !0),
        this.schedulePersist(e)),
        !(o.length === 0 && !s && t.fence !== !0 && !c) &&
          ((e.lastSent = r),
          (e.lastMeta = i),
          e.lingerTimer === null &&
            ((e.replayOwed = !1),
            (e.replayDueAt = 0),
            this.deps.postEvent({
              type: "snapshot",
              subId: e.subId,
              ops: o,
              fromCache: i.fromCache,
              hasPendingWrites: i.hasPendingWrites,
            }))));
    }
    clearPos(e, t) {
      if (this.local === null) {
        this.pos.clear(e);
        return;
      }
      let n = this.subOfStream(t);
      n !== void 0 &&
        n.pos !== null &&
        ((n.pos = null),
        (n.posAt = null),
        (n.localDirty = !0),
        this.schedulePersist(n));
    }
    onResumed(e) {
      let t = this.subOfStream(e);
      if (!(t === void 0 || t.dead)) {
        if (t.readLanded && t.lastReadEpoch === t.streamEpoch) {
          this.resumeFenced(t, e);
          return;
        }
        this.fenceByRead(t, e, t.resumeGen, 1);
      }
    }
    async fenceByRead(e, t, n, r) {
      let i = e.streamEpoch,
        a = ++this.tick,
        o = await this.runSpecQuery(
          e.spec,
          () => !e.dead && !this.stopped,
          () => e.streamEpoch !== i || e.resumeGen !== n,
          "call",
        );
      if (!this.awaitingResumeFence(e, t, n)) return;
      if (o.kind === "revoked") {
        this.stopAll();
        return;
      }
      if (o.kind === "rejected") {
        this.failSub(e, o.err);
        return;
      }
      let s = e.streamEpoch !== i;
      if (o.kind === "ok" && (!s || r >= Va)) {
        let n = !s && o.complete,
          r = e.cache.reconcile(o.entries, { authoritative: n });
        (oo(e, r),
          n && e.overlay.noteAuthoritative(a),
          r.length > 0 && (e.streamEpoch++, (e.localDirty = !0)),
          this.resumeFenced(e, t, r));
        return;
      }
      if (o.kind !== "ok" && r >= Va) {
        (this.deps.metrics.streamNoFence(),
          this.lane?.abortStream(t, "no_fence"));
        return;
      }
      e.resumeFenceTimer = setTimeout(
        () => {
          ((e.resumeFenceTimer = null),
            this.awaitingResumeFence(e, t, n) &&
              this.fenceByRead(e, t, n, r + 1));
        },
        Ha * (0.5 + Math.random()),
      );
    }
    awaitingResumeFence(e, t, n) {
      return (
        !e.dead &&
        !this.stopped &&
        e.resumeGen === n &&
        e.mode === "stream" &&
        !e.fenceReached &&
        e.streamName === t &&
        this.openStreams.has(t)
      );
    }
    resumeFenced(e, t, n = []) {
      ((e.fenceReached = !0),
        this.lane?.noteFence(t),
        this.deliver(e, { fence: !0, touched: n }));
    }
    clearResumeFence(e) {
      e.resumeFenceTimer !== null &&
        (clearTimeout(e.resumeFenceTimer), (e.resumeFenceTimer = null));
    }
    schedulePersist(e) {
      this.local === null ||
        e.dead ||
        !e.everDefinitive ||
        !e.localDirty ||
        e.persistTimer !== null ||
        (e.persistTimer = setTimeout(
          () => {
            ((e.persistTimer = null), this.persistNow(e));
          },
          La * (1 + Math.floor(e.rowBytes / Ra)),
        ));
    }
    persistNow(e) {
      if (this.local === null || !e.everDefinitive) return;
      let t = e.rowSavedAt,
        n = Date.now();
      ((e.localDirty = !1), (e.rowSavedAt = n));
      let r = () => {
        e.rowSavedAt === n && ((e.localDirty = !0), (e.rowSavedAt = t));
      };
      this.local
        .save(
          e.specKey,
          { entries: e.cache.view(), pos: e.pos, posAt: e.posAt },
          e.definitiveAt,
        )
        .then((t) => {
          t === null
            ? r()
            : e.rowSavedAt === n && (e.rowBytes = t === 0 ? ci : t);
        }, r);
    }
    flushPersist(e) {
      e.persistTimer !== null &&
        (clearTimeout(e.persistTimer),
        (e.persistTimer = null),
        this.persistNow(e));
    }
    forgetLocal(e) {
      e !== void 0 &&
        this.local !== null &&
        (e.persistTimer !== null &&
          (clearTimeout(e.persistTimer), (e.persistTimer = null)),
        (e.everDefinitive = !1),
        (e.localDirty = !0),
        (e.rowSavedAt = 0),
        (e.rowBytes = 0),
        this.local.remove(e.specKey).catch(() => void 0));
    }
    dropSub(e) {
      (this.flushPersist(e),
        this.clearResumeFence(e),
        this.clearLinger(e),
        e.hydrateTimer !== null &&
          (clearTimeout(e.hydrateTimer), (e.hydrateTimer = null)),
        (e.dead = !0),
        e.pump.stop(),
        e.laneClose?.(),
        e.streamName !== null &&
          (this.streamToSub.delete(e.streamName),
          this.openStreams.delete(e.streamName)),
        this.subs.delete(e.subId));
      for (let t of this.restaged.values()) t.delete(e.subId);
    }
    stopAll() {
      if (!this.stopped) {
        ((this.stopped = !0),
          this.deps.http.close(),
          this.settleRefusals(),
          this.lane?.stop());
        for (let e of this.subs.values())
          (e.pump.stop(),
            this.pos.clear(e.specKey),
            e.persistTimer !== null &&
              (clearTimeout(e.persistTimer), (e.persistTimer = null)),
            this.clearResumeFence(e),
            this.clearLinger(e));
        (this.subs.clear(), this.streamToSub.clear(), this.openStreams.clear());
        for (let e of this.unsubs) e();
        ((this.local?.removeAll() ?? this.deps.dropRows?.())?.catch(
          () => void 0,
        ),
          this.outbox?.halt(),
          this.deps.postEvent({ type: "revoked" }));
      }
    }
  };
function eo(e, t, n) {
  return e.spec.kind === "doc" ? e.spec.c === t : e.spec.c === n;
}
function to(e) {
  return e.mode === "stream" ? e.fenceReached : e.readLanded;
}
function no(e) {
  return e.o !== void 0 && e.l !== void 0;
}
function ro(e, t, n) {
  return { type: "error", subId: e, code: t, message: n };
}
function io(e) {
  return (e.volatile ? "v" : "d") + String(e.seq);
}
function ao(e, t, n) {
  e !== null &&
    e.forEach((e) => {
      if (!e.pending) return;
      let r = t.findIndex((t) => t.id === e.id);
      r === -1 ||
        t[r].pending ||
        n.some((t) => t.id === e.id) ||
        n.push({
          type: "modified",
          id: e.id,
          data: t[r].data,
          oldIndex: r,
          newIndex: r,
        });
    });
}
function oo(e, t) {
  for (let n of t) e.cache.get(n.id) === void 0 && e.overlay.noteRemoved(n.id);
}
function so(e, t, n, r, i, a) {
  let o = new Set();
  e.forEach((e) => {
    if (o.has(e.id) || r(e.id) || n.some((t) => t.id === e.id)) return;
    o.add(e.id);
    let s = t.findIndex((t) => t.id === e.id);
    if (s !== -1)
      n.push({
        type: "modified",
        id: e.id,
        data: t[s].data,
        oldIndex: s,
        newIndex: s,
      });
    else if (e.type === "added" && i(e.id) === void 0 && a) {
      let r = t.length;
      (n.push({
        type: "added",
        id: e.id,
        data: e.data,
        oldIndex: -1,
        newIndex: r,
      }),
        n.push({ type: "removed", id: e.id, oldIndex: r, newIndex: -1 }));
    }
  });
}
function co(e) {
  let t = e === null ? NaN : Number(e.trim());
  return Number.isInteger(t) && t > 0 ? t : void 0;
}
function lo(e, t) {
  let n = Array.isArray(e) ? e : [e];
  for (let e of n) if (typeof e == "object" && e && e.id === t) return e;
  let r = n.length === 1 ? n[0] : null;
  return typeof r == "object" && r && r.id === null && r.error !== void 0
    ? r
    : void 0;
}
function uo(e) {
  let t = [];
  for (let n of e.split(/\r?\n\r?\n/)) {
    let e = [];
    for (let t of n.split(/\r?\n/))
      t.startsWith("data:") && e.push(t.slice(t.charAt(5) === " " ? 6 : 5));
    e.length > 0 &&
      t.push(
        e.join(`
`),
      );
  }
  return t;
}
function fo(e, t) {
  if (e.error !== void 0 && e.error !== null) {
    let n = e.error.code;
    if (typeof n == "number" && Number.isInteger(n)) {
      let r = e.error.message;
      return {
        kind: "rpcError",
        code: n,
        message: typeof r == "string" ? r : "",
        status: t,
      };
    }
    return { kind: "transport", detail: "malformed-response" };
  }
  return "result" in e
    ? { kind: "result", result: e.result }
    : { kind: "transport", detail: "malformed-response" };
}
var po = class {
    deps;
    nextId = 1;
    constructor(e) {
      this.deps = e;
    }
    async request(e, t, n) {
      let r = this.nextId++,
        i = {
          ...this.deps.headers,
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        a = this.deps.fetchFn ?? ((e, t) => fetch(e, t)),
        o = Date.now(),
        s,
        c;
      try {
        let o = JSON.stringify({
          jsonrpc: "2.0",
          id: r,
          method: e,
          params: n.meta === void 0 ? t : { ...t, _meta: n.meta },
        });
        ((s = await a(
          this.deps.url,
          {
            ...this.deps.requestInit,
            method: "POST",
            credentials: "same-origin",
            headers: i,
            body: o,
            ...(n.signal === void 0
              ? this.deps.signalFor === void 0
                ? {}
                : { signal: this.deps.signalFor(n.budgetMs) }
              : { signal: n.signal }),
          },
          n.budgetMs,
        )),
          (c = await s.text()));
      } catch (e) {
        this.deps.markHandled?.(e);
        let t = typeof e == "object" && e ? e.name : void 0;
        return {
          kind: "transport",
          detail:
            t === "TimeoutError" ||
            (t === "AbortError" && Date.now() - o >= n.budgetMs)
              ? "timeout"
              : "fetch-failed",
        };
      }
      let l = (s.headers.get("Content-Type") ?? "").toLowerCase(),
        u;
      if (l.startsWith("text/event-stream"))
        for (let e of uo(c)) {
          try {
            u = lo(JSON.parse(e), r);
          } catch {
            u = void 0;
          }
          if (u !== void 0) break;
        }
      else
        try {
          u = lo(JSON.parse(c), r);
        } catch {
          u = void 0;
        }
      if (u !== void 0) return fo(u, s.status);
      if (!s.ok) {
        let e = co(s.headers.get("Retry-After"));
        return {
          kind: "http",
          status: s.status,
          text: c,
          ...(e === void 0 ? {} : { retryAfterS: e }),
        };
      }
      return { kind: "transport", detail: "malformed-response" };
    }
    async callTool(e, t, n) {
      let r = await this.request("tools/call", { name: e, arguments: t }, n);
      if (r.kind !== "result") return r;
      let i = r.result;
      if (typeof i != "object" || !i)
        return { kind: "transport", detail: "malformed-response" };
      let a = Array.isArray(i.content) ? i.content : [];
      return i.isError === !0
        ? {
            kind: "toolError",
            text:
              a.find(
                (e) =>
                  typeof e == "object" &&
                  !!e &&
                  e.type === "text" &&
                  typeof e.text == "string",
              )?.text ?? null,
          }
        : { kind: "ok", structured: i.structuredContent, content: a };
    }
  },
  mo = "anthropic.com/artifact",
  ho = -32002,
  go = -32003,
  _o = 500;
function vo(e, t) {
  let n = t.idem === void 0 ? {} : { idempotencyKey: t.idem },
    r = t.data === void 0 ? {} : { data: t.data };
  switch (e) {
    case "get":
      return { tool: "get", args: { path: t.path } };
    case "query": {
      let e = t.orderBy;
      return {
        tool: "query",
        args: {
          collection: t.collection,
          ...(t.where === void 0 ? {} : { where: t.where }),
          ...(e === void 0
            ? {}
            : { orderBy: { field: e.f, direction: e.dir } }),
          ...(t.limit === void 0 ? {} : { limit: t.limit }),
          ...(t.cursor === void 0 ? {} : { cursor: t.cursor }),
        },
      };
    }
    case "set":
      return {
        tool: t.replace === !0 ? "set" : "merge",
        args: { path: t.path, ...r, ...n },
      };
    case "update":
      return { tool: "update", args: { path: t.path, ...r, ...n } };
    case "delete":
      return { tool: "delete", args: { path: t.path, ...n } };
    case "acquire":
      return {
        tool: "lease",
        args: {
          path: t.path,
          holder: t.holder,
          ...(t.ttlMs === void 0 ? {} : { ttlMs: t.ttlMs }),
          ...r,
        },
      };
    case "usage":
      return { tool: "usage", args: {} };
    default:
      return null;
  }
}
function yo(e) {
  if (e === null) return null;
  try {
    let t = JSON.parse(e)?.error;
    return typeof t == "object" && t ? t : null;
  } catch {
    return null;
  }
}
function bo(e) {
  switch (e.kind) {
    case "ok":
      return e.structured === void 0
        ? { ok: !0, status: 200, malformed: !0, env: null }
        : { ok: !0, status: 200, result: e.structured, env: null };
    case "toolError": {
      let t = yo(e.text);
      if (t === null)
        return { ok: !1, status: _o, env: null, detail: "tool-error" };
      let n =
          typeof t.status == "number" && Number.isInteger(t.status)
            ? t.status
            : _o,
        r = typeof t.retryAfter == "number" ? $n(t.retryAfter) : void 0,
        i =
          typeof t.code == "string" && t.code !== ""
            ? { code: t.code, kind: t.kind, limit: t.limit }
            : null;
      return {
        ok: !1,
        status: n,
        env: i,
        ...(r === void 0 ? {} : { retryAfterMs: r }),
        ...(i === null && n === _o ? { detail: "tool-error" } : {}),
      };
    }
    case "rpcError":
      return e.code === ho
        ? { ok: !1, status: 404, env: null, gone: !0 }
        : { ok: !1, status: _o, env: null, detail: "rpc-error" };
    case "http": {
      let t = e.retryAfterS === void 0 ? void 0 : $n(e.retryAfterS);
      return {
        ok: !1,
        status: e.status,
        env: rr(e.text),
        ...(t === void 0 ? {} : { retryAfterMs: t }),
      };
    }
    case "transport":
      return e.detail === "malformed-response"
        ? { ok: !0, status: 200, malformed: !0, env: null }
        : null;
  }
}
var xo = class {
    deps;
    client;
    constructor(e) {
      ((this.deps = e),
        (this.client = new po({
          url: "/api/artifacts/mcp/data" + e.query,
          headers: e.cpHeaders,
          ...(e.fetchFn === void 0 ? {} : { fetchFn: e.fetchFn }),
          ...(e.signalFor === void 0 ? {} : { signalFor: e.signalFor }),
          ...(e.markHandled === void 0 ? {} : { markHandled: e.markHandled }),
        })));
    }
    async call(e, t, n, r) {
      let i = this.admits(e) ? vo(e, t) : null;
      if (i === null)
        return { ok: !1, status: 400, env: { code: "invalid_argument" } };
      let a = await this.client.callTool(i.tool, i.args, {
        budgetMs: r,
        meta: this.meta(n),
      });
      if (this.deps.source !== void 0 && a.kind === "rpcError" && a.code === go)
        return (
          this.deps.onVersionChanged?.(),
          { ok: !1, status: 404, env: null, gone: !0 }
        );
      let o = bo(a);
      return this.deps.source !== void 0 &&
        o !== null &&
        o.env !== null &&
        o.env.code !== "invalid_argument" &&
        o.env.code !== "invalid-argument" &&
        Zt(o.env.code) === "invalid_argument"
        ? { ok: !1, status: _o, env: null, detail: "tool-error" }
        : o;
    }
    async subscribe(e, t, n) {
      return this.deps.source === void 0
        ? bo(
            await this.client.callTool(
              "subscribe_grant",
              { spec: e },
              { budgetMs: n, meta: this.meta(t) },
            ),
          )
        : { ok: !1, status: 400, env: { code: "invalid_argument" } };
    }
    async title(e, t) {
      if (this.deps.source === void 0) return null;
      let n = await this.client.callTool(
          "title",
          {},
          { budgetMs: t, meta: this.meta(e) },
        ),
        r = n.kind === "ok" ? n.structured?.title : void 0;
      return typeof r == "string" ? r : null;
    }
    admits(e) {
      return this.deps.source === void 0 || e === "get" || e === "query";
    }
    meta(e) {
      return {
        [mo]: {
          slug: this.deps.slug,
          ...(e === void 0 ? {} : { token: e }),
          ...(this.deps.source === void 0
            ? {}
            : {
                source: this.deps.source,
                ...(this.deps.ver === void 0 ? {} : { ver: this.deps.ver }),
              }),
        },
      };
    }
  },
  So = [
    "no_joined",
    "no_lane_db",
    "boot_stream_false",
    "opened_timeout",
    "denied",
    "denied_rate",
    "socket_down",
    "send_too_large",
    "server_reset",
    "no_fence",
    "mint_unavailable",
    "mint_rejected",
    "codec_overflow",
    "codec_decode_error",
    "deref_unavailable",
    "unknown",
  ],
  Co = [
    "kept:transport",
    "kept:server",
    "resent",
    "reclaimed",
    "migrated",
    "dropped:expired",
    "dropped:unsendable",
    "dropped:refused",
    "dropped:wiped",
    "swept:expired",
    "refused:full",
    "volatile",
  ],
  wo = class {
    sink;
    constructor(e) {
      this.sink = e;
    }
    fenceLatency(e) {
      this.sink.observe("frame_db.fence_latency_ms", e);
    }
    deltaLatency(e) {
      this.sink.observe("frame_db.delta_latency_ms", e);
    }
    mode(e) {
      this.sink.count("frame_db.mode", e);
    }
    streamNoFence() {
      this.sink.count("frame_db.stream_no_fence");
    }
    demote(e) {
      this.sink.count("frame_db.demote", So.includes(e) ? e : "unknown");
    }
    durableUnrouted() {
      this.sink.count("frame_db.durable_unrouted");
    }
    overlayAged() {
      this.sink.count("frame_db.overlay_aged");
    }
    outbox(e) {
      Co.includes(e) && this.sink.count("frame_db.outbox", e);
    }
  },
  To = 100,
  Eo = 1e3,
  Do = 6e4,
  Oo = 20,
  ko = 36e5,
  Ao = 1500,
  jo = 262144,
  Mo = 65536,
  No = 64,
  Po = To,
  Fo = 3,
  Io = 3,
  Lo = 3,
  Ro = {
    kind: "kept",
    out: { kind: "err", err: W("unavailable") },
    transport: !0,
  },
  zo = { kind: "err", err: W("unavailable") },
  Bo = {
    kind: "err",
    err: W(
      "resource_exhausted",
      "This write was sent together with others, and the document store has paused one of them, so none was saved. Try again.",
    ),
  },
  Vo = {
    stamps: 1,
    stored: !0,
    unknown: !0,
    loadRefusals: 0,
    unsupported: 0,
    rewrites: 0,
  },
  Ho = "frame-db-outbox-owner:",
  Uo = "frame-db-outbox-adopt:";
function Wo() {
  let e = new Uint8Array(16);
  crypto.getRandomValues(e);
  let t = "";
  for (let n of e) t += String.fromCharCode(n);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function Go() {
  let e = globalThis.navigator?.locks;
  return e === void 0
    ? null
    : {
        hold: (t) => {
          let n = () => void 0,
            r = new Promise((e) => (n = e));
          return (e.request(Ho + t, () => r).catch(() => void 0), () => n());
        },
        live: async () => {
          try {
            let t = await e.query(),
              n = new Map();
            for (let e of [...(t.held ?? []), ...(t.pending ?? [])])
              if (typeof e.name == "string" && e.name.startsWith(Ho)) {
                let t = e.name.slice(22);
                n.set(t, (n.get(t) ?? 0) + 1);
              }
            return n;
          } catch {
            return null;
          }
        },
        exclusive: (t, n) => e.request(t, { mode: "exclusive" }, n),
      };
}
var Ko = "frame-db-outbox-owner",
  qo = null;
function Jo(e) {
  if (qo !== null) return qo;
  try {
    let t = e?.getItem(Ko);
    if (typeof t == "string" && /^[A-Za-z0-9_-]{16,64}$/.test(t))
      return ((qo = t), t);
  } catch {}
  return Yo(Wo(), e);
}
function Yo(e, t) {
  qo = e;
  try {
    t?.setItem(Ko, e);
  } catch {}
  return e;
}
var Xo = class {
  deps;
  ownerOverride;
  identity;
  rows = [];
  bytes = 0;
  maxSeq = 0;
  transport = null;
  events = null;
  inFlight = null;
  inFlightGroup = null;
  batchOff = !1;
  unstamping = 0;
  backoffStep = 0;
  waitClass = null;
  timer = null;
  gatherSince = null;
  gatherTimer = null;
  delayed = new Map();
  lastSendAt = -1 / 0;
  notBefore = -1 / 0;
  loaded = null;
  tail = Promise.resolve();
  adoptedOnce = !1;
  wiped = !1;
  releaseOwnerLock = null;
  lockOwner = null;
  retiredLock = null;
  enqueuing = 0;
  halted = null;
  constructor(e) {
    ((this.deps = e),
      (this.identity = e.identity),
      (this.ownerOverride = e.owner ?? null),
      this.ownerOverride === null && Jo(e.ownerStore));
  }
  get owner() {
    return this.ownerOverride ?? Jo(this.deps.ownerStore);
  }
  remounted(e) {
    this.deps.mountedAt = e;
  }
  async rekeyed(e) {
    (this.releaseOwnerLock !== null || this.rows.length > 0) && this.holdFor(e);
    let t = this.rows.slice();
    for (let n of t) {
      n.row.owner !== e &&
        ((n.row = { ...n.row, owner: e }),
        await ba(this.identity, n.row, this.deps.mountedAt).catch(() => !1));
      for (let [t, r] of n.absorbed.entries())
        r.owner !== e &&
          ((n.absorbed[t] = { ...r, owner: e }),
          await ba(this.identity, n.absorbed[t], this.deps.mountedAt).catch(
            () => !1,
          ));
    }
    this.releaseRetired();
  }
  holdFor(e) {
    this.deps.locks !== null &&
      this.lockOwner !== e &&
      (this.releaseOwnerLock !== null &&
        (this.releaseRetired(), (this.retiredLock = this.releaseOwnerLock)),
      (this.releaseOwnerLock = this.deps.locks.hold(e)),
      (this.lockOwner = e));
  }
  releaseRetired() {
    (this.retiredLock?.(), (this.retiredLock = null));
  }
  markLive() {
    this.holdFor(this.owner);
  }
  markIdle() {
    this.rows.length === 0 &&
      this.enqueuing === 0 &&
      (this.releaseRetired(),
      this.releaseOwnerLock !== null &&
        (this.releaseOwnerLock(),
        (this.releaseOwnerLock = null),
        (this.lockOwner = null)));
  }
  attach(e, t) {
    return (
      (this.transport = e),
      (this.events = t),
      (this.halted = null),
      (this.batchOff = !1),
      (this.loaded = this.reclaim()),
      this.loaded
    );
  }
  reclaim() {
    ((this.backoffStep = 0),
      (this.waitClass = null),
      this.clearTimer(),
      this.halted === "unavailable" &&
        this.transport !== null &&
        (this.halted = null));
    let e = this.tail.then(() => this.adopt()).catch(() => void 0);
    return ((this.tail = e), e);
  }
  detach(e) {
    this.transport === e && this.halt("revoked");
  }
  halt(e = "revoked") {
    ((this.halted = e), this.clearTimer());
    for (let [e, t] of this.delayed) (clearTimeout(e), t());
    e === "revoked" && ((this.transport = null), (this.events = null));
    let t = { kind: "err", err: W(e) },
      n = [];
    for (let e of this.rows) {
      let r = e.waiters.splice(0);
      for (let e of r) e(t);
      r.length > 0 && n.push(e.row);
    }
    n.length > 0 && this.events?.onAdopted(n);
  }
  wipe() {
    this.wiped = !0;
    let e = this.events,
      t = this.rows.splice(0);
    ((this.bytes = 0),
      this.markIdle(),
      t.length > 0 && this.note("dropped:wiped"),
      this.halt());
    let n = { kind: "err", err: W("unavailable") };
    for (let r of t) {
      let t = r.waiters.splice(0);
      for (let e of t) e(n);
      let i = t.length > 0;
      e?.onSettle(r.row, n, i);
      for (let t of r.absorbed) e?.onSettle(t, n, i);
    }
  }
  pending() {
    return this.rows.map((e) => e.row);
  }
  inherited() {
    return this.rows.filter((e) => e.waiters.length === 0).map((e) => e.row);
  }
  get size() {
    return this.rows.length;
  }
  get backingOff() {
    return (
      this.backoffStep > 0 ||
      this.halted !== null ||
      this.notBefore > Date.now()
    );
  }
  async enqueue(e) {
    let t = () => ({
        owner: this.owner,
        idem: Wo(),
        verb: e.verb,
        path: e.path,
        ...(e.data === void 0 ? {} : { data: e.data }),
        ...(e.replace === void 0 ? {} : { replace: e.replace }),
      }),
      n = () => ({
        count: this.rows.length,
        bytes: this.bytes,
        minSeq: this.maxSeq,
        mountedAt: this.deps.mountedAt,
      });
    (this.enqueuing++, this.markLive());
    let r,
      i = !1;
    try {
      let e = this.tail.then(async () => {
        let e = t(),
          r = ya(this.identity, e, n()),
          a = await Qo(r, Ao);
        return a === null
          ? ((i = !0),
            r.then(
              (e) => Sa(this.identity, [e]),
              () => void 0,
            ),
            ya(this.identity, e, { ...n(), memoryOnly: !0 }))
          : a;
      });
      ((this.tail = e.catch(() => void 0)), (r = await e));
    } catch (e) {
      return (
        this.enqueuing--,
        this.markIdle(),
        e instanceof bi
          ? (this.note("refused:full"),
            {
              kind: "err",
              err: W(
                "resource_exhausted",
                "Too many unsent writes are waiting for the document store; retry once it is reachable.",
              ),
            })
          : { kind: "err", err: W("unavailable") }
      );
    }
    return (
      this.enqueuing--,
      this.wiped
        ? (Sa(this.identity, [r]).catch(() => void 0),
          this.markIdle(),
          { kind: "err", err: W("unavailable") })
        : (r.volatile && this.note("volatile"),
          new Promise((e) => {
            let t = {
              row: r,
              waiters: [e],
              absorbed: [],
              retried: !1,
              ...(i ? { solo: !0 } : {}),
            };
            if ((this.coalesce(t) || this.insert(t), this.halted !== null)) {
              for (let e of t.waiters.splice(0))
                e({ kind: "err", err: W(this.halted) });
              this.events?.onAdopted([t.row]);
              return;
            }
            this.pump();
          }))
    );
  }
  kick() {
    this.backoffStep !== 0 &&
      this.waitClass === "transport" &&
      ((this.backoffStep = 0),
      (this.waitClass = null),
      this.clearTimer(),
      this.pump());
  }
  has(e) {
    return this.rows.some(
      (t) => t.row.seq === e.seq && !t.row.volatile == !e.volatile,
    );
  }
  holds(e) {
    let t = (t) =>
      t.idem === e.idem || (t.seq === e.seq && !t.volatile == !e.volatile);
    return this.rows.some((e) => t(e.row) || e.absorbed.some(t));
  }
  insert(e) {
    if (this.has(e.row)) return !1;
    this.maxSeq = Math.max(this.maxSeq, e.row.seq);
    let t = this.rows.length;
    for (
      ;
      t > 0 &&
      this.rows[t - 1].row.seq > e.row.seq &&
      this.rows[t - 1] !== this.inFlight &&
      (this.inFlightGroup === null ||
        this.rows[t - 1].group !== this.inFlightGroup);
    )
      t--;
    return (
      this.rows.splice(t, 0, e),
      (this.bytes += e.row.size),
      this.markLive(),
      !0
    );
  }
  remove(e) {
    let t = this.rows.indexOf(e);
    t !== -1 && (this.rows.splice(t, 1), (this.bytes -= e.row.size));
  }
  coalesce(e) {
    let t = this.rows.filter(
      (t) =>
        t !== this.inFlight && t.group === void 0 && t.row.path === e.row.path,
    );
    if (t.length === 0) return !1;
    if (e.row.verb === "update") {
      let n = t[t.length - 1];
      if (
        n.sent === !0 ||
        (this.halted === null && n !== this.rows[this.rows.length - 1]) ||
        n.row.verb === "delete" ||
        !n.row.volatile != !e.row.volatile
      )
        return !1;
      let r = n.row.data,
        i = e.row.data,
        a = n.row.replace === !0;
      if (!mr(r) || !mr(i) || pr(r) !== pr(i) || (!a && !Zo(r, i))) return !1;
      let o = a ? sr(r, i) : cr(r, i),
        s = ma(n.row.path, o);
      return s > jo
        ? !1
        : ((this.bytes += s - n.row.size),
          (n.row = { ...n.row, data: o, size: s, idem: Wo() }),
          this.halted === null && n.waiters.push(...e.waiters),
          n.absorbed.push(e.row, ...e.absorbed),
          ba(this.identity, n.row, this.deps.mountedAt)
            .then((t) => (t ? Sa(this.identity, [e.row]) : void 0))
            .catch(() => void 0),
          !0);
    }
    let n = t.filter((t) => !t.row.volatile == !e.row.volatile);
    for (let t of n) {
      (this.remove(t),
        (e.retried ||= t.retried),
        (t.sent === !0 || t.follows === !0) && (e.follows = !0));
      for (let n of t.waiters) e.waiters.push(n);
      e.absorbed.push(t.row);
      for (let n of t.absorbed) e.absorbed.push(n);
    }
    return (
      Sa(
        this.identity,
        n.map((e) => e.row),
      ).catch(() => void 0),
      !1
    );
  }
  async adopt() {
    if (this.wiped || this.halted !== null) return;
    let e = this.deps.locks;
    if (e === null && this.adoptedOnce) {
      this.pump();
      return;
    }
    this.adoptedOnce = !0;
    let t = async () => {
        let t = [],
          n = await _a(this.identity, (e) => {
            t = e;
          }).catch(() => []),
          r = e === null ? null : await e.live().catch(() => null);
        for (let e of t)
          !this.holds(e) &&
            (e.owner === this.owner || !r?.get(e.owner)) &&
            this.note("dropped:expired");
        let i = new Set([this, ...$o.values()]),
          a = this.owner,
          o = [...i].filter((e) => e.lockOwner === a).length;
        if (
          r !== null &&
          (r.get(this.owner) ?? 0) > o &&
          this.ownerOverride === null
        ) {
          let e = Yo(Wo(), this.deps.ownerStore);
          await this.rekeyed(e);
          for (let t of i)
            t !== this &&
              (t.tail = t.tail.then(() => t.rekeyed(e)).catch(() => void 0));
        }
        let s = [];
        for (let e of n)
          ((this.maxSeq = Math.max(this.maxSeq, e.seq)),
            e.owner === this.owner && !this.holds(e) && s.push(e));
        return s;
      },
      n = (e === null ? t() : e.exclusive(Uo + this.identity, t)).catch(
        () => [],
      );
    (n.then((e) => {
      if (this.wiped) return;
      let t = new Map();
      for (let n of e) {
        let e = {
          row: n,
          waiters: [],
          absorbed: [],
          retried: (n.failures ?? 0) > 0,
          sent: !0,
        };
        if (!(!this.insert(e) || n.group === void 0)) {
          if (typeof n.group?.key == "string")
            t.set(n.group.key, [...(t.get(n.group.key) ?? []), e]);
          else {
            let { group: t, ...r } = n;
            e.row = r;
          }
        }
      }
      for (let [e, n] of t) this.regroup(e, n);
      (e.length > 0 &&
        (this.events?.onAdopted(e.filter((e) => this.holds(e))),
        this.note("reclaimed")),
        this.pump());
    }),
      await Qo(n, Ao));
  }
  regroup(e, t) {
    let n = t.slice().sort((e, t) => e.row.group.i - t.row.group.i),
      r = n[0].row.group.n;
    if (
      n.length !== r ||
      !n.every((e, t) => e.row.group.i === t && e.row.group.n === r)
    ) {
      (n.forEach(() => this.note("dropped:unsendable")),
        this.finishGroup(
          { ...Vo, key: e, members: n },
          n.map(() => zo),
        ));
      return;
    }
    let i = { ...Vo, key: e, members: n };
    for (let e of n) e.group = i;
  }
  headRun(e, t) {
    let n = [],
      r = new Set(),
      i = 0;
    for (let a of this.rows) {
      if (
        ((i += a.row.size + No),
        n.length >= t ||
          a.group !== void 0 ||
          a.solo === !0 ||
          a.sent === !0 ||
          r.has(a.row.path) ||
          !a.row.volatile != !this.rows[0].row.volatile ||
          i > Mo ||
          !e.clear(a.row))
      )
        return { members: n, open: !1 };
      (n.push(a), r.add(a.row.path));
    }
    return { members: n, open: n.length < t };
  }
  gathering(e) {
    if (this.enqueuing === 0) return !1;
    this.gatherSince ??= e;
    let t = this.gatherSince + Po - e;
    return t <= 0
      ? !1
      : ((this.gatherTimer ??= setTimeout(() => {
          ((this.gatherTimer = null), this.pump());
        }, t)),
        !0);
  }
  endGather() {
    ((this.gatherSince = null),
      this.gatherTimer !== null &&
        (clearTimeout(this.gatherTimer), (this.gatherTimer = null)));
  }
  form(e) {
    let t = {
      key: Wo(),
      members: e,
      stamps: 0,
      stored: !1,
      unknown: !1,
      loadRefusals: 0,
      unsupported: 0,
      rewrites: 0,
    };
    for (let [n, r] of e.entries())
      ((r.group = t),
        (r.row = { ...r.row, group: { key: t.key, i: n, n: e.length } }));
    return t;
  }
  ungroup(e) {
    for (let t of e) {
      let { group: e, ...n } = t.row;
      ((t.row = n), delete t.group, (t.solo = !0));
    }
  }
  dissolve(e) {
    this.unstamping++;
    let t = e.stamps,
      n = xa(
        this.identity,
        e.members
          .filter((e) => this.rows.includes(e))
          .map(({ row: { group: e, ...t } }) => t),
        this.deps.mountedAt,
      ).catch(() => !1),
      r = () => e.members.some((t) => t.group === e && this.rows.includes(t));
    Qo(n, Ao).then((i) => {
      if ((this.unstamping--, !this.wiped)) {
        if (!r()) {
          this.pump();
          return;
        }
        if (i === !0) {
          (this.ungroup(e.members), this.pump());
          return;
        }
        if (
          (n.then((n) => {
            n &&
              !this.wiped &&
              r() &&
              e.stamps === t &&
              (this.ungroup(e.members), this.pump());
          }),
          (e.stored = !1),
          ++e.rewrites >= Io)
        )
          ((this.backoffStep = 0),
            (this.waitClass = null),
            e.members.forEach(() => this.note("dropped:unsendable")),
            this.finishGroup(
              e,
              e.members.map(() => zo),
            ));
        else if (this.timer === null) {
          this.backOff(!1);
          return;
        }
        this.pump();
      }
    });
  }
  pump() {
    if (
      this.inFlight !== null ||
      this.inFlightGroup !== null ||
      this.unstamping > 0 ||
      this.transport === null ||
      this.halted !== null ||
      this.timer !== null
    )
      return;
    let e = Date.now();
    for (; this.rows.length > 0 && this.rows[0].row.enqueuedAt + 6048e5 <= e;) {
      let e = this.rows[0],
        t = e.group;
      if (t?.unknown === !0) {
        (t.members.forEach(() => this.note("dropped:expired")),
          this.finishGroup(
            t,
            t.members.map(() => zo),
          ));
        continue;
      }
      if (t !== void 0) {
        this.dissolve(t);
        return;
      }
      (this.note("dropped:expired"),
        this.finish(e, { kind: "err", err: W("unavailable") }));
    }
    if (this.rows.length === 0) {
      this.endGather();
      return;
    }
    let t = this.deps.random ?? Math.random,
      n = this.notBefore > e ? this.notBefore - e + t() * Eo : 0,
      r = Math.max(this.lastSendAt + To - e, n);
    if (r > 0) {
      (n === 0 && (this.gatherSince ??= e),
        (this.timer = setTimeout(() => {
          ((this.timer = null), this.pump());
        }, r)));
      return;
    }
    let i = this.rows[0],
      a = this.transport,
      o = a.batch,
      s = o !== void 0 && !this.batchOff && o.max >= 2;
    if (i.group !== void 0 && !i.group.unknown && !s) {
      this.dissolve(i.group);
      return;
    }
    let c = i.group ?? null;
    if (c === null && s) {
      let t = this.headRun(o, o.max);
      if (t.open && this.gathering(e)) return;
      c = t.members.length >= 2 ? this.form(t.members) : null;
    }
    if ((this.endGather(), c !== null)) {
      this.sendGroup(c, a);
      return;
    }
    this.inFlight = i;
    let l = i.sent === !0 || i.follows === !0;
    ((i.sent = !0),
      (this.lastSendAt = e),
      a
        .send(i.row, {
          quiet: this.backoffStep > 0,
          wanted: () => !this.wiped,
          resend: l,
        })
        .then(
          (e) => this.onSent(i, a, e),
          () =>
            this.onSent(i, a, {
              out: { kind: "err", err: W("unavailable") },
              transport: !0,
            }),
        ));
  }
  onSent(e, t, n) {
    if (((this.inFlight = null), this.wiped)) return;
    if (n === "detached") {
      this.transport === t ? this.halt("unavailable") : this.pump();
      return;
    }
    let { out: r } = n;
    if (r.kind === "ok") {
      ((this.backoffStep = 0),
        (this.waitClass = null),
        e.retried && this.note("resent"),
        this.finish(e, r),
        this.pump());
      return;
    }
    let i = r.err.code;
    if (i === "revoked") {
      if (this.transport === t) {
        let e = this.events;
        (this.halt("revoked"), e?.onRevoked());
      } else this.pump();
      return;
    }
    if (
      n.drop === void 0 &&
      (i === "unavailable" || i === "resource_exhausted" || n.answered === !1)
    ) {
      if (!n.transport) {
        if (
          ((e.row = {
            ...e.row,
            failures: (e.row.failures ?? 0) + 1,
            firstFailedAt: e.row.firstFailedAt ?? Date.now(),
          }),
          e.row.failures >= Oo && Date.now() - e.row.firstFailedAt >= ko)
        ) {
          ((this.backoffStep = 0),
            (this.waitClass = null),
            this.note("dropped:unsendable"),
            this.finish(e, r),
            this.pump());
          return;
        }
        ba(this.identity, e.row, this.deps.mountedAt).catch(() => void 0);
      }
      ((e.retried = !0), this.backOff(n.transport, n.retryAfterMs));
      return;
    }
    (n.drop !== void 0 && this.note(`dropped:${n.drop}`),
      (this.backoffStep = 0),
      (this.waitClass = null),
      this.finish(e, r, n.delayMs),
      this.pump());
  }
  backOff(e, t = 0) {
    this.backoffStep === 0 && this.note(e ? "kept:transport" : "kept:server");
    let n = Math.min(t, Do);
    this.notBefore = Math.max(this.notBefore, Date.now() + n);
    let r =
      n +
      (this.deps.random ?? Math.random)() *
        Math.min(Do, Eo * 2 ** this.backoffStep);
    ((this.backoffStep = Math.min(this.backoffStep + 1, 16)),
      (this.waitClass = e ? "transport" : "server"),
      (this.timer = setTimeout(() => {
        ((this.timer = null), this.pump());
      }, r)));
  }
  sendGroup(e, t) {
    this.inFlightGroup = e;
    let n = e.stamps === 0;
    (e.stored || e.stamps++,
      Qo(
        e.stored
          ? Promise.resolve(!0)
          : xa(
              this.identity,
              e.members.map((e) => e.row),
              this.deps.mountedAt,
            ).catch(() => !1),
        Ao,
      ).then((r) => {
        if (((this.inFlightGroup = null), this.wiped)) return;
        if (((e.stored = r === !0), r === !1 && n)) {
          (this.ungroup(e.members), this.pump());
          return;
        }
        if (!e.stored) {
          ((this.batchOff = !0), this.dissolve(e));
          return;
        }
        let i = t.batch;
        if (this.transport !== t || this.halted !== null) {
          this.pump();
          return;
        }
        if (i === void 0) {
          this.keepGroup(e, zo, !1);
          return;
        }
        ((this.inFlightGroup = e),
          (this.lastSendAt = Date.now()),
          i
            .send(
              e.members.map((e) => e.row),
              e.key,
              {
                quiet: this.backoffStep > 0,
                wanted: () => !this.wiped,
                resend: e.unknown,
              },
            )
            .then(
              (n) => this.onGroupSent(e, t, n),
              () => this.onGroupSent(e, t, Ro),
            ));
      }));
  }
  onGroupSent(e, t, n) {
    if (((this.inFlightGroup = null), this.wiped)) return;
    if (n === "detached") {
      this.transport === t ? this.halt("unavailable") : this.pump();
      return;
    }
    if (n.kind === "ok" && n.versions.length === e.members.length) {
      ((this.backoffStep = 0), (this.waitClass = null));
      for (let t of e.members) t.retried && this.note("resent");
      (this.finishGroup(
        e,
        n.versions.map((e) => ({
          kind: "ok",
          result: e === null ? {} : { version: e },
        })),
      ),
        this.pump());
      return;
    }
    if (n.kind === "ok") {
      ((e.unknown = !0), (e.unsupported = 0), this.keepGroup(e, zo, !1));
      return;
    }
    if (n.kind === "refused") {
      if (
        (n.why === "unsupported" &&
          this.transport === t &&
          (this.batchOff = !0),
        n.why === "store" || !e.unknown)
      ) {
        ((e.unsupported = 0),
          (this.backoffStep = 0),
          (this.waitClass = null),
          this.dissolve(e),
          this.pump());
        return;
      }
      ((e.unsupported = n.why === "unsupported" ? e.unsupported + 1 : 0),
        this.keepGroup(
          e,
          n.why === "paused" ? Bo : zo,
          !1,
          !1,
          n.retryAfterMs,
        ));
      return;
    }
    e.unsupported = 0;
    let r = n;
    if (r.out.kind === "err" && r.out.err.code === "revoked") {
      if (this.transport === t) {
        let e = this.events;
        (this.halt("revoked"), e?.onRevoked());
      } else this.pump();
      return;
    }
    (r.precommit !== !0 && (e.unknown = !0),
      this.keepGroup(
        e,
        r.out,
        r.transport,
        r.precommit === !0,
        r.retryAfterMs,
      ));
  }
  keepGroup(e, t, n, r = !1, i = 0) {
    if (!n) {
      let n = Date.now();
      for (let t of e.members)
        t.row = {
          ...t.row,
          failures: (t.row.failures ?? 0) + 1,
          firstFailedAt: t.row.firstFailedAt ?? n,
        };
      let i = e.members[0].row;
      if (
        e.unsupported >= Lo ||
        (i.failures >= Oo && n - i.firstFailedAt >= ko)
      ) {
        ((this.backoffStep = 0),
          (this.waitClass = null),
          e.members.forEach(() => this.note("dropped:unsendable")),
          this.finishGroup(
            e,
            e.members.map(() => t),
          ),
          this.pump());
        return;
      }
      ((e.loadRefusals = r && !e.unknown ? e.loadRefusals + 1 : 0),
        e.loadRefusals >= Fo
          ? this.dissolve(e)
          : (e.stamps++,
            xa(
              this.identity,
              e.members.map((e) => e.row),
              this.deps.mountedAt,
            ).catch(() => !1)));
    }
    for (let t of e.members) t.retried = !0;
    this.backOff(n, i);
  }
  finishGroup(e, t) {
    for (let t of e.members) this.remove(t);
    Sa(
      this.identity,
      e.members.flatMap((e) => [e.row, ...e.absorbed]),
    )
      .catch(() => void 0)
      .then(() => this.markIdle());
    for (let [n, r] of e.members.entries()) this.settle(r, t[n]);
  }
  finish(e, t, n = 0) {
    if (
      (this.remove(e),
      Sa(this.identity, [e.row, ...e.absorbed])
        .catch(() => void 0)
        .then(() => this.markIdle()),
      n <= 0 || e.waiters.length === 0)
    ) {
      this.settle(e, t);
      return;
    }
    let r = () => {
        (this.delayed.delete(i), this.settle(e, t));
      },
      i = setTimeout(r, n);
    this.delayed.set(i, r);
  }
  settle(e, t) {
    let n = e.waiters.splice(0);
    for (let e of n) e(t);
    let r = n.length > 0;
    this.events?.onSettle(e.row, t, r);
    for (let n of e.absorbed) this.events?.onSettle(n, t, r);
  }
  clearTimer() {
    (this.timer !== null && (clearTimeout(this.timer), (this.timer = null)),
      this.endGather());
  }
  note(e) {
    try {
      this.events?.onEvent?.(e);
    } catch {}
  }
};
function Zo(e, t) {
  for (let [n, r] of Object.entries(t)) {
    if (!pr(r) || !Object.prototype.hasOwnProperty.call(e, n)) continue;
    let t = e[n];
    if (!pr(t) || !Zo(t, r) || (fr(cr(t, r)) && !(fr(t) && fr(r)))) return !1;
  }
  return !0;
}
function Qo(e, t) {
  return new Promise((n) => {
    let r = setTimeout(() => n(null), t);
    e.then(
      (e) => {
        (clearTimeout(r), n(e));
      },
      () => {
        (clearTimeout(r), n(null));
      },
    );
  });
}
var $o = new Map();
function es(e, t, n, r = Go()) {
  let i = $o.get(e);
  return (
    i
      ? i.remounted(t)
      : ((i = new Xo({ identity: e, mountedAt: t, locks: r, ownerStore: n })),
        $o.set(e, i)),
    i
  );
}
function ts() {
  for (let e of $o.values()) e.wipe();
  $o.clear();
}
var ns = "docs",
  rs = 262151,
  is = /^doc_(?:[a-z]{1,16}_)?01[1-9A-HJ-NP-Za-km-z]{22}$/,
  as = /^[A-Za-z0-9_-]{1,256}$/,
  os = (e) => typeof e == "string" && as.test(e),
  ss = (e) => e instanceof Uint8Array,
  cs = (e) => e === null || os(e);
function ls(e, t) {
  let n = Object.keys(e);
  return n.length === t.length && t.every((e) => n.includes(e));
}
function us(e, t) {
  let n = t[0];
  if (t.length !== 1 || typeof n != "object" || !n) return null;
  let r = Object.getPrototypeOf(n);
  if (r !== Object.prototype && r !== null) return null;
  let i = n;
  if (e === "create")
    return ls(i, ["run"]) && ss(i.run)
      ? { method: e, ask: { run: i.run } }
      : null;
  if (typeof i.id != "string") return null;
  let a = i.id;
  return e === "open" || e === "len" || e === "close"
    ? ls(i, ["id"])
      ? { method: e, ask: { id: a } }
      : null
    : e === "read"
      ? ls(i, ["id", "mark"]) && cs(i.mark)
        ? { method: e, ask: { id: a, mark: i.mark } }
        : null
      : e === "appendAt" &&
          ls(i, ["id", "mark", "bytes"]) &&
          cs(i.mark) &&
          ss(i.bytes)
        ? { method: e, ask: { id: a, mark: i.mark, bytes: i.bytes } }
        : null;
}
var ds = "ctrl:opened",
  fs = "ctrl:stream_reset",
  ps = "ctrl:stream_denied",
  ms = "ctrl:receipt_ack",
  hs = "ctrl:send_refused",
  gs = "ctrl:close",
  _s = /^doc\.\d{1,3}$/;
function vs(e) {
  return "doc." + String(e);
}
function ys(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return typeof t.lane != "string" ||
    !Array.isArray(t.stores) ||
    !t.stores.every((e) => typeof e == "string")
    ? null
    : { stores: t.stores, door: t.door === !0 };
}
function bs(e, t, n) {
  if (typeof e != "string" || e === "") return "UNKNOWN";
  let r = e.toUpperCase(),
    i = r.startsWith(t) ? r.slice(t.length) : r;
  return n.find((e) => e === i) ?? "UNKNOWN";
}
var xs = [
    "GRANT",
    "RATE",
    "STREAM_LIMIT",
    "NOT_JOINED",
    "UNAVAILABLE",
    "LANE_DISABLED",
    "DENIED",
    "BAD_SPEC",
  ],
  Ss = [
    "RETENTION",
    "GENERATION",
    "ROTATION",
    "SERVER",
    "OVERFLOW",
    "PROTOCOL",
  ],
  Cs = [
    "NOT_OPEN",
    "NOT_SENDABLE",
    "NOT_WRITABLE",
    "TOO_BIG",
    "BAD_PAYLOAD",
    "RATE_LIMITED",
    "RESEND_FROM",
    "WINDOW_FULL",
    "GRANT_EXPIRED",
    "GRANT_MISMATCH",
  ],
  ws = ["ACCEPTED", "REJECTED"];
function Ts(e) {
  return bs(e, "STREAM_DENIED_REASON_", xs);
}
function Es(e) {
  return bs(e, "STREAM_RESET_REASON_", Ss);
}
function Ds(e) {
  return bs(e, "SEND_REFUSED_REASON_", Cs);
}
function Os(e) {
  return bs(e, "SEND_STATUS_", ws);
}
function ks(e) {
  return typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
}
function As(e) {
  let t = typeof e == "string" && /^\d{1,16}$/.test(e) ? Number(e) : e;
  return ks(t) ? t : null;
}
function js(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return null;
  let t = Math.floor(e);
  return t >= 0 && t <= 6e5 ? t : null;
}
function Ms(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return typeof t.stream != "string" || !_s.test(t.stream)
    ? null
    : {
        stream: t.stream,
        reason: t.reason,
        ack: ks(t.ack) ? t.ack : null,
        seq: ks(t.seq) ? t.seq : null,
        expected: As(t.expected),
        retryAfterMs: js(t.retryAfterMs ?? t.retry_after_ms),
      };
}
function Ns(e) {
  return { stream: e.stream, grant: e.grant, spec: e.spec, since: e.since };
}
function Ps(e) {
  return { stream: e };
}
function Fs(e) {
  return { stream: e.stream, grant: e.grant };
}
var Is = /^[A-Za-z0-9+/]*={0,2}$/;
function Ls(e) {
  if (!Is.test(e)) return null;
  let t = e.length - e.replace(/=+$/, "").length,
    n = e.length - t;
  if (n % 4 == 1 || (t > 0 && (n + t) % 4 != 0)) return null;
  let r;
  try {
    r = atob(e);
  } catch {
    return null;
  }
  let i = new Uint8Array(r.length);
  for (let e = 0; e < r.length; e++) i[e] = r.charCodeAt(e);
  return i;
}
function Rs(e) {
  let t = "";
  for (let n = 0; n < e.length; n += 32768)
    t += String.fromCharCode(...e.subarray(n, n + 32768));
  return btoa(t);
}
function zs(e) {
  if (typeof e != "object" || !e || Array.isArray(e)) return null;
  let t = e;
  if (t.caught_up === !0)
    return ks(t.len) && os(t.mark)
      ? { kind: "fence", len: t.len, mark: t.mark }
      : null;
  if (t.b64 !== void 0) {
    if (typeof t.b64 != "string" || !os(t.mark)) return null;
    let e = Ls(t.b64);
    return e === null || e.length === 0
      ? null
      : { kind: "run", bytes: e, mark: t.mark };
  }
  return { kind: "unknown" };
}
var Bs = ["moved", "frame", "size", "full", "denied"];
function Vs(e, t) {
  return { b64: Rs(t), ...(e === null ? {} : { mark: e }) };
}
function Hs(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return typeof t.stream != "string" || !_s.test(t.stream) || !ks(t.seq)
    ? null
    : { stream: t.stream, seq: t.seq, status: Os(t.status), body: t.body };
}
function Us(e, t) {
  if (typeof t != "object" || !t || Array.isArray(t)) return null;
  let n = t;
  return e === "ACCEPTED"
    ? ks(n.len) && os(n.mark)
      ? { mark: n.mark, len: n.len }
      : null
    : e !== "REJECTED" || typeof n.reason != "string"
      ? null
      : { refused: Bs.find((e) => e === n.reason) ?? "frame" };
}
var Ws = (e) => "/api/frame/docs/" + encodeURIComponent(e) + "/create",
  Gs = (e) => "/api/frame/lane/doc/" + encodeURIComponent(e) + "/subscribe",
  Ks = (e, t) => JSON.stringify({ token: e, b64: Rs(t) }),
  qs = 2e4,
  Js = 300,
  Ys = 3600;
async function Xs(e, t, n) {
  let r = e.fetchFn ?? fetch;
  try {
    let i = await r(t + e.query, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", ...e.cpHeaders },
      body: n,
      ...(e.signalFor === void 0 ? {} : { signal: e.signalFor(qs) }),
    });
    return {
      status: i.status,
      text: await i.text(),
      retryAfter: i.headers.get("retry-after"),
    };
  } catch (t) {
    return (e.markHandled?.(t), null);
  }
}
function Zs(e) {
  try {
    let t = JSON.parse(e);
    return typeof t == "object" && t && !Array.isArray(t) ? t : null;
  } catch {
    return null;
  }
}
function Qs(e) {
  return Zs(e)?.error?.kind;
}
async function $s(e, t) {
  let n = await Xs(e, Ws(e.slug), t);
  if (n === null || n.status >= 500) return { kind: "unavailable" };
  if (n.status === 200) {
    let e = Zs(n.text);
    return e !== null &&
      typeof e.id == "string" &&
      is.test(e.id) &&
      os(e.mark) &&
      ks(e.len)
      ? { kind: "ok", id: e.id, mark: e.mark, len: e.len }
      : { kind: "unavailable" };
  }
  let r = Qs(n.text);
  return n.status === 400 && r === "frame"
    ? { kind: "refused", code: "frame" }
    : n.status === 413 && r === "size"
      ? { kind: "refused", code: "size" }
      : n.status === 409 && r === "documents"
        ? { kind: "refused", code: "documents" }
        : n.status === 429
          ? { kind: "refused", code: "rate" }
          : n.status === 403 && r === "token"
            ? { kind: "refused", code: "token" }
            : {
                kind: "refused",
                code: "denied",
                ...((n.status === 401 ||
                  n.status === 403 ||
                  n.status === 404) && { mayBeToken: !0 }),
              };
}
async function ec(e, t, n) {
  let r = e.now?.() ?? Date.now(),
    i = await Xs(e, Gs(e.slug), JSON.stringify({ token: t, doc: n }));
  if (i === null) return { kind: "unavailable" };
  if (i.status >= 500 || i.status === 429) {
    let e = /^\d{1,9}$/.test(i.retryAfter ?? "") ? Number(i.retryAfter) : 0;
    return {
      kind: "unavailable",
      ...(e > 0 && { retryAfterMs: Math.min(e * 1e3, 6e5) }),
      ...(i.status === 429 && { rateLimited: !0 }),
    };
  }
  if (i.status === 404) return { kind: "not_found" };
  if (i.status !== 200) return { kind: "denied" };
  let a = Zs(i.text);
  if (
    a === null ||
    typeof a.grant != "string" ||
    a.grant === "" ||
    typeof a.spec != "string" ||
    a.spec === "" ||
    (a.role !== "writer" && a.role !== "viewer")
  )
    return { kind: "unavailable" };
  let o =
    typeof a.expires_in == "number" && a.expires_in > 0
      ? Math.min(a.expires_in, Ys)
      : Js;
  return {
    kind: "ok",
    grant: a.grant,
    spec: a.spec,
    role: a.role,
    expiresAtMs: Math.min(r, e.now?.() ?? Date.now()) + o * 1e3,
  };
}
var tc = (e) => e.toLowerCase(),
  nc = 6e4,
  rc = new WeakMap();
function ic(e) {
  let t = rc.get(e);
  if (t !== void 0) return t;
  let n = 0,
    r = new Set(),
    i = new Set(),
    a = new Map();
  e.onDown(() => {
    ((n = 0), r.clear(), i.clear(), a.clear());
  });
  let o = {
    next(e) {
      let t;
      if (n < 1e3) t = vs(n++);
      else {
        let [n] = a;
        if (n === void 0) return null;
        let r = n[1];
        if (e >= r && e - r < nc) return null;
        ((t = n[0]), a.delete(t), i.delete(t));
      }
      return (r.add(t), t);
    },
    release(e, t) {
      r.delete(e) && a.set(e, t);
    },
    orphan(e, t) {
      return r.has(e) || i.has(e)
        ? !1
        : (i.add(e), a.delete(e) && a.set(e, t), !0);
    },
  };
  return (rc.set(e, o), o);
}
function ac(e) {
  let t = ys(e);
  return t !== null && t.door && t.stores.includes("doc");
}
var oc = "ctrl:access_changed",
  sc = 4e3,
  cc = 3e4,
  lc = 500,
  uc = 500,
  dc = 3e4,
  fc = 6,
  pc = 3e4,
  mc = 3e5,
  hc = 1e4,
  gc = 3,
  _c = 3,
  vc = 3e4,
  yc = 1e4,
  bc = 3e4,
  xc = 1e4,
  Sc = 5e3,
  Cc = 12e4,
  wc = 8e3,
  Tc = 8e3,
  Ec = 5e3;
function Dc(e) {
  return Object.assign(Error("docs lane: " + e), {
    code: "docs_lane",
    reason: e,
  });
}
var Oc = class {
    deps;
    state = "idle";
    listed = !1;
    socketGen = 0;
    mintGen = 0;
    name = null;
    presented = null;
    presentedEndsMs = 0;
    protocolRetried = !1;
    role;
    mark = null;
    base = null;
    chunks = [];
    docLen = -1;
    fenced = !1;
    fencedAt = 0;
    voided = !1;
    cached;
    grantRetried = !1;
    unavailable = 0;
    refusals = { n: 0, since: 0 };
    rechecks = -1;
    flaps = 0;
    retries = 0;
    forced = { n: 0, at: 0 };
    reopenAt = 0;
    sendSeq = 0;
    pending = null;
    reading = null;
    refreshRetryMs = Sc;
    openedTimer = null;
    frameTimer = null;
    retryTimer = null;
    refreshTimer = null;
    rateTimer = null;
    stopped = !1;
    unsubs = [];
    constructor(e) {
      ((this.deps = e),
        (this.cached = e.seed),
        (this.role = e.seed.granted.role),
        this.unsubs.push(
          e.sync.onLaneCtrl((e) => this.onLaneCtrl(e)),
          e.sync.onStream((e) => this.onStreamFrame(e)),
          e.sync.onDown(() => this.onDown()),
          e.sync.onNotice?.((e) => this.onNotice(e.kind)) ?? (() => void 0),
          e.sync.onTerminal?.(() => this.askDoor()) ?? (() => void 0),
        ),
        this.readJoined(e.sync.currentJoined()),
        this.maybeOpen());
    }
    read(e) {
      if (this.stopped) return Promise.reject(Dc("stopped"));
      if ((this.failRead("superseded"), this.voided)) {
        if (e !== null) return Promise.resolve({ refused: "layout" });
        this.voided = !1;
      }
      return (
        e !== this.base && this.restartFrom(e),
        this.caughtUp()
          ? Promise.resolve(this.take())
          : this.onItsWay()
            ? new Promise((t, n) => {
                let r = setTimeout(
                  () => this.failRead("timeout"),
                  this.deps.readWaitMs ?? Tc,
                );
                this.reading = { from: e, timer: r, resolve: t, reject: n };
              })
            : Promise.reject(Dc("not_open"))
      );
    }
    appendAt(e, t) {
      return this.stopped
        ? Promise.reject(Dc("stopped"))
        : this.pending === null
          ? this.state === "open"
            ? this.now() >= this.presentedEndsMs
              ? (this.refreshTimer !== null &&
                  this.refreshRetryMs === Sc &&
                  this.refusals.n === 0 &&
                  this.scheduleRefresh(this.jitter(0)),
                Promise.resolve({ refused: "rate" }))
              : t.length > 262151
                ? Promise.resolve({ refused: "size" })
                : new Promise((n, r) => {
                    ((this.pending = {
                      payload: Vs(e, t),
                      seq: 0,
                      resent: !1,
                      timer: null,
                      resolve: n,
                      reject: r,
                    }),
                      this.fenced
                        ? this.dispatchAppend()
                        : this.armAppendTimer(this.pending));
                  })
            : Promise.reject(Dc("not_open"))
          : Promise.resolve({ refused: "rate" });
    }
    len() {
      return this.caughtUp()
        ? { mark: this.mark, len: this.docLen }
        : (this.stopped || this.onItsWay(), null);
    }
    roleNow() {
      return this.role;
    }
    gaveUp() {
      return !this.listed && ac(this.deps.sync.currentJoined());
    }
    stop() {
      if (!this.stopped) {
        ((this.stopped = !0), this.close("stopped"), this.failRead("stopped"));
        for (let e of this.unsubs) e();
        this.chunks = [];
      }
    }
    caughtUp() {
      return this.state === "open" && this.fenced;
    }
    onItsWay() {
      return (
        this.maybeOpen(),
        this.state !== "idle" || (this.retryTimer !== null && this.canOpen())
      );
    }
    take() {
      let e = 0;
      for (let t of this.chunks) e += t.length;
      let t = new Uint8Array(e),
        n = 0;
      for (let e of this.chunks) (t.set(e, n), (n += e.length));
      return (
        (this.chunks = []),
        (this.base = this.mark),
        { bytes: t, mark: this.mark ?? "" }
      );
    }
    forgetDoc() {
      ((this.mark = null),
        (this.base = null),
        (this.chunks = []),
        (this.docLen = -1));
    }
    restartFrom(e) {
      let t = this.due();
      if (
        (this.close("closed"),
        this.forgetDoc(),
        (this.mark = e),
        (this.base = e),
        !this.canOpen())
      )
        return;
      let n = this.deps.retryCapMs ?? dc;
      (this.now() - this.forced.at > n && (this.forced.n = 0),
        (this.forced.at = this.now()));
      let r = Math.max(this.forced.n++, this.retries),
        i = this.deps.spendOpen() ? (r === 0 ? 0 : this.jitter(r)) : n;
      this.armReopen(Math.max(t, i));
    }
    failRead(e) {
      let t = this.reading;
      t !== null &&
        ((this.reading = null), clearTimeout(t.timer), t.reject(Dc(e)));
    }
    answerRead() {
      let e = this.reading;
      e === null ||
        !this.caughtUp() ||
        ((this.reading = null), clearTimeout(e.timer), e.resolve(this.take()));
    }
    settleRead() {
      this.reading !== null && !this.onItsWay() && this.failRead("not_open");
    }
    readJoined(e) {
      this.listed = ac(e);
    }
    canOpen() {
      return !this.stopped && this.listed && this.deps.token() !== null;
    }
    maybeOpen() {
      this.state === "idle" &&
        this.retryTimer === null &&
        this.canOpen() &&
        this.armReopen(
          Math.max(this.due(), this.random() * (this.deps.joinJitterMs ?? lc)),
        );
    }
    due() {
      return Math.min(mc, this.reopenAt - this.now());
    }
    denied() {
      (this.stop(), this.deps.onDenied());
    }
    refusedForGood() {
      let e = this.now();
      return (
        (this.refusals.n === 0 || e < this.refusals.since) &&
          (this.refusals = { n: 0, since: e }),
        this.refusals.n++,
        this.refusals.n >= _c &&
          e - this.refusals.since >= (this.deps.refusalsSpanMs ?? vc)
      );
    }
    took(e, t) {
      ((this.refusals.n = 0),
        (this.cached = { token: e, granted: t }),
        t.role !== this.role &&
          ((this.rechecks = t.role === "viewer" ? 0 : -1),
          (this.role = t.role),
          this.deps.onRole(t.role)));
    }
    beginOpen(e) {
      let t = this.deps.token();
      if (t === null) return;
      let n = this.socketGen,
        r = ++this.mintGen;
      ((this.state = "minting"),
        this.grant(t, e).then(([e, t]) => {
          if (
            n !== this.socketGen ||
            r !== this.mintGen ||
            this.stopped ||
            this.state !== "minting"
          )
            return;
          if (
            ((this.state = "idle"),
            e.kind === "not_found" || e.kind === "denied")
          ) {
            if (
              (this.deps.report?.(`subscribe:${e.kind}`), this.refusedForGood())
            )
              return this.denied();
            (this.scheduleReopen(), this.settleRead());
            return;
          }
          if (e.kind !== "ok") {
            (this.deps.report?.("subscribe:unavailable"),
              this.scheduleReopen(e.retryAfterMs),
              this.settleRead());
            return;
          }
          if ((this.took(t, e), !this.canOpen())) {
            this.settleRead();
            return;
          }
          let i = this.deps.names.next(this.now());
          if (i === null) {
            (this.deps.report?.("wire:exhausted"),
              this.scheduleReopen(0, !0),
              this.settleRead());
            return;
          }
          if (
            !this.deps.sync.sendCtrl(
              "ctrl:open",
              Ns({ stream: i, grant: e.grant, spec: e.spec, since: this.mark }),
            )
          ) {
            (this.deps.names.release(i, this.now()),
              (this.listed = !1),
              this.settleRead());
            return;
          }
          ((this.name = i),
            (this.presented = e.grant),
            (this.presentedEndsMs = e.expiresAtMs),
            (this.state = "opening"),
            (this.openedTimer = setTimeout(() => {
              ((this.openedTimer = null),
                this.deps.report?.("opened_timeout"),
                this.close("closed"),
                this.scheduleReopen(0, !0),
                this.settleRead(),
                this.deps.onGrew());
            }, this.deps.openedTimeoutMs ?? sc)));
        }));
    }
    async grant(e, t) {
      let n = this.cached;
      return !t &&
        n !== null &&
        n.token === e &&
        this.now() < n.granted.expiresAtMs - bc
        ? [n.granted, n.token]
        : ((this.cached = null), this.ask(e));
    }
    ask(e) {
      return this.deps.subscribe(e).catch(() => [{ kind: "unavailable" }, e]);
    }
    onLaneCtrl(e) {
      if (this.stopped) return;
      if (e.kind === "ctrl:joined") {
        (this.readJoined(e.payload), this.maybeOpen());
        return;
      }
      if (e.kind === "ctrl:send_result") {
        this.onSendResult(e.payload);
        return;
      }
      let t = Ms(e.payload);
      if (t !== null) {
        if (t.stream !== this.name) {
          e.kind === "ctrl:opened" &&
            this.deps.names.orphan(t.stream, this.now()) &&
            this.deps.sync.sendCtrl(gs, Ps(t.stream));
          return;
        }
        switch (e.kind) {
          case ds:
            this.onOpened();
            return;
          case ps:
            this.onStreamDenied(t.reason);
            return;
          case fs:
            this.onReset(t.reason);
            return;
          case ms:
            this.onAck(t);
            return;
          case hs:
            this.onRefused(t);
            return;
          default:
            return;
        }
      }
    }
    onOpened() {
      this.state === "opening" &&
        (this.clearOpenTimers(),
        (this.state = "open"),
        (this.sendSeq = 0),
        (this.fenced = !1),
        this.armFrameTimer(),
        this.cached === null
          ? this.scheduleRefresh(this.jitter(0))
          : this.armRefresh());
    }
    armFrameTimer() {
      this.frameTimer !== null && clearTimeout(this.frameTimer);
      let e = this.socketGen;
      this.frameTimer = setTimeout(() => {
        ((this.frameTimer = null),
          e === this.socketGen &&
            (this.deps.report?.("frame_timeout"),
            this.close("closed"),
            this.scheduleReopen(),
            this.settleRead()));
      }, this.deps.firstFrameTimeoutMs ?? cc);
    }
    onStreamDenied(e) {
      let t = Ts(e);
      switch (
        (this.deps.report?.(`denied:${tc(t)}`), this.endStream("closed"), t)
      ) {
        case "GRANT":
          ((this.cached = null),
            this.grantRetried
              ? this.scheduleReopen(0, !0)
              : ((this.grantRetried = !0),
                this.canOpen() && this.beginOpen(!0)));
          break;
        case "STREAM_LIMIT":
          this.scheduleReopen(0, !0);
          break;
        case "UNAVAILABLE":
          (++this.unavailable >= gc && (this.cached = null),
            this.scheduleReopen());
          break;
        case "RATE":
          this.scheduleReopen();
          break;
        case "DENIED":
          this.denied();
          return;
        default:
          this.listed = !1;
      }
      (this.settleRead(), this.deps.onGrew());
    }
    onReset(e) {
      let t = Es(e);
      if (
        (this.deps.report?.(`reset:${tc(t)}`),
        this.endStream("reset"),
        t === "GENERATION" || t === "RETENTION")
      ) {
        let e = this.base;
        (this.forgetDoc(),
          (this.cached = null),
          e !== null && (this.voided = !0));
        let t = this.reading;
        t !== null &&
          t.from !== null &&
          ((this.reading = null),
          clearTimeout(t.timer),
          t.resolve({ refused: "layout" }));
      }
      t === "ROTATION" && (this.cached = null);
      let n = t === "PROTOCOL" && !this.protocolRetried;
      (n && ((this.protocolRetried = !0), (this.cached = null)),
        (t === "PROTOCOL" && !n) || t === "UNKNOWN"
          ? (this.listed = !1)
          : this.scheduleReopen(),
        this.settleRead(),
        this.deps.onGrew());
    }
    onNotice(e) {
      e === oc &&
        (this.state !== "open" && (this.cached = null),
        this.scheduleRefresh(this.jitter(0)));
    }
    askDoor(e = 0) {
      if (this.stopped || this.retries >= 18) return;
      this.retryTimer !== null && clearTimeout(this.retryTimer);
      let t = this.socketGen;
      this.retryTimer = setTimeout(() => {
        this.retryTimer = null;
        let e = this.deps.token();
        this.stopped ||
          t !== this.socketGen ||
          e === null ||
          this.ask(e).then(([e, n]) => {
            if (!(this.stopped || t !== this.socketGen)) {
              if (e.kind === "ok") return this.took(n, e);
              if (
                (this.deps.report?.(`subscribe:${e.kind}`),
                e.kind === "unavailable")
              )
                return this.askDoor(e.retryAfterMs);
              this.denied();
            }
          });
      }, this.nextWait(e));
    }
    scheduleReopen(e = 0, t = !1) {
      t && (this.retries = Math.max(this.retries, fc));
      let n = this.nextWait(e);
      if (this.retries <= 18) return this.armReopen(n);
      this.reopenAt = this.now() + n;
    }
    nextWait(e) {
      let t = Math.min(this.deps.retryCapMs ?? dc, e),
        n = this.retries++;
      if (n < fc) return t + this.jitter(n);
      let r = this.deps.slowRetryBaseMs ?? pc,
        i = Math.min(mc, r * 2 ** (n - fc));
      return t + i / 2 + (this.random() * i) / 2;
    }
    jitter(e) {
      let t = this.deps.retryBaseMs ?? uc,
        n = this.deps.retryCapMs ?? dc;
      return this.random() * Math.min(n, t * 2 ** e);
    }
    armReopen(e) {
      let t = this.socketGen;
      ((this.reopenAt = this.now() + e),
        this.retryTimer !== null && clearTimeout(this.retryTimer),
        (this.retryTimer = setTimeout(() => {
          ((this.retryTimer = null),
            (this.reopenAt = 0),
            !(t !== this.socketGen || this.stopped || this.state !== "idle") &&
              (this.canOpen() ? this.beginOpen(!1) : this.settleRead()));
        }, e)));
    }
    onStreamFrame(e) {
      if (
        this.stopped ||
        this.state !== "open" ||
        e.kind !== "store:doc" ||
        e.stream !== this.name
      )
        return;
      this.frameTimer !== null &&
        (clearTimeout(this.frameTimer), (this.frameTimer = null));
      let t = zs(e.payload);
      if (t === null) {
        (this.deps.report?.("fault:malformed"),
          this.close("fault"),
          this.scheduleReopen(),
          this.settleRead());
        return;
      }
      (t.kind !== "fence" && !this.fenced && this.armFrameTimer(),
        t.kind !== "unknown" &&
          (t.kind === "run"
            ? (this.chunks.push(t.bytes),
              this.fenced && (this.docLen += t.bytes.length))
            : ((this.docLen = t.len),
              (this.fenced = !0),
              (this.fencedAt = this.now()),
              (this.grantRetried = !1),
              (this.unavailable = 0)),
          (this.mark = t.mark),
          this.fenced &&
            this.pending !== null &&
            this.pending.seq === 0 &&
            this.dispatchAppend(),
          this.answerRead(),
          this.fenced && this.deps.onGrew()));
    }
    dispatchAppend() {
      let e = this.pending;
      if (e === null || this.name === null) return;
      let t = this.sendSeq + 1;
      if (!this.deps.sync.sendStore("doc", this.name, t, e.payload)) {
        this.failAppend("not_open");
        return;
      }
      ((this.sendSeq = t), (e.seq = t), this.armAppendTimer(e));
    }
    armAppendTimer(e) {
      e.timer === null &&
        (e.timer = setTimeout(() => {
          ((e.timer = null),
            this.pending === e &&
              (this.deps.report?.("append_timeout"),
              this.failAppend("timeout")));
        }, this.deps.appendTimeoutMs ?? wc));
    }
    settle(e) {
      let t = this.pending;
      t !== null &&
        ((this.pending = null),
        t.timer !== null && clearTimeout(t.timer),
        t.resolve(e));
    }
    failAppend(e) {
      let t = this.pending;
      t !== null &&
        ((this.pending = null),
        t.timer !== null && clearTimeout(t.timer),
        t.reject(Dc(e)));
    }
    onSendResult(e) {
      let t = Hs(e);
      if (t === null || t.stream !== this.name) return;
      let n = this.pending;
      if (n === null || n.seq === 0 || t.seq !== n.seq) return;
      let r = Us(t.status, t.body);
      if (r === null) {
        (this.deps.report?.("fault:result"), this.failAppend("bad_result"));
        return;
      }
      ((this.protocolRetried = !1),
        this.settle(r),
        !(!("refused" in r) || r.refused !== "denied") &&
          (this.role !== "writer" ||
            this.refusals.n > 0 ||
            this.scheduleRefresh(this.jitter(0))));
    }
    onAck(e) {
      let t = this.pending;
      t === null ||
        t.seq === 0 ||
        e.ack === null ||
        e.ack < t.seq ||
        (this.deps.report?.("fault:ack"), this.failAppend("no_result"));
    }
    onRefused(e) {
      let t = Ds(e.reason);
      if (t === "GRANT_MISMATCH" && (e.seq === null || e.seq === 0)) return;
      let n = this.pending;
      if (n !== null && n.seq !== 0 && e.seq === n.seq) {
        if ((this.deps.report?.(`refused:${tc(t)}`), t === "RESEND_FROM")) {
          let t = e.expected;
          if (t === null || t < 1 || t > n.seq || n.resent) {
            this.failAppend("resend_from");
            return;
          }
          ((n.resent = !0),
            (this.sendSeq = t - 1),
            (n.seq = 0),
            this.dispatchAppend());
          return;
        }
        switch (((this.sendSeq = n.seq - 1), t)) {
          case "TOO_BIG":
            this.settle({ refused: "size" });
            return;
          case "WINDOW_FULL":
            this.settle({ refused: "rate" });
            return;
          case "RATE_LIMITED":
            (n.timer !== null && clearTimeout(n.timer),
              (n.timer = null),
              (this.rateTimer = setTimeout(
                () => {
                  ((this.rateTimer = null),
                    this.pending === n && this.settle({ refused: "rate" }));
                },
                Math.min(e.retryAfterMs ?? 0, Ec),
              )));
            return;
          case "NOT_WRITABLE":
          case "NOT_SENDABLE":
            (this.settle({ refused: "denied" }),
              t === "NOT_WRITABLE" &&
                this.refusals.n === 0 &&
                this.scheduleRefresh(0));
            return;
          case "GRANT_EXPIRED":
            (this.failAppend("grant_expired"),
              this.close("closed"),
              this.canOpen() && ((this.grantRetried = !0), this.beginOpen(!0)));
            return;
          case "NOT_OPEN":
            (this.failAppend("not_open"),
              this.close("closed"),
              this.scheduleReopen());
            return;
          default:
            this.failAppend(t.toLowerCase());
        }
      }
    }
    armRefresh() {
      let e = this.cached;
      if (e === null) return;
      let t = Math.max(xc, e.granted.expiresAtMs - bc - this.now() - xc),
        n = this.rechecks < 0 ? t : yc * 2 ** this.rechecks;
      (n >= t && (this.rechecks = -1), this.scheduleRefresh(Math.min(t, n)));
    }
    scheduleRefresh(e) {
      if (
        (this.refreshTimer !== null && clearTimeout(this.refreshTimer),
        (this.refreshTimer = null),
        this.stopped || this.state !== "open")
      )
        return;
      let t = this.socketGen,
        n = this.name;
      this.refreshTimer = setTimeout(() => {
        this.refreshTimer = null;
        let e = this.deps.token(),
          r = () =>
            t === this.socketGen &&
            !this.stopped &&
            this.state === "open" &&
            this.name === n;
        if (!(!r() || n === null)) {
          if (e === null) return this.retryRefresh(0);
          this.ask(e).then(([e, t]) => {
            if (r()) {
              if (e.kind === "not_found" || e.kind === "denied") {
                if (
                  (this.deps.report?.(`subscribe:${e.kind}`),
                  this.refusedForGood())
                )
                  return this.denied();
                ((this.cached = null),
                  this.scheduleRefresh(this.jitter(this.refusals.n)));
                return;
              }
              if (e.kind !== "ok") {
                (this.deps.report?.("subscribe:unavailable"),
                  this.retryRefresh(e.retryAfterMs ?? 0));
                return;
              }
              ((this.refreshRetryMs = Sc),
                this.rechecks >= 0 && this.rechecks++,
                this.took(t, e),
                e.grant !== this.presented &&
                  this.deps.sync.sendCtrl(
                    "ctrl:regrant",
                    Fs({ stream: n, grant: e.grant }),
                  ) &&
                  ((this.presented = e.grant),
                  (this.presentedEndsMs = e.expiresAtMs)),
                this.armRefresh());
            }
          });
        }
      }, e);
    }
    retryRefresh(e) {
      let t = Math.min(e, Cc) + this.random() * this.refreshRetryMs;
      ((this.refreshRetryMs = Math.min(this.refreshRetryMs * 2, Cc)),
        this.scheduleRefresh(t));
    }
    onDown() {
      (this.socketGen++,
        this.mintGen++,
        this.endStream("down"),
        (this.listed = !1),
        (this.retries = this.flaps = 0),
        (this.refusals.n = 0),
        (this.reopenAt = 0),
        (this.grantRetried = !1),
        (this.protocolRetried = !1),
        this.failRead("down"),
        this.deps.onGrew());
    }
    endStream(e) {
      (this.fenced &&
        (this.now() - this.fencedAt >= hc && (this.flaps = 0),
        (this.retries = this.flaps),
        this.flaps++),
        this.clearTimers(),
        (this.state = "idle"),
        this.name !== null && this.deps.names.release(this.name, this.now()),
        (this.name = null),
        (this.presented = null),
        (this.fenced = !1),
        this.failAppend(e));
    }
    close(e) {
      ((this.state === "opening" || this.state === "open") &&
        this.name !== null &&
        this.deps.sync.sendCtrl(gs, Ps(this.name)),
        this.mintGen++,
        this.endStream(e));
    }
    clearOpenTimers() {
      (this.openedTimer !== null && clearTimeout(this.openedTimer),
        this.frameTimer !== null && clearTimeout(this.frameTimer),
        this.retryTimer !== null && clearTimeout(this.retryTimer),
        (this.openedTimer = null),
        (this.frameTimer = null),
        (this.retryTimer = null));
    }
    clearTimers() {
      (this.clearOpenTimers(),
        this.refreshTimer !== null && clearTimeout(this.refreshTimer),
        this.rateTimer !== null && clearTimeout(this.rateTimer),
        (this.refreshTimer = null),
        (this.rateTimer = null));
    }
    now() {
      return this.deps.now?.() ?? Date.now();
    }
    random() {
      return this.deps.random?.() ?? Math.random();
    }
  },
  kc = 32,
  Ac = "too many documents are open: close one first",
  jc = 20,
  Mc = 20,
  Nc = 2,
  Pc = 64,
  Fc = 4,
  Ic = 500,
  Lc = 6e5,
  Rc = 6e4,
  zc = 3e4,
  Bc = {
    not_found: "no such document of this artifact",
    denied: "this viewer does not have permission to do this",
    documents: "this artifact has reached its limit of documents",
    rate: "too many documents created in the last minute: wait and try again",
    size: `the first write is over the limit of ${rs} bytes`,
    frame:
      "the first write must be the document format's 4 opening bytes, then one or more whole records",
    not_open: "the document is not open: open it first",
    unavailable: "not available just now: try again",
    bad_ask: "unknown method or malformed arguments",
  },
  Vc = (e, t = Bc[e]) => ({ error: { code: e, message: t } });
function Hc(e, t, n, r) {
  let i = t,
    a = n(),
    o = !1;
  return {
    take() {
      let s = n();
      return (
        (i = Math.min(t, i + (Math.max(0, s - a) / 1e3) * e)),
        (a = s),
        i < 1 ? (o || ((o = !0), r()), !1) : (--i, (o = !1), !0)
      );
    },
    empty() {
      ((i = 0), (a = n()), (o = !0));
    },
  };
}
var Uc = class {
    deps;
    lanes = new Map();
    opening = new Map();
    creating = 0;
    swept = 0;
    creates;
    opens;
    names;
    stopped = !1;
    held;
    askedAt = -1 / 0;
    rebooting = null;
    unsure = !1;
    constructor(e) {
      ((this.deps = e),
        (this.names = e.sync ? ic(e.sync) : null),
        (this.held = { token: e.token(), at: this.now() }));
      let t = () => this.now();
      ((this.creates = Hc(jc / 60, Mc, t, () => e.report?.("create:rate"))),
        (this.opens = Hc(Nc, Pc, t, () => e.report?.("open:unavailable"))));
    }
    now() {
      return this.deps.now?.() ?? Date.now();
    }
    token() {
      let e = this.deps.token();
      return (
        e !== this.held.token &&
          ((this.held = { token: e, at: this.now() }), (this.unsure = !1)),
        e
      );
    }
    async fresher(e, t = !1) {
      if (this.stopped) return null;
      let n = () => {
          let t = this.token();
          return t !== null && t !== e ? t : null;
        },
        r = n();
      if (
        (t && r === null && (this.unsure = !0),
        r !== null || this.deps.onAuthStale === void 0)
      )
        return r;
      if (this.rebooting === null) {
        let n = this.now(),
          r = t || Pn(e, n) || n - this.held.at >= Lc,
          i = t ? Rc : Lc,
          a = n - this.askedAt;
        if (!r || (a >= 0 && a < i)) return null;
        this.askedAt = n;
        let o = this.held.token;
        this.rebooting = this.reboot().then((n) => {
          (this.held.token === o &&
            (this.unsure = !n || t || Pn(e, this.now())),
            (this.rebooting = null));
        });
      }
      return (await this.rebooting, n());
    }
    reboot() {
      return new Promise((e) => {
        let t = this.deps.rebootWaitMs ?? zc,
          n = setTimeout(e, t, !1),
          r = (t) => () => {
            (clearTimeout(n), e(t));
          };
        Promise.resolve()
          .then(() => this.deps.onAuthStale?.())
          .then((e) => r(e !== null)(), r(!1));
      });
    }
    async subscribe(e, t) {
      let n = await ec(this.deps, e, t);
      if (n.kind !== "not_found" && n.kind !== "denied") return [n, e];
      let r = await this.fresher(e);
      return r === null
        ? [this.unsure ? { kind: "unavailable" } : n, e]
        : [await ec(this.deps, r, t), r];
    }
    async handle(e, t) {
      try {
        return await this.answer(e, t);
      } catch {
        return Vc("unavailable");
      }
    }
    async answer(e, t) {
      let n = us(e, t);
      if (n === null) return Vc("bad_ask");
      if (this.stopped) return Vc("unavailable");
      if (n.method === "create") return this.create(n.ask.run);
      if (n.method === "open") return this.open(n.ask.id);
      let r = this.lanes.get(n.ask.id);
      if (n.method === "close") {
        let e = this.opening.get(n.ask.id);
        return (
          e !== void 0 && e.closes++,
          this.lanes.delete(n.ask.id),
          r?.stop(),
          { result: null }
        );
      }
      if (r === void 0) return Vc("not_open");
      if (n.method === "len") {
        let e = r.len();
        return e === null ? Vc("unavailable") : { result: e };
      }
      try {
        return {
          result:
            n.method === "read"
              ? await r.read(n.ask.mark)
              : await r.appendAt(n.ask.mark, n.ask.bytes),
        };
      } catch {
        return Vc(this.lanes.get(n.ask.id) === r ? "unavailable" : "not_open");
      }
    }
    stop() {
      ((this.stopped = !0), this.closeAll());
    }
    closeAll() {
      this.swept++;
      for (let e of this.opening.values()) e.closes++;
      for (let e of this.lanes.values()) e.stop();
      this.lanes.clear();
    }
    full() {
      return (
        new Set([...this.lanes.keys(), ...this.opening.keys()]).size +
          this.creating >=
        (this.deps.maxOpen ?? kc)
      );
    }
    async create(e) {
      if (e.length > 262151) return Vc("size");
      let t = this.token();
      if (t === null) return Vc("denied");
      if (this.full()) return Vc("unavailable", Ac);
      this.creating++;
      try {
        return await this.createAt(t, e);
      } finally {
        this.creating--;
      }
    }
    async createAt(e, t) {
      let n = null,
        r = this.swept,
        i = this.deps.createTries ?? Fc;
      for (let a = 0; a < i; a++) {
        if (a > 0) {
          let e = this.deps.createRetryBaseMs ?? Ic;
          await new Promise((t) => setTimeout(t, e * 2 ** (a - 1)));
        }
        if (r !== this.swept) return Vc("unavailable");
        if (!this.creates.take()) {
          if (a === 0) return Vc("rate");
          break;
        }
        n ??= Ks(e, t);
        let i = await $s(this.deps, n);
        if (i.kind === "ok")
          return { result: { id: i.id, mark: i.mark, len: i.len } };
        if (i.kind === "refused") {
          i.code === "rate" && this.creates.empty();
          let r = i.code === "token";
          r && this.deps.report?.("create:token");
          let a = r || i.mayBeToken === !0 ? await this.fresher(e, r) : null;
          if (a !== null) {
            ((e = a), (n = Ks(e, t)));
            continue;
          }
          if (i.code === "token" || (i.mayBeToken === !0 && this.unsure)) break;
          return (this.deps.report?.(`create:${i.code}`), Vc(i.code));
        }
      }
      return (this.deps.report?.("create:unavailable"), Vc("unavailable"));
    }
    async open(e) {
      if (!is.test(e)) return Vc("not_found");
      if (this.stopped) return Vc("unavailable");
      let t = this.opening.get(e);
      if (t !== void 0) {
        if (t.closes === 0) return t.done;
        let n = t.closes;
        return (
          await t.done,
          t.closes === n ? this.open(e) : Vc("unavailable")
        );
      }
      let n = this.lanes.get(e);
      if (n !== void 0 && !n.gaveUp()) return { result: { role: n.roleNow() } };
      let r = this.token();
      if (r === null) return Vc("denied");
      if (n === void 0 && this.full()) return Vc("unavailable", Ac);
      if (!this.opens.take())
        return Vc(
          "unavailable",
          "documents opened too fast: wait a second and try again",
        );
      let i = { closes: 0, done: Promise.resolve(Vc("unavailable")) };
      return (
        this.opening.set(e, i),
        (i.done = this.openLane(e, r, i).finally(() => this.opening.delete(e))),
        i.done
      );
    }
    async openLane(e, t, n) {
      let r = this.deps.sync,
        [i, a] = await this.subscribe(t, e);
      if (
        (i.kind === "unavailable" && i.rateLimited === !0 && this.opens.empty(),
        this.stopped || n.closes > 0)
      )
        return Vc("unavailable");
      if (
        (i.kind !== "unavailable" &&
          (this.lanes.get(e)?.stop(), this.lanes.delete(e)),
        i.kind !== "ok")
      )
        return (this.deps.report?.(`open:${i.kind}`), Vc(i.kind));
      if (r === null || this.names === null)
        return { result: { role: i.role } };
      let o = new Oc({
        ...this.deps,
        token: () => this.token(),
        sync: r,
        names: this.names,
        seed: { token: a, granted: i },
        subscribe: (t) => this.subscribe(t, e),
        spendOpen: () => this.opens.take(),
        onGrew: () => this.push(o, { type: "grew", id: e }),
        onRole: (t) => this.push(o, { type: "role", id: e, role: t }),
        onDenied: () => {
          this.lanes.get(e) === o &&
            (this.lanes.delete(e), this.deps.post({ type: "denied", id: e }));
        },
      });
      return (this.lanes.set(e, o), { result: { role: i.role } });
    }
    push(e, t) {
      this.lanes.get(t.id) === e && this.deps.post(t);
    }
  },
  Wc = (e) => e.mayComment && !e.outsideWritten && e.mintEnforced,
  Gc = (e) => e.profile && e.peers && !e.guest && (e.canEdit || Wc(e)),
  Kc = (e, t) => ({ code: e, message: t });
async function qc(e) {
  try {
    let e = await fetch("/api/account", {
      credentials: "same-origin",
      signal: et(8e3),
    });
    return e.status === 401 || e.status === 403
      ? "refused"
      : e.ok
        ? { body: await e.json() }
        : "unreachable";
  } catch (t) {
    return (e(t), "unreachable");
  }
}
function Jc(e, t) {
  return e.accountPrefetch
    .then(async (n) => {
      let r = n;
      if (r && typeof r.uuid == "string" && r.uuid === t) return !0;
      let i = await qc((t) => e.markHandled(t));
      if (i === "unreachable") return "unverified";
      if (i === "refused") return !1;
      let a = i.body;
      return !!a && typeof a.uuid == "string" && a.uuid === t;
    })
    .catch((t) => (e.markHandled(t), !1));
}
function Yc(e, t, n) {
  let r = { name: null, avatarUrl: null },
    i = e;
  if (!i || typeof i.uuid != "string" || i.uuid !== t) return r;
  let a = S(i) || null;
  return { name: a, avatarUrl: a ? b(a, n) : null };
}
function Xc(e, t) {
  if (e === 200)
    try {
      let e = JSON.parse(t);
      return { result: e && typeof e.email == "string" ? e.email : null };
    } catch {
      return { error: Kc("upstream_error", "malformed response") };
    }
  return e === 404
    ? {
        error: Kc(
          "capability_removed",
          "user identity is not available to this view",
        ),
      }
    : e === 429
      ? { error: Kc("rate_limited", "identity lookups are rate limited") }
      : { error: Kc("upstream_error", `request failed (${e})`) };
}
var Zc = 15e3,
  Qc = 1500,
  $c = 4e3;
function el() {
  return {
    profileP: null,
    emailP: null,
    emailRetries: 2,
    renewFloor: 0,
    renewP: null,
    session: {
      verdict: null,
      reading: null,
      nextReadAt: 0,
      floorMs: rl,
      proven: !1,
      shown: !1,
    },
    dir: null,
    search: null,
    nonEditorSearches: 0,
    profileOutcomes: new Set(),
  };
}
var tl = new Map(),
  nl = new WeakMap(),
  rl = 3e4,
  il = 3e5,
  al = 6e4;
function ol(e, t, n, r, i, a = null, o) {
  let { frameOrigin: s, frameUuid: c } = e,
    l = { name: null, avatarUrl: null },
    u = () => {
      let t = e.chromeReady().then(async () => {
          let t = o() ? e.chrome()?.userDirectory : void 0,
            n = t?.ownName ? await t.ownName(w) : null;
          return n === null ? l : { name: n, avatarUrl: b(n, h()) };
        }),
        n,
        r = new Promise((e) => {
          n = setTimeout(() => e(l), $c);
        });
      return Promise.race([t, r]).finally(() => clearTimeout(n));
    },
    d = (t) => p(t).catch((n) => (e.markHandled(n), t)),
    f = () =>
      (i.profileP ??= n.profile
        ? e.accountPrefetch
            .then(async (t) => {
              let r = t;
              if (r && typeof r.uuid == "string" && r.uuid === n.account)
                return d(Yc(t, n.account, h()));
              let i = await qc((t) => e.markHandled(t));
              return i === "unreachable"
                ? u()
                : i === "refused"
                  ? l
                  : d(Yc(i.body, n.account, h()));
            })
            .catch((t) => (e.markHandled(t), l))
        : Promise.resolve(l)),
    p = (t) => {
      let r = e.org,
        a = n.token;
      if (t.name === null || !r || !g || !a) return Promise.resolve(t);
      let c = e.chromeReady().then(async () => {
          let c = o() ? e.chrome()?.userDirectory : void 0;
          if (!c?.ownPhotoHash) return t;
          let l = await c.ownPhotoHash(
            r,
            n.account,
            (i.dir ??= c.newCache()),
            (t) => e.markHandled(t),
          );
          return l === null || n.token !== a
            ? t
            : { ...t, photo: { url: me(s, a, l, g), expiry: ze(g) } };
        }),
        l,
        u = new Promise((e) => {
          l = setTimeout(() => e(t), Qc);
        });
      return Promise.race([c, u]).finally(() => clearTimeout(l));
    },
    m = () =>
      (i.emailP ??= n.email
        ? fetch(
            `/api/frame/user/email/${c}${e.org ? `?org=${encodeURIComponent(e.org)}` : ""}`,
            {
              method: "POST",
              credentials: "same-origin",
              headers: { "Content-Type": "application/json", ...e.cpHeaders },
              body: JSON.stringify({ token: r.value }),
              signal: et(Zc),
            },
          )
            .then(async (e) => Xc(e.status, await e.text()))
            .catch(
              (t) => (
                e.markHandled(t),
                { error: Kc("upstream_error", "request failed") }
              ),
            )
            .then(
              (e) => (
                "error" in e &&
                  e.error.code === "rate_limited" &&
                  i.emailRetries-- > 0 &&
                  (i.emailP = null),
                e
              ),
            )
        : Promise.resolve({ result: null })),
    h = () => (n.token === "" ? void 0 : Le(n.token)),
    g = xe(n.avatarGrant) ? n.avatarGrant : "",
    _ = (e) => {
      let t = e;
      return !!t && typeof t.uuid == "string" && t.uuid === n.account;
    },
    v = async (t) => {
      if (t === null && _(await e.accountPrefetch)) return !0;
      let n = await qc((t) => e.markHandled(t));
      return n === "unreachable"
        ? (t ?? "unverified")
        : n === "refused"
          ? "refused"
          : _(n.body)
            ? !0
            : "other";
    },
    y = () => x().then((e) => (e === !0 || e === "unverified" ? e : !1)),
    x = () => {
      let t = i.session;
      if (t.verdict === !0) return Promise.resolve(!0);
      if (t.reading) return t.reading;
      let n = typeof document < "u" && document.visibilityState === "hidden",
        r = t.verdict === "unverified" && t.proven && !t.shown;
      if (t.verdict !== null && (n || Date.now() < t.nextReadAt || r))
        return Promise.resolve(t.verdict);
      t.shown = !1;
      let a = t.verdict;
      return (
        (t.reading = v(a)
          .catch((t) => (e.markHandled(t), a ?? "other"))
          .then(
            (e) => (
              (t.reading = null),
              (t.verdict = e),
              e !== !0 &&
                ((t.nextReadAt = Date.now() + t.floorMs),
                (t.floorMs = Math.min(t.floorMs * 2, il))),
              e
            ),
          )),
        t.reading
      );
    },
    S = () => {
      document.visibilityState === "visible" &&
        ((i.session.nextReadAt = 0), (i.session.shown = !0));
    };
  document.addEventListener("visibilitychange", S);
  let C = !0,
    w = {
      slug: c,
      org: e.org,
      cpHeaders: e.cpHeaders,
      contentOrigin: s,
      photos: g !== "",
      credential: () => r.value,
      renew: () => {
        if (i.renewP !== null) return i.renewP;
        if (!o() || Date.now() < i.renewFloor) return Promise.resolve(!1);
        i.renewFloor = Date.now() + al;
        let t = r.value;
        return (
          (i.renewP = (async () => {
            try {
              await e.requestReboot();
            } catch (t) {
              return (e.markHandled(t), !1);
            }
            return (
              await new Promise((e) => setTimeout(e, 0)),
              o() && r.value !== "" && r.value !== t
            );
          })().finally(() => {
            i.renewP = null;
          })),
          i.renewP
        );
      },
      get viewerToken() {
        return n.token;
      },
      profile: n.profile,
      get peers() {
        return n.peers;
      },
      get unbound() {
        return n.unbound === !0;
      },
      sessionBound: y,
      unboundKind: () =>
        i.session.verdict === "refused" ? "refused" : "other",
      sessionProven: () => {
        i.session.verdict === "unverified" && (i.session.proven = !0);
      },
      email: n.email,
      known: () => e.chrome()?.userDirectory?.known?.(),
      markHandled: (t) => e.markHandled(t),
      live: () => C && o(),
      paneHidden: () => e.hostPaneHidden?.() === !0,
    },
    T = (t) => {
      i.profileOutcomes.has(t) ||
        (i.profileOutcomes.add(t), e.report("user-profiles", t));
    },
    E = (r) => {
      if (
        !t.isConnected ||
        !o() ||
        r.origin !== s ||
        !t.contentWindow ||
        r.source !== t.contentWindow
      )
        return;
      let l = _e(r.data, "user");
      if (l) {
        let r = performance.now(),
          a = (n) => {
            o() &&
              (t.contentWindow?.postMessage(ye(l.id, n), s),
              e.noteCapOutcome?.(
                l.cap,
                l.method,
                "error" in n ? n.error.code : null,
                t,
                performance.now() - r,
              ));
          };
        if (l.method === "profile") {
          f().then((e) =>
            a({
              result: {
                name: e.name,
                avatarUrl:
                  e.photo && Date.now() < e.photo.expiry - 3e5
                    ? e.photo.url
                    : e.avatarUrl,
              },
            }),
          );
          return;
        }
        if (l.method === "email") {
          m().then(a);
          return;
        }
        if (l.method === "profiles") {
          let t = Array.isArray(l.args?.[0]) ? l.args[0] : [],
            n = [
              ...new Set(
                t
                  .filter((e) => typeof e == "string" && e.length <= 256)
                  .slice(0, 4096),
              ),
            ];
          e.chromeReady().then(() => {
            if (!o()) return;
            let t = e.chrome()?.userDirectory;
            if (!t) {
              (T("no_directory"), a({ result: {} }));
              return;
            }
            return t
              .profiles(w, (i.dir ??= t.newCache()), n, {
                authoritativeOnly: !0,
                onOutcome: T,
              })
              .then((e) => a({ result: e }));
          });
          return;
        }
        if (l.method === "access") {
          let t = Date.now(),
            r = Array.isArray(l.args?.[0]) ? l.args[0] : [],
            s = [...new Set(r.slice(0, 128).filter(N))];
          if (
            s.length > 32 ||
            !n.access ||
            !n.profile ||
            !n.peers ||
            !n.canEdit ||
            n.guest
          ) {
            a({ result: {} });
            return;
          }
          e.chromeReady().then(() => {
            if (!o()) return;
            let r = e.chrome()?.userDirectory;
            if (!r?.access || !r.newAccessBudget) {
              a({ result: {} });
              return;
            }
            let l = `${c} ${n.account}`,
              u = tl.get(l);
            return (
              u || ((u = r.newAccessBudget()), tl.set(l, u)),
              nl.get(u) !== i && ((u.withheld = !1), nl.set(u, i)),
              r.access(w, u, s, t).then((e) => a({ result: e }))
            );
          });
          return;
        }
        if (l.method === "search") {
          let t = typeof l.args?.[0] == "string" ? l.args[0] : "";
          if (t.length > 200) {
            a({ result: [] });
            return;
          }
          if (!Gc(n) || (!n.canEdit && i.nonEditorSearches >= 3e3)) {
            a({ result: [] });
            return;
          }
          (n.canEdit || i.nonEditorSearches++,
            e.chromeReady().then(() => {
              if (!o()) return;
              let r = e.chrome()?.userDirectory;
              if (!r) {
                a({ result: [] });
                return;
              }
              return r
                .search(
                  w,
                  (i.dir ??= r.newCache()),
                  (i.search ??= r.newSearch()),
                  t,
                )
                .then((e) => a({ result: Gc(n) ? e : [] }));
            }));
          return;
        }
        a({ error: Kc("upstream_error", `unknown method ${l.method}`) });
        return;
      }
      a && a(r.data);
    };
  return (
    window.addEventListener("message", E),
    () => {
      ((C = !1),
        window.removeEventListener("message", E),
        document.removeEventListener("visibilitychange", S),
        i.dir && (i.dir.detachRefresh?.(), (i.dir.detachRefresh = null)),
        i.search &&
          (i.search.timer !== null &&
            (clearTimeout(i.search.timer), (i.search.timer = null)),
          i.search.abort?.abort(),
          (i.search.abort = null),
          i.search.seq++,
          i.search.pendingResolve?.([]),
          (i.search.pendingResolve = null)));
    }
  );
}
var sl = 6e3,
  cl = 15e3,
  ll = 1e4,
  ul = 25,
  dl = 200,
  fl = 2,
  pl = 16,
  ml = 6e4,
  hl = 2e4,
  gl = 2e3,
  _l = 3e5,
  vl = 3,
  yl = 6e5,
  bl = [],
  xl = 5e3,
  Sl = 6e4,
  Cl = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function wl() {
  return {
    sessionBoundP: null,
    sessionRetryAt: 0,
    left: ll,
    known: new Map(),
    asking: new Map(),
    lookupAbort: null,
    lookupsRunning: 0,
    lookupWaiters: [],
    quietUntil: 0,
    renewFloor: 0,
    renewP: null,
  };
}
function Tl(e, t) {
  let n;
  try {
    n = JSON.parse(e)?.entries;
  } catch {
    return null;
  }
  if (n === void 0 || (n !== null && typeof n != "object")) return null;
  let r = new Map();
  for (let e of t) {
    let t = n !== null && Object.hasOwn(n, e) ? n[e] : null;
    r.set(
      e,
      typeof t == "object" && t
        ? {
            title: typeof t.title == "string" ? t.title : "",
            type: typeof t.type == "string" && t.type !== "" ? t.type : null,
          }
        : null,
    );
  }
  return r;
}
function El(e, t, n, r, i, a) {
  let { frameOrigin: o, frameUuid: s } = e,
    c = !0,
    l = `/api/frame/artifact/lookup/${s}${tt(e)}`,
    u = () => {
      if (i.renewP !== null) return i.renewP;
      let t = Date.now();
      for (; bl.length > 0 && bl[0] <= t - yl;) bl.shift();
      if (!a() || t < i.renewFloor || bl.length >= vl)
        return Promise.resolve(!1);
      (bl.push(t), (i.renewFloor = t + al));
      let n = r.value;
      return (
        (i.renewP = e
          .requestReboot()
          .then(
            () => new Promise((e) => setTimeout(e, 0)),
            (t) => e.markHandled(t),
          )
          .then(() => a() && r.value !== "" && r.value !== n)
          .finally(() => {
            i.renewP = null;
          })),
        i.renewP
      );
    },
    d = (e) => {
      i.quietUntil = Math.max(i.quietUntil, Date.now() + e);
    },
    f = (e, t) => {
      let n = Number(e.headers.get("Retry-After"));
      return Number.isFinite(n) && n > 0 ? Math.min(n * 1e3, Sl) : t;
    },
    p = async (t, n, a = !1) => {
      if (!c || i.left <= 0 || Date.now() < i.quietUntil)
        return { text: null, again: !1 };
      i.left--;
      let o = r.value,
        s = await fetch(l, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json", ...e.cpHeaders },
          body: JSON.stringify({ ids: t, token: o }),
          signal: Ge(et(sl), n),
        });
      if (s.status === 200) return { text: await s.text(), again: !1 };
      if (s.status === 404) d(_l);
      else if (s.status === 429) d(f(s, xl));
      else if (s.status === 403) {
        let e = a ? "" : await s.text().catch(() => ""),
          i = () => r.value !== "" && r.value !== o;
        if (
          !a &&
          !n.aborted &&
          !Xe(e) &&
          !$e(e) &&
          (i() || (await u())) &&
          !n.aborted
        )
          return p(t, n, !0);
        i() || d(xl);
      } else if (s.status >= 500) {
        let e = f(s, 0);
        return e > sl
          ? (d(e), { text: null, again: !1 })
          : { text: null, again: !0, waitMs: e };
      }
      return { text: null, again: !1 };
    },
    m = () => (
      i.sessionRetryAt !== 0 &&
        Date.now() >= i.sessionRetryAt &&
        ((i.sessionBoundP = null), (i.sessionRetryAt = 0)),
      (i.sessionBoundP ??=
        n === null
          ? Promise.resolve(!1)
          : Jc(e, n.account).then(
              (e) => (e !== !0 && (i.sessionRetryAt = Date.now() + al), e),
            ))
    ),
    h = (e, t) => {
      if (
        (i.known.delete(e),
        i.known.set(e, { at: Date.now(), row: t }),
        i.known.size > gl)
      ) {
        let e = i.known.keys().next();
        e.done || i.known.delete(e.value);
      }
    },
    g = (e) => {
      let t = i.known.get(e);
      return t && Date.now() - t.at < (t.row === null ? hl : ml)
        ? { row: t.row }
        : null;
    },
    _ = async (t, n) => {
      for (; i.lookupsRunning >= fl && !n.aborted;)
        await new Promise((e) => i.lookupWaiters.push(e));
      i.lookupsRunning++;
      try {
        for (let r = 0; r < 2; r++) {
          if (n.aborted || !c || !a() || Date.now() < i.quietUntil) return;
          let {
              text: o,
              again: s,
              waitMs: l,
            } = await p(t, n).catch(
              (t) => (e.markHandled(t), { text: null, again: !0 }),
            ),
            u = o === null ? null : Tl(o, t);
          if (u !== null) {
            for (let [e, t] of u) h(e, t);
            return;
          }
          if (!s) return;
          r === 0 && l && (await v(l, n));
        }
        d(xl);
      } finally {
        (i.lookupsRunning--, i.lookupWaiters.shift()?.());
      }
    },
    v = (e, t) =>
      new Promise((n) => {
        let r = setTimeout(i, e);
        function i() {
          (clearTimeout(r), t.removeEventListener("abort", i), n());
        }
        t.addEventListener("abort", i, { once: !0 });
      }),
    y = () => {
      let e;
      return {
        late: new Promise((t) => {
          e = setTimeout(() => t("late"), cl);
        }),
        stop: () => clearTimeout(e),
      };
    },
    b = async (e) => {
      let t = Object.create(null),
        n = y();
      try {
        return await x(e, t, n.late);
      } finally {
        n.stop();
      }
    },
    x = async (e, t, n) => {
      let r = await Promise.race([m(), n]);
      if (r === "late" || r === !1 || !c || !a()) return t;
      let o = (i.lookupAbort ??= new AbortController()).signal,
        s = [],
        l = [],
        u = [];
      for (let n of e) {
        let e = g(n);
        if (e !== null) {
          e.row && (t[n] = e.row);
          continue;
        }
        u.push(n);
        let r = i.asking.get(n);
        r ? s.push(r) : l.push(n);
      }
      if (
        l.length > 0 &&
        i.lookupWaiters.length + Math.ceil(l.length / ul) > pl
      )
        return t;
      for (let e = 0; e < l.length; e += ul) {
        let t = l.slice(e, e + ul),
          n = _(t, o).finally(() => {
            for (let e of t) i.asking.delete(e);
          });
        for (let e of t) i.asking.set(e, n);
        s.push(n);
      }
      await Promise.race([Promise.all(s), n]);
      for (let e of u) {
        let n = g(e)?.row;
        n && (t[e] = n);
      }
      return t;
    },
    S = (i) => {
      if (
        !t.isConnected ||
        !a() ||
        i.origin !== o ||
        !t.contentWindow ||
        i.source !== t.contentWindow
      )
        return;
      let s = _e(i.data);
      if (
        !s ||
        (s.cap !== "artifact" && s.cap !== "self") ||
        s.method !== "metadata"
      )
        return;
      let c = performance.now(),
        l = (n) => {
          a() &&
            (t.contentWindow?.postMessage(ye(s.id, { result: n }), o),
            e.noteCapOutcome?.(
              s.cap,
              s.method,
              null,
              t,
              performance.now() - c,
            ));
        },
        u = [
          ...new Set(
            (Array.isArray(s.args[0]) ? s.args[0] : [])
              .slice(0, dl)
              .filter((e) => typeof e == "string" && Cl.test(e)),
          ),
        ];
      if (u.length === 0 || n === null || r.value === "")
        return l(Object.create(null));
      b(u).then(l, (t) => {
        (e.markHandled(t), l(Object.create(null)));
      });
    };
  return (
    window.addEventListener("message", S),
    () => {
      ((c = !1),
        window.removeEventListener("message", S),
        i.lookupAbort?.abort(),
        (i.lookupAbort = null));
      for (let e of i.lookupWaiters.splice(0)) e();
    }
  );
}
function Dl(e, t, n, r) {
  return `frame-cap-consent:${e}:${t ?? "-"}:${n}:${r}`;
}
function Ol(e, t) {
  let n;
  try {
    n = localStorage.getItem(e);
  } catch {
    return { state: "indeterminate" };
  }
  if (n === null) return { state: "ok", grant: t.empty() };
  let r;
  try {
    r = JSON.parse(n);
  } catch {
    return { state: "indeterminate" };
  }
  if (!r || r.v !== 1) return { state: "indeterminate" };
  let i = t.decode(r.payload);
  return i === null ? { state: "indeterminate" } : { state: "ok", grant: i };
}
function kl(e, t, n) {
  let r = Ol(e, n);
  if (r.state === "indeterminate") return;
  let i = { v: 1, payload: n.encode(n.union(r.grant, t)) };
  try {
    localStorage.setItem(e, JSON.stringify(i));
  } catch {}
}
var Al = {
    empty: () => !1,
    decode: (e) => (typeof e == "boolean" ? e : null),
    encode: (e) => e,
    union: (e, t) => e || t,
  },
  jl = 8,
  Ml = 64,
  Nl = 64,
  Pl = 16384,
  Fl = 8,
  Il = /^[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u2028\u2029]$/,
  Ll = /^[\p{Cf}\p{Co}]$/u,
  Rl = [
    [173, 173],
    [847, 847],
    [1564, 1564],
    [4447, 4448],
    [6068, 6069],
    [6155, 6159],
    [8203, 8207],
    [8234, 8238],
    [8288, 8303],
    [10240, 10240],
    [12644, 12644],
    [65024, 65039],
    [65279, 65279],
    [65440, 65440],
    [65520, 65528],
    [65533, 65533],
    [94180, 94180],
    [113824, 113827],
    [119155, 119162],
    [917504, 921599],
  ];
function zl(e) {
  return Rl.some(([t, n]) => e >= t && e <= n);
}
function Bl(e) {
  return (e >= 64976 && e <= 65007) || (e & 65534) == 65534;
}
var Vl = /^[\p{Extended_Pictographic}\p{Emoji_Modifier}]$/u,
  Hl = /^[#*0-9]$/,
  Ul = /^\p{Script=Han}$/u,
  Wl =
    /^[\p{Script=Arabic}\p{Script=Syriac}\p{Script=Mongolian}\p{Script=Devanagari}\p{Script=Bengali}\p{Script=Gurmukhi}\p{Script=Gujarati}\p{Script=Oriya}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Kannada}\p{Script=Malayalam}\p{Script=Sinhala}\p{Script=Myanmar}\p{Script=Tibetan}\p{Script=Khmer}]$/u;
function Gl(e) {
  if (e.length > 4096) return !1;
  let t = 0,
    n = "none";
  for (let r of e) {
    let e = r.codePointAt(0) ?? 0;
    if (r.length === 1 && e >= 55296 && e <= 57343) return !1;
    if ((e >= 65024 && e <= 65039) || (e >= 917760 && e <= 917999)) {
      if (
        !(e <= 65039
          ? n === "pictograph" || n === "han" || (n === "keycap" && e === 65039)
          : n === "han") ||
        ++t > Fl
      )
        return !1;
      n = n === "pictograph" && e === 65039 ? "selector" : "none";
    } else if (e === 8205 || e === 8204) {
      if (
        ((e !== 8205 || (n !== "pictograph" && n !== "selector")) &&
          n !== "joining") ||
        ++t > Fl
      )
        return !1;
      n = "none";
    } else if (Il.test(r) || Ll.test(r) || zl(e) || Bl(e)) return !1;
    else
      n = Vl.test(r)
        ? "pictograph"
        : Hl.test(r)
          ? "keycap"
          : Ul.test(r)
            ? "han"
            : Wl.test(r)
              ? "joining"
              : "plain";
  }
  return !0;
}
var Kl = /^[A-Za-z_][A-Za-z0-9_-]{0,63}$/;
function ql(e) {
  return Kl.test(e) && e !== "prototype" && !(e in Object.prototype);
}
function Jl(e) {
  let t = { left: Pl };
  if (typeof e != "object" || !e || Array.isArray(e) || !Yl(e, 0, t))
    return null;
  let n;
  try {
    n = JSON.stringify(e);
  } catch {
    return null;
  }
  return typeof n != "string" || new TextEncoder().encode(n).length > 4096
    ? null
    : JSON.parse(n);
}
function Yl(e, t, n) {
  if (--n.left < 0) return !1;
  if (e === null || typeof e == "boolean") return !0;
  if (typeof e == "number") return Number.isFinite(e);
  if (typeof e == "string") return ((n.left -= e.length), n.left >= 0 && Gl(e));
  if (typeof e != "object" || t >= jl) return !1;
  if (Array.isArray(e))
    return e.length > Nl ? !1 : Array.from(e).every((e) => Yl(e, t + 1, n));
  if (ArrayBuffer.isView(e)) return !1;
  let r = Object.getPrototypeOf(e);
  if (r !== null && Object.getPrototypeOf(r) !== null) return !1;
  let i = Object.keys(e);
  return i.length > Ml ? !1 : i.every((r) => ql(r) && Yl(e[r], t + 1, n));
}
var Xl = "sendToClaudeSession",
  Zl = "canSendToClaudeSession",
  Ql = "context-send",
  $l = "context-send-held";
function eu(e) {
  return (
    window.parent !== window &&
    (document.documentElement.dataset.hostcaps ?? "").split(" ").includes(e)
  );
}
var tu = "vouched-send";
function nu() {
  return eu(Ql);
}
function ru() {
  return eu($l);
}
function iu() {
  return eu(Ql) && eu(tu);
}
var au = 2,
  ou = 3e4,
  su = new Map(),
  cu = ["cursor", "who", "follow"];
function lu(e) {
  let t = Jl(e);
  if (t === null || Object.keys(t).length === 0) return null;
  let n = t.label;
  return typeof n == "string" && n.trim() !== ""
    ? { data: t, label: n }
    : { data: t };
}
function uu(e) {
  return typeof e == "object" && e && e.deliver === "send" ? Ne : he;
}
function du(e) {
  return !(typeof e == "object" && e && e.attachPresence === !1);
}
function fu(e, t) {
  return t && e !== "claude";
}
function pu(e) {
  let t = typeof e == "object" && e ? e.id : void 0;
  return typeof t == "string" && /^[A-Za-z0-9_-]{1,32}$/.test(t) ? t : void 0;
}
function mu(e) {
  if (e === null) return null;
  let t = Object.fromEntries(
    Object.entries(e.presence).filter(([e]) => !cu.includes(e)),
  );
  return Object.keys(t).length > 0 ? t : null;
}
function hu(e, t) {
  return e
    ? "refused_no_gesture_busy"
    : t === void 0
      ? "refused_no_gesture_no_api"
      : t === null
        ? "refused_no_gesture_withheld"
        : t.hasBeenActive === !0
          ? "refused_no_gesture_was_active"
          : "refused_no_gesture_never";
}
function gu(e) {
  return { error: { code: "claude_unavailable", message: e } };
}
function _u(e) {
  let t = Pe(R, e.now),
    n =
      e.postToParent ??
      ((e) => {
        window.parent.postMessage(e, location.origin);
      }),
    r = e.nav ?? (() => navigator.userActivation),
    i = new Set(),
    a = (t) => {
      i.has(t) || (i.add(t), e.report(t));
    },
    o = (e, t, n) => {
      (a("send:declined:" + t),
        e(
          t === "rate_limited"
            ? { error: { code: "rate_limited", message: n } }
            : gu(n),
        ));
    },
    s = 0,
    c = !1,
    l = () => {
      let t = su.get(e.frameUuid);
      return (
        c || (t !== void 0 && (t.n >= au || (e.now ?? Date.now)() - t.at < ou))
      );
    };
  return {
    handle(i, u, d) {
      if (i.method === Zl) {
        let t = Be(u),
          n = Re("strict", t);
        if (!n && !Re("lenient", t, r()))
          return (d({ result: "unsupported" }), !0);
        let i = (t) => {
            (t === "session" && a("send:no_producer:" + t),
              d({
                result:
                  t === "pane"
                    ? "available"
                    : t === "claude" && n
                      ? "available_if_summoned"
                      : e.stageOpensChat()
                        ? "available_if_opened"
                        : n
                          ? "no_session"
                          : "unsupported",
              }));
          },
          o = e.target();
        return (
          o === "pane" || !e.targetSettled
            ? i(o)
            : e.targetSettled().then(i, () => i("none")),
          !0
        );
      }
      if (i.method !== Xl) return !1;
      let f = Be(u),
        p = r(),
        m = e.target(),
        h = uu(i.args[1]),
        g = m === "pane" && e.paneHoldsSends() && !Re("strict", f) ? he : h,
        _ =
          m !== "pane" &&
          (g === "stage" || fu(m, e.sendOpensChat())) &&
          e.stageOpensChat(),
        v = re(
          g === "stage" && (m === "pane" || _) ? "lenient" : "strict",
          f,
          p,
        );
      if (!v || e.decisionSurfaceOpen())
        return (
          o(
            d,
            "no_gesture",
            "sendToClaudeSession must run synchronously inside the viewer's click or key press, on a browser that can prove it",
          ),
          e.trackRefused?.(hu(v, f)),
          !0
        );
      if (!(m === "pane" || (m === "claude" && g === "send") || _))
        return (
          o(
            d,
            m === "none" || m === "claude" ? "no_pane" : "no_producer:" + m,
            "nothing beside this view takes context for Claude",
          ),
          !0
        );
      let y =
          m === "pane" && g === "send" && (e.vouchedHost ?? iu)()
            ? (e.messagesStanding?.() ?? null)
            : null,
        b = y === "granted" || (y === "ask" && (e.sendUnasked?.() ?? !1)),
        x = y === "revoked" || (y === "ask" && !b && (!e.askMessages || l()));
      if (g === "send") {
        if (!e.summonWindow.take())
          return (
            o(
              d,
              "rate_limited",
              "at most two sends for Claude to act on per 10 s",
            ),
            !0
          );
      } else if (!t.take())
        return (
          o(
            d,
            "rate_limited",
            "at most one staged send per 500 ms and ten per 10 s",
          ),
          !0
        );
      let S = lu(i.args[0]);
      if (S === null)
        return (
          d({
            error: {
              code: "invalid_argument",
              message:
                "sendToClaudeSession takes one plain JSON object of at most 4 kB",
            },
          }),
          !0
        );
      let C = du(i.args[1]) ? mu(e.ownPresence()) : null;
      if (_)
        return e.stageToChat({
          data: S.data,
          ...(S.label === void 0 ? {} : { label: S.label }),
          presence: C,
          sentAt: u.timeStamp,
          ...(g === "send" && { deliver: g }),
        })
          ? (a("send:taken:opened"), d({ result: { to: "new" } }), !0)
          : ((g === "send" ? e.summonWindow : t).giveBack(),
            o(
              d,
              "open_failed",
              "could not open a chat for this send; nothing was sent; the viewer can try again",
            ),
            !0);
      if (m === "claude") {
        let t = e.deliverToClaude(
          {
            data: S.data,
            ...(S.label === void 0 ? {} : { label: S.label }),
            presence: C,
            sentAt: u.timeStamp,
          },
          pu(i.args[1]) ?? "v" + String(++s),
        );
        return t === null
          ? (o(
              d,
              "no_pane",
              "nothing beside this view takes context for Claude",
            ),
            !0)
          : (a("send:taken:" + t.to), d({ result: t }), !0);
      }
      let w = {
          __frame_chrome_state: !0,
          state: "viewer_context",
          mode: L,
          uuid: e.frameUuid,
          id: "v" + String(++s),
          data: S.data,
          ...(S.label === void 0 ? {} : { label: S.label }),
          presence: C,
          deliver: g,
          senderActivated: re("strict", f),
          ...(h === "send" && g === "stage" && { heldSend: !0 }),
        },
        T = () => {
          (n({ ...w, vouched: !0 }), a("send:relayed:vouched"));
        };
      return (
        x
          ? y === "revoked" && a("send:closed:refused")
          : b
            ? T()
            : y === "ask" && e.askMessages
              ? ((c = !0),
                e.askMessages().then(
                  (t) => {
                    if (
                      ((c = !1),
                      (t === "granted" ||
                        t === "denied" ||
                        t === "dismissed") &&
                        a("send:asked:" + t),
                      t === "granted")
                    )
                      (e.live?.() ?? !0) && T();
                    else if (t === "dismissed") {
                      let t = su.get(e.frameUuid);
                      su.set(e.frameUuid, {
                        n: (t?.n ?? 0) + 1,
                        at: (e.now ?? Date.now)(),
                      });
                    }
                  },
                  () => {
                    c = !1;
                  },
                ))
              : (n(w), a(g === "send" ? "send:relayed:send" : "send:relayed")),
        d({ result: { to: "pane" } }),
        !0
      );
    },
  };
}
var vu = 128,
  yu = 512;
function bu(e) {
  return e === 8204 || e === 8205
    ? !1
    : e < 32 ||
        (e >= 127 && e <= 159) ||
        e === 65533 ||
        e === 10240 ||
        (e & 65534) == 65534 ||
        (e >= 64976 && e <= 65007) ||
        e === 8232 ||
        e === 8233 ||
        (e >= 65520 && e <= 65528) ||
        (e >= 917504 && e <= 921599) ||
        e === 847 ||
        e === 4447 ||
        e === 4448 ||
        e === 6068 ||
        e === 6069 ||
        e === 8293 ||
        e === 12644 ||
        e === 65440 ||
        xu.test(String.fromCodePoint(e));
}
var xu = /[\p{Cf}\p{Co}]/u,
  Su = /[\p{L}\p{N}]/u,
  Cu = /\p{Variation_Selector}/u,
  wu = /\s/u,
  Tu = /\p{M}/u,
  Eu =
    /[\p{So}\p{Sk}]|(?=\p{L})[\p{Script=Arabic}\p{Script=Syriac}\p{Script=Mandaic}\p{Script=Nko}\p{Script=Mongolian}\p{Script=Devanagari}\p{Script=Bengali}\p{Script=Gurmukhi}\p{Script=Gujarati}\p{Script=Oriya}\p{Script=Tamil}\p{Script=Telugu}\p{Script=Kannada}\p{Script=Malayalam}\p{Script=Sinhala}\p{Script=Myanmar}\p{Script=Khmer}]/u,
  Du = new TextEncoder();
function Ou(e) {
  let t = [],
    n = "start";
  for (let r of e)
    wu.test(r)
      ? (t.push(r), (n = "start"))
      : r === "\uFE0E" || r === "\uFE0F"
        ? (n === "word" || n === "join") &&
          (t.push(r), (n = r === "\uFE0E" ? "textSel" : "emojiSel"))
        : Cu.test(r) ||
          (Tu.test(r)
            ? (t.push(r), n === "start" && (n = "word"))
            : r === "\u200C" || r === "\u200D"
              ? (n === "join" || n === "emojiSel") &&
                (t.push(r), (n = "joiner"))
              : (t.push(r), (n = Eu.test(r) ? "join" : "word")));
  for (; t.length > 0 && /[\u200c\u200d]/u.test(t[t.length - 1]);) t.pop();
  return t.join("");
}
var ku;
function Au(e) {
  return Mu(e, vu);
}
function ju(e) {
  return Mu(e, yu);
}
function Mu(e, t) {
  if (typeof e != "string" || e === "" || e.length > 1024 || !Ie(e)) return;
  let n = "";
  for (let t of e.replace(/\s+/g, " ")) bu(t.codePointAt(0) ?? 0) || (n += t);
  for (n = Ou(n).replace(/ +/g, " ").trim(); /[\u200c\u200d]$/u.test(n);)
    n = n.slice(0, -1).trimEnd();
  if (!Su.test(n)) return;
  let r = (e) => Du.encode(e).length;
  if (r(n) <= t) return n;
  ku === void 0 &&
    (ku =
      typeof Intl.Segmenter == "function"
        ? new Intl.Segmenter(void 0, { granularity: "grapheme" })
        : null);
  let i = ku ? Array.from(ku.segment(n), (e) => e.segment) : [...n],
    a = "";
  for (let e of i) {
    if (r(a + e + "\u2026") > t) break;
    a += e;
  }
  return ((a = a.trimEnd() + "\u2026"), Su.test(a) ? a : void 0);
}
var Nu = ["camera", "microphone", "geolocation", "motion", "midi"],
  Pu = ["camera", "microphone", "speech", "geolocation", "motion", "midi"],
  Fu = (e) => typeof e == "string" && Pu.includes(e),
  Iu = (e) => (e === "speech" ? "microphone" : e),
  Lu = (e) => typeof e == "object" && !!e && !Array.isArray(e),
  Ru = "__self__",
  zu = (e) => e === Ru;
function Bu(e) {
  if (!Lu(e)) return null;
  let t = e.decisionSeq;
  if (typeof t != "number" || !Number.isSafeInteger(t) || t < 0) return null;
  let n = {
    decisionSeq: t,
    granted: e.granted === !0,
    revoked: e.revoked === !0,
  };
  return (
    Array.isArray(e.grantedTools) &&
      (n.grantedTools = e.grantedTools.filter((e) => typeof e == "string")),
    typeof e.selectedId == "string" &&
      e.selectedId !== "" &&
      (n.selectedId = e.selectedId),
    e.defaultGranted === !0 &&
      n.granted &&
      !n.revoked &&
      (n.defaultGranted = !0),
    e.startsOff === !0 &&
      t === 0 &&
      !n.granted &&
      !n.revoked &&
      (n.startsOff = !0),
    n
  );
}
var Vu = (e) => Bu(e)?.startsOff === !0,
  Hu = (e) => {
    let t = Bu(e);
    return t !== null && t.granted && !t.revoked;
  };
function Uu(e) {
  return typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : void 0;
}
function Wu(e) {
  let t = Bu(e);
  if (t !== null && Lu(e)) {
    typeof e.imagesGranted == "boolean" && (t.imagesGranted = e.imagesGranted);
    let n = Uu(e.disclosure);
    n !== void 0 && (t.disclosure = n);
  }
  return t;
}
function Gu(e) {
  if (!Lu(e) || typeof e.granted != "boolean" || typeof e.revoked != "boolean")
    return null;
  let t = Bu(e);
  return t === null
    ? null
    : { decisionSeq: t.decisionSeq, granted: t.granted, revoked: t.revoked };
}
function Ku(e) {
  if (!Lu(e)) return null;
  let t = null;
  if (Lu(e.mcp)) {
    t = new Map();
    for (let [n, r] of Object.entries(e.mcp)) {
      if (zu(n)) continue;
      let e = Bu(r);
      e !== null && t.set(n, e);
    }
  }
  let n = new Map();
  if (Lu(e.devices))
    for (let t of Nu) {
      let r = Gu(e.devices[t]);
      r !== null && n.set(t, r);
    }
  return {
    mcp: t,
    self: Bu(e.self),
    sample: Wu(e.sample),
    files: Bu(e.files),
    devices: n,
    dictation: Bu(e.dictation),
    messages: Gu(e.messages),
    readaloud: Bu(e.readaloud),
  };
}
function qu(e) {
  let t = e.headers.get("Retry-After");
  if (t === null) return;
  let n = Number(t);
  return Number.isFinite(n) && n >= 0 ? Math.min(n * 1e3, 6e4) : void 0;
}
async function Ju(e) {
  try {
    let t = await e.json(),
      n = t?.op;
    return {
      code: typeof t?.code == "string" ? t.code : "",
      ...(typeof n == "number" && Number.isSafeInteger(n) && n >= 0
        ? { op: n }
        : {}),
      ...(t?.candidates === void 0 ? {} : { candidates: t.candidates }),
    };
  } catch {
    return { code: "" };
  }
}
var Yu = (e) => {
  let t = e;
  return (
    typeof t == "object" &&
    !!t &&
    (t.kind === "mcp" ||
      t.kind === "self" ||
      t.kind === "sample" ||
      t.kind === "files" ||
      t.kind === "dictation" ||
      t.kind === "messages" ||
      t.kind === "readaloud" ||
      Nu.includes(t.kind)) &&
    typeof t.decisionSeq == "number" &&
    typeof t.granted == "boolean"
  );
};
function Xu() {
  if (typeof document > "u") return () => void 0;
  let e = document.documentElement,
    t = (t) => {
      let n = (Number(e.getAttribute("data-consent-writing")) || 0) + t;
      n > 0
        ? e.setAttribute("data-consent-writing", String(n))
        : e.removeAttribute("data-consent-writing");
    },
    n = !0;
  return (
    t(1),
    () => {
      (n && t(-1), (n = !1));
    }
  );
}
var Zu = (e) => e.some((e) => e.revoke === !0);
async function Qu(e, t) {
  let n = Zu(t) ? Xu() : null,
    r;
  try {
    r = await e({ ops: t }).catch(() => null);
  } finally {
    n?.();
  }
  if (r === null) return { status: "retryable" };
  if (r.ok) {
    try {
      let e = (await r.json())?.ops;
      if (Array.isArray(e) && e.every(Yu)) return { status: "saved", ops: e };
    } catch {}
    return { status: "saved", ops: [] };
  }
  switch (r.status) {
    case 409: {
      let { code: e } = await Ju(r);
      return {
        status: "rerender",
        code:
          e === "manifest_changed" || e === "project_changed"
            ? e
            : "superseded",
      };
    }
    case 429:
    case 503:
    case 504:
      return { status: "retryable", retryAfterMs: qu(r) };
    case 403: {
      let e = await Ju(r);
      return e.code === ""
        ? { status: "reauth" }
        : { status: "rejected", httpStatus: 403, ...e };
    }
    default:
      return r.status >= 500 && r.status !== 501
        ? { status: "retryable", retryAfterMs: qu(r) }
        : { status: "rejected", httpStatus: r.status, ...(await Ju(r)) };
  }
}
var $u = { maxRetries: 4, delayMs: (e) => 500 * 2 ** (e - 1) };
async function ed(e, t, n) {
  let r = n.policy ?? $u,
    i = !1,
    a = 0,
    o = Zu(t),
    s = o ? Xu() : null,
    c = () => !o && n.aborted?.() === !0;
  try {
    for (;;) {
      let o = await Qu(e, t);
      if (o.status === "rejected" && o.httpStatus === 403)
        return (!i && n.refresh !== void 0 && (await n.refresh()), o);
      if (o.status !== "retryable" && o.status !== "reauth") return o;
      if (o.status === "reauth") {
        if (
          i ||
          n.refresh === void 0 ||
          ((i = !0), !(await n.refresh())) ||
          c()
        )
          return o;
        continue;
      }
      if (
        a >= r.maxRetries ||
        (a++, c()) ||
        (await n.sleep(o.retryAfterMs ?? r.delayMs(a)), c())
      )
        return o;
    }
  } finally {
    s?.();
  }
}
function td(e, t) {
  return { code: e, message: t };
}
var nd =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  rd = 8e3,
  id = 1024;
function ad(e) {
  return typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= 1;
}
function od(e) {
  return typeof e == "string" && e.trim() !== "" && e.length <= rd ? e : null;
}
function sd(e) {
  return typeof e == "string" && nd.test(e) ? e : null;
}
function cd(e) {
  let t = e;
  if (
    !t ||
    typeof t != "object" ||
    typeof t.path != "string" ||
    new TextEncoder().encode(t.path).length > id ||
    !ad(t.x) ||
    !ad(t.y)
  )
    return null;
  let n = Au(t.label),
    r = ju(t.detail);
  return {
    path: t.path,
    x: t.x,
    y: t.y,
    ...(n === void 0 ? {} : { label: n }),
    ...(r === void 0 ? {} : { detail: r }),
  };
}
var ld = () => navigator.userActivation;
function ud(e) {
  return (e.kind === "create" || e.kind === "reply") && e.summon === !0;
}
function dd(e, t, n) {
  return e
    ? "send"
    : t && (n === "available" || n === "no_session")
      ? "tag"
      : "plain";
}
function fd(e, t) {
  switch (e) {
    case "create": {
      let e = t[0],
        n = od(e?.text),
        r = cd(e?.anchor);
      return n === null || r === null
        ? td("invalid", "create takes {anchor: {path, x, y}, text}")
        : { kind: "create", anchor: r, text: n };
    }
    case "reply": {
      let e = sd(t[0]),
        n = od(t[1]);
      return e === null || n === null
        ? td("invalid", "reply takes (threadId, text)")
        : { kind: "reply", threadId: e, text: n };
    }
    case "sendToClaude": {
      let e = t[0],
        n = od(e?.text),
        r = e?.anchor !== void 0,
        i = e?.threadId !== void 0;
      if (n !== null && r !== i) {
        if (r) {
          let t = cd(e?.anchor);
          if (t !== null)
            return { kind: "create", anchor: t, text: n, summon: !0 };
        } else {
          let t = sd(e?.threadId);
          if (t !== null)
            return { kind: "reply", threadId: t, text: n, summon: !0 };
        }
      }
      return td(
        "invalid",
        "sendToClaude takes {anchor, text} or {threadId, text}",
      );
    }
    case "resolve": {
      let e = sd(t[0]);
      return e === null || typeof t[1] != "boolean"
        ? td("invalid", "resolve takes (threadId, resolved)")
        : { kind: "resolve", threadId: e, resolved: t[1] };
    }
    case "delete": {
      let e = sd(t[0]);
      return e === null
        ? td("invalid", "delete takes (threadId)")
        : { kind: "delete", threadId: e };
    }
    default:
      return td("capability_removed", `unknown method ${e}`);
  }
}
var pd = 512,
  md = 512,
  hd = 16777216,
  gd = 1024,
  _d = ie;
function vd(e, t) {
  return typeof e == "number" && Number.isFinite(e)
    ? Math.min(1, Math.max(0, e))
    : t;
}
var yd = /^[a-z][a-z0-9-]{0,23}$/,
  bd = /^[0-9a-f]{16}$/;
function xd(e) {
  let t = e;
  if (
    !t ||
    typeof t != "object" ||
    typeof t.v != "number" ||
    !Number.isInteger(t.v) ||
    t.v < 1 ||
    t.v > 8 ||
    typeof t.tag != "string" ||
    !yd.test(t.tag)
  )
    return;
  let n = typeof t.h == "string" && bd.test(t.h) ? t.h : void 0;
  return n === void 0 ? { v: t.v, tag: t.tag } : { v: t.v, tag: t.tag, h: n };
}
function Sd(e) {
  let t = e;
  if (!t || typeof t != "object") return;
  let n = (e) =>
    typeof e == "number" && Number.isFinite(e) && e >= 0 && e <= 1048576;
  if (!(!n(t.x) || !n(t.y))) return { x: t.x, y: t.y };
}
function Cd(e) {
  let t = e[0];
  if (!t || typeof t != "object")
    return td("invalid", "openComposer takes {element} or {range}");
  let n = typeof t.path == "string" ? t.path : "",
    r = new TextEncoder().encode(n).length <= id ? n : "",
    i = { path: r, x: vd(t.x, 0.5), y: vd(t.y, 0.5) },
    a = t.pin;
  a &&
    typeof a == "object" &&
    typeof a.x == "number" &&
    Number.isFinite(a.x) &&
    typeof a.y == "number" &&
    Number.isFinite(a.y) &&
    (i.pin = { x: vd(a.x, 0.5), y: vd(a.y, 0.5) });
  let o = t.rect;
  (o &&
    typeof o == "object" &&
    typeof o.top == "number" &&
    Number.isFinite(o.top) &&
    typeof o.left == "number" &&
    Number.isFinite(o.left) &&
    typeof o.width == "number" &&
    Number.isFinite(o.width) &&
    typeof o.height == "number" &&
    Number.isFinite(o.height) &&
    (i.rect = { top: o.top, left: o.left, width: o.width, height: o.height }),
    Object.hasOwn(t, "span") && (i.hadSpan = !0));
  let s = t.span;
  r !== "" &&
    s &&
    typeof s == "object" &&
    typeof s.start == "number" &&
    Number.isInteger(s.start) &&
    s.start >= 0 &&
    s.start <= hd &&
    typeof s.quote == "string" &&
    s.quote !== "" &&
    s.quote.length <= pd &&
    Ie(s.quote) &&
    new TextEncoder().encode(s.quote).length <= md &&
    !_d(s.quote) &&
    (i.span = { start: s.start, quote: s.quote });
  let c = r === "" ? void 0 : xd(t.sig);
  c && (i.sig = c);
  let l = Sd(t.doc);
  l && (i.doc = l);
  for (let e of ["label", "detail"]) {
    let n = t[e];
    typeof n == "string" && n !== "" && n.length <= gd && (i[e] = n);
  }
  return (
    t.area === !0 && (i.area = !0),
    typeof t.file == "string" &&
      t.file !== "" &&
      t.file.length <= 512 &&
      (i.file = t.file),
    i
  );
}
var wd = 1e4,
  Td = 4,
  Ed = 3e3,
  Dd = 100;
function Od(e, t, n, r, i = null, a = null) {
  let o = `/api/frame/comments/${encodeURIComponent(e)}`,
    s = t ? `?org=${encodeURIComponent(t)}` : "",
    c = n.kind === "create" ? "" : `/${encodeURIComponent(n.threadId)}`,
    l =
      n.kind === "resolve" ? "/resolve" : n.kind === "delete" ? "/delete" : "",
    u = ud(n) ? { to_claude: !0, ...(i === null ? {} : { presence: i }) } : {},
    d = a === null ? {} : { id: a },
    f =
      n.kind === "create"
        ? { text: n.text, anchor: n.anchor, token: r, ...u, ...d }
        : n.kind === "reply"
          ? { text: n.text, token: r, ...u, ...d }
          : n.kind === "resolve"
            ? { resolved: n.resolved, token: r }
            : { token: r };
  return { url: `${o}${c}${l}${s}`, body: JSON.stringify(f) };
}
var kd = new Set([
    "summon_refused",
    "summon_not_writer",
    "summon_commenter",
    "shell_only",
  ]),
  Ad = "requires the claude.ai shell";
function jd(e) {
  return td(
    "claude_unavailable",
    e === "writers_only"
      ? "only an editor of this artifact can send a comment to Claude"
      : e === "no_session"
        ? "no Claude session can receive a comment from this view right now"
        : "sending comments to Claude is not available in this view",
  );
}
function Md(e) {
  return td(e, "the viewer declined comments through the artifact");
}
function Nd(e, t, n, r = "forbidden") {
  if (e === 403) {
    let e = t;
    try {
      let i = JSON.parse(t);
      if (i?.error === "consent_required")
        return td(
          "consent_required",
          "the viewer has not allowed comments through this artifact",
        );
      if (ud(n) && typeof i?.reason == "string" && kd.has(i.reason))
        return jd(i.reason === "shell_only" ? "off" : "writers_only");
      if (i?.reason === "consent_declined") return Md(r);
      if (i?.reason === "capability_not_declared")
        return td(
          "forbidden",
          "this artifact does not declare the comments capability",
        );
      typeof i?.error == "string" && (e = i.error);
    } catch {}
    return ud(n) && e.includes(Ad)
      ? jd("off")
      : td("forbidden", "this viewer cannot comment through the artifact");
  }
  return e === 404
    ? n.kind === "create"
      ? td("unavailable", "comments are not available")
      : td("not_found", "no such thread")
    : e === 400 || e === 413
      ? td("invalid", "the comment was rejected")
      : e === 429
        ? td("rate_limited", "writing too often")
        : e === 503
          ? td("unavailable", "comments could not answer right now")
          : td("upstream_error", `request failed (${e})`);
}
function Pd(e) {
  let t = e;
  if (
    !(!t || typeof t != "object") &&
    !(typeof t.comment_id != "string" || !Array.isArray(t.payload?.threads))
  ) {
    for (let e of t.payload.threads)
      if (!(!e || !Array.isArray(e.comments))) {
        for (let n of e.comments)
          if (
            n?.id === t.comment_id &&
            typeof n.to_claude_at == "string" &&
            n.to_claude_at !== ""
          )
            return n.to_claude_at;
      }
  }
}
function Fd(e, t) {
  if (e.kind === "resolve" || e.kind === "delete") return;
  let n = "",
    r = "";
  try {
    let e = JSON.parse(t);
    (typeof e?.thread_id == "string" && (n = e.thread_id),
      typeof e?.comment_id == "string" && (r = e.comment_id));
  } catch {}
  return e.summon
    ? { threadId: n || (e.kind === "reply" ? e.threadId : ""), commentId: r }
    : e.kind === "create"
      ? { threadId: n, commentId: r }
      : { commentId: r };
}
function Id(e) {
  return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function Ld(e, t) {
  if (e.chromeViewer === void 0) return !0;
  let n = e.chromeViewer(),
    r = (e) => typeof e == "string" && e !== "" && e !== "-";
  return !n || !r(t.account) || !r(n.account)
    ? !1
    : t.account === n.account && t.org === n.org;
}
function Rd(
  e,
  t = !1,
  n = !1,
  r = "forbidden",
  i = { org: void 0, account: void 0 },
) {
  return {
    seq: e,
    disclose: t,
    suppressed: !1,
    askInFlight: null,
    firstParty: n,
    viewerNoCode: r,
    viewer: i,
  };
}
function zd(e, t) {
  !t ||
    typeof t.decisionSeq != "number" ||
    ((e.firstParty = t.firstPartyInstance === !0),
    t.decisionSeq > e.seq && (e.seq = t.decisionSeq));
}
var Bd = 3e4,
  Vd = new Set([502, 503, 504]);
function Hd(e) {
  let t = e?.trim(),
    n = t ? Number(t) : NaN,
    r = Number.isFinite(n) && n >= 0 ? n * 1e3 : 1e3;
  return Math.min(r, 5e3) + Math.random() * 400;
}
var Ud = 6e4;
async function Wd(e, t, n, r, i = !1, a = () => !0, o, s, c = !r) {
  let l = e.org ? `?org=${encodeURIComponent(e.org)}` : "",
    u =
      t.disclose && typeof o == "number" && Number.isInteger(o) && o > 0
        ? o
        : void 0,
    d = JSON.stringify({
      consentToken: n,
      ops: [
        r
          ? {
              kind: "comments",
              grant: !0,
              seenSeq: t.seq,
              ...(s !== void 0 && { provenance: s }),
              ...(u === void 0 ? {} : { disclosure: u }),
            }
          : {
              kind: "comments",
              revoke: !0,
              seenSeq: t.seq,
              ...(s !== void 0 && { provenance: s }),
            },
      ],
    }),
    f = et(Bd),
    p = (t) =>
      fetch(`/api/frame/consent/${encodeURIComponent(e.frameUuid)}${l}`, {
        method: "POST",
        keepalive: t,
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", ...e.cpHeaders },
        body: d,
        signal: f,
      }),
    m,
    h = c ? Xu() : null;
  try {
    m = await (c ? p(!0).catch(() => p(!1)) : p(!1));
  } catch {
    return !1;
  } finally {
    h?.();
  }
  if (m.status === 409) return (!i && a() && e.requestReboot(), i);
  if (!m.ok) return !1;
  if (!a()) return !0;
  try {
    let n = (await m.json())?.ops?.find((e) => e.kind === "comments");
    if (
      (n && typeof n.decisionSeq == "number" && (t.seq = n.decisionSeq),
      n && typeof n.granted == "boolean")
    ) {
      let r = Id(n.disclosure);
      e.setCommentsConsent?.(
        {
          granted: n.granted,
          revoked: !n.granted,
          decisionSeq: t.seq,
          ...(r === void 0 ? {} : { disclosure: r }),
          ...(t.firstParty ? { firstPartyInstance: !0 } : {}),
        },
        t.viewer,
      );
    }
  } catch {}
  return !0;
}
async function Gd(e, t, n, r, i = () => !1, a = !1, o) {
  let s = (await e.chromeReady()) ? e.chrome() : null;
  return !s?.showCommentsConsentDialog || !r() || !Ld(e, t.viewer)
    ? "unavailable"
    : i() || e.decisionSurfaceOpen()
      ? "busy"
      : new Promise((i) => {
          let c = !1,
            l = () => {
              c ||
                ((c = !0),
                e.setCloseConsent(null),
                e.setDecisionSurfaceOpen(!1),
                e.restoreContentInteractivity());
            },
            u = !1,
            d = (e) => {
              u || ((u = !0), l(), i(e));
            },
            f = null,
            p = (i) => {
              if ((l(), !Ld(e, t.viewer))) {
                d("unavailable");
                return;
              }
              Wd(e, t, n(), i, i && a, r, f?.disclosure, "explicit").then(
                (e) => {
                  (!e && !i && (t.suppressed = !0),
                    d(e ? (i ? "granted" : "denied") : "unavailable"));
                },
              );
            },
            m = o;
          if (m === void 0) {
            let e = null;
            try {
              e = s.pageSummonEligible?.() ?? null;
            } catch {}
            m = dd(!1, t.disclose, e);
          }
          if (
            ((f = s.showCommentsConsentDialog({
              onAllow: () => p(!0),
              onDeny: () => p(!1),
              onDismiss: () => d("dismissed"),
              variant: m,
            })),
            !f)
          )
            return d("unavailable");
          let h = f;
          (e.setCloseConsent(() => {
            (h.close(), d("dismissed"));
          }),
            e.setDecisionSurfaceOpen(!0),
            e.inertContent());
        });
}
function Kd(
  e,
  t,
  n,
  r,
  i,
  a,
  o,
  s = () => !1,
  c = !0,
  l = !1,
  u = !1,
  d = () => null,
  f = Pe(Ee),
  p = !1,
  m = !1,
) {
  let { frameOrigin: h } = e,
    g = (e) =>
      p &&
      e.kind === "create" &&
      (e.anchor.label !== void 0 || e.anchor.detail !== void 0)
        ? { ...e, anchor: { ...e.anchor, path_unreadable: !0 } }
        : e,
    _ = [],
    v = async (t) => {
      if (!c || !l || !Re("lenient", t, ld())) return "off";
      let n = await e.chromeReady(),
        r = Date.now() + Ed;
      for (;;) {
        let t = n && o() && Ld(e, i.viewer) ? e.chrome() : null,
          a;
        try {
          a = t?.pageSummonEligible?.();
        } catch {
          return "off";
        }
        if (a !== null || Date.now() >= r) return a ?? "off";
        await new Promise((e) => setTimeout(e, Dd));
      }
    },
    y = async (t, n) => {
      let r = Date.now();
      if (((_ = _.filter((e) => r - e < wd)), _.length >= Td))
        return n({
          error: td("rate_limited", "opening the composer too often"),
        });
      _.push(r);
      let a = () => {
          let e = _.indexOf(r);
          e !== -1 && _.splice(e, 1);
        },
        c = Cd(t);
      if ("code" in c) return n({ error: c });
      let l = await e.chromeReady(),
        u = () => (Ld(e, i.viewer) ? e.chrome() : null),
        d = l ? u() : null;
      if (!d?.openCommentComposer || !o())
        return n({ error: td("unavailable", "comments are not available") });
      if (s() || e.decisionSurfaceOpen()) return n({ result: { opened: !1 } });
      let f = null;
      try {
        f = d.awaitCommentComposerFocus?.() ?? null;
      } catch {}
      if (f) {
        let t = await f;
        if (((d = u()), !d?.openCommentComposer || !o()))
          return n({ error: td("unavailable", "comments are not available") });
        if (s() || e.decisionSurfaceOpen())
          return n({ result: { opened: !1 } });
        if (!t) return (a(), n({ result: { opened: !1 } }));
      }
      let p;
      try {
        p = d.openCommentComposer(c);
      } catch {
        return n({ error: td("unavailable", "comments are not available") });
      }
      if (p === null)
        return n({ error: td("unavailable", "comments are not available") });
      (p || a(), n({ result: { opened: p } }));
    },
    b = null,
    x = -1 / 0,
    S = (n) => {
      if (
        !t.isConnected ||
        !o() ||
        n.origin !== h ||
        !t.contentWindow ||
        n.source !== t.contentWindow
      )
        return;
      let r = _e(n.data, "comments");
      if (r) {
        let i = performance.now(),
          a = (n) => {
            o() &&
              (t.contentWindow?.postMessage(ye(r.id, n), h),
              e.noteCapOutcome?.(
                r.cap,
                r.method,
                "error" in n ? n.error.code : null,
                t,
                performance.now() - i,
              ));
          };
        if (r.method === "openComposer") {
          y(r.args, a);
          return;
        }
        if (r.method === "canSendToClaude") {
          v(Be(n)).then((e) => a({ result: e }));
          return;
        }
        let s = fd(r.method, r.args);
        if ("code" in s) return a({ error: s });
        E(g(s), r.id, a, n.timeStamp, Be(n));
        return;
      }
      a && a(n.data);
    },
    C = async (t, r) => {
      let a = t,
        s = (e, t) =>
          e >= 200 && e < 300
            ? { ok: !0, text: t }
            : {
                ok: !1,
                err: Nd(e, t, a, i.viewerNoCode),
                status: e,
                decided: e === 403 && $e(t),
              },
        c = async () => {
          let { url: t, body: i } = Od(
              e.frameUuid,
              e.org,
              a,
              n.value,
              r.presence,
              r.id,
            ),
            o = r.id === null ? {} : { idSent: !0 },
            c;
          try {
            c = await fetch(t, {
              method: "POST",
              credentials: "same-origin",
              headers: { "Content-Type": "application/json", ...e.cpHeaders },
              body: i,
              signal: et(Bd),
            });
          } catch {
            return {
              ok: !1,
              err: td("upstream_error", "request failed"),
              ...o,
              retryAfterMs: Hd(null),
            };
          }
          let l = await c.text().catch(() => ""),
            u = s(c.status, l);
          return u.ok
            ? u
            : { ...u, ...o, retryAfterMs: Hd(c.headers.get("Retry-After")) };
        },
        l = (e) => {
          if (e && r.id !== null) return ((r.id = null), !0);
          if (a.kind === "create" && a.anchor.path_unreadable !== void 0) {
            let { path_unreadable: e, ...t } = a.anchor;
            return ((a = { ...a, anchor: t }), !0);
          }
          if (r.presence !== null) return ((r.presence = null), !0);
          if (a.kind === "create" && a.anchor.detail !== void 0) {
            let { detail: e, ...t } = a.anchor;
            return ((a = { ...a, anchor: t }), !0);
          }
          if (a.kind === "create" && a.anchor.label !== void 0) {
            let { label: e, ...t } = a.anchor;
            return ((a = { ...a, anchor: t }), !0);
          }
          return !1;
        },
        u = async () => {
          let t = await c();
          if (
            !t.ok &&
            !r.resent &&
            t.idSent &&
            (t.status === void 0
              ? t.err.code === "upstream_error"
              : Vd.has(t.status))
          ) {
            let n = t.retryAfterMs ?? Hd(null);
            (await new Promise((e) => setTimeout(e, n)),
              (r.resent = !0),
              (t = await c()),
              e.report(
                "comments-cp-retry",
                t.ok ? "post-rescued" : "post-failed",
              ));
          }
          for (; !t.ok && t.status === 400 && !r.resent && l(t.idSent === !0);)
            t = await c();
          return t;
        },
        d = n.value,
        f = await u();
      if (f.ok || f.err.code !== "forbidden" || f.decided) return f;
      if (n.value !== d) return u();
      let p = b;
      if (!p) {
        if (!o()) return f;
        let t = Date.now();
        if (t - x < Ud) return f;
        ((x = t),
          (p = b =
            e
              .requestReboot()
              .catch(() => void 0)
              .finally(() => {
                b = null;
              })));
      }
      return (await p, n.value === d ? f : u());
    },
    w = (t) =>
      (i.askInFlight ??= Gd(e, i, () => r.value, o, s, !0, t)
        .then((e) => (e === "dismissed" && (i.suppressed = !0), e))
        .finally(() => {
          i.askInFlight = null;
        })),
    T = (t, n, r, a) => {
      if (
        (t.kind !== "create" && t.kind !== "reply") ||
        !o() ||
        !Ld(e, i.viewer)
      )
        return;
      let s = null;
      try {
        s = JSON.parse(n);
      } catch {}
      if (Pd(s) === void 0) {
        e.report("comments-summon-unstamped", t.kind);
        return;
      }
      let c = e
        .chrome()
        ?.deliverPageSummon?.({
          threadId: t.kind === "reply" ? t.threadId : sd(s?.thread_id),
          anchor: t.kind === "create" ? t.anchor : null,
          text: t.text,
          echo: s,
          sentAt: r,
          gestured: a,
        });
      c !== !0 &&
        e.report(
          "comments-summon-undelivered",
          c === !1 ? "declined" : "no-host",
        );
    },
    E = async (n, r, a, p, g) => {
      let _ = ud(n),
        y = (t) => {
          _ && e.trackCapCalled?.("comments", `refused_${t}`);
        };
      if (!c)
        return (
          y("not_granted"),
          a({
            error: td(
              "not_granted",
              "page comment writes are not granted on this view",
            ),
          })
        );
      let b = {
        presence: null,
        gestured: !1,
        id:
          m && (n.kind === "create" || n.kind === "reply")
            ? (crypto.randomUUID?.() ?? null)
            : null,
        resent: !1,
      };
      if (_) {
        if (!l) return (y("summon_off"), a({ error: jd("off") }));
        b.presence = u ? d() : null;
        let t = ld();
        if (!Re("lenient", g, t))
          return (y("host_off"), a({ error: jd("off") }));
        if (
          ((b.gestured = pe(g, t)),
          !b.gestured || s() || e.decisionSurfaceOpen())
        )
          return (
            y("no_gesture"),
            a({
              error: td(
                "claude_unavailable",
                "send to Claude only from the viewer's own gesture",
              ),
            })
          );
        let n = await v(g);
        if (n !== "available")
          return (y(n === "off" ? "host_off" : n), a({ error: jd(n) }));
        if (!f.take())
          return (
            y("rate_limited"),
            a({ error: td("rate_limited", "sending to Claude too often") })
          );
      }
      let x = (t) => {
          try {
            _ && T(n, t, p, b.gestured);
          } catch {
            e.report("comments-summon-undelivered", "threw");
          }
          (a({ result: Fd(n, t) }), e.kickComments?.());
        },
        S = await C(n, b);
      if (S.ok) {
        (e.trackCapCalled?.("comments", "granted"), x(S.text));
        return;
      }
      if (S.err.code !== "consent_required" || i.suppressed)
        return a({ error: S.err });
      o() && t.contentWindow?.postMessage(De(r), h);
      let E = i.seq,
        D = dd(_, l, _ ? "available" : await v(g));
      if (i.suppressed) return a({ error: S.err });
      if (i.seq !== E) {
        let t = await C(n, b);
        if (!t.ok) return a({ error: t.err });
        (e.trackCapCalled?.("comments", "granted"), x(t.text));
        return;
      }
      let O = await w(D);
      if (O === "busy") return a({ error: S.err });
      if (O === "denied")
        return (
          e.trackCapCalled?.("comments", "denied"),
          a({ error: Md(i.viewerNoCode) })
        );
      if (O === "dismissed") return a({ error: S.err });
      if (O === "unavailable")
        return a({
          error: td("unavailable", "the consent prompt is unavailable"),
        });
      e.trackCapCalled?.("comments", "granted");
      let k = await C(n, b);
      if (!k.ok) return a({ error: k.err });
      x(k.text);
    };
  return (
    window.addEventListener("message", S),
    () => {
      window.removeEventListener("message", S);
    }
  );
}
var qd = /^host:[A-Za-z0-9_-]{1,64}$/,
  Jd = "host-tools",
  Yd = 5e3,
  Xd = 32,
  Zd = 128,
  Qd = 128,
  $d = 4096,
  ef = 128,
  tf = 1024,
  nf = 4e6;
function rf(e) {
  return qd.test(e);
}
var af = new Set([
    "cancelled",
    "tool_error",
    "blocked_by_policy",
    "rate_limited",
    "server_unavailable",
    "server_not_connected",
    "not_in_manifest",
    "capability_disabled",
    "bad_request",
  ]),
  of = /^[a-z0-9_]{1,64}$/;
function sf(e = window) {
  return (e.document.documentElement.dataset.hostcaps ?? "")
    .split(" ")
    .includes(Jd);
}
function cf(e) {
  let t = { content: Array.isArray(e.content) ? e.content : [] };
  return (
    e.structuredContent !== void 0 &&
      (t.structuredContent = e.structuredContent),
    e.isError === !0 && (t.isError = !0),
    t
  );
}
function lf(e) {
  return typeof e == "object" && !!e && !Array.isArray(e);
}
function uf(e) {
  if (
    !lf(e) ||
    e.kind !== "tools" ||
    !Array.isArray(e.servers) ||
    e.servers.length > Xd
  )
    return null;
  let t = new Map();
  if (e.withheld !== void 0) {
    if (!Array.isArray(e.withheld) || e.withheld.length > Xd) return null;
    for (let n of e.withheld) {
      if (
        !lf(n) ||
        typeof n.server != "string" ||
        !rf(n.server) ||
        typeof n.reason != "string" ||
        !of.test(n.reason) ||
        typeof n.message != "string" ||
        n.message.length > tf
      )
        return null;
      t.has(n.server) ||
        t.set(n.server, { reason: n.reason, message: n.message });
    }
  }
  let n = new Map();
  for (let t of e.servers) {
    if (
      !lf(t) ||
      typeof t.server != "string" ||
      !rf(t.server) ||
      !Array.isArray(t.tools) ||
      t.tools.length > Zd
    )
      return null;
    let e = new Map();
    for (let n of t.tools) {
      if (
        !lf(n) ||
        typeof n.name != "string" ||
        n.name.length === 0 ||
        n.name.length > Qd ||
        (n.description !== void 0 && typeof n.description != "string")
      )
        return null;
      let t = n.description ?? "";
      if (t.length > $d) return null;
      let r = { name: n.name, description: t },
        i = n.annotations;
      if (lf(i)) {
        let e = {};
        (typeof i.readOnlyHint == "boolean" &&
          (e.readOnlyHint = i.readOnlyHint),
          typeof i.destructiveHint == "boolean" &&
            (e.destructiveHint = i.destructiveHint),
          Object.keys(e).length > 0 && (r.annotations = e));
      }
      e.has(r.name) || e.set(r.name, r);
    }
    n.has(t.server) || n.set(t.server, e);
  }
  for (let e of n.keys()) t.delete(e);
  return { inventory: n, withheld: t };
}
function df(e) {
  return { error: { code: "server_unavailable", message: e }, retryable: !0 };
}
function ff(e = window) {
  let t = null,
    n = new Map(),
    r = new Map(),
    i = !1,
    a = 0,
    o = !1,
    s = new Map(),
    c = new Set(),
    l = !1,
    u,
    d = new Promise((e) => {
      u = e;
    }),
    f = () => {
      l || ((l = !0), u());
    },
    p,
    m = [],
    h = !1,
    g = () => {
      (p !== void 0 && clearTimeout(p),
        (p = setTimeout(() => {
          ((p = void 0), f());
        }, Yd)));
    },
    _ = () => {
      o ||
        (e.parent.postMessage(
          { __frame_host: !0, kind: "hello", v: 1 },
          e.location.origin,
        ),
        g());
    },
    v = (e) => {
      for (let [t, n] of s)
        (s.delete(t),
          clearTimeout(n.timer),
          n.onAbort && n.signal?.removeEventListener("abort", n.onAbort),
          n.settle(df(e)));
    },
    y = () => {
      if (!t) return;
      let e = t;
      ((t = null), (e.onmessage = null));
      for (let t of s.keys())
        try {
          e.postMessage({ kind: "cancel", id: t });
        } catch {}
      try {
        e.close?.();
      } catch {}
      ((n = new Map()), (r = new Map()), (i = !1));
      for (let e of c) e(n);
      v("The host bridge closed before the tool replied.");
    },
    b = (e) => {
      let t = e.data;
      if (lf(t)) {
        if (t.kind === "tools") {
          let e = uf(t);
          if (e === null) return;
          ((n = e.inventory), (r = e.withheld), (i = !0), f());
          for (let e of c) e(n);
          return;
        }
        if (t.kind === "reply" && typeof t.id == "string") {
          let e = s.get(t.id);
          if (!e) return;
          if (
            (s.delete(t.id),
            clearTimeout(e.timer),
            e.onAbort && e.signal?.removeEventListener("abort", e.onAbort),
            lf(t.error))
          ) {
            let n =
                typeof t.error.code == "string" && af.has(t.error.code)
                  ? t.error.code
                  : "upstream_error",
              r = {
                error: {
                  code: n,
                  message: String(t.error.message ?? "").slice(0, tf),
                },
                retryable: n === "rate_limited" || n === "server_unavailable",
              };
            (typeof t.error.retryAfterMs == "number" &&
              Number.isFinite(t.error.retryAfterMs) &&
              t.error.retryAfterMs >= 0 &&
              (r.error.retryAfterMs = t.error.retryAfterMs),
              n === "tool_error" &&
                lf(t.error.result) &&
                (r.error.result = { ...cf(t.error.result), isError: !0 }),
              e.settle(r));
            return;
          }
          if (lf(t.result)) {
            e.settle({ result: cf(t.result) });
            return;
          }
          e.settle({
            error: { code: "upstream_error", message: "malformed host reply" },
            retryable: !1,
          });
        }
      }
    },
    x = (n) => {
      if (o || n.source !== e.parent || n.origin !== e.location.origin) return;
      let r = n.data;
      if (
        !lf(r) ||
        r.__frame_host !== !0 ||
        r.kind !== "port" ||
        r.v !== 1 ||
        !n.ports ||
        n.ports.length !== 1
      )
        return;
      let i = n.ports[0];
      (y(), (t = i), (i.onmessage = b), i.start?.(), l || g(), S());
    },
    S = () => {
      if (!(!t || !h))
        try {
          t.postMessage({ kind: "refresh", want: [...m] });
        } catch {
          y();
        }
    };
  return (
    e.addEventListener("message", x),
    _(),
    {
      ready: () => d,
      connected: () => t !== null,
      advertised: () => i,
      readvertise: () => {
        if (!t) return !1;
        try {
          t.postMessage({ kind: "refresh", want: [] });
        } catch {
          return (y(), !1);
        }
        return !0;
      },
      inventory: () => n,
      withheld: (e) => r.get(e) ?? null,
      onInventory: (e) => (
        c.add(e),
        () => {
          c.delete(e);
        }
      ),
      refresh: (e) => {
        ((m = e), (h = !0), S());
      },
      rehello: () => {
        t === null && p === void 0 && _();
      },
      call: (e, n) =>
        new Promise((r, i) => {
          if (!t) {
            r(df("No host bridge on this document."));
            return;
          }
          if (n.signal?.aborted) {
            i(new DOMException("The call was cancelled.", "AbortError"));
            return;
          }
          let o = `h${++a}`;
          if (o.length > ef) {
            r(df("Host call id overflow."));
            return;
          }
          let c = () => {
              try {
                t?.postMessage({ kind: "cancel", id: o });
              } catch {}
            },
            l = {
              settle: r,
              fail: i,
              timer: setTimeout(() => {
                (s.delete(o),
                  l.onAbort &&
                    n.signal?.removeEventListener("abort", l.onAbort),
                  c(),
                  r(df("The host did not reply in time.")));
              }, n.timeoutMs),
              signal: n.signal,
            };
          (n.signal &&
            ((l.onAbort = () => {
              s.has(o) &&
                (s.delete(o),
                clearTimeout(l.timer),
                c(),
                i(new DOMException("The call was cancelled.", "AbortError")));
            }),
            n.signal.addEventListener("abort", l.onAbort, { once: !0 })),
            s.set(o, l));
          try {
            t.postMessage({
              kind: "call",
              id: o,
              slug: e.slug,
              server: e.server,
              tool: e.tool,
              input: e.input,
              grant: e.grant,
              ...(e.org !== void 0 && { org: e.org }),
              activation: e.activation,
              consentSeq: e.consentSeq,
            });
          } catch {
            y();
          }
        }),
      dispose: () => {
        ((o = !0),
          e.removeEventListener("message", x),
          p !== void 0 && clearTimeout(p),
          y(),
          f(),
          c.clear());
      },
    }
  );
}
function pf(e, t = window) {
  return e.advertised()
    ? e.readvertise()
      ? new Promise((n) => {
          let r = !1,
            i = () => {
              r || ((r = !0), a(), n(e.advertised() ? e.inventory() : null));
            },
            a = e.onInventory(i);
          t.setTimeout(i, Yd);
        })
      : Promise.resolve(e.inventory())
    : new Promise((n) => {
        let r = !1,
          i = () => {
            r || ((r = !0), a(), n(e.advertised() ? e.inventory() : null));
          },
          a = e.onInventory(() => {
            e.advertised() && i();
          }),
          o = new Promise((e) => {
            t.setTimeout(e, Yd);
          });
        Promise.all([e.ready(), o]).then(i);
      });
}
var mf = (e) => new Promise((t) => setTimeout(t, e));
function hf(e, t) {
  let { view: n, host: r, transport: i } = t,
    a = t.sleep ?? mf,
    o = t.policy,
    s = new Map(t.declared.map((e) => [e.server, e.tools])),
    c = new Map(),
    l = 0,
    u = new Map(),
    d = new Set(),
    f = new Map(),
    p = (e, t) => (t < (c.get(e) ?? 0) ? !1 : (c.set(e, t), !0)),
    m = (e) => (e < l ? !1 : ((l = e), !0)),
    h = new Map(),
    g = (e, t) => void h.set(e, t),
    _ = (e, t) => h.get(e) === t,
    v = (e, t) => {
      h.get(e) === t && h.delete(e);
    },
    y = (e) => s.has(e) && !e.startsWith("host:"),
    b = (e, t) => {
      if (!p(e, t.decisionSeq)) return;
      let n = new Set(s.get(e) ?? []),
        i = s.has(e),
        a = (e) => new Set(e.filter((e) => !i || n.has(e))),
        o = u.get(e),
        c = o?.resolvedId,
        l = t.selectedId ?? (t.granted || t.revoked ? o?.selectedId : void 0),
        d =
          y(e) && t.granted && !t.revoked
            ? new Set(
                t.grantedTools === void 0
                  ? (o?.extra ?? [])
                  : t.grantedTools.filter((e) => !n.has(e)),
              )
            : new Set(),
        f = {
          ...(l !== void 0 && { selectedId: l }),
          ...(c !== void 0 && { resolvedId: c }),
        },
        m = d.size > 0 ? { extra: d } : {},
        h = o !== void 0 && o.revoked !== !0 && o.tools.size > 0,
        g = h ? new Set([...o.tools, ...(o.extra ?? [])]) : new Set();
      if (t.revoked) {
        let r =
            t.grantedTools ??
            (o?.revoked === !0
              ? [...(o.revokedExtra ?? [])]
              : [...(o?.extra ?? [])]),
          i = y(e) ? r.filter((e) => !n.has(e)) : [];
        u.set(e, {
          tools: new Set(),
          revoked: !0,
          revokedTools: a(
            t.grantedTools ?? [...(o?.revokedTools ?? o?.tools ?? [])],
          ),
          ...(i.length > 0 && { revokedExtra: new Set(i) }),
          ...f,
        });
      } else if (t.granted && t.grantedTools === void 0) {
        let t =
          o?.revoked === !0
            ? (o.revokedTools ?? new Set())
            : (o?.tools ?? new Set());
        u.set(e, { tools: a([...t]), ...f, ...m });
      } else if (t.granted || (t.grantedTools?.length ?? 0) > 0) {
        let n = a(t.grantedTools ?? []);
        n.size > 0
          ? u.set(e, { tools: n, ...f, ...m })
          : Object.keys(f).length > 0
            ? u.set(e, { tools: new Set(), ...f })
            : u.delete(e);
      } else
        Object.keys(f).length > 0
          ? u.set(e, { tools: new Set(), ...f })
          : u.delete(e);
      if (h && !C) {
        let t = u.get(e),
          n =
            t !== void 0 && t.revoked !== !0
              ? new Set([...t.tools, ...(t.extra ?? [])])
              : void 0;
        for (let t of g)
          if (n === void 0 || !n.has(t)) {
            r.withdrawEnable([e], "echo");
            break;
          }
      }
    },
    x = (t) => {
      if (!m(t.decisionSeq)) return;
      let n = u.get(e),
        i = n !== void 0 && n.revoked !== !0 && n.tools.size > 0;
      if (
        (t.revoked
          ? u.set(e, {
              tools: new Set(),
              revoked: !0,
              revokedTools: new Set(["publish"]),
            })
          : t.granted
            ? u.set(e, { tools: new Set(["publish"]) })
            : u.delete(e),
        i && !C)
      ) {
        let t = u.get(e);
        (t === void 0 || t.revoked === !0 || t.tools.size === 0) &&
          r.withdrawSelf();
      }
    },
    S = (t) => {
      for (let [e, n] of t.mcp ?? [])
        (n.startsOff === !0 && d.add(e),
          h.has(e) ? p(e, n.decisionSeq) : b(e, n));
      t.self !== null && (h.has(e) ? m(t.self.decisionSeq) : x(t.self));
    },
    C = !0;
  (S(n), (C = !1));
  let w = (t, n) => {
      let i = [];
      for (let a of t)
        if (a.kind === "mcp" && a.connector !== void 0) {
          if ((p(a.connector, a.decisionSeq), !_(a.connector, n))) continue;
          let e = u.get(a.connector);
          if (e && e.revoked !== !0 && e.tools.size > 0 && !a.granted)
            (u.delete(a.connector), i.push(a.connector));
          else if (
            e &&
            e.revoked !== !0 &&
            a.granted &&
            !s.has(a.connector) &&
            Array.isArray(a.grantedTools)
          ) {
            let t = new Set(a.grantedTools.filter((e) => typeof e == "string"));
            t.size > 0 && u.set(a.connector, { ...e, tools: t });
          } else if (
            e &&
            e.revoked !== !0 &&
            a.granted &&
            y(a.connector) &&
            Array.isArray(a.grantedTools)
          ) {
            let t = new Set(s.get(a.connector) ?? []),
              n = new Set(
                a.grantedTools.filter((e) => typeof e == "string" && !t.has(e)),
              ),
              { extra: i, ...o } = e;
            (u.set(a.connector, n.size > 0 ? { ...o, extra: n } : o),
              [...(i ?? [])].some((e) => !n.has(e)) &&
                r.withdrawEnable([a.connector], "echo"));
          }
          v(a.connector, n);
        } else if (a.kind === "self") {
          if ((m(a.decisionSeq), !_(e, n))) continue;
          let t = u.get(e);
          (t &&
            t.revoked !== !0 &&
            t.tools.size > 0 &&
            !a.granted &&
            (u.delete(e), r.withdrawSelf()),
            v(e, n));
        }
      i.length > 0 && r.withdrawEnable(i);
    },
    T = 0,
    E = (t, n, s, u, d, p) => {
      let m = Promise.all(t.map((e) => f.get(e) ?? Promise.resolve())),
        h = s === "revoke" ? Xu() : null,
        g = m
          .then(async () => {
            if (r.dead() && s !== "revoke")
              return (r.reportFailure("dropped"), { status: "retryable" });
            let f = (e) =>
                ed(i, e, {
                  sleep: a,
                  ...(o !== void 0 && { policy: o }),
                  refresh: () => r.refreshToken(),
                  aborted: () => r.dead(),
                }),
              m = n(),
              h = [...t],
              g = await f(m);
            for (
              ;
              p !== void 0 &&
              g.status === "rejected" &&
              g.httpStatus === 422 &&
              g.op !== void 0 &&
              g.op < m.length &&
              m.length > 1 &&
              !r.dead();
            ) {
              let e = g.op;
              (p(h[e], g),
                (m = m.filter((t, n) => n !== e)),
                (h = h.filter((t, n) => n !== e)),
                (g = await f(m)));
            }
            if (r.dead() && g.status !== "saved")
              return (r.reportFailure("dropped"), g);
            if (g.status === "saved") {
              w(g.ops, d);
              for (let e of t) v(e, d);
            } else {
              if ((r.reportFailure(s), g.status === "rerender")) {
                if (g.code === "superseded") {
                  for (let n of t) n === e ? (l = 0) : c.delete(n);
                  m.some(
                    (e) =>
                      e.kind === "self" ||
                      (e.kind === "mcp" && rf(e.connector)),
                  ) && r.reseedConsent();
                }
                r.kickRefresh();
              }
              u(g, d);
            }
            return g;
          })
          .catch(() => {
            let e = { status: "retryable" };
            return (r.reportFailure(s), u(e, d), e);
          }),
        _ = g.finally(h ?? void 0).then(() => void 0);
      for (let e of t) f.set(e, _);
      return g;
    },
    D = () => new Map(u),
    O = (t, n, i) => {
      let a = t.filter((t) => {
        if (t.server === e) return u.get(e)?.revoked !== !0;
        let r = u.get(t.server);
        if (
          r === void 0 ||
          r.revoked === !0 ||
          r.tools.size === 0 ||
          t.tools.some((e) => !r.tools.has(e))
        )
          return !0;
        let i = new Set(s.get(t.server) ?? []),
          a = new Set(t.tools);
        if (i.size > 0 && a.size === i.size && [...a].every((e) => i.has(e)))
          return !0;
        let o = n?.get(t.server);
        return (o !== void 0 && u.set(t.server, { ...r, selectedId: o }), !1);
      });
      if (a.length === 0) return null;
      let o = (e, t) => {
          t.status === "rejected" && e.some((e) => !s.has(e))
            ? r.withdrawEnable(e, "unsaved", {
                httpStatus: t.httpStatus,
                code: t.code,
                ...(t.candidates !== void 0 && { candidates: t.candidates }),
              })
            : r.withdrawEnable(e);
        },
        d = ++T,
        f = new Map(),
        p = [];
      for (let t of a) {
        (p.push(t.server), f.set(t.server, u.get(t.server)));
        let r;
        if (t.server === e) r = { tools: new Set(["publish"]) };
        else {
          let e = u.get(t.server),
            i = n?.get(t.server) ?? e?.selectedId,
            a = new Set(s.get(t.server) ?? []);
          r = {
            tools:
              e?.revoked === !0
                ? new Set(
                    [...(e.revokedTools ?? new Set())].filter(
                      (e) => a.size === 0 || a.has(e),
                    ),
                  )
                : s.has(t.server)
                  ? new Set(t.tools)
                  : new Set([...(e?.tools ?? []), ...t.tools]),
            ...(i !== void 0 && { selectedId: i }),
            ...(e?.resolvedId !== void 0 && { resolvedId: e.resolvedId }),
            ...(e?.revoked !== !0 && e?.extra !== void 0 && { extra: e.extra }),
          };
        }
        (u.set(t.server, r), g(t.server, d));
      }
      return E(
        p,
        () =>
          a.map((t) => {
            let r = (() => {
                if (t.server === e) return !1;
                let n = f.get(t.server);
                return (
                  n !== void 0 &&
                  n.revoked !== !0 &&
                  n.tools.size > 0 &&
                  t.tools.every((e) => n.tools.has(e))
                );
              })(),
              a =
                i === void 0
                  ? void 0
                  : i.pressed.has(t.server)
                    ? "explicit"
                    : r
                      ? void 0
                      : i.untouched;
            if (t.server === e)
              return {
                kind: "self",
                grant: !0,
                seenSeq: l,
                ...(a !== void 0 && { provenance: a }),
              };
            let o = f.get(t.server),
              s = o?.revoked === !0,
              u = n?.get(t.server) ?? o?.selectedId;
            return {
              kind: "mcp",
              connector: t.server,
              ...(s ? { regrant: !0 } : { grant: !0, seenTools: t.tools }),
              ...(u !== void 0 && { selectedId: u }),
              seenSeq: c.get(t.server) ?? 0,
              ...(a !== void 0 && { provenance: a }),
            };
          }),
        "grant",
        (t, n) => {
          let i = [],
            a = !1;
          for (let t of p) {
            if (!_(t, n)) continue;
            let r = f.get(t);
            (r === void 0 ? u.delete(t) : u.set(t, r),
              v(t, n),
              t === e ? (a = !0) : i.push(t));
          }
          (i.length > 0 && o(i, t), a && r.withdrawSelf());
        },
        d,
        p.some((t) => t !== e && !s.has(t))
          ? (t, n) => {
              if (!_(t, d)) return;
              let i = f.get(t);
              (i === void 0 ? u.delete(t) : u.set(t, i),
                v(t, d),
                r.reportFailure("grant"),
                t === e ? r.withdrawSelf() : o([t], n));
            }
          : void 0,
      );
    };
  return {
    mode: "server",
    read: D,
    persistExtra: (e, t, n) => {
      let i = u.get(e);
      if (
        !y(e) ||
        i === void 0 ||
        i.revoked === !0 ||
        i.tools.size === 0 ||
        t.length === 0
      )
        return;
      let a = ++T,
        o = new Set(t.filter((e) => i.extra?.has(e) !== !0));
      (u.set(e, { ...i, extra: new Set([...(i.extra ?? []), ...t]) }),
        g(e, a),
        E(
          [e],
          () => [
            {
              kind: "mcp",
              connector: e,
              grant: !0,
              extraTools: [...t],
              seenSeq: c.get(e) ?? 0,
              provenance: n,
            },
          ],
          "grant",
          (t, n) => {
            let i = u.get(e);
            if (i !== void 0) {
              let { extra: t, revokedExtra: n, ...r } = i,
                a = (e) => new Set([...(e ?? [])].filter((e) => !o.has(e))),
                s = a(t),
                c = a(n);
              u.set(e, {
                ...r,
                ...(s.size > 0 && { extra: s }),
                ...(c.size > 0 && { revokedExtra: c }),
              });
            }
            (v(e, n),
              t.status === "rejected"
                ? r.withdrawEnable([e], "unsaved", {
                    httpStatus: t.httpStatus,
                    code: t.code,
                  })
                : r.withdrawEnable([e]));
          },
          a,
        ));
    },
    persist(e, t, n, r) {
      O(e, t, r);
    },
    persistSelf() {
      let t = O([{ server: e, tools: ["publish"] }], void 0, {
        pressed: new Set([e]),
      });
      return t === null
        ? Promise.resolve(!1)
        : t.then((e) => e.status === "saved");
    },
    decisionSeq: (e) => c.get(e) ?? 0,
    setRevoked(t, n, i = "explicit") {
      let a = u.get(t);
      if (n) {
        if (a?.revoked === !0) return { restored: null, durable: !0 };
        let n = a?.tools ?? new Set();
        u.set(t, {
          tools: new Set(),
          revoked: !0,
          revokedTools: new Set(n),
          ...(a?.extra !== void 0 && { revokedExtra: a.extra }),
          ...(a?.selectedId !== void 0 && { selectedId: a.selectedId }),
          ...(a?.resolvedId !== void 0 && { resolvedId: a.resolvedId }),
        });
        let r = ++T;
        return (
          g(t, r),
          E(
            [t],
            () => [
              t === e
                ? {
                    kind: "self",
                    revoke: !0,
                    seenSeq: l,
                    provenance: "explicit",
                  }
                : {
                    kind: "mcp",
                    connector: t,
                    revoke: !0,
                    seenSeq: c.get(t) ?? 0,
                    provenance: i,
                  },
            ],
            "revoke",
            (e, n) => {
              e.status === "rerender" && e.code === "superseded" && v(t, n);
            },
            r,
          ),
          { restored: null, durable: !0 }
        );
      }
      if (a === void 0 || a.revoked !== !0)
        return { restored: null, durable: !0 };
      let o = new Set(s.get(t) ?? []),
        d =
          t === e
            ? ["publish"]
            : [...(a.revokedTools ?? new Set())].filter(
                (e) => o.size === 0 || o.has(e),
              ),
        f = {
          tools: new Set(d),
          ...(d.length > 0 &&
            a.revokedExtra !== void 0 && { extra: a.revokedExtra }),
          ...(a.selectedId !== void 0 && { selectedId: a.selectedId }),
          ...(a.resolvedId !== void 0 && { resolvedId: a.resolvedId }),
        };
      u.set(t, f);
      let p = ++T;
      return (
        g(t, p),
        E(
          [t],
          () => [
            t === e
              ? { kind: "self", grant: !0, seenSeq: l, provenance: "explicit" }
              : {
                  kind: "mcp",
                  connector: t,
                  regrant: !0,
                  seenSeq: c.get(t) ?? 0,
                  provenance: "explicit",
                },
          ],
          t === e ? "self" : "regrant",
          (n, i) => {
            _(t, i) &&
              (v(t, i),
              u.set(t, {
                tools: new Set(),
                revoked: !0,
                revokedTools: new Set(d),
                ...(a.revokedExtra !== void 0 && {
                  revokedExtra: a.revokedExtra,
                }),
                ...(a.selectedId !== void 0 && { selectedId: a.selectedId }),
                ...(a.resolvedId !== void 0 && { resolvedId: a.resolvedId }),
              }),
              t === e ? r.withdrawSelf() : r.withdrawEnable([t]));
          },
          p,
        ),
        { restored: d, durable: !0 }
      );
    },
    updateIds(e) {
      e(u);
    },
    clearSelection(e) {
      for (let t of e) {
        let e = u.get(t);
        if (e === void 0 || e.revoked === !0 || e.tools.size === 0 || h.has(t))
          continue;
        let n = new Set(s.get(t) ?? []),
          r =
            n.size > 0 &&
            e.tools.size === n.size &&
            [...e.tools].every((e) => n.has(e));
        if (e.selectedId !== void 0) {
          let { selectedId: n, ...r } = e;
          u.set(t, r);
        }
        if (!r) continue;
        let i = [...e.tools],
          a = ++T;
        (g(t, a),
          E(
            [t],
            () => [
              {
                kind: "mcp",
                connector: t,
                grant: !0,
                seenTools: i,
                seenSeq: c.get(t) ?? 0,
              },
            ],
            "grant",
            (e, n) => {
              v(t, n);
            },
            a,
          ));
      }
    },
    flush(e) {
      let t = e === void 0 ? [...f.values()] : e.flatMap((e) => f.get(e) ?? []);
      return Promise.all(t).then(() => void 0);
    },
    refresh: (e) => S(e),
    startsOff: (e) => d.has(e),
  };
}
var gf = 2e3,
  _f = 3e4,
  vf = 3e5;
function yf(e) {
  return Ue(e?.usage);
}
function bf(e) {
  let t = !1,
    n = 0,
    r = null,
    i = null,
    a = Date.now(),
    o = a,
    s = !1,
    c = null,
    l = -1 / 0,
    u = !1,
    d,
    f = (r, i = !1) => {
      if (t || !e.tracked()) return;
      if (s || !e.isVisible()) {
        c ??= r;
        return;
      }
      ((s = !0), (a = Date.now()), h());
      let o = n,
        l = u;
      ((u = !1),
        e.read(i ? `owed_${r}` : r).then(
          (r) => {
            if (((s = !1), t)) return;
            let i = r.kind === "ok" ? yf(r.result) : void 0;
            if ((i && o === n && e.apply(i), i && l && (d = i), c !== null)) {
              let e = c;
              ((c = null), p(e, !0));
            }
          },
          () => {
            s = !1;
          },
        ));
    },
    p = (e, n = !1) => {
      t ||
        r !== null ||
        (r = setTimeout(() => {
          ((r = null), f(e, n));
        }, gf));
    },
    m = () => {
      let e = Date.now();
      e - a < _f || ((a = e), f("return"));
    },
    h = () => {
      i !== null && (clearTimeout(i), (i = null));
    },
    g = () => {
      if (t || !e.tracked()) return;
      let n = a + vf - Date.now();
      if (n <= 0) {
        ((a = Date.now()), f("delivery"));
        return;
      }
      i === null &&
        a !== o &&
        (i = setTimeout(
          () => {
            ((i = null), (a = Date.now()), f("trailing"));
          },
          Math.min(n, vf),
        ));
    },
    _ = (e, t) => {
      queueMicrotask(() => v(e, t));
    },
    v = (i, o) => {
      if (t) return;
      if (o.kind !== "ok") {
        let t = Date.now(),
          n = e.held();
        o.err.code === "quota_exceeded" &&
          n !== void 0 &&
          !We(n) &&
          !(d !== void 0 && He(d, n)) &&
          t - l >= _f &&
          ((l = t), (u = !0), p("refusal"));
        return;
      }
      let s = yf(o.result);
      s
        ? (n++,
          (a = Date.now()),
          h(),
          r !== null && (clearTimeout(r), (r = null), (u = !1)),
          e.apply(s))
        : i === "delete" && ((a = Date.now()), h(), p("delete"));
    };
  return {
    wrap(e) {
      return {
        call: (t, n, r) => e.call(t, n, r),
        read: (t, n, r) => e.read(t, n, r),
        write: async (t, n, r) => {
          let i = await e.write(t, n, r);
          return (_(t, i), i);
        },
        sendQueued: async (t, n) => {
          let r = await e.sendQueued(t, n);
          return (r !== "detached" && _(t.verb, r.out), r);
        },
        ...(e.batchable !== void 0 && e.sendQueuedBatch !== void 0
          ? {
              batchable: (t, n) => e.batchable(t, n),
              sendQueuedBatch: async (t, n, r) => {
                let i = await e.sendQueuedBatch(t, n, r);
                return (
                  i !== "detached" &&
                    i.kind === "ok" &&
                    _(t.some((e) => e.verb === "delete") ? "delete" : "set", {
                      kind: "ok",
                      result: { usage: i.usage },
                    }),
                  i
                );
              },
            }
          : {}),
        subscribe: (t, n) => e.subscribe(t, n),
        close: () => e.close(),
      };
    },
    noteDelivery(e) {
      !t &&
        e.type === "snapshot" &&
        e.fromCache === !1 &&
        e.hasPendingWrites === !1 &&
        Array.isArray(e.ops) &&
        e.ops.length > 0 &&
        g();
    },
    noteReturn() {
      if (c !== null && !s) {
        let e = c;
        ((c = null), f(e, !0));
        return;
      }
      m();
    },
    stop() {
      ((t = !0), r !== null && (clearTimeout(r), (r = null)), h());
    },
  };
}
var xf = ["camera", "microphone", "geolocation", "motion", "midi"],
  Sf = {
    camera: "camera",
    microphone: "microphone",
    geolocation: "location",
    motion: "motion sensors",
    midi: "MIDI devices",
  },
  Cf = "device\u2019s motion sensors",
  wf = "Allowing will reload this artifact.",
  Tf =
    "Allowing will reload this artifact and let it turn what you say into text through your browser\u2019s speech service.",
  Ef =
    "Allowing will reload this artifact and let it control and reprogram your MIDI devices.",
  Df =
    "Allowing will reload this artifact, let it turn what you say into text through your browser\u2019s speech service, and let it control and reprogram your MIDI devices.";
function Of(e) {
  return e.length <= 1
    ? e.join("")
    : e.length === 2
      ? `${e[0]} and ${e[1]}`
      : `${e.slice(0, -1).join(", ")}, and ${e[e.length - 1]}`;
}
function kf(e) {
  let t = xf.filter((t) => e.has(t));
  return {
    title: `Let this artifact use your ${Of(t.length === 1 && t[0] === "motion" ? [Cf] : t.map((e) => Sf[e]))}?`,
    description: e.has("microphone")
      ? e.has("midi")
        ? Df
        : Tf
      : e.has("midi")
        ? Ef
        : wf,
  };
}
var Af = "Let this artifact use dictation?",
  jf = "Send transcripts of what you say to the artifact.";
function Mf() {
  return { title: Af, description: jf };
}
var Nf = class extends Error {
    code;
    constructor(e, t) {
      (super(t), (this.code = e));
    }
  },
  Pf = "data-devices-hidden";
function Ff() {
  return (
    document.visibilityState === "hidden" ||
    document.documentElement.hasAttribute("data-devices-hidden")
  );
}
var If = class {
  deps;
  state = "idle";
  cur = null;
  runs = 0;
  starting = null;
  finishing = null;
  closed = !1;
  opening = null;
  waiters = new Set();
  target = null;
  unwatch;
  tail = "";
  frame = null;
  farewell = null;
  constructor(e) {
    this.deps = e;
    let t = () => {
        Ff() && this.end("hidden");
      },
      n = () => void this.end("hidden"),
      r = new MutationObserver(t);
    (r.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: [Pf],
    }),
      document.addEventListener("visibilitychange", t),
      window.addEventListener("pagehide", n),
      (this.unwatch = () => {
        (r.disconnect(),
          document.removeEventListener("visibilitychange", t),
          window.removeEventListener("pagehide", n));
      }));
  }
  attach(e, t, n) {
    return (
      (this.target = e),
      (this.farewell = n ?? null),
      t && ((this.frame = t), (this.tail = Bf.get(t) ?? "")),
      () => {
        this.target === e && (this.target = null);
      }
    );
  }
  current() {
    return this.state;
  }
  push(e) {
    this.target?.({ __frame_dictation_ev: !0, ev: e });
  }
  move(e, t) {
    ((this.state = e),
      this.push(
        t === void 0
          ? { type: "state", state: e }
          : { type: "state", state: e, reason: t },
      ));
  }
  start(e, t) {
    if (this.closed) return Promise.reject(Rf());
    if (this.state === "listening") return Promise.resolve();
    if (this.state === "starting" && this.starting !== null)
      return this.starting;
    if (this.state === "finishing" && this.finishing !== null)
      return this.startAfter(this.finishing, e, t);
    if (this.opening !== null) return this.startAfter(this.opening, e, t);
    let n = this.run(e, t).finally(() => {
      this.starting === n && (this.starting = null);
    });
    return ((this.starting = n), n);
  }
  startAfter(e, t, n) {
    return new Promise((r, i) => {
      let a = (e) => i(zf(e));
      this.waiters.add(a);
      let o = () => {
        this.waiters.delete(a) && this.start(t, n).then(r, i);
      };
      e.then(o, o);
    });
  }
  async run(e, t) {
    let n = { n: ++this.runs, session: null, strip: null };
    ((this.cur = n), this.move("starting"));
    let r = () => !this.closed && this.cur === n && this.state === "starting",
      i;
    try {
      i = await t();
    } catch {
      throw this.cur === n
        ? ((this.cur = null),
          this.move("idle", "upstream_error"),
          new Nf("upstream_error", "dictation failed"))
        : zf(n.endedBy);
    }
    if (i !== "granted") {
      if (this.cur !== n) throw zf(n.endedBy);
      let e = Lf(i);
      throw ((this.cur = null), this.move("idle", e.code), e);
    }
    if (!r()) throw zf(n.endedBy);
    if (Ff())
      throw (
        (this.cur = null),
        this.move("idle", "hidden"),
        new Nf("stopped", "the artifact was hidden before dictation started")
      );
    if (
      ((n.strip = this.deps.showStrip(() => void this.end("viewer_stopped"))),
      n.strip === null)
    )
      throw (
        this.deps.report("dictation", "strip-unavailable"),
        (this.cur = null),
        this.move("idle", "upstream_error"),
        new Nf("upstream_error", "the dictation indicator could not be shown")
      );
    let a = () =>
        this.cur === n &&
        (this.state === "listening" || this.state === "finishing"),
      o,
      s = this.deps.open({
        organizationId: this.deps.organizationId,
        ...(e === void 0 ? {} : { language: e }),
        onPartial: (e) => {
          a() &&
            (this.push({ type: "partial", text: e }), n.strip?.words?.("", e));
        },
        onFinal: (e) => {
          if (!a() || e === "") return;
          let t = n.joined ? e : Gf(this.tail, e);
          ((n.joined = !0),
            this.target !== null &&
              ((this.tail = Uf(t)),
              this.frame && Bf.set(this.frame, this.tail)),
            this.push({ type: "final", text: t }),
            n.strip?.words?.("", ""));
        },
        onEnded: (e) => this.finish(n, e),
      }),
      c = s.then(
        () => void 0,
        () => void 0,
      );
    ((this.opening = c),
      c.then(() => {
        this.opening === c && (this.opening = null);
      }));
    try {
      o = await s;
    } catch (e) {
      if ((n.strip.close(), !r())) throw zf(n.endedBy);
      this.cur = null;
      let t = Kf(e);
      throw (this.move("idle", t.code), t);
    }
    if (!r()) throw (o.cancel(), n.strip.close(), zf(n.endedBy));
    ((n.session = o),
      this.move("listening"),
      n.ended !== void 0 && this.finish(n, n.ended));
  }
  stop() {
    return this.end("stopped");
  }
  end(e) {
    for (let t of this.waiters) t(e);
    if ((this.waiters.clear(), this.state === "idle")) return Promise.resolve();
    if (this.state === "finishing") return this.finishing ?? Promise.resolve();
    let t = this.cur;
    if (this.state === "starting" || t === null || t.session === null)
      return (
        t !== null && (t.endedBy = e),
        (this.cur = null),
        this.move("idle", e),
        Promise.resolve()
      );
    let n = t.session;
    this.move("finishing");
    let r = (
      e === "stopped" || e === "viewer_stopped"
        ? n.stop()
        : Promise.resolve(n.cancel())
    )
      .catch(() => void 0)
      .then(() => {
        (this.finishing === r && (this.finishing = null),
          this.cur === t && ((this.cur = null), this.move("idle", e)));
      });
    return ((this.finishing = r), t.strip?.close(), r);
  }
  finish(e, t) {
    if (this.cur === e) {
      if (this.state === "starting") {
        e.ended = t;
        return;
      }
      this.state === "listening" &&
        (e.strip?.close(), (this.cur = null), this.move("idle", t));
    }
  }
  close() {
    ((this.closed = !0), this.unwatch());
    let e = this.state === "idle" ? null : this.farewell;
    (this.end("hidden"),
      (this.target = null),
      e?.({
        __frame_dictation_ev: !0,
        ev: { type: "state", state: "idle", reason: "hidden" },
      }));
  }
};
function Lf(e) {
  switch (e) {
    case "denied":
      return new Nf("not_granted", "the viewer has not allowed dictation here");
    case "withheld":
      return new Nf(
        "dismissed",
        "the viewer has not answered; a later click may ask again",
      );
    case "unasked":
      return new Nf(
        "dismissed",
        "the question could not be shown right now; try again from a later click",
      );
    case "unsaved":
      return new Nf("upstream_error", "the viewer's answer could not be saved");
  }
}
function Rf() {
  return new Nf("stopped", "dictation ended before it started listening");
}
function zf(e) {
  return e === "not_granted"
    ? new Nf("not_granted", "the viewer has not allowed dictation here")
    : Rf();
}
var Bf = new WeakMap(),
  Vf =
    /[\u0e00-\u0eff\u1000-\u109f\u1780-\u17ff\u3000-\u312f\u3190-\u9fff\uf900-\ufaff\uff00-\uffef\u{20000}-\u{3ffff}]/u,
  Hf = /[\t-\r \u0085\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]/,
  Uf = (e) => e.slice((e.codePointAt(e.length - 2) ?? 0) > 65535 ? -2 : -1),
  Wf = (e) => e.slice(0, (e.codePointAt(0) ?? 0) > 65535 ? 2 : 1);
function Gf(e, t) {
  if (e === "" || t === "") return t;
  let n = Uf(e),
    r = Wf(t),
    i = /^[.,!?;:]+/.exec(t)?.[0].length ?? 0;
  return Hf.test(n) ||
    Hf.test(r) ||
    Vf.test(n) ||
    Vf.test(r) ||
    (i > 0 && (i === t.length || Hf.test(t.charAt(i)))) ||
    (/[0-9]$/.test(e) && /^[.,;:][0-9]/.test(t))
    ? t
    : " " + t;
}
function Kf(e) {
  let t = e?.kind;
  return t === "rateLimited"
    ? new Nf("rate_limited", "too many dictations at once; try again shortly")
    : t === "microphoneDenied"
      ? new Nf(
          "not_granted",
          "the browser blocks the microphone for the site hosting this artifact",
        )
      : t === "accessDenied"
        ? new Nf("unavailable", "dictation is not available for this account")
        : new Nf(
            "upstream_error",
            "the microphone or the speech service could not be reached",
          );
}
var qf = /^[A-Za-z]{2,8}(-[A-Za-z0-9]{1,8}){0,4}$/;
function Jf(e, t, n) {
  let r = (r) => {
      n.brokerLive() && t.contentWindow?.postMessage(r, e);
    },
    i = n.gen.attach(r, t, (n) => t.contentWindow?.postMessage(n, e)),
    a = async (e, t) => {
      if (!t.attested)
        throw new Nf(
          "no_gesture",
          "start() must be called from the viewer's click or key press",
        );
      let r = e[0]?.language;
      if (r !== void 0 && (typeof r != "string" || !qf.test(r)))
        throw new Nf(
          "invalid_argument",
          "language must be a BCP 47 tag such as en-US",
        );
      if (Ff())
        throw new Nf(
          "stopped",
          "dictation cannot start while the artifact is hidden",
        );
      await n.gen.start(r, () => n.decide(t.gesture, t.readAt));
    },
    o = (i) => {
      if (
        !t.isConnected ||
        !n.brokerLive() ||
        i.origin !== e ||
        !t.contentWindow ||
        i.source !== t.contentWindow
      )
        return;
      let o = _e(i.data, "dictation");
      o &&
        (o.method === "start"
          ? a(o.args ?? [], n.gesture(i))
          : o.method === "stop"
            ? n.gen.stop()
            : Promise.reject(
                new Nf("invalid_argument", "unknown dictation method"),
              )
        ).then(
          () => r(ye(o.id, { result: null })),
          (e) =>
            r(
              ye(o.id, {
                error:
                  e instanceof Nf
                    ? { code: e.code, message: e.message }
                    : { code: "upstream_error", message: "dictation failed" },
              }),
            ),
        );
    };
  return (
    window.addEventListener("message", o),
    () => {
      (window.removeEventListener("message", o), i());
    }
  );
}
var Yf = new Set(
  ".bat,.cmd,.com,.exe,.msi,.ps1,.vb,.vbs,.vbe,.js,.jse,.wsf,.wsh,.wsc,.jnlp,.scr,.hta,.lnk,.pif,.reg,.cpl,.msc,.url,.wsb,.chm,.xll,.application,.appref-ms,.settingcontent-ms,.search-ms,.library-ms,.diagcab,.appinstaller,.desktop,.app,.command,.tool,.terminal,.fileloc,.inetloc,.webloc,.scpt,.scptd,.applescript,.workflow,.action,.osax,.term,.ftploc,.afploc,.vncloc,.mobileconfig,.pyz,.pyzw,.dmg,.pkg,.mpkg,.jar,.prefpane,.saver,.sparsebundle,.scf,.website,.searchconnector-ms,.ws,.rdp".split(
    ",",
  ),
);
function Xf(e) {
  let t = e;
  for (; t.length > 0 && /[.\s\u2800]/u.test(t.at(-1) ?? "");)
    t = t.slice(0, -1);
  if (/\.[^.\s\u2800]*[\s\u2800]+(?:\.[^.]*)+$/u.test(t)) return !0;
  let n = t.lastIndexOf(".");
  return n >= 0 && Yf.has(t.slice(n).toUpperCase().toLowerCase());
}
var Zf = /^[A-Za-z0-9._-]{16,512}$/,
  Qf = (e) => {
    let t = e.saveSigningToken?.();
    return typeof t == "string" && Zf.test(t) ? t : null;
  },
  $f = ["signing_info", "sign_claim"],
  ep = (e, t) =>
    new Response(null, { status: e, headers: t ? { "x-c2pa-reason": t } : {} }),
  tp = (e) => async (t, n) => {
    let r = $f.find((e) => t.endsWith(`/c2pa/${e}`));
    if (!r) return ep(404);
    if (!e.org) return ep(404, "no_org");
    let i = Qf(e);
    if (!i) return ep(403, "bad_token");
    let a = {};
    try {
      typeof n.body == "string" && (a = JSON.parse(n.body));
    } catch {
      return ep(400);
    }
    if (typeof a != "object" || !a || Array.isArray(a)) return ep(400);
    let o = encodeURIComponent(e.org),
      s = encodeURIComponent(e.frameUuid);
    return fetch(`/api/frame/c2pa/${s}/${r}?org=${o}`, {
      method: "POST",
      credentials: "same-origin",
      redirect: "error",
      headers: { "Content-Type": "application/json", ...e.cpHeaders },
      body: JSON.stringify({ ...a, token: i }),
      signal: n.signal,
    });
  },
  np = 25e3,
  rp = 128,
  ip = 50,
  ap = 1048576,
  op = { "image/gif": "gif", "video/mp4": "mp4", "video/quicktime": "mov" };
function sp(e) {
  let t = navigator.userAgent;
  return t.includes(" Electron/")
    ? "desktop"
    : /Android/.test(t)
      ? e.androidApp
        ? "android_app"
        : "android_web"
      : /iPad|iPhone|iPod/.test(t) ||
          (t.includes("Macintosh") && navigator.maxTouchPoints > 1)
        ? e.iosApp
          ? "ios_app"
          : "ios_web"
        : "web";
}
function cp(e, t, n = "gif") {
  let r = e.saveSigning?.();
  if (!e.org || !e.loadSigner || typeof r != "object" || !r) return null;
  let i = sp(t),
    a = Object.hasOwn(r, i) ? r[i] : null;
  if (typeof a != "object" || !a) return null;
  let { max_mib: o, routes: s, mov: c } = a;
  if (
    !Number.isInteger(o) ||
    o < 1 ||
    (s !== "org" && (s !== "frame" || !Qf(e))) ||
    (n === "mov" && (s !== "org" || (c !== void 0 && c !== !0)))
  )
    return null;
  let { deviceMemory: l = 0 } = navigator;
  return {
    maxBytes:
      Math.min(
        o,
        n === "mp4" && (i === "web" || i === "desktop") && l >= 8 ? rp : ip,
      ) * ap,
    routes: s,
  };
}
function lp(e, t) {
  return t.takesBlob
    ? "host"
    : window.parent === window && cp(e, t)
      ? "shell"
      : "none";
}
var up = (e) => (Object.hasOwn(op, e) ? op[e] : void 0);
function dp(e, t, n) {
  let r = lp(e, t);
  if (r !== "shell") return r === "host";
  let i = up(n);
  return i !== void 0 && cp(e, t, i) !== null;
}
var fp = new Set(["video/quicktime"]),
  pp = (e) => fp.has(e),
  mp = 5e3;
function hp(e, t, n, r) {
  return new Promise((i) => {
    let a = t.mintId(),
      o = (e) => {
        (window.removeEventListener("message", s),
          window.clearTimeout(c),
          i(e));
      },
      s = (e) => {
        if (!t.fromRealm(e)) return;
        let n = t.parseResult(e.data);
        n !== null &&
          n.id === a &&
          o(n.ok ? "yes" : n.reason === "unsigned" ? "unsigned" : "older_host");
      },
      c = window.setTimeout(() => o("no_answer"), mp);
    window.addEventListener("message", s);
    let l = {
      __frame_chrome_state: !0,
      state: "save_file",
      transport: "blob",
      uuid: e.frameUuid,
      id: a,
      filename: "",
      size: r,
      query: "will_sign",
      mime: n,
    };
    try {
      window.parent.postMessage(l, location.origin);
    } catch {
      o("no_answer");
    }
  });
}
function gp(e, t, n, r, i) {
  let a = lp(e, t);
  if (a === "host") return hp(e, n, r, i);
  let o = up(r),
    s = a === "shell" && o !== void 0 ? cp(e, t, o) : null;
  return Promise.resolve(s !== null && i <= s.maxBytes ? "yes" : "unsigned");
}
var _p = new Set(
  "load.start.signed.abandoned.no_time.too_large.host.no_lane.chunk_load.share_reask.not_saved.sdk_load.wasm_fetch.worker_file.worker_start.unsupported_container.unhashed_padding.manifest_build.assertion_extract.envelope.splice.bad_response.rate_limited.network.timeout.no_org.signed_too_large.fault.signing_disabled.unsupported_media_type.body_too_large.upstream_fault.upstream_unavailable.upstream_timeout.chain_mismatch.signing_unavailable.ingredient_has_manifest.generator_not_allowed.format_out_of_scope.bad_token.quicktime_layout.quicktime_layout_signed".split(
    ".",
  ),
);
function vp(e, t, n) {
  let r =
    n <= 16 * ap
      ? "le16mi"
      : n <= 50 * ap
        ? "le50mi"
        : n <= 128 * ap
          ? "le128mi"
          : "gt128mi";
  return `${e}:${sp(t)}:${r}`;
}
var yp = new Set([
    "load",
    "start",
    "share_reask",
    "not_saved",
    "too_large",
    "host",
    "no_lane",
    "skipped_too_large",
    "not_attempted",
  ]),
  bp = (e) => (typeof e != "string" || yp.has(e) ? "fault" : e);
function xp(e, t, n = 0) {
  let r = _p.has(e)
    ? e
    : /^[a-z][a-z0-9_]{0,63}$/.test(e)
      ? "server_other"
      : "fault";
  return `${r}:${t}${r === "signed" ? `:${n < 1e3 ? "lt1s" : n < 3e3 ? "lt3s" : n < 1e4 ? "lt10s" : "ge10s"}` : ""}`;
}
function Sp(e) {
  return e;
}
var Cp = "__frameI18n";
function wp(e, t) {
  let n = "";
  for (let r = 0; r < e.length;) {
    let i = e[r];
    if (i === "'") {
      let t = e[r + 1];
      if (t === "'") ((n += "'"), (r += 2));
      else if (t === "{" || t === "}" || t === "<" || t === ">")
        for (r += 1; r < e.length;)
          if (e[r] === "'") {
            if (e[r + 1] === "'") ((n += "'"), (r += 2));
            else {
              r += 1;
              break;
            }
          } else ((n += e[r]), (r += 1));
      else ((n += "'"), (r += 1));
    } else if (i === "{") {
      let i = /^\{\s*([A-Za-z_]\w*)\s*\}/.exec(e.slice(r)),
        a =
          i !== null && t !== void 0 && Object.hasOwn(t, i[1])
            ? t[i[1]]
            : void 0;
      if (i === null || a === void 0) return null;
      ((n += a), (r += i[0].length));
    } else if (i === "}") return null;
    else if (i === "<" && /^\/?[A-Za-z]/.test(e.slice(r + 1))) return null;
    else ((n += i), (r += 1));
  }
  return n;
}
function Tp(e, t) {
  let n = window[Cp]?.messages,
    r = typeof n == "object" && n ? n[e.id] : void 0;
  if (typeof r == "string" && r !== "") {
    let e = wp(r, t);
    if (e !== null) return e;
  }
  return wp(e.defaultMessage, t) ?? e.defaultMessage;
}
var Ep = Sp({
    viewerDownloadAsk: { id: "GjLT4wX+CY", defaultMessage: "Save this file?" },
    downloadAsk: {
      id: "wo5/49AHLs",
      defaultMessage: "Let this artifact download a file?",
    },
    trust: {
      id: "rpDoDYluSt",
      defaultMessage: "Only continue if you trust this artifact.",
    },
    downloadProgress: {
      id: "NXms5lsiT0",
      defaultMessage: "Downloading\u2026 {done} of {size}",
    },
    preparing: { id: "wG8wr9h5HI", defaultMessage: "Preparing the file\u2026" },
    fileReady: {
      id: "kwnPfQN0bP",
      defaultMessage: "The file is ready; select Save file to save it.",
    },
    saveFile: { id: "qfSUIvi5ic", defaultMessage: "Save file" },
    cancel: { id: "47FYwba+bI", defaultMessage: "Cancel" },
  }),
  Dp = 8,
  Op = (e) => typeof e == "object" && !!e && e.__frame_signed_saves_ask === !0,
  kp = {
    code: "not_signed",
    message: "the file was not saved: content credentials were not added",
  };
function Ap(e) {
  return e instanceof Blob ? e.size : e.byteLength;
}
var jp = (e) => e instanceof ArrayBuffer || e instanceof Blob,
  Mp = 16777216,
  Np = 12e4,
  Pp = 500,
  Fp = 6e4,
  Ip = 3e5,
  Lp = 1e4,
  Rp = 9e5,
  zp = 1e3,
  Bp = 16;
function Vp() {
  let e = new Uint8Array(Bp);
  return (
    crypto.getRandomValues(e),
    Array.from(e, (e) => e.toString(16).padStart(2, "0")).join("")
  );
}
var Hp = 536870912,
  Up = 25165824,
  Wp = 3,
  Gp = 6e5,
  Kp = 524288,
  qp = 209715200,
  Jp = 3e4;
function Yp(e) {
  return typeof Intl.Segmenter == "function"
    ? Array.from(
        new Intl.Segmenter(void 0, { granularity: "grapheme" }).segment(e),
        (e) => e.segment,
      )
    : Array.from(e);
}
function Xp(e, t) {
  let n = new TextEncoder();
  if (n.encode(e + t).length <= 240) return e + t;
  let r = (e) => n.encode(e.join("") + t).length <= 240,
    i = Yp(e);
  for (; i.length > 1 && !r(i);) i.pop();
  if (!r(i)) for (i = Array.from(i.join("")); i.length > 1 && !r(i);) i.pop();
  let a = i.join("").replace(/[\s.]+$/, "");
  return (
    a === "" && (a = "download"),
    pm.test(a.split(".")[0].replace(/[\s.]+$/, "")) && (a = `_${a}`),
    a + t
  );
}
var Zp = "save_file_result";
function Qp(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return t.__frame_chrome !== !0 ||
    t.cmd !== Zp ||
    typeof t.id != "string" ||
    typeof t.ok != "boolean"
    ? null
    : {
        __frame_chrome: !0,
        cmd: Zp,
        id: t.id,
        ok: t.ok,
        ...(t.reason === "declined" && { reason: "declined" }),
        ...(t.ok === !1 && t.reason === "unsigned" && { reason: "unsigned" }),
        ...(t.ok === !1 &&
          t.reason !== "declined" &&
          t.reason !== "unsigned" && { reason: "failed" }),
      };
}
function $p(e) {
  let t = window.parent,
    n =
      t === window
        ? e.source === window
        : e.source === t || (t.opener !== null && e.source === t.opener);
  return e.origin === location.origin && n;
}
function em(e) {
  let t = "";
  for (let n = 0; n < e.length; n += 32768)
    t += String.fromCharCode(...e.subarray(n, n + 32768));
  return btoa(t);
}
var tm = new Map([
    ["gif", "image/gif"],
    ["png", "image/png"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["webp", "image/webp"],
    ["mp4", "video/mp4"],
    ["webm", "video/webm"],
    ["mov", "video/quicktime"],
    ["txt", "text/plain"],
    ["json", "application/json"],
    ["md", "text/markdown"],
  ]),
  nm = new Map(
    [
      "docx",
      "pptx",
      "epub",
      "csv",
      "ttf",
      "html",
      "svg",
      "pdf",
      "xlsx",
      "zip",
    ].map((e) => [e, "application/octet-stream"]),
  ),
  rm = new Map([...tm, ...nm]),
  im = [...rm].filter(([, e]) => pp(e)),
  am = new Map([
    ...tm,
    [
      "docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    [
      "pptx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    ["epub", "application/epub+zip"],
    ["csv", "text/csv"],
    ["ttf", "font/ttf"],
    ["html", "text/html"],
    ["svg", "image/svg+xml"],
    ["pdf", "application/pdf"],
    [
      "xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    ["zip", "application/zip"],
  ]),
  om =
    /[\p{Cf}\p{Cs}\p{Zl}\p{Zp}\p{Default_Ignorable_Code_Point}\u2800\uFFFC\u{13441}\u{13442}\u{1D159}]/gu,
  sm = /\s{2,}/g,
  cm = /(?<![\p{L}\p{N}])[^\S ]|[^\S ](?![\p{L}\p{N}])/gu,
  lm = /(^|[\s.])\p{M}+/gu,
  um = /(\p{M}{4})\p{M}+/gu,
  dm = /[\u0000-\u001F\u007F-\u009F]/g,
  fm = /[/\\<>:"|?*%]/g,
  pm =
    /^(con|prn|aux|nul|com[0-9\u00B9\u00B2\u00B3]|lpt[0-9\u00B9\u00B2\u00B3])$/i,
  mm = 120;
function hm(e) {
  let t = _m(e);
  if (t === null) return gm;
  let n = t.lastIndexOf("."),
    r = [...rm.keys()].join(", ");
  if (n === -1)
    return {
      ok: !1,
      code: "rejected_extension",
      message: `filename needs one of these extensions: ${r}`,
    };
  let i = t.slice(n + 1).toLowerCase(),
    a = rm.get(i);
  return a === void 0
    ? {
        ok: !1,
        code: "rejected_extension",
        message: `extension .${i} is not allowed; use one of: ${r}`,
      }
    : { ok: !0, name: Xp(vm(t.slice(0, n)), `.${i}`), mime: a };
}
var gm = {
  ok: !1,
  code: "bad_request",
  message: "filename must be a non-empty string of at most 512 characters",
};
function _m(e) {
  return typeof e != "string" || e.length === 0 || e.length > 512
    ? null
    : e
        .replace(om, "")
        .replace(dm, "")
        .replace(fm, "_")
        .replace(lm, "$1")
        .replace(um, "$1")
        .replace(sm, " ")
        .replace(cm, " ")
        .replace(/[\s.]+$/, "");
}
function vm(e) {
  let t = e.replace(/^[\s.]+/, "").replace(/[\s.]+$/, "");
  return (
    [...t].length > mm &&
      (t = [...t]
        .slice(0, mm)
        .join("")
        .replace(/[\s.]+$/, "")),
    t === "" && (t = "download"),
    pm.test(t.split(".")[0].replace(/[\s.]+$/, "")) && (t = `_${t}`),
    t
  );
}
var ym = 32;
function bm(e) {
  let t = _m(
    typeof e == "string" ? e.replace(/[\p{Co}\p{Cn}\p{Cs}]/gu, "") : e,
  )?.replace(/^[\s.]+/, "");
  if (t === void 0)
    return { ok: !1, message: "this file's name can't be used for a download" };
  let n = t.lastIndexOf("."),
    r =
      n === -1 || Array.from(t.slice(n + 1)).length > ym ? "" : t.slice(n + 1),
    i = r === "" ? Xp(vm(t), "") : Xp(vm(t.slice(0, n)), `.${r}`);
  return Xf(i)
    ? {
        ok: !1,
        message: "files of this type can't be downloaded from an artifact",
      }
    : { ok: !0, name: i, ext: r };
}
function xm(e) {
  let t = hm(e);
  return t.ok ? t.name.slice(t.name.lastIndexOf(".") + 1) : "other";
}
var Sm = [
  ["128m", 128e6],
  ["64m", 64e6],
  ["32m", 32e6],
  ["16mi", 16777216],
  ["12m", 12e6],
  ["8m", 8e6],
  ["5m", 5e6],
  ["3m", 3e6],
  ["2m", 2e6],
  ["1500k", 15e5],
  ["1200k", 12e5],
  ["1000k", 1e6],
  ["780k", 780288],
  ["500k", 5e5],
  ["250k", 25e4],
  ["100k", 1e5],
  ["0k", 0],
];
function Cm(e) {
  for (let [t, n] of Sm) if (e >= n) return t;
  return "0k";
}
function wm(e) {
  let t = e.capabilities?.downloads;
  return !!t && typeof t == "object" && t.optional !== !0;
}
var Tm = (e, t, ...n) => {
    let r = document.createElement(e);
    return (t && (r.className = t), r.append(...n), r);
  },
  Em =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>',
  Dm =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"></path><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path></svg>',
  Om = () => {
    let e = navigator.userAgent;
    return e.includes(" Electron/") || !e.includes(" Claude/")
      ? !1
      : /iPad|iPhone|iPod/.test(e) ||
          (e.includes("Macintosh") && navigator.maxTouchPoints > 1);
  },
  km = () => {
    let e = navigator.userAgent;
    return (
      !e.includes(" Electron/") && e.includes(" Claude/") && /Android/.test(e)
    );
  },
  Am = "save-file",
  jm = "save-blob",
  Mm = (e) => {
    let t = document.documentElement.dataset;
    return (
      "embedded" in t &&
      t.chrome === "none" &&
      (t.hostcaps ?? "").split(" ").includes(e)
    );
  },
  Nm = () => Mm(Am),
  Pm = () => window.parent !== window && Mm(jm),
  Fm = () => Om() && !Nm(),
  Im = (e, t) =>
    fetch(e, {
      ...t,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "anthropic-client-platform": "web_claude_ai",
      },
    }),
  Lm = () => ({ iosApp: Om(), androidApp: km(), takesBlob: !Fm() && Pm() }),
  Rm = { fromRealm: $p, parseResult: Qp, mintId: Vp },
  zm = { key: "", times: [] },
  Bm = null,
  Vm = (e) =>
    e.decisionSurfaceOpen() ||
    document.querySelector(e.confirmOpenSelector) !== null;
function Hm(e, t, n, r = !0) {
  zm.key !== e.frameUuid && (zm = { key: e.frameUuid, times: [] });
  let i = zm.times,
    a = Date.now();
  for (; i.length > 0 && a - i[0] > 6e4;) i.shift();
  return n && i.length >= 5
    ? "too many save prompts; try again shortly"
    : Bm === null
      ? Vm(e)
        ? "another permission prompt is open"
        : t.inert
          ? "frame content is not interactive yet"
          : (n && r && i.push(a), null)
      : "a save prompt is already open";
}
var Um = new Set(["md"]),
  Wm = null;
function Gm(e) {
  return Wm !== null && Wm.iframe === e ? Wm.formats : null;
}
function Km(e) {
  return Wm !== null && Wm.iframe === e ? Wm.dialogFormats() : null;
}
function qm(e, t) {
  return Wm === null || Wm.iframe !== e ? "unsupported" : Wm.open(t);
}
function Jm(e, t) {
  return Wm === null || Wm.iframe !== e ? "unsupported" : Wm.openDownload(t);
}
var Ym = null;
function Xm(e, t, n) {
  let r = (e) => Promise.resolve({ ok: !1, reason: e }),
    i = hm(n.filename);
  if (!i.ok || n.bytes.byteLength === 0) return r("failed");
  if (km() && !Nm()) return r("unsupported");
  let a = Fm();
  if (Nm() && !Pm() && n.bytes.byteLength > 209715200)
    return (
      e.trackFileSaved?.("refused", xm(n.filename), Cm(n.bytes.byteLength)),
      r("too_large")
    );
  if (
    Ym !== null ||
    Bm !== null ||
    e.decisionSurfaceOpen() ||
    document.querySelector(e.confirmOpenSelector) !== null ||
    t.inert
  )
    return r("busy");
  let o = {
    ...e,
    trackCapCalled: void 0,
    report: (t, n) => {
      t !== "downloads-settled" && e.report(t, n);
    },
  };
  return new Promise((e) => {
    ah(
      o,
      t,
      i.name,
      i.mime,
      n.bytes,
      () => void 0,
      (e) => {
        Ym = e;
      },
      { to: "disk", settle: e, viewerAsked: !0 },
      a,
      () => void 0,
    );
  });
}
function Zm() {
  Ym?.close({ code: "unavailable", message: "frame was re-booted" });
}
function Qm(e, t, n = null, r) {
  let { frameOrigin: i } = e,
    a = null,
    o = (e, t) => ({ code: e, message: t }),
    s = new Set([...rm].filter(([, e]) => !pp(e)).map(([e]) => e)),
    c = () => new Set(im.filter(([, e]) => u(e)).map(([e]) => e)),
    l = () =>
      e.firstPartyPage?.() === !0 &&
      t.dataset.tokened === "true" &&
      t.dataset.flagged === "true",
    u = (t) => {
      let n = Lm();
      return lp(e, n) === "shell" && !l() ? !1 : dp(e, n, t);
    },
    d = null,
    f = (t) => {
      Om() ||
        km() ||
        e.chrome()?.showExportFeedback?.({
          format: t,
          busy: () => Vm(e),
          hidden: () => e.hostPaneHidden?.() === !0,
          done: () => {
            e.restoreContentInteractivity();
            let t = document.activeElement;
            (t === null || t === document.body) && e.slot.focus();
          },
        });
    },
    p = (t, n, r, i) => {
      if (!s.has(t) && !(r && c().has(t))) return "unsupported";
      if (d !== null || Bm !== null || Vm(e)) return "busy";
      let a = !1,
        o = (e) => {
          a || ((a = !0), window.clearTimeout(l.timer), l.release(), e());
        },
        l = {
          request: Vp(),
          format: t,
          openedAt: performance.now(),
          openedWall: Date.now(),
          sink: n,
          timer: 0,
          answered: !1,
          fail: (e) => o(() => n.done({ ok: !1, reason: e })),
          succeed: o,
          release: () => {
            d === l && (d = null);
          },
          dialog: null,
        },
        { openedAt: u } = l,
        f = i ? Ip : Fp,
        p = f,
        m = u,
        h = !1,
        g = () => {
          let t = performance.now(),
            n = Vm(e);
          (!n && !h && (f -= t - m), (h = n), (m = t));
          let r = u + Rp - t;
          if (f <= 0 || r <= 0) return l.fail("timeout");
          let i = n ? zp : Math.min(f, zp);
          l.timer = window.setTimeout(g, Math.min(i, r));
        };
      return (
        (l.timer = window.setTimeout(g, zp)),
        (d = l),
        {
          request: l.request,
          ...(i && { windowMs: p }),
          abort: (e) => {
            l.dialog === null
              ? l.fail(e)
              : l.dialog.close({
                  code: "unavailable",
                  message: "export request withdrawn",
                });
          },
          decline: (e = !1) => {
            l.answered ||
              (e && n.to === "host"
                ? l.fail("page_cancelled")
                : l.fail(e && r ? "declined" : "failed"));
          },
          answered: () => l.answered,
        }
      );
    },
    m = (e) => {
      let t,
        n = new Promise((e) => {
          t = e;
        }),
        r = p(
          e.format,
          {
            to: "host",
            destination: e.destination,
            clipboard: e.clipboard === !0,
            assistant: e.assistant === !0,
            done: t,
          },
          !1,
          e.longWindow === !0,
        );
      return typeof r == "string" ? r : { ...r, settled: n };
    },
    h = (e) => {
      let t,
        n = new Promise((e) => {
          t = e;
        }),
        r = e.interactive === !0,
        i = p(
          e.format,
          {
            to: "disk",
            confirm: e.confirm === !0,
            bundle: r && e.bundle === !0 && s.has(e.format),
            done: t,
          },
          r,
          r,
        );
      return typeof i == "string" ? i : { ...i, settled: n };
    },
    g = Wm !== null && Wm.iframe === t && Wm.live === r ? Wm.cede() : null;
  (g !== null &&
    ((d = g),
    (g.release = () => {
      d === g && (d = null);
    })),
    (Wm = {
      iframe: t,
      live: r,
      formats: s,
      dialogFormats: c,
      open: m,
      openDownload: h,
      cede: () => {
        let e = d;
        return ((d = null), e);
      },
    }));
  let _ = (n, r, i) => {
      let s = r,
        c = null;
      if (typeof s == "object" && s && s.request !== void 0) {
        if (
          typeof s.request != "string" ||
          d === null ||
          s.request !== d.request
        ) {
          (n({
            error: o(
              "request_unknown",
              "no open export request matches `request` (expired, already answered, or never issued)",
            ),
          }),
            e.report("downloads-refused", `request_unknown:${xm(s.filename)}`),
            e.trackCapCalled?.("downloads", "refused_request_unknown"));
          return;
        }
        ((c = d), (d = null), (c.answered = !0), window.clearTimeout(c.timer));
      }
      let l = (t, r) => {
          (n({ error: o(t, r) }),
            e.report("downloads-refused", `${t}:${xm(s?.filename)}`),
            e.trackCapCalled?.("downloads", `refused_${t}`),
            c?.fail(
              t === "too_large"
                ? "too_large"
                : t === "rate_limited"
                  ? "busy"
                  : "failed",
            ));
        },
        u = (t, r, i = "unavailable") => {
          (n({ error: o(i, r) }),
            e.report("downloads-refused", `${t}:${xm(s?.filename)}`),
            e.trackCapCalled?.("downloads", `refused_${t}`),
            c?.fail("failed"));
        },
        p = s?.bytes;
      if (!s || !(p instanceof ArrayBuffer || p instanceof Blob))
        return l(
          "bad_request",
          "save needs {filename, bytes: ArrayBuffer | Blob}",
        );
      if (Ap(p) === 0) return l("bad_request", "empty file");
      let m = null;
      if (c !== null) {
        if (!(p instanceof ArrayBuffer))
          return l(
            "bad_request",
            "an export answer needs {filename, bytes: ArrayBuffer, request}",
          );
        if (c.sink.to !== "disk" && p.byteLength > 16777216)
          return (
            e.trackFileSaved?.("refused", xm(s.filename), Cm(p.byteLength)),
            l(
              "too_large",
              `an export answer is at most ${Mp} bytes; this one is ${p.byteLength}`,
            )
          );
        let t = c,
          { sink: n } = t;
        m =
          n.to === "host"
            ? {
                to: "host",
                destination: n.destination,
                assistant: n.assistant,
                bytes: p,
                settle: (e) => {
                  e.ok ? t.succeed(() => n.done(e)) : t.fail(e.reason);
                },
              }
            : {
                to: "disk",
                settle: (e) => {
                  e.ok ? t.succeed(() => n.done(e)) : t.fail(e.reason);
                },
              };
      }
      let h = hm(s.filename);
      if (!h.ok) return l(h.code, h.message);
      if (pp(h.mime) && i !== "yes")
        return typeof i == "object"
          ? l("rate_limited", i.busy)
          : i === "older_host"
            ? l(
                "rejected_extension",
                "the Claude app or tab around this artifact is out of date and cannot save this file type; reload or update it",
              )
            : i === "no_answer"
              ? u(
                  "host_unavailable",
                  "the app around this artifact did not answer whether it can add content credentials; try again",
                )
              : u(
                  "host_unavailable",
                  "this file type is saved only with content credentials, which cannot be added here now",
                  "not_signed",
                );
      let g = h.name.slice(h.name.lastIndexOf(".") + 1),
        _ =
          c !== null &&
          g !== c.format &&
          g === "zip" &&
          c.sink.to === "disk" &&
          c.sink.bundle;
      if (c !== null && g !== c.format && !_)
        return l(
          "bad_request",
          `file extension does not match the requested export format .${c.format}`,
        );
      if (Nm() && !Pm() && Ap(p) > 209715200)
        return (
          e.trackFileSaved?.("refused", xm(s.filename), Cm(Ap(p))),
          l(
            "too_large",
            `file too large for this host: at most ${qp} bytes; this one is ${Ap(p)}`,
          )
        );
      if (m?.to !== "host" && km() && !Nm())
        return u(
          "host_unavailable",
          "the Claude app on this device cannot save files",
        );
      let v = c?.sink.to === "host" ? Lp : Fp,
        y = !(
          c !== null &&
          (c.sink.to === "disk"
            ? !c.sink.confirm && !Fm() && !_ && Ap(p) <= 16777216
            : c.sink.clipboard && !c.sink.assistant && Um.has(c.format)) &&
          performance.now() - c.openedAt <= v &&
          Date.now() - c.openedWall <= v
        ),
        b = Hm(e, t, y && i === void 0);
      if (b !== null) return l("rate_limited", b);
      ah(
        e,
        t,
        h.name,
        h.mime,
        p,
        n,
        (e) => {
          ((a = e), c !== null && (c.dialog = e));
        },
        m,
        y,
        f,
      );
    },
    v = !1,
    y = !1,
    b = 0,
    x = (n, i) => {
      let a = i,
        s = hm(a?.filename),
        c = a?.bytes;
      if (
        !s.ok ||
        !pp(s.mime) ||
        !(c instanceof ArrayBuffer || c instanceof Blob) ||
        Ap(c) === 0 ||
        a?.request !== void 0
      )
        return _(n, i);
      let l = Lm();
      if (!u(s.mime)) return _(n, i, "unsigned");
      let d = v
        ? "an earlier save is still being checked; try again in a moment"
        : Hm(e, t, !0);
      if (d !== null) return _(n, i, { busy: d });
      v = !0;
      let f = (a) => {
        if (((v = !1), y)) {
          (n({ error: o("unavailable", "frame was re-booted") }),
            e.report("downloads-refused", `host_unavailable:${xm(s.name)}`),
            e.trackCapCalled?.("downloads", "refused_host_unavailable"));
          return;
        }
        t.isConnected && r() && _(n, i, a);
      };
      gp(e, l, Rm, s.mime, Ap(c)).then(f, () => f("no_answer"));
    },
    S = (a) => {
      if (
        !t.isConnected ||
        !r() ||
        a.origin !== i ||
        !t.contentWindow ||
        a.source !== t.contentWindow
      )
        return;
      if (Op(a.data)) {
        if (!l() || b >= Dp) return;
        b++;
        let n = Lm(),
          r = {};
        if (lp(e, n) === "shell")
          for (let [t, i] of im) {
            let a = up(i),
              o = a === void 0 ? null : cp(e, n, a);
            o !== null && (r[t] = o.maxBytes);
          }
        let a = { __frame_signed_saves: !0, formats: [...c()], maxBytes: r };
        t.contentWindow.postMessage(a, i);
        return;
      }
      let s = _e(a.data, "downloads");
      if (!s) {
        n && n(a.data);
        return;
      }
      let u = performance.now(),
        d = (n) => {
          r() &&
            (t.contentWindow?.postMessage(ye(s.id, n), i),
            e.noteCapOutcome?.(
              s.cap,
              s.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - u,
            ));
        };
      if (s.method === "save") return x(d, s.args[0]);
      d({ error: o("bad_request", `unknown method ${s.method}`) });
    };
  return (
    window.addEventListener("message", S),
    () => {
      ((y = !0),
        window.removeEventListener("message", S),
        Wm !== null && Wm.open === m && (Wm = null),
        a?.close({ code: "unavailable", message: "frame was re-booted" }),
        d?.fail("failed"));
    }
  );
}
var $m = {
  code: "unavailable",
  message: "the Claude app on this device cannot save files",
};
function eh(e, t, n) {
  let r = bm(n);
  if (!r.ok) return { code: "bad_request", message: r.message };
  if (km() && !Nm()) return $m;
  let i = Hm(e, t, !0, !1);
  return i === null ? null : { code: "rate_limited", message: i };
}
function th(e, t, n, r = {}) {
  let i = (e, t) => Promise.resolve({ error: { code: e, message: t } }),
    a = bm(n.name);
  if (!a.ok) return i("bad_request", a.message);
  let { size: o } = n;
  if (!Number.isSafeInteger(o) || o < 0)
    return i("bad_request", "size must be a whole number of bytes");
  if (o > Hp)
    return i("too_large", "this file is larger than a project download allows");
  if (Nm() && !Pm() && o > 209715200)
    return i(
      "too_large",
      `this device saves files up to ${j(qp, "en-US")}; this file is ${j(o, "en-US")}`,
    );
  if (km() && !Nm()) return Promise.resolve({ error: $m });
  if (r.signal?.aborted) return i("unavailable", "frame was re-booted");
  let s = Hm(e, t, !0);
  return s === null
    ? new Promise((i) => {
        let s = null,
          c = () =>
            s?.close({ code: "unavailable", message: "frame was re-booted" });
        (r.signal?.addEventListener("abort", c, { once: !0 }),
          r.onPrompt?.(),
          ah(
            e,
            t,
            a.name,
            "application/octet-stream",
            {
              size: o,
              ext: a.ext,
              read: (e, t) => (r.onPrompt?.(), rh(n, e, t)),
            },
            (e) => {
              (r.signal?.removeEventListener("abort", c),
                i("error" in e ? e : { status: "saved" }));
            },
            (e) => {
              s = e;
            },
            null,
            !0,
            () => void 0,
          ));
      })
    : i("rate_limited", s);
}
var nh = {
  code: "changed",
  message: "the file changed while it was downloading; try again",
};
async function rh(e, t, n) {
  let r = [];
  for (let i = 0; i < e.size;) {
    let a = Math.min(Up, e.size - i),
      o;
    try {
      o = await ih(e, i, a, n);
    } catch (e) {
      let t = e?.code;
      return t === "changed"
        ? nh
        : t === "not_found"
          ? {
              code: "changed",
              message:
                "the file changed or was removed while it was downloading",
            }
          : t === "rate_limited"
            ? {
                code: t,
                message: "too many project file reads; try again shortly",
              }
            : {
                code: "unavailable",
                message: "the project file could not be read",
              };
    }
    if (
      o.revision !== e.revision ||
      o.size !== e.size ||
      o.bytes.byteLength !== a
    )
      return nh;
    (r.push(new Blob([o.bytes])), (i += a), t(i));
  }
  return new Blob(r, { type: "application/octet-stream" });
}
async function ih(e, t, n, r) {
  for (let i = 0; ; i++)
    try {
      return await e.readSlice(t, n, r);
    } catch (e) {
      let { code: t, retryAfterMs: n } = e ?? {};
      if ((t !== "unavailable" && t !== "rate_limited") || i >= Wp || r.aborted)
        throw e;
      let a =
        typeof n == "number" && Number.isFinite(n)
          ? Math.min(Math.max(n, 0), Gp)
          : 1e3 * 2 ** i;
      await new Promise((e, t) => {
        let n = () => {
            (window.clearTimeout(i), t(r.reason));
          },
          i = window.setTimeout(() => {
            (r.removeEventListener("abort", n), e());
          }, a);
        r.addEventListener("abort", n, { once: !0 });
      });
    }
}
function ah(e, t, n, r, i, a, o, s, c, l) {
  let u = jp(i) ? null : i,
    d = jp(i) ? i : null,
    f = jp(i) ? Ap(i) : i.size,
    p = s !== null && s.to === "host" ? s : null,
    m = s?.to === "disk" && s.viewerAsked === !0,
    h = u === null && p === null && !m ? up(r) : void 0,
    g = h === void 0 ? "none" : lp(e, Lm()),
    _ = g === "shell" ? cp(e, Lm(), h) : null,
    v = f,
    y = h !== void 0 && e.saveSigning?.() ? vp(h, Lm(), v) : null,
    b =
      _ === null
        ? g === "host"
          ? "host"
          : "no_lane"
        : v > _.maxBytes
          ? "too_large"
          : null,
    x = (t, n) => {
      if (y !== null) {
        e.report("downloads-sign", xp(t, y, n));
        try {
          e.flushReports?.();
        } catch {}
      }
    },
    S = null,
    C = !1,
    w = !1,
    T = !0,
    E = () => {
      ((T = !1),
        S !== null && !C && x("abandoned"),
        S?.then((e) => e?.end()),
        (S = null));
    },
    D = c || (p === null && Nm() && !Pm());
  (D && (e.setDecisionSurfaceOpen(!0), e.inertContent()),
    (e.slot.tabIndex = -1));
  let O = Tm("div", "consent");
  (O.setAttribute("role", "dialog"), O.setAttribute("aria-modal", "true"));
  let k = Tm(
    "b",
    void 0,
    p === null
      ? Tp(m ? Ep.viewerDownloadAsk : Ep.downloadAsk)
      : p.assistant
        ? `Let Claude send a file from this artifact to ${p.destination}?`
        : `Let this artifact send a file to ${p.destination}?`,
  );
  ((k.id = "dl-hdr"), O.setAttribute("aria-labelledby", "dl-hdr"));
  let A = Tm("span", "dl-size", j(f, document.documentElement.lang || void 0)),
    M = Tm("span", "dl-icon");
  (M.setAttribute("aria-hidden", "true"),
    (M.innerHTML = r.startsWith("image/") ? Em : Dm));
  let ee = Tm(
      "div",
      "dl-file",
      Tm("span", "dl-chip", M, Tm("span", "dl-text", Tm("b", void 0, n), A)),
    ),
    te = Tm(
      "span",
      void 0,
      p === null ? Tp(Ep.trust) : "Only continue if you trust this artifact.",
    );
  (O.append(k, ee), m || O.append(te));
  let N = Tm("div", "row"),
    P = Tm("button", void 0, p === null ? Tp(Ep.saveFile) : "Send"),
    F = Tm("button", "secondary", p === null ? Tp(Ep.cancel) : "Cancel");
  P.disabled = !0;
  let ne = new Set(),
    re = new AbortController(),
    ie = 0,
    I = !1,
    ae = !1,
    oe = () => {
      if (!O.isConnected) return re.abort();
      if (!(I || ae)) {
        if (
          ne.size > 0 ||
          document.activeElement instanceof HTMLIFrameElement
        ) {
          ie = window.setTimeout(oe, Pp);
          return;
        }
        P.disabled = !1;
      }
    };
  ie = window.setTimeout(oe, Pp);
  let se = () => {
      (document.activeElement === P && F.focus(),
        (P.disabled = !0),
        window.clearTimeout(ie),
        (ie = window.setTimeout(oe, Pp)));
    },
    ce = (e) => {
      if (!O.isConnected) {
        (window.clearTimeout(ie), re.abort());
        return;
      }
      if (e.type === "pointerdown") ne.add(e.pointerId);
      else if (e.type === "pointerup" || e.type === "pointercancel") {
        ne.delete(e.pointerId) ? P.disabled && se() : se();
        return;
      }
      if (e.type === "pointermove" && e.buttons === 0) {
        ne.delete(e.pointerId);
        return;
      }
      P.disabled && se();
    };
  for (let e of [
    "keydown",
    "pointerdown",
    "pointerup",
    "pointercancel",
    "wheel",
    "pointermove",
  ])
    document.addEventListener(e, ce, {
      capture: !0,
      passive: e === "wheel" || e === "pointermove",
      signal: re.signal,
    });
  (document.addEventListener(
    "visibilitychange",
    () => {
      document.hidden || se();
    },
    { signal: re.signal },
  ),
    window.addEventListener("focus", se, { signal: re.signal }));
  let le = !1,
    ue = null,
    de = null,
    fe = !1,
    pe = !1,
    me = () => {
      ((pe = !0), R({ code: "declined", message: "save prompt expired" }, !1));
    },
    he = window.setTimeout(me, Np),
    ge = performance.now(),
    L = { close: (e) => R(e, !1) },
    R = (t, r = !0) => {
      if (le) return;
      ((le = !0),
        window.clearTimeout(ie),
        window.clearTimeout(he),
        ue?.(),
        de?.(),
        E(),
        t !== null && fe && x("not_saved"),
        u === null &&
          (t === null
            ? (e.trackCapCalled?.("downloads", "granted"),
              e.trackFileSaved?.(
                p === null
                  ? m
                    ? "shell"
                    : s === null
                      ? "page"
                      : "tab"
                  : "handoff",
                xm(n),
                Cm(v),
              ),
              b !== null && x(b))
            : t.code === "declined" &&
              e.trackCapCalled?.("downloads", "denied"),
          e.report(
            "downloads-settled",
            `${t === null ? (p === null ? "saved" : "delivered") : t.code === "not_signed" ? "unavailable" : t.code}:${xm(n)}`,
          )),
        re.abort());
      let i = O.contains(document.activeElement);
      if ((O.remove(), Bm === L && (Bm = null), o(null), D)) {
        e.setDecisionSurfaceOpen(!1);
        let t = e.restoreContentInteractivity(r && c);
        c && !t && (r || i) && e.slot.focus();
      }
      if (
        (a(
          t
            ? { error: t }
            : { result: { status: p === null ? "saved" : "delivered" } },
        ),
        s !== null)
      ) {
        let e = n.slice(n.lastIndexOf(".") + 1);
        t === null
          ? s.to === "host"
            ? s.settle({ ok: !0, format: e, filename: n, bytes: s.bytes })
            : s.settle({ ok: !0, format: e, filename: n })
          : s.settle({
              ok: !1,
              reason:
                t.code === "declined"
                  ? pe && s.to === "host" && s.assistant
                    ? "expired"
                    : "declined"
                  : "failed",
            });
      }
      if (t === null && p === null)
        try {
          l(xm(n));
        } catch (t) {
          e.markHandled(t);
        }
    };
  ((Bm = L), o(L));
  let _e = (e = !1) => {
      ((ae = !0),
        window.clearTimeout(ie),
        e || re.abort(),
        (P.disabled = !0),
        F.focus());
    },
    ve = !1,
    ye = (e) =>
      !ve || e?.name !== "NotAllowedError"
        ? !1
        : ((ve = !1),
          (ae = !1),
          (fe = !0),
          x("share_reask"),
          (te.textContent = Tp(Ep.fileReady)),
          se(),
          !0),
    be = (e) => {
      let i;
      try {
        let t = new File([e], n, { type: r });
        if (!navigator.canShare?.({ files: [t] }))
          return R({ code: "unavailable", message: "cannot share this file" });
        i = Promise.resolve(navigator.share({ files: [t] }));
      } catch (e) {
        return ye(e)
          ? void 0
          : R({ code: "unavailable", message: "share failed" });
      }
      (_e(ve),
        i.then(
          () => R(null),
          (e) => {
            le ||
              ye(e) ||
              (e?.name === "AbortError"
                ? R({ code: "declined", message: "viewer declined" })
                : t.isConnected
                  ? R({ code: "unavailable", message: "share failed" })
                  : R({ code: "unavailable", message: "frame was removed" }));
          },
        ));
    },
    z = (i, a) => {
      _e();
      let o = n.lastIndexOf("."),
        s = u?.ext ?? (o === -1 ? "" : n.slice(o + 1)),
        c = a === "blob" ? 1 : Math.max(1, Math.ceil(f / Kp)),
        l = Vp(),
        d = 0,
        p = !1,
        m = 0,
        h = {
          __frame_chrome_state: !0,
          state: "save_file",
          uuid: e.frameUuid,
          id: l,
          filename: n,
        },
        g = (e) => {
          window.parent.postMessage(e, location.origin);
        },
        _ = (e, t) => {
          g({
            ...h,
            ext: s,
            mime: u === null ? (am.get(s) ?? r) : r,
            size: f,
            seq: d,
            total: c,
            data: e,
            ...(t && { abort: t }),
          });
        },
        v = (e) => {
          if (!$p(e)) return;
          let t = Qp(e.data);
          t === null ||
            t.id !== l ||
            (t.ok && d < c) ||
            ((p = !0),
            t.ok
              ? R(null)
              : t.reason === "declined"
                ? R({ code: "declined", message: "viewer declined" })
                : t.reason === "unsigned"
                  ? R({
                      code: "not_signed",
                      message:
                        "the file was not saved: content credentials were not added",
                    })
                  : R({
                      code: "unavailable",
                      message: "host could not save the file",
                    }));
        },
        y = () => {
          m = window.setTimeout(() => {
            R({
              code: "unavailable",
              message: "host did not confirm the save",
            });
          }, Jp);
        };
      if (
        (window.addEventListener("message", v),
        (ue = () => {
          (window.removeEventListener("message", v),
            window.clearTimeout(m),
            !p &&
              (a === "blob"
                ? g({ ...h, transport: a, size: f, abort: !0 })
                : _("", !0)));
        }),
        a === "blob")
      ) {
        try {
          let e = new Blob([i], { type: r });
          g({ ...h, transport: a, size: f, blob: e });
        } catch {
          return ((p = !0), R({ code: "unavailable", message: "save failed" }));
        }
        return ((d = c), y());
      }
      let b = () => {
          let e = d * Kp,
            t = Math.min(f, e + Kp);
          return Promise.resolve()
            .then(() =>
              i instanceof Blob
                ? i
                    .slice(e, t)
                    .arrayBuffer()
                    .then((e) => new Uint8Array(e))
                : new Uint8Array(i, e, t - e),
            )
            .then(em);
        },
        x = () => {
          le ||
            b().then(
              (e) => {
                if (!le) {
                  if (!t.isConnected)
                    return R({
                      code: "unavailable",
                      message: "frame was removed",
                    });
                  if ((_(e), (d += 1), d < c))
                    return void window.setTimeout(x, 0);
                  y();
                }
              },
              () => R({ code: "unavailable", message: "save failed" }),
            );
        };
      x();
    },
    xe = () => {
      if (!t.isConnected)
        return R({ code: "unavailable", message: "frame was removed" });
      if (p !== null) return R(null);
      let i = d;
      if (i === null) {
        u !== null && Ce(u);
        return;
      }
      let a = pp(r) && !w && lp(e, Lm()) !== "host";
      if (a && (S === null || C)) return R(kp);
      if (S !== null && !C) {
        if (((C = !0), 12e4 - (performance.now() - ge) >= 55e3))
          return Ce(Se(i, S), !0);
        if ((x("no_time"), E(), a)) return R(kp);
      }
      if (Fm()) return be(i);
      if (Pm()) return z(i, "blob");
      if (Nm()) return z(i, "chunks");
      let o = "";
      try {
        o = URL.createObjectURL(new Blob([i], { type: r }));
        let t = document.createElement("a");
        ((t.href = o),
          (t.download = n),
          e.slot.append(t),
          t.click(),
          t.remove(),
          window.setTimeout(() => URL.revokeObjectURL(o), 3e4),
          R(null));
      } catch {
        (o && URL.revokeObjectURL(o),
          R({ code: "unavailable", message: "save failed" }));
      }
    },
    Se = (e, t) => ({
      size: f,
      ext: "",
      read: async (n, i) => {
        x("start");
        let a = performance.now(),
          o = (t) => ({ blob: e, word: t }),
          s,
          c = await Promise.race([
            t.then(
              (t) => t?.sign(new Blob([e], { type: r })) ?? o("chunk_load"),
            ),
            new Promise((e) => {
              let t = (t) => () => e(o(t));
              ((s = window.setTimeout(t("timeout"), np)),
                i.addEventListener("abort", t("abandoned"), { once: !0 }));
            }),
          ])
            .then((e) => (jp(e.blob) ? e : o("fault")))
            .catch(() => o("fault"));
        return (
          window.clearTimeout(s),
          E(),
          x(bp(c.word), performance.now() - a),
          c.word === "signed" ? ((w = !0), c.blob) : pp(r) ? kp : e
        );
      },
    }),
    Ce = (e, t = !1) => {
      ((I = !0),
        (P.disabled = !0),
        window.clearTimeout(ie),
        t || window.clearTimeout(he),
        F.focus(),
        te.setAttribute("aria-live", "polite"));
      let n = te.textContent,
        r = (e) => {
          if (t) {
            te.textContent = Tp(Ep.preparing);
            return;
          }
          let n = document.documentElement.lang || void 0;
          te.textContent = Tp(Ep.downloadProgress, {
            done: j(e, n),
            size: j(f, n),
          });
        };
      r(0);
      let i = new AbortController(),
        a = window.setTimeout(() => {
          R({ code: "unavailable", message: "the download took too long" });
        }, Gp);
      ((de = () => {
        (window.clearTimeout(a), i.abort());
      }),
        e.read(r, i.signal).then(
          (e) => {
            if (!le) {
              if (!jp(e)) return R(e);
              if ((window.clearTimeout(a), (I = !1), (d = e), t)) {
                if (
                  ((te.textContent = n),
                  (f = Ap(e)),
                  (A.textContent = j(
                    f,
                    document.documentElement.lang || void 0,
                  )),
                  !c)
                )
                  return xe();
                ve = !0;
              }
              if (!(
                (Fm() && !(t && navigator.userActivation?.isActive === !0)) ||
                ((Pm() || !Nm()) && navigator.userActivation?.isActive === !1)
              ))
                return xe();
              (t ? (fe = !0) : (he = window.setTimeout(me, Np)),
                (te.textContent = Tp(Ep.fileReady)),
                se());
            }
          },
          () =>
            R({
              code: "unavailable",
              message: "the project file could not be read",
            }),
        ));
    };
  ((P.onclick = () => {
    P.disabled || le || ae || I || xe();
  }),
    (F.onclick = () => R({ code: "declined", message: "viewer declined" })),
    N.append(F, P),
    O.append(N),
    (O.tabIndex = -1),
    O.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        (e.preventDefault(), F.click());
        return;
      }
      if (e.key !== "Tab") return;
      let t = P.disabled ? [F] : [F, P],
        n = t[0],
        r = t[t.length - 1];
      e.shiftKey &&
      (document.activeElement === n || document.activeElement === O)
        ? (e.preventDefault(), r.focus())
        : !e.shiftKey &&
          document.activeElement === r &&
          (e.preventDefault(), n.focus());
    }));
  let { org: we, loadSigner: Te } = e;
  if (_ !== null && b === null && we && Te) {
    let { maxBytes: t, routes: n } = _,
      r = n === "frame" ? tp(e) : Im;
    (x("load"),
      (S = (async () => {
        let e = await Te();
        if (!T) return null;
        let n = { orgUuid: we, rawFetch: r, maxBytes: t, timeoutMs: np };
        return e?.prepare(n) ?? null;
      })().catch(() => null)));
  }
  if (!c) return xe();
  (e.slot.append(O), O.focus());
}
var oh = 75e3,
  sh = 13e4,
  ch = 2e3,
  lh = 65536,
  uh = 16384,
  dh = 32,
  fh = 64,
  ph = 200,
  mh = /^\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]*$/,
  hh = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);
function gh(e, t) {
  return { code: e, message: t };
}
function _h(e) {
  return typeof e == "object" && !!e && !Array.isArray(e);
}
var vh = { invalid_argument: "invalid_request", too_large: "invalid_request" };
function yh(e, t) {
  let n = pt(t);
  if (n !== null) {
    let e = vh[n.code];
    return gh(e === void 0 ? n.code : e, n.message ?? n.code);
  }
  switch (e) {
    case 400:
    case 413:
      return gh(
        "invalid_request",
        "the call was rejected as malformed \u2014 an undeclared method and path, or a query or body outside the documented shape and size",
      );
    case 401:
    case 403:
      return gh(
        "upstream_auth",
        "the platform could not authenticate this call",
      );
    case 404:
      return gh(
        "capability_disabled",
        "endpoints are not available in this view",
      );
    case 422:
      return gh("tool_error", "the handler failed");
    case 429:
      return gh("rate_limited", "calling too often \u2014 slow down");
    case 502:
    case 503:
    case 504:
      return gh(
        "runtime_unavailable",
        "the handler runtime is busy or unreachable \u2014 retry once",
      );
    default:
      return gh("upstream_error", `request failed (${e})`);
  }
}
function bh(e) {
  if (!_h(e)) return null;
  let { status: t, headers: n, body: r } = e;
  if (typeof t != "number" || !Number.isInteger(t) || t < 200 || t > 599)
    return null;
  let i = Object.create(null);
  if (n != null) {
    if (!_h(n)) return null;
    for (let [e, t] of Object.entries(n)) {
      if (typeof t != "string") return null;
      i[e] = t;
    }
  }
  return { status: t, headers: i, body: r === void 0 ? null : r };
}
function xh(e) {
  let t = (e) => ({ error: gh("invalid_request", e) }),
    n;
  try {
    n = lt(e);
  } catch {
    n = !1;
  }
  if (!n || !_h(e))
    return t("the request must be plain JSON data within the size limits");
  let { method: r, path: i, query: a, body: o } = e;
  if (typeof r != "string" || !hh.has(r))
    return t("method must be one of GET, POST, PUT, PATCH, DELETE");
  if (typeof i != "string" || i.length > ph || !mh.test(i))
    return t(
      'path must start with "/" and hold at most 200 URL path characters (no query string or fragment)',
    );
  let s = `{"method":${JSON.stringify(r)},"path":${JSON.stringify(i)}`;
  if (a !== void 0) {
    if (
      !_h(a) ||
      Object.keys(a).length > dh ||
      !Object.values(a).every((e) => typeof e == "string")
    )
      return t("query must be a plain object of at most 32 string values");
    let e = new TextEncoder();
    if (Object.keys(a).some((t) => t === "" || e.encode(t).length > fh))
      return t("query keys must be 1 to 64 bytes");
    let n = JSON.stringify(a);
    if (e.encode(n).length > uh) return t("query exceeds the 16 KiB limit");
    s += `,"query":${n}`;
  }
  if (o !== void 0) {
    if (r === "GET") return t("a GET carries no body");
    let e;
    try {
      e = JSON.stringify(o);
    } catch {
      e = void 0;
    }
    if (typeof e != "string") return t("body must be JSON data");
    if (new TextEncoder().encode(e).length > lh)
      return t("body exceeds the 64 KiB limit");
    s += `,"body":${e}`;
  }
  return { json: s + "}" };
}
function Sh(e, t, n, r, i, a = new Map()) {
  let { frameOrigin: o, frameUuid: s } = e,
    c = tt(e),
    l = (e, t) => {
      if ("any" in AbortSignal) return AbortSignal.any([e, t]);
      let n = new AbortController(),
        r = () => n.abort();
      return (
        (e.aborted || t.aborted) && n.abort(),
        e.addEventListener("abort", r, { once: !0 }),
        t.addEventListener("abort", r, { once: !0 }),
        n.signal
      );
    },
    u = (t, r) => (a) =>
      fetch(`/api/frame/endpoints/${s}/call${c}`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", ...e.cpHeaders },
        body: `{"token":${JSON.stringify(n.value)},"request":${t}}`,
        signal: l(i(a), r),
      }).then(async (e) => ({
        status: e.status,
        ok: e.ok,
        text: await e.text(),
      })),
    d = (t, r) => {
      let i = n.value,
        a = Date.now();
      return t(oh).then((o) =>
        o.status !== 403 || Xe(o.text) || r.aborted
          ? o
          : e
              .requestReboot()
              .catch((t) => (e.markHandled(t), null))
              .then(() => {
                let e = sh - (Date.now() - a) - ch;
                return n.value !== i && e > 0 && !r.aborted
                  ? t(Math.min(oh, e))
                  : o;
              }),
      );
    },
    f = (i) => {
      if (
        !t.isConnected ||
        !r() ||
        i.origin !== o ||
        !t.contentWindow ||
        i.source !== t.contentWindow
      )
        return;
      let s = _e(i.data, "endpoints");
      if (!s) return;
      if (s.method === "cancelCall") {
        let [e] = s.args;
        if (typeof e == "string") {
          let t = a.get(e);
          (a.delete(e), t?.abort());
        }
        return;
      }
      let c = performance.now(),
        l = (n) => {
          r() &&
            (t.contentWindow?.postMessage(ye(s.id, n), o),
            e.noteCapOutcome?.(
              s.cap,
              s.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - c,
            ));
        };
      if (s.method !== "fetch")
        return l({
          error: gh("capability_removed", "unknown endpoints method"),
        });
      let f = (n) => {
        r() && t.isConnected && e.report("endpoints-call", n);
      };
      if (n.value === "")
        return l({
          error: gh(
            "capability_disabled",
            "endpoints are not available in this view",
          ),
        });
      let p = xh(s.args[0]);
      if ("error" in p) return l(p);
      if (a.has(s.id))
        return l({ error: gh("invalid_request", "duplicate call id") });
      let m = new AbortController();
      (a.set(s.id, m),
        d(u(p.json, m.signal), m.signal)
          .then((e) => {
            if (m.signal.aborted) return;
            if (!e.ok)
              return (
                Xe(e.text) || f(String(e.status)),
                l({ error: yh(e.status, e.text) })
              );
            let t;
            try {
              t = bh(JSON.parse(e.text));
            } catch {
              t = null;
            }
            if (t === null)
              return (
                f("malformed-response"),
                l({ error: gh("upstream_error", "malformed response") })
              );
            l({ result: t });
          })
          .catch((t) => {
            (e.markHandled(t),
              !m.signal.aborted &&
                (f("fetch-failed"),
                l({ error: gh("runtime_unavailable", "request failed") })));
          })
          .finally(() => {
            a.get(s.id) === m && a.delete(s.id);
          }));
    };
  return (
    window.addEventListener("message", f),
    () => window.removeEventListener("message", f)
  );
}
var Ch = 3e4,
  wh = 2,
  Th = 6,
  Eh = 6e3;
function Dh(e) {
  let t = new Set(),
    n = new Set(),
    r = new Set(),
    i = null,
    a = 0,
    o = 0,
    s = new Map(),
    c = 0,
    l = 0,
    u = 0,
    d = (n) => {
      let i = e.caps().get(n);
      if (!i || i.optional) return "unavailable";
      if (t.has(n)) return "denied";
      if (r.has(n)) return "granted";
      switch (i.policy) {
        case "none":
          return "granted";
        case "per-use-confirm":
          return "granted";
        default:
          return i.hasGrant === !0 ? "granted" : "prompt";
      }
    },
    f = (t) =>
      [...new Set(t)].filter((t) => d(t) === "prompt" && (e.canAsk?.(t) ?? !0)),
    p = (e) => o >= wh || e < a,
    m = (t, n) => {
      let r = e.now();
      if (!p(r)) return !1;
      let i = n?.gesture;
      if ((i !== "activation" && i !== "press") || r < l || u >= Th) return !0;
      let a = Math.min(r, n?.readAt ?? r);
      if (i === "activation" && a < c) return !0;
      for (let n of e.expandAsk?.(t) ?? t)
        if (d(n) === "denied" || (s.get(n) ?? 0) >= wh) return !0;
      return !1;
    },
    h = (t, n) => {
      let r = e.now();
      if (((a = r + Ch), (c = Math.max(c, r + Eh)), n)) {
        o += 1;
        for (let e of t) s.set(e, (s.get(e) ?? 0) + 1);
      }
    },
    g = (t, n) => {
      if (!m(t, n)) return !0;
      let r = i?.names;
      return r ? [...(e.expandAsk?.(t) ?? t)].some((e) => r.has(e)) : !1;
    },
    _ = (t, n) => {
      let r = f(t);
      return r.length === 0
        ? !1
        : i === null
          ? !m(r, n) && !(e.surfaceBusy?.() ?? !1)
          : g(r, n);
    },
    v = (e) => {
      if (i === null) return e();
      let t = () => v(e);
      i.done.then(t, t);
    },
    y = (e) => Object.fromEntries([...new Set(e)].map((e) => [e, d(e)])),
    b = async (o, s) => {
      let _ = f(o);
      if (e.onLeftOut) {
        let t = [...new Set(o)].filter(
          (e) => !_.includes(e) && d(e) === "prompt",
        );
        try {
          t.length > 0 && e.onLeftOut(t, s);
        } catch {}
      }
      if (_.length === 0) return y(o);
      if (i) return (g(_, s) && (await i.done), y(o));
      if (m(_, s)) return y(o);
      if (e.busyIsNoFailure === !0 && e.surfaceBusy?.() === !0)
        return ((a = e.now() + Ch), y(o));
      let v = p(e.now()),
        b = { names: e.expandAsk?.(_) ?? new Set(_), done: Promise.resolve() };
      ((b.done = (async () => {
        let i = new Set(),
          o = new Set();
        for (let e of b.names) {
          let t = d(e);
          t === "granted" ? i.add(e) : t === "prompt" && o.add(e);
        }
        let s;
        try {
          s = await e.showDialog(_);
        } catch {
          ((a = e.now() + Ch), (l = a), v && (u += 1));
          return;
        }
        let f = !1;
        for (let a of s.granted)
          b.names.has(a) &&
            (i.has(a) || (f = !0),
            t.delete(a),
            n.delete(a),
            r.add(a),
            e.onDecision?.(a, "granted"),
            e.persist(a));
        let p = !1;
        for (let r of s.denied)
          b.names.has(r) &&
            d(r) === "prompt" &&
            (t.add(r), e.onDecision?.(r, "denied"), n.delete(r), (p = !0));
        let m = !1;
        for (let r of s.quietDenied ?? [])
          b.names.has(r) &&
            ((o.has(r) || i.has(r)) && d(r) === "denied" && (m = !0),
            d(r) === "prompt" &&
              (t.has(r) || n.add(r), t.add(r), e.onDecision?.(r, "denied")));
        let g = !1;
        for (let e of s.undecided ?? [])
          b.names.has(e) && d(e) === "prompt" && (g = !0);
        let y = p || (g && !f && !m && s.decided !== !0);
        y || g
          ? (h(o, y), v && !f && (u += 1))
          : v && (c = Math.max(c, e.now() + Eh));
      })()),
        (i = b));
      try {
        await b.done;
      } finally {
        i = null;
      }
      return y(o);
    };
  return {
    query: d,
    stateAll: () =>
      y([...e.caps().keys()].filter((e) => d(e) !== "unavailable")),
    request: b,
    requestAll: (t) =>
      b(
        [...e.caps().keys()].filter((e) => d(e) !== "unavailable"),
        t,
      ),
    wouldPrompt: _,
    whenIdle: v,
    noteExternalDenial: (r) => {
      for (let i of r)
        d(i) === "prompt" &&
          (t.add(i), e.onDecision?.(i, "denied"), n.delete(i));
      (h([], !0), (l = a));
    },
    noteExternalGrant: (i) => {
      for (let a of i) {
        let i = d(a);
        (i === "prompt" || i === "denied") &&
          (t.delete(a), n.delete(a), r.add(a), e.onDecision?.(a, "granted"));
      }
    },
    noteExternalUndecided: (t, n) => {
      let r = e.expandAsk?.(t) ?? t;
      h(
        [...r].filter((e) => d(e) === "prompt"),
        n,
      );
    },
    noteExternalRevoke: (i) => {
      for (let e of i.cleared)
        (r.delete(e), n.has(e) && (t.delete(e), n.delete(e)));
      for (let a of i.denied)
        (r.delete(a),
          t.has(a) || n.add(a),
          t.add(a),
          e.onDecision?.(a, "denied"));
    },
    grantedByDecision: (n) => {
      if (r.has(n)) return !0;
      let i = e.caps().get(n);
      if (!i || i.optional) return !1;
      switch (i.policy) {
        case "none":
        case "per-use-confirm":
          return !1;
        default:
          return i.hasGrant === !0 && !t.has(n);
      }
    },
  };
}
function Oh(e) {
  return {
    seq: e?.decisionSeq ?? 0,
    granted: e?.granted === !0,
    revoked: e?.revoked === !0,
    suppressed: !1,
    localDeny: !1,
    askAfter: 0,
    dismissals: 0,
    askInFlight: null,
  };
}
var kh = 26214400,
  Ah = 4096,
  jh = 2e5,
  Mh = 2,
  Nh = 13e4,
  Ph = 2,
  Fh = 3e5,
  Ih = 6e4;
function Lh(e, t, n) {
  return n === void 0
    ? { code: e, message: t }
    : { code: e, message: t, retryAfterMs: n };
}
var Rh = () =>
    Lh(
      "not_granted",
      "the viewer has not allowed this artifact to use project files",
    ),
  zh = () => Lh("unavailable", "project files are unavailable here right now");
async function Bh(e) {
  let t = {};
  try {
    let n = await e.json();
    n && typeof n.error == "object" && n.error !== null && (t = n.error);
  } catch {}
  return { code: typeof t.code == "string" ? t.code : "", body: t };
}
function Vh(e) {
  switch (e.code) {
    case "not_found":
      return Lh("not_found", "no such project file for this viewer");
    case "not_granted":
      return Rh();
    case "changed":
      return Lh("changed", "the file changed while it was being read");
    case "bad_request":
      return Lh(
        "bad_request",
        "the path, cursor, offset or length isn't valid (a folder can't be read or downloaded)",
      );
    case "rate_limited": {
      let t = e.body.retryAfterMs;
      return Lh(
        "rate_limited",
        "too many project file requests; wait, then retry",
        typeof t == "number" && Number.isFinite(t) && t >= 0
          ? Math.min(t, Ih)
          : void 0,
      );
    }
    default:
      return zh();
  }
}
function Hh(e) {
  return typeof e == "string" && e !== "" && e.length <= Ah ? e : null;
}
var Uh = (e) => typeof e == "number" && Number.isSafeInteger(e) && e >= 0;
function Wh(e) {
  let t = e.headers.get("X-Frame-File-Size"),
    n = e.headers.get("X-Frame-File-Revision") ?? "";
  if (t === null || !/^\d{1,15}$/.test(t) || n === "") return null;
  let r = "";
  try {
    r = decodeURIComponent(e.headers.get("X-Frame-File-Name") ?? "");
  } catch {
    r = "";
  }
  return { size: Number(t), revision: n, name: r };
}
function Gh(e) {
  let t = e;
  if (!t || !Array.isArray(t.entries)) return null;
  let n = [];
  for (let e of t.entries) {
    let t = e;
    if (!t || typeof t.path != "string" || !Uh(t.size)) return null;
    n.push({
      path: t.path,
      isDirectory: t.isDirectory === !0,
      size: t.size,
      ...(typeof t.createdAt == "string" && { createdAt: t.createdAt }),
    });
  }
  return {
    entries: n,
    ...(typeof t.cursor == "string" && t.cursor !== "" && { cursor: t.cursor }),
  };
}
function Kh(e, t, n) {
  let { frameOrigin: r } = e,
    { slot: i, ctl: a, gen: o } = n,
    s = (e, t) => {
      let r = new AbortController(),
        i = () => r.abort(),
        a = [n.safeTimeout(e), o.signal, t];
      for (let e of a)
        (e?.aborted && r.abort(),
          e?.addEventListener("abort", i, { once: !0 }));
      return {
        signal: r.signal,
        done: () => a.forEach((e) => e?.removeEventListener("abort", i)),
      };
    },
    c = (t, n, r) =>
      fetch(
        `/api/frame/files/${encodeURIComponent(e.frameUuid)}/${t}${tt(e)}`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json", ...e.cpHeaders },
          body: JSON.stringify({ ...n, token: i.value }),
          signal: r,
        },
      ).catch((t) => (e.markHandled(t), null)),
    l = async (r, l, u, d, f) => {
      let p = !1,
        m = 0,
        h = 0;
      for (;;) {
        if (a.localDeny) return Rh();
        let g = i.value;
        if (g === "") return zh();
        let _ = a.seq,
          v = r === "read";
        if (v && o.reads.n >= Mh)
          return Lh(
            "rate_limited",
            "too many reads at once; wait for one to finish",
            1e3,
          );
        v && o.reads.n++;
        let y = s(u),
          b,
          x = null,
          S = null;
        try {
          ((b = await c(r, l, y.signal)),
            b?.ok ? (x = await f(b)) : b && (S = await Bh(b)));
        } catch {
          b = null;
        } finally {
          (v && o.reads.n--, y.done());
        }
        if (!n.brokerLive() || b === null) return zh();
        if (b.ok) return a.localDeny ? Rh() : x;
        if (S === null) return zh();
        if (S.code === "invalid_token" && !p) {
          if (
            ((p = !0),
            d(),
            await e.requestReboot().catch(() => null),
            !n.brokerLive() || i.value === g)
          )
            return zh();
          continue;
        }
        if (S.code === "not_granted" || S.code === "consent_required") {
          if (++m > 3) return zh();
          if (a.seq !== _) {
            d();
            continue;
          }
        }
        if (
          (S.code === "not_granted" &&
            (a.granted || a.revoked) &&
            ((a.granted = !1), (a.revoked = !0)),
          S.code !== "consent_required")
        )
          return Vh(S);
        if (a.suppressed) return Rh();
        if (a.dismissals >= Ph) return zh();
        let C = S.body.project,
          w = typeof C?.name == "string" ? C.name : "";
        if (typeof C?.id != "string" || C.id === "" || T(ke(w)) === "")
          return zh();
        let E = S.body.decisionSeq;
        if (Uh(E) && E < a.seq) {
          d();
          continue;
        }
        Uh(E) && (a.seq = E);
        let D = a.askAfter - Date.now();
        if (D > 0)
          return Lh(
            "rate_limited",
            "a permission prompt just ended without a saved decision; try again shortly",
            D,
          );
        if (h >= 2 || !t.isConnected) return zh();
        (h++, d());
        let O = a.askInFlight === null,
          k = await (a.askInFlight ??= n
            .ask({ id: C.id, name: w })
            .finally(() => {
              a.askInFlight = null;
            }));
        if ((d(), k !== "granted" && k !== "changed"))
          return k === "busy"
            ? Lh(
                "rate_limited",
                "another permission prompt is open; try again after it closes",
                1e3,
              )
            : k === "unavailable" || k === "dismissed"
              ? ((a.askAfter = Date.now() + Ch),
                k === "unavailable"
                  ? zh()
                  : (O && a.dismissals++,
                    Lh(
                      "rate_limited",
                      "the viewer closed the permission prompt; try again later",
                      Ch,
                    )))
              : ((a.suppressed = !0),
                k === "denied" && O && e.trackCapCalled?.("files", "denied"),
                Rh());
      }
    },
    u = async (t, r, l, u, d) => {
      let f = zh();
      for (;;) {
        if (a.localDeny) {
          f = Rh();
          break;
        }
        let p = i.value,
          m = s(Fh, u),
          h = "";
        o.reads.n++;
        try {
          let e = await c("read", { path: t, offset: r, length: l }, m.signal);
          if (e === null) f = zh();
          else if (e.ok) {
            let t = Wh(e);
            f =
              t === null
                ? zh()
                : {
                    bytes: await e.arrayBuffer(),
                    size: t.size,
                    revision: t.revision,
                  };
          } else {
            let t = await Bh(e);
            ((h = t.code),
              (f =
                t.code === "consent_required"
                  ? Rh()
                  : t.code === "forbidden" || t.code === "invalid_token"
                    ? Lh("forbidden", "project files are unavailable here")
                    : Vh(t)));
          }
        } catch {
          f = zh();
        } finally {
          (o.reads.n--, m.done());
        }
        if (
          h !== "invalid_token" ||
          d.rebooted ||
          ((d.rebooted = !0),
          await e.requestReboot().catch(() => null),
          !n.brokerLive() || i.value === p)
        )
          break;
      }
      if ("code" in f) throw f;
      return f;
    },
    d = async (t, n, r) => {
      let i = t[0] ?? {};
      if (typeof i != "object" || !i)
        return n({ error: Lh("bad_request", "list takes an options object") });
      let a = {};
      if (i.path !== void 0) {
        if (typeof i.path != "string" || i.path.length > Ah)
          return n({
            error: Lh(
              "bad_request",
              "path must be a string of at most 4096 characters",
            ),
          });
        a.path = i.path;
      }
      if (
        (i.recursive !== void 0 && (a.recursive = i.recursive === !0),
        i.cursor !== void 0)
      ) {
        if (typeof i.cursor != "string" || i.cursor.length > jh)
          return n({
            error: Lh(
              "bad_request",
              "cursor must be the string list() returned",
            ),
          });
        a.cursor = i.cursor;
      }
      let o = await l("list", a, Nh, r, (e) => e.json().then(Gh, () => null));
      if (o === null) return n({ error: zh() });
      let s = o;
      return typeof s.code == "string"
        ? n({ error: s })
        : (e.trackCapCalled?.("files", "granted"), n({ result: o }));
    },
    f = async (t, n, r) => {
      let i = Hh(t[0]),
        a = t[1] ?? {},
        o = a?.offset ?? 0,
        s = a?.length ?? kh;
      if (i === null || !Uh(o) || !Uh(s) || s === 0 || s > kh)
        return n({
          error: Lh(
            "bad_request",
            "read takes a path of 1 to 4096 characters and an optional {offset, length}; length is 1 byte to 25 MiB",
          ),
        });
      let c = await l(
        "read",
        { path: i, offset: o, length: s },
        Fh,
        r,
        async (e) => {
          let t = Wh(e);
          return t === null
            ? null
            : {
                bytes: await e.arrayBuffer(),
                size: t.size,
                revision: t.revision,
              };
        },
      );
      if (c === null) return n({ error: zh() });
      let u = c;
      if (typeof u.code == "string") return n({ error: u });
      let d = c;
      return (
        e.trackCapCalled?.("files", "granted"),
        n({ result: d }, [d.bytes])
      );
    },
    p = async (t, r, i) => {
      let a = Hh(t[0]);
      if (a === null)
        return r({
          error: Lh(
            "bad_request",
            "download takes a file path of 1 to 4096 characters",
          ),
        });
      let s = n.saveRefusal(a.split("/").pop() ?? "");
      if (s !== null) return r({ error: s });
      let c = await l(
        "read",
        { path: a, offset: 0, length: 1 },
        Fh,
        i,
        (e) => (e.body?.cancel().catch(() => void 0), Promise.resolve(Wh(e))),
      );
      if (c === null) return r({ error: zh() });
      let d = c;
      if (typeof d.code == "string") return r({ error: d });
      let f = c;
      if (f.name === "") return r({ error: zh() });
      let p = { rebooted: !1 },
        m = await n.save(
          {
            name: f.name,
            size: f.size,
            revision: f.revision,
            readSlice: (e, t, n) => u(a, e, t, n, p),
          },
          { signal: o.signal, onPrompt: i },
        );
      return (
        "status" in m && e.trackCapCalled?.("files", "granted"),
        r("status" in m ? { result: m } : m)
      );
    },
    m = (i) => {
      if (
        !t.isConnected ||
        !n.brokerLive() ||
        i.origin !== r ||
        !t.contentWindow ||
        i.source !== t.contentWindow
      )
        return;
      let a = _e(i.data, "files");
      if (!a) return;
      let o = performance.now(),
        s = (i, s = []) => {
          n.brokerLive() &&
            (t.contentWindow?.postMessage(ye(a.id, i), r, s),
            e.noteCapOutcome?.(
              a.cap,
              a.method,
              "error" in i ? i.error.code : null,
              t,
              performance.now() - o,
            ));
        },
        c = () => {
          n.brokerLive() && t.contentWindow?.postMessage(De(a.id), r);
        },
        l =
          a.method === "list"
            ? d
            : a.method === "read"
              ? f
              : a.method === "download"
                ? p
                : null;
      if (l === null) {
        s({ error: Lh("capability_removed", "unknown files method") });
        return;
      }
      l(a.args, s, c).catch(() => s({ error: zh() }));
    };
  return (
    window.addEventListener("message", m),
    () => {
      window.removeEventListener("message", m);
    }
  );
}
var qh = "frame-mcp-cache",
  Jh = "cache",
  Yh = 864e5,
  Xh = 3e5,
  Zh = 3e5,
  Qh = "e:",
  $h = "__meta",
  eg = "__wipedAt",
  tg = "__viewer";
function ng(e) {
  return Math.max(3e4, (e.expiresAt - e.createdAt) / 4);
}
var rg = new TextEncoder();
function ig(e) {
  if (typeof e != "object" || !e) return null;
  let t = e.cache;
  if (typeof t != "object" || !t) return null;
  let n = t,
    r;
  if (n.gcTime === void 0) r = Xh;
  else if (typeof n.gcTime == "number" && n.gcTime > 0)
    r = Math.min(n.gcTime, Yh);
  else return null;
  let i =
    typeof n.staleTime == "number" && n.staleTime > 0
      ? Math.min(n.staleTime, Zh)
      : 0;
  return { gcTimeMs: r, staleTimeMs: i, refresh: n.refresh === !0 };
}
function ag(e, t, n) {
  return !t || t === "-" ? null : `${e ?? "-"}:${t}:${n}:`;
}
function og(e, t) {
  return !t || t === "-" ? null : `${e ?? "-"}:${t}`;
}
function sg(e) {
  if (Array.isArray(e)) return e.map(sg);
  if (
    typeof e == "object" &&
    e &&
    (Object.getPrototypeOf(e) === Object.prototype ||
      Object.getPrototypeOf(e) === null)
  ) {
    let t = Object.create(null);
    for (let n of Object.keys(e).sort()) t[n] = sg(e[n]);
    return t;
  }
  return e;
}
function cg(e) {
  return lg(rg.encode(e));
}
async function lg(e) {
  try {
    let t = globalThis.crypto?.subtle;
    if (!t) return null;
    let n = await t.digest("SHA-256", e),
      r = "";
    for (let e of new Uint8Array(n)) r += e.toString(16).padStart(2, "0");
    return r;
  } catch {
    return null;
  }
}
var ug = typeof indexedDB > "u",
  dg = new Map(),
  fg = 0;
function pg(e, t) {
  let n = dg.get(e);
  if ((n && (fg -= n.size), dg.set(e, t), (fg += t.size), fg <= 8388608))
    return;
  let r = [...dg.entries()].sort((e, t) => e[1].lastUsed - t[1].lastUsed);
  for (let [e, t] of r) {
    if (fg <= 8388608) break;
    (dg.delete(e), (fg -= t.size));
  }
}
function mg(e, t, n) {
  let r = dg.get(e);
  return r
    ? r.expiresAt <= t
      ? (dg.delete(e), (fg -= r.size), null)
      : r.kind === n
        ? ((r.lastUsed = t), r)
        : null
    : null;
}
function hg(e, t) {
  return (
    e.kind === void 0 &&
    (t.server === void 0 || e.server === t.server) &&
    (t.tool === void 0 || e.tool === t.tool) &&
    (t.inputHash === void 0 ||
      typeof e.inputHash != "string" ||
      e.inputHash === t.inputHash)
  );
}
function gg(e, t) {
  for (let [n, r] of dg)
    n.startsWith(e) && hg(r, t) && (dg.delete(n), (fg -= r.size));
}
function _g() {
  (dg.clear(), (fg = 0));
}
var vg = null,
  yg = !1;
function bg() {
  return (
    (vg ??= new Promise((e, n) => {
      let r = indexedDB.open(qh, 1),
        i = !1;
      ((r.onupgradeneeded = () => {
        r.result.objectStoreNames.contains(Jh) ||
          ((i = !0), r.result.createObjectStore(Jh));
      }),
        (r.onsuccess = () => {
          let t = r.result;
          if (i && yg) {
            ((Pg += 1), (Ig += 1));
            try {
              t.transaction(Jh, "readwrite")
                .objectStore(Jh)
                .put({ at: Date.now() }, eg);
            } catch {}
          }
          ((yg = !1),
            (t.onversionchange = () => {
              ((yg = !0), t.close(), (vg = null));
            }),
            (t.onclose = () => {
              ((yg = !0), (vg = null));
            }),
            e(t));
        }),
        (r.onerror = () => {
          ((vg = null),
            n(
              r.error ??
                t(
                  Error("indexedDB open failed"),
                  "indexedDB open failed",
                  "literal",
                ),
            ));
        }));
    })),
    vg
  );
}
function xg(e) {
  return new Promise((n, r) => {
    ((e.onsuccess = () => n(e.result)),
      (e.onerror = () =>
        r(e.error ?? t(Error("request failed"), "request failed", "literal"))));
  });
}
async function Sg(e, n) {
  let r = await bg();
  return new Promise((i, a) => {
    let o,
      s = null,
      c = r.transaction(Jh, e);
    ((c.oncomplete = () => {
      s === null ? i(o) : a(s);
    }),
      (c.onabort = c.onerror =
        (e) => {
          let n = e?.target?.error ?? null;
          a(
            s ??
              n ??
              c.error ??
              t(Error("transaction failed"), "transaction failed", "literal"),
          );
        }),
      Promise.resolve()
        .then(() => n(c.objectStore(Jh)))
        .then(
          (e) => {
            o = e;
          },
          (e) => {
            s =
              e ??
              t(
                Error("transaction callback failed"),
                "transaction callback failed",
                "literal",
              );
            try {
              c.abort();
            } catch {}
          },
        ));
  });
}
async function Cg(e) {
  let t = await xg(e.get($h));
  return {
    total: typeof t?.total == "number" ? t.total : 0,
    count: typeof t?.count == "number" ? t.count : 0,
  };
}
async function wg(e, t, n) {
  let r = await Cg(e),
    i = { total: Math.max(0, r.total + t), count: Math.max(0, r.count + n) };
  return (await xg(e.put(i, $h)), i);
}
function Tg(e) {
  return e instanceof DOMException && e.name === "QuotaExceededError";
}
async function Eg(e, t, n, r, i, a) {
  return Sg("readwrite", async (o) => {
    if (n !== Pg || r !== Ig) return null;
    let s = await xg(o.get(eg));
    if (s && typeof s.at == "number" && (i <= s.at || s.at >= a)) return null;
    let c = await xg(o.get(tg));
    if (c !== void 0 && !e.startsWith(`${String(c.v)}:`)) return null;
    let l = Qh + e,
      u = await xg(o.get(l));
    await xg(o.put(t, l));
    let d = typeof u?.size == "number" ? u.size : 0;
    return (await wg(o, t.size - d, +(u === void 0))).total;
  });
}
async function Dg() {
  await Sg(
    "readwrite",
    (e) =>
      new Promise((n, r) => {
        let i = Date.now(),
          a = [],
          o = e.openCursor();
        ((o.onerror = () =>
          r(o.error ?? t(Error("cursor failed"), "cursor failed", "literal"))),
          (o.onsuccess = () => {
            let t = o.result;
            if (t) {
              let e = t.key;
              if (typeof e == "string" && e.startsWith(Qh)) {
                let n = t.value;
                !n ||
                typeof n.size != "number" ||
                typeof n.expiresAt != "number" ||
                n.expiresAt <= i
                  ? t.delete()
                  : a.push({
                      key: e,
                      size: n.size,
                      lastUsed: typeof n.lastUsed == "number" ? n.lastUsed : 0,
                    });
              } else e !== $h && e !== eg && e !== tg && t.delete();
              t.continue();
              return;
            }
            a.sort((e, t) => t.lastUsed - e.lastUsed);
            let r = 0,
              s = 0;
            for (let t of a)
              r + t.size <= 33554432
                ? ((r += t.size), (s += 1))
                : e.delete(t.key);
            (e.put({ total: r, count: s }, $h), n());
          }));
      }),
  );
}
async function Og(e, t) {
  let n = Date.now();
  if (ug) return mg(e, n, t);
  try {
    return await Sg("readwrite", async (r) => {
      let i = Qh + e,
        a = await xg(r.get(i));
      if (
        !a ||
        typeof a != "object" ||
        typeof a.expiresAt != "number" ||
        typeof a.size != "number"
      )
        return null;
      let o = a;
      return o.expiresAt <= n
        ? (r.delete(i), await wg(r, -o.size, -1), null)
        : o.kind === t
          ? (n - o.lastUsed >= ng(o) && r.put({ ...o, lastUsed: n }, i), o)
          : null;
    });
  } catch {
    return ((ug = !0), mg(e, n, t));
  }
}
var kg = !1;
async function Ag() {
  if (!(kg || typeof indexedDB > "u")) {
    kg = !0;
    try {
      await Dg();
    } catch {
      ug = !0;
    }
  }
}
async function jg(e) {
  let t = dg.get(e);
  if ((t && (dg.delete(e), (fg -= t.size)), !(typeof indexedDB > "u")))
    try {
      await Sg("readwrite", async (t) => {
        let n = Qh + e,
          r = await xg(t.get(n));
        r &&
          (t.delete(n),
          await wg(t, -(typeof r.size == "number" ? r.size : 0), -1));
      });
    } catch {
      ug = !0;
    }
}
async function Mg(e, t, n) {
  let r = Pg,
    i = Ig,
    a;
  try {
    a = rg.encode(JSON.stringify(t)).byteLength;
  } catch {
    await jg(e);
    return;
  }
  if (a > 524288) {
    await jg(e);
    return;
  }
  let o = Date.now(),
    s = {
      result: t,
      ...(n.kind !== void 0 && { kind: n.kind }),
      server: n.server,
      tool: n.tool,
      inputHash: n.inputHash,
      size: a,
      createdAt: o,
      lastUsed: o,
      expiresAt: o + n.gcTimeMs,
    };
  if (!ug)
    try {
      let t = await Eg(e, s, r, i, n.dispatchedAt, n.mountedAt);
      t !== null && t > 33554432 && (await Dg());
      return;
    } catch (t) {
      if (Tg(t)) {
        try {
          (await Dg(), await Eg(e, s, r, i, n.dispatchedAt, n.mountedAt));
        } catch {}
        return;
      }
      ug = !0;
    }
  r === Pg && i === Ig && pg(e, s);
}
async function Ng(e, n) {
  if (((Ig += 1), gg(e, n), !(typeof indexedDB > "u")))
    try {
      await Sg(
        "readwrite",
        (r) =>
          new Promise((i, a) => {
            let o = IDBKeyRange.bound(Qh + e, Qh + e + "\uFFFF"),
              s = 0,
              c = 0,
              l = r.openCursor(o);
            ((l.onerror = () =>
              a(
                l.error ??
                  t(Error("cursor failed"), "cursor failed", "literal"),
              )),
              (l.onsuccess = () => {
                let e = l.result;
                if (e) {
                  let t = e.value,
                    r = !!t && hg(t, n);
                  ((!t || r) &&
                    ((s += typeof t?.size == "number" ? t.size : 0),
                    (c += 1),
                    e.delete()),
                    e.continue());
                  return;
                }
                if (c === 0) {
                  i();
                  return;
                }
                wg(r, -s, -c)
                  .then(() => i())
                  .catch(a);
              }));
          }),
      );
    } catch {
      ug = !0;
    }
}
var Pg = 0;
function Fg() {
  return Pg;
}
var Ig = 0;
function Lg() {
  return Ig;
}
function Rg() {
  Ig += 1;
}
async function zg() {
  ((Pg += 1), (Ig += 1), _g());
  let e = Date.now();
  if (
    ((Hg = { requestedAt: e, at: null, floor: null }),
    !(typeof indexedDB > "u"))
  )
    try {
      await Sg("readwrite", async (t) => {
        let n = await xg(t.get(eg)),
          r =
            typeof n?.at == "number" ? Math.max(n.at, Date.now()) : Date.now();
        (t.clear(),
          t.put({ at: r }, eg),
          Hg !== null &&
            Hg.requestedAt === e &&
            ((Hg.at = r), (Hg.floor = typeof n?.at == "number" ? n.at : null)));
      });
    } catch {
      ((ug = !0), Bg());
    }
}
function Bg() {
  try {
    let e = indexedDB.deleteDatabase(qh),
      t = () => {
        try {
          let e = indexedDB.open(qh, 1);
          ((e.onupgradeneeded = () => {
            try {
              e.result.createObjectStore(Jh);
            } catch {}
          }),
            (e.onerror = () => void 0),
            (e.onsuccess = () => {
              let t = e.result;
              try {
                let e = t.transaction(Jh, "readwrite"),
                  n = e.objectStore(Jh);
                (n.clear(), n.put({ at: Date.now() }, eg));
                let r = () => t.close();
                ((e.oncomplete = r), (e.onabort = r), (e.onerror = r));
              } catch {
                t.close();
              }
            }));
        } catch {}
      };
    ((e.onsuccess = t), (e.onerror = t));
  } catch {}
}
async function Vg(e, t) {
  if (!(typeof indexedDB > "u")) {
    ((Pg += 1), (Ig += 1));
    try {
      await Sg("readwrite", async (n) => {
        if ((await xg(n.get(tg)))?.v !== e) {
          let e = await xg(n.get(eg)),
            r =
              Hg !== null &&
              Hg.requestedAt <= t &&
              typeof e?.at == "number" &&
              e.at === Hg.at,
            i =
              typeof e?.at == "number" && !r
                ? Math.max(e.at, t - 1)
                : Math.max(Hg?.floor ?? t - 1, t - 1);
          (_g(), n.clear(), n.put({ at: i }, eg));
        }
        n.put({ v: e }, tg);
      });
    } catch {
      ((ug = !0), Bg());
    }
  }
}
var Hg = null,
  Ug = 16777216,
  Wg = 245e3,
  Gg = 64,
  Kg = /^[a-z0-9][a-z0-9!#$&^_.+-]{0,126}\/[a-z0-9][a-z0-9!#$&^_.+-]{0,126}$/i,
  qg = /^(?![.\s])[^/\\\p{Cc}\p{Cf}]{0,238}\.[A-Za-z0-9]{1,16}$/u,
  Jg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  Yg = /^[A-Za-z0-9._-]{16,512}$/,
  Xg = { id: "0".repeat(36), t: "0".repeat(512) };
function Zg(e, t = ut) {
  let n = t >> 1;
  if (typeof e != "object" || !e) return { file: null };
  if (!Array.isArray(e) && Object.hasOwn(e, "$file"))
    return {
      refused:
        "put {$file: ...} under a key of the input, not at its top level",
    };
  let r = null,
    i = new WeakSet(),
    a = !1,
    o = 0,
    s = [[e, 0]];
  for (; s.length > 0;) {
    let [e, t] = s.pop();
    if (typeof e != "object" || !e) continue;
    if (i.has(e)) {
      a = !0;
      continue;
    }
    if ((i.add(e), t > Gg))
      return { refused: "tool input is too large or too deeply nested" };
    if (
      e instanceof Blob ||
      ArrayBuffer.isView(e) ||
      e instanceof ArrayBuffer ||
      e instanceof String
    )
      continue;
    if (Array.isArray(e)) {
      if (((o += e.length), o > n))
        return { refused: "tool input is too large or too deeply nested" };
      for (let n of e)
        if (!(typeof n != "object" || !n)) {
          if (Qg(n))
            return {
              refused:
                "put {$file: ...} under a key of an object, not in an array",
            };
          s.push([n, t + 1]);
        }
      continue;
    }
    let c = e;
    if (Object.hasOwn(c, "$frameHandoff"))
      return { refused: "$frameHandoff is reserved for the viewer" };
    let l = Object.keys(c);
    if (((o += l.length), o > n))
      return { refused: "tool input is too large or too deeply nested" };
    for (let e of l) {
      let n = c[e];
      if (Qg(n)) {
        if (r !== null)
          return { refused: "tool input may carry only one file" };
        r = { holder: c, key: e };
      } else s.push([n, t + 1]);
    }
  }
  if (r === null) return { file: null };
  if (a)
    return {
      refused: "tool input with a file must not contain an object twice",
    };
  let c = r.holder[r.key];
  if (Object.keys(c).length !== 1)
    return { refused: "$file must be the only member of its object" };
  let l = $g(c.$file);
  if (typeof l == "string") return { refused: l };
  let u = { $frameHandoff: { ...Xg } };
  return (
    (r.holder[r.key] = u),
    {
      file: {
        ...l,
        place: (e) => {
          u.$frameHandoff = { id: e.id, t: e.t };
        },
      },
    }
  );
}
function Qg(e) {
  return (
    typeof e == "object" &&
    !!e &&
    !Array.isArray(e) &&
    Object.hasOwn(e, "$file")
  );
}
function $g(e) {
  if (typeof e != "object" || !e) return "$file must be an object";
  let { data: t, name: n, type: r } = e;
  if (typeof r != "string" || !Kg.test(r))
    return "$file.type must be a media type";
  if (typeof n != "string" || !qg.test(n))
    return "$file.name must be a bare file name with an extension";
  let i;
  if (t instanceof Blob) i = t;
  else if (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) i = new Blob([t]);
  else return "$file.data must be a Blob, ArrayBuffer or typed array";
  return i.size === 0
    ? "file is empty"
    : i.size > Ug
      ? "file is larger than the 16 MiB limit"
      : { blob: i, name: n, type: r };
}
async function e_(e, t, n, r, i = Wg) {
  let a = e.org
      ? `?org=${encodeURIComponent(e.org)}&for=connector`
      : "?for=connector",
    o,
    s;
  try {
    ((o = await fetch(
      `/api/frame/handoff/${encodeURIComponent(e.frameUuid)}${a}`,
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": n.type,
          "X-Frame-Handoff-Token": t,
          "X-Frame-Handoff-Filename": encodeURIComponent(n.name),
          ...e.cpHeaders,
        },
        body: n.blob,
        signal: Ge(et(i), r),
      },
    )),
      (s = await o.text()));
  } catch (e) {
    return r?.aborted
      ? { error: { code: "cancelled", message: "call aborted" } }
      : {
          error: {
            code: "server_unavailable",
            message:
              e instanceof DOMException && e.name === "TimeoutError"
                ? "file upload timed out"
                : "file upload failed",
            retryable: !0,
          },
        };
  }
  if (o.ok) {
    let e = n_(s);
    return e === null
      ? {
          error: {
            code: "upstream_error",
            message: "malformed upload response",
          },
        }
      : { ref: e };
  }
  let c = Ze(s);
  if (o.status === 403)
    return t_(s)
      ? { error: { code: "blocked_by_policy", message: r_(s, o.status) } }
      : { stale: !0 };
  if (o.status === 404)
    return t_(s) && c === null
      ? {
          error: {
            code: "server_unavailable",
            message: r_(s, o.status),
            retryable: !0,
          },
        }
      : {
          error: {
            code: "capability_disabled",
            message: "file arguments are not available in this view",
          },
        };
  if (o.status === 400 || o.status === 413 || o.status === 415)
    return { error: { code: "bad_request", message: r_(s, o.status) } };
  if (o.status === 429 || o.status >= 500) {
    let e = Number(o.headers.get("Retry-After") ?? NaN),
      t = {
        code: "server_unavailable",
        message: r_(s, o.status),
        retryable: !0,
      };
    return (
      Number.isFinite(e) && e > 0 && (t.retryAfterMs = Math.min(e * 1e3, 6e4)),
      { error: t }
    );
  }
  return { error: { code: "upstream_error", message: r_(s, o.status) } };
}
function t_(e) {
  try {
    let t = JSON.parse(e);
    return typeof t == "object" && !!t && !Array.isArray(t);
  } catch {
    return !1;
  }
}
function n_(e) {
  try {
    let t = JSON.parse(e),
      n = t?.handoff_id,
      r = t?.token;
    if (
      typeof n == "string" &&
      Jg.test(n) &&
      typeof r == "string" &&
      Yg.test(r)
    )
      return { id: n, t: r };
  } catch {}
  return null;
}
function r_(e, t) {
  try {
    let t = JSON.parse(e).error?.message;
    if (typeof t == "string" && t !== "") return "file upload refused: " + t;
  } catch {}
  return `file upload failed (${t})`;
}
var i_ = "anthropic.com/artifact";
function a_(e) {
  try {
    let t = JSON.parse(e)?.error;
    return typeof t?.code == "string" && t.code !== "";
  } catch {
    return !1;
  }
}
var o_ = class {
    deps;
    client;
    constructor(e) {
      ((this.deps = e),
        (this.client = new po({
          url: e.path + e.query,
          headers: e.cpHeaders,
          ...(e.fetchFn === void 0 ? {} : { fetchFn: e.fetchFn }),
          ...(e.markHandled === void 0 ? {} : { markHandled: e.markHandled }),
        })));
    }
    async callTool(e, t, n, r) {
      let i = () => this.deps.now?.() ?? Date.now(),
        a = () => r?.aborted === !0,
        o = i(),
        s = this.deps.token();
      if (s === null) return { kind: "no_token" };
      let c = Math.min(n.legMs, n.windowMs - n.slackMs),
        l = await this.leg(e, t, s, c, r);
      if (
        l.kind !== "http" ||
        (l.status !== 403 && l.status !== 401) ||
        a_(l.text) ||
        this.deps.onAuthStale === void 0 ||
        a()
      )
        return l;
      await this.deps.onAuthStale().catch(() => void 0);
      let u = this.deps.token(),
        d = n.windowMs - (i() - o) - n.slackMs;
      return u === null || u === s || d <= 0 || a()
        ? u === null
          ? { kind: "no_token" }
          : l
        : this.leg(e, t, u, Math.min(n.legMs, d), r);
    }
    async listTools(e) {
      let t = () => this.deps.now?.() ?? Date.now(),
        n = t(),
        r = (e, t) =>
          this.client.request(
            "tools/list",
            {},
            {
              budgetMs: t,
              meta: { [i_]: { slug: this.deps.slug, token: e } },
              signal: this.deps.signalFor(t),
            },
          ),
        i = this.deps.token();
      if (i === null) return { kind: "no_token" };
      let a = await r(i, Math.min(e.legMs, e.windowMs - e.slackMs));
      if (
        a.kind !== "http" ||
        (a.status !== 403 && a.status !== 401) ||
        a_(a.text) ||
        this.deps.onAuthStale === void 0
      )
        return a;
      await this.deps.onAuthStale().catch(() => void 0);
      let o = this.deps.token(),
        s = e.windowMs - (t() - n) - e.slackMs;
      return o === null
        ? { kind: "no_token" }
        : o === i || s <= 0
          ? a
          : r(o, Math.min(e.legMs, s));
    }
    leg(e, t, n, r, i) {
      return this.client.request(
        "tools/call",
        { name: e, arguments: t },
        {
          budgetMs: r,
          meta: { [i_]: { slug: this.deps.slug, token: n } },
          signal: this.deps.signalFor(r, i),
        },
      );
    }
  },
  s_ = -32002,
  c_ = new Set([-32600, -32601, -32602]),
  l_ = 32,
  u_ = new Set(["set", "merge", "update", "delete", "write"]),
  d_ = new Set(["whoami"]),
  f_ = new Map([
    [
      "artifacts_data",
      new Set([
        "get",
        "list",
        "query",
        "set",
        "merge",
        "update",
        "delete",
        "write",
        "usage",
        "whoami",
      ]),
    ],
  ]);
function p_(e, t, n, r = !1, i) {
  let a = { code: e, message: t, server: n };
  return (
    r &&
      ((a.retryable = !0), i !== void 0 && (a.retryAfterMs = Math.min(i, 6e4))),
    a
  );
}
function m_(e) {
  if (typeof e == "object" && e && !Array.isArray(e) && "cache" in e) {
    let { cache: t, ...n } = e;
    return n;
  }
  return e;
}
function h_(e, t) {
  switch (e.kind) {
    case "result":
      return { body: { result: m_(e.result) } };
    case "no_token":
      return {
        body: {
          error: p_(
            "capability_disabled",
            "this view can no longer reach the server",
            t,
          ),
        },
      };
    case "rpcError":
      return e.code === s_
        ? { body: { error: p_("not_in_manifest", "not found", t) } }
        : c_.has(e.code)
          ? { body: { error: p_("bad_request", e.message, t) } }
          : { body: { error: p_("upstream_error", "request failed", t) } };
    case "http": {
      let n = e.status === 404 || e.status === 429 || e.status >= 500;
      return {
        body: {
          error: p_(
            n ? "server_unavailable" : "upstream_error",
            `request failed (${e.status})`,
            t,
            n,
            e.retryAfterS === void 0 ? void 0 : e.retryAfterS * 1e3,
          ),
        },
        detail: String(e.status),
      };
    }
    case "transport": {
      let n = e.detail === "timeout";
      return {
        body: {
          error: p_(
            n ? "server_unavailable" : "upstream_error",
            "request failed",
            t,
            n,
          ),
        },
        detail: n ? "timeout" : "error",
      };
    }
  }
}
function g_(e) {
  return typeof e == "string" ? e.slice(0, 64) : "(not a string)";
}
function __(e, t, n) {
  if (e.kind !== "result") {
    let { body: n, detail: r } = h_(e, t);
    return "error" in n
      ? { error: n.error, ...(r === void 0 ? {} : { detail: r }) }
      : { error: p_("upstream_error", "malformed response", t) };
  }
  let r = f_.get(t),
    i = e.result?.tools;
  if (!Array.isArray(i))
    return { error: p_("upstream_error", "malformed response", t) };
  let a = [];
  for (let e of i) {
    let t = e;
    if (
      typeof t != "object" ||
      !t ||
      typeof t.name != "string" ||
      r?.has(t.name) !== !0 ||
      (d_.has(t.name) && !n)
    )
      continue;
    let i;
    if (t.annotations !== null && typeof t.annotations == "object")
      for (let e of ["readOnlyHint", "destructiveHint"]) {
        let n = t.annotations[e];
        typeof n == "boolean" && ((i ??= {})[e] = n);
      }
    a.push({
      name: t.name,
      description: typeof t.description == "string" ? t.description : "",
      ...(i === void 0 ? {} : { annotations: i }),
      inputSchema: t.inputSchema ?? { type: "object" },
      ...(t.outputSchema === void 0 ? {} : { outputSchema: t.outputSchema }),
    });
  }
  return { tools: a };
}
function v_(e) {
  let t = new Map();
  for (let { server: n, token: r } of e.servers)
    f_.has(n.name) &&
      t.set(n.name, {
        cap: n.cap,
        client: new o_({
          slug: e.frameUuid,
          path: n.path,
          query: e.query,
          cpHeaders: e.cpHeaders,
          token: r,
          onAuthStale: e.onAuthStale,
          signalFor: (e, t) => Ge(et(e), t),
          ...(e.fetchFn === void 0 ? {} : { fetchFn: e.fetchFn }),
          ...(e.markHandled === void 0 ? {} : { markHandled: e.markHandled }),
        }),
      });
  let n = new Map(),
    r = new xt(l_),
    i = e.writeOrder ?? new St(),
    a = new Map(),
    o = (t, n) => {
      let r = a.get(t);
      return (
        r === void 0 &&
          ((r = n.client
            .listTools({ windowMs: B, legMs: Ke.servers, slackMs: qe })
            .then((n) => {
              let r = __(n, t, e.userGranted === !0);
              return ("error" in r && a.delete(t), r);
            })),
          a.set(t, r)),
        r
      );
    };
  return (a) => {
    if (!e.live()) {
      e.detach();
      for (let e of n.values()) e.abort();
      n.clear();
      return;
    }
    let s = e.frame();
    if (
      !s?.isConnected ||
      !s.contentWindow ||
      a.origin !== e.frameOrigin ||
      a.source !== s.contentWindow
    )
      return;
    let c = _e(a.data, "mcp");
    if (
      !c ||
      (e.gen !== void 0 && c.brokerGen !== void 0 && c.brokerGen !== e.gen)
    )
      return;
    if (c.method === "cancelCall") {
      let e = c.args[0],
        t = typeof e == "string" ? n.get(e) : void 0;
      t !== void 0 && (a.stopImmediatePropagation(), t.abort(), n.delete(e));
      return;
    }
    if (
      c.method !== "callTool" &&
      c.method !== "serverTools" &&
      c.method !== "describeTool"
    )
      return;
    let [l, u, d] = c.args;
    if (typeof l != "string") return;
    let f = t.get(l);
    if (f === void 0) return;
    if ((a.stopImmediatePropagation(), c.method !== "callTool")) {
      let t = performance.now(),
        n = (n) => {
          !e.live() ||
            !s.isConnected ||
            (s.contentWindow?.postMessage(ye(c.id, n), e.frameOrigin),
            e.note?.(
              "mcp",
              c.method,
              "error" in n ? n.error.code : null,
              s,
              performance.now() - t,
            ));
        };
      o(l, f).then((t) => {
        if ("error" in t) {
          (n({ error: t.error }),
            t.detail !== void 0 &&
              e.live() &&
              s.isConnected &&
              e.report?.("artifact-call", t.detail));
          return;
        }
        if (c.method === "serverTools")
          return n({
            result: {
              server: l,
              kind: "artifact",
              authStatus: "connected",
              tools: t.tools.map(
                ({ name: e, description: t, annotations: n }) => ({
                  name: e,
                  description: t,
                  ...(n === void 0 ? {} : { annotations: n }),
                }),
              ),
            },
          });
        let r =
          typeof u == "string" ? t.tools.find((e) => e.name === u) : void 0;
        return n(
          r === void 0
            ? { error: p_("bad_request", `${l} has no tool named ${g_(u)}`, l) }
            : { result: r },
        );
      });
      return;
    }
    let { client: p, cap: m } = f;
    e.trackCapCalled?.(m, "no_prompt");
    let h = performance.now(),
      g = (t) => {
        !e.live() ||
          !s.isConnected ||
          (s.contentWindow?.postMessage(ye(c.id, t), e.frameOrigin),
          e.note?.(
            "mcp",
            c.method,
            "error" in t ? t.error.code : null,
            s,
            performance.now() - h,
          ));
      };
    if (typeof u != "string" || u === "")
      return g({
        error: p_("bad_request", "server and tool must be strings", l),
      });
    if (f_.get(l)?.has(u) !== !0 || (d_.has(u) && e.userGranted !== !0))
      return g({
        error: p_("bad_request", `${l} has no tool named ${g_(u)}`, l),
      });
    if (!lt(d))
      return g({
        error: p_("bad_request", "input must be plain JSON data", l),
      });
    let _;
    if (d == null) _ = {};
    else if (typeof d == "object" && !Array.isArray(d)) {
      let { artifact: t, ...n } = d;
      if (t !== void 0 && t !== e.frameUuid)
        return g({ error: p_("not_in_manifest", "not found", l) });
      _ = n;
    } else return g({ error: p_("bad_request", "input must be an object", l) });
    let v;
    try {
      v = new TextEncoder().encode(JSON.stringify(_)).length;
    } catch {
      return g({
        error: p_("bad_request", "input is not JSON-serializable", l),
      });
    }
    if (v > 286720)
      return g({ error: p_("bad_request", "input is too large", l) });
    let y = new AbortController();
    n.set(c.id, y);
    let b = () => {
      let t = B - (performance.now() - h);
      return !e.live() || y.signal.aborted || t <= 2e3
        ? Promise.resolve({ kind: "transport", detail: "timeout" })
        : p.callTool(
            u,
            _,
            { windowMs: t, legMs: Ke.call, slackMs: qe },
            y.signal,
          );
    };
    (u_.has(u) ? i.run(() => r.run(b)) : r.run(b)).then(
      (t) => {
        if ((n.delete(c.id), y.signal.aborted)) return;
        let { body: r, detail: i } = h_(t, l);
        (g(r),
          i !== void 0 &&
            e.live() &&
            s.isConnected &&
            e.report?.("artifact-call", i));
      },
      (t) => {
        (n.delete(c.id),
          e.markHandled?.(t),
          g({ error: p_("upstream_error", "request failed", l) }));
      },
    );
  };
}
var y_ = {
    title: "Let this artifact send messages to Claude?",
    description:
      "Its editors control what it sends, and you can turn this off later in Permissions.",
  },
  b_ = "Paste into this artifact?",
  x_ = "This artifact gets what you last copied.",
  S_ = "Paste",
  C_ = "Cancel",
  w_ = 12e4,
  T_ = 12e4,
  E_ = 3e4,
  D_ = class extends Error {
    code;
    detail;
    constructor(e, t, n) {
      (super(n), (this.code = e), (this.detail = t));
    }
  },
  O_ = { key: "", times: [], declines: 0, until: 0 },
  k_ = null,
  A_ = (e) => [
    `frame_hot_hard_reload:${e}_claim`,
    "frame_pin_reload_claim",
    "frame_chunk_reload_claim",
  ],
  j_ = (e) => `frame_paste_budget:${e}`,
  M_ = 3e5;
function N_(e) {
  let t = window.__frameSessionId;
  try {
    for (let n of A_(e)) {
      let r = sessionStorage.getItem(n) ?? "";
      if (t && r.startsWith(`${t}|`)) return !0;
      let i = Number(r.slice(r.lastIndexOf("|") + 1));
      if (r.startsWith(`reload|${e}:`) && Date.now() - i < M_) return !0;
    }
  } catch {}
  return !1;
}
function P_(e) {
  try {
    let t = sessionStorage.getItem(j_(e));
    if (t === null) return {};
    if (!N_(e)) return (sessionStorage.removeItem(j_(e)), {});
    let n = t.split(",").map(Number);
    if (n.length < 2 || !n.every((e) => Number.isFinite(e) && e >= 0))
      return { declines: 3 };
    let r = Date.now();
    return {
      declines: Math.min(Math.trunc(n[0]), 3),
      until: Math.min(n[1], r + E_),
      times: n
        .slice(2)
        .filter((e) => e <= r)
        .slice(-5),
    };
  } catch {
    return {};
  }
}
function F_(e) {
  try {
    sessionStorage.setItem(
      j_(e.key),
      [e.declines, e.until, ...e.times].join(","),
    );
  } catch {}
}
function I_(e) {
  return (
    O_.key !== e &&
      (O_ = { key: e, times: [], declines: 0, until: 0, ...P_(e) }),
    O_
  );
}
function L_(e) {
  let t = I_(e);
  (t.declines++, (t.until = Date.now() + E_), F_(t));
}
function R_(e, t, n) {
  if (!n)
    return new D_(
      "no_gesture",
      "no_gesture",
      "read() must be called straight from the viewer's click or key press",
    );
  if (
    document.visibilityState === "hidden" ||
    document.documentElement.hasAttribute("data-devices-hidden") ||
    !document.hasFocus() ||
    document.activeElement !== t
  )
    return new D_(
      "no_gesture",
      "focus",
      "read() needs the artifact to be visible and focused",
    );
  if (document.pointerLockElement)
    return new D_(
      "unavailable",
      "pointer_lock",
      "paste is unavailable while the pointer is locked",
    );
  if (k_ !== null || e.surfaceBusy() || t.inert)
    return new D_(
      "rate_limited",
      "busy",
      "another question is open; try again on a later click",
    );
  let r = I_(e.frameUuid),
    i = Date.now();
  if (r.declines >= 3)
    return new D_(
      "rate_limited",
      "backoff",
      "the viewer said no 3 times; paste is off until the viewer reloads the tab",
    );
  if (i < r.until)
    return new D_(
      "rate_limited",
      "backoff",
      "the viewer just said no; try again later",
    );
  for (; r.times.length > 0 && i - r.times[0] > 6e4;) r.times.shift();
  return r.times.length >= 5
    ? new D_("rate_limited", "rate", "asked too often; try again shortly")
    : (r.times.push(i), F_(r), null);
}
var z_ = {
  no_gesture: "refused_no_gesture",
  rate_limited: "refused_rate_limited",
  not_granted: "refused_not_granted",
};
async function B_() {
  try {
    return (await navigator.permissions.query({ name: "clipboard-read" }))
      .state;
  } catch {
    return null;
  }
}
async function V_(e) {
  let t, n;
  for (let r of e)
    (!t &&
      r.types.includes("text/plain") &&
      (t = await r.getType("text/plain")),
      !n &&
        r.types.includes("image/png") &&
        (n = await r.getType("image/png")));
  if ((t && t.size > 1048576) || (n && n.size > 20971520))
    throw new D_("too_large", "too_large", "too large to paste");
  let r = {};
  if (t) {
    let e = await t.text();
    e !== "" && (r.text = e);
  }
  if (
    (n && n.size > 0 && (r.image = new Blob([n], { type: "image/png" })),
    r.text === void 0 && r.image === void 0)
  )
    throw new D_("empty", "empty", "the clipboard has no text or PNG image");
  return r;
}
var H_ = (e) => Number(e.dataset.frameLoads ?? 0);
function U_(e, t, n) {
  let r = (r) => {
      n.brokerLive() && t.contentWindow?.postMessage(r, e);
    },
    i = (e, t, i = !0) => {
      W_(t.detail)
        ? n.report("paste-settled", t.detail)
        : n.report("paste-refused", t.detail);
      let a = z_[t.code];
      (a && i && n.track(a),
        r(ye(e, { error: { code: t.code, message: t.message } })));
    };
  I_(n.frameUuid);
  let a = !1,
    o = null,
    s = async (e) => {
      let s = !1,
        c = null,
        l = !1,
        u = 0,
        d = new AbortController(),
        f = () => !s && !a && t.isConnected && n.brokerLive(),
        p = () => {
          ((s = !0),
            (l = !1),
            window.clearTimeout(u),
            d.abort(),
            k_ === m && (k_ = null),
            o === m && (o = null));
        },
        m = {
          interrupt: (i, a = !1) => {
            if (s) return;
            a && l && L_(n.frameUuid);
            let o = i && t.isConnected && n.brokerLive();
            (p(),
              c?.close(),
              n.report("paste-settled", "interrupted"),
              o &&
                r(
                  ye(e, {
                    error: {
                      code: "unavailable",
                      message: "the paste was interrupted",
                    },
                  }),
                ));
          },
        },
        h = (t, n = !0) => {
          s || (p(), i(e, t, n));
        };
      ((k_ = m), (o = m));
      let g = H_(t);
      (t.addEventListener(
        "load",
        () => {
          (g !== 0 || H_(t) !== 1) && m.interrupt(!0, !0);
        },
        { signal: d.signal },
      ),
        document.addEventListener("pointerlockchange", () => m.interrupt(!0), {
          signal: d.signal,
        }));
      let _ = new MutationObserver(() => {
        document.documentElement.hasAttribute("data-devices-hidden") &&
          m.interrupt(!0, !0);
      });
      (_.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: [Pf],
      }),
        d.signal.addEventListener("abort", () => _.disconnect()));
      let v = await (n.queryPermission ?? B_)();
      if (!f()) {
        h(new D_("unavailable", "generation_gone", "the artifact was updated"));
        return;
      }
      if (v === "denied") {
        h(
          new D_(
            "not_granted",
            "browser_denied",
            "the browser blocks clipboard reading for this site",
          ),
        );
        return;
      }
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch {}
        if (document.fullscreenElement || !f()) {
          h(
            new D_(
              "unavailable",
              "fullscreen",
              "could not leave fullscreen to ask",
            ),
          );
          return;
        }
      }
      if (n.surfaceBusy() || t.inert) {
        h(new D_("rate_limited", "busy", "another question is open"));
        return;
      }
      if (
        document.visibilityState === "hidden" ||
        document.documentElement.hasAttribute("data-devices-hidden") ||
        !document.hasFocus() ||
        document.activeElement !== t
      ) {
        h(
          new D_(
            "no_gesture",
            "focus",
            "read() needs the artifact to be visible and focused",
          ),
        );
        return;
      }
      let y = () => {
          if (s) return;
          if (!f()) {
            m.interrupt(!1);
            return;
          }
          (window.clearTimeout(u), (l = !1));
          let t = I_(n.frameUuid);
          ((t.declines = 0),
            F_(t),
            n.track("granted"),
            (u = window.setTimeout(() => {
              s ||
                (p(),
                n.report("paste-settled", "timed_out"),
                r(
                  ye(e, {
                    error: {
                      code: "dismissed",
                      message: "the browser's prompt was not answered",
                    },
                  }),
                ));
            }, T_)));
          let i;
          try {
            i = (n.readClipboard ?? (() => navigator.clipboard.read()))();
          } catch (e) {
            i = Promise.reject(e);
          }
          i.then(V_).then(
            (t) => {
              if (!f()) {
                m.interrupt(!1);
                return;
              }
              (p(),
                n.report(
                  "paste-settled",
                  t.text !== void 0 && t.image !== void 0
                    ? "both"
                    : t.text === void 0
                      ? "image"
                      : "text",
                ),
                r(ye(e, { result: t })));
            },
            (e) => {
              if (!f()) {
                m.interrupt(!1);
                return;
              }
              h(
                e instanceof D_
                  ? e
                  : e?.name === "NotAllowedError"
                    ? new D_(
                        "not_granted",
                        "browser_denied",
                        "the browser blocks clipboard reading for this site",
                      )
                    : new D_(
                        "unavailable",
                        "read_failed",
                        "the clipboard could not be read",
                      ),
                !1,
              );
            },
          );
        },
        b = (t) => {
          s ||
            (p(),
            L_(n.frameUuid),
            n.track("denied"),
            n.report("paste-settled", t),
            r(
              ye(e, {
                error: {
                  code: "dismissed",
                  message: "the viewer did not paste",
                },
              }),
            ));
        };
      try {
        c = n.ask({
          onPaste: y,
          onCancel: () => b("cancelled"),
          onGone: (t) => {
            if (!s) {
              if (t === "closed") {
                (l && L_(n.frameUuid),
                  p(),
                  n.report("paste-settled", "interrupted"),
                  r(
                    ye(e, {
                      error: {
                        code: "unavailable",
                        message: "the question was closed",
                      },
                    }),
                  ));
                return;
              }
              h(
                new D_(
                  "unavailable",
                  "dialog_unavailable",
                  "the question could not be shown",
                ),
              );
            }
          },
        });
      } catch {
        h(
          new D_(
            "unavailable",
            "dialog_unavailable",
            "the question could not be shown",
          ),
        );
        return;
      }
      s ||
        ((l = !0),
        (u = window.setTimeout(() => {
          (b("timed_out"), c?.close());
        }, w_)),
        r(De(e)));
    },
    c = (o) => {
      if (
        a ||
        !t.isConnected ||
        !n.brokerLive() ||
        o.origin !== e ||
        !t.contentWindow ||
        o.source !== t.contentWindow
      )
        return;
      let c = _e(o.data, "paste");
      if (!c) return;
      if (c.method !== "read") {
        r(
          ye(c.id, {
            error: { code: "unavailable", message: "unknown paste method" },
          }),
        );
        return;
      }
      let l = R_(n, t, n.activated(o));
      if (l) {
        i(c.id, l);
        return;
      }
      s(c.id);
    };
  return (
    window.addEventListener("message", c),
    () => {
      ((a = !0),
        window.removeEventListener("message", c),
        o?.interrupt(!0, !0));
    }
  );
}
function W_(e) {
  return (
    e === "empty" ||
    e === "too_large" ||
    e === "read_failed" ||
    e === "cancelled" ||
    e === "timed_out" ||
    e === "interrupted" ||
    e === "text" ||
    e === "image" ||
    e === "both"
  );
}
var G_ = 1800,
  K_ = 0.7,
  q_ = 1.5,
  J_ = 1.2,
  Y_ = (e) => (Number.isFinite(e) ? Math.min(q_, Math.max(K_, e)) : 1),
  X_ = 3e5,
  Z_ = 9e5,
  Q_ = 2e3,
  $_ = 400,
  ev = class extends Error {
    code;
    reason;
    retryAfterMs;
    constructor(e, t, n, r) {
      (super(t), (this.code = e), (this.reason = n), (this.retryAfterMs = r));
    }
  },
  tv = new Map();
function nv(e) {
  let t = tv.get(e);
  return (t || ((t = Pe(ve)), tv.set(e, t)), t);
}
var rv = new Map(),
  iv = new Map();
function av(e) {
  let t = iv.get(e);
  return (t || ((t = Pe(ve)), iv.set(e, t)), t);
}
var ov = new Map(),
  sv = 1e3,
  cv = new Map(),
  lv = new Map(),
  uv = 6e3,
  dv = 36e5,
  fv = 6e4,
  pv = "frame-readaloud-hour:",
  mv = new Map(),
  hv = new Set();
function gv(e) {
  try {
    let t = window.localStorage.getItem(pv + e),
      n = [];
    try {
      n = t === null ? [] : JSON.parse(t);
    } catch {}
    let r = new Map();
    for (let e of Array.isArray(n) ? n : [])
      Array.isArray(e) &&
        Number.isSafeInteger(e[0]) &&
        Number.isFinite(e[1]) &&
        e[1] > 0 &&
        r.set(e[0], e[1]);
    return r;
  } catch {
    return null;
  }
}
function _v(e, t) {
  let n = hv.has(e) ? null : gv(e);
  n === null && hv.add(e);
  let r = new Map(n ?? mv.get(e) ?? []),
    i = Math.floor((t - dv) / fv);
  for (let e of r.keys()) e <= i && r.delete(e);
  return r;
}
function vv(e, t, n, r) {
  let i = _v(e, r),
    a = Math.max(0, (i.get(t) ?? 0) + n);
  if ((a > 0 ? i.set(t, a) : i.delete(t), mv.set(e, i), !hv.has(e)))
    try {
      i.size === 0
        ? window.localStorage.removeItem(pv + e)
        : window.localStorage.setItem(pv + e, JSON.stringify([...i]));
    } catch {
      hv.add(e);
    }
}
var yv = (e, t) => {
    let n = 0;
    for (let r of _v(e, t).values()) n += r;
    return n;
  },
  bv = (e, t) => Math.max(5, Math.ceil(e / 15 / Math.min(Y_(t), J_)));
function xv(e, t, n) {
  let r = yv(e, n) + t.reduce((e, t) => e + t, 0) - G_;
  if (r > 0) {
    let t = 0;
    for (let [i, a] of [..._v(e, n)].sort((e, t) => e[0] - t[0]))
      if (((t += a), t >= r)) return Math.max(0, i * fv + dv - n);
    return dv;
  }
  let i = Math.floor(n / fv);
  return t.map((t) => (vv(e, i, t, n), { minute: i, reserved: t, sentAt: n }));
}
function Sv(e, t, n, r, i = !1, a = 0) {
  let o = i ? 0 : Math.max(5, Math.ceil(Math.max(n, r - t.sentAt - a) / 1e3));
  vv(e, t.minute, o - t.reserved, r);
}
var Cv = 5,
  wv = new Map(),
  Tv = new Set(),
  Ev = () =>
    new ev(
      "stopped",
      "the artifact was hidden, so reading aloud stopped",
      "hidden",
    );
function Dv(e) {
  switch (e) {
    case "not_granted":
      return new ev(
        "not_granted",
        "the viewer turned reading aloud off for this artifact",
      );
    case "replaced":
      return new ev("stopped", "a newer speak() replaced this one", e);
    case "unavailable":
      return new ev(
        "unavailable",
        "reading aloud is not available for this viewer right now",
      );
    case "viewer_stopped":
      return new ev("stopped", "the viewer pressed Stop", e);
    case "interrupted":
      return new ev(
        "stopped",
        "the viewer started dictating, or claude.ai asked them something; speak again after it ends",
        e,
      );
    case "hidden":
      return Ev();
    case "time_limit":
      return new ev(
        "stopped",
        "the reading stayed paused for more than 5 minutes at once, or 15 minutes in all",
        e,
      );
    default:
      return new ev("stopped", "reading aloud was stopped", "stopped");
  }
}
function Ov(e) {
  return e === "denied"
    ? {
        reason: "not_granted",
        refusal: new ev(
          "not_granted",
          "reading aloud is off for this viewer and artifact",
        ),
      }
    : {
        reason: "unavailable",
        refusal: new ev(
          "unavailable",
          "reading aloud is not available for this viewer right now",
        ),
      };
}
function kv(e) {
  switch (e) {
    case "rate_limited":
      return {
        reason: "rate_limited",
        refusal: new ev(
          "rate_limited",
          "too much speech on this viewer's account for now; try again later",
        ),
      };
    case "unavailable":
      return {
        reason: "unavailable",
        refusal: new ev(
          "unavailable",
          "reading aloud is not available for this account",
        ),
      };
    case "stopped":
    case "interrupted":
      return { reason: "interrupted", refusal: Dv("interrupted") };
    case "nothing_to_say":
      return {
        reason: "upstream_error",
        refusal: new ev(
          "invalid_argument",
          "nothing is left to say once Markdown formatting is removed",
        ),
      };
    case "audio_locked":
    case "upstream_error":
      return {
        reason: "upstream_error",
        refusal: new ev(
          "upstream_error",
          "the speech service or the sound failed",
        ),
      };
  }
}
var Av = class {
    deps;
    state = "idle";
    cur = null;
    waiting = new Set();
    lingering = null;
    closed = !1;
    paceSeq = 0;
    target = null;
    farewell = null;
    unwatch;
    constructor(e) {
      this.deps = e;
      let t = () => {
          Ff() && this.end("hidden");
        },
        n = () => this.end("hidden"),
        r = new MutationObserver(t);
      (r.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: [Pf],
      }),
        document.addEventListener("visibilitychange", t),
        window.addEventListener("pagehide", n),
        (this.unwatch = () => {
          (r.disconnect(),
            document.removeEventListener("visibilitychange", t),
            window.removeEventListener("pagehide", n));
        }));
    }
    attach(e, t) {
      return (
        (this.target = e),
        (this.farewell = t ?? null),
        () => {
          this.target === e && (this.target = null);
        }
      );
    }
    current() {
      return this.state;
    }
    envelope(e) {
      return { __frame_tts_ev: !0, ev: e };
    }
    move(e, t, n = !1) {
      (e === this.state && !n) ||
        ((this.state = e),
        this.target?.(
          this.envelope(
            t === void 0
              ? { type: "state", state: e }
              : { type: "state", state: e, reason: t },
          ),
        ));
    }
    tell(e) {
      this.target?.(this.envelope(e));
    }
    sendPosition(e, t, n) {
      ((e.sentMs = n),
        (e.sentAt = Date.now()),
        this.tell(
          e.id === void 0
            ? { type: "position", ms: n, line: t }
            : { type: "position", ms: n, line: t, id: e.id },
        ));
    }
    flushPosition(e, t) {
      let n = Math.round(t.playedMs);
      t.spoke && n > t.sentMs && this.sendPosition(t, e.lines.indexOf(t), n);
    }
    once(e) {
      Tv.has(e) || (Tv.add(e), this.deps.report("readaloud", e));
    }
    voiceUnlisted() {
      this.once("voice-unlisted");
    }
    paceNow() {
      return lv.get(this.deps.viewer) ?? 1;
    }
    paceOf(e) {
      return e.rate === void 0
        ? e.kept === void 0
          ? e.callRate !== void 0 && e.callSeq === this.paceSeq
            ? e.callRate
            : this.paceNow()
          : e.kept
        : e.rate;
    }
    afford(e, t, n, r) {
      let i = e.reservation;
      if (i === null) return 0;
      let a = bv(e.text.length, t) - i.reserved;
      return a <= 0
        ? 0
        : n + a > 1800
          ? null
          : (vv(this.deps.viewer, i.minute, a, r), (i.reserved += a), a);
    }
    setRate(e) {
      let t = Y_(e),
        n = this.cur,
        r =
          n === null
            ? []
            : n.lines.filter(
                (e, t) =>
                  !e.done && t >= n.at && (e.rate === void 0 || t === n.at),
              ),
        i = new Map(r.map((e) => [e, this.paceOf(e)]));
      (lv.set(this.deps.viewer, t), this.paceSeq++);
      let a = Date.now(),
        o = yv(this.deps.viewer, a),
        s = [];
      for (let e of r) {
        let n = this.afford(e, t, o, a);
        if (n === null) {
          e.rate === void 0 && (e.kept = i.get(e));
          continue;
        }
        ((o += n), e.rate === void 0 ? delete e.kept : (e.rate = t), s.push(e));
      }
      for (let e of s)
        try {
          e.reading?.setRate(t);
        } catch {}
    }
    speak(e, t, n, r = !1, i = !1) {
      return this.closed
        ? Promise.reject(Dv("stopped"))
        : new Promise((a, o) => {
            let s = {
              lines: [],
              at: 0,
              ahead: null,
              chunk: null,
              strip: null,
              told: !1,
              admitted: !1,
              pauseWanted: !1,
              paused: !1,
              pausedSince: null,
              pausedMs: 0,
              timer: null,
              waiting: null,
              started: null,
              endedBy: void 0,
            };
            (this.take(s, e, a, o),
              this.waiting.add(s),
              this.admit(s, t, n, r, i)
                .catch(() => this.fail(s))
                .finally(() => this.waiting.delete(s)));
          });
    }
    take(e, t, n, r) {
      let i = {
          left: t.length,
          playedMs: 0,
          settled: !1,
          resolve: n,
          reject: r,
        },
        a = t.map((e) => ({
          ...e,
          call: i,
          callSeq: this.paceSeq,
          reservation: null,
          reading: null,
          playedMs: 0,
          sentMs: -1,
          sentAt: 0,
          heldMs: 0,
          heldSince: null,
          releasedAt: null,
          spoke: !1,
          done: !1,
          opened: !1,
          held: !1,
          token: null,
        }));
      return (e.lines.push(...a), a);
    }
    add(e) {
      let t = this.cur;
      if (this.closed || t === null || t.endedBy !== void 0)
        return Promise.reject(Dv("stopped"));
      if (t.lines.length - t.at + e.length > 100)
        return Promise.reject(
          new ev(
            "rate_limited",
            "more than 100 lines would be waiting to be spoken; add more once some of them have been spoken",
          ),
        );
      let n = Date.now(),
        r = xv(
          this.deps.viewer,
          e.map((e) =>
            bv(e.text.length, e.rate ?? e.callRate ?? this.paceNow()),
          ),
          n,
        );
      return typeof r == "number"
        ? Promise.reject(
            new ev(
              "rate_limited",
              "this artifact has read aloud as much as it may this hour",
              void 0,
              r,
            ),
          )
        : new Promise((n, i) => {
            let a = t.at >= t.lines.length - 1;
            (this.take(t, e, n, i).forEach((e, t) => {
              e.reservation = r[t] ?? null;
            }),
              a && t.admitted && t.lines[t.at]?.spoke && this.ready(t));
          });
    }
    fail(e) {
      if (e.endedBy === void 0) {
        try {
          this.unwind(
            e,
            "upstream_error",
            () => new ev("upstream_error", "reading aloud failed"),
          );
        } catch {}
        this.cur === e &&
          ((this.cur = null), this.move("idle", "upstream_error"));
      }
    }
    refuse(e, t, n) {
      (this.unwind(e, n, () => t),
        e.told && this.cur === e && ((this.cur = null), this.move("idle", n)));
    }
    async admit(e, t, n, r, i) {
      this.cur === null &&
        ((this.cur = e), (e.told = !0), this.move("starting"));
      let a = await t().catch(() => "unavailable");
      if (e.endedBy !== void 0) return;
      if (a !== "granted") {
        let { refusal: t, reason: n } = Ov(a);
        return this.refuse(e, t, n);
      }
      if (this.closed) return this.refuse(e, Dv("stopped"), "stopped");
      if (Ff()) return this.refuse(e, Ev(), "hidden");
      if (!i && n()) return this.refuse(e, Dv("interrupted"), "interrupted");
      let o = this.deps.viewer,
        s = nv(o),
        c = (t, n) =>
          this.refuse(e, new ev("rate_limited", t, void 0, n), "rate_limited"),
        l = ov.get(o),
        u = l === void 0 ? 0 : Date.now() - l.at;
      if (l !== void 0 && !l.completed && u < 1e3)
        return c(
          "too many starts; speak a paragraph at a time and try again shortly",
          sv - u,
        );
      let d = rv.get(o) ?? [];
      if (i || !s.take()) {
        let e = d[0];
        return c(
          "too many starts; speak a paragraph at a time and try again shortly",
          e === void 0 ? void 0 : Math.max(0, ve.windowMs - (Date.now() - e)),
        );
      }
      rv.set(o, [...d, Date.now()].slice(-ve.max));
      let f = av(o);
      if (!f.take())
        return c(
          "too many lines started in the last minute; try again shortly",
        );
      let p = e.lines.filter((e) => e.reservation === null),
        m = xv(
          o,
          p.map((e) => bv(e.text.length, this.paceOf(e))),
          Date.now(),
        );
      if (typeof m == "number")
        return (
          f.giveBack(),
          c("this artifact has read aloud as much as it may this hour", m)
        );
      (p.forEach((e, t) => {
        e.reservation = m[t] ?? null;
      }),
        (e.started = { at: Date.now(), completed: !1 }));
      let h = this.cur === e ? null : this.cur,
        g = h?.strip ?? null;
      if (
        (h &&
          ((h.strip = null),
          this.finish(h, "replaced"),
          this.move("idle", "replaced")),
        g === null && this.lingering !== null
          ? ((g = this.lingering.strip),
            clearTimeout(this.lingering.timer),
            (this.lingering = null))
          : this.dropLinger(),
        this.waiting.delete(e),
        (this.cur = e),
        (e.told = !0),
        this.move("starting"),
        g?.update?.({ paused: !1 }),
        (e.strip =
          g ??
          this.deps.showStrip({
            onStop: () => {
              (cv.set(o, Date.now()), this.end("viewer_stopped"));
            },
            onTurnOff: () => {
              (cv.set(o, Date.now()),
                this.deps.turnOff(),
                this.end("not_granted"));
            },
            onGone: () => this.end("hidden"),
          })),
        e.strip === null)
      )
        return (
          this.deps.report("readaloud", "strip-unavailable"),
          f.giveBack(),
          this.refuse(
            e,
            new ev(
              "upstream_error",
              "the reading-aloud indicator could not be shown",
            ),
            "upstream_error",
          )
        );
      if (
        (e.pauseWanted && this.hold(e),
        (e.chunk = await this.deps.load().catch(() => null)),
        e.endedBy !== void 0)
      )
        return f.giveBack();
      let _ = e.lines[0],
        v = _ === void 0 ? "failed" : this.open(e, _, !1, !0);
      if (e.endedBy !== void 0) return f.giveBack();
      if (v !== "ok")
        return (
          e.chunk === null && this.deps.report("readaloud", "chunk-load"),
          f.giveBack(),
          this.refuse(
            e,
            new ev("upstream_error", "reading aloud could not be loaded"),
            "upstream_error",
          )
        );
      ((e.started.at = Date.now()),
        ov.set(o, e.started),
        r && cv.delete(o),
        (e.admitted = !0));
    }
    open(e, t, n, r = !1) {
      if (e.chunk === null) return "failed";
      let i = r ? null : av(this.deps.viewer);
      if (i !== null && !i.take()) return "no_slot";
      let a = {};
      t.token = a;
      let o = () => t.token === a,
        s = null;
      try {
        s = e.chunk.openReading({
          organizationId: this.deps.organizationId,
          voice: t.voice,
          rate: this.paceOf(t),
          text: t.text,
          held: n,
          onSpeaking: () => o() && this.spoke(e, t),
          onPosition: (n) => o() && this.position(e, t, n),
          onFinished: (n) => o() && this.lineDone(e, t, n),
          onFirstAudio: (e) =>
            this.metered(
              "first-audio",
              e < 500
                ? "under-500"
                : e < 1e3
                  ? "500-1000"
                  : e < 2e3
                    ? "1000-2000"
                    : "over-2000",
            ),
        });
      } catch {}
      if (s === null) return (i?.giveBack(), "failed");
      let c = Date.now();
      return (
        (t.reading = s),
        (t.opened = !0),
        (t.held = n),
        t.reservation && (t.reservation.sentAt = c),
        (t.heldSince = n || e.paused ? c : null),
        !n && e.paused && s.pause(),
        s.ended.then((n) => o() && this.lineDone(e, t, n)),
        "ok"
      );
    }
    metered(e, t) {
      let n = wv.get(e) ?? 0;
      n >= Cv || (wv.set(e, n + 1), this.deps.report("readaloud", `${e}-${t}`));
    }
    live(e, t) {
      return e.endedBy === void 0 && this.cur === e && e.lines[e.at] === t;
    }
    spoke(e, t) {
      !this.live(e, t) ||
        t.spoke ||
        ((t.spoke = !0),
        t.releasedAt !== null &&
          this.metered(
            "ahead",
            Date.now() - t.releasedAt <= $_ ? "ready" : "missed",
          ),
        e.paused || this.move("speaking"),
        this.tell(
          t.id === void 0
            ? { type: "line", line: e.at }
            : { type: "line", line: e.at, id: t.id },
        ),
        this.sendPosition(t, e.at, 0),
        this.ready(e));
    }
    position(e, t, n) {
      if (
        !Number.isFinite(n) ||
        n < 0 ||
        ((t.playedMs = Math.max(t.playedMs, n)), !this.live(e, t) || !t.spoke)
      )
        return;
      let r = Math.round(t.playedMs);
      r > t.sentMs &&
        Date.now() - t.sentAt >= 100 &&
        this.sendPosition(t, e.at, r);
    }
    ready(e) {
      let t = e.lines[e.at + 1];
      e.ahead === null &&
        t !== void 0 &&
        t.reading === null &&
        e.endedBy === void 0 &&
        this.open(e, t, !0) === "ok" &&
        (e.ahead = t);
    }
    settleLine(e, t) {
      if (e.reservation === null) return;
      let n = e.heldMs + (e.heldSince === null ? 0 : t - e.heldSince);
      (Sv(this.deps.viewer, e.reservation, e.playedMs, t, !e.opened, n),
        (e.reservation = null));
    }
    lineDone(e, t, n) {
      if (
        t.done ||
        e.endedBy !== void 0 ||
        this.cur !== e ||
        e.lines[e.at] !== t
      )
        return;
      if (t.held && n !== "completed") {
        ((t.held = !1), (t.reading = null), (t.token = null), this.advance(e));
        return;
      }
      if (
        ((t.done = !0),
        this.flushPosition(e, t),
        this.settleLine(t, Date.now()),
        n !== "completed")
      ) {
        n === "audio_locked" && this.deps.report("readaloud", "audio-locked");
        let { reason: t, refusal: r } = kv(n);
        (this.unwind(e, t, () => r), (this.cur = null), this.move("idle", t));
        return;
      }
      let r = t.call;
      ((r.playedMs += Math.round(t.playedMs)),
        --r.left,
        r.left === 0 &&
          !r.settled &&
          ((r.settled = !0), r.resolve({ playedMs: r.playedMs })),
        (e.at += 1),
        this.advance(e));
    }
    advance(e) {
      let t = e.lines[e.at];
      if (t === void 0) {
        (e.started && (e.started.completed = !0),
          (this.cur = null),
          e.timer !== null && clearTimeout(e.timer),
          (e.timer = null),
          (e.paused = !1));
        let t = e.strip;
        ((e.strip = null),
          t?.update?.({ paused: !1 }),
          t !== null &&
            (this.lingering = {
              strip: t,
              timer: setTimeout(() => this.dropLinger(), Q_),
            }),
          this.move("idle", "completed"));
        return;
      }
      let n = Date.now();
      if (e.ahead === t && t.reading?.alive() === !0) {
        ((e.ahead = null), e.paused || this.letGo(t, n));
        return;
      }
      e.ahead = null;
      let r = this.open(e, t, !1);
      if (r === "no_slot")
        e.waiting = setTimeout(() => {
          ((e.waiting = null),
            this.cur === e && e.endedBy === void 0 && this.advance(e));
        }, 1e3);
      else if (r === "failed") {
        let { reason: t, refusal: n } = kv("upstream_error");
        (this.unwind(e, t, () => n), (this.cur = null), this.move("idle", t));
      }
    }
    letGo(e, t) {
      ((e.heldMs += t - (e.heldSince ?? t)),
        (e.heldSince = null),
        (e.held = !1),
        (e.releasedAt = t),
        e.reading?.release());
    }
    hold(e) {
      if (e.paused) return;
      let t = Date.now();
      ((e.paused = !0), (e.pausedSince = t));
      let n = e.lines[e.at];
      (n?.reading &&
        e.ahead !== n &&
        n.heldSince === null &&
        ((n.heldSince = t), n.reading.pause()),
        this.move("paused"),
        e.strip?.update?.({ paused: !0 }),
        n && this.flushPosition(e, n),
        (e.timer = setTimeout(
          () => {
            (this.once("pause-limit"), this.end("time_limit"));
          },
          Math.max(0, Math.min(X_, Z_ - e.pausedMs)),
        )));
    }
    pause() {
      let e = this.cur;
      e !== null &&
        e.endedBy === void 0 &&
        (e.strip === null ? (e.pauseWanted = !0) : this.hold(e));
    }
    resume() {
      let e = this.cur;
      if (
        e === null ||
        e.endedBy !== void 0 ||
        ((e.pauseWanted = !1), !e.paused)
      )
        return;
      let t = Date.now();
      ((e.paused = !1),
        (e.pausedMs += t - (e.pausedSince ?? t)),
        (e.pausedSince = null),
        e.timer !== null && clearTimeout(e.timer),
        (e.timer = null));
      let n = e.lines[e.at];
      (n?.held === !0
        ? this.letGo(n, t)
        : n &&
          e.ahead !== n &&
          (n.heldSince !== null && (n.heldMs += t - n.heldSince),
          (n.heldSince = null),
          n.reading?.resume()),
        e.strip?.update?.({ paused: !1 }),
        this.move(e.at > 0 || n?.spoke === !0 ? "speaking" : "starting"));
    }
    unwind(e, t, n) {
      ((e.endedBy = t),
        e.timer !== null && clearTimeout(e.timer),
        e.waiting !== null && clearTimeout(e.waiting),
        (e.timer = e.waiting = null),
        (e.ahead = null));
      let r = Date.now();
      for (let t of e.lines)
        (t.done || t.reading?.stop(),
          this.settleLine(t, r),
          t.call.settled || ((t.call.settled = !0), t.call.reject(n())));
      (e.strip?.close(t === "interrupted" ? t : void 0), (e.strip = null));
    }
    finish(e, t) {
      this.unwind(e, t, () => Dv(t));
    }
    dropLinger(e) {
      this.lingering !== null &&
        (clearTimeout(this.lingering.timer),
        this.lingering.strip.close(e),
        (this.lingering = null));
    }
    stop() {
      this.end("stopped");
    }
    end(e) {
      let t = this.cur;
      this.cur = null;
      for (let n of this.waiting) n !== t && this.finish(n, e);
      this.waiting.clear();
      let n = this.lingering !== null;
      if ((this.dropLinger(e === "interrupted" ? e : void 0), t === null)) {
        n &&
          (e === "viewer_stopped" || e === "not_granted") &&
          this.move("idle", e, !0);
        return;
      }
      (this.finish(t, e), this.move("idle", e));
    }
    close() {
      ((this.closed = !0), this.unwatch());
      let e = this.state === "idle" ? null : this.farewell;
      (this.end("hidden"),
        (this.target = null),
        e?.(this.envelope({ type: "state", state: "idle", reason: "hidden" })));
    }
  },
  jv = /[\p{L}\p{N}]/u,
  Mv = 64,
  Nv = (e) => new ev("invalid_argument", e);
function Pv(e) {
  return typeof e == "object" && !!e && !Array.isArray(e);
}
function Fv(e, t) {
  if (typeof e != "string") throw Nv(t);
  if (!jv.test(e))
    throw Nv("the text has no letter or digit, so there is nothing to say");
  if (e.length > 2e3)
    throw Nv("text is over 2,000 characters; speak it a paragraph at a time");
  return e;
}
function Iv(e, t, n) {
  let r = (r) => {
      n.brokerLive() && t.contentWindow?.postMessage(r, e);
    },
    i = n.gen.attach(r, (n) => t.contentWindow?.postMessage(n, e)),
    a = n.voices ?? [],
    o = (e) => {
      if (e === void 0) return;
      if (typeof e != "string")
        throw Nv("voice must be a voice's name, as a string");
      let t = a.find((t) => t === e);
      return (t === void 0 && n.gen.voiceUnlisted(), t ?? a[0]);
    },
    s = (e) => {
      if (e != null) return typeof e == "number" ? Y_(e) : 1;
    },
    c = (e, t, n, r) => {
      if (e.length === 0 || e.length > 100)
        throw Nv("a call takes 1 to 100 lines");
      return Array.from(e, (e) => {
        if (!Pv(e)) throw Nv("each line must be an object with its text");
        let { id: i } = e;
        if (i !== void 0 && (typeof i != "string" || i.length > Mv))
          throw Nv("a line's id must be a string of at most 64 characters");
        let a = s(e.rate);
        return {
          text: Fv(e.text, r),
          voice: o(e.voice) ?? t,
          ...(a !== void 0 && { rate: a }),
          ...(a === void 0 && n !== void 0 && { callRate: n }),
          ...(i !== void 0 && { id: i }),
        };
      });
    },
    l = (e) => {
      let [t, r] = e;
      if (r !== void 0 && !Pv(r))
        throw Nv("options must be an object, such as {voice, rate}");
      let i = o(r?.voice) ?? a[0],
        l = s(r?.rate);
      if (i === void 0) throw Dv("unavailable");
      let u =
          "speak() and add() take a string, or a list of lines {text, voice?, rate?, id?} each with a string text",
        d = Array.isArray(t)
          ? c(t, i, l, u)
          : [
              {
                text: Fv(t, u),
                voice: i,
                ...(l !== void 0 && { callRate: l }),
              },
            ];
      if (
        d.reduce(
          (e, t) =>
            e + bv(t.text.length, t.rate ?? t.callRate ?? n.gen.paceNow()),
          0,
        ) > 1800
      )
        throw Nv(
          "these lines are more than the 30 minutes an artifact may speak in an hour; speak fewer at a time",
        );
      return d;
    },
    u = async (e, t) => {
      if (Ff()) throw Ev();
      let r = cv.get(n.viewer);
      if (r !== void 0) {
        let e = uv - (Date.now() - r);
        if (e > 0 || !re("strict", t))
          throw new ev(
            "no_gesture",
            "the viewer pressed Stop; speak() again from a click or key press they make a few seconds or more after it",
            void 0,
            Math.max(0, e),
          );
      } else if (!re("interacted", t))
        throw new ev(
          "no_gesture",
          "the viewer has not clicked or typed in this page since it loaded",
        );
      let i = !1;
      if (
        n.dictating() &&
        (await n.decide().catch(() => "unavailable")) === "granted"
      ) {
        if (nv(n.viewer).take())
          throw new ev(
            "busy",
            "the viewer is dictating or answering a question from claude.ai; wait for it to end",
          );
        i = !0;
      }
      return n.gen.speak(e, n.decide, n.dictating, r !== void 0, i);
    },
    d = (e, t, r) => {
      switch (e) {
        case "speak":
          return u(l(t), n.activation(r));
        case "add":
          return n.gen.current() === "idle"
            ? u(l(t), n.activation(r))
            : n.gen.add(l(t));
        case "stop":
          return Promise.resolve(n.gen.stop()).then(() => null);
        case "pause":
          return Promise.resolve(n.gen.pause()).then(() => null);
        case "resume":
          return Promise.resolve(n.gen.resume()).then(() => null);
        case "voices":
          return Promise.resolve([...a]);
        case "setRate":
          return Promise.resolve(n.gen.setRate(s(t[0]) ?? 1)).then(() => null);
        default:
          throw Nv("unknown tts method");
      }
    },
    f = (i) => {
      if (
        !t.isConnected ||
        !n.brokerLive() ||
        i.origin !== e ||
        !t.contentWindow ||
        i.source !== t.contentWindow
      )
        return;
      let a = _e(i.data, "tts");
      if (!a) return;
      let o;
      try {
        o = d(a.method, a.args ?? [], i);
      } catch (e) {
        o = Promise.reject(e);
      }
      o.then(
        (e) => r(ye(a.id, { result: e ?? null })),
        (e) => {
          let t =
            e instanceof ev
              ? { code: e.code, message: e.message }
              : { code: "upstream_error", message: "reading aloud failed" };
          (e instanceof ev &&
            (e.reason !== void 0 && (t.reason = e.reason),
            e.retryAfterMs !== void 0 && (t.retryAfterMs = e.retryAfterMs)),
            r(ye(a.id, { error: t })));
        },
      );
    };
  return (
    window.addEventListener("message", f),
    () => {
      (window.removeEventListener("message", f), i());
    }
  );
}
var Lv = new Set(["get", "query", "subscribe", "unsubscribe"]),
  Rv = new Set(["invalid_argument", "resource_exhausted"]),
  zv =
    "Data from another artifact couldn't be read. This viewer may not have access to it, or it may be temporarily unavailable.",
  Bv = 16,
  Vv = 16,
  Hv = 6e5,
  Uv = 1e3,
  Wv = 2e4,
  Gv = { capacity: 2, refillMs: 3e5 },
  Kv = { capacity: 1, refillMs: 18e5 },
  qv = Zv({ capacity: 2, refillMs: 9e5 }, () => Date.now()),
  Jv = new WeakSet(),
  Yv = () => ({ code: "unavailable", message: zv });
function Xv(e) {
  return Rv.has(e.code) ? { code: e.code, message: e.message } : Yv();
}
function Zv({ capacity: e, refillMs: t }, n) {
  let r = e,
    i = n();
  return {
    take: () => {
      let a = n();
      i = Math.min(i, a);
      let o = Math.floor((a - i) / t);
      return (
        o > 0 && ((r = Math.min(e, r + o)), (i += o * t)),
        r !== 0 && (r === e && (i = a), r--, !0)
      );
    },
  };
}
function Qv(e, t, n) {
  let { frameOrigin: r, frameUuid: i } = e,
    { slot: a, brokerLive: o } = n,
    s = () => Date.now(),
    c = new Set(n.aliases),
    l = new Map(),
    u = new Map(),
    d = new xt(Bv),
    f = Ia({ limits: { maxStreams: Vv } }),
    p = Zv(Gv, s),
    m = Zv(Kv, s),
    h = null,
    g = -1 / 0,
    _ = () => {
      if (h !== null) return h;
      let t = a.value,
        n = e
          .requestReboot()
          .catch(() => null)
          .finally(() => {
            (h === n && (h = null), a.value !== t && (g = s()));
          });
      return ((h = n), n);
    },
    v = () => {
      if (h !== null) return h;
      let e = s() - g;
      return (e >= 0 && e < Wv) || !(Pn(a.value, s()) ? p : m).take()
        ? Promise.resolve()
        : _();
    },
    y = !1,
    b = () => {
      Jv.has(t) ||
        y ||
        !o() ||
        !t.isConnected ||
        h !== null ||
        (qv.take() && (Jv.add(t), _()));
    },
    x = () => document.visibilityState === "visible",
    S = new Set(),
    C = () => {
      for (let e of Array.from(S)) e();
    };
  document.addEventListener("visibilitychange", C);
  let w = (e, n, i) => {
      let a = i,
        c;
      if (a.type === "snapshot") c = i;
      else if (a.type === "error")
        c = {
          ...i,
          ...Xv({ code: String(a.code), message: String(a.message ?? "") }),
        };
      else if (a.type === "revoked")
        (l.get(e) === n && l.delete(e),
          u.set(e, s() + Hv),
          (c = { type: "error", ...Yv() }));
      else return;
      !o() ||
        !t.isConnected ||
        t.contentWindow?.postMessage(
          { __frame_reads_ev: !0, alias: e, ev: c },
          r,
        );
    },
    T = (t) => {
      let r = l.get(t);
      if (r === void 0) {
        let o = new $a({
          http: new ar({
            door: new xo({
              slug: i,
              source: t,
              ...(n.ver === void 0 ? {} : { ver: n.ver }),
              onVersionChanged: b,
              query: tt(e),
              cpHeaders: e.cpHeaders,
              signalFor: (e) => n.safeTimeout(e),
              markHandled: e.markHandled,
            }),
            bareNotFound: "unavailable",
            readGate: d,
            slug: i,
            query: tt(e),
            cpHeaders: e.cpHeaders,
            token: () => (a.value === "" ? null : a.value),
            onAuthStale: v,
            signalFor: (e) => n.safeTimeout(e),
            markHandled: e.markHandled,
          }),
          config: f,
          durableSync: null,
          storage: null,
          local: null,
          outbox: null,
          slug: i,
          metrics: new wo({ count: () => void 0, observe: () => void 0 }),
          postEvent: (e) => w(t, o, e),
          isVisible: x,
          onVisibility: (e) => (S.add(e), () => S.delete(e)),
          readOnly: !0,
        });
        (l.set(t, o), (r = o));
      }
      return r;
    },
    E = -1 / 0,
    D = new Map(),
    O = (e, t) => {
      let n = s(),
        r = n - E < Uv ? Uv : 0;
      if (((E = n + r), r === 0)) {
        e(t);
        return;
      }
      let i = () => {
          (D.delete(a), e(t));
        },
        a = setTimeout(i, r);
      D.set(a, i);
    },
    k = (n) => {
      if (
        !t.isConnected ||
        !o() ||
        n.origin !== r ||
        !t.contentWindow ||
        n.source !== t.contentWindow
      )
        return;
      let i = _e(n.data, "reads");
      if (!i) return;
      let l = performance.now(),
        d = (n) => {
          o() &&
            (t.contentWindow?.postMessage(ye(i.id, n), r),
            e.noteCapOutcome?.(
              i.cap,
              i.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - l,
            ));
        },
        f = (e) => d({ error: e });
      if (!Lv.has(i.method)) {
        f({
          code: "capability_removed",
          message: "reads supports only get, query, subscribe and unsubscribe",
        });
        return;
      }
      if (i.args.length > 3) {
        f({
          code: "invalid_argument",
          message:
            "a reads call takes at most three arguments, the alias included",
        });
        return;
      }
      let [p, ...m] = i.args;
      if (typeof p != "string" || !c.has(p)) {
        f({
          code: "invalid_argument",
          message:
            "the first argument must be an alias from this artifact's reads declaration",
        });
        return;
      }
      if (a.value === "") {
        O(f, Yv());
        return;
      }
      let h = u.get(p);
      if (h !== void 0) {
        if (s() < h && h - s() <= Hv) {
          O(f, Yv());
          return;
        }
        u.delete(p);
      }
      try {
        if (
          !lt(m) ||
          new TextEncoder().encode(JSON.stringify(m)).length > 286720
        ) {
          f({
            code: "invalid_argument",
            message: "arguments must be plain JSON data within the size limits",
          });
          return;
        }
      } catch {
        f({
          code: "invalid_argument",
          message: "arguments must be plain JSON data",
        });
        return;
      }
      T(p)
        .handleVerb(i.method, m)
        .then(
          (e) => d("error" in e ? { error: Xv(e.error) } : e),
          () => f(Yv()),
        );
    };
  return (
    window.addEventListener("message", k),
    () => {
      ((y = !0),
        window.removeEventListener("message", k),
        document.removeEventListener("visibilitychange", C));
      for (let [e, t] of Array.from(D)) (clearTimeout(e), t());
      for (let e of l.values()) e.stop();
      l.clear();
    }
  );
}
var $v = 250,
  ey = 1e4,
  ty = 8;
function ny(e) {
  let t = e.follow,
    n = typeof t == "object" && t ? t.of : null;
  return typeof n == "string" && n.length <= 64 ? n : null;
}
function ry(e) {
  let t = new Map(),
    n = new Set(),
    r = null,
    i = null,
    a = e.ended,
    o = !1,
    s = 0,
    c = 0,
    l = -1 / 0,
    u = () => ({
      open: !a && !e.receiveOnly(),
      document: s,
      self: r,
      of: i,
      docs: Array.from(
        t.values(),
        ({ peer: e, who: t, own: n, of: r, seen: i }) => ({
          peer: e,
          who: t,
          own: n,
          of: r,
          seen: i,
        }),
      ),
    }),
    d = u(),
    f = () => {
      ((c = 0), (l = Date.now()));
      let r = l - e.silenceMs;
      for (let [e, n] of t) n.heard < r && t.delete(e);
      d = u();
      for (let e of Array.from(n)) e();
    },
    p = () => {
      if (c === 0 && !o) {
        let e = $v - (Date.now() - l);
        c = window.setTimeout(f, Math.min($v, Math.max(0, e)));
      }
    },
    m = () => {
      ((i = null), t.clear(), (s += 1), p());
    },
    h = {
      get: () => ({
        ...d,
        open: !a && !e.receiveOnly(),
        docs: d.docs.map((e) => ({
          ...e,
          seen: t.get(e.peer)?.seen ?? e.seen,
        })),
      }),
      subscribe(e) {
        return (n.add(e), () => void n.delete(e));
      },
      named(n) {
        let r = s;
        return (i) =>
          i === e.frame &&
          r === s &&
          !a &&
          !e.receiveOnly() &&
          t.get(n)?.own === !1;
      },
    },
    g = window.setInterval(p, ey);
  return (
    e.chrome.lane(h, !0),
    {
      self(e) {
        ((r = e), p());
      },
      own(e) {
        let t = ny(e);
        t !== i && ((i = t), p());
      },
      heard(n, r, i, a) {
        let o = t.get(n);
        if (o === void 0) {
          let n = 0;
          for (let e of t.values()) n += Number(e.who === r);
          if (t.size >= e.maxPeers || n >= ty) return;
        }
        let s = Date.now(),
          c = ny(a),
          l = JSON.stringify(a),
          u = o?.json === l ? o.seen : s;
        (t.set(n, {
          peer: n,
          who: r,
          own: i,
          of: c,
          seen: u,
          heard: s,
          json: l,
        }),
          (o?.of !== c || o === void 0) && p());
      },
      gone(e) {
        t.delete(e) && p();
      },
      newDocument: m,
      terminal() {
        ((a = !0), m());
      },
      teardown() {
        ((a = !0),
          (o = !0),
          window.clearTimeout(c),
          (c = 0),
          window.clearInterval(g),
          n.clear(),
          e.chrome.lane(h, !1));
      },
    }
  );
}
var iy = /^[a-z0-9][a-z0-9_.-]{0,47}$/,
  ay = 1e4,
  oy = 500,
  sy = 5,
  cy = 80,
  ly = 16,
  uy = 16,
  dy = {
    JOIN_DENIED_REASON_DENIED: {
      code: "not_permitted",
      message: "this viewer cannot join rooms here",
    },
    JOIN_DENIED_REASON_JOIN_LIMIT: {
      code: "limit_reached",
      message: "the room limit is reached; leave a room or try again later",
    },
  },
  fy = {
    code: "upstream_error",
    message:
      "named rooms are not answering on this connection; joins fail until it is re-established",
  },
  py = {
    code: "upstream_error",
    message: "the room connection closed before this join finished",
  },
  my = {
    code: "upstream_error",
    message: "could not reach the room in time; try again",
  },
  hy = new WeakMap();
function gy(e) {
  let t = hy.get(e);
  if (t !== void 0) return t;
  let n = {
    inflight: new Map(),
    answered: !1,
    stalled: !1,
    reported: new Set(),
    tokens: cy,
    refillAt: Date.now(),
    wires: new Set(),
  };
  return (
    hy.set(e, n),
    e.onRoom((t) => {
      let r = !0,
        i = t.room === void 0 ? _y(t) : null;
      if (
        (t.room === void 0 && ((n.answered = !0), (n.stalled = !1)), i !== null)
      ) {
        let a = n.inflight.get(i) ?? 0;
        ((r = a <= 1),
          r ? n.inflight.delete(i) : n.inflight.set(i, a - 1),
          r &&
            n.wires.size === 0 &&
            t.kind === "ctrl:room_joined" &&
            e.sendCtrl("ctrl:room_leave", { room: i }));
      }
      for (let e of Array.from(n.wires)) e(t, r);
    }),
    e.onDown(() => {
      (n.inflight.clear(),
        (n.answered = n.stalled = !1),
        n.reported.clear(),
        (n.tokens = cy));
    }),
    n
  );
}
function _y(e) {
  let t = e.payload?.room;
  return typeof t == "string" && iy.test(t) ? t : null;
}
function vy(e) {
  let t = new Map(),
    n = gy(e.sync),
    r = () => e.sync.currentJoined() !== null,
    i = (t, n) => e.sync.sendCtrl(t, { room: n }),
    a = (t, n, r) => !e.receiveOnly() && e.sync.sendRoom(t, n, r),
    o = () => {
      let e = Date.now();
      return (
        (n.tokens = Math.min(
          cy,
          n.tokens + (Math.max(0, e - n.refillAt) / 1e3) * sy,
        )),
        (n.refillAt = e),
        n.tokens < 1 ? !1 : (--n.tokens, !0)
      );
    },
    s = (t, n) => {
      (e.presenceDone(t),
        window.clearTimeout(n.timer),
        window.clearTimeout(n.retry),
        window.clearTimeout(n.throttle),
        window.clearTimeout(n.reassert),
        (n.timer = n.retry = n.throttle = n.reassert = 0),
        (n.pending = !1));
    },
    c = (e, t) => {
      for (let n of e.replies.splice(0)) n(t);
    },
    l = (n, r, i) => {
      (s(n, r),
        t.delete(n),
        i !== void 0 &&
          (c(r, { error: i }),
          r.live && e.post({ arm: "left", room: n, code: i.code })));
    },
    u = (r, i) => {
      (window.clearTimeout(i.timer),
        (i.timer = window.setTimeout(() => {
          if (t.get(r) !== i) return;
          let a = i.sent && !n.answered && Date.now() - i.sentAt >= ay / 2;
          (a && ((n.stalled = !0), e.report("join-timeout")),
            l(r, i, a ? fy : my));
        }, ay)));
    },
    d = (e, t) => {
      ((t.sent = r() && i("ctrl:room_join", e)),
        t.sent &&
          ((t.sentAt = Date.now()),
          n.inflight.set(e, (n.inflight.get(e) ?? 0) + 1)));
    },
    f = (t, n) => {
      if (n.state !== "joined" || n.last === null || e.receiveOnly()) {
        e.presenceDone(t);
        return;
      }
      if (!e.presenceTurn(t)) {
        ((n.pending = !0), n.throttle === 0 && m(t, n));
        return;
      }
      a(t, "room:presence", { p: n.last, n: e.n }) &&
        (window.clearTimeout(n.reassert), (n.reassert = 0));
    },
    p = (e, t) => {
      if (t.throttle !== 0) {
        t.pending = !0;
        return;
      }
      (f(e, t), t.throttle === 0 && m(e, t));
    },
    m = (n, r) => {
      r.throttle = window.setTimeout(
        () => {
          ((r.throttle = 0),
            r.pending && t.get(n) === r && ((r.pending = !1), p(n, r)));
        },
        Math.ceil(1e3 / e.presenceHz),
      );
    },
    h = (r, a) => {
      if (r.room !== void 0) {
        t.has(r.room) && e.relay(r, r.room);
        return;
      }
      let o = _y(r);
      if (o === null || !a) return;
      let s = r.payload ?? {},
        u = t.get(o);
      if (r.kind === "ctrl:room_joined") {
        if (u === void 0) {
          i("ctrl:room_leave", o);
          return;
        }
        if (u.state === "joined") return;
        (window.clearTimeout(u.timer),
          window.clearTimeout(u.retry),
          (u.timer = u.retry = 0),
          (u.state = "joined"),
          (u.live = !0),
          e.post({ arm: "conn", up: !0, room: o }),
          c(u, { result: null }),
          u.last !== null &&
            u.reassert === 0 &&
            (u.reassert = window.setTimeout(() => {
              ((u.reassert = 0), f(o, u));
            }, Math.random() * oy)));
      } else if (r.kind === "ctrl:room_denied" && u?.state === "joining") {
        let r = typeof s.reason == "string" ? s.reason : "";
        if (r === "JOIN_DENIED_REASON_UNAVAILABLE") {
          ((u.sent = !1),
            window.clearTimeout(u.retry),
            (u.retry = window.setTimeout(
              () => {
                ((u.retry = 0), t.get(o) === u && !u.sent && d(o, u));
              },
              Math.min(2e3, 250 * 2 ** u.tries++) * (0.5 + Math.random()),
            )));
          return;
        }
        (!(
          r === "JOIN_DENIED_REASON_JOIN_LIMIT" &&
          t.size - 1 >= Math.min(e.maxRooms, uy)
        ) &&
          !n.reported.has(o) &&
          (n.reported.add(o), e.report("join-denied")),
          l(
            o,
            u,
            Object.hasOwn(dy, r)
              ? dy[r]
              : {
                  code: "upstream_error",
                  message: "the room could not be joined right now; try again",
                },
          ));
      }
    };
  n.wires.add(h);
  let g = e.sync.onLaneCtrl((e) => {
      if (e.kind === "ctrl:joined")
        for (let [e, n] of t)
          n.state === "joining" &&
            !n.sent &&
            n.retry === 0 &&
            (d(e, n), n.sent && n.live && u(e, n));
    }),
    _ = e.sync.onDown(() => {
      for (let [n, r] of t)
        ((r.sent = !1),
          (r.tries = 0),
          r.state === "joined" &&
            ((r.state = "joining"), e.post({ arm: "conn", up: !1, room: n })),
          r.live && (window.clearTimeout(r.timer), (r.timer = 0)),
          window.clearTimeout(r.reassert),
          window.clearTimeout(r.retry),
          (r.reassert = r.retry = 0));
    });
  return {
    join: (r, i) => {
      if (typeof r != "string" || !iy.test(r))
        return i({
          error: {
            code: "invalid_argument",
            message: "room names match ^[a-z0-9][a-z0-9_.-]{0,47}$",
          },
        });
      let a = t.get(r);
      if (a !== void 0) {
        if (a.state === "joined")
          return (
            e.post({ arm: "conn", up: !0, room: r }),
            i({ result: null })
          );
        if (a.live) return i({ result: null });
        if (a.replies.length >= ly)
          return i({
            error: {
              code: "upstream_error",
              message:
                "16 join() calls for this name are already waiting; await the first instead of calling again",
            },
          });
        a.replies.push(i);
        return;
      }
      if (n.stalled) return i({ error: fy });
      if (t.size >= e.maxRooms)
        return i({
          error: {
            code: "limit_reached",
            message: `at most ${e.maxRooms} rooms at once; leave one first`,
          },
        });
      if (!o())
        return i({
          error: {
            code: "upstream_error",
            message: "joining rooms too fast; try again shortly",
          },
        });
      let s = {
        state: "joining",
        sent: !1,
        live: !1,
        timer: 0,
        retry: 0,
        tries: 0,
        sentAt: 0,
        replies: [i],
        last: null,
        throttle: 0,
        pending: !1,
        reassert: 0,
      };
      (t.set(r, s), u(r, s), d(r, s));
    },
    leave: (e, n) => {
      let r = typeof e == "string" ? t.get(e) : void 0;
      (r !== void 0 &&
        typeof e == "string" &&
        ((r.sent || r.state === "joined") && i("ctrl:room_leave", e),
        l(e, r),
        c(r, {
          error: {
            code: "upstream_error",
            message: "leave() was called before this join finished",
          },
        })),
        n({ result: null }));
    },
    joined: (e) => t.get(e)?.state === "joined",
    put: a,
    presence: (e, n) => {
      let r = t.get(e);
      r !== void 0 && ((r.last = n), p(e, r));
    },
    goodbye: () => {
      for (let [n, r] of t)
        r.state === "joined" && a(n, "room:gone", { n: e.n });
    },
    end: (e) => {
      for (let [n, r] of t) (s(n, r), c(r, { error: e }));
      t.clear();
    },
    teardown: () => {
      for (let [e, n] of t)
        ((n.sent || n.state === "joined") && i("ctrl:room_leave", e),
          s(e, n),
          c(n, { error: py }));
      (t.clear(), n.wires.delete(h), g(), _());
    },
  };
}
var yy = /^[a-z][a-z0-9_.-]{0,47}$/,
  by = {
    maxBytes: 4096,
    presenceHz: 30,
    keepaliveMs: 2e4,
    silenceMs: 15e4,
    maxPeers: 256,
    maxRooms: 0,
  },
  xy = "agent:",
  Sy = /^u_[A-Za-z0-9_-]{8,64}$/,
  Cy = 40,
  wy = 80,
  Ty = 1e3,
  Ey = 500,
  Dy = 4096,
  Oy = 24;
function ky(e) {
  let t = e,
    n = (e, t, n, r) =>
      typeof e == "number" && Number.isFinite(e) && e >= n && e <= r ? e : t,
    r = t?.limits,
    i = Object.create(null);
  if (t?.topics && typeof t.topics == "object")
    for (let [e, n] of Object.entries(t.topics))
      yy.test(e) && (n === "interact" || n === "admin") && (i[e] = n);
  return {
    limits: {
      maxBytes: n(r?.maxBytes, by.maxBytes, 1024, 65536),
      presenceHz: n(r?.presenceHz, by.presenceHz, 1, 120),
      keepaliveMs: n(r?.keepaliveMs, by.keepaliveMs, 1e3, 6e5),
      silenceMs: n(r?.silenceMs, by.silenceMs, 1e4, 36e5),
      maxPeers: n(r?.maxPeers, by.maxPeers, 2, 4096),
      maxRooms: n(r?.maxRooms, by.maxRooms, 1, 64),
    },
    topics: i,
  };
}
function Ay(e, t) {
  let n = 16383,
    r = t,
    i = [[e, 0]];
  for (; i.length > 0;) {
    let e = i.pop();
    if (e === void 0) break;
    let [t, a] = e;
    if (typeof t == "string") {
      if (((r -= t.length), r < 0)) return "big";
      continue;
    }
    if (typeof t != "object" || !t) {
      if (typeof t == "function" || typeof t == "symbol") return "bad";
      continue;
    }
    if (a > Oy) return "bad";
    if (Array.isArray(t)) {
      if (t.length > Dy || ((n -= t.length), n < 0)) return "bad";
      for (let e of t) i.push([e, a + 1]);
    } else {
      if (ArrayBuffer.isView(t)) return "bad";
      let e = Object.getPrototypeOf(t);
      if (e !== Object.prototype && e !== null) return "bad";
      let o = 0;
      for (let e in t) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) continue;
        if (++o > Dy || --n < 0) return "bad";
        let s = t[e];
        if (s !== void 0) {
          if (((r -= e.length), r < 0)) return "big";
          i.push([s, a + 1]);
        }
      }
    }
  }
  return "ok";
}
function jy(e, t, n) {
  let r = Ay(e, t);
  if (r === "bad")
    return n === "presence"
      ? "presence fields must be plain JSON data"
      : "emit data must be plain JSON data";
  let i = r === "ok" ? My(e, t) : null;
  return i === null
    ? n === "presence"
      ? "presence object over the room limits"
      : "emit data over the room limits"
    : { clean: i.clean };
}
function My(e, t) {
  let n;
  try {
    n = JSON.stringify(e);
  } catch {
    return null;
  }
  if (typeof n != "string") return null;
  let r = new TextEncoder().encode(n).length;
  return r > t ? null : { clean: JSON.parse(n), bytes: r };
}
var Ny = null;
function Py(e) {
  if (Ny === null || e === null || Ny.key !== e) {
    let t = new Uint8Array(16);
    (crypto.getRandomValues(t),
      (Ny = {
        key: e,
        n: Array.from(t, (e) => e.toString(16).padStart(2, "0")).join(""),
      }));
  }
  return Ny.n;
}
var Fy = "abcdefghijklmnopqrstuvwxyz234567";
function Iy(e) {
  let t = new Uint8Array(e),
    n = "",
    r = 0,
    i = 0;
  for (let e = 0; e < 10; e++)
    for (r = (r << 8) | t[e], i += 8; i >= 5;)
      ((i -= 5), (n += Fy[(r >> i) & 31]));
  return n;
}
async function Ly(e, t, n) {
  return Iy(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(e + "\0" + t + "\0" + n),
    ),
  );
}
function Ry(e) {
  return (
    typeof e.onRoom == "function" &&
    typeof e.sendCtrl == "function" &&
    typeof e.sendRoom == "function"
  );
}
function zy(e, t, n) {
  let { limits: r, topics: i } = ky(e.config),
    a = () => {
      let t = e.grant();
      return typeof t == "string" &&
        t !== "" &&
        new TextEncoder().encode(t).length <= 4096
        ? t
        : null;
    },
    o = (e) => (e !== null && Sy.test(e) ? e : null),
    s = () => o(e.sync?.ownId() ?? null),
    c = e.viewerId !== null && Sy.test(e.viewerId) ? e.viewerId : null,
    l = (t) =>
      t === e.account ||
      t === c ||
      t === s() ||
      t === o(e.sync?.bootOwnId() ?? null),
    u = e.account ?? c ?? s(),
    d = Object.values(i).includes("interact"),
    f = () => d && a() === null,
    p = () => e.receiveOnly?.() === !0;
  !p() && f() && e.reportRealtime("grant-missing");
  let m = {
      error: {
        code: "not_permitted",
        message:
          "this viewer can only receive room events \u2014 gate the control on user.canEdit()",
      },
    },
    h = Py(u),
    g = (r) =>
      !n() || !t.isConnected || !t.contentWindow
        ? !1
        : (t.contentWindow.postMessage(
            { __frame_room_ev: !0, ev: r },
            e.frameOrigin,
          ),
          !0);
  if (e.sync === null) {
    let a = e.local === !0,
      o = a ? By() : null,
      s = (s) => {
        if (
          !t.isConnected ||
          !n() ||
          s.origin !== e.frameOrigin ||
          !t.contentWindow ||
          s.source !== t.contentWindow
        )
          return;
        let l = e.parseCap(s.data, "room");
        if (!(!l || e.claude?.handle(l, s, (e) => c(l.id, e)))) {
          if (l.method === "hello")
            return c(l.id, {
              result: a
                ? { peer: o, limits: r, up: !1 }
                : {
                    peer: null,
                    limits: r,
                    up: !1,
                    terminal: { code: "not_granted" },
                  },
            });
          if (!a)
            return c(l.id, {
              error: {
                code: "not_granted",
                message: "this view cannot be connected",
              },
            });
          if (Hy.has(l.method)) return c(l.id, Uy);
          if (l.method === "presence") {
            let [t] = l.args;
            if (typeof t != "object" || !t || Array.isArray(t))
              return c(l.id, Wy("presence takes one object"));
            let n = jy(t, r.maxBytes, "presence");
            return typeof n == "string"
              ? c(l.id, Wy(n))
              : (e.presence?.publish(n.clean), c(l.id, { result: null }));
          }
          if (l.method === "emit") {
            let [t, n] = l.args;
            if (typeof t != "string" || !yy.test(t))
              return c(l.id, Wy("emit topic fails the topic grammar"));
            if (n !== void 0) {
              let e = jy(n, r.maxBytes, "emit");
              if (typeof e == "string") return c(l.id, Wy(e));
            }
            return (Object.hasOwn(i, t) ? i[t] : "admin") === "admin" &&
              !e.writer
              ? c(l.id, {
                  error: {
                    code: "not_permitted",
                    message:
                      "this viewer may not send on that topic \u2014 open it in the declaration or gate the control on user.canEdit()",
                  },
                })
              : (e.report("drop:down"), c(l.id, { result: null }));
          }
          c(l.id, Wy("unknown room method " + l.method));
        }
      },
      c = (r, i) => {
        n() &&
          t.contentWindow?.postMessage(
            { __frame_cap_r: !0, id: r, ...i },
            e.frameOrigin,
          );
      };
    return (
      window.addEventListener("message", s),
      a
        ? (g({ arm: "conn", up: !1 }),
          () => {
            (window.removeEventListener("message", s), e.presence?.withdraw());
          })
        : (g({ arm: "revoked", code: "not_granted" }),
          e.presence?.withdraw(),
          () => {
            window.removeEventListener("message", s);
          })
    );
  }
  let _ = e.sync,
    v = (e, t) => !p() && _.sendBroadcast(e, t),
    y = new Map(),
    b = new Set(),
    x = null,
    S = 0,
    C = !1,
    w = 0,
    T = wy,
    E = Date.now(),
    D = _.currentJoined() === null,
    O = !1,
    k = !1,
    A = () => {
      _.parked()
        ? k || ((k = !0), e.report("drop:parked"))
        : e.report("drop:down");
    },
    j = _.terminal(),
    M = j === null ? null : { code: j },
    ee = (t, n) => {
      let i = t + "\0" + n,
        a = y.get(i);
      if (a === void 0) {
        if (y.size >= r.maxPeers * 8) {
          for (let e of b) y.delete(e);
          b.clear();
        }
        ((a = Ly(e.slug, t, n)), y.set(i, a));
        let o = a;
        a.finally(() => {
          y.get(i) === o && b.add(i);
        });
      }
      return a;
    },
    te = s() ?? e.account,
    N = te === null ? Promise.resolve(null) : ee(te, h),
    P = e.userWired && s() !== null ? c : null,
    F =
      e.follow === void 0
        ? null
        : ry({
            frame: t,
            chrome: e.follow,
            maxPeers: r.maxPeers,
            silenceMs: r.silenceMs,
            receiveOnly: p,
            ended: M !== null,
          });
  N.then((e) => {
    !O && e !== null && F?.self(e);
  });
  let ne = () => {
    t.id !== "" && F?.newDocument();
  };
  document.addEventListener("frame-content-navigated", ne);
  let re = () => {
      let e = Date.now(),
        t = Math.max(0, e - E);
      ((T = Math.min(wy, T + (t / 1e3) * Cy)), (E = e));
    },
    ie = () => (re(), T < 1 ? !1 : (--T, !0)),
    I = new Map(),
    ae = !1,
    oe = Math.max(Ty, 3 * Math.ceil(1e3 / r.presenceHz)),
    se = (e) => {
      for (let [t, n] of I) e - n > oe && I.delete(t);
    },
    ce = (e) => {
      let t = Date.now();
      se(t);
      let n = I.keys().next().value;
      return (n === void 0 || n === e) && ie()
        ? (I.delete(e), (ae = !1), !0)
        : (I.set(e, t), !1);
    },
    le = (e) => {
      I.delete(e);
    },
    ue = () => (
      se(Date.now()),
      re(),
      (ae && I.size > 0 && T < 2) || !ie() ? !1 : ((ae = !0), !0)
    ),
    de = () => {
      let e = a();
      e !== null && M === null && v("room:grant", { grant: e });
    },
    fe = () => {
      if (x === null || M !== null || p()) {
        le("");
        return;
      }
      if (!ce("")) {
        ((C = !0), S === 0 && me());
        return;
      }
      v("room:presence", { p: x, n: h })
        ? (window.clearTimeout(w), (w = 0))
        : _.parked() || e.report("drop:presence");
    },
    pe = (e) => {
      if (((x = e), S !== 0)) {
        C = !0;
        return;
      }
      (fe(), S === 0 && me());
    },
    me = () => {
      S = window.setTimeout(
        () => {
          ((S = 0), C && !O && x !== null && ((C = !1), pe(x)));
        },
        Math.ceil(1e3 / r.presenceHz),
      );
    },
    he = {
      error: {
        code: "not_permitted",
        message:
          "this viewer may not send on that topic \u2014 open it in the declaration or gate the control on user.canEdit()",
      },
    },
    ge = (t, n) => {
      if (typeof t != "string" || !yy.test(t))
        return Wy("emit topic fails the topic grammar");
      let a;
      if (n !== void 0) {
        let e = jy(n, r.maxBytes, "emit");
        if (typeof e == "string") return Wy(e);
        a = e.clean;
      }
      if (p()) return m;
      let o = Object.hasOwn(i, t) ? i[t] : "admin";
      return (o === "admin" && !e.writer) ||
        (o === "interact" && !e.writer && f())
        ? he
        : { topic: t, clean: a };
    },
    L = (t, n, r) => {
      ue()
        ? (r === void 0
            ? !v("app:" + t, { d: n, n: h })
            : !_e?.put(r, `app:${t}`, { d: n, n: h })) && A()
        : e.report("drop:rate");
    },
    R = (e) => {
      if (typeof e != "object" || !e || Array.isArray(e))
        return Wy("presence takes one object");
      let t = jy(e, r.maxBytes, "presence");
      return typeof t == "string" ? Wy(t) : { clean: t.clean };
    },
    _e =
      r.maxRooms > 0 && Ry(_)
        ? vy({
            sync: _,
            maxRooms: r.maxRooms,
            presenceHz: r.presenceHz,
            post: g,
            relay: (e, t) => be(e, t),
            presenceTurn: ce,
            presenceDone: le,
            receiveOnly: p,
            n: h,
            report: e.reportRealtime,
          })
        : null,
    ve = (e, t) => {
      if (_e === null) return Hy.has(e.method) ? (t(Uy), !0) : !1;
      let [n, r, i] = e.args;
      switch (e.method) {
        case "join":
          return (_e.join(n, t), !0);
        case "leave":
          return (_e.leave(n, t), !0);
        case "roomEmit": {
          let e = ge(r, i);
          return (
            "error" in e
              ? t(e)
              : (typeof n == "string" && _e.joined(n)
                  ? L(e.topic, e.clean, n)
                  : A(),
                t({ result: null })),
            !0
          );
        }
        case "roomPresence": {
          let e = R(r);
          return (
            "error" in e
              ? t(e)
              : (typeof n == "string" && !p() && _e.presence(n, e.clean),
                t({ result: null })),
            !0
          );
        }
      }
      return !1;
    },
    ye = (i) => {
      if (
        !t.isConnected ||
        !n() ||
        i.origin !== e.frameOrigin ||
        !t.contentWindow ||
        i.source !== t.contentWindow
      )
        return;
      let a = e.parseCap(i.data, "room");
      if (!a) return;
      let o = (r) => {
        n() &&
          t.contentWindow?.postMessage(
            { __frame_cap_r: !0, id: a.id, ...r },
            e.frameOrigin,
          );
      };
      if (a.method === "hello") {
        N.then((t) => {
          O ||
            o({
              result: {
                peer: t,
                ...(P === null ? {} : { by: P }),
                ...(e.guest ? { guest: !0 } : {}),
                limits: r,
                up: M === null && _.currentJoined() !== null,
                ...(M === null ? {} : { terminal: M }),
              },
            });
        });
        return;
      }
      if (!e.claude?.handle(a, i, o)) {
        if (M !== null && a.method !== "hello")
          return o({
            error: {
              code: M.code,
              message: "The room channel is no longer available to this view.",
            },
          });
        if (a.method === "emit") {
          let [e, t] = a.args,
            n = ge(e, t);
          return "error" in n
            ? o(n)
            : (L(n.topic, n.clean), o({ result: null }));
        }
        if (a.method === "presence") {
          let t = R(a.args[0]);
          return "error" in t
            ? o(t)
            : (e.presence?.publish(t.clean),
              p() || pe(t.clean),
              F?.own(t.clean),
              o({ result: null }));
        }
        ve(a, o) ||
          o({
            error: {
              code: "invalid_argument",
              message: "unknown room method " + a.method,
            },
          });
      }
    };
  window.addEventListener("message", ye);
  function be(t, n) {
    let i = n === void 0 ? {} : { room: n },
      a = t.kind,
      o = a === "room:presence" || a === "room:gone",
      s = a.startsWith("app:");
    if (!o && !s) return;
    let c = t.payload ?? {},
      u = typeof c.n == "string" ? c.n : null,
      d = typeof t.actor == "string" ? t.actor : null;
    if (d === null || u === null) return;
    let f = d.startsWith(xy) ? "agent" : "viewer",
      p = f === "viewer" && l(d),
      m = p && u === h,
      _ = Vy(t.attested),
      v = _ === null ? null : _.guest,
      x =
        e.userWired && _ !== null && _.person && f === "viewer" && Sy.test(d)
          ? d
          : null;
    ee(d, u).then((e) => {
      if (!O) {
        if (a === "room:presence") {
          let t = c.p;
          if (typeof t != "object" || !t || Array.isArray(t)) return;
          let a = My(t, r.maxBytes);
          if (a === null) return;
          (g({
            arm: "presence",
            peer: e,
            by: x,
            isMe: p,
            sameTab: m,
            kind: f,
            ...(v === null ? {} : { guest: v }),
            p: a.clean,
            ...i,
          }),
            n === void 0 && f === "viewer" && !m && F?.heard(e, d, p, a.clean));
        } else if (a === "room:gone")
          (n === void 0 &&
            (y.delete(d + "\0" + u), b.delete(d + "\0" + u), F?.gone(e)),
            g({ arm: "gone", peer: e, ...i }));
        else {
          let t;
          if (c.d !== void 0) {
            let e = My(c.d, r.maxBytes);
            if (e === null) return;
            t = e.clean;
          }
          g({
            arm: "event",
            peer: e,
            by: x,
            isMe: p,
            sameTab: m,
            kind: f,
            ...(v === null ? {} : { guest: v }),
            topic: a.slice(4),
            d: t,
            ...i,
          });
        }
      }
    });
  }
  let z = _.onEphemeral((e) => be(e)),
    xe = _.onDown(() => {
      (g({ arm: "conn", up: !1 }), (D = !0));
    }),
    Se = _.onTerminal((t) => {
      M === null &&
        ((M = { code: t.code }),
        window.clearTimeout(w),
        (w = 0),
        window.clearTimeout(S),
        (S = 0),
        (C = !1),
        (x = null),
        le(""),
        e.presence?.withdraw(),
        F?.terminal(),
        y.clear(),
        b.clear(),
        _e?.end({
          code: t.code,
          message: "The room channel is no longer available to this view.",
        }),
        g({ arm: "revoked", code: t.code }));
    }),
    Ce = _.onLaneCtrl((e) => {
      e.kind === "ctrl:joined" &&
        (D && ((D = !1), (T = wy), (E = Date.now())),
        de(),
        g({ arm: "conn", up: !0 }),
        x !== null &&
          w === 0 &&
          (w = window.setTimeout(() => {
            ((w = 0), fe());
          }, Math.random() * Ey)));
    });
  _.currentJoined() !== null && (de(), g({ arm: "conn", up: !0 }));
  let we = () => {
      v("room:gone", { n: h });
    },
    Te = () => {
      (we(), _e?.goodbye());
    };
  window.addEventListener("pagehide", Te);
  let Ee = _.onParking(() => {
    (we(), _e?.goodbye(), (k = !1));
  });
  return (t) => {
    ((O = !0),
      (t !== "swap" || u === null) && we(),
      _e?.teardown(),
      window.removeEventListener("message", ye),
      window.removeEventListener("pagehide", Te),
      window.clearTimeout(w),
      (w = 0),
      window.clearTimeout(S),
      (S = 0),
      (C = !1),
      (x = null),
      e.presence?.withdraw(),
      F?.teardown(),
      document.removeEventListener("frame-content-navigated", ne),
      y.clear(),
      b.clear(),
      z(),
      xe(),
      Ee(),
      Ce(),
      Se());
  };
}
function By() {
  let e = new Uint8Array(10);
  crypto.getRandomValues(e);
  let t = 0,
    n = 0,
    r = "";
  for (let i of e)
    for (n = (n << 8) | i, t += 8; t >= 5;)
      ((t -= 5), (r += "abcdefghijklmnopqrstuvwxyz234567"[(n >> t) & 31]));
  return r;
}
function Vy(e) {
  if (typeof e != "object" || !e || Array.isArray(e)) return null;
  let t = e;
  return { guest: t.guest === !0, person: t.kind === "PEER_KIND_PERSON" };
}
var Hy = new Set(["join", "leave", "roomEmit", "roomPresence"]),
  Uy = {
    error: {
      code: "not_permitted",
      message: "named rooms are not available to this page; don't retry",
    },
  };
function Wy(e) {
  return { error: { code: "invalid_argument", message: e } };
}
function Y(e, t) {
  return { code: e, message: t };
}
function Gy(e, t) {
  return t.trim() === "" || e.code === "refused" ? e : { ...e, text: t };
}
var Ky = 125e3,
  qy = 3e4,
  Jy = 295e3,
  Yy = 75e3,
  Xy = 33e4,
  Zy = "text/event-stream, application/json",
  Qy = 4 << 20,
  $y = 9e5,
  eb = 12e3,
  tb = 5e3,
  nb = 262144,
  rb = 2,
  ib = 1,
  ab = 4,
  ob = 7,
  sb = 27e4,
  cb = 1e3,
  lb = /^[A-Za-z0-9_-]{1,128}$/,
  ub = 1024,
  db = 4096,
  fb = 32768,
  pb = 32768,
  mb = { maxCount: 16 },
  hb = new Set(["default", "complex", "quick"]),
  gb = new Set(["low", "medium", "high"]),
  _b = 128,
  vb = ["image/jpeg", "image/png", "image/webp"];
function yb(e) {
  let t = [...e].map((e) =>
    e === "image/webp" ? "WebP" : e.slice(6).toUpperCase(),
  );
  return t.length <= 2
    ? t.join(" or ")
    : `${t.slice(0, -1).join(", ")}, or ${t[t.length - 1]}`;
}
var bb = {
  maxCount: 4,
  maxBytes: 2e6,
  maxTotalBytes: 5e6,
  mediaTypes: new Set(["image/jpeg", "image/png"]),
};
function xb(e) {
  let t = bb,
    n = e?.images;
  if (typeof n != "object" || !n || Array.isArray(n)) return null;
  let r = n,
    i = (e, t, n, r) =>
      typeof e == "number" && Number.isInteger(e) && e >= n && e <= r ? e : t,
    a = Array.isArray(r.mediaTypes)
      ? r.mediaTypes.filter((e) => typeof e == "string")
      : [],
    o = a.filter((e) => vb.includes(e));
  return a.length > 0 && o.length === 0
    ? null
    : {
        maxCount: i(r.maxCount, t.maxCount, 1, 20),
        maxBytes: i(r.maxBytes, t.maxBytes, 1e5, 1e7),
        maxTotalBytes: i(r.maxTotalBytes, t.maxTotalBytes, 1e5, 4e7),
        mediaTypes: o.length > 0 ? new Set(o) : t.mediaTypes,
      };
}
function Sb(e) {
  return e?.models === !0;
}
function Cb(e) {
  let t = e?.tools;
  if (typeof t != "object" || !t || Array.isArray(t)) return null;
  let n = t.maxCount;
  return {
    maxCount:
      typeof n == "number" && Number.isInteger(n) && n >= 1 && n <= 128
        ? n
        : mb.maxCount,
  };
}
function wb(e) {
  return `${Math.round((e / 1e6) * 10) / 10} MB`;
}
function Tb(e) {
  if (e.length === 0 || e.length > cb)
    return {
      error: Y("invalid_request", `a turn list holds 1 to ${cb} turns`),
    };
  let t = [],
    n = new TextEncoder(),
    r = 0;
  for (let i of e) {
    let { role: e, content: a } = typeof i == "object" && i ? i : {};
    if (
      (e !== "user" && e !== "assistant") ||
      typeof a != "string" ||
      a.trim() === ""
    )
      return {
        error: Y(
          "invalid_request",
          "each turn must be {role: user|assistant, content: non-blank text}",
        ),
      };
    if (((r += n.encode(a).length), r > nb))
      return {
        error: Y("prompt_too_large", "the turns exceed the 256 KiB limit"),
      };
    t.push({ role: e, content: a });
  }
  return t[0].role !== "user" || t.at(-1).role !== "user"
    ? {
        error: Y(
          "invalid_request",
          "the turn list must start and end with a user turn",
        ),
      }
    : t;
}
function Eb(e, t) {
  let n = typeof e == "object" && e ? e.tools : void 0;
  if (n == null) return null;
  if (!Array.isArray(n))
    return {
      error: Y(
        "invalid_request",
        "tools must be an array of {name, description, inputSchema?, execute}, not an object keyed by name",
      ),
    };
  if (n.length === 0) return null;
  if (t === null)
    return { error: Y("tools_unavailable", "this view cannot run page tools") };
  if (n.length > t.maxCount)
    return {
      error: Y(
        "invalid_request",
        `at most ${t.maxCount} tools per call (got ${n.length})`,
      ),
    };
  let r = new TextEncoder(),
    i = new Set(),
    a = [];
  for (let [e, t] of n.entries()) {
    let n = typeof t == "object" && t && !Array.isArray(t) ? t.name : void 0,
      o = `tools[${e}]${typeof n == "string" ? ` (${n.slice(0, 128)})` : ""}`,
      s = (e) => ({ error: Y("invalid_request", `${o}: ${e}`) });
    if (typeof t != "object" || !t || Array.isArray(t))
      return s("each tool is a plain object");
    let { description: c, inputSchema: l } = t;
    if (typeof n != "string" || !lb.test(n))
      return s("name is 1-128 of A-Z a-z 0-9 _ -");
    if (i.has(n)) return s("duplicate name");
    if (
      (i.add(n),
      typeof c != "string" || c.trim() === "" || r.encode(c).length > ub)
    )
      return s("description is required text of at most 1 KB");
    let u = { type: "object", properties: {} };
    if (l != null) {
      if (typeof l != "object" || Array.isArray(l) || l.type !== "object")
        return s('inputSchema is a JSON Schema object with type "object"');
      let e;
      try {
        e = JSON.stringify(l);
      } catch {
        e = void 0;
      }
      if (e === void 0) return s("inputSchema must be plain JSON data");
      if (r.encode(e).length > db) return s("inputSchema is at most 4 KB");
      u = JSON.parse(e);
    }
    a.push({ name: n, description: c, inputSchema: u });
  }
  return r.encode(JSON.stringify(a)).length > fb
    ? {
        error: Y(
          "invalid_request",
          "the tool definitions together are at most 32 KB",
        ),
      }
    : a;
}
function Db(e, t = bb, n = null, r = !1) {
  let i = e[0],
    a = e[1],
    o;
  if (Array.isArray(i)) {
    let e = Tb(i);
    if ("error" in e) return e;
    o = { input: e };
  } else if (typeof i != "string" || i.trim() === "")
    return {
      error: Y(
        "invalid_request",
        "input must be a non-empty prompt string or a turn list",
      ),
    };
  else if (new TextEncoder().encode(i).length > nb)
    return { error: Y("prompt_too_large", "prompt exceeds the 256 KiB limit") };
  else o = { input: i };
  if (a != null) {
    if (typeof a != "string" || !hb.has(a))
      return {
        error: Y(
          "invalid_request",
          "modelTier must be default, complex, or quick",
        ),
      };
    o.modelTier = a;
  }
  r && Object.assign(o, Ob(e[2]));
  let s = jb(e[2], t);
  if (s && "error" in s) return s;
  s && (o.images = s.images);
  let c = e[2];
  typeof c == "object" && c && c.format === "json" && (o.format = "json");
  let l = Eb(c, n);
  if (l && "error" in l) return l;
  if (l) {
    let e = c.cache;
    if (e !== void 0 && e !== !1)
      return {
        error: Y(
          "invalid_request",
          "calls with tools are never cached \u2014 remove cache",
        ),
      };
    o.tools = l;
  }
  return o;
}
function Ob(e) {
  if (typeof e != "object" || !e) return {};
  let { model: t, effort: n } = e,
    r = {};
  return (
    typeof n == "string" && gb.has(n) && (r.effort = n),
    typeof t == "string" && t !== "" && t.length <= _b && (r.model = t),
    r
  );
}
function kb(e, t) {
  let n = [],
    r = 0;
  for (; n.length < t;) {
    let t = e.indexOf("```", r),
      i =
        t < 0
          ? -1
          : e.indexOf(
              `
`,
              t + 3,
            ),
      a = i < 0 ? -1 : e.indexOf("```", i + 1);
    if (a < 0) return n;
    (n.push(e.slice(i + 1, a)), (r = a + 3));
  }
  return n;
}
function Ab(e, t) {
  let n = (t) => ({ error: { code: "invalid_json", message: t, text: e } });
  if (t) return n("the reply was cut short before the JSON was complete");
  let r = (e) => {
      try {
        return { value: JSON.parse(e) };
      } catch {
        return null;
      }
    },
    i = r(e);
  if (i) return i;
  let a = kb(e, 2);
  if (a.length === 1) {
    let e = r(a[0]);
    if (e) return e;
  }
  let o = e.search(/[[{]/),
    s = Math.max(e.lastIndexOf("}"), e.lastIndexOf("]"));
  return (
    (o >= 0 && s > o ? r(e.slice(o, s + 1)) : null) ??
    n("the reply held no JSON value")
  );
}
function jb(e, t) {
  if (e == null) return null;
  if (typeof e != "object" || Array.isArray(e))
    return { error: Y("invalid_request", "options must be an object") };
  let n = e.images;
  if (n == null) return null;
  if (!Array.isArray(n))
    return { error: Y("invalid_request", "images must be an array") };
  if (n.length === 0) return null;
  if (!t)
    return {
      error: Y(
        "images_unavailable",
        "image input is not available in this view",
      ),
    };
  if (n.length > t.maxCount)
    return {
      error: Y("image_rejected", `at most ${t.maxCount} images per call`),
    };
  let r = 0;
  for (let e of n) {
    if (!(e instanceof Blob))
      return { error: Y("invalid_request", "images must be Blobs") };
    if (!t.mediaTypes.has(e.type))
      return {
        error: Y("image_rejected", `images must be ${yb(t.mediaTypes)}`),
      };
    if (e.size === 0)
      return { error: Y("image_rejected", "an image is empty") };
    if (e.size > t.maxBytes)
      return {
        error: Y("image_rejected", `each image is capped at ${wb(t.maxBytes)}`),
      };
    r += e.size;
  }
  return r > t.maxTotalBytes
    ? {
        error: Y(
          "image_rejected",
          `images are capped at ${wb(t.maxTotalBytes)} in total`,
        ),
      }
    : { images: n };
}
function Mb(e) {
  if (e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255)
    return "image/jpeg";
  let t = (t, n) => {
    if (e.length < t + n.length) return !1;
    for (let r = 0; r < n.length; r++)
      if (e[t + r] !== n.charCodeAt(r)) return !1;
    return !0;
  };
  return e[0] === 137 &&
    t(
      1,
      `PNG\r

`,
    )
    ? "image/png"
    : t(0, "RIFF") && t(8, "WEBP")
      ? "image/webp"
      : null;
}
async function Nb(e) {
  let t = [];
  for (let n of e) {
    let e = new Uint8Array(await n.arrayBuffer());
    if (Mb(e) !== n.type)
      return {
        error: Y(
          "image_rejected",
          "an image's bytes do not match its declared type",
        ),
      };
    let r = "";
    for (let t = 0; t < e.length; t += 32768)
      r += String.fromCharCode(...e.subarray(t, t + 32768));
    t.push({ mediaType: n.type, data: btoa(r) });
  }
  return t;
}
function Pb(e, t, n = !1, r = bb, i = null, a = !1) {
  let o = Bb(t),
    s = Lb(t);
  switch (o) {
    case "bad_request":
      if (e === 408)
        return Y(
          "upstream_error",
          "sending the request took too long \u2014 try again",
        );
      if (i) {
        if (s === "tools_invalid")
          return Y("invalid_request", Rb(t) ?? "a tool definition was refused");
        if (s === "upstream_bad_request" && !i.continuation)
          return Y(
            "invalid_request",
            "Claude did not accept this request \u2014 check each tool's inputSchema is valid JSON Schema",
          );
        if (i.continuation || s === "steps_invalid")
          return Y(
            "upstream_error",
            "the tool round could not be continued \u2014 try again",
          );
      }
      break;
    case "tools_unavailable":
      return i?.continuation
        ? Y(
            "upstream_error",
            "page tools were turned off for this view mid-call",
          )
        : Y("tools_unavailable", "this view cannot run page tools");
    case "prompt_too_large":
      if (s === "steps_too_large" && n && !i?.continuation)
        return Y(
          "images_unavailable",
          "image input is not available in this view",
        );
      if (s === "steps_too_large" || i?.continuation)
        return Y(
          "prompt_too_large",
          "this call's tool rounds outgrew what Claude can read at once \u2014 return less per tool",
        );
      break;
    case "consent_required":
      if (n && a)
        return Y(
          "images_unavailable",
          "the viewer's permission does not cover images in this view",
        );
      break;
    case "images_unavailable":
      if (s === "images_not_declared")
        return Y(
          "images_unavailable",
          "this artifact does not declare image input \u2014 declare capabilities.sample.images: true in its manifest and publish it again",
        );
      break;
    case "image_rejected":
      return Y("image_rejected", Ib(Lb(t), r ?? bb));
  }
  return (
    Fb(o, s) ||
    (e === 429
      ? Y("rate_limited", "sampling too often \u2014 try again later")
      : Y("upstream_error", `request failed (${e})`))
  );
}
function Fb(e, t) {
  switch (e) {
    case "bad_request":
      return Y("invalid_request", "the request was malformed");
    case "prompt_too_large":
      return Y("prompt_too_large", "prompt exceeds the 256 KiB limit");
    case "images_unavailable":
      return Y(
        "images_unavailable",
        "image input is not available in this view",
      );
    case "session_expired":
      return Y(
        "session_expired",
        "your session has expired \u2014 sign in again",
      );
    case "sampling_disabled":
    case "not_found":
    case "no_seat":
      return Y(
        "sampling_disabled",
        "Claude isn't available for your account or organization",
      );
    case "sampling_not_declared":
      return Y(
        "not_declared",
        "this artifact no longer declares Claude access",
      );
    case "rate_limited":
      return Y(
        "rate_limited",
        t === "usage_limit"
          ? "Claude usage limit reached \u2014 try again after it resets"
          : "sampling too often \u2014 try again later",
      );
    case "tools_unavailable":
      return Y("tools_unavailable", "this view cannot run page tools");
    case "empty_completion":
      return Y(
        "empty_completion",
        "Claude returned no text for this prompt \u2014 shorten or simplify it, or ask for less",
      );
    case "refused":
      return Y(
        "refused",
        "Claude declined to answer this prompt \u2014 change what it asks for",
      );
    case "forbidden":
    case "consent_denied":
    case "consent_required":
      return Y("not_granted", "Claude access isn't enabled for this artifact");
    case "invalid_token":
      return Y(
        "upstream_error",
        "the session could not be refreshed \u2014 reload to retry",
      );
    case "capdecl_unavailable":
    case "consent_unavailable":
    case "upstream_error":
      return Y(
        "upstream_error",
        "sampling is unavailable right now \u2014 try again",
      );
    default:
      return null;
  }
}
function Ib(e, t) {
  switch (e) {
    case "images_count":
      return `at most ${t.maxCount} images per call`;
    case "image_media_type":
      return `images must be ${yb(t.mediaTypes)}`;
    case "image_empty":
      return "an image is empty";
    case "image_base64":
      return "an image was not encoded correctly";
    case "image_too_large":
      return `each image is capped at ${wb(t.maxBytes)}`;
    case "images_total_too_large":
    case "body_too_large_images":
      return `images are capped at ${wb(t.maxTotalBytes)} in total`;
    case "image_type_mismatch":
      return "an image's bytes do not match its declared type";
    case "image_header":
      return "an image's header could not be read \u2014 try a different file";
    case "image_dimensions":
      return "an image is larger than 1568 px on a side or about 1.2 megapixels \u2014 downsize it";
    default:
      return "an image broke the count, size, or type limits";
  }
}
function Lb(e) {
  try {
    let t = JSON.parse(e);
    return t && t.error && typeof t.error.reason == "string"
      ? t.error.reason
      : null;
  } catch {
    return null;
  }
}
function Rb(e) {
  try {
    let t = JSON.parse(e);
    return t && t.error && typeof t.error.message == "string"
      ? t.error.message.slice(0, 300)
      : null;
  } catch {
    return null;
  }
}
function zb(e) {
  try {
    let t = JSON.parse(e.text)?.error;
    return (
      e.status === 400 && t?.code === "bad_request" && t.message === "bad json"
    );
  } catch {
    return !1;
  }
}
function Bb(e) {
  try {
    let t = JSON.parse(e);
    return t && t.error && typeof t.error.code == "string"
      ? t.error.code
      : null;
  } catch {
    return null;
  }
}
function Vb(e) {
  let t = typeof e == "object" && e ? e.cache : void 0;
  return t === void 0 || t === !0
    ? { gcTimeMs: Xh, staleTimeMs: 0, refresh: !1 }
    : t === !1
      ? null
      : ig(e);
}
function Hb(e, t) {
  if (typeof e != "object" || !e || Array.isArray(e)) return null;
  let { text: n, modelTierApplied: r, modelApplied: i, truncated: a } = e;
  return typeof n != "string" ||
    n.trim() === "" ||
    typeof r != "string" ||
    !hb.has(r) ||
    typeof a != "boolean"
    ? null
    : {
        text: n,
        truncated: a,
        modelTierApplied: r,
        ...(t !== void 0 && i === t && { modelApplied: i }),
        ...("value" in e && { value: e.value }),
      };
}
async function Ub(e, t, n) {
  try {
    let r;
    if (n.images) {
      r = [];
      for (let e of n.images) {
        let t = await lg(await e.arrayBuffer());
        if (t === null) return null;
        r.push(t);
      }
    }
    let i = await cg(
      JSON.stringify({
        kind: "sample",
        slug: t,
        ...(typeof n.input == "string"
          ? { prompt: n.input }
          : { messages: n.input }),
        modelTier: n.modelTier ?? "default",
        ...(n.model && { model: n.model }),
        ...(n.effort && { effort: n.effort }),
        ...(r && { images: r }),
        ...(n.format && { format: n.format }),
      }),
    );
    return i === null ? null : e + i;
  } catch {
    return null;
  }
}
function Wb(e, t) {
  e.text += t.text;
  for (let n of e.subs)
    try {
      n(t);
    } catch {}
}
var Gb = 64;
function Kb(e) {
  let t = 0,
    n = 0,
    r = e.length,
    i = (t) => {
      let n = t + 1;
      for (; n < r;) {
        let t = e[n];
        if (t === "\\") {
          n += 2;
          continue;
        }
        if (t === '"') return n + 1;
        n += 1;
      }
      return -1;
    },
    a = (t) => {
      let n = t,
        a = 0;
      for (; n < r;) {
        let t = e[n];
        if (t === '"') {
          if (((n = i(n)), n < 0)) return -1;
          if (a === 0) return n;
          continue;
        }
        if (t === "{" || t === "[") a += 1;
        else if (t === "}" || t === "]") {
          if ((--a, a === 0)) return n + 1;
          if (a < 0) return n;
        } else if (a === 0 && (t === "," || t === "}")) return n;
        n += 1;
      }
      return a === 0 ? n : -1;
    };
  for (; n < r;) {
    let o = e[n];
    if (o === '"') {
      let o = i(n);
      if (o < 0) return null;
      if (t === 1) {
        let t = e.slice(n, o),
          i = o;
        for (; i < r && /\s/.test(e[i]);) i += 1;
        if (e[i] === ":") {
          for (i += 1; i < r && /\s/.test(e[i]);) i += 1;
          let o = a(i);
          if (o < 0) return null;
          if (t === '"content"') return e.slice(i, o).trim();
          n = o;
          continue;
        }
      }
      n = o;
      continue;
    }
    (o === "{" || o === "[" ? (t += 1) : (o === "}" || o === "]") && --t,
      (n += 1));
  }
  return null;
}
var qb = new Set(["thinking", "redacted_thinking", "text", "tool_use"]);
function Jb(e) {
  if (e === null) return null;
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return null;
  }
  if (!Array.isArray(t)) return null;
  let n = [],
    r = new Set();
  for (let e of t) {
    if (typeof e != "object" || !e || Array.isArray(e)) return null;
    let t = e;
    if (!qb.has(t.type)) return null;
    if (t.type === "tool_use") {
      if (
        typeof t.id != "string" ||
        r.has(t.id) ||
        typeof t.name != "string" ||
        t.input === null ||
        typeof t.input != "object" ||
        Array.isArray(t.input)
      )
        return null;
      (r.add(t.id), n.push({ id: t.id, name: t.name, input: t.input }));
    }
  }
  return n.length > 0 && n.length <= Gb ? { raw: e, calls: n } : null;
}
function Yb(e, t) {
  if (!Array.isArray(e) || e.length !== t.size) return null;
  let n = [],
    r = new Set();
  for (let i of e) {
    let { id: e, content: a, isError: o } = typeof i == "object" && i ? i : {};
    if (typeof e != "string" || !t.has(e) || r.has(e) || typeof a != "string")
      return null;
    if ((r.add(e), new TextEncoder().encode(a).length > pb))
      return {
        error: Y(
          "upstream_error",
          "a tool result was larger than the page runtime may send",
        ),
      };
    n.push({ id: e, content: a, ...(o === !0 && { isError: !0 }) });
  }
  return n;
}
function Xb(e, t) {
  if (t.length === 0) return e;
  let n = t.map(
    (e) =>
      `{"assistant":${e.assistant},"results":${JSON.stringify(e.results)}}`,
  );
  return `${e.slice(0, -1)},"steps":[${n.join(",")}]}`;
}
function Zb(e) {
  return (e ?? "").trim().toLowerCase().startsWith("text/event-stream");
}
function Qb(e) {
  let t = e && typeof e == "object" ? e : null;
  return (
    Fb(
      t && "code" in t && typeof t.code == "string" ? t.code : null,
      t && "reason" in t && typeof t.reason == "string" ? t.reason : null,
    ) ??
    Y("upstream_error", "sampling is unavailable right now \u2014 try again")
  );
}
function $b(e, t, n) {
  return new Promise((r) => {
    let i = e.getReader(),
      a = new TextDecoder(),
      o = {},
      s = "",
      c = [],
      l = 0,
      u = "default",
      d = !1,
      f,
      p = "",
      m = !1,
      h = (e) => {
        if (!(!n.progress || m))
          try {
            n.progress(e);
          } catch {}
      },
      g = (e) => {
        if (m) return;
        m = !0;
        let n = "error" in e ? { error: Gy(e.error, p) } : e;
        (clearTimeout(o.idle), clearTimeout(o.cap));
        try {
          t();
        } catch {}
        (i.cancel().catch(() => {}), r(n));
      },
      _ = (e) => {
        g({ error: Y("upstream_error", e) });
      },
      v = () => {
        (clearTimeout(o.idle),
          (o.idle = setTimeout(() => {
            _("the connection went quiet \u2014 try again");
          }, n.idleMs)));
      };
    ((o.cap = setTimeout(
      () => {
        _("took too long \u2014 try again");
      },
      Math.max(0, n.capMs),
    )),
      v());
    let y = (e) => {
        let t;
        try {
          t = JSON.parse(e);
        } catch {
          _("malformed stream");
          return;
        }
        if (!t || typeof t != "object") {
          _("malformed stream");
          return;
        }
        let r = t;
        switch (r.type) {
          case "start":
            !d &&
              typeof r.modelTierApplied == "string" &&
              hb.has(r.modelTierApplied) &&
              ((u = r.modelTierApplied),
              (d = !0),
              n.model !== void 0 &&
                r.modelApplied === n.model &&
                (f = r.modelApplied));
            return;
          case "text":
            if (typeof r.text != "string" || r.text === "") return;
            if (p.length + r.text.length > Qy) {
              _("malformed stream");
              return;
            }
            ((p += r.text), h({ type: "text", text: r.text }));
            return;
          case "done":
            g(
              p.trim() === "" && !n.continuation
                ? { error: Qb({ code: "empty_completion" }) }
                : {
                    result: {
                      text: p,
                      truncated: r.truncated === !0,
                      modelTierApplied: u,
                      ...(f !== void 0 && { modelApplied: f }),
                    },
                  },
            );
            return;
          case "tool_use": {
            let t = Jb(Kb(e));
            if (!t) {
              _("malformed stream");
              return;
            }
            g({ toolUse: t });
            return;
          }
          case "error":
            g({ error: Qb(r.error) });
            return;
          default:
            return;
        }
      },
      b = (e) => {
        if (e === "") {
          let e = c.join(`
`);
          ((c = []), (l = 0), e !== "" && y(e));
          return;
        }
        if (e.startsWith(":")) return;
        let t = e.indexOf(":");
        if ((t < 0 ? e : e.slice(0, t)) !== "data") return;
        let n = t < 0 ? "" : e.slice(t + 1);
        (c.push(n.startsWith(" ") ? n.slice(1) : n),
          (l += n.length + 1),
          l > Qy && _("malformed stream"));
      },
      x = (e) => {
        (v(), (s += a.decode(e, { stream: !0 })));
        let t = s.indexOf(`
`);
        for (; t >= 0 && !m;) {
          let e = s.slice(0, t);
          ((s = s.slice(t + 1)),
            b(e.endsWith("\r") ? e.slice(0, -1) : e),
            (t = s.indexOf(`
`)));
        }
        s.length > Qy && _("malformed stream");
      },
      S = () => {
        i.read().then(
          ({ done: e, value: t }) => {
            if (!m) {
              if (e) {
                _("the response ended early \u2014 try again");
                return;
              }
              try {
                x(t);
              } catch {
                _("malformed stream");
              }
              m || S();
            }
          },
          () => {
            _("the connection was lost \u2014 try again");
          },
        );
      };
    S();
  });
}
function ex() {
  return {
    calls: new Map(),
    toolsRefused: !1,
    flights: new Map(),
    storeOwner: new Map(),
    storeSeq: 0,
    running: 0,
    imageUploads: 0,
    waiting: [],
  };
}
function tx(e, t, n, r, i, a, o, s = bb, c = ex(), l = null, u = !1) {
  let { frameOrigin: d, frameUuid: f } = e,
    { calls: p, flights: m, storeOwner: h, waiting: g } = c,
    _ = () => {
      for (let e = 0; e < g.length && c.running < rb;) {
        let t = g[e];
        if (t.images && c.imageUploads >= ib) {
          e += 1;
          continue;
        }
        (g.splice(e, 1), t.start());
      }
    },
    v = Date.now(),
    y = (y) => {
      if (
        !t.isConnected ||
        !a() ||
        y.origin !== d ||
        !t.contentWindow ||
        y.source !== t.contentWindow
      )
        return;
      let b = _e(y.data, "sample");
      if (!b) return;
      if (b.method === "cancelCall") {
        let [e] = b.args;
        typeof e == "string" && p.get(e)?.cancel();
        return;
      }
      if (b.method === "toolResults") {
        let [e, t] = b.args;
        typeof e == "string" && p.get(e)?.toolResults(t);
        return;
      }
      let x = () => void 0,
        S = !1,
        C = new Set(),
        w = !1,
        T = null,
        E = null,
        D = () => void 0,
        O = null,
        k = null,
        A = () => {
          (p.get(b.id) === O && p.delete(b.id), D());
        },
        j = () => {
          ((w = !0), T?.unlist());
          for (let e of C) (e.abort(), o.delete(e));
          C.clear();
        },
        M = () => {
          if (
            (p.get(b.id) === O && p.delete(b.id),
            (S = !0),
            E?.(),
            (E = null),
            k?.quit(),
            T && T.joiners > 0 && C.size > 0)
          ) {
            T.abandon = () => {
              (j(), x(), A());
            };
            return;
          }
          (j(), x(), A());
        },
        ee = null,
        te = performance.now(),
        N = (n) => {
          let r = k && "error" in n ? Se(n) : n;
          (x(), A(), k?.quit());
          let i = ee;
          ((ee = null),
            i?.(w ? null : r),
            !(S || !a()) &&
              (t.contentWindow?.postMessage(ye(b.id, r), d),
              e.noteCapOutcome?.(
                b.cap,
                b.method,
                "error" in r ? r.error.code : null,
                t,
                performance.now() - te,
              )));
        },
        P = (e) => {
          let t = ee;
          ((ee = null), t?.(null), N(e));
        };
      if (b.method !== "sample") {
        N({ error: Y("upstream_error", `unknown method ${b.method}`) });
        return;
      }
      let F = Db(b.args, s, c.toolsRefused ? null : l, u);
      if ("error" in F) {
        N(F);
        return;
      }
      let ne = F.tools ? null : Vb(b.args[2]),
        re = (e) => {
          ke() ||
            t.contentWindow?.postMessage(
              Ce(b.id, { type: "text", text: e.text }),
              d,
            );
        },
        ie = (e) => {
          (re(e), T && Wb(T, e));
        };
      (F.tools &&
        (k = {
          steps: [],
          ids: new Set(),
          pending: null,
          outstanding: null,
          text: "",
          stepTextStart: 0,
          accept: () => void 0,
          quit: () => void 0,
        }),
        (O = {
          cancel: M,
          toolResults: (e) => {
            k?.accept(e);
          },
        }),
        p.set(b.id, O));
      let I =
          ne !== null && globalThis.crypto?.subtle
            ? ag(e.org, n.account ?? "", f)
            : null,
        ae = Fg(),
        oe = r.gesture?.(y) ?? !1,
        se = Date.now(),
        ce = r.wouldPrompt(oe);
      ce && t.contentWindow?.postMessage(De(b.id), d);
      let le = Date.now(),
        ue = ce ? i.hold : i.reply,
        de = !1,
        fe = !1,
        pe = !1,
        me = () => {
          ((le = Date.now()),
            (ue = i.hold),
            ke() || t.contentWindow?.postMessage(De(b.id), d));
          for (let e of T?.holds ?? []) e();
          if (fe) for (let e of g) e.hold();
        },
        he = e.org ? `?org=${encodeURIComponent(e.org)}` : "",
        ge,
        L = !0,
        R = Symbol("own window"),
        ve = (t) => {
          let r = new AbortController(),
            i = Date.now();
          (o.add(r), C.add(r));
          let a = Ee(),
            s = !1,
            c = setTimeout(
              () => {
                ((s = a < t), r.abort());
              },
              Math.min(t, a),
            ),
            l = () => {
              (clearTimeout(c), o.delete(r), C.delete(r));
            };
          return fetch(`/api/frame/sample/call${he}`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Accept: Zy,
              ...e.cpHeaders,
            },
            body: Xb(
              JSON.stringify({
                slug: f,
                token: n.value,
                ...(typeof F.input == "string"
                  ? { prompt: F.input }
                  : { messages: F.input }),
                ...(F.modelTier ? { modelTier: F.modelTier } : {}),
                ...(L && F.model ? { model: F.model } : {}),
                ...(L && F.effort ? { effort: F.effort } : {}),
                ...(ge ? { images: ge } : {}),
                ...(F.format ? { format: F.format } : {}),
                ...(F.tools ? { tools: F.tools } : {}),
              }),
              k?.steps ?? [],
            ),
            signal: r.signal,
          }).then(
            async (e) => {
              if (e.ok && e.body && Zb(e.headers.get("Content-Type")))
                return (
                  clearTimeout(c),
                  {
                    stream: e.body,
                    startedAt: i,
                    abort: () => {
                      (r.abort(), o.delete(r), C.delete(r));
                    },
                  }
                );
              try {
                return { status: e.status, ok: e.ok, text: await e.text() };
              } catch (e) {
                throw s ? R : e;
              } finally {
                l();
              }
            },
            (e) => {
              throw (l(), s ? R : e);
            },
          );
        },
        be = (e) => (
          k || (ge = void 0),
          x(),
          $b(e.stream, e.abort, {
            idleMs: Yy,
            capMs: Jy - (Date.now() - e.startedAt),
            progress: k ? xe : ie,
            continuation: k !== null && k.steps.length > 0,
            ...(L && F.model && { model: F.model }),
          }).then((e) => {
            if (!("toolUse" in e)) {
              N(we(Se(e)));
              return;
            }
            if (!k) {
              N({
                error: Y(
                  "upstream_error",
                  "Claude asked for tools this call did not offer",
                ),
              });
              return;
            }
            let n = k;
            if (n.steps.length >= ob) {
              N({
                error: Y("upstream_error", "too many tool rounds for one call"),
              });
              return;
            }
            if (e.toolUse.calls.some((e) => n.ids.has(e.id))) {
              N({ error: Y("upstream_error", "malformed stream") });
              return;
            }
            for (let t of e.toolUse.calls) n.ids.add(t.id);
            if (
              ((z = !1),
              (n.pending = e.toolUse.raw),
              (n.outstanding = new Set(e.toolUse.calls.map((e) => e.id))),
              ke())
            ) {
              A();
              return;
            }
            t.contentWindow?.postMessage(
              Ce(b.id, { type: "tool_use", calls: e.toolUse.calls }),
              d,
            );
            for (let e of g) e.hold();
            return new Promise((e) => {
              let t = setTimeout(() => {
                  N({
                    error: Y(
                      "upstream_error",
                      "the page's tool results never arrived",
                    ),
                  });
                }, sb),
                r = () => {
                  (clearTimeout(t),
                    (n.accept = () => void 0),
                    (n.quit = () => void 0),
                    (n.outstanding = null),
                    (n.pending = null));
                };
              ((n.quit = () => {
                (r(), e());
              }),
                (n.accept = (t) => {
                  let { outstanding: a, pending: o } = n;
                  if (!a || !o) return;
                  let s = Yb(t, a);
                  if (s !== null) {
                    if ((r(), "error" in s)) {
                      (N(s), e());
                      return;
                    }
                    (n.steps.push({ assistant: o, results: s }),
                      (le = Date.now()),
                      (ue = i.reply),
                      e(Ae(!0)));
                  }
                }));
            });
          })
        ),
        z = !1,
        xe = (e) => {
          if (!k) return;
          let t = e.text;
          if (!z && k.steps.length === 0) ((z = !0), (k.stepTextStart = 0));
          else if (!z) {
            if (t.trim() === "") return;
            z = !0;
            let e =
              k.text.trim() === "" ||
              k.text.endsWith(`

`)
                ? ""
                : k.text.endsWith(`
`)
                  ? `
`
                  : `

`;
            ((k.stepTextStart = k.text.length + e.length),
              (t = e + t.trimStart()));
          }
          ((k.text += t), ie({ type: "text", text: t }));
        },
        Se = (e) => {
          if (!k) return e;
          if ("error" in e) {
            let { text: t, ...n } = e.error,
              r = n;
            return (
              r.code === "tools_unavailable" &&
                ((c.toolsRefused = !0),
                k.steps.length > 0 &&
                  (r = Y(
                    "upstream_error",
                    "page tools were turned off for this view mid-call",
                  ))),
              {
                error:
                  r.code === "refused" || k.text.trim() === ""
                    ? r
                    : { ...r, text: k.text },
              }
            );
          }
          let t = e.result;
          return k.text.trim() === ""
            ? { error: Qb({ code: "empty_completion" }) }
            : {
                result: {
                  text: k.text,
                  truncated: t.truncated,
                  modelTierApplied: t.modelTierApplied,
                  ...(t.modelApplied !== void 0 && {
                    modelApplied: t.modelApplied,
                  }),
                },
              };
        },
        we = (e) => {
          if (F.format !== "json" || !("result" in e)) return e;
          let t = e.result,
            n = Ab(
              k && z ? t.text.slice(k.stepTextStart) : k ? "" : t.text,
              t.truncated,
            );
          return "error" in n
            ? { error: { ...n.error, text: t.text } }
            : { result: { ...t, value: n.value } };
        },
        Te = (t) => {
          let n = t.ok
            ? Y(
                "upstream_error",
                "sampling is unavailable right now \u2014 try again",
              )
            : Pb(
                t.status,
                t.text,
                ge !== void 0,
                s,
                k ? { continuation: k.steps.length > 0 } : null,
                pe,
              );
          (!t.ok && Bb(t.text) === "tools_unavailable" && (c.toolsRefused = !0),
            !t.ok &&
              Bb(t.text) === "no_seat" &&
              !ke() &&
              !e.decisionSurfaceOpen() &&
              e.chrome()?.showNoSeatDialog?.({ from: "page" }),
            N({ error: n }));
        },
        Ee = () => ue - (Date.now() - le) - i.slack,
        Oe = () => {
          P({
            error: Y(
              "upstream_error",
              "took too long to start \u2014 try again",
            ),
          });
        },
        ke = () => S || !t.isConnected || !a(),
        Ae = (t) => {
          if (ke()) return (x(), A(), Promise.resolve());
          if (Ee() <= eb) return (Oe(), Promise.resolve());
          let i = n.value,
            a = (o, s) => {
              if (s && o.status === 403 && Bb(o.text) === "invalid_token")
                return (
                  me(),
                  e.requestReboot().then(() => {
                    if (ke()) {
                      (x(), A());
                      return;
                    }
                    if (n.value === i) {
                      Te(o);
                      return;
                    }
                    if (Ee() <= eb) {
                      Oe();
                      return;
                    }
                    return ve(qy).then((e) =>
                      "stream" in e ? be(e) : a(e, !1),
                    );
                  })
                );
              if (o.status === 403 && Bb(o.text) === "consent_required" && t) {
                (me(), (pe = r.refused?.(F.images !== void 0) === !0));
                let e = Date.now() - se < tb,
                  t = oe === "press" ? "activation" : oe;
                return r.decide(e ? t : !1, se).then((e) => {
                  if (e !== "granted") {
                    N({
                      error:
                        e === "denied"
                          ? Y(
                              "not_granted",
                              "the viewer has not allowed Claude access",
                            )
                          : Y(
                              "upstream_error",
                              "Claude access isn't confirmed for this artifact right now",
                            ),
                    });
                    return;
                  }
                  return (me(), Ae(!1));
                });
              }
              if (L && (F.model || F.effort) && zb(o)) {
                if (((L = !1), ke())) {
                  (x(), A());
                  return;
                }
                if (Ee() <= eb) {
                  Oe();
                  return;
                }
                return ve(Ky).then((e) => ("stream" in e ? be(e) : a(e, s)));
              }
              Te(o);
            };
          return ve(Ky)
            .then((e) => ("stream" in e ? be(e) : a(e, !0)))
            .catch((e) => {
              if (e !== R) throw e;
              Oe();
            });
        },
        je = () =>
          new Promise((e) => {
            if (ke()) {
              (x(), A(), e(!1));
              return;
            }
            let n = F.images !== void 0,
              r = (t) => {
                ((c.running += 1),
                  (fe = !0),
                  (D = () => {
                    ((D = () => void 0), (fe = !1), --c.running, _());
                  }),
                  n &&
                    ((c.imageUploads += 1),
                    (x = () => {
                      ((x = () => void 0), --c.imageUploads, _());
                    })),
                  (ce || t || de) && me(),
                  e(!0));
              };
            if (c.running < rb && !(n && c.imageUploads >= ib)) {
              r(!1);
              return;
            }
            if (g.length >= ab) {
              (P({
                error: Y(
                  "rate_limited",
                  "too many sample calls at once from this page \u2014 let some finish",
                ),
              }),
                e(!1));
              return;
            }
            let i = {
              images: n,
              start: () => r(!0),
              hold: () => {
                ke() || t.contentWindow?.postMessage(De(b.id), d);
                for (let e of T?.holds ?? []) e();
              },
            };
            g.push(i);
            for (let e of T?.holds ?? []) e();
            ((D = () => {
              D = () => void 0;
              let t = g.indexOf(i);
              (t >= 0 && g.splice(t, 1), e(!1));
            }),
              ke() || t.contentWindow?.postMessage(De(b.id), d));
          }),
        Me = () => (fe ? Ne() : je().then((e) => (e ? Ne() : void 0))),
        Ne = () =>
          !F.images || ke()
            ? Ae(!0)
            : Nb(F.images).then((e) => {
                if ("error" in e) {
                  N(e);
                  return;
                }
                return ((ge = e), Ae(!0));
              }),
        Pe = (e) => {
          ((e.joiners += 1), (de = !0), x(), D());
          let n = !1,
            r = () => {
              n ||
                ((n = !0),
                e.subs.delete(re),
                --e.joiners,
                e.joiners === 0 && e.abandon?.());
            };
          E = r;
          let i = () => {
            ke() || t.contentWindow?.postMessage(De(b.id), d);
          };
          return (
            i(),
            e.holds.add(i),
            e.text !== "" && re({ type: "text", text: e.text }),
            e.subs.add(re),
            e.reply.finally(() => {
              ((E = null), e.holds.delete(i), r());
            })
          );
        },
        Fe = async (e, t) => {
          let n = await Ub(e, f, F);
          if (ke()) {
            (x(), A());
            return;
          }
          if (n === null) return Me();
          for (let e = m.get(n); e && !t.refresh;) {
            let t = await Pe(e);
            if (t !== null) {
              N(t);
              return;
            }
            if (ke()) {
              (x(), A());
              return;
            }
            let r = m.get(n);
            if (r === e) break;
            e = r;
          }
          let r,
            i = {
              reply: new Promise((e) => {
                r = e;
              }),
              holds: new Set(),
              text: "",
              subs: new Set(),
              joiners: 0,
              abandon: null,
              unlist: () => {
                m.get(n) === i && m.delete(n);
              },
            };
          ((T = i), m.set(n, i));
          let a = ++c.storeSeq;
          h.set(n, a);
          let o = (e) => {
              (i.unlist(),
                h.get(n) === a && h.delete(n),
                i.subs.clear(),
                i.holds.clear(),
                (i.abandon = null),
                r(e));
            },
            s = !1;
          ee = (e) => {
            let r = h.get(n) === a;
            if (
              (o(e),
              e === null || !r || s || !("result" in e) || ae !== Fg() || !L)
            )
              return;
            let i = Hb(e.result, F.model);
            i &&
              Mg(n, i, {
                kind: "sample",
                server: "",
                tool: "",
                inputHash: "",
                gcTimeMs: t.gcTimeMs,
                dispatchedAt: le,
                mountedAt: v,
              });
          };
          try {
            if (!t.refresh) {
              let e = await Og(n, "sample").catch(() => null),
                r =
                  e &&
                  Date.now() - e.createdAt <= t.gcTimeMs &&
                  ae === Fg() &&
                  !ke()
                    ? Hb(e.result, F.model)
                    : null;
              if (r) {
                ((s = !0), P({ result: r }));
                return;
              }
            }
            await Me();
          } catch {
            N({ error: Y("upstream_error", "request failed") });
          } finally {
            o(null);
          }
        };
      r.decide(oe)
        .then((e) => {
          if (e !== "granted") {
            N({
              error:
                e === "denied"
                  ? Y(
                      "not_granted",
                      "the viewer has not allowed Claude access for this artifact",
                    )
                  : Y(
                      "upstream_error",
                      "Claude access isn't confirmed for this artifact right now",
                    ),
            });
            return;
          }
          let t = () => (I !== null && ne !== null ? Fe(I, ne) : Me());
          return F.images ? je().then((e) => (e ? t() : void 0)) : t();
        })
        .catch(() => {
          N({ error: Y("upstream_error", "request failed") });
        });
    };
  return (
    window.addEventListener("message", y),
    () => {
      window.removeEventListener("message", y);
    }
  );
}
function nx(e) {
  for (let t of e) t.abort();
  e.clear();
}
function rx(e) {
  let t = new Map(),
    n = `frame-${e}-refusal:`,
    r = (t) => `frame-${e}-consent:${t}`,
    i = null,
    a = !1,
    o = null,
    s = (e, n) => {
      t.set(e, Math.max(t.get(e) ?? 0, n));
    },
    c = (e) => {
      let t = [];
      if (!e)
        try {
          t.push(window.localStorage);
        } catch {}
      try {
        t.push(window.sessionStorage);
      } catch {}
      return t;
    },
    l = (e) => {
      for (let t of c(!1))
        try {
          let r = t.getItem(n + e);
          if (r === null) continue;
          let [i, a] = r.split(":").map(Number);
          return {
            seq: Number.isSafeInteger(i) && i >= 0 ? i : 0,
            press: Number.isFinite(a) ? a : 0,
          };
        } catch {}
      return null;
    };
  return {
    floor: (e) => t.get(e),
    pending: l,
    keep(e, t, r, i = !1) {
      for (let a of c(i))
        try {
          return (a.setItem(n + e, `${t}:${r}`), !0);
        } catch {}
      return !1;
    },
    drop(e, t) {
      let r = l(e);
      if (!(r === null || r.press > t))
        for (let t of c(!1))
          try {
            t.removeItem(n + e);
          } catch {}
    },
    armOnlineResend(e) {
      ((i = e),
        !a &&
          ((a = !0),
          window.addEventListener("online", () => {
            let e = i;
            ((i = null), e?.());
          })));
    },
    listen(e, t) {
      if (o?.uuid === e && t !== null) {
        o.onRevoke = t;
        return;
      }
      if (
        (o?.ch.close(),
        (o = null),
        t !== null && typeof BroadcastChannel == "function")
      )
        try {
          let n = new BroadcastChannel(r(e)),
            i = { uuid: e, ch: n, onRevoke: t };
          ((n.onmessage = (t) => {
            let n = t.data;
            if (typeof n?.key != "string" || !n.key.startsWith(`${e}|`)) return;
            let r = typeof n.seq == "number" ? n.seq : 0;
            (s(n.key, r), i.onRevoke(n.key, r));
          }),
            (o = i));
        } catch {}
    },
    postRevoke(e, t, n) {
      s(t, n);
      let i = { key: t, seq: n };
      if (o?.uuid === e) {
        (o.onRevoke(t, n), o.ch.postMessage(i));
        return;
      }
      if (typeof BroadcastChannel != "function") return;
      let a = null;
      try {
        ((a = new BroadcastChannel(r(e))), a.postMessage(i));
      } catch {
      } finally {
        a?.close();
      }
    },
  };
}
function ix(e) {
  let t = e.initial,
    n = e.initial !== null,
    r = (e) => ({ decisionSeq: e, granted: !1, revoked: !0 });
  {
    let n = e.ledger.floor(e.viewer);
    n !== void 0 &&
      (t?.decisionSeq ?? 0) <= n &&
      t?.revoked !== !0 &&
      (t = r(t?.decisionSeq ?? 0));
  }
  let i = e.live ? e.ledger.pending(e.viewer) : null;
  i !== null && (t = r(t?.decisionSeq ?? 0));
  let a = () => t?.revoked === !0,
    o = 0,
    s = 0,
    c = (n = 0) => {
      (o++, (t = r(Math.max(t?.decisionSeq ?? 0, n))));
      try {
        e.endHere();
      } catch {}
      e.note("denied");
    },
    l = (r) => {
      r.revoked && !a() && c();
      let i = a();
      ((t = r), (n = !0), i && r.granted && !r.revoked && e.note("cleared"));
    },
    u = async (n = o) => {
      if (!e.brokerLive()) return;
      let i = await e.reread();
      if (i === null || !e.brokerLive()) return;
      let c = t?.decisionSeq ?? 0;
      if (s > 0 && i.decisionSeq > c && !i.revoked) {
        l(r(i.decisionSeq));
        return;
      }
      (i.decisionSeq > c || (i.decisionSeq === c && !a())) &&
        (i.revoked ||
          (s === 0 &&
            o === n &&
            i.decisionSeq > (e.ledger.floor(e.viewer) ?? -1))) &&
        l(i);
    },
    d = async (n, r = o) => {
      let i = {
          kind: e.kind,
          ...(n ? { grant: !0 } : { revoke: !0 }),
          seenSeq: t?.decisionSeq ?? 0,
          provenance: "explicit",
        },
        a;
      try {
        a = await ed(e.transport, [i], {
          sleep: (e) => new Promise((t) => window.setTimeout(t, e)),
          refresh: e.refreshToken,
          aborted: e.aborted,
        });
      } catch {
        return (e.report(e.brokerLive() ? "reauth" : "dropped"), !1);
      }
      let s =
        a.status === "saved" ? a.ops.find((t) => t.kind === e.kind) : void 0;
      if (s && !s.granted) {
        let t = o;
        (e.ledger.postRevoke(e.frameUuid, e.viewer, s.decisionSeq),
          e.brokerLive() && (o = t));
      }
      if (!e.brokerLive())
        return (a.status !== "saved" && e.report("dropped"), !1);
      if (a.status === "rerender" || a.status === "reauth")
        return (e.report(a.status), await u(r), !1);
      if (a.status !== "saved") return (e.report(a.status), !1);
      if (!s) return (await u(r), !1);
      let c = (n && o !== r) || (!n && s.granted);
      return (
        l({
          decisionSeq: s.decisionSeq,
          granted: s.granted && !c,
          revoked: !s.granted || c,
        }),
        s.granted !== n && e.report("echo-denied"),
        s.granted === n && !c
      );
    },
    f = Promise.resolve(),
    p = () => {
      e.ledger.armOnlineResend(() => {
        let t = e.ledger.pending(e.viewer);
        e.brokerLive() && t !== null && m(!1, t.press);
      });
    },
    m = (n, r) => {
      if (r !== void 0) {
        let t = e.ledger.pending(e.viewer);
        if (t === null || t.press !== r) return Promise.resolve(!1);
      }
      let i = r ?? Date.now(),
        a = o;
      n || s++;
      let l = n ? void 0 : Xu();
      !n &&
        r === void 0 &&
        !e.ledger.keep(e.viewer, t?.decisionSeq ?? 0, i, !e.keepsRefusals) &&
        e.report("dropped");
      let u = () => r !== void 0 && e.ledger.pending(e.viewer)?.press !== r,
        m = f
          .then(async () => {
            if (u()) return !1;
            let r = t?.decisionSeq ?? 0,
              i = await d(n, a);
            return !i &&
              !n &&
              e.brokerLive() &&
              !u() &&
              (t?.decisionSeq ?? 0) > r
              ? d(!1)
              : i;
          })
          .then(
            (t) => (
              t
                ? e.ledger.drop(e.viewer, i)
                : !t && !n && e.brokerLive() && p(),
              t
            ),
          )
          .finally(() => {
            (n || s--, l?.());
          });
      if (((f = m.catch(() => void 0)), !n)) {
        let n = t?.decisionSeq ?? 0;
        try {
          e.ledger.postRevoke(e.frameUuid, e.viewer, n);
        } finally {
          c();
        }
      }
      return m;
    };
  if (i !== null && e.keepsRefusals) {
    let t = i.press;
    queueMicrotask(() => {
      e.brokerLive() && m(!1, t);
    });
  }
  return {
    state: () => t,
    served: () => n,
    recorded: () => t !== null && (t.decisionSeq > 0 || t.granted || t.revoked),
    revoked: a,
    denyHere: c,
    write: m,
    manageRow: () => ({
      isRevoked: () => t?.granted !== !0 || a(),
      onToggle: (n, r) => {
        if (e.aborted()) return !1;
        let i = () => r?.(t?.granted === !0 && !a());
        return (
          m(n).then((t) => {
            (n && t && e.note("cleared"), i());
          }, i),
          !0
        );
      },
    }),
  };
}
var ax = 2e4,
  ox = 15e3,
  sx = 3e4,
  cx = 300,
  lx = (e) =>
    e !== null && e.status === 403 && pt(e.text) === null && !$e(e.text),
  ux = 2e3,
  dx = class {
    deps;
    inflight = null;
    armInflight = !1;
    cached = null;
    coolUntil = 0;
    lastToken = null;
    prefetched;
    constructor(e) {
      ((this.deps = e), (this.prefetched = e.prefetched ?? null));
    }
    lastMintToken() {
      return this.lastToken;
    }
    now() {
      return this.deps.now?.() ?? Date.now();
    }
    grant(e = !1, t = {}) {
      let n = this.cached;
      if (!e && n !== null && this.now() < n.expiresAtMs - 3e4)
        return Promise.resolve({ kind: "ok", ...n });
      let r = this.inflight;
      if (r === null) {
        let t = this.coolUntil - this.now();
        if (!e && t > 0 && t <= 2e3)
          return Promise.resolve({ kind: "unavailable" });
        ((this.armInflight = !1),
          (r = this.mintOnce()
            .then(
              (e) => (
                e.kind === "unavailable"
                  ? this.armInflight && (this.coolUntil = this.now() + ux)
                  : (this.coolUntil = 0),
                e
              ),
            )
            .finally(() => {
              this.inflight = null;
            })),
          (this.inflight = r));
      }
      return (t.armCooldown !== !1 && (this.armInflight = !0), r);
    }
    msUntilStale() {
      let e = this.cached;
      return e === null ? null : e.expiresAtMs - sx - this.now();
    }
    clear() {
      this.cached = null;
    }
    async mintOnce() {
      let e = () => this.deps.live?.() ?? !0,
        t = this.prefetched;
      this.prefetched = null;
      let n = this.deps.token();
      if (n === null || !e()) return { kind: "unavailable" };
      this.lastToken = n;
      let r = null,
        i = ax;
      if (t !== null && t.token === n) {
        let n = await t.res;
        if (!e()) return { kind: "unavailable" };
        if (n === null) {
          let e = (t.settledAtMs ?? this.now()) - t.startedAtMs;
          i -= Math.min(ax, Math.max(0, e));
        } else n.ok && this.now() - n.sentAtMs <= 6e4 && (r = n);
      }
      if (
        r === null &&
        ((r = i > 0 ? await this.post({ token: n }, i) : null), !e())
      )
        return { kind: "unavailable" };
      if (lx(r)) {
        if ((await this.deps.onAuthStale?.().catch(() => void 0), !e()))
          return { kind: "unavailable" };
        let t = this.deps.token();
        if (t !== null && t !== n) {
          if (
            ((this.lastToken = t),
            (r = await this.post({ token: t }, ox)),
            !e())
          )
            return { kind: "unavailable" };
          if (lx(r)) return (this.deps.report?.("403"), { kind: "revoked" });
        }
      }
      if (r === null)
        return (this.deps.report?.("fetch-failed"), { kind: "unavailable" });
      if (
        (r.status === 404 && pt(r.text) === null) ||
        (r.status === 403 && $e(r.text))
      )
        return { kind: "revoked" };
      if (!r.ok)
        return (
          pt(r.text) === null && this.deps.report?.(String(r.status)),
          { kind: "unavailable" }
        );
      let a;
      try {
        a = JSON.parse(r.text);
      } catch {
        a = null;
      }
      if (a === null || typeof a.grant != "string" || a.grant === "")
        return (
          this.deps.report?.("malformed-response"),
          { kind: "unavailable" }
        );
      let o =
          typeof a.expires_in == "number" && a.expires_in > 0
            ? a.expires_in
            : cx,
        s = { grant: a.grant, expiresAtMs: r.sentAtMs + o * 1e3 };
      return ((this.cached = s), { kind: "ok", ...s });
    }
    async post(e, t) {
      let n = this.deps.fetchFn ?? fetch,
        r = this.now();
      try {
        let i = await n(this.deps.path + this.deps.query, {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              ...this.deps.cpHeaders,
            },
            body: JSON.stringify(e),
            ...(this.deps.signalFor === void 0
              ? {}
              : { signal: this.deps.signalFor(t) }),
          }),
          a = await i.text();
        return {
          status: i.status,
          ok: i.ok,
          text: a,
          sentAtMs: Math.min(r, this.now()),
        };
      } catch (e) {
        return (this.deps.markHandled?.(e), null);
      }
    }
  },
  fx = "ctrl:receipt_ack",
  px = "ctrl:send_refused",
  mx = "ctrl:send_result",
  hx = "ctrl:opened",
  gx = "ctrl:stream_reset",
  _x = "ctrl:stream_denied",
  vx = "ctrl:close",
  yx = 57344,
  bx = /^[A-Za-z0-9_-]*$/,
  xx = 262144,
  Sx = 65536,
  Cx = 64,
  wx = [
    "NOT_OPEN",
    "NOT_SENDABLE",
    "NOT_WRITABLE",
    "TOO_BIG",
    "BAD_PAYLOAD",
    "RATE_LIMITED",
    "RESEND_FROM",
    "GRANT_EXPIRED",
    "GRANT_MISMATCH",
  ],
  Tx = [
    "RETENTION",
    "GENERATION",
    "ROTATION",
    "SERVER",
    "OVERFLOW",
    "PROTOCOL",
  ],
  Ex = [
    "GRANT",
    "RATE",
    "STREAM_LIMIT",
    "NOT_JOINED",
    "UNAVAILABLE",
    "LANE_DISABLED",
    "DENIED",
    "BAD_SPEC",
  ],
  Dx = ["ACCEPTED", "REJECTED"];
function Ox(e, t, n) {
  if (typeof e != "string" || e === "") return "UNKNOWN";
  let r = e.toUpperCase(),
    i = r.startsWith(t) ? r.slice(t.length) : r;
  return n.includes(i) ? i : "UNKNOWN";
}
function kx(e) {
  return Ox(e, "SEND_REFUSED_REASON_", wx);
}
function Ax(e) {
  return Ox(e, "STREAM_RESET_REASON_", Tx);
}
function jx(e) {
  return Ox(e, "STREAM_DENIED_REASON_", Ex);
}
function Mx(e) {
  return Ox(e, "SEND_STATUS_", Dx);
}
function Nx(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  if (typeof t.lane != "string") return null;
  let n = (e) =>
      Array.isArray(e) && e.every((e) => typeof e == "string") ? e : null,
    r = n(t.stores);
  return r === null
    ? null
    : { stores: r, sendStores: n(t.sendStores) ?? [], door: t.door === !0 };
}
function Px(e, t = xx) {
  let n = 262143,
    r = t,
    i = [[e, 0]];
  for (; i.length > 0;) {
    let e = i.pop();
    if (e === void 0) break;
    let [t, a] = e;
    if (typeof t == "string") {
      if (((r -= t.length), r < 0)) return "big";
      continue;
    }
    if (typeof t != "object" || !t) {
      let e = typeof t;
      if (e === "function" || e === "symbol" || e === "bigint") return "bad";
      continue;
    }
    if (a > Cx) return "bad";
    if (Array.isArray(t)) {
      if (t.length > Sx || ((n -= t.length), n < 0)) return "bad";
      for (let e of t) i.push([e, a + 1]);
    } else {
      if (ArrayBuffer.isView(t)) return "bad";
      let e = Object.getPrototypeOf(t);
      if (e !== Object.prototype && e !== null) return "bad";
      let o = 0;
      for (let e in t)
        if (Object.prototype.hasOwnProperty.call(t, e)) {
          if (++o > Sx) return "bad";
          if (((r -= e.length), r < 0)) return "big";
          if (--n < 0) return "bad";
          i.push([t[e], a + 1]);
        }
    }
  }
  return "ok";
}
function Fx(e, t) {
  return Px(e, t) === "ok";
}
function Ix(e, t) {
  let n;
  try {
    n = JSON.stringify(e);
  } catch {
    return null;
  }
  if (typeof n != "string") return null;
  let r = Lx(n);
  return r > t ? null : { text: n, clean: JSON.parse(n), bytes: r };
}
function Lx(e) {
  return new TextEncoder().encode(e).length;
}
function Rx(e) {
  return Lx(JSON.stringify(e) ?? "");
}
var zx = "frame-sync:",
  Bx = /^[a-z]{1,16}$/,
  Vx = /^([a-z]{1,16})\.\d{1,3}$/;
function Hx(e, t) {
  return typeof t == "string" && Vx.exec(t)?.[1] === e;
}
function Ux(e) {
  return zx + e;
}
var Wx = u({ type: a(p(), d(zx)) }),
  Gx = u({ store: p() }),
  Kx = c({
    type: s(Ux("open")),
    store: p(),
    stream: p(),
    spec: f(),
    since: o(i(r([p(), l()]))),
  }),
  qx = c({
    type: s(Ux("since")),
    store: p(),
    stream: p(),
    since: i(r([p(), l()])),
  }),
  Jx = c({
    type: s(Ux("send")),
    store: p(),
    stream: p(),
    seq: l(),
    payload: f(),
  }),
  Yx = c({ type: s(Ux("close")), store: p(), stream: p() });
function Xx(e) {
  return e == null
    ? null
    : typeof e == "number"
      ? Number.isSafeInteger(e) && e >= 0
        ? String(e)
        : !1
      : e === ""
        ? null
        : e.length <= 1024 && bx.test(e)
          ? e
          : !1;
}
function Zx(e) {
  return (
    typeof e == "object" &&
    !!e &&
    typeof e.type == "string" &&
    e.type.startsWith("frame-sync:")
  );
}
var Qx = new Set(
  [
    "state",
    "opened",
    "frame",
    "ack",
    "refused",
    "result",
    "reset",
    "unavailable",
  ].map((e) => zx + e),
);
function $x(e) {
  return Zx(e) && !Qx.has(e.type);
}
function eS(e) {
  let t = e?.store;
  return typeof t == "string" && Bx.test(t) ? t : null;
}
function tS(e) {
  if (!n(Wx, e).success) return null;
  let t = e.type;
  if (Qx.has(t)) return null;
  let r = eS(e);
  if (t === Ux("hello"))
    return r === null
      ? {
          reject: { store: null, stream: null, seq: null, reason: "BAD_STORE" },
        }
      : { op: "hello", store: r };
  let i = e.stream,
    a = r !== null && typeof i == "string" && Vx.test(i) ? i : null,
    o = (e, t = null) => ({
      reject: { store: r, stream: a, seq: t, reason: e },
    });
  if (!n(Gx, e).success || r === null) return o("BAD_STORE");
  if (t === Ux("open")) {
    let t = n(Kx, e);
    if (!t.success) return o("BAD_MESSAGE");
    if (!Hx(r, t.output.stream)) return o("BAD_STREAM");
    let i = Xx(t.output.since);
    if (i === !1) return o("BAD_SINCE");
    let a,
      s = t.output.spec;
    if (typeof s == "string") {
      if (s === "" || s.length > 57344 || Lx(s) > 57344) return o("BAD_SPEC");
      a = s;
    } else if (typeof s == "object" && s && !Array.isArray(s)) {
      if (!Fx(s, 57344)) return o("BAD_SPEC");
      let e = Ix(s, yx);
      if (e === null) return o("BAD_SPEC");
      a = e.text;
    } else return o("BAD_SPEC");
    return { op: "open", store: r, stream: t.output.stream, spec: a, since: i };
  }
  if (t === Ux("since")) {
    let t = n(qx, e);
    if (!t.success) return o("BAD_MESSAGE");
    if (!Hx(r, t.output.stream)) return o("BAD_STREAM");
    let i = Xx(t.output.since);
    return i === !1
      ? o("BAD_SINCE")
      : { op: "since", store: r, stream: t.output.stream, since: i };
  }
  if (t === Ux("send")) {
    let t = n(Jx, e);
    if (!t.success) return o("BAD_MESSAGE");
    let i = t.output.seq,
      a = Number.isSafeInteger(i) && i >= 1 && i <= 4294967295;
    if (!Hx(r, t.output.stream)) return o("BAD_STREAM", a ? i : null);
    if (!a) return o("BAD_MESSAGE");
    let s = t.output.payload,
      c;
    if (typeof s == "string") {
      if (s.length + 2 > 262144 || Rx(s) > 262144) return o("TOO_BIG", i);
      c = s;
    } else if (typeof s == "object" && s && !Array.isArray(s)) {
      let e = Px(s, xx);
      if (e === "bad") return o("BAD_PAYLOAD", i);
      if (e === "big") return o("TOO_BIG", i);
      let t = Ix(s, xx);
      if (t === null) return o("TOO_BIG", i);
      c = t.clean;
    } else return o("BAD_PAYLOAD", i);
    return {
      op: "send",
      store: r,
      stream: t.output.stream,
      seq: i,
      payload: c,
    };
  }
  if (t === Ux("close")) {
    let t = n(Yx, e);
    return t.success
      ? Hx(r, t.output.stream)
        ? { op: "close", store: r, stream: t.output.stream }
        : o("BAD_STREAM")
      : o("BAD_MESSAGE");
  }
  return o("BAD_MESSAGE");
}
var nS = ["shell-nav", "host-nav", "host-click"],
  rS = ["chat", "cowork", "code", "project", "viewer", "popout", "solo"],
  iS = {
    opened: (e, t) => ({ type: Ux("opened"), store: e, stream: t }),
    frame: (e, t, n) => ({
      type: Ux("frame"),
      store: e,
      stream: t,
      payload: n,
    }),
    ack: (e, t, n) => ({ type: Ux("ack"), store: e, stream: t, ack: n }),
    refused: (e, t, n, r, i) => {
      let a = { type: Ux("refused"), store: e, stream: t, seq: n, reason: r },
        o = cS(i?.expected);
      o !== null && (a.expected = o);
      let s = lS(i?.retryAfterMs);
      return (s !== null && (a.retryAfterMs = s), a);
    },
    result: (e, t, n, r, i) => {
      let a = { type: Ux("result"), store: e, stream: t, seq: n, status: r };
      return (i !== void 0 && (a.body = i), a);
    },
    reset: (e, t, n, r) => ({
      type: Ux("reset"),
      store: e,
      stream: t,
      reason: n,
      reopening: r,
    }),
    state: (e, t, n, r, i) => {
      let a =
          r != null &&
          typeof r.at == "number" &&
          Number.isFinite(r.at) &&
          r.at > 0 &&
          nS.includes(r.from),
        o = typeof i == "string" && rS.includes(i);
      return {
        type: Ux("state"),
        store: e,
        connected: t,
        sendable: n,
        ...(a && { hostStart: r.at, hostStartFrom: r.from }),
        ...(o && { hostProduct: i }),
      };
    },
    unavailable: (e, t) => ({ type: Ux("unavailable"), store: e, reason: t }),
  };
function aS(e) {
  return { stream: e.stream, grant: e.grant, spec: e.spec, since: e.since };
}
function oS(e) {
  return { stream: e };
}
function sS(e) {
  return { stream: e.stream, grant: e.grant };
}
function cS(e) {
  let t = typeof e == "string" && /^\d{1,16}$/.test(e) ? Number(e) : e;
  return typeof t == "number" && Number.isSafeInteger(t) && t >= 0 ? t : null;
}
function lS(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return null;
  let t = Math.floor(e);
  return t >= 0 && t <= 6e5 ? t : null;
}
function uS(e, t) {
  if (typeof t != "object" || !t) return null;
  let n = t;
  if (!Hx(e, n.stream)) return null;
  let r = (e) =>
    typeof e == "number" && Number.isSafeInteger(e) && e >= 0 ? e : null;
  return {
    stream: n.stream,
    reason: n.reason,
    ack: r(n.ack),
    seq: r(n.seq),
    expected: cS(n.expected),
    retryAfterMs: lS(n.retryAfterMs ?? n.retry_after_ms),
  };
}
function dS(e, t) {
  if (typeof t != "object" || !t) return null;
  let n = t;
  return !Hx(e, n.stream) ||
    typeof n.seq != "number" ||
    !Number.isSafeInteger(n.seq) ||
    n.seq < 0
    ? null
    : { stream: n.stream, seq: n.seq, status: n.status, body: n.body };
}
var fS = 8e3,
  pS = 500,
  mS = 3e4,
  hS = 1e4,
  gS = 1e4,
  _S = 5e3,
  vS = 12e4,
  yS = 1e3,
  bS = new WeakMap();
function xS(e) {
  let t = bS.get(e);
  if (t === void 0) {
    let n = new Map(),
      r = new Set();
    (e.onDown(() => n.clear()),
      (t = {
        next(e) {
          let t = n.get(e) ?? 0;
          return t >= yS ? null : (n.set(e, t + 1), e + "." + String(t));
        },
        live: r,
      }),
      bS.set(e, t));
  }
  return t;
}
function SS(e, t, n, r) {
  let i = t,
    a = n(),
    o = !1;
  return {
    take: () => {
      let s = n();
      return (
        (i = Math.min(t, i + (Math.max(0, s - a) / 1e3) * e)),
        (a = s),
        i < 1 ? (o || ((o = !0), r()), !1) : (--i, (o = !1), !0)
      );
    },
    waitMs: () => Math.max(1, Math.ceil(((1 - i) * 1e3) / e)),
  };
}
function CS(e, t, n) {
  let r = new Map(),
    i = !1,
    a = (a, o) => {
      if (i || !n() || !Bx.test(a)) return;
      let s = r.get(a);
      if (
        (s !== void 0 &&
          s.revivable(o.token()) &&
          (s.teardown(), r.delete(a), (s = void 0)),
        s === void 0)
      ) {
        r.set(a, wS({ store: a, row: o }, e, t, n));
        return;
      }
      s.onInbound({ op: "hello", store: a });
    },
    o = (i) => {
      if (
        !t.isConnected ||
        !n() ||
        i.origin !== e.frameOrigin ||
        !t.contentWindow ||
        i.source !== t.contentWindow ||
        !$x(i.data)
      )
        return;
      let a = eS(i.data);
      if (a === null) return;
      let o = r.get(a);
      if (o === void 0) return;
      let s = tS(i.data);
      s !== null &&
        ("reject" in s
          ? o.onReject(s.reject)
          : s.op !== "hello" && o.onInbound(s));
    };
  return (
    window.addEventListener("message", o),
    {
      hello: a,
      teardown: () => {
        if (!i) {
          ((i = !0), window.removeEventListener("message", o));
          for (let e of r.values()) e.teardown();
          r.clear();
        }
      },
    }
  );
}
function wS(e, t, n, r) {
  let { store: i, row: a } = e,
    o = t.sync,
    s = () => (t.now === void 0 ? Date.now() : t.now()),
    c = new dx({
      ...t.http,
      path: a.mintPath,
      token: () => a.token(),
      prefetched: a.prefetched,
      live: () => !v && r(),
      report: (e) => t.reportCall(i, e),
      now: s,
    }),
    l = (e) => t.reportRealtime(i, e),
    u = (e, n) =>
      t.setTimer === void 0 ? window.setTimeout(e, n) : t.setTimer(e, n),
    d = (e) => {
      t.clearTimer === void 0 ? window.clearTimeout(e) : t.clearTimer(e);
    },
    f = () => (t.rand === void 0 ? Math.random() : t.rand()),
    p = new Map(),
    m = new Map(),
    h = xS(o),
    g = (e, t) => {
      (e.wire !== "" && (m.delete(e.wire), h.live.delete(e.wire)),
        (e.wire = t),
        (e.grant = ""),
        t !== "" && (m.set(t, e), h.live.add(t)));
    },
    _ = !1,
    v = !1,
    y = null,
    b = null,
    x = !1,
    S = -1,
    C = () => {
      ((x = !0), (S = o.epoch()));
    },
    { take: w } = SS(8, 80, s, () => t.reportRealtime(i, "rate:open")),
    T = SS(60, 120, s, () => t.reportRealtime(i, "rate:send")),
    E = !1,
    D = !1,
    O = 0,
    k = 0,
    A = _S,
    j = (e) => {
      v ||
        !r() ||
        !n.isConnected ||
        n.contentWindow?.postMessage(e, t.frameOrigin);
    },
    M = () => {
      let e = Nx(o.currentJoined());
      ((E = e !== null && e.stores.includes(i)),
        (D = E && e !== null && e.sendStores.includes(i)));
    },
    ee = (e) => {
      (e.openedTimer !== 0 && d(e.openedTimer), (e.openedTimer = 0));
    },
    te = (e) => {
      (e.reopenTimer !== 0 && d(e.reopenTimer), (e.reopenTimer = 0));
    },
    N = (e, t) => {
      (ee(e),
        te(e),
        e.gen++,
        t &&
          (e.state === "opening" || e.state === "open") &&
          o.sendCtrl(vx, oS(e.wire)),
        (e.state = "idle"),
        p.delete(e.name),
        g(e, ""));
    },
    P = (e) => {
      if (y === null) {
        y = e;
        for (let t of Array.from(p.values()))
          (j(iS.reset(i, t.name, e.toUpperCase(), !1)), N(t, !0));
        (d(O), (O = 0), d(k), (k = 0), c.clear(), j(iS.unavailable(i, e)));
      }
    },
    F = (e) => {
      (d(k),
        (k = 0),
        !(v || y !== null || p.size === 0 || !E) &&
          (k = u(() => {
            ((k = 0),
              !(v || y !== null || p.size === 0 || !r() || !E) &&
                c.grant(!0).then((e) => {
                  if (!(v || !r())) {
                    if (e.kind === "revoked") {
                      ne();
                      return;
                    }
                    if (y === null) {
                      if (e.kind === "ok") ((A = _S), ie(e.grant), re());
                      else {
                        l("mint:unavailable");
                        let e = f() * A;
                        ((A = Math.min(A * 2, vS)), F(e));
                      }
                    }
                  }
                }));
          }, e)));
    },
    ne = () => {
      ((b = c.lastMintToken() ?? ""),
        y === null && (l("mint:revoked"), P("revoked")));
    },
    re = () => {
      let e = c.msUntilStale();
      if (e === null) {
        (d(k), (k = 0));
        return;
      }
      F(Math.max(gS, e - gS));
    },
    ie = (e) => {
      if (!(v || y !== null || !r())) for (let t of p.values()) I(t, e);
    },
    I = (e, t) => {
      e.wire === "" ||
        e.grant === t ||
        (e.state !== "opening" && e.state !== "open") ||
        (o.sendCtrl("ctrl:regrant", sS({ stream: e.wire, grant: t })) &&
          (e.grant = t));
    },
    ae = (e, n, a) => {
      if (v || !r()) return;
      if (a.kind === "revoked") {
        ne();
        return;
      }
      if (
        y !== null ||
        p.get(e.name) !== e ||
        e.gen !== n ||
        e.state !== "minting"
      )
        return;
      if (a.kind === "unavailable") {
        (l("mint:unavailable"),
          j(iS.reset(i, e.name, "UNAVAILABLE", !1)),
          N(e, !1));
        return;
      }
      if ((re(), ie(a.grant), !E)) {
        e.state = "idle";
        return;
      }
      let s = h.next(i);
      if (s === null) {
        (_ || ((_ = !0), l("wire:exhausted")),
          j(iS.reset(i, e.name, "UNAVAILABLE", !1)),
          N(e, !1));
        return;
      }
      if (
        (g(e, s),
        !o.sendCtrl(
          "ctrl:open",
          aS({ stream: s, grant: a.grant, spec: e.spec, since: e.since }),
        ))
      ) {
        e.state = "idle";
        return;
      }
      ((e.grant = a.grant),
        (e.state = "opening"),
        ee(e),
        (e.openedTimer = u(() => {
          ((e.openedTimer = 0),
            p.get(e.name) === e &&
              e.state === "opening" &&
              (l("opened-timeout"),
              j(iS.reset(i, e.name, "TIMEOUT", !1)),
              N(e, !0)));
        }, t.openedTimeoutMs ?? fS)));
    },
    oe = (e, t = !1) => {
      if ((ee(e), te(e), !r())) {
        e.state = "idle";
        return;
      }
      e.state = "minting";
      let n = ++e.gen;
      c.grant(t).then((t) => ae(e, n, t));
    },
    se = () => {
      if ((d(O), (O = 0), !(v || y !== null || !E)))
        for (let e of p.values())
          e.state === "idle" && e.reopenTimer === 0 && oe(e);
    },
    ce = (e, t) => {
      (te(e), t && (e.resetBackoffMs = pS));
      let n = f() * e.resetBackoffMs;
      ((e.resetBackoffMs = Math.min(e.resetBackoffMs * 2, mS)),
        (e.reopenTimer = u(() => {
          ((e.reopenTimer = 0),
            !(v || y !== null || p.get(e.name) !== e) &&
              e.state === "idle" &&
              E &&
              oe(e));
        }, n)));
    },
    le = (e) => {
      if (y !== null) {
        e.op === "hello" ? j(iS.unavailable(i, y)) : de();
        return;
      }
      if (e.op === "hello") {
        j(iS.state(i, E, D, void 0, t.hostProduct?.()));
        return;
      }
      if (e.op === "close") {
        let t = p.get(e.stream);
        (t !== void 0 && N(t, !0), re());
        return;
      }
      if (e.op === "since") {
        let t = p.get(e.stream);
        t !== void 0 && (t.since = e.since);
        return;
      }
      if (e.op === "open") {
        let t = p.get(e.stream);
        if (!w()) {
          (t !== void 0 && (N(t, !0), re()),
            j(iS.reset(i, e.stream, "RATE_LIMITED", !1)));
          return;
        }
        if (t === void 0) {
          if (p.size >= 16) {
            j(iS.reset(i, e.stream, "STREAM_LIMIT", !1));
            return;
          }
          ((t = {
            name: e.stream,
            wire: "",
            grant: "",
            spec: e.spec,
            since: e.since,
            state: "idle",
            grantRetried: !1,
            gen: 0,
            openedTimer: 0,
            reopenTimer: 0,
            resetBackoffMs: pS,
            openedAt: 0,
          }),
            p.set(t.name, t));
        } else
          ((t.state === "opening" || t.state === "open") &&
            o.sendCtrl(vx, oS(t.wire)),
            g(t, ""),
            ee(t),
            te(t),
            (t.spec = e.spec),
            (t.since = e.since),
            (t.state = "idle"),
            (t.grantRetried = !1),
            (t.resetBackoffMs = pS));
        E && oe(t);
        return;
      }
      let n = p.get(e.stream);
      if (n === void 0 || n.state !== "open") {
        j(iS.refused(i, e.stream, e.seq, "NOT_OPEN"));
        return;
      }
      if (!D) {
        j(iS.refused(i, e.stream, e.seq, "NOT_SENDABLE"));
        return;
      }
      if (!T.take()) {
        j(
          iS.refused(i, e.stream, e.seq, "RATE_LIMITED", {
            retryAfterMs: T.waitMs(),
          }),
        );
        return;
      }
      o.sendStore(i, n.wire, e.seq, e.payload) ||
        j(iS.refused(i, e.stream, e.seq, "NOT_OPEN"));
    },
    ue = !1,
    de = () => {
      y === null || ue || ((ue = !0), j(iS.unavailable(i, y)));
    },
    fe = (e) => {
      if (y !== null) {
        de();
        return;
      }
      if (e.stream === null) return;
      if (
        e.seq !== null ||
        e.reason === "TOO_BIG" ||
        e.reason === "BAD_PAYLOAD"
      ) {
        j(
          iS.refused(
            i,
            e.stream,
            e.seq,
            e.reason === "TOO_BIG" || e.reason === "BAD_STREAM"
              ? e.reason
              : "BAD_PAYLOAD",
          ),
        );
        return;
      }
      let t = p.get(e.stream);
      (t !== void 0 && (N(t, !0), re()),
        j(iS.reset(i, e.stream, e.reason, !1)));
    },
    pe = o.onStream((e) => {
      if (v || y !== null || e.kind !== "store:" + i) return;
      let t = m.get(e.stream);
      if (t !== void 0 && t.state === "open") {
        if (Rx(e.payload) > 262144) {
          l("frame:over_cap");
          return;
        }
        j(iS.frame(i, t.name, e.payload));
      }
    }),
    me = o.onLaneCtrl((e) => {
      if (v || y !== null) return;
      if (e.kind === "ctrl:joined") {
        (M(),
          j(iS.state(i, E, D)),
          E && O === 0 && (O = u(se, f() * (t.reopenJitterMs ?? pS))),
          E && k === 0 && re());
        return;
      }
      let n = uS(i, e.payload);
      if (n === null) return;
      let r = m.get(n.stream);
      switch (e.kind) {
        case hx:
          if (r === void 0) {
            h.live.has(n.stream) || o.sendCtrl(vx, oS(n.stream));
            return;
          }
          if (r.state === "idle") {
            (o.sendCtrl(vx, oS(n.stream)), g(r, ""));
            return;
          }
          if (r.state !== "opening") return;
          (ee(r),
            (r.state = "open"),
            (r.grantRetried = !1),
            (r.openedAt = s()),
            j(iS.opened(i, r.name)));
          return;
        case fx:
          if (r === void 0 || n.ack === null) return;
          j(iS.ack(i, r.name, n.ack));
          return;
        case px: {
          if (r === void 0) return;
          let e = kx(n.reason);
          if (e === "GRANT_MISMATCH" && (n.seq === null || n.seq === 0)) return;
          (j(
            iS.refused(i, r.name, n.seq, e, {
              expected: n.expected ?? void 0,
              retryAfterMs: n.retryAfterMs ?? void 0,
            }),
          ),
            e === "GRANT_EXPIRED" &&
              r.state === "open" &&
              (o.sendCtrl(vx, oS(r.wire)),
              g(r, ""),
              ee(r),
              (r.openedAt = 0),
              (r.state = "idle"),
              E && ((r.grantRetried = !0), oe(r, !0))));
          return;
        }
        case mx: {
          if (r === void 0) return;
          let t = dS(i, e.payload);
          if (t === null) return;
          let n = t.body;
          (n !== void 0 &&
            Rx(n) > 264192 &&
            (l("result:over_cap"), (n = void 0)),
            j(iS.result(i, r.name, t.seq, Mx(t.status), n)));
          return;
        }
        case _x: {
          if (r === void 0) return;
          g(r, "");
          let e = jx(n.reason);
          if (
            (l("denied:" + e.toLowerCase()), e === "GRANT" && !r.grantRetried)
          ) {
            ((r.grantRetried = !0), (r.state = "idle"), oe(r, !0));
            return;
          }
          (j(iS.reset(i, r.name, e, !1)), N(r, !1));
          return;
        }
        case gx: {
          if (r === void 0) return;
          g(r, "");
          let e = Ax(n.reason);
          if (
            (l("reset:" + e.toLowerCase()),
            ee(r),
            e === "PROTOCOL" || e === "UNKNOWN")
          ) {
            (j(iS.reset(i, r.name, e, !1)), N(r, !1));
            return;
          }
          (e === "RETENTION" || e === "GENERATION" || e === "ROTATION") &&
            (r.since = null);
          let t =
            r.state === "open" && r.openedAt !== 0 && s() - r.openedAt >= hS;
          ((r.openedAt = 0),
            r.gen++,
            (r.state = "idle"),
            j(iS.reset(i, r.name, e, E)),
            E && ce(r, t));
          return;
        }
        default:
          return;
      }
    }),
    he = o.onDown(() => {
      if (!(v || y !== null)) {
        ((E = !1), (D = !1), d(O), (O = 0), d(k), (k = 0));
        for (let e of p.values())
          (ee(e),
            te(e),
            e.gen++,
            (e.state = "idle"),
            (e.openedAt = 0),
            g(e, ""));
        j(iS.state(i, !1, !1));
      }
    }),
    ge = o.onTerminal((e) => {
      (C(), P(e.code));
    }),
    L = o.terminal();
  return (
    L === null
      ? (M(),
        j(iS.state(i, E, D, t.hostStart?.(), t.hostProduct?.())),
        E &&
          a.token() !== null &&
          (a.prefetched === void 0 &&
            performance.mark(`frame-shell:store-mint-start:${i}`),
          c.grant(!1, { armCooldown: !1 }).then((e) => {
            (performance.mark(`frame-shell:store-mint-end:${i}`, {
              detail: e.kind,
            }),
              e.kind === "revoked" && !v && r() && ne());
          })))
      : (C(), P(L)),
    {
      onInbound: le,
      onReject: fe,
      revivable: (e) =>
        y === null || e === null || (b !== null && e === b)
          ? !1
          : x
            ? o.epoch() !== S && o.terminal() === null
            : b !== null,
      teardown: () => {
        if (!v) {
          p.size === 0 && y === null && j(iS.unavailable(i, "not_enabled"));
          for (let e of p.values()) j(iS.reset(i, e.name, "CLOSED", !1));
          v = !0;
          for (let e of Array.from(p.values())) N(e, !0);
          (d(O), d(k), c.clear(), pe(), me(), he(), ge());
        }
      },
    }
  );
}
var TS = 3e4,
  ES = 5e3,
  DS = 3,
  OS = 5e3,
  kS = 1e4,
  AS = 2e4,
  jS = [],
  MS = !1,
  NS = 0,
  PS = 0,
  FS = new Map(),
  IS = new Set(),
  LS = new Map(),
  RS = 6e5,
  zS = new Map(),
  BS = new Map(),
  VS = new Map(),
  HS = new Map(),
  US = new Set(),
  WS = 0;
function GS(e) {
  return (clearTimeout(BS.get(e)), BS.delete(e), zS.delete(e));
}
function KS(e) {
  return (clearTimeout(HS.get(e)), HS.delete(e), VS.delete(e));
}
function qS(e, t) {
  return `${e}\u0000${t}`;
}
function JS(e) {
  return qS(e.server, e.tool);
}
function YS(e) {
  return e.groups.flatMap((e) => e.tools.map((t) => qS(e.server, t)));
}
function XS(e) {
  return e !== void 0 && !YS(e).some((e) => US.has(e)) ? e : void 0;
}
function ZS() {
  (IS.clear(), LS.clear(), US.clear());
}
function QS(e, t, n = !1) {
  let r = JS(e);
  return n && IS.has(r)
    ? "dismissed-before"
    : n && (LS.get(r)?.until ?? 0) > Date.now()
      ? "backoff"
      : !t && (FS.get(r) ?? 0) > Date.now()
        ? "cooldown"
        : null;
}
function $S(e, t) {
  try {
    e.onRefuse?.(t);
  } catch {}
}
function eC(e, t, n) {
  if (n.budgetMs < OS) return Promise.resolve("timeout");
  let r = Date.now(),
    i = n.activation && (n.activationAt ?? r) - NS > ES;
  i && n.watch !== !0 && LS.delete(JS(t));
  let a = QS(t, i, n.watch);
  if (a !== null) return ($S(n, a), Promise.resolve("suppressed"));
  let o = DS - +(n.watch === !0);
  return jS.length + +!!MS > o
    ? ($S(n, "queue-full"), Promise.resolve("busy"))
    : new Promise((a) => {
        let o = {
            h: e,
            spec: t,
            opts: n,
            gesture: i,
            enqueuedAt: r,
            resolve: a,
          },
          s = (e) => {
            let t = jS.indexOf(o);
            t < 0 || (jS.splice(t, 1), o.resolve(e));
          },
          c = setTimeout(() => s("timeout"), Math.max(0, n.budgetMs - OS)),
          l = () => s("cancelled");
        (n.signal?.addEventListener("abort", l, { once: !0 }),
          (o.resolve = (e) => {
            (clearTimeout(c), n.signal?.removeEventListener("abort", l), a(e));
          }),
          jS.push(o),
          oC());
      });
}
function tC(e) {
  let t = JS(e.spec);
  return (
    (e.spec.canRemember === !0 &&
      ((t) =>
        e.opts.released !== !0 &&
        t > Date.now() &&
        e.enqueuedAt + e.opts.budgetMs - OS > t)(zS.get(t)?.until ?? 0)) ||
    (e.spec.reason === "first_use_with_claude" &&
      e.opts.released !== !0 &&
      (VS.get(t)?.until ?? 0) > Date.now())
  );
}
function nC(e, t) {
  return zS.get(JS({ server: e, tool: t, input: null }))?.token;
}
function rC(e, t, n, r) {
  let i = JS({ server: e, tool: t, input: null }),
    a = zS.get(i),
    o = a !== void 0 && (r === void 0 || a.token === r) && GS(i);
  if (!(!n && !o)) {
    if (n)
      for (let e of jS.filter(
        (e) =>
          e.spec.canRemember === !0 &&
          e.opts.released !== !0 &&
          JS(e.spec) === i,
      ))
        (jS.splice(jS.indexOf(e), 1), e.resolve("remembered"));
    oC();
  }
}
function iC(e, t) {
  return VS.get(qS(e, t))?.token;
}
function aC(e, t, n) {
  let r = new Set(YS(e));
  for (let e of r) {
    let t = VS.get(e);
    t !== void 0 && (n === void 0 || t.token === n) && KS(e);
  }
  if (t)
    for (let e of jS.filter(
      (e) =>
        e.spec.reason === "first_use_with_claude" &&
        e.opts.released !== !0 &&
        r.has(JS(e.spec)),
    ))
      (jS.splice(jS.indexOf(e), 1), e.resolve("covered"));
  oC();
}
function oC() {
  if (MS) return;
  let e = jS.findIndex((e) => !tC(e) && e.opts.watch !== !0),
    t = e >= 0 ? e : jS.findIndex((e) => !tC(e));
  if (t < 0) return;
  let [n] = jS.splice(t, 1);
  n &&
    ((MS = !0),
    sC(n)
      .catch(() => ({ outcome: "unavailable", shown: !1, keys: [JS(n.spec)] }))
      .then(({ outcome: e, shown: t, keys: r }) => {
        let i = e === "allow" || e === "allow_remember" || e === "allow_set";
        if (t && ((NS = Date.now()), !i && e !== "unavailable")) {
          PS = NS;
          let t = e === "deny" || e === "dismissed";
          for (let e of t ? r : [JS(n.spec)])
            (FS.set(e, NS + TS),
              t &&
                n.spec.reason === "first_use_with_claude" &&
                (IS.add(e), US.add(e)));
        }
        if (t && i) for (let e of r) (IS.delete(e), LS.delete(e));
        if (t && e === "timeout" && n.opts.watch === !0)
          for (let e of r) {
            let t = LS.get(e)?.ms,
              n = t === void 0 ? TS : Math.min(t * 2, RS);
            LS.set(e, { ms: n, until: Date.now() + n });
          }
        if (t && e === "allow_set") {
          let e = ++WS;
          for (let t of r)
            (KS(t),
              VS.set(t, { until: Date.now() + B, token: e }),
              HS.set(
                t,
                setTimeout(() => {
                  (KS(t), oC());
                }, B),
              ));
        }
        if (t && e === "allow_remember") {
          let e = JS(n.spec);
          (GS(e),
            zS.set(e, { until: Date.now() + kS, token: ++WS }),
            BS.set(
              e,
              setTimeout(() => {
                (GS(e), oC());
              }, kS),
            ));
        }
        ((MS = !1), n.resolve(e), oC());
      }));
}
async function sC(e) {
  let { h: t, opts: n } = e,
    r = () => n.budgetMs - (Date.now() - e.enqueuedAt),
    i = (t) => ({ outcome: t, shown: !1, keys: [JS(e.spec)] }),
    { set: a, ...o } = e.spec,
    s = o.reason === "first_use_with_claude" ? XS(a) : void 0,
    c = s ? { ...o, set: s } : o,
    l = s ? YS(s) : [JS(c)];
  if (n.signal?.aborted || !n.live()) return i("cancelled");
  if (r() < OS) return i("timeout");
  let u = () => e.gesture && e.enqueuedAt > PS,
    d = QS(c, u(), n.watch);
  if (d !== null) return ($S(n, d), i("suppressed"));
  let f,
    p = await Promise.race([
      t.chromeReady(),
      new Promise((e) => {
        f = setTimeout(() => e(!1), Math.max(0, Math.min(AS, r() - OS)));
      }),
    ]);
  f !== void 0 && clearTimeout(f);
  let m = p ? t.chrome() : null;
  if (!m?.showToolApprovalDialog) return i("unavailable");
  if (n.signal?.aborted || !n.live()) return i("cancelled");
  if (r() < OS) return i("timeout");
  let h = QS(c, u(), n.watch);
  return h === null
    ? n.busy() || t.decisionSurfaceOpen()
      ? ($S(n, "other-dialog"), i("busy"))
      : new Promise((e) => {
          let i = !1,
            a = null,
            o = {},
            u = () => f("cancelled"),
            d = (r) => {
              i ||
                ((i = !0),
                o.id !== void 0 && clearTimeout(o.id),
                n.signal?.removeEventListener("abort", u),
                a !== null &&
                  (t.setCloseConsent(null),
                  t.setDecisionSurfaceOpen(!1),
                  t.restoreContentInteractivity()),
                e({ outcome: r, shown: a !== null, keys: l }));
            },
            f = (e) => {
              (a?.close(), d(e));
            };
          if (
            ((a = m.showToolApprovalDialog(c, {
              onAllow: (e) =>
                d(
                  s
                    ? "allow_set"
                    : e === !0 && c.canRemember === !0
                      ? "allow_remember"
                      : "allow",
                ),
              onDeny: () => d("deny"),
              onDismiss: () => d("dismissed"),
            })),
            !a)
          ) {
            d("unavailable");
            return;
          }
          (n.onPaint?.(c),
            t.setCloseConsent(() => f("unavailable")),
            t.setDecisionSurfaceOpen(!0),
            t.inertContent(),
            (o.id = setTimeout(() => f("timeout"), Math.max(0, r()))),
            n.signal?.addEventListener("abort", u, { once: !0 }));
        })
    : ($S(n, h), i("suppressed"));
}
function cC(e) {
  switch (e) {
    case "first_use_with_claude":
      return "first-use";
    case "connector_requires_approval":
      return "every-use";
    case "first_create_doc":
    case "first_read_doc":
    case "first_update_doc":
      return "doc";
    default:
      return "org-ask";
  }
}
function lC(e, t, n, r) {
  switch (e) {
    case "allow":
    case "allow_remember":
    case "allow_set":
      return "closed:allow";
    case "deny":
      return "closed:cancel";
    case "dismissed":
      return "closed:dismissed";
    case "timeout":
      return t ? "closed:timeout" : "suppressed:no-time";
    case "cancelled":
      return t ? "closed:withdrawn" : `suppressed:${r()}`;
    case "unavailable":
      return t ? "closed:torn-down" : "suppressed:chrome-unavailable";
    case "busy":
      return `suppressed:${n ?? "queue-full"}`;
    case "suppressed":
      return `suppressed:${n ?? "cooldown"}`;
    case "remembered":
    case "covered":
      return null;
  }
}
var uC = ["first_create_doc", "first_read_doc", "first_update_doc"],
  dC = ["first_use_with_claude", ...uC];
function fC(e) {
  return dC.includes(e);
}
var pC = /^[A-Za-z0-9_.-]{1,128}$/,
  mC = 128,
  hC = 128;
function gC(e, t) {
  if (typeof e != "object" || !e) return;
  let { groups: n, token: r } = e;
  if (typeof r != "string" || r === "" || !Array.isArray(n)) return;
  let i = [],
    a = new Set(),
    o = new Set();
  for (let e of n) {
    let { server: t, tools: n } = e ?? {};
    if (
      typeof t != "string" ||
      t === "" ||
      t.length > hC ||
      /\p{Cc}/u.test(t) ||
      a.has(t) ||
      !Array.isArray(n) ||
      n.length === 0
    )
      return;
    a.add(t);
    let r = [];
    for (let e of n) {
      if (
        typeof e != "string" ||
        !pC.test(e) ||
        o.has(qS(t, e)) ||
        o.size >= mC
      )
        return;
      (o.add(qS(t, e)), r.push(e));
    }
    i.push({ server: t, tools: r });
  }
  return o.size >= 2 && o.has(qS(t.server, t.tool))
    ? { set: { groups: i }, token: r }
    : void 0;
}
function _C(e, t) {
  try {
    let n = JSON.parse(e)?.error,
      r = n?.approval?.challenge;
    if (n?.code === "approval_required" && typeof r == "string" && r !== "") {
      let e = n?.approval?.reason,
        i =
          e === "first_use_with_claude" && t !== void 0
            ? gC(n?.approval?.set, t)
            : void 0,
        a =
          fC(e) || e === "connector_requires_approval"
            ? {
                reason: e,
                ...(i && { set: i.set, setToken: i.token }),
                ...(n?.approval?.withClaude === !0 &&
                  (e === "first_read_doc" || e === "first_update_doc") && {
                    withClaude: !0,
                  }),
              }
            : e == null && n?.approval?.canRemember === !0
              ? { canRemember: !0 }
              : {},
        o = n?.approval?.expiresInMs;
      return typeof o != "number" || !Number.isFinite(o)
        ? { challenge: r, ...a }
        : o > 0
          ? { challenge: r, expiresInMs: o, ...a }
          : null;
    }
  } catch {}
  return null;
}
function vC(e) {
  if (typeof e == "object" && e) {
    for (let t of Object.values(e)) vC(t);
    Object.freeze(e);
  }
  return e;
}
function yC() {
  return (document.documentElement.dataset.hostcaps ?? "")
    .split(" ")
    .includes("viewer-context");
}
function bC(e) {
  window.parent.postMessage(e, location.origin);
}
var xC = /^[A-Za-z0-9_-]{1,64}$/;
function SC(e) {
  if (typeof e != "object" || !e) return null;
  let t = e;
  return t.__frame_chrome === !0 &&
    t.cmd === "viewer_context" &&
    typeof t.id == "string" &&
    xC.test(t.id)
    ? t.id
    : null;
}
function CC() {
  let e = null,
    t = "",
    n = 0,
    r = new Set(),
    i = () => {
      for (let e of Array.from(r)) e();
    },
    a = {
      publish(n) {
        let r = null;
        if (typeof n == "object" && n && !Array.isArray(n)) {
          let { cursor: e, follow: t, who: i, ...a } = n;
          r = v(a);
          let o = i === void 0 ? null : v({ who: i });
          r !== null && o !== null && (r = { ...r, who: o.who });
        }
        let a = r === null ? "" : JSON.stringify(r);
        a !== t &&
          ((t = a),
          (e = r === null ? null : Object.freeze({ presence: vC(r) })),
          i());
      },
      withdraw() {
        (e !== null || t !== "") && ((e = null), (t = ""), i());
      },
      own: () => e,
      subscribe(e) {
        return (
          r.add(e),
          () => {
            r.delete(e);
          }
        );
      },
      lease() {
        let e = ++n;
        return {
          publish: (t) => {
            n === e && a.publish(t);
          },
          withdraw: () => {
            n === e && a.withdraw();
          },
        };
      },
    };
  return a;
}
var wC = null,
  TC = null;
function EC(e) {
  return (wC?.uuid !== e && (wC = { uuid: e, holder: CC() }), wC.holder);
}
function DC() {
  return wC?.holder.own() ?? null;
}
function OC(e) {
  if (!Object.hasOwn(e, "who")) return e;
  let { who: t, ...n } = e;
  return Object.keys(n).length > 0 ? Object.freeze(n) : null;
}
function kC() {
  let e = DC(),
    t = e === null ? null : OC(e.presence);
  return t === null ? null : { presence: t };
}
function AC(e) {
  if (TC?.uuid !== e) {
    TC?.responder.dispose();
    let t = jC(e, { holder: EC(e) }),
      n = {
        ...t,
        dispose: () => {
          (t.dispose(), TC?.responder === n && (TC = null));
        },
      };
    TC = { uuid: e, responder: n };
  }
  return TC.responder;
}
function jC(e, t = {}) {
  let n = t.holder ?? CC(),
    r = t.post ?? bC,
    i = t.now ?? (() => Date.now()),
    a = !1,
    o = !1,
    s = "null",
    c = -1 / 0,
    l = 0,
    u = () => {
      let e = n.own();
      return e === null ? null : OC(e.presence);
    },
    d = () => {
      if ((window.clearTimeout(l), (l = 0), !a || o)) return;
      let t = u(),
        n = JSON.stringify(t);
      n !== s &&
        ((s = n),
        (c = i()),
        r({
          __frame_chrome_state: !0,
          state: "viewer_context",
          mode: "ambient",
          uuid: e,
          context: t,
        }));
    },
    f = () => {
      if (!a || o) return;
      let e = Math.min(c + 500 - i(), 500);
      e <= 0 ? d() : l === 0 && (l = window.setTimeout(d, e));
    },
    p = n.subscribe(f),
    m = (t) => {
      let n = window.parent,
        i =
          n === window
            ? t.source === window
            : t.source === n || (n.opener !== null && t.source === n.opener);
      if (t.origin !== location.origin || !i) return;
      let o = SC(t.data);
      o !== null &&
        r({
          __frame_chrome_state: !0,
          state: "viewer_context",
          mode: "ambient",
          uuid: e,
          re: o,
          context: a ? u() : null,
        });
    };
  return (
    window.addEventListener("message", m),
    {
      setForwarding(t) {
        o ||
          a === t ||
          ((a = t),
          window.clearTimeout(l),
          (l = 0),
          t
            ? f()
            : s !== "null" &&
              ((s = "null"),
              r({
                __frame_chrome_state: !0,
                state: "viewer_context",
                mode: "ambient",
                uuid: e,
                context: null,
              })));
      },
      dispose() {
        o ||
          ((o = !0),
          p(),
          window.removeEventListener("message", m),
          window.clearTimeout(l),
          (l = 0));
      },
    }
  );
}
var MC = (e) => {
    let t = e;
    if (t?.consentMode !== "server" || !Array.isArray(t.servers)) return null;
    let n = {};
    for (let e of t.servers) {
      if (!e || typeof e != "object") continue;
      let t = e.server,
        r = e.consent;
      typeof t == "string" && t !== "" && !PC(t) && r !== void 0 && (n[t] = r);
    }
    let r = Ku({ mcp: n });
    return r === null
      ? null
      : { mcp: r.mcp, self: null, sample: null, devices: new Map() };
  },
  NC = () => ({ server: Ru, tools: ["publish"] }),
  PC = (e) => e === Ru;
function FC(e, t) {
  let n;
  try {
    let t = JSON.parse(e);
    for (let e of [t.field, t.detail]) {
      let t = typeof e == "string" ? /^ops\[(\d{1,4})\]/.exec(e) : null;
      if (t) {
        n = Number(t[1]);
        break;
      }
    }
  } catch {
    return null;
  }
  if (n === void 0 || n >= t.length) return null;
  let r = t[n]?.target;
  return { opIndex: n, ...(typeof r == "string" && { target: r }) };
}
var X = (e, t, n) =>
    n === void 0 ? { code: e, message: t } : { code: e, message: t, live: n },
  IC = () => X("not_writer", "this viewer cannot write this document"),
  LC = (e, t) => e === 403 && t?.reason === "doc_read_only",
  RC = (e) => {
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  },
  zC = () =>
    X("conflict", "the document set changed under this edit \u2014 re-issue"),
  BC = () => X("not_writer", Fe),
  VC = (e) => {
    let t = Error(e);
    return ((t.name = _), t);
  };
function Z(e, t, n) {
  let r = { code: e, message: t };
  return (n !== void 0 && (r.server = n), r);
}
var HC = Object.assign(Object.create(null), {
    file_ref_invalid: "bad_request",
    file_ref_not_found: "upstream_error",
    file_ref_expired: "upstream_error",
    file_ref_unavailable: "server_unavailable",
  }),
  UC = new Map();
function WC() {
  UC.clear();
}
var GC = (e, t, n, r, i) => JSON.stringify([e, t, n, r ?? null, i]),
  KC = (e) => `held-watch:${e}`,
  qC = new Map(),
  JC = new Set(),
  YC = 1e3;
function XC() {
  for (let e of JC) e();
}
function ZC(e, t) {
  for (let n of qC.values()) if (n.cacheBody === t && dw(e, n)) return !0;
  return !1;
}
var QC = 64,
  $C = 3e4,
  ew = null;
function tw(e) {
  ew = e;
}
var nw = new Set(["needs_reauth", "server_not_connected"]),
  rw = new Set(["server_unavailable", "rate_limited", "upstream_error"]),
  iw = null,
  aw = null;
function ow(e) {
  aw?.(e);
}
var sw = null;
function cw(e) {
  sw?.(e);
}
function lw(e) {
  let t = ew;
  if (!t) return !1;
  for (let n of qC.values())
    if (n.authzFailed === !0 && n.server === e && dw(t, n)) return !0;
  return !1;
}
function uw(e, t, n) {
  for (let r of qC.values())
    if (!(r.cacheBody !== t || !dw(e, r)) && "error" in n) {
      if (
        nw.has(n.error.code) ||
        (rf(r.server) && n.error.code === "not_in_manifest")
      )
        ((r.authzFailed = !0), iw?.(r.server));
      else if (r.authzFailed === !0) {
        if (rf(r.server)) {
          rw.has(n.error.code) || (r.authzFailed = !1);
          continue;
        }
        iw?.(r.server, !0);
      }
    }
  let r = ew;
  if (!r || !dw(r, e)) return;
  let i =
    !("error" in n) &&
    n.result !== null &&
    typeof n.result == "object" &&
    !Array.isArray(n.result)
      ? n.result.cache?.storedAt
      : void 0;
  for (let a of qC.values())
    if (!(a.cacheBody !== t || !dw(e, a))) {
      if (i !== void 0) {
        if (
          a.lastServedStoredAt === i ||
          (a.lastFreshAt !== void 0 && i <= a.lastFreshAt)
        )
          continue;
        a.lastServedStoredAt = i;
      } else "error" in n || (a.lastFreshAt = Date.now());
      (!("error" in n) &&
        a.authzFailed === !0 &&
        ((a.authzFailed = !1), iw?.(null)),
        r.postEv(
          a.watchId,
          "error" in n
            ? { type: "error", error: n.error }
            : { type: "data", server: a.server, result: n.result },
        ));
    }
}
function dw(e, t) {
  return (
    e.gen === t.gen &&
    e.frameUuid === t.frameUuid &&
    e.account === t.account &&
    e.org === t.org
  );
}
function fw(e, t, n) {
  let r = ew,
    i = !1;
  for (let [a, o] of qC)
    e(o) &&
      (o.pollTimer !== void 0 && clearTimeout(o.pollTimer),
      qC.delete(a),
      o.authzFailed === !0 && (i = !0),
      r &&
        dw(r, o) &&
        r.postEv(o.watchId, { type: "error", error: Z(t, n, o.server) }));
  (i && iw?.(null), XC());
}
function pw(e, t) {
  fw(() => !0, e, t);
}
function mw() {
  (hw(),
    oa(),
    ts(),
    sA("closed"),
    eA?.(),
    GO?.(),
    ZS(),
    mk.clear(),
    hk.clear(),
    gk.clear(),
    bk.clear(),
    xk.clear(),
    yA(),
    (Rk = null),
    pw("needs_reauth", "viewer session changed"));
}
function hw() {
  (zg(), WC());
}
var gw = () => !1;
function _w(e) {
  return (typeof document < "u" && document.hidden) || (rf(e.server) && gw());
}
function vw() {
  let e = ew;
  if (e)
    for (let t of qC.values())
      !t.catchUp || !dw(e, t) || _w(t) || ((t.catchUp = !1), e.execute(t));
}
function yw() {
  vw();
}
typeof document < "u" &&
  document.addEventListener("visibilitychange", () => {
    document.visibilityState === "visible" && (iw?.(null), vw());
  });
function bw(e) {
  if (e.refetchIntervalMs === void 0) return;
  e.pollTimer !== void 0 && clearTimeout(e.pollTimer);
  let t = Math.min(Math.max(e.refetchIntervalMs, $C), 2147483647);
  e.pollTimer = setTimeout(() => {
    if (((e.pollTimer = void 0), qC.get(e.key) !== e)) return;
    let t = ew;
    !t || !dw(t, e) || (_w(e) ? (e.catchUp = !0) : t.execute(e), bw(e));
  }, t);
}
function xw(e, t) {
  for (let n of e.servers ?? []) {
    if (typeof n.server != "string" || n.server === "") continue;
    let e = t.get(n.server);
    if (!e) continue;
    let r =
      typeof n.resolvedId == "string" && n.resolvedId !== ""
        ? n.resolvedId
        : void 0;
    if (Array.isArray(n.candidates) && n.candidates.length > 1 && r === void 0)
      continue;
    let i = UC.get(n.server);
    r !== void 0 &&
      i !== void 0 &&
      i.resolvedId !== r &&
      ((i = void 0), UC.delete(n.server));
    for (let t of n.tools ?? []) {
      if (typeof t.name != "string" || t.name === "" || !e.has(t.name))
        continue;
      let a = t.annotations;
      if (!a || typeof a != "object") continue;
      let o = {};
      if (
        (typeof a.readOnlyHint == "boolean" && (o.readOnly = a.readOnlyHint),
        typeof a.destructiveHint == "boolean" &&
          (o.destructive = a.destructiveHint),
        (o.readOnly !== void 0 || o.destructive !== void 0) &&
          (i || ((i = { byTool: new Map() }), UC.set(n.server, i)),
          r !== void 0 && (i.resolvedId = r),
          i.byTool.set(t.name, o),
          o.readOnly === !1))
      ) {
        let e = n.server,
          r = t.name,
          i = ew;
        fw(
          (t) => t.server === e && t.tool === r && i !== null && dw(i, t),
          "bad_request",
          "declared-write tools cannot be watched",
        );
      }
    }
  }
}
var Q = 0,
  Sw =
    '.consent, [data-frame-decision-surface], [data-cds="ConfirmationDialog"], [data-rename-input]',
  Cw = 0;
function ww() {
  return (
    (Q += 1),
    (Cw = 0),
    WC(),
    hk.clear(),
    gk.clear(),
    bk.clear(),
    xk.clear(),
    yA(),
    sA("closed"),
    nx(Ew),
    vO(),
    Tw.abort(),
    (Tw = new AbortController()),
    iT?.close(),
    (iT = null),
    aT?.close(),
    (aT = null),
    (oT = null),
    Q
  );
}
var Tw = new AbortController(),
  Ew = new Set();
function Dw() {
  (ww(),
    Zm(),
    Ow?.dispose(),
    (Ow = null),
    (Mw = null),
    (Fw = null),
    (XT = null),
    (Qw = null),
    (Iw = null),
    (Lw = null),
    (Rw = null),
    (zw = null),
    (Bw = null),
    (Vw = null),
    (Hw = null),
    (Uw = null),
    (Ww = null),
    (Gw = null),
    (Kw = null),
    (qw = null),
    (Jw = !1),
    (Zw = null),
    (cT = null),
    (lT = null),
    (uT = null),
    (_T = null),
    (tT = null),
    (nT = null),
    (rT = null),
    ($w = null),
    (eT = null),
    (ew = null),
    fw(() => !0, "capability_disabled", "frame re-booted"));
}
var Ow = null,
  kw = () => (Ow ??= ff());
function Aw(e) {
  if (!e || typeof e != "object") return;
  let { readOnlyHint: t, destructiveHint: n } = e;
  if (typeof t == "boolean" || typeof n == "boolean")
    return {
      ...(typeof t == "boolean" && { readOnlyHint: t }),
      ...(typeof n == "boolean" && { destructiveHint: n }),
    };
}
function jw(e, t) {
  let n = [];
  for (let [r, i] of t) {
    if (!rf(r)) continue;
    let t = e.get(r);
    t &&
      n.push({
        server: r,
        authStatus: "not_required",
        tools: [...t.values()].flatMap((e) =>
          i.has(e.name)
            ? [
                {
                  name: e.name,
                  description: e.description,
                  ...(e.annotations && { annotations: { ...e.annotations } }),
                },
              ]
            : [],
        ),
      });
  }
  return n;
}
var Mw = null,
  Nw = null,
  Pw = (e) =>
    e.gen === Q ||
    (Mw !== null && Mw.org === e.org && Mw.account === e.account),
  Fw = null,
  Iw = null,
  Lw = null,
  Rw = null,
  zw = null,
  Bw = null,
  Vw = null,
  Hw = null,
  Uw = null,
  Ww = null,
  Gw = null,
  Kw = null,
  qw = null,
  Jw = !1,
  Yw = null;
function Xw(e) {
  return Yw?.(e) ?? !1;
}
var Zw = null,
  Qw = null,
  $w = null,
  eT = null,
  tT = null,
  nT = null,
  rT = null,
  iT = null,
  aT = null,
  oT = null,
  sT = rx("readaloud"),
  cT = null,
  lT = null,
  uT = null,
  dT = new Map(),
  fT = (e, t, n) => `${e}|${t ?? ""}|${n}`,
  pT = null;
function mT(e) {
  let t = new Map(),
    n = e?.floors;
  if (!n || typeof n != "object") return t;
  for (let e of Nu) {
    let r = n[e];
    typeof r == "number" && Number.isSafeInteger(r) && r > 0 && t.set(e, r);
  }
  return t;
}
function hT(e, t) {
  if (pT?.uuid === e) {
    pT.ch.postMessage(t);
    return;
  }
  if (typeof BroadcastChannel != "function") return;
  let n = null;
  try {
    ((n = new BroadcastChannel(`frame-device-consent:${e}`)), n.postMessage(t));
  } catch {
  } finally {
    n?.close();
  }
}
function gT(e) {
  if (pT?.uuid === e) return pT.ch;
  if (typeof BroadcastChannel != "function") return null;
  (pT?.ch.close(), (pT = null));
  try {
    let t = new BroadcastChannel(`frame-device-consent:${e}`);
    return (
      (t.onmessage = (t) => {
        t.data?.uuid === e &&
          uT?.frameUuid === e &&
          uT.onPeerDecision(mT(t.data));
      }),
      (pT = { uuid: e, ch: t }),
      t
    );
  } catch {
    return null;
  }
}
var _T = null,
  vT = new Map(),
  yT = new Map(),
  bT = (e, t, n) => `${e}|${t ?? ""}|${n}`;
function xT(e, t) {
  vT.set(e, Math.max(vT.get(e) ?? -1, t));
}
function ST() {
  (vT.clear(), yT.clear());
}
var CT = "frame-messages-refusal:";
function wT(e) {
  try {
    let t = window.localStorage.getItem(CT + e);
    if (t === null) return null;
    let [n, r] = t.split(":").map(Number);
    return {
      seq: Number.isSafeInteger(n) && n >= 0 ? n : 0,
      press: Number.isFinite(r) ? r : 0,
    };
  } catch {
    return null;
  }
}
function TT(e, t, n) {
  try {
    window.localStorage.setItem(CT + e, `${t}:${n}`);
  } catch {}
}
var ET = null,
  DT = !1;
function OT() {
  let e = ET;
  ((ET = null), e?.());
}
function kT(e) {
  ((ET = e), !DT && ((DT = !0), window.addEventListener("online", OT)));
}
function AT(e, t) {
  let n = wT(e);
  if (!(n === null || (n.press > t && n.press <= Date.now())))
    try {
      window.localStorage.removeItem(CT + e);
    } catch {}
}
var jT = null;
function MT(e) {
  if (jT?.uuid === e) return jT.ch;
  if (typeof BroadcastChannel != "function") return null;
  (jT?.ch.close(), (jT = null));
  try {
    let t = new BroadcastChannel(`frame-messages-consent:${e}`);
    return (
      (t.onmessage = (t) => {
        let n = t.data;
        typeof n?.viewer == "string" &&
          n.viewer.startsWith(`${e}|`) &&
          typeof n.floor == "number" &&
          Number.isSafeInteger(n.floor) &&
          n.floor > 0 &&
          (xT(n.viewer, n.floor - 1),
          _T?.onPeerRefusal(n.viewer, n.floor, n.pressed === !0));
      }),
      (jT = { uuid: e, ch: t }),
      t
    );
  } catch {
    return null;
  }
}
function NT(e, t, n, r = !1) {
  if (n <= 0) return;
  let i = { viewer: t, floor: n, ...(r && { pressed: r }) };
  if (jT?.uuid === e) {
    jT.ch.postMessage(i);
    return;
  }
  if (typeof BroadcastChannel != "function") return;
  let a = null;
  try {
    ((a = new BroadcastChannel(`frame-messages-consent:${e}`)),
      a.postMessage(i));
  } catch {
  } finally {
    a?.close();
  }
}
function PT(e, t) {
  if (!t) return !1;
  let n = t.account;
  return typeof n != "string" ||
    n === "" ||
    n === "-" ||
    e.account === "" ||
    e.account === "-"
    ? !1
    : e.account === n && e.org === t.org;
}
function FT(e) {
  let t = _T;
  return !t || !PT(t.consentSlot, e) ? Promise.resolve("unavailable") : t.ask();
}
var IT = new Map(),
  LT = "frame-dictation-refusal:",
  RT = null,
  zT = !1;
function BT() {
  let e = RT;
  ((RT = null), e?.());
}
function VT(e) {
  ((RT = e), !zT && ((zT = !0), window.addEventListener("online", BT)));
}
function HT(e) {
  try {
    let t = window.localStorage.getItem(LT + e);
    if (t === null) return null;
    let [n, r] = t.split(":").map(Number);
    return {
      seq: Number.isSafeInteger(n) && n >= 0 ? n : 0,
      press: Number.isFinite(r) ? r : 0,
    };
  } catch {
    return null;
  }
}
function UT(e, t, n) {
  try {
    return (window.localStorage.setItem(LT + e, `${t}:${n}`), !0);
  } catch {
    return !1;
  }
}
function WT(e, t) {
  let n = HT(e);
  if (!(n === null || n.press > t))
    try {
      window.localStorage.removeItem(LT + e);
    } catch {}
}
var GT = null,
  KT = (e, t, n) => `${e}|${t ?? ""}|${n}`;
function qT(e, t) {
  IT.set(e, Math.max(IT.get(e) ?? 0, t));
}
function JT(e, t) {
  if (GT?.uuid === e && t !== null) {
    GT.onRevoke = t;
    return;
  }
  if (
    (GT?.ch.close(),
    (GT = null),
    t !== null && typeof BroadcastChannel == "function")
  )
    try {
      let n = new BroadcastChannel(`frame-dictation-consent:${e}`),
        r = { uuid: e, ch: n, onRevoke: t };
      ((n.onmessage = (t) => {
        let n = t.data;
        if (typeof n?.key != "string" || !n.key.startsWith(`${e}|`)) return;
        let i = typeof n.seq == "number" ? n.seq : 0;
        (qT(n.key, i), r.onRevoke(n.key, i));
      }),
        (GT = r));
    } catch {}
}
function YT(e, t, n) {
  qT(t, n);
  let r = { key: t, seq: n };
  if (GT?.uuid === e) {
    (GT.onRevoke(t, n), GT.ch.postMessage(r));
    return;
  }
  if (typeof BroadcastChannel != "function") return;
  let i = null;
  try {
    ((i = new BroadcastChannel(`frame-dictation-consent:${e}`)),
      i.postMessage(r));
  } catch {
  } finally {
    i?.close();
  }
}
var XT = null,
  ZT = !1;
function QT(e, t) {
  let n = Mw ?? Nw;
  if (!n) return;
  let r = typeof e.assetToken == "string" ? z(e.assetToken) : null;
  (r === null || n.org !== t || n.account !== r) && (mw(), Mw || (Nw = null));
}
function $T(e, t) {
  return e.decisionSeq > t.seq || (t.seq === 0 && e.decisionSeq === 0);
}
function eE(e, t) {
  $T(t, e)
    ? ((e.seq = t.decisionSeq), (e.sample = t))
    : t.decisionSeq === e.seq &&
      e.sample !== null &&
      e.sample.imagesGranted === void 0 &&
      t.imagesGranted !== void 0 &&
      (e.sample = {
        ...e.sample,
        imagesGranted: t.imagesGranted,
        ...(t.disclosure !== void 0 && { disclosure: t.disclosure }),
      });
}
function tE(e, t) {
  let n = typeof e.assetToken == "string" ? z(e.assetToken) : null,
    r = oT;
  try {
    r?.follow(
      e,
      n !== null && r.consentSlot.org === t && r.consentSlot.account === n,
    );
  } catch {}
  if (n === null) return;
  nE(e.publishPreconditions === !0, n, t);
  let i = FA(e)?.token;
  i && Mw && Mw.org === t && Mw.account === n && (Mw.value = i);
  let a = ge(e)?.token;
  a && Fw && Fw.org === t && Fw.account === n && (Fw.value = a);
  let o = e.consentToken;
  typeof o == "string" &&
    o !== "" &&
    Iw &&
    Iw.org === t &&
    Iw.account === n &&
    (Iw.value = o);
  let { handoffToken: s, mcpFileArgs: c } = e;
  c === !0 &&
    typeof s == "string" &&
    s !== "" &&
    Lw &&
    Lw.org === t &&
    Lw.account === n &&
    (Lw.value = s);
  let l = Ve(e)?.token;
  l && zw && zw.org === t && zw.account === n && (zw.value = l);
  let u = be(e),
    d = Bw !== null && Bw.org === t && Bw.account === n;
  if ((u && Bw && d && (Bw.value = u.token), u && Vw)) {
    let e = u.viewer,
      t = d && Vw.account === e.account;
    ((Vw.unbound = !t),
      (Vw.peers = t && e.peers),
      (Vw.mayComment = t && e.mayComment),
      (Vw.outsideWritten = !t || e.outsideWritten),
      (Vw.mintEnforced = t && e.mintEnforced),
      (t || e.token === "") && (Vw.token = e.token));
  } else
    Vw &&
      ((Vw.mayComment = !1), (Vw.outsideWritten = !0), (Vw.mintEnforced = !1));
  let f = F(e)?.grant;
  typeof f == "string" &&
    f !== "" &&
    new TextEncoder().encode(f).length <= 4096 &&
    Hw &&
    Hw.org === t &&
    Hw.account === n &&
    (Hw.value = f);
  let p = F(e);
  p && Uw && Hw && Hw.org === t && Hw.account === n && (Uw.value = Te(e, p));
  let h = Ae(e)?.token;
  h && Gw && Gw.org === t && Gw.account === n && (Gw.value = h);
  let g = E(e)?.token;
  g && Kw && Kw.org === t && Kw.account === n && (Kw.value = g);
  let _ = ae(e)?.token;
  (_ && qw && qw.org === t && qw.account === n && (qw.value = _),
    Mw &&
      Mw.org === t &&
      Mw.account === n &&
      ((Jw = se(e)), Ww && (Ww.value = e.mcpOrgSettingOff === !0)));
  let v = m(e)?.token;
  v && Zw && Zw.org === t && Zw.account === n && (Zw.value = v);
  let y = A(e)?.token;
  y && Qw && Qw.org === t && Qw.account === n && (Qw.value = y);
  let b = cT;
  b &&
    b.consentSlot.org === t &&
    b.consentSlot.account === n &&
    zd(b.ctl, PA(e));
  let x = lT;
  if (x && x.consentSlot.org === t && x.consentSlot.account === n) {
    let t = Ku(e.consent)?.sample ?? null;
    t !== null && eE(x.ctl, t);
  }
  let S = e.capabilities?.files?.config,
    w = nT !== null && S?.project === nT,
    T = k(e)?.token;
  tT &&
    tT.org === t &&
    tT.account === n &&
    (!w && typeof S?.project == "string"
      ? (tT.value = "")
      : w && T && (tT.value = T));
  let D = ce(e)?.token;
  D && $w && $w.org === t && $w.account === n && ($w.value = D);
  let O = C(e)?.token;
  O && eT && eT.org === t && eT.account === n && (eT.value = O);
  let j = rT;
  if (w && j && j.consentSlot.org === t && j.consentSlot.account === n) {
    let t = Ku(e.consent)?.files ?? null;
    t !== null &&
      t.decisionSeq > j.ctl.seq &&
      ((j.ctl.seq = t.decisionSeq),
      (j.ctl.granted = t.granted),
      (j.ctl.revoked = t.revoked));
  }
  let M = uT;
  M &&
    M.consentSlot.org === t &&
    M.consentSlot.account === n &&
    M.reconcile(e.consent);
  let ee = _T;
  ee &&
    ee.consentSlot.org === t &&
    ee.consentSlot.account === n &&
    ee.reconcile(e.consent);
}
function nE(e, t, n) {
  let r = XT;
  if (!r?.state || r.slot.org !== n || r.slot.account !== t) return;
  let i = r.state;
  YE(i, (t) => {
    (XT === r && (i.preconditions = e && Date.now() >= PE), t());
  });
}
function rE(e, t, n) {
  let r = typeof e.assetToken == "string" ? z(e.assetToken) : null;
  r !== null && iE(r, t, n);
}
function iE(e, t, n) {
  if (n === "") return;
  let r = XT;
  if (!r?.state || r.slot.org !== t || r.slot.account !== e) return;
  let i = r.state,
    a = i.ownMoves;
  YE(i, (e) => {
    (XT === r && i.ownMoves === a && (i.ver = n), e());
  });
}
var aE = 3e4,
  oE = 5e3;
function sE(e, t, n) {
  return n.aborted
    ? Promise.resolve(!1)
    : new Promise((r) => {
        let i = (e) => {
            (window.clearTimeout(o), n.removeEventListener("abort", a), r(e));
          },
          a = () => i(!1),
          o = window.setTimeout(() => i(!1), t);
        (n.addEventListener("abort", a, { once: !0 }), e.then(i, () => i(!1)));
      });
}
function cE(e) {
  try {
    return { ok: !0, input: lE(JSON.parse(e).input) };
  } catch {
    return { ok: !1 };
  }
}
function lE(e) {
  if (typeof e != "object" || !e) return e;
  if (Array.isArray(e)) return e.map(lE);
  let t = e,
    n = t.$frameHandoff;
  return n && typeof n == "object" && Object.keys(t).length === 1
    ? { $frameHandoff: { id: n.id } }
    : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, lE(t)]));
}
var uE = (e) => ({
    status: 0,
    ok: !1,
    text: JSON.stringify({ error: e }),
    noStore: !0,
  }),
  dE = (e) => {
    let t = Z(
      "server_unavailable",
      `${e} is not available while this artifact is hidden \u2014 try again once it is shown`,
      e,
    );
    return ((t.retryable = !0), t);
  },
  fE = async (e, t, n) => {
    if (e === null)
      return Z(
        "server_not_connected",
        `${t} is not available on this surface \u2014 host tools need the Claude app`,
        t,
      );
    await e.ready();
    let r = e.inventory().get(t);
    if (
      (r === void 0 &&
        e.withheld(t) !== null &&
        (await pf(e), (r = e.inventory().get(t))),
      r === void 0)
    ) {
      let n = e.withheld(t);
      return Z(
        "server_not_connected",
        n === null
          ? `${t} is not connected on this device`
          : `${t} is not available: ${n.message}`,
        t,
      );
    }
    return r.has(n)
      ? null
      : Z(
          "not_in_manifest",
          `${t} does not offer a tool named "${n}" on this device`,
          t,
        );
  },
  pE = (e) => {
    let t = String(e),
      n = [...t];
    return n.length > 128 ? `${n.slice(0, 127).join("")}\u2026` : t;
  },
  mE = (e) => document.getElementById(e),
  hE = 9e4,
  gE = 3e4;
function _E(e, t) {
  try {
    let e = JSON.parse(t);
    if (e.conflict === !0)
      return X(
        "conflict",
        "a newer version is live",
        typeof e.live == "string" ? e.live : void 0,
      );
    if (e.error === "frame_daily_push_cap_reached")
      return X("rate_limited", "daily publish limit reached");
    if (e.error === "frame_daily_runtime_publish_cap_reached")
      return X(
        "rate_limited",
        "daily limit for publishing from inside artifacts reached",
      );
  } catch {}
  return e === 404 || (e === 403 && Qe(t))
    ? X("not_writer", "this viewer cannot write this artifact")
    : e === 403
      ? t.includes("not declared")
        ? X("not_declared", "the artifact no longer declares self-update")
        : X("upstream_error", `request failed (${e})`)
      : e === 400
        ? /exceeds \d+ bytes/.test(t)
          ? X("too_large", "the page exceeds the size limit")
          : X("invalid_content", "the submitted page was rejected")
        : e === 413
          ? X("too_large", "the page exceeds the size limit")
          : e === 422
            ? t.includes("built from an artifact type")
              ? X(
                  "read_only_path",
                  "this artifact's page belongs to its type and cannot be replaced",
                )
              : DE(t)
                ? X("too_large", "the page exceeds the size limit")
                : X("invalid_content", "the submitted page was rejected")
            : e === 429
              ? X("rate_limited", "publishing too often")
              : X("upstream_error", `request failed (${e})`);
}
var vE = 256,
  yE = 512,
  bE = 255,
  xE = 16777216,
  SE = 20971520,
  CE = 32768,
  wE = new Set([
    "text/html",
    "text/css",
    "text/plain",
    "text/markdown",
    "text/csv",
    "text/javascript",
    "application/javascript",
    "application/json",
    "application/manifest+json",
    "application/xml",
    "text/xml",
    "image/svg+xml",
  ]),
  TE = "this file belongs to the artifact's type and can't be changed here",
  EE = [
    "this artifact is shared publicly, and multi-file artifacts can't be shared publicly yet. Turn off public sharing, then publish again.",
    "this artifact embeds other artifacts, so its page publishes with content, not a manifest",
  ];
function DE(e) {
  let t = e.trim();
  return (
    (/exceeds \d+ bytes$/.test(t) && !t.startsWith("manifest path ")) ||
    t.startsWith("manifest total size exceeds ") ||
    t.startsWith("manifest entries total more than ")
  );
}
var OE = class extends Error {};
function kE(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    r < 128
      ? (t += 1)
      : r < 2048
        ? (t += 2)
        : r >= 55296 && r <= 56319 && n + 1 < e.length
          ? ((t += 4), n++)
          : (t += 3);
  }
  return t;
}
function AE(e, t) {
  if (e === 422) {
    if (t.trimEnd().endsWith(TE))
      return X(
        "read_only_path",
        "a named file belongs to the artifact's type and is read-only",
      );
    if (EE.includes(t.trim()))
      return X(
        "capability_disabled",
        "publishing files is not available for this artifact",
      );
  }
  return e === 400 && /^bad json: .*unknown field/.test(t)
    ? X("capability_disabled", "publishing files is not available in this view")
    : e === 413
      ? X("too_large", "the submitted files exceed the size limit")
      : e === 400 || e === 422
        ? DE(t)
          ? X("too_large", "the submitted files exceed the size limit")
          : X("invalid_content", "the submitted files were rejected")
        : _E(e, t);
}
var jE = /^[0-9a-f]{64}$/,
  ME = 4096,
  NE = 3e5,
  PE = 0,
  FE = /^manifest entry .*: unknown field "(?:ifMatch|delete)"\s*$/;
function IE(e) {
  return e == null || (typeof e == "string" && jE.test(e)) ? e : !1;
}
function LE(e) {
  if (!Array.isArray(e) || e.length > ME) return;
  let t = [],
    n = new Set();
  for (let r of e) {
    let e = typeof r == "object" && r ? r : {},
      i = IE(e.sha256);
    if (
      typeof e.path != "string" ||
      e.path === "" ||
      e.path.includes("\0") ||
      kE(e.path) > yE ||
      n.has(e.path) ||
      i === void 0 ||
      i === !1
    )
      return;
    (n.add(e.path), t.push({ path: e.path, sha256: i }));
  }
  return t;
}
function RE(e) {
  let t = (e) => ({ error: X("invalid_content", e) });
  if (typeof e != "object" || !e || Array.isArray(e))
    return t("publish takes an HTML string or a files object");
  let n;
  try {
    n = Object.entries(e);
  } catch {
    return t("files must be plain data");
  }
  if (n.length === 0 || n.length > vE)
    return t(`files must name between 1 and ${vE} paths`);
  let r = [],
    i = 0;
  for (let [e, a] of n) {
    if (e === "" || kE(e) > yE)
      return t(`a file path must be 1 to ${yE} bytes`);
    if (a === null) {
      r.push([e, null]);
      continue;
    }
    if (typeof a != "object" || Array.isArray(a) || a instanceof Blob)
      return t(`${e}: expected {content, contentType}, {delete: true} or null`);
    let n,
      o,
      s,
      c,
      l = 0;
    try {
      ((n = a.content),
        (o = a.contentType),
        (s = a.ifMatch),
        (c = a.delete),
        n instanceof Blob && (l = n.size));
    } catch {
      return t("files must be plain data");
    }
    let u = IE(s);
    if (u === !1)
      return t(
        `${e}: ifMatch must be the file's sha256 as 64 lowercase hex characters, or null`,
      );
    if (c !== void 0) {
      if (c !== !0 || n !== void 0 || u === null)
        return t(
          `${e}: a delete is {delete: true}, optionally with ifMatch set to the file's sha256 (ifMatch: null is not allowed)`,
        );
      r.push([e, u === void 0 ? null : { delete: !0, ifMatch: u }]);
      continue;
    }
    if (typeof o != "string" || o === "" || o.length > bE)
      return t(`${e}: contentType must be a non-empty string`);
    let d = o.toLowerCase().split(";")[0].trim();
    if (d === "") return t(`${e}: contentType must be a non-empty string`);
    let f = wE.has(d);
    if (typeof n == "string") {
      if (!f)
        return t(
          `${e}: string content needs a text media type (html, css, js, json, plain, markdown, csv, xml, svg); send other content as a Blob`,
        );
      i += kE(n);
    } else if (n instanceof Blob) i += f ? l : Math.ceil(l / 3) * 4;
    else return t(`${e}: content must be a string or a Blob`);
    if (i > xE)
      return {
        error: X(
          "too_large",
          "the files exceed the size limit for one publish",
        ),
      };
    r.push([
      e,
      { content: n, contentType: d, ...(u !== void 0 && { ifMatch: u }) },
    ]);
  }
  return { entries: r };
}
async function zE(e) {
  let t = new Uint8Array(await e.arrayBuffer()),
    n = "",
    r = 32768;
  for (let e = 0; e < t.length; e += r)
    n += String.fromCharCode(...t.subarray(e, e + r));
  return btoa(n);
}
var BE = class extends Error {};
async function VE(e) {
  let n = await e.arrayBuffer();
  try {
    return new TextDecoder("utf-8", { fatal: !0, ignoreBOM: !0 }).decode(n);
  } catch {
    throw t(new BE("not UTF-8"), "not UTF-8", "literal");
  }
}
async function HE(e, t) {
  let n = Object.create(null);
  for (let [r, i] of e) {
    if (i === null) {
      n[r] = null;
      continue;
    }
    if ("delete" in i) {
      n[r] = t ? i : null;
      continue;
    }
    n[r] = {
      content:
        typeof i.content == "string"
          ? i.content
          : wE.has(i.contentType)
            ? await VE(i.content)
            : await zE(i.content),
      contentType: i.contentType,
      ...(t && i.ifMatch !== void 0 && { ifMatch: i.ifMatch }),
    };
  }
  return n;
}
function UE(e) {
  e.requestRebootAfterWrite ? e.requestRebootAfterWrite() : e.requestReboot();
}
function WE(e, t) {
  let n = typeof e == "object" && e ? e : {},
    r = Object.create(null);
  for (let [e, i] of t) {
    if (i === null || "delete" in i || !Object.hasOwn(n, e)) continue;
    let t = IE(n[e]?.sha256);
    typeof t == "string" && (r[e] = t);
  }
  return r;
}
function GE(e, t, n, r) {
  if (e.code !== "conflict") return e;
  let i;
  try {
    i = JSON.parse(t);
  } catch {
    return e;
  }
  let a = r ? LE(i.changed) : void 0,
    o = a === void 0 ? e : { ...e, changed: a },
    s = i.paths;
  if (!Array.isArray(s)) return o;
  let c = new Map(n.map(([e, t]) => [e, t?.ifMatch])),
    l = [];
  for (let e of s.slice(0, vE)) {
    let t = typeof e == "object" && e ? e : {},
      n = typeof t.path == "string" ? c.get(t.path) : void 0,
      r = IE(t.actual);
    n !== void 0 &&
      r !== void 0 &&
      r !== !1 &&
      (c.delete(t.path), l.push({ path: t.path, expected: n, actual: r }));
  }
  return l.length > 0
    ? { ...o, message: "a named file has changed since it was read", paths: l }
    : o;
}
function KE(e) {
  e.requestReboot().catch((t) => {
    e.markHandled(t);
  });
}
function qE(e) {
  let {
      h: t,
      slot: n,
      baseVersion: r,
      fields: i,
      project: a,
      onPublished: o,
    } = e,
    s = !1,
    c = (t) => {
      s || ((s = !0), e.onSettle(t));
    };
  if (r === "")
    return c({ error: X("upstream_error", "missing version context") });
  let l = e.armedAt ?? Date.now(),
    u = Math.min(hE, B - (Date.now() - l) - qe);
  if (u <= 0) return c({ error: X("upstream_error", "request timed out") });
  let d = t.org ? `?org=${encodeURIComponent(t.org)}` : "",
    f = async (e) => {
      let a = JSON.stringify({ ...i, baseVersion: r, token: n.value }),
        o = kE(a);
      if (o > SE) throw new OE();
      let s = et(e),
        c = (e) =>
          fetch(`/api/frame/self/${t.frameUuid}${d}`, {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json", ...t.cpHeaders },
            body: a,
            signal: s,
            keepalive: e,
          }),
        l = await (o > CE
          ? c(!1)
          : c(!0).catch((e) => {
              if (!(e instanceof TypeError)) throw e;
              return (t.markHandled(e), c(!1));
            }));
      return { status: l.status, ok: l.ok, text: await l.text() };
    },
    p = (e) => {
      (t.markHandled(e),
        c({
          error:
            e instanceof OE
              ? X("too_large", "the publish exceeds the size limit")
              : X("upstream_error", "request failed"),
        }));
    },
    m = (t, n) => {
      let r = f(t).then(n).catch(p);
      e.onAttempt?.(r);
    },
    h = (n) => {
      if (!n.ok) {
        let r = a(n.status, n.text);
        (c({ error: r }),
          r.code === "conflict" &&
            (e.conflictBoot ? e.conflictBoot() : t.requestReboot()),
          n.status === 403 && Qe(n.text) && KE(t));
        return;
      }
      let r = "",
        i,
        s = {};
      try {
        let t = JSON.parse(n.text);
        (typeof t.version == "string" && (r = t.version),
          typeof t.appliedOver == "string" && (i = t.appliedOver),
          (s = e.resultOf?.(t) ?? {}));
      } catch {}
      if (r === "")
        return c({ error: X("upstream_error", "malformed response") });
      (c({ result: { ...s, version: r } }), o(r, i));
    },
    g = n.value;
  m(u, (e) => {
    if (e.status === 403 && !e.text.includes("not declared") && !$e(e.text)) {
      t.requestReboot()
        .then(() => {
          let t = B - (Date.now() - l) - qe;
          if (n.value !== g && t > 0) {
            m(Math.min(gE, t), h);
            return;
          }
          h(e);
        })
        .catch(p);
      return;
    }
    h(e);
  });
}
function JE(e) {
  let { h: t, slot: n, baseVersion: r, html: i, armedAt: a, onSettle: o } = e;
  qE({
    h: t,
    slot: n,
    baseVersion: r,
    fields: { content: i },
    ...(a !== void 0 && { armedAt: a }),
    project: _E,
    onPublished: () => void t.requestReboot(),
    onSettle: o,
  });
}
function YE(e, t) {
  e.tail = e.tail
    .catch(() => void 0)
    .then(
      () =>
        new Promise((e) => {
          try {
            t(e);
          } catch {
            e();
          }
        }),
    );
}
function XE(e) {
  let {
      h: t,
      slot: n,
      state: r,
      entries: i,
      frame: a,
      live: o,
      onSettle: s,
    } = e,
    c = Date.now();
  YE(r, (e) => {
    let l = (t) => {
        try {
          s(t);
        } finally {
          e();
        }
      },
      u = () => {
        (t.report("self-publish", "dropped-at-regate"), e());
      };
    if (!o()) return u();
    let d = r.preconditions,
      f = ([, e]) => e !== null && e.ifMatch !== void 0,
      p = d && i.some(f),
      m = d && i.every(f),
      h = !1;
    HE(i, d)
      .then(
        (e) => {
          if (!o()) return u();
          qE({
            h: t,
            slot: n,
            baseVersion: r.ver,
            fields: { manifest: e, mode: "patch" },
            armedAt: c,
            project: d
              ? (e, t) =>
                  e === 400 && FE.test(t)
                    ? ((r.preconditions = !1),
                      (PE = Date.now() + NE),
                      X("upstream_error", "the host is updating; try again"))
                    : GE(AE(e, t), t, i, m)
              : AE,
            resultOf: d
              ? (e) => {
                  let t = m ? LE(e.changed) : void 0;
                  return (
                    (h = t?.length === 0),
                    {
                      ...(t !== void 0 && { changed: t }),
                      ...(p && { shas: WE(e.manifest, i) }),
                    }
                  );
                }
              : void 0,
            conflictBoot: () => UE(t),
            onAttempt: (e) => t.noteOwnPublishPending?.(e, a),
            onPublished: (e, n) => {
              if (o()) {
                if (
                  !(n === void 0
                    ? !m
                    : n === r.ver || (h && t.contentRuns?.(a, n) === !0))
                ) {
                  UE(t);
                  return;
                }
                (r.ownMoves++, (r.ver = e), t.noteOwnVersion?.(e, a));
              }
            },
            onSettle: l,
          });
        },
        (e) => {
          (t.markHandled(e),
            l({
              error: X(
                "invalid_content",
                e instanceof BE
                  ? "a text file is not valid UTF-8"
                  : "a file could not be read",
              ),
            }));
        },
      )
      .catch((e) => {
        (t.markHandled(e), l({ error: X("upstream_error", "request failed") }));
      });
  });
}
var ZE = new Set([
  "not_writer",
  "not_declared",
  "too_large",
  "invalid_content",
  "consent_required",
  "capability_disabled",
  "capability_removed",
  "read_only_path",
]);
function QE(e, t) {
  if (!Rw) return zO(MO(e, t)).persistSelf();
  let n = Rw.mode === "server" ? Iw : (XT?.slot ?? null);
  return n !== null && (n.org !== e.org || n.account !== z(t))
    ? Promise.resolve(!1)
    : Rw.persistSelf();
}
function $E(e, t, n) {
  if (ZT) return Promise.resolve({ unavailable: !0 });
  let r = XT;
  if (!r || r.slot.account !== n.account || r.slot.org !== n.org)
    return Promise.resolve({ unavailable: !0 });
  if (t === "")
    return Promise.resolve({ rejected: !0, code: "missing_version" });
  let i = r.store.read();
  if (i === null) return Promise.resolve({ unavailable: !0 });
  let a = i.get(Ru);
  return a?.revoked === !0
    ? Promise.resolve({ unavailable: !0 })
    : a?.tools.has("publish") === !0
      ? ((ZT = !0),
        new Promise((n) => {
          JE({
            h: r.h,
            slot: r.slot,
            baseVersion: t,
            html: e,
            onSettle: (e) => {
              if ("result" in e) {
                let t = e.result?.version;
                n(
                  typeof t == "string" && t !== ""
                    ? { published: !0, version: t }
                    : { retryable: !0, code: "upstream_error" },
                );
                return;
              }
              let { code: t, live: r } = e.error;
              n(
                t === "conflict"
                  ? { conflict: !0, ...(r === void 0 ? {} : { live: r }) }
                  : ZE.has(t)
                    ? { rejected: !0, code: t }
                    : { retryable: !0, code: t },
              );
            },
          });
        }).finally(() => {
          ZT = !1;
        }))
      : Promise.resolve({ keep_undecided: !0 });
}
var eD = !1;
function tD(e, t, n) {
  if (eD) return Promise.resolve({ unavailable: !0 });
  let r = XT;
  if (!r || r.slot.account !== n.account || r.slot.org !== n.org)
    return Promise.resolve({ unavailable: !0 });
  if (t === "")
    return Promise.resolve({ rejected: !0, code: "missing_version" });
  eD = !0;
  let { h: i, state: a, frame: o } = r;
  return new Promise((n) => {
    let s = (e) => {
        if ("result" in e) {
          let t = e.result?.version;
          n(
            typeof t == "string" && t !== ""
              ? { published: !0, version: t }
              : { retryable: !0, code: "upstream_error" },
          );
          return;
        }
        let { code: t, live: r } = e.error;
        n(
          t === "conflict"
            ? { conflict: !0, ...(r === void 0 ? {} : { live: r }) }
            : ZE.has(t)
              ? { rejected: !0, code: t }
              : { retryable: !0, code: t },
        );
      },
      c = () => XT === r && o?.isConnected !== !1,
      l = (l) => {
        if (!c()) {
          (i.report("self-publish", "dropped-at-regate"),
            n({ unavailable: !0 }),
            l());
          return;
        }
        let u = a?.ver ?? t;
        qE({
          h: i,
          slot: r.slot,
          baseVersion: u,
          fields: { manifest: {}, mode: "patch", label: e.label, note: e.note },
          project: nD,
          onAttempt: (e) => {
            o && i.noteOwnPublishPending?.(e, o);
          },
          onPublished: (e, t) => {
            if (c()) {
              if (t !== void 0 && t !== u) {
                UE(i);
                return;
              }
              (o && i.noteOwnVersion?.(e, o),
                a && (a.ver = e),
                i.requestReboot());
            }
          },
          onSettle: (e) => {
            try {
              s(e);
            } finally {
              l();
            }
          },
        });
      };
    a ? YE(a, l) : l(() => void 0);
  }).finally(() => {
    eD = !1;
  });
}
function nD(e, t) {
  return e === 400 && /^bad json: .*unknown field/.test(t)
    ? X(
        "capability_disabled",
        "saving a version is not available for this artifact yet",
      )
    : AE(e, t);
}
function rD(e) {
  let {
      h: t,
      slot: n,
      ops: r,
      path: i,
      onSettle: a,
      frame: o,
      enqueuedAt: s,
      live: c,
    } = e,
    l = t.org ? `?org=${encodeURIComponent(t.org)}` : "",
    u = e.idempotencyKey ?? cD(),
    d =
      e.pathOnWire === !0
        ? e.doc === void 0
          ? i !== void 0 && { path: i }
          : { doc: e.doc }
        : void 0,
    f = (e) => JSON.stringify({ token: e, idempotencyKey: u, ops: r, ...d }),
    p = n.value,
    m;
  try {
    m = f(p);
  } catch {
    return (
      a({ error: X("invalid_content", "ops are not serializable as JSON") }),
      Promise.resolve()
    );
  }
  let h = (e, n) =>
      fetch(`/api/frame/self/${t.frameUuid}${l}`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", ...t.cpHeaders },
        body: n === p ? m : f(n),
        signal: et(e),
      }).then(async (e) => ({
        status: e.status,
        ok: e.ok,
        text: await e.text(),
      })),
    g = n.value,
    _ = s ?? Date.now(),
    v = () => Math.min(gE, B - (Date.now() - _) - qe),
    y = Math.min(hE, B - (Date.now() - _) - qe);
  if (y <= 0)
    return (
      a({
        error: X(
          "conflict",
          "the document changed under this edit (timeout) \u2014 re-issue",
        ),
      }),
      Promise.resolve()
    );
  let b = 0,
    x = (e) =>
      c && !c()
        ? (t.report("self-edit", "retry-abandoned"), a({ error: e }), !0)
        : t.isTopologyStale?.() === !0
          ? (t.report("self-edit", "refused-topology"), a({ error: zC() }), !0)
          : t.isEditPaused?.() === !0 &&
            (t.report("self-edit", "refused-paused"), a({ error: BC() }), !0),
    S = (s) => {
      if (!s.ok) {
        let r = gD(s, b);
        if (r >= 0 && v() - r > 0)
          return (
            b++,
            new Promise((e) => {
              window.setTimeout(e, r);
            }).then(() => {
              let t = v();
              if (t <= 0) {
                a({ error: _D(s.status, s.text, e.ops) });
                return;
              }
              if (x(_D(s.status, s.text, e.ops))) return;
              let r = n.value;
              return h(t, r).then((e) => C(e, r));
            })
          );
        let o = s.status === 403 && Qe(s.text);
        ((s.status === 404 || o) && t.noteEditRevoked?.(i),
          LC(s.status, RC(s.text)) && (!c || c()) && t.noteDocReadOnly?.(i),
          a({ error: _D(s.status, s.text, e.ops) }),
          o && KE(t));
        return;
      }
      let l = -1,
        u = [],
        d = !1;
      try {
        let e = JSON.parse(s.text);
        (typeof e.version == "number" &&
          Number.isSafeInteger(e.version) &&
          (l = e.version),
          Array.isArray(e.created) &&
            (u = e.created.filter((e) => typeof e == "string")),
          (d = e.noop === !0 || e.applied === !1));
      } catch {}
      if (d) {
        a({ result: { seq: l, created: [], noop: !0 } });
        return;
      }
      if (l < 0) return a({ error: X("upstream_error", "malformed response") });
      (t.noteOwnHeadSeq?.(l, oD(r), o, i),
        a({ result: { seq: l, created: u } }));
    },
    C = (r, i) =>
      r.status !== 403 || r.text.includes("not declared") || $e(r.text)
        ? S(r)
        : t.requestReboot().then(() => {
            let t = v();
            if (n.value === i || t <= 0) return S(r);
            if (!x(_D(r.status, r.text, e.ops))) return h(t, n.value).then(S);
          });
  return h(y, g)
    .then((e) => C(e, g))
    .catch((e) => {
      t.markHandled(e);
      let r = v();
      if (r <= 0) {
        a({ error: X("upstream_error", "request failed") });
        return;
      }
      if (x(X("upstream_error", "request failed"))) return;
      let i = n.value;
      return h(r, i)
        .then((e) => C(e, i))
        .catch((e) => {
          (t.markHandled(e),
            a({ error: X("upstream_error", "request failed") }));
        });
    });
}
var iD = "index.html";
function aD(e, t) {
  let n;
  if (e == null) n = void 0;
  else if (typeof e == "string") n = e;
  else if (typeof e == "object" && !Array.isArray(e)) n = e.path;
  else
    return X(
      "invalid_content",
      "edit options must be an object or a path string",
    );
  return n === void 0
    ? t.livePaths.includes(iD)
      ? iD
      : t.pathOnWire
        ? X("invalid_content", "unknown document path")
        : void 0
    : typeof n != "string" || !t.livePaths.includes(n)
      ? X("invalid_content", "unknown document path")
      : n;
}
function oD(e) {
  let t = new Set();
  for (let n of e) {
    let e = n?.target;
    if (typeof e != "string") return null;
    (t.add(e), sD(t, n));
  }
  return t;
}
function sD(e, t) {
  let n = t;
  if (n?.op === "move")
    for (let t of [n.parent, n.before, n.after])
      typeof t == "string" && e.add(t);
}
function cD() {
  let e = new Uint8Array(18);
  crypto.getRandomValues(e);
  let t = "";
  for (let n of e) t += String.fromCharCode(n);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_");
}
var lD = /^[A-Za-z0-9_-]{16,128}$/;
function uD(e) {
  if (typeof e != "object" || !e || Array.isArray(e)) return;
  let t = e.idempotencyKey;
  return typeof t == "string" && lD.test(t) ? t : void 0;
}
var dD = new Set([
    "ctr",
    "epoch",
    "idempotency",
    "size",
    "stale",
    "state_budget",
    "tail",
    "tail_full",
    "target",
  ]),
  fD = {
    text_runes: "524,288 text characters",
    units: "131,072 elements and attributes",
    rendered_bytes: "8 MiB rendered",
  },
  pD = {
    ctr: [40, 120, 300],
    stale: [40, 120, 300],
    tail: [150, 400, 900, 1800],
  },
  mD = 5e3,
  hD = 32;
function gD(e, t) {
  if (e.status !== 409) return -1;
  let n;
  try {
    n = JSON.parse(e.text);
  } catch {
    return -1;
  }
  if (
    n.conflict !== !0 ||
    typeof n.reason != "string" ||
    !Object.hasOwn(pD, n.reason)
  )
    return -1;
  let r = pD[n.reason]?.[t];
  if (r === void 0) return -1;
  let i =
    n.reason === "tail" &&
    typeof n.retry_after_ms == "number" &&
    Number.isFinite(n.retry_after_ms) &&
    n.retry_after_ms > 0
      ? Math.min(n.retry_after_ms, mD)
      : 0;
  return Math.max(r, i);
}
function _D(e, t, n = []) {
  let r = vD(e, t);
  if (r.code === "invalid_content" || r.code === "conflict") {
    let e = FC(t, n);
    if (e) return { ...r, ...e };
  }
  return r;
}
function vD(e, t) {
  if (e === 409) {
    let e = !1,
      n = "changed",
      r = "";
    try {
      let i = JSON.parse(t);
      ((e = i.conflict === !0),
        typeof i.reason == "string" && dD.has(i.reason) && (n = i.reason),
        typeof i.meter == "string" &&
          Object.hasOwn(fD, i.meter) &&
          (r = ` (${fD[i.meter]})`),
        n === "target" &&
          (typeof i.meter == "string" ||
            (typeof i.detail == "string" &&
              /too large for live editing/.test(i.detail))) &&
          (n = "size"));
    } catch {}
    if (!e)
      return X(
        "invalid_content",
        "this artifact does not accept edits (not a live doc)",
      );
    switch (n) {
      case "target":
        return X(
          "invalid_content",
          "an op targets an element that no longer exists (data-id gone)",
        );
      case "size":
        return X(
          "invalid_content",
          `the page would be over a live-editing size limit${r}: this edit is dropped; edits that keep the page under it still land`,
        );
      case "state_budget":
        return X("invalid_content", y);
      default:
        return x.has(n)
          ? {
              ...X(
                "conflict",
                `the document changed under this edit (${n}) \u2014 re-issue`,
              ),
              reason: n,
            }
          : X("invalid_content", I);
    }
  }
  return e === 422 || e === 400 || e === 413
    ? X(
        "invalid_content",
        e === 413
          ? "ops exceed the size limit"
          : "ops were rejected as invalid (unknown op, bad target, or malformed batch)",
      )
    : LC(e, RC(t))
      ? IC()
      : _E(e, t);
}
var yD = new Set(
    "frame_whiteboard_send.frame_home_inbox_done.frame_home_inbox_declined.frame_home_inbox_changed.frame_home_charter_edited.frame_design_opened.frame_design_ds_tokens.frame_design_ds_bundle.frame_design_ds_use_low.frame_design_ds_use_mid.frame_design_ds_use_high.frame_design_export_built.frame_design_export_html_built.frame_design_export_failed.frame_design_export_too_large.frame_design_export_blank_images.frame_design_export_clipped.frame_design_export_flow_overflow.frame_design_export_hidden_skipped.frame_design_export_font_fallback.frame_design_export_scaled_down.frame_design_export_partial.frame_design_export_single_of_many.frame_design_export_other_pages.frame_design_export_inner_clipped.frame_design_export_scroll_region.frame_design_export_collapsed.frame_design_export_unrevealed.frame_slides_slide_inserted.frame_slides_slide_deleted.frame_slides_slide_reordered.frame_slides_export_pptx.frame_slides_export_pdf.frame_slides_export_html.frame_slides_export_gslides.frame_design_artboard_inserted.frame_design_artboard_deleted.frame_design_export_png.frame_design_export_jpg.frame_design_export_pdf.frame_design_export_html.frame_design_export_zip.frame_slides_export_png.frame_slides_export_pdf_built.frame_slides_export_png_built.frame_slides_export_html_built.frame_slides_export_pptx_current_built.frame_slides_export_pptx_basic_built.frame_slides_export_pptx_pictures_built.frame_slides_export_gslides_built.frame_slides_export_font_missing.frame_slides_export_font_late.frame_slides_export_font_over_budget.frame_slides_export_font_swapped.frame_slides_export_font_not_embedded.frame_slides_export_font_missing_unloaded.frame_slides_export_font_missing_installed.frame_slides_export_font_missing_web_fetch.frame_slides_export_font_missing_file_fetch.frame_slides_export_font_swapped_deck_file.frame_slides_export_font_swapped_system.frame_migrated_page_component_runner_shown.frame_migrated_page_deck_runner_shown.frame_migrated_page_document_runner_shown.frame_migrated_page_canvas_runner_shown.frame_migrated_page_template_runner_shown.frame_migrated_page_react_runner_shown.frame_migrated_page_plain_runner_shown.frame_migrated_page_unknown_runner_shown.frame_migrated_page_component_runner_unclean.frame_migrated_page_deck_runner_unclean.frame_migrated_page_document_runner_unclean.frame_migrated_page_canvas_runner_unclean.frame_migrated_page_template_runner_unclean.frame_migrated_page_react_runner_unclean.frame_migrated_page_plain_runner_unclean.frame_migrated_page_unknown_runner_unclean.frame_migrated_page_own_script.frame_migrated_page_own_style.frame_migrated_page_own_image.frame_migrated_page_own_font.frame_migrated_page_own_media.frame_migrated_page_own_other.frame_migrated_page_refused_script.frame_migrated_page_refused_style.frame_migrated_page_refused_image.frame_migrated_page_refused_font.frame_migrated_page_refused_media.frame_migrated_page_refused_data.frame_migrated_page_refused_other.frame_migrated_page_measured.frame_migrated_page_unmeasured.frame_migrated_page_boot_silent.frame_migrated_page_stopped.frame_migrated_page_no_load.frame_migrated_page_rebuilt.frame_ds_cleanup_shown.frame_ds_cleanup_pressed.frame_ds_cleanup_owner_chat.frame_ds_cleanup_side_chat.frame_ds_cleanup_as_comment.frame_ds_cleanup_handoff_unanswered.frame_ds_cleanup_no_claude_copied.frame_ds_cleanup_no_claude_copy_failed.frame_ds_opened_editing_off.frame_ds_opened_editable.frame_ds_editing_came_on.frame_ds_opened_no_colors.frame_ds_opened_previews_missing.frame_ds_foreign_files_noticed.frame_design_export_pick_opened.frame_design_export_pick_chosen.frame_design_export_pick_cancelled.frame_design_export_pick_left.frame_design_export_pick_lapsed.frame_design_export_pick_dropped.frame_design_export_pick_built.frame_design_export_timed_out.frame_design_export_refused.frame_edit_person_added.frame_edit_person_changed.frame_edit_person_removed.frame_edit_person_undid_claude.frame_edit_claude_added.frame_edit_claude_changed.frame_edit_claude_removed.frame_dashboard_load_needs_reader.frame_dashboard_load_declined.frame_dashboard_load_connector_failed.frame_dashboard_load_source_refused.frame_dashboard_load_source_failed.frame_dashboard_load_loader_stopped.frame_dashboard_load_code_stopped.frame_dashboard_load_calc_failed.frame_dashboard_load_clean.frame_dashboard_uncaught_error.frame_dashboard_unhandled_rejection.frame_dashboard_error_undefined_property.frame_dashboard_error_not_a_function.frame_dashboard_error_not_defined.frame_dashboard_error_not_iterable.frame_dashboard_error_bad_json.frame_dashboard_error_syntax.frame_dashboard_error_range.frame_dashboard_error_thrown_by_page.frame_dashboard_error_other.frame_dashboard_check_clean.frame_dashboard_check_failed.frame_dashboard_check_corrected.frame_dashboard_check_broke.frame_dashboard_check_timed_out".split(
      ".",
    ),
  ),
  bD = new Set();
function xD(e, t) {
  if (e.analyticsOff?.() || typeof t != "string" || !yD.has(t)) return;
  let n = e.frameUuid + ":" + t;
  if (bD.has(n)) return;
  bD.add(n);
  let r = e.org ? `?org=${encodeURIComponent(e.org)}` : "";
  fetch(`/api/frame/track${r}`, {
    method: "POST",
    credentials: "same-origin",
    keepalive: !0,
    headers: { "Content-Type": "application/json", ...e.cpHeaders },
    body: JSON.stringify({ event_name: t, slug: e.frameUuid }),
  }).catch((t) => e.markHandled(t));
}
function SD(e, t, n) {
  let r = (r) => {
    if (
      !t.isConnected ||
      !n() ||
      r.origin !== e.frameOrigin ||
      !t.contentWindow ||
      r.source !== t.contentWindow
    )
      return;
    let i = _e(r.data, "analytics");
    i?.method === "track" && xD(e, i.args[0]);
  };
  return (
    window.addEventListener("message", r),
    () => {
      window.removeEventListener("message", r);
    }
  );
}
function CD(e, t, n, r, i, a, o = { tail: Promise.resolve() }) {
  let { frameOrigin: s } = e,
    c = async (r, i) => {
      let o = () => {
        if (!t.isConnected || !a())
          throw (
            e.report("self-edit", "dropped-at-regate"),
            VC("retired: this document's broker generation ended")
          );
        if (e.isTopologyStale?.() === !0)
          throw (
            e.report("self-edit", "refused-topology"),
            VC("conflict: the document's topology was superseded")
          );
      };
      o();
      let s = e.org ? `?org=${encodeURIComponent(e.org)}` : "",
        c = (t) =>
          fetch(`/api/frame/self/${e.frameUuid}${s}`, {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json", ...e.cpHeaders },
            body: JSON.stringify({ token: t, ...r }),
            signal: et(15e3),
            ...(i?.keepalive && { keepalive: !0 }),
          }),
        l = n.value,
        u = await c(l),
        d = await u.text().catch(() => "");
      (u.status === 403 &&
        !i?.keepalive &&
        !d.includes("not declared") &&
        !$e(d) &&
        (await e.requestReboot().catch((t) => e.markHandled(t)),
        o(),
        n.value !== l &&
          ((u = await c(n.value)), (d = await u.text().catch(() => "")))),
        u.status === 403 && !i?.keepalive && Qe(d) && KE(e));
      let f = null;
      try {
        f = JSON.parse(d);
      } catch {
        f = null;
      }
      let p = u.headers.get("server-timing");
      return { status: u.status, body: f, ...(p !== null && { timing: p }) };
    };
  e.primeReplicaWriter?.(t, c);
  let l = (l) => {
    if (
      !t.isConnected ||
      !a() ||
      l.origin !== s ||
      !t.contentWindow ||
      l.source !== t.contentWindow
    )
      return;
    let u = _e(l.data);
    if (u && u.cap === "analytics") {
      u.method === "track" && xD(e, u.args[0]);
      return;
    }
    if (u && (u.cap === "self" || u.cap === "artifact")) {
      if (u.method === "metadata") return;
      let i = performance.now(),
        l = (n) => {
          a() &&
            (t.contentWindow?.postMessage(ye(u.id, n), s),
            e.noteCapOutcome?.(
              u.cap,
              u.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - i,
            ));
        };
      if (u.method === "edit") {
        let [i, s] = u.args;
        if (!Array.isArray(i) || i.length === 0 || i.length > hD)
          return l({
            error: X(
              "invalid_content",
              `edit takes a non-empty array of at most ${hD} ops`,
            ),
          });
        let d = aD(s, r);
        if (typeof d == "object") return l({ error: d });
        let f = uD(s),
          p = Date.now(),
          m = () => t.isConnected && a();
        ((o.tail = o.tail
          .catch(() => void 0)
          .then(async () => {
            if (!m())
              return (
                e.report("self-edit", "dropped-at-regate"),
                l({
                  error: X(
                    "upstream_error",
                    "editing is reconnecting \u2014 retry",
                  ),
                })
              );
            if (e.isTopologyStale?.() === !0)
              return (
                e.report("self-edit", "refused-topology"),
                l({ error: zC() })
              );
            if (e.isEditPaused?.() === !0)
              return (
                e.report("self-edit", "refused-paused"),
                l({ error: BC() })
              );
            let a = !1,
              o = await e.commitViaReplica?.({
                ...(d !== void 0 && { path: d }),
                ops: i,
                ...(f !== void 0 && { idempotencyKey: f }),
                frame: t,
                write: async (e, t) => {
                  let n = await c(e, t);
                  return (LC(n.status, n.body) && (a = !0), n);
                },
              });
            if (o) {
              try {
                if (!m()) {
                  e.report("self-edit", "dropped-at-regate");
                  return;
                }
                l("error" in o ? o : { result: o.result });
              } finally {
                "deliver" in o && o.deliver();
              }
              return;
            }
            return a
              ? (m() && e.noteDocReadOnly?.(d), l({ error: IC() }))
              : i.some((e) => e?.op === "set-html")
                ? l({
                    error: X(
                      "invalid_content",
                      "structure edits need the live engine (not paired)",
                    ),
                  })
                : rD({
                    h: e,
                    slot: n,
                    ops: i,
                    path: d,
                    doc: d === void 0 ? void 0 : r.liveDocIds?.get(d),
                    pathOnWire: r.pathOnWire,
                    onSettle: l,
                    frame: t,
                    enqueuedAt: p,
                    live: m,
                    ...(f !== void 0 && { idempotencyKey: f }),
                  });
          })),
          e.noteOwnEditPending?.(o.tail, oD(i), t, d));
        return;
      }
      if (u.method !== "publish")
        return l({ error: X("upstream_error", `unknown method ${u.method}`) });
      let [d] = u.args;
      if (typeof d == "string") {
        let i = Date.now();
        YE(r, (o) => {
          if (!(t.isConnected && a()))
            return (e.report("self-publish", "dropped-at-regate"), o());
          JE({
            h: e,
            slot: n,
            baseVersion: r.ver,
            html: d,
            armedAt: i,
            onSettle: (e) => {
              try {
                l(e);
              } finally {
                o();
              }
            },
          });
        });
        return;
      }
      if (typeof d != "object" || !d)
        return l({
          error: X(
            "invalid_content",
            "publish takes an HTML string or a files object",
          ),
        });
      if (!r.filesEnabled)
        return l({
          error: X(
            "capability_disabled",
            "publishing files is not available in this view",
          ),
        });
      let f = RE(d);
      if ("error" in f) return l({ error: f.error });
      XE({
        h: e,
        slot: n,
        state: r,
        entries: f.entries,
        frame: t,
        live: () => t.isConnected && a(),
        onSettle: l,
      });
      return;
    }
    i && at(e, l.data);
  };
  return (
    window.addEventListener("message", l),
    () => {
      window.removeEventListener("message", l);
    }
  );
}
function wD(e, t, n, r, i = !1, a = () => e.chrome()) {
  let { frameOrigin: o } = e,
    s = (s) => {
      if (
        !t.isConnected ||
        !r() ||
        s.origin !== o ||
        !t.contentWindow ||
        s.source !== t.contentWindow
      )
        return;
      let c = _e(s.data);
      if (
        !c ||
        (c.cap !== "self" && c.cap !== "artifact") ||
        c.method === "metadata"
      )
        return;
      let l = performance.now(),
        u = X(
          "not_granted",
          i
            ? "this artifact declares publish: false, so its page cannot save it"
            : "this viewer does not have write access to this artifact",
        ),
        d = (n) => {
          r() &&
            (t.contentWindow?.postMessage(ye(c.id, n), o),
            e.noteCapOutcome?.(
              c.cap,
              c.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - l,
            ));
        };
      if (c.method === "edit") {
        (d({ error: u }), i || a()?.onReaderEditRefused?.());
        return;
      }
      if (c.method !== "publish")
        return d({ error: X("upstream_error", `unknown method ${c.method}`) });
      let [f] = c.args;
      if (typeof f != "string")
        return d({
          error:
            typeof f == "object" && f
              ? u
              : X(
                  "invalid_content",
                  "publish takes an HTML string or a files object",
                ),
        });
      (d({ error: u }),
        !i &&
          a()?.onReaderPublish?.({
            html: f,
            baseVersion: n,
            surfaceBusy: pO(e),
          }));
    };
  return (
    window.addEventListener("message", s),
    () => {
      window.removeEventListener("message", s);
    }
  );
}
function TD(e) {
  e.holds += 1;
  let t = !0;
  return () => {
    if (!t || ((t = !1), --e.holds, e.holds > 0)) return;
    let n = e.stop;
    ((e.stop = null), n?.());
  };
}
function ED(e, t, n, r, i, a = "tokened", o, s) {
  if (s?.stop) return TD(s);
  let { frameOrigin: c, frameUuid: l } = e,
    u = null;
  try {
    u = window.sessionStorage;
  } catch {
    u = null;
  }
  let d = Ia(r),
    f = Date.now(),
    p = xi(n.org, n.account, l),
    m = d.offline ? p : null;
  m !== null &&
    ((Nw = { org: n.org, account: n.account }),
    $i().then((t) => {
      for (let n = 0; n < t; n++) e.report("db-outbox", "swept:expired");
    }));
  let h = new ar(
      a === "public"
        ? {
            slug: l,
            query: tt(e),
            cpHeaders: e.cpHeaders,
            endpoint: () =>
              "/api/frame/db/" + encodeURIComponent(l) + "/public-call" + tt(e),
            onUnauthorized: () => e.requestReboot(),
            signalFor: (e) => et(e),
            report: (n) => {
              i() && t.isConnected && e.report("db-call", n);
            },
            markHandled: e.markHandled,
          }
        : {
            ...(d.transport === "mcp"
              ? {
                  door: new xo({
                    slug: l,
                    query: tt(e),
                    cpHeaders: e.cpHeaders,
                    signalFor: (e) => et(e),
                    markHandled: e.markHandled,
                  }),
                  bareNotFound: "unavailable",
                }
              : {}),
            ...(o === void 0 ? {} : { writeOrder: o }),
            docTurns: Ct(),
            slug: l,
            query: tt(e),
            cpHeaders: e.cpHeaders,
            token: () => (n.value === "" ? null : n.value),
            onAuthStale: () => e.requestReboot(),
            signalFor: (e) => et(e),
            report: (n) => {
              i() && t.isConnected && e.report("db-call", n);
            },
            markHandled: e.markHandled,
          },
    ),
    g = () => document.visibilityState === "visible",
    _ = a === "tokened" ? e.dbUsage : void 0,
    v = _
      ? bf({
          tracked: () => _.tracked(),
          held: () => _.held(),
          apply: (e) => _.set(e),
          read: (e) => h.call("usage", { src: e }),
          isVisible: g,
        })
      : null,
    y = new Set(),
    b = () => {
      g() && v?.noteReturn();
      for (let e of Array.from(y)) e();
    };
  document.addEventListener("visibilitychange", b);
  let x = new $a({
      http: v?.wrap(h) ?? h,
      config: d,
      durableSync: e.sync ?? null,
      storage: u,
      local: m === null ? null : Ca(m, f),
      dropRows: p === null ? null : () => Zi(p),
      outbox: m === null ? null : es(m, f, u),
      onOnline: (e) => (
        window.addEventListener("online", e),
        () => window.removeEventListener("online", e)
      ),
      slug: l,
      metrics: new wo({
        count: (t, n) => {
          i() &&
            (t === "frame_db.demote"
              ? e.report("db-realtime", "demote:" + (n ?? "unknown"))
              : t === "frame_db.mode"
                ? e.report("db-realtime", "mode:" + (n ?? "unknown"))
                : t === "frame_db.stream_no_fence"
                  ? e.report("db-realtime", "no-fence")
                  : t === "frame_db.durable_unrouted"
                    ? e.report("db-realtime", "unrouted")
                    : t === "frame_db.overlay_aged"
                      ? e.report("db-realtime", "overlay-aged")
                      : t === "frame_db.outbox" &&
                        n !== void 0 &&
                        e.report("db-outbox", n));
        },
        observe: () => void 0,
      }),
      postEvent: (e) => {
        !i() ||
          !t.isConnected ||
          (t.contentWindow?.postMessage({ __frame_db_ev: !0, ev: e }, c),
          v && queueMicrotask(() => v.noteDelivery(e)));
      },
      isVisible: g,
      onVisibility: (e) => (y.add(e), () => y.delete(e)),
      readOnly: a === "public",
    }),
    S = (n) => {
      if (
        !t.isConnected ||
        !i() ||
        n.origin !== c ||
        !t.contentWindow ||
        n.source !== t.contentWindow
      )
        return;
      let r = _e(n.data, "db");
      if (!r) return;
      let a = performance.now(),
        o = (n) => {
          i() &&
            (t.contentWindow?.postMessage(ye(r.id, n), c),
            e.noteCapOutcome?.(
              r.cap,
              r.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - a,
            ));
        };
      try {
        if (
          !lt(r.args) ||
          new TextEncoder().encode(JSON.stringify(r.args)).length > 286720
        )
          return o({
            error: {
              code: "invalid_argument",
              message:
                "arguments must be plain JSON data within the store's limits",
            },
          });
      } catch {
        return o({
          error: {
            code: "invalid_argument",
            message: "arguments must be plain JSON data",
          },
        });
      }
      x.handleVerb(r.method, r.args).then(o);
    };
  window.addEventListener("message", S);
  let C = () => {
    (window.removeEventListener("message", S),
      document.removeEventListener("visibilitychange", b),
      v?.stop(),
      x.stop());
  };
  return s ? ((s.stop = C), TD(s)) : C;
}
var DD = "frame-content";
function OD(e, t, n, r, i) {
  if (i?.stop) return TD(i);
  let { frameOrigin: a, frameUuid: o } = e,
    s = e.sync,
    c = new Uc({
      sync: s?.sendStore ? s : null,
      slug: o,
      query: tt(e),
      cpHeaders: e.cpHeaders,
      token: () => (n.value === "" ? null : n.value),
      onAuthStale: () => e.requestReboot(),
      signalFor: (e) => et(e),
      markHandled: e.markHandled,
      post: (e) => {
        !r() ||
          !t.isConnected ||
          t.contentWindow?.postMessage({ __frame_docs_ev: !0, ev: e }, a);
      },
      report: (n) => {
        r() && t.isConnected && e.report("docs-lane", n);
      },
    }),
    l = 0,
    u = (n) => {
      if (
        !t.isConnected ||
        !r() ||
        n.origin !== a ||
        !t.contentWindow ||
        n.source !== t.contentWindow
      )
        return;
      let i = _e(n.data, ns);
      if (!i) return;
      let o = performance.now(),
        s = l;
      c.handle(i.method, i.args).then((n) => {
        s !== l ||
          !r() ||
          !t.isConnected ||
          (t.contentWindow?.postMessage(ye(i.id, n), a),
          e.noteCapOutcome?.(
            i.cap,
            i.method,
            "error" in n ? n.error.code : null,
            t,
            performance.now() - o,
          ));
      });
    },
    d = () => {
      t.id !== DD || !r() || (l++, c.closeAll());
    };
  (window.addEventListener("message", u),
    document.addEventListener("frame-content-navigated", d));
  let f = () => {
    (window.removeEventListener("message", u),
      document.removeEventListener("frame-content-navigated", d),
      c.stop());
  };
  return i ? ((i.stop = f), TD(i)) : f;
}
var kD = 245e3,
  AD = 27e4,
  jD = 6,
  MD = 2097152,
  ND = 6e4,
  PD = 3e5,
  FD = 2e4,
  ID = 15e3,
  LD = 20971520,
  RD = 16777216,
  zD = 2097152,
  BD = /^[0-9a-f]{32}$/,
  VD = 512,
  HD = new Set([
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "video/mp4",
    "video/webm",
    "application/pdf",
    "font/woff2",
    "font/woff",
    "font/ttf",
    "font/otf",
    "text/csv",
    "text/markdown",
    "application/json",
    "text/plain",
    "text/css",
    "text/javascript",
  ]),
  UD = "X-Frame-Blobs-Token",
  WD = (e, t) => ({ code: e, message: t }),
  GD = new Set(["quota_or_state"]),
  KD = new Set(["rate_limited"]);
function qD(e, t) {
  let n = pt(t);
  if (n !== null) return WD(n.code, n.message ?? `request failed (${e})`);
  switch (e) {
    case 400:
      return WD(
        "invalid_request",
        "the call was rejected as malformed; for an upload this includes an empty body and a text body (csv, markdown, json, plain, css, javascript) that is not valid UTF-8",
      );
    case 401:
    case 403:
      return WD(
        "upstream_auth",
        "the platform could not authenticate this call",
      );
    case 404:
      return WD("capability_disabled", "assets are not available in this view");
    case 409:
      return WD(
        "quota_or_state",
        "the artifact cannot accept this call \u2014 storage quota, file count, or artifact state",
      );
    case 413:
      return WD(
        "too_large",
        "the blob exceeds the size limit (2 MiB for SVG, 20 MiB otherwise)",
      );
    case 415:
      return WD(
        "unsupported_type",
        "the content type is not accepted here, or the body does not match it \u2014 under an image, video, PDF or font type a body that starts with markup ('<') is accepted only as image/svg+xml (text data bodies are not inspected); for SVG: not a parseable SVG document, or its root <svg> tag is over 1 MiB or has a double-quote character inside an attribute value",
      );
    case 429:
      return WD("rate_limited", "calling too often \u2014 slow down");
    case 502:
    case 503:
      return WD("store_unavailable", "asset store unavailable \u2014 retry");
    default:
      return WD("upstream_error", `request failed (${e})`);
  }
}
function JD(e) {
  let t = e;
  return typeof t?.opaque_id != "string" ||
    typeof t.size_bytes != "number" ||
    typeof t.content_type != "string"
    ? null
    : { id: t.opaque_id, sizeBytes: t.size_bytes, contentType: t.content_type };
}
function YD(e) {
  let t = e;
  if (!t || !Array.isArray(t.assets)) return null;
  let n = [];
  for (let e of t.assets) {
    let t = e;
    if (
      typeof t?.opaque_id != "string" ||
      typeof t.content_type != "string" ||
      typeof t.size_bytes != "number" ||
      typeof t.created_at != "string"
    )
      return null;
    n.push({
      id: t.opaque_id,
      contentType: t.content_type,
      sizeBytes: t.size_bytes,
      createdAt: t.created_at,
    });
  }
  let r = t.usage;
  if (
    typeof r?.files != "number" ||
    typeof r.bytes != "number" ||
    typeof r.max_files != "number" ||
    typeof r.max_bytes != "number" ||
    (t.next !== void 0 && t.next !== null && typeof t.next != "string")
  )
    return null;
  let i = {
    files: r.files,
    bytes: r.bytes,
    maxFiles: r.max_files,
    maxBytes: r.max_bytes,
  };
  return typeof t.next == "string" && t.next !== ""
    ? { assets: n, usage: i, next: t.next }
    : { assets: n, usage: i };
}
function XD(e) {
  let t = e?.deleted;
  return typeof t == "boolean" ? { deleted: t } : null;
}
var ZD = class extends Error {
  reason;
  constructor(t) {
    (super("response body read failed"),
      (this.reason = t),
      e(this, "response body read failed"));
  }
};
function QD() {
  return { running: new Set(), bytes: 0, alone: !1, slow: !1, waiting: [] };
}
function $D(e, t) {
  return (
    e.running.size === 0 ||
    (!e.slow &&
      !e.alone &&
      !t.alone &&
      e.running.size < jD &&
      e.bytes + t.size <= MD)
  );
}
function eO(e, t) {
  return (
    e.status === 503 &&
    e.retryAfterMs !== void 0 &&
    t.code === "store_unavailable" &&
    t.message.startsWith("upload not completed within")
  );
}
function tO(e, t, n, r, i = QD()) {
  let { frameOrigin: a, frameUuid: o } = e,
    s = tt(e),
    c = sn({ stateCodes: GD, pacedCodes: KD, frees: { delete: ["upload"] } }),
    l = (e) => {
      (i.running.add(e), (i.bytes += e.size), (i.alone = e.alone));
    },
    u = () => {
      let { running: e } = i;
      if (e.size > 1) for (let t of e) t.crowded = !0;
    },
    d = (e) => {
      let t = (e) => {
        (i.running.delete(e), (i.bytes -= e.size), e.alone && (i.alone = !1));
      };
      t(e);
      let { waiting: n } = i;
      for (; n.length > 0 && $D(i, n[0]);) {
        let e = n.shift();
        (l(e), e.start() ? u() : t(e));
      }
      for (let e of n) e.hold();
    },
    f = new Map(),
    p = async (e) => {
      let t;
      try {
        t = await e.text();
      } catch (e) {
        throw new ZD(e);
      }
      return {
        status: e.status,
        ok: e.ok,
        text: t,
        retryAfterMs: on(e.headers.get("Retry-After")),
      };
    },
    m = (t, r) => (i) =>
      fetch(`/api/frame/blob/${o}/upload${s}`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": r, [UD]: n.value, ...e.cpHeaders },
        body: t,
        signal: et(i),
      }).then(p),
    h = (t, r) => (i) =>
      fetch(`/api/frame/blob/${o}/${t}${s}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          [UD]: n.value,
          ...e.cpHeaders,
        },
        body: r,
        signal: et(i),
      }).then(p),
    g = (t, r, i, a = B, o = 0) => {
      let s = n.value,
        c = Date.now() - o,
        l = () => a - (Date.now() - c) - qe;
      return t(Math.min(r, l())).then((r) =>
        r.status !== 403 || Xe(r.text) || $e(r.text)
          ? r
          : e
              .requestReboot()
              .catch((t) => (e.markHandled(t), null))
              .then(() => {
                let e = l();
                return n.value !== s && e > 0 ? t(Math.min(i, e)) : r;
              }),
      );
    },
    _ = (n) => {
      if (
        !t.isConnected ||
        !r() ||
        n.origin !== a ||
        !t.contentWindow ||
        n.source !== t.contentWindow
      )
        return;
      let o = _e(n.data, "assets");
      if (!o) return;
      let s = performance.now(),
        p = (n) => {
          r() &&
            (t.contentWindow?.postMessage(ye(o.id, n), a),
            e.noteCapOutcome?.(
              o.cap,
              o.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - s,
            ));
        },
        _ = o.method === "list" || o.method === "delete" ? `${o.method}:` : "",
        v = (n) => {
          r() && t.isConnected && e.report("assets-call", _ + n);
        },
        y = (t) => {
          let n = t instanceof ZD,
            r = (n ? t.reason : t)?.name;
          return r === "TimeoutError"
            ? "timeout"
            : e.pageLeaving?.() === !0
              ? "unloading"
              : r === "AbortError"
                ? "timeout"
                : n
                  ? "fetch-failed-read"
                  : "fetch-failed";
        },
        b = (n, m, h, g, _, b = !1) => {
          let x = {
              size: g ?? 0,
              alone: !1,
              crowded: !1,
              start: () => k(!0),
              hold: () => E(),
            },
            S = !1,
            C = !1,
            w = (t = !1) => {
              let r = performance.now(),
                a = (e, t) =>
                  c.note(o.method, e, {
                    retryAfterMs: t?.retryAfterMs,
                    rttMs: performance.now() - r,
                    size: g,
                  }),
                l = () => {
                  b && d(x);
                };
              Promise.resolve()
                .then(() => n(t ? 0 : r - s))
                .then((t) => {
                  if (!t.ok) {
                    Xe(t.text) || v(String(t.status));
                    let n = qD(t.status, t.text);
                    if (
                      (a(n, t),
                      b && eO(t, n) && ((i.slow = !0), x.crowded && !S))
                    )
                      return (
                        (S = !0),
                        (x.alone = !0),
                        E(),
                        M({ error: n, delayMs: t.retryAfterMs }, ND)
                      );
                    (p({ error: n }), t.status === 403 && Qe(t.text) && KE(e));
                    return;
                  }
                  let n;
                  try {
                    n = m(JSON.parse(t.text));
                  } catch {
                    n = null;
                  }
                  if (n === null) {
                    v("malformed-response");
                    let e = WD("upstream_error", "malformed response");
                    return (a(e), p({ error: e }));
                  }
                  (c.note(o.method, null, { freed: _?.(n) }), p({ result: n }));
                })
                .catch((t) => {
                  (e.markHandled(t),
                    t instanceof ZD && e.markHandled(t.reason),
                    v(y(t)));
                  let n = WD("store_unavailable", "request failed");
                  (a(n), p({ error: n }));
                })
                .then(l, l);
            },
            T = null,
            E = () => {
              if (!(t.isConnected && r())) return;
              let e = performance.now();
              (T !== null && e - T < PD) ||
                (t.contentWindow?.postMessage(De(o.id), a), (T = e));
            },
            D = () => T !== null && o.holds === !0,
            O = () => D() || performance.now() - s < h - 2e3,
            k = (e, n = !1) => {
              if (!(t.isConnected && r() && O())) return !1;
              let i = n ? null : c.check(o.method, g);
              return i === null
                ? ((C = !0), (e || T !== null) && E(), w(D()), !0)
                : (M(i), !1);
            },
            A = () => {
              (C ? i.waiting.unshift(x) : i.waiting.push(x), E());
            },
            j = (e = !1) => {
              if (i.waiting.length > 0 || !$D(i, x)) return A();
              let t = c.check(o.method, g);
              if (t !== null) return e ? p({ error: t.error }) : M(t);
              (l(x), k(!1, !0) ? u() : d(x));
            },
            M = (e, n = e.delayMs) => {
              let i = () => {
                  f.delete(a);
                  let n = t.isConnected && r() && O();
                  if (n && b) return j(!0);
                  let i = n ? c.check(o.method, g) : e;
                  if (i !== null) return p({ error: i.error });
                  w();
                },
                a = setTimeout(i, Math.min(e.delayMs, n));
              f.set(a, i);
            };
          if (b) return j();
          let ee = c.check(o.method, g);
          if (ee === null) return w();
          M(ee);
        };
      switch (o.method) {
        case "upload": {
          let e = o.args[0],
            t = o.args[1];
          if (!(e instanceof Blob))
            return p({
              error: WD("invalid_request", "the first argument must be a Blob"),
            });
          if (typeof t != "string" || !HD.has(t))
            return p({
              error: WD(
                "unsupported_type",
                "content type must be one of: image/png, image/jpeg, image/gif, image/webp, image/svg+xml, video/mp4, video/webm, application/pdf, font/woff2, font/woff, font/ttf, font/otf, text/csv, text/markdown, application/json, text/plain, text/css, text/javascript",
              ),
            });
          if (e.size === 0)
            return p({ error: WD("invalid_request", "the blob is empty") });
          let n = t === "image/svg+xml",
            r = t === "text/css" || t === "text/javascript",
            i = n ? zD : r ? RD : LD;
          return e.size > i
            ? p({
                error: WD(
                  "too_large",
                  n
                    ? "the SVG exceeds the 2 MiB limit"
                    : r
                      ? "the stylesheet or script exceeds the 16 MiB limit"
                      : "the blob exceeds the 20 MiB limit",
                ),
              })
            : b((n) => g(m(e, t), kD, kD, AD, n), JD, AD, e.size, void 0, !0);
        }
        case "list": {
          let e = o.args[0];
          if (e != null && (typeof e != "string" || e.length > VD))
            return p({
              error: WD(
                "invalid_request",
                `the cursor must be a string of at most ${VD} characters`,
              ),
            });
          let t = typeof e == "string" && e !== "" ? { after: e } : {};
          return b((e) => g(h("list", JSON.stringify(t)), FD, ID, B, e), YD, B);
        }
        case "delete": {
          let e = o.args[0];
          return typeof e != "string" || !BD.test(e)
            ? p({
                error: WD(
                  "invalid_request",
                  "the argument must be an asset id",
                ),
              })
            : b(
                (t) => g(h(`${e}/delete`, "{}"), FD, ID, B, t),
                XD,
                B,
                void 0,
                (e) => e.deleted,
              );
        }
        default:
          return p({
            error: WD("capability_removed", "unknown assets method"),
          });
      }
    };
  return (
    window.addEventListener("message", _),
    () => {
      window.removeEventListener("message", _);
      for (let [e, t] of f) (clearTimeout(e), t());
    }
  );
}
function nO(e) {
  return Object.entries(e.capabilities ?? {}).some(([t, n]) =>
    !n ||
    typeof n != "object" ||
    n.optional === !0 ||
    !te.has(t) ||
    (t === "room" && n.local === !0)
      ? !1
      : t === "user"
        ? be(e) !== null
        : t !== "network" || O(e) !== null,
  );
}
var rO = new Set(["remote_control"]),
  iO = new Set([
    "microphone",
    "camera",
    "geolocation",
    "motion",
    "screenshare",
    "speech",
    "midi",
  ]),
  aO = new Map([
    ["mcp", new Set(["callTool", "watchTool"])],
    ["assets", new Set(["upload", "delete"])],
    ["sample", new Set(["sample"])],
    ["endpoints", new Set(["fetch"])],
    ["artifact", new Set(["publish", "edit"])],
    ["self", new Set(["publish", "edit"])],
    ["dictation", new Set(["start"])],
    ["tts", new Set(["speak", "add"])],
  ]),
  oO = new Set(["downloads", "comments", "files", "paste"]);
function sO(e, t, n, r, i, a) {
  let { frameOrigin: o } = e,
    s = new Set(),
    c = (t, n) => {
      s.delete(t) && e.trackCapCalled?.(t, n);
    };
  i.current = c;
  let l = (i) => {
    if (
      !t.isConnected ||
      !a() ||
      i.origin !== o ||
      !t.contentWindow ||
      i.source !== t.contentWindow
    )
      return;
    let c = _e(i.data);
    if (!c) return;
    let l = n.get(c.cap);
    if (l === void 0) return;
    let u = aO.get(c.cap);
    if (!(u && !u.has(c.method))) {
      if (l !== "decide") {
        e.trackCapCalled?.(c.cap, l);
        return;
      }
      switch (r(c.cap)) {
        case "granted":
          e.trackCapCalled?.(c.cap, "granted");
          return;
        case "denied":
          e.trackCapCalled?.(c.cap, "denied");
          return;
        case "prompt":
          s.add(c.cap);
          return;
        default:
          return;
      }
    }
  };
  return (
    window.addEventListener("message", l),
    () => {
      (window.removeEventListener("message", l),
        i.current === c && (i.current = null),
        s.clear());
    }
  );
}
var cO = 32,
  lO = 9e5,
  uO = 32,
  dO = 1e4,
  fO = 12e3;
function pO(e) {
  return (
    WO !== null ||
    e.decisionSurfaceOpen() ||
    document.querySelector(e.confirmOpenSelector) !== null
  );
}
function mO(e) {
  return (
    pO(e) || document.querySelector(`${Sw}, [data-frame-inert-claim]`) !== null
  );
}
var hO = 15e3,
  gO = null,
  _O = 0;
function vO() {
  ((gO = null), (_O = Date.now()));
}
function yO(e, t) {
  return e === "press" && _O > t ? !1 : e;
}
function bO(e) {
  !e.isConnected || qA.get(e) !== Q || (gO = { at: Date.now() });
}
function xO() {
  let e = gO;
  return ((gO = null), e !== null && Date.now() - e.at < 15e3);
}
function SO(e, t) {
  let n = Be(t),
    r = navigator.userActivation,
    i = xO(),
    a = pe(n, r),
    o = (i || a) && pO(e),
    s = a && !o,
    c = s && re("strict", n);
  return { attested: s, gesture: i && !o ? "press" : c ? "activation" : !1 };
}
var CO = (e, t) => {
    if (!e.startsWith("mcp:")) return null;
    let n = e.slice(4);
    return t.find((e) => e.server === n) ?? null;
  },
  wO = (e, t) => {
    let n = new Set(e);
    if (n.has("mcp")) for (let e of t) n.add(`mcp:${e.server}`);
    return n;
  },
  TO = (e, t, n, r, i, a) => () => {
    if (e !== t()) return;
    let o = n();
    if (!o?.isConnected) return;
    let s = i(),
      c = new Map(r().map((e) => [e.server, new Set(e.tools)]));
    s.some((e) => {
      let t = c.get(e.server);
      return !t || e.tools.some((e) => !t.has(e));
    }) && a(o, s);
  },
  EO = 512;
function DO(e, t, n, r, i, a, o, s = Xw) {
  let { frameOrigin: c } = e,
    l = Pe(de),
    u = (u) => {
      if (
        !t.isConnected ||
        !o() ||
        u.origin !== c ||
        !t.contentWindow ||
        u.source !== t.contentWindow
      )
        return;
      let d = _e(u.data, "permissions");
      if (d) {
        let a = performance.now(),
          f = (n) => {
            o() &&
              (t.contentWindow?.postMessage(ye(d.id, n), c),
              e.noteCapOutcome?.(
                d.cap,
                d.method,
                "error" in n ? n.error.code : null,
                t,
                performance.now() - a,
              ));
          };
        if (d.method === "state") {
          if (d.args.length === 0) return f({ result: n.stateAll() });
          let [e] = d.args;
          return typeof e != "string" || e.length > EO
            ? f({
                error: {
                  code: "bad_request",
                  message: "state takes no arguments or one capability name",
                },
              })
            : f({ result: n.query(e) });
        }
        if (d.method === "manage") {
          if (!(!mO(e) && Cw < 4 && l.take() && s(() => f({ result: null }))))
            return f({
              error: {
                code: "unavailable",
                message: "the Permissions panel did not open",
              },
            });
          ((Cw += 1), t.contentWindow?.postMessage(De(d.id), c));
          return;
        }
        if (d.method !== "request")
          return f({
            error: {
              code: "upstream_error",
              message: `unknown method ${d.method}`,
            },
          });
        let p = d.args.length === 0,
          m;
        if (p) m = r();
        else {
          let [e] = d.args;
          if (
            !Array.isArray(e) ||
            e.length > cO ||
            !e.every((e) => typeof e == "string" && e.length <= EO)
          )
            return f({
              error: {
                code: "bad_request",
                message:
                  "request takes no arguments or an array of capability names",
              },
            });
          m = e;
        }
        let h = { gesture: SO(e, u).gesture },
          g = n.wouldPrompt(m, h);
        (g && t.contentWindow?.postMessage(De(d.id), c),
          (p ? n.requestAll(h) : n.request(m, h)).then((e) => {
            (f({ result: e }), g && i());
          }));
        return;
      }
      a && at(e, u.data);
    };
  return (
    window.addEventListener("message", u),
    () => {
      window.removeEventListener("message", u);
    }
  );
}
function OO(e) {
  return {
    code: "server_not_connected",
    message: "no connector by this name is connected for this viewer",
    reason: AO.has(e) ? e : "other",
  };
}
function kO(e) {
  return {
    code: "not_in_manifest",
    message: "this tool is not available on this connector for this artifact",
    reason: AO.has(e) ? e : "other",
  };
}
var AO = new Set([
  "server_not_connected",
  "selection_required",
  "no_grantable_tools",
  "not_in_manifest",
  "tool_missing",
]);
function jO(
  e,
  t,
  n,
  r,
  i,
  a,
  o,
  s,
  c = null,
  l = null,
  u = { listedEmpty: new Set(), spent: new Set() },
  d = new Map(),
  f = null,
  p = { current: null },
) {
  let { frameOrigin: m, frameUuid: h } = e,
    g = new Map(r.map((e) => [e.server, new Set(e.tools)])),
    _ = f ?? ((e, t) => g.get(e)?.has(t) === !0),
    v = !1,
    y = !1,
    b = (e, t) => {
      e?.code === "blocked_by_policy" &&
        typeof t == "string" &&
        !rf(t) &&
        a.onBlockedCall?.(t);
    },
    x = r.filter((e) => rf(e.server)),
    S = x.length > 0 && sf() ? kw() : null,
    C;
  if ((!S && Ow && Ow.refresh([]), S)) {
    (S.rehello(), S.refresh(x.map((e) => e.server)));
    let e = (e) => {
      if (o()) {
        for (let e of x) UC.delete(e.server);
        xw({ servers: jw(e, g) }, g);
      }
    };
    ((C = S.onInventory(e)), e(S.inventory()));
  }
  let w = (e, t, n) => (
      t && (e.retryable = !0),
      e.retryable === !0 &&
        typeof n == "number" &&
        Number.isFinite(n) &&
        n >= 0 &&
        (e.retryAfterMs = Math.min(n, 6e4)),
      e
    ),
    T = (e) =>
      e === "consent_denied" && c?.viewerNoCode === "not_granted"
        ? "not_granted"
        : e,
    E = (e, t, n) => {
      try {
        let r = JSON.parse(t).error;
        if (r && typeof r.code == "string") {
          let t = typeof r.server == "string" ? r.server : n,
            i = r.code === "approval_rejected",
            a = i ? "approval_required" : (HC[r.code] ?? T(r.code)),
            o = i
              ? "this call needs the viewer's approval and none was given"
              : String(r.message ?? "");
          return w(
            Z(a, o, t),
            (r.retryable === !0 ||
              e === 429 ||
              e >= 500 ||
              r.code === "file_ref_expired") &&
              j(a) === "none",
            r.retryAfterMs,
          );
        }
      } catch {}
      return w(
        Z(
          e === 404
            ? "server_not_found"
            : e === 429 || e >= 500
              ? "server_unavailable"
              : "upstream_error",
          `request failed (${e})`,
          n,
        ),
        e === 429 || e >= 500,
      );
    },
    D = (e, t) => {
      let n = e instanceof DOMException && e.name === "TimeoutError";
      return w(
        Z(n ? "server_unavailable" : "upstream_error", "request failed", t),
        n,
      );
    },
    O = new Set([
      "server_unavailable",
      "upstream_error",
      "tool_error",
      "bad_request",
      "consent_unavailable",
      "rate_limited",
    ]),
    k = new Set([
      "needs_reauth",
      "server_not_connected",
      "server_not_found",
      "selection_required",
    ]),
    A = new Set(["server_not_connected", "cancelled"]),
    j = (e) => (O.has(e) ? "none" : k.has(e) ? "server" : "tool"),
    M = () =>
      a
        .postServers()
        .then((e) => {
          if (!e.ok) return { error: E(e.status, e.text) };
          let t = JSON.parse(e.text);
          if (!o()) return null;
          let n = MC(t);
          return (
            n && Rw?.refresh(n),
            a.onEntries(ee(t)),
            xw(t, g),
            { parsed: t }
          );
        })
        .catch((t) => (e.markHandled(t), { error: D(t) })),
    te = (t) => {
      let n = (c?.pending() ?? []).filter((e) => !rf(e.server) || sf()),
        r = n
          .filter((e) => !g.has(e.server))
          .map((e) => ({
            server: e.server,
            authStatus: "unknown",
            tools: e.tools.map((e) => ({ name: e, description: "" })),
          })),
        i = new Map(
          n.flatMap((e) => {
            let t = g.get(e.server);
            if (!t) return [];
            let n = e.tools.filter((e) => !t.has(e));
            return n.length > 0 ? [[e.server, n]] : [];
          }),
        ),
        a = (e) => {
          let t = i.get(e.server);
          return t
            ? {
                ...e,
                tools: [
                  ...e.tools,
                  ...t.map((e) => ({ name: e, description: "" })),
                ],
              }
            : e;
        },
        o = l !== null && l.value !== "",
        s = (e) => {
          if (!("result" in e)) return t(e);
          let n = [...e.result.servers.map(a), ...r];
          u.listedEmpty.clear();
          for (let e of n)
            e.tools.length === 0 &&
              g.has(e.server) &&
              u.listedEmpty.add(e.server);
          t({ result: { servers: n, ...(o && { fileArgs: !0 }) } });
        };
      if (g.size === 0) return s({ result: { servers: [] } });
      Promise.all([M(), S?.ready()])
        .then(([e]) => {
          if (e === null) return;
          if ("error" in e) return s({ error: e.error });
          let { parsed: t } = e,
            n = S ? jw(S.inventory(), g) : [];
          s({
            result: {
              servers: [
                ...(t.servers ?? []).filter((e) => !rf(String(e.server ?? ""))),
                ...n,
              ].flatMap((e) => {
                let t = String(e.server ?? ""),
                  n = g.get(t);
                return n
                  ? [
                      {
                        server: t,
                        authStatus: String(e.authStatus ?? ""),
                        tools: (e.tools ?? []).flatMap((e) => {
                          let t = String(e.name ?? "");
                          if (!n.has(t)) return [];
                          let r = Aw(e.annotations);
                          return [
                            {
                              name: t,
                              description: String(e.description ?? ""),
                              ...(r && { annotations: r }),
                            },
                          ];
                        }),
                      },
                    ]
                  : [];
              }),
            },
          });
        })
        .catch((t) => {
          (e.markHandled(t), s({ error: D(t) }));
        });
    },
    N = (r, i, s, c, l, u, f, p = !1, m = Date.now(), g) => {
      let v = (t) => {
          if (rf(c) && A.has(t.code)) return t;
          let r = j(t.code);
          if (r !== "none") {
            let t = ag(e.org, n.account, h);
            t !== null &&
              Ng(t, r === "server" ? { server: c } : { server: c, tool: l });
          }
          return t;
        },
        y,
        b,
        x = !1,
        C,
        O,
        k = rf(c),
        M = k ? "authorize" : "call",
        ee = k ? Ye(i) : i,
        te = () => (!k && g?.waiting() === !0 ? uC : void 0),
        N = () =>
          Je(
            e,
            M,
            ee,
            s !== void 0 && !k ? "serverId" : null,
            a.dropSelections,
            c,
            void 0,
            f?.signal,
            te,
          );
      (k ? fE(S, c, l).then((e) => (e === null ? N() : uE(e))) : N())
        .then(async (D) => {
          let A = !1,
            N = !1;
          if (!D.ok && D.status === 403 && !Xe(D.text) && !f?.cancelled()) {
            let t = await e.requestReboot(),
              r = Math.min(B - (Date.now() - u), Ke.call) - qe;
            if (t !== null) {
              if (t.org !== n.org || z(t.assetToken) !== n.account)
                n.gen === Q && mw();
              else if (n.gen !== Q) A = !0;
              else if (!_(c, l) || r <= 0) ((n.value = t.token), (A = !0));
              else {
                n.value = t.token;
                let i = JSON.parse(ee);
                ((i.mcpToken = t.token),
                  (N = !0),
                  (D = await Je(
                    e,
                    M,
                    JSON.stringify(i),
                    s !== void 0 && !k ? "serverId" : null,
                    a.dropSelections,
                    c,
                    r,
                    f?.signal,
                    te,
                  )));
              }
            }
          }
          let P = (e) =>
              e.status === 403 && Ze(e.text) === "server_not_connected",
            F = 0,
            ne = 0,
            re = Date.now();
          for (; !k && F < 2 && P(D) && Ck(c) && o() && !f?.cancelled();) {
            let t = (e) => Math.min(B - (Date.now() - u) - e, Ke.call) - qe;
            if (t(1e3) <= 0) break;
            await new Promise((e) => {
              window.setTimeout(e, pk);
            });
            let r = t(0);
            if (r <= 0 || f?.cancelled() || !o() || !Ck(c) || !_(c, l)) break;
            F++;
            let i = JSON.parse(D.sent ?? ee);
            i.mcpToken = n.value;
            let s = await Je(
              e,
              M,
              JSON.stringify(i),
              "serverId" in i ? "serverId" : null,
              a.dropSelections,
              c,
              r,
              f?.signal,
              te,
            );
            if (!s.ok && !Xe(s.text)) {
              [401, 403, 429].includes(s.status) || (D = s);
              break;
            }
            ((D = s), P(D) && ne++);
          }
          F > 0 &&
            (ne === 2 && wk(c, re),
            o() &&
              t.isConnected &&
              !f?.cancelled() &&
              e.report(
                "reauth-prompt",
                P(D)
                  ? "not-connected-repost-failed"
                  : "not-connected-repost-ok",
              ));
          let ie = (e) =>
              e?.reason === "first_use_with_claude" && g?.watched?.() === !0,
            I = (e) => f?.cancelled() !== !0 && (g?.waiting() === !0 || ie(e)),
            ae = (t) =>
              g?.waiting() === !0 ||
              (f?.cancelled() !== !0 &&
                ie(t) &&
                document.visibilityState === "visible" &&
                e.hostPaneHidden?.() !== !0 &&
                !("headerHidden" in document.documentElement.dataset)),
            oe = (t, n) => {
              try {
                let r = n();
                r !== null && e.report("tool-approval", `${cC(t)}:${r}`);
              } catch {}
            },
            se = (t) =>
              g === void 0
                ? "revalidation"
                : f?.cancelled() === !0
                  ? "gone"
                  : t.reason === "first_use_with_claude"
                    ? g.watched?.() === !0
                      ? document.visibilityState === "visible"
                        ? e.hostPaneHidden?.() === !0
                          ? "pane-closed"
                          : "headerHidden" in document.documentElement.dataset
                            ? "fullscreen"
                            : "gone"
                        : "went-hidden"
                      : "gone"
                    : "watch-not-first-use",
            ce = !1,
            le = !1,
            ue = (e) =>
              e.ok ||
              !["approval_required", "approval_rejected", null].includes(
                Ze(e.text),
              );
          if (!D.ok && D.status === 403 && !k && f && !f.cancelled()) {
            let e = _C(D.text);
            e !== null &&
              (g === void 0 || !ae(e)) &&
              oe(e.reason, () => `suppressed:${se(e)}`);
          }
          if (
            !D.ok &&
            D.status === 403 &&
            g !== void 0 &&
            ae(_C(D.text)) &&
            !k &&
            f &&
            !f.cancelled()
          ) {
            let r = async (e, t) => {
                if (e?.reason !== "first_use_with_claude") return t(g.gone());
                let n = new AbortController(),
                  r = g.gone(),
                  i = () => {
                    I(e)
                      ? g.gone() !== r &&
                        (r.removeEventListener("abort", i),
                        (r = g.gone()),
                        r.addEventListener("abort", i, { once: !0 }))
                      : n.abort();
                  };
                (r.addEventListener("abort", i, { once: !0 }),
                  f.signal.addEventListener("abort", i, { once: !0 }),
                  JC.add(i),
                  i());
                try {
                  return await t(n.signal);
                } finally {
                  (r.removeEventListener("abort", i),
                    f.signal.removeEventListener("abort", i),
                    JC.delete(i));
                }
              },
              i = { server: c, tool: l },
              s = _C(D.text, i),
              h = Date.now(),
              v = cE(ee),
              S = `${c}\u0000${l}`,
              w = async (t) => {
                let r = JSON.parse(D.sent ?? ee);
                r.mcpToken = n.value;
                let i = await Je(
                  e,
                  M,
                  JSON.stringify(r),
                  "serverId" in r ? "serverId" : null,
                  a.dropSelections,
                  c,
                  t,
                  f.signal,
                  te,
                );
                return i.ok || Xe(i.text) || ![401, 403, 429].includes(i.status)
                  ? i
                  : null;
              },
              T = fC(s?.reason) && v.ok ? d.get(S) : void 0;
            if (T !== void 0) {
              let e = s;
              s = null;
              let t = B - (Date.now() - u) - aE,
                n = t > 0 && (await r(e, (e) => sE(T, t, e))),
                a = Math.min(B - (Date.now() - u), Ke.call) - qe;
              if (n && I(e) && o() && !f.cancelled() && a > 0 && _(c, l)) {
                let e = await w(a);
                if (e !== null) {
                  D = e;
                  let t = !D.ok && D.status === 403 ? _C(D.text, i) : null;
                  ((s = fC(t?.reason) && d.has(S) ? null : t),
                    (h = Date.now()));
                }
              }
            }
            if (
              (s !== null &&
                !f.cancelled() &&
                !(v.ok && ae(s)) &&
                oe(s.reason, () =>
                  v.ok ? `suppressed:${se(s)}` : "suppressed:unreadable-input",
                ),
              s !== null && v.ok && ae(s) && !f.cancelled())
            ) {
              if (fC(s.reason) && !d.has(S)) {
                let e = new Promise((e) => {
                    y = e;
                  }),
                  t = [S];
                d.set(S, e);
                let n = !0;
                b = (r) => {
                  for (let i of YS(r))
                    !n || d.has(i) || (d.set(i, e), t.push(i));
                };
                let r = window.setTimeout(
                  () => y?.(!1),
                  Math.max(0, B - (Date.now() - u)),
                );
                e.then(() => {
                  ((n = !1), window.clearTimeout(r));
                  for (let n of t) d.get(n) === e && d.delete(n);
                });
              }
              let T = s,
                E = !1,
                k,
                j = (n, r, i, a) =>
                  eC(
                    e,
                    {
                      server: c,
                      tool: l,
                      input: v.input,
                      ...(n.reason !== void 0 && { reason: n.reason }),
                      ...(n.canRemember && { canRemember: !0 }),
                      ...(n.set !== void 0 && { set: n.set }),
                      ...(n.withClaude && { withClaude: !0 }),
                    },
                    {
                      budgetMs: Math.min(
                        B - (Date.now() - u) - aE,
                        (n.expiresInMs ?? 1 / 0) - (Date.now() - r) - oE,
                      ),
                      activation: p,
                      activationAt: m,
                      busy: () => pO(e),
                      live: () => o() && t.isConnected && _(c, l) && ae(n),
                      signal: a,
                      onPaint: (t) => {
                        ((E = !0),
                          oe(t.reason, () =>
                            document.visibilityState === "visible" &&
                            e.hostPaneHidden?.() !== !0
                              ? "drawn:visible"
                              : "drawn:hidden",
                          ),
                          t.set && b?.(t.set));
                      },
                      onRefuse: (e) => {
                        k = e;
                      },
                      ...(i && { released: i }),
                      ...(!g.waiting() && { watch: !0 }),
                    },
                  ),
                P = async (e, t, n = !1) => {
                  ((E = !1), (k = void 0));
                  let i = await r(e, (r) => j(e, t, n, r));
                  return (
                    oe(e.reason, () =>
                      lC(i, E, k, () => (ae(e) ? "gone" : se(e))),
                    ),
                    i
                  );
                },
                F = await P(T, h);
              if (F === "remembered" || F === "covered") {
                let e = Math.min(B - (Date.now() - u), Ke.call) - qe,
                  t = I(T) && o() && !f.cancelled() && e > 0 && _(c, l),
                  n = t ? await w(e) : null;
                if (n !== null) {
                  ((D = n), (le = !0));
                  let e = !D.ok && D.status === 403 ? _C(D.text, i) : null;
                  e !== null &&
                    I(e) &&
                    !f.cancelled() &&
                    ((T = e), (h = Date.now()), (F = await P(T, h, !0)));
                } else t && I(T) && !f.cancelled() && (F = await P(T, h, !0));
              }
              let ne = T.challenge,
                re = !1,
                ie = !1;
              ((x = F === "allow_remember"),
                (C = x ? nC(c, l) : void 0),
                (O =
                  F === "allow_set" && T.set !== void 0
                    ? { set: T.set, token: iC(c, l) }
                    : void 0));
              let de = Math.min(B - (Date.now() - u), Ke.call) - qe;
              if (
                (F === "allow" ||
                  F === "allow_remember" ||
                  F === "allow_set") &&
                I(T) &&
                o() &&
                de > 0 &&
                _(c, l)
              ) {
                let t = JSON.parse(D.sent ?? ee);
                ((t.approval = ne),
                  (t.mcpToken = n.value),
                  F === "allow_remember" && T.canRemember === !0
                    ? (t.remember = !0)
                    : delete t.remember,
                  delete t.confirmSet,
                  O !== void 0 &&
                    T.setToken !== void 0 &&
                    ((t.confirmSet = T.setToken),
                    new TextEncoder().encode(JSON.stringify(t)).length >
                      1048576 &&
                      (delete t.confirmSet,
                      e.report(
                        "mcp-call",
                        "first-use-other-tools-unconfirmed:body-too-large",
                      ))),
                  (ce = !0));
                let r = async (n) => {
                  let r = (n) =>
                      Je(
                        e,
                        M,
                        JSON.stringify(t),
                        null,
                        a.dropSelections,
                        c,
                        n,
                        f.signal,
                        te,
                      ),
                    i = await r(n);
                  if (
                    (t.remember !== !0 && t.confirmSet === void 0) ||
                    i.status !== 400 ||
                    Xe(i.text) ||
                    i.text.trim() !== "bad json"
                  )
                    return i;
                  (t.confirmSet !== void 0 &&
                    e.report(
                      "mcp-call",
                      "first-use-other-tools-unconfirmed:old-control-plane",
                    ),
                    delete t.remember,
                    delete t.confirmSet);
                  let s = Math.min(B - (Date.now() - u), Ke.call) - qe;
                  return s > 0 && I(T) && o() && !f.cancelled() && _(c, l)
                    ? r(s)
                    : i;
                };
                if (
                  ((D = await r(de)),
                  !D.ok && D.status === 403 && !Xe(D.text) && I(T))
                ) {
                  let i = await e.requestReboot(),
                    a = Math.min(B - (Date.now() - u), Ke.call) - qe,
                    s =
                      i !== null &&
                      i.org === n.org &&
                      z(i.assetToken) === n.account;
                  (i !== null && !s ? n.gen === Q && mw() : s && (A = !0),
                    s &&
                      n.gen === Q &&
                      I(T) &&
                      o() &&
                      a > 0 &&
                      _(c, l) &&
                      ((n.value = i.token),
                      (t.mcpToken = i.token),
                      (N = !0),
                      (D = await r(a)),
                      (D.status === 401 || D.status === 403) &&
                        !Xe(D.text) &&
                        (A = !1)));
                }
                ((re = D.ok && t.remember === !0),
                  (ie = ue(D) && t.confirmSet !== void 0));
              }
              if (
                (F === "allow_remember" && ((x = !1), rC(c, l, re && o(), C)),
                O !== void 0)
              ) {
                let { set: e, token: t } = O;
                ((O = void 0), aC(e, ie && o(), t));
              }
            }
          }
          y?.((ce || le) && ue(D));
          let de = D.text;
          if (!D.ok) {
            (D.status === 401 || D.status === 403) &&
              !Xe(de) &&
              !A &&
              Pw(n) &&
              (D.status === 401 || N ? mw() : hw());
            let e = v(E(D.status, de, c)),
              t = !k && $O.has(e.code) ? fA(de, c) : null;
            return (
              t !== null && nA.set(e, t),
              r(
                { error: e },
                !1,
                f?.cancelled() || D.status === 0 ? void 0 : String(D.status),
              )
            );
          }
          let fe;
          try {
            fe = JSON.parse(de);
          } catch {
            fe = void 0;
          }
          if (k) {
            let t = fe ?? {};
            if (
              !fe ||
              typeof fe != "object" ||
              Array.isArray(fe) ||
              t.ok !== !0 ||
              typeof t.grant != "string" ||
              t.grant === ""
            )
              return r(
                { error: v(Z("upstream_error", "malformed response", c)) },
                !1,
              );
            let n = Math.min(B - (Date.now() - u), Ke.call) - qe,
              a = await S.call(
                {
                  slug: h,
                  server: c,
                  tool: l,
                  input: JSON.parse(i).input ?? {},
                  grant: t.grant,
                  org: e.org,
                  activation: p,
                  consentSeq: Rw?.decisionSeq(c) ?? 0,
                },
                { timeoutMs: Math.max(n, 0), signal: f?.signal },
              );
            return "error" in a
              ? a.error.code === "tool_error" && a.error.result
                ? r({ result: a.error.result }, !1)
                : r(
                    {
                      error: v(
                        w(
                          Z(a.error.code, a.error.message, c),
                          a.retryable && j(a.error.code) === "none",
                          a.error.retryAfterMs,
                        ),
                      ),
                    },
                    !1,
                  )
              : r({ result: a.result }, !D.noStore);
          }
          if (fe === void 0) return r({ result: de }, !1);
          if (!fe || typeof fe != "object" || Array.isArray(fe))
            return r({ result: fe }, !1);
          let pe = fe;
          if (pe.error) {
            let e =
                typeof pe.error.code == "string"
                  ? pe.error.code
                  : "upstream_error",
              t = e === "approval_rejected" ? "approval_required" : T(e),
              n =
                e === "approval_rejected"
                  ? "this call needs the viewer's approval and none was given"
                  : String(pe.error.message ?? ""),
              i = typeof pe.error.server == "string" ? pe.error.server : c;
            return r(
              {
                error: v(
                  w(
                    Z(t, n, i),
                    pe.error.retryable === !0 && j(t) === "none",
                    pe.error.retryAfterMs,
                  ),
                ),
              },
              !1,
            );
          }
          if (!("result" in pe))
            return r(
              { error: v(Z("upstream_error", "malformed response", c)) },
              !1,
            );
          let me = pe.result;
          if (
            typeof me == "object" &&
            me &&
            !Array.isArray(me) &&
            "cache" in me
          ) {
            let { cache: e, ...t } = me;
            me = t;
          }
          r({ result: me }, !D.noStore && !ce);
        })
        .catch((t) => {
          (y?.(!1),
            x && rC(c, l, !1, C),
            O !== void 0 && aC(O.set, !1, O.token),
            e.markHandled(t));
          let n = t?.name;
          r(
            { error: v(D(t, c)) },
            !1,
            f?.cancelled()
              ? void 0
              : n === "TimeoutError"
                ? "timeout"
                : n === "AbortError"
                  ? "abort"
                  : "error",
          );
        });
    },
    P = Date.now();
  Ag();
  let F = new Map(),
    ne = (e) => e.wipeGen === Fg() && !e.refresh,
    re = (e) => e.wipeGen === Fg() && e.invGen === Lg(),
    ie = (e, t) => {
      let n = g.has(e)
        ? kO("server_not_connected")
        : OO("server_not_connected");
      return Z(n.code, n.message, e);
    },
    I = (e) =>
      Z(
        "org_mcp_disabled",
        "connectors are disabled by your organization's admin",
        e,
      ),
    ae = (e, t = !1) =>
      Z(
        t && c !== null ? c.viewerNoCode : "not_in_manifest",
        t
          ? "the viewer has not allowed this connector for this artifact"
          : "outside the scope you consented to. Reload to review.",
        e,
      ),
    oe = (n, r, i, a, l, u, d, f = c, h) => {
      let g = Date.now(),
        _ =
          h ??
          (() =>
            l({
              error: w(
                Z(
                  "upstream_error",
                  "connector access isn't confirmed for this artifact right now",
                  n,
                ),
                !0,
                Ch,
              ),
            }));
      if (!f?.hold(n, r)) return _();
      let y = Date.now(),
        b = !1,
        x = () => Date.now() - y > (b && v ? lO - qe : B - fO),
        S = () =>
          E.cancelled || x()
            ? !1
            : (i !== "" &&
                (t.contentWindow?.postMessage(De(i), m),
                (b = !0),
                v && (y = Date.now())),
              !0),
        C = !1,
        T = () => {
          (C || f.release(n, r), (C = !0));
        },
        E = { cancelled: !1, withdraw: T };
      a !== "" && s.set(a, E);
      let D = () => {
          a !== "" && s.get(a) === E && s.delete(a);
        },
        O = () => {
          if (E.cancelled || !o() || !t.isConnected) {
            (D(), T());
            return;
          }
          (f.wouldPrompt(n, r, u) && S(),
            f
              .decide(n, r, S, u)
              .then((r) => {
                if ((D(), !o() || !t.isConnected || E.cancelled || x())) return;
                let i = c?.live ?? p.current;
                if (r === "granted" && i)
                  return (S(), d(i, v ? Date.now() : g));
                if (r === "denied")
                  return (c?.track("denied"), l({ error: ae(n, !0) }));
                if (typeof r == "object")
                  return (
                    e.report("mcp-call", `dynamic-refused:${r.reason}`),
                    l({ error: Z(r.code, r.message, n) })
                  );
                _();
              })
              .catch(() => {
                !E.cancelled &&
                  !x() &&
                  l({ error: Z("upstream_error", "request failed", n) });
              })
              .finally(T));
        };
      f.schedule ? f.schedule(O) : O();
    },
    se = (t) => {
      let n = () => void 0,
        r = new Promise((e) => {
          n = e;
        }),
        i = {
          item: t,
          ack: () => void 0,
          settle: (t) => {
            (t !== "healed" && o() && e.report("reauth-prompt", `hold-${t}`),
              n(t === "healed" ? "granted" : "withheld"));
          },
        };
      return {
        hold: () => (rA.size >= uO || !lA(t.server) ? !1 : (rA.add(i), !0)),
        release: () => rA.delete(i),
        schedule: null,
        wouldPrompt: () => !0,
        decide: (e, t, n) => ((i.ack = n), r),
      };
    },
    ce = (e) => typeof e == "object" && !!e && !Array.isArray(e),
    le = null,
    ue = (t, n) => {
      let [r, i] = n;
      if (typeof r != "string" || typeof i != "string")
        return t({
          error: Z("bad_request", "server and tool must be strings"),
        });
      if (!g.get(r)?.has(i)) {
        let e = c?.peek(r, i);
        return t(
          e === "refused"
            ? { error: ie(r, i) }
            : e === "org_off"
              ? { error: I(r) }
              : {
                  error:
                    e === "ask"
                      ? Z(
                          "not_in_manifest",
                          "the viewer has not yet been asked to allow this connector; the first tool call asks",
                          r,
                        )
                      : ae(r, e === "revoked"),
                },
        );
      }
      if (rf(r))
        return t({
          error: Z("bad_request", "no schema available for this server", r),
        });
      ((le ??= M().finally(() => {
        le = null;
      })),
        le
          .then((e) => {
            if (e === null) return;
            if ("error" in e) return t({ error: e.error });
            let n = (e.parsed.servers ?? []).find(
              (e) => String(e.server ?? "") === r,
            );
            if (!n)
              return t({
                error: Z(
                  "server_not_connected",
                  "no server by that name is reachable from this view",
                  r,
                ),
              });
            let a = n.tools ?? [];
            if (a.length === 0)
              return t({
                error: Z(
                  ZO.has(String(n.authStatus ?? ""))
                    ? "needs_reauth"
                    : "server_not_connected",
                  "no callable tools for this server in this view",
                  r,
                ),
              });
            let o = a.find((e) => String(e.name ?? "") === i);
            if (!o || !ce(o.inputSchema))
              return t({
                error: Z("bad_request", "no schema available for this tool", r),
              });
            let s = Aw(o.annotations);
            t({
              result: {
                name: i,
                description: String(o.description ?? ""),
                ...(s && { annotations: s }),
                inputSchema: o.inputSchema,
                ...(ce(o.outputSchema) && { outputSchema: o.outputSchema }),
              },
            });
          })
          .catch((n) => {
            (e.markHandled(n), t({ error: D(n) }));
          }));
    },
    de = (r, i, a, l, u, d, f, p, h, g, _) => {
      let v = new AbortController(),
        b = { cancelled: !1, controller: v };
      u !== "" && s.set(u, b);
      let x = _ && u !== "";
      x && t.contentWindow?.postMessage(De(u), m);
      let S = () => (x ? Wg : B - (Date.now() - a)),
        C = (e) => w(Z("upstream_error", e, d), !0);
      (async () => {
        let m = (e) => ({ error: Z("capability_disabled", e, d) }),
          T;
        try {
          let t = await e_(e, r.value, i, v.signal, S());
          if (!("stale" in t)) T = t;
          else if (b.cancelled) T = m("file upload cancelled");
          else {
            let t = await e.requestReboot(),
              a =
                t !== null && t.org === r.org && z(t.assetToken) === r.account;
            if (t === null)
              T = { error: C("file upload refused: session refresh failed") };
            else if (!a)
              (n.gen === Q && mw(),
                (T = m(
                  "file upload refused: session changed, reload the page",
                )));
            else if (r.gen !== Q || b.cancelled)
              T = { error: C("file upload refused: session changed") };
            else if (t.handoffToken === void 0)
              T = m("file arguments are not available in this view");
            else {
              r.value = t.handoffToken;
              let n = await e_(e, r.value, i, v.signal, S());
              T =
                "stale" in n
                  ? m("file upload refused: session expired, reload the page")
                  : n;
            }
          }
        } catch (t) {
          (e.markHandled(t),
            (T = {
              error: w(Z("server_unavailable", "file upload failed", d), !0),
            }));
        }
        if (
          (u !== "" && s.get(u) === b && s.delete(u),
          b.cancelled || !o() || !t.isConnected)
        )
          return;
        if (!("ref" in T)) return l({ error: { ...T.error, server: d } });
        if (!x && Date.now() - a > 13e4 - fO) return;
        let E = c?.live ?? (y ? Se : null);
        if (E === null)
          return l({ error: C("connector scope changed during the upload") });
        i.place(T.ref);
        let D = { ...(typeof h == "object" && h ? h : {}), cache: !1 };
        E.call(l, u, d, f, p, D, g, !1, x ? Date.now() : a, !1, void 0, _, a);
      })();
    },
    fe = (
      r,
      u,
      d,
      f,
      p,
      m,
      _ = !1,
      y = !1,
      b = 0,
      x = !1,
      C,
      w = v,
      T = Date.now(),
      E = !1,
    ) => {
      let D = b > 0;
      if (typeof d != "string" || typeof f != "string")
        return r({
          error: Z("bad_request", "server and tool must be strings"),
        });
      let O = l !== null && l.value !== "" ? l : null;
      if (C !== void 0 && rf(d))
        return r({
          error: Z(
            "bad_request",
            "a file argument cannot go to a host server",
            d,
          ),
        });
      if (C !== void 0 && O === null)
        return r({
          error: Z(
            "capability_disabled",
            "file arguments are not available in this view",
            d,
          ),
        });
      if (!x && S !== null && rf(d) && gw()) return r({ error: dE(d) });
      let k = (e) => (t, n) =>
        t.call(r, u, d, f, p, m, !1, !1, n, !1, C, v, void 0, e);
      if (!g.get(d)?.has(f)) {
        let e = c?.classify(d, f);
        if (!D && u !== "" && e === "ask") {
          try {
            JSON.stringify(p ?? {});
          } catch {
            return r({
              error: Z("bad_request", "input is not JSON-serializable", d),
            });
          }
          return oe(d, f, u, u, r, y, k(!1));
        }
        return (
          u !== "" && e === "revoked" && c?.track("denied"),
          e === "refused"
            ? r({ error: ie(d, f) })
            : e === "org_off"
              ? (!D && u !== "" && c?.noteOrgOff(y), r({ error: I(d) }))
              : r({ error: ae(d, e === "revoked") })
        );
      }
      if (C !== void 0 && O !== null)
        return de(O, C, D ? b : Date.now(), r, u, d, f, p, m, _, w);
      u !== "" && !E && c?.track("granted");
      let A = Fg(),
        j = (e, t, n) => {
          !("error" in e) ||
            !$O.has(e.error.code) ||
            !o() ||
            n ||
            a.onAuthLapsedCall(d, e.error.code, t, nA.has(e.error));
        },
        M = (n, i) => {
          if (E && o()) {
            let t = "error" in n && $O.has(n.error.code);
            e.report("reauth-prompt", t ? "hold-again" : "hold-ok");
          }
          let a = () => {
              (i !== void 0 &&
                "error" in n &&
                o() &&
                t.isConnected &&
                e.report("mcp-call", i),
                r(n));
            },
            c = "error" in n ? nA.get(n.error) : void 0;
          if (!(
            c !== void 0 &&
            !D &&
            v &&
            s.has(u) &&
            o() &&
            A === Fg() &&
            Jk(e) &&
            ($k !== null || !pO(e))
          ))
            return a();
          oe(d, f, u, u, r, !1, k(!0), se(c), a);
        },
        ee = (e, t) => {
          let n = A === Fg();
          (j(e, n, E),
            M(e, t),
            "error" in e
              ? e.error.code === "selection_required" && a.onSelectionRequired()
              : o() && n && Ok(d));
        },
        te = rf(d) ? void 0 : i.get(d),
        ce;
      try {
        ce = JSON.stringify({
          slug: h,
          server: d,
          tool: f,
          input: p ?? {},
          mcpToken: n.value,
          ...(te !== void 0 && { serverId: te }),
        });
      } catch {
        return r({
          error: Z("bad_request", "input is not JSON-serializable", d),
        });
      }
      let le = D ? b : Date.now(),
        ue = ig(m);
      if (typeof d == "string") {
        let e = UC.get(d)?.byTool.get(f)?.readOnly;
        e === !1
          ? (ue = null)
          : e === !0 &&
            ue === null &&
            (typeof m != "object" || !m || m.cache === void 0) &&
            (ue = { staleTimeMs: 0, gcTimeMs: Xh, refresh: !1 });
      }
      let fe = ue?.refresh === !0,
        pe = ue === null ? null : ag(e.org, n.account, h);
      if (pe === null || !globalThis.crypto?.subtle) {
        let e = new AbortController(),
          t = { cancelled: !1, controller: e };
        return (
          u !== "" && s.set(u, t),
          N(
            (e, t, n) => ee(e, n),
            ce,
            te,
            d,
            f,
            le,
            { signal: e.signal, cancelled: () => t.cancelled },
            _,
            T,
            u === ""
              ? void 0
              : { waiting: () => !t.cancelled, gone: () => e.signal },
          )
        );
      }
      let he = sg(p ?? {}),
        ge = JSON.stringify({
          slug: h,
          server: d,
          tool: f,
          input: he,
          ...(te !== void 0 && { serverId: te }),
        }),
        L = F.get(ge);
      if (L) {
        (L.sends.push(M),
          L.participants++,
          E || (L.firstRun = !0),
          u !== "" &&
            (L.pages <= 0 && (L.pagesGone = new AbortController()),
            L.pages++,
            s.set(u, { cancelled: !1, flight: L, cacheBody: ge })),
          fe && (L.refresh = !0),
          (L.minStaleTimeMs = Math.min(
            L.minStaleTimeMs,
            ue?.staleTimeMs ?? 0,
          )));
        return;
      }
      let R = {
        sends: [],
        refresh: fe,
        minStaleTimeMs: ue?.staleTimeMs ?? 0,
        wipeGen: Fg(),
        invGen: Lg(),
        participants: 1,
        controller: new AbortController(),
        pages: u === "" ? 0 : 1,
        pagesGone: new AbortController(),
        firstRun: !E,
      };
      (F.set(ge, R),
        u !== "" && s.set(u, { cancelled: !1, flight: R, cacheBody: ge }),
        (async () => {
          let [e, t] = await Promise.all([cg(ge), cg(JSON.stringify(he))]),
            n = e === null || t === null ? null : pe + e,
            i = (e, r, i, s, c) => {
              F.get(ge) === e && F.delete(ge);
              let l = e.sends,
                u = r,
                p = e.wipeGen === Fg();
              j(r, p, !e.firstRun);
              let [m, ...h] = s ? [s, ...l] : l;
              m?.(u, c);
              for (let e of h) e(u);
              if (
                (uw(me, ge, u),
                "error" in r &&
                  r.error.code === "selection_required" &&
                  a.onSelectionRequired(),
                "result" in r && o() && p && Ok(d),
                i && n !== null && "result" in r && re(e))
              ) {
                let e = r.result;
                typeof e == "object" &&
                  e &&
                  !Array.isArray(e) &&
                  e.isError !== !0 &&
                  Mg(n, e, {
                    server: d,
                    tool: f,
                    inputHash: t ?? "",
                    gcTimeMs: ue?.gcTimeMs ?? 0,
                    dispatchedAt: le,
                    mountedAt: P,
                  });
              }
            };
          if (n !== null) {
            let e = await Og(n).catch(() => null),
              t = e !== null && Date.now() - e.createdAt <= R.minStaleTimeMs;
            if (e && ne(R) && t) {
              let t =
                  e.result !== null &&
                  typeof e.result == "object" &&
                  !Array.isArray(e.result)
                    ? {
                        ...e.result,
                        cache: { storedAt: e.createdAt, revalidating: !1 },
                      }
                    : e.result,
                n = R.sends;
              r({ result: t });
              for (let e of n) e({ result: t });
              (uw(me, ge, { result: t }), F.get(ge) === R && F.delete(ge));
              return;
            }
          }
          N(
            (e, t, n) => i(R, e, t, M, n),
            ce,
            te,
            d,
            f,
            le,
            R.controller
              ? {
                  signal: R.controller.signal,
                  cancelled: () => R.participants <= 0,
                }
              : void 0,
            _,
            T,
            {
              waiting: () => R.pages > 0,
              gone: () => R.pagesGone.signal,
              watched: () => ZC(me, ge),
            },
          );
        })());
    },
    pe = (t, r) => {
      let [i, a] = r;
      if (i !== void 0 && typeof i != "string")
        return t({ error: Z("bad_request", "server must be a string") });
      if (a !== void 0 && typeof a != "string")
        return t({ error: Z("bad_request", "tool must be a string") });
      let o = i,
        s = a,
        c = r[2] !== void 0,
        l;
      if (c) {
        if (o === void 0 || s === void 0)
          return t({
            error: Z("bad_request", "input requires server and tool"),
          });
        try {
          l = JSON.stringify(sg(r[2] ?? {}));
        } catch {
          return t({
            error: Z("bad_request", "input is not JSON-serializable"),
          });
        }
      }
      let u = ag(e.org, n.account, h);
      if (u === null) return t({ result: void 0 });
      Rg();
      for (let e of F.keys())
        try {
          let t = JSON.parse(e);
          (o === void 0 || t.server === o) &&
            (s === void 0 || t.tool === s) &&
            (!c || JSON.stringify(t.input) === l) &&
            F.delete(e);
        } catch {}
      (async () => {
        let e;
        if (c) {
          let n = await cg(l);
          if (n === null) return t({ result: void 0 });
          e = n;
        }
        (await Ng(u, { server: o, tool: s, inputHash: e }).catch(() => void 0),
          t({ result: void 0 }));
        for (let e of qC.values())
          dw(he, e) &&
            (o === void 0 || e.server === o) &&
            (s === void 0 || e.tool === s) &&
            (!c || JSON.stringify(e.input) === l) &&
            ge(e);
      })();
    },
    me = { gen: n.gen, frameUuid: h, account: n.account, org: e.org },
    he = {
      gen: n.gen,
      frameUuid: h,
      account: n.account,
      org: e.org,
      inScope: (e, t) => g.get(e)?.has(t) === !0,
      execute: (e) => {
        let t = rf(e.server) ? void 0 : i.get(e.server);
        ((e.cacheBody = JSON.stringify({
          slug: h,
          server: e.server,
          tool: e.tool,
          input: e.input,
          ...(t !== void 0 && { serverId: t }),
        })),
          fe(
            () => void 0,
            "",
            e.server,
            e.tool,
            e.input,
            { cache: { staleTime: e.staleTimeMs, gcTime: e.gcTimeMs } },
            !1,
            !1,
            0,
            !0,
          ));
      },
      postEv: (e, n) => {
        if (!o()) return;
        t.contentWindow?.postMessage(
          { __frame_mcp_watch: !0, watchId: e, ev: n },
          m,
        );
        let r = n?.error;
        b(r, r?.server);
      },
    };
  (tw(he), (gw = () => e.hostPaneHidden?.() === !0));
  let ge = (e) => {
    rf(e.server) && gw() ? (e.catchUp = !0) : he.execute(e);
  };
  if (c?.viewerNoCode === "not_granted") {
    let e = ae("", !0);
    fw(
      (e) =>
        dw(he, e) &&
        !he.inScope(e.server, e.tool) &&
        c.peek(e.server, e.tool) === "revoked",
      e.code,
      e.message,
    );
  }
  fw(
    (e) => dw(he, e) && !he.inScope(e.server, e.tool),
    "server_not_connected",
    "no longer in the consented scope",
  );
  let L = qk({ h: e, tokenSlot: n, scope: r, owner: he, brokerLive: o });
  ((iw = L.kick), (aw = L.pressNudge), (sw = L.probe));
  for (let e of qC.values())
    e.authzFailed === !0 && dw(he, e) && L.kick(e.server);
  let R;
  S &&
    (R = S.onInventory((e) => {
      if (o())
        for (let t of qC.values())
          t.authzFailed === !0 &&
            rf(t.server) &&
            e.get(t.server)?.has(t.tool) === !0 &&
            dw(he, t) &&
            ge(t);
    }));
  let ve = (t, r, a = "", o = !1, l = !1) => {
      let [u, d, f, p] = r;
      if (typeof u != "string" || typeof d != "string")
        return t({
          error: Z("bad_request", "server and tool must be strings"),
        });
      let m = typeof p == "object" && p ? p : {},
        _ = typeof m.watchId == "string" ? m.watchId : "";
      if (_ === "") return t({ error: Z("bad_request", "missing watch id") });
      let v = GC(h, n.gen, n.account, e.org, _);
      if (qC.has(v) || s.has(KC(v)))
        return t({ error: Z("bad_request", "watch id already in use") });
      if (!g.get(u)?.has(d)) {
        let i = c?.classify(u, d);
        if (!o && i === "ask") {
          if (ag(e.org, n.account, h) === null || !globalThis.crypto?.subtle)
            return t({
              error: Z(
                "bad_request",
                "watching is unavailable in this session",
              ),
            });
          try {
            JSON.stringify(f ?? {});
          } catch {
            return t({
              error: Z("bad_request", "input is not JSON-serializable", u),
            });
          }
          let i = 0;
          for (let e of qC.values()) dw(he, e) && i++;
          return i >= QC
            ? t({
                error: Z(
                  "bad_request",
                  `watch limit (${QC}) reached - unsubscribe unused watches`,
                  u,
                ),
              })
            : oe(u, d, a, KC(v), t, l, (e) => e.watch(t, r, a, !0));
        }
        return (
          i === "revoked" && c?.track("denied"),
          i === "refused"
            ? t({ error: ie(u, d) })
            : i === "org_off"
              ? (o || c?.noteOrgOff(l), t({ error: I(u) }))
              : t({ error: ae(u, i === "revoked") })
        );
      }
      if ((c?.track("granted"), UC.get(u)?.byTool.get(d)?.readOnly === !1))
        return t({
          error: Z("bad_request", "declared-write tools cannot be watched", u),
        });
      let y = ag(e.org, n.account, h);
      if (y === null || !globalThis.crypto?.subtle)
        return t({
          error: Z("bad_request", "watching is unavailable in this session"),
        });
      let b = 0;
      for (let e of qC.values()) dw(he, e) && b++;
      if (b >= QC)
        return t({
          error: Z(
            "bad_request",
            `watch limit (${QC}) reached - unsubscribe unused watches`,
            u,
          ),
        });
      let x;
      try {
        ((x = sg(f ?? {})), JSON.stringify(x));
      } catch {
        return t({
          error: Z("bad_request", "input is not JSON-serializable", u),
        });
      }
      let S = ig({
          cache: typeof m.cache == "object" && m.cache !== null ? m.cache : {},
        }) ?? { staleTimeMs: 0, gcTimeMs: 3e5, refresh: !1 },
        C = rf(u) ? void 0 : i.get(u),
        w = JSON.stringify({
          slug: h,
          server: u,
          tool: d,
          input: x,
          ...(C !== void 0 && { serverId: C }),
        }),
        T =
          typeof m.refetchInterval == "number" &&
          Number.isFinite(m.refetchInterval) &&
          m.refetchInterval > 0
            ? Math.min(m.refetchInterval, 864e5)
            : void 0,
        E = {
          key: v,
          watchId: _,
          gen: n.gen,
          frameUuid: h,
          account: n.account,
          org: e.org,
          server: u,
          tool: d,
          input: x,
          cacheBody: w,
          staleTimeMs: S.staleTimeMs,
          gcTimeMs: S.gcTimeMs,
          refetchIntervalMs: T,
        };
      (qC.set(v, E),
        t({ result: { watchId: _ } }),
        (async () => {
          let e = await cg(w);
          if (e !== null) {
            let t = await Og(y + e).catch(() => null);
            t &&
              qC.get(v) === E &&
              Date.now() - t.createdAt > S.staleTimeMs &&
              he.postEv(_, {
                type: "data",
                server: u,
                result:
                  t.result !== null &&
                  typeof t.result == "object" &&
                  !Array.isArray(t.result)
                    ? {
                        ...t.result,
                        cache: { storedAt: t.createdAt, revalidating: !0 },
                      }
                    : t.result,
              });
          }
          qC.get(v) === E && (ge(E), bw(E));
        })());
    },
    be = (t) => {
      let [r] = t;
      if (typeof r != "string") return;
      let i = GC(h, n.gen, n.account, e.org, r),
        a = qC.get(i);
      if (!a) {
        let e = s.get(KC(i));
        e && ((e.cancelled = !0), e.withdraw?.(), s.delete(KC(i)));
        return;
      }
      (a.pollTimer !== void 0 && clearTimeout(a.pollTimer),
        qC.delete(i),
        a.authzFailed === !0 && iw?.(null),
        window.setTimeout(XC, YC));
    },
    xe = (n) => {
      if (
        !t.isConnected ||
        !o() ||
        n.origin !== m ||
        !t.contentWindow ||
        n.source !== t.contentWindow
      )
        return;
      let r = _e(n.data, "mcp");
      if (r) {
        let i = performance.now();
        r.holds === !0 && (v = !0);
        let c = (n) => {
          o() &&
            (t.contentWindow?.postMessage(ye(r.id, n), m),
            e.noteCapOutcome?.(
              r.cap,
              r.method,
              "error" in n ? n.error.code : null,
              t,
              performance.now() - i,
            ));
        };
        if (r.method === "listTools") return te(c);
        if (r.method === "describeTool") return ue(c, r.args);
        let l = typeof r.args[0] == "string" ? r.args[0] : "";
        if (r.method === "useFailed") {
          u.listedEmpty.has(l) &&
            !u.spent.has(l) &&
            !rf(l) &&
            (u.spent.add(l), a.onAuthLapsedCall(l, "server_not_connected"));
          return;
        }
        let d = rf(l) ? nf : ut,
          f;
        if (r.method === "callTool" || r.method === "watchTool") {
          let e = Zg(r.args[2], d);
          if ("refused" in e) return c({ error: Z("bad_request", e.refused) });
          if (e.file !== null && r.method === "watchTool")
            return c({
              error: Z("bad_request", "a watch cannot carry a file"),
            });
          f = e.file ?? void 0;
        }
        if (
          (r.method === "callTool" ||
            r.method === "invalidate" ||
            r.method === "watchTool") &&
          !ft(r.args[2], d)
        )
          return c({
            error: Z(
              "bad_request",
              "tool input is too large or too deeply nested",
              l === "" ? void 0 : l,
            ),
          });
        if (r.method === "callTool") {
          let [t, i, a, o] = r.args,
            l = (e) => {
              (s.delete(r.id), c(e), b("error" in e ? e.error : void 0, t));
            },
            u = SO(e, n);
          return fe(l, r.id, t, i, a, o, u.attested, u.gesture, 0, !1, f);
        }
        if (r.method === "invalidate") return pe(c, r.args);
        if (r.method === "watchTool")
          return ve(c, r.args, r.id, !1, SO(e, n).gesture);
        if (r.method === "unwatchTool") {
          be(r.args);
          return;
        }
        if (r.method === "cancelCall") {
          let [e] = r.args,
            t = typeof e == "string" ? s.get(e) : void 0;
          if (t && !t.cancelled) {
            ((t.cancelled = !0), t.withdraw?.(), s.delete(e));
            let n = t.flight;
            n
              ? (n.participants--,
                n.pages--,
                n.pages <= 0 && n.pagesGone.abort(),
                n.participants <= 0 &&
                  (t.cacheBody !== void 0 &&
                    F.get(t.cacheBody) === n &&
                    F.delete(t.cacheBody),
                  n.controller?.abort()))
              : t.controller?.abort();
          }
          return;
        }
        return c({ error: Z("bad_request", `unknown method ${r.method}`) });
      }
      at(e, n.data);
    };
  window.addEventListener("message", xe);
  let Se = { call: fe, watch: ve };
  return (
    c && (c.live = Se),
    (p.current = Se),
    (y = !0),
    () => {
      (Ak++,
        (y = !1),
        ew === he && tw(null),
        L.stop(),
        iw === L.kick && (iw = null),
        sw === L.probe && (sw = null),
        aw === L.pressNudge && (aw = null),
        _g(),
        C?.(),
        R?.(),
        c?.live === Se && (c.live = null),
        p.current === Se && (p.current = null),
        window.removeEventListener("message", xe));
    }
  );
}
function MO(e, t) {
  return `frame-mcp-consent:${e.org ?? "-"}:${z(t)}:${e.frameUuid}`;
}
function NO(e) {
  let t;
  try {
    t = localStorage.getItem(e);
  } catch {
    return null;
  }
  if (t === null) return new Map();
  try {
    let e = JSON.parse(t),
      n = new Map();
    for (let t of Array.isArray(e) ? e : []) {
      if (!t || typeof t.server != "string" || !Array.isArray(t.tools))
        continue;
      let e = { tools: new Set(t.tools.filter((e) => typeof e == "string")) };
      if (t.revoked === !0) {
        e.revoked = !0;
        let n = t.revokedTools;
        Array.isArray(n) &&
          (e.revokedTools = new Set(n.filter((e) => typeof e == "string")));
      }
      (typeof t.selectedId == "string" &&
        Se.test(t.selectedId) &&
        (e.selectedId = t.selectedId),
        typeof t.resolvedId == "string" &&
          Se.test(t.resolvedId) &&
          (e.resolvedId = t.resolvedId),
        n.set(t.server, e));
    }
    return n;
  } catch {
    return null;
  }
}
function PO(e, t) {
  for (let n of e) {
    let e = t.get(n.server);
    if (e?.revoked === !0) continue;
    let r = e?.tools;
    for (let e of n.tools) if (!r?.has(e)) return !0;
  }
  return !1;
}
function FO(e, t) {
  let n = [...t].map(([e, t]) => ({
    server: e,
    tools: [...t.tools],
    ...(t.selectedId !== void 0 && { selectedId: t.selectedId }),
    ...(t.resolvedId !== void 0 && { resolvedId: t.resolvedId }),
    ...(t.revoked === !0 && { revoked: !0 }),
    ...(t.revoked === !0 &&
      t.revokedTools !== void 0 && { revokedTools: [...t.revokedTools] }),
  }));
  try {
    localStorage.setItem(e, JSON.stringify(n));
  } catch {}
}
function IO(e, t, n, r) {
  let i = NO(e);
  if (i !== null) {
    for (let e of t) {
      let t = i.get(e.server);
      if (
        (t || ((t = { tools: new Set() }), i.set(e.server, t)),
        t.revoked !== !0)
      )
        for (let n of e.tools) t.tools.add(n);
    }
    if (n)
      for (let [e, t] of n) {
        let n = i.get(e);
        n && (n.selectedId = t);
      }
    if (r)
      for (let [e, t] of r) {
        let n = i.get(e);
        n && (n.resolvedId = t);
      }
    FO(e, i);
  }
}
function LO(e, t, n) {
  let r = NO(e);
  if ((r === null && (r = NO(e)), r === null)) {
    if (!n || PC(t)) return { restored: null, durable: !1 };
    try {
      localStorage.removeItem(e);
    } catch {}
    let r = !1;
    try {
      r = localStorage.getItem(e) === null;
    } catch {
      r = !1;
    }
    return { restored: null, durable: r };
  }
  let i = () => NO(e) ?? NO(e);
  if (n) {
    let n = r.get(t) ?? { tools: new Set() };
    if (
      n.revoked === !0 ||
      ((n.revokedTools = n.tools),
      (n.tools = new Set()),
      (n.revoked = !0),
      r.set(t, n),
      FO(e, r),
      i()?.get(t)?.revoked === !0)
    )
      return { restored: null, durable: !0 };
    if (PC(t)) return { restored: null, durable: !1 };
    if (
      (FO(e, new Map([...r].filter(([, e]) => e.revoked === !0))),
      i()?.get(t)?.revoked === !0)
    )
      return { restored: null, durable: !0 };
    try {
      localStorage.removeItem(e);
    } catch {}
    let a = !1;
    try {
      a = localStorage.getItem(e) === null;
    } catch {
      a = !1;
    }
    return { restored: null, durable: a };
  }
  let a = r.get(t);
  if (a === void 0 || a.revoked !== !0) return { restored: null, durable: !0 };
  let o = [...(a.revokedTools ?? new Set())];
  ((a.tools = new Set(o)),
    delete a.revoked,
    delete a.revokedTools,
    o.length === 0 &&
      a.selectedId === void 0 &&
      a.resolvedId === void 0 &&
      r.delete(t),
    FO(e, r));
  let s = i();
  return { restored: o, durable: s !== null && s.get(t)?.revoked !== !0 };
}
function RO(e, t) {
  let n = NO(e);
  n !== null && (t(n), FO(e, n));
}
function zO(e) {
  return {
    mode: "legacy",
    read: () => NO(e),
    persist: (t, n, r) => IO(e, t, n, r),
    setRevoked: (t, n) => LO(e, t, n),
    decisionSeq: () => 0,
    persistSelf: () => (
      IO(e, [NC()]),
      Promise.resolve(NO(e)?.get(Ru)?.tools.has("publish") === !0)
    ),
    updateIds: (t) => RO(e, t),
    clearSelection: () => void 0,
    refresh: () => void 0,
    flush: () => Promise.resolve(),
  };
}
function BO(e, t) {
  let n = [];
  if ((e.host !== void 0 && n.push(pE(e.host)), e.addedAt !== void 0)) {
    let t = new Date(e.addedAt);
    Number.isNaN(t.getTime()) ||
      n.push(
        `Added ${t.toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" })}`,
      );
  }
  return (
    e.provenance === "managed_auth" && n.push("Managed"),
    n.length > 0 ? n.join(" \u00B7 ") : `Connector ${t}`
  );
}
function VO(e, t, n) {
  if (t.selectedId !== void 0 && n.has(t.selectedId)) return t.selectedId;
  if (t.storeSelectedId !== void 0 && n.has(t.storeSelectedId))
    return t.storeSelectedId;
  if (e.resolvedId !== void 0 && n.has(e.resolvedId)) return e.resolvedId;
  if (t.resolvedId !== void 0 && n.has(t.resolvedId)) return t.resolvedId;
  let r = (e) => +(e.provenance === "managed_auth"),
    i = (e) => (e.addedAt === void 0 ? NaN : new Date(e.addedAt).getTime()),
    a = [...e.candidates].sort((e, t) => {
      let n = r(e) - r(t);
      if (n !== 0) return n;
      let a = i(e),
        o = i(t),
        s = !Number.isNaN(a),
        c = !Number.isNaN(o);
      return s && c && a !== o
        ? a - o
        : s === c
          ? e.id < t.id
            ? -1
            : +(e.id > t.id)
          : s
            ? -1
            : 1;
    })[0];
  return a ? a.id : null;
}
function HO() {
  try {
    aT?.end("interrupted");
  } catch {}
}
function UO(e) {
  let t = mE("loading");
  (t && (t.hidden = !0),
    vO(),
    e.callCloseConsent(),
    document
      .querySelector(e.confirmOpenSelector)
      ?.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: !0 }),
      ),
    e.inertContent());
}
var WO = null,
  GO = null,
  KO = 1500,
  qO = 1200,
  JO = 2e4;
function YO(e, t, n) {
  UO(e);
  let r = { closed: !1 },
    i = null;
  ((WO = r), e.setDecisionSurfaceOpen(!0));
  let a = (t) => {
      r.closed ||
        ((r.closed = !0),
        vO(),
        WO === r && ((WO = null), (GO = null)),
        e.setCloseConsent(null),
        e.setDecisionSurfaceOpen(!1),
        e.restoreContentInteractivity(t) ||
          ((e.slot.tabIndex = -1), e.slot.focus()));
    },
    o = () => {
      (a(!1), i?.close(), n.onExternalClose("closed"));
    };
  (e.setCloseConsent(o), (GO = o), (e.slot.tabIndex = -1), e.slot.focus());
  let s = 0;
  return (
    Promise.race([
      e.chromeReady(),
      new Promise((e) => {
        s = window.setTimeout(() => e(!1), JO);
      }),
    ]).then((o) => {
      (window.clearTimeout(s),
        !r.closed &&
          ((i =
            (o ? e.chrome() : null)?.showAskDialog?.({
              ...t,
              onAllow: () => {
                try {
                  n.onAllowPress?.();
                } finally {
                  a(!0);
                }
                n.onAllow?.();
              },
              onDeny: () => {
                (a(!0), n.onDeny());
              },
              onDismiss: () => {
                (a(!0), n.onDismiss());
              },
            }) ?? null),
          i ||
            (e.report("consent-prompt", "chrome-unavailable"),
            a(!1),
            n.onExternalClose("unavailable"))));
    }),
    () => {
      r.closed || o();
    }
  );
}
function XO(e, t, n, r) {
  let i = mE("loading");
  UO(e);
  let a = { closed: !1 },
    o = Jw,
    s = null,
    c = null;
  ((WO = a), e.setDecisionSurfaceOpen(!0));
  let l = () => {
    i && mE("err")?.hidden !== !1 && (i.hidden = !1);
  };
  (l(), (e.slot.tabIndex = -1), e.slot.focus());
  let u = (t = !1) => {
      ((a.closed = !0),
        vO(),
        WO === a && ((WO = null), (GO = null)),
        c?.stop(),
        e.setCloseConsent(null),
        e.setDecisionSurfaceOpen(!1));
      let n = e.restoreContentInteractivity(t);
      (l(), n || ((e.slot.tabIndex = -1), e.slot.focus()));
    },
    d = () => {
      (u(), s?.close(), r.onExternalClose?.());
    };
  (e.setCloseConsent(d), (GO = d));
  let f = new Map(),
    p = new Set(),
    m = 0,
    h = Promise.race([
      e.chromeReady(),
      new Promise((e) => {
        m = window.setTimeout(() => e(!1), JO);
      }),
    ]),
    g =
      t.some((e) => rf(e.server)) && sf()
        ? (() => {
            let e = kw();
            return (e.rehello(), pf(e));
          })()
        : Promise.resolve(null),
    _ =
      r.readSources !== void 0 && r.manage === !0
        ? Promise.race([
            r.readSources().catch(() => null),
            new Promise((e) => window.setTimeout(() => e(null), KO)),
          ])
        : Promise.resolve(null);
  Promise.all([h, g, _]).then(([l, d, h]) => {
    if ((window.clearTimeout(m), a.closed)) return;
    let g = new Set(
      t
        .filter((e) => r.toggles?.startsOff?.(e.server) === !0)
        .map((e) => e.server),
    );
    if (
      ((s =
        (l ? e.chrome() : null)?.showConsentDialog?.(
          t
            .filter((e) => !PC(e.server))
            .map((e) => ({
              server: e.server,
              host: rf(e.server) || void 0,
              hostConnected:
                d !== null && rf(e.server) ? d.has(e.server) : void 0,
              revoked:
                r.toggles?.isRevoked(e.server) === !0 ||
                g.has(e.server) ||
                void 0,
              pinnedTo: r.repick?.get(e.server),
              undeclared: r.unlisted?.has(e.server) === !0 || void 0,
              tools: e.tools,
            })),
          {
            reshowForSelection: r.reshowForSelection === !0,
            samplesClaude: r.sampleAsk === !0,
            sampleImages: r.sampleAsk === !0 && r.sampleImages === !0,
            sampleRevoked: r.sampleToggle?.isRevoked() === !0,
            filesProject: r.filesAsk,
            filesRevoked: r.filesToggle?.isRevoked() === !0,
            dictationRow: r.dictationToggle !== void 0,
            dictationRevoked: r.dictationToggle?.isRevoked() === !0,
            readaloudRow: r.readaloudToggle !== void 0,
            readaloudRevoked: r.readaloudToggle?.isRevoked() === !0,
            endpointsDeclared: o,
            networkOrigins: r.networkOrigins,
            readSources:
              r.readSources && r.manage === !0 ? (h?.titles ?? []) : void 0,
            readSourcesMore:
              r.readSources && r.manage === !0 ? h?.more !== !1 : void 0,
            manage: r.manage === !0,
            deviceRows: r.deviceToggles?.rows,
            messagesRow: r.messagesToggle?.row,
            statusesPending: n !== null,
          },
          {
            onContinue: (e, t, n) => {
              u(!0);
              let i = new Map();
              for (let [t, n] of e) f.get(t)?.has(n) === !0 && i.set(t, n);
              r.onContinue(i, t, n === !0, p);
            },
            onAction: (e) => {
              (p.add(e), c?.onAction(e));
            },
            onToggle:
              r.toggles === void 0
                ? void 0
                : (e, t) => {
                    r.toggles?.onToggle(e, t) === !0 && s?.markRevoked(e, !t);
                  },
            onSampleToggle:
              r.sampleToggle === void 0
                ? void 0
                : (e) => {
                    r.sampleToggle?.onToggle(e) === !0 &&
                      s?.markSampleRevoked(!e);
                  },
            onFilesToggle:
              r.filesToggle === void 0
                ? void 0
                : (e) => {
                    r.filesToggle?.onToggle(e) === !0 &&
                      s?.markFilesRevoked(!e);
                  },
            onDictationToggle:
              r.dictationToggle === void 0
                ? void 0
                : (e) => {
                    r.dictationToggle?.onToggle(e, (e) =>
                      s?.markDictationRevoked?.(!e),
                    ) === !0 && s?.markDictationRevoked?.(!e);
                  },
            onReadaloudToggle:
              r.readaloudToggle === void 0
                ? void 0
                : (e) => {
                    r.readaloudToggle?.onToggle(e, (e) =>
                      s?.markReadaloudRevoked?.(!e),
                    ) === !0 && s?.markReadaloudRevoked?.(!e);
                  },
            onDeviceToggle:
              r.deviceToggles === void 0
                ? void 0
                : (e, t) => {
                    r.deviceToggles?.onToggle(e, t, (t) =>
                      s?.markDeviceRow(e, t),
                    ) === !0 && s?.markDeviceRow(e, t);
                  },
            onMessagesToggle:
              r.messagesToggle === void 0
                ? void 0
                : (e) => {
                    r.messagesToggle?.onToggle(e, (e) =>
                      s?.markMessagesRow(e),
                    ) === !0 && s?.markMessagesRow(e);
                  },
          },
        ) ?? null),
      !s)
    ) {
      (e.report("consent-prompt", "chrome-unavailable"),
        u(),
        r.onExternalClose ? r.onExternalClose() : r.onNotShown?.());
      return;
    }
    (i && (i.hidden = !0),
      r.shownDetail !== void 0 && e.report("consent-prompt", r.shownDetail),
      r.entries
        .catch(() => null)
        .then((i) => {
          if (
            (s?.settleStatuses(), i === null || a.closed || s?.isOpen() !== !0)
          )
            return;
          let o = i.entries,
            l = i.auth,
            u = Yk(
              t.filter(
                (e) =>
                  r.toggles?.isRevoked(e.server) !== !0 &&
                  !(
                    r.unlisted?.has(e.server) === !0 &&
                    !l.statuses.has(e.server)
                  ),
              ),
              l,
            );
          r.manage !== !0 &&
            n !== null &&
            u.length > 0 &&
            Jk(e) &&
            (c = OA(
              e,
              n,
              t,
              u,
              {
                setBusy: (e, t) => s?.setBusy(e, t),
                markHealed: (e, t) => {
                  if (
                    (mk.delete(e),
                    r.toggles?.startsOff && !r.toggles.isRevoked(e))
                  ) {
                    let t = r.toggles.startsOff(e);
                    (s?.markRevoked(e, t), t ? g.add(e) : g.delete(e));
                  }
                  s?.markHealed(e, bA(t));
                },
                markPresent: (e, t) => s?.markPresent(e, t),
                isOpen: () => s?.isOpen() === !0,
              },
              {
                tel: "consent-prompt",
                keepShellOpen: !0,
                onGone: () => c?.stop(),
                holdPressedRows: !0,
                lookedUp: r.lookedUp,
                onHealth: (e) => {
                  e && c?.stop();
                },
              },
            ));
          let d = [],
            p = new Set(t.map((e) => e.server));
          for (let e of o) {
            if (
              !p.has(e.server) ||
              r.toggles?.isRevoked(e.server) === !0 ||
              e.candidates.length < 2
            )
              continue;
            let t = new Set(e.candidates.map((e) => e.id)),
              n = new Map(),
              i = e.candidates.map((e, t) => {
                let r = BO(e, t + 1),
                  i = (n.get(r) ?? 0) + 1;
                return (
                  n.set(r, i),
                  { id: e.id, label: i > 1 ? `${r} \u00B7 ${i}` : r }
                );
              }),
              a = VO(e, r.pref(e.server), t);
            (d.push({ server: e.server, options: i, defaultId: a }),
              f.set(e.server, t));
          }
          d.length > 0 && s && r.manage !== !0 && s.patchPickers(d);
          let m = new Map((c?.rowSpecs ?? []).map((e) => [e.server, e])),
            h = new Set(
              t
                .filter((e) => r.toggles?.startsOff?.(e.server) === !0)
                .map((e) => e.server),
            );
          for (let { server: e } of t) {
            if (r.toggles?.isRevoked(e) === !0) continue;
            let t = h.has(e) && !m.has(e);
            ((t || g.has(e)) && s.markRevoked(e, t),
              t ? g.add(e) : g.delete(e));
          }
          let _ = t
            .map((e) => {
              let t = l.statuses.get(e.server),
                n = l.directory.get(e.server),
                i = m.get(e.server);
              return {
                server: e.server,
                iconUrl: n?.iconUrl,
                description: i?.description ?? n?.oneLiner,
                action: i?.action,
                inline: i?.inline,
                healed: i === void 0 && QO.has(t?.status ?? "") ? !0 : void 0,
                revoked: r.toggles?.isRevoked(e.server) === !0 || void 0,
                ...bA(t),
              };
            })
            .filter(
              (e) =>
                e.iconUrl !== void 0 ||
                e.description !== void 0 ||
                e.action !== void 0 ||
                e.healed === !0 ||
                e.revoked === !0 ||
                e.toolInfo !== void 0 ||
                e.turnedOff !== void 0,
            );
          (_.length > 0 && s.patchConnections(_), c !== null && c.start());
        }));
  });
}
var ZO = new Set([
    "auth_required",
    "token_invalid",
    "refresh_failed",
    "managed_auth_failed",
  ]),
  QO = new Set(["authenticated", "not_required"]),
  $O = new Set(["needs_reauth", "server_not_connected"]),
  ek = 4,
  tk = 250,
  nk = 1440,
  rk = 5e3,
  ik = 100,
  ak = 1e4,
  ok = 2e4,
  sk = 6e4,
  ck = 3,
  lk = 3e5,
  uk = 3 + Math.ceil(lk / sk) + 1,
  dk = Math.ceil(lk / sk) + 1,
  fk = 2,
  pk = 1e3,
  mk = new Set(),
  hk = new Set(),
  gk = new Map(),
  _k = 6e5,
  vk = ok * 3;
function yk(e) {
  if (gk.size === 0) return e;
  let t = Date.now();
  for (let [n, r] of gk) {
    if (t - r.at >= 6e5 && !mA.has(n)) {
      Tk(n);
      continue;
    }
    let i = e.statuses.get(n);
    if (!(i === void 0 || !QO.has(i.status))) {
      if (
        r.settle === "trust" &&
        r.pressedAt !== void 0 &&
        r.at < r.pressedAt &&
        t - r.pressedAt >= 2e4
      ) {
        e.statuses.set(n, { ...i, trusted: !0 });
        continue;
      }
      e.statuses.set(n, { ...i, status: "token_invalid", callVerdict: !0 });
    }
  }
  return e;
}
var bk = new Map(),
  xk = new Map();
function Sk(e, t) {
  xk.set(e, { at: Date.now(), done: t });
}
function Ck(e) {
  let t = xk.get(e);
  return t !== void 0 && Date.now() - t.at < 3e5;
}
function wk(e, t) {
  let n = xk.get(e);
  n?.done === !0 && n.at <= t && xk.delete(e);
}
function Tk(e) {
  let t = gk.delete(e);
  for (let [t, n] of gA) n === e && gA.delete(t);
  return (gA.size === 0 && yA(), t);
}
function Ek(e) {
  if (Tk(e)) {
    bk.set(e, Date.now());
    for (let e of pA) e();
    ow(e);
  }
}
function Dk(e) {
  (bk.set(e, Date.now()), mk.delete(e), Sk(e, !0), Ek(e));
}
function Ok(e) {
  (mk.delete(e), Sk(e, !0), Ek(e));
}
function kk(e, t) {
  for (let n of e) {
    let e = t.statuses.get(n.server);
    QO.has(e?.status ?? "") && mk.delete(n.server);
  }
}
var Ak = 0,
  jk = "mcp-auth-channel",
  Mk = "mcp-auth-complete",
  Nk = "frame_shell_connector_prompt",
  Pk = /claudenest\//i;
function Fk() {
  return (
    window.parent === window &&
    window.self === window.top &&
    !("embedded" in document.documentElement.dataset)
  );
}
function Ik(e, t) {
  let n = e,
    r = new Set(t.map((e) => e.server)),
    i = new Map(t.map((e) => [e.server, new Set(e.tools)])),
    a = new Map();
  for (let e of n?.servers ?? []) {
    let t = String(e.server ?? "");
    if (!r.has(t)) continue;
    let n = { status: String(e.authStatus ?? "") },
      o = Array.isArray(e.candidates) && e.candidates.length > 1,
      s = o ? void 0 : Hk(e.tools, i.get(t));
    s !== void 0 && (n.tools = s);
    let c = e.userDisabledTools;
    (!o &&
      typeof c == "number" &&
      Number.isInteger(c) &&
      c > 0 &&
      c <= (i.get(t)?.size ?? 0) &&
      (n.turnedOff = c),
      typeof e.resolvedId == "string" &&
        Se.test(e.resolvedId) &&
        (n.id = e.resolvedId));
    let l = Vk(e.iconUrl);
    (l && (n.iconUrl = l),
      e.neverConnected === !0 && (n.neverConnected = !0),
      a.set(t, n));
  }
  let o = new Map();
  for (let e of n?.directory ?? []) {
    let t = String(e.server ?? "");
    if (!r.has(t) || typeof e.id != "string" || !Se.test(e.id)) continue;
    let n = { id: e.id },
      i = Vk(e.iconUrl);
    (i && (n.iconUrl = i),
      typeof e.oneLiner == "string" &&
        e.oneLiner !== "" &&
        (n.oneLiner = pE(e.oneLiner)),
      o.set(t, n));
  }
  return { statuses: a, directory: o };
}
async function Lk(e, t, n) {
  try {
    let r = await nt(e, t, "reauth");
    return r.ok
      ? Ik(await r.json(), n)
      : (e.report("reauth-status-fetch", String(r.status)), null);
  } catch (t) {
    return (e.markHandled(t), e.report("reauth-status-fetch", "error"), null);
  }
}
var Rk = null;
function zk(e, t, n) {
  let r = Lk(e, t, n).then((e) => e && yk(e)),
    i = {
      tokenSlot: t,
      names: new Set(n.map((e) => e.server)),
      inflight: r,
      result: null,
      at: 0,
    };
  return (
    (Rk = i),
    r.then((e) => {
      Rk === i && ((i.inflight = null), (i.result = e), (i.at = Date.now()));
    }),
    r
  );
}
function Bk(e, t, n, r) {
  let i = Rk;
  if (i && i.tokenSlot === t && r.every((e) => i.names.has(e))) {
    if (i.inflight) return i.inflight;
    if (Date.now() - i.at < 5e3) return Promise.resolve(i.result);
  }
  return zk(e, t, n);
}
function Vk(e) {
  if (!(typeof e != "string" || e.length > 2048))
    return /^https?:\/\//i.test(e) ? e : void 0;
}
function Hk(e, t) {
  if (!Array.isArray(e) || t === void 0) return;
  let n = [];
  for (let r of e) {
    if (!r || typeof r.name != "string" || !t.has(r.name)) continue;
    let e = { name: r.name };
    if (typeof r.description == "string") {
      let t = r.description
        .split(/\r?\n[ \t]*\r?\n/u)
        .map((e) => e.replace(/\s+/gu, " ").trim())
        .find((e) => e !== "");
      t !== void 0 && (e.description = Wk(t, Uk));
    }
    let i = r.annotations;
    (i &&
      typeof i == "object" &&
      typeof i.readOnlyHint == "boolean" &&
      (e.readOnly = i.readOnlyHint),
      n.push(e));
  }
  return n;
}
var Uk = 240,
  Wk = (e, t) => {
    let n = [...e];
    return n.length > t ? `${n.slice(0, t - 1).join("")}\u2026` : e;
  },
  Gk = 3e4,
  Kk = 3e5;
function qk(e) {
  let t = !1,
    n,
    r = Gk,
    i = !1,
    a = new Map(),
    o = new Set(),
    s = 0,
    c = () => !t && e.brokerLive() && ew === e.owner,
    l = () => {
      let t = new Set();
      for (let n of qC.values())
        n.authzFailed === !0 &&
          !rf(n.server) &&
          dw(e.owner, n) &&
          t.add(n.server);
      return t;
    },
    u = (e) => {
      for (let t of new Set([...a.keys(), ...o]))
        e.has(t) || (a.delete(t), o.delete(t));
    },
    d = () => {
      (n !== void 0 && (clearTimeout(n), (n = void 0)), (i = !1), (r = Gk));
    },
    f = (e) => {
      (n !== void 0 && clearTimeout(n), (n = setTimeout(p, e)));
    },
    p = () => {
      if (((n = void 0), !c())) return;
      let t = l();
      if ((u(t), t.size === 0)) return d();
      if (typeof document < "u" && document.hidden) {
        i = !0;
        return;
      }
      let p = s;
      Bk(e.h, e.tokenSlot, e.scope, [...t]).then((n) => {
        if (c()) {
          if (n)
            for (let r of t) {
              let t = n.statuses.get(r),
                i =
                  t === void 0
                    ? "unhealthy"
                    : QO.has(t.status)
                      ? "healthy"
                      : ZO.has(t.status)
                        ? "unhealthy"
                        : null;
              if (i === null) continue;
              let s = a.get(r);
              if ((a.set(r, i), i === "unhealthy")) {
                o.delete(r);
                continue;
              }
              if (s === "unhealthy") {
                o.add(r);
                for (let t of qC.values())
                  t.authzFailed === !0 &&
                    t.server === r &&
                    dw(e.owner, t) &&
                    e.owner.execute(t);
              }
            }
          if (l().size === 0) return d();
          p === s && ((r = Math.min(r * 2, Kk)), f(r));
        }
      });
    };
  return {
    kick: (e, t) => {
      if (c() && !(e !== null && rf(e))) {
        if (e !== null) {
          if (t) {
            o.has(e) &&
              (o.delete(e), a.set(e, "unhealthy"), n === void 0 && !i && f(r));
            return;
          }
          if (!o.has(e) && a.get(e) !== "unhealthy") {
            (a.set(e, "unhealthy"), (r = Gk), i || f(r));
            return;
          }
          n === void 0 && !i && f(r);
          return;
        }
        (u(l()),
          i && (typeof document > "u" || !document.hidden) && ((i = !1), f(0)));
      }
    },
    pressNudge: (e) => {
      c() &&
        l().has(e) &&
        (o.delete(e), a.set(e, "unhealthy"), s++, (r = Gk), i || f(r));
    },
    probe: (t) => {
      if (c())
        for (let n of qC.values())
          n.authzFailed === !0 &&
            n.server === t &&
            dw(e.owner, n) &&
            e.owner.execute(n);
    },
    stop: () => {
      ((t = !0), d());
    },
  };
}
function Jk(e) {
  let t = document.cookie.match(/(?:^|;\s*)lastActiveOrg=([^;]*)/)?.[1],
    n =
      t &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(t)
        ? t
        : void 0;
  return e.org === n;
}
function Yk(e, t) {
  let n = [];
  for (let r of e) {
    if (rf(r.server)) continue;
    let e = t.statuses.get(r.server),
      i = t.directory.get(r.server);
    e === void 0
      ? n.push({
          server: r.server,
          connected: !1,
          iconUrl: i?.iconUrl,
          oneLiner: i?.oneLiner,
          directoryId: i?.id,
        })
      : ZO.has(e.status)
        ? n.push({
            server: r.server,
            connected: !0,
            id: e.id,
            iconUrl: e.iconUrl ?? i?.iconUrl,
            oneLiner: i?.oneLiner,
          })
        : e.status === "" &&
          e.id !== void 0 &&
          (e.neverConnected === !0
            ? n.push({
                server: r.server,
                connected: !1,
                id: e.id,
                neverConnected: !0,
                iconUrl: e.iconUrl ?? i?.iconUrl,
                oneLiner: i?.oneLiner,
              })
            : n.push({
                server: r.server,
                connected: !1,
                id: e.id,
                unreachable: !0,
                iconUrl: e.iconUrl ?? i?.iconUrl,
              }));
  }
  return n;
}
function Xk(e) {
  return e.connected
    ? "reconnect"
    : e.neverConnected === !0
      ? "connect"
      : e.unreachable === !0
        ? "retry"
        : e.directoryId === void 0
          ? "custom"
          : "add";
}
function Zk(e) {
  let t = Xk(e);
  return t !== "retry" && t !== "custom";
}
function Qk(e, t, n, r, i, a) {
  if ($k !== null) return;
  oA();
  let o = Ak,
    s = Q,
    c = Fg(),
    l = () => {
      (cA(), i?.());
    },
    u = () => {
      (cA(), a !== void 0 && s === Q && c === Fg() && hk.delete(a));
    };
  zk(e, t, n).then((i) => {
    if ($k !== null) {
      l();
      return;
    }
    if (!i || o !== Ak || c !== Fg()) {
      l();
      return;
    }
    let s = Date.now();
    kk(n, i);
    let d = dA(Yk(n, i));
    if (d.length === 0) {
      l();
      return;
    }
    if (a !== void 0) {
      let t = d.find((e) => e.server === a);
      if (t === void 0) {
        l();
        return;
      }
      if (!Zk(t) || mk.has(a)) {
        (e.report("reauth-prompt", "reauth-skipped"), cA());
        return;
      }
    }
    if (d.every((e) => mk.has(e.server))) {
      (e.report("reauth-prompt", "reauth-skipped"), l());
      return;
    }
    let f = new Set(d.map((e) => e.server)),
      p = n
        .filter((e) => !f.has(e.server))
        .map((e) => {
          let t = i.statuses.get(e.server);
          return {
            server: e.server,
            iconUrl: t?.iconUrl ?? i.directory.get(e.server)?.iconUrl,
            healthy: QO.has(t?.status ?? ""),
          };
        }),
      m = 0,
      h = () => {
        if (o !== Ak || c !== Fg() || $k !== null) {
          u();
          return;
        }
        if (!Jk(e)) {
          (e.report("reauth-prompt", "org-suppressed"), u());
          return;
        }
        if (
          !e.slot.querySelector("iframe.ready") ||
          e.slot.querySelector("iframe:not(.ready)") ||
          !e.chrome() ||
          pO(e)
        ) {
          ++m <= 1440
            ? window.setTimeout(h, 250)
            : (e.report("reauth-prompt", "poll-exhausted"), u());
          return;
        }
        (e.report("reauth-prompt", "shown"),
          d.some((e) => i.statuses.get(e.server)?.callVerdict) &&
            e.report("reauth-prompt", "reauth-call-verdict"),
          kA(e, t, n, d, p, s, r) || u());
      };
    h();
  });
}
var $k = null,
  eA = null,
  tA = new Set(),
  nA = new WeakMap(),
  rA = new Set(),
  iA = 8e3,
  aA;
function oA() {
  (window.clearTimeout(aA), (aA = window.setTimeout(() => sA(), iA)));
}
function sA(e = "no-prompt") {
  (window.clearTimeout(aA), (aA = void 0), uA(() => e));
}
function cA() {
  $k === null && sA();
}
function lA(e) {
  return $k === null ? aA !== void 0 && !mk.has(e) : tA.has(e);
}
function uA(e) {
  for (let t of rA) {
    let n = e(t.item.server);
    n !== null && (rA.delete(t), t.settle(n));
  }
}
function dA(e) {
  let t = new Map([...rA].map((e) => [e.item.server, e.item]));
  return e.map((e) => {
    let n = e.id === void 0 ? t.get(e.server) : void 0;
    return n ? { ...n, iconUrl: n.iconUrl ?? e.iconUrl } : e;
  });
}
function fA(e, t) {
  let n;
  try {
    n = JSON.parse(e)?.error;
  } catch {
    return null;
  }
  let r = n?.repair?.resolvedId;
  if (typeof r != "string" || !Se.test(r)) return null;
  let i = n?.repair?.neverConnected === !0;
  return {
    server: t,
    connected: !i,
    id: r,
    iconUrl: Vk(n?.repair?.iconUrl),
    ...(i && { neverConnected: !0 }),
  };
}
var pA = new Set(),
  mA = new Map(),
  hA = null,
  gA = new Map(),
  _A = null;
function vA(e, t) {
  typeof BroadcastChannel > "u" ||
    (gA.set(e, t),
    !_A &&
      ((_A = new BroadcastChannel(jk)),
      (_A.onmessage = (e) => {
        let t = e.data;
        if (!t || t.type !== Mk || typeof t.serverId != "string") return;
        let n = gA.get(t.serverId);
        n !== void 0 &&
          (t.step === "success" && (gA.delete(t.serverId), Dk(n)),
          gA.size === 0 && (_A?.close(), (_A = null)));
      })));
}
function yA() {
  (gA.clear(), _A?.close(), (_A = null));
}
function bA(e) {
  return {
    toolInfo: e?.tools,
    ...(e?.turnedOff !== void 0 && {
      turnedOff: e.turnedOff,
      settingsHref: xA(e.id),
    }),
  };
}
function xA(e) {
  let t = "/customize/connectors";
  return e === void 0 ? t : `${t}?connector=${encodeURIComponent(e)}`;
}
var SA = new Set(),
  CA = new Map(),
  wA = 6,
  TA = (e) =>
    document.visibilityState === "visible" &&
    e.hostPaneHidden?.() !== !0 &&
    !("headerHidden" in document.documentElement.dataset);
function EA(e, t) {
  if (SA.has(e.frameUuid) || !TA(e)) return;
  let n = t !== void 0 && Se.test(t) ? t : void 0;
  e.chrome()?.showConnectorsOffNotice?.(xA(n)) === !0 && SA.add(e.frameUuid);
}
function DA(e, t) {
  let n = CA.get(e.frameUuid) ?? 0;
  n >= (t ? wA : 1) ||
    !TA(e) ||
    (e.chrome()?.showOrgConnectorsOffNotice?.() === !0 &&
      CA.set(e.frameUuid, n + 1));
}
function OA(e, t, n, r, i, a) {
  let o = new Map(r.map((e) => [e.server, e])),
    s = navigator.userAgent.includes(" Electron/"),
    c = (t) => t.id !== void 0 && !!e.org,
    l = new Set();
  for (let e of r) c(e) && l.add(e.id);
  let u = new Set(),
    d = new Set(),
    f = 0,
    p = !1,
    m = () => {
      (window.clearTimeout(f), (f = 0));
      for (let e of d) i.setBusy(e, !1);
      d.clear();
    },
    h = () => {
      if (!(a.holdPressedRows !== !0 || p)) {
        for (let e of u) d.has(e) || (d.add(e), i.setBusy(e, !0));
        d.size > 0 &&
          !f &&
          (f = window.setTimeout(() => {
            ((p = !0), m());
          }, ak));
      }
    },
    g = (e, t) => {
      (u.delete(e),
        d.delete(e),
        d.size === 0 && (window.clearTimeout(f), (f = 0)),
        i.markHealed(e, t));
    },
    _ = new AbortController(),
    v = 0,
    y = 0,
    b = 0,
    x = 0,
    S = !1,
    C = !1,
    w = null,
    T = !1,
    E = 0,
    D = !1,
    O = () => {
      if (!T) {
        if (((T = !0), m(), D)) {
          pA.delete(ae);
          for (let e of r) {
            let t = (mA.get(e.server) ?? 1) - 1;
            t > 0 ? mA.set(e.server, t) : mA.delete(e.server);
          }
        }
        for (let e of P) {
          let t = gk.get(e);
          t?.settle === "probe" &&
            ((t.settle = "trust"),
            (t.pressedAt = Date.now()),
            delete t.graceArmed);
        }
        if (
          (P.clear(),
          _.abort(),
          window.clearTimeout(v),
          window.clearTimeout(y),
          window.clearTimeout(E),
          w && !w.closed)
        )
          try {
            (w.location.href, w.close());
          } catch {}
      }
    },
    k = (t) => {
      let n = s
        ? `${location.origin}/desktop/connected/mcp-auth-callback/${encodeURIComponent(t)}?_=1${Pk.test(navigator.userAgent) ? "&nest=1" : ""}`
        : `${location.origin}/connector/${encodeURIComponent(t)}/auth_done?_=1&mcp_auth_source=${Nk}`;
      return `${location.origin}/api/organizations/${encodeURIComponent(e.org)}/mcp/start-auth/${encodeURIComponent(t)}?redirect_url=${encodeURIComponent(n)}&open_in_browser=1&product_surface=claude-web&popup=1&mcp_auth_source=${Nk}`;
    },
    A = () =>
      `width=600,height=700,left=${window.screenX + (window.outerWidth - 600) / 2},top=${window.screenY + (window.outerHeight - 700) / 2},popup=1`,
    j = (e) => {
      (window.clearTimeout(E), (w = e), w && (w.opener = null));
    },
    M = (t) => (
      j(window.open(k(t), "mcp-auth", A())),
      w
        ? (e.report(a.tel, "popup-opened"), w.focus(), !0)
        : s
          ? (e.report(a.tel, "desktop-external"), !0)
          : (e.report(a.tel, "popup-blocked"), !1)
    ),
    ee = (e) => {
      let t = "/customize/connectors";
      return e.directoryId === void 0
        ? e.neverConnected === !0 && e.id !== void 0
          ? xA(e.id)
          : e.connected
            ? e.id === void 0
              ? [...e.server].length <= 128
                ? `${t}?connector=${encodeURIComponent(e.server)}`
                : t
              : xA(e.id)
            : `${t}?modal=add-custom-connector${[...e.server].length <= 128 ? `&connectorName=${encodeURIComponent(e.server)}` : ""}`
        : `${t}?directory-open=true&directory-uuid=${encodeURIComponent(e.directoryId)}`;
    },
    te = (e) => {
      let t = document.createElement("a");
      ((t.href = ee(e)),
        (t.rel = "noopener noreferrer"),
        (t.referrerPolicy = "no-referrer"),
        (a.keepShellOpen || !Fk()) && (t.target = "_blank"),
        t.click());
    },
    N = (e) => {
      let t = o.get(e);
      if (!t) return;
      if ((u.add(e), t.unreachable === !0)) {
        (ae(), s && ce());
        return;
      }
      let n = !1;
      (c(t) ? ((n = M(t.id)), n || te(t)) : te(t), Sk(e, !1));
      let r = gk.get(e);
      if (r) {
        let i = r.pressedAt !== void 0;
        ((r.pressedAt = Date.now()),
          delete r.graceArmed,
          (r.settle =
            n && !s && typeof BroadcastChannel < "u"
              ? "signal"
              : lw(e)
                ? "probe"
                : "trust"),
          r.settle === "signal" && vA(t.id, e),
          r.settle === "probe" && (P.add(e), i && ((F = 0), ne())));
      }
      s && (ae(), ce(), ow(e));
    },
    P = new Set(),
    F = 0,
    ne = () => {
      if (!(T || P.size === 0 || document.hidden) && !(Date.now() - F < 5e3)) {
        F = Date.now();
        for (let e of P) {
          let t = gk.get(e);
          if (t?.settle === "probe" && lw(e)) {
            cw(e);
            continue;
          }
          (t?.settle === "probe" &&
            ((t.settle = "trust"),
            (t.pressedAt = Date.now()),
            delete t.graceArmed),
            P.delete(e));
        }
      }
    },
    re = !1,
    ie = 0,
    I = !1,
    ae = () => {
      if (T) return;
      if (!i.isOpen()) {
        a.onGone();
        return;
      }
      if (document.hidden) {
        !re && !v && m();
        return;
      }
      let s = Date.now() - ie;
      if (re || s < 5e3) {
        if (re && s < 100) return;
        ((v ||= window.setTimeout(
          () => {
            ((v = 0), ae());
          },
          Math.max(rk - s, 250),
        )),
          h());
        return;
      }
      ((ie = Date.now()), (re = !0), (p = !1), h());
      let c = S,
        d = x,
        f = (e) => {
          if (((re = !1), (p = !1), T)) return;
          if (!i.isOpen()) {
            a.onGone();
            return;
          }
          let t = c && d === x;
          if (!e) {
            ((I = !1), m(), oe(!1, t));
            return;
          }
          let s = (t) => QO.has(e.statuses.get(t.server)?.status ?? "");
          for (let t of r) {
            if (s(t)) {
              g(t.server, e.statuses.get(t.server));
              continue;
            }
            let n = e.statuses.get(t.server);
            if (
              !t.connected &&
              t.unreachable !== !0 &&
              t.neverConnected !== !0 &&
              t.id === void 0 &&
              n?.status === "" &&
              n.id !== void 0 &&
              n.neverConnected === !0
            ) {
              ((t.id = n.id),
                (t.neverConnected = !0),
                delete t.directoryId,
                l.add(n.id),
                i.markPresent(t.server, { inline: !0 }));
              continue;
            }
            ZO.has(n?.status ?? "") &&
              (t.unreachable === !0
                ? ((t.unreachable = !1),
                  (t.connected = !0),
                  i.markPresent(t.server, { inline: !0 }))
                : !t.connected &&
                  t.neverConnected !== !0 &&
                  t.id === void 0 &&
                  ((t.connected = !0),
                  delete t.directoryId,
                  i.markPresent(t.server)));
          }
          (v || m(),
            a.holdPressedRows === !0 &&
              I &&
              !v &&
              r.some((e) => u.has(e.server)) &&
              (v = window.setTimeout(() => {
                ((v = 0), ae());
              }, rk)),
            (I = !1));
          let f = r.every(s);
          oe(f, t);
          let h = Yk(n, e).filter(
            (e) => e.unreachable !== !0 && e.neverConnected !== !0,
          );
          a.onHealth?.(f, f && h.length === 0, {
            trusted: r.some((t) => e.statuses.get(t.server)?.trusted),
            verdictElsewhere:
              h.length > 0 &&
              h.every(
                (t) =>
                  !o.has(t.server) &&
                  e.statuses.get(t.server)?.callVerdict === !0,
              ),
          });
        };
      Promise.all([zk(e, t, n), a.lookedUp?.() ?? null]).then(
        ([e, t]) =>
          f(
            e !== null && t !== null
              ? yk({ ...e, statuses: new Map([...t, ...e.statuses]) })
              : e,
          ),
        (t) => {
          (e.markHandled(t), f(null));
        },
      );
    },
    oe = (t, n) => {
      !n ||
        !S ||
        ((S = !1),
        !(t || C) && ((C = !0), e.report(a.tel, "heal-poll-exhausted")));
    },
    se = () => {
      if (((y = 0), !T)) {
        if ((b++, b >= uk)) {
          ((S = !0), ne(), ae());
          return;
        }
        (ne(), ae(), !T && (y = window.setTimeout(se, b < 3 ? ok : sk)));
      }
    },
    ce = () => {
      T ||
        (window.clearTimeout(y),
        (b = 0),
        x++,
        (S = !1),
        (y = window.setTimeout(se, ok)));
    };
  return {
    rowSpecs: r.map((e) => {
      let t = Xk(e);
      return {
        server: e.server,
        action: t,
        inline: t !== "retry" && c(e),
        iconUrl: e.iconUrl,
        description: e.oneLiner,
      };
    }),
    onAction: N,
    start: () => {
      if (T) return;
      ((D = !0), pA.add(ae));
      for (let e of r) mA.set(e.server, (mA.get(e.server) ?? 0) + 1);
      let t = () => {
        (document.hidden || ne(), (I = !0), ae());
      };
      if (
        (document.addEventListener("visibilitychange", t, { signal: _.signal }),
        window.addEventListener("focus", t, { signal: _.signal }),
        s && ce(),
        r.some(c) && typeof BroadcastChannel < "u")
      ) {
        let t = new BroadcastChannel(jk);
        (_.signal.addEventListener("abort", () => t.close()),
          (t.onmessage = (t) => {
            let n = t.data;
            if (!(
              !n ||
              n.type !== Mk ||
              typeof n.serverId != "string" ||
              !l.has(n.serverId)
            )) {
              if (!i.isOpen()) {
                a.onGone();
                return;
              }
              if (
                (e.report(
                  a.tel,
                  n.step === "success" ? "popup-success" : "popup-error",
                ),
                n.step === "success")
              )
                for (let e of r) e.id === n.serverId && Dk(e.server);
              (n.step === "success" &&
                w &&
                !w.closed &&
                (window.clearTimeout(E),
                (E = window.setTimeout(() => w?.close(), 2e3))),
                (ie = 0),
                n.step === "success" && (I = !0),
                ae(),
                n.step === "success" && ce());
            }
          }));
      }
    },
    stop: O,
    recheck: ae,
  };
}
function kA(e, t, n, r, i, a, o) {
  let s = null,
    c = !1,
    l = new Set(),
    u = (t) => {
      c ||
        ((c = !0),
        d.stop(),
        e.setCloseConsent(null),
        t && s?.close(),
        $k === s &&
          (($k = null),
          (eA = null),
          uA((e) => (l.has(e) ? "healed" : "closed"))),
        e.setDecisionSurfaceOpen(!1),
        e.restoreContentInteractivity(!t) ||
          ((e.slot.tabIndex = -1), e.slot.focus()));
    },
    d = OA(
      e,
      t,
      n,
      r,
      {
        setBusy: (e, t) => s?.setBusy(e, t),
        markHealed: (e) => {
          (mk.delete(e),
            l.add(e),
            h.delete(e),
            s?.markHealed(e),
            uA((t) => (t === e ? "healed" : null)));
        },
        markPresent: (e, t) => s?.markPresent(e, t),
        isOpen: () => s?.isOpen() === !0,
      },
      {
        tel: "reauth-prompt",
        keepShellOpen: !1,
        onGone: () => u(!1),
        onHealth: (t, n, r) => {
          (!n && !(t && r.verdictElsewhere)) ||
            (e.report(
              "reauth-prompt",
              r.trusted ? "trust-clear" : "auto-clear",
            ),
            u(!0),
            n || hA?.());
        },
      },
    ),
    f = new Map(d.rowSpecs.map((e) => [e.server, e])),
    p = new Map(i.map((e) => [e.server, e])),
    m = n.flatMap((e) => {
      let t = f.get(e.server);
      if (t) return [t];
      let n = p.get(e.server);
      return n ? [{ server: n.server, iconUrl: n.iconUrl, inline: !1 }] : [];
    });
  if (
    ((s =
      e.chrome()?.showReauthDialog?.(
        m.map((e) => ({
          ...e,
          revoked: o?.isRevoked(e.server) === !0 || void 0,
        })),
        {
          onAction: d.onAction,
          onToggle:
            o === null
              ? void 0
              : (e, t) => {
                  o.onToggle(e, t) === !0 && s?.markRevoked(e, !t);
                },
          onDismiss: () => {
            for (let e of r) l.has(e.server) || mk.add(e.server);
            (e.report("reauth-prompt", "dismissed"), u(!1));
          },
        },
      ) ?? null),
    !s)
  )
    return (e.report("reauth-prompt", "chrome-unavailable"), d.stop(), !1);
  (($k = s), (eA = () => u(!0)));
  let h = new Set(r.filter(Zk).map((e) => e.server));
  ((tA = h),
    window.clearTimeout(aA),
    (aA = void 0),
    uA((e) => (h.has(e) ? null : "no-prompt")));
  for (let e of rA) e.ack();
  for (let e of i) e.healthy && s.markHealed(e.server);
  return (
    e.setDecisionSurfaceOpen(!0),
    e.inertContent(),
    e.setCloseConsent(() => u(!0)),
    d.start(),
    Date.now() - a >= 5e3 && d.recheck(),
    !0
  );
}
function AA() {
  let e = cT;
  return !e || !Ld(e.h, e.ctl.viewer)
    ? Promise.resolve(!1)
    : Wd(
        e.h,
        e.ctl,
        e.consentSlot.value,
        !1,
        !1,
        () => cT === e,
        void 0,
        "explicit",
      );
}
function jA(e) {
  let t = cT;
  return !t || !t.ctl.disclose || !Ld(t.h, t.ctl.viewer)
    ? Promise.resolve(!1)
    : Wd(
        t.h,
        t.ctl,
        t.consentSlot.value,
        !0,
        !1,
        () => cT === t,
        e,
        "explicit",
        e < 3,
      );
}
async function MA() {
  let e = cT;
  return !e || !Ld(e.h, e.ctl.viewer)
    ? !1
    : (await Gd(
        e.h,
        e.ctl,
        () => e.consentSlot.value,
        () => cT === e,
        () => pO(e.h),
      )) === "granted";
}
function NA() {
  let e = kC()?.presence ?? null;
  return e !== null &&
    new TextEncoder().encode(JSON.stringify(e)).length <= 4096
    ? e
    : null;
}
function PA(e) {
  let t = e.consent;
  if (!t || typeof t != "object") return null;
  let n = t.comments;
  if (!n || typeof n != "object") return null;
  let r = n;
  if (typeof r.granted != "boolean" || typeof r.revoked != "boolean")
    return null;
  let i = Id(r.disclosure);
  return {
    granted: r.granted,
    revoked: r.revoked,
    decisionSeq: typeof r.decisionSeq == "number" ? r.decisionSeq : 0,
    ...(i === void 0 ? {} : { disclosure: i }),
    ...(r.firstPartyInstance === !0 ? { firstPartyInstance: !0 } : {}),
  };
}
function FA(e) {
  let t = e.capabilities?.mcp,
    n = t?.token,
    r = t?.config?.servers;
  if (typeof n != "string" || n === "") return null;
  let i = t?.config,
    a =
      typeof i == "object" &&
      !!i &&
      i.dynamic === !0 &&
      t?.policy === "prompt-at-first-use" &&
      typeof e.consentToken == "string" &&
      e.consentToken !== "",
    o = Array.isArray(r) ? r : [],
    s = o.filter(
      (e) =>
        !!e &&
        typeof e == "object" &&
        typeof e.server == "string" &&
        e.server !== "" &&
        !PC(e.server) &&
        Array.isArray(e.tools) &&
        e.tools.length > 0 &&
        e.tools.every((e) => typeof e == "string" && IA.test(e)),
    ),
    c = o.flatMap((e) => {
      let t = e?.server;
      return typeof t == "string" && t !== "" ? [t] : [];
    });
  return s.length > 0 || a
    ? { token: n, servers: s, dynamic: a, listed: c }
    : null;
}
var IA = /^[A-Za-z0-9_.-]{1,128}$/u,
  LA = 8,
  RA = 16,
  zA = "mcpx:";
function BA(e, t) {
  return e.length < 1 || e.length > 64 || e.startsWith("host:") || PC(e)
    ? !1
    : !t.includes(e);
}
var VA = new Set(["connected", "needs_auth", "selection_required"]);
function HA(e, t) {
  let n = new Map();
  if (!Array.isArray(e)) return n;
  for (let r of e)
    !r ||
      typeof r.name != "string" ||
      !t.includes(r.name) ||
      (IA.test(r.name) &&
        n.set(r.name, {
          name: r.name,
          ...(typeof r.description == "string" && {
            description: r.description,
          }),
        }));
  return n;
}
function UA(e, t, n) {
  let r = new Map(),
    i = e?.servers;
  if (!Array.isArray(i)) return r;
  for (let e of i) {
    if (!e || typeof e != "object") continue;
    let i = e,
      a = i.server;
    if (i.asked !== !0 || typeof a != "string") continue;
    let o = t[a];
    if (o === void 0 || r.has(a) || a.startsWith("host:")) continue;
    if (n(a)) {
      r.set(a, {
        status: "connected",
        tools: new Map(),
        extra: HA(i.extra, o),
        askedTools: new Set(o),
        raw: i,
      });
      continue;
    }
    let s = i.status;
    if (typeof s != "string" || !VA.has(s)) {
      r.set(a, null);
      continue;
    }
    r.set(a, {
      status: s,
      tools:
        s === "connected"
          ? HA(i.tools, o)
          : new Map(o.filter((e) => IA.test(e)).map((e) => [e, { name: e }])),
      extra: new Map(),
      askedTools: new Set(o),
      raw: i,
    });
  }
  return r;
}
function WA(e) {
  return (t) => {
    if (!e.live()) {
      e.detach();
      return;
    }
    let n = e.frame();
    if (
      !n?.isConnected ||
      !n.contentWindow ||
      t.origin !== e.frameOrigin ||
      t.source !== n.contentWindow
    )
      return;
    let r = _e(t.data, "mcp");
    r &&
      (e.gen === void 0 || r.brokerGen === void 0 || r.brokerGen === e.gen) &&
      (n.contentWindow.postMessage(
        ye(r.id, {
          error: Z(
            "capability_disabled",
            "no active connector bridge for this view",
          ),
        }),
        e.frameOrigin,
      ),
      e.note?.(r.cap, r.method, "capability_disabled", n, 0));
  };
}
var GA = new WeakMap(),
  KA = (e) => (e.capabilities?.artifact === void 0 ? "self" : "artifact"),
  qA = new WeakMap();
function JA() {
  return Q;
}
function YA(e) {
  return qA.get(e);
}
var XA = Sp({
    head: { id: "k5keLqxEul", defaultMessage: "Artifact stopped" },
    sub: {
      id: "eZRuSIBrDO",
      defaultMessage:
        "Turning off that permission didn\u2019t take effect. Reload the page to continue without it.",
    },
  }),
  ZA = 25e3,
  QA = 2e3,
  $A = Sp({
    head: { id: "L2jt9sAApD", defaultMessage: "Connector access declined" },
    sub: {
      id: "XzHxMiX3Gq",
      defaultMessage: "Reload to review the request again.",
    },
  });
function ej(e, n, r, i) {
  let a = ww();
  (tw(null), fw((e) => e.gen !== a, "capability_disabled", "unposted"));
  let o = () => a === Q;
  (yC() ? AC(e.frameUuid) : null)?.setForwarding(n.presenceViewEnabled === !0);
  let s = n.callVerdictReauth === !0,
    c = n.permissionsConnectorAsk === !0,
    l = { value: n.mcpOrgSettingOff === !0 };
  Ak++;
  let u = FA(n),
    d = u !== null && n.capabilities?.mcp?.policy === "prompt-at-first-use",
    f = ge(n),
    p = !!(n.capabilities?.artifact ?? n.capabilities?.self),
    _ = h(n),
    v = {
      value: C(n)?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  eT = p && _ ? v : null;
  let y = wl(),
    b = A(n),
    x = ne(n),
    S = {
      value: b?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  Qw = b ? S : null;
  let T = Si(S.org, S.account);
  T !== null && ca(T, Date.now());
  let j = og(S.org, S.account);
  j !== null && Vg(j, Date.now());
  let te = { org: S.org, account: S.account },
    N = PA(n);
  N && e.setCommentsConsent?.(N, te);
  let ie = Rd(
      N?.decisionSeq ?? 0,
      n.commentsPageSummon === !0,
      N?.firstPartyInstance === !0,
      M(n) ? "not_granted" : "forbidden",
      te,
    ),
    I = be(n),
    pe = {
      value: I?.token ?? "",
      org: e.org,
      account: z(n.assetToken),
      gen: a,
    };
  ((Bw = I ? pe : null), (Vw = I?.viewer ?? null));
  let me = el(),
    he = Ve(n),
    L = he ? null : g(n),
    R = {
      value: he?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  zw = he ? R : null;
  let ve = new St(),
    xe = F(n),
    Ce = {
      value: typeof xe?.grant == "string" ? xe.grant : "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  Hw = xe ? Ce : null;
  let De = { value: xe !== null && Te(n, xe) };
  Uw = xe ? De : null;
  let ke =
      xe === null
        ? null
        : fe(xe, typeof n.syncToken == "string" && n.syncToken !== ""),
    Ne = ke === "live" ? (e.sync ?? null) : null,
    Fe = ke === "local",
    Ie = Pe(de),
    Le = Pe(Ee),
    Re = Ae(n),
    ze = {
      value: Re?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  Gw = Re ? ze : null;
  let He = E(n),
    Ue = {
      value: He?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  Kw = He ? Ue : null;
  let We = w(n),
    Ge = {
      value: ae(n)?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  ((qw = We ? Ge : null), (Jw = se(n)));
  let Ke = m(n),
    B = O(n),
    Ye = {
      value: Ke?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  Zw = Ke ? Ye : null;
  let Xe = k(n),
    Ze = Oe(n),
    Qe = oe(n),
    $e = le(n),
    rt = !1,
    it = e.readaloudVoice ?? "",
    ot = we(n);
  ot && it === "" && e.report("readaloud", "voice-unset");
  let st = ot && it !== "" && n.mode !== "external",
    ct = {
      value: Xe?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  ((tT = Ze ? ct : null), (nT = Xe?.project ?? null));
  let lt = ue(n),
    ut = {
      value: ce(n)?.token ?? "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    };
  $w = lt ? ut : null;
  let dt = lt ? P(n.capabilities?.reads?.config) : [],
    ft = () => ut.value !== "" && dt.length > 0,
    pt = async () => {
      let t = ut.value,
        r = Yr?.dataset.ver ?? (e.rebuild === !0 ? void 0 : n.ver),
        i = (
          await Promise.allSettled(
            dt.map((n) =>
              Promise.race([
                new xo({
                  slug: e.frameUuid,
                  source: n,
                  ...(r === void 0 ? {} : { ver: r }),
                  query: tt(e),
                  cpHeaders: e.cpHeaders,
                  signalFor: (e) => et(e),
                  markHandled: e.markHandled,
                }).title(t, qO),
                new Promise((e) => window.setTimeout(() => e(null), qO)),
              ]),
            ),
          )
        ).flatMap((e) =>
          e.status === "fulfilled" && e.value !== null && e.value !== ""
            ? [e.value]
            : [],
        );
      return { titles: i, more: i.length < dt.length };
    },
    V = u?.servers ?? [],
    mt = u?.dynamic === !0,
    ht = (e) => V.some((t) => t.server === e),
    gt = u?.listed ?? V.map((e) => e.server),
    _t = (e) => gt.includes(e),
    vt = (e) => mt && !_t(e) && BA(e, gt),
    yt = (e, t) =>
      mt &&
      !e.startsWith("host:") &&
      IA.test(t) &&
      V.some((n) => n.server === e && !n.tools.includes(t)),
    bt = `${e.frameUuid}|${z(typeof n.assetToken == "string" ? n.assetToken : "")}`,
    xt = (e.dynamicConnectors ??= new Map()),
    H = xt.get(bt) ?? {
      raised: new Set(),
      refused: new Set(),
      rows: new Map(),
      lookedUp: new Map(),
      startsOff: new Set(),
      capNoted: !1,
      toolCapNoted: !1,
    };
  xt.set(bt, H);
  let Ct = new Map(),
    wt = new Map(),
    Tt = new Map(),
    Et = (e, t) => {
      let n = t?.get(e);
      return n !== void 0 && (n.revoked === !0 || n.tools.size > 0);
    },
    Dt = (e) => H.raised.has(e) || H.raised.size < LA,
    Ot = (t) =>
      H.raised.has(t)
        ? !0
        : H.raised.size >= LA
          ? (H.capNoted ||
              ((H.capNoted = !0),
              e.report("consent-prompt", "dynamic-name-cap")),
            !1)
          : (H.raised.add(t), !0),
    kt = (t, n) => {
      let r = H.lookedUp.get(t) ?? new Set();
      return r.has(n)
        ? !0
        : r.size >= RA
          ? (H.toolCapNoted ||
              ((H.toolCapNoted = !0),
              e.report("consent-prompt", "dynamic-tool-cap")),
            !1)
          : (H.lookedUp.set(t, r.add(n)), !0);
    },
    At = (e, t = Ot) => vt(e) && (Et(e, G.read()) || t(e)),
    jt = (e, t) => {
      let n = mt && !e.server.startsWith("host:") ? t?.get(e.server) : void 0,
        r = n?.revoked === !0 ? n.revokedExtra : n?.extra;
      return r !== void 0 && r.size > 0
        ? { ...e, tools: [...e.tools, ...r] }
        : e;
    },
    Mt = (e) =>
      mt
        ? [...(e ?? [])].flatMap(([t, n]) =>
            vt(t) && Et(t, e)
              ? [
                  {
                    server: t,
                    tools: [
                      ...(n.revoked === !0 ? (n.revokedTools ?? []) : n.tools),
                    ],
                  },
                ]
              : [],
          )
        : [],
    Nt = () =>
      mt
        ? [
            ...new Set([
              ...[...H.raised].filter((e) => vt(e) && !H.refused.has(e)),
              ...Mt(G.read()).map((e) => e.server),
            ]),
          ]
        : [],
    Pt = (e) => Mt(e).filter((t) => !q(t.server, e) && t.tools.length > 0),
    Ft = (e) => {
      let t = Ct.get(e),
        n = H.rows.get(e);
      if (t === void 0 || n === void 0) return [];
      let r = G.read()?.get(e),
        i = r !== void 0 && r.revoked !== !0 ? r.tools : null;
      return [...t.keys()].filter((e) => n.tools.has(e) && i?.has(e) !== !0);
    },
    It = (e) => {
      let t = Ct.get(e),
        n = H.rows.get(e);
      if (t === void 0 || n === void 0) return [];
      let r = G.read()?.get(e),
        i = r !== void 0 && r.revoked !== !0 ? r.extra : void 0;
      return [...t.keys()].filter((e) => n.extra.has(e) && i?.has(e) !== !0);
    },
    Lt = MO(e, typeof n.assetToken == "string" ? n.assetToken : ""),
    U = {
      value: typeof n.consentToken == "string" ? n.consentToken : "",
      org: e.org,
      account: z(typeof n.assetToken == "string" ? n.assetToken : ""),
      gen: a,
    },
    Rt = U.value !== "";
  Iw = Rt ? U : null;
  let zt = () => e.chromeViewer === void 0 || PT(U, e.chromeViewer()),
    Bt = () => (zt() ? e.chrome() : null),
    Vt = {
      value:
        n.mcpFileArgs === !0 && typeof n.handoffToken == "string"
          ? n.handoffToken
          : "",
      org: e.org,
      account: U.account,
      gen: a,
    };
  ((Lw = Vt), (cT = b ? { h: e, ctl: ie, consentSlot: U } : null));
  let Ht = (t) => {
      let n = et(3e4),
        r = (r) =>
          fetch(
            `/api/frame/consent/${encodeURIComponent(e.frameUuid)}${e.org ? `?org=${encodeURIComponent(e.org)}` : ""}`,
            {
              method: "POST",
              keepalive: r,
              credentials: "same-origin",
              headers: { "Content-Type": "application/json", ...e.cpHeaders },
              body: JSON.stringify({ consentToken: U.value, ops: t.ops }),
              signal: n,
            },
          );
      return (
        t.ops.some((e) => e.revoke === !0) ? r(!0).catch(() => r(!1)) : r(!1)
      ).catch((t) => (e.markHandled(t), null));
    },
    Ut = Pu.filter((e) => {
      let t = n.capabilities?.[e];
      return !!t && typeof t == "object" && t.optional !== !0;
    }),
    Wt = Nu.filter((e) => Ut.some((t) => Iu(t) === e)),
    Gt = Rt && Wt.length > 0,
    Kt = Rt ? Ku(n.consent) : null;
  Rt &&
    Kt === null &&
    (V.length > 0 ||
      mt ||
      Ke !== null ||
      Wt.length > 0 ||
      Qe ||
      st ||
      (xe !== null && !Fe)) &&
    e.report("broker-consent-error");
  let W = { seq: Kt?.sample?.decisionSeq ?? 0, sample: Kt?.sample ?? null };
  lT = Ke && Rt ? { ctl: W, consentSlot: U } : null;
  let qt = { state: Kt?.dictation ?? null },
    Jt = KT(
      e.frameUuid,
      e.org,
      z(typeof n.assetToken == "string" ? n.assetToken : ""),
    );
  {
    let e = IT.get(Jt),
      t = qt.state;
    e !== void 0 &&
      (t?.decisionSeq ?? 0) <= e &&
      t?.revoked !== !0 &&
      (qt.state = {
        decisionSeq: t?.decisionSeq ?? 0,
        granted: !1,
        revoked: !0,
      });
  }
  let Yt = z(typeof n.assetToken == "string" ? n.assetToken : ""),
    Xt = Yt !== "" && Yt !== "-",
    Zt = Qe && Rt && Xt ? HT(Jt) : null,
    Qt = !1;
  Zt !== null &&
    ((qt.state = {
      decisionSeq: qt.state?.decisionSeq ?? 0,
      granted: !1,
      revoked: !0,
    }),
    (Qt = !0));
  let $t = ix({
      kind: "readaloud",
      ledger: sT,
      frameUuid: e.frameUuid,
      viewer: Jt,
      keepsRefusals: Xt,
      live: st && Rt,
      initial: Kt?.readaloud ?? null,
      brokerLive: o,
      transport: Ht,
      refreshToken: () => Pn.refreshToken(),
      aborted: () => a !== Q,
      reread: async () => {
        if (!e.requestConsentReboot) return null;
        let t = await Promise.race([
          e.requestConsentReboot().catch(() => null),
          new Promise((e) => window.setTimeout(() => e(null), ZA)),
        ]);
        return t === null ||
          !o() ||
          t.org !== U.org ||
          z(t.assetToken) !== U.account
          ? null
          : (typeof t.consentToken == "string" &&
              t.consentToken !== "" &&
              (U.value = t.consentToken),
            Ku(t.consent)?.readaloud ?? null);
      },
      report: (t) => e.report("readaloud-consent-write", t),
      endHere: () => Ji?.end("not_granted"),
      note: () => void 0,
    }),
    en = Oh(Kt?.files ?? null),
    tn = { signal: Tw.signal, reads: { n: 0 } };
  rT = Xe && Rt ? { ctl: en, consentSlot: U } : null;
  let nn = Promise.resolve(),
    rn = (t, n, r, i = !1) => {
      let s = async (c = !1) => {
          if (((t || c) && a !== Q) || !Rt)
            return (c && e.report("broker-consent-error"), "unavailable");
          if (i && (t ? en.granted : en.revoked))
            return (t && (en.localDeny = !1), t ? "granted" : "denied");
          let l;
          try {
            l = await ed(
              Ht,
              [
                {
                  kind: "files",
                  ...(t ? { grant: !0 } : { revoke: !0 }),
                  seenProject: n,
                  seenSeq: en.seq,
                  ...(r !== void 0 && { provenance: r }),
                },
              ],
              {
                sleep: (e) => new Promise((t) => window.setTimeout(t, e)),
                refresh: () => Pn.refreshToken(),
                aborted: () => a !== Q,
              },
            );
          } catch {
            return "unavailable";
          }
          if (l.status === "saved") {
            let n = !en.granted && !en.revoked,
              r = l.ops.find((e) => e.kind === "files");
            return (
              (en.seq = r?.decisionSeq ?? en.seq + 1),
              (en.granted = r?.granted ?? t),
              (en.revoked = !en.granted),
              en.granted && (en.localDeny = !1),
              n && o() && UE(e),
              en.granted ? "granted" : "denied"
            );
          }
          return l.status === "rerender" &&
            l.code === "superseded" &&
            i &&
            !t &&
            !c &&
            e.requestConsentReboot
            ? (await e.requestConsentReboot().catch(() => null), s(!0))
            : (l.status === "rerender" && i && UE(e),
              (!t || l.status !== "rerender") &&
                e.report("broker-consent-error"),
              l.status === "rerender" ? "changed" : "unavailable");
        },
        c = t ? void 0 : Xu(),
        l = nn
          .then(
            () => s(),
            () => s(),
          )
          .finally(c);
      return ((nn = l), l);
    },
    an = (t) =>
      a !== Q || !Rt
        ? Promise.resolve("unavailable")
        : pO(e)
          ? Promise.resolve("busy")
          : (e.markShown(),
            new Promise((n) => {
              let r = !0,
                i = null,
                o = null;
              XO(e, [], null, {
                filesAsk: t.name,
                filesToggle: {
                  isRevoked: () => !r,
                  onToggle: (e) =>
                    a !== Q || e === r
                      ? !1
                      : ((r = e),
                        (i = e),
                        e ||
                          ((en.localDeny = !0), (o = rn(!1, t.id, "explicit"))),
                        !0),
                },
                networkOrigins: B ?? void 0,
                entries: Promise.resolve(null),
                pref: () => ({}),
                onContinue: (e, a, s) => {
                  !r && o
                    ? n(o.then(() => "denied"))
                    : s
                      ? n("dismissed")
                      : ((en.localDeny = !1),
                        n(rn(!0, t.id, i === !0 ? "explicit" : "default")));
                },
                onExternalClose: () =>
                  n(!r && o ? o.then(() => "denied") : "unavailable"),
              });
            })),
    on = () => {
      if (!Xe || !Rt || (!en.granted && !en.revoked)) return null;
      let e = null;
      return {
        toggle: {
          isRevoked: () => (e === null ? en.revoked || en.localDeny : !e),
          onToggle: (t) =>
            a === Q &&
            ((e = t),
            t || ((en.localDeny = !0), rn(!1, Xe.project, "explicit", !0)),
            !0),
        },
        commit: () => {
          e === !0 && ((en.localDeny = !1), rn(!0, Xe.project, "explicit", !0));
        },
      };
    },
    sn = async () => {
      if (!(a !== Q || !e.requestConsentReboot))
        try {
          let t = await e.requestConsentReboot();
          if (
            t !== null &&
            a === Q &&
            t.org === U.org &&
            z(t.assetToken) === U.account
          ) {
            typeof t.consentToken == "string" &&
              t.consentToken !== "" &&
              (U.value = t.consentToken);
            let e = Ku(t.consent);
            e?.sample && eE(W, e.sample);
          }
        } catch {}
    },
    cn = async (t, n) => {
      if (!Rt) return !0;
      un = !0;
      let r;
      dn = new Promise((e) => {
        r = e;
      });
      try {
        let r = await Qu(Ht, [
          {
            kind: "sample",
            grant: !0,
            seenSeq: W.seq,
            ...wn(n),
            ...(t !== void 0 && { provenance: t }),
          },
        ]);
        if (
          r.status === "rerender" ||
          r.status === "reauth" ||
          (r.status === "rejected" && r.httpStatus === 403)
        )
          return (
            e.report("sample-consent-write", r.status),
            o() && e.requestReboot(),
            !1
          );
        if (r.status !== "saved")
          return (e.report("sample-consent-write", r.status), !1);
        let i = r.ops.find((e) => e.kind === "sample");
        return i
          ? ((W.seq = i.decisionSeq),
            (W.sample = Tn(i)),
            i.granted || e.report("sample-consent-write", "echo-denied"),
            i.granted)
          : (await sn(), !0);
      } finally {
        ((un = !1), r());
      }
    },
    ln = null,
    un = !1,
    dn = Promise.resolve(),
    fn = Promise.resolve(),
    pn = null,
    mn = 0,
    hn = !1,
    gn = (e) => e !== null && (e.decisionSeq > 0 || e.defaultGranted === !0),
    _n = () => {
      if (pn !== null) return !pn;
      if (ln !== null) return ln;
      let e = W.sample;
      return gn(e) ? !(e.granted && !e.revoked) : !1;
    },
    vn = () => Ke !== null && Rt && gn(W.sample),
    yn = Ke !== null && xb(Ke.config) !== null,
    bn = () => W.sample?.imagesGranted !== void 0,
    xn = () => {
      let e = W.sample;
      return (
        Rt &&
        yn &&
        gn(e) &&
        e.granted &&
        !e.revoked &&
        e.imagesGranted === !1 &&
        e.disclosure !== 2
      );
    },
    Sn = () => xn() && (W.sample?.decisionSeq ?? 0) > 0,
    Cn = (e) => yn && bn() && (e || !xn()),
    wn = (e) => (bn() ? { disclosure: e ? 2 : 1 } : {}),
    Tn = (e) => ({
      decisionSeq: e.decisionSeq,
      granted: e.granted,
      revoked: !e.granted,
      ...(typeof e.imagesGranted == "boolean" && {
        imagesGranted: e.imagesGranted,
      }),
      ...(Uu(e.disclosure) !== void 0 && { disclosure: Uu(e.disclosure) }),
    }),
    En = async (t, n, r) => {
      try {
        let i;
        try {
          i = await ed(
            Ht,
            [
              t
                ? {
                    kind: "sample",
                    grant: !0,
                    seenSeq: W.seq,
                    ...wn(r),
                    ...(n !== void 0 && { provenance: n }),
                  }
                : {
                    kind: "sample",
                    revoke: !0,
                    seenSeq: W.seq,
                    ...(n !== void 0 && { provenance: n }),
                  },
            ],
            {
              sleep: (e) => new Promise((t) => window.setTimeout(t, e)),
              refresh: () => Pn.refreshToken(),
              aborted: () => a !== Q,
            },
          );
        } catch {
          o()
            ? (e.report("sample-consent-write", "reauth"),
              e.report("broker-consent-error"))
            : e.report("sample-consent-write", "dropped");
          return;
        }
        if (i.status === "rerender" || i.status === "reauth") {
          (e.report("sample-consent-write", i.status),
            o() && e.requestReboot());
          return;
        }
        if (i.status === "rejected" && i.httpStatus === 403) {
          o()
            ? (e.report("sample-consent-write", i.status), e.requestReboot())
            : e.report("sample-consent-write", "dropped");
          return;
        }
        if (i.status !== "saved") {
          o()
            ? (e.report("sample-consent-write", i.status),
              e.report("broker-consent-error"))
            : e.report("sample-consent-write", "dropped");
          return;
        }
        let s = i.ops.find((e) => e.kind === "sample");
        s
          ? ((W.seq = s.decisionSeq),
            (W.sample = Tn(s)),
            s.granted !== t && e.report("sample-consent-write", "echo-denied"),
            (ln = null))
          : await sn();
      } finally {
        un = !1;
      }
    },
    Dn = (t, n, r, i = t) =>
      a !== Q || !Ke || !Rt || un || t === !_n()
        ? !1
        : t
          ? ((ln = !1),
            n
              ? (J.noteExternalRevoke({ cleared: ["sample"], denied: [] }),
                e.report("consent-prompt", "sample-lift"))
              : (J.noteExternalGrant(["sample"]),
                (un = !0),
                (dn = En(!0, On(!0, i), r)),
                e.report("consent-prompt", "sample-regrant")),
            !0)
          : ((ln = !0),
            J.noteExternalRevoke({ cleared: [], denied: ["sample"] }),
            (un = !0),
            (dn = En(!1, On(!1, i), r)),
            e.report("consent-prompt", "sample-revoke"),
            !0),
    On = (e, t) => {
      if (t === e) return "explicit";
      let n = W.sample;
      if (!(
        n !== null &&
        n.decisionSeq > 0 &&
        (n.granted && !n.revoked) === e &&
        !(e && Sn())
      ))
        return "default";
    },
    kn = (e) => {
      if (!Ke || !Rt) return;
      let t = {
        lastPress: null,
        showedImages: Cn(e),
        isRevoked: () => _n(),
        onToggle: (n) => {
          let r = Dn(n, e, t.showedImages);
          return (r && (t.lastPress = n), r);
        },
      };
      return t;
    },
    An = 0,
    jn = new Set(),
    Mn = (t, n) => {
      let r = new Map(),
        i = An,
        o = (e) => {
          let t = G.read();
          return (
            c &&
            Rt &&
            t !== null &&
            V.some((t) => t.server === e) &&
            !q(e, t) &&
            (t.get(e)?.tools.size ?? 0) === 0 &&
            !J.grantedByDecision(`mcp:${e}`)
          );
        },
        s = () => {
          if (!c) return;
          let t = [...r]
            .filter(([e, t]) => t && V.some((t) => t.server === e))
            .map(([e]) => e);
          r.clear();
          for (let e of t) ni.add(e);
          if (!Rt) return;
          let n = (t, n) => {
            for (let r of t) {
              let t = `mcp:${r}`;
              !q(r) &&
                !J.grantedByDecision(t) &&
                J.query(t) !== "granted" &&
                e.report("consent-prompt", n);
            }
          };
          if (An !== i) {
            a === Q && n(t, "ask-withheld-device-change");
            return;
          }
          for (let e of t) jn.add(e);
          if (jn.size === 0) return;
          let o = { gesture: "press" },
            s = () => {
              let t = [...jn];
              if ((jn.clear(), a !== Q)) return;
              if (Yr?.isConnected !== !0) {
                n(t, "ask-withheld-no-page");
                return;
              }
              if (mi()) {
                for (let e of t) jn.add(e);
                return;
              }
              let r = t
                .filter((e) => !q(e))
                .map((e) => `mcp:${e}`)
                .filter((e) => !J.grantedByDecision(e));
              J.noteExternalRevoke({ cleared: r, denied: [] });
              let i = [];
              for (let t of r) {
                let n = J.query(t);
                n === "prompt" && J.wouldPrompt([t], o)
                  ? i.push(t)
                  : n !== "granted" &&
                    (n === "prompt" && fi(t) && DA(e, !0),
                    e.report("consent-prompt", "ask-withheld-other"));
              }
              i.length !== 0 &&
                J.request(i, o)
                  .then((e) => {
                    i.some((t) => e[t] === "granted") && Oi();
                  })
                  .catch(() => void 0);
            };
          queueMicrotask(() => J.whenIdle(s));
        },
        l = new Set(),
        u = null,
        d = kn(!1),
        f = d?.showedImages === !0,
        p = () => n && pn === null && ln === null && !gn(W.sample);
      return {
        sampleImages: f,
        sampleToggle:
          d === void 0
            ? void 0
            : {
                isRevoked: () => (u === null ? p() || d.isRevoked() : !u),
                onToggle: (e) => a === Q && ((u = e), e || Dn(!1, !1, f), !0),
              },
        toggles: t
          ? {
              isRevoked: (e) => {
                let t = r.get(e);
                return t === void 0
                  ? q(e, aa) ||
                      (o(e) && !(jn.has(e) && J.query(`mcp:${e}`) === "prompt"))
                  : !t;
              },
              startsOff: (e) => {
                if (r.has(e)) return !1;
                let t = !q(e, aa) && ri(e);
                return (t ? l.add(e) : l.delete(e), t);
              },
              onToggle: (e, t) =>
                a === Q &&
                (t || jn.delete(e),
                o(e) && (t || (G.decisionSeq(e) === 0 && !ti.has(e)))
                  ? (t ? r.set(e, !0) : (r.delete(e), ni.delete(e)), !0)
                  : (r.set(e, t),
                    !t && !q(e, aa) && sa(e, !1, "consent-prompt"),
                    !0)),
            }
          : void 0,
        commit: (i = !1) => {
          if (t) {
            for (let [e, t] of r)
              t !== !(q(e, aa) || l.has(e)) &&
                sa(e, t, "consent-prompt") &&
                t &&
                (ni.add(e), H.startsOff.delete(e));
            s();
          }
          if (d === void 0 || ((i || n) && u === null)) return;
          let o = u ?? !d.isRevoked();
          pn = o;
          let c = ++mn;
          fn = fn
            .then(() => dn)
            .then(() => {
              if (a !== Q) {
                e.report("sample-consent-write", "dropped");
                return;
              }
              let t = mn === c ? null : pn;
              pn = null;
              let n = ln === null && !gn(W.sample);
              return (
                o
                  ? n
                    ? un ||
                      (J.noteExternalGrant(["sample"]),
                      (un = !0),
                      (dn = En(!0, On(!0, u), f)))
                    : Dn(!0, !1, f, u)
                  : Dn(!1, !1, f, u),
                t !== null && (pn = t),
                dn
              );
            });
        },
      };
    },
    Nn = () => {
      ln === !1 && (ln = null);
    },
    Pn = {
      kickRefresh: () => void 0,
      reseedConsent: () => void 0,
      withdrawEnable: (e, t = "unsaved", n) => {
        if (a !== Q) return;
        if (n?.httpStatus === 422)
          for (let t of e) (vt(t) || ht(t)) && wt.set(t, { code: n.code });
        let r = G.read(),
          i = [],
          o = [],
          s = Qr.flatMap((t) => {
            if (!e.includes(t.server)) return [t];
            let n = r?.get(t.server);
            return n && n.revoked !== !0 && n.tools.size > 0
              ? (o.push(t.server),
                [jt({ server: t.server, tools: [...n.tools] }, r)])
              : (i.push(t.server), []);
          }),
          c = e.filter((e) => !Qr.some((t) => t.server === e));
        for (let e of i) (ei.delete(e), $r.set(e, null));
        if (i.length > 0 || o.length > 0 || c.length > 0) {
          let e = V.some((e) => q(e.server, r));
          J.noteExternalRevoke({
            cleared: [
              ...c.map((e) => `mcp:${e}`),
              ...(o.length > 0
                ? [
                    ...o.map((e) => `mcp:${e}`),
                    ...(i.length === 0 && !e ? ["mcp"] : []),
                  ]
                : []),
            ],
            denied: i.length > 0 ? [...i.map((e) => `mcp:${e}`), "mcp"] : [],
          });
        }
        (t === "unsaved" &&
          c.length > 0 &&
          J.noteExternalUndecided(
            c.map((e) => `mcp:${e}`),
            hi++ > 0,
          ),
          Yr?.isConnected === !0 &&
            Qr.some((t) => e.includes(t.server)) &&
            ea(Yr, s));
      },
      withdrawSelf: () => void 0,
      reportFailure: () => e.report("broker-consent-error"),
      refreshToken: async () => {
        if (U.gen !== Q) return !1;
        let t = e.requestConsentReboot
          ? await e.requestConsentReboot()
          : await e.requestReboot();
        if (
          t === null ||
          U.gen !== Q ||
          t.org !== U.org ||
          z(t.assetToken) !== U.account
        )
          return !1;
        let n = t.consentToken;
        return typeof n != "string" || n === "" ? !1 : ((U.value = n), !0);
      },
      dead: () => a !== Q,
    },
    G = Rt
      ? hf(Ru, {
          view: Kt ?? {
            mcp: null,
            self: null,
            sample: null,
            devices: new Map(),
          },
          declared: V,
          transport: Ht,
          host: Pn,
        })
      : zO(Lt);
  Rw = G;
  let Fn = new Map([...(Kt?.devices ?? [])].filter(([e]) => Wt.includes(e))),
    In = new Map(),
    Ln = new Map(),
    Rn = (e) => {
      let t = Fn.get(e);
      return t === void 0
        ? null
        : t.revoked
          ? "revoked"
          : t.decisionSeq > 0 && t.granted
            ? "granted"
            : "ask";
    },
    zn = (e) => Rn(Iu(e)) === "granted",
    Bn = (e) => Rn(Iu(e)) === "revoked",
    Vn = (e) => Gt && Ut.includes(e) && Rn(Iu(e)) !== null && !Bn(e),
    Hn = (e) => Fu(e) && Ut.includes(e),
    Un = (e) => Ut.filter((t) => Iu(t) === e),
    Wn = !1,
    Gn = (e) => {
      let t = Ku(e)?.devices;
      if (!t) return;
      for (let e of Wt) {
        let n = t.get(e),
          r = Fn.get(e);
        n && (r === void 0 || n.decisionSeq >= r.decisionSeq) && Fn.set(e, n);
      }
      let n = Ut.filter(Bn);
      n.length > 0 && J.noteExternalRevoke({ cleared: [], denied: n });
    },
    Kn = async () => {
      if (!o() || !e.requestConsentReboot) return !1;
      let t = await e.requestConsentReboot().catch(() => null);
      return t === null ||
        !o() ||
        t.org !== U.org ||
        z(t.assetToken) !== U.account
        ? !1
        : (typeof t.consentToken == "string" &&
            t.consentToken !== "" &&
            (U.value = t.consentToken),
          Gn(t.consent),
          !0);
    };
  ((uT = Gt
    ? {
        consentSlot: U,
        frameUuid: e.frameUuid,
        reconcile: Gn,
        onPeerDecision: (e) => {
          if (o()) {
            for (let [t, n] of e)
              Wt.includes(t) && In.set(t, Math.max(In.get(t) ?? 0, n));
            hr(
              Wt.some((e) => Rn(e) === "granted"),
              !1,
              !0,
            );
          }
        },
      }
    : null),
    Gt && gT(e.frameUuid));
  let qn = () => {
      let e = qt.state;
      return e !== null && (e.decisionSeq > 0 || e.granted || e.revoked);
    },
    Jn = () => qt.state?.revoked === !0,
    Yn = 0,
    Xn = 0,
    Zn = (e = 0) => {
      (Yn++,
        (qt.state = {
          decisionSeq: Math.max(qt.state?.decisionSeq ?? 0, e),
          granted: !1,
          revoked: !0,
        }));
      try {
        qi?.end("not_granted");
      } catch {}
      J.noteExternalRevoke({ cleared: [], denied: ["dictation"] });
    },
    Qn = (e) => {
      e.revoked && !Jn() && Zn();
      let t = Jn();
      ((qt.state = e),
        t &&
          e.granted &&
          !e.revoked &&
          J.noteExternalRevoke({ cleared: ["dictation"], denied: [] }));
    },
    $n = !1,
    er = async (t = Yn) => {
      if (!o() || !e.requestConsentReboot) return;
      let n = await Promise.race([
        e.requestConsentReboot().catch(() => null),
        new Promise((e) => window.setTimeout(() => e(null), ZA)),
      ]);
      if (
        n === null ||
        !o() ||
        n.org !== U.org ||
        z(n.assetToken) !== U.account
      )
        return;
      typeof n.consentToken == "string" &&
        n.consentToken !== "" &&
        (U.value = n.consentToken);
      let r = Ku(n.consent)?.dictation,
        i = qt.state?.decisionSeq ?? 0;
      if (r && Xn > 0 && r.decisionSeq > i && !r.revoked) {
        Qn({ decisionSeq: r.decisionSeq, granted: !1, revoked: !0 });
        return;
      }
      r &&
        (r.decisionSeq > i || (r.decisionSeq === i && !Jn())) &&
        (r.revoked ||
          (Xn === 0 && Yn === t && r.decisionSeq > (IT.get(Jt) ?? -1))) &&
        Qn(r);
    },
    tr = async (t, n = Yn) => {
      let r = {
          kind: "dictation",
          ...(t ? { grant: !0 } : { revoke: !0 }),
          seenSeq: qt.state?.decisionSeq ?? 0,
          provenance: "explicit",
        },
        i;
      try {
        i = await ed(Ht, [r], {
          sleep: (e) => new Promise((t) => window.setTimeout(t, e)),
          refresh: () => Pn.refreshToken(),
          aborted: () => a !== Q,
        });
      } catch {
        return (
          e.report("dictation-consent-write", o() ? "reauth" : "dropped"),
          !1
        );
      }
      let s =
        i.status === "saved"
          ? i.ops.find((e) => e.kind === "dictation")
          : void 0;
      if ((s && !s.granted && YT(e.frameUuid, Jt, s.decisionSeq), !o()))
        return (
          i.status !== "saved" &&
            e.report("dictation-consent-write", "dropped"),
          !1
        );
      if (i.status === "rerender" || i.status === "reauth")
        return (e.report("dictation-consent-write", i.status), await er(n), !1);
      if (i.status !== "saved")
        return (e.report("dictation-consent-write", i.status), !1);
      if (!s) return (await er(n), !1);
      let c = (t && Yn !== n) || (!t && s.granted);
      return (
        Qn({
          decisionSeq: s.decisionSeq,
          granted: s.granted && !c,
          revoked: !s.granted || c,
        }),
        s.granted !== t && e.report("dictation-consent-write", "echo-denied"),
        s.granted === t && !c
      );
    },
    nr = Promise.resolve(),
    rr = () => {
      VT(() => {
        let e = HT(Jt);
        o() && e !== null && ir(!1, e.press);
      });
    },
    ir = (t, n) => {
      if (n !== void 0) {
        let e = HT(Jt);
        if (e === null || e.press !== n) return Promise.resolve(!1);
      }
      let r = n ?? Date.now(),
        i = Yn;
      t || Xn++;
      let a = t ? void 0 : Xu();
      !t &&
        n === void 0 &&
        Xt &&
        !UT(Jt, qt.state?.decisionSeq ?? 0, r) &&
        e.report("dictation-consent-write", "dropped");
      let s = () => n !== void 0 && HT(Jt)?.press !== n,
        c = nr
          .then(async () => {
            if (s()) return !1;
            let e = qt.state?.decisionSeq ?? 0,
              n = await tr(t, i);
            return !n && !t && o() && !s() && (qt.state?.decisionSeq ?? 0) > e
              ? tr(!1)
              : n;
          })
          .then((e) => (e && Xt ? WT(Jt, r) : !e && !t && o() && rr(), e))
          .finally(() => {
            (t || Xn--, a?.());
          });
      if (((nr = c.catch(() => void 0)), !t)) {
        let t = qt.state?.decisionSeq ?? 0;
        try {
          YT(e.frameUuid, Jt, t);
        } finally {
          Zn();
        }
      }
      return c;
    };
  if (Qt && Zt !== null) {
    let e = Zt.press;
    queueMicrotask(() => {
      o() && ir(!1, e);
    });
  }
  let ar = () =>
      !Qe || !Rt
        ? null
        : {
            isRevoked: () => qt.state?.granted !== !0 || Jn(),
            onToggle: (e, t) => {
              if (a !== Q) return !1;
              let n = () => t?.(qt.state?.granted === !0 && !Jn());
              return (
                ir(e).then((t) => {
                  (e &&
                    t &&
                    J.noteExternalRevoke({
                      cleared: ["dictation"],
                      denied: [],
                    }),
                    n());
                }, n),
                !0
              );
            },
          },
    or = !0,
    sr = () => {
      if (!st || !Rt || !$t.served() || !or) return null;
      let e = $t.manageRow();
      return {
        isRevoked: () => e.isRevoked(),
        onToggle: (t, n) => (!t || or ? e.onToggle(t, n) : !1),
      };
    },
    cr = async (t, n) => {
      if (t.length === 0) return !0;
      Wn = !0;
      let r = t.map((e) => ({
        kind: e,
        ...(n ? { grant: !0 } : { revoke: !0 }),
        seenSeq: Fn.get(e)?.decisionSeq ?? 0,
        provenance: "explicit",
      }));
      try {
        let t;
        try {
          t = await ed(Ht, r, {
            sleep: (e) => new Promise((t) => window.setTimeout(t, e)),
            refresh: () => Pn.refreshToken(),
            aborted: () => a !== Q,
          });
        } catch {
          return (
            e.report("device-consent-write", o() ? "reauth" : "dropped"),
            !1
          );
        }
        if (!o())
          return (
            t.status === "saved"
              ? (!n || t.ops.some((e) => !e.granted)) && lr(r, t.ops)
              : e.report("device-consent-write", "dropped"),
            !1
          );
        if (t.status === "rerender" || t.status === "reauth")
          return (e.report("device-consent-write", t.status), await Kn(), !1);
        if (t.status !== "saved")
          return (e.report("device-consent-write", t.status), !1);
        let i = !0,
          s = !1;
        for (let { kind: e, seenSeq: a } of r) {
          let r = t.ops.find((t) => t.kind === e);
          if (!r) {
            ((s = !0),
              n || Ln.set(e, Math.max(a + 1, Fn.get(e)?.decisionSeq ?? 0)));
            continue;
          }
          (Fn.set(e, {
            decisionSeq: r.decisionSeq,
            granted: r.granted,
            revoked: !r.granted,
          }),
            r.granted || Ln.set(e, r.decisionSeq),
            r.granted !== n && (i = !1));
        }
        return (
          i || e.report("device-consent-write", "echo-denied"),
          s && (await Kn()),
          i
        );
      } finally {
        Wn = !1;
      }
    },
    lr = (t, n) => {
      let r = {
        uuid: e.frameUuid,
        floors: Object.fromEntries(
          t.flatMap(({ kind: e, seenSeq: t }) => {
            let r = n.find((t) => t.kind === e);
            return r?.granted === !0
              ? []
              : [
                  [
                    e,
                    r?.decisionSeq ??
                      Math.max(t + 1, Fn.get(e)?.decisionSeq ?? 0),
                  ],
                ];
          }),
        ),
      };
      (hT(e.frameUuid, r), dr(mT(r)));
    },
    ur = new Map(),
    dr = (t) => {
      if (![...t].some(([e, t]) => t > (ur.get(e) ?? 0)) || o()) return;
      for (let [e, n] of t) ur.set(e, Math.max(n, ur.get(e) ?? 0));
      let n = uT;
      if (
        n !== null &&
        n.consentSlot !== U &&
        n.frameUuid === e.frameUuid &&
        n.consentSlot.org === U.org &&
        n.consentSlot.account === U.account
      ) {
        n.onPeerDecision(t);
        return;
      }
      let r = fT(e.frameUuid, U.org, U.account),
        i = dT.get(r) ?? new Map();
      for (let [e, n] of t) i.set(e, Math.max(n, i.get(e) ?? 0));
      dT.set(r, i);
    },
    fr = () => {
      let e = new Map(In);
      for (let [t, n] of Ln) n > (e.get(t) ?? 0) && e.set(t, n);
      return e;
    },
    pr = (t) => {
      let n = {};
      for (let e of t) {
        let t = Math.max(Fn.get(e)?.decisionSeq ?? 0, Ln.get(e) ?? 0);
        t > 0 && (n[e] = t);
      }
      hT(e.frameUuid, { uuid: e.frameUuid, floors: n });
    },
    mr = () => {
      o() &&
        (e.setUnwire(null),
        e.unmount(),
        e.showNoticePane(Tp(XA.head), Tp(XA.sub)));
    },
    hr = (t, n = !1, r = !1) => {
      if (!o()) {
        dr(fr());
        return;
      }
      let i = () => {
          if (!o()) {
            dr(fr());
            return;
          }
          if (!n) {
            window.setTimeout(() => hr(t, !0, r), QA);
            return;
          }
          (e.report("device-consent-write", "reboot-failed"), t && mr());
        },
        a =
          r && e.requestConsentRebootFresh
            ? e.requestConsentRebootFresh
            : e.requestConsentReboot;
      if (!a) {
        i();
        return;
      }
      let s = a();
      (t
        ? Promise.race([
            s,
            new Promise((e) => window.setTimeout(() => e(null), ZA)),
          ])
        : s
      ).then((e) => {
        (e === null || gr(e)) && i();
      }, i);
    },
    gr = (e) => {
      if (!e) return !1;
      let t = Ku(e.consent)?.devices;
      return Wt.some((e) => {
        let n = t?.get(e);
        if (n === void 0) return !1;
        let r = Math.max(
          Fn.get(e)?.decisionSeq ?? 0,
          Ln.get(e) ?? 0,
          In.get(e) ?? 0,
        );
        return n.decisionSeq < r;
      });
    },
    _r = fT(e.frameUuid, U.org, U.account),
    vr = Gt ? dT.get(_r) : void 0;
  if (vr !== void 0) {
    let e = !1;
    for (let [t, n] of vr)
      Wt.includes(t) &&
        (vr.delete(t),
        In.set(t, Math.max(In.get(t) ?? 0, n)),
        (Fn.get(t)?.decisionSeq ?? 0) < n && (e = !0));
    (vr.size === 0 && dT.delete(_r),
      e &&
        hr(
          Wt.some((e) => Rn(e) === "granted"),
          !1,
          !0,
        ));
  }
  let yr = () => Wt.map((e) => ({ kind: e, on: Rn(e) === "granted" })),
    br = () => {
      let t = !1,
        n = !1,
        r = new Set(Wt.filter((e) => Rn(e) === "granted")),
        i = [],
        s = !1,
        c = {
          end: null,
          rows: yr(),
          onToggle: (l, u, d) => {
            if (a !== Q || Wn || !Wt.includes(l)) return !1;
            An += 1;
            let f = Un(l);
            return (
              e.report(
                "consent-prompt",
                u ? "device-regrant" : "device-revoke",
              ),
              u
                ? J.noteExternalGrant(f)
                : J.noteExternalRevoke({ cleared: [], denied: f }),
              i.push(
                cr([l], u).then((e) => {
                  if (e) {
                    ((t = !0),
                      u ||
                        ((n = !0),
                        pr([l]),
                        r.has(l) && o() && !s && (r.clear(), c.end?.())));
                    return;
                  }
                  (d(!u),
                    u &&
                      J.noteExternalRevoke(
                        Rn(l) === "revoked"
                          ? { cleared: [], denied: f }
                          : { cleared: f, denied: [] },
                      ));
                }),
              ),
              !0
            );
          },
          settle: () => {
            ((s = !0),
              Promise.all(i).then(() => {
                t && hr(n);
              }));
          },
        };
      return c;
    },
    xr =
      Rt &&
      xe !== null &&
      !Fe &&
      Kt?.messages !== void 0 &&
      Kt.messages !== null,
    Sr = z(typeof n.assetToken == "string" ? n.assetToken : ""),
    Cr = bT(e.frameUuid, e.org, Sr),
    wr = xr && Sr !== "" && Sr !== "-",
    K = Kt?.messages ?? null,
    Tr = !1;
  {
    let e = yT.get(Cr);
    K && e && e.decisionSeq > K.decisionSeq && ((K = e), (Tr = !0));
  }
  let Er = -1,
    Dr = null;
  if (K !== null) {
    let e = wr ? wT(Cr) : null,
      t = vT.get(Cr) ?? -1;
    (e !== null && K.revoked && K.decisionSeq > e.seq
      ? AT(Cr, e.press)
      : e !== null &&
        ((Er = Math.max(e.seq, t, K.decisionSeq)), (Dr = e.press)),
      K.decisionSeq <= t && (Er = Math.max(Er, t)));
  }
  let Or = Promise.resolve(),
    kr = 0,
    Ar = 0,
    jr = () =>
      !xr || K === null
        ? null
        : K.revoked || Er >= 0
          ? "revoked"
          : K.decisionSeq > 0 && K.granted
            ? "granted"
            : "ask",
    Mr = () => {
      if (!o() || !xr || K === null) return;
      let t = Er >= 0;
      e.setMessagesConsent?.(
        {
          granted: K.granted && !t,
          revoked: K.revoked || t,
          decisionSeq: Math.max(K.decisionSeq, Er),
        },
        { org: U.org, account: U.account },
      );
    },
    Nr = (e, t) => {
      let n = K !== null && e.decisionSeq < K.decisionSeq,
        r = t !== void 0 && !(e.granted && n),
        i =
          K === null ||
          e.decisionSeq !== K.decisionSeq ||
          e.granted !== K.granted ||
          e.revoked !== K.revoked;
      n || (K = e);
      let a = yT.get(Cr);
      ((!a || e.decisionSeq >= a.decisionSeq) && yT.set(Cr, e),
        r &&
          ((Er = -1),
          e.revoked ? xT(Cr, e.decisionSeq) : vT.delete(Cr),
          wr && AT(Cr, t)),
        (i || r) && Mr());
    },
    Pr = (e) => {
      let t = Ku(e)?.messages;
      t && (K === null || t.decisionSeq >= K.decisionSeq) && Nr(t);
    },
    Fr = async (t = !1) => {
      let n =
        t && e.requestConsentRebootFresh
          ? e.requestConsentRebootFresh
          : e.requestConsentReboot;
      if (!o() || !n) return !1;
      let r = await n().catch(() => null);
      return r === null ||
        !o() ||
        r.org !== U.org ||
        z(r.assetToken) !== U.account
        ? !1
        : (typeof r.consentToken == "string" &&
            r.consentToken !== "" &&
            (U.value = r.consentToken),
          Pr(r.consent),
          !0);
    },
    Ir = async (t, n, r, i) => {
      if (i && (t || !o() || Er < 0)) return !1;
      let s = K?.decisionSeq ?? 0,
        c = () => {
          t ||
            !o() ||
            kT(() => {
              o() && Er >= 0 && Lr(!1, n, !0);
            });
        };
      {
        let i;
        try {
          i = await ed(
            Ht,
            [
              {
                kind: "messages",
                ...(t ? { grant: !0 } : { revoke: !0 }),
                seenSeq: s,
                provenance: "explicit",
              },
            ],
            {
              sleep: (e) => new Promise((t) => window.setTimeout(t, e)),
              refresh: () => Pn.refreshToken(),
              aborted: () => a !== Q,
            },
          );
        } catch {
          return (
            e.report("messages-consent-write", o() ? "reauth" : "dropped"),
            c(),
            !1
          );
        }
        if (!o()) {
          i.status !== "saved" && e.report("messages-consent-write", "dropped");
          let r = (i.status === "saved" ? i.ops : []).find(
            (e) => e.kind === "messages",
          );
          return (
            r && r.granted === t && wr && AT(Cr, n),
            r &&
              !r.granted &&
              (xT(Cr, r.decisionSeq),
              _T?.onPeerRefusal(Cr, r.decisionSeq, !1),
              NT(e.frameUuid, Cr, r.decisionSeq)),
            !1
          );
        }
        if (i.status === "rerender" || i.status === "reauth")
          return (
            e.report("messages-consent-write", i.status),
            await Fr(),
            t
              ? jr() === "granted"
              : K?.revoked === !0 && (NT(e.frameUuid, Cr, K.decisionSeq), !0)
          );
        if (i.status !== "saved")
          return (e.report("messages-consent-write", i.status), c(), !1);
        let l = i.ops.find((e) => e.kind === "messages"),
          u = l?.granted ?? t,
          d = l?.decisionSeq ?? s + 1;
        if (
          (Nr(
            { decisionSeq: d, granted: u, revoked: !u },
            u === t && Ar === r ? n : void 0,
          ),
          u || (xT(Cr, d), wr && AT(Cr, n), NT(e.frameUuid, Cr, d)),
          !l)
        )
          await Fr();
        else if (l.granted !== t)
          return (e.report("messages-consent-write", "echo-denied"), !1);
        return !t || jr() === "granted";
      }
    },
    Lr = (e, t = Date.now(), n = !1) => {
      kr++;
      let r = Ar,
        i = Or.then(() => Ir(e, t, r, n));
      return (
        (Or = i.then(
          () => {
            kr--;
          },
          () => {
            kr--;
          },
        )),
        i
      );
    },
    Rr = () => {
      NT(e.frameUuid, Cr, Er + 1, !0);
    },
    zr = (e = K?.decisionSeq ?? 0) => {
      (Ar++, (Er = Math.max(Er, e)), xT(Cr, Er), Mr());
    },
    Br = () => {
      if (!o() || !xr) return Promise.resolve("unavailable");
      let t = jr();
      return t === "granted"
        ? Promise.resolve("granted")
        : t === "revoked"
          ? Promise.resolve("denied")
          : !zt() || pO(e) || kr > 0
            ? Promise.resolve("unavailable")
            : (e.markShown(),
              new Promise((t) => {
                YO(
                  e,
                  {
                    title: y_.title,
                    description: y_.description,
                    testId: "messages-consent-dialog",
                    strictArming: !0,
                  },
                  {
                    onAllow: () => {
                      if (!zt()) return t("unavailable");
                      Lr(!0).then((e) =>
                        t(e ? "granted" : o() ? "unsaved" : "unavailable"),
                      );
                    },
                    onDeny: () => {
                      if (!zt()) return t("unavailable");
                      let e = Date.now();
                      (zr(), wr && TT(Cr, Er, e), Rr(), t("denied"), Lr(!1, e));
                    },
                    onDismiss: () => t("dismissed"),
                    onExternalClose: () => t("unavailable"),
                  },
                );
              }));
    },
    Vr = () => xr && (e.messagesAskable?.() ?? !0),
    Hr = () =>
      iu() ? (e.soleAuthor?.() ?? !1) : (Bt()?.roomSendUnasked?.() ?? !1),
    Ur = () => {
      let e = jr();
      return e === "granted" || (e === "ask" && Hr());
    },
    Wr = () => ({
      row: { on: Ur() },
      onToggle: (t, n) => {
        if (a !== Q || !zt()) return !1;
        e.report("consent-prompt", t ? "messages-regrant" : "messages-revoke");
        let r = Date.now();
        return (
          t || (zr(), wr && TT(Cr, Er, r), Rr()),
          Lr(t, r).then(() => {
            let e = Ur();
            e !== t && n(e);
          }),
          !0
        );
      },
    });
  ((_T = xr
    ? {
        consentSlot: U,
        reconcile: Pr,
        ask: Br,
        onPeerRefusal: (e, t, n) => {
          if (!o() || e !== Cr) return;
          let r = K?.decisionSeq ?? 0,
            i = n ? Math.max(t - 1, r) : t - 1;
          (n && Ar++, !(n ? Er >= i : t <= r) && (zr(i), Fr(!0)));
        },
      }
    : null),
    xr && MT(e.frameUuid),
    Er >= 0 && xT(Cr, Er),
    (Er >= 0 || Tr) && queueMicrotask(Mr),
    Dr !== null && Lr(!1, Dr, !0));
  let Gr = wm(n),
    Kr = Me(n) || je(n),
    qr = typeof n.ver == "string" ? n.ver : "",
    Jr = {
      ver: qr,
      filesEnabled: n.artifactFilesEnabled === !0,
      preconditions: n.publishPreconditions === !0 && Date.now() >= PE,
      ownMoves: 0,
      tail: Promise.resolve(),
      livePaths: (n.docs ?? []).map((e) => e.path),
      liveDocIds: new Map(
        (n.docs ?? []).flatMap((e) =>
          e.doc === void 0 ? [] : [[e.path, e.doc]],
        ),
      ),
      pathOnWire: n.docsNative === !0,
    },
    Yr = null,
    Xr = D(n).flatMap((e) =>
      e.cap === "db" && he
        ? [{ server: e, token: () => (R.value === "" ? null : R.value) }]
        : [],
    ),
    Zr = (t) => {
      if (!o()) {
        window.removeEventListener("message", Zr);
        return;
      }
      let n = Yr;
      if (
        n === null ||
        !n.contentWindow ||
        t.source !== n.contentWindow ||
        t.origin !== e.frameOrigin
      )
        return;
      let r = t.data;
      if (
        r?.__frame_cap !== !0 ||
        typeof r.brokerGen != "number" ||
        r.brokerGen === a ||
        (t.stopImmediatePropagation(), typeof r.id != "string")
      )
        return;
      let i = "not run: the artifact was updated",
        s =
          r.cap === "user"
            ? { result: null }
            : r.cap === "db" ||
                r.cap === "docs" ||
                r.cap === "downloads" ||
                r.cap === "files" ||
                r.cap === "paste" ||
                r.cap === "reads"
              ? { error: { code: "unavailable", message: i } }
              : r.cap === "mcp"
                ? {
                    error: {
                      code: "upstream_error",
                      message: i,
                      retryable: !0,
                    },
                  }
                : { error: { code: "upstream_error", message: i } };
      n.contentWindow?.postMessage(ye(r.id, s), e.frameOrigin);
    };
  if ((window.addEventListener("message", Zr), Xr.length > 0)) {
    let t = v_({
      live: o,
      frame: () => Yr,
      frameOrigin: e.frameOrigin,
      frameUuid: e.frameUuid,
      query: tt(e),
      cpHeaders: e.cpHeaders,
      servers: Xr,
      userGranted: I !== null,
      onAuthStale: () => e.requestReboot(),
      writeOrder: ve,
      detach: () => window.removeEventListener("message", t),
      gen: a,
      report: (t, n) => e.report(t, n),
      trackCapCalled: (t, n) => e.trackCapCalled?.(t, n),
      note: e.noteCapOutcome,
      markHandled: e.markHandled,
    });
    window.addEventListener("message", t);
  }
  if (u === null) {
    let t = WA({
      live: o,
      frame: () => Yr,
      frameOrigin: e.frameOrigin,
      detach: () => window.removeEventListener("message", t),
      note: e.noteCapOutcome,
      gen: a,
    });
    window.addEventListener("message", t);
  }
  let Qr = [],
    $r = new Map(),
    ei = new Set(),
    ti = new Set(),
    q = (e, t = G.read()) =>
      $r.has(e) ? !0 : !ei.has(e) && t?.get(e)?.revoked === !0,
    ni = new Set(),
    ri = (e) =>
      (G.startsOff?.(e) === !0 || H.startsOff.has(e)) &&
      !ni.has(e) &&
      !G.read()?.get(e)?.tools.size &&
      (ht(e) || !Hu(H.rows.get(e)?.raw.consent)) &&
      !J.grantedByDecision(`mcp:${e}`),
    ii = (e) => (t) => !q(t.server, e),
    ai = (e) => (t) => {
      if (q(t.server, e)) return !1;
      let n = e?.get(t.server)?.tools;
      return t.tools.every((e) => n?.has(e) === !0);
    },
    oi = z(n.assetToken),
    si = () =>
      Object.entries(n.capabilities ?? {}).filter(
        (e) =>
          e[0] !== "permissions" &&
          e[0] !== "user" &&
          !rO.has(e[0]) &&
          !!e[1] &&
          typeof e[1] == "object",
      ),
    ci = (t) => {
      if (t === "mcp") {
        if (!u) return null;
        let e = G.read();
        return e === null ? null : !V.some((t) => q(t.server, e)) && !PO(V, e);
      }
      if (t.startsWith(zA)) {
        let e = t.slice(5);
        if (!u || !mt || !ht(e)) return null;
        let n = G.read();
        if (n === null) return null;
        if (q(e, n)) return !1;
        let r = n.get(e)?.extra,
          i = [...(Ct.get(e)?.keys() ?? [])].filter((t) => yt(e, t));
        return i.length > 0 && i.every((e) => r?.has(e) === !0);
      }
      if (t.startsWith("mcp:")) {
        if (!u) return null;
        let e = CO(t, V);
        if (e === null) {
          if (!vt(t.slice(4))) return null;
          let e = t.slice(4),
            n = G.read();
          if (n === null) return null;
          if (q(e, n)) return !1;
          let r = n.get(e)?.tools;
          if (r === void 0 || r.size === 0) return !1;
          let i = Ct.get(e);
          return i === void 0 || [...i.keys()].every((e) => r.has(e));
        }
        let n = G.read();
        if (n === null) return null;
        if (q(e.server, n)) return !1;
        let r = n.get(e.server)?.tools;
        return e.tools.every((e) => r?.has(e) === !0);
      }
      if (Hn(t)) return Gt ? zn(t) : null;
      if (t === "dictation")
        return !Qe || !Rt || !qn() ? null : qt.state?.granted === !0 && !Jn();
      if (t === "sample") {
        if (!Ke) return null;
        if (Rt) {
          let e = W.sample;
          return !gn(e) || Sn() ? null : e.granted && !e.revoked;
        }
        let n = Ol(Dl(t, e.org, oi, e.frameUuid), Al);
        return n.state === "ok" ? n.grant : null;
      }
      return null;
    },
    li = () => {
      let e = new Map();
      for (let [t, n] of si()) {
        let r = {
          optional: n.optional === !0,
          policy:
            t === "self" || t === "artifact"
              ? f
                ? "none"
                : "prompt-at-first-use"
              : Fu(t) || t === "dictation"
                ? "prompt-at-first-use"
                : iO.has(t)
                  ? "none"
                  : typeof n.policy == "string"
                    ? n.policy
                    : "prompt-at-first-use",
          hasGrant: ci(t),
        };
        if ((e.set(t, r), t === "mcp" && u !== null)) {
          for (let t of V)
            e.set(`mcp:${t.server}`, {
              optional: r.optional,
              policy: r.policy,
              hasGrant: ci(`mcp:${t.server}`),
            });
          for (let t of Nt())
            e.set(`mcp:${t}`, {
              optional: r.optional,
              policy: r.policy,
              hasGrant: ci(`mcp:${t}`),
            });
          if (mt)
            for (let t of V)
              [...(Ct.get(t.server)?.keys() ?? [])].some((e) =>
                yt(t.server, e),
              ) &&
                e.set(`${zA}${t.server}`, {
                  optional: r.optional,
                  policy: r.policy,
                  hasGrant: ci(`${zA}${t.server}`),
                });
        }
      }
      return e;
    },
    ui = (t) => {
      if (t !== "mcp" && t === "sample") {
        if (Rt) return;
        kl(Dl(t, e.org, oi, e.frameUuid), !0, Al);
      }
    },
    di = (e) =>
      (e === "mcp" && u !== null) ||
      (e === "sample" && Ke !== null) ||
      (e === "dictation" && Qe && Rt && !Jn()) ||
      (Hn(e) && Vn(e)) ||
      (u !== null && CO(e, V) !== null) ||
      (e.startsWith("mcp:") &&
        vt(e.slice(4)) &&
        !H.refused.has(e.slice(4)) &&
        !ji(e.slice(4)) &&
        Ft(e.slice(4)).length > 0) ||
      (e.startsWith(zA) &&
        ht(e.slice(5)) &&
        !ji(e.slice(5)) &&
        It(e.slice(5)).length > 0),
    fi = (e) =>
      l.value &&
      (e === "mcp" || e.startsWith("mcp:") || e.startsWith(zA)) &&
      di(e),
    pi = (e) => di(e) && !fi(e),
    mi = () => pO(e),
    hi = 0,
    gi = new Set(),
    _i = (e) => {
      if (e.some((e) => gi.has(e))) return Promise.resolve(!1);
      let t = 0,
        n = G.flush(e).then(
          () => !0,
          () => !0,
        );
      return Promise.race([
        n,
        new Promise((e) => {
          t = window.setTimeout(() => e(!1), dO);
        }),
      ]).then((r) => {
        if ((window.clearTimeout(t), !r)) {
          for (let t of e) gi.add(t);
          n.then(() => {
            for (let t of e) gi.delete(t);
          });
        }
        return r;
      });
    },
    vi = (e, t) => {
      let n = {
          servers: e.flatMap((e) => {
            let t = H.rows.get(e.server);
            if (t === void 0) return [];
            let n = t.raw;
            return [
              {
                server: e.server,
                authStatus:
                  typeof n.authStatus == "string"
                    ? n.authStatus
                    : t.status === "needs_auth"
                      ? n.neverConnected === !0 &&
                        typeof n.resolvedId == "string" &&
                        Se.test(n.resolvedId)
                        ? ""
                        : "auth_required"
                      : "authenticated",
                resolvedId: n.resolvedId,
                neverConnected: n.neverConnected,
                iconUrl: n.iconUrl,
                candidates: n.candidates,
                tools:
                  t.status === "needs_auth" ? void 0 : [...t.tools.values()],
              },
            ];
          }),
        },
        r = new Map();
      for (let e of t) {
        let t = H.rows.get(e.server);
        t !== void 0 &&
          r.set(e.server, Hk([...t.extra.values()], new Set(e.tools)) ?? []);
      }
      return { entries: ee(n), auth: Ik(n, e), extraTools: r };
    },
    yi = (e, t) => {
      if (t.entries.length === 0 && t.extraTools.size === 0) return e;
      let n = new Map([...(e?.auth.statuses ?? []), ...t.auth.statuses]);
      for (let [e, r] of t.extraTools) {
        let t = n.get(e);
        t !== void 0 && n.set(e, { ...t, tools: r });
      }
      return {
        entries: [...(e?.entries ?? []), ...t.entries],
        auth: { statuses: n, directory: e?.auth.directory ?? new Map() },
      };
    },
    bi = (n) => {
      if (!n.every(pi))
        return Promise.reject(
          t(
            Error("no dialog surface for this ask"),
            "no dialog surface for this ask",
            "literal",
          ),
        );
      if (mi())
        return Promise.reject(
          t(Error("decision surface busy"), "decision surface busy", "literal"),
        );
      if (n.includes("dictation")) {
        let r = n.filter((e) => e !== "dictation"),
          i = new Set(["dictation"]),
          a = new Set();
        return r.length > 0
          ? bi(r).then((e) => ({
              ...e,
              undecided: new Set([...(e.undecided ?? []), "dictation"]),
            }))
          : (e.markShown(),
            new Promise((n, r) => {
              YO(
                e,
                { ...Mf(), testId: "dictation-consent-dialog" },
                {
                  onAllow: () => {
                    let e = {
                      granted: a,
                      denied: a,
                      undecided: i,
                      decided: !0,
                    };
                    ir(!0).then(
                      (t) => {
                        (t || ($n = !0), n(t ? { granted: i, denied: a } : e));
                      },
                      () => {
                        (($n = !0), n(e));
                      },
                    );
                  },
                  onDeny: () => {
                    (n({ granted: a, denied: i }), ir(!1).catch(() => void 0));
                  },
                  onDismiss: () => n({ granted: a, denied: a, undecided: i }),
                  onExternalClose: () =>
                    r(
                      t(
                        Error("consent surface closed"),
                        "consent surface closed",
                        "literal",
                      ),
                    ),
                },
              );
            }));
      }
      let r = n.filter(Hn),
        i = n.filter((e) => !Hn(e));
      if (i.length === 0 && r.length > 0) {
        let n = [...new Set(r.map(Iu))],
          i = new Set(n.flatMap(Un)),
          a = new Set();
        return (
          e.markShown(),
          new Promise((r, o) => {
            YO(
              e,
              { ...kf(new Set(n)), testId: "device-consent-dialog" },
              {
                onAllow: () => {
                  cr(
                    n.filter((e) => Rn(e) !== "granted"),
                    !0,
                  ).then((e) => {
                    if (!e) {
                      r({ granted: a, denied: a, undecided: i, decided: !0 });
                      return;
                    }
                    (r({ granted: i, denied: a }), hr(!1));
                  });
                },
                onDeny: () => {
                  cr(n, !1).then((e) => {
                    (r({ granted: a, denied: i }), e && pr(n));
                  });
                },
                onDismiss: () => r({ granted: a, denied: a, undecided: i }),
                onExternalClose: () =>
                  o(
                    t(
                      Error("consent surface closed"),
                      "consent surface closed",
                      "literal",
                    ),
                  ),
              },
            );
          })
        );
      }
      let a = i.includes("mcp"),
        o = i.flatMap((e) => {
          if (!e.startsWith("mcp:") || CO(e, V) !== null) return [];
          let t = e.slice(4),
            n = vt(t) ? Ft(t) : [];
          return n.length > 0 ? [{ server: t, tools: n }] : [];
        }),
        s = new Set(o.map((e) => `mcp:${e.server}`)),
        c = i.flatMap((e) => {
          if (!e.startsWith(zA)) return [];
          let t = e.slice(5);
          if (a || i.includes(`mcp:${t}`)) return [];
          let n = ht(t) ? It(t) : [];
          return n.length > 0 ? [{ server: t, tools: n }] : [];
        }),
        l = new Set(c.map((e) => `${zA}${e.server}`)),
        u = new Set(),
        d = new Set(),
        f = (e) => c.some((t) => t.server === e),
        p = (e) =>
          e.startsWith(zA)
            ? (c.find((t) => `${zA}${t.server}` === e) ?? null)
            : (CO(e, V) ?? o.find((t) => `mcp:${t.server}` === e) ?? null),
        m = [
          ...(a ? V : V.filter((e) => i.includes(`mcp:${e.server}`))),
          ...o,
          ...c,
        ],
        h = m.length > 0,
        g = i.includes("sample") && Ke !== null;
      if (!h && !g)
        return Promise.resolve({
          granted: new Set(),
          denied: new Set(),
          quietDenied: wO(i, V),
        });
      if ((e.markShown(), !h && i.every((e) => e === "sample")))
        return new Promise((n, r) => {
          let a = kn(!0),
            o = a?.showedImages === !0;
          XO(e, [], null, {
            sampleAsk: Ke !== null,
            sampleImages: o,
            sampleToggle: a,
            networkOrigins: B ?? void 0,
            entries: Promise.resolve(null),
            pref: () => ({}),
            onContinue: (e, t, r) => {
              if (_n()) {
                n({
                  granted: new Set(),
                  denied: new Set(),
                  quietDenied: new Set(i),
                });
                return;
              }
              if (r) {
                (Nn(),
                  n({
                    granted: new Set(),
                    denied: new Set(),
                    undecided: new Set(i),
                  }));
                return;
              }
              cn(On(!0, a?.lastPress ?? null), o).then((e) =>
                n(
                  e
                    ? { granted: new Set(i), denied: new Set() }
                    : {
                        granted: new Set(),
                        denied: new Set(),
                        undecided: new Set(i),
                      },
                ),
              );
            },
            onExternalClose: () => {
              (Nn(),
                r(
                  t(
                    Error("consent surface closed"),
                    "consent surface closed",
                    "literal",
                  ),
                ));
            },
          });
        });
      let _ = !g && vn() && !Sn(),
        v = _n();
      return new Promise((n, r) => {
        let a = kn(g),
          h = a?.showedImages === !0,
          y = la("consent-prompt"),
          b = {
            ...y,
            isRevoked: (e) => (f(e) ? u.has(e) : y.isRevoked(e)),
            startsOff: (e) => !f(e) && y.startsOff(e),
            leftOff: (e) => !f(e) && y.leftOff(e),
            onToggle: (e, t) =>
              f(e)
                ? (d.add(e), t ? u.delete(e) : u.add(e), !0)
                : y.onToggle(e, t),
          },
          x = m.length > o.length || c.length > 0,
          S = vi(o, c);
        XO(e, m, na, {
          sampleAsk: g || _,
          sampleImages: h,
          sampleToggle: a,
          toggles: b,
          unlisted: new Set(o.map((e) => e.server)),
          lookedUp: () => Pi(o),
          networkOrigins: B ?? void 0,
          entries: (x
            ? Ea().then((e) => (e === null ? null : (ma(e.entries), e)))
            : Promise.resolve(null)
          ).then((e) => yi(e, S)),
          pref: pa,
          onContinue: (e, t, r, o) => {
            let c = r ? new Set() : t,
              g = (e) => c.has(e) && b.leftOff(e);
            for (let e of m)
              g(e.server) && sa(e.server, !1, "consent-prompt", "default");
            let x = aa,
              S = m.filter(
                (e) =>
                  !q(e.server, x) &&
                  !g(e.server) &&
                  c.has(e.server) &&
                  !(f(e.server) && u.has(e.server)),
              ),
              C = (e) => G.decisionSeq(e),
              w = new Map();
            for (let e of S)
              (!s.has(`mcp:${e.server}`) && !f(e.server)) ||
                (wt.delete(e.server),
                Tt.delete(e.server),
                w.set(e.server, C(e.server)));
            ha(
              r ? new Map() : e,
              S.filter((e) => !f(e.server)),
              { pressed: y.pressed, untouched: "default" },
            );
            for (let e of S)
              f(e.server) &&
                G.persistExtra?.(
                  e.server,
                  e.tools,
                  d.has(e.server) ? "explicit" : "default",
                );
            let T = V.some((e) => q(e.server, x)),
              E = (e) => !f(e.server) && J.grantedByDecision(`mcp:${e.server}`),
              D = (e) =>
                m.some(
                  (t) =>
                    t.server === e &&
                    !q(e, x) &&
                    (g(e) || (!c.has(e) && !E(t))),
                ),
              O = new Set(),
              k = new Set(),
              A = new Set(),
              j = m.filter((e) => ht(e.server)),
              M = [];
            for (let e of wO(i, V)) {
              let t = p(e);
              if (
                e === "mcp"
                  ? !T && j.some((e) => D(e.server))
                  : t !== null && D(t.server)
              ) {
                A.add(e);
                continue;
              }
              let n =
                e === "sample"
                  ? _n()
                  : e === "mcp"
                    ? T
                    : t !== null &&
                      (q(t.server, x) || (l.has(e) && u.has(t.server)));
              if (e === "sample" && r && !n && !_) {
                (A.add(e), Nn());
                continue;
              }
              if (!n && t !== null && (s.has(e) || l.has(e))) {
                M.push(t);
                continue;
              }
              (n ? k : O).add(e);
            }
            let ee = _ && _n() !== v,
              te = m.some((e) => D(e.server) && o.has(e.server)),
              N = O.has("sample")
                ? cn(On(!0, a?.lastPress ?? null), h)
                : Promise.resolve(!0);
            Promise.all([N, _i(m.map((e) => e.server))]).then(([e, t]) => {
              let r = !1;
              e || (O.delete("sample"), A.add("sample"));
              let i = G.read();
              if (G.mode === "server" && (i !== null || !t)) {
                let e = (e) => !t || !ai(i)(e);
                for (let t of Array.from(O)) {
                  let n = CO(t, V);
                  (t === "mcp" ? j.some(e) : n && e(n)) &&
                    (O.delete(t), A.add(t), (r = !0));
                }
              }
              let a = !1,
                o = (e, t) => {
                  let n = G.read(),
                    r = n?.get(e.server),
                    i = f(e.server) ? r?.extra : r?.tools;
                  return (
                    t &&
                    C(e.server) > (w.get(e.server) ?? 0) &&
                    r !== void 0 &&
                    r.revoked !== !0 &&
                    i !== void 0 &&
                    e.tools.some((e) => i.has(e)) &&
                    !q(e.server, n)
                  );
                };
              for (let e of M)
                o(e, t)
                  ? (Tt.set(e.server, new Set(e.tools)), (a = !0))
                  : (A.add(
                      f(e.server) ? `${zA}${e.server}` : `mcp:${e.server}`,
                    ),
                    (r = !0));
              n({
                granted: O,
                denied: new Set(),
                quietDenied: k,
                undecided: A,
                decided: ee || r || te || a,
              });
            });
          },
          onExternalClose: () => {
            (Nn(),
              r(
                t(
                  Error("consent surface closed"),
                  "consent surface closed",
                  "literal",
                ),
              ));
          },
        });
      });
    },
    xi = { current: null },
    J = Dh({
      caps: li,
      showDialog: bi,
      persist: ui,
      now: Date.now,
      onDecision: (e, t) => xi.current?.(e, t),
      canAsk: pi,
      onLeftOut: (t, n) => {
        t.some(fi) && DA(e, !!n?.gesture);
      },
      surfaceBusy: mi,
      busyIsNoFailure: c,
      expandAsk: (e) => {
        let t = u ? wO(e, V) : new Set(e);
        for (let n of e) if (Hn(n)) for (let e of Un(Iu(n))) t.add(e);
        return t;
      },
    });
  {
    let e = Ut.filter(Bn);
    (Qe && Jn() && e.push("dictation"),
      e.length > 0 && J.noteExternalRevoke({ cleared: [], denied: e }));
  }
  let Ci = () => [...li().keys()],
    wi = (e) => {
      for (let t of e) t.startsWith("mcp:") && At(t.slice(4));
    },
    Ti = (e) => !e.startsWith(zA),
    Ei = mt
      ? {
          ...J,
          query: (e) => (Ti(e) ? (wi([e]), J.query(e)) : "unavailable"),
          stateAll: () =>
            Object.fromEntries(
              Object.entries(J.stateAll()).filter(([e]) => Ti(e)),
            ),
          request: async (e, t) => {
            let n = e.filter(Ti);
            wi(n);
            let r = n.length > 0 ? await J.request(n, t) : {};
            return Object.fromEntries(
              e.map((e) => [e, (Ti(e) && r[e]) || "unavailable"]),
            );
          },
          requestAll: (e) => J.request(Object.keys(J.stateAll()).filter(Ti), e),
          wouldPrompt: (e, t) => {
            let n = e.filter(Ti);
            return (wi(n), n.length > 0 && J.wouldPrompt(n, t));
          },
        }
      : J,
    Di = (e) => [
      ...V.flatMap((t) => {
        if (q(t.server, e)) return [];
        if (ai(e)(t) || J.grantedByDecision(`mcp:${t.server}`))
          return [jt(t, e)];
        let n = e?.get(t.server)?.tools,
          r = n ? t.tools.filter((e) => n.has(e)) : [];
        return r.length > 0 ? [jt({ server: t.server, tools: r }, e)] : [];
      }),
      ...Pt(e),
    ],
    Oi = TO(
      a,
      () => Q,
      () => Yr,
      () => Qr,
      () => {
        if (!u) return [];
        let e = G.read() ?? new Map();
        return (
          J.grantedByDecision("mcp")
            ? [...V.map((t) => jt(t, e)), ...Pt(e)]
            : Di(e)
        ).filter((t) => !q(t.server, e));
      },
      (e, t) => ea(e, t),
    ),
    ki = new Map(),
    Ai = 0,
    ji = (e) => q(e, aa) || q(e),
    Mi = null,
    Ni = () => {
      if (Mi !== null) return Mi.then(Ni);
      let t = {};
      for (let [e, n] of Ct) {
        if (H.refused.has(e) || e.startsWith("host:")) continue;
        let r = vt(e);
        if (!r && !(mt && ht(e))) continue;
        let i = H.rows.get(e),
          a = [...n.keys()].filter(
            (t) => (r || yt(e, t)) && i?.askedTools.has(t) !== !0 && kt(e, t),
          );
        a.length !== 0 &&
          (t[e] =
            i === void 0 || i.status === "connected"
              ? a
              : [...i.askedTools, ...a]);
      }
      if (Object.keys(t).length === 0) return Promise.resolve("ok");
      let n = Je(
        e,
        "servers",
        {
          slug: e.frameUuid,
          mcpToken: na.value,
          ask: t,
          ...(ua.size > 0 && { selections: Object.fromEntries(ua) }),
        },
        ua.size > 0 ? "selections" : null,
        Ta.dropSelections,
      )
        .then((e) => {
          if (a !== Q || (!e.ok && e.status !== 400)) return "unavailable";
          let n = UA(e.ok ? JSON.parse(e.text) : null, t, ht);
          for (let [e, r] of Object.entries(t)) {
            let t = n.get(e) ?? null;
            if ((Vu(t?.raw.consent) && H.startsOff.add(e), ht(e))) {
              let n = H.rows.get(e);
              H.rows.set(e, {
                status: "connected",
                tools: new Map(),
                extra: new Map([...(n?.extra ?? []), ...(t?.extra ?? [])]),
                askedTools: new Set([...(n?.askedTools ?? []), ...r]),
                raw: t?.raw ?? n?.raw ?? {},
              });
              continue;
            }
            if (t === null) {
              (H.refused.add(e), H.rows.delete(e));
              continue;
            }
            let i = H.rows.get(e);
            H.rows.set(e, {
              ...t,
              tools: new Map([
                ...(i?.status === "connected" ? i.tools : []),
                ...t.tools,
              ]),
              askedTools: new Set([...(i?.askedTools ?? []), ...r]),
            });
          }
          return "ok";
        })
        .catch((t) => (e.markHandled(t), "unavailable"));
      return (
        (Mi = n),
        n.finally(() => {
          Mi === n && (Mi = null);
        }),
        n
      );
    },
    Pi = async (t) => {
      for (; Mi !== null;) await Mi;
      let n = {};
      for (let e of t) {
        let t = H.rows.get(e.server);
        t?.status === "needs_auth" && (n[e.server] = [...t.askedTools]);
      }
      if (Object.keys(n).length > 0) {
        let t = nt(e, na, "reauth", n)
          .then(async (e) => {
            let t = e.ok ? await e.json() : null;
            if (t === null || a !== Q) return "unavailable";
            for (let [e, r] of UA(t, n, ht))
              r !== null &&
                (Vu(r.raw.consent) && H.startsOff.add(e), H.rows.set(e, r));
            return "ok";
          })
          .catch((t) => (e.markHandled(t), "unavailable"));
        ((Mi = t), await t, Mi === t && (Mi = null));
      }
      return vi(t, []).auth.statuses;
    },
    Fi = (e, t, n) => {
      if (ji(e)) return !1;
      let r = G.read()?.get(e);
      return r === void 0 || r.revoked === !0
        ? !1
        : n
          ? r.extra?.has(t) === !0
          : r.tools.has(t);
    },
    Ii = async (e, t, n) => {
      let r = (e) => (n ? kO(e) : OO(e));
      if (H.refused.has(e)) return r("server_not_connected");
      if (!kt(e, t)) return r("tool_missing");
      if ((await Ni()) === "unavailable" || a !== Q) return "withheld";
      if (H.refused.has(e)) return r("server_not_connected");
      let i = H.rows.get(e);
      return i?.askedTools.has(t) === !0
        ? (n ? i.extra : i.tools).has(t)
          ? null
          : r("tool_missing")
        : "withheld";
    },
    Li = async (e, t, n, r, i, o) => {
      let s = r ? `${zA}${e}` : `mcp:${e}`,
        c = (e) => (r ? kO(e) : OO(e)),
        l = wt.get(e),
        u = () => Fi(e, t, r);
      if (!u()) {
        let i = await Ii(e, t, r);
        if (i !== null) return i;
        if (!n()) return "withheld";
      }
      let d = () => {
          let n = wt.get(e);
          return n !== void 0 && n !== l
            ? c(n.code)
            : Tt.get(e)?.has(t) === !0 && !u()
              ? c("tool_missing")
              : null;
        },
        f = (t) => [
          s,
          ...[...ki.keys()]
            .filter((t) => t !== e)
            .flatMap((e) => {
              let n = `mcp:${e}`;
              return ht(e)
                ? J.query(n) !== "granted" && !J.wouldPrompt([n], t)
                  ? []
                  : [n, `${zA}${e}`]
                : [n];
            })
            .filter((e) => J.wouldPrompt([e], t)),
        ],
        p = yO(i, o);
      if (!u() && !J.wouldPrompt([s], { gesture: p, readAt: o }) && mi())
        return "withheld";
      for (let t = 0; !u(); t += 1) {
        if (a !== Q) return "withheld";
        let r = d();
        if (r !== null) return r;
        if (t > 0) {
          if (J.query(s) === "denied") return "denied";
          if (t > V.length + LA || !J.wouldPrompt([s]) || !n())
            return "withheld";
        }
        let i = { gesture: t === 0 && p, readAt: o },
          c = await J.request(f(i), i);
        if (u()) break;
        if (c[s] === "denied" || ji(e)) return "denied";
      }
      let m = await _i([e]);
      if (a !== Q) return "withheld";
      let h = d();
      return h === null
        ? ji(e)
          ? "denied"
          : !m || !u()
            ? "withheld"
            : (Oi(),
              Qr.find((t) => t.server === e)?.tools.includes(t) === !0
                ? "granted"
                : "withheld")
        : h;
    },
    Ri = async (e, t, n, r) => {
      let i = `mcp:${e}`;
      mt && !J.grantedByDecision(i) && (await Ni());
      let o = yO(n, r),
        s = (t) => [
          i,
          ...[...ki.keys()]
            .filter((t) => t !== e)
            .map((e) => `mcp:${e}`)
            .filter((e) => J.wouldPrompt([e], t)),
        ];
      if (
        !J.grantedByDecision(i) &&
        !J.wouldPrompt([i], { gesture: o, readAt: r }) &&
        mi()
      )
        return "withheld";
      for (let e = 0; !J.grantedByDecision(i); e += 1) {
        if (a !== Q) return "withheld";
        if (e > 0) {
          if (J.query(i) === "denied") return "denied";
          if (e > V.length || !J.wouldPrompt([i]) || !t()) return "withheld";
        }
        let n = { gesture: e === 0 && o, readAt: r },
          c = await J.request(s(n), n);
        if (J.grantedByDecision(i)) break;
        if (c[i] === "denied") return "denied";
      }
      let c = await _i([e]);
      if (a !== Q) return "withheld";
      if (ji(e)) return "denied";
      if (!c || !J.grantedByDecision(i)) return "withheld";
      Oi();
      let l = V.find((t) => t.server === e),
        u = Qr.find((t) => t.server === e)?.tools;
      return l !== void 0 && u !== void 0 && l.tools.every((e) => u.includes(e))
        ? "granted"
        : "withheld";
    },
    zi = (e, t, n) =>
      V.some((n) => n.server === e && n.tools.includes(t))
        ? ji(e)
          ? "revoked"
          : !rf(e) && fi(`mcp:${e}`)
            ? "org_off"
            : "ask"
        : yt(e, t)
          ? ji(e)
            ? "revoked"
            : n(e)
              ? "ask"
              : "refused"
          : !vt(e) || !IA.test(t)
            ? "undeclared"
            : H.refused.has(e) || !At(e, n)
              ? "refused"
              : ji(e)
                ? "revoked"
                : "ask",
    Bi = d
      ? {
          classify: (e, t) => zi(e, t, Ot),
          peek: (e, t) => zi(e, t, Dt),
          noteOrgOff: (t) => DA(e, !!t),
          hold: (e, t) => {
            if (Ai >= uO) return !1;
            ((Ai += 1), ki.set(e, (ki.get(e) ?? 0) + 1));
            let n = Ct.get(e) ?? new Map();
            return (n.set(t, (n.get(t) ?? 0) + 1), Ct.set(e, n), !0);
          },
          release: (e, t) => {
            --Ai;
            let n = (ki.get(e) ?? 1) - 1;
            n > 0 ? ki.set(e, n) : ki.delete(e);
            let r = Ct.get(e),
              i = (r?.get(t) ?? 1) - 1;
            (i > 0 ? r?.set(t, i) : r?.delete(t),
              r?.size === 0 && Ct.delete(e));
          },
          schedule: mt
            ? (e) => {
                window.setTimeout(e, 0);
              }
            : null,
          wouldPrompt: (e, t, n) =>
            vt(e) || yt(e, t)
              ? !H.refused.has(e)
              : J.wouldPrompt([`mcp:${e}`], { gesture: n }),
          decide: async (e, t, n, r) => {
            let i = `mcp:${e}`,
              a = Date.now();
            if (J.query(i) === "denied") return "denied";
            if (vt(e)) return Li(e, t, n, !1, r, a);
            if (yt(e, t)) {
              if (!Fi(e, t, !0)) {
                let n = await Ii(e, t, !0);
                if (n !== null) return n;
              }
              let o = r;
              if (!J.grantedByDecision(i)) {
                let t = await Ri(e, n, r, a);
                if (t !== "granted") return t;
                o = !1;
              }
              return Li(e, t, n, !0, o, a);
            }
            return Ri(e, n, r, a);
          },
          pending: () =>
            V.filter((e) => {
              if (ji(e.server)) return !1;
              let t = J.query(`mcp:${e.server}`);
              return t === "prompt" || t === "granted";
            }),
          track: (t) => e.trackCapCalled?.("mcp", t),
          viewerNoCode: M(n) ? "not_granted" : "not_in_manifest",
          live: null,
        }
      : null,
    Vi = new Map(),
    Hi = { current: null },
    Ui = new Map(),
    Wi = { listedEmpty: new Set(), spent: new Set() },
    Gi = ex(),
    Ki = new Map(),
    qi =
      Qe && Rt
        ? new If({
            organizationId: e.org,
            showStrip: (t) =>
              e
                .chrome()
                ?.showDictationStrip?.({
                  onStop: t,
                  newLook: e.dictationNewLook?.() === !0,
                }) ?? null,
            open: async (n) => {
              let r = await e.loadDictation?.();
              if (!r)
                throw (
                  e.report("dictation", "chunk-load"),
                  t(
                    Error("dictation chunk unavailable"),
                    "dictation chunk unavailable",
                    "literal",
                  )
                );
              return r.openDictation(n);
            },
            report: (t, n) => e.report(t, n),
          })
        : null;
  iT = qi;
  let Ji =
    st && Rt
      ? new Av({
          organizationId: e.org,
          viewer: Jt,
          showStrip: (t) => {
            let n = e.chrome()?.showReadAloudStrip?.(t) ?? null;
            if (n === null) return null;
            let r = new MutationObserver(() => {
              mO(e) && HO();
            });
            return (
              r.observe(document.documentElement, {
                childList: !0,
                subtree: !0,
                attributes: !0,
                attributeFilter: [
                  "data-frame-decision-surface",
                  "data-frame-inert-claim",
                  "data-rename-input",
                ],
              }),
              {
                close: (e) => {
                  (r.disconnect(), n.close(e));
                },
                update: (e) => n.update?.(e),
              }
            );
          },
          turnOff: () => void $t.write(!1).catch(() => void 0),
          load: async () => (await e.loadReadaloud?.()) ?? null,
          report: (t, n) => e.report(t, n),
        })
      : null;
  ((aT = Ji),
    (oT =
      Ji === null
        ? null
        : {
            consentSlot: U,
            follow(e, t) {
              let n = t && we(e) && e.mode !== "external";
              if (!n && or) {
                or = !1;
                try {
                  Ji.end("unavailable");
                } catch {}
              }
              let r = t ? Ku(e.consent)?.readaloud : void 0;
              if (r && !$t.revoked()) {
                let e = r.revoked || (n && !r.granted),
                  t = r.decisionSeq >= ($t.state()?.decisionSeq ?? 0);
                e && t && $t.denyHere(r.decisionSeq);
              }
              n && (or = !0);
            },
          }),
    sT.listen(
      e.frameUuid,
      Ji
        ? (e, t) => {
            e === Jt && o() && $t.denyHere(t);
          }
        : null,
    ),
    JT(
      e.frameUuid,
      qi
        ? (e, t) => {
            e === Jt && o() && Zn(t);
          }
        : null,
    ));
  let Yi = QD(),
    Xi = { tail: Promise.resolve() },
    Zi = { stop: null, holds: 0 },
    Qi = { stop: null, holds: 0 },
    $i = { stop: null, holds: 0 },
    ea = (t, r) => {
      ((Yr = t), (Qr = r), XT?.slot.gen === a && (XT.frame = t));
      let i = r.filter((e) => !PC(e.server)),
        s = u !== null,
        c = [];
      try {
        (s || Ow?.refresh([]),
          s &&
            c.push(
              jO(
                e,
                t,
                na,
                i,
                ua,
                Ta,
                o,
                Vi,
                Bi,
                Vt,
                Wi,
                Ui,
                (e, t) =>
                  Qr.find((t) => t.server === e)?.tools.includes(t) === !0,
                Hi,
              ),
            ));
        let r =
          n.assetToken !== "" &&
          (n.perm?.role === "owner" || n.perm?.role === "writer");
        (f
          ? c.push(CD(e, t, ra, Jr, !s, o, Xi))
          : Kr
            ? (c.push(wD(e, t, qr, o, je(n), Bt)),
              je(n) && r && c.push(SD(e, t, o)))
            : r && c.push(SD(e, t, o)),
          (f || Kr) && (($i.stop ??= El(e, t, _, v, y, o)), c.push(TD($i))),
          he
            ? c.push(
                ED(
                  e,
                  t,
                  R,
                  n.capabilities?.db?.config,
                  o,
                  "tokened",
                  Xr.length > 0 ? ve : void 0,
                  Zi,
                ),
              )
            : L && c.push(ED(e, t, R, L.config, o, "public", void 0, Zi)),
          xe &&
            c.push(
              zy(
                {
                  parseCap: _e,
                  sync: Ne,
                  local: Fe,
                  claude: _u({
                    frameUuid: e.frameUuid,
                    target: () => {
                      let e = nu(),
                        t = e ? "pane" : "none";
                      try {
                        let n = Bt()?.roomSendTarget?.(e) ?? t;
                        return n === "pane" && !e ? "none" : n;
                      } catch {
                        return t;
                      }
                    },
                    paneHoldsSends: ru,
                    targetSettled: async () => {
                      if (nu()) return "pane";
                      let t = await e.chromeReady(),
                        n = Date.now() + Ed;
                      for (;;) {
                        let e;
                        try {
                          e = t && o() ? Bt()?.roomSendTarget?.(!1) : null;
                        } catch {
                          return "none";
                        }
                        if (e !== null || Date.now() >= n)
                          return e == null || e === "pane" ? "none" : e;
                        await new Promise((e) => setTimeout(e, 100));
                      }
                    },
                    deliverToClaude: (e, t) => {
                      try {
                        return Bt()?.roomSendToClaude?.(e, t) ?? null;
                      } catch {
                        return null;
                      }
                    },
                    stageOpensChat: () => {
                      try {
                        return Bt()?.roomStageOpensChat?.() === !0;
                      } catch {
                        return !1;
                      }
                    },
                    sendOpensChat: () => n.roomSendOpensChat === !0,
                    stageToChat: (e) => {
                      try {
                        return Bt()?.roomStageToChat?.(e) === !0;
                      } catch {
                        return !1;
                      }
                    },
                    ownPresence: () =>
                      n.presenceViewEnabled === !0 ? kC() : null,
                    decisionSurfaceOpen: () => pO(e),
                    summonWindow: Ie,
                    report: (n) => {
                      o() && t.isConnected && e.report("context-card", n);
                    },
                    trackRefused: (n) => {
                      o() && t.isConnected && e.trackCapCalled?.("room", n);
                    },
                    messagesStanding: () => (Vr() && zt() ? jr() : null),
                    askMessages: Br,
                    sendUnasked: Hr,
                    live: () => o() && t.isConnected && zt(),
                  }),
                  slug: e.frameUuid,
                  account: n.viewer?.account ?? null,
                  viewerId:
                    typeof n.viewer?.id == "string" ? n.viewer.id : null,
                  userWired: I !== null,
                  guest: n.mode === "external",
                  writer: n.viewer?.can_edit === !0,
                  receiveOnly: () => De.value,
                  config: xe.config,
                  grant: () => Ce.value,
                  frameOrigin: e.frameOrigin,
                  report: (n) => {
                    o() && t.isConnected && e.report("room-send", n);
                  },
                  reportRealtime: (n) => {
                    o() && t.isConnected && e.report("room-realtime", n);
                  },
                  presence: EC(e.frameUuid).lease(),
                  follow: {
                    lane: (t, n) =>
                      void e.chromeReady().then(() => {
                        try {
                          (n ? Bt() : e.chrome())?.followLane?.(t, n);
                        } catch {}
                      }),
                  },
                },
                t,
                o,
              ),
            ),
          Re && c.push(tO(e, t, ze, o, Yi)),
          He && c.push(OD(e, t, Ue, o, Qi)),
          We && c.push(Sh(e, t, Ge, o, et, Ki)),
          Ke &&
            c.push(
              tx(
                e,
                t,
                Ye,
                {
                  gesture: (t) => SO(e, t).gesture,
                  wouldPrompt: (e) => J.wouldPrompt(["sample"], { gesture: e }),
                  refused: (e) => {
                    let t = W.sample;
                    if (
                      t !== null &&
                      t.decisionSeq === 0 &&
                      t.defaultGranted === !0
                    )
                      return (
                        (W.sample = {
                          decisionSeq: 0,
                          granted: !1,
                          revoked: !1,
                          ...(t.imagesGranted !== void 0 && {
                            imagesGranted: !1,
                          }),
                        }),
                        !1
                      );
                    let n =
                      e &&
                      yn &&
                      bn() &&
                      gn(t) &&
                      t.granted &&
                      !t.revoked &&
                      !_n();
                    return (
                      n &&
                        !hn &&
                        ((hn = !0),
                        (W.sample = { ...t, imagesGranted: !1, disclosure: 0 }),
                        J.noteExternalRevoke({
                          cleared: ["sample"],
                          denied: [],
                        })),
                      n
                    );
                  },
                  decide: (e, t) =>
                    J.grantedByDecision("sample")
                      ? Promise.resolve("granted")
                      : J.request(["sample"], { gesture: e, readAt: t }).then(
                          (e) =>
                            J.grantedByDecision("sample")
                              ? "granted"
                              : e.sample === "denied"
                                ? "denied"
                                : "withheld",
                        ),
                },
                { reply: Xy, hold: $y, slack: qe },
                o,
                Ew,
                xb(Ke.config),
                Gi,
                Cb(Ke.config),
                Sb(Ke.config),
              ),
            ),
          x &&
            c.push(
              Kd(
                e,
                t,
                S,
                U,
                ie,
                !s && !f ? (t) => at(e, t) : null,
                o,
                () => pO(e),
                b !== null,
                n.commentsPageSummon === !0,
                n.commentPresence === !0,
                NA,
                Le,
                n.commentPathUnreadableEnabled === !0 &&
                  n.capabilities?.comments?.config?.customAnchors === !0,
                n.commentClientIds === !0,
              ),
            ),
          Gr && c.push(Qm(e, t, !s && !f && !x ? (t) => at(e, t) : null, o)),
          I &&
            c.push(
              ol(
                e,
                t,
                I.viewer,
                pe,
                me,
                !s && !f && !x && !Gr ? (t) => at(e, t) : null,
                o,
              ),
            ),
          Ze &&
            c.push(
              Kh(e, t, {
                slot: ct,
                ctl: en,
                ask: an,
                save: (n, r) => th(e, t, n, r),
                saveRefusal: (n) => eh(e, t, n),
                gen: tn,
                brokerLive: o,
                safeTimeout: et,
              }),
            ),
          qi &&
            c.push(
              Jf(e.frameOrigin, t, {
                gen: qi,
                brokerLive: o,
                gesture: (t) => {
                  let n = SO(e, t);
                  return {
                    attested: n.attested && Be(t) !== void 0,
                    gesture: n.gesture,
                    readAt: Date.now(),
                  };
                },
                decide: async (e, t) => {
                  let n = "dictation",
                    r = () => {
                      try {
                        Ji?.end("interrupted");
                      } catch {}
                      return "granted";
                    };
                  if (J.grantedByDecision(n)) return r();
                  if (J.query(n) === "denied") return "denied";
                  if (!J.wouldPrompt([n], { gesture: e, readAt: t }))
                    return "unasked";
                  $n = !1;
                  let i = await J.request([n], { gesture: e, readAt: t });
                  return J.grantedByDecision(n)
                    ? r()
                    : i[n] === "denied"
                      ? "denied"
                      : $n
                        ? "unsaved"
                        : "withheld";
                },
              }),
            ),
          (rt =
            $e &&
            t.hasAttribute("sandbox") &&
            !t.sandbox.contains("allow-pointer-lock")),
          rt &&
            c.push(
              U_(e.frameOrigin, t, {
                frameUuid: e.frameUuid,
                brokerLive: o,
                activated: (e) => re("strict", Be(e)),
                surfaceBusy: () => pO(e),
                ask: (t) => ({
                  close: YO(
                    e,
                    {
                      title: b_,
                      description: x_,
                      testId: "paste-dialog",
                      allowLabel: S_,
                      denyLabel: C_,
                      strictArming: !0,
                    },
                    {
                      onAllowPress: () => t.onPaste(),
                      onDeny: () => t.onCancel(),
                      onDismiss: () => t.onCancel(),
                      onExternalClose: (e) => t.onGone(e),
                    },
                  ),
                }),
                report: (t, n) => e.report(t, n),
                track: (t) => e.trackCapCalled?.("paste", t),
              }),
            ),
          Ji &&
            c.push(
              Iv(e.frameOrigin, t, {
                gen: Ji,
                viewer: Jt,
                brokerLive: o,
                activation: Be,
                decide: () => {
                  let e = $t.state();
                  return Promise.resolve(
                    e === null || !$t.served() || !or
                      ? "unavailable"
                      : e.granted && !$t.revoked()
                        ? "granted"
                        : "denied",
                  );
                },
                dictating: () =>
                  (qi !== null && qi.current() !== "idle") || mO(e),
                voices: e.readaloudVoices ?? (it === "" ? [] : [it]),
              }),
            ),
          lt &&
            c.push(
              Qv(e, t, {
                slot: ut,
                aliases: dt,
                ver: t.dataset.ver ?? (e.rebuild === !0 ? void 0 : n.ver),
                brokerLive: o,
                safeTimeout: et,
              }),
            ));
        let l = new Map();
        for (let [e, t] of Object.entries(n.capabilities ?? {})) {
          if (
            !t ||
            typeof t != "object" ||
            rO.has(e) ||
            oO.has(e) ||
            t.optional === !0
          )
            continue;
          let n =
            typeof t.policy == "string" ? t.policy : "prompt-at-first-use";
          n === "none"
            ? l.set(e, "no_prompt")
            : n !== "per-use-confirm" && l.set(e, "decide");
        }
        (l.delete("tts"),
          Ji && l.set("tts", "no_prompt"),
          s && !Bi ? l.set("mcp", "granted") : l.delete("mcp"));
        for (let e of ["self", "artifact"])
          f ? l.set(e, "granted") : Kr ? l.set(e, "denied") : l.delete(e);
        (l.set("permissions", "no_prompt"),
          c.push(sO(e, t, l, (e) => J.query(e), xi, o)),
          c.push(DO(e, t, Ei, Ci, Oi, !s && !f && !x && !Gr && !I, o)),
          e.setUnwire(
            (e) => {
              for (let t of c) t(e);
            },
            xe && Ne !== null && !De.value ? t : void 0,
          ));
        let u = e.rebuild === !0 || qA.has(t);
        qA.set(t, a);
        let d = [
            s && "mcp",
            f && KA(n),
            Kr && KA(n),
            (he ?? L) && "db",
            xe && "room",
            Re && "assets",
            He && "docs",
            We && "endpoints",
            Ke && "sample",
            x && "comments",
            Gr && "downloads",
            I && "user",
            Ze && "files",
            lt && "reads",
            qi && "dictation",
            rt && "paste",
            Ji && "tts",
          ].filter((e) => typeof e == "string"),
          p = [...(GA.get(t) ?? []), ...($e && !rt ? ["paste"] : [])];
        GA.set(t, [...new Set([...p, ...d])]);
        let m = ["artifact", "self"],
          h = d.some((e) => m.includes(e)),
          g = p.filter(
            (e) => !d.includes(e) && e !== "mcp" && !(h && m.includes(e)),
          );
        if (g.length > 0) {
          let n = (n) => {
            if (
              !o() ||
              !t.contentWindow ||
              n.source !== t.contentWindow ||
              n.origin !== e.frameOrigin
            )
              return;
            let r = n.data;
            r?.__frame_cap === !0 &&
              typeof r.id == "string" &&
              (typeof r.cap != "string" ||
                !g.includes(r.cap) ||
                t.contentWindow?.postMessage(
                  ye(r.id, {
                    error: {
                      code: "not_granted",
                      message: "the version this view runs does not declare it",
                    },
                  }),
                  e.frameOrigin,
                ));
          };
          (window.addEventListener("message", n),
            c.push(() => window.removeEventListener("message", n)));
        }
        u &&
          t.contentWindow?.postMessage(
            { __frame_cap_rewired: !0, caps: d, brokerGen: a },
            e.frameOrigin,
          );
      } catch {
        for (let e of c) e();
        (e.setBrokered?.(!1),
          e.setUnwire(null),
          e.report("broker-consent-error"));
      }
    };
  if (!u && !f) {
    ((Mw = null),
      (Ww = null),
      (Fw = null),
      (XT = null),
      !b && !Ke && !Xe && !Gt && !qi && !Ji && !xr && (Iw = null),
      (Rw = null));
    let t = Ke !== null && Rt;
    if (
      ((t ||
        B !== null ||
        (Xe && Rt) ||
        dt.length > 0 ||
        Gt ||
        qi !== null ||
        Ji !== null ||
        xr) &&
        (Yw = (n) => {
          if (a !== Q || !zt() || pO(e)) return !1;
          let r = on(),
            i = ar(),
            o = sr();
          if (
            !t &&
            B === null &&
            r === null &&
            !ft() &&
            !Gt &&
            i === null &&
            o === null &&
            !Vr()
          )
            return !1;
          let s = Mn(!1, n !== void 0),
            c = Gt ? br() : void 0;
          return (
            c &&
              (c.end = () => {
                (s.commit(!0), r?.commit(), GO?.());
              }),
            Yr?.isConnected === !0 && e.markShown(),
            XO(e, [], null, {
              manage: !0,
              sampleAsk: t,
              sampleImages: s.sampleImages,
              sampleToggle: t ? s.sampleToggle : void 0,
              filesAsk: r ? "" : void 0,
              filesToggle: r?.toggle,
              dictationToggle: i ?? void 0,
              readaloudToggle: o ?? void 0,
              deviceToggles: c,
              messagesToggle: Vr() ? Wr() : void 0,
              networkOrigins: B ?? void 0,
              readSources: ft() ? pt : void 0,
              entries: Promise.resolve(null),
              pref: () => ({}),
              onContinue: (e, t, i) => {
                (s.commit(i === !0), r?.commit(), c?.settle(), n?.());
              },
              onExternalClose: () => {
                (Nn(), c?.settle(), n?.());
              },
            }),
            !0
          );
        }),
      !Gr && !I)
    ) {
      (ea(e.mount(n), []),
        !he &&
          !L &&
          !Ne &&
          !Ke &&
          !x &&
          !Re &&
          !He &&
          !We &&
          !Ze &&
          !lt &&
          !qi &&
          !$e &&
          !Ji &&
          B === null &&
          nO(n) &&
          e.setBrokered?.(!1));
      return;
    }
    ea(e.mount(n), []);
    return;
  }
  let ta = V,
    na = {
      value: u?.token ?? "",
      org: e.org,
      account: z(n.assetToken),
      gen: a,
    };
  ((Mw = u ? na : null),
    (Ww = u ? l : null),
    u && (Nw = { org: na.org, account: na.account }));
  let ra = {
    value: f?.token ?? "",
    org: e.org,
    account: z(n.assetToken),
    gen: a,
  };
  ((Fw = f ? ra : null),
    (XT = f ? { h: e, slot: ra, store: G, state: Jr } : null));
  let ia = G.read();
  ia === null && V.length > 0 && e.report("broker-consent-error");
  let aa = ia ?? new Map(),
    oa = (t, n, r, i) => {
      let a = Et(t, G.read());
      return n
        ? ($r.delete(t),
          ei.add(t),
          G.read()?.get(t)?.revoked === !0 &&
            !G.setRevoked(t, !1).durable &&
            e.report("broker-consent-error"),
          J.noteExternalRevoke({ cleared: [`mcp:${t}`], denied: [] }),
          Oi(),
          e.report(r, "regrant"),
          !0)
        : (ei.delete(t),
          $r.set(t, Qr.find((e) => e.server === t) ?? null),
          (a || i !== void 0) &&
            !G.setRevoked(t, !0, i).durable &&
            e.report("broker-consent-error"),
          J.noteExternalRevoke({ cleared: [], denied: [`mcp:${t}`] }),
          Yr?.isConnected === !0 &&
            Qr.some((e) => e.server === t) &&
            ea(
              Yr,
              Qr.filter((e) => e.server !== t),
            ),
          e.report(r, "revoke"),
          !0);
    },
    sa = (t, n, r, i) => {
      if (a !== Q) return !1;
      let o = V.find((e) => e.server === t);
      if (!u) return !1;
      if (o === void 0)
        return vt(t) && (H.rows.has(t) || Et(t, G.read())) && oa(t, n, r, i);
      if (!n)
        (ti.add(t),
          ei.delete(t),
          $r.set(t, Qr.find((e) => e.server === t) ?? null),
          G.setRevoked(t, !0, i).durable || e.report("broker-consent-error"),
          J.noteExternalRevoke({ cleared: [], denied: [`mcp:${t}`, "mcp"] }),
          Yr?.isConnected === !0 &&
            Qr.some((e) => e.server === t) &&
            ea(
              Yr,
              Qr.filter((e) => e.server !== t),
            ),
          e.report(r, "revoke"));
      else {
        let n = $r.get(t) ?? null;
        ($r.delete(t), ei.add(t));
        let i = G.setRevoked(t, !1);
        i.durable || e.report("broker-consent-error");
        let a = i.restored ?? [],
          s = n !== null && !o.tools.every((e) => a.includes(e)) ? n.tools : a;
        (o.tools.every((e) => s.includes(e)) &&
          (J.noteExternalGrant([`mcp:${t}`]),
          Yr?.isConnected === !0 &&
            !Qr.some((e) => e.server === t) &&
            ea(Yr, [...Qr, jt(o, G.read())])),
          V.some((e) => q(e.server, aa)) ||
            J.noteExternalRevoke({ cleared: ["mcp"], denied: [] }),
          e.report(r, "regrant"));
      }
      return !0;
    },
    la = (e) => {
      let t = new Set(),
        n = new Set();
      return {
        isRevoked: (e) => q(e, aa),
        startsOff: (e) => {
          let r = !t.has(e) && !q(e, aa) && ri(e);
          return (r ? n.add(e) : n.delete(e), r);
        },
        leftOff: (e) => n.has(e) && !t.has(e),
        onToggle: (n, r) => {
          let i = !r && ri(n) ? "explicit" : void 0,
            a = sa(n, r, e, i);
          return (a && t.add(n), a);
        },
        pressed: t,
      };
    },
    ua = new Map(),
    da = new Map();
  for (let [e, t] of aa)
    (t.selectedId !== void 0 && ua.set(e, t.selectedId),
      t.resolvedId !== void 0 && da.set(e, t.resolvedId));
  let fa = new Map(),
    pa = (e, t = G.read()) => {
      let n = {},
        r = fa.get(e),
        i = t?.get(e)?.selectedId,
        a = r ?? i;
      (a !== void 0 && (n.selectedId = a),
        i !== void 0 && i !== a && (n.storeSelectedId = i));
      let o = da.get(e);
      return (o !== void 0 && (n.resolvedId = o), n);
    },
    ma = (e) => {
      if (a !== Q) return [];
      let t = [],
        n = new Map(),
        r;
      for (let i of e)
        if (i.resolvedId !== void 0)
          da.get(i.server) !== i.resolvedId &&
            (n.set(i.server, i.resolvedId), da.set(i.server, i.resolvedId));
        else if (i.candidates.length === 1) {
          let e = i.candidates[0].id,
            n = !1;
          if (Rt) {
            r === void 0 && (r = G.read());
            let t = pa(i.server, r);
            n =
              t.selectedId !== void 0 &&
              t.selectedId !== e &&
              t.storeSelectedId !== e;
          }
          n ? t.push(i) : ua.get(i.server) !== e && ua.set(i.server, e);
        } else if (i.candidates.length >= 2) {
          let e = (e) => e !== void 0 && i.candidates.some((t) => t.id === e);
          r === void 0 && (r = G.read());
          let n = pa(i.server, r),
            a = e(n.selectedId) ? n.selectedId : n.storeSelectedId;
          (e(a)
            ? ua.get(i.server) !== a && ua.set(i.server, a)
            : ua.delete(i.server),
            t.push(i));
        }
      return (
        n.size > 0 &&
          G.updateIds((e) => {
            for (let [t, r] of n) {
              let n = e.get(t);
              n && (n.resolvedId = r);
            }
          }),
        t
      );
    },
    ha = (e, t = ta, n) => {
      for (let [t, n] of e) (ua.set(t, n), fa.set(t, n));
      G.persist(t, e, da, n);
    },
    ga = null,
    _a = 0,
    va = 0,
    ya = 0,
    ba = !1,
    xa = 0,
    Sa = 0,
    Ca = Fg(),
    wa = (t = !1, n) => {
      if ($k !== null) return;
      let r = Fg();
      if (
        (r !== Ca &&
          ((Ca = r),
          (_a = 0),
          (va = 0),
          (ya = 0),
          (ba = !1),
          (xa = 0),
          (Sa = 0)),
        t)
      ) {
        if (ya >= dk) return;
        ya++;
      } else if (n !== void 0) {
        if (Date.now() - xa < 5e3 || Sa >= 4) return;
        (Sa++, (xa = Date.now()), hk.add(n));
      } else {
        if (Date.now() - _a < 5e3 || va >= 4) return;
        (va++, (_a = Date.now()));
      }
      (e.report("reauth-prompt", "reauth"),
        Qk(
          e,
          na,
          Qr.filter((e) => !PC(e.server) && !q(e.server, aa)),
          la("reauth-prompt"),
          () => {
            if ((e.report("reauth-prompt", "reauth-retry"), n !== void 0)) {
              a === Q && r === Fg() && hk.delete(n);
              return;
            }
            r === Fg() &&
              (ba ||
                ((ba = !0),
                window.setTimeout(() => {
                  r === Fg() && ((ba = !1), a === Q && wa(!0));
                }, sk)));
          },
          n,
        ));
    };
  hA = () => {
    a === Q && wa();
  };
  let Ta = {
    dropSelections: (t, n) => {
      if (a !== Q) return;
      let r = new Map();
      if (t !== void 0) typeof n == "string" && r.set(t, n);
      else if (n && typeof n == "object")
        for (let [e, t] of Object.entries(n))
          typeof t == "string" && r.set(e, t);
      if (r.size === 0) return;
      let i = !1;
      for (let [e, t] of r)
        (ua.get(e) === t && (ua.delete(e), (i = !0)),
          fa.get(e) === t && (fa.delete(e), (i = !0)));
      let o = [];
      (G.updateIds((e) => {
        for (let [t, n] of r) {
          let r = e.get(t);
          r && r.selectedId === n && (delete r.selectedId, (i = !0), o.push(t));
        }
      }),
        G.clearSelection(o),
        i && e.report("broker-selection-drop"));
    },
    postServers: () => {
      let t = { slug: e.frameUuid, mcpToken: na.value },
        n = ua.size > 0;
      if ((n && (t.selections = Object.fromEntries(ua)), !n && ga !== null))
        return ga;
      let r = Je(e, "servers", t, n ? "selections" : null, Ta.dropSelections);
      return (
        n ||
          ((ga = r),
          r
            .finally(() => {
              ga === r && (ga = null);
            })
            .catch(() => void 0)),
        r
      );
    },
    onEntries: (e) => {
      ma(e);
    },
    onSelectionRequired: () => {
      Aa();
    },
    onBlockedCall: (t) => {
      a === Q && EA(e, ua.get(t) ?? da.get(t));
    },
    onAuthLapsedCall: (e, t, n, r) => {
      if (t !== "server_not_connected") {
        if ((s || r === !0) && t === "needs_reauth" && !rf(e) && n !== !1) {
          let t = Date.now(),
            n = gk.get(e);
          if (!n) {
            n = { at: t };
            let r = bk.get(e);
            (r !== void 0 && t - r < 6e4 && (n.pressedAt = r), gk.set(e, n));
          }
          let r = n.pressedAt;
          if (r === void 0 || t - r >= 6e4) n.at = t;
          else {
            if ($k === null && !n.graceArmed) {
              n.graceArmed = !0;
              let i = Fg();
              window.setTimeout(
                () => {
                  a === Q &&
                    i === Fg() &&
                    gk.get(e) === n &&
                    n.pressedAt === r &&
                    (delete n.graceArmed, (n.at = Date.now()), wa());
                },
                r + vk - t,
              );
            }
            return;
          }
        }
        wa();
        return;
      }
      rf(e) || hk.has(e) || wa(!1, e);
    },
  };
  Rt &&
    ((Pn.kickRefresh = () => {
      a === Q && Ea();
    }),
    (Pn.reseedConsent = () => {
      a !== Q ||
        !e.requestConsentReboot ||
        e.requestConsentReboot().then((e) => {
          if (
            e === null ||
            a !== Q ||
            e.org !== U.org ||
            z(e.assetToken) !== U.account
          )
            return;
          typeof e.consentToken == "string" &&
            e.consentToken !== "" &&
            (U.value = e.consentToken);
          let t = Ku(e.consent);
          t !== null && G.refresh(t);
        });
    }));
  let Ea = () =>
    Ta.postServers()
      .then((e) => {
        if (!e.ok) return null;
        let t = JSON.parse(e.text),
          n = MC(t);
        return (n && G.refresh(n), { entries: ee(t), auth: yk(Ik(t, V)) });
      })
      .catch((t) => (e.markHandled(t), null));
  Yw = (t) => {
    if (a !== Q || !zt() || pO(e)) return !1;
    let n = Ke !== null && Rt,
      r = G.read(),
      i = Mt(r),
      o = V.map((e) => jt(e, r)),
      s = on(),
      c = ar(),
      l = sr();
    if (
      V.length === 0 &&
      i.length === 0 &&
      !n &&
      B === null &&
      s === null &&
      !ft() &&
      !Gt &&
      c === null &&
      l === null &&
      !Vr()
    )
      return !1;
    let u = Mn(!0, t !== void 0),
      d = Gt ? br() : void 0;
    return (
      d &&
        (d.end = () => {
          (u.commit(!0), s?.commit(), GO?.());
        }),
      Yr?.isConnected === !0 && e.markShown(),
      XO(e, i.length > 0 ? [...o, ...i] : o, V.length > 0 ? na : null, {
        manage: !0,
        ...(i.length > 0 && { unlisted: new Set(i.map((e) => e.server)) }),
        sampleAsk: n,
        sampleImages: u.sampleImages,
        sampleToggle: u.sampleToggle,
        filesAsk: s ? "" : void 0,
        filesToggle: s?.toggle,
        dictationToggle: c ?? void 0,
        readaloudToggle: l ?? void 0,
        toggles: u.toggles,
        deviceToggles: d,
        messagesToggle: Vr() ? Wr() : void 0,
        networkOrigins: B ?? void 0,
        readSources: ft() ? pt : void 0,
        entries:
          V.length > 0
            ? Ea().then((e) => (e === null ? null : (ma(e.entries), e)))
            : Promise.resolve(null),
        pref: pa,
        onContinue: (e, n, r) => {
          (u.commit(r === !0), s?.commit(), d?.settle(), t?.());
        },
        onExternalClose: () => {
          (Nn(), d?.settle(), t?.());
        },
      }),
      !0
    );
  };
  let Da = !1,
    Oa = !1,
    ka = 0;
  function Aa() {
    Da ||
      (Oa && Date.now() - ka < 6e4) ||
      ((Da = !0),
      Ea()
        .then((t) => {
          if (t === null) return;
          let n = t.entries;
          if (a !== Q || Yr === null || !Yr.isConnected) return;
          let r = G.read(),
            i = ma(n).filter((e) => {
              let t = pa(e.server, r).selectedId;
              return !(t !== void 0 && e.candidates.some((e) => e.id === t));
            });
          if (
            i.length === 0 ||
            Oa ||
            WO !== null ||
            $k?.isOpen() ||
            e.decisionSurfaceOpen() ||
            document.querySelector(e.confirmOpenSelector)
          )
            return;
          let o =
            r === null
              ? Qr.filter((e) => !PC(e.server))
              : V.map((e) => ({
                  server: e.server,
                  tools: e.tools.filter(
                    (t) => r.get(e.server)?.tools.has(t) === !0,
                  ),
                })).filter((e) => e.tools.length > 0);
          for (let e of Qr)
            PC(e.server) ||
              o.some((t) => t.server === e.server) ||
              (o = [...o, e]);
          if (!i.some((e) => o.some((t) => t.server === e.server))) return;
          Oa = !0;
          let s = new Map(
              i
                .filter((e) => e.candidates.length === 1)
                .map((e) => [e.server, e.candidates[0]]),
            ),
            c = new Map(
              [...s].map(([e, t]) => [
                e,
                t.host === void 0
                  ? `${BO(t, 1)} \u00B7 ${t.id.slice(0, 8)}`
                  : BO(t, 1),
              ]),
            );
          e.markShown();
          let l = la("consent-prompt");
          XO(e, o, null, {
            reshowForSelection: !0,
            shownDetail: o.some((e) => s.has(e.server)) ? "repin" : "repick",
            toggles: l,
            entries: Promise.resolve({ entries: n, auth: t.auth }),
            pref: pa,
            repick: c,
            onContinue: (e, t, n) => {
              let r = aa,
                i = o.filter((e) => !q(e.server, r)),
                a = new Map(n ? [] : e);
              for (let e of i) {
                let t = s.get(e.server);
                t !== void 0 && !a.has(e.server) && a.set(e.server, t.id);
              }
              ha(a, i, { pressed: l.pressed });
            },
          });
        })
        .finally(() => {
          ((Da = !1), (ka = Date.now()));
        }));
  }
  if (Bi !== null || !PO(ta, aa)) {
    let t = Di(aa);
    (ea(e.mount(n), t), u !== null && t.some((e) => ua.has(e.server)) && Aa());
    return;
  }
  r && (e.setUnwire(null), e.unmount());
  let ja = r ? null : e.mount(n);
  ja && ea(ja, ta.filter(ai(aa)));
  let Ma = la("consent-prompt"),
    Na = new Set(V.filter((e) => q(e.server, aa)).map((e) => e.server)),
    Pa = new Set(
      V.filter((e) => ai(aa)(e) || J.grantedByDecision(`mcp:${e.server}`)).map(
        (e) => e.server,
      ),
    ),
    Fa = _n(),
    Ia = kn(!1);
  XO(e, V, na, {
    sampleAsk: vn() && !Sn(),
    sampleImages: Ia?.showedImages === !0,
    sampleToggle: Ia,
    toggles: Ma,
    networkOrigins: B ?? void 0,
    entries: Ea().then((e) => (e === null ? null : (ma(e.entries), e))),
    pref: pa,
    onContinue: (t, o, s, c) => {
      let l = s ? new Set() : o,
        d = (e) => l.has(e) && Ma.leftOff(e);
      for (let e of ta)
        d(e.server) && sa(e.server, !1, "consent-prompt", "default");
      let f = aa,
        p = ai(f),
        m = (e) => p(e) || J.grantedByDecision(`mcp:${e.server}`),
        h = ta
          .filter(ii(f))
          .filter((e) => !d(e.server))
          .filter((e) => l.has(e.server) || m(e)),
        g = h.some((e) => !Pa.has(e.server));
      if (
        (ha(s ? new Map() : t, h, {
          pressed: Ma.pressed,
          untouched: "default",
        }),
        (r && Date.now() - i > e.staleMs) || (ja && !ja.isConnected))
      ) {
        Promise.race([
          Promise.all([G.flush(), dn, fn]),
          new Promise((e) => setTimeout(e, 4e3)),
        ]).then(() => {
          a === Q && e.onStale();
        });
        return;
      }
      e.markShown();
      let _ = V.some((e) => q(e.server, f)),
        v = (e) =>
          ta.some(
            (t) => t.server === e && !q(e, f) && (d(e) || (!l.has(e) && !m(t))),
          );
      if (
        (J.noteExternalGrant(
          [...wO(u ? ["mcp"] : [], V)].filter((e) => {
            if (e === "mcp") return !_ && !ta.some((e) => v(e.server));
            let t = CO(e, V);
            return t === null || (!q(t.server, f) && !v(t.server));
          }),
        ),
        ta.some((e) => v(e.server)))
      ) {
        let e = V.some((e) => q(e.server, f) && !Na.has(e.server)),
          t = _n() !== Fa,
          n = ta.some((e) => v(e.server) && c.has(e.server));
        J.noteExternalUndecided(
          ta.filter((e) => v(e.server)).map((e) => `mcp:${e.server}`),
          !g && !e && !t && !n,
        );
      }
      let y = ta.flatMap((e) => {
        if (h.includes(e) || q(e.server, f)) return [];
        let t = f?.get(e.server)?.tools,
          n = t ? e.tools.filter((e) => t.has(e)) : [];
        return n.length > 0 ? [{ server: e.server, tools: n }] : [];
      });
      ea(ja ?? e.mount(n), [...h, ...y]);
    },
    onNotShown: La,
  });
  function La() {
    (J.noteExternalDenial([...wO(u ? ["mcp"] : [], V)]),
      Nn(),
      r && e.showNoticePane(Tp($A.head), Tp($A.sub)));
  }
}
var tj = {
  DECLINED_MSG: $A,
  noteConnectorsOff: EA,
  resetMessagesConsentMemory: ST,
  resetConnectorsOffShown: () => {
    (SA.clear(), CA.clear());
  },
  SIGN_IN_PROMPT_WAIT_MS: iA,
  filesConsentCtl: () => rT?.ctl ?? null,
  displayInput: cE,
  resetHostBridge: () => {
    (Ow?.dispose(), (Ow = null));
  },
  wireCapUse: sO,
  CAP_USE_METHODS: aO,
  CAP_USE_OWNS_OUTCOME: oO,
  PAGE_TRACK_EVENTS: yD,
  resetPageTrackEvents: () => {
    bD.clear();
  },
  mcpScopedServer: CO,
  DEVICE_CAP_NAMES: iO,
  localConsentStore: zO,
  expandMcpNames: wO,
  makePermAfterHeld: TO,
  projectSelfErr: _E,
  projectSelfFilesErr: AE,
  parseSelfFiles: RE,
  publishAsWriter: JE,
  EDIT_MAX_OPS: hD,
  ENTRY_PATH: iD,
  wireSelf: CD,
  wireSelfReadOnly: wD,
  dbStructuralOk: lt,
  wireDb: ED,
  wireDocs: OD,
  projectAssetsErr: qD,
  projectListResult: YD,
  wireAssets: tO,
  newAssetsShared: QD,
  projectSampleArgs: Db,
  projectSampleErr: Pb,
  readSampleStream: $b,
  sampleLegs: Ew,
  wireSample: tx,
  wirePermissions: DO,
  DECISION_SURFACE_SEL: Sw,
  PERM_CHROME_ONLY_CAPS: rO,
  brokerWireableEntry: nO,
  selfSentinel: NC,
  resolveMcp: FA,
  dynamicServerNameOk: BA,
  parseAskedRows: UA,
  wireMcp: jO,
  setActiveTokenSlot: (e) => {
    ((Mw = e), (Nw = e && { org: e.org, account: e.account }));
  },
  bindCachedViewer: (e) => {
    Nw = e;
  },
  bumpReauthGen: () => {
    Ak++;
  },
  reauthDismissedSnapshot: () => [...mk],
  callVerdicts: gk,
  repairSeen: xk,
  probeWatchAuthRecovery: cw,
  setActiveConsentStore: (e, t) => {
    ((Rw = e), (Iw = t));
  },
  getActiveConsentTokenSlot: () => Iw,
  setActiveSelfReplay: (e) => {
    XT = e;
  },
  getActiveSelfReplay: () => XT,
  consentStoreKey: MO,
  persistConsent: IO,
  readConsented: NO,
  assetTokenAccount: z,
  seedToolHint: (e) => {
    UC.set(e, { byTool: new Map([["t", { readOnly: !0 }]]) });
  },
  toolHintsSize: () => UC.size,
  hasToolHint: (e) => UC.has(e),
  toolHint: (e, t) => UC.get(e)?.byTool.get(t),
  brokerGenerationPeek: () => Q,
  brokerGenerationRestore: (e) => {
    Q = e;
  },
  makeMcpFastFail: WA,
  fetchAuthStatuses: zk,
  probeAuthStatuses: Bk,
  notifyWatchers: uw,
};
export {
  AD as ASSETS_UPLOAD_REPLY_BUDGET_MS,
  ek as CALL_TIME_ARM_MAX,
  $O as CALL_TIME_REAUTH_CODES,
  dk as CALL_TIME_RECHECK_MAX,
  vk as CALL_VERDICT_PRESS_GRACE_MS,
  _k as CALL_VERDICT_STALE_MS,
  hO as CHROME_PRESS_WINDOW_MS,
  lk as CP_STATUS_STALE_MAX_MS,
  fk as NOT_CONNECTED_REPOST_MAX,
  pk as NOT_CONNECTED_REPOST_MS,
  ak as REAUTH_HOLD_MAX_MS,
  ck as REAUTH_POLL_FAST_POLLS,
  uk as REAUTH_POLL_MAX,
  ok as REAUTH_POLL_MS,
  sk as REAUTH_POLL_SLOW_MS,
  rk as RECHECK_MIN_MS,
  ik as RETURN_BURST_MS,
  nk as REVEAL_POLL_MAX,
  tk as REVEAL_POLL_MS,
  Ru as SELF_SENTINEL,
  Kk as WATCH_AUTH_RECOVERY_MAX_MS,
  Gk as WATCH_AUTH_RECOVERY_MIN_MS,
  tj as _test,
  rE as advanceSelfPublishBase,
  iE as advanceSelfPublishBaseFor,
  jA as affirmCommentsGrant,
  FT as askMessagesConsent,
  YA as brokerGenerationOf,
  JA as currentBrokerGeneration,
  Km as downloadsDialogFormats,
  Gm as downloadsExportFormats,
  wO as expandMcpNames,
  MA as grantCommentsGrant,
  yw as hostPaneShown,
  Dw as invalidateBrokerGeneration,
  PC as isConsentSentinel,
  TO as makePermAfterHeld,
  CO as mcpScopedServer,
  WC as mcpToolHintsClear,
  pw as mcpWatchRetractAll,
  ej as mountBrokered,
  QT as noteBootIdentity,
  bO as noteChromePress,
  Jm as openDownloadRequest,
  qm as openExportRequest,
  Xw as openManagePermissions,
  NA as ownCommentPresence,
  ow as pressNudgeWatchAuthRecovery,
  HO as quietForDecision,
  QE as recordSelfGrant,
  tE as refreshBrokerToken,
  $E as replayBufferedPublish,
  PA as resolveCommentsConsentSummary,
  AA as revokeCommentsGrant,
  Xm as saveShellFile,
  tD as saveVersionAsWriter,
  CS as wireStoreRelay,
};
