import { j as r, s as e } from "./drawer-store-BfI-AFt0.js";
import { S as i } from "./SidePanelApp-DXJohWpg.js";
import { d as t, o as d, e as p, f as l, l as c, h as m, C as w, u as a, s as _, T as f } from "./vendor-vue-BbmU9NUg.js";
import { _ as u } from "./_plugin-vue_export-helper-CP_tFnee.js";
const k = ["inert", "aria-hidden"], v = /* @__PURE__ */ t({
  __name: "InPageSideDrawer",
  setup(y) {
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
          onClose: o[0] || (o[0] = (C) => a(r).close())
        })
      ], 10, k)
    ]));
  }
}), O = /* @__PURE__ */ u(v, [["__scopeId", "data-v-a47c2830"]]);
export {
  O as default
};
