import { t as s } from "./module-state-BVJNDzfS.js";
import { t as d } from "./todoist.service-DeCQ21Vr.js";
import { r as u, E as b } from "./vendor-vue-BUkfvXUI.js";
import { w as m, b as p } from "./read-session-CysyqM5X.js";
const g = u({ labels: [] });
let r = {}, l = !1, n = 0, e;
function v() {
  n++, e?.abort(), e = void 0;
}
function c(t) {
  g.labels = t.map((o) => ({ ...o }));
}
async function w() {
  if (!s.active) return;
  v();
  const t = new AbortController();
  e = t;
  const o = n, f = s.session;
  try {
    const a = await d.getLabels(t.signal);
    !t.signal.aborted && o === n && f === s.session && s.active && Array.isArray(a) && c(a.map((i) => ({ id: i.id, name: i.name })));
  } catch {
    t.signal.aborted || console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally {
    e === t && (e = void 0);
  }
}
function T(t) {
  r = Object.freeze({ ...t });
}
function y(t) {
  l = t;
}
function A(t, o) {
  r.startDrag?.(t, o);
}
const D = Object.freeze({
  update: c,
  refresh: w,
  setActions: T,
  setMounted: y,
  startDrag: A,
  get active() {
    return l;
  }
}), h = b(null);
function j(t) {
  t && (m.open("todoist"), h.value = { id: t, transition: p("todoist") });
}
export {
  v as c,
  j as o,
  h as p,
  D as t
};
