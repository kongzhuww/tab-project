import { r as u } from "./vendor-vue-BkY5-p5y.js";
const a = u({ visible: !1, active: !1, pendingWrites: 0, session: 0, dataRevision: 0 }), r = /* @__PURE__ */ new Set();
function g(t) {
  return r.add(t), () => {
    r.delete(t);
  };
}
function h() {
  a.active = !1;
  for (const t of r) t();
}
async function m(t) {
  a.pendingWrites++;
  try {
    return await t();
  } finally {
    a.pendingWrites--;
  }
}
function T(t, p, d = !1) {
  const l = new Set(p), s = /* @__PURE__ */ new Map();
  return new Proxy(t, {
    get(c, e, i) {
      const n = Reflect.get(c, e, i);
      return typeof e != "string" || typeof n != "function" || !l.has(e) && !(d && e === "api") ? n : (s.has(e) || s.set(e, (...o) => {
        const f = String(o[1]?.method || "GET").toUpperCase();
        return e === "api" && (f === "GET" || f === "HEAD") ? Reflect.apply(n, i, o) : m(() => Reflect.apply(n, i, o));
      }), s.get(e));
    }
  });
}
function R(t) {
  return t === "lonetrail" ? "lonetrail" : t === "dark" || t === "endfield" ? "dark" : "light";
}
export {
  T as a,
  R as n,
  g as o,
  h as p,
  a as t,
  m as w
};
