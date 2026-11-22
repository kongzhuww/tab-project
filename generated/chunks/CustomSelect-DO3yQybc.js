import { d as P, w as z, G as q, o as G, e as A, f as u, g as c, q as V, h as m, t as p, j as b, F as L, i as $, b as x, s as S, x as J } from "./vendor-vue-_upDT3S_.js";
import { _ as U } from "./_plugin-vue_export-helper-DtNgUcga.js";
function ce(l, a) {
  if (document.getElementById(l)) return;
  const t = document.createElement("style");
  t.id = l, t.textContent = a, document.head.appendChild(t);
}
function K(l) {
  const a = { group: "", positions: /* @__PURE__ */ Object.create(null) };
  try {
    const t = JSON.parse(l || "null");
    if (!t || typeof t != "object") return a;
    typeof t.group == "string" && (a.group = t.group);
    for (const [g, i] of Object.entries(t.positions || {})) {
      const r = i;
      !r || !Number.isFinite(r.top) || r.top < 0 || (a.positions[g] = {
        top: r.top,
        ...typeof r.anchor == "string" ? { anchor: r.anchor } : {},
        ...Number.isFinite(r.offset) ? { offset: r.offset } : {}
      });
    }
  } catch {
  }
  return a;
}
function H(l) {
  const a = /* @__PURE__ */ new Map();
  for (const t of l)
    t.group && a.set(t.group, (a.get(t.group) || 0) + 1);
  return [...a].map(([t, g]) => ({ name: t, count: g }));
}
function Q(l, a) {
  return Math.max(0, a !== void 0 && l.offset !== void 0 ? a - l.offset : l.top);
}
const W = ["disabled", "aria-expanded"], X = {
  key: 0,
  class: "lw-select-icon"
}, Y = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, Z = ["aria-pressed"], ee = ["aria-pressed", "onClick"], te = {
  key: 0,
  class: "lw-select-empty"
}, ne = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], le = { class: "lw-item-content" }, oe = {
  key: 0,
  class: "lw-item-icon"
}, ae = { class: "lw-item-text" }, se = {
  key: 0,
  class: "lw-item-check"
}, ie = /* @__PURE__ */ P({
  __name: "CustomSelect",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "请选择…" },
    disabled: { type: Boolean, default: !1 },
    size: { default: "md" },
    grouped: { type: Boolean },
    memoryKey: {}
  },
  emits: ["update:modelValue", "change"],
  setup(l, { emit: a }) {
    const t = l, g = a, i = x(!1), r = x(null), B = x(null), o = x("");
    let d = K(null), O = !1;
    function M() {
      try {
        d = K(t.memoryKey ? localStorage.getItem(t.memoryKey) : null);
      } catch {
        d = K(null);
      }
      o.value = d.group;
    }
    M();
    function y(e = t.memoryKey) {
      const s = B.value;
      if (!s || !O) return;
      const n = [...s.querySelectorAll("[data-select-value]")], f = s.getBoundingClientRect().top, h = n.find((E) => E.getBoundingClientRect().bottom > f);
      if (d.group = o.value, d.positions[o.value] = {
        top: s.scrollTop,
        anchor: h?.dataset.selectValue,
        offset: h ? h.getBoundingClientRect().top - f : void 0
      }, e)
        try {
          localStorage.setItem(e, JSON.stringify(d));
        } catch {
        }
    }
    async function k() {
      O = !1, await J();
      const e = B.value;
      if (!i.value || !e) return;
      const s = [...e.querySelectorAll("[data-select-value]")], n = d.positions[o.value], f = s.find((E) => E.dataset.selectValue === (n?.anchor ?? String(t.modelValue))), h = f ? f.getBoundingClientRect().top - e.getBoundingClientRect().top + e.scrollTop : void 0;
      e.scrollTop = n ? Q(n, h) : Math.max(0, (h ?? 0) - e.clientHeight / 2), O = R.value.length > 0;
    }
    function C() {
      y(), i.value = !1;
    }
    async function N(e) {
      e !== o.value && (y(), o.value = e, await k(), y());
    }
    const v = S(() => t.options.map((e) => typeof e == "object" && e !== null ? e : { value: e, label: String(e) })), w = S(() => t.grouped ? H(v.value) : []), R = S(() => o.value && t.grouped ? v.value.filter((e) => e.group === o.value) : v.value);
    z(() => t.memoryKey, (e, s) => {
      y(s), M(), i.value && k();
    }), z(v, () => {
      o.value && w.value.length && !w.value.some((e) => e.name === o.value) && (o.value = ""), i.value && k();
    }, { flush: "post" }), q(() => y());
    const _ = S(() => v.value.find((e) => String(e.value) === String(t.modelValue))), D = S(() => _.value?.label ?? t.placeholder);
    function F() {
      if (!t.disabled) {
        if (i.value) {
          C();
          return;
        }
        v.value.length && o.value && !w.value.some((e) => e.name === o.value) && (o.value = ""), i.value = !0, k();
      }
    }
    function I(e) {
      e.disabled || t.disabled || (C(), String(e.value) !== String(t.modelValue) && (g("update:modelValue", e.value), g("change", e.value)));
    }
    function T(e) {
      !i.value || !r.value || r.value.contains(e.target) || C();
    }
    function j(e) {
      i.value && e.key === "Escape" && C();
    }
    return G(() => {
      document.addEventListener("pointerdown", T, !0), window.addEventListener("keydown", j);
    }), A(() => {
      document.removeEventListener("pointerdown", T, !0), window.removeEventListener("keydown", j);
    }), (e, s) => (u(), c("div", {
      ref_key: "containerRef",
      ref: r,
      class: V(["lw-custom-select", [`size-${l.size}`, { "is-open": i.value, "is-disabled": l.disabled }]])
    }, [
      m("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: l.disabled,
        "aria-expanded": i.value,
        onClick: F
      }, [
        _.value?.icon ? (u(), c("span", X, p(_.value.icon), 1)) : b("", !0),
        m("span", {
          class: V(["lw-select-label", { "is-placeholder": !_.value }])
        }, p(D.value), 3),
        s[2] || (s[2] = m("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, W),
      i.value ? (u(), c("div", {
        key: 0,
        class: V(["lw-select-dropdown", { "is-grouped": l.grouped }])
      }, [
        w.value.length ? (u(), c("div", Y, [
          m("button", {
            type: "button",
            "aria-pressed": !o.value,
            onClick: s[0] || (s[0] = (n) => N(""))
          }, "全部 · " + p(v.value.length), 9, Z),
          (u(!0), c(L, null, $(w.value, (n) => (u(), c("button", {
            key: n.name,
            type: "button",
            "aria-pressed": o.value === n.name,
            onClick: (f) => N(n.name)
          }, p(n.name) + " · " + p(n.count), 9, ee))), 128))
        ])) : b("", !0),
        m("div", {
          ref_key: "listRef",
          ref: B,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: s[1] || (s[1] = (n) => y())
        }, [
          R.value.length ? b("", !0) : (u(), c("div", te, " 暂无可用选项 ")),
          (u(!0), c(L, null, $(R.value, (n) => (u(), c("button", {
            key: String(n.value),
            type: "button",
            class: V(["lw-select-item", {
              "is-active": String(n.value) === String(l.modelValue),
              "is-disabled": n.disabled
            }]),
            disabled: n.disabled,
            "data-select-value": String(n.value),
            title: n.label,
            role: "option",
            "aria-selected": String(n.value) === String(l.modelValue),
            onClick: (f) => I(n)
          }, [
            m("span", le, [
              n.icon ? (u(), c("span", oe, p(n.icon), 1)) : b("", !0),
              m("span", ae, p(n.label), 1)
            ]),
            String(n.value) === String(l.modelValue) ? (u(), c("span", se, "✓")) : b("", !0)
          ], 10, ne))), 128))
        ], 544)
      ], 2)) : b("", !0)
    ], 2));
  }
}), de = /* @__PURE__ */ U(ie, [["__scopeId", "data-v-24f4c9d8"]]);
export {
  de as C,
  ce as e
};
