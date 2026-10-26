import { A as d } from "./AppWindowFrame-BVbAJbxJ.js";
import { S as r } from "./StickerBoard-i35nS9AK.js";
import { w as t } from "./window-manager.store-Dfe7fisV.js";
import { p as o, c as s } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { d as l, C as m, L as u, c as f, u as p, b as v, o as h, w as _, f as k, D as w, s as b } from "./vendor-vue-DokqDua_.js";
import { _ as g } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const C = { class: "stickers-dialog-scroll-box" }, S = /* @__PURE__ */ l({
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
    return (B, M) => (h(), f(d, {
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
        k("div", C, [
          w(r, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), E = /* @__PURE__ */ g(S, [["__scopeId", "data-v-7a1d7b14"]]);
export {
  E as default
};
