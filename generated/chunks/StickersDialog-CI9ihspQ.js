import { A as d } from "./AppWindowFrame-CdaabCwe.js";
import { S as r } from "./StickerBoard-ClN85Paw.js";
import { e as s, s as t, w as o } from "./read-session-BWENvNUM.js";
import { f as l, o as m, a as u, g as f, I as p, K as v, i as h, l as _, x as k, c as w, b } from "./vendor-vue-BUkfvXUI.js";
import { _ as g } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const x = { class: "stickers-dialog-scroll-box" }, S = /* @__PURE__ */ l({
  __name: "StickersDialog",
  setup(B) {
    const e = b(!document.hidden), a = w(() => t.visible && e.value);
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
    return (C, M) => (f(), p(d, {
      id: "stickers-workspace-dialog",
      "window-id": "stickers",
      title: "表情包模块",
      icon: "🐱",
      visible: k(t).visible,
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
          _(r, {
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
