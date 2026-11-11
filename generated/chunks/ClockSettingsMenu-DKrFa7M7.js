import { d as s, C as S, e as O, f as w } from "./main-Dp-RhT3M.js";
import { t as d } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { d as L, B as x, x as E, u as t, o as i, e as a, i as o, t as l, F as r, g as m, z as k, A as _, f as g, b as z } from "./vendor-vue-9b0eS4bW.js";
const F = { class: "clock-menu-head" }, M = { class: "clock-menu-title" }, T = ["title"], B = { class: "clock-menu-section-title" }, K = { class: "clock-menu-font-list" }, N = ["data-font", "onClick"], D = { class: "clock-menu-font-preview" }, R = { class: "clock-menu-section-title" }, $ = { class: "clock-menu-color-row" }, V = ["data-color", "title", "onClick"], A = { class: "clock-menu-section-title" }, I = { class: "clock-menu-tz-list" }, P = ["data-tz", "onClick"], U = { class: "clock-menu-tz-offset" }, J = /* @__PURE__ */ L({
  __name: "ClockSettingsMenu",
  setup(Z) {
    const c = s.state, u = z(null);
    function v() {
      s.close();
    }
    function h(n) {
      s.setFont(n);
    }
    function y(n) {
      s.setColor(n);
    }
    function b(n) {
      s.setTimezone(n);
    }
    function f(n) {
      c.isOpen && u.value && !u.value.contains(n.target) && s.close();
    }
    function p(n) {
      n.key === "Escape" && c.isOpen && s.close();
    }
    return x(() => {
      s.setMounted(!0), document.addEventListener("pointerdown", f, !0), document.addEventListener("keydown", p, !0);
    }), E(() => {
      s.setMounted(!1), document.removeEventListener("pointerdown", f, !0), document.removeEventListener("keydown", p, !0);
    }), (n, j) => t(c).isOpen ? (i(), a("div", {
      key: 0,
      ref_key: "menuRef",
      ref: u,
      class: "clock-context-menu",
      style: k({ left: t(c).x + "px", top: t(c).y + "px" })
    }, [
      o("div", F, [
        o("span", M, l(t(d)("clock.menuTitle")), 1),
        o("button", {
          class: "clock-menu-close",
          type: "button",
          title: t(d)("common.close"),
          onClick: v
        }, "✕", 8, T)
      ]),
      o("div", B, l(t(d)("clock.fontStyle")), 1),
      o("div", K, [
        (i(!0), a(r, null, m(t(S), (e) => (i(), a("button", {
          key: e.id,
          type: "button",
          class: _(["clock-menu-font-btn", { active: t(c).font === e.id }]),
          "data-font": e.id,
          style: k({ fontFamily: e.font }),
          onClick: (C) => h(e.id)
        }, [
          o("span", null, l(e.label), 1),
          o("span", D, l(e.sample), 1)
        ], 14, N))), 128))
      ]),
      o("div", R, l(t(d)("clock.clockColor")), 1),
      o("div", $, [
        (i(!0), a(r, null, m(t(O), (e) => (i(), a("button", {
          key: e.id,
          type: "button",
          class: _(["clock-menu-color-chip", { active: t(c).color === e.id }]),
          "data-color": e.id,
          title: e.label,
          style: k({ background: e.hex, borderColor: e.id === "white" ? "#cbd5e1" : void 0 }),
          onClick: (C) => y(e.id)
        }, null, 14, V))), 128))
      ]),
      o("div", A, l(t(d)("clock.timezone")), 1),
      o("div", I, [
        (i(!0), a(r, null, m(t(w), (e) => (i(), a("button", {
          key: e.id,
          type: "button",
          class: _(["clock-menu-tz-btn", { active: t(c).timezone === e.id }]),
          "data-tz": e.id,
          onClick: (C) => b(e.id)
        }, [
          o("span", null, l(e.label), 1),
          o("span", U, l(e.offset), 1)
        ], 10, P))), 128))
      ])
    ], 4)) : g("", !0);
  }
});
export {
  J as default
};
