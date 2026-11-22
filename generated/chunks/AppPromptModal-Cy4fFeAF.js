import { d as m, w as f, f as l, l as g, B as y, A as k, u as e, g as p, I as v, k as _, h as s, q as u, t as d, j as i, p as C, S as b, U as h, T as w, b as x, x as T } from "./vendor-vue-_upDT3S_.js";
import { o as B, _ as D } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { b as $, a as n } from "./read-session-BDQNRDdR.js";
const M = { class: "app-dialog-head" }, V = { class: "app-dialog-title" }, A = { class: "app-dialog-body" }, E = {
  key: 0,
  class: "app-dialog-msg"
}, I = {
  key: 1,
  class: "app-dialog-input-wrap"
}, K = ["type", "placeholder"], N = { class: "app-dialog-foot" }, S = /* @__PURE__ */ m({
  __name: "AppPromptModal",
  setup(O) {
    const a = $, r = x(null);
    return f(
      () => a.isOpen,
      (c) => {
        c && a.type === "prompt" && T(() => {
          r.value?.focus(), r.value?.select();
        });
      }
    ), (c, t) => (l(), g(w, { to: "body" }, [
      y(h, { name: "app-dialog-fade" }, {
        default: k(() => [
          e(a).isOpen ? (l(), p("div", {
            key: 0,
            class: "app-dialog-backdrop",
            onClick: t[5] || (t[5] = _((o) => e(a).type !== "alert" && e(n).handleCancel(), ["self"])),
            onKeydown: t[6] || (t[6] = v((o) => e(n).handleCancel(), ["esc"]))
          }, [
            s("div", {
              class: u(["app-dialog-card", { "is-danger": e(a).danger }]),
              role: "dialog",
              "aria-modal": "true"
            }, [
              s("header", M, [
                s("h3", V, d(e(a).title), 1),
                e(a).type !== "alert" ? (l(), p("button", {
                  key: 0,
                  type: "button",
                  class: "app-dialog-close",
                  title: "关闭 (Esc)",
                  onClick: t[0] || (t[0] = (o) => e(n).handleCancel())
                }, " ✕ ")) : i("", !0)
              ]),
              s("div", A, [
                e(a).message ? (l(), p("p", E, d(e(a).message), 1)) : i("", !0),
                e(a).type === "prompt" ? (l(), p("div", I, [
                  C(s("input", {
                    ref_key: "inputRef",
                    ref: r,
                    "onUpdate:modelValue": t[1] || (t[1] = (o) => e(a).value = o),
                    type: e(a).inputType,
                    class: "app-dialog-input",
                    placeholder: e(a).placeholder || "请输入…",
                    onKeydown: t[2] || (t[2] = (o) => e(B)(o, () => e(n).handleConfirm()))
                  }, null, 40, K), [
                    [b, e(a).value]
                  ])
                ])) : i("", !0)
              ]),
              s("footer", N, [
                e(a).type !== "alert" ? (l(), p("button", {
                  key: 0,
                  type: "button",
                  class: "app-dialog-btn cancel",
                  onClick: t[3] || (t[3] = (o) => e(n).handleCancel())
                }, d(e(a).cancelText || "取消"), 1)) : i("", !0),
                s("button", {
                  type: "button",
                  class: u(["app-dialog-btn confirm", { danger: e(a).danger }]),
                  onClick: t[4] || (t[4] = (o) => e(n).handleConfirm())
                }, d(e(a).confirmText || "确定"), 3)
              ])
            ], 2)
          ], 32)) : i("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), j = /* @__PURE__ */ D(S, [["__scopeId", "data-v-0a94643a"]]);
export {
  j as default
};
