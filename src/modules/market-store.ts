import { reactive, readonly } from "vue";

export type PluginCategory =
  | "all"
  | "installed"
  | "productivity"
  | "communication"
  | "system"
  | "entertainment"
  | "media";

export type StoreItemKind = "module" | "plugin";

export interface PluginMarketItem {
  id: string;
  title: string;
  version: string;
  kind?: StoreItemKind; // "module" 为独立小窗模块，"plugin" 为全屏常驻插件
  category: PluginCategory;
  categoryLabel: string;
  icon?: string;
  emoji?: string;
  desc: string;
  author: string;
  tags: string[];
  builtIn: boolean;
  docUrl?: string;
  downloadUrl?: string;
  isDev?: boolean; // 实验性组件需显式逐项启用；不纳入批量启用
  devNotice?: string;
}

export const PLUGIN_CATALOG: readonly PluginMarketItem[] = [
  // ==================== 1. 独立模块区 (Modules) ====================
  {
    id: "todoist",
    title: "todoist",
    version: "v3.0.0",
    kind: "module",
    category: "productivity",
    categoryLabel: "独立模块 · 待办",
    icon: "assets/nav-todoist.svg",
    emoji: "✅",
    desc: "独立可拖动待办看板与项目协作工作台，支持日历联动、时间规划与云端标签管理。",
    author: "Doist / LogicWeaver",
    tags: ["待办看板", "日程规划", "独立浮窗"],
    builtIn: true
  },
  {
    id: "chat",
    title: "海狸聊天室",
    version: "v1.0.0",
    kind: "module",
    category: "communication",
    categoryLabel: "独立模块 · 实时交流",
    emoji: "💬",
    desc: "实验性自托管私有聊天室，默认关闭。需先手动启用，再配置自己的服务器和专属邀请；支持文字、受限图片与分享卡片。",
    author: "LogicWeaver Lab",
    tags: ["实验性", "默认关闭", "自托管"],
    builtIn: true,
    isDev: true,
    devNotice: "实验性组件，仍需人工与双端验收；未启用时不自动连接，不读取房间或补发消息。"
  },
  {
    id: "music",
    title: "网易云模块",
    version: "v2.0.1",
    kind: "module",
    category: "media",
    categoryLabel: "独立模块 · 多媒体",
    icon: "assets/netease.svg",
    emoji: "🎵",
    desc: "网易云音乐在线搜索、扫码安全登录、同步个人歌单与每日推荐歌曲，独立小窗便捷操控。",
    author: "Netease Cloud",
    tags: ["网易云", "在线歌单", "扫码登录"],
    builtIn: true
  },

  // ==================== 2. 全屏插件区 (Plugins) ====================
  {
    id: "daily-bilibili",
    title: "b站插件",
    version: "v2.8.0",
    kind: "plugin",
    category: "media",
    categoryLabel: "全屏插件 · 影院",
    icon: "assets/bilibili.svg",
    emoji: "📺",
    desc: "B站全屏双栏收藏夹知识库、小窗画中画影院、AI 字幕提取与原声电台一体化工作台。",
    author: "LogicWeaver Lab",
    tags: ["核心常驻", "Bilibili", "视频整理"],
    builtIn: true
  },
  {
    id: "card-github",
    title: "github插件",
    version: "v2.5.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · 开发",
    icon: "assets/nav-github.svg",
    emoji: "🐙",
    desc: "GitHub Star 知识库整理、本地多级分类文件夹、实时趋势发现与仓库 AI 智能分析。",
    author: "GitHub Community",
    tags: ["核心常驻", "代码仓库", "Star管理"],
    builtIn: true
  },
  {
    id: "daily-aihot",
    title: "ai hot插件",
    version: "v1.8.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · 资讯",
    icon: "assets/nav-aihot.svg",
    emoji: "🔥",
    desc: "全网前沿 AI 科技头条、技术论文与开源爆点聚合情报站，内置沉浸式长文阅读器。",
    author: "LogicWeaver Lab",
    tags: ["核心常驻", "AI资讯", "前沿技术"],
    builtIn: true
  },
  {
    id: "daily-pricing",
    title: "模型插件",
    version: "v1.6.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · 算力实验",
    icon: "assets/nav-pricing.svg",
    emoji: "📐",
    desc: "全球主流 LLM 大语言模型价格性价比全景雷达、性能天梯排行榜与推理成本测算器；当前处于实验开发阶段。",
    author: "LogicWeaver Lab",
    tags: ["实验性", "LLM定价", "性能跑分"],
    builtIn: true,
    isDev: true,
    devNotice: "开发实验中，功能尚在完善中"
  },
  {
    id: "daily-youtube",
    title: "youtube插件",
    version: "v1.0.0",
    kind: "plugin",
    category: "media",
    categoryLabel: "全屏插件 · 视听",
    icon: "assets/nav-youtube.svg",
    emoji: "▶️",
    desc: "YouTube 官方流媒体插件。原生打通当前 Edge 登录账号，双栏 B 站收藏夹架构，18 个精准专属推荐换一批与点赞/收藏同步。",
    author: "LogicWeaver Lab",
    tags: ["核心常驻", "全屏插件", "算法推荐", "视频收藏"],
    builtIn: true
  }
];

export const CORE_PLUGIN_IDS: readonly string[] = [
  "todoist", "daily-bilibili", "card-github", "daily-youtube", "daily-aihot"
];

const STORAGE_KEY = "logicweaver_installed_dock_modules";
const DEV_STORAGE_KEY = "logicweaver_dev_mode";

export interface PluginMarketState {
  isOpen: boolean;
  isSaving: boolean;
  searchQuery: string;
  selectedCategory: PluginCategory;
  kindFilter: "module" | "plugin";
  installedIds: string[];
  isDevMode: boolean;
  errorMessage: string;
}

function loadDevMode(): boolean {
  try {
    return localStorage.getItem(DEV_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

let installedReadFailed = false;
function loadInstalledIds(): string[] {
  try {
    installedReadFailed = false;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.every(id => typeof id === "string")) {
        throw new Error("Invalid enabled module preference");
      }
      return Array.from(new Set(parsed as string[]));
    }
  } catch {
    installedReadFailed = true;
  }
  return [];
}

function persistInstalledIds(ids: string[]): boolean {
  try {
    const serialized = JSON.stringify(ids);
    localStorage.setItem(STORAGE_KEY, serialized);
    return localStorage.getItem(STORAGE_KEY) === serialized;
  } catch {
    return false;
  }
}

const state = reactive<PluginMarketState>({
  isOpen: false,
  isSaving: false,
  searchQuery: "",
  selectedCategory: "all",
  kindFilter: "plugin",
  installedIds: loadInstalledIds(),
  isDevMode: loadDevMode(),
  errorMessage: installedReadFailed ? "启用状态读取失败，暂不允许覆盖；重新打开可重读。" : ""
});

async function commitInstalledIds(change: (latest: string[]) => string[] | null): Promise<boolean> {
  if (state.isSaving) {
    state.errorMessage = "启用状态正在保存，未重复提交。";
    return false;
  }
  if (installedReadFailed) {
    state.errorMessage = "启用状态读取失败，未覆盖原数据。请重新打开商店重读。";
    return false;
  }
  if (typeof navigator === "undefined" || !navigator.locks?.request) {
    state.errorMessage = "当前环境不支持跨标签写入保护，未保存启用状态。";
    return false;
  }
  state.isSaving = true;
  state.errorMessage = "";
  const controller = new AbortController();
  const deadline = Date.now() + 10000;
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    return await navigator.locks.request(`logicweaver:market:${STORAGE_KEY}`,
      { mode: "exclusive", signal: controller.signal }, () => {
        if (controller.signal.aborted || Date.now() >= deadline) {
          state.errorMessage = "等待其他页面保存超时，未提交本次修改；请稍后再试。";
          return false;
        }
        // Cooperating tabs serialize the latest-read/intent/write block, with no await inside.
        const latest = loadInstalledIds();
        if (installedReadFailed) {
          state.errorMessage = "最新启用状态读取失败，未覆盖其他页面的数据。";
          return false;
        }
        const changed = change(latest);
        if (changed === null) return false;
        const next = Array.from(new Set(changed));
        if (!persistInstalledIds(next)) {
          installedReadFailed = true;
          state.errorMessage = "启用状态保存结果未确认，当前 Dock 保留；请重新打开商店核对，未自动重试。";
          return false;
        }
        state.installedIds = next;
        state.errorMessage = "";
        window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed"));
        return true;
      });
  } catch {
    state.errorMessage = controller.signal.aborted
      ? "等待其他页面保存超时，未提交本次修改；请稍后再试。"
      : "跨标签写入保护不可用，未自动重试；请重新打开商店核对。";
    return false;
  } finally {
    clearTimeout(timer);
    state.isSaving = false;
  }
}

// Storage events update display; the Web Lock serializes participating controller writes.
if (typeof window !== "undefined") {
  window.addEventListener("storage", event => {
    if (event.storageArea !== localStorage) return;
    if (event.key === STORAGE_KEY || event.key === null) {
      const next = loadInstalledIds();
      if (installedReadFailed) {
        state.errorMessage = "其他页面的启用状态无法读取，当前入口保留，未覆盖数据。";
      } else {
        state.installedIds = next;
        state.errorMessage = "";
        window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed"));
      }
    }
    if (event.key === DEV_STORAGE_KEY || event.key === null) state.isDevMode = loadDevMode();
  });
}

export const pluginMarketController = {
  get state() {
    return readonly(state);
  },

  isInstalled(id: string): boolean {
    // Core entries are available by default, not necessarily mounted or running.
    if (CORE_PLUGIN_IDS.includes(id)) {
      return true;
    }
    return state.installedIds.includes(id);
  },

  isCorePlugin(id: string): boolean {
    return CORE_PLUGIN_IDS.includes(id);
  },

  open() {
    state.isOpen = true;
    state.searchQuery = "";
    const next = loadInstalledIds();
    if (!installedReadFailed) {
      state.installedIds = next;
      window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed"));
    }
    state.errorMessage = installedReadFailed ? "启用状态读取失败，暂不允许覆盖原数据。" : "";
  },

  close() {
    state.isOpen = false;
  },

  setKindFilter(kind: "module" | "plugin") {
    state.kindFilter = kind;
  },

  setCategory(category: PluginCategory) {
    state.selectedCategory = category;
  },

  setSearchQuery(query: string) {
    state.searchQuery = query;
  },

  toggleDevMode(): boolean {
    return false;
  },

  install(id: string): Promise<boolean> {
    const item = PLUGIN_CATALOG.find(item => item.id === id);
    if (!item) {
      state.errorMessage = "该组件不可启用。";
      return Promise.resolve(false);
    }
    if (CORE_PLUGIN_IDS.includes(id)) return Promise.resolve(true);
    return commitInstalledIds(latest => [...latest, id]);
  },

  uninstall(id: string): Promise<boolean> {
    if (this.isCorePlugin(id)) {
      state.errorMessage = "核心入口默认可用，不支持在商店停用。";
      return Promise.resolve(false);
    }
    if (!PLUGIN_CATALOG.some(item => item.id === id)) {
      state.errorMessage = "该入口不由当前商店管理，未删除旧偏好。";
      return Promise.resolve(false);
    }
    return commitInstalledIds(latest => latest.filter(entry => entry !== id));
  },

  toggle(id: string): Promise<boolean> {
    const item = PLUGIN_CATALOG.find(item => item.id === id);
    if (!item || CORE_PLUGIN_IDS.includes(id)) return Promise.resolve(false);
    return commitInstalledIds(latest => {
      if (latest.includes(id)) return latest.filter(entry => entry !== id);
      // This per-item action is explicit opt-in; installAll still excludes isDev.
      return [...latest, id];
    });
  },

  installAll(): Promise<boolean> {
    // Bulk enable never silently opts into experimental components.
    const moduleIds = PLUGIN_CATALOG.filter(p => !p.isDev && !this.isCorePlugin(p.id)).map(p => p.id);
    return commitInstalledIds(latest => [...latest, ...moduleIds]);
  },

  uninstallAll(): Promise<boolean> {
    const managed = new Set(PLUGIN_CATALOG.filter(p => !this.isCorePlugin(p.id)).map(p => p.id));
    // Unknown/old IDs and stored core preferences are outside the shop's deletion scope.
    return commitInstalledIds(latest => latest.filter(id => !managed.has(id)));
  }
};
