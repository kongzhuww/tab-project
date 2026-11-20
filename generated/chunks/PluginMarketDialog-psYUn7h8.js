import { d as O, w as R, y as T, u as s, f as i, g as l, h as a, s as m, t as o, j as p, F as C, i as I, C as V, k as K, n as U, x as W, r as j } from "./vendor-vue-BbmU9NUg.js";
import { u as A } from "./useWindowDraggable-BiFiOeBe.js";
import { h as c, P as z } from "./window-manager.store-D9RSYghK.js";
import { C as G } from "./ChatPrivateSetup-DjUMsB1k.js";
import { t as r } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const q = ["aria-busy", "aria-label"], J = { class: "pm-header-left" }, Q = { class: "pm-kind-tabs" }, X = {
  key: 0,
  role: "status",
  class: "pm-operation-error"
}, Y = {
  key: 1,
  role: "alert",
  class: "pm-operation-error"
}, Z = { class: "pm-body" }, ee = {
  key: 0,
  class: "pm-empty"
}, te = {
  key: 1,
  class: "pm-grid"
}, se = { class: "pm-card-top" }, ae = { class: "pm-card-icon-box" }, ne = ["src", "alt", "onError"], oe = {
  key: 1,
  class: "pm-card-icon-emoji"
}, re = { class: "pm-card-title-col" }, ie = { class: "pm-card-name-row" }, le = { class: "pm-card-title" }, de = { class: "pm-card-version" }, ce = { class: "pm-card-meta-row" }, ue = {
  key: 0,
  class: "pm-card-dev-badge"
}, pe = { class: "pm-card-cat-badge" }, me = { class: "pm-card-author" }, ke = { class: "pm-card-desc" }, he = {
  key: 0,
  class: "pm-core-tip"
}, ge = { key: 1 }, ye = { class: "pm-card-tags" }, fe = { class: "pm-card-footer" }, _e = { class: "pm-installed-pill" }, ve = { class: "pm-footer-right" }, be = ["href"], we = ["aria-checked", "aria-label", "disabled", "onClick"], Fe = /* @__PURE__ */ O({
  __name: "PluginMarketDialog",
  setup(Ce) {
    const d = c.state, h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48, g = Math.min(920, Math.max(1, window.innerWidth - 40)), { panelRef: k, headerRef: S, initialStyle: $, onHeaderPointerDown: y, onHeaderClickCapture: f, restoreSavedPosition: P } = A({
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
    R(() => d.isOpen, async (n) => {
      const t = ++_;
      n && (await T(), !(!d.isOpen || t !== _) && (P(), k.value?.focus({ preventScroll: !0 })));
    }, { immediate: !0 });
    const v = W(() => {
      const n = d.kindFilter;
      return z.filter((t) => (t.kind || "module") === n);
    });
    function x(n) {
      c.install(n);
    }
    function F(n) {
      c.uninstall(n);
    }
    const b = j({});
    function M(n) {
      b[n] = !0;
    }
    function w(n, t) {
      const e = `market.item.${n}.title`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function D(n, t) {
      const e = `market.item.${n}.category`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function N(n, t) {
      const e = `market.item.${n}.author`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function E(n, t) {
      const e = `market.item.${n}.desc`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function B(n, t) {
      if (!t) return;
      const e = `market.item.${n}.devNotice`;
      try {
        return r(e);
      } catch {
        return t;
      }
    }
    function H(n, t) {
      const e = `market.item.${n}.tags`;
      try {
        const u = r(e);
        return typeof u == "string" && u.includes(",") ? u.split(",") : t;
      } catch {
        return t;
      }
    }
    function L(n) {
      n.key === "Escape" && d.isOpen && (n.preventDefault(), n.stopPropagation(), c.close());
    }
    return (n, t) => s(d).isOpen ? (i(), l("div", {
      key: 0,
      ref_key: "windowRef",
      ref: k,
      class: "plugin-market-window",
      style: U(s($)),
      "aria-busy": s(d).isSaving,
      role: "dialog",
      "aria-modal": "false",
      "aria-label": s(r)("market.dialogLabel"),
      tabindex: "-1",
      onKeydown: L
    }, [
      a("header", {
        ref_key: "headerRef",
        ref: S,
        class: "pm-header",
        onPointerdown: t[3] || (t[3] = //@ts-ignore
        (...e) => s(y) && s(y)(...e)),
        onClickCapture: t[4] || (t[4] = //@ts-ignore
        (...e) => s(f) && s(f)(...e))
      }, [
        a("div", J, [
          a("div", Q, [
            a("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: s(d).kindFilter === "plugin" }]),
              onClick: t[0] || (t[0] = (e) => s(c).setKindFilter("plugin"))
            }, o(s(r)("market.tab.plugins")), 3),
            a("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: s(d).kindFilter === "module" }]),
              onClick: t[1] || (t[1] = (e) => s(c).setKindFilter("module"))
            }, o(s(r)("market.tab.modules")), 3)
          ])
        ]),
        a("button", {
          type: "button",
          class: "pm-close-btn",
          title: "关闭 (Esc)",
          "aria-label": "关闭",
          onClick: t[2] || (t[2] = (e) => s(c).close())
        }, " ✕ ")
      ], 544),
      s(d).isSaving ? (i(), l("p", X, "正在保存入口设置…")) : p("", !0),
      s(d).errorMessage ? (i(), l("p", Y, o(s(d).errorMessage), 1)) : p("", !0),
      a("main", Z, [
        v.value.length === 0 ? (i(), l("div", ee, [
          t[6] || (t[6] = a("span", { class: "pm-empty-icon" }, "📦", -1)),
          a("p", null, o(s(r)("market.empty")), 1),
          a("small", null, o(s(r)("market.emptyHint")), 1)
        ])) : (i(), l("div", te, [
          (i(!0), l(C, null, I(v.value, (e) => (i(), l("article", {
            key: e.id,
            class: m(["pm-card", { "is-installed": s(c).isInstalled(e.id) }])
          }, [
            a("div", se, [
              a("div", ae, [
                e.icon && !b[e.id] ? (i(), l("img", {
                  key: 0,
                  src: e.icon,
                  alt: w(e.id, e.title),
                  class: "pm-card-icon-img",
                  onError: (u) => M(e.id)
                }, null, 40, ne)) : (i(), l("span", oe, o(e.emoji || "📦"), 1))
              ]),
              a("div", re, [
                a("div", ie, [
                  a("h3", le, o(w(e.id, e.title)), 1),
                  a("span", de, o(e.version), 1)
                ]),
                a("div", ce, [
                  a("span", {
                    class: m(["pm-card-kind-badge", e.kind || "module"])
                  }, o(e.kind === "plugin" ? s(r)("market.pluginBadge") : s(r)("market.moduleBadge")), 3),
                  e.isDev ? (i(), l("span", ue, o(s(r)("market.experimentalBadge")), 1)) : p("", !0),
                  a("span", pe, o(D(e.id, e.categoryLabel)), 1),
                  a("span", me, "by " + o(N(e.id, e.author)), 1)
                ])
              ])
            ]),
            a("p", ke, o(E(e.id, e.desc)), 1),
            e.devNotice ? (i(), l("p", he, o(B(e.id, e.devNotice)), 1)) : p("", !0),
            e.id === "chat" && s(c).isInstalled(e.id) ? (i(), l("details", ge, [
              a("summary", null, o(s(r)("market.chatSetupSummary")), 1),
              V(G)
            ])) : p("", !0),
            a("div", ye, [
              (i(!0), l(C, null, I(H(e.id, e.tags), (u) => (i(), l("span", {
                key: u,
                class: "pm-card-tag"
              }, " #" + o(u), 1))), 128))
            ]),
            a("footer", fe, [
              a("span", _e, o(s(c).isInstalled(e.id) ? "已开启" : "已关闭"), 1),
              a("div", ve, [
                e.downloadUrl ? (i(), l("a", {
                  key: 0,
                  href: e.downloadUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "pm-card-download-link",
                  onClick: t[5] || (t[5] = K(() => {
                  }, ["stop"]))
                }, o(s(r)("market.runtime")), 9, be)) : p("", !0),
                a("button", {
                  type: "button",
                  class: m(["pm-switch", { on: s(c).isInstalled(e.id) }]),
                  role: "switch",
                  "aria-checked": s(c).isInstalled(e.id),
                  "aria-label": `${e.title}开关`,
                  disabled: s(d).isSaving,
                  onClick: (u) => s(c).isInstalled(e.id) ? F(e.id) : x(e.id)
                }, [...t[7] || (t[7] = [
                  a("span", null, null, -1)
                ])], 10, we)
              ])
            ])
          ], 2))), 128))
        ]))
      ])
    ], 44, q)) : p("", !0);
  }
});
export {
  Fe as default
};
