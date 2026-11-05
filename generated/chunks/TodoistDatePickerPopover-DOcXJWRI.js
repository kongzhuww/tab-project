import { d as X, w as A, D as re, G as Z, z as ue, o as u, g as c, B as de, I as ce, b as f, V as me, e as pe, M as ve, f as fe, h as n, t as h, i as M, F as j, j as G, C as ye, u as E, n as ge, q as we, k as Q, y as J } from "./vendor-vue-D8gPZiit.js";
import { t as he } from "./module-state-CYd8scC_.js";
import { _ as ee } from "./_plugin-vue_export-helper-aCvtv1YP.js";
const be = /* @__PURE__ */ X({
  __name: "InspectorPopover",
  props: {
    anchor: {}
  },
  emits: ["close"],
  setup(m, { emit: N }) {
    const s = m, o = N, b = f(null);
    A(() => he.active, (p) => {
      p || (b.value?.hidePopover(), o("close"));
    });
    const y = f({ visibility: "hidden" });
    function i() {
      const p = b.value, T = s.anchor;
      if (!p || !T?.isConnected) {
        o("close");
        return;
      }
      const k = T.getBoundingClientRect(), S = Math.min(280, window.innerWidth - 24), D = Math.min(p.scrollHeight + 2, window.innerHeight - 24), V = k.right + S + 8 <= window.innerWidth - 12 ? k.right + 8 : Math.max(12, k.left - S - 8);
      y.value = { position: "fixed", margin: "0", inset: "auto", left: `${V}px`, top: `${Math.max(12, Math.min(k.top, window.innerHeight - D - 12))}px`, width: `${S}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: "visible" };
    }
    function _(p) {
      p.newState === "closed" && o("close");
    }
    return re(async () => {
      await Z(), b.value?.showPopover(), i(), window.addEventListener("resize", i), window.addEventListener("scroll", i, !0);
    }), ue(() => {
      window.removeEventListener("resize", i), window.removeEventListener("scroll", i, !0);
    }), (p, T) => (u(), c("div", {
      ref_key: "panel",
      ref: b,
      popover: "auto",
      class: "inspector-popover",
      style: de(y.value),
      onToggle: _
    }, [
      ce(p.$slots, "default", {}, void 0, !0)
    ], 36));
  }
}), ke = /* @__PURE__ */ ee(be, [["__scopeId", "data-v-b798818e"]]), De = { class: "todoist-date-popover" }, Ve = {
  key: 0,
  class: "quick-dates-list"
}, Me = { class: "q-day" }, Te = { class: "q-day" }, Se = { class: "q-day" }, $e = {
  key: 1,
  class: "popover-divider"
}, Ce = { class: "mini-calendar-section" }, xe = { class: "cal-nav-row" }, qe = { class: "cal-month-title" }, Pe = { class: "cal-days-grid" }, Ie = ["onClick"], Ee = { class: "cal-footer-section" }, Ne = { class: "time-picker-row" }, _e = ["for"], Be = { class: "time-input-wrap" }, Le = ["id", "aria-expanded", "aria-activedescendant", "aria-invalid", "aria-describedby"], Fe = ["id", "aria-selected", "onClick"], He = {
  key: 0,
  class: "time-input-hint"
}, Oe = ["id"], Ae = /* @__PURE__ */ X({
  __name: "TodoistDatePickerPopover",
  props: {
    modelValue: {},
    timeValue: {},
    anchorEl: {},
    embedded: { type: Boolean }
  },
  emits: ["update:modelValue", "update:timeValue", "change", "timeValidity", "close"],
  setup(m, { emit: N }) {
    const s = m, o = N, b = s.modelValue ? /* @__PURE__ */ new Date(s.modelValue + "T00:00:00") : /* @__PURE__ */ new Date(), y = f(b.getFullYear()), i = f(b.getMonth());
    A(() => s.modelValue, (t) => {
      const e = /* @__PURE__ */ new Date(t + "T00:00:00");
      Number.isFinite(e.getTime()) && (y.value = e.getFullYear(), i.value = e.getMonth());
    });
    function _() {
      i.value === 0 ? (i.value = 11, y.value--) : i.value--;
    }
    function p() {
      i.value === 11 ? (i.value = 0, y.value++) : i.value++;
    }
    function T() {
      const t = /* @__PURE__ */ new Date();
      y.value = t.getFullYear(), i.value = t.getMonth();
    }
    function k(t) {
      const e = /* @__PURE__ */ new Date();
      return e.setDate(e.getDate() + t), ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][e.getDay()];
    }
    function S() {
      const t = /* @__PURE__ */ new Date(), a = (6 - t.getDay() + 7) % 7 || 7;
      return t.setDate(t.getDate() + a), `${t.getMonth() + 1}月${t.getDate()}日`;
    }
    function D(t) {
      const e = t.getFullYear(), a = String(t.getMonth() + 1).padStart(2, "0"), d = String(t.getDate()).padStart(2, "0");
      return `${e}-${a}-${d}`;
    }
    function V(t) {
      if (t === "clear") {
        o("update:modelValue", ""), o("update:timeValue", ""), o("change"), s.embedded || o("close");
        return;
      }
      const e = /* @__PURE__ */ new Date();
      if (t === "tomorrow")
        e.setDate(e.getDate() + 1);
      else if (t === "weekend") {
        const g = (6 - e.getDay() + 7) % 7 || 7;
        e.setDate(e.getDate() + g);
      }
      const a = D(e);
      o("update:modelValue", a), o("change"), s.embedded || o("close");
    }
    function te(t) {
      o("update:modelValue", t), o("change"), s.embedded || o("close");
    }
    const $ = me(), q = $ + "-options", r = f(x(s.timeValue || "")), v = f(""), l = f(!1), B = f(!1), w = f(-1), C = f(null), L = Array.from({ length: 96 }, (t, e) => {
      const a = `${String(Math.floor(e / 4)).padStart(2, "0")}:${String(e % 4 * 15).padStart(2, "0")}`;
      return { value: a, label: x(a) };
    }), P = J(() => {
      const t = r.value.trim().toUpperCase().replace(/\s/g, "");
      return !B.value || !t ? L : L.filter((e) => e.label.replace(/\s/g, "").startsWith(t) || e.value.startsWith(t));
    });
    A(() => s.timeValue, (t) => {
      r.value = x(t || ""), v.value = "";
    });
    function x(t) {
      if (!t) return "";
      const [e, a] = t.split(":").map(Number);
      return `${e % 12 || 12}:${String(a).padStart(2, "0")} ${e >= 12 ? "PM" : "AM"}`;
    }
    function W(t) {
      const e = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
      if (!e) return null;
      let a = Number(e[1]);
      const d = Number(e[2] || 0), g = e[3]?.toUpperCase();
      return d > 59 || (g ? a < 1 || a > 12 : a > 23) ? null : (g && (a = a % 12 + (g === "PM" ? 12 : 0)), `${String(a).padStart(2, "0")}:${String(d).padStart(2, "0")}`);
    }
    function z() {
      Z(() => {
        const t = C.value?.querySelector('[aria-selected="true"]'), e = C.value;
        t && e && (e.scrollTop = Math.max(0, t.offsetTop - e.clientHeight / 2 + t.offsetHeight / 2));
      });
    }
    function F() {
      l.value = !0, B.value = !1;
      const t = s.timeValue || `${String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0")}:00`;
      w.value = Math.max(0, L.findIndex((e) => e.value >= t)), z();
    }
    function ae() {
      l.value = !0, B.value = !0, w.value = -1, v.value = "", o("timeValidity", !r.value.trim() || W(r.value) !== null), C.value && (C.value.scrollTop = 0);
    }
    function H(t) {
      l.value = !1, v.value = "", o("timeValidity", !0), r.value = x(t), t !== (s.timeValue || "") && ie(t);
    }
    function U() {
      l.value = !1, v.value = "", r.value = "", o("timeValidity", !0), s.timeValue && (o("update:timeValue", ""), o("change"));
    }
    function Y() {
      if (!r.value.trim())
        return U(), !0;
      const t = W(r.value);
      return t === null ? (o("timeValidity", !1), v.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45", !1) : (H(t), !0);
    }
    function ne() {
      l.value = !1, Y();
    }
    function oe(t) {
      if (!t.isComposing) {
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault(), t.stopPropagation(), l.value || F();
          const e = P.value.length;
          e && (w.value = (w.value + (t.key === "ArrowDown" ? 1 : -1) + e) % e), z();
        } else if (t.key === "Enter") {
          t.preventDefault(), t.stopPropagation();
          const e = l.value ? P.value[w.value] : void 0;
          e ? H(e.value) : Y();
        } else if (t.key === "Escape") {
          if (t.preventDefault(), t.stopPropagation(), !l.value) {
            o("close");
            return;
          }
          l.value = !1, v.value = "", r.value = x(s.timeValue || ""), o("timeValidity", !0);
        }
      }
    }
    function ie(t) {
      o("update:timeValue", t), s.modelValue || o("update:modelValue", D(/* @__PURE__ */ new Date())), o("change");
    }
    const se = J(() => {
      const t = y.value, e = i.value, d = new Date(t, e, 1).getDay(), g = new Date(t, e, 1 - d), le = D(/* @__PURE__ */ new Date()), R = [];
      for (let O = 0; O < 42; O++) {
        const I = new Date(g);
        I.setDate(g.getDate() + O);
        const K = D(I);
        R.push({
          dateStr: K,
          dayNum: I.getDate(),
          isOtherMonth: I.getMonth() !== e,
          isToday: K === le
        });
      }
      return R;
    });
    return (t, e) => (u(), pe(ve(m.embedded ? "div" : ke), {
      anchor: m.embedded ? void 0 : m.anchorEl || null,
      onClose: e[8] || (e[8] = (a) => o("close"))
    }, {
      default: fe(() => [
        n("div", De, [
          m.embedded ? M("", !0) : (u(), c("div", Ve, [
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[0] || (e[0] = (a) => V("today"))
            }, [
              e[9] || (e[9] = n("span", { class: "q-icon" }, "📅", -1)),
              e[10] || (e[10] = n("span", { class: "q-label" }, "今天", -1)),
              n("span", Me, h(k(0)), 1)
            ]),
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[1] || (e[1] = (a) => V("tomorrow"))
            }, [
              e[11] || (e[11] = n("span", { class: "q-icon" }, "☀️", -1)),
              e[12] || (e[12] = n("span", { class: "q-label" }, "明天", -1)),
              n("span", Te, h(k(1)), 1)
            ]),
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[2] || (e[2] = (a) => V("weekend"))
            }, [
              e[13] || (e[13] = n("span", { class: "q-icon" }, "🛋️", -1)),
              e[14] || (e[14] = n("span", { class: "q-label" }, "这个周末", -1)),
              n("span", Se, h(S()), 1)
            ]),
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[3] || (e[3] = (a) => V("clear"))
            }, [...e[15] || (e[15] = [
              n("span", { class: "q-icon" }, "⊘", -1),
              n("span", { class: "q-label" }, "没有日期", -1)
            ])])
          ])),
          m.embedded ? M("", !0) : (u(), c("div", $e)),
          n("div", Ce, [
            n("div", xe, [
              n("span", qe, h(y.value) + "年 " + h(i.value + 1) + "月", 1),
              n("div", { class: "cal-nav-btns" }, [
                n("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: _
                }, "‹"),
                n("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: T
                }, "○"),
                n("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: p
                }, "›")
              ])
            ]),
            e[16] || (e[16] = n("div", { class: "cal-weekdays-row" }, [
              n("span", null, "日"),
              n("span", null, "一"),
              n("span", null, "二"),
              n("span", null, "三"),
              n("span", null, "四"),
              n("span", null, "五"),
              n("span", null, "六")
            ], -1)),
            n("div", Pe, [
              (u(!0), c(j, null, G(se.value, (a) => (u(), c("button", {
                key: a.dateStr,
                type: "button",
                class: ye(["cal-day-cell", {
                  "is-other-month": a.isOtherMonth,
                  "is-today": a.isToday,
                  "is-selected": a.dateStr === m.modelValue
                }]),
                onClick: (d) => te(a.dateStr)
              }, h(a.dayNum), 11, Ie))), 128))
            ])
          ]),
          e[17] || (e[17] = n("div", { class: "popover-divider" }, null, -1)),
          n("div", Ee, [
            n("div", Ne, [
              n("label", {
                for: E($),
                class: "time-icon"
              }, "时间", 8, _e),
              n("div", Be, [
                ge(n("input", {
                  id: E($),
                  "onUpdate:modelValue": e[4] || (e[4] = (a) => r.value = a),
                  type: "text",
                  class: "inline-time-input",
                  placeholder: "例如 11:45 PM",
                  autocomplete: "off",
                  spellcheck: "false",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-haspopup": "listbox",
                  "aria-expanded": l.value,
                  "aria-controls": q,
                  "aria-activedescendant": l.value && w.value >= 0 ? q + "-" + w.value : void 0,
                  "aria-invalid": !!v.value,
                  "aria-describedby": v.value ? E($) + "-error" : void 0,
                  onFocus: F,
                  onClick: e[5] || (e[5] = (a) => !l.value && F()),
                  onInput: ae,
                  onBlur: ne,
                  onKeydown: oe
                }, null, 40, Le), [
                  [we, r.value]
                ]),
                l.value ? (u(), c("div", {
                  key: 0,
                  id: q,
                  ref_key: "timeListRef",
                  ref: C,
                  class: "time-suggestions",
                  role: "listbox",
                  "aria-label": "每15分钟的推荐时间"
                }, [
                  (u(!0), c(j, null, G(P.value, (a, d) => (u(), c("button", {
                    id: q + "-" + d,
                    key: a.value,
                    type: "button",
                    class: "time-option",
                    role: "option",
                    tabindex: "-1",
                    "aria-selected": d === w.value,
                    onPointerdown: e[6] || (e[6] = Q(() => {
                    }, ["prevent"])),
                    onClick: (g) => H(a.value)
                  }, h(a.label), 41, Fe))), 128)),
                  P.value.length ? M("", !0) : (u(), c("small", He, "支持任意分钟，按 Enter 确认"))
                ], 512)) : M("", !0)
              ]),
              m.timeValue || r.value ? (u(), c("button", {
                key: 0,
                type: "button",
                class: "time-clear-btn",
                title: "清除具体时间",
                onPointerdown: e[7] || (e[7] = Q(() => {
                }, ["prevent"])),
                onClick: U
              }, "×", 32)) : M("", !0)
            ]),
            v.value ? (u(), c("small", {
              key: 0,
              id: E($) + "-error",
              class: "time-input-error",
              role: "alert"
            }, h(v.value), 9, Oe)) : M("", !0)
          ])
        ])
      ]),
      _: 1
    }, 40, ["anchor"]));
  }
}), Ye = /* @__PURE__ */ ee(Ae, [["__scopeId", "data-v-c497f39a"]]);
export {
  ke as I,
  Ye as T
};
