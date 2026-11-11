import { s as r, u as e } from "./main-XzCdWwNW.js";
import { S as i } from "./SidePanelApp-Budtc_j-.js";
import { d as t, B as d, x as p, o as c, j as l, i as m, p as w, u as a, A as _, T as f } from "./vendor-vue-9b0eS4bW.js";
import { _ as u } from "./_plugin-vue_export-helper-BxikU0LD.js";
const k = ["inert", "aria-hidden"], v = /* @__PURE__ */ t({
  __name: "InPageSideDrawer",
  setup(y) {
    function n(o) {
      o.key === "Escape" && e.isOpen && r.close();
    }
    return d(() => {
      window.addEventListener("keydown", n);
    }), p(() => {
      window.removeEventListener("keydown", n);
    }), (o, s) => (c(), l(f, { to: "body" }, [
      m("aside", {
        id: "in-page-side-drawer",
        class: _(["in-page-side-drawer", { "is-open": a(e).isOpen }]),
        inert: !a(e).isOpen,
        "aria-hidden": !a(e).isOpen,
        "aria-label": "网页工具与收集箱侧栏抽屉"
      }, [
        w(i, {
          "in-drawer": "",
          onClose: s[0] || (s[0] = (D) => a(r).close())
        })
      ], 10, k)
    ]));
  }
}), C = /* @__PURE__ */ u(v, [["__scopeId", "data-v-a47c2830"]]);
export {
  C as default
};
