import { s as r, u as e } from "./main-YRIcVXLo.js";
import { S as i } from "./SidePanelApp-D91OrVgo.js";
import { d as t, D as d, z as p, o as l, e as c, h as m, s as w, u as a, C as _, l as f } from "./vendor-vue-FFI3kJnP.js";
import { _ as u } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const D = ["inert", "aria-hidden"], k = /* @__PURE__ */ t({
  __name: "InPageSideDrawer",
  setup(v) {
    function n(s) {
      s.key === "Escape" && e.isOpen && r.close();
    }
    return d(() => {
      window.addEventListener("keydown", n);
    }), p(() => {
      window.removeEventListener("keydown", n);
    }), (s, o) => (l(), c(f, { to: "body" }, [
      m("aside", {
        id: "in-page-side-drawer",
        class: _(["in-page-side-drawer", { "is-open": a(e).isOpen }]),
        inert: !a(e).isOpen,
        "aria-hidden": !a(e).isOpen,
        "aria-label": "网页工具与收集箱侧栏抽屉"
      }, [
        w(i, {
          "in-drawer": "",
          onClose: o[0] || (o[0] = (y) => a(r).close())
        })
      ], 10, D)
    ]));
  }
}), O = /* @__PURE__ */ u(k, [["__scopeId", "data-v-a47c2830"]]);
export {
  O as default
};
