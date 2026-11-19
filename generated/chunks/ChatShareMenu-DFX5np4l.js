import { b as v, P as se, L as N } from "./github.service-DdJVB3Fj.js";
import { r as W, d as ne, o as ie, w as q, H as ae, f, g as p, q as j, k as y, n as L, s as re, h as g, t as M, u as oe, F as R, j as z, i as K, x as D, b as S } from "./vendor-vue-BbmU9NUg.js";
import { u as le } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { P as ce, Q as ue } from "./search.service-B3Axreqn.js";
import { h as me } from "./window-manager.store-D9RSYghK.js";
import { _ as de } from "./_plugin-vue_export-helper-CP_tFnee.js";
const Q = new se(), e = W({
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
let F = null;
function h(t, s = !1) {
  typeof window.showBiliToast == "function" ? window.showBiliToast(t, s ? 4e3 : 2500, { isError: s, target: { type: "bili-video", bvid: e.bvid, aid: e.aid } }) : typeof window.notifyToast == "function" && window.notifyToast(t, { isError: s });
}
const _e = {
  state: e,
  setMounted(t) {
    e.mounted = t;
  },
  update(t) {
    const s = { ...t };
    "videoUrl" in t && (s.openBiliUrl = t.videoUrl), "commentsCount" in t && (s.commentsCountText = t.commentsCount), "sort" in t && (s.commentsSort = Number(t.sort)), "isCommentsLoading" in t && (s.commentsLoading = !!t.isCommentsLoading), "isSrtOpen" in t && (s.srtDrawerOpen = !!t.isSrtOpen), "srtCount" in t && (s.srtCountText = t.srtCount), "srtCues" in t && (s.srtLines = t.srtCues || []), "isSrtLoading" in t && (s.srtLoading = !!t.isSrtLoading), Object.assign(e, s);
  },
  onAction(t) {
    F = t;
  },
  dispatch(t, s) {
    if (F)
      return F(t, s);
  },
  /**
   * 启动并播放指定视频 (自动解析直链、加载评论和字幕)
   */
  async openVideo(t, s = 1) {
    const n = Q.start();
    typeof document < "u" && document.querySelectorAll("video, audio").forEach((a) => {
      try {
        a.pause();
      } catch {
      }
    });
    const o = t.bvid || (String(t.aid || "").startsWith("BV") ? String(t.aid) : ""), r = t.url || (o ? `https://www.bilibili.com/video/${o}` : "");
    e.isOpen = !0, e.bvid = o, e.aid = String(t.aid || ""), e.title = t.title || o || "B站视频", e.author = t.author ? `UP: ${t.author}` : "", e.cover = (t.cover || "").replace(/^http:/, "https:"), e.openBiliUrl = r, e.videoSrc = "", e.sourceUrls = [], e.iframeSrc = "", e.useIframe = !1, e.canDirectPlay = !1, e.cid = "", e.pages = [], e.acceptQualities = [], e.comments = [], e.commentsPage = 1, e.commentsLoading = !0, e.commentsStatus = "", e.hasMoreComments = !1, e.srtDrawerOpen = !1, e.srtLines = [], e.srtCountText = "0 句", e.rawSubtitleText = "", this.dispatch("open", t);
    try {
      const a = await v.resolvePlayStream(t, s, n);
      if (n.throwIfAborted(), a.sources && a.sources.length)
        e.sourceUrls = a.sources, e.videoSrc = a.sources[0], e.cid = a.cid || "", e.aid = String(a.aid || e.aid), e.pages = a.pages || [], e.currentPage = a.currentPage || 1, e.currentQuality = a.currentQuality || 64, e.acceptQualities = (a.acceptQuality || []).map((d, u) => ({
          qn: d,
          label: N(d, a.acceptDescription[u])
        })), e.canDirectPlay = !0, e.useIframe = !1;
      else
        throw new Error("无可用直链源");
    } catch (a) {
      if (n.aborted) return;
      e.canDirectPlay = !1, e.commentsLoading = !1, h(a?.message || "视频加载失败，请手动重试或在B站打开", !0);
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
    if (Q.cancel(), e.sourceUrls = [], e.isOpen = !1, e.videoSrc = "", e.iframeSrc = "", e.srtDrawerOpen = !1, typeof document < "u") {
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
    h("视频源加载失败，备用地址已用尽，请重新打开视频或在B站播放", !0);
  },
  togglePlayerMode() {
    if (!e.videoSrc && e.useIframe) {
      h("该视频未获取到原生直链源，保持嵌入模式");
      return;
    }
    e.useIframe = !e.useIframe;
  },
  /**
   * 切换视频清晰度
   */
  async switchQuality(t) {
    if (!e.bvid || !e.cid) return;
    const s = Q.start();
    try {
      const n = document.getElementById("bili-theater-video"), o = n?.currentTime || 0, r = await v.fetchPlayStream(e.bvid, e.cid, t, s);
      s.throwIfAborted(), r.sources && r.sources.length && (e.sourceUrls = r.sources, e.videoSrc = r.sources[0], e.currentQuality = r.quality, n && (n.currentTime = o, n.play().catch(() => {
      })), h(`已切换至清晰度：${N(t)}`));
    } catch (n) {
      if (s.aborted) return;
      h(`清晰度切换失败：${n?.message || "网络异常"}`, !0);
    }
  },
  /**
   * 加载或刷新评论区 (支持最新/最热排序)
   */
  async loadComments(t = !1) {
    t && (e.commentsPage = 1, e.comments = []), e.commentsLoading = !0, e.commentsStatus = "";
    try {
      let s = e.aid;
      if (!s && e.bvid) {
        const r = await v.getVideoView(e.bvid);
        r?.aid && (s = String(r.aid), e.aid = s);
      }
      if (!s) {
        e.commentsLoading = !1, e.commentsStatus = "暂无法获取视频评论";
        return;
      }
      const n = await v.getVideoComments(s, e.commentsPage, 20, e.commentsSort), o = (n.comments || []).map((r) => ({
        id: String(r.rpid),
        userName: r.uname,
        avatar: r.avatar,
        message: r.message,
        timeStr: r.timeText,
        likeCount: r.like,
        replyCount: r.rcount,
        pictures: r.pictures || [],
        replies: (r.replies || []).map((a) => ({ id: String(a.rpid), userName: a.uname, message: a.message }))
      }));
      t ? e.comments = o : e.comments = [...e.comments, ...o], e.commentsCountText = `${n.total || e.comments.length} 条`, e.hasMoreComments = n.hasMore, e.commentsLoading = !1, e.comments.length || (e.commentsStatus = "暂无评论");
    } catch (s) {
      e.commentsLoading = !1, e.commentsStatus = `评论加载失败：${s?.message || "网络错误"}`;
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
    const s = e.comments.find((n) => String(n.id) === String(t));
    if (!(!s || s.subRepliesLoading)) {
      s.subRepliesPage ? s.subRepliesPage++ : s.subRepliesPage = 1, s.subRepliesLoading = !0, s.subRepliesExpanded = !0;
      try {
        let n = e.aid;
        if (!n && e.bvid) {
          const u = await v.getVideoView(e.bvid);
          u?.aid && (n = String(u.aid), e.aid = n);
        }
        if (!n) {
          s.subRepliesLoading = !1;
          return;
        }
        const o = await v.getSubReplies(n, t, s.subRepliesPage, 10), r = (o.replies || []).map((u) => ({
          id: String(u.rpid),
          userName: u.uname,
          message: u.message
        })), a = new Set((s.replies || []).map((u) => String(u.id))), d = r.filter((u) => !a.has(String(u.id)));
        s.replies = [...s.replies || [], ...d], s.subRepliesHasMore = o.hasMore;
      } finally {
        s.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(t) {
    const s = e.comments.find((n) => String(n.id) === String(t));
    s && (s.subRepliesExpanded = !1);
  },
  /**
   * 加载视频字幕轨道
   */
  async loadSubtitles() {
    if (e.bvid) {
      e.srtLoading = !0;
      try {
        const t = await v.fetchVideoSubtitleDetails(e.bvid, e.cid);
        t.ok && t.cues.length ? (e.srtLines = t.cues.map((s) => ({
          id: s.id || `${s.from}`,
          from: s.from,
          to: s.to,
          content: s.content
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
    if (!t && e.srtLines.length && (t = e.srtLines.map((s) => s.content).join(`\r
`)), !t) {
      h("当前视频暂无可用字幕可供复制", !0);
      return;
    }
    try {
      await navigator.clipboard.writeText(t), h("📋 已复制纯文本字幕到剪贴板！");
    } catch {
      h("复制到剪贴板失败，请检查浏览器权限", !0);
    }
    this.dispatch("copySrt");
  },
  analyzeSrtWithAi() {
    let t = e.rawSubtitleText;
    if (!t && e.srtLines.length && (t = e.srtLines.map((s) => s.content).join(`\r
`)), !t) {
      h("视频字幕内容为空，无法进行 AI 深度分析", !0);
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
    ), h("✦ 已将字幕要点填入 AI 助手对话草稿")), this.dispatch("analyzeSrtWithAi");
  },
  seekSrt(t) {
    if (typeof document < "u") {
      const s = document.getElementById("bili-theater-video");
      s && (s.currentTime = t, s.play().catch(() => {
      }));
    }
    this.dispatch("seekSrt", { from: t });
  }
}, l = W({
  create: { open: !1, kind: "bili", name: "", privacy: 0, submitting: !1, status: "", error: !1 },
  confirm: { open: !1, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 },
  channelPicker: { open: !1, loading: !1, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" }
});
let U = null, P = null, B = null;
const Re = {
  state: l,
  openCreate(t, s) {
    U = s, Object.assign(l.create, { open: !0, kind: t, name: "", privacy: 0, submitting: !1, status: "", error: !1 });
  },
  closeCreate() {
    l.create.submitting || (l.create.open = !1, U = null);
  },
  updateCreate(t) {
    Object.assign(l.create, t);
  },
  async submitCreate(t) {
    if (!(!U || l.create.submitting)) {
      l.create.submitting = !0, l.create.error = !1;
      try {
        await U(t);
      } finally {
        l.create.submitting = !1;
      }
    }
  },
  openConfirm(t, s) {
    P = s, Object.assign(l.confirm, { open: !0, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 }, t);
  },
  closeConfirm() {
    l.confirm.submitting || (l.confirm.open = !1, P = null);
  },
  async submitConfirm() {
    if (!(!P || l.confirm.submitting)) {
      l.confirm.submitting = !0;
      try {
        await P(), l.confirm.open = !1;
      } finally {
        l.confirm.submitting = !1, P = null;
      }
    }
  },
  openChannelPicker(t) {
    B = t, Object.assign(l.channelPicker, { open: !0, loading: !0, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" });
  },
  updateChannelPicker(t) {
    Object.assign(l.channelPicker, t);
  },
  closeChannelPicker() {
    l.channelPicker.submittingMid || (l.channelPicker.open = !1, B = null);
  },
  async selectChannel(t) {
    const s = l.channelPicker;
    if (!(!B || s.submittingMid)) {
      s.submittingMid = t;
      try {
        await B(t), s.open = !1;
      } catch (n) {
        s.error = n instanceof Error ? n.message : "添加失败";
      } finally {
        s.submittingMid = "", s.open || (B = null);
      }
    }
  }
}, C = W({
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
let A = null;
const fe = {
  state: C,
  setActionHandler(t) {
    A = t;
  },
  open(t = {}) {
    Object.assign(C, { open: !0, loading: !0, refreshing: !1, error: "", groups: [], followings: [], activeGroupId: "", query: "", filter: "all", page: 1, busyMid: "" }, t);
  },
  update(t) {
    Object.assign(C, t);
  },
  async dispatch(t, s) {
    await A?.(t, s);
  },
  close() {
    C.busyMid || C.refreshing || (C.open = !1, A?.("close"));
  }
};
typeof window < "u" && (window.LogicWeaverBiliUpGroupManager = fe);
const pe = ["onKeydown"], ge = ["disabled", "aria-expanded", "onKeydown"], he = { class: "chat-share-label-wrap" }, be = {
  class: "chat-share-icon",
  "aria-hidden": "true"
}, ye = {
  key: 0,
  class: "share-hint",
  role: "status"
}, ve = {
  class: "share-hint",
  role: "status"
}, Se = {
  key: 0,
  class: "share-hint"
}, we = ["aria-label"], Ce = { class: "share-space-label" }, xe = ["title", "onClick"], ke = /* @__PURE__ */ ne({
  __name: "ChatShareMenu",
  props: {
    visible: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    label: { default: "发送到" },
    compact: { type: Boolean, default: !1 },
    matchMenuItem: { type: Boolean, default: !1 }
  },
  emits: ["select", "open"],
  setup(t, { emit: s }) {
    const n = D(() => me.isInstalled("chat")), o = t, r = s, a = S(null), d = S({}), u = D(() => o.label.startsWith("🚀") ? "🚀" : "💬"), J = D(() => o.label.replace(/^(?:💬|🚀)\s*/, ""));
    function E() {
      if (d.value = {}, !o.matchMenuItem) return;
      const c = a.value?.closest('[role="menu"]')?.querySelector(':scope > button[role="menuitem"]');
      if (!c || c === a.value) return;
      const i = getComputedStyle(c);
      d.value = {
        fontFamily: i.fontFamily,
        fontSize: i.fontSize,
        fontWeight: i.fontWeight,
        fontStyle: i.fontStyle,
        fontVariant: i.fontVariant,
        lineHeight: i.lineHeight,
        letterSpacing: i.letterSpacing,
        wordSpacing: i.wordSpacing,
        textTransform: i.textTransform
      };
    }
    ie(E), q(() => [o.visible, o.matchMenuItem], E, { flush: "post" });
    const w = S(!1), V = S(!1), O = S([]), I = S(""), G = S({ x: 0, y: 0 });
    let x = 0, $;
    const X = D(() => {
      const c = /* @__PURE__ */ new Map();
      for (const i of O.value) {
        const m = i.name.split(" / ")[0];
        c.set(m, [...c.get(m) || [], i]);
      }
      return [...c.entries()];
    });
    function _() {
      clearTimeout($), $ = void 0;
    }
    function b() {
      _(), w.value = !1, x++;
    }
    const { menuRef: Y, style: Z } = le({ visible: () => w.value && o.visible, anchor: () => G.value, dismiss: b });
    async function k() {
      if (_(), !n.value || o.disabled || !o.visible || w.value) return;
      E();
      const c = a.value?.getBoundingClientRect();
      if (!c) return;
      G.value = { x: c.right + 240 > window.innerWidth ? c.left - 240 : c.right + 4, y: c.top - 4 }, w.value = !0, V.value = !0, I.value = "", O.value = [], r("open");
      const i = ++x;
      try {
        const m = await ue();
        i === x && (O.value = m);
      } catch (m) {
        i === x && (I.value = m instanceof Error ? m.message : "房间列表读取失败，请重试。");
      } finally {
        i === x && (V.value = !1);
      }
    }
    function H() {
      _(), $ = setTimeout(b, 280);
    }
    function ee(c) {
      if (!n.value) {
        b();
        return;
      }
      const i = { ...c };
      b(), r("select", i);
    }
    return q(() => [n.value, o.visible, o.disabled, JSON.stringify(ce.room)], () => {
      b();
    }), ae(b), (c, i) => n.value && t.visible ? (f(), p("div", {
      key: 0,
      class: re(["chat-share-menu", { compact: t.compact }]),
      style: L({ fontFamily: d.value.fontFamily }),
      onMouseenter: k,
      onMouseleave: H,
      onKeydown: j(y(b, ["stop", "prevent"]), ["esc"])
    }, [
      g("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "chat-share-trigger",
        style: L(d.value),
        disabled: t.disabled,
        "aria-haspopup": "menu",
        "aria-expanded": w.value,
        onClick: y(k, ["stop"]),
        onKeydown: [
          j(y(k, ["stop", "prevent"]), ["right"]),
          j(y(k, ["stop", "prevent"]), ["down"])
        ]
      }, [
        g("span", he, [
          g("span", be, M(u.value), 1),
          g("span", null, M(J.value), 1)
        ]),
        i[3] || (i[3] = g("span", {
          class: "share-arrow",
          "aria-hidden": "true"
        }, "›", -1))
      ], 44, ge),
      w.value && t.visible ? (f(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: Y,
        class: "share-room-flyout",
        style: L([oe(Z), { maxHeight: "min(360px, calc(100vh - 16px))" }]),
        role: "menu",
        "aria-label": "选择目标聊天室房间",
        onMouseenter: _,
        onMouseleave: H,
        onClick: i[1] || (i[1] = y(() => {
        }, ["stop"])),
        onWheel: i[2] || (i[2] = y(() => {
        }, ["stop"]))
      }, [
        V.value ? (f(), p("p", ye, "正在读取房间…")) : I.value ? (f(), p(R, { key: 1 }, [
          g("p", ve, M(I.value), 1),
          g("button", {
            type: "button",
            class: "share-room-item",
            style: L(d.value),
            onClick: i[0] || (i[0] = y((m) => {
              b(), k();
            }, ["stop"]))
          }, "重新读取", 4)
        ], 64)) : (f(), p(R, { key: 2 }, [
          O.value.length ? z("", !0) : (f(), p("p", Se, "暂无可发送的房间")),
          (f(!0), p(R, null, K(X.value, ([m, te]) => (f(), p("div", {
            key: m,
            role: "group",
            "aria-label": m
          }, [
            g("div", Ce, M(m), 1),
            (f(!0), p(R, null, K(te, (T) => (f(), p("button", {
              key: T.channel,
              type: "button",
              class: "share-room-item",
              style: L(d.value),
              role: "menuitem",
              title: T.name,
              onClick: y((Te) => ee(T), ["stop"])
            }, [
              i[4] || (i[4] = g("span", { "aria-hidden": "true" }, "#", -1)),
              g("span", null, M(T.name.slice(T.name.indexOf(" / ") + 3)), 1)
            ], 12, xe))), 128))
          ], 8, we))), 128))
        ], 64))
      ], 36)) : z("", !0)
    ], 46, pe)) : z("", !0);
  }
}), De = /* @__PURE__ */ de(ke, [["__scopeId", "data-v-eaf766be"]]);
export {
  De as C,
  Re as a,
  _e as b,
  fe as c,
  l as d,
  C as e
};
