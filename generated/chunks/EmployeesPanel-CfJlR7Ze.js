import { d as et, w as ke, o as tt, G as ot, f as a, g as n, k as Se, h as e, q as O, t as d, j as k, F as j, i as Q, n as Xe, b as M, s as W, x as Vt, l as Ve, T as Ot, u as pe, I as He, B as be, A as he, p as te, v as le, M as Le, m as Ze, y as ao, L as mt } from "./vendor-vue-C-_ocEUS.js";
import { b as no } from "./github.service-BkChs4sP.js";
import { _ as at, o as lo } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { u as Ut } from "./useWindowDraggable-Cp-ZR95L.js";
import "./window-manager.store-BoJtJrk7.js";
/* empty css                                                                        */
/* empty css                                                                             */
import { L as _e } from "./LauncherTileContent-BVdCmBbe.js";
const io = "digitalEmployeesV1", so = "digitalEmployeeRunsV1", we = "digitalEmployeeLivePeekV1", jt = "tab-project-employee-v1", ro = "organizer-approval-safe-v6", uo = [
  { id: "bili.source", name: "B站数据源读取", description: "读取稍后再看、指定收藏夹或播放历史视频列表" },
  { id: "bili.info", name: "视频简介与分P工具", description: "允许员工自主调用工具查看完整简介、分区、播放点赞与分P列表" },
  { id: "bili.comments", name: "评论区置顶/热评工具", description: "允许员工自主调用工具查看置顶课代表总结、热评口碑与勘误" },
  { id: "bili.subtitle", name: "字幕分段按需读取工具", description: "允许员工自主按分 P 和页码按需抓取消化字幕全文" },
  { id: "jev.triage", name: "双层快筛路由", description: "先用 Jev / 轻模型做 Noul · Score · Choice 快速分拣" },
  { id: "library.save", name: "沉淀至资料库", description: "将通过阈值的高价值拆解按分类写入「资料库 → 文章」" },
  { id: "notify.high_value", name: "高价值静默通知", description: "生成深度笔记后向工作区通知中心追加提醒" },
  { id: "bookmarks.read", name: "浏览器书签树读取", description: "只读读取 Chrome 书签栏与其他书签目录树用于分类盘点" },
  { id: "launcher.read", name: "桌面分区与网站读取", description: "只读读取新标签页分区、大/小文件夹、嵌套层级与网站卡片" },
  { id: "organizer.plan", name: "整理提案（审批后生效）", description: "输出分步桌面/书签整理提案，每一步需用户点击审核后才写入" },
  { id: "site.recall", name: "记忆找站与推荐", description: "根据模糊记忆描述在书签与桌面网站中召回匹配项，未找到时推荐外部入口" }
];
function Dt(v = Date.now()) {
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
    createdAt: v,
    updatedAt: v
  };
}
function Gt(v = Date.now()) {
  return {
    id: "emp-workspace-organizer-default",
    name: "桌面与书签整理专员",
    role: "盘点书签与本地网站 · 提案逐条审批",
    description: "只读盘点桌面分区、大文件夹/小文件夹、嵌套层级、常用网站与浏览器书签；每一步在右侧点击确认后才生效，不自动修改。",
    accentColor: "#0ea5e9",
    enabled: !1,
    source: {
      kind: "workspace-organizer",
      folderId: "",
      folderTitle: "本地桌面网站 + 浏览器书签"
    },
    runtime: {
      analyzer: "deepseek",
      piThinking: "medium",
      decisionMode: "llm-fast",
      jevEndpoint: ""
    },
    prompt: {
      systemPrompt: [
        "你是主人的「桌面网站与浏览器书签整理专员」。必须先分清三类核心对象：",
        "1. 桌面分区（Partition / launcherPages）：新标签页顶部的场景分页（最多 12 个字，如「默认」「AI 工具」「开发工作」）。",
        "2. 桌面文件夹（Folder）：建在指定分区下，也可嵌套在已有文件夹（parentFolderName）里。只有两档尺寸：",
        "   - large（大文件夹）：2x2 展示区（可直览最多 9 个网站小图标），放高频常用组；",
        "   - small（小文件夹）：1x1 紧凑图标（内含 2x2 缩略图标），可放在分区根层或嵌套在父文件夹内部。",
        "3. 浏览器原生书签（Chrome Bookmarks）：适合长尾资料、参考文章与归档链接；仅把每天高频直达的优质书签推荐提升到桌面分区（promote_bookmark_to_launcher），其余散落书签在书签栏文件夹里归类（create_bookmark_folder / move_bookmark）。",
        "所有操作先提交提案。优先利用已有文件夹；允许改名、移除目录层和合并目录，保留其中的网站、书签和子文件夹。"
      ].join(`
`),
      reportTemplate: "先说明整体规划思路，再输出有序 JSON 步骤供主人在右侧待办清单逐一点击确认。"
    },
    skills: ["bookmarks.read", "launcher.read", "organizer.plan"],
    customSkillInstructions: "",
    decisionGate: {
      worthQuestion: "哪些散落网站和书签需要归类到清晰的新分区、大文件夹或小文件夹？",
      minScore: 0.5,
      categories: ["桌面分区", "桌面文件夹与层级", "常用网站归类", "书签归档"],
      skipCategories: [],
      skipWithoutSubtitle: !1,
      retryOnSkip: !1
    },
    schedulePolicy: {
      intervalMinutes: 1440,
      dailyLimit: 10,
      maxFetchItems: 40
    },
    ownerFeedback: [],
    createdAt: v,
    updatedAt: v
  };
}
function qt(v = Date.now()) {
  return {
    id: "emp-site-finder-default",
    name: "记忆找站专员",
    role: "模糊描述找站 · 未果智能推荐",
    description: "根据你的零碎记忆描述，先用 Jev/本地召回漏斗从常用网站与书签中快速筛出候选，再由大模型精准推理匹配；若未找到，主动推荐可靠的外部网站入口。",
    accentColor: "#8b5cf6",
    enabled: !1,
    source: {
      kind: "site-finder",
      folderId: "",
      folderTitle: "本地桌面网站 + 浏览器书签"
    },
    runtime: {
      analyzer: "deepseek",
      piThinking: "medium",
      decisionMode: "llm-fast",
      jevEndpoint: ""
    },
    prompt: {
      systemPrompt: [
        "你是主人的「记忆找站专员」。主人经常只记得一个网站的大致用途、外观特征、领域或零碎英文关键词，需要你帮他从已收藏的常用网站和浏览器书签里找回来。",
        "工作方式：",
        "1. 系统会先通过 Jev / 关键词多路召回漏斗初筛出最相关的候选清单；请你结合语义、域名联想和所在文件夹分类，找出 1~5 个最可能的站内命中（matches），说明匹配依据。",
        "2. 绝对不要编造站内原本不存在的 id 或链接。",
        "3. 如果站内候选都不太符合（foundInLibrary = false），或需要补充更顺手的替代工具，请在 recommendations 中推荐 2~4 个真实可靠的知名官方网站/工具入口（必须是明确可访问的 https 网址）。"
      ].join(`
`),
      reportTemplate: "输出严格 JSON，包含 summary、foundInLibrary、matches 与 recommendations。"
    },
    skills: ["bookmarks.read", "launcher.read", "jev.triage", "site.recall"],
    customSkillInstructions: "",
    decisionGate: {
      worthQuestion: "哪些本地网站或书签最符合主人的模糊记忆描述？若没有，推荐哪些外部入口？",
      minScore: 0.45,
      categories: ["站内精准找回", "站内近似候选", "外部推荐入口"],
      skipCategories: [],
      skipWithoutSubtitle: !1,
      retryOnSkip: !1
    },
    schedulePolicy: {
      intervalMinutes: 1440,
      dailyLimit: 50,
      maxFetchItems: 45
    },
    ownerFeedback: [],
    createdAt: v,
    updatedAt: v
  };
}
const co = /* @__PURE__ */ new Set([
  "bili.source",
  "bili.info",
  "bili.comments",
  "bili.subtitle",
  "jev.triage",
  "library.save",
  "notify.high_value",
  "bookmarks.read",
  "launcher.read",
  "organizer.plan",
  "site.recall"
]);
function Qe(v, w, c, _) {
  const y = Number(v);
  return Number.isFinite(y) ? Math.max(w, Math.min(c, y)) : _;
}
function ne(v, w, c = "") {
  return typeof v != "string" ? c : v.trim().slice(0, w);
}
function po(v) {
  const w = ne(v, 300);
  if (!w) return "";
  try {
    const c = new URL(w);
    return c.protocol !== "http:" && c.protocol !== "https:" ? "" : c.toString();
  } catch {
    return "";
  }
}
function Jt(v, w = Date.now()) {
  if (!v || typeof v != "object")
    throw new Error("员工配置格式无效。");
  const c = v, _ = c.source?.kind === "workspace-organizer" ? Gt(w) : c.source?.kind === "site-finder" ? qt(w) : Dt(w), y = ne(c.name, 48);
  if (!y) throw new Error("请输入员工名称。");
  const L = c.source && typeof c.source == "object" ? c.source : {}, F = L.kind === "bili-fav" || L.kind === "bili-history" || L.kind === "workspace-organizer" || L.kind === "site-finder" ? L.kind : "bili-toview", S = c.runtime && typeof c.runtime == "object" ? c.runtime : {}, U = S.analyzer === "native-pi" ? "native-pi" : "deepseek", G = S.decisionMode === "jev-http" ? "jev-http" : "llm-fast", q = po(S.jevEndpoint), J = c.prompt && typeof c.prompt == "object" ? c.prompt : {}, D = ne(J.systemPrompt, 4e3, _.prompt.systemPrompt), f = ne(J.reportTemplate, 2500, _.prompt.reportTemplate), Y = Array.isArray(c.skills) ? c.skills : _.skills, i = Array.from(new Set(Y.filter((m) => co.has(m))));
  i.length || (F === "workspace-organizer" || F === "site-finder" ? i.push(..._.skills) : i.push("bili.source", "bili.subtitle"));
  const P = c.decisionGate && typeof c.decisionGate == "object" ? c.decisionGate : {}, g = Array.isArray(P.categories) ? P.categories.map((m) => ne(m, 32)).filter(Boolean).slice(0, 12) : [], K = g.length ? Array.from(new Set(g)) : [..._.decisionGate.categories], C = Array.isArray(P.skipCategories) ? P.skipCategories.map((m) => ne(m, 32)).filter((m) => K.includes(m)) : _.decisionGate.skipCategories.filter((m) => K.includes(m)), z = c.schedulePolicy && typeof c.schedulePolicy == "object" ? c.schedulePolicy : {}, b = (Array.isArray(c.ownerFeedback) ? c.ownerFeedback : []).filter((m) => m && typeof m == "object" && typeof m.title == "string").slice(0, 16).map((m, X) => ({
    id: ne(m.id, 64) || `fb-${w}-${X}`,
    title: ne(m.title, 120),
    verdict: m.verdict === "skip" ? "skip" : "keep",
    category: ne(m.category, 32) || K[0],
    note: ne(m.note, 200),
    createdAt: Number.isFinite(m.createdAt) ? m.createdAt : w
  }));
  return {
    id: ne(c.id, 64) || `emp-${w}-${Math.random().toString(36).slice(2, 7)}`,
    name: y,
    role: ne(c.role, 64, "后台智能助手"),
    description: ne(c.description, 240),
    accentColor: /^#[0-9a-fA-F]{6}$/.test(String(c.accentColor || "")) ? String(c.accentColor) : "#6366f1",
    enabled: !!c.enabled,
    source: {
      kind: F,
      folderId: F === "bili-fav" ? ne(L.folderId, 64) : "",
      folderTitle: F === "bili-fav" ? ne(L.folderTitle, 64) : F === "bili-history" ? "播放历史" : F === "workspace-organizer" ? "本地桌面网站 + 浏览器书签" : "稍后再看"
    },
    runtime: {
      analyzer: U,
      piModel: ne(S.piModel, 120),
      piThinking: ["off", "minimal", "low", "medium", "high", "xhigh", "max"].includes(S.piThinking) ? S.piThinking : "medium",
      decisionMode: G,
      jevEndpoint: q
    },
    prompt: {
      systemPrompt: D,
      reportTemplate: f
    },
    skills: i,
    customSkillInstructions: ne(c.customSkillInstructions, 4e3),
    decisionGate: {
      worthQuestion: ne(P.worthQuestion, 400, _.decisionGate.worthQuestion),
      minScore: Math.round(Qe(P.minScore, 0, 1, _.decisionGate.minScore) * 100) / 100,
      categories: K,
      skipCategories: C,
      skipWithoutSubtitle: !!P.skipWithoutSubtitle,
      retryOnSkip: P.retryOnSkip !== void 0 ? !!P.retryOnSkip : !0
    },
    schedulePolicy: {
      intervalMinutes: Math.round(Qe(z.intervalMinutes, 5, 1440, 20)),
      dailyLimit: Math.round(Qe(z.dailyLimit, 1, 50, 8)),
      maxFetchItems: Math.round(Qe(z.maxFetchItems, 1, 40, 15))
    },
    ownerFeedback: b,
    createdAt: Number.isFinite(c.createdAt) ? c.createdAt : w,
    updatedAt: w,
    lastRunAt: Number.isFinite(c.lastRunAt) ? c.lastRunAt : void 0,
    lastError: ne(c.lastError, 240) || void 0,
    nextEligibleAt: Number.isFinite(c.nextEligibleAt) ? c.nextEligibleAt : void 0
  };
}
function vo(v, w = {}) {
  return {
    format: jt,
    exportedAt: w.now ?? Date.now(),
    blueprint: {
      name: v.name,
      role: v.role,
      description: v.description,
      accentColor: v.accentColor,
      source: {
        kind: v.source.kind === "workspace-organizer" ? "workspace-organizer" : v.source.kind === "bili-history" ? "bili-history" : "bili-toview",
        folderId: "",
        folderTitle: v.source.kind === "workspace-organizer" ? "本地桌面网站 + 浏览器书签" : v.source.kind === "bili-history" ? "播放历史" : "稍后再看"
      },
      runtime: {
        analyzer: v.runtime.analyzer,
        piModel: "",
        piThinking: v.runtime.piThinking || "medium",
        decisionMode: v.runtime.decisionMode,
        jevEndpoint: ""
      },
      prompt: { ...v.prompt },
      skills: [...v.skills],
      customSkillInstructions: v.customSkillInstructions,
      decisionGate: {
        ...v.decisionGate,
        categories: [...v.decisionGate.categories],
        skipCategories: [...v.decisionGate.skipCategories]
      },
      schedulePolicy: { ...v.schedulePolicy },
      ...w.includeFeedbackExamples && v.ownerFeedback.length ? { ownerFeedback: v.ownerFeedback.slice(0, 6).map((c) => ({ ...c })) } : {}
    }
  };
}
function mo(v, w = Date.now()) {
  let c;
  try {
    c = JSON.parse(v);
  } catch {
    throw new Error("员工包文件不是有效的 JSON。");
  }
  if (!c || typeof c != "object")
    throw new Error("员工包内容格式无效。");
  const _ = c.format === jt && c.blueprint ? c.blueprint : c, y = Jt(
    {
      ..._,
      id: `emp-${w}-${Math.random().toString(36).slice(2, 7)}`,
      enabled: !1,
      lastRunAt: void 0,
      lastError: void 0,
      nextEligibleAt: void 0
    },
    w
  );
  return y.source.kind === "bili-fav" && !y.source.folderId && (y.source.kind = "bili-toview", y.source.folderTitle = "稍后再看"), y;
}
function ft(v = Date.now()) {
  const w = new Date(v), c = (_) => String(_).padStart(2, "0");
  return `${w.getFullYear()}-${c(w.getMonth() + 1)}-${c(w.getDate())}`;
}
class kt extends Error {
  constructor(w = "扩展后台服务暂不可用，请刷新扩展页面后重试。") {
    super(w), this.name = "EmployeeBackendUnavailable";
  }
}
async function de(v, w, c = {}) {
  if (!v?.sendMessage)
    throw new kt();
  let _;
  try {
    _ = await v.sendMessage({ type: `employee:${w}`, ...c });
  } catch {
    throw new kt();
  }
  if (!_ || typeof _ != "object")
    throw new kt();
  if (!_.ok)
    throw new Error(typeof _.error == "string" && _.error ? _.error : "后台数字员工操作未确认。");
  return _.result;
}
const fo = {
  class: "peek-window",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "数字员工实时窥屏监视器"
}, ko = { class: "peek-win-bar" }, go = { class: "peek-win-left" }, yo = {
  key: 0,
  class: "peek-action-text"
}, bo = { class: "peek-win-controls" }, ho = ["disabled"], _o = { class: "peek-step-count" }, wo = {
  key: 0,
  class: "peek-stale-bar",
  role: "alert"
}, $o = {
  key: 1,
  class: "peek-empty"
}, Io = ["disabled"], Fo = {
  key: 2,
  class: "peek-workspace"
}, So = { class: "sim-address-bar" }, Co = { class: "sim-url" }, xo = { class: "sim-body" }, Eo = { class: "sim-sidebar" }, Lo = {
  class: "sim-state-box",
  "data-peek-target": "decision-badge"
}, Mo = {
  key: 0,
  class: "sim-save-chip",
  "data-peek-target": "library-save"
}, No = { class: "sim-canvas" }, zo = { class: "sim-section-head" }, Ro = { class: "sim-video-grid" }, Po = ["data-peek-target"], Bo = { class: "sim-cover-wrap" }, To = ["src"], Ao = { class: "sim-dur" }, Vo = ["title"], Oo = { class: "sim-v-up" }, Uo = { class: "sim-video-banner" }, jo = ["src"], Do = { class: "sim-banner-info" }, Go = { class: "sim-banner-meta" }, qo = { key: 0 }, Jo = {
  key: 0,
  class: "sim-banner-stats"
}, Ko = { class: "sim-tabs" }, Wo = { class: "sim-tab-panel" }, Ho = {
  key: 0,
  class: "sim-info-panel",
  "data-peek-target": "info-desc"
}, Qo = {
  key: 0,
  class: "sim-pages"
}, Yo = { class: "sim-desc" }, Xo = {
  key: 1,
  class: "sim-comments-panel",
  "data-peek-target": "comments-list"
}, Zo = {
  key: 0,
  class: "sim-loading-note"
}, ea = { class: "sim-comment-head" }, ta = {
  key: 0,
  class: "sim-top-tag"
}, oa = { class: "sim-likes" }, aa = {
  key: 2,
  class: "sim-subtitle-panel",
  "data-peek-target": "subtitle-lines"
}, na = {
  key: 0,
  class: "sim-loading-note"
}, la = {
  key: 0,
  class: "sim-verdict-bar"
}, ia = { class: "peek-cursor-tag" }, sa = {
  class: "peek-timeline",
  "aria-label": "行为轨迹"
}, ra = {
  key: 0,
  class: "peek-tl-list"
}, da = ["onClick"], ua = { class: "peek-tl-idx" }, ca = { class: "peek-tl-label" }, pa = {
  key: 1,
  class: "peek-tl-list"
}, va = { class: "peek-tl-idx" }, ma = { class: "peek-tl-label" }, fa = { class: "peek-tl-label" }, ka = /* @__PURE__ */ et({
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
  setup(v, { emit: w }) {
    const c = v, _ = w, y = M(null), L = M(null), F = M([]), S = M(0), U = M(!0);
    let G = null, q = null;
    const J = M({ x: 80, y: 80, visible: !1 }), D = M(0), f = W(() => {
      if (c.mode === "replay") {
        const $ = c.replayFrames || [];
        return $.length ? $[Math.min(S.value, $.length - 1)] || $[0] : null;
      }
      return L.value;
    }), Y = W(() => {
      const $ = f.value?.timelineSteps;
      return Array.isArray($) && $.length ? $ : F.value.length ? F.value : f.value?.cursorLabel ? [f.value.cursorLabel] : [];
    }), i = W(() => {
      const $ = f.value?.phase;
      return $ === "comments" ? "comments" : $ === "subtitle" ? "subtitle" : "info";
    });
    function P($) {
      const I = Math.max(0, Math.floor(Number($ || 0))), R = Math.floor(I / 60), Z = I % 60;
      return `${R}:${String(Z).padStart(2, "0")}`;
    }
    function g($) {
      const I = Number($ || 0);
      return I >= 1e4 ? `${(I / 1e4).toFixed(1)}万` : String(I);
    }
    async function K() {
      await Vt();
      const $ = y.value, I = f.value;
      if (!$ || !I) {
        J.value.visible = !1;
        return;
      }
      const R = $.getBoundingClientRect(), Z = $.querySelector(`[data-peek-target="${I.cursorTarget}"]`);
      if (!Z) {
        J.value = { x: Math.round(R.width * 0.45), y: Math.round(R.height * 0.42), visible: !0 };
        return;
      }
      const ve = Z.getBoundingClientRect(), ee = Math.max(16, Math.min(R.width - 140, ve.left - R.left + Math.min(ve.width * 0.42, 110))), ie = Math.max(16, Math.min(R.height - 36, ve.top - R.top + Math.min(ve.height * 0.48, 52)));
      J.value = { x: Math.round(ee), y: Math.round(ie), visible: !0 }, D.value++;
    }
    ke(f, () => {
      K();
    }, { immediate: !0, deep: !0 });
    function C() {
      G && (clearInterval(G), G = null);
    }
    function z() {
      if (C(), c.mode !== "replay") return;
      const $ = c.replayFrames || [];
      $.length <= 1 || (G = setInterval(() => {
        U.value && (S.value < $.length - 1 ? S.value++ : U.value = !1);
      }, 1500));
    }
    function A() {
      const $ = c.replayFrames || [];
      $.length && (!U.value && S.value >= $.length - 1 && (S.value = 0), U.value = !U.value);
    }
    function b($) {
      if (!$ || c.employeeId && $.employeeId !== c.employeeId) return;
      const I = L.value;
      I && I.updatedAt === $.updatedAt && I.bvid === $.bvid && I.cursorTarget === $.cursorTarget && I.cursorLabel === $.cursorLabel && I.active === $.active && I.activeVideo?.desc === $.activeVideo?.desc && I.activeVideo?.descStatus === $.activeVideo?.descStatus && (I.toolHistory?.length || 0) === ($.toolHistory?.length || 0) && (I.timelineSteps?.length || 0) === ($.timelineSteps?.length || 0) || ($.phase === "source" && $.cursorTarget === "folder" ? F.value = $.cursorLabel ? [$.cursorLabel] : [] : $.cursorLabel && F.value[F.value.length - 1] !== $.cursorLabel && (F.value = [...F.value.slice(-19), $.cursorLabel]), L.value = $);
    }
    async function B() {
      if (!(c.mode !== "live" || typeof chrome > "u" || !chrome.storage?.local))
        try {
          const $ = await chrome.storage.local.get(we);
          b($?.[we]);
        } catch {
        }
    }
    function m($, I) {
      c.mode !== "live" || I !== "local" || !$[we] || b($[we].newValue);
    }
    function X($) {
      $.key === "Escape" && ($.stopPropagation(), _("close"));
    }
    return tt(() => {
      document.addEventListener("keydown", X), window.addEventListener("resize", K), c.mode === "live" ? (B(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(m), q = setInterval(() => {
        B();
      }, 400)) : (S.value = 0, U.value = !0, z()), K();
    }), ot(() => {
      C(), q && (clearInterval(q), q = null), document.removeEventListener("keydown", X), window.removeEventListener("resize", K), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(m);
    }), ($, I) => (a(), n("div", {
      class: "peek-overlay",
      onClick: I[4] || (I[4] = Se((R) => _("close"), ["self"]))
    }, [
      e("section", fo, [
        e("header", ko, [
          e("div", go, [
            e("span", {
              class: O(["peek-status-badge", { live: v.mode === "live" && f.value?.active }])
            }, [
              I[5] || (I[5] = e("i", { class: "peek-status-dot" }, null, -1)),
              e("span", null, d(v.mode === "live" ? f.value?.active ? "LIVE 实况窥屏" : "最近一次实况" : "历史轨迹回放"), 1)
            ], 2),
            e("strong", null, d(f.value?.employeeName || v.employeeName || "数字员工"), 1),
            f.value ? (a(), n("span", yo, d(f.value.cursorLabel), 1)) : k("", !0)
          ]),
          e("div", bo, [
            v.mode === "live" && v.employeeId ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "peek-ctl-btn",
              disabled: v.running || !!f.value?.active,
              onClick: I[0] || (I[0] = (R) => _("runNow", v.employeeId))
            }, d(v.running || f.value?.active ? "执行中…" : "▶ 立即试跑 1 条"), 9, ho)) : k("", !0),
            v.mode === "replay" && (v.replayFrames?.length || 0) > 1 ? (a(), n(j, { key: 1 }, [
              e("button", {
                type: "button",
                class: "peek-ctl-btn",
                onClick: A
              }, d(U.value ? "暂停" : S.value >= (v.replayFrames?.length || 1) - 1 ? "重播" : "继续"), 1),
              e("span", _o, d(S.value + 1) + " / " + d(v.replayFrames?.length), 1)
            ], 64)) : k("", !0),
            e("button", {
              type: "button",
              class: "peek-close-btn",
              "aria-label": "关闭监视器",
              onClick: I[1] || (I[1] = (R) => _("close"))
            }, "×")
          ])
        ]),
        v.mode === "live" && v.backendStale ? (a(), n("div", wo, [
          I[6] || (I[6] = e("span", null, "检测到扩展后台 `background.js` 尚未重载，当前不会推送实时窥屏画面。", -1)),
          e("button", {
            type: "button",
            class: "peek-ctl-btn",
            onClick: I[2] || (I[2] = (R) => _("reloadExtension"))
          }, "🔄 立即热重载扩展")
        ])) : k("", !0),
        f.value ? (a(), n("div", Fo, [
          e("div", {
            ref_key: "stageRef",
            ref: y,
            class: "peek-stage"
          }, [
            e("div", So, [
              I[9] || (I[9] = e("span", { class: "sim-lock" }, "Bilibili · 插件视野仿真", -1)),
              e("span", Co, d(f.value.bvid ? `bilibili.com/video/${f.value.bvid}` : `bilibili.com · ${f.value.sourceTitle}`), 1)
            ]),
            e("div", xo, [
              e("aside", Eo, [
                I[13] || (I[13] = e("div", { class: "sim-side-label" }, "数据源", -1)),
                e("div", {
                  class: O(["sim-folder-item", { active: f.value.phase === "source" }]),
                  "data-peek-target": "folder"
                }, [
                  I[10] || (I[10] = e("span", { class: "sim-folder-dot" }, null, -1)),
                  e("span", null, d(f.value.sourceTitle), 1)
                ], 2),
                I[14] || (I[14] = e("div", {
                  class: "sim-side-label",
                  style: { "margin-top": "10px" }
                }, "工作状态", -1)),
                e("div", Lo, [
                  f.value.verdict ? (a(), n(j, { key: 0 }, [
                    e("strong", {
                      class: O({ ok: f.value.verdict.worth, skip: !f.value.verdict.worth })
                    }, d(f.value.verdict.worth ? "推荐沉淀" : "判定跳过"), 3),
                    e("span", null, d(f.value.verdict.category) + " · " + d(Math.round(f.value.verdict.score * 100)) + "分", 1)
                  ], 64)) : (a(), n(j, { key: 1 }, [
                    I[11] || (I[11] = e("strong", null, "自主探索中", -1)),
                    I[12] || (I[12] = e("span", null, "按需调用工具研判", -1))
                  ], 64))
                ]),
                f.value.phase === "done" || f.value.cursorTarget === "library-save" ? (a(), n("div", Mo, " ✓ 已写入资料库 ")) : k("", !0)
              ]),
              e("main", No, [
                f.value.phase === "source" || !f.value.activeVideo ? (a(), n(j, { key: 0 }, [
                  e("div", zo, [
                    e("strong", null, d(f.value.sourceTitle), 1),
                    e("small", null, "扫描前 " + d(f.value.sourceVideos.length) + " 条候选视频", 1)
                  ]),
                  e("div", Ro, [
                    (a(!0), n(j, null, Q(f.value.sourceVideos, (R) => (a(), n("div", {
                      key: R.bvid,
                      class: O(["sim-video-card", { picked: R.bvid === f.value.bvid }]),
                      "data-peek-target": R.bvid === f.value.bvid ? "video-card" : void 0
                    }, [
                      e("div", Bo, [
                        R.cover ? (a(), n("img", {
                          key: 0,
                          src: R.cover,
                          alt: ""
                        }, null, 8, To)) : k("", !0),
                        e("span", Ao, d(P(R.duration)), 1)
                      ]),
                      e("div", {
                        class: "sim-v-title",
                        title: R.title
                      }, d(R.title), 9, Vo),
                      e("div", Oo, d(R.author), 1)
                    ], 10, Po))), 128))
                  ])
                ], 64)) : (a(), n(j, { key: 1 }, [
                  e("div", Uo, [
                    f.value.activeVideo.cover ? (a(), n("img", {
                      key: 0,
                      class: "sim-banner-cover",
                      src: f.value.activeVideo.cover,
                      alt: ""
                    }, null, 8, jo)) : k("", !0),
                    e("div", Do, [
                      e("h4", null, d(f.value.activeVideo.title), 1),
                      e("div", Go, [
                        e("span", null, "UP：" + d(f.value.activeVideo.author), 1),
                        f.value.activeVideo.tname ? (a(), n("span", qo, d(f.value.activeVideo.tname), 1)) : k("", !0),
                        e("span", null, d(f.value.activeVideo.bvid), 1)
                      ]),
                      f.value.activeVideo.stat ? (a(), n("div", Jo, [
                        e("span", null, "播放 " + d(g(f.value.activeVideo.stat.view)), 1),
                        e("span", null, "点赞 " + d(g(f.value.activeVideo.stat.like)), 1),
                        e("span", null, "投币 " + d(g(f.value.activeVideo.stat.coin)), 1),
                        e("span", null, "收藏 " + d(g(f.value.activeVideo.stat.favorite)), 1)
                      ])) : k("", !0)
                    ])
                  ]),
                  e("div", Ko, [
                    e("span", {
                      class: O(["sim-tab", { active: i.value === "info" }]),
                      "data-peek-target": "tab-info"
                    }, "简介与分P", 2),
                    e("span", {
                      class: O(["sim-tab", { active: i.value === "comments" }]),
                      "data-peek-target": "tab-comments"
                    }, "评论区", 2),
                    e("span", {
                      class: O(["sim-tab", { active: i.value === "subtitle" }]),
                      "data-peek-target": "tab-subtitle"
                    }, "字幕正文", 2)
                  ]),
                  e("div", Wo, [
                    i.value === "info" ? (a(), n("div", Ho, [
                      f.value.activeVideo.pages?.length ? (a(), n("div", Qo, [
                        (a(!0), n(j, null, Q(f.value.activeVideo.pages, (R) => (a(), n("span", {
                          key: R.page,
                          class: "sim-page-pill"
                        }, " P" + d(R.page) + " " + d(R.part || "正片"), 1))), 128))
                      ])) : k("", !0),
                      e("p", Yo, d(f.value.activeVideo.desc || (f.value.activeVideo.descStatus === "loading" ? "正在获取视频简介内容…" : f.value.activeVideo.descStatus === "unavailable" ? "暂时无法获取视频简介。" : "该视频暂无简介。")), 1)
                    ])) : i.value === "comments" ? (a(), n("div", Xo, [
                      f.value.comments?.length ? k("", !0) : (a(), n("div", Zo, "正在拉取 UP 主置顶与高赞评论…")),
                      (a(!0), n(j, null, Q(f.value.comments, (R, Z) => (a(), n("div", {
                        key: Z,
                        class: O(["sim-comment-row", { pinned: R.isTop }])
                      }, [
                        e("div", ea, [
                          R.isTop ? (a(), n("span", ta, "📌 置顶")) : k("", !0),
                          e("strong", null, d(R.author), 1),
                          e("span", oa, "👍 " + d(R.likes), 1)
                        ]),
                        e("p", null, d(R.message), 1)
                      ], 2))), 128))
                    ])) : (a(), n("div", aa, [
                      f.value.subtitleLines?.length ? k("", !0) : (a(), n("div", na, "正在加载 WBI 字幕轨道…")),
                      (a(!0), n(j, null, Q(f.value.subtitleLines, (R, Z) => (a(), n("div", {
                        key: Z,
                        class: "sim-sub-line"
                      }, d(R), 1))), 128))
                    ]))
                  ]),
                  f.value.verdict ? (a(), n("div", la, [
                    e("strong", null, d(f.value.verdict.category) + " · " + d(Math.round(f.value.verdict.score * 100)) + "分", 1),
                    e("span", null, d(f.value.verdict.reason), 1)
                  ])) : k("", !0)
                ], 64))
              ])
            ]),
            J.value.visible ? (a(), n("div", {
              key: 0,
              class: "peek-cursor",
              style: Xe({ transform: `translate3d(${J.value.x}px, ${J.value.y}px, 0)` })
            }, [
              (a(), n("span", {
                key: D.value,
                class: "peek-cursor-ripple"
              })),
              I[15] || (I[15] = e("svg", {
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
              e("span", ia, d(f.value.cursorLabel), 1)
            ], 4)) : k("", !0)
          ], 512),
          e("aside", sa, [
            I[17] || (I[17] = e("div", { class: "peek-tl-head" }, "AI 行为时间轴", -1)),
            v.mode === "replay" && v.replayFrames?.length ? (a(), n("div", ra, [
              (a(!0), n(j, null, Q(v.replayFrames, (R, Z) => (a(), n("button", {
                key: Z,
                type: "button",
                class: O(["peek-tl-item", { active: Z === S.value, done: Z < S.value }]),
                onClick: (ve) => {
                  S.value = Z, U.value = !1;
                }
              }, [
                e("span", ua, d(Z + 1), 1),
                e("span", ca, d(R.cursorLabel), 1)
              ], 10, da))), 128))
            ])) : (a(), n("div", pa, [
              (a(!0), n(j, null, Q(Y.value, (R, Z) => (a(), n("div", {
                key: `tl-${Z}`,
                class: O(["peek-tl-item", Z === Y.value.length - 1 ? "active" : "done"])
              }, [
                e("span", va, d(Z === Y.value.length - 1 && f.value.active ? "•" : Z + 1), 1),
                e("span", ma, d(R), 1)
              ], 2))), 128)),
              (a(!0), n(j, null, Q(f.value.toolHistory, (R, Z) => (a(), n("div", {
                key: Z,
                class: "peek-tl-item done"
              }, [
                I[16] || (I[16] = e("span", { class: "peek-tl-idx" }, "✓", -1)),
                e("span", fa, d(R.summary), 1)
              ]))), 128))
            ]))
          ])
        ])) : (a(), n("div", $o, [
          I[7] || (I[7] = e("h3", null, "暂无可展示的窥屏实况", -1)),
          I[8] || (I[8] = e("p", null, "请点击下方「立即试跑 1 条」或开启后台巡检，员工读取收藏夹、视频简介、评论区与字幕的每一步动作都会在这里实时呈现。", -1)),
          v.mode === "live" && v.employeeId ? (a(), n("button", {
            key: 0,
            type: "button",
            class: "peek-ctl-btn",
            style: { "margin-top": "12px" },
            disabled: v.running,
            onClick: I[3] || (I[3] = (R) => _("runNow", v.employeeId))
          }, d(v.running ? "执行中…" : "▶ 立即试跑 1 条"), 9, Io)) : k("", !0)
        ]))
      ])
    ]));
  }
}), ga = /* @__PURE__ */ at(ka, [["__scopeId", "data-v-54fbbe37"]]), ya = (v) => v === "rename_folder" || v === "remove_folder" || v === "merge_folders";
function Kt(v, w, c) {
  const _ = w ? c(w) : void 0;
  if (w && !_) throw new Error("找不到目标文件夹。");
  const y = /* @__PURE__ */ new Set([v]);
  for (let L = w; L; L = c(L)?.parentId) {
    if (y.has(L)) throw new Error("不能合并到自身或子文件夹。");
    y.add(L);
  }
  return _;
}
function ba(v, w, c, _, y, L) {
  const F = v.get(_);
  if (!F || _ === L) throw new Error("找不到要整理的文件夹。");
  if (c === "rename_folder" && (!y || y === L || v.has(y))) throw new Error("文件夹名称不可用。");
  const S = c === "merge_folders" ? y : F.parent;
  if (c === "merge_folders" && !S) throw new Error("请选择合并目标。");
  Kt(_, S, (J) => {
    const D = v.get(J);
    return D && { parentId: D.parent };
  });
  const U = c === "rename_folder" ? y : S, G = S && v.get(S)?.page || F.page, q = /* @__PURE__ */ new Set([_]);
  for (let J = !0; J; ) {
    J = !1;
    for (const [D, f] of v) f.parent && q.has(f.parent) && !q.has(D) && (q.add(D), J = !0);
  }
  v.delete(_), c === "rename_folder" && U && v.set(U, { ...F, name: U });
  for (const [J, D] of v) {
    if (!q.has(J)) continue;
    const f = { ...D, page: G };
    D.parent === _ && (U ? f.parent = U : delete f.parent), v.set(J, f);
  }
  for (const J of w)
    J.group && q.has(J.group) && (J.page = G), J.group === _ && (J.group = U || L);
}
const Me = "常用网站";
function Ye(v) {
  try {
    const w = new URL(String(v || ""));
    return /^https?:$/.test(w.protocol) && !w.username && !w.password ? w.href : "";
  } catch {
    return "";
  }
}
function Ne(v, w, c = !1) {
  const _ = { ...v.params };
  for (const [y, L] of Object.entries(v.refs || {})) {
    const F = w.find((S) => S.id === L);
    if (!F || c && F.status !== "applied" || F.status === "skipped" || F.status === "undone") throw new Error(`前置步骤尚未生效，请先执行 #${F?.order || "?"}。`);
    if (y === "partition")
      v.type === "create_launcher_folder" ? _.partitionName = F.params.partitionName : _.targetPartition = F.params.partitionName;
    else if (y === "folder") _.targetFolder = F.params.folderName;
    else if (y === "parentFolder") _.parentFolderName = F.params.folderName;
    else {
      const S = c ? F.result?.bookmarkFolderId : F.result?.bookmarkFolderId || `new:${F.id}`;
      if (!S) throw new Error("找不到新建的书签目录。");
      y === "bookmarkParent" ? _.parentBookmarkId = S : _.targetFolder = S;
    }
  }
  if (c) {
    const y = w.find((L) => v.dependsOn?.includes(L.id) && L.status !== "applied");
    if (y) throw new Error(`请先执行 #${y.order}。`);
  }
  return _;
}
function ha(v) {
  for (const w of v) {
    let c = w.params;
    try {
      c = Ne(w, v);
    } catch {
    }
    switch (w.type) {
      case "rename_folder":
      case "rename_link":
        w.title = `将「${c.sourceLabel}」改名为「${c.newName}」`;
        break;
      case "remove_folder":
        w.title = `移除「${c.sourceLabel}」，内容移到上一级`;
        break;
      case "merge_folders":
        w.title = `将「${c.sourceLabel}」合并到「${c.targetBookmarkPath || c.targetFolder}」`;
        break;
      case "create_partition":
        w.title = `新建分区「${c.partitionName}」`;
        break;
      case "create_launcher_folder":
        w.title = `在「${c.partitionName}${c.parentFolderName ? ` / ${c.parentFolderName}` : ""}」新建${c.folderSize === "large" ? "大" : "小"}文件夹「${c.folderName}」`;
        break;
      case "move_quick_link":
        w.title = `将网站「${c.linkTitle}」移至「${c.targetPartition} / ${c.targetFolder || Me}」`;
        break;
      case "promote_bookmark_to_launcher":
        w.title = `将书签「${c.bookmarkTitle}」添加到「${c.targetPartition} / ${c.targetFolder || Me}」`;
        break;
      case "create_bookmark_folder": {
        const _ = v.find((y) => y.id === w.refs?.bookmarkParent);
        w.title = `在书签目录「${_?.params.folderName || c.parentBookmarkPath || c.parentBookmarkId}」下新建「${c.folderName}」`;
        break;
      }
      case "move_bookmark": {
        const _ = v.find((y) => y.id === w.refs?.bookmarkTarget);
        w.title = `将书签「${c.bookmarkTitle}」移至「${_?.params.folderName || c.targetBookmarkPath || c.targetFolder}」`;
        break;
      }
    }
  }
}
function At(v, w, c, _ = "proposal") {
  const y = new Map(v.partitions.map((i) => [i.id, { ...i }])), L = new Map(v.folders.map((i) => [i.name, { ...i, size: i.size === "large" ? "large" : "small", badge: void 0 }])), F = v.links.map((i) => ({ ...i, badge: void 0 })), S = v.bookmarkFolders.map((i) => ({ ...i, badge: void 0 })), U = v.bookmarks.map((i) => ({ ...i, badge: void 0 })), G = /* @__PURE__ */ new Set(), q = (i) => {
    G.has(i) || (G.add(i), w.find((P) => P.id === i)?.dependsOn?.forEach(q));
  };
  c && q(c);
  const J = /* @__PURE__ */ new Set(), D = [];
  for (const i of w) {
    const P = i.status === "applied";
    if (!P && (_ === "actual" || !["pending", "error"].includes(i.status) || c && !G.has(i.id)) || i.dependsOn?.some((C) => !J.has(C))) continue;
    let g;
    try {
      g = Ne(i, w);
    } catch {
      D.push(`#${i.order}：前置步骤未生效或已跳过。`);
      continue;
    }
    const K = P ? "applied" : "new";
    if (i.type === "rename_link") {
      const C = g.scope === "desktop" ? F.find((z) => z.id === g.linkId) : U.find((z) => z.id === g.bookmarkId);
      C && g.newName && (C.title = g.newName);
    } else if (ya(i.type) && g.sourceFolder)
      try {
        if (g.scope === "desktop") ba(L, F, i.type, g.sourceFolder, i.type === "rename_folder" ? g.newName : g.targetFolder, Me);
        else {
          const C = S.findIndex((A) => A.id === g.sourceFolder), z = S[C];
          if (!z) continue;
          if (i.type === "rename_folder" && g.newName) z.title = g.newName;
          else {
            const A = Kt(z.id, i.type === "merge_folders" ? g.targetFolder : z.parentId, (b) => S.find((B) => B.id === b));
            if (!A) continue;
            for (const b of [...S, ...U]) b.parentId === z.id && (b.parentId = A.id);
            S.splice(C, 1);
          }
        }
      } catch (C) {
        D.push(`#${i.order}：${C.message}`);
        continue;
      }
    else if (i.type === "create_partition" && g.partitionName) y.set(g.partitionName, { id: g.partitionName, label: g.partitionName, badge: K });
    else if (i.type === "create_launcher_folder" && g.folderName) {
      const C = g.parentFolderName ? L.get(g.parentFolderName)?.page : g.partitionName;
      if (!C || !y.has(C) || C !== g.partitionName || L.has(g.folderName)) {
        D.push(`#${i.order}：文件夹目标冲突。`);
        continue;
      }
      L.set(g.folderName, { name: g.folderName, page: C, size: g.folderSize === "large" ? "large" : "small", parent: g.parentFolderName, linkCount: 0, badge: K });
    } else if (i.type === "move_quick_link" || i.type === "promote_bookmark_to_launcher") {
      const C = g.targetFolder || Me, z = C === Me ? g.targetPartition : L.get(C)?.page;
      if (!z || !y.has(z) || z !== g.targetPartition) {
        D.push(`#${i.order}：目标不存在或分区冲突，保留原位置。`);
        continue;
      }
      const A = i.type === "move_quick_link" ? F.find((b) => b.id === g.linkId) : F.find((b) => b.url === g.bookmarkUrl);
      A ? Object.assign(A, { page: z, group: C, badge: P ? "applied" : "moved" }) : i.type === "promote_bookmark_to_launcher" && g.bookmarkUrl && F.push({ id: `preview:${i.id}`, title: g.bookmarkTitle || g.bookmarkUrl, url: g.bookmarkUrl, page: z, group: C, badge: P ? "applied" : "promoted" });
    } else if (i.type === "create_bookmark_folder" && g.folderName) {
      const C = S.find((z) => z.id === g.parentBookmarkId);
      if (!C) {
        D.push(`#${i.order}：书签父目录不存在。`);
        continue;
      }
      S.push({ id: i.result?.bookmarkFolderId || `new:${i.id}`, title: g.folderName, parentId: C.id, path: `${C.path} / ${g.folderName}`, childCount: 0, badge: K });
    } else if (i.type === "move_bookmark") {
      const C = S.find((A) => A.id === g.targetFolder), z = U.find((A) => A.id === g.bookmarkId);
      if (!C || !z) {
        D.push(`#${i.order}：书签目标不存在，保留原位置。`);
        continue;
      }
      Object.assign(z, { parentId: C.id, folderPath: C.path, badge: P ? "applied" : "moved" });
    }
    J.add(i.id);
  }
  const f = [...y.values()].map((i) => ({
    ...i,
    folders: [...L.values()].filter((P) => P.page === i.id).map((P) => ({ ...P, links: F.filter((g) => g.page === i.id && g.group === P.name) })),
    looseLinks: F.filter((P) => P.page === i.id && (P.group === Me || !L.has(P.group)))
  })), Y = (i) => {
    const P = [i.title], g = /* @__PURE__ */ new Set([i.id]);
    let K = S.find((C) => C.id === i.parentId);
    for (; K && !g.has(K.id); )
      P.unshift(K.title), g.add(K.id), K = S.find((C) => C.id === K?.parentId);
    return P.join(" / ");
  };
  return { partitions: f, bookmarkFolders: S.map((i) => ({ ...i, path: Y(i), items: U.filter((P) => P.parentId === i.id) })), warnings: D };
}
const _a = ["aria-label"], wa = { class: "org-head-left" }, $a = { key: 0 }, Ia = { key: 1 }, Fa = { class: "org-head-actions" }, Sa = ["disabled"], Ca = ["disabled"], xa = { class: "org-body" }, Ea = { class: "org-stage-bar" }, La = {
  class: "org-view-tabs",
  role: "tablist"
}, Ma = ["aria-selected"], Na = ["aria-selected"], za = ["data-mode"], Ra = {
  key: 0,
  class: "org-stage-empty"
}, Pa = ["disabled"], Ba = {
  key: 1,
  class: "org-desktop-preview",
  "data-peek-target": "org-folders"
}, Ta = { class: "part-tabs" }, Aa = ["data-peek-part", "data-peek-part-label", "onClick"], Va = { key: 0 }, Oa = { key: 1 }, Ua = {
  key: 0,
  class: "part-canvas",
  "data-peek-target": "org-links"
}, ja = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, Da = ["data-peek-folder", "title", "onClick", "onKeydown"], Ga = ["href", "data-peek-link", "title"], qa = {
  key: 0,
  class: "peek-corner-badge moved"
}, Ja = {
  key: 1,
  class: "mini-empty"
}, Ka = {
  key: 2,
  class: "org-flow-svg",
  "aria-hidden": "true"
}, Wa = ["d"], Ha = ["d", "marker-end"], Qa = ["cx", "cy"], Ya = {
  key: 0,
  class: "org-folder-drawer",
  "aria-label": "文件夹展开预览"
}, Xa = { class: "org-folder-drawer-head" }, Za = { class: "org-folder-drawer-title" }, en = ["title"], tn = {
  key: 1,
  class: "drawer-state-pill new"
}, on = {
  key: 2,
  class: "drawer-state-pill applied"
}, an = { class: "org-folder-drawer-actions" }, nn = { class: "org-folder-drawer-body" }, ln = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, sn = ["data-peek-folder", "onClick", "onKeydown"], rn = ["href", "title"], dn = {
  key: 1,
  class: "mini-empty"
}, un = {
  key: 2,
  class: "org-desktop-preview org-bookmarks-preview",
  "data-peek-target": "org-folders"
}, cn = { class: "part-tabs" }, pn = ["data-peek-bm-folder", "data-peek-bm-id", "onClick"], vn = { key: 0 }, mn = { key: 1 }, fn = {
  key: 0,
  class: "part-canvas",
  "data-peek-target": "org-links"
}, kn = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, gn = ["data-peek-bm-folder", "data-peek-bm-id", "title", "onClick", "onKeydown"], yn = ["href", "data-peek-bm-item", "title"], bn = {
  key: 0,
  class: "peek-corner-badge moved"
}, hn = {
  key: 1,
  class: "mini-empty"
}, _n = {
  key: 2,
  class: "org-flow-svg",
  "aria-hidden": "true"
}, wn = ["d"], $n = ["d", "marker-end"], In = ["cx", "cy"], Fn = {
  key: 0,
  class: "org-folder-drawer",
  "aria-label": "书签文件夹展开预览"
}, Sn = { class: "org-folder-drawer-head" }, Cn = { class: "org-folder-drawer-title" }, xn = {
  key: 1,
  class: "drawer-state-pill new"
}, En = {
  key: 2,
  class: "drawer-state-pill applied"
}, Ln = { class: "org-folder-drawer-actions" }, Mn = { class: "org-folder-drawer-body" }, Nn = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, zn = ["data-peek-bm-folder", "data-peek-bm-id", "onClick", "onKeydown"], Rn = ["href", "title"], Pn = {
  key: 1,
  class: "mini-empty"
}, Bn = { class: "peek-cursor-tag" }, Tn = {
  class: "org-checklist",
  "data-peek-target": "org-approval"
}, An = { class: "checklist-head" }, Vn = ["disabled"], On = {
  key: 0,
  class: "step-toast confirm-box"
}, Un = { class: "confirm-btns" }, jn = {
  key: 1,
  class: "step-toast err",
  role: "alert"
}, Dn = {
  key: 2,
  class: "step-toast ok",
  role: "status"
}, Gn = {
  key: 3,
  class: "step-toast err",
  role: "alert"
}, qn = {
  key: 4,
  class: "live-steps"
}, Jn = {
  key: 5,
  class: "todo-list"
}, Kn = ["onMouseenter"], Wn = ["disabled", "title", "onClick"], Hn = { key: 0 }, Qn = { key: 1 }, Yn = ["onClick"], Xn = { class: "todo-top" }, Zn = { class: "step-num" }, el = {
  key: 0,
  class: "status-tag applied"
}, tl = {
  key: 1,
  class: "status-tag skipped"
}, ol = {
  key: 2,
  class: "status-tag skipped"
}, al = {
  key: 3,
  class: "status-tag skipped"
}, nl = { class: "todo-title" }, ll = {
  key: 0,
  class: "todo-dep"
}, il = {
  key: 1,
  class: "todo-reason"
}, sl = {
  key: 2,
  class: "todo-err"
}, rl = {
  key: 3,
  class: "todo-edit-row"
}, dl = ["maxlength"], ul = { class: "todo-ops" }, cl = ["disabled", "onClick"], pl = ["disabled", "onClick"], vl = ["disabled", "onClick"], ml = ["disabled", "onClick"], fl = {
  key: 6,
  class: "todo-empty"
}, kl = /* @__PURE__ */ et({
  __name: "OrganizerPeekModal",
  props: {
    employeeId: {},
    employeeName: {},
    latestRun: {},
    running: { type: Boolean },
    backendStale: { type: Boolean },
    generationError: {}
  },
  emits: ["close", "runNow", "updated", "reloadExtension"],
  setup(v, { emit: w }) {
    const c = v, _ = w, y = M(null), L = M(null), F = W(() => L.value?.id === c.latestRun?.id ? L.value : c.latestRun);
    ke(
      () => c.latestRun,
      (l, r) => {
        l?.id !== r?.id ? (L.value = null, X.value = "", z.value = void 0, U.value = !1) : l && (l.organizerRevision || 0) >= (L.value?.organizerRevision || 0) && (L.value = l);
      }
    );
    const S = M("proposal");
    ke(
      () => c.employeeId,
      () => {
        y.value = null, z.value = void 0;
      }
    );
    const U = M(!1), { panelRef: G, headerRef: q, initialStyle: J, onHeaderPointerDown: D } = Ut({
      windowId: "organizer-approval",
      managed: !1,
      defaultWidth: 1140,
      defaultHeight: 740,
      minWidth: 360,
      minHeight: 320
    }), f = M(null), Y = M(null), i = M("desktop"), P = M(""), g = M(""), K = M(""), C = M(""), z = M(void 0), A = M(""), b = M(!1), B = M(""), m = M(""), X = M(""), $ = M(""), I = M("small"), R = M({ x: 110, y: 90, visible: !1 }), Z = M(0);
    let ve = null;
    const ee = W(
      () => !!c.running || !F.value && !!(y.value?.active && y.value?.employeeId === c.employeeId)
    ), ie = W(() => F.value?.organizerSnapshot && !ee.value ? F.value.organizerSnapshot : y.value?.employeeId === c.employeeId && y.value.organizerSnapshot || null), me = W(() => ee.value ? y.value?.employeeId === c.employeeId ? y.value.organizerSteps || [] : [] : F.value ? F.value.planSteps || [] : y.value?.organizerSteps || []), oe = W(() => {
      const l = JSON.parse(JSON.stringify(me.value)), r = l.find((t) => t.id === X.value);
      return r && (r.type === "create_partition" ? r.params.partitionName = $.value : r.params.folderName = $.value, r.type === "create_launcher_folder" && (r.params.folderSize = I.value)), ha(l), l;
    }), ae = W(() => ie.value ? At(
      ie.value,
      oe.value,
      S.value === "step" ? z.value : void 0,
      S.value === "actual" ? "actual" : "proposal"
    ) : { partitions: [], bookmarkFolders: [], warnings: [] }), ze = W(() => ie.value ? At(ie.value, oe.value, void 0, "actual") : { partitions: [], bookmarkFolders: [], warnings: [] }), ge = W(() => me.value.some((l) => l.status === "applying" || l.status === "undoing"));
    ke(
      () => ae.value.partitions,
      (l) => {
        l.length && (!P.value || !l.some((r) => r.id === P.value)) && (P.value = l[0].id);
      },
      { immediate: !0 }
    );
    const ue = W(
      () => ae.value.partitions.find((l) => l.id === P.value) || ae.value.partitions[0] || null
    );
    ke(
      [() => P.value, () => i.value, () => S.value],
      () => {
        g.value && !ue.value?.folders.some((l) => l.name === g.value) && (g.value = "");
      }
    );
    const Oe = W(
      () => (ue.value?.folders || []).filter((l) => !l.parent)
    ), se = W(
      () => g.value && ue.value?.folders.find((l) => l.name === g.value) || null
    ), Re = W(
      () => se.value ? (ue.value?.folders || []).filter((l) => l.parent === se.value?.name) : []
    );
    function nt(l) {
      const r = ue.value?.folders || [];
      let t = r.find((E) => E.name === l);
      const u = /* @__PURE__ */ new Set();
      for (; t?.parent && !u.has(t.name); ) {
        u.add(t.name);
        const E = r.find((V) => V.name === t.parent);
        if (!E) break;
        t = E;
      }
      return t?.name || l;
    }
    const Pe = W(() => {
      const l = ue.value;
      if (!l) return [];
      const r = ze.value.partitions.find((h) => h.id === l.id), t = new Set(l.folders.map((h) => h.name)), u = /* @__PURE__ */ new Map();
      for (const h of oe.value) {
        if (!["pending", "error"].includes(h.status)) continue;
        let x = h.params;
        try {
          x = Ne(h, oe.value);
        } catch {
          continue;
        }
        if ((h.type === "move_quick_link" || h.type === "promote_bookmark_to_launcher") && x.targetFolder && t.has(x.targetFolder)) {
          const N = h.type === "move_quick_link" ? x.linkId : `preview:${h.id}`;
          N && u.set(N, {
            targetFolder: x.targetFolder,
            rootFolder: nt(x.targetFolder),
            stepId: h.id
          });
        }
      }
      const E = [], V = /* @__PURE__ */ new Set();
      for (const h of r?.looseLinks || []) {
        const x = u.get(h.id);
        if (x)
          E.push({
            ...h,
            badge: "moved",
            pendingTargetFolder: x.targetFolder,
            pendingRootFolder: x.rootFolder,
            stepId: x.stepId
          }), V.add(h.id);
        else {
          const N = l.looseLinks.find((ce) => ce.id === h.id);
          N && (E.push({ ...N }), V.add(h.id));
        }
      }
      for (const h of l.looseLinks)
        V.has(h.id) || (E.push({ ...h }), V.add(h.id));
      for (const h of l.folders)
        for (const x of h.links) {
          if (V.has(x.id)) continue;
          const N = u.get(x.id);
          N && (E.push({
            ...x,
            pendingTargetFolder: N.targetFolder,
            pendingRootFolder: N.rootFolder,
            stepId: N.stepId
          }), V.add(x.id));
        }
      return E;
    });
    function Ue(l) {
      const r = (ue.value?.folders || []).filter((u) => u.parent === l.name), t = [...l.links];
      for (const u of r)
        for (const E of u.links) {
          if (t.length >= 9) break;
          t.push(E);
        }
      return {
        title: l.name,
        preview: t.slice(0, 9),
        count: l.links.length + r.length
      };
    }
    function je(l) {
      P.value = l, g.value = "";
    }
    function Ce(l) {
      g.value = g.value === l ? "" : l;
    }
    const $e = W(() => {
      const l = ae.value.bookmarkFolders, r = new Set(l.map((u) => u.id)), t = l.filter((u) => !u.parentId || u.parentId === "0" || !r.has(u.parentId));
      return t.length ? t : l.slice(0, 1);
    });
    ke(
      $e,
      (l) => {
        l.length && (!K.value || !l.some((r) => r.id === K.value)) && (K.value = l[0].id);
      },
      { immediate: !0 }
    );
    const fe = W(
      () => $e.value.find((l) => l.id === K.value) || $e.value[0] || null
    );
    ke(
      [() => K.value, () => i.value],
      () => {
        C.value && !ae.value.bookmarkFolders.some((l) => l.id === C.value) && (C.value = "");
      }
    );
    const De = W(() => {
      const l = fe.value;
      return l ? ae.value.bookmarkFolders.filter((r) => r.parentId === l.id) : [];
    });
    function lt(l, r) {
      const t = ae.value.bookmarkFolders;
      let u = t.find((V) => V.id === l || V.title === l);
      const E = /* @__PURE__ */ new Set();
      for (; u && u.parentId && u.parentId !== r && !E.has(u.id); ) {
        E.add(u.id);
        const V = t.find((h) => h.id === u.parentId);
        if (!V) break;
        u = V;
      }
      return u && u.parentId === r ? u.id : "";
    }
    function Ge(l) {
      const r = ae.value.bookmarkFolders, t = new Set($e.value.map((V) => V.id));
      let u = r.find((V) => V.id === l || V.title === l);
      const E = /* @__PURE__ */ new Set();
      for (; u && !t.has(u.id) && u.parentId && !E.has(u.id); )
        E.add(u.id), u = r.find((V) => V.id === u.parentId);
      return u && t.has(u.id) ? u.id : "";
    }
    const Be = W(() => {
      const l = fe.value;
      if (!l) return [];
      const r = ae.value.bookmarkFolders, t = ze.value.bookmarkFolders.find((h) => h.id === l.id), u = /* @__PURE__ */ new Map();
      for (const h of oe.value) {
        if (h.type !== "move_bookmark" || !["pending", "error"].includes(h.status)) continue;
        let x = h.params;
        try {
          x = Ne(h, oe.value);
        } catch {
          continue;
        }
        if (!x.bookmarkId || !x.targetFolder) continue;
        const N = r.find((Fe) => Fe.id === x.targetFolder || Fe.title === x.targetFolder);
        if (!N) continue;
        const ce = lt(N.id, l.id);
        ce && u.set(x.bookmarkId, {
          targetFolderTitle: N.title,
          rootFolderId: ce,
          stepId: h.id
        });
      }
      const E = [], V = /* @__PURE__ */ new Set();
      for (const h of t?.items || []) {
        const x = u.get(h.id);
        if (x)
          E.push({
            id: h.id,
            title: h.title,
            url: h.url,
            badge: "moved",
            pendingTargetFolder: x.targetFolderTitle,
            pendingRootFolderId: x.rootFolderId,
            stepId: x.stepId
          }), V.add(h.id);
        else {
          const N = l.items.find((ce) => ce.id === h.id);
          N && (E.push({ id: N.id, title: N.title, url: N.url, badge: N.badge }), V.add(h.id));
        }
      }
      for (const h of l.items)
        V.has(h.id) || (E.push({ id: h.id, title: h.title, url: h.url, badge: h.badge }), V.add(h.id));
      for (const h of r)
        for (const x of h.items) {
          if (V.has(x.id)) continue;
          const N = u.get(x.id);
          N && (E.push({
            id: x.id,
            title: x.title,
            url: x.url,
            badge: "moved",
            pendingTargetFolder: N.targetFolderTitle,
            pendingRootFolderId: N.rootFolderId,
            stepId: N.stepId
          }), V.add(x.id));
        }
      return E;
    });
    function qe(l) {
      const t = ae.value.bookmarkFolders.filter((E) => E.parentId === l.id), u = [...l.items];
      for (const E of t)
        for (const V of E.items) {
          if (u.length >= 9) break;
          u.push(V);
        }
      return {
        title: l.title,
        preview: u.slice(0, 9),
        count: l.items.length + t.length
      };
    }
    const re = W(
      () => C.value && ae.value.bookmarkFolders.find((l) => l.id === C.value) || null
    ), Te = W(
      () => re.value ? ae.value.bookmarkFolders.filter((l) => l.parentId === re.value?.id) : []
    );
    function Je(l) {
      K.value = l, C.value = "";
    }
    function Ae(l) {
      C.value = C.value === l ? "" : l;
    }
    function Ke() {
      const l = re.value?.parentId;
      !l || l === fe.value?.id || l === "0" ? C.value = "" : C.value = l;
    }
    function p(l) {
      return l === "applied" ? "✓" : l === "promoted" ? "上屏" : l === "moved" ? "移入" : "";
    }
    const o = M([]);
    function s(l, r, t, u, E) {
      const V = r.getBoundingClientRect(), h = t.getBoundingClientRect();
      if (V.width <= 0 || h.width <= 0) return null;
      const x = V.left - u.left + V.width * 0.5, N = V.top - u.top + Math.min(V.height * 0.36, 30), ce = h.left - u.left + h.width * 0.5, Fe = h.top - u.top + Math.min(h.height * 0.38, t.classList.contains("size-large") ? 68 : 30), Zt = ce - x, ct = Fe - N, We = Math.hypot(Zt, ct);
      if (We < 10) return null;
      const eo = (x + ce) * 0.5, to = Math.max(18, Math.min(46, We * 0.22)), pt = eo + (ct > 20 ? -12 : ct < -20 ? 12 : 0), vt = Math.max(6, Math.min(N, Fe) - to), St = pt - x, Ct = vt - N, xt = Math.hypot(St, Ct) || 1, Et = Math.min(18, We * 0.22), Lt = x + St / xt * Et, Mt = N + Ct / xt * Et, Nt = ce - pt, zt = Fe - vt, Rt = Math.hypot(Nt, zt) || 1, oo = t.classList.contains("size-large"), Pt = Math.min(oo ? 42 : 25, We * 0.32), Bt = ce - Nt / Rt * Pt, Tt = Fe - zt / Rt * Pt;
      return {
        id: l,
        path: `M ${Lt.toFixed(1)} ${Mt.toFixed(1)} Q ${pt.toFixed(1)} ${vt.toFixed(1)} ${Bt.toFixed(1)} ${Tt.toFixed(1)}`,
        sx: Number(Lt.toFixed(1)),
        sy: Number(Mt.toFixed(1)),
        ex: Number(Bt.toFixed(1)),
        ey: Number(Tt.toFixed(1)),
        focused: E
      };
    }
    function T() {
      const l = Y.value;
      if (!l) {
        o.value = [];
        return;
      }
      const r = l.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) {
        o.value = [];
        return;
      }
      const t = [];
      if (i.value === "desktop")
        for (const u of Pe.value) {
          if (!u.pendingRootFolder) continue;
          const E = Array.from(l.querySelectorAll("[data-peek-link]")).find((N) => N.dataset.peekLink === u.id), V = Array.from(l.querySelectorAll("[data-peek-folder]")).find((N) => N.dataset.peekFolder === u.pendingRootFolder);
          if (!E || !V) continue;
          const h = !!(z.value && z.value === u.stepId) || rt(u.id, u.url) || st(u.pendingTargetFolder || u.pendingRootFolder), x = s(`desk:${u.id}->${u.pendingRootFolder}`, E, V, r, h);
          x && t.push(x);
        }
      else
        for (const u of Be.value) {
          if (!u.pendingRootFolderId) continue;
          const E = Array.from(l.querySelectorAll("[data-peek-bm-item]")).find((N) => N.dataset.peekBmItem === u.id), V = Array.from(l.querySelectorAll("[data-peek-bm-id]")).find((N) => N.dataset.peekBmId === u.pendingRootFolderId);
          if (!E || !V) continue;
          const h = !!(z.value && z.value === u.stepId) || Ee.value?.bookmarkId === u.id, x = s(`bm:${u.id}->${u.pendingRootFolderId}`, E, V, r, h);
          x && t.push(x);
        }
      o.value = t;
    }
    const H = W(() => me.value.filter((l) => l.status === "pending" || l.status === "error").length), ye = W(() => me.value.filter((l) => l.status === "applied").length), xe = W(() => y.value?.employeeId === c.employeeId && y.value?.timelineSteps?.length ? y.value.timelineSteps : []), Ie = W(() => z.value && oe.value.find((l) => l.id === z.value) || null), it = W(() => ee.value && y.value?.cursorLabel ? y.value.cursorLabel : Ie.value ? Ie.value.title : "");
    function Wt(l) {
      switch (l.type) {
        case "create_partition":
          return "新建分区";
        case "create_launcher_folder":
          return l.params.folderSize === "large" ? "大文件夹" : "小文件夹";
        case "move_quick_link":
          return "网站归类";
        case "promote_bookmark_to_launcher":
          return "书签上桌面";
        case "create_bookmark_folder":
          return "书签目录";
        case "move_bookmark":
          return "书签归档";
        case "rename_folder":
        case "rename_link":
          return "改名";
        case "remove_folder":
          return "移除文件夹";
        case "merge_folders":
          return "合并文件夹";
      }
    }
    const Ee = W(() => {
      if (!Ie.value) return null;
      try {
        return Ne(Ie.value, oe.value);
      } catch {
        return Ie.value.params;
      }
    });
    function st(l) {
      const r = Ee.value;
      return r ? r.folderName === l || r.targetFolder === l || r.parentFolderName === l : !1;
    }
    function rt(l, r) {
      const t = Ee.value;
      return t ? !!t.linkId && t.linkId === l || !!t.bookmarkUrl && t.bookmarkUrl === r : !1;
    }
    function gt(l, r) {
      const t = Ee.value;
      return t ? t.targetFolder === l || t.targetFolder === r || t.folderName === r || t.parentBookmarkId === l : !1;
    }
    function yt(l) {
      const r = Ee.value;
      return r ? !!r.bookmarkId && r.bookmarkId === l : !1;
    }
    function Ht() {
      const l = f.value;
      if (!l) return null;
      if (!ee.value && Ie.value) {
        const t = Ie.value, u = Ee.value || t.params;
        if (t.type === "create_bookmark_folder" || t.type === "move_bookmark" || u.scope === "bookmarks") {
          const h = u.targetFolder || u.sourceFolder || u.folderName;
          if (h) {
            const x = Array.from(l.querySelectorAll("[data-peek-bm-folder]")).find((N) => N.dataset.peekBmFolder === h || N.dataset.peekBmId === h);
            if (x) return x;
          }
          if (u.bookmarkId) {
            const x = Array.from(l.querySelectorAll("[data-peek-bm-item]")).find((N) => N.dataset.peekBmItem === u.bookmarkId);
            if (x) return x;
          }
          return l.querySelector('[data-peek-target="org-bookmarks"]');
        }
        if (t.type === "create_partition") {
          const h = u.partitionName;
          if (h) {
            const x = Array.from(l.querySelectorAll("[data-peek-part]")).find((N) => N.dataset.peekPart === h || N.dataset.peekPartLabel === h);
            if (x) return x;
          }
          return l.querySelector('[data-peek-target="org-partitions"]');
        }
        const E = u.targetFolder || u.folderName;
        if (E) {
          const h = Array.from(l.querySelectorAll("[data-peek-folder]")).find((N) => N.dataset.peekFolder === E);
          if (h) return h;
          const x = u.parentFolderName || ue.value?.folders.find((N) => N.name === E)?.parent;
          if (x) {
            const N = Array.from(l.querySelectorAll("[data-peek-folder]")).find((ce) => ce.dataset.peekFolder === x);
            if (N) return N;
          }
        }
        const V = u.linkId || u.bookmarkUrl;
        if (V) {
          const h = Array.from(l.querySelectorAll("[data-peek-link]")).find((x) => x.dataset.peekLink === V);
          if (h) return h;
        }
        return l.querySelector('[data-peek-target="org-folders"]');
      }
      const r = y.value?.cursorTarget;
      return r && r !== "org-approval" ? l.querySelector(`[data-peek-target="${r}"]`) : l.querySelector('[data-peek-target="org-folders"]') || l.querySelector('[data-peek-target="org-partitions"]');
    }
    async function bt() {
      await Vt(), T();
      const l = f.value;
      if (!l || !ie.value && !ee.value) {
        R.value.visible = !1;
        return;
      }
      const r = l.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      const t = Ht();
      if (!t) {
        R.value = {
          x: Math.round(r.width * 0.42),
          y: Math.round(r.height * 0.36),
          visible: !!it.value
        };
        return;
      }
      const u = t.getBoundingClientRect(), E = Math.max(18, Math.min(r.width - 170, u.left - r.left + Math.min(u.width * 0.48, 72))), V = Math.max(46, Math.min(r.height - 42, u.top - r.top + Math.min(u.height * 0.52, 42)));
      R.value = { x: Math.round(E), y: Math.round(V), visible: !0 }, Z.value++;
    }
    ke(
      [
        ue,
        fe,
        g,
        C,
        i,
        z,
        oe,
        ee,
        () => y.value?.cursorTarget,
        () => y.value?.cursorLabel
      ],
      () => {
        bt();
      },
      { immediate: !0 }
    );
    function dt(l) {
      z.value = l.id;
      let r = l.params;
      try {
        r = Ne(l, oe.value);
      } catch {
      }
      if (l.type === "create_bookmark_folder" || l.type === "move_bookmark" || r.scope === "bookmarks") {
        i.value = "bookmarks";
        const u = r.targetFolder || r.sourceFolder || r.folderName || r.parentBookmarkId || ie.value?.bookmarks.find((E) => E.id === r.bookmarkId)?.parentId;
        if (u) {
          const E = Ge(u);
          E && K.value !== E && Je(E);
        }
        return;
      }
      i.value = "desktop";
      const t = r.partitionName || r.targetPartition || ie.value?.folders.find((u) => u.name === (r.targetFolder || r.sourceFolder))?.page || ie.value?.links.find((u) => u.id === r.linkId)?.page;
      if (t) {
        const u = ae.value.partitions.find(
          (E) => E.id === t || E.label.toLowerCase() === t.toLowerCase()
        );
        u && P.value !== u.id && je(u.id);
      }
    }
    function Qt(l) {
      if (["pending", "error"].includes(l.status)) {
        if (X.value === l.id) {
          X.value = "";
          return;
        }
        X.value = l.id, $.value = l.params.folderName || l.params.partitionName || "", I.value = l.params.folderSize === "large" ? "large" : "small";
      }
    }
    async function ht(l) {
      if (!(!F.value?.id || A.value || b.value || ee.value || !["pending", "error"].includes(l.status))) {
        A.value = l.id, m.value = "", B.value = "";
        try {
          const r = X.value === l.id ? {
            ...l.type === "create_partition" ? { partitionName: $.value } : {},
            ...l.type === "create_launcher_folder" || l.type === "create_bookmark_folder" ? { folderName: $.value } : {},
            ...l.type === "create_launcher_folder" ? { folderSize: I.value } : {}
          } : void 0, t = await de(
            typeof chrome > "u" ? null : chrome.runtime,
            "apply-plan-step",
            {
              runId: F.value.id,
              stepId: l.id,
              ...r ? { patch: r } : {}
            }
          );
          L.value = t.run, X.value = "", B.value = t?.note || `已生效：${l.title}`, _("updated");
        } catch (r) {
          m.value = r instanceof Error ? r.message : "执行步骤失败。", await ut();
        } finally {
          A.value = "";
        }
      }
    }
    async function Yt(l) {
      if (!(!F.value?.id || A.value || b.value || ee.value || !["pending", "error", "skipped"].includes(l.status))) {
        A.value = l.id, m.value = "";
        try {
          const r = await de(
            typeof chrome > "u" ? null : chrome.runtime,
            "skip-plan-step",
            { runId: F.value.id, stepId: l.id }
          );
          L.value = r.run, X.value === l.id && (X.value = ""), B.value = r.note, _("updated");
        } catch (r) {
          m.value = r instanceof Error ? r.message : "更新状态失败。";
        } finally {
          A.value = "";
        }
      }
    }
    async function _t() {
      if (!F.value?.id || b.value || A.value || ee.value || ge.value || X.value) return;
      if (!U.value) {
        U.value = !0;
        return;
      }
      U.value = !1;
      const l = F.value.id, r = me.value.filter((u) => u.status === "pending" || u.status === "error");
      if (!r.length) return;
      b.value = !0, m.value = "", B.value = "";
      let t = 0;
      try {
        for (const u of r) {
          A.value = u.id, dt(u);
          try {
            const E = await de(
              typeof chrome > "u" ? null : chrome.runtime,
              "apply-plan-step",
              { runId: l, stepId: u.id }
            );
            L.value = E.run, t++;
          } catch (E) {
            m.value = `已生效 ${t} 步，第 #${u.order} 步停止：${E instanceof Error ? E.message : "失败"}`, await ut();
            break;
          }
        }
        _("updated"), t > 0 && !m.value && (B.value = `已依次生效全部 ${t} 步，新标签页与书签已同步更新！`);
      } finally {
        A.value = "", b.value = !1;
      }
    }
    async function ut() {
      try {
        const r = (await de(chrome.runtime, "list", {})).runs.find((t) => t.id === F.value?.id);
        r && (L.value = r);
      } catch {
      }
      _("updated");
    }
    async function Xt(l) {
      if (!(!F.value || A.value || b.value || ee.value)) {
        A.value = l.id, m.value = "";
        try {
          const r = await de(
            chrome.runtime,
            "undo-plan-step",
            { runId: F.value.id, stepId: l.id }
          );
          L.value = r.run, B.value = r.note, _("updated");
        } catch (r) {
          m.value = r instanceof Error ? r.message : "撤销失败。", await ut();
        } finally {
          A.value = "";
        }
      }
    }
    function wt(l) {
      G.value && !l.composedPath().includes(G.value) && !A.value && !b.value && _("close");
    }
    function $t(l) {
      l.key === "Escape" && !A.value && !b.value && _("close");
    }
    async function It() {
      if (!(typeof chrome > "u" || !chrome.storage?.local))
        try {
          const r = (await chrome.storage.local.get(we))?.[we];
          r && r.employeeId === c.employeeId && r.mode === "organizer" && (y.value = r);
        } catch {
        }
    }
    function Ft(l, r) {
      if (r === "local" && l[we]?.newValue) {
        const t = l[we].newValue;
        t.employeeId === c.employeeId && t.mode === "organizer" && (y.value = t);
      }
    }
    return tt(() => {
      document.addEventListener("pointerdown", wt), document.addEventListener("keydown", $t), window.addEventListener("resize", T), It(), typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener(Ft), ve = setInterval(() => {
        c.running && !document.hidden && It();
      }, 450);
    }), ot(() => {
      document.removeEventListener("pointerdown", wt), document.removeEventListener("keydown", $t), window.removeEventListener("resize", T), typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener(Ft), ve && clearInterval(ve);
    }), (l, r) => (a(), Ve(Ot, { to: "body" }, [
      e("section", {
        ref_key: "panelRef",
        ref: G,
        class: "org-modal",
        style: Xe(pe(J)),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": `${v.employeeName} 预览与审批`
      }, [
        e("header", {
          ref_key: "headerRef",
          ref: q,
          class: "org-head",
          onPointerdown: r[3] || (r[3] = //@ts-ignore
          (...t) => pe(D) && pe(D)(...t))
        }, [
          e("div", wa, [
            e("span", {
              class: O(["org-dot", { live: ee.value }])
            }, null, 2),
            e("div", null, [
              e("strong", null, d(v.employeeName) + " · 整理窥屏与逐条审批", 1),
              F.value?.planSummary ? (a(), n("small", $a, d(F.value.planSummary), 1)) : (a(), n("small", Ia, "只读生成建议：左侧实时预演整理效果，右侧每点击 1 步才真正写入那 1 步。"))
            ])
          ]),
          e("div", Fa, [
            v.backendStale ? (a(), n("button", {
              key: 0,
              type: "button",
              class: "org-btn warn",
              onClick: r[0] || (r[0] = (t) => _("reloadExtension"))
            }, " 🔄 热重载扩展 ")) : k("", !0),
            e("button", {
              type: "button",
              class: "org-btn primary",
              disabled: ee.value || !!A.value || b.value,
              onClick: r[1] || (r[1] = (t) => _("runNow", v.employeeId))
            }, d(ee.value ? "盘点规划中…" : "↻ 重新盘点提案"), 9, Sa),
            e("button", {
              type: "button",
              class: "org-btn subtle",
              disabled: !!A.value || b.value,
              "aria-label": "关闭审批窗",
              onClick: r[2] || (r[2] = (t) => _("close"))
            }, "✕", 8, Ca)
          ])
        ], 544),
        e("div", xa, [
          e("div", {
            ref_key: "stageRef",
            ref: f,
            class: "org-stage"
          }, [
            e("div", Ea, [
              e("div", La, [
                e("button", {
                  type: "button",
                  role: "tab",
                  "data-peek-target": "org-partitions",
                  "aria-selected": i.value === "desktop",
                  class: O({ active: i.value === "desktop" }),
                  onClick: r[4] || (r[4] = (t) => i.value = "desktop")
                }, " 🖥️ 新标签页桌面 ", 10, Ma),
                e("button", {
                  type: "button",
                  role: "tab",
                  "data-peek-target": "org-bookmarks",
                  "aria-selected": i.value === "bookmarks",
                  class: O({ active: i.value === "bookmarks" }),
                  onClick: r[5] || (r[5] = (t) => i.value = "bookmarks")
                }, " 🔖 浏览器书签树 ", 10, Na)
              ]),
              e("span", {
                class: "org-flow-hint",
                "data-mode": S.value === "step" ? "step" : "flow"
              }, [...r[15] || (r[15] = [
                e("i", {
                  class: "hint-dash",
                  "aria-hidden": "true"
                }, null, -1),
                e("span", null, "虚线指向待归入文件夹 · 点击文件夹可在下方展开", -1)
              ])], 8, za)
            ]),
            e("div", {
              class: "stage-scroll",
              onScroll: r[10] || (r[10] = (t) => {
                bt();
              })
            }, [
              (a(!0), n(j, null, Q(ae.value.warnings, (t) => (a(), n("p", {
                key: t,
                class: "step-toast err"
              }, d(t), 1))), 128)),
              ie.value ? i.value === "desktop" ? (a(), n("div", Ba, [
                e("div", Ta, [
                  (a(!0), n(j, null, Q(ae.value.partitions, (t) => (a(), n("button", {
                    key: t.id,
                    type: "button",
                    class: O(["part-tab", { active: ue.value?.id === t.id, isNew: t.badge === "new", isApplied: t.badge === "applied" }]),
                    "data-peek-part": t.id,
                    "data-peek-part-label": t.label,
                    onClick: (u) => je(t.id)
                  }, [
                    e("span", null, d(t.label), 1),
                    t.badge === "new" ? (a(), n("em", Va, "+待建")) : t.badge === "applied" ? (a(), n("em", Oa, "✓已生效")) : k("", !0)
                  ], 10, Aa))), 128))
                ]),
                ue.value ? (a(), n("div", Ua, [
                  e("div", {
                    ref_key: "gridWrapRef",
                    ref: Y,
                    class: "grid-stage-wrap"
                  }, [
                    Oe.value.length || Pe.value.length ? (a(), n("div", ja, [
                      (a(!0), n(j, null, Q(Oe.value, (t) => (a(), n("div", {
                        key: t.name,
                        class: O(["launcher-folder", [
                          `size-${t.size}`,
                          t.badge ? `peek-${t.badge}` : "",
                          st(t.name) ? "peek-focus" : "",
                          g.value === t.name ? "is-open" : ""
                        ]]),
                        "data-peek-folder": t.name,
                        title: `${t.name}（${t.size === "large" ? "大文件夹" : "小文件夹"}，点击在下方展开）`,
                        role: "button",
                        tabindex: "0",
                        onClick: (u) => Ce(t.name),
                        onKeydown: He(Se((u) => Ce(t.name), ["prevent"]), ["enter"])
                      }, [
                        be(_e, {
                          folder: Ue(t),
                          size: t.size
                        }, {
                          default: he(() => [
                            t.badge ? (a(), n("span", {
                              key: 0,
                              class: O(["peek-corner-badge", t.badge])
                            }, d(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : k("", !0)
                          ]),
                          _: 2
                        }, 1032, ["folder", "size"])
                      ], 42, Da))), 128)),
                      (a(!0), n(j, null, Q(Pe.value, (t) => (a(), n("a", {
                        href: pe(Ye)(t.url) || void 0,
                        target: "_blank",
                        rel: "noreferrer",
                        key: t.id,
                        class: O(["launcher-link", [
                          t.pendingTargetFolder ? "peek-moving-out" : t.badge ? `peek-${t.badge}` : "",
                          rt(t.id, t.url) ? "peek-focus" : ""
                        ]]),
                        "data-peek-link": t.id,
                        title: t.pendingTargetFolder ? `${t.title} → 待移入「${t.pendingTargetFolder}」
${t.url}` : `${t.title}
${t.url}`
                      }, [
                        be(_e, { link: t }, {
                          default: he(() => [
                            t.pendingTargetFolder ? (a(), n("span", qa, " → " + d(t.pendingTargetFolder), 1)) : t.badge ? (a(), n("span", {
                              key: 1,
                              class: O(["peek-corner-badge", t.badge])
                            }, d(p(t.badge)), 3)) : k("", !0)
                          ]),
                          _: 2
                        }, 1032, ["link"])
                      ], 10, Ga))), 128))
                    ])) : (a(), n("p", Ja, " 该分区目前为空，可审批新建文件夹或移入网站。 ")),
                    o.value.length ? (a(), n("svg", Ka, [
                      r[19] || (r[19] = e("defs", null, [
                        e("marker", {
                          id: "org-flow-arrow",
                          viewBox: "0 0 10 10",
                          refX: "7.5",
                          refY: "5",
                          markerWidth: "6",
                          markerHeight: "6",
                          orient: "auto-start-reverse"
                        }, [
                          e("path", {
                            d: "M 1 1.5 L 8.5 5 L 1 8.5 z",
                            fill: "#0284c7"
                          })
                        ]),
                        e("marker", {
                          id: "org-flow-arrow-focus",
                          viewBox: "0 0 10 10",
                          refX: "7.5",
                          refY: "5",
                          markerWidth: "6.5",
                          markerHeight: "6.5",
                          orient: "auto-start-reverse"
                        }, [
                          e("path", {
                            d: "M 1 1.5 L 8.5 5 L 1 8.5 z",
                            fill: "#0ea5e9"
                          })
                        ])
                      ], -1)),
                      (a(!0), n(j, null, Q(o.value, (t) => (a(), n("g", {
                        key: t.id,
                        class: O({ focused: t.focused })
                      }, [
                        e("path", {
                          d: t.path,
                          class: "org-flow-halo"
                        }, null, 8, Wa),
                        e("path", {
                          d: t.path,
                          class: "org-flow-path",
                          "marker-end": t.focused ? "url(#org-flow-arrow-focus)" : "url(#org-flow-arrow)"
                        }, null, 8, Ha),
                        e("circle", {
                          cx: t.sx,
                          cy: t.sy,
                          r: "2.8",
                          class: "org-flow-dot"
                        }, null, 8, Qa)
                      ], 2))), 128))
                    ])) : k("", !0)
                  ], 512),
                  se.value ? (a(), n("section", Ya, [
                    e("header", Xa, [
                      e("div", Za, [
                        se.value.parent ? (a(), n("button", {
                          key: 0,
                          type: "button",
                          class: "org-folder-icon-btn back",
                          title: `返回上一级：${se.value.parent}`,
                          onClick: r[7] || (r[7] = (t) => g.value = se.value.parent)
                        }, " ‹ ", 8, en)) : k("", !0),
                        e("h3", null, d(se.value.name), 1),
                        se.value.badge === "new" ? (a(), n("span", tn, "+待建")) : se.value.badge === "applied" ? (a(), n("span", on, "✓已建")) : k("", !0)
                      ]),
                      e("div", an, [
                        r[20] || (r[20] = e("span", {
                          class: "org-folder-icon-btn plus",
                          "aria-hidden": "true"
                        }, "+", -1)),
                        e("button", {
                          type: "button",
                          class: "org-folder-icon-btn close",
                          title: "关闭文件夹",
                          "aria-label": "关闭文件夹",
                          onClick: r[8] || (r[8] = (t) => g.value = "")
                        }, " × ")
                      ])
                    ]),
                    e("div", nn, [
                      Re.value.length || se.value.links.length ? (a(), n("div", ln, [
                        (a(!0), n(j, null, Q(Re.value, (t) => (a(), n("div", {
                          key: t.name,
                          class: O(["launcher-folder", [`size-${t.size}`, t.badge ? `peek-${t.badge}` : "", st(t.name) ? "peek-focus" : ""]]),
                          "data-peek-folder": t.name,
                          role: "button",
                          tabindex: "0",
                          onClick: (u) => g.value = t.name,
                          onKeydown: He(Se((u) => g.value = t.name, ["prevent"]), ["enter"])
                        }, [
                          be(_e, {
                            folder: Ue(t),
                            size: t.size
                          }, {
                            default: he(() => [
                              t.badge ? (a(), n("span", {
                                key: 0,
                                class: O(["peek-corner-badge", t.badge])
                              }, d(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : k("", !0)
                            ]),
                            _: 2
                          }, 1032, ["folder", "size"])
                        ], 42, sn))), 128)),
                        (a(!0), n(j, null, Q(se.value.links, (t) => (a(), n("a", {
                          href: pe(Ye)(t.url) || void 0,
                          target: "_blank",
                          rel: "noreferrer",
                          key: t.id,
                          class: O(["launcher-link", [t.badge ? `peek-${t.badge}` : "", rt(t.id, t.url) ? "peek-focus" : ""]]),
                          title: `${t.title}
${t.url}`
                        }, [
                          be(_e, { link: t }, {
                            default: he(() => [
                              t.badge ? (a(), n("span", {
                                key: 0,
                                class: O(["peek-corner-badge", t.badge])
                              }, d(p(t.badge)), 3)) : k("", !0)
                            ]),
                            _: 2
                          }, 1032, ["link"])
                        ], 10, rn))), 128))
                      ])) : (a(), n("p", dn, "暂无网站，审批移入后将在此处显示"))
                    ])
                  ])) : k("", !0)
                ])) : k("", !0)
              ])) : (a(), n("div", un, [
                e("div", cn, [
                  (a(!0), n(j, null, Q($e.value, (t) => (a(), n("button", {
                    key: t.id,
                    type: "button",
                    class: O(["part-tab", { active: fe.value?.id === t.id, isNew: t.badge === "new", isApplied: t.badge === "applied" }]),
                    "data-peek-bm-folder": t.title,
                    "data-peek-bm-id": t.id,
                    onClick: (u) => Je(t.id)
                  }, [
                    e("span", null, d(t.title), 1),
                    t.badge === "new" ? (a(), n("em", vn, "+待建")) : t.badge === "applied" ? (a(), n("em", mn, "✓已生效")) : k("", !0)
                  ], 10, pn))), 128))
                ]),
                fe.value ? (a(), n("div", fn, [
                  e("div", {
                    ref_key: "gridWrapRef",
                    ref: Y,
                    class: "grid-stage-wrap"
                  }, [
                    De.value.length || Be.value.length ? (a(), n("div", kn, [
                      (a(!0), n(j, null, Q(De.value, (t) => (a(), n("div", {
                        key: t.id,
                        class: O(["launcher-folder size-small", [
                          t.badge ? `peek-${t.badge}` : "",
                          gt(t.id, t.title) ? "peek-focus" : "",
                          C.value === t.id ? "is-open" : ""
                        ]]),
                        "data-peek-bm-folder": t.title,
                        "data-peek-bm-id": t.id,
                        title: `${t.path || t.title}（点击在下方展开文件夹）`,
                        role: "button",
                        tabindex: "0",
                        onClick: (u) => Ae(t.id),
                        onKeydown: He(Se((u) => Ae(t.id), ["prevent"]), ["enter"])
                      }, [
                        be(_e, {
                          folder: qe(t),
                          size: "small"
                        }, {
                          default: he(() => [
                            t.badge ? (a(), n("span", {
                              key: 0,
                              class: O(["peek-corner-badge", t.badge])
                            }, d(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : k("", !0)
                          ]),
                          _: 2
                        }, 1032, ["folder"])
                      ], 42, gn))), 128)),
                      (a(!0), n(j, null, Q(Be.value, (t) => (a(), n("a", {
                        href: pe(Ye)(t.url) || void 0,
                        target: "_blank",
                        rel: "noreferrer",
                        key: t.id,
                        class: O(["launcher-link", [
                          t.pendingTargetFolder ? "peek-moving-out" : t.badge ? `peek-${t.badge}` : "",
                          yt(t.id) ? "peek-focus" : ""
                        ]]),
                        "data-peek-bm-item": t.id,
                        title: t.pendingTargetFolder ? `${t.title} → 待移入「${t.pendingTargetFolder}」
${t.url}` : `${t.title}
${t.url}`
                      }, [
                        be(_e, { link: t }, {
                          default: he(() => [
                            t.pendingTargetFolder ? (a(), n("span", bn, " → " + d(t.pendingTargetFolder), 1)) : t.badge ? (a(), n("span", {
                              key: 1,
                              class: O(["peek-corner-badge", t.badge])
                            }, d(t.badge === "applied" ? "✓" : "移入"), 3)) : k("", !0)
                          ]),
                          _: 2
                        }, 1032, ["link"])
                      ], 10, yn))), 128))
                    ])) : (a(), n("p", hn, " 该书签栏板块下暂无目录或书签。 ")),
                    o.value.length ? (a(), n("svg", _n, [
                      r[21] || (r[21] = e("defs", null, [
                        e("marker", {
                          id: "org-bm-flow-arrow",
                          viewBox: "0 0 10 10",
                          refX: "7.5",
                          refY: "5",
                          markerWidth: "6",
                          markerHeight: "6",
                          orient: "auto-start-reverse"
                        }, [
                          e("path", {
                            d: "M 1 1.5 L 8.5 5 L 1 8.5 z",
                            fill: "#0284c7"
                          })
                        ]),
                        e("marker", {
                          id: "org-bm-flow-arrow-focus",
                          viewBox: "0 0 10 10",
                          refX: "7.5",
                          refY: "5",
                          markerWidth: "6.5",
                          markerHeight: "6.5",
                          orient: "auto-start-reverse"
                        }, [
                          e("path", {
                            d: "M 1 1.5 L 8.5 5 L 1 8.5 z",
                            fill: "#0ea5e9"
                          })
                        ])
                      ], -1)),
                      (a(!0), n(j, null, Q(o.value, (t) => (a(), n("g", {
                        key: t.id,
                        class: O({ focused: t.focused })
                      }, [
                        e("path", {
                          d: t.path,
                          class: "org-flow-halo"
                        }, null, 8, wn),
                        e("path", {
                          d: t.path,
                          class: "org-flow-path",
                          "marker-end": t.focused ? "url(#org-bm-flow-arrow-focus)" : "url(#org-bm-flow-arrow)"
                        }, null, 8, $n),
                        e("circle", {
                          cx: t.sx,
                          cy: t.sy,
                          r: "2.8",
                          class: "org-flow-dot"
                        }, null, 8, In)
                      ], 2))), 128))
                    ])) : k("", !0)
                  ], 512),
                  re.value ? (a(), n("section", Fn, [
                    e("header", Sn, [
                      e("div", Cn, [
                        re.value.parentId && re.value.parentId !== fe.value.id && re.value.parentId !== "0" ? (a(), n("button", {
                          key: 0,
                          type: "button",
                          class: "org-folder-icon-btn back",
                          title: "返回上一级文件夹",
                          onClick: Ke
                        }, " ‹ ")) : k("", !0),
                        e("h3", null, d(re.value.title), 1),
                        re.value.badge === "new" ? (a(), n("span", xn, "+待建")) : re.value.badge === "applied" ? (a(), n("span", En, "✓已建")) : k("", !0)
                      ]),
                      e("div", Ln, [
                        r[22] || (r[22] = e("span", {
                          class: "org-folder-icon-btn plus",
                          "aria-hidden": "true"
                        }, "+", -1)),
                        e("button", {
                          type: "button",
                          class: "org-folder-icon-btn close",
                          title: "关闭文件夹",
                          "aria-label": "关闭文件夹",
                          onClick: r[9] || (r[9] = (t) => C.value = "")
                        }, " × ")
                      ])
                    ]),
                    e("div", Mn, [
                      Te.value.length || re.value.items.length ? (a(), n("div", Nn, [
                        (a(!0), n(j, null, Q(Te.value, (t) => (a(), n("div", {
                          key: t.id,
                          class: O(["launcher-folder size-small", [t.badge ? `peek-${t.badge}` : "", gt(t.id, t.title) ? "peek-focus" : ""]]),
                          "data-peek-bm-folder": t.title,
                          "data-peek-bm-id": t.id,
                          role: "button",
                          tabindex: "0",
                          onClick: (u) => C.value = t.id,
                          onKeydown: He(Se((u) => C.value = t.id, ["prevent"]), ["enter"])
                        }, [
                          be(_e, {
                            folder: qe(t),
                            size: "small"
                          }, {
                            default: he(() => [
                              t.badge ? (a(), n("span", {
                                key: 0,
                                class: O(["peek-corner-badge", t.badge])
                              }, d(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : k("", !0)
                            ]),
                            _: 2
                          }, 1032, ["folder"])
                        ], 42, zn))), 128)),
                        (a(!0), n(j, null, Q(re.value.items, (t) => (a(), n("a", {
                          href: pe(Ye)(t.url) || void 0,
                          target: "_blank",
                          rel: "noreferrer",
                          key: t.id,
                          class: O(["launcher-link", [t.badge ? `peek-${t.badge}` : "", yt(t.id) ? "peek-focus" : ""]]),
                          title: `${t.title}
${t.url}`
                        }, [
                          be(_e, { link: t }, {
                            default: he(() => [
                              t.badge ? (a(), n("span", {
                                key: 0,
                                class: O(["peek-corner-badge", t.badge])
                              }, d(t.badge === "applied" ? "✓" : "移入"), 3)) : k("", !0)
                            ]),
                            _: 2
                          }, 1032, ["link"])
                        ], 10, Rn))), 128))
                      ])) : (a(), n("p", Pn, "暂无书签，审批移入后将在此处显示"))
                    ])
                  ])) : k("", !0)
                ])) : k("", !0)
              ])) : (a(), n("div", Ra, [
                r[16] || (r[16] = e("div", { class: "empty-icon" }, "🧭", -1)),
                r[17] || (r[17] = e("h4", null, "准备就绪 · 点击右上角开始盘点", -1)),
                r[18] || (r[18] = e("p", null, "专员会只读读取你的桌面分区、大/小文件夹、常用网站与浏览器书签树，并在右侧生成类似 Todoist 的待审批列表。", -1)),
                e("button", {
                  type: "button",
                  class: "org-btn primary",
                  disabled: ee.value,
                  onClick: r[6] || (r[6] = (t) => _("runNow", v.employeeId))
                }, d(ee.value ? "盘点中…" : "▶ 开始生成整理提案"), 9, Pa)
              ]))
            ], 32),
            R.value.visible && it.value ? (a(), n("div", {
              key: 0,
              class: "peek-cursor",
              style: Xe({ transform: `translate3d(${R.value.x}px, ${R.value.y}px, 0)` })
            }, [
              (a(), n("span", {
                key: Z.value,
                class: "peek-cursor-ripple"
              })),
              r[23] || (r[23] = e("svg", {
                class: "peek-cursor-arrow",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                e("path", {
                  d: "M4.5 3.5l14.5 7.2-6.2 1.8-3.1 5.9L4.5 3.5z",
                  fill: "#0ea5e9",
                  stroke: "#ffffff",
                  "stroke-width": "1.6",
                  "stroke-linejoin": "round"
                })
              ], -1)),
              e("span", Bn, d(it.value), 1)
            ], 4)) : k("", !0)
          ], 512),
          e("aside", Tn, [
            e("div", An, [
              e("div", null, [
                r[24] || (r[24] = e("strong", null, "整理待办清单", -1)),
                e("small", null, "点击圆圈才生效 · 待批 " + d(H.value) + " · 已生效 " + d(ye.value), 1)
              ]),
              H.value > 0 && !ee.value ? (a(), n("button", {
                key: 0,
                type: "button",
                class: "apply-all-btn",
                disabled: b.value || !!A.value || ge.value || !!X.value,
                onClick: _t
              }, d(b.value ? "执行中…" : `全部生效 (${H.value})`), 9, Vn)) : k("", !0)
            ]),
            U.value ? (a(), n("div", On, [
              e("span", null, "将按顺序执行剩余 " + d(H.value) + " 步（已跳过项不执行）。", 1),
              e("div", Un, [
                e("button", {
                  type: "button",
                  class: "org-btn primary",
                  onClick: _t
                }, "确认全部生效"),
                e("button", {
                  type: "button",
                  class: "org-btn subtle",
                  onClick: r[11] || (r[11] = (t) => U.value = !1)
                }, "取消")
              ])
            ])) : k("", !0),
            v.generationError ? (a(), n("p", jn, "提案生成失败：" + d(v.generationError), 1)) : k("", !0),
            B.value ? (a(), n("p", Dn, d(B.value), 1)) : k("", !0),
            m.value ? (a(), n("p", Gn, d(m.value), 1)) : k("", !0),
            ee.value && xe.value.length ? (a(), n("div", qn, [
              (a(!0), n(j, null, Q(xe.value, (t, u) => (a(), n("div", {
                key: u,
                class: "live-step-row"
              }, [
                r[25] || (r[25] = e("span", { class: "live-dot" }, null, -1)),
                e("span", null, d(t), 1)
              ]))), 128))
            ])) : k("", !0),
            me.value.length ? (a(), n("div", Jn, [
              (a(!0), n(j, null, Q(oe.value, (t) => (a(), n("article", {
                key: t.id,
                class: O(["todo-item", [t.status, { active: z.value === t.id }]]),
                onMouseenter: (u) => dt(t),
                onMouseleave: r[14] || (r[14] = (u) => z.value = void 0)
              }, [
                e("button", {
                  type: "button",
                  class: "todo-check",
                  disabled: !!A.value || b.value || ee.value || !["pending", "error"].includes(t.status),
                  title: t.status === "applied" ? "已写入生效" : "点击立即生效这一步",
                  onClick: (u) => ht(t)
                }, [
                  A.value === t.id ? (a(), n("span", Hn, "…")) : t.status === "applied" ? (a(), n("span", Qn, "✓")) : k("", !0)
                ], 8, Wn),
                e("div", {
                  class: "todo-main",
                  onClick: (u) => dt(t)
                }, [
                  e("div", Xn, [
                    e("span", Zn, "#" + d(t.order), 1),
                    e("span", {
                      class: O(["type-tag", t.type])
                    }, d(Wt(t)), 3),
                    t.status === "applied" ? (a(), n("span", el, "✓ 已生效")) : t.status === "skipped" ? (a(), n("span", tl, "已跳过")) : t.status === "undone" ? (a(), n("span", ol, "已撤销")) : t.status === "applying" || t.status === "undoing" ? (a(), n("span", al, "未完成")) : k("", !0)
                  ]),
                  e("div", nl, d(t.title), 1),
                  t.dependsOn?.length ? (a(), n("p", ll, " 前置步骤：" + d(t.dependsOn.map((u) => `#${me.value.find((E) => E.id === u)?.order || "?"}`).join("、")), 1)) : k("", !0),
                  t.reason ? (a(), n("p", il, d(t.reason), 1)) : k("", !0),
                  t.errorMessage && !m.value.includes(t.errorMessage) ? (a(), n("p", sl, d(t.errorMessage), 1)) : k("", !0),
                  X.value === t.id ? (a(), n("div", rl, [
                    te(e("input", {
                      "onUpdate:modelValue": r[12] || (r[12] = (u) => $.value = u),
                      type: "text",
                      maxlength: t.type === "create_partition" ? 12 : 20,
                      placeholder: "修改名称"
                    }, null, 8, dl), [
                      [
                        le,
                        $.value,
                        void 0,
                        { trim: !0 }
                      ]
                    ]),
                    t.type === "create_launcher_folder" ? te((a(), n("select", {
                      key: 0,
                      "onUpdate:modelValue": r[13] || (r[13] = (u) => I.value = u)
                    }, [...r[26] || (r[26] = [
                      e("option", { value: "large" }, "大文件夹", -1),
                      e("option", { value: "small" }, "小文件夹", -1)
                    ])], 512)), [
                      [Le, I.value]
                    ]) : k("", !0)
                  ])) : k("", !0),
                  e("div", ul, [
                    t.status === "applied" && t.undo ? (a(), n("button", {
                      key: 0,
                      type: "button",
                      class: "op-btn subtle",
                      disabled: !!A.value || b.value || ee.value,
                      onClick: (u) => Xt(t)
                    }, " ↶ 撤销此步 ", 8, cl)) : ["pending", "error", "skipped"].includes(t.status) ? (a(), n(j, { key: 1 }, [
                      e("button", {
                        type: "button",
                        class: "op-btn apply",
                        disabled: !!A.value || b.value || ee.value || t.status === "skipped",
                        onClick: (u) => ht(t)
                      }, d(A.value === t.id ? "写入中…" : "点击生效"), 9, pl),
                      t.status !== "skipped" && (t.type === "create_partition" || t.type === "create_launcher_folder" || t.type === "create_bookmark_folder") ? (a(), n("button", {
                        key: 0,
                        type: "button",
                        class: "op-btn",
                        disabled: !!A.value || b.value || ee.value,
                        onClick: (u) => Qt(t)
                      }, d(X.value === t.id ? "完成编辑" : "改名/尺寸"), 9, vl)) : k("", !0),
                      e("button", {
                        type: "button",
                        class: "op-btn subtle",
                        disabled: !!A.value || b.value || ee.value,
                        onClick: (u) => Yt(t)
                      }, d(t.status === "skipped" ? "恢复" : "跳过"), 9, ml)
                    ], 64)) : k("", !0)
                  ])
                ], 8, Yn)
              ], 42, Kn))), 128))
            ])) : ee.value ? k("", !0) : (a(), n("div", fl, [...r[27] || (r[27] = [
              e("p", null, "暂无待审批建议", -1),
              e("small", null, "点右上角「↻ 重新盘点提案」生成整理步骤，或调整专员提示词后重试。", -1)
            ])]))
          ])
        ])
      ], 12, _a)
    ]));
  }
}), gl = /* @__PURE__ */ at(kl, [["__scopeId", "data-v-5ba43bf6"]]), yl = ["aria-label"], bl = { class: "sf-head-left" }, hl = { class: "sf-body" }, _l = { class: "sf-search-card" }, wl = { class: "sf-search-foot" }, $l = { class: "sf-examples" }, Il = ["onClick"], Fl = ["disabled"], Sl = {
  key: 0,
  class: "sf-error",
  role: "alert"
}, Cl = {
  key: 1,
  class: "sf-history-strip"
}, xl = ["onClick"], El = {
  key: 2,
  class: "sf-results"
}, Ll = { class: "sf-summary-bar" }, Ml = {
  key: 0,
  class: "sf-section"
}, Nl = { class: "sf-grid" }, zl = { class: "sf-card-top" }, Rl = ["src"], Pl = { class: "sf-card-title" }, Bl = { class: "sf-reason" }, Tl = { class: "sf-card-actions" }, Al = { class: "sf-url" }, Vl = ["href"], Ol = {
  key: 1,
  class: "sf-section"
}, Ul = { class: "sf-grid" }, jl = { class: "sf-card-top" }, Dl = ["src"], Gl = { class: "sf-card-title" }, ql = { class: "sf-reason" }, Jl = { class: "sf-card-actions" }, Kl = ["disabled", "onClick"], Wl = ["href"], Hl = {
  key: 3,
  class: "sf-empty"
}, Ql = /* @__PURE__ */ et({
  __name: "SiteFinderModal",
  props: {
    employeeId: {},
    employeeName: {},
    recentRuns: {}
  },
  emits: ["close", "updated"],
  setup(v, { emit: w }) {
    const c = v, _ = w, { panelRef: y, headerRef: L, initialStyle: F, onHeaderPointerDown: S } = Ut({
      windowId: "site-finder-modal",
      managed: !1,
      defaultWidth: 860,
      defaultHeight: 620,
      minWidth: 360,
      minHeight: 320
    }), U = M(""), G = M(!1), q = M(""), J = M({}), D = M(null), f = M(""), Y = W(
      () => c.recentRuns.filter((b) => b.employeeId === c.employeeId && b.kind === "site-finder" && b.siteFinderResult).slice(0, 8)
    );
    ke(
      Y,
      (b) => {
        !D.value && b[0]?.siteFinderResult && (D.value = b[0].siteFinderResult, f.value = b[0].engine, !U.value && b[0].siteFinderQuery && (U.value = b[0].siteFinderQuery));
      },
      { immediate: !0 }
    );
    const i = [
      "之前存过一个免费生成 SVG 波浪背景的英文网站",
      "书签里有个看开源论文和 AI 模型排行榜的站",
      "常用网站里有个租算力或者跑机器人仿真的控制台"
    ];
    async function P(b) {
      const B = (b ?? U.value).trim();
      if (!(!B || G.value)) {
        b && (U.value = b), G.value = !0, q.value = "";
        try {
          const m = await de(
            typeof chrome > "u" ? null : chrome.runtime,
            "run-site-finder",
            { employeeId: c.employeeId, query: B }
          );
          m?.record?.siteFinderResult && (D.value = m.record.siteFinderResult, f.value = m.record.engine), _("updated");
        } catch (m) {
          q.value = m instanceof Error ? m.message : "找站执行失败，请稍后重试。";
        } finally {
          G.value = !1;
        }
      }
    }
    async function g(b, B) {
      if (!(typeof chrome > "u" || !chrome.storage?.local))
        try {
          const m = await chrome.storage.local.get("quickLinks"), X = Array.isArray(m?.quickLinks) ? m.quickLinks : [];
          X.some(($) => $?.url === B) || (X.push({
            id: `ql-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            title: b,
            url: B,
            page: "常用网站",
            group: "常用网站"
          }), await chrome.storage.local.set({ quickLinks: X })), J.value = { ...J.value, [B]: !0 };
        } catch {
          q.value = "保存到常用网站失败。";
        }
    }
    function K(b) {
      try {
        const B = new URL(b).hostname;
        return typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(`/_favicon/?pageUrl=${encodeURIComponent(b)}&size=32`) : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(B)}&sz=32`;
      } catch {
        return "";
      }
    }
    function C(b) {
      b.siteFinderResult && (D.value = b.siteFinderResult, f.value = b.engine, b.siteFinderQuery && (U.value = b.siteFinderQuery));
    }
    function z(b) {
      b.key === "Escape" && !G.value && _("close");
    }
    function A(b) {
      y.value && !b.composedPath().includes(y.value) && !G.value && _("close");
    }
    return tt(() => {
      document.addEventListener("keydown", z), document.addEventListener("pointerdown", A);
    }), ot(() => {
      document.removeEventListener("keydown", z), document.removeEventListener("pointerdown", A);
    }), (b, B) => (a(), Ve(Ot, { to: "body" }, [
      e("section", {
        ref_key: "panelRef",
        ref: y,
        class: "sf-modal",
        style: Xe(pe(F)),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": `${v.employeeName} · 记忆找站`
      }, [
        e("header", {
          ref_key: "headerRef",
          ref: L,
          class: "sf-head",
          onPointerdown: B[1] || (B[1] = //@ts-ignore
          (...m) => pe(S) && pe(S)(...m))
        }, [
          e("div", bl, [
            B[6] || (B[6] = e("span", { class: "sf-badge" }, "🔍", -1)),
            e("div", null, [
              e("strong", null, d(v.employeeName), 1),
              B[5] || (B[5] = e("small", null, "先用 Jev / 本地多路召回初筛，再由大模型推理找回收藏或推荐入口", -1))
            ])
          ]),
          e("button", {
            type: "button",
            class: "sf-close",
            "aria-label": "关闭找站窗口",
            onClick: B[0] || (B[0] = (m) => _("close"))
          }, "✕")
        ], 544),
        e("div", hl, [
          e("div", _l, [
            te(e("textarea", {
              "onUpdate:modelValue": B[2] || (B[2] = (m) => U.value = m),
              rows: "2",
              placeholder: "描述你隐约记得的网站特征，例如：用途、英文关键词、颜色风格、之前大概存放在哪个分区或书签里…",
              onKeydown: B[3] || (B[3] = (m) => pe(lo)(m, () => P(), { requireCtrlOrMeta: !0 }))
            }, null, 544), [
              [le, U.value]
            ]),
            e("div", wl, [
              e("div", $l, [
                (a(), n(j, null, Q(i, (m) => e("button", {
                  key: m,
                  type: "button",
                  onClick: (X) => P(m)
                }, d(m), 9, Il)), 64))
              ]),
              e("button", {
                type: "button",
                class: "sf-submit",
                disabled: !U.value.trim() || G.value,
                onClick: B[4] || (B[4] = (m) => P())
              }, d(G.value ? "正在回忆检索…" : "🔍 帮我找回"), 9, Fl)
            ])
          ]),
          q.value ? (a(), n("p", Sl, d(q.value), 1)) : k("", !0),
          Y.value.length ? (a(), n("div", Cl, [
            B[7] || (B[7] = e("span", null, "最近找站：", -1)),
            (a(!0), n(j, null, Q(Y.value, (m) => (a(), n("button", {
              key: m.id,
              type: "button",
              class: O({ active: D.value?.query === m.siteFinderQuery }),
              onClick: (X) => C(m)
            }, d(m.siteFinderQuery), 11, xl))), 128))
          ])) : k("", !0),
          D.value ? (a(), n("div", El, [
            e("div", Ll, [
              e("p", null, d(D.value.summary), 1),
              e("small", null, [
                Ze(" 扫描 " + d(D.value.searchedCount) + " 项 · Jev/初筛 " + d(D.value.shortlistCount) + " 条 ", 1),
                f.value ? (a(), n(j, { key: 0 }, [
                  Ze(" · " + d(f.value === "heuristic" ? "本地规则" : f.value), 1)
                ], 64)) : k("", !0)
              ])
            ]),
            D.value.matches.length ? (a(), n("section", Ml, [
              B[8] || (B[8] = e("h4", null, "✨ 从你的常用网站与书签中找回", -1)),
              e("div", Nl, [
                (a(!0), n(j, null, Q(D.value.matches, (m) => (a(), n("article", {
                  key: m.id,
                  class: "sf-card match"
                }, [
                  e("div", zl, [
                    K(m.url) ? (a(), n("img", {
                      key: 0,
                      src: K(m.url),
                      alt: "",
                      class: "sf-fav"
                    }, null, 8, Rl)) : k("", !0),
                    e("div", Pl, [
                      e("strong", null, d(m.title), 1),
                      e("small", null, d(m.location), 1)
                    ]),
                    e("span", {
                      class: O(["sf-conf", m.confidence])
                    }, d(m.confidence === "high" ? "高匹配" : "可能相关"), 3)
                  ]),
                  e("p", Bl, d(m.reason), 1),
                  e("div", Tl, [
                    e("span", Al, d(m.url), 1),
                    e("a", {
                      href: m.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "sf-open-btn"
                    }, "打开 ↗", 8, Vl)
                  ])
                ]))), 128))
              ])
            ])) : k("", !0),
            D.value.recommendations.length ? (a(), n("section", Ol, [
              e("h4", null, "🧭 " + d(D.value.matches.length ? "补充推荐相关入口" : "未在收藏中精确命中 · 为你推荐以下网站入口"), 1),
              e("div", Ul, [
                (a(!0), n(j, null, Q(D.value.recommendations, (m) => (a(), n("article", {
                  key: m.url,
                  class: "sf-card rec"
                }, [
                  e("div", jl, [
                    K(m.url) ? (a(), n("img", {
                      key: 0,
                      src: K(m.url),
                      alt: "",
                      class: "sf-fav"
                    }, null, 8, Dl)) : k("", !0),
                    e("div", Gl, [
                      e("strong", null, d(m.title), 1),
                      e("small", null, d(m.description || m.url), 1)
                    ])
                  ]),
                  e("p", ql, d(m.reason), 1),
                  e("div", Jl, [
                    e("button", {
                      type: "button",
                      class: "sf-save-btn",
                      disabled: !!J.value[m.url],
                      onClick: (X) => g(m.title, m.url)
                    }, d(J.value[m.url] ? "✓ 已收桌面" : "+ 收进常用网站"), 9, Kl),
                    e("a", {
                      href: m.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "sf-open-btn"
                    }, "打开 ↗", 8, Wl)
                  ])
                ]))), 128))
              ])
            ])) : k("", !0)
          ])) : G.value ? k("", !0) : (a(), n("div", Hl, [...B[9] || (B[9] = [
            e("p", null, "输入一段零碎印象（例如「记得以前存过一个做在线画图或者图标的网站」），专员会自动帮你翻找桌面网站与全部浏览器书签。", -1)
          ])]))
        ])
      ], 12, yl)
    ]));
  }
}), Yl = /* @__PURE__ */ at(Ql, [["__scopeId", "data-v-46e38eb7"]]), Xl = {
  class: "emp-shell",
  "aria-label": "数字员工工作台"
}, Zl = { class: "emp-header" }, ei = { class: "emp-title-group" }, ti = { class: "emp-stats-pill" }, oi = { class: "emp-head-actions" }, ai = { class: "emp-body" }, ni = { class: "emp-main" }, li = {
  key: 0,
  class: "emp-banner stale",
  role: "alert"
}, ii = {
  key: 1,
  class: "emp-banner error",
  role: "alert"
}, si = {
  key: 2,
  class: "emp-banner notice",
  role: "status"
}, ri = {
  key: 3,
  class: "emp-empty"
}, di = {
  key: 4,
  class: "emp-empty"
}, ui = {
  key: 5,
  class: "emp-grid"
}, ci = ["onClick"], pi = { class: "emp-card-top" }, vi = { class: "emp-card-name-wrap" }, mi = ["title"], fi = { class: "emp-card-role" }, ki = ["aria-checked", "aria-label", "title", "disabled", "onClick"], gi = { class: "emp-card-desc" }, yi = { class: "emp-card-chips" }, bi = { class: "emp-chip sky" }, hi = { class: "emp-chip indigo" }, _i = { class: "emp-chip neutral" }, wi = { class: "emp-chip neutral" }, $i = ["title"], Ii = { class: "emp-card-stat" }, Fi = { key: 0 }, Si = { key: 1 }, Ci = { key: 2 }, xi = { class: "emp-card-btns" }, Ei = ["onClick"], Li = ["disabled", "title", "onClick"], Mi = ["title", "onClick"], Ni = ["onClick"], zi = ["onClick"], Ri = {
  key: 0,
  class: "emp-drawer",
  "aria-label": "编辑数字员工"
}, Pi = { class: "emp-drawer-head" }, Bi = { class: "emp-drawer-title-wrap" }, Ti = {
  class: "emp-drawer-tabs",
  role: "tablist"
}, Ai = { class: "emp-drawer-body" }, Vi = { class: "emp-field" }, Oi = { class: "emp-field" }, Ui = { class: "emp-field" }, ji = { class: "emp-row-2" }, Di = { class: "emp-field" }, Gi = { class: "emp-field" }, qi = {
  key: 0,
  class: "emp-field"
}, Ji = { class: "emp-label-inline" }, Ki = ["disabled"], Wi = ["value"], Hi = {
  key: 1,
  class: "emp-row-2"
}, Qi = { class: "emp-field" }, Yi = { class: "emp-field" }, Xi = {
  key: 2,
  class: "emp-field"
}, Zi = { class: "emp-row-3" }, es = { class: "emp-field" }, ts = { class: "emp-field" }, os = {
  key: 0,
  class: "emp-field"
}, as = { class: "emp-check-row" }, ns = { class: "emp-field" }, ls = {
  key: 0,
  class: "emp-field"
}, is = { class: "emp-field" }, ss = { class: "emp-field" }, rs = { class: "emp-label-inline" }, ds = { class: "emp-field" }, us = { class: "emp-field" }, cs = { class: "emp-check-row" }, ps = { class: "emp-check-row" }, vs = { class: "emp-field" }, ms = { class: "emp-skill-list" }, fs = ["checked", "onChange"], ks = { class: "emp-field" }, gs = { class: "emp-field" }, ys = { class: "emp-field" }, bs = { class: "emp-field" }, hs = { class: "emp-label-inline" }, _s = {
  key: 0,
  class: "emp-sub-empty"
}, ws = {
  key: 1,
  class: "emp-fb-list"
}, $s = ["title"], Is = { class: "emp-fb-cat" }, Fs = ["onClick"], Ss = { class: "emp-logs-head" }, Cs = { key: 0 }, xs = { key: 1 }, Es = {
  key: 0,
  class: "emp-sub-empty"
}, Ls = {
  key: 1,
  class: "emp-run-list"
}, Ms = { class: "emp-run-top" }, Ns = { class: "emp-run-cat" }, zs = { class: "emp-run-time" }, Rs = ["title"], Ps = { class: "emp-run-reason" }, Bs = {
  key: 0,
  class: "emp-run-trace"
}, Ts = { class: "emp-run-foot" }, As = { class: "emp-run-links" }, Vs = ["onClick"], Os = ["href"], Us = {
  key: 0,
  class: "emp-run-fb-btns"
}, js = ["onClick"], Ds = ["onClick"], Gs = { class: "emp-drawer-foot" }, qs = { class: "emp-drawer-foot-right" }, Js = ["disabled"], Ks = /* @__PURE__ */ et({
  __name: "EmployeesPanel",
  props: {
    active: { type: Boolean }
  },
  emits: ["openLibrary"],
  setup(v, { emit: w }) {
    const c = v, _ = w, y = M([]), L = M([]), F = M(!0), S = M(""), U = M(!1), G = M(""), q = M(""), J = M(!1), D = M(null), f = M(!1), Y = M("runtime"), i = M(null), P = M(""), g = M(""), K = M([]), C = M(!1), z = M({ open: !1, mode: "live" }), A = M(""), b = M({ open: !1, employeeId: "", employeeName: "" }), B = M({ open: !1, employeeId: "", employeeName: "" });
    function m(p) {
      B.value = { open: !0, employeeId: p.id, employeeName: p.name };
    }
    const X = W(() => {
      if (!b.value.open || !b.value.employeeId) return null;
      if (b.value.runId) {
        const p = L.value.find((o) => o.id === b.value.runId);
        if (p) return p;
      }
      return L.value.find((p) => p.employeeId === b.value.employeeId && p.kind === "organizer") || null;
    });
    function $(p, o) {
      b.value.employeeId !== p.id && (A.value = ""), b.value = {
        open: !0,
        employeeId: p.id,
        employeeName: p.name,
        runId: o
      };
    }
    function I(p) {
      if (p.source.kind === "workspace-organizer") {
        $(p);
        return;
      }
      z.value = {
        open: !0,
        mode: "live",
        employeeId: p.id,
        employeeName: p.name
      };
    }
    function R(p, o) {
      if (p.kind === "organizer") {
        $({ id: p.employeeId, name: o || "整理专员" }, p.id);
        return;
      }
      z.value = {
        open: !0,
        mode: "replay",
        employeeId: p.employeeId,
        employeeName: o,
        replayFrames: p.peekFrames || []
      };
    }
    const Z = W(() => ft()), ve = W(() => y.value.filter((p) => p.enabled).length), ee = W(
      () => L.value.filter((p) => p.status !== "error" && ft(p.createdAt) === Z.value).length
    );
    function ie(p) {
      return L.value.filter((o) => o.employeeId === p);
    }
    function me(p) {
      let o = 0, s = 0;
      const T = Z.value;
      for (const H of L.value)
        H.employeeId !== p || ft(H.createdAt) !== T || (H.status === "analyzed" ? o++ : (H.status === "skipped-gate" || H.status === "skipped-no-sub") && s++);
      return { analyzed: o, skipped: s };
    }
    async function oe() {
      F.value = !0, q.value = "";
      try {
        const p = await de(
          typeof chrome > "u" ? null : chrome.runtime,
          "list"
        );
        y.value = Array.isArray(p?.employees) ? p.employees : [], L.value = Array.isArray(p?.runs) ? p.runs : [], J.value = typeof chrome < "u" && p?.workerStamp !== ro;
      } catch (p) {
        q.value = p instanceof Error ? p.message : "读取数字员工失败。";
      } finally {
        F.value = !1;
      }
    }
    function ae() {
      typeof chrome < "u" && chrome.runtime?.reload && chrome.runtime.reload();
    }
    async function ze() {
      if (!C.value) {
        C.value = !0;
        try {
          const p = await no.getCreatedFolders();
          K.value = (p || []).map((o) => ({
            id: String(o.id),
            title: String(o.title || "未命名收藏夹"),
            count: Number(o.media_count || 0)
          }));
        } catch {
          K.value = [];
        } finally {
          C.value = !1;
        }
      }
    }
    function ge(p, o = "runtime") {
      i.value = JSON.parse(JSON.stringify(p)), P.value = p.decisionGate.categories.join(", "), g.value = p.decisionGate.skipCategories.join(", "), Y.value = o, f.value = !0, K.value.length || ze();
    }
    function ue() {
      const p = Gt();
      p.id = `emp-org-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, p.name = `桌面书签整理员 #${y.value.filter((o) => o.source.kind === "workspace-organizer").length + 1}`, ge(p, "runtime");
    }
    function Oe() {
      const p = qt();
      p.id = `emp-sf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, p.name = `记忆找站专员 #${y.value.filter((o) => o.source.kind === "site-finder").length + 1}`, ge(p, "runtime");
    }
    function se() {
      const p = Dt();
      p.id = `emp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, p.name = `数字员工 #${y.value.length + 1}`, ge(p, "runtime");
    }
    function Re() {
      f.value = !1, i.value = null;
    }
    function nt(p) {
      if (!i.value) return;
      const o = i.value.skills.indexOf(p);
      o >= 0 ? i.value.skills.splice(o, 1) : i.value.skills.push(p);
    }
    function Pe() {
      if (!i.value) return;
      const p = K.value.find((o) => o.id === i.value?.source.folderId);
      p && (i.value.source.folderTitle = p.title);
    }
    async function Ue() {
      if (!(!i.value || U.value)) {
        U.value = !0, q.value = "", G.value = "";
        try {
          const p = P.value.split(/[,，\n]+/).map((H) => H.trim()).filter(Boolean), o = g.value.split(/[,，\n]+/).map((H) => H.trim()).filter(Boolean);
          i.value.decisionGate.categories = p.length ? p : ["AI 与 Agent", "工程与效率", "行业洞察", "娱乐/低信息跳过"], i.value.decisionGate.skipCategories = o.filter((H) => i.value.decisionGate.categories.includes(H));
          const s = Jt(i.value), T = await de(
            typeof chrome > "u" ? null : chrome.runtime,
            "save",
            { employee: s }
          );
          i.value = JSON.parse(JSON.stringify(T)), G.value = `已保存员工「${T.name}」配置。`, await oe();
        } catch (p) {
          q.value = p instanceof Error ? p.message : "保存员工配置失败。";
        } finally {
          U.value = !1;
        }
      }
    }
    async function je(p) {
      if (!S.value) {
        S.value = p.id, q.value = "", G.value = "";
        try {
          const o = !p.enabled;
          await de(typeof chrome > "u" ? null : chrome.runtime, "toggle", {
            id: p.id,
            enabled: o
          }), G.value = o ? `已开启「${p.name}」后台自动巡检。` : `已暂停「${p.name}」后台巡检。`, await oe();
        } catch (o) {
          q.value = o instanceof Error ? o.message : "切换状态失败。";
        } finally {
          S.value = "";
        }
      }
    }
    async function Ce(p) {
      if (p.source.kind === "site-finder") {
        m(p);
        return;
      }
      if (S.value) return;
      const o = p.source.kind === "workspace-organizer";
      S.value = p.id, q.value = "", o && (A.value = ""), G.value = o ? `「${p.name}」正在盘点桌面网站与书签，生成待审批提案…` : `「${p.name}」正在抓取并分拣 1 条视频…`, o && $(p);
      try {
        const s = await de(
          typeof chrome > "u" ? null : chrome.runtime,
          "run-one",
          { id: p.id, organizerConsent: !0 }
        );
        if (G.value = s?.message || "试跑完成。", await oe(), o && s?.record?.id && b.value.open && b.value.employeeId === p.id && $(p, s.record.id), f.value && i.value?.id === p.id) {
          const T = y.value.find((H) => H.id === p.id);
          T && (i.value = JSON.parse(JSON.stringify(T)));
        }
      } catch (s) {
        q.value = s instanceof Error ? s.message : "试跑执行失败。", o && (A.value = q.value), G.value = "", await oe();
      } finally {
        S.value = "";
      }
    }
    async function $e(p) {
      if (window.confirm(`确定删除数字员工「${p.name}」及其运行记录吗？资料库已沉淀的文章不会被删除。`))
        try {
          await de(typeof chrome > "u" ? null : chrome.runtime, "delete", { id: p.id }), i.value?.id === p.id && Re(), G.value = `已删除员工「${p.name}」。`, await oe();
        } catch (o) {
          q.value = o instanceof Error ? o.message : "删除失败。";
        }
    }
    function fe(p) {
      const o = vo(p), s = new Blob([JSON.stringify(o, null, 2)], { type: "application/json;charset=utf-8" }), T = URL.createObjectURL(s), H = document.createElement("a"), ye = p.name.replace(/[^\w\u4e00-\u9fa5-]+/g, "_") || "employee";
      H.href = T, H.download = `${ye}.tab-agent.json`, document.body.appendChild(H), H.click(), document.body.removeChild(H), URL.revokeObjectURL(T), G.value = `已导出分享包「${ye}.tab-agent.json」（已自动脱敏私人收藏夹 ID 与反馈记忆）。`;
    }
    function De() {
      D.value?.click();
    }
    function lt(p) {
      const o = p.target, s = o.files?.[0];
      if (!s) return;
      const T = new FileReader();
      T.onload = async (H) => {
        try {
          const ye = String(H.target?.result || ""), xe = mo(ye);
          await de(typeof chrome > "u" ? null : chrome.runtime, "save", {
            employee: xe
          }), await oe(), ge(xe, "runtime"), G.value = `已导入员工「${xe.name}」，请确认数据源与模型后开启巡检。`;
        } catch (ye) {
          q.value = ye instanceof Error ? ye.message : "导入失败，请检查文件格式。";
        } finally {
          o.value = "";
        }
      }, T.readAsText(s);
    }
    async function Ge(p, o) {
      if (i.value)
        try {
          const s = await de(
            typeof chrome > "u" ? null : chrome.runtime,
            "feedback",
            {
              employeeId: i.value.id,
              title: p.title,
              verdict: o,
              category: p.category,
              note: o === "keep" ? "主人标记为有价值" : "主人标记为低价值跳过"
            }
          );
          i.value = JSON.parse(JSON.stringify(s)), G.value = o === "keep" ? "已记住：类似内容优先精读。" : "已记住：类似内容以后直接跳过。", await oe();
        } catch (s) {
          q.value = s instanceof Error ? s.message : "记录反馈失败。";
        }
    }
    function Be(p) {
      i.value && (i.value.ownerFeedback = i.value.ownerFeedback.filter((o) => o.id !== p));
    }
    async function qe(p) {
      try {
        await de(typeof chrome > "u" ? null : chrome.runtime, "clear-history", { id: p }), await oe(), G.value = "已清空该员工的去重与运行历史。";
      } catch (o) {
        q.value = o instanceof Error ? o.message : "清空失败。";
      }
    }
    function re(p) {
      return p.source.kind === "workspace-organizer" ? "桌面网站 + 书签" : p.source.kind === "site-finder" ? "记忆找站 · 书签+桌面" : p.source.kind === "bili-history" ? "播放历史" : p.source.kind === "bili-fav" ? p.source.folderTitle || "指定收藏夹" : "稍后再看";
    }
    function Te(p) {
      const s = L.value.find((T) => T.employeeId === p && T.kind === "organizer")?.planSteps || [];
      return {
        pending: s.filter((T) => T.status === "pending").length,
        applied: s.filter((T) => T.status === "applied").length
      };
    }
    function Je(p, o) {
      return o === "organizer" ? "整理提案" : p === "analyzed" ? "已精读" : p === "skipped-gate" ? "快筛跳过" : p === "skipped-no-sub" ? "无字幕" : "异常";
    }
    function Ae(p) {
      return p ? new Date(p).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "尚未运行";
    }
    function Ke(p, o) {
      o === "local" && (p[io] || p[so]) && oe();
    }
    return ke(
      () => c.active,
      (p) => {
        p && oe();
      }
    ), tt(() => {
      oe(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(Ke);
    }), ot(() => {
      typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(Ke);
    }), (p, o) => (a(), n("section", Xl, [
      e("header", Zl, [
        e("div", ei, [
          o[39] || (o[39] = e("h2", null, "数字员工", -1)),
          e("span", ti, "巡检中 " + d(ve.value) + " / " + d(y.value.length) + " · 今日处理 " + d(ee.value) + " 条", 1)
        ]),
        e("div", oi, [
          e("button", {
            type: "button",
            class: "emp-pill-btn subtle",
            onClick: De
          }, [...o[40] || (o[40] = [
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
            onChange: lt
          }, null, 544),
          e("button", {
            type: "button",
            class: "emp-pill-btn subtle",
            onClick: ue
          }, [...o[41] || (o[41] = [
            e("span", null, "+ 桌面书签专员", -1)
          ])]),
          e("button", {
            type: "button",
            class: "emp-pill-btn subtle",
            onClick: Oe
          }, [...o[42] || (o[42] = [
            e("span", null, "+ 记忆找站专员", -1)
          ])]),
          e("button", {
            type: "button",
            class: "emp-pill-btn primary",
            onClick: se
          }, [...o[43] || (o[43] = [
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
      e("div", ai, [
        e("div", ni, [
          J.value ? (a(), n("div", li, [
            o[44] || (o[44] = e("span", null, "检测到扩展后台服务脚本尚未更新（仅刷新了页面），实况窥屏与自动重试需重启后台服务后生效。", -1)),
            e("button", {
              type: "button",
              class: "emp-mini-btn",
              onClick: ae
            }, "🔄 立即热重载扩展")
          ])) : k("", !0),
          q.value ? (a(), n("p", ii, d(q.value), 1)) : k("", !0),
          G.value ? (a(), n("p", si, d(G.value), 1)) : k("", !0),
          F.value && !y.value.length ? (a(), n("div", ri, "正在加载数字员工…")) : y.value.length ? (a(), n("div", ui, [
            (a(!0), n(j, null, Q(y.value, (s) => (a(), n("article", {
              key: s.id,
              class: O(["emp-card", { active: f.value && i.value?.id === s.id, running: S.value === s.id }]),
              onClick: (T) => ge(s, "runtime")
            }, [
              e("div", pi, [
                e("div", vi, [
                  e("h3", {
                    class: "emp-card-name",
                    title: s.name
                  }, d(s.name), 9, mi),
                  e("span", fi, d(s.role), 1)
                ]),
                e("button", {
                  type: "button",
                  class: O(["emp-switch", { on: s.enabled }]),
                  role: "switch",
                  "aria-checked": s.enabled,
                  "aria-label": `${s.name}后台巡检`,
                  title: s.enabled ? "已启用后台巡检（点击暂停）" : s.source.kind === "workspace-organizer" ? "开启后台巡检：按间隔将网站和书签样本交给配置的模型生成待审批提案" : "已暂停（点击开启后台自动巡检）",
                  disabled: S.value === s.id,
                  onClick: Se((T) => je(s), ["stop"])
                }, [...o[47] || (o[47] = [
                  e("span", { class: "emp-switch-knob" }, null, -1)
                ])], 10, ki)
              ]),
              e("p", gi, d(s.description || "按自定义规则与 Skills 自动分拣处理数据。"), 1),
              e("div", yi, [
                e("span", bi, d(re(s)), 1),
                e("span", hi, d(s.runtime.decisionMode === "jev-http" ? "Jev 端点" : "快筛漏斗"), 1),
                e("span", _i, d(s.runtime.analyzer === "native-pi" ? "本机 Pi" : "DeepSeek"), 1),
                e("span", wi, d(s.skills.length) + " Skills", 1)
              ]),
              s.lastError ? (a(), n("div", {
                key: 0,
                class: "emp-card-err",
                title: s.lastError
              }, "异常：" + d(s.lastError), 9, $i)) : k("", !0),
              e("div", {
                class: "emp-card-foot",
                onClick: o[0] || (o[0] = Se(() => {
                }, ["stop"]))
              }, [
                e("div", Ii, [
                  e("i", {
                    class: O(["emp-dot", { on: s.enabled, err: !!s.lastError }])
                  }, null, 2),
                  s.source.kind === "workspace-organizer" ? (a(), n("span", Fi, " 提案 " + d(Te(s.id).pending) + " 待批 / " + d(Te(s.id).applied) + " 已生效 ", 1)) : s.source.kind === "site-finder" ? (a(), n("span", Si, " 累计找站 " + d(L.value.filter((T) => T.employeeId === s.id && T.kind === "site-finder").length) + " 次 ", 1)) : (a(), n("span", Ci, "今日 " + d(me(s.id).analyzed) + " 精读 / " + d(me(s.id).skipped) + " 跳过", 1))
                ]),
                e("div", xi, [
                  s.source.kind === "site-finder" ? (a(), n("button", {
                    key: 0,
                    type: "button",
                    class: "emp-mini-btn",
                    onClick: (T) => m(s)
                  }, " 🔍 输入描述找站 ", 8, Ei)) : (a(), n(j, { key: 1 }, [
                    e("button", {
                      type: "button",
                      class: "emp-mini-btn",
                      disabled: !!S.value,
                      title: s.source.kind === "workspace-organizer" ? "只读盘点桌面网站与书签并生成提案" : "立即抓取 1 条未处理视频试跑",
                      onClick: (T) => Ce(s)
                    }, d(S.value === s.id ? "运行中…" : s.source.kind === "workspace-organizer" ? "生成提案" : "试跑 1 条"), 9, Li),
                    e("button", {
                      type: "button",
                      class: "emp-mini-btn ghost",
                      title: s.source.kind === "workspace-organizer" ? "打开整理预览与逐条审批清单" : "打开仿真实况窥屏窗口",
                      onClick: (T) => I(s)
                    }, d(s.source.kind === "workspace-organizer" ? "预览审批" : "窥屏"), 9, Mi)
                  ], 64)),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "导出脱敏员工包分享给别人",
                    onClick: (T) => fe(s)
                  }, "导出", 8, Ni),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "编辑配置与查看运行记录",
                    onClick: (T) => ge(s, "runtime")
                  }, "配置", 8, zi)
                ])
              ])
            ], 10, ci))), 128))
          ])) : (a(), n("div", di, [
            o[45] || (o[45] = e("h3", null, "还没有数字员工", -1)),
            o[46] || (o[46] = e("p", null, [
              Ze("创建一个驻留后台的员工，或导入他人分享的 "),
              e("code", null, ".tab-agent.json"),
              Ze(" 员工包。")
            ], -1)),
            e("button", {
              type: "button",
              class: "emp-pill-btn primary",
              onClick: se
            }, "新建第一个员工")
          ]))
        ]),
        f.value && i.value ? (a(), n("aside", Ri, [
          e("header", Pi, [
            e("div", Bi, [
              e("h3", null, d(i.value.name || "未命名员工"), 1),
              e("small", null, "最近运行：" + d(Ae(i.value.lastRunAt)), 1)
            ]),
            e("button", {
              type: "button",
              class: "emp-close-btn",
              "aria-label": "关闭抽屉",
              onClick: Re
            }, "×")
          ]),
          e("nav", Ti, [
            e("button", {
              type: "button",
              class: O({ active: Y.value === "runtime" }),
              onClick: o[1] || (o[1] = (s) => Y.value = "runtime")
            }, "基础与来源", 2),
            e("button", {
              type: "button",
              class: O({ active: Y.value === "skills" }),
              onClick: o[2] || (o[2] = (s) => Y.value = "skills")
            }, "Jev 与 Skills", 2),
            e("button", {
              type: "button",
              class: O({ active: Y.value === "prompts" }),
              onClick: o[3] || (o[3] = (s) => Y.value = "prompts")
            }, "提示词与记忆", 2),
            e("button", {
              type: "button",
              class: O({ active: Y.value === "logs" }),
              onClick: o[4] || (o[4] = (s) => Y.value = "logs")
            }, "运行记录 (" + d(ie(i.value.id).length) + ")", 3)
          ]),
          e("div", Ai, [
            Y.value === "runtime" ? (a(), n(j, { key: 0 }, [
              e("div", Vi, [
                o[48] || (o[48] = e("label", null, "员工名称", -1)),
                te(e("input", {
                  "onUpdate:modelValue": o[5] || (o[5] = (s) => i.value.name = s),
                  type: "text",
                  maxlength: "48",
                  placeholder: "例如：B站分拣研究员"
                }, null, 512), [
                  [le, i.value.name]
                ])
              ]),
              e("div", Oi, [
                o[49] || (o[49] = e("label", null, "定位标签", -1)),
                te(e("input", {
                  "onUpdate:modelValue": o[6] || (o[6] = (s) => i.value.role = s),
                  type: "text",
                  maxlength: "64",
                  placeholder: "例如：后台静默分拣 · 精读沉淀"
                }, null, 512), [
                  [le, i.value.role]
                ])
              ]),
              e("div", Ui, [
                o[50] || (o[50] = e("label", null, "职责简述", -1)),
                te(e("textarea", {
                  "onUpdate:modelValue": o[7] || (o[7] = (s) => i.value.description = s),
                  rows: "2",
                  maxlength: "240"
                }, null, 512), [
                  [le, i.value.description]
                ])
              ]),
              e("div", ji, [
                e("div", Di, [
                  o[52] || (o[52] = e("label", null, "工作数据源", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": o[8] || (o[8] = (s) => i.value.source.kind = s)
                  }, [...o[51] || (o[51] = [
                    ao('<option value="workspace-organizer" data-v-159b968d>桌面网站 + 浏览器书签（整理审批）</option><option value="site-finder" data-v-159b968d>记忆找站（模糊检索书签/桌面 + 推荐入口）</option><option value="bili-toview" data-v-159b968d>稍后再看</option><option value="bili-fav" data-v-159b968d>指定 B 站收藏夹</option><option value="bili-history" data-v-159b968d>播放历史</option>', 5)
                  ])], 512), [
                    [Le, i.value.source.kind]
                  ])
                ]),
                e("div", Gi, [
                  o[54] || (o[54] = e("label", null, "精读分析引擎", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": o[9] || (o[9] = (s) => i.value.runtime.analyzer = s)
                  }, [...o[53] || (o[53] = [
                    e("option", { value: "deepseek" }, "DeepSeek API", -1),
                    e("option", { value: "native-pi" }, "本机 Pi Agent", -1)
                  ])], 512), [
                    [Le, i.value.runtime.analyzer]
                  ])
                ])
              ]),
              i.value.source.kind === "bili-fav" ? (a(), n("div", qi, [
                e("div", Ji, [
                  o[55] || (o[55] = e("label", null, "选择收藏夹（导出分享时自动脱敏）", -1)),
                  e("button", {
                    type: "button",
                    class: "emp-link-btn",
                    disabled: C.value,
                    onClick: ze
                  }, d(C.value ? "读取中…" : "刷新收藏夹"), 9, Ki)
                ]),
                te(e("select", {
                  "onUpdate:modelValue": o[10] || (o[10] = (s) => i.value.source.folderId = s),
                  onChange: Pe
                }, [
                  o[56] || (o[56] = e("option", { value: "" }, "请选择收藏夹…", -1)),
                  (a(!0), n(j, null, Q(K.value, (s) => (a(), n("option", {
                    key: s.id,
                    value: s.id
                  }, d(s.title) + " (" + d(s.count) + ")", 9, Wi))), 128))
                ], 544), [
                  [Le, i.value.source.folderId]
                ])
              ])) : k("", !0),
              i.value.runtime.analyzer === "native-pi" ? (a(), n("div", Hi, [
                e("div", Qi, [
                  o[57] || (o[57] = e("label", null, "指定 Pi 模型（留空跟随默认）", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": o[11] || (o[11] = (s) => i.value.runtime.piModel = s),
                    type: "text",
                    placeholder: "如 openai-codex/gpt-6.1-sol"
                  }, null, 512), [
                    [le, i.value.runtime.piModel]
                  ])
                ]),
                e("div", Yi, [
                  o[59] || (o[59] = e("label", null, "思考强度", -1)),
                  te(e("select", {
                    "onUpdate:modelValue": o[12] || (o[12] = (s) => i.value.runtime.piThinking = s)
                  }, [...o[58] || (o[58] = [
                    e("option", { value: "off" }, "关闭", -1),
                    e("option", { value: "low" }, "低", -1),
                    e("option", { value: "medium" }, "中", -1),
                    e("option", { value: "high" }, "高", -1)
                  ])], 512), [
                    [Le, i.value.runtime.piThinking]
                  ])
                ])
              ])) : k("", !0),
              i.value.source.kind === "workspace-organizer" ? (a(), n("p", Xi, "整理专员采用「提案 preview + 右侧逐条点击生效」模式，不自动改动任何数据。")) : k("", !0),
              e("div", Zi, [
                e("div", es, [
                  o[60] || (o[60] = e("label", null, "巡检间隔 (分)", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": o[13] || (o[13] = (s) => i.value.schedulePolicy.intervalMinutes = s),
                    type: "number",
                    min: "5",
                    max: "1440"
                  }, null, 512), [
                    [
                      le,
                      i.value.schedulePolicy.intervalMinutes,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                e("div", ts, [
                  e("label", null, d(i.value.source.kind === "workspace-organizer" ? "每日提案上限" : "每日上限 (条)"), 1),
                  te(e("input", {
                    "onUpdate:modelValue": o[14] || (o[14] = (s) => i.value.schedulePolicy.dailyLimit = s),
                    type: "number",
                    min: "1",
                    max: "50"
                  }, null, 512), [
                    [
                      le,
                      i.value.schedulePolicy.dailyLimit,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ]),
                i.value.source.kind !== "workspace-organizer" ? (a(), n("div", os, [
                  o[61] || (o[61] = e("label", null, "每次扫前 N 条", -1)),
                  te(e("input", {
                    "onUpdate:modelValue": o[15] || (o[15] = (s) => i.value.schedulePolicy.maxFetchItems = s),
                    type: "number",
                    min: "1",
                    max: "40"
                  }, null, 512), [
                    [
                      le,
                      i.value.schedulePolicy.maxFetchItems,
                      void 0,
                      { number: !0 }
                    ]
                  ])
                ])) : k("", !0)
              ]),
              e("label", as, [
                te(e("input", {
                  "onUpdate:modelValue": o[16] || (o[16] = (s) => i.value.enabled = s),
                  type: "checkbox"
                }, null, 512), [
                  [mt, i.value.enabled]
                ]),
                e("span", null, d(i.value.source.kind === "workspace-organizer" ? "启用后台巡检（用配置的模型生成提案，审批后才修改）" : "启用后台自动巡检（每次仅温柔处理 1 条未读视频，不主动弹窗打扰）"), 1)
              ])
            ], 64)) : Y.value === "skills" ? (a(), n(j, { key: 1 }, [
              e("div", ns, [
                o[63] || (o[63] = e("label", null, "System 1 前置分拣引擎", -1)),
                te(e("select", {
                  "onUpdate:modelValue": o[17] || (o[17] = (s) => i.value.runtime.decisionMode = s)
                }, [...o[62] || (o[62] = [
                  e("option", { value: "llm-fast" }, "快速轻量判断（内置 JSON Noul · Score · Choice）", -1),
                  e("option", { value: "jev-http" }, "外部 Jev 决策模型端点（HTTP JSON API）", -1)
                ])], 512), [
                  [Le, i.value.runtime.decisionMode]
                ])
              ]),
              i.value.runtime.decisionMode === "jev-http" ? (a(), n("div", ls, [
                o[64] || (o[64] = e("label", null, "Jev HTTP 接口地址（支持本地 http://127.0.0.1:...）", -1)),
                te(e("input", {
                  "onUpdate:modelValue": o[18] || (o[18] = (s) => i.value.runtime.jevEndpoint = s),
                  type: "url",
                  placeholder: "http://127.0.0.1:8787/decide"
                }, null, 512), [
                  [le, i.value.runtime.jevEndpoint]
                ])
              ])) : k("", !0),
              e("div", is, [
                o[65] || (o[65] = e("label", null, "价值是非判断问题（Noul）", -1)),
                te(e("textarea", {
                  "onUpdate:modelValue": o[19] || (o[19] = (s) => i.value.decisionGate.worthQuestion = s),
                  rows: "2"
                }, null, 512), [
                  [le, i.value.decisionGate.worthQuestion]
                ])
              ]),
              e("div", ss, [
                e("div", rs, [
                  e("label", null, "精读最低分阈值（Score ≥ " + d(i.value.decisionGate.minScore.toFixed(2)) + "）", 1)
                ]),
                te(e("input", {
                  "onUpdate:modelValue": o[20] || (o[20] = (s) => i.value.decisionGate.minScore = s),
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.05"
                }, null, 512), [
                  [
                    le,
                    i.value.decisionGate.minScore,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              e("div", ds, [
                o[66] || (o[66] = e("label", null, "分类标签选项（Choice，逗号隔开，同时作为资料库文章分类）", -1)),
                te(e("input", {
                  "onUpdate:modelValue": o[21] || (o[21] = (s) => P.value = s),
                  type: "text",
                  placeholder: "AI 与 Agent, 工程与效率, 行业洞察, 娱乐/低信息跳过"
                }, null, 512), [
                  [le, P.value]
                ])
              ]),
              e("div", us, [
                o[67] || (o[67] = e("label", null, "命中后直接跳过的分类（逗号隔开）", -1)),
                te(e("input", {
                  "onUpdate:modelValue": o[22] || (o[22] = (s) => g.value = s),
                  type: "text",
                  placeholder: "娱乐/低信息跳过"
                }, null, 512), [
                  [le, g.value]
                ])
              ]),
              e("label", cs, [
                te(e("input", {
                  "onUpdate:modelValue": o[23] || (o[23] = (s) => i.value.decisionGate.skipWithoutSubtitle = s),
                  type: "checkbox"
                }, null, 512), [
                  [mt, i.value.decisionGate.skipWithoutSubtitle]
                ]),
                o[68] || (o[68] = e("span", null, "无字幕视频自动跳过（避免无根据编造内容，节省 Token）", -1))
              ]),
              e("label", ps, [
                te(e("input", {
                  "onUpdate:modelValue": o[24] || (o[24] = (s) => i.value.decisionGate.retryOnSkip = s),
                  type: "checkbox"
                }, null, 512), [
                  [mt, i.value.decisionGate.retryOnSkip]
                ]),
                o[69] || (o[69] = e("span", null, "跳过的任务自动重来一轮（继续抓取下一条候选视频，默认打开）", -1))
              ]),
              e("div", vs, [
                o[70] || (o[70] = e("label", null, "员工挂载 Skills 能力权限", -1)),
                e("div", ms, [
                  (a(!0), n(j, null, Q(pe(uo), (s) => (a(), n("label", {
                    key: s.id,
                    class: "emp-skill-item"
                  }, [
                    e("input", {
                      type: "checkbox",
                      checked: i.value.skills.includes(s.id),
                      onChange: (T) => nt(s.id)
                    }, null, 40, fs),
                    e("div", null, [
                      e("strong", null, d(s.name), 1),
                      e("small", null, d(s.description), 1)
                    ])
                  ]))), 128))
                ])
              ]),
              e("div", ks, [
                o[71] || (o[71] = e("label", null, "自定义 Skill 补充规则（随员工包导出分享）", -1)),
                te(e("textarea", {
                  "onUpdate:modelValue": o[25] || (o[25] = (s) => i.value.customSkillInstructions = s),
                  rows: "3",
                  placeholder: "例如：如果视频提到 GitHub 开源项目，必须在总结末尾单独列出仓库要点。"
                }, null, 512), [
                  [le, i.value.customSkillInstructions]
                ])
              ])
            ], 64)) : Y.value === "prompts" ? (a(), n(j, { key: 2 }, [
              e("div", gs, [
                o[72] || (o[72] = e("label", null, "员工核心提示词 (System Prompt)", -1)),
                te(e("textarea", {
                  "onUpdate:modelValue": o[26] || (o[26] = (s) => i.value.prompt.systemPrompt = s),
                  rows: "5"
                }, null, 512), [
                  [le, i.value.prompt.systemPrompt]
                ])
              ]),
              e("div", ys, [
                o[73] || (o[73] = e("label", null, "沉淀笔记输出模板 (Markdown)", -1)),
                te(e("textarea", {
                  "onUpdate:modelValue": o[27] || (o[27] = (s) => i.value.prompt.reportTemplate = s),
                  rows: "5",
                  class: "mono"
                }, null, 512), [
                  [le, i.value.prompt.reportTemplate]
                ])
              ]),
              e("div", bs, [
                e("div", hs, [
                  e("label", null, "主人纠偏偏好记忆 (" + d(i.value.ownerFeedback.length) + ")", 1),
                  o[74] || (o[74] = e("small", { style: { color: "var(--muted,#94a3b8)", "font-size": "11px" } }, "导出分享时默认剥离保护隐私", -1))
                ]),
                i.value.ownerFeedback.length ? (a(), n("div", ws, [
                  (a(!0), n(j, null, Q(i.value.ownerFeedback, (s) => (a(), n("div", {
                    key: s.id,
                    class: "emp-fb-row"
                  }, [
                    e("span", {
                      class: O(["emp-fb-tag", s.verdict])
                    }, d(s.verdict === "keep" ? "优先精读" : "跳过"), 3),
                    e("span", {
                      class: "emp-fb-title",
                      title: s.title
                    }, d(s.title), 9, $s),
                    e("span", Is, d(s.category), 1),
                    e("button", {
                      type: "button",
                      class: "emp-fb-del",
                      title: "移除样本",
                      onClick: (T) => Be(s.id)
                    }, "×", 8, Fs)
                  ]))), 128))
                ])) : (a(), n("div", _s, " 在「运行记录」里对判断结果点「标记有价值」或「以后跳过」，员工会自动学会你的口味。 "))
              ])
            ], 64)) : (a(), n(j, { key: 3 }, [
              e("div", Ss, [
                i.value.source.kind === "workspace-organizer" ? (a(), n("span", Cs, "记录包含审批与撤销凭据；清空或被历史上限淘汰后无法从此处撤销。")) : (a(), n("span", xs, "仅展示最近执行轨迹，已分析/跳过的 BV 号不会重复处理。")),
                ie(i.value.id).length ? (a(), n("button", {
                  key: 2,
                  type: "button",
                  class: "emp-link-btn",
                  onClick: o[28] || (o[28] = (s) => qe(i.value.id))
                }, " 清空记录 ")) : k("", !0)
              ]),
              ie(i.value.id).length ? (a(), n("div", Ls, [
                (a(!0), n(j, null, Q(ie(i.value.id), (s) => (a(), n("article", {
                  key: s.id,
                  class: "emp-run-card"
                }, [
                  e("div", Ms, [
                    e("span", {
                      class: O(["emp-run-badge", s.status])
                    }, d(Je(s.status, s.kind)), 3),
                    e("span", Ns, d(s.category) + " · " + d(Math.round(s.score * 100)) + "分", 1),
                    e("span", zs, d(Ae(s.createdAt)), 1)
                  ]),
                  e("div", {
                    class: "emp-run-title",
                    title: s.title
                  }, d(s.title), 9, Rs),
                  e("p", Ps, d(s.reason), 1),
                  s.toolTrace?.length ? (a(), n("div", Bs, [
                    (a(!0), n(j, null, Q(s.toolTrace, (T, H) => (a(), n("span", {
                      key: H,
                      class: O(["emp-trace-pill", { fail: !T.ok }])
                    }, d(T.summary), 3))), 128))
                  ])) : k("", !0),
                  e("div", Ts, [
                    e("div", As, [
                      s.kind === "organizer" || s.peekFrames?.length ? (a(), n("button", {
                        key: 0,
                        type: "button",
                        class: "emp-link-btn",
                        onClick: (T) => R(s, i.value.name)
                      }, d(s.kind === "organizer" ? "👀 预览与逐条审批" : "▶ 回放窥屏"), 9, Vs)) : k("", !0),
                      s.url ? (a(), n("a", {
                        key: 1,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer"
                      }, "原视频 ↗", 8, Os)) : k("", !0),
                      s.articleId ? (a(), n("button", {
                        key: 2,
                        type: "button",
                        class: "emp-link-btn",
                        onClick: o[29] || (o[29] = (T) => _("openLibrary"))
                      }, "去资料库看笔记 →")) : k("", !0)
                    ]),
                    s.bvid !== "-" ? (a(), n("div", Us, [
                      e("button", {
                        type: "button",
                        onClick: (T) => Ge(s, "keep")
                      }, "✓ 记为重要", 8, js),
                      e("button", {
                        type: "button",
                        onClick: (T) => Ge(s, "skip")
                      }, "✕ 以后跳过", 8, Ds)
                    ])) : k("", !0)
                  ])
                ]))), 128))
              ])) : (a(), n("div", Es, d(i.value.source.kind === "workspace-organizer" ? "还没有整理提案。点击卡片上的「生成提案」或「预览审批」即可开始。" : "还没有运行流水。你可以点击卡片上的「试跑 1 条」立刻体验，或开启巡检开关。"), 1))
            ], 64))
          ]),
          e("footer", Gs, [
            e("button", {
              type: "button",
              class: "emp-pill-btn danger-text",
              onClick: o[30] || (o[30] = (s) => $e(i.value))
            }, "删除"),
            e("div", qs, [
              e("button", {
                type: "button",
                class: "emp-pill-btn subtle",
                onClick: o[31] || (o[31] = (s) => fe(i.value))
              }, "导出分享"),
              e("button", {
                type: "button",
                class: "emp-pill-btn primary",
                disabled: U.value,
                onClick: Ue
              }, d(U.value ? "保存中…" : "保存配置"), 9, Js)
            ])
          ])
        ])) : k("", !0)
      ]),
      z.value.open ? (a(), Ve(ga, {
        key: 0,
        mode: z.value.mode,
        "employee-id": z.value.employeeId,
        "employee-name": z.value.employeeName,
        "replay-frames": z.value.replayFrames,
        running: !!S.value,
        "backend-stale": J.value,
        onClose: o[32] || (o[32] = (s) => z.value.open = !1),
        onRunNow: o[33] || (o[33] = (s) => {
          const T = y.value.find((H) => H.id === s);
          T && Ce(T);
        }),
        onReloadExtension: ae
      }, null, 8, ["mode", "employee-id", "employee-name", "replay-frames", "running", "backend-stale"])) : k("", !0),
      b.value.open ? (a(), Ve(gl, {
        key: 1,
        "employee-id": b.value.employeeId,
        "employee-name": b.value.employeeName,
        "latest-run": X.value,
        running: S.value === b.value.employeeId,
        "generation-error": A.value,
        "backend-stale": J.value,
        onClose: o[34] || (o[34] = (s) => b.value.open = !1),
        onRunNow: o[35] || (o[35] = (s) => {
          const T = y.value.find((H) => H.id === s);
          T && Ce(T);
        }),
        onUpdated: o[36] || (o[36] = (s) => {
          oe();
        }),
        onReloadExtension: ae
      }, null, 8, ["employee-id", "employee-name", "latest-run", "running", "generation-error", "backend-stale"])) : k("", !0),
      B.value.open ? (a(), Ve(Yl, {
        key: 2,
        "employee-id": B.value.employeeId,
        "employee-name": B.value.employeeName,
        "recent-runs": L.value,
        onClose: o[37] || (o[37] = (s) => B.value.open = !1),
        onUpdated: o[38] || (o[38] = (s) => {
          oe();
        })
      }, null, 8, ["employee-id", "employee-name", "recent-runs"])) : k("", !0)
    ]));
  }
}), or = /* @__PURE__ */ at(Ks, [["__scopeId", "data-v-159b968d"]]);
export {
  or as default
};
