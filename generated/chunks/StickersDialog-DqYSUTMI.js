import { A as d } from "./AppWindowFrame-CKjq6-vB.js";
import { S as r } from "./StickerBoard-CyJmBvhu.js";
import { w as t } from "./window-manager.store-BdI_8a-H.js";
import { p as o, b as s } from "./stickers.service-C9AVG1Bf.js";
import { d as l, B as m, K as u, j as p, u as f, b as v, o as h, H as _, i as k, p as w, s as b } from "./vendor-vue-9b0eS4bW.js";
import { _ as g } from "./_plugin-vue_export-helper-BZmK54HO.js";
const B = { class: "stickers-dialog-scroll-box" }, S = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(x) {
    const e = v(!document.hidden), a = b(() => s.visible && e.value);
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
    return (C, M) => (h(), p(d, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: f(s).visible,
      "default-width": 820,
      "default-height": 520,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "lw-stickers-window",
      onClose: n,
      onMinimize: c
    }, {
      default: _(() => [
        k("div", B, [
          w(r, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), L = /* @__PURE__ */ g(S, [["__scopeId", "data-v-7a1d7b14"]]);
export {
  L as default
};
