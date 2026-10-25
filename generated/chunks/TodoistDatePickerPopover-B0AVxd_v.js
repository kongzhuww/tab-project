import { d as Y, x as H, C as oe, G as se, y as le, o as u, e as d, A as we, I as he, b as w, f as a, m as ae, i as z, l as ie, n as re, g as D, F as R, h as A, t as h, s as G, V as be, c as ke, M as De, w as $e, B as Ce, u as P } from "./vendor-vue-CjOHdfe5.js";
import { K as ne } from "./search.service-CzxjlNxM.js";
import { _ as K } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as _e } from "./module-state-EdOqm0KR.js";
function J(i) {
  return typeof i == "string" && i.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(i) && !i.split("/").some((c) => c === "." || c === "..");
}
const ue = (i) => "todoist_repository_links_v1:" + i;
function de(i) {
  if (!i) return [];
  const c = JSON.parse(localStorage.getItem(ue(i)) || "[]");
  if (!Array.isArray(c)) throw new Error("关联记录格式无效");
  return c.filter((n) => n && J(n.fullName)).map((n) => ({
    fullName: n.fullName,
    description: typeof n.description == "string" ? n.description : "",
    stars: typeof n.stars == "number" && Number.isFinite(n.stars) ? n.stars : void 0,
    language: typeof n.language == "string" ? n.language : void 0,
    updated: typeof n.updated == "string" ? n.updated : void 0
  }));
}
function ce(i, c) {
  if (!i || c.some((n) => !J(n.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(ue(i), JSON.stringify(c)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: i }));
}
function ut(i, c) {
  const n = de(i);
  n.some((s) => s.fullName.toLowerCase() === c.fullName.toLowerCase()) || ce(i, [...n, c]);
}
const Se = /* @__PURE__ */ Y({
  __name: "InspectorPopover",
  props: {
    anchor: {}
  },
  emits: ["close"],
  setup(i, { emit: c }) {
    const n = i, s = c, m = w(null);
    H(() => _e.active, (y) => {
      y || (m.value?.hidePopover(), s("close"));
    });
    const f = w({ visibility: "hidden" });
    function p() {
      const y = m.value, V = n.anchor;
      if (!y || !V?.isConnected) {
        s("close");
        return;
      }
      const C = V.getBoundingClientRect(), T = Math.min(280, window.innerWidth - 24), M = Math.min(y.scrollHeight + 2, window.innerHeight - 24), v = C.right + T + 8 <= window.innerWidth - 12 ? C.right + 8 : Math.max(12, C.left - T - 8);
      f.value = { position: "fixed", margin: "0", inset: "auto", left: `${v}px`, top: `${Math.max(12, Math.min(C.top, window.innerHeight - M - 12))}px`, width: `${T}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: "visible" };
    }
    function L(y) {
      y.newState === "closed" && s("close");
    }
    return oe(async () => {
      await se(), m.value?.showPopover(), p(), window.addEventListener("resize", p), window.addEventListener("scroll", p, !0);
    }), le(() => {
      window.removeEventListener("resize", p), window.removeEventListener("scroll", p, !0);
    }), (y, V) => (u(), d("div", {
      ref_key: "panel",
      ref: m,
      popover: "auto",
      class: "inspector-popover",
      style: we(f.value),
      onToggle: L
    }, [
      he(y.$slots, "default", {}, void 0, !0)
    ], 36));
  }
}), Ve = /* @__PURE__ */ K(Se, [["__scopeId", "data-v-b798818e"]]), Te = {
  class: "task-repositories",
  "aria-label": "关联 GitHub 仓库"
}, Me = {
  key: 1,
  class: "repo-candidates"
}, Ne = ["onClick"], Le = {
  key: 2,
  role: "alert"
}, xe = { class: "repo-cards" }, Ie = ["href"], Ee = ["aria-label", "onClick"], qe = { key: 0 }, Pe = { key: 1 }, He = { key: 2 }, Re = /* @__PURE__ */ Y({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {}
  },
  setup(i) {
    const c = i, n = w([]), s = w(""), m = w(""), f = w(!1), p = w(!1);
    function L() {
      try {
        n.value = de(c.taskId), p.value = !0;
      } catch {
        m.value = "关联记录读取失败，未覆盖已有数据。", p.value = !1;
      }
    }
    function y(v) {
      (v instanceof StorageEvent || v.detail === c.taskId) && L();
    }
    oe(() => {
      window.addEventListener("storage", y), window.addEventListener("todoist-repository-links-changed", y);
    }), le(() => {
      window.removeEventListener("storage", y), window.removeEventListener("todoist-repository-links-changed", y);
    }), H(() => c.taskId, () => {
      n.value = [], s.value = "", f.value = !1, m.value = "", p.value = !1, L();
    }, { immediate: !0 });
    const V = G(() => ne.repos.filter((v) => v.full_name.toLowerCase().includes(s.value.toLowerCase()) && !n.value.some((r) => r.fullName === v.full_name)).slice(0, 6));
    function C(v) {
      if (!(!c.taskId || !p.value))
        try {
          ce(c.taskId, v), n.value = v, m.value = "";
        } catch {
          m.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function T(v) {
      let r = v.trim();
      if (r.startsWith("https://"))
        try {
          const g = new URL(r);
          if (g.hostname !== "github.com" || g.username || g.password) throw new Error();
          r = g.pathname.replace(/^\/|\/$/g, "");
        } catch {
          m.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!J(r)) {
        m.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (n.value.some((g) => g.fullName.toLowerCase() === r.toLowerCase())) {
        m.value = "该仓库已关联。";
        return;
      }
      const l = ne.repos.find((g) => g.full_name.toLowerCase() === r.toLowerCase());
      C([...n.value, { fullName: r, description: l?.description || "", stars: l?.stargazers_count, language: l?.language || void 0, updated: l?.updated_at }]), m.value || (s.value = "", f.value = !1);
    }
    function M(v) {
      C(n.value.filter((r) => r.fullName !== v));
    }
    return (v, r) => (u(), d("section", Te, [
      a("header", null, [
        r[3] || (r[3] = a("span", null, [
          ae("关联仓库 "),
          a("small", null, "仅本插件")
        ], -1)),
        a("button", {
          type: "button",
          onClick: r[0] || (r[0] = (l) => f.value = !f.value)
        }, "＋ 关联")
      ]),
      f.value ? (u(), d("form", {
        key: 0,
        onSubmit: r[2] || (r[2] = z((l) => T(s.value), ["prevent"]))
      }, [
        ie(a("input", {
          "onUpdate:modelValue": r[1] || (r[1] = (l) => s.value = l),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [re, s.value]
        ]),
        r[4] || (r[4] = a("button", { type: "submit" }, "添加", -1))
      ], 32)) : D("", !0),
      f.value && V.value.length ? (u(), d("div", Me, [
        (u(!0), d(R, null, A(V.value, (l) => (u(), d("button", {
          key: l.full_name,
          type: "button",
          onClick: (g) => T(l.full_name)
        }, h(l.full_name), 9, Ne))), 128))
      ])) : D("", !0),
      m.value ? (u(), d("p", Le, h(m.value), 1)) : D("", !0),
      a("div", xe, [
        (u(!0), d(R, null, A(n.value, (l) => (u(), d("article", {
          key: l.fullName,
          class: "repo-card"
        }, [
          a("header", null, [
            a("a", {
              href: "https://github.com/" + l.fullName,
              target: "_blank",
              rel: "noreferrer"
            }, [
              r[5] || (r[5] = a("span", { class: "repo-mark" }, "⌘", -1)),
              ae(" " + h(l.fullName), 1)
            ], 8, Ie),
            a("button", {
              type: "button",
              "aria-label": "移除关联 " + l.fullName,
              onClick: (g) => M(l.fullName)
            }, "×", 8, Ee)
          ]),
          a("p", null, h(l.description || "GitHub 仓库"), 1),
          a("footer", null, [
            l.stars !== void 0 ? (u(), d("span", qe, "☆ " + h(l.stars.toLocaleString()), 1)) : D("", !0),
            l.language ? (u(), d("span", Pe, h(l.language), 1)) : D("", !0),
            l.updated ? (u(), d("span", He, h(l.updated.slice(0, 10)), 1)) : D("", !0)
          ])
        ]))), 128))
      ])
    ]));
  }
}), dt = /* @__PURE__ */ K(Re, [["__scopeId", "data-v-97ac7343"]]), Ae = { class: "todoist-date-popover" }, Oe = {
  key: 0,
  class: "quick-dates-list"
}, Be = { class: "q-day" }, Fe = { class: "q-day" }, We = { class: "q-day" }, Ue = {
  key: 1,
  class: "popover-divider"
}, ze = { class: "mini-calendar-section" }, Ge = { class: "cal-nav-row" }, Ye = { class: "cal-month-title" }, Ke = { class: "cal-days-grid" }, Je = ["onClick"], Qe = { class: "cal-footer-section" }, je = { class: "time-picker-row" }, Xe = ["for"], Ze = { class: "time-input-wrap" }, et = ["id", "aria-expanded", "aria-activedescendant", "aria-invalid", "aria-describedby"], tt = ["id", "aria-selected", "onClick"], at = {
  key: 0,
  class: "time-input-hint"
}, nt = ["id"], ot = /* @__PURE__ */ Y({
  __name: "TodoistDatePickerPopover",
  props: {
    modelValue: {},
    timeValue: {},
    anchorEl: {},
    embedded: { type: Boolean }
  },
  emits: ["update:modelValue", "update:timeValue", "change", "timeValidity", "close"],
  setup(i, { emit: c }) {
    const n = i, s = c, m = n.modelValue ? /* @__PURE__ */ new Date(n.modelValue + "T00:00:00") : /* @__PURE__ */ new Date(), f = w(m.getFullYear()), p = w(m.getMonth());
    H(() => n.modelValue, (t) => {
      const e = /* @__PURE__ */ new Date(t + "T00:00:00");
      Number.isFinite(e.getTime()) && (f.value = e.getFullYear(), p.value = e.getMonth());
    });
    function L() {
      p.value === 0 ? (p.value = 11, f.value--) : p.value--;
    }
    function y() {
      p.value === 11 ? (p.value = 0, f.value++) : p.value++;
    }
    function V() {
      const t = /* @__PURE__ */ new Date();
      f.value = t.getFullYear(), p.value = t.getMonth();
    }
    function C(t) {
      const e = /* @__PURE__ */ new Date();
      return e.setDate(e.getDate() + t), ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][e.getDay()];
    }
    function T() {
      const t = /* @__PURE__ */ new Date(), o = (6 - t.getDay() + 7) % 7 || 7;
      return t.setDate(t.getDate() + o), `${t.getMonth() + 1}月${t.getDate()}日`;
    }
    function M(t) {
      const e = t.getFullYear(), o = String(t.getMonth() + 1).padStart(2, "0"), $ = String(t.getDate()).padStart(2, "0");
      return `${e}-${o}-${$}`;
    }
    function v(t) {
      if (t === "clear") {
        s("update:modelValue", ""), s("update:timeValue", ""), s("change"), n.embedded || s("close");
        return;
      }
      const e = /* @__PURE__ */ new Date();
      if (t === "tomorrow")
        e.setDate(e.getDate() + 1);
      else if (t === "weekend") {
        const S = (6 - e.getDay() + 7) % 7 || 7;
        e.setDate(e.getDate() + S);
      }
      const o = M(e);
      s("update:modelValue", o), s("change"), n.embedded || s("close");
    }
    function r(t) {
      s("update:modelValue", t), s("change"), n.embedded || s("close");
    }
    const l = be(), g = l + "-options", k = w(I(n.timeValue || "")), _ = w(""), b = w(!1), O = w(!1), N = w(-1), x = w(null), B = Array.from({ length: 96 }, (t, e) => {
      const o = `${String(Math.floor(e / 4)).padStart(2, "0")}:${String(e % 4 * 15).padStart(2, "0")}`;
      return { value: o, label: I(o) };
    }), E = G(() => {
      const t = k.value.trim().toUpperCase().replace(/\s/g, "");
      return !O.value || !t ? B : B.filter((e) => e.label.replace(/\s/g, "").startsWith(t) || e.value.startsWith(t));
    });
    H(() => n.timeValue, (t) => {
      k.value = I(t || ""), _.value = "";
    });
    function I(t) {
      if (!t) return "";
      const [e, o] = t.split(":").map(Number);
      return `${e % 12 || 12}:${String(o).padStart(2, "0")} ${e >= 12 ? "PM" : "AM"}`;
    }
    function Q(t) {
      const e = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
      if (!e) return null;
      let o = Number(e[1]);
      const $ = Number(e[2] || 0), S = e[3]?.toUpperCase();
      return $ > 59 || (S ? o < 1 || o > 12 : o > 23) ? null : (S && (o = o % 12 + (S === "PM" ? 12 : 0)), `${String(o).padStart(2, "0")}:${String($).padStart(2, "0")}`);
    }
    function j() {
      se(() => {
        const t = x.value?.querySelector('[aria-selected="true"]'), e = x.value;
        t && e && (e.scrollTop = Math.max(0, t.offsetTop - e.clientHeight / 2 + t.offsetHeight / 2));
      });
    }
    function F() {
      b.value = !0, O.value = !1;
      const t = n.timeValue || `${String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0")}:00`;
      N.value = Math.max(0, B.findIndex((e) => e.value >= t)), j();
    }
    function pe() {
      b.value = !0, O.value = !0, N.value = -1, _.value = "", s("timeValidity", !k.value.trim() || Q(k.value) !== null), x.value && (x.value.scrollTop = 0);
    }
    function W(t) {
      b.value = !1, _.value = "", s("timeValidity", !0), k.value = I(t), t !== (n.timeValue || "") && fe(t);
    }
    function X() {
      b.value = !1, _.value = "", k.value = "", s("timeValidity", !0), n.timeValue && (s("update:timeValue", ""), s("change"));
    }
    function Z() {
      if (!k.value.trim())
        return X(), !0;
      const t = Q(k.value);
      return t === null ? (s("timeValidity", !1), _.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45", !1) : (W(t), !0);
    }
    function ve() {
      b.value = !1, Z();
    }
    function me(t) {
      if (!t.isComposing) {
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault(), t.stopPropagation(), b.value || F();
          const e = E.value.length;
          e && (N.value = (N.value + (t.key === "ArrowDown" ? 1 : -1) + e) % e), j();
        } else if (t.key === "Enter") {
          t.preventDefault(), t.stopPropagation();
          const e = b.value ? E.value[N.value] : void 0;
          e ? W(e.value) : Z();
        } else if (t.key === "Escape") {
          if (t.preventDefault(), t.stopPropagation(), !b.value) {
            s("close");
            return;
          }
          b.value = !1, _.value = "", k.value = I(n.timeValue || ""), s("timeValidity", !0);
        }
      }
    }
    function fe(t) {
      s("update:timeValue", t), n.modelValue || s("update:modelValue", M(/* @__PURE__ */ new Date())), s("change");
    }
    const ye = G(() => {
      const t = f.value, e = p.value, $ = new Date(t, e, 1).getDay(), S = new Date(t, e, 1 - $), ge = M(/* @__PURE__ */ new Date()), ee = [];
      for (let U = 0; U < 42; U++) {
        const q = new Date(S);
        q.setDate(S.getDate() + U);
        const te = M(q);
        ee.push({
          dateStr: te,
          dayNum: q.getDate(),
          isOtherMonth: q.getMonth() !== e,
          isToday: te === ge
        });
      }
      return ee;
    });
    return (t, e) => (u(), ke(De(i.embedded ? "div" : Ve), {
      anchor: i.embedded ? void 0 : i.anchorEl || null,
      onClose: e[8] || (e[8] = (o) => s("close"))
    }, {
      default: $e(() => [
        a("div", Ae, [
          i.embedded ? D("", !0) : (u(), d("div", Oe, [
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[0] || (e[0] = (o) => v("today"))
            }, [
              e[9] || (e[9] = a("span", { class: "q-icon" }, "📅", -1)),
              e[10] || (e[10] = a("span", { class: "q-label" }, "今天", -1)),
              a("span", Be, h(C(0)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[1] || (e[1] = (o) => v("tomorrow"))
            }, [
              e[11] || (e[11] = a("span", { class: "q-icon" }, "☀️", -1)),
              e[12] || (e[12] = a("span", { class: "q-label" }, "明天", -1)),
              a("span", Fe, h(C(1)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[2] || (e[2] = (o) => v("weekend"))
            }, [
              e[13] || (e[13] = a("span", { class: "q-icon" }, "🛋️", -1)),
              e[14] || (e[14] = a("span", { class: "q-label" }, "这个周末", -1)),
              a("span", We, h(T()), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[3] || (e[3] = (o) => v("clear"))
            }, [...e[15] || (e[15] = [
              a("span", { class: "q-icon" }, "⊘", -1),
              a("span", { class: "q-label" }, "没有日期", -1)
            ])])
          ])),
          i.embedded ? D("", !0) : (u(), d("div", Ue)),
          a("div", ze, [
            a("div", Ge, [
              a("span", Ye, h(f.value) + "年 " + h(p.value + 1) + "月", 1),
              a("div", { class: "cal-nav-btns" }, [
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: L
                }, "‹"),
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: V
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
            a("div", Ke, [
              (u(!0), d(R, null, A(ye.value, (o) => (u(), d("button", {
                key: o.dateStr,
                type: "button",
                class: Ce(["cal-day-cell", {
                  "is-other-month": o.isOtherMonth,
                  "is-today": o.isToday,
                  "is-selected": o.dateStr === i.modelValue
                }]),
                onClick: ($) => r(o.dateStr)
              }, h(o.dayNum), 11, Je))), 128))
            ])
          ]),
          e[17] || (e[17] = a("div", { class: "popover-divider" }, null, -1)),
          a("div", Qe, [
            a("div", je, [
              a("label", {
                for: P(l),
                class: "time-icon"
              }, "时间", 8, Xe),
              a("div", Ze, [
                ie(a("input", {
                  id: P(l),
                  "onUpdate:modelValue": e[4] || (e[4] = (o) => k.value = o),
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
                  "aria-activedescendant": b.value && N.value >= 0 ? g + "-" + N.value : void 0,
                  "aria-invalid": !!_.value,
                  "aria-describedby": _.value ? P(l) + "-error" : void 0,
                  onFocus: F,
                  onClick: e[5] || (e[5] = (o) => !b.value && F()),
                  onInput: pe,
                  onBlur: ve,
                  onKeydown: me
                }, null, 40, et), [
                  [re, k.value]
                ]),
                b.value ? (u(), d("div", {
                  key: 0,
                  id: g,
                  ref_key: "timeListRef",
                  ref: x,
                  class: "time-suggestions",
                  role: "listbox",
                  "aria-label": "每15分钟的推荐时间"
                }, [
                  (u(!0), d(R, null, A(E.value, (o, $) => (u(), d("button", {
                    id: g + "-" + $,
                    key: o.value,
                    type: "button",
                    class: "time-option",
                    role: "option",
                    tabindex: "-1",
                    "aria-selected": $ === N.value,
                    onPointerdown: e[6] || (e[6] = z(() => {
                    }, ["prevent"])),
                    onClick: (S) => W(o.value)
                  }, h(o.label), 41, tt))), 128)),
                  E.value.length ? D("", !0) : (u(), d("small", at, "支持任意分钟，按 Enter 确认"))
                ], 512)) : D("", !0)
              ]),
              i.timeValue || k.value ? (u(), d("button", {
                key: 0,
                type: "button",
                class: "time-clear-btn",
                title: "清除具体时间",
                onPointerdown: e[7] || (e[7] = z(() => {
                }, ["prevent"])),
                onClick: X
              }, "×", 32)) : D("", !0)
            ]),
            _.value ? (u(), d("small", {
              key: 0,
              id: P(l) + "-error",
              class: "time-input-error",
              role: "alert"
            }, h(_.value), 9, nt)) : D("", !0)
          ])
        ])
      ]),
      _: 1
    }, 40, ["anchor"]));
  }
}), ct = /* @__PURE__ */ K(ot, [["__scopeId", "data-v-c497f39a"]]);
export {
  Ve as I,
  ct as T,
  dt as a,
  ut as b,
  de as r
};
