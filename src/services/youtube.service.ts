import {
  youTubeController,
  youTubeState,
  type YouTubeVideoItem,
  type YouTubeChannelItem,
  type StoredYouTubePlaylist
} from "../youtube/youtube-store";

import { loadYouTubeSettings, DEFAULT_YOUTUBE_SETTINGS } from "../youtube/settings";
import { readFavoriteSnapshot, writeFavoriteSnapshot, type FavoriteSnapshot } from "../youtube/favorites-storage";

declare const chrome: any;

export interface StoredYouTubeChannel {
  id: string;
  name: string;
  handle?: string;
  group?: string;
  thumbnail?: string;
}

export interface StoredYouTubeCache {
  savedAt: number;
  items: Array<{
    videoId: string;
    title: string;
    channel: string;
    channelId: string;
    publishedAt: string;
    views?: string;
    thumbnail: string;
    group?: string;
  }>;
}

const YOUTUBE_CHANNELS_KEY = "youtubeRssChannelsV1";
const YOUTUBE_GROUPS_KEY = "youtubeCustomGroupsV1";
const YOUTUBE_CACHE_KEY = "youtubeRssVideosCacheV1";
const YOUTUBE_PLAYLISTS_KEY = "youtubePlaylistsV1";
const YOUTUBE_RECOMMEND_BATCH_KEY = "youtubeRecommendBatchV1";
const YOUTUBE_CACHE_TTL = 15 * 60 * 1000; // 15 分钟缓存

export interface StoredRecommendBatch {
  savedAt: number;
  userName?: string;
  videos: YouTubeVideoItem[];
}

export const DEFAULT_GROUPS = ["默认"];

export const DEFAULT_CHANNELS: StoredYouTubeChannel[] = [];

export const DEFAULT_PLAYLISTS: StoredYouTubePlaylist[] = [];

export const RECOMMEND_CATEGORY_CHIPS = [
  { id: "personal", label: "✨ 账号专属推荐" },
  { id: "trending", label: "🔥 热门精选" }
];

// 各分类代表性频道
const CATEGORY_FEEDS: Record<string, string[]> = {};

function storageGet(keys: string[]): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.get(keys, resolve);
    } else {
      const res: Record<string, any> = {};
      keys.forEach((k) => {
        try {
          const val = localStorage.getItem(k);
          if (val) res[k] = JSON.parse(val);
        } catch {}
      });
      resolve(res);
    }
  });
}

function storageSet(items: Record<string, any>): Promise<void> {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set(items, resolve);
    } else {
      Object.entries(items).forEach(([k, v]) => {
        try {
          localStorage.setItem(k, JSON.stringify(v));
        } catch {}
      });
      resolve();
    }
  });
}

export function parsePublishedTimeToTimestamp(val: string | number | undefined): number {
  if (!val) return 0;
  const ts = new Date(val).getTime();
  if (!isNaN(ts) && ts > 0) return ts;
  const now = Date.now();
  const m = String(val).match(/(\d+)\s*(秒|分|小时|天|周|月|年|second|minute|hour|day|week|month|year)/i);
  if (!m) return now - 86400000 * 30;
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  if (unit.startsWith("秒") || unit.startsWith("second")) return now - n * 1000;
  if (unit.startsWith("分") || unit.startsWith("minute")) return now - n * 60 * 1000;
  if (unit.startsWith("小时") || unit.startsWith("hour")) return now - n * 3600 * 1000;
  if (unit.startsWith("天") || unit.startsWith("day")) return now - n * 86400 * 1000;
  if (unit.startsWith("周") || unit.startsWith("week")) return now - n * 7 * 86400 * 1000;
  if (unit.startsWith("月") || unit.startsWith("month")) return now - n * 30 * 86400 * 1000;
  if (unit.startsWith("年") || unit.startsWith("year")) return now - n * 365 * 86400 * 1000;
  return now - 86400000 * 30;
}

export function youtubeRelativeTime(value: string | number | undefined): string {
  if (!value) return "";
  if (
    typeof value === "string" &&
    (value.includes("前") || value.includes("ago") || value.includes("Streamed") || value.includes("Premiered"))
  ) {
    return value;
  }
  const timestamp = new Date(value).getTime();
  if (!timestamp || isNaN(timestamp)) return String(value);
  const minutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  return days < 30 ? `${days} 天前` : new Date(timestamp).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}

export function formatViews(viewsStr?: string | number): string {
  if (!viewsStr) return "";
  const num = typeof viewsStr === "number" ? viewsStr : parseInt(String(viewsStr).replace(/,/g, ""), 10);
  if (isNaN(num)) return String(viewsStr);
  if (num >= 100000000) return `${(num / 100000000).toFixed(1)}亿次观看`;
  if (num >= 10000) return `${(num / 10000).toFixed(1)}万次观看`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k次观看`;
  return `${num}次观看`;
}

import { readYouTubeMessage, readYouTubeText } from "../youtube/read-request";

export class YouTubeService {
  private channels: StoredYouTubeChannel[] = [];
  private channelsLoaded = false;
  private initialized = false;
  private groups: string[] = [];
  private groupsLoaded = false;

  private favorites: YouTubeVideoItem[] = [];
  private favoritesLoaded = false;
  private favoriteReadVersion = 0;
  private favoriteRead?: Promise<YouTubeVideoItem[]>;

  private playlists: StoredYouTubePlaylist[] = [];
  private playlistsLoaded = false;

  private exploreCache: Record<string, YouTubeVideoItem[]> = {};
  private recommendGeneration = 0;
  private recommendationRead: AbortController | null = null;
  private recommendationViewSignal?: AbortSignal;

  setRecommendationViewSignal(signal: AbortSignal): void {
    this.recommendationViewSignal = signal;
  }

  private beginRecommendationRead(parent?: AbortSignal) {
    parent?.throwIfAborted();
    this.recommendationRead?.abort();
    const controller = new AbortController();
    const generation = ++this.recommendGeneration;
    this.recommendationRead = controller;
    const current = () => generation === this.recommendGeneration && !controller.signal.aborted;
    const abort = () => {
      controller.abort();
      if (generation === this.recommendGeneration) youTubeController.updateState({ isLoading: false, isLoadingMore: false });
    };
    parent?.addEventListener("abort", abort, { once: true });
    const timer = setTimeout(() => {
      if (generation === this.recommendGeneration) youTubeController.updateState({ error: "推荐读取超时，请手动刷新。" });
      abort();
    }, 45000);
    return {
      signal: controller.signal, current,
      finish: () => {
        clearTimeout(timer);
        parent?.removeEventListener("abort", abort);
        if (generation === this.recommendGeneration) {
          this.recommendationRead = null;
          youTubeController.updateState({ isLoading: false, isLoadingMore: false });
        }
      }
    };
  }
  private recommendSignature = "";
  public lastContinuationToken: string = "";

  // -------------------------------------------------------------
  // 1. 频道与分组管理
  // -------------------------------------------------------------
  async loadGroups(): Promise<string[]> {
    if (this.groupsLoaded) return this.groups;
    const stored = await storageGet([YOUTUBE_GROUPS_KEY]);
    const existing = (Array.isArray(stored[YOUTUBE_GROUPS_KEY]) ? stored[YOUTUBE_GROUPS_KEY] : [])
      .filter((g: string) => g !== "ASMR·癒し" && g !== "AI与前沿");
    const channelGroups = this.channels.map((c) => c.group || "默认");
    const set = new Set([...DEFAULT_GROUPS, ...channelGroups, ...existing]);
    this.groups = Array.from(set).filter(Boolean);
    this.groupsLoaded = true;
    youTubeController.updateState({ groups: this.groups });
    return this.groups;
  }

  async saveGroups(groups?: string[]): Promise<void> {
    if (groups) this.groups = groups;
    await storageSet({ [YOUTUBE_GROUPS_KEY]: this.groups });
    youTubeController.updateState({ groups: this.groups });
  }

  async loadChannels(): Promise<StoredYouTubeChannel[]> {
    if (this.channelsLoaded) return this.channels;
    const stored = await storageGet([YOUTUBE_CHANNELS_KEY]);
    let channels = stored[YOUTUBE_CHANNELS_KEY];

    const obsoleteIds = new Set([
      "UCxSgwgB3P1H0U9zSgG7eY4Q",
      "UCYQ1rN3zZ7Yj1zVw4aX8aBw",
      "UC5Z_F3x_cW9X2p2E9W1sL5Q",
      "UCgK4c6Q4wQp7e9m1X2z3A4B",
      "UCVHFbqXqoYvEWM1Ddxl0QDg",
      "UCBJycsmduvYEL83R_U4JriQ",
      "UCHnyfMqiRRG1u-2MsSQLbXA",
      "UCsTcErHg8oDvUnTzoqsYeNw",
      "UCsBjURrPoezykLs9EqgamOA",
      "UCRC3Vi-rL7mopaKFI4Du2Rw",
      "UC-jDxvKrM-QBqcDMzSvBn4A",
      "UCfPwtmjVXsByl4z8TT32Lbg",
      "UClqNSqnWeOOUVkzcJFj4rBw",
      "UCe4jUOmQPKMDvOkzJpDfMRQ",
      "UCbfYPyITQ-EYgqIZ34qPqTQ",
      "UCnUYZLuoy1rq1aVMwx4aTzw",
      "UCSHZKyawb77ixDdsGog4iWA"
    ]);

    if (!Array.isArray(channels) || channels.length === 0) {
      channels = [];
      await storageSet({ [YOUTUBE_CHANNELS_KEY]: channels });
    } else {
      channels = channels.filter((c: StoredYouTubeChannel) => !obsoleteIds.has(c.id));
      await storageSet({ [YOUTUBE_CHANNELS_KEY]: channels });
    }
    this.channels = channels;
    this.channelsLoaded = true;
    const channelItems: YouTubeChannelItem[] = this.channels.map((c) => ({
      id: c.id,
      title: c.name,
      handle: c.handle,
      group: c.group || "默认",
      thumbnail: c.thumbnail
    }));
    youTubeController.updateState({ channels: channelItems });
    await this.loadGroups();
    return this.channels;
  }

  async saveChannels(channels?: StoredYouTubeChannel[]): Promise<void> {
    if (channels) this.channels = channels;
    await storageSet({ [YOUTUBE_CHANNELS_KEY]: this.channels });
    const channelItems: YouTubeChannelItem[] = this.channels.map((c) => ({
      id: c.id,
      title: c.name,
      handle: c.handle,
      group: c.group || "默认",
      thumbnail: c.thumbnail
    }));
    youTubeController.updateState({ channels: channelItems });
    await this.loadGroups();
  }

  async addChannel(channelInput: StoredYouTubeChannel | string): Promise<boolean> {
    await this.loadChannels();
    let id = "";
    let name = "";
    let group = "默认";
    let handle = "";

    if (typeof channelInput === "string") {
      id = channelInput.trim();
    } else {
      id = channelInput.id.trim();
      name = channelInput.name?.trim() || "";
      group = channelInput.group?.trim() || "默认";
      handle = channelInput.handle?.trim() || "";
    }

    // 智能解析：如果用户直接粘贴了 YouTube 频道主页 URL 或 @handle
    if (id.includes("@") || id.startsWith("http")) {
      try {
        const handleMatch = id.match(/@([a-zA-Z0-9_.-]+)/);
        if (handleMatch) handle = `@${handleMatch[1]}`;
        const targetUrl = handle ? `https://www.youtube.com/${handle}` : id;
        const res: any = await new Promise((resolve) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: targetUrl }, resolve);
        });
        const html = res?.html || "";
        const m = html.match(/channel_id=(UC[a-zA-Z0-9_-]+)/) || html.match(/"channelId":"(UC[a-zA-Z0-9_-]+)"/);
        if (m) id = m[1];
        const titleMatch = html.match(/<title>(.*?) - YouTube<\/title>/i) || html.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && !name) name = titleMatch[1].trim();
      } catch {}
    }

    if (!id.startsWith("UC")) return false;
    if (!name) name = handle || id;

    const exists = this.channels.some((c) => c.id === id);
    if (!exists) {
      this.channels.push({ id, name, group, handle });
      await this.saveChannels();
      return true;
    }
    return false;
  }

  async removeChannel(channelId: string): Promise<boolean> {
    await this.loadChannels();
    const prevLen = this.channels.length;
    this.channels = this.channels.filter((c) => c.id !== channelId);
    if (this.channels.length !== prevLen) {
      await this.saveChannels();
      return true;
    }
    return false;
  }

  /**
   * 从当前浏览器登录的 YouTube 账号自动同步关注的所有频道
   */
  async syncSubscribedChannels(): Promise<number> {
    youTubeController.updateState({ isLoading: true, error: "" });
    try {
      let html = "";
      try {
        html = await new Promise<string>((resolve, reject) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/feed/channels" }, (res: any) => {
            if (res && res.ok && res.html) resolve(res.html);
            else reject(new Error(res?.error || "后台请求失败"));
          });
        });
      } catch {
        const resp = await fetch("https://www.youtube.com/feed/channels", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        html = await resp.text();
      }
      const match =
        html.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) ||
        html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
      if (!match) throw new Error("未能获取频道列表，请确保已在当前浏览器登录 YouTube");
      const data = JSON.parse(match[1]);
      const channels: StoredYouTubeChannel[] = [];
      const seen = new Set<string>();

      const walk = (node: any) => {
        if (!node || typeof node !== "object") return;
        if (node.channelRenderer) {
          const ch = node.channelRenderer;
          const id = ch.channelId;
          const title = ch.title?.simpleText || ch.title?.runs?.[0]?.text;
          if (id && title && !seen.has(id)) {
            seen.add(id);
            channels.push({
              id,
              name: title,
              group: "YouTube 关注",
              thumbnail: ch.thumbnail?.thumbnails?.[0]?.url
            });
          }
        }
        for (const k of Object.keys(node)) walk(node[k]);
      };
      walk(data);

      if (channels.length === 0) {
        throw new Error("未解析到关注频道，请确认是否已登录 YouTube");
      }

      await this.loadChannels();
      let addedCount = 0;
      for (const ch of channels) {
        if (!this.channels.some((c) => c.id === ch.id)) {
          this.channels.push(ch);
          addedCount++;
        }
      }
      await this.saveChannels();
      await this.loadUpdates(true);
      return addedCount;
    } catch (err: any) {
      youTubeController.updateState({ isLoading: false, error: err?.message || "同步关注频道失败" });
      throw err;
    }
  }

  parseOpml(opmlXml: string): StoredYouTubeChannel[] {
    const doc = new DOMParser().parseFromString(opmlXml, "application/xml");
    const outlines = Array.from(doc.querySelectorAll("outline[xmlUrl], outline[xmlurl]"));
    const channels: StoredYouTubeChannel[] = [];
    outlines.forEach((outline) => {
      const xmlUrl = outline.getAttribute("xmlUrl") || outline.getAttribute("xmlurl") || "";
      const match = xmlUrl.match(/channel_id=([a-zA-Z0-9_-]+)/);
      if (match) {
        const id = match[1];
        const name = (outline.getAttribute("title") || outline.getAttribute("text") || "YouTube 频道").trim();
        channels.push({ id, name, group: "导入" });
      }
    });
    return channels;
  }

  exportOpml(): string {
    const lines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<opml version="1.1">',
      "  <head>",
      "    <title>LogicWeaver YouTube 订阅导出</title>",
      "  </head>",
      "  <body>",
      '    <outline text="YouTube Subscriptions" title="YouTube Subscriptions">'
    ];
    this.channels.forEach((c) => {
      const name = (c.name || "YouTube Channel")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      lines.push(
        `      <outline text="${name}" title="${name}" type="rss" xmlUrl="https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(c.id)}"/>`
      );
    });
    lines.push("    </outline>", "  </body>", "</opml>");
    return lines.join("\n");
  }

  // -------------------------------------------------------------
  // 2. 官方原生 XML / RSS 极速免配额解析引擎（通过后台保证无 CORS 限制）
  // -------------------------------------------------------------
  async fetchChannelVideosFromRss(channelId: string, fallbackName = "", signal?: AbortSignal): Promise<YouTubeVideoItem[]> {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
    try {
      let text = "";
      try {
        const response = await readYouTubeMessage({ type: "fetchYouTubeHtml", url }, signal);
        text = response.html;
        if (typeof text !== "string") throw new Error("Invalid RSS response");
      } catch {
        signal?.throwIfAborted();
        text = await readYouTubeText(url, { cache: "no-store", referrerPolicy: "no-referrer" }, signal, 6000);
      }
      signal?.throwIfAborted();
      return this.parseRssXml(text, fallbackName, channelId);
    } catch {
      signal?.throwIfAborted();
      return [];
    }
  }

  async fetchPlaylistVideos(playlistId: string): Promise<YouTubeVideoItem[]> {
    const cleanId = playlistId.replace(/^https?:\/\/.*?list=/i, "").replace(/^VL/i, "").trim();
    const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(cleanId)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(url, { signal: controller.signal, cache: "no-store", referrerPolicy: "no-referrer" });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const list = this.parseRssXml(text, "播放列表");
      youTubeController.updateState({ playlistVideos: list, activePlaylistId: cleanId });
      return list;
    } finally {
      clearTimeout(timeout);
    }
  }

  private parseRssXml(xmlText: string, fallbackAuthor = "YouTube", channelId = ""): YouTubeVideoItem[] {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    const feedTitle = doc.querySelector("feed > title")?.textContent || fallbackAuthor;
    const entries = Array.from(doc.querySelectorAll("entry"));
    return entries
      .map((entry) => {
        const videoId =
          entry.getElementsByTagNameNS("http://www.youtube.com/xml/schemas/2015", "videoId")[0]?.textContent ||
          entry.querySelector("videoId")?.textContent ||
          (entry.querySelector("id")?.textContent || "").replace(/^yt:video:/, "");
        const title = entry.querySelector("title")?.textContent || "YouTube 视频";
        const author = entry.querySelector("author > name")?.textContent || feedTitle;
        const publishedAt = entry.querySelector("published")?.textContent || "";
        const mediaGroup =
          entry.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "group")[0] ||
          entry.querySelector("group");
        const mediaThumb =
          mediaGroup?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0] ||
          mediaGroup?.querySelector("thumbnail");
        const thumbnail =
          mediaThumb?.getAttribute("url") || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "");
        const rawViews =
          mediaGroup?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "statistics")[0]?.getAttribute("views") ||
          "";
        return {
          id: videoId,
          title,
          channelTitle: author,
          channelId: channelId || entry.querySelector("channelId")?.textContent || "",
          publishedAt: youtubeRelativeTime(publishedAt),
          thumbnail,
          views: formatViews(rawViews),
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        };
      })
      .filter((item) => item.id && !/^Deleted video$|^Private video$/i.test(item.title));
  }

  // -------------------------------------------------------------
  // 3. 订阅更新流
  // -------------------------------------------------------------
  async loadUpdates(force = false): Promise<YouTubeVideoItem[]> {
    await this.loadChannels();
    youTubeController.updateState({ isLoading: true, error: "" });

    if (!force) {
      const cached = (await storageGet([YOUTUBE_CACHE_KEY]))[YOUTUBE_CACHE_KEY] as StoredYouTubeCache | undefined;
      if (cached?.items?.length && Date.now() - Number(cached.savedAt || 0) < YOUTUBE_CACHE_TTL) {
        const videos: YouTubeVideoItem[] = cached.items.map((v) => ({
          id: v.videoId,
          title: v.title,
          channelTitle: v.channel,
          channelId: v.channelId,
          publishedAt: youtubeRelativeTime(v.publishedAt),
          views: v.views,
          thumbnail: v.thumbnail,
          group: v.group,
          videoUrl: `https://www.youtube.com/watch?v=${v.videoId}`
        }));
        youTubeController.updateState({
          videos,
          isLoading: false,
          userName: `已订阅 ${this.channels.length} 个频道`
        });
        return videos;
      }
    }

    if (!this.channels.length) {
      youTubeController.updateState({ videos: [], isLoading: false });
      return [];
    }

    try {
      const batchLimit = 5;
      const results: YouTubeVideoItem[][] = [];
      for (let i = 0; i < this.channels.length; i += batchLimit) {
        const chunk = this.channels.slice(i, i + batchLimit);
        const chunkResults = await Promise.all(
          chunk.map(async (ch) => {
            try {
              const vids = await this.fetchChannelVideosFromRss(ch.id, ch.name);
              return vids.map((v) => ({ ...v, group: ch.group || "默认" }));
            } catch {
              return [];
            }
          })
        );
        results.push(...chunkResults);
      }

      const seen = new Set<string>();
      const allVideos: YouTubeVideoItem[] = [];
      results.flat().forEach((video) => {
        if (video?.id && !seen.has(video.id)) {
          seen.add(video.id);
          allVideos.push(video);
        }
      });

      allVideos.sort((a, b) => {
        const tA = parsePublishedTimeToTimestamp(a.publishedAt);
        const tB = parsePublishedTimeToTimestamp(b.publishedAt);
        return tB - tA;
      });

      const topVideos = allVideos.slice(0, 60);
      if (topVideos.length > 0) {
        await storageSet({
          [YOUTUBE_CACHE_KEY]: {
            savedAt: Date.now(),
            items: topVideos.map((v) => ({
              videoId: v.id,
              title: v.title,
              channel: v.channelTitle,
              channelId: v.channelId || "",
              publishedAt: v.publishedAt,
              views: v.views,
              thumbnail: v.thumbnail,
              group: v.group
            }))
          }
        });
      }

      youTubeController.updateState({
        videos: topVideos,
        isLoading: false,
        userName: `已订阅 ${this.channels.length} 个频道`
      });
      return topVideos;
    } catch (err: any) {
      youTubeController.updateState({
        isLoading: false,
        error: err.message || "拉取视频动态失败"
      });
      return [];
    }
  }

  // -------------------------------------------------------------
  // 4. ✨ 真实专属个性推荐流（18个一批，点击换一批无缝刷新，无分页器）
  // -------------------------------------------------------------
  private recommendPool: YouTubeVideoItem[] = [];
  private shownVideoIds = new Set<string>();
  public readonly RECOMMEND_PAGE_SIZE = 18;

  async getCachedRecommendBatch(): Promise<StoredRecommendBatch | null> {
    try {
      const stored = await storageGet([YOUTUBE_RECOMMEND_BATCH_KEY]);
      const cached = stored[YOUTUBE_RECOMMEND_BATCH_KEY] as StoredRecommendBatch | undefined;
      if (cached && Array.isArray(cached.videos) && cached.videos.length > 0) {
        return cached;
      }
    } catch {
      // storage get failure
    }
    return null;
  }

  private async saveCachedRecommendBatch(videos: YouTubeVideoItem[], userName: string): Promise<void> {
    if (!videos || !videos.length) return;
    try {
      const data: StoredRecommendBatch = {
        savedAt: Date.now(),
        userName,
        videos
      };
      await storageSet({ [YOUTUBE_RECOMMEND_BATCH_KEY]: data });
    } catch {
      // storage set failure
    }
  }

  async loadRecommend(force = false, parent = this.recommendationViewSignal): Promise<YouTubeVideoItem[]> {
    if (parent?.aborted) return [];
    const read = this.beginRecommendationRead(parent);
    const current = read.current;

    try {
      // 1. 非强制刷新（没有点击“换一批”），优先复用当前界面
      if (!force && youTubeState.exploreVideos.length > 0) {
        return youTubeState.exploreVideos;
      }

      // 1.1 非强制刷新，且内存为空时（新打开标签页/重启浏览器），优先从本地持久化缓存恢复
      if (!force) {
        const cached = await this.getCachedRecommendBatch();
        if (cached && cached.videos.length > 0) {
          youTubeController.updateState({
            exploreVideos: cached.videos,
            isLoading: false,
            error: "",
            userName: cached.userName || "账号专属推荐",
            currentPage: 1
          });
          cached.videos.forEach((v) => this.shownVideoIds.add(v.id));
          return cached.videos;
        }
      }

      // 2. 如果池子里有现成的未看视频 >= 18 个，直接切出 18 个（真正的换一批，0ms 极速响应）
      if (this.recommendPool.length >= this.RECOMMEND_PAGE_SIZE) {
        const nextBatch = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
        nextBatch.forEach((v) => this.shownVideoIds.add(v.id));
        youTubeController.updateState({
          exploreVideos: nextBatch,
          isLoading: false,
          error: "",
          userName: "账号专属推荐 · 换一批",
          currentPage: 1
        });
        void this.saveCachedRecommendBatch(nextBatch, "账号专属推荐 · 换一批");
        // 若剩余库存较少，且有 continuationToken，后台静默补充池子
        if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken) {
          void this.fetchContinuationVideos(this.lastContinuationToken);
        }
        return nextBatch;
      }

      // 3. 池子不够 18 个，展示 loading 状态开始获取
      youTubeController.updateState({ isLoading: true, error: "" });

      // 若有 continuationToken，优先通过 continuation 拉取下一批新视频补充
      if (this.lastContinuationToken) {
        try {
          const continuationVideos = await this.fetchContinuationVideos(this.lastContinuationToken, read.signal);
          if (current()) {
            for (const v of continuationVideos) {
              if (!this.shownVideoIds.has(v.id) && !this.recommendPool.some((p) => p.id === v.id)) {
                this.recommendPool.push(v);
              }
            }
          }
        } catch {
          // continuation 失败时回退到重新拉取首页流
        }
      }

      // 4. 若依然不足 18 个，重新从官方算法流抓取全新首页推荐
      if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE) {
        const continuation = { token: "" };
        const fresh = await this.fetchPersonalRecommendations(read.signal, continuation);
        if (!current()) return [];

        this.lastContinuationToken = continuation.token;
        // 过滤掉本轮已看过的视频，避免换一批出现刚看过的
        const unseen = fresh.filter((v) => !this.shownVideoIds.has(v.id));
        const candidate = unseen.length >= 10 ? unseen : fresh;
        if (candidate === fresh) this.shownVideoIds.clear();

        for (const v of candidate) {
          if (!this.recommendPool.some((p) => p.id === v.id)) {
            this.recommendPool.push(v);
          }
        }
      }

      if (!current()) return [];

      // 5. 从池中取出恰好 18 个作为当前批次
      const currentBatch = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
      currentBatch.forEach((v) => this.shownVideoIds.add(v.id));

      if (currentBatch.length === 0) {
        youTubeController.updateState({
          isLoading: false,
          error: "未获取到推荐视频，请检查网络或 YouTube 登录状态。",
          userName: "暂无推荐"
        });
        return [];
      }

      youTubeController.updateState({
        exploreVideos: currentBatch,
        isLoading: false,
        error: "",
        userName: "账号专属推荐",
        currentPage: 1
      });
      void this.saveCachedRecommendBatch(currentBatch, "账号专属推荐");

      // 6. 后台静默预取下一页补足池子，为下一次用户点击“换一批”做好准备
      if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken) {
        void this.fetchContinuationVideos(this.lastContinuationToken);
      }

      return currentBatch;
    } catch {
      if (current()) {
        youTubeController.updateState({
          isLoading: false,
          error: "获取推荐失败，请稍后点击换一批重试。"
        });
      }
      return [];
    } finally {
      read.finish();
    }
  }

  async fetchContinuationVideos(token: string, signal?: AbortSignal): Promise<YouTubeVideoItem[]> {
    if (!token) return [];
    const continuation = { token: "" };
    try {
      const response = await readYouTubeMessage({
        type: "fetchYouTubeInnerTube", endpoint: "browse", payload: { continuation: token }
      }, signal, 4500);
      const items = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(response.data)};</script>`, continuation);
      this.lastContinuationToken = continuation.token === token ? "" : continuation.token;
      return items;
    } catch {
      return [];
    }
  }

  /**
   * 从 HTML 或 InnerTube JSON 提取完整的 YouTube 视频结构（全面适配最新 2024+ lockupViewModel、桌面端 videoRenderer、playlistVideoRenderer、并彻底过滤广告）
   */
  public extractVideosFromHtml(html: string, continuation?: { token: string }): YouTubeVideoItem[] {
    if (continuation) continuation.token = "";
    const match =
      html.match(/(?:window\["ytInitialData"\]|var ytInitialData|ytInitialData)\s*=\s*({.+?});(?:\s*<\/script>|\s*var|\s*window)/) ||
      html.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) ||
      html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
    if (!match) return [];
    try {
      const data = JSON.parse(match[1]);
      const list: YouTubeVideoItem[] = [];
      const seen = new Set<string>();

      const addVideo = (item: YouTubeVideoItem | null) => {
        if (!item || !item.id || seen.has(item.id)) return;
        seen.add(item.id);
        list.push(item);
      };

      // 广告与推广特征识别函数（彻底过滤商业赞助、插播广告、推广卡片）
      const isAdContent = (node: any): boolean => {
        if (!node || typeof node !== "object") return false;
        if (
          node.adSlotRenderer ||
          node.inFeedAdLayoutRenderer ||
          node.promotedSparklesWebRenderer ||
          node.promotedVideoRenderer ||
          node.statementBannerRenderer ||
          node.adBreakRenderer
        ) return true;
        const text = JSON.stringify(
          node.badges || node.badge || node.navigationEndpoint || node.contentType || node.layoutType || ""
        ).toLowerCase();
        if (text.includes("sponsored") || text.includes("广告") || text.includes("赞助") || text.includes("promoted")) {
          return true;
        }
        return false;
      };

      // 1. 最新 YouTube 官方 Polymer 视图模型: lockupViewModel 解析器
      const parseLockup = (vm: any): YouTubeVideoItem | null => {
        if (!vm || isAdContent(vm)) return null;
        const videoId =
          vm.contentId ||
          vm.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId;
        if (!videoId || typeof videoId !== "string" || videoId.length < 8) return null;

        const metaVm = vm.metadata?.lockupMetadataViewModel;
        const title =
          metaVm?.title?.content ||
          metaVm?.title?.runs?.[0]?.text ||
          metaVm?.title?.simpleText ||
          vm.contentImage?.thumbnailViewModel?.image?.accessibilityText ||
          "YouTube 视频";

        let channel = "";
        let views = "";
        let publishedAt = "";

        const rows = metaVm?.metadata?.contentMetadataViewModel?.metadataRows;
        if (Array.isArray(rows)) {
          const r0 = rows[0]?.metadataParts;
          if (Array.isArray(r0) && r0[0]?.text?.content) {
            channel = r0[0].text.content;
          }
          const r1 = rows[1]?.metadataParts;
          if (Array.isArray(r1)) {
            if (r1[0]?.text?.content) views = r1[0].text.content;
            if (r1[1]?.text?.content) publishedAt = r1[1].text.content;
          }
        }

        let thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const imgSources = vm.contentImage?.thumbnailViewModel?.image?.sources;
        if (Array.isArray(imgSources) && imgSources.length > 0) {
          thumb = imgSources.slice(-1)[0]?.url || thumb;
        }

        return {
          id: videoId,
          title,
          channelTitle: channel || "YouTube",
          publishedAt,
          views: formatViews(views),
          thumbnail: thumb,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        };
      };

      // 2. 深度扫描：全方位解析标准视频卡片、播放列表卡片、网格卡片并严防广告
      const walk = (node: any, depth = 0) => {
        if (!node || typeof node !== "object" || depth > 24 || list.length >= 80) return;

        // 遇到广告节点立即跳过
        if (isAdContent(node)) return;

        if (node.lockupViewModel) {
          addVideo(parseLockup(node.lockupViewModel));
          return;
        }

        // 桌面端标准视频卡片: videoRenderer
        if (node.videoRenderer && !isAdContent(node.videoRenderer)) {
          const v = node.videoRenderer;
          if (v && v.videoId) {
            addVideo({
              id: v.videoId,
              title: v.title?.runs?.[0]?.text || v.title?.simpleText || "YouTube 视频",
              channelTitle:
                v.ownerText?.runs?.[0]?.text ||
                v.shortBylineText?.runs?.[0]?.text ||
                v.longBylineText?.runs?.[0]?.text ||
                "YouTube 频道",
              channelId:
                v.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId ||
                v.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId ||
                "",
              publishedAt: v.publishedTimeText?.simpleText || "",
              views: formatViews(v.viewCountText?.simpleText || v.shortViewCountText?.simpleText),
              thumbnail:
                v.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/watch?v=${v.videoId}`
            });
            return;
          }
        }

        // 官方播放列表/收藏/点赞视频专用渲染器: playlistVideoRenderer
        if (node.playlistVideoRenderer && !isAdContent(node.playlistVideoRenderer)) {
          const pv = node.playlistVideoRenderer;
          if (pv && pv.videoId) {
            const viewsText = pv.videoInfo?.runs?.[0]?.text || "";
            const pubText = pv.videoInfo?.runs?.[2]?.text || pv.videoInfo?.runs?.[1]?.text || "";
            addVideo({
              id: pv.videoId,
              title: pv.title?.runs?.[0]?.text || pv.title?.simpleText || "YouTube 视频",
              channelTitle:
                pv.shortBylineText?.runs?.[0]?.text ||
                pv.ownerText?.runs?.[0]?.text ||
                "YouTube 频道",
              channelId:
                pv.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
              publishedAt: pubText || pv.lengthText?.simpleText || "",
              views: formatViews(viewsText),
              thumbnail:
                pv.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${pv.videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/watch?v=${pv.videoId}`
            });
            return;
          }
        }

        // 网格视频渲染器: gridVideoRenderer
        if (node.gridVideoRenderer && !isAdContent(node.gridVideoRenderer)) {
          const gv = node.gridVideoRenderer;
          if (gv && gv.videoId) {
            addVideo({
              id: gv.videoId,
              title: gv.title?.runs?.[0]?.text || gv.title?.simpleText || "YouTube 视频",
              channelTitle:
                gv.shortBylineText?.runs?.[0]?.text ||
                gv.ownerText?.runs?.[0]?.text ||
                "YouTube 频道",
              channelId:
                gv.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
              publishedAt: gv.publishedTimeText?.simpleText || "",
              views: formatViews(gv.viewCountText?.simpleText),
              thumbnail:
                gv.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${gv.videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/watch?v=${gv.videoId}`
            });
            return;
          }
        }

        // 紧凑流视频渲染器: compactVideoRenderer
        if (node.compactVideoRenderer && !isAdContent(node.compactVideoRenderer)) {
          const cv = node.compactVideoRenderer;
          if (cv && cv.videoId) {
            addVideo({
              id: cv.videoId,
              title: cv.title?.runs?.[0]?.text || cv.title?.simpleText || "YouTube 视频",
              channelTitle:
                cv.shortBylineText?.runs?.[0]?.text ||
                cv.longBylineText?.runs?.[0]?.text ||
                "YouTube 频道",
              channelId:
                cv.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
              publishedAt: cv.publishedTimeText?.simpleText || "",
              views: formatViews(cv.viewCountText?.simpleText),
              thumbnail:
                cv.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${cv.videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/watch?v=${cv.videoId}`
            });
            return;
          }
        }

        if (node.continuationItemRenderer) {
          const token =
            node.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token ||
            node.continuationItemRenderer?.continuationEndpoint?.browseEndpoint?.continuationCommand?.token;
          if (token && typeof token === "string") {
            if (continuation) continuation.token = token;
          }
        }
        for (const k of Object.keys(node)) {
          if (typeof node[k] === "object") walk(node[k], depth + 1);
        }
      };

      walk(data.contents || data);
      return list;
    } catch {
      return [];
    }
  }

  /**
   * 拉取当前 Edge 登录用户的专属 YouTube 首页推荐流（优先通过 InnerTube FEwhat_to_watch 官方算法流）
   */
  async fetchPersonalRecommendations(signal?: AbortSignal, continuation = { token: "" }): Promise<YouTubeVideoItem[]> {
    signal?.throwIfAborted();
    let videos: YouTubeVideoItem[] = [];
    try {
      const response = await readYouTubeMessage({
        type: "fetchYouTubeInnerTube", endpoint: "browse", payload: { browseId: "FEwhat_to_watch" }
      }, signal, 3500);
      signal?.throwIfAborted();
      videos = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(response.data)};</script>`, continuation);
    } catch { signal?.throwIfAborted(); }
    if (!videos.length) {
      let html: string;
      try {
        const response = await readYouTubeMessage({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/" }, signal, 15000);
        html = response.html;
        if (typeof html !== "string") throw new Error("Invalid homepage response");
      } catch {
        signal?.throwIfAborted();
        html = await readYouTubeText("https://www.youtube.com/", {
          credentials: "include", headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        }, signal);
      }
      signal?.throwIfAborted();
      videos = this.extractVideosFromHtml(html, continuation);
    }
    // Bounded prefetch; tokens are local to this read, never written by the parser to shared state.
    const seenTokens = new Set<string>();
    for (let page = 0; page < 3 && videos.length < 56 && continuation.token; page++) {
      signal?.throwIfAborted();
      const token = continuation.token;
      if (seenTokens.has(token)) { continuation.token = ""; break; }
      seenTokens.add(token);
      try {
        const response = await readYouTubeMessage({
          type: "fetchYouTubeInnerTube", endpoint: "browse", payload: { continuation: token }
        }, signal);
        signal?.throwIfAborted();
        const next = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(response.data)};</script>`, continuation);
        if (!next.length) { continuation.token = ""; break; }
        for (const item of next) if (!videos.some(existing => existing.id === item.id)) videos.push(item);
      } catch { signal?.throwIfAborted(); break; }
    }
    return videos;
  }

  async loadMoreExploreVideos(parent = this.recommendationViewSignal): Promise<number> {
    if (parent?.aborted || this.recommendationRead || !this.lastContinuationToken) return 0;
    const token = this.lastContinuationToken;
    const read = this.beginRecommendationRead(parent);
    const continuation = { token: "" };
    youTubeController.updateState({ isLoadingMore: true, error: "" });
    try {
      const response = await readYouTubeMessage({
        type: "fetchYouTubeInnerTube", endpoint: "browse", payload: { continuation: token }
      }, read.signal);
      if (!read.current()) return 0;
      const items = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(response.data)};</script>`, continuation);
      const merged = [...youTubeState.exploreVideos];
      for (const item of items) if (!merged.some(existing => existing.id === item.id)) merged.push(item);
      const added = merged.length - youTubeState.exploreVideos.length;
      if (added) {
        await storageSet({ logicweaver_youtube_explore_cache: merged });
        if (!read.current()) return 0;
        this.exploreCache["recommend"] = merged;
        youTubeController.updateState({ exploreVideos: merged });
      }
      this.lastContinuationToken = continuation.token === token ? "" : continuation.token;
      return added;
    } catch {
      if (read.current()) youTubeController.updateState({ error: "追加推荐失败，当前列表保留；可手动重试。" });
      return 0;
    } finally { read.finish(); }
  }

  /**
   * 同步当前账号在 YouTube 上的“我喜欢的视频 (Liked Videos)”列表
   */
  async syncYouTubeLikedVideos(): Promise<number> {
    return this.syncFavoritePlaylist("LL", "YouTube 喜欢的视频");
  }

  async syncYouTubeWatchLater(): Promise<number> {
    return this.syncFavoritePlaylist("WL", "稍后观看");
  }

  private hasAutoSynced = false;

  private async syncFavoritePlaylist(list: "LL" | "WL", group: string): Promise<number> {
    return this.mutateFavorites(async snapshot => {
      let videos: YouTubeVideoItem[] = [];

      // 1. 优先通过官方 InnerTube browse 接口拉取播放列表（携带 SAPISIDHASH 鉴权）
      const browseId = list === "LL" ? "VLLL" : "VLWL";
      try {
        const response = await readYouTubeMessage({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { browseId }
        }, undefined, 8000);
        if (response && response.data) {
          const continuation = { token: "" };
          videos = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(response.data)};</script>`, continuation);
          // 若列表带有 continuationToken，继续拉取下一页
          if (continuation.token && videos.length < 50) {
            try {
              const contResp = await readYouTubeMessage({
                type: "fetchYouTubeInnerTube",
                endpoint: "browse",
                payload: { continuation: continuation.token }
              }, undefined, 6000);
              if (contResp && contResp.data) {
                const nextVideos = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(contResp.data)};</script>`);
                for (const item of nextVideos) {
                  if (!videos.some(existing => existing.id === item.id)) videos.push(item);
                }
              }
            } catch {}
          }
        }
      } catch {}

      // 2. 备用通道：通过 Background 代理读取官方播放列表 HTML 页面并解析
      if (!videos.length) {
        let html = "";
        try {
          const response = await readYouTubeMessage({
            type: "fetchYouTubeHtml",
            url: `https://www.youtube.com/playlist?list=${list}`
          }, undefined, 12000);
          html = response.html || "";
        } catch {
          html = await readYouTubeText(`https://www.youtube.com/playlist?list=${list}`, {
            credentials: "include", headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
          }, undefined, 15000);
        }
        if (html) {
          videos = this.extractVideosFromHtml(html);
        }
      }

      if (!videos.length) {
        throw new Error("未能识别到 YouTube 视频，请确认已在 Edge 登录 YouTube 账号，或该收藏列表中尚无视频");
      }

      // Re-read after the network wait to reduce (not eliminate) cross-page overwrite risk.
      Object.assign(snapshot, await readFavoriteSnapshot());
      let added = 0;
      const ids = new Set(snapshot.favorites.map(video => video.id));
      for (const video of videos) {
        if (ids.has(video.id)) continue;
        ids.add(video.id);
        snapshot.favorites.unshift({ ...video, group, savedAt: Date.now() });
        added++;
      }
      if (!snapshot.groups.includes(group)) snapshot.groups.push(group);
      return added;
    }, count => `同步完成！已成功抓取 ${count} 个视频并存入「${group}」。`);
  }

  private async mutateFavorites<T>(
    change: (snapshot: FavoriteSnapshot) => T | Promise<T>,
    message: (result: T) => string
  ): Promise<T> {
    if (youTubeState.favoritesBusy) throw new Error("另一个收藏操作正在处理，请稍后再操作");
    if (youTubeState.favoritesNeedsReview) throw new Error("上次结果未确认，请先点击重读收藏");
    youTubeController.updateState({ favoritesBusy: true, favoritesLoading: false, favoriteMessage: "正在处理收藏，请勿重复提交…" });
    ++this.favoriteReadVersion;
    let submitted = false;
    try {
      const snapshot = await readFavoriteSnapshot();
      const result = await change(snapshot);
      submitted = true;
      await writeFavoriteSnapshot(snapshot);
      this.favorites = snapshot.favorites.map(video => ({ ...video }));
      this.favoritesLoaded = true;
      youTubeController.updateState({
        favorites: this.favorites.map(video => ({ ...video })), favGroups: [...snapshot.groups],
        activeFavGroup: snapshot.groups.includes(youTubeState.activeFavGroup) ? youTubeState.activeFavGroup : "全部",
        favoriteMessage: message(result)
      });
      return result;
    } catch (error) {
      this.favoritesLoaded = false;
      youTubeController.updateState({
        favoritesNeedsReview: true,
        favoriteMessage: submitted ? "收藏保存结果未确认，未自动重试。当前显示保留旧记录；请先重读收藏核对。" :
          `未提交收藏保存：${error instanceof Error ? error.message : "读取失败"}。请先重读收藏后再操作。`
      });
      throw new Error("收藏操作未完成或保存结果未确认，请重读收藏核对");
    } finally { youTubeController.updateState({ favoritesBusy: false }); }
  }

  async loadFavorites(force = false): Promise<YouTubeVideoItem[]> {
    if (youTubeState.favoritesBusy) return this.favorites.map(video => ({ ...video }));
    if (this.favoritesLoaded && !force) return this.favorites.map(video => ({ ...video }));
    if (this.favoriteRead) {
      await this.favoriteRead;
      if (!force) return this.favorites.map(video => ({ ...video }));
    }
    if (youTubeState.favoritesBusy) return this.favorites.map(video => ({ ...video }));
    const version = ++this.favoriteReadVersion;
    youTubeController.updateState({ favoritesLoading: true });
    const task = (async () => {
      try {
        const snapshot = await readFavoriteSnapshot();
        if (version !== this.favoriteReadVersion) return this.favorites.map(video => ({ ...video }));
        this.favorites = snapshot.favorites;
        this.favoritesLoaded = true;
        youTubeController.updateState({
          favorites: this.favorites.map(video => ({ ...video })), favGroups: [...snapshot.groups],
          ...(force ? { favoritesNeedsReview: false, favoriteMessage: "已重新读取收藏，请核对后再操作。" } : {})
        });

        // ✨ 极致体验：如果本地收藏为空，且未尝试过自动抓取，静默为用户拉取一次官方已登录的“我喜欢的视频 (LL)”
        if (this.favorites.length === 0 && !this.hasAutoSynced) {
          this.hasAutoSynced = true;
          void this.syncYouTubeLikedVideos().catch(() => {});
        }

        return this.favorites.map(video => ({ ...video }));
      } catch {
        if (version === this.favoriteReadVersion) youTubeController.updateState({
          favoritesNeedsReview: true, favoriteMessage: "收藏读取失败，未启用写入；请重试读取。"
        });
        throw new Error("收藏读取失败");
      } finally {
        if (version === this.favoriteReadVersion) youTubeController.updateState({ favoritesLoading: false });
      }
    })();
    this.favoriteRead = task;
    try { return await task; }
    finally { if (this.favoriteRead === task) this.favoriteRead = undefined; }
  }

  isFavorite(videoId: string): boolean {
    return this.favorites.some(video => video.id === videoId);
  }

  async toggleFavorite(video: YouTubeVideoItem, group = "稍后观看"): Promise<boolean> {
    const submitted = { ...video, group: group || "稍后观看", savedAt: Date.now() };
    if (!this.favoritesLoaded) await this.loadFavorites();
    if (!submitted.id || !submitted.title) throw new Error("视频信息不完整，未保存");
    // Freeze add/remove intent at click time; a later read must not invert an uncertain action.
    const remove = this.isFavorite(submitted.id);
    return this.mutateFavorites(snapshot => {
      if (remove) snapshot.favorites = snapshot.favorites.filter(item => item.id !== submitted.id);
      else if (!snapshot.favorites.some(item => item.id === submitted.id)) snapshot.favorites.unshift(submitted);
      return !remove;
    }, added => added ? "已保存收藏并核对。" : "已移出本地收藏并核对。");
  }

  async removeFavorite(videoId: string): Promise<void> {
    await this.mutateFavorites(snapshot => {
      snapshot.favorites = snapshot.favorites.filter(video => video.id !== videoId);
    }, () => "已移出本地收藏并核对。");
  }

  async addFavGroup(name: string): Promise<void> {
    const clean = name.trim();
    if (!clean) return;
    await this.mutateFavorites(snapshot => {
      if (!snapshot.groups.includes(clean)) snapshot.groups.push(clean);
    }, () => "收藏分组已保存并核对。");
  }

  async deleteFavGroup(name: string): Promise<void> {
    if (name === "全部" || name === "稍后观看") return;
    await this.mutateFavorites(snapshot => {
      snapshot.groups = snapshot.groups.filter(group => group !== name);
      snapshot.favorites = snapshot.favorites.map(video => video.group === name ? { ...video, group: "稍后观看" } : video);
    }, () => "分组已删除，视频移入稍后观看；已核对保存。");
  }

  // -------------------------------------------------------------
  // 6. 📂 播放列表管理
  // -------------------------------------------------------------
  async loadPlaylists(): Promise<StoredYouTubePlaylist[]> {
    if (this.playlistsLoaded) return this.playlists;
    const stored = await storageGet([YOUTUBE_PLAYLISTS_KEY]);
    let list = stored[YOUTUBE_PLAYLISTS_KEY];
    const obsoletePlaylists = new Set([
      "PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4",
      "PL9ooVrP1hQOFWk94Q4P_rF_X_wE2eXj1k"
    ]);
    if (!Array.isArray(list) || list.length === 0) {
      list = DEFAULT_PLAYLISTS;
      await storageSet({ [YOUTUBE_PLAYLISTS_KEY]: list });
    } else {
      list = list.filter((p: StoredYouTubePlaylist) => !obsoletePlaylists.has(p.id));
      await storageSet({ [YOUTUBE_PLAYLISTS_KEY]: list });
    }
    this.playlists = list;
    this.playlistsLoaded = true;
    youTubeController.updateState({
      playlists: this.playlists,
      activePlaylistId: this.playlists[0]?.id || ""
    });
    if (this.playlists[0]?.id) {
      void this.fetchPlaylistVideos(this.playlists[0].id);
    }
    return this.playlists;
  }

  async addPlaylist(urlOrId: string, title?: string): Promise<boolean> {
    await this.loadPlaylists();
    let id = urlOrId.trim();
    const match = id.match(/list=([a-zA-Z0-9_-]+)/);
    if (match) id = match[1];
    id = id.replace(/^VL/i, "");
    if (!id) return false;

    if (this.playlists.some((p) => p.id === id)) return false;

    const newPl: StoredYouTubePlaylist = {
      id,
      title: title?.trim() || `YouTube 播放列表 (${id.slice(0, 8)}...)`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    };

    this.playlists.push(newPl);
    await storageSet({ [YOUTUBE_PLAYLISTS_KEY]: this.playlists });
    youTubeController.updateState({ playlists: [...this.playlists], activePlaylistId: id });
    void this.fetchPlaylistVideos(id);
    return true;
  }

  async removePlaylist(id: string): Promise<void> {
    await this.loadPlaylists();
    this.playlists = this.playlists.filter((p) => p.id !== id);
    await storageSet({ [YOUTUBE_PLAYLISTS_KEY]: this.playlists });
    const nextActive = this.playlists[0]?.id || "";
    youTubeController.updateState({ playlists: [...this.playlists], activePlaylistId: nextActive });
    if (nextActive) void this.fetchPlaylistVideos(nextActive);
    else youTubeController.updateState({ playlistVideos: [] });
  }

  // -------------------------------------------------------------
  // 7. 搜索功能（优先通过官方 InnerTube 搜索，秒级返回真实结果）
  // -------------------------------------------------------------
  async search(query: string): Promise<YouTubeVideoItem[]> {
    if (!query.trim()) return [];
    youTubeController.updateState({ isLoading: true, error: "" });
    try {
      let data: any = null;
      try {
        const res: any = await new Promise((resolve, reject) => {
          chrome?.runtime?.sendMessage?.(
            {
              type: "fetchYouTubeInnerTube",
              endpoint: "search",
              payload: { query: query.trim() }
            },
            (r: any) => {
              if (r && r.ok && r.data) resolve(r.data);
              else reject(new Error(r?.error || "搜索接口未响应"));
            }
          );
        });
        data = res;
      } catch {}

      if (!data) {
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        const res = await fetch(url, {
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const match = html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
        if (!match) throw new Error("未能从网页提取搜索结果");
        data = JSON.parse(match[1]);
      }

      const contents =
        data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [];

      const videos: YouTubeVideoItem[] = [];
      contents.forEach((sec: any) => {
        const items = sec.itemSectionRenderer?.contents || [];
        items.forEach((item: any) => {
          const v = item.videoRenderer;
          if (v && v.videoId) {
            videos.push({
              id: v.videoId,
              title: v.title?.runs?.[0]?.text || "YouTube 视频",
              channelTitle: v.ownerText?.runs?.[0]?.text || "YouTube UP主",
              channelId: v.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
              publishedAt: v.publishedTimeText?.simpleText || "",
              views: formatViews(v.viewCountText?.simpleText),
              thumbnail: v.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
              videoUrl: `https://www.youtube.com/watch?v=${v.videoId}`
            });
          }
        });
      });

      youTubeController.updateState({ searchResults: videos, isLoading: false });
      return videos;
    } catch (err: any) {
      youTubeController.updateState({
        searchResults: [],
        isLoading: false,
        error: `搜索异常: ${err?.message || String(err)}`
      });
      return [];
    }
  }

  // -------------------------------------------------------------
  // 8. 全生命周期初始化与交互事件监听
  // -------------------------------------------------------------
  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    youTubeController.onAction(async (action, payload) => {
      try {
      switch (action) {
        case "refresh":
          if (youTubeState.currentView === "recommend") {
            await this.loadRecommend(true);
          } else {
            await this.loadFavorites(true);
          }
          break;

        case "switch-view":
          // Recommendation view activation is owned by the card's visibility watcher.
          if (payload === "favorites") {
            await this.loadFavorites();
          }
          break;

        case "save-favorite":
          if (payload && payload.video) {
            await this.toggleFavorite(payload.video);
          }
          break;

        case "remove-favorite":
          if (typeof payload === "string") {
            await this.removeFavorite(payload);
          }
          break;
      }
      } catch { /* Favorite methods retain their result; never leak an async action rejection. */ }
    });

    // The current card displays favorites/recommendations, not the legacy subscriptions stream.
    this.loadFavorites().catch(() => {});
    void this.getCachedRecommendBatch().then((cached) => {
      if (cached && cached.videos.length > 0 && youTubeState.exploreVideos.length === 0) {
        youTubeController.updateState({
          exploreVideos: cached.videos,
          userName: cached.userName || "账号专属推荐"
        });
        cached.videos.forEach((v) => this.shownVideoIds.add(v.id));
      }
    });
  }
}

export const youTubeService = new YouTubeService();
