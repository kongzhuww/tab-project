import { r as l } from "./vendor-vue-DokqDua_.js";
const i = l({ visible: !1, active: !1, pendingWrites: 0, session: 0 }), r = /* @__PURE__ */ new Set();
function T(t) {
  return r.add(t), () => {
    r.delete(t);
  };
}
function h() {
  i.active = !1;
  for (const t of r) t();
}
async function w(t) {
  i.pendingWrites++;
  try {
    return await t();
  } finally {
    i.pendingWrites--;
  }
}
function m(t, p, c = !1) {
  const u = new Set(p), s = /* @__PURE__ */ new Map();
  return new Proxy(t, {
    get(d, e, o) {
      const n = Reflect.get(d, e, o);
      return typeof e != "string" || typeof n != "function" || !u.has(e) && !(c && e === "api") ? n : (s.has(e) || s.set(e, (...a) => {
        const f = String(a[1]?.method || "GET").toUpperCase();
        return e === "api" && (f === "GET" || f === "HEAD") ? Reflect.apply(n, o, a) : w(() => Reflect.apply(n, o, a));
      }), s.get(e));
    }
  });
}
export {
  m as a,
  T as o,
  h as p,
  i as t,
  w
};
