import { d as de, b as x, D as he, z as ge, o as g, g as f, F as j, h as c, B as O, u as i, t as v, m as pe, i as y, C as P, j as fe, e as be, k as $, l as me, y as S } from "./vendor-vue-dDCd4-uG.js";
import { a as r, o as N, t as U, s as b, d as C, C as s } from "./search.service-Cd5dZWYh.js";
import { f as B, b as L, l as q, p as ve, c as D, a as ye } from "./store-Bn7vFFtz.js";
import { u as ke } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-C7V50PeG.js";
import { t as a, _ as Se } from "./_plugin-vue_export-helper-CRVO6deU.js";
function X(e) {
  const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
  return t ? !!t.closest("input, textarea") || t instanceof HTMLElement && t.isContentEditable : !1;
}
function Ke() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (e) => {
    X(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (e) => {
    X(e.target) || e.preventDefault();
  }));
}
const T = () => window;
let _ = !1, F, A, M;
function Y(e) {
  return r.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: r.getPageLabel(t) }));
}
function K() {
  if (!B.isOpen || !B.activeFolder) return;
  const e = r.getState(), t = B.activeFolder;
  L.setLinks(e.links.filter((n) => (n.group || "常用网站") === t));
  const u = /* @__PURE__ */ new Map();
  for (const n of e.links) {
    const m = n.group || "常用网站";
    u.has(m) || u.set(m, []), u.get(m).push(n);
  }
  const d = new Map(Object.keys(e.folders).map((n) => [n, N(e.folders, n)])), p = /* @__PURE__ */ new Map();
  for (const n of d.values()) n && p.set(n, (p.get(n) || 0) + 1);
  L.setFolders([...d].filter(([, n]) => n === t).map(([n]) => ({
    groupName: n,
    links: u.get(n) || [],
    count: (u.get(n)?.length || 0) + (p.get(n) || 0)
  })), N(e.folders, t));
}
const Ce = {
  openEditor(e) {
    ye.openEditDialog(e || {});
  },
  openFolder(e = B.activeFolder) {
    if (!e) return;
    const u = r.getState().links.filter((d) => (d.group || "常用网站") === e);
    L.openFolder(e, u), K();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), D.openLinkMenu(e, Y(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, u) {
    t?.preventDefault?.();
    const d = r.getState(), p = u || d.activePage;
    D.openFolderMenu(
      e,
      r.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      Y(p),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), D.openPageMenu(
      e,
      r.getPageLabel(e),
      r.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  async locateLink(e) {
    if (!e) return !1;
    await r.ready;
    const t = r.getState().links.find((p) => String(p.id) === String(e));
    if (!t) return !1;
    const u = t.page || "常用网站";
    r.getState().activePage !== u && await r.setPage(u);
    const d = t.group || "常用网站";
    return d !== "常用网站" ? this.openFolder(d) : B.isOpen && L.closeFolder(), setTimeout(() => {
      const p = `[data-launcher-id="${t.id}"]`, n = document.querySelector(p);
      n && (n.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), n.classList.remove("launcher-locate-highlight"), n.offsetWidth, n.classList.add("launcher-locate-highlight"), setTimeout(() => {
        n.classList.remove("launcher-locate-highlight");
      }, 3200));
    }, 120), !0;
  },
  render() {
    const e = r.getState(), t = r.getPageNames();
    q.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), K();
  },
  start() {
    _ || (_ = !0, q.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: ve,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, u) => this.openFolderMenu(e, u, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), L.setActionHandler((e, t) => {
      e === "close" ? L.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), A = r.subscribe(() => {
      this.render();
    }), M = (e, t) => {
      if (t !== "local") return;
      const u = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, d = {};
      for (const [p, n] of Object.entries(u)) {
        if (!(p in e)) continue;
        const m = e[p].newValue;
        d[n] = n === "links" ? Array.isArray(m) ? m : [] : n === "pages" ? Array.isArray(m) && m.length ? m : ["常用网站"] : n === "activePage" ? m || "常用网站" : m || {};
      }
      Object.keys(d).length && (r.updateState(d), this.render());
    }, T().chrome?.storage?.onChanged?.addListener(M));
  },
  init() {
    return this.start(), F || (F = (async () => {
      await r.ready;
      const e = T().chrome;
      if (!_) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (_) {
        if (!r.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const u = await new Promise((d) => e.topSites.get((p) => d(p || [])));
          if (!_) return;
          r.getState().links.length || (r.updateState({ links: u.slice(0, 14).map((d) => ({
            id: crypto.randomUUID(),
            title: d.title || r.hostOf(d.url),
            url: d.url,
            group: "常用网站"
          })) }), await r.save());
        }
        _ && this.render();
      }
    })().catch((e) => {
      throw F = void 0, e;
    }), F);
  },
  stop() {
    _ = !1, A?.(), A = void 0, M && T().chrome?.storage?.onChanged?.removeListener(M), M = void 0, L.setActionHandler(null), q.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, _e = ["title", "aria-label"], Le = ["src"], we = {
  key: 1,
  "aria-hidden": "true"
}, xe = ["placeholder", "value"], Pe = ["title"], Fe = ["title", "aria-label"], Me = ["title"], Be = { class: "gh-search-rule-icon" }, Re = ["title", "aria-label"], qe = ["title", "aria-label"], De = ["title", "aria-label", "hidden"], Te = ["hidden"], Ae = ["onClick", "onContextmenu"], Ee = ["src"], Ve = { class: "search-suggestion-main" }, ze = { class: "search-suggestion-title" }, Ie = {
  key: 0,
  class: "search-suggestion-meta"
}, Qe = ["title"], Ge = {
  key: 0,
  class: "badge-icon"
}, He = { class: "search-suggestion-menu-header" }, je = { key: 0 }, Oe = /* @__PURE__ */ de({
  __name: "SearchBox",
  setup(e) {
    const t = S(() => s.mode === "web" ? a("search.web.placeholder") : s.mode === "bilibili" ? a("search.bilibili.placeholder") : s.mode === "github" ? a("search.github.placeholder") : s.mode === "netease" ? a("search.netease.placeholder") : s.mode === "qcc" ? a("search.qcc.placeholder") : s.placeholder), u = x(U.searchRule || "exact"), d = S(() => s.hasQuery ? /^\/bm[\s:]/i.test(s.query.trim()) ? a("search.status.bookmarks") : /^\/sites[\s:]/i.test(s.query.trim()) ? a("search.status.sites") : a("search.status.all") : a("search.status.history")), p = S(() => [
      { id: "exact", icon: "🎯", name: a("search.rule.exact"), desc: a("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: a("search.rule.fuzzy"), desc: a("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: a("search.rule.topic"), desc: a("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: a("search.rule.smart"), desc: a("search.rule.smartDesc") }
    ]), n = S(() => p.value.find((l) => l.id === u.value) || p.value[0]);
    function m(l) {
      l.preventDefault(), l.stopPropagation();
      const o = U.cycleSearchRule();
      u.value = o, b.update({
        placeholder: a("search.placeholder.gh", { rule: n.value.name })
      }), s.query && C.scheduleSuggestions(s.query);
    }
    const E = S(() => s.mode === "netease" && s.isSuggestionsVisible && s.suggestions.length > 0), V = S(() => s.mode === "bilibili" && s.isSuggestionsVisible && s.suggestions.length > 0), z = S(() => s.mode === "qcc" && s.isSuggestionsVisible && s.suggestions.length > 0);
    function W(l) {
      l.preventDefault(), z.value ? b.setSuggestionsVisible(!1) : (s.query && b.setQuery(""), C.loadQccRecommendations(!0));
    }
    function J(l) {
      l.preventDefault(), b.cycleMode();
    }
    function Z(l) {
      const o = l.target;
      b.setQuery(o.value);
    }
    function ee(l) {
      l.preventDefault(), b.clear();
    }
    function te() {
      b.submit();
    }
    function se() {
      C.handleFocus();
    }
    function ne() {
      s.isSuggestionsVisible || C.handleFocus();
    }
    function oe(l) {
      l.preventDefault(), E.value ? b.setSuggestionsVisible(!1) : (s.query && b.setQuery(""), C.loadNeteaseRecentRecommendations(!0));
    }
    function ie(l) {
      l.preventDefault(), V.value ? b.setSuggestionsVisible(!1) : (s.query && b.setQuery(""), C.loadBilibiliRecommendations(!0));
    }
    const I = x(null), k = x(null), w = x(!1), Q = x({ x: 0, y: 0 }), { menuRef: ae, style: le } = ke({
      visible: () => w.value,
      anchor: () => Q.value,
      dismiss: () => {
        w.value = !1;
      }
    });
    function re(l, o) {
      o.preventDefault(), o.stopPropagation(), k.value = l, Q.value = { x: o.clientX, y: o.clientY }, w.value = !0;
    }
    const ce = S(() => k.value ? k.value.launcherLinkId ? !0 : k.value.url ? (r.getState().links || []).some((o) => o.url === k.value?.url) : !1 : !1);
    async function ue() {
      const l = k.value;
      if (w.value = !1, !l) return;
      let o = l.launcherLinkId;
      if (!o && l.url) {
        const h = r.getState().links.find((R) => R.url === l.url);
        h && (o = String(h.id));
      }
      o && (b.setSuggestionsVisible(!1), await Ce.locateLink(o));
    }
    function G(l) {
      w.value = !1, b.onSuggestionClick(l);
    }
    function H(l) {
      l.target?.closest("#search") || b.setSuggestionsVisible(!1);
    }
    return he(() => {
      document.addEventListener("click", H), b.setFocusAction(() => {
        I.value?.focus(), C.handleFocus();
      });
    }), ge(() => {
      document.removeEventListener("click", H);
    }), (l, o) => (g(), f(j, null, [
      c("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: i(s).toggleTitle,
        "aria-label": i(s).toggleAriaLabel,
        style: O(i(s).modeColor ? { color: i(s).modeColor } : {}),
        onClick: J
      }, [
        i(s).modeIconSrc ? (g(), f("img", {
          key: 0,
          src: i(s).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, Le)) : (g(), f("span", we, v(i(s).modeIconText || "⌕"), 1))
      ], 12, _e),
      c("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: I,
        placeholder: t.value,
        value: i(s).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: Z,
        onFocus: se,
        onClick: ne,
        onKeydown: pe(te, ["enter"])
      }, null, 40, xe),
      i(s).mode === "web" ? (g(), f("span", {
        key: 0,
        class: "search-web-status",
        title: i(s).hasQuery ? i(a)("search.webStatus.query") : i(a)("search.webStatus.idle")
      }, v(d.value), 9, Pe)) : y("", !0),
      i(s).mode === "netease" ? (g(), f("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: P(["search-history-btn", { active: E.value }]),
        type: "button",
        title: i(a)("search.historyBtnTip"),
        "aria-label": i(a)("search.historyBtn"),
        onClick: oe
      }, [
        o[3] || (o[3] = c("svg", {
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
          c("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }),
          c("polyline", { points: "12 6 12 12 16 14" })
        ], -1)),
        c("span", null, v(i(a)("search.historyBtn")), 1)
      ], 10, Fe)) : y("", !0),
      i(s).mode === "github" ? (g(), f("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: P(["search-history-btn search-gh-rule-btn", `rule-${n.value.id}`]),
        type: "button",
        title: `当前匹配规则：${n.value.name}（${n.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: m
      }, [
        c("span", Be, v(n.value.icon), 1),
        c("span", null, v(n.value.name), 1)
      ], 10, Me)) : y("", !0),
      i(s).mode === "bilibili" ? (g(), f("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: P(["search-history-btn search-bili-btn", { active: V.value }]),
        type: "button",
        title: i(a)("search.biliRecBtnTip"),
        "aria-label": i(a)("search.biliRecBtn"),
        onClick: ie
      }, [
        o[4] || (o[4] = c("svg", {
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
          c("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
        ], -1)),
        c("span", null, v(i(a)("search.biliRecBtn")), 1)
      ], 10, Re)) : y("", !0),
      i(s).mode === "qcc" ? (g(), f("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: P(["search-history-btn search-qcc-btn", { active: z.value }]),
        type: "button",
        title: i(a)("search.qccTipsBtnTip"),
        "aria-label": i(a)("search.qccTipsAria"),
        onClick: W
      }, [
        o[5] || (o[5] = c("span", { class: "gh-search-rule-icon" }, "🏢", -1)),
        c("span", null, v(i(a)("search.qccTipsBtn")), 1)
      ], 10, qe)) : y("", !0),
      c("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: i(a)("search.clearBtnTip"),
        "aria-label": i(a)("search.clearBtnTip"),
        hidden: !i(s).hasQuery,
        onClick: ee
      }, " ✕ ", 8, De),
      c("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !i(s).isSuggestionsVisible || !i(s).suggestions.length
      }, [
        (g(!0), f(j, null, fe(i(s).suggestions, (h) => (g(), f("button", {
          key: h.id,
          class: "search-suggestion",
          type: "button",
          role: "option",
          onClick: (R) => G(h),
          onContextmenu: (R) => re(h, R)
        }, [
          h.iconSrc ? (g(), f("img", {
            key: 0,
            src: h.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, Ee)) : y("", !0),
          c("span", Ve, [
            c("span", ze, v(h.title), 1),
            h.meta ? (g(), f("span", Ie, v(h.meta), 1)) : y("", !0)
          ]),
          h.badge ? (g(), f("span", {
            key: 1,
            class: P(["search-suggestion-badge", h.badge.className]),
            title: h.badge.title
          }, [
            h.badge.icon ? (g(), f("i", Ge, v(h.badge.icon), 1)) : y("", !0),
            c("span", null, v(h.badge.text), 1)
          ], 10, Qe)) : y("", !0)
        ], 40, Ae))), 128))
      ], 8, Te),
      (g(), be(me, { to: "body" }, [
        w.value ? (g(), f("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: ae,
          class: "folder-menu search-suggestion-context-menu",
          role: "menu",
          style: O(i(le)),
          onPointerdown: o[1] || (o[1] = $(() => {
          }, ["stop"])),
          onContextmenu: o[2] || (o[2] = $(() => {
          }, ["prevent", "stop"]))
        }, [
          c("div", He, [
            c("strong", null, v(k.value?.title), 1),
            k.value?.url ? (g(), f("small", je, v(k.value?.url), 1)) : y("", !0)
          ]),
          ce.value ? (g(), f("button", {
            key: 0,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-btn",
            onClick: ue
          }, [...o[6] || (o[6] = [
            c("span", null, "🎯 定位到常用网站", -1)
          ])])) : y("", !0),
          c("button", {
            type: "button",
            class: "search-suggestion-menu-btn",
            onClick: o[0] || (o[0] = (h) => G(k.value))
          }, [...o[7] || (o[7] = [
            c("span", null, "🔗 打开此网页", -1)
          ])])
        ], 36)) : y("", !0)
      ]))
    ], 64));
  }
}), We = /* @__PURE__ */ Se(Oe, [["__scopeId", "data-v-295e49a4"]]);
export {
  We as S,
  Ke as i,
  Ce as l
};
