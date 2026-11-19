import { d as He, w as Be, o as Fe, H as Ke, f as l, g as o, k as ae, h as t, s as A, t as i, j as m, F as L, i as ne, n as nt, b as c, x as ee, y as ke, m as j, u as lt, p as K, v as oe, M as be, L as Ie, C as st, l as ot, q as Te } from "./vendor-vue-BbmU9NUg.js";
import { b as it } from "./workspace-bridge-DSVdr6tH.js";
import { p as ut } from "./MulticaDialog-UuyW6LJm.js";
import rt from "./MessageMarkdown-CDpRSLVW.js";
import { _ as Ve } from "./_plugin-vue_export-helper-CP_tFnee.js";
const ye = "aiWorkspaceSchedulesV1", re = "aiScheduleLivePeekV1", dt = "sched-auto-fallback-v6";
function Ne(r) {
  return r === "deepseek" || r === "openai-compat";
}
async function De(r) {
  const S = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(r));
  return Array.from(new Uint8Array(S), (u) => u.toString(16).padStart(2, "0")).join("");
}
async function vt(r) {
  return r.presetId === "deepseek" && r.key ? De(r.key) : De(`${r.baseUrl || ""}::${r.key || ""}`);
}
function ct(r, S, u) {
  const b = new Date(u);
  return b.setHours(r, S, 0, 0), b.getTime() <= u && b.setDate(b.getDate() + 1), b.getTime();
}
function Pe(r) {
  if (r === void 0) return [];
  if (!Array.isArray(r) || r.length > 100 || r.some((u) => !u || typeof u.id != "string" || !["auto", "deepseek", "openai-compat", "native-pi", "multica"].includes(u.provider) || typeof u.prompt != "string" || u.prompt.length > 1e4 || !Number.isFinite(u.runAt) || !Number.isFinite(u.createdAt) || !Number.isInteger(u.localHour) || u.localHour < 0 || u.localHour > 23 || !Number.isInteger(u.localMinute) || u.localMinute < 0 || u.localMinute > 59 || !["once", "daily"].includes(u.repeat) || !["pending", "running", "completed", "failed", "unknown", "paused", "skipped"].includes(u.state))) throw new Error("定时任务数据格式异常，未覆盖原数据。");
  const S = r.filter((u) => u.provider === "auto" || u.provider === "deepseek" || u.provider === "openai-compat" || u.provider === "native-pi");
  for (const u of S) {
    if (u.state === "running" && (typeof u.runId != "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(u.runId) || !Number.isFinite(u.startedAt))) throw new Error("定时任务运行记录格式异常，未覆盖原数据。");
    if (u.notificationPending && (typeof u.notificationPending.runId != "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(u.notificationPending.runId) || !["success", "error", "unknown", "skipped"].includes(u.notificationPending.outcome))) throw new Error("定时任务通知记录格式异常，未覆盖原数据。");
  }
  return S;
}
function pt(r) {
  return { pending: "等待执行", running: "执行中", completed: "已执行", failed: "失败 · 已停止", unknown: "结果未确认", paused: "已暂停", skipped: "已跳过" }[r.state];
}
class he extends Error {
  constructor() {
    super("未收到定时后台的确认。请在扩展管理页重新加载扩展并刷新页面；操作结果未确认，请勿重复提交。"), this.name = "ScheduleBackendUnavailable";
  }
}
async function mt(r, S, u = {}) {
  if (!r?.sendMessage) throw new he();
  let b;
  try {
    b = await r.sendMessage({ type: `ai-schedule:${S}`, ...u });
  } catch {
    throw new he();
  }
  if (!b || typeof b.ok != "boolean") throw new he();
  if (!b.ok) throw new Error(typeof b.error == "string" && b.error ? b.error : "后台拒绝操作，结果未确认，请先检查任务列表。");
  return b.result;
}
const gt = {
  class: "speek-window",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "自动化任务实时窥屏监视器"
}, ft = { class: "speek-win-bar" }, bt = { class: "speek-win-left" }, yt = {
  key: 0,
  class: "speek-action-text"
}, ht = { class: "speek-win-controls" }, kt = ["disabled"], $t = { class: "speek-step-count" }, wt = {
  key: 0,
  class: "speek-stale-bar",
  role: "alert"
}, _t = {
  key: 1,
  class: "speek-empty"
}, Ct = ["disabled"], Mt = {
  key: 2,
  class: "speek-workspace"
}, xt = { class: "sim-address-bar" }, Lt = { class: "sim-url" }, St = { class: "sim-body" }, At = {
  key: 0,
  class: "sim-sidebar",
  "data-peek-target": "source"
}, Et = { class: "sim-side-head" }, Rt = { key: 0 }, It = {
  key: 0,
  class: "sim-side-loading"
}, Tt = {
  key: 1,
  class: "sim-repo-list"
}, Nt = ["data-peek-target"], Dt = { class: "sim-rank" }, Pt = { class: "sim-repo-mini" }, Ht = ["title"], Bt = { class: "sim-repo-sub" }, Ft = { key: 0 }, Kt = { class: "sim-state-mark" }, Vt = { class: "sim-canvas" }, Gt = {
  key: 0,
  class: "sim-repo-banner"
}, Ut = { class: "sim-banner-top" }, Ot = { class: "sim-banner-stats" }, zt = { key: 0 }, Wt = {
  key: 1,
  class: "today"
}, Jt = { class: "sim-banner-desc" }, qt = {
  key: 1,
  class: "sim-repo-banner placeholder"
}, Yt = { class: "sim-banner-desc" }, Zt = {
  class: "sim-readme-box",
  "data-peek-target": "readme-panel"
}, Qt = { class: "sim-box-head" }, Xt = { key: 0 }, jt = { class: "sim-readme-pre" }, ea = { class: "sim-box-head" }, ta = { class: "sim-ai-badges" }, aa = {
  key: 0,
  class: "sim-chip save",
  "data-peek-target": "library-save"
}, na = {
  key: 1,
  class: "sim-chip done",
  "data-peek-target": "report-done"
}, la = {
  key: 0,
  class: "sim-ai-status"
}, sa = {
  key: 1,
  class: "sim-report-preview"
}, oa = { class: "speek-cursor-tag" }, ia = {
  class: "speek-timeline",
  "aria-label": "行为时间轴"
}, ua = {
  key: 0,
  class: "speek-tl-list"
}, ra = ["onClick"], da = { class: "speek-tl-idx" }, va = { class: "speek-tl-label" }, ca = {
  key: 1,
  class: "speek-tl-list"
}, pa = { class: "speek-tl-idx" }, ma = { class: "speek-tl-label" }, ga = /* @__PURE__ */ He({
  __name: "SchedulePeekModal",
  props: {
    mode: {},
    jobId: {},
    jobTitle: {},
    replayFrames: {},
    running: { type: Boolean },
    backendStale: { type: Boolean }
  },
  emits: ["close", "runNow", "reloadExtension"],
  setup(r, { emit: S }) {
    const u = r, b = S, N = c(null), $ = c(null), k = c(0), w = c(!0);
    let Y = null, I = null;
    const E = c({ x: 80, y: 80, visible: !1 }), h = c(0), s = ee(() => {
      if (u.mode === "replay") {
        const d = u.replayFrames || [];
        return d.length ? d[Math.min(k.value, d.length - 1)] || d[0] : null;
      }
      return $.value;
    }), D = ee(() => {
      const d = s.value?.timelineSteps;
      return Array.isArray(d) && d.length ? d : s.value?.cursorLabel ? [s.value.cursorLabel] : [];
    });
    async function V() {
      await ke();
      const d = N.value, v = s.value;
      if (!d || !v) {
        E.value.visible = !1;
        return;
      }
      const p = d.getBoundingClientRect(), g = d.querySelector(`[data-peek-target="${v.cursorTarget}"]`);
      if (!g) {
        E.value = { x: Math.round(p.width * 0.45), y: Math.round(p.height * 0.4), visible: !0 };
        return;
      }
      const y = g.getBoundingClientRect(), z = Math.max(16, Math.min(p.width - 150, y.left - p.left + Math.min(y.width * 0.36, 95))), Q = Math.max(16, Math.min(p.height - 36, y.top - p.top + Math.min(y.height * 0.45, 42)));
      E.value = { x: Math.round(z), y: Math.round(Q), visible: !0 }, h.value++;
    }
    Be(s, () => {
      V();
    }, { immediate: !0, deep: !0 });
    function Z() {
      Y && (clearInterval(Y), Y = null);
    }
    function M() {
      if (Z(), u.mode !== "replay") return;
      const d = u.replayFrames || [];
      d.length <= 1 || (Y = setInterval(() => {
        w.value && (k.value < d.length - 1 ? k.value++ : w.value = !1);
      }, 1100));
    }
    function _() {
      const d = u.replayFrames || [];
      d.length && (!w.value && k.value >= d.length - 1 && (k.value = 0), w.value = !w.value);
    }
    function O(d) {
      if (!d || u.jobId && d.jobId !== u.jobId) return;
      const v = $.value;
      v && v.updatedAt === d.updatedAt && v.phase === d.phase && v.cursorTarget === d.cursorTarget && v.cursorLabel === d.cursorLabel && v.active === d.active && v.activeRepoIndex === d.activeRepoIndex && (v.timelineSteps?.length || 0) === (d.timelineSteps?.length || 0) || ($.value = d);
    }
    async function T() {
      if (!(u.mode !== "live" || typeof chrome > "u" || !chrome.storage?.local))
        try {
          const d = await chrome.storage.local.get(re);
          O(d?.[re]);
        } catch {
        }
    }
    function P(d, v) {
      u.mode !== "live" || v !== "local" || !d[re] || O(d[re].newValue);
    }
    function G(d) {
      d.key === "Escape" && (d.stopPropagation(), b("close"));
    }
    return Fe(() => {
      document.addEventListener("keydown", G), window.addEventListener("resize", V), u.mode === "live" ? (T(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(P), I = setInterval(() => {
        T();
      }, 350)) : (k.value = 0, w.value = !0, M()), V();
    }), Ke(() => {
      Z(), I && (clearInterval(I), I = null), document.removeEventListener("keydown", G), window.removeEventListener("resize", V), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(P);
    }), (d, v) => (l(), o("div", {
      class: "speek-overlay",
      onClick: v[4] || (v[4] = ae((p) => b("close"), ["self"]))
    }, [
      t("section", gt, [
        t("header", ft, [
          t("div", bt, [
            t("span", {
              class: A(["speek-status-badge", { live: r.mode === "live" && s.value?.active }])
            }, [
              v[5] || (v[5] = t("i", { class: "speek-status-dot" }, null, -1)),
              t("span", null, i(r.mode === "live" ? s.value?.active ? "LIVE 实况窥屏" : "最近一次实况" : "历史轨迹回放"), 1)
            ], 2),
            t("strong", null, i(s.value?.jobTitle || r.jobTitle || "自动化任务"), 1),
            s.value ? (l(), o("span", yt, i(s.value.cursorLabel), 1)) : m("", !0)
          ]),
          t("div", ht, [
            r.mode === "live" && r.jobId ? (l(), o("button", {
              key: 0,
              type: "button",
              class: "speek-ctl-btn",
              disabled: r.running || !!s.value?.active,
              onClick: v[0] || (v[0] = (p) => b("runNow", r.jobId))
            }, i(r.running || s.value?.active ? "执行中…" : "▶ 立即试跑"), 9, kt)) : m("", !0),
            r.mode === "replay" && (r.replayFrames?.length || 0) > 1 ? (l(), o(L, { key: 1 }, [
              t("button", {
                type: "button",
                class: "speek-ctl-btn",
                onClick: _
              }, i(w.value ? "暂停" : k.value >= (r.replayFrames?.length || 1) - 1 ? "重播" : "继续"), 1),
              t("span", $t, i(k.value + 1) + " / " + i(r.replayFrames?.length), 1)
            ], 64)) : m("", !0),
            t("button", {
              type: "button",
              class: "speek-close-btn",
              "aria-label": "关闭监视器",
              onClick: v[1] || (v[1] = (p) => b("close"))
            }, "×")
          ])
        ]),
        r.mode === "live" && r.backendStale ? (l(), o("div", wt, [
          v[6] || (v[6] = t("span", null, "检测到扩展后台 `background.js` 尚未重载，实况窥屏需要重启后台后推送。", -1)),
          t("button", {
            type: "button",
            class: "speek-ctl-btn",
            onClick: v[2] || (v[2] = (p) => b("reloadExtension"))
          }, "🔄 立即热重载扩展")
        ])) : m("", !0),
        s.value ? (l(), o("div", Mt, [
          t("div", {
            ref_key: "stageRef",
            ref: N,
            class: "speek-stage"
          }, [
            t("div", xt, [
              v[9] || (v[9] = t("span", { class: "sim-lock" }, "GitHub · 自动化视野仿真", -1)),
              t("span", Lt, i(s.value.activeRepo?.fullName ? `github.com/${s.value.activeRepo.fullName}` : s.value.kind === "github-trending" ? "github.com/trending" : "workspace://automation"), 1)
            ]),
            t("div", St, [
              s.value.kind === "github-trending" ? (l(), o("aside", At, [
                t("div", Et, [
                  v[10] || (v[10] = t("strong", null, "今日榜单目录", -1)),
                  s.value.repos?.length ? (l(), o("small", Rt, i(s.value.repos.length) + " 个", 1)) : m("", !0)
                ]),
                s.value.repos?.length ? (l(), o("div", Tt, [
                  (l(!0), o(L, null, ne(s.value.repos, (p, g) => (l(), o("div", {
                    key: p.fullName,
                    class: A(["sim-repo-row", { active: g === s.value.activeRepoIndex, done: p.status === "done" }]),
                    "data-peek-target": g === s.value.activeRepoIndex ? "repo-card" : void 0
                  }, [
                    t("span", Dt, "#" + i(p.rank), 1),
                    t("div", Pt, [
                      t("div", {
                        class: "sim-repo-name",
                        title: p.fullName
                      }, i(p.fullName.split("/")[1] || p.fullName), 9, Ht),
                      t("div", Bt, [
                        t("span", null, i(p.language || "Code"), 1),
                        p.todayStars ? (l(), o("span", Ft, "+" + i(p.todayStars) + "★", 1)) : m("", !0)
                      ])
                    ]),
                    t("span", Kt, i(p.status === "done" ? "✓" : g === s.value.activeRepoIndex ? "👁" : "·"), 1)
                  ], 10, Nt))), 128))
                ])) : (l(), o("div", It, "正在拉取排行榜…"))
              ])) : m("", !0),
              t("main", Vt, [
                s.value.kind === "github-trending" ? (l(), o(L, { key: 0 }, [
                  s.value.activeRepo ? (l(), o("div", Gt, [
                    t("div", Ut, [
                      t("strong", null, "#" + i(s.value.activeRepo.rank) + " " + i(s.value.activeRepo.fullName), 1),
                      t("div", Ot, [
                        s.value.activeRepo.language ? (l(), o("span", zt, i(s.value.activeRepo.language), 1)) : m("", !0),
                        t("span", null, "★ " + i(s.value.activeRepo.stars), 1),
                        s.value.activeRepo.todayStars ? (l(), o("span", Wt, "+" + i(s.value.activeRepo.todayStars) + " today", 1)) : m("", !0)
                      ])
                    ]),
                    t("p", Jt, i(s.value.activeRepo.description || "暂无官方简介"), 1)
                  ])) : (l(), o("div", qt, [
                    t("strong", null, i(s.value.sourceLabel || "正在准备 GitHub 今日榜单"), 1),
                    t("p", Yt, i(s.value.cursorLabel), 1)
                  ])),
                  t("div", Zt, [
                    t("div", Qt, [
                      v[11] || (v[11] = t("span", null, "README.md 实读视窗", -1)),
                      s.value.activeRepo ? (l(), o("small", Xt, i(s.value.activeRepo.readmeExcerpt ? "已读取正文" : "打开仓库主页…"), 1)) : m("", !0)
                    ]),
                    t("pre", jt, i(s.value.activeRepo?.readmeExcerpt || "等待依次打开仓库并读取 README 说明…"), 1)
                  ])
                ], 64)) : m("", !0),
                t("div", {
                  class: A(["sim-ai-box", { active: ["analyzing", "saving", "done"].includes(s.value.phase) }]),
                  "data-peek-target": "ai-panel"
                }, [
                  t("div", ea, [
                    t("span", null, i(s.value.provider === "native-pi" ? "本机 Pi Agent 综合研判" : `${s.value.providerLabel || (s.value.provider === "auto" ? "智能引擎" : "DeepSeek")} 综合研判`), 1),
                    t("div", ta, [
                      s.value.phase === "saving" || s.value.phase === "done" ? (l(), o("span", aa, i(s.value.phase === "saving" ? "正在写入资料库…" : "✓ 已写入资料库"), 1)) : m("", !0),
                      s.value.phase === "done" ? (l(), o("span", na, " ✓ 报告已完成 ")) : m("", !0)
                    ])
                  ]),
                  s.value.reportPreview ? (l(), o("pre", sa, i(s.value.reportPreview), 1)) : (l(), o("p", la, i(s.value.phase === "analyzing" ? "正在结合刚才通读的所有 README 逐个评估价值并生成中文介绍报告…" : s.value.phase === "error" ? s.value.cursorLabel : "将在通读完所有候选仓库后，统一对比筛选并撰写详细介绍…"), 1))
                ], 2)
              ])
            ]),
            E.value.visible ? (l(), o("div", {
              key: 0,
              class: "speek-cursor",
              style: nt({ transform: `translate3d(${E.value.x}px, ${E.value.y}px, 0)` })
            }, [
              (l(), o("span", {
                key: h.value,
                class: "speek-cursor-ripple"
              })),
              v[12] || (v[12] = t("svg", {
                class: "speek-cursor-arrow",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                t("path", {
                  d: "M4.5 3.5l14.5 7.2-6.2 1.8-3.1 5.9L4.5 3.5z",
                  fill: "#6366f1",
                  stroke: "#ffffff",
                  "stroke-width": "1.6",
                  "stroke-linejoin": "round"
                })
              ], -1)),
              t("span", oa, i(s.value.cursorLabel), 1)
            ], 4)) : m("", !0)
          ], 512),
          t("aside", ia, [
            v[13] || (v[13] = t("div", { class: "speek-tl-head" }, "AI 行为时间轴", -1)),
            r.mode === "replay" && r.replayFrames?.length ? (l(), o("div", ua, [
              (l(!0), o(L, null, ne(r.replayFrames, (p, g) => (l(), o("button", {
                key: g,
                type: "button",
                class: A(["speek-tl-item", { active: g === k.value, done: g < k.value }]),
                onClick: (y) => {
                  k.value = g, w.value = !1;
                }
              }, [
                t("span", da, i(g + 1), 1),
                t("span", va, i(p.cursorLabel), 1)
              ], 10, ra))), 128))
            ])) : (l(), o("div", ca, [
              (l(!0), o(L, null, ne(D.value, (p, g) => (l(), o("div", {
                key: `tl-${g}`,
                class: A(["speek-tl-item", g === D.value.length - 1 ? "active" : "done"])
              }, [
                t("span", pa, i(g === D.value.length - 1 && s.value.active ? "•" : g + 1), 1),
                t("span", ma, i(p), 1)
              ], 2))), 128))
            ]))
          ])
        ])) : (l(), o("div", _t, [
          v[7] || (v[7] = t("h3", null, "暂无可展示的窥屏实况", -1)),
          v[8] || (v[8] = t("p", null, "点击上方或下方「立即试跑」，从连接 GitHub Trending、逐个打开仓库阅读 README 到总结出报告的每一步都会在这里实时上演。", -1)),
          r.mode === "live" && r.jobId ? (l(), o("button", {
            key: 0,
            type: "button",
            class: "speek-ctl-btn",
            style: { "margin-top": "12px" },
            disabled: r.running,
            onClick: v[3] || (v[3] = (p) => b("runNow", r.jobId))
          }, i(r.running ? "执行中…" : "▶ 立即试跑"), 9, Ct)) : m("", !0)
        ]))
      ])
    ]));
  }
}), fa = /* @__PURE__ */ Ve(ga, [["__scopeId", "data-v-3ddbcdf3"]]), ba = ["onKeydown"], ya = ["role", "aria-modal"], ha = {
  key: 0,
  class: "auto-banner warning",
  role: "alert"
}, ka = {
  key: 1,
  class: "auto-banner warning",
  role: "alert"
}, $a = ["disabled"], wa = {
  key: 2,
  class: "auto-banner warning",
  role: "alert"
}, _a = {
  key: 3,
  class: "auto-banner success",
  role: "status"
}, Ca = { class: "auto-list-shell" }, Ma = { class: "auto-list-head" }, xa = { class: "auto-head-actions" }, La = ["disabled"], Sa = ["disabled"], Aa = {
  key: 0,
  class: "auto-landing-empty",
  role: "status"
}, Ea = {
  key: 1,
  class: "auto-landing-empty"
}, Ra = {
  class: "auto-filter-tabs",
  role: "tablist"
}, Ia = ["aria-selected", "onClick"], Ta = { class: "tab-num" }, Na = ["disabled"], Da = {
  key: 0,
  class: "auto-landing-empty"
}, Pa = {
  key: 1,
  class: "auto-job-list"
}, Ha = { class: "job-main" }, Ba = { class: "job-top-line" }, Fa = { class: "job-headline" }, Ka = {
  key: 0,
  class: "default-badge"
}, Va = {
  key: 0,
  class: "job-body"
}, Ga = { class: "job-meta-row" }, Ua = { class: "meta-chip" }, Oa = {
  key: 0,
  class: "meta-chip gh-chip"
}, za = { class: "meta-time" }, Wa = {
  key: 1,
  class: "job-last-result"
}, Ja = { class: "job-controls" }, qa = ["onClick"], Ya = ["onClick"], Za = ["onClick"], Qa = ["disabled", "onClick"], Xa = ["disabled", "onClick"], ja = ["disabled", "onClick"], en = ["disabled", "onClick"], tn = ["disabled", "onClick"], an = {
  key: 4,
  class: "auto-editor-drawer",
  "aria-label": "编辑自动化任务"
}, nn = { class: "auto-editor-head" }, ln = { class: "auto-editor-body" }, sn = {
  class: "auto-mode-tabs",
  role: "tablist"
}, on = ["aria-selected"], un = ["aria-selected"], rn = { class: "auto-context-row" }, dn = { class: "auto-selectors" }, vn = { class: "select-pill" }, cn = { value: "openai-compat" }, pn = { class: "auto-subhint" }, mn = {
  key: 0,
  class: "auto-section github-cfg-card"
}, gn = { class: "gh-cfg-row" }, fn = { class: "gh-cfg-field" }, bn = { class: "gh-topn-pills" }, yn = ["onClick"], hn = { class: "gh-cfg-field" }, kn = {
  class: "auto-confirm",
  style: { "margin-top": "4px" }
}, $n = { class: "auto-section" }, wn = { class: "trigger-card" }, _n = { class: "trigger-controls" }, Cn = { class: "control-pill" }, Mn = {
  key: 0,
  class: "control-pill"
}, xn = {
  key: 1,
  class: "control-pill"
}, Ln = { class: "tz-label" }, Sn = { class: "auto-section" }, An = { class: "auto-confirm" }, En = { class: "auto-editor-foot" }, Rn = ["disabled"], In = {
  key: 5,
  class: "auto-report-drawer",
  "aria-label": "自动化执行报告"
}, Tn = { class: "auto-report-head" }, Nn = { class: "auto-head-actions" }, Dn = { class: "auto-report-body" }, Pn = ["aria-label"], Hn = { class: "guide-head" }, Bn = { class: "guide-desc" }, Fn = { class: "guide-actions" }, Kn = /* @__PURE__ */ He({
  __name: "AiSchedulePanel",
  props: {
    model: {},
    embedded: { type: Boolean },
    active: { type: Boolean },
    nativeConnected: { type: Boolean },
    nativeAgentLabel: {}
  },
  emits: ["close", "createWithPrompt", "openSettings"],
  setup(r, { emit: S }) {
    const u = r, b = S, N = c("daily"), $ = c("auto"), k = c("云端/兼容模型"), w = c(""), Y = c("deepseek"), I = c(!1), E = c(""), h = c({ open: !1, job: null, reason: "auto-unconfigured", title: "", desc: "" }), s = c("prompt"), D = c(10), V = c("daily"), Z = c(!0), M = c(""), _ = c(""), O = c("09:00"), T = c(ie()), P = c(!0), G = c("all"), d = c([]), v = c(""), p = c(""), g = c(""), y = c(!1), z = c(""), Q = c(!0), de = c(!1), R = c(!1), ve = c(!1), H = c(""), U = c(!1), W = c(null), B = c(null), ce = c(!1), F = c({ open: !1, mode: "live" });
    function Ge(a) {
      F.value = {
        open: !0,
        mode: "live",
        jobId: a.id,
        jobTitle: q(a.prompt).head
      };
    }
    function Ue(a) {
      F.value = {
        open: !0,
        mode: "replay",
        jobId: a.id,
        jobTitle: q(a.prompt).head,
        replayFrames: a.peekFrames || []
      };
    }
    const $e = c(null), pe = c(null), Oe = ee(() => {
      const a = -(/* @__PURE__ */ new Date()).getTimezoneOffset(), e = a >= 0 ? "+" : "-", n = Math.abs(a), f = Math.floor(n / 60), C = n % 60;
      return C ? `GMT${e}${f}:${String(C).padStart(2, "0")}` : `GMT${e}${f}`;
    });
    function ie() {
      const a = new Date(Date.now() + 36e5);
      a.setSeconds(0, 0);
      const e = (n) => String(n).padStart(2, "0");
      return `${a.getFullYear()}-${e(a.getMonth() + 1)}-${e(a.getDate())}T${e(a.getHours())}:${e(a.getMinutes())}`;
    }
    function ze(a) {
      const e = /^(\d{1,2}):(\d{2})$/.exec(a.trim()), n = e ? Math.min(23, Math.max(0, Number(e[1]))) : 9, f = e ? Math.min(59, Math.max(0, Number(e[2]))) : 0, C = /* @__PURE__ */ new Date();
      return C.setHours(n, f, 0, 0), C.getTime() <= Date.now() + 15e3 && C.setDate(C.getDate() + 1), C.getTime();
    }
    const we = ee(() => {
      const a = M.value.trim(), e = _.value.trim();
      return a && e ? `${a}

${e}` : e || a;
    }), _e = ee(
      () => R.value && !y.value && P.value && !!we.value && (N.value === "daily" ? !!O.value : !!T.value) && ($.value !== "openai-compat" || !!H.value)
    ), le = ee(() => {
      const a = {
        all: d.value.length,
        pending: 0,
        running: 0,
        completed: 0,
        attention: 0
      };
      for (const e of d.value)
        e.state === "pending" ? a.pending++ : e.state === "running" ? a.running++ : e.state === "completed" ? a.completed++ : a.attention++;
      return a;
    }), Ce = ee(() => G.value === "all" ? d.value : G.value === "attention" ? d.value.filter((a) => !["pending", "running", "completed"].includes(a.state)) : d.value.filter((a) => a.state === G.value));
    let X = 0, te = !1;
    async function J(a, e = {}) {
      return mt(typeof chrome > "u" ? null : chrome.runtime, a, e);
    }
    async function x() {
      const a = ++X;
      Q.value = !0;
      try {
        const [e, n] = await Promise.all([
          J("list"),
          J("stamp").catch(() => null)
        ]);
        if (!Array.isArray(e)) throw new Error("后台返回的任务列表格式异常，未覆盖本机记录。");
        const f = Pe(e);
        if (te || a !== X) return;
        d.value = f, de.value = !0, R.value = !0, ve.value = typeof chrome < "u" && n?.stamp !== dt, v.value = "", f.length > 0 && !M.value.trim() && !_.value.trim() && (U.value = !1);
      } catch (e) {
        if (te || a !== X) return;
        R.value = !1;
        const n = e instanceof Error ? e.message : "定时任务读取失败。";
        try {
          if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("本机存储不可用");
          const f = await chrome.storage.local.get(ye), C = Pe(f[ye]);
          if (te || a !== X) return;
          d.value = C, de.value = !0, v.value = `${n} 当前为本机只读预览，不能确认实际执行状态。`, C.length > 0 && !M.value.trim() && !_.value.trim() && (U.value = !1);
        } catch {
          if (te || a !== X) return;
          v.value = `${n} 本机记录也无法读取，已有任务未被修改。`;
        }
      } finally {
        !te && a === X && (Q.value = !1);
      }
    }
    function Me() {
      typeof chrome < "u" && chrome.runtime?.reload && chrome.runtime.reload();
    }
    function We(a = !1) {
      p.value = "", g.value = "", W.value = null, $.value = "auto", s.value = "prompt", P.value = !0, T.value || (T.value = ie()), a && !_.value.trim() && (M.value = M.value.trim() || "早间汇总", _.value = "汇总昨日项目变更、新增任务与重要更新。"), U.value = !0, ke(() => pe.value?.focus());
    }
    function Je() {
      s.value = "github-trending", !M.value.trim() && !_.value.trim() && (M.value = "GitHub 今日榜单精选助手", _.value = "每天抓取 GitHub 今日 Trending 榜前 10 个仓库，全部通读 README 与说明后判断哪些真正有作用，并逐一介绍一遍。");
    }
    function qe(a) {
      const e = new Date(a);
      if (Number.isNaN(e.getTime())) return ie();
      const n = (f) => String(f).padStart(2, "0");
      return `${e.getFullYear()}-${n(e.getMonth() + 1)}-${n(e.getDate())}T${n(e.getHours())}:${n(e.getMinutes())}`;
    }
    function Ye(a) {
      p.value = "", g.value = "", W.value = a.id, $.value = a.provider === "auto" ? "auto" : Ne(a.provider) ? "openai-compat" : "native-pi", s.value = a.kind === "github-trending" ? "github-trending" : "prompt", N.value = a.repeat;
      const e = (f) => String(f).padStart(2, "0");
      O.value = `${e(a.localHour)}:${e(a.localMinute)}`, T.value = qe(Math.max(a.runAt, Date.now() + 6e4));
      const n = q(a.prompt);
      n.body !== n.head ? (M.value = n.head, _.value = n.body) : (M.value = "", _.value = a.prompt), D.value = a.githubConfig?.topN || 10, V.value = a.githubConfig?.since || "daily", Z.value = a.githubConfig?.saveToLibrary !== !1, P.value = !0, U.value = !0, ke(() => pe.value?.focus());
    }
    function xe() {
      p.value = "", W.value = null, M.value = "", _.value = "", s.value = "prompt", P.value = !1, U.value = !1;
    }
    async function Ze(a = !1) {
      if (!_e.value) return;
      p.value = "", g.value = "";
      const e = N.value === "daily" ? ze(O.value) : new Date(T.value).getTime();
      if (!Number.isFinite(e) || e <= Date.now() + 1e4) {
        p.value = "请选择至少 10 秒之后的时间。";
        return;
      }
      const n = Math.max(1, Math.min(25, Math.round(Number(D.value) || 10))), C = {
        provider: $.value === "auto" ? "auto" : $.value === "openai-compat" ? Y.value === "deepseek" ? "deepseek" : "openai-compat" : "native-pi",
        kind: s.value,
        repeat: N.value,
        prompt: we.value,
        runAt: e,
        ...$.value === "auto" ? { providerLabel: "智能自动" } : {},
        ...$.value === "openai-compat" ? {
          providerLabel: k.value,
          model: w.value || u.model,
          keyFingerprint: H.value
        } : {},
        ...s.value === "github-trending" ? {
          githubConfig: {
            topN: n,
            since: V.value,
            focus: _.value.trim(),
            saveToLibrary: Z.value
          }
        } : {}
      };
      y.value = !0;
      try {
        const se = !!W.value, ge = se ? await J("update", { id: W.value, input: C }) : await J("create", { input: C });
        if (W.value = null, M.value = "", _.value = "", T.value = ie(), P.value = !1, U.value = !1, a && ge?.id) {
          z.value = ge.id, g.value = s.value === "github-trending" ? `已保存任务，正在抓取 GitHub 榜单前 ${n} 个仓库并逐一阅读分析（约需 15~60 秒）…` : "已保存任务，正在立即运行一次…", await x();
          const fe = await J("run-now", { id: ge.id });
          g.value = fe?.message || "已完成一次试跑。", await x(), fe?.item?.lastReportContent && (B.value = fe.item);
        } else
          g.value = se ? "自动化配置已更新。" : "自动化任务已创建。", await x();
      } catch (se) {
        p.value = se instanceof Error ? se.message : "保存结果未确认，请先检查列表，勿重复创建。", await x();
      } finally {
        z.value = "", y.value = !1;
      }
    }
    async function Le(a) {
      if (!R.value || y.value || a.state === "running") return;
      await ue();
      const e = !!u.nativeConnected || I.value;
      if (Ne(a.provider)) {
        if (!!!(H.value && a.keyFingerprint && H.value === a.keyFingerprint)) {
          h.value = {
            open: !0,
            job: a,
            reason: "missing-api",
            title: `需要配置「${a.providerLabel || "模型服务"}」后才能运行`,
            desc: a.kind === "github-trending" ? "当前配置尚未就绪或已更换。你可以去 30 秒配置云端 Key / 本机 Ollama，或者切换成「免配置直出」先看基础结构化简报。" : "请前往 AI 设置确认模型服务 Key 或本机 Ollama 配置后再试跑。"
          };
          return;
        }
      } else if (a.provider === "native-pi" && !e) {
        h.value = {
          open: !0,
          job: a,
          reason: "missing-native",
          title: "当前电脑未连接本机 Pi 终端",
          desc: a.kind === "github-trending" ? "普通电脑不需要装命令行也能用！建议填入模型 Key（或接本机免费 Ollama），也可以先免配置直接抓取生成基础简报。" : "该任务指定使用本机 Pi CLI 执行，当前未检测到本机连接。"
        };
        return;
      } else if (a.provider === "auto" && !H.value && !e) {
        h.value = {
          open: !0,
          job: a,
          reason: "auto-unconfigured",
          title: a.kind === "github-trending" ? "尚未配置 AI 模型，选择本次试跑方式" : "还差一步：配置一个可用的 AI 引擎",
          desc: a.kind === "github-trending" ? "你无需安装本机 Pi 终端：既可以直接先抓今日榜单与 README 生成「结构化基础简报」（立即体验窥屏），也可以 30 秒配置模型 Key / 本机免 Key Ollama 解锁深度点评。" : "纯提示词任务需要大模型来生成回复。推荐 30 秒填入 DeepSeek / 硅基流动 / Kimi / OpenRouter Key，或连接本机免 Key Ollama。"
        };
        return;
      }
      await Ae(a);
    }
    async function Qe() {
      const a = h.value.job;
      if (h.value.open = !1, !a) return;
      if (a.provider !== "auto")
        try {
          const n = a.repeat === "daily" ? ct(a.localHour, a.localMinute, Date.now()) : Math.max(a.runAt, Date.now() + 6e4);
          await J("update", {
            id: a.id,
            input: {
              provider: "auto",
              kind: a.kind === "github-trending" ? "github-trending" : "prompt",
              repeat: a.repeat,
              prompt: a.prompt,
              runAt: n,
              ...a.githubConfig ? { githubConfig: a.githubConfig } : {}
            }
          }), await x();
        } catch {
        }
      const e = d.value.find((n) => n.id === a.id) || { ...a, provider: "auto" };
      await Ae(e);
    }
    function Se(a) {
      h.value.open = !1, F.value.open = !1, u.embedded ? b("openSettings", a) : g.value = "请在 AI 工作区右上角打开「设置 → 模型服务」完成配置。";
    }
    async function Ae(a) {
      if (!(!R.value || y.value || a.state === "running")) {
        y.value = !0, z.value = a.id, p.value = "", g.value = a.kind === "github-trending" ? `正在抓取 ${a.githubConfig?.since === "weekly" ? "本周" : a.githubConfig?.since === "monthly" ? "本月" : "今日"} GitHub 榜单前 ${a.githubConfig?.topN || 10} 个仓库并逐一分析…` : "正在立即执行自动化任务…";
        try {
          const e = await J("run-now", { id: a.id });
          g.value = e?.message || "执行完成。", await x(), !F.value.open && e?.item?.lastReportContent && (B.value = e.item);
        } catch (e) {
          p.value = e instanceof Error ? e.message : "执行失败。", g.value = "", await x();
        } finally {
          z.value = "", y.value = !1;
        }
      }
    }
    async function Xe(a) {
      if (a)
        try {
          await navigator.clipboard.writeText(a), ce.value = !0, setTimeout(() => {
            ce.value = !1;
          }, 1600);
        } catch {
        }
    }
    function je(a) {
      return a.repeat === "daily" && ["paused", "failed", "unknown"].includes(a.state) || a.repeat === "once" && a.state === "paused" && a.runAt > Date.now() + 1e4;
    }
    async function me(a, e) {
      if (!(!R.value || y.value || a === "delete" && !window.confirm("删除这条自动化任务？已派发或正在执行的外部任务不会被取消。"))) {
        y.value = !0, p.value = "", g.value = "";
        try {
          await J(a, { id: e.id }), await x();
        } catch (n) {
          p.value = n instanceof Error ? n.message : "操作未确认，请先检查任务列表。", await x();
        } finally {
          y.value = !1;
        }
      }
    }
    function et(a) {
      const e = new Date(a);
      return Number.isNaN(e.getTime()) ? "时间不可用" : e.toLocaleString(void 0, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    }
    function q(a) {
      const e = a.trim().split(/\n{2,}/);
      return e.length > 1 && e[0].length <= 80 ? { head: e[0], body: e.slice(1).join(`

`) } : { head: a.trim().split(`
`)[0].slice(0, 72) || "未命名任务", body: a.trim() };
    }
    function Ee(a) {
      if (a.provider === "auto")
        return H.value ? `智能自动 · ${k.value}${w.value ? ` (${w.value})` : ""}` : u.nativeConnected || I.value ? `智能自动 · ${u.nativeAgentLabel || E.value || "本机助手"}` : a.kind === "github-trending" ? "智能自动（免配可用基础版）" : "智能自动（待配模型）";
      if (a.provider === "native-pi") return "本机 Pi Agent";
      const e = a.providerLabel || "DeepSeek";
      return a.model ? `${e} · ${a.model}` : e;
    }
    function tt(a) {
      return a === "weekly" ? "本周榜" : a === "monthly" ? "本月榜" : "今日榜";
    }
    function Re(a, e) {
      e === "local" && a[ye] && x(), e === "local" && a.byokConfigV1 && ue();
    }
    async function ue() {
      try {
        const a = await it();
        Y.value = a.presetId, k.value = a.label || "模型服务", w.value = a.model || "", H.value = a.configured ? await vt(a) : "";
      } catch {
        H.value = "";
      }
      if (u.nativeConnected)
        I.value = !0, E.value = u.nativeAgentLabel || "本机助手";
      else
        try {
          const a = await ut(), e = a?.agents?.filter((f) => f.installed) || [], n = e.find((f) => f.id === "pi") || e[0];
          I.value = !!(n || a?.piAvailable), E.value = n ? `本机 ${n.name}` : a?.piAvailable ? "本机 Pi" : "";
        } catch {
          I.value = !1, E.value = "";
        }
    }
    function at() {
      U.value ? U.value = !1 : u.embedded || b("close");
    }
    return Be(
      () => u.active,
      (a) => {
        a && (ue(), x());
      }
    ), Fe(async () => {
      u.embedded || $e.value?.focus(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(Re), await ue(), await x();
    }), Ke(() => {
      te = !0, ++X, typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(Re);
    }), (a, e) => (l(), o("div", {
      class: A(["schedule-overlay", { embedded: r.embedded }]),
      onClick: e[26] || (e[26] = ae((n) => !r.embedded && b("close"), ["self"])),
      onKeydown: Te(ae(at, ["stop"]), ["esc"])
    }, [
      t("section", {
        class: "schedule-dialog",
        role: r.embedded ? "region" : "dialog",
        "aria-modal": r.embedded ? void 0 : "true",
        "aria-labelledby": "schedule-title"
      }, [
        ve.value ? (l(), o("div", ha, [
          e[27] || (e[27] = t("span", null, "!", -1)),
          e[28] || (e[28] = t("p", null, "检测到扩展后台服务脚本尚未重载（仍在使用旧版代码），默认任务与最新能力需重启后台后生效。", -1)),
          t("button", {
            type: "button",
            onClick: Me
          }, "🔄 立即热重载扩展")
        ])) : m("", !0),
        v.value ? (l(), o("div", ka, [
          e[29] || (e[29] = t("span", null, "!", -1)),
          t("p", null, i(v.value), 1),
          t("button", {
            type: "button",
            disabled: Q.value,
            onClick: x
          }, "重新检查", 8, $a)
        ])) : m("", !0),
        p.value ? (l(), o("div", wa, [
          e[30] || (e[30] = t("span", null, "!", -1)),
          t("p", null, i(p.value), 1),
          t("button", {
            type: "button",
            "aria-label": "关闭操作提示",
            onClick: e[0] || (e[0] = (n) => p.value = "")
          }, "×")
        ])) : g.value ? (l(), o("div", _a, [
          e[31] || (e[31] = t("span", null, "✓", -1)),
          t("p", null, i(g.value), 1),
          t("button", {
            type: "button",
            "aria-label": "关闭提示",
            onClick: e[1] || (e[1] = (n) => g.value = "")
          }, "×")
        ])) : m("", !0),
        t("div", Ca, [
          t("header", Ma, [
            e[33] || (e[33] = t("div", { class: "auto-list-title" }, [
              t("h2", { id: "schedule-title" }, "自动化")
            ], -1)),
            t("div", xa, [
              t("button", {
                type: "button",
                class: "pill-btn subtle with-icon",
                disabled: y.value,
                onClick: e[2] || (e[2] = (n) => b("createWithPrompt"))
              }, [...e[32] || (e[32] = [
                t("svg", {
                  viewBox: "0 0 16 16",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.35",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "aria-hidden": "true"
                }, [
                  t("path", { d: "M8 2.2l1.1 2.9 2.9 1.1-2.9 1.1L8 10.2 6.9 7.3 4 6.2l2.9-1.1L8 2.2Z" }),
                  t("path", { d: "M12.5 10.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5Z" })
                ], -1),
                t("span", null, "提示词创建", -1)
              ])], 8, La),
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                disabled: !R.value || y.value,
                onClick: e[3] || (e[3] = (n) => We(!1))
              }, " ＋ 新建 ", 8, Sa),
              r.embedded ? m("", !0) : (l(), o("button", {
                key: 0,
                ref_key: "closeButton",
                ref: $e,
                type: "button",
                class: "pill-btn subtle",
                "aria-label": "关闭定时任务",
                onClick: e[4] || (e[4] = (n) => b("close"))
              }, "×", 512))
            ])
          ]),
          !de.value && Q.value ? (l(), o("div", Aa, [...e[34] || (e[34] = [
            t("p", null, "正在读取自动化任务…", -1)
          ])])) : d.value.length ? (l(), o(L, { key: 2 }, [
            t("div", Ra, [
              (l(!0), o(L, null, ne([
                { id: "all", label: "全部", count: le.value.all },
                { id: "pending", label: "等待执行", count: le.value.pending },
                { id: "running", label: "运行中", count: le.value.running },
                { id: "completed", label: "已完成", count: le.value.completed },
                { id: "attention", label: "需关注", count: le.value.attention }
              ], (n) => (l(), o("button", {
                key: n.id,
                type: "button",
                role: "tab",
                "aria-selected": G.value === n.id,
                class: A({ active: G.value === n.id }),
                onClick: (f) => G.value = n.id
              }, [
                j(i(n.label) + " ", 1),
                t("span", Ta, i(n.count), 1)
              ], 10, Ia))), 128)),
              t("button", {
                type: "button",
                class: "tab-refresh",
                disabled: Q.value,
                title: "刷新任务列表",
                onClick: x
              }, "↻", 8, Na)
            ]),
            Ce.value.length ? (l(), o("div", Pa, [
              (l(!0), o(L, null, ne(Ce.value, (n) => (l(), o("article", {
                key: n.id,
                class: "auto-job-card"
              }, [
                t("div", Ha, [
                  t("div", Ba, [
                    t("span", {
                      class: A(["state-dot", n.state])
                    }, null, 2),
                    t("strong", Fa, i(q(n.prompt).head), 1),
                    n.isDefault || n.id === "preset-github-trending-daily" ? (l(), o("span", Ka, "默认")) : m("", !0),
                    t("span", {
                      class: A(["state-badge", n.state])
                    }, i(lt(pt)(n)), 3)
                  ]),
                  q(n.prompt).body !== q(n.prompt).head ? (l(), o("p", Va, i(q(n.prompt).body), 1)) : m("", !0),
                  t("div", Ga, [
                    t("span", Ua, i(Ee(n)), 1),
                    n.kind === "github-trending" ? (l(), o("span", Oa, " GitHub " + i(tt(n.githubConfig?.since)) + " · Top " + i(n.githubConfig?.topN || 10), 1)) : m("", !0),
                    t("span", za, [
                      n.repeat === "daily" ? (l(), o(L, { key: 0 }, [
                        j("↻ 每天 · ")
                      ], 64)) : m("", !0),
                      j(" ◷ " + i(et(n.runAt)), 1)
                    ])
                  ]),
                  n.lastResult ? (l(), o("p", Wa, i(n.lastResult), 1)) : m("", !0)
                ]),
                t("div", Ja, [
                  t("button", {
                    type: "button",
                    title: "打开实时窥屏",
                    onClick: (f) => Ge(n)
                  }, " 窥屏 ", 8, qa),
                  n.peekFrames?.length ? (l(), o("button", {
                    key: 0,
                    type: "button",
                    title: "回放最近一次窥屏轨迹",
                    onClick: (f) => Ue(n)
                  }, " ▶ 回放窥屏 ", 8, Ya)) : m("", !0),
                  n.lastReportContent ? (l(), o("button", {
                    key: 1,
                    type: "button",
                    class: "report-btn",
                    onClick: (f) => B.value = n
                  }, " 📄 查看报告 ", 8, Za)) : m("", !0),
                  t("button", {
                    type: "button",
                    class: "run-now-btn",
                    disabled: !R.value || y.value || n.state === "running",
                    onClick: (f) => Le(n)
                  }, i(z.value === n.id || n.state === "running" ? "运行中…" : "▶ 立即试跑"), 9, Qa),
                  t("button", {
                    type: "button",
                    disabled: !R.value || y.value || n.state === "running",
                    onClick: (f) => Ye(n)
                  }, " 编辑 ", 8, Xa),
                  n.state === "pending" ? (l(), o("button", {
                    key: 2,
                    type: "button",
                    disabled: !R.value || y.value,
                    onClick: (f) => me("pause", n)
                  }, "暂停", 8, ja)) : m("", !0),
                  je(n) ? (l(), o("button", {
                    key: 3,
                    type: "button",
                    disabled: !R.value || y.value,
                    onClick: (f) => me("resume", n)
                  }, "恢复", 8, en)) : m("", !0),
                  t("button", {
                    type: "button",
                    class: "danger",
                    disabled: !R.value || y.value || n.state === "running",
                    onClick: (f) => me("delete", n)
                  }, "删除", 8, tn)
                ])
              ]))), 128))
            ])) : (l(), o("div", Da, [...e[36] || (e[36] = [
              t("p", null, "当前分类暂无自动化任务。", -1)
            ])]))
          ], 64)) : (l(), o("div", Ea, [...e[35] || (e[35] = [
            t("h3", null, "暂无自动化任务", -1),
            t("p", null, "按计划定时运行提示词或 GitHub 榜单助手，执行记录也会显示在这里。", -1)
          ])]))
        ]),
        U.value ? (l(), o("aside", an, [
          t("form", {
            class: "auto-editor-form",
            onSubmit: e[16] || (e[16] = ae((n) => Ze(!1), ["prevent"]))
          }, [
            t("header", nn, [
              t("h3", null, i(W.value ? "编辑自动化任务" : "新建自动化任务"), 1),
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                "aria-label": "关闭抽屉",
                onClick: xe
              }, "×")
            ]),
            t("div", ln, [
              K(t("input", {
                "onUpdate:modelValue": e[5] || (e[5] = (n) => M.value = n),
                type: "text",
                class: "auto-title-input",
                maxlength: "100",
                placeholder: "任务标题（例如：GitHub 今日榜单助手）",
                "aria-label": "自动化任务标题"
              }, null, 512), [
                [oe, M.value]
              ]),
              t("div", sn, [
                t("button", {
                  type: "button",
                  role: "tab",
                  "aria-selected": s.value === "prompt",
                  class: A({ active: s.value === "prompt" }),
                  onClick: e[6] || (e[6] = (n) => s.value = "prompt")
                }, " 💬 定时提示词 ", 10, on),
                t("button", {
                  type: "button",
                  role: "tab",
                  "aria-selected": s.value === "github-trending",
                  class: A({ active: s.value === "github-trending" }),
                  onClick: Je
                }, " 🔥 GitHub 榜单助手 ", 10, un)
              ]),
              t("div", rn, [
                t("div", dn, [
                  t("label", vn, [
                    K(t("select", {
                      "onUpdate:modelValue": e[7] || (e[7] = (n) => $.value = n),
                      "aria-label": "选择执行引擎"
                    }, [
                      e[37] || (e[37] = t("option", { value: "auto" }, "智能自动选择（推荐 · 优先已配模型，未配也能出基础榜单）", -1)),
                      t("option", cn, i(k.value) + " · " + i(w.value || r.model || "未配置模型"), 1),
                      e[38] || (e[38] = t("option", { value: "native-pi" }, "本机 Pi Agent（需本机终端）", -1))
                    ], 512), [
                      [be, $.value]
                    ])
                  ])
                ]),
                t("p", pn, [
                  $.value === "auto" ? (l(), o(L, { key: 0 }, [
                    j(i(H.value ? `将自动使用当前「${k.value}（${w.value || r.model}）」运行。` : u.nativeConnected || I.value ? `将自动使用「${u.nativeAgentLabel || E.value || "本机终端"}」运行。` : s.value === "github-trending" ? "即使暂未配模型，也能先抓取榜单与 README 生成基础简报；配置云端 Key 或 Ollama 后自动升级为 AI 深度点评。" : "将优先使用你配置好的模型服务或本机终端。"), 1)
                  ], 64)) : $.value === "openai-compat" && !H.value ? (l(), o(L, { key: 1 }, [
                    j("请先在「AI 设置 → 模型服务」中选择 DeepSeek / 硅基流动 / Kimi / 智谱 / 百炼 / OpenRouter / 本机 Ollama 并保存。")
                  ], 64)) : $.value === "native-pi" ? (l(), o(L, { key: 2 }, [
                    j("通过本机 Pi CLI 执行，需电脑已安装终端桥接与 Pi。")
                  ], 64)) : (l(), o(L, { key: 3 }, [
                    j("将使用已配置的「" + i(k.value) + "（" + i(w.value || r.model) + "）」按计划执行。", 1)
                  ], 64))
                ])
              ]),
              s.value === "github-trending" ? (l(), o("div", mn, [
                e[43] || (e[43] = t("label", { class: "section-label" }, "GitHub 榜单抓取与分析配置", -1)),
                t("div", gn, [
                  t("div", fn, [
                    e[39] || (e[39] = t("span", { class: "gh-cfg-lbl" }, "读取榜单前 N 个仓库（自选数量）", -1)),
                    t("div", bn, [
                      (l(), o(L, null, ne([5, 10, 15, 20], (n) => t("button", {
                        key: n,
                        type: "button",
                        class: A(["topn-pill", { active: D.value === n }]),
                        onClick: (f) => D.value = n
                      }, " Top " + i(n), 11, yn)), 64)),
                      K(t("input", {
                        "onUpdate:modelValue": e[8] || (e[8] = (n) => D.value = n),
                        type: "number",
                        min: "1",
                        max: "25",
                        class: "topn-input",
                        "aria-label": "自定义抓取数量"
                      }, null, 512), [
                        [
                          oe,
                          D.value,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ])
                  ]),
                  t("div", hn, [
                    e[41] || (e[41] = t("span", { class: "gh-cfg-lbl" }, "榜单范围", -1)),
                    K(t("select", {
                      "onUpdate:modelValue": e[9] || (e[9] = (n) => V.value = n),
                      class: "gh-cfg-select",
                      "aria-label": "榜单周期"
                    }, [...e[40] || (e[40] = [
                      t("option", { value: "daily" }, "今日榜单 (Daily)", -1),
                      t("option", { value: "weekly" }, "本周榜单 (Weekly)", -1),
                      t("option", { value: "monthly" }, "本月榜单 (Monthly)", -1)
                    ])], 512), [
                      [be, V.value]
                    ])
                  ])
                ]),
                t("label", kn, [
                  K(t("input", {
                    "onUpdate:modelValue": e[10] || (e[10] = (n) => Z.value = n),
                    type: "checkbox"
                  }, null, 512), [
                    [Ie, Z.value]
                  ]),
                  e[42] || (e[42] = t("span", null, "分析完成后自动写入「资料库 → 文章（GitHub 每日榜单）」", -1))
                ])
              ])) : m("", !0),
              t("div", $n, [
                e[47] || (e[47] = t("label", { class: "section-label" }, "触发时间", -1)),
                t("div", wn, [
                  t("div", _n, [
                    t("label", Cn, [
                      K(t("select", {
                        "onUpdate:modelValue": e[11] || (e[11] = (n) => N.value = n),
                        "aria-label": "重复周期"
                      }, [...e[44] || (e[44] = [
                        t("option", { value: "daily" }, "每天", -1),
                        t("option", { value: "once" }, "仅一次", -1)
                      ])], 512), [
                        [be, N.value]
                      ]),
                      e[45] || (e[45] = t("span", { class: "chev" }, "⌄", -1))
                    ]),
                    e[46] || (e[46] = t("span", { class: "at-label" }, "于", -1)),
                    N.value === "daily" ? (l(), o("label", Mn, [
                      K(t("input", {
                        "onUpdate:modelValue": e[12] || (e[12] = (n) => O.value = n),
                        type: "time",
                        required: "",
                        "aria-label": "每天执行时间"
                      }, null, 512), [
                        [oe, O.value]
                      ])
                    ])) : (l(), o("label", xn, [
                      K(t("input", {
                        "onUpdate:modelValue": e[13] || (e[13] = (n) => T.value = n),
                        type: "datetime-local",
                        required: "",
                        "aria-label": "单次执行时间"
                      }, null, 512), [
                        [oe, T.value]
                      ])
                    ])),
                    t("span", Ln, i(Oe.value), 1)
                  ])
                ])
              ]),
              t("div", Sn, [
                e[48] || (e[48] = t("label", {
                  class: "section-label",
                  for: "auto-instructions"
                }, "任务指令", -1)),
                K(t("textarea", {
                  id: "auto-instructions",
                  ref_key: "promptInput",
                  ref: pe,
                  "onUpdate:modelValue": e[14] || (e[14] = (n) => _.value = n),
                  class: "instructions-box",
                  maxlength: "10000",
                  rows: "4",
                  placeholder: "描述希望自动化执行的指令内容…"
                }, null, 512), [
                  [oe, _.value]
                ])
              ]),
              t("label", An, [
                K(t("input", {
                  "onUpdate:modelValue": e[15] || (e[15] = (n) => P.value = n),
                  type: "checkbox"
                }, null, 512), [
                  [Ie, P.value]
                ]),
                e[49] || (e[49] = t("span", null, "确认启用（浏览器开启时按本机时间触发；列表上可随时点「▶ 立即试跑」）", -1))
              ])
            ]),
            t("footer", En, [
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                onClick: xe
              }, "取消"),
              t("button", {
                type: "submit",
                class: "pill-btn primary",
                disabled: !_e.value
              }, i(y.value ? "保存中…" : W.value ? "保存修改" : "创建任务"), 9, Rn)
            ])
          ], 32)
        ])) : m("", !0),
        B.value ? (l(), o("aside", In, [
          t("header", Tn, [
            t("div", null, [
              t("strong", null, i(q(B.value.prompt).head), 1),
              t("small", null, i(Ee(B.value)) + " · " + i(B.value.lastResult || "最新生成报告"), 1)
            ]),
            t("div", Nn, [
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                onClick: e[17] || (e[17] = (n) => Xe(B.value.lastReportContent))
              }, i(ce.value ? "✓ 已复制" : "复制全文"), 1),
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                onClick: e[18] || (e[18] = (n) => B.value = null)
              }, "关闭")
            ])
          ]),
          t("div", Dn, [
            st(rt, {
              content: B.value.lastReportContent || ""
            }, null, 8, ["content"])
          ])
        ])) : m("", !0),
        F.value.open ? (l(), ot(fa, {
          key: 6,
          mode: F.value.mode,
          "job-id": F.value.jobId,
          "job-title": F.value.jobTitle,
          "replay-frames": F.value.replayFrames,
          running: !!z.value,
          "backend-stale": ve.value,
          onClose: e[19] || (e[19] = (n) => F.value.open = !1),
          onRunNow: e[20] || (e[20] = (n) => {
            const f = d.value.find((C) => C.id === n);
            f && Le(f);
          }),
          onReloadExtension: Me
        }, null, 8, ["mode", "job-id", "job-title", "replay-frames", "running", "backend-stale"])) : m("", !0),
        h.value.open ? (l(), o("div", {
          key: 7,
          class: "guide-overlay",
          onClick: e[24] || (e[24] = ae((n) => h.value.open = !1, ["self"])),
          onKeydown: e[25] || (e[25] = Te(ae((n) => h.value.open = !1, ["stop"]), ["esc"]))
        }, [
          t("section", {
            class: "guide-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": h.value.title
          }, [
            t("header", Hn, [
              t("h3", null, i(h.value.title), 1),
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                "aria-label": "关闭引导",
                onClick: e[21] || (e[21] = (n) => h.value.open = !1)
              }, "✕")
            ]),
            t("p", Bn, i(h.value.desc), 1),
            t("div", Fn, [
              h.value.job?.kind === "github-trending" ? (l(), o("button", {
                key: 0,
                type: "button",
                class: "pill-btn primary",
                onClick: Qe
              }, i(h.value.reason === "auto-unconfigured" ? "直接抓取并生成基础简报（立即体验）" : "改用智能自动并生成基础简报"), 1)) : m("", !0),
              t("button", {
                type: "button",
                class: A(["pill-btn", { primary: h.value.job?.kind !== "github-trending" }]),
                onClick: e[22] || (e[22] = (n) => Se("deepseek"))
              }, " 配置模型 Key / 本机 Ollama（推荐 · 30 秒可用） ", 2),
              t("button", {
                type: "button",
                class: "pill-btn subtle",
                onClick: e[23] || (e[23] = (n) => Se("native"))
              }, " 配置本机终端引擎（开发者） ")
            ])
          ], 8, Pn)
        ], 32)) : m("", !0)
      ], 8, ya)
    ], 42, ba));
  }
}), Wn = /* @__PURE__ */ Ve(Kn, [["__scopeId", "data-v-feef9792"]]);
export {
  Wn as default
};
