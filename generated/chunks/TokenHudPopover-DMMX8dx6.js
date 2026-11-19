import { f as r, a as E } from "./MulticaDialog-UuyW6LJm.js";
import { d as I, o as K, H as W, f as n, l as V, h as t, t as s, g as a, j as h, n as m, u as d, m as y, F as v, s as k, i as x, T as j, b as T, x as f } from "./vendor-vue-BbmU9NUg.js";
import { _ as z } from "./_plugin-vue_export-helper-CP_tFnee.js";
const A = { class: "hud-top" }, U = { class: "hud-title-col" }, q = ["title"], G = { class: "hud-actions" }, J = { class: "hud-hero" }, Q = { class: "hud-hero-line" }, X = { class: "hud-hero-sub" }, Y = {
  key: 0,
  class: "hud-hero-quota"
}, Z = {
  class: "hud-bar",
  "aria-hidden": "true"
}, _ = {
  class: "hud-tabs",
  role: "tablist"
}, tt = ["aria-selected"], et = ["aria-selected"], st = ["aria-selected"], ot = ["aria-selected"], lt = { class: "hud-body" }, nt = { class: "kpi-grid" }, at = { class: "kpi-card" }, it = { class: "kpi-sub" }, rt = { class: "kpi-card" }, dt = { class: "kpi-v" }, ct = { class: "kpi-sub" }, ut = { class: "kpi-card" }, mt = { class: "kpi-v" }, ht = { class: "kpi-sub" }, vt = { class: "kpi-card" }, yt = { class: "kpi-v" }, kt = { class: "kpi-sub" }, pt = { class: "seg-rows" }, bt = { class: "seg-label" }, gt = { class: "seg-val" }, ft = { class: "seg-footer" }, xt = { class: "latest-grid" }, wt = {
  key: 0,
  class: "hud-empty"
}, Ct = {
  key: 1,
  class: "turns-list"
}, Tt = { class: "turn-top" }, Mt = { class: "turn-idx" }, $t = { class: "turn-model" }, Rt = { class: "turn-ctx" }, Ft = {
  key: 0,
  class: "turn-prompt"
}, Pt = { class: "turn-meta" }, Lt = { key: 0 }, Ht = { key: 1 }, Ot = { key: 2 }, Bt = { key: 3 }, Dt = {
  key: 0,
  class: "hud-empty"
}, St = {
  key: 1,
  class: "tool-list"
}, Nt = { class: "tool-info" }, Et = { class: "tool-bar" }, It = {
  key: 0,
  class: "hud-empty"
}, Kt = {
  key: 1,
  class: "turns-list"
}, Wt = { class: "turn-top" }, Vt = {
  class: "turn-model",
  style: { color: "var(--text, #26334b)", "font-weight": "600" }
}, jt = { class: "turn-ctx" }, zt = { class: "turn-meta" }, At = {
  key: 0,
  style: { color: "#257de0", "font-weight": "600" }
}, Ut = /* @__PURE__ */ I({
  __name: "TokenHudPopover",
  props: {
    telemetry: {},
    canCompact: { type: Boolean },
    service: {},
    piModels: {},
    deepseekModels: {},
    anchorRect: {},
    align: {}
  },
  emits: ["close", "compact", "refresh"],
  setup(l, { emit: O }) {
    const c = l, b = O, u = T("breakdown"), w = T(!1), M = T(null), B = f(() => {
      if (typeof window > "u" || !c.anchorRect) return {};
      const i = window.innerWidth, e = window.innerHeight, o = Math.min(436, i - 24), g = c.align === "right" ? c.anchorRect.right - o : c.anchorRect.left, L = Math.max(12, Math.min(g, i - o - 12)), C = Math.max(180, c.anchorRect.top - 16), H = Math.max(180, e - c.anchorRect.bottom - 16);
      return C >= 320 || C >= H ? {
        position: "fixed",
        left: `${Math.round(L)}px`,
        bottom: `${Math.round(e - c.anchorRect.top + 8)}px`,
        top: "auto",
        right: "auto",
        width: `${Math.round(o)}px`,
        maxHeight: `${Math.min(640, Math.round(C))}px`
      } : {
        position: "fixed",
        left: `${Math.round(L)}px`,
        top: `${Math.round(c.anchorRect.bottom + 8)}px`,
        bottom: "auto",
        right: "auto",
        width: `${Math.round(o)}px`,
        maxHeight: `${Math.min(640, Math.round(H))}px`
      };
    }), p = (i) => Math.max(0, Math.min(100, i / (c.telemetry.maxContext || 1) * 100)), D = f(() => {
      const i = c.telemetry, e = [
        { id: "fresh", color: "#3b82f6", label: "新输入上下文", val: i.freshInput },
        { id: "cache", color: "#10b981", label: "缓存读取复用", val: i.cacheRead }
      ];
      return i.cacheWrite > 0 && e.push({ id: "cwrite", color: "#8b5cf6", label: "提示词缓存写入", val: i.cacheWrite }), e.push(
        { id: "out", color: "#f59e0b", label: "回复与思考输出", val: i.lastOutput + i.lastThinking },
        { id: "draft", color: "#ec4899", label: `当前输入草稿 (${i.draftChars} 字)`, val: i.draftTokens },
        { id: "rem", color: i.ringColor, label: "剩余可用容量", val: i.remainingTokens }
      ), e;
    }), $ = f(() => {
      if (c.service === "deepseek") {
        const e = c.telemetry.modelName;
        return (c.deepseekModels?.length ? c.deepseekModels : [e]).map((g) => ({
          id: g,
          title: g,
          provider: "DeepSeek API",
          context: "128K",
          maxOut: "8K / 64K",
          active: g === e
        }));
      }
      const i = c.telemetry.modelName.toLowerCase();
      return (c.piModels || []).map((e) => ({
        id: e.id,
        title: e.model,
        provider: e.provider,
        context: e.context || "默认",
        maxOut: e.maxOut || "—",
        active: e.id.toLowerCase() === i || e.model.toLowerCase() === i
      }));
    }), S = f(() => Math.max(1, ...c.telemetry.toolLeaderboard.map((i) => i.count))), R = f(() => c.telemetry.turns.slice().reverse());
    async function N() {
      try {
        await navigator.clipboard.writeText(E(c.telemetry)), w.value = !0, setTimeout(() => {
          w.value = !1;
        }, 1500);
      } catch {
      }
    }
    function F(i) {
      const e = i.target;
      e && (M.value?.contains(e) || e.closest('[data-hud-trigger="1"]') || b("close"));
    }
    function P(i) {
      i.key === "Escape" && (i.stopPropagation(), b("close"));
    }
    return K(() => {
      document.addEventListener("pointerdown", F), document.addEventListener("keydown", P);
    }), W(() => {
      document.removeEventListener("pointerdown", F), document.removeEventListener("keydown", P);
    }), (i, e) => (n(), V(j, { to: "body" }, [
      t("section", {
        ref_key: "popRef",
        ref: M,
        class: "hud-popover",
        style: m(B.value),
        role: "dialog",
        "aria-label": "上下文窗口与 Token 监控"
      }, [
        t("header", A, [
          t("div", U, [
            e[7] || (e[7] = t("span", { class: "hud-title" }, "上下文窗口与 Token 监控", -1)),
            t("span", {
              class: "hud-model-badge",
              title: l.telemetry.modelName
            }, s(l.telemetry.modelName), 9, q)
          ]),
          t("div", G, [
            l.canCompact ? (n(), a("button", {
              key: 0,
              type: "button",
              class: "hud-btn",
              title: "填入 /compact 压缩上下文",
              onClick: e[0] || (e[0] = (o) => b("compact"))
            }, "/compact")) : h("", !0),
            t("button", {
              type: "button",
              class: "hud-btn",
              onClick: N
            }, s(w.value ? "已复制" : "复制报告"), 1),
            t("button", {
              type: "button",
              class: "hud-btn is-icon",
              title: "刷新状态与统计",
              "aria-label": "刷新状态与统计",
              onClick: e[1] || (e[1] = (o) => b("refresh"))
            }, [...e[8] || (e[8] = [
              t("svg", {
                viewBox: "0 0 16 16",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.45",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "aria-hidden": "true"
              }, [
                t("path", { d: "M13.5 8a5.5 5.5 0 1 1-1.35-3.6" }),
                t("path", { d: "M13.5 2.7v2.4h-2.4" })
              ], -1)
            ])]),
            t("button", {
              type: "button",
              class: "hud-btn is-close",
              "aria-label": "关闭监控",
              onClick: e[2] || (e[2] = (o) => b("close"))
            }, "×")
          ])
        ]),
        t("div", J, [
          t("div", Q, [
            t("span", {
              class: "hud-rem-main",
              style: m({ color: l.telemetry.ringColor })
            }, " 剩余可用 " + s(d(r)(l.telemetry.remainingTokens)) + " / " + s(d(r)(l.telemetry.maxContext)) + " (" + s(l.telemetry.remainingPct.toFixed(1)) + "%) ", 5)
          ]),
          t("div", X, [
            t("span", null, [
              y("已用 " + s(d(r)(l.telemetry.usedTokens)) + " (" + s(l.telemetry.usedPct.toFixed(1)) + "%)", 1),
              l.telemetry.draftTokens > 0 ? (n(), a(v, { key: 0 }, [
                y(" · 草稿 +" + s(d(r)(l.telemetry.draftTokens)), 1)
              ], 64)) : h("", !0)
            ]),
            l.telemetry.hasTelemetry ? (n(), a("span", Y, "缓存命中 " + s(l.telemetry.cacheHitPct.toFixed(1)) + "%", 1)) : h("", !0)
          ]),
          t("div", Z, [
            t("span", {
              class: "seg-fresh",
              style: m({ width: `${p(l.telemetry.freshInput).toFixed(2)}%` })
            }, null, 4),
            t("span", {
              class: "seg-cwrite",
              style: m({ width: `${p(l.telemetry.cacheWrite).toFixed(2)}%` })
            }, null, 4),
            t("span", {
              class: "seg-cache",
              style: m({ width: `${p(l.telemetry.cacheRead).toFixed(2)}%` })
            }, null, 4),
            t("span", {
              class: "seg-out",
              style: m({ width: `${p(l.telemetry.lastOutput + l.telemetry.lastThinking).toFixed(2)}%` })
            }, null, 4),
            t("span", {
              class: "seg-draft",
              style: m({ width: `${p(l.telemetry.draftTokens).toFixed(2)}%` })
            }, null, 4)
          ])
        ]),
        t("div", _, [
          t("button", {
            type: "button",
            role: "tab",
            "aria-selected": u.value === "breakdown",
            class: k({ active: u.value === "breakdown" }),
            onClick: e[3] || (e[3] = (o) => u.value = "breakdown")
          }, "上下文拆分", 10, tt),
          t("button", {
            type: "button",
            role: "tab",
            "aria-selected": u.value === "turns",
            class: k({ active: u.value === "turns" }),
            onClick: e[4] || (e[4] = (o) => u.value = "turns")
          }, "对话轮次 (" + s(l.telemetry.turnCount) + ")", 11, et),
          t("button", {
            type: "button",
            role: "tab",
            "aria-selected": u.value === "tools",
            class: k({ active: u.value === "tools" }),
            onClick: e[5] || (e[5] = (o) => u.value = "tools")
          }, "工具/代理 (" + s(l.telemetry.totalToolCalls) + ")", 11, st),
          t("button", {
            type: "button",
            role: "tab",
            "aria-selected": u.value === "models",
            class: k({ active: u.value === "models" }),
            onClick: e[6] || (e[6] = (o) => u.value = "models")
          }, "模型窗口", 10, ot)
        ]),
        t("div", lt, [
          u.value === "breakdown" ? (n(), a(v, { key: 0 }, [
            t("div", nt, [
              t("div", at, [
                e[9] || (e[9] = t("span", { class: "kpi-k" }, "剩余可用容量", -1)),
                t("span", {
                  class: "kpi-v",
                  style: m({ color: l.telemetry.ringColor })
                }, [
                  y(s(d(r)(l.telemetry.remainingTokens)) + " ", 1),
                  t("small", null, "(" + s(l.telemetry.remainingPct.toFixed(1)) + "%)", 1)
                ], 4),
                t("span", it, "已用 " + s(d(r)(l.telemetry.usedTokens)) + " / " + s(d(r)(l.telemetry.maxContext)), 1)
              ]),
              t("div", rt, [
                e[10] || (e[10] = t("span", { class: "kpi-k" }, "缓存命中率", -1)),
                t("span", dt, s(l.telemetry.cacheHitPct.toFixed(1)) + "%", 1),
                t("span", ct, "读 " + s(d(r)(l.telemetry.cacheRead)) + " · 新 " + s(d(r)(l.telemetry.freshInput)), 1)
              ]),
              t("div", ut, [
                e[11] || (e[11] = t("span", { class: "kpi-k" }, "生成吞吐速度", -1)),
                t("span", mt, s(l.telemetry.lastSpeed ? `${l.telemetry.lastSpeed} tok/s` : "—"), 1),
                t("span", ht, "均值 " + s(l.telemetry.avgSpeed ? `${l.telemetry.avgSpeed} tok/s` : "—") + " · " + s(l.telemetry.avgDurationMs ? `${(l.telemetry.avgDurationMs / 1e3).toFixed(2)}s` : "—"), 1)
              ]),
              t("div", vt, [
                e[12] || (e[12] = t("span", { class: "kpi-k" }, "会话累计消耗", -1)),
                t("span", yt, s(d(r)(l.telemetry.totalTokens)), 1),
                t("span", kt, s(l.telemetry.turnCount) + " 轮 · " + s(l.telemetry.totalToolCalls) + " 次调用 · 输出 " + s(d(r)(l.telemetry.totalOutput)), 1)
              ])
            ]),
            e[20] || (e[20] = t("div", { class: "sec-title" }, "上下文窗口构成明细", -1)),
            t("div", pt, [
              (n(!0), a(v, null, x(D.value, (o) => (n(), a("div", {
                key: o.id,
                class: k(["seg-row", { highlight: o.id === "rem" }])
              }, [
                t("span", bt, [
                  t("i", {
                    style: m({ background: o.color })
                  }, null, 4),
                  y(s(o.label), 1)
                ]),
                t("span", gt, [
                  y(s(d(r)(o.val)) + " ", 1),
                  t("small", null, "(" + s(p(o.val).toFixed(1)) + "%)", 1)
                ])
              ], 2))), 128))
            ]),
            t("div", ft, [
              t("span", null, [
                e[13] || (e[13] = y("已用占比：", -1)),
                t("strong", null, s(l.telemetry.usedPct.toFixed(1)) + "%", 1)
              ]),
              t("span", null, [
                e[14] || (e[14] = y("工具调用：", -1)),
                t("strong", null, s(l.telemetry.totalToolCalls), 1)
              ]),
              t("span", null, [
                e[15] || (e[15] = y("窗口上限：", -1)),
                t("strong", null, s(d(r)(l.telemetry.maxContext)), 1)
              ])
            ]),
            e[21] || (e[21] = t("div", { class: "sec-title" }, "最近一次调用指标", -1)),
            t("div", xt, [
              t("div", null, [
                e[16] || (e[16] = t("span", null, "新输入", -1)),
                t("strong", null, s(d(r)(l.telemetry.freshInput)), 1)
              ]),
              t("div", null, [
                e[17] || (e[17] = t("span", null, "缓存读取", -1)),
                t("strong", null, s(d(r)(l.telemetry.cacheRead)), 1)
              ]),
              t("div", null, [
                e[18] || (e[18] = t("span", null, "回复输出", -1)),
                t("strong", null, s(d(r)(l.telemetry.lastOutput)), 1)
              ]),
              t("div", null, [
                e[19] || (e[19] = t("span", null, "思考 Token", -1)),
                t("strong", null, s(d(r)(l.telemetry.lastThinking)), 1)
              ])
            ])
          ], 64)) : u.value === "turns" ? (n(), a(v, { key: 1 }, [
            R.value.length ? (n(), a("div", Ct, [
              (n(!0), a(v, null, x(R.value, (o) => (n(), a("div", {
                key: o.turn,
                class: "turn-card"
              }, [
                t("div", Tt, [
                  t("span", Mt, "#T" + s(o.turn), 1),
                  t("span", $t, s(o.model), 1),
                  t("span", Rt, "Ctx " + s(d(r)(o.ctxUsed)), 1),
                  t("span", {
                    class: k(["turn-delta", { high: o.ctxDelta >= 15e3 }])
                  }, s(o.ctxDelta >= 0 ? "+" : "") + s(d(r)(o.ctxDelta)), 3)
                ]),
                o.userPreview ? (n(), a("div", Ft, s(o.userPreview), 1)) : h("", !0),
                t("div", Pt, [
                  t("span", null, "输出 " + s(d(r)(o.output)), 1),
                  o.thinking ? (n(), a("span", Lt, "思考 " + s(d(r)(o.thinking)), 1)) : h("", !0),
                  o.toolCalls ? (n(), a("span", Ht, "🔧 ×" + s(o.toolCalls), 1)) : h("", !0),
                  o.speed ? (n(), a("span", Ot, "⚡ " + s(o.speed) + " tok/s", 1)) : h("", !0),
                  o.cacheHitPct ? (n(), a("span", Bt, "缓存 " + s(o.cacheHitPct) + "%", 1)) : h("", !0)
                ])
              ]))), 128))
            ])) : (n(), a("div", wt, "当前会话还没有轮次记录。"))
          ], 64)) : u.value === "tools" ? (n(), a(v, { key: 2 }, [
            l.telemetry.toolLeaderboard.length ? (n(), a("div", St, [
              (n(!0), a(v, null, x(l.telemetry.toolLeaderboard, (o) => (n(), a("div", {
                key: o.name,
                class: "tool-row"
              }, [
                t("div", Nt, [
                  t("span", null, s(o.name), 1),
                  t("strong", null, "×" + s(o.count), 1)
                ]),
                t("div", Et, [
                  t("span", {
                    style: m({ width: `${Math.round(o.count / S.value * 100)}%` })
                  }, null, 4)
                ])
              ]))), 128))
            ])) : (n(), a("div", Dt, "当前会话暂未记录本机工具调用。"))
          ], 64)) : (n(), a(v, { key: 3 }, [
            $.value.length ? (n(), a("div", Kt, [
              (n(!0), a(v, null, x($.value, (o) => (n(), a("div", {
                key: o.id,
                class: k(["turn-card", { activeModel: o.active }])
              }, [
                t("div", Wt, [
                  t("span", Vt, s(o.title), 1),
                  t("span", jt, "窗口 " + s(o.context), 1)
                ]),
                t("div", zt, [
                  t("span", null, s(o.provider), 1),
                  t("span", null, "最大输出 " + s(o.maxOut), 1),
                  o.active ? (n(), a("span", At, "当前使用")) : h("", !0)
                ])
              ], 2))), 128))
            ])) : (n(), a("div", It, "暂无更多模型窗口元数据，当前上限 " + s(d(r)(l.telemetry.maxContext)) + "。", 1))
          ], 64))
        ])
      ], 4)
    ]));
  }
}), Qt = /* @__PURE__ */ z(Ut, [["__scopeId", "data-v-f5786ee3"]]);
export {
  Qt as default
};
