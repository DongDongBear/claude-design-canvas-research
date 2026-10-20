/*! dom-to-svg v0.12.2 | (c) 2020 Felix Frederick Becker | MIT */
/*! postcss-value-parser v4.2.0 | (c) Bogdan Chadkin | MIT */
/*! gradient-parser v1.2.0 | (c) 2014 Rafael Carício | MIT */
"use strict";
(() => {
  var Ue = Object.create;
  var Ht = Object.defineProperty;
  var We = Object.getOwnPropertyDescriptor;
  var ze = Object.getOwnPropertyNames;
  var He = Object.getPrototypeOf,
    qe = Object.prototype.hasOwnProperty;
  var J = (t, e) => () => {
    try {
      return (e || t((e = { exports: {} }).exports, e), e.exports);
    } catch (r) {
      throw ((e = 0), r);
    }
  };
  var Xe = (t, e, r, i) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let o of ze(e))
        !qe.call(t, o) &&
          o !== r &&
          Ht(t, o, {
            get: () => e[o],
            enumerable: !(i = We(e, o)) || i.enumerable,
          });
    return t;
  };
  var at = (t, e, r) => (
    (r = t != null ? Ue(He(t)) : {}),
    Xe(
      e || !t || !t.__esModule
        ? Ht(r, "default", { value: t, enumerable: !0 })
        : r,
      t,
    )
  );
  var jt = J((Pr, Xt) => {
    var Lt = 40,
      Nt = 41,
      ct = 39,
      It = 34,
      Vt = 92,
      K = 47,
      Pt = 44,
      Tt = 58,
      lt = 42,
      Ze = 117,
      Ke = 85,
      Ye = 43,
      Qe = /^[a-f0-9?-]+$/i;
    Xt.exports = function (t) {
      for (
        var e = [],
          r = t,
          i,
          o,
          s,
          n,
          u,
          p,
          l,
          f,
          a = 0,
          c = r.charCodeAt(a),
          h = r.length,
          x = [{ nodes: e }],
          g = 0,
          m,
          w = "",
          k = "",
          L = "";
        a < h;
      )
        if (c <= 32) {
          i = a;
          do ((i += 1), (c = r.charCodeAt(i)));
          while (c <= 32);
          ((n = r.slice(a, i)),
            (s = e[e.length - 1]),
            c === Nt && g
              ? (L = n)
              : s && s.type === "div"
                ? ((s.after = n), (s.sourceEndIndex += n.length))
                : c === Pt ||
                    c === Tt ||
                    (c === K &&
                      r.charCodeAt(i + 1) !== lt &&
                      (!m ||
                        (m && m.type === "function" && m.value !== "calc")))
                  ? (k = n)
                  : e.push({
                      type: "space",
                      sourceIndex: a,
                      sourceEndIndex: i,
                      value: n,
                    }),
            (a = i));
        } else if (c === ct || c === It) {
          ((i = a),
            (o = c === ct ? "'" : '"'),
            (n = { type: "string", sourceIndex: a, quote: o }));
          do
            if (((u = !1), (i = r.indexOf(o, i + 1)), ~i))
              for (p = i; r.charCodeAt(p - 1) === Vt;) ((p -= 1), (u = !u));
            else ((r += o), (i = r.length - 1), (n.unclosed = !0));
          while (u);
          ((n.value = r.slice(a + 1, i)),
            (n.sourceEndIndex = n.unclosed ? i : i + 1),
            e.push(n),
            (a = i + 1),
            (c = r.charCodeAt(a)));
        } else if (c === K && r.charCodeAt(a + 1) === lt)
          ((i = r.indexOf("*/", a)),
            (n = { type: "comment", sourceIndex: a, sourceEndIndex: i + 2 }),
            i === -1 &&
              ((n.unclosed = !0), (i = r.length), (n.sourceEndIndex = i)),
            (n.value = r.slice(a + 2, i)),
            e.push(n),
            (a = i + 2),
            (c = r.charCodeAt(a)));
        else if (
          (c === K || c === lt) &&
          m &&
          m.type === "function" &&
          m.value === "calc"
        )
          ((n = r[a]),
            e.push({
              type: "word",
              sourceIndex: a - k.length,
              sourceEndIndex: a + n.length,
              value: n,
            }),
            (a += 1),
            (c = r.charCodeAt(a)));
        else if (c === K || c === Pt || c === Tt)
          ((n = r[a]),
            e.push({
              type: "div",
              sourceIndex: a - k.length,
              sourceEndIndex: a + n.length,
              value: n,
              before: k,
              after: "",
            }),
            (k = ""),
            (a += 1),
            (c = r.charCodeAt(a)));
        else if (Lt === c) {
          i = a;
          do ((i += 1), (c = r.charCodeAt(i)));
          while (c <= 32);
          if (
            ((f = a),
            (n = {
              type: "function",
              sourceIndex: a - w.length,
              value: w,
              before: r.slice(f + 1, i),
            }),
            (a = i),
            w === "url" && c !== ct && c !== It)
          ) {
            i -= 1;
            do
              if (((u = !1), (i = r.indexOf(")", i + 1)), ~i))
                for (p = i; r.charCodeAt(p - 1) === Vt;) ((p -= 1), (u = !u));
              else ((r += ")"), (i = r.length - 1), (n.unclosed = !0));
            while (u);
            l = i;
            do ((l -= 1), (c = r.charCodeAt(l)));
            while (c <= 32);
            (f < l
              ? (a !== l + 1
                  ? (n.nodes = [
                      {
                        type: "word",
                        sourceIndex: a,
                        sourceEndIndex: l + 1,
                        value: r.slice(a, l + 1),
                      },
                    ])
                  : (n.nodes = []),
                n.unclosed && l + 1 !== i
                  ? ((n.after = ""),
                    n.nodes.push({
                      type: "space",
                      sourceIndex: l + 1,
                      sourceEndIndex: i,
                      value: r.slice(l + 1, i),
                    }))
                  : ((n.after = r.slice(l + 1, i)), (n.sourceEndIndex = i)))
              : ((n.after = ""), (n.nodes = [])),
              (a = i + 1),
              (n.sourceEndIndex = n.unclosed ? i : a),
              (c = r.charCodeAt(a)),
              e.push(n));
          } else
            ((g += 1),
              (n.after = ""),
              (n.sourceEndIndex = a + 1),
              e.push(n),
              x.push(n),
              (e = n.nodes = []),
              (m = n));
          w = "";
        } else if (Nt === c && g)
          ((a += 1),
            (c = r.charCodeAt(a)),
            (m.after = L),
            (m.sourceEndIndex += L.length),
            (L = ""),
            (g -= 1),
            (x[x.length - 1].sourceEndIndex = a),
            x.pop(),
            (m = x[g]),
            (e = m.nodes));
        else {
          i = a;
          do (c === Vt && (i += 1), (i += 1), (c = r.charCodeAt(i)));
          while (
            i < h &&
            !(
              c <= 32 ||
              c === ct ||
              c === It ||
              c === Pt ||
              c === Tt ||
              c === K ||
              c === Lt ||
              (c === lt && m && m.type === "function" && m.value === "calc") ||
              (c === K && m.type === "function" && m.value === "calc") ||
              (c === Nt && g)
            )
          );
          ((n = r.slice(a, i)),
            Lt === c
              ? (w = n)
              : (Ze === n.charCodeAt(0) || Ke === n.charCodeAt(0)) &&
                  Ye === n.charCodeAt(1) &&
                  Qe.test(n.slice(2))
                ? e.push({
                    type: "unicode-range",
                    sourceIndex: a,
                    sourceEndIndex: i,
                    value: n,
                  })
                : e.push({
                    type: "word",
                    sourceIndex: a,
                    sourceEndIndex: i,
                    value: n,
                  }),
            (a = i));
        }
      for (a = x.length - 1; a; a -= 1)
        ((x[a].unclosed = !0), (x[a].sourceEndIndex = r.length));
      return x[0].nodes;
    };
  });
  var Kt = J((Tr, Zt) => {
    Zt.exports = function t(e, r, i) {
      var o, s, n, u;
      for (o = 0, s = e.length; o < s; o += 1)
        ((n = e[o]),
          i || (u = r(n, o, e)),
          u !== !1 &&
            n.type === "function" &&
            Array.isArray(n.nodes) &&
            t(n.nodes, r, i),
          i && r(n, o, e));
    };
  });
  var te = J((Rr, Jt) => {
    function Yt(t, e) {
      var r = t.type,
        i = t.value,
        o,
        s;
      return e && (s = e(t)) !== void 0
        ? s
        : r === "word" || r === "space"
          ? i
          : r === "string"
            ? ((o = t.quote || ""), o + i + (t.unclosed ? "" : o))
            : r === "comment"
              ? "/*" + i + (t.unclosed ? "" : "*/")
              : r === "div"
                ? (t.before || "") + i + (t.after || "")
                : Array.isArray(t.nodes)
                  ? ((o = Qt(t.nodes, e)),
                    r !== "function"
                      ? o
                      : i +
                        "(" +
                        (t.before || "") +
                        o +
                        (t.after || "") +
                        (t.unclosed ? "" : ")"))
                  : i;
    }
    function Qt(t, e) {
      var r, i;
      if (Array.isArray(t)) {
        for (r = "", i = t.length - 1; ~i; i -= 1) r = Yt(t[i], e) + r;
        return r;
      }
      return Yt(t, e);
    }
    Jt.exports = Qt;
  });
  var re = J((_r, ee) => {
    var ut = 45,
      dt = 43,
      Rt = 46,
      Je = 101,
      tr = 69;
    function er(t) {
      var e = t.charCodeAt(0),
        r;
      if (e === dt || e === ut) {
        if (((r = t.charCodeAt(1)), r >= 48 && r <= 57)) return !0;
        var i = t.charCodeAt(2);
        return r === Rt && i >= 48 && i <= 57;
      }
      return e === Rt
        ? ((r = t.charCodeAt(1)), r >= 48 && r <= 57)
        : e >= 48 && e <= 57;
    }
    ee.exports = function (t) {
      var e = 0,
        r = t.length,
        i,
        o,
        s;
      if (r === 0 || !er(t)) return !1;
      for (
        i = t.charCodeAt(e), (i === dt || i === ut) && e++;
        e < r && ((i = t.charCodeAt(e)), !(i < 48 || i > 57));
      )
        e += 1;
      if (
        ((i = t.charCodeAt(e)),
        (o = t.charCodeAt(e + 1)),
        i === Rt && o >= 48 && o <= 57)
      )
        for (e += 2; e < r && ((i = t.charCodeAt(e)), !(i < 48 || i > 57));)
          e += 1;
      if (
        ((i = t.charCodeAt(e)),
        (o = t.charCodeAt(e + 1)),
        (s = t.charCodeAt(e + 2)),
        (i === Je || i === tr) &&
          ((o >= 48 && o <= 57) ||
            ((o === dt || o === ut) && s >= 48 && s <= 57)))
      )
        for (
          e += o === dt || o === ut ? 3 : 2;
          e < r && ((i = t.charCodeAt(e)), !(i < 48 || i > 57));
        )
          e += 1;
      return { number: t.slice(0, e), unit: t.slice(e) };
    };
  });
  var tt = J((Dr, oe) => {
    var rr = jt(),
      ie = Kt(),
      ne = te();
    function U(t) {
      return this instanceof U ? ((this.nodes = rr(t)), this) : new U(t);
    }
    U.prototype.toString = function () {
      return Array.isArray(this.nodes) ? ne(this.nodes) : "";
    };
    U.prototype.walk = function (t, e) {
      return (ie(this.nodes, t, e), this);
    };
    U.unit = re();
    U.walk = ie;
    U.stringify = ne;
    oe.exports = U;
  });
  var je = {
    walkDecls() {},
    walkAtRules() {},
    toString() {
      return "";
    },
  };
  function st() {
    return je;
  }
  var Ut = at(tt(), 1);
  var ae = (t) => t.type === CSSRule.FONT_FACE_RULE,
    _t = (t) =>
      t.displayOutside === "inline" || t.display.startsWith("inline-"),
    et = (t) => t.position !== "static",
    Dt = (t) =>
      t.float !== "none" && t.position !== "absolute" && t.position !== "fixed",
    gt = (t) => t === "transparent" || t === "rgba(0, 0, 0, 0)",
    ht = (t) =>
      parseFloat(t.borderTopWidth) !== 0 &&
      t.borderTopStyle !== "none" &&
      t.borderTopStyle !== "inset" &&
      t.borderTopStyle !== "outset" &&
      !gt(t.borderTopColor) &&
      t.borderTopWidth === t.borderLeftWidth &&
      t.borderTopWidth === t.borderRightWidth &&
      t.borderTopWidth === t.borderBottomWidth &&
      t.borderTopColor === t.borderLeftColor &&
      t.borderTopColor === t.borderRightColor &&
      t.borderTopColor === t.borderBottomColor &&
      t.borderTopStyle === t.borderLeftStyle &&
      t.borderTopStyle === t.borderRightStyle &&
      t.borderTopStyle === t.borderBottomStyle,
    ir = ["top", "bottom", "right", "left"],
    pt = (t) => t === "bottom" || t === "top",
    ft = {
      top: ["left", "right"],
      bottom: ["left", "right"],
      left: ["top", "bottom"],
      right: ["top", "bottom"],
    };
  function mt(t, e, r) {
    var i, o, s, n;
    let [u, p] = e
        .getPropertyValue(
          pt(t)
            ? `border-${t}-${ft[t][0]}-radius`
            : `border-${ft[t][0]}-${t}-radius`,
        )
        .split(" "),
      [l, f] = e
        .getPropertyValue(
          pt(t)
            ? `border-${t}-${ft[t][1]}-radius`
            : `border-${ft[t][1]}-${t}-radius`,
        )
        .split(" ");
    return pt(t)
      ? [
          (i = T(u || "0px", r.width)) !== null && i !== void 0 ? i : 0,
          (o = T(l || "0px", r.width)) !== null && o !== void 0 ? o : 0,
        ]
      : [
          (s = T(p || u || "0px", r.height)) !== null && s !== void 0 ? s : 0,
          (n = T(f || l || "0px", r.height)) !== null && n !== void 0 ? n : 0,
        ];
  }
  var se = (t, e) =>
      Math.min(
        ...ir.map((r) => {
          let i = pt(r) ? e.width : e.height,
            o = mt(r, t, e).reduce((s, n) => s + n, 0);
          return i / o;
        }),
        1,
      ),
    rt = (t) =>
      t.displayOutside !== "none" &&
      t.display !== "none" &&
      t.visibility !== "hidden" &&
      t.opacity !== "0";
  function T(t, e) {
    if (t.endsWith("px")) return parseFloat(t);
    if (t.endsWith("%")) return (parseFloat(t) / 100) * e;
  }
  var H = (t) =>
    t
      .replace(/\\([\da-f]{1,2})/gi, (e, r) =>
        String.fromCodePoint(parseInt(r, 16)),
      )
      .replace(/\\(.)/g, "$1");
  function ce(t, e) {
    for (let r of t)
      e.setProperty(r, t.getPropertyValue(r), t.getPropertyPriority(r));
  }
  var y = "http://www.w3.org/2000/svg",
    le = "http://www.w3.org/1999/xlink",
    nr = "http://www.w3.org/1999/xhtml",
    vt = (t) => t.nodeType === Node.ELEMENT_NODE,
    bt = (t) => t.nodeType === Node.TEXT_NODE;
  var W = (t) => t.namespaceURI === y,
    St = (t) => W(t) && t.tagName === "svg",
    Mt = (t) => W(t) && "getCTM" in t && "getScreenCTM" in t;
  var ue = (t) => W(t) && t.tagName === "a",
    de = (t) => W(t) && "textLength" in t,
    fe = (t) => t.tagName === "image" && W(t),
    pe = (t) => t.tagName === "style" && W(t),
    O = (t) => t.namespaceURI === nr,
    ge = (t) => t.tagName === "A" && O(t);
  var he = (t) => t.tagName === "IMG" && O(t),
    me = (t) => t.tagName === "INPUT" && O(t),
    ve = (t) => "labels" in t;
  var or = new Set([
    "clipPath",
    "contain",
    "filter",
    "isolation",
    "mask",
    "maskBorder",
    "maskImage",
    "mixBlendMode",
    "opacity",
    "perspective",
    "position",
    "transform",
    "webkitOverflowScrolling",
    "zIndex",
  ]);
  function it(t, e) {
    return !!(
      ((t.position === "absolute" || t.position === "relative") &&
        t.zIndex !== "auto") ||
      t.position === "fixed" ||
      t.position === "sticky" ||
      (e &&
        (e.display === "flex" || e.display === "grid") &&
        t.zIndex !== "auto") ||
      parseFloat(t.opacity) !== 1 ||
      t.mixBlendMode !== "normal" ||
      t.transform !== "none" ||
      t.filter !== "none" ||
      t.perspective !== "none" ||
      t.clipPath !== "none" ||
      t.mask !== "none" ||
      t.maskImage !== "none" ||
      t.maskBorder !== "none" ||
      t.isolation === "isolate" ||
      t.webkitOverflowScrolling === "touch" ||
      t.contain === "layout" ||
      t.contain === "paint" ||
      t.contain === "strict" ||
      t.contain === "content" ||
      t.willChange.split(",").some((r) => or.has(r.trim()))
    );
  }
  var ar = [
    "rootBackgroundAndBorders",
    "childStackingContextsWithNegativeStackLevels",
    "inFlowNonInlineNonPositionedDescendants",
    "nonPositionedFloats",
    "inFlowInlineLevelNonPositionedDescendants",
    "childStackingContextsWithStackLevelZeroAndPositionedDescendantsWithStackLevelZero",
    "childStackingContextsWithPositiveStackLevels",
  ];
  function q(t, e) {
    let r = t.ownerDocument.createElementNS(y, "g");
    return ((r.dataset.stackingLayer = e), t.append(r), r);
  }
  function xt(t) {
    return (
      (t.dataset.stackingContext = "true"),
      {
        rootBackgroundAndBorders: q(t, "rootBackgroundAndBorders"),
        childStackingContextsWithNegativeStackLevels: q(
          t,
          "childStackingContextsWithNegativeStackLevels",
        ),
        inFlowNonInlineNonPositionedDescendants: q(
          t,
          "inFlowNonInlineNonPositionedDescendants",
        ),
        nonPositionedFloats: q(t, "nonPositionedFloats"),
        inFlowInlineLevelNonPositionedDescendants: q(
          t,
          "inFlowInlineLevelNonPositionedDescendants",
        ),
        childStackingContextsWithStackLevelZeroAndPositionedDescendantsWithStackLevelZero:
          q(
            t,
            "childStackingContextsWithStackLevelZeroAndPositionedDescendantsWithStackLevelZero",
          ),
        childStackingContextsWithPositiveStackLevels: q(
          t,
          "childStackingContextsWithPositiveStackLevels",
        ),
      }
    );
  }
  function Se(t, e) {
    let r = t.zIndex !== "auto" ? parseInt(t.zIndex, 10) : void 0;
    if (r !== void 0 && r < 0 && it(t, e))
      return "childStackingContextsWithNegativeStackLevels";
    if (Dt(t) && !_t(t) && !et(t))
      return "inFlowNonInlineNonPositionedDescendants";
    if (!et(t) && t.float !== "none") return "nonPositionedFloats";
    if (Dt(t) && _t(t) && !et(t))
      return "inFlowInlineLevelNonPositionedDescendants";
    if (r === 0 && (et(t) || it(t, e)))
      return "childStackingContextsWithStackLevelZeroAndPositionedDescendantsWithStackLevelZero";
    if (r !== void 0 && r > 0 && it(t, e))
      return "childStackingContextsWithPositiveStackLevels";
  }
  function be(t) {
    let e = [...t.children].sort((r, i) => {
      let o = r.dataset.zIndex,
        s = i.dataset.zIndex;
      return !o || !s ? 0 : parseInt(o, 10) - parseInt(s, 10);
    });
    for (let r of e) t.append(r);
  }
  function xe(t) {
    (be(t.childStackingContextsWithNegativeStackLevels),
      be(t.childStackingContextsWithPositiveStackLevels));
  }
  function ye(t) {
    for (let e of ar) {
      let r = t[e];
      r.hasChildNodes() || r.remove();
    }
  }
  var wt = at(tt(), 1);
  var we = (t) =>
    !t.closest(
      'article, aside, main, nav, section, [role="article"], [role="complementary"], [role="main"], [role="navigation"], [role="region"]',
    );
  function Ae(t, { labels: e, getUniqueId: r }) {
    var i, o, s;
    let n = new Map();
    switch (t.tagName) {
      case "A":
        n.set("role", "link");
        break;
      case "ARTICLE":
        n.set("role", "article");
        break;
      case "ASIDE":
        n.set("role", "complementary");
        break;
      case "BODY":
        n.set("role", "document");
        break;
      case "BUTTON":
      case "SUMMARY":
        n.set("role", "button");
        break;
      case "DD":
        n.set("role", "definition");
        break;
      case "DETAILS":
        n.set("role", "group");
        break;
      case "DFN":
        n.set("role", "term");
        break;
      case "DIALOG":
        n.set("role", "dialog");
        break;
      case "DT":
        n.set("role", "term");
        break;
      case "FIELDSET":
        n.set("role", "group");
        break;
      case "FIGURE":
        n.set("role", "figure");
        break;
      case "FOOTER":
        we(t) && n.set("role", "contentinfo");
        break;
      case "FORM":
        n.set("role", "form");
        break;
      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        (n.set("role", "heading"), n.set("aria-level", t.tagName.slice(1)));
        break;
      case "HEADER":
        we(t) && n.set("role", "banner");
        break;
      case "HR":
        n.set("role", "separator");
        break;
      case "IMG": {
        let l = t.getAttribute("alt");
        (l === null || l !== "") &&
          (n.set("role", "img"), l && n.set("aria-label", l));
        break;
      }
      case "INPUT":
        switch (t.type) {
          case "button":
          case "image":
          case "reset":
          case "submit":
            n.set("role", "button");
            break;
          case "number":
            n.set("role", "spinbutton");
            break;
          case "range":
            n.set("role", "slider");
            break;
          case "checkbox":
            n.set("role", "checkbox");
            break;
          case "radio":
            n.set("role", "radio");
            break;
          case "email":
          case "tel":
            t.hasAttribute("list") || n.set("role", "textbox");
            break;
        }
        break;
      case "LI":
        (((i = t.parentElement) === null || i === void 0
          ? void 0
          : i.tagName) === "OL" ||
          ((o = t.parentElement) === null || o === void 0
            ? void 0
            : o.tagName) === "UL" ||
          ((s = t.parentElement) === null || s === void 0
            ? void 0
            : s.tagName) === "MENU") &&
          n.set("role", "listitem");
        break;
      case "LINK":
        t.href && n.set("role", "link");
        break;
      case "MAIN":
        n.set("role", "main");
        break;
      case "MATH":
        n.set("role", "math");
        break;
      case "OL":
      case "UL":
      case "MENU":
        n.set("role", "list");
        break;
      case "NAV":
        n.set("role", "navigation");
        break;
      case "OPTION":
        n.set("role", "option");
        break;
      case "PROGRESS":
        n.set("role", "progressbar");
        break;
      case "SECTION":
        n.set("role", "region");
        break;
      case "SELECT":
        n.set(
          "role",
          !t.hasAttribute("multiple") && t.size <= 1 ? "combobox" : "listbox",
        );
        break;
      case "TABLE":
        n.set("role", "table");
        break;
      case "THEAD":
      case "TBODY":
      case "TFOOT":
        n.set("role", "rowgroup");
        break;
      case "TEXTAREA":
        n.set("role", "textbox");
        break;
      case "TD":
        n.set("role", "cell");
        break;
      case "TH":
        n.set("role", t.closest("thead") ? "columnheader" : "rowheader");
        break;
      case "TR":
        n.set("role", "tablerow");
        break;
    }
    (t.hasAttribute("disabled") && n.set("aria-disabled", "true"),
      t.hasAttribute("placeholder") &&
        n.set("aria-placeholder", t.getAttribute("placeholder") || ""));
    let u = t.getAttribute("tabindex");
    (u && n.set("tabindex", u),
      O(t) &&
        ve(t) &&
        t.labels &&
        n.set(
          "aria-labelledby",
          [...t.labels]
            .map((l) => {
              let f = l.id || e.get(l);
              return (f || ((f = r("label")), e.set(l, f)), f);
            })
            .join(" "),
        ));
    for (let l of t.attributes)
      l.name.startsWith("aria-") && n.set(l.name, l.value);
    let p = t.getAttribute("role");
    return (p && n.set("role", p), n);
  }
  var B = B || {};
  B.stringify = (function () {
    var t = {
      "visit_linear-gradient": function (e) {
        return t.visit_gradient(e);
      },
      "visit_repeating-linear-gradient": function (e) {
        return t.visit_gradient(e);
      },
      "visit_radial-gradient": function (e) {
        return t.visit_gradient(e);
      },
      "visit_repeating-radial-gradient": function (e) {
        return t.visit_gradient(e);
      },
      "visit_conic-gradient": function (e) {
        return t.visit_gradient(e);
      },
      "visit_repeating-conic-gradient": function (e) {
        return t.visit_gradient(e);
      },
      visit_gradient: function (e) {
        var r = t.visit(e.orientation);
        return (
          r && (r += ", "),
          e.type + "(" + r + t.visit(e.colorStops) + ")"
        );
      },
      visit_shape: function (e) {
        var r = e.value,
          i = t.visit(e.at),
          o = t.visit(e.style);
        return (o && (r += " " + o), i && (r += " at " + i), r);
      },
      "visit_default-radial": function (e) {
        var r = "",
          i = t.visit(e.at);
        return (i && (e.hasAtKeyword ? (r += "at " + i) : (r += i)), r);
      },
      "visit_extent-keyword": function (e) {
        var r = e.value,
          i = t.visit(e.at);
        return (i && (r += " at " + i), r);
      },
      "visit_position-keyword": function (e) {
        return e.value;
      },
      visit_position: function (e) {
        return t.visit(e.value.x) + " " + t.visit(e.value.y);
      },
      "visit_%": function (e) {
        return e.value + "%";
      },
      visit_em: function (e) {
        return e.value + "em";
      },
      visit_px: function (e) {
        return e.value + "px";
      },
      visit_rem: function (e) {
        return e.value + "rem";
      },
      visit_vw: function (e) {
        return e.value + "vw";
      },
      visit_vh: function (e) {
        return e.value + "vh";
      },
      visit_vmin: function (e) {
        return e.value + "vmin";
      },
      visit_vmax: function (e) {
        return e.value + "vmax";
      },
      visit_ch: function (e) {
        return e.value + "ch";
      },
      visit_ex: function (e) {
        return e.value + "ex";
      },
      visit_calc: function (e) {
        return "calc(" + e.value + ")";
      },
      visit_literal: function (e) {
        return t.visit_color(e.value, e);
      },
      visit_hex: function (e) {
        return t.visit_color("#" + e.value, e);
      },
      visit_rgb: function (e) {
        return t.visit_color("rgb(" + e.value.join(", ") + ")", e);
      },
      visit_rgba: function (e) {
        return t.visit_color("rgba(" + e.value.join(", ") + ")", e);
      },
      visit_hsl: function (e) {
        return t.visit_color(
          "hsl(" + e.value[0] + ", " + e.value[1] + "%, " + e.value[2] + "%)",
          e,
        );
      },
      visit_hsla: function (e) {
        return t.visit_color(
          "hsla(" +
            e.value[0] +
            ", " +
            e.value[1] +
            "%, " +
            e.value[2] +
            "%, " +
            e.value[3] +
            ")",
          e,
        );
      },
      visit_var: function (e) {
        return t.visit_color("var(" + e.value + ")", e);
      },
      visit_color: function (e, r) {
        var i = e,
          o = t.visit(r.length);
        o && (i += " " + o);
        var s = t.visit(r.length2);
        return (s && (i += " " + s), i);
      },
      visit_angular: function (e) {
        return e.value + (e.unit || "deg");
      },
      visit_directional: function (e) {
        return "to " + e.value;
      },
      visit_conic: function (e) {
        var r = "";
        return (
          e.angle && (r += "from " + t.visit(e.angle)),
          e.at && (r && (r += " "), (r += "at " + t.visit(e.at))),
          r
        );
      },
      visit_array: function (e) {
        var r = "",
          i = e.length;
        return (
          e.forEach(function (o, s) {
            ((r += t.visit(o)), s < i - 1 && (r += ", "));
          }),
          r
        );
      },
      visit_object: function (e) {
        return e.width && e.height
          ? t.visit(e.width) + " " + t.visit(e.height)
          : "";
      },
      visit: function (e) {
        if (!e) return "";
        var r = "";
        if (e instanceof Array) return t.visit_array(e);
        if (typeof e == "object" && !e.type) return t.visit_object(e);
        if (e.type) {
          var i = t["visit_" + e.type];
          if (i) return i(e);
          throw Error("Missing visitor visit_" + e.type);
        } else throw Error("Invalid node.");
      },
    };
    return function (e) {
      return t.visit(e);
    };
  })();
  var B = B || {};
  B.parse = (function () {
    var t = {
        linearGradient: /^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,
        repeatingLinearGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,
        radialGradient: /^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,
        repeatingRadialGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,
        conicGradient: /^(\-(webkit|o|ms|moz)\-)?(conic\-gradient)/i,
        repeatingConicGradient:
          /^(\-(webkit|o|ms|moz)\-)?(repeating\-conic\-gradient)/i,
        sideOrCorner:
          /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
        extentKeywords:
          /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
        positionKeywords: /^(left|center|right|top|bottom)/i,
        pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
        percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
        emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
        remValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))rem/,
        vwValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))vw/,
        vhValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))vh/,
        vminValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))vmin/,
        vmaxValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))vmax/,
        chValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))ch/,
        exValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))ex/,
        angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
        radianValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))rad/,
        gradianValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))grad/,
        turnValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))turn/,
        startCall: /^\(/,
        endCall: /^\)/,
        comma: /^,/,
        slash: /^\//,
        hexColor:
          /^\#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9a-fA-F])/,
        literalColor: /^([a-zA-Z]+)/,
        rgbColor: /^rgb/i,
        rgbaColor: /^rgba/i,
        varColor: /^var/i,
        calcValue: /^calc/i,
        variableName: /^(--[a-zA-Z0-9-,\s\#]+)/,
        number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/,
        hslColor: /^hsl/i,
        hslaColor: /^hsla/i,
      },
      e = "";
    function r(d) {
      var v = new Error(e + ": " + d);
      throw ((v.source = e), v);
    }
    function i() {
      var d = o();
      return (e.length > 0 && r("Invalid input not EOF"), d);
    }
    function o() {
      return M(s);
    }
    function s() {
      return (
        n("linear-gradient", t.linearGradient, p) ||
        n("repeating-linear-gradient", t.repeatingLinearGradient, p) ||
        n("radial-gradient", t.radialGradient, x) ||
        n("repeating-radial-gradient", t.repeatingRadialGradient, x) ||
        n("conic-gradient", t.conicGradient, l) ||
        n("repeating-conic-gradient", t.repeatingConicGradient, l)
      );
    }
    function n(d, v, S) {
      return u(v, function (A) {
        var I = S();
        return (
          I && (E(t.comma) || r("Missing comma before color stops")),
          { type: d, orientation: I, colorStops: M(_) }
        );
      });
    }
    function u(d, v) {
      var S = E(d);
      if (S) {
        E(t.startCall) || r("Missing (");
        var A = v(S);
        return (E(t.endCall) || r("Missing )"), A);
      }
    }
    function p() {
      var d = a();
      if (d) return d;
      var v = P("position-keyword", t.positionKeywords, 1);
      return v ? { type: "directional", value: v.value } : c();
    }
    function l() {
      var d = f(),
        v = L();
      if (d || v) return { type: "conic", angle: d || void 0, at: v || void 0 };
    }
    function f() {
      if (P("from", /^from/, 0)) {
        var d = c();
        return (d || r('Missing angle after "from" in conic-gradient'), d);
      }
    }
    function a() {
      return P("directional", t.sideOrCorner, 1);
    }
    function c() {
      return (
        h("deg", t.angleValue) ||
        h("rad", t.radianValue) ||
        h("grad", t.gradianValue) ||
        h("turn", t.turnValue)
      );
    }
    function h(d, v) {
      var S = E(v);
      if (S) return { type: "angular", value: S[1], unit: d };
    }
    function x() {
      var d,
        v = g(),
        S;
      return (
        v &&
          ((d = []),
          d.push(v),
          (S = e),
          E(t.comma) && ((v = g()), v ? d.push(v) : (e = S))),
        d
      );
    }
    function g() {
      var d = m() || w();
      if (d) d.at = L();
      else {
        var v = k();
        if (v) {
          d = v;
          var S = L();
          S && (d.at = S);
        } else {
          var A = L();
          if (A) d = { type: "default-radial", at: A, hasAtKeyword: !0 };
          else {
            var I = C();
            I && (d = { type: "default-radial", at: I });
          }
        }
      }
      return d;
    }
    function m() {
      var d = P("shape", /^(circle)/i, 0);
      return (d && (d.style = zt() || k()), d);
    }
    function w() {
      var d = P("shape", /^(ellipse)/i, 0);
      return (d && (d.style = C() || Q() || k()), d);
    }
    function k() {
      return P("extent-keyword", t.extentKeywords, 1);
    }
    function L() {
      if (P("position", /^at/, 0)) {
        var d = C();
        return (d || r("Missing positioning value"), d);
      }
    }
    function C() {
      var d = R();
      if (d.x || d.y) return { type: "position", value: d };
    }
    function R() {
      return { x: Q(), y: Q() };
    }
    function M(d) {
      var v = d(),
        S = [];
      if (v)
        for (S.push(v); E(t.comma);)
          ((v = d()), v ? S.push(v) : r("One extra comma"));
      return S;
    }
    function _() {
      var d = b();
      return (
        d || r("Expected color definition"),
        (d.length = Q()),
        d.length && (d.length2 = Q()),
        d
      );
    }
    function b() {
      return N() || Oe() || Ge() || Z() || G() || Y() || V();
    }
    function V() {
      return P("literal", t.literalColor, 0);
    }
    function N() {
      return P("hex", t.hexColor, 1);
    }
    function G() {
      return u(t.rgbColor, function () {
        return $("rgb");
      });
    }
    function Z() {
      return u(t.rgbaColor, function () {
        return $("rgba");
      });
    }
    function $(d) {
      var v = D();
      if (E(t.comma)) {
        var S = D();
        E(t.comma);
        var A = D(),
          I = [v, S, A];
        return E(t.comma)
          ? (I.push(D()), { type: "rgba", value: I })
          : { type: d, value: I };
      } else {
        var S = D(),
          A = D(),
          I = [v, S, A];
        return E(t.slash)
          ? (I.push(D()), { type: "rgba", value: I })
          : { type: d, value: I };
      }
    }
    function Y() {
      return u(t.varColor, function () {
        return { type: "var", value: Be() };
      });
    }
    function Ge() {
      return u(t.hslColor, function () {
        return Wt("hsl");
      });
    }
    function Oe() {
      return u(t.hslaColor, function () {
        return Wt("hsla");
      });
    }
    function Wt(d) {
      var v = E(t.percentageValue);
      v &&
        r(
          "HSL hue value must be a number in degrees (0-360) or normalized (-360 to 360), not a percentage",
        );
      var S = D();
      if (E(t.comma)) {
        var A = E(t.percentageValue),
          I = A ? A[1] : null;
        (E(t.comma), (A = E(t.percentageValue)));
        var z = A ? A[1] : null;
        if (
          ((!I || !z) &&
            r("Expected percentage value for saturation and lightness in HSL"),
          E(t.comma))
        ) {
          var Et = D();
          return { type: "hsla", value: [S, I, z, Et] };
        }
        return { type: d, value: [S, I, z] };
      } else {
        var A = E(t.percentageValue),
          I = A ? A[1] : null;
        A = E(t.percentageValue);
        var z = A ? A[1] : null;
        if (
          ((!I || !z) &&
            r("Expected percentage value for saturation and lightness in HSL"),
          E(t.slash))
        ) {
          var Et = D();
          return { type: "hsla", value: [S, I, z, Et] };
        }
        return { type: d, value: [S, I, z] };
      }
    }
    function Ir() {
      var d = E(t.percentageValue);
      return d ? d[1] : null;
    }
    function Be() {
      return E(t.variableName)[1];
    }
    function D() {
      return E(t.number)[1];
    }
    function Q() {
      return P("%", t.percentageValue, 1) || Fe() || $e() || zt();
    }
    function Fe() {
      return P("position-keyword", t.positionKeywords, 1);
    }
    function $e() {
      return u(t.calcValue, function () {
        for (var d = 1, v = 0; d > 0 && v < e.length;) {
          var S = e.charAt(v);
          (S === "(" ? d++ : S === ")" && d--, v++);
        }
        d > 0 && r("Missing closing parenthesis in calc() expression");
        var A = e.substring(0, v - 1);
        return (Ct(v - 1), { type: "calc", value: A });
      });
    }
    function zt() {
      return (
        P("px", t.pixelValue, 1) ||
        P("em", t.emValue, 1) ||
        P("rem", t.remValue, 1) ||
        P("vw", t.vwValue, 1) ||
        P("vh", t.vhValue, 1) ||
        P("vmin", t.vminValue, 1) ||
        P("vmax", t.vmaxValue, 1) ||
        P("ch", t.chValue, 1) ||
        P("ex", t.exValue, 1)
      );
    }
    function P(d, v, S) {
      var A = E(v);
      if (A) return { type: d, value: A[S] };
    }
    function E(d) {
      var v, S;
      return (
        (S = /^[\n\r\t\s]+/.exec(e)),
        S && Ct(S[0].length),
        (v = d.exec(e)),
        v && Ct(v[0].length),
        v
      );
    }
    function Ct(d) {
      e = e.substring(d);
    }
    return function (d) {
      return (
        (e = d.toString().trim()),
        e.endsWith(";") && (e = e.slice(0, -1)),
        i()
      );
    };
  })();
  var ke = B.parse,
    Wr = B.stringify,
    zr = { parse: B.parse, stringify: B.stringify };
  var cr = (t) => {
    let e = { x1: "0%", x2: "0%", y1: "0%", y2: "0%" };
    if (t?.type === "angular") {
      let r = t.value * (Math.PI / 180);
      ((e.x1 = `${Math.round(50 + Math.sin(r + Math.PI) * 50)}%`),
        (e.y1 = `${Math.round(50 + Math.cos(r) * 50)}%`),
        (e.x2 = `${Math.round(50 + Math.sin(r) * 50)}%`),
        (e.y2 = `${Math.round(50 + Math.cos(r + Math.PI) * 50)}%`));
    } else if (t?.type === "directional")
      switch (t.value) {
        case "left":
          e.x1 = "100%";
          break;
        case "top":
          e.y1 = "100%";
          break;
        case "right":
          e.x2 = "100%";
          break;
        case "bottom":
          e.y2 = "100%";
          break;
      }
    return e;
  };
  function Ce(t, { svgDocument: e }) {
    let { orientation: r, colorStops: i } = ke(t)[0],
      { x1: o, x2: s, y1: n, y2: u } = cr(r),
      p = (f, a) => {
        let c = `${(a / (i.length - 1)) * 100}%`,
          h = "rgb(0,0,0)",
          x = 1;
        switch (f.type) {
          case "rgb": {
            let [m, w, k] = f.value;
            h = `rgb(${m},${w},${k})`;
            break;
          }
          case "rgba": {
            let [m, w, k, L] = f.value;
            ((h = `rgb(${m},${w},${k})`), (x = L));
            break;
          }
          case "hex": {
            h = `#${f.value}`;
            break;
          }
          case "literal": {
            h = f.value;
            break;
          }
        }
        let g = e.createElementNS(y, "stop");
        return (
          g.setAttribute("offset", c),
          g.setAttribute("stop-color", h),
          g.setAttribute("stop-opacity", x.toString()),
          g
        );
      },
      l = e.createElementNS(y, "linearGradient");
    return (
      l.setAttribute("x1", o),
      l.setAttribute("y1", n),
      l.setAttribute("x2", s),
      l.setAttribute("y2", u),
      l.append(...i.map(p)),
      l
    );
  }
  var Bt = at(tt(), 1);
  var Ee = () => {
    let t = new Map();
    return (e) => {
      var r;
      let i = (r = t.get(e)) !== null && r !== void 0 ? r : 1;
      return (t.set(e, i + 1), `${e}${i}`);
    };
  };
  var yt = (t, e) =>
    !(
      t.bottom < e.top ||
      t.top > e.bottom ||
      t.right < e.left ||
      t.left > e.right
    );
  function Le(t) {
    return Math.sqrt(t.width ** 2 + t.height ** 2);
  }
  function Gt(t, e, r) {
    return Promise.race([
      r(),
      new Promise((i, o) => setTimeout(() => o(new Error(e)), t)),
    ]);
  }
  var Ot = (t, e) => (r) => r[t] === e;
  function F(t, e) {
    if (!t) throw new Error(e);
  }
  function Ne(t, e) {
    if (!t.ownerDocument.defaultView)
      throw new Error("Element's ownerDocument has no defaultView");
    let r = t.ownerDocument.defaultView,
      i = t.parentElement,
      o = r.getComputedStyle(i);
    if (!rt(o)) return;
    let s = r.getSelection();
    F(
      s,
      "Could not obtain selection from window. Selection is needed for detecting whitespace collapsing in text.",
    );
    let n = e.svgDocument.createElementNS(y, "text");
    nt(o, n);
    let u = parseInt(o.tabSize, 10);
    n.setAttribute("dominant-baseline", "text-after-edge");
    let p = t.ownerDocument.createRange();
    for (p.setStart(t, 0), p.setEnd(t, 0); ;) {
      let l = () => {
        if (p.collapsed) return;
        let a = p.getClientRects()[0];
        if (!yt(a, e.options.captureArea)) return;
        let c = e.svgDocument.createElementNS(y, "tspan");
        c.setAttribute("xml:space", "preserve");
        let h = i.style.userSelect;
        try {
          (s.removeAllRanges(),
            s.addRange(p),
            (c.textContent = s.toString().replace(/\t/g, " ".repeat(u))));
        } finally {
          s.removeAllRanges();
        }
        (c.setAttribute("x", a.x.toString()),
          c.setAttribute("y", a.bottom.toString()),
          c.setAttribute("textLength", a.width.toString()),
          c.setAttribute("lengthAdjust", "spacingAndGlyphs"),
          n.append(c));
      };
      try {
        p.setEnd(t, p.endOffset + 1);
      } catch (a) {
        if (a.code === DOMException.INDEX_SIZE_ERR) {
          l();
          break;
        }
        throw a;
      }
      let f = p.getClientRects();
      if (!f[0]) return;
      f[1] &&
        f[0].top !== f[1].top &&
        (p.setEnd(t, p.endOffset - 1), l(), p.setStart(t, p.endOffset));
    }
    e.currentSvgParent.append(n);
  }
  var lr = new Set([
    "color",
    "dominant-baseline",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "direction",
    "letter-spacing",
    "text-decoration",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "unicode-bidi",
    "word-spacing",
    "writing-mode",
    "user-select",
  ]);
  function nt(t, e) {
    for (let r of lr) {
      let i = t.getPropertyValue(r);
      i && e.setAttribute(r, i);
    }
    e.setAttribute("fill", t.color);
  }
  function ot(t, e) {
    if (vt(t)) {
      if (!W(t)) return;
      dr(t, e);
    } else if (bt(t)) {
      let r = t.cloneNode(!0);
      e.currentSvgParent.append(r);
    }
  }
  var ur = new Set(["script", "style", "foreignElement"]),
    Ie = /\burl\(["']?#/;
  function dr(t, e) {
    var r, i, o, s;
    if (ur.has(t.tagName)) return;
    let n;
    if (St(t)) {
      let u = e.svgDocument.createElementNS(y, "g");
      ((n = u),
        u.classList.add("svg-content", ...t.classList),
        (u.dataset.viewBox =
          (r = t.getAttribute("viewBox")) !== null && r !== void 0 ? r : ""),
        (u.dataset.width =
          (i = t.getAttribute("width")) !== null && i !== void 0 ? i : ""),
        (u.dataset.height =
          (o = t.getAttribute("height")) !== null && o !== void 0 ? o : ""));
      for (let p of t.children) {
        if (!Mt(p)) continue;
        let l =
          p.ownerDocument !== e.svgDocument &&
          !(
            !((s = t.parentElement) === null || s === void 0) &&
            s.closest("svg")
          )
            ? p.getScreenCTM()
            : p.getCTM();
        if (!l) break;
        if (p.transform.baseVal.numberOfItems > 0) {
          p.transform.baseVal.consolidate();
          let f = p.transform.baseVal.getItem(0).matrix;
          l = l.multiply(f.inverse());
        }
        u.transform.baseVal.appendItem(
          u.transform.baseVal.createSVGTransformFromMatrix(l),
        );
        break;
      }
    } else {
      ue(t) && !e.options.keepLinks
        ? (n = e.svgDocument.createElementNS(y, "g"))
        : (n = t.cloneNode(!1));
      for (let f of n.attributes)
        (f.localName.startsWith("on") ||
          (f.localName === "href" && f.value.startsWith("javascript:"))) &&
          n.attributes.removeNamedItemNS(f.namespaceURI, f.localName);
      let u = t.ownerDocument.defaultView;
      F(u, "Element's ownerDocument has no defaultView");
      let p = t.ownerSVGElement;
      F(p, "Expected element to have ownerSVGElement");
      let l = u.getComputedStyle(t);
      Mt(t) && (gr(l, n, p.viewBox.animVal), de(t) && nt(l, n));
      for (let f of n.attributes)
        f.localName === "href"
          ? f.value.startsWith("#") &&
            (f.value = f.value.replace("#", `#${e.idPrefix}`))
          : Ie.test(f.value) && (f.value = Ve(f.value, e));
      for (let f of n.style) {
        let a = n.style.getPropertyValue(f);
        Ie.test(a) &&
          n.style.setProperty(f, Ve(a, e), n.style.getPropertyPriority(f));
      }
    }
    (n.id && (n.id = e.idPrefix + n.id), e.currentSvgParent.append(n));
    for (let u of t.childNodes) ot(u, { ...e, currentSvgParent: n });
  }
  var fr = [
      "alignment-baseline",
      "baseline-shift",
      "clip-path",
      "clip-rule",
      "color",
      "color-interpolation",
      "color-interpolation-filters",
      "color-rendering",
      "direction",
      "fill",
      "fill-opacity",
      "fill-rule",
      "filter",
      "flood-color",
      "flood-opacity",
      "image-rendering",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "mask",
      "opacity",
      "pointer-events",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "stroke",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "transform",
      "vector-effect",
      "visibility",
    ],
    pr = {
      "alignment-baseline": "auto",
      "baseline-shift": "0px",
      "clip-path": "none",
      "clip-rule": "nonzero",
      "color-interpolation-filters": "linearrgb",
      "color-interpolation": "srgb",
      "color-rendering": "auto",
      "fill-opacity": "1",
      "fill-rule": "nonzero",
      "flood-color": "rgb(0, 0, 0)",
      "flood-opacity": "1",
      "image-rendering": "auto",
      "lighting-color": "rgb(255, 255, 255)",
      "marker-end": "none",
      "marker-mid": "none",
      "marker-start": "none",
      "pointer-events": "auto",
      "shape-rendering": "auto",
      "stop-color": "rgb(0, 0, 0)",
      "stop-opacity": "1",
      "stroke-dasharray": "none",
      "stroke-dashoffset": "0px",
      "stroke-linecap": "butt",
      "stroke-linejoin": "miter",
      "stroke-miterlimit": "4",
      "stroke-opacity": "1",
      "stroke-width": "1px",
      "vector-effect": "none",
      color: "",
      direction: "ltr",
      fill: "",
      filter: "none",
      mask: "none",
      opacity: "1",
      stroke: "",
      transform: "none",
      visibility: "visible",
    };
  function Ve(t, { idPrefix: e }) {
    let r = (0, Bt.default)(t);
    return (
      r.walk((i) => {
        if (i.type !== "function" || i.value !== "url") return;
        let o = i.nodes[0];
        o && (o.value = o.value.replace("#", `#${e}`));
      }),
      Bt.default.stringify(r.nodes)
    );
  }
  function gr(t, e, r) {
    var i;
    for (let o of fr) {
      let s = t.getPropertyValue(o);
      s &&
        s !== pr[o] &&
        (s.endsWith("%") &&
          (s = (i = T(s, Le(r))) !== null && i !== void 0 ? i : 0),
        e.setAttribute(o, s.toString()));
    }
  }
  function Pe(t, e) {
    var r, i, o, s, n, u, p;
    let l = [];
    try {
      let f = t.ownerDocument.defaultView;
      if (!f) throw new Error("Element's ownerDocument has no defaultView");
      let a = t.getBoundingClientRect(),
        c = yt(a, e.options.captureArea),
        h = f.getComputedStyle(t),
        x = t.parentElement && f.getComputedStyle(t.parentElement),
        g =
          ge(t) && e.options.keepLinks
            ? xr(t, e)
            : e.svgDocument.createElementNS(y, "g");
      g.dataset.tag = t.tagName.toLowerCase();
      let m = t.id || e.getUniqueId(t.classList[0] || t.tagName.toLowerCase());
      g.id = m;
      let w = t.getAttribute("class");
      if ((w && g.setAttribute("class", w), O(t) && t.title)) {
        let b = e.svgDocument.createElementNS(y, "title");
        ((b.textContent = t.title), g.prepend(b));
      }
      let k = Se(h, x),
        L = k ? e.stackingLayers[k] : e.parentStackingLayer;
      L &&
        e.currentSvgParent.setAttribute(
          "aria-owns",
          [e.currentSvgParent.getAttribute("aria-owns"), g.id]
            .filter(Boolean)
            .join(" "),
        );
      let C = e.parentStackingLayer === L ? e.currentSvgParent : L;
      ((g.dataset.zIndex = h.zIndex), C.append(g));
      let R, M, _;
      (it(h, x)
        ? ((_ = xt(g)),
          (M = _.rootBackgroundAndBorders),
          (R = {
            ...e,
            currentSvgParent: g,
            stackingLayers: _,
            parentStackingLayer: L,
          }))
        : ((M = g),
          (R = { ...e, currentSvgParent: g, parentStackingLayer: L })),
        h.opacity !== "1" && g.setAttribute("opacity", h.opacity));
      for (let [b, V] of Ae(t, e)) g.setAttribute(b, V);
      if (O(t) && !t.dataset.pseudoElement) {
        let b = (V, N) => {
          let G = f.getComputedStyle(t, V),
            Z = (0, wt.default)(G.content).nodes.find(Ot("type", "string"));
          if (!Z) return;
          let $ = t.ownerDocument.createElement("span");
          (($.dataset.pseudoElement = V),
            ce(G, $.style),
            ($.textContent = H(Z.value)),
            (t.dataset.pseudoElementOwner = m),
            l.push(() => t.removeAttribute("data-pseudo-element-owner")));
          let Y = t.ownerDocument.createElement("style");
          ((Y.textContent = `[data-pseudo-element-owner="${m}"]${V} { display: none !important; }`),
            t.before(Y),
            l.push(() => Y.remove()),
            t[N]($),
            l.push(() => $.remove()));
        };
        (b("::before", "prepend"), b("::after", "append"));
      }
      if ((c && hr(h, a, M, f, e), h.overflow !== "visible")) {
        let b = e.svgDocument.createElementNS(y, "mask");
        b.id = e.getUniqueId("mask-for-" + m);
        let V = Ft(a, e);
        (V.setAttribute("fill", "#ffffff"),
          b.append(V),
          g.append(b),
          g.setAttribute("mask", `url(#${b.id})`),
          (R = {
            ...R,
            ancestorMasks: [{ mask: b, forElement: t }, ...R.ancestorMasks],
          }));
      }
      if (
        O(t) &&
        (h.position === "absolute" || h.position === "fixed") &&
        e.ancestorMasks.length > 0 &&
        t.offsetParent
      )
        for (let { mask: b, forElement: V } of e.ancestorMasks)
          if (t.offsetParent.contains(V) || t.offsetParent === V) {
            let N = Ft(a, e);
            (N.setAttribute("fill", "#ffffff"), b.append(N));
          } else break;
      if (c && he(t) && (t.getAttribute("src") || t.getAttribute("srcset"))) {
        let b = e.svgDocument.createElementNS(y, "image");
        ((b.id = `${m}-image`),
          b.setAttribute("xlink:href", t.currentSrc || t.src));
        let V =
            (r = T(h.paddingLeft, a.width)) !== null && r !== void 0 ? r : 0,
          N = (i = T(h.paddingRight, a.width)) !== null && i !== void 0 ? i : 0,
          G = (o = T(h.paddingTop, a.height)) !== null && o !== void 0 ? o : 0,
          Z =
            (s = T(h.paddingBottom, a.height)) !== null && s !== void 0 ? s : 0;
        (b.setAttribute("x", (a.x + V).toString()),
          b.setAttribute("y", (a.y + G).toString()),
          b.setAttribute("width", (a.width - V - N).toString()),
          b.setAttribute("height", (a.height - G - Z).toString()),
          t.alt && b.setAttribute("aria-label", t.alt),
          g.append(b));
      } else if (c && me(t) && a.width > 0 && a.height > 0) {
        if (t.value) {
          let b = e.svgDocument.createElementNS(y, "text");
          (nt(h, b),
            b.setAttribute("dominant-baseline", "central"),
            b.setAttribute("xml:space", "preserve"),
            b.setAttribute(
              "x",
              (
                a.x +
                ((n = T(h.paddingLeft, a.width)) !== null && n !== void 0
                  ? n
                  : 0)
              ).toString(),
            ));
          let V =
              a.top +
              ((u = T(h.paddingTop, a.height)) !== null && u !== void 0
                ? u
                : 0),
            N =
              a.bottom +
              ((p = T(h.paddingBottom, a.height)) !== null && p !== void 0
                ? p
                : 0),
            G = (V + N) / 2;
          (b.setAttribute("y", G.toString()),
            (b.textContent = t.value),
            R.stackingLayers.inFlowInlineLevelNonPositionedDescendants.append(
              b,
            ));
        }
      } else if (c && St(t) && rt(h)) ot(t, { ...R, idPrefix: `${m}-` });
      else {
        for (let b of t.childNodes) At(b, R);
        _ && (xe(_), ye(_));
      }
    } finally {
      for (let f of l) f();
    }
  }
  function hr(t, e, r, i, o) {
    var s, n, u, p;
    if (rt(t)) {
      if (
        e.width > 0 &&
        e.height > 0 &&
        (!gt(t.backgroundColor) || ht(t) || t.backgroundImage !== "none")
      ) {
        let l = mr(e, t, o);
        if ((r.append(l), t.backgroundImage !== "none")) {
          let f = (0, wt.default)(t.backgroundImage)
              .nodes.filter(Ot("type", "function"))
              .reverse(),
            a = t.backgroundPositionX.split(/\s*,\s*/g),
            c = t.backgroundPositionY.split(/\s*,\s*/g),
            h = t.backgroundRepeat.split(/\s*,\s*/g);
          for (let [x, g] of f.entries()) {
            let m = (s = T(a[x], e.width)) !== null && s !== void 0 ? s : 0,
              w = (n = T(c[x], e.height)) !== null && n !== void 0 ? n : 0,
              k = h[x];
            if (g.value === "url" && g.nodes[0]) {
              let L = g.nodes[0],
                C = o.svgDocument.createElementNS(y, "image");
              C.id = o.getUniqueId("background-image");
              let [R = "auto", M = "auto"] = t.backgroundSize.split(" "),
                _ = (u = T(R, e.width)) !== null && u !== void 0 ? u : e.width,
                b =
                  (p = T(M, e.height)) !== null && p !== void 0 ? p : e.height;
              (C.setAttribute("width", _.toString()),
                C.setAttribute("height", b.toString()),
                R !== "auto" && M !== "auto"
                  ? C.setAttribute("preserveAspectRatio", "none")
                  : t.backgroundSize === "contain"
                    ? C.setAttribute("preserveAspectRatio", "xMidYMid meet")
                    : t.backgroundSize === "cover" &&
                      C.setAttribute("preserveAspectRatio", "xMidYMid slice"));
              let V = new URL(H(L.value), i.location.href);
              if (
                (C.setAttribute("xlink:href", V.href),
                k === "no-repeat" ||
                  (m === 0 && w === 0 && _ === e.width && b === e.height))
              )
                (C.setAttribute("x", e.x.toString()),
                  C.setAttribute("y", e.y.toString()),
                  r.append(C));
              else {
                (C.setAttribute("x", "0"), C.setAttribute("y", "0"));
                let N = o.svgDocument.createElementNS(y, "pattern");
                (N.setAttribute("patternUnits", "userSpaceOnUse"),
                  N.setAttribute("patternContentUnits", "userSpaceOnUse"),
                  N.setAttribute("x", (e.x + m).toString()),
                  N.setAttribute("y", (e.y + w).toString()),
                  N.setAttribute(
                    "width",
                    (k === "repeat" || k === "repeat-x"
                      ? _
                      : _ + e.x + m
                    ).toString(),
                  ),
                  N.setAttribute(
                    "height",
                    (k === "repeat" || k === "repeat-y"
                      ? b
                      : b + e.y + w
                    ).toString(),
                  ),
                  (N.id = o.getUniqueId("pattern")),
                  N.append(C),
                  l.before(N),
                  l.setAttribute("fill", `url(#${N.id})`));
              }
            } else if (/^(-webkit-)?linear-gradient$/.test(g.value)) {
              let L = wt.default.stringify(g),
                C = Ce(L, o);
              ((m !== 0 || w !== 0) &&
                C.setAttribute("gradientTransform", `translate(${m}, ${w})`),
                (C.id = o.getUniqueId("linear-gradient")),
                l.before(C),
                l.setAttribute("fill", `url(#${C.id})`));
            }
          }
        }
      }
      if (!ht(t)) for (let l of vr(t, e, o)) r.append(l);
    }
  }
  function Ft(t, e) {
    let r = e.svgDocument.createElementNS(y, "rect");
    return (
      r.setAttribute("width", t.width.toString()),
      r.setAttribute("height", t.height.toString()),
      r.setAttribute("x", t.x.toString()),
      r.setAttribute("y", t.y.toString()),
      r
    );
  }
  function mr(t, e, r) {
    let i = Ft(t, r);
    (e.backgroundColor && i.setAttribute("fill", e.backgroundColor),
      ht(e) &&
        (i.setAttribute("stroke", e.borderTopColor),
        i.setAttribute("stroke-width", e.borderTopWidth),
        e.borderTopStyle === "dashed" &&
          i.setAttribute("stroke-dasharray", "1")));
    let o = se(e, t),
      s = mt("top", e, t)[0] * o,
      n = mt("left", e, t)[0] * o;
    return (
      s !== 0 && i.setAttribute("rx", s.toString()),
      n !== 0 && i.setAttribute("ry", n.toString()),
      i
    );
  }
  function* vr(t, e, r) {
    for (let i of ["top", "bottom", "right", "left"])
      br(t, i) && (yield Sr(t, e, i, r));
  }
  function br(t, e) {
    return (
      !!t.getPropertyValue(`border-${e}-color`) &&
      !gt(t.getPropertyValue(`border-${e}-color`)) &&
      t.getPropertyValue(`border-${e}-width`) !== "0px"
    );
  }
  function Sr(t, e, r, i) {
    let o = i.svgDocument.createElementNS(y, "line");
    o.setAttribute("stroke-linecap", "square");
    let s = t.getPropertyValue(`border-${r}-color`);
    (o.setAttribute("stroke", s),
      o.setAttribute("stroke-width", t.getPropertyValue(`border-${r}-width`)));
    let n = t.getPropertyValue(`border-${r}-style`);
    if (
      (n === "inset" && (r === "top" || r === "left")) ||
      (n === "outset" && (r === "right" || r === "bottom"))
    ) {
      let u = s.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
      if (!u) throw new Error(`Unexpected color: ${s}`);
      let p = u.slice(1, 4).map((l) => parseInt(l, 10) * 0.3);
      (u[4] && p.push(parseFloat(u[4])),
        o.setAttribute("stroke", `rgba(${p.join(", ")})`));
    }
    return (
      r === "top"
        ? (o.setAttribute("x1", e.left.toString()),
          o.setAttribute("x2", e.right.toString()),
          o.setAttribute("y1", e.top.toString()),
          o.setAttribute("y2", e.top.toString()))
        : r === "left"
          ? (o.setAttribute("x1", e.left.toString()),
            o.setAttribute("x2", e.left.toString()),
            o.setAttribute("y1", e.top.toString()),
            o.setAttribute("y2", e.bottom.toString()))
          : r === "right"
            ? (o.setAttribute("x1", e.right.toString()),
              o.setAttribute("x2", e.right.toString()),
              o.setAttribute("y1", e.top.toString()),
              o.setAttribute("y2", e.bottom.toString()))
            : r === "bottom" &&
              (o.setAttribute("x1", e.left.toString()),
              o.setAttribute("x2", e.right.toString()),
              o.setAttribute("y1", e.bottom.toString()),
              o.setAttribute("y2", e.bottom.toString())),
      o
    );
  }
  function xr(t, e) {
    let r = e.svgDocument.createElementNS(y, "a");
    return (
      t.href &&
        !t.href.startsWith("javascript:") &&
        r.setAttribute("href", t.href),
      t.rel && r.setAttribute("rel", t.rel),
      t.target && r.setAttribute("target", t.target),
      t.download && r.setAttribute("download", t.download),
      r
    );
  }
  function At(t, e) {
    vt(t) ? Pe(t, e) : bt(t) && Ne(t, e);
  }
  var $t = at(tt(), 1);
  async function kt(t) {
    await Promise.all([
      ...[...t.children].map(kt),
      (async () => {
        var e;
        if (fe(t)) {
          let r = await Gt(1e4, `Timeout fetching ${t.href.baseVal}`, () =>
            Te(t.href.baseVal),
          );
          if (r.type === "image/svg+xml") {
            F(
              t.ownerDocument,
              "Expected <image> element to have ownerDocument",
            );
            let o = new DOMParser().parseFromString(
              await r.text(),
              "image/svg+xml",
            ).documentElement;
            (o.setAttribute("x", t.getAttribute("x")),
              o.setAttribute("y", t.getAttribute("y")),
              o.setAttribute("width", t.getAttribute("width")),
              o.setAttribute("height", t.getAttribute("height")),
              o.remove(),
              t.replaceWith(o));
            try {
              let s = t.ownerDocument,
                n = s.createElementNS(y, "g");
              (F(t.id, "<image> element must have ID"),
                ot(o, {
                  currentSvgParent: n,
                  svgDocument: s,
                  idPrefix: `${t.id}-`,
                  options: { keepLinks: !1, captureArea: o.viewBox.baseVal },
                }),
                (n.dataset.tag = "img"),
                n.setAttribute("role", "img"),
                o.replaceWith(n));
            } finally {
              o.remove();
            }
          } else {
            let i = await Re(r);
            ((t.dataset.src = t.href.baseVal),
              t.setAttribute("xlink:href", i.href));
          }
        } else if (pe(t))
          try {
            let r = [],
              i = st((e = t.textContent) !== null && e !== void 0 ? e : "");
            (i.walkAtRules("font-face", (o) => {
              o.walkDecls("src", (s) => {
                let n = (0, $t.default)(s.value);
                (n.walk((u) => {
                  if (
                    u.type === "function" &&
                    u.value === "url" &&
                    u.nodes[0]
                  ) {
                    let p = u.nodes[0];
                    (p.type === "string" || p.type === "word") && r.push(yr(p));
                  }
                }),
                  (s.value = $t.default.stringify(n.nodes)));
              });
            }),
              await Promise.all(r),
              (t.textContent = i.toString()));
          } catch (r) {
            console.error("Error inlining stylesheet", t.sheet, r);
          }
      })().catch((e) => {
        console.error("Error inlining resource for element", t, e);
      }),
    ]);
  }
  async function yr(t) {
    try {
      let e = new URL(H(t.value)),
        r = await Gt(1e4, `Timeout fetching ${e.href}`, () => Te(e.href));
      if (
        !r.type.startsWith("font/") &&
        !r.type.startsWith("application/font-") &&
        !r.type.startsWith("application/x-font-") &&
        !r.type.startsWith("image/svg+xml") &&
        !r.type.startsWith("application/vnd.ms-fontobject")
      )
        throw new Error(
          `Invalid response MIME type inlining font at ${e.href}: Expected font MIME type, got ${r.type}`,
        );
      let i = await Re(r);
      t.value = i.href;
    } catch (e) {
      console.error(`Error inlining ${t.value}`, e);
    }
  }
  async function Te(t) {
    F(t, "No URL passed");
    let e = new Headers(),
      r = await fetch(t, { headers: e });
    if (!r.ok) throw new Error(r.statusText);
    return await r.blob();
  }
  async function Re(t) {
    let e = new FileReader();
    return (
      await new Promise((r, i) => {
        (e.addEventListener("error", () =>
          i(new Error("Error loading resource with FileLoader")),
        ),
          e.addEventListener("load", () => r()),
          e.readAsDataURL(t));
      }),
      new URL(e.result)
    );
  }
  function _e(t, e) {
    var r, i, o, s;
    let n = t.ownerDocument.implementation.createDocument(y, "svg", null),
      u = n.documentElement;
    (u.setAttribute("xmlns", y),
      u.setAttribute("xmlns:xlink", le),
      u.append(
        n.createComment(
          ` Generated by dom-to-svg from ${t.ownerDocument.location.href.replace(/--/g, "%2D%2D")} `,
        ),
      ));
    let p = n.createElementNS(y, "style");
    for (let f of t.ownerDocument.styleSheets)
      try {
        for (let a of (r = f.rules) !== null && r !== void 0 ? r : []) {
          if (!ae(a)) continue;
          let c =
            (i = a.parentStyleSheet) === null || i === void 0 ? void 0 : i.href;
          if (c) {
            let h = (0, Ut.default)(a.style.getPropertyValue("src"));
            h.walk((g) => {
              if (g.type === "function" && g.value === "url" && g.nodes[0]) {
                let m = g.nodes[0];
                (m.type === "string" || m.type === "word") &&
                  (m.value = new URL(H(m.value), c).href);
              }
            });
            let x = st(a.cssText);
            (x.walkDecls("src", (g) => {
              g.value = Ut.default.stringify(h.nodes);
            }),
              p.append(
                x.toString() +
                  `
`,
              ));
          }
        }
      } catch (a) {
        console.error(
          "Error resolving @font-face src URLs for styleSheet, skipping",
          f,
          a,
        );
      }
    (u.append(p),
      At(t, {
        svgDocument: n,
        currentSvgParent: u,
        stackingLayers: xt(u),
        parentStackingLayer: u,
        getUniqueId: Ee(),
        labels: new Map(),
        ancestorMasks: [],
        options: {
          captureArea:
            (o = e?.captureArea) !== null && o !== void 0
              ? o
              : t.getBoundingClientRect(),
          keepLinks: e?.keepLinks !== !1,
        },
      }));
    let l =
      (s = e?.captureArea) !== null && s !== void 0
        ? s
        : t.getBoundingClientRect();
    return (
      u.setAttribute("width", l.width.toString()),
      u.setAttribute("height", l.height.toString()),
      u.setAttribute("viewBox", `${l.x} ${l.y} ${l.width} ${l.height}`),
      n
    );
  }
  var Me = "http://www.w3.org/2000/svg",
    wr =
      ":root:root:root body *{user-select:text!important;-webkit-user-select:text!important}[data-dc-editor-overlay],[data-omelette-chrome],[data-noncommentable]{display:none!important}",
    De = ".sc-host:not(.sc-host .sc-host)",
    X = null;
  function Ar(t) {
    if (
      ((X ??= document
        .createElement("canvas")
        .getContext("2d", { willReadFrequently: !0 })),
      !X || !CSS.supports("color", t))
    )
      return null;
    (X.clearRect(0, 0, 1, 1),
      (X.fillStyle = "#0000"),
      (X.fillStyle = t),
      X.fillRect(0, 0, 1, 1));
    let [e, r, i, o] = X.getImageData(0, 0, 1, 1).data;
    return (
      "rgba(" +
      String(e) +
      ", " +
      String(r) +
      ", " +
      String(i) +
      ", " +
      String(Math.round(((o ?? 0) / 255) * 1e3) / 1e3) +
      ")"
    );
  }
  var kr =
    /(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark)\((?:[^()]|\([^()]*\))*\)|#[0-9a-f]{3,8}\b/i;
  function Cr(t) {
    if (!t || t === "none") return [];
    let e = [];
    for (let r of t.split(/,(?![^(]*\))/)) {
      let i = r.trim();
      if (/\binset\b/.test(i)) continue;
      let o = i.match(kr),
        s = o ? Ar(o[0]) : null;
      if (!o || !s) continue;
      let n = i
        .replace(o[0], " ")
        .trim()
        .split(/\s+/)
        .map(parseFloat)
        .filter((u) => !Number.isNaN(u));
      n.length < 2 ||
        e.push({
          x: n[0] ?? 0,
          y: n[1] ?? 0,
          blur: n[2] ?? 0,
          spread: n[3] ?? 0,
          color: s,
        });
    }
    return e;
  }
  function j(t, e, r) {
    let i = t.createElementNS(Me, e);
    for (let [o, s] of Object.entries(r)) i.setAttribute(o, String(s));
    return i;
  }
  function Er(t, e, r, i) {
    let o = e.querySelector("defs");
    o || ((o = t.createElementNS(Me, "defs")), e.insertBefore(o, e.firstChild));
    let s = e.querySelector(
        'g[data-stacking-layer="rootBackgroundAndBorders"]',
      ),
      n = 0;
    for (let u of i) {
      let p = getComputedStyle(u);
      if (
        p.boxShadow === "none" ||
        p.display === "none" ||
        p.visibility === "hidden"
      )
        continue;
      let l = u.getBoundingClientRect();
      if (!l.width || !l.height) continue;
      let f = parseFloat(p.borderTopLeftRadius) || 0,
        a = [...e.querySelectorAll("rect")].find(
          (c) =>
            !c.hasAttribute("mask") &&
            Math.abs(Number(c.getAttribute("x")) - l.x) < 0.6 &&
            Math.abs(Number(c.getAttribute("y")) - l.y) < 0.6 &&
            Math.abs(Number(c.getAttribute("width")) - l.width) < 0.6 &&
            Math.abs(Number(c.getAttribute("height")) - l.height) < 0.6,
        );
      for (let c of Cr(p.boxShadow)) {
        let h = "dc-shadow-" + String(++n),
          x = j(t, "mask", {
            id: h + "-cut",
            maskUnits: "userSpaceOnUse",
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
          });
        (x.append(
          j(t, "rect", {
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
            fill: "#fff",
          }),
          j(t, "rect", {
            x: l.x,
            y: l.y,
            width: l.width,
            height: l.height,
            rx: f,
            ry: f,
            fill: "#000",
          }),
        ),
          o.append(x));
        let g = j(t, "rect", {
          x: l.x - c.spread + c.x,
          y: l.y - c.spread + c.y,
          width: Math.max(0, l.width + 2 * c.spread),
          height: Math.max(0, l.height + 2 * c.spread),
          rx: Math.max(0, f + c.spread),
          ry: Math.max(0, f + c.spread),
          fill: c.color,
          mask: "url(#" + h + "-cut)",
        });
        if (c.blur > 0) {
          let m = j(t, "filter", {
            id: h,
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%",
          });
          (m.append(j(t, "feGaussianBlur", { stdDeviation: c.blur / 2 })),
            o.append(m),
            g.setAttribute("filter", "url(#" + h + ")"));
        }
        a ? a.before(g) : s ? s.after(g) : e.insertBefore(g, o.nextSibling);
      }
    }
  }
  function Lr(t, e, r) {
    for (let i of r.querySelectorAll("canvas")) {
      let o = i.getBoundingClientRect();
      if (!o.width || !o.height) continue;
      let s;
      try {
        s = i.toDataURL("image/png");
      } catch {
        continue;
      }
      e.append(
        j(t, "image", {
          x: o.x,
          y: o.y,
          width: o.width,
          height: o.height,
          href: s,
        }),
      );
    }
  }
  async function Nr(t, e = null) {
    let r = t === "page",
      i = r ? null : document.querySelector("[data-dc-editor-selected]"),
      o = r
        ? document.documentElement
        : i && (i.ownerSVGElement != null ? (i.closest("svg") ?? i) : i);
    if (!o) return { e: "no-selection" };
    let s = document.querySelector(De) ?? document.body,
      n = new CSSStyleSheet();
    n.replaceSync(
      wr +
        (s.style.transform
          ? (s === document.body ? "body" : De) + "{transform:none!important}"
          : ""),
    );
    let u = document.body,
      p = u.hasAttribute("data-dc-editor-overlay-hidden"),
      l = u.hasAttribute("data-dc-capturing"),
      f = getSelection(),
      a = f && f.rangeCount > 0 ? f.getRangeAt(0) : null,
      c,
      h,
      x = !1,
      g;
    try {
      if (
        ((document.adoptedStyleSheets = [...document.adoptedStyleSheets, n]),
        u.setAttribute("data-dc-editor-overlay-hidden", ""),
        r && u.setAttribute("data-dc-capturing", ""),
        (h = r
          ? new DOMRect(
              -scrollX,
              -scrollY,
              e?.w ??
                Math.max(innerWidth, document.documentElement.scrollWidth),
              e?.h ??
                Math.max(innerHeight, document.documentElement.scrollHeight),
            )
          : o.getBoundingClientRect()),
        !h.width || !h.height)
      )
        return { e: "zero-size" };
      if (
        (r &&
          e?.h != null &&
          document.documentElement.scrollHeight > e.h + 1 &&
          (x = !0),
        (c = _e(o, { captureArea: h, keepLinks: !1 })),
        (g = c.documentElement),
        r)
      ) {
        let w = g.querySelector(
          'g[data-stacking-layer="rootBackgroundAndBorders"] > rect',
        );
        if (w)
          for (let [k, L] of [
            ["x", h.x],
            ["y", h.y],
            ["width", h.width],
            ["height", h.height],
          ])
            w.setAttribute(k, String(L));
      }
      (Er(
        c,
        g,
        h,
        r ? u.querySelectorAll("*") : [o, ...o.querySelectorAll("*")],
      ),
        Lr(c, g, o));
    } finally {
      ((document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
        (w) => w !== n,
      )),
        p || u.removeAttribute("data-dc-editor-overlay-hidden"),
        r && !l && u.removeAttribute("data-dc-capturing"),
        f && (f.removeAllRanges(), a && f.addRange(a)));
    }
    for (let w of [...g.querySelectorAll("style")]) w.remove();
    await kt(g);
    let m = new XMLSerializer().serializeToString(g);
    return x ? { s: m, clipped: !0 } : { s: m };
  }
  window.__dcSvgCapture = Nr;
})();
