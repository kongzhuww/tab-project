import { j as d, h as re, n as k, k as te } from "./search.service-lHw6yJW3.js";
import { a as ie, r as q } from "./vendor-vue-CjOHdfe5.js";
import { q as H } from "./read-session-C1M3QoXl.js";
function _(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const r = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(r).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const oe = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  title: "B站电台",
  coverUrl: "",
  seriesName: "SoundTrack",
  trackIndex: 1,
  totalTracks: 1,
  currentTime: 0,
  duration: 0,
  formattedCurrent: "00:00",
  formattedDuration: "00:00",
  progressPercent: 0,
  lyric: "B站电台 · 点击磁带或下方队列开始播放"
}), h = q(oe()), Y = {
  getSnapshot() {
    return ie(h);
  },
  update(e) {
    for (const r of Object.keys(e))
      h[r] !== e[r] && (h[r] = e[r]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const r = e.currentTime ?? h.currentTime, i = e.duration ?? h.duration, t = _(r), o = _(i);
      if (h.formattedCurrent !== t && (h.formattedCurrent = t), h.formattedDuration !== o && (h.formattedDuration = o), i > 0) {
        const n = Math.round(Math.min(100, Math.max(0, r / i * 100)) * 10) / 10;
        Math.abs(h.progressPercent - n) >= 0.2 && (h.progressPercent = n);
      } else
        h.progressPercent = 0;
    }
  },
  setProgress(e, r) {
    h.currentTime = e, h.duration = r;
    const i = _(e), t = _(r);
    if (h.formattedCurrent !== i && (h.formattedCurrent = i), h.formattedDuration !== t && (h.formattedDuration = t), r > 0) {
      const o = Math.round(Math.min(100, Math.max(0, e / r * 100)) * 10) / 10;
      Math.abs(h.progressPercent - o) >= 0.2 && (h.progressPercent = o);
    } else
      h.progressPercent = 0;
  },
  togglePlay() {
    const e = window.LogicWeaverBiliRadioPlayer;
    if (e) {
      const r = typeof e.getState == "function" ? e.getState() : null;
      if (!r?.active && !r?.playing && typeof window.playBiliRadioQueue == "function") {
        window.playBiliRadioQueue(0);
        return;
      }
      if (typeof e.toggle == "function") {
        e.toggle();
        return;
      }
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-toggle"));
  },
  seek(e) {
    const r = window.LogicWeaverBiliRadioPlayer;
    if (typeof r?.seek == "function") {
      r.seek(e);
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-seek", { detail: { percent: e } }));
  },
  prev() {
    if (typeof window.LogicWeaverBiliRadioPlayer?.prev == "function") {
      window.LogicWeaverBiliRadioPlayer.prev();
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-prev"));
  },
  next() {
    if (typeof window.LogicWeaverBiliRadioPlayer?.next == "function") {
      window.LogicWeaverBiliRadioPlayer.next();
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-next"));
  },
  insertAndPlay(e) {
    const r = window.LogicWeaverBiliRadioPlayer;
    if (r && typeof r.playQueue == "function") {
      r.playQueue({
        name: "📼 装填卡带",
        items: [{
          bvid: e.bvid,
          title: e.title,
          cover: e.cover,
          author: e.author,
          duration: e.duration
        }],
        startIndex: 0
      });
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-insert", { detail: e }));
  }
};
typeof window < "u" && (window.LogicWeaverBiliRadioTape = Y);
let m = null, C = !1, Q = !1, A = "B站电台", F = [], M = -1, b = null, G, Z = {}, R = 0, j = "";
function L() {
  return m || (m = new Audio(), m.id = "bili-radio-audio", m.crossOrigin = "anonymous", m.addEventListener("ended", () => {
    P(M + 1);
  }), m.addEventListener("timeupdate", $), m.addEventListener("play", $), m.addEventListener("pause", $), m.addEventListener("loadedmetadata", $), m);
}
function $() {
  const e = m, r = !!(e && !e.paused && !e.ended && C), i = e?.duration && Number.isFinite(e.duration) ? e.duration : b?.duration || 0, t = b?.cues?.find((n) => (e?.currentTime || 0) >= n.from && (e?.currentTime || 0) < n.to), o = j || t?.content || (r ? "♪ 伴奏播放中…" : b ? `已暂停 · 《${b.title}》` : "点击磁带继续播放");
  Y.update({
    active: C,
    loading: Q,
    playing: r,
    title: b?.title || "B站电台",
    coverUrl: b?.cover || "",
    seriesName: A,
    trackIndex: M >= 0 ? M + 1 : 1,
    totalTracks: F.length || 1,
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: o
  }), C && b && re.syncFromBiliRadio({
    playing: r,
    title: b.title || "B站电台",
    artist: b.upper || b.author || A || "哔哩哔哩电台",
    coverUrl: b.cover || "",
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: o,
    seriesName: A
  });
}
async function ae(e) {
  if (e.streamUrl || e.url) return e;
  const r = await d.getVideoView(e.bvid);
  if (!r?.cid) throw new Error("视频信息不可用");
  const i = await d.fetchPlayStream(e.bvid, r.cid, 64);
  if (!i.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...e,
    title: r.title || e.title,
    cover: String(r.pic || e.cover || "").replace(/^http:/, "https:"),
    upper: r.owner?.name || e.upper || e.author || "Bilibili",
    duration: Number(r.duration || e.duration || 0),
    cid: r.cid,
    streamUrl: i.sources[0],
    streamUrls: i.sources
  };
}
async function P(e) {
  const r = Z;
  if (!F.length || r.isCurrent?.() === !1) return;
  const i = ++R;
  M = (e % F.length + F.length) % F.length, Q = !0, C = !0, j = "", L().pause(), $();
  try {
    const t = G ? await G(F[M]) : await ae(F[M]);
    if (i !== R || r.isCurrent?.() === !1) return;
    b = t;
    const o = t.streamUrl || t.url || t.streamUrls?.[0];
    if (!o) throw new Error("没有取得视频播放地址");
    L().src = o, r.onReady?.(L()), r.autoplay !== !1 && L().play().catch((n) => console.warn("[BiliRadio] 播放失败", n)), t.bvid && !t.cues?.length && d.fetchVideoSubtitleDetails(t.bvid, t.cid).then((n) => {
      i === R && n.ok && b && (b.cues = n.cues);
    }).catch(() => {
    });
  } catch (t) {
    if (i !== R || r.isCurrent?.() === !1) return;
    C = !1, console.warn("[BiliRadio] 解析音轨失败", t), j = t instanceof Error ? t.message : "播放失败";
  } finally {
    i === R && (Q = !1, r.isCurrent?.() === !1 && (C = !1), $());
  }
}
const X = {
  playQueue(e) {
    A = e.name || "B站电台", F = Array.isArray(e.items) ? e.items.map((r) => ({ ...r })) : [], G = e.resolveTrack, Z = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, P(e.startIndex || 0);
  },
  playAt(e) {
    F.length && P(e);
  },
  next() {
    P(M + 1);
  },
  prev() {
    P(M - 1);
  },
  toggle() {
    const e = L();
    if (!C && !e.src) {
      F.length > 0 && P(M >= 0 ? M : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), $();
  },
  seek(e) {
    const r = L();
    Number.isFinite(r.duration) && r.duration > 0 && (r.currentTime = Math.min(100, Math.max(0, e)) / 100 * r.duration, $());
  },
  getAudioElement() {
    return m;
  },
  getState() {
    return {
      active: C,
      loading: Q,
      name: A,
      items: F,
      index: M,
      track: b,
      currentTime: m?.currentTime || 0,
      duration: m?.duration || 0,
      playing: !!(m && !m.paused && !m.ended && C)
    };
  },
  syncTape: $
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = X);
const x = "biliRadioSeriesV1", D = "lw_backup_bili_radio_series";
let B = 0, W = !1;
function I(e) {
  return e instanceof Error ? e.message : "读取电台失败";
}
function z(e) {
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
async function K() {
  const e = await ee([x, D]);
  for (const r of [x, D])
    if (e[r] !== void 0) {
      if (!Array.isArray(e[r])) throw new Error("电台存储格式无效，未覆盖数据");
      return e[r];
    }
  for (const r of [x, D]) {
    const i = localStorage.getItem(r);
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
  return [];
}
function J(e) {
  return e.map((r) => {
    if (!r || typeof r != "object" || Array.isArray(r)) throw new Error("电台系列格式无效，未覆盖数据");
    const i = r, t = i.items == null ? [] : Array.isArray(i.items) ? i.items : typeof i.items == "object" ? Object.values(i.items) : null;
    if (!t) throw new Error("电台曲目格式无效，未覆盖数据");
    const o = t.map((n) => {
      if (!n || typeof n != "object" || Array.isArray(n)) throw new Error("电台曲目格式无效，未覆盖数据");
      const l = n;
      if (typeof l.bvid != "string" || !l.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const f = z(l);
      if (!Number.isFinite(f.duration)) throw new Error("电台曲目时长格式无效，未覆盖数据");
      return { ...l, ...f };
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
async function V(e) {
  if (!e.length) {
    const t = (await ee([x]))[x];
    if (Array.isArray(t) && t.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const r = JSON.stringify(e);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [x]: e, [D]: e }), localStorage.setItem(x, r), localStorage.setItem(D, r);
}
function U(e = 0, r = !1, i) {
  const t = a.radioQueue.map((n) => ({ ...n, upper: n.author }));
  if (!t.length) return;
  if (r) {
    for (let n = t.length - 1; n > 0; n--) {
      const l = Math.floor(Math.random() * (n + 1));
      [t[n], t[l]] = [t[l], t[n]];
    }
    e = 0;
  }
  const o = Math.max(0, Math.min(t.length - 1, Number(e) || 0));
  X.playQueue({
    name: i || (r ? "B站电台 · 随机" : "B站电台"),
    items: t,
    startIndex: o
  });
}
typeof window < "u" && (window.playBiliRadioQueue = U);
const v = {
  async init() {
    if (!W) {
      W = !0;
      try {
        a.radioSeries = J(await K());
      } catch (e) {
        W = !1, console.warn("[BiliRadio] 读取系列失败", e);
      }
    }
    await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const e = J(await K());
    return e.length && await V(e), a.radioSeries = e, {
      ok: !0,
      repairedCount: e.length,
      emptySeries: e.filter((r) => !r.items.length).map((r) => ({ id: r.id, name: r.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: e.map((r) => ({ id: r.id, name: r.name, count: r.count, sampleItem: r.items[0]?.title }))
    };
  },
  async refresh() {
    const e = ++B;
    a.radioLoading = !0, a.radioError = "";
    try {
      const r = await d.getUserNav();
      if (!r.isLogin) throw new Error("请先登录 B站");
      const i = await d.getCreatedFolders(r.mid);
      if (e !== B) return;
      a.radioFolders = i.map((o) => ({
        id: Number(o.id),
        title: o.title || "收藏夹",
        count: Number(o.media_count || 0)
      }));
      const t = a.radioFolders[0];
      t ? await this.selectFolder(t.id) : (a.radioActiveFolderId = 0, a.radioVideos = []), this.autoHealEmptySeries();
    } catch (r) {
      e === B && (a.radioError = I(r));
    } finally {
      e === B && (a.radioLoading = !1);
    }
  },
  async autoHealEmptySeries() {
    let e = !1;
    for (const r of a.radioSeries)
      if (r.count === 0 || !r.items.length) {
        const i = a.radioFolders.find(
          (t) => t.title.trim().toLowerCase() === r.name.trim().toLowerCase()
        );
        if (i)
          try {
            const o = ((await d.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => z({ ...n, author: n.upper?.name }));
            o.length && (r.items = o, r.count = o.length, e = !0);
          } catch {
          }
      }
    if (e)
      try {
        await V(a.radioSeries);
      } catch (r) {
        a.radioError = `系列已补全，但保存未确认：${I(r)}`;
      }
  },
  async selectFolder(e) {
    const r = Number(e);
    if (!a.radioFolders.some((t) => Number(t.id) === r) || r === a.radioActiveFolderId && a.radioVideos.length > 0)
      return;
    const i = ++B;
    a.radioActiveFolderId = r, a.radioLoading = !0, a.radioError = "";
    try {
      const t = /* @__PURE__ */ new Map(), o = 4;
      for (let n = 1; n <= o; n++) {
        const l = await d.getFolderVideos(r, n, 40);
        if (i !== B) return;
        for (const s of l.medias || [])
          s.bvid && t.set(s.bvid, z({ ...s, author: s.upper?.name }));
        const f = a.radioFolders.find((s) => Number(s.id) === r)?.count || 0;
        if (!l.medias?.length || t.size >= Math.max(l.total, f)) break;
      }
      a.radioVideos = [...t.values()];
    } catch (t) {
      i === B && (a.radioError = I(t));
    } finally {
      i === B && (a.radioLoading = !1);
    }
  },
  add(e) {
    !e.bvid || a.radioQueue.some((r) => r.bvid === e.bvid) || a.radioQueue.push(z(e));
  },
  remove(e) {
    Number.isInteger(e) && e >= 0 && e < a.radioQueue.length && a.radioQueue.splice(e, 1);
  },
  clear() {
    a.radioQueue = [];
  },
  play(e = !1, r = 0) {
    U(r, e);
  },
  playAt(e) {
    if (!a.radioQueue.length) return;
    const r = Math.max(0, Math.min(a.radioQueue.length - 1, Number(e) || 0));
    U(r, !1);
  },
  async loadSeries(e) {
    const r = a.radioSeries.find((i) => i.id === e);
    if (r) {
      if (!r.items.length) {
        const i = a.radioFolders.find(
          (t) => t.title.trim().toLowerCase() === r.name.trim().toLowerCase()
        );
        if (i) {
          k.fetch("哔哩哔哩电台", `正在从「${i.title}」收藏夹自动补齐系列曲目…`);
          try {
            const o = ((await d.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => z({ ...n, author: n.upper?.name }));
            o.length && (r.items = o, r.count = o.length, await V(a.radioSeries));
          } catch (t) {
            a.radioError = `读取或保存补全系列失败：${I(t)}`, k.fetch("哔哩哔哩电台", a.radioError);
          }
        }
      }
      if (!r.items.length) {
        k.fetch("哔哩哔哩电台", `系列「${r.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      a.radioQueue = r.items.map(z), a.radioSeriesName = r.name, k.fetch("哔哩哔哩电台", `已载入系列「${r.name}」（共 ${r.count} 首）`);
    }
  },
  async playSeries(e, r = 0) {
    await this.loadSeries(e);
    const i = a.radioSeries.find((t) => t.id === e);
    i?.items.length && U(r, !1, i.name);
  },
  async deleteSeries(e) {
    const i = a.radioSeries.find((o) => o.id === e)?.name || "系列", t = a.radioSeries.filter((o) => o.id !== e);
    try {
      await V(t), a.radioSeries = t, k.fetch("哔哩哔哩电台", `已删除电台系列「${i}」`);
    } catch (o) {
      a.radioError = `删除系列失败：${I(o)}`, k.fetch("哔哩哔哩电台", `删除系列失败：${I(o)}`);
    }
  },
  async renameSeries(e, r) {
    const i = r.trim();
    if (!i) return;
    const t = a.radioSeries.find((l) => l.id === e);
    if (!t) return;
    const o = t.name, n = a.radioSeries.map((l) => l.id === e ? { ...l, name: i } : l);
    try {
      await V(n), a.radioSeries = n, a.radioSeriesName === o && (a.radioSeriesName = i), k.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${i}」`);
    } catch (l) {
      a.radioError = `重命名系列失败：${I(l)}`, k.fetch("哔哩哔哩电台", `重命名系列失败：${I(l)}`);
    }
  },
  async save(e) {
    if (!a.radioQueue.length) {
      k.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    let r = e.trim();
    if (!r)
      if (a.radioSeriesName.trim())
        r = a.radioSeriesName.trim();
      else {
        const n = a.radioFolders.find((l) => l.id === a.radioActiveFolderId);
        r = n ? `${n.title}系列` : `电台系列 (${a.radioQueue.length} 首)`;
      }
    const i = a.radioQueue.map((n) => ({ ...n })), t = a.radioSeries.findIndex((n) => n.name === r);
    let o = [...a.radioSeries];
    if (t >= 0) {
      const n = o[t];
      o[t] = {
        ...n,
        count: i.length,
        items: i
      };
    } else
      o.push({
        id: `series_${Date.now()}`,
        name: r,
        count: i.length,
        items: i
      });
    try {
      await V(o), a.radioSeries = o, a.radioSeriesName = "", k.fetch(
        "哔哩哔哩电台",
        t >= 0 ? `✓ 已更新系列「${r}」（共 ${i.length} 首）` : `★ 已保存系列「${r}」（共 ${i.length} 首）`
      );
    } catch (n) {
      const l = I(n);
      a.radioError = `保存系列失败：${l}`, k.fetch("哔哩哔哩电台", `保存系列失败：${l}`);
    }
  }
}, g = q({
  isOpen: !1,
  loading: !1,
  error: "",
  title: "",
  bvid: "",
  cid: void 0,
  fullText: "",
  charCount: 0,
  copied: !1
}), ne = {
  get state() {
    return g;
  },
  async open(e) {
    if (e.bvid) {
      g.isOpen = !0, g.loading = !0, g.error = "", g.fullText = "", g.title = e.title || e.bvid, g.bvid = e.bvid, g.cid = e.cid, g.copied = !1;
      try {
        const r = await d.fetchVideoSubtitleDetails(e.bvid, e.cid);
        if (!r.ok || !r.cues || !r.cues.length) {
          g.error = r.reason || "该视频暂无可用字幕轨道";
          return;
        }
        const t = r.cues.map((o) => o.content.trim()).filter(Boolean).join(`
`);
        g.fullText = t, g.charCount = t.length;
      } catch (r) {
        g.error = r?.message || "提取字幕失败，请检查网络";
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
    const e = new Blob([g.fullText], { type: "text/plain;charset=utf-8" }), r = URL.createObjectURL(e), i = document.createElement("a");
    i.href = r, i.download = `${(g.title || g.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(i), i.click(), i.remove(), URL.revokeObjectURL(r);
  }
}, a = q({
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
    heroLyricText: "点击视频播放，实时台词在此居中呈现",
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
}), O = /* @__PURE__ */ new Set();
let w = [], p = { id: "root", type: "folder", children: [] }, S = /* @__PURE__ */ new Set();
function c(e, r) {
  const i = globalThis;
  typeof i.showBiliToast == "function" ? i.showBiliToast(e, 3200, r) : typeof i.showWindowsToast == "function" && i.showWindowsToast({
    id: `bili_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "哔哩哔哩",
    message: e,
    duration: 3200
  });
}
function se(e) {
  if (!e) return "https://www.bilibili.com";
  if (typeof e.url == "string" && /^https?:\/\//i.test(e.url.trim()))
    return e.url.trim();
  if (typeof e.link == "string" && /^https?:\/\//i.test(e.link.trim()))
    return e.link.trim();
  let r = "";
  if (typeof e.bvid == "string" && e.bvid.startsWith("BV"))
    r = e.bvid;
  else if (typeof e.id == "string" && e.id.startsWith("BV"))
    r = e.id;
  else if (typeof e.url == "string" && e.url.includes("BV")) {
    const o = e.url.match(/BV[a-zA-Z0-9]+/);
    o && (r = o[0]);
  }
  if (r)
    return `https://www.bilibili.com/video/${r}`;
  const t = String(e.aid || e.id || "").replace(/\D/g, "");
  return t ? `https://www.bilibili.com/video/av${t}` : "https://www.bilibili.com";
}
function le(e) {
  const r = e.duration || 0, i = Math.floor(r / 60), t = String(r % 60).padStart(2, "0"), o = `${i}:${t}`, n = e.cnt_info?.play ? e.cnt_info.play > 1e4 ? `${(e.cnt_info.play / 1e4).toFixed(1)}万` : String(e.cnt_info.play) : "0", l = e.bvid ? `https://www.bilibili.com/video/${e.bvid}` : e.id ? `https://www.bilibili.com/video/av${e.id}` : e.link || "#";
  return {
    id: String(e.id || e.bvid),
    aid: String(e.id || ""),
    bvid: e.bvid,
    title: e.title,
    cover: e.cover,
    url: l,
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
async function T(e, r = 1, i = "fav_time", t = "") {
  const o = a.organizer;
  o.loading = !0, o.error = "";
  const l = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[i] || "mtime";
  try {
    const f = await d.getFolderVideos(e, r, 24, l, t);
    o.videos = f.medias.map(le), o.page = r, o.totalItems = f.total, o.totalPages = Math.max(1, Math.ceil(f.total / 24)), o.sort = i, o.query = t;
    const s = w.find((u) => String(u.id || u.fid) === String(e));
    o.folderTitle = s?.title || f.info?.title || "收藏夹", o.folderSubtitle = `共 ${f.total} 个内容`;
  } catch (f) {
    o.error = f.message || "加载视频列表失败", o.folderSubtitle = "加载失败，请重试";
  } finally {
    o.loading = !1;
  }
}
async function N(e = !1) {
  const r = a.organizer;
  r.loading = !0, r.error = "";
  try {
    const i = await d.getUserNav();
    if (!i.isLogin) {
      r.error = "未登录 B站", r.folderSubtitle = "未登录 B站，请先登录", r.loading = !1;
      return;
    }
    const [t, o] = await Promise.all([
      d.getCreatedFolders(i.mid),
      d.getCollectedFolders(1, 50, i.mid).catch(() => ({ count: 0, list: [] }))
    ]), n = o.list || [], l = d.getOtherFolders();
    w = [...t, ...n, ...l];
    const f = await d.treeManager.loadTree();
    (d.treeManager.syncTreeWithFolders(f, t) || e) && await d.treeManager.saveTree(f), p = f, S = await d.treeManager.loadCollapsedGroups(), a.collapsedGroups = Array.from(S);
    let u = a.activeFolderId;
    if (!u || !w.some((y) => String(y.id || y.fid) === String(u))) {
      const y = t.find((E) => /默认/.test(E.title)) || t[0] || w[0];
      u = y ? String(y.id || y.fid) : "", a.activeFolderId = u;
    }
    r.folders = d.treeManager.flattenTree(
      p,
      w,
      S,
      u
    ), u ? await T(u, 1, r.sort, r.query) : r.folderSubtitle = "暂无可用收藏夹";
  } catch (i) {
    r.error = i.message || "读取 B站 收藏夹失败", r.folderSubtitle = "读取失败，请检查网络或重试";
  } finally {
    r.loading = !1;
  }
}
const fe = {
  get active() {
    return a.mounted;
  },
  get state() {
    return a;
  },
  updateState(e) {
    Object.assign(a, e);
  },
  updateOrganizer(e) {
    Object.assign(a.organizer, e);
  },
  setMounted(e) {
    a.mounted = e, e && N();
  },
  loadOrganizer: N,
  loadFolderVideos: T,
  switchTab(e) {
    a.currentTab = e, this.dispatch("switch-tab", e);
  },
  async selectFolder(e) {
    const r = String(e), i = a.organizer;
    if (i.isTargetPickMode) {
      const t = w.find((n) => String(n.id || n.fid) === r);
      if (!t || t.isCollected || t.isOther) {
        c("无法移动到该分类，请选择您自建的有效收藏夹", { isError: !0 });
        return;
      }
      if (r === a.activeFolderId) {
        c("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: !0 });
        return;
      }
      i.isTargetPickMode = !1;
      const o = i.movingVideoId;
      if (i.movingVideoId = "", o) {
        c(`正在移动视频至「${t.title}」…`);
        const n = await d.moveVideo(a.activeFolderId, r, o);
        n.ok ? (c(`已移动至「${t.title}」`), await T(a.activeFolderId, i.page, i.sort, i.query)) : c(`移动失败：${n.reason || "未知错误"}`, { isError: !0 });
      } else if (i.batchMode) {
        const n = i.videos.filter((s) => s.selected);
        if (!n.length) return;
        const l = n.map((s) => s.aid || s.id);
        c(`正在批量移动 ${l.length} 个视频至「${t.title}」…`);
        const f = await d.moveVideo(a.activeFolderId, r, l);
        f.ok ? (c(`已将 ${l.length} 个视频移动至「${t.title}」`), i.videos.forEach((s) => s.selected = !1), i.selectedCount = 0, await T(a.activeFolderId, 1, i.sort, i.query)) : c(`批量移动失败：${f.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    a.activeFolderId = r, i.folders.forEach((t) => {
      t.selected = t.id === r;
    }), i.mode = "organizer", await T(r, 1, i.sort, "");
  },
  async toggleFolderGroup(e) {
    const r = String(e);
    S.has(r) ? S.delete(r) : S.add(r), a.collapsedGroups = Array.from(S), await d.treeManager.saveCollapsedGroups(S), a.organizer.folders = d.treeManager.flattenTree(
      p,
      w,
      S,
      a.activeFolderId
    );
  },
  async moveFolderNode(e, r, i) {
    d.treeManager.moveNode(p, e, r, i) && (await d.treeManager.saveTree(p), a.organizer.folders = d.treeManager.flattenTree(
      p,
      w,
      S,
      a.activeFolderId
    ), c("已更新收藏夹排序"));
  },
  async openCreateDialog(e) {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (i?.openCreate)
      i.openCreate(e, async ({ name: t, privacy: o }) => {
        if (i.updateCreate({ status: e === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), e === "bili") {
          const n = await d.createRemoteFolder(t, Number(o || 0));
          if (!n.ok) {
            i.updateCreate({ status: n.reason || "创建失败", error: !0 });
            return;
          }
          i.closeCreate(), await N(!0), c(`已成功创建 B站收藏夹「${t}」`);
        } else {
          const n = d.treeManager.createGroupNode(t);
          p.children = p.children || [], p.children.push(n), await d.treeManager.saveTree(p), i.closeCreate(), a.organizer.folders = d.treeManager.flattenTree(
            p,
            w,
            S,
            a.activeFolderId
          ), c(`已建立本地分组「${t}」`);
        }
      });
    else {
      const t = (await H.prompt({
        title: e === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: e === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!t) return;
      if (e === "bili") {
        const o = await d.createRemoteFolder(t);
        o.ok ? (await N(!0), c(`已成功创建「${t}」`)) : c(`创建失败：${o.reason}`, { isError: !0 });
      } else {
        const o = d.treeManager.createGroupNode(t);
        p.children = p.children || [], p.children.push(o), await d.treeManager.saveTree(p), a.organizer.folders = d.treeManager.flattenTree(
          p,
          w,
          S,
          a.activeFolderId
        ), c(`已建立本地分组「${t}」`);
      }
    }
  },
  async handleVideoAction(e, r) {
    const i = a.organizer;
    let t = null;
    if (e && typeof e == "object" && (e.bvid || e.aid || e.id))
      t = e;
    else {
      const s = String(e || "");
      t = i.videos.find((u) => String(u.id) === s || String(u.bvid) === s || String(u.aid) === s) || i.specialVideos.find((u) => String(u.id) === s || String(u.bvid) === s || String(u.aid) === s) || i.cachedVideos.find((u) => String(u.id) === s || String(u.bvid) === s || String(u.aid) === s), !t && (s.startsWith("BV") || /^\d+$/.test(s)) && (t = {
        id: s,
        bvid: s.startsWith("BV") ? s : "",
        aid: /^\d+$/.test(s) ? s : "",
        title: s,
        url: `https://www.bilibili.com/video/${s}`
      });
    }
    if (!t) return;
    const o = t.bvid || (String(t.id || "").startsWith("BV") ? t.id : ""), n = t.aid || t.id, l = se(t), f = l || t.url;
    if (r === "play")
      o || t.aid ? te.openVideo({
        bvid: o,
        aid: String(n || ""),
        title: t.title || o,
        author: t.author ? `${t.author}` : "",
        url: f,
        cover: t.cover
      }) : f && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: f, active: !0 }) : window.open(f, "_blank"));
    else if (r === "open")
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: l, active: !0 }) : window.open(l, "_blank");
    else if (r === "copy-link")
      try {
        await navigator.clipboard.writeText(l), c(`已复制视频链接: ${l}`);
      } catch {
        c("复制链接失败", { isError: !0 });
      }
    else if (r === "move")
      i.isTargetPickMode && i.movingVideoId === t.aid ? (i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹")) : (i.isTargetPickMode = !0, i.movingVideoId = t.aid, c(`请点击左侧收藏夹，将《${t.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${t.title}》`
      }));
    else if (r === "delete") {
      const s = t.aid || t.id, u = a.activeFolderId, y = await d.deleteVideo(u, s);
      y.ok ? (c(`已取消收藏《${t.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          c(`正在还原《${t.title}》…`);
          const E = await d.addVideoToFavorite(u, s);
          E.ok ? (c(`已还原《${t.title}》`), await T(u, i.page, i.sort, i.query)) : c(`还原失败：${E.reason || "未知错误"}`, { isError: !0 });
        }
      }), await T(u, i.page, i.sort, i.query)) : c(`取消收藏失败：${y.reason || "未知错误"}`, { isError: !0 });
    } else if (r === "subtitle") {
      const s = o || (String(t.id || "").startsWith("BV") ? t.id : "");
      s || t.aid ? ne.open({
        bvid: s || String(t.aid || t.id || ""),
        cid: t.cid,
        title: t.title || s
      }) : c("该视频暂无字幕信息", { isError: !0 });
    } else if (r === "cache") {
      const { cacheBiliVideo: s } = await import("./cache.service-htZPy0cO.js");
      await s({ bvid: t.bvid, aid: t.aid, title: t.title, cover: t.cover });
    } else if (r === "collect-inbox") {
      const s = w.find((E) => /收集箱|默认|Inbox/i.test(E.title)) || w.find((E) => !E.isCollected && !E.isOther) || w[0];
      if (!s) {
        c("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const u = t.aid || t.id;
      c(`正在将《${t.title}》添加到「${s.title}」…`);
      const y = await d.addVideoToFavorite(s.id, u);
      y.ok ? c(`✓ 已成功添加到「${s.title}」`) : c(`添加失败：${y.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(e) {
    return O.add(e), () => {
      O.delete(e);
    };
  },
  dispatch(e, r) {
    const i = a.organizer;
    switch (e) {
      case "select-folder":
        this.selectFolder(r?.id ?? r);
        break;
      case "toggle-folder-group":
        this.toggleFolderGroup(r?.id ?? r);
        break;
      case "move-folder-node":
        r?.sourceId && r?.targetId && this.moveFolderNode(r.sourceId, r.targetId, r.mode || "before");
        break;
      case "create-bili-folder":
        this.openCreateDialog("bili");
        break;
      case "create-local-group":
        this.openCreateDialog("plugin");
        break;
      case "organizer-refresh":
        N(!0);
        break;
      case "subscription-toggle-desc-panel":
        i.showFullDescInRightPanel = !i.showFullDescInRightPanel;
        break;
      case "organizer-open":
        i.mode = "organizer", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, i.folders.length || N();
        break;
      case "open-radio":
        i.mode = "radio", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, v.init();
        break;
      case "radio-refresh":
        v.refresh();
        break;
      case "radio-select-folder":
        v.selectFolder(Number(r));
        break;
      case "radio-add":
        v.add(r);
        break;
      case "radio-remove":
        v.remove(Number(r?.index));
        break;
      case "radio-clear":
        v.clear();
        break;
      case "radio-save":
        v.save(String(r?.name || ""));
        break;
      case "radio-load-series":
        v.loadSeries(String(r?.id ?? r));
        break;
      case "radio-play-series":
        typeof r == "object" && r !== null ? v.playSeries(String(r.id || ""), Number(r.startIndex || 0)) : v.playSeries(String(r));
        break;
      case "radio-delete-series":
        v.deleteSeries(String(r));
        break;
      case "radio-rename-series": {
        const t = r;
        t?.id && t?.name && v.renameSeries(t.id, t.name);
        break;
      }
      case "radio-play-index":
        v.playAt(Number(r));
        break;
      case "radio-play":
        v.play(!1, typeof r == "number" ? r : 0);
        break;
      case "radio-shuffle":
        v.play(!0);
        break;
      case "organizer-sort":
        ["fav_time", "view", "pubtime"].includes(r) && T(a.activeFolderId, 1, r, i.query);
        break;
      case "organizer-search":
        T(a.activeFolderId, 1, i.sort, String(r || "").trim());
        break;
      case "organizer-page": {
        const t = Number(r);
        Number.isFinite(t) && t >= 1 && T(a.activeFolderId, t, i.sort, i.query);
        break;
      }
      case "organizer-batch-toggle":
        i.batchMode = !i.batchMode, i.batchMode || (i.videos.forEach((t) => t.selected = !1), i.selectedCount = 0);
        break;
      case "organizer-batch-select": {
        const t = String(r || ""), o = i.videos.find((n) => n.id === t || n.bvid === t);
        o && (o.selected = !o.selected, i.selectedCount = i.videos.filter((n) => n.selected).length);
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
          c("请先选择要移动的视频", { isError: !0 });
          return;
        }
        i.isTargetPickMode = !0, c(`请点击左侧目标收藏夹，将 ${t} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const t = i.videos.filter((o) => o.selected);
        if (!t.length) {
          c("请先选择要取消收藏的视频", { isError: !0 });
          return;
        }
        (async () => {
          if (await H.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${t.length} 个视频吗？`,
            danger: !0
          })) {
            const n = a.activeFolderId, l = t.map((s) => s.aid || s.id);
            c(`正在批量移除 ${l.length} 个视频…`);
            let f = 0;
            for (const s of l)
              (await d.deleteVideo(n, s)).ok && f++;
            c(`已移除 ${f}/${l.length} 个视频`), i.batchMode = !1, i.selectedCount = 0, await T(n, i.page, i.sort, i.query);
          }
        })();
        break;
      }
      case "organizer-play-video":
      case "special-play-video": {
        this.handleVideoAction(r, "play");
        break;
      }
      case "organizer-video-action":
      case "special-video-action":
        r?.action && this.handleVideoAction(r.video || r.id, r.action);
        break;
      case "organizer-cancel-move-target":
        i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const t = globalThis;
        typeof t.openBiliUpGroupManagerDialog == "function" ? t.openBiliUpGroupManagerDialog() : t.LogicWeaverBiliUpGroupManager?.open && t.LogicWeaverBiliUpGroupManager.open();
        break;
      }
    }
    for (const t of O)
      try {
        t(e, r);
      } catch (o) {
        console.error("[BiliFavorites] Action error:", o);
      }
  }
};
export {
  h as a,
  fe as b,
  a as c,
  v as d,
  X as e,
  g as f,
  Y as r,
  ne as s
};
