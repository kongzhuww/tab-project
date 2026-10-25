import { A as d } from "./AppWindowFrame-Cq467fnW.js";
import { S as r } from "./StickerBoard-BKVV-W-Y.js";
import { o as s, n as t, w as o } from "./read-session-C1M3QoXl.js";
import { d as l, C as m, L as u, c as f, u as p, b as v, o as h, w as _, f as k, D as w, s as b } from "./vendor-vue-CjOHdfe5.js";
import { _ as g } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const C = { class: "stickers-dialog-scroll-box" }, S = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(x) {
    const e = v(!document.hidden), a = b(() => t.visible && e.value);
    function i() {
      e.value = !document.hidden, document.hidden && s();
    }
    m(() => document.addEventListener("visibilitychange", i)), u(() => {
      s(), document.removeEventListener("visibilitychange", i);
    });
    function n() {
      o.close("stickers");
    }
    function c() {
      o.minimize("stickers");
    }
    return (B, M) => (h(), f(d, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: p(t).visible,
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
}), A = /* @__PURE__ */ g(S, [["__scopeId", "data-v-7a1d7b14"]]);
export {
  A as default
};
