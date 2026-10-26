import { d as z, b as f, C as N, y as P, o as i, e as l, F as R, f as s, A as j, u as n, t as h, k as K, B as b, g as u, h as U, s as y } from "./vendor-vue-DokqDua_.js";
import { t as x, d, s as o, C as e } from "./search.service-Du6XfCKa.js";
function B(r) {
  const g = r instanceof Element ? r : r instanceof Node ? r.parentElement : null;
  return g ? !!g.closest("input, textarea") || g instanceof HTMLElement && g.isContentEditable : !1;
}
function he() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (r) => {
    B(r.target) || (r.preventDefault(), r.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (r) => {
    B(r.target) || r.preventDefault();
  }));
}
const O = ["title", "aria-label"], J = ["src"], X = {
  key: 1,
  "aria-hidden": "true"
}, Y = ["placeholder", "value"], Z = ["title"], ee = { class: "gh-search-rule-icon" }, te = ["hidden"], se = ["hidden"], ne = ["onClick"], oe = ["src"], ie = { class: "search-suggestion-main" }, le = { class: "search-suggestion-title" }, ae = {
  key: 0,
  class: "search-suggestion-meta"
}, ce = ["title"], re = {
  key: 0,
  class: "badge-icon"
}, pe = /* @__PURE__ */ z({
  __name: "SearchBox",
  setup(r) {
    const g = f(x.searchRule || "exact"), V = f(d.webScope || "all"), m = [
      { id: "all", icon: "🌐", name: "全部", placeholder: "搜索，或输入网址直接打开", desc: "同时检索常用网站、书签与网页" },
      { id: "bookmarks", icon: "🔖", name: "书签", placeholder: "在书签中搜索…", desc: "仅在浏览器书签中查找" },
      { id: "launcher", icon: "⭐", name: "常用网站", placeholder: "在常用网站中搜索…", desc: "仅在首页常用网站中查找" }
    ], q = y(() => m.find((t) => t.id === V.value) || m[0]), v = y(() => e.mode === "web" && e.isSuggestionsVisible && e.suggestions.length > 0);
    function D(t) {
      t.preventDefault(), v.value ? o.setSuggestionsVisible(!1) : (e.query && o.setQuery(""), d.loadWebRecentRecommendations(!0));
    }
    const k = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], p = y(() => k.find((t) => t.id === g.value) || k[0]);
    function H(t) {
      t.preventDefault(), t.stopPropagation();
      const a = x.cycleSearchRule();
      g.value = a, o.update({
        placeholder: `${p.value.name}搜索 GitHub 仓库…`
      }), e.query && d.scheduleSuggestions(e.query);
    }
    const _ = y(() => e.mode === "netease" && e.isSuggestionsVisible && e.suggestions.length > 0), C = y(() => e.mode === "bilibili" && e.isSuggestionsVisible && e.suggestions.length > 0), S = y(() => e.mode === "qcc" && e.isSuggestionsVisible && e.suggestions.length > 0);
    function T(t) {
      t.preventDefault(), S.value ? o.setSuggestionsVisible(!1) : (e.query && o.setQuery(""), d.loadQccRecommendations(!0));
    }
    function A(t) {
      t.preventDefault(), o.cycleMode();
    }
    function L(t) {
      const a = t.target;
      o.setQuery(a.value);
    }
    function Q(t) {
      t.preventDefault(), o.clear();
    }
    function F() {
      o.submit();
    }
    function I() {
      d.handleFocus();
    }
    function G() {
      e.isSuggestionsVisible || d.handleFocus();
    }
    function M(t) {
      t.preventDefault(), _.value ? o.setSuggestionsVisible(!1) : (e.query && o.setQuery(""), d.loadNeteaseRecentRecommendations(!0));
    }
    function W(t) {
      t.preventDefault(), C.value ? o.setSuggestionsVisible(!1) : (e.query && o.setQuery(""), d.loadBilibiliRecommendations(!0));
    }
    const w = f(null);
    function $(t) {
      o.onSuggestionClick(t);
    }
    function E(t) {
      t.target?.closest("#search") || o.setSuggestionsVisible(!1);
    }
    return N(() => {
      document.addEventListener("click", E), o.setFocusAction(() => {
        w.value?.focus(), d.handleFocus();
      });
    }), P(() => {
      document.removeEventListener("click", E);
    }), (t, a) => (i(), l(R, null, [
      s("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: n(e).toggleTitle,
        "aria-label": n(e).toggleAriaLabel,
        style: j(n(e).modeColor ? { color: n(e).modeColor } : {}),
        onClick: A
      }, [
        n(e).modeIconSrc ? (i(), l("img", {
          key: 0,
          src: n(e).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, J)) : (i(), l("span", X, h(n(e).modeIconText || "⌕"), 1))
      ], 12, O),
      s("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: w,
        placeholder: n(e).placeholder,
        value: n(e).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: L,
        onFocus: I,
        onClick: G,
        onKeydown: K(F, ["enter"])
      }, null, 40, Y),
      n(e).mode === "web" ? (i(), l("button", {
        key: 0,
        id: "search-web-scope-btn",
        class: b(["search-history-btn search-web-scope-btn", [`scope-${q.value.id}`, { active: v.value }]]),
        type: "button",
        title: "点击查看最近的常用网站与书签历史记录",
        "aria-label": "历史记录",
        onClick: D
      }, [...a[0] || (a[0] = [
        s("svg", {
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
          s("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          s("polyline", { points: "12 6 12 12 16 14" })
        ], -1),
        s("span", null, "历史记录", -1)
      ])], 2)) : u("", !0),
      n(e).mode === "netease" ? (i(), l("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: b(["search-history-btn", { active: _.value }]),
        type: "button",
        title: "历史记录（点击加载或收起最近播放）",
        "aria-label": "历史记录",
        onClick: M
      }, [...a[1] || (a[1] = [
        s("svg", {
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
          s("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          s("polyline", { points: "12 6 12 12 16 14" })
        ], -1),
        s("span", null, "历史记录", -1)
      ])], 2)) : u("", !0),
      n(e).mode === "github" ? (i(), l("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: b(["search-history-btn search-gh-rule-btn", `rule-${p.value.id}`]),
        type: "button",
        title: `当前匹配规则：${p.value.name}（${p.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: H
      }, [
        s("span", ee, h(p.value.icon), 1),
        s("span", null, h(p.value.name), 1)
      ], 10, Z)) : u("", !0),
      n(e).mode === "bilibili" ? (i(), l("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: b(["search-history-btn search-bili-btn", { active: C.value }]),
        type: "button",
        title: "热门推荐（点击加载或收起B站热门推荐）",
        "aria-label": "热门推荐",
        onClick: W
      }, [...a[2] || (a[2] = [
        s("svg", {
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
          s("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
        ], -1),
        s("span", null, "推荐", -1)
      ])], 2)) : u("", !0),
      n(e).mode === "qcc" ? (i(), l("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: b(["search-history-btn search-qcc-btn", { active: S.value }]),
        type: "button",
        title: "查企业指南（点击查看企查查/老板/税号检索指引）",
        "aria-label": "企业查询指引",
        onClick: T
      }, [...a[3] || (a[3] = [
        s("span", { class: "gh-search-rule-icon" }, "🏢", -1),
        s("span", null, "查企业", -1)
      ])], 2)) : u("", !0),
      s("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: "清空搜索内容",
        "aria-label": "清空搜索内容",
        hidden: !n(e).hasQuery,
        onClick: Q
      }, " ✕ ", 8, te),
      s("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !n(e).isSuggestionsVisible || !n(e).suggestions.length
      }, [
        (i(!0), l(R, null, U(n(e).suggestions, (c) => (i(), l("button", {
          key: c.id,
          class: "search-suggestion",
          type: "button",
          role: "option",
          onClick: (ue) => $(c)
        }, [
          c.iconSrc ? (i(), l("img", {
            key: 0,
            src: c.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, oe)) : u("", !0),
          s("span", ie, [
            s("span", le, h(c.title), 1),
            c.meta ? (i(), l("span", ae, h(c.meta), 1)) : u("", !0)
          ]),
          c.badge ? (i(), l("span", {
            key: 1,
            class: b(["search-suggestion-badge", c.badge.className]),
            title: c.badge.title
          }, [
            c.badge.icon ? (i(), l("i", re, h(c.badge.icon), 1)) : u("", !0),
            s("span", null, h(c.badge.text), 1)
          ], 10, ce)) : u("", !0)
        ], 8, ne))), 128))
      ], 8, se)
    ], 64));
  }
});
export {
  pe as _,
  he as i
};
