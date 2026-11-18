import { d as q, w as X, C as J, e as r, i as t, A as c, u as i, t as l, F as y, l as Q, n as ee, f as h, g as m, j as te, h as M, z as ae, p as ie, T as oe, b as se, s as g, o as n, m as T } from "./vendor-vue-BrDsOMg2.js";
import { u as le } from "./useCardActivity-CxxoOp6_.js";
import { b as ne, a as _ } from "./aihot-feed-store-Djr3w-4z.js";
import { a as re } from "./store-rr7ynpzH.js";
import { aiHotService as k } from "./aihot.service-CWLwNpcK.js";
import { f as de } from "./fullscreen-presentation-Byb88Aul.js";
import { k as ce } from "./view-styles-agM3PzgD.js";
import { C as ue } from "./ChatShareMenu-vIAWRq3C.js";
import { u as he } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-BE0lk86U.js";
import { t as d, c as $, _ as pe } from "./_plugin-vue_export-helper-Do3lP4W5.js";
const ve = ["inert"], ye = { class: "aihot-workspace" }, be = ["aria-label"], fe = { class: "aihot-nav-wrap" }, ge = ["aria-pressed"], me = { class: "aihot-nav-main" }, _e = { class: "aihot-nav-copy" }, ke = { class: "aihot-nav-wrap" }, we = ["aria-pressed"], Ce = { class: "aihot-nav-main" }, Ae = { class: "aihot-nav-copy" }, Se = { class: "aihot-nav-wrap" }, Ve = ["aria-pressed"], xe = { class: "aihot-nav-main" }, Me = { class: "aihot-nav-copy" }, Te = { class: "aihot-main" }, $e = { class: "card-head" }, De = { id: "aihot-title" }, Pe = ["title", "disabled"], Re = {
  key: 0,
  id: "aihot-subbar",
  class: "aihot-subbar"
}, Le = {
  class: "aihot-pills",
  id: "aihot-lb-provider-pills"
}, Ie = { class: "aihot-subbar-right" }, Fe = ["placeholder"], Ne = {
  class: "aihot-pills",
  id: "aihot-cat-pills"
}, Oe = { class: "aihot-subbar-right" }, Be = {
  class: "aihot-pills",
  id: "aihot-window-pills"
}, We = {
  key: 1,
  class: "muted small",
  role: "status"
}, ze = {
  key: 2,
  class: "notice",
  role: "status"
}, He = { id: "aihot-body" }, Ee = {
  key: 0,
  class: "notice"
}, Ge = {
  key: 1,
  class: "muted small"
}, Ye = {
  key: 2,
  class: "aihot-lb-list"
}, je = ["href"], Ke = { class: "aihot-lb-model" }, Ue = { class: "aihot-lb-name" }, Ze = { class: "aihot-lb-provider" }, qe = {
  class: "aihot-lb-score",
  title: "AIHOT 共识评分"
}, Xe = {
  class: "aihot-lb-date aihot-lb-col-hide-mobile",
  title: "上线日期"
}, Je = {
  class: "aihot-lb-price aihot-lb-col-hide-mobile",
  title: "API 价格（¥/百万Token）"
}, Qe = {
  key: 0,
  class: "muted small"
}, et = {
  key: 3,
  class: "aihot-grid"
}, tt = ["href", "onClick", "onContextmenu"], at = { style: { "min-width": "0", flex: "1" } }, it = { class: "aihot-t" }, ot = {
  key: 0,
  class: "aihot-s"
}, st = { class: "aihot-m" }, lt = {
  key: 0,
  class: "aihot-tag",
  style: { "margin-right": "6px" }
}, nt = {
  key: 0,
  class: "muted small"
}, rt = {
  key: 4,
  class: "aihot-daily-wrap"
}, dt = {
  key: 0,
  class: "daily-news-days"
}, ct = ["onClick"], ut = {
  key: 1,
  class: "muted small",
  role: "status"
}, ht = {
  key: 2,
  class: "muted small"
}, pt = {
  key: 3,
  class: "aihot-daily-lead"
}, vt = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", "margin-bottom": "8px" } }, yt = { style: { margin: "0" } }, bt = ["href"], ft = {
  key: 0,
  style: { "font-weight": "600", color: "var(--heading)", "margin-bottom": "4px" }
}, gt = {
  key: 1,
  style: { "line-height": "1.6" }
}, mt = {
  key: 2,
  class: "muted small"
}, _t = { class: "aihot-daily-group-title" }, kt = { class: "aihot-grid" }, wt = ["href", "onClick", "onContextmenu"], Ct = { style: { "min-width": "0", flex: "1" } }, At = { class: "aihot-t" }, St = {
  key: 0,
  class: "aihot-s"
}, Vt = { class: "aihot-m" }, xt = { key: 0 }, Mt = { class: "menu-head" }, Tt = /* @__PURE__ */ q({
  __name: "AihotFeed",
  setup($t) {
    const v = se({
      visible: !1,
      x: 0,
      y: 0,
      item: null
    });
    function D(s, e) {
      s.preventDefault(), s.stopPropagation(), v.value = {
        visible: !0,
        x: s.clientX,
        y: s.clientY,
        item: e
      };
    }
    function O(s) {
      v.value.item && ce.sendAiHotShare(v.value.item, s), v.value.visible = !1;
    }
    function P() {
      v.value.visible = !1;
    }
    const { menuRef: B, style: W } = he({
      visible: () => v.value.visible,
      anchor: () => ({ x: v.value.x, y: v.value.y }),
      dismiss: P
    }), a = ne, { active: w, standalone: z } = le("daily-aihot", "/aihot.html"), C = /* @__PURE__ */ Symbol("aihot-feed-view");
    let R = !1;
    X(w, (s) => {
      if (!s) {
        P(), k.pause(C);
        return;
      }
      if (!R) {
        R = !0, a.currentView = z ? "leaderboard" : "feed";
        try {
          const e = localStorage.getItem("lw-info-feed-view");
          (e === "leaderboard" || e === "feed" || e === "daily") && (a.currentView = e);
          const o = localStorage.getItem("lw-aihot-feed-cat");
          o && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(o) && (a.feedCategory = o), localStorage.getItem("lw-aihot-feed-window") === "7d" && (a.feedWindow = "7d");
        } catch {
        }
      }
      k.activate(C);
    }, { immediate: !0, flush: "sync" }), J(() => {
      k.pause(C);
    });
    const H = g(() => {
      switch (a.currentView) {
        case "leaderboard":
          return d("aihot.view.leaderboard");
        case "feed":
          return d("aihot.view.feed");
        case "daily":
          return d("aihot.view.daily");
        default:
          return d("aihot.view.default");
      }
    }), E = g(() => a.statusMessage === "已获取来源数据。" ? d("aihot.status.dataFetched") : a.statusMessage === "正在显示缓存，检查更新中…" ? d("aihot.status.showingCache") : a.statusMessage === "保留当前已读取的数据；没有数据时显示空列表。" ? d("aihot.status.retainedData") : a.statusMessage), A = g(() => {
      let s = a.leaderboard;
      if (a.leaderboardProvider) {
        const e = a.leaderboardProvider.toLowerCase();
        s = s.filter((o) => o.provider.toLowerCase().includes(e));
      }
      if (a.leaderboardSearch) {
        const e = a.leaderboardSearch.trim().toLowerCase();
        s = s.filter(
          (o) => o.model.toLowerCase().includes(e) || o.provider.toLowerCase().includes(e)
        );
      }
      return s;
    }), G = {
      "ai-models": "模型发布",
      "ai-products": "产品动态",
      industry: "行业动态",
      paper: "学术论文",
      tip: "观点教程"
    }, Y = g(() => {
      if (!a.feedCategory) return a.feedArticles;
      const s = a.feedCategory.toLowerCase(), e = G[s] || "", o = a.feedArticles.filter((p) => {
        const u = (p.category || "").toLowerCase();
        return u === s || e && u.includes(e) || s && u.includes(s);
      });
      return o.length ? o : a.feedArticles;
    }), S = g(() => {
      const s = Y.value;
      return $.value !== "en" ? s : [...s].sort((e, o) => {
        const p = !!(e.originalTitle && /[a-zA-Z]{3,}/.test(e.originalTitle)), u = !!(o.originalTitle && /[a-zA-Z]{3,}/.test(o.originalTitle));
        return p && !u ? -1 : !p && u ? 1 : 0;
      });
    });
    function j(s) {
      return $.value === "en" && s.originalTitle ? s.originalTitle : s.title;
    }
    function K(s) {
      const e = s.sourceName || "AI HOT";
      return $.value === "en" && e.includes("：") ? e.split("：")[0].trim() : e;
    }
    const V = g(() => a.currentView === "leaderboard" ? A.value.length > 0 : a.currentView === "feed" ? S.value.length > 0 : a.currentView === "daily" ? !!a.dailyReport : !1);
    function x(s) {
      k.switchView(s);
    }
    function U() {
      k.refresh();
    }
    function L(s) {
      const e = window;
      if (typeof e.openAiHotArticle == "function") {
        e.openAiHotArticle(s.raw || s, s.url);
        return;
      }
      re.openArticle(
        {
          id: s.id,
          title: s.title,
          summary: s.summary,
          sourceName: s.sourceName,
          published: s.published,
          url: s.url
        },
        ""
      ), _.dispatch("select-article", s);
    }
    function b(s) {
      a.leaderboardProvider = s, _.dispatch("select-provider", s);
    }
    function f(s) {
      a.feedCategory = s, _.dispatch("change-category", s);
      try {
        localStorage.setItem("lw-aihot-feed-cat", s);
      } catch {
      }
    }
    function I(s) {
      a.feedWindow = s, _.dispatch("change-window", s);
      try {
        localStorage.setItem("lw-aihot-feed-window", s);
      } catch {
      }
    }
    function F(s) {
      a.activeDailyDate = s, _.dispatch("select-daily-date", s);
    }
    return (s, e) => (n(), r(y, null, [
      t("div", {
        class: "vue-aihot-wrapper",
        inert: !i(w)
      }, [
        t("section", {
          id: "daily-aihot",
          class: c(["card wide", { "card-fullscreen": i(de).activeId === "daily-aihot" }])
        }, [
          t("div", ye, [
            t("nav", {
              id: "aihot-tabs",
              class: "aihot-tabs",
              "aria-label": i(d)("aihot.nav.label")
            }, [
              t("div", fe, [
                t("button", {
                  type: "button",
                  "data-view": "leaderboard",
                  class: c(["aihot-nav-card rank", { active: i(a).currentView === "leaderboard" }]),
                  "aria-pressed": i(a).currentView === "leaderboard",
                  onClick: e[0] || (e[0] = (o) => x("leaderboard"))
                }, [
                  t("span", me, [
                    e[20] || (e[20] = t("span", {
                      class: "aihot-nav-icon",
                      "aria-hidden": "true"
                    }, "🏆", -1)),
                    t("span", _e, [
                      t("strong", null, l(i(d)("aihot.nav.rank")), 1),
                      t("small", null, l(i(d)("aihot.nav.rankDesc")), 1)
                    ])
                  ]),
                  e[21] || (e[21] = t("span", { class: "aihot-nav-badge" }, "RANK", -1))
                ], 10, ge)
              ]),
              t("div", ke, [
                t("button", {
                  type: "button",
                  "data-view": "feed",
                  class: c(["aihot-nav-card feed", { active: i(a).currentView === "feed" }]),
                  "aria-pressed": i(a).currentView === "feed",
                  onClick: e[1] || (e[1] = (o) => x("feed"))
                }, [
                  t("span", Ce, [
                    e[22] || (e[22] = t("span", {
                      class: "aihot-nav-icon",
                      "aria-hidden": "true"
                    }, "✦", -1)),
                    t("span", Ae, [
                      t("strong", null, l(i(d)("aihot.nav.feed")), 1),
                      t("small", null, l(i(d)("aihot.nav.feedDesc")), 1)
                    ])
                  ]),
                  e[23] || (e[23] = t("span", { class: "aihot-nav-badge" }, "NEWS", -1))
                ], 10, we)
              ]),
              t("div", Se, [
                t("button", {
                  type: "button",
                  "data-view": "daily",
                  class: c(["aihot-nav-card daily", { active: i(a).currentView === "daily" }]),
                  "aria-pressed": i(a).currentView === "daily",
                  onClick: e[2] || (e[2] = (o) => x("daily"))
                }, [
                  t("span", xe, [
                    e[24] || (e[24] = t("span", {
                      class: "aihot-nav-icon",
                      "aria-hidden": "true"
                    }, "📰", -1)),
                    t("span", Me, [
                      t("strong", null, l(i(d)("aihot.nav.daily")), 1),
                      t("small", null, l(i(d)("aihot.nav.dailyDesc")), 1)
                    ])
                  ]),
                  e[25] || (e[25] = t("span", { class: "aihot-nav-badge" }, "DAILY", -1))
                ], 10, Ve)
              ])
            ], 8, be),
            t("main", Te, [
              t("header", $e, [
                e[26] || (e[26] = t("span", {
                  class: "bar",
                  style: { background: "linear-gradient(180deg,#34d399,#38bdf8)" }
                }, null, -1)),
                t("h2", De, l(H.value), 1),
                t("button", {
                  id: "aihot-refresh",
                  class: "icon-btn",
                  title: i(d)("aihot.refreshTip"),
                  disabled: !i(w) || i(a).isLoading,
                  type: "button",
                  onClick: U
                }, "↻", 8, Pe)
              ]),
              i(a).currentView === "leaderboard" || i(a).currentView === "feed" ? (n(), r("div", Re, [
                i(a).currentView === "leaderboard" ? (n(), r(y, { key: 0 }, [
                  t("div", Le, [
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: !i(a).leaderboardProvider }]),
                      onClick: e[3] || (e[3] = (o) => b(""))
                    }, l(i(d)("aihot.allProviders")), 3),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).leaderboardProvider === "Anthropic" }]),
                      onClick: e[4] || (e[4] = (o) => b("Anthropic"))
                    }, " Anthropic ", 2),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).leaderboardProvider === "OpenAI" }]),
                      onClick: e[5] || (e[5] = (o) => b("OpenAI"))
                    }, " OpenAI ", 2),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).leaderboardProvider === "Meta" }]),
                      onClick: e[6] || (e[6] = (o) => b("Meta"))
                    }, " Meta ", 2),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).leaderboardProvider === "Google" }]),
                      onClick: e[7] || (e[7] = (o) => b("Google"))
                    }, " Google ", 2),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).leaderboardProvider === "DeepSeek" }]),
                      onClick: e[8] || (e[8] = (o) => b("DeepSeek"))
                    }, " DeepSeek ", 2)
                  ]),
                  t("div", Ie, [
                    Q(t("input", {
                      type: "text",
                      class: "aihot-search-input",
                      id: "aihot-lb-search",
                      placeholder: i(d)("aihot.searchPlaceholder"),
                      "onUpdate:modelValue": e[9] || (e[9] = (o) => i(a).leaderboardSearch = o)
                    }, null, 8, Fe), [
                      [ee, i(a).leaderboardSearch]
                    ])
                  ])
                ], 64)) : i(a).currentView === "feed" ? (n(), r(y, { key: 1 }, [
                  t("div", Ne, [
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: !i(a).feedCategory }]),
                      onClick: e[10] || (e[10] = (o) => f(""))
                    }, l(i(d)("aihot.category.all")), 3),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).feedCategory === "ai-models" }]),
                      onClick: e[11] || (e[11] = (o) => f("ai-models"))
                    }, l(i(d)("aihot.category.models")), 3),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).feedCategory === "ai-products" }]),
                      onClick: e[12] || (e[12] = (o) => f("ai-products"))
                    }, l(i(d)("aihot.category.products")), 3),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).feedCategory === "industry" }]),
                      onClick: e[13] || (e[13] = (o) => f("industry"))
                    }, l(i(d)("aihot.category.industry")), 3),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).feedCategory === "paper" }]),
                      onClick: e[14] || (e[14] = (o) => f("paper"))
                    }, l(i(d)("aihot.category.paper")), 3),
                    t("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(a).feedCategory === "tip" }]),
                      onClick: e[15] || (e[15] = (o) => f("tip"))
                    }, l(i(d)("aihot.category.tip")), 3)
                  ]),
                  t("div", Oe, [
                    t("div", Be, [
                      t("button", {
                        type: "button",
                        class: c(["aihot-pill", { active: i(a).feedWindow === "24h" }]),
                        onClick: e[16] || (e[16] = (o) => I("24h"))
                      }, l(i(d)("aihot.window.24h")), 3),
                      t("button", {
                        type: "button",
                        class: c(["aihot-pill", { active: i(a).feedWindow === "7d" }]),
                        onClick: e[17] || (e[17] = (o) => I("7d"))
                      }, l(i(d)("aihot.window.7d")), 3)
                    ])
                  ])
                ], 64)) : h("", !0)
              ])) : h("", !0),
              i(a).statusMessage ? (n(), r("p", We, l(E.value), 1)) : h("", !0),
              i(a).errorMessage && V.value ? (n(), r("p", ze, l(i(a).errorMessage), 1)) : h("", !0),
              t("div", He, [
                i(a).errorMessage && !V.value ? (n(), r("p", Ee, l(i(a).errorMessage), 1)) : i(a).isLoading && !V.value ? (n(), r("p", Ge, l(i(d)("aihot.loading")), 1)) : i(a).currentView === "leaderboard" ? (n(), r("div", Ye, [
                  (n(!0), r(y, null, m(A.value, (o, p) => (n(), r("a", {
                    key: o.model + p,
                    href: o.href,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-lb-row"
                  }, [
                    t("div", {
                      class: c(["aihot-lb-rank", {
                        "rank-1": o.rank === "1",
                        "rank-2": o.rank === "2",
                        "rank-3": o.rank === "3"
                      }])
                    }, l(o.rank), 3),
                    t("div", Ke, [
                      t("div", Ue, l(o.model), 1),
                      t("div", Ze, l(o.provider || "权威厂商"), 1)
                    ]),
                    t("div", qe, " ★ " + l(o.score || "-"), 1),
                    t("div", Xe, l(o.releaseDate || "-"), 1),
                    t("div", Je, [
                      t("div", null, [
                        e[27] || (e[27] = T("入 ", -1)),
                        t("strong", null, l(o.inputPrice || "-"), 1)
                      ]),
                      t("div", null, [
                        e[28] || (e[28] = T("出 ", -1)),
                        t("strong", null, l(o.outputPrice || "-"), 1)
                      ])
                    ]),
                    e[29] || (e[29] = t("div", { style: { "text-align": "right" } }, [
                      t("span", {
                        class: "aihot-btn",
                        style: { "font-size": "10.5px" }
                      }, "详情 ↗")
                    ], -1))
                  ], 8, je))), 128)),
                  A.value.length ? h("", !0) : (n(), r("p", Qe, " 没有找到与 “" + l(i(a).leaderboardSearch) + "” 匹配的模型。 ", 1))
                ])) : i(a).currentView === "feed" ? (n(), r("div", et, [
                  (n(!0), r(y, null, m(S.value, (o, p) => (n(), r("a", {
                    key: o.id || o.title + p,
                    href: o.url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-item",
                    onClick: M((u) => L(o), ["prevent"]),
                    onContextmenu: (u) => D(u, o)
                  }, [
                    t("span", {
                      class: c(["aihot-rank", { top: p < 3 }])
                    }, l(p + 1), 3),
                    t("div", at, [
                      t("div", it, l(j(o)), 1),
                      o.summary ? (n(), r("p", ot, l(o.summary), 1)) : h("", !0),
                      t("div", st, [
                        t("span", null, [
                          o.category ? (n(), r("span", lt, l(o.category), 1)) : h("", !0),
                          T(" " + l(K(o)), 1)
                        ]),
                        t("time", null, l(o.published), 1)
                      ])
                    ])
                  ], 40, tt))), 128)),
                  S.value.length ? h("", !0) : (n(), r("p", nt, l(i(d)("aihot.emptyFeed")), 1))
                ])) : i(a).currentView === "daily" ? (n(), r("div", rt, [
                  i(a).dailyArchives.length ? (n(), r("div", dt, [
                    t("button", {
                      type: "button",
                      class: c({ active: !i(a).activeDailyDate }),
                      onClick: e[18] || (e[18] = (o) => F(""))
                    }, "最新", 2),
                    (n(!0), r(y, null, m(i(a).dailyArchives, (o) => (n(), r("button", {
                      key: o.date,
                      type: "button",
                      class: c({ active: o.date === i(a).activeDailyDate }),
                      onClick: (p) => F(o.date)
                    }, l(o.date.slice(5)), 11, ct))), 128))
                  ])) : h("", !0),
                  i(a).dailyArchiveWarning ? (n(), r("p", ut, l(i(a).dailyArchiveWarning), 1)) : h("", !0),
                  !i(a).dailyReport && !i(a).isLoading ? (n(), r("p", ht, "暂无当日日报内容。")) : h("", !0),
                  i(a).dailyReport ? (n(), r("div", pt, [
                    t("div", vt, [
                      t("h3", yt, "📅 AIHOT 官方行业晨报 · " + l(i(a).dailyReport.date), 1),
                      i(a).dailyReport.links?.aihot ? (n(), r("a", {
                        key: 0,
                        href: i(a).dailyReport.links.aihot,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "aihot-btn"
                      }, " 查看官方网页 ↗ ", 8, bt)) : h("", !0)
                    ]),
                    i(a).dailyReport.leadTitle ? (n(), r("p", ft, l(i(a).dailyReport.leadTitle), 1)) : h("", !0),
                    i(a).dailyReport.leadParagraph ? (n(), r("p", gt, l(i(a).dailyReport.leadParagraph), 1)) : i(a).dailyReport.sections.length ? h("", !0) : (n(), r("p", mt, "官方本期暂无更多内容。"))
                  ])) : h("", !0),
                  (n(!0), r(y, null, m(i(a).dailyReport?.sections || [], (o, p) => (n(), r("div", {
                    key: o.label + p,
                    class: "aihot-daily-group"
                  }, [
                    t("div", _t, l(o.label), 1),
                    t("div", kt, [
                      (n(!0), r(y, null, m(o.items, (u, Z) => (n(), r("a", {
                        key: u.id || u.title + Z,
                        href: u.url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "aihot-item",
                        onClick: M((N) => L(u), ["prevent"]),
                        onContextmenu: (N) => D(N, u)
                      }, [
                        t("div", Ct, [
                          t("div", At, l(u.title), 1),
                          u.summary ? (n(), r("p", St, l(u.summary), 1)) : h("", !0),
                          t("div", Vt, [
                            t("span", null, l(u.sourceName), 1),
                            u.published ? (n(), r("time", xt, l(u.published), 1)) : h("", !0)
                          ])
                        ])
                      ], 40, wt))), 128))
                    ])
                  ]))), 128))
                ])) : h("", !0)
              ])
            ])
          ])
        ], 2)
      ], 8, ve),
      (n(), te(oe, { to: "body" }, [
        v.value.visible ? (n(), r("div", {
          key: 0,
          ref_key: "articleMenuRef",
          ref: B,
          class: "aihot-context-menu",
          style: ae(i(W)),
          role: "menu",
          onClick: e[19] || (e[19] = M(() => {
          }, ["stop"]))
        }, [
          t("div", Mt, l(v.value.item?.title), 1),
          ie(ue, {
            label: "💬 发送到聊天室",
            "match-menu-item": "",
            visible: v.value.visible,
            onSelect: O
          }, null, 8, ["visible"])
        ], 4)) : h("", !0)
      ]))
    ], 64));
  }
}), zt = /* @__PURE__ */ pe(Tt, [["__scopeId", "data-v-dd21b788"]]);
export {
  zt as default
};
