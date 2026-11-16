import { s as t } from "./store-BjvXo5pC.js";
import { w as a } from "./window-manager.store-CzUcQOW-.js";
import { t as g, _ as m } from "./_plugin-vue_export-helper-BTb4PcVA.js";
import { d as p, w as _, B as f, o as l, e as u, i as r, u as o, j as v, f as w, D as h, b as c } from "./vendor-vue-C09jaOfK.js";
const C = ["open"], O = { class: "settings-dialog-shell" }, k = { class: "settings-dialog-body" }, B = /* @__PURE__ */ p({
  __name: "SettingsDialog",
  setup(y) {
    const d = h(() => import("./SettingsView-u1kSZfZh.js")), e = t.state, n = c(null), i = c(!1);
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
          }, null, 8, ["active"])) : w("", !0)
        ])
      ])
    ], 8, C));
  }
}), S = /* @__PURE__ */ m(B, [["__scopeId", "data-v-03db5a67"]]);
export {
  S as default
};
