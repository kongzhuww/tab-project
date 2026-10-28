import { c as l, h as ce, n as S, d as ue } from "./view-styles-hx9Gz5g8.js";
import { a as fe, r as re } from "./vendor-vue-DokqDua_.js";
import { b as ie } from "./read-session-e15k1OwA.js";
function Q(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const r = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(r).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const ge = () => ({
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
}), m = re(ge()), oe = {
  getSnapshot() {
    return fe(m);
  },
  update(e) {
    for (const r of Object.keys(e))
      m[r] !== e[r] && (m[r] = e[r]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const r = e.currentTime ?? m.currentTime, i = e.duration ?? m.duration, t = Q(r), o = Q(i);
      if (m.formattedCurrent !== t && (m.formattedCurrent = t), m.formattedDuration !== o && (m.formattedDuration = o), i > 0) {
        const n = Math.round(Math.min(100, Math.max(0, r / i * 100)) * 10) / 10;
        Math.abs(m.progressPercent - n) >= 0.2 && (m.progressPercent = n);
      } else
        m.progressPercent = 0;
    }
  },
  setProgress(e, r) {
    m.currentTime = e, m.duration = r;
    const i = Q(e), t = Q(r);
    if (m.formattedCurrent !== i && (m.formattedCurrent = i), m.formattedDuration !== t && (m.formattedDuration = t), r > 0) {
      const o = Math.round(Math.min(100, Math.max(0, e / r * 100)) * 10) / 10;
      Math.abs(m.progressPercent - o) >= 0.2 && (m.progressPercent = o);
    } else
      m.progressPercent = 0;
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = oe);
let f = null, k = !1, H = !1, _ = "B站电台", M = [], I = -1, v = null, Z, ae = {}, D = 0, B = "", O = null, ne = [], G = /* @__PURE__ */ new Set(), z = null, j = 0, U = Date.now(), K = 0;
function te() {
  O !== null && (clearInterval(O), O = null);
}
function se(e) {
  const r = f;
  if (!r || !k || !v) return;
  const i = ne.find((t) => !G.has(t) && /^https?:\/\//i.test(t));
  if (!i || G.size >= 3) {
    te(), B = "音频连接中断，已尝试所有备用线路", E();
    return;
  }
  G.add(i), z = {
    time: Number.isFinite(r.currentTime) ? r.currentTime : 0,
    paused: r.paused
  }, B = "网络波动，正在切换备用线路…", E(), r.src = i, r.load(), z.paused || r.play().catch(() => {
  });
}
function he() {
  te(), U = Date.now(), j = f?.currentTime || 0, K = f?.buffered.length ? f.buffered.end(f.buffered.length - 1) : 0, O = setInterval(() => {
    const e = f;
    if (!e || !k || e.paused || e.ended) {
      U = Date.now();
      return;
    }
    const r = e.currentTime, i = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (r !== j || i > K) {
      U = Date.now(), j = r, K = i, B === "网络波动，正在切换备用线路…" && (B = "", E());
      return;
    }
    Date.now() - U >= 8e3 && e.readyState < 3 && se();
  }, 1e3);
}
function me() {
  f && (U = Date.now(), j = f.currentTime, B === "网络波动，正在切换备用线路…" && (B = "")), E();
}
function pe() {
  const e = f;
  if (e && z) {
    const r = z;
    if (z = null, r.time > 0 && r.time < (e.duration || 1 / 0))
      try {
        e.currentTime = r.time;
      } catch {
      }
    r.paused || e.play().catch(() => {
    });
  }
  E();
}
function ve() {
  k && f?.error && se(`音频解码或网络错误 [代码: ${f.error.code}]`);
}
function R() {
  return f || (f = new Audio(), f.id = "bili-radio-audio", f.preload = "auto", f.addEventListener("ended", () => {
    L(I + 1);
  }), f.addEventListener("timeupdate", me), f.addEventListener("play", E), f.addEventListener("pause", E), f.addEventListener("loadedmetadata", pe), f.addEventListener("error", ve), f);
}
function E() {
  const e = f, r = !!(e && !e.paused && !e.ended && k), i = e?.duration && Number.isFinite(e.duration) ? e.duration : v?.duration || 0, t = v?.cues?.find((n) => (e?.currentTime || 0) >= n.from && (e?.currentTime || 0) < n.to), o = B || t?.content || (r ? "♪ 伴奏播放中…" : v ? `已暂停 · 《${v.title}》` : "点击磁带继续播放");
  oe.update({
    active: k,
    loading: H,
    playing: r,
    title: v?.title || "B站电台",
    coverUrl: v?.cover || "",
    seriesName: _,
    trackIndex: I >= 0 ? I + 1 : 1,
    totalTracks: M.length || 1,
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: o
  }), k && v && ce.syncFromBiliRadio({
    playing: r,
    title: v.title || "B站电台",
    artist: v.upper || v.author || _ || "哔哩哔哩电台",
    coverUrl: v.cover || "",
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: o,
    seriesName: _
  });
}
async function be(e) {
  if (e.streamUrl || e.url) return e;
  const r = await l.getVideoView(e.bvid);
  if (!r?.cid) throw new Error("视频信息不可用");
  const i = await l.fetchAudioStream(e.bvid, r.cid);
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
async function L(e) {
  const r = ae;
  if (!M.length || r.isCurrent?.() === !1) return;
  const i = ++D;
  I = (e % M.length + M.length) % M.length, H = !0, k = !0, B = "", te(), z = null, R().pause(), E();
  try {
    const t = Z ? await Z(M[I]) : await be(M[I]);
    if (i !== D || r.isCurrent?.() === !1) return;
    v = t;
    const o = t.streamUrls?.length ? t.streamUrls : t.streamUrl || t.url ? [t.streamUrl || t.url] : [], n = o[0];
    if (!n) throw new Error("没有取得视频播放地址");
    ne = o, G = /* @__PURE__ */ new Set([n]), R().src = n, he(), r.onReady?.(R()), r.autoplay !== !1 && R().play().catch((d) => console.warn("[BiliRadio] 播放失败", d)), t.bvid && !t.cues?.length && l.fetchVideoSubtitleDetails(t.bvid, t.cid).then((d) => {
      i === D && d.ok && v && (v.cues = d.cues);
    }).catch(() => {
    });
  } catch (t) {
    if (i !== D || r.isCurrent?.() === !1) return;
    k = !1, console.warn("[BiliRadio] 解析音轨失败", t), B = t instanceof Error ? t.message : "播放失败";
  } finally {
    i === D && (H = !1, r.isCurrent?.() === !1 && (k = !1), E());
  }
}
const de = {
  playQueue(e) {
    _ = e.name || "B站电台", M = Array.isArray(e.items) ? e.items.map((r) => ({ ...r })) : [], Z = e.resolveTrack, ae = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, L(e.startIndex || 0);
  },
  playAt(e) {
    M.length && L(e);
  },
  next() {
    L(I + 1);
  },
  prev() {
    L(I - 1);
  },
  toggle() {
    const e = R();
    if (!k && !e.src) {
      M.length > 0 && L(I >= 0 ? I : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), E();
  },
  seek(e) {
    const r = R();
    Number.isFinite(r.duration) && r.duration > 0 && (r.currentTime = Math.min(100, Math.max(0, e)) / 100 * r.duration, E());
  },
  getAudioElement() {
    return f;
  },
  getState() {
    return {
      active: k,
      loading: H,
      name: _,
      items: M,
      index: I,
      track: v,
      currentTime: f?.currentTime || 0,
      duration: f?.duration || 0,
      playing: !!(f && !f.paused && !f.ended && k)
    };
  },
  syncTape: E
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = de);
const V = "biliRadioSeriesV1", W = "lw_backup_bili_radio_series";
let x = 0, J = !1;
function $(e) {
  return e instanceof Error ? e.message : "读取电台失败";
}
function A(e) {
  return {
    bvid: String(e?.bvid || ""),
    title: String(e?.title || "未命名视频"),
    cover: String(e?.cover || "").replace(/^http:/, "https:"),
    author: String(e?.author || e?.upper?.name || e?.upper || ""),
    duration: Number(e?.duration || 0)
  };
}
async function le(e) {
  return typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get(e) : {};
}
async function X() {
  const e = await le([V, W]);
  for (const r of [V, W])
    if (e[r] !== void 0) {
      if (!Array.isArray(e[r])) throw new Error("电台存储格式无效，未覆盖数据");
      return e[r];
    }
  for (const r of [V, W]) {
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
function ee(e) {
  return e.map((r) => {
    if (!r || typeof r != "object" || Array.isArray(r)) throw new Error("电台系列格式无效，未覆盖数据");
    const i = r, t = i.items == null ? [] : Array.isArray(i.items) ? i.items : typeof i.items == "object" ? Object.values(i.items) : null;
    if (!t) throw new Error("电台曲目格式无效，未覆盖数据");
    const o = t.map((n) => {
      if (!n || typeof n != "object" || Array.isArray(n)) throw new Error("电台曲目格式无效，未覆盖数据");
      const d = n;
      if (typeof d.bvid != "string" || !d.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const g = A(d);
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
async function N(e) {
  if (!e.length) {
    const t = (await le([V]))[V];
    if (Array.isArray(t) && t.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const r = JSON.stringify(e);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [V]: e, [W]: e }), localStorage.setItem(V, r), localStorage.setItem(W, r);
}
function q(e = 0, r = !1, i) {
  const t = a.radioQueue.map((n) => ({ ...n, upper: n.author }));
  if (!t.length) return;
  if (r) {
    for (let n = t.length - 1; n > 0; n--) {
      const d = Math.floor(Math.random() * (n + 1));
      [t[n], t[d]] = [t[d], t[n]];
    }
    e = 0;
  }
  const o = Math.max(0, Math.min(t.length - 1, Number(e) || 0));
  de.playQueue({
    name: i || (r ? "B站电台 · 随机" : "B站电台"),
    items: t,
    startIndex: o
  });
}
typeof window < "u" && (window.playBiliRadioQueue = q);
const b = {
  async init() {
    if (!J) {
      J = !0;
      try {
        a.radioSeries = ee(await X());
      } catch (e) {
        J = !1, console.warn("[BiliRadio] 读取系列失败", e);
      }
    }
    await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const e = ee(await X());
    return e.length && await N(e), a.radioSeries = e, {
      ok: !0,
      repairedCount: e.length,
      emptySeries: e.filter((r) => !r.items.length).map((r) => ({ id: r.id, name: r.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: e.map((r) => ({ id: r.id, name: r.name, count: r.count, sampleItem: r.items[0]?.title }))
    };
  },
  async refresh() {
    const e = ++x;
    a.radioLoading = !0, a.radioError = "";
    try {
      const r = await l.getUserNav();
      if (!r.isLogin) throw new Error("请先登录 B站");
      const i = await l.getCreatedFolders(r.mid);
      if (e !== x) return;
      a.radioFolders = i.map((o) => ({
        id: Number(o.id),
        title: o.title || "收藏夹",
        count: Number(o.media_count || 0)
      }));
      const t = a.radioFolders[0];
      t ? await this.selectFolder(t.id) : (a.radioActiveFolderId = 0, a.radioVideos = []), this.autoHealEmptySeries();
    } catch (r) {
      e === x && (a.radioError = $(r));
    } finally {
      e === x && (a.radioLoading = !1);
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
            const o = ((await l.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => A({ ...n, author: n.upper?.name }));
            o.length && (r.items = o, r.count = o.length, e = !0);
          } catch {
          }
      }
    if (e)
      try {
        await N(a.radioSeries);
      } catch (r) {
        a.radioError = `系列已补全，但保存未确认：${$(r)}`;
      }
  },
  async selectFolder(e) {
    const r = Number(e);
    if (!a.radioFolders.some((t) => Number(t.id) === r) || r === a.radioActiveFolderId && a.radioVideos.length > 0)
      return;
    const i = ++x;
    a.radioActiveFolderId = r, a.radioLoading = !0, a.radioError = "";
    try {
      const t = /* @__PURE__ */ new Map(), o = 4;
      for (let n = 1; n <= o; n++) {
        const d = await l.getFolderVideos(r, n, 40);
        if (i !== x) return;
        for (const s of d.medias || [])
          s.bvid && t.set(s.bvid, A({ ...s, author: s.upper?.name }));
        const g = a.radioFolders.find((s) => Number(s.id) === r)?.count || 0;
        if (!d.medias?.length || t.size >= Math.max(d.total, g)) break;
      }
      a.radioVideos = [...t.values()];
    } catch (t) {
      i === x && (a.radioError = $(t));
    } finally {
      i === x && (a.radioLoading = !1);
    }
  },
  add(e) {
    !e.bvid || a.radioQueue.some((r) => r.bvid === e.bvid) || a.radioQueue.push(A(e));
  },
  remove(e) {
    Number.isInteger(e) && e >= 0 && e < a.radioQueue.length && a.radioQueue.splice(e, 1);
  },
  clear() {
    a.radioQueue = [];
  },
  play(e = !1, r = 0) {
    q(r, e);
  },
  playAt(e) {
    if (!a.radioQueue.length) return;
    const r = Math.max(0, Math.min(a.radioQueue.length - 1, Number(e) || 0));
    q(r, !1);
  },
  async loadSeries(e) {
    const r = a.radioSeries.find((i) => i.id === e);
    if (r) {
      if (!r.items.length) {
        const i = a.radioFolders.find(
          (t) => t.title.trim().toLowerCase() === r.name.trim().toLowerCase()
        );
        if (i) {
          S.fetch("哔哩哔哩电台", `正在从「${i.title}」收藏夹自动补齐系列曲目…`);
          try {
            const o = ((await l.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => A({ ...n, author: n.upper?.name }));
            o.length && (r.items = o, r.count = o.length, await N(a.radioSeries));
          } catch (t) {
            a.radioError = `读取或保存补全系列失败：${$(t)}`, S.fetch("哔哩哔哩电台", a.radioError);
          }
        }
      }
      if (!r.items.length) {
        S.fetch("哔哩哔哩电台", `系列「${r.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      a.radioQueue = r.items.map(A), a.radioSeriesName = r.name, S.fetch("哔哩哔哩电台", `已载入系列「${r.name}」（共 ${r.count} 首）`);
    }
  },
  async playSeries(e, r = 0) {
    await this.loadSeries(e);
    const i = a.radioSeries.find((t) => t.id === e);
    i?.items.length && q(r, !1, i.name);
  },
  async deleteSeries(e) {
    const i = a.radioSeries.find((o) => o.id === e)?.name || "系列", t = a.radioSeries.filter((o) => o.id !== e);
    try {
      await N(t), a.radioSeries = t, S.fetch("哔哩哔哩电台", `已删除电台系列「${i}」`);
    } catch (o) {
      a.radioError = `删除系列失败：${$(o)}`, S.fetch("哔哩哔哩电台", `删除系列失败：${$(o)}`);
    }
  },
  async renameSeries(e, r) {
    const i = r.trim();
    if (!i) return;
    const t = a.radioSeries.find((d) => d.id === e);
    if (!t) return;
    const o = t.name, n = a.radioSeries.map((d) => d.id === e ? { ...d, name: i } : d);
    try {
      await N(n), a.radioSeries = n, a.radioSeriesName === o && (a.radioSeriesName = i), S.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${i}」`);
    } catch (d) {
      a.radioError = `重命名系列失败：${$(d)}`, S.fetch("哔哩哔哩电台", `重命名系列失败：${$(d)}`);
    }
  },
  async save(e) {
    if (!a.radioQueue.length) {
      S.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    const r = (e || a.radioSeriesName || "").trim();
    if (!r) {
      a.radioError = "保存失败：系列名称不能为空，请输入系列名称", S.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
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
      await N(o), a.radioSeries = o, a.radioSeriesName = "", S.fetch(
        "哔哩哔哩电台",
        t >= 0 ? `✓ 已更新系列「${r}」（共 ${i.length} 首）` : `★ 已保存系列「${r}」（共 ${i.length} 首）`
      );
    } catch (n) {
      const d = $(n);
      a.radioError = `保存系列失败：${d}`, S.fetch("哔哩哔哩电台", `保存系列失败：${d}`);
    }
  }
};
typeof window < "u" && window.addEventListener("logicweaver:sync-restored", () => {
  (async () => {
    try {
      a.radioSeries = ee(await X());
    } catch (e) {
      console.warn("[BiliRadio] 云同步恢复系列重载失败", e);
    }
  })();
});
const h = re({
  isOpen: !1,
  loading: !1,
  error: "",
  title: "",
  bvid: "",
  cid: void 0,
  fullText: "",
  charCount: 0,
  copied: !1
}), we = {
  get state() {
    return h;
  },
  async open(e) {
    if (e.bvid) {
      h.isOpen = !0, h.loading = !0, h.error = "", h.fullText = "", h.title = e.title || e.bvid, h.bvid = e.bvid, h.cid = e.cid, h.copied = !1;
      try {
        const r = await l.fetchVideoSubtitleDetails(e.bvid, e.cid);
        if (!r.ok || !r.cues || !r.cues.length) {
          h.error = r.reason || "该视频暂无可用字幕轨道";
          return;
        }
        const t = r.cues.map((o) => o.content.trim()).filter(Boolean).join(`
`);
        h.fullText = t, h.charCount = t.length;
      } catch (r) {
        h.error = r?.message || "提取字幕失败，请检查网络";
      } finally {
        h.loading = !1;
      }
    }
  },
  close() {
    h.isOpen = !1;
  },
  async copy() {
    if (h.fullText)
      try {
        await navigator.clipboard.writeText(h.fullText), h.copied = !0, setTimeout(() => {
          h.copied = !1;
        }, 2e3);
      } catch {
      }
  },
  downloadTxt() {
    if (!h.fullText) return;
    const e = new Blob([h.fullText], { type: "text/plain;charset=utf-8" }), r = URL.createObjectURL(e), i = document.createElement("a");
    i.href = r, i.download = `${(h.title || h.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(i), i.click(), i.remove(), URL.revokeObjectURL(r);
  }
}, a = re({
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
}), Y = /* @__PURE__ */ new Set();
let w = [], p = { id: "root", type: "folder", children: [] }, T = /* @__PURE__ */ new Set();
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
function ye(e) {
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
function Se(e) {
  const r = e.duration || 0, i = Math.floor(r / 60), t = String(r % 60).padStart(2, "0"), o = `${i}:${t}`, n = e.cnt_info?.play ? e.cnt_info.play > 1e4 ? `${(e.cnt_info.play / 1e4).toFixed(1)}万` : String(e.cnt_info.play) : "0", d = e.bvid ? `https://www.bilibili.com/video/${e.bvid}` : e.id ? `https://www.bilibili.com/video/av${e.id}` : e.link || "#";
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
async function F(e, r = 1, i = "fav_time", t = "") {
  const o = a.organizer;
  o.loading = !0, o.error = "";
  const d = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[i] || "mtime";
  try {
    const g = await l.getFolderVideos(e, r, 24, d, t);
    o.videos = g.medias.map(Se), o.page = r, o.totalItems = g.total, o.totalPages = Math.max(1, Math.ceil(g.total / 24)), o.sort = i, o.query = t;
    const s = w.find((u) => String(u.id || u.fid) === String(e));
    o.folderTitle = s?.title || g.info?.title || "收藏夹", o.folderSubtitle = `共 ${g.total} 个内容`;
  } catch (g) {
    o.error = g.message || "加载视频列表失败", o.folderSubtitle = "加载失败，请重试";
  } finally {
    o.loading = !1;
  }
}
async function P(e = !1) {
  const r = a.organizer;
  r.loading = !0, r.error = "";
  try {
    const i = await l.getUserNav();
    if (!i.isLogin) {
      r.error = "未登录 B站", r.folderSubtitle = "未登录 B站，请先登录", r.loading = !1;
      return;
    }
    const [t, o] = await Promise.all([
      l.getCreatedFolders(i.mid),
      l.getCollectedFolders(1, 50, i.mid).catch(() => ({ count: 0, list: [] }))
    ]), n = o.list || [], d = l.getOtherFolders();
    w = [...t, ...n, ...d];
    const g = await l.treeManager.loadTree();
    (l.treeManager.syncTreeWithFolders(g, t) || e) && await l.treeManager.saveTree(g), p = g, T = await l.treeManager.loadCollapsedGroups(), a.collapsedGroups = Array.from(T);
    let u = a.activeFolderId;
    if (!u || !w.some((y) => String(y.id || y.fid) === String(u))) {
      const y = t.find((C) => /默认/.test(C.title)) || t[0] || w[0];
      u = y ? String(y.id || y.fid) : "", a.activeFolderId = u;
    }
    r.folders = l.treeManager.flattenTree(
      p,
      w,
      T,
      u
    ), u ? await F(u, 1, r.sort, r.query) : r.folderSubtitle = "暂无可用收藏夹";
  } catch (i) {
    r.error = i.message || "读取 B站 收藏夹失败", r.folderSubtitle = "读取失败，请检查网络或重试";
  } finally {
    r.loading = !1;
  }
}
const Fe = {
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
    a.mounted = e, e && P();
  },
  loadOrganizer: P,
  loadFolderVideos: F,
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
        const n = await l.moveVideo(a.activeFolderId, r, o);
        n.ok ? (c(`已移动至「${t.title}」`), await F(a.activeFolderId, i.page, i.sort, i.query)) : c(`移动失败：${n.reason || "未知错误"}`, { isError: !0 });
      } else if (i.batchMode) {
        const n = i.videos.filter((s) => s.selected);
        if (!n.length) return;
        const d = n.map((s) => s.aid || s.id);
        c(`正在批量移动 ${d.length} 个视频至「${t.title}」…`);
        const g = await l.moveVideo(a.activeFolderId, r, d);
        g.ok ? (c(`已将 ${d.length} 个视频移动至「${t.title}」`), i.videos.forEach((s) => s.selected = !1), i.selectedCount = 0, await F(a.activeFolderId, 1, i.sort, i.query)) : c(`批量移动失败：${g.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    a.activeFolderId = r, i.folders.forEach((t) => {
      t.selected = t.id === r;
    }), i.mode = "organizer", await F(r, 1, i.sort, "");
  },
  async toggleFolderGroup(e) {
    const r = String(e);
    T.has(r) ? T.delete(r) : T.add(r), a.collapsedGroups = Array.from(T), await l.treeManager.saveCollapsedGroups(T), a.organizer.folders = l.treeManager.flattenTree(
      p,
      w,
      T,
      a.activeFolderId
    );
  },
  async moveFolderNode(e, r, i) {
    l.treeManager.moveNode(p, e, r, i) && (await l.treeManager.saveTree(p), a.organizer.folders = l.treeManager.flattenTree(
      p,
      w,
      T,
      a.activeFolderId
    ), c("已更新收藏夹排序"));
  },
  async openCreateDialog(e) {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (i?.openCreate)
      i.openCreate(e, async ({ name: t, privacy: o }) => {
        if (i.updateCreate({ status: e === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), e === "bili") {
          const n = await l.createRemoteFolder(t, Number(o || 0));
          if (!n.ok) {
            i.updateCreate({ status: n.reason || "创建失败", error: !0 });
            return;
          }
          i.closeCreate(), await P(!0), c(`已成功创建 B站收藏夹「${t}」`);
        } else {
          const n = l.treeManager.createGroupNode(t);
          p.children = p.children || [], p.children.push(n), await l.treeManager.saveTree(p), i.closeCreate(), a.organizer.folders = l.treeManager.flattenTree(
            p,
            w,
            T,
            a.activeFolderId
          ), c(`已建立本地分组「${t}」`);
        }
      });
    else {
      const t = (await ie.prompt({
        title: e === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: e === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!t) return;
      if (e === "bili") {
        const o = await l.createRemoteFolder(t);
        o.ok ? (await P(!0), c(`已成功创建「${t}」`)) : c(`创建失败：${o.reason}`, { isError: !0 });
      } else {
        const o = l.treeManager.createGroupNode(t);
        p.children = p.children || [], p.children.push(o), await l.treeManager.saveTree(p), a.organizer.folders = l.treeManager.flattenTree(
          p,
          w,
          T,
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
    const o = t.bvid || (String(t.id || "").startsWith("BV") ? t.id : ""), n = t.aid || t.id, d = ye(t), g = d || t.url;
    if (r === "play")
      o || t.aid ? ue.openVideo({
        bvid: o,
        aid: String(n || ""),
        title: t.title || o,
        author: t.author ? `${t.author}` : "",
        url: g,
        cover: t.cover
      }) : g && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: g, active: !0 }) : window.open(g, "_blank"));
    else if (r === "open")
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: d, active: !0 }) : window.open(d, "_blank");
    else if (r === "copy-link")
      try {
        await navigator.clipboard.writeText(d), c(`已复制视频链接: ${d}`);
      } catch {
        c("复制链接失败", { isError: !0 });
      }
    else if (r === "move")
      i.isTargetPickMode && i.movingVideoId === t.aid ? (i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹")) : (i.isTargetPickMode = !0, i.movingVideoId = t.aid, c(`请点击左侧收藏夹，将《${t.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${t.title}》`
      }));
    else if (r === "delete") {
      const s = t.aid || t.id, u = a.activeFolderId, y = await l.deleteVideo(u, s);
      y.ok ? (c(`已取消收藏《${t.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          c(`正在还原《${t.title}》…`);
          const C = await l.addVideoToFavorite(u, s);
          C.ok ? (c(`已还原《${t.title}》`), await F(u, i.page, i.sort, i.query)) : c(`还原失败：${C.reason || "未知错误"}`, { isError: !0 });
        }
      }), await F(u, i.page, i.sort, i.query)) : c(`取消收藏失败：${y.reason || "未知错误"}`, { isError: !0 });
    } else if (r === "subtitle") {
      const s = o || (String(t.id || "").startsWith("BV") ? t.id : "");
      s || t.aid ? we.open({
        bvid: s || String(t.aid || t.id || ""),
        cid: t.cid,
        title: t.title || s
      }) : c("该视频暂无字幕信息", { isError: !0 });
    } else if (r === "cache") {
      const { cacheBiliVideo: s } = await import("./cache.service--76G3joL.js");
      await s({ bvid: t.bvid, aid: t.aid, title: t.title, cover: t.cover });
    } else if (r === "collect-inbox") {
      const s = w.find((C) => /收集箱|默认|Inbox/i.test(C.title)) || w.find((C) => !C.isCollected && !C.isOther) || w[0];
      if (!s) {
        c("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const u = t.aid || t.id;
      c(`正在将《${t.title}》添加到「${s.title}」…`);
      const y = await l.addVideoToFavorite(s.id, u);
      y.ok ? c(`✓ 已成功添加到「${s.title}」`) : c(`添加失败：${y.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(e) {
    return Y.add(e), () => {
      Y.delete(e);
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
        P(!0);
        break;
      case "subscription-toggle-desc-panel":
        i.showFullDescInRightPanel = !i.showFullDescInRightPanel;
        break;
      case "organizer-open":
        i.mode = "organizer", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, i.folders.length || P();
        break;
      case "open-radio":
        i.mode = "radio", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, b.init();
        break;
      case "radio-refresh":
        b.refresh();
        break;
      case "radio-select-folder":
        b.selectFolder(Number(r));
        break;
      case "radio-add":
        b.add(r);
        break;
      case "radio-remove":
        b.remove(Number(r?.index));
        break;
      case "radio-clear":
        b.clear();
        break;
      case "radio-save":
        b.save(String(r?.name || ""));
        break;
      case "radio-load-series":
        b.loadSeries(String(r?.id ?? r));
        break;
      case "radio-play-series":
        typeof r == "object" && r !== null ? b.playSeries(String(r.id || ""), Number(r.startIndex || 0)) : b.playSeries(String(r));
        break;
      case "radio-delete-series":
        b.deleteSeries(String(r));
        break;
      case "radio-rename-series": {
        const t = r;
        t?.id && t?.name && b.renameSeries(t.id, t.name);
        break;
      }
      case "radio-play-index":
        b.playAt(Number(r));
        break;
      case "radio-play":
        b.play(!1, typeof r == "number" ? r : 0);
        break;
      case "radio-shuffle":
        b.play(!0);
        break;
      case "organizer-sort":
        ["fav_time", "view", "pubtime"].includes(r) && F(a.activeFolderId, 1, r, i.query);
        break;
      case "organizer-search":
        F(a.activeFolderId, 1, i.sort, String(r || "").trim());
        break;
      case "organizer-page": {
        const t = Number(r);
        Number.isFinite(t) && t >= 1 && F(a.activeFolderId, t, i.sort, i.query);
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
          if (await ie.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${t.length} 个视频吗？`,
            danger: !0
          })) {
            const n = a.activeFolderId, d = t.map((s) => s.aid || s.id);
            c(`正在批量移除 ${d.length} 个视频…`);
            let g = 0;
            for (const s of d)
              (await l.deleteVideo(n, s)).ok && g++;
            c(`已移除 ${g}/${d.length} 个视频`), i.batchMode = !1, i.selectedCount = 0, await F(n, i.page, i.sort, i.query);
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
    for (const t of Y)
      try {
        t(e, r);
      } catch (o) {
        console.error("[BiliFavorites] Action error:", o);
      }
  }
};
export {
  m as a,
  Fe as b,
  a as c,
  de as d,
  b as e,
  h as f,
  oe as r,
  we as s
};
