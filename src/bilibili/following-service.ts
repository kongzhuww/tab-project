/**
 * B站正在关注流协调器。
 * 负责全部关注动态与分组 UP 视频聚合的分页会话管理（30秒超时截止/防迟到覆盖/取消）、
 * 内存聚合缓存维护以及界面快照发布。
 */
import { biliFavoritesController } from "./bili-favorites-store";
import { formatBiliCompactNumber, formatBiliDuration } from "./channel-format";
import type { BiliFeedState, BiliFollowedUp, BiliRecentVideo, BiliUpGroup } from "./channel-types";
import { readFollowingFeed, type FollowingAggregateCache } from "./following-reader";
import { collectBiliGroupMids } from "./up-group-tree";

export interface FollowingCoordinatorOptions {
  suspendEmbeddedPlayback: () => void;
  getUpGroups: () => BiliUpGroup[];
  setUpGroups: (groups: BiliUpGroup[]) => void;
  getFollowingsCache: () => BiliFollowedUp[];
  setFollowingsCache: (followings: BiliFollowedUp[]) => void;
  readChannelStorage: (keys: string[], signal: AbortSignal) => Promise<Record<string, any>>;
  fetchUpLatestVideos: (mid: string | number, limit?: number, signal?: AbortSignal) => Promise<BiliRecentVideo[]>;
}

export class BiliFollowingCoordinator {
  public readonly feedState: BiliFeedState = {
    videos: [],
    page: 1,
    pageSize: 24,
    offsetHistory: [""],
    currentOffset: "",
    nextOffset: "",
    updateBaseline: "",
    hasMore: true,
    loading: false,
    pendingScroll: false,
    currentGroupId: "__all__",
    selectedUpMid: ""
  };

  private followingActive = false;
  private followingRequest: AbortController | null = null;
  private followingTimeout: ReturnType<typeof setTimeout> | undefined;
  private groupFeedAggregationCache = new Map<string, FollowingAggregateCache>();

  constructor(private readonly options: FollowingCoordinatorOptions) {}

  public clearAggregationCache(): void {
    this.groupFeedAggregationCache.clear();
  }

  private cancelFollowing(): void {
    const request = this.followingRequest;
    this.followingRequest = null;
    clearTimeout(this.followingTimeout);
    request?.abort();
    this.feedState.loading = false;
    this.feedState.pendingScroll = false;
  }

  public setFollowingActive(active: boolean): void {
    this.followingActive = active;
    if (!active) {
      this.cancelFollowing();
      if (biliFavoritesController.state.organizer.mode === "following") {
        biliFavoritesController.updateOrganizer({ specialLoading: false });
      }
    }
  }

  public openFollowingView(): void {
    this.options.suspendEmbeddedPlayback();
    biliFavoritesController.updateOrganizer({ mode: "following", specialLoading: false, specialError: "" });
    this.publishFeedSnapshot();
    // 如果已有缓存内容，直接呈现，不重复清空重拉；仅在为空时才首次拉取
    if (!this.feedState.videos.length) {
      void this.loadFollowing(true);
    }
  }

  public async loadFollowing(
    reset = false,
    selection: Partial<Pick<BiliFeedState, "currentGroupId" | "selectedUpMid" | "page" | "pendingScroll">> = {}
  ): Promise<void> {
    if (!this.followingActive) return;
    this.cancelFollowing();
    const controller = new AbortController();
    this.followingRequest = controller;
    const signal = controller.signal;
    const current = () => this.followingActive && this.followingRequest === controller;
    const initialGroups = JSON.stringify(this.options.getUpGroups());
    const initialFollowings = JSON.stringify(this.options.getFollowingsCache());
    const check = () => {
      signal.throwIfAborted();
      if (!current()) throw new DOMException("Stale following request", "AbortError");
      if (JSON.stringify(this.options.getUpGroups()) !== initialGroups) throw new Error("关注分组已变更，请刷新后重试");
    };
    const draft: BiliFeedState = { ...this.feedState, ...selection, offsetHistory: [...this.feedState.offsetHistory] };
    const changedFilter = draft.currentGroupId !== this.feedState.currentGroupId || draft.selectedUpMid !== this.feedState.selectedUpMid;
    this.followingTimeout = setTimeout(() => {
      if (!current()) return;
      this.cancelFollowing();
      biliFavoritesController.updateOrganizer({ specialLoading: false, specialError: "关注动态加载超时，请手动重试" });
    }, 30000);
    if (!changedFilter && draft.page > this.feedState.page && draft.currentGroupId === "__all__") {
      draft.offsetHistory[this.feedState.page] = this.feedState.nextOffset;
    }
    if (reset || changedFilter) {
      draft.page = 1;
      draft.offsetHistory = [""];
      draft.currentOffset = "";
      draft.nextOffset = "";
      draft.updateBaseline = "";
      draft.hasMore = true;
      draft.videos = [];
    }
    draft.loading = true;
    this.feedState.loading = true;
    biliFavoritesController.updateOrganizer({ specialLoading: true, specialError: "" });

    try {
      const result = await readFollowingFeed({
        feed: draft,
        followings: this.options.getFollowingsCache(),
        reset,
        signal,
        check,
        readStorage: (readSignal) =>
          this.options.readChannelStorage(
            ["biliFollowingGroupsV1", "biliFollowingsCacheV1", "biliUnfollowedMidsV1"],
            readSignal
          ),
        getAggregateCache: (key) => this.groupFeedAggregationCache.get(key),
        readUpVideos: (mid, limit, readSignal) => this.options.fetchUpLatestVideos(mid, limit, readSignal)
      });
      check();
      Object.assign(this.feedState, result.feed);
      this.options.setUpGroups(result.groups);
      // A concurrent manager refresh owns its newer following-list snapshot.
      if (JSON.stringify(this.options.getFollowingsCache()) === initialFollowings) {
        this.options.setFollowingsCache(result.followings);
      }
      if (result.aggregateCache) {
        this.groupFeedAggregationCache.set(result.aggregateCache.key, {
          timestamp: Date.now(),
          videos: result.aggregateCache.videos
        });
      }
      this.publishFeedSnapshot();
    } catch (err: any) {
      if (current() && !signal.aborted) {
        biliFavoritesController.updateOrganizer({ specialLoading: false, specialError: err?.message || "未知错误" });
      }
    } finally {
      if (current()) {
        clearTimeout(this.followingTimeout);
        this.followingRequest = null;
        this.feedState.loading = false;
        this.feedState.pendingScroll = false;
        biliFavoritesController.updateOrganizer({ specialLoading: false });
      }
    }
  }

  public publishFeedSnapshot(): void {
    if (!this.followingActive) return;
    const isAll = !this.feedState.currentGroupId || this.feedState.currentGroupId === "__all__";
    const groups = this.options.getUpGroups();
    const followingsCache = this.options.getFollowingsCache();
    const activeGroup = !isAll ? groups.find((group) => group.id === this.feedState.currentGroupId) : null;

    const specialVideos = (this.feedState.videos || []).map((video) => {
      const id = String(video.bvid || video.aid || "");
      return {
        id,
        aid: String(video.aid || ""),
        bvid: String(video.bvid || ""),
        title: String(video.title || "未命名视频"),
        cover: String(video.cover || "").replace(/^http:/, "https:"),
        url: video.bvid
          ? `https://www.bilibili.com/video/${video.bvid}`
          : video.aid
          ? `https://www.bilibili.com/video/av${video.aid}`
          : "#",
        duration: formatBiliDuration(video.duration),
        playCount: formatBiliCompactNumber(video.play),
        author: String(video.upper || "关注的UP主"),
        authorMid: String(video.upMid || ""),
        authorFace: "",
        favoriteDate: String(video.pubTimeDesc || "近期"),
        selected: false,
        writable: false
      };
    });

    const followingGroups = [
      { id: "__all__", name: "全部关注", count: followingsCache?.length || 0, active: isAll, child: false },
      ...(groups || []).map((group) => ({
        id: String(group.id),
        name: String(group.name || "未命名分组"),
        count: collectBiliGroupMids(groups, group.id).length,
        active: String(group.id) === String(this.feedState.currentGroupId),
        child: Boolean(group.parentId)
      }))
    ];

    const activeMids = activeGroup ? collectBiliGroupMids(groups, activeGroup.id) : [];
    const followingById = new Map((followingsCache || []).map((member) => [String(member.mid), member]));
    const followingMembers = activeMids.map((mid) => {
      const member = followingById.get(String(mid));
      return {
        id: String(mid),
        name: String(member?.name || `UP ${mid}`),
        face: String(member?.face || ""),
        sign: String(member?.sign || ""),
        active: String(mid) === String(this.feedState.selectedUpMid)
      };
    });

    biliFavoritesController.updateOrganizer({
      specialLoading: false,
      specialError: "",
      specialTitle: "正在关注",
      specialSubtitle: isAll
        ? "已关注 UP 主投稿视频更新 · 与 B站账号实时同步"
        : `聚合分组「${activeGroup?.name || ""}」中 UP 主发布的最新视频`,
      specialBadge: isAll ? `第 ${this.feedState.page} 页` : String(activeGroup?.name || "自定义分组"),
      specialPage: this.feedState.page,
      specialVideos,
      followingGroups,
      followingMembers,
      followingHasMore: Boolean(this.feedState.hasMore && (!isAll || this.feedState.nextOffset))
    });

    if (this.feedState.pendingScroll) {
      this.feedState.pendingScroll = false;
      document.querySelector("#fo-body")?.closest("section")?.scrollIntoView({ block: "start" });
    }
  }
}
