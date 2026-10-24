import { f as ne, b as M, o as oe, d as se, g as a, h as c, F as N, i as s, B as ie, x as i, t as v, A as le, s as C, u as p, z as ae, c as _, n as E, r as I } from "./vendor-vue-BUkfvXUI.js";
import { c as O, s as g, q as l, p as t, w as $, r as W } from "./search.service-CipPV7Bz.js";
import { g as h, w as m, b as w, a as ce, i as D, f as z, h as re, j as ue } from "./read-session-BWENvNUM.js";
function G(e) {
  const n = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
  return n ? !!n.closest("input, textarea") || n instanceof HTMLElement && n.isContentEditable : !1;
}
function Te() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (e) => {
    G(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (e) => {
    G(e.target) || e.preventDefault();
  }));
}
const de = ["title", "aria-label"], pe = ["src"], ge = {
  key: 1,
  "aria-hidden": "true"
}, fe = ["placeholder", "value"], he = ["title"], be = { class: "gh-search-rule-icon" }, me = ["hidden"], ye = ["hidden"], ke = ["onClick"], ve = ["src"], we = { class: "search-suggestion-main" }, Se = { class: "search-suggestion-title" }, Ce = {
  key: 0,
  class: "search-suggestion-meta"
}, _e = ["title"], Re = {
  key: 0,
  class: "badge-icon"
}, Be = /* @__PURE__ */ ne({
  __name: "SearchBox",
  setup(e) {
    const n = M(O.searchRule || "exact"), d = M(g.webScope || "all"), y = [
      { id: "all", icon: "🌐", name: "全部", placeholder: "搜索，或输入网址直接打开", desc: "同时检索常用网站、书签与网页" },
      { id: "bookmarks", icon: "🔖", name: "书签", placeholder: "在书签中搜索…", desc: "仅在浏览器书签中查找" },
      { id: "launcher", icon: "⭐", name: "常用网站", placeholder: "在常用网站中搜索…", desc: "仅在首页常用网站中查找" }
    ], k = _(() => y.find((o) => o.id === d.value) || y[0]), R = _(() => t.mode === "web" && t.isSuggestionsVisible && t.suggestions.length > 0);
    function B(o) {
      o.preventDefault(), R.value ? l.setSuggestionsVisible(!1) : (t.query && l.setQuery(""), g.loadWebRecentRecommendations(!0));
    }
    const A = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], b = _(() => A.find((o) => o.id === n.value) || A[0]);
    function V(o) {
      o.preventDefault(), o.stopPropagation();
      const r = O.cycleSearchRule();
      n.value = r, l.update({
        placeholder: `${b.value.name}搜索 GitHub 仓库…`
      }), t.query && g.scheduleSuggestions(t.query);
    }
    const x = _(() => t.mode === "netease" && t.isSuggestionsVisible && t.suggestions.length > 0), H = _(() => t.mode === "bilibili" && t.isSuggestionsVisible && t.suggestions.length > 0), L = _(() => t.mode === "qcc" && t.isSuggestionsVisible && t.suggestions.length > 0);
    function P(o) {
      o.preventDefault(), L.value ? l.setSuggestionsVisible(!1) : (t.query && l.setQuery(""), g.loadQccRecommendations(!0));
    }
    function U(o) {
      o.preventDefault(), l.cycleMode();
    }
    function j(o) {
      const r = o.target;
      l.setQuery(r.value);
    }
    function K(o) {
      o.preventDefault(), l.clear();
    }
    function J() {
      l.submit();
    }
    function X() {
      g.handleFocus();
    }
    function Y() {
      t.isSuggestionsVisible || g.handleFocus();
    }
    function Z(o) {
      o.preventDefault(), x.value ? l.setSuggestionsVisible(!1) : (t.query && l.setQuery(""), g.loadNeteaseRecentRecommendations(!0));
    }
    function ee(o) {
      o.preventDefault(), H.value ? l.setSuggestionsVisible(!1) : (t.query && l.setQuery(""), g.loadBilibiliRecommendations(!0));
    }
    const Q = M(null);
    function te(o) {
      l.onSuggestionClick(o);
    }
    function F(o) {
      o.target?.closest("#search") || l.setSuggestionsVisible(!1);
    }
    return oe(() => {
      document.addEventListener("click", F), l.setFocusAction(() => {
        Q.value?.focus(), g.handleFocus();
      });
    }), se(() => {
      document.removeEventListener("click", F);
    }), (o, r) => (a(), c(N, null, [
      s("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: i(t).toggleTitle,
        "aria-label": i(t).toggleAriaLabel,
        style: ie(i(t).modeColor ? { color: i(t).modeColor } : {}),
        onClick: U
      }, [
        i(t).modeIconSrc ? (a(), c("img", {
          key: 0,
          src: i(t).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, pe)) : (a(), c("span", ge, v(i(t).modeIconText || "⌕"), 1))
      ], 12, de),
      s("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: Q,
        placeholder: i(t).placeholder,
        value: i(t).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: j,
        onFocus: X,
        onClick: Y,
        onKeydown: le(J, ["enter"])
      }, null, 40, fe),
      i(t).mode === "web" ? (a(), c("button", {
        key: 0,
        id: "search-web-scope-btn",
        class: C(["search-history-btn search-web-scope-btn", [`scope-${k.value.id}`, { active: R.value }]]),
        type: "button",
        title: "点击查看最近的常用网站与书签历史记录",
        "aria-label": "历史记录",
        onClick: B
      }, [...r[0] || (r[0] = [
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
      ])], 2)) : p("", !0),
      i(t).mode === "netease" ? (a(), c("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: C(["search-history-btn", { active: x.value }]),
        type: "button",
        title: "历史记录（点击加载或收起最近播放）",
        "aria-label": "历史记录",
        onClick: Z
      }, [...r[1] || (r[1] = [
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
      ])], 2)) : p("", !0),
      i(t).mode === "github" ? (a(), c("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: C(["search-history-btn search-gh-rule-btn", `rule-${b.value.id}`]),
        type: "button",
        title: `当前匹配规则：${b.value.name}（${b.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: V
      }, [
        s("span", be, v(b.value.icon), 1),
        s("span", null, v(b.value.name), 1)
      ], 10, he)) : p("", !0),
      i(t).mode === "bilibili" ? (a(), c("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: C(["search-history-btn search-bili-btn", { active: H.value }]),
        type: "button",
        title: "热门推荐（点击加载或收起B站热门推荐）",
        "aria-label": "热门推荐",
        onClick: ee
      }, [...r[2] || (r[2] = [
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
      ])], 2)) : p("", !0),
      i(t).mode === "qcc" ? (a(), c("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: C(["search-history-btn search-qcc-btn", { active: L.value }]),
        type: "button",
        title: "查企业指南（点击查看企查查/老板/税号检索指引）",
        "aria-label": "企业查询指引",
        onClick: P
      }, [...r[3] || (r[3] = [
        s("span", { class: "gh-search-rule-icon" }, "🏢", -1),
        s("span", null, "查企业", -1)
      ])], 2)) : p("", !0),
      s("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: "清空搜索内容",
        "aria-label": "清空搜索内容",
        hidden: !i(t).hasQuery,
        onClick: K
      }, " ✕ ", 8, me),
      s("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !i(t).isSuggestionsVisible || !i(t).suggestions.length
      }, [
        (a(!0), c(N, null, ae(i(t).suggestions, (u) => (a(), c("button", {
          key: u.id,
          class: "search-suggestion",
          type: "button",
          role: "option",
          onClick: (xe) => te(u)
        }, [
          u.iconSrc ? (a(), c("img", {
            key: 0,
            src: u.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, ve)) : p("", !0),
          s("span", we, [
            s("span", Se, v(u.title), 1),
            u.meta ? (a(), c("span", Ce, v(u.meta), 1)) : p("", !0)
          ]),
          u.badge ? (a(), c("span", {
            key: 1,
            class: C(["search-suggestion-badge", u.badge.className]),
            title: u.badge.title
          }, [
            u.badge.icon ? (a(), c("i", Re, v(u.badge.icon), 1)) : p("", !0),
            s("span", null, v(u.badge.text), 1)
          ], 10, _e)) : p("", !0)
        ], 8, ke))), 128))
      ], 8, ye)
    ], 64));
  }
}), T = I(/* @__PURE__ */ new Set()), S = I({}), f = I({});
function q(e) {
  const n = h(e);
  if (!n?.lifecycle.canUnmount || n.lifecycle.canUnmount()) return { ok: !0 };
  const d = n.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return $.show({ appName: n.title, title: "操作进行中", message: d, showActions: !1 }), { ok: !1, error: d };
}
const Me = {
  // 检查应用是否在内存中运行（驱动 Dock 上的小圆点）
  isRunning(e) {
    return T.has(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const n = h(e);
    return n ? n.lifecycle.isVisible() : D(e) ? !!re[e] : ue(e);
  },
  // 标记应用启动
  markRunning(e) {
    T.add(e), (e in f || h(e)) && (f[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return S[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const n = h(e);
    if (n) {
      m.open(e), n.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), D(e)) {
      z.open(e);
      return;
    }
    m.open(e);
  },
  // 隐藏窗口（应用仍保留在后台内存中保活）
  hideApp(e) {
    if (h(e)) {
      m.close(e);
      return;
    }
    if (D(e)) {
      z.close(e);
      return;
    }
    m.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (h(e)) {
      const k = q(e);
      if (!k.ok) return k;
      const R = h(e)?.lifecycle.beforeQuit;
      if (R) {
        const b = w(e);
        try {
          await R();
        } catch {
          const x = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return $.show({ appName: h(e).title, title: "未退出", message: x, showActions: !1 }), { ok: !1, error: x };
        }
        if (w(e) !== b) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const V = q(e);
        if (!V.ok) return V;
      }
      const B = m.close(e), A = w(e);
      return T.delete(e), f[e] = !1, W.removeActiveTool(e), await B, await E(), w(e) === A ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), T.delete(e), W.removeActiveTool(e), e in f && (f[e] = !1);
    const n = ce;
    n.activeId === e && (n.activeId = "");
    const d = n.openOrder.indexOf(e);
    d >= 0 && n.openOrder.splice(d, 1);
    const y = n.activeTools.indexOf(e);
    y >= 0 && n.activeTools.splice(y, 1), m.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const n = h(e);
    if (n) {
      if (n.lifecycle.canOpen && !n.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const d = q(e);
      if (!d.ok) return d;
      const y = m.close(e), k = w(e);
      return await y, w(e) !== k ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (f[e] = !1, await E(), w(e) !== k ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (S[e] = (S[e] || 0) + 1, m.open(e), n.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in f ? (f[e] = !1, await E(), S[e] = (S[e] || 0) + 1, f[e] = !0) : S[e] = (S[e] || 0) + 1, await E(), this.openApp(e);
  }
};
export {
  Be as _,
  f as a,
  Me as d,
  Te as i,
  T as r
};
