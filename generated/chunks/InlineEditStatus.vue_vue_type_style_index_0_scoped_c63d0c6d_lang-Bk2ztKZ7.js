import { r as K, w as C, G as I, s as L, b as n, x as P } from "./vendor-vue-C-_ocEUS.js";
const F = "logicweaver-sticker-files-v1", M = "stickerRootFolderName", H = "stickerFolderPath", W = "stickerActiveFolderRelPath", A = "stickerExpandedFolderPaths", N = "stickerRootHandleRevision", O = [M, H, W, A, N], _ = K({ visible: !1, pendingWrites: 0 }), f = /* @__PURE__ */ new Set();
function z(e) {
  return f.add(e), () => {
    f.delete(e);
  };
}
function D() {
  for (const e of f) e();
}
async function $(e) {
  _.pendingWrites++;
  try {
    return await e();
  } finally {
    _.pendingWrites--;
  }
}
function B(e) {
  const i = n(null), h = n(8), w = n(8), u = n(!1), s = n(0), a = n(0);
  let o, l = 0, v = !1;
  const R = L(() => ({
    position: "fixed",
    left: `${h.value}px`,
    top: `${w.value}px`,
    bottom: "auto",
    maxWidth: `${Math.max(0, s.value - 16)}px`,
    maxHeight: `${Math.max(0, a.value - 16)}px`,
    overflowY: "auto",
    boxSizing: "border-box",
    visibility: u.value ? "visible" : "hidden"
  }));
  function r() {
    if (!e.visible() || !i.value) return;
    s.value = window.innerWidth, a.value = window.innerHeight;
    const t = i.value.offsetWidth, d = i.value.offsetHeight, c = e.anchor(), b = Number.isFinite(c.x) ? c.x : 8, S = Number.isFinite(c.y) ? c.y : 8, y = e.gap ?? 0, T = e.placement === "above" ? S - d - y : S + y, k = e.align === "center" ? b - t / 2 : b;
    h.value = Math.max(8, Math.min(k, s.value - t - 8)), w.value = Math.max(8, Math.min(T, a.value - d - 8)), u.value = !0;
  }
  function m(t) {
    !i.value || t.composedPath().includes(i.value) || e.dismiss();
  }
  function E(t) {
    t.key !== "Escape" || t.isComposing || t.keyCode === 229 || (t.preventDefault(), t.stopPropagation(), e.dismiss());
  }
  function p() {
    e.dismiss();
  }
  function g() {
    document.hidden && e.dismiss();
  }
  function x() {
    ++l, o?.disconnect(), o = void 0, window.removeEventListener("resize", r), document.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", E, !0), window.removeEventListener("pagehide", p), document.removeEventListener("visibilitychange", g);
  }
  return C(() => [e.visible(), e.anchor().x, e.anchor().y], async ([t]) => {
    if (x(), u.value = !1, !t || v) return;
    const d = l;
    s.value = window.innerWidth, a.value = window.innerHeight, await P(), !(v || l !== d || !e.visible() || !i.value) && (r(), o = new ResizeObserver(r), o.observe(i.value), window.addEventListener("resize", r), document.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", E, !0), window.addEventListener("pagehide", p), document.addEventListener("visibilitychange", g));
  }, { immediate: !0, flush: "post" }), I(() => {
    v = !0, x();
  }), { menuRef: i, style: R };
}
export {
  O as S,
  F as a,
  N as b,
  H as c,
  M as d,
  W as e,
  A as f,
  z as o,
  D as p,
  _ as s,
  B as u,
  $ as w
};
