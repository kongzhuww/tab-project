/**
 * SearchService — 纯 TypeScript 现代化综合搜索与联想推荐服务 (Zero DOM)
 * 提纯自历史脚本 newtab-discovery.js，承接 Web/B站/GitHub/网易云 跨源检索
 */

import {
  searchController,
  searchState,
  type SearchMode,
  type SearchSuggestionItem
} from "../search/store";
import { pluginSlots } from "../sdk/slots";
import { rankWebCandidates, searchUrlKey, type WebCandidate } from "../search/web-ranking";
import { neteaseService } from "./netease.service";
import { launcherService } from "./launcher.service";
import { bookmarksService } from "./bookmarks.service";
import { gitHubService, GH_SEARCH_SYNONYMS } from "./github.service";
import { readGitHubJson, loadGitHubReadHeaders, GitHubReadError } from "../github/api-client";
import { formatBiliCompactNumber } from "../bilibili/channel-format";
import {
  searchSlots,
  enabledSearchSlots,
  buildSlotSearchUrl,
  type SearchSlotDef
} from "../search/search-slots.store";

declare const chrome: any;

export type WebSearchScope = "all" | "bookmarks" | "launcher";

export const SEARCH_MODE_KEY = "logicweaverLauncherSearchMode";
export const SEARCH_MODES: SearchMode[] = ["web", "bilibili", "github", "netease", "qcc"];

export const SLASH_COMMANDS: SearchSuggestionItem[] = [
  {
    id: "slash_bm",
    title: "/bm [关键词]",
    meta: "限定范围：仅在浏览器书签中快速查找",
    type: "slash-command",
    rawCommand: "/bm ",
    badge: { className: "badge-bookmark", text: "书签限定", icon: "🔖" }
  },
  {
    id: "slash_sites",
    title: "/sites [关键词]",
    meta: "限定范围：仅在首页常用网站与分类中快速查找",
    type: "slash-command",
    rawCommand: "/sites ",
    badge: { className: "badge-launcher", text: "常用网站", icon: "⭐" }
  }
];

export interface SearchHistoryItem {
  url: string;
  title: string;
  iconSrc?: string;
  sourceType: "launcher" | "bookmark" | "web" | "history";
  visitedAt: number;
}

export interface SearchEngineDef {
  id: string;
  name: string;
  shortName: string;
  badgeClass: string;
  buildUrl: (keyword: string) => string;
}

export const SUPPORTED_SEARCH_ENGINES: Record<string, SearchEngineDef> = {
  bing: {
    id: "bing",
    name: "Bing 必应",
    shortName: "Bing",
    badgeClass: "badge-bing",
    buildUrl: (kw) => `https://www.bing.com/search?q=${encodeURIComponent(kw)}`
  },
  google: {
    id: "google",
    name: "Google 谷歌",
    shortName: "Google",
    badgeClass: "badge-google",
    buildUrl: (kw) => `https://www.google.com/search?q=${encodeURIComponent(kw)}`
  },
  baidu: {
    id: "baidu",
    name: "Baidu 百度",
    shortName: "百度",
    badgeClass: "badge-baidu",
    buildUrl: (kw) => `https://www.baidu.com/s?wd=${encodeURIComponent(kw)}`
  },
  duckduckgo: {
    id: "duckduckgo",
    name: "DuckDuckGo",
    shortName: "DDG",
    badgeClass: "badge-ddg",
    buildUrl: (kw) => `https://duckduckgo.com/?q=${encodeURIComponent(kw)}`
  }
};

export function getActiveSearchEngine(): SearchEngineDef {
  try {
    const key = (typeof localStorage !== "undefined" ? localStorage.getItem("searchEngine") : null) || "bing";
    if (key && SUPPORTED_SEARCH_ENGINES[key]) return SUPPORTED_SEARCH_ENGINES[key];
  } catch {}
  return SUPPORTED_SEARCH_ENGINES.bing;
}

if (typeof window !== "undefined") {
  window.addEventListener("logicweaver:search-engine-updated", (e: any) => {
    if (e?.detail && typeof localStorage !== "undefined") {
      try { localStorage.setItem("searchEngine", e.detail); } catch {}
    }
  });
}

const SEARCH_HISTORY_STORAGE_KEY = "logicweaver_search_click_history";

export class SearchService {
  private static instance: SearchService;
  private currentMode: SearchMode = "web";
  public get webScope(): WebSearchScope {
    const query = searchState.query.trim();
    return /^\/bm[\s:]/i.test(query) ? "bookmarks" : /^\/sites[\s:]/i.test(query) ? "launcher" : "all";
  }
  private suggestionEpoch = 0;
  private suggestTimer: number = 0;
  private abortController: AbortController | null = null;
  private biliRecCache: any[] = [];
  private clickHistory: SearchHistoryItem[] = [];

  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  private constructor() {
    this.initHistory();
    this.initMode();
    this.bindController();
  }

  private initHistory(): void {
    if (typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            this.clickHistory = parsed.filter((item: any) => item && typeof item.url === "string" &&
              typeof item.title === "string" && searchUrlKey(item.url) && Number.isFinite(item.visitedAt))
              .sort((a, b) => b.visitedAt - a.visitedAt).slice(0, 30);
          }
        }
      } catch {}
    }
  }

  public recordSearchClick(item: { url: string; title: string; iconSrc?: string; badge?: any }): void {
    if (!item.url || !searchUrlKey(item.url)) return;
    const cleanUrl = item.url.trim();
    // 过滤掉已有记录，置于数组最前方
    this.clickHistory = this.clickHistory.filter(h => h.url !== cleanUrl);

    let sourceType: SearchHistoryItem["sourceType"] = "web";
    const text = item.badge?.text || "";
    if (text.includes("常用网站")) sourceType = "launcher";
    else if (text.includes("书签")) sourceType = "bookmark";
    else if (text.includes("提炼")) sourceType = "history";

    this.clickHistory.unshift({
      url: cleanUrl,
      title: item.title || cleanUrl,
      iconSrc: item.iconSrc,
      sourceType,
      visitedAt: Date.now()
    });

    // 最多保留 30 条真实点击足迹
    if (this.clickHistory.length > 30) {
      this.clickHistory = this.clickHistory.slice(0, 30);
    }

    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(this.clickHistory));
      } catch {}
    }
  }

  private initMode(): void {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(SEARCH_MODE_KEY) as SearchMode | null;
      if (saved && SEARCH_MODES.includes(saved)) {
        this.currentMode = saved;
      }
    }
    searchController.setMode(this.currentMode);
  }

  private bindController(): void {
    searchController.setCycleModeAction(() => this.cycleMode());
    searchController.setQueryAction((query) => this.scheduleSuggestions(query));
    searchController.setClearAction(() => this.clearSuggestions());
    searchController.setSubmitAction((query) => this.submit(query));
    searchController.setFocusAction(() => this.handleFocus());
    searchController.setSuggestionClickAction((item) => this.handleSuggestionClick(item));
  }

  public getMode(): SearchMode {
    return this.currentMode;
  }

  public setMode(mode: SearchMode): void {
    const validSlot = searchSlots.value.find((s) => s.id === mode && s.enabled);
    if (!validSlot && !SEARCH_MODES.includes(mode)) {
      mode = enabledSearchSlots.value[0]?.id || "web";
    }
    this.currentMode = mode;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(SEARCH_MODE_KEY, mode);
    }
    searchController.setMode(mode);

    if (searchState.query.trim()) {
      this.scheduleSuggestions(searchState.query);
    } else {
      this.clearSuggestions();
    }
  }

  public cycleMode(): void {
    const slots = enabledSearchSlots.value;
    if (!slots || slots.length === 0) return;
    const idx = slots.findIndex((s) => s.id === this.currentMode);
    const nextSlot = slots[(idx + 1) % slots.length] || slots[0];
    this.setMode(nextSlot.id);
  }

  public scheduleSuggestions(query: string): void {
    clearTimeout(this.suggestTimer);
    this.abortController?.abort();
    ++this.suggestionEpoch;
    const q = query.trim();
    if (!q) {
      this.clearSuggestions();
      if (this.currentMode === "web") void this.loadWebRecentRecommendations();
      return;
    }
    // Do not leave an old history row clickable during the search debounce.
    searchController.setSuggestions([]);

    this.suggestTimer = window.setTimeout(() => {
      void this.fetchSuggestions(q);
    }, 180);
  }

  public handleFocus(): void {
    if (searchState.query.trim()) {
      if (this.currentMode === "web") this.scheduleSuggestions(searchState.query);
      return;
    }
    if (!searchState.query.trim()) {
      if (this.currentMode === "web") {
        void this.loadWebRecentRecommendations(true);
      } else if (this.currentMode === "bilibili") {
        void this.loadBilibiliRecommendations(true);
      } else if (this.currentMode === "github") {
        void this.loadGithubRecentRecommendations(true);
      } else if (this.currentMode === "netease") {
        void this.loadNeteaseRecentRecommendations(true);
      } else if (this.currentMode === "qcc") {
        void this.loadQccRecommendations(true);
      }
    }
  }

  private clearSuggestions(): void {
    clearTimeout(this.suggestTimer);
    ++this.suggestionEpoch;
    this.abortController?.abort();
    searchController.setSuggestions([]);
  }

  public async loadWebRecentRecommendations(_force = false): Promise<void> {
    if (this.currentMode !== "web" || searchState.query.trim()) return;
    this.initHistory();
    const seen = new Set<string>();
    const suggestions = this.clickHistory.flatMap(h => {
      const key = searchUrlKey(h.url);
      if (!key || seen.has(key)) return [];
      seen.add(key);
      return [{
        id: `hist_${encodeURIComponent(key)}`, title: h.title, meta: h.url, url: h.url,
        iconSrc: typeof h.iconSrc === "string" ? h.iconSrc : undefined,
        badge: { className: h.sourceType === "bookmark" ? "badge-bookmark" : h.sourceType === "launcher" ? "badge-launcher" : "badge-bing",
          text: h.sourceType === "bookmark" ? "历史书签" : h.sourceType === "launcher" ? "历史网站" : "历史访问", icon: "🕒" }
      }];
    }).slice(0, 10);
    searchController.setSuggestions(suggestions);
  }

  public async loadNeteaseRecentRecommendations(force = false): Promise<void> {
    const epoch = this.suggestionEpoch;
    let recent = neteaseService.getRecentSongs();
    if (!recent.length) {
      try {
        recent = await neteaseService.fetchAccountRecentSongs(10);
      } catch {}
    }
    if (epoch !== this.suggestionEpoch || this.currentMode !== "netease" || searchState.query.trim()) return;
    if (!recent.length) {
      this.clearSuggestions();
      return;
    }

    const suggestions: SearchSuggestionItem[] = recent.slice(0, 10).map((s: any) => {
      const artist = (s.artists || s.ar || []).map((a: any) => a.name).join(" / ") || "网易云音乐";
      return {
        id: `recent_${s.id}`,
        title: s.name,
        meta: artist,
        iconSrc: s.al?.picUrl || s.album?.picUrl || "assets/netease.svg",
        url: `https://music.163.com/#/song?id=${s.id}`,
        type: "netease-play",
        rawSong: s,
        badge: { className: "badge-netease", text: "最近听过", icon: "🎵" }
      };
    });

    if (epoch === this.suggestionEpoch && !searchState.query.trim() && this.currentMode === "netease") {
      searchController.setSuggestions(suggestions);
      searchController.setSuggestionsVisible(true);
    }
  }

  public async fetchSuggestions(query: string): Promise<void> {
    clearTimeout(this.suggestTimer);
    ++this.suggestionEpoch;
    this.abortController?.abort();
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    try {
      const trimmed = query.trim();

      // 🌟 Slash 快捷指令识别与气泡联想
      if (trimmed.startsWith("/") && !trimmed.includes(" ")) {
        const prefix = trimmed.toLowerCase();
        const matched = SLASH_COMMANDS.filter(cmd => cmd.rawCommand?.toLowerCase().startsWith(prefix) || cmd.title.toLowerCase().startsWith(prefix));
        searchController.setSuggestions(matched.length > 0 ? matched : SLASH_COMMANDS);
        searchController.setSuggestionsVisible(true);
        return;
      }

      if (trimmed.startsWith("/bm ") || trimmed.startsWith("/bm:")) {
        const kw = trimmed.replace(/^\/bm[\s:]*/i, "");
        await this.fetchWebSuggestions(kw, signal, "bookmarks");
      } else if (trimmed.startsWith("/sites ") || trimmed.startsWith("/sites:")) {
        const kw = trimmed.replace(/^\/sites[\s:]*/i, "");
        await this.fetchWebSuggestions(kw, signal, "launcher");
      } else if (this.currentMode === "bilibili") {
        await this.fetchBilibiliSuggestions(query, signal);
      } else if (this.currentMode === "github") {
        await this.fetchGithubSuggestions(query, signal);
      } else if (this.currentMode === "netease") {
        await this.fetchNeteaseSuggestions(query, signal);
      } else if (this.currentMode === "qcc") {
        await this.fetchQccSuggestions(query);
      } else if (this.currentMode === "web") {
        await this.fetchWebSuggestions(query, signal);
      } else {
        await this.fetchCustomSlotSuggestions(query, signal);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.warn("[SearchService] Fetch suggestions error:", err);
      }
    }
  }

  private async fetchBilibiliSuggestions(keyword: string, signal: AbortSignal): Promise<void> {
    const url = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(keyword)}&page=1&page_size=10`;
    const res = await fetch(url, { signal });
    const data = await res.json();
    if (signal.aborted) return;

    const videos = Array.isArray(data?.data?.result) ? data.data.result : [];
    const suggestions: SearchSuggestionItem[] = videos.slice(0, 8).map((item: any) => {
      const bvid = item.bvid || (item.param && String(item.param).startsWith("BV") ? item.param : "");
      const cleanTitle = (item.title || "").replace(/<[^>]+>/g, "");
      const pic = (item.pic || "").replace(/^http:/, "https:");
      return {
        id: bvid,
        title: cleanTitle,
        meta: `${item.author || ""} · ${item.play ? item.play + "播放" : ""}`,
        iconSrc: pic,
        url: `https://www.bilibili.com/video/${bvid}`,
        badge: { className: "badge-bilibili", text: "B站", icon: "📺" }
      };
    });

    suggestions.unshift({
      id: `search-${keyword}`,
      title: `在 B站 搜索 “${keyword}”`,
      meta: "按 Enter 或点击直达",
      iconSrc: "assets/bilibili.svg",
      url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(keyword)}`
    });

    searchController.setSuggestions(suggestions);
  }

  public async loadBilibiliRecommendations(force = false): Promise<void> {
    const epoch = this.suggestionEpoch;
    if (this.biliRecCache.length) {
      if (epoch === this.suggestionEpoch && !searchState.query.trim() && this.currentMode === "bilibili") {
        searchController.setSuggestions(this.biliRecCache);
        searchController.setSuggestionsVisible(true);
      }
      return;
    }

    try {
      const res = await fetch("https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3&feed_version=V8&fresh_idx_1h=1&fetch_row=1&fresh_idx=1&brush=1");
      const data = await res.json();
      if (data?.code === 0 && Array.isArray(data?.data?.item)) {
        const suggestions: SearchSuggestionItem[] = data.data.item.slice(0, 6).map((item: any) => {
          const bvid = item.bvid || "";
          const pic = (item.pic || "").replace(/^http:/, "https:");
          const ownerName = item.owner?.name || "";
          return {
            id: bvid,
            title: item.title || "",
            meta: `${ownerName} · 推荐视频`,
            iconSrc: pic,
            url: `https://www.bilibili.com/video/${bvid}`,
            badge: { className: "badge-bilibili", text: "B站", icon: "📺" }
          };
        });
        this.biliRecCache = suggestions;
        if (epoch === this.suggestionEpoch && !searchState.query.trim() && this.currentMode === "bilibili") {
          searchController.setSuggestions(suggestions);
          searchController.setSuggestionsVisible(true);
        }
      }
    } catch {}
  }

  private async getLocalGithubRepos(): Promise<any[]> {
    if (gitHubService.repos.length > 0) return gitHubService.repos;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get(["ghStarredCache"]);
        const cached = stored?.ghStarredCache;
        if (cached?.pages && typeof cached.pages === "object") {
          const list: any[] = [];
          Object.values(cached.pages).forEach((items: any) => {
            if (Array.isArray(items)) list.push(...items);
          });
          return list;
        }
      } catch {}
    }
    return [];
  }

  public async loadGithubRecentRecommendations(force = false): Promise<void> {
    const epoch = this.suggestionEpoch;
    const repos = await this.getLocalGithubRepos();
    if (epoch !== this.suggestionEpoch || this.currentMode !== "github" || searchState.query.trim()) return;
    if (!repos.length) {
      this.clearSuggestions();
      return;
    }
    const suggestions: SearchSuggestionItem[] = repos.slice(0, 8).map((r: any) => ({
      id: `gh-rec-${r.id || r.name}`,
      title: r.full_name || r.name,
      meta: `${r.description || "已星标仓库"} · ⭐ ${formatBiliCompactNumber(r.stargazers_count || 0)}${r.language ? " · " + r.language : ""}`,
      iconSrc: r.owner?.avatar_url || "assets/nav-github.svg",
      url: r.html_url || `https://github.com/${r.full_name || r.name}`,
      badge: { className: "badge-github", text: "星标项目", icon: "★" }
    }));
    searchController.setSuggestions(suggestions);
    searchController.setSuggestionsVisible(true);
  }

  private async fetchGithubSuggestions(keyword: string, signal: AbortSignal): Promise<void> {
    const repos = await this.getLocalGithubRepos();
    if (signal.aborted) return;

    const q = keyword.trim().toLowerCase();
    const matched = repos
      .filter((r: any) => (r.name || r.full_name || "").toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q))
      .slice(0, 6);

    const suggestions: SearchSuggestionItem[] = matched.map((r: any) => ({
      id: String(r.id || r.name),
      title: r.full_name || r.name,
      meta: `${r.description || "已星标仓库"} · ⭐ ${formatBiliCompactNumber(r.stargazers_count || 0)}`,
      iconSrc: r.owner?.avatar_url || "assets/nav-github.svg",
      url: r.html_url || `https://github.com/${r.full_name || r.name}`,
      badge: { className: "badge-github", text: "已星标", icon: "★" }
    }));

    const rule = gitHubService.searchRule || "exact";
    const ruleNames: Record<string, string> = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" };
    const ruleIcons: Record<string, string> = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" };
    const ruleName = ruleNames[rule] || "精确";
    const ruleIcon = ruleIcons[rule] || "🎯";

    suggestions.unshift({
      id: `gh-search-${keyword}`,
      title: `在 GitHub 搜索 “${keyword}”`,
      meta: "点击直接在界面内搜索 · 按 Enter 跳转网页",
      iconSrc: "assets/nav-github.svg",
      type: "github-search-trigger",
      rawQuery: keyword,
      badge: { className: "badge-github", text: ruleName, icon: ruleIcon }
    });

    if (!signal.aborted) searchController.setSuggestions(suggestions);
  }

  public async searchGithubOnline(keyword: string): Promise<void> {
    const q = keyword.trim();
    if (!q) return;
    this.abortController?.abort();
    const request = new AbortController(); this.abortController = request;
    const epoch = ++this.suggestionEpoch, mode = this.currentMode;
    const current = () => !request.signal.aborted && this.abortController === request && epoch === this.suggestionEpoch && mode === this.currentMode && searchState.query.trim() === q;

    const rule = gitHubService.searchRule || "exact";
    const ruleNames: Record<string, string> = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" };
    const ruleIcons: Record<string, string> = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" };
    const ruleName = ruleNames[rule] || "精确";
    const ruleIcon = ruleIcons[rule] || "🎯";

    searchController.setSuggestions([
      {
        id: "gh-search-loading",
        title: `正在以「${ruleName}」模式搜索 GitHub 仓库…`,
        meta: `关键词：“${q}”，请稍候…`,
        iconSrc: "assets/nav-github.svg",
        badge: { className: "badge-github", text: "搜索中", icon: "⏳" }
      }
    ]);
    searchController.setSuggestionsVisible(true);

    let ghQuery = q;
    if (rule === "exact") {
      ghQuery = `"${q}" in:name,description`;
    } else if (rule === "topic") {
      ghQuery = `topic:${q.replace(/\s+/g, "-")}`;
    } else if (rule === "smart") {
      const synonyms = (GH_SEARCH_SYNONYMS as any)[q.toLowerCase()] || [];
      if (synonyms.length > 0) {
        ghQuery = `${q} ${synonyms.slice(0, 3).join(" OR ")}`;
      }
    }

    try {
      const headers = await loadGitHubReadHeaders(request.signal);
      if (!current()) return;
      const { data } = await readGitHubJson<{ items?: unknown }>(`/search/repositories?q=${encodeURIComponent(ghQuery)}&sort=stars&order=desc&per_page=10`, { headers, signal: request.signal, maxBytes: 1024 * 1024 });
      if (!current()) return;
      if (!Array.isArray(data?.items)) throw new GitHubReadError("format", "GitHub 搜索响应格式异常，没有当作空结果。");
      const items: any[] = data.items;

      if (!items.length) {
        searchController.setSuggestions([
          {
            id: `gh-empty-${q}`,
            title: `未找到与 “${q}” 相关的 GitHub 仓库`,
            meta: "可点击切换右侧规则（精确/模糊/标签/智能）或按 Enter 网页直达",
            iconSrc: "assets/nav-github.svg",
            url: `https://github.com/search?q=${encodeURIComponent(q)}`,
            badge: { className: "badge-github", text: "无结果", icon: "∅" }
          }
        ]);
        return;
      }

      const results: SearchSuggestionItem[] = items.map((r: any) => ({
        id: `gh-online-${r.id}`,
        title: r.full_name || r.name,
        meta: `${r.description || "暂无描述"} · ⭐ ${formatBiliCompactNumber(r.stargazers_count || 0)}${r.language ? " · " + r.language : ""}`,
        iconSrc: r.owner?.avatar_url || "assets/nav-github.svg",
        url: r.html_url || `https://github.com/${r.full_name || r.name}`,
        badge: { className: "badge-github", text: ruleName, icon: ruleIcon }
      }));

      results.unshift({
        id: `gh-header-${q}`,
        title: `GitHub「${ruleName}」搜索结果 (${items.length} 个)`,
        meta: "点击仓库条目直接访问 · 回车可在 GitHub 网页完整查看",
        iconSrc: "assets/nav-github.svg",
        url: `https://github.com/search?q=${encodeURIComponent(q)}`,
        badge: { className: "badge-github", text: "回车直达", icon: "↵" }
      });

      searchController.setSuggestions(results);
      searchController.setSuggestionsVisible(true);
    } catch (err: unknown) {
      if (!current()) return;
      searchController.setSuggestions([
        {
          id: `gh-error-${q}`,
          title: `GitHub 检索失败：${err instanceof GitHubReadError ? err.message : "响应处理异常"}`,
          meta: "请按具体错误检查账号、权限或网络；按 Enter 可直接跳转网页版搜索",
          iconSrc: "assets/nav-github.svg",
          url: `https://github.com/search?q=${encodeURIComponent(q)}`,
          badge: { className: "badge-github", text: "网页重试", icon: "⚠" }
        }
      ]);
      searchController.setSuggestionsVisible(true);
    }
  }

  private async fetchNeteaseSuggestions(keyword: string, signal: AbortSignal): Promise<void> {
    try {
      const url = `https://music.163.com/api/search/get/web?csrf_token=&hlpretag=&hlposttag=&s=${encodeURIComponent(keyword)}&type=1&offset=0&total=true&limit=8`;
      const res = await fetch(url, { signal });
      const data = await res.json();
      if (signal.aborted) return;

      const songs = data.result?.songs || [];
      const suggestions: SearchSuggestionItem[] = songs.map((s: any) => ({
        id: `ne_${s.id}`,
        title: s.name,
        meta: (s.artists || []).map((a: any) => a.name).join(" / ") || "网易云音乐",
        iconSrc: "assets/netease.svg",
        url: `https://music.163.com/#/song?id=${s.id}`,
        badge: { className: "badge-netease", text: "网易云", icon: "🎵" }
      }));

      suggestions.unshift({
        id: `ne-search-${keyword}`,
        title: `在 网易云音乐 搜索 “${keyword}”`,
        meta: "按 Enter 或点击直达",
        iconSrc: "assets/netease.svg",
        url: `https://music.163.com/#/search/m/?s=${encodeURIComponent(keyword)}`
      });

      searchController.setSuggestions(suggestions);
    } catch {}
  }

  private async fetchWebSuggestions(keyword: string, signal: AbortSignal, scope: WebSearchScope = "all"): Promise<void> {
    if (!keyword.trim() || signal.aborted) return;
    const candidates: WebCandidate[] = [];
    const iconFor = (url: string) => {
      try { return chrome.runtime.getURL(`_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`); } catch { return undefined; }
    };
    const publish = () => {
      if (signal.aborted) return;
      const suggestions = rankWebCandidates(keyword, candidates);
      if (scope === "all") {
        const engine = getActiveSearchEngine();
        suggestions.push({
          id: `${engine.id}-${keyword}`, title: `${engine.shortName} 搜索 “${keyword}”`,
          meta: `按 Enter 默认使用 ${engine.name} 检索`, url: engine.buildUrl(keyword),
          badge: { className: engine.badgeClass, text: engine.shortName, icon: "⌕" }
        });
      }
      searchController.setSuggestions(suggestions);
    };
    if (scope === "all") {
      this.initHistory();
      for (const h of this.clickHistory) candidates.push({
        source: "history", visitedAt: h.visitedAt,
        item: { id: `hist_${encodeURIComponent(h.url)}`, title: h.title, meta: h.url, url: h.url,
          iconSrc: typeof h.iconSrc === "string" ? h.iconSrc : iconFor(h.url),
          badge: { className: "badge-bing", text: "历史", icon: "🕒" } }
      });
    }
    if (scope === "all" || scope === "launcher") {
      for (const link of launcherService.getState().links || []) {
        if (!link.url) continue;
        candidates.push({ source: "launcher", item: {
          id: `launcher_${link.id}`, title: link.title || link.url, meta: link.url, url: link.url,
          iconSrc: launcherService.getCachedIcon(link.url) || link.customIcon || link.icon || iconFor(link.url),
          badge: { className: "badge-launcher", text: "常用网站", icon: "⭐" }
        } });
      }
    }
    publish(); // History and saved sites are usable while the bookmark worker runs.
    if ((scope === "all" || scope === "bookmarks") && typeof chrome !== "undefined" && chrome.bookmarks?.search) {
      try {
        let bookmarks = await bookmarksService.searchBookmarksViaWorker(keyword, 100, signal);
        if (signal.aborted) return;
        if (bookmarks === null) bookmarks = await chrome.bookmarks.search(keyword);
        if (signal.aborted) return;
        const ignored = await bookmarksService.getIgnoredFolders();
        await bookmarksService.ensureBookmarkData();
        if (signal.aborted) return;
        const folderMap = bookmarksService.getBookmarkFolderMap();
        for (const bookmark of bookmarks || []) {
          if (!bookmark.url || bookmarksService.isBookmarkIgnored(bookmark, ignored, folderMap)) continue;
          candidates.push({ source: "bookmark", fuzzyMatch: true, item: {
            id: `bm_${bookmark.id}`, title: bookmark.title || bookmark.url, meta: bookmark.url, url: bookmark.url,
            iconSrc: iconFor(bookmark.url), badge: { className: "badge-bookmark", text: "书签", icon: "🔖" }
          } });
        }
      } catch { /* Keep already available history and sites; cancellation is checked before publishing. */ }
    }
    if (signal.aborted) return;
    publish();
    if (scope !== "all") return;
    const extra = await pluginSlots.querySearchProviders(keyword, signal);
    if (signal.aborted) return;
    for (const item of extra) candidates.push({ item, source: "plugin", fuzzyMatch: true });
    if (extra.length) publish();
  }

  public async loadQccRecommendations(force = false): Promise<void> {
    const suggestions: SearchSuggestionItem[] = [
      {
        id: "qcc-hot-1",
        title: "查知名科技企业（腾讯、阿里、字节…）",
        meta: "输入企业名称按回车直接进入企查查",
        iconSrc: "",
        url: "https://www.qcc.com/",
        badge: { className: "badge-qcc", text: "企查查", icon: "🏢" }
      },
      {
        id: "qcc-hot-2",
        title: "查法定代表人 / 股东高管",
        meta: "直接输入人名 + 公司名组合查询",
        iconSrc: "",
        url: "https://www.qcc.com/",
        badge: { className: "badge-qcc", text: "查老板", icon: "👤" }
      },
      {
        id: "qcc-hot-3",
        title: "查企业统一社会信用代码 / 税号",
        meta: "输入 18 位信用代码精准验真",
        iconSrc: "",
        url: "https://www.qcc.com/",
        badge: { className: "badge-qcc", text: "查税号", icon: "📄" }
      }
    ];

    if (force || (!searchState.query.trim() && this.currentMode === "qcc")) {
      searchController.setSuggestions(suggestions);
      searchController.setSuggestionsVisible(true);
    }
  }

  private async fetchQccSuggestions(keyword: string): Promise<void> {
    const kw = keyword.trim();
    if (!kw) {
      searchController.setSuggestions([]);
      return;
    }

    const suggestions: SearchSuggestionItem[] = [
      {
        id: `qcc-${kw}`,
        title: `在 企查查 搜索 “${kw}”`,
        meta: "按 Enter 或点击直达企查查企业结果",
        url: `https://www.qcc.com/web/search?key=${encodeURIComponent(kw)}`,
        badge: { className: "badge-qcc", text: "企查查", icon: "🏢" }
      },
      {
        id: `tyc-${kw}`,
        title: `在 天眼查 搜索 “${kw}”`,
        meta: "天眼查企业商业征信与工商档案",
        url: `https://www.tianyancha.com/search?key=${encodeURIComponent(kw)}`,
        badge: { className: "badge-tyc", text: "天眼查", icon: "👁️" }
      },
      {
        id: `aqc-${kw}`,
        title: `在 爱企查 搜索 “${kw}”`,
        meta: "百度爱企查免费基础工商信息查询",
        url: `https://aiqicha.baidu.com/s?q=${encodeURIComponent(kw)}`,
        badge: { className: "badge-aqc", text: "爱企查", icon: "🔍" }
      }
    ];

    searchController.setSuggestions(suggestions);
  }

  private async fetchCustomSlotSuggestions(keyword: string, signal: AbortSignal): Promise<void> {
    const kw = keyword.trim();
    if (!kw) {
      searchController.setSuggestions([]);
      return;
    }
    const slot = searchSlots.value.find((s) => s.id === this.currentMode);
    if (!slot) {
      await this.fetchWebSuggestions(keyword, signal);
      return;
    }

    const suggestions: SearchSuggestionItem[] = [];

    // 第一项：直达搜索
    suggestions.push({
      id: `${slot.id}-${kw}`,
      title: `在 ${slot.name} 搜索 “${kw}”`,
      meta: `按 Enter 或点击在新标签页立即检索`,
      iconSrc: slot.iconType === "svg" ? slot.iconValue : undefined,
      url: buildSlotSearchUrl(slot, kw),
      badge: {
        className: "badge-custom",
        text: slot.name,
        icon: slot.iconType !== "svg" ? slot.iconValue : "⌕"
      }
    });

    // 如果配置了自定义建议接口
    if (slot.suggestUrl) {
      try {
        const suggestUrl = slot.suggestUrl.replace(/\{query\}/g, encodeURIComponent(kw));
        const res = await fetch(suggestUrl, { signal });
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[1])) {
          for (const item of data[1].slice(0, 6)) {
            if (typeof item === "string" && item.trim()) {
              suggestions.push({
                id: `${slot.id}-sug-${item}`,
                title: item,
                meta: `${slot.name} 联想词`,
                url: buildSlotSearchUrl(slot, item),
                badge: {
                  className: "badge-custom",
                  text: slot.name,
                  icon: "⌕"
                }
              });
            }
          }
        }
      } catch {}
    }

    if (!signal.aborted) {
      searchController.setSuggestions(suggestions);
    }
  }

  public submit(query?: string): void {
    const q = (query !== undefined ? query : searchState.query).trim();
    if (!q) return;

    if (searchState.suggestions.length > 0 && searchState.suggestions[0]?.type === "slash-command") {
      this.handleSuggestionClick(searchState.suggestions[0]);
      return;
    }

    if (this.currentMode === "bilibili") {
      this.openUrl(`https://search.bilibili.com/all?keyword=${encodeURIComponent(q)}`);
    } else if (this.currentMode === "github") {
      this.openUrl(`https://github.com/search?q=${encodeURIComponent(q)}`);
    } else if (this.currentMode === "netease") {
      this.openUrl(`https://music.163.com/#/search/m/?s=${encodeURIComponent(q)}`);
    } else if (this.currentMode === "qcc") {
      this.openUrl(`https://www.qcc.com/web/search?key=${encodeURIComponent(q)}`);
    } else {
      // 检查是否为自定义搜索栏位
      const customSlot = searchSlots.value.find((s) => s.id === this.currentMode);
      if (customSlot && !customSlot.isBuiltin) {
        this.openUrl(buildSlotSearchUrl(customSlot, q));
        return;
      }

      // 在“书签”或“常用网站”专属模式下，若已有匹配项，回车优先直接打开第一个匹配结果
      if (this.webScope !== "all" && searchState.suggestions.length > 0 && searchState.suggestions[0]?.url) {
        this.openUrl(searchState.suggestions[0].url);
        return;
      }
      // 网址直接打开，否则使用默认搜索引擎搜索
      if (/^(https?:\/\/|[a-z0-9-]+\.[a-z]{2,})/i.test(q)) {
        const url = /^https?:\/\//i.test(q) ? q : `https://${q}`;
        this.openUrl(url);
      } else {
        const engine = getActiveSearchEngine();
        this.openUrl(engine.buildUrl(q));
      }
    }
  }

  public handleSuggestionClick(item: any): void {
    if (item.type === "slash-command" && item.rawCommand) {
      searchController.setQuery(item.rawCommand);
      searchController.focus();
      void this.fetchSuggestions(item.rawCommand);
      return;
    }
    if (item.type === "open-settings") {
      void import("../core/window-manager.store").then(({ windowManagerController }) => {
        windowManagerController.open("settings");
      });
      return;
    }
    if (item.type === "github-search-trigger" && item.rawQuery) {
      void this.searchGithubOnline(item.rawQuery);
      return;
    }
    if (item.type === "netease-play" && item.rawSong) {
      const win = typeof window !== "undefined" ? (window as any) : null;
      if (win?.LogicWeaverHomeMusic?.playNetease) {
        win.LogicWeaverHomeMusic.playNetease(item.rawSong);
        return;
      }
    }
    // 🌟 核心记录：只要用户从推荐或搜索结果中点击了某个网站，立即记录并持久化到历史中！
    if (item.url) {
      this.recordSearchClick(item);
      this.openUrl(item.url);
    } else {
      this.submit(item.title);
    }
  }

  private openUrl(url: string): void {
    if (typeof chrome !== "undefined" && chrome.tabs?.create) {
      chrome.tabs.create({ url, active: true });
    } else {
      window.open(url, "_blank");
    }
  }
}

export const searchService = SearchService.getInstance();
