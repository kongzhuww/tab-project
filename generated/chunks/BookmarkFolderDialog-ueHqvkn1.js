import { d as B, w as p, B as C, x as D, o as b, j as x, p as P, H as S, i as s, u as n, h as a, t as k, e as z, f as E, G as H, A as L, z as W, T as F, b as I } from "./vendor-vue-BkY5-p5y.js";
import { L as N } from "./LauncherFolderSurface-Cfw4hy8f.js";
import { u as R } from "./useWindowDraggable-CsuFxJSe.js";
import { _ as V } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const M = ["disabled"], T = { class: "launcher-folder-title-box" }, $ = ["title"], j = ["disabled"], A = {
  key: 0,
  class: "bookmark-folder-status",
  role: "status"
}, G = { class: "launcher-folder-dialog-items bookmark-folder-content" }, U = /* @__PURE__ */ B({
  __name: "BookmarkFolderDialog",
  props: {
    folder: {},
    busy: { type: Boolean },
    status: {}
  },
  emits: ["close", "up"],
  setup(o, { emit: y }) {
    const l = o, i = y, r = I(null), { panelRef: c, headerRef: w, initialStyle: g, onHeaderPointerDown: d, stopInteractions: v, isDragging: h } = R({
      windowId: "bookmark-folder",
      managed: !1,
      defaultWidth: 440,
      defaultHeight: 340,
      minWidth: 280,
      minHeight: 200,
      resizable: !1,
      active: () => !l.busy
    });
    p(() => r.value?.element, (t) => {
      c.value = t || null;
    }, { flush: "post" }), p(() => l.busy, (t) => {
      t && v();
    });
    function u() {
      l.busy || i("close");
    }
    function f(t) {
      t.key === "Escape" && (t.preventDefault(), t.stopPropagation(), u());
    }
    return C(() => window.addEventListener("keydown", f)), D(() => window.removeEventListener("keydown", f)), (t, e) => (b(), x(F, { to: "body" }, [
      P(N, {
        ref_key: "surface",
        ref: r,
        id: "bookmark-folder-dialog",
        open: "",
        style: W(n(g)),
        "data-opened": "active",
        class: L({ dragging: n(h) }),
        "aria-label": "书签文件夹",
        onPointerdown: e[4] || (e[4] = a(() => {
        }, ["stop"])),
        onContextmenu: e[5] || (e[5] = a(() => {
        }, ["stop"])),
        onWheel: e[6] || (e[6] = a(() => {
        }, ["stop"]))
      }, {
        default: S(() => [
          s("header", {
            ref_key: "headerRef",
            ref: w,
            title: "按住标题栏可拖动",
            onPointerdown: e[3] || (e[3] = //@ts-ignore
            (...m) => n(d) && n(d)(...m))
          }, [
            s("button", {
              type: "button",
              disabled: o.busy,
              title: "返回上一级",
              onPointerdown: e[0] || (e[0] = a(() => {
              }, ["stop"])),
              onClick: e[1] || (e[1] = (m) => i("up"))
            }, "‹", 40, M),
            s("div", T, [
              s("h2", {
                title: o.folder.path
              }, k(o.folder.title), 9, $)
            ]),
            e[7] || (e[7] = s("div", {
              class: "launcher-folder-drag-spacer",
              "aria-hidden": "true"
            }, null, -1)),
            s("button", {
              type: "button",
              disabled: o.busy,
              title: "关闭",
              "aria-label": "关闭书签文件夹",
              onPointerdown: e[2] || (e[2] = a(() => {
              }, ["stop"])),
              onClick: u
            }, "✕", 40, j)
          ], 544),
          o.status ? (b(), z("span", A, k(o.status), 1)) : E("", !0),
          s("div", G, [
            H(t.$slots, "default", {}, void 0, !0)
          ])
        ]),
        _: 3
      }, 8, ["style", "class"])
    ]));
  }
}), Q = /* @__PURE__ */ V(U, [["__scopeId", "data-v-5d029e83"]]);
export {
  Q as default
};
