import { d as T, S as V, w as L, D as U, z as j, n as q, A as G, g as d, h as t, I as f, u as e, t as c, i as g, F as J, k as a, B as O, C as Q, y as X, b as M, o as w } from "./vendor-vue-D8gPZiit.js";
import { u as Y } from "./useWindowDraggable-BgkVWXrw.js";
import { w as y, c as Z } from "./window-manager.store-B8yz4j-E.js";
import { t as r, _ } from "./_plugin-vue_export-helper-qhyPkMid.js";
/* empty css                                                                        */
const ee = ["id", "aria-label"], ie = { class: "lw-window-header-left" }, te = ["src"], oe = {
  key: 1,
  class: "lw-window-icon",
  "aria-hidden": "true"
}, ne = { class: "lw-window-title" }, se = { class: "lw-window-header-center" }, le = { class: "lw-window-header-right" }, re = { class: "lw-window-controls" }, ae = ["title", "aria-label"], de = ["title", "aria-label"], we = ["title", "aria-label"], ue = { class: "lw-window-body" }, ce = {
  key: 0,
  class: "lw-window-error-boundary"
}, me = { class: "lw-error-card" }, fe = { class: "lw-error-title" }, ge = { class: "lw-error-desc" }, ve = { class: "lw-error-details" }, ze = { class: "lw-error-actions" }, he = {
  key: 0,
  class: "lw-window-footer"
}, be = /* @__PURE__ */ T({
  __name: "AppWindowFrame",
  props: {
    windowId: {},
    id: {},
    title: {},
    icon: {},
    visible: { type: Boolean, default: !0 },
    defaultWidth: { default: 840 },
    defaultHeight: { default: 580 },
    minWidth: { default: 380 },
    minHeight: { default: 260 },
    resizable: { type: Boolean, default: !0 },
    showMinimize: { type: Boolean, default: !0 },
    showMaximize: { type: Boolean, default: !0 },
    showClose: { type: Boolean, default: !0 },
    customClass: {},
    customStyle: {},
    storageKey: {}
  },
  emits: ["minimize", "close", "activate"],
  setup(o, { expose: B, emit: E }) {
    const s = o, z = E, {
      panelRef: m,
      headerRef: H,
      initialStyle: A,
      isDragging: F,
      isResizing: R,
      isMaximized: v,
      bringToFront: h,
      restoreSavedPosition: k,
      onHeaderPointerDown: I,
      onResizePointerDown: u,
      toggleMaximize: b
    } = Y({
      windowId: s.windowId,
      storageKey: s.storageKey,
      defaultWidth: s.defaultWidth,
      defaultHeight: s.defaultHeight,
      minWidth: s.minWidth,
      minHeight: s.minHeight,
      resizable: s.resizable,
      onFocus: () => {
        z("activate");
      }
    }), D = X(() => Z.activeId === s.windowId);
    function x() {
      h();
    }
    function K(l) {
      const i = l.target;
      !i || i.closest("button, a, input, select, textarea, [draggable='true']") || s.resizable && s.showMaximize && b();
    }
    function S() {
      z("minimize"), y.minimize(s.windowId);
    }
    const C = M(!1), p = M(!1), P = M("");
    V((l, i, n) => (console.error(`[AppWindowFrame:${s.windowId}] 捕获到组件内部错误:`, l, n), p.value = !0, P.value = l?.message || String(l) || "未知渲染异常", !1));
    function N() {
      p.value = !1, P.value = "";
    }
    function W() {
      C.value = !0, m.value && (m.value.style.display = "none"), z("close"), y.close(s.windowId);
    }
    L(
      () => s.visible,
      (l) => {
        l && (C.value = !1, m.value && (m.value.style.display = ""), h(), k());
      }
    );
    const $ = () => m.value;
    return U(() => {
      y.register({
        id: s.windowId,
        title: s.title,
        icon: s.icon,
        getElement: $,
        onActivate: () => {
          z("activate"), h();
        },
        onMinimize: () => {
          S();
        },
        onClose: () => (W(), !0)
      }), s.visible && k();
    }), j(() => {
      y.unregister(s.windowId, $);
    }), B({
      panelRef: m,
      bringToFront: h,
      restoreSavedPosition: k,
      toggleMaximize: b
    }), (l, i) => q((w(), d("section", {
      id: o.id || `${o.windowId}-workspace`,
      ref_key: "panelRef",
      ref: m,
      class: Q(["lw-window-frame", [
        o.customClass,
        {
          "is-active": D.value,
          "workspace-focused": D.value,
          "is-dragging": e(F),
          "is-resizing": e(R),
          "is-maximized": e(v)
        }
      ]]),
      style: O([o.customStyle, e(A)]),
      "aria-label": o.title,
      onPointerdown: x
    }, [
      t("header", {
        ref_key: "headerRef",
        ref: H,
        class: "lw-window-header ms-drag-handle",
        onPointerdown: i[1] || (i[1] = //@ts-ignore
        (...n) => e(I) && e(I)(...n)),
        onDblclick: K
      }, [
        t("div", ie, [
          f(l.$slots, "title", {}, () => [
            o.icon && (o.icon.includes("/") || o.icon.endsWith(".png") || o.icon.endsWith(".svg")) ? (w(), d("img", {
              key: 0,
              src: o.icon,
              class: "lw-window-icon-img",
              alt: ""
            }, null, 8, te)) : o.icon ? (w(), d("span", oe, c(o.icon), 1)) : g("", !0),
            t("h2", ne, c(o.title), 1)
          ], !0),
          f(l.$slots, "header-left", {}, void 0, !0)
        ]),
        t("div", se, [
          f(l.$slots, "header-center", {}, void 0, !0)
        ]),
        t("div", le, [
          f(l.$slots, "header-actions", {}, void 0, !0),
          f(l.$slots, "window-controls", {}, () => [
            t("div", re, [
              o.showMinimize ? (w(), d("button", {
                key: 0,
                type: "button",
                class: "lw-win-btn lw-win-minimize",
                title: e(r)("window.minimize"),
                "aria-label": e(r)("window.minimize"),
                onClick: a(S, ["stop"])
              }, " − ", 8, ae)) : g("", !0),
              o.showMaximize && o.resizable ? (w(), d("button", {
                key: 1,
                type: "button",
                class: "lw-win-btn lw-win-maximize",
                title: e(v) ? e(r)("window.restore") : e(r)("window.maximize"),
                "aria-label": e(v) ? e(r)("window.restore") : e(r)("window.maximize"),
                onClick: i[0] || (i[0] = a(
                  //@ts-ignore
                  (...n) => e(b) && e(b)(...n),
                  ["stop"]
                ))
              }, c(e(v) ? "❐" : "□"), 9, de)) : g("", !0),
              o.showClose ? (w(), d("button", {
                key: 2,
                type: "button",
                class: "lw-win-btn lw-win-close",
                title: e(r)("window.closeWindow"),
                "aria-label": e(r)("window.closeWindow"),
                onClick: a(W, ["stop"])
              }, " ✕ ", 8, we)) : g("", !0)
            ])
          ], !0)
        ])
      ], 544),
      t("div", ue, [
        p.value ? (w(), d("div", ce, [
          t("div", me, [
            i[10] || (i[10] = t("span", { class: "lw-error-icon" }, "⚠️", -1)),
            t("h3", fe, c(e(r)("window.renderError", { title: o.title })), 1),
            t("p", ge, c(e(r)("window.renderErrorDesc")), 1),
            t("div", ve, [
              t("code", null, c(P.value), 1)
            ]),
            t("div", ze, [
              t("button", {
                type: "button",
                class: "lw-error-btn primary",
                onClick: N
              }, c(e(r)("window.retry")), 1),
              t("button", {
                type: "button",
                class: "lw-error-btn secondary",
                onClick: W
              }, c(e(r)("window.closeThis")), 1)
            ])
          ])
        ])) : f(l.$slots, "default", {}, void 0, !0, 1)
      ]),
      l.$slots.footer ? (w(), d("footer", he, [
        f(l.$slots, "footer", {}, void 0, !0)
      ])) : g("", !0),
      o.resizable && !e(v) ? (w(), d(J, { key: 1 }, [
        t("i", {
          class: "lw-resize-edge lw-resize-n",
          onPointerdown: i[2] || (i[2] = a((n) => e(u)(n, "n"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-edge lw-resize-e",
          onPointerdown: i[3] || (i[3] = a((n) => e(u)(n, "e"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-edge lw-resize-s",
          onPointerdown: i[4] || (i[4] = a((n) => e(u)(n, "s"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-edge lw-resize-w",
          onPointerdown: i[5] || (i[5] = a((n) => e(u)(n, "w"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-corner lw-resize-se",
          onPointerdown: i[6] || (i[6] = a((n) => e(u)(n, "se"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-corner lw-resize-sw",
          onPointerdown: i[7] || (i[7] = a((n) => e(u)(n, "sw"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-corner lw-resize-ne",
          onPointerdown: i[8] || (i[8] = a((n) => e(u)(n, "ne"), ["stop"]))
        }, null, 32),
        t("i", {
          class: "lw-resize-corner lw-resize-nw",
          onPointerdown: i[9] || (i[9] = a((n) => e(u)(n, "nw"), ["stop"]))
        }, null, 32)
      ], 64)) : g("", !0)
    ], 46, ee)), [
      [G, o.visible && !C.value]
    ]);
  }
}), We = /* @__PURE__ */ _(be, [["__scopeId", "data-v-ef03dbf6"]]);
export {
  We as A
};
