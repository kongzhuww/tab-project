import { s as t } from "./store-B3c18loz.js";
import { w as a } from "./window-manager.store-BoJtJrk7.js";
import { t as g, _ as m } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { d as p, w as _, o as f, f as l, g as u, h as r, u as o, l as v, j as h, D as w, b as c } from "./vendor-vue-C-_ocEUS.js";
const C = ["open"], O = { class: "settings-dialog-shell" }, k = { class: "settings-dialog-body" }, y = /* @__PURE__ */ p({
  __name: "SettingsDialog",
  setup(B) {
    const d = w(() => import("./SettingsView-RwERD3Fy.js")), e = t.state, n = c(null), i = c(!1);
    return _(() => e.isOpen, (s) => {
      s && (i.value = !0);
    }), f(() => {
      t.setMounted(!0);
      const s = n.value;
      a.register({
        id: "settings",
        title: g("common.settings"),
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
    }), (s, M) => (l(), u("dialog", {
      id: "settings-dialog",
      ref_key: "dialogRef",
      ref: n,
      class: "settings-dialog",
      open: o(e).isOpen || void 0
    }, [
      r("div", O, [
        r("div", k, [
          o(e).isOpen || i.value ? (l(), v(o(d), {
            key: 0,
            active: o(e).isOpen
          }, null, 8, ["active"])) : h("", !0)
        ])
      ])
    ], 8, C));
  }
}), S = /* @__PURE__ */ m(y, [["__scopeId", "data-v-03db5a67"]]);
export {
  S as default
};
