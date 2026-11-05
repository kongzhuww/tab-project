import { d as fe, w as z, L as he, g as l, h as a, t as r, u as s, C as f, n as b, A as F, s as G, q as V, p as g, i as d, F as A, j as $, e as me, y as u, b as L, o, B as be, E as H } from "./vendor-vue-D8gPZiit.js";
import { u as ye } from "./useCardActivity-BHRQSZa1.js";
import { C as _e, P as W, F as ke, r as we } from "./view-styles-KXYy1iqP.js";
import { a as Pe, p as y } from "./pricing-store-NB8GBNHF.js";
import { t as p, _ as xe } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
const Ce = ["inert"], Me = { class: "card-head" }, Se = { id: "pricing-title" }, Fe = {
  class: "pricing-view-switch",
  role: "tablist",
  "aria-label": "模型数据视图"
}, Ae = ["aria-selected"], $e = ["aria-selected"], Le = ["aria-selected"], Oe = ["title", "aria-expanded"], Ie = ["title"], Te = { class: "pricing-toolbar" }, Ve = ["placeholder"], Re = ["aria-pressed"], Ee = {
  id: "pricing-source",
  class: "muted small"
}, De = {
  key: 0,
  class: "api-badge ok",
  title: "已保存 OpenRouter Key，尚未验证连通性"
}, Be = {
  key: 1,
  class: "api-badge ok",
  title: "已保存 Artificial Analysis Key，尚未验证连通性"
}, Ke = ["href"], Ne = {
  class: "pricing-info",
  role: "status"
}, Qe = {
  key: 0,
  id: "pricing-info",
  class: "pricing-info"
}, Ue = {
  key: 1,
  id: "pricing-image-eval-layout",
  class: "pricing-image-eval-wrapper"
}, je = {
  id: "pricing-layout",
  class: "pricing-layout"
}, qe = { class: "pricing-left-col" }, ze = {
  id: "pricing-rank-list",
  class: "pricing-rank-list"
}, Ge = {
  key: 0,
  class: "muted small"
}, He = { class: "aa-rank-main" }, We = ["href", "title"], Xe = {
  key: 0,
  class: "aa-rank-meta"
}, Ye = { class: "pricing-rates-badge" }, Ze = {
  class: "rate-tag in",
  title: "每百万输入 Token 价格"
}, Je = {
  class: "rate-tag out",
  title: "每百万输出 Token 价格"
}, et = {
  key: 0,
  class: "rate-tag ctx",
  title: "最大上下文窗口"
}, tt = {
  key: 0,
  class: "aa-rank-score"
}, it = ["title", "onClick"], at = {
  id: "pricing-pagination",
  class: "pricing-pagination",
  "aria-label": "数据翻页"
}, nt = ["disabled"], st = ["max"], rt = { id: "pricing-page-total" }, ot = ["disabled"], lt = { class: "pricing-chart" }, ct = {
  id: "pricing-chart-svg",
  viewBox: "0 0 560 180",
  preserveAspectRatio: "none",
  role: "img",
  "aria-label": "模型价格曲线"
}, dt = ["points"], ut = {
  id: "pricing-legend",
  class: "pricing-legend"
}, pt = { class: "pricing-chart-note" }, gt = {
  id: "pricing-rank-layout",
  class: "pricing-layout"
}, vt = { class: "pricing-left-col" }, ft = { class: "pricing-rank-list" }, ht = {
  key: 0,
  class: "muted small"
}, mt = { class: "aa-rank-main" }, bt = ["href", "title"], yt = {
  key: 0,
  class: "aa-rank-meta"
}, _t = {
  key: 1,
  class: "aa-rank-metrics"
}, kt = { class: "aa-rank-score" }, wt = ["title", "onClick"], Pt = {
  class: "pricing-pagination",
  "aria-label": "排行数据翻页"
}, xt = ["disabled"], Ct = ["max"], Mt = ["disabled"], St = { class: "pricing-chart aa-rank-chart-panel" }, Ft = { class: "aa-bars-container" }, At = ["title"], $t = { class: "aa-bar-track" }, Lt = { class: "aa-bar-val" }, v = 10, Ot = /* @__PURE__ */ fe({
  __name: "ModelPricingCard",
  setup(It) {
    const { active: h } = ye("daily-pricing", "/pricing.html"), X = H(() => import("./PricingSettingsPanel-CB4fRpLP.js")), Y = H(() => import("./ImageBenchmarkView-BXtyaG0m.js")), Z = u(() => [
      { value: "cheap-in", label: p("pricing.sort.cheapIn"), icon: "💰" },
      { value: "cheap-out", label: p("pricing.sort.cheapOut"), icon: "💸" },
      { value: "free", label: p("pricing.sort.free"), icon: "🎁" },
      { value: "context", label: p("pricing.sort.context"), icon: "📚" }
    ]), i = Pe, R = ["#8b5cf6", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f97316"], _ = L(!1), E = L(!1), D = L(null), O = L("");
    let k = !1, P = 0;
    z(_, (n) => {
      n && (E.value = !0);
    });
    async function x() {
      const n = ++P;
      if (!(!h.value || k))
        try {
          const e = await ke();
          if (k || !h.value || n !== P) return;
          Object.assign(i, e), O.value = "";
        } catch {
          if (k || !h.value || n !== P) return;
          i.hasOpenRouterKey = !1, i.hasAaApiKey = !1, O.value = "配置状态读取失败；保存内容未改动。";
        }
    }
    function J() {
      h.value && x();
    }
    function B(n, e) {
      e === "local" && W.some((t) => t in n) && x();
    }
    function K(n) {
      (n.key === null || W.some((e) => e === n.key)) && x();
    }
    function N() {
      ++P, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(B), window.removeEventListener("storage", K);
    }
    z(h, (n) => {
      N(), !(!n || k) && (typeof chrome < "u" && chrome.storage?.onChanged?.addListener(B), window.addEventListener("storage", K), x());
    }, { immediate: !0, flush: "sync" }), he(() => {
      k = !0, N();
    });
    function ee(n) {
      return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M ctx` : n >= 1e3 ? `${Math.round(n / 1e3)}k ctx` : `${n} ctx`;
    }
    const te = u(() => i.view === "rank" ? "Artificial Analysis 排行内置示例" : i.view === "price" ? "OpenRouter 定价内置示例" : "生图与多模态基准评测"), ie = u(() => i.view === "rank" ? "https://artificialanalysis.ai/leaderboards/models" : "https://openrouter.ai/models"), w = u(() => {
      let n = [...i.models];
      if (i.favoritesOnly && (n = n.filter((e) => e.isFavorite)), i.searchQuery.trim()) {
        const e = i.searchQuery.trim().toLowerCase();
        n = n.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e) || t.id.toLowerCase().includes(e)
        );
      }
      return i.sortMode === "cheap-in" ? n.sort((e, t) => e.inputPrice - t.inputPrice) : i.sortMode === "cheap-out" ? n.sort((e, t) => e.outputPrice - t.outputPrice) : i.sortMode === "free" ? n.sort((e, t) => e.inputPrice + e.outputPrice - (t.inputPrice + t.outputPrice)) : i.sortMode === "context" && n.sort((e, t) => t.contextLength - e.contextLength), n;
    }), C = u(() => Math.max(1, Math.ceil(w.value.length / v))), ae = u(() => {
      const n = (i.currentPage - 1) * v;
      return w.value.slice(n, n + v);
    }), ne = u(() => {
      const n = w.value.slice(0, 30);
      if (n.length < 2) return "10,160 550,160";
      const e = 560, t = 180, c = 10, m = Math.max(...n.map((T) => T.outputPrice || 1), 1), de = (e - c * 2) / (n.length - 1);
      return n.map((T, ue) => {
        const pe = T.outputPrice || 0.1, ge = (c + ue * de).toFixed(1), ve = (c + (1 - pe / m) * (t - c * 2)).toFixed(1);
        return `${ge},${ve}`;
      }).join(" ");
    }), M = u(() => {
      let n = [...i.ranking];
      if (i.favoritesOnly && (n = n.filter((e) => e.isFavorite)), i.searchQuery.trim()) {
        const e = i.searchQuery.trim().toLowerCase();
        n = n.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e)
        );
      }
      return n.sort((e, t) => (t.score ?? 0) - (e.score ?? 0)), n;
    }), S = u(() => Math.max(1, Math.ceil(M.value.length / v))), se = u(() => {
      const n = (i.currentPage - 1) * v;
      return M.value.slice(n, n + v);
    }), Q = u(() => M.value.slice(0, 8)), re = u(() => {
      const n = Q.value.map((e) => e.score);
      return Math.max(...n, 100);
    });
    function I(n) {
      i.view = n, i.currentPage = 1, y.dispatch("switch-view", n);
    }
    function oe(n) {
      y.selectImageModel(n);
    }
    function le() {
      i.currentPage = 1, y.dispatch("set-sort", i.sortMode);
    }
    function ce() {
      i.favoritesOnly = !i.favoritesOnly, i.currentPage = 1, y.dispatch("toggle-favorites-only", i.favoritesOnly);
    }
    function U(n) {
      y.toggleFavorite(n);
    }
    function j() {
      i.currentPage > 1 && (i.currentPage--, y.dispatch("set-page", i.currentPage));
    }
    function q(n) {
      i.currentPage < n && (i.currentPage++, y.dispatch("set-page", i.currentPage));
    }
    return (n, e) => (o(), l("div", {
      class: "vue-pricing-wrapper",
      inert: !s(h)
    }, [
      a("section", {
        id: "daily-pricing",
        class: f(["card wide", { "card-fullscreen": s(we).activeId === "daily-pricing" }])
      }, [
        a("header", Me, [
          e[11] || (e[11] = a("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#fbbf24,#f59e0b)" }
          }, null, -1)),
          a("h2", Se, r(s(i).view === "rank" ? s(p)("pricing.view.rank") : s(i).view === "image-eval" ? s(p)("pricing.view.imageEval") : s(p)("pricing.view.price")), 1),
          a("div", Fe, [
            a("button", {
              type: "button",
              "data-pricing-view": "price",
              role: "tab",
              class: f({ active: s(i).view === "price" }),
              "aria-selected": s(i).view === "price",
              onClick: e[0] || (e[0] = (t) => I("price"))
            }, r(s(p)("pricing.view.price")), 11, Ae),
            a("button", {
              type: "button",
              "data-pricing-view": "rank",
              role: "tab",
              class: f({ active: s(i).view === "rank" }),
              "aria-selected": s(i).view === "rank",
              onClick: e[1] || (e[1] = (t) => I("rank"))
            }, r(s(p)("pricing.view.rank")), 11, $e),
            a("button", {
              type: "button",
              "data-pricing-view": "image-eval",
              role: "tab",
              class: f({ active: s(i).view === "image-eval" }),
              "aria-selected": s(i).view === "image-eval",
              onClick: e[2] || (e[2] = (t) => I("image-eval"))
            }, r(s(p)("pricing.view.imageTab")), 11, Le)
          ]),
          a("button", {
            id: "pricing-settings-open",
            ref_key: "settingsAnchor",
            ref: D,
            class: "icon-btn",
            type: "button",
            title: s(p)("pricing.settingsTitle"),
            "aria-expanded": _.value,
            onClick: e[3] || (e[3] = (t) => _.value = !_.value)
          }, "⚙️", 8, Oe),
          a("button", {
            id: "pricing-refresh",
            class: "icon-btn",
            type: "button",
            title: s(p)("pricing.refreshDisabledTitle"),
            disabled: ""
          }, " ↻ ", 8, Ie)
        ]),
        b(a("div", Te, [
          b(G(_e, {
            id: "pricing-mode",
            class: "pricing-sort",
            modelValue: s(i).sortMode,
            "onUpdate:modelValue": e[4] || (e[4] = (t) => s(i).sortMode = t),
            options: Z.value,
            size: "sm",
            style: { width: "140px" },
            onChange: le
          }, null, 8, ["modelValue", "options"]), [
            [F, s(i).view === "price"]
          ]),
          b(a("input", {
            id: "pricing-search",
            class: "pricing-search",
            type: "search",
            "onUpdate:modelValue": e[5] || (e[5] = (t) => s(i).searchQuery = t),
            placeholder: s(i).view === "rank" ? "搜索排行中的模型或厂商" : "搜索模型、厂商或 ID",
            autocomplete: "off"
          }, null, 8, Ve), [
            [V, s(i).searchQuery]
          ]),
          a("button", {
            id: "pricing-favorites-filter",
            class: f(["pricing-favorites-filter", { active: s(i).favoritesOnly }]),
            type: "button",
            "aria-pressed": s(i).favoritesOnly,
            title: "切换全部模型或只看关注",
            onClick: ce
          }, [
            g(r(s(i).favoritesOnly ? "♥ 只看关注" : "♡ 我的关注") + " ", 1),
            a("b", null, r(s(i).favoritesCount), 1)
          ], 10, Re),
          a("span", Ee, r(te.value), 1),
          s(i).hasOpenRouterKey && s(i).view === "price" ? (o(), l("span", De, "🔑 已配置")) : d("", !0),
          s(i).hasAaApiKey && s(i).view === "rank" ? (o(), l("span", Be, "🔑 已配置")) : d("", !0),
          e[12] || (e[12] = a("span", { class: "grow" }, null, -1)),
          a("a", {
            id: "pricing-source-link",
            class: "small",
            href: ie.value,
            target: "_blank",
            rel: "noreferrer"
          }, " 查看来源 ", 8, Ke)
        ], 512), [
          [F, s(i).view !== "image-eval"]
        ]),
        a("p", Ne, "当前价格、排行与评分均为内置数据，未实时拉取；关注只保留在本页内存。" + r(O.value), 1),
        s(i).view === "rank" ? (o(), l("div", Qe, [...e[13] || (e[13] = [
          a("b", null, "💡 智能指数说明：", -1),
          a("span", null, "Artificial Analysis 权威实测综合加权分（含数学、编程、综合推理等真实盲测指标），分数越高代表模型综合能力越强。", -1)
        ])])) : d("", !0),
        s(i).view === "image-eval" ? (o(), l("div", Ue, [
          G(s(Y), {
            "selected-model-id": s(i).selectedImageModelId,
            onSelectModel: oe
          }, null, 8, ["selected-model-id"])
        ])) : d("", !0),
        b(a("div", je, [
          a("div", qe, [
            a("ol", ze, [
              w.value.length === 0 ? (o(), l("li", Ge, r(s(i).favoritesOnly ? "暂无已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的模型。"), 1)) : d("", !0),
              (o(!0), l(A, null, $(ae.value, (t, c) => (o(), l("li", {
                key: t.id,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                a("span", {
                  class: f(["pricing-rank-no", { top: (s(i).currentPage - 1) * v + c < 3 }])
                }, r((s(i).currentPage - 1) * v + c + 1), 3),
                a("span", He, [
                  a("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://openrouter.ai/models/" + t.id,
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, We),
                  t.creator ? (o(), l("span", Xe, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0)
                ]),
                a("span", Ye, [
                  a("span", Ze, " 入: $" + r(t.inputPrice), 1),
                  a("span", Je, " 出: $" + r(t.outputPrice), 1),
                  t.contextLength ? (o(), l("span", et, r(ee(t.contextLength)), 1)) : d("", !0)
                ]),
                t.score ? (o(), l("b", tt, " 智能 " + r(t.score.toFixed(1)), 1)) : d("", !0),
                a("button", {
                  type: "button",
                  class: f(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (m) => U(t.id)
                }, r(t.isFavorite ? "♥" : "♡"), 11, it)
              ]))), 128))
            ]),
            a("nav", at, [
              a("button", {
                id: "pricing-page-prev",
                type: "button",
                disabled: s(i).currentPage <= 1,
                onClick: j
              }, " ‹ 上一页 ", 8, nt),
              a("span", null, [
                e[14] || (e[14] = g(" 第 ", -1)),
                b(a("input", {
                  id: "pricing-page-input",
                  type: "number",
                  min: "1",
                  max: C.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => s(i).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, st), [
                  [
                    V,
                    s(i).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[15] || (e[15] = g(" / ", -1)),
                a("b", rt, r(C.value), 1),
                e[16] || (e[16] = g(" 页 ", -1))
              ]),
              a("button", {
                id: "pricing-page-next",
                type: "button",
                disabled: s(i).currentPage >= C.value,
                onClick: e[7] || (e[7] = (t) => q(C.value))
              }, " 下一页 › ", 8, ot)
            ])
          ]),
          a("div", lt, [
            (o(), l("svg", ct, [
              e[17] || (e[17] = a("line", {
                x1: "10",
                y1: "170",
                x2: "550",
                y2: "170",
                class: "pricing-chart-axis",
                stroke: "rgba(255,255,255,0.15)"
              }, null, -1)),
              e[18] || (e[18] = a("line", {
                x1: "10",
                y1: "10",
                x2: "10",
                y2: "170",
                class: "pricing-chart-axis",
                stroke: "rgba(255,255,255,0.15)"
              }, null, -1)),
              a("polyline", {
                points: ne.value,
                fill: "none",
                stroke: "#fbbf24",
                "stroke-width": "2",
                class: "pricing-line-rank"
              }, null, 8, dt)
            ])),
            a("div", ut, [
              e[19] || (e[19] = a("span", null, [
                a("i", {
                  class: "dot in",
                  style: { background: "#38bdf8" }
                }),
                g("输入 $/1M")
              ], -1)),
              e[20] || (e[20] = a("span", null, [
                a("i", {
                  class: "dot out",
                  style: { background: "#f59e0b" }
                }),
                g("输出 $/1M")
              ], -1)),
              a("span", pt, "Top " + r(w.value.length) + " · 价格走势", 1)
            ])
          ])
        ], 512), [
          [F, s(i).view === "price"]
        ]),
        b(a("div", gt, [
          a("div", vt, [
            a("ol", ft, [
              M.value.length === 0 ? (o(), l("li", ht, r(s(i).favoritesOnly ? "排行中没有已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的排行模型。"), 1)) : d("", !0),
              (o(!0), l(A, null, $(se.value, (t, c) => (o(), l("li", {
                key: t.name,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                a("span", {
                  class: f(["pricing-rank-no", { top: (s(i).currentPage - 1) * v + c < 3 }])
                }, r((s(i).currentPage - 1) * v + c + 1), 3),
                a("span", mt, [
                  a("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://artificialanalysis.ai",
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, bt),
                  t.creator ? (o(), l("span", yt, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0),
                  t.metrics && t.metrics.length ? (o(), l("span", _t, [
                    (o(!0), l(A, null, $(t.metrics, (m) => (o(), l("span", {
                      class: "aa-rank-metric",
                      key: m.label
                    }, [
                      g(r(m.label) + " ", 1),
                      a("b", null, r(m.value), 1)
                    ]))), 128))
                  ])) : d("", !0)
                ]),
                a("b", kt, " 智能 " + r(t.score.toFixed(1)), 1),
                a("button", {
                  type: "button",
                  class: f(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (m) => U(t.name)
                }, r(t.isFavorite ? "♥" : "♡"), 11, wt)
              ]))), 128))
            ]),
            a("nav", Pt, [
              a("button", {
                type: "button",
                disabled: s(i).currentPage <= 1,
                onClick: j
              }, " ‹ 上一页 ", 8, xt),
              a("span", null, [
                e[21] || (e[21] = g(" 第 ", -1)),
                b(a("input", {
                  type: "number",
                  min: "1",
                  max: S.value,
                  "onUpdate:modelValue": e[8] || (e[8] = (t) => s(i).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, Ct), [
                  [
                    V,
                    s(i).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[22] || (e[22] = g(" / ", -1)),
                a("b", null, r(S.value), 1),
                e[23] || (e[23] = g(" 页 ", -1))
              ]),
              a("button", {
                type: "button",
                disabled: s(i).currentPage >= S.value,
                onClick: e[9] || (e[9] = (t) => q(S.value))
              }, " 下一页 › ", 8, Mt)
            ])
          ]),
          a("div", St, [
            e[24] || (e[24] = a("div", { class: "aa-chart-header" }, [
              a("span", { class: "aa-chart-title" }, "前沿大模型智能指数对比"),
              a("span", { class: "muted small" }, "Artificial Analysis 权威盲测综合分")
            ], -1)),
            a("div", Ft, [
              (o(!0), l(A, null, $(Q.value, (t, c) => (o(), l("div", {
                key: t.name,
                class: "aa-bar-row"
              }, [
                a("span", {
                  class: "aa-bar-model-name",
                  title: t.name
                }, r(t.name), 9, At),
                a("div", $t, [
                  a("div", {
                    class: "aa-bar-fill",
                    style: be({
                      width: `${Math.min(100, Math.max(10, t.score / re.value * 100))}%`,
                      background: R[c % R.length]
                    })
                  }, [
                    a("span", Lt, r(t.score.toFixed(1)), 1)
                  ], 4)
                ])
              ]))), 128))
            ])
          ])
        ], 512), [
          [F, s(i).view === "rank"]
        ])
      ], 2),
      E.value ? (o(), me(s(X), {
        key: 0,
        visible: s(h) && _.value,
        anchor: D.value,
        onClose: e[10] || (e[10] = (t) => _.value = !1),
        onSaved: J
      }, null, 8, ["visible", "anchor"])) : d("", !0)
    ], 8, Ce));
  }
}), Bt = /* @__PURE__ */ xe(Ot, [["__scopeId", "data-v-844eb36d"]]);
export {
  Bt as default
};
