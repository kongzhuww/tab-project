import { d as z, w as G, H as j, f as l, g as n, h as a, u as i, s as c, t as r, F as v, p as K, v as U, j as h, i as g, m as $, k as R, x as f } from "./vendor-vue-BbmU9NUg.js";
import { u as Y } from "./useCardActivity-CM0pgPQ4.js";
import { b as Z, a as _ } from "./aihot-feed-store-Q9eysfNQ.js";
import { a as q } from "./store-JMgrjhaR.js";
import { aiHotService as w } from "./aihot.service-Dz15sTJc.js";
import { g as J } from "./search.service-B3Axreqn.js";
import { t as d, c as D } from "./_plugin-vue_export-helper-CP_tFnee.js";
const Q = ["inert"], X = { class: "aihot-workspace" }, ee = ["aria-label"], te = { class: "aihot-nav-wrap" }, ae = ["aria-pressed"], ie = { class: "aihot-nav-main" }, oe = { class: "aihot-nav-copy" }, se = { class: "aihot-nav-wrap" }, re = ["aria-pressed"], le = { class: "aihot-nav-main" }, ne = { class: "aihot-nav-copy" }, de = { class: "aihot-nav-wrap" }, ce = ["aria-pressed"], ue = { class: "aihot-nav-main" }, he = { class: "aihot-nav-copy" }, pe = { class: "aihot-main" }, ve = { class: "card-head" }, ye = { id: "aihot-title" }, be = ["title", "disabled"], fe = {
  key: 0,
  id: "aihot-subbar",
  class: "aihot-subbar"
}, ge = {
  class: "aihot-pills",
  id: "aihot-lb-provider-pills"
}, _e = { class: "aihot-subbar-right" }, we = ["placeholder"], me = {
  class: "aihot-pills",
  id: "aihot-cat-pills"
}, ke = { class: "aihot-subbar-right" }, Ce = {
  class: "aihot-pills",
  id: "aihot-window-pills"
}, Ae = {
  key: 1,
  class: "muted small",
  role: "status"
}, Se = {
  key: 2,
  class: "notice",
  role: "status"
}, Ve = { id: "aihot-body" }, $e = {
  key: 0,
  class: "notice"
}, De = {
  key: 1,
  class: "muted small"
}, Pe = {
  key: 2,
  class: "aihot-lb-list"
}, Te = ["href"], Le = { class: "aihot-lb-model" }, Me = { class: "aihot-lb-name" }, Re = { class: "aihot-lb-provider" }, xe = {
  class: "aihot-lb-score",
  title: "AIHOT 共识评分"
}, Ie = {
  class: "aihot-lb-date aihot-lb-col-hide-mobile",
  title: "上线日期"
}, Fe = {
  class: "aihot-lb-price aihot-lb-col-hide-mobile",
  title: "API 价格（¥/百万Token）"
}, Ne = {
  key: 0,
  class: "muted small"
}, Oe = {
  key: 3,
  class: "aihot-grid"
}, We = ["href", "onClick"], Be = { style: { "min-width": "0", flex: "1" } }, He = { class: "aihot-t" }, Ee = {
  key: 0,
  class: "aihot-s"
}, ze = { class: "aihot-m" }, Ge = {
  key: 0,
  class: "aihot-tag",
  style: { "margin-right": "6px" }
}, je = {
  key: 0,
  class: "muted small"
}, Ke = {
  key: 4,
  class: "aihot-daily-wrap"
}, Ue = {
  key: 0,
  class: "daily-news-days"
}, Ye = ["onClick"], Ze = {
  key: 1,
  class: "muted small",
  role: "status"
}, qe = {
  key: 2,
  class: "muted small"
}, Je = {
  key: 3,
  class: "aihot-daily-lead"
}, Qe = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", "margin-bottom": "8px" } }, Xe = { style: { margin: "0" } }, et = ["href"], tt = {
  key: 0,
  style: { "font-weight": "600", color: "var(--heading)", "margin-bottom": "4px" }
}, at = {
  key: 1,
  style: { "line-height": "1.6" }
}, it = {
  key: 2,
  class: "muted small"
}, ot = { class: "aihot-daily-group-title" }, st = { class: "aihot-grid" }, rt = ["href", "onClick"], lt = { style: { "min-width": "0", flex: "1" } }, nt = { class: "aihot-t" }, dt = {
  key: 0,
  class: "aihot-s"
}, ct = { class: "aihot-m" }, ut = { key: 0 }, mt = /* @__PURE__ */ z({
  __name: "AihotFeed",
  setup(ht) {
    const e = Z, { active: m, standalone: x } = Y("daily-aihot", "/aihot.html"), k = /* @__PURE__ */ Symbol("aihot-feed-view");
    let P = !1;
    G(m, (s) => {
      if (!s) {
        w.pause(k);
        return;
      }
      if (!P) {
        P = !0, e.currentView = x ? "leaderboard" : "feed";
        try {
          const t = localStorage.getItem("lw-info-feed-view");
          (t === "leaderboard" || t === "feed" || t === "daily") && (e.currentView = t);
          const o = localStorage.getItem("lw-aihot-feed-cat");
          o && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(o) && (e.feedCategory = o), localStorage.getItem("lw-aihot-feed-window") === "7d" && (e.feedWindow = "7d");
        } catch {
        }
      }
      w.activate(k);
    }, { immediate: !0, flush: "sync" }), j(() => {
      w.pause(k);
    });
    const I = f(() => {
      switch (e.currentView) {
        case "leaderboard":
          return d("aihot.view.leaderboard");
        case "feed":
          return d("aihot.view.feed");
        case "daily":
          return d("aihot.view.daily");
        default:
          return d("aihot.view.default");
      }
    }), F = f(() => e.statusMessage === "已获取来源数据。" ? d("aihot.status.dataFetched") : e.statusMessage === "正在显示缓存，检查更新中…" ? d("aihot.status.showingCache") : e.statusMessage === "保留当前已读取的数据；没有数据时显示空列表。" ? d("aihot.status.retainedData") : e.statusMessage), C = f(() => {
      let s = e.leaderboard;
      if (e.leaderboardProvider) {
        const t = e.leaderboardProvider.toLowerCase();
        s = s.filter((o) => o.provider.toLowerCase().includes(t));
      }
      if (e.leaderboardSearch) {
        const t = e.leaderboardSearch.trim().toLowerCase();
        s = s.filter(
          (o) => o.model.toLowerCase().includes(t) || o.provider.toLowerCase().includes(t)
        );
      }
      return s;
    }), N = {
      "ai-models": "模型发布",
      "ai-products": "产品动态",
      industry: "行业动态",
      paper: "学术论文",
      tip: "观点教程"
    }, O = f(() => {
      if (!e.feedCategory) return e.feedArticles;
      const s = e.feedCategory.toLowerCase(), t = N[s] || "", o = e.feedArticles.filter((p) => {
        const u = (p.category || "").toLowerCase();
        return u === s || t && u.includes(t) || s && u.includes(s);
      });
      return o.length ? o : e.feedArticles;
    }), A = f(() => {
      const s = O.value;
      return D.value !== "en" ? s : [...s].sort((t, o) => {
        const p = !!(t.originalTitle && /[a-zA-Z]{3,}/.test(t.originalTitle)), u = !!(o.originalTitle && /[a-zA-Z]{3,}/.test(o.originalTitle));
        return p && !u ? -1 : !p && u ? 1 : 0;
      });
    });
    function W(s) {
      return D.value === "en" && s.originalTitle ? s.originalTitle : s.title;
    }
    function B(s) {
      const t = s.sourceName || "AI HOT";
      return D.value === "en" && t.includes("：") ? t.split("：")[0].trim() : t;
    }
    const S = f(() => e.currentView === "leaderboard" ? C.value.length > 0 : e.currentView === "feed" ? A.value.length > 0 : e.currentView === "daily" ? !!e.dailyReport : !1);
    function V(s) {
      w.switchView(s);
    }
    function H() {
      w.refresh();
    }
    function T(s) {
      const t = window;
      if (typeof t.openAiHotArticle == "function") {
        t.openAiHotArticle(s.raw || s, s.url);
        return;
      }
      q.openArticle(
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
    function y(s) {
      e.leaderboardProvider = s, _.dispatch("select-provider", s);
    }
    function b(s) {
      e.feedCategory = s, _.dispatch("change-category", s);
      try {
        localStorage.setItem("lw-aihot-feed-cat", s);
      } catch {
      }
    }
    function L(s) {
      e.feedWindow = s, _.dispatch("change-window", s);
      try {
        localStorage.setItem("lw-aihot-feed-window", s);
      } catch {
      }
    }
    function M(s) {
      e.activeDailyDate = s, _.dispatch("select-daily-date", s);
    }
    return (s, t) => (l(), n("div", {
      class: "vue-aihot-wrapper",
      inert: !i(m)
    }, [
      a("section", {
        id: "daily-aihot",
        class: c(["card wide", { "card-fullscreen": i(J).activeId === "daily-aihot" }])
      }, [
        a("div", X, [
          a("nav", {
            id: "aihot-tabs",
            class: "aihot-tabs",
            "aria-label": i(d)("aihot.nav.label")
          }, [
            a("div", te, [
              a("button", {
                type: "button",
                "data-view": "leaderboard",
                class: c(["aihot-nav-card rank", { active: i(e).currentView === "leaderboard" }]),
                "aria-pressed": i(e).currentView === "leaderboard",
                onClick: t[0] || (t[0] = (o) => V("leaderboard"))
              }, [
                a("span", ie, [
                  t[19] || (t[19] = a("span", {
                    class: "aihot-nav-icon",
                    "aria-hidden": "true"
                  }, "🏆", -1)),
                  a("span", oe, [
                    a("strong", null, r(i(d)("aihot.nav.rank")), 1),
                    a("small", null, r(i(d)("aihot.nav.rankDesc")), 1)
                  ])
                ]),
                t[20] || (t[20] = a("span", { class: "aihot-nav-badge" }, "RANK", -1))
              ], 10, ae)
            ]),
            a("div", se, [
              a("button", {
                type: "button",
                "data-view": "feed",
                class: c(["aihot-nav-card feed", { active: i(e).currentView === "feed" }]),
                "aria-pressed": i(e).currentView === "feed",
                onClick: t[1] || (t[1] = (o) => V("feed"))
              }, [
                a("span", le, [
                  t[21] || (t[21] = a("span", {
                    class: "aihot-nav-icon",
                    "aria-hidden": "true"
                  }, "✦", -1)),
                  a("span", ne, [
                    a("strong", null, r(i(d)("aihot.nav.feed")), 1),
                    a("small", null, r(i(d)("aihot.nav.feedDesc")), 1)
                  ])
                ]),
                t[22] || (t[22] = a("span", { class: "aihot-nav-badge" }, "NEWS", -1))
              ], 10, re)
            ]),
            a("div", de, [
              a("button", {
                type: "button",
                "data-view": "daily",
                class: c(["aihot-nav-card daily", { active: i(e).currentView === "daily" }]),
                "aria-pressed": i(e).currentView === "daily",
                onClick: t[2] || (t[2] = (o) => V("daily"))
              }, [
                a("span", ue, [
                  t[23] || (t[23] = a("span", {
                    class: "aihot-nav-icon",
                    "aria-hidden": "true"
                  }, "📰", -1)),
                  a("span", he, [
                    a("strong", null, r(i(d)("aihot.nav.daily")), 1),
                    a("small", null, r(i(d)("aihot.nav.dailyDesc")), 1)
                  ])
                ]),
                t[24] || (t[24] = a("span", { class: "aihot-nav-badge" }, "DAILY", -1))
              ], 10, ce)
            ])
          ], 8, ee),
          a("main", pe, [
            a("header", ve, [
              t[25] || (t[25] = a("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#34d399,#38bdf8)" }
              }, null, -1)),
              a("h2", ye, r(I.value), 1),
              a("button", {
                id: "aihot-refresh",
                class: "icon-btn",
                title: i(d)("aihot.refreshTip"),
                disabled: !i(m) || i(e).isLoading,
                type: "button",
                onClick: H
              }, "↻", 8, be)
            ]),
            i(e).currentView === "leaderboard" || i(e).currentView === "feed" ? (l(), n("div", fe, [
              i(e).currentView === "leaderboard" ? (l(), n(v, { key: 0 }, [
                a("div", ge, [
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: !i(e).leaderboardProvider }]),
                    onClick: t[3] || (t[3] = (o) => y(""))
                  }, r(i(d)("aihot.allProviders")), 3),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).leaderboardProvider === "Anthropic" }]),
                    onClick: t[4] || (t[4] = (o) => y("Anthropic"))
                  }, " Anthropic ", 2),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).leaderboardProvider === "OpenAI" }]),
                    onClick: t[5] || (t[5] = (o) => y("OpenAI"))
                  }, " OpenAI ", 2),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).leaderboardProvider === "Meta" }]),
                    onClick: t[6] || (t[6] = (o) => y("Meta"))
                  }, " Meta ", 2),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).leaderboardProvider === "Google" }]),
                    onClick: t[7] || (t[7] = (o) => y("Google"))
                  }, " Google ", 2),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).leaderboardProvider === "DeepSeek" }]),
                    onClick: t[8] || (t[8] = (o) => y("DeepSeek"))
                  }, " DeepSeek ", 2)
                ]),
                a("div", _e, [
                  K(a("input", {
                    type: "text",
                    class: "aihot-search-input",
                    id: "aihot-lb-search",
                    placeholder: i(d)("aihot.searchPlaceholder"),
                    "onUpdate:modelValue": t[9] || (t[9] = (o) => i(e).leaderboardSearch = o)
                  }, null, 8, we), [
                    [U, i(e).leaderboardSearch]
                  ])
                ])
              ], 64)) : i(e).currentView === "feed" ? (l(), n(v, { key: 1 }, [
                a("div", me, [
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: !i(e).feedCategory }]),
                    onClick: t[10] || (t[10] = (o) => b(""))
                  }, r(i(d)("aihot.category.all")), 3),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).feedCategory === "ai-models" }]),
                    onClick: t[11] || (t[11] = (o) => b("ai-models"))
                  }, r(i(d)("aihot.category.models")), 3),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).feedCategory === "ai-products" }]),
                    onClick: t[12] || (t[12] = (o) => b("ai-products"))
                  }, r(i(d)("aihot.category.products")), 3),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).feedCategory === "industry" }]),
                    onClick: t[13] || (t[13] = (o) => b("industry"))
                  }, r(i(d)("aihot.category.industry")), 3),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).feedCategory === "paper" }]),
                    onClick: t[14] || (t[14] = (o) => b("paper"))
                  }, r(i(d)("aihot.category.paper")), 3),
                  a("button", {
                    type: "button",
                    class: c(["aihot-pill", { active: i(e).feedCategory === "tip" }]),
                    onClick: t[15] || (t[15] = (o) => b("tip"))
                  }, r(i(d)("aihot.category.tip")), 3)
                ]),
                a("div", ke, [
                  a("div", Ce, [
                    a("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(e).feedWindow === "24h" }]),
                      onClick: t[16] || (t[16] = (o) => L("24h"))
                    }, r(i(d)("aihot.window.24h")), 3),
                    a("button", {
                      type: "button",
                      class: c(["aihot-pill", { active: i(e).feedWindow === "7d" }]),
                      onClick: t[17] || (t[17] = (o) => L("7d"))
                    }, r(i(d)("aihot.window.7d")), 3)
                  ])
                ])
              ], 64)) : h("", !0)
            ])) : h("", !0),
            i(e).statusMessage ? (l(), n("p", Ae, r(F.value), 1)) : h("", !0),
            i(e).errorMessage && S.value ? (l(), n("p", Se, r(i(e).errorMessage), 1)) : h("", !0),
            a("div", Ve, [
              i(e).errorMessage && !S.value ? (l(), n("p", $e, r(i(e).errorMessage), 1)) : i(e).isLoading && !S.value ? (l(), n("p", De, r(i(d)("aihot.loading")), 1)) : i(e).currentView === "leaderboard" ? (l(), n("div", Pe, [
                (l(!0), n(v, null, g(C.value, (o, p) => (l(), n("a", {
                  key: o.model + p,
                  href: o.href,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "aihot-lb-row"
                }, [
                  a("div", {
                    class: c(["aihot-lb-rank", {
                      "rank-1": o.rank === "1",
                      "rank-2": o.rank === "2",
                      "rank-3": o.rank === "3"
                    }])
                  }, r(o.rank), 3),
                  a("div", Le, [
                    a("div", Me, r(o.model), 1),
                    a("div", Re, r(o.provider || "权威厂商"), 1)
                  ]),
                  a("div", xe, " ★ " + r(o.score || "-"), 1),
                  a("div", Ie, r(o.releaseDate || "-"), 1),
                  a("div", Fe, [
                    a("div", null, [
                      t[26] || (t[26] = $("入 ", -1)),
                      a("strong", null, r(o.inputPrice || "-"), 1)
                    ]),
                    a("div", null, [
                      t[27] || (t[27] = $("出 ", -1)),
                      a("strong", null, r(o.outputPrice || "-"), 1)
                    ])
                  ]),
                  t[28] || (t[28] = a("div", { style: { "text-align": "right" } }, [
                    a("span", {
                      class: "aihot-btn",
                      style: { "font-size": "10.5px" }
                    }, "详情 ↗")
                  ], -1))
                ], 8, Te))), 128)),
                C.value.length ? h("", !0) : (l(), n("p", Ne, " 没有找到与 “" + r(i(e).leaderboardSearch) + "” 匹配的模型。 ", 1))
              ])) : i(e).currentView === "feed" ? (l(), n("div", Oe, [
                (l(!0), n(v, null, g(A.value, (o, p) => (l(), n("a", {
                  key: o.id || o.title + p,
                  href: o.url,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "aihot-item",
                  onClick: R((u) => T(o), ["prevent"])
                }, [
                  a("span", {
                    class: c(["aihot-rank", { top: p < 3 }])
                  }, r(p + 1), 3),
                  a("div", Be, [
                    a("div", He, r(W(o)), 1),
                    o.summary ? (l(), n("p", Ee, r(o.summary), 1)) : h("", !0),
                    a("div", ze, [
                      a("span", null, [
                        o.category ? (l(), n("span", Ge, r(o.category), 1)) : h("", !0),
                        $(" " + r(B(o)), 1)
                      ]),
                      a("time", null, r(o.published), 1)
                    ])
                  ])
                ], 8, We))), 128)),
                A.value.length ? h("", !0) : (l(), n("p", je, r(i(d)("aihot.emptyFeed")), 1))
              ])) : i(e).currentView === "daily" ? (l(), n("div", Ke, [
                i(e).dailyArchives.length ? (l(), n("div", Ue, [
                  a("button", {
                    type: "button",
                    class: c({ active: !i(e).activeDailyDate }),
                    onClick: t[18] || (t[18] = (o) => M(""))
                  }, "最新", 2),
                  (l(!0), n(v, null, g(i(e).dailyArchives, (o) => (l(), n("button", {
                    key: o.date,
                    type: "button",
                    class: c({ active: o.date === i(e).activeDailyDate }),
                    onClick: (p) => M(o.date)
                  }, r(o.date.slice(5)), 11, Ye))), 128))
                ])) : h("", !0),
                i(e).dailyArchiveWarning ? (l(), n("p", Ze, r(i(e).dailyArchiveWarning), 1)) : h("", !0),
                !i(e).dailyReport && !i(e).isLoading ? (l(), n("p", qe, "暂无当日日报内容。")) : h("", !0),
                i(e).dailyReport ? (l(), n("div", Je, [
                  a("div", Qe, [
                    a("h3", Xe, "📅 AIHOT 官方行业晨报 · " + r(i(e).dailyReport.date), 1),
                    i(e).dailyReport.links?.aihot ? (l(), n("a", {
                      key: 0,
                      href: i(e).dailyReport.links.aihot,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "aihot-btn"
                    }, " 查看官方网页 ↗ ", 8, et)) : h("", !0)
                  ]),
                  i(e).dailyReport.leadTitle ? (l(), n("p", tt, r(i(e).dailyReport.leadTitle), 1)) : h("", !0),
                  i(e).dailyReport.leadParagraph ? (l(), n("p", at, r(i(e).dailyReport.leadParagraph), 1)) : i(e).dailyReport.sections.length ? h("", !0) : (l(), n("p", it, "官方本期暂无更多内容。"))
                ])) : h("", !0),
                (l(!0), n(v, null, g(i(e).dailyReport?.sections || [], (o, p) => (l(), n("div", {
                  key: o.label + p,
                  class: "aihot-daily-group"
                }, [
                  a("div", ot, r(o.label), 1),
                  a("div", st, [
                    (l(!0), n(v, null, g(o.items, (u, E) => (l(), n("a", {
                      key: u.id || u.title + E,
                      href: u.url,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "aihot-item",
                      onClick: R((pt) => T(u), ["prevent"])
                    }, [
                      a("div", lt, [
                        a("div", nt, r(u.title), 1),
                        u.summary ? (l(), n("p", dt, r(u.summary), 1)) : h("", !0),
                        a("div", ct, [
                          a("span", null, r(u.sourceName), 1),
                          u.published ? (l(), n("time", ut, r(u.published), 1)) : h("", !0)
                        ])
                      ])
                    ], 8, rt))), 128))
                  ])
                ]))), 128))
              ])) : h("", !0)
            ])
          ])
        ])
      ], 2)
    ], 8, Q));
  }
});
export {
  mt as default
};
