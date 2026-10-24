import { w as rt } from "./read-session-CysyqM5X.js";
import { w as st, n as O, o as ht, d as ct, b as E, c as ut } from "./vendor-vue-BUkfvXUI.js";
function pt(o) {
  const a = E(null), k = E(null);
  let y = !1, A = 0, T;
  function h() {
    ++A;
    const t = T;
    T = void 0, t?.();
  }
  const $ = E(!1), R = E(!1), x = E(!1), C = E(null), z = o.storageKey || `lw_win_pos_${o.windowId}`, N = o.defaultWidth || 840, U = o.defaultHeight || 580, H = o.minWidth || 380, W = o.minHeight || 260;
  function S() {
    o.managed !== !1 && rt.bringToFront(o.windowId), o.onFocus && o.onFocus();
  }
  function q(t) {
    if (!t || typeof t != "object" || Array.isArray(t)) return null;
    const n = t, { left: e, top: i, width: u, height: s } = n;
    return typeof e != "number" || !Number.isFinite(e) || typeof i != "number" || !Number.isFinite(i) || typeof u != "number" || !Number.isFinite(u) || u <= 0 || typeof s != "number" || !Number.isFinite(s) || s <= 0 ? null : { left: e, top: i, width: u, height: s };
  }
  function X() {
    try {
      const t = localStorage.getItem(z);
      if (t) return q(JSON.parse(t));
    } catch {
    }
    return null;
  }
  function Y(t) {
    const n = typeof window < "u" ? window.innerWidth : 1920, e = typeof window < "u" ? window.innerHeight : 1080;
    let i = N, u = U;
    n <= 1366 ? (i = Math.min(N, Math.max(H, n - 32)), u = Math.min(U, Math.max(W, e - 90))) : n <= 1536 && (i = Math.min(N, Math.max(H, n - 48)), u = Math.min(U, Math.max(W, e - 100)));
    let s = t?.width || i, l = t?.height || u, m = t?.left, f = t?.top;
    s = Math.max(1, Math.min(n - 16, Math.max(H, s))), l = Math.max(1, Math.min(e - 16, Math.max(W, l)));
    const d = 64;
    if (typeof m != "number" || typeof f != "number") {
      const I = o.defaultLeft !== void 0 ? Math.min(o.defaultLeft, n - s - 16) : Math.round((n - s) / 2);
      m = Math.max(8, Math.min(I, n - s - 8)), f = Math.max(d, Math.min(o.defaultTop ?? Math.max(d + 16, Math.round((e - l) / 2)), e - 50));
    } else
      m = Math.max(8, Math.min(m, n - s - 8)), f = Math.max(d, Math.min(f, e - 50));
    return { left: m, top: f, width: s, height: l };
  }
  const j = Y(X()), v = E(j), G = ut(() => ({
    width: `${v.value.width}px`,
    height: `${v.value.height}px`,
    left: `${v.value.left}px`,
    top: `${v.value.top}px`,
    right: "auto",
    bottom: "auto",
    margin: "0",
    transform: "none"
  }));
  function Q(t) {
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        chrome.storage.local.get([z], (n) => {
          const e = !!chrome.runtime?.lastError;
          t(!e && q(n?.[z]) || X());
        });
        return;
      }
    } catch {
    }
    t(X());
  }
  function J(t) {
    try {
      typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [z]: t }, () => {
        chrome.runtime?.lastError;
      });
    } catch {
    }
    try {
      localStorage.setItem(z, JSON.stringify(t));
    } catch {
    }
  }
  function V(t) {
    v.value = { ...t }, a.value && (a.value.style.width = `${t.width}px`, a.value.style.height = `${t.height}px`, a.value.style.left = `${t.left}px`, a.value.style.top = `${t.top}px`, a.value.style.right = "auto", a.value.style.bottom = "auto", a.value.style.transform = "none", a.value.style.margin = "0");
  }
  function _() {
    if (!a.value || typeof window > "u") return;
    const n = ++A, e = X();
    V(Y(e)), Q((i) => {
      y || n !== A || o.active?.() === !1 || x.value || i && (!e || i.left !== e.left || i.top !== e.top || i.width !== e.width || i.height !== e.height) && V(Y(i));
    });
  }
  let D = !1;
  function Z(t) {
    D && (D = !1, t.preventDefault(), t.stopPropagation());
  }
  function tt(t) {
    if (y || o.active?.() === !1 || $.value || R.value || (D = !1, h(), t.button !== 0 || x.value)) return;
    const n = t.target;
    if (!n || n.closest("button, a, input, textarea, select, [draggable='true'], .no-drag"))
      return;
    const e = a.value;
    if (!e) return;
    S();
    const i = t.clientX, u = t.clientY;
    let s = !1;
    const l = e.getBoundingClientRect(), m = t.clientX - l.left, f = t.clientY - l.top, d = 64, I = Math.max(8, window.innerWidth - l.width - 8), B = Math.max(d, window.innerHeight - 50);
    e.style.width = `${l.width}px`, e.style.height = `${l.height}px`, e.style.left = `${l.left}px`, e.style.top = `${l.top}px`, e.style.right = "auto", e.style.bottom = "auto", e.style.transform = "none", e.style.margin = "0", $.value = !0, e.classList.add("dragging"), e.style.willChange = "left, top";
    const M = k.value;
    try {
      M?.setPointerCapture(t.pointerId);
    } catch {
    }
    let P = l.left, r = l.top, g = 0;
    const L = () => {
      g = 0, a.value && (a.value.style.left = `${P}px`, a.value.style.top = `${r}px`);
    }, b = (c) => {
      c.pointerId === t.pointerId && (Math.hypot(c.clientX - i, c.clientY - u) > 4 && (s = !0), P = Math.max(8, Math.min(c.clientX - m, I)), r = Math.max(d, Math.min(c.clientY - f, B)), g || (g = requestAnimationFrame(L)));
    }, p = (c) => {
      if (c.pointerId !== t.pointerId) return;
      D = s && c.type === "pointerup";
      const nt = P, ot = r, at = e.offsetWidth || l.width, lt = e.offsetHeight || l.height, K = { left: nt, top: ot, width: at, height: lt };
      v.value = K, h(), c.type === "pointerup" && J(K);
    }, w = () => {
      document.hidden && h();
    };
    T = () => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", p), window.removeEventListener("pointercancel", p), window.removeEventListener("blur", h), document.removeEventListener("visibilitychange", w), g && (cancelAnimationFrame(g), L());
      try {
        M?.releasePointerCapture(t.pointerId);
      } catch {
      }
      const c = e.getBoundingClientRect();
      v.value = { left: c.left, top: c.top, width: c.width, height: c.height }, $.value = !1, R.value = !1, e.classList.remove("dragging", "resizing"), e.style.willChange = "auto";
    }, window.addEventListener("pointermove", b, { passive: !0 }), window.addEventListener("pointerup", p), window.addEventListener("pointercancel", p), window.addEventListener("blur", h), document.addEventListener("visibilitychange", w);
  }
  function et(t, n) {
    if (y || o.active?.() === !1 || $.value || R.value || (h(), t.button !== 0 || x.value)) return;
    const e = a.value;
    if (!e) return;
    S();
    const i = e.getBoundingClientRect(), u = t.clientX, s = t.clientY, l = 64;
    e.style.width = `${i.width}px`, e.style.height = `${i.height}px`, e.style.left = `${i.left}px`, e.style.top = `${i.top}px`, e.style.right = "auto", e.style.bottom = "auto", e.style.transform = "none", e.style.margin = "0", R.value = !0, e.classList.add("resizing"), e.style.willChange = "width, height, left, top";
    const m = t.currentTarget;
    try {
      m?.setPointerCapture(t.pointerId);
    } catch {
    }
    let f = 0, d = null;
    const I = () => {
      if (f = 0, !d) return;
      const r = d.x - u, g = d.y - s;
      d = null;
      let L = i.left, b = i.top, p = i.width, w = i.height;
      n.includes("e") && (p = Math.max(H, Math.min(i.width + r, window.innerWidth - i.left - 8))), n.includes("s") && (w = Math.max(W, Math.min(i.height + g, window.innerHeight - i.top - 8))), n.includes("w") && (p = Math.max(H, Math.min(i.width - r, i.right - 8)), L = i.right - p), n.includes("n") && (w = Math.max(W, Math.min(i.height - g, i.bottom - l)), b = i.bottom - w), e.style.left = `${L}px`, e.style.top = `${b}px`, e.style.width = `${p}px`, e.style.height = `${w}px`;
    }, B = (r) => {
      r.pointerId === t.pointerId && (d = { x: r.clientX, y: r.clientY }, f || (f = requestAnimationFrame(I)));
    }, M = (r) => {
      if (r.pointerId !== t.pointerId) return;
      const g = e.offsetWidth || i.width, L = e.offsetHeight || i.height, b = e.offsetLeft, p = e.offsetTop, w = { left: b, top: p, width: g, height: L };
      v.value = w, h(), r.type === "pointerup" && J(w);
    }, P = () => {
      document.hidden && h();
    };
    T = () => {
      cancelAnimationFrame(f), I(), window.removeEventListener("pointermove", B), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), window.removeEventListener("blur", h), document.removeEventListener("visibilitychange", P);
      try {
        m?.releasePointerCapture(t.pointerId);
      } catch {
      }
      const r = e.getBoundingClientRect();
      v.value = { left: r.left, top: r.top, width: r.width, height: r.height }, $.value = !1, R.value = !1, e.classList.remove("dragging", "resizing"), e.style.willChange = "auto";
    }, window.addEventListener("pointermove", B, { passive: !0 }), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M), window.addEventListener("blur", h), document.addEventListener("visibilitychange", P);
  }
  function it() {
    const t = a.value;
    if (t)
      if (h(), S(), x.value)
        x.value = !1, t.classList.remove("is-maximized"), C.value ? (t.style.left = `${C.value.left}px`, t.style.top = `${C.value.top}px`, t.style.width = `${C.value.width}px`, t.style.height = `${C.value.height}px`) : _();
      else {
        const n = t.getBoundingClientRect();
        C.value = {
          left: n.left,
          top: n.top,
          width: n.width,
          height: n.height
        }, x.value = !0, t.classList.add("is-maximized"), t.style.left = "0px", t.style.top = "0px", t.style.width = "100vw", t.style.height = "100vh";
      }
  }
  function F() {
    const t = a.value;
    if (!t || x.value || y || o.active?.() === !1) return;
    h();
    const n = t.getBoundingClientRect(), e = Y({ left: n.left, top: n.top, width: n.width, height: n.height });
    e.top = Math.max(0, Math.min(e.top, window.innerHeight - e.height - 8)), V(e);
  }
  return st(() => o.active?.() ?? !0, (t) => {
    t ? y || (window.addEventListener("resize", F), O(() => {
      !y && o.active?.() !== !1 && F();
    })) : (h(), window.removeEventListener("resize", F));
  }, { flush: "sync" }), ht(() => {
    O(() => {
      y || o.active?.() === !1 || _();
    }), o.active?.() !== !1 && window.addEventListener("resize", F);
  }), ct(() => {
    y = !0, h(), window.removeEventListener("resize", F);
  }), {
    panelRef: a,
    headerRef: k,
    initialStyle: G,
    isDragging: $,
    isResizing: R,
    isMaximized: x,
    bringToFront: S,
    restoreSavedPosition: _,
    onHeaderPointerDown: tt,
    onHeaderClickCapture: Z,
    onResizePointerDown: et,
    toggleMaximize: it,
    stopInteractions: h
  };
}
export {
  pt as u
};
