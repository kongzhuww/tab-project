import { s } from "./store-tFNiieYG.js";
import { w as a } from "./window-manager.store-D2fEf4ic.js";
import { t as g, _ as m } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { d as p, w as _, o as f, f as l, g as u, h as r, u as o, l as v, j as h, D as w, b as c } from "./vendor-vue-_upDT3S_.js";
const C = ["open"], O = { class: "settings-dialog-shell" }, k = { class: "settings-dialog-body" }, y = /* @__PURE__ */ p({
  __name: "SettingsDialog",
  setup(B) {
    const d = w(() => import("./SettingsView-De4vobQn.js").then((e) => e.S)), t = s.state, n = c(null), i = c(!1);
    return _(() => t.isOpen, (e) => {
      e && (i.value = !0);
    }), f(() => {
      s.setMounted(!0);
      const e = n.value;
      a.register({
        id: "settings",
        title: g("common.settings"),
        icon: "⚙",
        element: e,
        getElement: () => n.value,
        onActivate: () => {
          s.open();
        },
        onMinimize: () => {
          s.minimize();
        },
        onClose: () => (s.close(), !0)
      }), t.isOpen && a.activate("settings");
    }), (e, M) => (l(), u("dialog", {
      id: "settings-dialog",
      ref_key: "dialogRef",
      ref: n,
      class: "settings-dialog",
      open: o(t).isOpen || void 0
    }, [
      r("div", O, [
        r("div", k, [
          o(t).isOpen || i.value ? (l(), v(o(d), {
            key: 0,
            active: o(t).isOpen
          }, null, 8, ["active"])) : h("", !0)
        ])
      ])
    ], 8, C));
  }
}), E = /* @__PURE__ */ m(y, [["__scopeId", "data-v-03db5a67"]]);
export {
  E as default
};
