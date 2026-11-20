function L(d, f, p = 5e3) {
  let o = null, i = !1, n = !1;
  function c() {
    o && clearTimeout(o), o = null;
  }
  function s(l = !0) {
    if (i || n) return;
    const t = d(), u = f();
    if (!t || !u || !t.contains(u)) return;
    const g = t.getBoundingClientRect(), w = u.getBoundingClientRect(), E = t.scrollTop + w.top - g.top - (t.clientHeight - w.height) / 2;
    t.scrollTo({ top: Math.max(0, E), behavior: l ? "smooth" : "auto" });
  }
  function a() {
    c(), !n && (o = setTimeout(() => {
      o = null, i = !1, s();
    }, p));
  }
  function r() {
    i = !0, a();
  }
  function e() {
    n && (n = !1, window.removeEventListener("pointerup", e), window.removeEventListener("pointercancel", e), window.removeEventListener("blur", e), a());
  }
  function v() {
    n = !0, r(), window.addEventListener("pointerup", e), window.addEventListener("pointercancel", e), window.addEventListener("blur", e);
  }
  function m(l) {
    ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(l.key) && r();
  }
  function b() {
    c(), n = !1, i = !1, typeof window < "u" && (window.removeEventListener("pointerup", e), window.removeEventListener("pointercancel", e), window.removeEventListener("blur", e));
  }
  return { follow: s, interact: r, pointerDown: v, keyDown: m, reset: b };
}
const h = L(
  () => document.querySelector(".bili-sub-transcript-body"),
  () => document.querySelector(".bili-sub-newspaper-cue.cue-reading-active, .bili-sub-srt-row.active")
);
export {
  L as c,
  h as s
};
