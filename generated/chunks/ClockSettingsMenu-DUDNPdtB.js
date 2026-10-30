import { e as o, C as O, f as S, h as w } from "./main-DeN3Wngs.js";
import { d as L, D as E, z as g, u as s, o as c, f as a, g as t, F as r, i as m, B as k, C as p, t as u, h as x, b as z } from "./vendor-vue-wIH4jcna.js";
const F = { class: "clock-menu-font-list" }, M = ["data-font", "onClick"], B = { class: "clock-menu-font-preview" }, D = { class: "clock-menu-color-row" }, K = ["data-color", "title", "onClick"], N = { class: "clock-menu-tz-list" }, T = ["data-tz", "onClick"], R = { class: "clock-menu-tz-offset" }, P = /* @__PURE__ */ L({
  __name: "ClockSettingsMenu",
  setup($) {
    const l = o.state, d = z(null);
    function y() {
      o.close();
    }
    function _(n) {
      o.setFont(n);
    }
    function b(n) {
      o.setColor(n);
    }
    function h(n) {
      o.setTimezone(n);
    }
    function f(n) {
      l.isOpen && d.value && !d.value.contains(n.target) && o.close();
    }
    function C(n) {
      n.key === "Escape" && l.isOpen && o.close();
    }
    return E(() => {
      o.setMounted(!0), document.addEventListener("pointerdown", f, !0), document.addEventListener("keydown", C, !0);
    }), g(() => {
      o.setMounted(!1), document.removeEventListener("pointerdown", f, !0), document.removeEventListener("keydown", C, !0);
    }), (n, i) => s(l).isOpen ? (c(), a("div", {
      key: 0,
      ref_key: "menuRef",
      ref: d,
      class: "clock-context-menu",
      style: k({ left: s(l).x + "px", top: s(l).y + "px" })
    }, [
      t("div", { class: "clock-menu-head" }, [
        i[0] || (i[0] = t("span", { class: "clock-menu-title" }, "🕒 时钟个性化设置", -1)),
        t("button", {
          class: "clock-menu-close",
          type: "button",
          title: "关闭",
          onClick: y
        }, "✕")
      ]),
      i[1] || (i[1] = t("div", { class: "clock-menu-section-title" }, "🔤 字体样式", -1)),
      t("div", F, [
        (c(!0), a(r, null, m(s(O), (e) => (c(), a("button", {
          key: e.id,
          type: "button",
          class: p(["clock-menu-font-btn", { active: s(l).font === e.id }]),
          "data-font": e.id,
          style: k({ fontFamily: e.font }),
          onClick: (v) => _(e.id)
        }, [
          t("span", null, u(e.label), 1),
          t("span", B, u(e.sample), 1)
        ], 14, M))), 128))
      ]),
      i[2] || (i[2] = t("div", { class: "clock-menu-section-title" }, "🎨 时钟颜色", -1)),
      t("div", D, [
        (c(!0), a(r, null, m(s(S), (e) => (c(), a("button", {
          key: e.id,
          type: "button",
          class: p(["clock-menu-color-chip", { active: s(l).color === e.id }]),
          "data-color": e.id,
          title: e.label,
          style: k({ background: e.hex, borderColor: e.id === "white" ? "#cbd5e1" : void 0 }),
          onClick: (v) => b(e.id)
        }, null, 14, K))), 128))
      ]),
      i[3] || (i[3] = t("div", { class: "clock-menu-section-title" }, "🌐 显示时区", -1)),
      t("div", N, [
        (c(!0), a(r, null, m(s(w), (e) => (c(), a("button", {
          key: e.id,
          type: "button",
          class: p(["clock-menu-tz-btn", { active: s(l).timezone === e.id }]),
          "data-tz": e.id,
          onClick: (v) => h(e.id)
        }, [
          t("span", null, u(e.label), 1),
          t("span", R, u(e.offset), 1)
        ], 10, T))), 128))
      ])
    ], 4)) : x("", !0);
  }
});
export {
  P as default
};
