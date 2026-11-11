import { n as v, c as l, O as _, d as P } from "./view-styles-BpIk8nIx.js";
import { r as A } from "./vendor-vue-9b0eS4bW.js";
import { a as x } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { t as R } from "./_plugin-vue_export-helper-BxikU0LD.js";
const $ = "biliRadioSeriesV1", E = "lw_backup_bili_radio_series";
let F = 0, C = !1;
function k(t) {
  return t instanceof Error ? t.message : "读取电台失败";
}
function T(t) {
  return {
    bvid: String(t?.bvid || ""),
    title: String(t?.title || "未命名视频"),
    cover: String(t?.cover || "").replace(/^http:/, "https:"),
    author: String(t?.author || t?.upper?.name || t?.upper || ""),
    duration: Number(t?.duration || 0)
  };
}
async function L(t) {
  return typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get(t) : {};
}
async function z() {
  const t = await L([$, E]);
  for (const e of [$, E])
    if (t[e] !== void 0) {
      if (!Array.isArray(t[e])) throw new Error("电台存储格式无效，未覆盖数据");
      return t[e];
    }
  for (const e of [$, E]) {
    const i = localStorage.getItem(e);
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
  return [];
}
function N(t) {
  return t.map((e) => {
    if (!e || typeof e != "object" || Array.isArray(e)) throw new Error("电台系列格式无效，未覆盖数据");
    const i = e, r = i.items == null ? [] : Array.isArray(i.items) ? i.items : typeof i.items == "object" ? Object.values(i.items) : null;
    if (!r) throw new Error("电台曲目格式无效，未覆盖数据");
    const a = r.map((s) => {
      if (!s || typeof s != "object" || Array.isArray(s)) throw new Error("电台曲目格式无效，未覆盖数据");
      const d = s;
      if (typeof d.bvid != "string" || !d.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const f = T(d);
      if (!Number.isFinite(f.duration)) throw new Error("电台曲目时长格式无效，未覆盖数据");
      return { ...d, ...f };
    });
    return {
      ...i,
      id: String(i.id || `series_${Math.random().toString(36).slice(2, 9)}`),
      name: String(i.name || "未命名系列"),
      count: a.length,
      items: a
    };
  });
}
async function M(t) {
  if (!t.length) {
    const r = (await L([$]))[$];
    if (Array.isArray(r) && r.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const e = JSON.stringify(t);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [$]: t, [E]: t }), localStorage.setItem($, e), localStorage.setItem(E, e);
}
function V(t = 0, e = !1, i) {
  const r = o.radioQueue.map((s) => ({ ...s, upper: s.author }));
  if (!r.length) return;
  if (e) {
    for (let s = r.length - 1; s > 0; s--) {
      const d = Math.floor(Math.random() * (s + 1));
      [r[s], r[d]] = [r[d], r[s]];
    }
    t = 0;
  }
  const a = Math.max(0, Math.min(r.length - 1, Number(t) || 0));
  _.playQueue({
    name: i || (e ? "B站电台 · 随机" : "B站电台"),
    items: r,
    startIndex: a
  });
}
typeof window < "u" && (window.playBiliRadioQueue = V);
const m = {
  async init() {
    if (!C) {
      C = !0;
      try {
        o.radioSeries = N(await z());
      } catch (t) {
        C = !1, console.warn("[BiliRadio] 读取系列失败", t);
      }
    }
    await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const t = N(await z());
    return t.length && await M(t), o.radioSeries = t, {
      ok: !0,
      repairedCount: t.length,
      emptySeries: t.filter((e) => !e.items.length).map((e) => ({ id: e.id, name: e.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: t.map((e) => ({ id: e.id, name: e.name, count: e.count, sampleItem: e.items[0]?.title }))
    };
  },
  async refresh() {
    const t = ++F;
    o.radioLoading = !0, o.radioError = "";
    try {
      const e = await l.getUserNav();
      if (!e.isLogin) throw new Error("请先登录 B站");
      const i = await l.getCreatedFolders(e.mid);
      if (t !== F) return;
      o.radioFolders = i.map((a) => ({
        id: Number(a.id),
        title: a.title || "收藏夹",
        count: Number(a.media_count || 0)
      }));
      const r = o.radioFolders[0];
      r ? await this.selectFolder(r.id) : (o.radioActiveFolderId = 0, o.radioVideos = []), this.autoHealEmptySeries();
    } catch (e) {
      t === F && (o.radioError = k(e));
    } finally {
      t === F && (o.radioLoading = !1);
    }
  },
  async autoHealEmptySeries() {
    let t = !1;
    for (const e of o.radioSeries)
      if (e.count === 0 || !e.items.length) {
        const i = o.radioFolders.find(
          (r) => r.title.trim().toLowerCase() === e.name.trim().toLowerCase()
        );
        if (i)
          try {
            const a = ((await l.getFolderVideos(i.id, 1, 40)).medias || []).map((s) => T({ ...s, author: s.upper?.name }));
            a.length && (e.items = a, e.count = a.length, t = !0);
          } catch {
          }
      }
    if (t)
      try {
        await M(o.radioSeries);
      } catch (e) {
        o.radioError = `系列已补全，但保存未确认：${k(e)}`;
      }
  },
  async selectFolder(t) {
    const e = Number(t);
    if (!o.radioFolders.some((r) => Number(r.id) === e) || e === o.radioActiveFolderId && o.radioVideos.length > 0)
      return;
    const i = ++F;
    o.radioActiveFolderId = e, o.radioLoading = !0, o.radioError = "";
    try {
      const r = /* @__PURE__ */ new Map(), a = 4;
      for (let s = 1; s <= a; s++) {
        const d = await l.getFolderVideos(e, s, 40);
        if (i !== F) return;
        for (const n of d.medias || [])
          n.bvid && r.set(n.bvid, T({ ...n, author: n.upper?.name }));
        const f = o.radioFolders.find((n) => Number(n.id) === e)?.count || 0;
        if (!d.medias?.length || r.size >= Math.max(d.total, f)) break;
      }
      o.radioVideos = [...r.values()];
    } catch (r) {
      i === F && (o.radioError = k(r));
    } finally {
      i === F && (o.radioLoading = !1);
    }
  },
  add(t) {
    !t.bvid || o.radioQueue.some((e) => e.bvid === t.bvid) || o.radioQueue.push(T(t));
  },
  remove(t) {
    Number.isInteger(t) && t >= 0 && t < o.radioQueue.length && o.radioQueue.splice(t, 1);
  },
  clear() {
    o.radioQueue = [];
  },
  play(t = !1, e = 0) {
    V(e, t);
  },
  playAt(t) {
    if (!o.radioQueue.length) return;
    const e = Math.max(0, Math.min(o.radioQueue.length - 1, Number(t) || 0));
    V(e, !1);
  },
  async loadSeries(t) {
    const e = o.radioSeries.find((i) => i.id === t);
    if (e) {
      if (!e.items.length) {
        const i = o.radioFolders.find(
          (r) => r.title.trim().toLowerCase() === e.name.trim().toLowerCase()
        );
        if (i) {
          v.fetch("哔哩哔哩电台", `正在从「${i.title}」收藏夹自动补齐系列曲目…`);
          try {
            const a = ((await l.getFolderVideos(i.id, 1, 40)).medias || []).map((s) => T({ ...s, author: s.upper?.name }));
            a.length && (e.items = a, e.count = a.length, await M(o.radioSeries));
          } catch (r) {
            o.radioError = `读取或保存补全系列失败：${k(r)}`, v.fetch("哔哩哔哩电台", o.radioError);
          }
        }
      }
      if (!e.items.length) {
        v.fetch("哔哩哔哩电台", `系列「${e.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      o.radioQueue = e.items.map(T), o.radioSeriesName = e.name, v.fetch("哔哩哔哩电台", `已载入系列「${e.name}」（共 ${e.count} 首）`);
    }
  },
  async playSeries(t, e = 0) {
    await this.loadSeries(t);
    const i = o.radioSeries.find((r) => r.id === t);
    i?.items.length && V(e, !1, i.name);
  },
  async deleteSeries(t) {
    const i = o.radioSeries.find((a) => a.id === t)?.name || "系列", r = o.radioSeries.filter((a) => a.id !== t);
    try {
      await M(r), o.radioSeries = r, v.fetch("哔哩哔哩电台", `已删除电台系列「${i}」`);
    } catch (a) {
      o.radioError = `删除系列失败：${k(a)}`, v.fetch("哔哩哔哩电台", `删除系列失败：${k(a)}`);
    }
  },
  async renameSeries(t, e) {
    const i = e.trim();
    if (!i) return;
    const r = o.radioSeries.find((d) => d.id === t);
    if (!r) return;
    const a = r.name, s = o.radioSeries.map((d) => d.id === t ? { ...d, name: i } : d);
    try {
      await M(s), o.radioSeries = s, o.radioSeriesName === a && (o.radioSeriesName = i), v.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${i}」`);
    } catch (d) {
      o.radioError = `重命名系列失败：${k(d)}`, v.fetch("哔哩哔哩电台", `重命名系列失败：${k(d)}`);
    }
  },
  async save(t) {
    if (!o.radioQueue.length) {
      v.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    const e = (t || o.radioSeriesName || "").trim();
    if (!e) {
      o.radioError = "保存失败：系列名称不能为空，请输入系列名称", v.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
    }
    const i = o.radioQueue.map((s) => ({ ...s })), r = o.radioSeries.findIndex((s) => s.name === e);
    let a = [...o.radioSeries];
    if (r >= 0) {
      const s = a[r];
      a[r] = {
        ...s,
        count: i.length,
        items: i
      };
    } else
      a.push({
        id: `series_${Date.now()}`,
        name: e,
        count: i.length,
        items: i
      });
    try {
      await M(a), o.radioSeries = a, o.radioSeriesName = "", v.fetch(
        "哔哩哔哩电台",
        r >= 0 ? `✓ 已更新系列「${e}」（共 ${i.length} 首）` : `★ 已保存系列「${e}」（共 ${i.length} 首）`
      );
    } catch (s) {
      const d = k(s);
      o.radioError = `保存系列失败：${d}`, v.fetch("哔哩哔哩电台", `保存系列失败：${d}`);
    }
  }
};
typeof window < "u" && window.addEventListener("logicweaver:sync-restored", () => {
  (async () => {
    try {
      o.radioSeries = N(await z());
    } catch (t) {
      console.warn("[BiliRadio] 云同步恢复系列重载失败", t);
    }
  })();
});
const g = A({
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
}), D = {
  get state() {
    return g;
  },
  async open(t) {
    if (t.bvid) {
      g.isOpen = !0, g.loading = !0, g.error = "", g.fullText = "", g.title = t.title || t.bvid, g.bvid = t.bvid, g.cid = t.cid, g.copied = !1, g.cues = [];
      try {
        const e = await l.fetchVideoSubtitleDetails(t.bvid, t.cid);
        if (!e.ok || !e.cues || !e.cues.length) {
          g.error = e.reason || "该视频暂无可用字幕轨道";
          return;
        }
        g.cues = e.cues.map((a) => ({ from: a.from, to: a.to, content: a.content.trim() })).filter((a) => !!a.content);
        const r = g.cues.map((a) => a.content).join(`
`);
        g.fullText = r, g.charCount = r.length;
      } catch (e) {
        g.error = e?.message || "提取字幕失败，请检查网络";
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
    const t = new Blob([g.fullText], { type: "text/plain;charset=utf-8" }), e = URL.createObjectURL(t), i = document.createElement("a");
    i.href = e, i.download = `${(g.title || g.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(i), i.click(), i.remove(), URL.revokeObjectURL(e);
  }
}, o = A({
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
    heroLyricText: R("bili.hero.defaultLyric"),
    heroLyricStatus: "支持 B站 收藏夹与订阅视频",
    folders: [],
    videos: [],
    sort: "fav_time",
    query: "",
    page: 1,
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
}), B = /* @__PURE__ */ new Set();
let b = [], h = { id: "root", type: "folder", children: [] }, w = /* @__PURE__ */ new Set();
function c(t, e) {
  const i = globalThis;
  typeof i.showBiliToast == "function" ? i.showBiliToast(t, 3200, e) : typeof i.showWindowsToast == "function" && i.showWindowsToast({
    id: `bili_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "哔哩哔哩",
    message: t,
    duration: 3200
  });
}
function O(t) {
  if (!t) return "https://www.bilibili.com";
  if (typeof t.url == "string" && /^https?:\/\//i.test(t.url.trim()))
    return t.url.trim();
  if (typeof t.link == "string" && /^https?:\/\//i.test(t.link.trim()))
    return t.link.trim();
  let e = "";
  if (typeof t.bvid == "string" && t.bvid.startsWith("BV"))
    e = t.bvid;
  else if (typeof t.id == "string" && t.id.startsWith("BV"))
    e = t.id;
  else if (typeof t.url == "string" && t.url.includes("BV")) {
    const a = t.url.match(/BV[a-zA-Z0-9]+/);
    a && (e = a[0]);
  }
  if (e)
    return `https://www.bilibili.com/video/${e}`;
  const r = String(t.aid || t.id || "").replace(/\D/g, "");
  return r ? `https://www.bilibili.com/video/av${r}` : "https://www.bilibili.com";
}
function G(t) {
  const e = t.duration || 0, i = Math.floor(e / 60), r = String(e % 60).padStart(2, "0"), a = `${i}:${r}`, s = t.cnt_info?.play ? t.cnt_info.play > 1e4 ? `${(t.cnt_info.play / 1e4).toFixed(1)}万` : String(t.cnt_info.play) : "0", d = t.bvid ? `https://www.bilibili.com/video/${t.bvid}` : t.id ? `https://www.bilibili.com/video/av${t.id}` : t.link || "#";
  return {
    id: String(t.id || t.bvid),
    aid: String(t.id || ""),
    bvid: t.bvid,
    title: t.title,
    cover: t.cover,
    url: d,
    duration: a,
    playCount: s,
    author: t.upper?.name || "UP主",
    authorMid: String(t.upper?.mid || ""),
    authorFace: t.upper?.face || "",
    favoriteDate: t.fav_time ? new Date(t.fav_time * 1e3).toLocaleDateString() : "",
    intro: t.intro || "",
    selected: !1,
    writable: !0
  };
}
async function S(t, e = 1, i = "fav_time", r = "") {
  const a = o.organizer;
  a.loading = !0, a.error = "";
  const d = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[i] || "mtime";
  try {
    const f = await l.getFolderVideos(t, e, 24, d, r);
    a.videos = f.medias.map(G), a.page = e, a.totalItems = f.total, a.totalPages = Math.max(1, Math.ceil(f.total / 24)), a.sort = i, a.query = r;
    const n = b.find((u) => String(u.id || u.fid) === String(t));
    a.folderTitle = n?.title || f.info?.title || "收藏夹", a.folderSubtitle = `共 ${f.total} 个内容`;
  } catch (f) {
    a.error = f.message || "加载视频列表失败", a.folderSubtitle = "加载失败，请重试";
  } finally {
    a.loading = !1;
  }
}
async function I(t = !1) {
  const e = o.organizer;
  e.loading = !0, e.error = "";
  try {
    const i = await l.getUserNav();
    if (!i.isLogin) {
      e.error = "未登录 B站", e.folderSubtitle = "未登录 B站，请先登录", e.loading = !1;
      return;
    }
    const [r, a] = await Promise.all([
      l.getCreatedFolders(i.mid),
      l.getCollectedFolders(1, 50, i.mid).catch(() => ({ count: 0, list: [] }))
    ]), s = a.list || [], d = l.getOtherFolders();
    b = [...r, ...s, ...d];
    const f = await l.treeManager.loadTree();
    (l.treeManager.syncTreeWithFolders(f, r) || t) && await l.treeManager.saveTree(f), h = f, w = await l.treeManager.loadCollapsedGroups(), o.collapsedGroups = Array.from(w);
    let u = o.activeFolderId;
    if (!u || !b.some((p) => String(p.id || p.fid) === String(u))) {
      const p = r.find((y) => /默认/.test(y.title)) || r[0] || b[0];
      u = p ? String(p.id || p.fid) : "", o.activeFolderId = u;
    }
    e.folders = l.treeManager.flattenTree(
      h,
      b,
      w,
      u
    ), u ? await S(u, 1, e.sort, e.query) : e.folderSubtitle = "暂无可用收藏夹";
  } catch (i) {
    e.error = i.message || "读取 B站 收藏夹失败", e.folderSubtitle = "读取失败，请检查网络或重试";
  } finally {
    e.loading = !1;
  }
}
const q = {
  get active() {
    return o.mounted;
  },
  get state() {
    return o;
  },
  updateState(t) {
    Object.assign(o, t);
  },
  updateOrganizer(t) {
    Object.assign(o.organizer, t);
  },
  setMounted(t) {
    o.mounted = t, t && I();
  },
  loadOrganizer: I,
  loadFolderVideos: S,
  switchTab(t) {
    o.currentTab = t, this.dispatch("switch-tab", t);
  },
  async selectFolder(t) {
    const e = String(t), i = o.organizer;
    if (i.isTargetPickMode) {
      const r = b.find((s) => String(s.id || s.fid) === e);
      if (!r || r.isCollected || r.isOther) {
        c("无法移动到该分类，请选择您自建的有效收藏夹", { isError: !0 });
        return;
      }
      if (e === o.activeFolderId) {
        c("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: !0 });
        return;
      }
      i.isTargetPickMode = !1;
      const a = i.movingVideoId;
      if (i.movingVideoId = "", a) {
        c(`正在移动视频至「${r.title}」…`);
        const s = await l.moveVideo(o.activeFolderId, e, a);
        s.ok ? (c(`已移动至「${r.title}」`), await S(o.activeFolderId, i.page, i.sort, i.query)) : c(`移动失败：${s.reason || "未知错误"}`, { isError: !0 });
      } else if (i.batchMode) {
        const s = i.videos.filter((n) => n.selected);
        if (!s.length) return;
        const d = s.map((n) => n.aid || n.id);
        c(`正在批量移动 ${d.length} 个视频至「${r.title}」…`);
        const f = await l.moveVideo(o.activeFolderId, e, d);
        f.ok ? (c(`已将 ${d.length} 个视频移动至「${r.title}」`), i.videos.forEach((n) => n.selected = !1), i.selectedCount = 0, await S(o.activeFolderId, 1, i.sort, i.query)) : c(`批量移动失败：${f.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    o.activeFolderId = e, i.folders.forEach((r) => {
      r.selected = r.id === e;
    }), i.mode = "organizer", await S(e, 1, i.sort, "");
  },
  async toggleFolderGroup(t) {
    const e = String(t);
    w.has(e) ? w.delete(e) : w.add(e), o.collapsedGroups = Array.from(w), await l.treeManager.saveCollapsedGroups(w), o.organizer.folders = l.treeManager.flattenTree(
      h,
      b,
      w,
      o.activeFolderId
    );
  },
  async moveFolderNode(t, e, i) {
    l.treeManager.moveNode(h, t, e, i) && (await l.treeManager.saveTree(h), o.organizer.folders = l.treeManager.flattenTree(
      h,
      b,
      w,
      o.activeFolderId
    ), c("已更新收藏夹排序"));
  },
  async openCreateDialog(t) {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (i?.openCreate)
      i.openCreate(t, async ({ name: r, privacy: a }) => {
        if (i.updateCreate({ status: t === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), t === "bili") {
          const s = await l.createRemoteFolder(r, Number(a || 0));
          if (!s.ok) {
            i.updateCreate({ status: s.reason || "创建失败", error: !0 });
            return;
          }
          i.closeCreate(), await I(!0), c(`已成功创建 B站收藏夹「${r}」`);
        } else {
          const s = l.treeManager.createGroupNode(r);
          h.children = h.children || [], h.children.push(s), await l.treeManager.saveTree(h), i.closeCreate(), o.organizer.folders = l.treeManager.flattenTree(
            h,
            b,
            w,
            o.activeFolderId
          ), c(`已建立本地分组「${r}」`);
        }
      });
    else {
      const r = (await x.prompt({
        title: t === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: t === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!r) return;
      if (t === "bili") {
        const a = await l.createRemoteFolder(r);
        a.ok ? (await I(!0), c(`已成功创建「${r}」`)) : c(`创建失败：${a.reason}`, { isError: !0 });
      } else {
        const a = l.treeManager.createGroupNode(r);
        h.children = h.children || [], h.children.push(a), await l.treeManager.saveTree(h), o.organizer.folders = l.treeManager.flattenTree(
          h,
          b,
          w,
          o.activeFolderId
        ), c(`已建立本地分组「${r}」`);
      }
    }
  },
  async handleVideoAction(t, e) {
    const i = o.organizer;
    let r = null;
    if (t && typeof t == "object" && (t.bvid || t.aid || t.id))
      r = t;
    else {
      const n = String(t || "");
      r = i.videos.find((u) => String(u.id) === n || String(u.bvid) === n || String(u.aid) === n) || i.specialVideos.find((u) => String(u.id) === n || String(u.bvid) === n || String(u.aid) === n) || i.cachedVideos.find((u) => String(u.id) === n || String(u.bvid) === n || String(u.aid) === n), !r && (n.startsWith("BV") || /^\d+$/.test(n)) && (r = {
        id: n,
        bvid: n.startsWith("BV") ? n : "",
        aid: /^\d+$/.test(n) ? n : "",
        title: n,
        url: `https://www.bilibili.com/video/${n}`
      });
    }
    if (!r) return;
    const a = r.bvid || (String(r.id || "").startsWith("BV") ? r.id : ""), s = r.aid || r.id, d = O(r), f = d || r.url;
    if (e === "play")
      a || r.aid ? P.openVideo({
        bvid: a,
        aid: String(s || ""),
        title: r.title || a,
        author: r.author ? `${r.author}` : "",
        url: f,
        cover: r.cover
      }) : f && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: f, active: !0 }) : window.open(f, "_blank"));
    else if (e === "open")
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: d, active: !0 }) : window.open(d, "_blank");
    else if (e === "copy-link")
      try {
        await navigator.clipboard.writeText(d), c(`已复制视频链接: ${d}`);
      } catch {
        c("复制链接失败", { isError: !0 });
      }
    else if (e === "move")
      i.isTargetPickMode && i.movingVideoId === r.aid ? (i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹")) : (i.isTargetPickMode = !0, i.movingVideoId = r.aid, c(`请点击左侧收藏夹，将《${r.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${r.title}》`
      }));
    else if (e === "delete") {
      const n = r.aid || r.id, u = o.activeFolderId, p = await l.deleteVideo(u, n);
      p.ok ? (c(`已取消收藏《${r.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          c(`正在还原《${r.title}》…`);
          const y = await l.addVideoToFavorite(u, n);
          y.ok ? (c(`已还原《${r.title}》`), await S(u, i.page, i.sort, i.query)) : c(`还原失败：${y.reason || "未知错误"}`, { isError: !0 });
        }
      }), await S(u, i.page, i.sort, i.query)) : c(`取消收藏失败：${p.reason || "未知错误"}`, { isError: !0 });
    } else if (e === "subtitle") {
      const n = a || (String(r.id || "").startsWith("BV") ? r.id : "");
      n || r.aid ? D.open({
        bvid: n || String(r.aid || r.id || ""),
        cid: r.cid,
        title: r.title || n
      }) : c("该视频暂无字幕信息", { isError: !0 });
    } else if (e === "create-task") {
      const { biliVideoTaskController: n } = await import("./video-task-store-CrDKY7nD.js");
      n.open({
        bvid: r.bvid || (String(r.id || "").startsWith("BV") ? r.id : ""),
        aid: r.aid || r.id,
        title: r.title || "",
        cover: r.cover,
        author: r.author,
        authorMid: r.authorMid,
        playCount: r.playCount,
        duration: r.duration,
        url: f
      });
    } else if (e === "cache") {
      const { cacheBiliVideo: n } = await import("./cache.service-BViBgMBG.js");
      await n({ bvid: r.bvid, aid: r.aid, title: r.title, cover: r.cover });
    } else if (e === "collect-inbox") {
      const n = b.find((y) => /收集箱|默认|Inbox/i.test(y.title)) || b.find((y) => !y.isCollected && !y.isOther) || b[0];
      if (!n) {
        c("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const u = r.aid || r.id;
      c(`正在将《${r.title}》添加到「${n.title}」…`);
      const p = await l.addVideoToFavorite(n.id, u);
      p.ok ? c(`✓ 已成功添加到「${n.title}」`) : c(`添加失败：${p.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(t) {
    return B.add(t), () => {
      B.delete(t);
    };
  },
  dispatch(t, e) {
    const i = o.organizer;
    switch (t) {
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
        I(!0);
        break;
      case "subscription-toggle-desc-panel":
        i.showFullDescInRightPanel = !i.showFullDescInRightPanel;
        break;
      case "organizer-open":
        i.mode = "organizer", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, i.folders.length || I();
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
        const r = e;
        r?.id && r?.name && m.renameSeries(r.id, r.name);
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
        ["fav_time", "view", "pubtime"].includes(e) && S(o.activeFolderId, 1, e, i.query);
        break;
      case "organizer-search":
        S(o.activeFolderId, 1, i.sort, String(e || "").trim());
        break;
      case "organizer-page": {
        const r = Number(e);
        Number.isFinite(r) && r >= 1 && S(o.activeFolderId, r, i.sort, i.query);
        break;
      }
      case "organizer-batch-toggle":
        i.batchMode = !i.batchMode, i.batchMode || (i.videos.forEach((r) => r.selected = !1), i.selectedCount = 0);
        break;
      case "organizer-batch-select": {
        const r = String(e || ""), a = i.videos.find((s) => s.id === r || s.bvid === r);
        a && (a.selected = !a.selected, i.selectedCount = i.videos.filter((s) => s.selected).length);
        break;
      }
      case "organizer-batch-all": {
        const r = i.videos.length > 0 && i.videos.every((a) => a.selected);
        i.videos.forEach((a) => a.selected = !r), i.selectedCount = r ? 0 : i.videos.length;
        break;
      }
      case "organizer-batch-move": {
        const r = i.videos.filter((a) => a.selected).length;
        if (!r) {
          c("请先选择要移动的视频", { isError: !0 });
          return;
        }
        i.isTargetPickMode = !0, c(`请点击左侧目标收藏夹，将 ${r} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const r = i.videos.filter((a) => a.selected);
        if (!r.length) {
          c("请先选择要取消收藏的视频", { isError: !0 });
          return;
        }
        (async () => {
          if (await x.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${r.length} 个视频吗？`,
            danger: !0
          })) {
            const s = o.activeFolderId, d = r.map((n) => n.aid || n.id);
            c(`正在批量移除 ${d.length} 个视频…`);
            let f = 0;
            for (const n of d)
              (await l.deleteVideo(s, n)).ok && f++;
            c(`已移除 ${f}/${d.length} 个视频`), i.batchMode = !1, i.selectedCount = 0, await S(s, i.page, i.sort, i.query);
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
        i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const r = globalThis;
        typeof r.openBiliUpGroupManagerDialog == "function" ? r.openBiliUpGroupManagerDialog() : r.LogicWeaverBiliUpGroupManager?.open && r.LogicWeaverBiliUpGroupManager.open();
        break;
      }
    }
    for (const r of B)
      try {
        r(t, e);
      } catch (a) {
        console.error("[BiliFavorites] Action error:", a);
      }
  }
};
export {
  o as a,
  q as b,
  m as c,
  g as d,
  D as s
};
