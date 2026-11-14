import { d as C, B as K, K as E, o as i, e as u, k as g, h, i as k, F as S, g as D, A as L, m as N, t as p, f, b as m, D as w } from "./vendor-vue-BkY5-p5y.js";
import { _ as F } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const T = ["disabled", "aria-expanded", "onKeydown"], V = ["aria-checked", "onClick"], $ = { class: "option-label" }, q = { key: 0 }, G = { key: 0 }, H = /* @__PURE__ */ C({
  __name: "BoardSelector",
  props: {
    options: {},
    selected: {},
    disabled: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: r }) {
    const t = e, c = r, l = m(!1), a = m(null), y = m(null);
    function d(o = !1) {
      l.value = !1, o && w(() => y.value?.focus());
    }
    function B(o) {
      d(!0), c("select", o);
    }
    function v(o) {
      a.value && !a.value.contains(o.target) && d();
    }
    function _(o) {
      a.value && !a.value.contains(o.relatedTarget) && d();
    }
    function x() {
      l.value = !0, w(() => a.value?.querySelector('[role="menuitemradio"]')?.focus());
    }
    function A(o) {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(o.key)) return;
      o.preventDefault();
      const s = Array.from(a.value?.querySelectorAll('[role="menuitemradio"]') || []);
      if (!s.length) return;
      const n = s.indexOf(document.activeElement);
      s[o.key === "Home" ? 0 : o.key === "End" ? s.length - 1 : o.key === "ArrowDown" ? (n + 1) % s.length : n <= 0 ? s.length - 1 : n - 1]?.focus();
    }
    return K(() => document.addEventListener("pointerdown", v)), E(() => document.removeEventListener("pointerdown", v)), (o, s) => (i(), u("div", {
      ref_key: "root",
      ref: a,
      class: "board-selector",
      onFocusout: _,
      onKeydown: s[1] || (s[1] = g(h((n) => d(!0), ["stop", "prevent"]), ["esc"]))
    }, [
      k("button", {
        ref_key: "trigger",
        ref: y,
        type: "button",
        class: "board-trigger",
        disabled: e.disabled || !t.options.length,
        "aria-expanded": l.value,
        "aria-haspopup": "menu",
        onClick: s[0] || (s[0] = (n) => l.value = !l.value),
        onKeydown: g(h(x, ["prevent"]), ["down"])
      }, "⚙ 切换板块", 40, T),
      l.value ? (i(), u("div", {
        key: 0,
        role: "menu",
        "aria-label": "选择板块",
        class: "board-menu",
        onKeydown: A
      }, [
        (i(!0), u(S, null, D(e.options, (n) => (i(), u("button", {
          key: n.id,
          type: "button",
          role: "menuitemradio",
          "aria-checked": n.id === e.selected,
          class: L({ chosen: n.id === e.selected }),
          onClick: (I) => B(n.id)
        }, [
          k("span", $, [
            N(p(n.label), 1),
            n.group ? (i(), u("small", q, p(n.group), 1)) : f("", !0)
          ]),
          n.id === e.selected ? (i(), u("span", G, "✓")) : f("", !0)
        ], 10, V))), 128))
      ], 32)) : f("", !0)
    ], 544));
  }
}), z = /* @__PURE__ */ F(H, [["__scopeId", "data-v-e92a5007"]]);
function O(e, r) {
  return e.filter((t) => !(typeof t.checked == "boolean" ? t.checked : t.is_completed === !0) && (r === null || String(t.section_id || "") === r));
}
function b(e, r) {
  const t = r[e.fullName] || r[e.fullName.toLowerCase()] || r[e.name] || r[e.name.toLowerCase()] || e.localGroups || [];
  return Array.isArray(t) ? t : [];
}
function W(e, r, t) {
  return e.filter((c) => t === "all" || (t === "ungrouped" ? !b(c, r).length : t.startsWith("group:") && b(c, r).includes(t.slice(6))));
}
export {
  z as B,
  W as r,
  O as t
};
