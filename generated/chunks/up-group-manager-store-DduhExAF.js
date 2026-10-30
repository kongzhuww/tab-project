import { c as u, F as v, G as w } from "./view-styles-CDVJ_n-J.js";
import { r as S } from "./vendor-vue-DokqDua_.js";
const b = new v(), e = S({
  mounted: !1,
  isOpen: !1,
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
  useIframe: !1,
  canDirectPlay: !1,
  currentQuality: 64,
  acceptQualities: [],
  pages: [],
  currentPage: 1,
  commentsCountText: "0 条",
  commentsSort: 1,
  comments: [],
  commentsPage: 1,
  commentsLoading: !1,
  commentsStatus: "",
  hasMoreComments: !1,
  srtDrawerOpen: !1,
  srtCountText: "0 句",
  srtLines: [],
  srtLoading: !1,
  rawSubtitleText: ""
});
let h = null;
function c(t, i = !1) {
  typeof window.showBiliToast == "function" ? window.showBiliToast(t, i ? 4e3 : 2500, { isError: i, target: { type: "bili-video", bvid: e.bvid, aid: e.aid } }) : typeof window.notifyToast == "function" && window.notifyToast(t, { isError: i });
}
const P = {
  state: e,
  setMounted(t) {
    e.mounted = t;
  },
  update(t) {
    const i = { ...t };
    "videoUrl" in t && (i.openBiliUrl = t.videoUrl), "commentsCount" in t && (i.commentsCountText = t.commentsCount), "sort" in t && (i.commentsSort = Number(t.sort)), "isCommentsLoading" in t && (i.commentsLoading = !!t.isCommentsLoading), "isSrtOpen" in t && (i.srtDrawerOpen = !!t.isSrtOpen), "srtCount" in t && (i.srtCountText = t.srtCount), "srtCues" in t && (i.srtLines = t.srtCues || []), "isSrtLoading" in t && (i.srtLoading = !!t.isSrtLoading), Object.assign(e, i);
  },
  onAction(t) {
    h = t;
  },
  dispatch(t, i) {
    if (h)
      return h(t, i);
  },
  /**
   * 启动并播放指定视频 (自动解析直链、加载评论和字幕)
   */
  async openVideo(t, i = 1) {
    const s = b.start();
    typeof document < "u" && document.querySelectorAll("video, audio").forEach((r) => {
      try {
        r.pause();
      } catch {
      }
    });
    const o = t.bvid || (String(t.aid || "").startsWith("BV") ? String(t.aid) : ""), n = t.url || (o ? `https://www.bilibili.com/video/${o}` : "");
    e.isOpen = !0, e.bvid = o, e.aid = String(t.aid || ""), e.title = t.title || o || "B站视频", e.author = t.author ? `UP: ${t.author}` : "", e.cover = (t.cover || "").replace(/^http:/, "https:"), e.openBiliUrl = n, e.videoSrc = "", e.sourceUrls = [], e.iframeSrc = "", e.useIframe = !1, e.canDirectPlay = !1, e.cid = "", e.pages = [], e.acceptQualities = [], e.comments = [], e.commentsPage = 1, e.commentsLoading = !0, e.commentsStatus = "", e.hasMoreComments = !1, e.srtDrawerOpen = !1, e.srtLines = [], e.srtCountText = "0 句", e.rawSubtitleText = "", this.dispatch("open", t);
    try {
      const r = await u.resolvePlayStream(t, i, s);
      if (s.throwIfAborted(), r.sources && r.sources.length)
        e.sourceUrls = r.sources, e.videoSrc = r.sources[0], e.cid = r.cid || "", e.aid = String(r.aid || e.aid), e.pages = r.pages || [], e.currentPage = r.currentPage || 1, e.currentQuality = r.currentQuality || 64, e.acceptQualities = (r.acceptQuality || []).map((g, l) => ({
          qn: g,
          label: w(g, r.acceptDescription[l])
        })), e.canDirectPlay = !0, e.useIframe = !1;
      else
        throw new Error("无可用直链源");
    } catch (r) {
      if (s.aborted) return;
      e.canDirectPlay = !1, e.commentsLoading = !1, c(r?.message || "视频加载失败，请手动重试或在B站打开", !0);
    }
    this.loadComments(!0), this.loadSubtitles();
  },
  open(t) {
    if (t) {
      if (t.bvid) {
        this.openVideo(t);
        return;
      }
      this.update(t);
    }
    e.isOpen = !0, this.dispatch("open", t);
  },
  close() {
    if (b.cancel(), e.sourceUrls = [], e.isOpen = !1, e.videoSrc = "", e.iframeSrc = "", e.srtDrawerOpen = !1, typeof document < "u") {
      const t = document.getElementById("bili-theater-video");
      if (t)
        try {
          t.pause();
        } catch {
        }
    }
    this.dispatch("close");
  },
  playbackFailed() {
    c("视频源加载失败，备用地址已用尽，请重新打开视频或在B站播放", !0);
  },
  togglePlayerMode() {
    if (!e.videoSrc && e.useIframe) {
      c("该视频未获取到原生直链源，保持嵌入模式");
      return;
    }
    e.useIframe = !e.useIframe;
  },
  /**
   * 切换视频清晰度
   */
  async switchQuality(t) {
    if (!e.bvid || !e.cid) return;
    const i = b.start();
    try {
      const s = document.getElementById("bili-theater-video"), o = s?.currentTime || 0, n = await u.fetchPlayStream(e.bvid, e.cid, t, i);
      i.throwIfAborted(), n.sources && n.sources.length && (e.sourceUrls = n.sources, e.videoSrc = n.sources[0], e.currentQuality = n.quality, s && (s.currentTime = o, s.play().catch(() => {
      })), c(`已切换至清晰度：${w(t)}`));
    } catch (s) {
      if (i.aborted) return;
      c(`清晰度切换失败：${s?.message || "网络异常"}`, !0);
    }
  },
  /**
   * 加载或刷新评论区 (支持最新/最热排序)
   */
  async loadComments(t = !1) {
    t && (e.commentsPage = 1, e.comments = []), e.commentsLoading = !0, e.commentsStatus = "";
    try {
      let i = e.aid;
      if (!i && e.bvid) {
        const n = await u.getVideoView(e.bvid);
        n?.aid && (i = String(n.aid), e.aid = i);
      }
      if (!i) {
        e.commentsLoading = !1, e.commentsStatus = "暂无法获取视频评论";
        return;
      }
      const s = await u.getVideoComments(i, e.commentsPage, 20, e.commentsSort), o = (s.comments || []).map((n) => ({
        id: String(n.rpid),
        userName: n.uname,
        avatar: n.avatar,
        message: n.message,
        timeStr: n.timeText,
        likeCount: n.like,
        replyCount: n.rcount,
        pictures: n.pictures || [],
        replies: (n.replies || []).map((r) => ({ id: String(r.rpid), userName: r.uname, message: r.message }))
      }));
      t ? e.comments = o : e.comments = [...e.comments, ...o], e.commentsCountText = `${s.total || e.comments.length} 条`, e.hasMoreComments = s.hasMore, e.commentsLoading = !1, e.comments.length || (e.commentsStatus = "暂无评论");
    } catch (i) {
      e.commentsLoading = !1, e.commentsStatus = `评论加载失败：${i?.message || "网络错误"}`;
    }
  },
  setSort(t) {
    e.commentsSort !== t && (e.commentsSort = t, this.dispatch("changeSort", { sort: t }), this.loadComments(!0));
  },
  loadMoreComments() {
    e.commentsLoading || !e.hasMoreComments || (e.commentsPage++, this.dispatch("loadMoreComments"), this.loadComments(!1));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(t) {
    const i = e.comments.find((s) => String(s.id) === String(t));
    if (!(!i || i.subRepliesLoading)) {
      i.subRepliesPage ? i.subRepliesPage++ : i.subRepliesPage = 1, i.subRepliesLoading = !0, i.subRepliesExpanded = !0;
      try {
        let s = e.aid;
        if (!s && e.bvid) {
          const l = await u.getVideoView(e.bvid);
          l?.aid && (s = String(l.aid), e.aid = s);
        }
        if (!s) {
          i.subRepliesLoading = !1;
          return;
        }
        const o = await u.getSubReplies(s, t, i.subRepliesPage, 10), n = (o.replies || []).map((l) => ({
          id: String(l.rpid),
          userName: l.uname,
          message: l.message
        })), r = new Set((i.replies || []).map((l) => String(l.id))), g = n.filter((l) => !r.has(String(l.id)));
        i.replies = [...i.replies || [], ...g], i.subRepliesHasMore = o.hasMore;
      } finally {
        i.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(t) {
    const i = e.comments.find((s) => String(s.id) === String(t));
    i && (i.subRepliesExpanded = !1);
  },
  /**
   * 加载视频字幕轨道
   */
  async loadSubtitles() {
    if (e.bvid) {
      e.srtLoading = !0;
      try {
        const t = await u.fetchVideoSubtitleDetails(e.bvid, e.cid);
        t.ok && t.cues.length ? (e.srtLines = t.cues.map((i) => ({
          id: i.id || `${i.from}`,
          from: i.from,
          to: i.to,
          content: i.content
        })), e.srtCountText = `${e.srtLines.length} 句`, e.rawSubtitleText = t.bodyText || "") : (e.srtLines = [], e.srtCountText = "暂无字幕", e.rawSubtitleText = "");
      } catch {
        e.srtLines = [], e.srtCountText = "字幕暂不可用";
      } finally {
        e.srtLoading = !1;
      }
    }
  },
  toggleSrt(t) {
    e.srtDrawerOpen = typeof t == "boolean" ? t : !e.srtDrawerOpen, e.srtDrawerOpen && !e.srtLines.length && !e.srtLoading && this.loadSubtitles(), this.dispatch("toggleSrt", { open: e.srtDrawerOpen });
  },
  async copySrt() {
    let t = e.rawSubtitleText;
    if (!t && e.srtLines.length && (t = e.srtLines.map((i) => i.content).join(`\r
`)), !t) {
      c("当前视频暂无可用字幕可供复制", !0);
      return;
    }
    try {
      await navigator.clipboard.writeText(t), c("📋 已复制纯文本字幕到剪贴板！");
    } catch {
      c("复制到剪贴板失败，请检查浏览器权限", !0);
    }
    this.dispatch("copySrt");
  },
  analyzeSrtWithAi() {
    let t = e.rawSubtitleText;
    if (!t && e.srtLines.length && (t = e.srtLines.map((i) => i.content).join(`\r
`)), !t) {
      c("视频字幕内容为空，无法进行 AI 深度分析", !0);
      return;
    }
    typeof window < "u" && (window.dispatchEvent(
      new CustomEvent("logicweaver:ai-draft-prompt", {
        detail: {
          title: `B站视频《${e.title}》字幕深度研读`,
          content: `请对以下 B站 视频《${e.title}》(BV号: ${e.bvid}) 的字幕内容进行要点提炼、核心脉络拆解并萃取专业知识点词汇：

${t.slice(0, 12e3)}`
        }
      })
    ), c("✦ 已将字幕要点填入 AI 助手对话草稿")), this.dispatch("analyzeSrtWithAi");
  },
  seekSrt(t) {
    if (typeof document < "u") {
      const i = document.getElementById("bili-theater-video");
      i && (i.currentTime = t, i.play().catch(() => {
      }));
    }
    this.dispatch("seekSrt", { from: t });
  }
}, a = S({
  create: { open: !1, kind: "bili", name: "", privacy: 0, submitting: !1, status: "", error: !1 },
  confirm: { open: !1, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 },
  channelPicker: { open: !1, loading: !1, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" }
});
let p = null, d = null, f = null;
const x = {
  state: a,
  openCreate(t, i) {
    p = i, Object.assign(a.create, { open: !0, kind: t, name: "", privacy: 0, submitting: !1, status: "", error: !1 });
  },
  closeCreate() {
    a.create.submitting || (a.create.open = !1, p = null);
  },
  updateCreate(t) {
    Object.assign(a.create, t);
  },
  async submitCreate(t) {
    if (!(!p || a.create.submitting)) {
      a.create.submitting = !0, a.create.error = !1;
      try {
        await p(t);
      } finally {
        a.create.submitting = !1;
      }
    }
  },
  openConfirm(t, i) {
    d = i, Object.assign(a.confirm, { open: !0, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 }, t);
  },
  closeConfirm() {
    a.confirm.submitting || (a.confirm.open = !1, d = null);
  },
  async submitConfirm() {
    if (!(!d || a.confirm.submitting)) {
      a.confirm.submitting = !0;
      try {
        await d(), a.confirm.open = !1;
      } finally {
        a.confirm.submitting = !1, d = null;
      }
    }
  },
  openChannelPicker(t) {
    f = t, Object.assign(a.channelPicker, { open: !0, loading: !0, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" });
  },
  updateChannelPicker(t) {
    Object.assign(a.channelPicker, t);
  },
  closeChannelPicker() {
    a.channelPicker.submittingMid || (a.channelPicker.open = !1, f = null);
  },
  async selectChannel(t) {
    const i = a.channelPicker;
    if (!(!f || i.submittingMid)) {
      i.submittingMid = t;
      try {
        await f(t), i.open = !1;
      } catch (s) {
        i.error = s instanceof Error ? s.message : "添加失败";
      } finally {
        i.submittingMid = "", i.open || (f = null);
      }
    }
  }
}, m = S({
  open: !1,
  loading: !1,
  refreshing: !1,
  error: "",
  groups: [],
  followings: [],
  activeGroupId: "",
  query: "",
  filter: "all",
  onlyUngrouped: !0,
  page: 1,
  pageSize: 24,
  busyMid: ""
});
let y = null;
const C = {
  state: m,
  setActionHandler(t) {
    y = t;
  },
  open(t = {}) {
    Object.assign(m, { open: !0, loading: !0, refreshing: !1, error: "", groups: [], followings: [], activeGroupId: "", query: "", filter: "all", page: 1, busyMid: "" }, t);
  },
  update(t) {
    Object.assign(m, t);
  },
  async dispatch(t, i) {
    await y?.(t, i);
  },
  close() {
    m.busyMid || m.refreshing || (m.open = !1, y?.("close"));
  }
};
typeof window < "u" && (window.LogicWeaverBiliUpGroupManager = C);
export {
  x as a,
  P as b,
  C as c,
  a as d,
  m as e
};
