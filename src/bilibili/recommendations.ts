import type { BiliRcmdState, BiliRecentVideo } from "./channel-types";
import type { BiliOrganizerView } from "./bili-favorites-store";
import { formatBiliDuration, formatBiliCompactNumber } from "./channel-format";

interface RecommendationDependencies {
  api: <T>(url: string, signal: AbortSignal) => Promise<T>;
  publish: (snapshot: Partial<BiliOrganizerView>) => void;
  scrollToStart: () => void;
}

/** One owner per channel facade. Only explicit user requests start reads. */
export class BiliRecommendations {
  public readonly state: BiliRcmdState = {
    videos: [], page: 1, pageSize: 24, freshIdx: 1,
    loading: false, pendingScroll: false
  };
  private active = false;
  private request: AbortController | null = null;
  private timeout: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly dependencies: RecommendationDependencies) {}

  public setActive(active: boolean): void {
    this.active = active;
    if (!active) this.cancel();
  }

  private cancel(): void {
    const previous = this.request;
    this.request = null;
    clearTimeout(this.timeout);
    this.timeout = undefined;
    previous?.abort();
    this.state.loading = false;
    this.state.pendingScroll = false;
  }

  public loadRecommendations(reset = false): Promise<void> {
    return this.load(reset ? 1 : this.state.page, reset ? 1 : this.state.freshIdx, false);
  }

  public refresh(): Promise<void> {
    // Latest refresh replaces the old read; counters advance only on success.
    return this.load(this.state.page + 1, this.state.freshIdx + 1, false);
  }

  public goToPage(value: number): Promise<void> {
    // No queued clicks and no mutation of committed pagination while busy.
    if (this.state.loading || !Number.isFinite(value)) return Promise.resolve();
    const page = Math.max(1, Math.floor(value));
    return this.load(page, Math.max(1, this.state.freshIdx + page - this.state.page), true);
  }

  private async load(page: number, freshIdx: number, scroll: boolean): Promise<void> {
    if (!this.active) return;
    this.cancel();
    const controller = new AbortController();
    this.request = controller;
    const current = () => this.active && this.request === controller;
    let timedOut = false;
    this.timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 15000);
    this.state.loading = true;
    this.dependencies.publish({ specialLoading: true, specialError: "" });

    try {
      const targetCount = this.state.pageSize || 24;
      let allItems: any[] = [];
      let curFreshIdx = freshIdx;
      for (let round = 0; round < 3 && allItems.length < targetCount; round++) {
        const params = new URLSearchParams({ ps: String(targetCount), fresh_idx: String(curFreshIdx), fresh_type: "3" });
        let items: any[] = [];
        let primaryError: unknown;
        try {
          const result = await this.dependencies.api<any>(`https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?${params}`, controller.signal);
          if (!Array.isArray(result?.item)) throw new Error("推荐接口返回格式异常");
          items = result.item;
        } catch (error) {
          if (controller.signal.aborted) throw error;
          primaryError = error;
        }
        if (!current()) return;
        controller.signal.throwIfAborted();
        if (!items.length && !allItems.length) {
          const popular = await this.dependencies.api<any>(`https://api.bilibili.com/x/web-interface/popular?ps=${targetCount}&pn=${page}`, controller.signal);
          if (!Array.isArray(popular?.list)) throw new Error("热门接口返回格式异常");
          items = popular.list;
        }
        if (!current()) return;
        controller.signal.throwIfAborted();
        if (!items.length) {
          if (primaryError) throw primaryError;
          break;
        }
        allItems = allItems.concat(items);
        curFreshIdx++;
      }

      const videos: BiliRecentVideo[] = allItems.slice(0, targetCount).map(it => ({
        bvid: it.bvid || (it.aid ? `av${it.aid}` : ""),
        aid: it.aid || it.id,
        title: it.title || "未命名推荐视频",
        cover: (it.pic || "").replace(/^http:/, "https:"),
        duration: Number(it.duration || 0),
        play: Number(it.stat?.view || 0),
        upper: it.owner?.name || it.author || "UP主",
        upMid: String(it.owner?.mid || it.mid || ""),
        pubTs: it.pubdate || 0,
        pubTimeDesc: it.pubdate ? new Date(it.pubdate * 1000).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }) : "推荐"
      }));
      if (!current()) return;
      controller.signal.throwIfAborted();
      Object.assign(this.state, { videos, page, freshIdx: curFreshIdx, pendingScroll: scroll });
      this.publishRecommendationSnapshot();
    } catch (error) {
      if (!current()) return;
      if (controller.signal.aborted && !timedOut) return;
      this.dependencies.publish({ specialLoading: false, specialError: timedOut ? "推荐加载超时，请手动重试" : (error instanceof Error ? error.message : "推荐加载失败") });
    } finally {
      if (current()) {
        clearTimeout(this.timeout);
        this.timeout = undefined;
        this.request = null;
        this.state.loading = false;
        this.state.pendingScroll = false;
        this.dependencies.publish({ specialLoading: false });
      }
    }
  }

  public publishRecommendationSnapshot(): void {
    if (!this.active) return;
    const specialVideos = this.state.videos.map(video => ({
      id: String(video.bvid || video.aid || ""), aid: String(video.aid || ""), bvid: String(video.bvid || ""),
      title: String(video.title || "未命名推荐视频"), cover: String(video.cover || "").replace(/^http:/, "https:"),
      url: video.bvid ? `https://www.bilibili.com/video/${video.bvid}` : "#",
      duration: formatBiliDuration(video.duration), playCount: formatBiliCompactNumber(video.play),
      author: String(video.upper || "UP主"), authorMid: String(video.upMid || ""), authorFace: "",
      favoriteDate: String(video.pubTimeDesc || "推荐"), selected: false, writable: false
    }));
    this.dependencies.publish({
      specialLoading: false, specialError: "", specialTitle: "个性推荐",
      specialSubtitle: "根据您的喜好与全站热门为您推荐 · 点击右上刷新换一批",
      specialBadge: `第 ${this.state.page} 批`, specialPage: this.state.page, specialVideos
    });
    if (this.state.pendingScroll) {
      this.state.pendingScroll = false;
      this.dependencies.scrollToStart();
    }
  }
}
