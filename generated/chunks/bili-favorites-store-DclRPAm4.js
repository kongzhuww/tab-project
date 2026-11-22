import { n as h, b as c, a as U } from "./github.service-BkChs4sP.js";
import { r as G } from "./vendor-vue-C-_ocEUS.js";
import { a as D } from "./read-session-Bth5Co7m.js";
import { t as q } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { b as W } from "./radio-player-CCUSmV1E.js";
const E = "biliRadioSeriesV1", V = "lw_backup_bili_radio_series", C = "default-series", z = "liked-radio-series", M = "我喜欢的电台";
let k = 0, N = !1, P = Promise.resolve();
function I(r) {
  return r instanceof Error ? r.message : "读取电台失败";
}
function $(r) {
  return {
    bvid: String(r?.bvid || ""),
    title: String(r?.title || "未命名视频"),
    cover: String(r?.cover || "").replace(/^http:/, "https:"),
    author: String(r?.author || r?.upper?.name || r?.upper || ""),
    duration: Number(r?.duration || 0)
  };
}
async function O(r) {
  return typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get(r) : {};
}
async function x() {
  const r = await O([E, V]);
  for (const e of [E, V])
    if (r[e] !== void 0) {
      if (!Array.isArray(r[e])) throw new Error("电台存储格式无效，未覆盖数据");
      return r[e];
    }
  for (const e of [E, V]) {
    const t = localStorage.getItem(e);
    if (t !== null) {
      let i;
      try {
        i = JSON.parse(t);
      } catch {
        throw new Error("电台本地副本无法解析，未覆盖数据");
      }
      if (!Array.isArray(i)) throw new Error("电台本地副本格式无效，未覆盖数据");
      return i;
    }
  }
  return null;
}
function L(r) {
  return r.map((e) => {
    if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("电台系列格式无效，未覆盖数据");
    const t = e, i = t.items == null ? [] : Array.isArray(t.items) ? t.items : typeof t.items == "object" ? Object.values(t.items) : null;
    if (!i) throw new Error("电台曲目格式无效，未覆盖数据");
    const a = i.map((s) => {
      if (!s || typeof s != "object" || Array.isArray(s)) throw new Error("电台曲目格式无效，未覆盖数据");
      const d = s;
      if (typeof d.bvid != "string" || !d.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const g = $(d);
      if (!Number.isFinite(g.duration)) throw new Error("电台曲目时长格式无效，未覆盖数据");
      return { ...d, ...g };
    });
    return {
      ...t,
      id: String(t.id || `series_${Math.random().toString(36).slice(2, 9)}`),
      name: String(t.name || "未命名系列"),
      count: a.length,
      items: a
    };
  });
}
async function F(r, e = {}) {
  if (!r.length && !e.allowEmpty) {
    const a = (await O([E]))[E];
    if (Array.isArray(a) && a.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const t = JSON.stringify(r);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [E]: r, [V]: r }), localStorage.setItem(E, t), localStorage.setItem(V, t);
}
function A(r = 0, e = !1, t) {
  const i = o.radioQueue.map((s) => ({ ...s, upper: s.author }));
  if (!i.length) return;
  if (e) {
    for (let s = i.length - 1; s > 0; s--) {
      const d = Math.floor(Math.random() * (s + 1));
      [i[s], i[d]] = [i[d], i[s]];
    }
    r = 0;
  }
  const a = Math.max(0, Math.min(i.length - 1, Number(r) || 0));
  W.playQueue({
    name: t || (e ? "B站电台 · 随机" : "B站电台"),
    items: i,
    startIndex: a
  });
}
typeof window < "u" && (window.playBiliRadioQueue = A);
const p = {
  async ensureSeriesLoaded() {
    if (!N) {
      N = !0;
      try {
        const r = await x();
        o.radioSeries = r === null ? [{ id: C, name: "默认系列", count: 0, items: [] }] : L(r), r === null && (o.radioSeriesName = "默认系列");
      } catch (r) {
        N = !1, console.warn("[BiliRadio] 读取系列失败", r);
      }
    }
  },
  async init() {
    await this.ensureSeriesLoaded(), await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const r = L(await x() ?? []);
    return r.length && await F(r), o.radioSeries = r, {
      ok: !0,
      repairedCount: r.length,
      emptySeries: r.filter((e) => !e.items.length).map((e) => ({ id: e.id, name: e.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: r.map((e) => ({ id: e.id, name: e.name, count: e.count, sampleItem: e.items[0]?.title }))
    };
  },
  async refresh() {
    const r = ++k;
    o.radioLoading = !0, o.radioError = "";
    try {
      const e = await c.getUserNav();
      if (!e.isLogin) throw new Error("请先登录 B站");
      const t = await c.getCreatedFolders(e.mid);
      if (r !== k) return;
      o.radioFolders = t.map((a) => ({
        id: Number(a.id),
        title: a.title || "收藏夹",
        count: Number(a.media_count || 0)
      }));
      const i = o.radioFolders[0];
      i ? await this.selectFolder(i.id) : (o.radioActiveFolderId = 0, o.radioVideos = []), this.autoHealEmptySeries();
    } catch (e) {
      r === k && (o.radioError = I(e));
    } finally {
      r === k && (o.radioLoading = !1);
    }
  },
  async autoHealEmptySeries() {
    let r = !1;
    for (const e of o.radioSeries)
      if (e.id !== C && (e.count === 0 || !e.items.length)) {
        const t = o.radioFolders.find(
          (i) => i.title.trim().toLowerCase() === e.name.trim().toLowerCase()
        );
        if (t)
          try {
            const a = ((await c.getFolderVideos(t.id, 1, 40)).medias || []).map((s) => $({ ...s, author: s.upper?.name }));
            a.length && (e.items = a, e.count = a.length, r = !0);
          } catch {
          }
      }
    if (r)
      try {
        await F(o.radioSeries);
      } catch (e) {
        o.radioError = `系列已补全，但保存未确认：${I(e)}`;
      }
  },
  async selectFolder(r) {
    const e = Number(r);
    if (!o.radioFolders.some((i) => Number(i.id) === e) || e === o.radioActiveFolderId && o.radioVideos.length > 0)
      return;
    const t = ++k;
    o.radioActiveFolderId = e, o.radioLoading = !0, o.radioError = "";
    try {
      const i = /* @__PURE__ */ new Map(), a = 15;
      for (let s = 1; s <= a; s++) {
        const d = await c.getFolderVideos(e, s, 40);
        if (t !== k) return;
        for (const n of d.medias || [])
          n.bvid && i.set(n.bvid, $({ ...n, author: n.upper?.name }));
        const g = o.radioFolders.find((n) => Number(n.id) === e)?.count || 0;
        if (!d.medias?.length || i.size >= Math.max(d.total, g)) break;
      }
      o.radioVideos = [...i.values()];
    } catch (i) {
      t === k && (o.radioError = I(i));
    } finally {
      t === k && (o.radioLoading = !1);
    }
  },
  add(r) {
    if (r.bvid) {
      if (o.radioQueue.some((e) => e.bvid === r.bvid)) {
        h.fetch("哔哩哔哩电台", `「${r.title || r.bvid}」已在播放队列中`);
        return;
      }
      o.radioQueue.push($(r));
    }
  },
  addToDefaultSeries(r) {
    const e = P.then(async () => {
      if (!r.bvid) throw new Error("视频缺少 B 站编号");
      const t = await x(), i = L(t ?? []);
      let a = i.find((s) => s.id === C || s.name === "默认系列");
      return a || (a = { id: C, name: "默认系列", count: 0, items: [] }, i.push(a)), a.items.some((s) => s.bvid === r.bvid) ? !1 : (a.items.push($(r)), a.count = a.items.length, await F(i), o.radioSeries = i, N = !0, !0);
    });
    return P = e.then(() => {
    }, () => {
    }), e;
  },
  remove(r) {
    Number.isInteger(r) && r >= 0 && r < o.radioQueue.length && o.radioQueue.splice(r, 1);
  },
  clear() {
    o.radioQueue = [];
  },
  play(r = !1, e = 0) {
    const t = o.radioSeriesName?.trim() || void 0;
    A(e, r, r && t ? `${t} · 随机` : t);
  },
  playAt(r) {
    if (!o.radioQueue.length) return;
    const e = Math.max(0, Math.min(o.radioQueue.length - 1, Number(r) || 0)), t = o.radioSeriesName?.trim() || void 0;
    A(e, !1, t);
  },
  async loadSeries(r) {
    const e = o.radioSeries.find((t) => t.id === r);
    if (e) {
      if (!e.items.length && e.id !== C) {
        const t = o.radioFolders.find(
          (i) => i.title.trim().toLowerCase() === e.name.trim().toLowerCase()
        );
        if (t) {
          h.fetch("哔哩哔哩电台", `正在从「${t.title}」收藏夹自动补齐系列曲目…`);
          try {
            const a = ((await c.getFolderVideos(t.id, 1, 40)).medias || []).map((s) => $({ ...s, author: s.upper?.name }));
            a.length && (e.items = a, e.count = a.length, await F(o.radioSeries));
          } catch (i) {
            o.radioError = `读取或保存补全系列失败：${I(i)}`, h.fetch("哔哩哔哩电台", o.radioError);
          }
        }
      }
      if (!e.items.length) {
        o.radioSeriesName = e.name, h.fetch("哔哩哔哩电台", `系列「${e.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      o.radioQueue = e.items.map($), o.radioSeriesName = e.name, h.fetch("哔哩哔哩电台", `已载入系列「${e.name}」（共 ${e.count} 首）`);
    }
  },
  async playSeries(r, e = 0) {
    await this.loadSeries(r);
    const t = o.radioSeries.find((i) => i.id === r);
    t?.items.length && A(e, !1, t.name);
  },
  async deleteSeries(r) {
    await this.ensureSeriesLoaded();
    const e = o.radioSeries.find((a) => a.id === r);
    if (!e) return;
    const t = e.name || "系列", i = o.radioSeries.filter((a) => a.id !== r);
    try {
      await F(i, { allowEmpty: !0 }), o.radioSeries = i, o.radioSeriesName?.trim() === e.name && (o.radioSeriesName = ""), h.fetch("哔哩哔哩电台", `已删除歌单「${t}」`);
    } catch (a) {
      o.radioError = `删除歌单失败：${I(a)}`, h.fetch("哔哩哔哩电台", `删除歌单失败：${I(a)}`);
    }
  },
  isLiked(r) {
    return r ? !!o.radioSeries.find((t) => t.id === z || t.name === M)?.items.some((t) => t.bvid === r) : !1;
  },
  async toggleLike(r) {
    if (!r.bvid) return !1;
    await this.ensureSeriesLoaded();
    const e = [...o.radioSeries];
    let t = e.findIndex((d) => d.id === z || d.name === M);
    t === -1 && (e.unshift({ id: z, name: M, count: 0, items: [] }), t = 0);
    const i = { ...e[t], items: [...e[t].items] }, a = i.items.findIndex((d) => d.bvid === r.bvid);
    let s = !1;
    a >= 0 ? (i.items.splice(a, 1), s = !1) : (i.items.unshift($(r)), s = !0), i.count = i.items.length, e[t] = i;
    try {
      return await F(e), o.radioSeries = e, h.fetch("哔哩哔哩电台", s ? `♥ 已添加到「${M}」` : `已从「${M}」移除`), s;
    } catch (d) {
      return o.radioError = `喜欢操作失败：${I(d)}`, h.fetch("哔哩哔哩电台", `喜欢操作失败：${I(d)}`), !s;
    }
  },
  openLikedSeries() {
    const r = o.radioSeries.find((e) => e.id === z || e.name === M);
    if (!r || !r.items.length) {
      h.fetch("哔哩哔哩电台", "还没有喜欢的曲目，点击视频旁的 ♡ 即可收藏");
      return;
    }
    o.radioQueue = r.items.map((e) => ({ ...e })), o.radioSeriesName = r.name, h.fetch("哔哩哔哩电台", `已载入「${r.name}」（共 ${r.items.length} 首）`);
  },
  async renameSeries(r, e) {
    const t = e.trim();
    if (!t) return;
    const i = o.radioSeries.find((d) => d.id === r);
    if (!i) return;
    const a = i.name, s = o.radioSeries.map((d) => d.id === r ? { ...d, name: t } : d);
    try {
      await F(s), o.radioSeries = s, o.radioSeriesName === a && (o.radioSeriesName = t), h.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${t}」`);
    } catch (d) {
      o.radioError = `重命名系列失败：${I(d)}`, h.fetch("哔哩哔哩电台", `重命名系列失败：${I(d)}`);
    }
  },
  async save(r) {
    if (!o.radioQueue.length) {
      h.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    const e = (r || o.radioSeriesName || "").trim();
    if (!e) {
      o.radioError = "保存失败：系列名称不能为空，请输入系列名称", h.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
    }
    const t = o.radioQueue.map((s) => ({ ...s })), i = o.radioSeries.findIndex((s) => s.name === e);
    let a = [...o.radioSeries];
    if (i >= 0) {
      const s = a[i];
      a[i] = {
        ...s,
        count: t.length,
        items: t
      };
    } else
      a.push({
        id: `series_${Date.now()}`,
        name: e,
        count: t.length,
        items: t
      });
    try {
      await F(a), o.radioSeries = a, o.radioSeriesName = e, h.fetch(
        "哔哩哔哩电台",
        i >= 0 ? `✓ 已更新歌单「${e}」（共 ${t.length} 首）` : `★ 已保存歌单「${e}」（共 ${t.length} 首）`
      );
    } catch (s) {
      const d = I(s);
      o.radioError = `保存系列失败：${d}`, h.fetch("哔哩哔哩电台", `保存系列失败：${d}`);
    }
  }
};
typeof window < "u" && window.addEventListener("logicweaver:sync-restored", () => {
  (async () => {
    try {
      o.radioSeries = L(await x() ?? []);
    } catch (r) {
      console.warn("[BiliRadio] 云同步恢复系列重载失败", r);
    }
  })();
});
const f = G({
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
}), j = {
  get state() {
    return f;
  },
  async open(r) {
    if (r.bvid) {
      f.isOpen = !0, f.loading = !0, f.error = "", f.fullText = "", f.title = r.title || r.bvid, f.bvid = r.bvid, f.cid = r.cid, f.copied = !1, f.cues = [];
      try {
        const e = await c.fetchVideoSubtitleDetails(r.bvid, r.cid);
        if (!e.ok || !e.cues || !e.cues.length) {
          f.error = e.reason || "该视频暂无可用字幕轨道";
          return;
        }
        f.cues = e.cues.map((a) => ({ from: a.from, to: a.to, content: a.content.trim() })).filter((a) => !!a.content);
        const i = f.cues.map((a) => a.content).join(`
`);
        f.fullText = i, f.charCount = i.length;
      } catch (e) {
        f.error = e?.message || "提取字幕失败，请检查网络";
      } finally {
        f.loading = !1;
      }
    }
  },
  close() {
    f.isOpen = !1;
  },
  async copy() {
    if (f.fullText)
      try {
        await navigator.clipboard.writeText(f.fullText), f.copied = !0, setTimeout(() => {
          f.copied = !1;
        }, 2e3);
      } catch {
      }
  },
  downloadTxt() {
    if (!f.fullText) return;
    const r = new Blob([f.fullText], { type: "text/plain;charset=utf-8" }), e = URL.createObjectURL(r), t = document.createElement("a");
    t.href = e, t.download = `${(f.title || f.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(t), t.click(), t.remove(), URL.revokeObjectURL(e);
  }
}, o = G({
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
    heroLyricText: q("bili.hero.defaultLyric"),
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
}), R = /* @__PURE__ */ new Set();
let v = [], m = { id: "root", type: "folder", children: [] }, y = /* @__PURE__ */ new Set();
function u(r, e) {
  const t = globalThis;
  typeof t.showBiliToast == "function" ? t.showBiliToast(r, 3200, e) : typeof t.showWindowsToast == "function" && t.showWindowsToast({
    id: `bili_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "哔哩哔哩",
    message: r,
    duration: 3200
  });
}
function K(r) {
  if (!r) return "https://www.bilibili.com";
  if (typeof r.url == "string" && /^https?:\/\//i.test(r.url.trim()))
    return r.url.trim();
  if (typeof r.link == "string" && /^https?:\/\//i.test(r.link.trim()))
    return r.link.trim();
  let e = "";
  if (typeof r.bvid == "string" && r.bvid.startsWith("BV"))
    e = r.bvid;
  else if (typeof r.id == "string" && r.id.startsWith("BV"))
    e = r.id;
  else if (typeof r.url == "string" && r.url.includes("BV")) {
    const a = r.url.match(/BV[a-zA-Z0-9]+/);
    a && (e = a[0]);
  }
  if (e)
    return `https://www.bilibili.com/video/${e}`;
  const i = String(r.aid || r.id || "").replace(/\D/g, "");
  return i ? `https://www.bilibili.com/video/av${i}` : "https://www.bilibili.com";
}
function H(r) {
  const e = r.duration || 0, t = Math.floor(e / 60), i = String(e % 60).padStart(2, "0"), a = `${t}:${i}`, s = r.cnt_info?.play ? r.cnt_info.play > 1e4 ? `${(r.cnt_info.play / 1e4).toFixed(1)}万` : String(r.cnt_info.play) : "0", d = r.bvid ? `https://www.bilibili.com/video/${r.bvid}` : r.id ? `https://www.bilibili.com/video/av${r.id}` : r.link || "#";
  return {
    id: String(r.id || r.bvid),
    aid: String(r.id || ""),
    bvid: r.bvid,
    title: r.title,
    cover: r.cover,
    url: d,
    duration: a,
    playCount: s,
    author: r.upper?.name || "UP主",
    authorMid: String(r.upper?.mid || ""),
    authorFace: r.upper?.face || "",
    favoriteDate: r.fav_time ? new Date(r.fav_time * 1e3).toLocaleDateString() : "",
    intro: r.intro || "",
    selected: !1,
    writable: !0
  };
}
let _ = 21, B = 0;
function re(r, e) {
  return Math.max(1, Math.min(7, Math.floor((r + 14) / (e + 14))));
}
function Q(r, e) {
  return r?.status === 412 || r?.code === -412 ? "B 站暂时加载失败，请稍后再试。" : r?.message || e;
}
async function S(r, e = 1, t = "fav_time", i = "") {
  const a = o.organizer;
  a.loading = !0, a.error = "";
  const d = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[t] || "mtime", g = ++B, n = _;
  try {
    const l = await c.getFolderVideos(r, e, n, d, i);
    if (g !== B) return;
    a.videos = l.medias.map(H), a.selectedCount = 0, a.loadedFolderId = String(r), a.page = e, a.pageSize = n, a.totalItems = l.total, a.totalPages = Math.max(1, Math.ceil(l.total / n)), a.sort = t, a.query = i;
    const b = v.find((w) => String(w.id || w.fid) === String(r));
    a.folderTitle = b?.title || l.info?.title || "收藏夹", a.folderSubtitle = `共 ${l.total} 个内容`;
  } catch (l) {
    g === B && (a.error = Q(l, "加载视频列表失败"));
  } finally {
    g === B && (a.loading = !1);
  }
}
async function T(r = !1) {
  const e = o.organizer;
  e.loading = !0, e.error = "";
  try {
    const t = await c.getUserNav();
    if (!t.isLogin) {
      e.error = "未登录 B站", e.folderSubtitle = "未登录 B站，请先登录", e.loading = !1;
      return;
    }
    const [i, a] = await Promise.all([
      c.getCreatedFolders(t.mid),
      c.getCollectedFolders(1, 50, t.mid).catch(() => ({ count: 0, list: [] }))
    ]), s = a.list || [], d = c.getOtherFolders();
    v = [...i, ...s, ...d];
    const g = await c.treeManager.loadTree();
    (c.treeManager.syncTreeWithFolders(g, i) || r) && await c.treeManager.saveTree(g), m = g, y = await c.treeManager.loadCollapsedGroups(), o.collapsedGroups = Array.from(y);
    let l = o.activeFolderId;
    if (!l || !v.some((b) => String(b.id || b.fid) === String(l))) {
      const b = i.find((w) => /默认/.test(w.title)) || i[0] || v[0];
      l = b ? String(b.id || b.fid) : "", o.activeFolderId = l;
    }
    e.folders = c.treeManager.flattenTree(
      m,
      v,
      y,
      l
    ), l ? await S(l, 1, e.sort, e.query) : e.folderSubtitle = "暂无可用收藏夹";
  } catch (t) {
    e.error = Q(t, "读取 B 站收藏夹失败");
  } finally {
    e.loading = !1;
  }
}
const ie = {
  get active() {
    return o.mounted;
  },
  get state() {
    return o;
  },
  updateState(r) {
    Object.assign(o, r);
  },
  updateOrganizer(r) {
    Object.assign(o.organizer, r);
  },
  setMounted(r) {
    o.mounted = r, r && T();
  },
  loadOrganizer: T,
  loadFolderVideos: S,
  setOrganizerColumns(r) {
    _ = r * 3;
    const { organizer: e, activeFolderId: t } = o;
    if (e.loading || e.error || !t || e.loadedFolderId !== t || e.pageSize === _) return;
    const i = (e.page - 1) * e.pageSize;
    S(t, Math.floor(i / _) + 1, e.sort, e.query);
  },
  switchTab(r) {
    o.currentTab = r, this.dispatch("switch-tab", r);
  },
  async selectFolder(r) {
    const e = String(r), t = o.organizer;
    if (t.isTargetPickMode) {
      const i = v.find((s) => String(s.id || s.fid) === e);
      if (!i || i.isCollected || i.isOther) {
        u("无法移动到该分类，请选择您自建的有效收藏夹", { isError: !0 });
        return;
      }
      if (e === o.activeFolderId) {
        u("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: !0 });
        return;
      }
      t.isTargetPickMode = !1;
      const a = t.movingVideoId;
      if (t.movingVideoId = "", a) {
        u(`正在移动视频至「${i.title}」…`);
        const s = await c.moveVideo(o.activeFolderId, e, a);
        s.ok ? (u(`已移动至「${i.title}」`), await S(o.activeFolderId, t.page, t.sort, t.query)) : u(`移动失败：${s.reason || "未知错误"}`, { isError: !0 });
      } else if (t.batchMode) {
        const s = t.videos.filter((n) => n.selected);
        if (!s.length) return;
        const d = s.map((n) => n.aid || n.id);
        u(`正在批量移动 ${d.length} 个视频至「${i.title}」…`);
        const g = await c.moveVideo(o.activeFolderId, e, d);
        g.ok ? (u(`已将 ${d.length} 个视频移动至「${i.title}」`), t.videos.forEach((n) => n.selected = !1), t.selectedCount = 0, await S(o.activeFolderId, 1, t.sort, t.query)) : u(`批量移动失败：${g.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    o.activeFolderId = e, t.folders.forEach((i) => {
      i.selected = i.id === e;
    }), t.mode = "organizer", await S(e, 1, t.sort, "");
  },
  async toggleFolderGroup(r) {
    const e = String(r);
    y.has(e) ? y.delete(e) : y.add(e), o.collapsedGroups = Array.from(y), await c.treeManager.saveCollapsedGroups(y), o.organizer.folders = c.treeManager.flattenTree(
      m,
      v,
      y,
      o.activeFolderId
    );
  },
  async moveFolderNode(r, e, t) {
    c.treeManager.moveNode(m, r, e, t) && (await c.treeManager.saveTree(m), o.organizer.folders = c.treeManager.flattenTree(
      m,
      v,
      y,
      o.activeFolderId
    ), u("已更新收藏夹排序"));
  },
  async openCreateDialog(r) {
    const t = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (t?.openCreate)
      t.openCreate(r, async ({ name: i, privacy: a }) => {
        if (t.updateCreate({ status: r === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), r === "bili") {
          const s = await c.createRemoteFolder(i, Number(a || 0));
          if (!s.ok) {
            t.updateCreate({ status: s.reason || "创建失败", error: !0 });
            return;
          }
          t.closeCreate(), await T(!0), u(`已成功创建 B站收藏夹「${i}」`);
        } else {
          const s = c.treeManager.createGroupNode(i);
          m.children = m.children || [], m.children.push(s), await c.treeManager.saveTree(m), t.closeCreate(), o.organizer.folders = c.treeManager.flattenTree(
            m,
            v,
            y,
            o.activeFolderId
          ), u(`已建立本地分组「${i}」`);
        }
      });
    else {
      const i = (await D.prompt({
        title: r === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: r === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!i) return;
      if (r === "bili") {
        const a = await c.createRemoteFolder(i);
        a.ok ? (await T(!0), u(`已成功创建「${i}」`)) : u(`创建失败：${a.reason}`, { isError: !0 });
      } else {
        const a = c.treeManager.createGroupNode(i);
        m.children = m.children || [], m.children.push(a), await c.treeManager.saveTree(m), o.organizer.folders = c.treeManager.flattenTree(
          m,
          v,
          y,
          o.activeFolderId
        ), u(`已建立本地分组「${i}」`);
      }
    }
  },
  async handleVideoAction(r, e) {
    const t = o.organizer;
    let i = null;
    if (r && typeof r == "object" && (r.bvid || r.aid || r.id))
      i = r;
    else {
      const n = String(r || "");
      i = t.videos.find((l) => String(l.id) === n || String(l.bvid) === n || String(l.aid) === n) || t.specialVideos.find((l) => String(l.id) === n || String(l.bvid) === n || String(l.aid) === n) || t.cachedVideos.find((l) => String(l.id) === n || String(l.bvid) === n || String(l.aid) === n), !i && (n.startsWith("BV") || /^\d+$/.test(n)) && (i = {
        id: n,
        bvid: n.startsWith("BV") ? n : "",
        aid: /^\d+$/.test(n) ? n : "",
        title: n,
        url: `https://www.bilibili.com/video/${n}`
      });
    }
    if (!i) return;
    const a = i.bvid || (String(i.id || "").startsWith("BV") ? i.id : ""), s = i.aid || i.id, d = K(i), g = d || i.url;
    if (e === "play")
      a || i.aid ? U.openVideo({
        bvid: a,
        aid: String(s || ""),
        title: i.title || a,
        author: i.author ? `${i.author}` : "",
        url: g,
        cover: i.cover
      }) : g && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: g, active: !0 }) : window.open(g, "_blank"));
    else if (e === "open")
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: d, active: !0 }) : window.open(d, "_blank");
    else if (e === "copy-link")
      try {
        await navigator.clipboard.writeText(d), u(`已复制视频链接: ${d}`);
      } catch {
        u("复制链接失败", { isError: !0 });
      }
    else if (e === "move")
      t.isTargetPickMode && t.movingVideoId === i.aid ? (t.isTargetPickMode = !1, t.movingVideoId = "", u("已取消选择目标收藏夹")) : (t.isTargetPickMode = !0, t.movingVideoId = i.aid, u(`请点击左侧收藏夹，将《${i.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${i.title}》`
      }));
    else if (e === "delete") {
      const n = i.aid || i.id, l = o.activeFolderId, b = await c.deleteVideo(l, n);
      b.ok ? (u(`已取消收藏《${i.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          u(`正在还原《${i.title}》…`);
          const w = await c.addVideoToFavorite(l, n);
          w.ok ? (u(`已还原《${i.title}》`), await S(l, t.page, t.sort, t.query)) : u(`还原失败：${w.reason || "未知错误"}`, { isError: !0 });
        }
      }), await S(l, t.page, t.sort, t.query)) : u(`取消收藏失败：${b.reason || "未知错误"}`, { isError: !0 });
    } else if (e === "subtitle") {
      const n = a || (String(i.id || "").startsWith("BV") ? i.id : "");
      n || i.aid ? j.open({
        bvid: n || String(i.aid || i.id || ""),
        cid: i.cid,
        title: i.title || n
      }) : u("该视频暂无字幕信息", { isError: !0 });
    } else if (e === "create-task") {
      const { biliVideoTaskController: n } = await import("./video-task-store-BGh0A3YE.js");
      n.open({
        bvid: i.bvid || (String(i.id || "").startsWith("BV") ? i.id : ""),
        aid: i.aid || i.id,
        title: i.title || "",
        cover: i.cover,
        author: i.author,
        authorMid: i.authorMid,
        playCount: i.playCount,
        duration: i.duration,
        url: g
      });
    } else if (e === "cache") {
      const { cacheBiliVideo: n } = await import("./cache.service-D9IOG9o-.js");
      await n({ bvid: i.bvid, aid: i.aid, title: i.title, cover: i.cover });
    } else if (e === "collect-inbox") {
      const n = v.find((w) => /收集箱|默认|Inbox/i.test(w.title)) || v.find((w) => !w.isCollected && !w.isOther) || v[0];
      if (!n) {
        u("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const l = i.aid || i.id;
      u(`正在将《${i.title}》添加到「${n.title}」…`);
      const b = await c.addVideoToFavorite(n.id, l);
      b.ok ? u(`✓ 已成功添加到「${n.title}」`) : u(`添加失败：${b.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(r) {
    return R.add(r), () => {
      R.delete(r);
    };
  },
  dispatch(r, e) {
    const t = o.organizer;
    switch (r) {
      case "select-folder":
        this.selectFolder(e?.id ?? e);
        break;
      case "toggle-folder-group":
        this.toggleFolderGroup(e?.id ?? e);
        break;
      case "move-folder-node":
        e?.sourceId && e?.targetId && this.moveFolderNode(e.sourceId, e.targetId, e.mode || "before");
        break;
      case "create-bili-folder":
        this.openCreateDialog("bili");
        break;
      case "create-local-group":
        this.openCreateDialog("plugin");
        break;
      case "organizer-refresh":
        T(!0);
        break;
      case "subscription-toggle-desc-panel":
        t.showFullDescInRightPanel = !t.showFullDescInRightPanel;
        break;
      case "organizer-open":
        t.mode = "organizer", t.isTargetPickMode = !1, t.movingVideoId = "", t.batchMode = !1, t.folders.length || T();
        break;
      case "open-radio":
        t.mode = "radio", t.isTargetPickMode = !1, t.movingVideoId = "", t.batchMode = !1, p.init();
        break;
      case "radio-refresh":
        p.refresh();
        break;
      case "radio-select-folder":
        p.selectFolder(Number(e));
        break;
      case "radio-add":
        p.add(e);
        break;
      case "radio-remove":
        p.remove(Number(e?.index));
        break;
      case "radio-clear":
        p.clear();
        break;
      case "radio-save":
        p.save(String(e?.name || ""));
        break;
      case "radio-load-series":
        p.loadSeries(String(e?.id ?? e));
        break;
      case "radio-play-series":
        typeof e == "object" && e !== null ? p.playSeries(String(e.id || ""), Number(e.startIndex || 0)) : p.playSeries(String(e));
        break;
      case "radio-delete-series":
        p.deleteSeries(String(e));
        break;
      case "radio-rename-series": {
        const i = e;
        i?.id && i?.name && p.renameSeries(i.id, i.name);
        break;
      }
      case "radio-play-index":
        p.playAt(Number(e));
        break;
      case "radio-play":
        p.play(!1, typeof e == "number" ? e : 0);
        break;
      case "radio-shuffle":
        p.play(!0);
        break;
      case "organizer-sort":
        ["fav_time", "view", "pubtime"].includes(e) && S(o.activeFolderId, 1, e, t.query);
        break;
      case "organizer-search":
        S(o.activeFolderId, 1, t.sort, String(e || "").trim());
        break;
      case "organizer-page": {
        const i = Number(e);
        Number.isFinite(i) && i >= 1 && S(o.activeFolderId, i, t.sort, t.query);
        break;
      }
      case "organizer-batch-toggle":
        t.batchMode = !t.batchMode, t.batchMode || (t.videos.forEach((i) => i.selected = !1), t.selectedCount = 0);
        break;
      case "organizer-batch-select": {
        const i = String(e || ""), a = t.videos.find((s) => s.id === i || s.bvid === i);
        a && (a.selected = !a.selected, t.selectedCount = t.videos.filter((s) => s.selected).length);
        break;
      }
      case "organizer-batch-all": {
        const i = t.videos.length > 0 && t.videos.every((a) => a.selected);
        t.videos.forEach((a) => a.selected = !i), t.selectedCount = i ? 0 : t.videos.length;
        break;
      }
      case "organizer-batch-move": {
        const i = t.videos.filter((a) => a.selected).length;
        if (!i) {
          u("请先选择要移动的视频", { isError: !0 });
          return;
        }
        t.isTargetPickMode = !0, u(`请点击左侧目标收藏夹，将 ${i} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const i = t.videos.filter((a) => a.selected);
        if (!i.length) {
          u("请先选择要取消收藏的视频", { isError: !0 });
          return;
        }
        (async () => {
          if (await D.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${i.length} 个视频吗？`,
            danger: !0
          })) {
            const s = o.activeFolderId, d = i.map((n) => n.aid || n.id);
            u(`正在批量移除 ${d.length} 个视频…`);
            let g = 0;
            for (const n of d)
              (await c.deleteVideo(s, n)).ok && g++;
            u(`已移除 ${g}/${d.length} 个视频`), t.batchMode = !1, t.selectedCount = 0, await S(s, t.page, t.sort, t.query);
          }
        })();
        break;
      }
      case "organizer-play-video":
      case "special-play-video": {
        this.handleVideoAction(e, "play");
        break;
      }
      case "organizer-video-action":
      case "special-video-action":
        e?.action && this.handleVideoAction(e.video || e.id, e.action);
        break;
      case "organizer-cancel-move-target":
        t.isTargetPickMode = !1, t.movingVideoId = "", u("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const i = globalThis;
        typeof i.openBiliUpGroupManagerDialog == "function" ? i.openBiliUpGroupManagerDialog() : i.LogicWeaverBiliUpGroupManager?.open && i.LogicWeaverBiliUpGroupManager.open();
        break;
      }
    }
    for (const i of R)
      try {
        i(r, e);
      } catch (a) {
        console.error("[BiliFavorites] Action error:", a);
      }
  }
};
export {
  z as L,
  o as a,
  ie as b,
  p as c,
  M as d,
  f as e,
  re as f,
  j as s
};
