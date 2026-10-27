import { reactive } from "vue";
import { PlaybackSession } from "./playback-request";
import {
  bilibiliService,
  getBiliQualityFullLabel,
  type BiliVideoPage
} from "../services/bilibili.service";

const playbackSession = new PlaybackSession();

export interface BiliCommentItem {
  id: string | number;
  userName: string;
  avatar?: string;
  message: string;
  timeStr?: string;
  likeCount?: number;
  level?: number;
  replyCount?: number;
  pictures?: string[];
  replies?: Array<{ id: string | number; userName: string; message: string }>;
  subRepliesExpanded?: boolean;
  subRepliesLoading?: boolean;
  subRepliesHasMore?: boolean;
  subRepliesPage?: number;
}

export interface BiliSrtItem {
  id: number | string;
  from: number;
  to: number;
  content: string;
}

export interface BiliTheaterState {
  mounted: boolean;
  isOpen: boolean;
  title: string;
  author: string;
  bvid: string;
  aid: string;
  cid: string | number;
  openBiliUrl: string;
  cover: string;
  videoSrc: string;
  sourceUrls: string[];
  iframeSrc: string;
  useIframe: boolean;
  canDirectPlay: boolean;
  // 清晰度与多P
  currentQuality: number;
  acceptQualities: Array<{ qn: number; label: string }>;
  pages: BiliVideoPage[];
  currentPage: number;
  // 评论
  commentsCountText: string;
  commentsSort: number; // 1: 按热度, 0: 按最新
  comments: BiliCommentItem[];
  commentsPage: number;
  commentsLoading: boolean;
  commentsStatus: string;
  hasMoreComments: boolean;
  // 字幕
  srtDrawerOpen: boolean;
  srtCountText: string;
  srtLines: BiliSrtItem[];
  srtLoading: boolean;
  rawSubtitleText: string;
}

const state = reactive<BiliTheaterState>({
  mounted: false,
  isOpen: false,
  title: "--",
  author: "",
  bvid: "",
  aid: "",
  cid: "",
  openBiliUrl: "",
  cover: "",
  videoSrc: "",
  sourceUrls: [],
  iframeSrc: "",
  useIframe: false,
  canDirectPlay: false,
  currentQuality: 64,
  acceptQualities: [],
  pages: [],
  currentPage: 1,
  commentsCountText: "0 条",
  commentsSort: 1,
  comments: [],
  commentsPage: 1,
  commentsLoading: false,
  commentsStatus: "",
  hasMoreComments: false,
  srtDrawerOpen: false,
  srtCountText: "0 句",
  srtLines: [],
  srtLoading: false,
  rawSubtitleText: ""
});

type BiliTheaterActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: BiliTheaterActionCallback | null = null;

function notifyToast(msg: string, isError = false) {
  if (typeof (window as any).showBiliToast === "function") {
    (window as any).showBiliToast(msg, isError ? 4000 : 2500, { isError, target: { type: "bili-video", bvid: state.bvid, aid: state.aid } });
  } else if (typeof (window as any).notifyToast === "function") {
    (window as any).notifyToast(msg, { isError });
  }
}

export const biliTheaterController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  update(partial: Record<string, any>) {
    const normalized: Partial<BiliTheaterState> = { ...partial };
    if ("videoUrl" in partial) normalized.openBiliUrl = partial.videoUrl;
    if ("commentsCount" in partial) normalized.commentsCountText = partial.commentsCount;
    if ("sort" in partial) normalized.commentsSort = Number(partial.sort);
    if ("isCommentsLoading" in partial) normalized.commentsLoading = Boolean(partial.isCommentsLoading);
    if ("isSrtOpen" in partial) normalized.srtDrawerOpen = Boolean(partial.isSrtOpen);
    if ("srtCount" in partial) normalized.srtCountText = partial.srtCount;
    if ("srtCues" in partial) normalized.srtLines = partial.srtCues || [];
    if ("isSrtLoading" in partial) normalized.srtLoading = Boolean(partial.isSrtLoading);
    Object.assign(state, normalized);
  },

  onAction(cb: BiliTheaterActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    return undefined;
  },

  /**
   * 启动并播放指定视频 (自动解析直链、加载评论和字幕)
   */
  async openVideo(
    video: {
      bvid?: string;
      aid?: string | number;
      cid?: string | number;
      title?: string;
      cover?: string;
      author?: string;
      url?: string;
      preferredQuality?: number;
    },
    preferredPage = 1
  ) {
    const signal = playbackSession.start();
    // 暂停其他可能正在播放的媒体
    if (typeof document !== "undefined") {
      document.querySelectorAll("video, audio").forEach((m) => {
        try { (m as HTMLMediaElement).pause(); } catch {}
      });
    }

    const bvid = video.bvid || (String(video.aid || "").startsWith("BV") ? String(video.aid) : "");
    const targetUrl = video.url || (bvid ? `https://www.bilibili.com/video/${bvid}` : "");

    state.isOpen = true;
    state.bvid = bvid;
    state.aid = String(video.aid || "");
    state.title = video.title || bvid || "B站视频";
    state.author = video.author ? `UP: ${video.author}` : "";
    state.cover = (video.cover || "").replace(/^http:/, "https:");
    state.openBiliUrl = targetUrl;
    state.videoSrc = "";
    state.sourceUrls = [];
    state.iframeSrc = "";
    state.useIframe = false;
    state.canDirectPlay = false;
    state.cid = "";
    state.pages = [];
    state.acceptQualities = [];
    state.comments = [];
    state.commentsPage = 1;
    state.commentsLoading = true;
    state.commentsStatus = "";
    state.hasMoreComments = false;
    state.srtDrawerOpen = false;
    state.srtLines = [];
    state.srtCountText = "0 句";
    state.rawSubtitleText = "";

    this.dispatch("open", video);

    // 1. 尝试解析 HTML5 直链视频流
    try {
      const stream = await bilibiliService.resolvePlayStream(video, preferredPage, signal);
      signal.throwIfAborted();
      if (stream.sources && stream.sources.length) {
        state.sourceUrls = stream.sources;
        state.videoSrc = stream.sources[0];
        state.cid = stream.cid || "";
        state.aid = String(stream.aid || state.aid);
        state.pages = stream.pages || [];
        state.currentPage = stream.currentPage || 1;
        state.currentQuality = stream.currentQuality || 64;
        state.acceptQualities = (stream.acceptQuality || []).map((qn, idx) => ({
          qn,
          label: getBiliQualityFullLabel(qn, stream.acceptDescription[idx])
        }));
        state.canDirectPlay = true;
        state.useIframe = false;
      } else {
        throw new Error("无可用直链源");
      }
    } catch (error: any) {
      if (signal.aborted) return;
      state.canDirectPlay = false;
      state.commentsLoading = false;
      notifyToast(error?.message || "视频加载失败，请手动重试或在B站打开", true);
    }

    // 2. 异步并行加载评论与字幕
    void this.loadComments(true);
    void this.loadSubtitles();
  },

  open(options?: Partial<BiliTheaterState> | Record<string, any>) {
    if (options) {
      if (options.bvid) {
        this.openVideo(options as any);
        return;
      }
      this.update(options);
    }
    state.isOpen = true;
    this.dispatch("open", options);
  },

  close() {
    playbackSession.cancel();
    state.sourceUrls = [];
    state.isOpen = false;
    state.videoSrc = "";
    state.iframeSrc = "";
    state.srtDrawerOpen = false;
    if (typeof document !== "undefined") {
      const videoEl = document.getElementById("bili-theater-video") as HTMLVideoElement | null;
      if (videoEl) {
        try { videoEl.pause(); } catch {}
      }
    }
    this.dispatch("close");
  },

  playbackFailed() {
    notifyToast("视频源加载失败，备用地址已用尽，请重新打开视频或在B站播放", true);
  },

  togglePlayerMode() {
    if (!state.videoSrc && state.useIframe) {
      notifyToast("该视频未获取到原生直链源，保持嵌入模式");
      return;
    }
    state.useIframe = !state.useIframe;
  },

  /**
   * 切换视频清晰度
   */
  async switchQuality(qn: number) {
    if (!state.bvid || !state.cid) return;
    const signal = playbackSession.start();
    try {
      const videoEl = document.getElementById("bili-theater-video") as HTMLVideoElement | null;
      const curTime = videoEl?.currentTime || 0;
      const streamInfo = await bilibiliService.fetchPlayStream(state.bvid, state.cid, qn, signal);
      signal.throwIfAborted();
      if (streamInfo.sources && streamInfo.sources.length) {
        state.sourceUrls = streamInfo.sources;
        state.videoSrc = streamInfo.sources[0];
        state.currentQuality = streamInfo.quality;
        if (videoEl) {
          videoEl.currentTime = curTime;
          videoEl.play().catch(() => {});
        }
        notifyToast(`已切换至清晰度：${getBiliQualityFullLabel(qn)}`);
      }
    } catch (e: any) {
      if (signal.aborted) return;
      notifyToast(`清晰度切换失败：${e?.message || "网络异常"}`, true);
    }
  },

  /**
   * 加载或刷新评论区 (支持最新/最热排序)
   */
  async loadComments(reset = false) {
    if (reset) {
      state.commentsPage = 1;
      state.comments = [];
    }
    state.commentsLoading = true;
    state.commentsStatus = "";

    try {
      let aid = state.aid;
      if (!aid && state.bvid) {
        const view = await bilibiliService.getVideoView(state.bvid);
        if (view?.aid) {
          aid = String(view.aid);
          state.aid = aid;
        }
      }
      if (!aid) {
        state.commentsLoading = false;
        state.commentsStatus = "暂无法获取视频评论";
        return;
      }

      const res = await bilibiliService.getVideoComments(aid, state.commentsPage, 20, state.commentsSort);
      const mapped: BiliCommentItem[] = (res.comments || []).map((c: any) => ({
        id: String(c.rpid),
        userName: c.uname,
        avatar: c.avatar,
        message: c.message,
        timeStr: c.timeText,
        likeCount: c.like,
        replyCount: c.rcount,
        pictures: c.pictures || [],
        replies: (c.replies || []).map((r: any) => ({ id: String(r.rpid), userName: r.uname, message: r.message }))
      }));

      if (reset) {
        state.comments = mapped;
      } else {
        state.comments = [...state.comments, ...mapped];
      }

      state.commentsCountText = `${res.total || state.comments.length} 条`;
      state.hasMoreComments = res.hasMore;
      state.commentsLoading = false;
      if (!state.comments.length) {
        state.commentsStatus = "暂无评论";
      }
    } catch (err: any) {
      state.commentsLoading = false;
      state.commentsStatus = `评论加载失败：${err?.message || "网络错误"}`;
    }
  },

  setSort(sort: number) {
    if (state.commentsSort === sort) return;
    state.commentsSort = sort;
    this.dispatch("changeSort", { sort });
    this.loadComments(true);
  },

  loadMoreComments() {
    if (state.commentsLoading || !state.hasMoreComments) return;
    state.commentsPage++;
    this.dispatch("loadMoreComments");
    this.loadComments(false);
  },

  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(rootRpid: string | number) {
    const comment = state.comments.find(c => String(c.id) === String(rootRpid));
    if (!comment || comment.subRepliesLoading) return;

    if (!comment.subRepliesPage) comment.subRepliesPage = 1;
    else comment.subRepliesPage++;

    comment.subRepliesLoading = true;
    comment.subRepliesExpanded = true;

    try {
      let aid = state.aid;
      if (!aid && state.bvid) {
        const view = await bilibiliService.getVideoView(state.bvid);
        if (view?.aid) {
          aid = String(view.aid);
          state.aid = aid;
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

      const existingIds = new Set((comment.replies || []).map(r => String(r.id)));
      const filtered = newReplies.filter(r => !existingIds.has(String(r.id)));
      comment.replies = [...(comment.replies || []), ...filtered];
      comment.subRepliesHasMore = res.hasMore;
    } finally {
      comment.subRepliesLoading = false;
    }
  },

  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(rootRpid: string | number) {
    const comment = state.comments.find(c => String(c.id) === String(rootRpid));
    if (comment) {
      comment.subRepliesExpanded = false;
    }
  },

  /**
   * 加载视频字幕轨道
   */
  async loadSubtitles() {
    if (!state.bvid) return;
    state.srtLoading = true;
    try {
      const res = await bilibiliService.fetchVideoSubtitleDetails(state.bvid, state.cid);
      if (res.ok && res.cues.length) {
        state.srtLines = res.cues.map((c) => ({
          id: c.id || `${c.from}`,
          from: c.from,
          to: c.to,
          content: c.content
        }));
        state.srtCountText = `${state.srtLines.length} 句`;
        state.rawSubtitleText = res.bodyText || "";
      } else {
        state.srtLines = [];
        state.srtCountText = "暂无字幕";
        state.rawSubtitleText = "";
      }
    } catch {
      state.srtLines = [];
      state.srtCountText = "字幕暂不可用";
    } finally {
      state.srtLoading = false;
    }
  },

  toggleSrt(force?: boolean) {
    state.srtDrawerOpen = typeof force === "boolean" ? force : !state.srtDrawerOpen;
    if (state.srtDrawerOpen && !state.srtLines.length && !state.srtLoading) {
      this.loadSubtitles();
    }
    this.dispatch("toggleSrt", { open: state.srtDrawerOpen });
  },

  async copySrt() {
    let text = state.rawSubtitleText;
    if (!text && state.srtLines.length) {
      text = state.srtLines.map((l) => l.content).join("\r\n");
    }
    if (!text) {
      notifyToast("当前视频暂无可用字幕可供复制", true);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      notifyToast("📋 已复制纯文本字幕到剪贴板！");
    } catch {
      notifyToast("复制到剪贴板失败，请检查浏览器权限", true);
    }
    this.dispatch("copySrt");
  },

  analyzeSrtWithAi() {
    let text = state.rawSubtitleText;
    if (!text && state.srtLines.length) {
      text = state.srtLines.map((l) => l.content).join("\r\n");
    }
    if (!text) {
      notifyToast("视频字幕内容为空，无法进行 AI 深度分析", true);
      return;
    }
    // 派发事件供全局 AI 助手捕获并填入提示词
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("logicweaver:ai-draft-prompt", {
          detail: {
            title: `B站视频《${state.title}》字幕深度研读`,
            content: `请对以下 B站 视频《${state.title}》(BV号: ${state.bvid}) 的字幕内容进行要点提炼、核心脉络拆解并萃取专业知识点词汇：\n\n${text.slice(0, 12000)}`
          }
        })
      );
      notifyToast("✦ 已将字幕要点填入 AI 助手对话草稿");
    }
    this.dispatch("analyzeSrtWithAi");
  },

  seekSrt(from: number) {
    if (typeof document !== "undefined") {
      const videoEl = document.getElementById("bili-theater-video") as HTMLVideoElement | null;
      if (videoEl) {
        videoEl.currentTime = from;
        videoEl.play().catch(() => {});
      }
    }
    this.dispatch("seekSrt", { from });
  }
};
