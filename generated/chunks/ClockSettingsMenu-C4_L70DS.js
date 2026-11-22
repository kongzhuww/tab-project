import { c as s, C as S, b as O, d as w } from "./main-Bo0A62Do.js";
import { t as d } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { d as L, o as E, e as g, u as t, f as i, g as a, h as o, t as l, F as r, i as m, n as k, q as _, j as x, b as z } from "./vendor-vue-C-_ocEUS.js";
const F = { class: "clock-menu-head" }, M = { class: "clock-menu-title" }, T = ["title"], K = { class: "clock-menu-section-title" }, N = { class: "clock-menu-font-list" }, B = ["data-font", "onClick"], D = { class: "clock-menu-font-preview" }, R = { class: "clock-menu-section-title" }, $ = { class: "clock-menu-color-row" }, V = ["data-color", "title", "onClick"], j = { class: "clock-menu-section-title" }, q = { class: "clock-menu-tz-list" }, I = ["data-tz", "onClick"], P = { class: "clock-menu-tz-offset" }, J = /* @__PURE__ */ L({
  __name: "ClockSettingsMenu",
  setup(U) {
    const c = s.state, u = z(null);
    function h() {
      s.close();
    }
    function v(n) {
      s.setFont(n);
    }
    function y(n) {
      s.setColor(n);
    }
    function b(n) {
      s.setTimezone(n);
    }
    function p(n) {
      c.isOpen && u.value && !u.value.contains(n.target) && s.close();
    }
    function f(n) {
      n.key === "Escape" && c.isOpen && s.close();
    }
    return E(() => {
      s.setMounted(!0), document.addEventListener("pointerdown", p, !0), document.addEventListener("keydown", f, !0);
    }), g(() => {
      s.setMounted(!1), document.removeEventListener("pointerdown", p, !0), document.removeEventListener("keydown", f, !0);
    }), (n, Z) => t(c).isOpen ? (i(), a("div", {
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
          onClick: h
        }, "✕", 8, T)
      ]),
      o("div", K, l(t(d)("clock.fontStyle")), 1),
      o("div", N, [
        (i(!0), a(r, null, m(t(S), (e) => (i(), a("button", {
          key: e.id,
          type: "button",
          class: _(["clock-menu-font-btn", { active: t(c).font === e.id }]),
          "data-font": e.id,
          style: k({ fontFamily: e.font }),
          onClick: (C) => v(e.id)
        }, [
          o("span", null, l(e.label), 1),
          o("span", D, l(e.sample), 1)
        ], 14, B))), 128))
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
      o("div", j, l(t(d)("clock.timezone")), 1),
      o("div", q, [
        (i(!0), a(r, null, m(t(w), (e) => (i(), a("button", {
          key: e.id,
          type: "button",
          class: _(["clock-menu-tz-btn", { active: t(c).timezone === e.id }]),
          "data-tz": e.id,
          onClick: (C) => b(e.id)
        }, [
          o("span", null, l(e.label), 1),
          o("span", P, l(e.offset), 1)
        ], 10, I))), 128))
      ])
    ], 4)) : x("", !0);
  }
});
export {
  J as default
};
