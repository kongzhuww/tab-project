/**
 * B站 AI 字幕订阅频道与视频字幕台协调器。
 * 负责频道配置读取保存、动态视频字幕加载（支持60秒整轮取消与迟到防覆盖）、
 * 章节段落组稿发布、画中画播放与字幕文本导出。
 */
import { biliFavoritesController } from "./bili-favorites-store";
import { formatBiliCompactNumber, formatBiliDuration, formatSrtTime, parseTranscriptParagraphs } from "./channel-format";
import type { BiliFollowedUp, BiliSubChannelInfo, BiliSubDocument, BiliSubEdition, BiliSubState, BiliUpGroup, BiliVideoChapter } from "./channel-types";
import { extractSubscriptionChapters } from "./subscription-chapters";
import { readSubscriptionEditions } from "./subscription-reader";
import { biliTheaterController } from "./theater-store";
import { collectBiliGroupMids } from "./up-group-tree";

export const BILI_SUB_CHANNELS_KEY = "biliSubCustomChannelsV1";
export const BILI_SUB_ARCHIVES_KEY = "biliSubVideoArchivesV1";

declare const chrome: any;

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
  return new Promise((resolve, reject) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set(items, () => {
        const error = chrome.runtime?.lastError;
        if (error) reject(new Error(error.message || "存储写入失败"));
        else resolve();
      });
    } else {
      try {
        Object.entries(items).forEach(([k, v]) => {
          localStorage.setItem(k, JSON.stringify(v));
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
}

function notifyToast(text: string, options?: any): void {
  const g = globalThis as any;
  if (typeof g.showBiliToast === "function") {
    g.showBiliToast(text, options);
  }
}

export interface SubscriptionCoordinatorOptions {
  suspendEmbeddedPlayback: () => void;
  getUpGroups: () => BiliUpGroup[];
  initUpGroups: () => Promise<void>;
  loadFollowedUps: (force: boolean) => Promise<BiliFollowedUp[]>;
  readChannelStorage: (keys: string[], signal: AbortSignal) => Promise<Record<string, any>>;
}

export class BiliSubscriptionCoordinator {
  public readonly subChannels: Record<string, BiliSubChannelInfo> = {
    shana: { mid: "3546795384769164", fallbackName: "刹那观察室", title: "刹那观察室", defaultTitle: "刹那观察室", builtin: true },
    news: { mid: "3706929260006322", fallbackName: "黑鸦Heya", title: "黑鸦Heya", defaultTitle: "黑鸦Heya", builtin: true }
  };

  public readonly subState: BiliSubState = {
    channelKey: "shana",
    viewMode: "srt",
    loading: false,
    editions: [],
    activeDate: "",
    activeDocBvid: "",
    visibleCounts: { shana: 3, news: 3 },
    cache: { shana: { at: 0, editions: [] }, news: { at: 0, editions: [] } }
  };

  private subCustomChannelsLoaded = false;
  private subscriptionActive = false;
  private subscriptionRevision = 0;
  private subscriptionRequest: AbortController | null = null;
  private subscriptionTimer: ReturnType<typeof setTimeout> | undefined;
  private subscriptionArchiveQueue: Promise<void> = Promise.resolve();

  constructor(private readonly options: SubscriptionCoordinatorOptions) {}

  public async ensureSubCustomChannels(signal?: AbortSignal): Promise<void> {
    signal?.throwIfAborted();
    if (this.subCustomChannelsLoaded) return;
    const stored = signal ? await this.options.readChannelStorage([BILI_SUB_CHANNELS_KEY], signal) : await storageGet([BILI_SUB_CHANNELS_KEY]);
    signal?.throwIfAborted();
    if (this.subCustomChannelsLoaded) return;
    const custom = Array.isArray(stored[BILI_SUB_CHANNELS_KEY]) ? stored[BILI_SUB_CHANNELS_KEY] : [];
    custom.forEach((item: any) => {
      if (!item?.mid) return;
      const key = `up-${item.mid}`;
      this.subChannels[key] = {
        mid: String(item.mid),
        fallbackName: item.name || `UP ${item.mid}`,
        title: item.name || `UP ${item.mid}`,
        custom: true
      };
    });
    this.subCustomChannelsLoaded = true;
  }

  public async saveSubCustomChannels(): Promise<void> {
    const custom = Object.values(this.subChannels)
      .filter((item) => item.custom)
      .map((item) => ({ mid: item.mid, name: item.fallbackName }));
    await storageSet({ [BILI_SUB_CHANNELS_KEY]: custom });
  }

  public async subscribeFollowedBiliUp(up: { mid: string | number; name?: string }): Promise<void> {
    const mid = String(up?.mid || "");
    if (!mid) return;
    const revision = this.subscriptionRevision;
    await this.ensureSubCustomChannels();
    const key = `up-${mid}`;
    this.subChannels[key] = {
      mid,
      fallbackName: up.name || `UP ${mid}`,
      title: up.name || `UP ${mid}`,
      custom: true
    };
    this.subState.cache[key] ||= { at: 0, editions: [] };
    this.subState.visibleCounts[key] = 3;
    await this.saveSubCustomChannels();
    // Persistence is independent of navigation; do not reopen after a late save.
    if (this.subscriptionActive && revision === this.subscriptionRevision) {
      await this.loadSubVideo(true, { channelKey: key });
    }
  }

  public async addBiliSubChannel(): Promise<void> {
    const g = globalThis as any;
    const controller = g.LogicWeaverBiliOrganizerDialogs;
    if (!controller) {
      notifyToast("添加弹窗尚未加载，请刷新页面");
      return;
    }
    const followingByMid = new Map<string, BiliFollowedUp>();
    controller.openChannelPicker(async (mid: string | number) => {
      const up = followingByMid.get(String(mid));
      if (!up) throw new Error("未找到该 UP 主");
      await this.subscribeFollowedBiliUp(up);
    });

    try {
      await this.options.initUpGroups();
      const followings = await this.options.loadFollowedUps(false);
      const subscribed = new Set(Object.values(this.subChannels).map((item) => String(item.mid)));
      (followings || []).forEach((up) => followingByMid.set(String(up.mid), up));
      const groups = (this.options.getUpGroups() || []).map((group) => ({
        id: String(group.id),
        name: String(group.name || "未命名分组"),
        mids: collectBiliGroupMids(this.options.getUpGroups(), group.id)
      }));
      controller.updateChannelPicker({
        loading: false,
        error: "",
        groups,
        items: (followings || []).map((up) => ({
          mid: String(up.mid),
          name: String(up.name || `UP ${up.mid}`),
          face: String(up.face || ""),
          added: subscribed.has(String(up.mid))
        }))
      });
    } catch (error: any) {
      controller.updateChannelPicker({ loading: false, error: error?.message || "无法读取关注列表" });
    }
  }

  public getActiveSubscriptionDocument(): BiliSubDocument | null {
    const editions = this.subState.editions || [];
    const allDocs = editions.flatMap((edition) => edition.documents || []);
    return allDocs.find((doc) => doc.bvid === this.subState.activeDocBvid) || allDocs[0] || null;
  }

  public publishSubscriptionSnapshot(): void {
    if (!this.subscriptionActive) return;
    const channelKey = this.subState.channelKey || "shana";
    const channel = this.subChannels[channelKey] || this.subChannels.shana;
    const allDocs = (this.subState.editions || []).flatMap((edition) => edition.documents || []);
    const currentDoc = this.getActiveSubscriptionDocument();
    const chapters = currentDoc ? this.extractChapters(currentDoc) : [];
    const cues = Array.isArray(currentDoc?.cues) ? currentDoc.cues : [];
    const description = parseTranscriptParagraphs(currentDoc?.desc || currentDoc?.text || "");

    biliFavoritesController.updateOrganizer({
      subscriptionTitle: String(channel.fallbackName || channel.title || "订阅视频"),
      subscriptionSubtitle: "订阅视频 · AI 逐字字幕稿 · 点击台词即刻跳转播放",
      subscriptionScriptMode: localStorage.getItem("biliSubScriptMode") === "lyrics" ? "lyrics" : "newspaper",
      subscriptionChannels: Object.entries(this.subChannels).map(([id, item]) => ({
        id,
        name: String(item.fallbackName || item.title || id),
        active: id === channelKey
      })),
      subscriptionVideos: allDocs.map((doc) => ({
        bvid: String(doc.bvid || ""),
        title: String(doc.title || doc.bvid || "未命名视频"),
        duration: String(doc.durationText || ""),
        active: doc.bvid === currentDoc?.bvid
      })),
      subscriptionChapters: chapters.map((chapter) => ({
        title: String(chapter.title || "未命名章节"),
        from: Number(chapter.from || 0),
        to: Number(chapter.to || 0),
        fromText: formatSrtTime(chapter.from),
        toText: formatSrtTime(chapter.to),
        paragraphs: (chapter.paragraphs || []).map(String),
        paragraphCues: (chapter.paragraphCues || []).map((pGroup) =>
          (pGroup || []).map((cue, idx) => ({
            index: Number(cue.index ?? idx),
            from: Number(cue.from || 0),
            to: Number(cue.to || 0),
            timeText: formatSrtTime(cue.from),
            content: String(cue.content || "")
          }))
        ),
        cues: (chapter.cues || []).map((cue, idx) => ({
          index: Number(cue.index ?? idx),
          from: Number(cue.from || 0),
          to: Number(cue.to || 0),
          timeText: formatSrtTime(cue.from),
          content: String(cue.content || "")
        }))
      })),
      subscriptionCues: cues.map((cue, index) => ({
        index,
        from: Number(cue.from || 0),
        to: Number(cue.to || 0),
        timeText: formatSrtTime(cue.from),
        content: String(cue.content || "")
      })),
      subscriptionDescription: description,
      subscriptionCurrent: currentDoc
        ? {
            bvid: String(currentDoc.bvid || ""),
            aid: String(currentDoc.aid || ""),
            title: String(currentDoc.title || currentDoc.bvid || "未命名视频"),
            author: String(currentDoc.author || channel.fallbackName || "UP主"),
            cover: String(currentDoc.cover || "").replace(/^http:/, "https:"),
            description: String(currentDoc.desc || ""),
            playCount: formatBiliCompactNumber(currentDoc.play || 0),
            danmakuCount: formatBiliCompactNumber(currentDoc.danmaku || 0),
            duration: String(currentDoc.durationText || "")
          }
        : null
    });
  }

  public extractChapters(doc: BiliSubDocument): BiliVideoChapter[] {
    return extractSubscriptionChapters(doc);
  }

  public async copyActiveSubscriptionScript(): Promise<void> {
    const doc = this.getActiveSubscriptionDocument();
    if (!doc) {
      notifyToast("当前没有可复制的字幕稿");
      return;
    }
    const mode = localStorage.getItem("biliSubScriptMode") || "newspaper";
    const chapters = this.extractChapters(doc);
    const text =
      mode === "newspaper" && chapters.length
        ? chapters
            .map(
              (chapter, index) =>
                `【第 ${String(index + 1).padStart(2, "0")} 节 · ${chapter.title}】(⏱ ${formatSrtTime(chapter.from)} - ${formatSrtTime(chapter.to)})\n${(chapter.paragraphs || []).join("\n\n")}`
            )
            .join("\n\n")
        : String(doc.text || doc.cues?.map((cue) => cue.content).filter(Boolean).join("\n") || "").trim();
    if (!text) {
      notifyToast("当前视频暂无可复制的字幕稿");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      notifyToast(mode === "newspaper" ? "报纸分段稿已复制" : "字幕稿已复制为纯文本");
    } catch {
      notifyToast("复制失败，请检查剪贴板权限");
    }
  }

  private cancelSubscription(): void {
    this.subscriptionRevision++;
    const previous = this.subscriptionRequest;
    this.subscriptionRequest = null;
    clearTimeout(this.subscriptionTimer);
    previous?.abort();
    this.subState.loading = false;
  }

  public setSubscriptionActive(active: boolean): void {
    this.subscriptionActive = active;
    if (!active) {
      this.cancelSubscription();
      if (biliFavoritesController.state.organizer.mode === "subscription") {
        biliFavoritesController.updateOrganizer({ subscriptionLoading: false });
      }
    }
  }

  private loadSubVideoData(channelKey: string, visibleCount: number, force: boolean, signal: AbortSignal) {
    return readSubscriptionEditions({
      channelKey,
      channel: this.subChannels[channelKey],
      cache: this.subState.cache[channelKey],
      visibleCount,
      force,
      signal,
      readArchive: async readSignal => {
        const stored = await this.options.readChannelStorage([BILI_SUB_ARCHIVES_KEY], readSignal);
        return stored[BILI_SUB_ARCHIVES_KEY];
      }
    });
  }

  public async loadSubVideo(force = false, selection: { channelKey?: string; visibleCount?: number } = {}): Promise<void> {
    if (!this.subscriptionActive) return;
    this.cancelSubscription();
    const controller = new AbortController();
    this.subscriptionRequest = controller;
    const signal = controller.signal;
    const current = () => this.subscriptionActive && this.subscriptionRequest === controller;
    const check = () => {
      signal.throwIfAborted();
      if (!current()) throw new DOMException("Stale subscription read", "AbortError");
    };
    const channelKey = selection.channelKey || this.subState.channelKey || "shana";
    const visibleCount = selection.visibleCount ?? Math.max(3, Number(this.subState.visibleCounts[channelKey] || 3));
    this.subState.loading = true;
    biliFavoritesController.updateOrganizer({ subscriptionLoading: true, subscriptionError: "" });
    this.subscriptionTimer = setTimeout(() => {
      if (!current()) return;
      this.cancelSubscription();
      biliFavoritesController.updateOrganizer({ subscriptionLoading: false, subscriptionError: "字幕订阅读取超时，请手动重试" });
    }, 60000);
    try {
      await this.ensureSubCustomChannels(signal);
      check();
      this.publishSubscriptionSnapshot();
      const { editions, cached } = await this.loadSubVideoData(channelKey, visibleCount, force, signal);
      check();
      // Serialize this page's archive merges. Already-issued storage writes cannot be undone.
      const save = cached ? Promise.resolve() : this.subscriptionArchiveQueue.catch(() => {}).then(async () => {
        check();
        const stored = await this.options.readChannelStorage([BILI_SUB_ARCHIVES_KEY], signal);
        check();
        const previous = stored[BILI_SUB_ARCHIVES_KEY];
        if (previous != null && (typeof previous !== "object" || Array.isArray(previous))) throw new Error("字幕归档格式异常，未覆盖");
        await new Promise<void>((resolve, reject) => {
          const items = { [BILI_SUB_ARCHIVES_KEY]: { ...previous, [channelKey]: editions } };
          try {
            if (typeof chrome !== "undefined" && chrome?.storage?.local) {
              chrome.storage.local.set(items, () => {
                const error = chrome.runtime?.lastError;
                if (error) reject(new Error("字幕归档保存失败")); else resolve();
              });
            } else {
              localStorage.setItem(BILI_SUB_ARCHIVES_KEY, JSON.stringify(items[BILI_SUB_ARCHIVES_KEY]));
              resolve();
            }
          } catch (error) { reject(error); }
        });
      });
      if (!cached) this.subscriptionArchiveQueue = save.catch(() => {});
      await save;
      check();
      if (channelKey !== this.subState.channelKey) {
        this.subState.activeDate = "";
        this.subState.activeDocBvid = "";
      }
      this.subState.channelKey = channelKey;
      this.subState.visibleCounts[channelKey] = visibleCount;
      this.subState.editions = editions;
      if (!cached) this.subState.cache[channelKey] = { at: Date.now(), editions };
      this.publishSubscriptionSnapshot();
    } catch (error: any) {
      if (current() && !signal.aborted) biliFavoritesController.updateOrganizer({ subscriptionError: `${this.subChannels[channelKey]?.fallbackName || channelKey}：${error?.message || "字幕订阅读取失败"}（未切换或增加条数，可重新选择该频道重试）` });
    } finally {
      if (current()) {
        clearTimeout(this.subscriptionTimer);
        this.subscriptionRequest = null;
        this.subState.loading = false;
        biliFavoritesController.updateOrganizer({ subscriptionLoading: false });
      }
    }
  }

  public openLocalPlaybackView(video: any): void {
    if (!video?.bvid) return;
    this.options.suspendEmbeddedPlayback();
    biliTheaterController.openVideo({
      bvid: video.bvid,
      aid: video.aid || video.id || "",
      title: video.title || video.bvid,
      author: video.author || video.upper || "",
      cover: video.cover || "",
      url: video.videoUrl || `https://www.bilibili.com/video/${video.bvid}`
    });
  }

  public async openSubVideoView(): Promise<void> {
    this.options.suspendEmbeddedPlayback();
    biliFavoritesController.updateOrganizer({ mode: "subscription", subscriptionLoading: false, subscriptionError: "" });
    this.publishSubscriptionSnapshot();
    await this.loadSubVideo(false);
  }
}
