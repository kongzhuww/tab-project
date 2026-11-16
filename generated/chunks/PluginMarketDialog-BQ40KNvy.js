import { d as G, w as K, E as W, u as e, o as l, e as r, i as a, A as k, t as i, f as u, F as m, g as P, p as z, h as x, z as j, s as _, r as q } from "./vendor-vue-C09jaOfK.js";
import { u as J } from "./useWindowDraggable-dDf7xwwO.js";
import { h as c, P as D } from "./window-manager.store-CzUcQOW-.js";
import { C as Q } from "./ChatPrivateSetup-CZ8o_flp.js";
import { t as o } from "./_plugin-vue_export-helper-BTb4PcVA.js";
const X = ["aria-busy", "aria-label"], Y = { class: "pm-header-left" }, Z = { class: "pm-kind-tabs" }, tt = {
  key: 0,
  role: "status",
  class: "pm-operation-error"
}, et = {
  key: 1,
  role: "alert",
  class: "pm-operation-error"
}, st = { class: "pm-body" }, at = {
  key: 0,
  class: "pm-empty"
}, nt = {
  key: 1,
  class: "pm-grid"
}, ot = { class: "pm-card-top" }, it = { class: "pm-card-icon-box" }, lt = ["src", "alt", "onError"], rt = {
  key: 1,
  class: "pm-card-icon-emoji"
}, dt = { class: "pm-card-title-col" }, ct = { class: "pm-card-name-row" }, pt = { class: "pm-card-title" }, ut = { class: "pm-card-version" }, mt = { class: "pm-card-meta-row" }, kt = {
  key: 0,
  class: "pm-card-dev-badge"
}, _t = { class: "pm-card-cat-badge" }, ht = { class: "pm-card-author" }, yt = { class: "pm-card-desc" }, gt = {
  key: 0,
  class: "pm-core-tip"
}, ft = { key: 1 }, bt = { class: "pm-card-tags" }, vt = { class: "pm-card-footer" }, wt = { class: "pm-installed-pill core" }, Ct = { class: "pm-core-tip" }, It = { class: "pm-installed-pill" }, St = { class: "pm-footer-right" }, $t = ["href"], Pt = ["disabled", "title", "onClick"], xt = ["disabled", "onClick"], Dt = { key: 0 }, Et = { key: 1 }, Ft = ["href"], Mt = { class: "pm-footer" }, At = { class: "pm-footer-stat" }, Ht = { class: "pm-footer-actions" }, Nt = ["disabled", "title"], Ot = ["disabled", "title"], Gt = /* @__PURE__ */ G({
  __name: "PluginMarketDialog",
  setup(Rt) {
    const d = c.state, y = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48, g = Math.min(920, Math.max(1, window.innerWidth - 40)), { panelRef: h, headerRef: E, initialStyle: F, onHeaderPointerDown: f, onHeaderClickCapture: b, restoreSavedPosition: M } = J({
      windowId: "market",
      managed: !1,
      defaultWidth: g,
      defaultHeight: Math.min(680, Math.max(260, window.innerHeight - y - 110)),
      defaultLeft: window.innerWidth - g - 20,
      defaultTop: y + 12,
      active: () => d.isOpen,
      onFocus: () => h.value?.focus({ preventScroll: !0 })
    });
    let v = 0;
    K(() => d.isOpen, async (n) => {
      const s = ++v;
      n && (await W(), !(!d.isOpen || s !== v) && (M(), h.value?.focus({ preventScroll: !0 })));
    }, { immediate: !0 });
    const w = _(() => {
      const n = d.kindFilter;
      return D.filter((s) => !(s.id === "backpack" && c.isInstalled("multica")) && (s.kind || "module") === n);
    });
    function A(n) {
      c.install(n);
    }
    function H(n) {
      c.uninstall(n);
    }
    const C = _(() => D.filter((n) => !(n.id === "backpack" && c.isInstalled("multica")))), I = _(() => C.value.filter((n) => c.isInstalled(n.id)).length), N = _(() => C.value.length), S = q({});
    function O(n) {
      S[n] = !0;
    }
    function $(n, s) {
      const t = `market.item.${n}.title`;
      try {
        return o(t);
      } catch {
        return s;
      }
    }
    function R(n, s) {
      const t = `market.item.${n}.category`;
      try {
        return o(t);
      } catch {
        return s;
      }
    }
    function T(n, s) {
      const t = `market.item.${n}.author`;
      try {
        return o(t);
      } catch {
        return s;
      }
    }
    function B(n, s) {
      const t = `market.item.${n}.desc`;
      try {
        return o(t);
      } catch {
        return s;
      }
    }
    function L(n, s) {
      if (!s) return;
      const t = `market.item.${n}.devNotice`;
      try {
        return o(t);
      } catch {
        return s;
      }
    }
    function U(n, s) {
      const t = `market.item.${n}.tags`;
      try {
        const p = o(t);
        return typeof p == "string" && p.includes(",") ? p.split(",") : s;
      } catch {
        return s;
      }
    }
    function V(n) {
      n.key === "Escape" && d.isOpen && (n.preventDefault(), n.stopPropagation(), c.close());
    }
    return (n, s) => e(d).isOpen ? (l(), r("div", {
      key: 0,
      ref_key: "windowRef",
      ref: h,
      class: "plugin-market-window",
      style: j(e(F)),
      "aria-busy": e(d).isSaving,
      role: "dialog",
      "aria-modal": "false",
      "aria-label": e(o)("market.dialogLabel"),
      tabindex: "-1",
      onKeydown: V
    }, [
      a("header", {
        ref_key: "headerRef",
        ref: E,
        class: "pm-header",
        onPointerdown: s[3] || (s[3] = //@ts-ignore
        (...t) => e(f) && e(f)(...t)),
        onClickCapture: s[4] || (s[4] = //@ts-ignore
        (...t) => e(b) && e(b)(...t))
      }, [
        a("div", Y, [
          a("div", Z, [
            a("button", {
              type: "button",
              class: k(["pm-kind-tab", { active: e(d).kindFilter === "plugin" }]),
              onClick: s[0] || (s[0] = (t) => e(c).setKindFilter("plugin"))
            }, i(e(o)("market.tab.plugins")), 3),
            a("button", {
              type: "button",
              class: k(["pm-kind-tab", { active: e(d).kindFilter === "module" }]),
              onClick: s[1] || (s[1] = (t) => e(c).setKindFilter("module"))
            }, i(e(o)("market.tab.modules")), 3)
          ])
        ]),
        a("button", {
          type: "button",
          class: "pm-close-btn",
          title: "关闭 (Esc)",
          "aria-label": "关闭",
          onClick: s[2] || (s[2] = (t) => e(c).close())
        }, " ✕ ")
      ], 544),
      e(d).isSaving ? (l(), r("p", tt, "正在保存入口设置…")) : u("", !0),
      e(d).errorMessage ? (l(), r("p", et, i(e(d).errorMessage), 1)) : u("", !0),
      a("main", st, [
        w.value.length === 0 ? (l(), r("div", at, [
          s[9] || (s[9] = a("span", { class: "pm-empty-icon" }, "📦", -1)),
          a("p", null, i(e(o)("market.empty")), 1),
          a("small", null, i(e(o)("market.emptyHint")), 1)
        ])) : (l(), r("div", nt, [
          (l(!0), r(m, null, P(w.value, (t) => (l(), r("article", {
            key: t.id,
            class: k(["pm-card", { "is-installed": e(c).isInstalled(t.id) }])
          }, [
            a("div", ot, [
              a("div", it, [
                t.icon && !S[t.id] ? (l(), r("img", {
                  key: 0,
                  src: t.icon,
                  alt: $(t.id, t.title),
                  class: "pm-card-icon-img",
                  onError: (p) => O(t.id)
                }, null, 40, lt)) : (l(), r("span", rt, i(t.emoji || "📦"), 1))
              ]),
              a("div", dt, [
                a("div", ct, [
                  a("h3", pt, i($(t.id, t.title)), 1),
                  a("span", ut, i(t.version), 1)
                ]),
                a("div", mt, [
                  a("span", {
                    class: k(["pm-card-kind-badge", t.kind || "module"])
                  }, i(t.kind === "plugin" ? e(o)("market.pluginBadge") : e(o)("market.moduleBadge")), 3),
                  t.isDev ? (l(), r("span", kt, i(e(o)("market.experimentalBadge")), 1)) : u("", !0),
                  a("span", _t, i(R(t.id, t.categoryLabel)), 1),
                  a("span", ht, "by " + i(T(t.id, t.author)), 1)
                ])
              ])
            ]),
            a("p", yt, i(B(t.id, t.desc)), 1),
            t.devNotice ? (l(), r("p", gt, i(L(t.id, t.devNotice)), 1)) : u("", !0),
            t.id === "chat" && e(c).isInstalled(t.id) ? (l(), r("details", ft, [
              a("summary", null, i(e(o)("market.chatSetupSummary")), 1),
              z(Q)
            ])) : u("", !0),
            a("div", bt, [
              (l(!0), r(m, null, P(U(t.id, t.tags), (p) => (l(), r("span", {
                key: p,
                class: "pm-card-tag"
              }, " #" + i(p), 1))), 128))
            ]),
            a("footer", vt, [
              e(c).isCorePlugin(t.id) ? (l(), r(m, { key: 0 }, [
                a("span", wt, i(e(o)("market.coreInstalledPill")), 1),
                a("span", Ct, i(e(o)("market.coreTip")), 1)
              ], 64)) : e(c).isInstalled(t.id) ? (l(), r(m, { key: 1 }, [
                a("span", It, i(e(o)("market.installedPill")), 1),
                a("div", St, [
                  t.downloadUrl ? (l(), r("a", {
                    key: 0,
                    href: t.downloadUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "pm-card-download-link",
                    title: "前往 GitHub Releases 下载运行时附件",
                    onClick: s[5] || (s[5] = x(() => {
                    }, ["stop"]))
                  }, i(e(o)("market.runtime")), 9, $t)) : u("", !0),
                  a("button", {
                    type: "button",
                    class: "pm-btn-uninstall",
                    disabled: e(d).isSaving,
                    title: t.id === "chat" ? "停用聊天室并停止后续同步；保留配置和历史，已提交的请求不假称撤回" : "从 Dock 隐藏入口；保留数据，不停止正在运行的窗口或服务",
                    onClick: (p) => H(t.id)
                  }, i(t.id === "chat" ? e(o)("market.disableComponent") : e(o)("market.disableEntry")), 9, Pt)
                ])
              ], 64)) : (l(), r(m, { key: 2 }, [
                a("button", {
                  type: "button",
                  class: "pm-btn-install",
                  disabled: e(d).isSaving,
                  onClick: (p) => A(t.id)
                }, [
                  t.isDev ? (l(), r("span", Dt, i(e(o)("market.enableExperimental")), 1)) : (l(), r("span", Et, i(e(o)("market.enable")), 1))
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
                }, i(e(o)("market.getRuntime")), 9, Ft)) : u("", !0)
              ], 64))
            ])
          ], 2))), 128))
        ]))
      ]),
      a("footer", Mt, [
        a("div", At, i(e(o)("market.footerStat", { installed: I.value, total: N.value })), 1),
        a("div", Ht, [
          a("button", {
            type: "button",
            class: "pm-btn-text",
            disabled: e(d).isSaving,
            title: e(o)("market.enableAllTip"),
            onClick: s[7] || (s[7] = (t) => e(c).installAll())
          }, i(e(o)("market.enableAllStable")), 9, Nt),
          I.value > 0 ? (l(), r("button", {
            key: 0,
            type: "button",
            class: "pm-btn-text danger",
            disabled: e(d).isSaving,
            title: e(o)("market.disableOptionalTip"),
            onClick: s[8] || (s[8] = (t) => e(c).uninstallAll())
          }, i(e(o)("market.disableOptional")), 9, Ot)) : u("", !0)
        ])
      ])
    ], 44, X)) : u("", !0);
  }
});
export {
  Gt as default
};
