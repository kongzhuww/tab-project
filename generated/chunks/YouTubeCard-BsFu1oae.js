import { d as _t, y as ot, D as Et, M as kt, f as x, g as a, u as m, C as E, t as g, e as pt, h as N, F as nt, i as at, m as yt, A as vt, E as bt, w as It, T as Vt, j as G, B as At, k as Rt, b as D, x as q, o as T, G as Lt } from "./vendor-vue-wIH4jcna.js";
import { u as Pt } from "./useCardActivity-Cz5XU8NA.js";
import { r as Yt, B as Ft, v as Nt } from "./view-styles-CHCK4VG2.js";
import { y as v, g as S } from "./youtube-store-B-17lcfy.js";
import { C as Mt } from "./ChatShareMenu-c15wh2M0.js";
import { _ as $t } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const W = "youtubeFavoritesV1", H = "youtubeFavGroupsV1";
async function Ut() {
  if (typeof chrome < "u" && chrome.storage?.local)
    return new Promise((e, t) => {
      chrome.storage.local.get([W, H], (i) => {
        chrome.runtime.lastError ? t(new Error("收藏存储读取失败")) : e(i);
      });
    });
  const p = {};
  for (const e of [W, H]) {
    const t = localStorage.getItem(e);
    t !== null && (p[e] = JSON.parse(t));
  }
  return p;
}
async function X() {
  const p = await Ut(), e = p[W] === void 0 ? [] : p[W], t = p[H] === void 0 ? ["全部", "稍后观看"] : p[H];
  if (!Array.isArray(e) || !e.every((i) => i && typeof i.id == "string" && typeof i.title == "string"))
    throw new Error("收藏数据格式异常，未覆盖原记录");
  if (!Array.isArray(t) || !t.every((i) => typeof i == "string")) throw new Error("收藏分组格式异常，未覆盖原记录");
  return { favorites: e.map((i) => ({ ...i })), groups: [...t] };
}
function tt(p) {
  return Array.isArray(p) ? p.map(tt) : p && typeof p == "object" ? Object.fromEntries(Object.keys(p).sort().filter((e) => p[e] !== void 0).map((e) => [e, tt(p[e])])) : p;
}
async function Bt(p) {
  const e = { [W]: p.favorites, [H]: p.groups };
  if (typeof chrome < "u" && chrome.storage?.local)
    await new Promise((i, n) => {
      chrome.storage.local.set(e, () => {
        chrome.runtime.lastError ? n(new Error("收藏保存结果未确认")) : i();
      });
    });
  else
    for (const [i, n] of Object.entries(e)) localStorage.setItem(i, JSON.stringify(n));
  const t = await X();
  if (JSON.stringify(tt(t)) !== JSON.stringify(tt(p))) throw new Error("收藏保存后的核对不一致，请重读确认");
}
async function R(p, e, t = 8e3) {
  return e?.throwIfAborted(), new Promise((i, n) => {
    let o = !1;
    const d = (s, b) => {
      o || (o = !0, clearTimeout(r), e?.removeEventListener("abort", l), s ? n(s) : i(b));
    }, l = () => d(new DOMException("Read cancelled", "AbortError")), r = setTimeout(() => d(new Error("YouTube read timeout")), t);
    if (e?.addEventListener("abort", l, { once: !0 }), e?.aborted) {
      l();
      return;
    }
    try {
      if (typeof chrome > "u" || !chrome.runtime?.sendMessage) throw new Error("Extension transport unavailable");
      chrome.runtime.sendMessage(p, (s) => {
        const b = chrome.runtime.lastError;
        o || (b || !s?.ok ? d(new Error("YouTube background read failed")) : d(void 0, s));
      });
    } catch {
      d(new Error("YouTube background transport unavailable"));
    }
  });
}
async function rt(p, e, t, i = 8e3) {
  t?.throwIfAborted();
  const n = new AbortController(), o = () => n.abort();
  t?.addEventListener("abort", o, { once: !0 });
  const d = setTimeout(o, i);
  try {
    const l = await fetch(p, { ...e, signal: n.signal });
    if (!l.ok) throw new Error(`HTTP ${l.status}`);
    const r = await l.text();
    return n.signal.throwIfAborted(), r;
  } finally {
    clearTimeout(d), t?.removeEventListener("abort", o);
  }
}
const z = "youtubeRssChannelsV1", Q = "youtubeCustomGroupsV1", lt = "youtubeRssVideosCacheV1", M = "youtubePlaylistsV1", ct = "youtubeRecommendBatchV1", Ot = 900 * 1e3, Gt = ["默认"], Dt = [];
function j(p) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(p, e);
    else {
      const t = {};
      p.forEach((i) => {
        try {
          const n = localStorage.getItem(i);
          n && (t[i] = JSON.parse(n));
        } catch {
        }
      }), e(t);
    }
  });
}
function k(p) {
  return new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.set(p, e) : (Object.entries(p).forEach(([t, i]) => {
      try {
        localStorage.setItem(t, JSON.stringify(i));
      } catch {
      }
    }), e());
  });
}
function wt(p) {
  if (!p) return 0;
  const e = new Date(p).getTime();
  if (!isNaN(e) && e > 0) return e;
  const t = Date.now(), i = String(p).match(/(\d+)\s*(秒|分|小时|天|周|月|年|second|minute|hour|day|week|month|year)/i);
  if (!i) return t - 864e5 * 30;
  const n = parseInt(i[1], 10), o = i[2].toLowerCase();
  return o.startsWith("秒") || o.startsWith("second") ? t - n * 1e3 : o.startsWith("分") || o.startsWith("minute") ? t - n * 60 * 1e3 : o.startsWith("小时") || o.startsWith("hour") ? t - n * 3600 * 1e3 : o.startsWith("天") || o.startsWith("day") ? t - n * 86400 * 1e3 : o.startsWith("周") || o.startsWith("week") ? t - n * 7 * 86400 * 1e3 : o.startsWith("月") || o.startsWith("month") ? t - n * 30 * 86400 * 1e3 : o.startsWith("年") || o.startsWith("year") ? t - n * 365 * 86400 * 1e3 : t - 864e5 * 30;
}
function gt(p) {
  if (!p) return "";
  if (typeof p == "string" && (p.includes("前") || p.includes("ago") || p.includes("Streamed") || p.includes("Premiered")))
    return p;
  const e = new Date(p).getTime();
  if (!e || isNaN(e)) return String(p);
  const t = Math.max(1, Math.floor((Date.now() - e) / 6e4));
  if (t < 60) return `${t} 分钟前`;
  const i = Math.floor(t / 60);
  if (i < 24) return `${i} 小时前`;
  const n = Math.floor(i / 24);
  return n < 30 ? `${n} 天前` : new Date(e).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}
function Y(p) {
  if (!p) return "";
  const e = typeof p == "number" ? p : parseInt(String(p).replace(/,/g, ""), 10);
  return isNaN(e) ? String(p) : e >= 1e8 ? `${(e / 1e8).toFixed(1)}亿次观看` : e >= 1e4 ? `${(e / 1e4).toFixed(1)}万次观看` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k次观看` : `${e}次观看`;
}
class qt {
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
    const n = () => i === this.recommendGeneration && !t.signal.aborted, o = () => {
      t.abort(), i === this.recommendGeneration && v.updateState({ isLoading: !1, isLoadingMore: !1 });
    };
    e?.addEventListener("abort", o, { once: !0 });
    const d = setTimeout(() => {
      i === this.recommendGeneration && v.updateState({ error: "推荐读取超时，请手动刷新。" }), o();
    }, 45e3);
    return {
      signal: t.signal,
      current: n,
      finish: () => {
        clearTimeout(d), e?.removeEventListener("abort", o), i === this.recommendGeneration && (this.recommendationRead = null, v.updateState({ isLoading: !1, isLoadingMore: !1 }));
      }
    };
  }
  // -------------------------------------------------------------
  // 1. 频道与分组管理
  // -------------------------------------------------------------
  async loadGroups() {
    if (this.groupsLoaded) return this.groups;
    const e = await j([Q]), t = (Array.isArray(e[Q]) ? e[Q] : []).filter((o) => o !== "ASMR·癒し" && o !== "AI与前沿"), i = this.channels.map((o) => o.group || "默认"), n = /* @__PURE__ */ new Set([...Gt, ...i, ...t]);
    return this.groups = Array.from(n).filter(Boolean), this.groupsLoaded = !0, v.updateState({ groups: this.groups }), this.groups;
  }
  async saveGroups(e) {
    e && (this.groups = e), await k({ [Q]: this.groups }), v.updateState({ groups: this.groups });
  }
  async loadChannels() {
    if (this.channelsLoaded) return this.channels;
    let t = (await j([z]))[z];
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
    !Array.isArray(t) || t.length === 0 ? (t = [], await k({ [z]: t })) : (t = t.filter((o) => !i.has(o.id)), await k({ [z]: t })), this.channels = t, this.channelsLoaded = !0;
    const n = this.channels.map((o) => ({
      id: o.id,
      title: o.name,
      handle: o.handle,
      group: o.group || "默认",
      thumbnail: o.thumbnail
    }));
    return v.updateState({ channels: n }), await this.loadGroups(), this.channels;
  }
  async saveChannels(e) {
    e && (this.channels = e), await k({ [z]: this.channels });
    const t = this.channels.map((i) => ({
      id: i.id,
      title: i.name,
      handle: i.handle,
      group: i.group || "默认",
      thumbnail: i.thumbnail
    }));
    v.updateState({ channels: t }), await this.loadGroups();
  }
  async addChannel(e) {
    await this.loadChannels();
    let t = "", i = "", n = "默认", o = "";
    if (typeof e == "string" ? t = e.trim() : (t = e.id.trim(), i = e.name?.trim() || "", n = e.group?.trim() || "默认", o = e.handle?.trim() || ""), t.includes("@") || t.startsWith("http"))
      try {
        const l = t.match(/@([a-zA-Z0-9_.-]+)/);
        l && (o = `@${l[1]}`);
        const r = o ? `https://www.youtube.com/${o}` : t, b = (await new Promise((c) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: r }, c);
        }))?.html || "", h = b.match(/channel_id=(UC[a-zA-Z0-9_-]+)/) || b.match(/"channelId":"(UC[a-zA-Z0-9_-]+)"/);
        h && (t = h[1]);
        const w = b.match(/<title>(.*?) - YouTube<\/title>/i) || b.match(/<title>(.*?)<\/title>/i);
        w && !i && (i = w[1].trim());
      } catch {
      }
    return t.startsWith("UC") ? (i || (i = o || t), this.channels.some((l) => l.id === t) ? !1 : (this.channels.push({ id: t, name: i, group: n, handle: o }), await this.saveChannels(), !0)) : !1;
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
    v.updateState({ isLoading: !0, error: "" });
    try {
      let e = "";
      try {
        e = await new Promise((r, s) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/feed/channels" }, (b) => {
            b && b.ok && b.html ? r(b.html) : s(new Error(b?.error || "后台请求失败"));
          });
        });
      } catch {
        const r = await fetch("https://www.youtube.com/feed/channels", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        e = await r.text();
      }
      const t = e.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) || e.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
      if (!t) throw new Error("未能获取频道列表，请确保已在当前浏览器登录 YouTube");
      const i = JSON.parse(t[1]), n = [], o = /* @__PURE__ */ new Set(), d = (r) => {
        if (!(!r || typeof r != "object")) {
          if (r.channelRenderer) {
            const s = r.channelRenderer, b = s.channelId, h = s.title?.simpleText || s.title?.runs?.[0]?.text;
            b && h && !o.has(b) && (o.add(b), n.push({
              id: b,
              name: h,
              group: "YouTube 关注",
              thumbnail: s.thumbnail?.thumbnails?.[0]?.url
            }));
          }
          for (const s of Object.keys(r)) d(r[s]);
        }
      };
      if (d(i), n.length === 0)
        throw new Error("未解析到关注频道，请确认是否已登录 YouTube");
      await this.loadChannels();
      let l = 0;
      for (const r of n)
        this.channels.some((s) => s.id === r.id) || (this.channels.push(r), l++);
      return await this.saveChannels(), await this.loadUpdates(!0), l;
    } catch (e) {
      throw v.updateState({ isLoading: !1, error: e?.message || "同步关注频道失败" }), e;
    }
  }
  parseOpml(e) {
    const t = new DOMParser().parseFromString(e, "application/xml"), i = Array.from(t.querySelectorAll("outline[xmlUrl], outline[xmlurl]")), n = [];
    return i.forEach((o) => {
      const l = (o.getAttribute("xmlUrl") || o.getAttribute("xmlurl") || "").match(/channel_id=([a-zA-Z0-9_-]+)/);
      if (l) {
        const r = l[1], s = (o.getAttribute("title") || o.getAttribute("text") || "YouTube 频道").trim();
        n.push({ id: r, name: s, group: "导入" });
      }
    }), n;
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
    const n = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(e)}`;
    try {
      let o = "";
      try {
        if (o = (await R({ type: "fetchYouTubeHtml", url: n }, i)).html, typeof o != "string") throw new Error("Invalid RSS response");
      } catch {
        i?.throwIfAborted(), o = await rt(n, { cache: "no-store", referrerPolicy: "no-referrer" }, i, 6e3);
      }
      return i?.throwIfAborted(), this.parseRssXml(o, t, e);
    } catch {
      return i?.throwIfAborted(), [];
    }
  }
  async fetchPlaylistVideos(e) {
    const t = e.replace(/^https?:\/\/.*?list=/i, "").replace(/^VL/i, "").trim(), i = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(t)}`, n = new AbortController(), o = setTimeout(() => n.abort(), 8e3);
    try {
      const d = await fetch(i, { signal: n.signal, cache: "no-store", referrerPolicy: "no-referrer" });
      if (clearTimeout(o), !d.ok) throw new Error(`HTTP ${d.status}`);
      const l = await d.text(), r = this.parseRssXml(l, "播放列表");
      return v.updateState({ playlistVideos: r, activePlaylistId: t }), r;
    } finally {
      clearTimeout(o);
    }
  }
  parseRssXml(e, t = "YouTube", i = "") {
    const n = new DOMParser().parseFromString(e, "application/xml"), o = n.querySelector("feed > title")?.textContent || t;
    return Array.from(n.querySelectorAll("entry")).map((l) => {
      const r = l.getElementsByTagNameNS("http://www.youtube.com/xml/schemas/2015", "videoId")[0]?.textContent || l.querySelector("videoId")?.textContent || (l.querySelector("id")?.textContent || "").replace(/^yt:video:/, ""), s = l.querySelector("title")?.textContent || "YouTube 视频", b = l.querySelector("author > name")?.textContent || o, h = l.querySelector("published")?.textContent || "", w = l.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "group")[0] || l.querySelector("group"), A = (w?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0] || w?.querySelector("thumbnail"))?.getAttribute("url") || (r ? `https://i.ytimg.com/vi/${r}/hqdefault.jpg` : ""), C = w?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "statistics")[0]?.getAttribute("views") || "";
      return {
        id: r,
        title: s,
        channelTitle: b,
        channelId: i || l.querySelector("channelId")?.textContent || "",
        publishedAt: gt(h),
        thumbnail: A,
        views: Y(C),
        videoUrl: `https://www.youtube.com/watch?v=${r}`
      };
    }).filter((l) => l.id && !/^Deleted video$|^Private video$/i.test(l.title));
  }
  // -------------------------------------------------------------
  // 3. 订阅更新流
  // -------------------------------------------------------------
  async loadUpdates(e = !1) {
    if (await this.loadChannels(), v.updateState({ isLoading: !0, error: "" }), !e) {
      const t = (await j([lt]))[lt];
      if (t?.items?.length && Date.now() - Number(t.savedAt || 0) < Ot) {
        const i = t.items.map((n) => ({
          id: n.videoId,
          title: n.title,
          channelTitle: n.channel,
          channelId: n.channelId,
          publishedAt: gt(n.publishedAt),
          views: n.views,
          thumbnail: n.thumbnail,
          group: n.group,
          videoUrl: `https://www.youtube.com/watch?v=${n.videoId}`
        }));
        return v.updateState({
          videos: i,
          isLoading: !1,
          userName: `已订阅 ${this.channels.length} 个频道`
        }), i;
      }
    }
    if (!this.channels.length)
      return v.updateState({ videos: [], isLoading: !1 }), [];
    try {
      const i = [];
      for (let l = 0; l < this.channels.length; l += 5) {
        const r = this.channels.slice(l, l + 5), s = await Promise.all(
          r.map(async (b) => {
            try {
              return (await this.fetchChannelVideosFromRss(b.id, b.name)).map((w) => ({ ...w, group: b.group || "默认" }));
            } catch {
              return [];
            }
          })
        );
        i.push(...s);
      }
      const n = /* @__PURE__ */ new Set(), o = [];
      i.flat().forEach((l) => {
        l?.id && !n.has(l.id) && (n.add(l.id), o.push(l));
      }), o.sort((l, r) => {
        const s = wt(l.publishedAt);
        return wt(r.publishedAt) - s;
      });
      const d = o.slice(0, 60);
      return d.length > 0 && await k({
        [lt]: {
          savedAt: Date.now(),
          items: d.map((l) => ({
            videoId: l.id,
            title: l.title,
            channel: l.channelTitle,
            channelId: l.channelId || "",
            publishedAt: l.publishedAt,
            views: l.views,
            thumbnail: l.thumbnail,
            group: l.group
          }))
        }
      }), v.updateState({
        videos: d,
        isLoading: !1,
        userName: `已订阅 ${this.channels.length} 个频道`
      }), d;
    } catch (t) {
      return v.updateState({
        isLoading: !1,
        error: t.message || "拉取视频动态失败"
      }), [];
    }
  }
  async getCachedRecommendBatch() {
    try {
      const t = (await j([ct]))[ct];
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
        await k({ [ct]: i });
      } catch {
      }
  }
  async loadRecommend(e = !1, t = this.recommendationViewSignal) {
    if (t?.aborted) return [];
    const i = this.beginRecommendationRead(t), n = i.current;
    try {
      if (!e && S.exploreVideos.length > 0)
        return S.exploreVideos;
      if (!e) {
        const d = await this.getCachedRecommendBatch();
        if (d && d.videos.length > 0)
          return v.updateState({
            exploreVideos: d.videos,
            isLoading: !1,
            error: "",
            userName: d.userName || "账号专属推荐",
            currentPage: 1
          }), d.videos.forEach((l) => this.shownVideoIds.add(l.id)), d.videos;
      }
      if (this.recommendPool.length >= this.RECOMMEND_PAGE_SIZE) {
        const d = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
        return d.forEach((l) => this.shownVideoIds.add(l.id)), v.updateState({
          exploreVideos: d,
          isLoading: !1,
          error: "",
          userName: "账号专属推荐 · 换一批",
          currentPage: 1
        }), this.saveCachedRecommendBatch(d, "账号专属推荐 · 换一批"), this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken && this.fetchContinuationVideos(this.lastContinuationToken), d;
      }
      if (v.updateState({ isLoading: !0, error: "" }), this.lastContinuationToken)
        try {
          const d = await this.fetchContinuationVideos(this.lastContinuationToken, i.signal);
          if (n())
            for (const l of d)
              !this.shownVideoIds.has(l.id) && !this.recommendPool.some((r) => r.id === l.id) && this.recommendPool.push(l);
        } catch {
        }
      if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE) {
        const d = { token: "" }, l = await this.fetchPersonalRecommendations(i.signal, d);
        if (!n()) return [];
        this.lastContinuationToken = d.token;
        const r = l.filter((b) => !this.shownVideoIds.has(b.id)), s = r.length >= 10 ? r : l;
        s === l && this.shownVideoIds.clear();
        for (const b of s)
          this.recommendPool.some((h) => h.id === b.id) || this.recommendPool.push(b);
      }
      if (!n()) return [];
      const o = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
      return o.forEach((d) => this.shownVideoIds.add(d.id)), o.length === 0 ? (v.updateState({
        isLoading: !1,
        error: "未获取到推荐视频，请检查网络或 YouTube 登录状态。",
        userName: "暂无推荐"
      }), []) : (v.updateState({
        exploreVideos: o,
        isLoading: !1,
        error: "",
        userName: "账号专属推荐",
        currentPage: 1
      }), this.saveCachedRecommendBatch(o, "账号专属推荐"), this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken && this.fetchContinuationVideos(this.lastContinuationToken), o);
    } catch {
      return n() && v.updateState({
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
      const n = await R({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: e }
      }, t, 4500), o = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(n.data)};<\/script>`, i);
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
      const n = JSON.parse(i[1]), o = [], d = /* @__PURE__ */ new Set(), l = (h) => {
        !h || !h.id || d.has(h.id) || (d.add(h.id), o.push(h));
      }, r = (h) => {
        if (!h || typeof h != "object") return !1;
        if (h.adSlotRenderer || h.inFeedAdLayoutRenderer || h.promotedSparklesWebRenderer || h.promotedVideoRenderer || h.statementBannerRenderer || h.adBreakRenderer) return !0;
        const w = JSON.stringify(
          h.badges || h.badge || h.navigationEndpoint || h.contentType || h.layoutType || ""
        ).toLowerCase();
        return !!(w.includes("sponsored") || w.includes("广告") || w.includes("赞助") || w.includes("promoted"));
      }, s = (h) => {
        if (!h || r(h)) return null;
        const w = h.contentId || h.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId;
        if (!w || typeof w != "string" || w.length < 8) return null;
        const c = h.metadata?.lockupMetadataViewModel, A = c?.title?.content || c?.title?.runs?.[0]?.text || c?.title?.simpleText || h.contentImage?.thumbnailViewModel?.image?.accessibilityText || "YouTube 视频";
        let C = "", I = "", J = "";
        const F = c?.metadata?.contentMetadataViewModel?.metadataRows;
        if (Array.isArray(F)) {
          const U = F[0]?.metadataParts;
          Array.isArray(U) && U[0]?.text?.content && (C = U[0].text.content);
          const _ = F[1]?.metadataParts;
          Array.isArray(_) && (_[0]?.text?.content && (I = _[0].text.content), _[1]?.text?.content && (J = _[1].text.content));
        }
        let P = `https://i.ytimg.com/vi/${w}/hqdefault.jpg`;
        const $ = h.contentImage?.thumbnailViewModel?.image?.sources;
        return Array.isArray($) && $.length > 0 && (P = $.slice(-1)[0]?.url || P), {
          id: w,
          title: A,
          channelTitle: C || "YouTube",
          publishedAt: J,
          views: Y(I),
          thumbnail: P,
          videoUrl: `https://www.youtube.com/watch?v=${w}`
        };
      }, b = (h, w = 0) => {
        if (!(!h || typeof h != "object" || w > 24 || o.length >= 80) && !r(h)) {
          if (h.lockupViewModel) {
            l(s(h.lockupViewModel));
            return;
          }
          if (h.videoRenderer && !r(h.videoRenderer)) {
            const c = h.videoRenderer;
            if (c && c.videoId) {
              l({
                id: c.videoId,
                title: c.title?.runs?.[0]?.text || c.title?.simpleText || "YouTube 视频",
                channelTitle: c.ownerText?.runs?.[0]?.text || c.shortBylineText?.runs?.[0]?.text || c.longBylineText?.runs?.[0]?.text || "YouTube 频道",
                channelId: c.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || c.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: c.publishedTimeText?.simpleText || "",
                views: Y(c.viewCountText?.simpleText || c.shortViewCountText?.simpleText),
                thumbnail: c.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${c.videoId}`
              });
              return;
            }
          }
          if (h.playlistVideoRenderer && !r(h.playlistVideoRenderer)) {
            const c = h.playlistVideoRenderer;
            if (c && c.videoId) {
              const A = c.videoInfo?.runs?.[0]?.text || "", C = c.videoInfo?.runs?.[2]?.text || c.videoInfo?.runs?.[1]?.text || "";
              l({
                id: c.videoId,
                title: c.title?.runs?.[0]?.text || c.title?.simpleText || "YouTube 视频",
                channelTitle: c.shortBylineText?.runs?.[0]?.text || c.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: c.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: C || c.lengthText?.simpleText || "",
                views: Y(A),
                thumbnail: c.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${c.videoId}`
              });
              return;
            }
          }
          if (h.gridVideoRenderer && !r(h.gridVideoRenderer)) {
            const c = h.gridVideoRenderer;
            if (c && c.videoId) {
              l({
                id: c.videoId,
                title: c.title?.runs?.[0]?.text || c.title?.simpleText || "YouTube 视频",
                channelTitle: c.shortBylineText?.runs?.[0]?.text || c.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: c.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: c.publishedTimeText?.simpleText || "",
                views: Y(c.viewCountText?.simpleText),
                thumbnail: c.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${c.videoId}`
              });
              return;
            }
          }
          if (h.compactVideoRenderer && !r(h.compactVideoRenderer)) {
            const c = h.compactVideoRenderer;
            if (c && c.videoId) {
              l({
                id: c.videoId,
                title: c.title?.runs?.[0]?.text || c.title?.simpleText || "YouTube 视频",
                channelTitle: c.shortBylineText?.runs?.[0]?.text || c.longBylineText?.runs?.[0]?.text || "YouTube 频道",
                channelId: c.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: c.publishedTimeText?.simpleText || "",
                views: Y(c.viewCountText?.simpleText),
                thumbnail: c.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${c.videoId}`
              });
              return;
            }
          }
          if (h.continuationItemRenderer) {
            const c = h.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token || h.continuationItemRenderer?.continuationEndpoint?.browseEndpoint?.continuationCommand?.token;
            c && typeof c == "string" && t && (t.token = c);
          }
          for (const c of Object.keys(h))
            typeof h[c] == "object" && b(h[c], w + 1);
        }
      };
      return b(n.contents || n), o;
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
      const o = await R({
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
        if (o = (await R({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/" }, e, 15e3)).html, typeof o != "string") throw new Error("Invalid homepage response");
      } catch {
        e?.throwIfAborted(), o = await rt("https://www.youtube.com/", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        }, e);
      }
      e?.throwIfAborted(), i = this.extractVideosFromHtml(o, t);
    }
    const n = /* @__PURE__ */ new Set();
    for (let o = 0; o < 3 && i.length < 56 && t.token; o++) {
      e?.throwIfAborted();
      const d = t.token;
      if (n.has(d)) {
        t.token = "";
        break;
      }
      n.add(d);
      try {
        const l = await R({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { continuation: d }
        }, e);
        e?.throwIfAborted();
        const r = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(l.data)};<\/script>`, t);
        if (!r.length) {
          t.token = "";
          break;
        }
        for (const s of r) i.some((b) => b.id === s.id) || i.push(s);
      } catch {
        e?.throwIfAborted();
        break;
      }
    }
    return i;
  }
  async loadMoreExploreVideos(e = this.recommendationViewSignal) {
    if (e?.aborted || this.recommendationRead || !this.lastContinuationToken) return 0;
    const t = this.lastContinuationToken, i = this.beginRecommendationRead(e), n = { token: "" };
    v.updateState({ isLoadingMore: !0, error: "" });
    try {
      const o = await R({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: t }
      }, i.signal);
      if (!i.current()) return 0;
      const d = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(o.data)};<\/script>`, n), l = [...S.exploreVideos];
      for (const s of d) l.some((b) => b.id === s.id) || l.push(s);
      const r = l.length - S.exploreVideos.length;
      if (r) {
        if (await k({ logicweaver_youtube_explore_cache: l }), !i.current()) return 0;
        this.exploreCache.recommend = l, v.updateState({ exploreVideos: l });
      }
      return this.lastContinuationToken = n.token === t ? "" : n.token, r;
    } catch {
      return i.current() && v.updateState({ error: "追加推荐失败，当前列表保留；可手动重试。" }), 0;
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
      let n = [];
      const o = e === "LL" ? "VLLL" : "VLWL";
      try {
        const r = await R({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { browseId: o }
        }, void 0, 8e3);
        if (r && r.data) {
          const s = { token: "" };
          if (n = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(r.data)};<\/script>`, s), s.token && n.length < 50)
            try {
              const b = await R({
                type: "fetchYouTubeInnerTube",
                endpoint: "browse",
                payload: { continuation: s.token }
              }, void 0, 6e3);
              if (b && b.data) {
                const h = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(b.data)};<\/script>`);
                for (const w of h)
                  n.some((c) => c.id === w.id) || n.push(w);
              }
            } catch {
            }
        }
      } catch {
      }
      if (!n.length) {
        let r = "";
        try {
          r = (await R({
            type: "fetchYouTubeHtml",
            url: `https://www.youtube.com/playlist?list=${e}`
          }, void 0, 12e3)).html || "";
        } catch {
          r = await rt(`https://www.youtube.com/playlist?list=${e}`, {
            credentials: "include",
            headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
          }, void 0, 15e3);
        }
        r && (n = this.extractVideosFromHtml(r));
      }
      if (!n.length)
        throw new Error("未能识别到 YouTube 视频，请确认已在 Edge 登录 YouTube 账号，或该收藏列表中尚无视频");
      Object.assign(i, await X());
      let d = 0;
      const l = new Set(i.favorites.map((r) => r.id));
      for (const r of n)
        l.has(r.id) || (l.add(r.id), i.favorites.unshift({ ...r, group: t, savedAt: Date.now() }), d++);
      return i.groups.includes(t) || i.groups.push(t), d;
    }, (i) => `同步完成！已成功抓取 ${i} 个视频并存入「${t}」。`);
  }
  async mutateFavorites(e, t) {
    if (S.favoritesBusy) throw new Error("另一个收藏操作正在处理，请稍后再操作");
    if (S.favoritesNeedsReview) throw new Error("上次结果未确认，请先点击重读收藏");
    v.updateState({ favoritesBusy: !0, favoritesLoading: !1, favoriteMessage: "正在处理收藏，请勿重复提交…" }), ++this.favoriteReadVersion;
    let i = !1;
    try {
      const n = await X(), o = await e(n);
      return i = !0, await Bt(n), this.favorites = n.favorites.map((d) => ({ ...d })), this.favoritesLoaded = !0, v.updateState({
        favorites: this.favorites.map((d) => ({ ...d })),
        favGroups: [...n.groups],
        activeFavGroup: n.groups.includes(S.activeFavGroup) ? S.activeFavGroup : "全部",
        favoriteMessage: t(o)
      }), o;
    } catch (n) {
      throw this.favoritesLoaded = !1, v.updateState({
        favoritesNeedsReview: !0,
        favoriteMessage: i ? "收藏保存结果未确认，未自动重试。当前显示保留旧记录；请先重读收藏核对。" : `未提交收藏保存：${n instanceof Error ? n.message : "读取失败"}。请先重读收藏后再操作。`
      }), new Error("收藏操作未完成或保存结果未确认，请重读收藏核对");
    } finally {
      v.updateState({ favoritesBusy: !1 });
    }
  }
  async loadFavorites(e = !1) {
    if (S.favoritesBusy) return this.favorites.map((n) => ({ ...n }));
    if (this.favoritesLoaded && !e) return this.favorites.map((n) => ({ ...n }));
    if (this.favoriteRead && (await this.favoriteRead, !e))
      return this.favorites.map((n) => ({ ...n }));
    if (S.favoritesBusy) return this.favorites.map((n) => ({ ...n }));
    const t = ++this.favoriteReadVersion;
    v.updateState({ favoritesLoading: !0 });
    const i = (async () => {
      try {
        const n = await X();
        return t !== this.favoriteReadVersion ? this.favorites.map((o) => ({ ...o })) : (this.favorites = n.favorites, this.favoritesLoaded = !0, v.updateState({
          favorites: this.favorites.map((o) => ({ ...o })),
          favGroups: [...n.groups],
          ...e ? { favoritesNeedsReview: !1, favoriteMessage: "已重新读取收藏，请核对后再操作。" } : {}
        }), this.favorites.length === 0 && !this.hasAutoSynced && (this.hasAutoSynced = !0, this.syncYouTubeLikedVideos().catch(() => {
        })), this.favorites.map((o) => ({ ...o })));
      } catch {
        throw t === this.favoriteReadVersion && v.updateState({
          favoritesNeedsReview: !0,
          favoriteMessage: "收藏读取失败，未启用写入；请重试读取。"
        }), new Error("收藏读取失败");
      } finally {
        t === this.favoriteReadVersion && v.updateState({ favoritesLoading: !1 });
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
    const n = this.isFavorite(i.id);
    return this.mutateFavorites((o) => (n ? o.favorites = o.favorites.filter((d) => d.id !== i.id) : o.favorites.some((d) => d.id === i.id) || o.favorites.unshift(i), !n), (o) => o ? "已保存收藏并核对。" : "已移出本地收藏并核对。");
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
    let t = (await j([M]))[M];
    const i = /* @__PURE__ */ new Set([
      "PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4",
      "PL9ooVrP1hQOFWk94Q4P_rF_X_wE2eXj1k"
    ]);
    return !Array.isArray(t) || t.length === 0 ? (t = Dt, await k({ [M]: t })) : (t = t.filter((n) => !i.has(n.id)), await k({ [M]: t })), this.playlists = t, this.playlistsLoaded = !0, v.updateState({
      playlists: this.playlists,
      activePlaylistId: this.playlists[0]?.id || ""
    }), this.playlists[0]?.id && this.fetchPlaylistVideos(this.playlists[0].id), this.playlists;
  }
  async addPlaylist(e, t) {
    await this.loadPlaylists();
    let i = e.trim();
    const n = i.match(/list=([a-zA-Z0-9_-]+)/);
    if (n && (i = n[1]), i = i.replace(/^VL/i, ""), !i || this.playlists.some((d) => d.id === i)) return !1;
    const o = {
      id: i,
      title: t?.trim() || `YouTube 播放列表 (${i.slice(0, 8)}...)`,
      thumbnail: `https://i.ytimg.com/vi/${i}/hqdefault.jpg`
    };
    return this.playlists.push(o), await k({ [M]: this.playlists }), v.updateState({ playlists: [...this.playlists], activePlaylistId: i }), this.fetchPlaylistVideos(i), !0;
  }
  async removePlaylist(e) {
    await this.loadPlaylists(), this.playlists = this.playlists.filter((i) => i.id !== e), await k({ [M]: this.playlists });
    const t = this.playlists[0]?.id || "";
    v.updateState({ playlists: [...this.playlists], activePlaylistId: t }), t ? this.fetchPlaylistVideos(t) : v.updateState({ playlistVideos: [] });
  }
  // -------------------------------------------------------------
  // 7. 搜索功能（优先通过官方 InnerTube 搜索，秒级返回真实结果）
  // -------------------------------------------------------------
  async search(e) {
    if (!e.trim()) return [];
    v.updateState({ isLoading: !0, error: "" });
    try {
      let t = null;
      try {
        t = await new Promise((d, l) => {
          chrome?.runtime?.sendMessage?.(
            {
              type: "fetchYouTubeInnerTube",
              endpoint: "search",
              payload: { query: e.trim() }
            },
            (r) => {
              r && r.ok && r.data ? d(r.data) : l(new Error(r?.error || "搜索接口未响应"));
            }
          );
        });
      } catch {
      }
      if (!t) {
        const o = `https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`, d = await fetch(o, {
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
        });
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        const r = (await d.text()).match(/ytInitialData\s*=\s*({.+?});<\/script>/);
        if (!r) throw new Error("未能从网页提取搜索结果");
        t = JSON.parse(r[1]);
      }
      const i = t.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [], n = [];
      return i.forEach((o) => {
        (o.itemSectionRenderer?.contents || []).forEach((l) => {
          const r = l.videoRenderer;
          r && r.videoId && n.push({
            id: r.videoId,
            title: r.title?.runs?.[0]?.text || "YouTube 视频",
            channelTitle: r.ownerText?.runs?.[0]?.text || "YouTube UP主",
            channelId: r.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
            publishedAt: r.publishedTimeText?.simpleText || "",
            views: Y(r.viewCountText?.simpleText),
            thumbnail: r.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${r.videoId}/hqdefault.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${r.videoId}`
          });
        });
      }), v.updateState({ searchResults: n, isLoading: !1 }), n;
    } catch (t) {
      return v.updateState({
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
    this.initialized || (this.initialized = !0, v.onAction(async (e, t) => {
      try {
        switch (e) {
          case "refresh":
            S.currentView === "recommend" ? await this.loadRecommend(!0) : await this.loadFavorites(!0);
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
      e && e.videos.length > 0 && S.exploreVideos.length === 0 && (v.updateState({
        exploreVideos: e.videos,
        userName: e.userName || "账号专属推荐"
      }), e.videos.forEach((t) => this.shownVideoIds.add(t.id)));
    }));
  }
}
const L = new qt(), zt = ["inert"], jt = { class: "card-head" }, Wt = {
  id: "youtube-view-tabs",
  class: "youtube-view-tabs",
  role: "tablist",
  "aria-label": "YouTube 视图"
}, Ht = ["aria-selected"], Jt = ["aria-selected"], Zt = {
  id: "youtube-user",
  class: "muted small"
}, Kt = ["title"], Qt = { class: "yt-settings-anchor" }, Xt = ["aria-expanded"], te = { class: "yt-layout-body" }, ee = { class: "yt-sidebar" }, ie = { class: "yt-sidebar-nav-group" }, se = { class: "yt-nav-btn-main" }, oe = { class: "yt-nav-btn-text" }, ne = {
  class: "yt-sidebar-group-list",
  "aria-label": "收藏分组"
}, ae = { class: "yt-group-count" }, re = { class: "yt-group-count" }, le = ["onClick"], ce = { class: "yt-group-name" }, ue = { class: "yt-group-count" }, de = ["onClick"], he = { class: "yt-sidebar-footer" }, fe = ["disabled"], me = { class: "yt-main-content" }, pe = { id: "youtube-recommend-pane" }, ye = {
  key: 0,
  class: "muted small yt-loading-box"
}, ve = {
  key: 1,
  class: "yt-error-box"
}, be = {
  key: 2,
  class: "muted small yt-empty"
}, we = { key: 3 }, ge = { class: "yt-video-grid" }, Te = ["onClick", "onContextmenu"], xe = { class: "yt-thumb-wrap" }, Ce = ["src", "alt"], Se = ["disabled", "title", "onClick"], _e = { class: "yt-fav-icon" }, Ee = { class: "yt-fav-text" }, ke = {
  key: 0,
  class: "yt-badge"
}, Ie = { class: "yt-info" }, Ve = ["title"], Ae = { class: "yt-meta-row" }, Re = ["title"], Le = { class: "yt-time" }, Pe = { class: "yt-next-batch-container" }, Ye = ["disabled"], Fe = { class: "yt-next-batch-text" }, Ne = { id: "youtube-favorites-pane" }, Me = { class: "yt-fav-toolbar" }, $e = { class: "yt-fav-hint" }, Ue = { class: "yt-fav-cur-group" }, Be = { class: "muted small" }, Oe = { class: "yt-sync-actions" }, Ge = ["disabled"], De = {
  key: 0,
  class: "muted small yt-loading-box"
}, qe = {
  key: 1,
  class: "muted small yt-empty yt-empty-fav"
}, ze = ["disabled"], je = {
  key: 2,
  class: "yt-video-grid"
}, We = ["onClick", "onContextmenu"], He = { class: "yt-thumb-wrap" }, Je = ["src", "alt"], Ze = ["disabled", "onClick"], Ke = {
  key: 0,
  class: "yt-badge"
}, Qe = { class: "yt-info" }, Xe = ["title"], ti = { class: "yt-meta-row" }, ei = ["title"], ii = { class: "yt-right-meta" }, si = { class: "yt-time" }, oi = ["disabled", "onClick"], ni = {
  key: 3,
  class: "yt-pagination"
}, ai = ["disabled"], ri = ["disabled"], li = {
  key: 0,
  class: "yt-toast"
}, ci = { class: "menu-head" }, ui = /* @__PURE__ */ _t({
  __name: "YouTubeCard",
  setup(p) {
    const e = Lt(() => import("./YouTubeSettingsPanel-Bx3_J54I.js")), t = D(!1), i = D(!1);
    ot(t, (f) => {
      f && (i.value = !0);
    });
    const n = D(null), o = D({
      visible: !1,
      x: 0,
      y: 0,
      video: null
    });
    function d(f, u) {
      f.preventDefault(), f.stopPropagation(), o.value = {
        visible: !0,
        x: f.clientX,
        y: f.clientY,
        video: u
      };
    }
    function l(f) {
      o.value.video && Ft.sendYouTubeShare({
        id: o.value.video.id,
        title: o.value.video.title,
        cover: o.value.video.thumbnail,
        author: o.value.video.channelTitle,
        views: o.value.video.views,
        url: o.value.video.videoUrl
      }, f), o.value.visible = !1;
    }
    function r() {
      o.value.visible = !1;
    }
    Et(() => {
      window.addEventListener("click", r);
    });
    const s = S, { active: b, standalone: h } = Pt("daily-youtube", "/youtube.html"), w = q(() => b.value && (h || Nt.showYouTube));
    let c = !1, A = !1, C;
    ot([w, () => s.currentView], ([f, u], y) => {
      C && !C.signal.aborted && s.isLoading && (A = !0), C?.abort(), C = new AbortController(), (!f || u !== "recommend") && C.abort(), L.setRecommendationViewSignal(C.signal), f && (c || L.init(), u === "favorites" && (s.currentPage = Math.min(s.currentPage, Math.max(1, Math.ceil(I.value.length / s.pageSize))), L.loadFavorites()), u === "recommend" && (!c || A || y?.[1] !== u && !s.exploreVideos.length) && (A = !1, L.loadRecommend()), c = !0);
    }, { immediate: !0, flush: "sync" });
    const I = q(() => s.activeFavGroup === "全部" ? s.favorites : s.favorites.filter((f) => (f.group || "稍后观看") === s.activeFavGroup)), J = q(() => s.favGroups.filter((f) => f !== "全部" && f !== "稍后观看"));
    function F(f) {
      return f === "全部" ? s.favorites.length : s.favorites.filter((u) => (u.group || "稍后观看") === f).length;
    }
    function P(f) {
      s.activeFavGroup = f, s.currentPage = 1, s.currentView !== "favorites" && O("favorites");
    }
    async function $() {
      const f = window.prompt("请输入新收藏分组名称：");
      !f || !f.trim() || (await L.addFavGroup(f.trim()), s.activeFavGroup = f.trim(), s.currentPage = 1);
    }
    async function U(f) {
      window.confirm(`确定要删除分组「${f}」吗？分组内的视频会保留在「稍后观看」中。`) && (await L.deleteFavGroup(f), s.activeFavGroup === f && (s.activeFavGroup = "全部"));
    }
    const _ = q(
      () => Math.max(1, Math.ceil(I.value.length / s.pageSize))
    );
    ot(() => I.value.length, () => {
      w.value && s.currentView === "favorites" && (s.currentPage = Math.min(s.currentPage, _.value));
    });
    const Tt = q(() => {
      const f = (s.currentPage - 1) * s.pageSize;
      return I.value.slice(f, f + s.pageSize);
    });
    function B(f) {
      return s.favorites.some((u) => u.id === f);
    }
    function O(f) {
      w.value && (s.currentPage = 1, v.switchView(f));
    }
    function Z() {
      w.value && (s.currentPage = 1, v.dispatch("refresh"), st());
    }
    const K = D("");
    let ut = null;
    function dt(f) {
      K.value = f, clearTimeout(ut), ut = setTimeout(() => {
        K.value = "";
      }, 2200);
    }
    async function et(f) {
      if (!(!w.value || s.favoritesBusy || s.favoritesLoading || s.favoritesNeedsReview))
        try {
          await f();
        } catch {
        }
    }
    async function xt(f) {
      const u = !B(f.id);
      await et(() => L.toggleFavorite(f)), dt(u ? `已收藏：${f.title.slice(0, 18)}…` : "已移出收藏夹");
    }
    async function ht(f) {
      await et(() => L.removeFavorite(f)), dt("已移出收藏夹");
    }
    async function it() {
      await et(() => L.syncYouTubeLikedVideos());
    }
    function ft(f) {
      const u = f.videoUrl || `https://www.youtube.com/watch?v=${f.id}`;
      window.open(u, "_blank", "noopener,noreferrer");
    }
    function st() {
      const f = document.querySelector(".daily-youtube");
      f && f.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function Ct() {
      s.currentPage > 1 && (s.currentPage--, v.dispatch("page-prev", s.currentPage), st());
    }
    function St(f) {
      !w.value || s.isLoadingMore || s.isLoading || s.currentPage < f && (s.currentPage++, v.dispatch("page-next", s.currentPage), st());
    }
    function mt(f) {
      const u = f.target;
      u.src = "assets/nav-youtube.svg";
    }
    return kt(() => {
      window.removeEventListener("click", r), C?.abort();
    }), (f, u) => (T(), x("div", {
      class: "vue-youtube-wrapper",
      inert: !w.value
    }, [
      a("section", {
        id: "daily-youtube",
        class: E(["card wide daily-youtube", { "card-fullscreen": m(Yt).activeId === "daily-youtube" }])
      }, [
        a("header", jt, [
          u[11] || (u[11] = a("span", { class: "bar youtube-red" }, null, -1)),
          u[12] || (u[12] = a("h2", null, "YouTube", -1)),
          a("div", Wt, [
            a("button", {
              type: "button",
              role: "tab",
              class: E({ on: m(s).currentView === "favorites" }),
              "aria-selected": m(s).currentView === "favorites",
              onClick: u[0] || (u[0] = (y) => O("favorites"))
            }, " ❤️ 我的收藏 (" + g(m(s).favorites.length) + ") ", 11, Ht),
            a("button", {
              type: "button",
              role: "tab",
              class: E({ on: m(s).currentView === "recommend" }),
              "aria-selected": m(s).currentView === "recommend",
              onClick: u[1] || (u[1] = (y) => O("recommend"))
            }, " ✨ 个性推荐 ", 10, Jt)
          ]),
          a("span", Zt, g(m(s).userName), 1),
          a("button", {
            id: "youtube-refresh",
            class: E(["youtube-refresh icon-btn", { spinning: m(s).isLoading }]),
            type: "button",
            title: m(s).currentView === "recommend" ? "换一批推荐 (18个)" : "刷新收藏",
            onClick: Z
          }, [...u[10] || (u[10] = [
            a("span", { class: "yt-refresh-icon" }, "↻", -1)
          ])], 10, Kt),
          a("div", Qt, [
            a("button", {
              ref_key: "settingsButton",
              ref: n,
              type: "button",
              class: "icon-btn",
              title: "YouTube 设置",
              "aria-label": "YouTube 设置",
              "aria-expanded": t.value,
              onClick: u[2] || (u[2] = (y) => t.value = !t.value)
            }, "⚙", 8, Xt),
            i.value ? (T(), pt(m(e), {
              key: 0,
              visible: w.value && t.value,
              anchor: n.value,
              onClose: u[3] || (u[3] = (y) => t.value = !1)
            }, null, 8, ["visible", "anchor"])) : N("", !0)
          ])
        ]),
        a("div", te, [
          a("aside", ee, [
            a("div", ie, [
              a("button", {
                type: "button",
                class: E(["yt-sidebar-nav-btn yt-nav-fav", { on: m(s).currentView === "favorites" }]),
                onClick: u[4] || (u[4] = (y) => O("favorites"))
              }, [
                a("div", se, [
                  u[14] || (u[14] = a("span", { class: "yt-nav-btn-icon" }, "❤️", -1)),
                  a("div", oe, [
                    u[13] || (u[13] = a("strong", null, "我的收藏", -1)),
                    a("small", null, g(m(s).favorites.length) + " 个收藏视频", 1)
                  ])
                ]),
                u[15] || (u[15] = a("span", { class: "yt-nav-btn-badge" }, "FAV", -1))
              ], 2),
              a("button", {
                type: "button",
                class: E(["yt-sidebar-nav-btn yt-nav-rec", { on: m(s).currentView === "recommend" }]),
                onClick: u[5] || (u[5] = (y) => O("recommend"))
              }, [...u[16] || (u[16] = [
                a("div", { class: "yt-nav-btn-main" }, [
                  a("span", { class: "yt-nav-btn-icon" }, "✨"),
                  a("div", { class: "yt-nav-btn-text" }, [
                    a("strong", null, "个性推荐"),
                    a("small", null, "猜你喜欢 · 每次刷新")
                  ])
                ], -1),
                a("span", { class: "yt-nav-btn-badge" }, "FOR YOU", -1)
              ])], 2)
            ]),
            a("div", { class: "yt-sidebar-hub-head" }, [
              u[17] || (u[17] = a("div", { class: "yt-hub-title" }, [
                a("span", { class: "yt-hub-icon" }, "📁"),
                a("div", { class: "yt-hub-text" }, [
                  a("strong", null, "收藏分组"),
                  a("small", null, "按本地分类展示")
                ])
              ], -1)),
              a("button", {
                class: "yt-hub-add-btn",
                type: "button",
                title: "新建收藏分组",
                onClick: $
              }, " ＋ ")
            ]),
            a("nav", ne, [
              a("button", {
                type: "button",
                class: E(["yt-group-item", { on: m(s).currentView === "favorites" && m(s).activeFavGroup === "全部" }]),
                onClick: u[6] || (u[6] = (y) => P("全部"))
              }, [
                u[18] || (u[18] = a("i", { class: "yt-group-icon" }, "📌", -1)),
                u[19] || (u[19] = a("span", { class: "yt-group-name" }, "全部视频", -1)),
                a("small", ae, g(m(s).favorites.length), 1)
              ], 2),
              a("button", {
                type: "button",
                class: E(["yt-group-item", { on: m(s).currentView === "favorites" && m(s).activeFavGroup === "稍后观看" }]),
                onClick: u[7] || (u[7] = (y) => P("稍后观看"))
              }, [
                u[20] || (u[20] = a("i", { class: "yt-group-icon" }, "⏳", -1)),
                u[21] || (u[21] = a("span", { class: "yt-group-name" }, "稍后观看", -1)),
                a("small", re, g(F("稍后观看")), 1)
              ], 2),
              (T(!0), x(nt, null, at(J.value, (y) => (T(), x("div", {
                key: y,
                class: E(["yt-group-item yt-group-custom", { on: m(s).currentView === "favorites" && m(s).activeFavGroup === y }]),
                onClick: (V) => P(y)
              }, [
                u[22] || (u[22] = a("i", { class: "yt-group-icon" }, "📂", -1)),
                a("span", ce, g(y), 1),
                a("small", ue, g(F(y)), 1),
                a("button", {
                  class: "yt-group-del-btn",
                  type: "button",
                  title: "删除分组",
                  onClick: G((V) => U(y), ["stop"])
                }, " ✕ ", 8, de)
              ], 10, le))), 128))
            ]),
            a("div", he, [
              a("button", {
                class: "yt-sidebar-sync-btn",
                type: "button",
                title: "自动读取 Edge 浏览器中已登录的 YouTube 账号，同步 Liked 视频",
                disabled: m(s).favoritesBusy || m(s).favoritesLoading || m(s).favoritesNeedsReview,
                onClick: it
              }, [...u[23] || (u[23] = [
                a("span", { class: "yt-sync-icon" }, "🔄", -1),
                a("span", null, "同步账号 Liked 视频", -1)
              ])], 8, fe)
            ])
          ]),
          a("main", me, [
            yt(a("div", pe, [
              m(s).isLoading && m(s).exploreVideos.length === 0 ? (T(), x("div", ye, [...u[24] || (u[24] = [
                a("i", { class: "yt-spinner" }, null, -1),
                a("span", null, "正在生成专属个性推荐流…", -1)
              ])])) : m(s).error && m(s).exploreVideos.length === 0 ? (T(), x("div", ve, [
                a("p", null, "⚠️ " + g(m(s).error), 1),
                a("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  onClick: Z
                }, "↻ 重新拉取")
              ])) : m(s).exploreVideos.length === 0 ? (T(), x("div", be, [
                u[25] || (u[25] = a("p", null, "推荐流正在同步，点击换一批即可获取推荐", -1)),
                a("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  style: { "margin-top": "8px" },
                  onClick: Z
                }, "↻ 换一批推荐")
              ])) : (T(), x("div", we, [
                u[27] || (u[27] = a("div", { class: "yt-rec-header-hint" }, [
                  a("span", { class: "yt-rec-counter" }, "✨ 当前为您精选 18 个推荐视频"),
                  a("span", { class: "yt-rec-fav-tip" }, "💡 悬浮封面点击 🤍 即可一键收藏")
                ], -1)),
                a("div", ge, [
                  (T(!0), x(nt, null, at(m(s).exploreVideos, (y) => (T(), x("article", {
                    key: "rec-" + y.id,
                    class: "yt-card",
                    onClick: (V) => ft(y),
                    onContextmenu: (V) => d(V, y)
                  }, [
                    a("div", xe, [
                      a("img", {
                        src: y.thumbnail,
                        alt: y.title,
                        loading: "lazy",
                        onError: mt
                      }, null, 40, Ce),
                      a("button", {
                        class: E(["yt-fav-badge", { "is-fav": B(y.id) }]),
                        type: "button",
                        disabled: m(s).favoritesBusy || m(s).favoritesLoading || m(s).favoritesNeedsReview,
                        title: B(y.id) ? "已收藏到本地（点击移出）" : "收藏到本地 YouTube 收藏夹",
                        onClick: G((V) => xt(y), ["stop"])
                      }, [
                        a("span", _e, g(B(y.id) ? "❤️" : "🤍"), 1),
                        a("span", Ee, g(B(y.id) ? "已收藏" : "收藏"), 1)
                      ], 10, Se),
                      y.views ? (T(), x("span", ke, g(y.views), 1)) : N("", !0)
                    ]),
                    a("div", Ie, [
                      a("h4", {
                        class: "yt-title",
                        title: y.title
                      }, g(y.title), 9, Ve),
                      a("div", Ae, [
                        a("span", {
                          class: "yt-channel",
                          title: y.channelTitle
                        }, g(y.channelTitle), 9, Re),
                        a("span", Le, g(y.publishedAt) + " ↗", 1)
                      ])
                    ])
                  ], 40, Te))), 128))
                ]),
                a("div", Pe, [
                  a("button", {
                    type: "button",
                    class: E(["yt-next-batch-btn", { spinning: m(s).isLoading }]),
                    disabled: m(s).isLoading,
                    onClick: Z
                  }, [
                    u[26] || (u[26] = a("span", { class: "yt-next-batch-icon" }, "↻", -1)),
                    a("span", Fe, g(m(s).isLoading ? "正在探索下一批推荐…" : "换一批推荐（再来 18 个）"), 1)
                  ], 10, Ye)
                ])
              ]))
            ], 512), [
              [vt, m(s).currentView === "recommend"]
            ]),
            yt(a("div", Ne, [
              a("div", Me, [
                a("div", $e, [
                  a("strong", Ue, "📁 " + g(m(s).activeFavGroup), 1),
                  a("span", Be, "（共 " + g(I.value.length) + " 个收藏视频 · 每页 18 个）", 1)
                ]),
                a("div", Oe, [
                  a("button", {
                    class: "yt-sync-btn",
                    type: "button",
                    title: "自动读取 Edge 浏览器中登录的 YouTube 账号，同步 Liked 视频",
                    disabled: m(s).favoritesBusy || m(s).favoritesLoading || m(s).favoritesNeedsReview,
                    onClick: it
                  }, " 🔄 同步账号 Liked 视频 ", 8, Ge)
                ])
              ]),
              m(s).favoritesLoading ? (T(), x("div", De, [...u[28] || (u[28] = [
                a("i", { class: "yt-spinner" }, null, -1),
                a("span", null, "正在更新收藏列表…", -1)
              ])])) : I.value.length === 0 ? (T(), x("div", qe, [
                u[29] || (u[29] = a("span", { class: "yt-empty-icon" }, "📺", -1)),
                a("p", null, "当前分组「" + g(m(s).activeFavGroup) + "」暂无视频。", 1),
                u[30] || (u[30] = a("p", { class: "yt-empty-sub" }, "若您在 YouTube 账号中有点赞或喜欢的视频，可直接一键同步到本地展示。", -1)),
                a("button", {
                  type: "button",
                  class: "yt-sync-btn yt-empty-sync-btn",
                  disabled: m(s).favoritesBusy || m(s).favoritesLoading || m(s).favoritesNeedsReview,
                  onClick: it
                }, " 🔄 立即同步 YouTube 账号喜欢的视频 ", 8, ze)
              ])) : (T(), x("div", je, [
                (T(!0), x(nt, null, at(Tt.value, (y) => (T(), x("article", {
                  key: "fav-" + y.id,
                  class: "yt-card",
                  onClick: (V) => ft(y),
                  onContextmenu: (V) => d(V, y)
                }, [
                  a("div", He, [
                    a("img", {
                      src: y.thumbnail,
                      alt: y.title,
                      loading: "lazy",
                      onError: mt
                    }, null, 40, Je),
                    a("button", {
                      class: "yt-fav-badge is-fav",
                      type: "button",
                      disabled: m(s).favoritesBusy || m(s).favoritesLoading || m(s).favoritesNeedsReview,
                      title: "从收藏中移出",
                      onClick: G((V) => ht(y.id), ["stop"])
                    }, [...u[31] || (u[31] = [
                      a("span", { class: "yt-fav-icon" }, "❤️", -1),
                      a("span", { class: "yt-fav-text" }, "移出", -1)
                    ])], 8, Ze),
                    y.views ? (T(), x("span", Ke, g(y.views), 1)) : N("", !0)
                  ]),
                  a("div", Qe, [
                    a("h4", {
                      class: "yt-title",
                      title: y.title
                    }, g(y.title), 9, Xe),
                    a("div", ti, [
                      a("span", {
                        class: "yt-channel",
                        title: y.channelTitle
                      }, g(y.channelTitle), 9, ei),
                      a("div", ii, [
                        a("span", si, g(y.publishedAt || "已收藏"), 1),
                        a("button", {
                          class: "yt-del-fav-btn",
                          type: "button",
                          disabled: m(s).favoritesBusy || m(s).favoritesLoading || m(s).favoritesNeedsReview,
                          title: "从收藏中删除",
                          onClick: G((V) => ht(y.id), ["stop"])
                        }, " 🗑️ ", 8, oi)
                      ])
                    ])
                  ])
                ], 40, We))), 128))
              ])),
              _.value > 1 ? (T(), x("nav", ni, [
                a("button", {
                  type: "button",
                  disabled: m(s).currentPage <= 1,
                  onClick: Ct
                }, "‹ 上一页", 8, ai),
                a("span", null, "第 " + g(m(s).currentPage) + " / " + g(_.value) + " 页 (共 " + g(I.value.length) + " 条)", 1),
                a("button", {
                  type: "button",
                  disabled: m(s).currentPage >= _.value,
                  onClick: u[8] || (u[8] = (y) => St(_.value))
                }, "下一页 ›", 8, ri)
              ])) : N("", !0)
            ], 512), [
              [vt, m(s).currentView === "favorites"]
            ])
          ])
        ])
      ], 2),
      bt(Vt, { name: "yt-toast-fade" }, {
        default: It(() => [
          K.value ? (T(), x("div", li, g(K.value), 1)) : N("", !0)
        ]),
        _: 1
      }),
      (T(), pt(Rt, { to: "body" }, [
        o.value.visible ? (T(), x("div", {
          key: 0,
          class: "yt-context-menu",
          style: At({ left: `${Math.min(o.value.x, 600)}px`, top: `${Math.min(o.value.y, 400)}px` }),
          onClick: u[9] || (u[9] = G(() => {
          }, ["stop"]))
        }, [
          a("div", ci, g(o.value.video?.title), 1),
          bt(Mt, {
            label: "💬 发送到聊天室",
            visible: o.value.visible,
            onSelect: l
          }, null, 8, ["visible"])
        ], 4)) : N("", !0)
      ]))
    ], 8, zt));
  }
}), di = /* @__PURE__ */ $t(ui, [["__scopeId", "data-v-cf8f792c"]]), bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: di
}, Symbol.toStringTag, { value: "Module" }));
export {
  bi as Y,
  L as y
};
