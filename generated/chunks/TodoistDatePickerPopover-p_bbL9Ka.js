import { t as H } from "./module-state-Dt_XKbbf.js";
import { x as E, y as Q, d as X, C as re, G as ue, o as v, e as f, A as be, I as ke, b as w, f as a, m as ie, i as G, l as de, n as ce, g as D, F as W, h as A, t as h, s as K, V as De, c as Ce, M as $e, w as Te, B as _e, u as R } from "./vendor-vue-DokqDua_.js";
import { t as le } from "./search.service-D8BPpHmG.js";
import { _ as j } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function dt(i, u, n) {
  let o = !1, l;
  const c = E(
    () => [H.dataRevision, i(), H.pendingWrites],
    ([p, V, y], C) => {
      C && p !== C[0] && (o = !0, u()), l && clearTimeout(l), !(!o || !V || y) && (l = setTimeout(() => {
        l = void 0, !(!i() || H.pendingWrites) && (o = !1, n());
      }, 150));
    }
  );
  Q(() => {
    c(), l && clearTimeout(l);
  });
}
function F(i) {
  return typeof i == "string" && i.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(i) && !i.split("/").some((u) => u === "." || u === "..");
}
const J = "todoist_repository_links_v1:", pe = (i) => J + i;
function ct(i) {
  if (!F(i)) throw new Error("仓库名称无效");
  const u = [];
  for (let l = 0; l < localStorage.length; l++) {
    const c = localStorage.key(l);
    c?.startsWith(J) && u.push(c);
  }
  const n = [];
  let o = 0;
  for (const l of u) {
    const c = l.slice(J.length);
    if (c)
      try {
        Z(c).some((p) => p.fullName.toLowerCase() === i.toLowerCase()) && n.push(c);
      } catch {
        o++;
      }
  }
  return { taskIds: n, unreadableCount: o };
}
function Z(i) {
  if (!i) return [];
  const u = JSON.parse(localStorage.getItem(pe(i)) || "[]");
  if (!Array.isArray(u)) throw new Error("关联记录格式无效");
  return u.filter((n) => n && F(n.fullName)).map((n) => ({
    fullName: n.fullName,
    description: typeof n.description == "string" ? n.description : "",
    stars: typeof n.stars == "number" && Number.isFinite(n.stars) ? n.stars : void 0,
    language: typeof n.language == "string" ? n.language : void 0,
    updated: typeof n.updated == "string" ? n.updated : void 0
  }));
}
function ve(i, u) {
  if (!i || u.some((n) => !F(n.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(pe(i), JSON.stringify(u)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: i }));
}
function pt(i, u) {
  const n = Z(i);
  n.some((o) => o.fullName.toLowerCase() === u.fullName.toLowerCase()) || ve(i, [...n, u]);
}
const Se = /* @__PURE__ */ X({
  __name: "InspectorPopover",
  props: {
    anchor: {}
  },
  emits: ["close"],
  setup(i, { emit: u }) {
    const n = i, o = u, l = w(null);
    E(() => H.active, (y) => {
      y || (l.value?.hidePopover(), o("close"));
    });
    const c = w({ visibility: "hidden" });
    function p() {
      const y = l.value, C = n.anchor;
      if (!y || !C?.isConnected) {
        o("close");
        return;
      }
      const T = C.getBoundingClientRect(), M = Math.min(280, window.innerWidth - 24), L = Math.min(y.scrollHeight + 2, window.innerHeight - 24), m = T.right + M + 8 <= window.innerWidth - 12 ? T.right + 8 : Math.max(12, T.left - M - 8);
      c.value = { position: "fixed", margin: "0", inset: "auto", left: `${m}px`, top: `${Math.max(12, Math.min(T.top, window.innerHeight - L - 12))}px`, width: `${M}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: "visible" };
    }
    function V(y) {
      y.newState === "closed" && o("close");
    }
    return re(async () => {
      await ue(), l.value?.showPopover(), p(), window.addEventListener("resize", p), window.addEventListener("scroll", p, !0);
    }), Q(() => {
      window.removeEventListener("resize", p), window.removeEventListener("scroll", p, !0);
    }), (y, C) => (v(), f("div", {
      ref_key: "panel",
      ref: l,
      popover: "auto",
      class: "inspector-popover",
      style: be(c.value),
      onToggle: V
    }, [
      ke(y.$slots, "default", {}, void 0, !0)
    ], 36));
  }
}), Ve = /* @__PURE__ */ j(Se, [["__scopeId", "data-v-b798818e"]]), Me = {
  class: "task-repositories",
  "aria-label": "关联 GitHub 仓库"
}, Le = {
  key: 1,
  class: "repo-candidates"
}, Ne = ["onClick"], xe = {
  key: 2,
  role: "alert"
}, Ie = { class: "repo-cards" }, Ee = ["href"], qe = ["aria-label", "onClick"], Pe = { key: 0 }, Re = { key: 1 }, He = { key: 2 }, We = /* @__PURE__ */ X({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {}
  },
  setup(i) {
    const u = i, n = w([]), o = w(""), l = w(""), c = w(!1), p = w(!1);
    function V() {
      try {
        n.value = Z(u.taskId), p.value = !0;
      } catch {
        l.value = "关联记录读取失败，未覆盖已有数据。", p.value = !1;
      }
    }
    function y(m) {
      (m instanceof StorageEvent || m.detail === u.taskId) && V();
    }
    re(() => {
      window.addEventListener("storage", y), window.addEventListener("todoist-repository-links-changed", y);
    }), Q(() => {
      window.removeEventListener("storage", y), window.removeEventListener("todoist-repository-links-changed", y);
    }), E(() => u.taskId, () => {
      n.value = [], o.value = "", c.value = !1, l.value = "", p.value = !1, V();
    }, { immediate: !0 });
    const C = K(() => le.repos.filter((m) => m.full_name.toLowerCase().includes(o.value.toLowerCase()) && !n.value.some((d) => d.fullName === m.full_name)).slice(0, 6));
    function T(m) {
      if (!(!u.taskId || !p.value))
        try {
          ve(u.taskId, m), n.value = m, l.value = "";
        } catch {
          l.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function M(m) {
      let d = m.trim();
      if (d.startsWith("https://"))
        try {
          const g = new URL(d);
          if (g.hostname !== "github.com" || g.username || g.password) throw new Error();
          d = g.pathname.replace(/^\/|\/$/g, "");
        } catch {
          l.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!F(d)) {
        l.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (n.value.some((g) => g.fullName.toLowerCase() === d.toLowerCase())) {
        l.value = "该仓库已关联。";
        return;
      }
      const r = le.repos.find((g) => g.full_name.toLowerCase() === d.toLowerCase());
      T([...n.value, { fullName: d, description: r?.description || "", stars: r?.stargazers_count, language: r?.language || void 0, updated: r?.updated_at }]), l.value || (o.value = "", c.value = !1);
    }
    function L(m) {
      T(n.value.filter((d) => d.fullName !== m));
    }
    return (m, d) => (v(), f("section", Me, [
      a("header", null, [
        d[3] || (d[3] = a("span", null, [
          ie("关联仓库 "),
          a("small", null, "仅本插件")
        ], -1)),
        a("button", {
          type: "button",
          onClick: d[0] || (d[0] = (r) => c.value = !c.value)
        }, "＋ 关联")
      ]),
      c.value ? (v(), f("form", {
        key: 0,
        onSubmit: d[2] || (d[2] = G((r) => M(o.value), ["prevent"]))
      }, [
        de(a("input", {
          "onUpdate:modelValue": d[1] || (d[1] = (r) => o.value = r),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [ce, o.value]
        ]),
        d[4] || (d[4] = a("button", { type: "submit" }, "添加", -1))
      ], 32)) : D("", !0),
      c.value && C.value.length ? (v(), f("div", Le, [
        (v(!0), f(W, null, A(C.value, (r) => (v(), f("button", {
          key: r.full_name,
          type: "button",
          onClick: (g) => M(r.full_name)
        }, h(r.full_name), 9, Ne))), 128))
      ])) : D("", !0),
      l.value ? (v(), f("p", xe, h(l.value), 1)) : D("", !0),
      a("div", Ie, [
        (v(!0), f(W, null, A(n.value, (r) => (v(), f("article", {
          key: r.fullName,
          class: "repo-card"
        }, [
          a("header", null, [
            a("a", {
              href: "https://github.com/" + r.fullName,
              target: "_blank",
              rel: "noreferrer"
            }, [
              d[5] || (d[5] = a("span", { class: "repo-mark" }, "⌘", -1)),
              ie(" " + h(r.fullName), 1)
            ], 8, Ee),
            a("button", {
              type: "button",
              "aria-label": "移除关联 " + r.fullName,
              onClick: (g) => L(r.fullName)
            }, "×", 8, qe)
          ]),
          a("p", null, h(r.description || "GitHub 仓库"), 1),
          a("footer", null, [
            r.stars !== void 0 ? (v(), f("span", Pe, "☆ " + h(r.stars.toLocaleString()), 1)) : D("", !0),
            r.language ? (v(), f("span", Re, h(r.language), 1)) : D("", !0),
            r.updated ? (v(), f("span", He, h(r.updated.slice(0, 10)), 1)) : D("", !0)
          ])
        ]))), 128))
      ])
    ]));
  }
}), vt = /* @__PURE__ */ j(We, [["__scopeId", "data-v-97ac7343"]]), Ae = { class: "todoist-date-popover" }, Fe = {
  key: 0,
  class: "quick-dates-list"
}, Oe = { class: "q-day" }, Be = { class: "q-day" }, Ue = { class: "q-day" }, Ye = {
  key: 1,
  class: "popover-divider"
}, ze = { class: "mini-calendar-section" }, Ge = { class: "cal-nav-row" }, Ke = { class: "cal-month-title" }, Je = { class: "cal-days-grid" }, Qe = ["onClick"], Xe = { class: "cal-footer-section" }, je = { class: "time-picker-row" }, Ze = ["for"], et = { class: "time-input-wrap" }, tt = ["id", "aria-expanded", "aria-activedescendant", "aria-invalid", "aria-describedby"], at = ["id", "aria-selected", "onClick"], nt = {
  key: 0,
  class: "time-input-hint"
}, ot = ["id"], st = /* @__PURE__ */ X({
  __name: "TodoistDatePickerPopover",
  props: {
    modelValue: {},
    timeValue: {},
    anchorEl: {},
    embedded: { type: Boolean }
  },
  emits: ["update:modelValue", "update:timeValue", "change", "timeValidity", "close"],
  setup(i, { emit: u }) {
    const n = i, o = u, l = n.modelValue ? /* @__PURE__ */ new Date(n.modelValue + "T00:00:00") : /* @__PURE__ */ new Date(), c = w(l.getFullYear()), p = w(l.getMonth());
    E(() => n.modelValue, (t) => {
      const e = /* @__PURE__ */ new Date(t + "T00:00:00");
      Number.isFinite(e.getTime()) && (c.value = e.getFullYear(), p.value = e.getMonth());
    });
    function V() {
      p.value === 0 ? (p.value = 11, c.value--) : p.value--;
    }
    function y() {
      p.value === 11 ? (p.value = 0, c.value++) : p.value++;
    }
    function C() {
      const t = /* @__PURE__ */ new Date();
      c.value = t.getFullYear(), p.value = t.getMonth();
    }
    function T(t) {
      const e = /* @__PURE__ */ new Date();
      return e.setDate(e.getDate() + t), ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][e.getDay()];
    }
    function M() {
      const t = /* @__PURE__ */ new Date(), s = (6 - t.getDay() + 7) % 7 || 7;
      return t.setDate(t.getDate() + s), `${t.getMonth() + 1}月${t.getDate()}日`;
    }
    function L(t) {
      const e = t.getFullYear(), s = String(t.getMonth() + 1).padStart(2, "0"), $ = String(t.getDate()).padStart(2, "0");
      return `${e}-${s}-${$}`;
    }
    function m(t) {
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
      const s = L(e);
      o("update:modelValue", s), o("change"), n.embedded || o("close");
    }
    function d(t) {
      o("update:modelValue", t), o("change"), n.embedded || o("close");
    }
    const r = De(), g = r + "-options", k = w(I(n.timeValue || "")), _ = w(""), b = w(!1), O = w(!1), N = w(-1), x = w(null), B = Array.from({ length: 96 }, (t, e) => {
      const s = `${String(Math.floor(e / 4)).padStart(2, "0")}:${String(e % 4 * 15).padStart(2, "0")}`;
      return { value: s, label: I(s) };
    }), q = K(() => {
      const t = k.value.trim().toUpperCase().replace(/\s/g, "");
      return !O.value || !t ? B : B.filter((e) => e.label.replace(/\s/g, "").startsWith(t) || e.value.startsWith(t));
    });
    E(() => n.timeValue, (t) => {
      k.value = I(t || ""), _.value = "";
    });
    function I(t) {
      if (!t) return "";
      const [e, s] = t.split(":").map(Number);
      return `${e % 12 || 12}:${String(s).padStart(2, "0")} ${e >= 12 ? "PM" : "AM"}`;
    }
    function ee(t) {
      const e = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
      if (!e) return null;
      let s = Number(e[1]);
      const $ = Number(e[2] || 0), S = e[3]?.toUpperCase();
      return $ > 59 || (S ? s < 1 || s > 12 : s > 23) ? null : (S && (s = s % 12 + (S === "PM" ? 12 : 0)), `${String(s).padStart(2, "0")}:${String($).padStart(2, "0")}`);
    }
    function te() {
      ue(() => {
        const t = x.value?.querySelector('[aria-selected="true"]'), e = x.value;
        t && e && (e.scrollTop = Math.max(0, t.offsetTop - e.clientHeight / 2 + t.offsetHeight / 2));
      });
    }
    function U() {
      b.value = !0, O.value = !1;
      const t = n.timeValue || `${String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0")}:00`;
      N.value = Math.max(0, B.findIndex((e) => e.value >= t)), te();
    }
    function fe() {
      b.value = !0, O.value = !0, N.value = -1, _.value = "", o("timeValidity", !k.value.trim() || ee(k.value) !== null), x.value && (x.value.scrollTop = 0);
    }
    function Y(t) {
      b.value = !1, _.value = "", o("timeValidity", !0), k.value = I(t), t !== (n.timeValue || "") && ge(t);
    }
    function ae() {
      b.value = !1, _.value = "", k.value = "", o("timeValidity", !0), n.timeValue && (o("update:timeValue", ""), o("change"));
    }
    function ne() {
      if (!k.value.trim())
        return ae(), !0;
      const t = ee(k.value);
      return t === null ? (o("timeValidity", !1), _.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45", !1) : (Y(t), !0);
    }
    function me() {
      b.value = !1, ne();
    }
    function ye(t) {
      if (!t.isComposing) {
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault(), t.stopPropagation(), b.value || U();
          const e = q.value.length;
          e && (N.value = (N.value + (t.key === "ArrowDown" ? 1 : -1) + e) % e), te();
        } else if (t.key === "Enter") {
          t.preventDefault(), t.stopPropagation();
          const e = b.value ? q.value[N.value] : void 0;
          e ? Y(e.value) : ne();
        } else if (t.key === "Escape") {
          if (t.preventDefault(), t.stopPropagation(), !b.value) {
            o("close");
            return;
          }
          b.value = !1, _.value = "", k.value = I(n.timeValue || ""), o("timeValidity", !0);
        }
      }
    }
    function ge(t) {
      o("update:timeValue", t), n.modelValue || o("update:modelValue", L(/* @__PURE__ */ new Date())), o("change");
    }
    const we = K(() => {
      const t = c.value, e = p.value, $ = new Date(t, e, 1).getDay(), S = new Date(t, e, 1 - $), he = L(/* @__PURE__ */ new Date()), oe = [];
      for (let z = 0; z < 42; z++) {
        const P = new Date(S);
        P.setDate(S.getDate() + z);
        const se = L(P);
        oe.push({
          dateStr: se,
          dayNum: P.getDate(),
          isOtherMonth: P.getMonth() !== e,
          isToday: se === he
        });
      }
      return oe;
    });
    return (t, e) => (v(), Ce($e(i.embedded ? "div" : Ve), {
      anchor: i.embedded ? void 0 : i.anchorEl || null,
      onClose: e[8] || (e[8] = (s) => o("close"))
    }, {
      default: Te(() => [
        a("div", Ae, [
          i.embedded ? D("", !0) : (v(), f("div", Fe, [
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[0] || (e[0] = (s) => m("today"))
            }, [
              e[9] || (e[9] = a("span", { class: "q-icon" }, "📅", -1)),
              e[10] || (e[10] = a("span", { class: "q-label" }, "今天", -1)),
              a("span", Oe, h(T(0)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[1] || (e[1] = (s) => m("tomorrow"))
            }, [
              e[11] || (e[11] = a("span", { class: "q-icon" }, "☀️", -1)),
              e[12] || (e[12] = a("span", { class: "q-label" }, "明天", -1)),
              a("span", Be, h(T(1)), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[2] || (e[2] = (s) => m("weekend"))
            }, [
              e[13] || (e[13] = a("span", { class: "q-icon" }, "🛋️", -1)),
              e[14] || (e[14] = a("span", { class: "q-label" }, "这个周末", -1)),
              a("span", Ue, h(M()), 1)
            ]),
            a("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[3] || (e[3] = (s) => m("clear"))
            }, [...e[15] || (e[15] = [
              a("span", { class: "q-icon" }, "⊘", -1),
              a("span", { class: "q-label" }, "没有日期", -1)
            ])])
          ])),
          i.embedded ? D("", !0) : (v(), f("div", Ye)),
          a("div", ze, [
            a("div", Ge, [
              a("span", Ke, h(c.value) + "年 " + h(p.value + 1) + "月", 1),
              a("div", { class: "cal-nav-btns" }, [
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: V
                }, "‹"),
                a("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: C
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
              (v(!0), f(W, null, A(we.value, (s) => (v(), f("button", {
                key: s.dateStr,
                type: "button",
                class: _e(["cal-day-cell", {
                  "is-other-month": s.isOtherMonth,
                  "is-today": s.isToday,
                  "is-selected": s.dateStr === i.modelValue
                }]),
                onClick: ($) => d(s.dateStr)
              }, h(s.dayNum), 11, Qe))), 128))
            ])
          ]),
          e[17] || (e[17] = a("div", { class: "popover-divider" }, null, -1)),
          a("div", Xe, [
            a("div", je, [
              a("label", {
                for: R(r),
                class: "time-icon"
              }, "时间", 8, Ze),
              a("div", et, [
                de(a("input", {
                  id: R(r),
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
                  "aria-activedescendant": b.value && N.value >= 0 ? g + "-" + N.value : void 0,
                  "aria-invalid": !!_.value,
                  "aria-describedby": _.value ? R(r) + "-error" : void 0,
                  onFocus: U,
                  onClick: e[5] || (e[5] = (s) => !b.value && U()),
                  onInput: fe,
                  onBlur: me,
                  onKeydown: ye
                }, null, 40, tt), [
                  [ce, k.value]
                ]),
                b.value ? (v(), f("div", {
                  key: 0,
                  id: g,
                  ref_key: "timeListRef",
                  ref: x,
                  class: "time-suggestions",
                  role: "listbox",
                  "aria-label": "每15分钟的推荐时间"
                }, [
                  (v(!0), f(W, null, A(q.value, (s, $) => (v(), f("button", {
                    id: g + "-" + $,
                    key: s.value,
                    type: "button",
                    class: "time-option",
                    role: "option",
                    tabindex: "-1",
                    "aria-selected": $ === N.value,
                    onPointerdown: e[6] || (e[6] = G(() => {
                    }, ["prevent"])),
                    onClick: (S) => Y(s.value)
                  }, h(s.label), 41, at))), 128)),
                  q.value.length ? D("", !0) : (v(), f("small", nt, "支持任意分钟，按 Enter 确认"))
                ], 512)) : D("", !0)
              ]),
              i.timeValue || k.value ? (v(), f("button", {
                key: 0,
                type: "button",
                class: "time-clear-btn",
                title: "清除具体时间",
                onPointerdown: e[7] || (e[7] = G(() => {
                }, ["prevent"])),
                onClick: ae
              }, "×", 32)) : D("", !0)
            ]),
            _.value ? (v(), f("small", {
              key: 0,
              id: R(r) + "-error",
              class: "time-input-error",
              role: "alert"
            }, h(_.value), 9, ot)) : D("", !0)
          ])
        ])
      ]),
      _: 1
    }, 40, ["anchor"]));
  }
}), ft = /* @__PURE__ */ j(st, [["__scopeId", "data-v-c497f39a"]]);
export {
  Ve as I,
  ft as T,
  vt as a,
  pt as b,
  ct as f,
  Z as r,
  dt as u
};
