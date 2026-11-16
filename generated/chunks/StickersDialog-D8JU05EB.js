import { A as r } from "./AppWindowFrame-CtzBF0Q7.js";
import { S as d } from "./StickerBoard-BoyQDzab.js";
import { w as t } from "./window-manager.store-CzUcQOW-.js";
import { p as o, b as s } from "./stickers.service-BVu9MhEk.js";
import { d as l, B as m, C as u, j as p, I as f, u as v, b as h, o as _, i as k, p as w, s as b } from "./vendor-vue-C09jaOfK.js";
import { _ as g } from "./_plugin-vue_export-helper-BTb4PcVA.js";
const B = { class: "stickers-dialog-scroll-box" }, C = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(S) {
    const e = h(!document.hidden), a = b(() => s.visible && e.value);
    function i() {
      e.value = !document.hidden, document.hidden && o();
    }
    m(() => document.addEventListener("visibilitychange", i)), u(() => {
      o(), document.removeEventListener("visibilitychange", i);
    });
    function n() {
      t.close("stickers");
    }
    function c() {
      t.minimize("stickers");
    }
    return (x, M) => (_(), p(r, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: v(s).visible,
      "default-width": 820,
      "default-height": 520,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "lw-stickers-window",
      onClose: n,
      onMinimize: c
    }, {
      default: f(() => [
        k("div", B, [
          w(d, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), I = /* @__PURE__ */ g(C, [["__scopeId", "data-v-17e3ce7a"]]);
export {
  I as default
};
