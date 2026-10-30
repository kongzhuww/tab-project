import { d as y, y as M, D as _, M as B, o as k, e as E, k as H, m as S, A as z, g as L, J as $, B as P, b } from "./vendor-vue-wIH4jcna.js";
/* empty css                                                                             */
import { _ as T } from "./_plugin-vue_export-helper-CHgC5LLL.js";
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
      const e = t.anchor.getBoundingClientRect(), l = o.value.offsetWidth, v = o.value.offsetHeight, n = 8, c = window.innerHeight - e.bottom - n * 2, h = e.top - n * 2, m = c >= Math.min(v, 280) || c >= h, p = Math.max(60, m ? c : h);
      d.value = {
        left: `${Math.max(n, Math.min(e.right - l, window.innerWidth - l - n))}px`,
        top: `${Math.max(n, m ? e.bottom + n : e.top - Math.min(v, p) - n)}px`,
        maxHeight: `${p}px`,
        visibility: "visible"
      };
    }
    function x(e) {
      t.visible && e.key === "Escape" && o.value?.contains(e.target) && (e.stopPropagation(), g("close"), t.anchor?.focus());
    }
    let s, r = !1;
    function u() {
      s?.disconnect(), s = void 0, window.removeEventListener("resize", i), window.removeEventListener("scroll", i, !0);
    }
    function f() {
      u(), !(!r || !t.visible) && (i(), s = new ResizeObserver(i), o.value && s.observe(o.value), t.anchor && s.observe(t.anchor), window.addEventListener("resize", i), window.addEventListener("scroll", i, !0));
    }
    return M(() => t.visible, () => f(), { flush: "post" }), _(() => {
      r = !0, f();
    }), B(() => {
      r = !1, u();
    }), (e, l) => (k(), E(H, { to: "body" }, [
      S(L("aside", {
        ref_key: "panel",
        ref: o,
        class: "module-settings-panel",
        style: P(d.value),
        "aria-label": a.label,
        onKeydown: x
      }, [
        $(e.$slots, "default", {}, void 0, !0)
      ], 44, C), [
        [z, a.visible]
      ])
    ]));
  }
}), A = /* @__PURE__ */ T(D, [["__scopeId", "data-v-f886edff"]]);
export {
  A as M
};
