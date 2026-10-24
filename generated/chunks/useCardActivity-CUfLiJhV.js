import "./fullscreen-cards.store-9LfnT9xe.js";
import { u as v } from "./search.service-BE0VV64-.js";
import { o as l, a as m, b as i, c as f } from "./vendor-vue-BUkfvXUI.js";
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
