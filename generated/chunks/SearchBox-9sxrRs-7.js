import { d as ye, b as P, w as W, B as Se, x as we, o as h, e as f, F as J, i as c, z as Z, u as a, t as y, f as S, A as F, g as Ce, h as E, j as Le, T as xe, s as w } from "./vendor-vue-9b0eS4bW.js";
import { a as u, o as ee, t as te, s as b, d as L, D as n } from "./search.service-BG_n92VW.js";
import { f as I, b as _, l as R, p as _e, c as A, a as Me } from "./store-Rcl2gkeK.js";
import { u as Pe } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { t as l, _ as Fe } from "./_plugin-vue_export-helper-BxikU0LD.js";
function se(e) {
  const t = e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
  return t ? !!t.closest("input, textarea") || t instanceof HTMLElement && t.isContentEditable : !1;
}
function it() {
  document.documentElement.classList.contains("lw-display-copy-disabled") || (document.documentElement.classList.add("lw-display-copy-disabled"), document.addEventListener("copy", (e) => {
    se(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
  }, { capture: !0 }), document.addEventListener("selectstart", (e) => {
    se(e.target) || e.preventDefault();
  }));
}
const T = () => window;
let x = !1, D, z, q;
function ne(e) {
  return u.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: u.getPageLabel(t) }));
}
function oe() {
  if (!I.isOpen || !I.activeFolder) return;
  const e = u.getState(), t = I.activeFolder;
  _.setLinks(e.links.filter((i) => (i.group || "常用网站") === t));
  const d = /* @__PURE__ */ new Map();
  for (const i of e.links) {
    const m = i.group || "常用网站";
    d.has(m) || d.set(m, []), d.get(m).push(i);
  }
  const g = new Map(Object.keys(e.folders).map((i) => [i, ee(e.folders, i)])), p = /* @__PURE__ */ new Map();
  for (const i of g.values()) i && p.set(i, (p.get(i) || 0) + 1);
  _.setFolders([...g].filter(([, i]) => i === t).map(([i]) => ({
    groupName: i,
    links: d.get(i) || [],
    count: (d.get(i)?.length || 0) + (p.get(i) || 0)
  })), ee(e.folders, t));
}
const Be = {
  openEditor(e) {
    Me.openEditDialog(e || {});
  },
  openFolder(e = I.activeFolder) {
    if (!e) return;
    const d = u.getState().links.filter((g) => (g.group || "常用网站") === e);
    _.openFolder(e, d), oe();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), A.openLinkMenu(e, ne(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, d) {
    t?.preventDefault?.();
    const g = u.getState(), p = d || g.activePage;
    A.openFolderMenu(
      e,
      u.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      ne(p),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), A.openPageMenu(
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
    return g !== "常用网站" ? this.openFolder(g) : I.isOpen && _.closeFolder(), setTimeout(() => {
      const p = `[data-launcher-id="${t.id}"]`, i = document.querySelector(p);
      i && (i.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }), i.classList.remove("launcher-locate-highlight"), i.offsetWidth, i.classList.add("launcher-locate-highlight"), setTimeout(() => {
        i.classList.remove("launcher-locate-highlight");
      }, 3200));
    }, 120), !0;
  },
  render() {
    const e = u.getState(), t = u.getPageNames();
    R.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), oe();
  },
  start() {
    x || (x = !0, R.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: _e,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, d) => this.openFolderMenu(e, d, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), _.setActionHandler((e, t) => {
      e === "close" ? _.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), z = u.subscribe(() => {
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
        const m = e[p].newValue;
        g[i] = i === "links" ? Array.isArray(m) ? m : [] : i === "pages" ? Array.isArray(m) && m.length ? m : ["常用网站"] : i === "activePage" ? m || "常用网站" : m || {};
      }
      Object.keys(g).length && (u.updateState(g), this.render());
    }, T().chrome?.storage?.onChanged?.addListener(q));
  },
  init() {
    return this.start(), D || (D = (async () => {
      await u.ready;
      const e = T().chrome;
      if (!x) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (x) {
        if (!u.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const d = await new Promise((g) => e.topSites.get((p) => g(p || [])));
          if (!x) return;
          u.getState().links.length || (u.updateState({ links: d.slice(0, 14).map((g) => ({
            id: crypto.randomUUID(),
            title: g.title || u.hostOf(g.url),
            url: g.url,
            group: "常用网站"
          })) }), await u.save());
        }
        x && this.render();
      }
    })().catch((e) => {
      throw D = void 0, e;
    }), D);
  },
  stop() {
    x = !1, z?.(), z = void 0, q && T().chrome?.storage?.onChanged?.removeListener(q), q = void 0, _.setActionHandler(null), R.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, Q = {
  nodeId: "",
  url: "",
  timestamp: 0
};
function De(e, t) {
  Q.nodeId = e || "", Q.url = t || "", Q.timestamp = Date.now(), window.dispatchEvent(new CustomEvent("logicweaver:locate-bookmark", {
    detail: { nodeId: e, url: t }
  }));
}
const qe = ["title", "aria-label"], Ie = ["src"], Re = {
  key: 1,
  "aria-hidden": "true"
}, Ve = ["placeholder", "value"], Ee = ["title"], Ae = ["title", "aria-label"], Te = ["title"], ze = { class: "gh-search-rule-icon" }, Qe = ["title", "aria-label"], $e = ["title", "aria-label"], Ge = ["title", "aria-label", "hidden"], He = ["hidden"], je = ["onClick", "onContextmenu", "onMouseenter"], Oe = ["src"], Ne = { class: "search-suggestion-main" }, Ue = { class: "search-suggestion-title" }, Xe = {
  key: 0,
  class: "search-suggestion-meta"
}, Ye = ["title", "onClick"], Ke = {
  key: 0,
  class: "badge-icon"
}, We = { class: "search-suggestion-menu-header" }, Je = { key: 0 }, Ze = /* @__PURE__ */ ye({
  __name: "SearchBox",
  setup(e) {
    const t = w(() => n.mode === "web" ? l("search.web.placeholder") : n.mode === "bilibili" ? l("search.bilibili.placeholder") : n.mode === "github" ? l("search.github.placeholder") : n.mode === "netease" ? l("search.netease.placeholder") : n.mode === "qcc" ? l("search.qcc.placeholder") : n.placeholder), d = P(te.searchRule || "exact"), g = w(() => n.hasQuery ? /^\/bm[\s:]/i.test(n.query.trim()) ? l("search.status.bookmarks") : /^\/sites[\s:]/i.test(n.query.trim()) ? l("search.status.sites") : l("search.status.all") : l("search.status.history")), p = w(() => [
      { id: "exact", icon: "🎯", name: l("search.rule.exact"), desc: l("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: l("search.rule.fuzzy"), desc: l("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: l("search.rule.topic"), desc: l("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: l("search.rule.smart"), desc: l("search.rule.smartDesc") }
    ]), i = w(() => p.value.find((s) => s.id === d.value) || p.value[0]);
    function m(s) {
      s.preventDefault(), s.stopPropagation();
      const o = te.cycleSearchRule();
      d.value = o, b.update({
        placeholder: l("search.placeholder.gh", { rule: i.value.name })
      }), n.query && L.scheduleSuggestions(n.query);
    }
    const $ = w(() => n.mode === "netease" && n.isSuggestionsVisible && n.suggestions.length > 0), G = w(() => n.mode === "bilibili" && n.isSuggestionsVisible && n.suggestions.length > 0), H = w(() => n.mode === "qcc" && n.isSuggestionsVisible && n.suggestions.length > 0);
    function ie(s) {
      s.preventDefault(), H.value ? b.setSuggestionsVisible(!1) : (n.query && b.setQuery(""), L.loadQccRecommendations(!0));
    }
    function ae(s) {
      s.preventDefault(), b.cycleMode();
    }
    function le(s) {
      const o = s.target;
      b.setQuery(o.value);
    }
    function re(s) {
      s.preventDefault(), b.clear();
    }
    function j() {
      b.submit();
    }
    function ce() {
      L.handleFocus();
    }
    function ue() {
      n.isSuggestionsVisible || L.handleFocus();
    }
    function de(s) {
      s.preventDefault(), $.value ? b.setSuggestionsVisible(!1) : (n.query && b.setQuery(""), L.loadNeteaseRecentRecommendations(!0));
    }
    function ge(s) {
      s.preventDefault(), G.value ? b.setSuggestionsVisible(!1) : (n.query && b.setQuery(""), L.loadBilibiliRecommendations(!0));
    }
    const O = P(null), v = P(-1);
    W(() => n.suggestions, () => {
      v.value = -1;
    }), W(() => n.isSuggestionsVisible, (s) => {
      s || (v.value = -1);
    });
    function he(s) {
      if (!n.isSuggestionsVisible || !n.suggestions.length) {
        s.key === "Enter" && j();
        return;
      }
      s.key === "ArrowDown" ? (s.preventDefault(), v.value < n.suggestions.length - 1 ? v.value++ : v.value = 0, N()) : s.key === "ArrowUp" ? (s.preventDefault(), v.value > 0 ? v.value-- : v.value = n.suggestions.length - 1, N()) : s.key === "Enter" ? v.value >= 0 && v.value < n.suggestions.length ? (s.preventDefault(), V(n.suggestions[v.value])) : j() : s.key === "Escape" && b.setSuggestionsVisible(!1);
    }
    function N() {
      const s = document.getElementById("search-suggestions");
      if (!s) return;
      const r = s.querySelectorAll(".search-suggestion")[v.value];
      r && r.scrollIntoView({ block: "nearest" });
    }
    const k = P(null), C = P(!1), U = P({ x: 0, y: 0 }), { menuRef: fe, style: pe } = Pe({
      visible: () => C.value,
      anchor: () => U.value,
      dismiss: () => {
        C.value = !1;
      }
    });
    function be(s, o) {
      o.preventDefault(), o.stopPropagation(), k.value = s, U.value = { x: o.clientX, y: o.clientY }, C.value = !0;
    }
    const ve = w(() => k.value ? k.value.launcherLinkId ? !0 : k.value.url ? (u.getState().links || []).some((o) => o.url === k.value?.url) : !1 : !1), ke = w(() => k.value ? !!(k.value.bookmarkId || k.value.badge?.text?.includes("书签")) : !1);
    async function X(s) {
      const o = s && "id" in s ? s : k.value;
      C.value = !1, o && (b.setSuggestionsVisible(!1), R.setSitesView("bookmarks"), De(o.bookmarkId, o.url));
    }
    async function Y(s) {
      const o = s && "id" in s ? s : k.value;
      if (C.value = !1, !o) return;
      let r = o.launcherLinkId;
      if (!r && o.url) {
        const B = u.getState().links.find((M) => M.url === o.url);
        B && (r = String(B.id));
      }
      r && (R.setSitesView("sites"), b.setSuggestionsVisible(!1), await Be.locateLink(r));
    }
    function me(s) {
      s.launcherLinkId || s.badge?.text?.includes("常用网站") ? Y(s) : s.bookmarkId || s.badge?.text?.includes("书签") ? X(s) : V(s);
    }
    function V(s) {
      C.value = !1, b.onSuggestionClick(s);
    }
    function K(s) {
      s.target?.closest("#search") || b.setSuggestionsVisible(!1);
    }
    return Se(() => {
      document.addEventListener("click", K), b.setFocusAction(() => {
        O.value?.focus(), L.handleFocus();
      });
    }), we(() => {
      document.removeEventListener("click", K);
    }), (s, o) => (h(), f(J, null, [
      c("button", {
        id: "search-mode-toggle",
        class: "s-icon",
        type: "button",
        title: a(n).toggleTitle,
        "aria-label": a(n).toggleAriaLabel,
        style: Z(a(n).modeColor ? { color: a(n).modeColor } : {}),
        onClick: ae
      }, [
        a(n).modeIconSrc ? (h(), f("img", {
          key: 0,
          src: a(n).modeIconSrc,
          alt: "",
          style: { width: "19px", height: "19px", display: "block" }
        }, null, 8, Ie)) : (h(), f("span", Re, y(a(n).modeIconText || "⌕"), 1))
      ], 12, qe),
      c("input", {
        id: "search-input",
        ref_key: "inputRef",
        ref: O,
        placeholder: t.value,
        value: a(n).query,
        autocomplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": "search-suggestions",
        onInput: le,
        onFocus: ce,
        onClick: ue,
        onKeydown: he
      }, null, 40, Ve),
      a(n).mode === "web" ? (h(), f("span", {
        key: 0,
        class: "search-web-status",
        title: a(n).hasQuery ? a(l)("search.webStatus.query") : a(l)("search.webStatus.idle")
      }, y(g.value), 9, Ee)) : S("", !0),
      a(n).mode === "netease" ? (h(), f("button", {
        key: 1,
        id: "search-netease-history-btn",
        class: F(["search-history-btn", { active: $.value }]),
        type: "button",
        title: a(l)("search.historyBtnTip"),
        "aria-label": a(l)("search.historyBtn"),
        onClick: de
      }, [
        o[5] || (o[5] = c("svg", {
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
        c("span", null, y(a(l)("search.historyBtn")), 1)
      ], 10, Ae)) : S("", !0),
      a(n).mode === "github" ? (h(), f("button", {
        key: 2,
        id: "search-github-rule-btn",
        class: F(["search-history-btn search-gh-rule-btn", `rule-${i.value.id}`]),
        type: "button",
        title: `当前匹配规则：${i.value.name}（${i.value.desc}）
点击切换下一个规则`,
        "aria-label": "切换GitHub搜索规则",
        onClick: m
      }, [
        c("span", ze, y(i.value.icon), 1),
        c("span", null, y(i.value.name), 1)
      ], 10, Te)) : S("", !0),
      a(n).mode === "bilibili" ? (h(), f("button", {
        key: 3,
        id: "search-bilibili-rec-btn",
        class: F(["search-history-btn search-bili-btn", { active: G.value }]),
        type: "button",
        title: a(l)("search.biliRecBtnTip"),
        "aria-label": a(l)("search.biliRecBtn"),
        onClick: ge
      }, [
        o[6] || (o[6] = c("svg", {
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
        c("span", null, y(a(l)("search.biliRecBtn")), 1)
      ], 10, Qe)) : S("", !0),
      a(n).mode === "qcc" ? (h(), f("button", {
        key: 4,
        id: "search-qcc-tips-btn",
        class: F(["search-history-btn search-qcc-btn", { active: H.value }]),
        type: "button",
        title: a(l)("search.qccTipsBtnTip"),
        "aria-label": a(l)("search.qccTipsAria"),
        onClick: ie
      }, [
        o[7] || (o[7] = c("span", { class: "gh-search-rule-icon" }, "🏢", -1)),
        c("span", null, y(a(l)("search.qccTipsBtn")), 1)
      ], 10, $e)) : S("", !0),
      c("button", {
        id: "search-clear-btn",
        class: "search-clear-btn",
        type: "button",
        title: a(l)("search.clearBtnTip"),
        "aria-label": a(l)("search.clearBtnTip"),
        hidden: !a(n).hasQuery,
        onClick: re
      }, " ✕ ", 8, Ge),
      c("div", {
        id: "search-suggestions",
        class: "search-suggestions",
        role: "listbox",
        hidden: !a(n).isSuggestionsVisible || !a(n).suggestions.length
      }, [
        (h(!0), f(J, null, Ce(a(n).suggestions, (r, B) => (h(), f("button", {
          key: r.id,
          class: F(["search-suggestion", { "is-selected": B === v.value }]),
          type: "button",
          role: "option",
          onClick: (M) => V(r),
          onContextmenu: (M) => be(r, M),
          onMouseenter: (M) => v.value = B
        }, [
          r.iconSrc ? (h(), f("img", {
            key: 0,
            src: r.iconSrc,
            alt: "",
            loading: "lazy",
            decoding: "async"
          }, null, 8, Oe)) : S("", !0),
          c("span", Ne, [
            c("span", Ue, y(r.title), 1),
            r.meta ? (h(), f("span", Xe, y(r.meta), 1)) : S("", !0)
          ]),
          r.badge ? (h(), f("span", {
            key: 1,
            class: F(["search-suggestion-badge", r.badge.className, "is-clickable"]),
            title: r.badge.title || (r.launcherLinkId || r.badge.text && r.badge.text.includes("常用网站") ? "点击直接定位到常用网站位置" : "点击直接定位到书签位置"),
            onClick: E((M) => me(r), ["stop"])
          }, [
            r.badge.icon ? (h(), f("i", Ke, y(r.badge.icon), 1)) : S("", !0),
            c("span", null, y(r.badge.text), 1)
          ], 10, Ye)) : S("", !0)
        ], 42, je))), 128))
      ], 8, He),
      (h(), Le(xe, { to: "body" }, [
        C.value ? (h(), f("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: fe,
          class: "folder-menu search-suggestion-context-menu",
          role: "menu",
          style: Z(a(pe)),
          onPointerdown: o[3] || (o[3] = E(() => {
          }, ["stop"])),
          onContextmenu: o[4] || (o[4] = E(() => {
          }, ["prevent", "stop"]))
        }, [
          c("div", We, [
            c("strong", null, y(k.value?.title), 1),
            k.value?.url ? (h(), f("small", Je, y(k.value?.url), 1)) : S("", !0)
          ]),
          ve.value ? (h(), f("button", {
            key: 0,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-btn",
            onClick: o[0] || (o[0] = (r) => Y())
          }, [...o[8] || (o[8] = [
            c("span", null, "🎯 定位到常用网站", -1)
          ])])) : S("", !0),
          ke.value ? (h(), f("button", {
            key: 1,
            type: "button",
            class: "search-suggestion-menu-btn highlight-locate-bookmark-btn",
            onClick: o[1] || (o[1] = (r) => X())
          }, [...o[9] || (o[9] = [
            c("span", null, "🔖 定位到书签", -1)
          ])])) : S("", !0),
          c("button", {
            type: "button",
            class: "search-suggestion-menu-btn",
            onClick: o[2] || (o[2] = (r) => V(k.value))
          }, [...o[10] || (o[10] = [
            c("span", null, "🔗 打开此网页", -1)
          ])])
        ], 36)) : S("", !0)
      ]))
    ], 64));
  }
}), at = /* @__PURE__ */ Fe(Ze, [["__scopeId", "data-v-52e38abb"]]);
export {
  at as S,
  it as i,
  Be as l,
  Q as p
};
