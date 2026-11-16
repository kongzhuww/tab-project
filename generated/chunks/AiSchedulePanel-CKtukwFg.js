import { d as re, b as v, w as X, B as ue, C as de, o as i, e as r, i as t, m, t as c, f, F as K, g as O, A as U, u as j, l as C, y as ce, h as V, R, n as ee, v as ve, k as pe, s as te, E as fe } from "./vendor-vue-C09jaOfK.js";
import { b as me } from "./workspace-bridge-BSZakZ3L.js";
import { _ as ye } from "./_plugin-vue_export-helper-BTb4PcVA.js";
const z = "aiWorkspaceSchedulesV1";
async function ge(s) {
  const a = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(a), (o) => o.toString(16).padStart(2, "0")).join("");
}
function ne(s) {
  if (s === void 0) return [];
  if (!Array.isArray(s) || s.length > 100 || s.some((a) => !a || typeof a.id != "string" || !["multica", "deepseek"].includes(a.provider) || typeof a.prompt != "string" || a.prompt.length > 1e4 || !Number.isFinite(a.runAt) || !Number.isFinite(a.createdAt) || !Number.isInteger(a.localHour) || a.localHour < 0 || a.localHour > 23 || !Number.isInteger(a.localMinute) || a.localMinute < 0 || a.localMinute > 59 || !["once", "daily"].includes(a.repeat) || !["pending", "running", "completed", "failed", "unknown", "paused", "skipped"].includes(a.state))) throw new Error("定时任务数据格式异常，未覆盖原数据。");
  for (const a of s) {
    if (a.state === "running" && (typeof a.runId != "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(a.runId) || !Number.isFinite(a.startedAt))) throw new Error("定时任务运行记录格式异常，未覆盖原数据。");
    if (a.notificationPending && (typeof a.notificationPending.runId != "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(a.notificationPending.runId) || !["success", "error", "unknown", "skipped"].includes(a.notificationPending.outcome))) throw new Error("定时任务通知记录格式异常，未覆盖原数据。");
  }
  return s;
}
const be = [
  { id: "pending", title: "等待执行", description: "按计划时间自动开始" },
  { id: "running", title: "执行中", description: "请求或派发正在进行" },
  { id: "completed", title: "已执行", description: "Multica 为已派发，并非结果已审核" },
  { id: "attention", title: "需处理", description: "已暂停、跳过或需要核对" }
];
function ke(s) {
  return s === "pending" || s === "running" || s === "completed" ? s : "attention";
}
function he(s) {
  const a = { pending: [], running: [], completed: [], attention: [] };
  for (const o of s) a[ke(o.state)].push(o);
  return a.pending.sort((o, u) => o.runAt - u.runAt), a.running.sort((o, u) => (u.startedAt || u.runAt) - (o.startedAt || o.runAt)), a.completed.sort((o, u) => u.runAt - o.runAt), a.attention.sort((o, u) => u.runAt - o.runAt), a;
}
function we(s) {
  return s.state === "completed" && s.provider === "multica" ? "已派发" : { pending: "等待执行", running: "执行中", completed: "已执行", failed: "失败 · 已停止", unknown: "结果未确认", paused: "已暂停", skipped: "已跳过" }[s.state];
}
class W extends Error {
  constructor() {
    super("未收到定时后台的确认。请在扩展管理页重新加载扩展并刷新页面；操作结果未确认，请勿重复提交。"), this.name = "ScheduleBackendUnavailable";
  }
}
async function Ae(s, a, o = {}) {
  if (!s?.sendMessage) throw new W();
  let u;
  try {
    u = await s.sendMessage({ type: `ai-schedule:${a}`, ...o });
  } catch {
    throw new W();
  }
  if (!u || typeof u.ok != "boolean") throw new W();
  if (!u.ok) throw new Error(typeof u.error == "string" && u.error ? u.error : "后台拒绝操作，结果未确认，请先检查任务列表。");
  return u.result;
}
const Ce = ["onKeydown"], _e = ["role", "aria-modal"], Se = { class: "page-header" }, Ie = { class: "page-heading" }, Ee = { id: "schedule-title" }, Me = {
  key: 0,
  class: "total-count"
}, Be = { class: "header-actions" }, Ne = ["disabled"], xe = ["disabled"], Ue = {
  key: 0,
  class: "banner warning",
  role: "alert"
}, $e = ["disabled"], De = {
  key: 1,
  class: "banner warning",
  role: "alert"
}, Te = {
  key: 2,
  class: "banner success",
  role: "status"
}, Ve = {
  key: 3,
  class: "loading-state",
  role: "status"
}, Le = {
  key: 4,
  class: "loading-state"
}, Fe = {
  key: 5,
  class: "board",
  "aria-label": "按执行状态分组的定时任务"
}, Pe = ["aria-label"], He = { class: "column-head" }, Ke = { class: "column-title" }, Oe = { class: "column-count" }, Re = { class: "column-description" }, ze = ["disabled"], We = { class: "column-list" }, Ze = { class: "job-card-top" }, qe = { class: "job-content" }, Je = { class: "job-title" }, Ye = { class: "job-meta" }, Ge = { class: "agent-name" }, Qe = { class: "job-schedule" }, Xe = {
  key: 0,
  class: "repeat-label"
}, je = {
  key: 0,
  class: "job-result"
}, et = { class: "job-footer" }, tt = { class: "job-actions" }, nt = ["disabled", "onClick"], at = ["disabled", "onClick"], lt = ["disabled", "onClick"], st = {
  key: 0,
  class: "column-empty"
}, ot = {
  class: "creator-panel",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "create-schedule-title"
}, it = { class: "creator-header" }, rt = { value: "deepseek" }, ut = { key: 0 }, dt = ["value"], ct = { key: 0 }, vt = { key: 1 }, pt = ["value"], ft = { key: 0 }, mt = { class: "time-row" }, yt = { class: "check" }, gt = {
  key: 2,
  class: "form-error",
  role: "alert"
}, bt = { class: "creator-actions" }, kt = ["disabled"], ht = /* @__PURE__ */ re({
  __name: "AiSchedulePanel",
  props: {
    provider: {},
    model: {},
    agents: {},
    workspaceId: {},
    agentId: {},
    embedded: { type: Boolean },
    active: { type: Boolean }
  },
  emits: ["close"],
  setup(s, { emit: a }) {
    const o = s, u = a, h = v(o.provider), L = v("once"), $ = v(o.agentId), S = v(""), I = v(""), E = v(!1), D = v([]), M = v(""), y = v(""), w = v(""), p = v(!1), B = v(!0), N = v(!1), g = v(!1), x = v(""), k = v(!1), Z = v(null), q = v(null), F = te(() => he(D.value)), J = te(() => g.value && !p.value && E.value && !!S.value.trim() && !!I.value && (h.value === "deepseek" ? !!x.value : !!(o.workspaceId && o.agents.some((l) => l.id === $.value))));
    let A = 0, _ = !1;
    async function P(l, e = {}) {
      return Ae(typeof chrome > "u" ? null : chrome.runtime, l, e);
    }
    async function b() {
      const l = ++A;
      B.value = !0;
      try {
        const e = await P("list");
        if (!Array.isArray(e)) throw new Error("后台返回的任务列表格式异常，未覆盖本机记录。");
        const n = ne(e);
        if (_ || l !== A) return;
        D.value = n, N.value = !0, g.value = !0, M.value = "";
      } catch (e) {
        if (_ || l !== A) return;
        g.value = !1;
        const n = e instanceof Error ? e.message : "定时任务读取失败。";
        try {
          if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("本机存储不可用");
          const d = await chrome.storage.local.get(z), T = ne(d[z]);
          if (_ || l !== A) return;
          D.value = T, N.value = !0, M.value = `${n} 当前为本机只读预览，不能确认实际执行状态。`;
        } catch {
          if (_ || l !== A) return;
          M.value = `${n} 本机记录也无法读取，已有任务未被修改。`;
        }
      } finally {
        !_ && l === A && (B.value = !1);
      }
    }
    function Y() {
      !g.value || p.value || (y.value = "", w.value = "", k.value = !0, fe(() => q.value?.focus()));
    }
    async function ae() {
      if (!J.value) return;
      y.value = "", w.value = "";
      const l = new Date(I.value).getTime();
      if (!Number.isFinite(l) || l <= Date.now() + 1e4) {
        y.value = "请选择至少 10 秒之后的时间。";
        return;
      }
      p.value = !0;
      try {
        await P("create", { input: { provider: h.value, repeat: L.value, prompt: S.value, runAt: l, agentId: $.value, workspaceId: o.workspaceId, model: o.model, keyFingerprint: x.value } }), S.value = "", I.value = "", E.value = !1, k.value = !1, w.value = "定时任务已保存。", await b();
      } catch (e) {
        y.value = e instanceof Error ? e.message : "保存结果未确认，请先检查列表，勿重复创建。", await b();
      } finally {
        p.value = !1;
      }
    }
    function le(l) {
      return l.repeat === "daily" && ["paused", "failed", "unknown"].includes(l.state) || l.repeat === "once" && l.state === "paused" && l.runAt > Date.now() + 1e4;
    }
    async function H(l, e) {
      if (!(!g.value || p.value || l === "delete" && !window.confirm("删除这条定时任务？已派发或正在执行的外部任务不会被取消。"))) {
        p.value = !0, y.value = "", w.value = "";
        try {
          await P(l, { id: e.id }), await b();
        } catch (n) {
          y.value = n instanceof Error ? n.message : "操作未确认，请先检查任务列表。", await b();
        } finally {
          p.value = !1;
        }
      }
    }
    function se(l) {
      const e = new Date(l);
      return Number.isNaN(e.getTime()) ? "时间不可用" : e.toLocaleString(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    function oe(l) {
      return l.provider === "deepseek" ? l.model || "DeepSeek" : o.agents.find((e) => e.id === l.agentId)?.name || "Multica 智能体";
    }
    function G(l, e) {
      e === "local" && l[z] && b();
    }
    async function Q() {
      try {
        const l = await me();
        x.value = l.key ? await ge(l.key) : "";
      } catch {
        x.value = "";
      }
    }
    function ie() {
      k.value ? k.value = !1 : o.embedded || u("close");
    }
    return X(h, () => {
      E.value = !1;
    }), X(() => o.active, (l) => {
      l && (Q(), b());
    }), ue(async () => {
      o.embedded || Z.value?.focus(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(G), await Q(), await b();
    }), de(() => {
      _ = !0, ++A, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(G);
    }), (l, e) => (i(), r("div", {
      class: U(["schedule-overlay", { embedded: s.embedded }]),
      onClick: e[12] || (e[12] = V((n) => !s.embedded && u("close"), ["self"])),
      onKeydown: pe(V(ie, ["stop"]), ["esc"])
    }, [
      t("section", {
        class: "schedule-dialog",
        role: s.embedded ? "region" : "dialog",
        "aria-modal": s.embedded ? void 0 : "true",
        "aria-labelledby": "schedule-title"
      }, [
        t("header", Se, [
          t("div", Ie, [
            e[14] || (e[14] = t("div", { class: "eyebrow" }, [
              m("AI WORKSPACE "),
              t("span", null, "/"),
              m(" AUTOMATION")
            ], -1)),
            t("h2", Ee, [
              e[13] || (e[13] = m("已安排 ", -1)),
              N.value ? (i(), r("span", Me, c(D.value.length), 1)) : f("", !0)
            ]),
            e[15] || (e[15] = t("p", null, "安排 AI 任务，按状态查看每一次执行。", -1))
          ]),
          t("div", Be, [
            t("button", {
              type: "button",
              class: "icon-button",
              disabled: B.value,
              title: "重新读取任务",
              "aria-label": "重新读取任务",
              onClick: b
            }, [...e[16] || (e[16] = [
              t("svg", {
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                t("path", { d: "M20 7v5h-5M4 17v-5h5M5.5 9a7 7 0 0 1 12-2L20 12M4 12l2.5 5a7 7 0 0 0 12-2" })
              ], -1)
            ])], 8, Ne),
            t("button", {
              type: "button",
              class: "add-primary",
              disabled: !g.value || p.value,
              onClick: Y
            }, [...e[17] || (e[17] = [
              t("span", null, "＋", -1),
              m(" 新建任务", -1)
            ])], 8, xe),
            s.embedded ? f("", !0) : (i(), r("button", {
              key: 0,
              ref_key: "closeButton",
              ref: Z,
              class: "icon-button close",
              type: "button",
              "aria-label": "关闭定时任务",
              onClick: e[0] || (e[0] = (n) => u("close"))
            }, "×", 512))
          ])
        ]),
        M.value ? (i(), r("div", Ue, [
          e[19] || (e[19] = t("span", { class: "banner-icon" }, "!", -1)),
          t("div", null, [
            e[18] || (e[18] = t("strong", null, "定时后台暂不可用", -1)),
            t("p", null, c(M.value), 1)
          ]),
          t("button", {
            type: "button",
            disabled: B.value,
            onClick: b
          }, "重新检查", 8, $e)
        ])) : f("", !0),
        y.value ? (i(), r("div", De, [
          e[21] || (e[21] = t("span", { class: "banner-icon" }, "!", -1)),
          t("div", null, [
            e[20] || (e[20] = t("strong", null, "操作未确认", -1)),
            t("p", null, c(y.value), 1)
          ]),
          t("button", {
            type: "button",
            "aria-label": "关闭操作提示",
            onClick: e[1] || (e[1] = (n) => y.value = "")
          }, "×")
        ])) : w.value ? (i(), r("div", Te, [
          e[22] || (e[22] = t("span", { class: "banner-icon" }, "✓", -1)),
          t("div", null, c(w.value), 1),
          t("button", {
            type: "button",
            "aria-label": "关闭提示",
            onClick: e[2] || (e[2] = (n) => w.value = "")
          }, "×")
        ])) : f("", !0),
        !N.value && B.value ? (i(), r("div", Ve, "正在读取定时任务…")) : N.value ? (i(), r("div", Fe, [
          (i(!0), r(K, null, O(j(be), (n) => (i(), r("section", {
            key: n.id,
            class: "board-column",
            "aria-label": n.title
          }, [
            t("div", He, [
              t("div", Ke, [
                t("span", {
                  class: U(["column-dot", n.id])
                }, null, 2),
                t("h3", null, c(n.title), 1),
                t("span", Oe, c(F.value[n.id].length), 1)
              ])
            ]),
            t("p", Re, c(n.description), 1),
            n.id === "pending" ? (i(), r("button", {
              key: 0,
              type: "button",
              class: "column-add",
              disabled: !g.value || p.value,
              onClick: Y
            }, [...e[23] || (e[23] = [
              t("span", null, "＋", -1),
              m(" 添加任务", -1)
            ])], 8, ze)) : f("", !0),
            t("div", We, [
              (i(!0), r(K, null, O(F.value[n.id], (d) => (i(), r("article", {
                key: d.id,
                class: "job-card"
              }, [
                t("div", Ze, [
                  t("span", {
                    class: U(["state-marker", d.state]),
                    "aria-hidden": "true"
                  }, null, 2),
                  t("div", qe, [
                    t("p", Je, c(d.prompt), 1),
                    t("div", Ye, [
                      t("span", {
                        class: U(["provider-tag", d.provider])
                      }, c(d.provider === "multica" ? "Multica" : "DeepSeek"), 3),
                      t("span", Ge, c(oe(d)), 1)
                    ]),
                    t("div", Qe, [
                      t("span", null, "◷ " + c(se(d.runAt)), 1),
                      d.repeat === "daily" ? (i(), r("span", Xe, "↻ 每天")) : f("", !0)
                    ]),
                    d.lastResult ? (i(), r("p", je, c(d.lastResult), 1)) : f("", !0)
                  ])
                ]),
                t("div", et, [
                  t("span", {
                    class: U(["state-label", d.state])
                  }, c(j(we)(d)), 3),
                  t("div", tt, [
                    d.state === "pending" ? (i(), r("button", {
                      key: 0,
                      type: "button",
                      disabled: !g.value || p.value,
                      onClick: (T) => H("pause", d)
                    }, "暂停", 8, nt)) : f("", !0),
                    le(d) ? (i(), r("button", {
                      key: 1,
                      type: "button",
                      disabled: !g.value || p.value,
                      onClick: (T) => H("resume", d)
                    }, "恢复", 8, at)) : f("", !0),
                    t("button", {
                      type: "button",
                      disabled: !g.value || p.value || d.state === "running",
                      onClick: (T) => H("delete", d)
                    }, "删除", 8, lt)
                  ])
                ])
              ]))), 128)),
              F.value[n.id].length ? f("", !0) : (i(), r("p", st, c(n.id === "pending" ? "还没有安排任务" : "暂无任务"), 1))
            ])
          ], 8, Pe))), 128))
        ])) : (i(), r("div", Le, "无法读取任务列表，原有任务未被修改。")),
        e[35] || (e[35] = t("footer", { class: "page-footer" }, [
          t("span", { class: "footer-dot" }),
          m(" 本机时间 · 自动执行需要浏览器运行 · 结果不确定时不会自动重试")
        ], -1)),
        C(t("div", {
          class: "creator-backdrop",
          onClick: e[11] || (e[11] = V((n) => k.value = !1, ["self"]))
        }, [
          t("section", ot, [
            t("header", it, [
              e[24] || (e[24] = t("div", null, [
                t("span", { class: "creator-kicker" }, "NEW AUTOMATION"),
                t("h3", { id: "create-schedule-title" }, "新建定时任务"),
                t("p", null, "配置完成后，任务会进入等待执行。")
              ], -1)),
              t("button", {
                class: "icon-button close",
                type: "button",
                "aria-label": "关闭新建任务",
                onClick: e[3] || (e[3] = (n) => k.value = !1)
              }, "×")
            ]),
            t("form", {
              class: "create",
              onSubmit: V(ae, ["prevent"])
            }, [
              t("label", null, [
                e[26] || (e[26] = m("执行服务", -1)),
                C(t("select", {
                  "onUpdate:modelValue": e[4] || (e[4] = (n) => h.value = n)
                }, [
                  e[25] || (e[25] = t("option", { value: "multica" }, "Multica 智能体", -1)),
                  t("option", rt, "DeepSeek · " + c(s.model), 1)
                ], 512), [
                  [R, h.value]
                ])
              ]),
              h.value === "multica" ? (i(), r("label", ut, [
                e[28] || (e[28] = m("智能体", -1)),
                C(t("select", {
                  "onUpdate:modelValue": e[5] || (e[5] = (n) => $.value = n)
                }, [
                  e[27] || (e[27] = t("option", { value: "" }, "选择在线智能体", -1)),
                  (i(!0), r(K, null, O(s.agents, (n) => (i(), r("option", {
                    key: n.id,
                    value: n.id
                  }, c(n.name), 9, dt))), 128))
                ], 512), [
                  [R, $.value]
                ]),
                !s.agents.length || !s.workspaceId ? (i(), r("small", ct, "请先连接 Multica 并确认智能体在线。")) : f("", !0)
              ])) : (i(), r("label", vt, [
                e[29] || (e[29] = m("模型", -1)),
                t("input", {
                  value: s.model,
                  readonly: ""
                }, null, 8, pt),
                x.value ? f("", !0) : (i(), r("small", ft, "请先在 AI 设置中配置 DeepSeek API Key。"))
              ])),
              t("label", null, [
                e[30] || (e[30] = m("任务内容", -1)),
                C(t("textarea", {
                  ref_key: "promptInput",
                  ref: q,
                  "onUpdate:modelValue": e[6] || (e[6] = (n) => S.value = n),
                  maxlength: "10000",
                  rows: "5",
                  placeholder: "写下需要执行的任务或提示词…"
                }, null, 512), [
                  [ee, S.value]
                ])
              ]),
              t("div", mt, [
                t("label", null, [
                  e[31] || (e[31] = m("首次执行时间", -1)),
                  C(t("input", {
                    "onUpdate:modelValue": e[7] || (e[7] = (n) => I.value = n),
                    type: "datetime-local",
                    required: ""
                  }, null, 512), [
                    [ee, I.value]
                  ])
                ]),
                t("label", null, [
                  e[33] || (e[33] = m("重复", -1)),
                  C(t("select", {
                    "onUpdate:modelValue": e[8] || (e[8] = (n) => L.value = n)
                  }, [...e[32] || (e[32] = [
                    t("option", { value: "once" }, "执行一次", -1),
                    t("option", { value: "daily" }, "每天", -1)
                  ])], 512), [
                    [R, L.value]
                  ])
                ])
              ]),
              e[34] || (e[34] = t("p", { class: "hint" }, "使用本机时间和本机账号，任务不跨设备同步。浏览器关闭、休眠或断网可能延迟；迟到超过 10 分钟会跳过本次，不自动补跑。长请求也可能因后台停止而中断。", -1)),
              t("label", yt, [
                C(t("input", {
                  "onUpdate:modelValue": e[9] || (e[9] = (n) => E.value = n),
                  type: "checkbox"
                }, null, 512), [
                  [ve, E.value]
                ]),
                t("span", null, "我了解任务将自动执行" + c(h.value === "deepseek" ? "，DeepSeek 每次调用可能产生费用" : "，Multica 将使用所选智能体") + "。", 1)
              ]),
              y.value ? (i(), r("div", gt, c(y.value), 1)) : f("", !0),
              t("div", bt, [
                t("button", {
                  type: "button",
                  class: "secondary",
                  onClick: e[10] || (e[10] = (n) => k.value = !1)
                }, "取消"),
                t("button", {
                  class: "add-primary",
                  type: "submit",
                  disabled: !J.value
                }, c(p.value ? "保存中…" : "创建定时任务"), 9, kt)
              ])
            ], 32)
          ])
        ], 512), [
          [ce, k.value]
        ])
      ], 8, _e)
    ], 42, Ce));
  }
}), _t = /* @__PURE__ */ ye(ht, [["__scopeId", "data-v-b006f11f"]]);
export {
  _t as default
};
