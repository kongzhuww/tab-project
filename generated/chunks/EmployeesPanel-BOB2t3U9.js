import { d as ut, w as fe, o as ct, H as pt, f as n, g as l, k as Ce, h as e, s as T, t as c, j as g, F as O, i as H, n as st, b as N, x as J, y as At, l as dt, T as eo, u as he, q as qe, C as ge, B as ye, p as X, v as le, M as Le, m as Tt, L as lt } from "./vendor-vue-BbmU9NUg.js";
import { b as to } from "./github.service-DdJVB3Fj.js";
import { _ as vt } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { u as oo } from "./useWindowDraggable-BiFiOeBe.js";
import "./window-manager.store-D9RSYghK.js";
/* empty css                                                                        */
/* empty css                                                                             */
import { L as be } from "./LauncherTileContent-zENK7Z1f.js";
const ao = "digitalEmployeesV1", no = "digitalEmployeeRunsV1", _e = "digitalEmployeeLivePeekV1", Vt = "tab-project-employee-v1", lo = "organizer-approval-safe-v6", io = [
  { id: "bili.source", name: "B站数据源读取", description: "读取稍后再看、指定收藏夹或播放历史视频列表" },
  { id: "bili.info", name: "视频简介与分P工具", description: "允许员工自主调用工具查看完整简介、分区、播放点赞与分P列表" },
  { id: "bili.comments", name: "评论区置顶/热评工具", description: "允许员工自主调用工具查看置顶课代表总结、热评口碑与勘误" },
  { id: "bili.subtitle", name: "字幕分段按需读取工具", description: "允许员工自主按分 P 和页码按需抓取消化字幕全文" },
  { id: "jev.triage", name: "双层快筛路由", description: "先用 Jev / 轻模型做 Noul · Score · Choice 快速分拣" },
  { id: "library.save", name: "沉淀至资料库", description: "将通过阈值的高价值拆解按分类写入「资料库 → 文章」" },
  { id: "notify.high_value", name: "高价值静默通知", description: "生成深度笔记后向工作区通知中心追加提醒" },
  { id: "bookmarks.read", name: "浏览器书签树读取", description: "只读读取 Chrome 书签栏与其他书签目录树用于分类盘点" },
  { id: "launcher.read", name: "桌面分区与网站读取", description: "只读读取新标签页分区、大/小文件夹、嵌套层级与网站卡片" },
  { id: "organizer.plan", name: "整理提案（审批后生效）", description: "输出分步桌面/书签整理提案，每一步需用户点击审核后才写入" }
];
function Ot(v = Date.now()) {
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
function Ut(v = Date.now()) {
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
const ro = /* @__PURE__ */ new Set([
  "bili.source",
  "bili.info",
  "bili.comments",
  "bili.subtitle",
  "jev.triage",
  "library.save",
  "notify.high_value",
  "bookmarks.read",
  "launcher.read",
  "organizer.plan"
]);
function Ke(v, h, u, b) {
  const y = Number(v);
  return Number.isFinite(y) ? Math.max(h, Math.min(u, y)) : b;
}
function ae(v, h, u = "") {
  return typeof v != "string" ? u : v.trim().slice(0, h);
}
function so(v) {
  const h = ae(v, 300);
  if (!h) return "";
  try {
    const u = new URL(h);
    return u.protocol !== "http:" && u.protocol !== "https:" ? "" : u.toString();
  } catch {
    return "";
  }
}
function jt(v, h = Date.now()) {
  if (!v || typeof v != "object")
    throw new Error("员工配置格式无效。");
  const u = v, b = u.source?.kind === "workspace-organizer" ? Ut(h) : Ot(h), y = ae(u.name, 48);
  if (!y) throw new Error("请输入员工名称。");
  const E = u.source && typeof u.source == "object" ? u.source : {}, $ = E.kind === "bili-fav" || E.kind === "bili-history" || E.kind === "workspace-organizer" ? E.kind : "bili-toview", I = u.runtime && typeof u.runtime == "object" ? u.runtime : {}, U = I.analyzer === "native-pi" ? "native-pi" : "deepseek", K = I.decisionMode === "jev-http" ? "jev-http" : "llm-fast", q = so(I.jevEndpoint), D = u.prompt && typeof u.prompt == "object" ? u.prompt : {}, Y = ae(D.systemPrompt, 4e3, b.prompt.systemPrompt), m = ae(D.reportTemplate, 2500, b.prompt.reportTemplate), Z = Array.isArray(u.skills) ? u.skills : b.skills, i = Array.from(new Set(Z.filter((V) => ro.has(V))));
  i.length || ($ === "workspace-organizer" ? i.push(...b.skills) : i.push("bili.source", "bili.subtitle"));
  const B = u.decisionGate && typeof u.decisionGate == "object" ? u.decisionGate : {}, k = Array.isArray(B.categories) ? B.categories.map((V) => ae(V, 32)).filter(Boolean).slice(0, 12) : [], G = k.length ? Array.from(new Set(k)) : [...b.decisionGate.categories], S = Array.isArray(B.skipCategories) ? B.skipCategories.map((V) => ae(V, 32)).filter((V) => G.includes(V)) : b.decisionGate.skipCategories.filter((V) => G.includes(V)), M = u.schedulePolicy && typeof u.schedulePolicy == "object" ? u.schedulePolicy : {}, P = (Array.isArray(u.ownerFeedback) ? u.ownerFeedback : []).filter((V) => V && typeof V == "object" && typeof V.title == "string").slice(0, 16).map((V, oe) => ({
    id: ae(V.id, 64) || `fb-${h}-${oe}`,
    title: ae(V.title, 120),
    verdict: V.verdict === "skip" ? "skip" : "keep",
    category: ae(V.category, 32) || G[0],
    note: ae(V.note, 200),
    createdAt: Number.isFinite(V.createdAt) ? V.createdAt : h
  }));
  return {
    id: ae(u.id, 64) || `emp-${h}-${Math.random().toString(36).slice(2, 7)}`,
    name: y,
    role: ae(u.role, 64, "后台智能助手"),
    description: ae(u.description, 240),
    accentColor: /^#[0-9a-fA-F]{6}$/.test(String(u.accentColor || "")) ? String(u.accentColor) : "#6366f1",
    enabled: !!u.enabled,
    source: {
      kind: $,
      folderId: $ === "bili-fav" ? ae(E.folderId, 64) : "",
      folderTitle: $ === "bili-fav" ? ae(E.folderTitle, 64) : $ === "bili-history" ? "播放历史" : $ === "workspace-organizer" ? "本地桌面网站 + 浏览器书签" : "稍后再看"
    },
    runtime: {
      analyzer: U,
      piModel: ae(I.piModel, 120),
      piThinking: ["off", "minimal", "low", "medium", "high", "xhigh", "max"].includes(I.piThinking) ? I.piThinking : "medium",
      decisionMode: K,
      jevEndpoint: q
    },
    prompt: {
      systemPrompt: Y,
      reportTemplate: m
    },
    skills: i,
    customSkillInstructions: ae(u.customSkillInstructions, 4e3),
    decisionGate: {
      worthQuestion: ae(B.worthQuestion, 400, b.decisionGate.worthQuestion),
      minScore: Math.round(Ke(B.minScore, 0, 1, b.decisionGate.minScore) * 100) / 100,
      categories: G,
      skipCategories: S,
      skipWithoutSubtitle: !!B.skipWithoutSubtitle,
      retryOnSkip: B.retryOnSkip !== void 0 ? !!B.retryOnSkip : !0
    },
    schedulePolicy: {
      intervalMinutes: Math.round(Ke(M.intervalMinutes, 5, 1440, 20)),
      dailyLimit: Math.round(Ke(M.dailyLimit, 1, 50, 8)),
      maxFetchItems: Math.round(Ke(M.maxFetchItems, 1, 40, 15))
    },
    ownerFeedback: P,
    createdAt: Number.isFinite(u.createdAt) ? u.createdAt : h,
    updatedAt: h,
    lastRunAt: Number.isFinite(u.lastRunAt) ? u.lastRunAt : void 0,
    lastError: ae(u.lastError, 240) || void 0,
    nextEligibleAt: Number.isFinite(u.nextEligibleAt) ? u.nextEligibleAt : void 0
  };
}
function uo(v, h = {}) {
  return {
    format: Vt,
    exportedAt: h.now ?? Date.now(),
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
      ...h.includeFeedbackExamples && v.ownerFeedback.length ? { ownerFeedback: v.ownerFeedback.slice(0, 6).map((u) => ({ ...u })) } : {}
    }
  };
}
function co(v, h = Date.now()) {
  let u;
  try {
    u = JSON.parse(v);
  } catch {
    throw new Error("员工包文件不是有效的 JSON。");
  }
  if (!u || typeof u != "object")
    throw new Error("员工包内容格式无效。");
  const b = u.format === Vt && u.blueprint ? u.blueprint : u, y = jt(
    {
      ...b,
      id: `emp-${h}-${Math.random().toString(36).slice(2, 7)}`,
      enabled: !1,
      lastRunAt: void 0,
      lastError: void 0,
      nextEligibleAt: void 0
    },
    h
  );
  return y.source.kind === "bili-fav" && !y.source.folderId && (y.source.kind = "bili-toview", y.source.folderTitle = "稍后再看"), y;
}
function it(v = Date.now()) {
  const h = new Date(v), u = (b) => String(b).padStart(2, "0");
  return `${h.getFullYear()}-${u(h.getMonth() + 1)}-${u(h.getDate())}`;
}
class rt extends Error {
  constructor(h = "扩展后台服务暂不可用，请刷新扩展页面后重试。") {
    super(h), this.name = "EmployeeBackendUnavailable";
  }
}
async function pe(v, h, u = {}) {
  if (!v?.sendMessage)
    throw new rt();
  let b;
  try {
    b = await v.sendMessage({ type: `employee:${h}`, ...u });
  } catch {
    throw new rt();
  }
  if (!b || typeof b != "object")
    throw new rt();
  if (!b.ok)
    throw new Error(typeof b.error == "string" && b.error ? b.error : "后台数字员工操作未确认。");
  return b.result;
}
const po = {
  class: "peek-window",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "数字员工实时窥屏监视器"
}, vo = { class: "peek-win-bar" }, mo = { class: "peek-win-left" }, ko = {
  key: 0,
  class: "peek-action-text"
}, fo = { class: "peek-win-controls" }, go = ["disabled"], yo = { class: "peek-step-count" }, bo = {
  key: 0,
  class: "peek-stale-bar",
  role: "alert"
}, ho = {
  key: 1,
  class: "peek-empty"
}, _o = ["disabled"], wo = {
  key: 2,
  class: "peek-workspace"
}, $o = { class: "sim-address-bar" }, Io = { class: "sim-url" }, Fo = { class: "sim-body" }, So = { class: "sim-sidebar" }, Co = {
  class: "sim-state-box",
  "data-peek-target": "decision-badge"
}, xo = {
  key: 0,
  class: "sim-save-chip",
  "data-peek-target": "library-save"
}, Eo = { class: "sim-canvas" }, Lo = { class: "sim-section-head" }, Mo = { class: "sim-video-grid" }, No = ["data-peek-target"], zo = { class: "sim-cover-wrap" }, Bo = ["src"], Po = { class: "sim-dur" }, To = ["title"], Ro = { class: "sim-v-up" }, Ao = { class: "sim-video-banner" }, Vo = ["src"], Oo = { class: "sim-banner-info" }, Uo = { class: "sim-banner-meta" }, jo = { key: 0 }, Do = {
  key: 0,
  class: "sim-banner-stats"
}, Go = { class: "sim-tabs" }, qo = { class: "sim-tab-panel" }, Ko = {
  key: 0,
  class: "sim-info-panel",
  "data-peek-target": "info-desc"
}, Jo = {
  key: 0,
  class: "sim-pages"
}, Wo = { class: "sim-desc" }, Ho = {
  key: 1,
  class: "sim-comments-panel",
  "data-peek-target": "comments-list"
}, Yo = {
  key: 0,
  class: "sim-loading-note"
}, Qo = { class: "sim-comment-head" }, Xo = {
  key: 0,
  class: "sim-top-tag"
}, Zo = { class: "sim-likes" }, ea = {
  key: 2,
  class: "sim-subtitle-panel",
  "data-peek-target": "subtitle-lines"
}, ta = {
  key: 0,
  class: "sim-loading-note"
}, oa = {
  key: 0,
  class: "sim-verdict-bar"
}, aa = { class: "peek-cursor-tag" }, na = {
  class: "peek-timeline",
  "aria-label": "行为轨迹"
}, la = {
  key: 0,
  class: "peek-tl-list"
}, ia = ["onClick"], ra = { class: "peek-tl-idx" }, sa = { class: "peek-tl-label" }, da = {
  key: 1,
  class: "peek-tl-list"
}, ua = { class: "peek-tl-idx" }, ca = { class: "peek-tl-label" }, pa = { class: "peek-tl-label" }, va = /* @__PURE__ */ ut({
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
  setup(v, { emit: h }) {
    const u = v, b = h, y = N(null), E = N(null), $ = N([]), I = N(0), U = N(!0);
    let K = null, q = null;
    const D = N({ x: 80, y: 80, visible: !1 }), Y = N(0), m = J(() => {
      if (u.mode === "replay") {
        const w = u.replayFrames || [];
        return w.length ? w[Math.min(I.value, w.length - 1)] || w[0] : null;
      }
      return E.value;
    }), Z = J(() => {
      const w = m.value?.timelineSteps;
      return Array.isArray(w) && w.length ? w : $.value.length ? $.value : m.value?.cursorLabel ? [m.value.cursorLabel] : [];
    }), i = J(() => {
      const w = m.value?.phase;
      return w === "comments" ? "comments" : w === "subtitle" ? "subtitle" : "info";
    });
    function B(w) {
      const _ = Math.max(0, Math.floor(Number(w || 0))), L = Math.floor(_ / 60), Q = _ % 60;
      return `${L}:${String(Q).padStart(2, "0")}`;
    }
    function k(w) {
      const _ = Number(w || 0);
      return _ >= 1e4 ? `${(_ / 1e4).toFixed(1)}万` : String(_);
    }
    async function G() {
      await At();
      const w = y.value, _ = m.value;
      if (!w || !_) {
        D.value.visible = !1;
        return;
      }
      const L = w.getBoundingClientRect(), Q = w.querySelector(`[data-peek-target="${_.cursorTarget}"]`);
      if (!Q) {
        D.value = { x: Math.round(L.width * 0.45), y: Math.round(L.height * 0.42), visible: !0 };
        return;
      }
      const re = Q.getBoundingClientRect(), W = Math.max(16, Math.min(L.width - 140, re.left - L.left + Math.min(re.width * 0.42, 110))), ee = Math.max(16, Math.min(L.height - 36, re.top - L.top + Math.min(re.height * 0.48, 52)));
      D.value = { x: Math.round(W), y: Math.round(ee), visible: !0 }, Y.value++;
    }
    fe(m, () => {
      G();
    }, { immediate: !0, deep: !0 });
    function S() {
      K && (clearInterval(K), K = null);
    }
    function M() {
      if (S(), u.mode !== "replay") return;
      const w = u.replayFrames || [];
      w.length <= 1 || (K = setInterval(() => {
        U.value && (I.value < w.length - 1 ? I.value++ : U.value = !1);
      }, 1500));
    }
    function R() {
      const w = u.replayFrames || [];
      w.length && (!U.value && I.value >= w.length - 1 && (I.value = 0), U.value = !U.value);
    }
    function P(w) {
      if (!w || u.employeeId && w.employeeId !== u.employeeId) return;
      const _ = E.value;
      _ && _.updatedAt === w.updatedAt && _.bvid === w.bvid && _.cursorTarget === w.cursorTarget && _.cursorLabel === w.cursorLabel && _.active === w.active && (_.toolHistory?.length || 0) === (w.toolHistory?.length || 0) && (_.timelineSteps?.length || 0) === (w.timelineSteps?.length || 0) || (w.phase === "source" && w.cursorTarget === "folder" ? $.value = w.cursorLabel ? [w.cursorLabel] : [] : w.cursorLabel && $.value[$.value.length - 1] !== w.cursorLabel && ($.value = [...$.value.slice(-19), w.cursorLabel]), E.value = w);
    }
    async function ne() {
      if (!(u.mode !== "live" || typeof chrome > "u" || !chrome.storage?.local))
        try {
          const w = await chrome.storage.local.get(_e);
          P(w?.[_e]);
        } catch {
        }
    }
    function V(w, _) {
      u.mode !== "live" || _ !== "local" || !w[_e] || P(w[_e].newValue);
    }
    function oe(w) {
      w.key === "Escape" && (w.stopPropagation(), b("close"));
    }
    return ct(() => {
      document.addEventListener("keydown", oe), window.addEventListener("resize", G), u.mode === "live" ? (ne(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(V), q = setInterval(() => {
        ne();
      }, 400)) : (I.value = 0, U.value = !0, M()), G();
    }), pt(() => {
      S(), q && (clearInterval(q), q = null), document.removeEventListener("keydown", oe), window.removeEventListener("resize", G), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(V);
    }), (w, _) => (n(), l("div", {
      class: "peek-overlay",
      onClick: _[4] || (_[4] = Ce((L) => b("close"), ["self"]))
    }, [
      e("section", po, [
        e("header", vo, [
          e("div", mo, [
            e("span", {
              class: T(["peek-status-badge", { live: v.mode === "live" && m.value?.active }])
            }, [
              _[5] || (_[5] = e("i", { class: "peek-status-dot" }, null, -1)),
              e("span", null, c(v.mode === "live" ? m.value?.active ? "LIVE 实况窥屏" : "最近一次实况" : "历史轨迹回放"), 1)
            ], 2),
            e("strong", null, c(m.value?.employeeName || v.employeeName || "数字员工"), 1),
            m.value ? (n(), l("span", ko, c(m.value.cursorLabel), 1)) : g("", !0)
          ]),
          e("div", fo, [
            v.mode === "live" && v.employeeId ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "peek-ctl-btn",
              disabled: v.running || !!m.value?.active,
              onClick: _[0] || (_[0] = (L) => b("runNow", v.employeeId))
            }, c(v.running || m.value?.active ? "执行中…" : "▶ 立即试跑 1 条"), 9, go)) : g("", !0),
            v.mode === "replay" && (v.replayFrames?.length || 0) > 1 ? (n(), l(O, { key: 1 }, [
              e("button", {
                type: "button",
                class: "peek-ctl-btn",
                onClick: R
              }, c(U.value ? "暂停" : I.value >= (v.replayFrames?.length || 1) - 1 ? "重播" : "继续"), 1),
              e("span", yo, c(I.value + 1) + " / " + c(v.replayFrames?.length), 1)
            ], 64)) : g("", !0),
            e("button", {
              type: "button",
              class: "peek-close-btn",
              "aria-label": "关闭监视器",
              onClick: _[1] || (_[1] = (L) => b("close"))
            }, "×")
          ])
        ]),
        v.mode === "live" && v.backendStale ? (n(), l("div", bo, [
          _[6] || (_[6] = e("span", null, "检测到扩展后台 `background.js` 尚未重载，当前不会推送实时窥屏画面。", -1)),
          e("button", {
            type: "button",
            class: "peek-ctl-btn",
            onClick: _[2] || (_[2] = (L) => b("reloadExtension"))
          }, "🔄 立即热重载扩展")
        ])) : g("", !0),
        m.value ? (n(), l("div", wo, [
          e("div", {
            ref_key: "stageRef",
            ref: y,
            class: "peek-stage"
          }, [
            e("div", $o, [
              _[9] || (_[9] = e("span", { class: "sim-lock" }, "Bilibili · 插件视野仿真", -1)),
              e("span", Io, c(m.value.bvid ? `bilibili.com/video/${m.value.bvid}` : `bilibili.com · ${m.value.sourceTitle}`), 1)
            ]),
            e("div", Fo, [
              e("aside", So, [
                _[13] || (_[13] = e("div", { class: "sim-side-label" }, "数据源", -1)),
                e("div", {
                  class: T(["sim-folder-item", { active: m.value.phase === "source" }]),
                  "data-peek-target": "folder"
                }, [
                  _[10] || (_[10] = e("span", { class: "sim-folder-dot" }, null, -1)),
                  e("span", null, c(m.value.sourceTitle), 1)
                ], 2),
                _[14] || (_[14] = e("div", {
                  class: "sim-side-label",
                  style: { "margin-top": "10px" }
                }, "工作状态", -1)),
                e("div", Co, [
                  m.value.verdict ? (n(), l(O, { key: 0 }, [
                    e("strong", {
                      class: T({ ok: m.value.verdict.worth, skip: !m.value.verdict.worth })
                    }, c(m.value.verdict.worth ? "推荐沉淀" : "判定跳过"), 3),
                    e("span", null, c(m.value.verdict.category) + " · " + c(Math.round(m.value.verdict.score * 100)) + "分", 1)
                  ], 64)) : (n(), l(O, { key: 1 }, [
                    _[11] || (_[11] = e("strong", null, "自主探索中", -1)),
                    _[12] || (_[12] = e("span", null, "按需调用工具研判", -1))
                  ], 64))
                ]),
                m.value.phase === "done" || m.value.cursorTarget === "library-save" ? (n(), l("div", xo, " ✓ 已写入资料库 ")) : g("", !0)
              ]),
              e("main", Eo, [
                m.value.phase === "source" || !m.value.activeVideo ? (n(), l(O, { key: 0 }, [
                  e("div", Lo, [
                    e("strong", null, c(m.value.sourceTitle), 1),
                    e("small", null, "扫描前 " + c(m.value.sourceVideos.length) + " 条候选视频", 1)
                  ]),
                  e("div", Mo, [
                    (n(!0), l(O, null, H(m.value.sourceVideos, (L) => (n(), l("div", {
                      key: L.bvid,
                      class: T(["sim-video-card", { picked: L.bvid === m.value.bvid }]),
                      "data-peek-target": L.bvid === m.value.bvid ? "video-card" : void 0
                    }, [
                      e("div", zo, [
                        L.cover ? (n(), l("img", {
                          key: 0,
                          src: L.cover,
                          alt: ""
                        }, null, 8, Bo)) : g("", !0),
                        e("span", Po, c(B(L.duration)), 1)
                      ]),
                      e("div", {
                        class: "sim-v-title",
                        title: L.title
                      }, c(L.title), 9, To),
                      e("div", Ro, c(L.author), 1)
                    ], 10, No))), 128))
                  ])
                ], 64)) : (n(), l(O, { key: 1 }, [
                  e("div", Ao, [
                    m.value.activeVideo.cover ? (n(), l("img", {
                      key: 0,
                      class: "sim-banner-cover",
                      src: m.value.activeVideo.cover,
                      alt: ""
                    }, null, 8, Vo)) : g("", !0),
                    e("div", Oo, [
                      e("h4", null, c(m.value.activeVideo.title), 1),
                      e("div", Uo, [
                        e("span", null, "UP：" + c(m.value.activeVideo.author), 1),
                        m.value.activeVideo.tname ? (n(), l("span", jo, c(m.value.activeVideo.tname), 1)) : g("", !0),
                        e("span", null, c(m.value.activeVideo.bvid), 1)
                      ]),
                      m.value.activeVideo.stat ? (n(), l("div", Do, [
                        e("span", null, "播放 " + c(k(m.value.activeVideo.stat.view)), 1),
                        e("span", null, "点赞 " + c(k(m.value.activeVideo.stat.like)), 1),
                        e("span", null, "投币 " + c(k(m.value.activeVideo.stat.coin)), 1),
                        e("span", null, "收藏 " + c(k(m.value.activeVideo.stat.favorite)), 1)
                      ])) : g("", !0)
                    ])
                  ]),
                  e("div", Go, [
                    e("span", {
                      class: T(["sim-tab", { active: i.value === "info" }]),
                      "data-peek-target": "tab-info"
                    }, "简介与分P", 2),
                    e("span", {
                      class: T(["sim-tab", { active: i.value === "comments" }]),
                      "data-peek-target": "tab-comments"
                    }, "评论区", 2),
                    e("span", {
                      class: T(["sim-tab", { active: i.value === "subtitle" }]),
                      "data-peek-target": "tab-subtitle"
                    }, "字幕正文", 2)
                  ]),
                  e("div", qo, [
                    i.value === "info" ? (n(), l("div", Ko, [
                      m.value.activeVideo.pages?.length ? (n(), l("div", Jo, [
                        (n(!0), l(O, null, H(m.value.activeVideo.pages, (L) => (n(), l("span", {
                          key: L.page,
                          class: "sim-page-pill"
                        }, " P" + c(L.page) + " " + c(L.part || "正片"), 1))), 128))
                      ])) : g("", !0),
                      e("p", Wo, c(m.value.activeVideo.desc || "正在获取视频简介内容…"), 1)
                    ])) : i.value === "comments" ? (n(), l("div", Ho, [
                      m.value.comments?.length ? g("", !0) : (n(), l("div", Yo, "正在拉取 UP 主置顶与高赞评论…")),
                      (n(!0), l(O, null, H(m.value.comments, (L, Q) => (n(), l("div", {
                        key: Q,
                        class: T(["sim-comment-row", { pinned: L.isTop }])
                      }, [
                        e("div", Qo, [
                          L.isTop ? (n(), l("span", Xo, "📌 置顶")) : g("", !0),
                          e("strong", null, c(L.author), 1),
                          e("span", Zo, "👍 " + c(L.likes), 1)
                        ]),
                        e("p", null, c(L.message), 1)
                      ], 2))), 128))
                    ])) : (n(), l("div", ea, [
                      m.value.subtitleLines?.length ? g("", !0) : (n(), l("div", ta, "正在加载 WBI 字幕轨道…")),
                      (n(!0), l(O, null, H(m.value.subtitleLines, (L, Q) => (n(), l("div", {
                        key: Q,
                        class: "sim-sub-line"
                      }, c(L), 1))), 128))
                    ]))
                  ]),
                  m.value.verdict ? (n(), l("div", oa, [
                    e("strong", null, c(m.value.verdict.category) + " · " + c(Math.round(m.value.verdict.score * 100)) + "分", 1),
                    e("span", null, c(m.value.verdict.reason), 1)
                  ])) : g("", !0)
                ], 64))
              ])
            ]),
            D.value.visible ? (n(), l("div", {
              key: 0,
              class: "peek-cursor",
              style: st({ transform: `translate3d(${D.value.x}px, ${D.value.y}px, 0)` })
            }, [
              (n(), l("span", {
                key: Y.value,
                class: "peek-cursor-ripple"
              })),
              _[15] || (_[15] = e("svg", {
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
              e("span", aa, c(m.value.cursorLabel), 1)
            ], 4)) : g("", !0)
          ], 512),
          e("aside", na, [
            _[17] || (_[17] = e("div", { class: "peek-tl-head" }, "AI 行为时间轴", -1)),
            v.mode === "replay" && v.replayFrames?.length ? (n(), l("div", la, [
              (n(!0), l(O, null, H(v.replayFrames, (L, Q) => (n(), l("button", {
                key: Q,
                type: "button",
                class: T(["peek-tl-item", { active: Q === I.value, done: Q < I.value }]),
                onClick: (re) => {
                  I.value = Q, U.value = !1;
                }
              }, [
                e("span", ra, c(Q + 1), 1),
                e("span", sa, c(L.cursorLabel), 1)
              ], 10, ia))), 128))
            ])) : (n(), l("div", da, [
              (n(!0), l(O, null, H(Z.value, (L, Q) => (n(), l("div", {
                key: `tl-${Q}`,
                class: T(["peek-tl-item", Q === Z.value.length - 1 ? "active" : "done"])
              }, [
                e("span", ua, c(Q === Z.value.length - 1 && m.value.active ? "•" : Q + 1), 1),
                e("span", ca, c(L), 1)
              ], 2))), 128)),
              (n(!0), l(O, null, H(m.value.toolHistory, (L, Q) => (n(), l("div", {
                key: Q,
                class: "peek-tl-item done"
              }, [
                _[16] || (_[16] = e("span", { class: "peek-tl-idx" }, "✓", -1)),
                e("span", pa, c(L.summary), 1)
              ]))), 128))
            ]))
          ])
        ])) : (n(), l("div", ho, [
          _[7] || (_[7] = e("h3", null, "暂无可展示的窥屏实况", -1)),
          _[8] || (_[8] = e("p", null, "请点击下方「立即试跑 1 条」或开启后台巡检，员工读取收藏夹、视频简介、评论区与字幕的每一步动作都会在这里实时呈现。", -1)),
          v.mode === "live" && v.employeeId ? (n(), l("button", {
            key: 0,
            type: "button",
            class: "peek-ctl-btn",
            style: { "margin-top": "12px" },
            disabled: v.running,
            onClick: _[3] || (_[3] = (L) => b("runNow", v.employeeId))
          }, c(v.running ? "执行中…" : "▶ 立即试跑 1 条"), 9, _o)) : g("", !0)
        ]))
      ])
    ]));
  }
}), ma = /* @__PURE__ */ vt(va, [["__scopeId", "data-v-d141b927"]]), ka = (v) => v === "rename_folder" || v === "remove_folder" || v === "merge_folders";
function Dt(v, h, u) {
  const b = h ? u(h) : void 0;
  if (h && !b) throw new Error("找不到目标文件夹。");
  const y = /* @__PURE__ */ new Set([v]);
  for (let E = h; E; E = u(E)?.parentId) {
    if (y.has(E)) throw new Error("不能合并到自身或子文件夹。");
    y.add(E);
  }
  return b;
}
function fa(v, h, u, b, y, E) {
  const $ = v.get(b);
  if (!$ || b === E) throw new Error("找不到要整理的文件夹。");
  if (u === "rename_folder" && (!y || y === E || v.has(y))) throw new Error("文件夹名称不可用。");
  const I = u === "merge_folders" ? y : $.parent;
  if (u === "merge_folders" && !I) throw new Error("请选择合并目标。");
  Dt(b, I, (D) => {
    const Y = v.get(D);
    return Y && { parentId: Y.parent };
  });
  const U = u === "rename_folder" ? y : I, K = I && v.get(I)?.page || $.page, q = /* @__PURE__ */ new Set([b]);
  for (let D = !0; D; ) {
    D = !1;
    for (const [Y, m] of v) m.parent && q.has(m.parent) && !q.has(Y) && (q.add(Y), D = !0);
  }
  v.delete(b), u === "rename_folder" && U && v.set(U, { ...$, name: U });
  for (const [D, Y] of v) {
    if (!q.has(D)) continue;
    const m = { ...Y, page: K };
    Y.parent === b && (U ? m.parent = U : delete m.parent), v.set(D, m);
  }
  for (const D of h)
    D.group && q.has(D.group) && (D.page = K), D.group === b && (D.group = U || E);
}
const Me = "常用网站";
function Je(v) {
  try {
    const h = new URL(String(v || ""));
    return /^https?:$/.test(h.protocol) && !h.username && !h.password ? h.href : "";
  } catch {
    return "";
  }
}
function Ne(v, h, u = !1) {
  const b = { ...v.params };
  for (const [y, E] of Object.entries(v.refs || {})) {
    const $ = h.find((I) => I.id === E);
    if (!$ || u && $.status !== "applied" || $.status === "skipped" || $.status === "undone") throw new Error(`前置步骤尚未生效，请先执行 #${$?.order || "?"}。`);
    if (y === "partition")
      v.type === "create_launcher_folder" ? b.partitionName = $.params.partitionName : b.targetPartition = $.params.partitionName;
    else if (y === "folder") b.targetFolder = $.params.folderName;
    else if (y === "parentFolder") b.parentFolderName = $.params.folderName;
    else {
      const I = u ? $.result?.bookmarkFolderId : $.result?.bookmarkFolderId || `new:${$.id}`;
      if (!I) throw new Error("找不到新建的书签目录。");
      y === "bookmarkParent" ? b.parentBookmarkId = I : b.targetFolder = I;
    }
  }
  if (u) {
    const y = h.find((E) => v.dependsOn?.includes(E.id) && E.status !== "applied");
    if (y) throw new Error(`请先执行 #${y.order}。`);
  }
  return b;
}
function ga(v) {
  for (const h of v) {
    let u = h.params;
    try {
      u = Ne(h, v);
    } catch {
    }
    switch (h.type) {
      case "rename_folder":
      case "rename_link":
        h.title = `将「${u.sourceLabel}」改名为「${u.newName}」`;
        break;
      case "remove_folder":
        h.title = `移除「${u.sourceLabel}」，内容移到上一级`;
        break;
      case "merge_folders":
        h.title = `将「${u.sourceLabel}」合并到「${u.targetBookmarkPath || u.targetFolder}」`;
        break;
      case "create_partition":
        h.title = `新建分区「${u.partitionName}」`;
        break;
      case "create_launcher_folder":
        h.title = `在「${u.partitionName}${u.parentFolderName ? ` / ${u.parentFolderName}` : ""}」新建${u.folderSize === "large" ? "大" : "小"}文件夹「${u.folderName}」`;
        break;
      case "move_quick_link":
        h.title = `将网站「${u.linkTitle}」移至「${u.targetPartition} / ${u.targetFolder || Me}」`;
        break;
      case "promote_bookmark_to_launcher":
        h.title = `将书签「${u.bookmarkTitle}」添加到「${u.targetPartition} / ${u.targetFolder || Me}」`;
        break;
      case "create_bookmark_folder": {
        const b = v.find((y) => y.id === h.refs?.bookmarkParent);
        h.title = `在书签目录「${b?.params.folderName || u.parentBookmarkPath || u.parentBookmarkId}」下新建「${u.folderName}」`;
        break;
      }
      case "move_bookmark": {
        const b = v.find((y) => y.id === h.refs?.bookmarkTarget);
        h.title = `将书签「${u.bookmarkTitle}」移至「${b?.params.folderName || u.targetBookmarkPath || u.targetFolder}」`;
        break;
      }
    }
  }
}
function Rt(v, h, u, b = "proposal") {
  const y = new Map(v.partitions.map((i) => [i.id, { ...i }])), E = new Map(v.folders.map((i) => [i.name, { ...i, size: i.size === "large" ? "large" : "small", badge: void 0 }])), $ = v.links.map((i) => ({ ...i, badge: void 0 })), I = v.bookmarkFolders.map((i) => ({ ...i, badge: void 0 })), U = v.bookmarks.map((i) => ({ ...i, badge: void 0 })), K = /* @__PURE__ */ new Set(), q = (i) => {
    K.has(i) || (K.add(i), h.find((B) => B.id === i)?.dependsOn?.forEach(q));
  };
  u && q(u);
  const D = /* @__PURE__ */ new Set(), Y = [];
  for (const i of h) {
    const B = i.status === "applied";
    if (!B && (b === "actual" || !["pending", "error"].includes(i.status) || u && !K.has(i.id)) || i.dependsOn?.some((S) => !D.has(S))) continue;
    let k;
    try {
      k = Ne(i, h);
    } catch {
      Y.push(`#${i.order}：前置步骤未生效或已跳过。`);
      continue;
    }
    const G = B ? "applied" : "new";
    if (i.type === "rename_link") {
      const S = k.scope === "desktop" ? $.find((M) => M.id === k.linkId) : U.find((M) => M.id === k.bookmarkId);
      S && k.newName && (S.title = k.newName);
    } else if (ka(i.type) && k.sourceFolder)
      try {
        if (k.scope === "desktop") fa(E, $, i.type, k.sourceFolder, i.type === "rename_folder" ? k.newName : k.targetFolder, Me);
        else {
          const S = I.findIndex((R) => R.id === k.sourceFolder), M = I[S];
          if (!M) continue;
          if (i.type === "rename_folder" && k.newName) M.title = k.newName;
          else {
            const R = Dt(M.id, i.type === "merge_folders" ? k.targetFolder : M.parentId, (P) => I.find((ne) => ne.id === P));
            if (!R) continue;
            for (const P of [...I, ...U]) P.parentId === M.id && (P.parentId = R.id);
            I.splice(S, 1);
          }
        }
      } catch (S) {
        Y.push(`#${i.order}：${S.message}`);
        continue;
      }
    else if (i.type === "create_partition" && k.partitionName) y.set(k.partitionName, { id: k.partitionName, label: k.partitionName, badge: G });
    else if (i.type === "create_launcher_folder" && k.folderName) {
      const S = k.parentFolderName ? E.get(k.parentFolderName)?.page : k.partitionName;
      if (!S || !y.has(S) || S !== k.partitionName || E.has(k.folderName)) {
        Y.push(`#${i.order}：文件夹目标冲突。`);
        continue;
      }
      E.set(k.folderName, { name: k.folderName, page: S, size: k.folderSize === "large" ? "large" : "small", parent: k.parentFolderName, linkCount: 0, badge: G });
    } else if (i.type === "move_quick_link" || i.type === "promote_bookmark_to_launcher") {
      const S = k.targetFolder || Me, M = S === Me ? k.targetPartition : E.get(S)?.page;
      if (!M || !y.has(M) || M !== k.targetPartition) {
        Y.push(`#${i.order}：目标不存在或分区冲突，保留原位置。`);
        continue;
      }
      const R = i.type === "move_quick_link" ? $.find((P) => P.id === k.linkId) : $.find((P) => P.url === k.bookmarkUrl);
      R ? Object.assign(R, { page: M, group: S, badge: B ? "applied" : "moved" }) : i.type === "promote_bookmark_to_launcher" && k.bookmarkUrl && $.push({ id: `preview:${i.id}`, title: k.bookmarkTitle || k.bookmarkUrl, url: k.bookmarkUrl, page: M, group: S, badge: B ? "applied" : "promoted" });
    } else if (i.type === "create_bookmark_folder" && k.folderName) {
      const S = I.find((M) => M.id === k.parentBookmarkId);
      if (!S) {
        Y.push(`#${i.order}：书签父目录不存在。`);
        continue;
      }
      I.push({ id: i.result?.bookmarkFolderId || `new:${i.id}`, title: k.folderName, parentId: S.id, path: `${S.path} / ${k.folderName}`, childCount: 0, badge: G });
    } else if (i.type === "move_bookmark") {
      const S = I.find((R) => R.id === k.targetFolder), M = U.find((R) => R.id === k.bookmarkId);
      if (!S || !M) {
        Y.push(`#${i.order}：书签目标不存在，保留原位置。`);
        continue;
      }
      Object.assign(M, { parentId: S.id, folderPath: S.path, badge: B ? "applied" : "moved" });
    }
    D.add(i.id);
  }
  const m = [...y.values()].map((i) => ({
    ...i,
    folders: [...E.values()].filter((B) => B.page === i.id).map((B) => ({ ...B, links: $.filter((k) => k.page === i.id && k.group === B.name) })),
    looseLinks: $.filter((B) => B.page === i.id && (B.group === Me || !E.has(B.group)))
  })), Z = (i) => {
    const B = [i.title], k = /* @__PURE__ */ new Set([i.id]);
    let G = I.find((S) => S.id === i.parentId);
    for (; G && !k.has(G.id); )
      B.unshift(G.title), k.add(G.id), G = I.find((S) => S.id === G?.parentId);
    return B.join(" / ");
  };
  return { partitions: m, bookmarkFolders: I.map((i) => ({ ...i, path: Z(i), items: U.filter((B) => B.parentId === i.id) })), warnings: Y };
}
const ya = ["aria-label"], ba = { class: "org-head-left" }, ha = { key: 0 }, _a = { key: 1 }, wa = { class: "org-head-actions" }, $a = ["disabled"], Ia = ["disabled"], Fa = { class: "org-body" }, Sa = { class: "org-stage-bar" }, Ca = {
  class: "org-view-tabs",
  role: "tablist"
}, xa = ["aria-selected"], Ea = ["aria-selected"], La = ["data-mode"], Ma = {
  key: 0,
  class: "org-stage-empty"
}, Na = ["disabled"], za = {
  key: 1,
  class: "org-desktop-preview",
  "data-peek-target": "org-folders"
}, Ba = { class: "part-tabs" }, Pa = ["data-peek-part", "data-peek-part-label", "onClick"], Ta = { key: 0 }, Ra = { key: 1 }, Aa = {
  key: 0,
  class: "part-canvas",
  "data-peek-target": "org-links"
}, Va = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, Oa = ["data-peek-folder", "title", "onClick", "onKeydown"], Ua = ["href", "data-peek-link", "title"], ja = {
  key: 0,
  class: "peek-corner-badge moved"
}, Da = {
  key: 1,
  class: "mini-empty"
}, Ga = {
  key: 2,
  class: "org-flow-svg",
  "aria-hidden": "true"
}, qa = ["d"], Ka = ["d", "marker-end"], Ja = ["cx", "cy"], Wa = {
  key: 0,
  class: "org-folder-drawer",
  "aria-label": "文件夹展开预览"
}, Ha = { class: "org-folder-drawer-head" }, Ya = { class: "org-folder-drawer-title" }, Qa = ["title"], Xa = {
  key: 1,
  class: "drawer-state-pill new"
}, Za = {
  key: 2,
  class: "drawer-state-pill applied"
}, en = { class: "org-folder-drawer-actions" }, tn = { class: "org-folder-drawer-body" }, on = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, an = ["data-peek-folder", "onClick", "onKeydown"], nn = ["href", "title"], ln = {
  key: 1,
  class: "mini-empty"
}, rn = {
  key: 2,
  class: "org-desktop-preview org-bookmarks-preview",
  "data-peek-target": "org-folders"
}, sn = { class: "part-tabs" }, dn = ["data-peek-bm-folder", "data-peek-bm-id", "onClick"], un = { key: 0 }, cn = { key: 1 }, pn = {
  key: 0,
  class: "part-canvas",
  "data-peek-target": "org-links"
}, vn = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, mn = ["data-peek-bm-folder", "data-peek-bm-id", "title", "onClick", "onKeydown"], kn = ["href", "data-peek-bm-item", "title"], fn = {
  key: 0,
  class: "peek-corner-badge moved"
}, gn = {
  key: 1,
  class: "mini-empty"
}, yn = {
  key: 2,
  class: "org-flow-svg",
  "aria-hidden": "true"
}, bn = ["d"], hn = ["d", "marker-end"], _n = ["cx", "cy"], wn = {
  key: 0,
  class: "org-folder-drawer",
  "aria-label": "书签文件夹展开预览"
}, $n = { class: "org-folder-drawer-head" }, In = { class: "org-folder-drawer-title" }, Fn = {
  key: 1,
  class: "drawer-state-pill new"
}, Sn = {
  key: 2,
  class: "drawer-state-pill applied"
}, Cn = { class: "org-folder-drawer-actions" }, xn = { class: "org-folder-drawer-body" }, En = {
  key: 0,
  class: "launcher-items launcher-site-items org-preview-grid"
}, Ln = ["data-peek-bm-folder", "data-peek-bm-id", "onClick", "onKeydown"], Mn = ["href", "title"], Nn = {
  key: 1,
  class: "mini-empty"
}, zn = { class: "peek-cursor-tag" }, Bn = {
  class: "org-checklist",
  "data-peek-target": "org-approval"
}, Pn = { class: "checklist-head" }, Tn = ["disabled"], Rn = {
  key: 0,
  class: "step-toast confirm-box"
}, An = { class: "confirm-btns" }, Vn = {
  key: 1,
  class: "step-toast err",
  role: "alert"
}, On = {
  key: 2,
  class: "step-toast ok",
  role: "status"
}, Un = {
  key: 3,
  class: "step-toast err",
  role: "alert"
}, jn = {
  key: 4,
  class: "live-steps"
}, Dn = {
  key: 5,
  class: "todo-list"
}, Gn = ["onMouseenter"], qn = ["disabled", "title", "onClick"], Kn = { key: 0 }, Jn = { key: 1 }, Wn = ["onClick"], Hn = { class: "todo-top" }, Yn = { class: "step-num" }, Qn = {
  key: 0,
  class: "status-tag applied"
}, Xn = {
  key: 1,
  class: "status-tag skipped"
}, Zn = {
  key: 2,
  class: "status-tag skipped"
}, el = {
  key: 3,
  class: "status-tag skipped"
}, tl = { class: "todo-title" }, ol = {
  key: 0,
  class: "todo-dep"
}, al = {
  key: 1,
  class: "todo-reason"
}, nl = {
  key: 2,
  class: "todo-err"
}, ll = {
  key: 3,
  class: "todo-edit-row"
}, il = ["maxlength"], rl = { class: "todo-ops" }, sl = ["disabled", "onClick"], dl = ["disabled", "onClick"], ul = ["disabled", "onClick"], cl = ["disabled", "onClick"], pl = {
  key: 6,
  class: "todo-empty"
}, vl = /* @__PURE__ */ ut({
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
  setup(v, { emit: h }) {
    const u = v, b = h, y = N(null), E = N(null), $ = J(() => E.value?.id === u.latestRun?.id ? E.value : u.latestRun);
    fe(
      () => u.latestRun,
      (a, r) => {
        a?.id !== r?.id ? (E.value = null, oe.value = "", M.value = void 0, U.value = !1) : a && (a.organizerRevision || 0) >= (E.value?.organizerRevision || 0) && (E.value = a);
      }
    );
    const I = N("proposal");
    fe(
      () => u.employeeId,
      () => {
        y.value = null, M.value = void 0;
      }
    );
    const U = N(!1), { panelRef: K, headerRef: q, initialStyle: D, onHeaderPointerDown: Y } = oo({
      windowId: "organizer-approval",
      managed: !1,
      defaultWidth: 1140,
      defaultHeight: 740,
      minWidth: 360,
      minHeight: 320
    }), m = N(null), Z = N(null), i = N("desktop"), B = N(""), k = N(""), G = N(""), S = N(""), M = N(void 0), R = N(""), P = N(!1), ne = N(""), V = N(""), oe = N(""), w = N(""), _ = N("small"), L = N({ x: 110, y: 90, visible: !1 }), Q = N(0);
    let re = null;
    const W = J(
      () => !!u.running || !$.value && !!(y.value?.active && y.value?.employeeId === u.employeeId)
    ), ee = J(() => $.value?.organizerSnapshot && !W.value ? $.value.organizerSnapshot : y.value?.employeeId === u.employeeId && y.value.organizerSnapshot || null), ve = J(() => W.value ? y.value?.employeeId === u.employeeId ? y.value.organizerSteps || [] : [] : $.value ? $.value.planSteps || [] : y.value?.organizerSteps || []), se = J(() => {
      const a = JSON.parse(JSON.stringify(ve.value)), r = a.find((t) => t.id === oe.value);
      return r && (r.type === "create_partition" ? r.params.partitionName = w.value : r.params.folderName = w.value, r.type === "create_launcher_folder" && (r.params.folderSize = _.value)), ga(a), a;
    }), te = J(() => ee.value ? Rt(
      ee.value,
      se.value,
      I.value === "step" ? M.value : void 0,
      I.value === "actual" ? "actual" : "proposal"
    ) : { partitions: [], bookmarkFolders: [], warnings: [] }), Te = J(() => ee.value ? Rt(ee.value, se.value, void 0, "actual") : { partitions: [], bookmarkFolders: [], warnings: [] }), ze = J(() => ve.value.some((a) => a.status === "applying" || a.status === "undoing"));
    fe(
      () => te.value.partitions,
      (a) => {
        a.length && (!B.value || !a.some((r) => r.id === B.value)) && (B.value = a[0].id);
      },
      { immediate: !0 }
    );
    const de = J(
      () => te.value.partitions.find((a) => a.id === B.value) || te.value.partitions[0] || null
    );
    fe(
      [() => B.value, () => i.value, () => I.value],
      () => {
        k.value && !de.value?.folders.some((a) => a.name === k.value) && (k.value = "");
      }
    );
    const Re = J(
      () => (de.value?.folders || []).filter((a) => !a.parent)
    ), ue = J(
      () => k.value && de.value?.folders.find((a) => a.name === k.value) || null
    ), Ae = J(
      () => ue.value ? (de.value?.folders || []).filter((a) => a.parent === ue.value?.name) : []
    );
    function We(a) {
      const r = de.value?.folders || [];
      let t = r.find((C) => C.name === a);
      const d = /* @__PURE__ */ new Set();
      for (; t?.parent && !d.has(t.name); ) {
        d.add(t.name);
        const C = r.find((z) => z.name === t.parent);
        if (!C) break;
        t = C;
      }
      return t?.name || a;
    }
    const we = J(() => {
      const a = de.value;
      if (!a) return [];
      const r = Te.value.partitions.find((f) => f.id === a.id), t = new Set(a.folders.map((f) => f.name)), d = /* @__PURE__ */ new Map();
      for (const f of se.value) {
        if (!["pending", "error"].includes(f.status)) continue;
        let F = f.params;
        try {
          F = Ne(f, se.value);
        } catch {
          continue;
        }
        if ((f.type === "move_quick_link" || f.type === "promote_bookmark_to_launcher") && F.targetFolder && t.has(F.targetFolder)) {
          const x = f.type === "move_quick_link" ? F.linkId : `preview:${f.id}`;
          x && d.set(x, {
            targetFolder: F.targetFolder,
            rootFolder: We(F.targetFolder),
            stepId: f.id
          });
        }
      }
      const C = [], z = /* @__PURE__ */ new Set();
      for (const f of r?.looseLinks || []) {
        const F = d.get(f.id);
        if (F)
          C.push({
            ...f,
            badge: "moved",
            pendingTargetFolder: F.targetFolder,
            pendingRootFolder: F.rootFolder,
            stepId: F.stepId
          }), z.add(f.id);
        else {
          const x = a.looseLinks.find((ce) => ce.id === f.id);
          x && (C.push({ ...x }), z.add(f.id));
        }
      }
      for (const f of a.looseLinks)
        z.has(f.id) || (C.push({ ...f }), z.add(f.id));
      for (const f of a.folders)
        for (const F of f.links) {
          if (z.has(F.id)) continue;
          const x = d.get(F.id);
          x && (C.push({
            ...F,
            pendingTargetFolder: x.targetFolder,
            pendingRootFolder: x.rootFolder,
            stepId: x.stepId
          }), z.add(F.id));
        }
      return C;
    });
    function Ve(a) {
      const r = (de.value?.folders || []).filter((d) => d.parent === a.name), t = [...a.links];
      for (const d of r)
        for (const C of d.links) {
          if (t.length >= 9) break;
          t.push(C);
        }
      return {
        title: a.name,
        preview: t.slice(0, 9),
        count: a.links.length + r.length
      };
    }
    function Be(a) {
      B.value = a, k.value = "";
    }
    function Oe(a) {
      k.value = k.value === a ? "" : a;
    }
    const $e = J(() => {
      const a = te.value.bookmarkFolders, r = new Set(a.map((d) => d.id)), t = a.filter((d) => !d.parentId || d.parentId === "0" || !r.has(d.parentId));
      return t.length ? t : a.slice(0, 1);
    });
    fe(
      $e,
      (a) => {
        a.length && (!G.value || !a.some((r) => r.id === G.value)) && (G.value = a[0].id);
      },
      { immediate: !0 }
    );
    const me = J(
      () => $e.value.find((a) => a.id === G.value) || $e.value[0] || null
    );
    fe(
      [() => G.value, () => i.value],
      () => {
        S.value && !te.value.bookmarkFolders.some((a) => a.id === S.value) && (S.value = "");
      }
    );
    const Ue = J(() => {
      const a = me.value;
      return a ? te.value.bookmarkFolders.filter((r) => r.parentId === a.id) : [];
    });
    function He(a, r) {
      const t = te.value.bookmarkFolders;
      let d = t.find((z) => z.id === a || z.title === a);
      const C = /* @__PURE__ */ new Set();
      for (; d && d.parentId && d.parentId !== r && !C.has(d.id); ) {
        C.add(d.id);
        const z = t.find((f) => f.id === d.parentId);
        if (!z) break;
        d = z;
      }
      return d && d.parentId === r ? d.id : "";
    }
    function Ye(a) {
      const r = te.value.bookmarkFolders, t = new Set($e.value.map((z) => z.id));
      let d = r.find((z) => z.id === a || z.title === a);
      const C = /* @__PURE__ */ new Set();
      for (; d && !t.has(d.id) && d.parentId && !C.has(d.id); )
        C.add(d.id), d = r.find((z) => z.id === d.parentId);
      return d && t.has(d.id) ? d.id : "";
    }
    const xe = J(() => {
      const a = me.value;
      if (!a) return [];
      const r = te.value.bookmarkFolders, t = Te.value.bookmarkFolders.find((f) => f.id === a.id), d = /* @__PURE__ */ new Map();
      for (const f of se.value) {
        if (f.type !== "move_bookmark" || !["pending", "error"].includes(f.status)) continue;
        let F = f.params;
        try {
          F = Ne(f, se.value);
        } catch {
          continue;
        }
        if (!F.bookmarkId || !F.targetFolder) continue;
        const x = r.find((Se) => Se.id === F.targetFolder || Se.title === F.targetFolder);
        if (!x) continue;
        const ce = He(x.id, a.id);
        ce && d.set(F.bookmarkId, {
          targetFolderTitle: x.title,
          rootFolderId: ce,
          stepId: f.id
        });
      }
      const C = [], z = /* @__PURE__ */ new Set();
      for (const f of t?.items || []) {
        const F = d.get(f.id);
        if (F)
          C.push({
            id: f.id,
            title: f.title,
            url: f.url,
            badge: "moved",
            pendingTargetFolder: F.targetFolderTitle,
            pendingRootFolderId: F.rootFolderId,
            stepId: F.stepId
          }), z.add(f.id);
        else {
          const x = a.items.find((ce) => ce.id === f.id);
          x && (C.push({ id: x.id, title: x.title, url: x.url, badge: x.badge }), z.add(f.id));
        }
      }
      for (const f of a.items)
        z.has(f.id) || (C.push({ id: f.id, title: f.title, url: f.url, badge: f.badge }), z.add(f.id));
      for (const f of r)
        for (const F of f.items) {
          if (z.has(F.id)) continue;
          const x = d.get(F.id);
          x && (C.push({
            id: F.id,
            title: F.title,
            url: F.url,
            badge: "moved",
            pendingTargetFolder: x.targetFolderTitle,
            pendingRootFolderId: x.rootFolderId,
            stepId: x.stepId
          }), z.add(F.id));
        }
      return C;
    });
    function je(a) {
      const t = te.value.bookmarkFolders.filter((C) => C.parentId === a.id), d = [...a.items];
      for (const C of t)
        for (const z of C.items) {
          if (d.length >= 9) break;
          d.push(z);
        }
      return {
        title: a.title,
        preview: d.slice(0, 9),
        count: a.items.length + t.length
      };
    }
    const ie = J(
      () => S.value && te.value.bookmarkFolders.find((a) => a.id === S.value) || null
    ), Pe = J(
      () => ie.value ? te.value.bookmarkFolders.filter((a) => a.parentId === ie.value?.id) : []
    );
    function p(a) {
      G.value = a, S.value = "";
    }
    function o(a) {
      S.value = S.value === a ? "" : a;
    }
    function s() {
      const a = ie.value?.parentId;
      !a || a === me.value?.id || a === "0" ? S.value = "" : S.value = a;
    }
    function A(a) {
      return a === "applied" ? "✓" : a === "promoted" ? "上屏" : a === "moved" ? "移入" : "";
    }
    const j = N([]);
    function ke(a, r, t, d, C) {
      const z = r.getBoundingClientRect(), f = t.getBoundingClientRect();
      if (z.width <= 0 || f.width <= 0) return null;
      const F = z.left - d.left + z.width * 0.5, x = z.top - d.top + Math.min(z.height * 0.36, 30), ce = f.left - d.left + f.width * 0.5, Se = f.top - d.top + Math.min(f.height * 0.38, t.classList.contains("size-large") ? 68 : 30), Yt = ce - F, ot = Se - x, Ge = Math.hypot(Yt, ot);
      if (Ge < 10) return null;
      const Qt = (F + ce) * 0.5, Xt = Math.max(18, Math.min(46, Ge * 0.22)), at = Qt + (ot > 20 ? -12 : ot < -20 ? 12 : 0), nt = Math.max(6, Math.min(x, Se) - Xt), It = at - F, Ft = nt - x, St = Math.hypot(It, Ft) || 1, Ct = Math.min(18, Ge * 0.22), xt = F + It / St * Ct, Et = x + Ft / St * Ct, Lt = ce - at, Mt = Se - nt, Nt = Math.hypot(Lt, Mt) || 1, Zt = t.classList.contains("size-large"), zt = Math.min(Zt ? 42 : 25, Ge * 0.32), Bt = ce - Lt / Nt * zt, Pt = Se - Mt / Nt * zt;
      return {
        id: a,
        path: `M ${xt.toFixed(1)} ${Et.toFixed(1)} Q ${at.toFixed(1)} ${nt.toFixed(1)} ${Bt.toFixed(1)} ${Pt.toFixed(1)}`,
        sx: Number(xt.toFixed(1)),
        sy: Number(Et.toFixed(1)),
        ex: Number(Bt.toFixed(1)),
        ey: Number(Pt.toFixed(1)),
        focused: C
      };
    }
    function Ie() {
      const a = Z.value;
      if (!a) {
        j.value = [];
        return;
      }
      const r = a.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) {
        j.value = [];
        return;
      }
      const t = [];
      if (i.value === "desktop")
        for (const d of we.value) {
          if (!d.pendingRootFolder) continue;
          const C = Array.from(a.querySelectorAll("[data-peek-link]")).find((x) => x.dataset.peekLink === d.id), z = Array.from(a.querySelectorAll("[data-peek-folder]")).find((x) => x.dataset.peekFolder === d.pendingRootFolder);
          if (!C || !z) continue;
          const f = !!(M.value && M.value === d.stepId) || Ze(d.id, d.url) || Xe(d.pendingTargetFolder || d.pendingRootFolder), F = ke(`desk:${d.id}->${d.pendingRootFolder}`, C, z, r, f);
          F && t.push(F);
        }
      else
        for (const d of xe.value) {
          if (!d.pendingRootFolderId) continue;
          const C = Array.from(a.querySelectorAll("[data-peek-bm-item]")).find((x) => x.dataset.peekBmItem === d.id), z = Array.from(a.querySelectorAll("[data-peek-bm-id]")).find((x) => x.dataset.peekBmId === d.pendingRootFolderId);
          if (!C || !z) continue;
          const f = !!(M.value && M.value === d.stepId) || Ee.value?.bookmarkId === d.id, F = ke(`bm:${d.id}->${d.pendingRootFolderId}`, C, z, r, f);
          F && t.push(F);
        }
      j.value = t;
    }
    const De = J(() => ve.value.filter((a) => a.status === "pending" || a.status === "error").length), Gt = J(() => ve.value.filter((a) => a.status === "applied").length), mt = J(() => y.value?.employeeId === u.employeeId && y.value?.timelineSteps?.length ? y.value.timelineSteps : []), Fe = J(() => M.value && se.value.find((a) => a.id === M.value) || null), Qe = J(() => W.value && y.value?.cursorLabel ? y.value.cursorLabel : Fe.value ? Fe.value.title : "");
    function qt(a) {
      switch (a.type) {
        case "create_partition":
          return "新建分区";
        case "create_launcher_folder":
          return a.params.folderSize === "large" ? "大文件夹" : "小文件夹";
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
    const Ee = J(() => {
      if (!Fe.value) return null;
      try {
        return Ne(Fe.value, se.value);
      } catch {
        return Fe.value.params;
      }
    });
    function Xe(a) {
      const r = Ee.value;
      return r ? r.folderName === a || r.targetFolder === a || r.parentFolderName === a : !1;
    }
    function Ze(a, r) {
      const t = Ee.value;
      return t ? !!t.linkId && t.linkId === a || !!t.bookmarkUrl && t.bookmarkUrl === r : !1;
    }
    function kt(a, r) {
      const t = Ee.value;
      return t ? t.targetFolder === a || t.targetFolder === r || t.folderName === r || t.parentBookmarkId === a : !1;
    }
    function ft(a) {
      const r = Ee.value;
      return r ? !!r.bookmarkId && r.bookmarkId === a : !1;
    }
    function Kt() {
      const a = m.value;
      if (!a) return null;
      if (!W.value && Fe.value) {
        const t = Fe.value, d = Ee.value || t.params;
        if (t.type === "create_bookmark_folder" || t.type === "move_bookmark" || d.scope === "bookmarks") {
          const f = d.targetFolder || d.sourceFolder || d.folderName;
          if (f) {
            const F = Array.from(a.querySelectorAll("[data-peek-bm-folder]")).find((x) => x.dataset.peekBmFolder === f || x.dataset.peekBmId === f);
            if (F) return F;
          }
          if (d.bookmarkId) {
            const F = Array.from(a.querySelectorAll("[data-peek-bm-item]")).find((x) => x.dataset.peekBmItem === d.bookmarkId);
            if (F) return F;
          }
          return a.querySelector('[data-peek-target="org-bookmarks"]');
        }
        if (t.type === "create_partition") {
          const f = d.partitionName;
          if (f) {
            const F = Array.from(a.querySelectorAll("[data-peek-part]")).find((x) => x.dataset.peekPart === f || x.dataset.peekPartLabel === f);
            if (F) return F;
          }
          return a.querySelector('[data-peek-target="org-partitions"]');
        }
        const C = d.targetFolder || d.folderName;
        if (C) {
          const f = Array.from(a.querySelectorAll("[data-peek-folder]")).find((x) => x.dataset.peekFolder === C);
          if (f) return f;
          const F = d.parentFolderName || de.value?.folders.find((x) => x.name === C)?.parent;
          if (F) {
            const x = Array.from(a.querySelectorAll("[data-peek-folder]")).find((ce) => ce.dataset.peekFolder === F);
            if (x) return x;
          }
        }
        const z = d.linkId || d.bookmarkUrl;
        if (z) {
          const f = Array.from(a.querySelectorAll("[data-peek-link]")).find((F) => F.dataset.peekLink === z);
          if (f) return f;
        }
        return a.querySelector('[data-peek-target="org-folders"]');
      }
      const r = y.value?.cursorTarget;
      return r && r !== "org-approval" ? a.querySelector(`[data-peek-target="${r}"]`) : a.querySelector('[data-peek-target="org-folders"]') || a.querySelector('[data-peek-target="org-partitions"]');
    }
    async function gt() {
      await At(), Ie();
      const a = m.value;
      if (!a || !ee.value && !W.value) {
        L.value.visible = !1;
        return;
      }
      const r = a.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      const t = Kt();
      if (!t) {
        L.value = {
          x: Math.round(r.width * 0.42),
          y: Math.round(r.height * 0.36),
          visible: !!Qe.value
        };
        return;
      }
      const d = t.getBoundingClientRect(), C = Math.max(18, Math.min(r.width - 170, d.left - r.left + Math.min(d.width * 0.48, 72))), z = Math.max(46, Math.min(r.height - 42, d.top - r.top + Math.min(d.height * 0.52, 42)));
      L.value = { x: Math.round(C), y: Math.round(z), visible: !0 }, Q.value++;
    }
    fe(
      [
        de,
        me,
        k,
        S,
        i,
        M,
        se,
        W,
        () => y.value?.cursorTarget,
        () => y.value?.cursorLabel
      ],
      () => {
        gt();
      },
      { immediate: !0 }
    );
    function et(a) {
      M.value = a.id;
      let r = a.params;
      try {
        r = Ne(a, se.value);
      } catch {
      }
      if (a.type === "create_bookmark_folder" || a.type === "move_bookmark" || r.scope === "bookmarks") {
        i.value = "bookmarks";
        const d = r.targetFolder || r.sourceFolder || r.folderName || r.parentBookmarkId || ee.value?.bookmarks.find((C) => C.id === r.bookmarkId)?.parentId;
        if (d) {
          const C = Ye(d);
          C && G.value !== C && p(C);
        }
        return;
      }
      i.value = "desktop";
      const t = r.partitionName || r.targetPartition || ee.value?.folders.find((d) => d.name === (r.targetFolder || r.sourceFolder))?.page || ee.value?.links.find((d) => d.id === r.linkId)?.page;
      if (t) {
        const d = te.value.partitions.find(
          (C) => C.id === t || C.label.toLowerCase() === t.toLowerCase()
        );
        d && B.value !== d.id && Be(d.id);
      }
    }
    function Jt(a) {
      if (["pending", "error"].includes(a.status)) {
        if (oe.value === a.id) {
          oe.value = "";
          return;
        }
        oe.value = a.id, w.value = a.params.folderName || a.params.partitionName || "", _.value = a.params.folderSize === "large" ? "large" : "small";
      }
    }
    async function yt(a) {
      if (!(!$.value?.id || R.value || P.value || W.value || !["pending", "error"].includes(a.status))) {
        R.value = a.id, V.value = "", ne.value = "";
        try {
          const r = oe.value === a.id ? {
            ...a.type === "create_partition" ? { partitionName: w.value } : {},
            ...a.type === "create_launcher_folder" || a.type === "create_bookmark_folder" ? { folderName: w.value } : {},
            ...a.type === "create_launcher_folder" ? { folderSize: _.value } : {}
          } : void 0, t = await pe(
            typeof chrome > "u" ? null : chrome.runtime,
            "apply-plan-step",
            {
              runId: $.value.id,
              stepId: a.id,
              ...r ? { patch: r } : {}
            }
          );
          E.value = t.run, oe.value = "", ne.value = t?.note || `已生效：${a.title}`, b("updated");
        } catch (r) {
          V.value = r instanceof Error ? r.message : "执行步骤失败。", await tt();
        } finally {
          R.value = "";
        }
      }
    }
    async function Wt(a) {
      if (!(!$.value?.id || R.value || P.value || W.value || !["pending", "error", "skipped"].includes(a.status))) {
        R.value = a.id, V.value = "";
        try {
          const r = await pe(
            typeof chrome > "u" ? null : chrome.runtime,
            "skip-plan-step",
            { runId: $.value.id, stepId: a.id }
          );
          E.value = r.run, oe.value === a.id && (oe.value = ""), ne.value = r.note, b("updated");
        } catch (r) {
          V.value = r instanceof Error ? r.message : "更新状态失败。";
        } finally {
          R.value = "";
        }
      }
    }
    async function bt() {
      if (!$.value?.id || P.value || R.value || W.value || ze.value || oe.value) return;
      if (!U.value) {
        U.value = !0;
        return;
      }
      U.value = !1;
      const a = $.value.id, r = ve.value.filter((d) => d.status === "pending" || d.status === "error");
      if (!r.length) return;
      P.value = !0, V.value = "", ne.value = "";
      let t = 0;
      try {
        for (const d of r) {
          R.value = d.id, et(d);
          try {
            const C = await pe(
              typeof chrome > "u" ? null : chrome.runtime,
              "apply-plan-step",
              { runId: a, stepId: d.id }
            );
            E.value = C.run, t++;
          } catch (C) {
            V.value = `已生效 ${t} 步，第 #${d.order} 步停止：${C instanceof Error ? C.message : "失败"}`, await tt();
            break;
          }
        }
        b("updated"), t > 0 && !V.value && (ne.value = `已依次生效全部 ${t} 步，新标签页与书签已同步更新！`);
      } finally {
        R.value = "", P.value = !1;
      }
    }
    async function tt() {
      try {
        const r = (await pe(chrome.runtime, "list", {})).runs.find((t) => t.id === $.value?.id);
        r && (E.value = r);
      } catch {
      }
      b("updated");
    }
    async function Ht(a) {
      if (!(!$.value || R.value || P.value || W.value)) {
        R.value = a.id, V.value = "";
        try {
          const r = await pe(
            chrome.runtime,
            "undo-plan-step",
            { runId: $.value.id, stepId: a.id }
          );
          E.value = r.run, ne.value = r.note, b("updated");
        } catch (r) {
          V.value = r instanceof Error ? r.message : "撤销失败。", await tt();
        } finally {
          R.value = "";
        }
      }
    }
    function ht(a) {
      K.value && !a.composedPath().includes(K.value) && !R.value && !P.value && b("close");
    }
    function _t(a) {
      a.key === "Escape" && !R.value && !P.value && b("close");
    }
    async function wt() {
      if (!(typeof chrome > "u" || !chrome.storage?.local))
        try {
          const r = (await chrome.storage.local.get(_e))?.[_e];
          r && r.employeeId === u.employeeId && r.mode === "organizer" && (y.value = r);
        } catch {
        }
    }
    function $t(a, r) {
      if (r === "local" && a[_e]?.newValue) {
        const t = a[_e].newValue;
        t.employeeId === u.employeeId && t.mode === "organizer" && (y.value = t);
      }
    }
    return ct(() => {
      document.addEventListener("pointerdown", ht), document.addEventListener("keydown", _t), window.addEventListener("resize", Ie), wt(), typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener($t), re = setInterval(() => {
        u.running && !document.hidden && wt();
      }, 450);
    }), pt(() => {
      document.removeEventListener("pointerdown", ht), document.removeEventListener("keydown", _t), window.removeEventListener("resize", Ie), typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener($t), re && clearInterval(re);
    }), (a, r) => (n(), dt(eo, { to: "body" }, [
      e("section", {
        ref_key: "panelRef",
        ref: K,
        class: "org-modal",
        style: st(he(D)),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": `${v.employeeName} 预览与审批`
      }, [
        e("header", {
          ref_key: "headerRef",
          ref: q,
          class: "org-head",
          onPointerdown: r[3] || (r[3] = //@ts-ignore
          (...t) => he(Y) && he(Y)(...t))
        }, [
          e("div", ba, [
            e("span", {
              class: T(["org-dot", { live: W.value }])
            }, null, 2),
            e("div", null, [
              e("strong", null, c(v.employeeName) + " · 整理窥屏与逐条审批", 1),
              $.value?.planSummary ? (n(), l("small", ha, c($.value.planSummary), 1)) : (n(), l("small", _a, "只读生成建议：左侧实时预演整理效果，右侧每点击 1 步才真正写入那 1 步。"))
            ])
          ]),
          e("div", wa, [
            v.backendStale ? (n(), l("button", {
              key: 0,
              type: "button",
              class: "org-btn warn",
              onClick: r[0] || (r[0] = (t) => b("reloadExtension"))
            }, " 🔄 热重载扩展 ")) : g("", !0),
            e("button", {
              type: "button",
              class: "org-btn primary",
              disabled: W.value || !!R.value || P.value,
              onClick: r[1] || (r[1] = (t) => b("runNow", v.employeeId))
            }, c(W.value ? "盘点规划中…" : "↻ 重新盘点提案"), 9, $a),
            e("button", {
              type: "button",
              class: "org-btn subtle",
              disabled: !!R.value || P.value,
              "aria-label": "关闭审批窗",
              onClick: r[2] || (r[2] = (t) => b("close"))
            }, "✕", 8, Ia)
          ])
        ], 544),
        e("div", Fa, [
          e("div", {
            ref_key: "stageRef",
            ref: m,
            class: "org-stage"
          }, [
            e("div", Sa, [
              e("div", Ca, [
                e("button", {
                  type: "button",
                  role: "tab",
                  "data-peek-target": "org-partitions",
                  "aria-selected": i.value === "desktop",
                  class: T({ active: i.value === "desktop" }),
                  onClick: r[4] || (r[4] = (t) => i.value = "desktop")
                }, " 🖥️ 新标签页桌面 ", 10, xa),
                e("button", {
                  type: "button",
                  role: "tab",
                  "data-peek-target": "org-bookmarks",
                  "aria-selected": i.value === "bookmarks",
                  class: T({ active: i.value === "bookmarks" }),
                  onClick: r[5] || (r[5] = (t) => i.value = "bookmarks")
                }, " 🔖 浏览器书签树 ", 10, Ea)
              ]),
              e("span", {
                class: "org-flow-hint",
                "data-mode": I.value === "step" ? "step" : "flow"
              }, [...r[15] || (r[15] = [
                e("i", {
                  class: "hint-dash",
                  "aria-hidden": "true"
                }, null, -1),
                e("span", null, "虚线指向待归入文件夹 · 点击文件夹可在下方展开", -1)
              ])], 8, La)
            ]),
            e("div", {
              class: "stage-scroll",
              onScroll: r[10] || (r[10] = (t) => {
                gt();
              })
            }, [
              (n(!0), l(O, null, H(te.value.warnings, (t) => (n(), l("p", {
                key: t,
                class: "step-toast err"
              }, c(t), 1))), 128)),
              ee.value ? i.value === "desktop" ? (n(), l("div", za, [
                e("div", Ba, [
                  (n(!0), l(O, null, H(te.value.partitions, (t) => (n(), l("button", {
                    key: t.id,
                    type: "button",
                    class: T(["part-tab", { active: de.value?.id === t.id, isNew: t.badge === "new", isApplied: t.badge === "applied" }]),
                    "data-peek-part": t.id,
                    "data-peek-part-label": t.label,
                    onClick: (d) => Be(t.id)
                  }, [
                    e("span", null, c(t.label), 1),
                    t.badge === "new" ? (n(), l("em", Ta, "+待建")) : t.badge === "applied" ? (n(), l("em", Ra, "✓已生效")) : g("", !0)
                  ], 10, Pa))), 128))
                ]),
                de.value ? (n(), l("div", Aa, [
                  e("div", {
                    ref_key: "gridWrapRef",
                    ref: Z,
                    class: "grid-stage-wrap"
                  }, [
                    Re.value.length || we.value.length ? (n(), l("div", Va, [
                      (n(!0), l(O, null, H(Re.value, (t) => (n(), l("div", {
                        key: t.name,
                        class: T(["launcher-folder", [
                          `size-${t.size}`,
                          t.badge ? `peek-${t.badge}` : "",
                          Xe(t.name) ? "peek-focus" : "",
                          k.value === t.name ? "is-open" : ""
                        ]]),
                        "data-peek-folder": t.name,
                        title: `${t.name}（${t.size === "large" ? "大文件夹" : "小文件夹"}，点击在下方展开）`,
                        role: "button",
                        tabindex: "0",
                        onClick: (d) => Oe(t.name),
                        onKeydown: qe(Ce((d) => Oe(t.name), ["prevent"]), ["enter"])
                      }, [
                        ge(be, {
                          folder: Ve(t),
                          size: t.size
                        }, {
                          default: ye(() => [
                            t.badge ? (n(), l("span", {
                              key: 0,
                              class: T(["peek-corner-badge", t.badge])
                            }, c(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : g("", !0)
                          ]),
                          _: 2
                        }, 1032, ["folder", "size"])
                      ], 42, Oa))), 128)),
                      (n(!0), l(O, null, H(we.value, (t) => (n(), l("a", {
                        href: he(Je)(t.url) || void 0,
                        target: "_blank",
                        rel: "noreferrer",
                        key: t.id,
                        class: T(["launcher-link", [
                          t.pendingTargetFolder ? "peek-moving-out" : t.badge ? `peek-${t.badge}` : "",
                          Ze(t.id, t.url) ? "peek-focus" : ""
                        ]]),
                        "data-peek-link": t.id,
                        title: t.pendingTargetFolder ? `${t.title} → 待移入「${t.pendingTargetFolder}」
${t.url}` : `${t.title}
${t.url}`
                      }, [
                        ge(be, { link: t }, {
                          default: ye(() => [
                            t.pendingTargetFolder ? (n(), l("span", ja, " → " + c(t.pendingTargetFolder), 1)) : t.badge ? (n(), l("span", {
                              key: 1,
                              class: T(["peek-corner-badge", t.badge])
                            }, c(A(t.badge)), 3)) : g("", !0)
                          ]),
                          _: 2
                        }, 1032, ["link"])
                      ], 10, Ua))), 128))
                    ])) : (n(), l("p", Da, " 该分区目前为空，可审批新建文件夹或移入网站。 ")),
                    j.value.length ? (n(), l("svg", Ga, [
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
                      (n(!0), l(O, null, H(j.value, (t) => (n(), l("g", {
                        key: t.id,
                        class: T({ focused: t.focused })
                      }, [
                        e("path", {
                          d: t.path,
                          class: "org-flow-halo"
                        }, null, 8, qa),
                        e("path", {
                          d: t.path,
                          class: "org-flow-path",
                          "marker-end": t.focused ? "url(#org-flow-arrow-focus)" : "url(#org-flow-arrow)"
                        }, null, 8, Ka),
                        e("circle", {
                          cx: t.sx,
                          cy: t.sy,
                          r: "2.8",
                          class: "org-flow-dot"
                        }, null, 8, Ja)
                      ], 2))), 128))
                    ])) : g("", !0)
                  ], 512),
                  ue.value ? (n(), l("section", Wa, [
                    e("header", Ha, [
                      e("div", Ya, [
                        ue.value.parent ? (n(), l("button", {
                          key: 0,
                          type: "button",
                          class: "org-folder-icon-btn back",
                          title: `返回上一级：${ue.value.parent}`,
                          onClick: r[7] || (r[7] = (t) => k.value = ue.value.parent)
                        }, " ‹ ", 8, Qa)) : g("", !0),
                        e("h3", null, c(ue.value.name), 1),
                        ue.value.badge === "new" ? (n(), l("span", Xa, "+待建")) : ue.value.badge === "applied" ? (n(), l("span", Za, "✓已建")) : g("", !0)
                      ]),
                      e("div", en, [
                        r[20] || (r[20] = e("span", {
                          class: "org-folder-icon-btn plus",
                          "aria-hidden": "true"
                        }, "+", -1)),
                        e("button", {
                          type: "button",
                          class: "org-folder-icon-btn close",
                          title: "关闭文件夹",
                          "aria-label": "关闭文件夹",
                          onClick: r[8] || (r[8] = (t) => k.value = "")
                        }, " × ")
                      ])
                    ]),
                    e("div", tn, [
                      Ae.value.length || ue.value.links.length ? (n(), l("div", on, [
                        (n(!0), l(O, null, H(Ae.value, (t) => (n(), l("div", {
                          key: t.name,
                          class: T(["launcher-folder", [`size-${t.size}`, t.badge ? `peek-${t.badge}` : "", Xe(t.name) ? "peek-focus" : ""]]),
                          "data-peek-folder": t.name,
                          role: "button",
                          tabindex: "0",
                          onClick: (d) => k.value = t.name,
                          onKeydown: qe(Ce((d) => k.value = t.name, ["prevent"]), ["enter"])
                        }, [
                          ge(be, {
                            folder: Ve(t),
                            size: t.size
                          }, {
                            default: ye(() => [
                              t.badge ? (n(), l("span", {
                                key: 0,
                                class: T(["peek-corner-badge", t.badge])
                              }, c(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : g("", !0)
                            ]),
                            _: 2
                          }, 1032, ["folder", "size"])
                        ], 42, an))), 128)),
                        (n(!0), l(O, null, H(ue.value.links, (t) => (n(), l("a", {
                          href: he(Je)(t.url) || void 0,
                          target: "_blank",
                          rel: "noreferrer",
                          key: t.id,
                          class: T(["launcher-link", [t.badge ? `peek-${t.badge}` : "", Ze(t.id, t.url) ? "peek-focus" : ""]]),
                          title: `${t.title}
${t.url}`
                        }, [
                          ge(be, { link: t }, {
                            default: ye(() => [
                              t.badge ? (n(), l("span", {
                                key: 0,
                                class: T(["peek-corner-badge", t.badge])
                              }, c(A(t.badge)), 3)) : g("", !0)
                            ]),
                            _: 2
                          }, 1032, ["link"])
                        ], 10, nn))), 128))
                      ])) : (n(), l("p", ln, "暂无网站，审批移入后将在此处显示"))
                    ])
                  ])) : g("", !0)
                ])) : g("", !0)
              ])) : (n(), l("div", rn, [
                e("div", sn, [
                  (n(!0), l(O, null, H($e.value, (t) => (n(), l("button", {
                    key: t.id,
                    type: "button",
                    class: T(["part-tab", { active: me.value?.id === t.id, isNew: t.badge === "new", isApplied: t.badge === "applied" }]),
                    "data-peek-bm-folder": t.title,
                    "data-peek-bm-id": t.id,
                    onClick: (d) => p(t.id)
                  }, [
                    e("span", null, c(t.title), 1),
                    t.badge === "new" ? (n(), l("em", un, "+待建")) : t.badge === "applied" ? (n(), l("em", cn, "✓已生效")) : g("", !0)
                  ], 10, dn))), 128))
                ]),
                me.value ? (n(), l("div", pn, [
                  e("div", {
                    ref_key: "gridWrapRef",
                    ref: Z,
                    class: "grid-stage-wrap"
                  }, [
                    Ue.value.length || xe.value.length ? (n(), l("div", vn, [
                      (n(!0), l(O, null, H(Ue.value, (t) => (n(), l("div", {
                        key: t.id,
                        class: T(["launcher-folder size-small", [
                          t.badge ? `peek-${t.badge}` : "",
                          kt(t.id, t.title) ? "peek-focus" : "",
                          S.value === t.id ? "is-open" : ""
                        ]]),
                        "data-peek-bm-folder": t.title,
                        "data-peek-bm-id": t.id,
                        title: `${t.path || t.title}（点击在下方展开文件夹）`,
                        role: "button",
                        tabindex: "0",
                        onClick: (d) => o(t.id),
                        onKeydown: qe(Ce((d) => o(t.id), ["prevent"]), ["enter"])
                      }, [
                        ge(be, {
                          folder: je(t),
                          size: "small"
                        }, {
                          default: ye(() => [
                            t.badge ? (n(), l("span", {
                              key: 0,
                              class: T(["peek-corner-badge", t.badge])
                            }, c(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : g("", !0)
                          ]),
                          _: 2
                        }, 1032, ["folder"])
                      ], 42, mn))), 128)),
                      (n(!0), l(O, null, H(xe.value, (t) => (n(), l("a", {
                        href: he(Je)(t.url) || void 0,
                        target: "_blank",
                        rel: "noreferrer",
                        key: t.id,
                        class: T(["launcher-link", [
                          t.pendingTargetFolder ? "peek-moving-out" : t.badge ? `peek-${t.badge}` : "",
                          ft(t.id) ? "peek-focus" : ""
                        ]]),
                        "data-peek-bm-item": t.id,
                        title: t.pendingTargetFolder ? `${t.title} → 待移入「${t.pendingTargetFolder}」
${t.url}` : `${t.title}
${t.url}`
                      }, [
                        ge(be, { link: t }, {
                          default: ye(() => [
                            t.pendingTargetFolder ? (n(), l("span", fn, " → " + c(t.pendingTargetFolder), 1)) : t.badge ? (n(), l("span", {
                              key: 1,
                              class: T(["peek-corner-badge", t.badge])
                            }, c(t.badge === "applied" ? "✓" : "移入"), 3)) : g("", !0)
                          ]),
                          _: 2
                        }, 1032, ["link"])
                      ], 10, kn))), 128))
                    ])) : (n(), l("p", gn, " 该书签栏板块下暂无目录或书签。 ")),
                    j.value.length ? (n(), l("svg", yn, [
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
                      (n(!0), l(O, null, H(j.value, (t) => (n(), l("g", {
                        key: t.id,
                        class: T({ focused: t.focused })
                      }, [
                        e("path", {
                          d: t.path,
                          class: "org-flow-halo"
                        }, null, 8, bn),
                        e("path", {
                          d: t.path,
                          class: "org-flow-path",
                          "marker-end": t.focused ? "url(#org-bm-flow-arrow-focus)" : "url(#org-bm-flow-arrow)"
                        }, null, 8, hn),
                        e("circle", {
                          cx: t.sx,
                          cy: t.sy,
                          r: "2.8",
                          class: "org-flow-dot"
                        }, null, 8, _n)
                      ], 2))), 128))
                    ])) : g("", !0)
                  ], 512),
                  ie.value ? (n(), l("section", wn, [
                    e("header", $n, [
                      e("div", In, [
                        ie.value.parentId && ie.value.parentId !== me.value.id && ie.value.parentId !== "0" ? (n(), l("button", {
                          key: 0,
                          type: "button",
                          class: "org-folder-icon-btn back",
                          title: "返回上一级文件夹",
                          onClick: s
                        }, " ‹ ")) : g("", !0),
                        e("h3", null, c(ie.value.title), 1),
                        ie.value.badge === "new" ? (n(), l("span", Fn, "+待建")) : ie.value.badge === "applied" ? (n(), l("span", Sn, "✓已建")) : g("", !0)
                      ]),
                      e("div", Cn, [
                        r[22] || (r[22] = e("span", {
                          class: "org-folder-icon-btn plus",
                          "aria-hidden": "true"
                        }, "+", -1)),
                        e("button", {
                          type: "button",
                          class: "org-folder-icon-btn close",
                          title: "关闭文件夹",
                          "aria-label": "关闭文件夹",
                          onClick: r[9] || (r[9] = (t) => S.value = "")
                        }, " × ")
                      ])
                    ]),
                    e("div", xn, [
                      Pe.value.length || ie.value.items.length ? (n(), l("div", En, [
                        (n(!0), l(O, null, H(Pe.value, (t) => (n(), l("div", {
                          key: t.id,
                          class: T(["launcher-folder size-small", [t.badge ? `peek-${t.badge}` : "", kt(t.id, t.title) ? "peek-focus" : ""]]),
                          "data-peek-bm-folder": t.title,
                          "data-peek-bm-id": t.id,
                          role: "button",
                          tabindex: "0",
                          onClick: (d) => S.value = t.id,
                          onKeydown: qe(Ce((d) => S.value = t.id, ["prevent"]), ["enter"])
                        }, [
                          ge(be, {
                            folder: je(t),
                            size: "small"
                          }, {
                            default: ye(() => [
                              t.badge ? (n(), l("span", {
                                key: 0,
                                class: T(["peek-corner-badge", t.badge])
                              }, c(t.badge === "applied" ? "✓已建" : "+待建"), 3)) : g("", !0)
                            ]),
                            _: 2
                          }, 1032, ["folder"])
                        ], 42, Ln))), 128)),
                        (n(!0), l(O, null, H(ie.value.items, (t) => (n(), l("a", {
                          href: he(Je)(t.url) || void 0,
                          target: "_blank",
                          rel: "noreferrer",
                          key: t.id,
                          class: T(["launcher-link", [t.badge ? `peek-${t.badge}` : "", ft(t.id) ? "peek-focus" : ""]]),
                          title: `${t.title}
${t.url}`
                        }, [
                          ge(be, { link: t }, {
                            default: ye(() => [
                              t.badge ? (n(), l("span", {
                                key: 0,
                                class: T(["peek-corner-badge", t.badge])
                              }, c(t.badge === "applied" ? "✓" : "移入"), 3)) : g("", !0)
                            ]),
                            _: 2
                          }, 1032, ["link"])
                        ], 10, Mn))), 128))
                      ])) : (n(), l("p", Nn, "暂无书签，审批移入后将在此处显示"))
                    ])
                  ])) : g("", !0)
                ])) : g("", !0)
              ])) : (n(), l("div", Ma, [
                r[16] || (r[16] = e("div", { class: "empty-icon" }, "🧭", -1)),
                r[17] || (r[17] = e("h4", null, "准备就绪 · 点击右上角开始盘点", -1)),
                r[18] || (r[18] = e("p", null, "专员会只读读取你的桌面分区、大/小文件夹、常用网站与浏览器书签树，并在右侧生成类似 Todoist 的待审批列表。", -1)),
                e("button", {
                  type: "button",
                  class: "org-btn primary",
                  disabled: W.value,
                  onClick: r[6] || (r[6] = (t) => b("runNow", v.employeeId))
                }, c(W.value ? "盘点中…" : "▶ 开始生成整理提案"), 9, Na)
              ]))
            ], 32),
            L.value.visible && Qe.value ? (n(), l("div", {
              key: 0,
              class: "peek-cursor",
              style: st({ transform: `translate3d(${L.value.x}px, ${L.value.y}px, 0)` })
            }, [
              (n(), l("span", {
                key: Q.value,
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
              e("span", zn, c(Qe.value), 1)
            ], 4)) : g("", !0)
          ], 512),
          e("aside", Bn, [
            e("div", Pn, [
              e("div", null, [
                r[24] || (r[24] = e("strong", null, "整理待办清单", -1)),
                e("small", null, "点击圆圈才生效 · 待批 " + c(De.value) + " · 已生效 " + c(Gt.value), 1)
              ]),
              De.value > 0 && !W.value ? (n(), l("button", {
                key: 0,
                type: "button",
                class: "apply-all-btn",
                disabled: P.value || !!R.value || ze.value || !!oe.value,
                onClick: bt
              }, c(P.value ? "执行中…" : `全部生效 (${De.value})`), 9, Tn)) : g("", !0)
            ]),
            U.value ? (n(), l("div", Rn, [
              e("span", null, "将按顺序执行剩余 " + c(De.value) + " 步（已跳过项不执行）。", 1),
              e("div", An, [
                e("button", {
                  type: "button",
                  class: "org-btn primary",
                  onClick: bt
                }, "确认全部生效"),
                e("button", {
                  type: "button",
                  class: "org-btn subtle",
                  onClick: r[11] || (r[11] = (t) => U.value = !1)
                }, "取消")
              ])
            ])) : g("", !0),
            v.generationError ? (n(), l("p", Vn, "提案生成失败：" + c(v.generationError), 1)) : g("", !0),
            ne.value ? (n(), l("p", On, c(ne.value), 1)) : g("", !0),
            V.value ? (n(), l("p", Un, c(V.value), 1)) : g("", !0),
            W.value && mt.value.length ? (n(), l("div", jn, [
              (n(!0), l(O, null, H(mt.value, (t, d) => (n(), l("div", {
                key: d,
                class: "live-step-row"
              }, [
                r[25] || (r[25] = e("span", { class: "live-dot" }, null, -1)),
                e("span", null, c(t), 1)
              ]))), 128))
            ])) : g("", !0),
            ve.value.length ? (n(), l("div", Dn, [
              (n(!0), l(O, null, H(se.value, (t) => (n(), l("article", {
                key: t.id,
                class: T(["todo-item", [t.status, { active: M.value === t.id }]]),
                onMouseenter: (d) => et(t),
                onMouseleave: r[14] || (r[14] = (d) => M.value = void 0)
              }, [
                e("button", {
                  type: "button",
                  class: "todo-check",
                  disabled: !!R.value || P.value || W.value || !["pending", "error"].includes(t.status),
                  title: t.status === "applied" ? "已写入生效" : "点击立即生效这一步",
                  onClick: (d) => yt(t)
                }, [
                  R.value === t.id ? (n(), l("span", Kn, "…")) : t.status === "applied" ? (n(), l("span", Jn, "✓")) : g("", !0)
                ], 8, qn),
                e("div", {
                  class: "todo-main",
                  onClick: (d) => et(t)
                }, [
                  e("div", Hn, [
                    e("span", Yn, "#" + c(t.order), 1),
                    e("span", {
                      class: T(["type-tag", t.type])
                    }, c(qt(t)), 3),
                    t.status === "applied" ? (n(), l("span", Qn, "✓ 已生效")) : t.status === "skipped" ? (n(), l("span", Xn, "已跳过")) : t.status === "undone" ? (n(), l("span", Zn, "已撤销")) : t.status === "applying" || t.status === "undoing" ? (n(), l("span", el, "未完成")) : g("", !0)
                  ]),
                  e("div", tl, c(t.title), 1),
                  t.dependsOn?.length ? (n(), l("p", ol, " 前置步骤：" + c(t.dependsOn.map((d) => `#${ve.value.find((C) => C.id === d)?.order || "?"}`).join("、")), 1)) : g("", !0),
                  t.reason ? (n(), l("p", al, c(t.reason), 1)) : g("", !0),
                  t.errorMessage && !V.value.includes(t.errorMessage) ? (n(), l("p", nl, c(t.errorMessage), 1)) : g("", !0),
                  oe.value === t.id ? (n(), l("div", ll, [
                    X(e("input", {
                      "onUpdate:modelValue": r[12] || (r[12] = (d) => w.value = d),
                      type: "text",
                      maxlength: t.type === "create_partition" ? 12 : 20,
                      placeholder: "修改名称"
                    }, null, 8, il), [
                      [
                        le,
                        w.value,
                        void 0,
                        { trim: !0 }
                      ]
                    ]),
                    t.type === "create_launcher_folder" ? X((n(), l("select", {
                      key: 0,
                      "onUpdate:modelValue": r[13] || (r[13] = (d) => _.value = d)
                    }, [...r[26] || (r[26] = [
                      e("option", { value: "large" }, "大文件夹", -1),
                      e("option", { value: "small" }, "小文件夹", -1)
                    ])], 512)), [
                      [Le, _.value]
                    ]) : g("", !0)
                  ])) : g("", !0),
                  e("div", rl, [
                    t.status === "applied" && t.undo ? (n(), l("button", {
                      key: 0,
                      type: "button",
                      class: "op-btn subtle",
                      disabled: !!R.value || P.value || W.value,
                      onClick: (d) => Ht(t)
                    }, " ↶ 撤销此步 ", 8, sl)) : ["pending", "error", "skipped"].includes(t.status) ? (n(), l(O, { key: 1 }, [
                      e("button", {
                        type: "button",
                        class: "op-btn apply",
                        disabled: !!R.value || P.value || W.value || t.status === "skipped",
                        onClick: (d) => yt(t)
                      }, c(R.value === t.id ? "写入中…" : "点击生效"), 9, dl),
                      t.status !== "skipped" && (t.type === "create_partition" || t.type === "create_launcher_folder" || t.type === "create_bookmark_folder") ? (n(), l("button", {
                        key: 0,
                        type: "button",
                        class: "op-btn",
                        disabled: !!R.value || P.value || W.value,
                        onClick: (d) => Jt(t)
                      }, c(oe.value === t.id ? "完成编辑" : "改名/尺寸"), 9, ul)) : g("", !0),
                      e("button", {
                        type: "button",
                        class: "op-btn subtle",
                        disabled: !!R.value || P.value || W.value,
                        onClick: (d) => Wt(t)
                      }, c(t.status === "skipped" ? "恢复" : "跳过"), 9, cl)
                    ], 64)) : g("", !0)
                  ])
                ], 8, Wn)
              ], 42, Gn))), 128))
            ])) : W.value ? g("", !0) : (n(), l("div", pl, [...r[27] || (r[27] = [
              e("p", null, "暂无待审批建议", -1),
              e("small", null, "点右上角「↻ 重新盘点提案」生成整理步骤，或调整专员提示词后重试。", -1)
            ])]))
          ])
        ])
      ], 12, ya)
    ]));
  }
}), ml = /* @__PURE__ */ vt(vl, [["__scopeId", "data-v-5ba43bf6"]]), kl = {
  class: "emp-shell",
  "aria-label": "数字员工工作台"
}, fl = { class: "emp-header" }, gl = { class: "emp-title-group" }, yl = { class: "emp-stats-pill" }, bl = { class: "emp-head-actions" }, hl = { class: "emp-body" }, _l = { class: "emp-main" }, wl = {
  key: 0,
  class: "emp-banner stale",
  role: "alert"
}, $l = {
  key: 1,
  class: "emp-banner error",
  role: "alert"
}, Il = {
  key: 2,
  class: "emp-banner notice",
  role: "status"
}, Fl = {
  key: 3,
  class: "emp-empty"
}, Sl = {
  key: 4,
  class: "emp-empty"
}, Cl = {
  key: 5,
  class: "emp-grid"
}, xl = ["onClick"], El = { class: "emp-card-top" }, Ll = { class: "emp-card-name-wrap" }, Ml = ["title"], Nl = { class: "emp-card-role" }, zl = ["aria-checked", "aria-label", "title", "disabled", "onClick"], Bl = { class: "emp-card-desc" }, Pl = { class: "emp-card-chips" }, Tl = { class: "emp-chip sky" }, Rl = { class: "emp-chip indigo" }, Al = { class: "emp-chip neutral" }, Vl = { class: "emp-chip neutral" }, Ol = ["title"], Ul = { class: "emp-card-stat" }, jl = { key: 0 }, Dl = { key: 1 }, Gl = { class: "emp-card-btns" }, ql = ["disabled", "title", "onClick"], Kl = ["title", "onClick"], Jl = ["onClick"], Wl = ["onClick"], Hl = {
  key: 0,
  class: "emp-drawer",
  "aria-label": "编辑数字员工"
}, Yl = { class: "emp-drawer-head" }, Ql = { class: "emp-drawer-title-wrap" }, Xl = {
  class: "emp-drawer-tabs",
  role: "tablist"
}, Zl = { class: "emp-drawer-body" }, ei = { class: "emp-field" }, ti = { class: "emp-field" }, oi = { class: "emp-field" }, ai = { class: "emp-row-2" }, ni = { class: "emp-field" }, li = { class: "emp-field" }, ii = {
  key: 0,
  class: "emp-field"
}, ri = { class: "emp-label-inline" }, si = ["disabled"], di = ["value"], ui = {
  key: 1,
  class: "emp-row-2"
}, ci = { class: "emp-field" }, pi = { class: "emp-field" }, vi = {
  key: 2,
  class: "emp-field"
}, mi = { class: "emp-row-3" }, ki = { class: "emp-field" }, fi = { class: "emp-field" }, gi = {
  key: 0,
  class: "emp-field"
}, yi = { class: "emp-check-row" }, bi = { class: "emp-field" }, hi = {
  key: 0,
  class: "emp-field"
}, _i = { class: "emp-field" }, wi = { class: "emp-field" }, $i = { class: "emp-label-inline" }, Ii = { class: "emp-field" }, Fi = { class: "emp-field" }, Si = { class: "emp-check-row" }, Ci = { class: "emp-check-row" }, xi = { class: "emp-field" }, Ei = { class: "emp-skill-list" }, Li = ["checked", "onChange"], Mi = { class: "emp-field" }, Ni = { class: "emp-field" }, zi = { class: "emp-field" }, Bi = { class: "emp-field" }, Pi = { class: "emp-label-inline" }, Ti = {
  key: 0,
  class: "emp-sub-empty"
}, Ri = {
  key: 1,
  class: "emp-fb-list"
}, Ai = ["title"], Vi = { class: "emp-fb-cat" }, Oi = ["onClick"], Ui = { class: "emp-logs-head" }, ji = { key: 0 }, Di = { key: 1 }, Gi = {
  key: 0,
  class: "emp-sub-empty"
}, qi = {
  key: 1,
  class: "emp-run-list"
}, Ki = { class: "emp-run-top" }, Ji = { class: "emp-run-cat" }, Wi = { class: "emp-run-time" }, Hi = ["title"], Yi = { class: "emp-run-reason" }, Qi = {
  key: 0,
  class: "emp-run-trace"
}, Xi = { class: "emp-run-foot" }, Zi = { class: "emp-run-links" }, er = ["onClick"], tr = ["href"], or = {
  key: 0,
  class: "emp-run-fb-btns"
}, ar = ["onClick"], nr = ["onClick"], lr = { class: "emp-drawer-foot" }, ir = { class: "emp-drawer-foot-right" }, rr = ["disabled"], sr = /* @__PURE__ */ ut({
  __name: "EmployeesPanel",
  props: {
    active: { type: Boolean }
  },
  emits: ["openLibrary"],
  setup(v, { emit: h }) {
    const u = v, b = h, y = N([]), E = N([]), $ = N(!0), I = N(""), U = N(!1), K = N(""), q = N(""), D = N(!1), Y = N(null), m = N(!1), Z = N("runtime"), i = N(null), B = N(""), k = N(""), G = N([]), S = N(!1), M = N({ open: !1, mode: "live" }), R = N(""), P = N({ open: !1, employeeId: "", employeeName: "" }), ne = J(() => {
      if (!P.value.open || !P.value.employeeId) return null;
      if (P.value.runId) {
        const p = E.value.find((o) => o.id === P.value.runId);
        if (p) return p;
      }
      return E.value.find((p) => p.employeeId === P.value.employeeId && p.kind === "organizer") || null;
    });
    function V(p, o) {
      P.value.employeeId !== p.id && (R.value = ""), P.value = {
        open: !0,
        employeeId: p.id,
        employeeName: p.name,
        runId: o
      };
    }
    function oe(p) {
      if (p.source.kind === "workspace-organizer") {
        V(p);
        return;
      }
      M.value = {
        open: !0,
        mode: "live",
        employeeId: p.id,
        employeeName: p.name
      };
    }
    function w(p, o) {
      if (p.kind === "organizer") {
        V({ id: p.employeeId, name: o || "整理专员" }, p.id);
        return;
      }
      M.value = {
        open: !0,
        mode: "replay",
        employeeId: p.employeeId,
        employeeName: o,
        replayFrames: p.peekFrames || []
      };
    }
    const _ = J(() => it()), L = J(() => y.value.filter((p) => p.enabled).length), Q = J(
      () => E.value.filter((p) => p.status !== "error" && it(p.createdAt) === _.value).length
    );
    function re(p) {
      return E.value.filter((o) => o.employeeId === p);
    }
    function W(p) {
      let o = 0, s = 0;
      const A = _.value;
      for (const j of E.value)
        j.employeeId !== p || it(j.createdAt) !== A || (j.status === "analyzed" ? o++ : (j.status === "skipped-gate" || j.status === "skipped-no-sub") && s++);
      return { analyzed: o, skipped: s };
    }
    async function ee() {
      $.value = !0, q.value = "";
      try {
        const p = await pe(
          typeof chrome > "u" ? null : chrome.runtime,
          "list"
        );
        y.value = Array.isArray(p?.employees) ? p.employees : [], E.value = Array.isArray(p?.runs) ? p.runs : [], D.value = typeof chrome < "u" && p?.workerStamp !== lo;
      } catch (p) {
        q.value = p instanceof Error ? p.message : "读取数字员工失败。";
      } finally {
        $.value = !1;
      }
    }
    function ve() {
      typeof chrome < "u" && chrome.runtime?.reload && chrome.runtime.reload();
    }
    async function se() {
      if (!S.value) {
        S.value = !0;
        try {
          const p = await to.getCreatedFolders();
          G.value = (p || []).map((o) => ({
            id: String(o.id),
            title: String(o.title || "未命名收藏夹"),
            count: Number(o.media_count || 0)
          }));
        } catch {
          G.value = [];
        } finally {
          S.value = !1;
        }
      }
    }
    function te(p, o = "runtime") {
      i.value = JSON.parse(JSON.stringify(p)), B.value = p.decisionGate.categories.join(", "), k.value = p.decisionGate.skipCategories.join(", "), Z.value = o, m.value = !0, G.value.length || se();
    }
    function Te() {
      const p = Ut();
      p.id = `emp-org-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, p.name = `桌面书签整理员 #${y.value.filter((o) => o.source.kind === "workspace-organizer").length + 1}`, te(p, "runtime");
    }
    function ze() {
      const p = Ot();
      p.id = `emp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, p.name = `数字员工 #${y.value.length + 1}`, te(p, "runtime");
    }
    function de() {
      m.value = !1, i.value = null;
    }
    function Re(p) {
      if (!i.value) return;
      const o = i.value.skills.indexOf(p);
      o >= 0 ? i.value.skills.splice(o, 1) : i.value.skills.push(p);
    }
    function ue() {
      if (!i.value) return;
      const p = G.value.find((o) => o.id === i.value?.source.folderId);
      p && (i.value.source.folderTitle = p.title);
    }
    async function Ae() {
      if (!(!i.value || U.value)) {
        U.value = !0, q.value = "", K.value = "";
        try {
          const p = B.value.split(/[,，\n]+/).map((j) => j.trim()).filter(Boolean), o = k.value.split(/[,，\n]+/).map((j) => j.trim()).filter(Boolean);
          i.value.decisionGate.categories = p.length ? p : ["AI 与 Agent", "工程与效率", "行业洞察", "娱乐/低信息跳过"], i.value.decisionGate.skipCategories = o.filter((j) => i.value.decisionGate.categories.includes(j));
          const s = jt(i.value), A = await pe(
            typeof chrome > "u" ? null : chrome.runtime,
            "save",
            { employee: s }
          );
          i.value = JSON.parse(JSON.stringify(A)), K.value = `已保存员工「${A.name}」配置。`, await ee();
        } catch (p) {
          q.value = p instanceof Error ? p.message : "保存员工配置失败。";
        } finally {
          U.value = !1;
        }
      }
    }
    async function We(p) {
      if (!I.value) {
        I.value = p.id, q.value = "", K.value = "";
        try {
          const o = !p.enabled;
          await pe(typeof chrome > "u" ? null : chrome.runtime, "toggle", {
            id: p.id,
            enabled: o
          }), K.value = o ? `已开启「${p.name}」后台自动巡检。` : `已暂停「${p.name}」后台巡检。`, await ee();
        } catch (o) {
          q.value = o instanceof Error ? o.message : "切换状态失败。";
        } finally {
          I.value = "";
        }
      }
    }
    async function we(p) {
      if (I.value) return;
      const o = p.source.kind === "workspace-organizer";
      I.value = p.id, q.value = "", o && (R.value = ""), K.value = o ? `「${p.name}」正在盘点桌面网站与书签，生成待审批提案…` : `「${p.name}」正在抓取并分拣 1 条视频…`, o && V(p);
      try {
        const s = await pe(
          typeof chrome > "u" ? null : chrome.runtime,
          "run-one",
          { id: p.id, organizerConsent: !0 }
        );
        if (K.value = s?.message || "试跑完成。", await ee(), o && s?.record?.id && P.value.open && P.value.employeeId === p.id && V(p, s.record.id), m.value && i.value?.id === p.id) {
          const A = y.value.find((j) => j.id === p.id);
          A && (i.value = JSON.parse(JSON.stringify(A)));
        }
      } catch (s) {
        q.value = s instanceof Error ? s.message : "试跑执行失败。", o && (R.value = q.value), K.value = "", await ee();
      } finally {
        I.value = "";
      }
    }
    async function Ve(p) {
      if (window.confirm(`确定删除数字员工「${p.name}」及其运行记录吗？资料库已沉淀的文章不会被删除。`))
        try {
          await pe(typeof chrome > "u" ? null : chrome.runtime, "delete", { id: p.id }), i.value?.id === p.id && de(), K.value = `已删除员工「${p.name}」。`, await ee();
        } catch (o) {
          q.value = o instanceof Error ? o.message : "删除失败。";
        }
    }
    function Be(p) {
      const o = uo(p), s = new Blob([JSON.stringify(o, null, 2)], { type: "application/json;charset=utf-8" }), A = URL.createObjectURL(s), j = document.createElement("a"), ke = p.name.replace(/[^\w\u4e00-\u9fa5-]+/g, "_") || "employee";
      j.href = A, j.download = `${ke}.tab-agent.json`, document.body.appendChild(j), j.click(), document.body.removeChild(j), URL.revokeObjectURL(A), K.value = `已导出分享包「${ke}.tab-agent.json」（已自动脱敏私人收藏夹 ID 与反馈记忆）。`;
    }
    function Oe() {
      Y.value?.click();
    }
    function $e(p) {
      const o = p.target, s = o.files?.[0];
      if (!s) return;
      const A = new FileReader();
      A.onload = async (j) => {
        try {
          const ke = String(j.target?.result || ""), Ie = co(ke);
          await pe(typeof chrome > "u" ? null : chrome.runtime, "save", {
            employee: Ie
          }), await ee(), te(Ie, "runtime"), K.value = `已导入员工「${Ie.name}」，请确认数据源与模型后开启巡检。`;
        } catch (ke) {
          q.value = ke instanceof Error ? ke.message : "导入失败，请检查文件格式。";
        } finally {
          o.value = "";
        }
      }, A.readAsText(s);
    }
    async function me(p, o) {
      if (i.value)
        try {
          const s = await pe(
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
          i.value = JSON.parse(JSON.stringify(s)), K.value = o === "keep" ? "已记住：类似内容优先精读。" : "已记住：类似内容以后直接跳过。", await ee();
        } catch (s) {
          q.value = s instanceof Error ? s.message : "记录反馈失败。";
        }
    }
    function Ue(p) {
      i.value && (i.value.ownerFeedback = i.value.ownerFeedback.filter((o) => o.id !== p));
    }
    async function He(p) {
      try {
        await pe(typeof chrome > "u" ? null : chrome.runtime, "clear-history", { id: p }), await ee(), K.value = "已清空该员工的去重与运行历史。";
      } catch (o) {
        q.value = o instanceof Error ? o.message : "清空失败。";
      }
    }
    function Ye(p) {
      return p.source.kind === "workspace-organizer" ? "桌面网站 + 书签" : p.source.kind === "bili-history" ? "播放历史" : p.source.kind === "bili-fav" ? p.source.folderTitle || "指定收藏夹" : "稍后再看";
    }
    function xe(p) {
      const s = E.value.find((A) => A.employeeId === p && A.kind === "organizer")?.planSteps || [];
      return {
        pending: s.filter((A) => A.status === "pending").length,
        applied: s.filter((A) => A.status === "applied").length
      };
    }
    function je(p, o) {
      return o === "organizer" ? "整理提案" : p === "analyzed" ? "已精读" : p === "skipped-gate" ? "快筛跳过" : p === "skipped-no-sub" ? "无字幕" : "异常";
    }
    function ie(p) {
      return p ? new Date(p).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "尚未运行";
    }
    function Pe(p, o) {
      o === "local" && (p[ao] || p[no]) && ee();
    }
    return fe(
      () => u.active,
      (p) => {
        p && ee();
      }
    ), ct(() => {
      ee(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener && chrome.storage.onChanged.addListener(Pe);
    }), pt(() => {
      typeof chrome < "u" && chrome.storage?.onChanged?.removeListener && chrome.storage.onChanged.removeListener(Pe);
    }), (p, o) => (n(), l("section", kl, [
      e("header", fl, [
        e("div", gl, [
          o[37] || (o[37] = e("h2", null, "数字员工", -1)),
          e("span", yl, "巡检中 " + c(L.value) + " / " + c(y.value.length) + " · 今日处理 " + c(Q.value) + " 条", 1)
        ]),
        e("div", bl, [
          e("button", {
            type: "button",
            class: "emp-pill-btn subtle",
            onClick: Oe
          }, [...o[38] || (o[38] = [
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
            ref: Y,
            type: "file",
            accept: ".json",
            style: { display: "none" },
            onChange: $e
          }, null, 544),
          e("button", {
            type: "button",
            class: "emp-pill-btn subtle",
            onClick: Te
          }, [...o[39] || (o[39] = [
            e("span", null, "+ 桌面书签专员", -1)
          ])]),
          e("button", {
            type: "button",
            class: "emp-pill-btn primary",
            onClick: ze
          }, [...o[40] || (o[40] = [
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
      e("div", hl, [
        e("div", _l, [
          D.value ? (n(), l("div", wl, [
            o[41] || (o[41] = e("span", null, "检测到扩展后台服务脚本尚未更新（仅刷新了页面），实况窥屏与自动重试需重启后台服务后生效。", -1)),
            e("button", {
              type: "button",
              class: "emp-mini-btn",
              onClick: ve
            }, "🔄 立即热重载扩展")
          ])) : g("", !0),
          q.value ? (n(), l("p", $l, c(q.value), 1)) : g("", !0),
          K.value ? (n(), l("p", Il, c(K.value), 1)) : g("", !0),
          $.value && !y.value.length ? (n(), l("div", Fl, "正在加载数字员工…")) : y.value.length ? (n(), l("div", Cl, [
            (n(!0), l(O, null, H(y.value, (s) => (n(), l("article", {
              key: s.id,
              class: T(["emp-card", { active: m.value && i.value?.id === s.id, running: I.value === s.id }]),
              onClick: (A) => te(s, "runtime")
            }, [
              e("div", El, [
                e("div", Ll, [
                  e("h3", {
                    class: "emp-card-name",
                    title: s.name
                  }, c(s.name), 9, Ml),
                  e("span", Nl, c(s.role), 1)
                ]),
                e("button", {
                  type: "button",
                  class: T(["emp-switch", { on: s.enabled }]),
                  role: "switch",
                  "aria-checked": s.enabled,
                  "aria-label": `${s.name}后台巡检`,
                  title: s.enabled ? "已启用后台巡检（点击暂停）" : s.source.kind === "workspace-organizer" ? "开启后台巡检：按间隔将网站和书签样本交给配置的模型生成待审批提案" : "已暂停（点击开启后台自动巡检）",
                  disabled: I.value === s.id,
                  onClick: Ce((A) => We(s), ["stop"])
                }, [...o[44] || (o[44] = [
                  e("span", { class: "emp-switch-knob" }, null, -1)
                ])], 10, zl)
              ]),
              e("p", Bl, c(s.description || "按自定义规则与 Skills 自动分拣处理数据。"), 1),
              e("div", Pl, [
                e("span", Tl, c(Ye(s)), 1),
                e("span", Rl, c(s.runtime.decisionMode === "jev-http" ? "Jev 端点" : "快筛漏斗"), 1),
                e("span", Al, c(s.runtime.analyzer === "native-pi" ? "本机 Pi" : "DeepSeek"), 1),
                e("span", Vl, c(s.skills.length) + " Skills", 1)
              ]),
              s.lastError ? (n(), l("div", {
                key: 0,
                class: "emp-card-err",
                title: s.lastError
              }, "异常：" + c(s.lastError), 9, Ol)) : g("", !0),
              e("div", {
                class: "emp-card-foot",
                onClick: o[0] || (o[0] = Ce(() => {
                }, ["stop"]))
              }, [
                e("div", Ul, [
                  e("i", {
                    class: T(["emp-dot", { on: s.enabled, err: !!s.lastError }])
                  }, null, 2),
                  s.source.kind === "workspace-organizer" ? (n(), l("span", jl, " 提案 " + c(xe(s.id).pending) + " 待批 / " + c(xe(s.id).applied) + " 已生效 ", 1)) : (n(), l("span", Dl, "今日 " + c(W(s.id).analyzed) + " 精读 / " + c(W(s.id).skipped) + " 跳过", 1))
                ]),
                e("div", Gl, [
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn",
                    disabled: !!I.value,
                    title: s.source.kind === "workspace-organizer" ? "只读盘点桌面网站与书签并生成提案" : "立即抓取 1 条未处理视频试跑",
                    onClick: (A) => we(s)
                  }, c(I.value === s.id ? "运行中…" : s.source.kind === "workspace-organizer" ? "生成提案" : "试跑 1 条"), 9, ql),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: s.source.kind === "workspace-organizer" ? "打开整理预览与逐条审批清单" : "打开仿真实况窥屏窗口",
                    onClick: (A) => oe(s)
                  }, c(s.source.kind === "workspace-organizer" ? "预览审批" : "窥屏"), 9, Kl),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "导出脱敏员工包分享给别人",
                    onClick: (A) => Be(s)
                  }, "导出", 8, Jl),
                  e("button", {
                    type: "button",
                    class: "emp-mini-btn ghost",
                    title: "编辑配置与查看运行记录",
                    onClick: (A) => te(s, "runtime")
                  }, "配置", 8, Wl)
                ])
              ])
            ], 10, xl))), 128))
          ])) : (n(), l("div", Sl, [
            o[42] || (o[42] = e("h3", null, "还没有数字员工", -1)),
            o[43] || (o[43] = e("p", null, [
              Tt("创建一个驻留后台的员工，或导入他人分享的 "),
              e("code", null, ".tab-agent.json"),
              Tt(" 员工包。")
            ], -1)),
            e("button", {
              type: "button",
              class: "emp-pill-btn primary",
              onClick: ze
            }, "新建第一个员工")
          ]))
        ]),
        m.value && i.value ? (n(), l("aside", Hl, [
          e("header", Yl, [
            e("div", Ql, [
              e("h3", null, c(i.value.name || "未命名员工"), 1),
              e("small", null, "最近运行：" + c(ie(i.value.lastRunAt)), 1)
            ]),
            e("button", {
              type: "button",
              class: "emp-close-btn",
              "aria-label": "关闭抽屉",
              onClick: de
            }, "×")
          ]),
          e("nav", Xl, [
            e("button", {
              type: "button",
              class: T({ active: Z.value === "runtime" }),
              onClick: o[1] || (o[1] = (s) => Z.value = "runtime")
            }, "基础与来源", 2),
            e("button", {
              type: "button",
              class: T({ active: Z.value === "skills" }),
              onClick: o[2] || (o[2] = (s) => Z.value = "skills")
            }, "Jev 与 Skills", 2),
            e("button", {
              type: "button",
              class: T({ active: Z.value === "prompts" }),
              onClick: o[3] || (o[3] = (s) => Z.value = "prompts")
            }, "提示词与记忆", 2),
            e("button", {
              type: "button",
              class: T({ active: Z.value === "logs" }),
              onClick: o[4] || (o[4] = (s) => Z.value = "logs")
            }, "运行记录 (" + c(re(i.value.id).length) + ")", 3)
          ]),
          e("div", Zl, [
            Z.value === "runtime" ? (n(), l(O, { key: 0 }, [
              e("div", ei, [
                o[45] || (o[45] = e("label", null, "员工名称", -1)),
                X(e("input", {
                  "onUpdate:modelValue": o[5] || (o[5] = (s) => i.value.name = s),
                  type: "text",
                  maxlength: "48",
                  placeholder: "例如：B站分拣研究员"
                }, null, 512), [
                  [le, i.value.name]
                ])
              ]),
              e("div", ti, [
                o[46] || (o[46] = e("label", null, "定位标签", -1)),
                X(e("input", {
                  "onUpdate:modelValue": o[6] || (o[6] = (s) => i.value.role = s),
                  type: "text",
                  maxlength: "64",
                  placeholder: "例如：后台静默分拣 · 精读沉淀"
                }, null, 512), [
                  [le, i.value.role]
                ])
              ]),
              e("div", oi, [
                o[47] || (o[47] = e("label", null, "职责简述", -1)),
                X(e("textarea", {
                  "onUpdate:modelValue": o[7] || (o[7] = (s) => i.value.description = s),
                  rows: "2",
                  maxlength: "240"
                }, null, 512), [
                  [le, i.value.description]
                ])
              ]),
              e("div", ai, [
                e("div", ni, [
                  o[49] || (o[49] = e("label", null, "工作数据源", -1)),
                  X(e("select", {
                    "onUpdate:modelValue": o[8] || (o[8] = (s) => i.value.source.kind = s)
                  }, [...o[48] || (o[48] = [
                    e("option", { value: "workspace-organizer" }, "桌面网站 + 浏览器书签（整理审批）", -1),
                    e("option", { value: "bili-toview" }, "稍后再看", -1),
                    e("option", { value: "bili-fav" }, "指定 B 站收藏夹", -1),
                    e("option", { value: "bili-history" }, "播放历史", -1)
                  ])], 512), [
                    [Le, i.value.source.kind]
                  ])
                ]),
                e("div", li, [
                  o[51] || (o[51] = e("label", null, "精读分析引擎", -1)),
                  X(e("select", {
                    "onUpdate:modelValue": o[9] || (o[9] = (s) => i.value.runtime.analyzer = s)
                  }, [...o[50] || (o[50] = [
                    e("option", { value: "deepseek" }, "DeepSeek API", -1),
                    e("option", { value: "native-pi" }, "本机 Pi Agent", -1)
                  ])], 512), [
                    [Le, i.value.runtime.analyzer]
                  ])
                ])
              ]),
              i.value.source.kind === "bili-fav" ? (n(), l("div", ii, [
                e("div", ri, [
                  o[52] || (o[52] = e("label", null, "选择收藏夹（导出分享时自动脱敏）", -1)),
                  e("button", {
                    type: "button",
                    class: "emp-link-btn",
                    disabled: S.value,
                    onClick: se
                  }, c(S.value ? "读取中…" : "刷新收藏夹"), 9, si)
                ]),
                X(e("select", {
                  "onUpdate:modelValue": o[10] || (o[10] = (s) => i.value.source.folderId = s),
                  onChange: ue
                }, [
                  o[53] || (o[53] = e("option", { value: "" }, "请选择收藏夹…", -1)),
                  (n(!0), l(O, null, H(G.value, (s) => (n(), l("option", {
                    key: s.id,
                    value: s.id
                  }, c(s.title) + " (" + c(s.count) + ")", 9, di))), 128))
                ], 544), [
                  [Le, i.value.source.folderId]
                ])
              ])) : g("", !0),
              i.value.runtime.analyzer === "native-pi" ? (n(), l("div", ui, [
                e("div", ci, [
                  o[54] || (o[54] = e("label", null, "指定 Pi 模型（留空跟随默认）", -1)),
                  X(e("input", {
                    "onUpdate:modelValue": o[11] || (o[11] = (s) => i.value.runtime.piModel = s),
                    type: "text",
                    placeholder: "如 openai-codex/gpt-6.1-sol"
                  }, null, 512), [
                    [le, i.value.runtime.piModel]
                  ])
                ]),
                e("div", pi, [
                  o[56] || (o[56] = e("label", null, "思考强度", -1)),
                  X(e("select", {
                    "onUpdate:modelValue": o[12] || (o[12] = (s) => i.value.runtime.piThinking = s)
                  }, [...o[55] || (o[55] = [
                    e("option", { value: "off" }, "关闭", -1),
                    e("option", { value: "low" }, "低", -1),
                    e("option", { value: "medium" }, "中", -1),
                    e("option", { value: "high" }, "高", -1)
                  ])], 512), [
                    [Le, i.value.runtime.piThinking]
                  ])
                ])
              ])) : g("", !0),
              i.value.source.kind === "workspace-organizer" ? (n(), l("p", vi, "整理专员采用「提案 preview + 右侧逐条点击生效」模式，不自动改动任何数据。")) : g("", !0),
              e("div", mi, [
                e("div", ki, [
                  o[57] || (o[57] = e("label", null, "巡检间隔 (分)", -1)),
                  X(e("input", {
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
                e("div", fi, [
                  e("label", null, c(i.value.source.kind === "workspace-organizer" ? "每日提案上限" : "每日上限 (条)"), 1),
                  X(e("input", {
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
                i.value.source.kind !== "workspace-organizer" ? (n(), l("div", gi, [
                  o[58] || (o[58] = e("label", null, "每次扫前 N 条", -1)),
                  X(e("input", {
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
                ])) : g("", !0)
              ]),
              e("label", yi, [
                X(e("input", {
                  "onUpdate:modelValue": o[16] || (o[16] = (s) => i.value.enabled = s),
                  type: "checkbox"
                }, null, 512), [
                  [lt, i.value.enabled]
                ]),
                e("span", null, c(i.value.source.kind === "workspace-organizer" ? "启用后台巡检（用配置的模型生成提案，审批后才修改）" : "启用后台自动巡检（每次仅温柔处理 1 条未读视频，不主动弹窗打扰）"), 1)
              ])
            ], 64)) : Z.value === "skills" ? (n(), l(O, { key: 1 }, [
              e("div", bi, [
                o[60] || (o[60] = e("label", null, "System 1 前置分拣引擎", -1)),
                X(e("select", {
                  "onUpdate:modelValue": o[17] || (o[17] = (s) => i.value.runtime.decisionMode = s)
                }, [...o[59] || (o[59] = [
                  e("option", { value: "llm-fast" }, "快速轻量判断（内置 JSON Noul · Score · Choice）", -1),
                  e("option", { value: "jev-http" }, "外部 Jev 决策模型端点（HTTP JSON API）", -1)
                ])], 512), [
                  [Le, i.value.runtime.decisionMode]
                ])
              ]),
              i.value.runtime.decisionMode === "jev-http" ? (n(), l("div", hi, [
                o[61] || (o[61] = e("label", null, "Jev HTTP 接口地址（支持本地 http://127.0.0.1:...）", -1)),
                X(e("input", {
                  "onUpdate:modelValue": o[18] || (o[18] = (s) => i.value.runtime.jevEndpoint = s),
                  type: "url",
                  placeholder: "http://127.0.0.1:8787/decide"
                }, null, 512), [
                  [le, i.value.runtime.jevEndpoint]
                ])
              ])) : g("", !0),
              e("div", _i, [
                o[62] || (o[62] = e("label", null, "价值是非判断问题（Noul）", -1)),
                X(e("textarea", {
                  "onUpdate:modelValue": o[19] || (o[19] = (s) => i.value.decisionGate.worthQuestion = s),
                  rows: "2"
                }, null, 512), [
                  [le, i.value.decisionGate.worthQuestion]
                ])
              ]),
              e("div", wi, [
                e("div", $i, [
                  e("label", null, "精读最低分阈值（Score ≥ " + c(i.value.decisionGate.minScore.toFixed(2)) + "）", 1)
                ]),
                X(e("input", {
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
              e("div", Ii, [
                o[63] || (o[63] = e("label", null, "分类标签选项（Choice，逗号隔开，同时作为资料库文章分类）", -1)),
                X(e("input", {
                  "onUpdate:modelValue": o[21] || (o[21] = (s) => B.value = s),
                  type: "text",
                  placeholder: "AI 与 Agent, 工程与效率, 行业洞察, 娱乐/低信息跳过"
                }, null, 512), [
                  [le, B.value]
                ])
              ]),
              e("div", Fi, [
                o[64] || (o[64] = e("label", null, "命中后直接跳过的分类（逗号隔开）", -1)),
                X(e("input", {
                  "onUpdate:modelValue": o[22] || (o[22] = (s) => k.value = s),
                  type: "text",
                  placeholder: "娱乐/低信息跳过"
                }, null, 512), [
                  [le, k.value]
                ])
              ]),
              e("label", Si, [
                X(e("input", {
                  "onUpdate:modelValue": o[23] || (o[23] = (s) => i.value.decisionGate.skipWithoutSubtitle = s),
                  type: "checkbox"
                }, null, 512), [
                  [lt, i.value.decisionGate.skipWithoutSubtitle]
                ]),
                o[65] || (o[65] = e("span", null, "无字幕视频自动跳过（避免无根据编造内容，节省 Token）", -1))
              ]),
              e("label", Ci, [
                X(e("input", {
                  "onUpdate:modelValue": o[24] || (o[24] = (s) => i.value.decisionGate.retryOnSkip = s),
                  type: "checkbox"
                }, null, 512), [
                  [lt, i.value.decisionGate.retryOnSkip]
                ]),
                o[66] || (o[66] = e("span", null, "跳过的任务自动重来一轮（继续抓取下一条候选视频，默认打开）", -1))
              ]),
              e("div", xi, [
                o[67] || (o[67] = e("label", null, "员工挂载 Skills 能力权限", -1)),
                e("div", Ei, [
                  (n(!0), l(O, null, H(he(io), (s) => (n(), l("label", {
                    key: s.id,
                    class: "emp-skill-item"
                  }, [
                    e("input", {
                      type: "checkbox",
                      checked: i.value.skills.includes(s.id),
                      onChange: (A) => Re(s.id)
                    }, null, 40, Li),
                    e("div", null, [
                      e("strong", null, c(s.name), 1),
                      e("small", null, c(s.description), 1)
                    ])
                  ]))), 128))
                ])
              ]),
              e("div", Mi, [
                o[68] || (o[68] = e("label", null, "自定义 Skill 补充规则（随员工包导出分享）", -1)),
                X(e("textarea", {
                  "onUpdate:modelValue": o[25] || (o[25] = (s) => i.value.customSkillInstructions = s),
                  rows: "3",
                  placeholder: "例如：如果视频提到 GitHub 开源项目，必须在总结末尾单独列出仓库要点。"
                }, null, 512), [
                  [le, i.value.customSkillInstructions]
                ])
              ])
            ], 64)) : Z.value === "prompts" ? (n(), l(O, { key: 2 }, [
              e("div", Ni, [
                o[69] || (o[69] = e("label", null, "员工核心提示词 (System Prompt)", -1)),
                X(e("textarea", {
                  "onUpdate:modelValue": o[26] || (o[26] = (s) => i.value.prompt.systemPrompt = s),
                  rows: "5"
                }, null, 512), [
                  [le, i.value.prompt.systemPrompt]
                ])
              ]),
              e("div", zi, [
                o[70] || (o[70] = e("label", null, "沉淀笔记输出模板 (Markdown)", -1)),
                X(e("textarea", {
                  "onUpdate:modelValue": o[27] || (o[27] = (s) => i.value.prompt.reportTemplate = s),
                  rows: "5",
                  class: "mono"
                }, null, 512), [
                  [le, i.value.prompt.reportTemplate]
                ])
              ]),
              e("div", Bi, [
                e("div", Pi, [
                  e("label", null, "主人纠偏偏好记忆 (" + c(i.value.ownerFeedback.length) + ")", 1),
                  o[71] || (o[71] = e("small", { style: { color: "var(--muted,#94a3b8)", "font-size": "11px" } }, "导出分享时默认剥离保护隐私", -1))
                ]),
                i.value.ownerFeedback.length ? (n(), l("div", Ri, [
                  (n(!0), l(O, null, H(i.value.ownerFeedback, (s) => (n(), l("div", {
                    key: s.id,
                    class: "emp-fb-row"
                  }, [
                    e("span", {
                      class: T(["emp-fb-tag", s.verdict])
                    }, c(s.verdict === "keep" ? "优先精读" : "跳过"), 3),
                    e("span", {
                      class: "emp-fb-title",
                      title: s.title
                    }, c(s.title), 9, Ai),
                    e("span", Vi, c(s.category), 1),
                    e("button", {
                      type: "button",
                      class: "emp-fb-del",
                      title: "移除样本",
                      onClick: (A) => Ue(s.id)
                    }, "×", 8, Oi)
                  ]))), 128))
                ])) : (n(), l("div", Ti, " 在「运行记录」里对判断结果点「标记有价值」或「以后跳过」，员工会自动学会你的口味。 "))
              ])
            ], 64)) : (n(), l(O, { key: 3 }, [
              e("div", Ui, [
                i.value.source.kind === "workspace-organizer" ? (n(), l("span", ji, "记录包含审批与撤销凭据；清空或被历史上限淘汰后无法从此处撤销。")) : (n(), l("span", Di, "仅展示最近执行轨迹，已分析/跳过的 BV 号不会重复处理。")),
                re(i.value.id).length ? (n(), l("button", {
                  key: 2,
                  type: "button",
                  class: "emp-link-btn",
                  onClick: o[28] || (o[28] = (s) => He(i.value.id))
                }, " 清空记录 ")) : g("", !0)
              ]),
              re(i.value.id).length ? (n(), l("div", qi, [
                (n(!0), l(O, null, H(re(i.value.id), (s) => (n(), l("article", {
                  key: s.id,
                  class: "emp-run-card"
                }, [
                  e("div", Ki, [
                    e("span", {
                      class: T(["emp-run-badge", s.status])
                    }, c(je(s.status, s.kind)), 3),
                    e("span", Ji, c(s.category) + " · " + c(Math.round(s.score * 100)) + "分", 1),
                    e("span", Wi, c(ie(s.createdAt)), 1)
                  ]),
                  e("div", {
                    class: "emp-run-title",
                    title: s.title
                  }, c(s.title), 9, Hi),
                  e("p", Yi, c(s.reason), 1),
                  s.toolTrace?.length ? (n(), l("div", Qi, [
                    (n(!0), l(O, null, H(s.toolTrace, (A, j) => (n(), l("span", {
                      key: j,
                      class: T(["emp-trace-pill", { fail: !A.ok }])
                    }, c(A.summary), 3))), 128))
                  ])) : g("", !0),
                  e("div", Xi, [
                    e("div", Zi, [
                      s.kind === "organizer" || s.peekFrames?.length ? (n(), l("button", {
                        key: 0,
                        type: "button",
                        class: "emp-link-btn",
                        onClick: (A) => w(s, i.value.name)
                      }, c(s.kind === "organizer" ? "👀 预览与逐条审批" : "▶ 回放窥屏"), 9, er)) : g("", !0),
                      s.url ? (n(), l("a", {
                        key: 1,
                        href: s.url,
                        target: "_blank",
                        rel: "noreferrer"
                      }, "原视频 ↗", 8, tr)) : g("", !0),
                      s.articleId ? (n(), l("button", {
                        key: 2,
                        type: "button",
                        class: "emp-link-btn",
                        onClick: o[29] || (o[29] = (A) => b("openLibrary"))
                      }, "去资料库看笔记 →")) : g("", !0)
                    ]),
                    s.bvid !== "-" ? (n(), l("div", or, [
                      e("button", {
                        type: "button",
                        onClick: (A) => me(s, "keep")
                      }, "✓ 记为重要", 8, ar),
                      e("button", {
                        type: "button",
                        onClick: (A) => me(s, "skip")
                      }, "✕ 以后跳过", 8, nr)
                    ])) : g("", !0)
                  ])
                ]))), 128))
              ])) : (n(), l("div", Gi, c(i.value.source.kind === "workspace-organizer" ? "还没有整理提案。点击卡片上的「生成提案」或「预览审批」即可开始。" : "还没有运行流水。你可以点击卡片上的「试跑 1 条」立刻体验，或开启巡检开关。"), 1))
            ], 64))
          ]),
          e("footer", lr, [
            e("button", {
              type: "button",
              class: "emp-pill-btn danger-text",
              onClick: o[30] || (o[30] = (s) => Ve(i.value))
            }, "删除"),
            e("div", ir, [
              e("button", {
                type: "button",
                class: "emp-pill-btn subtle",
                onClick: o[31] || (o[31] = (s) => Be(i.value))
              }, "导出分享"),
              e("button", {
                type: "button",
                class: "emp-pill-btn primary",
                disabled: U.value,
                onClick: Ae
              }, c(U.value ? "保存中…" : "保存配置"), 9, rr)
            ])
          ])
        ])) : g("", !0)
      ]),
      M.value.open ? (n(), dt(ma, {
        key: 0,
        mode: M.value.mode,
        "employee-id": M.value.employeeId,
        "employee-name": M.value.employeeName,
        "replay-frames": M.value.replayFrames,
        running: !!I.value,
        "backend-stale": D.value,
        onClose: o[32] || (o[32] = (s) => M.value.open = !1),
        onRunNow: o[33] || (o[33] = (s) => {
          const A = y.value.find((j) => j.id === s);
          A && we(A);
        }),
        onReloadExtension: ve
      }, null, 8, ["mode", "employee-id", "employee-name", "replay-frames", "running", "backend-stale"])) : g("", !0),
      P.value.open ? (n(), dt(ml, {
        key: 1,
        "employee-id": P.value.employeeId,
        "employee-name": P.value.employeeName,
        "latest-run": ne.value,
        running: I.value === P.value.employeeId,
        "generation-error": R.value,
        "backend-stale": D.value,
        onClose: o[34] || (o[34] = (s) => P.value.open = !1),
        onRunNow: o[35] || (o[35] = (s) => {
          const A = y.value.find((j) => j.id === s);
          A && we(A);
        }),
        onUpdated: o[36] || (o[36] = (s) => {
          ee();
        }),
        onReloadExtension: ve
      }, null, 8, ["employee-id", "employee-name", "latest-run", "running", "generation-error", "backend-stale"])) : g("", !0)
    ]));
  }
}), gr = /* @__PURE__ */ vt(sr, [["__scopeId", "data-v-5ef65c95"]]);
export {
  gr as default
};
