import { d as g, w as y, E as v, o as l, j as k, p as _, I as C, u as e, e as p, k as u, h as f, i as s, A as m, t as d, f as i, l as b, q as h, V as w, T as x, b as T } from "./vendor-vue-C09jaOfK.js";
import { b as $, a as n } from "./read-session-D7iZUlf2.js";
import { _ as D } from "./_plugin-vue_export-helper-BTb4PcVA.js";
const V = { class: "app-dialog-head" }, B = { class: "app-dialog-title" }, M = { class: "app-dialog-body" }, A = {
  key: 0,
  class: "app-dialog-msg"
}, E = {
  key: 1,
  class: "app-dialog-input-wrap"
}, K = ["type", "placeholder"], N = { class: "app-dialog-foot" }, I = /* @__PURE__ */ g({
  __name: "AppPromptModal",
  setup(O) {
    const t = $, r = T(null);
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
              s("header", V, [
                s("h3", B, d(e(t).title), 1),
                e(t).type !== "alert" ? (l(), p("button", {
                  key: 0,
                  type: "button",
                  class: "app-dialog-close",
                  title: "关闭 (Esc)",
                  onClick: a[0] || (a[0] = (o) => e(n).handleCancel())
                }, " ✕ ")) : i("", !0)
              ]),
              s("div", M, [
                e(t).message ? (l(), p("p", A, d(e(t).message), 1)) : i("", !0),
                e(t).type === "prompt" ? (l(), p("div", E, [
                  b(s("input", {
                    ref_key: "inputRef",
                    ref: r,
                    "onUpdate:modelValue": a[1] || (a[1] = (o) => e(t).value = o),
                    type: e(t).inputType,
                    class: "app-dialog-input",
                    placeholder: e(t).placeholder || "请输入…",
                    onKeydown: a[2] || (a[2] = u(f((o) => e(n).handleConfirm(), ["prevent"]), ["enter"]))
                  }, null, 40, K), [
                    [h, e(t).value]
                  ])
                ])) : i("", !0)
              ]),
              s("footer", N, [
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
}), j = /* @__PURE__ */ D(I, [["__scopeId", "data-v-88f24fa6"]]);
export {
  j as default
};
