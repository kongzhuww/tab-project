import { A as d } from "./AppWindowFrame-CHe-eBXv.js";
import { S as r } from "./StickerBoard-Dyar3r2m.js";
import { w as t } from "./window-manager.store-B8yz4j-E.js";
import { p as o, c as s } from "./stickers.service-DDI7EXIX.js";
import { d as l, D as m, L as u, e as f, u as p, b as v, o as h, f as _, h as k, s as w, y as b } from "./vendor-vue-D8gPZiit.js";
import { _ as g } from "./_plugin-vue_export-helper-qhyPkMid.js";
const S = { class: "stickers-dialog-scroll-box" }, x = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(B) {
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
    return (C, M) => (h(), f(d, {
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
        k("div", S, [
          w(r, {
            "dock-owned": "",
            active: a.value
          }, null, 8, ["active"])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), E = /* @__PURE__ */ g(x, [["__scopeId", "data-v-7a1d7b14"]]);
export {
  E as default
};
