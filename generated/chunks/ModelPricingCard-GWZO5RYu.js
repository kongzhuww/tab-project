import { d as ge, w as q, M as ve, g as l, h as a, t as r, u as n, C as f, n as _, A, s as fe, q as R, p as g, i as d, E as he, F, j as $, e as me, b as L, y as p, o, B as _e, G as z } from "./vendor-vue-dDCd4-uG.js";
import { u as be } from "./useCardActivity-C2OCcOZ_.js";
import { P as H, E as ke, r as ye } from "./view-styles-HjAT5OZi.js";
import { a as we, p as b } from "./pricing-store-D3L5FER9.js";
import { t as u, _ as Pe } from "./_plugin-vue_export-helper-CRVO6deU.js";
const xe = ["inert"], Ce = { class: "card-head" }, Me = { id: "pricing-title" }, Se = {
  class: "pricing-view-switch",
  role: "tablist",
  "aria-label": "模型数据视图"
}, Ae = ["aria-selected"], Fe = ["aria-selected"], $e = ["aria-selected"], Le = ["title", "aria-expanded"], Oe = ["title"], Ie = { class: "pricing-toolbar" }, Te = { value: "cheap-in" }, Re = { value: "cheap-out" }, Ee = { value: "free" }, Ve = { value: "context" }, De = ["placeholder"], Be = ["aria-pressed"], Ke = {
  id: "pricing-source",
  class: "muted small"
}, Ne = {
  key: 0,
  class: "api-badge ok",
  title: "已保存 OpenRouter Key，尚未验证连通性"
}, Qe = {
  key: 1,
  class: "api-badge ok",
  title: "已保存 Artificial Analysis Key，尚未验证连通性"
}, Ue = ["href"], Ge = {
  class: "pricing-info",
  role: "status"
}, je = {
  key: 0,
  id: "pricing-info",
  class: "pricing-info"
}, qe = {
  key: 1,
  id: "pricing-image-eval-layout",
  class: "pricing-image-eval-wrapper"
}, ze = {
  id: "pricing-layout",
  class: "pricing-layout"
}, He = { class: "pricing-left-col" }, We = {
  id: "pricing-rank-list",
  class: "pricing-rank-list"
}, Xe = {
  key: 0,
  class: "muted small"
}, Ye = { class: "aa-rank-main" }, Ze = ["href", "title"], Je = {
  key: 0,
  class: "aa-rank-meta"
}, et = { class: "pricing-rates-badge" }, tt = {
  class: "rate-tag in",
  title: "每百万输入 Token 价格"
}, it = {
  class: "rate-tag out",
  title: "每百万输出 Token 价格"
}, at = {
  key: 0,
  class: "rate-tag ctx",
  title: "最大上下文窗口"
}, nt = {
  key: 0,
  class: "aa-rank-score"
}, st = ["title", "onClick"], rt = {
  id: "pricing-pagination",
  class: "pricing-pagination",
  "aria-label": "数据翻页"
}, ot = ["disabled"], lt = ["max"], ct = { id: "pricing-page-total" }, dt = ["disabled"], ut = { class: "pricing-chart" }, pt = {
  id: "pricing-chart-svg",
  viewBox: "0 0 560 180",
  preserveAspectRatio: "none",
  role: "img",
  "aria-label": "模型价格曲线"
}, gt = ["points"], vt = {
  id: "pricing-legend",
  class: "pricing-legend"
}, ft = { class: "pricing-chart-note" }, ht = {
  id: "pricing-rank-layout",
  class: "pricing-layout"
}, mt = { class: "pricing-left-col" }, _t = { class: "pricing-rank-list" }, bt = {
  key: 0,
  class: "muted small"
}, kt = { class: "aa-rank-main" }, yt = ["href", "title"], wt = {
  key: 0,
  class: "aa-rank-meta"
}, Pt = {
  key: 1,
  class: "aa-rank-metrics"
}, xt = { class: "aa-rank-score" }, Ct = ["title", "onClick"], Mt = {
  class: "pricing-pagination",
  "aria-label": "排行数据翻页"
}, St = ["disabled"], At = ["max"], Ft = ["disabled"], $t = { class: "pricing-chart aa-rank-chart-panel" }, Lt = { class: "aa-bars-container" }, Ot = ["title"], It = { class: "aa-bar-track" }, Tt = { class: "aa-bar-val" }, v = 10, Rt = /* @__PURE__ */ ge({
  __name: "ModelPricingCard",
  setup(Et) {
    const { active: h } = be("daily-pricing", "/pricing.html"), W = z(() => import("./PricingSettingsPanel-dRJpjdbd.js")), X = z(() => import("./ImageBenchmarkView-DDArx7JL.js")), i = we, E = ["#8b5cf6", "#0ea5e9", "#22c55e", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f97316"], k = L(!1), V = L(!1), D = L(null), O = L("");
    let y = !1, P = 0;
    q(k, (s) => {
      s && (V.value = !0);
    });
    async function x() {
      const s = ++P;
      if (!(!h.value || y))
        try {
          const e = await ke();
          if (y || !h.value || s !== P) return;
          Object.assign(i, e), O.value = "";
        } catch {
          if (y || !h.value || s !== P) return;
          i.hasOpenRouterKey = !1, i.hasAaApiKey = !1, O.value = "配置状态读取失败；保存内容未改动。";
        }
    }
    function Y() {
      h.value && x();
    }
    function B(s, e) {
      e === "local" && H.some((t) => t in s) && x();
    }
    function K(s) {
      (s.key === null || H.some((e) => e === s.key)) && x();
    }
    function N() {
      ++P, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(B), window.removeEventListener("storage", K);
    }
    q(h, (s) => {
      N(), !(!s || y) && (typeof chrome < "u" && chrome.storage?.onChanged?.addListener(B), window.addEventListener("storage", K), x());
    }, { immediate: !0, flush: "sync" }), ve(() => {
      y = !0, N();
    });
    function Z(s) {
      return s >= 1e6 ? `${(s / 1e6).toFixed(1)}M ctx` : s >= 1e3 ? `${Math.round(s / 1e3)}k ctx` : `${s} ctx`;
    }
    const J = p(() => i.view === "rank" ? "Artificial Analysis 排行内置示例" : i.view === "price" ? "OpenRouter 定价内置示例" : "生图与多模态基准评测"), ee = p(() => i.view === "rank" ? "https://artificialanalysis.ai/leaderboards/models" : "https://openrouter.ai/models"), w = p(() => {
      let s = [...i.models];
      if (i.favoritesOnly && (s = s.filter((e) => e.isFavorite)), i.searchQuery.trim()) {
        const e = i.searchQuery.trim().toLowerCase();
        s = s.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e) || t.id.toLowerCase().includes(e)
        );
      }
      return i.sortMode === "cheap-in" ? s.sort((e, t) => e.inputPrice - t.inputPrice) : i.sortMode === "cheap-out" ? s.sort((e, t) => e.outputPrice - t.outputPrice) : i.sortMode === "free" ? s.sort((e, t) => e.inputPrice + e.outputPrice - (t.inputPrice + t.outputPrice)) : i.sortMode === "context" && s.sort((e, t) => t.contextLength - e.contextLength), s;
    }), C = p(() => Math.max(1, Math.ceil(w.value.length / v))), te = p(() => {
      const s = (i.currentPage - 1) * v;
      return w.value.slice(s, s + v);
    }), ie = p(() => {
      const s = w.value.slice(0, 30);
      if (s.length < 2) return "10,160 550,160";
      const e = 560, t = 180, c = 10, m = Math.max(...s.map((T) => T.outputPrice || 1), 1), le = (e - c * 2) / (s.length - 1);
      return s.map((T, ce) => {
        const de = T.outputPrice || 0.1, ue = (c + ce * le).toFixed(1), pe = (c + (1 - de / m) * (t - c * 2)).toFixed(1);
        return `${ue},${pe}`;
      }).join(" ");
    }), M = p(() => {
      let s = [...i.ranking];
      if (i.favoritesOnly && (s = s.filter((e) => e.isFavorite)), i.searchQuery.trim()) {
        const e = i.searchQuery.trim().toLowerCase();
        s = s.filter(
          (t) => t.name.toLowerCase().includes(e) || t.creator.toLowerCase().includes(e)
        );
      }
      return s.sort((e, t) => (t.score ?? 0) - (e.score ?? 0)), s;
    }), S = p(() => Math.max(1, Math.ceil(M.value.length / v))), ae = p(() => {
      const s = (i.currentPage - 1) * v;
      return M.value.slice(s, s + v);
    }), Q = p(() => M.value.slice(0, 8)), ne = p(() => {
      const s = Q.value.map((e) => e.score);
      return Math.max(...s, 100);
    });
    function I(s) {
      i.view = s, i.currentPage = 1, b.dispatch("switch-view", s);
    }
    function se(s) {
      b.selectImageModel(s);
    }
    function re() {
      i.currentPage = 1, b.dispatch("set-sort", i.sortMode);
    }
    function oe() {
      i.favoritesOnly = !i.favoritesOnly, i.currentPage = 1, b.dispatch("toggle-favorites-only", i.favoritesOnly);
    }
    function U(s) {
      b.toggleFavorite(s);
    }
    function G() {
      i.currentPage > 1 && (i.currentPage--, b.dispatch("set-page", i.currentPage));
    }
    function j(s) {
      i.currentPage < s && (i.currentPage++, b.dispatch("set-page", i.currentPage));
    }
    return (s, e) => (o(), l("div", {
      class: "vue-pricing-wrapper",
      inert: !n(h)
    }, [
      a("section", {
        id: "daily-pricing",
        class: f(["card wide", { "card-fullscreen": n(ye).activeId === "daily-pricing" }])
      }, [
        a("header", Ce, [
          e[11] || (e[11] = a("span", {
            class: "bar",
            style: { background: "linear-gradient(180deg,#fbbf24,#f59e0b)" }
          }, null, -1)),
          a("h2", Me, r(n(i).view === "rank" ? n(u)("pricing.view.rank") : n(i).view === "image-eval" ? n(u)("pricing.view.imageEval") : n(u)("pricing.view.price")), 1),
          a("div", Se, [
            a("button", {
              type: "button",
              "data-pricing-view": "price",
              role: "tab",
              class: f({ active: n(i).view === "price" }),
              "aria-selected": n(i).view === "price",
              onClick: e[0] || (e[0] = (t) => I("price"))
            }, r(n(u)("pricing.view.price")), 11, Ae),
            a("button", {
              type: "button",
              "data-pricing-view": "rank",
              role: "tab",
              class: f({ active: n(i).view === "rank" }),
              "aria-selected": n(i).view === "rank",
              onClick: e[1] || (e[1] = (t) => I("rank"))
            }, r(n(u)("pricing.view.rank")), 11, Fe),
            a("button", {
              type: "button",
              "data-pricing-view": "image-eval",
              role: "tab",
              class: f({ active: n(i).view === "image-eval" }),
              "aria-selected": n(i).view === "image-eval",
              onClick: e[2] || (e[2] = (t) => I("image-eval"))
            }, r(n(u)("pricing.view.imageTab")), 11, $e)
          ]),
          a("button", {
            id: "pricing-settings-open",
            ref_key: "settingsAnchor",
            ref: D,
            class: "icon-btn",
            type: "button",
            title: n(u)("pricing.settingsTitle"),
            "aria-expanded": k.value,
            onClick: e[3] || (e[3] = (t) => k.value = !k.value)
          }, "⚙️", 8, Le),
          a("button", {
            id: "pricing-refresh",
            class: "icon-btn",
            type: "button",
            title: n(u)("pricing.refreshDisabledTitle"),
            disabled: ""
          }, " ↻ ", 8, Oe)
        ]),
        _(a("div", Ie, [
          _(a("select", {
            id: "pricing-mode",
            class: "pricing-sort",
            "onUpdate:modelValue": e[4] || (e[4] = (t) => n(i).sortMode = t),
            onChange: re
          }, [
            a("option", Te, r(n(u)("pricing.sort.cheapIn")), 1),
            a("option", Re, r(n(u)("pricing.sort.cheapOut")), 1),
            a("option", Ee, r(n(u)("pricing.sort.free")), 1),
            a("option", Ve, r(n(u)("pricing.sort.context")), 1)
          ], 544), [
            [A, n(i).view === "price"],
            [fe, n(i).sortMode]
          ]),
          _(a("input", {
            id: "pricing-search",
            class: "pricing-search",
            type: "search",
            "onUpdate:modelValue": e[5] || (e[5] = (t) => n(i).searchQuery = t),
            placeholder: n(i).view === "rank" ? "搜索排行中的模型或厂商" : "搜索模型、厂商或 ID",
            autocomplete: "off"
          }, null, 8, De), [
            [R, n(i).searchQuery]
          ]),
          a("button", {
            id: "pricing-favorites-filter",
            class: f(["pricing-favorites-filter", { active: n(i).favoritesOnly }]),
            type: "button",
            "aria-pressed": n(i).favoritesOnly,
            title: "切换全部模型或只看关注",
            onClick: oe
          }, [
            g(r(n(i).favoritesOnly ? "♥ 只看关注" : "♡ 我的关注") + " ", 1),
            a("b", null, r(n(i).favoritesCount), 1)
          ], 10, Be),
          a("span", Ke, r(J.value), 1),
          n(i).hasOpenRouterKey && n(i).view === "price" ? (o(), l("span", Ne, "🔑 已配置")) : d("", !0),
          n(i).hasAaApiKey && n(i).view === "rank" ? (o(), l("span", Qe, "🔑 已配置")) : d("", !0),
          e[12] || (e[12] = a("span", { class: "grow" }, null, -1)),
          a("a", {
            id: "pricing-source-link",
            class: "small",
            href: ee.value,
            target: "_blank",
            rel: "noreferrer"
          }, " 查看来源 ", 8, Ue)
        ], 512), [
          [A, n(i).view !== "image-eval"]
        ]),
        a("p", Ge, "当前价格、排行与评分均为内置数据，未实时拉取；关注只保留在本页内存。" + r(O.value), 1),
        n(i).view === "rank" ? (o(), l("div", je, [...e[13] || (e[13] = [
          a("b", null, "💡 智能指数说明：", -1),
          a("span", null, "Artificial Analysis 权威实测综合加权分（含数学、编程、综合推理等真实盲测指标），分数越高代表模型综合能力越强。", -1)
        ])])) : d("", !0),
        n(i).view === "image-eval" ? (o(), l("div", qe, [
          he(n(X), {
            "selected-model-id": n(i).selectedImageModelId,
            onSelectModel: se
          }, null, 8, ["selected-model-id"])
        ])) : d("", !0),
        _(a("div", ze, [
          a("div", He, [
            a("ol", We, [
              w.value.length === 0 ? (o(), l("li", Xe, r(n(i).favoritesOnly ? "暂无已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的模型。"), 1)) : d("", !0),
              (o(!0), l(F, null, $(te.value, (t, c) => (o(), l("li", {
                key: t.id,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                a("span", {
                  class: f(["pricing-rank-no", { top: (n(i).currentPage - 1) * v + c < 3 }])
                }, r((n(i).currentPage - 1) * v + c + 1), 3),
                a("span", Ye, [
                  a("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://openrouter.ai/models/" + t.id,
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, Ze),
                  t.creator ? (o(), l("span", Je, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0)
                ]),
                a("span", et, [
                  a("span", tt, " 入: $" + r(t.inputPrice), 1),
                  a("span", it, " 出: $" + r(t.outputPrice), 1),
                  t.contextLength ? (o(), l("span", at, r(Z(t.contextLength)), 1)) : d("", !0)
                ]),
                t.score ? (o(), l("b", nt, " 智能 " + r(t.score.toFixed(1)), 1)) : d("", !0),
                a("button", {
                  type: "button",
                  class: f(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (m) => U(t.id)
                }, r(t.isFavorite ? "♥" : "♡"), 11, st)
              ]))), 128))
            ]),
            a("nav", rt, [
              a("button", {
                id: "pricing-page-prev",
                type: "button",
                disabled: n(i).currentPage <= 1,
                onClick: G
              }, " ‹ 上一页 ", 8, ot),
              a("span", null, [
                e[14] || (e[14] = g(" 第 ", -1)),
                _(a("input", {
                  id: "pricing-page-input",
                  type: "number",
                  min: "1",
                  max: C.value,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => n(i).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, lt), [
                  [
                    R,
                    n(i).currentPage,
                    void 0,
                    { number: !0 }
                  ]
                ]),
                e[15] || (e[15] = g(" / ", -1)),
                a("b", ct, r(C.value), 1),
                e[16] || (e[16] = g(" 页 ", -1))
              ]),
              a("button", {
                id: "pricing-page-next",
                type: "button",
                disabled: n(i).currentPage >= C.value,
                onClick: e[7] || (e[7] = (t) => j(C.value))
              }, " 下一页 › ", 8, dt)
            ])
          ]),
          a("div", ut, [
            (o(), l("svg", pt, [
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
                points: ie.value,
                fill: "none",
                stroke: "#fbbf24",
                "stroke-width": "2",
                class: "pricing-line-rank"
              }, null, 8, gt)
            ])),
            a("div", vt, [
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
              a("span", ft, "Top " + r(w.value.length) + " · 价格走势", 1)
            ])
          ])
        ], 512), [
          [A, n(i).view === "price"]
        ]),
        _(a("div", ht, [
          a("div", mt, [
            a("ol", _t, [
              M.value.length === 0 ? (o(), l("li", bt, r(n(i).favoritesOnly ? "排行中没有已关注模型，切回全部后可点♡收藏。" : "没有找到匹配的排行模型。"), 1)) : d("", !0),
              (o(!0), l(F, null, $(ae.value, (t, c) => (o(), l("li", {
                key: t.name,
                class: "pricing-rank-item aa-rank-detail"
              }, [
                a("span", {
                  class: f(["pricing-rank-no", { top: (n(i).currentPage - 1) * v + c < 3 }])
                }, r((n(i).currentPage - 1) * v + c + 1), 3),
                a("span", kt, [
                  a("a", {
                    class: "pricing-rank-model",
                    href: t.url || "https://artificialanalysis.ai",
                    target: "_blank",
                    rel: "noreferrer",
                    title: t.name
                  }, r(t.name), 9, yt),
                  t.creator ? (o(), l("span", wt, r(t.creator) + " " + r(t.releaseDate ? "· " + t.releaseDate : ""), 1)) : d("", !0),
                  t.metrics && t.metrics.length ? (o(), l("span", Pt, [
                    (o(!0), l(F, null, $(t.metrics, (m) => (o(), l("span", {
                      class: "aa-rank-metric",
                      key: m.label
                    }, [
                      g(r(m.label) + " ", 1),
                      a("b", null, r(m.value), 1)
                    ]))), 128))
                  ])) : d("", !0)
                ]),
                a("b", xt, " 智能 " + r(t.score.toFixed(1)), 1),
                a("button", {
                  type: "button",
                  class: f(["pricing-fav-btn", { on: t.isFavorite }]),
                  title: t.isFavorite ? "取消关注" : "加入关注",
                  onClick: (m) => U(t.name)
                }, r(t.isFavorite ? "♥" : "♡"), 11, Ct)
              ]))), 128))
            ]),
            a("nav", Mt, [
              a("button", {
                type: "button",
                disabled: n(i).currentPage <= 1,
                onClick: G
              }, " ‹ 上一页 ", 8, St),
              a("span", null, [
                e[21] || (e[21] = g(" 第 ", -1)),
                _(a("input", {
                  type: "number",
                  min: "1",
                  max: S.value,
                  "onUpdate:modelValue": e[8] || (e[8] = (t) => n(i).currentPage = t),
                  "aria-label": "当前页码"
                }, null, 8, At), [
                  [
                    R,
                    n(i).currentPage,
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
                disabled: n(i).currentPage >= S.value,
                onClick: e[9] || (e[9] = (t) => j(S.value))
              }, " 下一页 › ", 8, Ft)
            ])
          ]),
          a("div", $t, [
            e[24] || (e[24] = a("div", { class: "aa-chart-header" }, [
              a("span", { class: "aa-chart-title" }, "前沿大模型智能指数对比"),
              a("span", { class: "muted small" }, "Artificial Analysis 权威盲测综合分")
            ], -1)),
            a("div", Lt, [
              (o(!0), l(F, null, $(Q.value, (t, c) => (o(), l("div", {
                key: t.name,
                class: "aa-bar-row"
              }, [
                a("span", {
                  class: "aa-bar-model-name",
                  title: t.name
                }, r(t.name), 9, Ot),
                a("div", It, [
                  a("div", {
                    class: "aa-bar-fill",
                    style: _e({
                      width: `${Math.min(100, Math.max(10, t.score / ne.value * 100))}%`,
                      background: E[c % E.length]
                    })
                  }, [
                    a("span", Tt, r(t.score.toFixed(1)), 1)
                  ], 4)
                ])
              ]))), 128))
            ])
          ])
        ], 512), [
          [A, n(i).view === "rank"]
        ])
      ], 2),
      V.value ? (o(), me(n(W), {
        key: 0,
        visible: n(h) && k.value,
        anchor: D.value,
        onClose: e[10] || (e[10] = (t) => k.value = !1),
        onSaved: Y
      }, null, 8, ["visible", "anchor"])) : d("", !0)
    ], 8, xe));
  }
}), Qt = /* @__PURE__ */ Pe(Rt, [["__scopeId", "data-v-f710c38b"]]);
export {
  Qt as default
};
