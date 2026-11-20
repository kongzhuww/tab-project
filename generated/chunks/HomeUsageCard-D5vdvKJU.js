import { f as M } from "./MulticaDialog-BxbA00dk.js";
import { d as ae, o as le, H as ie, f as c, g as u, h as t, t as h, u as H, s as B, F as y, i as $, m as Y, n as V, j as re, b as O, x as Z } from "./vendor-vue-BbmU9NUg.js";
import { _ as ce } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const q = 26, N = [
  { tokens: 7607, zh: "《道德经》" },
  { tokens: 27557, zh: "《变形记》" },
  { tokens: 37248, zh: "《爱丽丝漫游奇境》" },
  { tokens: 51004, zh: "《绿野仙踪》" },
  { tokens: 65763, zh: "《了不起的盖茨比》" },
  { tokens: 73931, zh: "《安徒生童话》" },
  { tokens: 97886, zh: "《弗兰肯斯坦》" },
  { tokens: 115e3, zh: "《活着》" },
  { tokens: 136278, zh: "《一九八四》" },
  { tokens: 152659, zh: "《瓦尔登湖》" },
  { tokens: 171701, zh: "《傲慢与偏见》" },
  { tokens: 202e3, zh: "《三体》" },
  { tokens: 256179, zh: "《简·爱》" },
  { tokens: 285009, zh: "《罪与罚》" },
  { tokens: 336e3, zh: "《三体Ⅲ·死神永生》" },
  { tokens: 481659, zh: "《安娜·卡列尼娜》" },
  { tokens: 625e3, zh: "《魔戒》" },
  { tokens: 638009, zh: "《三国演义》" },
  { tokens: 783200, zh: "《西游记》" },
  { tokens: 903956, zh: "《红楼梦》" },
  { tokens: 958242, zh: "《水浒传》" },
  { tokens: 1409e3, zh: "《哈利·波特》全集" }
], G = [
  "#b4403e",
  "#6e737b",
  "#8a6d1b",
  "#c95d24",
  "#2b6b64",
  "#4d6bfe",
  "#7c3aed",
  "#14b8a6"
];
function J(r) {
  return r < 10 ? `0${r}` : String(r);
}
function P(r) {
  const l = new Date(r);
  return `${l.getFullYear()}-${J(l.getMonth() + 1)}-${J(l.getDate())}`;
}
function ue(r) {
  const [, l, v] = r.split("-");
  return !l || !v ? r : `${Number(l)}月${Number(v)}日`;
}
function de(r) {
  const l = (Math.floor(r) % 24 + 24) % 24, v = l % 12 === 0 ? 12 : l % 12;
  return `${l < 12 ? "上午" : "下午"} ${v} 点`;
}
function he(r) {
  if (r <= 0) return "发送第一条消息，开始记录工作区 Token 用量轨迹。";
  let l = null;
  for (let k = N.length - 1; k >= 0; k--)
    if (r >= N[k].tokens) {
      l = N[k];
      break;
    }
  return l || (l = N[0]), `你的 Token 用量相当于 ${Math.max(1, Math.round(r / l.tokens)).toLocaleString("en-US")} 本${l.zh}。`;
}
function ve(r) {
  const l = r.nowMs ?? Date.now(), v = r.range === "7d" ? l - 7 * 864e5 : r.range === "30d" ? l - 30 * 864e5 : 0, D = /* @__PURE__ */ new Set(), k = /* @__PURE__ */ new Set(), z = new Array(24).fill(0), p = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map();
  let L = 0, C = 0;
  const f = (e, o, n, _, i, m) => {
    if (v > 0 && o < v) return;
    L++, C += m, D.add(e);
    const g = P(o);
    k.add(g), z[new Date(o).getHours()] += 1;
    const b = p.get(g) || { tokens: 0, messages: 0 };
    b.tokens += m, b.messages += 1, p.set(g, b);
    const S = n || "未标注模型";
    let T = E.get(S);
    T || (T = { inputTokens: 0, outputTokens: 0, tokens: 0, messages: 0, sessions: /* @__PURE__ */ new Set() }, E.set(S, T)), T.inputTokens += _, T.outputTokens += i, T.tokens += m, T.messages += 1, T.sessions.add(e);
    let A = d.get(g);
    A || (A = /* @__PURE__ */ new Map(), d.set(g, A)), A.set(S, (A.get(S) || 0) + m);
  };
  for (const e of r.nativeConversations || []) {
    const o = e.model || e.agentId || "本机 Agent";
    for (const n of e.messages || []) {
      const _ = n.createdAt || e.updatedAt || l, i = n.usage, m = i ? Number((i.input || 0) + (i.cacheRead || 0)) : n.role === "user" ? Math.max(0, Math.round((n.content?.length || 0) / 3)) : 0, g = i ? Number((i.output || 0) + (i.reasoning || 0)) : n.role === "assistant" ? Math.max(0, Math.round((n.content?.length || 0) / 3)) : 0, b = i ? Number(i.totalTokens || m + g) : m + g, S = n.modelLabel || o;
      f(`n:${e.id}`, _, S, m, g, b);
    }
  }
  for (const e of r.localConversations || []) {
    const o = e.model || "DeepSeek";
    for (const n of e.messages || []) {
      if (n.incomplete) continue;
      const _ = n.createdAt || e.updatedAt || l, i = Math.max(0, Math.round(((n.content?.length || 0) + (n.reasoning?.length || 0)) / 3)), m = n.role === "user" ? i : 0, g = n.role === "assistant" ? i : 0;
      f(`d:${e.id}`, _, o, m, g, i);
    }
  }
  let a = -1, s = 0;
  for (let e = 0; e < 24; e++)
    z[e] > s && (s = z[e], a = e);
  const w = Math.max(
    1,
    ...Array.from(p.values()).map((e) => e.tokens > 0 ? e.tokens : e.messages * 500)
  ), x = new Date(l);
  x.setHours(0, 0, 0, 0);
  const Q = P(x.getTime()), X = x.getDay(), U = new Date(x);
  U.setDate(x.getDate() - X - (q - 1) * 7);
  const W = [];
  for (let e = 0; e < q * 7; e++) {
    const o = new Date(U);
    o.setDate(U.getDate() + e);
    const n = P(o.getTime()), _ = n > Q, i = p.get(n), m = i ? i.tokens > 0 ? i.tokens : i.messages * 500 : 0;
    let g = 0;
    if (!_ && m > 0) {
      const b = m / w * 100;
      b <= 8 ? g = 1 : b <= 28 ? g = 2 : b <= 52 ? g = 3 : b <= 76 ? g = 4 : g = 5;
    }
    W.push({
      date: n,
      tokens: i?.tokens || 0,
      messages: i?.messages || 0,
      level: g,
      future: _
    });
  }
  const ee = Array.from(E.entries()).map(([e, o]) => ({
    name: e,
    inputTokens: o.inputTokens,
    outputTokens: o.outputTokens,
    tokens: o.tokens,
    messages: o.messages,
    sessions: o.sessions.size
  })).sort((e, o) => o.tokens - e.tokens || o.messages - e.messages || e.name.localeCompare(o.name)), te = /* @__PURE__ */ new Map(), se = Math.max(1, C), K = ee.slice(0, 6).map((e, o) => {
    const n = G[o % G.length];
    return te.set(e.name, n), {
      ...e,
      sharePct: Math.round(e.tokens / se * 1e3) / 10,
      color: n
    };
  }), I = Array.from(p.keys()).sort();
  let R = 4;
  if (I.length > 0) {
    const e = (/* @__PURE__ */ new Date(`${I[0]}T00:00:00`)).getTime(), o = Math.ceil((x.getTime() - e) / 864e5) + 1;
    R = Math.max(4, Math.min(r.range === "7d" ? 7 : 14, o));
  }
  const F = [];
  for (let e = R - 1; e >= 0; e--) {
    const o = new Date(x);
    o.setDate(x.getDate() - e), F.push(P(o.getTime()));
  }
  const oe = F.map((e) => p.get(e)?.tokens || 0), j = Math.max(1, ...oe), ne = F.map((e) => {
    const o = d.get(e), n = p.get(e)?.tokens || 0, _ = [];
    if (o)
      for (const i of K) {
        const m = o.get(i.name) || 0;
        m > 0 && _.push({
          model: i.name,
          color: i.color,
          heightPct: n > 0 ? m / n * 100 : 0,
          tokens: m
        });
      }
    return {
      date: e,
      label: ue(e),
      totalTokens: n,
      totalHeightPct: n > 0 ? Math.max(3, n / j * 100) : 0,
      segments: _
    };
  });
  return {
    sessions: D.size,
    messages: L,
    totalTokens: C,
    activeDays: k.size,
    peakHourLabel: a >= 0 ? de(a) : "—",
    topModel: K[0]?.name || "—",
    funBook: he(C),
    heatmapCells: W,
    models: K,
    chartColumns: ne,
    chartMaxTokens: j
  };
}
const ge = ["aria-expanded"], me = {
  key: 0,
  class: "home-usage-card",
  "aria-label": "工作区用量概览"
}, ke = { class: "usage-head" }, pe = {
  class: "usage-tabs",
  role: "tablist"
}, fe = ["aria-selected"], _e = ["aria-selected"], ye = {
  class: "usage-ranges",
  role: "group",
  "aria-label": "统计范围"
}, be = ["onClick"], Me = { class: "usage-stats-grid" }, we = { class: "usage-tile" }, xe = { class: "tile-val" }, Te = { class: "usage-tile" }, De = { class: "tile-val" }, ze = { class: "usage-tile" }, Ce = { class: "tile-val" }, $e = { class: "usage-tile" }, Se = { class: "tile-val" }, He = { class: "usage-tile" }, Ee = { class: "tile-val" }, Le = { class: "usage-tile model-tile" }, Ae = ["title"], Be = {
  class: "heatmap-grid",
  role: "img",
  "aria-label": "近半年活跃热力图"
}, Oe = ["data-level", "onMouseenter"], Ne = { class: "heatmap-footer" }, Pe = { class: "fun-book" }, Ue = {
  key: 0,
  class: "models-empty"
}, Ke = {
  key: 1,
  class: "models-panel"
}, Fe = { class: "chart-area" }, Ve = { class: "y-axis" }, We = { class: "chart-plot" }, Ie = { class: "chart-bars" }, Re = ["title"], je = { class: "chart-x-axis" }, Ye = { class: "models-legend" }, Ze = ["title"], qe = { class: "legend-io" }, Ge = { class: "legend-pct" }, Je = /* @__PURE__ */ ae({
  __name: "HomeUsageCard",
  props: {
    nativeConversations: {},
    localConversations: {}
  },
  setup(r) {
    const l = r, v = O(!1), D = O(null), k = O("overview"), z = O("all"), p = O(null), d = Z(
      () => ve({
        nativeConversations: l.nativeConversations,
        localConversations: l.localConversations,
        range: z.value
      })
    ), E = Z(() => {
      const f = d.value.chartMaxTokens;
      return f <= 1 ? ["1", "0"] : [
        M(f),
        M(Math.round(f * 0.75)),
        M(Math.round(f * 0.5)),
        M(Math.round(f * 0.25)),
        "0"
      ];
    });
    function L(f) {
      !v.value || !D.value || D.value.contains(f.target) || (v.value = !1);
    }
    function C(f) {
      v.value && f.key === "Escape" && (v.value = !1);
    }
    return le(() => {
      document.addEventListener("pointerdown", L), document.addEventListener("keydown", C);
    }), ie(() => {
      document.removeEventListener("pointerdown", L), document.removeEventListener("keydown", C);
    }), (f, a) => (c(), u("div", {
      ref_key: "rootEl",
      ref: D,
      class: "home-usage-anchor"
    }, [
      t("button", {
        type: "button",
        class: B(["usage-pill-trigger", { open: v.value }]),
        "aria-expanded": v.value,
        title: "查看工作区用量概览与活跃热力图",
        onClick: a[0] || (a[0] = (s) => v.value = !v.value)
      }, [
        a[4] || (a[4] = t("svg", {
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.35",
          "stroke-linecap": "round",
          "aria-hidden": "true"
        }, [
          t("rect", {
            x: "2.2",
            y: "8.5",
            width: "2.4",
            height: "5",
            rx: "0.7"
          }),
          t("rect", {
            x: "6.8",
            y: "5",
            width: "2.4",
            height: "8.5",
            rx: "0.7"
          }),
          t("rect", {
            x: "11.4",
            y: "2.5",
            width: "2.4",
            height: "11",
            rx: "0.7"
          })
        ], -1)),
        t("span", null, h(d.value.sessions) + " 会话 · " + h(H(M)(d.value.totalTokens)) + " tok", 1),
        a[5] || (a[5] = t("span", { class: "pill-chev" }, "⌄", -1))
      ], 10, ge),
      v.value ? (c(), u("section", me, [
        t("header", ke, [
          t("div", pe, [
            t("button", {
              type: "button",
              role: "tab",
              "aria-selected": k.value === "overview",
              class: B({ active: k.value === "overview" }),
              onClick: a[1] || (a[1] = (s) => k.value = "overview")
            }, "概览", 10, fe),
            t("button", {
              type: "button",
              role: "tab",
              "aria-selected": k.value === "models",
              class: B({ active: k.value === "models" }),
              onClick: a[2] || (a[2] = (s) => k.value = "models")
            }, "模型", 10, _e)
          ]),
          t("div", ye, [
            (c(), u(y, null, $([{ id: "all", label: "全部" }, { id: "30d", label: "30 天" }, { id: "7d", label: "7 天" }], (s) => t("button", {
              key: s.id,
              type: "button",
              class: B({ active: z.value === s.id }),
              onClick: (w) => z.value = s.id
            }, h(s.label), 11, be)), 64))
          ])
        ]),
        k.value === "overview" ? (c(), u(y, { key: 0 }, [
          t("div", Me, [
            t("div", we, [
              a[6] || (a[6] = t("span", { class: "tile-label" }, "会话数", -1)),
              t("strong", xe, h(d.value.sessions.toLocaleString("en-US")), 1)
            ]),
            t("div", Te, [
              a[7] || (a[7] = t("span", { class: "tile-label" }, "消息数", -1)),
              t("strong", De, h(d.value.messages.toLocaleString("en-US")), 1)
            ]),
            t("div", ze, [
              a[8] || (a[8] = t("span", { class: "tile-label" }, "Token 总量", -1)),
              t("strong", Ce, h(H(M)(d.value.totalTokens)), 1)
            ]),
            t("div", $e, [
              a[9] || (a[9] = t("span", { class: "tile-label" }, "活跃天数", -1)),
              t("strong", Se, h(d.value.activeDays), 1)
            ]),
            t("div", He, [
              a[10] || (a[10] = t("span", { class: "tile-label" }, "高峰时段", -1)),
              t("strong", Ee, h(d.value.peakHourLabel), 1)
            ]),
            t("div", Le, [
              a[11] || (a[11] = t("span", { class: "tile-label" }, "最常用模型", -1)),
              t("strong", {
                class: "tile-val",
                title: d.value.topModel
              }, h(d.value.topModel), 9, Ae)
            ])
          ]),
          t("div", {
            class: "heatmap-wrap",
            onMouseleave: a[3] || (a[3] = (s) => p.value = null)
          }, [
            t("div", Be, [
              (c(!0), u(y, null, $(d.value.heatmapCells, (s) => (c(), u("span", {
                key: s.date,
                class: B(["heat-cell", { future: s.future }]),
                "data-level": s.level,
                onMouseenter: (w) => p.value = s
              }, null, 42, Oe))), 128))
            ]),
            t("div", Ne, [
              t("span", Pe, [
                p.value && !p.value.future ? (c(), u(y, { key: 0 }, [
                  Y(h(p.value.date) + " · " + h(p.value.messages) + " 条消息 · " + h(H(M)(p.value.tokens)) + " tok ", 1)
                ], 64)) : (c(), u(y, { key: 1 }, [
                  Y(h(d.value.funBook), 1)
                ], 64))
              ])
            ])
          ], 32)
        ], 64)) : (c(), u(y, { key: 1 }, [
          d.value.models.length ? (c(), u("div", Ke, [
            t("div", Fe, [
              t("div", Ve, [
                (c(!0), u(y, null, $(E.value, (s, w) => (c(), u("span", { key: w }, h(s), 1))), 128))
              ]),
              t("div", We, [
                t("div", Ie, [
                  (c(!0), u(y, null, $(d.value.chartColumns, (s) => (c(), u("div", {
                    key: s.date,
                    class: "chart-col-slot",
                    title: `${s.label} · ${H(M)(s.totalTokens)} tok`
                  }, [
                    t("div", {
                      class: "chart-col",
                      style: V({ height: `${s.totalHeightPct}%` })
                    }, [
                      (c(!0), u(y, null, $(s.segments, (w) => (c(), u("span", {
                        key: w.model,
                        class: "chart-seg",
                        style: V({ height: `${w.heightPct}%`, background: w.color })
                      }, null, 4))), 128))
                    ], 4)
                  ], 8, Re))), 128))
                ]),
                t("div", je, [
                  (c(!0), u(y, null, $(d.value.chartColumns, (s) => (c(), u("span", {
                    key: s.date
                  }, h(s.label), 1))), 128))
                ])
              ])
            ]),
            t("div", Ye, [
              (c(!0), u(y, null, $(d.value.models, (s) => (c(), u("div", {
                key: s.name,
                class: "legend-row"
              }, [
                t("span", {
                  class: "legend-swatch",
                  style: V({ background: s.color })
                }, null, 4),
                t("span", {
                  class: "legend-name",
                  title: s.name
                }, h(s.name), 9, Ze),
                t("span", qe, h(H(M)(s.inputTokens)) + " 输入 · " + h(H(M)(s.outputTokens)) + " 输出", 1),
                t("span", Ge, h(s.sharePct.toFixed(1)) + "%", 1)
              ]))), 128))
            ])
          ])) : (c(), u("div", Ue, "当前时间范围内暂无模型调用记录。"))
        ], 64))
      ])) : re("", !0)
    ], 512));
  }
}), tt = /* @__PURE__ */ ce(Je, [["__scopeId", "data-v-6af6ddce"]]);
export {
  tt as default
};
