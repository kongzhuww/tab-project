import { d as G, w as K, D as W, u as e, o as l, e as r, i as n, A as k, t as i, f as u, F as m, g as P, p as z, h as x, z as j, s as _, r as q } from "./vendor-vue-9b0eS4bW.js";
import { u as J } from "./useWindowDraggable-CH36ZGqj.js";
import { h as c, P as D } from "./window-manager.store-BdI_8a-H.js";
import { C as Q } from "./ChatPrivateSetup-CUToBRdz.js";
import { t as a } from "./_plugin-vue_export-helper-BxikU0LD.js";
const X = ["aria-busy", "aria-label"], Y = { class: "pm-header-left" }, Z = { class: "pm-kind-tabs" }, tt = {
  key: 0,
  role: "status",
  class: "pm-operation-error"
}, et = {
  key: 1,
  role: "alert",
  class: "pm-operation-error"
}, st = { class: "pm-body" }, nt = {
  key: 0,
  class: "pm-empty"
}, at = {
  key: 1,
  class: "pm-grid"
}, ot = { class: "pm-card-top" }, it = { class: "pm-card-icon-box" }, lt = ["src", "alt", "onError"], rt = {
  key: 1,
  class: "pm-card-icon-emoji"
}, dt = { class: "pm-card-title-col" }, ct = { class: "pm-card-name-row" }, pt = { class: "pm-card-title" }, ut = { class: "pm-card-version" }, mt = { class: "pm-card-meta-row" }, kt = {
  key: 0,
  class: "pm-card-dev-badge"
}, _t = { class: "pm-card-cat-badge" }, ht = { class: "pm-card-author" }, gt = { class: "pm-card-desc" }, yt = {
  key: 0,
  class: "pm-core-tip"
}, ft = { key: 1 }, bt = { class: "pm-card-tags" }, vt = { class: "pm-card-footer" }, wt = { class: "pm-installed-pill core" }, Ct = { class: "pm-core-tip" }, St = { class: "pm-installed-pill" }, It = { class: "pm-footer-right" }, $t = ["href"], Pt = ["disabled", "title", "onClick"], xt = ["disabled", "onClick"], Dt = { key: 0 }, Et = { key: 1 }, Ft = ["href"], Mt = { class: "pm-footer" }, At = { class: "pm-footer-stat" }, Ht = { class: "pm-footer-actions" }, Nt = ["disabled", "title"], Ot = ["disabled", "title"], Gt = /* @__PURE__ */ G({
  __name: "PluginMarketDialog",
  setup(Rt) {
    const d = c.state, g = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48, y = Math.min(920, Math.max(1, window.innerWidth - 40)), { panelRef: h, headerRef: E, initialStyle: F, onHeaderPointerDown: f, onHeaderClickCapture: b, restoreSavedPosition: M } = J({
      windowId: "market",
      managed: !1,
      defaultWidth: y,
      defaultHeight: Math.min(680, Math.max(260, window.innerHeight - g - 110)),
      defaultLeft: window.innerWidth - y - 20,
      defaultTop: g + 12,
      active: () => d.isOpen,
      onFocus: () => h.value?.focus({ preventScroll: !0 })
    });
    let v = 0;
    K(() => d.isOpen, async (o) => {
      const s = ++v;
      o && (await W(), !(!d.isOpen || s !== v) && (M(), h.value?.focus({ preventScroll: !0 })));
    }, { immediate: !0 });
    const w = _(() => {
      const o = d.kindFilter;
      return D.filter((s) => (s.kind || "module") === o);
    });
    function A(o) {
      c.install(o);
    }
    function H(o) {
      c.uninstall(o);
    }
    const C = _(() => D), S = _(() => C.value.filter((o) => c.isInstalled(o.id)).length), N = _(() => C.value.length), I = q({});
    function O(o) {
      I[o] = !0;
    }
    function $(o, s) {
      const t = `market.item.${o}.title`;
      try {
        return a(t);
      } catch {
        return s;
      }
    }
    function R(o, s) {
      const t = `market.item.${o}.category`;
      try {
        return a(t);
      } catch {
        return s;
      }
    }
    function T(o, s) {
      const t = `market.item.${o}.author`;
      try {
        return a(t);
      } catch {
        return s;
      }
    }
    function B(o, s) {
      const t = `market.item.${o}.desc`;
      try {
        return a(t);
      } catch {
        return s;
      }
    }
    function L(o, s) {
      if (!s) return;
      const t = `market.item.${o}.devNotice`;
      try {
        return a(t);
      } catch {
        return s;
      }
    }
    function U(o, s) {
      const t = `market.item.${o}.tags`;
      try {
        const p = a(t);
        return typeof p == "string" && p.includes(",") ? p.split(",") : s;
      } catch {
        return s;
      }
    }
    function V(o) {
      o.key === "Escape" && d.isOpen && (o.preventDefault(), o.stopPropagation(), c.close());
    }
    return (o, s) => e(d).isOpen ? (l(), r("div", {
      key: 0,
      ref_key: "windowRef",
      ref: h,
      class: "plugin-market-window",
      style: j(e(F)),
      "aria-busy": e(d).isSaving,
      role: "dialog",
      "aria-modal": "false",
      "aria-label": e(a)("market.dialogLabel"),
      tabindex: "-1",
      onKeydown: V
    }, [
      n("header", {
        ref_key: "headerRef",
        ref: E,
        class: "pm-header",
        onPointerdown: s[3] || (s[3] = //@ts-ignore
        (...t) => e(f) && e(f)(...t)),
        onClickCapture: s[4] || (s[4] = //@ts-ignore
        (...t) => e(b) && e(b)(...t))
      }, [
        n("div", Y, [
          n("div", Z, [
            n("button", {
              type: "button",
              class: k(["pm-kind-tab", { active: e(d).kindFilter === "plugin" }]),
              onClick: s[0] || (s[0] = (t) => e(c).setKindFilter("plugin"))
            }, i(e(a)("market.tab.plugins")), 3),
            n("button", {
              type: "button",
              class: k(["pm-kind-tab", { active: e(d).kindFilter === "module" }]),
              onClick: s[1] || (s[1] = (t) => e(c).setKindFilter("module"))
            }, i(e(a)("market.tab.modules")), 3)
          ])
        ]),
        n("button", {
          type: "button",
          class: "pm-close-btn",
          title: "关闭 (Esc)",
          "aria-label": "关闭",
          onClick: s[2] || (s[2] = (t) => e(c).close())
        }, " ✕ ")
      ], 544),
      e(d).isSaving ? (l(), r("p", tt, "正在保存入口设置…")) : u("", !0),
      e(d).errorMessage ? (l(), r("p", et, i(e(d).errorMessage), 1)) : u("", !0),
      n("main", st, [
        w.value.length === 0 ? (l(), r("div", nt, [
          s[9] || (s[9] = n("span", { class: "pm-empty-icon" }, "📦", -1)),
          n("p", null, i(e(a)("market.empty")), 1),
          n("small", null, i(e(a)("market.emptyHint")), 1)
        ])) : (l(), r("div", at, [
          (l(!0), r(m, null, P(w.value, (t) => (l(), r("article", {
            key: t.id,
            class: k(["pm-card", { "is-installed": e(c).isInstalled(t.id) }])
          }, [
            n("div", ot, [
              n("div", it, [
                t.icon && !I[t.id] ? (l(), r("img", {
                  key: 0,
                  src: t.icon,
                  alt: $(t.id, t.title),
                  class: "pm-card-icon-img",
                  onError: (p) => O(t.id)
                }, null, 40, lt)) : (l(), r("span", rt, i(t.emoji || "📦"), 1))
              ]),
              n("div", dt, [
                n("div", ct, [
                  n("h3", pt, i($(t.id, t.title)), 1),
                  n("span", ut, i(t.version), 1)
                ]),
                n("div", mt, [
                  n("span", {
                    class: k(["pm-card-kind-badge", t.kind || "module"])
                  }, i(t.kind === "plugin" ? e(a)("market.pluginBadge") : e(a)("market.moduleBadge")), 3),
                  t.isDev ? (l(), r("span", kt, i(e(a)("market.experimentalBadge")), 1)) : u("", !0),
                  n("span", _t, i(R(t.id, t.categoryLabel)), 1),
                  n("span", ht, "by " + i(T(t.id, t.author)), 1)
                ])
              ])
            ]),
            n("p", gt, i(B(t.id, t.desc)), 1),
            t.devNotice ? (l(), r("p", yt, i(L(t.id, t.devNotice)), 1)) : u("", !0),
            t.id === "chat" && e(c).isInstalled(t.id) ? (l(), r("details", ft, [
              n("summary", null, i(e(a)("market.chatSetupSummary")), 1),
              z(Q)
            ])) : u("", !0),
            n("div", bt, [
              (l(!0), r(m, null, P(U(t.id, t.tags), (p) => (l(), r("span", {
                key: p,
                class: "pm-card-tag"
              }, " #" + i(p), 1))), 128))
            ]),
            n("footer", vt, [
              e(c).isCorePlugin(t.id) ? (l(), r(m, { key: 0 }, [
                n("span", wt, i(e(a)("market.coreInstalledPill")), 1),
                n("span", Ct, i(e(a)("market.coreTip")), 1)
              ], 64)) : e(c).isInstalled(t.id) ? (l(), r(m, { key: 1 }, [
                n("span", St, i(e(a)("market.installedPill")), 1),
                n("div", It, [
                  t.downloadUrl ? (l(), r("a", {
                    key: 0,
                    href: t.downloadUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "pm-card-download-link",
                    title: "前往 GitHub Releases 下载运行时附件",
                    onClick: s[5] || (s[5] = x(() => {
                    }, ["stop"]))
                  }, i(e(a)("market.runtime")), 9, $t)) : u("", !0),
                  n("button", {
                    type: "button",
                    class: "pm-btn-uninstall",
                    disabled: e(d).isSaving,
                    title: t.id === "chat" ? "停用聊天室并停止后续同步；保留配置和历史，已提交的请求不假称撤回" : "从 Dock 隐藏入口；保留数据，不停止正在运行的窗口或服务",
                    onClick: (p) => H(t.id)
                  }, i(t.id === "chat" ? e(a)("market.disableComponent") : e(a)("market.disableEntry")), 9, Pt)
                ])
              ], 64)) : (l(), r(m, { key: 2 }, [
                n("button", {
                  type: "button",
                  class: "pm-btn-install",
                  disabled: e(d).isSaving,
                  onClick: (p) => A(t.id)
                }, [
                  t.isDev ? (l(), r("span", Dt, i(e(a)("market.enableExperimental")), 1)) : (l(), r("span", Et, i(e(a)("market.enable")), 1))
                ], 8, xt),
                t.downloadUrl ? (l(), r("a", {
                  key: 0,
                  href: t.downloadUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "pm-card-download-link",
                  title: "前往 GitHub Releases 下载运行时附件",
                  onClick: s[6] || (s[6] = x(() => {
                  }, ["stop"]))
                }, i(e(a)("market.getRuntime")), 9, Ft)) : u("", !0)
              ], 64))
            ])
          ], 2))), 128))
        ]))
      ]),
      n("footer", Mt, [
        n("div", At, i(e(a)("market.footerStat", { installed: S.value, total: N.value })), 1),
        n("div", Ht, [
          n("button", {
            type: "button",
            class: "pm-btn-text",
            disabled: e(d).isSaving,
            title: e(a)("market.enableAllTip"),
            onClick: s[7] || (s[7] = (t) => e(c).installAll())
          }, i(e(a)("market.enableAllStable")), 9, Nt),
          S.value > 0 ? (l(), r("button", {
            key: 0,
            type: "button",
            class: "pm-btn-text danger",
            disabled: e(d).isSaving,
            title: e(a)("market.disableOptionalTip"),
            onClick: s[8] || (s[8] = (t) => e(c).uninstallAll())
          }, i(e(a)("market.disableOptional")), 9, Ot)) : u("", !0)
        ])
      ])
    ], 44, X)) : u("", !0);
  }
});
export {
  Gt as default
};
