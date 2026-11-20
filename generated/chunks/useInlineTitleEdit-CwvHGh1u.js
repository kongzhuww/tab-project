import { d as k, w as h, o as w, H as E, f as b, g as C, b as f, y as x, k as B, s as V, t as D, j as P, K } from "./vendor-vue-BbmU9NUg.js";
import "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { _ as S } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const T = ["value", "readonly", "aria-busy"], N = /* @__PURE__ */ k({
  __name: "InlineTitleInput",
  props: {
    modelValue: {},
    busy: { type: Boolean },
    revision: {}
  },
  emits: ["update:modelValue", "commit", "cancel"],
  setup(n, { emit: o }) {
    const a = n, l = o, t = f(null);
    let s = !1, r = !1, u = !1;
    h(() => a.revision, () => {
      r = !1;
    });
    function m(e) {
      l("update:modelValue", e.target.value);
    }
    function i() {
      r || s || u || a.busy || (r = !0, l("commit"));
    }
    function c(e) {
      if (!(s || e.isComposing || e.keyCode === 229)) {
        if (a.busy) {
          (e.key === "Enter" || e.key === "Escape") && (e.preventDefault(), e.stopPropagation());
          return;
        }
        e.key === "Enter" ? (e.preventDefault(), e.stopPropagation(), i()) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), r = !0, l("cancel"));
      }
    }
    function y() {
      s = !0;
    }
    function g() {
      s = !1, x(() => {
        !u && t.value && document.activeElement !== t.value && i();
      });
    }
    return w(() => {
      t.value?.focus(), t.value?.select();
    }), E(() => {
      u = !0;
    }), (e, d) => (b(), C("input", {
      ref_key: "input",
      ref: t,
      type: "text",
      value: a.modelValue,
      readonly: a.busy,
      "aria-busy": a.busy || void 0,
      onInput: m,
      onCompositionstart: y,
      onCompositionend: g,
      onKeydown: c,
      onBlur: i
    }, null, 40, T));
  }
}), M = /* @__PURE__ */ k({
  __name: "InlineEditStatus",
  props: {
    message: {},
    failed: { type: Boolean }
  },
  setup(n) {
    return (o, a) => n.message ? (b(), C("span", {
      key: 0,
      class: V(["inline-edit-status", { failed: n.failed }]),
      role: "status",
      "aria-live": "polite",
      onPointerdown: a[0] || (a[0] = B(() => {
      }, ["stop"]))
    }, D(n.message), 35)) : P("", !0);
  }
}), R = /* @__PURE__ */ S(M, [["__scopeId", "data-v-c63d0c6d"]]);
function U(n) {
  const o = f(!1), a = f(!1), l = f(""), t = f(""), s = f(!1), r = f(0), u = K(null);
  let m = "", i = 0;
  function c() {
    ++i, o.value = !1, t.value = "", s.value = !1, u.value = null;
  }
  function y(d, p) {
    a.value || (c(), u.value = d, m = p, l.value = p, o.value = !0);
  }
  function g() {
    a.value || c();
  }
  async function e() {
    if (!o.value || a.value || u.value === null) return;
    if (l.value === m) {
      c();
      return;
    }
    const d = u.value, p = i, I = l.value;
    a.value = !0, t.value = "保存中…", s.value = !1;
    try {
      const v = await n.save(d, I);
      if (p !== i) return;
      o.value = !1, t.value = "已保存";
      try {
        n.apply(d, v);
      } catch {
        t.value = "内容已保存，但界面更新失败，请刷新核对。", s.value = !0;
      }
    } catch (v) {
      const _ = v instanceof Error ? v.message : "保存失败，请保留草稿后核对。";
      p === i ? (s.value = !0, t.value = _, ++r.value) : n.detachedError(_);
    } finally {
      a.value = !1;
    }
  }
  return E(c), { editing: o, busy: a, draft: l, message: t, failed: s, revision: r, start: y, cancel: g, commit: e, reset: c };
}
export {
  R as I,
  N as _,
  U as u
};
