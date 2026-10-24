import { reactive } from "vue";
import {
  bilibiliService,
  getBiliQualityShortLabel,
  type BiliVideoPage,
  type BiliDanmakuItem
} from "../services/bilibili.service";

export interface BiliMiniPlayerComment {
  id: string | number;
  mid?: string | number;
  uname: string;
  avatar: string;
  message: string;
  timeStr: string;
  likeCount: number;
  replyCount?: number;
  emotes?: Record<string, string>;
  isUp?: boolean;
  replies?: Array<{ id: string | number; userName: string; message: string }>;
  subRepliesExpanded?: boolean;
  subRepliesLoading?: boolean;
  subRepliesHasMore?: boolean;
  subRepliesPage?: number;
}

export interface BiliMiniPlayerState {
  isOpen: boolean;
  collapsed: boolean;
  isLoading: boolean;
  errorMsg: string;

  // 视频基础元数据
  bvid: string;
  aid: string;
  cid: number | string;
  title: string;
  cover: string;
  author: string;
  authorMid: string | number;
  authorFace: string;
  pubdate: string;
  description: string;

  // 播放流及控制
  videoSrc: string;
  iframeSrc: string;
  useIframe: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  currentQuality: number;
  qualities: Array<{ qn: number; desc: string }>;
  qualityMenuOpen: boolean;
  speedMenuOpen: boolean;

  // 选集 (多P)
  pages: BiliVideoPage[];
  currentPageIndex: number;
  episodesOpen: boolean;

  // 简介抽屉
  descOpen: boolean;

  // 评论抽屉
  commentsOpen: boolean;
  commentsSort: number; // 2: 最热, 0: 最新 (匹配 B站评论接口)
  commentsPage: number;
  comments: BiliMiniPlayerComment[];
  totalComments: number;
  commentsLoading: boolean;
  hasMoreComments: boolean;

  // 弹幕数据与飞屏开关
  danmakuEnabled: boolean; // 弹幕飞屏开关
  danmakuList: BiliDanmakuItem[];
  danmakuLoading: boolean;

  // 窗口坐标与尺寸
  x: number;
  y: number;
  baseWidth: number; // 0 = responsive default; drawers add their own width
  height: number; // 0 = default height
  zIndex: number;
}

const defaultState: BiliMiniPlayerState = {
  isOpen: false,
  collapsed: false,
  isLoading: false,
  errorMsg: "",

  bvid: "",
  aid: "",
  cid: "",
  title: "",
  cover: "",
  author: "",
  authorMid: "",
  authorFace: "",
  pubdate: "",
  description: "",

  videoSrc: "",
  iframeSrc: "",
  useIframe: false,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  playbackRate: 1.0,
  currentQuality: 64,
  qualities: [
    { qn: 80, desc: "1080P 高清" },
    { qn: 64, desc: "720P 高清" },
    { qn: 32, desc: "480P 清晰" },
    { qn: 16, desc: "360P 流畅" }
  ],
  qualityMenuOpen: false,
  speedMenuOpen: false,

  pages: [],
  currentPageIndex: 0,
  episodesOpen: false,

  descOpen: false,

  commentsOpen: false,
  commentsSort: 2,
  commentsPage: 1,
  comments: [],
  totalComments: 0,
  commentsLoading: false,
  hasMoreComments: false,

  danmakuEnabled: true,
  danmakuList: [],
  danmakuLoading: false,

  x: typeof window !== "undefined" ? Math.max(16, window.innerWidth - 420) : 100,
  y: typeof window !== "undefined" ? Math.max(76, window.innerHeight - 300) : 100,
  baseWidth: 0,
  height: 0,
  zIndex: 10000
};

export const biliMiniPlayerState = reactive<BiliMiniPlayerState>({ ...defaultState });

let globalZIndex = 10000;

function notifyToast(text: string, isError = false) {
  const g = globalThis as any;
  if (typeof g.showBiliToast === "function") {
    g.showBiliToast(text, 3200, { isError });
  } else if (typeof g.showWindowsToast === "function") {
    g.showWindowsToast({
      id: `bili_mini_${Date.now()}`,
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: "B站迷你播放器",
      message: text,
      duration: 3200
    });
  }
}

let cachedObjectUrl = "";
function releaseCachedObjectUrl(): void {
  if (cachedObjectUrl) URL.revokeObjectURL(cachedObjectUrl);
  cachedObjectUrl = "";
}

export const biliMiniPlayerController = {
  get state() {
    return biliMiniPlayerState;
  },

  bringToFront() {
    biliMiniPlayerState.zIndex = ++globalZIndex;
  },

  /**
   * 打开并播放指定视频
   */
  async openVideo(videoPayload: {
    bvid?: string;
    aid?: string | number;
    mid?: string | number;
    title?: string;
    cover?: string;
    author?: string;
    authorFace?: string;
    cid?: number | string;
    url?: string;
    cachedSourceUrl?: string;
  }) {
    const bvid = videoPayload.bvid || "";
    const aid = videoPayload.aid ? String(videoPayload.aid) : "";
    if (!bvid && !aid) {
      notifyToast("无法播放：缺少视频标识 (BV/AV号)", true);
      return;
    }

    this.bringToFront();

    // 如果当前正在播放同一个视频且播放源正常，只需取消折叠并唤醒
    const isSameVideo = biliMiniPlayerState.bvid === bvid || (Boolean(aid) && biliMiniPlayerState.aid === aid);
    if (biliMiniPlayerState.isOpen && isSameVideo && !videoPayload.cachedSourceUrl && (biliMiniPlayerState.videoSrc || biliMiniPlayerState.iframeSrc) && !biliMiniPlayerState.errorMsg) {
      biliMiniPlayerState.collapsed = false;
      return;
    }

    // 先释放上一个本地文件的 Object URL，再切换视频源。
    releaseCachedObjectUrl();
    // 重置状态
    biliMiniPlayerState.isOpen = true;
    biliMiniPlayerState.collapsed = false;
    biliMiniPlayerState.isLoading = true;
    biliMiniPlayerState.errorMsg = "";
    biliMiniPlayerState.bvid = bvid;
    biliMiniPlayerState.aid = aid;
    biliMiniPlayerState.cid = videoPayload.cid || "";
    biliMiniPlayerState.title = videoPayload.title || bvid || "加载中…";
    biliMiniPlayerState.cover = videoPayload.cover || "";
    biliMiniPlayerState.author = videoPayload.author || "";
    biliMiniPlayerState.authorMid = videoPayload.mid ? String(videoPayload.mid) : "";
    biliMiniPlayerState.authorFace = videoPayload.authorFace || "";
    biliMiniPlayerState.videoSrc = "";
    biliMiniPlayerState.iframeSrc = "";
    biliMiniPlayerState.useIframe = false;
    biliMiniPlayerState.currentTime = 0;
    biliMiniPlayerState.pages = [];
    biliMiniPlayerState.currentPageIndex = 0;
    biliMiniPlayerState.comments = [];
    biliMiniPlayerState.commentsPage = 1;
    biliMiniPlayerState.hasMoreComments = false;
    biliMiniPlayerState.totalComments = 0;
    biliMiniPlayerState.danmakuList = [];
    biliMiniPlayerState.danmakuLoading = false;

    // 默认自适应坐标（居中偏上，最佳视觉焦点）
    if (typeof window !== "undefined") {
      const defaultW = 380;
      biliMiniPlayerState.x = Math.max(20, Math.floor((window.innerWidth - defaultW) / 2));
      biliMiniPlayerState.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)));
    }

    if (videoPayload.cachedSourceUrl) {
      cachedObjectUrl = videoPayload.cachedSourceUrl;
      biliMiniPlayerState.videoSrc = cachedObjectUrl;
      biliMiniPlayerState.isLoading = false;
      return;
    }

    try {
      const streamResult = await bilibiliService.resolvePlayStream({
        bvid,
        aid,
        cid: videoPayload.cid,
        title: videoPayload.title,
        cover: videoPayload.cover,
        preferredQuality: biliMiniPlayerState.currentQuality
      });

      biliMiniPlayerState.title = streamResult.title || videoPayload.title || bvid;
      biliMiniPlayerState.cover = streamResult.poster || videoPayload.cover || "";
      biliMiniPlayerState.author = streamResult.owner || videoPayload.author || "UP主";
      biliMiniPlayerState.authorFace = streamResult.ownerFace || videoPayload.authorFace || "";
      if (streamResult.ownerMid) {
        biliMiniPlayerState.authorMid = String(streamResult.ownerMid);
      }
      biliMiniPlayerState.aid = streamResult.aid ? String(streamResult.aid) : aid;
      biliMiniPlayerState.bvid = streamResult.bvid || bvid;
      biliMiniPlayerState.cid = streamResult.cid || "";
      biliMiniPlayerState.description = streamResult.desc || "";
      biliMiniPlayerState.pubdate = streamResult.pubdate
        ? new Date(streamResult.pubdate * 1000).toLocaleString()
        : "";

      // 选集列表
      biliMiniPlayerState.pages = streamResult.pages || [];
      biliMiniPlayerState.currentPageIndex = Math.max(0, streamResult.currentPage - 1);

      // 清晰度列表
      if (streamResult.acceptQuality?.length) {
        biliMiniPlayerState.qualities = streamResult.acceptQuality.map((qn, idx) => ({
          qn,
          desc: streamResult.acceptDescription?.[idx] || getBiliQualityShortLabel(qn)
        }));
      }
      biliMiniPlayerState.currentQuality = streamResult.currentQuality || 64;

      // 播放源
      if (streamResult.sources && streamResult.sources.length) {
        biliMiniPlayerState.videoSrc = streamResult.sources[0];
        biliMiniPlayerState.isPlaying = true;
        // 若弹幕开关已开启，自动静默预加载弹幕
        if (biliMiniPlayerState.danmakuEnabled) {
          void this.loadDanmaku();
        }
      } else {
        throw new Error("未能获取到直链源");
      }
    } catch (err: any) {
      biliMiniPlayerState.errorMsg = err?.message || "未能获取到视频播放流";
      notifyToast(`视频加载未完成：${biliMiniPlayerState.errorMsg}`, true);
    } finally {
      biliMiniPlayerState.isLoading = false;
    }
  },

  /**
   * 重新拉取当前视频
   */
  async retryCurrentVideo() {
    if (biliMiniPlayerState.bvid || biliMiniPlayerState.aid) {
      await this.openVideo({
        bvid: biliMiniPlayerState.bvid,
        aid: biliMiniPlayerState.aid,
        cid: biliMiniPlayerState.cid,
        title: biliMiniPlayerState.title,
        cover: biliMiniPlayerState.cover,
        author: biliMiniPlayerState.author,
        authorFace: biliMiniPlayerState.authorFace
      });
    }
  },

  /**
   * 切换原生 HTML5 与官方 iframe 模式
   */
  togglePlayerMode() {
    if (!biliMiniPlayerState.videoSrc && !biliMiniPlayerState.useIframe) {
      notifyToast("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    biliMiniPlayerState.useIframe = !biliMiniPlayerState.useIframe;
    if (biliMiniPlayerState.useIframe && !biliMiniPlayerState.iframeSrc) {
      biliMiniPlayerState.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(biliMiniPlayerState.bvid)}&autoplay=1&danmaku=0&high_quality=1`;
    }
    notifyToast(biliMiniPlayerState.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },

  /**
   * 切换选集（分P）
   */
  async switchEpisode(index: number) {
    if (index < 0 || index >= biliMiniPlayerState.pages.length) return;
    const targetPage = biliMiniPlayerState.pages[index];
    if (!targetPage) return;

    biliMiniPlayerState.currentPageIndex = index;
    biliMiniPlayerState.cid = targetPage.cid;
    biliMiniPlayerState.isLoading = true;
    biliMiniPlayerState.errorMsg = "";
    biliMiniPlayerState.danmakuList = [];
    biliMiniPlayerState.danmakuLoading = false;

    try {
      const streamInfo = await bilibiliService.fetchPlayStream(
        biliMiniPlayerState.bvid,
        targetPage.cid,
        biliMiniPlayerState.currentQuality
      );
      if (streamInfo.sources?.length) {
        biliMiniPlayerState.videoSrc = streamInfo.sources[0];
        biliMiniPlayerState.currentTime = 0;
        biliMiniPlayerState.isPlaying = true;
        if (biliMiniPlayerState.danmakuEnabled) {
          void this.loadDanmaku();
        }
      } else {
        throw new Error("获取分P视频流失败");
      }
    } catch (err: any) {
      biliMiniPlayerState.errorMsg = err?.message || "切换选集失败";
      notifyToast(`分P切换失败：${biliMiniPlayerState.errorMsg}`, true);
    } finally {
      biliMiniPlayerState.isLoading = false;
    }
  },

  /**
   * 切换清晰度
   */
  async switchQuality(qn: number) {
    biliMiniPlayerState.qualityMenuOpen = false;
    if (qn === biliMiniPlayerState.currentQuality) return;

    biliMiniPlayerState.isLoading = true;
    const curTime = biliMiniPlayerState.currentTime;

    try {
      const streamInfo = await bilibiliService.fetchPlayStream(
        biliMiniPlayerState.bvid,
        biliMiniPlayerState.cid,
        qn
      );
      if (streamInfo.sources?.length) {
        biliMiniPlayerState.videoSrc = streamInfo.sources[0];
        biliMiniPlayerState.currentQuality = streamInfo.quality;
        biliMiniPlayerState.currentTime = curTime;
        biliMiniPlayerState.isPlaying = true;
        notifyToast(`已切换清晰度为 ${getBiliQualityShortLabel(qn)}`);
      }
    } catch (err: any) {
      notifyToast(`清晰度切换失败：${err?.message || "网络异常"}`, true);
    } finally {
      biliMiniPlayerState.isLoading = false;
    }
  },

  /**
   * 切换倍速
   */
  setPlaybackRate(rate: number) {
    biliMiniPlayerState.playbackRate = rate;
    biliMiniPlayerState.speedMenuOpen = false;
  },

  /**
   * 折叠 / 展开
   */
  toggleCollapse() {
    biliMiniPlayerState.collapsed = !biliMiniPlayerState.collapsed;
    if (biliMiniPlayerState.collapsed) {
      biliMiniPlayerState.episodesOpen = false;
      biliMiniPlayerState.descOpen = false;
      biliMiniPlayerState.commentsOpen = false;
    }
  },

  /**
   * 关闭播放器
   */
  close() {
    releaseCachedObjectUrl();
    biliMiniPlayerState.isOpen = false;
    biliMiniPlayerState.isPlaying = false;
    biliMiniPlayerState.videoSrc = "";
    biliMiniPlayerState.episodesOpen = false;
    biliMiniPlayerState.descOpen = false;
    biliMiniPlayerState.commentsOpen = false;
  },

  /**
   * 切换选集抽屉
   */
  toggleEpisodes(open?: boolean) {
    biliMiniPlayerState.episodesOpen = open !== undefined ? open : !biliMiniPlayerState.episodesOpen;
  },

  /**
   * 切换简介抽屉
   */
  toggleDesc(open?: boolean) {
    biliMiniPlayerState.descOpen = open !== undefined ? open : !biliMiniPlayerState.descOpen;
  },

  /**
   * 切换评论抽屉
   */
  toggleComments(open?: boolean) {
    const next = open !== undefined ? open : !biliMiniPlayerState.commentsOpen;
    biliMiniPlayerState.commentsOpen = next;
    if (next && (!biliMiniPlayerState.comments.length || biliMiniPlayerState.commentsLoading)) {
      void this.loadComments(true);
    }
  },

  /**
   * 切换弹幕飞屏开关（B站原版体验：点击就开，再点击就关）
   */
  toggleDanmakuEnabled(enabled?: boolean) {
    const next = enabled !== undefined ? enabled : !biliMiniPlayerState.danmakuEnabled;
    biliMiniPlayerState.danmakuEnabled = next;
    notifyToast(next ? "已开启弹幕" : "已关闭弹幕");
    if (next && (!biliMiniPlayerState.danmakuList.length || biliMiniPlayerState.danmakuLoading)) {
      void this.loadDanmaku();
    }
  },

  /**
   * 加载视频弹幕
   */
  async loadDanmaku(force = false) {
    if (biliMiniPlayerState.danmakuList.length > 0 && !force) return;
    biliMiniPlayerState.danmakuLoading = true;
    try {
      let cid = biliMiniPlayerState.cid;
      if (!cid && biliMiniPlayerState.bvid) {
        const view = await bilibiliService.getVideoView(biliMiniPlayerState.bvid);
        if (view?.cid) {
          cid = view.cid;
          biliMiniPlayerState.cid = cid;
        }
      }
      if (!cid) {
        biliMiniPlayerState.danmakuLoading = false;
        notifyToast("未能获取到当前视频的 cid，暂无法拉取弹幕", true);
        return;
      }

      const list = await bilibiliService.getVideoDanmaku(cid);
      biliMiniPlayerState.danmakuList = list;
      if (list.length > 0) {
        notifyToast(`✓ 已成功获取 ${list.length} 条弹幕`);
      } else {
        notifyToast("当前视频暂无弹幕或弹幕列表为空");
      }
    } catch (err: any) {
      console.warn("[MiniPlayer] 获取弹幕失败:", err);
      notifyToast(`获取弹幕失败: ${err?.message || "网络异常"}`, true);
    } finally {
      biliMiniPlayerState.danmakuLoading = false;
    }
  },

  /**
   * 复制简介
   */
  async copyDescription() {
    const lines = [
      `标题：${biliMiniPlayerState.title}`,
      biliMiniPlayerState.author ? `UP主：${biliMiniPlayerState.author}` : "",
      biliMiniPlayerState.pubdate ? `发布时间：${biliMiniPlayerState.pubdate}` : "",
      biliMiniPlayerState.bvid ? `链接：https://www.bilibili.com/video/${biliMiniPlayerState.bvid}` : "",
      "",
      biliMiniPlayerState.description || "暂无简介"
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      notifyToast("已复制视频简介到剪贴板");
    } catch {
      notifyToast("复制简介失败", true);
    }
  },

  /**
   * 加载视频评论
   */
  async loadComments(reset = false) {
    if (reset) {
      biliMiniPlayerState.commentsPage = 1;
      biliMiniPlayerState.comments = [];
    }
    biliMiniPlayerState.commentsLoading = true;

    try {
      let aid = biliMiniPlayerState.aid;
      if (!aid && biliMiniPlayerState.bvid) {
        const view = await bilibiliService.getVideoView(biliMiniPlayerState.bvid);
        if (view?.aid) {
          aid = String(view.aid);
          biliMiniPlayerState.aid = aid;
        }
      }
      if (!aid) {
        biliMiniPlayerState.commentsLoading = false;
        return;
      }

      const res = await bilibiliService.getVideoComments(
        aid,
        biliMiniPlayerState.commentsPage,
        20,
        biliMiniPlayerState.commentsSort
      );

      const mapped: BiliMiniPlayerComment[] = (res.comments || []).map((c: any) => {
        const cMid = c.mid ? String(c.mid) : "";
        const cUname = String(c.uname || "").trim();
        const authorMid = biliMiniPlayerState.authorMid ? String(biliMiniPlayerState.authorMid) : "";
        const authorName = String(biliMiniPlayerState.author || "").trim();
        const isUp = Boolean(
          (authorMid && cMid && authorMid === cMid) ||
          (authorName && cUname && authorName === cUname)
        );
        return {
          id: String(c.rpid),
          mid: cMid,
          uname: c.uname,
          avatar: c.avatar,
          message: c.message,
          timeStr: c.timeText,
          likeCount: c.like || 0,
          replyCount: c.rcount || 0,
          emotes: c.emotes,
          isUp,
          replies: (c.replies || []).map((r: any) => ({
            id: String(r.rpid),
            userName: r.uname,
            message: r.message
          }))
        };
      });

      if (reset) {
        biliMiniPlayerState.comments = mapped;
      } else {
        biliMiniPlayerState.comments = [...biliMiniPlayerState.comments, ...mapped];
      }

      biliMiniPlayerState.totalComments = res.total || biliMiniPlayerState.comments.length;
      biliMiniPlayerState.hasMoreComments = res.hasMore;
    } catch (err: any) {
      notifyToast(`评论加载失败：${err?.message || "网络异常"}`, true);
    } finally {
      biliMiniPlayerState.commentsLoading = false;
    }
  },

  /**
   * 切换评论排序
   */
  setCommentsSort(sort: number) {
    if (biliMiniPlayerState.commentsSort === sort) return;
    biliMiniPlayerState.commentsSort = sort;
    void this.loadComments(true);
  },

  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(rootRpid: string | number) {
    const comment = biliMiniPlayerState.comments.find(c => String(c.id) === String(rootRpid));
    if (!comment || comment.subRepliesLoading) return;

    if (!comment.subRepliesPage) comment.subRepliesPage = 1;
    else comment.subRepliesPage++;

    comment.subRepliesLoading = true;
    comment.subRepliesExpanded = true;

    try {
      let aid = biliMiniPlayerState.aid;
      if (!aid && biliMiniPlayerState.bvid) {
        const view = await bilibiliService.getVideoView(biliMiniPlayerState.bvid);
        if (view?.aid) {
          aid = String(view.aid);
          biliMiniPlayerState.aid = aid;
        }
      }
      if (!aid) {
        comment.subRepliesLoading = false;
        return;
      }

      const res = await bilibiliService.getSubReplies(aid, rootRpid, comment.subRepliesPage, 10);
      const newReplies = (res.replies || []).map(r => ({
        id: String(r.rpid),
        userName: r.uname,
        message: r.message
      }));

      // 合并并去重
      const existingIds = new Set((comment.replies || []).map(r => String(r.id)));
      const filtered = newReplies.filter(r => !existingIds.has(String(r.id)));
      comment.replies = [...(comment.replies || []), ...filtered];
      comment.subRepliesHasMore = res.hasMore;
    } catch (err: any) {
      notifyToast(`子回复加载失败：${err?.message || "网络异常"}`, true);
    } finally {
      comment.subRepliesLoading = false;
    }
  },

  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(rootRpid: string | number) {
    const comment = biliMiniPlayerState.comments.find(c => String(c.id) === String(rootRpid));
    if (comment) {
      comment.subRepliesExpanded = false;
    }
  },

  /**
   * 加载更多评论
   */
  loadMoreComments() {
    if (biliMiniPlayerState.commentsLoading || !biliMiniPlayerState.hasMoreComments) return;
    biliMiniPlayerState.commentsPage++;
    void this.loadComments(false);
  }
};
