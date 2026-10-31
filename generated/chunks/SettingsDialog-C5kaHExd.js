import { s as t } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { w as a } from "./window-manager.store-DgNn9Rtk.js";
import { d as g, y as p, D as m, o as l, f as _, g as r, u as o, e as f, h as u, G as v, b as c } from "./vendor-vue-wIH4jcna.js";
import { _ as h } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const w = ["open"], C = { class: "settings-dialog-shell" }, O = { class: "settings-dialog-body" }, k = /* @__PURE__ */ g({
  __name: "SettingsDialog",
  setup(y) {
    const d = v(() => import("./SettingsView-Burqm2RU.js")), e = t.state, n = c(null), i = c(!1);
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
    }), (s, B) => (l(), _("dialog", {
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
}), S = /* @__PURE__ */ h(k, [["__scopeId", "data-v-c4e9d899"]]);
export {
  S as default
};
