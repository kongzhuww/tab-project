import { n as w, b as c, a as O } from "./github.service-DdJVB3Fj.js";
import { r as R } from "./vendor-vue-BbmU9NUg.js";
import { a as _ } from "./read-session-B_uIJVOk.js";
import { t as U } from "./_plugin-vue_export-helper-CP_tFnee.js";
import { b as Q } from "./radio-player-C73LVkPX.js";
const $ = "biliRadioSeriesV1", C = "lw_backup_bili_radio_series", E = "default-series";
let k = 0, V = !1, P = Promise.resolve();
function F(r) {
  return r instanceof Error ? r.message : "读取电台失败";
}
function M(r) {
  return {
    bvid: String(r?.bvid || ""),
    title: String(r?.title || "未命名视频"),
    cover: String(r?.cover || "").replace(/^http:/, "https:"),
    author: String(r?.author || r?.upper?.name || r?.upper || ""),
    duration: Number(r?.duration || 0)
  };
}
async function D(r) {
  return typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get(r) : {};
}
async function B() {
  const r = await D([$, C]);
  for (const e of [$, C])
    if (r[e] !== void 0) {
      if (!Array.isArray(r[e])) throw new Error("电台存储格式无效，未覆盖数据");
      return r[e];
    }
  for (const e of [$, C]) {
    const i = localStorage.getItem(e);
    if (i !== null) {
      let t;
      try {
        t = JSON.parse(i);
      } catch {
        throw new Error("电台本地副本无法解析，未覆盖数据");
      }
      if (!Array.isArray(t)) throw new Error("电台本地副本格式无效，未覆盖数据");
      return t;
    }
  }
  return null;
}
function N(r) {
  return r.map((e) => {
    if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("电台系列格式无效，未覆盖数据");
    const i = e, t = i.items == null ? [] : Array.isArray(i.items) ? i.items : typeof i.items == "object" ? Object.values(i.items) : null;
    if (!t) throw new Error("电台曲目格式无效，未覆盖数据");
    const o = t.map((s) => {
      if (!s || typeof s != "object" || Array.isArray(s)) throw new Error("电台曲目格式无效，未覆盖数据");
      const d = s;
      if (typeof d.bvid != "string" || !d.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const g = M(d);
      if (!Number.isFinite(g.duration)) throw new Error("电台曲目时长格式无效，未覆盖数据");
      return { ...d, ...g };
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
async function I(r) {
  if (!r.length) {
    const t = (await D([$]))[$];
    if (Array.isArray(t) && t.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const e = JSON.stringify(r);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [$]: r, [C]: r }), localStorage.setItem($, e), localStorage.setItem(C, e);
}
function x(r = 0, e = !1, i) {
  const t = a.radioQueue.map((s) => ({ ...s, upper: s.author }));
  if (!t.length) return;
  if (e) {
    for (let s = t.length - 1; s > 0; s--) {
      const d = Math.floor(Math.random() * (s + 1));
      [t[s], t[d]] = [t[d], t[s]];
    }
    r = 0;
  }
  const o = Math.max(0, Math.min(t.length - 1, Number(r) || 0));
  Q.playQueue({
    name: i || (e ? "B站电台 · 随机" : "B站电台"),
    items: t,
    startIndex: o
  });
}
typeof window < "u" && (window.playBiliRadioQueue = x);
const m = {
  async init() {
    if (!V) {
      V = !0;
      try {
        const r = await B();
        a.radioSeries = r === null ? [{ id: E, name: "默认系列", count: 0, items: [] }] : N(r), r === null && (a.radioSeriesName = "默认系列");
      } catch (r) {
        V = !1, console.warn("[BiliRadio] 读取系列失败", r);
      }
    }
    await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const r = N(await B() ?? []);
    return r.length && await I(r), a.radioSeries = r, {
      ok: !0,
      repairedCount: r.length,
      emptySeries: r.filter((e) => !e.items.length).map((e) => ({ id: e.id, name: e.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: r.map((e) => ({ id: e.id, name: e.name, count: e.count, sampleItem: e.items[0]?.title }))
    };
  },
  async refresh() {
    const r = ++k;
    a.radioLoading = !0, a.radioError = "";
    try {
      const e = await c.getUserNav();
      if (!e.isLogin) throw new Error("请先登录 B站");
      const i = await c.getCreatedFolders(e.mid);
      if (r !== k) return;
      a.radioFolders = i.map((o) => ({
        id: Number(o.id),
        title: o.title || "收藏夹",
        count: Number(o.media_count || 0)
      }));
      const t = a.radioFolders[0];
      t ? await this.selectFolder(t.id) : (a.radioActiveFolderId = 0, a.radioVideos = []), this.autoHealEmptySeries();
    } catch (e) {
      r === k && (a.radioError = F(e));
    } finally {
      r === k && (a.radioLoading = !1);
    }
  },
  async autoHealEmptySeries() {
    let r = !1;
    for (const e of a.radioSeries)
      if (e.id !== E && (e.count === 0 || !e.items.length)) {
        const i = a.radioFolders.find(
          (t) => t.title.trim().toLowerCase() === e.name.trim().toLowerCase()
        );
        if (i)
          try {
            const o = ((await c.getFolderVideos(i.id, 1, 40)).medias || []).map((s) => M({ ...s, author: s.upper?.name }));
            o.length && (e.items = o, e.count = o.length, r = !0);
          } catch {
          }
      }
    if (r)
      try {
        await I(a.radioSeries);
      } catch (e) {
        a.radioError = `系列已补全，但保存未确认：${F(e)}`;
      }
  },
  async selectFolder(r) {
    const e = Number(r);
    if (!a.radioFolders.some((t) => Number(t.id) === e) || e === a.radioActiveFolderId && a.radioVideos.length > 0)
      return;
    const i = ++k;
    a.radioActiveFolderId = e, a.radioLoading = !0, a.radioError = "";
    try {
      const t = /* @__PURE__ */ new Map(), o = 4;
      for (let s = 1; s <= o; s++) {
        const d = await c.getFolderVideos(e, s, 40);
        if (i !== k) return;
        for (const n of d.medias || [])
          n.bvid && t.set(n.bvid, M({ ...n, author: n.upper?.name }));
        const g = a.radioFolders.find((n) => Number(n.id) === e)?.count || 0;
        if (!d.medias?.length || t.size >= Math.max(d.total, g)) break;
      }
      a.radioVideos = [...t.values()];
    } catch (t) {
      i === k && (a.radioError = F(t));
    } finally {
      i === k && (a.radioLoading = !1);
    }
  },
  add(r) {
    !r.bvid || a.radioQueue.some((e) => e.bvid === r.bvid) || a.radioQueue.push(M(r));
  },
  addToDefaultSeries(r) {
    const e = P.then(async () => {
      if (!r.bvid) throw new Error("视频缺少 B 站编号");
      const i = await B(), t = N(i ?? []);
      let o = t.find((s) => s.id === E || s.name === "默认系列");
      return o || (o = { id: E, name: "默认系列", count: 0, items: [] }, t.push(o)), o.items.some((s) => s.bvid === r.bvid) ? !1 : (o.items.push(M(r)), o.count = o.items.length, await I(t), a.radioSeries = t, V = !0, !0);
    });
    return P = e.then(() => {
    }, () => {
    }), e;
  },
  remove(r) {
    Number.isInteger(r) && r >= 0 && r < a.radioQueue.length && a.radioQueue.splice(r, 1);
  },
  clear() {
    a.radioQueue = [];
  },
  play(r = !1, e = 0) {
    x(e, r);
  },
  playAt(r) {
    if (!a.radioQueue.length) return;
    const e = Math.max(0, Math.min(a.radioQueue.length - 1, Number(r) || 0));
    x(e, !1);
  },
  async loadSeries(r) {
    const e = a.radioSeries.find((i) => i.id === r);
    if (e) {
      if (!e.items.length && e.id !== E) {
        const i = a.radioFolders.find(
          (t) => t.title.trim().toLowerCase() === e.name.trim().toLowerCase()
        );
        if (i) {
          w.fetch("哔哩哔哩电台", `正在从「${i.title}」收藏夹自动补齐系列曲目…`);
          try {
            const o = ((await c.getFolderVideos(i.id, 1, 40)).medias || []).map((s) => M({ ...s, author: s.upper?.name }));
            o.length && (e.items = o, e.count = o.length, await I(a.radioSeries));
          } catch (t) {
            a.radioError = `读取或保存补全系列失败：${F(t)}`, w.fetch("哔哩哔哩电台", a.radioError);
          }
        }
      }
      if (!e.items.length) {
        a.radioSeriesName = e.name, w.fetch("哔哩哔哩电台", `系列「${e.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      a.radioQueue = e.items.map(M), a.radioSeriesName = e.name, w.fetch("哔哩哔哩电台", `已载入系列「${e.name}」（共 ${e.count} 首）`);
    }
  },
  async playSeries(r, e = 0) {
    await this.loadSeries(r);
    const i = a.radioSeries.find((t) => t.id === r);
    i?.items.length && x(e, !1, i.name);
  },
  async deleteSeries(r) {
    const i = a.radioSeries.find((o) => o.id === r)?.name || "系列", t = a.radioSeries.filter((o) => o.id !== r);
    try {
      await I(t), a.radioSeries = t, w.fetch("哔哩哔哩电台", `已删除电台系列「${i}」`);
    } catch (o) {
      a.radioError = `删除系列失败：${F(o)}`, w.fetch("哔哩哔哩电台", `删除系列失败：${F(o)}`);
    }
  },
  async renameSeries(r, e) {
    const i = e.trim();
    if (!i) return;
    const t = a.radioSeries.find((d) => d.id === r);
    if (!t) return;
    const o = t.name, s = a.radioSeries.map((d) => d.id === r ? { ...d, name: i } : d);
    try {
      await I(s), a.radioSeries = s, a.radioSeriesName === o && (a.radioSeriesName = i), w.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${i}」`);
    } catch (d) {
      a.radioError = `重命名系列失败：${F(d)}`, w.fetch("哔哩哔哩电台", `重命名系列失败：${F(d)}`);
    }
  },
  async save(r) {
    if (!a.radioQueue.length) {
      w.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    const e = (r || a.radioSeriesName || "").trim();
    if (!e) {
      a.radioError = "保存失败：系列名称不能为空，请输入系列名称", w.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
    }
    const i = a.radioQueue.map((s) => ({ ...s })), t = a.radioSeries.findIndex((s) => s.name === e);
    let o = [...a.radioSeries];
    if (t >= 0) {
      const s = o[t];
      o[t] = {
        ...s,
        count: i.length,
        items: i
      };
    } else
      o.push({
        id: `series_${Date.now()}`,
        name: e,
        count: i.length,
        items: i
      });
    try {
      await I(o), a.radioSeries = o, a.radioSeriesName = "", w.fetch(
        "哔哩哔哩电台",
        t >= 0 ? `✓ 已更新系列「${e}」（共 ${i.length} 首）` : `★ 已保存系列「${e}」（共 ${i.length} 首）`
      );
    } catch (s) {
      const d = F(s);
      a.radioError = `保存系列失败：${d}`, w.fetch("哔哩哔哩电台", `保存系列失败：${d}`);
    }
  }
};
typeof window < "u" && window.addEventListener("logicweaver:sync-restored", () => {
  (async () => {
    try {
      a.radioSeries = N(await B() ?? []);
    } catch (r) {
      console.warn("[BiliRadio] 云同步恢复系列重载失败", r);
    }
  })();
});
const f = R({
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
}), q = {
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
        f.cues = e.cues.map((o) => ({ from: o.from, to: o.to, content: o.content.trim() })).filter((o) => !!o.content);
        const t = f.cues.map((o) => o.content).join(`
`);
        f.fullText = t, f.charCount = t.length;
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
    const r = new Blob([f.fullText], { type: "text/plain;charset=utf-8" }), e = URL.createObjectURL(r), i = document.createElement("a");
    i.href = e, i.download = `${(f.title || f.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(i), i.click(), i.remove(), URL.revokeObjectURL(e);
  }
}, a = R({
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
    heroLyricText: U("bili.hero.defaultLyric"),
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
    subscriptionScriptMode: "newspaper",
    subscriptionChannels: [],
    subscriptionVideos: [],
    subscriptionChapters: [],
    subscriptionCues: [],
    subscriptionDescription: [],
    showFullDescInRightPanel: !1,
    subscriptionCurrent: null
  }
}), L = /* @__PURE__ */ new Set();
let b = [], h = { id: "root", type: "folder", children: [] }, y = /* @__PURE__ */ new Set();
function u(r, e) {
  const i = globalThis;
  typeof i.showBiliToast == "function" ? i.showBiliToast(r, 3200, e) : typeof i.showWindowsToast == "function" && i.showWindowsToast({
    id: `bili_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "哔哩哔哩",
    message: r,
    duration: 3200
  });
}
function W(r) {
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
    const o = r.url.match(/BV[a-zA-Z0-9]+/);
    o && (e = o[0]);
  }
  if (e)
    return `https://www.bilibili.com/video/${e}`;
  const t = String(r.aid || r.id || "").replace(/\D/g, "");
  return t ? `https://www.bilibili.com/video/av${t}` : "https://www.bilibili.com";
}
function j(r) {
  const e = r.duration || 0, i = Math.floor(e / 60), t = String(e % 60).padStart(2, "0"), o = `${i}:${t}`, s = r.cnt_info?.play ? r.cnt_info.play > 1e4 ? `${(r.cnt_info.play / 1e4).toFixed(1)}万` : String(r.cnt_info.play) : "0", d = r.bvid ? `https://www.bilibili.com/video/${r.bvid}` : r.id ? `https://www.bilibili.com/video/av${r.id}` : r.link || "#";
  return {
    id: String(r.id || r.bvid),
    aid: String(r.id || ""),
    bvid: r.bvid,
    title: r.title,
    cover: r.cover,
    url: d,
    duration: o,
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
let A = 21, z = 0;
function X(r, e) {
  return Math.max(1, Math.min(7, Math.floor((r + 14) / (e + 14))));
}
function G(r, e) {
  return r?.status === 412 || r?.code === -412 ? "B 站暂时加载失败，请稍后再试。" : r?.message || e;
}
async function S(r, e = 1, i = "fav_time", t = "") {
  const o = a.organizer;
  o.loading = !0, o.error = "";
  const d = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[i] || "mtime", g = ++z, n = A;
  try {
    const l = await c.getFolderVideos(r, e, n, d, t);
    if (g !== z) return;
    o.videos = l.medias.map(j), o.selectedCount = 0, o.loadedFolderId = String(r), o.page = e, o.pageSize = n, o.totalItems = l.total, o.totalPages = Math.max(1, Math.ceil(l.total / n)), o.sort = i, o.query = t;
    const p = b.find((v) => String(v.id || v.fid) === String(r));
    o.folderTitle = p?.title || l.info?.title || "收藏夹", o.folderSubtitle = `共 ${l.total} 个内容`;
  } catch (l) {
    g === z && (o.error = G(l, "加载视频列表失败"));
  } finally {
    g === z && (o.loading = !1);
  }
}
async function T(r = !1) {
  const e = a.organizer;
  e.loading = !0, e.error = "";
  try {
    const i = await c.getUserNav();
    if (!i.isLogin) {
      e.error = "未登录 B站", e.folderSubtitle = "未登录 B站，请先登录", e.loading = !1;
      return;
    }
    const [t, o] = await Promise.all([
      c.getCreatedFolders(i.mid),
      c.getCollectedFolders(1, 50, i.mid).catch(() => ({ count: 0, list: [] }))
    ]), s = o.list || [], d = c.getOtherFolders();
    b = [...t, ...s, ...d];
    const g = await c.treeManager.loadTree();
    (c.treeManager.syncTreeWithFolders(g, t) || r) && await c.treeManager.saveTree(g), h = g, y = await c.treeManager.loadCollapsedGroups(), a.collapsedGroups = Array.from(y);
    let l = a.activeFolderId;
    if (!l || !b.some((p) => String(p.id || p.fid) === String(l))) {
      const p = t.find((v) => /默认/.test(v.title)) || t[0] || b[0];
      l = p ? String(p.id || p.fid) : "", a.activeFolderId = l;
    }
    e.folders = c.treeManager.flattenTree(
      h,
      b,
      y,
      l
    ), l ? await S(l, 1, e.sort, e.query) : e.folderSubtitle = "暂无可用收藏夹";
  } catch (i) {
    e.error = G(i, "读取 B 站收藏夹失败");
  } finally {
    e.loading = !1;
  }
}
const ee = {
  get active() {
    return a.mounted;
  },
  get state() {
    return a;
  },
  updateState(r) {
    Object.assign(a, r);
  },
  updateOrganizer(r) {
    Object.assign(a.organizer, r);
  },
  setMounted(r) {
    a.mounted = r, r && T();
  },
  loadOrganizer: T,
  loadFolderVideos: S,
  setOrganizerColumns(r) {
    A = r * 3;
    const { organizer: e, activeFolderId: i } = a;
    if (e.loading || e.error || !i || e.loadedFolderId !== i || e.pageSize === A) return;
    const t = (e.page - 1) * e.pageSize;
    S(i, Math.floor(t / A) + 1, e.sort, e.query);
  },
  switchTab(r) {
    a.currentTab = r, this.dispatch("switch-tab", r);
  },
  async selectFolder(r) {
    const e = String(r), i = a.organizer;
    if (i.isTargetPickMode) {
      const t = b.find((s) => String(s.id || s.fid) === e);
      if (!t || t.isCollected || t.isOther) {
        u("无法移动到该分类，请选择您自建的有效收藏夹", { isError: !0 });
        return;
      }
      if (e === a.activeFolderId) {
        u("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: !0 });
        return;
      }
      i.isTargetPickMode = !1;
      const o = i.movingVideoId;
      if (i.movingVideoId = "", o) {
        u(`正在移动视频至「${t.title}」…`);
        const s = await c.moveVideo(a.activeFolderId, e, o);
        s.ok ? (u(`已移动至「${t.title}」`), await S(a.activeFolderId, i.page, i.sort, i.query)) : u(`移动失败：${s.reason || "未知错误"}`, { isError: !0 });
      } else if (i.batchMode) {
        const s = i.videos.filter((n) => n.selected);
        if (!s.length) return;
        const d = s.map((n) => n.aid || n.id);
        u(`正在批量移动 ${d.length} 个视频至「${t.title}」…`);
        const g = await c.moveVideo(a.activeFolderId, e, d);
        g.ok ? (u(`已将 ${d.length} 个视频移动至「${t.title}」`), i.videos.forEach((n) => n.selected = !1), i.selectedCount = 0, await S(a.activeFolderId, 1, i.sort, i.query)) : u(`批量移动失败：${g.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    a.activeFolderId = e, i.folders.forEach((t) => {
      t.selected = t.id === e;
    }), i.mode = "organizer", await S(e, 1, i.sort, "");
  },
  async toggleFolderGroup(r) {
    const e = String(r);
    y.has(e) ? y.delete(e) : y.add(e), a.collapsedGroups = Array.from(y), await c.treeManager.saveCollapsedGroups(y), a.organizer.folders = c.treeManager.flattenTree(
      h,
      b,
      y,
      a.activeFolderId
    );
  },
  async moveFolderNode(r, e, i) {
    c.treeManager.moveNode(h, r, e, i) && (await c.treeManager.saveTree(h), a.organizer.folders = c.treeManager.flattenTree(
      h,
      b,
      y,
      a.activeFolderId
    ), u("已更新收藏夹排序"));
  },
  async openCreateDialog(r) {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (i?.openCreate)
      i.openCreate(r, async ({ name: t, privacy: o }) => {
        if (i.updateCreate({ status: r === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), r === "bili") {
          const s = await c.createRemoteFolder(t, Number(o || 0));
          if (!s.ok) {
            i.updateCreate({ status: s.reason || "创建失败", error: !0 });
            return;
          }
          i.closeCreate(), await T(!0), u(`已成功创建 B站收藏夹「${t}」`);
        } else {
          const s = c.treeManager.createGroupNode(t);
          h.children = h.children || [], h.children.push(s), await c.treeManager.saveTree(h), i.closeCreate(), a.organizer.folders = c.treeManager.flattenTree(
            h,
            b,
            y,
            a.activeFolderId
          ), u(`已建立本地分组「${t}」`);
        }
      });
    else {
      const t = (await _.prompt({
        title: r === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: r === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!t) return;
      if (r === "bili") {
        const o = await c.createRemoteFolder(t);
        o.ok ? (await T(!0), u(`已成功创建「${t}」`)) : u(`创建失败：${o.reason}`, { isError: !0 });
      } else {
        const o = c.treeManager.createGroupNode(t);
        h.children = h.children || [], h.children.push(o), await c.treeManager.saveTree(h), a.organizer.folders = c.treeManager.flattenTree(
          h,
          b,
          y,
          a.activeFolderId
        ), u(`已建立本地分组「${t}」`);
      }
    }
  },
  async handleVideoAction(r, e) {
    const i = a.organizer;
    let t = null;
    if (r && typeof r == "object" && (r.bvid || r.aid || r.id))
      t = r;
    else {
      const n = String(r || "");
      t = i.videos.find((l) => String(l.id) === n || String(l.bvid) === n || String(l.aid) === n) || i.specialVideos.find((l) => String(l.id) === n || String(l.bvid) === n || String(l.aid) === n) || i.cachedVideos.find((l) => String(l.id) === n || String(l.bvid) === n || String(l.aid) === n), !t && (n.startsWith("BV") || /^\d+$/.test(n)) && (t = {
        id: n,
        bvid: n.startsWith("BV") ? n : "",
        aid: /^\d+$/.test(n) ? n : "",
        title: n,
        url: `https://www.bilibili.com/video/${n}`
      });
    }
    if (!t) return;
    const o = t.bvid || (String(t.id || "").startsWith("BV") ? t.id : ""), s = t.aid || t.id, d = W(t), g = d || t.url;
    if (e === "play")
      o || t.aid ? O.openVideo({
        bvid: o,
        aid: String(s || ""),
        title: t.title || o,
        author: t.author ? `${t.author}` : "",
        url: g,
        cover: t.cover
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
      i.isTargetPickMode && i.movingVideoId === t.aid ? (i.isTargetPickMode = !1, i.movingVideoId = "", u("已取消选择目标收藏夹")) : (i.isTargetPickMode = !0, i.movingVideoId = t.aid, u(`请点击左侧收藏夹，将《${t.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${t.title}》`
      }));
    else if (e === "delete") {
      const n = t.aid || t.id, l = a.activeFolderId, p = await c.deleteVideo(l, n);
      p.ok ? (u(`已取消收藏《${t.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          u(`正在还原《${t.title}》…`);
          const v = await c.addVideoToFavorite(l, n);
          v.ok ? (u(`已还原《${t.title}》`), await S(l, i.page, i.sort, i.query)) : u(`还原失败：${v.reason || "未知错误"}`, { isError: !0 });
        }
      }), await S(l, i.page, i.sort, i.query)) : u(`取消收藏失败：${p.reason || "未知错误"}`, { isError: !0 });
    } else if (e === "subtitle") {
      const n = o || (String(t.id || "").startsWith("BV") ? t.id : "");
      n || t.aid ? q.open({
        bvid: n || String(t.aid || t.id || ""),
        cid: t.cid,
        title: t.title || n
      }) : u("该视频暂无字幕信息", { isError: !0 });
    } else if (e === "create-task") {
      const { biliVideoTaskController: n } = await import("./video-task-store-BUsFQtf0.js");
      n.open({
        bvid: t.bvid || (String(t.id || "").startsWith("BV") ? t.id : ""),
        aid: t.aid || t.id,
        title: t.title || "",
        cover: t.cover,
        author: t.author,
        authorMid: t.authorMid,
        playCount: t.playCount,
        duration: t.duration,
        url: g
      });
    } else if (e === "cache") {
      const { cacheBiliVideo: n } = await import("./cache.service-BqnRH_ey.js");
      await n({ bvid: t.bvid, aid: t.aid, title: t.title, cover: t.cover });
    } else if (e === "collect-inbox") {
      const n = b.find((v) => /收集箱|默认|Inbox/i.test(v.title)) || b.find((v) => !v.isCollected && !v.isOther) || b[0];
      if (!n) {
        u("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const l = t.aid || t.id;
      u(`正在将《${t.title}》添加到「${n.title}」…`);
      const p = await c.addVideoToFavorite(n.id, l);
      p.ok ? u(`✓ 已成功添加到「${n.title}」`) : u(`添加失败：${p.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(r) {
    return L.add(r), () => {
      L.delete(r);
    };
  },
  dispatch(r, e) {
    const i = a.organizer;
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
        i.showFullDescInRightPanel = !i.showFullDescInRightPanel;
        break;
      case "organizer-open":
        i.mode = "organizer", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, i.folders.length || T();
        break;
      case "open-radio":
        i.mode = "radio", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, m.init();
        break;
      case "radio-refresh":
        m.refresh();
        break;
      case "radio-select-folder":
        m.selectFolder(Number(e));
        break;
      case "radio-add":
        m.add(e);
        break;
      case "radio-remove":
        m.remove(Number(e?.index));
        break;
      case "radio-clear":
        m.clear();
        break;
      case "radio-save":
        m.save(String(e?.name || ""));
        break;
      case "radio-load-series":
        m.loadSeries(String(e?.id ?? e));
        break;
      case "radio-play-series":
        typeof e == "object" && e !== null ? m.playSeries(String(e.id || ""), Number(e.startIndex || 0)) : m.playSeries(String(e));
        break;
      case "radio-delete-series":
        m.deleteSeries(String(e));
        break;
      case "radio-rename-series": {
        const t = e;
        t?.id && t?.name && m.renameSeries(t.id, t.name);
        break;
      }
      case "radio-play-index":
        m.playAt(Number(e));
        break;
      case "radio-play":
        m.play(!1, typeof e == "number" ? e : 0);
        break;
      case "radio-shuffle":
        m.play(!0);
        break;
      case "organizer-sort":
        ["fav_time", "view", "pubtime"].includes(e) && S(a.activeFolderId, 1, e, i.query);
        break;
      case "organizer-search":
        S(a.activeFolderId, 1, i.sort, String(e || "").trim());
        break;
      case "organizer-page": {
        const t = Number(e);
        Number.isFinite(t) && t >= 1 && S(a.activeFolderId, t, i.sort, i.query);
        break;
      }
      case "organizer-batch-toggle":
        i.batchMode = !i.batchMode, i.batchMode || (i.videos.forEach((t) => t.selected = !1), i.selectedCount = 0);
        break;
      case "organizer-batch-select": {
        const t = String(e || ""), o = i.videos.find((s) => s.id === t || s.bvid === t);
        o && (o.selected = !o.selected, i.selectedCount = i.videos.filter((s) => s.selected).length);
        break;
      }
      case "organizer-batch-all": {
        const t = i.videos.length > 0 && i.videos.every((o) => o.selected);
        i.videos.forEach((o) => o.selected = !t), i.selectedCount = t ? 0 : i.videos.length;
        break;
      }
      case "organizer-batch-move": {
        const t = i.videos.filter((o) => o.selected).length;
        if (!t) {
          u("请先选择要移动的视频", { isError: !0 });
          return;
        }
        i.isTargetPickMode = !0, u(`请点击左侧目标收藏夹，将 ${t} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const t = i.videos.filter((o) => o.selected);
        if (!t.length) {
          u("请先选择要取消收藏的视频", { isError: !0 });
          return;
        }
        (async () => {
          if (await _.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${t.length} 个视频吗？`,
            danger: !0
          })) {
            const s = a.activeFolderId, d = t.map((n) => n.aid || n.id);
            u(`正在批量移除 ${d.length} 个视频…`);
            let g = 0;
            for (const n of d)
              (await c.deleteVideo(s, n)).ok && g++;
            u(`已移除 ${g}/${d.length} 个视频`), i.batchMode = !1, i.selectedCount = 0, await S(s, i.page, i.sort, i.query);
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
        i.isTargetPickMode = !1, i.movingVideoId = "", u("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const t = globalThis;
        typeof t.openBiliUpGroupManagerDialog == "function" ? t.openBiliUpGroupManagerDialog() : t.LogicWeaverBiliUpGroupManager?.open && t.LogicWeaverBiliUpGroupManager.open();
        break;
      }
    }
    for (const t of L)
      try {
        t(r, e);
      } catch (o) {
        console.error("[BiliFavorites] Action error:", o);
      }
  }
};
export {
  a,
  ee as b,
  m as c,
  f as d,
  X as f,
  q as s
};
