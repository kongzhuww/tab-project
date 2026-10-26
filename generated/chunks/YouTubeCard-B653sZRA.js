import { d as Et, x as ot, C as kt, L as It, e as x, f as a, u as f, B as E, t as g, c as pt, g as F, m as Vt, F as nt, h as at, l as yt, z as vt, D as bt, w as Rt, T as At, i as G, A as Lt, j as Pt, b as D, s as q, o as T, E as Ft } from "./vendor-vue-DokqDua_.js";
import { u as Yt } from "./useCardActivity-BlsuGUOo.js";
import { o as Nt, y as Mt, r as $t } from "./view-styles-BVg88bAF.js";
import { y as v, g as _ } from "./youtube-store-g5iUTDFb.js";
import { C as Ut } from "./ChatShareMenu-D7qIImNo.js";
import { _ as Bt } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const W = "youtubeFavoritesV1", H = "youtubeFavGroupsV1";
async function Ot() {
  if (typeof chrome < "u" && chrome.storage?.local)
    return new Promise((e, t) => {
      chrome.storage.local.get([W, H], (s) => {
        chrome.runtime.lastError ? t(new Error("收藏存储读取失败")) : e(s);
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
  const p = await Ot(), e = p[W] === void 0 ? [] : p[W], t = p[H] === void 0 ? ["全部", "稍后观看"] : p[H];
  if (!Array.isArray(e) || !e.every((s) => s && typeof s.id == "string" && typeof s.title == "string"))
    throw new Error("收藏数据格式异常，未覆盖原记录");
  if (!Array.isArray(t) || !t.every((s) => typeof s == "string")) throw new Error("收藏分组格式异常，未覆盖原记录");
  return { favorites: e.map((s) => ({ ...s })), groups: [...t] };
}
function tt(p) {
  return Array.isArray(p) ? p.map(tt) : p && typeof p == "object" ? Object.fromEntries(Object.keys(p).sort().filter((e) => p[e] !== void 0).map((e) => [e, tt(p[e])])) : p;
}
async function Gt(p) {
  const e = { [W]: p.favorites, [H]: p.groups };
  if (typeof chrome < "u" && chrome.storage?.local)
    await new Promise((s, n) => {
      chrome.storage.local.set(e, () => {
        chrome.runtime.lastError ? n(new Error("收藏保存结果未确认")) : s();
      });
    });
  else
    for (const [s, n] of Object.entries(e)) localStorage.setItem(s, JSON.stringify(n));
  const t = await X();
  if (JSON.stringify(tt(t)) !== JSON.stringify(tt(p))) throw new Error("收藏保存后的核对不一致，请重读确认");
}
async function L(p, e, t = 8e3) {
  return e?.throwIfAborted(), new Promise((s, n) => {
    let o = !1;
    const d = (i, b) => {
      o || (o = !0, clearTimeout(r), e?.removeEventListener("abort", l), i ? n(i) : s(b));
    }, l = () => d(new DOMException("Read cancelled", "AbortError")), r = setTimeout(() => d(new Error("YouTube read timeout")), t);
    if (e?.addEventListener("abort", l, { once: !0 }), e?.aborted) {
      l();
      return;
    }
    try {
      if (typeof chrome > "u" || !chrome.runtime?.sendMessage) throw new Error("Extension transport unavailable");
      chrome.runtime.sendMessage(p, (i) => {
        const b = chrome.runtime.lastError;
        o || (b || !i?.ok ? d(new Error("YouTube background read failed")) : d(void 0, i));
      });
    } catch {
      d(new Error("YouTube background transport unavailable"));
    }
  });
}
async function rt(p, e, t, s = 8e3) {
  t?.throwIfAborted();
  const n = new AbortController(), o = () => n.abort();
  t?.addEventListener("abort", o, { once: !0 });
  const d = setTimeout(o, s);
  try {
    const l = await fetch(p, { ...e, signal: n.signal });
    if (!l.ok) throw new Error(`HTTP ${l.status}`);
    const r = await l.text();
    return n.signal.throwIfAborted(), r;
  } finally {
    clearTimeout(d), t?.removeEventListener("abort", o);
  }
}
const z = "youtubeRssChannelsV1", Q = "youtubeCustomGroupsV1", lt = "youtubeRssVideosCacheV1", M = "youtubePlaylistsV1", ut = "youtubeRecommendBatchV1", Dt = 900 * 1e3, qt = ["默认"], zt = [];
function j(p) {
  return new Promise((e) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(p, e);
    else {
      const t = {};
      p.forEach((s) => {
        try {
          const n = localStorage.getItem(s);
          n && (t[s] = JSON.parse(n));
        } catch {
        }
      }), e(t);
    }
  });
}
function k(p) {
  return new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local ? chrome.storage.local.set(p, e) : (Object.entries(p).forEach(([t, s]) => {
      try {
        localStorage.setItem(t, JSON.stringify(s));
      } catch {
      }
    }), e());
  });
}
function wt(p) {
  if (!p) return 0;
  const e = new Date(p).getTime();
  if (!isNaN(e) && e > 0) return e;
  const t = Date.now(), s = String(p).match(/(\d+)\s*(秒|分|小时|天|周|月|年|second|minute|hour|day|week|month|year)/i);
  if (!s) return t - 864e5 * 30;
  const n = parseInt(s[1], 10), o = s[2].toLowerCase();
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
  const s = Math.floor(t / 60);
  if (s < 24) return `${s} 小时前`;
  const n = Math.floor(s / 24);
  return n < 30 ? `${n} 天前` : new Date(e).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}
function Y(p) {
  if (!p) return "";
  const e = typeof p == "number" ? p : parseInt(String(p).replace(/,/g, ""), 10);
  return isNaN(e) ? String(p) : e >= 1e8 ? `${(e / 1e8).toFixed(1)}亿次观看` : e >= 1e4 ? `${(e / 1e4).toFixed(1)}万次观看` : e >= 1e3 ? `${(e / 1e3).toFixed(1)}k次观看` : `${e}次观看`;
}
class jt {
  constructor() {
    this.channels = [], this.channelsLoaded = !1, this.initialized = !1, this.groups = [], this.groupsLoaded = !1, this.favorites = [], this.favoritesLoaded = !1, this.favoriteReadVersion = 0, this.playlists = [], this.playlistsLoaded = !1, this.exploreCache = {}, this.recommendGeneration = 0, this.recommendationRead = null, this.recommendSignature = "", this.lastContinuationToken = "", this.recommendPool = [], this.shownVideoIds = /* @__PURE__ */ new Set(), this.RECOMMEND_PAGE_SIZE = 18, this.hasAutoSynced = !1;
  }
  setRecommendationViewSignal(e) {
    this.recommendationViewSignal = e;
  }
  beginRecommendationRead(e) {
    e?.throwIfAborted(), this.recommendationRead?.abort();
    const t = new AbortController(), s = ++this.recommendGeneration;
    this.recommendationRead = t;
    const n = () => s === this.recommendGeneration && !t.signal.aborted, o = () => {
      t.abort(), s === this.recommendGeneration && v.updateState({ isLoading: !1, isLoadingMore: !1 });
    };
    e?.addEventListener("abort", o, { once: !0 });
    const d = setTimeout(() => {
      s === this.recommendGeneration && v.updateState({ error: "推荐读取超时，请手动刷新。" }), o();
    }, 45e3);
    return {
      signal: t.signal,
      current: n,
      finish: () => {
        clearTimeout(d), e?.removeEventListener("abort", o), s === this.recommendGeneration && (this.recommendationRead = null, v.updateState({ isLoading: !1, isLoadingMore: !1 }));
      }
    };
  }
  // -------------------------------------------------------------
  // 1. 频道与分组管理
  // -------------------------------------------------------------
  async loadGroups() {
    if (this.groupsLoaded) return this.groups;
    const e = await j([Q]), t = (Array.isArray(e[Q]) ? e[Q] : []).filter((o) => o !== "ASMR·癒し" && o !== "AI与前沿"), s = this.channels.map((o) => o.group || "默认"), n = /* @__PURE__ */ new Set([...qt, ...s, ...t]);
    return this.groups = Array.from(n).filter(Boolean), this.groupsLoaded = !0, v.updateState({ groups: this.groups }), this.groups;
  }
  async saveGroups(e) {
    e && (this.groups = e), await k({ [Q]: this.groups }), v.updateState({ groups: this.groups });
  }
  async loadChannels() {
    if (this.channelsLoaded) return this.channels;
    let t = (await j([z]))[z];
    const s = /* @__PURE__ */ new Set([
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
    !Array.isArray(t) || t.length === 0 ? (t = [], await k({ [z]: t })) : (t = t.filter((o) => !s.has(o.id)), await k({ [z]: t })), this.channels = t, this.channelsLoaded = !0;
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
    const t = this.channels.map((s) => ({
      id: s.id,
      title: s.name,
      handle: s.handle,
      group: s.group || "默认",
      thumbnail: s.thumbnail
    }));
    v.updateState({ channels: t }), await this.loadGroups();
  }
  async addChannel(e) {
    await this.loadChannels();
    let t = "", s = "", n = "默认", o = "";
    if (typeof e == "string" ? t = e.trim() : (t = e.id.trim(), s = e.name?.trim() || "", n = e.group?.trim() || "默认", o = e.handle?.trim() || ""), t.includes("@") || t.startsWith("http"))
      try {
        const l = t.match(/@([a-zA-Z0-9_.-]+)/);
        l && (o = `@${l[1]}`);
        const r = o ? `https://www.youtube.com/${o}` : t, b = (await new Promise((u) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: r }, u);
        }))?.html || "", h = b.match(/channel_id=(UC[a-zA-Z0-9_-]+)/) || b.match(/"channelId":"(UC[a-zA-Z0-9_-]+)"/);
        h && (t = h[1]);
        const w = b.match(/<title>(.*?) - YouTube<\/title>/i) || b.match(/<title>(.*?)<\/title>/i);
        w && !s && (s = w[1].trim());
      } catch {
      }
    return t.startsWith("UC") ? (s || (s = o || t), this.channels.some((l) => l.id === t) ? !1 : (this.channels.push({ id: t, name: s, group: n, handle: o }), await this.saveChannels(), !0)) : !1;
  }
  async removeChannel(e) {
    await this.loadChannels();
    const t = this.channels.length;
    return this.channels = this.channels.filter((s) => s.id !== e), this.channels.length !== t ? (await this.saveChannels(), !0) : !1;
  }
  /**
   * 从当前浏览器登录的 YouTube 账号自动同步关注的所有频道
   */
  async syncSubscribedChannels() {
    v.updateState({ isLoading: !0, error: "" });
    try {
      let e = "";
      try {
        e = await new Promise((r, i) => {
          chrome?.runtime?.sendMessage?.({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/feed/channels" }, (b) => {
            b && b.ok && b.html ? r(b.html) : i(new Error(b?.error || "后台请求失败"));
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
      const s = JSON.parse(t[1]), n = [], o = /* @__PURE__ */ new Set(), d = (r) => {
        if (!(!r || typeof r != "object")) {
          if (r.channelRenderer) {
            const i = r.channelRenderer, b = i.channelId, h = i.title?.simpleText || i.title?.runs?.[0]?.text;
            b && h && !o.has(b) && (o.add(b), n.push({
              id: b,
              name: h,
              group: "YouTube 关注",
              thumbnail: i.thumbnail?.thumbnails?.[0]?.url
            }));
          }
          for (const i of Object.keys(r)) d(r[i]);
        }
      };
      if (d(s), n.length === 0)
        throw new Error("未解析到关注频道，请确认是否已登录 YouTube");
      await this.loadChannels();
      let l = 0;
      for (const r of n)
        this.channels.some((i) => i.id === r.id) || (this.channels.push(r), l++);
      return await this.saveChannels(), await this.loadUpdates(!0), l;
    } catch (e) {
      throw v.updateState({ isLoading: !1, error: e?.message || "同步关注频道失败" }), e;
    }
  }
  parseOpml(e) {
    const t = new DOMParser().parseFromString(e, "application/xml"), s = Array.from(t.querySelectorAll("outline[xmlUrl], outline[xmlurl]")), n = [];
    return s.forEach((o) => {
      const l = (o.getAttribute("xmlUrl") || o.getAttribute("xmlurl") || "").match(/channel_id=([a-zA-Z0-9_-]+)/);
      if (l) {
        const r = l[1], i = (o.getAttribute("title") || o.getAttribute("text") || "YouTube 频道").trim();
        n.push({ id: r, name: i, group: "导入" });
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
      const s = (t.name || "YouTube Channel").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      e.push(
        `      <outline text="${s}" title="${s}" type="rss" xmlUrl="https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(t.id)}"/>`
      );
    }), e.push("    </outline>", "  </body>", "</opml>"), e.join(`
`);
  }
  // -------------------------------------------------------------
  // 2. 官方原生 XML / RSS 极速免配额解析引擎（通过后台保证无 CORS 限制）
  // -------------------------------------------------------------
  async fetchChannelVideosFromRss(e, t = "", s) {
    const n = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(e)}`;
    try {
      let o = "";
      try {
        if (o = (await L({ type: "fetchYouTubeHtml", url: n }, s)).html, typeof o != "string") throw new Error("Invalid RSS response");
      } catch {
        s?.throwIfAborted(), o = await rt(n, { cache: "no-store", referrerPolicy: "no-referrer" }, s, 6e3);
      }
      return s?.throwIfAborted(), this.parseRssXml(o, t, e);
    } catch {
      return s?.throwIfAborted(), [];
    }
  }
  async fetchPlaylistVideos(e) {
    const t = e.replace(/^https?:\/\/.*?list=/i, "").replace(/^VL/i, "").trim(), s = `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(t)}`, n = new AbortController(), o = setTimeout(() => n.abort(), 8e3);
    try {
      const d = await fetch(s, { signal: n.signal, cache: "no-store", referrerPolicy: "no-referrer" });
      if (clearTimeout(o), !d.ok) throw new Error(`HTTP ${d.status}`);
      const l = await d.text(), r = this.parseRssXml(l, "播放列表");
      return v.updateState({ playlistVideos: r, activePlaylistId: t }), r;
    } finally {
      clearTimeout(o);
    }
  }
  parseRssXml(e, t = "YouTube", s = "") {
    const n = new DOMParser().parseFromString(e, "application/xml"), o = n.querySelector("feed > title")?.textContent || t;
    return Array.from(n.querySelectorAll("entry")).map((l) => {
      const r = l.getElementsByTagNameNS("http://www.youtube.com/xml/schemas/2015", "videoId")[0]?.textContent || l.querySelector("videoId")?.textContent || (l.querySelector("id")?.textContent || "").replace(/^yt:video:/, ""), i = l.querySelector("title")?.textContent || "YouTube 视频", b = l.querySelector("author > name")?.textContent || o, h = l.querySelector("published")?.textContent || "", w = l.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "group")[0] || l.querySelector("group"), A = (w?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0] || w?.querySelector("thumbnail"))?.getAttribute("url") || (r ? `https://i.ytimg.com/vi/${r}/hqdefault.jpg` : ""), C = w?.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "statistics")[0]?.getAttribute("views") || "";
      return {
        id: r,
        title: i,
        channelTitle: b,
        channelId: s || l.querySelector("channelId")?.textContent || "",
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
      if (t?.items?.length && Date.now() - Number(t.savedAt || 0) < Dt) {
        const s = t.items.map((n) => ({
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
          videos: s,
          isLoading: !1,
          userName: `已订阅 ${this.channels.length} 个频道`
        }), s;
      }
    }
    if (!this.channels.length)
      return v.updateState({ videos: [], isLoading: !1 }), [];
    try {
      const s = [];
      for (let l = 0; l < this.channels.length; l += 5) {
        const r = this.channels.slice(l, l + 5), i = await Promise.all(
          r.map(async (b) => {
            try {
              return (await this.fetchChannelVideosFromRss(b.id, b.name)).map((w) => ({ ...w, group: b.group || "默认" }));
            } catch {
              return [];
            }
          })
        );
        s.push(...i);
      }
      const n = /* @__PURE__ */ new Set(), o = [];
      s.flat().forEach((l) => {
        l?.id && !n.has(l.id) && (n.add(l.id), o.push(l));
      }), o.sort((l, r) => {
        const i = wt(l.publishedAt);
        return wt(r.publishedAt) - i;
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
      const t = (await j([ut]))[ut];
      if (t && Array.isArray(t.videos) && t.videos.length > 0)
        return t;
    } catch {
    }
    return null;
  }
  async saveCachedRecommendBatch(e, t) {
    if (!(!e || !e.length))
      try {
        const s = {
          savedAt: Date.now(),
          userName: t,
          videos: e
        };
        await k({ [ut]: s });
      } catch {
      }
  }
  async loadRecommend(e = !1, t = this.recommendationViewSignal) {
    if (t?.aborted) return [];
    const s = this.beginRecommendationRead(t), n = s.current;
    try {
      if (!e && _.exploreVideos.length > 0)
        return _.exploreVideos;
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
          const d = await this.fetchContinuationVideos(this.lastContinuationToken, s.signal);
          if (n())
            for (const l of d)
              !this.shownVideoIds.has(l.id) && !this.recommendPool.some((r) => r.id === l.id) && this.recommendPool.push(l);
        } catch {
        }
      if (this.recommendPool.length < this.RECOMMEND_PAGE_SIZE) {
        const d = { token: "" }, l = await this.fetchPersonalRecommendations(s.signal, d);
        if (!n()) return [];
        this.lastContinuationToken = d.token;
        const r = l.filter((b) => !this.shownVideoIds.has(b.id)), i = r.length >= 10 ? r : l;
        i === l && this.shownVideoIds.clear();
        for (const b of i)
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
      s.finish();
    }
  }
  async fetchContinuationVideos(e, t) {
    if (!e) return [];
    const s = { token: "" };
    try {
      const n = await L({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: e }
      }, t, 4500), o = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(n.data)};<\/script>`, s);
      return this.lastContinuationToken = s.token === e ? "" : s.token, o;
    } catch {
      return [];
    }
  }
  /**
   * 从 HTML 或 InnerTube JSON 提取完整的 YouTube 视频结构（全面适配最新 2024+ lockupViewModel、桌面端 videoRenderer、playlistVideoRenderer、并彻底过滤广告）
   */
  extractVideosFromHtml(e, t) {
    t && (t.token = "");
    const s = e.match(/(?:window\["ytInitialData"\]|var ytInitialData|ytInitialData)\s*=\s*({.+?});(?:\s*<\/script>|\s*var|\s*window)/) || e.match(/var ytInitialData\s*=\s*({.+?});<\/script>/) || e.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
    if (!s) return [];
    try {
      const n = JSON.parse(s[1]), o = [], d = /* @__PURE__ */ new Set(), l = (h) => {
        !h || !h.id || d.has(h.id) || (d.add(h.id), o.push(h));
      }, r = (h) => {
        if (!h || typeof h != "object") return !1;
        if (h.adSlotRenderer || h.inFeedAdLayoutRenderer || h.promotedSparklesWebRenderer || h.promotedVideoRenderer || h.statementBannerRenderer || h.adBreakRenderer) return !0;
        const w = JSON.stringify(
          h.badges || h.badge || h.navigationEndpoint || h.contentType || h.layoutType || ""
        ).toLowerCase();
        return !!(w.includes("sponsored") || w.includes("广告") || w.includes("赞助") || w.includes("promoted"));
      }, i = (h) => {
        if (!h || r(h)) return null;
        const w = h.contentId || h.rendererContext?.commandContext?.onTap?.innertubeCommand?.watchEndpoint?.videoId;
        if (!w || typeof w != "string" || w.length < 8) return null;
        const u = h.metadata?.lockupMetadataViewModel, A = u?.title?.content || u?.title?.runs?.[0]?.text || u?.title?.simpleText || h.contentImage?.thumbnailViewModel?.image?.accessibilityText || "YouTube 视频";
        let C = "", I = "", J = "";
        const N = u?.metadata?.contentMetadataViewModel?.metadataRows;
        if (Array.isArray(N)) {
          const U = N[0]?.metadataParts;
          Array.isArray(U) && U[0]?.text?.content && (C = U[0].text.content);
          const S = N[1]?.metadataParts;
          Array.isArray(S) && (S[0]?.text?.content && (I = S[0].text.content), S[1]?.text?.content && (J = S[1].text.content));
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
            l(i(h.lockupViewModel));
            return;
          }
          if (h.videoRenderer && !r(h.videoRenderer)) {
            const u = h.videoRenderer;
            if (u && u.videoId) {
              l({
                id: u.videoId,
                title: u.title?.runs?.[0]?.text || u.title?.simpleText || "YouTube 视频",
                channelTitle: u.ownerText?.runs?.[0]?.text || u.shortBylineText?.runs?.[0]?.text || u.longBylineText?.runs?.[0]?.text || "YouTube 频道",
                channelId: u.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || u.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: u.publishedTimeText?.simpleText || "",
                views: Y(u.viewCountText?.simpleText || u.shortViewCountText?.simpleText),
                thumbnail: u.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${u.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${u.videoId}`
              });
              return;
            }
          }
          if (h.playlistVideoRenderer && !r(h.playlistVideoRenderer)) {
            const u = h.playlistVideoRenderer;
            if (u && u.videoId) {
              const A = u.videoInfo?.runs?.[0]?.text || "", C = u.videoInfo?.runs?.[2]?.text || u.videoInfo?.runs?.[1]?.text || "";
              l({
                id: u.videoId,
                title: u.title?.runs?.[0]?.text || u.title?.simpleText || "YouTube 视频",
                channelTitle: u.shortBylineText?.runs?.[0]?.text || u.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: u.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: C || u.lengthText?.simpleText || "",
                views: Y(A),
                thumbnail: u.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${u.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${u.videoId}`
              });
              return;
            }
          }
          if (h.gridVideoRenderer && !r(h.gridVideoRenderer)) {
            const u = h.gridVideoRenderer;
            if (u && u.videoId) {
              l({
                id: u.videoId,
                title: u.title?.runs?.[0]?.text || u.title?.simpleText || "YouTube 视频",
                channelTitle: u.shortBylineText?.runs?.[0]?.text || u.ownerText?.runs?.[0]?.text || "YouTube 频道",
                channelId: u.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: u.publishedTimeText?.simpleText || "",
                views: Y(u.viewCountText?.simpleText),
                thumbnail: u.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${u.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${u.videoId}`
              });
              return;
            }
          }
          if (h.compactVideoRenderer && !r(h.compactVideoRenderer)) {
            const u = h.compactVideoRenderer;
            if (u && u.videoId) {
              l({
                id: u.videoId,
                title: u.title?.runs?.[0]?.text || u.title?.simpleText || "YouTube 视频",
                channelTitle: u.shortBylineText?.runs?.[0]?.text || u.longBylineText?.runs?.[0]?.text || "YouTube 频道",
                channelId: u.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || "",
                publishedAt: u.publishedTimeText?.simpleText || "",
                views: Y(u.viewCountText?.simpleText),
                thumbnail: u.thumbnail?.thumbnails?.slice(-1)[0]?.url || `https://i.ytimg.com/vi/${u.videoId}/hqdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${u.videoId}`
              });
              return;
            }
          }
          if (h.continuationItemRenderer) {
            const u = h.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token || h.continuationItemRenderer?.continuationEndpoint?.browseEndpoint?.continuationCommand?.token;
            u && typeof u == "string" && t && (t.token = u);
          }
          for (const u of Object.keys(h))
            typeof h[u] == "object" && b(h[u], w + 1);
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
    let s = [];
    try {
      const o = await L({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { browseId: "FEwhat_to_watch" }
      }, e, 3500);
      e?.throwIfAborted(), s = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(o.data)};<\/script>`, t);
    } catch {
      e?.throwIfAborted();
    }
    if (!s.length) {
      let o;
      try {
        if (o = (await L({ type: "fetchYouTubeHtml", url: "https://www.youtube.com/" }, e, 15e3)).html, typeof o != "string") throw new Error("Invalid homepage response");
      } catch {
        e?.throwIfAborted(), o = await rt("https://www.youtube.com/", {
          credentials: "include",
          headers: { "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7" }
        }, e);
      }
      e?.throwIfAborted(), s = this.extractVideosFromHtml(o, t);
    }
    const n = /* @__PURE__ */ new Set();
    for (let o = 0; o < 3 && s.length < 56 && t.token; o++) {
      e?.throwIfAborted();
      const d = t.token;
      if (n.has(d)) {
        t.token = "";
        break;
      }
      n.add(d);
      try {
        const l = await L({
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
        for (const i of r) s.some((b) => b.id === i.id) || s.push(i);
      } catch {
        e?.throwIfAborted();
        break;
      }
    }
    return s;
  }
  async loadMoreExploreVideos(e = this.recommendationViewSignal) {
    if (e?.aborted || this.recommendationRead || !this.lastContinuationToken) return 0;
    const t = this.lastContinuationToken, s = this.beginRecommendationRead(e), n = { token: "" };
    v.updateState({ isLoadingMore: !0, error: "" });
    try {
      const o = await L({
        type: "fetchYouTubeInnerTube",
        endpoint: "browse",
        payload: { continuation: t }
      }, s.signal);
      if (!s.current()) return 0;
      const d = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(o.data)};<\/script>`, n), l = [..._.exploreVideos];
      for (const i of d) l.some((b) => b.id === i.id) || l.push(i);
      const r = l.length - _.exploreVideos.length;
      if (r) {
        if (await k({ logicweaver_youtube_explore_cache: l }), !s.current()) return 0;
        this.exploreCache.recommend = l, v.updateState({ exploreVideos: l });
      }
      return this.lastContinuationToken = n.token === t ? "" : n.token, r;
    } catch {
      return s.current() && v.updateState({ error: "追加推荐失败，当前列表保留；可手动重试。" }), 0;
    } finally {
      s.finish();
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
    return this.mutateFavorites(async (s) => {
      let n = [];
      const o = e === "LL" ? "VLLL" : "VLWL";
      try {
        const r = await L({
          type: "fetchYouTubeInnerTube",
          endpoint: "browse",
          payload: { browseId: o }
        }, void 0, 8e3);
        if (r && r.data) {
          const i = { token: "" };
          if (n = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(r.data)};<\/script>`, i), i.token && n.length < 50)
            try {
              const b = await L({
                type: "fetchYouTubeInnerTube",
                endpoint: "browse",
                payload: { continuation: i.token }
              }, void 0, 6e3);
              if (b && b.data) {
                const h = this.extractVideosFromHtml(`var ytInitialData = ${JSON.stringify(b.data)};<\/script>`);
                for (const w of h)
                  n.some((u) => u.id === w.id) || n.push(w);
              }
            } catch {
            }
        }
      } catch {
      }
      if (!n.length) {
        let r = "";
        try {
          r = (await L({
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
      Object.assign(s, await X());
      let d = 0;
      const l = new Set(s.favorites.map((r) => r.id));
      for (const r of n)
        l.has(r.id) || (l.add(r.id), s.favorites.unshift({ ...r, group: t, savedAt: Date.now() }), d++);
      return s.groups.includes(t) || s.groups.push(t), d;
    }, (s) => `同步完成！已成功抓取 ${s} 个视频并存入「${t}」。`);
  }
  async mutateFavorites(e, t) {
    if (_.favoritesBusy) throw new Error("另一个收藏操作正在处理，请稍后再操作");
    if (_.favoritesNeedsReview) throw new Error("上次结果未确认，请先点击重读收藏");
    v.updateState({ favoritesBusy: !0, favoritesLoading: !1, favoriteMessage: "正在处理收藏，请勿重复提交…" }), ++this.favoriteReadVersion;
    let s = !1;
    try {
      const n = await X(), o = await e(n);
      return s = !0, await Gt(n), this.favorites = n.favorites.map((d) => ({ ...d })), this.favoritesLoaded = !0, v.updateState({
        favorites: this.favorites.map((d) => ({ ...d })),
        favGroups: [...n.groups],
        activeFavGroup: n.groups.includes(_.activeFavGroup) ? _.activeFavGroup : "全部",
        favoriteMessage: t(o)
      }), o;
    } catch (n) {
      throw this.favoritesLoaded = !1, v.updateState({
        favoritesNeedsReview: !0,
        favoriteMessage: s ? "收藏保存结果未确认，未自动重试。当前显示保留旧记录；请先重读收藏核对。" : `未提交收藏保存：${n instanceof Error ? n.message : "读取失败"}。请先重读收藏后再操作。`
      }), new Error("收藏操作未完成或保存结果未确认，请重读收藏核对");
    } finally {
      v.updateState({ favoritesBusy: !1 });
    }
  }
  async loadFavorites(e = !1) {
    if (_.favoritesBusy) return this.favorites.map((n) => ({ ...n }));
    if (this.favoritesLoaded && !e) return this.favorites.map((n) => ({ ...n }));
    if (this.favoriteRead && (await this.favoriteRead, !e))
      return this.favorites.map((n) => ({ ...n }));
    if (_.favoritesBusy) return this.favorites.map((n) => ({ ...n }));
    const t = ++this.favoriteReadVersion;
    v.updateState({ favoritesLoading: !0 });
    const s = (async () => {
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
    this.favoriteRead = s;
    try {
      return await s;
    } finally {
      this.favoriteRead === s && (this.favoriteRead = void 0);
    }
  }
  isFavorite(e) {
    return this.favorites.some((t) => t.id === e);
  }
  async toggleFavorite(e, t = "稍后观看") {
    const s = { ...e, group: t || "稍后观看", savedAt: Date.now() };
    if (this.favoritesLoaded || await this.loadFavorites(), !s.id || !s.title) throw new Error("视频信息不完整，未保存");
    const n = this.isFavorite(s.id);
    return this.mutateFavorites((o) => (n ? o.favorites = o.favorites.filter((d) => d.id !== s.id) : o.favorites.some((d) => d.id === s.id) || o.favorites.unshift(s), !n), (o) => o ? "已保存收藏并核对。" : "已移出本地收藏并核对。");
  }
  async removeFavorite(e) {
    await this.mutateFavorites((t) => {
      t.favorites = t.favorites.filter((s) => s.id !== e);
    }, () => "已移出本地收藏并核对。");
  }
  async addFavGroup(e) {
    const t = e.trim();
    t && await this.mutateFavorites((s) => {
      s.groups.includes(t) || s.groups.push(t);
    }, () => "收藏分组已保存并核对。");
  }
  async deleteFavGroup(e) {
    e === "全部" || e === "稍后观看" || await this.mutateFavorites((t) => {
      t.groups = t.groups.filter((s) => s !== e), t.favorites = t.favorites.map((s) => s.group === e ? { ...s, group: "稍后观看" } : s);
    }, () => "分组已删除，视频移入稍后观看；已核对保存。");
  }
  // -------------------------------------------------------------
  // 6. 📂 播放列表管理
  // -------------------------------------------------------------
  async loadPlaylists() {
    if (this.playlistsLoaded) return this.playlists;
    let t = (await j([M]))[M];
    const s = /* @__PURE__ */ new Set([
      "PLrAXtmErZgOdP_8GztsuKi9nrraNbKKp4",
      "PL9ooVrP1hQOFWk94Q4P_rF_X_wE2eXj1k"
    ]);
    return !Array.isArray(t) || t.length === 0 ? (t = zt, await k({ [M]: t })) : (t = t.filter((n) => !s.has(n.id)), await k({ [M]: t })), this.playlists = t, this.playlistsLoaded = !0, v.updateState({
      playlists: this.playlists,
      activePlaylistId: this.playlists[0]?.id || ""
    }), this.playlists[0]?.id && this.fetchPlaylistVideos(this.playlists[0].id), this.playlists;
  }
  async addPlaylist(e, t) {
    await this.loadPlaylists();
    let s = e.trim();
    const n = s.match(/list=([a-zA-Z0-9_-]+)/);
    if (n && (s = n[1]), s = s.replace(/^VL/i, ""), !s || this.playlists.some((d) => d.id === s)) return !1;
    const o = {
      id: s,
      title: t?.trim() || `YouTube 播放列表 (${s.slice(0, 8)}...)`,
      thumbnail: `https://i.ytimg.com/vi/${s}/hqdefault.jpg`
    };
    return this.playlists.push(o), await k({ [M]: this.playlists }), v.updateState({ playlists: [...this.playlists], activePlaylistId: s }), this.fetchPlaylistVideos(s), !0;
  }
  async removePlaylist(e) {
    await this.loadPlaylists(), this.playlists = this.playlists.filter((s) => s.id !== e), await k({ [M]: this.playlists });
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
      const s = t.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents || [], n = [];
      return s.forEach((o) => {
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
            _.currentView === "recommend" ? await this.loadRecommend(!0) : await this.loadFavorites(!0);
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
      e && e.videos.length > 0 && _.exploreVideos.length === 0 && (v.updateState({
        exploreVideos: e.videos,
        userName: e.userName || "账号专属推荐"
      }), e.videos.forEach((t) => this.shownVideoIds.add(t.id)));
    }));
  }
}
const R = new jt(), Wt = ["inert"], Ht = { class: "card-head" }, Jt = {
  id: "youtube-view-tabs",
  class: "youtube-view-tabs",
  role: "tablist",
  "aria-label": "YouTube 视图"
}, Zt = ["aria-selected"], Kt = ["aria-selected"], Qt = {
  id: "youtube-user",
  class: "muted small"
}, Xt = ["title"], te = { class: "yt-settings-anchor" }, ee = ["aria-expanded"], se = {
  key: 0,
  class: "muted small",
  role: "status"
}, ie = ["disabled"], oe = { class: "yt-layout-body" }, ne = { class: "yt-sidebar" }, ae = { class: "yt-sidebar-nav-group" }, re = { class: "yt-nav-btn-main" }, le = { class: "yt-nav-btn-text" }, ue = {
  class: "yt-sidebar-group-list",
  "aria-label": "收藏分组"
}, ce = { class: "yt-group-count" }, de = { class: "yt-group-count" }, he = ["onClick"], fe = { class: "yt-group-name" }, me = { class: "yt-group-count" }, pe = ["onClick"], ye = { class: "yt-sidebar-footer" }, ve = ["disabled"], be = { class: "yt-main-content" }, we = { id: "youtube-recommend-pane" }, ge = {
  key: 0,
  class: "muted small yt-loading-box"
}, Te = {
  key: 1,
  class: "yt-error-box"
}, xe = {
  key: 2,
  class: "muted small yt-empty"
}, Ce = { key: 3 }, _e = { class: "yt-video-grid" }, Se = ["onClick", "onContextmenu"], Ee = { class: "yt-thumb-wrap" }, ke = ["src", "alt"], Ie = ["disabled", "title", "onClick"], Ve = { class: "yt-fav-icon" }, Re = { class: "yt-fav-text" }, Ae = {
  key: 0,
  class: "yt-badge"
}, Le = { class: "yt-info" }, Pe = ["title"], Fe = { class: "yt-meta-row" }, Ye = ["title"], Ne = { class: "yt-time" }, Me = { class: "yt-next-batch-container" }, $e = ["disabled"], Ue = { class: "yt-next-batch-text" }, Be = { id: "youtube-favorites-pane" }, Oe = { class: "yt-fav-toolbar" }, Ge = { class: "yt-fav-hint" }, De = { class: "yt-fav-cur-group" }, qe = { class: "muted small" }, ze = { class: "yt-sync-actions" }, je = ["disabled"], We = {
  key: 0,
  class: "muted small yt-loading-box"
}, He = {
  key: 1,
  class: "muted small yt-empty yt-empty-fav"
}, Je = ["disabled"], Ze = {
  key: 2,
  class: "yt-video-grid"
}, Ke = ["onClick", "onContextmenu"], Qe = { class: "yt-thumb-wrap" }, Xe = ["src", "alt"], ts = ["disabled", "onClick"], es = {
  key: 0,
  class: "yt-badge"
}, ss = { class: "yt-info" }, is = ["title"], os = { class: "yt-meta-row" }, ns = ["title"], as = { class: "yt-right-meta" }, rs = { class: "yt-time" }, ls = ["disabled", "onClick"], us = {
  key: 3,
  class: "yt-pagination"
}, cs = ["disabled"], ds = ["disabled"], hs = {
  key: 0,
  class: "yt-toast"
}, fs = { class: "menu-head" }, ms = /* @__PURE__ */ Et({
  __name: "YouTubeCard",
  setup(p) {
    const e = Ft(() => import("./YouTubeSettingsPanel-BNf5a_j0.js")), t = D(!1), s = D(!1);
    ot(t, (m) => {
      m && (s.value = !0);
    });
    const n = D(null), o = D({
      visible: !1,
      x: 0,
      y: 0,
      video: null
    });
    function d(m, c) {
      m.preventDefault(), m.stopPropagation(), o.value = {
        visible: !0,
        x: m.clientX,
        y: m.clientY,
        video: c
      };
    }
    function l(m) {
      o.value.video && Mt.sendYouTubeShare({
        id: o.value.video.id,
        title: o.value.video.title,
        cover: o.value.video.thumbnail,
        author: o.value.video.channelTitle,
        views: o.value.video.views,
        url: o.value.video.videoUrl
      }, m), o.value.visible = !1;
    }
    function r() {
      o.value.visible = !1;
    }
    kt(() => {
      window.addEventListener("click", r);
    });
    const i = _, { active: b, standalone: h } = Yt("daily-youtube", "/youtube.html"), w = q(() => b.value && (h || $t.showYouTube));
    let u = !1, A = !1, C;
    ot([w, () => i.currentView], ([m, c], y) => {
      C && !C.signal.aborted && i.isLoading && (A = !0), C?.abort(), C = new AbortController(), (!m || c !== "recommend") && C.abort(), R.setRecommendationViewSignal(C.signal), m && (u || R.init(), c === "favorites" && (i.currentPage = Math.min(i.currentPage, Math.max(1, Math.ceil(I.value.length / i.pageSize))), R.loadFavorites()), c === "recommend" && (!u || A || y?.[1] !== c && !i.exploreVideos.length) && (A = !1, R.loadRecommend()), u = !0);
    }, { immediate: !0, flush: "sync" });
    const I = q(() => i.activeFavGroup === "全部" ? i.favorites : i.favorites.filter((m) => (m.group || "稍后观看") === i.activeFavGroup)), J = q(() => i.favGroups.filter((m) => m !== "全部" && m !== "稍后观看"));
    function N(m) {
      return m === "全部" ? i.favorites.length : i.favorites.filter((c) => (c.group || "稍后观看") === m).length;
    }
    function P(m) {
      i.activeFavGroup = m, i.currentPage = 1, i.currentView !== "favorites" && O("favorites");
    }
    async function $() {
      const m = window.prompt("请输入新收藏分组名称：");
      !m || !m.trim() || (await R.addFavGroup(m.trim()), i.activeFavGroup = m.trim(), i.currentPage = 1);
    }
    async function U(m) {
      window.confirm(`确定要删除分组「${m}」吗？分组内的视频会保留在「稍后观看」中。`) && (await R.deleteFavGroup(m), i.activeFavGroup === m && (i.activeFavGroup = "全部"));
    }
    const S = q(
      () => Math.max(1, Math.ceil(I.value.length / i.pageSize))
    );
    ot(() => I.value.length, () => {
      w.value && i.currentView === "favorites" && (i.currentPage = Math.min(i.currentPage, S.value));
    });
    const Tt = q(() => {
      const m = (i.currentPage - 1) * i.pageSize;
      return I.value.slice(m, m + i.pageSize);
    });
    function B(m) {
      return i.favorites.some((c) => c.id === m);
    }
    function O(m) {
      w.value && (i.currentPage = 1, v.switchView(m));
    }
    function Z() {
      w.value && (i.currentPage = 1, v.dispatch("refresh"), it());
    }
    const K = D("");
    let ct = null;
    function dt(m) {
      K.value = m, clearTimeout(ct), ct = setTimeout(() => {
        K.value = "";
      }, 2200);
    }
    async function et(m) {
      if (!(!w.value || i.favoritesBusy || i.favoritesLoading || i.favoritesNeedsReview))
        try {
          await m();
        } catch {
        }
    }
    async function xt(m) {
      const c = !B(m.id);
      await et(() => R.toggleFavorite(m)), dt(c ? `已收藏：${m.title.slice(0, 18)}…` : "已移出收藏夹");
    }
    async function ht(m) {
      await et(() => R.removeFavorite(m)), dt("已移出收藏夹");
    }
    async function st() {
      await et(() => R.syncYouTubeLikedVideos());
    }
    async function Ct() {
      if (!(!w.value || i.favoritesBusy || i.favoritesLoading))
        try {
          await R.loadFavorites(!0);
        } catch {
        }
    }
    function ft(m) {
      const c = m.videoUrl || `https://www.youtube.com/watch?v=${m.id}`;
      window.open(c, "_blank", "noopener,noreferrer");
    }
    function it() {
      const m = document.querySelector(".daily-youtube");
      m && m.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function _t() {
      i.currentPage > 1 && (i.currentPage--, v.dispatch("page-prev", i.currentPage), it());
    }
    function St(m) {
      !w.value || i.isLoadingMore || i.isLoading || i.currentPage < m && (i.currentPage++, v.dispatch("page-next", i.currentPage), it());
    }
    function mt(m) {
      const c = m.target;
      c.src = "assets/nav-youtube.svg";
    }
    return It(() => {
      window.removeEventListener("click", r), C?.abort();
    }), (m, c) => (T(), x("div", {
      class: "vue-youtube-wrapper",
      inert: !w.value
    }, [
      a("section", {
        id: "daily-youtube",
        class: E(["card wide daily-youtube", { "card-fullscreen": f(Nt).activeId === "daily-youtube" }])
      }, [
        a("header", Ht, [
          c[11] || (c[11] = a("span", { class: "bar youtube-red" }, null, -1)),
          c[12] || (c[12] = a("h2", null, "YouTube", -1)),
          a("div", Jt, [
            a("button", {
              type: "button",
              role: "tab",
              class: E({ on: f(i).currentView === "favorites" }),
              "aria-selected": f(i).currentView === "favorites",
              onClick: c[0] || (c[0] = (y) => O("favorites"))
            }, " ❤️ 我的收藏 (" + g(f(i).favorites.length) + ") ", 11, Zt),
            a("button", {
              type: "button",
              role: "tab",
              class: E({ on: f(i).currentView === "recommend" }),
              "aria-selected": f(i).currentView === "recommend",
              onClick: c[1] || (c[1] = (y) => O("recommend"))
            }, " ✨ 个性推荐 ", 10, Kt)
          ]),
          a("span", Qt, g(f(i).userName), 1),
          a("button", {
            id: "youtube-refresh",
            class: E(["youtube-refresh icon-btn", { spinning: f(i).isLoading }]),
            type: "button",
            title: f(i).currentView === "recommend" ? "换一批推荐 (18个)" : "刷新收藏",
            onClick: Z
          }, [...c[10] || (c[10] = [
            a("span", { class: "yt-refresh-icon" }, "↻", -1)
          ])], 10, Xt),
          a("div", te, [
            a("button", {
              ref_key: "settingsButton",
              ref: n,
              type: "button",
              class: "icon-btn",
              title: "YouTube 设置",
              "aria-label": "YouTube 设置",
              "aria-expanded": t.value,
              onClick: c[2] || (c[2] = (y) => t.value = !t.value)
            }, "⚙", 8, ee),
            s.value ? (T(), pt(f(e), {
              key: 0,
              visible: w.value && t.value,
              anchor: n.value,
              onClose: c[3] || (c[3] = (y) => t.value = !1)
            }, null, 8, ["visible", "anchor"])) : F("", !0)
          ])
        ]),
        f(i).favoriteMessage || f(i).favoritesNeedsReview ? (T(), x("div", se, [
          Vt(g(f(i).favoriteMessage) + " ", 1),
          a("button", {
            type: "button",
            disabled: f(i).favoritesBusy || f(i).favoritesLoading,
            onClick: Ct
          }, "重读收藏", 8, ie)
        ])) : F("", !0),
        a("div", oe, [
          a("aside", ne, [
            a("div", ae, [
              a("button", {
                type: "button",
                class: E(["yt-sidebar-nav-btn yt-nav-fav", { on: f(i).currentView === "favorites" }]),
                onClick: c[4] || (c[4] = (y) => O("favorites"))
              }, [
                a("div", re, [
                  c[14] || (c[14] = a("span", { class: "yt-nav-btn-icon" }, "❤️", -1)),
                  a("div", le, [
                    c[13] || (c[13] = a("strong", null, "我的收藏", -1)),
                    a("small", null, g(f(i).favorites.length) + " 个收藏视频", 1)
                  ])
                ]),
                c[15] || (c[15] = a("span", { class: "yt-nav-btn-badge" }, "FAV", -1))
              ], 2),
              a("button", {
                type: "button",
                class: E(["yt-sidebar-nav-btn yt-nav-rec", { on: f(i).currentView === "recommend" }]),
                onClick: c[5] || (c[5] = (y) => O("recommend"))
              }, [...c[16] || (c[16] = [
                a("div", { class: "yt-nav-btn-main" }, [
                  a("span", { class: "yt-nav-btn-icon" }, "✨"),
                  a("div", { class: "yt-nav-btn-text" }, [
                    a("strong", null, "个性推荐"),
                    a("small", null, "算法流 · 18个换一批")
                  ])
                ], -1),
                a("span", { class: "yt-nav-btn-badge" }, "FOR YOU", -1)
              ])], 2)
            ]),
            a("div", { class: "yt-sidebar-hub-head" }, [
              c[17] || (c[17] = a("div", { class: "yt-hub-title" }, [
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
            a("nav", ue, [
              a("button", {
                type: "button",
                class: E(["yt-group-item", { on: f(i).currentView === "favorites" && f(i).activeFavGroup === "全部" }]),
                onClick: c[6] || (c[6] = (y) => P("全部"))
              }, [
                c[18] || (c[18] = a("i", { class: "yt-group-icon" }, "📌", -1)),
                c[19] || (c[19] = a("span", { class: "yt-group-name" }, "全部视频", -1)),
                a("small", ce, g(f(i).favorites.length), 1)
              ], 2),
              a("button", {
                type: "button",
                class: E(["yt-group-item", { on: f(i).currentView === "favorites" && f(i).activeFavGroup === "稍后观看" }]),
                onClick: c[7] || (c[7] = (y) => P("稍后观看"))
              }, [
                c[20] || (c[20] = a("i", { class: "yt-group-icon" }, "⏳", -1)),
                c[21] || (c[21] = a("span", { class: "yt-group-name" }, "稍后观看", -1)),
                a("small", de, g(N("稍后观看")), 1)
              ], 2),
              (T(!0), x(nt, null, at(J.value, (y) => (T(), x("div", {
                key: y,
                class: E(["yt-group-item yt-group-custom", { on: f(i).currentView === "favorites" && f(i).activeFavGroup === y }]),
                onClick: (V) => P(y)
              }, [
                c[22] || (c[22] = a("i", { class: "yt-group-icon" }, "📂", -1)),
                a("span", fe, g(y), 1),
                a("small", me, g(N(y)), 1),
                a("button", {
                  class: "yt-group-del-btn",
                  type: "button",
                  title: "删除分组",
                  onClick: G((V) => U(y), ["stop"])
                }, " ✕ ", 8, pe)
              ], 10, he))), 128))
            ]),
            a("div", ye, [
              a("button", {
                class: "yt-sidebar-sync-btn",
                type: "button",
                title: "自动读取 Edge 浏览器中已登录的 YouTube 账号，同步 Liked 视频",
                disabled: f(i).favoritesBusy || f(i).favoritesLoading || f(i).favoritesNeedsReview,
                onClick: st
              }, [...c[23] || (c[23] = [
                a("span", { class: "yt-sync-icon" }, "🔄", -1),
                a("span", null, "同步账号 Liked 视频", -1)
              ])], 8, ve)
            ])
          ]),
          a("main", be, [
            yt(a("div", we, [
              f(i).isLoading && f(i).exploreVideos.length === 0 ? (T(), x("div", ge, [...c[24] || (c[24] = [
                a("i", { class: "yt-spinner" }, null, -1),
                a("span", null, "正在生成专属个性推荐流…", -1)
              ])])) : f(i).error && f(i).exploreVideos.length === 0 ? (T(), x("div", Te, [
                a("p", null, "⚠️ " + g(f(i).error), 1),
                a("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  onClick: Z
                }, "↻ 重新拉取")
              ])) : f(i).exploreVideos.length === 0 ? (T(), x("div", xe, [
                c[25] || (c[25] = a("p", null, "推荐流正在同步，点击换一批即可获取推荐", -1)),
                a("button", {
                  type: "button",
                  class: "yt-retry-btn",
                  style: { "margin-top": "8px" },
                  onClick: Z
                }, "↻ 换一批推荐")
              ])) : (T(), x("div", Ce, [
                c[27] || (c[27] = a("div", { class: "yt-rec-header-hint" }, [
                  a("span", { class: "yt-rec-counter" }, "✨ 当前为您精选 18 个推荐视频"),
                  a("span", { class: "yt-rec-fav-tip" }, "💡 悬浮封面点击 🤍 即可一键收藏")
                ], -1)),
                a("div", _e, [
                  (T(!0), x(nt, null, at(f(i).exploreVideos, (y) => (T(), x("article", {
                    key: "rec-" + y.id,
                    class: "yt-card",
                    onClick: (V) => ft(y),
                    onContextmenu: (V) => d(V, y)
                  }, [
                    a("div", Ee, [
                      a("img", {
                        src: y.thumbnail,
                        alt: y.title,
                        loading: "lazy",
                        onError: mt
                      }, null, 40, ke),
                      a("button", {
                        class: E(["yt-fav-badge", { "is-fav": B(y.id) }]),
                        type: "button",
                        disabled: f(i).favoritesBusy || f(i).favoritesLoading || f(i).favoritesNeedsReview,
                        title: B(y.id) ? "已收藏到本地（点击移出）" : "收藏到本地 YouTube 收藏夹",
                        onClick: G((V) => xt(y), ["stop"])
                      }, [
                        a("span", Ve, g(B(y.id) ? "❤️" : "🤍"), 1),
                        a("span", Re, g(B(y.id) ? "已收藏" : "收藏"), 1)
                      ], 10, Ie),
                      y.views ? (T(), x("span", Ae, g(y.views), 1)) : F("", !0)
                    ]),
                    a("div", Le, [
                      a("h4", {
                        class: "yt-title",
                        title: y.title
                      }, g(y.title), 9, Pe),
                      a("div", Fe, [
                        a("span", {
                          class: "yt-channel",
                          title: y.channelTitle
                        }, g(y.channelTitle), 9, Ye),
                        a("span", Ne, g(y.publishedAt) + " ↗", 1)
                      ])
                    ])
                  ], 40, Se))), 128))
                ]),
                a("div", Me, [
                  a("button", {
                    type: "button",
                    class: E(["yt-next-batch-btn", { spinning: f(i).isLoading }]),
                    disabled: f(i).isLoading,
                    onClick: Z
                  }, [
                    c[26] || (c[26] = a("span", { class: "yt-next-batch-icon" }, "↻", -1)),
                    a("span", Ue, g(f(i).isLoading ? "正在探索下一批推荐…" : "换一批推荐（再来 18 个）"), 1)
                  ], 10, $e)
                ])
              ]))
            ], 512), [
              [vt, f(i).currentView === "recommend"]
            ]),
            yt(a("div", Be, [
              a("div", Oe, [
                a("div", Ge, [
                  a("strong", De, "📁 " + g(f(i).activeFavGroup), 1),
                  a("span", qe, "（共 " + g(I.value.length) + " 个收藏视频 · 每页 18 个）", 1)
                ]),
                a("div", ze, [
                  a("button", {
                    class: "yt-sync-btn",
                    type: "button",
                    title: "自动读取 Edge 浏览器中登录的 YouTube 账号，同步 Liked 视频",
                    disabled: f(i).favoritesBusy || f(i).favoritesLoading || f(i).favoritesNeedsReview,
                    onClick: st
                  }, " 🔄 同步账号 Liked 视频 ", 8, je)
                ])
              ]),
              f(i).favoritesLoading ? (T(), x("div", We, [...c[28] || (c[28] = [
                a("i", { class: "yt-spinner" }, null, -1),
                a("span", null, "正在更新收藏列表…", -1)
              ])])) : I.value.length === 0 ? (T(), x("div", He, [
                c[29] || (c[29] = a("span", { class: "yt-empty-icon" }, "📺", -1)),
                a("p", null, "当前分组「" + g(f(i).activeFavGroup) + "」暂无视频。", 1),
                c[30] || (c[30] = a("p", { class: "yt-empty-sub" }, "若您在 YouTube 账号中有点赞或喜欢的视频，可直接一键同步到本地展示。", -1)),
                a("button", {
                  type: "button",
                  class: "yt-sync-btn yt-empty-sync-btn",
                  disabled: f(i).favoritesBusy || f(i).favoritesLoading || f(i).favoritesNeedsReview,
                  onClick: st
                }, " 🔄 立即同步 YouTube 账号喜欢的视频 ", 8, Je)
              ])) : (T(), x("div", Ze, [
                (T(!0), x(nt, null, at(Tt.value, (y) => (T(), x("article", {
                  key: "fav-" + y.id,
                  class: "yt-card",
                  onClick: (V) => ft(y),
                  onContextmenu: (V) => d(V, y)
                }, [
                  a("div", Qe, [
                    a("img", {
                      src: y.thumbnail,
                      alt: y.title,
                      loading: "lazy",
                      onError: mt
                    }, null, 40, Xe),
                    a("button", {
                      class: "yt-fav-badge is-fav",
                      type: "button",
                      disabled: f(i).favoritesBusy || f(i).favoritesLoading || f(i).favoritesNeedsReview,
                      title: "从收藏中移出",
                      onClick: G((V) => ht(y.id), ["stop"])
                    }, [...c[31] || (c[31] = [
                      a("span", { class: "yt-fav-icon" }, "❤️", -1),
                      a("span", { class: "yt-fav-text" }, "移出", -1)
                    ])], 8, ts),
                    y.views ? (T(), x("span", es, g(y.views), 1)) : F("", !0)
                  ]),
                  a("div", ss, [
                    a("h4", {
                      class: "yt-title",
                      title: y.title
                    }, g(y.title), 9, is),
                    a("div", os, [
                      a("span", {
                        class: "yt-channel",
                        title: y.channelTitle
                      }, g(y.channelTitle), 9, ns),
                      a("div", as, [
                        a("span", rs, g(y.publishedAt || "已收藏"), 1),
                        a("button", {
                          class: "yt-del-fav-btn",
                          type: "button",
                          disabled: f(i).favoritesBusy || f(i).favoritesLoading || f(i).favoritesNeedsReview,
                          title: "从收藏中删除",
                          onClick: G((V) => ht(y.id), ["stop"])
                        }, " 🗑️ ", 8, ls)
                      ])
                    ])
                  ])
                ], 40, Ke))), 128))
              ])),
              S.value > 1 ? (T(), x("nav", us, [
                a("button", {
                  type: "button",
                  disabled: f(i).currentPage <= 1,
                  onClick: _t
                }, "‹ 上一页", 8, cs),
                a("span", null, "第 " + g(f(i).currentPage) + " / " + g(S.value) + " 页 (共 " + g(I.value.length) + " 条)", 1),
                a("button", {
                  type: "button",
                  disabled: f(i).currentPage >= S.value,
                  onClick: c[8] || (c[8] = (y) => St(S.value))
                }, "下一页 ›", 8, ds)
              ])) : F("", !0)
            ], 512), [
              [vt, f(i).currentView === "favorites"]
            ])
          ])
        ])
      ], 2),
      bt(At, { name: "yt-toast-fade" }, {
        default: Rt(() => [
          K.value ? (T(), x("div", hs, g(K.value), 1)) : F("", !0)
        ]),
        _: 1
      }),
      (T(), pt(Pt, { to: "body" }, [
        o.value.visible ? (T(), x("div", {
          key: 0,
          class: "yt-context-menu",
          style: Lt({ left: `${Math.min(o.value.x, 600)}px`, top: `${Math.min(o.value.y, 400)}px` }),
          onClick: c[9] || (c[9] = G(() => {
          }, ["stop"]))
        }, [
          a("div", fs, g(o.value.video?.title), 1),
          bt(Ut, {
            label: "💬 发送到聊天室",
            visible: o.value.visible,
            onSelect: l
          }, null, 8, ["visible"])
        ], 4)) : F("", !0)
      ]))
    ], 8, Wt));
  }
}), ps = /* @__PURE__ */ Bt(ms, [["__scopeId", "data-v-f11de297"]]), xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ps
}, Symbol.toStringTag, { value: "Module" }));
export {
  xs as Y,
  R as y
};
