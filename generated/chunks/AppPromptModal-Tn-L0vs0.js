import { d as g, w as y, f as l, l as v, C as k, B as C, u as e, g as p, q as u, k as f, h as s, s as m, t as d, j as i, p as _, S as b, U as h, T as w, b as x, y as T } from "./vendor-vue-BbmU9NUg.js";
import { b as $, a as n } from "./read-session-B_uIJVOk.js";
import { _ as B } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const D = { class: "app-dialog-head" }, M = { class: "app-dialog-title" }, V = { class: "app-dialog-body" }, K = {
  key: 0,
  class: "app-dialog-msg"
}, N = {
  key: 1,
  class: "app-dialog-input-wrap"
}, S = ["type", "placeholder"], A = { class: "app-dialog-foot" }, E = /* @__PURE__ */ g({
  __name: "AppPromptModal",
  setup(O) {
    const t = $, r = x(null);
    return y(
      () => t.isOpen,
      (c) => {
        c && t.type === "prompt" && T(() => {
          r.value?.focus(), r.value?.select();
        });
      }
    ), (c, a) => (l(), v(w, { to: "body" }, [
      k(h, { name: "app-dialog-fade" }, {
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
              s("header", D, [
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
                e(t).message ? (l(), p("p", K, d(e(t).message), 1)) : i("", !0),
                e(t).type === "prompt" ? (l(), p("div", N, [
                  _(s("input", {
                    ref_key: "inputRef",
                    ref: r,
                    "onUpdate:modelValue": a[1] || (a[1] = (o) => e(t).value = o),
                    type: e(t).inputType,
                    class: "app-dialog-input",
                    placeholder: e(t).placeholder || "请输入…",
                    onKeydown: a[2] || (a[2] = u(f((o) => e(n).handleConfirm(), ["prevent"]), ["enter"]))
                  }, null, 40, S), [
                    [b, e(t).value]
                  ])
                ])) : i("", !0)
              ]),
              s("footer", A, [
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
}), j = /* @__PURE__ */ B(E, [["__scopeId", "data-v-88f24fa6"]]);
export {
  j as default
};
