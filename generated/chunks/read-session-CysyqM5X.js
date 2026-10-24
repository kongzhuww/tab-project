import { r as L, e as j } from "./vendor-vue-BUkfvXUI.js";
const i = L({
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
}), X = {
  prompt(e) {
    return new Promise((t) => {
      i.isOpen = !0, i.type = "prompt", i.title = e.title || "请输入", i.message = e.message || "", i.value = e.defaultValue || "", i.placeholder = e.placeholder || "", i.inputType = e.inputType || "text", i.confirmText = e.confirmText || "确定", i.cancelText = e.cancelText || "取消", i.danger = !1, i.resolve = t;
    });
  },
  confirm(e) {
    return new Promise((t) => {
      i.isOpen = !0, i.type = "confirm", i.title = e.title || "请确认", i.message = e.message || "", i.value = "", i.confirmText = e.confirmText || "确定", i.cancelText = e.cancelText || "取消", i.danger = e.danger ?? !0, i.resolve = t;
    });
  },
  alert(e) {
    return new Promise((t) => {
      i.isOpen = !0, i.type = "alert", i.title = e.title || "提示", i.message = e.message || "", i.value = "", i.confirmText = e.confirmText || "我知道了", i.cancelText = "", i.danger = !1, i.resolve = () => t();
    });
  },
  handleConfirm() {
    const e = i.resolve, t = i.type, n = i.value;
    i.isOpen = !1, i.resolve = void 0, e && e(t === "prompt" ? n : t === "confirm" ? !0 : void 0);
  },
  handleCancel() {
    const e = i.resolve, t = i.type;
    i.isOpen = !1, i.resolve = void 0, e && e(t === "prompt" ? null : t === "confirm" ? !1 : void 0);
  }
};
typeof window < "u" && (window.appDialog = X);
const T = L({
  firecrawl: !1
});
function E(e) {
  return Object.prototype.hasOwnProperty.call(T, e);
}
const C = {
  get state() {
    return j(T);
  },
  open(e) {
    T[e] = !0, m.bringToFront(e), m.render();
  },
  close(e) {
    T[e] = !1, m.releaseFocus(e);
    const t = O.openOrder.indexOf(e);
    t >= 0 && O.openOrder.splice(t, 1);
    const n = O.activeTools.indexOf(e);
    n >= 0 && O.activeTools.splice(n, 1), m.render();
  },
  toggle(e) {
    T[e] ? this.close(e) : this.open(e);
  }
}, D = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map();
function k(e) {
  const t = (R.get(e) || 0) + 1;
  return R.set(e, t), t;
}
function ie(e) {
  return R.get(e) || 0;
}
function ce(e) {
  if (e.schemaVersion !== 1 || !/^[a-z][a-z0-9-]*$/.test(e.id) || !e.rootId || !e.title)
    throw new Error("Invalid built-in Dock module definition");
  if (e.presentation === "card" && !e.icon) throw new Error("Workspace card requires its original Dock icon");
  if (D.has(e.id)) throw new Error("Duplicate built-in Dock module ID");
  D.set(e.id, Object.freeze({
    ...e,
    settingsKeys: Object.freeze([...e.settingsKeys]),
    capabilities: Object.freeze([...e.capabilities]),
    lifecycle: Object.freeze({ ...e.lifecycle })
  }));
}
function v(e) {
  return D.get(e);
}
function G() {
  return [...D.values()];
}
function ae() {
  return G().map(({ schemaVersion: e, id: t, title: n, rootId: o, settingsKeys: s, capabilities: c, showInDock: l, presentation: f }) => ({
    schemaVersion: e,
    id: t,
    title: n,
    rootId: o,
    presentation: f || "window",
    showInDock: l !== !1,
    settingsKeys: [...s],
    capabilities: [...c]
  }));
}
const g = {};
function J(e, t) {
  g[e] = t;
}
const P = [
  { id: "calcom", title: "预约", icon: "📆", openId: "calcom-top-open" }
], O = L({
  activeId: "",
  openOrder: [],
  highestZ: 85,
  activeTools: [],
  frozenList: []
}), r = O, a = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), Y = 15e3, B = /* @__PURE__ */ new Set(), A = [];
function Q() {
  const e = [...r.activeTools], t = r.activeId;
  for (const n of B)
    try {
      n(e, t);
    } catch (o) {
      console.warn("[WindowManager] subscriber error:", o);
    }
}
function p(e, t) {
  if (typeof document > "u") return null;
  if (!e && t)
    return t === "wallpaper" ? document.getElementById("wallpaper-workspace") : document.getElementById(`${t}-workspace`) || document.getElementById(`card-${t}`) || document.getElementById(t);
  if (!e) return null;
  if (typeof e.getElement == "function") {
    const n = e.getElement();
    return n && (e.element = n), n;
  }
  return !e.element && t && (t === "wallpaper" ? e.element = document.getElementById("wallpaper-workspace") : e.element = document.getElementById(`${t}-workspace`) || document.getElementById(`card-${t}`) || document.getElementById(t)), e.element || null;
}
function d(e) {
  if (typeof window > "u" || typeof document > "u") return !1;
  const t = v(e);
  if (t) return t.lifecycle.isVisible();
  if (E(e))
    return !!T[e];
  if (g[e]?.isOpen)
    return !!g[e].isOpen();
  const n = a.get(e), o = p(n, e);
  return o ? o.tagName === "DIALOG" ? o.open : !o.hidden && o.style.display !== "none" : !1;
}
const u = {
  freeze(e) {
    if (u.cancelFreeze(e), !e || h.has(e) || d(e)) return;
    const t = a.get(e), n = p(t, e);
    if (n) {
      h.add(e), r.frozenList = Array.from(h), n.classList.add("workspace-frozen"), n.setAttribute("data-frozen", "true");
      try {
        n.inert = !0;
      } catch {
      }
      if (typeof t?.onFreeze == "function")
        try {
          t.onFreeze();
        } catch (o) {
          console.warn(`[DomFreezer] onFreeze error on ${e}`, o);
        }
      if (typeof window < "u")
        try {
          window.dispatchEvent(new CustomEvent("logicweaver:dom-freeze", { detail: { id: e } }));
        } catch {
        }
    }
  },
  thaw(e) {
    if (u.cancelFreeze(e), !e) return;
    const t = h.has(e);
    h.delete(e), r.frozenList = Array.from(h);
    const n = a.get(e), o = p(n, e);
    if (o) {
      o.classList.remove("workspace-frozen"), o.removeAttribute("data-frozen");
      try {
        o.inert = !1;
      } catch {
      }
      if (t && typeof n?.onThaw == "function")
        try {
          n.onThaw();
        } catch (s) {
          console.warn(`[DomFreezer] onThaw error on ${e}`, s);
        }
      if (t && typeof window < "u")
        try {
          window.dispatchEvent(new CustomEvent("logicweaver:dom-thaw", { detail: { id: e } }));
        } catch {
        }
    }
  },
  scheduleFreeze(e, t = Y) {
    if (!e || h.has(e)) return;
    u.cancelFreeze(e);
    const n = setTimeout(() => {
      S.delete(e), u.freeze(e);
    }, t);
    S.set(e, n);
  },
  cancelFreeze(e) {
    S.has(e) && (clearTimeout(S.get(e)), S.delete(e));
  },
  isFrozen(e) {
    return h.has(e);
  },
  getFrozenList() {
    return Array.from(h);
  },
  IDLE_FREEZE_DELAY: Y
}, m = {
  pushModalCloser(e) {
    return A.push(e), () => {
      const t = A.indexOf(e);
      t !== -1 && A.splice(t, 1);
    };
  },
  popModalCloser() {
    for (; A.length > 0; ) {
      const e = A.pop();
      if (e && e() !== !1)
        return !0;
    }
    return !1;
  },
  getSnapshot() {
    return j(r);
  },
  register(e) {
    e?.id && (a.set(e.id, {
      title: e.title || e.id,
      icon: e.icon || "▣",
      element: e.element || null,
      getElement: typeof e.getElement == "function" ? e.getElement : null,
      onActivate: e.onActivate,
      onMinimize: e.onMinimize,
      onClose: e.onClose,
      onFreeze: e.onFreeze,
      onThaw: e.onThaw
    }), v(e.id)?.lifecycle.isVisible() && this.bringToFront(e.id), this.render());
  },
  unregister(e, t) {
    const n = a.get(e);
    !n || t && n.getElement !== t || (u.cancelFreeze(e), h.delete(e), r.frozenList = Array.from(h), a.delete(e), this.render());
  },
  render() {
    if (typeof document > "u") return;
    const e = document.getElementById("workspace-tabs");
    e && (e.replaceChildren(), e.hidden = !0), document.documentElement.classList.remove("has-workspace-tabs");
    const t = /* @__PURE__ */ new Set();
    for (const n of P)
      d(n.id) && t.add(n.id);
    for (const n of G())
      n.presentation !== "card" && n.lifecycle.isVisible() && t.add(n.id);
    for (const n of r.openOrder)
      d(n) && t.add(n);
    for (const [n] of a.entries())
      d(n) && t.add(n);
    r.activeTools = Array.from(t), Q();
  },
  releaseFocus(e) {
    r.activeId === e && (p(a.get(e), e)?.classList.remove("workspace-focused"), r.activeId = "", u.scheduleFreeze(e), this.render());
  },
  bringToFront(e) {
    if (v(e)?.presentation === "card") {
      d(e) && u.thaw(e);
      return;
    }
    const t = a.get(e), n = p(t, e);
    if (n && (n.hidden = !1, n.removeAttribute("hidden"), n.style.display === "none" && (n.style.display = ""), n.style.zIndex = String(++r.highestZ)), r.activeId !== e) {
      if (r.activeId) {
        const o = r.activeId;
        p(a.get(o), o)?.classList.remove("workspace-focused"), u.scheduleFreeze(o);
      }
      r.activeId = e, n?.classList.add("workspace-focused"), this.render();
    }
    u.thaw(e);
  },
  activate(e) {
    if (v(e)?.presentation === "card") {
      this.open(e);
      return;
    }
    const t = a.get(e);
    if (r.openOrder.includes(e) || r.openOrder.push(e), r.activeId && r.activeId !== e) {
      const o = r.activeId;
      p(a.get(o), o)?.classList.remove("workspace-focused"), u.scheduleFreeze(o);
    }
    r.activeId = e, u.thaw(e), t?.onActivate?.();
    const n = p(t, e);
    n && (n.hidden = !1, n.removeAttribute("hidden"), n.style.display === "none" && (n.style.display = ""), n.style.zIndex = String(++r.highestZ), n.classList.add("workspace-focused")), this.render(), setTimeout(() => this.render(), 80);
  },
  open(e) {
    const t = v(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen() || (k(e), t.lifecycle.open(), !t.lifecycle.isVisible() || t.presentation === "card")) return;
      r.openOrder.includes(e) || r.openOrder.push(e), this.bringToFront(e), this.render();
      return;
    }
    if (E(e)) {
      C.open(e), r.openOrder.includes(e) || r.openOrder.push(e), r.activeTools.includes(e) || r.activeTools.push(e), r.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    this.handleToolClick(e);
  },
  handleToolClick(e) {
    const t = d(e), n = r.activeId === e && t;
    if (v(e)) {
      n ? this.close(e) : this.open(e);
      return;
    }
    if (n) {
      if (E(e)) {
        C.close(e), r.activeId = "";
        const s = r.activeTools.indexOf(e);
        s >= 0 && r.activeTools.splice(s, 1), this.render();
        return;
      }
      if (g[e]?.close) {
        g[e].close();
        const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
        s && (s.style.display = "none"), r.activeId = "";
        const c = r.activeTools.indexOf(e);
        c >= 0 && r.activeTools.splice(c, 1), this.render();
        return;
      }
      const o = a.get(e);
      if (typeof o?.onMinimize == "function")
        this.minimize(e);
      else if (typeof o?.onClose == "function")
        this.close(e);
      else {
        const s = p(o, e);
        s && (s.tagName === "DIALOG" ? s.close() : s.hidden = !0), u.freeze(e), r.activeId = "", this.render();
      }
      return;
    }
    if (t) {
      this.bringToFront(e);
      return;
    }
    if (g[e]?.open) {
      const o = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      o && (o.hidden = !1, o.style.display = ""), g[e].open(), r.openOrder.includes(e) || r.openOrder.push(e), r.activeTools.includes(e) || r.activeTools.push(e), r.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    if (E(e)) {
      this.open(e);
      return;
    }
    if (a.has(e) && typeof a.get(e)?.onActivate == "function") {
      this.activate(e);
      return;
    }
    if (typeof document < "u") {
      const s = P.find((l) => l.id === e)?.openId || `${e}-top-open`, c = document.getElementById(s);
      if (c) {
        c.click(), setTimeout(() => {
          r.openOrder.includes(e) || r.openOrder.push(e), r.activeId = e, this.render();
        }, 50);
        return;
      }
    }
    a.has(e) && this.activate(e);
  },
  toggle(e) {
    this.handleToolClick(e);
  },
  minimize(e) {
    const t = v(e);
    if (t?.presentation === "card") {
      k(e), t.lifecycle.hide();
      return;
    }
    if (t && (k(e), t.lifecycle.hide()), g[e]?.minimize) {
      g[e].minimize();
      const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      s && (s.style.display = "none");
    }
    E(e) && C.close(e);
    const n = a.get(e);
    t || n?.onMinimize?.();
    const o = p(n, e);
    if (o && (o.classList.remove("workspace-focused"), o.tagName === "DIALOG" ? o.open && o.close() : o.hidden = !0), u.freeze(e), r.activeId === e) {
      const s = r.openOrder.filter((c) => c !== e && d(c));
      if (r.activeId = s.length ? s[s.length - 1] : "", r.activeId) {
        const c = p(a.get(r.activeId), r.activeId);
        c && (c.style.zIndex = String(++r.highestZ), c.classList.add("workspace-focused"), u.thaw(r.activeId));
      }
    }
    this.render();
  },
  async close(e) {
    const t = v(e);
    if (t?.presentation === "card") {
      k(e), t.lifecycle.hide();
      return;
    }
    if (t && (k(e), t.lifecycle.hide()), g[e]?.close) {
      g[e].close();
      const f = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      f && (f.style.display = "none");
    }
    E(e) && C.close(e);
    const n = r.openOrder.indexOf(e), o = a.get(e);
    let s = !0;
    try {
      !t && o?.onClose && (s = await o.onClose());
    } catch (f) {
      console.warn(`[WindowManager] Could not close ${e}`, f), s = !1;
    }
    if (s === !1) return;
    u.cancelFreeze(e), u.thaw(e);
    const c = r.activeId === e, l = p(o, e);
    if (l?.classList.remove("workspace-focused"), l && (l.tagName === "DIALOG" ? l.open && l.close() : l.hidden = !0), n >= 0 && r.openOrder.splice(n, 1), c) {
      r.activeId = "";
      const f = r.openOrder.filter((b) => d(b));
      f.length ? this.bringToFront(f[f.length - 1]) : this.render();
    } else
      this.render();
  },
  update(e, t = {}) {
    const n = a.get(e);
    n && (typeof t.title == "string" && t.title.trim() && (n.title = t.title.trim()), typeof t.icon == "string" && (n.icon = t.icon), this.render());
  },
  isOpen(e) {
    return d(e) || r.openOrder.includes(e);
  },
  isActive(e) {
    return r.activeId === e && d(e);
  },
  getActiveId() {
    return r.activeId;
  },
  getOpenOrder() {
    return [...r.openOrder];
  },
  onStateChange(e) {
    return B.add(e), e([...r.activeTools], r.activeId), () => {
      B.delete(e);
    };
  },
  freezer: u
};
typeof document < "u" && typeof window < "u" && (document.addEventListener("pointerdown", (e) => {
  const t = e.target;
  if (!(!t || t.closest("#workspace-tabs") || t.closest(".mac-dock-shelf")))
    for (const [n, o] of a.entries()) {
      const s = p(o, n);
      if (s && s.contains(t)) {
        d(n) && m.bringToFront(n);
        return;
      }
    }
}, !0), window.addEventListener("keydown", (e) => {
  const t = String(e.key || "").toLowerCase(), n = t === "escape", o = e.altKey && t === "w", s = (e.metaKey || e.ctrlKey) && t === "w";
  if (n) {
    if (m.popModalCloser()) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    const c = document.querySelectorAll(
      ".bili-profile-menu:not([hidden]), .bookmark-note-menu:not([hidden]), .todoist-label-popover:not([hidden])"
    );
    if (c.length > 0) {
      c[c.length - 1].hidden = !0, e.preventDefault(), e.stopPropagation();
      return;
    }
    if (r.activeId && d(r.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const l = r.activeId;
      typeof a.get(l)?.onMinimize == "function" ? m.minimize(l) : m.close(l);
      return;
    }
    return;
  }
  if (!(!o && !s)) {
    if (r.activeId && d(r.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const c = r.activeId;
      typeof a.get(c)?.onMinimize == "function" ? m.minimize(c) : m.close(c);
      return;
    }
    for (let c = r.openOrder.length - 1; c >= 0; c--) {
      const l = r.openOrder[c];
      if (d(l)) {
        e.preventDefault(), e.stopPropagation(), typeof a.get(l)?.onMinimize == "function" ? m.minimize(l) : m.close(l);
        return;
      }
    }
  }
}, !0));
const le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_WORKSPACE_TOOLS: P,
  LogicWeaverDomFreezer: u,
  isWindowVisible: d,
  registerWindowActions: J,
  windowManagerController: m,
  windowManagerState: O
}, Symbol.toStringTag, { value: "Module" })), fe = "logicweaver-sticker-files-v1", ee = "stickerRootFolderName", te = "stickerFolderPath", ne = "stickerActiveFolderRelPath", re = "stickerExpandedFolderPaths", oe = "stickerRootHandleRevision", ue = [ee, te, ne, re, oe], q = L({ visible: !1, pendingWrites: 0 }), K = /* @__PURE__ */ new Set();
function de(e) {
  return K.add(e), () => {
    K.delete(e);
  };
}
function pe() {
  for (const e of K) e();
}
async function me(e) {
  q.pendingWrites++;
  try {
    return await e();
  } finally {
    q.pendingWrites--;
  }
}
class he {
  constructor() {
    this.sequence = 0;
  }
  get pending() {
    return !!this.active;
  }
  cancel() {
    this.active?.stop("cancelled");
  }
  begin(t = {}) {
    const { timeoutMs: n, signal: o, isCurrent: s, onStop: c } = t;
    if (n !== void 0 && (!Number.isInteger(n) || n < 1 || n > 3e5))
      throw new RangeError("Read timeout must be between 1 and 300000 milliseconds");
    const l = ++this.sequence, f = new AbortController();
    let b = !1, W;
    const F = () => !b && this.active === w, _ = () => F() && !f.signal.aborted && (s?.() ?? !0), $ = () => {
      w.stop("parent");
    }, N = (I) => {
      if (b) return !1;
      const x = F();
      b = !0, x && (this.active = void 0), clearTimeout(W), o?.removeEventListener("abort", $), f.abort(new DOMException(I === "timeout" ? "Read session timed out" : "Read session ended", I === "timeout" ? "TimeoutError" : "AbortError"));
      const y = x && this.sequence === l && !this.active;
      if (I && y)
        try {
          c?.(I);
        } catch {
        }
      return y;
    }, Z = (I) => _() ? new Promise((x, y) => {
      const V = () => {
        M(), y(f.signal.reason);
      }, M = () => f.signal.removeEventListener("abort", V);
      f.signal.addEventListener("abort", V, { once: !0 });
      try {
        Promise.resolve(I()).then((z) => {
          M();
          try {
            _() ? x(z) : y(f.signal.reason || new DOMException("Read session is no longer current", "AbortError"));
          } catch (U) {
            y(U);
          }
        }, (z) => {
          M(), y(z);
        });
      } catch (z) {
        M(), y(z);
      }
    }) : Promise.reject(f.signal.reason || new DOMException("Read session is no longer current", "AbortError")), w = { signal: f.signal, owns: F, current: _, wait: Z, finish: () => N(), stop: N }, H = this.active;
    return this.active = w, H?.stop("replaced"), F() && (o?.aborted ? w.stop("parent") : (o?.addEventListener("abort", $, { once: !0 }), n !== void 0 && (W = setTimeout(() => w.stop("timeout"), n)))), w;
  }
}
export {
  u as L,
  he as R,
  fe as S,
  O as a,
  ie as b,
  i as c,
  X as d,
  C as e,
  T as f,
  v as g,
  d as h,
  E as i,
  me as j,
  oe as k,
  ae as l,
  te as m,
  ee as n,
  de as o,
  pe as p,
  ne as q,
  re as r,
  q as s,
  k as t,
  ue as u,
  ce as v,
  m as w,
  G as x,
  le as y
};
