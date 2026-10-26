/**
 * BilibiliChannelService — B站频道入口与业务协调层（仍含 UI 桥接）
 * 物理归仓自原根目录 newtab-bilibili-channels.js
 * 负责正在关注流、关注分组管理、个性推荐流、AI 字幕订阅频道、以及高级搜索与收藏夹桥接
 */

import { bilibiliService, calculateWbiSign } from "./bilibili.service";
import { biliFavoritesController } from "../bilibili/bili-favorites-store";
import { biliTheaterController } from "../bilibili/theater-store";

declare const chrome: any;

const BILI_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

import type { BiliUpGroup, BiliFollowedUp, BiliRecentVideo, BiliFeedState, BiliUpGroupsState, BiliRcmdState, BiliSubChannelInfo, BiliSubDocument, BiliSubEdition, BiliVideoChapter, BiliSubState } from "../bilibili/channel-types";
export type { BiliUpGroup, BiliFollowedUp, BiliRecentVideo, BiliFeedState, BiliUpGroupsState, BiliRcmdState, BiliSubChannelInfo, BiliSubDocument, BiliSubEdition, BiliVideoChapter, BiliSubState } from "../bilibili/channel-types";
import { formatBiliDuration, formatBiliCompactNumber, formatSrtTime, parseDurationToSeconds, parseTranscriptParagraphs } from "../bilibili/channel-format";
export { formatBiliDuration, formatBiliCompactNumber, formatSrtTime, parseDurationToSeconds, parseTranscriptParagraphs } from "../bilibili/channel-format";
import { BiliRecommendations } from "../bilibili/recommendations";
import { readSubscriptionEditions } from "../bilibili/subscription-reader";
import { extractSubscriptionChapters } from "../bilibili/subscription-chapters";
import { BiliFollowingCoordinator } from "../bilibili/following-service";
import { collectBiliGroupMids, flattenBiliUpGroups, validateBiliGroupMove } from "../bilibili/up-group-tree";
import { followBiliUp as followBiliUpApi, unfollowBiliUp as unfollowBiliUpApi } from "../bilibili/up-relation";
import { openBiliUpGroupManager } from "../bilibili/up-group-manager-actions";
import { showCustomConfirmModal as showCustomConfirmModalApi, showUpRecentVideosPreview as showUpRecentVideosPreviewApi } from "../bilibili/up-preview";
import { saveBiliVideoToDefaultFavorite } from "../bilibili/default-favorite";
import { fetchUpLatestVideos as fetchUpLatestVideosApi, clearUpRecentVideosCache } from "../bilibili/up-videos";

import {
  BiliSubscriptionCoordinator,
  BILI_SUB_CHANNELS_KEY,
  BILI_SUB_ARCHIVES_KEY
} from "../bilibili/subscription-service";
export { BILI_SUB_CHANNELS_KEY, BILI_SUB_ARCHIVES_KEY };
import {
  BILI_EMBEDDED_POS_KEY,
  rememberEmbeddedPosition as rememberEmbeddedPositionApi,
  suspendEmbeddedPlayback as suspendEmbeddedPlaybackApi
} from "../bilibili/embedded-playback";
export { BILI_EMBEDDED_POS_KEY };
import { bindChannelFavoritesActions } from "../bilibili/channel-actions-router";
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

/** Strict, cancellable read for following/subscription view sessions. */
function readChannelStorage(keys: string[], signal: AbortSignal): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    let done = false;
    const finish = (value?: Record<string, any>, error?: unknown) => {
      if (done) return;
      done = true;
      signal.removeEventListener("abort", abort);
      if (error) reject(error); else resolve(value || {});
    };
    const abort = () => finish(undefined, new DOMException("Channel read cancelled", "AbortError"));
    if (signal.aborted) { abort(); return; }
    signal.addEventListener("abort", abort, { once: true });
    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local) {
        chrome.storage.local.get(keys, (items: Record<string, any>) => {
          const error = chrome.runtime?.lastError;
          finish(items, error ? new Error("读取频道本地数据失败") : undefined);
        });
      } else {
        const items: Record<string, any> = {};
        for (const key of keys) {
          const raw = localStorage.getItem(key);
          if (raw !== null) items[key] = JSON.parse(raw);
        }
        finish(items);
      }
    } catch (error) { finish(undefined, error); }
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

export class BilibiliChannelService {
  private static instance: BilibiliChannelService;

  private readonly following = new BiliFollowingCoordinator({
    suspendEmbeddedPlayback: () => this.suspendEmbeddedPlayback(),
    getUpGroups: () => this.upGroupsState.groups,
    setUpGroups: (groups) => { this.upGroupsState.groups = groups; },
    getFollowingsCache: () => this.upGroupsState.followingsCache,
    setFollowingsCache: (followings) => { this.upGroupsState.followingsCache = followings; },
    readChannelStorage: (keys, signal) => readChannelStorage(keys, signal),
    fetchUpLatestVideos: (mid, limit, signal) => this.fetchUpLatestVideos(mid, limit, signal)
  });

  public readonly feedState: BiliFeedState = this.following.feedState;

  public readonly upGroupsState: BiliUpGroupsState = {
    groups: [],
    followingsCache: [],
    loadingFollowings: false,
    selectedManageGroupId: ""
  };

  public readonly recommendations = new BiliRecommendations({
    api: <T>(url: string, signal: AbortSignal) => bilibiliService.api<T>(url, { signal }),
    publish: snapshot => biliFavoritesController.updateOrganizer(snapshot),
    scrollToStart: () => document.querySelector("#fo-body")?.closest("section")?.scrollIntoView({ block: "start" })
  });

  // Preserve the original object identity for existing page/refresh action handlers.
  public readonly rcmdState: BiliRcmdState = this.recommendations.state;

  private readonly subscription = new BiliSubscriptionCoordinator({
    suspendEmbeddedPlayback: () => this.suspendEmbeddedPlayback(),
    getUpGroups: () => this.upGroupsState.groups,
    initUpGroups: () => this.initBiliUpGroups(),
    loadFollowedUps: (force) => this.loadFollowedUps(force),
    readChannelStorage: (keys, signal) => readChannelStorage(keys, signal)
  });

  public readonly subChannels: Record<string, BiliSubChannelInfo> = this.subscription.subChannels;
  public readonly subState: BiliSubState = this.subscription.subState;
  private actionSubscriptionBound = false;
  private constructor() {
    this.bindFavoritesActions();
  }

  public static getInstance(): BilibiliChannelService {
    if (!BilibiliChannelService.instance) {
      BilibiliChannelService.instance = new BilibiliChannelService();
    }
    return BilibiliChannelService.instance;
  }

  // ---------- 1. 关注分组与 UP 主管理 ----------

  public async initBiliUpGroups(): Promise<void> {
    const stored = await storageGet(["biliFollowingGroupsV1", "biliFollowingsCacheV1", "biliUnfollowedMidsV1"]);
    this.upGroupsState.groups = Array.isArray(stored.biliFollowingGroupsV1) ? stored.biliFollowingGroupsV1 : [];
    const unfollowedSet = new Set((Array.isArray(stored.biliUnfollowedMidsV1) ? stored.biliUnfollowedMidsV1 : []).map(String));

    if (Array.isArray(stored.biliFollowingsCacheV1?.list)) {
      this.upGroupsState.followingsCache = stored.biliFollowingsCacheV1.list.filter(
        (u: any) => !unfollowedSet.has(String(u?.mid))
      );
    }

    if (unfollowedSet.size > 0 && this.upGroupsState.groups.length > 0) {
      let changed = false;
      this.upGroupsState.groups.forEach((g) => {
        if (Array.isArray(g.upMids)) {
          const origLen = g.upMids.length;
          g.upMids = g.upMids.filter((m) => !unfollowedSet.has(String(m)));
          if (g.upMids.length !== origLen) changed = true;
        }
      });
      if (changed) {
        await this.saveBiliUpGroups();
      }
    }
  }

  public async saveBiliUpGroups(): Promise<void> {
    await storageSet({ biliFollowingGroupsV1: this.upGroupsState.groups });
  }

  public async loadFollowedUps(forceRefresh = false, onBatch?: () => void): Promise<BiliFollowedUp[]> {
    const stored = await storageGet(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]);
    const unfollowedSet = new Set((Array.isArray(stored.biliUnfollowedMidsV1) ? stored.biliUnfollowedMidsV1 : []).map(String));

    if (!forceRefresh && this.upGroupsState.followingsCache?.length &&
        Date.now() - Number(stored.biliFollowingsCacheV1?.updatedAt || 0) < 3600000) {
      this.upGroupsState.followingsCache = this.upGroupsState.followingsCache.filter(
        (u) => !unfollowedSet.has(String(u?.mid))
      );
      return this.upGroupsState.followingsCache;
    }
    if (!forceRefresh && stored.biliFollowingsCacheV1?.list?.length && (Date.now() - (stored.biliFollowingsCacheV1.updatedAt || 0) < 3600000)) {
      this.upGroupsState.followingsCache = stored.biliFollowingsCacheV1.list.filter(
        (u: any) => !unfollowedSet.has(String(u?.mid))
      );
      return this.upGroupsState.followingsCache;
    }

    this.upGroupsState.loadingFollowings = true;
    try {
      const user = await bilibiliService.getUserNav();
      if (!user.isLogin) return [];
      const mid = String(user.mid);

      const pageSize = 24;
      const first = await bilibiliService.api<any>(`https://api.bilibili.com/x/relation/followings?vmid=${mid}&ps=${pageSize}&pn=1`);
      if (!Array.isArray(first?.list)) return [];

      const upMap = new Map<string, BiliFollowedUp>();
      const publishBatch = (items: any[]) => {
        for (const u of items) {
          if (!u?.mid || unfollowedSet.has(String(u.mid))) continue;
          upMap.set(String(u.mid), {
            mid: String(u.mid), name: u.uname || "UP主",
            face: String(u.face || "").replace(/^http:/, "https:"), sign: u.sign || ""
          });
        }
        this.upGroupsState.followingsCache = Array.from(upMap.values());
        onBatch?.();
      };
      publishBatch(first.list);

      const totalPages = Math.ceil(Number(first.total || first.list.length) / pageSize);
      let complete = true;
      for (let page = 2; page <= totalPages; page += 2) {
        const pages = [page, page + 1].filter((p) => p <= totalPages);
        const results = await Promise.allSettled(pages.map((p) =>
          bilibiliService.api<any>(`https://api.bilibili.com/x/relation/followings?vmid=${mid}&ps=${pageSize}&pn=${p}`)));
        for (const result of results) {
          if (result.status === "fulfilled" && Array.isArray(result.value?.list)) publishBatch(result.value.list);
          else complete = false;
        }
      }

      const list = Array.from(upMap.values());
      if (complete) {
        await storageSet({ biliFollowingsCacheV1: { mid, updatedAt: Date.now(), list } });
      } else {
        notifyToast("部分关注分页加载失败，可稍后刷新重试");
      }
      return list;
    } catch (e) {
      console.error("加载关注列表异常:", e);
      return (this.upGroupsState.followingsCache || []).filter((u) => !unfollowedSet.has(String(u?.mid)));
    } finally {
      this.upGroupsState.loadingFollowings = false;
    }
  }

  public fetchUpLatestVideos(mid: string | number, limit = 6, signal?: AbortSignal): Promise<BiliRecentVideo[]> {
    return fetchUpLatestVideosApi(mid, limit, signal);
  }

  public followBiliUp(mid: string | number): Promise<{ ok: boolean; reason?: string }> {
    return followBiliUpApi(mid);
  }

  public unfollowBiliUp(mid: string | number): Promise<{ ok: boolean; reason?: string }> {
    return unfollowBiliUpApi(mid);
  }

  public showCustomConfirmModal(options: Parameters<typeof showCustomConfirmModalApi>[0]): void {
    showCustomConfirmModalApi(options, notifyToast);
  }

  public showUpRecentVideosPreview(
    event: { preventDefault?: () => void; stopPropagation?: () => void; clientX: number; clientY: number },
    up: { mid: string | number; name?: string; face?: string; sign?: string }
  ): void {
    const g = globalThis as any;
    showUpRecentVideosPreviewApi(event, up, {
      getFollowings: () => this.upGroupsState.followingsCache,
      setFollowings: (list) => { this.upGroupsState.followingsCache = list; },
      getGroups: () => this.upGroupsState.groups,
      saveGroups: () => this.saveBiliUpGroups(),
      clearAggregationCache: () => this.following.clearAggregationCache(),
      notifyToast: (msg) => notifyToast(msg),
      refreshManager: () => {
        if (typeof g.__refreshBiliUpGroupManager === "function") g.__refreshBiliUpGroupManager();
      }
    });
  }

  public openBiliUpGroupManagerDialog(targetGroupId = "", searchKeyword = "", autoCreate = false): Promise<void> {
    return openBiliUpGroupManager(
      {
        initGroups: () => this.initBiliUpGroups(),
        getGroups: () => this.upGroupsState.groups,
        setGroups: (groups) => { this.upGroupsState.groups = groups; },
        getFollowings: () => this.upGroupsState.followingsCache,
        saveGroups: () => this.saveBiliUpGroups(),
        loadFollowedUps: (force, onBatch) => this.loadFollowedUps(force, onBatch),
        showConfirmModal: (opts) => this.showCustomConfirmModal(opts),
        previewUp: (ev, up) => this.showUpRecentVideosPreview(ev, up),
        notifyToast: (msg) => notifyToast(msg)
      },
      targetGroupId,
      searchKeyword,
      autoCreate
    );
  }

  // ---------- 2. 正在关注流 (委托至 BiliFollowingCoordinator) ----------

  public setFollowingActive(active: boolean): void {
    this.following.setFollowingActive(active);
  }

  public openFollowingView(): void {
    this.following.openFollowingView();
  }

  public loadFollowing(
    reset = false,
    selection: Partial<Pick<BiliFeedState, "currentGroupId" | "selectedUpMid" | "page" | "pendingScroll">> = {}
  ): Promise<void> {
    return this.following.loadFollowing(reset, selection);
  }

  public publishFeedSnapshot(): void {
    this.following.publishFeedSnapshot();
  }

  // ---------- 3. 个性推荐流 (Recommendations) ----------

  public openRecommendationView(): void {
    this.suspendEmbeddedPlayback();
    biliFavoritesController.updateOrganizer({ mode: "recommendations", specialLoading: false, specialError: "" });
    this.publishRecommendationSnapshot();
    // 保持这一批不变进入缓存，不自动刷新重拉；仅在为空时才首次拉取，用户点击刷新时才更换
    if (!this.recommendations.state.videos.length) {
      void this.loadRecommendations(true);
    }
  }

  public setRecommendationsActive(active: boolean): void {
    this.recommendations.setActive(active);
    if (!active && biliFavoritesController.state.organizer.mode === "recommendations") {
      biliFavoritesController.updateOrganizer({ specialLoading: false });
    }
  }

  public loadRecommendations(reset = false): Promise<void> {
    return this.recommendations.loadRecommendations(reset);
  }

  public publishRecommendationSnapshot(): void {
    this.recommendations.publishRecommendationSnapshot();
  }

  public saveBiliVideoToDefaultFavorite(video: any): Promise<{ ok: boolean; reason?: string; targetFolder?: any }> {
    return saveBiliVideoToDefaultFavorite(video, notifyToast);
  }

  // ---------- 4. 搜索与动作接口 (LogicWeaverBiliSearchActions) ----------

  public readonly searchActions = {
    search: async (keyword: string) => {
      const { ik, sk } = await bilibiliService.getWbiKeys();
      const { signedQuery } = calculateWbiSign(
        { search_type: "video", keyword, page: 1, page_size: 12 },
        ik,
        sk
      );
      return bilibiliService.api(`https://api.bilibili.com/x/web-interface/wbi/search/type?${signedQuery}`);
    },
    favorite: (video: any) => this.saveBiliVideoToDefaultFavorite({ ...video }),
    cache: async (video: any) => {
      const { cacheBiliVideo } = await import("../bilibili/cache.service");
      return cacheBiliVideo({ ...video });
    },
    local: (video: any) => {
      this.openLocalPlaybackView({ ...video, videoUrl: `https://www.bilibili.com/video/${video.bvid}` });
      return true;
    }
  };

  // ---------- 5. 订阅频道与 AI 章节字幕台 (委托至 BiliSubscriptionCoordinator) ----------

  public ensureSubCustomChannels(signal?: AbortSignal): Promise<void> {
    return this.subscription.ensureSubCustomChannels(signal);
  }

  public saveSubCustomChannels(): Promise<void> {
    return this.subscription.saveSubCustomChannels();
  }

  public subscribeFollowedBiliUp(up: { mid: string | number; name?: string }): Promise<void> {
    return this.subscription.subscribeFollowedBiliUp(up);
  }

  public addBiliSubChannel(): Promise<void> {
    return this.subscription.addBiliSubChannel();
  }

  public getActiveSubscriptionDocument(): BiliSubDocument | null {
    return this.subscription.getActiveSubscriptionDocument();
  }

  public publishSubscriptionSnapshot(): void {
    this.subscription.publishSubscriptionSnapshot();
  }

  public extractChapters(doc: BiliSubDocument): BiliVideoChapter[] {
    return this.subscription.extractChapters(doc);
  }

  public copyActiveSubscriptionScript(): Promise<void> {
    return this.subscription.copyActiveSubscriptionScript();
  }

  public setSubscriptionActive(active: boolean): void {
    this.subscription.setSubscriptionActive(active);
  }

  public loadSubVideo(force = false, selection: { channelKey?: string; visibleCount?: number } = {}): Promise<void> {
    return this.subscription.loadSubVideo(force, selection);
  }

  public rememberEmbeddedPosition(media: HTMLMediaElement): void {
    rememberEmbeddedPositionApi(media);
  }

  public suspendEmbeddedPlayback(scope: ParentNode = document): void {
    suspendEmbeddedPlaybackApi(scope);
  }

  public openLocalPlaybackView(video: any): void {
    this.subscription.openLocalPlaybackView(video);
  }

  public openSubVideoView(): Promise<void> {
    return this.subscription.openSubVideoView();
  }

  // ---------- 6. 独立页快捷频道与动作总线 ----------

  public openCachedView(): Promise<void> {
    return import("../bilibili/organizer-actions").then(({ biliOrganizerActions }) => biliOrganizerActions.openCache());
  }

  public bindFavoritesActions(): void {
    if (this.actionSubscriptionBound) return;
    this.actionSubscriptionBound = true;
    bindChannelFavoritesActions(this);
  }
}

export const bilibiliChannelService = BilibiliChannelService.getInstance();
