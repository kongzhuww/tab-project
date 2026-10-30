import "./fullscreen-cards.store-BxeT5W2V.js";
import { r as v } from "./view-styles-CDVJ_n-J.js";
import { C as l, L as m, b as i, s as f } from "./vendor-vue-DokqDua_.js";
function g(u, r) {
  const o = typeof location < "u" && location.pathname.endsWith(r), n = i(!1), a = i(typeof document < "u" && !document.hidden), t = i(!0), c = f(() => n.value && t.value && a.value && (o || v.activeId === u));
  function e() {
    a.value = !document.hidden;
  }
  function d() {
    t.value = !1;
  }
  function s() {
    t.value = !0, e();
  }
  return l(() => {
    document.addEventListener("visibilitychange", e), window.addEventListener("pagehide", d), window.addEventListener("pageshow", s), e(), n.value = !0;
  }), m(() => {
    n.value = !1, document.removeEventListener("visibilitychange", e), window.removeEventListener("pagehide", d), window.removeEventListener("pageshow", s);
  }), { active: c, standalone: o };
}
export {
  g as u
};
