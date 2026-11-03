import { r as R, w as P, L as k, y as C, b as w, G as D } from "./vendor-vue-FFI3kJnP.js";
const t = R({
  isOpen: !1,
  type: "confirm",
  title: "",
  message: "",
  value: "",
  placeholder: "",
  inputType: "text",
  confirmText: "确定",
  cancelText: "取消",
  danger: !1,
  resolve: void 0
}), A = {
  prompt(e) {
    return new Promise((n) => {
      t.isOpen = !0, t.type = "prompt", t.title = e.title || "请输入", t.message = e.message || "", t.value = e.defaultValue || "", t.placeholder = e.placeholder || "", t.inputType = e.inputType || "text", t.confirmText = e.confirmText || "确定", t.cancelText = e.cancelText || "取消", t.danger = !1, t.resolve = n;
    });
  },
  confirm(e) {
    return new Promise((n) => {
      t.isOpen = !0, t.type = "confirm", t.title = e.title || "请确认", t.message = e.message || "", t.value = "", t.confirmText = e.confirmText || "确定", t.cancelText = e.cancelText || "取消", t.danger = e.danger ?? !0, t.resolve = n;
    });
  },
  alert(e) {
    return new Promise((n) => {
      t.isOpen = !0, t.type = "alert", t.title = e.title || "提示", t.message = e.message || "", t.value = "", t.confirmText = e.confirmText || "我知道了", t.cancelText = "", t.danger = !1, t.resolve = () => n();
    });
  },
  handleConfirm() {
    const e = t.resolve, n = t.type, a = t.value;
    t.isOpen = !1, t.resolve = void 0, e && e(n === "prompt" ? a : n === "confirm" ? !0 : void 0);
  },
  handleCancel() {
    const e = t.resolve, n = t.type;
    t.isOpen = !1, t.resolve = void 0, e && e(n === "prompt" ? null : n === "confirm" ? !1 : void 0);
  }
};
typeof window < "u" && (window.appDialog = A);
class S {
  constructor() {
    this.sequence = 0;
  }
  get pending() {
    return !!this.active;
  }
  cancel() {
    this.active?.stop("cancelled");
  }
  begin(n = {}) {
    const { timeoutMs: a, signal: m, isCurrent: x, onStop: f } = n;
    if (a !== void 0 && (!Number.isInteger(a) || a < 1 || a > 3e5))
      throw new RangeError("Read timeout must be between 1 and 300000 milliseconds");
    const p = ++this.sequence, r = new AbortController();
    let d = !1, h;
    const g = () => !d && this.active === o, c = () => g() && !r.signal.aborted && (x?.() ?? !0), b = () => {
      o.stop("parent");
    }, y = (i) => {
      if (d) return !1;
      const l = g();
      d = !0, l && (this.active = void 0), clearTimeout(h), m?.removeEventListener("abort", b), r.abort(new DOMException(i === "timeout" ? "Read session timed out" : "Read session ended", i === "timeout" ? "TimeoutError" : "AbortError"));
      const s = l && this.sequence === p && !this.active;
      if (i && s)
        try {
          f?.(i);
        } catch {
        }
      return s;
    }, T = (i) => c() ? new Promise((l, s) => {
      const E = () => {
        v(), s(r.signal.reason);
      }, v = () => r.signal.removeEventListener("abort", E);
      r.signal.addEventListener("abort", E, { once: !0 });
      try {
        Promise.resolve(i()).then((u) => {
          v();
          try {
            c() ? l(u) : s(r.signal.reason || new DOMException("Read session is no longer current", "AbortError"));
          } catch (M) {
            s(M);
          }
        }, (u) => {
          v(), s(u);
        });
      } catch (u) {
        v(), s(u);
      }
    }) : Promise.reject(r.signal.reason || new DOMException("Read session is no longer current", "AbortError")), o = { signal: r.signal, owns: g, current: c, wait: T, finish: () => y(), stop: y }, L = this.active;
    return this.active = o, L?.stop("replaced"), g() && (m?.aborted ? o.stop("parent") : (m?.addEventListener("abort", b, { once: !0 }), a !== void 0 && (h = setTimeout(() => o.stop("timeout"), a)))), o;
  }
}
function W(e) {
  const n = w(null), a = w(8), m = w(8), x = w(!1), f = w(0), p = w(0);
  let r, d = 0, h = !1;
  const g = C(() => ({
    position: "fixed",
    left: `${a.value}px`,
    top: `${m.value}px`,
    bottom: "auto",
    maxWidth: `${Math.max(0, f.value - 16)}px`,
    maxHeight: `${Math.max(0, p.value - 16)}px`,
    overflowY: "auto",
    boxSizing: "border-box",
    visibility: x.value ? "visible" : "hidden"
  }));
  function c() {
    if (!e.visible() || !n.value) return;
    f.value = window.innerWidth, p.value = window.innerHeight;
    const i = n.value.offsetWidth, l = n.value.offsetHeight, s = e.anchor(), E = Number.isFinite(s.x) ? s.x : 8, v = Number.isFinite(s.y) ? s.y : 8, u = e.gap ?? 0, M = e.placement === "above" ? v - l - u : v + u, O = e.align === "center" ? E - i / 2 : E;
    a.value = Math.max(8, Math.min(O, f.value - i - 8)), m.value = Math.max(8, Math.min(M, p.value - l - 8)), x.value = !0;
  }
  function b(i) {
    !n.value || i.composedPath().includes(n.value) || e.dismiss();
  }
  function y(i) {
    i.key !== "Escape" || i.isComposing || i.keyCode === 229 || (i.preventDefault(), i.stopPropagation(), e.dismiss());
  }
  function T() {
    e.dismiss();
  }
  function o() {
    document.hidden && e.dismiss();
  }
  function L() {
    ++d, r?.disconnect(), r = void 0, window.removeEventListener("resize", c), document.removeEventListener("pointerdown", b, !0), window.removeEventListener("keydown", y, !0), window.removeEventListener("pagehide", T), document.removeEventListener("visibilitychange", o);
  }
  return P(() => [e.visible(), e.anchor().x, e.anchor().y], async ([i]) => {
    if (L(), x.value = !1, !i || h) return;
    const l = d;
    f.value = window.innerWidth, p.value = window.innerHeight, await D(), !(h || d !== l || !e.visible() || !n.value) && (c(), r = new ResizeObserver(c), r.observe(n.value), window.addEventListener("resize", c), document.addEventListener("pointerdown", b, !0), window.addEventListener("keydown", y, !0), window.addEventListener("pagehide", T), document.addEventListener("visibilitychange", o));
  }, { immediate: !0, flush: "post" }), k(() => {
    h = !0, L();
  }), { menuRef: n, style: g };
}
export {
  S as R,
  t as a,
  A as b,
  W as u
};
