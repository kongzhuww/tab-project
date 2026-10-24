import { f as pe, w as q, a as ge, g as o, h as l, i as a, t as r, x as s, s as v, q as m, D as S, y as ve, v as R, j as p, u as d, l as fe, F as A, z as F, B as he, I as me, J as z, b as $, c as u } from "./vendor-vue-BUkfvXUI.js";
import { u as be } from "./useCardActivity-BiL1Icai.js";
import { u as ye, L as ke, M as G } from "./search.service-CJV_B19X.js";
import { p as _e, a as b } from "./pricing-store-G1eKq-ME.js";
import { _ as we } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Pe = ["inert"], xe = { class: "card-head" }, Ce = { id: "pricing-title" }, Me = {
  class: "pricing-view-switch",
  role: "tablist",
  "aria-label": "模型数据视图"
}, Se = ["aria-selected"], Ae = ["aria-selected"], Fe = ["aria-selected"], $e = ["aria-expanded"], Le = { class: "pricing-toolbar" }, Oe = ["placeholder"], Ie = ["aria-pressed"], Re = {
  id: "pricing-source",
  class: "muted small"
}, Ve = {
  key: 0,
  class: "api-badge ok",
  title: "已保存 OpenRouter Key，尚未验证连通性"
}, Te = {
  key: 1,
  class: "api-badge ok",
  title: "已保存 Artificial Analysis Key，尚未验证连通性"
}, De = ["href"], Be = {
  class: "pricing-info",
  role: "status"
}, Ee = {
  key: 0,
  id: "pricing-info",
  class: "pricing-info"
}, Ke = {
  key: 1,
  id: "pricing-image-eval-layout",
  class: "pricing-image-eval-wrapper"
}, Ne = {
  id: "pricing-layout",
  class: "pricing-layout"
}, Qe = { class: "pricing-left-col" }, Ue = {
  id: "pricing-rank-list",
  class: "pricing-rank-list"
}, je = {
  key: 0,
  class: "muted small"
}, qe = { class: "aa-rank-main" }, ze = ["href", "title"], Ge = {
  key: 0,
  class: "aa-rank-meta"
}, He = { class: "pricing-rates-badge" }, Je = {
  class: "rate-tag in",
  title: "每百万输入 Token 价格"
}, We = {
  class: "rate-tag out",
  title: "每百万输出 Token 价格"
}, Xe = {
  key: 0,
  class: "rate-tag ctx",
  title: "最大上下文窗口"
}, Ye = {
  key: 0,
  class: "aa-rank-score"
}, Ze = ["title", "onClick"], et = {
  id: "pricing-pagination",
  class: "pricing-pagination",
  "aria-label": "数据翻页"
}, tt = ["disabled"], it = ["max"], at = { id: "pricing-page-total" }, nt = ["disabled"], st = { class: "pricing-chart" }, rt = {
  id: "pricing-chart-svg",
  viewBox: "0 0 560 180",
  preserveAspectRatio: "none",
  role: "img",
  "aria-label": "模型价格曲线"
}, ot = ["points"], lt = {
  id: "pricing-legend",
  class: "pricing-legend"
}, ct = { class: "pricing-chart-note" }, dt = {
  id: "pricing-rank-layout",
  class: "pricing-layout"
}, ut = { class: "pricing-left-col" }, pt = { class: "pricing-rank-list" }, gt = {
  key: 0,
  class: "muted small"
}, vt = { class: "aa-rank-main" }, ft = ["href", "title"], ht = {
  key: 0,
  class: "aa-rank-meta"
}, mt = {
  key: 1,
  class: "aa-rank-metrics"
}, bt = { class: "aa-rank-score" }, yt = ["title", "onClick"], kt = {
  class: "pricing-pagination",
  "aria-label": "排行数据翻页"
}, _t = ["disabled"], wt = ["max"], Pt = ["disabled"], xt = { class: "pricing-chart aa-rank-chart-panel" }, Ct = { class: "aa-bars-container" }, Mt = ["title"], St = { class: "aa-bar-track" }, At = { class: "aa-bar-val" }, g = 10, Ft = /* @__PURE__ */ pe({
  __name: "ModelPricingCard",
  setup($t) {
    const { active: f } = be("daily-pricing", "/pricing.html"), H = z(() => import("./PricingSettingsPanel-CiNbuc_8.js")), J = z(() => import("./ImageBenchmarkView-CcWk5vRm.js")), i = _e, V = ["#8b5cf6", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f97316"], y = $(!1), T = $(!1), D = $(null), L = $("");
    let k = !1, w = 0;
    q(y, (n) => {
      n && (T.value = !0);
    });
    async function P() {
      const n = ++w;
      if (!(!f.value || k))
        try {
          const e = await ke();
          if (k || !f.value || n !== w) return;
          Object.assign(i, e), L.value = "";
        } catch {
          if (k || !f.value || n !== w) return;
          i.hasOpenRouterKey = !1, i.hasAaApiKey = !1, L.value = "配置状态读取失败；保存内容未改动。";
        }
    }
    function W() {
      f.value && P();
    }
    function B(n, e) {
      e === "local" && G.some((t) => t in n) && P();
    }
    function E(n) {
      (n.key === null || G.some((e) => e === n.key)) && P();
    }
    function K() {
      ++w, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(B), window.removeEventListener("storage", E);
    }
    q(f, (n) => {
      K(), !(!n || k) && (typeof chrome < "u" && chrome.storage?.onChanged?.addListener(B), window.addEventListener("storage", E), P());
    }, { immediate: !0, flush: "sync" }), ge(() => {
      k = !0, K();
    });
    function X(n) {
      return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M ctx` : n >= 1e3 ? `${Math.round(n / 1e3)}k ctx` : `${n} ctx`;
    }
    const Y = u(() => i.view === "rank" ? "Artificial Analysis 排行内置示例" : i.view === "price" ? "OpenRouter 定价内置示例" : "生图与多模态基准评测"), Z = u(() => i.view === "rank" ? "https://artificialanalysis.ai/leaderboards/models" : "https://openrouter.ai/models"), _ = u(() => {
      let n = [...i.models];
      if (i.favoritesOnly && (n = n.filter((e) => e.isFavorite)), i.searchQuery.trim()) {
        const e = i.searchQuery.trim().toLowerCase();
        n = n.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e) || t.id.toLowerCase().includes(e)
        );
      }
      return i.sortMode === "cheap-in" ? n.sort((e, t) => e.inputPrice - t.inputPrice) : i.sortMode === "cheap-out" ? n.sort((e, t) => e.outputPrice - t.outputPrice) : i.sortMode === "free" ? n.sort((e, t) => e.inputPrice + e.outputPrice - (t.inputPrice + t.outputPrice)) : i.sortMode === "context" && n.sort((e, t) => t.contextLength - e.contextLength), n;
    }), x = u(() => Math.max(1, Math.ceil(_.value.length / g))), ee = u(() => {
      const n = (i.currentPage - 1) * g;
      return _.value.slice(n, n + g);
    }), te = u(() => {
      const n = _.value.slice(0, 30);
      if (n.length < 2) return "10,160 550,160";
      const e = 560, t = 180, c = 10, h = Math.max(...n.map((I) => I.outputPrice || 1), 1), oe = (e - c * 2) / (n.length - 1);
      return n.map((I, le) => {
        const ce = I.outputPrice || 0.1, de = (c + le * oe).toFixed(1), ue = (c + (1 - ce / h) * (t - c * 2)).toFixed(1);
        return `${de},${ue}`;
      }).join(" ");
    }), C = u(() => {
      let n = [...i.ranking];
      if (i.favoritesOnly && (n = n.filter((e) => e.isFavorite)), i.searchQuery.trim()) {
        const e = i.searchQuery.trim().toLowerCase();
        n = n.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e)
        );
      }
      return n.sort((e, t) => (t.score ?? 0) - (e.score ?? 0)), n;
    }), M = u(() => Math.max(1, Math.ceil(C.value.length / g))), ie = u(() => {
      const n = (i.currentPage - 1) * g;
      return C.value.slice(n, n + g);
    }), N = u(() => C.value.slice(0, 8)), ae = u(() => {
      const n = N.value.map((e) => e.score);
      return Math.max(...n, 100);
    });
    function O(n) {
      i.view = n, i.currentPage = 1, b.dispatch("switch-view", n);
    }
    function ne(n) {
      b.selectImageModel(n);
    }
    function se() {
      i.currentPage = 1, b.dispatch("set-sort", i.sortMode);
    }
    function re() {
      i.favoritesOnly = !i.favoritesOnly, i.currentPage = 1, b.dispatch("toggle-favorites-only", i.favoritesOnly);
    }
    function Q(n) {
      b.toggleFavorite(n);
    }
    function U() {
      i.currentPage > 1 && (i.currentPage--, b.dispatch("set-page", i.currentPage));
    }
    function j(n) {
      i.currentPage < n && (i.currentPage++, b.dispatch("set-page", i.currentPage));
    }
    return (n, e) => (o(), l("div", {
      class: "vue-pricing-wrapper",
      inert: !s(f)
    }, [
      a("section", {
        id: "daily-pricing",
        class: v(["card wide", { "card-fullscreen": s(ye).activeId === "daily-pricing" }])
      }, [
        a("header", xe, [
          e[11] || (e[11] = a("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#fbbf24,#f59e0b)" }
          }, null, -1)),
          a("h2", Ce, r(s(i).view === "rank" ? "模型排行" : s(i).view === "image-eval" ? "AI 评分全景 (图灵坐标)" : "模型价格"), 1),
          a("div", Me, [
            a("button", {
              type: "button",
              "data-pricing-view": "price",
              role: "tab",
              class: v({ active: s(i).view === "price" }),
              "aria-selected": s(i).view === "price",
              onClick: e[0] || (e[0] = (t) => O("price"))
            }, " 模型价格 ", 10, Se),
            a("button", {
              type: "button",
              "data-pricing-view": "rank",
              role: "tab",
              class: v({ active: s(i).view === "rank" }),
              "aria-selected": s(i).view === "rank",
              onClick: e[1] || (e[1] = (t) => O("rank"))
            }, " 模型排行 ", 10, Ae),
            a("button", {
              type: "button",
              "data-pricing-view": "image-eval",
              role: "tab",
              class: v({ active: s(i).view === "image-eval" }),
              "aria-selected": s(i).view === "image-eval",
              onClick: e[2] || (e[2] = (t) => O("image-eval"))
            }, " 🎯 AI 评分 ", 10, Fe)
          ]),
          a("button", {
            id: "pricing-settings-open",
            ref_key: "settingsAnchor",
            ref: D,
            class: "icon-btn",
            type: "button",
            title: "模型数据设置",
            "aria-expanded": y.value,
            onClick: e[3] || (e[3] = (t) => y.value = !y.value)
          }, "⚙️", 8, $e),
          e[12] || (e[12] = a("button", {
            id: "pricing-refresh",
            class: "icon-btn",
            type: "button",
            title: "当前为内置示例，实时数据刷新尚未接入",
            disabled: ""
          }, " ↻ ", -1))
        ]),
        m(a("div", Le, [
          m(a("select", {
            id: "pricing-mode",
            class: "pricing-sort",
            "onUpdate:modelValue": e[4] || (e[4] = (t) => s(i).sortMode = t),
            onChange: se
          }, [...e[13] || (e[13] = [
            a("option", { value: "cheap-in" }, "输入最便宜", -1),
            a("option", { value: "cheap-out" }, "输出最便宜", -1),
            a("option", { value: "free" }, "免费模型", -1),
            a("option", { value: "context" }, "上下文最大", -1)
          ])], 544), [
            [S, s(i).view === "price"],
            [ve, s(i).sortMode]
          ]),
          m(a("input", {
            id: "pricing-search",
            class: "pricing-search",
            type: "search",
            "onUpdate:modelValue": e[5] || (e[5] = (t) => s(i).searchQuery = t),
            placeholder: s(i).view === "rank" ? "搜索排行中的模型或厂商" : "搜索模型、厂商或 ID",
            autocomplete: "off"
          }, null, 8, Oe), [
            [R, s(i).searchQuery]
          ]),
          a("button", {
            id: "pricing-favorites-filter",
            class: v(["pricing-favorites-filter", { active: s(i).favoritesOnly }]),
            type: "button",
            "aria-pressed": s(i).favoritesOnly,
            title: "切换全部模型或只看关注",
            onClick: re
          }, [
            p(r(s(i).favoritesOnly ? "♥ 只看关注" : "♡ 我的关注") + " ", 1),
            a("b", null, r(s(i).favoritesCount), 1)
          ], 10, Ie),
          a("span", Re, r(Y.value), 1),
          s(i).hasOpenRouterKey && s(i).view === "price" ? (o(), l("span", Ve, "🔑 已配置")) : d("", !0),
          s(i).hasAaApiKey && s(i).view === "rank" ? (o(), l("span", Te, "🔑 已配置")) : d("", !0),
          e[14] || (e[14] = a("span", { class: "grow" }, null, -1)),
          a("a", {
            id: "pricing-source-link",
            class: "small",
            href: Z.value,
            target: "_blank",
            rel: "noreferrer"
          }, " 查看来源 ", 8, De)
        ], 512), [
          [S, s(i).view !== "image-eval"]
        ]),
        a("p", Be, "当前价格、排行与评分均为内置数据，未实时拉取；关注只保留在本页内存。" + r(L.value), 1),
        s(i).view === "rank" ? (o(), l("div", Ee, [...e[15] || (e[15] = [
          a("b", null, "💡 智能指数说明：", -1),
          a("span", null, "Artificial Analysis 权威实测综合加权分（含数学、编程、综合推理等真实盲测指标），分数越高代表模型综合能力越强。", -1)
        ])])) : d("", !0),
        s(i).view === "image-eval" ? (o(), l("div", Ke, [
          fe(s(J), {
            "selected-model-id": s(i).selectedImageModelId,
            onSelectModel: ne
          }, null, 8, ["selected-model-id"])
        ])) : d("", !0),
        m(a("div", Ne, [
          a("div", Qe, [
            a("ol", Ue, [
              _.value.length === 0 ? (o(), l("li", je, r(s(i).favoritesOnly ? "暂无已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的模型。"), 1)) : d("", !0),
              (o(!0), l(A, null, F(ee.value, (t, c) => (o(), l("li", {
                key: t.id,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                a("span", {
                  class: v(["pricing-rank-no", { top: (s(i).currentPage - 1) * g + c < 3 }])
                }, r((s(i).currentPage - 1) * g + c + 1), 3),
                a("span", qe, [
                  a("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://openrouter.ai/models/" + t.id,
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, ze),
                  t.creator ? (o(), l("span", Ge, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0)
                ]),
                a("span", He, [
                  a("span", Je, " 入: $" + r(t.inputPrice), 1),
                  a("span", We, " 出: $" + r(t.outputPrice), 1),
                  t.contextLength ? (o(), l("span", Xe, r(X(t.contextLength)), 1)) : d("", !0)
                ]),
                t.score ? (o(), l("b", Ye, " 智能 " + r(t.score.toFixed(1)), 1)) : d("", !0),
                a("button", {
                  type: "button",
                  class: v(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (h) => Q(t.id)
                }, r(t.isFavorite ? "♥" : "♡"), 11, Ze)
              ]))), 128))
            ]),
            a("nav", et, [
              a("button", {
                id: "pricing-page-prev",
                type: "button",
                disabled: s(i).currentPage <= 1,
                onClick: U
              }, " ‹ 上一页 ", 8, tt),
              a("span", null, [
                e[16] || (e[16] = p(" 第 ", -1)),
                m(a("input", {
                  id: "pricing-page-input",
                  type: "number",
                  min: "1",
                  max: x.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => s(i).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, it), [
                  [
                    R,
                    s(i).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[17] || (e[17] = p(" / ", -1)),
                a("b", at, r(x.value), 1),
                e[18] || (e[18] = p(" 页 ", -1))
              ]),
              a("button", {
                id: "pricing-page-next",
                type: "button",
                disabled: s(i).currentPage >= x.value,
                onClick: e[7] || (e[7] = (t) => j(x.value))
              }, " 下一页 › ", 8, nt)
            ])
          ]),
          a("div", st, [
            (o(), l("svg", rt, [
              e[19] || (e[19] = a("line", {
                x1: "10",
                y1: "170",
                x2: "550",
                y2: "170",
                class: "pricing-chart-axis",
                stroke: "rgba(255,255,255,0.15)"
              }, null, -1)),
              e[20] || (e[20] = a("line", {
                x1: "10",
                y1: "10",
                x2: "10",
                y2: "170",
                class: "pricing-chart-axis",
                stroke: "rgba(255,255,255,0.15)"
              }, null, -1)),
              a("polyline", {
                points: te.value,
                fill: "none",
                stroke: "#fbbf24",
                "stroke-width": "2",
                class: "pricing-line-rank"
              }, null, 8, ot)
            ])),
            a("div", lt, [
              e[21] || (e[21] = a("span", null, [
                a("i", {
                  class: "dot in",
                  style: { background: "#38bdf8" }
                }),
                p("输入 $/1M")
              ], -1)),
              e[22] || (e[22] = a("span", null, [
                a("i", {
                  class: "dot out",
                  style: { background: "#f59e0b" }
                }),
                p("输出 $/1M")
              ], -1)),
              a("span", ct, "Top " + r(_.value.length) + " · 价格走势", 1)
            ])
          ])
        ], 512), [
          [S, s(i).view === "price"]
        ]),
        m(a("div", dt, [
          a("div", ut, [
            a("ol", pt, [
              C.value.length === 0 ? (o(), l("li", gt, r(s(i).favoritesOnly ? "排行中没有已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的排行模型。"), 1)) : d("", !0),
              (o(!0), l(A, null, F(ie.value, (t, c) => (o(), l("li", {
                key: t.name,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                a("span", {
                  class: v(["pricing-rank-no", { top: (s(i).currentPage - 1) * g + c < 3 }])
                }, r((s(i).currentPage - 1) * g + c + 1), 3),
                a("span", vt, [
                  a("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://artificialanalysis.ai",
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, ft),
                  t.creator ? (o(), l("span", ht, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0),
                  t.metrics && t.metrics.length ? (o(), l("span", mt, [
                    (o(!0), l(A, null, F(t.metrics, (h) => (o(), l("span", {
                      class: "aa-rank-metric",
                      key: h.label
                    }, [
                      p(r(h.label) + " ", 1),
                      a("b", null, r(h.value), 1)
                    ]))), 128))
                  ])) : d("", !0)
                ]),
                a("b", bt, " 智能 " + r(t.score.toFixed(1)), 1),
                a("button", {
                  type: "button",
                  class: v(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (h) => Q(t.name)
                }, r(t.isFavorite ? "♥" : "♡"), 11, yt)
              ]))), 128))
            ]),
            a("nav", kt, [
              a("button", {
                type: "button",
                disabled: s(i).currentPage <= 1,
                onClick: U
              }, " ‹ 上一页 ", 8, _t),
              a("span", null, [
                e[23] || (e[23] = p(" 第 ", -1)),
                m(a("input", {
                  type: "number",
                  min: "1",
                  max: M.value,
                  "onUpdate:modelValue": e[8] || (e[8] = (t) => s(i).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, wt), [
                  [
                    R,
                    s(i).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[24] || (e[24] = p(" / ", -1)),
                a("b", null, r(M.value), 1),
                e[25] || (e[25] = p(" 页 ", -1))
              ]),
              a("button", {
                type: "button",
                disabled: s(i).currentPage >= M.value,
                onClick: e[9] || (e[9] = (t) => j(M.value))
              }, " 下一页 › ", 8, Pt)
            ])
          ]),
          a("div", xt, [
            e[26] || (e[26] = a("div", { class: "aa-chart-header" }, [
              a("span", { class: "aa-chart-title" }, "前沿大模型智能指数对比"),
              a("span", { class: "muted small" }, "Artificial Analysis 权威盲测综合分")
            ], -1)),
            a("div", Ct, [
              (o(!0), l(A, null, F(N.value, (t, c) => (o(), l("div", {
                key: t.name,
                class: "aa-bar-row"
              }, [
                a("span", {
                  class: "aa-bar-model-name",
                  title: t.name
                }, r(t.name), 9, Mt),
                a("div", St, [
                  a("div", {
                    class: "aa-bar-fill",
                    style: he({
                      width: `${Math.min(100, Math.max(10, t.score / ae.value * 100))}%`,
                      background: V[c % V.length]
                    })
                  }, [
                    a("span", At, r(t.score.toFixed(1)), 1)
                  ], 4)
                ])
              ]))), 128))
            ])
          ])
        ], 512), [
          [S, s(i).view === "rank"]
        ])
      ], 2),
      T.value ? (o(), me(s(H), {
        key: 0,
        visible: s(f) && y.value,
        anchor: D.value,
        onClose: e[10] || (e[10] = (t) => y.value = !1),
        onSaved: W
      }, null, 8, ["visible", "anchor"])) : d("", !0)
    ], 8, Pe));
  }
}), Tt = /* @__PURE__ */ we(Ft, [["__scopeId", "data-v-a9bec562"]]);
export {
  Tt as default
};
