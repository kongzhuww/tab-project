import { v as s, w as e } from "./main-DpEPGF_F.js";
import { S as i } from "./SidePanelApp-CMUJKbIW.js";
import { d as t, D as d, z as p, o as l, e as c, h as w, E as m, u as a, C as _, l as f } from "./vendor-vue-dDCd4-uG.js";
import { _ as u } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
const v = ["inert", "aria-hidden"], D = /* @__PURE__ */ t({
  __name: "InPageSideDrawer",
  setup(k) {
    function n(o) {
      o.key === "Escape" && e.isOpen && s.close();
    }
    return d(() => {
      window.addEventListener("keydown", n);
    }), p(() => {
      window.removeEventListener("keydown", n);
    }), (o, r) => (l(), c(f, { to: "body" }, [
      w("aside", {
        id: "in-page-side-drawer",
        class: _(["in-page-side-drawer", { "is-open": a(e).isOpen }]),
        inert: !a(e).isOpen,
        "aria-hidden": !a(e).isOpen,
        "aria-label": "网页工具与收集箱侧栏抽屉"
      }, [
        m(i, {
          "in-drawer": "",
          onClose: r[0] || (r[0] = (y) => a(s).close())
        })
      ], 10, v)
    ]));
  }
}), E = /* @__PURE__ */ u(D, [["__scopeId", "data-v-a47c2830"]]);
export {
  E as default
};
