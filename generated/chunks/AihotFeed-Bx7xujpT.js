import { f as j, w as q, a as Y, g as l, h as r, i, s as d, x as a, t as n, F as v, q as K, v as X, u as c, z as f, j as k, k as $, I as J, B as Q, l as Z, T as ee, b as te, c as _ } from "./vendor-vue-BUkfvXUI.js";
import { u as oe } from "./useCardActivity-XJG-xZNj.js";
import { d as ie, c as ae, a as m } from "./aihot-feed-store-DsgeWww_.js";
import { aiHotService as g } from "./aihot.service-Br6-jVT7.js";
import { u as se, L as le, w as M } from "./search.service-BNKrftAD.js";
import { C as re } from "./ChatShareMenu-F5bvpd_H.js";
import { u as ne } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DNUqqaI7.js";
import { _ as de } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const ue = ["inert"], ce = { class: "card-head" }, he = { id: "aihot-title" }, pe = {
  id: "aihot-tabs",
  class: "aihot-tabs",
  role: "group",
  "aria-label": "资讯来源"
}, ve = ["disabled"], ye = {
  key: 0,
  id: "aihot-subbar",
  class: "aihot-subbar"
}, be = {
  class: "aihot-pills",
  id: "aihot-lb-provider-pills"
}, fe = { class: "aihot-subbar-right" }, me = {
  class: "aihot-pills",
  id: "aihot-cat-pills"
}, ge = { class: "aihot-subbar-right" }, ke = {
  class: "aihot-pills",
  id: "aihot-window-pills"
}, _e = {
  key: 1,
  class: "muted small",
  role: "status"
}, we = {
  key: 2,
  class: "notice",
  role: "status"
}, Ce = { id: "aihot-body" }, Ae = {
  key: 0,
  class: "notice"
}, Se = {
  key: 1,
  class: "muted small"
}, xe = {
  key: 2,
  class: "aihot-lb-list"
}, Ve = ["href"], Te = { class: "aihot-lb-model" }, $e = { class: "aihot-lb-name" }, Me = { class: "aihot-lb-provider" }, Ie = {
  class: "aihot-lb-score",
  title: "AIHOT 共识评分"
}, Pe = {
  class: "aihot-lb-date aihot-lb-col-hide-mobile",
  title: "上线日期"
}, Re = {
  class: "aihot-lb-price aihot-lb-col-hide-mobile",
  title: "API 价格（¥/百万Token）"
}, Le = {
  key: 0,
  class: "muted small"
}, De = {
  key: 3,
  class: "aihot-grid"
}, He = ["href", "onClick", "onContextmenu"], Oe = { style: { "min-width": "0", flex: "1" } }, Ne = { class: "aihot-t" }, Fe = {
  key: 0,
  class: "aihot-s"
}, We = { class: "aihot-m" }, Be = {
  key: 0,
  class: "aihot-tag",
  style: { "margin-right": "6px" }
}, ze = {
  key: 0,
  class: "muted small"
}, Ge = {
  key: 4,
  class: "aihot-daily-wrap"
}, Ee = {
  key: 0,
  class: "daily-news-days"
}, Ue = ["onClick"], je = {
  key: 1,
  class: "muted small"
}, qe = {
  key: 2,
  class: "aihot-daily-lead"
}, Ye = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", "margin-bottom": "8px" } }, Ke = { style: { margin: "0" } }, Xe = ["href"], Je = {
  key: 0,
  style: { "font-weight": "600", color: "var(--heading)", "margin-bottom": "4px" }
}, Qe = { style: { "line-height": "1.6" } }, Ze = { class: "aihot-daily-group-title" }, et = { class: "aihot-grid" }, tt = ["href", "onClick", "onContextmenu"], ot = { style: { "min-width": "0", flex: "1" } }, it = { class: "aihot-t" }, at = {
  key: 0,
  class: "aihot-s"
}, st = { class: "aihot-m" }, lt = { key: 0 }, rt = {
  key: 3,
  class: "muted small"
}, nt = { class: "menu-head" }, dt = ["disabled"], ut = /* @__PURE__ */ j({
  __name: "AihotFeed",
  setup(ct) {
    const h = te({
      visible: !1,
      x: 0,
      y: 0,
      item: null
    });
    function I(s, t) {
      s.preventDefault(), s.stopPropagation(), h.value = {
        visible: !0,
        x: s.clientX,
        y: s.clientY,
        item: t
      };
    }
    function O(s) {
      h.value.item && le.sendAiHotShare(h.value.item, s), h.value.visible = !1;
    }
    function w() {
      h.value.visible = !1;
    }
    const { menuRef: N, style: F } = ne({
      visible: () => h.value.visible,
      anchor: () => ({ x: h.value.x, y: h.value.y }),
      dismiss: w
    });
    async function W() {
      const s = h.value.item, t = s ? { title: s.title, url: s.url } : null;
      if (w(), !!t?.url)
        try {
          const o = new URL(t.url);
          if (o.protocol !== "https:" && o.protocol !== "http:") {
            M.show({ appName: "海狸工作台", title: "无法添加文章", message: "仅支持 HTTP/HTTPS 文章链接。" });
            return;
          }
          const { addWorkbenchWeb: p } = await import("./workbench.store---R-eEes.js"), u = p(t);
          M.show({
            appName: "海狸工作台",
            title: u ? "已添加到工作台" : "文章已在工作台中",
            message: u ? `已将「${t.title}」放入常用网站 / 参考` : "没有重复添加"
          });
        } catch {
          M.show({ appName: "海狸工作台", title: "添加失败", message: "未能添加文章，请重试。" });
        }
    }
    const e = ie, { active: C, standalone: B } = oe("daily-aihot", "/aihot.html"), A = /* @__PURE__ */ Symbol("aihot-feed-view");
    let P = !1;
    q(C, (s) => {
      if (!s) {
        w(), g.pause(A);
        return;
      }
      if (!P) {
        P = !0, e.currentView = B ? "leaderboard" : "feed";
        try {
          const t = localStorage.getItem("lw-info-feed-view");
          (t === "leaderboard" || t === "feed" || t === "daily") && (e.currentView = t);
          const o = localStorage.getItem("lw-aihot-feed-cat");
          o && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(o) && (e.feedCategory = o), localStorage.getItem("lw-aihot-feed-window") === "7d" && (e.feedWindow = "7d");
        } catch {
        }
      }
      g.activate(A);
    }, { immediate: !0, flush: "sync" }), Y(() => {
      g.pause(A);
    });
    const z = _(() => {
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
    }), S = _(() => {
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
    }), G = {
      "ai-models": "模型发布",
      "ai-products": "产品动态",
      industry: "行业动态",
      paper: "学术论文",
      tip: "观点教程"
    }, x = _(() => {
      if (!e.feedCategory) return e.feedArticles;
      const s = e.feedCategory.toLowerCase(), t = G[s] || "", o = e.feedArticles.filter((p) => {
        const u = (p.category || "").toLowerCase();
        return u === s || t && u.includes(t) || s && u.includes(s);
      });
      return o.length ? o : e.feedArticles;
    }), V = _(() => e.currentView === "leaderboard" ? S.value.length > 0 : e.currentView === "feed" ? x.value.length > 0 : e.currentView === "daily" ? !!e.dailyReport : !1);
    function T(s) {
      g.switchView(s);
    }
    function E() {
      g.refresh();
    }
    function R(s) {
      const t = window;
      if (typeof t.openAiHotArticle == "function") {
        t.openAiHotArticle(s.raw || s, s.url);
        return;
      }
      ae.openArticle(
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
    function D(s) {
      e.activeDailyDate = s, m.dispatch("select-daily-date", s);
    }
    return (s, t) => (l(), r(v, null, [
      i("div", {
        class: "vue-aihot-wrapper",
        inert: !a(C)
      }, [
        i("section", {
          id: "daily-aihot",
          class: d(["card wide", { "card-fullscreen": a(se).activeId === "daily-aihot" }])
        }, [
          i("header", ce, [
            t[20] || (t[20] = i("span", {
              class: "bar",
              style: { background: "linear-gradient(180deg,#34d399,#38bdf8)" }
            }, null, -1)),
            i("h2", he, n(z.value), 1),
            i("div", pe, [
              i("button", {
                type: "button",
                "data-view": "leaderboard",
                class: d({ active: a(e).currentView === "leaderboard" }),
                onClick: t[0] || (t[0] = (o) => T("leaderboard"))
              }, " 🏆 模型榜 ", 2),
              i("button", {
                type: "button",
                "data-view": "feed",
                class: d({ active: a(e).currentView === "feed" }),
                onClick: t[1] || (t[1] = (o) => T("feed"))
              }, " ✦ 精选资讯 ", 2),
              i("button", {
                type: "button",
                "data-view": "daily",
                class: d({ active: a(e).currentView === "daily" }),
                onClick: t[2] || (t[2] = (o) => T("daily"))
              }, " 📰 官方日报 ", 2)
            ]),
            i("button", {
              id: "aihot-refresh",
              class: "icon-btn",
              title: "刷新当前来源",
              disabled: !a(C) || a(e).isLoading,
              type: "button",
              onClick: E
            }, " ↻ ", 8, ve)
          ]),
          a(e).currentView === "leaderboard" || a(e).currentView === "feed" ? (l(), r("div", ye, [
            a(e).currentView === "leaderboard" ? (l(), r(v, { key: 0 }, [
              i("div", be, [
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
              i("div", fe, [
                K(i("input", {
                  type: "text",
                  class: "aihot-search-input",
                  id: "aihot-lb-search",
                  placeholder: "🔍 检索模型或厂商…",
                  "onUpdate:modelValue": t[9] || (t[9] = (o) => a(e).leaderboardSearch = o)
                }, null, 512), [
                  [X, a(e).leaderboardSearch]
                ])
              ])
            ], 64)) : a(e).currentView === "feed" ? (l(), r(v, { key: 1 }, [
              i("div", me, [
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
              i("div", ge, [
                i("div", ke, [
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
          a(e).statusMessage ? (l(), r("p", _e, n(a(e).statusMessage), 1)) : c("", !0),
          a(e).errorMessage && V.value ? (l(), r("p", we, n(a(e).errorMessage), 1)) : c("", !0),
          i("div", Ce, [
            a(e).errorMessage && !V.value ? (l(), r("p", Ae, n(a(e).errorMessage), 1)) : a(e).isLoading && !V.value ? (l(), r("p", Se, " 正在载入 AI HOT 数据… ")) : a(e).currentView === "leaderboard" ? (l(), r("div", xe, [
              (l(!0), r(v, null, f(S.value, (o, p) => (l(), r("a", {
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
                i("div", Te, [
                  i("div", $e, n(o.model), 1),
                  i("div", Me, n(o.provider || "权威厂商"), 1)
                ]),
                i("div", Ie, " ★ " + n(o.score || "-"), 1),
                i("div", Pe, n(o.releaseDate || "-"), 1),
                i("div", Re, [
                  i("div", null, [
                    t[21] || (t[21] = k("入 ", -1)),
                    i("strong", null, n(o.inputPrice || "-"), 1)
                  ]),
                  i("div", null, [
                    t[22] || (t[22] = k("出 ", -1)),
                    i("strong", null, n(o.outputPrice || "-"), 1)
                  ])
                ]),
                t[23] || (t[23] = i("div", { style: { "text-align": "right" } }, [
                  i("span", {
                    class: "aihot-btn",
                    style: { "font-size": "10.5px" }
                  }, "详情 ↗")
                ], -1))
              ], 8, Ve))), 128)),
              S.value.length ? c("", !0) : (l(), r("p", Le, " 没有找到与 “" + n(a(e).leaderboardSearch) + "” 匹配的模型。 ", 1))
            ])) : a(e).currentView === "feed" ? (l(), r("div", De, [
              (l(!0), r(v, null, f(x.value, (o, p) => (l(), r("a", {
                key: o.id || o.title + p,
                href: o.url,
                target: "_blank",
                rel: "noreferrer",
                class: "aihot-item",
                onClick: $((u) => R(o), ["prevent"]),
                onContextmenu: (u) => I(u, o)
              }, [
                i("span", {
                  class: d(["aihot-rank", { top: p < 3 }])
                }, n(p + 1), 3),
                i("div", Oe, [
                  i("div", Ne, n(o.title), 1),
                  o.summary ? (l(), r("p", Fe, n(o.summary), 1)) : c("", !0),
                  i("div", We, [
                    i("span", null, [
                      o.category ? (l(), r("span", Be, n(o.category), 1)) : c("", !0),
                      k(" " + n(o.sourceName), 1)
                    ]),
                    i("time", null, n(o.published), 1)
                  ])
                ])
              ], 40, He))), 128)),
              x.value.length ? c("", !0) : (l(), r("p", ze, " 当前分类暂无资讯。 "))
            ])) : a(e).currentView === "daily" ? (l(), r("div", Ge, [
              a(e).dailyArchives.length ? (l(), r("div", Ee, [
                i("button", {
                  type: "button",
                  class: d({ active: !a(e).activeDailyDate }),
                  onClick: t[18] || (t[18] = (o) => D(""))
                }, "最新", 2),
                (l(!0), r(v, null, f(a(e).dailyArchives, (o) => (l(), r("button", {
                  key: o.date,
                  type: "button",
                  class: d({ active: o.date === a(e).activeDailyDate }),
                  onClick: (p) => D(o.date)
                }, n(o.date.slice(5)), 11, Ue))), 128))
              ])) : c("", !0),
              !a(e).dailyReport && !a(e).isLoading ? (l(), r("p", je, "暂无当日日报内容。")) : c("", !0),
              a(e).dailyReport ? (l(), r("div", qe, [
                i("div", Ye, [
                  i("h3", Ke, "📅 AIHOT 官方行业晨报 · " + n(a(e).dailyReport.date), 1),
                  a(e).dailyReport.links?.aihot ? (l(), r("a", {
                    key: 0,
                    href: a(e).dailyReport.links.aihot,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-btn"
                  }, " 查看官方网页 ↗ ", 8, Xe)) : c("", !0)
                ]),
                a(e).dailyReport.leadTitle ? (l(), r("p", Je, n(a(e).dailyReport.leadTitle), 1)) : c("", !0),
                i("p", Qe, n(a(e).dailyReport.leadParagraph || "每天早晨精编汇总过去 24 小时 AI 行业的重大发布、算力生态与前沿突破。"), 1)
              ])) : c("", !0),
              (l(!0), r(v, null, f(a(e).dailyReport?.sections || [], (o, p) => (l(), r("div", {
                key: o.label + p,
                class: "aihot-daily-group"
              }, [
                i("div", Ze, n(o.label), 1),
                i("div", et, [
                  (l(!0), r(v, null, f(o.items, (u, U) => (l(), r("a", {
                    key: u.id || u.title + U,
                    href: u.url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "aihot-item",
                    onClick: $((H) => R(u), ["prevent"]),
                    onContextmenu: (H) => I(H, u)
                  }, [
                    i("div", ot, [
                      i("div", it, n(u.title), 1),
                      u.summary ? (l(), r("p", at, n(u.summary), 1)) : c("", !0),
                      i("div", st, [
                        i("span", null, n(u.sourceName), 1),
                        u.published ? (l(), r("time", lt, n(u.published), 1)) : c("", !0)
                      ])
                    ])
                  ], 40, tt))), 128))
                ])
              ]))), 128)),
              a(e).dailyReport ? c("", !0) : (l(), r("p", rt, " 暂无官方日报内容。 "))
            ])) : c("", !0)
          ])
        ], 2)
      ], 8, ue),
      (l(), J(ee, { to: "body" }, [
        h.value.visible ? (l(), r("div", {
          key: 0,
          ref_key: "articleMenuRef",
          ref: N,
          class: "aihot-context-menu",
          style: Q(a(F)),
          role: "menu",
          onClick: t[19] || (t[19] = $(() => {
          }, ["stop"]))
        }, [
          i("div", nt, n(h.value.item?.title), 1),
          i("button", {
            type: "button",
            class: "menu-item",
            role: "menuitem",
            disabled: !h.value.item?.url,
            onClick: W
          }, [...t[24] || (t[24] = [
            i("span", {
              class: "menu-icon",
              "aria-hidden": "true"
            }, "📌", -1),
            k(" 移动到工作台 ", -1)
          ])], 8, dt),
          Z(re, {
            label: "💬 发送到聊天室",
            "match-menu-item": "",
            visible: h.value.visible,
            onSelect: O
          }, null, 8, ["visible"])
        ], 4)) : c("", !0)
      ]))
    ], 64));
  }
}), kt = /* @__PURE__ */ de(ut, [["__scopeId", "data-v-b88c38a3"]]);
export {
  kt as default
};
