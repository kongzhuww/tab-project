import { j as r, s as e } from "./drawer-store-BkfYIYhg.js";
import { S as i } from "./SidePanelApp-CG6dp1i8.js";
import { d as t, o as d, e as p, f as l, l as c, h as m, B as w, u as a, q as _, T as f } from "./vendor-vue-C-_ocEUS.js";
import { _ as u } from "./_plugin-vue_export-helper-CUD1GoS1.js";
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
    }), (o, s) => (l(), c(f, { to: "body" }, [
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
