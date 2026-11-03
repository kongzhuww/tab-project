import { d as N, b as x, D as P, z as M, o, g as a, F as q, h as n, B as $, u as t, t as d, m as j, i as h, C as m, j as K, y as g } from "./vendor-vue-dDCd4-uG.js";
import { t as w, s as c, d as p, C as e } from "./search.service-CLxaKgY7.js";
import { t as s, _ as U } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
function R(r) {
  const b = r instanceof Element ? r : r instanceof Node ? r.parentElement : null;
  return b ? !!b.closest("input, textarea") || b instanceof HTMLElement && b.isContentEditable : !1;
}
function fe() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (r) => {
    R(r.target) || (r.preventDefault(), r.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (r) => {
    R(r.target) || r.preventDefault();
  }));
}
const J = ["title", "aria-label"], O = ["src"], W = {
  key: 1,
  "aria-hidden": "true"
}, X = ["placeholder", "value"], Y = ["title"], Z = ["title", "aria-label"], ee = ["title"], te = { class: "gh-search-rule-icon" }, se = ["title", "aria-label"], ie = ["title", "aria-label"], ne = ["title", "aria-label", "hidden"], oe = ["hidden"], ae = ["onClick"], ce = ["src"], le = { class: "search-suggestion-main" }, re = { class: "search-suggestion-title" }, ue = {
  key: 0,
  class: "search-suggestion-meta"
}, de = ["title"], he = {
  key: 0,
  class: "badge-icon"
}, ge = /* @__PURE__ */ N({
  __name: "SearchBox",
  setup(r) {
    const b = g(() => e.mode === "web" ? s("search.web.placeholder") : e.mode === "bilibili" ? s("search.bilibili.placeholder") : e.mode === "github" ? s("search.github.placeholder") : e.mode === "netease" ? s("search.netease.placeholder") : e.mode === "qcc" ? s("search.qcc.placeholder") : e.placeholder), f = x(w.searchRule || "exact"), T = g(() => e.hasQuery ? /^\/bm[\s:]/i.test(e.query.trim()) ? s("search.status.bookmarks") : /^\/sites[\s:]/i.test(e.query.trim()) ? s("search.status.sites") : s("search.status.all") : s("search.status.history")), v = g(() => [
      { id: "exact", icon: "🎯", name: s("search.rule.exact"), desc: s("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: s("search.rule.fuzzy"), desc: s("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: s("search.rule.topic"), desc: s("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: s("search.rule.smart"), desc: s("search.rule.smartDesc") }
    ]), y = g(() => v.value.find((i) => i.id === f.value) || v.value[0]);
    function D(i) {
      i.preventDefault(), i.stopPropagation();
      const u = w.cycleSearchRule();
      f.value = u, c.update({
        placeholder: s("search.placeholder.gh", { rule: y.value.name })
      }), e.query && p.scheduleSuggestions(e.query);
    }
    const _ = g(() => e.mode === "netease" && e.isSuggestionsVisible && e.suggestions.length > 0), k = g(() => e.mode === "bilibili" && e.isSuggestionsVisible && e.suggestions.length > 0), S = g(() => e.mode === "qcc" && e.isSuggestionsVisible && e.suggestions.length > 0);
    function E(i) {
      i.preventDefault(), S.value ? c.setSuggestionsVisible(!1) : (e.query && c.setQuery(""), p.loadQccRecommendations(!0));
    }
    function V(i) {
      i.preventDefault(), c.cycleMode();
    }
    function z(i) {
      const u = i.target;
      c.setQuery(u.value);
    }
    function L(i) {
      i.preventDefault(), c.clear();
    }
    function Q() {
      c.submit();
    }
    function F() {
      p.handleFocus();
    }
    function I() {
      e.isSuggestionsVisible || p.handleFocus();
    }
    function A(i) {
      i.preventDefault(), _.value ? c.setSuggestionsVisible(!1) : (e.query && c.setQuery(""), p.loadNeteaseRecentRecommendations(!0));
    }
    function H(i) {
      i.preventDefault(), k.value ? c.setSuggestionsVisible(!1) : (e.query && c.setQuery(""), p.loadBilibiliRecommendations(!0));
    }
    const C = x(null);
    function G(i) {
      c.onSuggestionClick(i);
    }
    function B(i) {
      i.target?.closest("#search") || c.setSuggestionsVisible(!1);
    }
    return P(() => {
      document.addEventListener("click", B), c.setFocusAction(() => {
        C.value?.focus(), p.handleFocus();
      });
    }), M(() => {
      document.removeEventListener("click", B);
    }), (i, u) => (o(), a(q, null, [
      n("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: t(e).toggleTitle,
        "aria-label": t(e).toggleAriaLabel,
        style: $(t(e).modeColor ? { color: t(e).modeColor } : {}),
        onClick: V
      }, [
        t(e).modeIconSrc ? (o(), a("img", {
          key: 0,
          src: t(e).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, O)) : (o(), a("span", W, d(t(e).modeIconText || "⌕"), 1))
      ], 12, J),
      n("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: C,
        placeholder: b.value,
        value: t(e).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: z,
        onFocus: F,
        onClick: I,
        onKeydown: j(Q, ["enter"])
      }, null, 40, X),
      t(e).mode === "web" ? (o(), a("span", {
        key: 0,
        class: "search-web-status",
        title: t(e).hasQuery ? t(s)("search.webStatus.query") : t(s)("search.webStatus.idle")
      }, d(T.value), 9, Y)) : h("", !0),
      t(e).mode === "netease" ? (o(), a("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: m(["search-history-btn", { active: _.value }]),
        type: "button",
        title: t(s)("search.historyBtnTip"),
        "aria-label": t(s)("search.historyBtn"),
        onClick: A
      }, [
        u[0] || (u[0] = n("svg", {
          class: "search-history-icon",
          viewBox: "0 0 24 24",
          width: "13",
          height: "13",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          n("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          n("polyline", { points: "12 6 12 12 16 14" })
        ], -1)),
        n("span", null, d(t(s)("search.historyBtn")), 1)
      ], 10, Z)) : h("", !0),
      t(e).mode === "github" ? (o(), a("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: m(["search-history-btn search-gh-rule-btn", `rule-${y.value.id}`]),
        type: "button",
        title: `当前匹配规则：${y.value.name}（${y.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: D
      }, [
        n("span", te, d(y.value.icon), 1),
        n("span", null, d(y.value.name), 1)
      ], 10, ee)) : h("", !0),
      t(e).mode === "bilibili" ? (o(), a("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: m(["search-history-btn search-bili-btn", { active: k.value }]),
        type: "button",
        title: t(s)("search.biliRecBtnTip"),
        "aria-label": t(s)("search.biliRecBtn"),
        onClick: H
      }, [
        u[1] || (u[1] = n("svg", {
          class: "search-history-icon",
          viewBox: "0 0 24 24",
          width: "13",
          height: "13",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          n("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
        ], -1)),
        n("span", null, d(t(s)("search.biliRecBtn")), 1)
      ], 10, se)) : h("", !0),
      t(e).mode === "qcc" ? (o(), a("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: m(["search-history-btn search-qcc-btn", { active: S.value }]),
        type: "button",
        title: t(s)("search.qccTipsBtnTip"),
        "aria-label": t(s)("search.qccTipsAria"),
        onClick: E
      }, [
        u[2] || (u[2] = n("span", { class: "gh-search-rule-icon" }, "🏢", -1)),
        n("span", null, d(t(s)("search.qccTipsBtn")), 1)
      ], 10, ie)) : h("", !0),
      n("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: t(s)("search.clearBtnTip"),
        "aria-label": t(s)("search.clearBtnTip"),
        hidden: !t(e).hasQuery,
        onClick: L
      }, " ✕ ", 8, ne),
      n("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !t(e).isSuggestionsVisible || !t(e).suggestions.length
      }, [
        (o(!0), a(q, null, K(t(e).suggestions, (l) => (o(), a("button", {
          key: l.id,
          class: "search-suggestion",
          type: "button",
          role: "option",
          onClick: (pe) => G(l)
        }, [
          l.iconSrc ? (o(), a("img", {
            key: 0,
            src: l.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, ce)) : h("", !0),
          n("span", le, [
            n("span", re, d(l.title), 1),
            l.meta ? (o(), a("span", ue, d(l.meta), 1)) : h("", !0)
          ]),
          l.badge ? (o(), a("span", {
            key: 1,
            class: m(["search-suggestion-badge", l.badge.className]),
            title: l.badge.title
          }, [
            l.badge.icon ? (o(), a("i", he, d(l.badge.icon), 1)) : h("", !0),
            n("span", null, d(l.badge.text), 1)
          ], 10, de)) : h("", !0)
        ], 8, ae))), 128))
      ], 8, oe)
    ], 64));
  }
}), ve = /* @__PURE__ */ U(ge, [["__scopeId", "data-v-30692db9"]]);
export {
  ve as S,
  fe as i
};
