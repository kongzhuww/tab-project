import { s as t } from "./stickers.service-Qf4pDC-d.js";
import { w as a } from "./window-manager.store-BaRzBtVM.js";
import { t as g, _ as m } from "./_plugin-vue_export-helper-CRVO6deU.js";
import { d as p, w as _, D as f, o as l, g as u, h as r, u as o, e as v, i as h, G as w, b as c } from "./vendor-vue-dDCd4-uG.js";
const C = ["open"], O = { class: "settings-dialog-shell" }, k = { class: "settings-dialog-body" }, y = /* @__PURE__ */ p({
  __name: "SettingsDialog",
  setup(B) {
    const d = w(() => import("./SettingsView-CKXen9Tz.js")), e = t.state, n = c(null), i = c(!1);
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
}), S = /* @__PURE__ */ m(y, [["__scopeId", "data-v-460fe69b"]]);
export {
  S as default
};
