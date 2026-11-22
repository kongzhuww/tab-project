import { b as p, P as w, a as S } from "./bilibili.service-Brip_1AT.js";
import { r as b } from "./vendor-vue-_upDT3S_.js";
const E = {
  phase: "closed",
  isCollapsed: !1,
  openDrawers: /* @__PURE__ */ new Set(),
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  error: ""
};
class M {
  constructor() {
    this._state = { ...E }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliMiniPlayer = this);
  }
  get state() {
    return this._state;
  }
  get phase() {
    return this._state.phase;
  }
  get isOpen() {
    return this._state.phase !== "closed";
  }
  get isLoading() {
    return this._state.phase === "loading";
  }
  get isPlaying() {
    return this._state.phase === "playing";
  }
  get isCollapsed() {
    return this._state.isCollapsed;
  }
  get error() {
    return this._state.error;
  }
  get qualityMenuOpen() {
    return this._state.qualityMenuOpen;
  }
  get speedMenuOpen() {
    return this._state.speedMenuOpen;
  }
  isDrawerOpen(t) {
    return this._state.openDrawers.has(t);
  }
  subscribe(t) {
    return this._listeners.add(t), () => {
      this._listeners.delete(t);
    };
  }
  _setState(t) {
    this._state = t;
    for (const a of this._listeners)
      a(t);
  }
  send(t) {
    const a = this._state;
    switch (t.type) {
      case "OPEN_START":
        return this._setState({
          phase: "loading",
          isCollapsed: !1,
          openDrawers: /* @__PURE__ */ new Set(),
          qualityMenuOpen: !1,
          speedMenuOpen: !1,
          error: ""
        }), !0;
      case "STREAM_RESOLVED": {
        if (a.phase === "closed") return !1;
        const n = t.isPlaying !== !1;
        return this._setState({
          ...a,
          phase: n ? "playing" : "ready",
          error: ""
        }), !0;
      }
      case "PLAY":
        return a.phase === "closed" || a.phase === "loading" ? !1 : (this._setState({
          ...a,
          phase: "playing"
        }), !0);
      case "PAUSE":
        return a.phase === "playing" ? (this._setState({
          ...a,
          phase: "paused"
        }), !0) : !1;
      case "RELOAD_START":
        return a.phase === "closed" ? !1 : (this._setState({
          ...a,
          phase: "loading",
          error: ""
        }), !0);
      case "ERROR":
        return a.phase === "closed" ? !1 : (this._setState({
          ...a,
          phase: "error",
          error: t.message
        }), !0);
      case "TOGGLE_COLLAPSE": {
        if (a.phase === "closed") return !1;
        const n = t.collapsed !== void 0 ? t.collapsed : !a.isCollapsed;
        return this._setState({
          ...a,
          isCollapsed: n,
          openDrawers: n ? /* @__PURE__ */ new Set() : a.openDrawers,
          qualityMenuOpen: n ? !1 : a.qualityMenuOpen,
          speedMenuOpen: n ? !1 : a.speedMenuOpen
        }), !0;
      }
      case "TOGGLE_DRAWER": {
        if (a.phase === "closed" || a.isCollapsed) return !1;
        const n = new Set(a.openDrawers), o = n.has(t.drawer);
        return (t.open !== void 0 ? t.open : !o) ? n.add(t.drawer) : n.delete(t.drawer), this._setState({
          ...a,
          openDrawers: n
        }), !0;
      }
      case "SET_QUALITY_MENU":
        return a.phase === "closed" || a.isCollapsed ? !1 : (this._setState({
          ...a,
          qualityMenuOpen: t.open,
          speedMenuOpen: t.open ? !1 : a.speedMenuOpen
        }), !0);
      case "SET_SPEED_MENU":
        return a.phase === "closed" || a.isCollapsed ? !1 : (this._setState({
          ...a,
          speedMenuOpen: t.open,
          qualityMenuOpen: t.open ? !1 : a.qualityMenuOpen
        }), !0);
      case "CLOSE":
        return this._setState({
          phase: "closed",
          isCollapsed: !1,
          openDrawers: /* @__PURE__ */ new Set(),
          qualityMenuOpen: !1,
          speedMenuOpen: !1,
          error: ""
        }), !0;
      default:
        return !1;
    }
  }
}
const g = new w(), _ = {
  isOpen: !1,
  collapsed: !1,
  isLoading: !1,
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
  sourceUrls: [],
  iframeSrc: "",
  useIframe: !1,
  isPlaying: !1,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  currentQuality: 64,
  qualities: [
    { qn: 80, desc: "1080P 高清" },
    { qn: 64, desc: "720P 高清" },
    { qn: 32, desc: "480P 清晰" },
    { qn: 16, desc: "360P 流畅" }
  ],
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  pages: [],
  currentPageIndex: 0,
  episodesOpen: !1,
  descOpen: !1,
  commentsOpen: !1,
  commentsSort: 2,
  commentsPage: 1,
  comments: [],
  totalComments: 0,
  commentsLoading: !1,
  hasMoreComments: !1,
  danmakuEnabled: !0,
  danmakuList: [],
  danmakuLoading: !1,
  x: typeof window < "u" ? Math.max(16, window.innerWidth - 420) : 100,
  y: typeof window < "u" ? Math.max(76, window.innerHeight - 300) : 100,
  baseWidth: 0,
  height: 0,
  zIndex: 1e4
}, e = b({ ..._ }), r = new M();
r.subscribe((s) => {
  e.isOpen = s.phase !== "closed", e.isLoading = s.phase === "loading", e.isPlaying = s.phase === "playing", e.errorMsg = s.error, e.collapsed = s.isCollapsed, e.episodesOpen = s.openDrawers.has("episodes"), e.descOpen = s.openDrawers.has("desc"), e.commentsOpen = s.openDrawers.has("comments"), e.qualityMenuOpen = s.qualityMenuOpen, e.speedMenuOpen = s.speedMenuOpen;
});
let O = 1e4;
function l(s, t = !1) {
  const a = globalThis;
  typeof a.showBiliToast == "function" ? a.showBiliToast(s, 3200, { isError: t, target: { type: "bili-video", bvid: e.bvid, aid: e.aid } }) : typeof a.showWindowsToast == "function" && a.showWindowsToast({
    id: `bili_mini_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "B站迷你播放器",
    appType: "bili",
    target: { type: "bili-video", bvid: e.bvid, aid: e.aid },
    message: s,
    duration: 3200
  });
}
let f = "";
function y() {
  f && URL.revokeObjectURL(f), f = "";
}
function L(s) {
  if (!s || s.startsWith("blob:")) return !1;
  try {
    const t = Number(new URL(s).searchParams.get("deadline") || 0);
    return Number.isFinite(t) && t > 0 && Date.now() / 1e3 >= t - 120;
  } catch {
    return !1;
  }
}
const A = {
  get state() {
    return e;
  },
  get machine() {
    return r;
  },
  play() {
    r.send({ type: "PLAY" });
  },
  pause() {
    r.send({ type: "PAUSE" });
  },
  bringToFront() {
    e.zIndex = ++O;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(s) {
    const t = s.bvid || "", a = s.aid ? String(s.aid) : "";
    if (!t && !a) {
      l("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const n = !!t && e.bvid === t || !!a && e.aid === a, o = !!(e.videoSrc && !L(e.videoSrc) || e.iframeSrc);
    if (e.isOpen && n && !s.cachedSourceUrl && o && !e.errorMsg) {
      r.send({ type: "TOGGLE_COLLAPSE", collapsed: !1 });
      return;
    }
    const d = g.start();
    if (y(), r.send({ type: "OPEN_START" }), e.bvid = t, e.aid = a, e.cid = s.cid || "", e.title = s.title || t || "加载中…", e.cover = s.cover || "", e.author = s.author || "", e.authorMid = s.mid ? String(s.mid) : "", e.authorFace = s.authorFace || "", e.videoSrc = "", e.sourceUrls = [], e.iframeSrc = "", e.useIframe = !1, e.currentTime = 0, e.pages = [], e.currentPageIndex = 0, e.comments = [], e.commentsPage = 1, e.hasMoreComments = !1, e.totalComments = 0, e.danmakuList = [], e.danmakuLoading = !1, typeof window < "u" && (e.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), e.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), s.cachedSourceUrl) {
      f = s.cachedSourceUrl, e.videoSrc = f, r.send({ type: "STREAM_RESOLVED", isPlaying: !0 });
      return;
    }
    try {
      const c = () => p.resolvePlayStream({
        bvid: t,
        aid: a,
        cid: s.cid,
        title: s.title,
        cover: s.cover,
        preferredQuality: e.currentQuality
      }, 1, d);
      let i;
      try {
        i = await c();
      } catch (u) {
        if (d.throwIfAborted(), !(u?.name === "TimeoutError" || u instanceof TypeError)) throw u;
        i = await c();
      }
      if (d.throwIfAborted(), e.title = i.title || s.title || t, e.cover = i.poster || s.cover || "", e.author = i.owner || s.author || "UP主", e.authorFace = i.ownerFace || s.authorFace || "", i.ownerMid && (e.authorMid = String(i.ownerMid)), e.aid = i.aid ? String(i.aid) : a, e.bvid = i.bvid || t, e.cid = i.cid || "", e.description = i.desc || "", e.pubdate = i.pubdate ? new Date(i.pubdate * 1e3).toLocaleString() : "", e.pages = i.pages || [], e.currentPageIndex = Math.max(0, i.currentPage - 1), i.acceptQuality?.length && (e.qualities = i.acceptQuality.map((u, h) => ({
        qn: u,
        desc: i.acceptDescription?.[h] || S(u)
      }))), e.currentQuality = i.currentQuality || 64, i.sources && i.sources.length)
        e.sourceUrls = i.sources, e.videoSrc = i.sources[0], r.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), e.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (c) {
      if (d.aborted) return;
      const i = c?.message || "未能获取到视频播放流";
      r.send({ type: "ERROR", message: i }), l(`视频加载未完成：${i}`, !0);
    } finally {
      !d.aborted && r.isLoading && r.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 重新拉取当前视频
   */
  async retryCurrentVideo() {
    (e.bvid || e.aid) && await this.openVideo({
      bvid: e.bvid,
      aid: e.aid,
      cid: e.cid,
      title: e.title,
      cover: e.cover,
      author: e.author,
      authorFace: e.authorFace
    });
  },
  /**
   * 切换原生 HTML5 与官方 iframe 模式
   */
  togglePlayerMode() {
    if (!e.videoSrc && !e.useIframe) {
      l("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    e.useIframe = !e.useIframe, e.useIframe && !e.iframeSrc && (e.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(e.bvid)}&autoplay=1&danmaku=0&high_quality=1`), l(e.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(s) {
    if (s < 0 || s >= e.pages.length) return;
    const t = e.pages[s];
    if (!t) return;
    e.currentPageIndex = s, e.cid = t.cid, e.videoSrc = "", e.sourceUrls = [], r.send({ type: "RELOAD_START" }), e.danmakuList = [], e.danmakuLoading = !1;
    const a = g.start();
    try {
      const n = await p.fetchPlayStream(
        e.bvid,
        t.cid,
        e.currentQuality,
        a
      );
      if (a.throwIfAborted(), n.sources?.length)
        e.sourceUrls = n.sources, e.videoSrc = n.sources[0], e.currentTime = 0, r.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), e.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("获取分P视频流失败");
    } catch (n) {
      if (a.aborted) return;
      const o = n?.message || "切换选集失败";
      r.send({ type: "ERROR", message: o }), l(`分P切换失败：${o}`, !0);
    } finally {
      !a.aborted && r.isLoading && r.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 切换清晰度
   */
  async switchQuality(s) {
    if (r.send({ type: "SET_QUALITY_MENU", open: !1 }), s === e.currentQuality) return;
    r.send({ type: "RELOAD_START" });
    const t = e.currentTime, a = g.start();
    try {
      const n = await p.fetchPlayStream(
        e.bvid,
        e.cid,
        s,
        a
      );
      a.throwIfAborted(), n.sources?.length && (e.sourceUrls = n.sources, e.videoSrc = n.sources[0], e.currentQuality = n.quality, e.currentTime = t, r.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), l(`已切换清晰度为 ${S(s)}`));
    } catch (n) {
      if (a.aborted) return;
      l(`清晰度切换失败：${n?.message || "网络异常"}`, !0);
    } finally {
      !a.aborted && r.isLoading && r.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 切换倍速
   */
  setPlaybackRate(s) {
    e.playbackRate = s, r.send({ type: "SET_SPEED_MENU", open: !1 });
  },
  /**
   * 折叠 / 展开
   */
  toggleCollapse(s) {
    r.send({ type: "TOGGLE_COLLAPSE", collapsed: s });
  },
  /**
   * 关闭播放器
   */
  close() {
    g.cancel(), y(), e.sourceUrls = [], e.videoSrc = "", r.send({ type: "CLOSE" });
  },
  /**
   * 切换选集抽屉
   */
  toggleEpisodes(s) {
    r.send({ type: "TOGGLE_DRAWER", drawer: "episodes", open: s });
  },
  /**
   * 切换简介抽屉
   */
  toggleDesc(s) {
    r.send({ type: "TOGGLE_DRAWER", drawer: "desc", open: s });
  },
  /**
   * 切换评论抽屉
   */
  toggleComments(s) {
    const t = s !== void 0 ? s : !r.isDrawerOpen("comments");
    r.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: t }), t && (!e.comments.length || e.commentsLoading) && this.loadComments(!0);
  },
  /**
   * 切换弹幕飞屏开关（B站原版体验：点击就开，再点击就关）
   */
  toggleDanmakuEnabled(s) {
    const t = s !== void 0 ? s : !e.danmakuEnabled;
    e.danmakuEnabled = t, l(t ? "已开启弹幕" : "已关闭弹幕"), t && (!e.danmakuList.length || e.danmakuLoading) && this.loadDanmaku();
  },
  /**
   * 加载视频弹幕
   */
  async loadDanmaku(s = !1) {
    if (!(e.danmakuList.length > 0 && !s)) {
      e.danmakuLoading = !0;
      try {
        let t = e.cid;
        if (!t && e.bvid) {
          const n = await p.getVideoView(e.bvid);
          n?.cid && (t = n.cid, e.cid = t);
        }
        if (!t) {
          e.danmakuLoading = !1, l("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const a = await p.getVideoDanmaku(t);
        e.danmakuList = a;
      } catch (t) {
        console.warn("[MiniPlayer] 获取弹幕失败:", t);
      } finally {
        e.danmakuLoading = !1;
      }
    }
  },
  /**
   * 复制简介
   */
  async copyDescription() {
    const s = [
      `标题：${e.title}`,
      e.author ? `UP主：${e.author}` : "",
      e.pubdate ? `发布时间：${e.pubdate}` : "",
      e.bvid ? `链接：https://www.bilibili.com/video/${e.bvid}` : "",
      "",
      e.description || "暂无简介"
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(s.join(`
`)), l("已复制视频简介到剪贴板");
    } catch {
      l("复制简介失败", !0);
    }
  },
  /**
   * 加载视频评论
   */
  async loadComments(s = !1) {
    s && (e.commentsPage = 1, e.comments = []), e.commentsLoading = !0;
    try {
      let t = e.aid;
      if (!t && e.bvid) {
        const o = await p.getVideoView(e.bvid);
        o?.aid && (t = String(o.aid), e.aid = t);
      }
      if (!t) {
        e.commentsLoading = !1;
        return;
      }
      const a = await p.getVideoComments(
        t,
        e.commentsPage,
        20,
        e.commentsSort
      ), n = (a.comments || []).map((o) => {
        const d = o.mid ? String(o.mid) : "", c = String(o.uname || "").trim(), i = e.authorMid ? String(e.authorMid) : "", u = String(e.author || "").trim(), h = !!(i && d && i === d || u && c && u === c);
        return {
          id: String(o.rpid),
          mid: d,
          uname: o.uname,
          avatar: o.avatar,
          message: o.message,
          timeStr: o.timeText,
          likeCount: o.like || 0,
          replyCount: o.rcount || 0,
          emotes: o.emotes,
          mentions: o.mentions,
          pictures: o.pictures || [],
          isUp: h,
          isTop: !!o.isTop,
          replies: (o.replies || []).map((m) => ({
            id: String(m.rpid),
            userName: m.uname,
            message: m.message,
            pictures: m.pictures || [],
            emotes: m.emotes,
            mentions: m.mentions
          }))
        };
      });
      s ? e.comments = n : e.comments = [...e.comments, ...n], e.totalComments = a.total || e.comments.length, e.hasMoreComments = a.hasMore;
    } catch (t) {
      l(`评论加载失败：${t?.message || "网络异常"}`, !0);
    } finally {
      e.commentsLoading = !1;
    }
  },
  /**
   * 切换评论排序
   */
  setCommentsSort(s) {
    e.commentsSort !== s && (e.commentsSort = s, this.loadComments(!0));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(s) {
    const t = e.comments.find((a) => String(a.id) === String(s));
    if (!(!t || t.subRepliesLoading)) {
      t.subRepliesPage ? t.subRepliesPage++ : t.subRepliesPage = 1, t.subRepliesLoading = !0, t.subRepliesExpanded = !0;
      try {
        let a = e.aid;
        if (!a && e.bvid) {
          const i = await p.getVideoView(e.bvid);
          i?.aid && (a = String(i.aid), e.aid = a);
        }
        if (!a) {
          t.subRepliesLoading = !1;
          return;
        }
        const n = await p.getSubReplies(a, s, t.subRepliesPage, 10), o = (n.replies || []).map((i) => ({
          id: String(i.rpid),
          userName: i.uname,
          message: i.message,
          pictures: i.pictures || [],
          emotes: i.emotes,
          mentions: i.mentions
        })), d = new Set((t.replies || []).map((i) => String(i.id))), c = o.filter((i) => !d.has(String(i.id)));
        t.replies = [...t.replies || [], ...c], t.subRepliesHasMore = n.hasMore;
      } catch (a) {
        l(`子回复加载失败：${a?.message || "网络异常"}`, !0);
      } finally {
        t.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(s) {
    const t = e.comments.find((a) => String(a.id) === String(s));
    t && (t.subRepliesExpanded = !1);
  },
  /**
   * 加载更多评论
   */
  loadMoreComments() {
    e.commentsLoading || !e.hasMoreComments || (e.commentsPage++, this.loadComments(!1));
  }
};
export {
  M as MiniPlayerMachine,
  A as biliMiniPlayerController,
  e as biliMiniPlayerState,
  r as miniPlayerMachine
};
