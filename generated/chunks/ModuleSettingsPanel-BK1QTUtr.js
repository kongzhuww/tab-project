import { d as y, w as M, B as _, K as B, o as k, j as z, T as E, l as H, y as S, i as L, G as T, z as $, b } from "./vendor-vue-BkY5-p5y.js";
/* empty css                                                                             */
import { _ as K } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const P = ["aria-label"], C = /* @__PURE__ */ y({
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
      const e = t.anchor.getBoundingClientRect(), r = o.value.offsetWidth, h = o.value.offsetHeight, n = 8, c = window.innerHeight - e.bottom - n * 2, f = e.top - n * 2, p = c >= Math.min(h, 280) || c >= f, m = Math.max(60, p ? c : f);
      d.value = {
        left: `${Math.max(n, Math.min(e.right - r, window.innerWidth - r - n))}px`,
        top: `${Math.max(n, p ? e.bottom + n : e.top - Math.min(h, m) - n)}px`,
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
    function v() {
      u(), !(!l || !t.visible) && (i(), s = new ResizeObserver(i), o.value && s.observe(o.value), t.anchor && s.observe(t.anchor), window.addEventListener("resize", i), window.addEventListener("scroll", i, !0));
    }
    return M(() => t.visible, () => v(), { flush: "post" }), _(() => {
      l = !0, v();
    }), B(() => {
      l = !1, u();
    }), (e, r) => (k(), z(E, { to: "body" }, [
      H(L("aside", {
        ref_key: "panel",
        ref: o,
        class: "module-settings-panel",
        style: $(d.value),
        "aria-label": a.label,
        onKeydown: x
      }, [
        T(e.$slots, "default", {}, void 0, !0)
      ], 44, P), [
        [S, a.visible]
      ])
    ]));
  }
}), D = /* @__PURE__ */ K(C, [["__scopeId", "data-v-d439b0a0"]]);
export {
  D as M
};
