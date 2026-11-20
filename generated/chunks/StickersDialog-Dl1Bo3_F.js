import { A as r } from "./AppWindowFrame-BGiK3atJ.js";
import { S as d } from "./StickerBoard-DpiYWVME.js";
import { w as t } from "./window-manager.store-D9RSYghK.js";
import { p as o, s } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { d as l, o as m, H as u, f, l as p, B as v, h, C as _, u as k, x as w, b } from "./vendor-vue-BbmU9NUg.js";
import { _ as g } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const x = { class: "stickers-dialog-scroll-box" }, B = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(C) {
    const e = b(!document.hidden), a = w(() => s.visible && e.value);
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
    return (S, M) => (f(), p(r, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: k(s).visible,
      "default-width": 820,
      "default-height": 520,
      "min-width": 480,
      "min-height": 360,
      "custom-class": "lw-stickers-window",
      onClose: n,
      onMinimize: c
    }, {
      default: v(() => [
        h("div", x, [
          _(d, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), L = /* @__PURE__ */ g(B, [["__scopeId", "data-v-17e3ce7a"]]);
export {
  L as default
};
