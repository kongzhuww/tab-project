import { d as E, x as j, L as U, e as r, f as i, B as d, u as a, t as n, F as v, l as Y, n as q, g as c, h as f, c as K, i as V, A as X, D as J, j as Q, b as Z, s as k, o as l, m as $ } from "./vendor-vue-DokqDua_.js";
import { u as ee } from "./useCardActivity-CPP0eRNc.js";
import { d as te, b as m, a as oe } from "./aihot-feed-store-CCxG97IT.js";
import { aiHotService as g } from "./aihot.service-B_v2GyIl.js";
import { r as ie, B as ae } from "./view-styles-SpWNtsrK.js";
import { C as se } from "./ChatShareMenu-B5TlfJPq.js";
import { u as le } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { _ as re } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const ne = ["inert"], de = { class: "card-head" }, ue = { id: "aihot-title" }, ce = {
  id: "aihot-tabs",
  class: "aihot-tabs",
  role: "group",
  "aria-label": "资讯来源"
}, he = ["disabled"], pe = {
  key: 0,
  id: "aihot-subbar",
  class: "aihot-subbar"
}, ve = {
  class: "aihot-pills",
  id: "aihot-lb-provider-pills"
}, ye = { class: "aihot-subbar-right" }, be = {
  class: "aihot-pills",
  id: "aihot-cat-pills"
}, fe = { class: "aihot-subbar-right" }, me = {
  class: "aihot-pills",
  id: "aihot-window-pills"
}, ge = {
  key: 1,
  class: "muted small",
  role: "status"
}, ke = {
  key: 2,
  class: "notice",
  role: "status"
}, _e = { id: "aihot-body" }, we = {
  key: 0,
  class: "notice"
}, Ce = {
  key: 1,
  class: "muted small"
}, Ae = {
  key: 2,
  class: "aihot-lb-list"
}, Se = ["href"], xe = { class: "aihot-lb-model" }, Ve = { class: "aihot-lb-name" }, $e = { class: "aihot-lb-provider" }, Me = {
  class: "aihot-lb-score",
  title: "AIHOT 共识评分"
}, Ie = {
  class: "aihot-lb-date aihot-lb-col-hide-mobile",
  title: "上线日期"
}, Re = {
  class: "aihot-lb-price aihot-lb-col-hide-mobile",
  title: "API 价格（¥/百万Token）"
}, De = {
  key: 0,
  class: "muted small"
}, Le = {
  key: 3,
  class: "aihot-grid"
}, Pe = ["href", "onClick", "onContextmenu"], Te = { style: { "min-width": "0", flex: "1" } }, Oe = { class: "aihot-t" }, He = {
  key: 0,
  class: "aihot-s"
}, Be = { class: "aihot-m" }, Fe = {
  key: 0,
  class: "aihot-tag",
  style: { "margin-right": "6px" }
}, Ne = {
  key: 0,
  class: "muted small"
}, We = {
  key: 4,
  class: "aihot-daily-wrap"
}, ze = {
  key: 0,
  class: "daily-news-days"
}, Ge = ["onClick"], Ee = {
  key: 1,
  class: "muted small"
}, je = {
  key: 2,
  class: "aihot-daily-lead"
}, Ue = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", "margin-bottom": "8px" } }, Ye = { style: { margin: "0" } }, qe = ["href"], Ke = {
  key: 0,
  style: { "font-weight": "600", color: "var(--heading)", "margin-bottom": "4px" }
}, Xe = { style: { "line-height": "1.6" } }, Je = { class: "aihot-daily-group-title" }, Qe = { class: "aihot-grid" }, Ze = ["href", "onClick", "onContextmenu"], et = { style: { "min-width": "0", flex: "1" } }, tt = { class: "aihot-t" }, ot = {
  key: 0,
  class: "aihot-s"
}, it = { class: "aihot-m" }, at = { key: 0 }, st = {
  key: 3,
  class: "muted small"
}, lt = { class: "menu-head" }, rt = /* @__PURE__ */ E({
  __name: "AihotFeed",
  setup(nt) {
    const h = Z({
      visible: !1,
      x: 0,
      y: 0,
      item: null
    });
    function M(s, t) {
      s.preventDefault(), s.stopPropagation(), h.value = {
        visible: !0,
        x: s.clientX,
        y: s.clientY,
        item: t
      };
    }
    function O(s) {
      h.value.item && ae.sendAiHotShare(h.value.item, s), h.value.visible = !1;
    }
    function I() {
      h.value.visible = !1;
    }
    const { menuRef: H, style: B } = le({
      visible: () => h.value.visible,
      anchor: () => ({ x: h.value.x, y: h.value.y }),
      dismiss: I
    }), e = te, { active: _, standalone: F } = ee("daily-aihot", "/aihot.html"), w = /* @__PURE__ */ Symbol("aihot-feed-view");
    let R = !1;
    j(_, (s) => {
      if (!s) {
        I(), g.pause(w);
        return;
      }
      if (!R) {
        R = !0, e.currentView = F ? "leaderboard" : "feed";
        try {
          const t = localStorage.getItem("lw-info-feed-view");
          (t === "leaderboard" || t === "feed" || t === "daily") && (e.currentView = t);
          const o = localStorage.getItem("lw-aihot-feed-cat");
          o && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(o) && (e.feedCategory = o), localStorage.getItem("lw-aihot-feed-window") === "7d" && (e.feedWindow = "7d");
        } catch {
        }
      }
      g.activate(w);
    }, { immediate: !0, flush: "sync" }), U(() => {
      g.pause(w);
    });
    const N = k(() => {
      switch (e.currentView) {
        case "leaderboard":
          return "AI HOT 模型榜";
        case "feed":
          return "AI HOT 精选资讯";
        case "daily":
          return "AI HOT 官方日报";
        default:
          return "AI HOT 资讯流";
      }
    }), C = k(() => {
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
    }), W = {
      "ai-models": "模型发布",
      "ai-products": "产品动态",
      industry: "行业动态",
      paper: "学术论文",
      tip: "观点教程"
    }, A = k(() => {
      if (!e.feedCategory) return e.feedArticles;
      const s = e.feedCategory.toLowerCase(), t = W[s] || "", o = e.feedArticles.filter((p) => {
        const u = (p.category || "").toLowerCase();
        return u === s || t && u.includes(t) || s && u.includes(s);
      });
      return o.length ? o : e.feedArticles;
    }), S = k(() => e.currentView === "leaderboard" ? C.value.length > 0 : e.currentView === "feed" ? A.value.length > 0 : e.currentView === "daily" ? !!e.dailyReport : !1);
    function x(s) {
      g.switchView(s);
    }
    function z() {
      g.refresh();
    }
    function D(s) {
      const t = window;
      if (typeof t.openAiHotArticle == "function") {
        t.openAiHotArticle(s.raw || s, s.url);
        return;
      }
      oe.openArticle(
        {
          id: s.id,
          title: s.title,
          summary: s.summary,
          sourceName: s.sourceName,
          published: s.published,
          url: s.url
        },
        ""
      ), m.dispatch("select-article", s);
    }
    function y(s) {
      e.leaderboardProvider = s, m.dispatch("select-provider", s);
    }
    function b(s) {
      e.feedCategory = s, m.dispatch("change-category", s);
      try {
        localStorage.setItem("lw-aihot-feed-cat", s);
      } catch {
      }
    }
    function L(s) {
      e.feedWindow = s, m.dispatch("change-window", s);
      try {
        localStorage.setItem("lw-aihot-feed-window", s);
      } catch {
      }
    }
    function P(s) {
      e.activeDailyDate = s, m.dispatch("select-daily-date", s);
    }
    return (s, t) => (l(), r(v, null, [
      i("div", {
        class: "vue-aihot-wrapper",
        inert: !a(_)
      }, [
        i("section", {
          id: "daily-aihot",
          class: d(["card wide", { "card-fullscreen": a(ie).activeId === "daily-aihot" }])
        }, [
          i("header", de, [
            t[20] || (t[20] = i("span", {
              class: "bar",
              style: { background: "linear-gradient(180deg,#34d399,#38bdf8)" }
            }, null, -1)),
            i("h2", ue, n(N.value), 1),
            i("div", ce, [
              i("button", {
                type: "button",
                "data-view": "leaderboard",
                class: d({ active: a(e).currentView === "leaderboard" }),
                onClick: t[0] || (t[0] = (o) => x("leaderboard"))
              }, " 🏆 模型榜 ", 2),
              i("button", {
                type: "button",
                "data-view": "feed",
                class: d({ active: a(e).currentView === "feed" }),
                onClick: t[1] || (t[1] = (o) => x("feed"))
              }, " ✦ 精选资讯 ", 2),
              i("button", {
                type: "button",
                "data-view": "daily",
                class: d({ active: a(e).currentView === "daily" }),
                onClick: t[2] || (t[2] = (o) => x("daily"))
              }, " 📰 官方日报 ", 2)
            ]),
            i("button", {
              id: "aihot-refresh",
              class: "icon-btn",
              title: "刷新当前来源",
              disabled: !a(_) || a(e).isLoading,
              type: "button",
              onClick: z
            }, " ↻ ", 8, he)
          ]),
          a(e).currentView === "leaderboard" || a(e).currentView === "feed" ? (l(), r("div", pe, [
            a(e).currentView === "leaderboard" ? (l(), r(v, { key: 0 }, [
              i("div", ve, [
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: !a(e).leaderboardProvider }]),
                  onClick: t[3] || (t[3] = (o) => y(""))
                }, " 全部厂商 ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).leaderboardProvider === "Anthropic" }]),
                  onClick: t[4] || (t[4] = (o) => y("Anthropic"))
                }, " Anthropic ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).leaderboardProvider === "OpenAI" }]),
                  onClick: t[5] || (t[5] = (o) => y("OpenAI"))
                }, " OpenAI ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).leaderboardProvider === "Meta" }]),
                  onClick: t[6] || (t[6] = (o) => y("Meta"))
                }, " Meta ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).leaderboardProvider === "Google" }]),
                  onClick: t[7] || (t[7] = (o) => y("Google"))
                }, " Google ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).leaderboardProvider === "DeepSeek" }]),
                  onClick: t[8] || (t[8] = (o) => y("DeepSeek"))
                }, " DeepSeek ", 2)
              ]),
              i("div", ye, [
                Y(i("input", {
                  type: "text",
                  class: "aihot-search-input",
                  id: "aihot-lb-search",
                  placeholder: "🔍 检索模型或厂商…",
                  "onUpdate:modelValue": t[9] || (t[9] = (o) => a(e).leaderboardSearch = o)
                }, null, 512), [
                  [q, a(e).leaderboardSearch]
                ])
              ])
            ], 64)) : a(e).currentView === "feed" ? (l(), r(v, { key: 1 }, [
              i("div", be, [
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: !a(e).feedCategory }]),
                  onClick: t[10] || (t[10] = (o) => b(""))
                }, " 全部 ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).feedCategory === "ai-models" }]),
                  onClick: t[11] || (t[11] = (o) => b("ai-models"))
                }, " 🤖 模型发布 ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).feedCategory === "ai-products" }]),
                  onClick: t[12] || (t[12] = (o) => b("ai-products"))
                }, " 🚀 产品动态 ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).feedCategory === "industry" }]),
                  onClick: t[13] || (t[13] = (o) => b("industry"))
                }, " 🏢 行业动态 ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).feedCategory === "paper" }]),
                  onClick: t[14] || (t[14] = (o) => b("paper"))
                }, " 📄 学术论文 ", 2),
                i("button", {
                  type: "button",
                  class: d(["aihot-pill", { active: a(e).feedCategory === "tip" }]),
                  onClick: t[15] || (t[15] = (o) => b("tip"))
                }, " 💡 观点教程 ", 2)
              ]),
              i("div", fe, [
                i("div", me, [
                  i("button", {
                    type: "button",
                    class: d(["aihot-pill", { active: a(e).feedWindow === "24h" }]),
                    onClick: t[16] || (t[16] = (o) => L("24h"))
                  }, " 24 小时 ", 2),
                  i("button", {
                    type: "button",
                    class: d(["aihot-pill", { active: a(e).feedWindow === "7d" }]),
                    onClick: t[17] || (t[17] = (o) => L("7d"))
                  }, " 近 7 天 ", 2)
                ])
              ])
            ], 64)) : c("", !0)
          ])) : c("", !0),
          a(e).statusMessage ? (l(), r("p", ge, n(a(e).statusMessage), 1)) : c("", !0),
          a(e).errorMessage && S.value ? (l(), r("p", ke, n(a(e).errorMessage), 1)) : c("", !0),
          i("div", _e, [
            a(e).errorMessage && !S.value ? (l(), r("p", we, n(a(e).errorMessage), 1)) : a(e).isLoading && !S.value ? (l(), r("p", Ce, " 正在载入 AI HOT 数据… ")) : a(e).currentView === "leaderboard" ? (l(), r("div", Ae, [
              (l(!0), r(v, null, f(C.value, (o, p) => (l(), r("a", {
                key: o.model + p,
                href: o.href,
                target: "_blank",
                rel: "noreferrer",
                class: "aihot-lb-row"
              }, [
                i("div", {
                  class: d(["aihot-lb-rank", {
                    "rank-1": o.rank === "1",
                    "rank-2": o.rank === "2",
                    "rank-3": o.rank === "3"
                  }])
                }, n(o.rank), 3),
                i("div", xe, [
                  i("div", Ve, n(o.model), 1),
                  i("div", $e, n(o.provider || "权威厂商"), 1)
                ]),
                i("div", Me, " ★ " + n(o.score || "-"), 1),
                i("div", Ie, n(o.releaseDate || "-"), 1),
                i("div", Re, [
                  i("div", null, [
                    t[21] || (t[21] = $("入 ", -1)),
                    i("strong", null, n(o.inputPrice || "-"), 1)
                  ]),
                  i("div", null, [
                    t[22] || (t[22] = $("出 ", -1)),
                    i("strong", null, n(o.outputPrice || "-"), 1)
                  ])
                ]),
                t[23] || (t[23] = i("div", { style: { "text-align": "right" } }, [
                  i("span", {
                    class: "aihot-btn",
                    style: { "font-size": "10.5px" }
                  }, "详情 ↗")
                ], -1))
              ], 8, Se))), 128)),
              C.value.length ? c("", !0) : (l(), r("p", De, " 没有找到与 “" + n(a(e).leaderboardSearch) + "” 匹配的模型。 ", 1))
            ])) : a(e).currentView === "feed" ? (l(), r("div", Le, [
              (l(!0), r(v, null, f(A.value, (o, p) => (l(), r("a", {
                key: o.id || o.title + p,
                href: o.url,
                target: "_blank",
                rel: "noreferrer",
                class: "aihot-item",
                onClick: V((u) => D(o), ["prevent"]),
                onContextmenu: (u) => M(u, o)
              }, [
                i("span", {
                  class: d(["aihot-rank", { top: p < 3 }])
                }, n(p + 1), 3),
                i("div", Te, [
                  i("div", Oe, n(o.title), 1),
                  o.summary ? (l(), r("p", He, n(o.summary), 1)) : c("", !0),
                  i("div", Be, [
                    i("span", null, [
                      o.category ? (l(), r("span", Fe, n(o.category), 1)) : c("", !0),
                      $(" " + n(o.sourceName), 1)
                    ]),
                    i("time", null, n(o.published), 1)
                  ])
                ])
              ], 40, Pe))), 128)),
              A.value.length ? c("", !0) : (l(), r("p", Ne, " 当前分类暂无资讯。 "))
            ])) : a(e).currentView === "daily" ? (l(), r("div", We, [
              a(e).dailyArchives.length ? (l(), r("div", ze, [
                i("button", {
                  type: "button",
                  class: d({ active: !a(e).activeDailyDate }),
                  onClick: t[18] || (t[18] = (o) => P(""))
                }, "最新", 2),
                (l(!0), r(v, null, f(a(e).dailyArchives, (o) => (l(), r("button", {
                  key: o.date,
                  type: "button",
                  class: d({ active: o.date === a(e).activeDailyDate }),
                  onClick: (p) => P(o.date)
                }, n(o.date.slice(5)), 11, Ge))), 128))
              ])) : c("", !0),
              !a(e).dailyReport && !a(e).isLoading ? (l(), r("p", Ee, "暂无当日日报内容。")) : c("", !0),
              a(e).dailyReport ? (l(), r("div", je, [
                i("div", Ue, [
                  i("h3", Ye, "📅 AIHOT 官方行业晨报 · " + n(a(e).dailyReport.date), 1),
                  a(e).dailyReport.links?.aihot ? (l(), r("a", {
                    key: 0,
                    href: a(e).dailyReport.links.aihot,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-btn"
                  }, " 查看官方网页 ↗ ", 8, qe)) : c("", !0)
                ]),
                a(e).dailyReport.leadTitle ? (l(), r("p", Ke, n(a(e).dailyReport.leadTitle), 1)) : c("", !0),
                i("p", Xe, n(a(e).dailyReport.leadParagraph || "每天早晨精编汇总过去 24 小时 AI 行业的重大发布、算力生态与前沿突破。"), 1)
              ])) : c("", !0),
              (l(!0), r(v, null, f(a(e).dailyReport?.sections || [], (o, p) => (l(), r("div", {
                key: o.label + p,
                class: "aihot-daily-group"
              }, [
                i("div", Je, n(o.label), 1),
                i("div", Qe, [
                  (l(!0), r(v, null, f(o.items, (u, G) => (l(), r("a", {
                    key: u.id || u.title + G,
                    href: u.url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-item",
                    onClick: V((T) => D(u), ["prevent"]),
                    onContextmenu: (T) => M(T, u)
                  }, [
                    i("div", et, [
                      i("div", tt, n(u.title), 1),
                      u.summary ? (l(), r("p", ot, n(u.summary), 1)) : c("", !0),
                      i("div", it, [
                        i("span", null, n(u.sourceName), 1),
                        u.published ? (l(), r("time", at, n(u.published), 1)) : c("", !0)
                      ])
                    ])
                  ], 40, Ze))), 128))
                ])
              ]))), 128)),
              a(e).dailyReport ? c("", !0) : (l(), r("p", st, " 暂无官方日报内容。 "))
            ])) : c("", !0)
          ])
        ], 2)
      ], 8, ne),
      (l(), K(Q, { to: "body" }, [
        h.value.visible ? (l(), r("div", {
          key: 0,
          ref_key: "articleMenuRef",
          ref: H,
          class: "aihot-context-menu",
          style: X(a(B)),
          role: "menu",
          onClick: t[19] || (t[19] = V(() => {
          }, ["stop"]))
        }, [
          i("div", lt, n(h.value.item?.title), 1),
          J(se, {
            label: "💬 发送到聊天室",
            "match-menu-item": "",
            visible: h.value.visible,
            onSelect: O
          }, null, 8, ["visible"])
        ], 4)) : c("", !0)
      ]))
    ], 64));
  }
}), ft = /* @__PURE__ */ re(rt, [["__scopeId", "data-v-0fc76af5"]]);
export {
  ft as default
};
