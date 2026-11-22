import { A as r } from "./AppWindowFrame-urtsUO2e.js";
import { S as d } from "./StickerBoard-CoEBwyRr.js";
import { w as s } from "./window-manager.store-D2fEf4ic.js";
import { p as t, s as o } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { d as l, o as m, G as u, f, l as p, A as v, h, B as _, u as k, s as w, b } from "./vendor-vue-_upDT3S_.js";
import { _ as g } from "./_plugin-vue_export-helper-DtNgUcga.js";
const B = { class: "stickers-dialog-scroll-box" }, S = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(x) {
    const e = b(!document.hidden), a = w(() => o.visible && e.value);
    function i() {
      e.value = !document.hidden, document.hidden && t();
    }
    m(() => document.addEventListener("visibilitychange", i)), u(() => {
      t(), document.removeEventListener("visibilitychange", i);
    });
    function n() {
      s.close("stickers");
    }
    function c() {
      s.minimize("stickers");
    }
    return (C, M) => (f(), p(r, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: k(o).visible,
      "default-width": 820,
      "default-height": 520,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "lw-stickers-window",
      onClose: n,
      onMinimize: c
    }, {
      default: v(() => [
        h("div", B, [
          _(d, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), L = /* @__PURE__ */ g(S, [["__scopeId", "data-v-17e3ce7a"]]);
export {
  L as default
};
