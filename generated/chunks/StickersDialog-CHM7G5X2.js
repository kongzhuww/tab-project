import { A as d } from "./AppWindowFrame-Dyovz6tL.js";
import { S as r } from "./StickerBoard-CRkKPIBa.js";
import { w as t } from "./window-manager.store-BaRzBtVM.js";
import { p as o, c as s } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DMGLRgln.js";
import { d as l, D as m, M as u, e as f, u as p, b as v, o as h, f as _, h as k, E as w, y as b } from "./vendor-vue-dDCd4-uG.js";
import { _ as g } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
const M = { class: "stickers-dialog-scroll-box" }, S = /* @__PURE__ */ l({
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
    return (B, C) => (h(), f(d, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: p(s).visible,
      "default-width": 820,
      "default-height": 520,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "lw-stickers-window",
      onClose: n,
      onMinimize: c
    }, {
      default: _(() => [
        k("div", M, [
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
