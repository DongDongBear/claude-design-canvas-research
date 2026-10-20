(function () {
  if (window.__dcEditorPicker) return;
  var Xo =
      "url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20viewBox=%220%200%2016%2016%22%3E%3Cpath%20d=%22M2%2014l1-4%208-8a2.1%202.1%200%200%201%203%203l-8%208-4%201z%22%20fill=%22%23333%22%20stroke=%22%23fff%22%20stroke-width=%221%22/%3E%3C/svg%3E') 1 15, crosshair",
    md = {
      rect: "crosshair",
      frame: "crosshair",
      grid: "crosshair",
      oval: "crosshair",
      text: "text",
      arrow: "crosshair",
      line: "crosshair",
      draw: Xo,
      interact: "",
    },
    or = document.createElement("style");
  (or.setAttribute("data-dc-editor-style", ""),
    (or.textContent =
      'body:not([data-dc-editor-overlay-hidden]) [data-dc-editor-hover][data-dc-editor-hover-stroke]:not([data-dc-editor-selected]){filter:drop-shadow(0 0 calc(1*var(--dc-chrome-unit,1px)) color-mix(in srgb,#2a78d6 90%,transparent)) drop-shadow(0 0 calc(2*var(--dc-chrome-unit,1px)) color-mix(in srgb,#2a78d6 55%,transparent))!important;}body:not([data-dc-editor-overlay-hidden]):not([data-dc-editor-proxy="copy"]) [data-dc-editor-dragging],body:not([data-dc-editor-overlay-hidden]):not([data-dc-editor-proxy]) [data-dc-dragging],body[data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-drag-follower]{outline:calc(2*var(--dc-chrome-unit,1px)) solid #2a78d6!important;outline-offset:calc(-1*var(--dc-chrome-unit,1px))!important;opacity:0.55!important;}body[data-dc-editor-proxy="move"]:not([data-dc-editor-overlay-hidden]) [data-dc-editor-dragging],body[data-dc-editor-proxy="move"]:not([data-dc-editor-overlay-hidden]) [data-dc-dragging],body[data-dc-editor-proxy="move"]:not([data-dc-editor-overlay-hidden]) [data-dc-editor-dragging]>*,body[data-dc-editor-proxy="move"]:not([data-dc-editor-overlay-hidden]) [data-dc-dragging]>*{opacity:0!important;outline:none!important;}[data-dc-editor-drag-proxy],[data-dc-editor-drag-proxy] *{pointer-events:none!important;}body[data-dc-editor-on]:not([data-dc-editor-tool="interact"]) *{cursor:default!important;user-select:none!important;}body[data-dc-editor-on]:not([data-dc-editor-tool="interact"]) :not([data-dc-editor-overlay-root]):not([data-dc-editor-overlay-root] *){pointer-events:auto!important;transition:none!important;animation:none!important;}body[data-dc-editor-on][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-editor-dragging]:not([data-dc-editor-overlay-root]) :not([data-dc-editor-overlay-root]),body[data-dc-editor-on][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-dragging]:not([data-dc-editor-overlay-root]) :not([data-dc-editor-overlay-root]),body[data-dc-editor-on][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-drag-follower]:not([data-dc-editor-overlay-root]),body[data-dc-editor-on][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-drag-follower]:not([data-dc-editor-overlay-root]) :not([data-dc-editor-overlay-root]),body[data-dc-editor-move][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-editor-dragging]:not([data-dc-editor-overlay-root]) :not([data-dc-editor-overlay-root]),body[data-dc-editor-move][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-dragging]:not([data-dc-editor-overlay-root]) :not([data-dc-editor-overlay-root]),body[data-dc-editor-move][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-drag-follower]:not([data-dc-editor-overlay-root]),body[data-dc-editor-move][data-dc-editor-brk]:not([data-dc-editor-overlay-hidden]) [data-dc-drag-follower]:not([data-dc-editor-overlay-root]) :not([data-dc-editor-overlay-root]){pointer-events:none!important;}body[data-dc-editor-move] :not([data-dc-editor-overlay-root]):not([data-dc-editor-overlay-root] *){pointer-events:auto!important;transition:none!important;animation-duration:0s!important;animation-delay:0s!important;}body[data-dc-editor-on][data-dc-editor-tool="rect"] *,body[data-dc-editor-on][data-dc-editor-tool="frame"] *,body[data-dc-editor-on][data-dc-editor-tool="grid"] *,body[data-dc-editor-on][data-dc-editor-tool="oval"] *,body[data-dc-editor-on][data-dc-editor-tool="arrow"] *,body[data-dc-editor-on][data-dc-editor-tool="line"] *{cursor:crosshair!important;}body[data-dc-editor-on][data-dc-editor-tool="text"] *{cursor:text!important;}body[data-dc-editor-on][data-dc-editor-tool="draw"] *{cursor:' +
      Xo +
      '!important;}body[data-dc-editor-on]:not([data-dc-editor-tool]) [data-drags-parent],body[data-dc-editor-on]:not([data-dc-editor-tool]) [data-drags-parent] *{cursor:grab!important;}body[data-dc-editor-on]:not([data-dc-editor-tool]) [data-drags-parent]:active,body[data-dc-editor-on]:not([data-dc-editor-tool]) [data-drags-parent]:active *{cursor:grabbing!important;}body[data-dc-editor-on] [data-dc-editor-editing][contenteditable][contenteditable],body[data-dc-editor-on] [data-dc-editor-editing][contenteditable][contenteditable] *,body[data-dc-editor-on] [data-dc-editor-svg-editing]{cursor:text!important;}body[data-dc-editor-on] [data-dc-editor-editing="import"]{outline:none!important;}html:not([data-dc-canvas]):has(body[data-dc-editor-on]:not([data-dc-capturing]) .sc-host){background:var(--dc-editor-backdrop,#ededeb);}html:not([data-dc-canvas]) body[data-dc-editor-on]:not([data-dc-capturing]):has(.sc-host){background:var(--dc-editor-backdrop,#ededeb);}html:not([data-dc-canvas]) body[data-dc-editor-on] .sc-host:not(.sc-host .sc-host){min-height:calc(100vh - var(--dc-editor-host-vpad,0px));}html:not([data-dc-canvas]) body[data-dc-editor-on]:not([data-dc-capturing]) .sc-host:not(.sc-host .sc-host){background:var(--dc-editor-host-bg,#fff);}html[data-dc-frameless],html[data-dc-frameless] body[data-dc-editor-on],html[data-dc-frameless] body[data-dc-editor-on] .sc-host:not(.sc-host .sc-host){background:transparent!important;min-height:0!important;}html:has(body[data-dc-capturing]),body[data-dc-capturing]{transition:none!important;}html[data-dc-canvas]{overflow:hidden;}html[data-dc-canvas] body[data-dc-editor-on] .sc-host:not(.sc-host .sc-host)::before{content:"";position:absolute;left:-100000px;top:-100000px;width:200000px;height:200000px;pointer-events:none;background:repeating-linear-gradient(45deg,var(--dc-editor-hatch-ink,rgba(0,0,0,.05)) 0 8px,transparent 8px 16px);clip-path:polygon(0 0,100% 0,100% 50%,50% 50%,50% 100%,0 100%);}'));
  var I = !1,
    X = null,
    ge = /Mac|iPhone|iPad/.test(navigator.platform || ""),
    yd =
      typeof MessageEvent == "function" &&
      "userActivation" in MessageEvent.prototype,
    Le = !1,
    qn = {},
    $a = 0,
    Tt = !1,
    Vn = !1,
    Kt = !1,
    _o = !1,
    ue = 0,
    on = 0,
    lr = !1,
    Qt = !1,
    Re = !1,
    A = [],
    R = null,
    ft = null,
    ln = null,
    Vt = {},
    Za = {},
    me = [],
    Ja = {},
    Qa = {},
    b = null,
    jt = null,
    Wo = 0,
    ye = null,
    ja = 0,
    un = !1,
    bt = null,
    De = null,
    ti = null,
    se = null,
    Ho = function (e) {
      const r = document.createElement("div");
      r.innerHTML = e;
      const n = r.querySelectorAll("*");
      for (let a = 0; a < n.length; a++) {
        const i = n[a];
        for (; i.attributes.length;) i.removeAttribute(i.attributes[0].name);
      }
      return r.innerHTML.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
    },
    Yo = function (e, r) {
      if (typeof e != "string") return null;
      const n = new DOMParser()
        .parseFromString(e, "text/html")
        .querySelector('[data-dc-tpl="' + r + '"]');
      if (!n) return null;
      const a = n.querySelectorAll("*");
      for (let i = 0; i < a.length; i++) {
        const o = a[i];
        for (; o.attributes.length;) o.removeAttribute(o.attributes[0].name);
      }
      return n.innerHTML;
    },
    zo = function (e, r, n) {
      const a = (o) => {
          if (o.textContent === "" && !o.querySelector("*")) return null;
          const l = e.cloneNode(!1);
          (l.removeAttribute("data-dc-tpl"),
            l.removeAttribute("data-dc-link-new"),
            l.appendChild(o));
          const u = l.querySelectorAll("[data-dc-tpl]");
          for (let s = 0; s < u.length; s++)
            u[s].removeAttribute("data-dc-tpl");
          return l;
        },
        i = e.parentNode;
      if (r && e.contains(r)) {
        const o = document.createRange();
        if ((o.setStart(e, 0), o.setEndBefore(r), !o.collapsed)) {
          const l = a(o.extractContents());
          l && i.insertBefore(l, e);
        }
      }
      if (n && e.contains(n)) {
        const o = document.createRange();
        if (
          (o.setStartAfter(n), o.setEnd(e, e.childNodes.length), !o.collapsed)
        ) {
          const l = a(o.extractContents());
          l && i.insertBefore(l, e.nextSibling);
        }
      }
      for (; e.firstChild;) i.insertBefore(e.firstChild, e);
      i.removeChild(e);
    },
    bd = function (e, r, n, a) {
      const i = r === "into" ? e : e.parentElement;
      if (!i || i.getAttribute("data-dc-tpl") == null)
        return { el: e, position: r };
      const o = [];
      for (let g = 0; g < i.children.length; g++) {
        const h = i.children[g];
        if (!h.getAttribute || h.getAttribute("data-dc-tpl") == null) continue;
        const v = getComputedStyle(h).position;
        v === "absolute" || v === "fixed" || o.push(h);
      }
      if (o.length === 0) return { el: e, position: r, slotless: !0 };
      const l = getComputedStyle(i),
        u = l.display || "",
        s = u.indexOf("flex") !== -1,
        d = s && l.flexDirection.indexOf("-reverse") !== -1;
      d && o.reverse();
      const p = (g) => (d ? (g === "before" ? "after" : "before") : g);
      if (u.indexOf("grid") !== -1) {
        let g = o[0],
          h = 1 / 0;
        for (let y = 0; y < o.length; y++) {
          const m = o[y].getBoundingClientRect(),
            w = n - (m.left + m.right) / 2,
            E = a - (m.top + m.bottom) / 2,
            C = w * w + E * E;
          C < h && ((h = C), (g = o[y]));
        }
        const v = g.getBoundingClientRect(),
          x = a < v.top || (a <= v.bottom && n < (v.left + v.right) / 2);
        return { el: g, position: x ? "before" : "after" };
      }
      const c =
        (s && l.flexDirection.indexOf("row") === 0) ||
        u === "table-row" ||
        i.tagName.toLowerCase() === "tr";
      for (let g = 0; g < o.length; g++) {
        const h = o[g].getBoundingClientRect(),
          v = c ? (h.left + h.right) / 2 : (h.top + h.bottom) / 2;
        if ((c ? n : a) < v) return { el: o[g], position: p("before") };
      }
      return { el: o[o.length - 1], position: p("after") };
    },
    xd = function (e, r) {
      if (!e) return !1;
      if (e === r) return !0;
      const n = e.getBoundingClientRect(),
        a = r.getBoundingClientRect();
      return n.width >= a.width * 0.9 && n.height >= a.height * 0.9;
    },
    wd = function (e, r, n) {
      let a = null,
        i = 1 / 0;
      for (let o = 0; o < n.length; o++) {
        const l = n[o];
        if (l.right - l.left < 8 || l.bottom - l.top < 8) continue;
        const u = Math.max(l.left - e, 0, e - l.right),
          s = Math.max(l.top - r, 0, r - l.bottom),
          d = u * u + s * s;
        d < i && ((i = d), (a = l));
      }
      return a
        ? {
            x: Math.min(Math.max(e, a.left + 2), a.right - 2),
            y: Math.min(Math.max(r, a.top + 2), a.bottom - 2),
          }
        : null;
    },
    qo = function (e, r, n, a) {
      const i = n.right - n.left,
        o = n.bottom - n.top,
        l = a.right - a.left,
        u = a.bottom - a.top;
      if (i < 4 || o < 4 || l < 8 || u < 8) return null;
      const s = Math.min(Math.max((e - n.left) / i, 0), 1),
        d = Math.min(Math.max((r - n.top) / o, 0), 1);
      return {
        x: Math.min(Math.max(a.left + s * l, a.left + 2), a.right - 2),
        y: Math.min(Math.max(a.top + d * u, a.top + 2), a.bottom - 2),
      };
    },
    Vo = function (e, r) {
      if (e !== "dc-import" && e !== "x-import") return null;
      const n = e === "dc-import",
        a = r["component-from-global-scope"] || "",
        i = r.component || "",
        o = n ? r.name || i : a || (r.from != null ? i : "");
      if (
        ((r.from || "") + " " + a + " " + i)
          .toLowerCase()
          .includes("deck-stage") ||
        o.toLowerCase() === "image-slot"
      )
        return null;
      const l = o.lastIndexOf(n ? "/" : "."),
        u = o.slice(l + 1);
      if (u === "" || o.includes("{{")) return null;
      const s = {
          kind: n
            ? "canvas"
            : r.from == null && a.includes(".")
              ? "system"
              : "module",
          ref: o,
          name: u,
        },
        d = o.slice(0, Math.max(l, 0)),
        p = n
          ? d
              .split("/")
              .filter(function (c) {
                return c !== "" && c !== "." && c !== "..";
              })
              .join("/")
          : d;
      return (p !== "" && (s.scope = p), s);
    },
    Ad = function (e, r) {
      const n = {},
        a = /<x-import\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi,
        i = /\s([^\s=>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;
      let o;
      for (; (o = a.exec(e)) !== null;) {
        const l = {};
        let u;
        for (i.lastIndex = 0; (u = i.exec(o[1])) !== null;)
          l[u[1].toLowerCase()] =
            u[2] !== void 0 ? u[2] : u[3] !== void 0 ? u[3] : "";
        const s = l["data-dc-tpl"];
        s !== void 0 && /^\d+$/.test(s) && r("x-import", l) && (n[s] = 1);
      }
      return n;
    },
    Ed = function (e, r, n) {
      const a = function (s) {
          return (s.nodeValue || "")
            .replace(/[ \t\n\r\f]+/g, " ")
            .replace(/^ | $/g, "");
        },
        i = function (s) {
          const d = s.parentElement;
          return (
            s.nodeType === 3 &&
            !!d &&
            e.contains(s) &&
            d.closest("[data-dc-tpl]") === e &&
            !d.closest(".sc-interp") &&
            d.namespaceURI === "http://www.w3.org/1999/xhtml" &&
            !d.closest("textarea,select,option,title,script,style,noscript")
          );
        };
      let o = null;
      const l = e.ownerDocument.createTreeWalker(e, 4);
      if (n) {
        if (!i(n)) return null;
        for (let s = l.nextNode(); s; s = l.nextNode())
          if (s !== n && i(s) && a(s) === a(n)) return null;
        o = n;
      } else
        for (let s = l.nextNode(); s; s = l.nextNode())
          if (!(!i(s) || !/[\p{L}\p{N}]/u.test(s.nodeValue || ""))) {
            if (o) return null;
            o = s;
          }
      if (!o) return null;
      const u = a(o);
      for (let s = 0; s < r.length; s++)
        if (r[s].words === u) return { node: o, key: r[s].key, words: u };
      return null;
    },
    Cd = [
      "font-size",
      "font-family",
      "font-weight",
      "font-style",
      "line-height",
      "letter-spacing",
      "color",
      "text-align",
      "text-transform",
      "white-space",
      "list-style-type",
    ],
    Go = function (e, r, n) {
      const a = r.display === "list-item" || e.tagName === "LI";
      if (!a && (e.textContent || "").trim() === "") return null;
      const i = {};
      for (let o = 0; o < n.length; o++) {
        const l = n[o];
        if (
          (l === "list-style-type" && !a) ||
          (l === "text-align" && r.display === "inline")
        )
          continue;
        const u = r.getPropertyValue(l);
        u && (i[l] = u);
      }
      return i;
    },
    Sd = function (e, r, n, a, i) {
      if (e <= 0) return -1;
      if (i === "deep") return e - 1;
      if (i === "deeper" && n >= 0) return Math.min(n + 1, e - 1);
      const o = Math.max(n, a >= 0 ? a + 1 : -1);
      return o >= 0 ? Math.min(o, e - 1) : r && e > 1 ? 1 : 0;
    },
    Td = function (e, r) {
      const n = (o) => {
          const l = (o.localName || o.tagName || "").toLowerCase();
          return l.indexOf("sc-raw-") === 0 ? l.slice(7) : l;
        },
        a = (o) => {
          const l = n(o);
          return (
            /^(svg|img|video|audio|canvas|picture|iframe|object|embed|input|textarea|select|button|hr|dc-import|x-import)$/.test(
              l,
            ) ||
            l.indexOf("-") > 0 ||
            o.hasAttribute("data-sc-name") ||
            !!(o.classList && o.classList.contains("sc-host-x"))
          );
        };
      if (a(e) || r(n(e)) || e.querySelector("[data-dc-tpl]")) return !1;
      const i = e.querySelectorAll("*");
      for (let o = 0; o < i.length; o++) if (a(i[o])) return !1;
      return !(e.textContent || "").trim();
    },
    Md = function (e, r) {
      return e.left <= 1 && e.top <= 1 && e.right >= r - 1;
    },
    Uo = function (e, r) {
      return r.position === "absolute" ||
        r.position === "fixed" ||
        /^(LI|TR|TD|TH|THEAD|TBODY|TFOOT)$/i.test(e.tagName)
        ? !1
        : !/^table-/.test(r.display) && r.display !== "list-item";
    },
    $o = function (e) {
      const r = parseFloat(e.width);
      return r > 0 ? Math.ceil(r * 100) / 100 : 0;
    },
    Zo = function (e, r) {
      if (
        (e.textContent || "").trim() !== "" ||
        e.matches("img,svg,video,canvas,iframe,picture") ||
        e.querySelector("img,svg,video,canvas,iframe,picture")
      )
        return 0;
      const n = parseFloat(r.height);
      return n > 0 ? Math.ceil(n * 100) / 100 : 0;
    },
    Pd = function (e, r) {
      const n = { margin: "0px" },
        a = [e.gridRowStart, e.gridRowEnd, e.gridColumnStart, e.gridColumnEnd];
      return (
        (/grid/.test(r) || a.some((i) => !!i && i !== "auto")) &&
          (n["grid-area"] = "auto"),
        n
      );
    },
    kd = function (e, r, n) {
      const a = { lines: [], labels: [] },
        i = n > 0 && isFinite(n) ? n : 1,
        o = (h, v) =>
          v.l <= h.l + 0.01 &&
          v.t <= h.t + 0.01 &&
          v.r >= h.r - 0.01 &&
          v.b >= h.b - 0.01;
      if (o(r, e)) {
        const h = e;
        ((e = r), (r = h));
      }
      const l = o(e, r),
        u = (h, v, x, y) => {
          const m = Math.max(h, x),
            w = Math.min(v, y);
          return w > m ? (m + w) / 2 : null;
        },
        s = (h, v, x, y, m, w) => {
          const E = Math.round(Math.abs(x - v) / i);
          if (E < 1) return;
          const C = String(E);
          h === "x"
            ? (a.lines.push({
                x1: Math.min(v, x),
                y1: y,
                x2: Math.max(v, x),
                y2: y,
              }),
              a.labels.push({ x: (v + x) / 2, y, text: C, axis: h }),
              y < m
                ? a.lines.push({ x1: x, y1: y, x2: x, y2: m, ext: 1 })
                : y > w && a.lines.push({ x1: x, y1: w, x2: x, y2: y, ext: 1 }))
            : (a.lines.push({
                x1: y,
                y1: Math.min(v, x),
                x2: y,
                y2: Math.max(v, x),
              }),
              a.labels.push({ x: y, y: (v + x) / 2, text: C, axis: h }),
              y < m
                ? a.lines.push({ x1: y, y1: x, x2: m, y2: x, ext: 1 })
                : y > w &&
                  a.lines.push({ x1: w, y1: x, x2: y, y2: x, ext: 1 }));
        },
        d = u(e.t, e.b, r.t, r.b),
        p = d ?? (e.t + e.b) / 2,
        c = u(e.l, e.r, r.l, r.r),
        g = c ?? (e.l + e.r) / 2;
      return l
        ? (s("x", e.l, r.l, p, r.t, r.b),
          s("x", e.r, r.r, p, r.t, r.b),
          s("y", e.t, r.t, g, r.l, r.r),
          s("y", e.b, r.b, g, r.l, r.r),
          a)
        : (r.r <= e.l
            ? s("x", e.l, r.r, p, r.t, r.b)
            : r.l >= e.r && s("x", e.r, r.l, p, r.t, r.b),
          r.b <= e.t
            ? s("y", e.t, r.b, g, r.l, r.r)
            : r.t >= e.b && s("y", e.b, r.t, g, r.l, r.r),
          a);
    },
    Nd = function (e, r, n, a) {
      const i = { dx: 0, dy: 0, guides: [] };
      for (const o of ["x", "y"]) {
        if (a && !a[o]) continue;
        const l = o === "x" ? e.x : e.y,
          u = o === "x" ? e.w : e.h,
          s = [
            { kind: "edge", at: l },
            { kind: "center", at: l + u / 2 },
            { kind: "edge", at: l + u },
          ];
        let d = null;
        for (const p of r)
          if (!(p.axis !== o || !(typeof p.pos == "number" && isFinite(p.pos))))
            for (const c of s) {
              if (c.kind !== p.kind) continue;
              const g = p.pos - c.at,
                h = Math.abs(g);
              h <= n &&
                (!d ||
                  h < d.dist ||
                  (h === d.dist &&
                    p.kind === "center" &&
                    d.line.kind !== "center")) &&
                (d = { adjust: g, dist: h, line: p });
            }
        d &&
          (o === "x" ? (i.dx = d.adjust) : (i.dy = d.adjust),
          i.guides.push(d.line));
      }
      return i;
    },
    Ld = function (e) {
      const r = {
        defs: 1,
        title: 1,
        desc: 1,
        metadata: 1,
        style: 1,
        script: 1,
      };
      let n = null;
      for (let y = 0; y < e.children.length; y++) {
        const m = e.children[y];
        if (r[(m.tagName || "").toLowerCase()] !== 1) {
          if (n) return null;
          n = m;
        }
      }
      if (
        !n ||
        n.hasAttribute("transform") ||
        /transform\s*:/.test(n.getAttribute("style") || "")
      )
        return null;
      const a = (n.tagName || "").toLowerCase(),
        i = (y) => {
          if (y == null) return 0;
          const m = y.trim();
          return /^[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?(?:px)?$/.test(m)
            ? parseFloat(m)
            : null;
        },
        o = (y, m, w, E, C) => ({
          shaft: n,
          tag: a,
          sx: y,
          sy: m,
          ex: w,
          ey: E,
          legacy: C,
        });
      if (a === "line") {
        const y = i(n.getAttribute("x1")),
          m = i(n.getAttribute("y1")),
          w = i(n.getAttribute("x2")),
          E = i(n.getAttribute("y2"));
        return y == null || m == null || w == null || E == null
          ? null
          : o(y, m, w, E, !1);
      }
      if (a === "polyline") {
        const y = (n.getAttribute("points") || "")
          .trim()
          .split(/[\s,]+/)
          .filter((m) => m !== "")
          .map(i);
        return y.length !== 4 || y.some((m) => m == null)
          ? null
          : o(y[0], y[1], y[2], y[3], !1);
      }
      if (a !== "path") return null;
      const l = n.getAttribute("d") || "",
        u =
          l.match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];
      if (u.join("").length !== l.replace(/[\s,]/g, "").length) return null;
      const s = (y) => y != null && /^[-+.\d]/.test(y);
      if (
        u.length === 15 &&
        u[0] === "M" &&
        u[3] === "L" &&
        u[6] === "M" &&
        u[9] === "L" &&
        u[12] === "L" &&
        [1, 2, 4, 5, 7, 8, 10, 11, 13, 14].every((y) => s(u[y]))
      )
        return (e.getAttribute("preserveAspectRatio") ||
          e.getAttribute("sc-camel-preserve-aspect-ratio")) === "none" &&
          /(^|;)\s*fill:\s*none/.test(e.getAttribute("style") || "")
          ? o(+u[1], +u[2], +u[4], +u[5], !0)
          : null;
      if (
        u.length < 5 ||
        (u[0] !== "M" && u[0] !== "m") ||
        !s(u[1]) ||
        !s(u[2])
      )
        return null;
      const d = +u[1],
        p = +u[2],
        c = u[3],
        g = c === c.toLowerCase();
      let h, v, x;
      if (s(c)) {
        if (!s(u[4])) return null;
        ((h = +c), (v = +u[4]), (x = 5), u[0] === "m" && ((h += d), (v += p)));
      } else if (c === "L" || c === "l") {
        if (!s(u[4]) || !s(u[5])) return null;
        ((h = +u[4]), (v = +u[5]), (x = 6), g && ((h += d), (v += p)));
      } else if (c === "H" || c === "h") {
        if (!s(u[4])) return null;
        ((h = +u[4] + (g ? d : 0)), (v = p), (x = 5));
      } else if (c === "V" || c === "v") {
        if (!s(u[4])) return null;
        ((h = d), (v = +u[4] + (g ? p : 0)), (x = 5));
      } else return null;
      return u.length === x ? o(d, p, h, v, !1) : null;
    },
    Jo = function (e, r, n = "end") {
      const a = /^\s*url\(\s*["']?#([^"')\s]+)["']?\s*\)\s*$/.exec(
        r.getAttribute("marker-" + n) || "",
      );
      if (!a) return 0;
      const i = e.getElementsByTagName("marker");
      let o = null;
      for (let h = 0; h < i.length; h++)
        if (i[h].getAttribute("id") === a[1]) {
          o = i[h];
          break;
        }
      if (!o) return 0;
      const l = (h) =>
          o.getAttribute(h) ??
          o.getAttribute(
            "sc-camel-" + h.replace(/[A-Z]/g, (v) => "-" + v.toLowerCase()),
          ),
        u = o.getAttribute("orient") || "";
      if (
        l("viewBox") != null ||
        (l("markerUnits") ?? "strokeWidth") !== "strokeWidth" ||
        !(n === "start" ? u === "auto-start-reverse" : /^auto/.test(u))
      )
        return 0;
      const s = o.getElementsByTagName("path")[0],
        d = (s && s.getAttribute("d")) || "";
      if (!s || s.hasAttribute("transform") || !/^[MLZz\d\s,.+-]+$/.test(d))
        return 0;
      const p = d.match(/[-+]?(?:\d+\.?\d*|\.\d+)/g) || [];
      let c = -1 / 0;
      for (let h = 0; h + 1 < p.length; h += 2)
        c = Math.max(c, parseFloat(p[h]));
      o.getAttribute("overflow") !== "visible" &&
        !/(^|;)\s*overflow\s*:\s*visible/.test(o.getAttribute("style") || "") &&
        (c = Math.min(c, parseFloat(l("markerWidth") || "3") || 0));
      const g = c - parseFloat(l("refX") || "0");
      return g > 0 && g < 64 ? g : 0;
    },
    Rd = function (e, r, n, a, i) {
      const o = Math.hypot(n - e, a - r);
      if (!(o > 0) || !(i > 0)) return { x: n, y: a };
      const l = Math.max(o - i, Math.min(o, 0.5)) / o,
        u = (s) => Math.round(s * 100) / 100;
      return { x: u(e + (n - e) * l), y: u(r + (a - r) * l) };
    },
    Qo = function (e, r) {
      const n = Math.hypot(e.ex - e.sx, e.ey - e.sy);
      return n > 0 && r > 0
        ? {
            x: e.ex + ((e.ex - e.sx) * r) / n,
            y: e.ey + ((e.ey - e.sy) * r) / n,
          }
        : { x: e.ex, y: e.ey };
    },
    jo = function (e, r, n, a) {
      const i = n(e);
      if (i === e) return e;
      for (let o = 0; r && o < r.length; o++)
        if (r[o].el === i) return r[o].sep ? i : e;
      return a(i) ? i : e;
    },
    Dd = function (e, r, n) {
      if (!e || !(e.back > 0 || e.startBack > 0)) return null;
      const a = r.left + (e.px / e.vbW) * r.width,
        i = r.top + (e.py / e.vbH) * r.height,
        o = r.left + (e.tx / e.vbW) * r.width,
        l = r.top + (e.ty / e.vbH) * r.height,
        u = e.px === e.tx,
        s = e.py === e.ty,
        d = u ? n.left : Math.min(a, o, n.left),
        p = u ? n.right : Math.max(a, o, n.right),
        c = s ? n.top : Math.min(i, l, n.top),
        g = s ? n.bottom : Math.max(i, l, n.bottom);
      return {
        left: d,
        top: c,
        right: p,
        bottom: g,
        width: p - d,
        height: g - c,
      };
    },
    Bd = function (e, r, n) {
      const a = Math.min(r.x, n.x),
        i = Math.min(r.y, n.y),
        o = Math.abs(n.x - r.x) / e.scl,
        l = Math.abs(n.y - r.y) / e.scl,
        u = Math.max(Math.round(o), 8),
        s = Math.max(Math.round(l), 8),
        d = (u - o) / 2,
        p = (s - l) / 2,
        c = (E) => Math.round(E * 100) / 100;
      let g = c(d + (r.x - a) / e.scl),
        h = c(p + (r.y - i) / e.scl),
        v = c(d + (n.x - a) / e.scl),
        x = c(p + (n.y - i) / e.scl);
      const y = e.back && e.back > 0 ? e.back : 0,
        m = e.startBack && e.startBack > 0 ? e.startBack : 0,
        w = Math.hypot(v - g, x - h);
      if (y + m > 0 && w > 0) {
        const E = Math.min(w, 0.5),
          C = w - m - y >= E,
          S = m > 0 && y > 0 ? 1e4 : 100,
          T = (V) => Math.round(V * S) / S,
          k = C ? m : ((w - E) * m) / (m + y),
          L = C ? w - y : k + E,
          P = g,
          N = h,
          F = (v - g) / w,
          q = (x - h) / w;
        (m > 0 && ((g = T(P + F * k)), (h = T(N + q * k))),
          (v = T(P + F * L)),
          (x = T(N + q * L)));
      }
      return {
        left: Math.round(e.startLeft + (a - e.startRect.left) / e.scl - d),
        top: Math.round(e.startTop + (i - e.startRect.top) / e.scl - p),
        w: u,
        h: s,
        sx: g,
        sy: h,
        ex: v,
        ey: x,
        d: "M " + g + " " + h + " L " + v + " " + x,
      };
    },
    tl = function (e) {
      const r = {};
      for (const n of (e.tagName || "").toLowerCase() === "line"
        ? ["x1", "y1", "x2", "y2"]
        : ["d", "points"])
        r[n] = e.getAttribute(n);
      return r;
    },
    Kd = function (e, r, n, a, i) {
      const o = (e.tagName || "").toLowerCase();
      o === "line"
        ? (e.setAttribute("x1", String(r)),
          e.setAttribute("y1", String(n)),
          e.setAttribute("x2", String(a)),
          e.setAttribute("y2", String(i)))
        : o === "polyline"
          ? e.setAttribute("points", r + "," + n + " " + a + "," + i)
          : e.setAttribute("d", "M " + r + " " + n + " L " + a + " " + i);
    },
    Gn = function (e, r) {
      const n = {
          defs: 1,
          marker: 1,
          metadata: 1,
          title: 1,
          desc: 1,
          style: 1,
        },
        a = (i) => {
          for (let o = 0; o < i.children.length; o++) {
            const l = i.children[o],
              u = (l.tagName || "").toLowerCase();
            if (!(n[u] === 1 || r(l)) && !(u === "g" && a(l))) return !1;
          }
          return !0;
        };
      return a(e);
    },
    el = function (e, r, n) {
      return r && r !== e && r.contains(e) && n(r, (a) => a === e) ? r : e;
    },
    Fd = function (e, r) {
      const n = (a, i) => a < r && (i >= r || (a === 0 && i > 0));
      return n(e.height, e.width)
        ? {
            left: e.left,
            top: e.top - (r - e.height) / 2,
            width: e.width,
            height: r,
          }
        : n(e.width, e.height)
          ? {
              left: e.left - (r - e.width) / 2,
              top: e.top,
              width: r,
              height: e.height,
            }
          : e;
    },
    Od = function (e, r) {
      let [n, a, i, o] = [0, 0, 1 / 0, 1 / 0];
      for (const u of r)
        (u.w > 0 &&
          u.min?.w !== void 0 &&
          u.w >= u.min.w &&
          (n = Math.max(n, u.min.w / u.w)),
          u.h > 0 &&
            u.min?.h !== void 0 &&
            u.h >= u.min.h &&
            (a = Math.max(a, u.min.h / u.h)),
          u.w > 0 &&
            u.max?.w !== void 0 &&
            u.w <= u.max.w &&
            (i = Math.min(i, u.max.w / u.w)),
          u.h > 0 &&
            u.max?.h !== void 0 &&
            u.h <= u.max.h &&
            (o = Math.min(o, u.max.h / u.h)));
      const l = (u, s) => (s === 1 / 0 ? 1 / 0 : u * s);
      return {
        min: { w: e.w * n, h: e.h * a },
        max: { w: l(e.w, i), h: l(e.h, o) },
      };
    },
    Xd = function (e, r, n) {
      const [a, i] = [r.w > 0 ? n.w / r.w : 1, r.h > 0 ? n.h / r.h : 1];
      return { x: n.x + (e.x - r.x) * a, y: n.y + (e.y - r.y) * i };
    },
    ei = function (e, r, n) {
      const a = (n * Math.PI) / 180,
        [i, o, l, u] = [Math.cos(a), Math.sin(a), e.x - r.x, e.y - r.y];
      return { x: r.x + l * i - u * o, y: r.y + l * o + u * i };
    },
    rl = function (e, r) {
      let n = r ? Math.round(e / 15) * 15 : Math.round(e);
      const a = Math.round(e / 90) * 90;
      return (
        !r && Math.abs(e - a) <= 3 && (n = a),
        (n = ((n % 360) + 360) % 360),
        n > 180 ? n - 360 : n
      );
    },
    nl = function (e, r) {
      const n = r.x - e.x,
        a = r.y - e.y,
        i = Math.hypot(n, a),
        o = ((Math.round(Math.atan2(a, n) / (Math.PI / 4)) % 8) + 8) % 8,
        l = Math.SQRT1_2,
        u = [1, l, 0, -l, -1, -l, 0, l][o],
        s = [0, l, 1, l, 0, -l, -1, -l][o];
      return { x: e.x + i * u, y: e.y + i * s };
    },
    al = function (e, r) {
      const n = [],
        a = [];
      for (const [m, w] of e)
        (n.length === 0 || m !== n[n.length - 1] || w !== a[a.length - 1]) &&
          (n.push(m), a.push(w));
      const i = n.length;
      if (i < 2) return null;
      if (i === 2) return [n[0], a[0], n[1], a[1]];
      const o = (m, w) => {
          const E = Math.sqrt(m * m + w * w);
          return E > 0 ? [m / E, w / E] : [0, 0];
        },
        l = [n[0], a[0]],
        u = (m, w, E, C, S, T) => {
          l.push(m, w, E, C, S, T);
        },
        s = Array(i).fill(0),
        d = r * r,
        p = (m, w) => Math.sqrt((n[m] - n[w]) ** 2 + (a[m] - a[w]) ** 2),
        c = (m, w) => {
          const E = w > m ? 1 : -1;
          let C = m + E;
          for (; C !== w && p(m, C) < 4 * r;) C += E;
          return o(n[C] - n[m], a[C] - a[m]);
        },
        g = (m, w, E, C, S, T) => {
          const k = n[m],
            L = a[m],
            P = n[w],
            N = a[w];
          let F = 0,
            q = 0,
            V = 0,
            j = 0,
            K = 0;
          for (let rt = m; rt <= w; rt++) {
            const vt = s[rt - m],
              mt = 1 - vt,
              Pt = 3 * mt * mt * vt,
              G = 3 * mt * vt * vt,
              lt = mt * mt * mt + Pt,
              nt = G + vt * vt * vt,
              dt = E * Pt,
              oe = C * Pt,
              Ot = S * G,
              Xt = T * G,
              Jt = n[rt] - k * lt - P * nt,
              Rt = a[rt] - L * lt - N * nt;
            ((F += dt * dt + oe * oe),
              (q += dt * Ot + oe * Xt),
              (V += Ot * Ot + Xt * Xt),
              (j += dt * Jt + oe * Rt),
              (K += Ot * Jt + Xt * Rt));
          }
          const J = F * V - q * q;
          let W = 0,
            H = 0;
          Math.abs(J) > 1e-12
            ? ((W = (j * V - K * q) / J), (H = (F * K - q * j) / J))
            : Math.abs(F + q) > 1e-12 && (W = H = j / (F + q));
          const Z = P - k,
            pt = N - L,
            st = Math.sqrt(Z * Z + pt * pt);
          return (
            (W < 1e-6 * st ||
              H < 1e-6 * st ||
              W * (E * Z + C * pt) - H * (S * Z + T * pt) > st * st) &&
              (W = H = st / 3),
            [k + E * W, L + C * W, P + S * H, N + T * H]
          );
        },
        h = (m, w, E, C, S, T) => {
          const k = n[m],
            L = a[m],
            P = n[w],
            N = a[w];
          if (w - m === 1) {
            const Z = Math.sqrt((P - k) * (P - k) + (N - L) * (N - L)),
              [pt, st] = o(P - k, N - L),
              rt = (Z / 3) * Math.max(0.05, E * pt + C * st),
              vt = (Z / 3) * Math.max(0.05, -(S * pt + T * st));
            u(k + E * rt, L + C * rt, P + S * vt, N + T * vt, P, N);
            return;
          }
          s[0] = 0;
          for (let Z = m + 1; Z <= w; Z++)
            s[Z - m] =
              s[Z - m - 1] +
              Math.sqrt((n[Z] - n[Z - 1]) ** 2 + (a[Z] - a[Z - 1]) ** 2);
          for (let Z = 1; Z <= w - m; Z++)
            s[Z] = s[w - m] > 0 ? s[Z] / s[w - m] : 0;
          let F = (m + w) >> 1,
            q = 4 * d;
          for (let Z = 0; Z <= 4; Z++) {
            const [pt, st, rt, vt] = g(m, w, E, C, S, T);
            let mt = 0,
              Pt = (m + w) >> 1,
              G = !0;
            for (let lt = m + 1; lt < w; lt++) {
              const nt = s[lt - m],
                dt = 1 - nt,
                oe = 3 * dt * dt * nt,
                Ot = 3 * dt * nt * nt,
                Xt =
                  dt * dt * dt * k +
                  oe * pt +
                  Ot * rt +
                  nt * nt * nt * P -
                  n[lt],
                Jt =
                  dt * dt * dt * L +
                  oe * st +
                  Ot * vt +
                  nt * nt * nt * N -
                  a[lt];
              Xt * Xt + Jt * Jt >= mt && ((mt = Xt * Xt + Jt * Jt), (Pt = lt));
              const Rt =
                  3 *
                  (dt * dt * (pt - k) +
                    2 * dt * nt * (rt - pt) +
                    nt * nt * (P - rt)),
                le =
                  3 *
                  (dt * dt * (st - L) +
                    2 * dt * nt * (vt - st) +
                    nt * nt * (N - vt)),
                tn = 6 * (dt * (rt - 2 * pt + k) + nt * (P - 2 * rt + pt)),
                en = 6 * (dt * (vt - 2 * st + L) + nt * (N - 2 * vt + st)),
                Nr = Rt * Rt + le * le + Xt * tn + Jt * en,
                rn = Math.abs(Nr) > 1e-9 ? nt - (Xt * Rt + Jt * le) / Nr : nt;
              ((rn <= s[lt - m - 1] || rn >= 1) && (G = !1), (s[lt - m] = rn));
            }
            if (mt < d) {
              u(pt, st, rt, vt, P, N);
              return;
            }
            if (((F = Pt), mt >= q || !G)) break;
            q = mt;
          }
          const [V, j] = c(F, m),
            [K, J] = c(F, w),
            [W, H] = o(V - K, j - J);
          (h(m, F, E, C, W, H), h(F, w, -W, -H, S, T));
        },
        v = (m, w) => {
          let [E, C] = [n[m], a[m]];
          for (let S = m + 1; S < w; S++) {
            const [T, k] = [n[S], a[S]];
            (p(S, S + 1) < 4 * r &&
              Math.sqrt((T - E) ** 2 + (k - C) ** 2) < 4 * r &&
              ((n[S] = (E + 2 * T + n[S + 1]) / 4),
              (a[S] = (C + 2 * k + a[S + 1]) / 4)),
              ([E, C] = [T, k]));
          }
          h(m, w, ...c(m, w), ...c(w, m));
        };
      let x = 0;
      const y = (m) => {
        if (
          m <= x ||
          m + 1 >= i ||
          p(m, m - 1) > 16 * r ||
          p(m, m + 1) > 16 * r
        )
          return 1;
        let [w, E] = [m - 1, m + 1];
        for (; w > x && p(m, w) < 4 * r;) w--;
        for (; E < i - 1 && p(m, E) < 4 * r;) E++;
        const [C, S] = o(n[m] - n[w], a[m] - a[w]),
          [T, k] = o(n[E] - n[m], a[E] - a[m]);
        return C * T + S * k;
      };
      for (let m = 1; m + 1 < i; m++) {
        const w = y(m);
        w < 0.5 && w <= y(m + 1) && (v(x, m), (x = m));
      }
      return (v(x, i - 1), l);
    },
    il = function (e, r) {
      const n = Math.pow(10, r),
        a = (o) => {
          let l = (Math.round(o * n) / n).toFixed(r);
          return (
            l.indexOf(".") >= 0 && (l = l.replace(/\.?0+$/, "")),
            l === "-0" ? "0" : l
          );
        };
      let i = "M" + a(e[0]) + " " + a(e[1]);
      if (e.length === 4) return i + " L" + a(e[2]) + " " + a(e[3]);
      for (let o = 2; o < e.length; o++)
        i += ((o - 2) % 6 === 0 ? " C" : " ") + a(e[o]);
      return i;
    },
    xt = "#2a78d6",
    Lr = 1;
  function Gt(t) {
    return t / Lr;
  }
  var Un = !1;
  function sn(t) {
    Un !== !!t && ((Un = !!t), _r());
  }
  var Rr = !1,
    ur = null,
    $n = !1;
  function Zn(t) {
    Rr !== !!t && ((Rr = !!t), _d());
  }
  function _d() {
    !I ||
      b ||
      D !== "select" ||
      !Rn ||
      !ur ||
      U ||
      Mt ||
      At ||
      ht ||
      ot ||
      O ||
      gt ||
      B ||
      f ||
      ol(document.elementFromPoint(ur.x, ur.y));
  }
  function ol(t) {
    var e = gn(t, Rr ? "deep" : "click", A, R);
    if (e && e.el && !e.page) {
      hi(e.el.getAttribute("data-dc-tpl"), _(e.el));
      return;
    }
    var r = t && t.nodeType === 1 ? t : t ? t.target : null;
    ri(
      e === "empty" ||
        !!(e && e.page) ||
        (Rr && e === "unstamped" && bl(r) === "artboard"),
    );
  }
  function ri(t) {
    (($n = !!t), vi(), Pn());
  }
  var U = null,
    f = null;
  function Wd(t) {
    return !!t.ctrlKey;
  }
  function ll(t, e, r) {
    (e.startW > 0 && (t.width = +e.startW.toFixed(2) + "px"),
      e.startH > 0 && (t.height = +e.startH.toFixed(2) + "px"));
    var n = Pd(e.startLines, r);
    for (var a in n) t[a] = n[a];
    return t;
  }
  var sr = null,
    dn = null,
    ni = !1;
  function ul(t) {
    ((rr = !1),
      t.pointerType === "mouse" && (dn = t.pointerId),
      (ni = t.pointerType === "touch"),
      (Dt = !1),
      t.button === 0 && (Jn = Wn(t)),
      t.isTrusted && t.button === 0 && !(t.timeStamp < Pr) && (kr = !1));
  }
  function sl(t) {
    t.pointerType === "mouse" && (ni = !1);
  }
  function Hd() {
    if (dn != null)
      try {
        document.documentElement.setPointerCapture(dn);
      } catch {}
  }
  function Yd() {
    if (dn != null)
      try {
        document.documentElement.releasePointerCapture(dn);
      } catch {}
  }
  var Dt = !1,
    Jn = !1,
    At = null,
    ht = null,
    Dr = null,
    fn = null,
    ct = null,
    D = "select",
    wt = null,
    Mt = null,
    B = null,
    ai = null,
    be = null,
    cn = null,
    de = null,
    Qn = [],
    ii = !1,
    te = null,
    Br = null,
    dl = null,
    oi = 0,
    pn = null,
    O = null,
    gt = null,
    Be = [],
    jn = null,
    ot = null,
    kt = null,
    Nt = null,
    Ge = null;
  function fe() {
    return (
      (Ge && Ge.isConnected) ||
        ((Ge = document.createElement("div")),
        Ge.setAttribute("data-dc-editor-overlay-root", ""),
        Ge.setAttribute("data-dc-editor-overlay", ""),
        document.documentElement.appendChild(Ge)),
      Ge
    );
  }
  function It(t, e) {
    return String(e || "") + "\0" + String(t);
  }
  function Ut(t) {
    for (
      var e = document.querySelectorAll("[" + t + "]"), r = 0;
      r < e.length;
      r++
    )
      e[r].removeAttribute(t);
  }
  function Q(t) {
    if (
      t &&
      t.classList &&
      t.classList.contains("sc-host-x") &&
      t.firstElementChild
    )
      try {
        if (getComputedStyle(t).display === "contents")
          return t.firstElementChild;
      } catch {}
    return t;
  }
  function it(t) {
    var e = t.closest("[data-sc-name]");
    return e ? e.getAttribute("data-sc-name") : null;
  }
  var fl = {};
  function zd(t) {
    var e = t && t.parentElement;
    if (
      !e ||
      !e.classList.contains("sc-host-x") ||
      e.firstElementChild !== t ||
      t.getAttribute("data-dc-tpl") != null
    )
      return null;
    try {
      return getComputedStyle(e).display === "contents" ? e : null;
    } catch {
      return null;
    }
  }
  function li(t) {
    if (t && t.hasAttribute && t.hasAttribute("data-sc-name"))
      return (
        !!(t.parentElement && t.parentElement.closest("[data-sc-name]")) &&
        !!Vo("dc-import", { name: t.getAttribute("data-sc-name") || "" })
      );
    var e = t && t.classList && t.classList.contains("sc-host-x") ? t : zd(t);
    if (!e || e.getAttribute("data-dc-tpl") == null) return !1;
    var r = it(e),
      n = null;
    try {
      n =
        r != null && window.__dcAnnotatedTemplate
          ? window.__dcAnnotatedTemplate(r)
          : null;
    } catch {}
    if (typeof n != "string") return !1;
    var a = fl[r];
    return (
      (!a || a.src !== n) && (a = fl[r] = { src: n, tids: Ad(n, Vo) }),
      a.tids[e.getAttribute("data-dc-tpl")] === 1
    );
  }
  function _(t) {
    return t.hasAttribute("data-sc-name")
      ? t.parentElement
        ? it(t.parentElement)
        : null
      : it(t);
  }
  function _t() {
    return document.querySelector(".sc-host:not(.sc-host .sc-host)");
  }
  var ta = {
    path: 1,
    line: 1,
    circle: 1,
    rect: 1,
    ellipse: 1,
    polygon: 1,
    polyline: 1,
  };
  function cl(t) {
    if (!t || !t.closest) return t;
    var e = t.closest("svg[data-dc-tpl]");
    if (!e || e === t || _(e) !== _(t)) return t;
    var r = (t.tagName || "").toLowerCase();
    return ta[r] === 1 && t.getAttribute("data-dc-tpl") != null ? t : e;
  }
  function Et(t) {
    if (!t || !t.closest || !t.getAttribute) return t;
    var e = (t.tagName || "").toLowerCase();
    if (ta[e] !== 1) return t;
    var r = t.closest("svg[data-dc-tpl]");
    return r && r !== t && _(r) === _(t) ? r : t;
  }
  function ui(t) {
    var e = t.getBoundingClientRect();
    return ta[(t.tagName || "").toLowerCase()] === 1 ? Fd(e, 8) : e;
  }
  function dr(t) {
    var e = _t(),
      r = e ? e.getAttribute("data-sc-name") : null;
    if (!r || t === e || _(t) === r) return t;
    for (var n = t.closest("[data-sc-name]"); n && n !== e;) {
      var a = n.parentElement;
      if (a && it(a) === r)
        return n.getAttribute("data-dc-tpl") != null ? n : t;
      n = a ? a.closest("[data-sc-name]") : null;
    }
    return t;
  }
  function qd(t) {
    var e = _t(),
      r = e ? e.getAttribute("data-sc-name") : null;
    return !r || _(t) === r
      ? !0
      : t.hasAttribute("data-sc-name") &&
          t.parentElement != null &&
          it(t.parentElement) === r;
  }
  function si() {
    return _t() || document.body;
  }
  function fr() {
    var t = si();
    return t ? t.getAttribute("data-sc-name") || it(t) : null;
  }
  var Vd = /^(helmet|sc-helmet|script|style|link|noscript|template)$/i;
  function pl() {
    var t = si();
    if (!t) return [];
    var e = fr(),
      r = [];
    return (
      (function n(a) {
        for (var i = a.firstElementChild; i; i = i.nextElementSibling)
          if (!(
            i.hasAttribute("data-dc-editor-overlay") || Vd.test(i.tagName || "")
          )) {
            if (i.getAttribute("data-dc-tpl") != null) {
              (!e || _(i) === e) && r.push(i);
              continue;
            }
            n(i);
          }
      })(t),
      r
    );
  }
  function cr() {
    var t = pl();
    return t.length === 1 ? t[0] : null;
  }
  function vl() {
    var t = pl();
    if (t.length === 0) return !0;
    if (t.length !== 1) return !1;
    var e = t[0];
    return Ee(e) || Ae(e) || $l(e, e.querySelectorAll("*"))
      ? !1
      : Td(e, function (r) {
          return Sl.test(r);
        });
  }
  function di(t, e) {
    if (!fr() || !vl()) return !1;
    var r = cr(),
      n =
        r &&
        t &&
        t.indexOf(parseInt(r.getAttribute("data-dc-tpl"), 10)) >= 0 &&
        (e == null || e === fr());
    return !n;
  }
  function Gd(t, e, r, n) {
    if (
      t !== e ||
      document.documentElement.hasAttribute("data-dc-frameless") ||
      t !== cr() ||
      (r &&
        r.indexOf(parseInt(t.getAttribute("data-dc-tpl"), 10)) >= 0 &&
        (n == null || n === _(t))) ||
      !ma(t)
    )
      return !1;
    var a = document.scrollingElement || document.documentElement,
      i = t.getBoundingClientRect();
    return Md(
      {
        left: i.left + a.scrollLeft,
        top: i.top + a.scrollTop,
        right: i.right + a.scrollLeft,
      },
      document.documentElement.clientWidth,
    );
  }
  function vn(t) {
    var e = si(),
      r = fr(),
      n = [],
      a = t,
      i = null;
    for (
      ta[(t.tagName || "").toLowerCase()] === 1 &&
      (i = t.closest("svg[data-dc-tpl]"));
      a && a.getAttribute && a !== e;
    )
      (a !== i &&
        a.getAttribute("data-dc-tpl") != null &&
        (!r || _(a) === r) &&
        !Ae(a) &&
        !a.closest("[data-dc-editor-overlay]") &&
        n.unshift(a),
        (a = a.parentElement));
    return n;
  }
  var ut = null;
  function Ke(t, e) {
    qt();
    var r = parseInt(t.getAttribute("data-dc-tpl"), 10),
      n = _(t);
    (e && R === n && A.length > 0
      ? A.indexOf(r) < 0 && A.push(r)
      : ((A = [r]), (R = n)),
      (ft = null),
      yt(),
      Ct(Fe(t), void 0, e));
  }
  var Kr = { key: "", els: [] };
  function Ud(t, e) {
    var r = e + "|" + t.join(",");
    if (
      Kr.key === r &&
      Kr.els.every(function (l) {
        return l.isConnected;
      })
    )
      return Kr.els;
    for (var n = [], a = 0; a < t.length; a++)
      for (var i = z(String(t[a]), e), o = 0; o < i.length; o++) n.push(i[o]);
    return ((Kr = { key: r, els: n }), n);
  }
  var Wt = !1;
  function hl(t) {
    var e = t[t.length - 1];
    return e && xr(Et(e)) ? e : null;
  }
  function $d(t) {
    var e = t[t.length - 1];
    if (!e || !ee(_(e)) || !Hr(e)) return null;
    var r = Et(e),
      n = A.length === 1 && R === _(e) ? String(A[0]) : null;
    return n === e.getAttribute("data-dc-tpl") ||
      (n === r.getAttribute("data-dc-tpl") &&
        Gn(r, function (a) {
          return a === e;
        }))
      ? e
      : null;
  }
  function ea(t, e, r, n) {
    var a = e === "click";
    a && (e = "plain");
    var i = vn(t);
    if (!i.length) return null;
    if (Wt && e === "plain" && hl(i)) return i[i.length - 1];
    var o = fr(),
      l = -1,
      u = -1;
    if (r && r.length)
      for (var s = Ud(r, n ?? o), d = 0; d < s.length; d++)
        for (var p = i.length - 1; p >= 0; p--) {
          if (i[p] === s[d]) {
            p > l && (l = p);
            break;
          }
          if (i[p].contains(s[d])) {
            p > u && (u = p);
            break;
          }
        }
    var c = Sd(i.length, i[0] === cr(), l, u, e);
    if (a && c >= 0 && !ra(i[c])) {
      var g = gl(i, c);
      g >= 0 && (c = g);
    }
    return c < 0 ? null : i[c];
  }
  function ra(t) {
    return !!Vt[It(parseInt(t.getAttribute("data-dc-tpl"), 10), it(t))];
  }
  function gl(t, e) {
    for (var r = e + 1; r < t.length; r++) if (ra(t[r])) return r;
    return -1;
  }
  function ml(t, e) {
    if (!e || e === t || !t.contains(e)) return null;
    var r = vn(e),
      n = r.indexOf(t),
      a = n >= 0 ? gl(r, n) : -1;
    return a >= 0 ? r[a] : null;
  }
  function yl(t, e, r) {
    if (!Array.isArray(r) || !r.length) return null;
    for (var n = {}, a = 0; a < r.length; a++) n[r[a]] = !0;
    var i = function (s) {
      return !!n[parseInt(s.getAttribute("data-dc-tpl"), 10)];
    };
    if (i(t)) return null;
    var o = vn(e),
      l = o.indexOf(t);
    if (l < 0) return null;
    for (var u = l + 1; u < o.length; u++) if (i(o[u])) return o[u];
    return null;
  }
  function hn(t) {
    return dr(cl(t));
  }
  function gn(t, e, r, n) {
    var a = t && t.nodeType === 1 ? t : t ? t.target : null;
    if (!a || a.nodeType !== 1 || !a.closest) return null;
    if (di(r, n)) return "empty";
    var i = he(t) ? null : a.closest("[data-dc-tpl]");
    if (!i) return "unstamped";
    var o = hn(i),
      l = ea(o, e, r, n),
      u = ni && t.nodeType !== 1;
    return {
      el: l || o,
      hit: o,
      ruled: !!l,
      page: e !== "deep" && !u && Gd(l, o, r, n),
    };
  }
  function bl(t) {
    var e = _t(),
      r =
        t !== document.body &&
        t !== document.documentElement &&
        !(e && t.contains(e)) &&
        !t.querySelector("[data-dc-tpl]") &&
        !t.closest("[data-dc-editor-overlay]") &&
        !t.closest("[data-dc-tpl]");
    return r ? "foreign" : "artboard";
  }
  function xl(t, e, r) {
    var n = gn(t, e, r, null);
    return n && n.el && qd(n.hit) ? n : null;
  }
  function z(t, e) {
    for (
      var r = document.querySelectorAll('[data-dc-tpl="' + t + '"]'),
        n = [],
        a = 0;
      a < r.length;
      a++
    )
      _(r[a]) === e && n.push(r[a]);
    return n;
  }
  var Ie = null;
  function Ir(t) {
    if (typeof t != "string" || t.indexOf("rgb") === 0) return t;
    try {
      if (!Ie) {
        var e = document.createElement("canvas");
        ((e.width = e.height = 1),
          (Ie = e.getContext("2d", { willReadFrequently: !0 })));
      }
      if (
        !Ie ||
        ((Ie.fillStyle = "#010203"),
        (Ie.fillStyle = t),
        Ie.fillStyle === "#010203")
      )
        return t;
      (Ie.clearRect(0, 0, 1, 1), Ie.fillRect(0, 0, 1, 1));
      var r = Ie.getImageData(0, 0, 1, 1).data;
      return r[3] === 255
        ? "rgb(" + r[0] + ", " + r[1] + ", " + r[2] + ")"
        : "rgba(" +
            r[0] +
            ", " +
            r[1] +
            ", " +
            r[2] +
            ", " +
            Math.round(r[3] / 2.55) / 100 +
            ")";
    } catch {
      return t;
    }
  }
  var Zd = /^[A-Za-z_][A-Za-z0-9_-]{0,31}$/,
    Jd = /^[a-z][a-z0-9-]{0,23}$/,
    Qd = 8;
  function jd(t) {
    try {
      return document.querySelector("#" + t.id) === t;
    } catch {
      return !1;
    }
  }
  function tf(t) {
    for (
      var e = [], r = [], n = t;
      n &&
      n.nodeType === 1 &&
      n !== document.body &&
      n !== document.documentElement;
    ) {
      if (n.id && Zd.test(n.id) && jd(n)) {
        (e.push("#" + n.id), r.push(n));
        break;
      }
      for (
        var a = n.tagName.toLowerCase(), i = 1, o = n;
        (o = o.previousElementSibling);
      )
        o.tagName === n.tagName && i++;
      (!Jd.test(a) || i > 9999
        ? ((e = []), (r = []))
        : (e.push(a + ":nth-of-type(" + i + ")"), r.push(n)),
        (n = n.parentElement));
    }
    if (!e.length) return { path: null, el: null };
    var l = Math.max(0, e.length - Qd);
    return { path: e.slice(l).reverse().join(" > "), el: r[l] };
  }
  function ef(t) {
    var e = String(t.tagName || "").toLowerCase(),
      r = "";
    try {
      if (
        ((r =
          e === "img"
            ? t.getAttribute("alt") || ""
            : e === "input" || e === "textarea"
              ? t.getAttribute("placeholder") ||
                t.getAttribute("aria-label") ||
                ""
              : wl(t, "aria-label") || ""),
        !r)
      ) {
        var n = function (a) {
          if (!(r.length >= 160)) {
            if (a.nodeType === 3)
              r = (r + a.data).replace(/\s+/g, " ").trimStart();
            else if (
              a.nodeType === 1 &&
              !/^(style|script|template)$/i.test(a.tagName)
            )
              for (var i = a.firstChild; i; i = i.nextSibling) n(i);
          }
        };
        n(t);
      }
    } catch {
      r = "";
    }
    return {
      tag: e,
      text: String(r).slice(0, 400).replace(/\s+/g, " ").trim().slice(0, 120),
    };
  }
  function wl(t, e) {
    var r = t.getAttribute(e);
    if (!t.hasAttribute("data-dc-editor-named")) return r;
    var n =
      t.getAttribute("data-dc-editor-named") === "one-line" ? "false" : "true";
    return (e === "role" && r === "textbox") ||
      (e === "aria-label" && r === "Edit text") ||
      (e === "aria-multiline" && r === n)
      ? null
      : r;
  }
  function fi(t) {
    var e = "",
      r = function (o) {
        for (var l = o.firstChild; l && e.length < 4096; l = l.nextSibling)
          l.nodeType === 3
            ? (e += l.data)
            : l.nodeType === 1 &&
              !/^(style|script|template)$/i.test(l.tagName) &&
              r(l);
      };
    try {
      r(t);
    } catch {
      return "";
    }
    if (
      ((e = e
        .slice(0, 4096)
        .replace(
          /[\t\n\v\f\r \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/g,
          " ",
        )
        .replace(/^ | $/g, "")),
      !e)
    )
      return "";
    for (
      var n = String(t.tagName || "").toLowerCase() + ":" + e,
        a = 2166136261,
        i = 0;
      i < n.length;
      i++
    )
      a = Math.imul(a ^ n.charCodeAt(i), 16777619);
    return "x" + ("000000" + (a >>> 0).toString(36)).slice(-7);
  }
  function na(t) {
    if (t.getClientRects().length) return t.getBoundingClientRect();
    for (var e = null, r = null, n = t.firstChild; n; n = n.nextSibling) {
      var a = null;
      if (n.nodeType === 1)
        a =
          getComputedStyle(n).display === "contents"
            ? na(n)
            : n.getBoundingClientRect();
      else if (n.nodeType === 3) {
        var i = yi(n);
        a = i && i.getBoundingClientRect();
      }
      if (a) {
        if (!(a.width > 0 && a.height > 0)) {
          !r && (a.width || a.height || a.left || a.top) && (r = a);
          continue;
        }
        if (!e) {
          e = a;
          continue;
        }
        var o = Math.min(e.left, a.left),
          l = Math.min(e.top, a.top),
          u = Math.max(e.right, a.right),
          s = Math.max(e.bottom, a.bottom);
        e = {
          left: o,
          top: l,
          right: u,
          bottom: s,
          width: u - o,
          height: s - l,
        };
      }
    }
    return e || r || t.getBoundingClientRect();
  }
  function ci() {
    var t = document.documentElement;
    return {
      x: -(window.scrollX || 0),
      y: -(window.scrollY || 0),
      w: Math.max(t ? t.scrollWidth : 0, window.innerWidth || 0),
      h: Math.max(t ? t.scrollHeight : 0, window.innerHeight || 0),
    };
  }
  function pi(t, e, r) {
    (t && t.nodeType !== 1 && (t = t.parentElement),
      t &&
        t.closest &&
        t.closest(
          "[data-dc-editor-overlay],[data-dc-editor-overlay-root],[data-omelette-chrome],[data-omelette-injected]",
        ) &&
        (t = null),
      t && t.closest && (t = cl(t.closest("[data-dc-tpl]") || t)));
    var n = t ? tf(t) : { path: null, el: null };
    if (!n.el) {
      var a = window.innerWidth || 1,
        i = window.innerHeight || 1;
      return {
        path: null,
        rect: { x: 0, y: 0, w: a, h: i },
        page: ci(),
        fx: e == null ? 0.5 : Math.min(1, Math.max(0, e / a)),
        fy: r == null ? 0.5 : Math.min(1, Math.max(0, r / i)),
      };
    }
    var o = _t(),
      l = o ? o.getAttribute("data-sc-name") : null,
      u =
        t.hasAttribute("data-dc-tpl") && l && _(t) === l
          ? parseInt(t.getAttribute("data-dc-tpl") || "-1", 10)
          : -1;
    (isFinite(u) && u >= 0) || (u = -1);
    var s = n.el,
      d = u >= 0 ? z(String(u), l) : [];
    d.indexOf(s) < 0 && d.length === 1 && (s = d[0]);
    var p = d.length === 1 && d[0] === t;
    try {
      p = p && document.querySelector(n.path) === t;
    } catch {
      p = !1;
    }
    var c = na(s),
      g = ef(s);
    return {
      path: n.path,
      tid: u >= 0 ? u : null,
      fp: p ? fi(t) : "",
      page: ci(),
      rect: { x: c.left, y: c.top, w: c.width, h: c.height },
      fx:
        e == null || !(c.width > 0)
          ? 0.5
          : Math.min(1, Math.max(0, (e - c.left) / c.width)),
      fy:
        r == null || !(c.height > 0)
          ? 0.5
          : Math.min(1, Math.max(0, (r - c.top) / c.height)),
      tag: g.tag,
      text: g.text,
    };
  }
  function mn(t, e) {
    var r = z(String(t), e);
    if (r.length || !te || (e || null) !== Br) return r;
    var n = te[t];
    if (!n) return r;
    for (var a = 0; a < n.kids.length; a++)
      for (var i = z(String(n.kids[a]), e), o = 0; o < i.length; o++)
        r.push(i[o]);
    return r;
  }
  function vi() {
    (Ut("data-dc-editor-hover"), Ut("data-dc-editor-hover-stroke"));
  }
  function xe() {
    (($n = !1), vi(), Pn());
  }
  function hi(t, e) {
    if ((($n = !1), vi(), t == null)) {
      Pn();
      return;
    }
    (mn(t, e || null).forEach(function (r) {
      var n = Q(r),
        a = Et(n),
        i = !!ne(a);
      if (i && !I) {
        if (n.hasAttribute("data-dc-editor-selected")) return;
        n = a;
      }
      (n.setAttribute("data-dc-editor-hover", ""),
        i && I && n.setAttribute("data-dc-editor-hover-stroke", ""));
    }),
      Pn());
  }
  function yt() {
    ((Kr = { key: "", els: [] }), Ut("data-dc-editor-selected"));
    for (var t = 0; t < A.length; t++)
      mn(A[t], R).forEach(function (e) {
        Q(e).setAttribute("data-dc-editor-selected", "");
      });
    Y();
  }
  function rf() {
    for (var t = 0, e = 0; e < A.length; e++) t += z(A[e], R).length;
    return t;
  }
  function pr(t) {
    var e = t.target;
    return !e || !e.closest || he(t) ? null : e.closest("[data-dc-tpl]");
  }
  var nf = {
    stylePreview: 1,
    movePreview: 1,
    movePreviewCancel: 1,
    styleRevert: 1,
    dragState: 1,
    dragExit: 1,
    dragMove: 1,
    dragReturn: 1,
    dragCancel: 1,
    dragDrop: 1,
    selection: 1,
    pointerPresence: 1,
    pointerAt: 1,
    repeatRefused: 1,
  };
  function M(t) {
    if (X) {
      if (t.type === "move") {
        X.plan = t;
        return;
      }
      if (nf[t.type]) return;
    }
    if (t.type !== "pointerAt")
      try {
        var e = (window.__dcEditorDebug = window.__dcEditorDebug || {});
        ((e.lastEvents = e.lastEvents || []).push(t),
          e.lastEvents.length > 20 && e.lastEvents.shift());
      } catch {}
    try {
      parent.postMessage({ __dcEditorEvt: t }, "*");
    } catch {}
  }
  function af() {
    var t = null;
    if (ft === "text" && A.length === 1) {
      var e = z(A[0], R),
        r = e.length ? Al(e[0]) : null;
      if (r) return { x: r.l, y: r.t, w: r.r - r.l, h: r.b - r.t };
    }
    for (var n = 0; n < A.length; n++)
      for (var a = z(A[n], R), i = 0; i < a.length; i++)
        try {
          var o = gi(a[i]);
          if (!o || (o.width === 0 && o.height === 0)) continue;
          t
            ? ((t.l = Math.min(t.l, o.left)),
              (t.t = Math.min(t.t, o.top)),
              (t.r = Math.max(t.r, o.right)),
              (t.b = Math.max(t.b, o.bottom)))
            : (t = { l: o.left, t: o.top, r: o.right, b: o.bottom });
        } catch {}
    return t ? { x: t.l, y: t.t, w: t.r - t.l, h: t.b - t.t } : null;
  }
  function gi(t) {
    var e = pu(Q(t));
    return e.width || e.height ? e : na(t);
  }
  function mi() {
    var t = new Uint8Array(8);
    (window.crypto || {}).getRandomValues
      ? crypto.getRandomValues(t)
      : t.forEach(function (n, a) {
          t[a] = (Math.random() * 256) | 0;
        });
    for (var e = "", r = 0; r < t.length; r++)
      e += ("0" + t[r].toString(16)).slice(-2);
    return e;
  }
  function yi(t) {
    try {
      var e = document.createRange();
      return (e.selectNodeContents(t), e);
    } catch {
      return null;
    }
  }
  function Al(t) {
    var e = yi(t);
    if (!e) return null;
    for (var r = e.getClientRects(), n = null, a = 0; a < r.length; a++) {
      var i = r[a];
      !(i.width > 0) ||
        !(i.height > 0) ||
        (n
          ? ((n.l = Math.min(n.l, i.left)),
            (n.t = Math.min(n.t, i.top)),
            (n.r = Math.max(n.r, i.right)),
            (n.b = Math.max(n.b, i.bottom)))
          : (n = { l: i.left, t: i.top, r: i.right, b: i.bottom }));
    }
    return n;
  }
  function El(t, e, r) {
    var n = yi(t);
    if (!n) return !1;
    for (var a = n.getClientRects(), i = 0; i < a.length; i++) {
      var o = a[i];
      if (
        e >= o.left - 2 &&
        e <= o.right + 2 &&
        r >= o.top - 2 &&
        r <= o.bottom + 2 &&
        o.width > 0
      )
        return !0;
    }
    return !1;
  }
  function Cl(t) {
    var e = getComputedStyle(t),
      r = /^rgba?\(([^)]*)\)$/.exec(e.backgroundColor || ""),
      n = r ? r[1].split(/[\s,\/]+/).filter(Boolean) : null,
      a =
        !e.backgroundColor || e.backgroundColor === "transparent"
          ? 0
          : n && n.length > 3
            ? parseFloat(n[3])
            : 1,
      i =
        a >= 0.2 &&
        e.backgroundClip !== "text" &&
        e.webkitBackgroundClip !== "text",
      o = ["Top", "Right", "Bottom", "Left"].some(function (d) {
        return (
          e["border" + d + "Style"] !== "none" &&
          parseFloat(e["border" + d + "Width"]) > 0
        );
      });
    if (!(i || o)) return !1;
    var l = (t.textContent || "").trim();
    if (!l) return !1;
    for (var u = t.querySelectorAll("*"), s = 0; s < u.length; s++)
      if (u[s].hasAttribute("data-dc-tpl") && u[s].children.length > 0)
        return !1;
    return !0;
  }
  function Fe(t) {
    return t.hasAttribute("data-sc-name")
      ? "dc-import"
      : t.tagName.toLowerCase();
  }
  function yn(t) {
    return t.classList && t.classList.contains("sc-host-x")
      ? "x-import"
      : Fe(t);
  }
  var Sl =
    /^(h[1-6]|p|button|label|li|blockquote|td|th|dt|dd|caption|figcaption|pre|time|a|abbr|b|bdi|bdo|br|cite|code|del|dfn|em|i|ins|kbd|mark|q|s|samp|small|span|strike|strong|sub|sup|u|var|wbr)$/i;
  function Tl(t, e) {
    return Sl.test(t.tagName) || !!Vt[It(e, it(t))];
  }
  var Ue = 0;
  function Ct(t, e, r, n) {
    var a = R + "|" + A.join(",");
    if (
      (a !== mu && ((He = []), (mu = a)),
      e == null && !n && Ue++,
      A.length === 0)
    ) {
      M({ type: "select", tids: null, re: e, additive: !!r, s: Ue });
      return;
    }
    M({
      type: "select",
      tids: A.slice(),
      name: R,
      tag: t,
      instances: rf(),
      rect: af(),
      part: ft,
      embed: of(),
      re: e,
      additive: !!r,
      s: Ue,
    });
  }
  function aa(t) {
    (Ue++,
      M({ type: "select", tids: null, artboard: !0, additive: !!t, s: Ue }));
  }
  function of() {
    if (!ln || !ln.isConnected || !A.length) return null;
    for (var t = z(A[0], R), e = 0; e < t.length; e++)
      if (ln.contains(t[e]))
        return parseInt(ln.getAttribute("data-dc-tpl"), 10);
    return null;
  }
  function Ml(t) {
    var e = document.documentElement,
      r = document.scrollingElement || e,
      n = getComputedStyle(e),
      a =
        n.overflowX === "visible" && n.overflowY === "visible" && document.body
          ? getComputedStyle(document.body)
          : n,
      i = t === "x" ? a.overflowX : a.overflowY;
    return i === "hidden" || i === "clip"
      ? !1
      : t === "x"
        ? r.scrollWidth > r.clientWidth + 1
        : r.scrollHeight > r.clientHeight + 1;
  }
  function Pl(t, e, r, n, a) {
    if (((sr = null), t.metaKey || t.ctrlKey)) return { x: r, y: n };
    var i = f.startRect,
      o = document.scrollingElement || document.documentElement,
      l = Q(e),
      u = l.getBoundingClientRect(),
      s = getComputedStyle(l).position;
    if (f.mode !== "abs" && s !== "absolute" && s !== "fixed")
      return { x: r, y: n };
    u.width > 0 &&
      u.height > 0 &&
      (f.sizeEl !== e || f.sizePos !== s || u.width >= f.sizeW) &&
      ((f.sizeEl = e),
      (f.sizePos = s),
      (f.sizeW = u.width),
      (f.sizeH = u.height));
    var d = f.sizeW || i.width,
      p = f.sizeH || i.height,
      c = { x: (!a || a.x) && !f.maskX, y: (!a || a.y) && !f.maskY },
      g = (Qt ? o.clientWidth : innerWidth) / 2,
      h = (Qt ? o.clientHeight : innerHeight) / 2,
      v = Nd(
        { x: i.left + r, y: i.top + n, w: d, h: p },
        [
          { axis: "x", pos: g, kind: "center" },
          { axis: "y", pos: h, kind: "center" },
        ],
        Gt(8),
        c,
      );
    return (v.guides.length && (sr = v.guides), { x: r + v.dx, y: n + v.dy });
  }
  function lf() {
    if (f)
      if (f.alt && f.mode === "abs" && !f.altClone && f.origParent) {
        var t = f.el.cloneNode(!0);
        (t.removeAttribute("data-dc-editor-selected"),
          t.removeAttribute("data-dc-editor-dragging"),
          t.removeAttribute("data-dc-dragging"),
          t.setAttribute("data-dc-editor-overlay", ""),
          t.setAttribute("style", f.origStyle),
          t.removeAttribute("data-dc-tpl"));
        for (
          var e = t.querySelectorAll("[data-dc-tpl]"), r = 0;
          r < e.length;
          r++
        )
          e[r].removeAttribute("data-dc-tpl");
        (t.style.setProperty("pointer-events", "none", "important"),
          f.origNext && f.origNext.parentNode === f.origParent
            ? f.origParent.insertBefore(t, f.origNext)
            : f.origParent.appendChild(t),
          (f.altClone = t));
      } else !f.alt && f.altClone && (f.altClone.remove(), (f.altClone = null));
  }
  var kl = {
      area: 1,
      base: 1,
      br: 1,
      col: 1,
      embed: 1,
      hr: 1,
      img: 1,
      input: 1,
      link: 1,
      meta: 1,
      param: 1,
      source: 1,
      track: 1,
      wbr: 1,
      canvas: 1,
      iframe: 1,
      option: 1,
      script: 1,
      select: 1,
      style: 1,
      textarea: 1,
      title: 1,
      video: 1,
      audio: 1,
      path: 1,
      circle: 1,
      rect: 1,
      line: 1,
      ellipse: 1,
      polygon: 1,
      polyline: 1,
      use: 1,
    },
    Nl = { "": 1, deg: 1, rad: 180 / Math.PI, turn: 360, grad: 0.9 },
    ia = {
      translate: 0,
      translatex: 0,
      translatey: 0,
      rotate: 1,
      scale: 2,
      scalex: 2,
      scaley: 2,
    },
    uf = {
      translate: ["x", "y"],
      translatex: ["x"],
      translatey: ["y"],
      rotate: ["r"],
      scale: ["sx", "sy"],
      scalex: ["sx"],
      scaley: ["sy"],
    };
  function oa(t) {
    t = String(t || "").trim();
    var e = { x: "0px", y: "0px", deg: 0, sx: 1, sy: 1 };
    if (!t || t === "none") return e;
    if (/\{\{|var\(/.test(t)) return null;
    var r = /([a-zA-Z]+)\(([^)]*)\)/g,
      n = /^(-?\d*\.?\d+)([a-z%]*)$/i;
    if (t.replace(r, "").trim() !== "") return null;
    for (var a, i = {}, o = 0; (a = r.exec(t));) {
      var l = a[1].toLowerCase(),
        u = a[2].split(",");
      if (!Object.prototype.hasOwnProperty.call(ia, l) || ia[l] < o)
        return null;
      for (var s = uf[l], d = 0; d < s.length; d++) {
        if (i[s[d]]) return null;
        i[s[d]] = 1;
      }
      if (u.length > s.length) return null;
      o = ia[l];
      var p = n.exec(u[0].trim()),
        c = u.length > 1 ? n.exec(u[1].trim()) : null;
      if (!p) return null;
      var g = function (m) {
        return !!m && !m[2] && parseFloat(m[1]) !== 0;
      };
      if (ia[l] < 2 && (g(p) || g(c))) return null;
      var h = p[1] + (p[2] || "px"),
        v = c ? c[1] + (c[2] || "px") : null;
      if (l === "translate") {
        if (u.length > 1 && !c) return null;
        ((e.x = h), v && (e.y = v));
      } else if (l === "translatex") e.x = h;
      else if (l === "translatey") e.y = h;
      else if (l === "rotate") {
        var x = (p[2] || "").toLowerCase();
        if (!Object.prototype.hasOwnProperty.call(Nl, x)) return null;
        var y = Nl[x];
        e.deg = parseFloat(p[1]) * y;
      } else if (l === "scale") {
        if ((u.length > 1 && !c) || p[2] || (c && c[2])) return null;
        ((e.sx = parseFloat(p[1])), (e.sy = c ? parseFloat(c[1]) : e.sx));
      } else if (l === "scalex" || l === "scaley") {
        if (p[2]) return null;
        l === "scalex" ? (e.sx = parseFloat(p[1])) : (e.sy = parseFloat(p[1]));
      } else return null;
    }
    return e;
  }
  function Ll(t, e) {
    var r = [];
    return (
      (parseFloat(t.x) !== 0 || parseFloat(t.y) !== 0) &&
        r.push("translate(" + t.x + ", " + t.y + ")"),
      r.push("rotate(" + e + "deg)"),
      (t.sx !== 1 || t.sy !== 1) &&
        r.push(
          t.sx === t.sy
            ? "scale(" + t.sx + ")"
            : "scale(" + t.sx + ", " + t.sy + ")",
        ),
      r.join(" ")
    );
  }
  function sf(t, e, r, n, a, i, o, l) {
    var u = t.indexOf("w") >= 0 ? 1 : 0,
      s = t.indexOf("n") >= 0 ? 1 : 0,
      d = (u - r) * (a - o),
      p = (s - n) * (i - l),
      c = r * (a - o) + e.a * d + e.c * p,
      g = n * (i - l) + e.b * d + e.d * p;
    return { x: c, y: g, r: a - o - c, b: i - l - g };
  }
  var la = function (e) {
    if (!e) return null;
    var r = Math.sqrt(e.a * e.a + e.b * e.b),
      n = Math.sqrt(e.c * e.c + e.d * e.d),
      a = e.a * e.d - e.b * e.c;
    if (
      !(r > 0) ||
      !(n > 0) ||
      !(Math.abs(e.a * e.c + e.b * e.d) <= 0.001 * r * n)
    )
      return null;
    var i = Math.atan2(e.b, e.a),
      o = a < 0;
    if (o) {
      var l = Math.atan2(-e.b, -e.a);
      Math.abs(l) <= Math.abs(i) ? ((i = l), (r = -r)) : (n = -n);
    }
    return {
      m: e,
      rot: i,
      sx: r,
      sy: n,
      mirror: o,
      plain:
        !o &&
        Math.abs(i) < 1e-6 &&
        Math.abs(r - 1) < 1e-6 &&
        Math.abs(n - 1) < 1e-6,
    };
  };
  function df(t, e, r) {
    var n = !e || e.plain,
      a = (n ? 1 : e.sx) * r.x,
      i = (n ? 1 : e.sy) * r.y,
      o = t.indexOf(a < 0 ? "e" : "w") >= 0,
      l = t.indexOf(a < 0 ? "w" : "e") >= 0,
      u = t.indexOf(i < 0 ? "s" : "n") >= 0,
      s = t.indexOf(i < 0 ? "n" : "s") >= 0;
    return {
      dir: (u ? "n" : s ? "s" : "") + (o ? "w" : l ? "e" : ""),
      west: o,
      east: l,
      north: u,
      south: s,
      rot: (n ? 0 : e.rot) * r.x * r.y,
      sx: a,
      sy: i,
    };
  }
  function ff(t, e, r, n) {
    var a = Math.cos(t.rot),
      i = Math.sin(t.rot);
    return { x: (r * a + n * i) / (e * t.sx), y: (n * a - r * i) / (e * t.sy) };
  }
  var cf = {
    img: 1,
    svg: 1,
    video: 1,
    canvas: 1,
    iframe: 1,
    embed: 1,
    object: 1,
    audio: 1,
    input: 1,
    textarea: 1,
    select: 1,
    button: 1,
  };
  function pf(t, e, r, n) {
    var a = function (g) {
        return parseFloat(n[g]) || 0;
      },
      i = n.boxSizing === "border-box" ? 0 : 1,
      o = function (g, h, v) {
        var x = parseFloat(g) + i * v;
        return typeof h != "number"
          ? isFinite(x)
            ? x
            : 0
          : isFinite(x) && Math.abs(x - h) <= 0.501
            ? x
            : h;
      },
      l = o(
        n.width,
        e,
        a("paddingLeft") +
          a("paddingRight") +
          a("borderLeftWidth") +
          a("borderRightWidth"),
      ),
      u = o(
        n.height,
        r,
        a("paddingTop") +
          a("paddingBottom") +
          a("borderTopWidth") +
          a("borderBottomWidth"),
      ),
      s = String(n.transformOrigin || "").split(" "),
      d = parseFloat(s[0]),
      p = parseFloat(s[1]),
      c = !cf[t];
    return {
      centre: {
        x: l / 2 - (isFinite(d) ? d : l / 2),
        y: u / 2 - (isFinite(p) ? p : u / 2),
      },
      inline: n.display === "inline" && c,
      flat: { x: c && !(l > 0), y: c && !(u > 0) },
    };
  }
  function Rl(t) {
    if (!t || Math.abs(Math.sin(t.rot)) > 1e-4) return null;
    var e = Math.cos(t.rot) < 0 ? -1 : 1;
    return { x: e * (t.sx < 0 ? -1 : 1), y: e * (t.sy < 0 ? -1 : 1) };
  }
  function vf(t, e, r, n, a, i) {
    var o = e.indexOf("w") >= 0,
      l = e.indexOf("e") >= 0,
      u = e.indexOf("n") >= 0,
      s = e.indexOf("s") >= 0,
      d = o ? t.w - r : l ? t.w + r : t.w,
      p = u ? t.h - n : s ? t.h + n : t.h;
    if (a && (o || l) && (u || s) && t.w > 0 && t.h > 0) {
      var c = d / t.w,
        g = p / t.h,
        h = Math.abs(c - 1) >= Math.abs(g - 1) ? c : g;
      ((h = Math.min(h, i.max.w / t.w, i.max.h / t.h)),
        (h = Math.max(h, i.min.w / t.w, i.min.h / t.h)),
        (d = t.w * h),
        (p = t.h * h));
    } else
      ((o || l) && (d = Math.min(i.max.w, Math.max(i.min.w, d))),
        (u || s) && (p = Math.min(i.max.h, Math.max(i.min.h, p))));
    return {
      x: o ? t.x + t.w - d : t.x,
      y: u ? t.y + t.h - p : t.y,
      w: d,
      h: p,
    };
  }
  function hf(t, e, r, n, a, i, o, l) {
    var u = (0.5 - r) * a,
      s = (0.5 - n) * i,
      d = (0.5 - r) * o,
      p = (0.5 - n) * l;
    return {
      x: r * (o - a) + (e.a * d + e.c * p) - (t.a * u + t.c * s),
      y: n * (l - i) + (e.b * d + e.d * p) - (t.b * u + t.d * s),
    };
  }
  function gf(t, e) {
    var r = Math.cos(e),
      n = Math.sin(e);
    return {
      a: r * t.a - n * t.b,
      b: n * t.a + r * t.b,
      c: r * t.c - n * t.d,
      d: n * t.c + r * t.d,
    };
  }
  function bn(t) {
    return ((t = ((t % 360) + 360) % 360), t > 180 ? t - 360 : t);
  }
  function mf(t) {
    var e = function (r) {
      return !!r && r !== "auto";
    };
    return {
      x: e(t.left) || !e(t.right) ? "left" : "right",
      y: e(t.top) || !e(t.bottom) ? "top" : "bottom",
    };
  }
  function bi(t) {
    var e = function (r) {
      return !!r && r !== "none";
    };
    return e(t.rotate) || e(t.scale) || e(t.translate);
  }
  function ua(t, e) {
    return /^-?[\d.]+px$/i.test(String(t || "").trim())
      ? parseFloat(t)
      : parseFloat(e) || 0;
  }
  var za = {
      img: 1,
      svg: 1,
      video: 1,
      canvas: 1,
      iframe: 1,
      embed: 1,
      object: 1,
      input: 1,
      textarea: 1,
      select: 1,
      button: 1,
    },
    xi = { a: 1, b: 0, c: 0, d: 1, none: !0 };
  function Fr(t) {
    var e;
    try {
      e = getComputedStyle(t);
    } catch {
      return null;
    }
    if (bi(e)) return null;
    var r = e.transform;
    if (!r || r === "none") return xi;
    var n = /^matrix\(([^)]+)\)$/.exec(r);
    if (!n) return null;
    var a = n[1].split(","),
      i = { a: +a[0], b: +a[1], c: +a[2], d: +a[3] };
    return isFinite(i.a) && isFinite(i.b) && isFinite(i.c) && isFinite(i.d)
      ? i
      : null;
  }
  function $e(t) {
    return la(Fr(t));
  }
  function wi(t) {
    var e = xn(t),
      r = Fr(t),
      n = r && !r.none ? Rl(la(r)) : { x: 1, y: 1 };
    return n && r ? { x: e.x * n.x, y: e.y * n.y } : { x: 1, y: 1 };
  }
  function xn(t) {
    for (var e = 1, r = 1, n = t ? wa(t) : null; n; n = wa(n))
      if (n.nodeType === 1) {
        var a = Fr(n);
        if (!a) return { x: 1, y: 1 };
        if (!a.none) {
          var i = Rl(la(a));
          if (!i) return { x: 1, y: 1 };
          ((e *= i.x), (r *= i.y));
        }
      }
    return { x: e, y: r };
  }
  function Oe(t, e) {
    return t.offsetWidth > 0 || t.offsetHeight > 0
      ? { w: t.offsetWidth, h: t.offsetHeight }
      : ((e = e || getComputedStyle(t)),
        { w: parseFloat(e.width) || 0, h: parseFloat(e.height) || 0 });
  }
  function Ai(t, e) {
    var r = String(t.transformOrigin || "").split(" "),
      n = parseFloat(r[0]),
      a = parseFloat(r[1]);
    return {
      fx: e.w > 0 && isFinite(n) ? n / e.w : 0.5,
      fy: e.h > 0 && isFinite(a) ? a / e.h : 0.5,
    };
  }
  function yf(t) {
    var e = t.style,
      r = t.getAttribute("style");
    if (!e || !t.getBoundingClientRect) return null;
    function n() {
      e.setProperty("transition", "none", "important");
    }
    try {
      (n(),
        e.setProperty("transform", "none", "important"),
        e.setProperty("rotate", "none", "important"),
        e.setProperty("scale", "none", "important"),
        e.setProperty("translate", "none", "important"));
      var a = t.getBoundingClientRect();
      return (
        r == null ? t.removeAttribute("style") : t.setAttribute("style", r),
        n(),
        t.getBoundingClientRect(),
        a
      );
    } catch {
      return null;
    } finally {
      r == null ? t.removeAttribute("style") : t.setAttribute("style", r);
    }
  }
  function bf(t, e) {
    var r = yf(t) || e,
      n = Oe(t),
      a = getComputedStyle(t),
      i = parseFloat(a.width);
    i > 0 &&
      a.boxSizing !== "border-box" &&
      (i +=
        (parseFloat(a.paddingLeft) || 0) +
        (parseFloat(a.paddingRight) || 0) +
        (parseFloat(a.borderLeftWidth) || 0) +
        (parseFloat(a.borderRightWidth) || 0));
    var o = i > 0 && Math.abs(i - n.w) < 1 ? i : n.w,
      l = o > 0 && r.width > 0 ? r.width / o : Lt(t);
    return (
      (!(l > 0) || !isFinite(l)) && (l = 1),
      {
        s: l,
        w: Math.ceil(e.width / l),
        h: Math.ceil(e.height / l),
        ew: Math.ceil(o) || Math.ceil(r.width / l),
        eh: Math.ceil(n.h) || Math.ceil(r.height / l),
        ox: Math.round((r.left - e.left) / l),
        oy: Math.round((r.top - e.top) / l),
      }
    );
  }
  function vr(t) {
    var e = t && Fr(t);
    if (!e || e.none) return Lt(t);
    for (
      var r = t.parentElement;
      r && r.parentElement && !(r.offsetWidth > 0 || r.offsetHeight > 0);
    )
      r = r.parentElement;
    return Lt(r || t);
  }
  function Lt(t) {
    try {
      if (t && t.getBoundingClientRect) {
        var e = t.getBoundingClientRect();
        if (t.offsetWidth > 0 && e.width > 0) return e.width / t.offsetWidth;
        if (t.offsetHeight > 0 && e.height > 0)
          return e.height / t.offsetHeight;
      }
    } catch {}
    return at || 1;
  }
  function Dl(t) {
    return !kl[(t.tagName || "").toLowerCase()];
  }
  var Bl = {
      address: 1,
      article: 1,
      aside: 1,
      blockquote: 1,
      details: 1,
      div: 1,
      dl: 1,
      fieldset: 1,
      figcaption: 1,
      figure: 1,
      footer: 1,
      form: 1,
      h1: 1,
      h2: 1,
      h3: 1,
      h4: 1,
      h5: 1,
      h6: 1,
      header: 1,
      hgroup: 1,
      hr: 1,
      main: 1,
      menu: 1,
      nav: 1,
      ol: 1,
      p: 1,
      pre: 1,
      section: 1,
      table: 1,
      ul: 1,
    },
    Kl = { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
    Il = {
      tr: { thead: 1, tbody: 1, tfoot: 1, table: 1 },
      td: { tr: 1 },
      th: { tr: 1 },
      thead: { table: 1 },
      tbody: { table: 1 },
      tfoot: { table: 1 },
      caption: { table: 1 },
      colgroup: { table: 1 },
      col: { colgroup: 1 },
    },
    sa = {
      table: { caption: 1, colgroup: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1 },
      thead: { tr: 1 },
      tbody: { tr: 1 },
      tfoot: { tr: 1 },
      tr: { td: 1, th: 1 },
      colgroup: { col: 1 },
    },
    xf = {
      span: 1,
      a: 1,
      b: 1,
      i: 1,
      em: 1,
      strong: 1,
      u: 1,
      s: 1,
      small: 1,
      sub: 1,
      sup: 1,
      code: 1,
      label: 1,
      button: 1,
      abbr: 1,
      cite: 1,
      q: 1,
      mark: 1,
      time: 1,
      kbd: 1,
      samp: 1,
      var: 1,
      h1: 1,
      h2: 1,
      h3: 1,
      h4: 1,
      h5: 1,
      h6: 1,
    },
    wf = {
      address: 1,
      article: 1,
      aside: 1,
      blockquote: 1,
      details: 1,
      div: 1,
      dl: 1,
      fieldset: 1,
      figcaption: 1,
      figure: 1,
      footer: 1,
      form: 1,
      h1: 1,
      h2: 1,
      h3: 1,
      h4: 1,
      h5: 1,
      h6: 1,
      header: 1,
      hgroup: 1,
      hr: 1,
      main: 1,
      menu: 1,
      nav: 1,
      ol: 1,
      p: 1,
      pre: 1,
      section: 1,
      table: 1,
      ul: 1,
      li: 1,
      dt: 1,
      dd: 1,
    };
  function da(t, e) {
    var r = (t || "").toLowerCase(),
      n = (e || "").toLowerCase();
    return !(
      kl[r] ||
      (r === "p" && Bl[n]) ||
      (xf[r] && wf[n]) ||
      (Kl[r] && Kl[n]) ||
      (r === n &&
        (r === "a" || r === "form" || r === "button" || r === "label")) ||
      (Il[n] && !Il[n][r]) ||
      (sa[r] && !sa[r][n])
    );
  }
  function Af(t, e, r, n, a, i) {
    var o = a || (r ? r.tagName : "div"),
      l = document.elementFromPoint(t, e);
    for (
      l = l && l.closest ? l.closest("[data-dc-tpl]") : null;
      l && Ol(l, r, o, n, i);
    )
      l = l.parentElement ? l.parentElement.closest("[data-dc-tpl]") : null;
    return l
      ? { el: l, tid: parseInt(l.getAttribute("data-dc-tpl"), 10) }
      : { el: document.querySelector(".sc-host") || document.body, tid: null };
  }
  function Ef(t) {
    for (
      var e = [],
        r = t.parentElement ? t.parentElement.closest("[data-dc-tpl]") : null;
      r;
    )
      (e.push(r),
        (r = r.parentElement
          ? r.parentElement.closest("[data-dc-tpl]")
          : null));
    var n = _t();
    return (n && e.push(n), e);
  }
  function Cf(t) {
    if (!t.peerParent) return null;
    for (
      var e = document.querySelectorAll("[data-dc-drag-parent]"),
        r = null,
        n = 0;
      n < e.length && !r;
      n++
    )
      _(e[n]) === t.name && (r = e[n]);
    if (
      ((r = r || z(String(t.peerTid), t.name)[0]),
      !r || r.tagName !== t.peerParent.tagName)
    )
      return null;
    var a = getComputedStyle(r).display || "";
    return a.indexOf("flex") !== -1 || a.indexOf("grid") !== -1 ? r : null;
  }
  function Sf(t, e, r) {
    if (e == null || r.origAncestorEls.indexOf(t) !== -1) return !0;
    var n = r.brk ? null : Cf(r);
    if (n === t) return !0;
    if (n && n.contains(t)) return !1;
    var a = t.getBoundingClientRect(),
      i = r.startRect.width,
      o = r.startRect.height;
    return a.width <= i && a.height <= o
      ? !1
      : a.width * a.height >= 1.1 * i * o;
  }
  function we(t) {
    return (t.tagName || "").toLowerCase() === "deck-stage";
  }
  function Xe(t) {
    if (!t || !t.tagName) return !1;
    var e = t.tagName.toLowerCase();
    if (
      e === "deck-stage" ||
      (e === "x-import" &&
        t.getAttribute("component-from-global-scope") === "deck-stage")
    )
      return !0;
    if (t.classList && t.classList.contains("sc-host-x")) {
      for (var r = t.firstElementChild; r; r = r.nextElementSibling)
        if (
          (r.tagName && r.tagName.toLowerCase() === "deck-stage") ||
          (r.classList &&
            r.classList.contains("sc-placeholder") &&
            r.getAttribute("title") === "deck-stage")
        )
          return !0;
    }
    return !1;
  }
  function Tf(t) {
    var e =
      t && t.classList && t.classList.contains("sc-host-x")
        ? t.firstElementChild
        : null;
    return !e || !e.tagName
      ? !1
      : e.tagName.toLowerCase() === "image-slot" ||
          (e.classList.contains("sc-placeholder") &&
            e.getAttribute("title") === "image-slot");
  }
  function Ze(t) {
    if (!t || !t.getBoundingClientRect) return !1;
    var e = t.getBoundingClientRect();
    if (e.width !== 0 && e.height !== 0) return !1;
    for (var r = t.firstElementChild; r; r = r.nextElementSibling)
      if (getComputedStyle(r).display !== "none" && (Xe(r) || Ze(r))) return !0;
    return !1;
  }
  function Fl(t) {
    if (!t || typeof t.composedPath != "function") return !1;
    for (var e = t.composedPath(), r = 0; r < e.length; r++) {
      var n = e[r];
      if (
        n &&
        n.nodeType === 1 &&
        n.matches &&
        n.matches("[data-omelette-chrome]")
      ) {
        var a = n.getRootNode && n.getRootNode();
        return !!(a && a.host && we(a.host));
      }
    }
    return !1;
  }
  function Ae(t) {
    return Xe(t) || Ze(t) || !!(t && t.parentElement && we(t.parentElement));
  }
  function Ee(t) {
    return (
      !!t &&
      t.hasAttribute &&
      (t.hasAttribute("data-uneditable") || we(t) || Xe(t) || Ze(t))
    );
  }
  function Ol(t, e, r, n, a) {
    if (
      (e && (t === e || e.contains(t))) ||
      !da(t.tagName, r) ||
      (e && !a && t.namespaceURI === "http://www.w3.org/2000/svg")
    )
      return !0;
    for (var i = 0; n && i < n.length; i++)
      if (n[i].contains(t) || (e && !da(t.tagName, n[i].tagName))) return !0;
    return !1;
  }
  function Mf(t) {
    for (var e = t.parentElement; e; e = e.parentElement)
      if (e.namespaceURI === "http://www.w3.org/2000/svg") return !0;
    return !1;
  }
  function Xl(t, e, r, n, a) {
    for (
      var i = Af(t, e, n, a, n ? null : r.tag, r.fromDrawing),
        o = i.el,
        l = i.tid;
      ;
    ) {
      if (o && (we(o) || Xe(o) || Ze(o)))
        return { el: null, tid: null, invalid: !0 };
      if (
        o &&
        l != null &&
        parseFloat(getComputedStyle(o).opacity || "1") === 0
      ) {
        var u = o.parentElement
          ? o.parentElement.closest("[data-dc-tpl]")
          : null;
        if (u) {
          ((o = u), (l = parseInt(u.getAttribute("data-dc-tpl"), 10)));
          continue;
        }
        ((o = document.querySelector(".sc-host") || document.body), (l = null));
        break;
      }
      if (l == null || Sf(o, l, r)) break;
      for (
        var s = o.parentElement
          ? o.parentElement.closest("[data-dc-tpl]")
          : null;
        s && Ol(s, n, r.tag, a, r.fromDrawing);
      )
        s = s.parentElement ? s.parentElement.closest("[data-dc-tpl]") : null;
      if (!s) {
        ((o = document.querySelector(".sc-host") || document.body), (l = null));
        break;
      }
      ((o = s), (l = parseInt(s.getAttribute("data-dc-tpl"), 10)));
    }
    return { el: o, tid: l };
  }
  function wn(t, e, r) {
    for (var n = [], a = 0; a < t.children.length; a++) {
      var i = t.children[a];
      if (
        !(i === e || (r && r.indexOf(i) >= 0)) &&
        !(!i.getAttribute || i.getAttribute("data-dc-tpl") == null)
      ) {
        var o = getComputedStyle(i).position;
        o === "absolute" || o === "fixed" || n.push(i);
      }
    }
    return n;
  }
  function _l(t, e, r) {
    for (var n = [], a = 0, i = 0; i < t.length; i++)
      (t[i] !== e && !(r && r.indexOf(t[i]) >= 0) && a++, (n[i] = a));
    return n;
  }
  function hr(t) {
    return parseInt(t.getAttribute("data-dc-tpl"), 10);
  }
  function fa(t, e, r) {
    return e >= t.left && e <= t.right && r >= t.top && r <= t.bottom;
  }
  function Wl(t, e, r, n, a, i, o, l) {
    var u = wn(t, r, l);
    if (u.length === 0)
      return { targetTid: e, position: e == null ? "root-end" : "into", n: 0 };
    var s = function (lt) {
        return lt < u.length
          ? { targetTid: hr(u[lt]), position: "before", n: lt }
          : { targetTid: hr(u[u.length - 1]), position: "after", n: u.length };
      },
      d = i && i.n <= u.length ? s(i.n) : null,
      p = getComputedStyle(t),
      c = p.display || "",
      g = c.indexOf("flex") !== -1,
      h = c.indexOf("grid") !== -1;
    if (h || (g && p.flexWrap !== "nowrap")) {
      if (d && o) return d;
      for (
        var v = g
            ? p.flexDirection.indexOf("column") === 0
            : String(p.gridTemplateColumns || "none")
                .trim()
                .split(/\s+/).length < 2,
          x = g && p.flexDirection.indexOf("reverse") !== -1,
          y = wi(t),
          m = v ? x !== y.y < 0 : ((p.direction === "rtl") !== x) != y.x < 0,
          w = function (lt) {
            var nt = v
              ? (a - lt.top) / (lt.bottom - lt.top || 1)
              : (n - lt.left) / (lt.right - lt.left || 1);
            return m ? 1 - nt : nt;
          },
          E = wn(t, null),
          C = _l(E, r, l),
          S = function (lt) {
            var nt = E.indexOf(lt);
            return nt < 0 ? null : s(C[nt]);
          },
          T = S(r),
          k = [r].concat(l || []),
          L = 0;
        L < k.length;
        L++
      ) {
        var P = S(k[L]);
        if (P && fa(Q(k[L]).getBoundingClientRect(), n, a)) return P;
      }
      for (var N = 0; N < u.length; N++) {
        var F = Q(u[N]).getBoundingClientRect();
        if (fa(F, n, a)) {
          var q = w(F);
          return d && ((d.n === N && q < 0.65) || (d.n === N + 1 && q > 0.35))
            ? d
            : s(q < 0.5 ? N : N + 1);
        }
      }
      var V = Q(u[u.length - 1]).getBoundingClientRect(),
        j = v
          ? (m ? a < V.top : a > V.bottom) && n >= V.left && n <= V.right
          : (m ? n < V.left : n > V.right) && a >= V.top && a <= V.bottom;
      if (j) return s(u.length);
      if (d || T) return d || T;
      for (var K = -1, J = 1 / 0, W = 0; W < u.length; W++) {
        var H = Q(u[W]).getBoundingClientRect();
        if (!(H.right <= H.left || H.bottom <= H.top)) {
          var Z = n - (H.left + H.right) / 2,
            pt = a - (H.top + H.bottom) / 2;
          Z * Z + pt * pt < J && ((J = Z * Z + pt * pt), (K = W));
        }
      }
      return K < 0
        ? s(u.length)
        : s(w(Q(u[K]).getBoundingClientRect()) < 0.5 ? K : K + 1);
    }
    for (
      var st =
          (g && p.flexDirection.indexOf("row") === 0) ||
          c === "table-row" ||
          (t.tagName || "").toLowerCase() === "tr",
        rt = st ? n : a,
        vt = st ? wi(t).x < 0 : wi(t).y < 0,
        mt = 0;
      mt < u.length;
      mt++
    ) {
      var Pt = u[mt].getBoundingClientRect(),
        G = st ? (Pt.left + Pt.right) / 2 : (Pt.top + Pt.bottom) / 2;
      if (vt ? rt > G : rt < G) return s(mt);
    }
    return s(u.length);
  }
  var Ht = null;
  function Pf() {
    return (
      Ht ||
      ((Ht = document.createElement("div")),
      Ht.setAttribute("data-dc-editor-overlay", ""),
      (Ht.style.cssText =
        "position:fixed;inset:0;z-index:2147483643;pointer-events:none;display:none;"),
      fe().appendChild(Ht),
      Ht)
    );
  }
  function Yt() {
    if (Ht)
      for (Ht.style.display = "none"; Ht.firstChild;)
        Ht.removeChild(Ht.firstChild);
  }
  function Hl(t, e, r, n, a, i) {
    var o = document.createElement("div");
    ((o.style.cssText =
      "position:fixed;pointer-events:none;border-radius:2px;background:color-mix(in srgb," +
      xt +
      (i ? " 90%" : " 40%") +
      ",transparent);"),
      (o.style.left = e + "px"),
      (o.style.top = r + "px"),
      (o.style.width = n + "px"),
      (o.style.height = a + "px"),
      t.appendChild(o));
  }
  function Ei(t, e, r, n, a) {
    for (var i = Pf(); i.firstChild;) i.removeChild(i.firstChild);
    i.style.display = "block";
    var o = wn(t, e, n),
      l = f && f.parked ? wn(t, null) : [],
      u = l.indexOf(e),
      s = a ?? -1;
    if (u >= 0) {
      s = _l(l, e, n)[u];
      for (var d = [e].concat(n || []), p = [], c = 0; c < d.length; c++)
        l.indexOf(d[c]) >= 0 && p.push(Q(d[c]).getBoundingClientRect());
      for (c = 0; c < p.length; c++) kf(i, p[c]);
    }
    if (o.length !== 0) {
      var g = getComputedStyle(t),
        h = g.display || "",
        v = h.indexOf("flex") !== -1 && g.flexWrap !== "nowrap",
        x =
          h.indexOf("grid") !== -1 ||
          v ||
          h === "table-row" ||
          (t.tagName || "").toLowerCase() === "tr";
      if (x) {
        for (
          var y = o.map(function (W) {
              return Q(W).getBoundingClientRect();
            }),
            m = 0;
          m < o.length;
          m++
        ) {
          var w = y[m],
            E = document.createElement("div");
          ((E.style.cssText =
            "position:fixed;pointer-events:none;border:1px dotted color-mix(in srgb," +
            xt +
            " 60%,transparent);background:color-mix(in srgb," +
            xt +
            " 5%,transparent);border-radius:3px;"),
            (E.style.left = w.left + "px"),
            (E.style.top = w.top + "px"),
            (E.style.width = w.width + "px"),
            (E.style.height = w.height + "px"),
            i.appendChild(E));
        }
        return;
      }
      for (
        var C =
            h.indexOf("flex") !== -1 && g.flexDirection.indexOf("row") === 0,
          S = t.getBoundingClientRect(),
          T = o.map(function (W) {
            return W.getBoundingClientRect();
          }),
          k = 0;
        k <= o.length;
        k++
      ) {
        var L = !!r && r.n === k;
        if (k !== s) {
          var P = k > 0 ? T[k - 1] : null,
            N = k < o.length ? T[k] : null;
          if (C) {
            var F =
              P && N ? (P.right + N.left) / 2 : P ? P.right + 3 : N.left - 3;
            if ((!P && F < S.left) || (!N && F > S.right)) continue;
            var q = Math.min(P ? P.top : N.top, N ? N.top : P.top),
              V = Math.max(P ? P.bottom : N.bottom, N ? N.bottom : P.bottom);
            Hl(i, F - 1, q, 2, V - q, L);
          } else {
            var j =
              P && N ? (P.bottom + N.top) / 2 : P ? P.bottom + 3 : N.top - 3;
            if ((!P && j < S.top) || (!N && j > S.bottom)) continue;
            var K = Math.min(P ? P.left : N.left, N ? N.left : P.left),
              J = Math.max(P ? P.right : N.right, N ? N.right : P.right);
            Hl(i, K, j - 1, J - K, 2, L);
          }
        }
      }
    }
  }
  function kf(t, e) {
    var r = document.createElement("div");
    ((r.style.cssText =
      "position:fixed;pointer-events:none;box-sizing:border-box;border-radius:3px;border:calc(1*var(--dc-chrome-unit,1px)) dashed color-mix(in srgb," +
      xt +
      " 75%,transparent);background:color-mix(in srgb," +
      xt +
      " 6%,transparent);"),
      (r.style.left = e.left + "px"),
      (r.style.top = e.top + "px"),
      (r.style.width = e.width + "px"),
      (r.style.height = e.height + "px"),
      t.appendChild(r));
  }
  var Yl = 32,
    Nf = 150;
  function Lf(t, e, r, n, a, i, o, l) {
    var u = X;
    if (u) {
      var s =
        u.placeholder && u.placeholder.el.isConnected ? u.placeholder.el : null;
      (s ||
        ((s = document.createElement("div")),
        s.setAttribute("data-dc-editor-overlay", ""),
        s.setAttribute("data-dc-editor-drop-placeholder", ""),
        s.setAttribute("inert", ""),
        (s.style.cssText =
          "box-sizing:border-box;flex:0 0 auto;margin:0;border-radius:3px;border:calc(1.5*var(--dc-chrome-unit,1px)) dashed color-mix(in srgb," +
          xt +
          " 85%,transparent);background:color-mix(in srgb," +
          xt +
          " 8%,transparent);"),
        s.style.setProperty("pointer-events", "none", "important")),
        (s.style.width = Math.max(1, Math.round(a)) + "px"),
        (s.style.height = Math.max(1, Math.round(i)) + "px"));
      var d = r < n.length ? n[r] : null,
        p = n.length ? n[n.length - 1] : null,
        c =
          s.parentNode === t &&
          (d
            ? s.nextSibling === d
            : p
              ? s.previousSibling === p
              : t.lastChild === s);
      c ||
        (d
          ? t.insertBefore(s, d)
          : p
            ? p.insertAdjacentElement("afterend", s)
            : t.appendChild(s));
      var g =
        u.placeholder && u.placeholder.cel === t ? u.placeholder.watch : null;
      (g ||
        (u.placeholder &&
          u.placeholder.watch &&
          u.placeholder.watch.disconnect(),
        (g = new MutationObserver(function (h) {
          for (var v = 0; v < h.length; v++)
            for (var x = h[v].addedNodes, y = 0; y < x.length; y++)
              if (
                x[y].nodeType === 1 &&
                !x[y].hasAttribute("data-dc-editor-overlay")
              ) {
                Je();
                return;
              }
        })),
        g.observe(t, { childList: !0 })),
        (u.placeholder = {
          el: s,
          cel: t,
          tid: e,
          n: r,
          at: o,
          rect: l,
          watch: g,
        }));
    }
  }
  function Rf() {
    var t = X;
    !t ||
      !t.placeholder ||
      t.placeholder.cap ||
      (t.placeholder.cap = setTimeout(Je, Nf));
  }
  function Je() {
    var t = X;
    !t ||
      !t.placeholder ||
      (t.placeholder.cap && clearTimeout(t.placeholder.cap),
      t.placeholder.watch.disconnect(),
      t.placeholder.el.parentNode &&
        t.placeholder.el.parentNode.removeChild(t.placeholder.el),
      (t.placeholder = null));
  }
  function An() {
    var t = document.querySelector("[data-dc-dragging]");
    if (
      ((f.epoch = (t && parseInt(t.getAttribute("data-dc-dragging"), 10)) || 0),
      t)
    )
      return ((f.el = t), t);
    var e = z(String(f.tid), f.name);
    return (
      e[0] ? (f.el = e[0]) : (!f.el || !f.el.isConnected) && (f.el = null),
      f.el
    );
  }
  function zl() {
    if (!f || !f.group) return null;
    var t = [],
      e = {},
      r;
    if (f.epoch > 0) {
      var n = document.querySelectorAll("[data-dc-drag-block]");
      for (r = 0; r < n.length; r++)
        e[n[r].getAttribute("data-dc-drag-block")] = n[r];
    }
    for (r = 0; r < f.group.length; r++) {
      var a =
        f.epoch > 0 ? e[f.group[r].tid] : z(String(f.group[r].tid), f.name)[0];
      a && t.push(a);
    }
    return t;
  }
  function Ci(t, e) {
    for (
      var r = [t].concat(e || []),
        n = document.querySelectorAll("[data-dc-editor-dragging]"),
        a = 0;
      a < n.length;
      a++
    )
      r.indexOf(n[a]) < 0 &&
        !n[a].hasAttribute("data-dc-editor-overlay") &&
        (n[a].removeAttribute("data-dc-editor-dragging"),
        n[a].style.removeProperty("pointer-events"));
    for (var i = 0; i < r.length; i++) {
      var o = r[i];
      (o.getAttribute("data-dc-editor-dragging") == null &&
        o.setAttribute("data-dc-editor-dragging", ""),
        (o.style.getPropertyValue("pointer-events") !== "none" ||
          o.style.getPropertyPriority("pointer-events") !== "important") &&
          o.style.setProperty("pointer-events", "none", "important"));
    }
  }
  var ql = 500;
  function Df(t, e, r) {
    if (A.length < 2 || R !== r || A.indexOf(e) < 0) return null;
    for (var n = [], a = 0; a < A.length && n.length < ql; a++)
      if (A[a] !== e) {
        var i = z(String(A[a]), r);
        if (i.length === 1) {
          var o = i[0];
          if (
            !(o === t || o.contains(t) || t.contains(o)) &&
            !(!pe(Q(o)) || Ee(o) || Ae(o) || Sn(o))
          ) {
            var l = getComputedStyle(o),
              u = l.position === "absolute";
            if (!(l.position === "fixed" || (!u && !Uo(o, l)))) {
              if (u) {
                var s = ga(o, l);
                if (s.bothX || s.bothY || s.useRight || s.useBottom) continue;
              }
              n.push({
                tid: A[a],
                el: o,
                startRect: Q(o).getBoundingClientRect(),
                startW: u ? 0 : $o(l),
                startH: u ? 0 : Zo(o, l),
                startLines: {
                  gridRowStart: l.gridRowStart,
                  gridRowEnd: l.gridRowEnd,
                  gridColumnStart: l.gridColumnStart,
                  gridColumnEnd: l.gridColumnEnd,
                },
                freezeStyle: void 0,
                absStyles: null,
              });
            }
          }
        }
      }
    return (
      (n = n.filter(function (d) {
        return !n.some(function (p) {
          return p !== d && p.el.contains(d.el);
        });
      })),
      n.sort(function (d, p) {
        return d.el.compareDocumentPosition(p.el) & 2 ? 1 : -1;
      }),
      n.length ? n : null
    );
  }
  function Vl(t) {
    for (
      var e = {},
        r = document.querySelectorAll("[data-dc-drag-follower]"),
        n = 0;
      n < r.length;
      n++
    )
      e[r[n].getAttribute("data-dc-drag-follower")] = r[n];
    if (t.epoch === 0)
      for (var a = 0; a < t.brkFollowers.length; a++) {
        var i = t.brkFollowers[a];
        if (!e[i.tid]) {
          var o = z(String(i.tid), t.name);
          o.length === 1 && (e[i.tid] = o[0]);
        }
      }
    return e;
  }
  var Bf = 200,
    Gl = 24,
    Kf = [
      "data-dc-tpl",
      "data-dc-dragging",
      "data-dc-editor-selected",
      "data-dc-editor-hover",
      "data-dc-editor-hover-stroke",
      "data-dc-editor-stroke",
      "data-dc-editor-patch",
      "data-dc-editor-dragging",
      "data-dc-drag-follower",
      "data-dc-drag-block",
      "name",
      "autoplay",
      "srcdoc",
    ];
  function Ul(t, e) {
    try {
      var r = Q(t),
        n = r.getBoundingClientRect();
      if (!(n.width >= 1 && n.height >= 1)) return null;
      var a = getComputedStyle(r),
        i = (a.transform && a.transform !== "none") || bi(a),
        o = n;
      if (i) {
        var l = r.getAttribute("style");
        (r.style.setProperty("transform", "none", "important"),
          r.style.setProperty("rotate", "none", "important"),
          r.style.setProperty("scale", "none", "important"),
          r.style.setProperty("translate", "none", "important"),
          (o = r.getBoundingClientRect()),
          l == null ? r.removeAttribute("style") : r.setAttribute("style", l));
      }
      var u =
          r.offsetWidth > 0 && o.width > 0
            ? o.width / r.offsetWidth
            : vr(r) || 1,
        s = r.offsetWidth > 0 ? r.offsetWidth : o.width / u,
        d = r.offsetHeight > 0 ? r.offsetHeight : o.height / u,
        p = "var(--dc-chrome-unit,1px)",
        c = document.createElement("div");
      (c.setAttribute("data-dc-editor-overlay", ""),
        c.setAttribute("data-dc-editor-drag-proxy", ""),
        c.setAttribute("inert", ""),
        (c.style.cssText =
          "position:fixed;left:0;top:0;z-index:2147483646;pointer-events:none;display:none;transform-origin:0 0;box-sizing:border-box;width:" +
          s +
          "px;height:" +
          d +
          "px;outline:calc(2*" +
          p +
          ") solid " +
          xt +
          ";outline-offset:calc(-1*" +
          p +
          ");"));
      var g = t.querySelectorAll("*");
      if (g.length < Bf && !(e != null && Date.now() >= e) && !$l(t, g)) {
        for (
          var h = [],
            v = Zl(t, h),
            x = Math.min(Date.now() + Gl, e ?? 1 / 0),
            y = 0;
          y < h.length;
          y++
        )
          (y === 0 || h[y][2] || Date.now() < x) && Yf(h[y][0], h[y][1]);
        (v.style.setProperty("position", "static", "important"),
          v.style.setProperty("margin", "0", "important"),
          v.style.setProperty("pointer-events", "none", "important"),
          i
            ? (c.style.outline = "none")
            : ((c.style.background = If(r)),
              (c.style.borderRadius = a.borderRadius)),
          c.appendChild(v));
      } else
        ((c.style.cssText +=
          "outline:none;border-radius:calc(4*" +
          p +
          ");border:calc(1.5*" +
          p +
          ") dashed " +
          xt +
          ";background:color-mix(in srgb," +
          xt +
          " 8%,transparent);"),
          i &&
            ((c.style.width = n.width / u + "px"),
            (c.style.height = n.height / u + "px"),
            (o = n)));
      return (
        fe().appendChild(c),
        { wrap: c, s: u, ox: o.left - n.left, oy: o.top - n.top }
      );
    } catch {
      return null;
    }
  }
  function If(t) {
    for (var e = t.parentElement; e; e = e.parentElement) {
      var r = getComputedStyle(e).backgroundColor || "",
        n =
          !r ||
          r === "transparent" ||
          (r.indexOf("rgba(") === 0 && r.slice(-4) === ", 0)") ||
          r.slice(-4) === "/ 0)";
      if (!n) return r;
    }
    return "#fff";
  }
  var Ff =
    /^rgba?\((\d{1,3}(?:\.\d+)?), (\d{1,3}(?:\.\d+)?), (\d{1,3}(?:\.\d+)?)(?:, (\d(?:\.\d+)?|\.\d+))?\)$/;
  function ca(t) {
    if (t === "transparent") return [0, 0, 0, 0];
    var e = Ff.exec(typeof t == "string" ? t : "");
    return e ? [+e[1], +e[2], +e[3], e[4] === void 0 ? 1 : +e[4]] : null;
  }
  var Of =
      /^(img|video|canvas|svg|picture|iframe|embed|object|input|textarea|select|button|meter|progress)$/i,
    pa = ["Top", "Right", "Bottom", "Left"];
  function Xf(t) {
    if (Of.test(t.tagName || "")) return !0;
    for (var e = t.firstChild; e; e = e.nextSibling)
      if (e.nodeType === 3 && /\S/.test(e.data)) return !0;
    var r = getComputedStyle(t);
    if (r.backgroundImage && r.backgroundImage !== "none") return !0;
    var n = ca(Ir(r.backgroundColor || "transparent"));
    if (n === null || n[3] > 0.02) return !0;
    for (var a = 0; a < pa.length; a++)
      if (!(
        !(parseFloat(r["border" + pa[a] + "Width"]) > 0) ||
        r["border" + pa[a] + "Style"] === "none"
      )) {
        var i = ca(Ir(r["border" + pa[a] + "Color"] || "transparent"));
        if (i === null || i[3] > 0.02) return !0;
      }
    return !1;
  }
  function _f(t, e, r, n) {
    var a = t.getBoundingClientRect(),
      i = document.body;
    if (
      typeof document.elementsFromPoint != "function" ||
      !i ||
      !i.hasAttribute("data-dc-editor-on") ||
      i.getAttribute("data-dc-editor-tool") === "interact"
    )
      return !0;
    var o = Math.max(a.left, 0),
      l = Math.min(a.right, window.innerWidth),
      u = Math.max(a.top, 0),
      s = Math.min(a.bottom, window.innerHeight);
    if (!(l > o && s > u)) return !0;
    for (
      var d = [
          [(o + l) / 2, (u + s) / 2],
          [o + Math.min(4, (l - o) / 4), (u + s) / 2],
        ],
        p = 0;
      p < d.length;
      p++
    ) {
      for (
        var c = document.elementsFromPoint(d[p][0], d[p][1]),
          g = !1,
          h = !1,
          v = 0,
          x = 0;
        x < c.length;
        x++
      ) {
        var y = c[x];
        if ((y === t && (g = !0), y === e)) {
          if (!g) return !0;
          h = !0;
          break;
        }
        if (
          (r.indexOf(y) >= 0 && v++,
          !(y === t || t.contains(y) || y.contains(t)) &&
            !(
              y.closest &&
              y.closest(
                "[data-dc-editor-overlay],[data-dc-editor-overlay-root],[data-omelette-chrome],[data-omelette-injected]",
              )
            ) &&
            Xf(y))
        )
          return !0;
      }
      if (!g || v !== r.length || (!h && !n)) return !0;
    }
    return !1;
  }
  function Wf(t) {
    for (
      var e = [], r = [], n = null, a = null, i = !1, o = t;
      o && o.nodeType === 1;
      o = o.parentElement
    ) {
      var l = getComputedStyle(o);
      if (
        (l.opacity !== "" && parseFloat(l.opacity) < 1) ||
        (l.filter && l.filter !== "none") ||
        (l.mixBlendMode && l.mixBlendMode !== "normal") ||
        (l.maskImage && l.maskImage !== "none") ||
        (l.webkitMaskImage && l.webkitMaskImage !== "none")
      )
        return null;
      if (n !== null) {
        if (o === document.documentElement) {
          var u = ca(Ir(l.backgroundColor || "transparent"));
          i =
            (l.backgroundImage && l.backgroundImage !== "none") ||
            u === null ||
            u[3] > 0.02;
        }
        continue;
      }
      if (
        (l.backgroundImage && l.backgroundImage !== "none") ||
        (l.backdropFilter && l.backdropFilter !== "none") ||
        (l.webkitBackdropFilter && l.webkitBackdropFilter !== "none")
      )
        return null;
      var s = ca(Ir(l.backgroundColor || "transparent"));
      if (s === null) return null;
      if (s[3] >= 0.98) {
        for (var d = s[0], p = s[1], c = s[2], g = e.length - 1; g >= 0; g--) {
          var h = e[g],
            v = h[3];
          ((d = v * h[0] + (1 - v) * d),
            (p = v * h[1] + (1 - v) * p),
            (c = v * h[2] + (1 - v) * c));
        }
        ((n =
          "rgb(" +
          Math.round(d) +
          ", " +
          Math.round(p) +
          ", " +
          Math.round(c) +
          ")"),
          (a = o));
      } else s[3] > 0.02 && (e.push(s), r.push(o));
    }
    if (n === null) return null;
    var x = a === document.documentElement || (a === document.body && !i);
    return _f(t, a, r, x) ? null : n;
  }
  function Hf(t, e) {
    if (t.namespaceURI === "http://www.w3.org/2000/svg") return null;
    var r = Wf(t);
    return r === null
      ? null
      : { behind: r, ink: Ir(e.webkitTextFillColor || e.color) };
  }
  function $l(t, e) {
    for (var r = -1; r < e.length; r++) {
      var n = r < 0 ? t : e[r],
        a = n.localName || "",
        i = n.getAttribute("is");
      if (
        n.shadowRoot ||
        (window.customElements &&
          ((a.indexOf("-") > 0 && customElements.get(a)) ||
            (i && customElements.get(i))))
      )
        return !0;
    }
    return !1;
  }
  function Zl(t, e) {
    if (t.nodeType !== 1) return t.cloneNode(!1);
    var r = t.localName || "",
      n = r.indexOf("-") >= 0 || r.indexOf(":") >= 0;
    if (
      r === "style" ||
      r === "link" ||
      r === "script" ||
      r === "template" ||
      r === "noscript" ||
      r === "meta" ||
      r === "base"
    )
      return null;
    for (
      var a = n
          ? document.createElement("span")
          : document.createElementNS(t.namespaceURI, r),
        i = 0;
      i < t.attributes.length;
      i++
    ) {
      var o = t.attributes[i],
        l = o.name.toLowerCase();
      if (!(
        l === "is" ||
        l === "autofocus" ||
        l.indexOf("on") === 0 ||
        Kf.indexOf(l) >= 0
      ))
        try {
          a.setAttributeNS(o.namespaceURI, o.name, o.value);
        } catch {}
    }
    ((r === "iframe" ||
      r === "video" ||
      r === "audio" ||
      r === "source" ||
      r === "embed") &&
      a.removeAttribute("src"),
      r === "object" && a.removeAttribute("data"),
      e.push([t, a, n]));
    for (var u = t.firstChild; u; u = u.nextSibling) {
      var s = Zl(u, e);
      s && a.appendChild(s);
    }
    return a;
  }
  function Yf(t, e) {
    if (e.style) {
      for (var r = getComputedStyle(t), n = "", a = 0; a < r.length; a++)
        n += r[a] + ":" + r.getPropertyValue(r[a]) + ";";
      e.style.cssText = n;
    }
  }
  function Jl(t, e) {
    var r = f.proxy;
    if (r) {
      ((r.wrap.style.display = "block"),
        (r.wrap.style.opacity = e ? "0.4" : "0.85"),
        (r.wrap.style.transform =
          "translate(" +
          (t.clientX - f.grabDx + r.ox) +
          "px," +
          (t.clientY - f.grabDy + r.oy) +
          "px) scale(" +
          r.s +
          ")"));
      for (var n = 0; n < (f.groupProxies || []).length; n++) {
        var a = f.groupProxies[n];
        ((a.p.wrap.style.display = a.out ? "none" : "block"),
          (a.p.wrap.style.opacity = r.wrap.style.opacity),
          (a.p.wrap.style.transform =
            "translate(" +
            (t.clientX - f.grabDx + a.dx + a.p.ox) +
            "px," +
            (t.clientY - f.grabDy + a.dy + a.p.oy) +
            "px) scale(" +
            a.p.s +
            ")"));
      }
      f.parked = !f.alt;
      var i = f.alt ? "copy" : "move";
      document.body.getAttribute("data-dc-editor-proxy") !== i &&
        document.body.setAttribute("data-dc-editor-proxy", i);
    }
  }
  function En(t) {
    t.proxy && (t.proxy.wrap.style.display = "none");
    for (var e = 0; e < (t.groupProxies || []).length; e++)
      t.groupProxies[e].p.wrap.style.display = "none";
    ((t.parked = !1),
      document.body.hasAttribute("data-dc-editor-proxy") &&
        document.body.removeAttribute("data-dc-editor-proxy"));
  }
  function zf() {
    if (!(!f || !f.parked)) {
      var t = An(),
        e = zl();
      (t && Ci(t, e),
        !(
          !f.flowBox ||
          !f.flowBox.isConnected ||
          !Ht ||
          Ht.style.display !== "block"
        ) &&
          t &&
          t.parentElement === f.flowBox &&
          Ei(f.flowBox, t, null, e));
    }
  }
  function qf(t, e) {
    var r = "flow|" + t.n + "|" + t.epoch;
    (f.previewKey === r && f.previewBox === f.flowBox) ||
      ((f.previewKey = r),
      (f.previewBox = f.flowBox),
      (f.previewActive = !0),
      (Ce = {}),
      M({
        type: "movePreview",
        tid: f.tid,
        name: f.name,
        gestureKey: f.gestureKey,
        targetTid: t.targetTid,
        position: t.position,
        clearPositioning: e,
        epoch: t.epoch,
        freezeStyle: f.freezeStyle || void 0,
        group: f.group || void 0,
        markFollowers: f.brkFollowers
          ? f.brkFollowers.map(function (n) {
              return n.tid;
            })
          : void 0,
      }));
  }
  function Si(t) {
    if (
      (t.textContent || "").trim() === "" &&
      t.tagName !== "LI" &&
      getComputedStyle(t).display !== "list-item"
    )
      return null;
    var e = Ql(t, function (r, n) {
      return Go(t, n, Cd);
    });
    return e === void 0
      ? Go(t, getComputedStyle(t), ["font-size", "font-family"])
      : e;
  }
  var Vf =
    /^(INPUT|SELECT|TEXTAREA|OPTION|IMG|IFRAME|VIDEO|AUDIO|CANVAS|OBJECT|EMBED)$/;
  function Ql(t, e) {
    var r = t.parentNode;
    if (!(!r || Vf.test(t.tagName) || t.tagName.indexOf("-") >= 0)) {
      var n = t.cloneNode(!1),
        a = null;
      (n.setAttribute("data-dc-editor-overlay", ""),
        t.firstChild && n.appendChild(document.createTextNode("x")),
        n.style.setProperty("transition", "none", "important"),
        n.style.setProperty("animation", "none", "important"));
      try {
        (r.insertBefore(n, t), (a = e(n, getComputedStyle(n))));
      } catch {
        a = null;
      }
      return (n.parentNode && n.parentNode.removeChild(n), a);
    }
  }
  function gr(t) {
    t &&
      t.previewActive &&
      ((t.previewActive = !1),
      (t.previewKey = ""),
      (Ce = {}),
      M({
        type: "movePreviewCancel",
        tid: t.tid,
        name: t.name,
        gestureKey: t.gestureKey,
      }));
  }
  var _e = null,
    mr = {},
    va = 0,
    ha = !1,
    Bt = null,
    jl = !1;
  function ce(t, e, r) {
    if (e.length) {
      var n = mr[t];
      if (!n) {
        if (!_e) {
          var a = document.createElement("style");
          (a.setAttribute("data-dc-editor-overlay", ""),
            fe().appendChild(a),
            (_e = a.sheet));
        }
        var i = "p" + ++va;
        (_e.insertRule(
          '[data-dc-editor-patch="' + i + '"]{}',
          _e.cssRules.length,
        ),
          (n = mr[t] =
            { id: i, style: _e.cssRules[_e.cssRules.length - 1].style }));
      }
      for (var o = 0; o < e.length; o++)
        e[o].getAttribute("data-dc-editor-patch") !== n.id &&
          e[o].setAttribute("data-dc-editor-patch", n.id);
      for (var l in r)
        n.style.setProperty(l, r[l] == null ? "" : String(r[l]), "important");
    }
  }
  function Gf(t) {
    for (var e in mr) if (mr[e].id === t) return !0;
    return !1;
  }
  function Cn() {
    if (((ha = !1), !!va)) {
      if (((va = 0), (mr = {}), _e))
        for (; _e.cssRules.length;) _e.deleteRule(0);
      Ut("data-dc-editor-patch");
    }
  }
  function ee(t) {
    var e = window.__dcRootName && window.__dcRootName();
    return !!e && t === e;
  }
  var tu = null,
    Ti = !1;
  function Uf() {
    Ti ||
      ((Ti = !0),
      requestAnimationFrame(function () {
        ((Ti = !1), I && eu() !== tu && ru());
      }));
  }
  function eu() {
    for (
      var t = "",
        e = document.head ? document.head.querySelectorAll("style") : [],
        r = 0;
      r < e.length;
      r++
    )
      e[r] !== or && (t += e[r].textContent + " ");
    return t;
  }
  function ru() {
    try {
      tu = eu();
      var t = I && !document.body.hasAttribute("data-dc-capturing");
      t && document.body.setAttribute("data-dc-capturing", "");
      var e = "";
      try {
        for (
          var r = [document.body, document.documentElement], n = 0;
          n < r.length && !e;
          n++
        ) {
          var a = getComputedStyle(r[n]),
            i =
              (a.backgroundColor &&
                a.backgroundColor !== "transparent" &&
                a.backgroundColor !== "rgba(0, 0, 0, 0)") ||
              (a.backgroundImage && a.backgroundImage !== "none");
          i &&
            (e =
              a.background ||
              (a.backgroundImage !== "none" ? a.backgroundImage + " " : "") +
                (a.backgroundColor || ""));
        }
      } finally {
        t && document.body.removeAttribute("data-dc-capturing");
      }
      e
        ? document.documentElement.style.setProperty("--dc-editor-host-bg", e)
        : document.documentElement.style.removeProperty("--dc-editor-host-bg");
      var o = getComputedStyle(document.body),
        l = 0;
      ([
        "marginTop",
        "marginBottom",
        "paddingTop",
        "paddingBottom",
        "borderTopWidth",
        "borderBottomWidth",
      ].forEach(function (u) {
        l += parseFloat(o[u]) || 0;
      }),
        document.documentElement.style.setProperty(
          "--dc-editor-host-vpad",
          l + "px",
        ));
    } catch {}
  }
  function $f(t, e) {
    var r = se;
    return !r || r.el !== t ? e : ((se = null), r.origNodes);
  }
  function Zf(t, e, r) {
    if (e === r) return t.innerHTML;
    for (var n = document.createElement("div"), a = 0; a < e.length; a++)
      n.appendChild(e[a].cloneNode(!0));
    for (var i = n.querySelectorAll("[data-dc-tpl]"), o = 0; o < i.length; o++)
      i[o].removeAttribute("data-dc-tpl");
    return n.innerHTML;
  }
  function nu(t) {
    try {
      t.el.innerHTML = "";
      for (var e = 0; e < t.origNodes.length; e++)
        t.el.appendChild(t.origNodes[e]);
    } catch {}
  }
  function Jf() {
    var t = se;
    ((se = null),
      t &&
        t.el.isConnected &&
        !(b && (b.el === t.el || b.svg === t.el)) &&
        nu(t));
  }
  function Qf() {
    if (((Be = []), se)) {
      var t = se,
        e = null;
      if (!t.el.isConnected || (b && (b.el === t.el || b.svg === t.el)))
        se = null;
      else {
        try {
          e = Yo(window.__dcAnnotatedTemplate(t.name), t.tid);
        } catch {}
        e !== null && e === t.content && ((se = null), nu(t));
      }
    }
    ((Kr = { key: "", els: [] }),
      va &&
        ((ha = !0),
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            ha && au();
          });
        })));
  }
  function au() {
    if (
      (Cn(),
      O &&
        O.lastPatch &&
        ce(O.gestureKey, O.els && O.els.length ? O.els : [O.el], O.lastPatch),
      O && O.group && yc(O),
      f && f.lastPatch)
    ) {
      var t = An();
      t && ce(f.gestureKey, [t], f.lastPatch);
    }
    (f && f.followers && ec(f), jl && Bt && Mi());
  }
  function Mi() {
    for (var t = 0; t < Bt.tids.length; t++)
      ce(Bt.name + "|" + Bt.tids[t], z(String(Bt.tids[t]), Bt.name), Bt.styles);
  }
  var Pi = !1,
    Ce = {};
  function Or(t) {
    ((Ce[String(t.name) + "|" + t.tid] = t),
      !Pi &&
        ((Pi = !0),
        requestAnimationFrame(function () {
          Pi = !1;
          var e = Ce;
          Ce = {};
          for (var r in e) M(e[r]);
        })));
  }
  function jf(t) {
    var e = null;
    try {
      e = t.computedStyleMap ? t.computedStyleMap() : null;
    } catch {}
    var r = function (n) {
      if (e) return String(e.get(n)) === "auto";
      var a = t.style[n];
      if (a) return iu.test(a);
      var i = tc(t, n);
      return i === "auto" || (!i && !t.getAttribute(n));
    };
    return { w: r("width"), h: r("height") };
  }
  var iu = /^(auto|initial|unset|revert|revert-layer|inherit)$/;
  function tc(t, e) {
    for (var r = "", n = 0, a = 0; n < document.styleSheets.length; n++) {
      var i = null;
      try {
        i = document.styleSheets[n].cssRules;
      } catch {}
      for (var o = 0; i && o < i.length && a < 4e3; o++, a++) {
        var l = i[o],
          u = l.style && l.selectorText ? l.style[e] : "";
        try {
          if (u && t.matches(l.selectorText)) {
            if (iu.test(u)) return "auto";
            r = "set";
          }
        } catch {}
      }
    }
    return r;
  }
  function ga(t, e) {
    var r = t.style,
      n = null;
    try {
      n = t.computedStyleMap ? t.computedStyleMap() : null;
    } catch {}
    function a(s) {
      var d = n ? n.get(s) : r[s];
      return ((d = d == null ? "" : String(d)), d !== "auto" ? d : "");
    }
    var i = a("left"),
      o = a("right"),
      l = a("top"),
      u = a("bottom");
    return {
      useRight: !!o && !i,
      useBottom: !!u && !l,
      bothX: !!i && !!o,
      bothY: !!l && !!u,
      startLeft: parseFloat(e.left) || 0,
      startTop: parseFloat(e.top) || 0,
      startRight: parseFloat(e.right) || 0,
      startBottom: parseFloat(e.bottom) || 0,
    };
  }
  function Sn(t) {
    if (!te || !t || _(t) !== Br) return !1;
    var e = null;
    for (var r in te) {
      var n = te[r];
      if (n && n.kind === "for" && n.kids) {
        e || (e = {});
        for (var a = 0; a < n.kids.length; a++) e[n.kids[a]] = !0;
      }
    }
    if (!e) return !1;
    for (var i = t; i && i.getAttribute;) {
      var o = i.getAttribute("data-dc-tpl");
      if (o != null && e[parseInt(o, 10)]) return !0;
      i = i.parentElement;
    }
    return !1;
  }
  function ou(t, e) {
    if (!te || (e || null) !== Br) return null;
    var r = null;
    for (var n in te) {
      var a = te[n];
      a &&
        a.kids &&
        a.kids.indexOf(t) >= 0 &&
        (r === null || +n > +r) &&
        (r = n);
    }
    return r;
  }
  function ki(t, e) {
    return t.el && t.el.isConnected ? [t.el] : z(String(t.tid), e);
  }
  function ec(t) {
    for (var e = 0; e < t.followers.length; e++) {
      var r = t.followers[e];
      r.lastPatch && ce(t.gestureKey + ":" + r.tid, ki(r, t.name), r.lastPatch);
    }
  }
  function rc(t) {
    for (var e = 0; e < t.followers.length; e++)
      M({
        type: "styleRevert",
        tid: t.followers[e].tid,
        name: t.name,
        gestureKey: t.gestureKey,
        keepUndo: !0,
        follower: !0,
      });
  }
  function lu(t, e) {
    var r = t.lift;
    return {
      gestureKey: t.gestureKey,
      tids: [t.tid],
      name: t.name,
      alt: !!e,
      w: r.w,
      h: r.h,
      ew: r.ew,
      eh: r.eh,
      ox: r.ox,
      oy: r.oy,
      gx: Math.round(t.grabDx / r.s),
      gy: Math.round(t.grabDy / r.s),
    };
  }
  function uu(t) {
    if (!(!f || f.exited || f.followers)) {
      if (((f.exited = !0), gr(f), f.brkFollowers)) {
        var e = An();
        e && Ci(e);
      }
      var r = lu(f, t);
      ((r.type = "dragExit"),
        M(r),
        Yt(),
        Se(),
        En(f),
        wt && (wt.box.style.display = "none"),
        (f.commit = null));
    }
  }
  function re(t) {
    if (f) {
      var e = f;
      ((f = null),
        sr && ((sr = null), _r()),
        Yd(),
        M({ type: "dragState", live: !1, gestureKey: e.gestureKey }),
        e.exited &&
          !e.droppedOut &&
          M({ type: "dragCancel", gestureKey: e.gestureKey }),
        (Ce = {}),
        Se(),
        Yt());
      for (
        var r = document.querySelectorAll("[data-dc-editor-dragging]"), n = 0;
        n < r.length;
        n++
      )
        r[n].style.removeProperty("pointer-events");
      (Ut("data-dc-editor-dragging"),
        Ut("data-dc-drag-parent"),
        Ut("data-dc-drag-follower"),
        Ut("data-dc-drag-block"),
        document.body.removeAttribute("data-dc-editor-brk"),
        e.altClone && e.altClone.remove(),
        En(e),
        e.proxy && e.proxy.wrap.remove());
      for (var a = 0; a < (e.groupProxies || []).length; a++)
        e.groupProxies[a].p.wrap.remove();
      document.body.style.cursor = "";
      var i =
        document.querySelector("[data-dc-dragging]") ||
        (e.el && e.el.isConnected ? e.el : z(String(e.tid), e.name)[0] || null);
      (i &&
        (i.style.removeProperty("pointer-events"),
        i.removeAttribute("data-dc-dragging")),
        wt && (wt.box.style.display = "none"));
      var o = e.commit;
      if (!t || !o) {
        if ((gr(e), e.followers && rc(e), e.brkFollowers))
          for (var l = 0; l < e.brkFollowers.length; l++)
            e.brkFollowers[l].absStyles &&
              M({
                type: "styleRevert",
                tid: e.brkFollowers[l].tid,
                name: e.name,
                gestureKey: e.gestureKey,
                keepUndo: !0,
                follower: !0,
              });
        ((e.mode === "abs" || e.exited || e.droppedOut) &&
          M({
            type: "styleRevert",
            tid: e.tid,
            name: e.name,
            gestureKey: e.gestureKey,
            keepUndo: !1,
          }),
          Y());
        return;
      }
      if (
        (e.alt &&
          e.mode === "abs" &&
          o.kind !== "flow" &&
          M({
            type: "styleRevert",
            tid: e.tid,
            name: e.name,
            gestureKey: e.gestureKey,
            keepUndo: !0,
          }),
        o.kind === "absSame")
      ) {
        M({
          type: "move",
          tid: e.tid,
          name: e.name,
          gestureKey: e.gestureKey,
          targetTid: null,
          position: "into",
          alt: e.alt,
          absolute: !0,
          fixed: !!e.fixed,
          absStyles: e.absStyles || {},
          followers: e.followers
            ? e.followers.map(function (u) {
                return {
                  tid: u.tid,
                  absStyles: u.absStyles || {},
                  fixed: !!u.fixed,
                };
              })
            : void 0,
        });
        return;
      }
      if (o.kind === "abs") {
        M({
          type: "move",
          tid: e.tid,
          name: e.name,
          gestureKey: e.gestureKey,
          targetTid: o.tid,
          position: o.tid == null ? "root-end" : "into",
          epoch: o.epoch,
          alt: e.alt,
          absolute: !0,
          absStyles: e.absStyles || {},
          parentNeedsPositioning: o.needsPositioning,
          flatten: (!e.alt && !o.brk && e.flatten) || void 0,
          breakout: o.brk || void 0,
          freezeStyle: e.freezeStyle || void 0,
          followers: o.followers,
        });
        return;
      }
      M({
        type: "move",
        tid: e.tid,
        name: e.name,
        gestureKey: e.gestureKey,
        targetTid: o.slot.targetTid,
        position: o.slot.position,
        alt: e.alt,
        epoch: o.slot.epoch,
        clearPositioning: o.clearPositioning,
        freezeStyle: e.freezeStyle || void 0,
        group: e.group || void 0,
      });
    }
  }
  function Ni(t, e, r, n, a) {
    if (!(t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents)) {
      var i = _t(),
        o = i ? i.getAttribute("data-sc-name") : null;
      if (o) {
        var l = a || { tids: A.slice(), name: R };
        ((At = {
          x: t.clientX,
          y: t.clientY,
          containerEl: e,
          rootN: o,
          mode: r,
          toggle: !!n,
          gestureKey: Dr || mi(),
          baseTids: n && l.name === o ? l.tids.slice() : [],
          prevTids: l.tids.slice(),
          prevName: l.name,
          prevForeign: ct,
        }),
          (Dr = null));
      }
    }
  }
  function ma(t) {
    if (Ee(t) || Ae(t) || (t.tagName || "").toLowerCase() === "svg") return !1;
    for (var e = ya(t, _(t), "plain"), r = 0; r < e.length; r++) {
      var n = getComputedStyle(e[r]);
      if (
        n.display !== "none" &&
        (n.display !== "inline" ||
          n.position === "absolute" ||
          n.position === "fixed")
      )
        return !0;
    }
    return !1;
  }
  function su(t) {
    for (var e = new Set(), r = 0; r < t.length; r++)
      for (var n = t[r].parentElement; n;) (e.add(n), (n = n.parentElement));
    return t.filter(function (a) {
      return !e.has(a);
    });
  }
  function ya(t, e, r) {
    for (
      var n = document.querySelectorAll("[data-dc-tpl]"), a = [], i = 0;
      i < n.length;
      i++
    ) {
      var o = n[i];
      if (_(o) === e) {
        if (r !== "deep") {
          var l = o.parentElement
            ? o.parentElement.closest("[data-dc-tpl]")
            : null;
          if (l !== t) continue;
        }
        Ae(o) || o.closest("[data-dc-editor-overlay]") || a.push(o);
      }
    }
    return a;
  }
  function nc(t) {
    var e = At;
    At = null;
    var r = document.createElement("div");
    (r.setAttribute("data-dc-editor-overlay", ""),
      r.setAttribute("data-dc-editor-marquee", ""),
      (r.style.cssText =
        "position:fixed;z-index:2147483646;pointer-events:none;border:" +
        Gt(1) +
        "px solid " +
        xt +
        ";background:color-mix(in srgb," +
        xt +
        " 10%,transparent);"),
      fe().appendChild(r));
    var n = e.containerEl
      ? parseInt(e.containerEl.getAttribute("data-dc-tpl"), 10)
      : null;
    ((ht = {
      box: r,
      x: e.x,
      y: e.y,
      baseTids: e.baseTids,
      prevTids: e.prevTids,
      prevName: e.prevName,
      prevForeign: e.prevForeign,
      gestureKey: e.gestureKey,
      rootN: e.rootN,
      mode: e.mode,
      toggle: e.toggle,
      containerTid: isNaN(n) ? null : n,
      cands: ya(e.containerEl, e.rootN, e.mode),
      lastKey: null,
      redo: !1,
    }),
      xe(),
      qt(),
      M({ type: "boxLive", gestureKey: e.gestureKey }),
      du(t));
  }
  function du(t) {
    var e = ht,
      r = Math.min(e.x, t.clientX),
      n = Math.min(e.y, t.clientY),
      a = Math.abs(t.clientX - e.x),
      i = Math.abs(t.clientY - e.y);
    ((e.box.style.left = r + "px"),
      (e.box.style.top = n + "px"),
      (e.box.style.width = a + "px"),
      (e.box.style.height = i + "px"));
    for (
      var o = e.baseTids.slice(),
        l = e.cands.length === 0 && e.lastKey != null,
        u = 0;
      u < e.cands.length && !l;
      u++
    )
      l = !e.cands[u].isConnected;
    if (l) {
      var s =
        e.containerTid == null ? null : z(String(e.containerTid), e.rootN)[0];
      ((e.cands = e.containerTid == null || s ? ya(s, e.rootN, e.mode) : []),
        (e.redo = e.cands.length > 0));
    }
    for (var d = [], p = e.mode === "deep", c = 0; c < e.cands.length; c++) {
      var g = Q(e.cands[c]),
        h = g.getBoundingClientRect();
      if (!(h.width === 0 && h.height === 0)) {
        var v = p
          ? r <= h.left && h.right <= r + a && n <= h.top && h.bottom <= n + i
          : r <= h.right && h.left <= r + a && n <= h.bottom && h.top <= n + i;
        v && pe(g) && d.push(e.cands[c]);
      }
    }
    p && (d = su(d));
    for (var x = 0; x < d.length; x++) {
      var y = parseInt(d[x].getAttribute("data-dc-tpl"), 10),
        m = o.indexOf(y);
      e.toggle && m >= 0 ? o.splice(m, 1) : m < 0 && o.push(y);
    }
    var w = o.join(",");
    (w === e.lastKey && !e.redo) ||
      ((e.lastKey = w),
      (e.redo = !1),
      (A = o),
      (ft = null),
      (R = o.length ? e.rootN : null),
      yt(),
      Ct(void 0, void 0, e.toggle));
  }
  function Xr(t) {
    if (ht) {
      var e = ht;
      if (
        ((ht = null),
        e.box.remove(),
        M({ type: t ? "boxCancel" : "boxEnd", gestureKey: e.gestureKey }),
        !t && e.lastKey != null && Ct(void 0, void 0, e.toggle),
        t)
      ) {
        ((A = e.prevTids.slice()), (ft = null), (R = e.prevName), yt());
        var r =
          e.prevForeign && e.prevForeign.isConnected ? e.prevForeign : null;
        if (r) {
          var n = r.outerHTML;
          ((ct = r),
            r.setAttribute("data-dc-editor-selected", ""),
            M({
              type: "select",
              tids: null,
              foreign: { tag: r.tagName.toLowerCase(), html: n, text: "" },
              re: "boxcancel:" + e.gestureKey,
            }));
        } else Ct(void 0, "boxcancel:" + e.gestureKey, e.toggle);
      }
      Y();
    }
  }
  var Li = {
    rect: [120, 120],
    oval: [96, 96],
    frame: [200, 96],
    grid: [200, 120],
    text: [140, 22],
    arrow: null,
    line: null,
    draw: null,
  };
  function Ri() {
    if (wt) return wt;
    var t = document.createElement("div");
    (t.setAttribute("data-dc-editor-overlay", ""),
      (t.style.cssText =
        "position:fixed;z-index:2147483645;pointer-events:none;display:none;border:1.5px dashed " +
        xt +
        ";background:color-mix(in srgb," +
        xt +
        " 8%,transparent);border-radius:4px;"));
    var e = document.createElement("div");
    (e.setAttribute("data-dc-editor-overlay", ""),
      (e.style.cssText =
        "position:fixed;z-index:2147483644;pointer-events:none;display:none;"));
    var r = document.createElement("div");
    return (
      (r.style.cssText =
        "position:absolute;top:-18px;left:0;font:10px/1.4 ui-monospace,monospace;background:rgba(120,120,120,0.9);color:#fff;padding:1px 5px;border-radius:3px;white-space:nowrap;"),
      e.appendChild(r),
      fe().appendChild(e),
      fe().appendChild(t),
      (wt = { box: t, parent: e, label: r }),
      wt
    );
  }
  function We() {
    wt && ((wt.box.style.display = "none"), (wt.parent.style.display = "none"));
  }
  function Di(t, e) {
    var r = Ri();
    ((r.parent.style.display = "block"),
      (r.parent.style.left = t.left + "px"),
      (r.parent.style.top = t.top + "px"),
      (r.parent.style.width = t.width + "px"),
      (r.parent.style.height = t.height + "px"),
      (r.parent.style.outline = Gt(1.5) + "px solid " + xt),
      (r.parent.style.outlineOffset = "0px"),
      (r.label.style.display = "none"));
  }
  function Se() {
    wt && (wt.parent.style.display = "none");
  }
  var ac = {
    button: 1,
    td: 1,
    th: 1,
    caption: 1,
    table: 1,
    object: 1,
    marquee: 1,
    applet: 1,
    template: 1,
    html: 1,
    foreignobject: 1,
    desc: 1,
    title: 1,
    mi: 1,
    mo: 1,
    mn: 1,
    ms: 1,
    mtext: 1,
    "annotation-xml": 1,
  };
  function ic(t) {
    var e = D === "arrow" || D === "line" || D === "draw" ? "svg" : "div",
      r = (t.tagName || "").toLowerCase();
    if (sa[r] && !sa[r][e]) return !0;
    for (
      var n = Bl[e] ? t : null;
      n && !ac[(r = (n.tagName || "").toLowerCase())];
      n = n.parentElement
    )
      if (r === "p") return !0;
    return !1;
  }
  function Tn(t, e) {
    for (var r = document.elementFromPoint(t, e); r && r instanceof SVGElement;)
      r = r.parentElement;
    for (
      r = r && r.closest ? r.closest("[data-dc-tpl]") : null;
      r && (!Dl(r) || ic(r) || we(r) || Xe(r) || Ze(r));
    )
      r =
        r.parentElement && r.parentElement.closest
          ? r.parentElement.closest("[data-dc-tpl]")
          : null;
    if (r)
      return {
        el: r,
        tid: parseInt(r.getAttribute("data-dc-tpl"), 10),
        name: it(r),
        rect: r.getBoundingClientRect(),
      };
    var n = document.querySelector(".sc-host"),
      a = n
        ? n.getBoundingClientRect()
        : { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
    return {
      el: n,
      tid: null,
      name: (n && n.getAttribute("data-sc-name")) || null,
      rect: {
        left: a.left,
        top: a.top,
        right: Math.max(a.right, innerWidth),
        bottom: Math.max(a.bottom, innerHeight),
        width: Math.max(a.right, innerWidth) - a.left,
        height: Math.max(a.bottom, innerHeight) - a.top,
      },
    };
  }
  function oc(t) {
    if (D === "arrow" || D === "line" || D === "draw") {
      We();
      return;
    }
    var e = Ri(),
      r = D in Li ? Li[D] : [120, 120];
    (r
      ? (e.box.style.display = "block")
      : ((e.box.style.display = "none"), (r = [0, 0])),
      (e.box.style.left = t.clientX + "px"),
      (e.box.style.top = t.clientY + "px"),
      (e.box.style.width = r[0] + "px"),
      (e.box.style.height = r[1] + "px"),
      (e.box.style.borderRadius = D === "oval" ? "50%" : "4px"),
      (e.parent.style.display = "none"));
  }
  function ba() {
    return document.querySelectorAll("[data-dc-tpl]").length;
  }
  function Bi(t) {
    clearTimeout(t.timer);
    try {
      t.node.remove();
    } catch {}
  }
  function Ki(t) {
    Nt ||
      ((Nt = { els: [], obs: null }),
      (Nt.obs = new MutationObserver(cu)),
      Nt.obs.observe(document.body, { childList: !0, subtree: !0 }));
    var e = { node: t, base: ba(), timer: null };
    ((e.timer = setTimeout(function () {
      (Bi(e), cu());
    }, 800)),
      Nt.els.push(e));
  }
  function fu() {
    if (Nt) {
      Nt.obs && Nt.obs.disconnect();
      for (var t = 0; t < Nt.els.length; t++) Bi(Nt.els[t]);
      Nt = null;
    }
  }
  function cu() {
    if (Nt) {
      for (var t = ba(), e = [], r = !1, n = 0; n < Nt.els.length; n++) {
        var a = Nt.els[n];
        a.node.isConnected
          ? t > a.base
            ? (Bi(a), (r = !0))
            : (t < a.base && (a.base = t), e.push(a))
          : (clearTimeout(a.timer), (r = !0));
      }
      (r && yt(),
        e.length === 0 ? (Nt.obs.disconnect(), (Nt = null)) : (Nt.els = e));
    }
  }
  function Mn(t) {
    if (B) {
      var e = B;
      ((B = null), We());
      var r =
        D === "arrow" || D === "line" ? e.w > 4 || e.h > 4 : e.w > 4 && e.h > 4;
      if (!t || !r) {
        e.box.remove();
        return;
      }
      Ki(e.box);
      var n = Lt(e.parentEl);
      M({
        type: "insert",
        name: e.parentName,
        targetTid: e.parentTid,
        position: e.parentTid == null ? "root-end" : "into",
        rect: {
          x: Math.round((e.x - e.parentRect.left) / n),
          y: Math.round((e.y - e.parentRect.top) / n),
          w: Math.round(e.w / n),
          h: Math.round(e.h / n),
        },
        dir: { x: e.dirX || 1, y: e.dirY || 1 },
      });
    }
  }
  function ne(t) {
    if (!t || (t.tagName || "").toLowerCase() !== "svg") return null;
    var e = Ld(t);
    if (!e) return null;
    var r = Fr(t);
    if (!r || !r.none) return null;
    try {
      var n = getComputedStyle(e.shaft);
      if (n.transform !== "none" || bi(n)) return null;
    } catch {}
    var a =
      e.tag === "path" &&
      /(^|;)\s*fill:\s*none/.test(t.getAttribute("style") || "") &&
      t.style.overflow === "visible" &&
      (e.legacy ||
        (t.getAttribute("preserveAspectRatio") === "none" &&
          /^\s*M\s*[-\d.e+]+[\s,]+[-\d.e+]+\s+L\s*[-\d.e+]+[\s,]+[-\d.e+]+\s*$/i.test(
            e.shaft.getAttribute("d") || "",
          )));
    if (!a) {
      var i = getComputedStyle(t),
        o = t.style,
        l = function (K) {
          return /^-?[\d.]+px$/.test(String(K || "").trim());
        };
      if (
        (i.position !== "absolute" && i.position !== "fixed") ||
        !l(o.left) ||
        !l(o.top) ||
        o.right ||
        o.bottom
      )
        return null;
    }
    var u = Oe(t),
      s = u.w,
      d = u.h;
    if (!(s > 0) || !(d > 0)) return null;
    var p = null;
    try {
      p = t.getCTM ? t.getCTM() : null;
    } catch {}
    var c = function (K, J) {
        if (!p) return { x: K, y: J };
        var W = t.createSVGPoint();
        ((W.x = K), (W.y = J));
        var H = W.matrixTransform(p);
        return { x: H.x, y: H.y };
      },
      g = 1;
    if (p && !a) {
      var h = Math.hypot(p.a, p.b),
        v = Math.hypot(p.c, p.d),
        x = e.ex - e.sx,
        y = e.ey - e.sy;
      if (
        ((g = (h * v * Math.hypot(x, y)) / Math.hypot(h * x, v * y)),
        !(g > 1e-4 && g < 1e4))
      )
        return null;
    }
    var m = {},
      w = {};
    try {
      var E = getComputedStyle(e.shaft),
        C = getComputedStyle(t);
      [
        "stroke",
        "stroke-width",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-opacity",
        "stroke-miterlimit",
        "vector-effect",
      ].forEach(function (K) {
        var J = E.getPropertyValue(K);
        J && (m[K] = J);
        var W = C.getPropertyValue(K);
        W && (w[K] = W);
      });
    } catch {}
    var S = c(e.sx, e.sy),
      T = c(e.ex, e.ey),
      k = parseFloat(m["stroke-width"]) || 0,
      L = (e.legacy ? 0 : Jo(t, e.shaft, "end")) * k,
      P = e.legacy ? 0 : Jo(t, e.shaft, "start") * k,
      N = Qo(e, e.legacy ? 0 : L),
      F = c(N.x, N.y),
      q = Qo({ sx: e.ex, sy: e.ey, ex: e.sx, ey: e.sy }, P),
      V = c(q.x, q.y),
      j = e.legacy ? 0 : L * g;
    return {
      sx: S.x,
      sy: S.y,
      ex: T.x,
      ey: T.y,
      px: V.x,
      py: V.y,
      tx: F.x,
      ty: F.y,
      back: j,
      startBack: P * g,
      legacyBack: e.legacy ? L * g : 0,
      isArrow:
        e.shaft.hasAttribute("marker-end") ||
        e.shaft.hasAttribute("marker-start") ||
        e.legacy,
      legacy: e.legacy,
      vbW: s,
      vbH: d,
      shaft: e.shaft,
      tag: e.tag,
      unitScale: g,
      paint: m,
      svgPaint: w,
    };
  }
  function pu(t) {
    var e = t.getBoundingClientRect(),
      r = Et(t),
      n = r !== t && (e.width > 0 || e.height > 0) ? ne(r) : null,
      a = n && n.shaft === t ? Dd(n, r.getBoundingClientRect(), e) : null;
    return a && !_i(r).rotated ? a : e;
  }
  function Ap(t, e, r, n) {
    return "M " + t + " " + e + " L " + r + " " + n;
  }
  function Y() {
    Pn();
  }
  function Qe(t) {
    for (
      var e = document.querySelectorAll("[data-dc-editor-stroke]"), r = 0;
      r < e.length;
      r++
    )
      e[r] !== t && e[r].removeAttribute("data-dc-editor-stroke");
    t &&
      !t.hasAttribute("data-dc-editor-stroke") &&
      t.setAttribute("data-dc-editor-stroke", "");
  }
  function Ii(t, e) {
    var r = { x: e.left, y: e.top, w: e.width, h: e.height, rot: 0 },
      n = $e(t);
    if (!n || Math.abs(n.rot) < 1e-4) return r;
    var a = Oe(t),
      i = vr(t),
      o = xn(t),
      l = a.w * Math.abs(n.sx) * i,
      u = a.h * Math.abs(n.sy) * i;
    return !(l > 0) || !(u > 0)
      ? r
      : {
          x: e.left + (e.width - l) / 2,
          y: e.top + (e.height - u) / 2,
          w: l,
          h: u,
          rot: n.rot * o.x * o.y,
        };
  }
  function vu(t) {
    for (
      var e = t.parentElement;
      e && e !== document.documentElement;
      e = e.parentElement
    ) {
      var r = Fr(e);
      if (!r) return !0;
      if (!r.none) {
        var n = la(r);
        if (
          !n ||
          n.mirror ||
          Math.abs(n.rot) > 1e-4 ||
          Math.abs(n.sx - n.sy) > 1e-4 * n.sx
        )
          return !0;
      }
    }
    return !1;
  }
  var lc = 500;
  function hu() {
    if (!ee(R)) return null;
    for (
      var t = [],
        e = [],
        r = [],
        n = [],
        a = function (C) {
          var S = C.parentElement,
            T = r.indexOf(S);
          return (
            T < 0 && (r.push(S), n.push(vu(C)), (T = r.length - 1)),
            n[T]
          );
        },
        i = 0;
      i < A.length;
      i++
    ) {
      var o = z(String(A[i]), R),
        l = Ye(o);
      if (l && ((l = Et(l)), !(e.indexOf(l) >= 0))) {
        e.push(l);
        var u = Q(l),
          s = u.getBoundingClientRect();
        if (!(!(s.width > 0) || !(s.height > 0))) {
          var d = getComputedStyle(l),
            p = (l.tagName || "").toLowerCase(),
            c = d.position === "absolute" || d.position === "fixed",
            g = c ? ga(l, d) : null,
            h = l.hasAttribute("data-sc-name") || u !== l,
            v = h ? null : ne(l),
            x = h || v ? null : $e(l),
            y =
              t.length >= lc ||
              o.length !== 1 ||
              Ee(l) ||
              Ae(l) ||
              Sn(l) ||
              (!!v && v.legacy) ||
              a(l),
            m = !y && c && !g.bothX && !g.bothY;
          t.push({
            el: l,
            pe: u,
            tid: parseInt(l.getAttribute("data-dc-tpl"), 10),
            r: s,
            cs: d,
            anc: g,
            sep: v,
            pose: x,
            deg: x ? Math.round((x.rot * 180) / Math.PI) : 0,
            scl: Lt(u),
            fixed: d.position === "fixed",
            movable: m,
            turned: !!x && Math.abs(x.rot) >= 1e-4,
            sizable: !y && !h && (!v || m),
            rotatable:
              !y &&
              !h &&
              (v
                ? m
                : !!x &&
                  (l.style.transform ? !!oa(l.style.transform) : !!x.m.none) &&
                  (d.display !== "inline" || !!za[p])),
          });
        }
      }
    }
    for (var w = 0; w < t.length; w++)
      for (var E = 0; E < t.length; E++)
        if (w !== E && t[E].el.contains(t[w].el)) {
          t[w].movable = t[w].sizable = t[w].rotatable = !1;
          break;
        }
    return t.length ? t : null;
  }
  function gu(t) {
    for (
      var e = 1 / 0, r = 1 / 0, n = -1 / 0, a = -1 / 0, i = 0;
      i < t.length;
      i++
    ) {
      var o = t[i].r;
      ((e = Math.min(e, o.left)),
        (r = Math.min(r, o.top)),
        (n = Math.max(n, o.right)),
        (a = Math.max(a, o.bottom)));
    }
    return { x: e, y: r, w: n - e, h: a - r };
  }
  function uc() {
    var t = R + "|" + A.join(","),
      e = pn && pn.key === t && pn.gen === oi ? pn : null;
    if (e) {
      for (var r = 0; r < e.ms.length; r++)
        if (!e.ms[r].pe.isConnected) {
          e = null;
          break;
        }
    }
    if (e) {
      for (var n = 0; n < e.ms.length; n++)
        e.ms[n].r = e.ms[n].pe.getBoundingClientRect();
      return e.ms;
    }
    var a = hu();
    return ((pn = a ? { key: t, gen: oi, ms: a } : null), a);
  }
  var He = [],
    mu = "";
  function sc(t, e) {
    if (t.anchors.length !== e.length) return null;
    for (var r = 0, n = 0, a = [], i = 0; i < t.anchors.length; i++) {
      for (var o = t.anchors[i], l = null, u = 0; u < e.length; u++)
        if (e[u].tid === o.tid) {
          l = e[u];
          break;
        }
      var s = 0.6 + 1.2 * (l && l.scl > 0 ? l.scl : 1);
      if (
        !l ||
        l.deg !== o.deg ||
        Math.abs(l.r.width - o.w) > s ||
        Math.abs(l.r.height - o.h) > s
      )
        return null;
      var d = {
        x: l.r.left + l.r.width / 2 - o.dx,
        y: l.r.top + l.r.height / 2 - o.dy,
        tol: s,
      };
      (a.push(d), (r += d.x), (n += d.y));
    }
    for (var p = { x: r / a.length, y: n / a.length }, c = 0; c < a.length; c++)
      if (
        Math.abs(a[c].x - p.x) > a[c].tol ||
        Math.abs(a[c].y - p.y) > a[c].tol
      )
        return null;
    return { c: p, w: t.w, h: t.h, deg: t.deg };
  }
  function yu(t) {
    He.length && He[0].key !== R + "|" + A.join(",") && (He = []);
    for (var e = He.length - 1; e >= 0; e--) {
      var r = sc(He[e], t);
      if (r) return r;
    }
    return null;
  }
  function dc(t) {
    var e = (t.deg * Math.PI) / 180,
      r = Math.abs(Math.cos(e)),
      n = Math.abs(Math.sin(e)),
      a = t.w * r + t.h * n,
      i = t.w * n + t.h * r;
    return {
      x: t.c.x - a / 2,
      y: t.c.y - i / 2,
      w: a,
      h: i,
      box: { x: t.c.x - t.w / 2, y: t.c.y - t.h / 2, w: t.w, h: t.h, rot: e },
    };
  }
  function fc() {
    var t = O && O.group ? O : null,
      e = t ? t.members : uc();
    if (!e) return null;
    for (
      var r = t ? t.live : yu(e),
        n = r ? null : gu(e),
        a = r
          ? dc(r)
          : {
              x: n.x,
              y: n.y,
              w: n.w,
              h: n.h,
              box: { x: n.x, y: n.y, w: n.w, h: n.h, rot: 0 },
            },
        i = !1,
        o = 0,
        l = 0,
        u = !!r && r.deg !== 0,
        s = 0;
      s < e.length;
      s++
    )
      ((e[s].sizable || e[s].movable) && (i = !0),
        e[s].rotatable && (o++, e[s].movable || l++),
        e[s].sizable && e[s].turned && (u = !0));
    return {
      el: null,
      group: !0,
      members: e,
      x: a.x,
      y: a.y,
      w: a.w,
      h: a.h,
      box: a.box,
      rotatable: o > 0 && l === 0,
      noRotate: o === 0 ? "none" : l > 0 ? "layout" : null,
      noResize: !i,
      aspectLock: u,
      deg: t && t.rotate && t.lastDeg != null ? bn(t.live.deg) : null,
      stroke: null,
    };
  }
  function cc(t) {
    var e = (t.tagName || "").toLowerCase();
    if (e !== "img" && e !== "video") return null;
    var r = e === "img" ? t.naturalWidth : t.videoWidth,
      n = e === "img" ? t.naturalHeight : t.videoHeight;
    if (!(r > 0) || !(n > 0) || !(t.offsetWidth > 0) || !(t.offsetHeight > 0))
      return { off: "unloaded" };
    var a = $e(t),
      i = getComputedStyle(t),
      o = function (p) {
        return !p || p === "none";
      },
      l = !a && o(i.transform) && o(i.rotate) && o(i.scale);
    if (
      vu(t) ||
      (!a && !l) ||
      (a && (a.mirror || Math.abs(a.sx - a.sy) > 1e-4 * a.sx))
    )
      return { off: "turned" };
    var u = function (p, c) {
        return (parseFloat(i[p]) || 0) + (parseFloat(i[c]) || 0);
      },
      s = {
        tid: parseInt(t.getAttribute("data-dc-tpl"), 10),
        w: r,
        h: n,
        inset: [
          u("borderLeftWidth", "paddingLeft") / t.offsetWidth,
          u("borderTopWidth", "paddingTop") / t.offsetHeight,
          u("borderRightWidth", "paddingRight") / t.offsetWidth,
          u("borderBottomWidth", "paddingBottom") / t.offsetHeight,
        ],
        fit: i.objectFit || "",
        pos: i.objectPosition || "",
        box: i.objectViewBox || "",
      };
    (e === "video" && (s.video = !0),
      (i.position === "absolute" || i.position === "fixed") && (s.abs = !0));
    var d = jf(t);
    return d.w && d.h
      ? { off: "auto" }
      : (d.w && (s.autoW = !0), d.h && (s.autoH = !0), s);
  }
  function pc() {
    if (
      !I ||
      !A.length ||
      ft === "text" ||
      b ||
      f ||
      B ||
      ht ||
      document.body.hasAttribute("data-dc-editor-overlay-hidden")
    )
      return (Qe(null), null);
    if (A.length > 1) return (Qe(null), fc());
    var t = z(String(A[A.length - 1]), R);
    if (
      t.length === 0 ||
      t[0].hasAttribute("data-sc-name") ||
      Q(t[0]) !== t[0] ||
      Ee(t[0]) ||
      !ee(R)
    )
      return (Qe(null), null);
    var e = Ye(t);
    if (!e) {
      if (!O || O.group) return (Qe(null), null);
      e = t[0];
    }
    var r = O && !O.group ? O.el : Et(e),
      n = r.getBoundingClientRect();
    if (!(n.width > 0) || !(n.height > 0)) return (Qe(null), null);
    var a = ne(r),
      i = a ? null : $e(r),
      o = Wt && !a ? xr(r) : null,
      l = Wt && !a && !o ? Hr(e) : null;
    return (
      Qe(a ? Q(e) : null),
      {
        el: r,
        x: n.left,
        y: n.top,
        w: n.width,
        h: n.height,
        box: Ii(r, n),
        media: cc(r),
        vec: l
          ? {
              tid: parseInt(e.getAttribute("data-dc-tpl"), 10),
              d: tt && tt.path === e ? tt.origD : l.d,
              m: l.m,
              n: ku,
            }
          : null,
        pen: o
          ? {
              tid: parseInt(r.getAttribute("data-dc-tpl"), 10),
              x: n.left,
              y: n.top,
              w: n.width,
              h: n.height,
              vbW: o.vbW,
              vbH: o.vbH,
              kx: Oe(r).w / n.width,
              ky: Oe(r).h / n.height,
              d: tt && tt.el === r ? tt.origD : o.d,
            }
          : null,
        rotatable:
          !!i &&
          (r.style.transform ? !!oa(r.style.transform) : !!i.m.none) &&
          (getComputedStyle(r).display !== "inline" ||
            !!za[(r.tagName || "").toLowerCase()]),
        deg: O && O.rotate ? O.lastDeg : null,
        stroke: a
          ? {
              x1: n.left + (a.px / a.vbW) * n.width,
              y1: n.top + (a.py / a.vbH) * n.height,
              x2: n.left + (a.tx / a.vbW) * n.width,
              y2: n.top + (a.ty / a.vbH) * n.height,
            }
          : null,
      }
    );
  }
  function yr(t) {
    if (gt) {
      var e = gt;
      ((gt = null),
        (document.body.style.cursor = D === "select" ? "" : "crosshair"),
        !t || !e.last
          ? Xi(e)
          : (e.legacyBack > 0 &&
              (e.last = Fi(
                {
                  scl: e.scl,
                  startLeft: e.startLeft,
                  startTop: e.startTop,
                  startRect: e.startRect,
                  back: e.legacyBack,
                },
                e.ends[0],
                e.ends[1],
              )),
            (Be = [e]),
            M({
              type: "strokeEndpoint",
              tid: e.tid,
              name: e.name,
              gestureKey: e.gestureKey,
              left: e.last.left,
              top: e.last.top,
              width: e.last.w,
              height: e.last.h,
              d: e.last.d,
              isArrow: e.isArrow,
              unitScale: e.unitScale,
              paint: e.paint,
              svgPaint: e.svgPaint,
            })),
        Y());
    }
  }
  function vc(t, e, r) {
    if (!(!I || b || gt || O || A.length !== 1)) {
      var n = z(String(A[A.length - 1]), R),
        a = n.length > 0 ? Et(Ye(n) || n[0]) : null,
        i = a ? ne(a) : null;
      if (i) {
        var o = a.getBoundingClientRect(),
          l = Lt(a.parentElement) || Lt(a) || 1,
          u = a.style,
          s = o.left + ((t === 0 ? i.tx : i.px) / i.vbW) * o.width,
          d = o.top + ((t === 0 ? i.ty : i.py) / i.vbH) * o.height,
          p = o.left + ((t === 0 ? i.px : i.tx) / i.vbW) * o.width,
          c = o.top + ((t === 0 ? i.py : i.ty) / i.vbH) * o.height;
        ((Be = []),
          (gt = {
            el: a,
            shaft: i.shaft,
            tid: parseInt(a.getAttribute("data-dc-tpl"), 10),
            name: _(a),
            which: t,
            isArrow: i.isArrow,
            unitScale: i.unitScale,
            paint: i.paint,
            svgPaint: i.svgPaint,
            gestureKey: "g" + Date.now(),
            scl: l,
            back: i.back,
            startBack: i.startBack,
            legacyBack: i.legacyBack,
            fixX: s,
            fixY: d,
            grabDx: e - p,
            grabDy: r - c,
            startLeft: parseFloat(u.left) || 0,
            startTop: parseFloat(u.top) || 0,
            startRect: o,
            origStyle: a.getAttribute("style") || "",
            origGeom: tl(i.shaft),
            origVb: a.getAttribute("viewBox"),
            origW: a.getAttribute("width"),
            origH: a.getAttribute("height"),
          }));
      }
    }
  }
  function Fi(t, e, r) {
    return Bd(t, e, r);
  }
  function Oi(t, e, r) {
    ((t.style.left = r.left + "px"),
      (t.style.top = r.top + "px"),
      (t.style.width = r.w + "px"),
      (t.style.height = r.h + "px"),
      t.setAttribute("width", r.w),
      t.setAttribute("height", r.h),
      t.setAttribute("viewBox", "0 0 " + r.w + " " + r.h),
      Kd(e, r.sx, r.sy, r.ex, r.ey));
  }
  function Xi(t) {
    (t.el.setAttribute("style", t.origStyle),
      t.origVb != null
        ? t.el.setAttribute("viewBox", t.origVb)
        : t.el.removeAttribute("viewBox"),
      t.origW != null
        ? t.el.setAttribute("width", t.origW)
        : t.el.removeAttribute("width"),
      t.origH != null
        ? t.el.setAttribute("height", t.origH)
        : t.el.removeAttribute("height"));
    for (var e in t.origGeom)
      t.origGeom[e] != null
        ? t.shaft.setAttribute(e, t.origGeom[e])
        : t.shaft.removeAttribute(e);
  }
  function hc(t, e, r) {
    var n = gt;
    if (n) {
      var a = { x: t - n.grabDx, y: e - n.grabDy },
        i = { x: n.fixX, y: n.fixY };
      (r && (a = nl(i, a)),
        (n.ends = n.which === 0 ? [a, i] : [i, a]),
        (n.last = Fi(n, n.ends[0], n.ends[1])),
        Oi(n.el, n.shaft, n.last),
        Y());
    }
  }
  function bu() {
    if (!I || b || O || gt || A.length !== 1) return null;
    var t = z(String(A[A.length - 1]), R);
    if (t.length === 0) return null;
    for (var e = 0; e < t.length; e++) t[e] = Et(t[e]);
    return { el: Ye(t) || t[0], els: t };
  }
  function gc(t, e, r) {
    if (/^(n|s|e|w|nw|ne|sw|se)$/.test(t)) {
      if (A.length > 1) {
        xu(t, e, r);
        return;
      }
      var n = bu();
      if (n) {
        var a = n.el,
          i = getComputedStyle(a),
          o = a.style,
          l = i.position === "absolute" || i.position === "fixed",
          u = a.getBoundingClientRect(),
          s = $e(a),
          d = mf(o),
          p = !s || s.plain,
          c = p ? Lt(a) : vr(a),
          g = p ? { w: u.width / c, h: u.height / c } : Oe(a, i),
          h = Ai(i, g),
          v = df(t, s, xn(a));
        O = {
          el: a,
          els: n.els,
          tid: parseInt(a.getAttribute("data-dc-tpl"), 10),
          name: _(a),
          dir: v.dir,
          west: v.west,
          east: v.east,
          north: v.north,
          south: v.south,
          gestureKey: "g" + Date.now(),
          scl: c,
          x0: e,
          y0: r,
          w0: g.w,
          h0: g.h,
          plain: p,
          m: p ? xi : s.m,
          grip: v,
          fx: h.fx,
          fy: h.fy,
          lastW: null,
          lastH: null,
          boxDx:
            i.boxSizing === "border-box"
              ? 0
              : (parseFloat(i.paddingLeft) || 0) +
                (parseFloat(i.paddingRight) || 0) +
                (parseFloat(i.borderLeftWidth) || 0) +
                (parseFloat(i.borderRightWidth) || 0),
          boxDy:
            i.boxSizing === "border-box"
              ? 0
              : (parseFloat(i.paddingTop) || 0) +
                (parseFloat(i.paddingBottom) || 0) +
                (parseFloat(i.borderTopWidth) || 0) +
                (parseFloat(i.borderBottomWidth) || 0),
          absX: l && d.x === "left",
          absY: l && d.y === "top",
          pinR: l && d.x === "right",
          pinB: l && d.y === "bottom",
          startLeft: ua(o.left, i.left),
          startTop: ua(o.top, i.top),
          startRight: ua(o.right, i.right),
          startBottom: ua(o.bottom, i.bottom),
          lastLeft: null,
          lastTop: null,
          lastRight: null,
          lastBottom: null,
        };
      }
    }
  }
  function mc(t, e) {
    if (A.length > 1) {
      xu(null, t, e);
      return;
    }
    var r = bu();
    if (r) {
      var n = r.el,
        a = $e(n),
        i = a && (n.style.transform || a.m.none) ? oa(n.style.transform) : null;
      if (!(!i || ne(n))) {
        var o = getComputedStyle(n),
          l = n.getBoundingClientRect(),
          u = Oe(n, o),
          s = Ai(o, u),
          d = vr(n),
          p = (0.5 - s.fx) * u.w,
          c = (0.5 - s.fy) * u.h,
          g = xn(n),
          h = l.left + l.width / 2 - d * g.x * (a.m.a * p + a.m.c * c),
          v = l.top + l.height / 2 - d * g.y * (a.m.b * p + a.m.d * c);
        O = {
          rotate: !0,
          el: n,
          els: r.els,
          tid: parseInt(n.getAttribute("data-dc-tpl"), 10),
          name: _(n),
          gestureKey: "g" + Date.now(),
          tf: i,
          sense: g.x * g.y,
          px: h,
          py: v,
          a0: Math.atan2(e - v, t - h),
          deg0: i.deg,
          lastDeg: null,
          lastPatch: null,
        };
      }
    }
  }
  function xu(t, e, r) {
    if (!(!I || b || O || gt)) {
      var n = hu();
      if (n) {
        Be = [];
        for (
          var a = yu(n),
            i = a ? null : gu(n),
            o = a || {
              c: { x: i.x + i.w / 2, y: i.y + i.h / 2 },
              w: i.w,
              h: i.h,
              deg: 0,
            },
            l = !1,
            u = [],
            s = 0;
          s < n.length;
          s++
        ) {
          var d = n[s],
            p = d.el,
            c = d.cs,
            g = d.r;
          if (
            ((d.c0 = { x: g.left + g.width / 2, y: g.top + g.height / 2 }),
            (d.c1 = d.c0),
            t ? !(d.sizable || d.movable) : !(d.rotatable || d.movable))
          ) {
            d.still = !0;
            continue;
          }
          if (((l = !0), d.sep)) {
            ((d.scl = Lt(p.parentElement) || Lt(p) || 1),
              (d.startRect = g),
              (d.startLeft = parseFloat(p.style.left) || 0),
              (d.startTop = parseFloat(p.style.top) || 0),
              (d.shaft = d.sep.shaft),
              (d.origStyle = p.getAttribute("style") || ""),
              (d.origGeom = tl(d.shaft)),
              (d.origVb = p.getAttribute("viewBox")),
              (d.origW = p.getAttribute("width")),
              (d.origH = p.getAttribute("height")),
              (d.p0 = {
                x: g.left + (d.sep.px / d.sep.vbW) * g.width,
                y: g.top + (d.sep.py / d.sep.vbH) * g.height,
              }),
              (d.q0 = {
                x: g.left + (d.sep.tx / d.sep.vbW) * g.width,
                y: g.top + (d.sep.ty / d.sep.vbH) * g.height,
              }),
              (d.back = d.sep.back),
              (d.startBack = d.sep.startBack));
            continue;
          }
          var h = !d.pose || d.pose.plain;
          d.s = h ? Lt(d.pe) : vr(p);
          var v = h ? { w: g.width / d.s, h: g.height / d.s } : Oe(p, c),
            x = Ai(c, v);
          ((d.w0 = v.w),
            (d.h0 = v.h),
            (d.fx = x.fx),
            (d.fy = x.fy),
            (d.m = h ? xi : d.pose.m),
            (d.rot = h ? 0 : d.pose.rot),
            (d.boxDx =
              c.boxSizing === "border-box"
                ? 0
                : (parseFloat(c.paddingLeft) || 0) +
                  (parseFloat(c.paddingRight) || 0) +
                  (parseFloat(c.borderLeftWidth) || 0) +
                  (parseFloat(c.borderRightWidth) || 0)),
            (d.boxDy =
              c.boxSizing === "border-box"
                ? 0
                : (parseFloat(c.paddingTop) || 0) +
                  (parseFloat(c.paddingBottom) || 0) +
                  (parseFloat(c.borderTopWidth) || 0) +
                  (parseFloat(c.borderBottomWidth) || 0)),
            (d.tf = d.rotatable ? oa(p.style.transform) : null),
            t &&
              d.sizable &&
              u.push({
                w: g.width,
                h: g.height,
                min: { w: 8 * d.s, h: 8 * d.s },
              }));
        }
        for (var y = o.deg !== 0, m = !1, w = 0; w < n.length; w++)
          (n[w].sizable && n[w].turned && (y = !0),
            n[w].rotatable && !n[w].movable && (m = !0));
        if (!(!l || !(o.w > 0) || !(o.h > 0) || (t ? y && t.length < 2 : m))) {
          var E = Od({ x: 0, y: 0, w: o.w, h: o.h }, u);
          ((E.min = {
            w: Math.max(E.min.w, Math.min(8, o.w)),
            h: Math.max(E.min.h, Math.min(8, o.h)),
          }),
            (O = {
              group: !0,
              rotate: !t,
              name: R,
              gestureKey: "g" + Date.now(),
              members: n,
              dir: t,
              west: !!t && t.indexOf("w") >= 0,
              east: !!t && t.indexOf("e") >= 0,
              north: !!t && t.indexOf("n") >= 0,
              south: !!t && t.indexOf("s") >= 0,
              x0: e,
              y0: r,
              f0: o,
              live: o,
              lim: E,
              lock: y,
              a0: Math.atan2(r - o.c.y, e - o.c.x),
              lastDeg: null,
              previewed: !1,
            }));
        }
      }
    }
  }
  function yc(t) {
    for (var e = 0; e < t.members.length; e++) {
      var r = t.members[e],
        n = r.el.isConnected ? [r.el] : z(String(r.tid), t.name);
      if (
        (r.lastPatch && ce(t.gestureKey + ":" + r.tid, n, r.lastPatch),
        r.last && n[0])
      ) {
        var a = ne(n[0]);
        a && Oi(n[0], a.shaft, r.last);
      }
    }
  }
  function wu(t, e) {
    var r = ei(e, t.c, -t.deg);
    return { x: r.x - t.c.x, y: r.y - t.c.y };
  }
  function Au(t, e) {
    return ei({ x: t.c.x + e.x, y: t.c.y + e.y }, t.c, t.deg);
  }
  function Eu(t, e, r) {
    var n = O,
      a = n.f0,
      i = 1,
      o;
    if (n.rotate) {
      var l = rl(
        a.deg + ((Math.atan2(e - a.c.y, t - a.c.x) - n.a0) * 180) / Math.PI,
        r,
      );
      ((n.lastDeg = l - bn(a.deg)),
        (n.live = { c: a.c, w: a.w, h: a.h, deg: l }),
        (o = function (L) {
          return ei(L, a.c, n.lastDeg);
        }));
    } else {
      var u = wu({ c: { x: n.x0, y: n.y0 }, deg: a.deg }, { x: t, y: e }),
        s = { x: -a.w / 2, y: -a.h / 2, w: a.w, h: a.h },
        d = vf(s, n.dir, u.x, u.y, r || n.lock, n.lim);
      ((i = d.w / a.w),
        (n.ky = d.h / a.h),
        (n.live = {
          c: Au(a, { x: d.x + d.w / 2, y: d.y + d.h / 2 }),
          w: d.w,
          h: d.h,
          deg: a.deg,
        }),
        (o = function (L) {
          return Au(a, Xd(wu(a, L), s, d));
        }));
    }
    var p = i,
      c = n.rotate ? 1 : n.ky,
      g = ((n.lastDeg || 0) * Math.PI) / 180;
    n.previewed = !0;
    for (var h = 0; h < n.members.length; h++) {
      var v = n.members[h];
      if (!v.still) {
        if (!v.el.isConnected) {
          var x = z(String(v.tid), n.name)[0],
            y = x && v.sep ? ne(Et(x)) : null;
          x && (!v.sep || y) && ((v.el = Et(x)), y && (v.shaft = y.shaft));
        }
        if (v.sep) {
          ((v.last = Fi(v, o(v.p0), o(v.q0))),
            (v.c1 = o(v.c0)),
            Oi(v.el, v.shaft, v.last));
          continue;
        }
        var m = {},
          w = v.w0,
          E = v.h0,
          C = v.m;
        if (
          (!n.rotate &&
            v.sizable &&
            ((n.west || n.east || v.turned) &&
              ((w = v.w0 * p),
              (m.width = Math.max(1, Math.round(w - v.boxDx)) + "px")),
            (n.north || n.south || v.turned) &&
              ((E = v.h0 * c),
              (m.height = Math.max(1, Math.round(E - v.boxDy)) + "px"))),
          n.rotate &&
            v.tf &&
            ((C = gf(v.m, g)),
            (v.deg1 = bn(Math.round(v.tf.deg + n.lastDeg))),
            (m.transform = Ll(v.tf, v.deg1))),
          v.movable)
        ) {
          v.c1 = o(v.c0);
          var S = hf(v.m, C, v.fx, v.fy, v.w0, v.h0, w, E),
            T = (v.c1.x - v.c0.x) / v.s - S.x,
            k = (v.c1.y - v.c0.y) / v.s - S.y;
          (v.anc.useRight
            ? (m.right = Math.round(v.anc.startRight - T) + "px")
            : (m.left = Math.round(v.anc.startLeft + T) + "px"),
            v.anc.useBottom
              ? (m.bottom = Math.round(v.anc.startBottom - k) + "px")
              : (m.top = Math.round(v.anc.startTop + k) + "px"));
        }
        ((v.lastPatch = m),
          ce(n.gestureKey + ":" + v.tid, [v.el], m),
          Or({
            type: "stylePreview",
            tid: v.tid,
            name: n.name,
            gestureKey: n.gestureKey,
            styles: m,
          }));
      }
    }
    Y();
  }
  function bc(t, e) {
    if (!t.previewed) {
      Y();
      return;
    }
    var r = t.members.filter(function (c) {
      return !!c.lastPatch;
    });
    if (
      ((t.rotate
        ? !t.lastDeg
        : Math.abs(t.live.w - t.f0.w) < 0.5 &&
          Math.abs(t.live.h - t.f0.h) < 0.5) && (e = !1),
      !e)
    ) {
      for (var n = 0; n < t.members.length; n++)
        t.members[n].last && Xi(t.members[n]);
      for (var a = 0; a < r.length; a++)
        M({
          type: "styleRevert",
          tid: r[a].tid,
          name: t.name,
          gestureKey: t.gestureKey,
          keepUndo: a < r.length - 1,
          follower: a < r.length - 1,
        });
      Y();
      return;
    }
    for (var i = [], o = 0; o < t.members.length; o++) {
      var l = t.members[o];
      if (l.last)
        i.push({
          tid: l.tid,
          stroke: {
            left: l.last.left,
            top: l.last.top,
            width: l.last.w,
            height: l.last.h,
            d: l.last.d,
            isArrow: l.sep.isArrow,
            unitScale: l.sep.unitScale,
            paint: l.sep.paint,
            svgPaint: l.sep.svgPaint,
          },
        });
      else if (l.lastPatch) {
        var u = {};
        for (var s in l.lastPatch) s !== "transform" && (u[s] = l.lastPatch[s]);
        i.push({
          tid: l.tid,
          styles: u,
          fixed: l.fixed,
          angle: t.rotate && l.tf ? l.deg1 : void 0,
        });
      }
    }
    ((Be = t.members.filter(function (c) {
      return !!c.last;
    })),
      i.length &&
        M({
          type: "groupTransform",
          kind: t.rotate ? "rotate" : "resize",
          name: t.name,
          gestureKey: t.gestureKey,
          members: i,
        }));
    var d = t.live,
      p = bn(d.deg);
    (p !== 0 &&
      (He.push({
        key: t.name + "|" + A.join(","),
        w: d.w,
        h: d.h,
        deg: p,
        anchors: t.members.map(function (c) {
          var g = Q(c.el).getBoundingClientRect(),
            h = c.pose ? $e(c.el) : null;
          return {
            tid: c.tid,
            dx: g.left + g.width / 2 - d.c.x,
            dy: g.top + g.height / 2 - d.c.y,
            w: g.width,
            h: g.height,
            deg: h ? Math.round((h.rot * 180) / Math.PI) : 0,
          };
        }),
      }),
      He.length > 8 && He.shift()),
      Y());
  }
  function Cu(t, e) {
    ee(t.name) &&
      ((t.lastPatch = t.extra ? Object.assign({}, e, t.extra) : e),
      ce(t.gestureKey, t.els && t.els.length ? t.els : [t.el], t.lastPatch));
    var r = {
      type: "stylePreview",
      tid: t.tid,
      name: t.name,
      gestureKey: t.gestureKey,
      styles: e,
    };
    (t.extra && (r.crop = !0), Or(r), Y());
  }
  function xc(t, e, r) {
    var n = O;
    if (!(!n || !n.rotate)) {
      if (n.group) {
        Eu(t, e, r);
        return;
      }
      ((n.lastDeg = rl(
        n.deg0 +
          (n.sense * (Math.atan2(e - n.py, t - n.px) - n.a0) * 180) / Math.PI,
        r,
      )),
        Cu(n, { transform: Ll(n.tf, n.lastDeg) }));
    }
  }
  function wc(t, e, r) {
    var n = O;
    if (!(!n || n.rotate)) {
      if (n.group) {
        Eu(t, e, r);
        return;
      }
      var a = ff(n.grip, n.scl, t - n.x0, e - n.y0),
        i = a.x,
        o = a.y,
        l = n.west,
        u = n.east,
        s = n.north,
        d = n.south,
        p = l ? n.w0 - i : u ? n.w0 + i : n.w0,
        c = s ? n.h0 - o : d ? n.h0 + o : n.h0;
      if (r && (l || u) && (s || d) && n.w0 > 0 && n.h0 > 0) {
        var g = n.w0 / n.h0;
        p / n.w0 >= c / n.h0 ? (c = p / g) : (p = c * g);
      }
      ((l || u) && (p = Math.max(8, p)),
        (s || d) && (c = Math.max(8, c)),
        (n.lastW = p),
        (n.lastH = c));
      var h = sf(n.dir, n.m, n.fx, n.fy, n.w0, n.h0, p, c);
      (n.absX && (l || !n.plain)
        ? (n.lastLeft = n.startLeft + h.x)
        : n.pinR && (u || !n.plain) && (n.lastRight = n.startRight + h.r),
        n.absY && (s || !n.plain)
          ? (n.lastTop = n.startTop + h.y)
          : n.pinB && (d || !n.plain) && (n.lastBottom = n.startBottom + h.b));
      var v = {};
      ((l || u) && (v.width = Math.round(p - n.boxDx) + "px"),
        (s || d) && (v.height = Math.round(c - n.boxDy) + "px"),
        n.lastLeft != null && (v.left = Math.round(n.lastLeft) + "px"),
        n.lastTop != null && (v.top = Math.round(n.lastTop) + "px"),
        n.lastRight != null && (v.right = Math.round(n.lastRight) + "px"),
        n.lastBottom != null && (v.bottom = Math.round(n.lastBottom) + "px"),
        Cu(n, v));
    }
  }
  function je(t) {
    if (O) {
      var e = O;
      if (
        ((O = null),
        (Ce = {}),
        (document.body.style.cursor = D === "select" ? "" : "crosshair"),
        e.group)
      ) {
        bc(e, t);
        return;
      }
      var r = e.rotate ? e.lastDeg != null : e.lastW != null;
      if (
        (r &&
          (e.rotate
            ? e.lastDeg === bn(Math.round(e.deg0))
            : Math.round(e.lastW) === Math.round(e.w0) &&
              Math.round(e.lastH) === Math.round(e.h0)) &&
          (t = !1),
        !t && r)
      ) {
        var n = {
          type: "styleRevert",
          tid: e.tid,
          name: e.name,
          gestureKey: e.gestureKey,
          keepUndo: !1,
        };
        (e.extra && (n.crop = !0), M(n));
      }
      if (t && r && e.rotate)
        M({
          type: "rotate",
          tid: e.tid,
          name: e.name,
          gestureKey: e.gestureKey,
          angle: e.lastDeg,
        });
      else if (t && r) {
        var a = {
          type: "resize",
          tid: e.tid,
          name: e.name,
          gestureKey: e.gestureKey,
        };
        (e.extra && (a.crop = !0),
          (e.west || e.east) && (a.width = Math.round(e.lastW - e.boxDx)),
          (e.north || e.south) && (a.height = Math.round(e.lastH - e.boxDy)),
          e.lastLeft != null && (a.left = Math.round(e.lastLeft)),
          e.lastTop != null && (a.top = Math.round(e.lastTop)),
          e.lastRight != null && (a.right = Math.round(e.lastRight)),
          e.lastBottom != null && (a.bottom = Math.round(e.lastBottom)),
          M(a));
      }
      Y();
    }
  }
  function pe(t) {
    try {
      return t.checkVisibility
        ? t.checkVisibility({ checkOpacity: !0, checkVisibilityCSS: !0 })
        : getComputedStyle(t).visibility !== "hidden";
    } catch {
      return !0;
    }
  }
  function Ye(t) {
    for (var e = 0; e < t.length; e++) if (pe(t[e])) return t[e];
    return null;
  }
  function xa(t) {
    var e = [];
    if (
      t === "data-dc-editor-selected" &&
      f &&
      f.group &&
      !document.body.hasAttribute("data-dc-editor-brk")
    )
      return e;
    for (
      var r = document.querySelectorAll("[" + t + "]"), n = 0;
      n < r.length;
      n++
    ) {
      var a = r[n];
      a.hasAttribute("data-dc-editor-stroke") ||
        a.hasAttribute("data-dc-editor-dragging") ||
        (a.closest &&
          a.closest(
            "[data-dc-editor-overlay-root],[data-dc-editor-overlay]",
          )) ||
        e.push(a);
    }
    return e;
  }
  function Pn() {
    var t = pc(),
      e = [],
      r;
    if (
      (I || Le) &&
      !document.body.hasAttribute("data-dc-editor-overlay-hidden")
    ) {
      var n = xa("data-dc-editor-selected");
      for (r = 0; r < n.length; r++) e.push({ el: n[r], sel: !0 });
      var a = xa("data-dc-editor-hover");
      for (r = 0; r < a.length; r++)
        a[r].hasAttribute("data-dc-editor-selected") ||
          a[r].hasAttribute("data-dc-editor-hover-stroke") ||
          e.push({ el: a[r], sel: !1 });
    }
    var i = document.scrollingElement || document.documentElement,
      o = i.scrollLeft > 0,
      l = i.scrollTop > 0;
    function u(S, T, k, L, P, N, F) {
      var q = S + k,
        V = T + L,
        j = !1;
      if (
        (o &&
          (S < 0 && ((S = 0), (j = !0)),
          q > innerWidth && ((q = innerWidth), (j = !0))),
        l &&
          (T < 0 && ((T = 0), (j = !0)),
          V > innerHeight && ((V = innerHeight), (j = !0))),
        !(q <= S || V <= T))
      ) {
        P === "grip" && j && !O && !gt && (P = "sel");
        var K = { x: S, y: T, w: q - S, h: V - T, k: P };
        (N &&
          N.rot &&
          (!j || O) &&
          ((K.x = N.x), (K.y = N.y), (K.w = N.w), (K.h = N.h), (K.rot = N.rot)),
          P === "grip" &&
            t.rotatable &&
            ((K.rotatable = !0), t.deg != null && (K.deg = t.deg)),
          P === "grip" && t.media && (K.media = t.media),
          P === "grip" &&
            t.group &&
            ((K.group = !0),
            t.noResize && (K.noResize = !0),
            t.noRotate && (K.noRotate = t.noRotate),
            t.aspectLock && (K.aspectLock = !0)),
          F && (K.component = !0),
          d.push(K));
      }
    }
    function s(S) {
      return !S ||
        (o &&
          (Math.min(S.x1, S.x2) < 0 || Math.max(S.x1, S.x2) > innerWidth)) ||
        (l && (Math.min(S.y1, S.y2) < 0 || Math.max(S.y1, S.y2) > innerHeight))
        ? null
        : S;
    }
    var d = [],
      p = [],
      c = !1,
      g = t && t.group ? t.members : null;
    for (r = 0; r < e.length && d.length < 255; r++) {
      var h = e[r].sel ? jo(e[r].el, g, Et, ne) : e[r].el,
        v = ui(h),
        x = e[r].sel && ft === "text" && A.length === 1;
      if (x) {
        var y = Al(h);
        y &&
          (v = {
            left: y.l - 2,
            top: y.t - 1,
            width: y.r - y.l + 4,
            height: y.b - y.t + 2,
          });
      }
      if (!(!(v.width > 0) || !(v.height > 0) || !pe(e[r].el))) {
        p.push(h);
        var m = e[r].sel ? "sel" : "hov";
        if (!(t && (t.vec || t.pen) && (e[r].sel || t.el.contains(h)))) {
          if (t && !t.stroke) {
            if (h === t.el) ((m = t.pen ? "sel" : "grip"), (c = !0));
            else if (e[r].sel && el(h, t.el, Gn) !== h) continue;
          }
          u(
            v.left,
            v.top,
            v.width,
            v.height,
            m,
            m === "grip" ? t.box : x ? null : Ii(h, v),
            li(h),
          );
        }
      }
    }
    if (
      $a > 0 &&
      (I || Le) &&
      !document.body.hasAttribute("data-dc-editor-overlay-hidden")
    ) {
      var w = document.querySelectorAll("[data-dc-drop]");
      for (r = 0; r < w.length && d.length < 255; r++)
        if (
          qn[w[r].getAttribute("data-dc-drop")] === 1 &&
          !w[r].closest(
            "[data-dc-editor-overlay-root],[data-dc-editor-overlay]",
          )
        ) {
          var E = w[r].getBoundingClientRect();
          !(E.width > 0) ||
            !(E.height > 0) ||
            !pe(w[r]) ||
            (p.push(w[r]),
            u(E.left, E.top, E.width, E.height, "busy", Ii(w[r], E), !1));
        }
    }
    (t &&
      !t.stroke &&
      !c &&
      !t.vec &&
      !t.pen &&
      u(t.x, t.y, t.w, t.h, t.pen ? "sel" : "grip", t.box, li(t.el)),
      Cc(p));
    var C =
      $n &&
      (I || Le) &&
      !document.body.hasAttribute("data-dc-editor-overlay-hidden");
    Su(
      d,
      t && t.stroke && (gt || s(t.stroke)) ? t.stroke : null,
      e.length ? Ac(o, l, g) : null,
      C,
      (t && t.pen) || null,
      (t && t.vec) || null,
    );
  }
  function Ac(t, e, r) {
    if (
      !Un ||
      !Rn ||
      !I ||
      D !== "select" ||
      b ||
      !A.length ||
      f ||
      O ||
      gt ||
      ht ||
      B ||
      ot ||
      kt
    )
      return null;
    for (
      var n = xa("data-dc-editor-selected"), a = null, i = null, o = 0;
      o < n.length;
      o++
    ) {
      var l = jo(n[o], r, Et, ne).getBoundingClientRect();
      !(l.width > 0) ||
        !(l.height > 0) ||
        !pe(n[o]) ||
        (i || (i = n[o]),
        (a = a
          ? {
              l: Math.min(a.l, l.left),
              t: Math.min(a.t, l.top),
              r: Math.max(a.r, l.right),
              b: Math.max(a.b, l.bottom),
            }
          : { l: l.left, t: l.top, r: l.right, b: l.bottom }));
    }
    if (!a || !i) return null;
    var u = Ye(xa("data-dc-editor-hover")),
      s = u && !u.hasAttribute("data-dc-editor-selected") ? u : null,
      d = s && pu(s);
    d && !(d.width > 0 && d.height > 0) && ((s = null), (d = null));
    for (
      var p = _t(), c = s ? null : i.parentElement;
      c && !d;
      c = c.parentElement
    )
      if (!(!(c.hasAttribute && c.hasAttribute("data-dc-tpl")) && c !== p)) {
        var g = c.getBoundingClientRect();
        g.width > 0 && g.height > 0 && ((s = c), (d = g));
      }
    for (
      var h = d
          ? { l: d.left, t: d.top, r: d.right, b: d.bottom }
          : { l: 0, t: 0, r: innerWidth, b: innerHeight },
        v = kd(a, h, Ec(i)),
        x = { lines: [], labels: [] },
        y = 0;
      y < v.lines.length;
      y++
    ) {
      var m = v.lines[y];
      (t &&
        ((m.x1 = Math.max(0, Math.min(innerWidth, m.x1))),
        (m.x2 = Math.max(0, Math.min(innerWidth, m.x2)))),
        e &&
          ((m.y1 = Math.max(0, Math.min(innerHeight, m.y1))),
          (m.y2 = Math.max(0, Math.min(innerHeight, m.y2)))),
        (m.x1 !== m.x2 || m.y1 !== m.y2) && x.lines.push(m));
    }
    for (var w = 0; w < v.labels.length; w++) {
      var E = v.labels[w];
      (t && (E.x < 0 || E.x > innerWidth)) ||
        (e && (E.y < 0 || E.y > innerHeight)) ||
        x.labels.push(E);
    }
    return x.lines.length ? x : null;
  }
  function wa(t) {
    return (
      t.assignedSlot ||
      t.parentElement ||
      (t.parentNode && t.parentNode.host) ||
      null
    );
  }
  function Ec(t) {
    return _i(t).scale;
  }
  function _i(t) {
    for (var e = 1, r = null, n = !1, a = t ? wa(t) : null; a; a = wa(a))
      if (a.nodeType === 1) {
        var i = getComputedStyle(a);
        if (i.transform && i.transform !== "none")
          try {
            var o = new DOMMatrixReadOnly(i.transform);
            ((e *= Math.sqrt(o.a * o.a + o.b * o.b) || 1),
              (Math.abs(o.b) > 1e-6 ||
                Math.abs(o.c) > 1e-6 ||
                o.a < 0 ||
                o.d < 0) &&
                (n = !0));
          } catch {}
        i.rotate &&
          i.rotate !== "none" &&
          parseFloat(i.rotate) !== 0 &&
          (n = !0);
        var l =
          i.scale && i.scale !== "none" ? Math.abs(parseFloat(i.scale)) : NaN;
        (l > 0 && (e *= l), i.scale && /(^| )-/.test(i.scale) && (n = !0));
        var u = parseFloat(i.zoom);
        (u > 0 && u !== 1 && (e *= u), !r && a.offsetWidth >= 16 && (r = a));
      }
    if (r && !n) {
      var s = r.getBoundingClientRect().width / r.offsetWidth;
      s > 0 && Math.abs(e - s) > s * (1.25 / r.offsetWidth + 0.005) && (e = s);
    }
    return { scale: e > 0 && isFinite(e) ? e : 1, rotated: n };
  }
  function Su(t, e, r, n, a, i) {
    var o = {
        type: "chrome",
        rings: t,
        stroke: e,
        measure: r || null,
        guides: (f && sr) || null,
        artboard: !!n,
        pen: a || null,
        vec: i || null,
      },
      l = JSON.stringify(o);
    l !== ai && ((ai = l), M(o));
  }
  function Cc(t) {
    if (de) {
      if (t.length === Qn.length) {
        for (var e = !0, r = 0; r < t.length; r++)
          if (t[r] !== Qn[r]) {
            e = !1;
            break;
          }
        if (e) return;
      }
      de.disconnect();
      for (var n = 0; n < t.length; n++) de.observe(t[n]);
      Qn = t;
    }
  }
  function Sc(t) {
    for (var e = 0; e < t.length; e++)
      if (t[e].type && t[e].attributeName !== "data-dc-editor-patch") return !1;
    return !0;
  }
  function Tc(t) {
    for (var e = 0; e < t.length; e++) {
      var r = t[e];
      if (
        r.type !== "attributes" ||
        String(r.attributeName || "").indexOf("data-dc-editor") !== 0
      )
        return !0;
    }
    return !1;
  }
  function _r(t) {
    (ha && t && !Sc(t) && au(),
      t && t.length && Tc(t) && oi++,
      !ii &&
        ((ii = !0),
        requestAnimationFrame(function () {
          ((ii = !1), zf(), Y(), Mu(!1));
        })));
  }
  function Tu(t) {
    for (var e = 0, r = 0; r < t.length; r++) {
      var n = z(String(t[r]), Br).length;
      n > e && (e = n);
    }
    return e;
  }
  function Mu(t) {
    if (te) {
      var e = {};
      for (var r in te) {
        var n = te[r];
        n.kind === "if"
          ? (e[r] = { on: Tu(n.kids) > 0 })
          : n.countKids &&
            n.countKids.length > 0 &&
            (e[r] = { count: Tu(n.countKids) });
      }
      var a = JSON.stringify(e);
      (!t && a === dl) ||
        ((dl = a), M({ type: "directiveState", name: Br, states: e }));
    }
  }
  function Mc(t) {
    if (!kt) {
      var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      (e.setAttribute("data-dc-editor-overlay", ""),
        (e.style.cssText =
          "position:fixed;inset:0;width:100%;height:100%;z-index:2147483646;pointer-events:none;"),
        fe().appendChild(e),
        (kt = { svg: e }));
    }
    var r = document.createElementNS("http://www.w3.org/2000/svg", "path");
    (r.setAttribute("fill", "none"),
      (r.style.stroke = xt),
      r.setAttribute("stroke-width", "2"),
      r.setAttribute("stroke-linecap", "round"),
      r.setAttribute("stroke-linejoin", "round"),
      kt.svg.appendChild(r),
      (ot = {
        points: [[t.clientX, t.clientY]],
        path: r,
        parent: Tn(t.clientX, t.clientY),
      }),
      We());
  }
  function Wi(t, e, r, n) {
    for (var a = n || 1, i = "", o = 0; o < t.length; o++)
      i +=
        (o === 0 ? "M" : "L") +
        Math.round((t[o][0] - e) / a) +
        " " +
        Math.round((t[o][1] - r) / a) +
        " ";
    return i.trim();
  }
  var Pu = 1.25,
    tt = null,
    ku = 0,
    tr = [],
    br = null;
  function Wr() {
    tt &&
      (tt.path.setAttribute("d", tt.origD),
      tt.svg && (tt.svg.style.overflow = tt.overflow),
      (tt = null));
  }
  var Pc =
      /^M ?-?\d+(\.\d+)?[ ,]-?\d+(\.\d+)?( ?([ML] ?-?\d+(\.\d+)?[ ,]-?\d+(\.\d+)?|C ?-?\d+(\.\d+)?([ ,]-?\d+(\.\d+)?){5}|Z(?= ?M|$)))+$/,
    Nu = /^-?\d+(\.\d+)?px$/;
  function xr(t) {
    if (
      !t ||
      (t.tagName || "").toLowerCase() !== "svg" ||
      ne(t) ||
      t.getAttribute("preserveAspectRatio") !== "none" ||
      t.style.position !== "absolute" ||
      !Nu.test(t.style.left) ||
      !Nu.test(t.style.top) ||
      (getComputedStyle(t).fill || "") !== "none"
    )
      return null;
    for (var e = null, r = 0; r < t.children.length; r++) {
      if ((t.children[r].tagName || "").toLowerCase() !== "path" || e)
        return null;
      e = t.children[r];
    }
    var n = (e && e.getAttribute("d")) || "";
    if (n.length > ze || !Pc.test(n)) return null;
    var a = (t.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
    if (
      a.length !== 4 ||
      a[0] !== 0 ||
      a[1] !== 0 ||
      !(a[2] > 0) ||
      !(a[3] > 0)
    )
      return null;
    var i = $e(t);
    return !i || !i.plain || _i(t).rotated
      ? null
      : { path: e, d: n, vbW: a[2], vbH: a[3] };
  }
  function Hr(t) {
    if (
      !t ||
      (t.tagName || "").toLowerCase() !== "path" ||
      t.getAttribute("data-dc-tpl") == null ||
      !t.getScreenCTM ||
      !t.getBBox
    )
      return null;
    var e = Et(t);
    if (
      e === t ||
      ne(e) ||
      xr(e) ||
      t.closest("defs,marker,clipPath,mask,pattern,symbol")
    )
      return null;
    var r = tt && tt.path === t ? tt.origD : t.getAttribute("d") || "";
    if (!r) return null;
    r.length > ze && (r = "");
    var n = t.getScreenCTM();
    if (!n || !(Math.abs(n.a * n.d - n.b * n.c) > 1e-9)) return null;
    var a = t.getBBox(),
      i = t.getBoundingClientRect(),
      o = [],
      l = [];
    [
      [a.x, a.y],
      [a.x + a.width, a.y],
      [a.x, a.y + a.height],
      [a.x + a.width, a.y + a.height],
    ].forEach(function (p) {
      (o.push(n.a * p[0] + n.c * p[1] + n.e),
        l.push(n.b * p[0] + n.d * p[1] + n.f));
    });
    var u = [
        Math.min.apply(null, o) - i.left,
        i.right - Math.max.apply(null, o),
        Math.min.apply(null, l) - i.top,
        i.bottom - Math.max.apply(null, l),
      ],
      s = getComputedStyle(t),
      d =
        s.markerStart !== "none" ||
        s.markerMid !== "none" ||
        s.markerEnd !== "none" ||
        s.vectorEffect === "non-scaling-stroke" ||
        parseFloat(s.strokeMiterlimit) > 4;
    return Math.min.apply(null, u) >= -1 - (d ? 0 : Hi(t, n)) &&
      (d || Math.max.apply(null, u) <= 1 + Hi(t, n))
      ? { d: r, m: [n.a, n.b, n.c, n.d, n.e, n.f] }
      : null;
  }
  function Lu(t) {
    var e = Hr(t);
    return e && e.d ? e.d : null;
  }
  function Hi(t, e) {
    var r = parseFloat(getComputedStyle(t).strokeWidth) || 0;
    return r * 2 * Math.sqrt(Math.abs(e.a * e.d - e.b * e.c));
  }
  function Ru(t) {
    var e = getComputedStyle(t);
    return (
      e.overflow !== "visible" &&
      !t.style.overflow &&
      !t.getAttribute("overflow") &&
      [
        e.borderTopLeftRadius,
        e.borderTopRightRadius,
        e.borderBottomLeftRadius,
        e.borderBottomRightRadius,
      ].every(function (r) {
        return !(parseFloat(r) > 0);
      })
    );
  }
  var Aa = null;
  function Yi(t, e) {
    var r = Wt && A.length === 1 && A[0] === t;
    if (
      (r && (Aa = { tid: t, name: R }),
      !I || Tt || !(r || (e && Aa && Aa.tid === t)))
    )
      return null;
    var n = z(String(t), Aa.name),
      a = n.length ? Ye(n) || n[0] : null;
    return a && Hr(a) ? a : null;
  }
  function Du(t) {
    if (!I || A.length !== 1) return null;
    var e = z(String(A[0]), R),
      r = e.length ? Et(Ye(e) || e[0]) : null;
    return r && parseInt(r.getAttribute("data-dc-tpl"), 10) === t && xr(r)
      ? r
      : null;
  }
  var ze = 24e3;
  function kc(t, e) {
    for (var r = e; r > 0 && isFinite(r) && r <= 16 * e; r *= 2) {
      var n = al(t, r);
      if (!n || n.length <= 4) break;
      if (!(n.length * 2 > ze)) {
        var a = il(n, 1);
        if (a.length <= ze) return a;
      }
    }
    for (var i = Wi(t, 0, 0), o = 2; i.length > 95e3; o++)
      i = Wi(
        t.filter(function (l, u) {
          return u % o === 0 || u === t.length - 1;
        }),
        0,
        0,
      );
    return i;
  }
  function Nc(t, e) {
    for (
      var r = 1 / 0, n = 1 / 0, a = -1 / 0, i = -1 / 0, o = 0;
      o < e.length;
      o++
    )
      ((r = Math.min(r, e[o][0])),
        (a = Math.max(a, e[o][0])),
        (n = Math.min(n, e[o][1])),
        (i = Math.max(i, e[o][1])));
    t.el && !t.el.isConnected && (t = Tn(e[0][0], e[0][1]));
    var l = t.el,
      u =
        t.tid != null && l ? parseInt(l.getAttribute("data-dc-tpl"), 10) : NaN,
      s = isNaN(u) ? t.tid : u,
      d = s != null && l ? l.getBoundingClientRect() : t.rect,
      p = l ? Lt(l) : at || 1,
      c = Math.max(2, Math.round((a - r) / p)),
      g = Math.max(2, Math.round((i - n) / p));
    M({
      type: "insert",
      name: t.name,
      targetTid: s,
      position: s == null ? "root-end" : "into",
      rect: {
        x: Math.round((r - d.left) / p),
        y: Math.round((n - d.top) / p),
        w: c,
        h: g,
      },
      path: {
        d: kc(
          e.map(function (h) {
            return [(h[0] - r) / p, (h[1] - n) / p];
          }),
          Pu / Lr / p,
        ),
      },
    });
  }
  function Yr(t) {
    if (ot) {
      var e = ot;
      if (((ot = null), !t || e.points.length < 2)) {
        e.path.remove();
        return;
      }
      if (!kt) {
        e.path.remove();
        return;
      }
      (Ki(e.path), Nc(e.parent, e.points));
    }
  }
  function Ea(t, e) {
    if ((ot && Yr(t), !!kt)) {
      var r = kt;
      ((kt = null),
        Nt ? Ki(r.svg) : r.svg.remove(),
        t &&
          e &&
          M({
            type: "insert",
            name: null,
            targetTid: null,
            position: "root-end",
            endTool: !0,
          }));
    }
  }
  function zi(t) {
    var e = ke;
    if (((ke = null), (Dr = null), e && t.type === "mouseup" && U && !f)) {
      ((Dt = !0), Po(e.x, e.y, e.el && e.el.isConnected ? e.el : pr(t), e.was));
      return;
    }
    if (((U = null), (Mt = null), (At = null), (Ve = null), ht)) {
      ((Dt = !0), (ut = null), Xr());
      return;
    }
    if (
      (ut &&
        setTimeout(function () {
          ut = null;
        }, 0),
      ot)
    ) {
      ((Dt = !0), Yr(!0));
      return;
    }
    if (gt) {
      ((Dt = !0), yr(!0));
      return;
    }
    if (O) {
      ((Dt = !0), je(!0));
      return;
    }
    if (B) {
      ((Dt = !0), Mn(!0));
      return;
    }
    f &&
      ((Dt = !0),
      f.exited
        ? ((f.droppedOut = !0),
          M({
            type: "dragDrop",
            gestureKey: f.gestureKey,
            x: t.clientX,
            y: t.clientY,
            alt: !!(f.alt || t.altKey),
            ctrl: !!t.ctrlKey,
          }),
          re(!1))
        : re(!0));
  }
  var $ = { x: 0, y: 0 };
  function Te() {
    return (
      document.querySelector(".sc-host:not(.sc-host .sc-host)") || document.body
    );
  }
  var at = 1,
    zr,
    qi = !1;
  function Vi(t) {
    try {
      parent.postMessage({ type: t ? "__dc_present" : "__dc_absent" }, "*");
    } catch {}
  }
  function qr() {
    var t = Te();
    if (t) {
      var e = !$.x && !$.y && at === 1;
      if (
        ((t.style.transformOrigin = "0 0"),
        (t.style.transform = e
          ? ""
          : "translate(" + $.x + "px," + $.y + "px) scale(" + at + ")"),
        Kt && zr !== at)
      ) {
        zr = at;
        try {
          parent.postMessage({ type: "__dc_zoom", scale: at }, "*");
        } catch {}
      }
      if (
        (Kt &&
          !qi &&
          ((qi = !0),
          requestAnimationFrame(function () {
            qi = !1;
            try {
              parent.postMessage(
                { type: "__dc_pan_zoom", x: $.x, y: $.y, scale: at },
                "*",
              );
            } catch {}
          })),
        !e && !Kt)
      ) {
        var r = t.getBoundingClientRect(),
          n = Math.max(t.scrollWidth, t.offsetWidth) * at,
          a = Math.max(t.scrollHeight, t.offsetHeight) * at,
          i = r.left + n,
          o = r.top + a,
          l = window.innerWidth,
          u = window.innerHeight;
        if (n > 0 && a > 0) {
          var s = 0,
            d = 0;
          (n >= l
            ? r.left > 0
              ? (s = -r.left)
              : i < l && (s = l - i)
            : r.left < 0
              ? (s = -r.left)
              : i > l && (s = l - i),
            a >= u
              ? r.top > 0
                ? (d = -r.top)
                : o < u && (d = u - o)
              : r.top < 0
                ? (d = -r.top)
                : o > u && (d = u - o),
            (s || d) &&
              (($.x += s),
              ($.y += d),
              (t.style.transform =
                "translate(" + $.x + "px," + $.y + "px) scale(" + at + ")")));
        }
      }
      if (!e && Kt) {
        for (
          var p = 1 / 0, c = 1 / 0, g = -1 / 0, h = -1 / 0, v = 0;
          v < t.children.length;
          v++
        ) {
          var x = t.children[v];
          if (!x.hasAttribute("data-dc-editor-overlay")) {
            var y = Q(x).getBoundingClientRect();
            (y.width <= 0 && y.height <= 0) ||
              (y.left < p && (p = y.left),
              y.top < c && (c = y.top),
              y.right > g && (g = y.right),
              y.bottom > h && (h = y.bottom));
          }
        }
        if (p !== 1 / 0) {
          var m = window.innerWidth,
            w = window.innerHeight,
            E = 0,
            C = 0;
          (g < -m ? (E = -m - g) : p > 2 * m && (E = 2 * m - p),
            h < -w ? (C = -w - h) : c > 2 * w && (C = 2 * w - c),
            (E || C) &&
              (($.x += E),
              ($.y += C),
              (t.style.transform =
                "translate(" + $.x + "px," + $.y + "px) scale(" + at + ")")));
        }
      }
      (er(), Y());
    }
  }
  function Bu(t) {
    for (var e = 1 / 0, r = -1 / 0, n = 0; n < t.children.length; n++) {
      var a = t.children[n];
      if (!(a.hasAttribute && a.hasAttribute("data-dc-editor-overlay"))) {
        var i = Q(a);
        !i ||
          !i.offsetWidth ||
          (i.offsetLeft < e && (e = i.offsetLeft),
          i.offsetLeft + i.offsetWidth > r &&
            (r = i.offsetLeft + i.offsetWidth));
      }
    }
    return e === 1 / 0
      ? { left: 0, width: 0 }
      : { left: Math.min(e, 0), width: r - Math.min(e, 0) };
  }
  function Ku() {
    var t = Te();
    if (t) {
      var e = Bu(t);
      if (e.width) {
        var r = Kt ? 0.05 : 0.2,
          n = Kt ? 10 : 4,
          a = Math.min(n, Math.max(r, innerWidth / e.width)),
          i = -e.left * a;
        (a === at && $.x === i && !$.y) ||
          ((at = a), ($.x = i), ($.y = 0), qr());
      }
    }
  }
  function Gi(t, e, r) {
    var n = Kt ? 0.05 : 0.2,
      a = Kt ? 10 : 4;
    t = Math.min(a, Math.max(n, t));
    var i = Te();
    if (!(!i || t === at)) {
      var o = i.getBoundingClientRect(),
        l = o.left - $.x,
        u = o.top - $.y;
      (($.x = e - l - (e - l - $.x) * (t / at)),
        ($.y = r - u - (r - u - $.y) * (t / at)),
        (at = t),
        qr());
    }
  }
  function kn(t) {
    var e = t.data;
    if (e && e.type === "__dc_cancel_preview_dbl") {
      ((jt = null), (ye = null));
      return;
    }
    if (Kt) {
      var r = t.data;
      r && r.type === "__dc_set_zoom" && r.fit === "width"
        ? Ku()
        : r && r.type === "__dc_set_zoom" && typeof r.scale == "number"
          ? Gi(r.scale, innerWidth / 2, innerHeight / 2)
          : r && r.type === "__dc_probe" && (Vi(!0), (zr = void 0), qr());
    }
  }
  var St = null,
    Ft = null;
  function Ui() {
    if (St && St.root.isConnected) return St;
    if (!document.documentElement.hasAttribute("data-dc-canvas")) return null;
    var t = document.createElement("div");
    (t.setAttribute("data-dc-editor-overlay", ""),
      t.setAttribute("data-dc-edit-transparent", ""),
      t.setAttribute("data-omelette-chrome", ""),
      t.setAttribute("data-omelette-injected", ""),
      (t.style.cssText =
        "position:fixed;inset:0;z-index:2147483644;pointer-events:none;"));
    function e(r) {
      var n = document.createElement("div");
      (n.setAttribute("data-dc-pan-thumb", r),
        (n.style.cssText =
          "position:fixed;border-radius:3px;cursor:default;pointer-events:auto;touch-action:none;background:rgba(120,120,120,0.45);display:none;" +
          (r === "y" ? "right:2px;width:6px;" : "bottom:2px;height:6px;")),
        n.addEventListener("mouseenter", function () {
          n.style.background = "rgba(120,120,120,0.65)";
        }),
        n.addEventListener("mouseleave", function () {
          n.style.background = "rgba(120,120,120,0.45)";
        }),
        n.addEventListener("pointerdown", function (i) {
          if (i.button === 0) {
            (i.preventDefault(), i.stopPropagation());
            try {
              n.setPointerCapture(i.pointerId);
            } catch {}
            var o = Iu(),
              l =
                r === "y"
                  ? {
                      range: o.ch - o.vh,
                      track: o.trackH - o.thumbH,
                      pan0: $.y,
                      c0: i.clientY,
                    }
                  : {
                      range: o.cw - o.vw,
                      track: o.trackW - o.thumbW,
                      pan0: $.x,
                      c0: i.clientX,
                    };
            Ft = {
              axis: r,
              pan0: l.pan0,
              c0: l.c0,
              ratio: l.track > 0 ? l.range / l.track : 0,
            };
          }
        }),
        n.addEventListener("pointermove", function (i) {
          if (!(!Ft || Ft.axis !== r)) {
            var o = (r === "y" ? i.clientY : i.clientX) - Ft.c0;
            (r === "y"
              ? ($.y = Ft.pan0 - o * Ft.ratio)
              : ($.x = Ft.pan0 - o * Ft.ratio),
              qr());
          }
        }));
      function a() {
        !Ft || Ft.axis !== r || ((Ft = null), er());
      }
      return (
        n.addEventListener("pointerup", a),
        n.addEventListener("pointercancel", a),
        t.appendChild(n),
        n
      );
    }
    return (
      (St = { root: t, y: e("y"), x: e("x") }),
      document.body.hasAttribute("data-dc-editor-overlay-hidden") &&
        (t.style.display = "none"),
      document.documentElement.appendChild(t),
      window.addEventListener("resize", er),
      St
    );
  }
  function $i() {
    if ((window.removeEventListener("resize", er), St)) {
      try {
        St.root.parentNode.removeChild(St.root);
      } catch {}
      St = null;
    }
    Ft = null;
  }
  function Iu() {
    for (
      var t = Te(),
        e = innerWidth,
        r = innerHeight,
        n = 1 / 0,
        a = 1 / 0,
        i = -1 / 0,
        o = -1 / 0,
        l = 0;
      l < t.children.length;
      l++
    ) {
      var u = t.children[l];
      if (!u.hasAttribute("data-dc-editor-overlay")) {
        var s = Q(u).getBoundingClientRect();
        (s.width <= 0 && s.height <= 0) ||
          (s.left < n && (n = s.left),
          s.top < a && (a = s.top),
          s.right > i && (i = s.right),
          s.bottom > o && (o = s.bottom));
      }
    }
    n === 1 / 0 && (n = a = i = o = 0);
    var d = Math.min(n, 0),
      p = Math.min(a, 0),
      c = Math.max(i, e) - d,
      g = Math.max(o, r) - p,
      h = 20,
      v = 2,
      x = 6,
      y = e - 2 * v - (g > r + 1 ? x + v : 0),
      m = r - 2 * v - (c > e + 1 ? x + v : 0);
    return {
      vw: e,
      vh: r,
      cw: c,
      ch: g,
      left: d,
      top: p,
      inset: v,
      thumbW: Math.max(h, y * Math.min(1, e / c)),
      thumbH: Math.max(h, m * Math.min(1, r / g)),
      trackW: y,
      trackH: m,
    };
  }
  function er() {
    if (St) {
      var t = Iu();
      if (t.cw > t.vw + 1) {
        var e = Math.max(0, Math.min(1, -t.left / (t.cw - t.vw)));
        ((St.x.style.display = "block"),
          (St.x.style.left = t.inset + e * (t.trackW - t.thumbW) + "px"),
          (St.x.style.width = t.thumbW + "px"));
      } else (!Ft || Ft.axis !== "x") && (St.x.style.display = "none");
      if (t.ch > t.vh + 1) {
        var r = Math.max(0, Math.min(1, -t.top / (t.ch - t.vh)));
        ((St.y.style.display = "block"),
          (St.y.style.top = t.inset + r * (t.trackH - t.thumbH) + "px"),
          (St.y.style.height = t.thumbH + "px"));
      } else (!Ft || Ft.axis !== "y") && (St.y.style.display = "none");
    }
  }
  function Vr(t, e, r, n, a, i, o) {
    M({
      type: "panZoom",
      pinch: !!t,
      touch: !!o,
      dx: e,
      dy: r,
      dz: n,
      x: a,
      y: i,
    });
  }
  function Ca(t) {
    if (Re) {
      t.ctrlKey || t.metaKey ? Rc(t) : Dc(t);
      return;
    }
    if (Qt) {
      (t.ctrlKey || t.metaKey || No(t)) && t.preventDefault();
      return;
    }
    if (!(!I && !Kt && !lr)) {
      if (I && D === "interact") {
        No(t) && t.preventDefault();
        return;
      }
      if (wr) {
        (t.preventDefault(), t.stopPropagation());
        return;
      }
      if (lr) {
        var e = t.ctrlKey || t.metaKey;
        (t.preventDefault(), t.stopPropagation(), Zi(t, e));
        return;
      }
      var r = t.ctrlKey || t.metaKey;
      if (r) ue = 0;
      else {
        var n = t.timeStamp;
        if ((n - on > 200 && (ue = 0), (on = n), ue === 0)) {
          if (!t.deltaX && !t.deltaY) {
            (t.preventDefault(), t.stopPropagation());
            return;
          }
          ue = Mr(t, pp) || (he(t) && vp(t)) || (!I && Zs(t)) ? 1 : -1;
        }
        if (ue === 1) return;
      }
      if ((t.preventDefault(), t.stopPropagation(), Yt(), r)) {
        Gi(at * Math.exp(-t.deltaY * 0.01), t.clientX, t.clientY);
        return;
      }
      (($.x -= t.deltaX), ($.y -= t.deltaY), qr());
    }
  }
  function Zi(t, e) {
    var r = t.deltaMode === 1 ? 16 : t.deltaMode === 2 ? window.innerHeight : 1,
      n = t.deltaMode === 1 ? 16 : t.deltaMode === 2 ? window.innerWidth : 1;
    e
      ? Vr(
          !0,
          0,
          0,
          Math.max(-0.22314, Math.min(0.22314, -t.deltaY * r * 0.01)),
          t.clientX,
          t.clientY,
        )
      : Vr(!1, t.deltaX * n, t.deltaY * r, 0, t.clientX, t.clientY);
  }
  function Lc(t) {
    var e = document.documentElement,
      r = document.body,
      n = document.scrollingElement || e,
      a = getComputedStyle(e),
      i = a.overflowX === "visible" && a.overflowY === "visible" && !!r,
      o = i ? getComputedStyle(r) : a,
      l = Math.abs(t.deltaY) >= Math.abs(t.deltaX),
      u = function (c) {
        return l
          ? t.deltaY > 0
            ? c.scrollTop + c.clientHeight < c.scrollHeight - 1
            : c.scrollTop > 1
          : t.deltaX > 0
            ? c.scrollLeft + c.clientWidth < c.scrollWidth - 1
            : c.scrollLeft > 1;
      },
      s = l ? o.overflowY : o.overflowX;
    if (s !== "hidden" && s !== "clip" && u(n)) return !0;
    if (i || !r) return !1;
    var d = getComputedStyle(r),
      p = l ? d.overflowY : d.overflowX;
    return (p === "auto" || p === "scroll") && u(r);
  }
  function Rc(t) {
    ((ue = 0), t.preventDefault(), t.stopPropagation(), wr || Zi(t, !0));
  }
  var Sa = null;
  function Dc(t) {
    var e = t.preventDefault,
      r = No(t),
      n = t.defaultPrevented;
    (r && e.call(t),
      (t.preventDefault = function () {
        ((n = !0), e.call(t));
      }));
    var a = {
      e: t,
      canScroll: Zs(t) || Lc(t),
      taken: function () {
        return n || (!r && t.defaultPrevented);
      },
    };
    if (Sa) {
      Sa.push(a);
      return;
    }
    var i = (ue === 0 || t.timeStamp - on > 200) && (t.deltaX || t.deltaY);
    if (!i) {
      setTimeout(function () {
        Ji(a, !1);
      }, 0);
      return;
    }
    var o = t.target && t.target.nodeType === 1 ? t.target : null,
      l = o && o.getBoundingClientRect(),
      u = o && document.getAnimations ? document.getAnimations() : null,
      s = !1,
      d = (Sa = []),
      p = function () {
        if (!s) {
          s = !0;
          for (
            var c = o && o.isConnected ? o.getBoundingClientRect() : null,
              g =
                !!l &&
                (!c ||
                  c.left !== l.left ||
                  c.top !== l.top ||
                  c.width !== l.width ||
                  c.height !== l.height),
              h = u ? document.getAnimations() : [],
              v = 0;
            v < h.length && !g;
            v++
          ) {
            var x = h[v].effect && h[v].effect.target;
            g =
              u.indexOf(h[v]) === -1 &&
              !!x &&
              (x === o || x.contains(o) || o.contains(x));
          }
          ((Sa = null), Ji(a, g));
          for (var y = 0; y < d.length; y++) Ji(d[y], !1);
        }
      };
    (requestAnimationFrame(function () {
      setTimeout(p, 0);
    }),
      setTimeout(p, 120));
  }
  function Ji(t, e) {
    var r = t.e,
      n = e || t.taken();
    if (Re) {
      if ((r.timeStamp - on > 200 && (ue = 0), (on = r.timeStamp), ue === 0)) {
        if (!r.deltaX && !r.deltaY) return;
        ue = n || t.canScroll ? 1 : -1;
      }
      ue === -1 && !n && !t.canScroll && Zi(r, !1);
    }
  }
  var Fu = 1,
    wr = !1,
    Qi = 1;
  function Ou(t) {
    if (Qt && !Re) {
      t.preventDefault();
      return;
    }
    (!I && !Kt && !lr && !Re) ||
      (I && D === "interact") ||
      (t.preventDefault(), (wr = !0), (Fu = at), (Qi = 1));
  }
  function Xu(t) {
    if (wr) {
      if ((t.preventDefault(), lr || Re)) {
        var e = t.scale || 1,
          r = e / (Qi || 1);
        if (((Qi = e), r > 0)) {
          var n = Math.max(-0.22314, Math.min(0.22314, Math.log(r)));
          Vr(!0, 0, 0, n, t.clientX, t.clientY);
        }
        return;
      }
      (Yt(), Gi(Fu * (t.scale || 1), t.clientX, t.clientY));
    }
  }
  function _u(t) {
    wr && (t.preventDefault(), (wr = !1));
  }
  function Wu() {
    (document.addEventListener("gesturestart", Ou, {
      capture: !0,
      passive: !1,
    }),
      document.addEventListener("gesturechange", Xu, {
        capture: !0,
        passive: !1,
      }),
      document.addEventListener("gestureend", _u, { capture: !0, passive: !1 }),
      document.addEventListener("pointerdown", Yu, {
        capture: !0,
        passive: !0,
      }),
      document.addEventListener("pointermove", zu, {
        capture: !0,
        passive: !0,
      }),
      document.addEventListener("pointerup", Ta, { capture: !0, passive: !0 }),
      document.addEventListener("pointercancel", Ta, {
        capture: !0,
        passive: !0,
      }),
      document.addEventListener("pointerdown", Vu, { capture: !0 }),
      document.addEventListener("mousedown", Gu, { capture: !0 }),
      document.addEventListener("pointermove", Uu, {
        capture: !0,
        passive: !0,
      }),
      document.addEventListener("pointerup", Ln, { capture: !0, passive: !0 }),
      document.addEventListener("pointercancel", Ln, {
        capture: !0,
        passive: !0,
      }),
      document.addEventListener("touchstart", Zu, { capture: !0, passive: !0 }),
      document.addEventListener("touchmove", Ju, { capture: !0, passive: !1 }),
      document.addEventListener("touchend", ka, { capture: !0, passive: !0 }),
      document.addEventListener("touchcancel", ka, {
        capture: !0,
        passive: !0,
      }),
      Nn());
  }
  function Hu() {
    ((wr = !1),
      document.removeEventListener("gesturestart", Ou, { capture: !0 }),
      document.removeEventListener("gesturechange", Xu, { capture: !0 }),
      document.removeEventListener("gestureend", _u, { capture: !0 }),
      document.removeEventListener("pointerdown", Yu, { capture: !0 }),
      document.removeEventListener("pointermove", zu, { capture: !0 }),
      document.removeEventListener("pointerup", Ta, { capture: !0 }),
      document.removeEventListener("pointercancel", Ta, { capture: !0 }),
      document.removeEventListener("pointerdown", Vu, { capture: !0 }),
      document.removeEventListener("mousedown", Gu, { capture: !0 }),
      document.removeEventListener("pointermove", Uu, { capture: !0 }),
      document.removeEventListener("pointerup", Ln, { capture: !0 }),
      document.removeEventListener("pointercancel", Ln, { capture: !0 }),
      document.removeEventListener("touchstart", Zu, { capture: !0 }),
      document.removeEventListener("touchmove", Ju, { capture: !0 }),
      document.removeEventListener("touchend", ka, { capture: !0 }),
      document.removeEventListener("touchcancel", ka, { capture: !0 }),
      (Ar = {}),
      (qe = []),
      (Ur = !1),
      (Pa = {}),
      et &&
        (et.live &&
          ((document.documentElement.style.cursor = et.cursor),
          et.mask === 2 && M({ type: "panHold", on: !1 })),
        (et = null)),
      (document.documentElement.style.touchAction = ""),
      (document.documentElement.style.overscrollBehavior = ""));
  }
  function Gr() {
    return lr && !(I && D === "interact") && !b;
  }
  function Nn() {
    var t = Gr();
    ((document.documentElement.style.touchAction = t
      ? "none"
      : Qt
        ? "pan-x pan-y"
        : ""),
      (document.documentElement.style.overscrollBehavior =
        lr || Qt ? "none" : ""),
      t || ((Ar = {}), (qe = []), (Ur = !1)));
  }
  var Ar = {},
    qe = [],
    Ur = !1,
    ji = 6;
  function Yu(t) {
    t.pointerType !== "touch" ||
      !Gr() ||
      (qe.indexOf(t.pointerId) === -1 && qe.push(t.pointerId),
      (Ar[t.pointerId] = {
        x: t.screenX,
        y: t.screenY,
        sx: t.screenX,
        sy: t.screenY,
        ix: t.clientX,
        iy: t.clientY,
      }),
      (Ur = !1));
  }
  function zu(t) {
    var e = Ar[t.pointerId];
    if (!(!e || !Gr())) {
      var r = t.screenX,
        n = t.screenY;
      ((e.ix = t.clientX), (e.iy = t.clientY));
      var a = qe.indexOf(t.pointerId);
      if (a > 1) {
        ((e.x = r), (e.y = n));
        return;
      }
      if (qe.length >= 2) {
        var i = qe[a === 0 ? 1 : 0],
          o = Ar[i];
        if (!o) return;
        var l = (e.x + o.x) / 2,
          u = (e.y + o.y) / 2,
          s = Math.hypot(e.x - o.x, e.y - o.y);
        ((e.x = r), (e.y = n));
        var d = (e.x + o.x) / 2,
          p = (e.y + o.y) / 2,
          c = Math.hypot(e.x - o.x, e.y - o.y),
          g = 0;
        (s > 0 &&
          c > 0 &&
          (g = Math.max(-0.22314, Math.min(0.22314, Math.log(c / s)))),
          Vr(!0, l - d, u - p, g, (e.ix + o.ix) / 2, (e.iy + o.iy) / 2, !0));
        return;
      }
      if (!Ur) {
        if (Math.hypot(r - e.sx, n - e.sy) < ji) {
          ((e.x = r), (e.y = n));
          return;
        }
        Ur = !0;
      }
      var h = e.x - r,
        v = e.y - n;
      ((e.x = r),
        (e.y = n),
        (h !== 0 || v !== 0) && Vr(!1, h, v, 0, t.clientX, t.clientY, !0));
    }
  }
  function Ta(t) {
    if (Ar[t.pointerId] !== void 0) {
      delete Ar[t.pointerId];
      var e = qe.indexOf(t.pointerId);
      (e !== -1 && qe.splice(e, 1), (Ur = !1));
    }
  }
  var et = null,
    Ma = !1,
    to = 0;
  function Bc(t) {
    for (var e = t; e && e.nodeType === 1; e = e.parentElement)
      if (
        e.tagName === "INPUT" ||
        e.tagName === "TEXTAREA" ||
        e.tagName === "SELECT" ||
        e.isContentEditable === !0
      )
        return !0;
    return !1;
  }
  function eo(t) {
    return Gr() || (Re && t === 4);
  }
  function ro(t) {
    t.buttons !== 2 ||
      !eo(2) ||
      !I ||
      he(t) ||
      (et = {
        id: t.type === "contextmenu" ? null : t.pointerId,
        mask: 2,
        x: t.screenX,
        y: t.screenY,
        live: !1,
        cursor: "",
        menu: null,
      });
  }
  function qu(t) {
    return (
      !!et &&
      (et.id === null
        ? t.pointerType === "mouse" ||
          (t.pointerType === "pen" && ((t.buttons & 2) !== 0 || t.button === 2))
        : t.pointerId === et.id)
    );
  }
  function Vu(t) {
    if (((to = 0), (Ma = !0), !(et && et.live))) {
      if (t.button === 2) {
        ro(t);
        return;
      }
      t.button !== 1 ||
        !eo(4) ||
        Bc(t.target) ||
        (t.preventDefault(),
        (et = {
          id: t.pointerId,
          mask: 4,
          x: t.screenX,
          y: t.screenY,
          live: !1,
          cursor: "",
          menu: null,
        }));
    }
  }
  function Gu(t) {
    t.button === 1 && et && t.preventDefault();
  }
  function Uu(t) {
    if (
      (t.buttons || (Ma = !1),
      !et && !Ma && t.pointerType !== "touch" && ro(t),
      !!qu(t))
    ) {
      if (!(t.buttons & et.mask) || !eo(et.mask)) {
        Ln(t);
        return;
      }
      if (!et.live) {
        if (Math.hypot(t.screenX - et.x, t.screenY - et.y) < ji) return;
        ((et.live = !0),
          (et.cursor = document.documentElement.style.cursor),
          (document.documentElement.style.cursor = "grabbing"));
        try {
          document.documentElement.setPointerCapture(t.pointerId);
        } catch {}
        et.mask === 2 && M({ type: "panHold", on: !0 });
      }
      var e = et.x - t.screenX,
        r = et.y - t.screenY;
      ((et.x = t.screenX),
        (et.y = t.screenY),
        (e !== 0 || r !== 0) && Vr(!1, e, r, 0, t.clientX, t.clientY, !1));
    }
  }
  function Ln(t) {
    if ((t.buttons || (Ma = !1), !!qu(t))) {
      var e = et;
      if (((et = null), e.live)) {
        document.documentElement.style.cursor = e.cursor;
        try {
          document.documentElement.releasePointerCapture(t.pointerId);
        } catch {}
        e.mask === 2 && ((to = Date.now()), M({ type: "panHold", on: !1 }));
      } else
        e.menu &&
          t.type !== "pointercancel" &&
          Gr() &&
          Math.hypot(t.screenX - e.x, t.screenY - e.y) < ji &&
          Po(
            e.menu.x,
            e.menu.y,
            e.menu.el && e.menu.el.isConnected ? e.menu.el : pr(t),
          );
    }
  }
  var Pa = {};
  function $u() {
    return Gr() || Qt;
  }
  function Kc() {
    var t = document.scrollingElement || document.documentElement;
    return (
      t.scrollHeight > t.clientHeight + 1 || t.scrollWidth > t.clientWidth + 1
    );
  }
  function Ic(t) {
    if (Qt && Kc()) return !0;
    for (var e = t; e && e !== document.documentElement;) {
      if (e.nodeType === 1) {
        var r = e.tagName;
        if (
          r === "INPUT" ||
          r === "SELECT" ||
          r === "TEXTAREA" ||
          e.isContentEditable === !0
        )
          return !0;
        var n = null;
        try {
          n = window.getComputedStyle(e);
        } catch {
          n = null;
        }
        if (
          n &&
          (((n.overflowY === "auto" || n.overflowY === "scroll") &&
            e.scrollHeight > e.clientHeight) ||
            ((n.overflowX === "auto" || n.overflowX === "scroll") &&
              e.scrollWidth > e.clientWidth))
        )
          return !0;
      }
      e = e.parentElement;
    }
    return !1;
  }
  function Zu(t) {
    if ($u())
      for (var e = 0; e < t.changedTouches.length; e++) {
        var r = t.changedTouches[e];
        Pa[r.identifier] = !Ic(r.target);
      }
  }
  function Ju(t) {
    if (!(!$u() || !t.cancelable)) {
      var e = t.changedTouches.length;
      if (e !== 0) {
        for (var r = 0; r < e; r++)
          if (Pa[t.changedTouches[r].identifier] !== !0) return;
        t.preventDefault();
      }
    }
  }
  function ka(t) {
    for (var e = 0; e < t.changedTouches.length; e++)
      delete Pa[t.changedTouches[e].identifier];
  }
  function Qu(t) {
    return {
      x: t.clientX,
      y: t.clientY,
      sx: window.scrollX,
      sy: window.scrollY,
      w: window.innerWidth,
      h: window.innerHeight,
    };
  }
  function ju(t) {
    if (I && D !== "interact") {
      var e = t.dataTransfer;
      !e ||
        !e.types ||
        Array.prototype.indexOf.call(e.types, "Files") === -1 ||
        (t.preventDefault(),
        t.stopPropagation(),
        (e.dropEffect =
          Tt || (Fl(t) && !_n(t.clientX, t.clientY)) ? "none" : "copy"));
    }
  }
  function Na(t, e) {
    return (
      (t = t || ""),
      t === ""
        ? String(e || "")
            .slice(-4)
            .toLowerCase() === ".mov"
        : t.indexOf("image/") === 0 || t.indexOf("video/") === 0
    );
  }
  function ts(t) {
    if (I && D !== "interact") {
      var e = t.dataTransfer;
      if (
        !(!e || !e.files || e.files.length === 0) &&
        (t.preventDefault(),
        t.stopPropagation(),
        !Tt && !(Fl(t) && !_n(t.clientX, t.clientY)))
      ) {
        for (var r = [], n = 0; n < e.files.length; n++)
          Na(e.files[n].type, e.files[n].name) && r.push(e.files[n]);
        if (r.length === 0) {
          M({
            type: "fileDrop",
            files: [],
            name: null,
            targetTid: null,
            position: "root-end",
          });
          return;
        }
        var a = Fs(t.clientX, t.clientY);
        if (a && a.refuse) {
          M({
            type: "fileDrop",
            files: [],
            refuse: !0,
            name: null,
            targetTid: null,
            position: "root-end",
          });
          return;
        }
        var i = a ? a.el : null;
        (M({
          type: "fileDrop",
          files: r,
          name: i ? _(i) : null,
          targetTid: i ? parseInt(i.getAttribute("data-dc-tpl"), 10) : null,
          position: a ? a.position : "root-end",
          slide: i ? Ds(i) : null,
          point: a ? a.point : null,
          at: Qu(t),
        }),
          i && Bs(nr(i)));
      }
    }
  }
  var La = null,
    Ra = 0,
    zt = null,
    no = null;
  function es() {
    (rs(),
      (no = document.activeElement),
      (zt = document.createElement("textarea")),
      zt.setAttribute("data-dc-editor-copy-sink", ""),
      zt.setAttribute("aria-hidden", "true"),
      (zt.value = " "),
      (zt.style.cssText =
        "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;border:0;padding:0"),
      fe().appendChild(zt));
    try {
      (zt.focus({ preventScroll: !0 }), zt.select());
    } catch {}
    setTimeout(rs, 0);
  }
  function rs() {
    if (zt) {
      var t = zt,
        e = no;
      if (
        ((zt = null),
        (no = null),
        t.remove(),
        e &&
          e !== document.body &&
          e.isConnected &&
          typeof e.focus == "function")
      )
        try {
          e.focus({ preventScroll: !0 });
        } catch {}
    }
  }
  var Fc = "data-appifact-object",
    Oc = /data-appifact-object="([A-Za-z0-9+\/=]+)"/,
    Xc = 34 * 1024 * 1024;
  function ns(t) {
    if (
      !t.isTrusted ||
      !I ||
      D === "interact" ||
      b ||
      f ||
      B ||
      O ||
      gt ||
      ot ||
      kt ||
      ht ||
      At
    )
      return !1;
    var e = t.target;
    return e && e === zt
      ? !0
      : !(
          e &&
          (e.tagName === "INPUT" ||
            e.tagName === "TEXTAREA" ||
            e.tagName === "SELECT" ||
            e.isContentEditable)
        );
  }
  function _c() {
    for (var t = [], e = 0; e < A.length && t.length < 200; e++)
      for (var r = z(A[e], R), n = 0; n < r.length; n++) {
        var a = r[n],
          i = (
            a.innerText ||
            a.getAttribute("alt") ||
            a.getAttribute("aria-label") ||
            a.getAttribute("title") ||
            ""
          ).trim();
        i && t.push(i);
      }
    return t
      .join(
        `
`,
      )
      .slice(0, 2e4);
  }
  function Da(t) {
    var e = zt !== null && t.target === zt;
    if (!ns(t) || A.length === 0 || (t.type === "cut" && Tt)) {
      e && t.preventDefault();
      return;
    }
    var r = t.type === "cut" ? "x" : "c",
      n = Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
      a = _c() || " ";
    try {
      var i = btoa(
        unescape(
          encodeURIComponent(
            JSON.stringify({
              appifact: 1,
              kind: "design-elements",
              data: { stamp: n },
            }),
          ),
        ),
      );
      (t.clipboardData.setData("text/plain", a),
        t.clipboardData.setData(
          "text/html",
          "<span " +
            Fc +
            '="' +
            i +
            '">' +
            a
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;") +
            "</span>",
        ),
        t.preventDefault(),
        t.stopPropagation());
    } catch {
      ((n = null), e && t.preventDefault());
    }
    (n &&
      M({
        type: "clipboardKey",
        key: r,
        stamp: n,
        text: a,
        mark: Date.now() - Ra < 1e3,
      }),
      (Ra = 0));
  }
  function Wc(t) {
    try {
      var e = t.getData("text/html") || "",
        r = e.length > Xc ? null : Oc.exec(e);
      if (!r) return null;
      var n = JSON.parse(
        new TextDecoder().decode(
          Uint8Array.from(atob(r[1]), function (l) {
            return l.charCodeAt(0);
          }),
        ),
      );
      if (
        !n ||
        n.appifact !== 1 ||
        (n.kind !== "design-elements" && n.kind !== "design-artboards") ||
        !n.data
      )
        return null;
      var a = n.data.stamp,
        i = typeof a == "string" && a.length > 0 && a.length <= 64 ? a : null,
        o =
          n.kind === "design-artboards"
            ? Math.min(
                [n.data.artboards, n.data.annotations].reduce(function (l, u) {
                  return l + (Array.isArray(u) ? u.length : 0);
                }, 0),
                999,
              )
            : 0;
      return i || o > 0 ? { stamp: i, foreignArtboards: o } : null;
    } catch {
      return null;
    }
  }
  function as(t) {
    if (ns(t) && (clearTimeout(La), !Tt)) {
      for (
        var e = t.clipboardData, r = [], n = 0, a = 0;
        e && e.files && a < e.files.length;
        a++
      )
        (r.push(e.files[a]), Na(e.files[a].type, e.files[a].name) && n++);
      var i = e ? String(e.getData("text/plain") || "") : "",
        o = e ? Wc(e) : null;
      (t.preventDefault(), t.stopPropagation());
      var l = n
        ? { type: "filePaste", files: r, text: i }
        : { type: "clipboardKey", key: "v", text: i };
      (o && o.stamp && (l.stamp = o.stamp),
        o &&
          o.foreignArtboards > 0 &&
          (l.foreignArtboards = o.foreignArtboards),
        M(l));
    }
  }
  var Rn = !1;
  function is() {
    Rn || ((Rn = !0), M({ type: "pointerPresence", inside: !0 }));
  }
  var Dn = 0,
    os = 0,
    Bn = null;
  function ls() {
    ((Dn = 0), Bn && ((os = performance.now()), M(Bn), (Bn = null)));
  }
  function us(t) {
    if (
      !(!t.isTrusted || X || t.pointerType === "touch") &&
      ((Bn = { type: "pointerAt", x: t.clientX, y: t.clientY }), !Dn)
    ) {
      var e = 80 - (performance.now() - os);
      e <= 0 ? ls() : (Dn = setTimeout(ls, e));
    }
  }
  function Hc() {
    (clearTimeout(Dn), (Dn = 0), (Bn = null));
  }
  function ss(t) {
    t.relatedTarget || is();
  }
  function ds(t) {
    t.relatedTarget ||
      ((Rn = !1),
      (ke = null),
      (ur = null),
      M({ type: "pointerPresence", inside: !1 }),
      xe(),
      We());
  }
  function fs(t) {
    {
      var e = z(String(U.tid), U.name);
      if (e && e.length > 1)
        return (
          M({ type: "repeatRefused", count: e.length, reason: "self" }),
          (U = null),
          !1
        );
      if (Sn(U.el))
        return (
          M({ type: "repeatRefused", count: 1, reason: "self" }),
          (U = null),
          !1
        );
    }
    var r = U.el,
      n = getComputedStyle(r),
      a = ga(r, n),
      i = n.position === "absolute" || n.position === "fixed",
      o = r.parentElement ? r.parentElement.closest("[data-dc-tpl]") : null,
      l = (!i && o && getComputedStyle(o).display) || "",
      u = null;
    if (!i && o) {
      for (
        var s = o.firstElementChild, d = {}, p = !1;
        s;
        s = s.nextElementSibling
      )
        if (!(!s.hasAttribute || !s.hasAttribute("data-dc-tpl"))) {
          var c = s.getAttribute("data-dc-tpl");
          if (((d[c] = (d[c] || 0) + 1), d[c] > 1)) {
            p = !0;
            break;
          }
        }
      if (!p) {
        for (
          var g = _(r),
            h = o.getBoundingClientRect(),
            v = vr(r) || 1,
            x = [],
            y = o.firstElementChild;
          y;
          y = y.nextElementSibling
        )
          if (
            !(y === r || !y.hasAttribute || !y.hasAttribute("data-dc-tpl")) &&
            _(y) === g
          ) {
            var m = getComputedStyle(y);
            if (!(m.position === "absolute" || m.position === "fixed")) {
              var w = y.getBoundingClientRect();
              x.push({
                tid: parseInt(y.getAttribute("data-dc-tpl"), 10),
                left: Math.round((w.left - h.left) / v),
                top: Math.round((w.top - h.top) / v),
                w: Math.round(w.width / v),
                h: Math.round(w.height / v),
                static: m.position === "static",
              });
            }
          }
        var E = parseInt(o.getAttribute("data-dc-tpl"), 10);
        u = {
          parentTid: isNaN(E) ? null : E,
          parentStatic: getComputedStyle(o).position === "static",
          w: Math.round(h.width / v),
          h: Math.round(h.height / v),
          siblings: x,
        };
      }
    }
    var C = null;
    if (
      i &&
      !t.altKey &&
      !a.bothX &&
      !a.bothY &&
      A.length > 1 &&
      R === U.name &&
      A.indexOf(U.tid) >= 0
    ) {
      C = [];
      for (var S = 0; S < A.length; S++)
        if (A[S] !== U.tid) {
          var T = z(String(A[S]), U.name),
            k = T[0];
          if (!(!k || !pe(Q(k)))) {
            var L = k ? getComputedStyle(k) : null,
              P = T.length === 1 ? ga(k, L) : null;
            if (
              !P ||
              k.parentElement !== r.parentElement ||
              Ee(k) ||
              Ae(k) ||
              (L.position !== "absolute" && L.position !== "fixed") ||
              P.bothX ||
              P.bothY
            ) {
              C = null;
              break;
            }
            C.push({
              el: k,
              tid: A[S],
              fixed: L.position === "fixed",
              useRight: P.useRight,
              useBottom: P.useBottom,
              startLeft: P.startLeft,
              startTop: P.startTop,
              startRight: P.startRight,
              startBottom: P.startBottom,
              lastPatch: null,
              absStyles: null,
            });
          }
        }
    }
    C && !C.length && (C = null);
    var N = Q(r).getBoundingClientRect(),
      F = null;
    if (
      !i &&
      o &&
      !t.altKey &&
      A.length > 1 &&
      R === U.name &&
      A.indexOf(U.tid) >= 0
    ) {
      F = [];
      for (var q = ou(U.tid, U.name), V = 0; V < A.length; V++)
        if (A[V] !== U.tid) {
          var j = z(String(A[V]), U.name),
            K = j[0];
          if (!(!K || !pe(Q(K)))) {
            var J = getComputedStyle(K);
            if (
              j.length > 1 ||
              K.parentElement !== r.parentElement ||
              ou(A[V], U.name) !== q ||
              Ee(K) ||
              Ae(K) ||
              Sn(K) ||
              J.position === "absolute" ||
              J.position === "fixed"
            ) {
              F = null;
              break;
            }
            F.length < ql && F.push(K);
          }
        }
      F && !F.length && (F = null);
    }
    if (
      ((f = {
        tid: U.tid,
        name: U.name,
        alt: C || F ? !1 : t.altKey,
        followers: C,
        el: r,
        tag: r.tagName,
        fromDrawing: Mf(r),
        mode: i ? "abs" : "flow",
        flatten: u,
        startRect: N,
        gestureKey: mi(),
        scl: vr(r),
        am: xn(r),
        startX: t.clientX,
        startY: t.clientY,
        grabDx: U.x - N.left,
        grabDy: U.y - N.top,
        origParent: r.parentNode,
        origNext: r.nextSibling,
        origParentStamped: o || _t(),
        origAncestorEls: Ef(r),
        peerParent:
          l.indexOf("flex") !== -1 || l.indexOf("grid") !== -1 ? o : null,
        peerTid: o ? parseInt(o.getAttribute("data-dc-tpl"), 10) : null,
        origStyle: r.getAttribute("style") || "",
        canBreak: Uo(r, n),
        startW: $o(n),
        startH: Zo(r, n),
        startLines: {
          gridRowStart: n.gridRowStart,
          gridRowEnd: n.gridRowEnd,
          gridColumnStart: n.gridColumnStart,
          gridColumnEnd: n.gridColumnEnd,
        },
        brkFollowers: i ? null : Df(r, U.tid, U.name),
        freezeStyle: Si(r),
        useRight: a.useRight,
        useBottom: a.useBottom,
        bothX: a.bothX,
        bothY: a.bothY,
        fixed: n.position === "fixed",
        startLeft: a.startLeft,
        startTop: a.startTop,
        startRight: a.startRight,
        startBottom: a.startBottom,
        commit: null,
        absStyles: null,
        previewKey: "",
        previewActive: !1,
        epoch: 0,
        slotPt: null,
        previewParentEl: null,
        absParent: null,
        maskX: Qt && Ml("x"),
        maskY: Qt && Ml("y"),
      }),
      Ut("data-dc-dragging"),
      Ut("data-dc-drag-parent"),
      Ut("data-dc-drag-follower"),
      Ut("data-dc-drag-block"),
      (f.group =
        F &&
        F.map(function (vt) {
          var mt = hr(vt),
            Pt = Si(vt),
            G = (f.brkFollowers || []).filter(function (lt) {
              return lt.tid === mt;
            })[0];
          return (
            G && (G.freezeStyle = Pt),
            { tid: mt, freezeStyle: Pt || void 0 }
          );
        })),
      i || (f.proxy = Ul(r)),
      f.proxy && F)
    ) {
      f.groupProxies = [];
      for (var W = 0, H = Date.now() + Gl; W < F.length; W++) {
        var Z = Q(F[W]).getBoundingClientRect(),
          pt = Ul(F[W], H);
        pt &&
          f.groupProxies.push({
            p: pt,
            tid: hr(F[W]),
            dx: Z.left - N.left,
            dy: Z.top - N.top,
          });
      }
    }
    if (((f.lift = bf(Q(r), f.startRect)), qt(), X)) f.hostKey = X.key;
    else {
      var st = R !== f.name || A.indexOf(f.tid) < 0;
      (st && ((A = [f.tid]), (R = f.name), (ft = null), yt()),
        Ct(A.length === 1 ? Fe(r) : void 0, void 0, !st));
      var rt =
        f.followers || f.group ? { gestureKey: f.gestureKey } : lu(f, f.alt);
      ((rt.type = "dragState"), (rt.live = !0), M(rt), Hd());
    }
    return (
      r.style.setProperty("pointer-events", "none", "important"),
      (U = null),
      (ke = null),
      (ut = null),
      (document.body.style.cursor = "grabbing"),
      xe(),
      !0
    );
  }
  function Kn(t) {
    if ((X || is(), !((!I && !X) || b))) {
      if (
        (sn(t.altKey),
        (Rr = ge ? !!t.metaKey : !!t.ctrlKey),
        (ur = { x: t.clientX, y: t.clientY }),
        t.buttons === 0 &&
          (U || Mt || At || ht || ot || O || gt || B || f) &&
          zi(t),
        ot)
      ) {
        var e = ot.points[ot.points.length - 1],
          r = t.clientX - e[0],
          n = t.clientY - e[1];
        if (r * r + n * n >= 4) {
          ot.points.push([t.clientX, t.clientY]);
          var a = ot.long ? null : al(ot.points, Pu / Lr),
            i = a && a.length * 2 <= ze ? il(a, 1) : null;
          (a && !(i && i.length <= ze) && (ot.long = !0),
            ot.path.setAttribute(
              "d",
              i && i.length <= ze ? i : Wi(ot.points, 0, 0),
            ));
        }
        return;
      }
      if (B) {
        var o = t.clientX,
          l = t.clientY,
          u = D === "arrow" || D === "line";
        if (t.shiftKey && u) {
          var s = nl({ x: B.startX, y: B.startY }, { x: o, y: l });
          ((o = s.x), (l = s.y));
        }
        if (
          ((B.w = Math.abs(o - B.startX)),
          (B.h = Math.abs(l - B.startY)),
          t.shiftKey && !u)
        ) {
          var d = Math.max(B.w, B.h);
          ((B.w = d),
            (B.h = d),
            (B.x = o < B.startX ? B.startX - d : B.startX),
            (B.y = l < B.startY ? B.startY - d : B.startY));
        } else ((B.x = Math.min(B.startX, o)), (B.y = Math.min(B.startY, l)));
        if (
          ((B.dirX = o >= B.startX ? 1 : -1),
          (B.dirY = l >= B.startY ? 1 : -1),
          (B.box.style.left = B.x + "px"),
          (B.box.style.top = B.y + "px"),
          (B.box.style.width = B.w + "px"),
          (B.box.style.height = B.h + "px"),
          u)
        ) {
          var p = Lt(B.parentEl) || 1,
            c = B.w,
            g = B.h,
            h = Math.max(c, 8 * p),
            v = Math.max(g, 8 * p),
            x = (h - c) / 2,
            y = (v - g) / 2;
          ((B.box.style.left = B.x - x + "px"),
            (B.box.style.top = B.y - y + "px"),
            (B.box.style.width = h + "px"),
            (B.box.style.height = v + "px"));
          var m = x + (B.dirX === 1 ? 0 : c),
            w = y + (B.dirY === 1 ? 0 : g),
            E = x + (B.dirX === 1 ? c : 0),
            C = y + (B.dirY === 1 ? g : 0);
          if (D === "arrow") {
            var S = Rd(m, w, E, C, 8 * p);
            ((E = S.x), (C = S.y));
          }
          var T = "M " + m + " " + w + " L " + E + " " + C,
            k =
              D === "arrow"
                ? '<defs><marker id="dc-draw-head" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible"><path d="M0 0 L4 2 L0 4 Z" stroke="none" style="fill:' +
                  xt +
                  '"/></marker></defs>'
                : "";
          B.box.innerHTML =
            '<svg width="100%" height="100%" viewBox="0 0 ' +
            h +
            " " +
            v +
            '" style="display:block;overflow:visible">' +
            k +
            '<path d="' +
            T +
            '" fill="none" style="stroke:' +
            xt +
            '" stroke-width="' +
            4 * p +
            '" stroke-linecap="round" stroke-linejoin="round"' +
            (D === "arrow" ? ' marker-end="url(#dc-draw-head)"' : "") +
            "/></svg>";
        }
        return;
      }
      if (Mt) {
        var L = t.clientX - Mt.x,
          P = t.clientY - Mt.y;
        if (L * L + P * P > 16) {
          var N = document.createElement("div");
          (N.setAttribute("data-dc-editor-overlay", ""),
            (N.style.cssText =
              "position:fixed;z-index:2147483646;pointer-events:none;" +
              (D === "arrow" || D === "line"
                ? "border:none;background:transparent;"
                : "border:1.5px solid " +
                  xt +
                  ";background:color-mix(in srgb," +
                  xt +
                  " 10%,transparent);") +
              "border-radius:" +
              (D === "oval" ? "50%" : "0") +
              ";"),
            fe().appendChild(N),
            (B = {
              box: N,
              startX: Mt.x,
              startY: Mt.y,
              x: Mt.x,
              y: Mt.y,
              w: 0,
              h: 0,
              dirX: 1,
              dirY: 1,
              parentEl: Mt.parentEl,
              parentTid: Mt.parentTid,
              parentName: Mt.parentName,
              parentRect: Mt.parentRect,
            }),
            (Mt = null),
            We());
        }
        return;
      }
      if (ht) {
        du(t);
        return;
      }
      if (At) {
        var F = t.clientX - At.x,
          q = t.clientY - At.y;
        F * F + q * q > Gt(4) * Gt(4) && nc(t);
        return;
      }
      if (D !== "select" && D !== "interact" && !X) {
        oc(t);
        return;
      }
      if (D !== "interact") {
        if (f) {
          f.lastPt = { x: t.clientX, y: t.clientY, shift: t.shiftKey };
          var V =
              t.clientX < 0 ||
              t.clientY < 0 ||
              t.clientX > window.innerWidth ||
              t.clientY > window.innerHeight,
            j = !!sr;
          if (((sr = null), V && !f.followers && !f.group && !f.hostKey)) {
            (f.exited || uu(!!t.altKey),
              j && Y(),
              (!f.lastStream || Date.now() - f.lastStream > 30) &&
                ((f.lastStream = Date.now()),
                M({
                  type: "dragMove",
                  gestureKey: f.gestureKey,
                  x: t.clientX,
                  y: t.clientY,
                  alt: !!t.altKey,
                  ctrl: !!t.ctrlKey,
                })));
            return;
          }
          f.exited &&
            ((f.exited = !1),
            M({ type: "dragReturn", gestureKey: f.gestureKey }));
          var K = f.alt;
          f.alt = f.followers || f.group ? !1 : t.altKey;
          var J = f.canBreak && Wd(t);
          ((f.brk = J),
            J !== document.body.hasAttribute("data-dc-editor-brk") &&
              (J
                ? document.body.setAttribute("data-dc-editor-brk", "")
                : document.body.removeAttribute("data-dc-editor-brk")));
          var W = J && !!f.brkFollowers;
          (W && (f.alt = !1), f.alt && !K && gr(f), lf());
          var H = An();
          if (!H) {
            j && Y();
            return;
          }
          var Z = W ? Vl(f) : null,
            pt = [];
          if (Z)
            for (var st = 0; st < f.brkFollowers.length; st++)
              Z[f.brkFollowers[st].tid] && pt.push(Z[f.brkFollowers[st].tid]);
          var rt = f.group && !J ? zl() : null;
          if (rt && f.groupProxies && f.epoch > 0) {
            for (var vt = {}, mt = 0; mt < rt.length; mt++)
              vt[rt[mt].getAttribute("data-dc-drag-block")] = !0;
            for (var Pt = 0; Pt < f.groupProxies.length; Pt++)
              f.groupProxies[Pt].out = !vt[f.groupProxies[Pt].tid];
          }
          Ci(H, rt || pt);
          var G = f.followers
            ? { el: f.origParentStamped, tid: null }
            : Xl(t.clientX, t.clientY, f, H, rt);
          if (
            (f.group &&
              (V || (rt && rt.length && G.tid == null)) &&
              (G = { el: null, tid: null, invalid: !0 }),
            f.hostKey && V && (G = { el: null, tid: null, invalid: !0 }),
            G.invalid)
          ) {
            (gr(f),
              Yt(),
              Se(),
              Jl(t, !0),
              wt && (wt.box.style.display = "none"),
              (f.commit = null),
              Y());
            return;
          }
          var lt = G.el === f.origParentStamped;
          if (
            (G.tid == null ? Se() : Di(G.el.getBoundingClientRect(), ""),
            f.mode === "abs" && lt)
          ) {
            (gr(f),
              (f.previewParentEl = null),
              Yt(),
              En(f),
              wt && (wt.box.style.display = "none"));
            var nt = f.hostKey
                ? { x: t.clientX - f.startX, y: t.clientY - f.startY }
                : Pl(t, H, t.clientX - f.startX, t.clientY - f.startY, {
                    x: !f.bothX,
                    y: !f.bothY,
                  }),
              dt = (nt.x * f.am.x) / f.scl,
              oe = (nt.y * f.am.y) / f.scl,
              Ot = {};
            if (
              (f.bothX ||
                (f.useRight
                  ? (Ot.right = Math.round(f.startRight - dt) + "px")
                  : (Ot.left = Math.round(f.startLeft + dt) + "px")),
              f.bothY ||
                (f.useBottom
                  ? (Ot.bottom = Math.round(f.startBottom - oe) + "px")
                  : (Ot.top = Math.round(f.startTop + oe) + "px")),
              (f.absStyles = Ot),
              (f.commit = f.bothX && f.bothY ? null : { kind: "absSame" }),
              ee(f.name))
            ) {
              var Xt = z(String(f.tid), f.name);
              (Xt.indexOf(H) < 0 && (Xt = [H]),
                (f.lastPatch = Ot),
                ce(f.gestureKey, Xt, Ot));
            }
            if (
              (Or({
                type: "stylePreview",
                tid: f.tid,
                name: f.name,
                gestureKey: f.gestureKey,
                styles: Ot,
              }),
              f.followers)
            )
              for (var Jt = 0; Jt < f.followers.length; Jt++) {
                var Rt = f.followers[Jt],
                  le = {};
                (Rt.useRight
                  ? (le.right = Math.round(Rt.startRight - dt) + "px")
                  : (le.left = Math.round(Rt.startLeft + dt) + "px"),
                  Rt.useBottom
                    ? (le.bottom = Math.round(Rt.startBottom - oe) + "px")
                    : (le.top = Math.round(Rt.startTop + oe) + "px"),
                  (Rt.absStyles = le),
                  ee(f.name) &&
                    ((Rt.lastPatch = le),
                    ce(f.gestureKey + ":" + Rt.tid, ki(Rt, f.name), le)),
                  Or({
                    type: "stylePreview",
                    tid: Rt.tid,
                    name: f.name,
                    gestureKey: f.gestureKey,
                    styles: le,
                    follower: !0,
                  }));
              }
            Y();
            return;
          }
          if (f.mode === "abs" || G.tid == null || J) {
            if ((Yt(), En(f), !f.absParent || f.absParent.el !== G.el)) {
              var tn = G.tid != null ? getComputedStyle(G.el) : null;
              f.absParent = {
                el: G.el,
                display: tn ? tn.display : "",
                needsPositioning: !!tn && tn.position === "static",
              };
            }
            var en = G.el.getBoundingClientRect(),
              Nr = f.startRect,
              rn = t.clientX - f.grabDx - Nr.left,
              od = t.clientY - f.grabDy - Nr.top,
              Va =
                (f.alt && f.mode !== "abs") || f.hostKey
                  ? { x: rn, y: od }
                  : Pl(t, H, rn, od),
              ld = Nr.left + Va.x,
              ud = Nr.top + Va.y,
              sd = G.tid != null ? G.el.clientLeft - G.el.scrollLeft : 0,
              dd = G.tid != null ? G.el.clientTop - G.el.scrollTop : 0;
            if (
              ((f.absStyles = {
                left: Math.round((ld - en.left) / f.scl - sd) + "px",
                top: Math.round((ud - en.top) / f.scl - dd) + "px",
              }),
              J && (ll(f.absStyles, f, f.absParent.display), W))
            )
              for (var Fo = 0; Fo < f.brkFollowers.length; Fo++) {
                var Ne = f.brkFollowers[Fo],
                  Ga = Z[Ne.tid] || null;
                ((Ne.skip = !!Ga && Ga.contains(G.el)),
                  !Ne.skip &&
                    (Ne.freezeStyle === void 0 &&
                      (Ne.freezeStyle = Ga ? Si(Ga) : void 0),
                    (Ne.absStyles = {
                      left:
                        Math.round(
                          (Ne.startRect.left + Va.x - en.left) / f.scl - sd,
                        ) + "px",
                      top:
                        Math.round(
                          (Ne.startRect.top + Va.y - en.top) / f.scl - dd,
                        ) + "px",
                    }),
                    ll(Ne.absStyles, Ne, f.absParent.display)));
              }
            var fd = W
              ? f.brkFollowers
                  .filter(function (zn) {
                    return !zn.skip;
                  })
                  .map(function (zn) {
                    return {
                      tid: zn.tid,
                      absStyles: zn.absStyles,
                      freezeStyle: zn.freezeStyle || void 0,
                    };
                  })
              : void 0;
            if (
              ((f.commit = {
                kind: "abs",
                tid: G.tid,
                epoch: f.epoch,
                brk: J,
                followers: fd,
                needsPositioning: f.absParent.needsPositioning,
              }),
              f.alt || f.hostKey)
            ) {
              (gr(f), (f.previewParentEl = null));
              var cd = f.startRect,
                nn = Ri();
              ((nn.box.style.display = "block"),
                (nn.box.style.left = ld + "px"),
                (nn.box.style.top = ud + "px"),
                (nn.box.style.width = cd.width + "px"),
                (nn.box.style.height = cd.height + "px"),
                (nn.label.style.display = "none"),
                Y());
              return;
            }
            wt && (wt.box.style.display = "none");
            var pd = J ? "abs|brk" : "abs";
            if (
              !f.previewActive ||
              f.previewParentEl !== G.el ||
              f.previewKey !== pd
            )
              ((f.previewParentEl = G.el),
                (f.previewKey = pd),
                (f.previewActive = !0),
                (Ce = {}),
                M({
                  type: "movePreview",
                  tid: f.tid,
                  name: f.name,
                  gestureKey: f.gestureKey,
                  targetTid: G.tid,
                  position: G.tid == null ? "root-end" : "into",
                  epoch: f.epoch,
                  absolute: !0,
                  absStyles: f.absStyles,
                  parentNeedsPositioning: f.absParent.needsPositioning,
                  flatten: (!f.alt && !J && f.flatten) || void 0,
                  freezeStyle: f.freezeStyle || void 0,
                  followers: fd,
                  group: f.group || void 0,
                }));
            else if (
              (ee(f.name) &&
                ((f.lastPatch = f.absStyles),
                ce(f.gestureKey, [H], f.absStyles)),
              Or({
                type: "stylePreview",
                tid: f.tid,
                name: f.name,
                gestureKey: f.gestureKey,
                styles: f.absStyles,
              }),
              W)
            )
              for (var Oo = 0; Oo < f.brkFollowers.length; Oo++) {
                var an = f.brkFollowers[Oo],
                  vd = Z[an.tid];
                an.skip ||
                  !vd ||
                  (ee(f.name) &&
                    ce(f.gestureKey + ":" + an.tid, [vd], an.absStyles),
                  Or({
                    type: "stylePreview",
                    tid: an.tid,
                    name: f.name,
                    gestureKey: f.gestureKey,
                    styles: an.absStyles,
                    follower: !0,
                  }));
              }
            Y();
            return;
          }
          (wt && (wt.box.style.display = "none"),
            (f.previewParentEl = null),
            f.commit &&
              f.commit.kind === "abs" &&
              ((Ce = {}), (f.lastPatch = null)));
          var Ua =
              f.commit && f.commit.kind === "flow" && f.flowBox === G.el
                ? f.commit.slot
                : null,
            wp = !!(
              Ua &&
              f.slotPt &&
              Math.abs(t.clientX - f.slotPt.x) < Gt(4) &&
              Math.abs(t.clientY - f.slotPt.y) < Gt(4)
            ),
            Yn = Wl(G.el, G.tid, H, t.clientX, t.clientY, Ua, wp, rt);
          ((Yn.epoch = f.epoch),
            (!Ua || Yn.n !== Ua.n) &&
              (f.slotPt = { x: t.clientX, y: t.clientY }),
            (f.flowBox = G.el),
            Jl(t),
            Ei(G.el, H, Yn, rt),
            (f.commit = { kind: "flow", slot: Yn, clearPositioning: !1 }),
            f.alt || qf(Yn, !1),
            Y());
          return;
        }
        if (U) {
          var hd = t.clientX - U.x,
            gd = t.clientY - U.y;
          if (hd * hd + gd * gd > (ke ? Gt(8) * Gt(8) : Gt(4) * Gt(4))) {
            fs(t);
            return;
          }
        }
        if (D !== "select") {
          xe();
          return;
        }
        ol(t);
      }
    }
  }
  function Yc() {
    var t = getSelection(),
      e = t && t.anchorNode,
      r = e && (e.nodeType === 1 ? e : e.parentElement),
      n = r && r.closest ? r.closest("a") : null;
    return n && b && b.el.contains(n)
      ? (getComputedStyle(n).textDecorationLine || "").indexOf("underline") !==
          -1
      : document.queryCommandState("underline");
  }
  function zc() {
    var t = getSelection(),
      e = t && t.anchorNode,
      r = e && (e.nodeType === 1 ? e : e.parentElement),
      n = r && r.closest ? r.closest("a") : null;
    return !!(n && b && b.el.contains(n));
  }
  var qc = {
      bold: function () {
        document.execCommand("bold");
      },
      italic: function () {
        document.execCommand("italic");
      },
      underline: function () {
        try {
          var t = getSelection(),
            e = t && t.rangeCount > 0 ? t.getRangeAt(0) : null,
            r = [];
          if (e && b) {
            (b.el.tagName || "").toLowerCase() === "a" && r.push(b.el);
            for (var n = b.el.querySelectorAll("a"), a = 0; a < n.length; a++)
              e.intersectsNode(n[a]) && r.push(n[a]);
          }
          var i = e && e.commonAncestorContainer,
            o = i && (i.nodeType === 1 ? i : i.parentElement),
            l = o && o.closest && b ? o.closest("a") : null;
          l && !b.el.contains(l) && (l = null);
          var u = l
            ? (getComputedStyle(l).textDecorationLine || "").indexOf(
                "underline",
              ) === -1
            : !document.queryCommandState("underline");
          (document.execCommand("underline"),
            document.queryCommandState("underline") !== u &&
              document.execCommand("underline"));
          for (var s = 0; s < r.length; s++) {
            var d = r[s],
              p = (getComputedStyle(d).textDecorationLine || "")
                .split(/\s+/)
                .filter(function (g) {
                  return g && g !== "none";
                }),
              c = p.indexOf("underline") !== -1;
            (u && !c && p.push("underline"),
              !u && c && p.splice(p.indexOf("underline"), 1),
              (d.style.textDecorationLine = p.length ? p.join(" ") : "none"));
          }
        } catch {}
      },
      ul: function () {
        document.execCommand("insertUnorderedList");
      },
      ol: function () {
        document.execCommand("insertOrderedList");
      },
      link: function () {
        var t = "",
          e = !0,
          r = null;
        try {
          var n = getSelection(),
            a = n.anchorNode,
            i = a && (a.nodeType === 1 ? a : a.parentElement),
            o = i && i.closest ? i.closest("a") : null;
          if (o && b && o === b.el && !b.foreign) {
            bt = null;
            var l = o.getBoundingClientRect();
            M({
              type: "linkEdit",
              href: o.getAttribute("href") || "",
              collapsed: !1,
              rect: { x: l.left, y: l.top, w: l.width, h: l.height },
              hostTid: b.tid,
              hostName: b.name,
              isElementLink: !0,
            });
            return;
          }
          if (o && b && !b.foreign && !b.el.contains(o) && o.contains(b.el)) {
            var u = hr(o);
            if (!isNaN(u)) {
              bt = null;
              var s = o.getBoundingClientRect();
              M({
                type: "linkEdit",
                href: o.getAttribute("href") || "",
                collapsed: !1,
                rect: { x: s.left, y: s.top, w: s.width, h: s.height },
                hostTid: u,
                hostName: it(o),
                isElementLink: !0,
              });
              return;
            }
          }
          if (((t = (o && o.getAttribute("href")) || ""), n.rangeCount > 0)) {
            var d = n.getRangeAt(0);
            ((bt = d.cloneRange()),
              (e = d.collapsed),
              (r = d.getBoundingClientRect()));
          }
          ((!r || (!r.width && !r.height)) &&
            o &&
            (r = o.getBoundingClientRect()),
            (!r || (!r.width && !r.height)) &&
              b &&
              (r = Q(b.el).getBoundingClientRect()));
        } catch {}
        M({
          type: "linkEdit",
          href: t,
          collapsed: e,
          rect: r
            ? { x: r.left, y: r.top, w: r.width, h: r.height }
            : { x: 0, y: 0, w: 0, h: 0 },
        });
      },
    },
    $r = null;
  function ao() {
    var t = b && (b.mount || b.svg || b.el),
      e = t ? parseInt(t.getAttribute("data-dc-tpl"), 10) : NaN;
    return isNaN(e) ? (b ? b.tid : void 0) : e;
  }
  function ae(t) {
    if ((Nn(), $r && (clearTimeout($r), ($r = null)), !t || !b)) {
      M({ type: "textEditState", active: !1 });
      return;
    }
    if (b.scriptTarget || b.propTarget || b.importTarget || b.svg) {
      M({ type: "textEditState", active: !0, plain: !0, tid: ao() });
      return;
    }
    var e = { bold: !1, italic: !1, underline: !1, ul: !1, ol: !1, link: !1 };
    try {
      e.bold = !!document.queryCommandState("bold");
    } catch {}
    try {
      e.italic = !!document.queryCommandState("italic");
    } catch {}
    try {
      e.underline = !!Yc();
    } catch {}
    try {
      e.ul = !!document.queryCommandState("insertUnorderedList");
    } catch {}
    try {
      e.ol = !!document.queryCommandState("insertOrderedList");
    } catch {}
    try {
      e.link = !!zc();
    } catch {}
    M({ type: "textEditState", active: !0, formats: e, tid: ao() });
  }
  function Zr() {
    (b && b.svg && uo(),
      !(!b || $r) &&
        ($r = setTimeout(function () {
          (($r = null), b && ae(!0));
        }, 120)));
  }
  function Jr() {
    io() ||
      (b &&
        b.svg &&
        (b.svgText.parentNode !== b.svg &&
          ((b.svg.textContent = ""), b.svg.appendChild(b.svgText)),
        (b.svgText.nodeValue = b.el.textContent)),
      b && !b.svg && Ss(b.el),
      Zr());
  }
  function In(t) {
    try {
      if (!b) return;
      var e = (t.clipboardData && t.clipboardData.getData("text/plain")) || "",
        r = e.trim();
      if (b.svg || b.importTarget) {
        (t.preventDefault(),
          t.stopPropagation(),
          document.execCommand(
            "insertText",
            !1,
            e.replace(/[ \t]*[\r\n]+[ \t]*/g, " "),
          ));
        return;
      }
      if (b.scriptTarget || b.propTarget || !/^https?:\/\/\S+$/i.test(r))
        return;
      var n = getSelection();
      if (!n || n.rangeCount === 0 || n.isCollapsed) return;
      var a = n.getRangeAt(0);
      if (!b.el.contains(a.commonAncestorContainer)) return;
      (t.preventDefault(), t.stopPropagation());
      var i = document.createElement("a");
      i.setAttribute("href", r);
      try {
        a.surroundContents(i);
      } catch {
        var o = a.extractContents();
        (i.appendChild(o), a.insertNode(i));
      }
      n.removeAllRanges();
      var l = document.createRange();
      (l.setStartAfter(i), l.collapse(!0), n.addRange(l), Jr());
    } catch {}
  }
  function cs(t, e) {
    for (
      var r = (t.tagName || "").toLowerCase() === "svg" ? t : t.ownerSVGElement,
        n = r
          ? r.querySelectorAll(
              "text[data-dc-tpl], tspan[data-dc-tpl], textPath[data-dc-tpl]",
            )
          : [],
        a = null,
        i = 1,
        o = document.createRange(),
        l = 0;
      l < n.length;
      l++
    ) {
      var u = n[l];
      if (!(
        _(u) !== _(t) ||
        !Vt[It(parseInt(u.getAttribute("data-dc-tpl"), 10), it(u))]
      ))
        for (
          var s = (parseFloat(getComputedStyle(u).fontSize) || 16) * ps(u),
            d = u.getBoundingClientRect(),
            p = document.createTreeWalker(u, NodeFilter.SHOW_TEXT),
            c;
          (c = p.nextNode());
        )
          for (var g = 0; g < c.nodeValue.length; g++) {
            (o.setStart(c, g), o.setEnd(c, g + 1));
            var h = o.getBoundingClientRect(),
              v = h.left + h.width / 2,
              x = h.top + h.height / 2;
            if (!(
              !(h.width > 0) ||
              v < d.left - s ||
              v > d.right + s ||
              x < d.top - s ||
              x > d.bottom + s
            )) {
              var y = v - e.clientX,
                m = x - e.clientY,
                w = Math.sqrt(y * y + m * m) / s;
              w < i && ((i = w), (a = u));
            }
          }
    }
    return a;
  }
  function ps(t) {
    try {
      var e = t.getScreenCTM(),
        r = (e && Math.sqrt(e.a * e.a + e.b * e.b)) || 1;
      if (e && (e.b || e.c)) return r;
      var n = (t.closest && t.closest("text")) || t,
        a = n.getBBox(),
        i = n.getBoundingClientRect();
      return a.width > 0 && i.width > 0 ? i.width / a.width : r;
    } catch {
      return 1;
    }
  }
  function vs(t) {
    var e = (t.textContent || "").replace(/[ \t\r\n\f]+/g, " "),
      r = -1;
    try {
      r = t.getNumberOfChars();
    } catch {}
    if (e.length === r) return e;
    if (
      e.length > 1 &&
      e.charAt(0) === " " &&
      e.charAt(e.length - 1) === " " &&
      e.length - 1 === r
    ) {
      var n = t.closest && t.closest("text"),
        a = "";
      if (n && n !== t) {
        var i = document.createRange();
        (i.setStart(n, 0), i.setEndBefore(t), (a = i.toString()));
      }
      return /\S/.test(a) ? e.slice(0, -1) : e.slice(1);
    }
    return e.replace(/^ | $/g, "");
  }
  function io() {
    return !b || !b.svg || b.svg.isConnected ? !1 : ($t(!1), !0);
  }
  function hs(t, e, r) {
    var n = t.getScreenCTM();
    if (n && (n.b || n.c)) {
      var a = new DOMPoint(e, r).matrixTransform(n);
      return { x: a.x, y: a.y };
    }
    var i = (t.closest && t.closest("text")) || t,
      o = i.getBBox(),
      l = i.getBoundingClientRect(),
      u = o.width > 0 && l.width > 0 ? l.width / o.width : 1;
    return { x: l.left + (e - o.x) * u, y: l.top + (r - o.y) * u };
  }
  function gs(t) {
    var e = [],
      r = [],
      n = 0,
      a,
      i = -1,
      o = -1;
    try {
      n = t.getNumberOfChars();
    } catch {}
    for (a = 0; a < n; a++) {
      var l = null;
      try {
        if (t.getExtentOfChar(a).width > 0) {
          var u = t.getStartPositionOfChar(a),
            s = t.getEndPositionOfChar(a),
            d = hs(t, u.x, u.y),
            p = hs(t, s.x, s.y);
          ((l = {
            x: d.x,
            y: d.y,
            ex: p.x,
            ey: p.y,
            ang: Math.atan2(p.y - d.y, p.x - d.x),
            w: Math.sqrt((p.x - d.x) * (p.x - d.x) + (p.y - d.y) * (p.y - d.y)),
            drawn: !0,
          }),
            i < 0 && (i = a),
            (o = a));
        }
      } catch {}
      e.push(l);
    }
    if (i < 0) return r;
    var c = { x: e[o].ex, y: e[o].ey, ang: e[o].ang, w: 0, drawn: !0 };
    for (a = 0; a <= n; a++)
      if (a < n && e[a]) r.push(e[a]);
      else if (a > o)
        r.push(
          a === o + 1 ? c : { x: c.x, y: c.y, ang: c.ang, w: 0, drawn: !1 },
        );
      else {
        for (var g = a; !e[g];) g++;
        r.push({ x: e[g].x, y: e[g].y, ang: e[g].ang, w: 0, drawn: !1 });
      }
    return r;
  }
  function oo(t, e) {
    for (var r = gs(t), n = 0, a = 1 / 0, i = 0; i < r.length; i++)
      if (r[i].drawn) {
        var o =
          (r[i].x - e.clientX) * (r[i].x - e.clientX) +
          (r[i].y - e.clientY) * (r[i].y - e.clientY);
        o < a && ((a = o), (n = i));
      }
    return n;
  }
  function ms() {
    var t = b.el,
      e = getSelection(),
      r = (t.textContent || "").length;
    function n(a, i) {
      if (!a || !t.contains(a)) return r;
      if (a === t) {
        for (var o = 0, l = 0; l < i && l < t.childNodes.length; l++)
          o += (t.childNodes[l].textContent || "").length;
        return o;
      }
      for (
        var u = document.createTreeWalker(t, NodeFilter.SHOW_TEXT), s, d = 0;
        (s = u.nextNode());
      ) {
        if (s === a) return d + i;
        d += s.nodeValue.length;
      }
      return r;
    }
    return !e || !e.rangeCount || !t.contains(e.anchorNode)
      ? [r, r]
      : [n(e.anchorNode, e.anchorOffset), n(e.focusNode, e.focusOffset)];
  }
  function Ba(t, e) {
    var r = b.el,
      n = getSelection();
    function a(l) {
      var u = document.createTreeWalker(r, NodeFilter.SHOW_TEXT),
        s,
        d = null;
      for (l = Math.max(0, l); (s = u.nextNode());) {
        if (l <= s.nodeValue.length) return [s, l];
        ((l -= s.nodeValue.length), (d = s));
      }
      return d ? [d, d.nodeValue.length] : [r, 0];
    }
    var i = a(t),
      o = a(e);
    (r.focus(), n.setBaseAndExtent(i[0], i[1], o[0], o[1]), uo());
  }
  var Er = [],
    Ka = 0;
  function Vc() {
    for (var t = 0; t < Er.length; t++) Er[t].remove();
    ((Er = []), (Ka = 0));
  }
  function ys() {
    for (var t = Ka; t < Er.length; t++) Er[t].style.display = "none";
  }
  function lo(t, e, r, n) {
    var a = Er[Ka++];
    (a ||
      ((a = document.createElement("div")),
      a.setAttribute("data-dc-editor-overlay", ""),
      fe().appendChild(a),
      Er.push(a)),
      a.setAttribute("data-dc-editor-svg-mark", n ? "caret" : "sel"),
      (a.style.cssText =
        "position:fixed;left:0;top:0;pointer-events:none;z-index:2147483646;transform-origin:0 0;width:" +
        (n ? Gt(1.5) : e) +
        "px;height:" +
        r * 1.05 +
        "px;background:" +
        (n ? xt : "color-mix(in srgb," + xt + " 32%,transparent)") +
        ";transform:translate(" +
        t.x +
        "px," +
        t.y +
        "px) rotate(" +
        t.ang +
        "rad) translate(0," +
        -r * 0.88 +
        "px);"));
    var i = a.getAnimations ? a.getAnimations() : [];
    n &&
      !i.length &&
      a.animate &&
      a.animate(
        [
          { opacity: 1 },
          { opacity: 1, offset: 0.5 },
          { opacity: 0, offset: 0.5 },
          { opacity: 0 },
        ],
        { duration: 1e3, iterations: 1 / 0 },
      );
    for (var o = 0; o < i.length; o++)
      n ? (i[o].currentTime = 0) : i[o].cancel();
  }
  function uo() {
    if (((Ka = 0), !b || !b.svg || !b.svg.isConnected)) {
      ys();
      return;
    }
    var t = b.svg,
      e = gs(t),
      r = (parseFloat(getComputedStyle(t).fontSize) || 16) * ps(t),
      n = ms(),
      a = Math.min(n[0], n[1]),
      i = Math.max(n[0], n[1]),
      o = e.length - 1;
    if (o < 0) b.lastStop && lo(b.lastStop, 0, r, !0);
    else if (a === i || i > o + 1)
      ((b.lastStop = e[Math.min(a, o)]), lo(b.lastStop, 0, r, !0));
    else {
      for (var l = a; l < i && l < o; l++)
        e[l].w > 0 &&
          !(l > a && e[l].x === e[l - 1].x && e[l].y === e[l - 1].y) &&
          lo(e[l], e[l].w, r, !1);
      b.lastStop = e[Math.min(i, o)];
    }
    ys();
  }
  var Ve = null,
    Cr = null;
  function Gc(t) {
    if (t.button === 0) {
      if (t.detail >= 3) {
        ((Ve = null), Ba(0, (b.el.textContent || "").length));
        return;
      }
      var e = oo(b.svg, t),
        r = ms();
      ((Cr = { x: t.clientX, y: t.clientY, moved: !1 }),
        (Ve = t.shiftKey ? r[0] : e),
        Ba(Ve, e));
    }
  }
  function bs(t) {
    if (Ve == null || !b || !b.svg) {
      Ve = null;
      return;
    }
    if (!(t.buttons & 1)) {
      Ve = null;
      return;
    }
    (Cr &&
      Math.abs(t.clientX - Cr.x) + Math.abs(t.clientY - Cr.y) > 4 &&
      (Cr.moved = !0),
      Ba(Ve, oo(b.svg, t)));
  }
  function Uc(t) {
    if (!(Cr && Cr.moved)) {
      for (
        var e = b.el.textContent || "", r = oo(b.svg, t), n = r, a = r;
        n > 0 && /\S/.test(e.charAt(n - 1));
      )
        n--;
      for (; a < e.length && /\S/.test(e.charAt(a));) a++;
      Ba(n, a);
    }
  }
  function Ia() {
    if (!(!b || !b.svg || io())) {
      var t = b.svg.getBoundingClientRect(),
        e = b.el;
      (t.width > 0 &&
        ((e.style.left = t.left + "px"),
        (e.style.top = t.top + "px"),
        (e.style.width = t.width + "px"),
        (e.style.height = Math.max(t.height, 1) + "px")),
        uo());
    }
  }
  function $c(t) {
    var e = getComputedStyle(t),
      r = document.createElement("div");
    return (
      (b.svgPre = /^(pre|pre-wrap|break-spaces)$/.test(e.whiteSpace)),
      (b.startText = b.svgPre ? t.textContent : vs(t)),
      (b.svgWs = t.style.getPropertyValue("white-space")),
      t.style.setProperty("white-space", "pre"),
      t.setAttribute("data-dc-editor-svg-editing", ""),
      r.setAttribute("data-dc-editor-overlay", ""),
      r.setAttribute("data-dc-editor-svg-text", ""),
      r.setAttribute("role", "textbox"),
      r.setAttribute("aria-label", "Edit text"),
      (r.style.cssText =
        "position:fixed;left:0;top:0;z-index:2147483646;opacity:0;pointer-events:none;overflow:hidden;white-space:pre;outline:none;font-size:" +
        e.fontSize +
        ";"),
      (t.textContent = ""),
      (b.svgText = t.appendChild(document.createTextNode(b.startText))),
      (r.textContent = b.startText),
      fe().appendChild(r),
      r
    );
  }
  function so(t, e) {
    var r = /^[ \t\n\r\f]*$/,
      n = /[ \t\n\r\f]+$/;
    try {
      var a = getSelection();
      a.removeAllRanges();
      var i = document.createRange();
      if (e !== "end") {
        (i.selectNodeContents(t), a.addRange(i));
        return;
      }
      for (var o = t, l, u = !1; (l = o.lastChild);) {
        u = !1;
        try {
          u = /^pre|^break-spaces/.test(getComputedStyle(o).whiteSpace || "");
        } catch {}
        for (; !u && l.previousSibling && l.nodeType === 3 && r.test(l.data);)
          l = l.previousSibling;
        if (((o = l), l.nodeType !== 1 || l.nodeName.toUpperCase() === "A"))
          break;
      }
      (o.nodeType === 3
        ? i.setStart(o, u ? o.data.length : o.data.replace(n, "").length)
        : o !== t
          ? i.setStartAfter(o)
          : i.setStart(t, 0),
        i.collapse(!0),
        a.addRange(i));
    } catch {}
  }
  function xs(t) {
    var e = b.el,
      r = !1;
    try {
      var n = getSelection();
      r = n.rangeCount > 0 && e.contains(n.getRangeAt(0).startContainer);
    } catch {}
    try {
      e.focus();
    } catch {}
    (r || so(e, t), ae(!0), b.svg && Ia());
  }
  function Fn(t, e, r, n) {
    if (!Tt) {
      var a = se,
        i = parseInt(t.getAttribute("data-dc-tpl"), 10),
        o = it(t),
        l = !!Vt[It(i, o)],
        u = b ? $t(void 0, l) : null;
      if (l) {
        var s = Za[It(i, o)],
          d = null,
          p = null,
          c = !1,
          g = null;
        if (s != null) {
          var h = t.textContent || "",
            v = /^\s*\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}\s*$/.exec(s);
          if (
            v &&
            Object.prototype.hasOwnProperty.call(Ja, v[1]) &&
            Ja[v[1]] === h
          )
            (u &&
              u.propTarget &&
              u.propTarget.prop === v[1] &&
              u.propTarget.value === h &&
              u.text.length <= 16384 &&
              (h = u.text),
              (p = { prop: v[1], value: h }));
          else {
            for (var x = null, y = !1, m = 0; m < me.length; m++)
              if (me[m].value === h) {
                if (x) {
                  y = !0;
                  break;
                }
                x = me[m];
              }
            if (!x || y) c = !0;
            else {
              d = { start: x.start, end: x.end, quote: x.quote, value: h };
              var w = u && u.scriptTarget;
              w &&
                ((g = { start: w.start, end: w.end, text: u.text, from: h }),
                x.start === w.start &&
                  x.end === w.end &&
                  w.value === h &&
                  (g.from = h = u.text));
            }
          }
        }
        (xe(),
          (b = {
            el: t,
            tid: i,
            name: o,
            scriptTarget: d,
            propTarget: p,
            reopen: g,
          }));
        var E = Array.prototype.slice.call(t.childNodes),
          C = se !== a;
        b.origNodes = $f(t, E);
        var S, T;
        if (d || p) t.textContent = h;
        else if (c) t.innerHTML = s;
        else {
          var k = [];
          for (S = 0; S < E.length; S++) k.push(E[S].cloneNode(!0));
          for (t.innerHTML = "", S = 0; S < k.length; S++) {
            if (k[S].nodeType === 1) {
              k[S].removeAttribute("data-dc-tpl");
              var L = k[S].querySelectorAll("[data-dc-tpl]");
              for (T = 0; T < L.length; T++)
                L[T].removeAttribute("data-dc-tpl");
            }
            t.appendChild(k[S]);
          }
        }
        if (
          ((b.startHtml =
            d || p || c || C ? t.innerHTML : Zf(t, b.origNodes, E)),
          t instanceof SVGElement)
        ) {
          var P = $c(t);
          ((b.svg = t),
            (t = b.el = P),
            document.addEventListener("scroll", Ia, !0),
            document.addEventListener("mousemove", bs, !0));
        }
        (t.setAttribute("contenteditable", "true"),
          t.setAttribute("data-dc-editor-editing", ""),
          fo(t),
          t.addEventListener("input", Jr),
          t.addEventListener("paste", In),
          document.addEventListener("selectionchange", Zr),
          t.focus(),
          so(t, n),
          ae(!0),
          b.svg && Ia());
      }
    }
  }
  function Ep(t) {
    (b && $t(),
      xe(),
      (b = {
        el: t,
        foreign: !0,
        tag: t.tagName.toLowerCase(),
        startText: t.innerText || "",
        startHtml: t.innerHTML,
        origCE: t.getAttribute("contenteditable"),
      }),
      t.setAttribute("contenteditable", "true"),
      t.setAttribute("data-dc-editor-editing", ""),
      fo(t),
      t.addEventListener("input", Jr),
      t.addEventListener("paste", In),
      document.addEventListener("selectionchange", Zr),
      t.focus());
    try {
      var e = getSelection();
      e.removeAllRanges();
      var r = document.createRange();
      (r.selectNodeContents(t), e.addRange(r));
    } catch {}
    ae(!0);
  }
  var rr = !1,
    Fa = [
      "keydown",
      "keyup",
      "keypress",
      "mousedown",
      "mouseup",
      "pointerdown",
      "pointerup",
      "dblclick",
    ];
  function ws(t) {
    b && b.importTarget && b.el.contains(t.target) && t.stopPropagation();
  }
  function Zc(t) {
    var e = null;
    if (document.caretRangeFromPoint) {
      var r = document.caretRangeFromPoint(t.clientX, t.clientY);
      e = r ? r.startContainer : null;
    } else if (document.caretPositionFromPoint) {
      var n = document.caretPositionFromPoint(t.clientX, t.clientY);
      e = n ? n.offsetNode : null;
    }
    if (!e || e.nodeType !== 3 || (e.nodeValue || "").trim() === "")
      return null;
    var a = document.createRange();
    a.selectNodeContents(e);
    for (var i = a.getClientRects(), o = 0; o < i.length; o++)
      if (
        t.clientX >= i[o].left - 1 &&
        t.clientX <= i[o].right + 1 &&
        t.clientY >= i[o].top - 1 &&
        t.clientY <= i[o].bottom + 1
      )
        return e;
    return null;
  }
  function Jc(t, e, r) {
    var n = t.parentElement,
      a = document.createRange();
    a.selectNodeContents(t);
    var i = a.getClientRects();
    if (
      !i.length ||
      i[0].height / Lt(n) < 2 ||
      getComputedStyle(n).visibility !== "visible"
    )
      return !1;
    for (var o = n; o; o = o.parentElement) {
      var l = getComputedStyle(o),
        u = l.overflowX !== "visible" || l.overflowY !== "visible";
      if (
        parseFloat(l.opacity) === 0 ||
        (o !== e &&
          e.contains(o) &&
          u &&
          (o.offsetWidth < 2 || o.offsetHeight < 2))
      )
        return !1;
    }
    if (r) return !0;
    for (
      var s = document.elementsFromPoint(
          i[0].left + i[0].width / 2,
          i[0].top + i[0].height / 2,
        ),
        d = 0;
      d < s.length;
      d++
    )
      if (
        !s[d].closest(
          "[data-dc-editor-overlay],[data-dc-editor-overlay-root],[data-omelette-chrome],[data-omelette-injected]",
        )
      )
        return e.contains(s[d]);
    return !1;
  }
  function As(t) {
    b !== t ||
      t.el.isConnected ||
      ((t.lost = !0),
      (rr = document.hasFocus()),
      rr && ((A = []), (R = null), (ft = null), qt(), yt(), Ct()),
      $t());
  }
  function Qc(t, e, r) {
    b && $t();
    var n = it(t),
      a = Qa[It(e, n)];
    if (!a || z(e, _(t)).length !== 1) return !1;
    var i = Zc(r),
      o = Ed(t, a, i);
    if (!o || !Jc(o.node, t, o.node === i)) return !1;
    xe();
    var l = document.createElement("dc-edit-field");
    ((l.textContent = (o.node.nodeValue || "").replace(/[ \t\n\r\f]+/g, " ")),
      (l.style.cssText =
        "user-select:text!important;-webkit-user-select:text!important;"),
      (b = {
        el: l,
        tid: e,
        name: n,
        mount: t,
        importNode: o.node,
        importText: o.node.nodeValue,
        importTarget: { key: o.key, words: o.words },
        startText: l.textContent,
      }),
      o.node.parentNode.insertBefore(l, o.node.nextSibling),
      (o.node.nodeValue = ""));
    var u = b;
    ((u.watch = new MutationObserver(function () {
      b !== u ? u.watch.disconnect() : l.isConnected || As(u);
    })),
      u.watch.observe(document.documentElement, {
        childList: !0,
        subtree: !0,
      }));
    for (var s = 0; s < Fa.length; s++)
      document.addEventListener(Fa[s], ws, !0);
    return (
      l.setAttribute("contenteditable", "true"),
      l.setAttribute("data-dc-editor-editing", "import"),
      fo(l, !0),
      l.addEventListener("input", Jr),
      l.addEventListener("paste", In),
      document.addEventListener("selectionchange", Zr),
      l.focus(),
      so(l),
      ae(!0),
      !0
    );
  }
  function Es(t) {
    if (!b) return null;
    bt = null;
    var e = b;
    ((b = null),
      ae(!1),
      e.el.removeEventListener("input", Jr),
      e.el.removeEventListener("paste", In),
      document.removeEventListener("selectionchange", Zr),
      e.origCE != null
        ? e.el.setAttribute("contenteditable", e.origCE)
        : e.el.removeAttribute("contenteditable"),
      e.el.removeAttribute("data-dc-editor-editing"),
      co(e.el));
    var r = (e.importTarget && e.el.textContent) || "",
      n = !!e.importTarget && e.mount.isConnected && e.el.isConnected;
    if ((e.el.blur(), e.importTarget)) {
      for (var a = 0; a < Fa.length; a++)
        document.removeEventListener(Fa[a], ws, !0);
      if (
        (e.watch.disconnect(),
        e.el.parentNode && e.el.parentNode.removeChild(e.el),
        e.importNode.nodeValue === "" &&
          (e.importNode.nodeValue = e.importText),
        !n || !r.trim() || r === e.startText)
      )
        return null;
      var i = parseInt(e.mount.getAttribute("data-dc-tpl"), 10);
      return {
        tid: isNaN(i) ? e.tid : i,
        name: e.name,
        html: "",
        text: r,
        importTarget: e.importTarget,
      };
    }
    (e.svg &&
      (document.removeEventListener("scroll", Ia, !0),
      document.removeEventListener("mousemove", bs, !0),
      Vc(),
      (Ve = null),
      e.el.remove(),
      (e.el = e.svg),
      e.svg.removeAttribute("data-dc-editor-svg-editing"),
      e.svgWs
        ? e.svg.style.setProperty("white-space", e.svgWs)
        : e.svg.style.removeProperty("white-space"),
      e.svg.getAttribute("style") || e.svg.removeAttribute("style"),
      e.svgPre || (e.svg.textContent = vs(e.svg))),
      Ss(e.el));
    var o = e.el.innerHTML,
      l =
        e.scriptTarget || e.propTarget
          ? (function E(C, S) {
              for (var T = C.firstChild; T; T = T.nextSibling)
                if (T.nodeType === 3) S.push(T.nodeValue);
                else if (T.nodeType === 1) {
                  var k = T.tagName;
                  k === "BR"
                    ? S.push(
                        T.nextSibling || T.previousSibling
                          ? `
`
                          : "",
                      )
                    : (S.length &&
                        (k === "DIV" || k === "P") &&
                        S.push(`
`),
                      E(T, S));
                }
              return S;
            })(e.el, []).join("")
          : e.svg
            ? e.el.textContent
            : e.el.innerText;
    if (
      (e.svg &&
        (l === e.startText || !l.trim() || !e.svg.isConnected) &&
        (o = e.startHtml),
      e.foreign)
    )
      return o === e.startHtml
        ? null
        : { foreign: !0, tag: e.tag, before: e.startText, after: l };
    var u = e.reopen;
    if (u) {
      for (
        var s = function (E) {
            for (var C = 0; C < me.length; C++)
              if (me[C].start === E) return me[C];
            return null;
          },
          d = s(u.start),
          p = e.scriptTarget.start,
          c =
            !d || d.value !== u.text
              ? null
              : p === u.start
                ? d
                : p >= u.end
                  ? s(p + d.end - u.end)
                  : null,
          g = 0;
        c && g < me.length;
        g++
      )
        me[g] !== c && me[g].value === e.scriptTarget.value && (c = null);
      c &&
        c.value === u.from &&
        (e.scriptTarget = {
          start: c.start,
          end: c.end,
          quote: c.quote,
          value: c.value,
        });
    }
    var h =
      t !== !1 &&
      !e.scriptTarget &&
      !e.propTarget &&
      !!window.__dcContentKeyed &&
      Ho(o) !== Ho(e.startHtml);
    if (!h) {
      e.el.innerHTML = "";
      for (var v = 0; v < e.origNodes.length; v++)
        e.el.appendChild(e.origNodes[v]);
    }
    if (o === e.startHtml) return null;
    if (h) {
      De = { name: e.name, s: {} };
      for (
        var x = e.el;
        x && x.hasAttribute && x.hasAttribute("data-dc-tpl");
        x = x.parentElement
      )
        (x.scrollTop || x.scrollLeft) &&
          (De.s[x.getAttribute("data-dc-tpl")] = {
            t: x.scrollTop,
            l: x.scrollLeft,
          });
      (clearTimeout(ti),
        (ti = setTimeout(function () {
          De = null;
        }, 400)));
    }
    var y = parseInt(e.el.getAttribute("data-dc-tpl"), 10);
    if (h && window.__dcAnnotatedTemplate) {
      var m = isNaN(y) ? e.tid : y,
        w = null;
      try {
        w = Yo(window.__dcAnnotatedTemplate(e.name), m);
      } catch {}
      w !== null &&
        (se = {
          el: e.el,
          origNodes: e.origNodes,
          name: e.name,
          tid: m,
          content: w,
        });
    }
    return {
      tid: isNaN(y) ? e.tid : y,
      name: e.name,
      html: o,
      text: l,
      scriptTarget: e.scriptTarget || void 0,
      propTarget: e.propTarget || void 0,
    };
  }
  var Sr = [
    ["role", "textbox"],
    ["aria-label", "Edit text"],
    ["aria-multiline", "true"],
  ];
  function Cs(t, e) {
    return t && Sr[e][0] === "aria-multiline" ? "false" : Sr[e][1];
  }
  function fo(t, e) {
    if (!(
      t.hasAttribute("role") ||
      t.hasAttribute("aria-label") ||
      t.hasAttribute("aria-labelledby") ||
      t.hasAttribute("aria-multiline")
    )) {
      for (var r = 0; r < Sr.length; r++) t.setAttribute(Sr[r][0], Cs(e, r));
      t.setAttribute("data-dc-editor-named", e ? "one-line" : "");
    }
  }
  function co(t) {
    if (t.hasAttribute("data-dc-editor-named")) {
      for (
        var e = t.getAttribute("data-dc-editor-named") === "one-line", r = 0;
        r < Sr.length;
        r++
      )
        t.getAttribute(Sr[r][0]) === Cs(e, r) && t.removeAttribute(Sr[r][0]);
      t.removeAttribute("data-dc-editor-named");
    }
  }
  function Ss(t) {
    for (
      var e = t.querySelectorAll("[data-dc-editor-named]"), r = 0;
      r < e.length;
      r++
    )
      co(e[r]);
  }
  function $t(t, e) {
    if (b) {
      var r = b.lost === !0,
        n = Es(t);
      return (
        n && n.foreign
          ? M({
              type: "foreignTextEdit",
              tag: n.tag,
              before: n.before,
              after: n.after,
            })
          : M(
              n
                ? {
                    type: "textEdit",
                    tid: n.tid,
                    name: n.name,
                    html: n.html,
                    text: n.text,
                    scriptTarget: n.scriptTarget || void 0,
                    propTarget: n.propTarget || void 0,
                    importTarget: n.importTarget || void 0,
                    restarted: e || void 0,
                  }
                : {
                    type: "textEditEnd",
                    lost: r || void 0,
                    restarted: e || void 0,
                  },
            ),
        n
      );
    }
  }
  function On(t) {
    for (var e = 0; e < t.childNodes.length; e++) {
      var r = t.childNodes[e];
      if (
        (r.nodeType === 3 && (r.nodeValue || "").trim() !== "") ||
        (r.nodeType === 1 &&
          !r.hasAttribute("data-dc-tpl") &&
          /\bsc-interp\b/.test(r.className || ""))
      )
        return !0;
    }
    return !1;
  }
  function Ts(t, e) {
    var r = null;
    if (document.caretRangeFromPoint) {
      var n = document.caretRangeFromPoint(e.clientX, e.clientY);
      r = n ? n.startContainer : null;
    } else if (document.caretPositionFromPoint) {
      var a = document.caretPositionFromPoint(e.clientX, e.clientY);
      r = a ? a.offsetNode : null;
    }
    return (
      !!r &&
      r.nodeType === 3 &&
      r.parentNode === t &&
      (r.nodeValue || "").trim() !== ""
    );
  }
  function Ms(t) {
    for (var e = !1, r = 0; r < t.childNodes.length; r++) {
      var n = t.childNodes[r];
      if (n.nodeType === 3 && (n.nodeValue || "").trim() !== "") return !1;
      n.nodeType === 1 &&
        !n.hasAttribute("data-dc-tpl") &&
        /\bsc-interp\b/.test(n.className || "") &&
        (e = !0);
    }
    return e;
  }
  function jc(t, e) {
    return (
      !!t &&
      t.nodeType === 1 &&
      t !== document.body &&
      t !== document.documentElement &&
      !(e && t.contains(e)) &&
      !!(e || document.querySelector("[data-dc-tpl]")) &&
      !t.closest("[data-dc-tpl],[data-dc-editor-overlay],.sc-placeholder") &&
      !t.querySelector("[data-dc-tpl]") &&
      On(t)
    );
  }
  function tp(t, e, r, n) {
    var a = t.classList.contains("sc-host-x");
    if (!On(t)) {
      var i =
        !a &&
        e !== t &&
        e.closest("[data-dc-tpl]") === t &&
        On(e) &&
        !e.closest(".sc-placeholder") &&
        !/\bsc-interp\b/.test(e.className || "");
      return i
        ? { type: "textEditDenied", tid: -1, name: null, foreign: !0 }
        : null;
    }
    var o = _t();
    if (!a && o && !o.contains(t) && it(t) == null)
      return { type: "textEditDenied", tid: r, name: null, portaled: !0 };
    var l = "";
    try {
      l = getComputedStyle(t).display || "";
    } catch {
      l = "";
    }
    return {
      type: "textEditDenied",
      tid: r,
      name: it(t),
      x: n.clientX,
      y: n.clientY,
      items: /flex|grid/.test(l),
      bound: t.hasAttribute("data-sc-name") && Ms(t),
    };
  }
  function Oa(t) {
    if (((fn = null), !!I && !Lo(t) && D !== "interact" && !he(t))) {
      if (Tt) {
        (t.preventDefault(), t.stopPropagation());
        return;
      }
      if (!(b && (b.el === t.target || b.el.contains(t.target)))) {
        if (b && Jn && t.target.contains && t.target.contains(b.el)) {
          (t.preventDefault(), t.stopPropagation());
          return;
        }
        if (ko(t)) {
          (t.preventDefault(), t.stopPropagation(), Uc(t));
          return;
        }
        if (t.type === "dblclick" && (t.detail || 0) > 2) {
          (t.preventDefault(), t.stopPropagation());
          return;
        }
        var e = pr(t);
        if (!e) {
          var r = _t(),
            n = t.target,
            a =
              r &&
              n &&
              (n === r
                ? Ts(r, t)
                : n.parentElement === r &&
                  /\bsc-interp\b/.test(n.className || ""));
          a
            ? (t.preventDefault(),
              t.stopPropagation(),
              M({
                type: "textEditDenied",
                tid: -1,
                name: r.getAttribute("data-sc-name"),
                rootText: !0,
                bound: Ms(r),
              }))
            : jc(n, r) &&
              (t.preventDefault(),
              t.stopPropagation(),
              M({ type: "textEditDenied", tid: -1, name: null, foreign: !0 }));
          return;
        }
        var i = parseInt(e.getAttribute("data-dc-tpl"), 10),
          o = D === "select" ? vn(hn(e)) : [],
          l = hl(o) || $d(o);
        if (l) {
          (t.preventDefault(),
            t.stopPropagation(),
            Wt || ((Wt = !0), Y()),
            (br = null),
            (A.length !== 1 ||
              A[0] !== parseInt(l.getAttribute("data-dc-tpl"), 10) ||
              R !== _(l)) &&
              Ke(l, !1),
            M({ type: "penDblClick", tid: A[0], d: Lu(l) }));
          return;
        }
        var u = dr(e),
          s = ea(hn(e), "plain", A, R),
          d = s ? parseInt(s.getAttribute("data-dc-tpl"), 10) : NaN,
          p = s != null && R === _(s) && A.indexOf(d) >= 0;
        if (s && !p) {
          (t.preventDefault(),
            t.stopPropagation(),
            qt(),
            (A = [d]),
            (ft = null),
            (R = _(s)),
            yt(),
            Ct(Fe(s)));
          return;
        }
        var c = s ? ea(hn(e), "deeper", A, R) : null;
        if (s && c && c !== s && !Vt[It(d, it(s))]) {
          (t.preventDefault(),
            t.stopPropagation(),
            qt(),
            (A = [parseInt(c.getAttribute("data-dc-tpl"), 10)]),
            (ft = null),
            (R = _(c)),
            yt(),
            Ct(Fe(c)));
          return;
        }
        if ((s && s !== u && s !== e && ((e = s), (i = d), (u = s)), u !== e)) {
          ((ln = u),
            t.preventDefault(),
            t.stopPropagation(),
            (A = [i]),
            (ft = null),
            (R = _(e)),
            yt(),
            Ct(e.tagName.toLowerCase()));
          return;
        }
        if (!Vt[It(i, it(e))] && e instanceof SVGElement && !On(e)) {
          var g = cs(e, t);
          g && ((e = g), (i = parseInt(e.getAttribute("data-dc-tpl"), 10)));
        }
        if (!Vt[It(i, it(e))]) {
          if (
            (t.preventDefault(),
            t.stopPropagation(),
            /^(img|video)$/i.test(e.tagName) &&
              A.length === 1 &&
              A[0] === i &&
              ee(R))
          ) {
            M({ type: "cropRequest", tid: i });
            return;
          }
          var h = t.target !== e && Ts(t.target, t);
          if (
            e.classList.contains("sc-host-x") &&
            (h || !e.querySelector("[data-dc-tpl]")) &&
            !Xe(e) &&
            !Tf(e)
          ) {
            if (Qc(e, i, t)) return;
            M({ type: "textEditDenied", tid: i, name: it(e), imported: !0 });
            return;
          }
          var v = tp(e, t.target, i, t);
          v && M(v);
          return;
        }
        (t.preventDefault(), t.stopPropagation(), Fn(e, t.clientX, t.clientY));
      }
    }
  }
  var po =
    'a[href], area[href], button, input, select, textarea, summary, label, video[controls], audio[controls], [role="button"], [onclick], [ondblclick], [contenteditable]:not([contenteditable="false" i]), image-slot';
  function vo(t) {
    !t.isTrusted ||
      I ||
      Mr(t, po) ||
      (Re && td(t),
      M({
        type: "previewClick",
        shift: !!t.shiftKey,
        meta: !!(t.metaKey || t.ctrlKey),
      }));
  }
  function ho(t) {
    if (!(!t.isTrusted || I || Tt || t.timeStamp < Pr || kr) && !Mr(t, po)) {
      var e = pr(t);
      if (e) {
        jt = e;
        var r = ++Wo;
        setTimeout(function () {
          Wo === r && (jt = null);
        }, 2e3);
      }
    }
  }
  function Ps() {
    if ((Tt && (jt = null), !(!jt || !I))) {
      var t = jt;
      if (!t.isConnected || t.getAttribute("data-dc-tpl") == null) {
        jt = null;
        return;
      }
      var e = dr(t),
        r = parseInt(e.getAttribute("data-dc-tpl"), 10),
        n = _(e);
      ((A.length !== 1 || A[0] !== r || R !== n) &&
        (qt(),
        (A = [r]),
        (ft = null),
        (R = n),
        yt(),
        Ct(
          e.hasAttribute("data-sc-name")
            ? "dc-import"
            : e.tagName.toLowerCase(),
        )),
        un && ((jt = null), Vt[It(r, it(e))] && Fn(e)));
    }
  }
  var ie = null,
    Qr = null,
    Xn = null,
    Xa = 0;
  function Tr() {
    (ie && (ie.obs.disconnect(), clearTimeout(ie.timer)), (ie = null));
  }
  function ep(t, e, r, n) {
    Tr();
    var a = Qr && Date.now() - Qr.at < 5e3 ? Qr : { n: ba(), seen: null },
      i = (ie = {
        tid: t,
        name: e || null,
        typed: typeof r == "string" ? r : "",
        until: typeof n == "number" ? n : Date.now() + 2e3,
        base: a.n,
        seen: a.seen,
        mapped: !1,
        obs: new MutationObserver(go),
        timer: 0,
      });
    ((Qr = null),
      (Xn = null),
      i.obs.observe(document.body, { childList: !0, subtree: !0 }),
      (i.timer = setTimeout(go, Math.max(0, i.until - Date.now()) + 1)));
  }
  function go() {
    var t = ie;
    if (t) {
      if (Tt || !I || b || Date.now() > t.until) {
        Tr();
        return;
      }
      var e = ba();
      if ((e < t.base && (t.base = e), !(!t.mapped || e <= t.base))) {
        var r = z(String(t.tid), t.name)[0];
        !r ||
          (t.seen && t.seen.has(r)) ||
          !Vt[It(t.tid, it(r))] ||
          (Tr(),
          Fn(r),
          (Xn = b ? b.el : null),
          (Xa = 0),
          Xn && t.typed && ks(t.typed));
      }
    }
  }
  function rp(t) {
    for (
      var e = document.createTreeWalker(b.el, NodeFilter.SHOW_TEXT),
        r,
        n = null;
      (r = e.nextNode());
    ) {
      if (((n = r), t <= r.data.length)) return [r, t];
      t -= r.data.length;
    }
    return n ? [n, n.data.length] : [b.el, 0];
  }
  function ks(t) {
    var e = document.getSelection(),
      r = e && e.rangeCount ? e.getRangeAt(0) : null,
      n = null,
      a;
    r &&
      r.collapsed &&
      b.el.contains(r.startContainer) &&
      ((a = rp(Xa)),
      (r.startContainer !== a[0] || r.startOffset !== a[1]) &&
        (n = r.cloneRange()),
      e.collapse(a[0], a[1]));
    var i = t !== "" ? t.length : Xa > 0 ? -1 : 0;
    (t !== ""
      ? document.execCommand("insertText", !1, t)
      : i && document.execCommand("delete", !1),
      n && (e.removeAllRanges(), e.addRange(n)),
      (Xa += i));
  }
  function np(t) {
    if (!(typeof t != "string" || t.length > 1)) {
      var e = ie;
      e
        ? (e.typed = t ? e.typed + t : e.typed.slice(0, -1))
        : b && b.el === Xn
          ? ks(t)
          : (Xn = null);
    }
  }
  function Ns(t) {
    if (
      !(!I || (A.length === 0 && !ct)) &&
      !(b || f || ht || O || gt || ot || B || kt)
    ) {
      var e = t.detail || {};
      if (
        !(e.reason === "init" || e.index === e.previousIndex) &&
        !(!e.slide || typeof e.slide.contains != "function")
      ) {
        var r = t.target;
        if (!(!r || !r.contains)) {
          for (
            var n = ct && ct.isConnected ? [ct] : [], a = 0;
            a < A.length + (n.length ? 1 : 0);
            a++
          )
            for (
              var i = a < A.length ? mn(A[a], R) : n, o = 0;
              o < i.length;
              o++
            )
              if (i[o] === r || !r.contains(i[o]) || e.slide.contains(i[o]))
                return;
          ((A = []), (R = null), (ft = null), qt(), yt(), Ct("slidechange"));
        }
      }
    }
  }
  var Ls = 'input[type="file" i], [ondrop], [ondragover], image-slot';
  function _a(t) {
    if (I || !t.isTrusted) return !1;
    var e = t.dataTransfer;
    return !(
      !e ||
      !e.types ||
      Array.prototype.indexOf.call(e.types, "Files") === -1 ||
      !document.querySelector("[data-dc-tpl]")
    );
  }
  function ap(t) {
    var e = t.items;
    if (!e || e.length === 0) return null;
    for (var r = !1, n = 0; n < e.length; n++)
      if (e[n].kind === "file" && ((r = !0), Na(e[n].type))) return !0;
    return r ? !1 : null;
  }
  var mo = !1,
    yo = 0;
  function Zt() {
    (yo++, mo && ((mo = !1), Se()));
  }
  function bo() {
    var t = ++yo;
    setTimeout(function () {
      yo === t && ((Pe = !1), (Me = 0), Zt());
    }, 900);
  }
  function Rs(t) {
    (Di(t, ""), (mo = !0), bo());
  }
  function ip(t) {
    Rs(Q(t).getBoundingClientRect());
  }
  var Me = 0,
    Pe = !1;
  function xo(t) {
    t.isTrusted &&
      ((Pe = !0),
      setTimeout(function () {
        t.defaultPrevented && (Pe = !1);
      }, 0),
      bo());
  }
  function wo(t) {
    _a(t) && Me++;
  }
  function Ao(t) {
    _a(t) && ((Me = Math.max(0, Me - 1)), Me === 0 && Zt());
  }
  function Eo(t) {
    t.isTrusted && ((Pe = !1), (Me = 0), Zt());
  }
  function nr(t) {
    for (var e = t; e && !(e.parentElement && we(e.parentElement));)
      e = e.parentElement;
    return e;
  }
  function Wa(t) {
    for (var e = [], r = t.firstElementChild; r; r = r.nextElementSibling) {
      var n = (r.tagName || "").toUpperCase();
      n === "TEMPLATE" || n === "SCRIPT" || n === "STYLE" || e.push(r);
    }
    return e;
  }
  function Ds(t) {
    var e = nr(t);
    if (!e) return null;
    var r = e.parentElement,
      n = document.querySelectorAll("deck-stage"),
      a = Array.prototype.indexOf.call(n, r);
    if (a === -1) return null;
    var i = Wa(r),
      o = i.indexOf(e);
    return o === -1
      ? null
      : {
          deck: a,
          index: o,
          count: i.length,
          label: e.getAttribute("data-label"),
        };
  }
  function op(t) {
    if (!t) return null;
    var e = document.querySelectorAll("deck-stage"),
      r = e[t.deck];
    if (!r) return null;
    var n = Wa(r);
    if (t.label != null) {
      var a = n.filter(function (i) {
        return i.getAttribute("data-label") === t.label;
      });
      if (a.length === 1) return a[0];
    }
    return n[t.index] || null;
  }
  function Bs(t) {
    if (!(!t || t.hasAttribute("data-deck-active"))) {
      var e = t.parentElement;
      if (!(!e || typeof e.goTo != "function")) {
        var r = parseInt(t.getAttribute("data-deck-slide"), 10),
          n = isNaN(r) ? Wa(e).indexOf(t) : r;
        n >= 0 && e.goTo(n);
      }
    }
  }
  function Ks(t, e) {
    var r = document.elementFromPoint(t, e);
    if (
      ((r = r && r.closest ? r.closest("[data-dc-tpl]") : null),
      r && (r = dr(r)),
      !r)
    )
      return null;
    var n = we(r) || Xe(r) || Ze(r),
      a = r.getBoundingClientRect(),
      i = a.height > 0 ? (e - a.top) / a.height : 0.5,
      o = i < 0.3 ? "before" : i > 0.7 ? "after" : "into";
    for (
      o !== "into" && r.parentElement && we(r.parentElement) && (o = "into");
      r && (we(r) || Xe(r) || Ze(r) || (o === "into" && !Dl(r)));
    )
      ((n = n || we(r) || Xe(r) || Ze(r)),
        (o = "into"),
        (r =
          r.parentElement && r.parentElement.closest
            ? r.parentElement.closest("[data-dc-tpl]")
            : null));
    return r ? { el: r, position: o } : n ? { refuse: !0 } : null;
  }
  function lp(t, e) {
    var r = document.elementFromPoint(t, e);
    r = r && r.closest ? r.closest("[data-dc-tpl]") : null;
    var n = Ks(t, e);
    if (!n || n.refuse) return n;
    var a = bd(n.el, n.position, t, e),
      i = nr(r),
      o = !1;
    if (
      (i &&
        i.getAttribute("data-dc-tpl") != null &&
        (o = a.slotless === !0 || xd(r, i)),
      o)
    ) {
      var l = i.getBoundingClientRect(),
        u = Lt(i) || 1;
      return {
        el: i,
        position: "into",
        point: {
          x: (t - l.left) / u,
          y: (e - l.top) / u,
          needsPositioning: getComputedStyle(i).position === "static",
        },
      };
    }
    return { el: a.el, position: a.position, point: null };
  }
  function up(t, e) {
    for (
      var r = [], n = document.querySelectorAll("deck-stage"), a = 0;
      a < n.length;
      a++
    )
      for (var i = n[a].firstElementChild; i; i = i.nextElementSibling)
        !i.hasAttribute ||
          !i.hasAttribute("data-deck-active") ||
          (i.getAttribute("data-dc-tpl") != null &&
            r.push(i.getBoundingClientRect()));
    return wd(t, e, r);
  }
  function _n(t, e) {
    for (
      var r = document.querySelectorAll("deck-stage"), n = 0;
      n < r.length;
      n++
    ) {
      var a = r[n].shadowRoot,
        i = a ? a.querySelector(".rail") : null;
      if (!(!i || i.inert)) {
        var o = i.getBoundingClientRect();
        if (!(t < o.left || t > o.right || e < o.top || e > o.bottom)) {
          for (var l = Wa(r[n]), u = 0; u < i.children.length; u++) {
            var s = i.children[u].getBoundingClientRect();
            if (!(t < s.left || t > s.right || e < s.top || e > s.bottom)) {
              var d = l[u];
              if (!d || d.getAttribute("data-dc-tpl") == null) return null;
              var p = i.children[u].querySelector(".frame");
              return {
                slide: d,
                frameRect: (p || i.children[u]).getBoundingClientRect(),
              };
            }
          }
          return null;
        }
      }
    }
    return null;
  }
  function sp(t, e, r, n) {
    var a = t.getAttribute("style");
    ((t.style.visibility = "visible"),
      (t.style.pointerEvents = "auto"),
      (t.style.zIndex = "2147483647"));
    var i;
    try {
      i = e(r, n);
    } finally {
      a == null ? t.removeAttribute("style") : t.setAttribute("style", a);
    }
    if (i && !i.refuse && nr(i.el) === t) return i;
    var o = t.getBoundingClientRect(),
      l = Lt(t) || 1;
    return {
      el: t,
      position: "into",
      point: {
        x: (r - o.left) / l,
        y: (n - o.top) / l,
        needsPositioning: getComputedStyle(t).position === "static",
      },
    };
  }
  function Is(t, e, r) {
    var n = t(e, r);
    if (n && !n.refuse && nr(n.el)) return n;
    var a = _n(e, r);
    if (a) {
      var i = qo(e, r, a.frameRect, a.slide.getBoundingClientRect()),
        o = i ? sp(a.slide, t, i.x, i.y) : null;
      return o && !o.refuse && nr(o.el) ? o : n;
    }
    var l = up(e, r);
    if (l) {
      var u = t(l.x, l.y);
      if (u && !u.refuse && nr(u.el)) return u;
    }
    return n;
  }
  function Fs(t, e) {
    return Is(lp, t, e);
  }
  function Co(t) {
    if (_a(t)) {
      if (Mr(t, Ls)) {
        Zt();
        return;
      }
      if ((t.preventDefault(), Pe)) {
        (Zt(), bo());
        return;
      }
      var e = _n(t.clientX, t.clientY);
      if (he(t) && !e) {
        ((t.dataTransfer.dropEffect = "none"), Zt());
        return;
      }
      t.dataTransfer.dropEffect = "copy";
      var r = ap(t.dataTransfer);
      if (r !== !0) {
        Zt();
        return;
      }
      if (e) {
        qo(t.clientX, t.clientY, e.frameRect, e.slide.getBoundingClientRect())
          ? Rs(e.frameRect)
          : Zt();
        return;
      }
      var n = Is(Ks, t.clientX, t.clientY);
      n && !n.refuse ? ip(n.el) : Zt();
    }
  }
  function So(t) {
    if (_a(t)) {
      var e = Pe;
      if (((Pe = !1), (Me = 0), Zt(), !Mr(t, Ls))) {
        var r = t.dataTransfer;
        if (
          !(!r.files || r.files.length === 0) &&
          (t.preventDefault(), !e && !(he(t) && !_n(t.clientX, t.clientY)))
        ) {
          for (var n = [], a = 0; a < r.files.length; a++)
            Na(r.files[a].type, r.files[a].name) && n.push(r.files[a]);
          if (n.length !== 0) {
            var i = Fs(t.clientX, t.clientY);
            if (!(i && i.refuse)) {
              ye = {
                files: n,
                el: i ? i.el : null,
                position: i ? i.position : "root-end",
                point: i ? i.point : null,
                at: Qu(t),
                slide: i ? Ds(i.el) : null,
              };
              var o = ++ja;
              setTimeout(function () {
                ja === o && (ye = null);
              }, 8e3);
              for (var l = !0, u = 0; u < n.length; u++)
                (n[u].type || "").indexOf("image/") === 0 && (l = !1);
              M({ type: "__dc_preview_drop_notice", video: l });
            }
          }
        }
      }
    }
  }
  function Os() {
    if (!(!ye || !I)) {
      if (!un) {
        ja++;
        return;
      }
      var t = ye;
      ye = null;
      var e = t.el,
        r = t.position;
      if (
        (e &&
          (!e.isConnected || e.getAttribute("data-dc-tpl") == null) &&
          (e = null),
        e && !t.point && (e = dr(e)),
        !e && t.slide)
      ) {
        var n = op(t.slide);
        n && n.getAttribute("data-dc-tpl") != null && ((e = n), (r = "into"));
      }
      (M({
        type: "fileDrop",
        files: t.files,
        name: e ? _(e) : null,
        targetTid: e ? parseInt(e.getAttribute("data-dc-tpl"), 10) : null,
        position: e ? r : "root-end",
        slide: t.slide || null,
        point: (e && t.point) || null,
        at: t.at,
      }),
        Bs(e ? nr(e) : null));
    }
  }
  function Xs(t) {
    (t.key === "Alt" && sn(!1),
      t.key === (ge ? "Meta" : "Control") &&
        (Zn(!1), I && M({ type: "modifierKey", key: "deep", on: !1 })),
      (t.key === "Control" || t.key === "Alt") &&
        Mo(t.altKey, t.ctrlKey, t.metaKey));
  }
  function To(t, e, r) {
    return {
      type: "mousemove",
      clientX: Number(t) || 0,
      clientY: Number(e) || 0,
      buttons: 1,
      button: 0,
      altKey: !!(r && r.alt),
      ctrlKey: !!(r && r.ctrl),
      metaKey: !!(r && r.meta),
      shiftKey: !!(r && r.shift),
      target: null,
      isTrusted: !1,
      pointerType: "mouse",
      preventDefault: function () {},
      stopPropagation: function () {},
      stopImmediatePropagation: function () {},
    };
  }
  function ar() {
    X &&
      (X.watchdog && clearTimeout(X.watchdog),
      (X.watchdog = setTimeout(function () {
        ve(!1);
      }, 6e4)));
  }
  function Ha(t) {
    X && t.isTrusted && ve(!1);
  }
  var Ya = [
    "animationstart",
    "animationiteration",
    "animationend",
    "animationcancel",
  ];
  function _s(t) {
    X && t.stopImmediatePropagation();
  }
  function Ws(t) {
    ((X = { key: t, plan: null, watchdog: null, placeholder: null }),
      document.body.setAttribute("data-dc-editor-move", ""),
      window.addEventListener("mousedown", Ha, !0),
      window.addEventListener("pointerdown", Ha, !0));
    for (var e = 0; e < Ya.length; e++) window.addEventListener(Ya[e], _s, !0);
  }
  function ve(t) {
    if (!X) return null;
    var e = X;
    (e.watchdog && clearTimeout(e.watchdog), Je());
    try {
      (f && f.hostKey === e.key ? re(t) : (Yt(), Se()),
        (!t || !e.plan) && (Cn(), Y()));
    } finally {
      ((X = null),
        document.body.removeAttribute("data-dc-editor-move"),
        window.removeEventListener("mousedown", Ha, !0),
        window.removeEventListener("pointerdown", Ha, !0));
      for (var r = 0; r < Ya.length; r++)
        window.removeEventListener(Ya[r], _s, !0);
      U = null;
    }
    return e.plan || null;
  }
  function dp() {
    !f ||
      !f.hostKey ||
      f.hostParked ||
      ((f.hostParked = !0),
      (Ce = {}),
      gr(f),
      Yt(),
      Se(),
      En(f),
      f.altClone && (f.altClone.style.display = "none"),
      Cn(),
      Y());
  }
  function fp() {
    !f ||
      !f.hostKey ||
      !f.hostParked ||
      ((f.hostParked = !1), f.altClone && (f.altClone.style.display = ""));
  }
  function Mo(t, e, r) {
    if (!(!f || f.exited || f.hostParked || !f.lastPt)) {
      var n = f.lastPt;
      Kn({
        clientX: n.x,
        clientY: n.y,
        buttons: 1,
        altKey: !!t,
        ctrlKey: !!e,
        metaKey: !!r,
        shiftKey: n.shift,
        target: null,
      });
    }
  }
  function Hs() {
    ((rr = !1),
      sn(!1),
      Zn(!1),
      I && M({ type: "modifierKey", key: "deep", on: !1, blur: !0 }),
      (ke = null),
      b && Date.now() - zs > 500 && M({ type: "textEditBlur" }));
  }
  function Ys(t) {
    if (I) {
      if (
        (t.key === "Alt" && sn(!0),
        t.key === (ge ? "Meta" : "Control") &&
          (Zn(!0), t.repeat || M({ type: "modifierKey", key: "deep", on: !0 })),
        (t.key === "Control" || t.key === "Alt") &&
          !t.repeat &&
          Mo(t.altKey, t.ctrlKey, t.metaKey),
        b && b.importTarget && !b.el.isConnected && As(b),
        rr)
      ) {
        (t.preventDefault(),
          t.stopPropagation(),
          (t.key === "Escape" || t.key === "Enter") && (rr = !1));
        return;
      }
      if (D !== "interact") {
        if (
          (!Tt &&
            (t.key === "d" || t.key === "D") &&
            !t.shiftKey &&
            !t.altKey &&
            (ge ? t.metaKey && !t.ctrlKey : t.ctrlKey) &&
            t.preventDefault(),
          t.key === "Escape" && f)
        ) {
          (t.preventDefault(), t.stopPropagation(), (Dt = !0), re(!1));
          return;
        }
        if (t.key === "Escape" && ht) {
          (t.preventDefault(), t.stopPropagation(), (Dt = !0), Xr(!0));
          return;
        }
        if (t.key === "Escape" && (B || O || gt || ot)) {
          (t.preventDefault(),
            t.stopPropagation(),
            Mn(!1),
            je(!1),
            yr(!1),
            Yr(!1));
          return;
        }
        if (t.key === "Escape" && kt) {
          (t.preventDefault(), t.stopPropagation(), Ea(!0, !0));
          return;
        }
        if (t.key === "Escape" && ft === "text" && !b && A.length === 1) {
          (t.preventDefault(), t.stopPropagation(), (ft = null), yt());
          var e = z(A[0], R);
          Ct(e.length ? Fe(e[0]) : void 0, void 0, !0);
          return;
        }
        if (
          (t.metaKey || t.ctrlKey) &&
          !t.altKey &&
          !t.shiftKey &&
          (t.key === "\\" || t.code === "Backslash")
        ) {
          (t.preventDefault(), t.stopPropagation());
          var r =
              (typeof t.composedPath == "function" && t.composedPath()[0]) ||
              t.target,
            n =
              !!b ||
              !!(
                r &&
                (r.tagName === "INPUT" ||
                  r.tagName === "TEXTAREA" ||
                  r.tagName === "SELECT" ||
                  r.isContentEditable)
              );
          t.repeat || M({ type: "clipboardKey", key: "\\", typing: n });
          return;
        }
        if (t.key === "F6" && !t.altKey) {
          (t.preventDefault(),
            t.stopPropagation(),
            t.repeat ||
              M({ type: "clipboardKey", key: "F6", shift: t.shiftKey }));
          return;
        }
        if (
          (t.metaKey || t.ctrlKey) &&
          !t.altKey &&
          (t.key === "0" || t.key === "=" || t.key === "+" || t.key === "-") &&
          !b
        ) {
          var a = t.target;
          if (
            a &&
            (a.tagName === "INPUT" ||
              a.tagName === "TEXTAREA" ||
              a.tagName === "SELECT" ||
              a.isContentEditable)
          )
            return;
          (t.preventDefault(),
            t.stopPropagation(),
            M({
              type: "clipboardKey",
              key: t.key === "0" ? "0" : t.key === "-" ? "-" : "+",
            }));
          return;
        }
        if (
          (t.key === "c" || t.key === "C") &&
          yd &&
          !t.metaKey &&
          !t.ctrlKey &&
          !t.altKey &&
          !t.shiftKey &&
          !t.isComposing &&
          !t.defaultPrevented &&
          !b &&
          !f &&
          !ht &&
          !At &&
          !B &&
          !O &&
          !gt &&
          !ot &&
          !kt
        ) {
          var i = t.target;
          if (
            i &&
            (i.tagName === "INPUT" ||
              i.tagName === "TEXTAREA" ||
              i.tagName === "SELECT" ||
              i.isContentEditable)
          )
            return;
          (t.preventDefault(),
            t.stopPropagation(),
            t.repeat || M({ type: "clipboardKey", key: "comment" }));
          return;
        }
        if (
          (t.key === "ContextMenu" || (t.key === "F10" && t.shiftKey)) &&
          !t.metaKey &&
          !t.ctrlKey &&
          !t.altKey &&
          !b &&
          !f &&
          !ht &&
          !At &&
          !B &&
          !O &&
          !gt &&
          !ot &&
          !kt &&
          !tt
        ) {
          var o = t.target;
          if (
            (o &&
              (o.tagName === "INPUT" ||
                o.tagName === "TEXTAREA" ||
                o.tagName === "SELECT" ||
                o.isContentEditable)) ||
            A.length === 0
          )
            return;
          (t.preventDefault(), t.stopPropagation(), t.repeat || Vs());
          return;
        }
        if (Tt) {
          var l = t.target,
            u =
              l &&
              (l.tagName === "INPUT" ||
                l.tagName === "TEXTAREA" ||
                l.tagName === "SELECT" ||
                l.isContentEditable);
          if (
            (t.metaKey || t.ctrlKey) &&
            !t.altKey &&
            !t.shiftKey &&
            (t.key || "").toLowerCase() === "c" &&
            A.length > 0 &&
            !u
          ) {
            if ((t.stopPropagation(), t.repeat)) return;
            ((Ra = Date.now()), es(), M({ type: "clipboardKey", key: "c" }));
          }
          return;
        }
        if (
          (t.key || "").toLowerCase() === "a" &&
          t.shiftKey &&
          !t.altKey &&
          !b &&
          !f &&
          !ht &&
          !At &&
          !B &&
          !O &&
          !gt &&
          !ot &&
          !kt
        ) {
          var s = t.target;
          if (
            (s &&
              (s.tagName === "INPUT" ||
                s.tagName === "TEXTAREA" ||
                s.tagName === "SELECT" ||
                s.isContentEditable)) ||
            A.length === 0
          )
            return;
          (t.preventDefault(),
            t.stopPropagation(),
            M({ type: "clipboardKey", key: "a", shift: !0 }));
          return;
        }
        var d = (t.key || "").toLowerCase();
        if (
          (d === "h" || d === "v") &&
          t.shiftKey &&
          !t.metaKey &&
          !t.ctrlKey &&
          !t.altKey &&
          !b &&
          !f &&
          !ht &&
          !At &&
          !B &&
          !O &&
          !gt &&
          !ot &&
          !kt &&
          !tt
        ) {
          var p = t.target;
          if (
            (p &&
              (p.tagName === "INPUT" ||
                p.tagName === "TEXTAREA" ||
                p.tagName === "SELECT" ||
                p.isContentEditable)) ||
            A.length === 0
          )
            return;
          (t.preventDefault(),
            t.stopPropagation(),
            t.repeat ||
              M({
                type: "clipboardKey",
                key: d === "h" ? "flip-horizontal" : "flip-vertical",
              }));
          return;
        }
        if (
          (t.key || "").toLowerCase() === "g" &&
          t.shiftKey &&
          !t.metaKey &&
          !t.ctrlKey &&
          !t.altKey &&
          !b
        ) {
          var c = t.target;
          if (
            c &&
            (c.tagName === "INPUT" ||
              c.tagName === "TEXTAREA" ||
              c.tagName === "SELECT" ||
              c.isContentEditable)
          )
            return;
          (t.preventDefault(),
            t.stopPropagation(),
            t.repeat || M({ type: "clipboardKey", key: "guides" }));
          return;
        }
        if (
          (t.key === "Delete" || t.key === "Backspace") &&
          !t.metaKey &&
          !t.ctrlKey &&
          !b &&
          A.length > 0 &&
          !f &&
          !ht &&
          !At &&
          !B &&
          !O &&
          !gt &&
          !ot &&
          !kt
        ) {
          var g = t.target;
          if (
            g &&
            (g.tagName === "INPUT" ||
              g.tagName === "TEXTAREA" ||
              g.tagName === "SELECT" ||
              g.isContentEditable)
          )
            return;
          for (var h = !1, v = 0; v < A.length && !h; v++)
            h = !!Ye(mn(A[v], R));
          if (!h) return;
          (t.preventDefault(),
            t.stopPropagation(),
            M({ type: "deleteSelection" }));
          return;
        }
        if (
          (t.metaKey || t.ctrlKey) &&
          !t.altKey &&
          !b &&
          !f &&
          !ht &&
          !At &&
          !B &&
          !O &&
          !gt &&
          !ot &&
          (!kt || (t.key || "").toLowerCase() === "z")
        ) {
          var x = (t.key || "").toLowerCase(),
            y = t.target;
          if (
            (x === "z" || x === "g") &&
            y &&
            (y.tagName === "INPUT" ||
              y.tagName === "TEXTAREA" ||
              y.tagName === "SELECT" ||
              y.isContentEditable)
          )
            return;
          if (x === "z") {
            (t.preventDefault(),
              t.stopPropagation(),
              M({ type: "clipboardKey", key: "z", shift: !!t.shiftKey }));
            return;
          }
          if (x === "g") {
            if (A.length === 0) return;
            (t.preventDefault(),
              t.stopPropagation(),
              t.repeat ||
                M({ type: "clipboardKey", key: "g", shift: !!t.shiftKey }));
            return;
          }
          if (t.shiftKey) {
            x === "v" &&
              !(
                y &&
                (y.tagName === "INPUT" ||
                  y.tagName === "TEXTAREA" ||
                  y.tagName === "SELECT" ||
                  y.isContentEditable)
              ) &&
              t.preventDefault();
            return;
          }
          if (x === "a") {
            if (
              (y &&
                (y.tagName === "INPUT" ||
                  y.tagName === "TEXTAREA" ||
                  y.tagName === "SELECT" ||
                  y.isContentEditable)) ||
              A.length === 0
            )
              return;
            (t.preventDefault(),
              t.stopPropagation(),
              M({ type: "clipboardKey", key: "a" }));
            return;
          }
          if (x === "c" || x === "x" || x === "v" || x === "d") {
            var m = t.target;
            if (
              m &&
              (m.tagName === "INPUT" ||
                m.tagName === "TEXTAREA" ||
                m.tagName === "SELECT" ||
                m.isContentEditable)
            )
              return;
            if (x !== "v" && A.length === 0) {
              x === "d" && !Tt && t.preventDefault();
              return;
            }
            if ((t.stopPropagation(), x === "v")) {
              (clearTimeout(La),
                (La = setTimeout(function () {
                  M({ type: "clipboardKey", key: "v" });
                }, 100)));
              return;
            }
            if (x === "d") t.preventDefault();
            else {
              if (t.repeat) return;
              ((Ra = Date.now()), es());
            }
            M({ type: "clipboardKey", key: x });
            return;
          }
        }
        if (!(!b || io())) {
          if (
            t.key === " " &&
            !t.isComposing &&
            !t.ctrlKey &&
            !t.metaKey &&
            !t.altKey &&
            b.el.contains(t.target) &&
            b.el.closest("button, summary")
          ) {
            (t.preventDefault(),
              t.stopPropagation(),
              document.execCommand("insertText", !1, " "));
            return;
          }
          if (
            (document.activeElement !== b.el &&
              !b.el.contains(document.activeElement) &&
              b.el.focus(),
            (b.svg || b.importTarget) && t.key === "Enter")
          ) {
            if (t.isComposing || t.keyCode === 229) return;
            (t.preventDefault(), t.stopPropagation(), $t());
            return;
          }
          if (
            t.key === "Enter" &&
            !t.shiftKey &&
            !t.isComposing &&
            !t.ctrlKey &&
            !t.metaKey
          ) {
            var w = getSelection && getSelection(),
              E = w && w.anchorNode,
              C =
                E && E.nodeType
                  ? E.nodeType === 1
                    ? E
                    : E.parentElement
                  : null;
            if (
              ((C = C && C.closest ? C.closest("li") : null),
              !(C && C !== b.el && b.el.contains(C)))
            ) {
              (t.preventDefault(),
                t.stopPropagation(),
                document.execCommand("insertLineBreak") ||
                  document.execCommand("insertHTML", !1, "<br>"));
              return;
            }
          }
          (t.key === "Escape" &&
            (t.preventDefault(), t.stopPropagation(), $t()),
            t.key === "Tab" &&
              !t.ctrlKey &&
              !t.metaKey &&
              !t.isComposing &&
              t.keyCode !== 229 &&
              (t.preventDefault(), t.stopPropagation(), $t()));
        }
      }
    }
  }
  var zs = 0,
    qs = 0;
  function Vs() {
    var t = A.length ? z(A[0], R) : [];
    if (t.length) {
      qs = Date.now();
      var e = t[0].getBoundingClientRect();
      M({
        type: "contextMenu",
        key: !0,
        x: e.left + Math.min(40, e.width / 2),
        y: e.top + Math.min(24, e.height / 2),
      });
    }
  }
  var ke = null;
  function Gs(t) {
    if (Date.now() - to < 500 || Date.now() - qs < 500) {
      (t.preventDefault(), t.stopPropagation());
      return;
    }
    if (!(!I || D === "interact")) {
      if (b) {
        zs = Date.now();
        return;
      }
      if (!he(t)) {
        if (
          (t.preventDefault(),
          t.stopPropagation(),
          !et && t.button === 2 && t.pointerType !== "touch" && ro(t),
          et && et.mask === 2)
        ) {
          et.menu = { x: t.clientX, y: t.clientY, el: pr(t) };
          return;
        }
        var e = ge && t.ctrlKey && t.button !== 2,
          r = e && ut ? ut.was : null;
        if (
          (r && (r.x !== t.clientX || r.y !== t.clientY) && (r = null),
          e && U && U.x === t.clientX && U.y === t.clientY)
        ) {
          ke = { x: t.clientX, y: t.clientY, el: pr(t), was: r };
          return;
        }
        Po(t.clientX, t.clientY, pr(t), r);
      }
    }
  }
  function cp(t, e) {
    for (var r = vn(t), n = r.length - 1; n >= 0 && r[n] !== e; n--)
      if (li(r[n])) return r[n];
    return e;
  }
  function Us(t, e, r) {
    return (
      r === _(t) &&
      e.indexOf(parseInt(t.getAttribute("data-dc-tpl"), 10)) !== -1
    );
  }
  function Po(t, e, r, n) {
    if (
      (f && re(!1),
      Mn(!1),
      je(!1),
      yr(!1),
      Yr(!1),
      (U = null),
      (Mt = null),
      (At = null),
      (ut = null),
      Xr(!0),
      r)
    ) {
      var a = hn(r),
        i = n || { tids: A, name: R };
      ((r = ea(a, "plain", i.tids, i.name) || a),
        Us(r, i.tids, i.name) || (r = cp(a, r)),
        Us(r, A, R) ||
          (qt(),
          (A = [parseInt(r.getAttribute("data-dc-tpl"), 10)]),
          (ft = null),
          (R = _(r)),
          yt(),
          Ct(
            r.hasAttribute("data-sc-name")
              ? "dc-import"
              : r.tagName.toLowerCase(),
          )));
    }
    M({ type: "contextMenu", x: t, y: e });
  }
  function Wn(t) {
    if (!b) return !1;
    var e = t.target;
    return b.el.contains(e) || ko(t);
  }
  function ko(t) {
    var e = t && t.target;
    return !b || !b.svg || !e || !e.closest
      ? !1
      : b.svg.contains(e)
        ? !0
        : !(e instanceof SVGElement) ||
            (e.ownerSVGElement || e) !== b.svg.ownerSVGElement ||
            On(e) ||
            t.clientX == null
          ? !1
          : cs(e, t) === b.svg;
  }
  var $s =
      "[data-dc-edit-transparent],[data-omelette-chrome],[data-noncommentable],.twk-panel",
    pp = "[data-dc-wheel-passthru]";
  function Mr(t, e) {
    var r = t;
    if (t && typeof t.composedPath == "function") {
      for (var n = t.composedPath(), a = 0; a < n.length; a++) {
        var i = n[a];
        if (i && i.nodeType === 1 && i.matches && i.matches(e)) return !0;
      }
      r = t.target;
    }
    return !!(r && r.closest && r.closest(e));
  }
  function he(t) {
    return Mr(t, $s);
  }
  function vp(t) {
    if (!t || typeof t.composedPath != "function") return !1;
    for (var e = t.composedPath(), r = 0; r < e.length; r++) {
      var n = e[r];
      if (!(!n || n.nodeType !== 1)) {
        var a;
        try {
          a = getComputedStyle(n);
        } catch {
          continue;
        }
        var i =
            (a.overflowY === "auto" || a.overflowY === "scroll") &&
            n.scrollHeight > n.clientHeight,
          o =
            (a.overflowX === "auto" || a.overflowX === "scroll") &&
            n.scrollWidth > n.clientWidth;
        if ((i && t.deltaY) || (o && t.deltaX)) {
          for (var l = r; l < e.length; l++) {
            var u = e[l];
            if (u && u.nodeType === 1 && u.matches && u.matches($s)) return !0;
          }
          return !1;
        }
      }
    }
    return !1;
  }
  function Zs(t) {
    if (!t || typeof t.composedPath != "function") return !1;
    for (
      var e = t.composedPath(),
        r = Te(),
        n = Math.abs(t.deltaY),
        a = Math.abs(t.deltaX),
        i = 0;
      i < e.length;
      i++
    ) {
      var o = e[i];
      if (o === r || o === document.body || o === document.documentElement)
        break;
      if (!(!o || o.nodeType !== 1)) {
        var l;
        try {
          l = getComputedStyle(o);
        } catch {
          continue;
        }
        var u = l.overflowY,
          s = l.overflowX,
          d =
            n >= a &&
            (u === "auto" || u === "scroll") &&
            (t.deltaY > 0
              ? o.scrollTop + o.clientHeight < o.scrollHeight - 1
              : t.deltaY < 0 && o.scrollTop > 1),
          p =
            a > n &&
            (s === "auto" || s === "scroll") &&
            (t.deltaX > 0
              ? o.scrollLeft + o.clientWidth < o.scrollWidth - 1
              : t.deltaX < 0 && o.scrollLeft > 1);
        if (d || p) return !0;
      }
    }
    return !1;
  }
  function No(t) {
    if (t.ctrlKey || t.metaKey) return !1;
    if (!t.deltaX && !t.deltaY) return !0;
    if (Math.abs(t.deltaX) <= Math.abs(t.deltaY)) return !1;
    var e = t.deltaX > 0,
      r = t.deltaY > 0,
      n = function (y, m) {
        var w =
            y.scrollLeft < 0 ||
            m.direction === "rtl" ||
            /-rl$/.test(m.writingMode || ""),
          E = w ? y.clientWidth - y.scrollWidth : 0,
          C = w ? 0 : y.scrollWidth - y.clientWidth;
        return e ? y.scrollLeft < C - 1 : y.scrollLeft > E + 1;
      },
      a = function (y) {
        return (
          !!t.deltaY &&
          (r
            ? y.scrollTop + y.clientHeight < y.scrollHeight - 1
            : y.scrollTop > 1)
        );
      },
      i = function (y) {
        return y !== "hidden" && y !== "clip";
      },
      o = function (y) {
        return y === "auto" || y === "scroll";
      },
      l = function (y) {
        return y.localName === "input" || y.localName === "textarea";
      },
      u = document.documentElement,
      s = document.scrollingElement || u,
      d = getComputedStyle(u),
      p =
        d.overflowX === "visible" &&
        d.overflowY === "visible" &&
        !!document.body,
      c = p ? getComputedStyle(document.body) : d;
    if (
      (i(c.overflowX) && n(s, c)) ||
      (i(c.overflowY) && a(s)) ||
      typeof t.composedPath != "function"
    )
      return !1;
    for (var g = t.composedPath(), h = 0; h < g.length; h++) {
      var v = g[h];
      if (!(!v || v.nodeType !== 1 || v === u || (p && v === document.body))) {
        var x;
        try {
          x = getComputedStyle(v);
        } catch {
          continue;
        }
        if (((o(x.overflowX) || l(v)) && n(v, x)) || (o(x.overflowY) && a(v)))
          return !1;
      }
    }
    return !0;
  }
  var Pr = 0,
    kr = !1;
  function Lo(t) {
    return !t.isTrusted ||
      t.button !== 0 ||
      (t.type === "mousedown" && (kr = t.timeStamp < Pr),
      !(t.timeStamp < Pr) && !(kr && t.detail > 0))
      ? !1
      : (t.preventDefault(), t.stopPropagation(), !0);
  }
  function hp() {
    kr = !1;
  }
  document.addEventListener("pointercancel", hp, !0);
  function gp(t) {
    I ||
      !t.isTrusted ||
      t.button !== 0 ||
      ((kr = t.timeStamp < Pr), kr && t.preventDefault());
  }
  document.addEventListener("mousedown", gp, !0);
  function Js(t) {
    if (
      I &&
      !Lo(t) &&
      (t.type === "mousedown" &&
        ((Dt = !1), (ke = null), t.button === 0 && (Jn = Wn(t))),
      t.type === "mousedown" && t.isTrusted && ((jt = null), (ye = null)),
      D !== "interact")
    ) {
      if (ko(t)) {
        (t.preventDefault(), t.stopPropagation(), (Dt = !0), Gc(t));
        return;
      }
      if (
        !Wn(t) &&
        !he(t) &&
        (t.type === "mousedown" &&
          t.isTrusted &&
          ((Dr = t.button === 0 ? mi() : null),
          M(
            Dr
              ? { type: "canvasPointerDown", gestureKey: Dr }
              : { type: "canvasPointerDown" },
          )),
        t.preventDefault(),
        t.stopPropagation(),
        !Tt)
      ) {
        if (t.type === "mousedown" && t.button === 0 && !b && D !== "select") {
          if (D === "draw") {
            Mc(t);
            return;
          }
          var e = Tn(t.clientX, t.clientY);
          Mt = {
            x: t.clientX,
            y: t.clientY,
            parentEl: e.el,
            parentTid: e.tid,
            parentName: e.name,
            parentRect: e.rect,
          };
          return;
        }
        if (t.type === "mousedown" && t.button === 0 && !b && D === "select") {
          ut = null;
          var r =
            t.target &&
            t.target.closest &&
            t.target.closest("[data-dc-editor-overlay]");
          if (r) return;
          var n = ge ? t.metaKey : t.ctrlKey,
            a = t.shiftKey,
            i = fr(),
            o = i ? gn(t, n ? "deep" : "plain", A, R) : null,
            l = o && o.ruled ? o.el : null;
          if (
            (t.altKey &&
              !a &&
              !n &&
              (ut = { release: "artboard", target: null }),
            !l)
          ) {
            if (o === "empty" && (!t.altKey || (!a && !n))) {
              (aa(a), (ut = { release: "none", target: null }));
              return;
            }
            var u = cr();
            (i && Ni(t, u && ma(u) ? u : null, n ? "deep" : "plain", a),
              ut || (ut = { release: "background", target: null }));
            return;
          }
          var s = parseInt(l.getAttribute("data-dc-tpl"), 10),
            d = R === _(l) && A.indexOf(s) >= 0,
            p = { tids: A.slice(), name: R },
            c = cr();
          if (
            l === c &&
            !d &&
            !n &&
            !t.altKey &&
            !(t.target.closest && t.target.closest("[data-drags-parent]")) &&
            ma(c)
          ) {
            (Ni(t, c, "plain", a),
              (ut = {
                release: a ? "keep" : o.page ? "background" : "root",
                target: l,
              }));
            return;
          }
          var g = !a && !n && !d && !ra(l) ? ml(l, o.hit) : null;
          if (
            (ut ||
              (a && d
                ? (ut = { release: "remove", target: l })
                : a
                  ? (Ke(l, !0), (ut = { release: "none", target: l }))
                  : d
                    ? (ut = {
                        release:
                          A.length > 1 ? "narrow" : n ? "none" : "text-part",
                        target: l,
                      })
                    : g
                      ? (ut = { release: "text", target: g })
                      : (Ke(l, !1),
                        (ut = {
                          release: "none",
                          target: l,
                          was:
                            ge && t.ctrlKey && !n
                              ? {
                                  tids: p.tids,
                                  name: p.name,
                                  x: t.clientX,
                                  y: t.clientY,
                                }
                              : null,
                        }))),
            n && ge)
          ) {
            Ni(t, null, "deep", a, p);
            return;
          }
          var h = Qs(t.target, Et(l));
          (d || (h = mp(h)),
            !Ee(h) &&
              !Ae(h) &&
              (U = {
                el: h,
                tid: parseInt(h.getAttribute("data-dc-tpl"), 10),
                name: _(h),
                x: t.clientX,
                y: t.clientY,
              }));
        }
      }
    }
  }
  var za = {
    img: 1,
    svg: 1,
    video: 1,
    canvas: 1,
    iframe: 1,
    picture: 1,
    object: 1,
    embed: 1,
    audio: 1,
  };
  function mp(t) {
    for (
      var e = it(t);
      t &&
      getComputedStyle(t).display === "inline" &&
      !za[(t.tagName || "").toLowerCase()];
    ) {
      var r = t.parentElement;
      if (
        !r ||
        !r.getAttribute ||
        r.getAttribute("data-dc-tpl") == null ||
        it(r) !== e
      )
        break;
      t = r;
    }
    return t;
  }
  function Qs(t, e) {
    var r = t && t.closest && t.closest("[data-drags-parent]");
    if (!r) return e;
    var n = parseInt(r.getAttribute("data-drags-parent"), 10);
    if (!(n > 0)) return e;
    for (var a = _(r), i = r, o = 0; o < n; o++) {
      var l = i.parentElement;
      if (
        !l ||
        !l.getAttribute ||
        l.getAttribute("data-dc-tpl") == null ||
        _(l) !== a
      )
        break;
      i = l;
    }
    return i.getAttribute && i.getAttribute("data-dc-tpl") != null ? i : e;
  }
  function qt() {
    if (ct) {
      try {
        ct.removeAttribute("data-dc-editor-selected");
      } catch {}
      ct = null;
    }
  }
  function js(t) {
    !I || D === "interact" || he(t) || Wn(t) || t.preventDefault();
  }
  function td(t) {
    var e = t.target;
    if (
      !(
        !t.isTrusted ||
        !e ||
        e.tagName !== "VIDEO" ||
        e.controls ||
        (t.detail || 0) > 1
      ) &&
      !Mr(t, po)
    ) {
      var r = e.paused;
      setTimeout(function () {
        if (!(e.paused !== r || !e.isConnected))
          if (r) {
            var n = e.play();
            n && n.catch && n.catch(function () {});
          } else e.pause();
      }, 0);
    }
  }
  function ed(t) {
    if (
      ((window.__dcEditorDebug = {
        clicks: ((window.__dcEditorDebug || {}).clicks || 0) + 1,
        enabled: I,
        tool: D,
        suppressClick: Dt,
        editing: !!b,
      }),
      !!I && !Lo(t))
    ) {
      if (D === "interact") {
        td(t);
        return;
      }
      if (!he(t)) {
        if (Dt) {
          ((Dt = !1), (ut = null), t.preventDefault(), t.stopPropagation());
          return;
        }
        if (fn && !b && D === "select" && t.detail === 1) {
          var e = fn;
          if (
            ((fn = null),
            Date.now() - e.t < 500 &&
              Math.hypot(t.clientX - e.x, t.clientY - e.y) <= Gt(5))
          ) {
            ((ut = null), Oa(t));
            return;
          }
        }
        if (b) {
          if (Wn(t)) {
            (b.el.contains(t.target) && t.stopPropagation(),
              b.importTarget && t.preventDefault());
            return;
          }
          var r = !!(t.target && t.target.contains && t.target.contains(b.el));
          if (Jn && t.detail > 0 && r) {
            (t.preventDefault(), t.stopPropagation());
            return;
          }
          if (t.detail === 0 && r) {
            (t.preventDefault(), t.stopPropagation());
            return;
          }
          (t.preventDefault(), t.stopPropagation(), $t());
          return;
        }
        if (D === "draw") {
          (t.preventDefault(), t.stopPropagation());
          return;
        }
        if (D !== "select") {
          (t.preventDefault(),
            t.stopPropagation(),
            D === "text" && (Pr = t.timeStamp + 500));
          var n = Tn(t.clientX, t.clientY);
          We();
          var a =
              Li[D] || (D === "arrow" || D === "line" ? [160, 0] : [120, 120]),
            i = n.el ? Lt(n.el) : at || 1;
          M({
            type: "insert",
            name: n.name,
            targetTid: n.tid,
            position: n.tid == null ? "root-end" : "into",
            rect: {
              x: Math.round((t.clientX - n.rect.left) / i),
              y: Math.round((t.clientY - n.rect.top) / i),
              w: D === "text" ? 0 : a[0],
              h: D === "text" ? 0 : a[1],
            },
          });
          return;
        }
        (t.preventDefault(), t.stopPropagation());
        var o = ut;
        ut = null;
        var l = t.shiftKey,
          u = gn(t, "plain", A, R);
        if (
          (t.detail || 0) >= 3 &&
          !l &&
          !t.altKey &&
          !(ge ? t.metaKey : t.ctrlKey) &&
          u &&
          u.el &&
          A.length === 1 &&
          R === _(u.el) &&
          A[0] === parseInt(u.el.getAttribute("data-dc-tpl"), 10)
        ) {
          Oa(t);
          return;
        }
        if (o) {
          var s = o.target,
            d = s ? parseInt(s.getAttribute("data-dc-tpl"), 10) : NaN;
          switch (o.release) {
            case "none":
            case "keep":
              return;
            case "artboard":
              aa();
              return;
            case "root":
              Ke(s, !1);
              return;
            case "remove": {
              var p = A.indexOf(d);
              p >= 0 &&
                (A.splice(p, 1),
                A.length === 0 && (R = null),
                (ft = null),
                yt(),
                Ct(void 0, void 0, !0));
              return;
            }
            case "narrow":
              Ke(s, !1);
              return;
            case "text":
              Ke(s, !1);
              return;
            case "text-part": {
              if ((t.detail || 0) < 2 && u && u.hit && !ra(s)) {
                var c = ml(s, u.hit);
                if (c) {
                  Ke(c, !1);
                  return;
                }
              }
              if (
                (t.detail || 0) < 2 &&
                A.length === 1 &&
                A[0] === d &&
                Tl(s, d) &&
                Cl(s) &&
                El(s, t.clientX, t.clientY)
              )
                ((ft = "text"), yt(), Ct(Fe(s), void 0, !0));
              else if (
                A.length === 1 &&
                A[0] === d &&
                (Ct(Fe(s)), (t.detail || 0) < 2 && s.tagName === "VIDEO")
              )
                if (s.paused) {
                  var g = s.play();
                  g && g.catch && g.catch(function () {});
                } else s.pause();
              return;
            }
            case "background":
              break;
          }
        }
        if (u && u.page && !(ge ? t.metaKey : t.ctrlKey)) {
          l || aa();
          return;
        }
        if (!u || !u.el) {
          var h = t.target;
          if (u !== "unstamped" || bl(h) !== "foreign") {
            aa(l);
            return;
          }
          (l || ((A = []), (R = null), (ft = null)), qt(), yt());
          {
            ct = h;
            var v = h.outerHTML;
            (h.setAttribute("data-dc-editor-selected", ""),
              Ue++,
              M({
                type: "select",
                tids: null,
                foreign: { tag: h.tagName.toLowerCase(), html: v, text: "" },
                additive: l,
                s: Ue,
              }));
          }
          return;
        }
        qt();
        var x = l ? null : gn(t, "click", A, R),
          y = x && x.el ? x.el : u.el,
          m = parseInt(y.getAttribute("data-dc-tpl"), 10),
          w = _(y),
          E =
            !l &&
            (t.detail || 0) < 2 &&
            A.length === 1 &&
            A[0] === m &&
            R === w &&
            Tl(y, m) &&
            Cl(y) &&
            El(y, t.clientX, t.clientY);
        if (((ft = E ? "text" : null), l && R === w && A.length > 0)) {
          var C = A.indexOf(m);
          C >= 0 ? A.splice(C, 1) : A.push(m);
        } else ((A = [m]), (R = w));
        (A.length === 0 && (R = null),
          yt(),
          Ct(
            y.hasAttribute("data-sc-name")
              ? "dc-import"
              : y.tagName.toLowerCase(),
            void 0,
            l,
          ));
      }
    }
  }
  var ir = {
    setHostPanZoom: function (t) {
      (Qt && t !== "scroll" && t !== "play" && window.scrollTo(0, 0),
        (lr = t === !0),
        (Re = t === "play"),
        (Qt = t === "scroll" || Re),
        Nn());
    },
    enable: function () {
      I ||
        (Le && ir.disableRingsOnly(),
        (I = !0),
        ru(),
        document.head.appendChild(or),
        document.body.setAttribute("data-dc-editor-on", ""),
        document.addEventListener("mousemove", Kn, !0),
        document.addEventListener("mouseover", ss, !0),
        document.addEventListener("mouseout", ds, !0),
        document.addEventListener("pointerdown", ul, !0),
        document.addEventListener("pointermove", sl, {
          capture: !0,
          passive: !0,
        }),
        document.addEventListener("mousedown", Js, !0),
        document.addEventListener("mouseup", zi, !0),
        document.addEventListener("click", ed, !0),
        document.addEventListener("auxclick", js, !0),
        document.addEventListener("contextmenu", Gs, !0),
        document.addEventListener("dblclick", Oa, !0),
        document.addEventListener("keydown", Ys, !0),
        document.addEventListener("keyup", Xs, !0),
        window.addEventListener("blur", Hs),
        document.addEventListener("wheel", Ca, { capture: !0, passive: !1 }),
        Wu(),
        document.addEventListener("dragover", ju, !0),
        document.addEventListener("drop", ts, !0),
        window.addEventListener("paste", as, !0),
        window.addEventListener("copy", Da, !0),
        window.addEventListener("cut", Da, !0),
        document.addEventListener("scroll", Y, !0),
        document.addEventListener("slidechange", Ns, !0),
        window.addEventListener("resize", Y),
        (be = new MutationObserver(_r)),
        be.observe(document.body, {
          subtree: !0,
          childList: !0,
          attributes: !0,
          characterData: !0,
        }),
        (de =
          typeof ResizeObserver == "function" ? new ResizeObserver(_r) : null),
        (cn = new MutationObserver(Uf)),
        document.head &&
          cn.observe(document.head, {
            subtree: !0,
            childList: !0,
            characterData: !0,
          }),
        Ui(),
        er(),
        (jn = setInterval(function () {
          (Y(), er());
        }, 400)),
        Ps(),
        Os(),
        (Pe = !1),
        (Me = 0),
        Zt());
    },
    disable: function (t) {
      if ((t || (Kt && Vi(!1), (Kt = !1)), X && ve(!1), !I)) {
        if (
          ((A = []),
          (R = null),
          (ft = null),
          (jt = null),
          (ye = null),
          Tr(),
          (Pe = !1),
          (Me = 0),
          Zt(),
          (un = !1),
          !t)
        ) {
          (($ = { x: 0, y: 0 }), (at = 1), (zr = void 0));
          var e = Te();
          (e && (e.style.transform = ""),
            or.remove(),
            $i(),
            document.removeEventListener("wheel", Ca, { capture: !0 }),
            Hu(),
            document.removeEventListener("dblclick", ho, !0),
            document.removeEventListener("click", vo, !0),
            document.removeEventListener("dragover", Co, !0),
            document.removeEventListener("drop", So, !0),
            document.removeEventListener("dragstart", xo, !0),
            document.removeEventListener("dragenter", wo, !0),
            document.removeEventListener("dragleave", Ao, !0),
            document.removeEventListener("dragend", Eo, !0),
            window.removeEventListener("message", kn));
        }
        return;
      }
      if (
        (b && $t(!1),
        f && re(!1),
        Mn(!1),
        je(!1),
        yr(!1),
        Yr(!1),
        Ea(!1, !1),
        fu(),
        (Mt = null),
        (At = null),
        Xr(!0),
        We(),
        Yt(),
        qt(),
        !t || !Kt)
      ) {
        (($ = { x: 0, y: 0 }), (at = 1), (zr = void 0));
        var r = Te();
        r && (r.style.transform = "");
      }
      (jn && (clearInterval(jn), (jn = null)),
        document.removeEventListener("scroll", Y, !0),
        document.removeEventListener("slidechange", Ns, !0),
        window.removeEventListener("resize", Y),
        be && (be.disconnect(), (be = null)),
        cn && (cn.disconnect(), (cn = null)),
        de && (de.disconnect(), (de = null), (Qn = [])),
        Cn(),
        (U = null),
        (ke = null),
        (ut = null),
        (I = !1),
        tt && Wr(),
        (Wt = !1),
        Su([], null),
        clearTimeout(La),
        (A = []),
        (R = null),
        (ft = null),
        (jt = null),
        (ye = null),
        Tr(),
        (Pe = !1),
        (Me = 0),
        Zt(),
        (un = !1),
        xe(),
        Ut("data-dc-editor-selected"),
        document.body.removeAttribute("data-dc-editor-on"),
        document.body.removeAttribute("data-dc-editor-tool"),
        (document.body.style.cursor = ""),
        document.documentElement.style.removeProperty("--dc-editor-host-bg"),
        document.documentElement.style.removeProperty("--dc-editor-host-vpad"),
        t || (or.remove(), $i()),
        document.removeEventListener("mousemove", Kn, !0),
        document.removeEventListener("mouseover", ss, !0),
        document.removeEventListener("mouseout", ds, !0),
        document.removeEventListener("pointerdown", ul, !0),
        document.removeEventListener("pointermove", sl, { capture: !0 }),
        document.removeEventListener("mousedown", Js, !0),
        document.removeEventListener("mouseup", zi, !0),
        document.removeEventListener("click", ed, !0),
        document.removeEventListener("auxclick", js, !0),
        document.removeEventListener("contextmenu", Gs, !0),
        document.removeEventListener("dblclick", Oa, !0),
        document.removeEventListener("keydown", Ys, !0),
        document.removeEventListener("keyup", Xs, !0),
        window.removeEventListener("blur", Hs),
        (Un = !1),
        (rr = !1),
        (Rr = !1),
        (ur = null),
        t ||
          (document.removeEventListener("wheel", Ca, { capture: !0 }),
          Hu(),
          document.removeEventListener("dblclick", ho, !0),
          document.removeEventListener("click", vo, !0),
          document.removeEventListener("dragover", Co, !0),
          document.removeEventListener("drop", So, !0),
          document.removeEventListener("dragstart", xo, !0),
          document.removeEventListener("dragenter", wo, !0),
          document.removeEventListener("dragleave", Ao, !0),
          document.removeEventListener("dragend", Eo, !0),
          window.removeEventListener("message", kn)),
        document.removeEventListener("dragover", ju, !0),
        document.removeEventListener("drop", ts, !0),
        window.removeEventListener("paste", as, !0),
        window.removeEventListener("copy", Da, !0),
        window.removeEventListener("cut", Da, !0));
      try {
        var n = window.__dcRootName && window.__dcRootName(),
          a = n && window.__dcTemplateSource && window.__dcTemplateSource(n);
        a != null && window.__dcUpdate(n, "html", a, !1);
      } catch {}
      (Nn(), Vn && ((Vn = !1), ir.enableRingsOnly()));
    },
    enablePanZoomOnly: function () {
      if (
        (document.addEventListener("dblclick", ho, !0),
        document.addEventListener("click", vo, !0),
        document.addEventListener("dragover", Co, !0),
        document.addEventListener("drop", So, !0),
        document.addEventListener("dragstart", xo, !0),
        document.addEventListener("dragenter", wo, !0),
        document.addEventListener("dragleave", Ao, !0),
        document.addEventListener("dragend", Eo, !0),
        window.addEventListener("message", kn),
        I)
      ) {
        ir.disable(!0);
        return;
      }
      (document.head.appendChild(or),
        document.addEventListener("wheel", Ca, { capture: !0, passive: !1 }),
        Wu(),
        window.addEventListener("message", kn),
        Ui(),
        er());
    },
    setPanZoomArmed: function (t) {
      if (!!t !== Kt) {
        if (((Kt = !!t), Vi(t), t)) {
          if (
            (window.addEventListener("message", kn),
            Ui(),
            er(),
            !_o &&
              document.querySelector(
                'meta[name="design_doc_mode"][content="canvas"]',
              ))
          ) {
            _o = !0;
            var e = 0,
              r = 0,
              n = function () {
                if (
                  !(at !== 1 && at !== e) &&
                  !(($.x !== 0 && $.x !== r) || $.y !== 0)
                ) {
                  var i = Te();
                  if (i) {
                    var o = Bu(i).width;
                    o > innerWidth * 1.05 && (Ku(), (e = at), (r = $.x));
                  }
                }
              };
            (n(), requestAnimationFrame(n), setTimeout(n, 250));
          }
        } else if (($i(), !I)) {
          (($ = { x: 0, y: 0 }), (at = 1), (zr = void 0));
          var a = Te();
          a && (a.style.transform = "");
        }
      }
    },
    setAppTheme: function (t) {
      var e = document.documentElement;
      t === "dark"
        ? (e.style.setProperty("--dc-editor-backdrop", "#171717"),
          e.style.setProperty("--dc-editor-hatch-ink", "rgba(250,249,245,.07)"))
        : (e.style.removeProperty("--dc-editor-backdrop"),
          e.style.removeProperty("--dc-editor-hatch-ink"));
    },
    setBusyDrops: function (t) {
      ((qn = {}), ($a = 0));
      for (var e = 0; t && e < t.length && e < 32; e++)
        typeof t[e] == "string" &&
          /^[a-z0-9-]{1,48}$/.test(t[e]) &&
          qn[t[e]] !== 1 &&
          ((qn[t[e]] = 1), $a++);
      Y();
    },
    enableRingsOnly: function () {
      if (I) {
        Vn = !0;
        return;
      }
      Le ||
        ((Le = !0),
        (be = new MutationObserver(_r)),
        be.observe(document.body, {
          subtree: !0,
          childList: !0,
          attributes: !0,
          characterData: !0,
        }),
        (de =
          typeof ResizeObserver == "function" ? new ResizeObserver(_r) : null),
        document.addEventListener("scroll", Y, !0),
        window.addEventListener("resize", Y),
        Y());
    },
    disableRingsOnly: function () {
      ((Vn = !1),
        Le &&
          ((Le = !1),
          be && (be.disconnect(), (be = null)),
          de && (de.disconnect(), (de = null)),
          document.removeEventListener("scroll", Y, !0),
          window.removeEventListener("resize", Y),
          xe(),
          Y()));
    },
    pickAt: function (t, e, r, n, a) {
      var i = Number(t),
        o = Number(e);
      if (!isFinite(i) || !isFinite(o)) return null;
      var l = r === "deep" || r === "deeper" ? r : "plain",
        u = Array.isArray(n)
          ? n.filter(function (s) {
              return typeof s == "number" && isFinite(s);
            })
          : [];
      return new Promise(function (s) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (di(u)) {
              s({ empty: !0 });
              return;
            }
            var d = xl(document.elementFromPoint(i, o), l, u);
            if (!d) {
              s(null);
              return;
            }
            var p = d.el,
              c = d.hit === p && p === cr(),
              g = parseInt(p.getAttribute("data-dc-tpl") || "-1", 10);
            if (g < 0 || !isFinite(g)) {
              s(null);
              return;
            }
            var h = gi(p),
              v = l === "plain" ? yl(p, d.hit, a) : null,
              x = v ? gi(v) : null;
            s({
              tid: g,
              tag: yn(p),
              rect: { x: h.left, y: h.top, w: h.width, h: h.height },
              root: c,
              page: d.page,
              text: v
                ? {
                    tid: parseInt(v.getAttribute("data-dc-tpl"), 10),
                    tag: yn(v),
                    rect: { x: x.left, y: x.top, w: x.width, h: x.height },
                  }
                : null,
            });
          });
        });
      });
    },
    pickIn: function (t, e, r, n, a) {
      if (
        ((t = Number(t)),
        (e = Number(e)),
        (r = Number(r)),
        (n = Number(n)),
        !(isFinite(t) && isFinite(e) && isFinite(r) && isFinite(n)) ||
          r < t ||
          n < e)
      )
        return [];
      var i = fr();
      if (!i || vl()) return [];
      for (
        var o = a === "deep",
          l = o ? null : cr(),
          u = ya(l && ma(l) ? l : null, i, o ? "deep" : "plain"),
          s = [],
          d = 0;
        d < u.length;
        d++
      ) {
        var p = Q(u[d]),
          c = p.getBoundingClientRect();
        if (!(c.width === 0 && c.height === 0)) {
          var g = o
            ? t <= c.left && c.right <= r && e <= c.top && c.bottom <= n
            : t <= c.right && c.left <= r && e <= c.bottom && c.top <= n;
          g && pe(p) && s.push(u[d]);
        }
      }
      o && (s = su(s));
      for (var h = [], v = 0; v < s.length && h.length < 512; v++) {
        var x = parseInt(s[v].getAttribute("data-dc-tpl") || "-1", 10);
        x < 0 || !isFinite(x) || h.push({ tid: x, tag: yn(s[v]) });
      }
      return h;
    },
    commentAt: function (t, e) {
      var r = Number(t),
        n = Number(e);
      return !isFinite(r) || !isFinite(n)
        ? null
        : pi(document.elementFromPoint(r, n), r, n);
    },
    commentFor: function (t, e) {
      var r = z(String(t), e || null)[0];
      return r ? pi(r, null, null) : null;
    },
    commentIn: function (t, e, r, n) {
      if (
        ((t = Number(t)),
        (e = Number(e)),
        (r = Number(r)),
        (n = Number(n)),
        !(isFinite(t) && isFinite(e) && isFinite(r) && isFinite(n)) ||
          r <= t ||
          n <= e)
      )
        return null;
      for (
        var a = _t(),
          i = a ? a.getAttribute("data-sc-name") : null,
          o = (r - t) * (n - e),
          l = function (W) {
            var H = Math.min(r, W.right) - Math.max(t, W.left),
              Z = Math.min(n, W.bottom) - Math.max(e, W.top);
            return H > 0 && Z > 0 ? H * Z : 0;
          },
          u = function (W) {
            return !!W.closest(
              "[data-dc-editor-overlay],[data-dc-editor-overlay-root],[data-omelette-chrome],[data-omelette-injected]",
            );
          },
          s = i ? document.querySelectorAll("[data-dc-tpl]") : [],
          d = [],
          p = [],
          c = 0;
        c < s.length;
        c++
      ) {
        var g = s[c];
        if (!(_(g) !== i || u(g))) {
          var h = g.getBoundingClientRect(),
            v = h.width * h.height;
          if (v > 0) {
            var x = l(h);
            (x >= 0.85 * o && d.push({ el: g, a: v }),
              x >= 0.7 * v && p.push(g));
          }
        }
      }
      d.sort(function (W, H) {
        return W.a - H.a;
      });
      for (var y = null, m = 0; m < d.length && !y; m++) {
        for (var w = d[m].el, E = !0, C = 0; C < p.length && E; C++)
          p[C] !== w && !w.contains(p[C]) && !p[C].contains(w) && (E = !1);
        E && (y = w);
      }
      for (var S = [], T = 0; T < p.length; T++)
        (!y || (p[T] !== y && y.contains(p[T]))) && S.push(p[T]);
      S.length === 0 && y && p.indexOf(y) >= 0 && S.push(y);
      for (var k = [], L = 0; L < S.length; L++) {
        for (
          var P = S[L], N = !1, F = P.parentElement;
          F && F !== y && !N;
          F = F.parentElement
        )
          S.indexOf(F) >= 0 && (N = !0);
        N || k.push(P);
      }
      for (var q = [], V = 0; V < k.length && q.length < 16; V++) {
        var j = k[V],
          K = j.getBoundingClientRect(),
          J = parseInt(j.getAttribute("data-dc-tpl") || "-1", 10);
        isFinite(J) &&
          J >= 0 &&
          q.push({
            tid: J,
            tag: j.tagName.toLowerCase(),
            rect: { x: K.left, y: K.top, w: K.width, h: K.height },
          });
      }
      return {
        enclosing: y ? pi(y, (t + r) / 2, (e + n) / 2) : null,
        covered: q,
        total: k.length,
      };
    },
    commentRects: function (t) {
      var e = [];
      if (!Array.isArray(t)) return e;
      for (
        var r = _t(), n = r ? r.getAttribute("data-sc-name") : null, a = 0;
        a < t.length && a < 256;
        a++
      ) {
        var i = t[a] || {},
          o = null;
        if (i.page === !0) {
          e.push(ci());
          continue;
        }
        try {
          o = document.querySelector(String(i.path));
        } catch {
          o = null;
        }
        if (i.tid != null && n) {
          var l = z(String(i.tid), n);
          if (!(o && l.indexOf(o) >= 0) && l.length === 1) {
            var u = o && i.fp && fi(o) === i.fp && fi(l[0]) !== i.fp;
            u || (o = l[0]);
          }
        }
        if (!o) {
          e.push(null);
          continue;
        }
        var s = na(o);
        e.push({ x: s.left, y: s.top, w: s.width, h: s.height });
      }
      return e;
    },
    peerRects: function (t, e) {
      var r = [];
      if (!Array.isArray(t)) return r;
      var n = (e && window.scrollX) || 0,
        a = (e && window.scrollY) || 0,
        i = _t(),
        o = i ? i.getAttribute("data-sc-name") : null;
      if (!o) return r;
      for (var l = 0; l < t.length && l < 64; l++) {
        var u = Number(t[l]);
        if (isFinite(u) && u >= 0 && Math.floor(u) === u)
          for (
            var s = mn(String(u), o), d = 0;
            d < s.length && r.length < 256;
            d++
          ) {
            var p = Q(s[d]),
              c = Et(p),
              g = el(p, c, Gn),
              h = ui(g);
            (g !== c &&
              (!(h.width > 0) || !(h.height > 0) || !pe(g)) &&
              ((g = c), (h = ui(g))),
              !(!(h.width > 0) || !(h.height > 0) || !pe(g)) &&
                r.push({
                  i: l,
                  x: h.left + n,
                  y: h.top + a,
                  w: h.width,
                  h: h.height,
                }));
          }
      }
      return r;
    },
    getPanZoom: function () {
      return { x: $.x, y: $.y, z: at };
    },
    setPanZoom: function (t, e, r) {
      (($ = { x: t, y: e }), (at = r), qr());
    },
    repostChrome: function () {
      ((ai = null), Y());
    },
    cancelDrag: function () {
      f && ((Dt = !0), re(!1));
    },
    cancelBox: function (t) {
      ht && ht.gestureKey === t && ((Dt = !0), (ut = null), (U = null), Xr(!0));
    },
    armedByClick: function (t, e) {
      var r = Number(t),
        n = Number(e);
      !isFinite(r) || !isFinite(n) || (fn = { x: r, y: n, t: Date.now() });
    },
    dragModifiers: function (t, e, r) {
      Mo(t, e, r);
    },
    moveStart: function (t, e, r, n, a) {
      if (!/^[0-9a-f]{16}$/.test(String(t)) || b || (I && D !== "select"))
        return null;
      (X && ve(!1), f && re(!1));
      var i = parseInt(e, 10);
      if (!isFinite(i) || i < 0) return null;
      var o = window.__dcRootName && window.__dcRootName();
      if (!o) return null;
      var l = z(String(i), o),
        u = l[0];
      if (
        !u ||
        l.length > 1 ||
        ((u = Qs(u, Et(u))), _(u) !== o || Ee(u) || Ae(u))
      )
        return null;
      var s = Q(u).getBoundingClientRect(),
        d = r == null ? s.left + s.width / 2 : Number(r),
        p = n == null ? s.top + s.height / 2 : Number(n);
      if (!isFinite(d) || !isFinite(p)) return null;
      (Ws(String(t)),
        ar(),
        (U = { el: u, tid: hr(u), name: _(u), x: d, y: p }),
        (ke = null),
        (ut = null));
      var c = !1;
      try {
        c = fs(To(d, p, a));
      } catch {
        c = !1;
      }
      if (!c || !f || f.hostKey !== X.key) return (ve(!1), null);
      var g = [f.tid],
        h = {};
      h[f.tid] = !0;
      var v = function (P) {
        isFinite(P) && !h[P] && ((h[P] = !0), g.push(P));
      };
      if (f.followers)
        for (var x = 0; x < f.followers.length; x++) v(f.followers[x].tid);
      if (f.group) for (var y = 0; y < f.group.length; y++) v(f.group[y].tid);
      if (f.brkFollowers && a && a.ctrl)
        for (var m = 0; m < f.brkFollowers.length; m++)
          v(f.brkFollowers[m].tid);
      for (var w = f.startRect, E = [], C = o, S = 0; S < g.length; S++) {
        var T = z(String(g[S]), C),
          k = T[0];
        if (!(!k || T.length > 1)) {
          var L = Q(k).getBoundingClientRect();
          E.push({
            tid: g[S],
            tag: yn(k),
            rect: { x: L.left, y: L.top, w: L.width, h: L.height },
          });
        }
      }
      return {
        tids: g,
        tag: yn(f.el),
        rect: { x: w.left, y: w.top, w: w.width, h: w.height },
        mode: f.mode,
        members: E,
      };
    },
    moveMove: function (t, e, r, n) {
      !X ||
        X.key !== t ||
        !f ||
        !isFinite(Number(e)) ||
        !isFinite(Number(r)) ||
        e == null ||
        r == null ||
        (ar(), !f.hostParked && Kn(To(e, r, n)));
    },
    moveEnd: function (t, e, r, n) {
      if (!X || X.key !== t) return null;
      if (f && f.hostParked) return (ve(!1), { plan: null, tids: [] });
      f && Kn(To(e, r, n));
      var a = f ? [f.tid] : [],
        i = ve(!0);
      return i
        ? (delete i.type,
          delete i.name,
          delete i.gestureKey,
          delete i.epoch,
          { plan: i, tids: a })
        : { plan: null, tids: a };
    },
    moveCancel: function (t) {
      X && X.key === t && ve(!1);
    },
    moveHost: function (t, e) {
      return /^[0-9a-f]{16}$/.test(String(t))
        ? e === "close"
          ? (X && X.key === t && !f && ve(!1), !0)
          : e !== "open" || b || (I && D !== "select")
            ? !1
            : X && X.key === t
              ? (ar(), !0)
              : (X && ve(!1), f && re(!1), Ws(String(t)), ar(), !0)
        : !1;
    },
    moveExit: function (t) {
      X && X.key === t && f && f.hostKey === t && (ar(), dp());
    },
    moveReturn: function (t) {
      X && X.key === t && f && f.hostKey === t && (ar(), fp());
    },
    moveTouch: function (t) {
      X && X.key === t && ar();
    },
    dropPlanAt: function (t, e, r, n, a) {
      if (
        !X ||
        X.key !== t ||
        b ||
        (ar(),
        (e = Number(e)),
        (r = Number(r)),
        !isFinite(e) ||
          !isFinite(r) ||
          !Array.isArray(n) ||
          n.length === 0 ||
          n.length > 500)
      )
        return null;
      var i = window.__dcRootName && window.__dcRootName();
      if (!i) return null;
      var o = [];
      if (f && f.hostKey === t) {
        var l = An();
        if ((l && o.push(l), f.brkFollowers)) {
          var u = Vl(f);
          if (u) for (var s in u) u[s] && o.push(u[s]);
        }
        if (f.followers)
          for (var d = 0; d < f.followers.length; d++)
            for (var p = ki(f.followers[d], f.name), c = 0; c < p.length; c++)
              o.push(p[c]);
        if (f.group)
          for (var g = 0; g < f.group.length; g++) {
            var h = z(String(f.group[g].tid), i)[0];
            h && o.push(h);
          }
      }
      for (var v = null, x = n[0], y = 0; y < n.length; y++) {
        var m = n[y];
        if (
          !m ||
          typeof m.tag != "string" ||
          !isFinite(Number(m.w)) ||
          !isFinite(Number(m.h)) ||
          !isFinite(Number(m.dx)) ||
          !isFinite(Number(m.dy))
        )
          return null;
        (!v || Number(m.w) * Number(m.h) > v.width * v.height) &&
          (v = {
            left: e - Number(m.w) / 2,
            top: r - Number(m.h) / 2,
            width: Number(m.w),
            height: Number(m.h),
          });
      }
      ((v.right = v.left + v.width), (v.bottom = v.top + v.height));
      var w = a === "keep",
        E = {
          tag: String(x.tag).toUpperCase(),
          origAncestorEls: [],
          startRect: v,
          peerParent: null,
          brk: w,
          followers: null,
          group: null,
          mode: w ? "abs" : "flow",
          hostKey: t,
        },
        C = X.placeholder,
        S =
          C &&
          C.el.isConnected &&
          C.cel.isConnected &&
          !fa(C.cel.getBoundingClientRect(), e, r) &&
          (fa(C.rect, e, r) ||
            (Math.abs(e - C.at.x) <= Yl && Math.abs(r - C.at.y) <= Yl))
            ? C.cel
            : null,
        T = S ? { el: S, tid: hr(S) } : Xl(e, r, E, null, o),
        k =
          C && T && T.el === C.cel
            ? C.rect
            : T && T.el
              ? T.el.getBoundingClientRect()
              : null;
      if (!T || T.invalid)
        return (Je(), Yt(), Se(), { container: null, members: [] });
      var L = T.el;
      if (
        T.tid != null &&
        (Ee(L) || Sn(L) || L.namespaceURI === "http://www.w3.org/2000/svg")
      )
        return (Je(), Yt(), Se(), { container: null, members: [] });
      var P = L.tagName,
        N = [],
        F = C && C.cel === L ? { n: C.n } : null,
        q = w || T.tid == null ? null : Wl(L, T.tid, null, e, r, F, !1, o);
      q && T.tid != null && da(P, String(x.tag).toUpperCase())
        ? Lf(
            L,
            T.tid,
            q.n,
            wn(L, null, o),
            Number(x.w),
            Number(x.h),
            S ? C.at : { x: e, y: r },
            k,
          )
        : Je();
      for (
        var V = L.getBoundingClientRect(),
          j = T.tid != null ? L.clientLeft - L.scrollLeft : 0,
          K = T.tid != null ? L.clientTop - L.scrollTop : 0,
          J = T.tid != null && getComputedStyle(L).position === "static",
          W = 0;
        W < n.length;
        W++
      ) {
        var H = n[W];
        if (!da(P, String(H.tag).toUpperCase())) {
          N.push({ tid: H.tid, refused: "nest" });
          continue;
        }
        w || T.tid == null
          ? N.push({
              tid: H.tid,
              targetTid: T.tid,
              position: T.tid == null ? "root-end" : "into",
              absolute: !0,
              absStyles: {
                left: Math.round(e + Number(H.dx) - V.left - j) + "px",
                top: Math.round(r + Number(H.dy) - V.top - K) + "px",
                width: Math.round(Number(H.w)) + "px",
                height: Math.round(Number(H.h)) + "px",
              },
              parentNeedsPositioning: J,
            })
          : N.push({
              tid: H.tid,
              targetTid: q.targetTid,
              position: q.position,
              absolute: !1,
              parentNeedsPositioning: !1,
            });
      }
      return (
        q ? Ei(L, null, q, o, X.placeholder ? X.placeholder.n : null) : Yt(),
        Di(V, T.tid == null ? "page" : P.toLowerCase()),
        { container: T.tid, members: N }
      );
    },
    dropPlanClear: function (t, e) {
      !X || X.key !== t || (e ? Rf() : Je(), f || (Yt(), Se()));
    },
    moveSettle: function () {
      if (((X && X.placeholder && X.placeholder.cap) || Je(), !f)) {
        Cn();
        for (var t = 0; t < Be.length; t++) Be[t].el.isConnected && Xi(Be[t]);
        ((Be = []), Y());
      }
    },
    exitDrag: function (t, e) {
      f && f.gestureKey === t && uu(!!e);
    },
    finishExitedDrag: function (t) {
      f && f.gestureKey === t && f.exited && ((f.droppedOut = !0), re(!1));
    },
    abortDrag: function (t) {
      f && f.gestureKey === t && re(!1);
    },
    contextMenuAt: function (t, e) {
      !I ||
        D === "interact" ||
        b ||
        (je(!1), yr(!1), M({ type: "contextMenu", x: +t || 0, y: +e || 0 }));
    },
    contextMenuBySelection: function () {
      !I ||
        D === "interact" ||
        b ||
        f ||
        ht ||
        At ||
        B ||
        O ||
        gt ||
        ot ||
        kt ||
        tt ||
        Vs();
    },
    resizeStart: function (t, e, r) {
      gc(String(t), +e, +r);
    },
    resizeMove: function (t, e, r) {
      wc(+t, +e, !!r);
    },
    resizeWith: function (t) {
      if (!(!O || O.rotate || O.group || !t || typeof t != "object")) {
        var e = {};
        (["object-fit", "object-position", "object-view-box"].forEach(
          function (r) {
            typeof t[r] == "string" && t[r].length < 120 && (e[r] = t[r]);
          },
        ),
          (O.extra = e));
      }
    },
    resizeEnd: function (t) {
      je(!!t);
    },
    rotateStart: function (t, e, r) {
      mc(+e, +r);
    },
    rotateMove: function (t, e, r) {
      xc(+t, +e, !!r);
    },
    rotateEnd: function (t) {
      je(!!t);
    },
    endpointStart: function (t, e, r) {
      vc(+t == 1 ? 1 : 0, +e, +r);
    },
    endpointMove: function (t, e, r) {
      hc(+t, +e, !!r);
    },
    endpointEnd: function (t) {
      yr(!!t);
    },
    penPreview: function (t, e) {
      var r = e == null ? null : Du(t);
      if (
        (tt && tt.el !== r && Wr(),
        !(
          !r ||
          typeof e != "string" ||
          !/^[MLCZ\d\s.,-]+$/.test(e) ||
          e.length > 1e5
        ))
      ) {
        var n = xr(r);
        (tt || (tt = { el: r, path: n.path, origD: n.d }),
          n.path.setAttribute("d", e));
      }
    },
    penCommit: function (t, e, r, n, a, i) {
      var o = Du(t);
      if (
        (tt && Wr(),
        !(
          !o ||
          typeof i != "string" ||
          !/^[MLCZ\d\s.,-]+$/.test(i) ||
          i.length > 1e5 ||
          ![e, r, n, a].every(function (p) {
            return typeof p == "number" && isFinite(p);
          })
        ))
      ) {
        var l = o.getBoundingClientRect(),
          u = Oe(o).w / l.width || 1,
          s =
            Math.round(
              ((parseFloat(o.style.left) || 0) + (e - l.left) * u) * 10,
            ) / 10,
          d =
            Math.round(
              ((parseFloat(o.style.top) || 0) + (r - l.top) * u) * 10,
            ) / 10;
        ((n = Math.max(1, Math.round(n))),
          (a = Math.max(1, Math.round(a))),
          (o.style.left = s + "px"),
          (o.style.top = d + "px"),
          (o.style.width = n + "px"),
          (o.style.height = a + "px"),
          o.setAttribute("width", String(n)),
          o.setAttribute("height", String(a)),
          o.setAttribute("viewBox", "0 0 " + n + " " + a),
          xr(o).path.setAttribute("d", i),
          M({
            type: "strokeEndpoint",
            tid: t,
            name: _(o),
            gestureKey: "g" + Date.now(),
            left: s,
            top: d,
            width: n,
            height: a,
            d: i,
            isArrow: !1,
          }),
          Y());
      }
    },
    openPoints: function (t) {
      if (!(
        !I ||
        Tt ||
        D !== "select" ||
        A.length !== 1 ||
        (t != null && A[0] !== t)
      )) {
        var e = z(String(A[0]), R),
          r = e.length ? Ye(e) || e[0] : null;
        if (!(!r || !ee(R))) {
          if (((br = null), !xr(Et(r)) && !Hr(r))) {
            var n =
              (r.tagName || "").toLowerCase() === "svg"
                ? r.querySelector("path[data-dc-tpl]")
                : null;
            if (
              !n ||
              !Hr(n) ||
              !Gn(r, function (a) {
                return a === n;
              })
            ) {
              M({ type: "penDblClick", tid: null });
              return;
            }
            (Ke(n, !1), (br = { svg: r, path: n, kept: !1 }));
          }
          (Wt || ((Wt = !0), Y()),
            M({ type: "penDblClick", tid: A[0], d: Lu(n || r) }));
        }
      }
    },
    penInsert: function (t, e, r, n, a, i, o) {
      if (!(
        !I ||
        Tt ||
        typeof o != "string" ||
        !/^[MLCZ\d\s.,-]+$/.test(o) ||
        o.length > ze ||
        ![t, e, r, n, a, i].every(function (s) {
          return typeof s == "number" && isFinite(s);
        })
      )) {
        var l = Tn(t, e),
          u = l.el ? Lt(l.el) : at || 1;
        ((o = o.replace(/\d+(\.\d+)?/g, function (s) {
          return String(Math.round((s / u) * 1e3) / 1e3);
        })),
          !(o.length > ze) &&
            M({
              type: "insert",
              name: l.name,
              targetTid: l.tid,
              position: l.tid == null ? "root-end" : "into",
              rect: {
                x: Math.round((r - l.rect.left) / u),
                y: Math.round((n - l.rect.top) / u),
                w: Math.max(2, Math.round(a / u)),
                h: Math.max(2, Math.round(i / u)),
              },
              path: { d: o },
            }));
      }
    },
    vecPreview: function (t, e) {
      var r = e == null ? null : Yi(t);
      if (
        (tt && tt.path !== r && Wr(),
        !(
          !r ||
          typeof e != "string" ||
          !/^[MLCZ\d\s.,-]+$/.test(e) ||
          e.length > 1e5
        ))
      ) {
        if (!tt) {
          var n = Et(r);
          ((tt = {
            el: r,
            path: r,
            origD: r.getAttribute("d") || "",
            svg: Ru(n) ? n : null,
            overflow: "",
          }),
            tt.svg && (n.style.overflow = "visible"));
        }
        r.setAttribute("d", e);
      }
    },
    vecCommit: function (t, e) {
      var r = Yi(t, !0);
      if (
        (tt && Wr(),
        !(
          !r ||
          typeof e != "string" ||
          !/^[MLCZ\d\s.,-]+$/.test(e) ||
          e.length > 1e5
        ))
      ) {
        var n = r.getAttribute("d") || "";
        r.setAttribute("d", e);
        var a = Et(r),
          i = a.getBoundingClientRect(),
          o = r.getBoundingClientRect(),
          l = Hi(r, r.getScreenCTM()) / 4,
          u =
            Ru(a) &&
            (o.left - l < i.left - 0.5 ||
              o.top - l < i.top - 0.5 ||
              o.right + l > i.right + 0.5 ||
              o.bottom + l > i.bottom + 0.5);
        (u && (a.style.overflow = "visible"),
          (tr = tr
            .slice(-7)
            .concat({ tid: t, el: r, d: e, was: n, svg: u ? a : null })),
          M({ type: "pathEdit", tid: t, name: _(r), d: e, spill: u }),
          Y());
      }
    },
    scrollPage: function (t, e) {
      (document.scrollingElement || document.documentElement).scrollBy(t, e);
    },
    vecRefused: function (t, e, r) {
      for (
        var n = tr.length - 1;
        n >= 0 && !(tr[n].tid === t && tr[n].d === e);
        n--
      );
      var a = Yi(t, !0) || (n >= 0 ? tr[n].el : null),
        i = typeof r == "string" ? r : n >= 0 ? tr[n].was : null;
      (n >= 0 &&
        tr.splice(n).forEach(function (o) {
          o.svg && (o.svg.style.overflow = "");
        }),
        !(!a || i == null || (e === "" && a.getAttribute("d") === i)) &&
          (tt && Wr(), a.setAttribute("d", i), ku++, Y()));
    },
    setHostScale: function (t) {
      var e = Number(t),
        r = isFinite(e) && e > 0 ? e : 1;
      r !== Lr &&
        ((Lr = r),
        document.documentElement.style.setProperty(
          "--dc-chrome-unit",
          1 / Lr + "px",
        ));
    },
    setTextEditable: function (t, e, r, n, a) {
      ((Vt = {}),
        (Za = {}),
        (me = r || []),
        (Ja = n || {}),
        (Qa = {}),
        (a || []).forEach(function (i) {
          Qa[It(i.tid, e)] = i.targets;
        }),
        (un = !0),
        (t || []).forEach(function (i) {
          var o = typeof i == "number" ? i : i.tid;
          ((Vt[It(o, e)] = !0), i && i.seed != null && (Za[It(o, e)] = i.seed));
        }),
        Ps(),
        Os(),
        ie && ((ie.mapped = !0), go()));
    },
    setDirectiveMap: function (t, e) {
      ((te = t || null), (Br = e || null), Mu(!0), yt());
    },
    setMeasure: function (t) {
      I && sn(t);
    },
    setDeep: function (t) {
      I && Zn(t);
    },
    setReadOnly: function (t) {
      ((Tt = !!t),
        Tt &&
          (D !== "select" && ir.setTool("select"),
          (jt = null),
          (ye = null),
          Tr(),
          b && $t(!1),
          X && ve(!1),
          f && re(!1),
          Mn(!1),
          je(!1),
          yr(!1),
          Yr(!1),
          Ea(!1, !1),
          fu(),
          (Mt = null),
          (At = null),
          Xr(!0),
          We()));
    },
    setTool: function (t, e) {
      var r = Tt ? "select" : t || "select";
      if (
        (D === "draw" && r !== "draw" && Ea(!0, !1),
        e && Wt && br && (br.kept = !0),
        e !== void 0 && !!e !== Wt)
      ) {
        ((Wt = !!e), ir.penPreview(null));
        var n = Wt ? null : br;
        (Wt || (br = null),
          n &&
            n.kept &&
            n.svg.isConnected &&
            A.length === 1 &&
            A[0] === parseInt(n.path.getAttribute("data-dc-tpl"), 10) &&
            R === _(n.path) &&
            Ke(n.svg, !1),
          Y());
      }
      ((D = r),
        D === "select"
          ? document.body.removeAttribute("data-dc-editor-tool")
          : document.body.setAttribute("data-dc-editor-tool", D),
        (document.body.style.cursor = md[D] || ""),
        D !== "rect" &&
          D !== "oval" &&
          D !== "frame" &&
          D !== "grid" &&
          D !== "text" &&
          We(),
        D !== "select" && xe(),
        Nn());
    },
    patchStyle: function (t, e, r, n) {
      if (!(!r || typeof r != "object" || !Array.isArray(e) || !ee(t))) {
        var a = Bt && Bt.name === t && Bt.tids.join(",") === e.join(",");
        ((Bt = {
          name: t,
          tids: e,
          styles: Object.assign(a ? Bt.styles : {}, r),
          token: n || null,
        }),
          Mi(),
          Y());
      }
    },
    holdStyle: function (t, e, r, n) {
      if (!(!r || typeof r != "object" || !Array.isArray(e) || !ee(t))) {
        var a = {};
        (["object-fit", "object-position", "object-view-box"].forEach(
          function (d) {
            typeof r[d] == "string" && r[d].length < 120 && (a[d] = r[d]);
          },
        ),
          (Bt = { name: t, tids: e, styles: a, token: n || null }));
        for (var i = 0; i < e.length; i++)
          for (
            var o = mr[t + "|" + e[i]], l = z(String(e[i]), t), u = 0;
            u < l.length;
            u++
          ) {
            var s = l[u].getAttribute("data-dc-editor-patch");
            if (s && !(o && o.id === s) && Gf(s)) return;
          }
        (Mi(), Y());
      }
    },
    unpatchStyle: function (t, e, r) {
      if (!(!Array.isArray(e) || (Bt && Bt.token !== r))) {
        for (var n = 0; n < e.length; n++) {
          var a = mr[t + "|" + e[n]];
          a && (a.style.cssText = "");
        }
        ((Bt = null), Y());
      }
    },
    setScrubbing: function (t) {
      ((jl = !!t), t || (Bt = null));
    },
    afterPush: Qf,
    dropLeftCopy: Jf,
    setOverlayHidden: function (t) {
      (t
        ? document.body.setAttribute("data-dc-editor-overlay-hidden", "")
        : document.body.removeAttribute("data-dc-editor-overlay-hidden"),
        St && (St.root.style.display = t ? "none" : ""),
        Y());
    },
    startTextEdit: function (t, e, r) {
      var n = z(String(t), e || null);
      if (b && n.indexOf(b.svg || b.el) >= 0) {
        xs(r);
        return;
      }
      n.length > 0 && Fn(n[0], null, null, r);
    },
    resumeTextEdit: function () {
      if (!b) {
        ae(!1);
        return;
      }
      try {
        var t = getSelection();
        t.rangeCount > 0 &&
          !t.isCollapsed &&
          b.el.contains(t.getRangeAt(0).startContainer) &&
          t.collapseToEnd();
      } catch {}
      xs("end");
    },
    textPlacing: function () {
      Pr = performance.now() + 500;
    },
    noteTextInsert: function () {
      for (
        var t = document.querySelectorAll("[data-dc-tpl]"),
          e = new WeakSet(),
          r = 0;
        r < t.length;
        r++
      )
        e.add(t[r]);
      Qr = { n: t.length, at: Date.now(), seen: e };
    },
    startInsertedTextEdit: function (t, e, r, n) {
      ep(t, e, r, n);
    },
    heldTextKey: np,
    dropInsertedTextEdit: function (t) {
      ((Qr = null), t && ie && Date.now() <= ie.until ? (ie.typed = "") : Tr());
    },
    startTextEditAt: function (t, e, r, n) {
      var a = document.elementFromPoint(t, e),
        i = a && a.closest ? a.closest("[data-dc-tpl]") : null,
        o =
          i &&
          dr(i) === i &&
          Vt[It(parseInt(i.getAttribute("data-dc-tpl"), 10), it(i))];
      if (
        (!o && r != null && (i = z(String(r), n || null)[0] || null),
        !(!i || dr(i) !== i))
      ) {
        var l = parseInt(i.getAttribute("data-dc-tpl"), 10);
        Vt[It(l, it(i))] &&
          (qt(),
          (A = [l]),
          (ft = null),
          (R = _(i)),
          yt(),
          Ct(i.tagName.toLowerCase()),
          Fn(i, t, e));
      }
    },
    clearPart: function () {
      ((ft = null), yt());
      var t = A.length === 1 ? z(A[0], R) : [];
      Ct(t.length ? Fe(t[0]) : void 0);
    },
    repaintSelected: function () {
      (yt(),
        ct &&
          ct.isConnected &&
          (ct.setAttribute("data-dc-editor-selected", ""), Y()));
    },
    select: function (t, e, r, n) {
      if (!ht && !(typeof n == "number" && n < Ue)) {
        ((t == null || (Array.isArray(t) && t.length === 0)) &&
          U &&
          !f &&
          ((U = null), (ut = null)),
          qt());
        var a = Array.isArray(t) ? t.slice() : t == null ? [] : [t],
          i = (a.length && e) || null,
          o =
            a.length === A.length &&
            i === R &&
            a.every(function (s, d) {
              return s === A[d];
            });
        if (
          (o || (rr = !1),
          (A = a),
          o || (ft = null),
          (R = i),
          yt(),
          o || Ct(void 0, typeof r == "string" ? r : void 0, !1, !0),
          De)
        ) {
          clearTimeout(ti);
          for (var l in De.s) {
            var u = z(l, De.name)[0];
            u && ((u.scrollTop = De.s[l].t), (u.scrollLeft = De.s[l].l));
          }
          De = null;
        }
      }
    },
    hover: function (t, e) {
      hi(t, e);
    },
    hoverAt: function (t, e, r, n, a) {
      if (!(!Le && !I)) {
        var i = Number(t),
          o = Number(e);
        isFinite(i) && isFinite(o) && (ur = { x: i, y: o });
        var l =
            isFinite(i) && isFinite(o) ? document.elementFromPoint(i, o) : null,
          u = Array.isArray(r)
            ? r.filter(function (p) {
                return typeof p == "number" && isFinite(p);
              })
            : [],
          s = xl(l, n ? "deep" : "plain", u);
        if (!s) {
          ri(!!l && (!!n || di(u)));
          return;
        }
        if (s.page) {
          ri(!0);
          return;
        }
        var d = (!n && yl(s.el, s.hit, a)) || s.el;
        hi(d.getAttribute("data-dc-tpl"), _(d));
      }
    },
    finishEdit: function () {
      return Es();
    },
    repostTextEditState: function () {
      ae(!0);
    },
    format: function (t, e) {
      if (
        !(!b || b.scriptTarget || b.propTarget || b.importTarget || b.svg) &&
        !(e != null && ao() !== e)
      ) {
        var r = qc[t];
        if (r) {
          try {
            b.el.focus();
          } catch {}
          (r(), ae(!0));
        }
      }
    },
    applyLink: function (t) {
      if (b) {
        if (!bt) {
          ir.cancelLinkEdit();
          return;
        }
        var e = null;
        try {
          b.el.focus();
          var r = getSelection(),
            n = bt.commonAncestorContainer,
            a = n && (n.nodeType === 1 ? n : n.parentElement),
            i = a && a.closest ? a.closest("a") : null,
            o = i && b.el !== i && b.el.contains(i) ? i : null,
            l = i && !o ? i : null;
          if (t == null || t === "") {
            var u = bt.collapsed,
              s = null,
              d = null;
            if (!u) {
              d = document.createTextNode("");
              var p = bt.cloneRange();
              (p.collapse(!1),
                p.insertNode(d),
                (s = document.createTextNode("")));
              var c = bt.cloneRange();
              (c.collapse(!0), c.insertNode(s));
            }
            var g = [];
            o && g.push(o);
            for (var h = b.el.querySelectorAll("a"), v = 0; v < h.length; v++)
              g.indexOf(h[v]) === -1 && bt.intersectsNode(h[v]) && g.push(h[v]);
            for (var x = 0; x < g.length; x++) {
              var y = g[x];
              y === b.el || !b.el.contains(y) || zo(y, s, d);
            }
            (s && s.parentNode && s.parentNode.removeChild(s),
              d && d.parentNode && d.parentNode.removeChild(d));
          } else if (o) (o.setAttribute("href", t), b.foreign || (e = o));
          else if (!bt.collapsed && !l) {
            var m = document.createTextNode(""),
              w = bt.cloneRange();
            (w.collapse(!1), w.insertNode(m));
            var E = document.createTextNode(""),
              C = bt.cloneRange();
            (C.collapse(!0), C.insertNode(E));
            for (var S = b.el.querySelectorAll("a"), T = 0; T < S.length; T++) {
              var k = S[T];
              k === b.el ||
                !b.el.contains(k) ||
                (bt.intersectsNode(k) && zo(k, E, m));
            }
            (bt.setStartAfter(E), bt.setEndBefore(m));
            var L = document.createElement("a");
            L.setAttribute("href", t);
            try {
              bt.surroundContents(L);
            } catch {
              var P = bt.extractContents();
              (L.appendChild(P), bt.insertNode(L));
            }
            try {
              r.removeAllRanges();
              var N = document.createRange();
              (N.setStartAfter(L), N.collapse(!0), r.addRange(N));
            } catch {}
            (E.parentNode && E.parentNode.removeChild(E),
              m.parentNode && m.parentNode.removeChild(m),
              b.foreign || (e = L));
          }
        } catch {}
        if (((bt = null), e)) {
          try {
            e.setAttribute("data-dc-link-new", "");
          } catch {}
          $t();
          return;
        }
        ae(!0);
      }
    },
    cancelLinkEdit: function () {
      if (((bt = null), !!b)) {
        try {
          b.el.focus();
        } catch {}
        ae(!0);
      }
    },
    deleteForeign: function () {
      if (!ct || !ct.parentElement) return null;
      (b &&
        (b.el === ct || ct.contains(b.el)) &&
        ((bt = null),
        b.el.removeEventListener("input", Jr),
        b.el.removeEventListener("paste", In),
        document.removeEventListener("selectionchange", Zr),
        b.origCE != null
          ? b.el.setAttribute("contenteditable", b.origCE)
          : b.el.removeAttribute("contenteditable"),
        b.el.removeAttribute("data-dc-editor-editing"),
        co(b.el),
        (b.el.innerHTML = b.startHtml),
        (b = null),
        ae(!1)),
        ct.removeAttribute("data-dc-editor-selected"),
        ct.removeAttribute("data-dc-editor-hover"),
        ct.removeAttribute("data-dc-editor-hover-stroke"));
      var t = {
        tag: ct.tagName.toLowerCase(),
        html: ct.outerHTML.slice(0, 4e3),
        text: (ct.innerText || "").slice(0, 4e3),
      };
      return (ct.parentElement.removeChild(ct), (ct = null), t);
    },
    stampLive: function (t) {
      var e = 0;
      function r(l) {
        if (l.nodeType === 1) {
          if (l.hasAttribute("data-dc-editor-overlay")) return;
          (l.setAttribute("data-dc-tpl", String(e)), e++);
        }
        for (var u = 0; u < l.childNodes.length; u++) r(l.childNodes[u]);
      }
      for (var n = 0; n < document.body.childNodes.length; n++)
        r(document.body.childNodes[n]);
      document.body.setAttribute("data-sc-name", t);
      for (
        var a = document.body.cloneNode(!0),
          i = a.querySelectorAll("[data-dc-editor-overlay]"),
          o = 0;
        o < i.length;
        o++
      )
        i[o].parentNode.removeChild(i[o]);
      return a.innerHTML;
    },
    applyBody: function (t, e) {
      var r = document.scrollingElement || document.documentElement,
        n = r ? r.scrollLeft : 0,
        a = r ? r.scrollTop : 0;
      (b && $t(),
        (document.body.innerHTML = t),
        ir.stampLive(e),
        yt(),
        Y(),
        r && ((r.scrollLeft = n), (r.scrollTop = a)));
    },
    bodySnapshot: function () {
      var t = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };
      function e(n, a, i) {
        if (!(
          n.hasAttribute &&
          (n.hasAttribute("data-dc-editor-overlay-root") ||
            n.hasAttribute("data-dc-editor-overlay") ||
            n.hasAttribute("data-dc-editor-style"))
        )) {
          for (
            var o = "  ".repeat(a),
              l = n.tagName.toLowerCase(),
              u = o + "<" + l,
              s = 0;
            s < n.attributes.length;
            s++
          ) {
            var d = n.attributes[s];
            d.name.indexOf("data-dc-editor-") !== 0 &&
              d.name !== "contenteditable" &&
              (d.name === "data-dc-tpl" ||
                d.name === "data-sc-name" ||
                (d.name === "style" && n === Te()) ||
                ((d.name === "role" ||
                  d.name === "aria-label" ||
                  d.name === "aria-multiline") &&
                  wl(n, d.name) == null) ||
                (u +=
                  " " +
                  d.name +
                  '="' +
                  d.value.replace(/"/g, "&quot;").replace(/\n/g, " ") +
                  '"'));
          }
          if ((i.push(u + ">"), t[n.tagName])) i.push(o + "  \u2026");
          else
            for (var p = 0; p < n.childNodes.length; p++) {
              var c = n.childNodes[p];
              if (c.nodeType === 1) e(c, a + 1, i);
              else if (c.nodeType === 3) {
                var g = c.textContent.replace(/\s+/g, " ").trim();
                g && i.push(o + "  " + g);
              }
            }
          i.push(o + "</" + l + ">");
        }
      }
      var r = [];
      return (
        e(document.body, 0, r),
        r.join(`
`)
      );
    },
    firstTextFont: function () {
      try {
        for (
          var t = document.querySelectorAll("p, label, a"), e = 0;
          e < t.length;
          e++
        ) {
          var r = t[e];
          if (
            !r.closest("[data-dc-editor-overlay],[data-dc-editor-overlay-root]")
          ) {
            var n = r.getBoundingClientRect();
            if (
              !(n.width <= 0 || n.height <= 0) &&
              !(
                n.bottom < 0 ||
                n.top > innerHeight ||
                n.right < 0 ||
                n.left > innerWidth
              )
            )
              return getComputedStyle(r).fontFamily || null;
          }
        }
      } catch {}
      return null;
    },
    inspect: function (t, e, r, n, a, i, o) {
      var l = z(String(t), e || null);
      if (l.length === 0)
        return o
          ? {
              tag: "",
              instances: 0,
              computed: {},
              parent: null,
              rendered: !1,
              missing: !0,
            }
          : null;
      var u = l[0],
        s = getComputedStyle(u),
        d = null;
      if (a) {
        var p = function (w, E) {
          for (var C = {}, S = 0; S < r.length; S++) {
            var T = r[S],
              k = w.style.getPropertyValue(T),
              L = w.style.getPropertyPriority(T);
            if (!k) return null;
            (w.style.removeProperty(T),
              (C[T] = E.getPropertyValue(T)),
              w.style.setProperty(T, k, L));
          }
          return C;
        };
        if (((d = Ql(u, p)), d === void 0 && (d = p(u, s)), !d)) return null;
      }
      for (var c = {}, g = 0; g < r.length; g++) {
        var h = r[g];
        ((c[h] = d ? d[h] : h.indexOf("-") >= 0 ? s.getPropertyValue(h) : s[h]),
          n && /color|fill|stroke/i.test(h) && (c[h] = Ir(c[h])));
      }
      var v = null;
      if (u.parentElement) {
        var x = getComputedStyle(u.parentElement);
        v = { display: x.display, flexDirection: x.flexDirection };
      }
      var y =
          typeof u.checkVisibility == "function"
            ? u.checkVisibility({
                visibilityProperty: !0,
                checkVisibilityCSS: !0,
              })
            : u.getClientRects().length > 0 && s.visibility !== "hidden",
        m = {
          tag: u.tagName.toLowerCase(),
          instances: l.length,
          computed: c,
          parent: v,
          rendered: y,
        };
      return (
        i && (m.ground = Hf(u, s)),
        o &&
          (m.pose =
            s.display === "contents"
              ? { boxless: !0 }
              : y
                ? pf(m.tag, u.offsetWidth, u.offsetHeight, s)
                : null),
        m
      );
    },
    verify: function (t, e, r) {
      var n = {
          parentMismatches: [],
          unknownTids: [],
          missingTids: [],
          orderMismatches: [],
        },
        a = {},
        i = document.querySelectorAll("[data-dc-tpl]");
      function o(L) {
        for (var P = L.parentElement; P;) {
          if (P.hasAttribute("data-sc-name")) return null;
          if (P.hasAttribute("data-dc-tpl") && it(P) === t)
            return parseInt(P.getAttribute("data-dc-tpl"), 10);
          P = P.parentElement;
        }
        return null;
      }
      for (var l = 0; l < i.length; l++) {
        var u = i[l];
        if (!u.closest("[data-dc-editor-overlay]")) {
          var s = u.hasAttribute("data-sc-name")
            ? u.parentElement
              ? it(u.parentElement)
              : null
            : it(u);
          if (s === t) {
            var d = parseInt(u.getAttribute("data-dc-tpl"), 10);
            if (((a[d] = !0), !(d in e))) {
              n.unknownTids.indexOf(d) === -1 && n.unknownTids.push(d);
              continue;
            }
            var p = o(u),
              c = e[d];
            p !== c &&
              n.parentMismatches.push({
                tid: d,
                tag: u.tagName.toLowerCase(),
                expectedParent: c,
                actualParent: p,
              });
          }
        }
      }
      for (var g in e) a[g] || n.missingTids.push(parseInt(g, 10));
      for (
        var h = document.querySelectorAll("[data-dc-tpl]"), v = 0;
        v < h.length;
        v++
      ) {
        var x = h[v];
        if (!(it(x) !== t || x.closest("[data-dc-editor-overlay]"))) {
          var y = parseInt(x.getAttribute("data-dc-tpl"), 10),
            m = r[y];
          if (m) {
            for (var w = [], E = 0; E < x.children.length; E++) {
              var C = x.children[E];
              !C.hasAttribute("data-dc-tpl") ||
                C.closest("[data-dc-editor-overlay]") ||
                w.push(parseInt(C.getAttribute("data-dc-tpl"), 10));
            }
            var S = w.length === new Set(w).size;
            if (S) {
              for (var T = [], k = 0; k < m.length; k++)
                w.indexOf(m[k]) !== -1 && T.push(m[k]);
              if (
                (T.join(",") !== w.join(",") &&
                  n.orderMismatches.push({ parent: y, expected: T, actual: w }),
                n.orderMismatches.length > 5)
              )
                break;
            }
          }
        }
      }
      return n;
    },
  };
  if (
    document.documentElement.hasAttribute("data-dc-frameless") &&
    typeof ResizeObserver == "function"
  ) {
    var Ro = 0,
      Hn = "",
      rd = document.readyState === "complete",
      jr = 0,
      Do = !1,
      Bo = !1,
      yp = /^(STYLE|SCRIPT|LINK|META|TITLE|TEMPLATE|NOSCRIPT)$/,
      Ko = function () {
        for (
          var t = document.querySelectorAll("[data-dc-tpl]"), e = [], r = 0;
          r < t.length;
          r++
        )
          !yp.test(t[r].tagName) &&
            !t[r].closest("[data-dc-editor-overlay]") &&
            e.push(t[r]);
        return e;
      },
      nd = function (t) {
        for (var e = 0, r = 0, n = 0; n < t.length; n++) {
          var a = t[n].getBoundingClientRect();
          (a.width <= 0 && a.height <= 0) ||
            ((e = Math.max(e, a.right + window.scrollX)),
            (r = Math.max(r, a.bottom + window.scrollY)));
        }
        return { w: Math.ceil(e), h: Math.ceil(r) };
      },
      bp = function () {
        if (((Ro = 0), !(at !== 1 || $.x !== 0 || $.y !== 0))) {
          var t = nd(Ko());
          if (t.w <= 0 || t.h <= 0) {
            rd &&
              !jr &&
              (jr = setTimeout(function () {
                jr = 0;
                var n = nd(Ko());
                (n.w <= 0 || n.h <= 0) &&
                  Hn !== "empty" &&
                  ((Hn = "empty"), M({ type: "contentHull", empty: !0 }));
              }, 300));
            return;
          }
          jr && (clearTimeout(jr), (jr = 0));
          var e = t.w + "x" + t.h,
            r = Do && !Bo;
          if (((Do = !1), (Bo = !1), r)) {
            Hn = e;
            return;
          }
          e !== Hn && ((Hn = e), M({ type: "contentHull", w: t.w, h: t.h }));
        }
      },
      qa = function () {
        Ro || (Ro = requestAnimationFrame(bp));
      },
      ad = new ResizeObserver(qa),
      Io = function () {
        ad.disconnect();
        for (var t = Ko(), e = 0; e < t.length; e++) ad.observe(t[e]);
        qa();
      };
    (window.addEventListener("resize", function () {
      ((Do = !0), qa());
    }),
      new MutationObserver(function (t) {
        for (var e = 0; e < t.length; e++) {
          var r = t[e].target;
          if (
            !(r.nodeType === 1 ? r : r.parentElement || document.body).closest(
              "[data-dc-editor-overlay]",
            )
          ) {
            ((Bo = !0), Io());
            return;
          }
        }
      }).observe(document.documentElement, {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0,
        attributeFilter: ["style", "class"],
      }));
    var xp =
      document.fonts && document.fonts.ready
        ? document.fonts.ready
        : Promise.resolve();
    (window.addEventListener("load", function () {
      ((rd = !0), qa());
    }),
      xp.then(Io, Io));
  }
  (document.addEventListener("pointermove", us, { capture: !0, passive: !0 }),
    document.addEventListener(
      "pointerover",
      function (t) {
        t.relatedTarget || us(t);
      },
      { capture: !0, passive: !0 },
    ),
    document.addEventListener(
      "pointerout",
      function (t) {
        t.relatedTarget || Hc();
      },
      { capture: !0, passive: !0 },
    ),
    (window.__dcEditorPicker = ir));
})();
