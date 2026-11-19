import { b as C } from "./github.service-DdJVB3Fj.js";
import { a as U, r as W } from "./vendor-vue-BbmU9NUg.js";
import { h as F } from "./search.service-B3Axreqn.js";
function T(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const x = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, N = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: x === "order" || x === "one" || x === "shuffle" ? x : "order",
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
}), o = W(N()), k = {
  getSnapshot() {
    return U(o);
  },
  update(e) {
    for (const t of Object.keys(e))
      o[t] !== e[t] && (o[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? o.currentTime, i = e.duration ?? o.duration, n = T(t), c = T(i);
      if (o.formattedCurrent !== n && (o.formattedCurrent = n), o.formattedDuration !== c && (o.formattedDuration = c), i > 0) {
        const m = Math.round(Math.min(100, Math.max(0, t / i * 100)) * 10) / 10;
        Math.abs(o.progressPercent - m) >= 0.2 && (o.progressPercent = m);
      } else
        o.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    o.currentTime = e, o.duration = t;
    const i = T(e), n = T(t);
    if (o.formattedCurrent !== i && (o.formattedCurrent = i), o.formattedDuration !== n && (o.formattedDuration = n), t > 0) {
      const c = Math.round(Math.min(100, Math.max(0, e / t * 100)) * 10) / 10;
      Math.abs(o.progressPercent - c) >= 0.2 && (o.progressPercent = c);
    } else
      o.progressPercent = 0;
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
    const e = o.mode || "order", i = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    o.mode = i;
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = k);
let r = null, u = !1, P = !1, w = "B站电台", a = [], d = -1, l = null, R, D = {}, v = 0, g = "", E = null, I = [], B = /* @__PURE__ */ new Set(), h = null, M = 0, y = Date.now(), S = 0;
function L() {
  E !== null && (clearInterval(E), E = null);
}
function A(e) {
  const t = r;
  if (!t || !u || !l) return;
  const i = I.find((n) => !B.has(n) && /^https?:\/\//i.test(n));
  if (!i || B.size >= 3) {
    L(), g = "音频连接中断，已尝试所有备用线路", s();
    return;
  }
  B.add(i), h = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, g = "网络波动，正在切换备用线路…", s(), t.src = i, t.load(), h.paused || t.play().catch(() => {
  });
}
function Q() {
  L(), y = Date.now(), M = r?.currentTime || 0, S = r?.buffered.length ? r.buffered.end(r.buffered.length - 1) : 0, E = setInterval(() => {
    const e = r;
    if (!e || !u || e.paused || e.ended) {
      y = Date.now();
      return;
    }
    const t = e.currentTime, i = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== M || i > S) {
      y = Date.now(), M = t, S = i, g === "网络波动，正在切换备用线路…" && (g = "", s());
      return;
    }
    Date.now() - y >= 8e3 && e.readyState < 3 && A();
  }, 1e3);
}
function _() {
  r && (y = Date.now(), M = r.currentTime, g === "网络波动，正在切换备用线路…" && (g = "")), s();
}
function V() {
  const e = r;
  if (e && h) {
    const t = h;
    if (h = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  s();
}
function $() {
  u && r?.error && A(`音频解码或网络错误 [代码: ${r.error.code}]`);
}
function p() {
  return r || (r = new Audio(), r.id = "bili-radio-audio", r.preload = "auto", r.addEventListener("ended", j), r.addEventListener("timeupdate", _), r.addEventListener("play", s), r.addEventListener("pause", s), r.addEventListener("loadedmetadata", V), r.addEventListener("error", $), r);
}
function j() {
  const e = o.mode || "order";
  if (e === "one")
    r && (r.currentTime = 0, r.play().catch(() => {
    }), s());
  else if (e === "shuffle")
    if (a.length <= 1)
      f(0);
    else {
      let t = Math.floor(Math.random() * a.length);
      t === d && a.length > 1 && (t = (d + 1) % a.length), f(t);
    }
  else
    f(d + 1);
}
function s() {
  const e = r, t = !!(e && !e.paused && !e.ended && u), i = e?.duration && Number.isFinite(e.duration) ? e.duration : l?.duration || 0, n = l?.cues?.find((m) => (e?.currentTime || 0) >= m.from && (e?.currentTime || 0) < m.to), c = g || n?.content || (t ? "♪ 伴奏播放中…" : l ? `已暂停 · 《${l.title}》` : "点击磁带继续播放");
  k.update({
    active: u,
    loading: P,
    playing: t,
    title: l?.title || "B站电台",
    coverUrl: l?.cover || "",
    seriesName: w,
    trackIndex: d >= 0 ? d + 1 : 1,
    totalTracks: a.length || 1,
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: c
  }), u && l && F.syncFromBiliRadio({
    playing: t,
    title: l.title || "B站电台",
    artist: l.upper || l.author || w || "哔哩哔哩电台",
    coverUrl: l.cover || "",
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: c,
    seriesName: w
  });
}
async function q(e) {
  if (e.streamUrl || e.url) return e;
  const t = await C.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const i = await C.fetchAudioStream(e.bvid, t.cid);
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
async function f(e) {
  const t = D;
  if (!a.length || t.isCurrent?.() === !1) return;
  const i = ++v;
  d = (e % a.length + a.length) % a.length, P = !0, u = !0, g = "", L(), h = null, p().pause(), s();
  try {
    const n = R ? await R(a[d]) : await q(a[d]);
    if (i !== v || t.isCurrent?.() === !1) return;
    l = n;
    const c = n.streamUrls?.length ? n.streamUrls : n.streamUrl || n.url ? [n.streamUrl || n.url] : [], m = c[0];
    if (!m) throw new Error("没有取得视频播放地址");
    I = c, B = /* @__PURE__ */ new Set([m]), p().src = m, Q(), t.onReady?.(p()), t.autoplay !== !1 && p().play().catch((b) => console.warn("[BiliRadio] 播放失败", b)), n.bvid && !n.cues?.length && C.fetchVideoSubtitleDetails(n.bvid, n.cid).then((b) => {
      i === v && b.ok && l && (l.cues = b.cues);
    }).catch(() => {
    });
  } catch (n) {
    if (i !== v || t.isCurrent?.() === !1) return;
    u = !1, console.warn("[BiliRadio] 解析音轨失败", n), g = n instanceof Error ? n.message : "播放失败";
  } finally {
    i === v && (P = !1, t.isCurrent?.() === !1 && (u = !1), s());
  }
}
const z = {
  playQueue(e) {
    w = e.name || "B站电台", a = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], R = e.resolveTrack, D = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, f(e.startIndex || 0);
  },
  playAt(e) {
    a.length && f(e);
  },
  next() {
    if ((o.mode || "order") === "shuffle" && a.length > 1) {
      let t = Math.floor(Math.random() * a.length);
      t === d && (t = (d + 1) % a.length), f(t);
    } else
      f(d + 1);
  },
  prev() {
    if ((o.mode || "order") === "shuffle" && a.length > 1) {
      let t = Math.floor(Math.random() * a.length);
      t === d && (t = ((d - 1) % a.length + a.length) % a.length), f(t);
    } else
      f(d - 1);
  },
  toggle() {
    const e = p();
    if (!u && !e.src) {
      a.length > 0 && f(d >= 0 ? d : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), s();
  },
  seek(e) {
    const t = p();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, s());
  },
  getAudioElement() {
    return r;
  },
  getState() {
    return {
      active: u,
      loading: P,
      name: w,
      items: a,
      index: d,
      track: l,
      currentTime: r?.currentTime || 0,
      duration: r?.duration || 0,
      playing: !!(r && !r.paused && !r.ended && u)
    };
  },
  syncTape: s
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = z);
export {
  o as a,
  z as b,
  k as r
};
