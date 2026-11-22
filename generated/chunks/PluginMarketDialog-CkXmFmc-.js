import { d as O, w as R, x as T, u as s, f as i, g as l, h as n, q as m, t as o, j as p, F as C, i as I, k as K, n as U, s as V, r as W } from "./vendor-vue-_upDT3S_.js";
import { u as j } from "./useWindowDraggable-DlE89hnn.js";
import { h as c, P as A } from "./window-manager.store-D2fEf4ic.js";
import { t as r } from "./_plugin-vue_export-helper-DtNgUcga.js";
const z = ["aria-busy", "aria-label"], G = { class: "pm-header-left" }, q = { class: "pm-kind-tabs" }, J = {
  key: 0,
  role: "status",
  class: "pm-operation-error"
}, Q = {
  key: 1,
  role: "alert",
  class: "pm-operation-error"
}, X = { class: "pm-body" }, Y = {
  key: 0,
  class: "pm-empty"
}, Z = {
  key: 1,
  class: "pm-grid"
}, ee = { class: "pm-card-top" }, te = { class: "pm-card-icon-box" }, se = ["src", "alt", "onError"], ne = {
  key: 1,
  class: "pm-card-icon-emoji"
}, ae = { class: "pm-card-title-col" }, oe = { class: "pm-card-name-row" }, re = { class: "pm-card-title" }, ie = { class: "pm-card-version" }, le = { class: "pm-card-meta-row" }, de = {
  key: 0,
  class: "pm-card-dev-badge"
}, ce = { class: "pm-card-cat-badge" }, ue = { class: "pm-card-author" }, pe = { class: "pm-card-desc" }, me = {
  key: 0,
  class: "pm-core-tip"
}, ke = { class: "pm-card-tags" }, he = { class: "pm-card-footer" }, ge = { class: "pm-installed-pill" }, fe = { class: "pm-footer-right" }, ye = ["href"], _e = ["aria-checked", "aria-label", "disabled", "onClick"], $e = /* @__PURE__ */ O({
  __name: "PluginMarketDialog",
  setup(ve) {
    const d = c.state, h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48, g = Math.min(920, Math.max(1, window.innerWidth - 40)), { panelRef: k, headerRef: $, initialStyle: S, onHeaderPointerDown: f, onHeaderClickCapture: y, restoreSavedPosition: x } = j({
      windowId: "market",
      managed: !1,
      defaultWidth: g,
      defaultHeight: Math.min(680, Math.max(260, window.innerHeight - h - 110)),
      defaultLeft: window.innerWidth - g - 20,
      defaultTop: h + 12,
      active: () => d.isOpen,
      onFocus: () => k.value?.focus({ preventScroll: !0 })
    });
    let _ = 0;
    R(() => d.isOpen, async (a) => {
      const t = ++_;
      a && (await T(), !(!d.isOpen || t !== _) && (x(), k.value?.focus({ preventScroll: !0 })));
    }, { immediate: !0 });
    const v = V(() => {
      const a = d.kindFilter;
      return A.filter((t) => (t.kind || "module") === a);
    });
    function F(a) {
      c.install(a);
    }
    function M(a) {
      c.uninstall(a);
    }
    const b = W({});
    function P(a) {
      b[a] = !0;
    }
    function w(a, t) {
      const e = `market.item.${a}.title`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function D(a, t) {
      const e = `market.item.${a}.category`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function E(a, t) {
      const e = `market.item.${a}.author`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function N(a, t) {
      const e = `market.item.${a}.desc`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function B(a, t) {
      if (!t) return;
      const e = `market.item.${a}.devNotice`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function H(a, t) {
      const e = `market.item.${a}.tags`;
      try {
        const u = r(e);
        return typeof u == "string" && u.includes(",") ? u.split(",") : t;
      } catch {
        return t;
      }
    }
    function L(a) {
      a.key === "Escape" && d.isOpen && (a.preventDefault(), a.stopPropagation(), c.close());
    }
    return (a, t) => s(d).isOpen ? (i(), l("div", {
      key: 0,
      ref_key: "windowRef",
      ref: k,
      class: "plugin-market-window",
      style: U(s(S)),
      "aria-busy": s(d).isSaving,
      role: "dialog",
      "aria-modal": "false",
      "aria-label": s(r)("market.dialogLabel"),
      tabindex: "-1",
      onKeydown: L
    }, [
      n("header", {
        ref_key: "headerRef",
        ref: $,
        class: "pm-header",
        onPointerdown: t[3] || (t[3] = //@ts-ignore
        (...e) => s(f) && s(f)(...e)),
        onClickCapture: t[4] || (t[4] = //@ts-ignore
        (...e) => s(y) && s(y)(...e))
      }, [
        n("div", G, [
          n("div", q, [
            n("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: s(d).kindFilter === "plugin" }]),
              onClick: t[0] || (t[0] = (e) => s(c).setKindFilter("plugin"))
            }, o(s(r)("market.tab.plugins")), 3),
            n("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: s(d).kindFilter === "module" }]),
              onClick: t[1] || (t[1] = (e) => s(c).setKindFilter("module"))
            }, o(s(r)("market.tab.modules")), 3)
          ])
        ]),
        n("button", {
          type: "button",
          class: "pm-close-btn",
          title: "关闭 (Esc)",
          "aria-label": "关闭",
          onClick: t[2] || (t[2] = (e) => s(c).close())
        }, " ✕ ")
      ], 544),
      s(d).isSaving ? (i(), l("p", J, "正在保存入口设置…")) : p("", !0),
      s(d).errorMessage ? (i(), l("p", Q, o(s(d).errorMessage), 1)) : p("", !0),
      n("main", X, [
        v.value.length === 0 ? (i(), l("div", Y, [
          t[6] || (t[6] = n("span", { class: "pm-empty-icon" }, "📦", -1)),
          n("p", null, o(s(r)("market.empty")), 1),
          n("small", null, o(s(r)("market.emptyHint")), 1)
        ])) : (i(), l("div", Z, [
          (i(!0), l(C, null, I(v.value, (e) => (i(), l("article", {
            key: e.id,
            class: m(["pm-card", { "is-installed": s(c).isInstalled(e.id) }])
          }, [
            n("div", ee, [
              n("div", te, [
                e.icon && !b[e.id] ? (i(), l("img", {
                  key: 0,
                  src: e.icon,
                  alt: w(e.id, e.title),
                  class: "pm-card-icon-img",
                  onError: (u) => P(e.id)
                }, null, 40, se)) : (i(), l("span", ne, o(e.emoji || "📦"), 1))
              ]),
              n("div", ae, [
                n("div", oe, [
                  n("h3", re, o(w(e.id, e.title)), 1),
                  n("span", ie, o(e.version), 1)
                ]),
                n("div", le, [
                  n("span", {
                    class: m(["pm-card-kind-badge", e.kind || "module"])
                  }, o(e.kind === "plugin" ? s(r)("market.pluginBadge") : s(r)("market.moduleBadge")), 3),
                  e.isDev ? (i(), l("span", de, o(s(r)("market.experimentalBadge")), 1)) : p("", !0),
                  n("span", ce, o(D(e.id, e.categoryLabel)), 1),
                  n("span", ue, "by " + o(E(e.id, e.author)), 1)
                ])
              ])
            ]),
            n("p", pe, o(N(e.id, e.desc)), 1),
            e.devNotice ? (i(), l("p", me, o(B(e.id, e.devNotice)), 1)) : p("", !0),
            n("div", ke, [
              (i(!0), l(C, null, I(H(e.id, e.tags), (u) => (i(), l("span", {
                key: u,
                class: "pm-card-tag"
              }, " #" + o(u), 1))), 128))
            ]),
            n("footer", he, [
              n("span", ge, o(s(c).isInstalled(e.id) ? "已开启" : "已关闭"), 1),
              n("div", fe, [
                e.downloadUrl ? (i(), l("a", {
                  key: 0,
                  href: e.downloadUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "pm-card-download-link",
                  onClick: t[5] || (t[5] = K(() => {
                  }, ["stop"]))
                }, o(s(r)("market.runtime")), 9, ye)) : p("", !0),
                n("button", {
                  type: "button",
                  class: m(["pm-switch", { on: s(c).isInstalled(e.id) }]),
                  role: "switch",
                  "aria-checked": s(c).isInstalled(e.id),
                  "aria-label": `${e.title}开关`,
                  disabled: s(d).isSaving,
                  onClick: (u) => s(c).isInstalled(e.id) ? M(e.id) : F(e.id)
                }, [...t[7] || (t[7] = [
                  n("span", null, null, -1)
                ])], 10, _e)
              ])
            ])
          ], 2))), 128))
        ]))
      ])
    ], 44, z)) : p("", !0);
  }
});
export {
  $e as default
};
