import { d as i, f as a, g as c, h as t, t as n, j as r } from "./vendor-vue-BbmU9NUg.js";
import { _ as l } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const d = {
  class: "account-setup-guide",
  role: "status"
}, u = ["aria-label"], f = {
  class: "account-setup-icon",
  "aria-hidden": "true"
}, m = { class: "account-setup-actions" }, b = ["href"], h = /* @__PURE__ */ i({
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
    return (s, o) => (a(), c("div", d, [
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
            onClick: o[0] || (o[0] = (p) => s.$emit("configure"))
          }, "前往设置"),
          e.secondaryUrl && e.secondaryLabel ? (a(), c("a", {
            key: 0,
            href: e.secondaryUrl,
            target: "_blank",
            rel: "noopener noreferrer"
          }, n(e.secondaryLabel) + " ↗", 9, b)) : r("", !0)
        ])
      ], 8, u)
    ]));
  }
}), k = /* @__PURE__ */ l(h, [["__scopeId", "data-v-679f6ba3"]]);
export {
  k as A
};
