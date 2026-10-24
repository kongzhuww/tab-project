import { ref, computed } from "vue";
import { getActiveSearchEngine } from "../services/search.service";

export interface SearchSlotDef {
  id: string;
  name: string;
  placeholder: string;
  iconType: "text" | "svg" | "url";
  iconValue: string;
  themeColor: string;
  searchUrl: string;
  suggestUrl?: string;
  enabled: boolean;
  isBuiltin: boolean;
}

export const SEARCH_SLOT_TEMPLATES: Omit<SearchSlotDef, "id" | "isBuiltin" | "enabled">[] = [
  {
    name: "YouTube",
    placeholder: "搜索 YouTube 精彩视频与博主…",
    iconType: "text",
    iconValue: "🎬",
    themeColor: "#f43f5e",
    searchUrl: "https://www.youtube.com/results?search_query={query}"
  },
  {
    name: "小红书",
    placeholder: "在小红书搜索生活笔记、经验与灵感…",
    iconType: "text",
    iconValue: "📕",
    themeColor: "#ff2442",
    searchUrl: "https://www.xiaohongshu.com/search_result?keyword={query}"
  },
  {
    name: "知乎",
    placeholder: "在知乎搜索精彩问答与深度讨论…",
    iconType: "text",
    iconValue: "💡",
    themeColor: "#0084ff",
    searchUrl: "https://www.zhihu.com/search?q={query}"
  },
  {
    name: "Google 学术",
    placeholder: "检索学术论文、期刊文献与引用…",
    iconType: "text",
    iconValue: "🎓",
    themeColor: "#4285f4",
    searchUrl: "https://scholar.google.com/scholar?q={query}"
  },
  {
    name: "DeepSeek 对话",
    placeholder: "输入 Prompt，直达 DeepSeek 开启智能对话…",
    iconType: "text",
    iconValue: "🤖",
    themeColor: "#0066ff",
    searchUrl: "https://chat.deepseek.com/?q={query}"
  },
  {
    name: "淘宝",
    placeholder: "在淘宝搜索心仪好物与好价…",
    iconType: "text",
    iconValue: "🛍️",
    themeColor: "#ff5000",
    searchUrl: "https://s.taobao.com/search?q={query}"
  }
];

export const DEFAULT_BUILTIN_SLOTS: SearchSlotDef[] = [
  {
    id: "web",
    name: "网页综合",
    placeholder: "搜索，或输入网址直接打开",
    iconType: "text",
    iconValue: "⌕",
    themeColor: "#38bdf8",
    searchUrl: "https://www.bing.com/search?q={query}",
    enabled: true,
    isBuiltin: true
  },
  {
    id: "bilibili",
    name: "哔哩哔哩",
    placeholder: "搜索 B站 视频、UP主、番剧…（回车在 B站 打开）",
    iconType: "svg",
    iconValue: "assets/bilibili.svg",
    themeColor: "#fb7299",
    searchUrl: "https://search.bilibili.com/all?keyword={query}",
    enabled: true,
    isBuiltin: true
  },
  {
    id: "github",
    name: "GitHub",
    placeholder: "精准搜索 GitHub 仓库…",
    iconType: "svg",
    iconValue: "assets/nav-github.svg",
    themeColor: "#a855f7",
    searchUrl: "https://github.com/search?q={query}",
    enabled: true,
    isBuiltin: true
  },
  {
    id: "netease",
    name: "网易云音乐",
    placeholder: "搜索网易云音乐歌曲、歌手…（回车搜索，点击播放）",
    iconType: "svg",
    iconValue: "assets/netease.svg",
    themeColor: "#ef4444",
    searchUrl: "https://music.163.com/#/search/m/?s={query}",
    enabled: true,
    isBuiltin: true
  },
  {
    id: "qcc",
    name: "企查查",
    placeholder: "搜索企业、法定代表人、统一信用代码…（回车企查查直达）",
    iconType: "text",
    iconValue: "🏢",
    themeColor: "#0284c7",
    searchUrl: "https://www.qcc.com/web/search?key={query}",
    enabled: true,
    isBuiltin: true
  }
];

const STORAGE_KEY = "tab_project_search_slots";

export const searchSlots = ref<SearchSlotDef[]>(loadInitialSlots());

function loadInitialSlots(): SearchSlotDef[] {
  if (typeof localStorage === "undefined") {
    return JSON.parse(JSON.stringify(DEFAULT_BUILTIN_SLOTS));
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // 合并保证内置栏位不丢失必要字段
        const result = parsed.map((item: any) => {
          const builtin = DEFAULT_BUILTIN_SLOTS.find((b) => b.id === item.id);
          if (builtin) {
            return {
              ...builtin,
              ...item,
              isBuiltin: true
            };
          }
          return {
            ...item,
            isBuiltin: false
          };
        });
        if (!result.some((s: SearchSlotDef) => s.enabled)) {
          for (const s of result) {
            if (s.isBuiltin) s.enabled = true;
          }
        }
        return result;
      }
    }
  } catch (err) {
    console.warn("[SearchSlots] Failed to parse stored slots:", err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_BUILTIN_SLOTS));
}

// 异步从 chrome.storage.local 同步
if (typeof chrome !== "undefined" && chrome.storage?.local) {
  chrome.storage.local.get([STORAGE_KEY], (res: any) => {
    if (res?.[STORAGE_KEY] && Array.isArray(res[STORAGE_KEY])) {
      const parsed = res[STORAGE_KEY];
      if (parsed.length > 0) {
        const result = parsed.map((item: any) => {
          const builtin = DEFAULT_BUILTIN_SLOTS.find((b) => b.id === item.id);
          if (builtin) {
            return {
              ...builtin,
              ...item,
              isBuiltin: true
            };
          }
          return {
            ...item,
            isBuiltin: false
          };
        });
        if (!result.some((s: SearchSlotDef) => s.enabled)) {
          for (const s of result) {
            if (s.isBuiltin) s.enabled = true;
          }
        }
        searchSlots.value = result;
      }
    }
  });
}

export const enabledSearchSlots = computed(() => {
  const list = searchSlots.value.filter((s) => s.enabled);
  return list.length > 0 ? list : DEFAULT_BUILTIN_SLOTS.slice(0, 1);
});

export function persistSlots(): void {
  const plainSlots = JSON.parse(JSON.stringify(searchSlots.value));
  const raw = JSON.stringify(plainSlots);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, raw);
    }
  } catch {}

  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    try {
      chrome.storage.local.set({ [STORAGE_KEY]: plainSlots });
    } catch {}
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tab-project:search-slots-updated", {
      detail: plainSlots
    }));
  }
}

export function addSearchSlot(slotData: Omit<SearchSlotDef, "id" | "isBuiltin" | "enabled">): SearchSlotDef {
  const id = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const newSlot: SearchSlotDef = {
    ...slotData,
    id,
    enabled: true,
    isBuiltin: false
  };
  searchSlots.value.push(newSlot);
  persistSlots();
  return newSlot;
}

export function updateSearchSlot(id: string, updates: Partial<SearchSlotDef>): void {
  const idx = searchSlots.value.findIndex((s) => s.id === id);
  if (idx !== -1) {
    searchSlots.value[idx] = {
      ...searchSlots.value[idx],
      ...updates
    };
    persistSlots();
  }
}

export function deleteSearchSlot(id: string): void {
  const idx = searchSlots.value.findIndex((s) => s.id === id);
  if (idx !== -1) {
    if (searchSlots.value[idx].isBuiltin) {
      // 内置项不可物理删除，仅禁用
      searchSlots.value[idx].enabled = false;
    } else {
      searchSlots.value.splice(idx, 1);
    }
    persistSlots();
  }
}

export function toggleSearchSlot(id: string): void {
  const slot = searchSlots.value.find((s) => s.id === id);
  if (slot) {
    // 保证至少保留一个启用的栏位
    const enabledCount = searchSlots.value.filter((s) => s.enabled).length;
    if (slot.enabled && enabledCount <= 1) {
      return;
    }
    slot.enabled = !slot.enabled;
    persistSlots();
  }
}

export function moveSearchSlot(id: string, direction: "up" | "down"): void {
  const idx = searchSlots.value.findIndex((s) => s.id === id);
  if (idx === -1) return;
  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= searchSlots.value.length) return;

  const [removed] = searchSlots.value.splice(idx, 1);
  searchSlots.value.splice(targetIdx, 0, removed);
  persistSlots();
}

export function resetSearchSlotsToDefault(): void {
  searchSlots.value = JSON.parse(JSON.stringify(DEFAULT_BUILTIN_SLOTS));
  persistSlots();
}

export function buildSlotSearchUrl(slot: SearchSlotDef, query: string): string {
  if (slot.id === "web") {
    // 网页模式动态采用当前选中的默认搜索引擎（Bing/Google/Baidu/DDG）
    const engine = getActiveSearchEngine();
    return engine.buildUrl(query);
  }
  const template = slot.searchUrl || "https://www.bing.com/search?q={query}";
  const encoded = encodeURIComponent(query.trim());
  if (template.includes("{query}")) {
    return template.replace(/\{query\}/g, encoded);
  }
  if (template.includes("%s")) {
    return template.replace(/%s/g, encoded);
  }
  return `${template}${template.includes("?") ? "&" : "?"}q=${encoded}`;
}
