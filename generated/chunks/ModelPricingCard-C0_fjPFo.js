import { d as pe, x as G, L as ge, e as l, f as i, t as r, u as s, B as v, l as m, z as S, p as ve, n as R, m as p, g as d, D as fe, F as A, h as F, c as he, b as $, s as u, o, A as me, E as j } from "./vendor-vue-CjOHdfe5.js";
import { u as be } from "./useCardActivity-BSKRA6WC.js";
import { ae as q, af as ye, C as ke } from "./search.service-CzxjlNxM.js";
import { a as _e, p as b } from "./pricing-store-Beh8wO7t.js";
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
}, De = ["href"], Ee = {
  class: "pricing-info",
  role: "status"
}, Be = {
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
}, ze = {
  key: 0,
  class: "muted small"
}, Ge = { class: "aa-rank-main" }, je = ["href", "title"], qe = {
  key: 0,
  class: "aa-rank-meta"
}, He = { class: "pricing-rates-badge" }, We = {
  class: "rate-tag in",
  title: "每百万输入 Token 价格"
}, Xe = {
  class: "rate-tag out",
  title: "每百万输出 Token 价格"
}, Ye = {
  key: 0,
  class: "rate-tag ctx",
  title: "最大上下文窗口"
}, Ze = {
  key: 0,
  class: "aa-rank-score"
}, Je = ["title", "onClick"], et = {
  id: "pricing-pagination",
  class: "pricing-pagination",
  "aria-label": "数据翻页"
}, tt = ["disabled"], at = ["max"], it = { id: "pricing-page-total" }, nt = ["disabled"], st = { class: "pricing-chart" }, rt = {
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
    const { active: f } = be("daily-pricing", "/pricing.html"), H = j(() => import("./PricingSettingsPanel-BhPDwu8M.js")), W = j(() => import("./ImageBenchmarkView-Dq7p9Y4I.js")), a = _e, V = ["#8b5cf6", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f97316"], y = $(!1), T = $(!1), D = $(null), L = $("");
    let k = !1, w = 0;
    G(y, (n) => {
      n && (T.value = !0);
    });
    async function P() {
      const n = ++w;
      if (!(!f.value || k))
        try {
          const e = await ye();
          if (k || !f.value || n !== w) return;
          Object.assign(a, e), L.value = "";
        } catch {
          if (k || !f.value || n !== w) return;
          a.hasOpenRouterKey = !1, a.hasAaApiKey = !1, L.value = "配置状态读取失败；保存内容未改动。";
        }
    }
    function X() {
      f.value && P();
    }
    function E(n, e) {
      e === "local" && q.some((t) => t in n) && P();
    }
    function B(n) {
      (n.key === null || q.some((e) => e === n.key)) && P();
    }
    function K() {
      ++w, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(E), window.removeEventListener("storage", B);
    }
    G(f, (n) => {
      K(), !(!n || k) && (typeof chrome < "u" && chrome.storage?.onChanged?.addListener(E), window.addEventListener("storage", B), P());
    }, { immediate: !0, flush: "sync" }), ge(() => {
      k = !0, K();
    });
    function Y(n) {
      return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M ctx` : n >= 1e3 ? `${Math.round(n / 1e3)}k ctx` : `${n} ctx`;
    }
    const Z = u(() => a.view === "rank" ? "Artificial Analysis 排行内置示例" : a.view === "price" ? "OpenRouter 定价内置示例" : "生图与多模态基准评测"), J = u(() => a.view === "rank" ? "https://artificialanalysis.ai/leaderboards/models" : "https://openrouter.ai/models"), _ = u(() => {
      let n = [...a.models];
      if (a.favoritesOnly && (n = n.filter((e) => e.isFavorite)), a.searchQuery.trim()) {
        const e = a.searchQuery.trim().toLowerCase();
        n = n.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e) || t.id.toLowerCase().includes(e)
        );
      }
      return a.sortMode === "cheap-in" ? n.sort((e, t) => e.inputPrice - t.inputPrice) : a.sortMode === "cheap-out" ? n.sort((e, t) => e.outputPrice - t.outputPrice) : a.sortMode === "free" ? n.sort((e, t) => e.inputPrice + e.outputPrice - (t.inputPrice + t.outputPrice)) : a.sortMode === "context" && n.sort((e, t) => t.contextLength - e.contextLength), n;
    }), x = u(() => Math.max(1, Math.ceil(_.value.length / g))), ee = u(() => {
      const n = (a.currentPage - 1) * g;
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
      let n = [...a.ranking];
      if (a.favoritesOnly && (n = n.filter((e) => e.isFavorite)), a.searchQuery.trim()) {
        const e = a.searchQuery.trim().toLowerCase();
        n = n.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e)
        );
      }
      return n.sort((e, t) => (t.score ?? 0) - (e.score ?? 0)), n;
    }), M = u(() => Math.max(1, Math.ceil(C.value.length / g))), ae = u(() => {
      const n = (a.currentPage - 1) * g;
      return C.value.slice(n, n + g);
    }), N = u(() => C.value.slice(0, 8)), ie = u(() => {
      const n = N.value.map((e) => e.score);
      return Math.max(...n, 100);
    });
    function O(n) {
      a.view = n, a.currentPage = 1, b.dispatch("switch-view", n);
    }
    function ne(n) {
      b.selectImageModel(n);
    }
    function se() {
      a.currentPage = 1, b.dispatch("set-sort", a.sortMode);
    }
    function re() {
      a.favoritesOnly = !a.favoritesOnly, a.currentPage = 1, b.dispatch("toggle-favorites-only", a.favoritesOnly);
    }
    function Q(n) {
      b.toggleFavorite(n);
    }
    function U() {
      a.currentPage > 1 && (a.currentPage--, b.dispatch("set-page", a.currentPage));
    }
    function z(n) {
      a.currentPage < n && (a.currentPage++, b.dispatch("set-page", a.currentPage));
    }
    return (n, e) => (o(), l("div", {
      class: "vue-pricing-wrapper",
      inert: !s(f)
    }, [
      i("section", {
        id: "daily-pricing",
        class: v(["card wide", { "card-fullscreen": s(ke).activeId === "daily-pricing" }])
      }, [
        i("header", xe, [
          e[11] || (e[11] = i("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#fbbf24,#f59e0b)" }
          }, null, -1)),
          i("h2", Ce, r(s(a).view === "rank" ? "模型排行" : s(a).view === "image-eval" ? "AI 评分全景 (图灵坐标)" : "模型价格"), 1),
          i("div", Me, [
            i("button", {
              type: "button",
              "data-pricing-view": "price",
              role: "tab",
              class: v({ active: s(a).view === "price" }),
              "aria-selected": s(a).view === "price",
              onClick: e[0] || (e[0] = (t) => O("price"))
            }, " 模型价格 ", 10, Se),
            i("button", {
              type: "button",
              "data-pricing-view": "rank",
              role: "tab",
              class: v({ active: s(a).view === "rank" }),
              "aria-selected": s(a).view === "rank",
              onClick: e[1] || (e[1] = (t) => O("rank"))
            }, " 模型排行 ", 10, Ae),
            i("button", {
              type: "button",
              "data-pricing-view": "image-eval",
              role: "tab",
              class: v({ active: s(a).view === "image-eval" }),
              "aria-selected": s(a).view === "image-eval",
              onClick: e[2] || (e[2] = (t) => O("image-eval"))
            }, " 🎯 AI 评分 ", 10, Fe)
          ]),
          i("button", {
            id: "pricing-settings-open",
            ref_key: "settingsAnchor",
            ref: D,
            class: "icon-btn",
            type: "button",
            title: "模型数据设置",
            "aria-expanded": y.value,
            onClick: e[3] || (e[3] = (t) => y.value = !y.value)
          }, "⚙️", 8, $e),
          e[12] || (e[12] = i("button", {
            id: "pricing-refresh",
            class: "icon-btn",
            type: "button",
            title: "当前为内置示例，实时数据刷新尚未接入",
            disabled: ""
          }, " ↻ ", -1))
        ]),
        m(i("div", Le, [
          m(i("select", {
            id: "pricing-mode",
            class: "pricing-sort",
            "onUpdate:modelValue": e[4] || (e[4] = (t) => s(a).sortMode = t),
            onChange: se
          }, [...e[13] || (e[13] = [
            i("option", { value: "cheap-in" }, "输入最便宜", -1),
            i("option", { value: "cheap-out" }, "输出最便宜", -1),
            i("option", { value: "free" }, "免费模型", -1),
            i("option", { value: "context" }, "上下文最大", -1)
          ])], 544), [
            [S, s(a).view === "price"],
            [ve, s(a).sortMode]
          ]),
          m(i("input", {
            id: "pricing-search",
            class: "pricing-search",
            type: "search",
            "onUpdate:modelValue": e[5] || (e[5] = (t) => s(a).searchQuery = t),
            placeholder: s(a).view === "rank" ? "搜索排行中的模型或厂商" : "搜索模型、厂商或 ID",
            autocomplete: "off"
          }, null, 8, Oe), [
            [R, s(a).searchQuery]
          ]),
          i("button", {
            id: "pricing-favorites-filter",
            class: v(["pricing-favorites-filter", { active: s(a).favoritesOnly }]),
            type: "button",
            "aria-pressed": s(a).favoritesOnly,
            title: "切换全部模型或只看关注",
            onClick: re
          }, [
            p(r(s(a).favoritesOnly ? "♥ 只看关注" : "♡ 我的关注") + " ", 1),
            i("b", null, r(s(a).favoritesCount), 1)
          ], 10, Ie),
          i("span", Re, r(Z.value), 1),
          s(a).hasOpenRouterKey && s(a).view === "price" ? (o(), l("span", Ve, "🔑 已配置")) : d("", !0),
          s(a).hasAaApiKey && s(a).view === "rank" ? (o(), l("span", Te, "🔑 已配置")) : d("", !0),
          e[14] || (e[14] = i("span", { class: "grow" }, null, -1)),
          i("a", {
            id: "pricing-source-link",
            class: "small",
            href: J.value,
            target: "_blank",
            rel: "noreferrer"
          }, " 查看来源 ", 8, De)
        ], 512), [
          [S, s(a).view !== "image-eval"]
        ]),
        i("p", Ee, "当前价格、排行与评分均为内置数据，未实时拉取；关注只保留在本页内存。" + r(L.value), 1),
        s(a).view === "rank" ? (o(), l("div", Be, [...e[15] || (e[15] = [
          i("b", null, "💡 智能指数说明：", -1),
          i("span", null, "Artificial Analysis 权威实测综合加权分（含数学、编程、综合推理等真实盲测指标），分数越高代表模型综合能力越强。", -1)
        ])])) : d("", !0),
        s(a).view === "image-eval" ? (o(), l("div", Ke, [
          fe(s(W), {
            "selected-model-id": s(a).selectedImageModelId,
            onSelectModel: ne
          }, null, 8, ["selected-model-id"])
        ])) : d("", !0),
        m(i("div", Ne, [
          i("div", Qe, [
            i("ol", Ue, [
              _.value.length === 0 ? (o(), l("li", ze, r(s(a).favoritesOnly ? "暂无已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的模型。"), 1)) : d("", !0),
              (o(!0), l(A, null, F(ee.value, (t, c) => (o(), l("li", {
                key: t.id,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                i("span", {
                  class: v(["pricing-rank-no", { top: (s(a).currentPage - 1) * g + c < 3 }])
                }, r((s(a).currentPage - 1) * g + c + 1), 3),
                i("span", Ge, [
                  i("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://openrouter.ai/models/" + t.id,
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, je),
                  t.creator ? (o(), l("span", qe, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0)
                ]),
                i("span", He, [
                  i("span", We, " 入: $" + r(t.inputPrice), 1),
                  i("span", Xe, " 出: $" + r(t.outputPrice), 1),
                  t.contextLength ? (o(), l("span", Ye, r(Y(t.contextLength)), 1)) : d("", !0)
                ]),
                t.score ? (o(), l("b", Ze, " 智能 " + r(t.score.toFixed(1)), 1)) : d("", !0),
                i("button", {
                  type: "button",
                  class: v(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (h) => Q(t.id)
                }, r(t.isFavorite ? "♥" : "♡"), 11, Je)
              ]))), 128))
            ]),
            i("nav", et, [
              i("button", {
                id: "pricing-page-prev",
                type: "button",
                disabled: s(a).currentPage <= 1,
                onClick: U
              }, " ‹ 上一页 ", 8, tt),
              i("span", null, [
                e[16] || (e[16] = p(" 第 ", -1)),
                m(i("input", {
                  id: "pricing-page-input",
                  type: "number",
                  min: "1",
                  max: x.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => s(a).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, at), [
                  [
                    R,
                    s(a).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[17] || (e[17] = p(" / ", -1)),
                i("b", it, r(x.value), 1),
                e[18] || (e[18] = p(" 页 ", -1))
              ]),
              i("button", {
                id: "pricing-page-next",
                type: "button",
                disabled: s(a).currentPage >= x.value,
                onClick: e[7] || (e[7] = (t) => z(x.value))
              }, " 下一页 › ", 8, nt)
            ])
          ]),
          i("div", st, [
            (o(), l("svg", rt, [
              e[19] || (e[19] = i("line", {
                x1: "10",
                y1: "170",
                x2: "550",
                y2: "170",
                class: "pricing-chart-axis",
                stroke: "rgba(255,255,255,0.15)"
              }, null, -1)),
              e[20] || (e[20] = i("line", {
                x1: "10",
                y1: "10",
                x2: "10",
                y2: "170",
                class: "pricing-chart-axis",
                stroke: "rgba(255,255,255,0.15)"
              }, null, -1)),
              i("polyline", {
                points: te.value,
                fill: "none",
                stroke: "#fbbf24",
                "stroke-width": "2",
                class: "pricing-line-rank"
              }, null, 8, ot)
            ])),
            i("div", lt, [
              e[21] || (e[21] = i("span", null, [
                i("i", {
                  class: "dot in",
                  style: { background: "#38bdf8" }
                }),
                p("输入 $/1M")
              ], -1)),
              e[22] || (e[22] = i("span", null, [
                i("i", {
                  class: "dot out",
                  style: { background: "#f59e0b" }
                }),
                p("输出 $/1M")
              ], -1)),
              i("span", ct, "Top " + r(_.value.length) + " · 价格走势", 1)
            ])
          ])
        ], 512), [
          [S, s(a).view === "price"]
        ]),
        m(i("div", dt, [
          i("div", ut, [
            i("ol", pt, [
              C.value.length === 0 ? (o(), l("li", gt, r(s(a).favoritesOnly ? "排行中没有已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的排行模型。"), 1)) : d("", !0),
              (o(!0), l(A, null, F(ae.value, (t, c) => (o(), l("li", {
                key: t.name,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                i("span", {
                  class: v(["pricing-rank-no", { top: (s(a).currentPage - 1) * g + c < 3 }])
                }, r((s(a).currentPage - 1) * g + c + 1), 3),
                i("span", vt, [
                  i("a", {
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
                      i("b", null, r(h.value), 1)
                    ]))), 128))
                  ])) : d("", !0)
                ]),
                i("b", bt, " 智能 " + r(t.score.toFixed(1)), 1),
                i("button", {
                  type: "button",
                  class: v(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (h) => Q(t.name)
                }, r(t.isFavorite ? "♥" : "♡"), 11, yt)
              ]))), 128))
            ]),
            i("nav", kt, [
              i("button", {
                type: "button",
                disabled: s(a).currentPage <= 1,
                onClick: U
              }, " ‹ 上一页 ", 8, _t),
              i("span", null, [
                e[23] || (e[23] = p(" 第 ", -1)),
                m(i("input", {
                  type: "number",
                  min: "1",
                  max: M.value,
                  "onUpdate:modelValue": e[8] || (e[8] = (t) => s(a).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, wt), [
                  [
                    R,
                    s(a).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[24] || (e[24] = p(" / ", -1)),
                i("b", null, r(M.value), 1),
                e[25] || (e[25] = p(" 页 ", -1))
              ]),
              i("button", {
                type: "button",
                disabled: s(a).currentPage >= M.value,
                onClick: e[9] || (e[9] = (t) => z(M.value))
              }, " 下一页 › ", 8, Pt)
            ])
          ]),
          i("div", xt, [
            e[26] || (e[26] = i("div", { class: "aa-chart-header" }, [
              i("span", { class: "aa-chart-title" }, "前沿大模型智能指数对比"),
              i("span", { class: "muted small" }, "Artificial Analysis 权威盲测综合分")
            ], -1)),
            i("div", Ct, [
              (o(!0), l(A, null, F(N.value, (t, c) => (o(), l("div", {
                key: t.name,
                class: "aa-bar-row"
              }, [
                i("span", {
                  class: "aa-bar-model-name",
                  title: t.name
                }, r(t.name), 9, Mt),
                i("div", St, [
                  i("div", {
                    class: "aa-bar-fill",
                    style: me({
                      width: `${Math.min(100, Math.max(10, t.score / ie.value * 100))}%`,
                      background: V[c % V.length]
                    })
                  }, [
                    i("span", At, r(t.score.toFixed(1)), 1)
                  ], 4)
                ])
              ]))), 128))
            ])
          ])
        ], 512), [
          [S, s(a).view === "rank"]
        ])
      ], 2),
      T.value ? (o(), he(s(H), {
        key: 0,
        visible: s(f) && y.value,
        anchor: D.value,
        onClose: e[10] || (e[10] = (t) => y.value = !1),
        onSaved: X
      }, null, 8, ["visible", "anchor"])) : d("", !0)
    ], 8, Pe));
  }
}), Tt = /* @__PURE__ */ we(Ft, [["__scopeId", "data-v-a9bec562"]]);
export {
  Tt as default
};
