import { d as y, w as M, D as _, L as B, o as k, e as E, l as H, n as L, A as S, h as z, I as $, B as P, b } from "./vendor-vue-D8gPZiit.js";
/* empty css                                                                             */
import { _ as T } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
const C = ["aria-label"], D = /* @__PURE__ */ y({
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
      const e = t.anchor.getBoundingClientRect(), r = o.value.offsetWidth, h = o.value.offsetHeight, n = 8, c = window.innerHeight - e.bottom - n * 2, v = e.top - n * 2, p = c >= Math.min(h, 280) || c >= v, m = Math.max(60, p ? c : v);
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
    function f() {
      u(), !(!l || !t.visible) && (i(), s = new ResizeObserver(i), o.value && s.observe(o.value), t.anchor && s.observe(t.anchor), window.addEventListener("resize", i), window.addEventListener("scroll", i, !0));
    }
    return M(() => t.visible, () => f(), { flush: "post" }), _(() => {
      l = !0, f();
    }), B(() => {
      l = !1, u();
    }), (e, r) => (k(), E(H, { to: "body" }, [
      L(z("aside", {
        ref_key: "panel",
        ref: o,
        class: "module-settings-panel",
        style: P(d.value),
        "aria-label": a.label,
        onKeydown: x
      }, [
        $(e.$slots, "default", {}, void 0, !0)
      ], 44, C), [
        [S, a.visible]
      ])
    ]));
  }
}), W = /* @__PURE__ */ T(D, [["__scopeId", "data-v-f886edff"]]);
export {
  W as M
};
