import { d as G, b as S, C as z, y as N, o, e as i, F as x, f as n, A as $, u as s, t as d, k as M, g as u, B as b, h as P, s as y } from "./vendor-vue-DokqDua_.js";
import { t as R, s as a, d as h, C as e } from "./search.service-D8BPpHmG.js";
import { _ as j } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function w(c) {
  const g = c instanceof Element ? c : c instanceof Node ? c.parentElement : null;
  return g ? !!g.closest("input, textarea") || g instanceof HTMLElement && g.isContentEditable : !1;
}
function he() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (c) => {
    w(c.target) || (c.preventDefault(), c.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (c) => {
    w(c.target) || c.preventDefault();
  }));
}
const K = ["title", "aria-label"], U = ["src"], J = {
  key: 1,
  "aria-hidden": "true"
}, O = ["placeholder", "value"], W = ["title"], X = ["title"], Y = { class: "gh-search-rule-icon" }, Z = ["hidden"], ee = ["hidden"], te = ["onClick"], se = ["src"], ne = { class: "search-suggestion-main" }, oe = { class: "search-suggestion-title" }, ie = {
  key: 0,
  class: "search-suggestion-meta"
}, ae = ["title"], le = {
  key: 0,
  class: "badge-icon"
}, ce = /* @__PURE__ */ G({
  __name: "SearchBox",
  setup(c) {
    const g = S(R.searchRule || "exact"), E = y(() => e.hasQuery ? /^\/bm[\s:]/i.test(e.query.trim()) ? "书签结果" : /^\/sites[\s:]/i.test(e.query.trim()) ? "网站结果" : "全部结果" : "历史记录"), m = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], p = y(() => m.find((t) => t.id === g.value) || m[0]);
    function B(t) {
      t.preventDefault(), t.stopPropagation();
      const r = R.cycleSearchRule();
      g.value = r, a.update({
        placeholder: `${p.value.name}搜索 GitHub 仓库…`
      }), e.query && h.scheduleSuggestions(e.query);
    }
    const f = y(() => e.mode === "netease" && e.isSuggestionsVisible && e.suggestions.length > 0), v = y(() => e.mode === "bilibili" && e.isSuggestionsVisible && e.suggestions.length > 0), k = y(() => e.mode === "qcc" && e.isSuggestionsVisible && e.suggestions.length > 0);
    function q(t) {
      t.preventDefault(), k.value ? a.setSuggestionsVisible(!1) : (e.query && a.setQuery(""), h.loadQccRecommendations(!0));
    }
    function V(t) {
      t.preventDefault(), a.cycleMode();
    }
    function D(t) {
      const r = t.target;
      a.setQuery(r.value);
    }
    function L(t) {
      t.preventDefault(), a.clear();
    }
    function Q() {
      a.submit();
    }
    function T() {
      h.handleFocus();
    }
    function F() {
      e.isSuggestionsVisible || h.handleFocus();
    }
    function H(t) {
      t.preventDefault(), f.value ? a.setSuggestionsVisible(!1) : (e.query && a.setQuery(""), h.loadNeteaseRecentRecommendations(!0));
    }
    function I(t) {
      t.preventDefault(), v.value ? a.setSuggestionsVisible(!1) : (e.query && a.setQuery(""), h.loadBilibiliRecommendations(!0));
    }
    const _ = S(null);
    function A(t) {
      a.onSuggestionClick(t);
    }
    function C(t) {
      t.target?.closest("#search") || a.setSuggestionsVisible(!1);
    }
    return z(() => {
      document.addEventListener("click", C), a.setFocusAction(() => {
        _.value?.focus(), h.handleFocus();
      });
    }), N(() => {
      document.removeEventListener("click", C);
    }), (t, r) => (o(), i(x, null, [
      n("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: s(e).toggleTitle,
        "aria-label": s(e).toggleAriaLabel,
        style: $(s(e).modeColor ? { color: s(e).modeColor } : {}),
        onClick: V
      }, [
        s(e).modeIconSrc ? (o(), i("img", {
          key: 0,
          src: s(e).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, U)) : (o(), i("span", J, d(s(e).modeIconText || "⌕"), 1))
      ], 12, K),
      n("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: _,
        placeholder: s(e).placeholder,
        value: s(e).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: D,
        onFocus: T,
        onClick: F,
        onKeydown: M(Q, ["enter"])
      }, null, 40, O),
      s(e).mode === "web" ? (o(), i("span", {
        key: 0,
        class: "search-web-status",
        title: s(e).hasQuery ? "按匹配度排序；普通关键词同时匹配历史、书签和常用网站，/bm 与 /sites 可明确限定范围" : "点击搜索栏显示最近点击记录；输入后搜索全部来源"
      }, d(E.value), 9, W)) : u("", !0),
      s(e).mode === "netease" ? (o(), i("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: b(["search-history-btn", { active: f.value }]),
        type: "button",
        title: "历史记录（点击加载或收起最近播放）",
        "aria-label": "历史记录",
        onClick: H
      }, [...r[0] || (r[0] = [
        n("svg", {
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
        ], -1),
        n("span", null, "历史记录", -1)
      ])], 2)) : u("", !0),
      s(e).mode === "github" ? (o(), i("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: b(["search-history-btn search-gh-rule-btn", `rule-${p.value.id}`]),
        type: "button",
        title: `当前匹配规则：${p.value.name}（${p.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: B
      }, [
        n("span", Y, d(p.value.icon), 1),
        n("span", null, d(p.value.name), 1)
      ], 10, X)) : u("", !0),
      s(e).mode === "bilibili" ? (o(), i("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: b(["search-history-btn search-bili-btn", { active: v.value }]),
        type: "button",
        title: "热门推荐（点击加载或收起B站热门推荐）",
        "aria-label": "热门推荐",
        onClick: I
      }, [...r[1] || (r[1] = [
        n("svg", {
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
        ], -1),
        n("span", null, "推荐", -1)
      ])], 2)) : u("", !0),
      s(e).mode === "qcc" ? (o(), i("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: b(["search-history-btn search-qcc-btn", { active: k.value }]),
        type: "button",
        title: "查企业指南（点击查看企查查/老板/税号检索指引）",
        "aria-label": "企业查询指引",
        onClick: q
      }, [...r[2] || (r[2] = [
        n("span", { class: "gh-search-rule-icon" }, "🏢", -1),
        n("span", null, "查企业", -1)
      ])], 2)) : u("", !0),
      n("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: "清空搜索内容",
        "aria-label": "清空搜索内容",
        hidden: !s(e).hasQuery,
        onClick: L
      }, " ✕ ", 8, Z),
      n("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !s(e).isSuggestionsVisible || !s(e).suggestions.length
      }, [
        (o(!0), i(x, null, P(s(e).suggestions, (l) => (o(), i("button", {
          key: l.id,
          class: "search-suggestion",
          type: "button",
          role: "option",
          onClick: (re) => A(l)
        }, [
          l.iconSrc ? (o(), i("img", {
            key: 0,
            src: l.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, se)) : u("", !0),
          n("span", ne, [
            n("span", oe, d(l.title), 1),
            l.meta ? (o(), i("span", ie, d(l.meta), 1)) : u("", !0)
          ]),
          l.badge ? (o(), i("span", {
            key: 1,
            class: b(["search-suggestion-badge", l.badge.className]),
            title: l.badge.title
          }, [
            l.badge.icon ? (o(), i("i", le, d(l.badge.icon), 1)) : u("", !0),
            n("span", null, d(l.badge.text), 1)
          ], 10, ae)) : u("", !0)
        ], 8, te))), 128))
      ], 8, ee)
    ], 64));
  }
}), pe = /* @__PURE__ */ j(ce, [["__scopeId", "data-v-9b0d1a73"]]);
export {
  pe as S,
  he as i
};
