import { d, w as c, B as r, o as p, e as m, i as t, b } from "./vendor-vue-C09jaOfK.js";
import { _ as f } from "./_plugin-vue_export-helper-BTb4PcVA.js";
const u = {
  class: "todo-panel",
  "aria-label": "Todoist 工作区"
}, _ = { class: "panel-top" }, v = /* @__PURE__ */ d({
  __name: "TodoistPanel",
  props: {
    active: { type: Boolean }
  },
  emits: ["close"],
  setup(a, { emit: n }) {
    const s = a, l = n, i = b(null);
    function e() {
      i.value?.contentWindow?.postMessage({ type: "tab-todoist-embedded-visibility", visible: s.active }, window.location.origin);
    }
    return c(() => s.active, e), r(e), (y, o) => (p(), m("section", u, [
      t("div", _, [
        o[1] || (o[1] = t("span", null, "Todoist 工作区 · 修改会同步到 Todoist", -1)),
        t("button", {
          type: "button",
          "aria-label": "关闭 Todoist",
          onClick: o[0] || (o[0] = (T) => l("close"))
        }, "✕")
      ]),
      t("iframe", {
        ref_key: "frame",
        ref: i,
        src: "todoist-embedded.html",
        title: "Todoist 工作区",
        onLoad: e
      }, null, 544)
    ]));
  }
}), k = /* @__PURE__ */ f(v, [["__scopeId", "data-v-c8a8b9ab"]]);
export {
  k as default
};
