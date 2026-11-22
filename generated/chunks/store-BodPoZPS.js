import { s as S, f as $ } from "./github.service-CyBcxOSX.js";
import { r as I, a as L } from "./vendor-vue-_upDT3S_.js";
const i = I([]), r = /* @__PURE__ */ new Map(), b = {
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function l(e) {
  const t = i.find((n) => n.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const n = i.findIndex((c) => c.id === e);
    n >= 0 && i.splice(n, 1);
  }, 260));
}
function x() {
  for (const e of i) l(e.id);
}
function p(e) {
  if (!e) return null;
  const t = e.appType || "fetch", n = b[t] || b.fetch, c = String(e.title || "新消息通知"), s = String(e.subtitle || ""), f = String(e.message || ""), w = S(e.target) || (t === "bili" ? $(`${c} ${s} ${f}`) : void 0), d = Math.max(500, Number(e.duration) || 7e3), a = String(e.id || `${t}_${c}_${s}_${f}`).trim(), g = Date.now();
  for (const [o, T] of r)
    g - T > 3e4 && r.delete(o);
  const v = e.id ? 200 : d <= 4e3 ? 1200 : 3e3, m = r.get(a);
  if (m && g - m < v || i.some((o) => o.fingerprint === a && !o.closing)) return null;
  r.set(a, g);
  const u = `toast_${crypto.randomUUID()}`, y = {
    id: u,
    fingerprint: a,
    appType: t,
    appName: String(e.appName || n.name),
    icon: String(e.icon || n.icon),
    title: c,
    subtitle: s,
    message: f,
    actionLabel: e.actionLabel === void 0 ? n.action : String(e.actionLabel || ""),
    showActions: e.showActions !== !1,
    duration: d,
    onClick: typeof e.onClick == "function" ? e.onClick : null,
    closing: !1,
    historyId: e.historyId,
    target: w
  };
  i.push(y);
  const h = i.filter((o) => !o.closing);
  return h.length > 5 && l(h[0].id), Object.freeze({ id: u, close: () => l(u) });
}
function A(e, t, n = "", c = "assets/logo.png", s = 3200) {
  return p({ appType: "fetch", appName: e, title: t, subtitle: n, icon: c, duration: s, showActions: !1, actionLabel: "" });
}
const C = L(i), z = Object.freeze({
  show: p,
  fetch: A,
  close: l,
  clear: x,
  get size() {
    return i.filter((e) => !e.closing).length;
  }
});
export {
  C as a,
  z as n
};
