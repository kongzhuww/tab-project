import { d as me, w as ye, B as be, C as fe, o as s, e as o, h as oe, i as e, A as M, t as a, f as b, F as C, g as O, z as Pe, b as _, s as Q, E as Fe, m as pe, l as S, n as V, S as q, v as ie, u as Ve, j as Ne } from "./vendor-vue-BrDsOMg2.js";
import { b as Be } from "./mini-player-store-HSHTqfkQ.js";
import { _ as ke } from "./_plugin-vue_export-helper-Do3lP4W5.js";
const je = "digitalEmployeesV1", Oe = "digitalEmployeeRunsV1", ee = "digitalEmployeeLivePeekV1", he = "tab-project-employee-v1", Re = "live-peek-session-v4", Ue = [
  { id: "bili.source", name: "B站数据源读取", description: "读取稍后再看、指定收藏夹或播放历史视频列表" },
  { id: "bili.info", name: "视频简介与分P工具", description: "允许员工自主调用工具查看完整简介、分区、播放点赞与分P列表" },
  { id: "bili.comments", name: "评论区置顶/热评工具", description: "允许员工自主调用工具查看置顶课代表总结、热评口碑与勘误" },
  { id: "bili.subtitle", name: "字幕分段按需读取工具", description: "允许员工自主按分 P 和页码按需抓取消化字幕全文" },
  { id: "jev.triage", name: "双层快筛路由", description: "先用 Jev / 轻模型做 Noul · Score · Choice 快速分拣" },
  { id: "library.save", name: "沉淀至资料库", description: "将通过阈值的高价值拆解按分类写入「资料库 → 文章」" },
  { id: "notify.high_value", name: "高价值静默通知", description: "生成深度笔记后向工作区通知中心追加提醒" }
];
function ge(d = Date.now()) {
  return {
    id: "emp-bili-curator-default",
    name: "B站分拣研究员",
    role: "后台静默分拣 · 精读沉淀",
    description: "空闲时自动巡检 B 站待看与收藏视频：先过决策漏斗过滤水视频，高价值内容再交由大模型拆解并按分类存进资料库。",
    accentColor: "#6366f1",
    enabled: !1,
    source: {
      kind: "bili-toview",
      folderId: "",
      folderTitle: "稍后再看"
    },
    runtime: {
      analyzer: "deepseek",
      piThinking: "medium",
      decisionMode: "llm-fast",
      jevEndpoint: ""
    },
    prompt: {
      systemPrompt: "你是主人的私人视频情报研究员。你可以根据需要自主决定调用哪些工具查看视频简介、分P、评论区（尤其是置顶课代表总结与热评勘误）或字幕原文；过滤情绪煽动与流水账，重点保留原理、架构、实操步骤和关键数据。如果结合简介、评论和字幕判断这个视频水、不值得精读，也可在最终 JSON 中标记 worth=false 跳过沉淀。",
      reportTemplate: `## 一句话结论

## 核心要点
- ...

## 评论区与补充勘误

## 适合进一步行动的建议`
    },
    skills: ["bili.source", "bili.info", "bili.comments", "bili.subtitle", "jev.triage", "library.save", "notify.high_value"],
    customSkillInstructions: "",
    decisionGate: {
      worthQuestion: "这个视频是否具有清晰的信息增量、方法论或工程实践价值（而非纯情绪吐槽/水时长/标题党）？",
      minScore: 0.65,
      categories: ["AI 与 Agent", "工程与效率", "行业洞察", "娱乐/低信息跳过"],
      skipCategories: ["娱乐/低信息跳过"],
      skipWithoutSubtitle: !1,
      retryOnSkip: !0
    },
    schedulePolicy: {
      intervalMinutes: 20,
      dailyLimit: 8,
      maxFetchItems: 15
    },
    ownerFeedback: [],
    createdAt: d,
    updatedAt: d
  };
}
const Ge = /* @__PURE__ */ new Set([
  "bili.source",
  "bili.info",
  "bili.comments",
  "bili.subtitle",
  "jev.triage",
  "library.save",
  "notify.high_value"
]);
function te(d, m, r, y) {
  const g = Number(d);
  return Number.isFinite(g) ? Math.max(m, Math.min(r, g)) : y;
}
function I(d, m, r = "") {
  return typeof d != "string" ? r : d.trim().slice(0, m);
}
function ze(d) {
  const m = I(d, 300);
  if (!m) return "";
  try {
    const r = new URL(m);
    return r.protocol !== "http:" && r.protocol !== "https:" ? "" : r.toString();
  } catch {
    return "";
  }
}
function we(d, m = Date.now()) {
  if (!d || typeof d != "object")
    throw new Error("员工配置格式无效。");
  const r = d, y = ge(m), g = I(r.name, 48);
  if (!g) throw new Error("请输入员工名称。");
  const N = r.source && typeof r.source == "object" ? r.source : {}, A = N.kind === "bili-fav" || N.kind === "bili-history" ? N.kind : "bili-toview", f = r.runtime && typeof r.runtime == "object" ? r.runtime : {}, T = f.analyzer === "native-pi" ? "native-pi" : "deepseek", E = f.decisionMode === "jev-http" ? "jev-http" : "llm-fast", x = ze(f.jevEndpoint), j = r.prompt && typeof r.prompt == "object" ? r.prompt : {}, D = I(j.systemPrompt, 4e3, y.prompt.systemPrompt), u = I(j.reportTemplate, 2500, y.prompt.reportTemplate), L = Array.isArray(r.skills) ? r.skills : y.skills, i = Array.from(new Set(L.filter((h) => Ge.has(h))));
  i.length || i.push("bili.source", "bili.subtitle");
  const P = r.decisionGate && typeof r.decisionGate == "object" ? r.decisionGate : {}, R = Array.isArray(P.categories) ? P.categories.map((h) => I(h, 32)).filter(Boolean).slice(0, 12) : [], F = R.length ? Array.from(new Set(R)) : [...y.decisionGate.categories], U = Array.isArray(P.skipCategories) ? P.skipCategories.map((h) => I(h, 32)).filter((h) => F.includes(h)) : y.decisionGate.skipCategories.filter((h) => F.includes(h)), B = r.schedulePolicy && typeof r.schedulePolicy == "object" ? r.schedulePolicy : {}, K = (Array.isArray(r.ownerFeedback) ? r.ownerFeedback : []).filter((h) => h && typeof h == "object" && typeof h.title == "string").slice(0, 16).map((h, H) => ({
    id: I(h.id, 64) || `fb-${m}-${H}`,
    title: I(h.title, 120),
    verdict: h.verdict === "skip" ? "skip" : "keep",
    category: I(h.category, 32) || F[0],
    note: I(h.note, 200),
    createdAt: Number.isFinite(h.createdAt) ? h.createdAt : m
  }));
  return {
    id: I(r.id, 64) || `emp-${m}-${Math.random().toString(36).slice(2, 7)}`,
    name: g,
    role: I(r.role, 64, "后台智能助手"),
    description: I(r.description, 240),
    accentColor: /^#[0-9a-fA-F]{6}$/.test(String(r.accentColor || "")) ? String(r.accentColor) : "#6366f1",
    enabled: !!r.enabled,
    source: {
      kind: A,
      folderId: A === "bili-fav" ? I(N.folderId, 64) : "",
      folderTitle: A === "bili-fav" ? I(N.folderTitle, 64) : A === "bili-history" ? "播放历史" : "稍后再看"
    },
    runtime: {
      analyzer: T,
      piModel: I(f.piModel, 120),
      piThinking: ["off", "minimal", "low", "medium", "high", "xhigh", "max"].includes(f.piThinking) ? f.piThinking : "medium",
      decisionMode: E,
      jevEndpoint: x
    },
    prompt: {
      systemPrompt: D,
      reportTemplate: u
    },
    skills: i,
    customSkillInstructions: I(r.customSkillInstructions, 4e3),
    decisionGate: {
      worthQuestion: I(P.worthQuestion, 400, y.decisionGate.worthQuestion),
      minScore: Math.round(te(P.minScore, 0, 1, y.decisionGate.minScore) * 100) / 100,
      categories: F,
      skipCategories: U,
      skipWithoutSubtitle: !!P.skipWithoutSubtitle,
      retryOnSkip: P.retryOnSkip !== void 0 ? !!P.retryOnSkip : !0
    },
    schedulePolicy: {
      intervalMinutes: Math.round(te(B.intervalMinutes, 5, 1440, 20)),
      dailyLimit: Math.round(te(B.dailyLimit, 1, 50, 8)),
      maxFetchItems: Math.round(te(B.maxFetchItems, 1, 40, 15))
    },
    ownerFeedback: K,
    createdAt: Number.isFinite(r.createdAt) ? r.createdAt : m,
    updatedAt: m,
    lastRunAt: Number.isFinite(r.lastRunAt) ? r.lastRunAt : void 0,
    lastError: I(r.lastError, 240) || void 0,
    nextEligibleAt: Number.isFinite(r.nextEligibleAt) ? r.nextEligibleAt : void 0
  };
}
function De(d, m = {}) {
  return {
    format: he,
    exportedAt: m.now ?? Date.now(),
    blueprint: {
      name: d.name,
      role: d.role,
      description: d.description,
      accentColor: d.accentColor,
      source: {
        kind: d.source.kind === "bili-history" ? "bili-history" : "bili-toview",
        folderId: "",
        folderTitle: d.source.kind === "bili-history" ? "播放历史" : "稍后再看"
      },
      runtime: {
        analyzer: d.runtime.analyzer,
        piModel: "",
        piThinking: d.runtime.piThinking || "medium",
        decisionMode: d.runtime.decisionMode,
        jevEndpoint: ""
      },
      prompt: { ...d.prompt },
      skills: [...d.skills],
      customSkillInstructions: d.customSkillInstructions,
      decisionGate: {
        ...d.decisionGate,
        categories: [...d.decisionGate.categories],
        skipCategories: [...d.decisionGate.skipCategories]
      },
      schedulePolicy: { ...d.schedulePolicy },
      ...m.includeFeedbackExamples && d.ownerFeedback.length ? { ownerFeedback: d.ownerFeedback.slice(0, 6).map((r) => ({ ...r })) } : {}
    }
  };
}
function Je(d, m = Date.now()) {
  let r;
  try {
    r = JSON.parse(d);
  } catch {
    throw new Error("员工包文件不是有效的 JSON。");
  }
  if (!r || typeof r != "object")
    throw new Error("员工包内容格式无效。");
  const y = r.format === he && r.blueprint ? r.blueprint : r, g = we(
    {
      ...y,
      id: `emp-${m}-${Math.random().toString(36).slice(2, 7)}`,
      enabled: !1,
      lastRunAt: void 0,
      lastError: void 0,
      nextEligibleAt: void 0
    },
    m
  );
  return g.source.kind === "bili-fav" && !g.source.folderId && (g.source.kind = "bili-toview", g.source.folderTitle = "稍后再看"), g;
}
function ne(d = Date.now()) {
  const m = new Date(d), r = (y) => String(y).padStart(2, "0");
  return `${m.getFullYear()}-${r(m.getMonth() + 1)}-${r(m.getDate())}`;
}
class se extends Error {
  constructor(m = "扩展后台服务暂不可用，请刷新扩展页面后重试。") {
    super(m), this.name = "EmployeeBackendUnavailable";
  }
}
async function z(d, m, r = {}) {
  if (!d?.sendMessage)
    throw new se();
  let y;
  try {
    y = await d.sendMessage({ type: `employee:${m}`, ...r });
  } catch {
    throw new se();
  }
  if (!y || typeof y != "object")
    throw new se();
  if (!y.ok)
    throw new Error(typeof y.error == "string" && y.error ? y.error : "后台数字员工操作未确认。");
  return y.result;
}
const Ke = {
  class: "peek-window",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "数字员工实时窥屏监视器"
}, Ye = { class: "peek-win-bar" }, He = { class: "peek-win-left" }, We = {
  key: 0,
  class: "peek-action-text"
}, Qe = { class: "peek-win-controls" }, qe = ["disabled"], Xe = { class: "peek-step-count" }, Ze = {
  key: 0,
  class: "peek-stale-bar",
  role: "alert"
}, et = {
  key: 1,
  class: "peek-empty"
}, tt = ["disabled"], lt = {
  key: 2,
  class: "peek-workspace"
}, it = { class: "sim-address-bar" }, nt = { class: "sim-url" }, st = { class: "sim-body" }, ot = { class: "sim-sidebar" }, at = {
  class: "sim-state-box",
  "data-peek-target": "decision-badge"
}, rt = {
  key: 0,
  class: "sim-save-chip",
  "data-peek-target": "library-save"
}, ut = { class: "sim-canvas" }, dt = { class: "sim-section-head" }, ct = { class: "sim-video-grid" }, vt = ["data-peek-target"], pt = { class: "sim-cover-wrap" }, mt = ["src"], yt = { class: "sim-dur" }, bt = ["title"], ft = { class: "sim-v-up" }, kt = { class: "sim-video-banner" }, ht = ["src"], gt = { class: "sim-banner-info" }, wt = { class: "sim-banner-meta" }, _t = { key: 0 }, $t = {
  key: 0,
  class: "sim-banner-stats"
}, St = { class: "sim-tabs" }, Ct = { class: "sim-tab-panel" }, Et = {
  key: 0,
  class: "sim-info-panel",
  "data-peek-target": "info-desc"
}, xt = {
  key: 0,
  class: "sim-pages"
}, Mt = { class: "sim-desc" }, It = {
  key: 1,
  class: "sim-comments-panel",
  "data-peek-target": "comments-list"
}, Lt = {
  key: 0,
  class: "sim-loading-note"
}, At = { class: "sim-comment-head" }, Tt = {
  key: 0,
  class: "sim-top-tag"
}, Pt = { class: "sim-likes" }, Ft = {
  key: 2,
  class: "sim-subtitle-panel",
  "data-peek-target": "subtitle-lines"
}, Vt = {
  key: 0,
  class: "sim-loading-note"
}, Nt = {
  key: 0,
  class: "sim-verdict-bar"
}, Bt = { class: "peek-cursor-tag" }, jt = {
  class: "peek-timeline",
  "aria-label": "行为轨迹"
}, Ot = {
  key: 0,
  class: "peek-tl-list"
}, Rt = ["onClick"], Ut = { class: "peek-tl-idx" }, Gt = { class: "peek-tl-label" }, zt = {
  key: 1,
  class: "peek-tl-list"
}, Dt = { class: "peek-tl-idx" }, Jt = { class: "peek-tl-label" }, Kt = { class: "peek-tl-label" }, Yt = /* @__PURE__ */ me({
  __name: "LivePeekModal",
  props: {
    mode: {},
    employeeId: {},
    employeeName: {},
    replayFrames: {},
    running: { type: Boolean },
    backendStale: { type: Boolean }
  },
  emits: ["close", "runNow", "reloadExtension"],
  setup(d, { emit: m }) {
    const r = d, y = m, g = _(null), N = _(null), A = _([]), f = _(0), T = _(!0);
    let E = null, x = null;
    const j = _({ x: 80, y: 80, visible: !1 }), D = _(0), u = Q(() => {
      if (r.mode === "replay") {
        const v = r.replayFrames || [];
        return v.length ? v[Math.min(f.value, v.length - 1)] || v[0] : null;
      }
      return N.value;
    }), L = Q(() => {
      const v = u.value?.timelineSteps;
      return Array.isArray(v) && v.length ? v : A.value.length ? A.value : u.value?.cursorLabel ? [u.value.cursorLabel] : [];
    }), i = Q(() => {
      const v = u.value?.phase;
      return v === "comments" ? "comments" : v === "subtitle" ? "subtitle" : "info";
    });
    function P(v) {
      const c = Math.max(0, Math.floor(Number(v || 0))), p = Math.floor(c / 60), w = c % 60;
      return `${p}:${String(w).padStart(2, "0")}`;
    }
    function R(v) {
      const c = Number(v || 0);
      return c >= 1e4 ? `${(c / 1e4).toFixed(1)}万` : String(c);
    }
    async function F() {
      await Fe();
      const v = g.value, c = u.value;
      if (!v || !c) {
        j.value.visible = !1;
        return;
      }
      const p = v.getBoundingClientRect(), w = v.querySelector(`[data-peek-target="${c.cursorTarget}"]`);
      if (!w) {
        j.value = { x: Math.round(p.width * 0.45), y: Math.round(p.height * 0.42), visible: !0 };
        return;
      }
      const G = w.getBoundingClientRect(), W = Math.max(16, Math.min(p.width - 140, G.left - p.left + Math.min(G.width * 0.42, 110))), Z = Math.max(16, Math.min(p.height - 36, G.top - p.top + Math.min(G.height * 0.48, 52)));
      j.value = { x: Math.round(W), y: Math.round(Z), visible: !0 }, D.value++;
    }
    ye(u, () => {
      F();
    }, { immediate: !0, deep: !0 });
    function U() {
      E && (clearInterval(E), E = null);
    }
    function B() {
      if (U(), r.mode !== "replay") return;
      const v = r.replayFrames || [];
      v.length <= 1 || (E = setInterval(() => {
        T.value && (f.value < v.length - 1 ? f.value++ : T.value = !1);
      }, 1500));
    }
    function X() {
      const v = r.replayFrames || [];
      v.length && (!T.value && f.value >= v.length - 1 && (f.value = 0), T.value = !T.value);
    }
    function K(v) {
      if (!v || r.employeeId && v.employeeId !== r.employeeId) return;
      const c = N.value;
      c && c.updatedAt === v.updatedAt && c.bvid === v.bvid && c.cursorTarget === v.cursorTarget && c.cursorLabel === v.cursorLabel && c.active === v.active && (c.toolHistory?.length || 0) === (v.toolHistory?.length || 0) && (c.timelineSteps?.length || 0) === (v.timelineSteps?.length || 0) || (v.phase === "source" && v.cursorTarget === "folder" ? A.value = v.cursorLabel ? [v.cursorLabel] : [] : v.cursorLabel && A.value[A.value.length - 1] !== v.cursorLabel && (A.value = [...A.value.slice(-19), v.cursorLabel]), N.value = v);
    }
    async function Y() {
      if (!(r.mode !== "live" || typeof chrome > "u" || !chrome.storage?.local))
        try {
          const v = await chrome.storage.local.get(ee);
          K(v?.[ee]);
        } catch {
        }
    }
    function h(v, c) {
      r.mode !== "live" || c !== "local" || !v[ee] || K(v[ee].newValue);
    }
    function H(v) {
      v.key === "Escape" && (v.stopPropagation(), y("close"));
    }
    return be(() => {
      document.addEventListener("keydown", H), window.addEventListener("resize", F), r.mode === "live" ? (Y(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(h), x = setInterval(() => {
        Y();
      }, 400)) : (f.value = 0, T.value = !0, B()), F();
    }), fe(() => {
      U(), x && (clearInterval(x), x = null), document.removeEventListener("keydown", H), window.removeEventListener("resize", F), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(h);
    }), (v, c) => (s(), o("div", {
      class: "peek-overlay",
      onClick: c[4] || (c[4] = oe((p) => y("close"), ["self"]))
    }, [
      e("section", Ke, [
        e("header", Ye, [
          e("div", He, [
            e("span", {
              class: M(["peek-status-badge", { live: d.mode === "live" && u.value?.active }])
            }, [
              c[5] || (c[5] = e("i", { class: "peek-status-dot" }, null, -1)),
              e("span", null, a(d.mode === "live" ? u.value?.active ? "LIVE 实况窥屏" : "最近一次实况" : "历史轨迹回放"), 1)
            ], 2),
            e("strong", null, a(u.value?.employeeName || d.employeeName || "数字员工"), 1),
            u.value ? (s(), o("span", We, a(u.value.cursorLabel), 1)) : b("", !0)
          ]),
          e("div", Qe, [
            d.mode === "live" && d.employeeId ? (s(), o("button", {
              key: 0,
              type: "button",
              class: "peek-ctl-btn",
              disabled: d.running || !!u.value?.active,
              onClick: c[0] || (c[0] = (p) => y("runNow", d.employeeId))
            }, a(d.running || u.value?.active ? "执行中…" : "▶ 立即试跑 1 条"), 9, qe)) : b("", !0),
            d.mode === "replay" && (d.replayFrames?.length || 0) > 1 ? (s(), o(C, { key: 1 }, [
              e("button", {
                type: "button",
                class: "peek-ctl-btn",
                onClick: X
              }, a(T.value ? "暂停" : f.value >= (d.replayFrames?.length || 1) - 1 ? "重播" : "继续"), 1),
              e("span", Xe, a(f.value + 1) + " / " + a(d.replayFrames?.length), 1)
            ], 64)) : b("", !0),
            e("button", {
              type: "button",
              class: "peek-close-btn",
              "aria-label": "关闭监视器",
              onClick: c[1] || (c[1] = (p) => y("close"))
            }, "×")
          ])
        ]),
        d.mode === "live" && d.backendStale ? (s(), o("div", Ze, [
          c[6] || (c[6] = e("span", null, "检测到扩展后台 `background.js` 尚未重载，当前不会推送实时窥屏画面。", -1)),
          e("button", {
            type: "button",
            class: "peek-ctl-btn",
            onClick: c[2] || (c[2] = (p) => y("reloadExtension"))
          }, "🔄 立即热重载扩展")
        ])) : b("", !0),
        u.value ? (s(), o("div", lt, [
          e("div", {
            ref_key: "stageRef",
            ref: g,
            class: "peek-stage"
          }, [
            e("div", it, [
              c[9] || (c[9] = e("span", { class: "sim-lock" }, "Bilibili · 插件视野仿真", -1)),
              e("span", nt, a(u.value.bvid ? `bilibili.com/video/${u.value.bvid}` : `bilibili.com · ${u.value.sourceTitle}`), 1)
            ]),
            e("div", st, [
              e("aside", ot, [
                c[13] || (c[13] = e("div", { class: "sim-side-label" }, "数据源", -1)),
                e("div", {
                  class: M(["sim-folder-item", { active: u.value.phase === "source" }]),
                  "data-peek-target": "folder"
                }, [
                  c[10] || (c[10] = e("span", { class: "sim-folder-dot" }, null, -1)),
                  e("span", null, a(u.value.sourceTitle), 1)
                ], 2),
                c[14] || (c[14] = e("div", {
                  class: "sim-side-label",
                  style: { "margin-top": "10px" }
                }, "工作状态", -1)),
                e("div", at, [
                  u.value.verdict ? (s(), o(C, { key: 0 }, [
                    e("strong", {
                      class: M({ ok: u.value.verdict.worth, skip: !u.value.verdict.worth })
                    }, a(u.value.verdict.worth ? "推荐沉淀" : "判定跳过"), 3),
                    e("span", null, a(u.value.verdict.category) + " · " + a(Math.round(u.value.verdict.score * 100)) + "分", 1)
                  ], 64)) : (s(), o(C, { key: 1 }, [
                    c[11] || (c[11] = e("strong", null, "自主探索中", -1)),
                    c[12] || (c[12] = e("span", null, "按需调用工具研判", -1))
                  ], 64))
                ]),
                u.value.phase === "done" || u.value.cursorTarget === "library-save" ? (s(), o("div", rt, " ✓ 已写入资料库 ")) : b("", !0)
              ]),
              e("main", ut, [
                u.value.phase === "source" || !u.value.activeVideo ? (s(), o(C, { key: 0 }, [
                  e("div", dt, [
                    e("strong", null, a(u.value.sourceTitle), 1),
                    e("small", null, "扫描前 " + a(u.value.sourceVideos.length) + " 条候选视频", 1)
                  ]),
                  e("div", ct, [
                    (s(!0), o(C, null, O(u.value.sourceVideos, (p) => (s(), o("div", {
                      key: p.bvid,
                      class: M(["sim-video-card", { picked: p.bvid === u.value.bvid }]),
                      "data-peek-target": p.bvid === u.value.bvid ? "video-card" : void 0
                    }, [
                      e("div", pt, [
                        p.cover ? (s(), o("img", {
                          key: 0,
                          src: p.cover,
                          alt: ""
                        }, null, 8, mt)) : b("", !0),
                        e("span", yt, a(P(p.duration)), 1)
                      ]),
                      e("div", {
                        class: "sim-v-title",
                        title: p.title
                      }, a(p.title), 9, bt),
                      e("div", ft, a(p.author), 1)
                    ], 10, vt))), 128))
                  ])
                ], 64)) : (s(), o(C, { key: 1 }, [
                  e("div", kt, [
                    u.value.activeVideo.cover ? (s(), o("img", {
                      key: 0,
                      class: "sim-banner-cover",
                      src: u.value.activeVideo.cover,
                      alt: ""
                    }, null, 8, ht)) : b("", !0),
                    e("div", gt, [
                      e("h4", null, a(u.value.activeVideo.title), 1),
                      e("div", wt, [
                        e("span", null, "UP：" + a(u.value.activeVideo.author), 1),
                        u.value.activeVideo.tname ? (s(), o("span", _t, a(u.value.activeVideo.tname), 1)) : b("", !0),
                        e("span", null, a(u.value.activeVideo.bvid), 1)
                      ]),
                      u.value.activeVideo.stat ? (s(), o("div", $t, [
                        e("span", null, "播放 " + a(R(u.value.activeVideo.stat.view)), 1),
                        e("span", null, "点赞 " + a(R(u.value.activeVideo.stat.like)), 1),
                        e("span", null, "投币 " + a(R(u.value.activeVideo.stat.coin)), 1),
                        e("span", null, "收藏 " + a(R(u.value.activeVideo.stat.favorite)), 1)
                      ])) : b("", !0)
                    ])
                  ]),
                  e("div", St, [
                    e("span", {
                      class: M(["sim-tab", { active: i.value === "info" }]),
                      "data-peek-target": "tab-info"
                    }, "简介与分P", 2),
                    e("span", {
                      class: M(["sim-tab", { active: i.value === "comments" }]),
                      "data-peek-target": "tab-comments"
                    }, "评论区", 2),
                    e("span", {
                      class: M(["sim-tab", { active: i.value === "subtitle" }]),
                      "data-peek-target": "tab-subtitle"
                    }, "字幕正文", 2)
                  ]),
                  e("div", Ct, [
                    i.value === "info" ? (s(), o("div", Et, [
                      u.value.activeVideo.pages?.length ? (s(), o("div", xt, [
                        (s(!0), o(C, null, O(u.value.activeVideo.pages, (p) => (s(), o("span", {
                          key: p.page,
                          class: "sim-page-pill"
                        }, " P" + a(p.page) + " " + a(p.part || "正片"), 1))), 128))
                      ])) : b("", !0),
                      e("p", Mt, a(u.value.activeVideo.desc || "正在获取视频简介内容…"), 1)
                    ])) : i.value === "comments" ? (s(), o("div", It, [
                      u.value.comments?.length ? b("", !0) : (s(), o("div", Lt, "正在拉取 UP 主置顶与高赞评论…")),
                      (s(!0), o(C, null, O(u.value.comments, (p, w) => (s(), o("div", {
                        key: w,
                        class: M(["sim-comment-row", { pinned: p.isTop }])
                      }, [
                        e("div", At, [
                          p.isTop ? (s(), o("span", Tt, "📌 置顶")) : b("", !0),
                          e("strong", null, a(p.author), 1),
                          e("span", Pt, "👍 " + a(p.likes), 1)
                        ]),
                        e("p", null, a(p.message), 1)
                      ], 2))), 128))
                    ])) : (s(), o("div", Ft, [
                      u.value.subtitleLines?.length ? b("", !0) : (s(), o("div", Vt, "正在加载 WBI 字幕轨道…")),
                      (s(!0), o(C, null, O(u.value.subtitleLines, (p, w) => (s(), o("div", {
                        key: w,
                        class: "sim-sub-line"
                      }, a(p), 1))), 128))
                    ]))
                  ]),
                  u.value.verdict ? (s(), o("div", Nt, [
                    e("strong", null, a(u.value.verdict.category) + " · " + a(Math.round(u.value.verdict.score * 100)) + "分", 1),
                    e("span", null, a(u.value.verdict.reason), 1)
                  ])) : b("", !0)
                ], 64))
              ])
            ]),
            j.value.visible ? (s(), o("div", {
              key: 0,
              class: "peek-cursor",
              style: Pe({ transform: `translate3d(${j.value.x}px, ${j.value.y}px, 0)` })
            }, [
              (s(), o("span", {
                key: D.value,
                class: "peek-cursor-ripple"
              })),
              c[15] || (c[15] = e("svg", {
                class: "peek-cursor-arrow",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                e("path", {
                  d: "M4.5 3.5l14.5 7.2-6.2 1.8-3.1 5.9L4.5 3.5z",
                  fill: "#6366f1",
                  stroke: "#ffffff",
                  "stroke-width": "1.6",
                  "stroke-linejoin": "round"
                })
              ], -1)),
              e("span", Bt, a(u.value.cursorLabel), 1)
            ], 4)) : b("", !0)
          ], 512),
          e("aside", jt, [
            c[17] || (c[17] = e("div", { class: "peek-tl-head" }, "AI 行为时间轴", -1)),
            d.mode === "replay" && d.replayFrames?.length ? (s(), o("div", Ot, [
              (s(!0), o(C, null, O(d.replayFrames, (p, w) => (s(), o("button", {
                key: w,
                type: "button",
                class: M(["peek-tl-item", { active: w === f.value, done: w < f.value }]),
                onClick: (G) => {
                  f.value = w, T.value = !1;
                }
              }, [
                e("span", Ut, a(w + 1), 1),
                e("span", Gt, a(p.cursorLabel), 1)
              ], 10, Rt))), 128))
            ])) : (s(), o("div", zt, [
              (s(!0), o(C, null, O(L.value, (p, w) => (s(), o("div", {
                key: `tl-${w}`,
                class: M(["peek-tl-item", w === L.value.length - 1 ? "active" : "done"])
              }, [
                e("span", Dt, a(w === L.value.length - 1 && u.value.active ? "•" : w + 1), 1),
                e("span", Jt, a(p), 1)
              ], 2))), 128)),
              (s(!0), o(C, null, O(u.value.toolHistory, (p, w) => (s(), o("div", {
                key: w,
                class: "peek-tl-item done"
              }, [
                c[16] || (c[16] = e("span", { class: "peek-tl-idx" }, "✓", -1)),
                e("span", Kt, a(p.summary), 1)
              ]))), 128))
            ]))
          ])
        ])) : (s(), o("div", et, [
          c[7] || (c[7] = e("h3", null, "暂无可展示的窥屏实况", -1)),
          c[8] || (c[8] = e("p", null, "请点击下方「立即试跑 1 条」或开启后台巡检，员工读取收藏夹、视频简介、评论区与字幕的每一步动作都会在这里实时呈现。", -1)),
          d.mode === "live" && d.employeeId ? (s(), o("button", {
            key: 0,
            type: "button",
            class: "peek-ctl-btn",
            style: { "margin-top": "12px" },
            disabled: d.running,
            onClick: c[3] || (c[3] = (p) => y("runNow", d.employeeId))
          }, a(d.running ? "执行中…" : "▶ 立即试跑 1 条"), 9, tt)) : b("", !0)
        ]))
      ])
    ]));
  }
}), Ht = /* @__PURE__ */ ke(Yt, [["__scopeId", "data-v-d141b927"]]), Wt = {
  class: "emp-shell",
  "aria-label": "数字员工工作台"
}, Qt = { class: "emp-header" }, qt = { class: "emp-title-group" }, Xt = { class: "emp-stats-pill" }, Zt = { class: "emp-head-actions" }, el = { class: "emp-body" }, tl = { class: "emp-main" }, ll = {
  key: 0,
  class: "emp-banner stale",
  role: "alert"
}, il = {
  key: 1,
  class: "emp-banner error",
  role: "alert"
}, nl = {
  key: 2,
  class: "emp-banner notice",
  role: "status"
}, sl = {
  key: 3,
  class: "emp-empty"
}, ol = {
  key: 4,
  class: "emp-empty"
}, al = {
  key: 5,
  class: "emp-grid"
}, rl = ["onClick"], ul = { class: "emp-card-top" }, dl = { class: "emp-card-name-wrap" }, cl = ["title"], vl = { class: "emp-card-role" }, pl = ["aria-checked", "title", "disabled", "onClick"], ml = { class: "emp-card-desc" }, yl = { class: "emp-card-chips" }, bl = { class: "emp-chip sky" }, fl = { class: "emp-chip indigo" }, kl = { class: "emp-chip neutral" }, hl = { class: "emp-chip neutral" }, gl = ["title"], wl = { class: "emp-card-stat" }, _l = { class: "emp-card-btns" }, $l = ["disabled", "onClick"], Sl = ["onClick"], Cl = ["onClick"], El = ["onClick"], xl = {
  key: 0,
  class: "emp-drawer",
  "aria-label": "编辑数字员工"
}, Ml = { class: "emp-drawer-head" }, Il = { class: "emp-drawer-title-wrap" }, Ll = {
  class: "emp-drawer-tabs",
  role: "tablist"
}, Al = { class: "emp-drawer-body" }, Tl = { class: "emp-field" }, Pl = { class: "emp-field" }, Fl = { class: "emp-field" }, Vl = { class: "emp-row-2" }, Nl = { class: "emp-field" }, Bl = { class: "emp-field" }, jl = {
  key: 0,
  class: "emp-field"
}, Ol = { class: "emp-label-inline" }, Rl = ["disabled"], Ul = ["value"], Gl = {
  key: 1,
  class: "emp-row-2"
}, zl = { class: "emp-field" }, Dl = { class: "emp-field" }, Jl = { class: "emp-row-3" }, Kl = { class: "emp-field" }, Yl = { class: "emp-field" }, Hl = { class: "emp-field" }, Wl = { class: "emp-check-row" }, Ql = { class: "emp-field" }, ql = {
  key: 0,
  class: "emp-field"
}, Xl = { class: "emp-field" }, Zl = { class: "emp-field" }, ei = { class: "emp-label-inline" }, ti = { class: "emp-field" }, li = { class: "emp-field" }, ii = { class: "emp-check-row" }, ni = { class: "emp-check-row" }, si = { class: "emp-field" }, oi = { class: "emp-skill-list" }, ai = ["checked", "onChange"], ri = { class: "emp-field" }, ui = { class: "emp-field" }, di = { class: "emp-field" }, ci = { class: "emp-field" }, vi = { class: "emp-label-inline" }, pi = {
  key: 0,
  class: "emp-sub-empty"
}, mi = {
  key: 1,
  class: "emp-fb-list"
}, yi = ["title"], bi = { class: "emp-fb-cat" }, fi = ["onClick"], ki = { class: "emp-logs-head" }, hi = {
  key: 0,
  class: "emp-sub-empty"
}, gi = {
  key: 1,
  class: "emp-run-list"
}, wi = { class: "emp-run-top" }, _i = { class: "emp-run-cat" }, $i = { class: "emp-run-time" }, Si = ["title"], Ci = { class: "emp-run-reason" }, Ei = {
  key: 0,
  class: "emp-run-trace"
}, xi = { class: "emp-run-foot" }, Mi = { class: "emp-run-links" }, Ii = ["onClick"], Li = ["href"], Ai = {
  key: 0,
  class: "emp-run-fb-btns"
}, Ti = ["onClick"], Pi = ["onClick"], Fi = { class: "emp-drawer-foot" }, Vi = { class: "emp-drawer-foot-right" }, Ni = ["disabled"], Bi = /* @__PURE__ */ me({
  __name: "EmployeesPanel",
  props: {
    active: { type: Boolean }
  },
  emits: ["openLibrary"],
  setup(d, { emit: m }) {
    const r = d, y = m, g = _([]), N = _([]), A = _(!0), f = _(""), T = _(!1), E = _(""), x = _(""), j = _(!1), D = _(null), u = _(!1), L = _("runtime"), i = _(null), P = _(""), R = _(""), F = _([]), U = _(!1), B = _({ open: !1, mode: "live" });
    function X(n) {
      B.value = {
        open: !0,
        mode: "live",
        employeeId: n.id,
        employeeName: n.name
      };
    }
    function K(n, t) {
      B.value = {
        open: !0,
        mode: "replay",
        employeeId: n.employeeId,
        employeeName: t,
        replayFrames: n.peekFrames || []
      };
    }
    const Y = Q(() => ne()), h = Q(() => g.value.filter((n) => n.enabled).length), H = Q(
      () => N.value.filter((n) => n.status !== "error" && ne(n.createdAt) === Y.value).length
    );
    function v(n) {
      return N.value.filter((t) => t.employeeId === n);
    }
    function c(n) {
      let t = 0, l = 0;
      const k = Y.value;
      for (const $ of N.value)
        $.employeeId !== n || ne($.createdAt) !== k || ($.status === "analyzed" ? t++ : ($.status === "skipped-gate" || $.status === "skipped-no-sub") && l++);
      return { analyzed: t, skipped: l };
    }
    async function p() {
      A.value = !0, x.value = "";
      try {
        const n = await z(
          typeof chrome > "u" ? null : chrome.runtime,
          "list"
        );
        g.value = Array.isArray(n?.employees) ? n.employees : [], N.value = Array.isArray(n?.runs) ? n.runs : [], j.value = typeof chrome < "u" && n?.workerStamp !== Re;
      } catch (n) {
        x.value = n instanceof Error ? n.message : "读取数字员工失败。";
      } finally {
        A.value = !1;
      }
    }
    function w() {
      typeof chrome < "u" && chrome.runtime?.reload && chrome.runtime.reload();
    }
    async function G() {
      if (!U.value) {
        U.value = !0;
        try {
          const n = await Be.getCreatedFolders();
          F.value = (n || []).map((t) => ({
            id: String(t.id),
            title: String(t.title || "未命名收藏夹"),
            count: Number(t.media_count || 0)
          }));
        } catch {
          F.value = [];
        } finally {
          U.value = !1;
        }
      }
    }
    function W(n, t = "runtime") {
      i.value = JSON.parse(JSON.stringify(n)), P.value = n.decisionGate.categories.join(", "), R.value = n.decisionGate.skipCategories.join(", "), L.value = t, u.value = !0, F.value.length || G();
    }
    function Z() {
      const n = ge();
      n.id = `emp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, n.name = `数字员工 #${g.value.length + 1}`, W(n, "runtime");
    }
    function ae() {
      u.value = !1, i.value = null;
    }
    function _e(n) {
      if (!i.value) return;
      const t = i.value.skills.indexOf(n);
      t >= 0 ? i.value.skills.splice(t, 1) : i.value.skills.push(n);
    }
    function $e() {
      if (!i.value) return;
      const n = F.value.find((t) => t.id === i.value?.source.folderId);
      n && (i.value.source.folderTitle = n.title);
    }
    async function Se() {
      if (!(!i.value || T.value)) {
        T.value = !0, x.value = "", E.value = "";
        try {
          const n = P.value.split(/[,，\n]+/).map(($) => $.trim()).filter(Boolean), t = R.value.split(/[,，\n]+/).map(($) => $.trim()).filter(Boolean);
          i.value.decisionGate.categories = n.length ? n : ["AI 与 Agent", "工程与效率", "行业洞察", "娱乐/低信息跳过"], i.value.decisionGate.skipCategories = t.filter(($) => i.value.decisionGate.categories.includes($));
          const l = we(i.value), k = await z(
            typeof chrome > "u" ? null : chrome.runtime,
            "save",
            { employee: l }
          );
          i.value = JSON.parse(JSON.stringify(k)), E.value = `已保存员工「${k.name}」配置。`, await p();
        } catch (n) {
          x.value = n instanceof Error ? n.message : "保存员工配置失败。";
        } finally {
          T.value = !1;
        }
      }
    }
    async function Ce(n) {
      if (!f.value) {
        f.value = n.id, x.value = "", E.value = "";
        try {
          const t = !n.enabled;
          await z(typeof chrome > "u" ? null : chrome.runtime, "toggle", {
            id: n.id,
            enabled: t
          }), E.value = t ? `已开启「${n.name}」后台自动巡检。` : `已暂停「${n.name}」后台巡检。`, await p();
        } catch (t) {
          x.value = t instanceof Error ? t.message : "切换状态失败。";
        } finally {
          f.value = "";
        }
      }
    }
    async function re(n) {
      if (!f.value) {
        f.value = n.id, x.value = "", E.value = `「${n.name}」正在抓取并分拣 1 条视频…`;
        try {
          const t = await z(
            typeof chrome > "u" ? null : chrome.runtime,
            "run-one",
            { id: n.id }
          );
          if (E.value = t?.message || "试跑完成。", await p(), u.value && i.value?.id === n.id) {
            const l = g.value.find((k) => k.id === n.id);
            l && (i.value = JSON.parse(JSON.stringify(l)));
          }
        } catch (t) {
          x.value = t instanceof Error ? t.message : "试跑执行失败。", E.value = "", await p();
        } finally {
          f.value = "";
        }
      }
    }
    async function Ee(n) {
      if (window.confirm(`确定删除数字员工「${n.name}」及其运行记录吗？资料库已沉淀的文章不会被删除。`))
        try {
          await z(typeof chrome > "u" ? null : chrome.runtime, "delete", { id: n.id }), i.value?.id === n.id && ae(), E.value = `已删除员工「${n.name}」。`, await p();
        } catch (t) {
          x.value = t instanceof Error ? t.message : "删除失败。";
        }
    }
    function ue(n) {
      const t = De(n), l = new Blob([JSON.stringify(t, null, 2)], { type: "application/json;charset=utf-8" }), k = URL.createObjectURL(l), $ = document.createElement("a"), J = n.name.replace(/[^\w\u4e00-\u9fa5-]+/g, "_") || "employee";
      $.href = k, $.download = `${J}.tab-agent.json`, document.body.appendChild($), $.click(), document.body.removeChild($), URL.revokeObjectURL(k), E.value = `已导出分享包「${J}.tab-agent.json」（已自动脱敏私人收藏夹 ID 与反馈记忆）。`;
    }
    function xe() {
      D.value?.click();
    }
    function Me(n) {
      const t = n.target, l = t.files?.[0];
      if (!l) return;
      const k = new FileReader();
      k.onload = async ($) => {
        try {
          const J = String($.target?.result || ""), le = Je(J);
          await z(typeof chrome > "u" ? null : chrome.runtime, "save", {
            employee: le
          }), await p(), W(le, "runtime"), E.value = `已导入员工「${le.name}」，请确认数据源与模型后开启巡检。`;
        } catch (J) {
          x.value = J instanceof Error ? J.message : "导入失败，请检查文件格式。";
        } finally {
          t.value = "";
        }
      }, k.readAsText(l);
    }
    async function de(n, t) {
      if (i.value)
        try {
          const l = await z(
            typeof chrome > "u" ? null : chrome.runtime,
            "feedback",
            {
              employeeId: i.value.id,
              title: n.title,
              verdict: t,
              category: n.category,
              note: t === "keep" ? "主人标记为有价值" : "主人标记为低价值跳过"
            }
          );
          i.value = JSON.parse(JSON.stringify(l)), E.value = t === "keep" ? "已记住：类似内容优先精读。" : "已记住：类似内容以后直接跳过。", await p();
        } catch (l) {
          x.value = l instanceof Error ? l.message : "记录反馈失败。";
        }
    }
    function Ie(n) {
      i.value && (i.value.ownerFeedback = i.value.ownerFeedback.filter((t) => t.id !== n));
    }
    async function Le(n) {
      try {
        await z(typeof chrome > "u" ? null : chrome.runtime, "clear-history", { id: n }), await p(), E.value = "已清空该员工的去重与运行历史。";
      } catch (t) {
        x.value = t instanceof Error ? t.message : "清空失败。";
      }
    }
    function Ae(n) {
      return n.source.kind === "bili-history" ? "播放历史" : n.source.kind === "bili-fav" ? n.source.folderTitle || "指定收藏夹" : "稍后再看";
    }
    function Te(n) {
      return n === "analyzed" ? "已精读" : n === "skipped-gate" ? "快筛跳过" : n === "skipped-no-sub" ? "无字幕" : "异常";
    }
    function ce(n) {
      return n ? new Date(n).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "尚未运行";
    }
    function ve(n, t) {
      t === "local" && (n[je] || n[Oe]) && p();
    }
    return ye(
      () => r.active,
      (n) => {
        n && p();
      }
    ), be(() => {
      p(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(ve);
    }), fe(() => {
      typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(ve);
    }), (n, t) => (s(), o("section", Wt, [
      e("header", Qt, [
        e("div", qt, [
          t[34] || (t[34] = e("h2", null, "数字员工", -1)),
          e("span", Xt, "巡检中 " + a(h.value) + " / " + a(g.value.length) + " · 今日处理 " + a(H.value) + " 条", 1)
        ]),
        e("div", Zt, [
          e("button", {
            type: "button",
            class: "emp-pill-btn subtle",
            onClick: xe
          }, [...t[35] || (t[35] = [
            e("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.4",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "aria-hidden": "true"
            }, [
              e("path", { d: "M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3" })
            ], -1),
            e("span", null, "导入员工", -1)
          ])]),
          e("input", {
            ref_key: "importFileInput",
            ref: D,
            type: "file",
            accept: ".json",
            style: { display: "none" },
            onChange: Me
          }, null, 544),
          e("button", {
            type: "button",
            class: "emp-pill-btn primary",
            onClick: Z
          }, [...t[36] || (t[36] = [
            e("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.6",
              "stroke-linecap": "round",
              "aria-hidden": "true"
            }, [
              e("path", { d: "M8 3v10M3 8h10" })
            ], -1),
            e("span", null, "新建员工", -1)
          ])])
        ])
      ]),
      e("div", el, [
        e("div", tl, [
          j.value ? (s(), o("div", ll, [
            t[37] || (t[37] = e("span", null, "检测到扩展后台服务脚本尚未更新（仅刷新了页面），实况窥屏与自动重试需重启后台服务后生效。", -1)),
            e("button", {
              type: "button",
              class: "emp-mini-btn",
              onClick: w
            }, "🔄 立即热重载扩展")
          ])) : b("", !0),
          x.value ? (s(), o("p", il, a(x.value), 1)) : b("", !0),
          E.value ? (s(), o("p", nl, a(E.value), 1)) : b("", !0),
          A.value && !g.value.length ? (s(), o("div", sl, "正在加载数字员工…")) : g.value.length ? (s(), o("div", al, [
            (s(!0), o(C, null, O(g.value, (l) => (s(), o("article", {
              key: l.id,
              class: M(["emp-card", { active: u.value && i.value?.id === l.id, running: f.value === l.id }]),
              onClick: (k) => W(l, "runtime")
            }, [
              e("div", ul, [
                e("div", dl, [
                  e("h3", {
                    class: "emp-card-name",
                    title: l.name
                  }, a(l.name), 9, cl),
                  e("span", vl, a(l.role), 1)
                ]),
                e("button", {
                  type: "button",
                  class: M(["emp-switch", { on: l.enabled }]),
                  role: "switch",
                  "aria-checked": l.enabled,
                  title: l.enabled ? "已启用后台巡检（点击暂停）" : "已暂停（点击开启后台自动巡检）",
                  disabled: f.value === l.id,
                  onClick: oe((k) => Ce(l), ["stop"])
                }, [...t[40] || (t[40] = [
                  e("span", { class: "emp-switch-knob" }, null, -1)
                ])], 10, pl)
              ]),
              e("p", ml, a(l.description || "按自定义规则与 Skills 自动分拣处理数据。"), 1),
              e("div", yl, [
                e("span", bl, a(Ae(l)), 1),
                e("span", fl, a(l.runtime.decisionMode === "jev-http" ? "Jev 端点" : "快筛漏斗"), 1),
                e("span", kl, a(l.runtime.analyzer === "native-pi" ? "本机 Pi" : "DeepSeek"), 1),
                e("span", hl, a(l.skills.length) + " Skills", 1)
              ]),
              l.lastError ? (s(), o("div", {
                key: 0,
                class: "emp-card-err",
                title: l.lastError
              }, "异常：" + a(l.lastError), 9, gl)) : b("", !0),
              e("div", {
                class: "emp-card-foot",
                onClick: t[0] || (t[0] = oe(() => {
                }, ["stop"]))
              }, [
                e("div", wl, [
                  e("i", {
                    class: M(["emp-dot", { on: l.enabled, err: !!l.lastError }])
                  }, null, 2),
                  e("span", null, "今日 " + a(c(l.id).analyzed) + " 精读 / " + a(c(l.id).skipped) + " 跳过", 1)
                ]),
                e("div", _l, [
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn",
                    disabled: !!f.value,
                    title: "立即抓取 1 条未处理视频试跑",
                    onClick: (k) => re(l)
                  }, a(f.value === l.id ? "运行中…" : "试跑 1 条"), 9, $l),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "打开仿真实况窥屏窗口",
                    onClick: (k) => X(l)
                  }, "窥屏", 8, Sl),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "导出脱敏员工包分享给别人",
                    onClick: (k) => ue(l)
                  }, "导出", 8, Cl),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "编辑配置与查看运行记录",
                    onClick: (k) => W(l, "runtime")
                  }, "配置", 8, El)
                ])
              ])
            ], 10, rl))), 128))
          ])) : (s(), o("div", ol, [
            t[38] || (t[38] = e("h3", null, "还没有数字员工", -1)),
            t[39] || (t[39] = e("p", null, [
              pe("创建一个驻留后台的员工，或导入他人分享的 "),
              e("code", null, ".tab-agent.json"),
              pe(" 员工包。")
            ], -1)),
            e("button", {
              type: "button",
              class: "emp-pill-btn primary",
              onClick: Z
            }, "新建第一个员工")
          ]))
        ]),
        u.value && i.value ? (s(), o("aside", xl, [
          e("header", Ml, [
            e("div", Il, [
              e("h3", null, a(i.value.name || "未命名员工"), 1),
              e("small", null, "最近运行：" + a(ce(i.value.lastRunAt)), 1)
            ]),
            e("button", {
              type: "button",
              class: "emp-close-btn",
              "aria-label": "关闭抽屉",
              onClick: ae
            }, "×")
          ]),
          e("nav", Ll, [
            e("button", {
              type: "button",
              class: M({ active: L.value === "runtime" }),
              onClick: t[1] || (t[1] = (l) => L.value = "runtime")
            }, "基础与来源", 2),
            e("button", {
              type: "button",
              class: M({ active: L.value === "skills" }),
              onClick: t[2] || (t[2] = (l) => L.value = "skills")
            }, "Jev 与 Skills", 2),
            e("button", {
              type: "button",
              class: M({ active: L.value === "prompts" }),
              onClick: t[3] || (t[3] = (l) => L.value = "prompts")
            }, "提示词与记忆", 2),
            e("button", {
              type: "button",
              class: M({ active: L.value === "logs" }),
              onClick: t[4] || (t[4] = (l) => L.value = "logs")
            }, "运行记录 (" + a(v(i.value.id).length) + ")", 3)
          ]),
          e("div", Al, [
            L.value === "runtime" ? (s(), o(C, { key: 0 }, [
              e("div", Tl, [
                t[41] || (t[41] = e("label", null, "员工名称", -1)),
                S(e("input", {
                  "onUpdate:modelValue": t[5] || (t[5] = (l) => i.value.name = l),
                  type: "text",
                  maxlength: "48",
                  placeholder: "例如：B站分拣研究员"
                }, null, 512), [
                  [V, i.value.name]
                ])
              ]),
              e("div", Pl, [
                t[42] || (t[42] = e("label", null, "定位标签", -1)),
                S(e("input", {
                  "onUpdate:modelValue": t[6] || (t[6] = (l) => i.value.role = l),
                  type: "text",
                  maxlength: "64",
                  placeholder: "例如：后台静默分拣 · 精读沉淀"
                }, null, 512), [
                  [V, i.value.role]
                ])
              ]),
              e("div", Fl, [
                t[43] || (t[43] = e("label", null, "职责简述", -1)),
                S(e("textarea", {
                  "onUpdate:modelValue": t[7] || (t[7] = (l) => i.value.description = l),
                  rows: "2",
                  maxlength: "240"
                }, null, 512), [
                  [V, i.value.description]
                ])
              ]),
              e("div", Vl, [
                e("div", Nl, [
                  t[45] || (t[45] = e("label", null, "B 站数据源", -1)),
                  S(e("select", {
                    "onUpdate:modelValue": t[8] || (t[8] = (l) => i.value.source.kind = l)
                  }, [...t[44] || (t[44] = [
                    e("option", { value: "bili-toview" }, "稍后再看", -1),
                    e("option", { value: "bili-fav" }, "指定 B 站收藏夹", -1),
                    e("option", { value: "bili-history" }, "播放历史", -1)
                  ])], 512), [
                    [q, i.value.source.kind]
                  ])
                ]),
                e("div", Bl, [
                  t[47] || (t[47] = e("label", null, "精读分析引擎", -1)),
                  S(e("select", {
                    "onUpdate:modelValue": t[9] || (t[9] = (l) => i.value.runtime.analyzer = l)
                  }, [...t[46] || (t[46] = [
                    e("option", { value: "deepseek" }, "DeepSeek API", -1),
                    e("option", { value: "native-pi" }, "本机 Pi Agent", -1)
                  ])], 512), [
                    [q, i.value.runtime.analyzer]
                  ])
                ])
              ]),
              i.value.source.kind === "bili-fav" ? (s(), o("div", jl, [
                e("div", Ol, [
                  t[48] || (t[48] = e("label", null, "选择收藏夹（导出分享时自动脱敏）", -1)),
                  e("button", {
                    type: "button",
                    class: "emp-link-btn",
                    disabled: U.value,
                    onClick: G
                  }, a(U.value ? "读取中…" : "刷新收藏夹"), 9, Rl)
                ]),
                S(e("select", {
                  "onUpdate:modelValue": t[10] || (t[10] = (l) => i.value.source.folderId = l),
                  onChange: $e
                }, [
                  t[49] || (t[49] = e("option", { value: "" }, "请选择收藏夹…", -1)),
                  (s(!0), o(C, null, O(F.value, (l) => (s(), o("option", {
                    key: l.id,
                    value: l.id
                  }, a(l.title) + " (" + a(l.count) + ")", 9, Ul))), 128))
                ], 544), [
                  [q, i.value.source.folderId]
                ])
              ])) : b("", !0),
              i.value.runtime.analyzer === "native-pi" ? (s(), o("div", Gl, [
                e("div", zl, [
                  t[50] || (t[50] = e("label", null, "指定 Pi 模型（留空跟随默认）", -1)),
                  S(e("input", {
                    "onUpdate:modelValue": t[11] || (t[11] = (l) => i.value.runtime.piModel = l),
                    type: "text",
                    placeholder: "如 openai-codex/gpt-6.1-sol"
                  }, null, 512), [
                    [V, i.value.runtime.piModel]
                  ])
                ]),
                e("div", Dl, [
                  t[52] || (t[52] = e("label", null, "思考强度", -1)),
                  S(e("select", {
                    "onUpdate:modelValue": t[12] || (t[12] = (l) => i.value.runtime.piThinking = l)
                  }, [...t[51] || (t[51] = [
                    e("option", { value: "off" }, "关闭", -1),
                    e("option", { value: "low" }, "低", -1),
                    e("option", { value: "medium" }, "中", -1),
                    e("option", { value: "high" }, "高", -1)
                  ])], 512), [
                    [q, i.value.runtime.piThinking]
                  ])
                ])
              ])) : b("", !0),
              e("div", Jl, [
                e("div", Kl, [
                  t[53] || (t[53] = e("label", null, "巡检间隔 (分)", -1)),
                  S(e("input", {
                    "onUpdate:modelValue": t[13] || (t[13] = (l) => i.value.schedulePolicy.intervalMinutes = l),
                    type: "number",
                    min: "5",
                    max: "1440"
                  }, null, 512), [
                    [
                      V,
                      i.value.schedulePolicy.intervalMinutes,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("div", Yl, [
                  t[54] || (t[54] = e("label", null, "每日上限 (条)", -1)),
                  S(e("input", {
                    "onUpdate:modelValue": t[14] || (t[14] = (l) => i.value.schedulePolicy.dailyLimit = l),
                    type: "number",
                    min: "1",
                    max: "50"
                  }, null, 512), [
                    [
                      V,
                      i.value.schedulePolicy.dailyLimit,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("div", Hl, [
                  t[55] || (t[55] = e("label", null, "每次扫前 N 条", -1)),
                  S(e("input", {
                    "onUpdate:modelValue": t[15] || (t[15] = (l) => i.value.schedulePolicy.maxFetchItems = l),
                    type: "number",
                    min: "1",
                    max: "40"
                  }, null, 512), [
                    [
                      V,
                      i.value.schedulePolicy.maxFetchItems,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ])
              ]),
              e("label", Wl, [
                S(e("input", {
                  "onUpdate:modelValue": t[16] || (t[16] = (l) => i.value.enabled = l),
                  type: "checkbox"
                }, null, 512), [
                  [ie, i.value.enabled]
                ]),
                t[56] || (t[56] = e("span", null, "启用后台自动巡检（每次仅温柔处理 1 条未读视频，不主动弹窗打扰）", -1))
              ])
            ], 64)) : L.value === "skills" ? (s(), o(C, { key: 1 }, [
              e("div", Ql, [
                t[58] || (t[58] = e("label", null, "System 1 前置分拣引擎", -1)),
                S(e("select", {
                  "onUpdate:modelValue": t[17] || (t[17] = (l) => i.value.runtime.decisionMode = l)
                }, [...t[57] || (t[57] = [
                  e("option", { value: "llm-fast" }, "快速轻量判断（内置 JSON Noul · Score · Choice）", -1),
                  e("option", { value: "jev-http" }, "外部 Jev 决策模型端点（HTTP JSON API）", -1)
                ])], 512), [
                  [q, i.value.runtime.decisionMode]
                ])
              ]),
              i.value.runtime.decisionMode === "jev-http" ? (s(), o("div", ql, [
                t[59] || (t[59] = e("label", null, "Jev HTTP 接口地址（支持本地 http://127.0.0.1:...）", -1)),
                S(e("input", {
                  "onUpdate:modelValue": t[18] || (t[18] = (l) => i.value.runtime.jevEndpoint = l),
                  type: "url",
                  placeholder: "http://127.0.0.1:8787/decide"
                }, null, 512), [
                  [V, i.value.runtime.jevEndpoint]
                ])
              ])) : b("", !0),
              e("div", Xl, [
                t[60] || (t[60] = e("label", null, "价值是非判断问题（Noul）", -1)),
                S(e("textarea", {
                  "onUpdate:modelValue": t[19] || (t[19] = (l) => i.value.decisionGate.worthQuestion = l),
                  rows: "2"
                }, null, 512), [
                  [V, i.value.decisionGate.worthQuestion]
                ])
              ]),
              e("div", Zl, [
                e("div", ei, [
                  e("label", null, "精读最低分阈值（Score ≥ " + a(i.value.decisionGate.minScore.toFixed(2)) + "）", 1)
                ]),
                S(e("input", {
                  "onUpdate:modelValue": t[20] || (t[20] = (l) => i.value.decisionGate.minScore = l),
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.05"
                }, null, 512), [
                  [
                    V,
                    i.value.decisionGate.minScore,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              e("div", ti, [
                t[61] || (t[61] = e("label", null, "分类标签选项（Choice，逗号隔开，同时作为资料库文章分类）", -1)),
                S(e("input", {
                  "onUpdate:modelValue": t[21] || (t[21] = (l) => P.value = l),
                  type: "text",
                  placeholder: "AI 与 Agent, 工程与效率, 行业洞察, 娱乐/低信息跳过"
                }, null, 512), [
                  [V, P.value]
                ])
              ]),
              e("div", li, [
                t[62] || (t[62] = e("label", null, "命中后直接跳过的分类（逗号隔开）", -1)),
                S(e("input", {
                  "onUpdate:modelValue": t[22] || (t[22] = (l) => R.value = l),
                  type: "text",
                  placeholder: "娱乐/低信息跳过"
                }, null, 512), [
                  [V, R.value]
                ])
              ]),
              e("label", ii, [
                S(e("input", {
                  "onUpdate:modelValue": t[23] || (t[23] = (l) => i.value.decisionGate.skipWithoutSubtitle = l),
                  type: "checkbox"
                }, null, 512), [
                  [ie, i.value.decisionGate.skipWithoutSubtitle]
                ]),
                t[63] || (t[63] = e("span", null, "无字幕视频自动跳过（避免无根据编造内容，节省 Token）", -1))
              ]),
              e("label", ni, [
                S(e("input", {
                  "onUpdate:modelValue": t[24] || (t[24] = (l) => i.value.decisionGate.retryOnSkip = l),
                  type: "checkbox"
                }, null, 512), [
                  [ie, i.value.decisionGate.retryOnSkip]
                ]),
                t[64] || (t[64] = e("span", null, "跳过的任务自动重来一轮（继续抓取下一条候选视频，默认打开）", -1))
              ]),
              e("div", si, [
                t[65] || (t[65] = e("label", null, "员工挂载 Skills 能力权限", -1)),
                e("div", oi, [
                  (s(!0), o(C, null, O(Ve(Ue), (l) => (s(), o("label", {
                    key: l.id,
                    class: "emp-skill-item"
                  }, [
                    e("input", {
                      type: "checkbox",
                      checked: i.value.skills.includes(l.id),
                      onChange: (k) => _e(l.id)
                    }, null, 40, ai),
                    e("div", null, [
                      e("strong", null, a(l.name), 1),
                      e("small", null, a(l.description), 1)
                    ])
                  ]))), 128))
                ])
              ]),
              e("div", ri, [
                t[66] || (t[66] = e("label", null, "自定义 Skill 补充规则（随员工包导出分享）", -1)),
                S(e("textarea", {
                  "onUpdate:modelValue": t[25] || (t[25] = (l) => i.value.customSkillInstructions = l),
                  rows: "3",
                  placeholder: "例如：如果视频提到 GitHub 开源项目，必须在总结末尾单独列出仓库要点。"
                }, null, 512), [
                  [V, i.value.customSkillInstructions]
                ])
              ])
            ], 64)) : L.value === "prompts" ? (s(), o(C, { key: 2 }, [
              e("div", ui, [
                t[67] || (t[67] = e("label", null, "员工核心提示词 (System Prompt)", -1)),
                S(e("textarea", {
                  "onUpdate:modelValue": t[26] || (t[26] = (l) => i.value.prompt.systemPrompt = l),
                  rows: "5"
                }, null, 512), [
                  [V, i.value.prompt.systemPrompt]
                ])
              ]),
              e("div", di, [
                t[68] || (t[68] = e("label", null, "沉淀笔记输出模板 (Markdown)", -1)),
                S(e("textarea", {
                  "onUpdate:modelValue": t[27] || (t[27] = (l) => i.value.prompt.reportTemplate = l),
                  rows: "5",
                  class: "mono"
                }, null, 512), [
                  [V, i.value.prompt.reportTemplate]
                ])
              ]),
              e("div", ci, [
                e("div", vi, [
                  e("label", null, "主人纠偏偏好记忆 (" + a(i.value.ownerFeedback.length) + ")", 1),
                  t[69] || (t[69] = e("small", { style: { color: "var(--muted,#94a3b8)", "font-size": "11px" } }, "导出分享时默认剥离保护隐私", -1))
                ]),
                i.value.ownerFeedback.length ? (s(), o("div", mi, [
                  (s(!0), o(C, null, O(i.value.ownerFeedback, (l) => (s(), o("div", {
                    key: l.id,
                    class: "emp-fb-row"
                  }, [
                    e("span", {
                      class: M(["emp-fb-tag", l.verdict])
                    }, a(l.verdict === "keep" ? "优先精读" : "跳过"), 3),
                    e("span", {
                      class: "emp-fb-title",
                      title: l.title
                    }, a(l.title), 9, yi),
                    e("span", bi, a(l.category), 1),
                    e("button", {
                      type: "button",
                      class: "emp-fb-del",
                      title: "移除样本",
                      onClick: (k) => Ie(l.id)
                    }, "×", 8, fi)
                  ]))), 128))
                ])) : (s(), o("div", pi, " 在「运行记录」里对判断结果点「标记有价值」或「以后跳过」，员工会自动学会你的口味。 "))
              ])
            ], 64)) : (s(), o(C, { key: 3 }, [
              e("div", ki, [
                t[70] || (t[70] = e("span", null, "仅展示最近执行轨迹，已分析/跳过的 BV 号不会重复处理。", -1)),
                v(i.value.id).length ? (s(), o("button", {
                  key: 0,
                  type: "button",
                  class: "emp-link-btn",
                  onClick: t[28] || (t[28] = (l) => Le(i.value.id))
                }, " 清空记录 ")) : b("", !0)
              ]),
              v(i.value.id).length ? (s(), o("div", gi, [
                (s(!0), o(C, null, O(v(i.value.id), (l) => (s(), o("article", {
                  key: l.id,
                  class: "emp-run-card"
                }, [
                  e("div", wi, [
                    e("span", {
                      class: M(["emp-run-badge", l.status])
                    }, a(Te(l.status)), 3),
                    e("span", _i, a(l.category) + " · " + a(Math.round(l.score * 100)) + "分", 1),
                    e("span", $i, a(ce(l.createdAt)), 1)
                  ]),
                  e("div", {
                    class: "emp-run-title",
                    title: l.title
                  }, a(l.title), 9, Si),
                  e("p", Ci, a(l.reason), 1),
                  l.toolTrace?.length ? (s(), o("div", Ei, [
                    (s(!0), o(C, null, O(l.toolTrace, (k, $) => (s(), o("span", {
                      key: $,
                      class: M(["emp-trace-pill", { fail: !k.ok }])
                    }, a(k.summary), 3))), 128))
                  ])) : b("", !0),
                  e("div", xi, [
                    e("div", Mi, [
                      l.peekFrames?.length ? (s(), o("button", {
                        key: 0,
                        type: "button",
                        class: "emp-link-btn",
                        onClick: (k) => K(l, i.value.name)
                      }, " ▶ 回放窥屏 ", 8, Ii)) : b("", !0),
                      l.url ? (s(), o("a", {
                        key: 1,
                        href: l.url,
                        target: "_blank",
                        rel: "noreferrer"
                      }, "原视频 ↗", 8, Li)) : b("", !0),
                      l.articleId ? (s(), o("button", {
                        key: 2,
                        type: "button",
                        class: "emp-link-btn",
                        onClick: t[29] || (t[29] = (k) => y("openLibrary"))
                      }, "去资料库看笔记 →")) : b("", !0)
                    ]),
                    l.bvid !== "-" ? (s(), o("div", Ai, [
                      e("button", {
                        type: "button",
                        onClick: (k) => de(l, "keep")
                      }, "✓ 记为重要", 8, Ti),
                      e("button", {
                        type: "button",
                        onClick: (k) => de(l, "skip")
                      }, "✕ 以后跳过", 8, Pi)
                    ])) : b("", !0)
                  ])
                ]))), 128))
              ])) : (s(), o("div", hi, " 还没有运行流水。你可以点击卡片上的「试跑 1 条」立刻体验，或开启巡检开关。 "))
            ], 64))
          ]),
          e("footer", Fi, [
            e("button", {
              type: "button",
              class: "emp-pill-btn danger-text",
              onClick: t[30] || (t[30] = (l) => Ee(i.value))
            }, "删除"),
            e("div", Vi, [
              e("button", {
                type: "button",
                class: "emp-pill-btn subtle",
                onClick: t[31] || (t[31] = (l) => ue(i.value))
              }, "导出分享"),
              e("button", {
                type: "button",
                class: "emp-pill-btn primary",
                disabled: T.value,
                onClick: Se
              }, a(T.value ? "保存中…" : "保存配置"), 9, Ni)
            ])
          ])
        ])) : b("", !0)
      ]),
      B.value.open ? (s(), Ne(Ht, {
        key: 0,
        mode: B.value.mode,
        "employee-id": B.value.employeeId,
        "employee-name": B.value.employeeName,
        "replay-frames": B.value.replayFrames,
        running: !!f.value,
        "backend-stale": j.value,
        onClose: t[32] || (t[32] = (l) => B.value.open = !1),
        onRunNow: t[33] || (t[33] = (l) => {
          const k = g.value.find(($) => $.id === l);
          k && re(k);
        }),
        onReloadExtension: w
      }, null, 8, ["mode", "employee-id", "employee-name", "replay-frames", "running", "backend-stale"])) : b("", !0)
    ]));
  }
}), Ui = /* @__PURE__ */ ke(Bi, [["__scopeId", "data-v-6060dc05"]]);
export {
  Ui as default
};
