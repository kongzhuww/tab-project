import { f as N, G as V, w as q, o as G, d as L, q as T, D as U, g as r, h as d, i, H as c, x as n, t as f, u as m, F as j, k as a, B as J, s as O, c as Q, b as M } from "./vendor-vue-BUkfvXUI.js";
import { u as X } from "./useWindowDraggable-ClzyorH0.js";
import { w as y, a as Y } from "./read-session-BWENvNUM.js";
/* empty css                                                                        */
import { _ as Z } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const _ = ["id", "aria-label"], ee = { class: "lw-window-header-left" }, ie = ["src"], te = {
  key: 1,
  class: "lw-window-icon",
  "aria-hidden": "true"
}, oe = { class: "lw-window-title" }, se = { class: "lw-window-header-center" }, ne = { class: "lw-window-header-right" }, le = { class: "lw-window-controls" }, ae = ["title"], re = { class: "lw-window-body" }, de = {
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
  setup(t, { expose: $, emit: B }) {
    const s = t, g = B, {
      panelRef: u,
      headerRef: H,
      initialStyle: E,
      isDragging: F,
      isResizing: R,
      isMaximized: v,
      bringToFront: z,
      restoreSavedPosition: h,
      onHeaderPointerDown: W,
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
    }), I = Q(() => Y.activeId === s.windowId);
    function A() {
      z();
    }
    function x(l) {
      const e = l.target;
      !e || e.closest("button, a, input, select, textarea, [draggable='true']") || s.resizable && s.showMaximize && b();
    }
    function D() {
      g("minimize"), y.minimize(s.windowId);
    }
    const k = M(!1), p = M(!1), C = M("");
    V((l, e, o) => (console.error(`[AppWindowFrame:${s.windowId}] 捕获到组件内部错误:`, l, o), p.value = !0, C.value = l?.message || String(l) || "未知渲染异常", !1));
    function K() {
      p.value = !1, C.value = "";
    }
    function P() {
      k.value = !0, u.value && (u.value.style.display = "none"), g("close"), y.close(s.windowId);
    }
    q(
      () => s.visible,
      (l) => {
        l && (k.value = !1, u.value && (u.value.style.display = ""), z(), h());
      }
    );
    const S = () => u.value;
    return G(() => {
      y.register({
        id: s.windowId,
        title: s.title,
        icon: s.icon,
        getElement: S,
        onActivate: () => {
          g("activate"), z();
        },
        onMinimize: () => {
          D();
        },
        onClose: () => (P(), !0)
      }), s.visible && h();
    }), L(() => {
      y.unregister(s.windowId, S);
    }), $({
      panelRef: u,
      bringToFront: z,
      restoreSavedPosition: h,
      toggleMaximize: b
    }), (l, e) => T((r(), d("section", {
      id: t.id || `${t.windowId}-workspace`,
      ref_key: "panelRef",
      ref: u,
      class: O(["lw-window-frame", [
        t.customClass,
        {
          "is-active": I.value,
          "workspace-focused": I.value,
          "is-dragging": n(F),
          "is-resizing": n(R),
          "is-maximized": n(v)
        }
      ]]),
      style: J([t.customStyle, n(E)]),
      "aria-label": t.title,
      onPointerdown: A
    }, [
      i("header", {
        ref_key: "headerRef",
        ref: H,
        class: "lw-window-header ms-drag-handle",
        onPointerdown: e[1] || (e[1] = //@ts-ignore
        (...o) => n(W) && n(W)(...o)),
        onDblclick: x
      }, [
        i("div", ee, [
          c(l.$slots, "title", {}, () => [
            t.icon && (t.icon.includes("/") || t.icon.endsWith(".png") || t.icon.endsWith(".svg")) ? (r(), d("img", {
              key: 0,
              src: t.icon,
              class: "lw-window-icon-img",
              alt: ""
            }, null, 8, ie)) : t.icon ? (r(), d("span", te, f(t.icon), 1)) : m("", !0),
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
              t.showMinimize ? (r(), d("button", {
                key: 0,
                type: "button",
                class: "lw-win-btn lw-win-minimize",
                title: "最小化",
                "aria-label": "最小化窗口",
                onClick: a(D, ["stop"])
              }, " − ")) : m("", !0),
              t.showMaximize && t.resizable ? (r(), d("button", {
                key: 1,
                type: "button",
                class: "lw-win-btn lw-win-maximize",
                title: n(v) ? "向下还原" : "最大化",
                "aria-label": "最大化或还原窗口",
                onClick: e[0] || (e[0] = a(
                  //@ts-ignore
                  (...o) => n(b) && n(b)(...o),
                  ["stop"]
                ))
              }, f(n(v) ? "❐" : "□"), 9, ae)) : m("", !0),
              t.showClose ? (r(), d("button", {
                key: 2,
                type: "button",
                class: "lw-win-btn lw-win-close",
                title: "关闭窗口",
                "aria-label": "关闭窗口",
                onClick: a(P, ["stop"])
              }, " ✕ ")) : m("", !0)
            ])
          ], !0)
        ])
      ], 544),
      i("div", re, [
        p.value ? (r(), d("div", de, [
          i("div", we, [
            e[10] || (e[10] = i("span", { class: "lw-error-icon" }, "⚠️", -1)),
            i("h3", ue, f(t.title) + " 遇到了局部渲染错误", 1),
            e[11] || (e[11] = i("p", { class: "lw-error-desc" }, "已自动拦截异常，主屏与其他窗口运行正常。", -1)),
            i("div", ce, [
              i("code", null, f(C.value), 1)
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
      l.$slots.footer ? (r(), d("footer", me, [
        c(l.$slots, "footer", {}, void 0, !0)
      ])) : m("", !0),
      t.resizable && !n(v) ? (r(), d(j, { key: 1 }, [
        i("i", {
          class: "lw-resize-edge lw-resize-n",
          onPointerdown: e[2] || (e[2] = a((o) => n(w)(o, "n"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-edge lw-resize-e",
          onPointerdown: e[3] || (e[3] = a((o) => n(w)(o, "e"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-edge lw-resize-s",
          onPointerdown: e[4] || (e[4] = a((o) => n(w)(o, "s"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-edge lw-resize-w",
          onPointerdown: e[5] || (e[5] = a((o) => n(w)(o, "w"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-se",
          onPointerdown: e[6] || (e[6] = a((o) => n(w)(o, "se"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-sw",
          onPointerdown: e[7] || (e[7] = a((o) => n(w)(o, "sw"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-ne",
          onPointerdown: e[8] || (e[8] = a((o) => n(w)(o, "ne"), ["stop"]))
        }, null, 32),
        i("i", {
          class: "lw-resize-corner lw-resize-nw",
          onPointerdown: e[9] || (e[9] = a((o) => n(w)(o, "nw"), ["stop"]))
        }, null, 32)
      ], 64)) : m("", !0)
    ], 46, _)), [
      [U, t.visible && !k.value]
    ]);
  }
}), he = /* @__PURE__ */ Z(fe, [["__scopeId", "data-v-179d3d66"]]);
export {
  he as A
};
