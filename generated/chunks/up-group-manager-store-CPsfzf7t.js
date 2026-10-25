import { j as S, X as B } from "./search.service-BNKrftAD.js";
import { r as T } from "./vendor-vue-BUkfvXUI.js";
const t = T({
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
let P = null;
function w(e, s = !1) {
  typeof window.showBiliToast == "function" ? window.showBiliToast(e, s ? 4e3 : 2500) : typeof window.notifyToast == "function" ? window.notifyToast(e, { isError: s }) : console.log(`[BiliTheater] ${e}`);
}
const G = {
  state: t,
  setMounted(e) {
    t.mounted = e;
  },
  update(e) {
    const s = { ...e };
    "videoUrl" in e && (s.openBiliUrl = e.videoUrl), "commentsCount" in e && (s.commentsCountText = e.commentsCount), "sort" in e && (s.commentsSort = Number(e.sort)), "isCommentsLoading" in e && (s.commentsLoading = !!e.isCommentsLoading), "isSrtOpen" in e && (s.srtDrawerOpen = !!e.isSrtOpen), "srtCount" in e && (s.srtCountText = e.srtCount), "srtCues" in e && (s.srtLines = e.srtCues || []), "isSrtLoading" in e && (s.srtLoading = !!e.isSrtLoading), Object.assign(t, s);
  },
  onAction(e) {
    P = e;
  },
  dispatch(e, s) {
    if (P)
      return P(e, s);
  },
  /**
   * 启动并播放指定视频 (自动解析直链、加载评论和字幕)
   */
  async openVideo(e, s = 1) {
    typeof document < "u" && document.querySelectorAll("video, audio").forEach((i) => {
      try {
        i.pause();
      } catch {
      }
    });
    const a = e.bvid || (String(e.aid || "").startsWith("BV") ? String(e.aid) : ""), o = e.url || (a ? `https://www.bilibili.com/video/${a}` : "");
    t.isOpen = !0, t.bvid = a, t.aid = String(e.aid || ""), t.title = e.title || a || "B站视频", t.author = e.author ? `UP: ${e.author}` : "", t.cover = (e.cover || "").replace(/^http:/, "https:"), t.openBiliUrl = o, t.videoSrc = "", t.iframeSrc = "", t.useIframe = !1, t.canDirectPlay = !1, t.comments = [], t.commentsPage = 1, t.commentsLoading = !0, t.commentsStatus = "", t.hasMoreComments = !1, t.srtDrawerOpen = !1, t.srtLines = [], t.srtCountText = "0 句", t.rawSubtitleText = "", this.dispatch("open", e);
    try {
      const i = await S.resolvePlayStream(e, s);
      if (i.sources && i.sources.length)
        t.videoSrc = i.sources[0], t.cid = i.cid || "", t.aid = String(i.aid || t.aid), t.pages = i.pages || [], t.currentPage = i.currentPage || 1, t.currentQuality = i.currentQuality || 64, t.acceptQualities = (i.acceptQuality || []).map((m, r) => ({
          qn: m,
          label: B(m, i.acceptDescription[r])
        })), t.canDirectPlay = !0, t.useIframe = !1;
      else
        throw new Error("无可用直链源");
    } catch {
      t.useIframe = !0, t.canDirectPlay = !1, t.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(a)}&autoplay=1&danmaku=0&high_quality=1`;
    }
    this.loadComments(!0), this.loadSubtitles();
  },
  open(e) {
    if (e) {
      if (e.bvid) {
        this.openVideo(e);
        return;
      }
      this.update(e);
    }
    t.isOpen = !0, this.dispatch("open", e);
  },
  close() {
    if (t.isOpen = !1, t.videoSrc = "", t.iframeSrc = "", t.srtDrawerOpen = !1, typeof document < "u") {
      const e = document.getElementById("bili-theater-video");
      if (e)
        try {
          e.pause();
        } catch {
        }
    }
    this.dispatch("close");
  },
  togglePlayerMode() {
    if (!t.videoSrc && t.useIframe) {
      w("该视频未获取到原生直链源，保持嵌入模式");
      return;
    }
    t.useIframe = !t.useIframe;
  },
  /**
   * 切换视频清晰度
   */
  async switchQuality(e) {
    if (!(!t.bvid || !t.cid))
      try {
        const s = document.getElementById("bili-theater-video"), a = s?.currentTime || 0, o = await S.fetchPlayStream(t.bvid, t.cid, e);
        o.sources && o.sources.length && (t.videoSrc = o.sources[0], t.currentQuality = o.quality, s && (s.currentTime = a, s.play().catch(() => {
        })), w(`已切换至清晰度：${B(e)}`));
      } catch (s) {
        w(`清晰度切换失败：${s?.message || "网络异常"}`, !0);
      }
  },
  /**
   * 加载或刷新评论区 (支持最新/最热排序)
   */
  async loadComments(e = !1) {
    e && (t.commentsPage = 1, t.comments = []), t.commentsLoading = !0, t.commentsStatus = "";
    try {
      let s = t.aid;
      if (!s && t.bvid) {
        const i = await S.getVideoView(t.bvid);
        i?.aid && (s = String(i.aid), t.aid = s);
      }
      if (!s) {
        t.commentsLoading = !1, t.commentsStatus = "暂无法获取视频评论";
        return;
      }
      const a = await S.getVideoComments(s, t.commentsPage, 20, t.commentsSort), o = (a.comments || []).map((i) => ({
        id: String(i.rpid),
        userName: i.uname,
        avatar: i.avatar,
        message: i.message,
        timeStr: i.timeText,
        likeCount: i.like,
        replyCount: i.rcount,
        pictures: i.pictures || [],
        replies: (i.replies || []).map((m) => ({ id: String(m.rpid), userName: m.uname, message: m.message }))
      }));
      e ? t.comments = o : t.comments = [...t.comments, ...o], t.commentsCountText = `${a.total || t.comments.length} 条`, t.hasMoreComments = a.hasMore, t.commentsLoading = !1, t.comments.length || (t.commentsStatus = "暂无评论");
    } catch (s) {
      t.commentsLoading = !1, t.commentsStatus = `评论加载失败：${s?.message || "网络错误"}`;
    }
  },
  setSort(e) {
    t.commentsSort !== e && (t.commentsSort = e, this.dispatch("changeSort", { sort: e }), this.loadComments(!0));
  },
  loadMoreComments() {
    t.commentsLoading || !t.hasMoreComments || (t.commentsPage++, this.dispatch("loadMoreComments"), this.loadComments(!1));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(e) {
    const s = t.comments.find((a) => String(a.id) === String(e));
    if (!(!s || s.subRepliesLoading)) {
      s.subRepliesPage ? s.subRepliesPage++ : s.subRepliesPage = 1, s.subRepliesLoading = !0, s.subRepliesExpanded = !0;
      try {
        let a = t.aid;
        if (!a && t.bvid) {
          const l = await S.getVideoView(t.bvid);
          l?.aid && (a = String(l.aid), t.aid = a);
        }
        if (!a) {
          s.subRepliesLoading = !1;
          return;
        }
        const o = await S.getSubReplies(a, e, s.subRepliesPage, 10), i = (o.replies || []).map((l) => ({
          id: String(l.rpid),
          userName: l.uname,
          message: l.message
        })), m = new Set((s.replies || []).map((l) => String(l.id))), r = i.filter((l) => !m.has(String(l.id)));
        s.replies = [...s.replies || [], ...r], s.subRepliesHasMore = o.hasMore;
      } finally {
        s.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(e) {
    const s = t.comments.find((a) => String(a.id) === String(e));
    s && (s.subRepliesExpanded = !1);
  },
  /**
   * 加载视频字幕轨道
   */
  async loadSubtitles() {
    if (t.bvid) {
      t.srtLoading = !0;
      try {
        const e = await S.fetchVideoSubtitleDetails(t.bvid, t.cid);
        e.ok && e.cues.length ? (t.srtLines = e.cues.map((s) => ({
          id: s.id || `${s.from}`,
          from: s.from,
          to: s.to,
          content: s.content
        })), t.srtCountText = `${t.srtLines.length} 句`, t.rawSubtitleText = e.bodyText || "") : (t.srtLines = [], t.srtCountText = "暂无字幕", t.rawSubtitleText = "");
      } catch {
        t.srtLines = [], t.srtCountText = "字幕暂不可用";
      } finally {
        t.srtLoading = !1;
      }
    }
  },
  toggleSrt(e) {
    t.srtDrawerOpen = typeof e == "boolean" ? e : !t.srtDrawerOpen, t.srtDrawerOpen && !t.srtLines.length && !t.srtLoading && this.loadSubtitles(), this.dispatch("toggleSrt", { open: t.srtDrawerOpen });
  },
  async copySrt() {
    let e = t.rawSubtitleText;
    if (!e && t.srtLines.length && (e = t.srtLines.map((s) => s.content).join(`\r
`)), !e) {
      w("当前视频暂无可用字幕可供复制", !0);
      return;
    }
    try {
      await navigator.clipboard.writeText(e), w("📋 已复制纯文本字幕到剪贴板！");
    } catch {
      w("复制到剪贴板失败，请检查浏览器权限", !0);
    }
    this.dispatch("copySrt");
  },
  analyzeSrtWithAi() {
    let e = t.rawSubtitleText;
    if (!e && t.srtLines.length && (e = t.srtLines.map((s) => s.content).join(`\r
`)), !e) {
      w("视频字幕内容为空，无法进行 AI 深度分析", !0);
      return;
    }
    typeof window < "u" && (window.dispatchEvent(
      new CustomEvent("logicweaver:ai-draft-prompt", {
        detail: {
          title: `B站视频《${t.title}》字幕深度研读`,
          content: `请对以下 B站 视频《${t.title}》(BV号: ${t.bvid}) 的字幕内容进行要点提炼、核心脉络拆解并萃取专业知识点词汇：

${e.slice(0, 12e3)}`
        }
      })
    ), w("✦ 已将字幕要点填入 AI 助手对话草稿")), this.dispatch("analyzeSrtWithAi");
  },
  seekSrt(e) {
    if (typeof document < "u") {
      const s = document.getElementById("bili-theater-video");
      s && (s.currentTime = e, s.play().catch(() => {
      }));
    }
    this.dispatch("seekSrt", { from: e });
  }
}, A = "biliLocallyKnownMessageIdsV1", c = T({
  isOpen: !1,
  loading: !1,
  userAvatar: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  userMid: "",
  activeKind: "reply",
  unreadCounts: {
    reply: 0,
    at: 0,
    like: 0,
    system: 0,
    private: 0
  },
  items: [],
  emptyText: ""
}), M = /* @__PURE__ */ new Set();
async function I() {
  if (typeof chrome < "u" && chrome?.storage?.local)
    try {
      const s = (await chrome.storage.local.get([A]))?.[A];
      if (s && typeof s == "object") return s;
    } catch {
    }
  return {};
}
async function q(e, s, a) {
  if (!(typeof chrome > "u" || !chrome?.storage?.local))
    try {
      const o = await I(), i = Array.isArray(o[e]) ? [...o[e]] : [];
      s && !i.includes(s) && i.push(s), a && !i.includes(a) && i.push(a), o[e] = i, await chrome.storage.local.set({ [A]: o });
    } catch {
    }
}
async function V(e, s, a = []) {
  if (!(typeof chrome > "u" || !chrome?.storage?.local))
    try {
      const o = await I(), i = new Set(Array.isArray(o[e]) ? o[e] : []);
      for (const r of s) r && i.add(r);
      for (const r of a) r && i.add(r);
      const m = Number(c.unreadCounts[e] || 0);
      if (i.size < m) {
        const r = m - i.size;
        for (let l = 0; l < r; l++) i.add(`__pad_${Date.now()}_${l}`);
      }
      o[e] = Array.from(i), await chrome.storage.local.set({ [A]: o });
    } catch {
    }
}
async function $(e, s = 1, a) {
  if (!e) return !1;
  try {
    const o = await S.getBiliJct();
    if (!o) return !1;
    const i = new URLSearchParams({
      talker_id: String(e),
      session_type: String(s || 1),
      csrf: o,
      csrf_token: o,
      build: "0",
      mobi_app: "web"
    });
    return a && i.set("ack_seqno", String(a)), (await (await fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/update_ack", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body: i
    })).json())?.code === 0;
  } catch {
    return !1;
  }
}
async function O(e) {
  c.activeKind = e, c.loading = !0, c.emptyText = "";
  try {
    const s = await I(), a = new Set(Array.isArray(s[e]) ? s[e] : []), o = Number(c.unreadCounts[e] || 0) <= 0;
    let i = [];
    if (e === "reply") {
      const r = await (await fetch("https://api.bilibili.com/x/msgfeed/reply?platform=web&build=0&mobi_app=web", { credentials: "include" })).json();
      i = (Array.isArray(r?.data?.items) ? r.data.items : []).map((n) => {
        const h = String(n.id || n.cursor || Math.random());
        return {
          id: h,
          title: n.user?.nickname || "回复了你",
          content: n.item?.source_content || n.item?.target_reply_content || n.item?.title || "",
          time: n.reply_time ? new Date(n.reply_time * 1e3).toLocaleString() : "",
          avatar: n.user?.avatar || "assets/bilibili.svg",
          url: n.item?.uri || (n.item?.subject_id ? `https://www.bilibili.com/video/av${n.item.subject_id}` : "https://message.bilibili.com/"),
          isKnown: o || a.has(h)
        };
      });
    } else if (e === "at") {
      const r = await (await fetch("https://api.bilibili.com/x/msgfeed/at?build=0&mobi_app=web", { credentials: "include" })).json();
      i = (Array.isArray(r?.data?.items) ? r.data.items : []).map((n) => {
        const h = String(n.id || Math.random());
        return {
          id: h,
          title: n.user?.nickname ? `@${n.user.nickname}` : "@了我",
          content: n.item?.source_content || n.item?.title || "",
          time: n.at_time ? new Date(n.at_time * 1e3).toLocaleString() : "",
          avatar: n.user?.avatar || "assets/bilibili.svg",
          url: n.item?.uri || "https://message.bilibili.com/",
          isKnown: o || a.has(h)
        };
      });
    } else if (e === "like") {
      const r = await (await fetch("https://api.bilibili.com/x/msgfeed/like?platform=web&build=0&mobi_app=web", { credentials: "include" })).json();
      i = (Array.isArray(r?.data?.total?.items) ? r.data.total.items : Array.isArray(r?.data?.items) ? r.data.items : []).map((n) => {
        const h = Array.isArray(n.users) && n.users.length ? n.users[0] : null, d = n.users?.map((b) => b.nickname).filter(Boolean).join("、") || "B站用户", f = String(n.id || Math.random());
        return {
          id: f,
          title: `${d} 赞了你`,
          content: n.item?.title || n.item?.desc || n.item?.business || "点赞了你的评论或动态",
          time: n.like_time ? new Date(n.like_time * 1e3).toLocaleString() : "",
          avatar: h?.avatar || "assets/bilibili.svg",
          url: n.item?.uri || "https://message.bilibili.com/",
          isKnown: o || a.has(f)
        };
      });
    } else if (e === "system") {
      let m = [];
      try {
        const l = await (await fetch("https://message.bilibili.com/api/notify/query.sysnotify.list.do?data_type=1&page_size=20", { credentials: "include" })).text();
        if (l.trim().startsWith("{")) {
          const n = JSON.parse(l);
          m = Array.isArray(n?.data) ? n.data : Array.isArray(n?.data?.result) ? n.data.result : [];
        }
      } catch {
      }
      if (!m.length)
        try {
          const l = await (await fetch("https://api.vc.bilibili.com/sys_msg/v1/sys_msg/query_notify_list?page_size=20&build=0&mobi_app=web", { credentials: "include" })).text();
          if (l.trim().startsWith("{")) {
            const n = JSON.parse(l);
            m = Array.isArray(n?.data) ? n.data : Array.isArray(n?.data?.result) ? n.data.result : [];
          }
        } catch {
        }
      i = m.map((r) => {
        const l = String(r.id || r.cursor || Math.random());
        return {
          id: l,
          title: r.title || "系统通知",
          content: String(r.content || r.text || r.msg || "").replace(/<[^>]+>/g, ""),
          time: r.time ? typeof r.time == "number" ? new Date(r.time * 1e3).toLocaleString() : String(r.time) : "",
          avatar: "assets/bilibili.svg",
          url: r.url || r.link || "https://message.bilibili.com/",
          isKnown: o || a.has(l)
        };
      });
    } else if (e === "private") {
      const r = await (await fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions?session_type=1&group_fold=1&unfollow_fold=0&sort_rule=2&build=0&mobi_app=web", { credentials: "include" })).json(), l = Array.isArray(r?.data?.session_list) ? r.data.session_list : [], n = l.map((d) => d.talker_id).filter(Boolean), h = /* @__PURE__ */ new Map();
      if (n.length > 0)
        try {
          const f = await (await fetch(`https://api.vc.bilibili.com/account/v1/user/cards?uids=${n.slice(0, 50).join(",")}`, { credentials: "include" })).json(), b = Array.isArray(f?.data) ? f.data : [];
          for (const g of b) {
            const v = String(g.mid || g.uid || "");
            v && h.set(v, {
              name: g.name || g.uname || "",
              avatar: g.face || g.avatar || ""
            });
          }
        } catch {
        }
      i = l.map((d) => {
        let f = "", b;
        try {
          const y = typeof d.last_msg?.content == "string" ? d.last_msg.content.trim() : "";
          if (y.startsWith("{") && y.endsWith("}")) {
            const p = JSON.parse(y);
            if (p && typeof p == "object")
              if (typeof p.url == "string" && p.url.trim())
                b = p.url.trim().replace(/^http:/, "https:"), f = p.text || "[图片]";
              else if (p.title) {
                const E = p.attach_msg?.content ? ` · ${p.attach_msg.content}` : "";
                f = `[视频分享] ${p.title}${E}`;
              } else (p.content || p.text) && (f = p.content || p.text);
          } else
            f = y;
        } catch {
          f = String(d.last_msg?.content || "");
        }
        if (!b && f.startsWith("{") && f.includes('"url"'))
          try {
            const y = JSON.parse(f);
            typeof y?.url == "string" && y.url.trim() && (b = y.url.trim().replace(/^http:/, "https:"), f = y.text || "[图片]");
          } catch {
          }
        !f && !b && (f = "一条私信消息");
        const g = String(d.talker_id || ""), v = h.get(g), K = v?.name ? v.name : `用户 ${g}`, D = v?.avatar ? v.avatar.replace(/^http:/, "https:") : "assets/bilibili.svg", j = String(d.session_ts || d.talker_id || Math.random()), R = Number(d.unread_count || 0) > 0, N = a.has(j) || g && a.has(g), U = o || !R || !!N;
        return {
          id: j,
          talkerId: g,
          sessionType: Number(d.session_type || 1),
          ackSeqno: d.last_msg?.msg_seqno || d.max_seqno || d.ack_seqno,
          title: K,
          content: f,
          image: b,
          time: d.session_ts ? new Date(Number(String(d.session_ts).slice(0, 13))).toLocaleString() : "",
          avatar: D,
          url: `https://message.bilibili.com/#/whisper/mid${d.talker_id}`,
          isKnown: U
        };
      });
    }
    c.items = i, i.length === 0 && (c.emptyText = "暂无相关互动消息");
  } catch (s) {
    c.emptyText = `获取消息失败：${s?.message || "网络错误"}`;
  } finally {
    c.loading = !1;
  }
}
const J = {
  get state() {
    return c;
  },
  updateState(e) {
    Object.assign(c, e);
  },
  openPanel() {
    c.isOpen = !0, c.items.length === 0 && !c.loading && O(c.activeKind);
  },
  closePanel() {
    c.isOpen = !1, this.dispatch("close");
  },
  togglePanel(e) {
    const s = e !== void 0 ? e : !c.isOpen;
    c.isOpen = s, s ? c.items.length === 0 && !c.loading && O(c.activeKind) : this.dispatch("close");
  },
  switchKind(e) {
    O(e);
  },
  markAllKnown(e) {
    c.unreadCounts[e] = 0;
    const s = c.items.filter((i) => !i.isKnown);
    if (c.items.forEach((i) => i.isKnown = !0), e === "private") {
      const i = s.filter((m) => !!m.talkerId).map((m) => $(m.talkerId, m.sessionType || 1, m.ackSeqno));
      Promise.allSettled(i);
    }
    const a = s.map((i) => i.id).filter(Boolean), o = s.map((i) => i.talkerId).filter(Boolean);
    V(e, a, o), this.dispatch("mark-all-known", { kind: e, ids: a, talkerIds: o });
  },
  markKnown(e, s) {
    const a = c.items.find((o) => o.id === s);
    a && !a.isKnown && (a.isKnown = !0, c.unreadCounts[e] > 0 && c.unreadCounts[e]--, e === "private" && a.talkerId && $(a.talkerId, a.sessionType || 1, a.ackSeqno), q(e, s, a?.talkerId), this.dispatch("mark-known", { kind: e, id: s, talkerId: a?.talkerId }));
  },
  setLoading(e) {
    c.loading = e;
  },
  setItems(e) {
    c.items = [...e];
  },
  onAction(e) {
    return M.add(e), () => {
      M.delete(e);
    };
  },
  dispatch(e, s) {
    for (const a of M)
      try {
        a(e, s);
      } catch (o) {
        console.error(`[BiliMessagePanel] Handler error for action ${e}:`, o);
      }
  }
}, u = T({
  create: { open: !1, kind: "bili", name: "", privacy: 0, submitting: !1, status: "", error: !1 },
  confirm: { open: !1, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 },
  channelPicker: { open: !1, loading: !1, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" }
});
let x = null, C = null, L = null;
const H = {
  state: u,
  openCreate(e, s) {
    x = s, Object.assign(u.create, { open: !0, kind: e, name: "", privacy: 0, submitting: !1, status: "", error: !1 });
  },
  closeCreate() {
    u.create.submitting || (u.create.open = !1, x = null);
  },
  updateCreate(e) {
    Object.assign(u.create, e);
  },
  async submitCreate(e) {
    if (!(!x || u.create.submitting)) {
      u.create.submitting = !0, u.create.error = !1;
      try {
        await x(e);
      } finally {
        u.create.submitting = !1;
      }
    }
  },
  openConfirm(e, s) {
    C = s, Object.assign(u.confirm, { open: !0, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 }, e);
  },
  closeConfirm() {
    u.confirm.submitting || (u.confirm.open = !1, C = null);
  },
  async submitConfirm() {
    if (!(!C || u.confirm.submitting)) {
      u.confirm.submitting = !0;
      try {
        await C(), u.confirm.open = !1;
      } finally {
        u.confirm.submitting = !1, C = null;
      }
    }
  },
  openChannelPicker(e) {
    L = e, Object.assign(u.channelPicker, { open: !0, loading: !0, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" });
  },
  updateChannelPicker(e) {
    Object.assign(u.channelPicker, e);
  },
  closeChannelPicker() {
    u.channelPicker.submittingMid || (u.channelPicker.open = !1, L = null);
  },
  async selectChannel(e) {
    const s = u.channelPicker;
    if (!(!L || s.submittingMid)) {
      s.submittingMid = e;
      try {
        await L(e), s.open = !1;
      } catch (a) {
        s.error = a instanceof Error ? a.message : "添加失败";
      } finally {
        s.submittingMid = "", s.open || (L = null);
      }
    }
  }
}, _ = T({
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
let k = null;
const z = {
  state: _,
  setActionHandler(e) {
    k = e;
  },
  open(e = {}) {
    Object.assign(_, { open: !0, loading: !0, refreshing: !1, error: "", groups: [], followings: [], activeGroupId: "", query: "", filter: "all", page: 1, busyMid: "" }, e);
  },
  update(e) {
    Object.assign(_, e);
  },
  async dispatch(e, s) {
    await k?.(e, s);
  },
  close() {
    _.busyMid || _.refreshing || (_.open = !1, k?.("close"));
  }
};
typeof window < "u" && (window.LogicWeaverBiliUpGroupManager = z);
export {
  c as a,
  G as b,
  J as c,
  H as d,
  u as e,
  _ as f,
  z as g
};
