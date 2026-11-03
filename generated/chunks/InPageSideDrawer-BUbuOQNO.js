import { v as r, w as e } from "./main-Bpl4h0oz.js";
import { S as i } from "./SidePanelApp-D91OrVgo.js";
import { d as t, D as d, z as p, o as l, e as c, h as w, s as m, u as a, C as _, l as f } from "./vendor-vue-FFI3kJnP.js";
import { _ as u } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const v = ["inert", "aria-hidden"], D = /* @__PURE__ */ t({
  __name: "InPageSideDrawer",
  setup(k) {
    function n(o) {
      o.key === "Escape" && e.isOpen && r.close();
    }
    return d(() => {
      window.addEventListener("keydown", n);
    }), p(() => {
      window.removeEventListener("keydown", n);
    }), (o, s) => (l(), c(f, { to: "body" }, [
      w("aside", {
        id: "in-page-side-drawer",
        class: _(["in-page-side-drawer", { "is-open": a(e).isOpen }]),
        inert: !a(e).isOpen,
        "aria-hidden": !a(e).isOpen,
        "aria-label": "网页工具与收集箱侧栏抽屉"
      }, [
        m(i, {
          "in-drawer": "",
          onClose: s[0] || (s[0] = (y) => a(r).close())
        })
      ], 10, v)
    ]));
  }
}), O = /* @__PURE__ */ u(D, [["__scopeId", "data-v-a47c2830"]]);
export {
  O as default
};
