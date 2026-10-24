import { w as H, a as W, c as z, b as n, n as $ } from "./vendor-vue-BUkfvXUI.js";
function P(e) {
  const t = n(null), m = n(8), h = n(8), v = n(!1), a = n(0), o = n(0);
  let r, l = 0, c = !1;
  const L = z(() => ({
    position: "fixed",
    left: `${m.value}px`,
    top: `${h.value}px`,
    bottom: "auto",
    maxWidth: `${Math.max(0, a.value - 16)}px`,
    maxHeight: `${Math.max(0, o.value - 16)}px`,
    overflowY: "auto",
    boxSizing: "border-box",
    visibility: v.value ? "visible" : "hidden"
  }));
  function s() {
    if (!e.visible() || !t.value) return;
    a.value = window.innerWidth, o.value = window.innerHeight;
    const i = t.value.offsetWidth, d = t.value.offsetHeight, u = e.anchor(), p = Number.isFinite(u.x) ? u.x : 8, y = Number.isFinite(u.y) ? u.y : 8, E = e.gap ?? 0, M = e.placement === "above" ? y - d - E : y + E, k = e.align === "center" ? p - i / 2 : p;
    m.value = Math.max(8, Math.min(k, a.value - i - 8)), h.value = Math.max(8, Math.min(M, o.value - d - 8)), v.value = !0;
  }
  function w(i) {
    !t.value || i.composedPath().includes(t.value) || e.dismiss();
  }
  function f(i) {
    i.key !== "Escape" || i.isComposing || i.keyCode === 229 || (i.preventDefault(), i.stopPropagation(), e.dismiss());
  }
  function x() {
    e.dismiss();
  }
  function b() {
    document.hidden && e.dismiss();
  }
  function g() {
    ++l, r?.disconnect(), r = void 0, window.removeEventListener("resize", s), document.removeEventListener("pointerdown", w, !0), window.removeEventListener("keydown", f, !0), window.removeEventListener("pagehide", x), document.removeEventListener("visibilitychange", b);
  }
  return H(() => [e.visible(), e.anchor().x, e.anchor().y], async ([i]) => {
    if (g(), v.value = !1, !i || c) return;
    const d = l;
    a.value = window.innerWidth, o.value = window.innerHeight, await $(), !(c || l !== d || !e.visible() || !t.value) && (s(), r = new ResizeObserver(s), r.observe(t.value), window.addEventListener("resize", s), document.addEventListener("pointerdown", w, !0), window.addEventListener("keydown", f, !0), window.addEventListener("pagehide", x), document.addEventListener("visibilitychange", b));
  }, { immediate: !0, flush: "post" }), W(() => {
    c = !0, g();
  }), { menuRef: t, style: L };
}
export {
  P as u
};
