import { d as K, w as X, L as J, g as n, h as a, C as u, u as o, t as l, F as y, n as Q, q as ee, i as h, j as m, e as te, k as V, B as ie, s as oe, l as ae, b as se, y as g, o as r, p as $ } from "./vendor-vue-D8gPZiit.js";
import { u as le } from "./useCardActivity-BHRQSZa1.js";
import { d as re, b as _, a as ne } from "./aihot-feed-store-BhbhXdBq.js";
import { aiHotService as k } from "./aihot.service-DHdofX6S.js";
import { r as de, B as ue } from "./view-styles-KXYy1iqP.js";
import { C as ce } from "./ChatShareMenu-dvzPytYe.js";
import { u as he } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { t as d, c as T, _ as pe } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
const ve = ["inert"], ye = { class: "card-head" }, be = { id: "aihot-title" }, fe = {
  id: "aihot-tabs",
  class: "aihot-tabs",
  role: "group",
  "aria-label": "资讯来源"
}, ge = ["title", "disabled"], me = {
  key: 0,
  id: "aihot-subbar",
  class: "aihot-subbar"
}, _e = {
  class: "aihot-pills",
  id: "aihot-lb-provider-pills"
}, ke = { class: "aihot-subbar-right" }, we = ["placeholder"], Ce = {
  class: "aihot-pills",
  id: "aihot-cat-pills"
}, Ae = { class: "aihot-subbar-right" }, Se = {
  class: "aihot-pills",
  id: "aihot-window-pills"
}, xe = {
  key: 1,
  class: "muted small",
  role: "status"
}, Me = {
  key: 2,
  class: "notice",
  role: "status"
}, Ve = { id: "aihot-body" }, $e = {
  key: 0,
  class: "notice"
}, Te = {
  key: 1,
  class: "muted small"
}, Pe = {
  key: 2,
  class: "aihot-lb-list"
}, Le = ["href"], Re = { class: "aihot-lb-model" }, De = { class: "aihot-lb-name" }, Ie = { class: "aihot-lb-provider" }, Fe = {
  class: "aihot-lb-score",
  title: "AIHOT 共识评分"
}, Be = {
  class: "aihot-lb-date aihot-lb-col-hide-mobile",
  title: "上线日期"
}, Ne = {
  class: "aihot-lb-price aihot-lb-col-hide-mobile",
  title: "API 价格（¥/百万Token）"
}, Oe = {
  key: 0,
  class: "muted small"
}, He = {
  key: 3,
  class: "aihot-grid"
}, ze = ["href", "onClick", "onContextmenu"], Ee = { style: { "min-width": "0", flex: "1" } }, We = { class: "aihot-t" }, Ge = {
  key: 0,
  class: "aihot-s"
}, je = { class: "aihot-m" }, qe = {
  key: 0,
  class: "aihot-tag",
  style: { "margin-right": "6px" }
}, Ue = {
  key: 0,
  class: "muted small"
}, Ye = {
  key: 4,
  class: "aihot-daily-wrap"
}, Ze = {
  key: 0,
  class: "daily-news-days"
}, Ke = ["onClick"], Xe = {
  key: 1,
  class: "muted small"
}, Je = {
  key: 2,
  class: "aihot-daily-lead"
}, Qe = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", "margin-bottom": "8px" } }, et = { style: { margin: "0" } }, tt = ["href"], it = {
  key: 0,
  style: { "font-weight": "600", color: "var(--heading)", "margin-bottom": "4px" }
}, ot = { style: { "line-height": "1.6" } }, at = { class: "aihot-daily-group-title" }, st = { class: "aihot-grid" }, lt = ["href", "onClick", "onContextmenu"], rt = { style: { "min-width": "0", flex: "1" } }, nt = { class: "aihot-t" }, dt = {
  key: 0,
  class: "aihot-s"
}, ut = { class: "aihot-m" }, ct = { key: 0 }, ht = {
  key: 3,
  class: "muted small"
}, pt = { class: "menu-head" }, vt = /* @__PURE__ */ K({
  __name: "AihotFeed",
  setup(yt) {
    const v = se({
      visible: !1,
      x: 0,
      y: 0,
      item: null
    });
    function P(s, t) {
      s.preventDefault(), s.stopPropagation(), v.value = {
        visible: !0,
        x: s.clientX,
        y: s.clientY,
        item: t
      };
    }
    function N(s) {
      v.value.item && ue.sendAiHotShare(v.value.item, s), v.value.visible = !1;
    }
    function L() {
      v.value.visible = !1;
    }
    const { menuRef: O, style: H } = he({
      visible: () => v.value.visible,
      anchor: () => ({ x: v.value.x, y: v.value.y }),
      dismiss: L
    }), e = re, { active: w, standalone: z } = le("daily-aihot", "/aihot.html"), C = /* @__PURE__ */ Symbol("aihot-feed-view");
    let R = !1;
    X(w, (s) => {
      if (!s) {
        L(), k.pause(C);
        return;
      }
      if (!R) {
        R = !0, e.currentView = z ? "leaderboard" : "feed";
        try {
          const t = localStorage.getItem("lw-info-feed-view");
          (t === "leaderboard" || t === "feed" || t === "daily") && (e.currentView = t);
          const i = localStorage.getItem("lw-aihot-feed-cat");
          i && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(i) && (e.feedCategory = i), localStorage.getItem("lw-aihot-feed-window") === "7d" && (e.feedWindow = "7d");
        } catch {
        }
      }
      k.activate(C);
    }, { immediate: !0, flush: "sync" }), J(() => {
      k.pause(C);
    });
    const E = g(() => {
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
    }), W = g(() => e.statusMessage === "已获取来源数据。" ? d("aihot.status.dataFetched") : e.statusMessage === "正在显示缓存，检查更新中…" ? d("aihot.status.showingCache") : e.statusMessage === "保留当前已读取的数据；没有数据时显示空列表。" ? d("aihot.status.retainedData") : e.statusMessage), A = g(() => {
      let s = e.leaderboard;
      if (e.leaderboardProvider) {
        const t = e.leaderboardProvider.toLowerCase();
        s = s.filter((i) => i.provider.toLowerCase().includes(t));
      }
      if (e.leaderboardSearch) {
        const t = e.leaderboardSearch.trim().toLowerCase();
        s = s.filter(
          (i) => i.model.toLowerCase().includes(t) || i.provider.toLowerCase().includes(t)
        );
      }
      return s;
    }), G = {
      "ai-models": "模型发布",
      "ai-products": "产品动态",
      industry: "行业动态",
      paper: "学术论文",
      tip: "观点教程"
    }, j = g(() => {
      if (!e.feedCategory) return e.feedArticles;
      const s = e.feedCategory.toLowerCase(), t = G[s] || "", i = e.feedArticles.filter((p) => {
        const c = (p.category || "").toLowerCase();
        return c === s || t && c.includes(t) || s && c.includes(s);
      });
      return i.length ? i : e.feedArticles;
    }), S = g(() => {
      const s = j.value;
      return T.value !== "en" ? s : [...s].sort((t, i) => {
        const p = !!(t.originalTitle && /[a-zA-Z]{3,}/.test(t.originalTitle)), c = !!(i.originalTitle && /[a-zA-Z]{3,}/.test(i.originalTitle));
        return p && !c ? -1 : !p && c ? 1 : 0;
      });
    });
    function q(s) {
      return T.value === "en" && s.originalTitle ? s.originalTitle : s.title;
    }
    function U(s) {
      const t = s.sourceName || "AI HOT";
      return T.value === "en" && t.includes("：") ? t.split("：")[0].trim() : t;
    }
    const x = g(() => e.currentView === "leaderboard" ? A.value.length > 0 : e.currentView === "feed" ? S.value.length > 0 : e.currentView === "daily" ? !!e.dailyReport : !1);
    function M(s) {
      k.switchView(s);
    }
    function Y() {
      k.refresh();
    }
    function D(s) {
      const t = window;
      if (typeof t.openAiHotArticle == "function") {
        t.openAiHotArticle(s.raw || s, s.url);
        return;
      }
      ne.openArticle(
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
      e.leaderboardProvider = s, _.dispatch("select-provider", s);
    }
    function f(s) {
      e.feedCategory = s, _.dispatch("change-category", s);
      try {
        localStorage.setItem("lw-aihot-feed-cat", s);
      } catch {
      }
    }
    function I(s) {
      e.feedWindow = s, _.dispatch("change-window", s);
      try {
        localStorage.setItem("lw-aihot-feed-window", s);
      } catch {
      }
    }
    function F(s) {
      e.activeDailyDate = s, _.dispatch("select-daily-date", s);
    }
    return (s, t) => (r(), n(y, null, [
      a("div", {
        class: "vue-aihot-wrapper",
        inert: !o(w)
      }, [
        a("section", {
          id: "daily-aihot",
          class: u(["card wide", { "card-fullscreen": o(de).activeId === "daily-aihot" }])
        }, [
          a("header", ye, [
            t[20] || (t[20] = a("span", {
              class: "bar",
              style: { background: "linear-gradient(180deg,#34d399,#38bdf8)" }
            }, null, -1)),
            a("h2", be, l(E.value), 1),
            a("div", fe, [
              a("button", {
                type: "button",
                "data-view": "leaderboard",
                class: u({ active: o(e).currentView === "leaderboard" }),
                onClick: t[0] || (t[0] = (i) => M("leaderboard"))
              }, l(o(d)("aihot.tab.leaderboard")), 3),
              a("button", {
                type: "button",
                "data-view": "feed",
                class: u({ active: o(e).currentView === "feed" }),
                onClick: t[1] || (t[1] = (i) => M("feed"))
              }, l(o(d)("aihot.tab.feed")), 3),
              a("button", {
                type: "button",
                "data-view": "daily",
                class: u({ active: o(e).currentView === "daily" }),
                onClick: t[2] || (t[2] = (i) => M("daily"))
              }, l(o(d)("aihot.tab.daily")), 3)
            ]),
            a("button", {
              id: "aihot-refresh",
              class: "icon-btn",
              title: o(d)("aihot.refreshTip"),
              disabled: !o(w) || o(e).isLoading,
              type: "button",
              onClick: Y
            }, " ↻ ", 8, ge)
          ]),
          o(e).currentView === "leaderboard" || o(e).currentView === "feed" ? (r(), n("div", me, [
            o(e).currentView === "leaderboard" ? (r(), n(y, { key: 0 }, [
              a("div", _e, [
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: !o(e).leaderboardProvider }]),
                  onClick: t[3] || (t[3] = (i) => b(""))
                }, l(o(d)("aihot.allProviders")), 3),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).leaderboardProvider === "Anthropic" }]),
                  onClick: t[4] || (t[4] = (i) => b("Anthropic"))
                }, " Anthropic ", 2),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).leaderboardProvider === "OpenAI" }]),
                  onClick: t[5] || (t[5] = (i) => b("OpenAI"))
                }, " OpenAI ", 2),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).leaderboardProvider === "Meta" }]),
                  onClick: t[6] || (t[6] = (i) => b("Meta"))
                }, " Meta ", 2),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).leaderboardProvider === "Google" }]),
                  onClick: t[7] || (t[7] = (i) => b("Google"))
                }, " Google ", 2),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).leaderboardProvider === "DeepSeek" }]),
                  onClick: t[8] || (t[8] = (i) => b("DeepSeek"))
                }, " DeepSeek ", 2)
              ]),
              a("div", ke, [
                Q(a("input", {
                  type: "text",
                  class: "aihot-search-input",
                  id: "aihot-lb-search",
                  placeholder: o(d)("aihot.searchPlaceholder"),
                  "onUpdate:modelValue": t[9] || (t[9] = (i) => o(e).leaderboardSearch = i)
                }, null, 8, we), [
                  [ee, o(e).leaderboardSearch]
                ])
              ])
            ], 64)) : o(e).currentView === "feed" ? (r(), n(y, { key: 1 }, [
              a("div", Ce, [
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: !o(e).feedCategory }]),
                  onClick: t[10] || (t[10] = (i) => f(""))
                }, l(o(d)("aihot.category.all")), 3),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).feedCategory === "ai-models" }]),
                  onClick: t[11] || (t[11] = (i) => f("ai-models"))
                }, l(o(d)("aihot.category.models")), 3),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).feedCategory === "ai-products" }]),
                  onClick: t[12] || (t[12] = (i) => f("ai-products"))
                }, l(o(d)("aihot.category.products")), 3),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).feedCategory === "industry" }]),
                  onClick: t[13] || (t[13] = (i) => f("industry"))
                }, l(o(d)("aihot.category.industry")), 3),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).feedCategory === "paper" }]),
                  onClick: t[14] || (t[14] = (i) => f("paper"))
                }, l(o(d)("aihot.category.paper")), 3),
                a("button", {
                  type: "button",
                  class: u(["aihot-pill", { active: o(e).feedCategory === "tip" }]),
                  onClick: t[15] || (t[15] = (i) => f("tip"))
                }, l(o(d)("aihot.category.tip")), 3)
              ]),
              a("div", Ae, [
                a("div", Se, [
                  a("button", {
                    type: "button",
                    class: u(["aihot-pill", { active: o(e).feedWindow === "24h" }]),
                    onClick: t[16] || (t[16] = (i) => I("24h"))
                  }, l(o(d)("aihot.window.24h")), 3),
                  a("button", {
                    type: "button",
                    class: u(["aihot-pill", { active: o(e).feedWindow === "7d" }]),
                    onClick: t[17] || (t[17] = (i) => I("7d"))
                  }, l(o(d)("aihot.window.7d")), 3)
                ])
              ])
            ], 64)) : h("", !0)
          ])) : h("", !0),
          o(e).statusMessage ? (r(), n("p", xe, l(W.value), 1)) : h("", !0),
          o(e).errorMessage && x.value ? (r(), n("p", Me, l(o(e).errorMessage), 1)) : h("", !0),
          a("div", Ve, [
            o(e).errorMessage && !x.value ? (r(), n("p", $e, l(o(e).errorMessage), 1)) : o(e).isLoading && !x.value ? (r(), n("p", Te, l(o(d)("aihot.loading")), 1)) : o(e).currentView === "leaderboard" ? (r(), n("div", Pe, [
              (r(!0), n(y, null, m(A.value, (i, p) => (r(), n("a", {
                key: i.model + p,
                href: i.href,
                target: "_blank",
                rel: "noreferrer",
                class: "aihot-lb-row"
              }, [
                a("div", {
                  class: u(["aihot-lb-rank", {
                    "rank-1": i.rank === "1",
                    "rank-2": i.rank === "2",
                    "rank-3": i.rank === "3"
                  }])
                }, l(i.rank), 3),
                a("div", Re, [
                  a("div", De, l(i.model), 1),
                  a("div", Ie, l(i.provider || "权威厂商"), 1)
                ]),
                a("div", Fe, " ★ " + l(i.score || "-"), 1),
                a("div", Be, l(i.releaseDate || "-"), 1),
                a("div", Ne, [
                  a("div", null, [
                    t[21] || (t[21] = $("入 ", -1)),
                    a("strong", null, l(i.inputPrice || "-"), 1)
                  ]),
                  a("div", null, [
                    t[22] || (t[22] = $("出 ", -1)),
                    a("strong", null, l(i.outputPrice || "-"), 1)
                  ])
                ]),
                t[23] || (t[23] = a("div", { style: { "text-align": "right" } }, [
                  a("span", {
                    class: "aihot-btn",
                    style: { "font-size": "10.5px" }
                  }, "详情 ↗")
                ], -1))
              ], 8, Le))), 128)),
              A.value.length ? h("", !0) : (r(), n("p", Oe, " 没有找到与 “" + l(o(e).leaderboardSearch) + "” 匹配的模型。 ", 1))
            ])) : o(e).currentView === "feed" ? (r(), n("div", He, [
              (r(!0), n(y, null, m(S.value, (i, p) => (r(), n("a", {
                key: i.id || i.title + p,
                href: i.url,
                target: "_blank",
                rel: "noreferrer",
                class: "aihot-item",
                onClick: V((c) => D(i), ["prevent"]),
                onContextmenu: (c) => P(c, i)
              }, [
                a("span", {
                  class: u(["aihot-rank", { top: p < 3 }])
                }, l(p + 1), 3),
                a("div", Ee, [
                  a("div", We, l(q(i)), 1),
                  i.summary ? (r(), n("p", Ge, l(i.summary), 1)) : h("", !0),
                  a("div", je, [
                    a("span", null, [
                      i.category ? (r(), n("span", qe, l(i.category), 1)) : h("", !0),
                      $(" " + l(U(i)), 1)
                    ]),
                    a("time", null, l(i.published), 1)
                  ])
                ])
              ], 40, ze))), 128)),
              S.value.length ? h("", !0) : (r(), n("p", Ue, l(o(d)("aihot.emptyFeed")), 1))
            ])) : o(e).currentView === "daily" ? (r(), n("div", Ye, [
              o(e).dailyArchives.length ? (r(), n("div", Ze, [
                a("button", {
                  type: "button",
                  class: u({ active: !o(e).activeDailyDate }),
                  onClick: t[18] || (t[18] = (i) => F(""))
                }, "最新", 2),
                (r(!0), n(y, null, m(o(e).dailyArchives, (i) => (r(), n("button", {
                  key: i.date,
                  type: "button",
                  class: u({ active: i.date === o(e).activeDailyDate }),
                  onClick: (p) => F(i.date)
                }, l(i.date.slice(5)), 11, Ke))), 128))
              ])) : h("", !0),
              !o(e).dailyReport && !o(e).isLoading ? (r(), n("p", Xe, "暂无当日日报内容。")) : h("", !0),
              o(e).dailyReport ? (r(), n("div", Je, [
                a("div", Qe, [
                  a("h3", et, "📅 AIHOT 官方行业晨报 · " + l(o(e).dailyReport.date), 1),
                  o(e).dailyReport.links?.aihot ? (r(), n("a", {
                    key: 0,
                    href: o(e).dailyReport.links.aihot,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-btn"
                  }, " 查看官方网页 ↗ ", 8, tt)) : h("", !0)
                ]),
                o(e).dailyReport.leadTitle ? (r(), n("p", it, l(o(e).dailyReport.leadTitle), 1)) : h("", !0),
                a("p", ot, l(o(e).dailyReport.leadParagraph || "每天早晨精编汇总过去 24 小时 AI 行业的重大发布、算力生态与前沿突破。"), 1)
              ])) : h("", !0),
              (r(!0), n(y, null, m(o(e).dailyReport?.sections || [], (i, p) => (r(), n("div", {
                key: i.label + p,
                class: "aihot-daily-group"
              }, [
                a("div", at, l(i.label), 1),
                a("div", st, [
                  (r(!0), n(y, null, m(i.items, (c, Z) => (r(), n("a", {
                    key: c.id || c.title + Z,
                    href: c.url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-item",
                    onClick: V((B) => D(c), ["prevent"]),
                    onContextmenu: (B) => P(B, c)
                  }, [
                    a("div", rt, [
                      a("div", nt, l(c.title), 1),
                      c.summary ? (r(), n("p", dt, l(c.summary), 1)) : h("", !0),
                      a("div", ut, [
                        a("span", null, l(c.sourceName), 1),
                        c.published ? (r(), n("time", ct, l(c.published), 1)) : h("", !0)
                      ])
                    ])
                  ], 40, lt))), 128))
                ])
              ]))), 128)),
              o(e).dailyReport ? h("", !0) : (r(), n("p", ht, " 暂无官方日报内容。 "))
            ])) : h("", !0)
          ])
        ], 2)
      ], 8, ve),
      (r(), te(ae, { to: "body" }, [
        v.value.visible ? (r(), n("div", {
          key: 0,
          ref_key: "articleMenuRef",
          ref: O,
          class: "aihot-context-menu",
          style: ie(o(H)),
          role: "menu",
          onClick: t[19] || (t[19] = V(() => {
          }, ["stop"]))
        }, [
          a("div", pt, l(v.value.item?.title), 1),
          oe(ce, {
            label: "💬 发送到聊天室",
            "match-menu-item": "",
            visible: v.value.visible,
            onSelect: N
          }, null, 8, ["visible"])
        ], 4)) : h("", !0)
      ]))
    ], 64));
  }
}), At = /* @__PURE__ */ pe(vt, [["__scopeId", "data-v-eaa132d1"]]);
export {
  At as default
};
