import { d as y, x as M, C as _, L as B, o as k, c as z, j as E, l as H, z as L, f as S, I as $, A as C, b } from "./vendor-vue-DokqDua_.js";
/* empty css                                                                             */
import { _ as P } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const T = ["aria-label"], I = /* @__PURE__ */ y({
  __name: "ModuleSettingsPanel",
  props: {
    anchor: {},
    label: {},
    visible: { type: Boolean, default: !0 }
  },
  emits: ["close"],
  setup(a, { emit: w }) {
    const t = a, g = w, d = b({ top: "0px", left: "0px", maxHeight: "70vh", visibility: "hidden" }), o = b(null);
    function i() {
      if (!t.visible || !t.anchor || !o.value) return;
      const e = t.anchor.getBoundingClientRect(), r = o.value.offsetWidth, v = o.value.offsetHeight, n = 8, c = window.innerHeight - e.bottom - n * 2, h = e.top - n * 2, p = c >= Math.min(v, 280) || c >= h, m = Math.max(60, p ? c : h);
      d.value = {
        left: `${Math.max(n, Math.min(e.right - r, window.innerWidth - r - n))}px`,
        top: `${Math.max(n, p ? e.bottom + n : e.top - Math.min(v, m) - n)}px`,
        maxHeight: `${m}px`,
        visibility: "visible"
      };
    }
    function x(e) {
      t.visible && e.key === "Escape" && o.value?.contains(e.target) && (e.stopPropagation(), g("close"), t.anchor?.focus());
    }
    let s, l = !1;
    function u() {
      s?.disconnect(), s = void 0, window.removeEventListener("resize", i), window.removeEventListener("scroll", i, !0);
    }
    function f() {
      u(), !(!l || !t.visible) && (i(), s = new ResizeObserver(i), o.value && s.observe(o.value), t.anchor && s.observe(t.anchor), window.addEventListener("resize", i), window.addEventListener("scroll", i, !0));
    }
    return M(() => t.visible, () => f(), { flush: "post" }), _(() => {
      l = !0, f();
    }), B(() => {
      l = !1, u();
    }), (e, r) => (k(), z(E, { to: "body" }, [
      H(S("aside", {
        ref_key: "panel",
        ref: o,
        class: "module-settings-panel",
        style: C(d.value),
        "aria-label": a.label,
        onKeydown: x
      }, [
        $(e.$slots, "default", {}, void 0, !0)
      ], 44, T), [
        [L, a.visible]
      ])
    ]));
  }
}), j = /* @__PURE__ */ P(I, [["__scopeId", "data-v-f886edff"]]);
export {
  j as M
};
