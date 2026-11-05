import { d as ve, b as F, w as U, D as ke, z as ye, o as h, g as f, F as X, h as c, B as Y, u as l, t as S, i as w, C as B, j as Se, e as we, k as W, l as Le, y as L } from "./vendor-vue-D8gPZiit.js";
import { a as u, o as K, t as J, s as b, d as x, D as s } from "./search.service-B9qkjmAV.js";
import { f as R, b as P, l as I, p as Ce, c as T, a as _e } from "./store-D1G_SPBq.js";
import { u as xe } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { t as a, _ as Me } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
function Z(e) {
  const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
  return t ? !!t.closest("input, textarea") || t instanceof HTMLElement && t.isContentEditable : !1;
}
function st() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (e) => {
    Z(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (e) => {
    Z(e.target) || e.preventDefault();
  }));
}
const E = () => window;
let M = !1, D, A, q;
function ee(e) {
  return u.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: u.getPageLabel(t) }));
}
function te() {
  if (!R.isOpen || !R.activeFolder) return;
  const e = u.getState(), t = R.activeFolder;
  P.setLinks(e.links.filter((i) => (i.group || "常用网站") === t));
  const d = /* @__PURE__ */ new Map();
  for (const i of e.links) {
    const k = i.group || "常用网站";
    d.has(k) || d.set(k, []), d.get(k).push(i);
  }
  const g = new Map(Object.keys(e.folders).map((i) => [i, K(e.folders, i)])), p = /* @__PURE__ */ new Map();
  for (const i of g.values()) i && p.set(i, (p.get(i) || 0) + 1);
  P.setFolders([...g].filter(([, i]) => i === t).map(([i]) => ({
    groupName: i,
    links: d.get(i) || [],
    count: (d.get(i)?.length || 0) + (p.get(i) || 0)
  })), K(e.folders, t));
}
const Pe = {
  openEditor(e) {
    _e.openEditDialog(e || {});
  },
  openFolder(e = R.activeFolder) {
    if (!e) return;
    const d = u.getState().links.filter((g) => (g.group || "常用网站") === e);
    P.openFolder(e, d), te();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), T.openLinkMenu(e, ee(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, d) {
    t?.preventDefault?.();
    const g = u.getState(), p = d || g.activePage;
    T.openFolderMenu(
      e,
      u.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      ee(p),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), T.openPageMenu(
      e,
      u.getPageLabel(e),
      u.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  async locateLink(e) {
    if (!e) return !1;
    await u.ready;
    const t = u.getState().links.find((p) => String(p.id) === String(e));
    if (!t) return !1;
    const d = t.page || "常用网站";
    u.getState().activePage !== d && await u.setPage(d);
    const g = t.group || "常用网站";
    return g !== "常用网站" ? this.openFolder(g) : R.isOpen && P.closeFolder(), setTimeout(() => {
      const p = `[data-launcher-id="${t.id}"]`, i = document.querySelector(p);
      i && (i.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), i.classList.remove("launcher-locate-highlight"), i.offsetWidth, i.classList.add("launcher-locate-highlight"), setTimeout(() => {
        i.classList.remove("launcher-locate-highlight");
      }, 3200));
    }, 120), !0;
  },
  render() {
    const e = u.getState(), t = u.getPageNames();
    I.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), te();
  },
  start() {
    M || (M = !0, I.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: Ce,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, d) => this.openFolderMenu(e, d, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), P.setActionHandler((e, t) => {
      e === "close" ? P.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), A = u.subscribe(() => {
      this.render();
    }), q = (e, t) => {
      if (t !== "local") return;
      const d = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, g = {};
      for (const [p, i] of Object.entries(d)) {
        if (!(p in e)) continue;
        const k = e[p].newValue;
        g[i] = i === "links" ? Array.isArray(k) ? k : [] : i === "pages" ? Array.isArray(k) && k.length ? k : ["常用网站"] : i === "activePage" ? k || "常用网站" : k || {};
      }
      Object.keys(g).length && (u.updateState(g), this.render());
    }, E().chrome?.storage?.onChanged?.addListener(q));
  },
  init() {
    return this.start(), D || (D = (async () => {
      await u.ready;
      const e = E().chrome;
      if (!M) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (M) {
        if (!u.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const d = await new Promise((g) => e.topSites.get((p) => g(p || [])));
          if (!M) return;
          u.getState().links.length || (u.updateState({ links: d.slice(0, 14).map((g) => ({
            id: crypto.randomUUID(),
            title: g.title || u.hostOf(g.url),
            url: g.url,
            group: "常用网站"
          })) }), await u.save());
        }
        M && this.render();
      }
    })().catch((e) => {
      throw D = void 0, e;
    }), D);
  },
  stop() {
    M = !1, A?.(), A = void 0, q && E().chrome?.storage?.onChanged?.removeListener(q), q = void 0, P.setActionHandler(null), I.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, Fe = ["title", "aria-label"], Be = ["src"], De = {
  key: 1,
  "aria-hidden": "true"
}, qe = ["placeholder", "value"], Re = ["title"], Ve = ["title", "aria-label"], Ie = ["title"], Te = { class: "gh-search-rule-icon" }, Ee = ["title", "aria-label"], Ae = ["title", "aria-label"], ze = ["title", "aria-label", "hidden"], Qe = ["hidden"], Ge = ["onClick", "onContextmenu", "onMouseenter"], He = ["src"], $e = { class: "search-suggestion-main" }, je = { class: "search-suggestion-title" }, Ne = {
  key: 0,
  class: "search-suggestion-meta"
}, Oe = ["title"], Ue = {
  key: 0,
  class: "badge-icon"
}, Xe = { class: "search-suggestion-menu-header" }, Ye = { key: 0 }, We = /* @__PURE__ */ ve({
  __name: "SearchBox",
  setup(e) {
    const t = L(() => s.mode === "web" ? a("search.web.placeholder") : s.mode === "bilibili" ? a("search.bilibili.placeholder") : s.mode === "github" ? a("search.github.placeholder") : s.mode === "netease" ? a("search.netease.placeholder") : s.mode === "qcc" ? a("search.qcc.placeholder") : s.placeholder), d = F(J.searchRule || "exact"), g = L(() => s.hasQuery ? /^\/bm[\s:]/i.test(s.query.trim()) ? a("search.status.bookmarks") : /^\/sites[\s:]/i.test(s.query.trim()) ? a("search.status.sites") : a("search.status.all") : a("search.status.history")), p = L(() => [
      { id: "exact", icon: "🎯", name: a("search.rule.exact"), desc: a("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: a("search.rule.fuzzy"), desc: a("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: a("search.rule.topic"), desc: a("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: a("search.rule.smart"), desc: a("search.rule.smartDesc") }
    ]), i = L(() => p.value.find((n) => n.id === d.value) || p.value[0]);
    function k(n) {
      n.preventDefault(), n.stopPropagation();
      const o = J.cycleSearchRule();
      d.value = o, b.update({
        placeholder: a("search.placeholder.gh", { rule: i.value.name })
      }), s.query && x.scheduleSuggestions(s.query);
    }
    const z = L(() => s.mode === "netease" && s.isSuggestionsVisible && s.suggestions.length > 0), Q = L(() => s.mode === "bilibili" && s.isSuggestionsVisible && s.suggestions.length > 0), G = L(() => s.mode === "qcc" && s.isSuggestionsVisible && s.suggestions.length > 0);
    function se(n) {
      n.preventDefault(), G.value ? b.setSuggestionsVisible(!1) : (s.query && b.setQuery(""), x.loadQccRecommendations(!0));
    }
    function ne(n) {
      n.preventDefault(), b.cycleMode();
    }
    function oe(n) {
      const o = n.target;
      b.setQuery(o.value);
    }
    function ie(n) {
      n.preventDefault(), b.clear();
    }
    function H() {
      b.submit();
    }
    function le() {
      x.handleFocus();
    }
    function ae() {
      s.isSuggestionsVisible || x.handleFocus();
    }
    function re(n) {
      n.preventDefault(), z.value ? b.setSuggestionsVisible(!1) : (s.query && b.setQuery(""), x.loadNeteaseRecentRecommendations(!0));
    }
    function ce(n) {
      n.preventDefault(), Q.value ? b.setSuggestionsVisible(!1) : (s.query && b.setQuery(""), x.loadBilibiliRecommendations(!0));
    }
    const $ = F(null), m = F(-1);
    U(() => s.suggestions, () => {
      m.value = -1;
    }), U(() => s.isSuggestionsVisible, (n) => {
      n || (m.value = -1);
    });
    function ue(n) {
      if (!s.isSuggestionsVisible || !s.suggestions.length) {
        n.key === "Enter" && H();
        return;
      }
      n.key === "ArrowDown" ? (n.preventDefault(), m.value < s.suggestions.length - 1 ? m.value++ : m.value = 0, j()) : n.key === "ArrowUp" ? (n.preventDefault(), m.value > 0 ? m.value-- : m.value = s.suggestions.length - 1, j()) : n.key === "Enter" ? m.value >= 0 && m.value < s.suggestions.length ? (n.preventDefault(), V(s.suggestions[m.value])) : H() : n.key === "Escape" && b.setSuggestionsVisible(!1);
    }
    function j() {
      const n = document.getElementById("search-suggestions");
      if (!n) return;
      const r = n.querySelectorAll(".search-suggestion")[m.value];
      r && r.scrollIntoView({ block: "nearest" });
    }
    const v = F(null), C = F(!1), N = F({ x: 0, y: 0 }), { menuRef: de, style: ge } = xe({
      visible: () => C.value,
      anchor: () => N.value,
      dismiss: () => {
        C.value = !1;
      }
    });
    function he(n, o) {
      o.preventDefault(), o.stopPropagation(), v.value = n, N.value = { x: o.clientX, y: o.clientY }, C.value = !0;
    }
    const fe = L(() => v.value ? v.value.launcherLinkId ? !0 : v.value.url ? (u.getState().links || []).some((o) => o.url === v.value?.url) : !1 : !1), pe = L(() => v.value ? !!(v.value.bookmarkId || v.value.badge?.text?.includes("书签")) : !1);
    async function be() {
      const n = v.value;
      if (C.value = !1, !n) return;
      b.setSuggestionsVisible(!1);
      let o = n.bookmarkId, r = n.url || "";
      const _ = document.querySelector(".sites-view-switch button:nth-child(2)");
      _ && _.click(), setTimeout(() => {
        let y = null;
        o && (y = document.querySelector(`[data-bookmark-node="${o}"]`)), !y && r && (y = document.querySelector(`.bookmark-board [href="${r}"]`)), y && (y.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), y.classList.remove("launcher-locate-highlight"), y.offsetWidth, y.classList.add("launcher-locate-highlight"), setTimeout(() => {
          y?.classList.remove("launcher-locate-highlight");
        }, 3200));
      }, 160);
    }
    async function me() {
      const n = v.value;
      if (C.value = !1, !n) return;
      let o = n.launcherLinkId;
      if (!o && n.url) {
        const r = u.getState().links.find((_) => _.url === n.url);
        r && (o = String(r.id));
      }
      o && (b.setSuggestionsVisible(!1), await Pe.locateLink(o));
    }
    function V(n) {
      C.value = !1, b.onSuggestionClick(n);
    }
    function O(n) {
      n.target?.closest("#search") || b.setSuggestionsVisible(!1);
    }
    return ke(() => {
      document.addEventListener("click", O), b.setFocusAction(() => {
        $.value?.focus(), x.handleFocus();
      });
    }), ye(() => {
      document.removeEventListener("click", O);
    }), (n, o) => (h(), f(X, null, [
      c("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: l(s).toggleTitle,
        "aria-label": l(s).toggleAriaLabel,
        style: Y(l(s).modeColor ? { color: l(s).modeColor } : {}),
        onClick: ne
      }, [
        l(s).modeIconSrc ? (h(), f("img", {
          key: 0,
          src: l(s).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, Be)) : (h(), f("span", De, S(l(s).modeIconText || "⌕"), 1))
      ], 12, Fe),
      c("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: $,
        placeholder: t.value,
        value: l(s).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: oe,
        onFocus: le,
        onClick: ae,
        onKeydown: ue
      }, null, 40, qe),
      l(s).mode === "web" ? (h(), f("span", {
        key: 0,
        class: "search-web-status",
        title: l(s).hasQuery ? l(a)("search.webStatus.query") : l(a)("search.webStatus.idle")
      }, S(g.value), 9, Re)) : w("", !0),
      l(s).mode === "netease" ? (h(), f("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: B(["search-history-btn", { active: z.value }]),
        type: "button",
        title: l(a)("search.historyBtnTip"),
        "aria-label": l(a)("search.historyBtn"),
        onClick: re
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
        c("span", null, S(l(a)("search.historyBtn")), 1)
      ], 10, Ve)) : w("", !0),
      l(s).mode === "github" ? (h(), f("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: B(["search-history-btn search-gh-rule-btn", `rule-${i.value.id}`]),
        type: "button",
        title: `当前匹配规则：${i.value.name}（${i.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: k
      }, [
        c("span", Te, S(i.value.icon), 1),
        c("span", null, S(i.value.name), 1)
      ], 10, Ie)) : w("", !0),
      l(s).mode === "bilibili" ? (h(), f("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: B(["search-history-btn search-bili-btn", { active: Q.value }]),
        type: "button",
        title: l(a)("search.biliRecBtnTip"),
        "aria-label": l(a)("search.biliRecBtn"),
        onClick: ce
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
        c("span", null, S(l(a)("search.biliRecBtn")), 1)
      ], 10, Ee)) : w("", !0),
      l(s).mode === "qcc" ? (h(), f("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: B(["search-history-btn search-qcc-btn", { active: G.value }]),
        type: "button",
        title: l(a)("search.qccTipsBtnTip"),
        "aria-label": l(a)("search.qccTipsAria"),
        onClick: se
      }, [
        o[5] || (o[5] = c("span", { class: "gh-search-rule-icon" }, "🏢", -1)),
        c("span", null, S(l(a)("search.qccTipsBtn")), 1)
      ], 10, Ae)) : w("", !0),
      c("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: l(a)("search.clearBtnTip"),
        "aria-label": l(a)("search.clearBtnTip"),
        hidden: !l(s).hasQuery,
        onClick: ie
      }, " ✕ ", 8, ze),
      c("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !l(s).isSuggestionsVisible || !l(s).suggestions.length
      }, [
        (h(!0), f(X, null, Se(l(s).suggestions, (r, _) => (h(), f("button", {
          key: r.id,
          class: B(["search-suggestion", { "is-selected": _ === m.value }]),
          type: "button",
          role: "option",
          onClick: (y) => V(r),
          onContextmenu: (y) => he(r, y),
          onMouseenter: (y) => m.value = _
        }, [
          r.iconSrc ? (h(), f("img", {
            key: 0,
            src: r.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, He)) : w("", !0),
          c("span", $e, [
            c("span", je, S(r.title), 1),
            r.meta ? (h(), f("span", Ne, S(r.meta), 1)) : w("", !0)
          ]),
          r.badge ? (h(), f("span", {
            key: 1,
            class: B(["search-suggestion-badge", r.badge.className]),
            title: r.badge.title
          }, [
            r.badge.icon ? (h(), f("i", Ue, S(r.badge.icon), 1)) : w("", !0),
            c("span", null, S(r.badge.text), 1)
          ], 10, Oe)) : w("", !0)
        ], 42, Ge))), 128))
      ], 8, Qe),
      (h(), we(Le, { to: "body" }, [
        C.value ? (h(), f("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: de,
          class: "folder-menu search-suggestion-context-menu",
          role: "menu",
          style: Y(l(ge)),
          onPointerdown: o[1] || (o[1] = W(() => {
          }, ["stop"])),
          onContextmenu: o[2] || (o[2] = W(() => {
          }, ["prevent", "stop"]))
        }, [
          c("div", Xe, [
            c("strong", null, S(v.value?.title), 1),
            v.value?.url ? (h(), f("small", Ye, S(v.value?.url), 1)) : w("", !0)
          ]),
          fe.value ? (h(), f("button", {
            key: 0,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-btn",
            onClick: me
          }, [...o[6] || (o[6] = [
            c("span", null, "🎯 定位到常用网站", -1)
          ])])) : w("", !0),
          pe.value ? (h(), f("button", {
            key: 1,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-bookmark-btn",
            onClick: be
          }, [...o[7] || (o[7] = [
            c("span", null, "🔖 定位到书签", -1)
          ])])) : w("", !0),
          c("button", {
            type: "button",
            class: "search-suggestion-menu-btn",
            onClick: o[0] || (o[0] = (r) => V(v.value))
          }, [...o[8] || (o[8] = [
            c("span", null, "🔗 打开此网页", -1)
          ])])
        ], 36)) : w("", !0)
      ]))
    ], 64));
  }
}), nt = /* @__PURE__ */ Me(We, [["__scopeId", "data-v-94430bbe"]]);
export {
  nt as S,
  st as i,
  Pe as l
};
