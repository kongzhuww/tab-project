import { d as kt, w as nt, B as Et, K as It, e as _, i as r, u as a, A as E, t as b, j as yt, f as $, F as at, g as rt, l as vt, y as bt, p as wt, H as Vt, R as At, h as D, z as Rt, T as Lt, b as q, s as z, o as x, C as Pt } from "./vendor-vue-9b0eS4bW.js";
import { u as Ft } from "./useCardActivity-BiWtYWUl.js";
import { o as Yt, A as Nt, r as $t } from "./view-styles-KV13C9x1.js";
import "./store-C4EqxSgi.js";
import { C as Mt } from "./ChatShareMenu-BTGh6NTR.js";
import { t as v, _ as Ut } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { y as w, a as S } from "./youtube-store-DNBjW6Yp.js";
const W = "youtubeFavoritesV1", J = "youtubeFavGroupsV1";
async function Bt() {
  if (typeof chrome < "u" && chrome.storage?.local)
    return new Promise((e, t) => {
      chrome.storage.local.get([W, J], (i) => {
        chrome.runtime.lastError ? t(new Error("收藏存储读取失败")) : e(i);
      });
    });
  const p = {};
  for (const e of [W, J]) {
    const t = localStorage.getItem(e);
    t !== null && (p[e] = JSON.parse(t));
  }
  return p;
}
async function tt() {
  const p = await Bt(), e = p[W] === void 0 ? [] : p[W], t = p[J] === void 0 ? ["全部", "稍后观看"] : p[J];
  if (!Array.isArray(e) || !e.every((i) => i && typeof i.id == "string" && typeof i.title == "string"))
    throw new Error("收藏数据格式异常，未覆盖原记录");
  if (!Array.isArray(t) || !t.every((i) => typeof i == "string")) throw new Error("收藏分组格式异常，未覆盖原记录");
  return { favorites: e.map((i) => ({ ...i })), groups: [...t] };
}
function et(p) {
  return Array.isArray(p) ? p.map(et) : p && typeof p == "object" ? Object.fromEntries(Object.keys(p).sort().filter((e) => p[e] !== void 0).map((e) => [e, et(p[e])])) : p;
}
async function Gt(p) {
  const e = { [W]: p.favorites, [J]: p.groups };
  if (typeof chrome < "u" && chrome.storage?.local)
    await new Promise((i, n) => {
      chrome.storage.local.set(e, () => {
        chrome.runtime.lastError ? n(new Error("收藏保存结果未确认")) : i();
      });
    });
  else
    for (const [i, n] of Object.entries(e)) localStorage.setItem(i, JSON.stringify(n));
  const t = await tt();
  if (JSON.stringify(et(t)) !== JSON.stringify(et(p))) throw new Error("收藏保存后的核对不一致，请重读确认");
}
async function L(p, e, t = 8e3) {
  return e?.throwIfAborted(), new Promise((i, n) => {
    let o = !1;
    const d = (s, g) => {
      o || (o = !0, clearTimeout(l), e?.removeEventListener("abort", u), s ? n(s) : i(g));
    }, u = () => d(new DOMException("Read cancelled", "AbortError")), l = setTimeout(() => d(new Error("YouTube read timeout")), t);
    if (e?.addEventListener("abort", u, { once: !0 }), e?.aborted) {
      u();
      return;
    }
    try {
      if (typeof chrome > "u" || !chrome.runtime?.sendMessage) throw new Error("Extension transport unavailable");
      chrome.runtime.sendMessage(p, (s) => {
        const g = chrome.runtime.lastError;
        o || (g || !s?.ok ? d(new Error("YouTube background read failed")) : d(void 0, s));
      });
    } catch {
      d(new Error("YouTube background transport unavailable"));
    }
  });
}
async function lt(p, e, t, i = 8e3) {
  t?.throwIfAborted();
  const n = new AbortController(), o = () => n.abort();
  t?.addEventListener("abort", o, { once: !0 });
  const d = setTimeout(o, i);
  try {
    const u = await fetch(p, { ...e, signal: n.signal });
    if (!u.ok) throw new Error(`HTTP ${u.status}`);
    const l = await u.text();
    return n.signal.throwIfAborted(), l;
  } finally {
    clearTimeout(d), t?.removeEventListener("abort", o);
  }
}
const j = "youtubeRssChannelsV1", X = "youtubeCustomGroupsV1", ut = "youtubeRssVideosCacheV1", M = "youtubePlaylistsV1", ct = "youtubeRecommendBatchV1", Ot = 900 * 1e3, Dt = ["默认"], qt = [];
function H(p) {
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
function I(p) {
  return new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.set(p, e) : (Object.entries(p).forEach(([t, i]) => {
      try {
        localStorage.setItem(t, JSON.stringify(i));
      } catch {
      }
    }), e());
  });
}
function gt(p) {
  if (!p) return 0;
  const e = new Date(p).getTime();
  if (!isNaN(e) && e > 0) return e;
  const t = Date.now(), i = String(p).match(/(\d+)\s*(秒|分|小时|天|周|月|年|second|minute|hour|day|week|month|year)/i);
  if (!i) return t - 864e5 * 30;
  const n = parseInt(i[1], 10), o = i[2].toLowerCase();
  return o.startsWith("秒") || o.startsWith("second") ? t - n * 1e3 : o.startsWith("分") || o.startsWith("minute") ? t - n * 60 * 1e3 : o.startsWith("小时") || o.startsWith("hour") ? t - n * 3600 * 1e3 : o.startsWith("天") || o.startsWith("day") ? t - n * 86400 * 1e3 : o.startsWith("周") || o.startsWith("week") ? t - n * 7 * 86400 * 1e3 : o.startsWith("月") || o.startsWith("month") ? t - n * 30 * 86400 * 1e3 : o.startsWith("年") || o.startsWith("year") ? t - n * 365 * 86400 * 1e3 : t - 864e5 * 30;
}
function Tt(p) {
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
class zt {
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
      t.abort(), i === this.recommendGeneration && w.updateState({ isLoading: !1, isLoadingMore: !1 });
    };
    e?.addEventListener("abort", o, { once: !0 });
    const d = setTimeout(() => {
      i === this.recommendGeneration && w.updateState({ error: "推荐读取超时，请手动刷新。" }), o();
    }, 45e3);
    return {
      signal: t.signal,
      current: n,
      finish: () => {
        clearTimeout(d), e?.removeEventListener("abort", o), i === this.recommendGeneration && (this.recommendationRead = null, w.updateState({ isLoading: !1, isLoadingMore: !1 }));
      }
    };
  }
  // -------------------------------------------------------------
  // 1. 频道与分组管理
  // -------------------------------------------------------------
  async loadGroups() {
    if (this.groupsLoaded) return this.groups;
    const e = await H([X]), t = (Array.isArray(e[X]) ? e[X] : []).filter((o) => o !== "ASMR·癒し" && o !== "AI与前沿"), i = this.channels.map((o) => o.group || "默认"), n = /* @__PURE__ */ new Set([...Dt, ...i, ...t]);
    return this.groups = Array.from(n).filter(Boolean), this.groupsLoaded = !0, w.updateState({ groups: this.groups }), this.groups;
  }
  async saveGroups(e) {
    e && (this.groups = e), await I({ [X]: this.groups }), w.updateState({ groups: this.groups });
  }
  async loadChannels() {
    if (this.channelsLoaded) return this.channels;
    let t = (await H([j]))[j];
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
    !Array.isArray(t) || t.length === 0 ? (t = [], await I({ [j]: t })) : (t = t.filter((o) => !i.has(o.id)), await I({ [j]: t })), this.channels = t, this.channelsLoaded = !0;
    const n = this.channels.map((o) => ({
      id: o.id,
      title: o.name,
      handle: o.handle,
      group: o.group || "默认",
      thumbnail: o.thumbnail
    }));
    return w.updateState({ channels: n }), await this.loadGroups(), this.channels;
  }
  async saveChannels(e) {
    e && (this.channels = e), await I({ [j]: this.channels });
    const t = this.channels.map((i) => ({
      id: i.id,
      title: i.name,
      handle: i.handle,
      group: i.group || "默认",
      thumbnail: i.thumbnail
    }));
    w.updateState({ channels: t }), await this.loadGroups();
  }
  async addChannel(e) {
    await this.loadChannels();
    let t = "", i = "", n = "默认", o = "";
    if (typeof e == "string" ? t = e.trim() : (t = e.id.trim(), i = e.name?.trim() || "", n = e.group?.trim() || "默认", o = e.handle?.trim() || ""), t.includes("@") || t.startsWith("http"))
      try {
        const u = t.match(/@([a-zA-Z0-9_.-]+)/);
        u && (o = `@${u[1]}`);
        const l = o ? `https://www.youtube.com/${o}` : t, g = (await new Promise((c) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: l }, c);
        }))?.html || "", f = g.match(/channel_id=(UC[a-zA-Z0-9_-]+)/) || g.match(/"channelId":"(UC[a-zA-Z0-9_-]+)"/);
        f && (t = f[1]);
        const T = g.match(/<title>(.*?) - YouTube<\/title>/i) || g.match(/<title>(.*?)<\/title>/i);
        T && !i && (i = T[1].trim());
      } catch {
      }
    return t.startsWith("UC") ? (i || (i = o || t), this.channels.some((u) => u.id === t) ? !1 : (this.channels.push({ id: t, name: i, group: n, handle: o }), await this.saveChannels(), !0)) : !1;
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
    w.updateState({ isLoading: !0, error: "" });
    try {
      let e = "";
      try {
        e = await new Promise((l, s) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/feed/channels" }, (g) => {
            g && g.ok && g.html ? l(g.html) : s(new Error(g?.error || "后台请求失败"));
          });
        });
      } catch {
        const l = await fetch("https://www.youtube.com/feed/channels", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        });
        if (!l.ok) throw new Error(`HTTP ${l.status}`);
        e = await l.text();
      }
      const t = e.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) || e.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
      if (!t) throw new Error("未能获取频道列表，请确保已在当前浏览器登录 YouTube");
      const i = JSON.parse(t[1]), n = [], o = /* @__PURE__ */ new Set(), d = (l) => {
        if (!(!l || typeof l != "object")) {
          if (l.channelRenderer) {
            const s = l.channelRenderer, g = s.channelId, f = s.title?.simpleText || s.title?.runs?.[0]?.text;
            g && f && !o.has(g) && (o.add(g), n.push({
              id: g,
              name: f,
              group: "YouTube 关注",
              thumbnail: s.thumbnail?.thumbnails?.[0]?.url
            }));
          }
          for (const s of Object.keys(l)) d(l[s]);
        }
      };
      if (d(i), n.length === 0)
        throw new Error("未解析到关注频道，请确认是否已登录 YouTube");
      await this.loadChannels();
      let u = 0;
      for (const l of n)
        this.channels.some((s) => s.id === l.id) || (this.channels.push(l), u++);
      return await this.saveChannels(), await this.loadUpdates(!0), u;
    } catch (e) {
      throw w.updateState({ isLoading: !1, error: e?.message || "同步关注频道失败" }), e;
    }
  }
  parseOpml(e) {
    const t = new DOMParser().parseFromString(e, "application/xml"), i = Array.from(t.querySelectorAll("outline[xmlUrl], outline[xmlurl]")), n = [];
    return i.forEach((o) => {
      const u = (o.getAttribute("xmlUrl") || o.getAttribute("xmlurl") || "").match(/channel_id=([a-zA-Z0-9_-]+)/);
      if (u) {
        const l = u[1], s = (o.getAttribute("title") || o.getAttribute("text") || "YouTube 频道").trim();
        n.push({ id: l, name: s, group: "导入" });
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
        if (o = (await L({ type: "fetchYouTubeHtml", url: n }, i)).html, typeof o != "string") throw new Error("Invalid RSS response");
      } catch {
        i?.throwIfAborted(), o = await lt(n, { cache: "no-store", referrerPolicy: "no-referrer" }, i, 6e3);
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
      const u = await d.text(), l = this.parseRssXml(u, "播放列表");
      return w.updateState({ playlistVideos: l, activePlaylistId: t }), l;
    } finally {
      clearTimeout(o);
    }
  }
  parseRssXml(e, t = "YouTube", i = "") {
    const n = new DOMParser().parseFromString(e, "application/xml"), o = n.querySelector("feed > title")?.textContent || t;
    return Array.from(n.querySelectorAll("entry")).map((u) => {
      const l = u.getElementsByTagNameNS("http://www.youtube.com/xml/schemas/2015", "videoId")[0]?.textContent || u.querySelector("videoId")?.textContent || (u.querySelector("id")?.textContent || "").replace(/^yt:video:/, ""), s = u.querySelector("title")?.textContent || "YouTube 视频", g = u.querySelector("author > name")?.textContent || o, f = u.querySelector("published")?.textContent || "", T = u.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "group")[0] || u.querySelector("group"), R = (T?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0] || T?.querySelector("thumbnail"))?.getAttribute("url") || (l ? `https://i.ytimg.com/vi/${l}/hqdefault.jpg` : ""), C = T?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "statistics")[0]?.getAttribute("views") || "";
      return {
        id: l,
        title: s,
        channelTitle: g,
        channelId: i || u.querySelector("channelId")?.textContent || "",
        publishedAt: Tt(f),
        thumbnail: R,
        views: Y(C),
        videoUrl: `https://www.youtube.com/watch?v=${l}`
      };
    }).filter((u) => u.id && !/^Deleted video$|^Private video$/i.test(u.title));
  }
  // -------------------------------------------------------------
  // 3. 订阅更新流
  // -------------------------------------------------------------
  async loadUpdates(e = !1) {
    if (await this.loadChannels(), w.updateState({ isLoading: !0, error: "" }), !e) {
      const t = (await H([ut]))[ut];
      if (t?.items?.length && Date.now() - Number(t.savedAt || 0) < Ot) {
        const i = t.items.map((n) => ({
          id: n.videoId,
          title: n.title,
          channelTitle: n.channel,
          channelId: n.channelId,
          publishedAt: Tt(n.publishedAt),
          views: n.views,
          thumbnail: n.thumbnail,
          group: n.group,
          videoUrl: `https://www.youtube.com/watch?v=${n.videoId}`
        }));
        return w.updateState({
          videos: i,
          isLoading: !1,
          userName: `已订阅 ${this.channels.length} 个频道`
        }), i;
      }
    }
    if (!this.channels.length)
      return w.updateState({ videos: [], isLoading: !1 }), [];
    try {
      const i = [];
      for (let u = 0; u < this.channels.length; u += 5) {
        const l = this.channels.slice(u, u + 5), s = await Promise.all(
          l.map(async (g) => {
            try {
              return (await this.fetchChannelVideosFromRss(g.id, g.name)).map((T) => ({ ...T, group: g.group || "默认" }));
            } catch {
              return [];
            }
          })
        );
        i.push(...s);
      }
      const n = /* @__PURE__ */ new Set(), o = [];
      i.flat().forEach((u) => {
        u?.id && !n.has(u.id) && (n.add(u.id), o.push(u));
      }), o.sort((u, l) => {
        const s = gt(u.publishedAt);
        return gt(l.publishedAt) - s;
      });
      const d = o.slice(0, 60);
      return d.length > 0 && await I({
        [ut]: {
          savedAt: Date.now(),
          items: d.map((u) => ({
            videoId: u.id,
            title: u.title,
            channel: u.channelTitle,
            channelId: u.channelId || "",
            publishedAt: u.publishedAt,
            views: u.views,
            thumbnail: u.thumbnail,
            group: u.group
          }))
        }
      }), w.updateState({
        videos: d,
        isLoading: !1,
        userName: `已订阅 ${this.channels.length} 个频道`
      }), d;
    } catch (t) {
      return w.updateState({
        isLoading: !1,
        error: t.message || "拉取视频动态失败"
      }), [];
    }
  }
  async getCachedRecommendBatch() {
    try {
      const t = (await H([ct]))[ct];
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
        await I({ [ct]: i });
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
          return w.updateState({
            exploreVideos: d.videos,
            isLoading: !1,
            error: "",
            userName: d.userName || "账号专属推荐",
            currentPage: 1
          }), d.videos.forEach((u) => this.shownVideoIds.add(u.id)), d.videos;
      }
      if (this.recommendPool.length >= this.RECOMMEND_PAGE_SIZE) {
        const d = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
        return d.forEach((u) => this.shownVideoIds.add(u.id)), w.updateState({
          exploreVideos: d,
          isLoading: !1,
          error: "",
          userName: "账号专属推荐 · 换一批",
          currentPage: 1
        }), this.saveCachedRecommendBatch(d, "账号专属推荐 · 换一批"), this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken && this.fetchContinuationVideos(this.lastContinuationToken), d;
      }
      if (w.updateState({ isLoading: !0, error: "" }), this.lastContinuationToken)
        try {
          const d = await this.fetchContinuationVideos(this.lastContinuationToken, i.signal);
          if (n())
            for (const u of d)
              !this.shownVideoIds.has(u.id) && !this.recommendPool.some((l) => l.id === u.id) && this.recommendPool.push(u);
        } catch {
        }
      if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE) {
        const d = { token: "" }, u = await this.fetchPersonalRecommendations(i.signal, d);
        if (!n()) return [];
        this.lastContinuationToken = d.token;
        const l = u.filter((g) => !this.shownVideoIds.has(g.id)), s = l.length >= 10 ? l : u;
        s === u && this.shownVideoIds.clear();
        for (const g of s)
          this.recommendPool.some((f) => f.id === g.id) || this.recommendPool.push(g);
      }
      if (!n()) return [];
      const o = this.recommendPool.splice(0, this.RECOMMEND_PAGE_SIZE);
      return o.forEach((d) => this.shownVideoIds.add(d.id)), o.length === 0 ? (w.updateState({
        isLoading: !1,
        error: "未获取到推荐视频，请检查网络或 YouTube 登录状态。",
        userName: "暂无推荐"
      }), []) : (w.updateState({
        exploreVideos: o,
        isLoading: !1,
        error: "",
        userName: "账号专属推荐",
        currentPage: 1
      }), this.saveCachedRecommendBatch(o, "账号专属推荐"), this.recommendPool.length < this.RECOMMEND_PAGE_SIZE && this.lastContinuationToken && this.fetchContinuationVideos(this.lastContinuationToken), o);
    } catch {
      return n() && w.updateState({
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
      const n = await L({
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
      const n = JSON.parse(i[1]), o = [], d = /* @__PURE__ */ new Set(), u = (f) => {
        !f || !f.id || d.has(f.id) || (d.add(f.id), o.push(f));
      }, l = (f) => {
        if (!f || typeof f != "object") return !1;
        if (f.adSlotRenderer || f.inFeedAdLayoutRenderer || f.promotedSparklesWebRenderer || f.promotedVideoRenderer || f.statementBannerRenderer || f.adBreakRenderer) return !0;
        const T = JSON.stringify(
          f.badges || f.badge || f.navigationEndpoint || f.contentType || f.layoutType || ""
        ).toLowerCase();
        return !!(T.includes("sponsored") || T.includes("广告") || T.includes("赞助") || T.includes("promoted"));
      }, s = (f) => {
        if (!f || l(f)) return null;
        const T = f.contentId || f.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId;
        if (!T || typeof T != "string" || T.length < 8) return null;
        const c = f.metadata?.lockupMetadataViewModel, R = c?.title?.content || c?.title?.runs?.[0]?.text || c?.title?.simpleText || f.contentImage?.thumbnailViewModel?.image?.accessibilityText || "YouTube 视频";
        let C = "", V = "", Z = "";
        const N = c?.metadata?.contentMetadataViewModel?.metadataRows;
        if (Array.isArray(N)) {
          const B = N[0]?.metadataParts;
          Array.isArray(B) && B[0]?.text?.content && (C = B[0].text.content);
          const k = N[1]?.metadataParts;
          Array.isArray(k) && (k[0]?.text?.content && (V = k[0].text.content), k[1]?.text?.content && (Z = k[1].text.content));
        }
        let F = `https://i.ytimg.com/vi/${T}/hqdefault.jpg`;
        const U = f.contentImage?.thumbnailViewModel?.image?.sources;
        return Array.isArray(U) && U.length > 0 && (F = U.slice(-1)[0]?.url || F), {
          id: T,
          title: R,
          channelTitle: C || "YouTube",
          publishedAt: Z,
          views: Y(V),
          thumbnail: F,
          videoUrl: `https://www.youtube.com/watch?v=${T}`
        };
      }, g = (f, T = 0) => {
        if (!(!f || typeof f != "object" || T > 24 || o.length >= 80) && !l(f)) {
          if (f.lockupViewModel) {
            u(s(f.lockupViewModel));
            return;
          }
          if (f.videoRenderer && !l(f.videoRenderer)) {
            const c = f.videoRenderer;
            if (c && c.videoId) {
              u({
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
          if (f.playlistVideoRenderer && !l(f.playlistVideoRenderer)) {
            const c = f.playlistVideoRenderer;
            if (c && c.videoId) {
              const R = c.videoInfo?.runs?.[0]?.text || "", C = c.videoInfo?.runs?.[2]?.text || c.videoInfo?.runs?.[1]?.text || "";
              u({
                id: c.videoId,
                title: c.title?.runs?.[0]?.text || c.title?.simpleText || "YouTube 视频",
                channelTitle: c.shortBylineText?.runs?.[0]?.text || c.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: c.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: C || c.lengthText?.simpleText || "",
                views: Y(R),
                thumbnail: c.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${c.videoId}`
              });
              return;
            }
          }
          if (f.gridVideoRenderer && !l(f.gridVideoRenderer)) {
            const c = f.gridVideoRenderer;
            if (c && c.videoId) {
              u({
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
          if (f.compactVideoRenderer && !l(f.compactVideoRenderer)) {
            const c = f.compactVideoRenderer;
            if (c && c.videoId) {
              u({
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
          if (f.continuationItemRenderer) {
            const c = f.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token || f.continuationItemRenderer?.continuationEndpoint?.browseEndpoint?.continuationCommand?.token;
            c && typeof c == "string" && t && (t.token = c);
          }
          for (const c of Object.keys(f))
            typeof f[c] == "object" && g(f[c], T + 1);
        }
      };
      return g(n.contents || n), o;
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
      const o = await L({
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
        if (o = (await L({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/" }, e, 15e3)).html, typeof o != "string") throw new Error("Invalid homepage response");
      } catch {
        e?.throwIfAborted(), o = await lt("https://www.youtube.com/", {
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
        const u = await L({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { continuation: d }
        }, e);
        e?.throwIfAborted();
        const l = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(u.data)};<\/script>`, t);
        if (!l.length) {
          t.token = "";
          break;
        }
        for (const s of l) i.some((g) => g.id === s.id) || i.push(s);
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
    w.updateState({ isLoadingMore: !0, error: "" });
    try {
      const o = await L({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: t }
      }, i.signal);
      if (!i.current()) return 0;
      const d = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(o.data)};<\/script>`, n), u = [...S.exploreVideos];
      for (const s of d) u.some((g) => g.id === s.id) || u.push(s);
      const l = u.length - S.exploreVideos.length;
      if (l) {
        if (await I({ logicweaver_youtube_explore_cache: u }), !i.current()) return 0;
        this.exploreCache.recommend = u, w.updateState({ exploreVideos: u });
      }
      return this.lastContinuationToken = n.token === t ? "" : n.token, l;
    } catch {
      return i.current() && w.updateState({ error: "追加推荐失败，当前列表保留；可手动重试。" }), 0;
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
        const l = await L({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { browseId: o }
        }, void 0, 8e3);
        if (l && l.data) {
          const s = { token: "" };
          if (n = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(l.data)};<\/script>`, s), s.token && n.length < 50)
            try {
              const g = await L({
                type: "fetchYouTubeInnerTube",
                endpoint: "browse",
                payload: { continuation: s.token }
              }, void 0, 6e3);
              if (g && g.data) {
                const f = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(g.data)};<\/script>`);
                for (const T of f)
                  n.some((c) => c.id === T.id) || n.push(T);
              }
            } catch {
            }
        }
      } catch {
      }
      if (!n.length) {
        let l = "";
        try {
          l = (await L({
            type: "fetchYouTubeHtml",
            url: `https://www.youtube.com/playlist?list=${e}`
          }, void 0, 12e3)).html || "";
        } catch {
          l = await lt(`https://www.youtube.com/playlist?list=${e}`, {
            credentials: "include",
            headers: { "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8" }
          }, void 0, 15e3);
        }
        l && (n = this.extractVideosFromHtml(l));
      }
      if (!n.length)
        throw new Error("未能识别到 YouTube 视频，请确认已在 Edge 登录 YouTube 账号，或该收藏列表中尚无视频");
      Object.assign(i, await tt());
      let d = 0;
      const u = new Set(i.favorites.map((l) => l.id));
      for (const l of n)
        u.has(l.id) || (u.add(l.id), i.favorites.unshift({ ...l, group: t, savedAt: Date.now() }), d++);
      return i.groups.includes(t) || i.groups.push(t), d;
    }, (i) => `同步完成！已成功抓取 ${i} 个视频并存入「${t}」。`);
  }
  async mutateFavorites(e, t) {
    if (S.favoritesBusy) throw new Error("另一个收藏操作正在处理，请稍后再操作");
    if (S.favoritesNeedsReview) throw new Error("上次结果未确认，请先点击重读收藏");
    w.updateState({ favoritesBusy: !0, favoritesLoading: !1, favoriteMessage: "正在处理收藏，请勿重复提交…" }), ++this.favoriteReadVersion;
    let i = !1;
    try {
      const n = await tt(), o = await e(n);
      return i = !0, await Gt(n), this.favorites = n.favorites.map((d) => ({ ...d })), this.favoritesLoaded = !0, w.updateState({
        favorites: this.favorites.map((d) => ({ ...d })),
        favGroups: [...n.groups],
        activeFavGroup: n.groups.includes(S.activeFavGroup) ? S.activeFavGroup : "全部",
        favoriteMessage: t(o)
      }), o;
    } catch (n) {
      throw this.favoritesLoaded = !1, w.updateState({
        favoritesNeedsReview: !0,
        favoriteMessage: i ? "收藏保存结果未确认，未自动重试。当前显示保留旧记录；请先重读收藏核对。" : `未提交收藏保存：${n instanceof Error ? n.message : "读取失败"}。请先重读收藏后再操作。`
      }), new Error("收藏操作未完成或保存结果未确认，请重读收藏核对");
    } finally {
      w.updateState({ favoritesBusy: !1 });
    }
  }
  async loadFavorites(e = !1) {
    if (S.favoritesBusy) return this.favorites.map((n) => ({ ...n }));
    if (this.favoritesLoaded && !e) return this.favorites.map((n) => ({ ...n }));
    if (this.favoriteRead && (await this.favoriteRead, !e))
      return this.favorites.map((n) => ({ ...n }));
    if (S.favoritesBusy) return this.favorites.map((n) => ({ ...n }));
    const t = ++this.favoriteReadVersion;
    w.updateState({ favoritesLoading: !0 });
    const i = (async () => {
      try {
        const n = await tt();
        return t !== this.favoriteReadVersion ? this.favorites.map((o) => ({ ...o })) : (this.favorites = n.favorites, this.favoritesLoaded = !0, w.updateState({
          favorites: this.favorites.map((o) => ({ ...o })),
          favGroups: [...n.groups],
          ...e ? { favoritesNeedsReview: !1, favoriteMessage: "已重新读取收藏，请核对后再操作。" } : {}
        }), this.favorites.length === 0 && !this.hasAutoSynced && (this.hasAutoSynced = !0, this.syncYouTubeLikedVideos().catch(() => {
        })), this.favorites.map((o) => ({ ...o })));
      } catch {
        throw t === this.favoriteReadVersion && w.updateState({
          favoritesNeedsReview: !0,
          favoriteMessage: "收藏读取失败，未启用写入；请重试读取。"
        }), new Error("收藏读取失败");
      } finally {
        t === this.favoriteReadVersion && w.updateState({ favoritesLoading: !1 });
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
    let t = (await H([M]))[M];
    const i = /* @__PURE__ */ new Set([
      "PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4",
      "PL9ooVrP1hQOFWk94Q4P_rF_X_wE2eXj1k"
    ]);
    return !Array.isArray(t) || t.length === 0 ? (t = qt, await I({ [M]: t })) : (t = t.filter((n) => !i.has(n.id)), await I({ [M]: t })), this.playlists = t, this.playlistsLoaded = !0, w.updateState({
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
    return this.playlists.push(o), await I({ [M]: this.playlists }), w.updateState({ playlists: [...this.playlists], activePlaylistId: i }), this.fetchPlaylistVideos(i), !0;
  }
  async removePlaylist(e) {
    await this.loadPlaylists(), this.playlists = this.playlists.filter((i) => i.id !== e), await I({ [M]: this.playlists });
    const t = this.playlists[0]?.id || "";
    w.updateState({ playlists: [...this.playlists], activePlaylistId: t }), t ? this.fetchPlaylistVideos(t) : w.updateState({ playlistVideos: [] });
  }
  // -------------------------------------------------------------
  // 7. 搜索功能（优先通过官方 InnerTube 搜索，秒级返回真实结果）
  // -------------------------------------------------------------
  async search(e) {
    if (!e.trim()) return [];
    w.updateState({ isLoading: !0, error: "" });
    try {
      let t = null;
      try {
        t = await new Promise((d, u) => {
          chrome?.runtime?.sendMessage?.(
            {
              type: "fetchYouTubeInnerTube",
              endpoint: "search",
              payload: { query: e.trim() }
            },
            (l) => {
              l && l.ok && l.data ? d(l.data) : u(new Error(l?.error || "搜索接口未响应"));
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
        const l = (await d.text()).match(/ytInitialData\s*=\s*({.+?});<\/script>/);
        if (!l) throw new Error("未能从网页提取搜索结果");
        t = JSON.parse(l[1]);
      }
      const i = t.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [], n = [];
      return i.forEach((o) => {
        (o.itemSectionRenderer?.contents || []).forEach((u) => {
          const l = u.videoRenderer;
          l && l.videoId && n.push({
            id: l.videoId,
            title: l.title?.runs?.[0]?.text || "YouTube 视频",
            channelTitle: l.ownerText?.runs?.[0]?.text || "YouTube UP主",
            channelId: l.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
            publishedAt: l.publishedTimeText?.simpleText || "",
            views: Y(l.viewCountText?.simpleText),
            thumbnail: l.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${l.videoId}/hqdefault.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${l.videoId}`
          });
        });
      }), w.updateState({ searchResults: n, isLoading: !1 }), n;
    } catch (t) {
      return w.updateState({
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
    this.initialized || (this.initialized = !0, w.onAction(async (e, t) => {
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
      e && e.videos.length > 0 && S.exploreVideos.length === 0 && (w.updateState({
        exploreVideos: e.videos,
        userName: e.userName || "账号专属推荐"
      }), e.videos.forEach((t) => this.shownVideoIds.add(t.id)));
    }));
  }
}
const P = new zt(), jt = ["inert"], Ht = { class: "card-head" }, Wt = ["aria-label"], Jt = ["aria-selected"], Zt = ["aria-selected"], Kt = ["title"], Qt = { class: "yt-settings-anchor" }, Xt = ["title", "aria-label", "aria-expanded"], te = { class: "yt-layout-body" }, ee = { class: "yt-sidebar" }, ie = { class: "yt-sidebar-nav-group" }, se = { class: "yt-nav-btn-main" }, oe = { class: "yt-nav-btn-text" }, ne = { class: "yt-nav-btn-main" }, ae = { class: "yt-nav-btn-text" }, re = { class: "yt-sidebar-hub-head" }, le = { class: "yt-hub-title" }, ue = { class: "yt-hub-text" }, ce = ["title"], de = ["aria-label"], he = { class: "yt-group-name" }, fe = { class: "yt-group-count" }, me = { class: "yt-group-name" }, pe = { class: "yt-group-count" }, ye = ["onClick"], ve = { class: "yt-group-name" }, be = { class: "yt-group-count" }, we = ["title", "onClick"], ge = { class: "yt-sidebar-footer" }, Te = ["title", "disabled"], xe = { class: "yt-main-content" }, _e = { id: "youtube-recommend-pane" }, Ce = {
  key: 0,
  class: "muted small yt-loading-box"
}, Se = {
  key: 1,
  class: "yt-error-box"
}, ke = {
  key: 2,
  class: "muted small yt-empty"
}, Ee = { key: 3 }, Ie = { class: "yt-rec-header-hint" }, Ve = { class: "yt-rec-counter" }, Ae = { class: "yt-rec-fav-tip" }, Re = { class: "yt-video-grid" }, Le = ["onClick", "onContextmenu"], Pe = { class: "yt-thumb-wrap" }, Fe = ["src", "alt"], Ye = ["disabled", "title", "onClick"], Ne = { class: "yt-fav-icon" }, $e = { class: "yt-fav-text" }, Me = {
  key: 0,
  class: "yt-badge"
}, Ue = { class: "yt-info" }, Be = ["title"], Ge = { class: "yt-meta-row" }, Oe = ["title"], De = { class: "yt-time" }, qe = { class: "yt-next-batch-container" }, ze = ["disabled"], je = { class: "yt-next-batch-text" }, He = { id: "youtube-favorites-pane" }, We = { class: "yt-fav-toolbar" }, Je = { class: "yt-fav-hint" }, Ze = { class: "yt-fav-cur-group" }, Ke = { class: "muted small" }, Qe = { class: "yt-sync-actions" }, Xe = ["title", "disabled"], ti = {
  key: 0,
  class: "muted small yt-loading-box"
}, ei = {
  key: 1,
  class: "muted small yt-empty yt-empty-fav"
}, ii = { class: "yt-empty-sub" }, si = ["disabled"], oi = {
  key: 2,
  class: "yt-video-grid"
}, ni = ["onClick", "onContextmenu"], ai = { class: "yt-thumb-wrap" }, ri = ["src", "alt"], li = ["disabled", "title", "onClick"], ui = { class: "yt-fav-text" }, ci = {
  key: 0,
  class: "yt-badge"
}, di = { class: "yt-info" }, hi = ["title"], fi = { class: "yt-meta-row" }, mi = ["title"], pi = { class: "yt-right-meta" }, yi = { class: "yt-time" }, vi = ["disabled", "title", "onClick"], bi = {
  key: 3,
  class: "yt-pagination"
}, wi = ["disabled"], gi = ["disabled"], Ti = {
  key: 0,
  class: "yt-toast"
}, xi = { class: "menu-head" }, _i = /* @__PURE__ */ kt({
  __name: "YouTubeCard",
  setup(p) {
    const e = Pt(() => import("./YouTubeSettingsPanel-5U7byFBJ.js")), t = q(!1), i = q(!1);
    nt(t, (m) => {
      m && (i.value = !0);
    });
    const n = q(null), o = q({
      visible: !1,
      x: 0,
      y: 0,
      video: null
    });
    function d(m, h) {
      m.preventDefault(), m.stopPropagation(), o.value = {
        visible: !0,
        x: m.clientX,
        y: m.clientY,
        video: h
      };
    }
    function u(m) {
      o.value.video && Nt.sendYouTubeShare({
        id: o.value.video.id,
        title: o.value.video.title,
        cover: o.value.video.thumbnail,
        author: o.value.video.channelTitle,
        views: o.value.video.views,
        url: o.value.video.videoUrl
      }, m), o.value.visible = !1;
    }
    function l() {
      o.value.visible = !1;
    }
    Et(() => {
      window.addEventListener("click", l);
    });
    const s = S, { active: g, standalone: f } = Ft("daily-youtube", "/youtube.html"), T = z(() => g.value && (f || $t.showYouTube));
    let c = !1, R = !1, C;
    nt([T, () => s.currentView], ([m, h], y) => {
      C && !C.signal.aborted && s.isLoading && (R = !0), C?.abort(), C = new AbortController(), (!m || h !== "recommend") && C.abort(), P.setRecommendationViewSignal(C.signal), m && (c || P.init(), h === "favorites" && (s.currentPage = Math.min(s.currentPage, Math.max(1, Math.ceil(V.value.length / s.pageSize))), P.loadFavorites()), h === "recommend" && (!c || R || y?.[1] !== h && !s.exploreVideos.length) && (R = !1, P.loadRecommend()), c = !0);
    }, { immediate: !0, flush: "sync" });
    const V = z(() => s.activeFavGroup === "全部" ? s.favorites : s.favorites.filter((m) => (m.group || "稍后观看") === s.activeFavGroup)), Z = z(() => s.favGroups.filter((m) => m !== "全部" && m !== "稍后观看"));
    function N(m) {
      return m === "全部" ? s.favorites.length : s.favorites.filter((h) => (h.group || "稍后观看") === m).length;
    }
    function F(m) {
      s.activeFavGroup = m, s.currentPage = 1, s.currentView !== "favorites" && O("favorites");
    }
    async function U() {
      const m = window.prompt("请输入新收藏分组名称：");
      !m || !m.trim() || (await P.addFavGroup(m.trim()), s.activeFavGroup = m.trim(), s.currentPage = 1);
    }
    async function B(m) {
      window.confirm(`确定要删除分组「${m}」吗？分组内的视频会保留在「稍后观看」中。`) && (await P.deleteFavGroup(m), s.activeFavGroup === m && (s.activeFavGroup = "全部"));
    }
    const k = z(
      () => Math.max(1, Math.ceil(V.value.length / s.pageSize))
    );
    nt(() => V.value.length, () => {
      T.value && s.currentView === "favorites" && (s.currentPage = Math.min(s.currentPage, k.value));
    });
    const xt = z(() => {
      const m = (s.currentPage - 1) * s.pageSize;
      return V.value.slice(m, m + s.pageSize);
    });
    function G(m) {
      return s.favorites.some((h) => h.id === m);
    }
    function O(m) {
      T.value && (s.currentPage = 1, w.switchView(m));
    }
    function K() {
      T.value && (s.currentPage = 1, w.dispatch("refresh"), ot());
    }
    const Q = q("");
    let dt = null;
    function ht(m) {
      Q.value = m, clearTimeout(dt), dt = setTimeout(() => {
        Q.value = "";
      }, 2200);
    }
    async function it(m) {
      if (!(!T.value || s.favoritesBusy || s.favoritesLoading || s.favoritesNeedsReview))
        try {
          await m();
        } catch {
        }
    }
    async function _t(m) {
      const h = !G(m.id);
      await it(() => P.toggleFavorite(m)), ht(h ? `已收藏：${m.title.slice(0, 18)}…` : "已移出收藏夹");
    }
    async function ft(m) {
      await it(() => P.removeFavorite(m)), ht("已移出收藏夹");
    }
    async function st() {
      await it(() => P.syncYouTubeLikedVideos());
    }
    function mt(m) {
      const h = m.videoUrl || `https://www.youtube.com/watch?v=${m.id}`;
      window.open(h, "_blank", "noopener,noreferrer");
    }
    function ot() {
      const m = document.querySelector(".daily-youtube");
      m && m.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function Ct() {
      s.currentPage > 1 && (s.currentPage--, w.dispatch("page-prev", s.currentPage), ot());
    }
    function St(m) {
      !T.value || s.isLoadingMore || s.isLoading || s.currentPage < m && (s.currentPage++, w.dispatch("page-next", s.currentPage), ot());
    }
    function pt(m) {
      const h = m.target;
      h.src = "assets/nav-youtube.svg";
    }
    return It(() => {
      window.removeEventListener("click", l), C?.abort();
    }), (m, h) => (x(), _("div", {
      class: "vue-youtube-wrapper",
      inert: !T.value
    }, [
      r("section", {
        id: "daily-youtube",
        class: E(["card wide daily-youtube", { "card-fullscreen": a(Yt).activeId === "daily-youtube" }])
      }, [
        r("header", Ht, [
          h[11] || (h[11] = r("span", { class: "bar youtube-red" }, null, -1)),
          h[12] || (h[12] = r("h2", null, "YouTube", -1)),
          r("div", {
            id: "youtube-view-tabs",
            class: "youtube-view-tabs",
            role: "tablist",
            "aria-label": a(v)("youtube.viewAria")
          }, [
            r("button", {
              type: "button",
              role: "tab",
              class: E({ on: a(s).currentView === "favorites" }),
              "aria-selected": a(s).currentView === "favorites",
              onClick: h[0] || (h[0] = (y) => O("favorites"))
            }, b(a(v)("youtube.favCount", { count: a(s).favorites.length })), 11, Jt),
            r("button", {
              type: "button",
              role: "tab",
              class: E({ on: a(s).currentView === "recommend" }),
              "aria-selected": a(s).currentView === "recommend",
              onClick: h[1] || (h[1] = (y) => O("recommend"))
            }, b(a(v)("youtube.forYou")), 11, Zt)
          ], 8, Wt),
          r("button", {
            id: "youtube-refresh",
            class: E(["youtube-refresh icon-btn", { spinning: a(s).isLoading }]),
            type: "button",
            title: a(s).currentView === "recommend" ? a(v)("youtube.refreshRec") : a(v)("youtube.refreshFav"),
            onClick: K
          }, [...h[10] || (h[10] = [
            r("span", { class: "yt-refresh-icon" }, "↻", -1)
          ])], 10, Kt),
          r("div", Qt, [
            r("button", {
              ref_key: "settingsButton",
              ref: n,
              type: "button",
              class: "icon-btn",
              title: a(v)("youtube.settings"),
              "aria-label": a(v)("youtube.settings"),
              "aria-expanded": t.value,
              onClick: h[2] || (h[2] = (y) => t.value = !t.value)
            }, "⚙", 8, Xt),
            i.value ? (x(), yt(a(e), {
              key: 0,
              visible: T.value && t.value,
              anchor: n.value,
              onClose: h[3] || (h[3] = (y) => t.value = !1)
            }, null, 8, ["visible", "anchor"])) : $("", !0)
          ])
        ]),
        r("div", te, [
          r("aside", ee, [
            r("div", ie, [
              r("button", {
                type: "button",
                class: E(["yt-sidebar-nav-btn yt-nav-fav", { on: a(s).currentView === "favorites" }]),
                onClick: h[4] || (h[4] = (y) => O("favorites"))
              }, [
                r("div", se, [
                  h[13] || (h[13] = r("span", { class: "yt-nav-btn-icon" }, "❤️", -1)),
                  r("div", oe, [
                    r("strong", null, b(a(v)("youtube.myFavorites")), 1),
                    r("small", null, b(a(v)("youtube.favVideosCount", { count: a(s).favorites.length })), 1)
                  ])
                ]),
                h[14] || (h[14] = r("span", { class: "yt-nav-btn-badge" }, "FAV", -1))
              ], 2),
              r("button", {
                type: "button",
                class: E(["yt-sidebar-nav-btn yt-nav-rec", { on: a(s).currentView === "recommend" }]),
                onClick: h[5] || (h[5] = (y) => O("recommend"))
              }, [
                r("div", ne, [
                  h[15] || (h[15] = r("span", { class: "yt-nav-btn-icon" }, "✨", -1)),
                  r("div", ae, [
                    r("strong", null, b(a(v)("youtube.forYou")), 1),
                    r("small", null, b(a(v)("youtube.forYouSub")), 1)
                  ])
                ]),
                h[16] || (h[16] = r("span", { class: "yt-nav-btn-badge" }, "FOR YOU", -1))
              ], 2)
            ]),
            r("div", re, [
              r("div", le, [
                h[17] || (h[17] = r("span", { class: "yt-hub-icon" }, "📁", -1)),
                r("div", ue, [
                  r("strong", null, b(a(v)("youtube.groups")), 1),
                  r("small", null, b(a(v)("youtube.groupsSub")), 1)
                ])
              ]),
              r("button", {
                class: "yt-hub-add-btn",
                type: "button",
                title: a(v)("youtube.createGroup"),
                onClick: U
              }, " ＋ ", 8, ce)
            ]),
            r("nav", {
              class: "yt-sidebar-group-list",
              "aria-label": a(v)("youtube.groupsAria")
            }, [
              r("button", {
                type: "button",
                class: E(["yt-group-item", { on: a(s).currentView === "favorites" && a(s).activeFavGroup === "全部" }]),
                onClick: h[6] || (h[6] = (y) => F("全部"))
              }, [
                h[18] || (h[18] = r("i", { class: "yt-group-icon" }, "📌", -1)),
                r("span", he, b(a(v)("youtube.allVideos")), 1),
                r("small", fe, b(a(s).favorites.length), 1)
              ], 2),
              r("button", {
                type: "button",
                class: E(["yt-group-item", { on: a(s).currentView === "favorites" && a(s).activeFavGroup === "稍后观看" }]),
                onClick: h[7] || (h[7] = (y) => F("稍后观看"))
              }, [
                h[19] || (h[19] = r("i", { class: "yt-group-icon" }, "⏳", -1)),
                r("span", me, b(a(v)("youtube.watchLater")), 1),
                r("small", pe, b(N("稍后观看")), 1)
              ], 2),
              (x(!0), _(at, null, rt(Z.value, (y) => (x(), _("div", {
                key: y,
                class: E(["yt-group-item yt-group-custom", { on: a(s).currentView === "favorites" && a(s).activeFavGroup === y }]),
                onClick: (A) => F(y)
              }, [
                h[20] || (h[20] = r("i", { class: "yt-group-icon" }, "📂", -1)),
                r("span", ve, b(y), 1),
                r("small", be, b(N(y)), 1),
                r("button", {
                  class: "yt-group-del-btn",
                  type: "button",
                  title: a(v)("youtube.deleteGroup"),
                  onClick: D((A) => B(y), ["stop"])
                }, " ✕ ", 8, we)
              ], 10, ye))), 128))
            ], 8, de),
            r("div", ge, [
              r("button", {
                class: "yt-sidebar-sync-btn",
                type: "button",
                title: a(v)("youtube.syncLikedTitle"),
                disabled: a(s).favoritesBusy || a(s).favoritesLoading || a(s).favoritesNeedsReview,
                onClick: st
              }, [
                h[21] || (h[21] = r("span", { class: "yt-sync-icon" }, "🔄", -1)),
                r("span", null, b(a(v)("youtube.syncLiked")), 1)
              ], 8, Te)
            ])
          ]),
          r("main", xe, [
            vt(r("div", _e, [
              a(s).isLoading && a(s).exploreVideos.length === 0 ? (x(), _("div", Ce, [
                h[22] || (h[22] = r("i", { class: "yt-spinner" }, null, -1)),
                r("span", null, b(a(v)("youtube.recGenerating")), 1)
              ])) : a(s).error && a(s).exploreVideos.length === 0 ? (x(), _("div", Se, [
                r("p", null, "⚠️ " + b(a(s).error), 1),
                r("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  onClick: K
                }, b(a(v)("youtube.recReload")), 1)
              ])) : a(s).exploreVideos.length === 0 ? (x(), _("div", ke, [
                r("p", null, b(a(v)("youtube.recSyncing")), 1),
                r("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  style: { "margin-top": "8px" },
                  onClick: K
                }, b(a(v)("youtube.recReload")), 1)
              ])) : (x(), _("div", Ee, [
                r("div", Ie, [
                  r("span", Ve, b(a(v)("youtube.recCurBatch")), 1),
                  r("span", Ae, b(a(v)("youtube.recFavTip")), 1)
                ]),
                r("div", Re, [
                  (x(!0), _(at, null, rt(a(s).exploreVideos, (y) => (x(), _("article", {
                    key: "rec-" + y.id,
                    class: "yt-card",
                    onClick: (A) => mt(y),
                    onContextmenu: (A) => d(A, y)
                  }, [
                    r("div", Pe, [
                      r("img", {
                        src: y.thumbnail,
                        alt: y.title,
                        loading: "lazy",
                        onError: pt
                      }, null, 40, Fe),
                      r("button", {
                        class: E(["yt-fav-badge", { "is-fav": G(y.id) }]),
                        type: "button",
                        disabled: a(s).favoritesBusy || a(s).favoritesLoading || a(s).favoritesNeedsReview,
                        title: G(y.id) ? a(v)("youtube.favRemoveTip") : a(v)("youtube.favAddTip"),
                        onClick: D((A) => _t(y), ["stop"])
                      }, [
                        r("span", Ne, b(G(y.id) ? "❤️" : "🤍"), 1),
                        r("span", $e, b(G(y.id) ? a(v)("youtube.favorited") : a(v)("youtube.favorite")), 1)
                      ], 10, Ye),
                      y.views ? (x(), _("span", Me, b(y.views), 1)) : $("", !0)
                    ]),
                    r("div", Ue, [
                      r("h4", {
                        class: "yt-title",
                        title: y.title
                      }, b(y.title), 9, Be),
                      r("div", Ge, [
                        r("span", {
                          class: "yt-channel",
                          title: y.channelTitle
                        }, b(y.channelTitle), 9, Oe),
                        r("span", De, b(y.publishedAt) + " ↗", 1)
                      ])
                    ])
                  ], 40, Le))), 128))
                ]),
                r("div", qe, [
                  r("button", {
                    type: "button",
                    class: E(["yt-next-batch-btn", { spinning: a(s).isLoading }]),
                    disabled: a(s).isLoading,
                    onClick: K
                  }, [
                    h[23] || (h[23] = r("span", { class: "yt-next-batch-icon" }, "↻", -1)),
                    r("span", je, b(a(s).isLoading ? a(v)("youtube.recLoadingNext") : a(v)("youtube.recNextBatch")), 1)
                  ], 10, ze)
                ])
              ]))
            ], 512), [
              [bt, a(s).currentView === "recommend"]
            ]),
            vt(r("div", He, [
              r("div", We, [
                r("div", Je, [
                  r("strong", Ze, "📁 " + b(a(s).activeFavGroup === "全部" ? a(v)("youtube.all") : a(s).activeFavGroup === "稍后观看" ? a(v)("youtube.watchLater") : a(s).activeFavGroup), 1),
                  r("span", Ke, b(a(v)("youtube.favSummary", { count: V.value.length })), 1)
                ]),
                r("div", Qe, [
                  r("button", {
                    class: "yt-sync-btn",
                    type: "button",
                    title: a(v)("youtube.syncLikedTitle"),
                    disabled: a(s).favoritesBusy || a(s).favoritesLoading || a(s).favoritesNeedsReview,
                    onClick: st
                  }, " 🔄 " + b(a(v)("youtube.syncLiked")), 9, Xe)
                ])
              ]),
              a(s).favoritesLoading ? (x(), _("div", ti, [
                h[24] || (h[24] = r("i", { class: "yt-spinner" }, null, -1)),
                r("span", null, b(a(v)("youtube.updatingFavs")), 1)
              ])) : V.value.length === 0 ? (x(), _("div", ei, [
                h[25] || (h[25] = r("span", { class: "yt-empty-icon" }, "📺", -1)),
                r("p", null, b(a(v)("youtube.emptyGroup", { group: a(s).activeFavGroup === "全部" ? a(v)("youtube.all") : a(s).activeFavGroup === "稍后观看" ? a(v)("youtube.watchLater") : a(s).activeFavGroup })), 1),
                r("p", ii, b(a(v)("youtube.emptyGroupSub")), 1),
                r("button", {
                  type: "button",
                  class: "yt-sync-btn yt-empty-sync-btn",
                  disabled: a(s).favoritesBusy || a(s).favoritesLoading || a(s).favoritesNeedsReview,
                  onClick: st
                }, b(a(v)("youtube.syncLikedNow")), 9, si)
              ])) : (x(), _("div", oi, [
                (x(!0), _(at, null, rt(xt.value, (y) => (x(), _("article", {
                  key: "fav-" + y.id,
                  class: "yt-card",
                  onClick: (A) => mt(y),
                  onContextmenu: (A) => d(A, y)
                }, [
                  r("div", ai, [
                    r("img", {
                      src: y.thumbnail,
                      alt: y.title,
                      loading: "lazy",
                      onError: pt
                    }, null, 40, ri),
                    r("button", {
                      class: "yt-fav-badge is-fav",
                      type: "button",
                      disabled: a(s).favoritesBusy || a(s).favoritesLoading || a(s).favoritesNeedsReview,
                      title: a(v)("youtube.removeFromFav"),
                      onClick: D((A) => ft(y.id), ["stop"])
                    }, [
                      h[26] || (h[26] = r("span", { class: "yt-fav-icon" }, "❤️", -1)),
                      r("span", ui, b(a(v)("youtube.remove")), 1)
                    ], 8, li),
                    y.views ? (x(), _("span", ci, b(y.views), 1)) : $("", !0)
                  ]),
                  r("div", di, [
                    r("h4", {
                      class: "yt-title",
                      title: y.title
                    }, b(y.title), 9, hi),
                    r("div", fi, [
                      r("span", {
                        class: "yt-channel",
                        title: y.channelTitle
                      }, b(y.channelTitle), 9, mi),
                      r("div", pi, [
                        r("span", yi, b(y.publishedAt || a(v)("youtube.favorited")), 1),
                        r("button", {
                          class: "yt-del-fav-btn",
                          type: "button",
                          disabled: a(s).favoritesBusy || a(s).favoritesLoading || a(s).favoritesNeedsReview,
                          title: a(v)("youtube.deleteFromFav"),
                          onClick: D((A) => ft(y.id), ["stop"])
                        }, " 🗑️ ", 8, vi)
                      ])
                    ])
                  ])
                ], 40, ni))), 128))
              ])),
              k.value > 1 ? (x(), _("nav", bi, [
                r("button", {
                  type: "button",
                  disabled: a(s).currentPage <= 1,
                  onClick: Ct
                }, b(a(v)("youtube.prevPage")), 9, wi),
                r("span", null, b(a(v)("youtube.pageInfo", { current: a(s).currentPage, total: k.value, count: V.value.length })), 1),
                r("button", {
                  type: "button",
                  disabled: a(s).currentPage >= k.value,
                  onClick: h[8] || (h[8] = (y) => St(k.value))
                }, b(a(v)("youtube.nextPage")), 9, gi)
              ])) : $("", !0)
            ], 512), [
              [bt, a(s).currentView === "favorites"]
            ])
          ])
        ])
      ], 2),
      wt(At, { name: "yt-toast-fade" }, {
        default: Vt(() => [
          Q.value ? (x(), _("div", Ti, b(Q.value), 1)) : $("", !0)
        ]),
        _: 1
      }),
      (x(), yt(Lt, { to: "body" }, [
        o.value.visible ? (x(), _("div", {
          key: 0,
          class: "yt-context-menu",
          style: Rt({ left: `${Math.min(o.value.x, 600)}px`, top: `${Math.min(o.value.y, 400)}px` }),
          onClick: h[9] || (h[9] = D(() => {
          }, ["stop"]))
        }, [
          r("div", xi, b(o.value.video?.title), 1),
          wt(Mt, {
            label: "💬 发送到聊天室",
            visible: o.value.visible,
            onSelect: u
          }, null, 8, ["visible"])
        ], 4)) : $("", !0)
      ]))
    ], 8, jt));
  }
}), Ci = /* @__PURE__ */ Ut(_i, [["__scopeId", "data-v-ac49e29e"]]), Li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ci
}, Symbol.toStringTag, { value: "Module" }));
export {
  Li as Y,
  P as y
};
