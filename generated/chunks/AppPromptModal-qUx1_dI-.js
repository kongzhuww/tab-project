import { d as g, w as y, D as v, o as l, j as k, p as _, H as b, u as e, e as p, k as u, h as m, i as s, A as f, t as d, f as i, l as C, q as h, R as w, T as x, b as T } from "./vendor-vue-9b0eS4bW.js";
import { b as D, a as n } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-9z3_WNrf.js";
import { _ as $ } from "./_plugin-vue_export-helper-D0Oc3lep.js";
const B = { class: "app-dialog-head" }, M = { class: "app-dialog-title" }, V = { class: "app-dialog-body" }, A = {
  key: 0,
  class: "app-dialog-msg"
}, K = {
  key: 1,
  class: "app-dialog-input-wrap"
}, N = ["type", "placeholder"], R = { class: "app-dialog-foot" }, E = /* @__PURE__ */ g({
  __name: "AppPromptModal",
  setup(O) {
    const t = D, r = T(null);
    return y(
      () => t.isOpen,
      (c) => {
        c && t.type === "prompt" && v(() => {
          r.value?.focus(), r.value?.select();
        });
      }
    ), (c, a) => (l(), k(x, { to: "body" }, [
      _(w, { name: "app-dialog-fade" }, {
        default: b(() => [
          e(t).isOpen ? (l(), p("div", {
            key: 0,
            class: "app-dialog-backdrop",
            onClick: a[5] || (a[5] = m((o) => e(t).type !== "alert" && e(n).handleCancel(), ["self"])),
            onKeydown: a[6] || (a[6] = u((o) => e(n).handleCancel(), ["esc"]))
          }, [
            s("div", {
              class: f(["app-dialog-card", { "is-danger": e(t).danger }]),
              role: "dialog",
              "aria-modal": "true"
            }, [
              s("header", B, [
                s("h3", M, d(e(t).title), 1),
                e(t).type !== "alert" ? (l(), p("button", {
                  key: 0,
                  type: "button",
                  class: "app-dialog-close",
                  title: "关闭 (Esc)",
                  onClick: a[0] || (a[0] = (o) => e(n).handleCancel())
                }, " ✕ ")) : i("", !0)
              ]),
              s("div", V, [
                e(t).message ? (l(), p("p", A, d(e(t).message), 1)) : i("", !0),
                e(t).type === "prompt" ? (l(), p("div", K, [
                  C(s("input", {
                    ref_key: "inputRef",
                    ref: r,
                    "onUpdate:modelValue": a[1] || (a[1] = (o) => e(t).value = o),
                    type: e(t).inputType,
                    class: "app-dialog-input",
                    placeholder: e(t).placeholder || "请输入…",
                    onKeydown: a[2] || (a[2] = u(m((o) => e(n).handleConfirm(), ["prevent"]), ["enter"]))
                  }, null, 40, N), [
                    [h, e(t).value]
                  ])
                ])) : i("", !0)
              ]),
              s("footer", R, [
                e(t).type !== "alert" ? (l(), p("button", {
                  key: 0,
                  type: "button",
                  class: "app-dialog-btn cancel",
                  onClick: a[3] || (a[3] = (o) => e(n).handleCancel())
                }, d(e(t).cancelText || "取消"), 1)) : i("", !0),
                s("button", {
                  type: "button",
                  class: f(["app-dialog-btn confirm", { danger: e(t).danger }]),
                  onClick: a[4] || (a[4] = (o) => e(n).handleConfirm())
                }, d(e(t).confirmText || "确定"), 3)
              ])
            ], 2)
          ], 32)) : i("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), q = /* @__PURE__ */ $(E, [["__scopeId", "data-v-db658335"]]);
export {
  q as default
};
