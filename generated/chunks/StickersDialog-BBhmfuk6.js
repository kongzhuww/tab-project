import { A as d } from "./AppWindowFrame-DDg3rHjA.js";
import { S as r } from "./StickerBoard-DSImlmaB.js";
import { w as t } from "./window-manager.store-DgNn9Rtk.js";
import { p as o, c as s } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { d as l, D as m, M as u, e as p, u as f, b as v, o as h, w as _, g as k, E as w, x as b } from "./vendor-vue-wIH4jcna.js";
import { _ as g } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const x = { class: "stickers-dialog-scroll-box" }, M = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(S) {
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
    return (B, C) => (h(), p(d, {
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
        k("div", x, [
          w(r, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), L = /* @__PURE__ */ g(M, [["__scopeId", "data-v-7a1d7b14"]]);
export {
  L as default
};
