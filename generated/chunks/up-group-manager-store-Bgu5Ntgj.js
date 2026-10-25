import { j as u, ag as S } from "./search.service-CzxjlNxM.js";
import { r as y } from "./vendor-vue-CjOHdfe5.js";
const e = y({
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
let b = null;
function c(t, i = !1) {
  typeof window.showBiliToast == "function" ? window.showBiliToast(t, i ? 4e3 : 2500) : typeof window.notifyToast == "function" ? window.notifyToast(t, { isError: i }) : console.log(`[BiliTheater] ${t}`);
}
const L = {
  state: e,
  setMounted(t) {
    e.mounted = t;
  },
  update(t) {
    const i = { ...t };
    "videoUrl" in t && (i.openBiliUrl = t.videoUrl), "commentsCount" in t && (i.commentsCountText = t.commentsCount), "sort" in t && (i.commentsSort = Number(t.sort)), "isCommentsLoading" in t && (i.commentsLoading = !!t.isCommentsLoading), "isSrtOpen" in t && (i.srtDrawerOpen = !!t.isSrtOpen), "srtCount" in t && (i.srtCountText = t.srtCount), "srtCues" in t && (i.srtLines = t.srtCues || []), "isSrtLoading" in t && (i.srtLoading = !!t.isSrtLoading), Object.assign(e, i);
  },
  onAction(t) {
    b = t;
  },
  dispatch(t, i) {
    if (b)
      return b(t, i);
  },
  /**
   * 启动并播放指定视频 (自动解析直链、加载评论和字幕)
   */
  async openVideo(t, i = 1) {
    typeof document < "u" && document.querySelectorAll("video, audio").forEach((n) => {
      try {
        n.pause();
      } catch {
      }
    });
    const s = t.bvid || (String(t.aid || "").startsWith("BV") ? String(t.aid) : ""), a = t.url || (s ? `https://www.bilibili.com/video/${s}` : "");
    e.isOpen = !0, e.bvid = s, e.aid = String(t.aid || ""), e.title = t.title || s || "B站视频", e.author = t.author ? `UP: ${t.author}` : "", e.cover = (t.cover || "").replace(/^http:/, "https:"), e.openBiliUrl = a, e.videoSrc = "", e.iframeSrc = "", e.useIframe = !1, e.canDirectPlay = !1, e.comments = [], e.commentsPage = 1, e.commentsLoading = !0, e.commentsStatus = "", e.hasMoreComments = !1, e.srtDrawerOpen = !1, e.srtLines = [], e.srtCountText = "0 句", e.rawSubtitleText = "", this.dispatch("open", t);
    try {
      const n = await u.resolvePlayStream(t, i);
      if (n.sources && n.sources.length)
        e.videoSrc = n.sources[0], e.cid = n.cid || "", e.aid = String(n.aid || e.aid), e.pages = n.pages || [], e.currentPage = n.currentPage || 1, e.currentQuality = n.currentQuality || 64, e.acceptQualities = (n.acceptQuality || []).map((l, p) => ({
          qn: l,
          label: S(l, n.acceptDescription[p])
        })), e.canDirectPlay = !0, e.useIframe = !1;
      else
        throw new Error("无可用直链源");
    } catch {
      e.useIframe = !0, e.canDirectPlay = !1, e.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(s)}&autoplay=1&danmaku=0&high_quality=1`;
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
    if (e.isOpen = !1, e.videoSrc = "", e.iframeSrc = "", e.srtDrawerOpen = !1, typeof document < "u") {
      const t = document.getElementById("bili-theater-video");
      if (t)
        try {
          t.pause();
        } catch {
        }
    }
    this.dispatch("close");
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
    if (!(!e.bvid || !e.cid))
      try {
        const i = document.getElementById("bili-theater-video"), s = i?.currentTime || 0, a = await u.fetchPlayStream(e.bvid, e.cid, t);
        a.sources && a.sources.length && (e.videoSrc = a.sources[0], e.currentQuality = a.quality, i && (i.currentTime = s, i.play().catch(() => {
        })), c(`已切换至清晰度：${S(t)}`));
      } catch (i) {
        c(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
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
      const s = await u.getVideoComments(i, e.commentsPage, 20, e.commentsSort), a = (s.comments || []).map((n) => ({
        id: String(n.rpid),
        userName: n.uname,
        avatar: n.avatar,
        message: n.message,
        timeStr: n.timeText,
        likeCount: n.like,
        replyCount: n.rcount,
        pictures: n.pictures || [],
        replies: (n.replies || []).map((l) => ({ id: String(l.rpid), userName: l.uname, message: l.message }))
      }));
      t ? e.comments = a : e.comments = [...e.comments, ...a], e.commentsCountText = `${s.total || e.comments.length} 条`, e.hasMoreComments = s.hasMore, e.commentsLoading = !1, e.comments.length || (e.commentsStatus = "暂无评论");
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
          const o = await u.getVideoView(e.bvid);
          o?.aid && (s = String(o.aid), e.aid = s);
        }
        if (!s) {
          i.subRepliesLoading = !1;
          return;
        }
        const a = await u.getSubReplies(s, t, i.subRepliesPage, 10), n = (a.replies || []).map((o) => ({
          id: String(o.rpid),
          userName: o.uname,
          message: o.message
        })), l = new Set((i.replies || []).map((o) => String(o.id))), p = n.filter((o) => !l.has(String(o.id)));
        i.replies = [...i.replies || [], ...p], i.subRepliesHasMore = a.hasMore;
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
}, r = y({
  create: { open: !1, kind: "bili", name: "", privacy: 0, submitting: !1, status: "", error: !1 },
  confirm: { open: !1, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 },
  channelPicker: { open: !1, loading: !1, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" }
});
let g = null, d = null, f = null;
const T = {
  state: r,
  openCreate(t, i) {
    g = i, Object.assign(r.create, { open: !0, kind: t, name: "", privacy: 0, submitting: !1, status: "", error: !1 });
  },
  closeCreate() {
    r.create.submitting || (r.create.open = !1, g = null);
  },
  updateCreate(t) {
    Object.assign(r.create, t);
  },
  async submitCreate(t) {
    if (!(!g || r.create.submitting)) {
      r.create.submitting = !0, r.create.error = !1;
      try {
        await g(t);
      } finally {
        r.create.submitting = !1;
      }
    }
  },
  openConfirm(t, i) {
    d = i, Object.assign(r.confirm, { open: !0, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 }, t);
  },
  closeConfirm() {
    r.confirm.submitting || (r.confirm.open = !1, d = null);
  },
  async submitConfirm() {
    if (!(!d || r.confirm.submitting)) {
      r.confirm.submitting = !0;
      try {
        await d(), r.confirm.open = !1;
      } finally {
        r.confirm.submitting = !1, d = null;
      }
    }
  },
  openChannelPicker(t) {
    f = t, Object.assign(r.channelPicker, { open: !0, loading: !0, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" });
  },
  updateChannelPicker(t) {
    Object.assign(r.channelPicker, t);
  },
  closeChannelPicker() {
    r.channelPicker.submittingMid || (r.channelPicker.open = !1, f = null);
  },
  async selectChannel(t) {
    const i = r.channelPicker;
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
}, m = y({
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
let h = null;
const w = {
  state: m,
  setActionHandler(t) {
    h = t;
  },
  open(t = {}) {
    Object.assign(m, { open: !0, loading: !0, refreshing: !1, error: "", groups: [], followings: [], activeGroupId: "", query: "", filter: "all", page: 1, busyMid: "" }, t);
  },
  update(t) {
    Object.assign(m, t);
  },
  async dispatch(t, i) {
    await h?.(t, i);
  },
  close() {
    m.busyMid || m.refreshing || (m.open = !1, h?.("close"));
  }
};
typeof window < "u" && (window.LogicWeaverBiliUpGroupManager = w);
export {
  T as a,
  L as b,
  w as c,
  r as d,
  m as e
};
