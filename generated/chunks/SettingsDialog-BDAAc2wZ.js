import { s as t } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { w as a } from "./window-manager.store-D_Nuf9-p.js";
import { d as g, x as p, C as m, o as l, e as _, f as r, u as o, c as f, g as u, E as v, b as c } from "./vendor-vue-DokqDua_.js";
import { _ as C } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const h = ["open"], w = { class: "settings-dialog-shell" }, O = { class: "settings-dialog-body" }, k = /* @__PURE__ */ g({
  __name: "SettingsDialog",
  setup(x) {
    const d = v(() => import("./SettingsView-BX5NxIMA.js")), e = t.state, n = c(null), i = c(!1);
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
      r("div", w, [
        r("div", O, [
          o(e).isOpen || i.value ? (l(), f(o(d), {
            key: 0,
            active: o(e).isOpen
          }, null, 8, ["active"])) : u("", !0)
        ])
      ])
    ], 8, h));
  }
}), V = /* @__PURE__ */ C(k, [["__scopeId", "data-v-c4e9d899"]]);
export {
  V as default
};
