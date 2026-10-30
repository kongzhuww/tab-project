import { r as R } from "./vendor-vue-wIH4jcna.js";
const e = R({
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
}), D = {
  prompt(t) {
    return new Promise((r) => {
      e.isOpen = !0, e.type = "prompt", e.title = t.title || "请输入", e.message = t.message || "", e.value = t.defaultValue || "", e.placeholder = t.placeholder || "", e.inputType = t.inputType || "text", e.confirmText = t.confirmText || "确定", e.cancelText = t.cancelText || "取消", e.danger = !1, e.resolve = r;
    });
  },
  confirm(t) {
    return new Promise((r) => {
      e.isOpen = !0, e.type = "confirm", e.title = t.title || "请确认", e.message = t.message || "", e.value = "", e.confirmText = t.confirmText || "确定", e.cancelText = t.cancelText || "取消", e.danger = t.danger ?? !0, e.resolve = r;
    });
  },
  alert(t) {
    return new Promise((r) => {
      e.isOpen = !0, e.type = "alert", e.title = t.title || "提示", e.message = t.message || "", e.value = "", e.confirmText = t.confirmText || "我知道了", e.cancelText = "", e.danger = !1, e.resolve = () => r();
    });
  },
  handleConfirm() {
    const t = e.resolve, r = e.type, n = e.value;
    e.isOpen = !1, e.resolve = void 0, t && t(r === "prompt" ? n : r === "confirm" ? !0 : void 0);
  },
  handleCancel() {
    const t = e.resolve, r = e.type;
    e.isOpen = !1, e.resolve = void 0, t && t(r === "prompt" ? null : r === "confirm" ? !1 : void 0);
  }
};
typeof window < "u" && (window.appDialog = D);
class A {
  constructor() {
    this.sequence = 0;
  }
  get pending() {
    return !!this.active;
  }
  cancel() {
    this.active?.stop("cancelled");
  }
  begin(r = {}) {
    const { timeoutMs: n, signal: m, isCurrent: T, onStop: b } = r;
    if (n !== void 0 && (!Number.isInteger(n) || n < 1 || n > 3e5))
      throw new RangeError("Read timeout must be between 1 and 300000 milliseconds");
    const w = ++this.sequence, s = new AbortController();
    let f = !1, v;
    const c = () => !f && this.active === o, p = () => c() && !s.signal.aborted && (T?.() ?? !0), g = () => {
      o.stop("parent");
    }, h = (a) => {
      if (f) return !1;
      const u = c();
      f = !0, u && (this.active = void 0), clearTimeout(v), m?.removeEventListener("abort", g), s.abort(new DOMException(a === "timeout" ? "Read session timed out" : "Read session ended", a === "timeout" ? "TimeoutError" : "AbortError"));
      const i = u && this.sequence === w && !this.active;
      if (a && i)
        try {
          b?.(a);
        } catch {
        }
      return i;
    }, y = (a) => p() ? new Promise((u, i) => {
      const x = () => {
        d(), i(s.signal.reason);
      }, d = () => s.signal.removeEventListener("abort", x);
      s.signal.addEventListener("abort", x, { once: !0 });
      try {
        Promise.resolve(a()).then((l) => {
          d();
          try {
            p() ? u(l) : i(s.signal.reason || new DOMException("Read session is no longer current", "AbortError"));
          } catch (O) {
            i(O);
          }
        }, (l) => {
          d(), i(l);
        });
      } catch (l) {
        d(), i(l);
      }
    }) : Promise.reject(s.signal.reason || new DOMException("Read session is no longer current", "AbortError")), o = { signal: s.signal, owns: c, current: p, wait: y, finish: () => h(), stop: h }, E = this.active;
    return this.active = o, E?.stop("replaced"), c() && (m?.aborted ? o.stop("parent") : (m?.addEventListener("abort", g, { once: !0 }), n !== void 0 && (v = setTimeout(() => o.stop("timeout"), n)))), o;
  }
}
export {
  A as R,
  e as a,
  D as b
};
