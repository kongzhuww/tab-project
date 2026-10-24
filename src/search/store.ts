import { reactive, readonly } from "vue";

export type SearchMode = "web" | "bilibili" | "github" | "netease" | "qcc" | string;

export interface SearchSuggestionBadge {
  icon?: string;
  text?: string;
  title?: string;
  className?: string;
}

export interface SearchSuggestionItem {
  id: string;
  title: string;
  meta?: string;
  iconSrc?: string;
  url?: string;
  badge?: SearchSuggestionBadge;
  type?: string;
  rawQuery?: string;
  rawCommand?: string;
  rawSong?: any;
}

export interface SearchStateSnapshot {
  mode: SearchMode;
  query: string;
  hasQuery: boolean;
  placeholder: string;
  toggleTitle: string;
  toggleAriaLabel: string;
  modeIconSrc: string;
  modeIconText: string;
  modeColor?: string;
  modeName?: string;
  suggestions: readonly any[];
  isSuggestionsVisible: boolean;
  updatedAt: number | null;
}

export interface SearchController {
  update(snapshot: Partial<SearchStateSnapshot>): void;
  setMode(mode: SearchMode): void;
  setQuery(query: string): void;
  clear(): void;
  submit(query?: string): void;
  cycleMode(): void;
  focus(): void;
  setSuggestions(items: SearchSuggestionItem[]): void;
  setSuggestionsVisible(visible: boolean): void;
  onSuggestionClick(item: SearchSuggestionItem): void;
  setSuggestionClickAction(handler: (item: SearchSuggestionItem) => void): void;
  setQueryAction(handler: (query: string) => void): void;
  setCycleModeAction(handler: () => void): void;
  setClearAction(handler: () => void): void;
  setSubmitAction(handler: (query?: string) => void): void;
  setFocusAction(handler: () => void): void;
  readonly snapshot: Readonly<SearchStateSnapshot>;
}

export const SEARCH_MODE_METAS: Record<SearchMode, {
  placeholder: string;
  title: string;
  iconSrc: string;
  iconText: string;
}> = {
  web: {
    placeholder: "搜索，或输入网址直接打开",
    title: "当前为网页搜索，点击切换为 B站 搜索",
    iconSrc: "",
    iconText: "⌕"
  },
  bilibili: {
    placeholder: "搜索 B站 视频、UP主、番剧…（回车在 B站 打开）",
    title: "当前为 B站 搜索，点击切换为 GitHub 仓库搜索",
    iconSrc: "assets/bilibili.svg",
    iconText: ""
  },
  github: {
    placeholder: "精准搜索 GitHub 仓库…",
    title: "当前为 GitHub 仓库搜索，点击切换为网易云音乐搜索",
    iconSrc: "assets/nav-github.svg",
    iconText: ""
  },
  netease: {
    placeholder: "搜索网易云音乐歌曲、歌手…（回车搜索，点击播放）",
    title: "当前为网易云音乐搜索，点击切换为企查查企业搜索",
    iconSrc: "assets/netease.svg",
    iconText: ""
  },
  qcc: {
    placeholder: "搜索企业、法定代表人、统一信用代码…（回车企查查直达）",
    title: "当前为企查查企业搜索，点击切换为网页搜索",
    iconSrc: "",
    iconText: "🏢"
  }
};

const initialMode: SearchMode = "web";
const initialMeta = SEARCH_MODE_METAS[initialMode];

const initialState = (): SearchStateSnapshot => ({
  mode: initialMode,
  query: "",
  hasQuery: false,
  placeholder: initialMeta.placeholder,
  toggleTitle: initialMeta.title,
  toggleAriaLabel: initialMeta.title,
  modeIconSrc: initialMeta.iconSrc,
  modeIconText: initialMeta.iconText,
  modeColor: "#38bdf8",
  modeName: "网页",
  suggestions: [],
  isSuggestionsVisible: false,
  updatedAt: null
});

export const searchState = reactive<SearchStateSnapshot>(initialState());

let cycleModeHandler: (() => void) | null = null;
let clearHandler: (() => void) | null = null;
let submitHandler: ((query?: string) => void) | null = null;
let focusHandler: (() => void) | null = null;
let suggestionClickHandler: ((item: SearchSuggestionItem) => void) | null = null;
let queryHandler: ((query: string) => void) | null = null;

export const searchController: SearchController = {
  get snapshot() {
    return readonly(searchState);
  },
  update(snapshot) {
    Object.assign(searchState, snapshot);
    if (snapshot.query !== undefined) {
      searchState.hasQuery = Boolean(snapshot.query.trim());
    }
  },
  setMode(mode) {
    // 动态优先从 searchSlots 中提取元数据
    import("./search-slots.store").then(({ searchSlots }) => {
      const slot = searchSlots.value.find((s) => s.id === mode);
      if (slot) {
        searchState.mode = slot.id;
        searchState.placeholder = slot.placeholder;
        searchState.toggleTitle = `当前为 ${slot.name} 搜索，点击切换下一个模式`;
        searchState.toggleAriaLabel = `切换搜索模式（当前：${slot.name}）`;
        searchState.modeIconSrc = slot.iconType === "svg" ? slot.iconValue : "";
        searchState.modeIconText = slot.iconType !== "svg" ? slot.iconValue : "";
        searchState.modeColor = slot.themeColor || "#38bdf8";
        searchState.modeName = slot.name;
        searchState.updatedAt = Date.now();
        return;
      }
      const meta = (SEARCH_MODE_METAS as any)[mode] || SEARCH_MODE_METAS.web;
      searchState.mode = mode;
      searchState.placeholder = meta.placeholder;
      searchState.toggleTitle = meta.title;
      searchState.toggleAriaLabel = meta.title;
      searchState.modeIconSrc = meta.iconSrc;
      searchState.modeIconText = meta.iconText;
      searchState.modeColor = "#38bdf8";
      searchState.modeName = mode;
      searchState.updatedAt = Date.now();
    }).catch(() => {
      const meta = (SEARCH_MODE_METAS as any)[mode] || SEARCH_MODE_METAS.web;
      searchState.mode = mode;
      searchState.placeholder = meta.placeholder;
      searchState.toggleTitle = meta.title;
      searchState.toggleAriaLabel = meta.title;
      searchState.modeIconSrc = meta.iconSrc;
      searchState.modeIconText = meta.iconText;
      searchState.updatedAt = Date.now();
    });
  },
  setQuery(query) {
    searchState.query = query;
    searchState.hasQuery = Boolean(query.trim());
    searchState.updatedAt = Date.now();
    if (queryHandler) {
      queryHandler(query);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("logicweaver:search-query", { detail: { query } }));
    }
  },
  setQueryAction(handler) {
    queryHandler = handler;
  },
  setSuggestions(items) {
    searchState.suggestions = Array.isArray(items) ? [...items] : [];
    searchState.isSuggestionsVisible = searchState.suggestions.length > 0;
    searchState.updatedAt = Date.now();
  },
  setSuggestionsVisible(visible) {
    searchState.isSuggestionsVisible = Boolean(visible);
    searchState.updatedAt = Date.now();
  },
  onSuggestionClick(item) {
    searchState.isSuggestionsVisible = false;
    if (suggestionClickHandler) {
      suggestionClickHandler(item);
    } else if (item.url) {
      window.open(item.url, "_blank");
    } else {
      searchController.submit(item.title);
    }
  },
  setSuggestionClickAction(handler) {
    suggestionClickHandler = handler;
  },
  clear() {
    searchState.query = "";
    searchState.hasQuery = false;
    searchState.suggestions = [];
    searchState.isSuggestionsVisible = false;
    searchState.updatedAt = Date.now();
    if (clearHandler) clearHandler();
    else window.dispatchEvent(new CustomEvent("logicweaver:search-clear"));
  },
  submit(query) {
    const q = query !== undefined ? query : searchState.query;
    searchState.isSuggestionsVisible = false;
    if (submitHandler) submitHandler(q);
    else window.dispatchEvent(new CustomEvent("logicweaver:search-submit", { detail: { query: q } }));
  },
  cycleMode() {
    if (cycleModeHandler) cycleModeHandler();
    else window.dispatchEvent(new CustomEvent("logicweaver:search-cycle-mode"));
  },
  focus() {
    if (focusHandler) focusHandler();
    else window.dispatchEvent(new CustomEvent("logicweaver:search-focus"));
  },
  setCycleModeAction(handler) {
    cycleModeHandler = handler;
  },
  setClearAction(handler) {
    clearHandler = handler;
  },
  setSubmitAction(handler) {
    submitHandler = handler;
  },
  setFocusAction(handler) {
    focusHandler = handler;
  }
};
