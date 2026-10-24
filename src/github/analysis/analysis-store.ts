import { reactive, readonly } from "vue";
import { ReadSessionSlot, type ReadSession } from "../../core/read-session";
import { gitHubService } from "../../services/github.service";
import { loadArchifyWebhookUrl, ArchifyWebhookConfigError } from "../workflow-settings";
import { loadGitHubReadHeaders } from "../api-client";
import { readGitHubResponse } from "../read-request";

export type AnalysisTab = "gitingest" | "gitdiagram" | "archify" | "deepwiki";

export interface ArchifyNode {
  id: string;
  label: string;
  role: "client" | "gateway" | "service" | "database" | "queue" | "cache";
  roleLabel: string;
  sourceRef: string;
  protocol?: string;
  desc: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArchifyEdge {
  fromId: string;
  toId: string;
  label: string;
  protocol?: string;
  pathD: string;
}

export interface ArchifyCluster {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArchifyData {
  provenance: string;
  title: string;
  diagramType: "architecture" | "workflow" | "sequence";
  clusters: ArchifyCluster[];
  nodes: ArchifyNode[];
  edges: ArchifyEdge[];
  width: number;
  height: number;
}

export interface DiagramLayoutNode {
  id: string;
  name: string;
  category: "ui" | "service" | "store" | "network" | "storage" | "worker";
  categoryLabel: string;
  desc: string;
  x: number;
  y: number;
  width: number;
  height: number;
  files: string[];
}

export interface DiagramLayoutEdge {
  fromId: string;
  toId: string;
  label: string;
  pathD: string;
}

export interface DiagramGraph {
  title: string;
  nodes: DiagramLayoutNode[];
  edges: DiagramLayoutEdge[];
  width: number;
  height: number;
}

export interface AnalysisModalState {
  isOpen: boolean;
  fullName: string;
  activeTab: AnalysisTab;
  n8nSubmitting: boolean;
  actionBusy: "" | "copy" | "save";
  actionMessage: string;
  n8nResult: { repo: string; origin: string; message: string; uncertain: boolean } | null;
  n8nUnlockConfirmation: boolean;
  n8nConfirmation: { origin: string; repo: string } | null;

  // GitIngest 状态
  gitingest: {
    loading: boolean;
    progress: string;
    fileCount: number;
    tokenCount: number;
    fullText: string;
    treeText: string;
    error: string;
  };

  // GitDiagram 状态 (含交互式矢量图谱与Mermaid代码)
  gitdiagram: {
    loading: boolean;
    graph: DiagramGraph | null;
    mermaidCode: string;
    error: string;
  };

  // Archify 状态 (强类型零像素架构与代码证据追踪)
  archify: {
    loading: boolean;
    data: ArchifyData | null;
    rawJson: string;
    diagramType: "architecture" | "workflow" | "sequence";
    error: string;
  };

  // DeepWiki 状态
  deepwiki: {
    loading: boolean;
    wikiMarkdown: string;
    error: string;
  };
}

const state = reactive<AnalysisModalState>({
  isOpen: false,
  fullName: "",
  activeTab: "gitingest",
  n8nSubmitting: false,
  actionBusy: "", actionMessage: "", n8nResult: null, n8nUnlockConfirmation: false,
  n8nConfirmation: null,

  gitingest: {
    loading: false,
    progress: "",
    fileCount: 0,
    tokenCount: 0,
    fullText: "",
    treeText: "",
    error: ""
  },

  gitdiagram: {
    loading: false,
    graph: null,
    mermaidCode: "",
    error: ""
  },

  archify: {
    loading: false,
    data: null,
    rawJson: "",
    diagramType: "architecture",
    error: ""
  },

  deepwiki: {
    loading: false,
    wikiMarkdown: "",
    error: ""
  }
});

export const githubAnalysisState = readonly(state);
let pendingN8nTask: { url: string; repo: string; body: string } | null = null;
let n8nConfirmationVersion = 0;
function clearN8nConfirmation(): void {
  n8nConfirmationVersion++;
  pendingN8nTask = null;
  state.n8nConfirmation = null;
}
function n8nBody(): string {
  return JSON.stringify({ repo: state.fullName, diagramType: state.archify.diagramType, ir: state.archify.data });
}
function captureContent() {
  if (!state.isOpen || !pageActive || state[state.activeTab].loading) return;
  const tab = state.activeTab;
  const content = tab === "gitingest" ? state.gitingest.fullText : tab === "gitdiagram" ? state.gitdiagram.mermaidCode : tab === "archify" ? state.archify.rawJson : state.deepwiki.wikiMarkdown;
  if (!content.trim()) return;
  const repo = state.fullName, version = analysisVersion;
  return { repo, tab, content, current: () => state.isOpen && pageActive && analysisVersion === version && state.fullName === repo && state.activeTab === tab };
}
function submissionBusy() { return !!state.actionBusy || state.n8nSubmitting; }

type ReadKind = "gitingest" | "deepwiki";
let pageActive = typeof document !== "undefined" && !document.hidden;
let analysisVersion = 0;
const analysisReads = new ReadSessionSlot();
let activeRead: { kind: ReadKind; job: ReadSession } | undefined;

function stopAnalysisRead(): void {
  if (!activeRead) return;
  analysisReads.cancel();
}
function beginRead(kind: ReadKind) {
  if (!state.isOpen || !pageActive || state.activeTab !== kind || state[kind].loading) return;
  stopAnalysisRead();
  const version = analysisVersion;
  const job = analysisReads.begin({
    timeoutMs: 60000,
    isCurrent: () => analysisVersion === version && state.isOpen && state.activeTab === kind && pageActive,
    onStop: reason => {
      activeRead = undefined;
      state[kind].loading = false;
      state[kind].error = reason === "timeout"
        ? "读取超时，已停止后续请求；可手动重新读取。"
        : "读取已暂停，可在对应工具中点击重新读取。";
    }
  });
  if (!job.current()) return;
  const ticket = { kind, job }; activeRead = ticket;
  return {
    signal: job.signal, current: job.current, wait: job.wait,
    finish: () => {
      if (job.finish() && activeRead === ticket) { state[kind].loading = false; activeRead = undefined; }
    }
  };
}
function decodeAnalysisBlob(data: any, limit: number): string {
  if (data?.encoding !== "base64" || typeof data.content !== "string" || data.content.length > limit * 1.5) throw new Error("Unsupported blob");
  const bytes = Uint8Array.from(atob(data.content.replace(/\s/g, "")), char => char.charCodeAt(0));
  if (bytes.length > limit) throw new Error("Blob too large");
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  if (text.includes("\u0000")) throw new Error("Binary blob");
  return text;
}
const analysisHeaders = loadGitHubReadHeaders;
async function analysisJson(path: string, headers: Record<string, string>, signal: AbortSignal): Promise<any> {
  return (await readGitHubResponse(`https://api.github.com/repos/${path}`, headers, signal)).data;
}

// 忽略与过滤文件规则
const IGNORE_PATTERNS = [
  /^\.git\//,
  /node_modules\//,
  /dist\//,
  /build\//,
  /target\//,
  /\.lock$/,
  /lock\.json$/,
  /lock\.yaml$/,
  /\.(png|jpe?g|gif|webp|svg|ico|pdf|zip|tar|gz|7z|woff2?|ttf|eot|mp4|webm|mp3|exe|dll|so|dylib)$/i
];

function isIgnored(path: string): boolean {
  return IGNORE_PATTERNS.some((reg) => reg.test(path));
}

// 格式化生成简易 ASCII 目录树
function generateAsciiTree(paths: string[]): string {
  const tree: any = Object.create(null);
  for (const p of paths.slice(0, 150)) {
    const parts = p.split("/");
    let cur = tree;
    for (const part of parts) {
      if (!cur[part]) cur[part] = Object.create(null);
      cur = cur[part];
    }
  }

  function renderNode(obj: any, prefix = ""): string[] {
    const keys = Object.keys(obj);
    const lines: string[] = [];
    keys.forEach((k, idx) => {
      const isLast = idx === keys.length - 1;
      const marker = isLast ? "└── " : "├── ";
      lines.push(`${prefix}${marker}${k}`);
      const childKeys = Object.keys(obj[k]);
      if (childKeys.length > 0) {
        const nextPrefix = prefix + (isLast ? "    " : "│   ");
        lines.push(...renderNode(obj[k], nextPrefix));
      }
    });
    return lines;
  }

  return renderNode(tree).join("\n");
}

export const githubAnalysisController = {
  state,

  open(fullName: string, tab: AnalysisTab = "gitingest") {
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName) || fullName.split("/").some(part => part === "." || part === "..")) return;
    stopAnalysisRead(); ++analysisVersion; state.actionMessage = ""; state.n8nUnlockConfirmation = false;
    clearN8nConfirmation();
    const isNewRepo = state.fullName !== fullName;
    if (isNewRepo) clearN8nConfirmation();
    state.fullName = fullName;
    state.activeTab = tab;
    state.isOpen = true;

    // 若切换了不同的仓库，彻底清空前一个仓库的分析结果
    if (isNewRepo) {
      state.gitingest = {
        loading: false,
        progress: "",
        fileCount: 0,
        tokenCount: 0,
        fullText: "",
        treeText: "",
        error: ""
      };
      state.gitdiagram = {
        loading: false,
        graph: null,
        mermaidCode: "",
        error: ""
      };
      state.archify = {
        loading: false,
        data: null,
        rawJson: "",
        diagramType: "architecture",
        error: ""
      };
      state.deepwiki = {
        loading: false,
        wikiMarkdown: "",
        error: ""
      };
    }

    // 根据打开的目标标签页立即执行生成
    if (tab === "gitingest" && !state.gitingest.fullText) {
      void this.runGitIngest();
    } else if (tab === "gitdiagram" && !state.gitdiagram.mermaidCode) {
      void this.runGitDiagram();
    } else if (tab === "archify" && !state.archify.data) {
      void this.runArchify();
    } else if (tab === "deepwiki" && !state.deepwiki.wikiMarkdown) {
      void this.runDeepWiki();
    }
  },

  setPageActive(active: boolean) {
    pageActive = active;
    if (!active) { stopAnalysisRead(); ++analysisVersion; state.actionMessage = ""; state.n8nUnlockConfirmation = false; clearN8nConfirmation(); }
  },

  refreshCurrent() {
    if (submissionBusy() || !state.isOpen || !pageActive || state[state.activeTab].loading) return;
    ++analysisVersion; state.actionMessage = "";
    if (state.activeTab === "gitingest") void this.runGitIngest();
    else if (state.activeTab === "deepwiki") void this.runDeepWiki();
    else if (state.activeTab === "gitdiagram") void this.runGitDiagram();
    else void this.runArchify(state.archify.diagramType);
  },

  close() {
    stopAnalysisRead(); ++analysisVersion;
    state.actionMessage = ""; state.n8nUnlockConfirmation = false;
    clearN8nConfirmation(); // Already submitted POSTs keep their own bounded wait.
    state.isOpen = false;
  },

  setTab(tab: AnalysisTab) {
    if (!state.isOpen || !pageActive || state.activeTab === tab) return;
    stopAnalysisRead(); ++analysisVersion; state.actionMessage = ""; state.n8nUnlockConfirmation = false; clearN8nConfirmation();
    state.activeTab = tab;
    if (tab === "gitingest" && !state.gitingest.fullText) {
      void this.runGitIngest();
    } else if (tab === "gitdiagram" && !state.gitdiagram.mermaidCode) {
      void this.runGitDiagram();
    } else if (tab === "archify" && !state.archify.data) {
      void this.runArchify();
    } else if (tab === "deepwiki" && !state.deepwiki.wikiMarkdown) {
      void this.runDeepWiki();
    }
  },

  /**
   * 📦 本地 GitIngest：递归抓取文件树并组装适合 LLM 的 Prompt 文本
   */
  async runGitIngest() {
    const job = beginRead("gitingest");
    if (!job) return;
    const fullName = state.fullName;
    clearN8nConfirmation();
    Object.assign(state.gitdiagram, { graph: null, mermaidCode: "", error: "" });
    Object.assign(state.archify, { data: null, rawJson: "", error: "" });
    Object.assign(state.gitingest, { loading: true, progress: "正在读取仓库目录快照…", error: "", fullText: "", treeText: "", fileCount: 0, tokenCount: 0 });
    try {
      const headers = await job.wait(() => analysisHeaders(job.signal));
      job.signal.throwIfAborted(); if (!job.current()) return;
      const prefix = fullName.split("/").map(encodeURIComponent).join("/");
      const metadata = await job.wait(() => analysisJson(prefix, headers, job.signal));
      job.signal.throwIfAborted(); if (!job.current()) return;
      if (typeof metadata?.default_branch !== "string") throw new Error("Missing branch");
      const branch = metadata.default_branch;
      const data = await job.wait(() => analysisJson(`${prefix}/git/trees/${encodeURIComponent(branch)}?recursive=1`, headers, job.signal));
      job.signal.throwIfAborted(); if (!job.current()) return;
      if (!Array.isArray(data?.tree)) throw new Error("Invalid tree");
      const blobs = data.tree.filter((item: any) => item?.type === "blob" && typeof item.path === "string" && !isIgnored(item.path));
      const paths = blobs.map((item: any) => item.path);
      const tree = generateAsciiTree(paths);
      state.gitingest.treeText = tree; state.gitingest.fileCount = paths.length;
      const files = blobs.filter((item: any) => {
        const path = item.path.toLowerCase();
        return typeof item.size === "number" && item.size <= 65536 && /^[0-9a-f]{40,64}$/i.test(item.sha || "") &&
          (path.startsWith("readme") || ["package.json", "cargo.toml", "pyproject.toml", "go.mod"].includes(path) || path.startsWith("src/") || /\.(ts|py|go|rs)$/.test(path));
      }).slice(0, 18);
      let document = `Repository: ${fullName}\nDefault branch: ${branch}\nSource: GitHub Git Tree + immutable blobs\nTree truncated by API: ${!!data.truncated}\nEligible paths returned: ${paths.length}; directory preview: first 150 paths\nSelected files: ${files.length}; each <=64KiB, shown at most 8000 characters\nThis is a local sample, not a complete repository or AI analysis.\n\n${tree}\n\n`;
      let loaded = 0, failed = 0;
      for (const item of files) {
        job.signal.throwIfAborted(); if (!job.current()) return;
        state.gitingest.progress = `读取代码样本 ${loaded + failed + 1}/${files.length}…`;
        try {
          const blob = await job.wait(() => analysisJson(`${prefix}/git/blobs/${item.sha}`, headers, job.signal));
          job.signal.throwIfAborted(); if (!job.current()) return;
          const text = decodeAnalysisBlob(blob, 65536);
          document += `FILE: ${item.path}\n${text.slice(0, 8000)}${text.length > 8000 ? "\n[truncated]" : ""}\n\n`;
          loaded++;
        } catch {
          job.signal.throwIfAborted(); if (!job.current()) return;
          document += `FILE: ${item.path}\n[not read: error, unsupported format, or size limit]\n\n`;
          failed++;
        }
      }
      if (!job.current()) return;
      state.gitingest.fullText = document;
      state.gitingest.tokenCount = Math.round(document.length / 3.8);
      state.gitingest.progress = `已采样 ${loaded} 个文件，未读 ${failed} 个；目录预览最多150项${data.truncated ? "，API目录结果不完整" : ""}。`;
      if (failed) state.gitingest.error = "部分文件未能读取，导出中已逐项标记；不是完整代码快照。";
    } catch {
      if (job.current()) state.gitingest.error = "读取失败、超时或权限不足；请检查配置后手动重新读取。";
    } finally { job.finish(); }
  },

  /**
   * 本地目录关键词与模板示意，不是经源码验证的架构分析
   */
  async runGitDiagram() {
    const fullName = state.fullName;
    if (!fullName || !state.isOpen || !pageActive || state.activeTab !== "gitdiagram") return;
    if (!state.gitingest.treeText) { state.gitdiagram.error = "请先在代码采样页读取目录；没有目录时不生成示意图。"; return; }

    state.gitdiagram.loading = true;
    state.gitdiagram.error = "";

    try {
      const cleanName = fullName.split("/")[1] || fullName;
      const tree = state.gitingest.treeText || "";

      // 智能分析架构模块
      const hasUi = /components|views|ui|frontend|app|pages/i.test(tree);
      const hasStores = /store|pinia|vuex|state|redux/i.test(tree);
      const hasCore = /service|engine|controller|core|logic/i.test(tree);
      const hasApi = /api|server|router|network|http|fetch/i.test(tree);
      const hasStorage = /db|storage|cache|indexeddb|sqlite|sql/i.test(tree);
      const hasWorker = /worker|background|daemon|schedule|cron/i.test(tree);

      const nodes: DiagramLayoutNode[] = [];
      const edges: DiagramLayoutEdge[] = [];

      // 1. 客户端/界面交互层 (左侧上方)
      nodes.push({
        id: "node-ui",
        name: hasUi ? "用户交互层 (UI & Pages)" : "CLI / 命令行交互层",
        category: "ui",
        categoryLabel: "界面与输入",
        desc: "处理用户手势、点击、路由与视觉状态展示",
        x: 40,
        y: 40,
        width: 190,
        height: 80,
        files: ["views/", "components/", "layout/"]
      });

      // 2. 状态管理层 (左侧下方)
      nodes.push({
        id: "node-store",
        name: hasStores ? "响应式状态中心 (Stores)" : "配置与上下文环境",
        category: "store",
        categoryLabel: "状态中心",
        desc: "管理全局活跃状态、用户偏好与数据流分发",
        x: 40,
        y: 190,
        width: 190,
        height: 80,
        files: ["store/", "state/", "context/"]
      });

      // 3. 核心业务与控制引擎 (居中)
      nodes.push({
        id: "node-core",
        name: `${cleanName} 核心调度引擎`,
        category: "service",
        categoryLabel: "业务逻辑与调度",
        desc: "驱动项目核心算法、事务管线与流程编排",
        x: 290,
        y: 110,
        width: 200,
        height: 88,
        files: ["services/", "controllers/", "core/"]
      });

      // 4. 网络通信与外部服务 (右侧上方)
      nodes.push({
        id: "node-api",
        name: hasApi ? "外部 API 与网络通信" : "系统调用与外部进程",
        category: "network",
        categoryLabel: "网络与外部桥接",
        desc: "负责 REST/WebSocket 数据交互与协议适配",
        x: 550,
        y: 40,
        width: 190,
        height: 80,
        files: ["api/", "network/", "http/"]
      });

      // 5. 本地数据与持久化层 (右侧下方)
      nodes.push({
        id: "node-storage",
        name: hasStorage ? "本地存储与缓存 (Storage)" : "本地文件系统读写",
        category: "storage",
        categoryLabel: "数据持久化",
        desc: "管理本地 IndexedDB、文件写入与离线缓存",
        x: 550,
        y: 190,
        width: 190,
        height: 80,
        files: ["storage/", "cache/", "db/"]
      });

      // 6. 后台常驻与守护调度 (底部)
      if (hasWorker) {
        nodes.push({
          id: "node-worker",
          name: "后台 Worker / 守护任务",
          category: "worker",
          categoryLabel: "后台调度",
          desc: "处理离线常驻、定时同步与消息监听",
          x: 290,
          y: 250,
          width: 200,
          height: 75,
          files: ["workers/", "background/"]
        });
      }

      // 构建贝塞尔曲线关系连线
      edges.push({
        fromId: "node-ui",
        toId: "node-core",
        label: "用户事件",
        pathD: "M 230, 80 C 260, 80 260, 140 290, 140"
      });
      edges.push({
        fromId: "node-store",
        toId: "node-core",
        label: "状态驱动",
        pathD: "M 230, 230 C 260, 230 260, 160 290, 160"
      });
      edges.push({
        fromId: "node-core",
        toId: "node-api",
        label: "请求派发",
        pathD: "M 490, 140 C 520, 140 520, 80 550, 80"
      });
      edges.push({
        fromId: "node-core",
        toId: "node-storage",
        label: "持久化存储",
        pathD: "M 490, 160 C 520, 160 520, 230 550, 230"
      });
      if (hasWorker) {
        edges.push({
          fromId: "node-worker",
          toId: "node-core",
          label: "事件总线",
          pathD: "M 390, 250 L 390, 198"
        });
      }

      nodes.forEach(node => { node.files = []; }); // Template paths are not repository evidence.
      state.gitdiagram.graph = {
        title: `${cleanName} 本地规则示意图`,
        nodes,
        edges,
        width: 780,
        height: hasWorker ? 350 : 300
      };

      // 同时生成 Mermaid 源码
      let mermaid = `%% Local directory-keyword/template sketch; nodes and edges are unverified.\ngraph TD\n`;
      mermaid += `  subgraph ${cleanName} [项目核心架构]\n`;
      nodes.forEach((n) => {
        mermaid += `    ${n.id}["${n.name}"]\n`;
      });
      edges.forEach((e) => {
        mermaid += `    ${e.fromId} -->|${e.label}| ${e.toId}\n`;
      });
      mermaid += `  end\n`;
      state.gitdiagram.mermaidCode = mermaid;
    } catch (err: any) {
      state.gitdiagram.error = err?.message || "生成架构图失败";
    } finally {
      state.gitdiagram.loading = false;
    }
  },

  /**
   * 本地规则示意；不提供虚构源码路径或行号证据
   */
  async runArchify(diagramType: "architecture" | "workflow" | "sequence" = "architecture") {
    const fullName = state.fullName;
    if (!fullName || !state.isOpen || !pageActive || state.activeTab !== "archify") return;
    if (!state.gitingest.treeText) { state.archify.error = "请先在代码采样页读取目录；没有目录时不生成示意图。"; return; }
    clearN8nConfirmation();

    state.archify.loading = true;
    state.archify.diagramType = diagramType;
    state.archify.error = "";

    try {
      const cleanName = fullName.split("/")[1] || fullName;
      const tree = state.gitingest.treeText || "";

      // Directory-name heuristics only; relationships and protocols are unverified.
      const hasUi = /components|views|ui|frontend|app|pages/i.test(tree);
      const hasStores = /store|pinia|vuex|state|redux/i.test(tree);
      const hasApi = /api|server|router|network|http|fetch/i.test(tree);
      const hasStorage = /db|storage|cache|indexeddb|sqlite|sql/i.test(tree);
      const hasWorker = /worker|background|daemon|schedule|cron/i.test(tree);

      const clusters: ArchifyCluster[] = [
        { id: "c-ingress", name: "客户端边界 (Ingress & Boundary)", x: 20, y: 20, width: 235, height: 330 },
        { id: "c-core", name: "业务调度集群 (Core Microservices)", x: 275, y: 20, width: 250, height: 330 },
        { id: "c-storage", name: "数据与通信层 (Persistence & Network)", x: 545, y: 20, width: 235, height: 330 }
      ];

      const nodes: ArchifyNode[] = [];
      const edges: ArchifyEdge[] = [];

      // 1. 客户端
      nodes.push({
        id: "arch-client",
        label: hasUi ? "Web / 前端交互端" : "CLI Terminal 客户端",
        role: "client",
        roleLabel: "Client",
        sourceRef: "未定位（规则示意）",
        protocol: "HTTPS / User Action",
        desc: "用户输入与主控界面",
        x: 35,
        y: 60,
        width: 200,
        height: 86
      });

      // 2. 状态/环境
      nodes.push({
        id: "arch-state",
        label: hasStores ? "响应式状态控制器" : "全局配置与上下文",
        role: "cache",
        roleLabel: "State / Cache",
        sourceRef: "未定位（规则示意）",
        protocol: "Memory State",
        desc: "实时内存状态与参数注入",
        x: 35,
        y: 200,
        width: 200,
        height: 86
      });

      // 3. 核心网关/服务
      nodes.push({
        id: "arch-service",
        label: `${cleanName} 核心业务管线`,
        role: "service",
        roleLabel: "Core Service",
        sourceRef: "未定位（规则示意）",
        protocol: "In-Process / RPC",
        desc: "业务流程编排与算法调度",
        x: 290,
        y: 75,
        width: 220,
        height: 94
      });

      if (hasWorker) {
        nodes.push({
          id: "arch-worker",
          label: "后台常驻守护 Worker",
          role: "queue",
          roleLabel: "Worker / Queue",
          sourceRef: "未定位（规则示意）",
          protocol: "EventBus / PostMessage",
          desc: "异步任务队列与定时轮询",
          x: 290,
          y: 205,
          width: 220,
          height: 86
        });
      }

      // 4. API 通信
      nodes.push({
        id: "arch-api",
        label: hasApi ? "外部 API 与网关" : "系统子进程 (IPC / REST)",
        role: "gateway",
        roleLabel: "Gateway / API",
        sourceRef: "未定位（规则示意）",
        protocol: "HTTP/2 REST / JSON",
        desc: "网络请求派发与反向代理",
        x: 560,
        y: 60,
        width: 200,
        height: 86
      });

      // 5. 存储
      nodes.push({
        id: "arch-db",
        label: hasStorage ? "持久化存储 (IndexedDB / DB)" : "文件系统持久化",
        role: "database",
        roleLabel: "Database",
        sourceRef: "未定位（规则示意）",
        protocol: "Storage Engine",
        desc: "离线数据落盘与缓存持久化",
        x: 560,
        y: 200,
        width: 200,
        height: 86
      });

      // 连接线
      edges.push({
        fromId: "arch-client",
        toId: "arch-service",
        label: "REST / Dispatch",
        protocol: "HTTP/JSON",
        pathD: "M 235, 103 C 262, 103 262, 122 290, 122"
      });
      edges.push({
        fromId: "arch-state",
        toId: "arch-service",
        label: "Sync Props",
        protocol: "Reactive",
        pathD: "M 235, 243 C 262, 243 262, 142 290, 142"
      });
      edges.push({
        fromId: "arch-service",
        toId: "arch-api",
        label: "Outbound Call",
        protocol: "HTTPS",
        pathD: "M 510, 110 C 535, 110 535, 103 560, 103"
      });
      edges.push({
        fromId: "arch-service",
        toId: "arch-db",
        label: "Read / Write",
        protocol: "SQL / KV",
        pathD: "M 510, 132 C 535, 132 535, 243 560, 243"
      });
      if (hasWorker) {
        edges.push({
          fromId: "arch-worker",
          toId: "arch-service",
          label: "Job Result",
          protocol: "Event",
          pathD: "M 400, 205 L 400, 169"
        });
      }

      const archData: ArchifyData = {
        provenance: "本地目录关键词与模板生成；节点、关系、协议未经源码验证，sourceRef不是源码证据。",
        title: `${cleanName} 本地规则示意图`,
        diagramType,
        clusters,
        nodes,
        edges,
        width: 800,
        height: 370
      };

      state.archify.data = archData;
      state.archify.rawJson = JSON.stringify(archData, null, 2);
    } catch (err: any) {
      state.archify.error = err?.message || "Archify 图谱生成失败";
    } finally {
      state.archify.loading = false;
    }
  },

  /** Preparing a confirmation never submits a POST. */
  async triggerN8nWorkflow() {
    if (!state.isOpen || !pageActive || state.activeTab !== "archify" || !state.archify.data || state.archify.loading || submissionBusy() || pendingN8nTask || state.n8nResult?.uncertain) return;
    const repo = state.fullName, body = n8nBody(), version = analysisVersion;
    const confirmationVersion = n8nConfirmationVersion;
    const current = () => state.isOpen && pageActive && analysisVersion === version && n8nConfirmationVersion === confirmationVersion;
    state.n8nSubmitting = true;
    try {
      const url = await loadArchifyWebhookUrl();
      if (!current()) return;
      if (!url) throw new ArchifyWebhookConfigError("请先在 GitHub 设置中填写 Webhook 地址。");
      if (n8nBody() !== body) { state.actionMessage = "架构数据已变化，请重新准备提交。"; return; }
      pendingN8nTask = { url, repo, body };
      state.n8nConfirmation = { origin: new URL(url).origin, repo };
    } catch (error) {
      if (current()) state.actionMessage = error instanceof ArchifyWebhookConfigError ? error.message : "读取设置失败，没有提交任务。";
    } finally { state.n8nSubmitting = false; }
  },

  cancelN8nWorkflow: clearN8nConfirmation,

  requestN8nUnlock() {
    if (state.isOpen && pageActive && !submissionBusy() && state.n8nResult?.uncertain) state.n8nUnlockConfirmation = true;
  },
  cancelN8nUnlock() { state.n8nUnlockConfirmation = false; },
  acknowledgeN8nChecked() {
    if (!state.isOpen || !pageActive || submissionBusy() || !state.n8nUnlockConfirmation || !state.n8nResult?.uncertain) return;
    state.n8nResult = { ...state.n8nResult, uncertain: false, message: "用户声明已在节点侧核对，已解除本页提交限制；扩展未验证执行结果，也未重发请求。" };
    state.n8nUnlockConfirmation = false;
  },

  async confirmN8nWorkflow() {
    const task = pendingN8nTask;
    if (!task || !state.isOpen || !pageActive || state.activeTab !== "archify" || submissionBusy() || state.n8nResult?.uncertain) return;
    const version = analysisVersion;
    const current = () => state.isOpen && pageActive && analysisVersion === version && pendingN8nTask === task;
    state.n8nSubmitting = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let started = false;
    const origin = new URL(task.url).origin;
    try {
      const url = await loadArchifyWebhookUrl();
      if (!current()) return;
      if (url !== task.url || state.fullName !== task.repo || state.archify.loading || n8nBody() !== task.body) {
        throw new ArchifyWebhookConfigError("节点或架构数据已变化，没有提交；请重新准备确认。");
      }
      clearN8nConfirmation();
      const request = new AbortController();
      timer = setTimeout(() => request.abort(), 15000);
      // This record belongs to the original task, not the currently displayed repo.
      started = true;
      state.n8nResult = { repo: task.repo, origin, uncertain: true, message: "已开始提交，等待响应；不要重复发送。" };
      const response = await fetch(task.url, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: task.body,
        signal: request.signal, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer"
      });
      void response.body?.cancel().catch(() => undefined);
      request.signal.throwIfAborted();
      state.n8nResult = { repo: task.repo, origin, uncertain: !response.ok, message: response.ok
        ? `节点返回 HTTP ${response.status}，仅表示接受请求，不证明任务执行完成。`
        : `节点返回 HTTP ${response.status}，是否执行仍未知。请在节点侧核对，不要直接重发。` };
    } catch (error) {
      if (started) state.n8nResult = { repo: task.repo, origin, uncertain: true, message: "网络失败或超时，节点可能已收到请求。请先在节点侧核对；未自动重试。" };
      else if (current()) {
        state.actionMessage = error instanceof ArchifyWebhookConfigError ? error.message : "读取设置失败，没有提交任务。";
        clearN8nConfirmation();
      }
    } finally {
      if (timer !== undefined) clearTimeout(timer);
      state.n8nSubmitting = false;
    }
  },
  async runDeepWiki() {
    const job = beginRead("deepwiki");
    if (!job) return;
    const fullName = state.fullName;
    const repo = gitHubService.findRepository(fullName);
    const description = repo?.description || "列表快照暂无项目说明";
    state.deepwiki.loading = true; state.deepwiki.error = ""; state.deepwiki.wikiMarkdown = "";
    try {
      const headers = await job.wait(() => analysisHeaders(job.signal));
      job.signal.throwIfAborted(); if (!job.current()) return;
      const data = await job.wait(() => analysisJson(`${fullName.split("/").map(encodeURIComponent).join("/")}/readme`, headers, job.signal));
      job.signal.throwIfAborted(); if (!job.current()) return;
      const readme = decodeAnalysisBlob(data, 1048576);
      state.deepwiki.wikiMarkdown = `# ${fullName} README 摘录\n\n来源：GitHub README API；不是 DeepWiki 在线服务或 AI 分析。\n简介（列表快照）：${description}\n\n${readme.slice(0, 40000)}${readme.length > 40000 ? "\n\n[正文超过40000字符，已截断]" : readme.length === 0 ? "\n[README为空]" : ""}`;
    } catch {
      if (job.current()) state.deepwiki.error = "README读取失败或超时；未生成无依据的项目介绍，请手动重新读取。";
    } finally { job.finish(); }
  },

  async copyCurrentContent() {
    if (submissionBusy()) return;
    const snapshot = captureContent();
    if (!snapshot) { state.actionMessage = "请先读取或生成有效内容。"; return; }
    state.actionBusy = "copy"; state.actionMessage = "正在复制当前内容…";
    try {
      await navigator.clipboard.writeText(snapshot.content);
      if (snapshot.current()) state.actionMessage = `已复制 ${snapshot.repo} 的 ${snapshot.tab} 提交快照。`;
    } catch {
      if (snapshot.current()) state.actionMessage = "复制未确认，不会自动重试。";
    } finally { state.actionBusy = ""; }
  }
};
