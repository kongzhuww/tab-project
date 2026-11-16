import { r as a, w as s } from "./vendor-vue-C09jaOfK.js";
const n = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "multica"
], t = "lw_active_card";
function r() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(t), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (n.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(t);
      if (e && n.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const i = a({
  activeId: r()
});
typeof window < "u" && s(
  () => i.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(t, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(t), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let o;
function d(e) {
  o = e;
}
function l(e) {
  if (!o) throw new Error("Fullscreen card host not ready");
  o.enter(e);
}
function u(e) {
  i.activeId === e && o?.exit();
}
function f(e) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!e), document.body.dataset.page = e ? "daily" : "home"));
}
export {
  t as A,
  d as b,
  i as f,
  u as h,
  l as o,
  f as s
};
