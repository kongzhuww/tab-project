import { i as h, _ as w } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { d as E, w as x, o as B, G as b, f as k, g as I, b as f, x as V, k as D, q as P, t as K, j as S, K as T } from "./vendor-vue-C-_ocEUS.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-Bk2ztKZ7.js";
const M = ["value", "readonly", "aria-busy"], N = /* @__PURE__ */ E({
  __name: "InlineTitleInput",
  props: {
    modelValue: {},
    busy: { type: Boolean },
    revision: {}
  },
  emits: ["update:modelValue", "commit", "cancel"],
  setup(n, { emit: o }) {
    const e = n, l = o, t = f(null);
    let s = !1, r = !1, u = !1;
    x(() => e.revision, () => {
      r = !1;
    });
    function p(a) {
      l("update:modelValue", a.target.value);
    }
    function i() {
      r || s || u || e.busy || (r = !0, l("commit"));
    }
    function c(a) {
      if (!(s || h(a))) {
        if (e.busy) {
          (a.key === "Enter" || a.key === "Escape") && (a.preventDefault(), a.stopPropagation());
          return;
        }
        a.key === "Enter" ? (a.preventDefault(), a.stopPropagation(), i()) : a.key === "Escape" && (a.preventDefault(), a.stopPropagation(), r = !0, l("cancel"));
      }
    }
    function y() {
      s = !0;
    }
    function g() {
      s = !1, V(() => {
        !u && t.value && document.activeElement !== t.value && i();
      });
    }
    return B(() => {
      t.value?.focus(), t.value?.select();
    }), b(() => {
      u = !0;
    }), (a, d) => (k(), I("input", {
      ref_key: "input",
      ref: t,
      type: "text",
      value: e.modelValue,
      readonly: e.busy,
      "aria-busy": e.busy || void 0,
      onInput: p,
      onCompositionstart: y,
      onCompositionend: g,
      onKeydown: c,
      onBlur: i
    }, null, 40, M));
  }
}), j = /* @__PURE__ */ E({
  __name: "InlineEditStatus",
  props: {
    message: {},
    failed: { type: Boolean }
  },
  setup(n) {
    return (o, e) => n.message ? (k(), I("span", {
      key: 0,
      class: P(["inline-edit-status", { failed: n.failed }]),
      role: "status",
      "aria-live": "polite",
      onPointerdown: e[0] || (e[0] = D(() => {
      }, ["stop"]))
    }, K(n.message), 35)) : S("", !0);
  }
}), R = /* @__PURE__ */ w(j, [["__scopeId", "data-v-c63d0c6d"]]);
function U(n) {
  const o = f(!1), e = f(!1), l = f(""), t = f(""), s = f(!1), r = f(0), u = T(null);
  let p = "", i = 0;
  function c() {
    ++i, o.value = !1, t.value = "", s.value = !1, u.value = null;
  }
  function y(d, m) {
    e.value || (c(), u.value = d, p = m, l.value = m, o.value = !0);
  }
  function g() {
    e.value || c();
  }
  async function a() {
    if (!o.value || e.value || u.value === null) return;
    if (l.value === p) {
      c();
      return;
    }
    const d = u.value, m = i, C = l.value;
    e.value = !0, t.value = "保存中…", s.value = !1;
    try {
      const v = await n.save(d, C);
      if (m !== i) return;
      o.value = !1, t.value = "已保存";
      try {
        n.apply(d, v);
      } catch {
        t.value = "内容已保存，但界面更新失败，请刷新核对。", s.value = !0;
      }
    } catch (v) {
      const _ = v instanceof Error ? v.message : "保存失败，请保留草稿后核对。";
      m === i ? (s.value = !0, t.value = _, ++r.value) : n.detachedError(_);
    } finally {
      e.value = !1;
    }
  }
  return b(c), { editing: o, busy: e, draft: l, message: t, failed: s, revision: r, start: y, cancel: g, commit: a, reset: c };
}
export {
  R as I,
  N as _,
  U as u
};
