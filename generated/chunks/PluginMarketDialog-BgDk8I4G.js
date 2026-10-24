import { f as V, w as L, n as N, x as n, g as o, h as a, i as s, s as m, u as c, t as d, F as u, z as x, l as A, k as P, j as F, B, c as k, r as G } from "./vendor-vue-BUkfvXUI.js";
import { u as K } from "./useWindowDraggable-DMiAsL9Y.js";
import { I as r, P as I } from "./search.service-CJV_B19X.js";
import { C as T } from "./ChatPrivateSetup-DR1Y7yPt.js";
const W = ["aria-busy"], j = { class: "pm-header-left" }, z = { class: "pm-kind-tabs" }, q = {
  key: 0,
  role: "status",
  class: "pm-operation-error"
}, J = {
  key: 1,
  role: "alert",
  class: "pm-operation-error"
}, Q = { class: "pm-body" }, X = {
  key: 0,
  class: "pm-empty"
}, Y = {
  key: 1,
  class: "pm-grid"
}, Z = { class: "pm-card-top" }, tt = { class: "pm-card-icon-box" }, st = ["src", "alt", "onError"], et = {
  key: 1,
  class: "pm-card-icon-emoji"
}, nt = { class: "pm-card-title-col" }, ot = { class: "pm-card-name-row" }, at = { class: "pm-card-title" }, lt = { class: "pm-card-version" }, it = { class: "pm-card-meta-row" }, rt = {
  key: 0,
  class: "pm-card-dev-badge"
}, dt = { class: "pm-card-cat-badge" }, ct = { class: "pm-card-author" }, pt = { class: "pm-card-desc" }, ut = { key: 0 }, mt = { class: "pm-card-tags" }, kt = { class: "pm-card-footer" }, _t = {
  key: 0,
  class: "pm-core-tip"
}, ft = { class: "pm-footer-right" }, vt = ["href"], bt = ["disabled", "onClick"], gt = ["disabled", "onClick"], yt = { key: 0 }, ht = { key: 1 }, wt = ["href"], Ct = { class: "pm-footer" }, St = { class: "pm-footer-stat" }, xt = { class: "pm-footer-actions" }, Pt = ["disabled"], Ft = ["disabled"], Ht = /* @__PURE__ */ V({
  __name: "PluginMarketDialog",
  setup(It) {
    const l = r.state, f = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48, v = Math.min(920, Math.max(1, window.innerWidth - 40)), { panelRef: _, headerRef: M, initialStyle: D, onHeaderPointerDown: b, onHeaderClickCapture: g, restoreSavedPosition: $ } = K({
      windowId: "market",
      managed: !1,
      defaultWidth: v,
      defaultHeight: Math.min(680, Math.max(260, window.innerHeight - f - 110)),
      defaultLeft: window.innerWidth - v - 20,
      defaultTop: f + 12,
      active: () => l.isOpen,
      onFocus: () => _.value?.focus({ preventScroll: !0 })
    });
    let y = 0;
    L(() => l.isOpen, async (i) => {
      const e = ++y;
      i && (await N(), !(!l.isOpen || e !== y) && ($(), _.value?.focus({ preventScroll: !0 })));
    }, { immediate: !0 });
    const h = k(() => {
      const i = l.kindFilter;
      return I.filter((e) => (e.kind || "module") === i);
    });
    function E(i) {
      r.install(i);
    }
    function H(i) {
      r.uninstall(i);
    }
    const w = k(() => I), C = k(() => w.value.filter((i) => r.isInstalled(i.id)).length), R = k(() => w.value.length), S = G({});
    function O(i) {
      S[i] = !0;
    }
    function U(i) {
      i.key === "Escape" && l.isOpen && (i.preventDefault(), i.stopPropagation(), r.close());
    }
    return (i, e) => n(l).isOpen ? (o(), a("div", {
      key: 0,
      ref_key: "windowRef",
      ref: _,
      class: "plugin-market-window",
      style: B(n(D)),
      "aria-busy": n(l).isSaving,
      role: "dialog",
      "aria-modal": "false",
      "aria-label": "组件与模块管理",
      tabindex: "-1",
      onKeydown: U
    }, [
      s("header", {
        ref_key: "headerRef",
        ref: M,
        class: "pm-header",
        onPointerdown: e[3] || (e[3] = //@ts-ignore
        (...t) => n(b) && n(b)(...t)),
        onClickCapture: e[4] || (e[4] = //@ts-ignore
        (...t) => n(g) && n(g)(...t))
      }, [
        s("div", j, [
          s("div", z, [
            s("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: n(l).kindFilter === "plugin" }]),
              onClick: e[0] || (e[0] = (t) => n(r).setKindFilter("plugin"))
            }, " 🖥️ 全屏插件 ", 2),
            s("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: n(l).kindFilter === "module" }]),
              onClick: e[1] || (e[1] = (t) => n(r).setKindFilter("module"))
            }, " 🧩 独立模块 ", 2)
          ])
        ]),
        s("button", {
          type: "button",
          class: "pm-close-btn",
          title: "关闭 (Esc)",
          "aria-label": "关闭",
          onClick: e[2] || (e[2] = (t) => n(r).close())
        }, " ✕ ")
      ], 544),
      n(l).isSaving ? (o(), a("p", q, "正在保存入口设置…")) : c("", !0),
      n(l).errorMessage ? (o(), a("p", J, d(n(l).errorMessage), 1)) : c("", !0),
      s("main", Q, [
        h.value.length === 0 ? (o(), a("div", X, [...e[9] || (e[9] = [
          s("span", { class: "pm-empty-icon" }, "📦", -1),
          s("p", null, "未找到匹配的模块", -1),
          s("small", null, "试试其他关键词或分类筛选", -1)
        ])])) : (o(), a("div", Y, [
          (o(!0), a(u, null, x(h.value, (t) => (o(), a("article", {
            key: t.id,
            class: m(["pm-card", { "is-installed": n(r).isInstalled(t.id) }])
          }, [
            s("div", Z, [
              s("div", tt, [
                t.icon && !S[t.id] ? (o(), a("img", {
                  key: 0,
                  src: t.icon,
                  alt: t.title,
                  class: "pm-card-icon-img",
                  onError: (p) => O(t.id)
                }, null, 40, st)) : (o(), a("span", et, d(t.emoji || "📦"), 1))
              ]),
              s("div", nt, [
                s("div", ot, [
                  s("h3", at, d(t.title), 1),
                  s("span", lt, d(t.version), 1)
                ]),
                s("div", it, [
                  s("span", {
                    class: m(["pm-card-kind-badge", t.kind || "module"])
                  }, d(t.kind === "plugin" ? "全屏插件" : "独立模块"), 3),
                  t.isDev ? (o(), a("span", rt, "🧪 实验性")) : c("", !0),
                  s("span", dt, d(t.categoryLabel), 1),
                  s("span", ct, "by " + d(t.author), 1)
                ])
              ])
            ]),
            s("p", pt, d(t.desc), 1),
            t.id === "chat" ? (o(), a("details", ut, [
              e[10] || (e[10] = s("summary", null, "配置私有服务器 / 加入受邀房间", -1)),
              A(T)
            ])) : c("", !0),
            s("div", mt, [
              (o(!0), a(u, null, x(t.tags, (p) => (o(), a("span", {
                key: p,
                class: "pm-card-tag"
              }, " #" + d(p), 1))), 128))
            ]),
            s("footer", kt, [
              t.id === "chat" ? (o(), a("span", _t, "未配置服务器时不显示 dock 入口")) : n(r).isCorePlugin(t.id) ? (o(), a(u, { key: 1 }, [
                e[11] || (e[11] = s("span", { class: "pm-installed-pill core" }, "✓ 核心入口默认可用", -1)),
                e[12] || (e[12] = s("span", { class: "pm-core-tip" }, "核心预设", -1))
              ], 64)) : n(r).isInstalled(t.id) ? (o(), a(u, { key: 2 }, [
                e[13] || (e[13] = s("span", { class: "pm-installed-pill" }, "✓ 已启用", -1)),
                s("div", ft, [
                  t.downloadUrl ? (o(), a("a", {
                    key: 0,
                    href: t.downloadUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "pm-card-download-link",
                    title: "前往 GitHub Releases 下载运行时附件",
                    onClick: e[5] || (e[5] = P(() => {
                    }, ["stop"]))
                  }, " 运行时 ↗ ", 8, vt)) : c("", !0),
                  s("button", {
                    type: "button",
                    class: "pm-btn-uninstall",
                    disabled: n(l).isSaving,
                    title: "从 Dock 隐藏入口；保留数据，不停止正在运行的窗口或服务",
                    onClick: (p) => H(t.id)
                  }, " 停用入口 ", 8, bt)
                ])
              ], 64)) : (o(), a(u, { key: 3 }, [
                s("button", {
                  type: "button",
                  class: "pm-btn-install",
                  disabled: n(l).isSaving,
                  onClick: (p) => E(t.id)
                }, [
                  t.isDev ? (o(), a("span", yt, "🧪 启用实验组件")) : (o(), a("span", ht, "启用"))
                ], 8, gt),
                t.downloadUrl ? (o(), a("a", {
                  key: 0,
                  href: t.downloadUrl,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "pm-card-download-link",
                  title: "前往 GitHub Releases 下载运行时附件",
                  onClick: e[6] || (e[6] = P(() => {
                  }, ["stop"]))
                }, " 获取运行时 ↗ ", 8, wt)) : c("", !0)
              ], 64))
            ])
          ], 2))), 128))
        ]))
      ]),
      s("footer", Ct, [
        s("div", St, [
          e[14] || (e[14] = F(" 当前列表已启用 ", -1)),
          s("strong", null, d(C.value), 1),
          F(" / " + d(R.value) + " 项 ", 1)
        ]),
        s("div", xt, [
          s("button", {
            type: "button",
            class: "pm-btn-text",
            disabled: n(l).isSaving,
            title: "启用全部稳定组件，不自动启用开发中组件",
            onClick: e[7] || (e[7] = (t) => n(r).installAll())
          }, " 启用全部稳定组件 ", 8, Pt),
          C.value > 0 ? (o(), a("button", {
            key: 0,
            type: "button",
            class: "pm-btn-text danger",
            disabled: n(l).isSaving,
            title: "停用可选入口；核心入口与旧偏好保留，不清数据、不停止服务",
            onClick: e[8] || (e[8] = (t) => n(r).uninstallAll())
          }, " 停用可选入口 ", 8, Ft)) : c("", !0)
        ])
      ])
    ], 44, W)) : c("", !0);
  }
});
export {
  Ht as default
};
