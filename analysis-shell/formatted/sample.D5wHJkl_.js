function V(e) {
  try {
    typeof reportError == "function"
      ? reportError(e)
      : setTimeout(() => {
          throw e;
        }, 0);
  } catch {}
}
function ge(e) {
  return e !== null && typeof e == "object" ? e : null;
}
function ye(e) {
  return typeof e == "number" && Number.isInteger(e) && e >= 0 && e < 2 ** 31;
}
function _e(e) {
  const t = ge(e);
  return (
    t !== null &&
    t.__frame_cap_rewired === !0 &&
    (t.caps === void 0 ||
      (Array.isArray(t.caps) && t.caps.every((r) => typeof r == "string"))) &&
    (t.brokerGen === void 0 || ye(t.brokerGen))
  );
}
var ve =
  "may not have run: the artifact was updated before this call was answered";
function be(e, t, r, o) {
  let i = t.brokerGen;
  return (
    e.on((a) => {
      if (!_e(a)) return;
      const n = a.brokerGen !== void 0 && i !== void 0 && a.brokerGen !== i;
      if (
        ((i = a.brokerGen ?? i),
        o.gone && a.caps !== void 0 && !a.caps.includes(r))
      ) {
        o.gone();
        return;
      }
      (n && o.cut?.(), o.again?.());
    }),
    { stamp: (a) => (i === void 0 ? a : { ...a, brokerGen: i }) }
  );
}
function xe(e) {
  if (e.shell) return e.shell;
  const t = e.shellOrigin;
  return {
    post(r, o) {
      if (o?.activation) {
        parent.postMessage(r, { targetOrigin: t, includeUserActivation: !0 });
        return;
      }
      if (o?.transfer) {
        parent.postMessage(r, t, o.transfer);
        return;
      }
      parent.postMessage(r, t);
    },
    on: (r, o) => we((i) => i === t, r, o),
  };
}
function we(e, t, r) {
  const o = (i) => {
    i.source !== parent || !e(i.origin) || t(i.data, i);
  };
  return (
    addEventListener("message", o, r),
    () => removeEventListener("message", o, r)
  );
}
function c(e, t) {
  return { code: e, message: t };
}
var Te = 262144,
  X = 2e7,
  ee = 1e4,
  Se = 64e6,
  Ee = 1048576,
  Ae = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  Oe = [0.85, 0.7],
  Pe = {
    maxCount: 4,
    maxBytes: 2e6,
    maxTotalBytes: 5e6,
    maxEdgePx: 1568,
    patchPx: 28,
    maxPatches: 1568,
    mediaTypes: ["image/jpeg", "image/png"],
  },
  se = ["image/jpeg", "image/webp", "image/png"],
  Me = ["image/png", "image/webp"];
function je(e) {
  let t;
  try {
    const n = e?.images;
    if (n === null || typeof n != "object" || Array.isArray(n)) return null;
    t = n;
  } catch {
    return null;
  }
  const r = Pe,
    o = (n, s, l, d) =>
      typeof n == "number" && Number.isInteger(n) && n >= l && n <= d ? n : s,
    i = Array.isArray(t.mediaTypes)
      ? t.mediaTypes.filter((n) => typeof n == "string")
      : [],
    a = (i.length > 0 ? i : r.mediaTypes).filter((n) => se.includes(n));
  return a.length === 0
    ? null
    : {
        maxCount: o(t.maxCount, r.maxCount, 1, 20),
        maxBytes: o(t.maxBytes, r.maxBytes, 1e5, 1e7),
        maxTotalBytes: o(t.maxTotalBytes, r.maxTotalBytes, 1e5, 4e7),
        maxEdgePx: o(t.maxEdgePx, r.maxEdgePx, 64, 8e3),
        patchPx: o(t.patchPx, r.patchPx, 8, 256),
        maxPatches: o(t.maxPatches, r.maxPatches, 16, 65536),
        mediaTypes: a,
      };
}
function Ie(e) {
  const t = { maxPromptBytes: Te };
  return (
    e &&
      (t.images = {
        maxCount: e.maxCount,
        maxInputBytes: X,
        mediaTypes: [...Ae],
      }),
    t
  );
}
function Ce(e) {
  const t = (n) => e[n] | (e[n + 1] << 8),
    r = (n) => (e[n] << 8) | e[n + 1],
    o = (n) => e[n] | (e[n + 1] << 8) | (e[n + 2] << 16),
    i = (n) =>
      ((e[n] << 24) | (e[n + 1] << 16) | (e[n + 2] << 8) | e[n + 3]) >>> 0,
    a = (n, s) => {
      if (e.length < n + s.length) return !1;
      for (let l = 0; l < s.length; l++)
        if (e[n + l] !== s.charCodeAt(l)) return !1;
      return !0;
    };
  if (
    e.length >= 8 &&
    e[0] === 137 &&
    a(
      1,
      `PNG\r

`,
    )
  )
    return e.length < 24 || !a(12, "IHDR")
      ? { type: "image/png", unreadable: !0 }
      : { type: "image/png", width: i(16), height: i(20) };
  if (a(0, "GIF87a") || a(0, "GIF89a"))
    return e.length < 10
      ? { type: "image/gif", unreadable: !0 }
      : { type: "image/gif", width: t(6), height: t(8) };
  if (e.length >= 12 && a(0, "RIFF") && a(8, "WEBP")) {
    const n = { type: "image/webp", unreadable: !0 };
    if (e.length < 30) return n;
    if (a(12, "VP8 "))
      return e[23] !== 157 || e[24] !== 1 || e[25] !== 42
        ? n
        : { type: "image/webp", width: t(26) & 16383, height: t(28) & 16383 };
    if (a(12, "VP8L")) {
      if (e[20] !== 47) return n;
      const s = (e[21] | (e[22] << 8) | (e[23] << 16) | (e[24] << 24)) >>> 0;
      return {
        type: "image/webp",
        width: (s & 16383) + 1,
        height: ((s >>> 14) & 16383) + 1,
      };
    }
    return a(12, "VP8X")
      ? { type: "image/webp", width: o(24) + 1, height: o(27) + 1 }
      : n;
  }
  if (e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255) {
    const n = { type: "image/jpeg", unreadable: !0 };
    let s = 2;
    for (; s + 9 < e.length;) {
      if (e[s] !== 255) return n;
      const l = e[s + 1];
      if (l === 255) {
        s += 1;
        continue;
      }
      if (l === 216 || l === 1 || (l >= 208 && l <= 215)) {
        s += 2;
        continue;
      }
      if (l >= 192 && l <= 207 && l !== 196 && l !== 200 && l !== 204)
        return { type: "image/jpeg", width: r(s + 7), height: r(s + 5) };
      if (l === 217 || l === 218) return n;
      s += 2 + r(s + 2);
    }
    return n;
  }
  return null;
}
function te(e, t, r) {
  const o = (a, n) => Math.ceil(a / r.patchPx) * Math.ceil(n / r.patchPx);
  let i = Math.min(
    1,
    r.maxEdgePx / Math.max(e, t),
    Math.sqrt((r.maxPatches * r.patchPx * r.patchPx) / (e * t)),
  );
  for (let a = 0; a < 400; a++) {
    const n = Math.max(1, Math.floor(e * i)),
      s = Math.max(1, Math.floor(t * i));
    if (
      (Math.max(n, s) <= r.maxEdgePx && o(n, s) <= r.maxPatches) ||
      (n === 1 && s === 1)
    )
      return { width: n, height: s };
    i *= 0.99;
  }
  return { width: 1, height: 1 };
}
function $(e) {
  return `${Math.round((e / 1e6) * 10) / 10} MB`;
}
async function qe(e, t) {
  try {
    return await createImageBitmap(e, {
      imageOrientation: "from-image",
      ...(t
        ? {
            resizeWidth: t.width,
            resizeHeight: t.height,
            resizeQuality: "high",
          }
        : {}),
    });
  } catch (r) {
    if (r instanceof TypeError) return createImageBitmap(e);
    throw r;
  }
}
function Be(e, t, r) {
  return new Promise((o) => {
    e.toBlob(o, t, r);
  });
}
async function re(e, t, r) {
  for (const o of t) {
    const i = o === "image/png" ? [void 0] : Oe;
    for (const a of i) {
      const n = await Be(e, o, a);
      if (!n || n.type !== o) break;
      if (n.size <= r) return n;
    }
  }
  return null;
}
function Ne(e, t, r) {
  const o = e.getImageData(0, 0, t, r).data;
  for (let i = 3; i < o.length; i += 4) if (o[i] !== 255) return !0;
  return !1;
}
async function Le(e, t, r, o) {
  const i = `image ${t + 1}`,
    a = (g) => Promise.reject(c("image_rejected", `${i}: ${g}`));
  let n;
  try {
    n = e.size;
  } catch {
    return Promise.reject(c("invalid_request", "images must be plain Blobs"));
  }
  if (n === 0) return a("the file is empty");
  if (n > X) return a(`the file is over ${$(X)} - choose a smaller one`);
  let s;
  try {
    s = Ce(new Uint8Array(await e.slice(0, Ee).arrayBuffer()));
  } catch {
    return a("the file could not be read");
  }
  if (!s) return a("not a JPEG, PNG, WebP, or GIF file");
  if (s.unreadable || s.width <= 0 || s.height <= 0)
    return a("the file's header could not be read - re-save it as JPEG or PNG");
  if (s.width > ee || s.height > ee || s.width * s.height > Se)
    return a(
      "larger than 10,000 pixels on a side or 64 megapixels - choose a smaller version",
    );
  let l;
  try {
    l = await qe(
      e,
      s.type === "image/png" || s.type === "image/gif"
        ? te(s.width, s.height, r)
        : void 0,
    );
  } catch {
    return a("the file could not be decoded - try a different file");
  }
  const d = document.createElement("canvas");
  try {
    const { width: g, height: _ } = te(l.width, l.height, r);
    ((d.width = g), (d.height = _));
    const m = d.getContext("2d");
    if (!m) return a("this browser cannot process images");
    ((m.imageSmoothingEnabled = !0),
      (m.imageSmoothingQuality = "high"),
      m.clearRect(0, 0, g, _),
      m.drawImage(l, 0, 0, g, _));
    const f = Me.filter((y) => r.mediaTypes.includes(y));
    if (s.type !== "image/jpeg" && f.length > 0 && Ne(m, g, _)) {
      const y = await re(d, f, o);
      if (y) return y;
    }
    ((m.globalCompositeOperation = "destination-over"),
      (m.fillStyle = "#ffffff"),
      m.fillRect(0, 0, g, _));
    const x = await re(
      d,
      se.filter((y) => r.mediaTypes.includes(y)),
      o,
    );
    return x || a(`could not be compressed under ${$(o)}`);
  } catch {
    return a("the file could not be processed");
  } finally {
    (l.close(), (d.width = 0), (d.height = 0));
  }
}
async function ke(e, t) {
  const r = Math.min(t.maxBytes, Math.floor(t.maxTotalBytes / e.length)),
    o = [];
  let i = 0;
  for (const [a, n] of e.entries()) {
    const s = await Le(n, a, t, r);
    if (((i += s.size), i > t.maxTotalBytes))
      return Promise.reject(
        c(
          "image_rejected",
          `images total over ${$(t.maxTotalBytes)} after resizing`,
        ),
      );
    o.push(s);
  }
  return o;
}
var Ge = /^[A-Za-z0-9_-]{1,128}$/,
  Ue = /^[A-Za-z0-9_.-]{1,64}$/,
  Re = 1024,
  ze = 4096,
  ne = 8,
  Fe = 32768,
  D = 32768,
  le = 2048,
  F = 15e4,
  Je = 16,
  Xe = {
    input_schema: "inputSchema",
    parameters: "inputSchema",
    run: "execute",
    handler: "execute",
  };
function A(e) {
  return new TextEncoder().encode(e).length;
}
function $e(e) {
  let t;
  try {
    t = e?.tools;
  } catch {
    return null;
  }
  if (t === null || typeof t != "object" || Array.isArray(t)) return null;
  const r = t.maxCount;
  return {
    maxCount:
      typeof r == "number" && Number.isInteger(r) && r >= 1 && r <= 128
        ? r
        : Je,
  };
}
function C(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function ue(e, t) {
  if (e === null || typeof e != "object") return !0;
  if (t <= 0) return !1;
  for (const r of Object.values(e)) if (!ue(r, t - 1)) return !1;
  return !0;
}
function De(e) {
  if (!C(e))
    return { rule: 'inputSchema is a plain object with type "object"' };
  let t;
  try {
    t = structuredClone(e);
  } catch {
    const i = G(e);
    return {
      rule:
        "inputSchema must be plain JSON data" +
        (i !== null ? " (it contains a " + i + ")" : ""),
    };
  }
  if (t.type !== "object")
    return { rule: 'inputSchema needs type: "object" at its root' };
  for (const i of ["anyOf", "oneOf", "allOf"])
    if (i in t)
      return {
        rule:
          "inputSchema cannot use " + i + " at its root - put it on a property",
      };
  if (
    t.required !== void 0 &&
    (!Array.isArray(t.required) ||
      !Array.from(t.required).every((i) => typeof i == "string"))
  )
    return { rule: "inputSchema.required is a list of property names" };
  if (t.properties !== void 0) {
    if (!C(t.properties))
      return {
        rule: "inputSchema.properties is an object of property schemas",
      };
    for (const i of Object.keys(t.properties))
      if (!Ue.test(i))
        return {
          rule:
            'property "' +
            i.slice(0, 64) +
            '" - names are 1-64 of A-Z a-z 0-9 _ . -',
        };
  }
  const r = G(t);
  if (r !== null)
    return {
      rule: "inputSchema must be plain JSON data (it contains a " + r + ")",
    };
  if (!ue(t, ne))
    return { rule: "inputSchema nests deeper than " + String(ne) };
  let o;
  try {
    o = JSON.stringify(t);
  } catch {
    return { rule: "inputSchema must be plain JSON data" };
  }
  return A(o) > ze ? { rule: "inputSchema is at most 4 KB" } : { schema: t };
}
function Ye(e, t) {
  if (e == null) return null;
  if (!Array.isArray(e))
    return {
      error: c(
        "invalid_request",
        "tools must be an array of {name, description, inputSchema?, execute} - not an object keyed by name",
      ),
    };
  if (e.length === 0) return null;
  if (!t)
    return {
      error: c(
        "tools_unavailable",
        "this view cannot run page tools - check (await sample.limits()).tools",
      ),
    };
  if (e.length > t.maxCount)
    return {
      error: c(
        "invalid_request",
        "at most " +
          String(t.maxCount) +
          " tools per call (got " +
          String(e.length) +
          ")",
      ),
    };
  const r = new Set(),
    o = [];
  for (const [i, a] of e.entries()) {
    const n = C(a) ? a.name : void 0,
      s =
        "tools[" +
        String(i) +
        "]" +
        (typeof n == "string" ? " (" + n.slice(0, 128) + ")" : ""),
      l = (f) => ({ error: c("invalid_request", s + ": " + f) });
    if (!C(a))
      return l(
        "each tool is a plain object {name, description, inputSchema?, execute}",
      );
    for (const [f, x] of Object.entries(Xe))
      if (f in a && !(x in a))
        return l('"' + f + '" - did you mean "' + x + '"?');
    if (typeof n != "string" || !Ge.test(n))
      return l("name is 1-128 of A-Z a-z 0-9 _ -");
    if (r.has(n)) return l("duplicate name");
    r.add(n);
    const { description: d, inputSchema: g, execute: _ } = a;
    if (typeof d != "string" || d.trim() === "")
      return l("description is required - say what the tool does and returns");
    if (A(d) > Re) return l("description is at most 1 KB");
    let m = { type: "object", properties: {} };
    if (g != null) {
      const f = De(g);
      if ("rule" in f) return l(f.rule);
      m = f.schema;
    }
    if (typeof _ != "function") return l("execute must be a function");
    o.push({ name: n, description: d, inputSchema: m, execute: _, tool: a });
  }
  return A(JSON.stringify(ce(o))) > Fe
    ? {
        error: c(
          "invalid_request",
          "the tool definitions together are at most 32 KB",
        ),
      }
    : o;
}
function ce(e) {
  return e.map(({ name: t, description: r, inputSchema: o }) => ({
    name: t,
    description: r,
    inputSchema: o,
  }));
}
function He(e) {
  const t = e?.calls;
  if (!Array.isArray(t) || t.length === 0) return null;
  const r = [];
  for (const o of t) {
    const { id: i, name: a, input: n } = o ?? {};
    if (typeof i != "string" || typeof a != "string" || !C(n)) return null;
    r.push({ id: i, name: a, input: n });
  }
  return r;
}
function M(e, t, r) {
  try {
    r === void 0
      ? console.warn("claude.sample: tool " + e + " " + t)
      : console.warn("claude.sample: tool " + e + " " + t, r);
  } catch {}
}
function Y(e, t) {
  if (A(e) <= t) return e;
  const r = Array.from(e.slice(0, t));
  for (; r.length > 0 && A(r.join("")) > t;) r.pop();
  return r.join("");
}
function G(e, t = new WeakSet(), r = 0) {
  if (e === null || typeof e != "object" || r > 64 || t.has(e)) return null;
  if ((t.add(e), Array.isArray(e))) {
    for (const o of e) {
      const i = G(o, t, r + 1);
      if (i !== null) return i;
    }
    return null;
  }
  if (typeof e.toJSON == "function") return null;
  if (!C(e) && Object.keys(e).length === 0) {
    const o = e.constructor?.name;
    return typeof o == "string" && o !== "" ? o : "object";
  }
  for (const o of Object.values(e)) {
    const i = G(o, t, r + 1);
    if (i !== null) return i;
  }
  return null;
}
function We(e, t) {
  if (typeof t == "string")
    return A(t) > 32768
      ? (M(e, "returned " + String(A(t)) + " bytes; the limit is " + String(D)),
        oe(A(t)))
      : { content: t };
  if (t === void 0) return { content: "(no return value)" };
  let r,
    o = "not serializable";
  try {
    r = JSON.stringify(t);
  } catch (a) {
    o = a instanceof Error ? a.message : String(a);
  }
  if (r === void 0)
    return (
      M(e, "returned a value that cannot be sent as JSON (" + o + ")"),
      {
        content: "Error: the result cannot be sent as JSON (" + Y(o, 200) + ")",
        isError: !0,
      }
    );
  if (A(r) > 32768)
    return (
      M(e, "returned " + String(A(r)) + " bytes; the limit is " + String(D)),
      oe(A(r))
    );
  const i = G(t);
  return i !== null
    ? (M(e, "returned a " + i + ", which has no JSON form"),
      {
        content:
          "Error: the result contains a " +
          i +
          ", which has no JSON form - return plain data (picked fields, .textContent, Array.from(...))",
        isError: !0,
      })
    : { content: r };
}
function oe(e) {
  return {
    content:
      "Error: result too large (" +
      String(e) +
      " bytes > " +
      String(D) +
      "); return less",
    isError: !0,
  };
}
function Ke(e, t) {
  M(e, "threw:", t);
  let r;
  const o = t?.message;
  if (typeof o == "string") r = o;
  else if (typeof t == "string") r = t;
  else
    try {
      r = JSON.stringify(t) ?? String(t);
    } catch {
      r = String(t);
    }
  return { content: Y("Error: " + r, le), isError: !0 };
}
function Qe(e, t, r) {
  return Promise.all(
    t.map((o) => {
      const i = e.get(o.name);
      if (!i)
        return (
          M(o.name, "was called but is not in this call's tools"),
          Promise.resolve({
            id: o.id,
            content: Y(
              'Error: no tool named "' +
                o.name.slice(0, 128) +
                '"; available: ' +
                [...e.keys()].join(", "),
              le,
            ),
            isError: !0,
          })
        );
      const a = new AbortController();
      return new Promise((n) => {
        if (r.signal.aborted) {
          n({
            id: o.id,
            content: "Error: the call ended before the tool started",
            isError: !0,
          });
          return;
        }
        let s = !1;
        const l = (m) => {
            s ||
              ((s = !0),
              clearTimeout(_),
              r.signal.removeEventListener("abort", d),
              n({ id: o.id, ...m }));
          },
          d = () => {
            (a.abort(r.signal.reason),
              l({
                content: "Error: the call ended before the tool finished",
                isError: !0,
              }));
          },
          g = (m) => {
            if (s) return;
            let f;
            try {
              f = m();
            } catch {
              (M(o.name, "returned or threw something that could not be read"),
                (f = {
                  content:
                    "Error: the result could not be read - return plain data",
                  isError: !0,
                }));
            }
            l(f);
          },
          _ = setTimeout(() => {
            (M(o.name, "did not finish within " + String(F / 1e3) + " s"),
              l({
                content:
                  "Error: the tool did not finish within " +
                  String(F / 1e3) +
                  " s",
                isError: !0,
              }));
            try {
              a.abort(
                new DOMException("the tool ran too long", "TimeoutError"),
              );
            } catch {}
          }, F);
        (r.signal.addEventListener("abort", d, { once: !0 }),
          Promise.resolve()
            .then(() => i.execute.call(i.tool, o.input, { signal: a.signal }))
            .then(
              (m) => {
                g(() => We(o.name, m));
              },
              (m) => {
                g(() => Ke(o.name, m));
              },
            ));
      });
    }),
  );
}
var Ze = 13e4,
  Ve = 2e3,
  et = 9e5,
  tt = ["default", "complex", "quick"],
  rt = ["low", "medium", "high"],
  ie = 1e3,
  nt = 864e5,
  ot = new Set([
    "onText",
    "signal",
    "tools",
    "images",
    "modelTier",
    "model",
    "effort",
    "cache",
  ]),
  U = new Set();
function ae(e, t) {
  U.has(e) || (U.add(e), H(t));
}
function H(e) {
  try {
    console.warn(`claude.sample: ${e}`);
  } catch {}
}
function J(e) {
  return k(c("cancelled", "the call was cancelled"), e);
}
function k(e, t) {
  return t.trim() === "" ? e : { ...e, text: t };
}
function fe(e) {
  return new TextEncoder().encode(e).length;
}
function it(e) {
  return typeof e == "function"
    ? "for streaming pass {onText: fn}"
    : typeof e == "string"
      ? "for a model tier pass {modelTier}; the prompt is the first argument"
      : typeof AbortController < "u" && e instanceof AbortController
        ? "to cancel pass {signal: ctl.signal}"
        : typeof AbortSignal < "u" && e instanceof AbortSignal
          ? "to cancel pass {signal}"
          : "for images pass {images}";
}
function at(e) {
  if (e.length === 0)
    return { error: c("invalid_request", "the turn list is empty") };
  if (e.length > ie)
    return { error: c("invalid_request", `at most ${ie} turns per call`) };
  const t = [];
  let r = 0;
  for (const o of e) {
    if (o === null || typeof o != "object")
      return {
        error: c("invalid_request", "each turn must be {role, content}"),
      };
    const { role: i, content: a } = o;
    if (i !== "user" && i !== "assistant")
      return {
        error: c("invalid_request", 'turn role must be "user" or "assistant"'),
      };
    if (typeof a != "string" || a.trim() === "")
      return {
        error: c("invalid_request", "each turn needs non-blank text content"),
      };
    ((r += fe(a)), t.push({ role: i, content: a }));
  }
  return t[0].role !== "user" || t.at(-1).role !== "user"
    ? {
        error: c(
          "invalid_request",
          "the turn list must start and end with a user turn",
        ),
      }
    : r > 262144
      ? { error: c("prompt_too_large", "the turns exceed the 256 KiB limit") }
      : t;
}
function st(e) {
  if (e === void 0) return {};
  if (e === !0 || e === !1) return { cache: e };
  if (e === null || typeof e != "object" || Array.isArray(e))
    return {
      error: c(
        "invalid_request",
        "cache must be true, false, or {gcTime?, refresh?}",
      ),
    };
  const { gcTime: t, refresh: r } = e;
  return t !== void 0 && (typeof t != "number" || !Number.isFinite(t) || t <= 0)
    ? {
        error: c(
          "invalid_request",
          "cache.gcTime must be a number of milliseconds above zero (cache: false disables caching)",
        ),
      }
    : r !== void 0 && typeof r != "boolean"
      ? { error: c("invalid_request", "cache.refresh must be true or false") }
      : {
          cache: {
            ...(t !== void 0 && { gcTime: Math.min(t, nt) }),
            ...(r !== void 0 && { refresh: r }),
          },
        };
}
function lt(e, t, r, o) {
  let i;
  try {
    if (typeof e == "string") {
      if (e.trim() === "")
        return {
          error: c("invalid_request", "the prompt must be a non-empty string"),
        };
      if (fe(e) > 262144)
        return {
          error: c("prompt_too_large", "the prompt exceeds the 256 KiB limit"),
        };
      i = { input: e };
    } else if (Array.isArray(e)) {
      const y = at(e);
      if ("error" in y) return y;
      i = { input: y };
    } else
      return e !== null && typeof e == "object"
        ? {
            error: c(
              "invalid_request",
              "pass the prompt as the first argument: sample(prompt, options)",
            ),
          }
        : {
            error: c(
              "invalid_request",
              "input must be a prompt string or a list of {role, content} turns",
            ),
          };
    if (t == null) return i;
    const a = typeof t == "object" ? Object.getPrototypeOf(t) : void 0;
    if (a !== Object.prototype && a !== null)
      return {
        error: c(
          "invalid_request",
          `options must be a plain object - ${it(t)}`,
        ),
      };
    for (const y of Object.keys(t))
      !ot.has(y) && !U.has(y) && (U.add(y), H(`unknown option "${y}" ignored`));
    const n = t,
      { onText: s, signal: l, modelTier: d, model: g, effort: _ } = n,
      m = Ye(n.tools, o);
    if (m && "error" in m) return m;
    if (m) {
      if (n.cache !== void 0 && n.cache !== null && n.cache !== !1)
        return {
          error: c(
            "invalid_request",
            "calls with tools are never cached - remove cache",
          ),
        };
      i.tools = m;
    }
    let { images: f } = n;
    if (s != null) {
      if (typeof s != "function")
        return { error: c("invalid_request", "onText must be a function") };
      i.onText = s;
    }
    if (l != null) {
      if (!(l instanceof AbortSignal))
        return {
          error: c(
            "invalid_request",
            typeof AbortController < "u" && l instanceof AbortController
              ? "signal: pass ctl.signal, not the controller"
              : "signal must be an AbortSignal",
          ),
        };
      i.signal = l;
    }
    if (d != null) {
      if (typeof d != "string" || !tt.includes(d))
        return {
          error: c(
            "invalid_request",
            "modelTier must be default, complex, or quick",
          ),
        };
      i.modelTier = d;
    }
    (g != null &&
      (typeof g == "string"
        ? g !== "" && (i.model = g)
        : ae(
            "model",
            'option "model" ignored: pass one model id as a string; this call uses modelTier',
          )),
      _ != null &&
        (typeof _ == "string" && rt.includes(_)
          ? (i.effort = _)
          : ae("effort", 'option "effort" ignored: use low, medium, or high')));
    const x = st(n.cache);
    if ("error" in x) return x;
    if (
      (x.cache !== void 0 && (i.cache = x.cache),
      f instanceof Blob
        ? (f = [f])
        : f !== null &&
          typeof f == "object" &&
          Symbol.iterator in f &&
          (f = Array.from(f)),
      f != null)
    ) {
      if (!Array.isArray(f) || !f.every((y) => y instanceof Blob))
        return {
          error: c(
            "invalid_request",
            "images must be a Blob or File, or a list of them",
          ),
        };
      if (f.length > 0) {
        if (!r)
          return {
            error: c(
              "images_unavailable",
              "image input is not available in this view",
            ),
          };
        if (f.length > r.maxCount)
          return {
            error: c("image_rejected", `at most ${r.maxCount} images per call`),
          };
        i.images = f;
      }
    }
  } catch {
    return {
      error: c("invalid_request", "input and options must be plain data"),
    };
  }
  return i;
}
function ut(e, t) {
  const r = [];
  let o = 0;
  for (; r.length < t;) {
    const i = e.indexOf("```", o),
      a =
        i < 0
          ? -1
          : e.indexOf(
              `
`,
              i + 3,
            ),
      n = a < 0 ? -1 : e.indexOf("```", a + 1);
    if (n < 0) return r;
    (r.push(e.slice(a + 1, n)), (o = n + 3));
  }
  return r;
}
function ct(e) {
  const t = (n) => {
      try {
        return JSON.parse(n);
      } catch {
        return;
      }
    },
    r = t(e);
  if (r !== void 0) return r;
  const o = ut(e, 2);
  if (o.length === 1) {
    const n = t(o[0]);
    if (n !== void 0) return n;
  }
  const i = e.search(/[[{]/),
    a = Math.max(e.lastIndexOf("}"), e.lastIndexOf("]"));
  return i >= 0 && a > i ? t(e.slice(i, a + 1)) : void 0;
}
function mt(e) {
  const t = xe(e),
    r = "userActivation" in MessageEvent.prototype,
    o = (() => {
      const p = e.capBudgets?.sample?.sample;
      return typeof p == "number" && Number.isFinite(p) && p > 0
        ? Math.min(p, 6e5) + Ve
        : Ze;
    })();
  let i = 0;
  const a = new Map(),
    n = () => "a" + ++i,
    s = (p) => {
      const u = a.get(p);
      if (u) return (a.delete(p), clearTimeout(u.timer), u.toolCtl?.abort(), u);
    },
    l = (p, u) => {
      const b = s(p);
      b && (_("cancelCall", [p]), b.settle({ error: c("upstream_error", u) }));
    };
  t.on((p) => {
    const u = p;
    if (!u) return;
    const b = typeof u.id == "string" ? u.id : null;
    if (!b) return;
    const h = a.get(b);
    if (h) {
      if (u.__frame_cap_ack === !0) {
        (clearTimeout(h.timer),
          (h.timer = setTimeout(() => {
            l(b, "the call was held (consent or its turn) and no outcome came");
          }, et)));
        return;
      }
      if (u.__frame_cap_p === !0) {
        const S = ft(u.p);
        S?.type === "text"
          ? h.progress(S.text)
          : S?.type === "tool_use" && d(b, h, S.calls);
        return;
      }
      u.__frame_cap_r === !0 &&
        (s(b),
        h.settle(
          u.error !== null && u.error !== void 0
            ? { error: u.error }
            : { result: u.result },
        ));
    }
  });
  const d = (p, u, b) => {
    if (!u.tools || !u.toolCtl || u.running) return;
    const { tools: h, toolCtl: S } = u;
    (clearTimeout(u.timer),
      (u.running = !0),
      Qe(h, b, S).then((I) => {
        if (((u.running = !1), !(a.get(p) !== u || S.signal.aborted))) {
          try {
            t.post(
              g.stamp({
                __frame_cap: !0,
                cap: "sample",
                id: n(),
                method: "toolResults",
                args: [p, I],
              }),
            );
          } catch {
            (s(p),
              u.settle({
                error: c(
                  "upstream_error",
                  "the tool results could not be sent",
                ),
              }));
            return;
          }
          (clearTimeout(u.timer),
            (u.timer = setTimeout(() => {
              l(p, "no reply from shell after the tools ran");
            }, o)));
        }
      }));
  };
  addEventListener("pagehide", (p) => {
    if (!p.persisted)
      for (const u of a.keys())
        l(u, "the page was hidden before the answer finished");
  });
  const g = be(t, e, "sample", {
      cut: () => {
        for (const p of Array.from(a.keys())) l(p, ve);
      },
    }),
    _ = (p, u) => {
      try {
        t.post(
          g.stamp({
            __frame_cap: !0,
            cap: "sample",
            id: n(),
            method: p,
            args: u,
          }),
        );
      } catch {}
    },
    m = je(e.capabilities.sample?.config),
    f = $e(e.capabilities.sample?.config);
  let x = !0;
  const y = (p, u, b) => {
      const h = lt(p, u, m, f);
      if ("error" in h) return Promise.reject(h.error);
      const { onText: S, signal: I } = h;
      return I?.aborted
        ? (x ||
            H(
              "the signal was already aborted when sample() was called - use a new AbortController per call",
            ),
          Promise.reject(J("")))
        : new Promise((z, q) => {
            let O = "",
              P = "",
              B = !1,
              N = null;
            const K = (v) => {
                try {
                  const T = S(v);
                  T && typeof T.then == "function" && T.then(void 0, V);
                } catch (T) {
                  V(T);
                }
              },
              he = (v) => {
                const T = O.length === P.length;
                if (
                  ((O += v),
                  !S ||
                    B ||
                    O.length === P.length ||
                    (P === "" && O.trim() === ""))
                )
                  return;
                const E = T ? v : O.slice(P.length);
                ((P = O), K({ text: P, delta: E }));
              },
              L = (v, T) => {
                if (B) return;
                if (
                  ((B = !0),
                  N !== null && (s(N), T && _("cancelCall", [N])),
                  I?.removeEventListener("abort", Q),
                  "error" in v)
                ) {
                  q(
                    v.error.text === void 0 && v.error.code !== "refused"
                      ? k(v.error, O)
                      : v.error,
                  );
                  return;
                }
                const E = v.result;
                if (typeof E?.text != "string") {
                  q(
                    k(
                      c(
                        "upstream_error",
                        "the viewer app's reply is not one this page runtime reads - reload the view",
                      ),
                      O,
                    ),
                  );
                  return;
                }
                const w = E.text;
                if (!w.startsWith(O)) {
                  q(
                    k(
                      c(
                        "upstream_error",
                        "the reply disagrees with the text sent",
                      ),
                      O,
                    ),
                  );
                  return;
                }
                if (S && w !== P) {
                  const de = w.slice(P.length);
                  ((P = w), K({ text: w, delta: de }));
                }
                if (I?.aborted) {
                  q(J(w));
                  return;
                }
                if (b === null) {
                  z(v.result);
                  return;
                }
                if (E && "value" in E) {
                  z(E.value);
                  return;
                }
                const j = E?.truncated === !0 ? void 0 : ct(w);
                if (j === void 0) {
                  q(
                    k(
                      c(
                        "invalid_json",
                        E?.truncated === !0
                          ? "the reply was cut short before the JSON was complete"
                          : "the reply held no JSON value",
                      ),
                      w,
                    ),
                  );
                  return;
                }
                z(j);
              },
              Q = () => {
                L({ error: J("") }, !0);
              };
            I?.addEventListener("abort", Q, { once: !0 });
            const Z = (v) => {
              if (B) return;
              const T = {
                  ...(v !== void 0 && { images: v }),
                  ...(h.cache !== void 0 && { cache: h.cache }),
                  ...(b !== null && { format: b }),
                  ...(h.tools && { tools: ce(h.tools) }),
                  ...(h.model && { model: h.model }),
                  ...(h.effort !== void 0 && { effort: h.effort }),
                },
                E =
                  Object.keys(T).length > 0
                    ? [h.input, h.modelTier, T]
                    : [h.input, h.modelTier];
              N = n();
              const w = N;
              a.set(w, {
                settle: (j) => {
                  L(j, !1);
                },
                progress: he,
                ...(h.tools && {
                  tools: new Map(h.tools.map((j) => [j.name, j])),
                  toolCtl: new AbortController(),
                }),
                timer: setTimeout(() => {
                  s(w) &&
                    L(
                      { error: c("upstream_error", "no reply from shell") },
                      !0,
                    );
                }, o),
              });
              try {
                t.post(
                  g.stamp({
                    __frame_cap: !0,
                    cap: "sample",
                    id: w,
                    method: "sample",
                    args: E,
                  }),
                  { activation: r },
                );
              } catch {
                (s(w),
                  L(
                    {
                      error: c(
                        "invalid_request",
                        "arguments must be cloneable",
                      ),
                    },
                    !1,
                  ));
              }
            };
            queueMicrotask(() => {
              if (!B) {
                if (!h.images || !m) {
                  Z();
                  return;
                }
                ke(h.images, m).then(
                  (v) => {
                    Z(v);
                  },
                  (v) => {
                    L({ error: v }, !1);
                  },
                );
              }
            });
          });
    },
    R = e.pipe("sample"),
    W = R.wrap("sample", (p, u) => y(p, u, null)),
    me = R.wrap("json", (p, u) => y(p, u, "json")),
    pe = R.wrap("limits", () =>
      Promise.resolve({
        ...Ie(m),
        ...(f && { tools: { maxCount: f.maxCount } }),
      }),
    );
  (e.mount("sample", Object.assign(W, { sample: W, json: me, limits: pe })),
    (x = !1));
}
function ft(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.type === "text" && typeof t.text == "string" && t.text !== "")
    return { type: "text", text: t.text };
  if (t.type === "tool_use") {
    const r = He(e);
    return r ? { type: "tool_use", calls: r } : null;
  }
  return null;
}
export { mt as install };
