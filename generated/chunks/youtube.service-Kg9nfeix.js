import { a as m, y as p } from "./youtube-store--HTVWf9f.js";
const I = "youtubeFavoritesV1", C = "youtubeFavGroupsV1";
async function B() {
  if (typeof chrome < "u" && chrome.storage?.local)
    return new Promise((e, t) => {
      chrome.storage.local.get([I, C], (i) => {
        chrome.runtime.lastError ? t(new Error("收藏存储读取失败")) : e(i);
      });
    });
  const d = {};
  for (const e of [I, C]) {
    const t = localStorage.getItem(e);
    t !== null && (d[e] = JSON.parse(t));
  }
  return d;
}
async function R() {
  const d = await B(), e = d[I] === void 0 ? [] : d[I], t = d[C] === void 0 ? ["全部", "稍后观看"] : d[C];
  if (!Array.isArray(e) || !e.every((i) => i && typeof i.id == "string" && typeof i.title == "string"))
    throw new Error("收藏数据格式异常，未覆盖原记录");
  if (!Array.isArray(t) || !t.every((i) => typeof i == "string")) throw new Error("收藏分组格式异常，未覆盖原记录");
  return { favorites: e.map((i) => ({ ...i })), groups: [...t] };
}
function V(d) {
  return Array.isArray(d) ? d.map(V) : d && typeof d == "object" ? Object.fromEntries(Object.keys(d).sort().filter((e) => d[e] !== void 0).map((e) => [e, V(d[e])])) : d;
}
async function D(d) {
  const e = { [I]: d.favorites, [C]: d.groups };
  if (typeof chrome < "u" && chrome.storage?.local)
    await new Promise((i, s) => {
      chrome.storage.local.set(e, () => {
        chrome.runtime.lastError ? s(new Error("收藏保存结果未确认")) : i();
      });
    });
  else
    for (const [i, s] of Object.entries(e)) localStorage.setItem(i, JSON.stringify(s));
  const t = await R();
  if (JSON.stringify(V(t)) !== JSON.stringify(V(d))) throw new Error("收藏保存后的核对不一致，请重读确认");
}
async function y(d, e, t = 8e3) {
  return e?.throwIfAborted(), new Promise((i, s) => {
    let o = !1;
    const c = (h, u) => {
      o || (o = !0, clearTimeout(a), e?.removeEventListener("abort", r), h ? s(h) : i(u));
    }, r = () => c(new DOMException("Read cancelled", "AbortError")), a = setTimeout(() => c(new Error("YouTube read timeout")), t);
    if (e?.addEventListener("abort", r, { once: !0 }), e?.aborted) {
      r();
      return;
    }
    try {
      if (typeof chrome > "u" || !chrome.runtime?.sendMessage) throw new Error("Extension transport unavailable");
      chrome.runtime.sendMessage(d, (h) => {
        const u = chrome.runtime.lastError;
        o || (u || !h?.ok ? c(new Error("YouTube background read failed")) : c(void 0, h));
      });
    } catch {
      c(new Error("YouTube background transport unavailable"));
    }
  });
}
async function U(d, e, t, i = 8e3) {
  t?.throwIfAborted();
  const s = new AbortController(), o = () => s.abort();
  t?.addEventListener("abort", o, { once: !0 });
  const c = setTimeout(o, i);
  try {
    const r = await fetch(d, { ...e, signal: s.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const a = await r.text();
    return s.signal.throwIfAborted(), a;
  } finally {
    clearTimeout(c), t?.removeEventListener("abort", o);
  }
}
const S = "youtubeRssChannelsV1", A = "youtubeCustomGroupsV1", N = "youtubeRssVideosCacheV1", v = "youtubePlaylistsV1", F = "youtubeRecommendBatchV1", q = 900 * 1e3, G = ["默认"], j = [];
function E(d) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(d, e);
    else {
      const t = {};
      d.forEach((i) => {
        try {
          const s = localStorage.getItem(i);
          s && (t[i] = JSON.parse(s));
        } catch {
        }
      }), e(t);
    }
  });
}
function w(d) {
  return new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.set(d, e) : (Object.entries(d).forEach(([t, i]) => {
      try {
        localStorage.setItem(t, JSON.stringify(i));
      } catch {
      }
    }), e());
  });
}
function O(d) {
  if (!d) return 0;
  const e = new Date(d).getTime();
  if (!isNaN(e) && e > 0) return e;
  const t = Date.now(), i = String(d).match(/(\d+)\s*(秒|分|小时|天|周|月|年|second|minute|hour|day|week|month|year)/i);
  if (!i) return t - 864e5 * 30;
  const s = parseInt(i[1], 10), o = i[2].toLowerCase();
  return o.startsWith("秒") || o.startsWith("second") ? t - s * 1e3 : o.startsWith("分") || o.startsWith("minute") ? t - s * 60 * 1e3 : o.startsWith("小时") || o.startsWith("hour") ? t - s * 3600 * 1e3 : o.startsWith("天") || o.startsWith("day") ? t - s * 86400 * 1e3 : o.startsWith("周") || o.startsWith("week") ? t - s * 7 * 86400 * 1e3 : o.startsWith("月") || o.startsWith("month") ? t - s * 30 * 86400 * 1e3 : o.startsWith("年") || o.startsWith("year") ? t - s * 365 * 86400 * 1e3 : t - 864e5 * 30;
}
function $(d) {
  if (!d) return "";
  if (typeof d == "string" && (d.includes("前") || d.includes("ago") || d.includes("Streamed") || d.includes("Premiered")))
    return d;
  const e = new Date(d).getTime();
  if (!e || isNaN(e)) return String(d);
  const t = Math.max(1, Math.floor((Date.now() - e) / 6e4));
  if (t < 60) return `${t} 分钟前`;
  const i = Math.floor(t / 60);
  if (i < 24) return `${i} 小时前`;
  const s = Math.floor(i / 24);
  return s < 30 ? `${s} 天前` : new Date(e).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}
function g(d) {
  if (!d) return "";
  const e = typeof d == "number" ? d : parseInt(String(d).replace(/,/g, ""), 10);
  return isNaN(e) ? String(d) : e >= 1e8 ? `${(e / 1e8).toFixed(1)}亿次观看` : e >= 1e4 ? `${(e / 1e4).toFixed(1)}万次观看` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k次观看` : `${e}次观看`;
}
class z {
  constructor() {
    this.channels = [], this.channelsLoaded = !1, this.initialized = !1, this.groups = [], this.groupsLoaded = !1, this.favorites = [], this.favoritesLoaded = !1, this.favoriteReadVersion = 0, this.playlists = [], this.playlistsLoaded = !1, this.exploreCache = {}, this.recommendGeneration = 0, this.recommendationRead = null, this.recommendSignature = "", this.lastContinuationToken = "", this.recommendPool = [], this.shownVideoIds = /* @__PURE__ */ new Set(), this.RECOMMEND_PAGE_SIZE = 18, this.hasAutoSynced = !1;
  }
  setRecommendationViewSignal(e) {
    this.recommendationViewSignal = e;
  }
  beginRecommendationRead(e) {
    e?.throwIfAborted(), this.recommendationRead?.abort();
    const t = new AbortController(), i = ++this.recommendGeneration;
    this.recommendationRead = t;
    const s = () => i === this.recommendGeneration && !t.signal.aborted, o = () => {
      t.abort(), i === this.recommendGeneration && m.updateState({ isLoading: !1, isLoadingMore: !1 });
    };
    e?.addEventListener("abort", o, { once: !0 });
    const c = setTimeout(() => {
      i === this.recommendGeneration && m.updateState({ error: "推荐读取超时，请手动刷新。" }), o();
    }, 45e3);
    return {
      signal: t.signal,
      current: s,
      finish: () => {
        clearTimeout(c), e?.removeEventListener("abort", o), i === this.recommendGeneration && (this.recommendationRead = null, m.updateState({ isLoading: !1, isLoadingMore: !1 }));
      }
    };
  }
  // -------------------------------------------------------------
  // 1. 频道与分组管理
  // -------------------------------------------------------------
  async loadGroups() {
    if (this.groupsLoaded) return this.groups;
    const e = await E([A]), t = (Array.isArray(e[A]) ? e[A] : []).filter((o) => o !== "ASMR·癒し" && o !== "AI与前沿"), i = this.channels.map((o) => o.group || "默认"), s = /* @__PURE__ */ new Set([...G, ...i, ...t]);
    return this.groups = Array.from(s).filter(Boolean), this.groupsLoaded = !0, m.updateState({ groups: this.groups }), this.groups;
  }
  async saveGroups(e) {
    e && (this.groups = e), await w({ [A]: this.groups }), m.updateState({ groups: this.groups });
  }
  async loadChannels() {
    if (this.channelsLoaded) return this.channels;
    let t = (await E([S]))[S];
    const i = /* @__PURE__ */ new Set([
      "UCxSgwgB3P1H0U9zSgG7eY4Q",
      "UCYQ1rN3zZ7Yj1zVw4aX8aBw",
      "UC5Z_F3x_cW9X2p2E9W1sL5Q",
      "UCgK4c6Q4wQp7e9m1X2z3A4B",
      "UCVHFbqXqoYvEWM1Ddxl0QDg",
      "UCBJycsmduvYEL83R_U4JriQ",
      "UCHnyfMqiRRG1u-2MsSQLbXA",
      "UCsTcErHg8oDvUnTzoqsYeNw",
      "UCsBjURrPoezykLs9EqgamOA",
      "UCRC3Vi-rL7mopaKFI4Du2Rw",
      "UC-jDxvKrM-QBqcDMzSvBn4A",
      "UCfPwtmjVXsByl4z8TT32Lbg",
      "UClqNSqnWeOOUVkzcJFj4rBw",
      "UCe4jUOmQPKMDvOkzJpDfMRQ",
      "UCbfYPyITQ-EYgqIZ34qPqTQ",
      "UCnUYZLuoy1rq1aVMwx4aTzw",
      "UCSHZKyawb77ixDdsGog4iWA"
    ]);
    !Array.isArray(t) || t.length === 0 ? (t = [], await w({ [S]: t })) : (t = t.filter((o) => !i.has(o.id)), await w({ [S]: t })), this.channels = t, this.channelsLoaded = !0;
    const s = this.channels.map((o) => ({
      id: o.id,
      title: o.name,
      handle: o.handle,
      group: o.group || "默认",
      thumbnail: o.thumbnail
    }));
    return m.updateState({ channels: s }), await this.loadGroups(), this.channels;
  }
  async saveChannels(e) {
    e && (this.channels = e), await w({ [S]: this.channels });
    const t = this.channels.map((i) => ({
      id: i.id,
      title: i.name,
      handle: i.handle,
      group: i.group || "默认",
      thumbnail: i.thumbnail
    }));
    m.updateState({ channels: t }), await this.loadGroups();
  }
  async addChannel(e) {
    await this.loadChannels();
    let t = "", i = "", s = "默认", o = "";
    if (typeof e == "string" ? t = e.trim() : (t = e.id.trim(), i = e.name?.trim() || "", s = e.group?.trim() || "默认", o = e.handle?.trim() || ""), t.includes("@") || t.startsWith("http"))
      try {
        const r = t.match(/@([a-zA-Z0-9_.-]+)/);
        r && (o = `@${r[1]}`);
        const a = o ? `https://www.youtube.com/${o}` : t, u = (await new Promise((n) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: a }, n);
        }))?.html || "", l = u.match(/channel_id=(UC[a-zA-Z0-9_-]+)/) || u.match(/"channelId":"(UC[a-zA-Z0-9_-]+)"/);
        l && (t = l[1]);
        const f = u.match(/<title>(.*?) - YouTube<\/title>/i) || u.match(/<title>(.*?)<\/title>/i);
        f && !i && (i = f[1].trim());
      } catch {
      }
    return t.startsWith("UC") ? (i || (i = o || t), this.channels.some((r) => r.id === t) ? !1 : (this.channels.push({ id: t, name: i, group: s, handle: o }), await this.saveChannels(), !0)) : !1;
  }
  async removeChannel(e) {
    await this.loadChannels();
    const t = this.channels.length;
    return this.channels = this.channels.filter((i) => i.id !== e), this.channels.length !== t ? (await this.saveChannels(), !0) : !1;
  }
  /**
   * 从当前浏览器登录的 YouTube 账号自动同步关注的所有频道
   */
  async syncSubscribedChannels() {
    m.updateState({ isLoading: !0, error: "" });
    try {
      let e = "";
      try {
        e = await new Promise((a, h) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/feed/channels" }, (u) => {
            u && u.ok && u.html ? a(u.html) : h(new Error(u?.error || "后台请求失败"));
          });
        });
      } catch {
        const a = await fetch("https://www.youtube.com/feed/channels", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        });
        if (!a.ok) throw new Error(`HTTP ${a.status}`);
        e = await a.text();
      }
      const t = e.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) || e.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
      if (!t) throw new Error("未能获取频道列表，请确保已在当前浏览器登录 YouTube");
      const i = JSON.parse(t[1]), s = [], o = /* @__PURE__ */ new Set(), c = (a) => {
        if (!(!a || typeof a != "object")) {
          if (a.channelRenderer) {
            const h = a.channelRenderer, u = h.channelId, l = h.title?.simpleText || h.title?.runs?.[0]?.text;
            u && l && !o.has(u) && (o.add(u), s.push({
              id: u,
              name: l,
              group: "YouTube 关注",
              thumbnail: h.thumbnail?.thumbnails?.[0]?.url
            }));
          }
          for (const h of Object.keys(a)) c(a[h]);
        }
      };
      if (c(i), s.length === 0)
        throw new Error("未解析到关注频道，请确认是否已登录 YouTube");
      await this.loadChannels();
      let r = 0;
      for (const a of s)
        this.channels.some((h) => h.id === a.id) || (this.channels.push(a), r++);
      return await this.saveChannels(), await this.loadUpdates(!0), r;
    } catch (e) {
      throw m.updateState({ isLoading: !1, error: e?.message || "同步关注频道失败" }), e;
    }
  }
  parseOpml(e) {
    const t = new DOMParser().parseFromString(e, "application/xml"), i = Array.from(t.querySelectorAll("outline[xmlUrl], outline[xmlurl]")), s = [];
    return i.forEach((o) => {
      const r = (o.getAttribute("xmlUrl") || o.getAttribute("xmlurl") || "").match(/channel_id=([a-zA-Z0-9_-]+)/);
      if (r) {
        const a = r[1], h = (o.getAttribute("title") || o.getAttribute("text") || "YouTube 频道").trim();
        s.push({ id: a, name: h, group: "导入" });
      }
    }), s;
  }
  exportOpml() {
    const e = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<opml version="1.1">',
      "  <head>",
      "    <title>LogicWeaver YouTube 订阅导出</title>",
      "  </head>",
      "  <body>",
      '    <outline text="YouTube Subscriptions" title="YouTube Subscriptions">'
    ];
    return this.channels.forEach((t) => {
      const i = (t.name || "YouTube Channel").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      e.push(
        `      <outline text="${i}" title="${i}" type="rss" xmlUrl="https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(t.id)}"/>`
      );
    }), e.push("    </outline>", "  </body>", "</opml>"), e.join(`
`);
  }
  // -------------------------------------------------------------
  // 2. 官方原生 XML / RSS 极速免配额解析引擎（通过后台保证无 CORS 限制）
  // -------------------------------------------------------------
  async fetchChannelVideosFromRss(e, t = "", i) {
    const s = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(e)}`;
    try {
      let o = "";
      try {
        if (o = (await y({ type: "fetchYouTubeHtml", url: s }, i)).html, typeof o != "string") throw new Error("Invalid RSS response");
      } catch {
        i?.throwIfAborted(), o = await U(s, { cache: "no-store", referrerPolicy: "no-referrer" }, i, 6e3);
      }
      return i?.throwIfAborted(), this.parseRssXml(o, t, e);
    } catch {
      return i?.throwIfAborted(), [];
    }
  }
  async fetchPlaylistVideos(e) {
    const t = e.replace(/^https?:\/\/.*?list=/i, "").replace(/^VL/i, "").trim(), i = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(t)}`, s = new AbortController(), o = setTimeout(() => s.abort(), 8e3);
    try {
      const c = await fetch(i, { signal: s.signal, cache: "no-store", referrerPolicy: "no-referrer" });
      if (clearTimeout(o), !c.ok) throw new Error(`HTTP ${c.status}`);
      const r = await c.text(), a = this.parseRssXml(r, "播放列表");
      return m.updateState({ playlistVideos: a, activePlaylistId: t }), a;
    } finally {
      clearTimeout(o);
    }
  }
  parseRssXml(e, t = "YouTube", i = "") {
    const s = new DOMParser().parseFromString(e, "application/xml"), o = s.querySelector("feed > title")?.textContent || t;
    return Array.from(s.querySelectorAll("entry")).map((r) => {
      const a = r.getElementsByTagNameNS("http://www.youtube.com/xml/schemas/2015", "videoId")[0]?.textContent || r.querySelector("videoId")?.textContent || (r.querySelector("id")?.textContent || "").replace(/^yt:video:/, ""), h = r.querySelector("title")?.textContent || "YouTube 视频", u = r.querySelector("author > name")?.textContent || o, l = r.querySelector("published")?.textContent || "", f = r.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "group")[0] || r.querySelector("group"), T = (f?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0] || f?.querySelector("thumbnail"))?.getAttribute("url") || (a ? `https://i.ytimg.com/vi/${a}/hqdefault.jpg` : ""), b = f?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "statistics")[0]?.getAttribute("views") || "";
      return {
        id: a,
        title: h,
        channelTitle: u,
        channelId: i || r.querySelector("channelId")?.textContent || "",
        publishedAt: $(l),
        thumbnail: T,
        views: g(b),
        videoUrl: `https://www.youtube.com/watch?v=${a}`
      };
    }).filter((r) => r.id && !/^Deleted video$|^Private video$/i.test(r.title));
  }
  // -------------------------------------------------------------
  // 3. 订阅更新流
  // -------------------------------------------------------------
  async loadUpdates(e = !1) {
    if (await this.loadChannels(), m.updateState({ isLoading: !0, error: "" }), !e) {
      const t = (await E([N]))[N];
      if (t?.items?.length && Date.now() - Number(t.savedAt || 0) < q) {
        const i = t.items.map((s) => ({
          id: s.videoId,
          title: s.title,
          channelTitle: s.channel,
          channelId: s.channelId,
          publishedAt: $(s.publishedAt),
          views: s.views,
          thumbnail: s.thumbnail,
          group: s.group,
          videoUrl: `https://www.youtube.com/watch?v=${s.videoId}`
        }));
        return m.updateState({
          videos: i,
          isLoading: !1,
          userName: `已订阅 ${this.channels.length} 个频道`
        }), i;
      }
    }
    if (!this.channels.length)
      return m.updateState({ videos: [], isLoading: !1 }), [];
    try {
      const i = [];
      for (let r = 0; r < this.channels.length; r += 5) {
        const a = this.channels.slice(r, r + 5), h = await Promise.all(
          a.map(async (u) => {
            try {
              return (await this.fetchChannelVideosFromRss(u.id, u.name)).map((f) => ({ ...f, group: u.group || "默认" }));
            } catch {
              return [];
            }
          })
        );
        i.push(...h);
      }
      const s = /* @__PURE__ */ new Set(), o = [];
      i.flat().forEach((r) => {
        r?.id && !s.has(r.id) && (s.add(r.id), o.push(r));
      }), o.sort((r, a) => {
        const h = O(r.publishedAt);
        return O(a.publishedAt) - h;
      });
      const c = o.slice(0, 60);
      return c.length > 0 && await w({
        [N]: {
          savedAt: Date.now(),
          items: c.map((r) => ({
            videoId: r.id,
            title: r.title,
            channel: r.channelTitle,
            channelId: r.channelId || "",
            publishedAt: r.publishedAt,
            views: r.views,
            thumbnail: r.thumbnail,
            group: r.group
          }))
        }
      }), m.updateState({
        videos: c,
        isLoading: !1,
        userName: `已订阅 ${this.channels.length} 个频道`
      }), c;
    } catch (t) {
      return m.updateState({
        isLoading: !1,
        error: t.message || "拉取视频动态失败"
      }), [];
    }
  }
  async getCachedRecommendBatch() {
    try {
      const t = (await E([F]))[F];
      if (t && Array.isArray(t.videos) && t.videos.length > 0)
        return t;
    } catch {
    }
    return null;
  }
  async saveCachedRecommendBatch(e, t) {
    if (!(!e || !e.length))
      try {
        const i = {
          savedAt: Date.now(),
          userName: t,
          videos: e
        };
        await w({ [F]: i });
      } catch {
      }
  }
  async loadRecommend(e = !1, t = this.recommendationViewSignal) {
    if (t?.aborted) return [];
    const i = this.beginRecommendationRead(t), s = i.current;
    try {
      if (!e && p.exploreVideos.length > 0)
        return p.exploreVideos;
      if (!e) {
        const c = await this.getCachedRecommendBatch();
        if (c && c.videos.length > 0)
          return m.updateState({
            exploreVideos: c.videos,
            isLoading: !1,
            error: "",
            userName: c.userName || "账号专属推荐",
            currentPage: 1
          }), c.videos.forEach((r) => this.shownVideoIds.add(r.id)), c.videos;
      }
      if (this.recommendPool.length >= this.RECOMMEND_PAGE_SIZE) {
        const c = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
        return c.forEach((r) => this.shownVideoIds.add(r.id)), m.updateState({
          exploreVideos: c,
          isLoading: !1,
          error: "",
          userName: "账号专属推荐 · 换一批",
          currentPage: 1
        }), this.saveCachedRecommendBatch(c, "账号专属推荐 · 换一批"), this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken && this.fetchContinuationVideos(this.lastContinuationToken), c;
      }
      if (m.updateState({ isLoading: !0, error: "" }), this.lastContinuationToken)
        try {
          const c = await this.fetchContinuationVideos(this.lastContinuationToken, i.signal);
          if (s())
            for (const r of c)
              !this.shownVideoIds.has(r.id) && !this.recommendPool.some((a) => a.id === r.id) && this.recommendPool.push(r);
        } catch {
        }
      if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE) {
        const c = { token: "" }, r = await this.fetchPersonalRecommendations(i.signal, c);
        if (!s()) return [];
        this.lastContinuationToken = c.token;
        const a = r.filter((u) => !this.shownVideoIds.has(u.id)), h = a.length >= 10 ? a : r;
        h === r && this.shownVideoIds.clear();
        for (const u of h)
          this.recommendPool.some((l) => l.id === u.id) || this.recommendPool.push(u);
      }
      if (!s()) return [];
      const o = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
      return o.forEach((c) => this.shownVideoIds.add(c.id)), o.length === 0 ? (m.updateState({
        isLoading: !1,
        error: "未获取到推荐视频，请检查网络或 YouTube 登录状态。",
        userName: "暂无推荐"
      }), []) : (m.updateState({
        exploreVideos: o,
        isLoading: !1,
        error: "",
        userName: "账号专属推荐",
        currentPage: 1
      }), this.saveCachedRecommendBatch(o, "账号专属推荐"), this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken && this.fetchContinuationVideos(this.lastContinuationToken), o);
    } catch {
      return s() && m.updateState({
        isLoading: !1,
        error: "获取推荐失败，请稍后点击换一批重试。"
      }), [];
    } finally {
      i.finish();
    }
  }
  async fetchContinuationVideos(e, t) {
    if (!e) return [];
    const i = { token: "" };
    try {
      const s = await y({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: e }
      }, t, 4500), o = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(s.data)};<\/script>`, i);
      return this.lastContinuationToken = i.token === e ? "" : i.token, o;
    } catch {
      return [];
    }
  }
  /**
   * 从 HTML 或 InnerTube JSON 提取完整的 YouTube 视频结构（全面适配最新 2024+ lockupViewModel、桌面端 videoRenderer、playlistVideoRenderer、并彻底过滤广告）
   */
  extractVideosFromHtml(e, t) {
    t && (t.token = "");
    const i = e.match(/(?:window\["ytInitialData"\]|var ytInitialData|ytInitialData)\s*=\s*({.+?});(?:\s*<\/script>|\s*var|\s*window)/) || e.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) || e.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
    if (!i) return [];
    try {
      const s = JSON.parse(i[1]), o = [], c = /* @__PURE__ */ new Set(), r = (l) => {
        !l || !l.id || c.has(l.id) || (c.add(l.id), o.push(l));
      }, a = (l) => {
        if (!l || typeof l != "object") return !1;
        if (l.adSlotRenderer || l.inFeedAdLayoutRenderer || l.promotedSparklesWebRenderer || l.promotedVideoRenderer || l.statementBannerRenderer || l.adBreakRenderer) return !0;
        const f = JSON.stringify(
          l.badges || l.badge || l.navigationEndpoint || l.contentType || l.layoutType || ""
        ).toLowerCase();
        return !!(f.includes("sponsored") || f.includes("广告") || f.includes("赞助") || f.includes("promoted"));
      }, h = (l) => {
        if (!l || a(l)) return null;
        const f = l.contentId || l.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId;
        if (!f || typeof f != "string" || f.length < 8) return null;
        const n = l.metadata?.lockupMetadataViewModel, T = n?.title?.content || n?.title?.runs?.[0]?.text || n?.title?.simpleText || l.contentImage?.thumbnailViewModel?.image?.accessibilityText || "YouTube 视频";
        let b = "", M = "", _ = "";
        const L = n?.metadata?.contentMetadataViewModel?.metadataRows;
        if (Array.isArray(L)) {
          const Y = L[0]?.metadataParts;
          Array.isArray(Y) && Y[0]?.text?.content && (b = Y[0].text.content);
          const x = L[1]?.metadataParts;
          Array.isArray(x) && (x[0]?.text?.content && (M = x[0].text.content), x[1]?.text?.content && (_ = x[1].text.content));
        }
        let P = `https://i.ytimg.com/vi/${f}/hqdefault.jpg`;
        const k = l.contentImage?.thumbnailViewModel?.image?.sources;
        return Array.isArray(k) && k.length > 0 && (P = k.slice(-1)[0]?.url || P), {
          id: f,
          title: T,
          channelTitle: b || "YouTube",
          publishedAt: _,
          views: g(M),
          thumbnail: P,
          videoUrl: `https://www.youtube.com/watch?v=${f}`
        };
      }, u = (l, f = 0) => {
        if (!(!l || typeof l != "object" || f > 24 || o.length >= 80) && !a(l)) {
          if (l.lockupViewModel) {
            r(h(l.lockupViewModel));
            return;
          }
          if (l.videoRenderer && !a(l.videoRenderer)) {
            const n = l.videoRenderer;
            if (n && n.videoId) {
              r({
                id: n.videoId,
                title: n.title?.runs?.[0]?.text || n.title?.simpleText || "YouTube 视频",
                channelTitle: n.ownerText?.runs?.[0]?.text || n.shortBylineText?.runs?.[0]?.text || n.longBylineText?.runs?.[0]?.text || "YouTube 频道",
                channelId: n.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || n.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: n.publishedTimeText?.simpleText || "",
                views: g(n.viewCountText?.simpleText || n.shortViewCountText?.simpleText),
                thumbnail: n.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${n.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${n.videoId}`
              });
              return;
            }
          }
          if (l.playlistVideoRenderer && !a(l.playlistVideoRenderer)) {
            const n = l.playlistVideoRenderer;
            if (n && n.videoId) {
              const T = n.videoInfo?.runs?.[0]?.text || "", b = n.videoInfo?.runs?.[2]?.text || n.videoInfo?.runs?.[1]?.text || "";
              r({
                id: n.videoId,
                title: n.title?.runs?.[0]?.text || n.title?.simpleText || "YouTube 视频",
                channelTitle: n.shortBylineText?.runs?.[0]?.text || n.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: n.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: b || n.lengthText?.simpleText || "",
                views: g(T),
                thumbnail: n.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${n.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${n.videoId}`
              });
              return;
            }
          }
          if (l.gridVideoRenderer && !a(l.gridVideoRenderer)) {
            const n = l.gridVideoRenderer;
            if (n && n.videoId) {
              r({
                id: n.videoId,
                title: n.title?.runs?.[0]?.text || n.title?.simpleText || "YouTube 视频",
                channelTitle: n.shortBylineText?.runs?.[0]?.text || n.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: n.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: n.publishedTimeText?.simpleText || "",
                views: g(n.viewCountText?.simpleText),
                thumbnail: n.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${n.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${n.videoId}`
              });
              return;
            }
          }
          if (l.compactVideoRenderer && !a(l.compactVideoRenderer)) {
            const n = l.compactVideoRenderer;
            if (n && n.videoId) {
              r({
                id: n.videoId,
                title: n.title?.runs?.[0]?.text || n.title?.simpleText || "YouTube 视频",
                channelTitle: n.shortBylineText?.runs?.[0]?.text || n.longBylineText?.runs?.[0]?.text || "YouTube 频道",
                channelId: n.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: n.publishedTimeText?.simpleText || "",
                views: g(n.viewCountText?.simpleText),
                thumbnail: n.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${n.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${n.videoId}`
              });
              return;
            }
          }
          if (l.continuationItemRenderer) {
            const n = l.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token || l.continuationItemRenderer?.continuationEndpoint?.browseEndpoint?.continuationCommand?.token;
            n && typeof n == "string" && t && (t.token = n);
          }
          for (const n of Object.keys(l))
            typeof l[n] == "object" && u(l[n], f + 1);
        }
      };
      return u(s.contents || s), o;
    } catch {
      return [];
    }
  }
  /**
   * 拉取当前 Edge 登录用户的专属 YouTube 首页推荐流（优先通过 InnerTube FEwhat_to_watch 官方算法流）
   */
  async fetchPersonalRecommendations(e, t = { token: "" }) {
    e?.throwIfAborted();
    let i = [];
    try {
      const o = await y({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { browseId: "FEwhat_to_watch" }
      }, e, 3500);
      e?.throwIfAborted(), i = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(o.data)};<\/script>`, t);
    } catch {
      e?.throwIfAborted();
    }
    if (!i.length) {
      let o;
      try {
        if (o = (await y({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/" }, e, 15e3)).html, typeof o != "string") throw new Error("Invalid homepage response");
      } catch {
        e?.throwIfAborted(), o = await U("https://www.youtube.com/", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        }, e);
      }
      e?.throwIfAborted(), i = this.extractVideosFromHtml(o, t);
    }
    const s = /* @__PURE__ */ new Set();
    for (let o = 0; o < 3 && i.length < 56 && t.token; o++) {
      e?.throwIfAborted();
      const c = t.token;
      if (s.has(c)) {
        t.token = "";
        break;
      }
      s.add(c);
      try {
        const r = await y({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { continuation: c }
        }, e);
        e?.throwIfAborted();
        const a = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(r.data)};<\/script>`, t);
        if (!a.length) {
          t.token = "";
          break;
        }
        for (const h of a) i.some((u) => u.id === h.id) || i.push(h);
      } catch {
        e?.throwIfAborted();
        break;
      }
    }
    return i;
  }
  async loadMoreExploreVideos(e = this.recommendationViewSignal) {
    if (e?.aborted || this.recommendationRead || !this.lastContinuationToken) return 0;
    const t = this.lastContinuationToken, i = this.beginRecommendationRead(e), s = { token: "" };
    m.updateState({ isLoadingMore: !0, error: "" });
    try {
      const o = await y({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: t }
      }, i.signal);
      if (!i.current()) return 0;
      const c = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(o.data)};<\/script>`, s), r = [...p.exploreVideos];
      for (const h of c) r.some((u) => u.id === h.id) || r.push(h);
      const a = r.length - p.exploreVideos.length;
      if (a) {
        if (await w({ logicweaver_youtube_explore_cache: r }), !i.current()) return 0;
        this.exploreCache.recommend = r, m.updateState({ exploreVideos: r });
      }
      return this.lastContinuationToken = s.token === t ? "" : s.token, a;
    } catch {
      return i.current() && m.updateState({ error: "追加推荐失败，当前列表保留；可手动重试。" }), 0;
    } finally {
      i.finish();
    }
  }
  /**
   * 同步当前账号在 YouTube 上的“我喜欢的视频 (Liked Videos)”列表
   */
  async syncYouTubeLikedVideos() {
    return this.syncFavoritePlaylist("LL", "YouTube 喜欢的视频");
  }
  async syncYouTubeWatchLater() {
    return this.syncFavoritePlaylist("WL", "稍后观看");
  }
  async syncFavoritePlaylist(e, t) {
    return this.mutateFavorites(async (i) => {
      let s = [];
      const o = e === "LL" ? "VLLL" : "VLWL";
      try {
        const a = await y({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { browseId: o }
        }, void 0, 8e3);
        if (a && a.data) {
          const h = { token: "" };
          if (s = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(a.data)};<\/script>`, h), h.token && s.length < 50)
            try {
              const u = await y({
                type: "fetchYouTubeInnerTube",
                endpoint: "browse",
                payload: { continuation: h.token }
              }, void 0, 6e3);
              if (u && u.data) {
                const l = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(u.data)};<\/script>`);
                for (const f of l)
                  s.some((n) => n.id === f.id) || s.push(f);
              }
            } catch {
            }
        }
      } catch {
      }
      if (!s.length) {
        let a = "";
        try {
          a = (await y({
            type: "fetchYouTubeHtml",
            url: `https://www.youtube.com/playlist?list=${e}`
          }, void 0, 12e3)).html || "";
        } catch {
          a = await U(`https://www.youtube.com/playlist?list=${e}`, {
            credentials: "include",
            headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
          }, void 0, 15e3);
        }
        a && (s = this.extractVideosFromHtml(a));
      }
      if (!s.length)
        throw new Error("未能识别到 YouTube 视频，请确认已在 Edge 登录 YouTube 账号，或该收藏列表中尚无视频");
      Object.assign(i, await R());
      let c = 0;
      const r = new Set(i.favorites.map((a) => a.id));
      for (const a of s)
        r.has(a.id) || (r.add(a.id), i.favorites.unshift({ ...a, group: t, savedAt: Date.now() }), c++);
      return i.groups.includes(t) || i.groups.push(t), c;
    }, (i) => `同步完成！已成功抓取 ${i} 个视频并存入「${t}」。`);
  }
  async mutateFavorites(e, t) {
    if (p.favoritesBusy) throw new Error("另一个收藏操作正在处理，请稍后再操作");
    if (p.favoritesNeedsReview) throw new Error("上次结果未确认，请先点击重读收藏");
    m.updateState({ favoritesBusy: !0, favoritesLoading: !1, favoriteMessage: "正在处理收藏，请勿重复提交…" }), ++this.favoriteReadVersion;
    let i = !1;
    try {
      const s = await R(), o = await e(s);
      return i = !0, await D(s), this.favorites = s.favorites.map((c) => ({ ...c })), this.favoritesLoaded = !0, m.updateState({
        favorites: this.favorites.map((c) => ({ ...c })),
        favGroups: [...s.groups],
        activeFavGroup: s.groups.includes(p.activeFavGroup) ? p.activeFavGroup : "全部",
        favoriteMessage: t(o)
      }), o;
    } catch (s) {
      throw this.favoritesLoaded = !1, m.updateState({
        favoritesNeedsReview: !0,
        favoriteMessage: i ? "收藏保存结果未确认，未自动重试。当前显示保留旧记录；请先重读收藏核对。" : `未提交收藏保存：${s instanceof Error ? s.message : "读取失败"}。请先重读收藏后再操作。`
      }), new Error("收藏操作未完成或保存结果未确认，请重读收藏核对");
    } finally {
      m.updateState({ favoritesBusy: !1 });
    }
  }
  async loadFavorites(e = !1) {
    if (p.favoritesBusy) return this.favorites.map((s) => ({ ...s }));
    if (this.favoritesLoaded && !e) return this.favorites.map((s) => ({ ...s }));
    if (this.favoriteRead && (await this.favoriteRead, !e))
      return this.favorites.map((s) => ({ ...s }));
    if (p.favoritesBusy) return this.favorites.map((s) => ({ ...s }));
    const t = ++this.favoriteReadVersion;
    m.updateState({ favoritesLoading: !0 });
    const i = (async () => {
      try {
        const s = await R();
        return t !== this.favoriteReadVersion ? this.favorites.map((o) => ({ ...o })) : (this.favorites = s.favorites, this.favoritesLoaded = !0, m.updateState({
          favorites: this.favorites.map((o) => ({ ...o })),
          favGroups: [...s.groups],
          ...e ? { favoritesNeedsReview: !1, favoriteMessage: "已重新读取收藏，请核对后再操作。" } : {}
        }), this.favorites.length === 0 && !this.hasAutoSynced && (this.hasAutoSynced = !0, this.syncYouTubeLikedVideos().catch(() => {
        })), this.favorites.map((o) => ({ ...o })));
      } catch {
        throw t === this.favoriteReadVersion && m.updateState({
          favoritesNeedsReview: !0,
          favoriteMessage: "收藏读取失败，未启用写入；请重试读取。"
        }), new Error("收藏读取失败");
      } finally {
        t === this.favoriteReadVersion && m.updateState({ favoritesLoading: !1 });
      }
    })();
    this.favoriteRead = i;
    try {
      return await i;
    } finally {
      this.favoriteRead === i && (this.favoriteRead = void 0);
    }
  }
  isFavorite(e) {
    return this.favorites.some((t) => t.id === e);
  }
  async toggleFavorite(e, t = "稍后观看") {
    const i = { ...e, group: t || "稍后观看", savedAt: Date.now() };
    if (this.favoritesLoaded || await this.loadFavorites(), !i.id || !i.title) throw new Error("视频信息不完整，未保存");
    const s = this.isFavorite(i.id);
    return this.mutateFavorites((o) => (s ? o.favorites = o.favorites.filter((c) => c.id !== i.id) : o.favorites.some((c) => c.id === i.id) || o.favorites.unshift(i), !s), (o) => o ? "已保存收藏并核对。" : "已移出本地收藏并核对。");
  }
  async removeFavorite(e) {
    await this.mutateFavorites((t) => {
      t.favorites = t.favorites.filter((i) => i.id !== e);
    }, () => "已移出本地收藏并核对。");
  }
  async addFavGroup(e) {
    const t = e.trim();
    t && await this.mutateFavorites((i) => {
      i.groups.includes(t) || i.groups.push(t);
    }, () => "收藏分组已保存并核对。");
  }
  async deleteFavGroup(e) {
    e === "全部" || e === "稍后观看" || await this.mutateFavorites((t) => {
      t.groups = t.groups.filter((i) => i !== e), t.favorites = t.favorites.map((i) => i.group === e ? { ...i, group: "稍后观看" } : i);
    }, () => "分组已删除，视频移入稍后观看；已核对保存。");
  }
  // -------------------------------------------------------------
  // 6. 📂 播放列表管理
  // -------------------------------------------------------------
  async loadPlaylists() {
    if (this.playlistsLoaded) return this.playlists;
    let t = (await E([v]))[v];
    const i = /* @__PURE__ */ new Set([
      "PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4",
      "PL9ooVrP1hQOFWk94Q4P_rF_X_wE2eXj1k"
    ]);
    return !Array.isArray(t) || t.length === 0 ? (t = j, await w({ [v]: t })) : (t = t.filter((s) => !i.has(s.id)), await w({ [v]: t })), this.playlists = t, this.playlistsLoaded = !0, m.updateState({
      playlists: this.playlists,
      activePlaylistId: this.playlists[0]?.id || ""
    }), this.playlists[0]?.id && this.fetchPlaylistVideos(this.playlists[0].id), this.playlists;
  }
  async addPlaylist(e, t) {
    await this.loadPlaylists();
    let i = e.trim();
    const s = i.match(/list=([a-zA-Z0-9_-]+)/);
    if (s && (i = s[1]), i = i.replace(/^VL/i, ""), !i || this.playlists.some((c) => c.id === i)) return !1;
    const o = {
      id: i,
      title: t?.trim() || `YouTube 播放列表 (${i.slice(0, 8)}...)`,
      thumbnail: `https://i.ytimg.com/vi/${i}/hqdefault.jpg`
    };
    return this.playlists.push(o), await w({ [v]: this.playlists }), m.updateState({ playlists: [...this.playlists], activePlaylistId: i }), this.fetchPlaylistVideos(i), !0;
  }
  async removePlaylist(e) {
    await this.loadPlaylists(), this.playlists = this.playlists.filter((i) => i.id !== e), await w({ [v]: this.playlists });
    const t = this.playlists[0]?.id || "";
    m.updateState({ playlists: [...this.playlists], activePlaylistId: t }), t ? this.fetchPlaylistVideos(t) : m.updateState({ playlistVideos: [] });
  }
  // -------------------------------------------------------------
  // 7. 搜索功能（优先通过官方 InnerTube 搜索，秒级返回真实结果）
  // -------------------------------------------------------------
  async search(e) {
    if (!e.trim()) return [];
    m.updateState({ isLoading: !0, error: "" });
    try {
      let t = null;
      try {
        t = await new Promise((c, r) => {
          chrome?.runtime?.sendMessage?.(
            {
              type: "fetchYouTubeInnerTube",
              endpoint: "search",
              payload: { query: e.trim() }
            },
            (a) => {
              a && a.ok && a.data ? c(a.data) : r(new Error(a?.error || "搜索接口未响应"));
            }
          );
        });
      } catch {
      }
      if (!t) {
        const o = `https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`, c = await fetch(o, {
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
        });
        if (!c.ok) throw new Error(`HTTP ${c.status}`);
        const a = (await c.text()).match(/ytInitialData\s*=\s*({.+?});<\/script>/);
        if (!a) throw new Error("未能从网页提取搜索结果");
        t = JSON.parse(a[1]);
      }
      const i = t.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [], s = [];
      return i.forEach((o) => {
        (o.itemSectionRenderer?.contents || []).forEach((r) => {
          const a = r.videoRenderer;
          a && a.videoId && s.push({
            id: a.videoId,
            title: a.title?.runs?.[0]?.text || "YouTube 视频",
            channelTitle: a.ownerText?.runs?.[0]?.text || "YouTube UP主",
            channelId: a.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
            publishedAt: a.publishedTimeText?.simpleText || "",
            views: g(a.viewCountText?.simpleText),
            thumbnail: a.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${a.videoId}/hqdefault.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${a.videoId}`
          });
        });
      }), m.updateState({ searchResults: s, isLoading: !1 }), s;
    } catch (t) {
      return m.updateState({
        searchResults: [],
        isLoading: !1,
        error: `搜索异常: ${t?.message || String(t)}`
      }), [];
    }
  }
  // -------------------------------------------------------------
  // 8. 全生命周期初始化与交互事件监听
  // -------------------------------------------------------------
  init() {
    this.initialized || (this.initialized = !0, m.onAction(async (e, t) => {
      try {
        switch (e) {
          case "refresh":
            p.currentView === "recommend" ? await this.loadRecommend(!0) : await this.loadFavorites(!0);
            break;
          case "switch-view":
            t === "favorites" && await this.loadFavorites();
            break;
          case "save-favorite":
            t && t.video && await this.toggleFavorite(t.video);
            break;
          case "remove-favorite":
            typeof t == "string" && await this.removeFavorite(t);
            break;
        }
      } catch {
      }
    }), this.loadFavorites().catch(() => {
    }), this.getCachedRecommendBatch().then((e) => {
      e && e.videos.length > 0 && p.exploreVideos.length === 0 && (m.updateState({
        exploreVideos: e.videos,
        userName: e.userName || "账号专属推荐"
      }), e.videos.forEach((t) => this.shownVideoIds.add(t.id)));
    }));
  }
}
const W = new z();
export {
  W as y
};
