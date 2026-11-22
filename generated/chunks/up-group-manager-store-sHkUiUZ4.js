import { b as c, P as ie, g as Y } from "./bilibili.service-Brip_1AT.js";
import { r as _ } from "./vendor-vue-_upDT3S_.js";
import { biliMiniPlayerController as re } from "./mini-player-store-mh4dZhnt.js";
import { a as J } from "./read-session-BDQNRDdR.js";
import { t as oe } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { b as ae } from "./radio-player-DI0qcwfC.js";
import { n as p } from "./store-BodPoZPS.js";
const q = new ie(), a = _({
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
let W = null;
function T(e, t = !1) {
  typeof window.showBiliToast == "function" ? window.showBiliToast(e, t ? 4e3 : 2500, { isError: t, target: { type: "bili-video", bvid: a.bvid, aid: a.aid } }) : typeof window.notifyToast == "function" && window.notifyToast(e, { isError: t });
}
const Se = {
  state: a,
  setMounted(e) {
    a.mounted = e;
  },
  update(e) {
    const t = { ...e };
    "videoUrl" in e && (t.openBiliUrl = e.videoUrl), "commentsCount" in e && (t.commentsCountText = e.commentsCount), "sort" in e && (t.commentsSort = Number(e.sort)), "isCommentsLoading" in e && (t.commentsLoading = !!e.isCommentsLoading), "isSrtOpen" in e && (t.srtDrawerOpen = !!e.isSrtOpen), "srtCount" in e && (t.srtCountText = e.srtCount), "srtCues" in e && (t.srtLines = e.srtCues || []), "isSrtLoading" in e && (t.srtLoading = !!e.isSrtLoading), Object.assign(a, t);
  },
  onAction(e) {
    W = e;
  },
  dispatch(e, t) {
    if (W)
      return W(e, t);
  },
  /**
   * 启动并播放指定视频 (自动解析直链、加载评论和字幕)
   */
  async openVideo(e, t = 1) {
    const i = q.start();
    typeof document < "u" && document.querySelectorAll("video, audio").forEach((n) => {
      try {
        n.pause();
      } catch {
      }
    });
    const r = e.bvid || (String(e.aid || "").startsWith("BV") ? String(e.aid) : ""), o = e.url || (r ? `https://www.bilibili.com/video/${r}` : "");
    a.isOpen = !0, a.bvid = r, a.aid = String(e.aid || ""), a.title = e.title || r || "B站视频", a.author = e.author ? `UP: ${e.author}` : "", a.cover = (e.cover || "").replace(/^http:/, "https:"), a.openBiliUrl = o, a.videoSrc = "", a.sourceUrls = [], a.iframeSrc = "", a.useIframe = !1, a.canDirectPlay = !1, a.cid = "", a.pages = [], a.acceptQualities = [], a.comments = [], a.commentsPage = 1, a.commentsLoading = !0, a.commentsStatus = "", a.hasMoreComments = !1, a.srtDrawerOpen = !1, a.srtLines = [], a.srtCountText = "0 句", a.rawSubtitleText = "", this.dispatch("open", e);
    try {
      const n = await c.resolvePlayStream(e, t, i);
      if (i.throwIfAborted(), n.sources && n.sources.length)
        a.sourceUrls = n.sources, a.videoSrc = n.sources[0], a.cid = n.cid || "", a.aid = String(n.aid || a.aid), a.pages = n.pages || [], a.currentPage = n.currentPage || 1, a.currentQuality = n.currentQuality || 64, a.acceptQualities = (n.acceptQuality || []).map((d, u) => ({
          qn: d,
          label: Y(d, n.acceptDescription[u])
        })), a.canDirectPlay = !0, a.useIframe = !1;
      else
        throw new Error("无可用直链源");
    } catch (n) {
      if (i.aborted) return;
      a.canDirectPlay = !1, a.commentsLoading = !1, T(n?.message || "视频加载失败，请手动重试或在B站打开", !0);
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
    a.isOpen = !0, this.dispatch("open", e);
  },
  close() {
    if (q.cancel(), a.sourceUrls = [], a.isOpen = !1, a.videoSrc = "", a.iframeSrc = "", a.srtDrawerOpen = !1, typeof document < "u") {
      const e = document.getElementById("bili-theater-video");
      if (e)
        try {
          e.pause();
        } catch {
        }
    }
    this.dispatch("close");
  },
  playbackFailed() {
    T("视频源加载失败，备用地址已用尽，请重新打开视频或在B站播放", !0);
  },
  togglePlayerMode() {
    if (!a.videoSrc && a.useIframe) {
      T("该视频未获取到原生直链源，保持嵌入模式");
      return;
    }
    a.useIframe = !a.useIframe;
  },
  /**
   * 切换视频清晰度
   */
  async switchQuality(e) {
    if (!a.bvid || !a.cid) return;
    const t = q.start();
    try {
      const i = document.getElementById("bili-theater-video"), r = i?.currentTime || 0, o = await c.fetchPlayStream(a.bvid, a.cid, e, t);
      t.throwIfAborted(), o.sources && o.sources.length && (a.sourceUrls = o.sources, a.videoSrc = o.sources[0], a.currentQuality = o.quality, i && (i.currentTime = r, i.play().catch(() => {
      })), T(`已切换至清晰度：${Y(e)}`));
    } catch (i) {
      if (t.aborted) return;
      T(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
    }
  },
  /**
   * 加载或刷新评论区 (支持最新/最热排序)
   */
  async loadComments(e = !1) {
    e && (a.commentsPage = 1, a.comments = []), a.commentsLoading = !0, a.commentsStatus = "";
    try {
      let t = a.aid;
      if (!t && a.bvid) {
        const o = await c.getVideoView(a.bvid);
        o?.aid && (t = String(o.aid), a.aid = t);
      }
      if (!t) {
        a.commentsLoading = !1, a.commentsStatus = "暂无法获取视频评论";
        return;
      }
      const i = await c.getVideoComments(t, a.commentsPage, 20, a.commentsSort), r = (i.comments || []).map((o) => ({
        id: String(o.rpid),
        userName: o.uname,
        avatar: o.avatar,
        message: o.message,
        timeStr: o.timeText,
        likeCount: o.like,
        replyCount: o.rcount,
        pictures: o.pictures || [],
        emotes: o.emotes,
        mentions: o.mentions,
        replies: (o.replies || []).map((n) => ({
          id: String(n.rpid),
          userName: n.uname,
          message: n.message,
          emotes: n.emotes,
          mentions: n.mentions
        }))
      }));
      e ? a.comments = r : a.comments = [...a.comments, ...r], a.commentsCountText = `${i.total || a.comments.length} 条`, a.hasMoreComments = i.hasMore, a.commentsLoading = !1, a.comments.length || (a.commentsStatus = "暂无评论");
    } catch (t) {
      a.commentsLoading = !1, a.commentsStatus = `评论加载失败：${t?.message || "网络错误"}`;
    }
  },
  setSort(e) {
    a.commentsSort !== e && (a.commentsSort = e, this.dispatch("changeSort", { sort: e }), this.loadComments(!0));
  },
  loadMoreComments() {
    a.commentsLoading || !a.hasMoreComments || (a.commentsPage++, this.dispatch("loadMoreComments"), this.loadComments(!1));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(e) {
    const t = a.comments.find((i) => String(i.id) === String(e));
    if (!(!t || t.subRepliesLoading)) {
      t.subRepliesPage ? t.subRepliesPage++ : t.subRepliesPage = 1, t.subRepliesLoading = !0, t.subRepliesExpanded = !0;
      try {
        let i = a.aid;
        if (!i && a.bvid) {
          const u = await c.getVideoView(a.bvid);
          u?.aid && (i = String(u.aid), a.aid = i);
        }
        if (!i) {
          t.subRepliesLoading = !1;
          return;
        }
        const r = await c.getSubReplies(i, e, t.subRepliesPage, 10), o = (r.replies || []).map((u) => ({
          id: String(u.rpid),
          userName: u.uname,
          message: u.message,
          emotes: u.emotes,
          mentions: u.mentions
        })), n = new Set((t.replies || []).map((u) => String(u.id))), d = o.filter((u) => !n.has(String(u.id)));
        t.replies = [...t.replies || [], ...d], t.subRepliesHasMore = r.hasMore;
      } finally {
        t.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(e) {
    const t = a.comments.find((i) => String(i.id) === String(e));
    t && (t.subRepliesExpanded = !1);
  },
  /**
   * 加载视频字幕轨道
   */
  async loadSubtitles() {
    if (a.bvid) {
      a.srtLoading = !0;
      try {
        const e = await c.fetchVideoSubtitleDetails(a.bvid, a.cid);
        e.ok && e.cues.length ? (a.srtLines = e.cues.map((t) => ({
          id: t.id || `${t.from}`,
          from: t.from,
          to: t.to,
          content: t.content
        })), a.srtCountText = `${a.srtLines.length} 句`, a.rawSubtitleText = e.bodyText || "") : (a.srtLines = [], a.srtCountText = "暂无字幕", a.rawSubtitleText = "");
      } catch {
        a.srtLines = [], a.srtCountText = "字幕暂不可用";
      } finally {
        a.srtLoading = !1;
      }
    }
  },
  toggleSrt(e) {
    a.srtDrawerOpen = typeof e == "boolean" ? e : !a.srtDrawerOpen, a.srtDrawerOpen && !a.srtLines.length && !a.srtLoading && this.loadSubtitles(), this.dispatch("toggleSrt", { open: a.srtDrawerOpen });
  },
  async copySrt() {
    let e = a.rawSubtitleText;
    if (!e && a.srtLines.length && (e = a.srtLines.map((t) => t.content).join(`\r
`)), !e) {
      T("当前视频暂无可用字幕可供复制", !0);
      return;
    }
    try {
      await navigator.clipboard.writeText(e), T("📋 已复制纯文本字幕到剪贴板！");
    } catch {
      T("复制到剪贴板失败，请检查浏览器权限", !0);
    }
    this.dispatch("copySrt");
  },
  analyzeSrtWithAi() {
    let e = a.rawSubtitleText;
    if (!e && a.srtLines.length && (e = a.srtLines.map((t) => t.content).join(`\r
`)), !e) {
      T("视频字幕内容为空，无法进行 AI 深度分析", !0);
      return;
    }
    typeof window < "u" && (window.dispatchEvent(
      new CustomEvent("logicweaver:ai-draft-prompt", {
        detail: {
          title: `B站视频《${a.title}》字幕深度研读`,
          content: `请对以下 B站 视频《${a.title}》(BV号: ${a.bvid}) 的字幕内容进行要点提炼、核心脉络拆解并萃取专业知识点词汇：

${e.slice(0, 12e3)}`
        }
      })
    ), T("✦ 已将字幕要点填入 AI 助手对话草稿")), this.dispatch("analyzeSrtWithAi");
  },
  seekSrt(e) {
    if (typeof document < "u") {
      const t = document.getElementById("bili-theater-video");
      t && (t.currentTime = e, t.play().catch(() => {
      }));
    }
    this.dispatch("seekSrt", { from: e });
  }
}, E = "biliRadioSeriesV1", N = "lw_backup_bili_radio_series", X = "bili_radio_active_folder_id", V = "default-series";
function se() {
  try {
    if (typeof localStorage > "u") return 0;
    const e = Number(localStorage.getItem(X) || 0);
    return Number.isFinite(e) && e > 0 ? e : 0;
  } catch {
    return 0;
  }
}
function ne(e) {
  try {
    if (typeof localStorage > "u" || !e) return;
    localStorage.setItem(X, String(e));
  } catch {
  }
}
const R = "liked-radio-series", L = "我喜欢的电台";
let M = 0, A = !1, Z = Promise.resolve();
function k(e) {
  return e instanceof Error ? e.message : "读取电台失败";
}
function F(e) {
  return {
    bvid: String(e?.bvid || ""),
    title: String(e?.title || "未命名视频"),
    cover: String(e?.cover || "").replace(/^http:/, "https:"),
    author: String(e?.author || e?.upper?.name || e?.upper || ""),
    duration: Number(e?.duration || 0)
  };
}
async function ee(e) {
  return typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get(e) : {};
}
async function U() {
  const e = await ee([E, N]);
  for (const t of [E, N])
    if (e[t] !== void 0) {
      if (!Array.isArray(e[t])) throw new Error("电台存储格式无效，未覆盖数据");
      return e[t];
    }
  for (const t of [E, N]) {
    const i = localStorage.getItem(t);
    if (i !== null) {
      let r;
      try {
        r = JSON.parse(i);
      } catch {
        throw new Error("电台本地副本无法解析，未覆盖数据");
      }
      if (!Array.isArray(r)) throw new Error("电台本地副本格式无效，未覆盖数据");
      return r;
    }
  }
  return null;
}
function Q(e) {
  return e.map((t) => {
    if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("电台系列格式无效，未覆盖数据");
    const i = t, r = i.items == null ? [] : Array.isArray(i.items) ? i.items : typeof i.items == "object" ? Object.values(i.items) : null;
    if (!r) throw new Error("电台曲目格式无效，未覆盖数据");
    const o = r.map((n) => {
      if (!n || typeof n != "object" || Array.isArray(n)) throw new Error("电台曲目格式无效，未覆盖数据");
      const d = n;
      if (typeof d.bvid != "string" || !d.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const u = F(d);
      if (!Number.isFinite(u.duration)) throw new Error("电台曲目时长格式无效，未覆盖数据");
      return { ...d, ...u };
    });
    return {
      ...i,
      id: String(i.id || `series_${Math.random().toString(36).slice(2, 9)}`),
      name: String(i.name || "未命名系列"),
      count: o.length,
      items: o
    };
  });
}
async function $(e, t = {}) {
  if (!e.length && !t.allowEmpty) {
    const o = (await ee([E]))[E];
    if (Array.isArray(o) && o.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const i = JSON.stringify(e);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [E]: e, [N]: e }), localStorage.setItem(E, i), localStorage.setItem(N, i);
}
function G(e = 0, t = !1, i) {
  const r = s.radioQueue.map((n) => ({ ...n, upper: n.author }));
  if (!r.length) return;
  if (t) {
    for (let n = r.length - 1; n > 0; n--) {
      const d = Math.floor(Math.random() * (n + 1));
      [r[n], r[d]] = [r[d], r[n]];
    }
    e = 0;
  }
  const o = Math.max(0, Math.min(r.length - 1, Number(e) || 0));
  ae.playQueue({
    name: i || (t ? "B站电台 · 随机" : "B站电台"),
    items: r,
    startIndex: o
  });
}
typeof window < "u" && (window.playBiliRadioQueue = G);
const v = {
  async ensureSeriesLoaded() {
    if (!A) {
      A = !0;
      try {
        const e = await U();
        s.radioSeries = e === null ? [{ id: V, name: "默认系列", count: 0, items: [] }] : Q(e), e === null && (s.radioSeriesName = "默认系列");
      } catch (e) {
        A = !1, console.warn("[BiliRadio] 读取系列失败", e);
      }
    }
  },
  async init() {
    await this.ensureSeriesLoaded(), (!s.radioFolders.length || !s.radioVideos.length) && await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const e = Q(await U() ?? []);
    return e.length && await $(e), s.radioSeries = e, {
      ok: !0,
      repairedCount: e.length,
      emptySeries: e.filter((t) => !t.items.length).map((t) => ({ id: t.id, name: t.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: e.map((t) => ({ id: t.id, name: t.name, count: t.count, sampleItem: t.items[0]?.title }))
    };
  },
  async refresh() {
    const e = ++M;
    s.radioLoading = !0, s.radioError = "";
    try {
      const t = await c.getUserNav();
      if (!t.isLogin) throw new Error("请先登录 B站");
      const i = await c.getCreatedFolders(t.mid);
      if (e !== M) return;
      s.radioFolders = i.map((n) => ({
        id: Number(n.id),
        title: n.title || "收藏夹",
        count: Number(n.media_count || 0)
      }));
      const r = Number(s.radioActiveFolderId || 0) || se(), o = (r ? s.radioFolders.find((n) => Number(n.id) === r) : void 0) || s.radioFolders[0];
      o ? await this.selectFolder(o.id) : (s.radioActiveFolderId = 0, s.radioVideos = []), this.autoHealEmptySeries();
    } catch (t) {
      e === M && (s.radioError = k(t));
    } finally {
      e === M && (s.radioLoading = !1);
    }
  },
  async autoHealEmptySeries() {
    let e = !1;
    for (const t of s.radioSeries)
      if (t.id !== V && (t.count === 0 || !t.items.length)) {
        const i = s.radioFolders.find(
          (r) => r.title.trim().toLowerCase() === t.name.trim().toLowerCase()
        );
        if (i)
          try {
            const o = ((await c.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => F({ ...n, author: n.upper?.name }));
            o.length && (t.items = o, t.count = o.length, e = !0);
          } catch {
          }
      }
    if (e)
      try {
        await $(s.radioSeries);
      } catch (t) {
        s.radioError = `系列已补全，但保存未确认：${k(t)}`;
      }
  },
  async selectFolder(e) {
    const t = Number(e);
    if (!s.radioFolders.some((r) => Number(r.id) === t) || t === s.radioActiveFolderId && s.radioVideos.length > 0)
      return;
    const i = ++M;
    s.radioActiveFolderId = t, ne(t), s.radioLoading = !0, s.radioError = "";
    try {
      const r = /* @__PURE__ */ new Map(), o = 15;
      for (let n = 1; n <= o; n++) {
        const d = await c.getFolderVideos(t, n, 40);
        if (i !== M) return;
        for (const l of d.medias || [])
          l.bvid && r.set(l.bvid, F({ ...l, author: l.upper?.name }));
        const u = s.radioFolders.find((l) => Number(l.id) === t)?.count || 0;
        if (!d.medias?.length || r.size >= Math.max(d.total, u)) break;
      }
      s.radioVideos = [...r.values()];
    } catch (r) {
      i === M && (s.radioError = k(r));
    } finally {
      i === M && (s.radioLoading = !1);
    }
  },
  add(e) {
    if (e.bvid) {
      if (s.radioQueue.some((t) => t.bvid === e.bvid)) {
        p.fetch("哔哩哔哩电台", `「${e.title || e.bvid}」已在播放队列中`);
        return;
      }
      s.radioQueue.push(F(e));
    }
  },
  addToDefaultSeries(e) {
    const t = Z.then(async () => {
      if (!e.bvid) throw new Error("视频缺少 B 站编号");
      const i = await U(), r = Q(i ?? []);
      let o = r.find((n) => n.id === V || n.name === "默认系列");
      return o || (o = { id: V, name: "默认系列", count: 0, items: [] }, r.push(o)), o.items.some((n) => n.bvid === e.bvid) ? !1 : (o.items.push(F(e)), o.count = o.items.length, await $(r), s.radioSeries = r, A = !0, !0);
    });
    return Z = t.then(() => {
    }, () => {
    }), t;
  },
  remove(e) {
    Number.isInteger(e) && e >= 0 && e < s.radioQueue.length && s.radioQueue.splice(e, 1);
  },
  clear() {
    s.radioQueue = [];
  },
  play(e = !1, t = 0) {
    const i = s.radioSeriesName?.trim() || void 0;
    G(t, e, e && i ? `${i} · 随机` : i);
  },
  playAt(e) {
    if (!s.radioQueue.length) return;
    const t = Math.max(0, Math.min(s.radioQueue.length - 1, Number(e) || 0)), i = s.radioSeriesName?.trim() || void 0;
    G(t, !1, i);
  },
  async loadSeries(e) {
    const t = s.radioSeries.find((i) => i.id === e);
    if (t) {
      if (!t.items.length && t.id !== V) {
        const i = s.radioFolders.find(
          (r) => r.title.trim().toLowerCase() === t.name.trim().toLowerCase()
        );
        if (i) {
          p.fetch("哔哩哔哩电台", `正在从「${i.title}」收藏夹自动补齐系列曲目…`);
          try {
            const o = ((await c.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => F({ ...n, author: n.upper?.name }));
            o.length && (t.items = o, t.count = o.length, await $(s.radioSeries));
          } catch (r) {
            s.radioError = `读取或保存补全系列失败：${k(r)}`, p.fetch("哔哩哔哩电台", s.radioError);
          }
        }
      }
      if (!t.items.length) {
        s.radioSeriesName = t.name, p.fetch("哔哩哔哩电台", `系列「${t.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      s.radioQueue = t.items.map(F), s.radioSeriesName = t.name, p.fetch("哔哩哔哩电台", `已载入系列「${t.name}」（共 ${t.count} 首）`);
    }
  },
  async playSeries(e, t = 0) {
    await this.loadSeries(e);
    const i = s.radioSeries.find((r) => r.id === e);
    i?.items.length && G(t, !1, i.name);
  },
  async deleteSeries(e) {
    await this.ensureSeriesLoaded();
    const t = s.radioSeries.find((o) => o.id === e);
    if (!t) return;
    const i = t.name || "系列", r = s.radioSeries.filter((o) => o.id !== e);
    try {
      await $(r, { allowEmpty: !0 }), s.radioSeries = r, s.radioSeriesName?.trim() === t.name && (s.radioSeriesName = ""), p.fetch("哔哩哔哩电台", `已删除歌单「${i}」`);
    } catch (o) {
      s.radioError = `删除歌单失败：${k(o)}`, p.fetch("哔哩哔哩电台", `删除歌单失败：${k(o)}`);
    }
  },
  isLiked(e) {
    return e ? !!s.radioSeries.find((i) => i.id === R || i.name === L)?.items.some((i) => i.bvid === e) : !1;
  },
  async toggleLike(e) {
    if (!e.bvid) return !1;
    await this.ensureSeriesLoaded();
    const t = [...s.radioSeries];
    let i = t.findIndex((d) => d.id === R || d.name === L);
    i === -1 && (t.unshift({ id: R, name: L, count: 0, items: [] }), i = 0);
    const r = { ...t[i], items: [...t[i].items] }, o = r.items.findIndex((d) => d.bvid === e.bvid);
    let n = !1;
    o >= 0 ? (r.items.splice(o, 1), n = !1) : (r.items.unshift(F(e)), n = !0), r.count = r.items.length, t[i] = r;
    try {
      return await $(t), s.radioSeries = t, p.fetch("哔哩哔哩电台", n ? `♥ 已添加到「${L}」` : `已从「${L}」移除`), n;
    } catch (d) {
      return s.radioError = `喜欢操作失败：${k(d)}`, p.fetch("哔哩哔哩电台", `喜欢操作失败：${k(d)}`), !n;
    }
  },
  openLikedSeries() {
    const e = s.radioSeries.find((t) => t.id === R || t.name === L);
    if (!e || !e.items.length) {
      p.fetch("哔哩哔哩电台", "还没有喜欢的曲目，点击视频旁的 ♡ 即可收藏");
      return;
    }
    s.radioQueue = e.items.map((t) => ({ ...t })), s.radioSeriesName = e.name, p.fetch("哔哩哔哩电台", `已载入「${e.name}」（共 ${e.items.length} 首）`);
  },
  async renameSeries(e, t) {
    const i = t.trim();
    if (!i) return;
    const r = s.radioSeries.find((d) => d.id === e);
    if (!r) return;
    const o = r.name, n = s.radioSeries.map((d) => d.id === e ? { ...d, name: i } : d);
    try {
      await $(n), s.radioSeries = n, s.radioSeriesName === o && (s.radioSeriesName = i), p.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${i}」`);
    } catch (d) {
      s.radioError = `重命名系列失败：${k(d)}`, p.fetch("哔哩哔哩电台", `重命名系列失败：${k(d)}`);
    }
  },
  async save(e) {
    if (!s.radioQueue.length) {
      p.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    const t = (e || s.radioSeriesName || "").trim();
    if (!t) {
      s.radioError = "保存失败：系列名称不能为空，请输入系列名称", p.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
    }
    const i = s.radioQueue.map((n) => ({ ...n })), r = s.radioSeries.findIndex((n) => n.name === t);
    let o = [...s.radioSeries];
    if (r >= 0) {
      const n = o[r];
      o[r] = {
        ...n,
        count: i.length,
        items: i
      };
    } else
      o.push({
        id: `series_${Date.now()}`,
        name: t,
        count: i.length,
        items: i
      });
    try {
      await $(o), s.radioSeries = o, s.radioSeriesName = t, p.fetch(
        "哔哩哔哩电台",
        r >= 0 ? `✓ 已更新歌单「${t}」（共 ${i.length} 首）` : `★ 已保存歌单「${t}」（共 ${i.length} 首）`
      );
    } catch (n) {
      const d = k(n);
      s.radioError = `保存系列失败：${d}`, p.fetch("哔哩哔哩电台", `保存系列失败：${d}`);
    }
  }
};
typeof window < "u" && window.addEventListener("logicweaver:sync-restored", () => {
  (async () => {
    try {
      s.radioSeries = Q(await U() ?? []);
    } catch (e) {
      console.warn("[BiliRadio] 云同步恢复系列重载失败", e);
    }
  })();
});
const g = _({
  isOpen: !1,
  loading: !1,
  error: "",
  title: "",
  bvid: "",
  cid: void 0,
  fullText: "",
  charCount: 0,
  copied: !1,
  cues: []
}), le = {
  get state() {
    return g;
  },
  async open(e) {
    if (e.bvid) {
      g.isOpen = !0, g.loading = !0, g.error = "", g.fullText = "", g.title = e.title || e.bvid, g.bvid = e.bvid, g.cid = e.cid, g.copied = !1, g.cues = [];
      try {
        const t = await c.fetchVideoSubtitleDetails(e.bvid, e.cid);
        if (!t.ok || !t.cues || !t.cues.length) {
          g.error = t.reason || "该视频暂无可用字幕轨道";
          return;
        }
        g.cues = t.cues.map((o) => ({ from: o.from, to: o.to, content: o.content.trim() })).filter((o) => !!o.content);
        const r = g.cues.map((o) => o.content).join(`
`);
        g.fullText = r, g.charCount = r.length;
      } catch (t) {
        g.error = t?.message || "提取字幕失败，请检查网络";
      } finally {
        g.loading = !1;
      }
    }
  },
  close() {
    g.isOpen = !1;
  },
  async copy() {
    if (g.fullText)
      try {
        await navigator.clipboard.writeText(g.fullText), g.copied = !0, setTimeout(() => {
          g.copied = !1;
        }, 2e3);
      } catch {
      }
  },
  downloadTxt() {
    if (!g.fullText) return;
    const e = new Blob([g.fullText], { type: "text/plain;charset=utf-8" }), t = URL.createObjectURL(e), i = document.createElement("a");
    i.href = t, i.download = `${(g.title || g.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(i), i.click(), i.remove(), URL.revokeObjectURL(t);
  }
}, s = _({
  mounted: !1,
  currentTab: "organizer",
  searchQuery: "",
  sortMode: "recent",
  folders: [],
  treeNodes: [],
  collapsedGroups: [],
  activeFolderId: "",
  videos: [],
  radioQueue: [],
  radioFolders: [],
  radioVideos: [],
  radioActiveFolderId: 0,
  radioError: "",
  radioLoading: !1,
  radioSeries: [],
  radioSeriesName: "",
  isLoading: !1,
  organizer: {
    mode: "organizer",
    loading: !1,
    error: "",
    folderTitle: "收藏夹",
    folderSubtitle: "选择左侧收藏夹以浏览内容",
    folderCover: "",
    heroTrackTitle: "暂无播放视频",
    heroLyricText: oe("bili.hero.defaultLyric"),
    heroLyricStatus: "支持 B站 收藏夹与订阅视频",
    folders: [],
    videos: [],
    sort: "fav_time",
    query: "",
    page: 1,
    pageSize: 21,
    loadedFolderId: "",
    totalPages: 1,
    totalItems: 0,
    batchMode: !1,
    selectedCount: 0,
    isTargetPickMode: !1,
    movingVideoId: "",
    cacheLoading: !1,
    cachedVideos: [],
    specialLoading: !1,
    specialError: "",
    specialTitle: "",
    specialSubtitle: "",
    specialBadge: "",
    specialPage: 1,
    specialVideos: [],
    followingGroups: [],
    followingMembers: [],
    followingHasMore: !1,
    subscriptionLoading: !1,
    subscriptionError: "",
    subscriptionTitle: "订阅视频",
    subscriptionSubtitle: "AI 逐字字幕稿 · 点击台词即刻跳转播放",
    subscriptionScriptMode: "lyrics",
    subscriptionChannels: [],
    subscriptionVideos: [],
    subscriptionChapters: [],
    subscriptionCues: [],
    subscriptionDescription: [],
    showFullDescInRightPanel: !1,
    subscriptionCurrent: null
  }
}), H = /* @__PURE__ */ new Set();
let w = [], b = { id: "root", type: "folder", children: [] }, C = /* @__PURE__ */ new Set();
function m(e, t) {
  const i = globalThis;
  typeof i.showBiliToast == "function" ? i.showBiliToast(e, 3200, t) : typeof i.showWindowsToast == "function" && i.showWindowsToast({
    id: `bili_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "哔哩哔哩",
    message: e,
    duration: 3200
  });
}
function de(e) {
  if (!e) return "https://www.bilibili.com";
  if (typeof e.url == "string" && /^https?:\/\//i.test(e.url.trim()))
    return e.url.trim();
  if (typeof e.link == "string" && /^https?:\/\//i.test(e.link.trim()))
    return e.link.trim();
  let t = "";
  if (typeof e.bvid == "string" && e.bvid.startsWith("BV"))
    t = e.bvid;
  else if (typeof e.id == "string" && e.id.startsWith("BV"))
    t = e.id;
  else if (typeof e.url == "string" && e.url.includes("BV")) {
    const o = e.url.match(/BV[a-zA-Z0-9]+/);
    o && (t = o[0]);
  }
  if (t)
    return `https://www.bilibili.com/video/${t}`;
  const r = String(e.aid || e.id || "").replace(/\D/g, "");
  return r ? `https://www.bilibili.com/video/av${r}` : "https://www.bilibili.com";
}
function ce(e) {
  const t = e.duration || 0, i = Math.floor(t / 60), r = String(t % 60).padStart(2, "0"), o = `${i}:${r}`, n = e.cnt_info?.play ? e.cnt_info.play > 1e4 ? `${(e.cnt_info.play / 1e4).toFixed(1)}万` : String(e.cnt_info.play) : "0", d = e.bvid ? `https://www.bilibili.com/video/${e.bvid}` : e.id ? `https://www.bilibili.com/video/av${e.id}` : e.link || "#";
  return {
    id: String(e.id || e.bvid),
    aid: String(e.id || ""),
    bvid: e.bvid,
    title: e.title,
    cover: e.cover,
    url: d,
    duration: o,
    playCount: n,
    author: e.upper?.name || "UP主",
    authorMid: String(e.upper?.mid || ""),
    authorFace: e.upper?.face || "",
    favoriteDate: e.fav_time ? new Date(e.fav_time * 1e3).toLocaleDateString() : "",
    intro: e.intro || "",
    selected: !1,
    writable: !0
  };
}
let j = 21, D = 0;
function we(e, t) {
  return Math.max(1, Math.min(7, Math.floor((e + 14) / (t + 14))));
}
function te(e, t) {
  return e?.status === 412 || e?.code === -412 ? "B 站暂时加载失败，请稍后再试。" : e?.message || t;
}
async function I(e, t = 1, i = "fav_time", r = "") {
  const o = s.organizer;
  o.loading = !0, o.error = "";
  const d = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[i] || "mtime", u = ++D, l = j;
  try {
    const f = await c.getFolderVideos(e, t, l, d, r);
    if (u !== D) return;
    o.videos = f.medias.map(ce), o.selectedCount = 0, o.loadedFolderId = String(e), o.page = t, o.pageSize = l, o.totalItems = f.total, o.totalPages = Math.max(1, Math.ceil(f.total / l)), o.sort = i, o.query = r;
    const S = w.find((y) => String(y.id || y.fid) === String(e));
    o.folderTitle = S?.title || f.info?.title || "收藏夹", o.folderSubtitle = `共 ${f.total} 个内容`;
  } catch (f) {
    u === D && (o.error = te(f, "加载视频列表失败"));
  } finally {
    u === D && (o.loading = !1);
  }
}
async function x(e = !1) {
  const t = s.organizer;
  t.loading = !0, t.error = "";
  try {
    const i = await c.getUserNav();
    if (!i.isLogin) {
      t.error = "未登录 B站", t.folderSubtitle = "未登录 B站，请先登录", t.loading = !1;
      return;
    }
    const [r, o] = await Promise.all([
      c.getCreatedFolders(i.mid),
      c.getCollectedFolders(1, 50, i.mid).catch(() => ({ count: 0, list: [] }))
    ]), n = o.list || [], d = c.getOtherFolders();
    w = [...r, ...n, ...d];
    const u = await c.treeManager.loadTree();
    (c.treeManager.syncTreeWithFolders(u, r) || e) && await c.treeManager.saveTree(u), b = u, C = await c.treeManager.loadCollapsedGroups(), s.collapsedGroups = Array.from(C);
    let f = s.activeFolderId;
    if (!f)
      try {
        typeof localStorage < "u" && (f = localStorage.getItem("bili_organizer_active_folder_id") || "");
      } catch {
      }
    if (!f || !w.some((S) => String(S.id || S.fid) === String(f))) {
      const S = r.find((y) => /默认/.test(y.title)) || r[0] || w[0];
      f = S ? String(S.id || S.fid) : "";
    }
    s.activeFolderId = f, t.folders = c.treeManager.flattenTree(
      b,
      w,
      C,
      f
    ), f ? await I(f, 1, t.sort, t.query) : t.folderSubtitle = "暂无可用收藏夹";
  } catch (i) {
    t.error = te(i, "读取 B 站收藏夹失败");
  } finally {
    t.loading = !1;
  }
}
const ye = {
  get active() {
    return s.mounted;
  },
  get state() {
    return s;
  },
  updateState(e) {
    Object.assign(s, e);
  },
  updateOrganizer(e) {
    Object.assign(s.organizer, e);
  },
  setMounted(e) {
    s.mounted = e, e && x();
  },
  loadOrganizer: x,
  loadFolderVideos: I,
  setOrganizerColumns(e) {
    j = e * 3;
    const { organizer: t, activeFolderId: i } = s;
    if (t.loading || t.error || !i || t.loadedFolderId !== i || t.pageSize === j) return;
    const r = (t.page - 1) * t.pageSize;
    I(i, Math.floor(r / j) + 1, t.sort, t.query);
  },
  switchTab(e) {
    s.currentTab = e, this.dispatch("switch-tab", e);
  },
  async selectFolder(e) {
    const t = String(e), i = s.organizer;
    if (i.isTargetPickMode) {
      const r = w.find((n) => String(n.id || n.fid) === t);
      if (!r || r.isCollected || r.isOther) {
        m("无法移动到该分类，请选择您自建的有效收藏夹", { isError: !0 });
        return;
      }
      if (t === s.activeFolderId) {
        m("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: !0 });
        return;
      }
      i.isTargetPickMode = !1;
      const o = i.movingVideoId;
      if (i.movingVideoId = "", o) {
        m(`正在移动视频至「${r.title}」…`);
        const n = await c.moveVideo(s.activeFolderId, t, o);
        n.ok ? (m(`已移动至「${r.title}」`), await I(s.activeFolderId, i.page, i.sort, i.query)) : m(`移动失败：${n.reason || "未知错误"}`, { isError: !0 });
      } else if (i.batchMode) {
        const n = i.videos.filter((l) => l.selected);
        if (!n.length) return;
        const d = n.map((l) => l.aid || l.id);
        m(`正在批量移动 ${d.length} 个视频至「${r.title}」…`);
        const u = await c.moveVideo(s.activeFolderId, t, d);
        u.ok ? (m(`已将 ${d.length} 个视频移动至「${r.title}」`), i.videos.forEach((l) => l.selected = !1), i.selectedCount = 0, await I(s.activeFolderId, 1, i.sort, i.query)) : m(`批量移动失败：${u.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    s.activeFolderId = t;
    try {
      typeof localStorage < "u" && t && localStorage.setItem("bili_organizer_active_folder_id", t);
    } catch {
    }
    i.folders.forEach((r) => {
      r.selected = r.id === t;
    }), i.mode = "organizer", await I(t, 1, i.sort, "");
  },
  async toggleFolderGroup(e) {
    const t = String(e);
    C.has(t) ? C.delete(t) : C.add(t), s.collapsedGroups = Array.from(C), await c.treeManager.saveCollapsedGroups(C), s.organizer.folders = c.treeManager.flattenTree(
      b,
      w,
      C,
      s.activeFolderId
    );
  },
  async moveFolderNode(e, t, i) {
    c.treeManager.moveNode(b, e, t, i) && (await c.treeManager.saveTree(b), s.organizer.folders = c.treeManager.flattenTree(
      b,
      w,
      C,
      s.activeFolderId
    ), m("已更新收藏夹排序"));
  },
  async openCreateDialog(e) {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (i?.openCreate)
      i.openCreate(e, async ({ name: r, privacy: o }) => {
        if (i.updateCreate({ status: e === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), e === "bili") {
          const n = await c.createRemoteFolder(r, Number(o || 0));
          if (!n.ok) {
            i.updateCreate({ status: n.reason || "创建失败", error: !0 });
            return;
          }
          i.closeCreate(), await x(!0), m(`已成功创建 B站收藏夹「${r}」`);
        } else {
          const n = c.treeManager.createGroupNode(r);
          b.children = b.children || [], b.children.push(n), await c.treeManager.saveTree(b), i.closeCreate(), s.organizer.folders = c.treeManager.flattenTree(
            b,
            w,
            C,
            s.activeFolderId
          ), m(`已建立本地分组「${r}」`);
        }
      });
    else {
      const r = (await J.prompt({
        title: e === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: e === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!r) return;
      if (e === "bili") {
        const o = await c.createRemoteFolder(r);
        o.ok ? (await x(!0), m(`已成功创建「${r}」`)) : m(`创建失败：${o.reason}`, { isError: !0 });
      } else {
        const o = c.treeManager.createGroupNode(r);
        b.children = b.children || [], b.children.push(o), await c.treeManager.saveTree(b), s.organizer.folders = c.treeManager.flattenTree(
          b,
          w,
          C,
          s.activeFolderId
        ), m(`已建立本地分组「${r}」`);
      }
    }
  },
  async handleVideoAction(e, t) {
    const i = s.organizer;
    let r = null;
    if (e && typeof e == "object" && (e.bvid || e.aid || e.id))
      r = e;
    else {
      const l = String(e || "");
      r = i.videos.find((f) => String(f.id) === l || String(f.bvid) === l || String(f.aid) === l) || i.specialVideos.find((f) => String(f.id) === l || String(f.bvid) === l || String(f.aid) === l) || i.cachedVideos.find((f) => String(f.id) === l || String(f.bvid) === l || String(f.aid) === l), !r && (l.startsWith("BV") || /^\d+$/.test(l)) && (r = {
        id: l,
        bvid: l.startsWith("BV") ? l : "",
        aid: /^\d+$/.test(l) ? l : "",
        title: l,
        url: `https://www.bilibili.com/video/${l}`
      });
    }
    if (!r) return;
    const o = r.bvid || (String(r.id || "").startsWith("BV") ? r.id : ""), n = r.aid || r.id, d = de(r), u = d || r.url;
    if (t === "play")
      o || r.aid ? re.openVideo({
        bvid: o,
        aid: String(n || ""),
        title: r.title || o,
        author: r.author ? `${r.author}` : "",
        url: u,
        cover: r.cover
      }) : u && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: u, active: !0 }) : window.open(u, "_blank"));
    else if (t === "open")
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: d, active: !0 }) : window.open(d, "_blank");
    else if (t === "copy-link")
      try {
        await navigator.clipboard.writeText(d), m(`已复制视频链接: ${d}`);
      } catch {
        m("复制链接失败", { isError: !0 });
      }
    else if (t === "move")
      i.isTargetPickMode && i.movingVideoId === r.aid ? (i.isTargetPickMode = !1, i.movingVideoId = "", m("已取消选择目标收藏夹")) : (i.isTargetPickMode = !0, i.movingVideoId = r.aid, m(`请点击左侧收藏夹，将《${r.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${r.title}》`
      }));
    else if (t === "delete") {
      const l = r.aid || r.id, f = s.activeFolderId, S = await c.deleteVideo(f, l);
      S.ok ? (m(`已取消收藏《${r.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          m(`正在还原《${r.title}》…`);
          const y = await c.addVideoToFavorite(f, l);
          y.ok ? (m(`已还原《${r.title}》`), await I(f, i.page, i.sort, i.query)) : m(`还原失败：${y.reason || "未知错误"}`, { isError: !0 });
        }
      }), await I(f, i.page, i.sort, i.query)) : m(`取消收藏失败：${S.reason || "未知错误"}`, { isError: !0 });
    } else if (t === "subtitle") {
      const l = o || (String(r.id || "").startsWith("BV") ? r.id : "");
      l || r.aid ? le.open({
        bvid: l || String(r.aid || r.id || ""),
        cid: r.cid,
        title: r.title || l
      }) : m("该视频暂无字幕信息", { isError: !0 });
    } else if (t === "create-task") {
      const { biliVideoTaskController: l } = await import("./video-task-store-hnaDTFRV.js");
      l.open({
        bvid: r.bvid || (String(r.id || "").startsWith("BV") ? r.id : ""),
        aid: r.aid || r.id,
        title: r.title || "",
        cover: r.cover,
        author: r.author,
        authorMid: r.authorMid,
        playCount: r.playCount,
        duration: r.duration,
        url: u
      });
    } else if (t === "cache") {
      const { cacheBiliVideo: l } = await import("./cache.service-CbQucIT5.js");
      await l({ bvid: r.bvid, aid: r.aid, title: r.title, cover: r.cover });
    } else if (t === "collect-inbox") {
      const l = w.find((y) => /收集箱|默认|Inbox/i.test(y.title)) || w.find((y) => !y.isCollected && !y.isOther) || w[0];
      if (!l) {
        m("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const f = r.aid || r.id;
      m(`正在将《${r.title}》添加到「${l.title}」…`);
      const S = await c.addVideoToFavorite(l.id, f);
      S.ok ? m(`✓ 已成功添加到「${l.title}」`) : m(`添加失败：${S.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(e) {
    return H.add(e), () => {
      H.delete(e);
    };
  },
  dispatch(e, t) {
    const i = s.organizer;
    switch (e) {
      case "select-folder":
        this.selectFolder(t?.id ?? t);
        break;
      case "toggle-folder-group":
        this.toggleFolderGroup(t?.id ?? t);
        break;
      case "move-folder-node":
        t?.sourceId && t?.targetId && this.moveFolderNode(t.sourceId, t.targetId, t.mode || "before");
        break;
      case "create-bili-folder":
        this.openCreateDialog("bili");
        break;
      case "create-local-group":
        this.openCreateDialog("plugin");
        break;
      case "organizer-refresh":
        x(!0);
        break;
      case "subscription-toggle-desc-panel":
        i.showFullDescInRightPanel = !i.showFullDescInRightPanel;
        break;
      case "organizer-open":
        i.mode = "organizer", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, i.folders.length || x();
        break;
      case "open-radio":
        i.mode = "radio", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, v.init();
        break;
      case "radio-refresh":
        v.refresh();
        break;
      case "radio-select-folder":
        v.selectFolder(Number(t));
        break;
      case "radio-add":
        v.add(t);
        break;
      case "radio-remove":
        v.remove(Number(t?.index));
        break;
      case "radio-clear":
        v.clear();
        break;
      case "radio-save":
        v.save(String(t?.name || ""));
        break;
      case "radio-load-series":
        v.loadSeries(String(t?.id ?? t));
        break;
      case "radio-play-series":
        typeof t == "object" && t !== null ? v.playSeries(String(t.id || ""), Number(t.startIndex || 0)) : v.playSeries(String(t));
        break;
      case "radio-delete-series":
        v.deleteSeries(String(t));
        break;
      case "radio-rename-series": {
        const r = t;
        r?.id && r?.name && v.renameSeries(r.id, r.name);
        break;
      }
      case "radio-play-index":
        v.playAt(Number(t));
        break;
      case "radio-play":
        v.play(!1, typeof t == "number" ? t : 0);
        break;
      case "radio-shuffle":
        v.play(!0);
        break;
      case "organizer-sort":
        ["fav_time", "view", "pubtime"].includes(t) && I(s.activeFolderId, 1, t, i.query);
        break;
      case "organizer-search":
        I(s.activeFolderId, 1, i.sort, String(t || "").trim());
        break;
      case "organizer-page": {
        const r = Number(t);
        Number.isFinite(r) && r >= 1 && I(s.activeFolderId, r, i.sort, i.query);
        break;
      }
      case "organizer-batch-toggle":
        i.batchMode = !i.batchMode, i.batchMode || (i.videos.forEach((r) => r.selected = !1), i.selectedCount = 0);
        break;
      case "organizer-batch-select": {
        const r = String(t || ""), o = i.videos.find((n) => n.id === r || n.bvid === r);
        o && (o.selected = !o.selected, i.selectedCount = i.videos.filter((n) => n.selected).length);
        break;
      }
      case "organizer-batch-all": {
        const r = i.videos.length > 0 && i.videos.every((o) => o.selected);
        i.videos.forEach((o) => o.selected = !r), i.selectedCount = r ? 0 : i.videos.length;
        break;
      }
      case "organizer-batch-move": {
        const r = i.videos.filter((o) => o.selected).length;
        if (!r) {
          m("请先选择要移动的视频", { isError: !0 });
          return;
        }
        i.isTargetPickMode = !0, m(`请点击左侧目标收藏夹，将 ${r} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const r = i.videos.filter((o) => o.selected);
        if (!r.length) {
          m("请先选择要取消收藏的视频", { isError: !0 });
          return;
        }
        (async () => {
          if (await J.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${r.length} 个视频吗？`,
            danger: !0
          })) {
            const n = s.activeFolderId, d = r.map((l) => l.aid || l.id);
            m(`正在批量移除 ${d.length} 个视频…`);
            let u = 0;
            for (const l of d)
              (await c.deleteVideo(n, l)).ok && u++;
            m(`已移除 ${u}/${d.length} 个视频`), i.batchMode = !1, i.selectedCount = 0, await I(n, i.page, i.sort, i.query);
          }
        })();
        break;
      }
      case "organizer-play-video":
      case "special-play-video": {
        this.handleVideoAction(t, "play");
        break;
      }
      case "organizer-video-action":
      case "special-video-action":
        t?.action && this.handleVideoAction(t.video || t.id, t.action);
        break;
      case "organizer-cancel-move-target":
        i.isTargetPickMode = !1, i.movingVideoId = "", m("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const r = globalThis;
        typeof r.openBiliUpGroupManagerDialog == "function" ? r.openBiliUpGroupManagerDialog() : r.LogicWeaverBiliUpGroupManager?.open && r.LogicWeaverBiliUpGroupManager.open();
        break;
      }
    }
    for (const r of H)
      try {
        r(e, t);
      } catch (o) {
        console.error("[BiliFavorites] Action error:", o);
      }
  }
}, h = _({
  create: { open: !1, kind: "bili", name: "", privacy: 0, submitting: !1, status: "", error: !1 },
  confirm: { open: !1, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 },
  channelPicker: { open: !1, loading: !1, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" }
});
let O = null, z = null, P = null;
const Ie = {
  state: h,
  openCreate(e, t) {
    O = t, Object.assign(h.create, { open: !0, kind: e, name: "", privacy: 0, submitting: !1, status: "", error: !1 });
  },
  closeCreate() {
    h.create.submitting || (h.create.open = !1, O = null);
  },
  updateCreate(e) {
    Object.assign(h.create, e);
  },
  async submitCreate(e) {
    if (!(!O || h.create.submitting)) {
      h.create.submitting = !0, h.create.error = !1;
      try {
        await O(e);
      } finally {
        h.create.submitting = !1;
      }
    }
  },
  openConfirm(e, t) {
    z = t, Object.assign(h.confirm, { open: !0, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: !0, submitting: !1 }, e);
  },
  closeConfirm() {
    h.confirm.submitting || (h.confirm.open = !1, z = null);
  },
  async submitConfirm() {
    if (!(!z || h.confirm.submitting)) {
      h.confirm.submitting = !0;
      try {
        await z(), h.confirm.open = !1;
      } finally {
        h.confirm.submitting = !1, z = null;
      }
    }
  },
  openChannelPicker(e) {
    P = e, Object.assign(h.channelPicker, { open: !0, loading: !0, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" });
  },
  updateChannelPicker(e) {
    Object.assign(h.channelPicker, e);
  },
  closeChannelPicker() {
    h.channelPicker.submittingMid || (h.channelPicker.open = !1, P = null);
  },
  async selectChannel(e) {
    const t = h.channelPicker;
    if (!(!P || t.submittingMid)) {
      t.submittingMid = e;
      try {
        await P(e), t.open = !1;
      } catch (i) {
        t.error = i instanceof Error ? i.message : "添加失败";
      } finally {
        t.submittingMid = "", t.open || (P = null);
      }
    }
  }
}, B = _({
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
let K = null;
const ue = {
  state: B,
  setActionHandler(e) {
    K = e;
  },
  open(e = {}) {
    Object.assign(B, { open: !0, loading: !0, refreshing: !1, error: "", groups: [], followings: [], activeGroupId: "", query: "", filter: "all", page: 1, busyMid: "" }, e);
  },
  update(e) {
    Object.assign(B, e);
  },
  async dispatch(e, t) {
    await K?.(e, t);
  },
  close() {
    B.busyMid || B.refreshing || (B.open = !1, K?.("close"));
  }
};
typeof window < "u" && (window.LogicWeaverBiliUpGroupManager = ue);
export {
  L,
  ye as a,
  Se as b,
  Ie as c,
  ue as d,
  s as e,
  h as f,
  B as g,
  v as h,
  we as i,
  R as j,
  g as k,
  le as s
};
