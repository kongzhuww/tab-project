import { s as t } from "./store-9q9o9-jB.js";
import { w as a } from "./read-session-CysyqM5X.js";
import { f as g, w as p, o as m, g as l, h as _, i as r, x as o, I as f, u, J as v, b as c } from "./vendor-vue-BUkfvXUI.js";
import { _ as h } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const w = ["open"], C = { class: "settings-dialog-shell" }, O = { class: "settings-dialog-body" }, k = /* @__PURE__ */ g({
  __name: "SettingsDialog",
  setup(x) {
    const d = v(() => import("./SettingsView-cNZbKXBy.js")), e = t.state, n = c(null), i = c(!1);
    return p(() => e.isOpen, (s) => {
      s && (i.value = !0);
    }), m(() => {
      t.setMounted(!0);
      const s = n.value;
      a.register({
        id: "settings",
        title: "设置",
        icon: "⚙",
        element: s,
        getElement: () => n.value,
        onActivate: () => {
          t.open();
        },
        onMinimize: () => {
          t.minimize();
        },
        onClose: () => (t.close(), !0)
      }), e.isOpen && a.activate("settings");
    }), (s, y) => (l(), _("dialog", {
      id: "settings-dialog",
      ref_key: "dialogRef",
      ref: n,
      class: "settings-dialog",
      open: o(e).isOpen || void 0
    }, [
      r("div", C, [
        r("div", O, [
          o(e).isOpen || i.value ? (l(), f(o(d), {
            key: 0,
            active: o(e).isOpen
          }, null, 8, ["active"])) : u("", !0)
        ])
      ])
    ], 8, w));
  }
}), V = /* @__PURE__ */ h(k, [["__scopeId", "data-v-c4e9d899"]]);
export {
  V as default
};
