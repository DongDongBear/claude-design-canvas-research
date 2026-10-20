import {
  Co as e,
  Eo as t,
  Ga as n,
  So as r,
  To as i,
  Ua as a,
  Wa as o,
  Za as s,
  _o as c,
  bo as l,
  lo as u,
  po as d,
  yo as f,
} from "./vendor-frame-DaQ5k-Tx.js";
import {
  $i as de,
  Ac as y,
  BH as ee,
  BO as me,
  BX as v,
  D6 as re,
  E9 as oe,
  Ef as ce,
  Jz as ie,
  M7 as h,
  Op as b,
  P7 as ue,
  QU as ge,
  RD as te,
  W1 as w,
  XZ as ne,
  Xv as le,
  YP as p,
  _U as pe,
  bh as ae,
  dZ as se,
  es as C,
  fX as fe,
  ig as E,
  jr as _,
  k8 as x,
  lk as O,
  m2 as g,
  si as m,
  tw as S,
  uR as T,
  xp as D,
  zA as he,
} from "./shared-frame-CIAC0KKy.js";
var _e = {
  trigger: ["frame-drawer-title-menu", "data-title-menu"],
  viewingPill: ["frame-title-viewing-pill", "data-viewing-pill"],
  switcher: ["frame-title-menu-switcher", void 0],
  rename: ["frame-title-menu-rename", "data-rename-item"],
  renameInput: ["frame-title-rename-input", "data-rename-input"],
  duplicate: ["frame-title-menu-duplicate", "data-duplicate-item"],
  share: ["frame-title-menu-share", "data-share-item"],
  permissions: ["frame-title-menu-permissions", "data-permissions-item"],
  versions: ["frame-title-menu-versions", "data-version-submenu"],
  report: ["frame-title-menu-report", "data-report-item"],
  delete: ["frame-title-menu-delete", "data-delete-item"],
  storage: ["frame-title-menu-storage", "data-storage-item"],
  storageLines: ["frame-title-menu-storage-lines", "data-storage-lines"],
  storageLimit: ["frame-title-menu-storage-limit", "data-storage-limit-item"],
  refresh: [void 0, "data-refresh-item"],
  pin: [void 0, "data-pin-item"],
  exportTab: [void 0, "data-export-tab-item"],
  downloadSubmenu: [void 0, "data-download-submenu"],
  download: [void 0, "data-download-item"],
  copyMarkdown: [void 0, "data-copy-markdown-item"],
  install: ["frame-title-menu-install", "data-install-item"],
  saveVersion: ["frame-title-menu-save-version", "data-save-version-item"],
  askBeforeSending: [
    "frame-title-menu-ask-before-sending",
    "data-ask-before-send-item",
  ],
  openTopLevel: ["frame-title-menu-open-top-level", "data-top-level-item"],
  feedback: [void 0, "data-staff-feedback-item"],
};
function k(e, t) {
  let [n, r] = _e[t];
  return e === "page"
    ? r === void 0
      ? {}
      : { [r]: "" }
    : n === void 0
      ? {}
      : { "data-testid": n };
}
function ve({ reason: e, children: t }) {
  let n = p() === "rtl" ? "left" : "right";
  return o(y, {
    content: e || void 0,
    side: n,
    multiline: !0,
    closeOnClick: !1,
    children: o("div", { role: "none", children: t }),
  });
}
function ye(e, t) {
  let r = (e) =>
    e.icon === void 0 ? void 0 : o(me, { name: e.icon, size: "sm" });
  return e.map((e, i) => {
    if (e === "separator") return o(b.Separator, {}, i);
    let [a] = Object.entries(e.attrs ?? {}),
      c = a === void 0 ? i : `${a[0]}=${a[1]}`;
    if (
      e.label === void 0 ||
      e.label === null ||
      e.label === "" ||
      e.label === !1
    )
      return null;
    if (e.items)
      return n(
        s,
        {
          children: [
            e.separatorBefore && o(b.Separator, {}),
            n(b.Submenu, {
              disabled: e.disabled,
              children: [
                o(b.SubmenuTrigger, {
                  ...e.attrs,
                  icon: r(e),
                  hint: e.hint,
                  "aria-label": e.ariaLabel,
                  children: e.label,
                }),
                o(b.Popup, {
                  "data-size": t,
                  collisionAvoidance: { side: "shift" },
                  children: ye(e.items, t),
                }),
              ],
            }),
          ],
        },
        c,
      );
    let l = o(b.Item, {
      ...e.attrs,
      icon: r(e),
      shortcut: e.shortcut,
      variant: e.variant,
      disabled: e.disabled,
      checked: e.checked,
      checkedRole: e.checkedRole,
      indicator: e.indicator,
      indeterminate: e.indeterminate,
      hint: e.hint,
      description: e.description,
      descriptionLines: e.descriptionLines,
      disabledReason: e.disabledReason,
      keepOpen: e.keepOpen,
      leading: e.leading,
      trailing: e.trailing,
      href: e.href,
      routerOptions: e.routerOptions,
      target: e.target,
      onClick: e.onSelect,
      "aria-label": e.ariaLabel,
      "aria-description": e.reason ?? void 0,
      rel: e.rel,
      children: e.label,
    });
    return n(
      s,
      {
        children: [
          e.separatorBefore && o(b.Separator, {}),
          e.reason === void 0
            ? l
            : o(ve, { reason: e.reason ?? void 0, children: l }),
        ],
      },
      c,
    );
  });
}
var be = /[\u00AD\u061C\u200B\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/gu,
  xe,
  Se,
  A = () => (xe ??= /[\p{Cc}\u115F\u1160\u2800\u3164\uFFA0]/gu),
  Ce = () => (Se ??= /[^\p{Cf}\p{Cc}\p{Mn}\p{Me}\s]/u);
function we(e) {
  let t = (e ?? "")
    .replace(be, "")
    .replace(A(), " ")
    .replace(/\s+/g, " ")
    .trim();
  return Ce().test(t) ? t : "";
}
var j = h({
  dataTitle: { defaultMessage: "Storage", id: "DUIDEquXSb" },
  dataLimitLabel: {
    defaultMessage: "Database storage limit",
    id: "ski5Oz1lSM",
  },
  filesLimitLabel: { defaultMessage: "File storage limit", id: "hzVLU3ahJr" },
  menuLineSpoken: { defaultMessage: "{label}: {figure}.", id: "9nImCmdjvi" },
  usedOfLimit: { defaultMessage: "{used} of {limit}", id: "ZH5cIeuJip" },
  menuDetail: {
    defaultMessage: "Ask Claude to free up storage.",
    id: "cdFZ8ZBBJd",
  },
  menuDataFullDetail: {
    defaultMessage:
      "New data isn\u2019t being saved. Ask Claude to free up storage.",
    id: "fz1mqdtNVN",
  },
  dataOptimizeDetail: {
    defaultMessage:
      "New data isn\u2019t being saved. Ask Claude to optimize data storage.",
    id: "2K3CmDB30+",
  },
  menuFilesFullDetail: {
    defaultMessage:
      "There\u2019s no room left for new files. Ask Claude to free up storage.",
    id: "c0VgieHdLI",
  },
  requestLimit: { defaultMessage: "Request a higher limit", id: "+H6zKb+Wt7" },
});
function Te({
  menu: { lines: e, limitLink: t },
  variant: r = "pane",
  popupSize: i,
}) {
  let s = C(),
    c = f(),
    l = f(),
    u = (e) => v(e.bytes, e.maxBytes, s.locale),
    d = (e) => {
      let t = e.notice;
      return t
        ? t.atDocumentCap
          ? s.formatMessage(j.dataOptimizeDetail)
          : t.full
            ? s.formatMessage(
                e.resource === "files"
                  ? j.menuFilesFullDetail
                  : j.menuDataFullDetail,
              )
            : s.formatMessage(j.menuDetail)
        : null;
    },
    p = e.map((e) => ({
      resource: e.resource,
      label: s.formatMessage(
        e.resource === "files" ? j.filesLimitLabel : j.dataLimitLabel,
      ),
      figure: s.formatMessage(j.usedOfLimit, {
        used: u(e),
        limit: x(e.maxBytes, s.locale, 0),
      }),
      sentence: d(e),
    }));
  return n(b.Submenu, {
    children: [
      o(b.SubmenuTrigger, {
        icon:
          r === "page" ? o(me, { name: "Database", size: "sm" }) : "Database",
        ...k(r, "storage"),
        hint: u(e[0]),
        "aria-describedby": l,
        trailing: o("span", {
          id: l,
          hidden: !0,
          children: p
            .flatMap((e) => [
              s.formatMessage(j.menuLineSpoken, {
                label: e.label,
                figure: e.figure,
              }),
              ...(e.sentence ? [e.sentence] : []),
            ])
            .join(" "),
        }),
        children: s.formatMessage(j.dataTitle),
      }),
      o(b.Popup, {
        "data-size": i,
        collisionAvoidance: { side: "shift" },
        className: "min-w-[280px] max-w-[320px]",
        header: n(a, {
          children: [
            o("div", {
              id: c,
              ...k(r, "storageLines"),
              className: "flex flex-col gap-sm px-md py-sm text-footnote",
              children: p.map((e) =>
                n(
                  "div",
                  {
                    "data-storage-line": e.resource,
                    className: "flex flex-col gap-xs",
                    children: [
                      n("div", {
                        className: "flex items-baseline justify-between gap-md",
                        children: [
                          o("span", {
                            className: "text-primary",
                            children: e.label,
                          }),
                          " ",
                          o("span", {
                            className: "shrink-0 text-secondary tabular-nums",
                            children: e.figure,
                          }),
                        ],
                      }),
                      " ",
                      e.sentence !== null &&
                        o("span", {
                          className: "text-secondary",
                          children: e.sentence,
                        }),
                      " ",
                    ],
                  },
                  e.resource,
                ),
              ),
            }),
            t && o(b.Separator, {}),
          ],
        }),
        children:
          t &&
          o(b.Item, {
            href: g,
            title: "artifacts+limits@anthropic.com",
            "aria-describedby": c,
            ...k(r, "storageLimit"),
            children: s.formatMessage(j.requestLimit),
          }),
      }),
    ],
  });
}
var Ee = h({
  made: { defaultMessage: "Created or edited", id: "2eMj2+7yLH" },
  referenced: { defaultMessage: "Referenced", id: "zf4aZ9ysgy" },
});
function M({ message: e }) {
  return C().formatMessage(e);
}
function De({ frames: e, currentKey: t, onSelect: r, switcherGroups: i = !1 }) {
  let s = (e) => {
      let n =
        e.typeTitle !== void 0 &&
        e.typeTitle.trim().toLowerCase() !== e.label.trim().toLowerCase()
          ? e.typeTitle
          : void 0;
      return o(
        b.Item,
        {
          icon: e.glyph ?? e.icon ?? "Artifacts",
          label: e.label,
          checked: e.key === t,
          checkedRole: "radio",
          title: n,
          onClick: () => r(e.key),
          children: e.label,
        },
        e.key,
      );
    },
    c = e.filter((e) => e.reference === "read");
  if (!i || c.length === 0 || c.length === e.length)
    return o(a, { children: e.map(s) });
  let l = e.filter((e) => e.reference !== "read");
  return n(a, {
    children: [
      n(b.Group, {
        children: [
          o(b.GroupLabel, { children: o(M, { message: Ee.made }) }),
          l.map(s),
        ],
      }),
      o(b.Separator, {}),
      n(b.Group, {
        children: [
          o(b.GroupLabel, { children: o(M, { message: Ee.referenced }) }),
          c.map(s),
        ],
      }),
    ],
  });
}
var Oe = ne(
    se,
    "-ms-pad-sm min-w-0 shrink px-sm justify-start [&>span]:min-w-0",
  ),
  ke = "min-w-0 shrink justify-start",
  N = w,
  Ae = "min-w-[3ch] truncate text-gray-900/80 dark:text-gray-0/70",
  je = "animate-placeholder-reveal h-[10px] w-24 shrink-0 rounded-sm",
  Me = h({
    pending: { defaultMessage: "Loading artifact\u2026", id: "amCMfntTXA" },
  });
function Ne({ title: e, pending: t, size: n = "xs" }) {
  return t
    ? o(T, { as: "span", decorative: !0, className: je })
    : o("span", { title: e, className: n === "base" ? Ae : N, children: e });
}
var Pe = h({
  viewOnly: {
    defaultMessage: "Commenting isn\u2019t available with view-only access.",
    id: "4l9G6fhEnn",
  },
  moreOptions: { defaultMessage: "More comment options", id: "c7++ULtWBH" },
  group: { defaultMessage: "Comments", id: "wCgTu5LcAF" },
});
function Fe(e, t, n, r = !1) {
  return r
    ? e.formatMessage(t ? E.hide_comments : E.show_all_comments)
    : t
      ? n
        ? e.formatMessage({ defaultMessage: "Done viewing", id: "284E9I+1fr" })
        : e.formatMessage({
            defaultMessage: "Done commenting",
            id: "cXIcxYfeiJ",
          })
      : n
        ? e.formatMessage({ defaultMessage: "View comments", id: "CKvZYxMKTZ" })
        : e.formatMessage({ defaultMessage: "Comment", id: "YvbDJF7NMN" });
}
function Ie(e, t, n) {
  return e.formatMessage(
    {
      defaultMessage:
        "{label}, {count, plural, one {# open comment} other {# open comments}}",
      id: "YiSpn0UcE4",
    },
    { label: t, count: n },
  );
}
var Le = [],
  Re = 250,
  ze = u(function ({
    title: s,
    titlePending: u,
    viewingLabel: f,
    heading: p,
    currentKey: h,
    frames: g,
    onSelect: v,
    pageActions: y = Le,
    onPageAction: x,
    onExportTab: ee,
    onPageExportTab: ne,
    commentModeOn: oe,
    commentAppendGated: se,
    commentHotkey: ce,
    onCommentModeToggle: w,
    commentUnresolved: T,
    triggerRef: ue,
    verbs: D,
    onReload: O,
    reloadDisabled: he,
    pin: _e,
    onOpenInNewWindow: be,
    onOpenInWeb: xe,
    openInWebAsTab: Se,
    onDelete: A,
    onMenusOpenChange: Ce,
    feedback: j,
    menuPlacement: Ee = "split",
    expand: M,
    chat: N,
    askClaude: Ae,
    afterVersions: je,
    closeTab: Re,
    commentViewOnly: ze,
    commentDisabled: Je,
    commentForPage: Ye,
    copyMarkdown: Qe,
    pageSource: $e,
    menuDensity: P,
    switcherGroups: F = !1,
    renderReport: nt,
    diagnostics: I,
    popOutIcon: rt,
    pageActionFloorMs: it,
    detachedTrigger: L,
    variant: R = "pane",
    triggerProps: at,
    triggerBar: ot,
    popupSize: st,
    renameInput: ct,
    renderDeleteConfirm: lt,
    freeze: ut = "all",
    onMenuOpenChange: dt,
    controlRef: ft,
    aboutRule: pt,
    noShareRow: mt,
    size: ht = "xs",
  }) {
    let z = C(),
      gt = de(),
      _t = P ?? gt,
      B = Ee !== "split" && D !== void 0,
      [vt, V] = t(!1),
      [H, U] = t(!1),
      [yt, bt] = t(!1),
      [W, G] = t(!1);
    c(() => {
      if (!W) return;
      let e = setTimeout(() => {
        (G(!1), bt(!0));
      }, 100);
      return () => clearTimeout(e);
    }, [W]);
    let [xt, St] = t(null),
      Ct = d((e) => {
        e || St(null);
      }, []),
      [wt, Tt] = t(null),
      Et = d((e) => {
        Tt((t) => t && { ...t, open: e });
      }, []),
      Dt = d((e) => {
        e || Tt(null);
      }, []),
      Ot = i(null),
      kt = e(() => Ve(ue, Ot), [ue]),
      At = A !== void 0,
      jt = vt && At;
    vt && !At && V(!1);
    let Mt = yt && (ct !== void 0 || D?.onRename !== void 0);
    yt && !Mt && bt(!1);
    let Nt = i(null);
    c(() => {
      let e = L?.anchor();
      Nt.current = e && "focus" in e ? e : null;
    }, [L, H, Mt]);
    let Pt = L ? Nt : Ot,
      Ft = D !== void 0,
      [It, Lt] = t(Ft);
    It !== Ft && (Lt(Ft), H && U(!1), W && G(!1));
    let Rt = L !== void 0,
      [zt, Bt] = t(Rt);
    zt !== Rt && (Bt(Rt), H && U(!1), W && G(!1));
    let [Vt, Ht] = t(h);
    Vt !== h && (Ht(h), H && U(!1), vt && V(!1), W && G(!1));
    let Ut = jt || wt !== null || H || W || Mt || xt !== null,
      Wt = i(!1),
      Gt = d(
        (e) => {
          Wt.current !== e && ((Wt.current = e), dt?.(e));
        },
        [dt],
      ),
      [Kt, qt] = t(0),
      Jt = d(
        (e) => {
          (U(e), qt((e) => e + 1), Gt(e));
        },
        [Gt],
      );
    (r(() => Gt(H), [H, Kt, Gt]), l(ft, () => ({ close: () => Jt(!1) }), [Jt]));
    let Yt = i(Ut);
    c(() => {
      Yt.current !== Ut && ((Yt.current = Ut), Ce?.(Ut));
    }, [Ut, Ce]);
    let Xt = i(Ce);
    (c(() => {
      Xt.current = Ce;
    }, [Ce]),
      c(
        () => () => {
          Yt.current && Xt.current?.(!1);
        },
        [],
      ));
    let Zt = d(async () => {
        A && (await A()) && V(!1);
      }, [A]),
      [Qt, $t] = t(null),
      en = Qt !== null && Qt.key === h && Qt.from === s;
    Qt !== null && !en && $t(null);
    let K = en ? Qt.to : s,
      tn = i(0);
    c(() => () => cancelAnimationFrame(tn.current), []);
    let nn = d(() => {
        (bt(!1),
          (tn.current = requestAnimationFrame(() => {
            let e = Nt.current ?? Ot.current;
            e &&
              e.ownerDocument.activeElement === e.ownerDocument.body &&
              e.focus();
          })));
      }, []),
      rn = D?.onRename,
      an = d(
        (e) => {
          (nn(),
            !(!rn || e === we(K)) &&
              ($t({ key: h, from: s, to: e }),
              rn(e).then((t) => {
                $t((n) =>
                  n?.to === e ? (t === null ? null : { ...n, to: t }) : n,
                );
              })));
        },
        [rn, nn, K, s, h],
      ),
      on = D?.inertWhileRenaming;
    c(() => {
      let e = Mt ? on?.current : null;
      if (e) return (Be(e, !0), () => Be(e, !1));
    }, [Mt, on]);
    let sn = Ge(x, it),
      cn = ge({ run: sn, triggerRef: Pt, open: H, resetKey: h }),
      ln = d(
        (e, t) => {
          te(e) ? cn.hold(e, t) : sn(e, t);
        },
        [cn, sn],
      ),
      un = y.findIndex((e) => pe.has(e.id)),
      dn = B && oe === !0 && y[un]?.disabled === !0,
      fn = (w !== void 0 || (B && ze === !0)) && (un === -1 || dn),
      pn = Ke(ee, Pt),
      mn = Ke(ne, Pt),
      q = e(() => {
        let e = (e) =>
            T !== void 0 && T > 0
              ? {
                  ariaLabel: R === "page" ? Ie(z, e, T) : void 0,
                  label:
                    R === "page"
                      ? e
                      : n(a, {
                          children: [
                            o("span", {
                              className: "sr-only",
                              children: Ie(z, e, T),
                            }),
                            o("span", { "aria-hidden": !0, children: e }),
                          ],
                        }),
                  trailing: o(re, {
                    "data-comment-unresolved-badge": "",
                    "aria-hidden": !0,
                    value: T,
                    max: 9999,
                    variant: "neutral",
                    size: "sm",
                  }),
                }
              : { label: e },
          t = Ze(
            y,
            z,
            ln,
            (t, n) => {
              if (!pe.has(t.id)) return [qe(t, z, ln)];
              if (n !== un) return [];
              let r = qe(t, z, ln);
              return [{ ...r, ...e(r.label) }];
            },
            Qe && {
              label: z.formatMessage({
                defaultMessage: "Copy as Markdown",
                id: "aRsvyMHQOT",
              }),
              icon: "Copy",
              disabled: Qe.disabled,
              onSelect: Qe.onSelect,
            },
            pn,
          ),
          r = Xe(z, $e, t, mn),
          i = B
            ? z.formatMessage(E.show_all_comments)
            : Fe(z, oe === !0, se === !0),
          s = fn
            ? [
                {
                  ...(w ? e(i) : { label: i }),
                  icon: le.show_all_comments,
                  checked: oe === !0,
                  checkedRole: "checkbox",
                  shortcut: ce === !0 && w ? "c" : void 0,
                  disabled: w === void 0 || Je === !0,
                  disabledReason: w ? void 0 : z.formatMessage(Pe.viewOnly),
                  onSelect: (e) => w?.(_(e)),
                },
              ]
            : [],
          c =
            B && N
              ? [
                  {
                    label: N.label,
                    icon: "ChatAdd",
                    disabled: N.disabled,
                    onSelect: N.onClick,
                  },
                ]
              : [],
          l = B
            ? [
                ...(M
                  ? [
                      {
                        label: M.expanded
                          ? z.formatMessage({
                              defaultMessage: "Collapse",
                              id: "W/V6+Y+Vy2",
                            })
                          : z.formatMessage({
                              defaultMessage: "Expand",
                              id: "b5wi/TtdZW",
                            }),
                        icon: M.expanded ? "Collapse" : "Expand",
                        shortcut: M.shortcut,
                        onSelect: M.onToggle,
                      },
                    ]
                  : []),
                ...et(z, {
                  onOpenInNewWindow: be,
                  onOpenInWeb: xe,
                  openInWebAsTab: Se,
                  popOutIcon: rt,
                }),
              ]
            : [],
          u = Ae
            ? [
                {
                  label: Ae.label,
                  icon: "Chats",
                  checked: Ae.shown,
                  checkedRole: "checkbox",
                  onSelect: Ae.onToggle,
                },
              ]
            : [],
          d = O
            ? et(z, {
                onReload: O,
                reloadDisabled: he,
                pin: _e,
                onOpenInNewWindow: B ? void 0 : be,
                onOpenInWeb: B ? void 0 : xe,
                openInWebAsTab: Se,
                popOutIcon: rt,
                onDeleteSelect: D === void 0 && A ? () => V(!0) : void 0,
              })
            : [],
          f = j
            ? [
                {
                  label: j.label,
                  icon: "Bullhorn",
                  trailing:
                    j.badge === void 0
                      ? void 0
                      : o(fe, { variant: "neutral", children: j.badge }),
                  onSelect: () => j.onSelect(),
                  attrs: k(R, "feedback"),
                },
                ...(j.fallback
                  ? [j.fallback].map((e) => ({
                      label: e.label,
                      icon: "Bullhorn",
                      onSelect: () => e.onSelect(),
                    }))
                  : []),
              ]
            : [],
          p = D?.feedbackForm;
        p &&
          f.push({
            label: f.length > 0 ? p.staffLabel : p.label,
            icon: "Bullhorn",
            onSelect: () => Tt({ verb: p, open: !0 }),
          });
        let m = D?.handOffCode,
          h = d.findIndex((e) => !e.items && e.variant === "danger");
        return {
          lead: B ? r : [...r, ...s],
          leadSource: r.length - t.length,
          talk: B ? [...s, ...c] : [],
          window: l,
          afterVersions: je,
          handOffCode: m
            ? [
                {
                  label: m.label,
                  icon: "CommandLine",
                  onSelect: () => Tt({ verb: m, open: !0 }),
                },
              ]
            : [],
          host: {
            before: [...(h === -1 ? d : d.slice(0, h)), ...u],
            after: h === -1 ? [] : d.slice(h),
          },
          feedback: f,
          pageOwnsFeedback: y.some((e) => e.id === "send_feedback"),
          switcherFrames: D && g && g.length >= 2 ? g : void 0,
          verbs: D,
          pageOwnsRename: y.some((e) => e.id === "rename"),
          pageOwnsVersions: y.some((e) => e.id === "version_history"),
        };
      }, [
        z,
        y,
        ln,
        T,
        un,
        fn,
        w,
        oe,
        se,
        ce,
        D,
        O,
        he,
        _e,
        be,
        xe,
        Se,
        rt,
        A,
        j,
        B,
        M,
        N,
        Ae,
        je,
        Je,
        g,
        Qe,
        $e,
        pn,
        mn,
        R,
      ]),
      [J, hn] = t(q),
      gn = L?.opens,
      [_n, vn] = t(gn);
    _n !== gn &&
      (vn(gn), gn !== void 0 && _n !== void 0 && !H && (hn(q), G(!1), U(!0)));
    let Y = e(() => {
        if (!H) return q;
        if (ut === "all") return J;
        let e = J.verbs?.versions,
          t = q.verbs?.versions;
        return {
          ...q,
          lead: J.lead,
          leadSource: J.leadSource,
          pageOwnsRename: J.pageOwnsRename,
          pageOwnsVersions: J.pageOwnsVersions,
          pageOwnsFeedback: J.pageOwnsFeedback,
          verbs: q.verbs && {
            ...q.verbs,
            versions: y.length > 0 && t && !e ? void 0 : t,
          },
        };
      }, [H, ut, J, q, y.length]),
      yn =
        Y.afterVersions !== void 0 &&
        Y.afterVersions.rows.length > 0 &&
        o(b.Group, {
          "aria-label": Y.afterVersions.label,
          children: ae(Y.afterVersions.rows),
        }),
      bn = Ke((Y.verbs ?? D)?.share?.onShare, Pt);
    H && v && Y.switcherFrames && (g?.length ?? 0) < 2 && U(!1);
    let { lead: X, leadSource: xn } = Y,
      Z = {
        before: Y.host.before,
        after: Y.pageOwnsFeedback
          ? Y.host.after
          : [...Y.feedback, ...Y.host.after],
      },
      Sn = Z.before.length > 0 || Z.after.length > 0,
      Cn = Z.before.length > 0,
      wn = n(a, { children: [ae(Z.before), ae(Z.after)] }),
      Tn = i(-1 / 0),
      En = d(
        (e, t) => {
          if (e && (t.event?.timeStamp ?? 1 / 0) <= Tn.current) {
            t.cancel();
            return;
          }
          (e && (hn(q), G(!1)), Jt(e));
        },
        [q, Jt],
      ),
      Dn = y.find((e) => e.id === "rename"),
      On = D !== void 0 && (Dn ? Dn.disabled !== !0 : D.onRename !== void 0),
      kn = d(
        (e) => {
          ((Tn.current = e.timeStamp), Jt(!1), Dn ? sn("rename") : G(!0));
        },
        [Dn, sn, Jt],
      ),
      Q = z.formatMessage({
        defaultMessage: "Artifact options",
        id: "WYg57H32z+",
      }),
      An = f ?? ((D?.versions && D.versions.viewingLabel) || void 0),
      jn = u ? z.formatMessage(Me.pending) : void 0,
      Mn = An
        ? z.formatMessage(
            {
              defaultMessage: "{menuLabel}, {title}, {version}",
              id: "8WRfn4uzdD",
            },
            { menuLabel: Q, title: jn ?? K, version: An },
          )
        : z.formatMessage(
            { defaultMessage: "{menuLabel}, {title}", id: "2SjLE/5+Oo" },
            { menuLabel: Q, title: jn ?? K },
          ),
      Nn =
        An &&
        o(fe, {
          variant: "neutral",
          size: "xs",
          className: "shrink-0",
          ...k(R, "viewingPill"),
          children: An,
        }),
      Pn = n(S, {
        ref: kt,
        ...k(R, "trigger"),
        ...at,
        variant: "ghost",
        size: ht,
        className: ht === "base" ? ke : Oe,
        "aria-label": p ? jn : Mn,
        "aria-description": p ? Q : void 0,
        onDoubleClick: On ? kn : void 0,
        children: [
          o(Ne, { title: K, pending: u, size: ht }),
          Nn,
          !u &&
            o(me, {
              name: "CaretDown",
              size: "xs",
              className: "shrink-0 opacity-60",
            }),
        ],
      }),
      Fn =
        R === "page"
          ? o(Ue, {
              ref: kt,
              title: K,
              pill: An,
              menuLabel: Q,
              onDoubleClick: On ? kn : void 0,
              bar: ot,
              ...at,
            })
          : Pn,
      In = L
        ? o(b.Trigger, {
            render: o("button", {
              type: "button",
              hidden: !0,
              "aria-label": Q,
            }),
          })
        : o(b.Trigger, { render: Fn }),
      Ln = L
        ? (e) => {
            let t = e.target.closest?.('[role="menu"]');
            e.key === "Tab" && !e.shiftKey && t && (e.preventDefault(), U(!1));
          }
        : void 0,
      Rn =
        Re &&
        o(b.Item, {
          icon: "X",
          "data-testid": "frame-title-menu-close-tab",
          onClick: Re.onSelect,
          children: Re.label,
        }),
      zn;
    if (Mt)
      zn = ct
        ? o(He, { render: ct, title: K, done: nn })
        : o(We, { title: K, onCommit: an, onCancel: nn, variant: R, size: ht });
    else if (D === void 0)
      zn = n(
        b.Root,
        {
          open: L ? H : void 0,
          onOpenChange: En,
          onOpenChangeComplete: cn.onOpenChangeComplete,
          children: [
            In,
            o(m, {
              density: _t,
              className: "contents",
              render: o("span", {}),
              children: n(b.Popup, {
                align: "start",
                "aria-label": Q,
                anchor: L?.anchor,
                finalFocus: L ? Nt : void 0,
                onKeyDown: Ln,
                children: [
                  ae(X),
                  I !== void 0 &&
                    n(a, { children: [X.length > 0 && o(b.Separator, {}), I] }),
                  Rn && (X.length > 0 || I !== void 0) && o(b.Separator, {}),
                  Rn,
                  (X.length > 0 || I !== void 0 || Rn !== void 0) &&
                    Sn &&
                    o(b.Separator, {}),
                  wn,
                ],
              }),
            }),
          ],
        },
        L ? "host-detached" : "host",
      );
    else {
      let { pageOwnsRename: e, pageOwnsVersions: t } = Y,
        r = Y.verbs ?? D,
        i = z.formatMessage(E.version_history),
        { switcherFrames: s } = Y,
        c =
          s &&
          v &&
          n(a, {
            children: [
              n(b.Submenu, {
                children: [
                  o(b.SubmenuTrigger, {
                    icon: "Files",
                    ...k(R, "switcher"),
                    "aria-label": z.formatMessage(
                      {
                        defaultMessage:
                          "Switch artifact, {count, plural, one {# artifact} other {# artifacts}}",
                        id: "7hpWVfIsAX",
                      },
                      { count: s.length },
                    ),
                    hint: z.formatNumber(s.length),
                    children: z.formatMessage({
                      defaultMessage: "Switch artifact",
                      id: "+1/fDNTEMc",
                    }),
                  }),
                  o(b.Popup, {
                    maxVisibleItems: 11.5,
                    collisionAvoidance: { side: "shift" },
                    className: "min-w-[240px]",
                    children: o(De, {
                      frames: s,
                      currentKey: h,
                      onSelect: v,
                      switcherGroups: F,
                    }),
                  }),
                ],
              }),
              o(b.Separator, {}),
            ],
          }),
        l = (e) => (R === "page" ? o(me, { name: e, size: "sm" }) : e),
        u = (e) => (R === "page" ? ye(e, st) : ae(e)),
        d =
          !e &&
          o(ve, {
            reason: r.onRename ? void 0 : r.renameDisabledReason,
            children: o(b.Item, {
              icon: l(le.rename),
              ...k(R, "rename"),
              disabled: !r.onRename,
              "aria-description": r.onRename ? void 0 : r.renameDisabledReason,
              onClick: () => G(!0),
              children: z.formatMessage(E.rename),
            }),
          }),
        f =
          r.duplicate &&
          o(ve, {
            reason: r.duplicate.disabledReason,
            children: o(b.Item, {
              icon: l("Copy"),
              ...k(R, "duplicate"),
              disabled:
                r.duplicate.disabledReason !== void 0 ||
                r.duplicate.busy === !0,
              "aria-description": r.duplicate.disabledReason,
              onClick: r.duplicate.onDuplicate,
              children:
                r.duplicate.label ??
                z.formatMessage({
                  defaultMessage: "Duplicate",
                  id: "Qra9AIxxzg",
                }),
            }),
          }),
        p = o(b.Item, {
          icon: l(r.share?.copiesLink ? "Link" : "Share"),
          ...k(R, "share"),
          disabled: !r.share,
          "aria-description": r.share ? void 0 : r.shareDisabledReason,
          onClick: bn,
          children:
            r.share?.label ??
            z.formatMessage({ defaultMessage: "Share", id: "OKhRC6eWRw" }),
        }),
        g =
          r.permissions &&
          o(b.Item, {
            icon: l("Lock"),
            ...k(R, "permissions"),
            onClick: r.permissions.onOpen,
            children: z.formatMessage({
              defaultMessage: "Permissions",
              id: "y/jY+A8Uxf",
            }),
          }),
        _ =
          r.install &&
          o(b.Item, {
            icon: r.install.icon,
            ...k(R, "install"),
            disabled: r.install.disabled,
            disabledReason: r.install.disabledReason ?? "",
            trailing:
              r.install.checkingLabel === void 0
                ? void 0
                : o(ie, { size: "sm", label: r.install.checkingLabel }),
            onClick: r.install.onInstall,
            children: r.install.label,
          }),
        y =
          r.saveVersion &&
          o(ve, {
            reason: r.saveVersion.reason,
            children: o(b.Item, {
              icon: l("Bookmark"),
              ...k(R, "saveVersion"),
              disabled: r.saveVersion.disabled,
              "aria-description": r.saveVersion.reason,
              onClick: r.saveVersion.onOpen,
              children: r.saveVersion.label,
            }),
          }),
        x =
          r.askBeforeSending &&
          o(b.Item, {
            icon: l("Chats"),
            ...k(R, "askBeforeSending"),
            disabled: r.askBeforeSending.disabled,
            onClick: r.askBeforeSending.onSelect,
            children: r.askBeforeSending.label,
          }),
        ee =
          r.openTopLevel &&
          o(b.Item, {
            icon: l("ArrowOutSquare"),
            ...k(R, "openTopLevel"),
            href: r.openTopLevel.href,
            target: "_blank",
            rel: "noopener noreferrer",
            children: r.openTopLevel.label,
          }),
        S =
          t || r.versions === !1
            ? null
            : r.versions && r.versions.count > 0
              ? n(b.Submenu, {
                  children: [
                    o(b.SubmenuTrigger, {
                      icon: l(le.version_history),
                      ...k(R, "versions"),
                      "aria-label": z.formatMessage(
                        {
                          defaultMessage:
                            "Version history, {count, plural, one {# version} other {# versions}}",
                          id: "z8x+RBE6Zx",
                        },
                        { count: r.versions.count },
                      ),
                      hint: z.formatNumber(r.versions.count),
                      children: i,
                    }),
                    o(b.Popup, {
                      maxVisibleItems: 12,
                      collisionAvoidance: { side: "shift" },
                      "data-size": st,
                      className: "min-w-[280px] max-w-[320px]",
                      children: r.versions.list,
                    }),
                  ],
                })
              : o(b.Item, {
                  icon: l(le.version_history),
                  ...k(R, "versions"),
                  disabled: !0,
                  children: i,
                }),
        te =
          r.report &&
          (nt || r.report.onOpen) &&
          o(b.Item, {
            icon: l("Flag"),
            ...k(R, "report"),
            onClick: () => {
              let { onOpen: e } = r.report ?? {};
              e ? (Pt.current?.focus(), e()) : St(r.report ?? null);
            },
            children: z.formatMessage({
              defaultMessage: "Report artifact",
              id: "QJtQ9Nwonx",
            }),
          }),
        C = o(b.Item, {
          icon: l("Trash"),
          variant: "danger",
          ...k(R, "delete"),
          disabled: !At,
          onClick: () => V(!0),
          children: z.formatMessage({
            defaultMessage: "Delete artifact",
            id: "GebYkabqA7",
          }),
        }),
        ne =
          r.storage &&
          n(a, {
            children: [
              o(b.Separator, {}),
              o(Te, { menu: r.storage, variant: R, popupSize: st }),
            ],
          });
      zn = n(b.Root, {
        open: H,
        onOpenChange: En,
        onOpenChangeComplete: cn.onOpenChangeComplete,
        children: [
          In,
          L && Nn,
          o(m, {
            density: _t,
            className: "contents",
            render: o("span", {}),
            children: n(b.Popup, {
              align: "start",
              sideOffset: R === "page" ? 4 : void 0,
              "data-size": st,
              "aria-label": Q,
              anchor: L?.anchor,
              finalFocus: L ? Nt : void 0,
              onKeyDown: Ln,
              className: "min-w-[240px]",
              header: c ? n(a, { children: [c, r.about] }) : r.about,
              footer: n(a, {
                children: [
                  o(b.Separator, {}),
                  Rn && n(a, { children: [Rn, o(b.Separator, {})] }),
                  I !== void 0 && n(a, { children: [I, o(b.Separator, {})] }),
                  B && u(Z.after),
                  te,
                  B && (!!te || Z.after.length > 0) && o(b.Separator, {}),
                  C,
                ],
              }),
              children: [
                pt && o(b.Separator, {}),
                u(X.slice(0, xn)),
                _,
                u(X.slice(xn)),
                (X.length > 0 || !!_) && o(b.Separator, {}),
                d,
                f,
                r.afterDuplicate,
                mt !== !0 &&
                  (R === "page"
                    ? o(ve, {
                        reason: r.share ? void 0 : r.shareDisabledReason,
                        children: p,
                      })
                    : p),
                g,
                S,
                Y.afterVersions?.joined && yn,
                y,
                Y.handOffCode.length > 0 && o(b.Separator, {}),
                ae(Y.handOffCode),
                !Y.afterVersions?.joined &&
                  yn &&
                  n(a, { children: [o(b.Separator, {}), yn] }),
                (Y.talk.length > 0 || !!x) && o(b.Separator, {}),
                u(Y.talk),
                x,
                (Y.window.length > 0 || !!ee) && o(b.Separator, {}),
                u(Y.window),
                ee,
                (B ? Cn : Sn) && o(b.Separator, {}),
                u(Z.before),
                !B && u(Z.after),
                ne,
              ],
            }),
          }),
        ],
      });
    }
    return n(a, {
      children: [
        p
          ? o(p ? "h2" : "span", { className: "flex min-w-0", children: zn })
          : zn,
        fn &&
          o("span", {
            className: "sr-only",
            "aria-live": "polite",
            children:
              oe && Ye !== !0
                ? z.formatMessage({
                    defaultMessage: "Comment mode on",
                    id: "5IiHP/x1do",
                  })
                : "",
          }),
        lt
          ? lt({ open: jt, close: () => V(!1) })
          : A &&
            o(tt, {
              open: jt,
              onOpenChange: V,
              onConfirm: Zt,
              versionCount: D?.deleteVersionCount,
              note: D?.deleteConfirmNote,
            }),
        xt && nt?.(xt, () => Ct(!1)),
        wt?.verb.render({
          open: wt.open,
          onOpenChange: Et,
          onOpenChangeComplete: Dt,
        }),
      ],
    });
  });
function Be(e, t) {
  e.inert = t;
}
function Ve(...e) {
  return (t) => {
    for (let n of e) typeof n == "function" ? n(t) : n && (n.current = t);
  };
}
function He({ render: e, title: t, done: n }) {
  return e({ title: t, done: n });
}
function Ue({ title: e, pill: t, menuLabel: r, bar: i, ...a }) {
  let s = C(),
    c = o(me, { name: "CaretDown", size: "xs", className: "opacity-60" }),
    l = a;
  if (e === "" && t === void 0)
    return o(S, {
      ...k("page", "trigger"),
      style: i?.style,
      ...l,
      variant: "ghost",
      size: i ? i.size : "xs",
      iconOnly: !0,
      icon: c,
      "aria-label": r,
      tooltip: !1,
    });
  let u = i?.titleClass === void 0,
    d =
      t !== void 0 &&
      o("span", {
        ...k("page", "viewingPill"),
        className:
          "ms-0.5 shrink-0 self-center rounded-full bg-neutral px-1.5 py-[1px] text-footnote text-secondary",
        children: t,
      });
  return n(S, {
    ...k("page", "trigger"),
    style: i?.style,
    ...l,
    variant: "ghost",
    size: i ? i.size : "xs",
    icon: c,
    iconPosition: "end",
    className: u ? "ms-[2px] !ps-[6px]" : void 0,
    "aria-label":
      e === ""
        ? s.formatMessage(
            { defaultMessage: "Artifact options, {version}", id: "49fR+X70Hb" },
            { version: t ?? "" },
          )
        : void 0,
    children: [
      e !== "" &&
        o("span", { className: `me-0.5 ${i?.titleClass ?? he}`, children: e }),
      d,
    ],
  });
}
function We({
  title: e,
  onCommit: n,
  onCancel: a,
  variant: s,
  label: c,
  prefill: l = !0,
  commitOnBlur: u = !0,
  size: d = "xs",
}) {
  let f = C(),
    [p] = t(e),
    m = i(null),
    h = i(!1),
    g = i(!1);
  r(() => {
    (m.current?.focus(), m.current?.select(), (g.current = !0));
    let e = setTimeout(() => {
      g.current = !1;
    }, Re);
    return () => {
      (clearTimeout(e), (g.current = !1));
    };
  }, []);
  let _ = (e) => {
      if (h.current) return;
      h.current = !0;
      let t = we(e);
      t ? n(t) : a();
    },
    v = (e) => {
      if (g.current && !h.current) {
        m.current?.focus();
        return;
      }
      u ? _(e.currentTarget.value) : h.current || ((h.current = !0), a());
    };
  return o(ce, {
    ref: m,
    ...k(s, "renameInput"),
    size: d,
    fullWidth: !1,
    className: ne("w-[min(20rem,100%)] min-w-0", d === "xs" && "text-footnote"),
    defaultValue: l ? p : "",
    placeholder: l ? void 0 : we(p),
    spellCheck: !1,
    autoComplete: "off",
    enterKeyHint: "done",
    "aria-label":
      c ??
      f.formatMessage({ defaultMessage: "Artifact name", id: "g/8Flw67Tb" }),
    onBlur: v,
    onKeyDown: (e) => {
      e.nativeEvent.isComposing ||
        (e.stopPropagation(),
        e.key === "Enter"
          ? (e.preventDefault(), _(e.currentTarget.value))
          : e.key === "Escape" && (e.preventDefault(), (h.current = !0), a()));
    },
  });
}
function Ge(e, t) {
  let n = i(0);
  return d(
    (r, i) => {
      let a = Date.now();
      (a < n.current && (n.current = 0),
        !(a - n.current < t) && e?.(r, i) !== !1 && (n.current = a));
    },
    [e, t],
  );
}
function Ke(e, t) {
  let n = d(() => e?.(t.current), [e, t]);
  return e ? n : void 0;
}
function qe(e, t, n) {
  return {
    label: t.formatMessage(E[e.id]),
    icon: le[e.id],
    disabled: e.disabled === !0,
    onSelect: (t) => n(e.id, _(t)),
    attrs: { "data-page-action": e.id },
  };
}
var Je = [{ ids: O, build: $e }];
function Ye(e, t, n) {
  let r = [],
    i = t?.exportTab === !0 && n !== void 0;
  return (
    i &&
      r.push({
        label: e.formatMessage(D.label),
        icon: D.icon,
        onSelect: n,
        attrs: k("page", "exportTab"),
      }),
    t?.download &&
      !i &&
      r.push({
        label: e.formatMessage(D.label),
        icon: D.icon,
        attrs: k("page", "downloadSubmenu"),
        items: [
          {
            label: e.formatMessage({
              defaultMessage: "Download",
              id: "5q3qC0sC3r",
            }),
            onSelect: t.download.onSelect,
            attrs: k("page", "download"),
          },
        ],
      }),
    t?.copyMarkdown &&
      r.push({
        label: e.formatMessage({
          defaultMessage: "Copy as Markdown",
          id: "aRsvyMHQOT",
        }),
        icon: "Copy",
        onSelect: t.copyMarkdown.onSelect,
        attrs: k("page", "copyMarkdown"),
      }),
    r
  );
}
function Xe(e, t, n, r) {
  let i = Ye(e, t, r),
    a = e.formatMessage(D.label),
    o = n.findIndex((e) => e.items !== void 0 && e.label === a),
    s = i.find((e) => e.items !== void 0),
    c = s?.items;
  return o === -1 || c === void 0
    ? [...i, ...n]
    : [
        ...i.filter((e) => e !== s),
        ...n.map((e, t) => {
          let n = e.items;
          return t === o && n !== void 0
            ? { ...e, disabled: !1, items: [...c, ...n] }
            : e;
        }),
      ];
}
function Ze(e, t, n, r = (e) => [qe(e, t, n)], i, a) {
  let o = Je.flatMap(({ ids: r, build: i }) => {
      let o = e.findIndex((e) => r.has(e.id)),
        s = o === -1 ? void 0 : i(e, t, n, a);
      return s === void 0 ? [] : [{ ids: r, at: o, item: s }];
    }),
    s = o.find((e) => e.ids === O)?.at ?? Qe(e),
    c = e.flatMap((e, t) => {
      let n = o.find((t) => t.ids.has(e.id)),
        a = n === void 0 ? r(e, t) : t === n.at ? [n.item] : [];
      return i && t === s ? [...a, i] : a;
    });
  return i && s === -1 ? [i, ...c] : c;
}
function Qe(e) {
  for (let t = e.length - 1; t >= 0; t--) if (O.has(e[t].id)) return t;
  return -1;
}
function $e(e, t, n, r) {
  let i = e.filter((e) => ue.has(e.id));
  if (r !== void 0 && i.length > 0)
    return {
      label: t.formatMessage(D.label),
      icon: D.icon,
      disabled: i.every((e) => e.disabled === !0),
      onSelect: r,
      attrs: k("page", "exportTab"),
    };
  let a = D.items.flatMap((r) => {
    let i = e.find((e) => e.id === r.id);
    return i
      ? [{ ...qe(i, t, n), label: t.formatMessage(r.label), icon: void 0 }]
      : [];
  });
  if (!(a.length < 2))
    return {
      label: t.formatMessage(D.label),
      icon: D.icon,
      disabled: a.every((e) => e.disabled === !0),
      items: a,
      attrs: { "data-page-submenu": "export" },
    };
}
function et(
  e,
  {
    onReload: t,
    reloadDisabled: n,
    pin: r,
    onOpenInNewWindow: i,
    onOpenInWeb: a,
    openInWebAsTab: o,
    onDeleteSelect: s,
    popOutIcon: c,
  },
) {
  return [
    ...(t
      ? [
          {
            label: e.formatMessage({
              defaultMessage: "Refresh",
              id: "rELDbByu8U",
            }),
            icon: "ArrowClockwise",
            disabled: n,
            onSelect: () => t(),
            attrs: k("page", "refresh"),
          },
        ]
      : []),
    ...(r
      ? [
          {
            label: r.pinned
              ? e.formatMessage({ defaultMessage: "Unpin", id: "nR6dLhVwqy" })
              : e.formatMessage({ defaultMessage: "Pin", id: "AJ2W7itqO2" }),
            icon: r.pinned ? "PinSlash" : "Pin",
            onSelect: () => r.onToggle(),
            attrs: k("page", "pin"),
          },
        ]
      : []),
    ...(i
      ? [
          {
            label: e.formatMessage({
              defaultMessage: "Pop out",
              id: "iPB+yDOHy9",
            }),
            icon: c ?? "WindowNew",
            onSelect: () => i(),
          },
        ]
      : []),
    ...(a
      ? [
          {
            label: o
              ? e.formatMessage({
                  defaultMessage: "Open in new tab",
                  id: "jeJllqD20B",
                })
              : e.formatMessage({
                  defaultMessage: "Open in web",
                  id: "2lqU42X0l6",
                }),
            icon: "ArrowOutSquare",
            onSelect: () => a(),
          },
        ]
      : []),
    ...(s
      ? [
          {
            label: e.formatMessage({
              defaultMessage: "Delete artifact",
              id: "GebYkabqA7",
            }),
            icon: "Trash",
            variant: "danger",
            separatorBefore: !0,
            onSelect: () => s(),
          },
        ]
      : []),
  ];
}
function tt({
  open: e,
  onOpenChange: t,
  onConfirm: n,
  versionCount: r,
  note: i,
}) {
  let a = C(),
    s =
      r !== void 0 && r > 0
        ? a.formatMessage(
            {
              defaultMessage:
                "This permanently removes the artifact and {count, plural, one {its # version} other {all # versions}}. It can\u2019t be undone.",
              id: "qctQ/0V2s4",
            },
            { count: r },
          )
        : a.formatMessage({
            defaultMessage:
              "This permanently removes the artifact. It can\u2019t be undone.",
            id: "UbNRtGu+Z+",
          });
  return o(oe, {
    open: e,
    onOpenChange: t,
    title: a.formatMessage({
      defaultMessage: "Delete artifact?",
      id: "g2pIGBO0mC",
    }),
    description: i ? `${i} ${s}` : s,
    confirmLabel: a.formatMessage({
      defaultMessage: "Delete",
      id: "K3r6DQW7h+",
    }),
    confirmVariant: "danger",
    onConfirm: n,
  });
}
var P = h({
    share: { defaultMessage: "Share", id: "OKhRC6eWRw" },
    copyLink: { defaultMessage: "Copy link", id: "lbr3Lq2Lnm" },
    duplicateVersion: {
      defaultMessage: "Duplicate Version {n}",
      id: "OISkLs4kFd",
    },
    versionOrdinal: { defaultMessage: "Version {n}", id: "SEjRqmz1pf" },
    olderVersion: { defaultMessage: "Older version", id: "2AR/HX9wFV" },
  }),
  F = h({
    plan: {
      defaultMessage: "This feature isn\u2019t included in your plan.",
      id: "tZI5+4rbeq",
    },
    liveDoc: {
      defaultMessage: "This artifact can\u2019t be renamed yet.",
      id: "sCL6VLtJrp",
    },
    signIn: { defaultMessage: "Sign in to make a copy.", id: "erxk9MDLnI" },
    entitlement: {
      defaultMessage: "Your account can\u2019t create artifacts.",
      id: "eEM6BjQXvL",
    },
    unpublishedCopy: {
      defaultMessage: "Unpublished artifacts can\u2019t be copied.",
      id: "X446/C2fyu",
    },
    unavailableCopy: {
      defaultMessage: "This artifact can\u2019t be copied.",
      id: "mQx0NBdE8u",
    },
    ownerOnlyCopy: {
      defaultMessage: "Only Owners can copy this artifact.",
      id: "OvP8lfQUkH",
    },
  });
function nt(e, t, n) {
  if (n === "plan") return e.formatMessage(F.plan);
  if (t === "rename")
    return n === "live_doc" ? e.formatMessage(F.liveDoc) : void 0;
  switch (n) {
    case "sign_in":
      return e.formatMessage(F.signIn);
    case "entitlement":
      return e.formatMessage(F.entitlement);
    case "unpublished":
      return e.formatMessage(F.unpublishedCopy);
    case "owner_only":
      return e.formatMessage(F.ownerOnlyCopy);
    case "unavailable":
      return e.formatMessage(F.unavailableCopy);
    default:
      return;
  }
}
var I = (e) => e !== void 0 && e.disabled !== !0;
function rt(e, t, n, r) {
  let { menu: i } = e,
    a = (e) => i.find((t) => t.id === e && t.source !== "page"),
    o =
      e.notice?.kind === "unpublished" ||
      i.some((e) => e.id === "rename" && e.reason === "unpublished"),
    { pageAction: s } = t,
    c = [];
  for (let e of i)
    e.source === "page" &&
      e.group === "page" &&
      ee(e.id) &&
      c.push(
        e.disabled === !0 || s === void 0
          ? { id: e.id, disabled: !0 }
          : { id: e.id },
      );
  let l = {
      ...(I(a("export_tab")) && { exportTab: !0 }),
      ...(I(a("download")) &&
        t.download && { download: { onSelect: t.download } }),
      ...(I(a("copy_markdown")) &&
        t.copyMarkdown && { copyMarkdown: { onSelect: t.copyMarkdown } }),
    },
    u = a("rename"),
    d = a("duplicate"),
    f = nt(r, "duplicate", d?.reason),
    { duplicate: p, copyLink: m, setPinned: h, openDialog: g } = t,
    _ = a("copy_link")?.url,
    v = (e.share === "manage" || e.share === "view") && !o,
    y = a("pin") ?? a("unpin"),
    b = a("permissions"),
    x = Array.isArray(e.versions) ? e.versions : void 0,
    { viewing: S } = e,
    te =
      S === void 0
        ? void 0
        : S.n === null
          ? r.formatMessage(P.olderVersion)
          : r.formatMessage(P.versionOrdinal, { n: S.n }),
    C = {
      about: n.about,
      onRename: I(u) ? t.rename : void 0,
      renameDisabledReason: nt(r, "rename", u?.reason),
      inertWhileRenaming: n.inertWhileRenaming,
      duplicate:
        d && p
          ? {
              onDuplicate: () => p(d.ver ?? null),
              label:
                typeof d.n == "number"
                  ? r.formatMessage(P.duplicateVersion, { n: d.n })
                  : void 0,
              disabledReason: f,
              busy: d.disabled === !0 && f === void 0,
            }
          : void 0,
      share: o
        ? void 0
        : v && t.share
          ? { label: r.formatMessage(P.share), onShare: t.share }
          : _ !== void 0 && m
            ? {
                label: r.formatMessage(P.copyLink),
                copiesLink: !0,
                onShare: () => m(_),
              }
            : void 0,
      shareDisabledReason: void 0,
      permissions: I(b) && g ? { onOpen: () => g("permissions") } : void 0,
      versions:
        e.versions === !1 || !i.some((e) => e.id === "version_history")
          ? !1
          : I(a("version_history")) &&
              x !== void 0 &&
              x.length > 0 &&
              n.versionList !== void 0
            ? { count: x.length, list: n.versionList, viewingLabel: te }
            : void 0,
      feedbackForm: n.feedbackForm,
      handOffCode: n.handOffCode,
      storage: n.storage,
      report:
        a("report") && (n.renderReport || (n.hostReportDialog === !0 && g))
          ? {
              slug: e.uuid,
              orgUuid: void 0,
              onOpen: !n.renderReport && g ? () => g("report") : void 0,
            }
          : void 0,
      deleteVersionCount: x?.length,
      deleteConfirmNote: void 0,
      afterDuplicate: void 0,
      install: void 0,
      saveVersion: void 0,
      askBeforeSending: void 0,
      openTopLevel: void 0,
    };
  return {
    title: e.title,
    titlePending: e.titlePending,
    viewingLabel: te,
    currentKey: n.switcher?.currentKey ?? e.uuid,
    frames: n.switcher?.frames,
    onSelect: n.switcher?.onSelect,
    pageActions: c.length > 0 ? c : Le,
    onPageAction: s && ((e, t) => (ee(e) ? s(e, t) : !1)),
    onExportTab: v || (e.exportSheet === !0 && !o) ? t.exportTab : void 0,
    onPageExportTab: I(a("export_tab")) ? t.exportTab : void 0,
    pageSource: Object.keys(l).length > 0 ? l : void 0,
    verbs: C,
    onReload: a("refresh") ? t.refresh : void 0,
    pin:
      y && h
        ? { pinned: y.id === "unpin", onToggle: () => h(y.id !== "unpin") }
        : void 0,
    onOpenInNewWindow: t.openIn?.window,
    onOpenInWeb: a("open_in_browser") ? t.openIn?.browser : void 0,
    onDelete: I(a("delete")) ? t.remove : void 0,
    renderReport: n.renderReport,
  };
}
export {
  Xe as _,
  Le as a,
  We as c,
  et as d,
  Ie as f,
  Ke as g,
  Ge as h,
  tt as i,
  Ne as l,
  Ze as m,
  ze as n,
  Me as o,
  Ve as p,
  Pe as r,
  N as s,
  rt as t,
  Fe as u,
  De as v,
};
