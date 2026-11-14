import { w as ht } from "./window-manager.store-fHSi_Uh8.js";
import { w as ct, B as dt, D as O, x as ut, s as B, b as W } from "./vendor-vue-BkY5-p5y.js";
function gt(o) {
  const l = W(null), k = W(null);
  let x = !1, A = 0, F;
  function c() {
    ++A;
    const t = F;
    F = void 0, t?.(), (a.value === "dragging" || a.value === "resizing") && (a.value = "idle");
  }
  const a = W("idle"), j = B(() => a.value === "dragging"), G = B(() => a.value === "resizing"), R = B(() => a.value === "maximized"), E = W(null), C = o.storageKey || `lw_win_pos_${o.windowId}`, N = o.defaultWidth || 840, U = o.defaultHeight || 580, I = o.minWidth || 380, P = o.minHeight || 260;
  function T() {
    o.managed !== !1 && ht.bringToFront(o.windowId), o.onFocus && o.onFocus();
  }
  function q(t) {
    if (!t || typeof t != "object" || Array.isArray(t)) return null;
    const n = t, { left: e, top: i, width: u, height: h } = n;
    return typeof e != "number" || !Number.isFinite(e) || typeof i != "number" || !Number.isFinite(i) || typeof u != "number" || !Number.isFinite(u) || u <= 0 || typeof h != "number" || !Number.isFinite(h) || h <= 0 ? null : { left: e, top: i, width: u, height: h };
  }
  function S() {
    try {
      const t = localStorage.getItem(C);
      if (t) return q(JSON.parse(t));
    } catch {
    }
    return null;
  }
  function D(t) {
    const n = typeof window < "u" ? window.innerWidth : 1920, e = typeof window < "u" ? window.innerHeight : 1080;
    let i = N, u = U;
    n <= 1366 ? (i = Math.min(N, Math.max(I, n - 32)), u = Math.min(U, Math.max(P, e - 90))) : n <= 1536 && (i = Math.min(N, Math.max(I, n - 48)), u = Math.min(U, Math.max(P, e - 100)));
    let h = t?.width || i, r = t?.height || u, m = t?.left, f = t?.top;
    h = Math.max(1, Math.min(n - 16, Math.max(I, h))), r = Math.max(1, Math.min(e - 16, Math.max(P, r)));
    const p = 64;
    if (typeof m != "number" || typeof f != "number") {
      const $ = o.defaultLeft !== void 0 ? Math.min(o.defaultLeft, n - h - 16) : Math.round((n - h) / 2);
      m = Math.max(8, Math.min($, n - h - 8)), f = Math.max(p, Math.min(o.defaultTop ?? Math.max(p + 16, Math.round((e - r) / 2)), e - 50));
    } else
      m = Math.max(8, Math.min(m, n - h - 8)), f = Math.max(p, Math.min(f, e - 50));
    return { left: m, top: f, width: h, height: r };
  }
  const Q = D(S()), y = W(Q), Z = B(() => ({
    width: `${y.value.width}px`,
    height: `${y.value.height}px`,
    left: `${y.value.left}px`,
    top: `${y.value.top}px`,
    right: "auto",
    bottom: "auto",
    margin: "0",
    transform: "none"
  }));
  function tt(t) {
    try {
      if (typeof chrome < "u" && chrome.storage?.local) {
        chrome.storage.local.get([C], (n) => {
          const e = !!chrome.runtime?.lastError;
          t(!e && q(n?.[C]) || S());
        });
        return;
      }
    } catch {
    }
    t(S());
  }
  function J(t) {
    try {
      typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [C]: t }, () => {
        chrome.runtime?.lastError;
      });
    } catch {
    }
    try {
      localStorage.setItem(C, JSON.stringify(t));
    } catch {
    }
  }
  function V(t) {
    y.value = { ...t }, l.value && (l.value.style.width = `${t.width}px`, l.value.style.height = `${t.height}px`, l.value.style.left = `${t.left}px`, l.value.style.top = `${t.top}px`, l.value.style.right = "auto", l.value.style.bottom = "auto", l.value.style.transform = "none", l.value.style.margin = "0");
  }
  function _() {
    if (!l.value || typeof window > "u") return;
    const n = ++A, e = S();
    V(D(e)), tt((i) => {
      x || n !== A || o.active?.() === !1 || R.value || i && (!e || i.left !== e.left || i.top !== e.top || i.width !== e.width || i.height !== e.height) && V(D(i));
    });
  }
  let X = !1;
  function et(t) {
    X && (X = !1, t.preventDefault(), t.stopPropagation());
  }
  function it(t) {
    if (x || o.active?.() === !1 || a.value !== "idle" || (X = !1, c(), t.button !== 0 || R.value)) return;
    const n = t.target;
    if (!n || n.closest("button, a, input, textarea, select, [draggable='true'], .no-drag"))
      return;
    const e = l.value;
    if (!e) return;
    T();
    const i = t.clientX, u = t.clientY;
    let h = !1;
    const r = e.getBoundingClientRect(), m = t.clientX - r.left, f = t.clientY - r.top, p = 64, $ = Math.max(8, window.innerWidth - r.width - 8), Y = Math.max(p, window.innerHeight - 50);
    e.style.width = `${r.width}px`, e.style.height = `${r.height}px`, e.style.left = `${r.left}px`, e.style.top = `${r.top}px`, e.style.right = "auto", e.style.bottom = "auto", e.style.transform = "none", e.style.margin = "0", a.value = "dragging", e.classList.add("dragging"), e.style.willChange = "left, top";
    const M = k.value;
    try {
      M?.setPointerCapture(t.pointerId);
    } catch {
    }
    let z = r.left, s = r.top, w = 0;
    const L = () => {
      w = 0, l.value && (l.value.style.left = `${z}px`, l.value.style.top = `${s}px`);
    }, b = (d) => {
      d.pointerId === t.pointerId && (Math.hypot(d.clientX - i, d.clientY - u) > 4 && (h = !0), z = Math.max(8, Math.min(d.clientX - m, $)), s = Math.max(p, Math.min(d.clientY - f, Y)), w || (w = requestAnimationFrame(L)));
    }, g = (d) => {
      if (d.pointerId !== t.pointerId) return;
      X = h && d.type === "pointerup";
      const at = z, lt = s, rt = e.offsetWidth || r.width, st = e.offsetHeight || r.height, K = { left: at, top: lt, width: rt, height: st };
      y.value = K, c(), d.type === "pointerup" && J(K);
    }, v = () => {
      document.hidden && c();
    };
    F = () => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", g), window.removeEventListener("pointercancel", g), window.removeEventListener("blur", c), document.removeEventListener("visibilitychange", v), w && (cancelAnimationFrame(w), L());
      try {
        M?.releasePointerCapture(t.pointerId);
      } catch {
      }
      const d = e.getBoundingClientRect();
      y.value = { left: d.left, top: d.top, width: d.width, height: d.height }, (a.value === "dragging" || a.value === "resizing") && (a.value = "idle"), e.classList.remove("dragging", "resizing"), e.style.willChange = "auto";
    }, window.addEventListener("pointermove", b, { passive: !0 }), window.addEventListener("pointerup", g), window.addEventListener("pointercancel", g), window.addEventListener("blur", c), document.addEventListener("visibilitychange", v);
  }
  function nt(t, n) {
    if (x || o.active?.() === !1 || a.value !== "idle" || (c(), t.button !== 0 || R.value)) return;
    const e = l.value;
    if (!e) return;
    T();
    const i = e.getBoundingClientRect(), u = t.clientX, h = t.clientY, r = 64;
    e.style.width = `${i.width}px`, e.style.height = `${i.height}px`, e.style.left = `${i.left}px`, e.style.top = `${i.top}px`, e.style.right = "auto", e.style.bottom = "auto", e.style.transform = "none", e.style.margin = "0", a.value = "resizing", e.classList.add("resizing"), e.style.willChange = "width, height, left, top";
    const m = t.currentTarget;
    try {
      m?.setPointerCapture(t.pointerId);
    } catch {
    }
    let f = 0, p = null;
    const $ = () => {
      if (f = 0, !p) return;
      const s = p.x - u, w = p.y - h;
      p = null;
      let L = i.left, b = i.top, g = i.width, v = i.height;
      n.includes("e") && (g = Math.max(I, Math.min(i.width + s, window.innerWidth - i.left - 8))), n.includes("s") && (v = Math.max(P, Math.min(i.height + w, window.innerHeight - i.top - 8))), n.includes("w") && (g = Math.max(I, Math.min(i.width - s, i.right - 8)), L = i.right - g), n.includes("n") && (v = Math.max(P, Math.min(i.height - w, i.bottom - r)), b = i.bottom - v), e.style.left = `${L}px`, e.style.top = `${b}px`, e.style.width = `${g}px`, e.style.height = `${v}px`;
    }, Y = (s) => {
      s.pointerId === t.pointerId && (p = { x: s.clientX, y: s.clientY }, f || (f = requestAnimationFrame($)));
    }, M = (s) => {
      if (s.pointerId !== t.pointerId) return;
      const w = e.offsetWidth || i.width, L = e.offsetHeight || i.height, b = e.offsetLeft, g = e.offsetTop, v = { left: b, top: g, width: w, height: L };
      y.value = v, c(), s.type === "pointerup" && J(v);
    }, z = () => {
      document.hidden && c();
    };
    F = () => {
      cancelAnimationFrame(f), $(), window.removeEventListener("pointermove", Y), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), window.removeEventListener("blur", c), document.removeEventListener("visibilitychange", z);
      try {
        m?.releasePointerCapture(t.pointerId);
      } catch {
      }
      const s = e.getBoundingClientRect();
      y.value = { left: s.left, top: s.top, width: s.width, height: s.height }, (a.value === "dragging" || a.value === "resizing") && (a.value = "idle"), e.classList.remove("dragging", "resizing"), e.style.willChange = "auto";
    }, window.addEventListener("pointermove", Y, { passive: !0 }), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M), window.addEventListener("blur", c), document.addEventListener("visibilitychange", z);
  }
  function ot() {
    const t = l.value;
    if (t) {
      if (c(), T(), a.value === "maximized")
        a.value = "idle", t.classList.remove("is-maximized"), E.value ? (t.style.left = `${E.value.left}px`, t.style.top = `${E.value.top}px`, t.style.width = `${E.value.width}px`, t.style.height = `${E.value.height}px`) : _();
      else if (a.value === "idle") {
        const n = t.getBoundingClientRect();
        E.value = {
          left: n.left,
          top: n.top,
          width: n.width,
          height: n.height
        }, a.value = "maximized", t.classList.add("is-maximized"), t.style.left = "0px", t.style.top = "0px", t.style.width = "100vw", t.style.height = "100vh";
      }
    }
  }
  function H() {
    const t = l.value;
    if (!t || R.value || x || o.active?.() === !1) return;
    c();
    const n = t.getBoundingClientRect(), e = D({ left: n.left, top: n.top, width: n.width, height: n.height });
    e.top = Math.max(0, Math.min(e.top, window.innerHeight - e.height - 8)), V(e);
  }
  return ct(() => o.active?.() ?? !0, (t) => {
    t ? x || (window.addEventListener("resize", H), O(() => {
      !x && o.active?.() !== !1 && H();
    })) : (c(), window.removeEventListener("resize", H));
  }, { flush: "sync" }), dt(() => {
    O(() => {
      x || o.active?.() === !1 || _();
    }), o.active?.() !== !1 && window.addEventListener("resize", H);
  }), ut(() => {
    x = !0, c(), window.removeEventListener("resize", H);
  }), {
    panelRef: l,
    headerRef: k,
    initialStyle: Z,
    interactionMode: a,
    isDragging: j,
    isResizing: G,
    isMaximized: R,
    bringToFront: T,
    restoreSavedPosition: _,
    onHeaderPointerDown: it,
    onHeaderClickCapture: et,
    onResizePointerDown: nt,
    toggleMaximize: ot,
    stopInteractions: c
  };
}
export {
  gt as u
};
