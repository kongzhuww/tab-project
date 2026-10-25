import { d as N, U, x as V, C as L, y as T, l as j, z as q, e as a, f as i, I as c, u as n, t as f, g as m, F as G, i as r, A as J, B as O, s as Q, b as M, o as d } from "./vendor-vue-CjOHdfe5.js";
import { u as X } from "./useWindowDraggable-DfLljEpd.js";
import { w as y, d as Y } from "./read-session-C1M3QoXl.js";
/* empty css                                                                        */
import { _ as Z } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const _ = ["id", "aria-label"], ee = { class: "lw-window-header-left" }, ie = ["src"], te = {
  key: 1,
  class: "lw-window-icon",
  "aria-hidden": "true"
}, oe = { class: "lw-window-title" }, se = { class: "lw-window-header-center" }, ne = { class: "lw-window-header-right" }, le = { class: "lw-window-controls" }, re = ["title"], ae = { class: "lw-window-body" }, de = {
  key: 0,
  class: "lw-window-error-boundary"
}, we = { class: "lw-error-card" }, ue = { class: "lw-error-title" }, ce = { class: "lw-error-details" }, me = {
  key: 0,
  class: "lw-window-footer"
}, fe = /* @__PURE__ */ N({
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
  setup(t, { expose: B, emit: D }) {
    const s = t, g = D, {
      panelRef: u,
      headerRef: H,
      initialStyle: A,
      isDragging: E,
      isResizing: F,
      isMaximized: v,
      bringToFront: z,
      restoreSavedPosition: h,
      onHeaderPointerDown: I,
      onResizePointerDown: w,
      toggleMaximize: b
    } = X({
      windowId: s.windowId,
      storageKey: s.storageKey,
      defaultWidth: s.defaultWidth,
      defaultHeight: s.defaultHeight,
      minWidth: s.minWidth,
      minHeight: s.minHeight,
      resizable: s.resizable,
      onFocus: () => {
        g("activate");
      }
    }), W = Q(() => Y.activeId === s.windowId);
    function R() {
      z();
    }
    function x(l) {
      const e = l.target;
      !e || e.closest("button, a, input, select, textarea, [draggable='true']") || s.resizable && s.showMaximize && b();
    }
    function S() {
      g("minimize"), y.minimize(s.windowId);
    }
    const k = M(!1), C = M(!1), p = M("");
    U((l, e, o) => (console.error(`[AppWindowFrame:${s.windowId}] 捕获到组件内部错误:`, l, o), C.value = !0, p.value = l?.message || String(l) || "未知渲染异常", !1));
    function K() {
      C.value = !1, p.value = "";
    }
    function P() {
      k.value = !0, u.value && (u.value.style.display = "none"), g("close"), y.close(s.windowId);
    }
    V(
      () => s.visible,
      (l) => {
        l && (k.value = !1, u.value && (u.value.style.display = ""), z(), h());
      }
    );
    const $ = () => u.value;
    return L(() => {
      y.register({
        id: s.windowId,
        title: s.title,
        icon: s.icon,
        getElement: $,
        onActivate: () => {
          g("activate"), z();
        },
        onMinimize: () => {
          S();
        },
        onClose: () => (P(), !0)
      }), s.visible && h();
    }), T(() => {
      y.unregister(s.windowId, $);
    }), B({
      panelRef: u,
      bringToFront: z,
      restoreSavedPosition: h,
      toggleMaximize: b
    }), (l, e) => j((d(), a("section", {
      id: t.id || `${t.windowId}-workspace`,
      ref_key: "panelRef",
      ref: u,
      class: O(["lw-window-frame", [
        t.customClass,
        {
          "is-active": W.value,
          "workspace-focused": W.value,
          "is-dragging": n(E),
          "is-resizing": n(F),
          "is-maximized": n(v)
        }
      ]]),
      style: J([t.customStyle, n(A)]),
      "aria-label": t.title,
      onPointerdown: R
    }, [
      i("header", {
        ref_key: "headerRef",
        ref: H,
        class: "lw-window-header ms-drag-handle",
        onPointerdown: e[1] || (e[1] = //@ts-ignore
        (...o) => n(I) && n(I)(...o)),
        onDblclick: x
      }, [
        i("div", ee, [
          c(l.$slots, "title", {}, () => [
            t.icon && (t.icon.includes("/") || t.icon.endsWith(".png") || t.icon.endsWith(".svg")) ? (d(), a("img", {
              key: 0,
              src: t.icon,
              class: "lw-window-icon-img",
              alt: ""
            }, null, 8, ie)) : t.icon ? (d(), a("span", te, f(t.icon), 1)) : m("", !0),
            i("h2", oe, f(t.title), 1)
          ], !0),
          c(l.$slots, "header-left", {}, void 0, !0)
        ]),
        i("div", se, [
          c(l.$slots, "header-center", {}, void 0, !0)
        ]),
        i("div", ne, [
          c(l.$slots, "header-actions", {}, void 0, !0),
          c(l.$slots, "window-controls", {}, () => [
            i("div", le, [
              t.showMinimize ? (d(), a("button", {
                key: 0,
                type: "button",
                class: "lw-win-btn lw-win-minimize",
                title: "最小化",
                "aria-label": "最小化窗口",
                onClick: r(S, ["stop"])
              }, " − ")) : m("", !0),
              t.showMaximize && t.resizable ? (d(), a("button", {
                key: 1,
                type: "button",
                class: "lw-win-btn lw-win-maximize",
                title: n(v) ? "向下还原" : "最大化",
                "aria-label": "最大化或还原窗口",
                onClick: e[0] || (e[0] = r(
                  //@ts-ignore
                  (...o) => n(b) && n(b)(...o),
                  ["stop"]
                ))
              }, f(n(v) ? "❐" : "□"), 9, re)) : m("", !0),
              t.showClose ? (d(), a("button", {
                key: 2,
                type: "button",
                class: "lw-win-btn lw-win-close",
                title: "关闭窗口",
                "aria-label": "关闭窗口",
                onClick: r(P, ["stop"])
              }, " ✕ ")) : m("", !0)
            ])
          ], !0)
        ])
      ], 544),
      i("div", ae, [
        C.value ? (d(), a("div", de, [
          i("div", we, [
            e[10] || (e[10] = i("span", { class: "lw-error-icon" }, "⚠️", -1)),
            i("h3", ue, f(t.title) + " 遇到了局部渲染错误", 1),
            e[11] || (e[11] = i("p", { class: "lw-error-desc" }, "已自动拦截异常，主屏与其他窗口运行正常。", -1)),
            i("div", ce, [
              i("code", null, f(p.value), 1)
            ]),
            i("div", { class: "lw-error-actions" }, [
              i("button", {
                type: "button",
                class: "lw-error-btn primary",
                onClick: K
              }, " 🔄 尝试恢复运行 "),
              i("button", {
                type: "button",
                class: "lw-error-btn secondary",
                onClick: P
              }, " 关闭此窗口 ")
            ])
          ])
        ])) : c(l.$slots, "default", {}, void 0, !0, 1)
      ]),
      l.$slots.footer ? (d(), a("footer", me, [
        c(l.$slots, "footer", {}, void 0, !0)
      ])) : m("", !0),
      t.resizable && !n(v) ? (d(), a(G, { key: 1 }, [
        i("i", {
          class: "lw-resize-edge lw-resize-n",
          onPointerdown: e[2] || (e[2] = r((o) => n(w)(o, "n"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-edge lw-resize-e",
          onPointerdown: e[3] || (e[3] = r((o) => n(w)(o, "e"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-edge lw-resize-s",
          onPointerdown: e[4] || (e[4] = r((o) => n(w)(o, "s"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-edge lw-resize-w",
          onPointerdown: e[5] || (e[5] = r((o) => n(w)(o, "w"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-se",
          onPointerdown: e[6] || (e[6] = r((o) => n(w)(o, "se"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-sw",
          onPointerdown: e[7] || (e[7] = r((o) => n(w)(o, "sw"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-ne",
          onPointerdown: e[8] || (e[8] = r((o) => n(w)(o, "ne"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-nw",
          onPointerdown: e[9] || (e[9] = r((o) => n(w)(o, "nw"), ["stop"]))
        }, null, 32)
      ], 64)) : m("", !0)
    ], 46, _)), [
      [q, t.visible && !k.value]
    ]);
  }
}), he = /* @__PURE__ */ Z(fe, [["__scopeId", "data-v-179d3d66"]]);
export {
  he as A
};
