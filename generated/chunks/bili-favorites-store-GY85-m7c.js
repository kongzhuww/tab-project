import { c as l, h as ue, n as M, d as fe } from "./view-styles-D_56CpcO.js";
import { r as re, a as ge } from "./vendor-vue-DokqDua_.js";
import { b as oe } from "./read-session-e15k1OwA.js";
function Q(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const O = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, he = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: O === "order" || O === "one" || O === "shuffle" ? O : "order",
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
}), h = re(he()), ae = {
  getSnapshot() {
    return ge(h);
  },
  update(e) {
    for (const t of Object.keys(e))
      h[t] !== e[t] && (h[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? h.currentTime, i = e.duration ?? h.duration, r = Q(t), o = Q(i);
      if (h.formattedCurrent !== r && (h.formattedCurrent = r), h.formattedDuration !== o && (h.formattedDuration = o), i > 0) {
        const n = Math.round(Math.min(100, Math.max(0, t / i * 100)) * 10) / 10;
        Math.abs(h.progressPercent - n) >= 0.2 && (h.progressPercent = n);
      } else
        h.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    h.currentTime = e, h.duration = t;
    const i = Q(e), r = Q(t);
    if (h.formattedCurrent !== i && (h.formattedCurrent = i), h.formattedDuration !== r && (h.formattedDuration = r), t > 0) {
      const o = Math.round(Math.min(100, Math.max(0, e / t * 100)) * 10) / 10;
      Math.abs(h.progressPercent - o) >= 0.2 && (h.progressPercent = o);
    } else
      h.progressPercent = 0;
  },
  togglePlay() {
    const e = window.LogicWeaverBiliRadioPlayer;
    if (e) {
      const t = typeof e.getState == "function" ? e.getState() : null;
      if (!t?.active && !t?.playing && typeof window.playBiliRadioQueue == "function") {
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
  toggleMode() {
    const e = h.mode || "order", i = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    h.mode = i;
    try {
      localStorage.setItem("bili_radio_mode", i);
    } catch {
    }
  },
  seek(e) {
    const t = window.LogicWeaverBiliRadioPlayer;
    if (typeof t?.seek == "function") {
      t.seek(e);
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
    const t = window.LogicWeaverBiliRadioPlayer;
    if (t && typeof t.playQueue == "function") {
      t.playQueue({
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = ae);
let u = null, F = !1, K = !1, U = "B站电台", p = [], v = -1, w = null, X, ne = {}, D = 0, x = "", G = null, se = [], j = /* @__PURE__ */ new Set(), z = null, q = 0, _ = Date.now(), J = 0;
function ie() {
  G !== null && (clearInterval(G), G = null);
}
function de(e) {
  const t = u;
  if (!t || !F || !w) return;
  const i = se.find((r) => !j.has(r) && /^https?:\/\//i.test(r));
  if (!i || j.size >= 3) {
    ie(), x = "音频连接中断，已尝试所有备用线路", T();
    return;
  }
  j.add(i), z = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, x = "网络波动，正在切换备用线路…", T(), t.src = i, t.load(), z.paused || t.play().catch(() => {
  });
}
function me() {
  ie(), _ = Date.now(), q = u?.currentTime || 0, J = u?.buffered.length ? u.buffered.end(u.buffered.length - 1) : 0, G = setInterval(() => {
    const e = u;
    if (!e || !F || e.paused || e.ended) {
      _ = Date.now();
      return;
    }
    const t = e.currentTime, i = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== q || i > J) {
      _ = Date.now(), q = t, J = i, x === "网络波动，正在切换备用线路…" && (x = "", T());
      return;
    }
    Date.now() - _ >= 8e3 && e.readyState < 3 && de();
  }, 1e3);
}
function pe() {
  u && (_ = Date.now(), q = u.currentTime, x === "网络波动，正在切换备用线路…" && (x = "")), T();
}
function ve() {
  const e = u;
  if (e && z) {
    const t = z;
    if (z = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  T();
}
function be() {
  F && u?.error && de(`音频解码或网络错误 [代码: ${u.error.code}]`);
}
function R() {
  return u || (u = new Audio(), u.id = "bili-radio-audio", u.preload = "auto", u.addEventListener("ended", we), u.addEventListener("timeupdate", pe), u.addEventListener("play", T), u.addEventListener("pause", T), u.addEventListener("loadedmetadata", ve), u.addEventListener("error", be), u);
}
function we() {
  const e = h.mode || "order";
  if (e === "one")
    u && (u.currentTime = 0, u.play().catch(() => {
    }), T());
  else if (e === "shuffle")
    if (p.length <= 1)
      C(0);
    else {
      let t = Math.floor(Math.random() * p.length);
      t === v && p.length > 1 && (t = (v + 1) % p.length), C(t);
    }
  else
    C(v + 1);
}
function T() {
  const e = u, t = !!(e && !e.paused && !e.ended && F), i = e?.duration && Number.isFinite(e.duration) ? e.duration : w?.duration || 0, r = w?.cues?.find((n) => (e?.currentTime || 0) >= n.from && (e?.currentTime || 0) < n.to), o = x || r?.content || (t ? "♪ 伴奏播放中…" : w ? `已暂停 · 《${w.title}》` : "点击磁带继续播放");
  ae.update({
    active: F,
    loading: K,
    playing: t,
    title: w?.title || "B站电台",
    coverUrl: w?.cover || "",
    seriesName: U,
    trackIndex: v >= 0 ? v + 1 : 1,
    totalTracks: p.length || 1,
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: o
  }), F && w && ue.syncFromBiliRadio({
    playing: t,
    title: w.title || "B站电台",
    artist: w.upper || w.author || U || "哔哩哔哩电台",
    coverUrl: w.cover || "",
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: o,
    seriesName: U
  });
}
async function ye(e) {
  if (e.streamUrl || e.url) return e;
  const t = await l.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const i = await l.fetchAudioStream(e.bvid, t.cid);
  if (!i.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...e,
    title: t.title || e.title,
    cover: String(t.pic || e.cover || "").replace(/^http:/, "https:"),
    upper: t.owner?.name || e.upper || e.author || "Bilibili",
    duration: Number(t.duration || e.duration || 0),
    cid: t.cid,
    streamUrl: i.sources[0],
    streamUrls: i.sources
  };
}
async function C(e) {
  const t = ne;
  if (!p.length || t.isCurrent?.() === !1) return;
  const i = ++D;
  v = (e % p.length + p.length) % p.length, K = !0, F = !0, x = "", ie(), z = null, R().pause(), T();
  try {
    const r = X ? await X(p[v]) : await ye(p[v]);
    if (i !== D || t.isCurrent?.() === !1) return;
    w = r;
    const o = r.streamUrls?.length ? r.streamUrls : r.streamUrl || r.url ? [r.streamUrl || r.url] : [], n = o[0];
    if (!n) throw new Error("没有取得视频播放地址");
    se = o, j = /* @__PURE__ */ new Set([n]), R().src = n, me(), t.onReady?.(R()), t.autoplay !== !1 && R().play().catch((d) => console.warn("[BiliRadio] 播放失败", d)), r.bvid && !r.cues?.length && l.fetchVideoSubtitleDetails(r.bvid, r.cid).then((d) => {
      i === D && d.ok && w && (w.cues = d.cues);
    }).catch(() => {
    });
  } catch (r) {
    if (i !== D || t.isCurrent?.() === !1) return;
    F = !1, console.warn("[BiliRadio] 解析音轨失败", r), x = r instanceof Error ? r.message : "播放失败";
  } finally {
    i === D && (K = !1, t.isCurrent?.() === !1 && (F = !1), T());
  }
}
const le = {
  playQueue(e) {
    U = e.name || "B站电台", p = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], X = e.resolveTrack, ne = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, C(e.startIndex || 0);
  },
  playAt(e) {
    p.length && C(e);
  },
  next() {
    if ((h.mode || "order") === "shuffle" && p.length > 1) {
      let t = Math.floor(Math.random() * p.length);
      t === v && (t = (v + 1) % p.length), C(t);
    } else
      C(v + 1);
  },
  prev() {
    if ((h.mode || "order") === "shuffle" && p.length > 1) {
      let t = Math.floor(Math.random() * p.length);
      t === v && (t = ((v - 1) % p.length + p.length) % p.length), C(t);
    } else
      C(v - 1);
  },
  toggle() {
    const e = R();
    if (!F && !e.src) {
      p.length > 0 && C(v >= 0 ? v : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), T();
  },
  seek(e) {
    const t = R();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, T());
  },
  getAudioElement() {
    return u;
  },
  getState() {
    return {
      active: F,
      loading: K,
      name: U,
      items: p,
      index: v,
      track: w,
      currentTime: u?.currentTime || 0,
      duration: u?.duration || 0,
      playing: !!(u && !u.paused && !u.ended && F)
    };
  },
  syncTape: T
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = le);
const N = "biliRadioSeriesV1", W = "lw_backup_bili_radio_series";
let V = 0, Y = !1;
function B(e) {
  return e instanceof Error ? e.message : "读取电台失败";
}
function L(e) {
  return {
    bvid: String(e?.bvid || ""),
    title: String(e?.title || "未命名视频"),
    cover: String(e?.cover || "").replace(/^http:/, "https:"),
    author: String(e?.author || e?.upper?.name || e?.upper || ""),
    duration: Number(e?.duration || 0)
  };
}
async function ce(e) {
  return typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get(e) : {};
}
async function ee() {
  const e = await ce([N, W]);
  for (const t of [N, W])
    if (e[t] !== void 0) {
      if (!Array.isArray(e[t])) throw new Error("电台存储格式无效，未覆盖数据");
      return e[t];
    }
  for (const t of [N, W]) {
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
  return [];
}
function te(e) {
  return e.map((t) => {
    if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("电台系列格式无效，未覆盖数据");
    const i = t, r = i.items == null ? [] : Array.isArray(i.items) ? i.items : typeof i.items == "object" ? Object.values(i.items) : null;
    if (!r) throw new Error("电台曲目格式无效，未覆盖数据");
    const o = r.map((n) => {
      if (!n || typeof n != "object" || Array.isArray(n)) throw new Error("电台曲目格式无效，未覆盖数据");
      const d = n;
      if (typeof d.bvid != "string" || !d.bvid.trim()) throw new Error("电台曲目缺少视频 ID，未覆盖数据");
      const g = L(d);
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
async function P(e) {
  if (!e.length) {
    const r = (await ce([N]))[N];
    if (Array.isArray(r) && r.length) throw new Error("空列表不能覆盖现有电台系列，未保存");
  }
  const t = JSON.stringify(e);
  typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [N]: e, [W]: e }), localStorage.setItem(N, t), localStorage.setItem(W, t);
}
function H(e = 0, t = !1, i) {
  const r = a.radioQueue.map((n) => ({ ...n, upper: n.author }));
  if (!r.length) return;
  if (t) {
    for (let n = r.length - 1; n > 0; n--) {
      const d = Math.floor(Math.random() * (n + 1));
      [r[n], r[d]] = [r[d], r[n]];
    }
    e = 0;
  }
  const o = Math.max(0, Math.min(r.length - 1, Number(e) || 0));
  le.playQueue({
    name: i || (t ? "B站电台 · 随机" : "B站电台"),
    items: r,
    startIndex: o
  });
}
typeof window < "u" && (window.playBiliRadioQueue = H);
const y = {
  async init() {
    if (!Y) {
      Y = !0;
      try {
        a.radioSeries = te(await ee());
      } catch (e) {
        Y = !1, console.warn("[BiliRadio] 读取系列失败", e);
      }
    }
    await this.refresh();
  },
  /** CLI repair is storage-only: no login, seed injection or inferred remote folder. */
  async repairStoredSeries() {
    const e = te(await ee());
    return e.length && await P(e), a.radioSeries = e, {
      ok: !0,
      repairedCount: e.length,
      emptySeries: e.filter((t) => !t.items.length).map((t) => ({ id: t.id, name: t.name })),
      message: "仅整理已存曲目结构和数量；空系列请在电台选择收藏夹、添加队列后重新保存。",
      series: e.map((t) => ({ id: t.id, name: t.name, count: t.count, sampleItem: t.items[0]?.title }))
    };
  },
  async refresh() {
    const e = ++V;
    a.radioLoading = !0, a.radioError = "";
    try {
      const t = await l.getUserNav();
      if (!t.isLogin) throw new Error("请先登录 B站");
      const i = await l.getCreatedFolders(t.mid);
      if (e !== V) return;
      a.radioFolders = i.map((o) => ({
        id: Number(o.id),
        title: o.title || "收藏夹",
        count: Number(o.media_count || 0)
      }));
      const r = a.radioFolders[0];
      r ? await this.selectFolder(r.id) : (a.radioActiveFolderId = 0, a.radioVideos = []), this.autoHealEmptySeries();
    } catch (t) {
      e === V && (a.radioError = B(t));
    } finally {
      e === V && (a.radioLoading = !1);
    }
  },
  async autoHealEmptySeries() {
    let e = !1;
    for (const t of a.radioSeries)
      if (t.count === 0 || !t.items.length) {
        const i = a.radioFolders.find(
          (r) => r.title.trim().toLowerCase() === t.name.trim().toLowerCase()
        );
        if (i)
          try {
            const o = ((await l.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => L({ ...n, author: n.upper?.name }));
            o.length && (t.items = o, t.count = o.length, e = !0);
          } catch {
          }
      }
    if (e)
      try {
        await P(a.radioSeries);
      } catch (t) {
        a.radioError = `系列已补全，但保存未确认：${B(t)}`;
      }
  },
  async selectFolder(e) {
    const t = Number(e);
    if (!a.radioFolders.some((r) => Number(r.id) === t) || t === a.radioActiveFolderId && a.radioVideos.length > 0)
      return;
    const i = ++V;
    a.radioActiveFolderId = t, a.radioLoading = !0, a.radioError = "";
    try {
      const r = /* @__PURE__ */ new Map(), o = 4;
      for (let n = 1; n <= o; n++) {
        const d = await l.getFolderVideos(t, n, 40);
        if (i !== V) return;
        for (const s of d.medias || [])
          s.bvid && r.set(s.bvid, L({ ...s, author: s.upper?.name }));
        const g = a.radioFolders.find((s) => Number(s.id) === t)?.count || 0;
        if (!d.medias?.length || r.size >= Math.max(d.total, g)) break;
      }
      a.radioVideos = [...r.values()];
    } catch (r) {
      i === V && (a.radioError = B(r));
    } finally {
      i === V && (a.radioLoading = !1);
    }
  },
  add(e) {
    !e.bvid || a.radioQueue.some((t) => t.bvid === e.bvid) || a.radioQueue.push(L(e));
  },
  remove(e) {
    Number.isInteger(e) && e >= 0 && e < a.radioQueue.length && a.radioQueue.splice(e, 1);
  },
  clear() {
    a.radioQueue = [];
  },
  play(e = !1, t = 0) {
    H(t, e);
  },
  playAt(e) {
    if (!a.radioQueue.length) return;
    const t = Math.max(0, Math.min(a.radioQueue.length - 1, Number(e) || 0));
    H(t, !1);
  },
  async loadSeries(e) {
    const t = a.radioSeries.find((i) => i.id === e);
    if (t) {
      if (!t.items.length) {
        const i = a.radioFolders.find(
          (r) => r.title.trim().toLowerCase() === t.name.trim().toLowerCase()
        );
        if (i) {
          M.fetch("哔哩哔哩电台", `正在从「${i.title}」收藏夹自动补齐系列曲目…`);
          try {
            const o = ((await l.getFolderVideos(i.id, 1, 40)).medias || []).map((n) => L({ ...n, author: n.upper?.name }));
            o.length && (t.items = o, t.count = o.length, await P(a.radioSeries));
          } catch (r) {
            a.radioError = `读取或保存补全系列失败：${B(r)}`, M.fetch("哔哩哔哩电台", a.radioError);
          }
        }
      }
      if (!t.items.length) {
        M.fetch("哔哩哔哩电台", `系列「${t.name}」暂无可播放曲目，请从左侧添加后保存`);
        return;
      }
      a.radioQueue = t.items.map(L), a.radioSeriesName = t.name, M.fetch("哔哩哔哩电台", `已载入系列「${t.name}」（共 ${t.count} 首）`);
    }
  },
  async playSeries(e, t = 0) {
    await this.loadSeries(e);
    const i = a.radioSeries.find((r) => r.id === e);
    i?.items.length && H(t, !1, i.name);
  },
  async deleteSeries(e) {
    const i = a.radioSeries.find((o) => o.id === e)?.name || "系列", r = a.radioSeries.filter((o) => o.id !== e);
    try {
      await P(r), a.radioSeries = r, M.fetch("哔哩哔哩电台", `已删除电台系列「${i}」`);
    } catch (o) {
      a.radioError = `删除系列失败：${B(o)}`, M.fetch("哔哩哔哩电台", `删除系列失败：${B(o)}`);
    }
  },
  async renameSeries(e, t) {
    const i = t.trim();
    if (!i) return;
    const r = a.radioSeries.find((d) => d.id === e);
    if (!r) return;
    const o = r.name, n = a.radioSeries.map((d) => d.id === e ? { ...d, name: i } : d);
    try {
      await P(n), a.radioSeries = n, a.radioSeriesName === o && (a.radioSeriesName = i), M.fetch("哔哩哔哩电台", `✓ 系列已重命名为「${i}」`);
    } catch (d) {
      a.radioError = `重命名系列失败：${B(d)}`, M.fetch("哔哩哔哩电台", `重命名系列失败：${B(d)}`);
    }
  },
  async save(e) {
    if (!a.radioQueue.length) {
      M.fetch("哔哩哔哩电台", "播放队列为空，请先从左侧添加视频");
      return;
    }
    const t = (e || a.radioSeriesName || "").trim();
    if (!t) {
      a.radioError = "保存失败：系列名称不能为空，请输入系列名称", M.fetch("哔哩哔哩电台", "保存失败：请先输入系列名称后再保存");
      return;
    }
    const i = a.radioQueue.map((n) => ({ ...n })), r = a.radioSeries.findIndex((n) => n.name === t);
    let o = [...a.radioSeries];
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
      await P(o), a.radioSeries = o, a.radioSeriesName = "", M.fetch(
        "哔哩哔哩电台",
        r >= 0 ? `✓ 已更新系列「${t}」（共 ${i.length} 首）` : `★ 已保存系列「${t}」（共 ${i.length} 首）`
      );
    } catch (n) {
      const d = B(n);
      a.radioError = `保存系列失败：${d}`, M.fetch("哔哩哔哩电台", `保存系列失败：${d}`);
    }
  }
};
typeof window < "u" && window.addEventListener("logicweaver:sync-restored", () => {
  (async () => {
    try {
      a.radioSeries = te(await ee());
    } catch (e) {
      console.warn("[BiliRadio] 云同步恢复系列重载失败", e);
    }
  })();
});
const m = re({
  isOpen: !1,
  loading: !1,
  error: "",
  title: "",
  bvid: "",
  cid: void 0,
  fullText: "",
  charCount: 0,
  copied: !1
}), Se = {
  get state() {
    return m;
  },
  async open(e) {
    if (e.bvid) {
      m.isOpen = !0, m.loading = !0, m.error = "", m.fullText = "", m.title = e.title || e.bvid, m.bvid = e.bvid, m.cid = e.cid, m.copied = !1;
      try {
        const t = await l.fetchVideoSubtitleDetails(e.bvid, e.cid);
        if (!t.ok || !t.cues || !t.cues.length) {
          m.error = t.reason || "该视频暂无可用字幕轨道";
          return;
        }
        const r = t.cues.map((o) => o.content.trim()).filter(Boolean).join(`
`);
        m.fullText = r, m.charCount = r.length;
      } catch (t) {
        m.error = t?.message || "提取字幕失败，请检查网络";
      } finally {
        m.loading = !1;
      }
    }
  },
  close() {
    m.isOpen = !1;
  },
  async copy() {
    if (m.fullText)
      try {
        await navigator.clipboard.writeText(m.fullText), m.copied = !0, setTimeout(() => {
          m.copied = !1;
        }, 2e3);
      } catch {
      }
  },
  downloadTxt() {
    if (!m.fullText) return;
    const e = new Blob([m.fullText], { type: "text/plain;charset=utf-8" }), t = URL.createObjectURL(e), i = document.createElement("a");
    i.href = t, i.download = `${(m.title || m.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`, document.body.appendChild(i), i.click(), i.remove(), URL.revokeObjectURL(t);
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
}), Z = /* @__PURE__ */ new Set();
let S = [], b = { id: "root", type: "folder", children: [] }, E = /* @__PURE__ */ new Set();
function c(e, t) {
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
function Te(e) {
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
function ke(e) {
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
async function I(e, t = 1, i = "fav_time", r = "") {
  const o = a.organizer;
  o.loading = !0, o.error = "";
  const d = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  }[i] || "mtime";
  try {
    const g = await l.getFolderVideos(e, t, 24, d, r);
    o.videos = g.medias.map(ke), o.page = t, o.totalItems = g.total, o.totalPages = Math.max(1, Math.ceil(g.total / 24)), o.sort = i, o.query = r;
    const s = S.find((f) => String(f.id || f.fid) === String(e));
    o.folderTitle = s?.title || g.info?.title || "收藏夹", o.folderSubtitle = `共 ${g.total} 个内容`;
  } catch (g) {
    o.error = g.message || "加载视频列表失败", o.folderSubtitle = "加载失败，请重试";
  } finally {
    o.loading = !1;
  }
}
async function A(e = !1) {
  const t = a.organizer;
  t.loading = !0, t.error = "";
  try {
    const i = await l.getUserNav();
    if (!i.isLogin) {
      t.error = "未登录 B站", t.folderSubtitle = "未登录 B站，请先登录", t.loading = !1;
      return;
    }
    const [r, o] = await Promise.all([
      l.getCreatedFolders(i.mid),
      l.getCollectedFolders(1, 50, i.mid).catch(() => ({ count: 0, list: [] }))
    ]), n = o.list || [], d = l.getOtherFolders();
    S = [...r, ...n, ...d];
    const g = await l.treeManager.loadTree();
    (l.treeManager.syncTreeWithFolders(g, r) || e) && await l.treeManager.saveTree(g), b = g, E = await l.treeManager.loadCollapsedGroups(), a.collapsedGroups = Array.from(E);
    let f = a.activeFolderId;
    if (!f || !S.some((k) => String(k.id || k.fid) === String(f))) {
      const k = r.find(($) => /默认/.test($.title)) || r[0] || S[0];
      f = k ? String(k.id || k.fid) : "", a.activeFolderId = f;
    }
    t.folders = l.treeManager.flattenTree(
      b,
      S,
      E,
      f
    ), f ? await I(f, 1, t.sort, t.query) : t.folderSubtitle = "暂无可用收藏夹";
  } catch (i) {
    t.error = i.message || "读取 B站 收藏夹失败", t.folderSubtitle = "读取失败，请检查网络或重试";
  } finally {
    t.loading = !1;
  }
}
const Ie = {
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
    a.mounted = e, e && A();
  },
  loadOrganizer: A,
  loadFolderVideos: I,
  switchTab(e) {
    a.currentTab = e, this.dispatch("switch-tab", e);
  },
  async selectFolder(e) {
    const t = String(e), i = a.organizer;
    if (i.isTargetPickMode) {
      const r = S.find((n) => String(n.id || n.fid) === t);
      if (!r || r.isCollected || r.isOther) {
        c("无法移动到该分类，请选择您自建的有效收藏夹", { isError: !0 });
        return;
      }
      if (t === a.activeFolderId) {
        c("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: !0 });
        return;
      }
      i.isTargetPickMode = !1;
      const o = i.movingVideoId;
      if (i.movingVideoId = "", o) {
        c(`正在移动视频至「${r.title}」…`);
        const n = await l.moveVideo(a.activeFolderId, t, o);
        n.ok ? (c(`已移动至「${r.title}」`), await I(a.activeFolderId, i.page, i.sort, i.query)) : c(`移动失败：${n.reason || "未知错误"}`, { isError: !0 });
      } else if (i.batchMode) {
        const n = i.videos.filter((s) => s.selected);
        if (!n.length) return;
        const d = n.map((s) => s.aid || s.id);
        c(`正在批量移动 ${d.length} 个视频至「${r.title}」…`);
        const g = await l.moveVideo(a.activeFolderId, t, d);
        g.ok ? (c(`已将 ${d.length} 个视频移动至「${r.title}」`), i.videos.forEach((s) => s.selected = !1), i.selectedCount = 0, await I(a.activeFolderId, 1, i.sort, i.query)) : c(`批量移动失败：${g.reason || "未知错误"}`, { isError: !0 });
      }
      return;
    }
    a.activeFolderId = t, i.folders.forEach((r) => {
      r.selected = r.id === t;
    }), i.mode = "organizer", await I(t, 1, i.sort, "");
  },
  async toggleFolderGroup(e) {
    const t = String(e);
    E.has(t) ? E.delete(t) : E.add(t), a.collapsedGroups = Array.from(E), await l.treeManager.saveCollapsedGroups(E), a.organizer.folders = l.treeManager.flattenTree(
      b,
      S,
      E,
      a.activeFolderId
    );
  },
  async moveFolderNode(e, t, i) {
    l.treeManager.moveNode(b, e, t, i) && (await l.treeManager.saveTree(b), a.organizer.folders = l.treeManager.flattenTree(
      b,
      S,
      E,
      a.activeFolderId
    ), c("已更新收藏夹排序"));
  },
  async openCreateDialog(e) {
    const i = globalThis.LogicWeaverBiliOrganizerDialogs;
    if (i?.openCreate)
      i.openCreate(e, async ({ name: r, privacy: o }) => {
        if (i.updateCreate({ status: e === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: !1 }), e === "bili") {
          const n = await l.createRemoteFolder(r, Number(o || 0));
          if (!n.ok) {
            i.updateCreate({ status: n.reason || "创建失败", error: !0 });
            return;
          }
          i.closeCreate(), await A(!0), c(`已成功创建 B站收藏夹「${r}」`);
        } else {
          const n = l.treeManager.createGroupNode(r);
          b.children = b.children || [], b.children.push(n), await l.treeManager.saveTree(b), i.closeCreate(), a.organizer.folders = l.treeManager.flattenTree(
            b,
            S,
            E,
            a.activeFolderId
          ), c(`已建立本地分组「${r}」`);
        }
      });
    else {
      const r = (await oe.prompt({
        title: e === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: e === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!r) return;
      if (e === "bili") {
        const o = await l.createRemoteFolder(r);
        o.ok ? (await A(!0), c(`已成功创建「${r}」`)) : c(`创建失败：${o.reason}`, { isError: !0 });
      } else {
        const o = l.treeManager.createGroupNode(r);
        b.children = b.children || [], b.children.push(o), await l.treeManager.saveTree(b), a.organizer.folders = l.treeManager.flattenTree(
          b,
          S,
          E,
          a.activeFolderId
        ), c(`已建立本地分组「${r}」`);
      }
    }
  },
  async handleVideoAction(e, t) {
    const i = a.organizer;
    let r = null;
    if (e && typeof e == "object" && (e.bvid || e.aid || e.id))
      r = e;
    else {
      const s = String(e || "");
      r = i.videos.find((f) => String(f.id) === s || String(f.bvid) === s || String(f.aid) === s) || i.specialVideos.find((f) => String(f.id) === s || String(f.bvid) === s || String(f.aid) === s) || i.cachedVideos.find((f) => String(f.id) === s || String(f.bvid) === s || String(f.aid) === s), !r && (s.startsWith("BV") || /^\d+$/.test(s)) && (r = {
        id: s,
        bvid: s.startsWith("BV") ? s : "",
        aid: /^\d+$/.test(s) ? s : "",
        title: s,
        url: `https://www.bilibili.com/video/${s}`
      });
    }
    if (!r) return;
    const o = r.bvid || (String(r.id || "").startsWith("BV") ? r.id : ""), n = r.aid || r.id, d = Te(r), g = d || r.url;
    if (t === "play")
      o || r.aid ? fe.openVideo({
        bvid: o,
        aid: String(n || ""),
        title: r.title || o,
        author: r.author ? `${r.author}` : "",
        url: g,
        cover: r.cover
      }) : g && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: g, active: !0 }) : window.open(g, "_blank"));
    else if (t === "open")
      typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: d, active: !0 }) : window.open(d, "_blank");
    else if (t === "copy-link")
      try {
        await navigator.clipboard.writeText(d), c(`已复制视频链接: ${d}`);
      } catch {
        c("复制链接失败", { isError: !0 });
      }
    else if (t === "move")
      i.isTargetPickMode && i.movingVideoId === r.aid ? (i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹")) : (i.isTargetPickMode = !0, i.movingVideoId = r.aid, c(`请点击左侧收藏夹，将《${r.title}》移动过去（按 Esc 取消）`, {
        title: "选择目标收藏夹",
        subtitle: `点击左侧目标以移动《${r.title}》`
      }));
    else if (t === "delete") {
      const s = r.aid || r.id, f = a.activeFolderId, k = await l.deleteVideo(f, s);
      k.ok ? (c(`已取消收藏《${r.title}》`, {
        title: "已取消收藏",
        actionLabel: "撤销还原",
        onClick: async () => {
          c(`正在还原《${r.title}》…`);
          const $ = await l.addVideoToFavorite(f, s);
          $.ok ? (c(`已还原《${r.title}》`), await I(f, i.page, i.sort, i.query)) : c(`还原失败：${$.reason || "未知错误"}`, { isError: !0 });
        }
      }), await I(f, i.page, i.sort, i.query)) : c(`取消收藏失败：${k.reason || "未知错误"}`, { isError: !0 });
    } else if (t === "subtitle") {
      const s = o || (String(r.id || "").startsWith("BV") ? r.id : "");
      s || r.aid ? Se.open({
        bvid: s || String(r.aid || r.id || ""),
        cid: r.cid,
        title: r.title || s
      }) : c("该视频暂无字幕信息", { isError: !0 });
    } else if (t === "cache") {
      const { cacheBiliVideo: s } = await import("./cache.service-BvLQVsZ4.js");
      await s({ bvid: r.bvid, aid: r.aid, title: r.title, cover: r.cover });
    } else if (t === "collect-inbox") {
      const s = S.find(($) => /收集箱|默认|Inbox/i.test($.title)) || S.find(($) => !$.isCollected && !$.isOther) || S[0];
      if (!s) {
        c("未找到可用的收藏夹/收集箱", { isError: !0 });
        return;
      }
      const f = r.aid || r.id;
      c(`正在将《${r.title}》添加到「${s.title}」…`);
      const k = await l.addVideoToFavorite(s.id, f);
      k.ok ? c(`✓ 已成功添加到「${s.title}」`) : c(`添加失败：${k.reason || "未知错误"}`, { isError: !0 });
    }
  },
  onAction(e) {
    return Z.add(e), () => {
      Z.delete(e);
    };
  },
  dispatch(e, t) {
    const i = a.organizer;
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
        A(!0);
        break;
      case "subscription-toggle-desc-panel":
        i.showFullDescInRightPanel = !i.showFullDescInRightPanel;
        break;
      case "organizer-open":
        i.mode = "organizer", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, i.folders.length || A();
        break;
      case "open-radio":
        i.mode = "radio", i.isTargetPickMode = !1, i.movingVideoId = "", i.batchMode = !1, y.init();
        break;
      case "radio-refresh":
        y.refresh();
        break;
      case "radio-select-folder":
        y.selectFolder(Number(t));
        break;
      case "radio-add":
        y.add(t);
        break;
      case "radio-remove":
        y.remove(Number(t?.index));
        break;
      case "radio-clear":
        y.clear();
        break;
      case "radio-save":
        y.save(String(t?.name || ""));
        break;
      case "radio-load-series":
        y.loadSeries(String(t?.id ?? t));
        break;
      case "radio-play-series":
        typeof t == "object" && t !== null ? y.playSeries(String(t.id || ""), Number(t.startIndex || 0)) : y.playSeries(String(t));
        break;
      case "radio-delete-series":
        y.deleteSeries(String(t));
        break;
      case "radio-rename-series": {
        const r = t;
        r?.id && r?.name && y.renameSeries(r.id, r.name);
        break;
      }
      case "radio-play-index":
        y.playAt(Number(t));
        break;
      case "radio-play":
        y.play(!1, typeof t == "number" ? t : 0);
        break;
      case "radio-shuffle":
        y.play(!0);
        break;
      case "organizer-sort":
        ["fav_time", "view", "pubtime"].includes(t) && I(a.activeFolderId, 1, t, i.query);
        break;
      case "organizer-search":
        I(a.activeFolderId, 1, i.sort, String(t || "").trim());
        break;
      case "organizer-page": {
        const r = Number(t);
        Number.isFinite(r) && r >= 1 && I(a.activeFolderId, r, i.sort, i.query);
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
          c("请先选择要移动的视频", { isError: !0 });
          return;
        }
        i.isTargetPickMode = !0, c(`请点击左侧目标收藏夹，将 ${r} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const r = i.videos.filter((o) => o.selected);
        if (!r.length) {
          c("请先选择要取消收藏的视频", { isError: !0 });
          return;
        }
        (async () => {
          if (await oe.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${r.length} 个视频吗？`,
            danger: !0
          })) {
            const n = a.activeFolderId, d = r.map((s) => s.aid || s.id);
            c(`正在批量移除 ${d.length} 个视频…`);
            let g = 0;
            for (const s of d)
              (await l.deleteVideo(n, s)).ok && g++;
            c(`已移除 ${g}/${d.length} 个视频`), i.batchMode = !1, i.selectedCount = 0, await I(n, i.page, i.sort, i.query);
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
        i.isTargetPickMode = !1, i.movingVideoId = "", c("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const r = globalThis;
        typeof r.openBiliUpGroupManagerDialog == "function" ? r.openBiliUpGroupManagerDialog() : r.LogicWeaverBiliUpGroupManager?.open && r.LogicWeaverBiliUpGroupManager.open();
        break;
      }
    }
    for (const r of Z)
      try {
        r(e, t);
      } catch (o) {
        console.error("[BiliFavorites] Action error:", o);
      }
  }
};
export {
  h as a,
  Ie as b,
  a as c,
  y as d,
  le as e,
  m as f,
  ae as r,
  Se as s
};
