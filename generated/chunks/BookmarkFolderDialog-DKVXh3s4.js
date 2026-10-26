import { d as B, x as p, C, y as D, o as k, c as P, D as x, w as I, f as o, u as r, i as a, t as b, e as S, g as E, I as L, B as W, A as z, j as F, b as H } from "./vendor-vue-DokqDua_.js";
import { L as N } from "./LauncherFolderSurface-CfetyZ6P.js";
import { u as R } from "./useWindowDraggable-C1H0lrHB.js";
import { _ as V } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const M = ["disabled"], $ = { class: "launcher-folder-title-box" }, j = ["title"], A = ["value"], T = ["disabled"], U = {
  key: 0,
  class: "bookmark-folder-status",
  role: "status"
}, q = { class: "launcher-folder-dialog-items bookmark-folder-content" }, G = /* @__PURE__ */ B({
  __name: "BookmarkFolderDialog",
  props: {
    folder: {},
    busy: { type: Boolean },
    status: {},
    filter: {}
  },
  emits: ["close", "up", "update:filter"],
  setup(s, { emit: y }) {
    const n = s, i = y, d = H(null), { panelRef: w, headerRef: g, initialStyle: c, onHeaderPointerDown: u, stopInteractions: v, isDragging: h } = R({
      windowId: "bookmark-folder",
      managed: !1,
      defaultWidth: 440,
      defaultHeight: 340,
      minWidth: 280,
      minHeight: 200,
      resizable: !1,
      active: () => !n.busy
    });
    p(() => d.value?.element, (t) => {
      w.value = t || null;
    }, { flush: "post" }), p(() => n.busy, (t) => {
      t && v();
    });
    function f() {
      n.busy || i("close");
    }
    function m(t) {
      t.key === "Escape" && (t.preventDefault(), t.stopPropagation(), f());
    }
    return C(() => window.addEventListener("keydown", m)), D(() => window.removeEventListener("keydown", m)), (t, e) => (k(), P(F, { to: "body" }, [
      x(N, {
        ref_key: "surface",
        ref: d,
        id: "bookmark-folder-dialog",
        open: "",
        style: z(r(c)),
        "data-opened": "active",
        class: W({ dragging: r(h) }),
        "aria-label": "书签文件夹",
        onPointerdown: e[6] || (e[6] = a(() => {
        }, ["stop"])),
        onContextmenu: e[7] || (e[7] = a(() => {
        }, ["stop"])),
        onWheel: e[8] || (e[8] = a(() => {
        }, ["stop"]))
      }, {
        default: I(() => [
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
            o("div", $, [
              o("h2", {
                title: s.folder.path
              }, b(s.folder.title), 9, j)
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
              }, null, 40, A)
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
            }, "✕", 40, T)
          ], 544),
          s.status ? (k(), S("span", U, b(s.status), 1)) : E("", !0),
          o("div", q, [
            L(t.$slots, "default", {}, void 0, !0)
          ])
        ]),
        _: 3
      }, 8, ["style", "class"])
    ]));
  }
}), X = /* @__PURE__ */ V(G, [["__scopeId", "data-v-451ead7f"]]);
export {
  X as default
};
