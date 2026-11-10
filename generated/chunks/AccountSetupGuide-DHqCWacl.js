import { d as i, e as a, i as t, t as n, f as r, o as c } from "./vendor-vue-9b0eS4bW.js";
import { _ as l } from "./_plugin-vue_export-helper-BxikU0LD.js";
const d = {
  class: "account-setup-guide",
  role: "status"
}, u = ["aria-label"], f = {
  class: "account-setup-icon",
  "aria-hidden": "true"
}, m = { class: "account-setup-actions" }, b = ["href"], p = /* @__PURE__ */ i({
  __name: "AccountSetupGuide",
  props: {
    icon: {},
    title: {},
    description: {},
    secondaryUrl: {},
    secondaryLabel: {}
  },
  emits: ["configure"],
  setup(e) {
    return (s, o) => (c(), a("div", d, [
      t("section", {
        class: "account-setup-card",
        "aria-label": e.title
      }, [
        t("span", f, n(e.icon), 1),
        t("h3", null, n(e.title), 1),
        t("p", null, n(e.description), 1),
        t("div", m, [
          t("button", {
            type: "button",
            onClick: o[0] || (o[0] = (y) => s.$emit("configure"))
          }, "前往设置"),
          e.secondaryUrl && e.secondaryLabel ? (c(), a("a", {
            key: 0,
            href: e.secondaryUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          }, n(e.secondaryLabel) + " ↗", 9, b)) : r("", !0)
        ])
      ], 8, u)
    ]));
  }
}), k = /* @__PURE__ */ l(p, [["__scopeId", "data-v-679f6ba3"]]);
export {
  k as A
};
