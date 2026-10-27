import { d as U, x as V, G as A, u as o, o as n, e as a, f as s, B as m, g as c, t as d, F as u, h as x, D as G, i as P, m as D, A as L, s as k, r as B } from "./vendor-vue-DokqDua_.js";
import { u as K } from "./useWindowDraggable-DzZ5uK6K.js";
import { h as r, P as F } from "./window-manager.store-D_Nuf9-p.js";
import { C as T } from "./ChatPrivateSetup-Cf9Crts4.js";
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
}, ot = { class: "pm-card-title-col" }, nt = { class: "pm-card-name-row" }, at = { class: "pm-card-title" }, lt = { class: "pm-card-version" }, it = { class: "pm-card-meta-row" }, rt = {
  key: 0,
  class: "pm-card-dev-badge"
}, dt = { class: "pm-card-cat-badge" }, ct = { class: "pm-card-author" }, pt = { class: "pm-card-desc" }, ut = {
  key: 0,
  class: "pm-core-tip"
}, mt = { key: 1 }, kt = { class: "pm-card-tags" }, _t = { class: "pm-card-footer" }, vt = { class: "pm-footer-right" }, ft = ["href"], bt = ["disabled", "title", "onClick"], gt = ["disabled", "onClick"], ht = { key: 0 }, yt = { key: 1 }, wt = ["href"], Ct = { class: "pm-footer" }, St = { class: "pm-footer-stat" }, xt = { class: "pm-footer-actions" }, Pt = ["disabled"], Dt = ["disabled"], Ht = /* @__PURE__ */ U({
  __name: "PluginMarketDialog",
  setup(Ft) {
    const l = r.state, v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topbar-height")) || 48, f = Math.min(920, Math.max(1, window.innerWidth - 40)), { panelRef: _, headerRef: I, initialStyle: M, onHeaderPointerDown: b, onHeaderClickCapture: g, restoreSavedPosition: $ } = K({
      windowId: "market",
      managed: !1,
      defaultWidth: f,
      defaultHeight: Math.min(680, Math.max(260, window.innerHeight - v - 110)),
      defaultLeft: window.innerWidth - f - 20,
      defaultTop: v + 12,
      active: () => l.isOpen,
      onFocus: () => _.value?.focus({ preventScroll: !0 })
    });
    let h = 0;
    V(() => l.isOpen, async (i) => {
      const e = ++h;
      i && (await A(), !(!l.isOpen || e !== h) && ($(), _.value?.focus({ preventScroll: !0 })));
    }, { immediate: !0 });
    const y = k(() => {
      const i = l.kindFilter;
      return F.filter((e) => (e.kind || "module") === i);
    });
    function E(i) {
      r.install(i);
    }
    function H(i) {
      r.uninstall(i);
    }
    const w = k(() => F), C = k(() => w.value.filter((i) => r.isInstalled(i.id)).length), N = k(() => w.value.length), S = B({});
    function R(i) {
      S[i] = !0;
    }
    function O(i) {
      i.key === "Escape" && l.isOpen && (i.preventDefault(), i.stopPropagation(), r.close());
    }
    return (i, e) => o(l).isOpen ? (n(), a("div", {
      key: 0,
      ref_key: "windowRef",
      ref: _,
      class: "plugin-market-window",
      style: L(o(M)),
      "aria-busy": o(l).isSaving,
      role: "dialog",
      "aria-modal": "false",
      "aria-label": "组件与模块管理",
      tabindex: "-1",
      onKeydown: O
    }, [
      s("header", {
        ref_key: "headerRef",
        ref: I,
        class: "pm-header",
        onPointerdown: e[3] || (e[3] = //@ts-ignore
        (...t) => o(b) && o(b)(...t)),
        onClickCapture: e[4] || (e[4] = //@ts-ignore
        (...t) => o(g) && o(g)(...t))
      }, [
        s("div", j, [
          s("div", z, [
            s("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: o(l).kindFilter === "plugin" }]),
              onClick: e[0] || (e[0] = (t) => o(r).setKindFilter("plugin"))
            }, " 🖥️ 全屏插件 ", 2),
            s("button", {
              type: "button",
              class: m(["pm-kind-tab", { active: o(l).kindFilter === "module" }]),
              onClick: e[1] || (e[1] = (t) => o(r).setKindFilter("module"))
            }, " 🧩 独立模块 ", 2)
          ])
        ]),
        s("button", {
          type: "button",
          class: "pm-close-btn",
          title: "关闭 (Esc)",
          "aria-label": "关闭",
          onClick: e[2] || (e[2] = (t) => o(r).close())
        }, " ✕ ")
      ], 544),
      o(l).isSaving ? (n(), a("p", q, "正在保存入口设置…")) : c("", !0),
      o(l).errorMessage ? (n(), a("p", J, d(o(l).errorMessage), 1)) : c("", !0),
      s("main", Q, [
        y.value.length === 0 ? (n(), a("div", X, [...e[9] || (e[9] = [
          s("span", { class: "pm-empty-icon" }, "📦", -1),
          s("p", null, "未找到匹配的模块", -1),
          s("small", null, "试试其他关键词或分类筛选", -1)
        ])])) : (n(), a("div", Y, [
          (n(!0), a(u, null, x(y.value, (t) => (n(), a("article", {
            key: t.id,
            class: m(["pm-card", { "is-installed": o(r).isInstalled(t.id) }])
          }, [
            s("div", Z, [
              s("div", tt, [
                t.icon && !S[t.id] ? (n(), a("img", {
                  key: 0,
                  src: t.icon,
                  alt: t.title,
                  class: "pm-card-icon-img",
                  onError: (p) => R(t.id)
                }, null, 40, st)) : (n(), a("span", et, d(t.emoji || "📦"), 1))
              ]),
              s("div", ot, [
                s("div", nt, [
                  s("h3", at, d(t.title), 1),
                  s("span", lt, d(t.version), 1)
                ]),
                s("div", it, [
                  s("span", {
                    class: m(["pm-card-kind-badge", t.kind || "module"])
                  }, d(t.kind === "plugin" ? "全屏插件" : "独立模块"), 3),
                  t.isDev ? (n(), a("span", rt, "🧪 实验性")) : c("", !0),
                  s("span", dt, d(t.categoryLabel), 1),
                  s("span", ct, "by " + d(t.author), 1)
                ])
              ])
            ]),
            s("p", pt, d(t.desc), 1),
            t.devNotice ? (n(), a("p", ut, d(t.devNotice), 1)) : c("", !0),
            t.id === "chat" && o(r).isInstalled(t.id) ? (n(), a("details", mt, [
              e[10] || (e[10] = s("summary", null, "配置私有服务器 / 加入受邀房间", -1)),
              G(T)
            ])) : c("", !0),
            s("div", kt, [
              (n(!0), a(u, null, x(t.tags, (p) => (n(), a("span", {
                key: p,
                class: "pm-card-tag"
              }, " #" + d(p), 1))), 128))
            ]),
            s("footer", _t, [
              o(r).isCorePlugin(t.id) ? (n(), a(u, { key: 0 }, [
                e[11] || (e[11] = s("span", { class: "pm-installed-pill core" }, "✓ 核心入口默认可用", -1)),
                e[12] || (e[12] = s("span", { class: "pm-core-tip" }, "核心预设", -1))
              ], 64)) : o(r).isInstalled(t.id) ? (n(), a(u, { key: 1 }, [
                e[13] || (e[13] = s("span", { class: "pm-installed-pill" }, "✓ 已启用", -1)),
                s("div", vt, [
                  t.downloadUrl ? (n(), a("a", {
                    key: 0,
                    href: t.downloadUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "pm-card-download-link",
                    title: "前往 GitHub Releases 下载运行时附件",
                    onClick: e[5] || (e[5] = P(() => {
                    }, ["stop"]))
                  }, " 运行时 ↗ ", 8, ft)) : c("", !0),
                  s("button", {
                    type: "button",
                    class: "pm-btn-uninstall",
                    disabled: o(l).isSaving,
                    title: t.id === "chat" ? "停用聊天室并停止后续同步；保留配置和历史，已提交的请求不假称撤回" : "从 Dock 隐藏入口；保留数据，不停止正在运行的窗口或服务",
                    onClick: (p) => H(t.id)
                  }, d(t.id === "chat" ? "停用组件" : "停用入口"), 9, bt)
                ])
              ], 64)) : (n(), a(u, { key: 2 }, [
                s("button", {
                  type: "button",
                  class: "pm-btn-install",
                  disabled: o(l).isSaving,
                  onClick: (p) => E(t.id)
                }, [
                  t.isDev ? (n(), a("span", ht, "🧪 启用实验组件")) : (n(), a("span", yt, "启用"))
                ], 8, gt),
                t.downloadUrl ? (n(), a("a", {
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
          e[14] || (e[14] = D(" 当前列表已启用 ", -1)),
          s("strong", null, d(C.value), 1),
          D(" / " + d(N.value) + " 项 ", 1)
        ]),
        s("div", xt, [
          s("button", {
            type: "button",
            class: "pm-btn-text",
            disabled: o(l).isSaving,
            title: "启用全部稳定组件，不自动启用开发中组件",
            onClick: e[7] || (e[7] = (t) => o(r).installAll())
          }, " 启用全部稳定组件 ", 8, Pt),
          C.value > 0 ? (n(), a("button", {
            key: 0,
            type: "button",
            class: "pm-btn-text danger",
            disabled: o(l).isSaving,
            title: "停用可选入口；核心入口与旧偏好保留，不清数据、不停止服务",
            onClick: e[8] || (e[8] = (t) => o(r).uninstallAll())
          }, " 停用可选入口 ", 8, Dt)) : c("", !0)
        ])
      ])
    ], 44, W)) : c("", !0);
  }
});
export {
  Ht as default
};
