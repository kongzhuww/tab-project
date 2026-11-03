import { v as s, w as e } from "./main-B95j7TkJ.js";
import { S as i } from "./SidePanelApp-HPlwxVhs.js";
import { d as t, D as d, z as p, o as c, e as l, g as w, E as m, u as a, C as _, k as f } from "./vendor-vue-wIH4jcna.js";
import { _ as u } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const k = ["inert", "aria-hidden"], v = /* @__PURE__ */ t({
  __name: "InPageSideDrawer",
  setup(D) {
    function n(o) {
      o.key === "Escape" && e.isOpen && s.close();
    }
    return d(() => {
      window.addEventListener("keydown", n);
    }), p(() => {
      window.removeEventListener("keydown", n);
    }), (o, r) => (c(), l(f, { to: "body" }, [
      w("aside", {
        id: "in-page-side-drawer",
        class: _(["in-page-side-drawer", { "is-open": a(e).isOpen }]),
        inert: !a(e).isOpen,
        "aria-hidden": !a(e).isOpen,
        "aria-label": "网页工具与收集箱侧栏抽屉"
      }, [
        m(i, {
          "in-drawer": "",
          onClose: r[0] || (r[0] = (g) => a(s).close())
        })
      ], 10, k)
    ]));
  }
}), O = /* @__PURE__ */ u(v, [["__scopeId", "data-v-a47c2830"]]);
export {
  O as default
};
