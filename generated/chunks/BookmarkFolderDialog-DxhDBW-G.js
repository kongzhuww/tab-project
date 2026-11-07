import { d as B, w as m, B as C, x as D, o as k, j as P, p as x, H as S, i as o, u as r, h as a, t as b, e as z, f as E, G as H, A as I, z as L, T as W, b as F } from "./vendor-vue-9b0eS4bW.js";
import { L as N } from "./LauncherFolderSurface-B0Ld3-Rt.js";
import { u as R } from "./useWindowDraggable-CH36ZGqj.js";
import { _ as V } from "./_plugin-vue_export-helper-D0Oc3lep.js";
const M = ["disabled"], T = { class: "launcher-folder-title-box" }, $ = ["title"], j = ["value"], A = ["disabled"], G = {
  key: 0,
  class: "bookmark-folder-status",
  role: "status"
}, U = { class: "launcher-folder-dialog-items bookmark-folder-content" }, q = /* @__PURE__ */ B({
  __name: "BookmarkFolderDialog",
  props: {
    folder: {},
    busy: { type: Boolean },
    status: {},
    filter: {}
  },
  emits: ["close", "up", "update:filter"],
  setup(s, { emit: y }) {
    const n = s, i = y, d = F(null), { panelRef: w, headerRef: g, initialStyle: c, onHeaderPointerDown: u, stopInteractions: v, isDragging: h } = R({
      windowId: "bookmark-folder",
      managed: !1,
      defaultWidth: 440,
      defaultHeight: 340,
      minWidth: 280,
      minHeight: 200,
      resizable: !1,
      active: () => !n.busy
    });
    m(() => d.value?.element, (t) => {
      w.value = t || null;
    }, { flush: "post" }), m(() => n.busy, (t) => {
      t && v();
    });
    function f() {
      n.busy || i("close");
    }
    function p(t) {
      t.key === "Escape" && (t.preventDefault(), t.stopPropagation(), f());
    }
    return C(() => window.addEventListener("keydown", p)), D(() => window.removeEventListener("keydown", p)), (t, e) => (k(), P(W, { to: "body" }, [
      x(N, {
        ref_key: "surface",
        ref: d,
        id: "bookmark-folder-dialog",
        open: "",
        style: L(r(c)),
        "data-opened": "active",
        class: I({ dragging: r(h) }),
        "aria-label": "书签文件夹",
        onPointerdown: e[6] || (e[6] = a(() => {
        }, ["stop"])),
        onContextmenu: e[7] || (e[7] = a(() => {
        }, ["stop"])),
        onWheel: e[8] || (e[8] = a(() => {
        }, ["stop"]))
      }, {
        default: S(() => [
          o("header", {
            ref_key: "headerRef",
            ref: g,
            title: "按住标题栏可拖动",
            onPointerdown: e[5] || (e[5] = //@ts-ignore
            (...l) => r(u) && r(u)(...l))
          }, [
            o("button", {
              type: "button",
              disabled: s.busy,
              title: "返回上一级",
              onPointerdown: e[0] || (e[0] = a(() => {
              }, ["stop"])),
              onClick: e[1] || (e[1] = (l) => i("up"))
            }, "‹", 40, M),
            o("div", T, [
              o("h2", {
                title: s.folder.path
              }, b(s.folder.title), 9, $)
            ]),
            o("div", {
              class: "bookmark-folder-filter-wrap",
              onPointerdown: e[3] || (e[3] = a(() => {
              }, ["stop"]))
            }, [
              o("input", {
                value: n.filter || "",
                type: "search",
                placeholder: "搜索筛选...",
                class: "bookmark-folder-filter-input",
                title: "快速过滤当前文件夹内的书签",
                onInput: e[2] || (e[2] = (l) => i("update:filter", l.target.value))
              }, null, 40, j)
            ], 32),
            e[9] || (e[9] = o("div", {
              class: "launcher-folder-drag-spacer",
              "aria-hidden": "true"
            }, null, -1)),
            o("button", {
              type: "button",
              disabled: s.busy,
              title: "关闭",
              "aria-label": "关闭书签文件夹",
              onPointerdown: e[4] || (e[4] = a(() => {
              }, ["stop"])),
              onClick: f
            }, "✕", 40, A)
          ], 544),
          s.status ? (k(), z("span", G, b(s.status), 1)) : E("", !0),
          o("div", U, [
            H(t.$slots, "default", {}, void 0, !0)
          ])
        ]),
        _: 3
      }, 8, ["style", "class"])
    ]));
  }
}), X = /* @__PURE__ */ V(q, [["__scopeId", "data-v-451ead7f"]]);
export {
  X as default
};
