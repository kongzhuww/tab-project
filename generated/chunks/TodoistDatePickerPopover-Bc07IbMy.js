import { t as A } from "./module-state-BmW4SrQd.js";
import { y as E, z as j, d as Q, D as re, H as ue, o as v, f, B as ke, J as be, b as w, g as n, n as ie, j as G, m as de, p as ce, h as D, F as W, i as F, t as h, x as J, V as De, e as $e, N as Ce, w as _e, C as Te, u as H } from "./vendor-vue-wIH4jcna.js";
import { t as le } from "./search.service-B8FaDQLd.js";
import { _ as X } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function dt(s, u, a) {
  let o = !1, l;
  const c = E(
    () => [A.dataRevision, s(), A.pendingWrites],
    ([p, V, g], $) => {
      $ && p !== $[0] && (o = !0, u()), l && clearTimeout(l), !(!o || !V || g) && (l = setTimeout(() => {
        l = void 0, !(!s() || A.pendingWrites) && (o = !1, a());
      }, 150));
    }
  );
  j(() => {
    c(), l && clearTimeout(l);
  });
}
function q(s) {
  return typeof s == "string" && s.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(s) && !s.split("/").some((u) => u === "." || u === "..");
}
const Z = "todoist_repository_links_v1:", pe = (s) => Z + s;
function ct(s) {
  if (!q(s)) throw new Error("仓库名称无效");
  const u = [];
  for (let l = 0; l < localStorage.length; l++) {
    const c = localStorage.key(l);
    c?.startsWith(Z) && u.push(c);
  }
  const a = [];
  let o = 0;
  for (const l of u) {
    const c = l.slice(Z.length);
    if (c)
      try {
        O(c).some((p) => p.fullName.toLowerCase() === s.toLowerCase()) && a.push(c);
      } catch {
        o++;
      }
  }
  return { taskIds: a, unreadableCount: o };
}
function O(s) {
  if (!s) return [];
  const u = JSON.parse(localStorage.getItem(pe(s)) || "[]");
  if (!Array.isArray(u)) throw new Error("关联记录格式无效");
  return u.filter((a) => a && q(a.fullName)).map((a) => ({
    fullName: a.fullName,
    description: typeof a.description == "string" ? a.description : "",
    stars: typeof a.stars == "number" && Number.isFinite(a.stars) ? a.stars : void 0,
    language: typeof a.language == "string" ? a.language : void 0,
    updated: typeof a.updated == "string" ? a.updated : void 0
  }));
}
function ve(s, u) {
  if (!s || u.some((a) => !q(a.fullName))) throw new Error("任务或仓库无效");
  localStorage.setItem(pe(s), JSON.stringify(u)), window.dispatchEvent(new CustomEvent("todoist-repository-links-changed", { detail: s }));
}
function pt(s, u) {
  const a = O(s);
  a.some((o) => o.fullName.toLowerCase() === u.fullName.toLowerCase()) || ve(s, [...a, u]);
}
function vt(s, u) {
  if (s)
    try {
      const a = O(s);
      if (a && a.length > 0) return a;
    } catch {
    }
  if (u) {
    const a = u.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
    if (a) {
      const o = `${a[1]}/${a[2].replace(/\.git$/, "")}`;
      if (q(o))
        return [{ fullName: o, description: "" }];
    }
  }
  return [];
}
const Se = /* @__PURE__ */ Q({
  __name: "InspectorPopover",
  props: {
    anchor: {}
  },
  emits: ["close"],
  setup(s, { emit: u }) {
    const a = s, o = u, l = w(null);
    E(() => A.active, (g) => {
      g || (l.value?.hidePopover(), o("close"));
    });
    const c = w({ visibility: "hidden" });
    function p() {
      const g = l.value, $ = a.anchor;
      if (!g || !$?.isConnected) {
        o("close");
        return;
      }
      const _ = $.getBoundingClientRect(), N = Math.min(280, window.innerWidth - 24), L = Math.min(g.scrollHeight + 2, window.innerHeight - 24), m = _.right + N + 8 <= window.innerWidth - 12 ? _.right + 8 : Math.max(12, _.left - N - 8);
      c.value = { position: "fixed", margin: "0", inset: "auto", left: `${m}px`, top: `${Math.max(12, Math.min(_.top, window.innerHeight - L - 12))}px`, width: `${N}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: "visible" };
    }
    function V(g) {
      g.newState === "closed" && o("close");
    }
    return re(async () => {
      await ue(), l.value?.showPopover(), p(), window.addEventListener("resize", p), window.addEventListener("scroll", p, !0);
    }), j(() => {
      window.removeEventListener("resize", p), window.removeEventListener("scroll", p, !0);
    }), (g, $) => (v(), f("div", {
      ref_key: "panel",
      ref: l,
      popover: "auto",
      class: "inspector-popover",
      style: ke(c.value),
      onToggle: V
    }, [
      be(g.$slots, "default", {}, void 0, !0)
    ], 36));
  }
}), Ve = /* @__PURE__ */ X(Se, [["__scopeId", "data-v-b798818e"]]), Ne = {
  class: "task-repositories",
  "aria-label": "关联 GitHub 仓库"
}, Le = {
  key: 1,
  class: "repo-candidates"
}, Me = ["onClick"], xe = {
  key: 2,
  role: "alert"
}, Ie = { class: "repo-cards" }, Ee = ["href"], qe = ["aria-label", "onClick"], Pe = { key: 0 }, Re = { key: 1 }, He = { key: 2 }, Ae = /* @__PURE__ */ Q({
  __name: "TaskRepositoryLinks",
  props: {
    taskId: {}
  },
  setup(s) {
    const u = s, a = w([]), o = w(""), l = w(""), c = w(!1), p = w(!1);
    function V() {
      try {
        a.value = O(u.taskId), p.value = !0;
      } catch {
        l.value = "关联记录读取失败，未覆盖已有数据。", p.value = !1;
      }
    }
    function g(m) {
      (m instanceof StorageEvent || m.detail === u.taskId) && V();
    }
    re(() => {
      window.addEventListener("storage", g), window.addEventListener("todoist-repository-links-changed", g);
    }), j(() => {
      window.removeEventListener("storage", g), window.removeEventListener("todoist-repository-links-changed", g);
    }), E(() => u.taskId, () => {
      a.value = [], o.value = "", c.value = !1, l.value = "", p.value = !1, V();
    }, { immediate: !0 });
    const $ = J(() => le.repos.filter((m) => m.full_name.toLowerCase().includes(o.value.toLowerCase()) && !a.value.some((d) => d.fullName === m.full_name)).slice(0, 6));
    function _(m) {
      if (!(!u.taskId || !p.value))
        try {
          ve(u.taskId, m), a.value = m, l.value = "";
        } catch {
          l.value = "本地保存失败，请检查浏览器存储。";
        }
    }
    function N(m) {
      let d = m.trim();
      if (d.startsWith("https://"))
        try {
          const y = new URL(d);
          if (y.hostname !== "github.com" || y.username || y.password) throw new Error();
          d = y.pathname.replace(/^\/|\/$/g, "");
        } catch {
          l.value = "请填写 GitHub 仓库地址。";
          return;
        }
      if (!q(d)) {
        l.value = "请输入 owner/repo 或完整仓库链接。";
        return;
      }
      if (a.value.some((y) => y.fullName.toLowerCase() === d.toLowerCase())) {
        l.value = "该仓库已关联。";
        return;
      }
      const r = le.repos.find((y) => y.full_name.toLowerCase() === d.toLowerCase());
      _([...a.value, { fullName: d, description: r?.description || "", stars: r?.stargazers_count, language: r?.language || void 0, updated: r?.updated_at }]), l.value || (o.value = "", c.value = !1);
    }
    function L(m) {
      _(a.value.filter((d) => d.fullName !== m));
    }
    return (m, d) => (v(), f("section", Ne, [
      n("header", null, [
        d[3] || (d[3] = n("span", null, [
          ie("关联仓库 "),
          n("small", null, "仅本插件")
        ], -1)),
        n("button", {
          type: "button",
          onClick: d[0] || (d[0] = (r) => c.value = !c.value)
        }, "＋ 关联")
      ]),
      c.value ? (v(), f("form", {
        key: 0,
        onSubmit: d[2] || (d[2] = G((r) => N(o.value), ["prevent"]))
      }, [
        de(n("input", {
          "onUpdate:modelValue": d[1] || (d[1] = (r) => o.value = r),
          placeholder: "搜索已加载仓库，或粘贴 GitHub 仓库链接",
          "aria-label": "仓库名称或链接"
        }, null, 512), [
          [ce, o.value]
        ]),
        d[4] || (d[4] = n("button", { type: "submit" }, "添加", -1))
      ], 32)) : D("", !0),
      c.value && $.value.length ? (v(), f("div", Le, [
        (v(!0), f(W, null, F($.value, (r) => (v(), f("button", {
          key: r.full_name,
          type: "button",
          onClick: (y) => N(r.full_name)
        }, h(r.full_name), 9, Me))), 128))
      ])) : D("", !0),
      l.value ? (v(), f("p", xe, h(l.value), 1)) : D("", !0),
      n("div", Ie, [
        (v(!0), f(W, null, F(a.value, (r) => (v(), f("article", {
          key: r.fullName,
          class: "repo-card"
        }, [
          n("header", null, [
            n("a", {
              href: "https://github.com/" + r.fullName,
              target: "_blank",
              rel: "noreferrer"
            }, [
              d[5] || (d[5] = n("span", { class: "repo-mark" }, "⌘", -1)),
              ie(" " + h(r.fullName), 1)
            ], 8, Ee),
            n("button", {
              type: "button",
              "aria-label": "移除关联 " + r.fullName,
              onClick: (y) => L(r.fullName)
            }, "×", 8, qe)
          ]),
          n("p", null, h(r.description || "GitHub 仓库"), 1),
          n("footer", null, [
            r.stars !== void 0 ? (v(), f("span", Pe, "☆ " + h(r.stars.toLocaleString()), 1)) : D("", !0),
            r.language ? (v(), f("span", Re, h(r.language), 1)) : D("", !0),
            r.updated ? (v(), f("span", He, h(r.updated.slice(0, 10)), 1)) : D("", !0)
          ])
        ]))), 128))
      ])
    ]));
  }
}), ft = /* @__PURE__ */ X(Ae, [["__scopeId", "data-v-97ac7343"]]), We = { class: "todoist-date-popover" }, Fe = {
  key: 0,
  class: "quick-dates-list"
}, Oe = { class: "q-day" }, Be = { class: "q-day" }, ze = { class: "q-day" }, Ue = {
  key: 1,
  class: "popover-divider"
}, Ye = { class: "mini-calendar-section" }, Ke = { class: "cal-nav-row" }, Ge = { class: "cal-month-title" }, Je = { class: "cal-days-grid" }, Ze = ["onClick"], je = { class: "cal-footer-section" }, Qe = { class: "time-picker-row" }, Xe = ["for"], et = { class: "time-input-wrap" }, tt = ["id", "aria-expanded", "aria-activedescendant", "aria-invalid", "aria-describedby"], at = ["id", "aria-selected", "onClick"], nt = {
  key: 0,
  class: "time-input-hint"
}, ot = ["id"], st = /* @__PURE__ */ Q({
  __name: "TodoistDatePickerPopover",
  props: {
    modelValue: {},
    timeValue: {},
    anchorEl: {},
    embedded: { type: Boolean }
  },
  emits: ["update:modelValue", "update:timeValue", "change", "timeValidity", "close"],
  setup(s, { emit: u }) {
    const a = s, o = u, l = a.modelValue ? /* @__PURE__ */ new Date(a.modelValue + "T00:00:00") : /* @__PURE__ */ new Date(), c = w(l.getFullYear()), p = w(l.getMonth());
    E(() => a.modelValue, (t) => {
      const e = /* @__PURE__ */ new Date(t + "T00:00:00");
      Number.isFinite(e.getTime()) && (c.value = e.getFullYear(), p.value = e.getMonth());
    });
    function V() {
      p.value === 0 ? (p.value = 11, c.value--) : p.value--;
    }
    function g() {
      p.value === 11 ? (p.value = 0, c.value++) : p.value++;
    }
    function $() {
      const t = /* @__PURE__ */ new Date();
      c.value = t.getFullYear(), p.value = t.getMonth();
    }
    function _(t) {
      const e = /* @__PURE__ */ new Date();
      return e.setDate(e.getDate() + t), ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][e.getDay()];
    }
    function N() {
      const t = /* @__PURE__ */ new Date(), i = (6 - t.getDay() + 7) % 7 || 7;
      return t.setDate(t.getDate() + i), `${t.getMonth() + 1}月${t.getDate()}日`;
    }
    function L(t) {
      const e = t.getFullYear(), i = String(t.getMonth() + 1).padStart(2, "0"), C = String(t.getDate()).padStart(2, "0");
      return `${e}-${i}-${C}`;
    }
    function m(t) {
      if (t === "clear") {
        o("update:modelValue", ""), o("update:timeValue", ""), o("change"), a.embedded || o("close");
        return;
      }
      const e = /* @__PURE__ */ new Date();
      if (t === "tomorrow")
        e.setDate(e.getDate() + 1);
      else if (t === "weekend") {
        const S = (6 - e.getDay() + 7) % 7 || 7;
        e.setDate(e.getDate() + S);
      }
      const i = L(e);
      o("update:modelValue", i), o("change"), a.embedded || o("close");
    }
    function d(t) {
      o("update:modelValue", t), o("change"), a.embedded || o("close");
    }
    const r = De(), y = r + "-options", b = w(I(a.timeValue || "")), T = w(""), k = w(!1), B = w(!1), M = w(-1), x = w(null), z = Array.from({ length: 96 }, (t, e) => {
      const i = `${String(Math.floor(e / 4)).padStart(2, "0")}:${String(e % 4 * 15).padStart(2, "0")}`;
      return { value: i, label: I(i) };
    }), P = J(() => {
      const t = b.value.trim().toUpperCase().replace(/\s/g, "");
      return !B.value || !t ? z : z.filter((e) => e.label.replace(/\s/g, "").startsWith(t) || e.value.startsWith(t));
    });
    E(() => a.timeValue, (t) => {
      b.value = I(t || ""), T.value = "";
    });
    function I(t) {
      if (!t) return "";
      const [e, i] = t.split(":").map(Number);
      return `${e % 12 || 12}:${String(i).padStart(2, "0")} ${e >= 12 ? "PM" : "AM"}`;
    }
    function ee(t) {
      const e = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
      if (!e) return null;
      let i = Number(e[1]);
      const C = Number(e[2] || 0), S = e[3]?.toUpperCase();
      return C > 59 || (S ? i < 1 || i > 12 : i > 23) ? null : (S && (i = i % 12 + (S === "PM" ? 12 : 0)), `${String(i).padStart(2, "0")}:${String(C).padStart(2, "0")}`);
    }
    function te() {
      ue(() => {
        const t = x.value?.querySelector('[aria-selected="true"]'), e = x.value;
        t && e && (e.scrollTop = Math.max(0, t.offsetTop - e.clientHeight / 2 + t.offsetHeight / 2));
      });
    }
    function U() {
      k.value = !0, B.value = !1;
      const t = a.timeValue || `${String((/* @__PURE__ */ new Date()).getHours()).padStart(2, "0")}:00`;
      M.value = Math.max(0, z.findIndex((e) => e.value >= t)), te();
    }
    function fe() {
      k.value = !0, B.value = !0, M.value = -1, T.value = "", o("timeValidity", !b.value.trim() || ee(b.value) !== null), x.value && (x.value.scrollTop = 0);
    }
    function Y(t) {
      k.value = !1, T.value = "", o("timeValidity", !0), b.value = I(t), t !== (a.timeValue || "") && ye(t);
    }
    function ae() {
      k.value = !1, T.value = "", b.value = "", o("timeValidity", !0), a.timeValue && (o("update:timeValue", ""), o("change"));
    }
    function ne() {
      if (!b.value.trim())
        return ae(), !0;
      const t = ee(b.value);
      return t === null ? (o("timeValidity", !1), T.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45", !1) : (Y(t), !0);
    }
    function me() {
      k.value = !1, ne();
    }
    function ge(t) {
      if (!t.isComposing) {
        if (t.key === "ArrowDown" || t.key === "ArrowUp") {
          t.preventDefault(), t.stopPropagation(), k.value || U();
          const e = P.value.length;
          e && (M.value = (M.value + (t.key === "ArrowDown" ? 1 : -1) + e) % e), te();
        } else if (t.key === "Enter") {
          t.preventDefault(), t.stopPropagation();
          const e = k.value ? P.value[M.value] : void 0;
          e ? Y(e.value) : ne();
        } else if (t.key === "Escape") {
          if (t.preventDefault(), t.stopPropagation(), !k.value) {
            o("close");
            return;
          }
          k.value = !1, T.value = "", b.value = I(a.timeValue || ""), o("timeValidity", !0);
        }
      }
    }
    function ye(t) {
      o("update:timeValue", t), a.modelValue || o("update:modelValue", L(/* @__PURE__ */ new Date())), o("change");
    }
    const we = J(() => {
      const t = c.value, e = p.value, C = new Date(t, e, 1).getDay(), S = new Date(t, e, 1 - C), he = L(/* @__PURE__ */ new Date()), oe = [];
      for (let K = 0; K < 42; K++) {
        const R = new Date(S);
        R.setDate(S.getDate() + K);
        const se = L(R);
        oe.push({
          dateStr: se,
          dayNum: R.getDate(),
          isOtherMonth: R.getMonth() !== e,
          isToday: se === he
        });
      }
      return oe;
    });
    return (t, e) => (v(), $e(Ce(s.embedded ? "div" : Ve), {
      anchor: s.embedded ? void 0 : s.anchorEl || null,
      onClose: e[8] || (e[8] = (i) => o("close"))
    }, {
      default: _e(() => [
        n("div", We, [
          s.embedded ? D("", !0) : (v(), f("div", Fe, [
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[0] || (e[0] = (i) => m("today"))
            }, [
              e[9] || (e[9] = n("span", { class: "q-icon" }, "📅", -1)),
              e[10] || (e[10] = n("span", { class: "q-label" }, "今天", -1)),
              n("span", Oe, h(_(0)), 1)
            ]),
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[1] || (e[1] = (i) => m("tomorrow"))
            }, [
              e[11] || (e[11] = n("span", { class: "q-icon" }, "☀️", -1)),
              e[12] || (e[12] = n("span", { class: "q-label" }, "明天", -1)),
              n("span", Be, h(_(1)), 1)
            ]),
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[2] || (e[2] = (i) => m("weekend"))
            }, [
              e[13] || (e[13] = n("span", { class: "q-icon" }, "🛋️", -1)),
              e[14] || (e[14] = n("span", { class: "q-label" }, "这个周末", -1)),
              n("span", ze, h(N()), 1)
            ]),
            n("button", {
              type: "button",
              class: "quick-date-item",
              onClick: e[3] || (e[3] = (i) => m("clear"))
            }, [...e[15] || (e[15] = [
              n("span", { class: "q-icon" }, "⊘", -1),
              n("span", { class: "q-label" }, "没有日期", -1)
            ])])
          ])),
          s.embedded ? D("", !0) : (v(), f("div", Ue)),
          n("div", Ye, [
            n("div", Ke, [
              n("span", Ge, h(c.value) + "年 " + h(p.value + 1) + "月", 1),
              n("div", { class: "cal-nav-btns" }, [
                n("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: V
                }, "‹"),
                n("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: $
                }, "○"),
                n("button", {
                  type: "button",
                  class: "cal-arrow-btn",
                  onClick: g
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
            n("div", Je, [
              (v(!0), f(W, null, F(we.value, (i) => (v(), f("button", {
                key: i.dateStr,
                type: "button",
                class: Te(["cal-day-cell", {
                  "is-other-month": i.isOtherMonth,
                  "is-today": i.isToday,
                  "is-selected": i.dateStr === s.modelValue
                }]),
                onClick: (C) => d(i.dateStr)
              }, h(i.dayNum), 11, Ze))), 128))
            ])
          ]),
          e[17] || (e[17] = n("div", { class: "popover-divider" }, null, -1)),
          n("div", je, [
            n("div", Qe, [
              n("label", {
                for: H(r),
                class: "time-icon"
              }, "时间", 8, Xe),
              n("div", et, [
                de(n("input", {
                  id: H(r),
                  "onUpdate:modelValue": e[4] || (e[4] = (i) => b.value = i),
                  type: "text",
                  class: "inline-time-input",
                  placeholder: "例如 11:45 PM",
                  autocomplete: "off",
                  spellcheck: "false",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-haspopup": "listbox",
                  "aria-expanded": k.value,
                  "aria-controls": y,
                  "aria-activedescendant": k.value && M.value >= 0 ? y + "-" + M.value : void 0,
                  "aria-invalid": !!T.value,
                  "aria-describedby": T.value ? H(r) + "-error" : void 0,
                  onFocus: U,
                  onClick: e[5] || (e[5] = (i) => !k.value && U()),
                  onInput: fe,
                  onBlur: me,
                  onKeydown: ge
                }, null, 40, tt), [
                  [ce, b.value]
                ]),
                k.value ? (v(), f("div", {
                  key: 0,
                  id: y,
                  ref_key: "timeListRef",
                  ref: x,
                  class: "time-suggestions",
                  role: "listbox",
                  "aria-label": "每15分钟的推荐时间"
                }, [
                  (v(!0), f(W, null, F(P.value, (i, C) => (v(), f("button", {
                    id: y + "-" + C,
                    key: i.value,
                    type: "button",
                    class: "time-option",
                    role: "option",
                    tabindex: "-1",
                    "aria-selected": C === M.value,
                    onPointerdown: e[6] || (e[6] = G(() => {
                    }, ["prevent"])),
                    onClick: (S) => Y(i.value)
                  }, h(i.label), 41, at))), 128)),
                  P.value.length ? D("", !0) : (v(), f("small", nt, "支持任意分钟，按 Enter 确认"))
                ], 512)) : D("", !0)
              ]),
              s.timeValue || b.value ? (v(), f("button", {
                key: 0,
                type: "button",
                class: "time-clear-btn",
                title: "清除具体时间",
                onPointerdown: e[7] || (e[7] = G(() => {
                }, ["prevent"])),
                onClick: ae
              }, "×", 32)) : D("", !0)
            ]),
            T.value ? (v(), f("small", {
              key: 0,
              id: H(r) + "-error",
              class: "time-input-error",
              role: "alert"
            }, h(T.value), 9, ot)) : D("", !0)
          ])
        ])
      ]),
      _: 1
    }, 40, ["anchor"]));
  }
}), mt = /* @__PURE__ */ X(st, [["__scopeId", "data-v-c497f39a"]]);
export {
  Ve as I,
  mt as T,
  ft as a,
  pt as b,
  ct as f,
  vt as g,
  O as r,
  dt as u
};
