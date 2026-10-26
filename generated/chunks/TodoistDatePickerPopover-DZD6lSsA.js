import { d as J, x as H, C as le, G as ie, y as re, o as v, e as m, A as he, I as be, b as w, f as a, m as oe, i as z, l as ue, n as de, g as D, F as R, h as A, t as h, s as G, V as ke, c as De, M as Ce, w as $e, B as _e, u as P } from "./vendor-vue-DokqDua_.js";
import { t as se } from "./search.service-N0DgqU3Q.js";
import { _ as Q } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as Se } from "./module-state-BT0PQSND.js";
function F(l) {
  return typeof l == "string" && l.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(l) && !l.split("/").some((u) => u === "." || u === "..");
}
const K = "todoist_repository_links_v1:", ce = (l) => K + l;
function dt(l) {
  if (!F(l)) throw new Error("仓库名称无效");
  const u = [];
  for (let d = 0; d < localStorage.length; d++) {
    const c = localStorage.key(d);
    c?.startsWith(K) && u.push(c);
  }
  const n = [];
  let o = 0;
  for (const d of u) {
    const c = d.slice(K.length);
    if (c)
      try {
        X(c).some((p) => p.fullName.toLowerCase() === l.toLowerCase()) && n.push(c);
      } catch {
        o++;
      }
  }
  return { taskIds: n, unreadableCount: o };
}
function X(l) {
  if (!l) return [];
  const u = JSON.parse(localStorage.getItem(ce(l)) || "[]");
  if (!Array.isArray(u)) throw new Error("关联记录格式无效");
  return u.filter((n) => n && F(n.fullName)).map((n) => ({
    fullName: n.fullName,
    description: typeof n.description == "string" ? n.description : "",
    stars: typeof n.stars == "number" && Number.isFinite(n.stars) ? n.stars : void 0,
    language: typeof n.language == "string" ? n.language : void 0,
    updated: typeof n.updated == "string" ? n.updated : void 0
  }));
}
function pe(l, u) {
  if (!l || u.some((n) => !F(n.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(ce(l), JSON.stringify(u)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: l }));
}
function ct(l, u) {
  const n = X(l);
  n.some((o) => o.fullName.toLowerCase() === u.fullName.toLowerCase()) || pe(l, [...n, u]);
}
const Te = /* @__PURE__ */ J({
  __name: "InspectorPopover",
  props: {
    anchor: {}
  },
  emits: ["close"],
  setup(l, { emit: u }) {
    const n = l, o = u, d = w(null);
    H(() => Se.active, (y) => {
      y || (d.value?.hidePopover(), o("close"));
    });
    const c = w({ visibility: "hidden" });
    function p() {
      const y = d.value, T = n.anchor;
      if (!y || !T?.isConnected) {
        o("close");
        return;
      }
      const $ = T.getBoundingClientRect(), V = Math.min(280, window.innerWidth - 24), M = Math.min(y.scrollHeight + 2, window.innerHeight - 24), f = $.right + V + 8 <= window.innerWidth - 12 ? $.right + 8 : Math.max(12, $.left - V - 8);
      c.value = { position: "fixed", margin: "0", inset: "auto", left: `${f}px`, top: `${Math.max(12, Math.min($.top, window.innerHeight - M - 12))}px`, width: `${V}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: "visible" };
    }
    function N(y) {
      y.newState === "closed" && o("close");
    }
    return le(async () => {
      await ie(), d.value?.showPopover(), p(), window.addEventListener("resize", p), window.addEventListener("scroll", p, !0);
    }), re(() => {
      window.removeEventListener("resize", p), window.removeEventListener("scroll", p, !0);
    }), (y, T) => (v(), m("div", {
      ref_key: "panel",
      ref: d,
      popover: "auto",
      class: "inspector-popover",
      style: he(c.value),
      onToggle: N
    }, [
      be(y.$slots, "default", {}, void 0, !0)
    ], 36));
  }
}), Ve = /* @__PURE__ */ Q(Te, [["__scopeId", "data-v-b798818e"]]), Me = {
  class: "task-repositories",
  "aria-label": "关联 GitHub 仓库"
}, Le = {
  key: 1,
  class: "repo-candidates"
}, Ne = ["onClick"], xe = {
  key: 2,
  role: "alert"
}, Ie = { class: "repo-cards" }, Ee = ["href"], qe = ["aria-label", "onClick"], Pe = { key: 0 }, He = { key: 1 }, Re = { key: 2 }, Ae = /* @__PURE__ */ J({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {}
  },
  setup(l) {
    const u = l, n = w([]), o = w(""), d = w(""), c = w(!1), p = w(!1);
    function N() {
      try {
        n.value = X(u.taskId), p.value = !0;
      } catch {
        d.value = "关联记录读取失败，未覆盖已有数据。", p.value = !1;
      }
    }
    function y(f) {
      (f instanceof StorageEvent || f.detail === u.taskId) && N();
    }
    le(() => {
      window.addEventListener("storage", y), window.addEventListener("todoist-repository-links-changed", y);
    }), re(() => {
      window.removeEventListener("storage", y), window.removeEventListener("todoist-repository-links-changed", y);
    }), H(() => u.taskId, () => {
      n.value = [], o.value = "", c.value = !1, d.value = "", p.value = !1, N();
    }, { immediate: !0 });
    const T = G(() => se.repos.filter((f) => f.full_name.toLowerCase().includes(o.value.toLowerCase()) && !n.value.some((r) => r.fullName === f.full_name)).slice(0, 6));
    function $(f) {
      if (!(!u.taskId || !p.value))
        try {
          pe(u.taskId, f), n.value = f, d.value = "";
        } catch {
          d.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function V(f) {
      let r = f.trim();
      if (r.startsWith("https://"))
        try {
          const g = new URL(r);
          if (g.hostname !== "github.com" || g.username || g.password) throw new Error();
          r = g.pathname.replace(/^\/|\/$/g, "");
        } catch {
          d.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!F(r)) {
        d.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (n.value.some((g) => g.fullName.toLowerCase() === r.toLowerCase())) {
        d.value = "该仓库已关联。";
        return;
      }
      const i = se.repos.find((g) => g.full_name.toLowerCase() === r.toLowerCase());
      $([...n.value, { fullName: r, description: i?.description || "", stars: i?.stargazers_count, language: i?.language || void 0, updated: i?.updated_at }]), d.value || (o.value = "", c.value = !1);
    }
    function M(f) {
      $(n.value.filter((r) => r.fullName !== f));
    }
    return (f, r) => (v(), m("section", Me, [
      a("header", null, [
        r[3] || (r[3] = a("span", null, [
          oe("关联仓库 "),
          a("small", null, "仅本插件")
        ], -1)),
        a("button", {
          type: "button",
          onClick: r[0] || (r[0] = (i) => c.value = !c.value)
        }, "＋ 关联")
      ]),
      c.value ? (v(), m("form", {
        key: 0,
        onSubmit: r[2] || (r[2] = z((i) => V(o.value), ["prevent"]))
      }, [
        ue(a("input", {
          "onUpdate:modelValue": r[1] || (r[1] = (i) => o.value = i),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [de, o.value]
        ]),
        r[4] || (r[4] = a("button", { type: "submit" }, "添加", -1))
      ], 32)) : D("", !0),
      c.value && T.value.length ? (v(), m("div", Le, [
        (v(!0), m(R, null, A(T.value, (i) => (v(), m("button", {
          key: i.full_name,
          type: "button",
          onClick: (g) => V(i.full_name)
        }, h(i.full_name), 9, Ne))), 128))
      ])) : D("", !0),
      d.value ? (v(), m("p", xe, h(d.value), 1)) : D("", !0),
      a("div", Ie, [
        (v(!0), m(R, null, A(n.value, (i) => (v(), m("article", {
          key: i.fullName,
          class: "repo-card"
        }, [
          a("header", null, [
            a("a", {
              href: "https://github.com/" + i.fullName,
              target: "_blank",
              rel: "noreferrer"
            }, [
              r[5] || (r[5] = a("span", { class: "repo-mark" }, "⌘", -1)),
              oe(" " + h(i.fullName), 1)
            ], 8, Ee),
            a("button", {
              type: "button",
              "aria-label": "移除关联 " + i.fullName,
              onClick: (g) => M(i.fullName)
            }, "×", 8, qe)
          ]),
          a("p", null, h(i.description || "GitHub 仓库"), 1),
          a("footer", null, [
            i.stars !== void 0 ? (v(), m("span", Pe, "☆ " + h(i.stars.toLocaleString()), 1)) : D("", !0),
            i.language ? (v(), m("span", He, h(i.language), 1)) : D("", !0),
            i.updated ? (v(), m("span", Re, h(i.updated.slice(0, 10)), 1)) : D("", !0)
          ])
        ]))), 128))
      ])
    ]));
  }
}), pt = /* @__PURE__ */ Q(Ae, [["__scopeId", "data-v-97ac7343"]]), Fe = { class: "todoist-date-popover" }, Oe = {
  key: 0,
  class: "quick-dates-list"
}, Be = { class: "q-day" }, We = { class: "q-day" }, Ue = { class: "q-day" }, Ye = {
  key: 1,
  class: "popover-divider"
}, ze = { class: "mini-calendar-section" }, Ge = { class: "cal-nav-row" }, Ke = { class: "cal-month-title" }, Je = { class: "cal-days-grid" }, Qe = ["onClick"], Xe = { class: "cal-footer-section" }, je = { class: "time-picker-row" }, Ze = ["for"], et = { class: "time-input-wrap" }, tt = ["id", "aria-expanded", "aria-activedescendant", "aria-invalid", "aria-describedby"], at = ["id", "aria-selected", "onClick"], nt = {
  key: 0,
  class: "time-input-hint"
}, ot = ["id"], st = /* @__PURE__ */ J({
  __name: "TodoistDatePickerPopover",
  props: {
    modelValue: {},
    timeValue: {},
    anchorEl: {},
    embedded: { type: Boolean }
  },
  emits: ["update:modelValue", "update:timeValue", "change", "timeValidity", "close"],
  setup(l, { emit: u }) {
    const n = l, o = u, d = n.modelValue ? /* @__PURE__ */ new Date(n.modelValue + "T00:00:00") : /* @__PURE__ */ new Date(), c = w(d.getFullYear()), p = w(d.getMonth());
    H(() => n.modelValue, (t) => {
      const e = /* @__PURE__ */ new Date(t + "T00:00:00");
      Number.isFinite(e.getTime()) && (c.value = e.getFullYear(), p.value = e.getMonth());
    });
    function N() {
      p.value === 0 ? (p.value = 11, c.value--) : p.value--;
    }
    function y() {
      p.value === 11 ? (p.value = 0, c.value++) : p.value++;
    }
    function T() {
      const t = /* @__PURE__ */ new Date();
      c.value = t.getFullYear(), p.value = t.getMonth();
    }
    function $(t) {
      const e = /* @__PURE__ */ new Date();
      return e.setDate(e.getDate() + t), ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][e.getDay()];
    }
    function V() {
      const t = /* @__PURE__ */ new Date(), s = (6 - t.getDay() + 7) % 7 || 7;
      return t.setDate(t.getDate() + s), `${t.getMonth() + 1}月${t.getDate()}日`;
    }
    function M(t) {
      const e = t.getFullYear(), s = String(t.getMonth() + 1).padStart(2, "0"), C = String(t.getDate()).padStart(2, "0");
      return `${e}-${s}-${C}`;
    }
    function f(t) {
      if (t === "clear") {
        o("update:modelValue", ""), o("update:timeValue", ""), o("change"), n.embedded || o("close");
        return;
      }
      const e = /* @__PURE__ */ new Date();
      if (t === "tomorrow")
        e.setDate(e.getDate() + 1);
      else if (t === "weekend") {
        const S = (6 - e.getDay() + 7) % 7 || 7;
        e.setDate(e.getDate() + S);
      }
      const s = M(e);
      o("update:modelValue", s), o("change"), n.embedded || o("close");
    }
    function r(t) {
      o("update:modelValue", t), o("change"), n.embedded || o("close");
    }
    const i = ke(), g = i + "-options", k = w(I(n.timeValue || "")), _ = w(""), b = w(!1), O = w(!1), L = w(-1), x = w(null), B = Array.from({ length: 96 }, (t, e) => {
      const s = `${String(Math.floor(e / 4)).padStart(2, "0")}:${String(e % 4 * 15).padStart(2, "0")}`;
      return { value: s, label: I(s) };
    }), E = G(() => {
      const t = k.value.trim().toUpperCase().replace(/\s/g, "");
      return !O.value || !t ? B : B.filter((e) => e.label.replace(/\s/g, "").startsWith(t) || e.value.startsWith(t));
    });
    H(() => n.timeValue, (t) => {
      k.value = I(t || ""), _.value = "";
    });
    function I(t) {
      if (!t) return "";
      const [e, s] = t.split(":").map(Number);
      return `${e % 12 || 12}:${String(s).padStart(2, "0")} ${e >= 12 ? "PM" : "AM"}`;
    }
    function j(t) {
      const e = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
      if (!e) return null;
      let s = Number(e[1]);
      const C = Number(e[2] || 0), S = e[3]?.toUpperCase();
      return C > 59 || (S ? s < 1 || s > 12 : s > 23) ? null : (S && (s = s % 12 + (S === "PM" ? 12 : 0)), `${String(s).padStart(2, "0")}:${String(C).padStart(2, "0")}`);
    }
    function Z() {
      ie(() => {
        const t = x.value?.querySelector('[aria-selected="true"]'), e = x.value;
        t && e && (e.scrollTop = Math.max(0, t.offsetTop - e.clientHeight / 2 + t.offsetHeight / 2));
      });
    }
    function W() {
      b.value = !0, O.value = !1;
      const t = n.timeValue || `${String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0")}:00`;
      L.value = Math.max(0, B.findIndex((e) => e.value >= t)), Z();
    }
    function ve() {
      b.value = !0, O.value = !0, L.value = -1, _.value = "", o("timeValidity", !k.value.trim() || j(k.value) !== null), x.value && (x.value.scrollTop = 0);
    }
    function U(t) {
      b.value = !1, _.value = "", o("timeValidity", !0), k.value = I(t), t !== (n.timeValue || "") && ye(t);
    }
    function ee() {
      b.value = !1, _.value = "", k.value = "", o("timeValidity", !0), n.timeValue && (o("update:timeValue", ""), o("change"));
    }
    function te() {
      if (!k.value.trim())
        return ee(), !0;
      const t = j(k.value);
      return t === null ? (o("timeValidity", !1), _.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45", !1) : (U(t), !0);
    }
    function me() {
      b.value = !1, te();
    }
    function fe(t) {
      if (!t.isComposing) {
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault(), t.stopPropagation(), b.value || W();
          const e = E.value.length;
          e && (L.value = (L.value + (t.key === "ArrowDown" ? 1 : -1) + e) % e), Z();
        } else if (t.key === "Enter") {
          t.preventDefault(), t.stopPropagation();
          const e = b.value ? E.value[L.value] : void 0;
          e ? U(e.value) : te();
        } else if (t.key === "Escape") {
          if (t.preventDefault(), t.stopPropagation(), !b.value) {
            o("close");
            return;
          }
          b.value = !1, _.value = "", k.value = I(n.timeValue || ""), o("timeValidity", !0);
        }
      }
    }
    function ye(t) {
      o("update:timeValue", t), n.modelValue || o("update:modelValue", M(/* @__PURE__ */ new Date())), o("change");
    }
    const ge = G(() => {
      const t = c.value, e = p.value, C = new Date(t, e, 1).getDay(), S = new Date(t, e, 1 - C), we = M(/* @__PURE__ */ new Date()), ae = [];
      for (let Y = 0; Y < 42; Y++) {
        const q = new Date(S);
        q.setDate(S.getDate() + Y);
        const ne = M(q);
        ae.push({
          dateStr: ne,
          dayNum: q.getDate(),
          isOtherMonth: q.getMonth() !== e,
          isToday: ne === we
        });
      }
      return ae;
    });
    return (t, e) => (v(), De(Ce(l.embedded ? "div" : Ve), {
      anchor: l.embedded ? void 0 : l.anchorEl || null,
      onClose: e[8] || (e[8] = (s) => o("close"))
    }, {
      default: $e(() => [
        a("div", Fe, [
          l.embedded ? D("", !0) : (v(), m("div", Oe, [
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[0] || (e[0] = (s) => f("today"))
            }, [
              e[9] || (e[9] = a("span", { class: "q-icon" }, "📅", -1)),
              e[10] || (e[10] = a("span", { class: "q-label" }, "今天", -1)),
              a("span", Be, h($(0)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[1] || (e[1] = (s) => f("tomorrow"))
            }, [
              e[11] || (e[11] = a("span", { class: "q-icon" }, "☀️", -1)),
              e[12] || (e[12] = a("span", { class: "q-label" }, "明天", -1)),
              a("span", We, h($(1)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[2] || (e[2] = (s) => f("weekend"))
            }, [
              e[13] || (e[13] = a("span", { class: "q-icon" }, "🛋️", -1)),
              e[14] || (e[14] = a("span", { class: "q-label" }, "这个周末", -1)),
              a("span", Ue, h(V()), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[3] || (e[3] = (s) => f("clear"))
            }, [...e[15] || (e[15] = [
              a("span", { class: "q-icon" }, "⊘", -1),
              a("span", { class: "q-label" }, "没有日期", -1)
            ])])
          ])),
          l.embedded ? D("", !0) : (v(), m("div", Ye)),
          a("div", ze, [
            a("div", Ge, [
              a("span", Ke, h(c.value) + "年 " + h(p.value + 1) + "月", 1),
              a("div", { class: "cal-nav-btns" }, [
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: N
                }, "‹"),
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: T
                }, "○"),
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: y
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
            a("div", Je, [
              (v(!0), m(R, null, A(ge.value, (s) => (v(), m("button", {
                key: s.dateStr,
                type: "button",
                class: _e(["cal-day-cell", {
                  "is-other-month": s.isOtherMonth,
                  "is-today": s.isToday,
                  "is-selected": s.dateStr === l.modelValue
                }]),
                onClick: (C) => r(s.dateStr)
              }, h(s.dayNum), 11, Qe))), 128))
            ])
          ]),
          e[17] || (e[17] = a("div", { class: "popover-divider" }, null, -1)),
          a("div", Xe, [
            a("div", je, [
              a("label", {
                for: P(i),
                class: "time-icon"
              }, "时间", 8, Ze),
              a("div", et, [
                ue(a("input", {
                  id: P(i),
                  "onUpdate:modelValue": e[4] || (e[4] = (s) => k.value = s),
                  type: "text",
                  class: "inline-time-input",
                  placeholder: "例如 11:45 PM",
                  autocomplete: "off",
                  spellcheck: "false",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-haspopup": "listbox",
                  "aria-expanded": b.value,
                  "aria-controls": g,
                  "aria-activedescendant": b.value && L.value >= 0 ? g + "-" + L.value : void 0,
                  "aria-invalid": !!_.value,
                  "aria-describedby": _.value ? P(i) + "-error" : void 0,
                  onFocus: W,
                  onClick: e[5] || (e[5] = (s) => !b.value && W()),
                  onInput: ve,
                  onBlur: me,
                  onKeydown: fe
                }, null, 40, tt), [
                  [de, k.value]
                ]),
                b.value ? (v(), m("div", {
                  key: 0,
                  id: g,
                  ref_key: "timeListRef",
                  ref: x,
                  class: "time-suggestions",
                  role: "listbox",
                  "aria-label": "每15分钟的推荐时间"
                }, [
                  (v(!0), m(R, null, A(E.value, (s, C) => (v(), m("button", {
                    id: g + "-" + C,
                    key: s.value,
                    type: "button",
                    class: "time-option",
                    role: "option",
                    tabindex: "-1",
                    "aria-selected": C === L.value,
                    onPointerdown: e[6] || (e[6] = z(() => {
                    }, ["prevent"])),
                    onClick: (S) => U(s.value)
                  }, h(s.label), 41, at))), 128)),
                  E.value.length ? D("", !0) : (v(), m("small", nt, "支持任意分钟，按 Enter 确认"))
                ], 512)) : D("", !0)
              ]),
              l.timeValue || k.value ? (v(), m("button", {
                key: 0,
                type: "button",
                class: "time-clear-btn",
                title: "清除具体时间",
                onPointerdown: e[7] || (e[7] = z(() => {
                }, ["prevent"])),
                onClick: ee
              }, "×", 32)) : D("", !0)
            ]),
            _.value ? (v(), m("small", {
              key: 0,
              id: P(i) + "-error",
              class: "time-input-error",
              role: "alert"
            }, h(_.value), 9, ot)) : D("", !0)
          ])
        ])
      ]),
      _: 1
    }, 40, ["anchor"]));
  }
}), vt = /* @__PURE__ */ Q(st, [["__scopeId", "data-v-c497f39a"]]);
export {
  Ve as I,
  vt as T,
  pt as a,
  ct as b,
  dt as f,
  X as r
};
