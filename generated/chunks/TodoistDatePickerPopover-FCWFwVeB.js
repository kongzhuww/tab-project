import { d as X, w as H, D as de, G as ee, z as me, o as v, g as y, B as pe, I as ve, b as h, V as fe, e as ye, M as ge, f as he, h as a, t as D, i as $, F as Z, j, C as be, u as I, n as we, q as ke, k as G, y as Q } from "./vendor-vue-FFI3kJnP.js";
import { t as De } from "./module-state-GmAjQSzX.js";
import { _ as te } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const Ve = "todoist_bili_video_links_v1:", ne = (o) => Ve + o;
function z(o) {
  if (!o) return [];
  try {
    const l = JSON.parse(localStorage.getItem(ne(o)) || "[]");
    return Array.isArray(l) ? l.filter((s) => s && (s.bvid || s.aid)) : [];
  } catch {
    return [];
  }
}
function ae(o, l) {
  o && (localStorage.setItem(ne(o), JSON.stringify(l)), window.dispatchEvent(new CustomEvent("todoist-bili-links-changed", { detail: o })));
}
function Ze(o, l) {
  const s = z(o);
  s.some((c) => l.bvid && c.bvid === l.bvid || l.aid && c.aid === l.aid) || ae(o, [l, ...s]);
}
function je(o, l) {
  const i = z(o).filter((c) => c.bvid !== l && c.aid !== l);
  ae(o, i);
}
function Ge(o, l, s) {
  if (o)
    try {
      const u = z(o);
      if (u && u.length > 0) return u;
    } catch {
    }
  const i = `${l || ""} ${s || ""}`, c = i.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/i) || i.match(/\b(BV[a-zA-Z0-9]{10})\b/);
  if (c) {
    const u = c[1];
    let r = "";
    const M = (s || "").match(/^(?:观看|看)?(?:看视频[:：]\s*)(.+)$/);
    M && (r = M[1].trim());
    let d = "";
    const w = (l || "").match(/UP主[:：]\s*([^\n\r]+)/);
    return w && (d = w[1].trim()), [{
      bvid: u,
      title: r || u,
      author: d,
      url: `https://www.bilibili.com/video/${u}`
    }];
  }
  return [];
}
const Me = /* @__PURE__ */ X({
  __name: "InspectorPopover",
  props: {
    anchor: {}
  },
  emits: ["close"],
  setup(o, { emit: l }) {
    const s = o, i = l, c = h(null);
    H(() => De.active, (d) => {
      d || (c.value?.hidePopover(), i("close"));
    });
    const u = h({ visibility: "hidden" });
    function r() {
      const d = c.value, w = s.anchor;
      if (!d || !w?.isConnected) {
        i("close");
        return;
      }
      const V = w.getBoundingClientRect(), x = Math.min(280, window.innerWidth - 24), T = Math.min(d.scrollHeight + 2, window.innerHeight - 24), S = V.right + x + 8 <= window.innerWidth - 12 ? V.right + 8 : Math.max(12, V.left - x - 8);
      u.value = { position: "fixed", margin: "0", inset: "auto", left: `${S}px`, top: `${Math.max(12, Math.min(V.top, window.innerHeight - T - 12))}px`, width: `${x}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: "visible" };
    }
    function M(d) {
      d.newState === "closed" && i("close");
    }
    return de(async () => {
      await ee(), c.value?.showPopover(), r(), window.addEventListener("resize", r), window.addEventListener("scroll", r, !0);
    }), me(() => {
      window.removeEventListener("resize", r), window.removeEventListener("scroll", r, !0);
    }), (d, w) => (v(), y("div", {
      ref_key: "panel",
      ref: c,
      popover: "auto",
      class: "inspector-popover",
      style: pe(u.value),
      onToggle: M
    }, [
      ve(d.$slots, "default", {}, void 0, !0)
    ], 36));
  }
}), Te = /* @__PURE__ */ te(Me, [["__scopeId", "data-v-b798818e"]]), Se = { class: "todoist-date-popover" }, $e = {
  key: 0,
  class: "quick-dates-list"
}, xe = { class: "q-day" }, Ce = { class: "q-day" }, Pe = { class: "q-day" }, qe = {
  key: 1,
  class: "popover-divider"
}, Be = { class: "mini-calendar-section" }, Ee = { class: "cal-nav-row" }, _e = { class: "cal-month-title" }, Ie = { class: "cal-days-grid" }, Ne = ["onClick"], Le = { class: "cal-footer-section" }, Ae = { class: "time-picker-row" }, Fe = ["for"], Oe = { class: "time-input-wrap" }, He = ["id", "aria-expanded", "aria-activedescendant", "aria-invalid", "aria-describedby"], ze = ["id", "aria-selected", "onClick"], We = {
  key: 0,
  class: "time-input-hint"
}, Ue = ["id"], Ye = /* @__PURE__ */ X({
  __name: "TodoistDatePickerPopover",
  props: {
    modelValue: {},
    timeValue: {},
    anchorEl: {},
    embedded: { type: Boolean }
  },
  emits: ["update:modelValue", "update:timeValue", "change", "timeValidity", "close"],
  setup(o, { emit: l }) {
    const s = o, i = l, c = s.modelValue ? /* @__PURE__ */ new Date(s.modelValue + "T00:00:00") : /* @__PURE__ */ new Date(), u = h(c.getFullYear()), r = h(c.getMonth());
    H(() => s.modelValue, (t) => {
      const e = /* @__PURE__ */ new Date(t + "T00:00:00");
      Number.isFinite(e.getTime()) && (u.value = e.getFullYear(), r.value = e.getMonth());
    });
    function M() {
      r.value === 0 ? (r.value = 11, u.value--) : r.value--;
    }
    function d() {
      r.value === 11 ? (r.value = 0, u.value++) : r.value++;
    }
    function w() {
      const t = /* @__PURE__ */ new Date();
      u.value = t.getFullYear(), r.value = t.getMonth();
    }
    function V(t) {
      const e = /* @__PURE__ */ new Date();
      return e.setDate(e.getDate() + t), ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][e.getDay()];
    }
    function x() {
      const t = /* @__PURE__ */ new Date(), n = (6 - t.getDay() + 7) % 7 || 7;
      return t.setDate(t.getDate() + n), `${t.getMonth() + 1}月${t.getDate()}日`;
    }
    function T(t) {
      const e = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), f = String(t.getDate()).padStart(2, "0");
      return `${e}-${n}-${f}`;
    }
    function S(t) {
      if (t === "clear") {
        i("update:modelValue", ""), i("update:timeValue", ""), i("change"), s.embedded || i("close");
        return;
      }
      const e = /* @__PURE__ */ new Date();
      if (t === "tomorrow")
        e.setDate(e.getDate() + 1);
      else if (t === "weekend") {
        const b = (6 - e.getDay() + 7) % 7 || 7;
        e.setDate(e.getDate() + b);
      }
      const n = T(e);
      i("update:modelValue", n), i("change"), s.embedded || i("close");
    }
    function ie(t) {
      i("update:modelValue", t), i("change"), s.embedded || i("close");
    }
    const C = fe(), B = C + "-options", p = h(q(s.timeValue || "")), g = h(""), m = h(!1), N = h(!1), k = h(-1), P = h(null), L = Array.from({ length: 96 }, (t, e) => {
      const n = `${String(Math.floor(e / 4)).padStart(2, "0")}:${String(e % 4 * 15).padStart(2, "0")}`;
      return { value: n, label: q(n) };
    }), E = Q(() => {
      const t = p.value.trim().toUpperCase().replace(/\s/g, "");
      return !N.value || !t ? L : L.filter((e) => e.label.replace(/\s/g, "").startsWith(t) || e.value.startsWith(t));
    });
    H(() => s.timeValue, (t) => {
      p.value = q(t || ""), g.value = "";
    });
    function q(t) {
      if (!t) return "";
      const [e, n] = t.split(":").map(Number);
      return `${e % 12 || 12}:${String(n).padStart(2, "0")} ${e >= 12 ? "PM" : "AM"}`;
    }
    function W(t) {
      const e = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
      if (!e) return null;
      let n = Number(e[1]);
      const f = Number(e[2] || 0), b = e[3]?.toUpperCase();
      return f > 59 || (b ? n < 1 || n > 12 : n > 23) ? null : (b && (n = n % 12 + (b === "PM" ? 12 : 0)), `${String(n).padStart(2, "0")}:${String(f).padStart(2, "0")}`);
    }
    function U() {
      ee(() => {
        const t = P.value?.querySelector('[aria-selected="true"]'), e = P.value;
        t && e && (e.scrollTop = Math.max(0, t.offsetTop - e.clientHeight / 2 + t.offsetHeight / 2));
      });
    }
    function A() {
      m.value = !0, N.value = !1;
      const t = s.timeValue || `${String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0")}:00`;
      k.value = Math.max(0, L.findIndex((e) => e.value >= t)), U();
    }
    function oe() {
      m.value = !0, N.value = !0, k.value = -1, g.value = "", i("timeValidity", !p.value.trim() || W(p.value) !== null), P.value && (P.value.scrollTop = 0);
    }
    function F(t) {
      m.value = !1, g.value = "", i("timeValidity", !0), p.value = q(t), t !== (s.timeValue || "") && re(t);
    }
    function Y() {
      m.value = !1, g.value = "", p.value = "", i("timeValidity", !0), s.timeValue && (i("update:timeValue", ""), i("change"));
    }
    function R() {
      if (!p.value.trim())
        return Y(), !0;
      const t = W(p.value);
      return t === null ? (i("timeValidity", !1), g.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45", !1) : (F(t), !0);
    }
    function se() {
      m.value = !1, R();
    }
    function le(t) {
      if (!t.isComposing) {
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault(), t.stopPropagation(), m.value || A();
          const e = E.value.length;
          e && (k.value = (k.value + (t.key === "ArrowDown" ? 1 : -1) + e) % e), U();
        } else if (t.key === "Enter") {
          t.preventDefault(), t.stopPropagation();
          const e = m.value ? E.value[k.value] : void 0;
          e ? F(e.value) : R();
        } else if (t.key === "Escape") {
          if (t.preventDefault(), t.stopPropagation(), !m.value) {
            i("close");
            return;
          }
          m.value = !1, g.value = "", p.value = q(s.timeValue || ""), i("timeValidity", !0);
        }
      }
    }
    function re(t) {
      i("update:timeValue", t), s.modelValue || i("update:modelValue", T(/* @__PURE__ */ new Date())), i("change");
    }
    const ue = Q(() => {
      const t = u.value, e = r.value, f = new Date(t, e, 1).getDay(), b = new Date(t, e, 1 - f), ce = T(/* @__PURE__ */ new Date()), K = [];
      for (let O = 0; O < 42; O++) {
        const _ = new Date(b);
        _.setDate(b.getDate() + O);
        const J = T(_);
        K.push({
          dateStr: J,
          dayNum: _.getDate(),
          isOtherMonth: _.getMonth() !== e,
          isToday: J === ce
        });
      }
      return K;
    });
    return (t, e) => (v(), ye(ge(o.embedded ? "div" : Te), {
      anchor: o.embedded ? void 0 : o.anchorEl || null,
      onClose: e[8] || (e[8] = (n) => i("close"))
    }, {
      default: he(() => [
        a("div", Se, [
          o.embedded ? $("", !0) : (v(), y("div", $e, [
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[0] || (e[0] = (n) => S("today"))
            }, [
              e[9] || (e[9] = a("span", { class: "q-icon" }, "📅", -1)),
              e[10] || (e[10] = a("span", { class: "q-label" }, "今天", -1)),
              a("span", xe, D(V(0)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[1] || (e[1] = (n) => S("tomorrow"))
            }, [
              e[11] || (e[11] = a("span", { class: "q-icon" }, "☀️", -1)),
              e[12] || (e[12] = a("span", { class: "q-label" }, "明天", -1)),
              a("span", Ce, D(V(1)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[2] || (e[2] = (n) => S("weekend"))
            }, [
              e[13] || (e[13] = a("span", { class: "q-icon" }, "🛋️", -1)),
              e[14] || (e[14] = a("span", { class: "q-label" }, "这个周末", -1)),
              a("span", Pe, D(x()), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[3] || (e[3] = (n) => S("clear"))
            }, [...e[15] || (e[15] = [
              a("span", { class: "q-icon" }, "⊘", -1),
              a("span", { class: "q-label" }, "没有日期", -1)
            ])])
          ])),
          o.embedded ? $("", !0) : (v(), y("div", qe)),
          a("div", Be, [
            a("div", Ee, [
              a("span", _e, D(u.value) + "年 " + D(r.value + 1) + "月", 1),
              a("div", { class: "cal-nav-btns" }, [
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: M
                }, "‹"),
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: w
                }, "○"),
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: d
                }, "›")
              ])
            ]),
            e[16] || (e[16] = a("div", { class: "cal-weekdays-row" }, [
              a("span", null, "日"),
              a("span", null, "一"),
              a("span", null, "二"),
              a("span", null, "三"),
              a("span", null, "四"),
              a("span", null, "五"),
              a("span", null, "六")
            ], -1)),
            a("div", Ie, [
              (v(!0), y(Z, null, j(ue.value, (n) => (v(), y("button", {
                key: n.dateStr,
                type: "button",
                class: be(["cal-day-cell", {
                  "is-other-month": n.isOtherMonth,
                  "is-today": n.isToday,
                  "is-selected": n.dateStr === o.modelValue
                }]),
                onClick: (f) => ie(n.dateStr)
              }, D(n.dayNum), 11, Ne))), 128))
            ])
          ]),
          e[17] || (e[17] = a("div", { class: "popover-divider" }, null, -1)),
          a("div", Le, [
            a("div", Ae, [
              a("label", {
                for: I(C),
                class: "time-icon"
              }, "时间", 8, Fe),
              a("div", Oe, [
                we(a("input", {
                  id: I(C),
                  "onUpdate:modelValue": e[4] || (e[4] = (n) => p.value = n),
                  type: "text",
                  class: "inline-time-input",
                  placeholder: "例如 11:45 PM",
                  autocomplete: "off",
                  spellcheck: "false",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-haspopup": "listbox",
                  "aria-expanded": m.value,
                  "aria-controls": B,
                  "aria-activedescendant": m.value && k.value >= 0 ? B + "-" + k.value : void 0,
                  "aria-invalid": !!g.value,
                  "aria-describedby": g.value ? I(C) + "-error" : void 0,
                  onFocus: A,
                  onClick: e[5] || (e[5] = (n) => !m.value && A()),
                  onInput: oe,
                  onBlur: se,
                  onKeydown: le
                }, null, 40, He), [
                  [ke, p.value]
                ]),
                m.value ? (v(), y("div", {
                  key: 0,
                  id: B,
                  ref_key: "timeListRef",
                  ref: P,
                  class: "time-suggestions",
                  role: "listbox",
                  "aria-label": "每15分钟的推荐时间"
                }, [
                  (v(!0), y(Z, null, j(E.value, (n, f) => (v(), y("button", {
                    id: B + "-" + f,
                    key: n.value,
                    type: "button",
                    class: "time-option",
                    role: "option",
                    tabindex: "-1",
                    "aria-selected": f === k.value,
                    onPointerdown: e[6] || (e[6] = G(() => {
                    }, ["prevent"])),
                    onClick: (b) => F(n.value)
                  }, D(n.label), 41, ze))), 128)),
                  E.value.length ? $("", !0) : (v(), y("small", We, "支持任意分钟，按 Enter 确认"))
                ], 512)) : $("", !0)
              ]),
              o.timeValue || p.value ? (v(), y("button", {
                key: 0,
                type: "button",
                class: "time-clear-btn",
                title: "清除具体时间",
                onPointerdown: e[7] || (e[7] = G(() => {
                }, ["prevent"])),
                onClick: Y
              }, "×", 32)) : $("", !0)
            ]),
            g.value ? (v(), y("small", {
              key: 0,
              id: I(C) + "-error",
              class: "time-input-error",
              role: "alert"
            }, D(g.value), 9, Ue)) : $("", !0)
          ])
        ])
      ]),
      _: 1
    }, 40, ["anchor"]));
  }
}), Qe = /* @__PURE__ */ te(Ye, [["__scopeId", "data-v-c497f39a"]]);
export {
  Te as I,
  Qe as T,
  Ze as a,
  Ge as g,
  je as u
};
