import { d as g, w as y, D as v, o as l, j as k, p as _, H as C, u as e, e as p, k as u, h as f, i as s, A as m, t as d, f as i, l as b, q as h, U as w, T as x, b as T } from "./vendor-vue-BkY5-p5y.js";
import { b as D, a as n } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
import { _ as $ } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const B = { class: "app-dialog-head" }, M = { class: "app-dialog-title" }, V = { class: "app-dialog-body" }, A = {
  key: 0,
  class: "app-dialog-msg"
}, K = {
  key: 1,
  class: "app-dialog-input-wrap"
}, N = ["type", "placeholder"], E = { class: "app-dialog-foot" }, O = /* @__PURE__ */ g({
  __name: "AppPromptModal",
  setup(P) {
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
        default: C(() => [
          e(t).isOpen ? (l(), p("div", {
            key: 0,
            class: "app-dialog-backdrop",
            onClick: a[5] || (a[5] = f((o) => e(t).type !== "alert" && e(n).handleCancel(), ["self"])),
            onKeydown: a[6] || (a[6] = u((o) => e(n).handleCancel(), ["esc"]))
          }, [
            s("div", {
              class: m(["app-dialog-card", { "is-danger": e(t).danger }]),
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
                  b(s("input", {
                    ref_key: "inputRef",
                    ref: r,
                    "onUpdate:modelValue": a[1] || (a[1] = (o) => e(t).value = o),
                    type: e(t).inputType,
                    class: "app-dialog-input",
                    placeholder: e(t).placeholder || "请输入…",
                    onKeydown: a[2] || (a[2] = u(f((o) => e(n).handleConfirm(), ["prevent"]), ["enter"]))
                  }, null, 40, N), [
                    [h, e(t).value]
                  ])
                ])) : i("", !0)
              ]),
              s("footer", E, [
                e(t).type !== "alert" ? (l(), p("button", {
                  key: 0,
                  type: "button",
                  class: "app-dialog-btn cancel",
                  onClick: a[3] || (a[3] = (o) => e(n).handleCancel())
                }, d(e(t).cancelText || "取消"), 1)) : i("", !0),
                s("button", {
                  type: "button",
                  class: m(["app-dialog-btn confirm", { danger: e(t).danger }]),
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
}), j = /* @__PURE__ */ $(O, [["__scopeId", "data-v-88f24fa6"]]);
export {
  j as default
};
