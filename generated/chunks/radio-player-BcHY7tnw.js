import { b as A } from "./github.service-mYu1TuZI.js";
import { X as f, Y as w, Z as V, _ as q, h as $ } from "./search.service-DiFFcmm2.js";
import { a as j, r as z } from "./vendor-vue-BbmU9NUg.js";
function S(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const M = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, X = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: M === "order" || M === "one" || M === "shuffle" ? M : "order",
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
}), o = z(X()), F = {
  getSnapshot() {
    return j(o);
  },
  update(e) {
    for (const t of Object.keys(e))
      o[t] !== e[t] && (o[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? o.currentTime, i = e.duration ?? o.duration, n = S(t), c = S(i);
      if (o.formattedCurrent !== n && (o.formattedCurrent = n), o.formattedDuration !== c && (o.formattedDuration = c), i > 0) {
        const p = Math.round(Math.min(100, Math.max(0, t / i * 100)) * 10) / 10;
        Math.abs(o.progressPercent - p) >= 0.2 && (o.progressPercent = p);
      } else
        o.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    o.currentTime = e, o.duration = t;
    const i = S(e), n = S(t);
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
    f() && w("bili", "set-mode", { mode: i });
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = F);
let r = null, u = !1, x = !1, h = "B站电台", a = [], d = -1, l = null, g, O = {}, B = 0, v = "", P = null, Q = [], C = /* @__PURE__ */ new Set(), T = null, R = 0, E = Date.now(), k = 0;
function L() {
  P !== null && (clearInterval(P), P = null);
}
function _(e) {
  const t = r;
  if (!t || !u || !l) return;
  const i = Q.find((n) => !C.has(n) && /^https?:\/\//i.test(n));
  if (!i || C.size >= 3) {
    L(), v = "音频连接中断，已尝试所有备用线路", s();
    return;
  }
  C.add(i), T = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, v = "网络波动，正在切换备用线路…", s(), t.src = i, t.load(), T.paused || t.play().catch(() => {
  });
}
function Y() {
  L(), E = Date.now(), R = r?.currentTime || 0, k = r?.buffered.length ? r.buffered.end(r.buffered.length - 1) : 0, P = setInterval(() => {
    const e = r;
    if (!e || !u || e.paused || e.ended) {
      E = Date.now();
      return;
    }
    const t = e.currentTime, i = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== R || i > k) {
      E = Date.now(), R = t, k = i, v === "网络波动，正在切换备用线路…" && (v = "", s());
      return;
    }
    Date.now() - E >= 8e3 && e.readyState < 3 && _();
  }, 1e3);
}
function Z() {
  r && (E = Date.now(), R = r.currentTime, v === "网络波动，正在切换备用线路…" && (v = "")), s();
}
function G() {
  const e = r;
  if (e && T) {
    const t = T;
    if (T = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  s();
}
function H() {
  u && r?.error && _(`音频解码或网络错误 [代码: ${r.error.code}]`);
}
function b() {
  return r || (r = new Audio(), r.id = "bili-radio-audio", r.preload = "auto", r.addEventListener("ended", J), r.addEventListener("timeupdate", Z), r.addEventListener("play", s), r.addEventListener("pause", s), r.addEventListener("loadedmetadata", G), r.addEventListener("error", H), r);
}
function J() {
  const e = o.mode || "order";
  if (e === "one")
    r && (r.currentTime = 0, r.play().catch(() => {
    }), s());
  else if (e === "shuffle")
    if (a.length <= 1)
      m(0);
    else {
      let t = Math.floor(Math.random() * a.length);
      t === d && a.length > 1 && (t = (d + 1) % a.length), m(t);
    }
  else
    m(d + 1);
}
let D = 0, I = 0, U = !1;
function N(e) {
  u = !!e.active, x = !!e.loading, h = e.name || "B站电台", a = Array.isArray(e.items) ? e.items : [], d = typeof e.index == "number" ? e.index : -1, l = e.track || null, D = Number(e.currentTime) || 0, I = Number(e.duration) || 0, U = !!e.playing, v = e.error || "", s();
}
f() && (V((e, t) => {
  e === "bili" && N(t);
}), q().then((e) => {
  e?.bili && N(e.bili);
}));
function s() {
  const e = f(), t = e ? null : r, i = e ? U : !!(t && !t.paused && !t.ended && u), n = e ? D : t?.currentTime || 0, c = e ? I || l?.duration || 0 : t?.duration && Number.isFinite(t.duration) ? t.duration : l?.duration || 0, p = l?.cues?.find((W) => n >= W.from && n < W.to), y = v || p?.content || (i ? "♪ 伴奏播放中…" : l ? `已暂停 · 《${l.title}》` : "点击磁带继续播放");
  F.update({
    active: u,
    loading: x,
    playing: i,
    title: l?.title || "B站电台",
    coverUrl: l?.cover || "",
    seriesName: h,
    trackIndex: d >= 0 ? d + 1 : 1,
    totalTracks: a.length || 1,
    currentTime: n,
    duration: c,
    lyric: y
  }), u && l && $.syncFromBiliRadio({
    playing: i,
    title: l.title || "B站电台",
    artist: l.upper || l.author || h || "哔哩哔哩电台",
    coverUrl: l.cover || "",
    currentTime: n,
    duration: c,
    lyric: y,
    seriesName: h
  });
}
async function K(e) {
  if (e.streamUrl || e.url) return e;
  const t = await A.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const i = await A.fetchAudioStream(e.bvid, t.cid);
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
async function m(e) {
  const t = O;
  if (!a.length || t.isCurrent?.() === !1) return;
  const i = ++B;
  d = (e % a.length + a.length) % a.length, x = !0, u = !0, v = "", L(), T = null, b().pause(), s();
  try {
    const n = g ? await g(a[d]) : await K(a[d]);
    if (i !== B || t.isCurrent?.() === !1) return;
    l = n;
    const c = n.streamUrls?.length ? n.streamUrls : n.streamUrl || n.url ? [n.streamUrl || n.url] : [], p = c[0];
    if (!p) throw new Error("没有取得视频播放地址");
    Q = c, C = /* @__PURE__ */ new Set([p]), b().src = p, Y(), t.onReady?.(b()), t.autoplay !== !1 && b().play().catch((y) => console.warn("[BiliRadio] 播放失败", y)), n.bvid && !n.cues?.length && A.fetchVideoSubtitleDetails(n.bvid, n.cid).then((y) => {
      i === B && y.ok && l && (l.cues = y.cues);
    }).catch(() => {
    });
  } catch (n) {
    if (i !== B || t.isCurrent?.() === !1) return;
    u = !1, console.warn("[BiliRadio] 解析音轨失败", n), v = n instanceof Error ? n.message : "播放失败";
  } finally {
    i === B && (x = !1, t.isCurrent?.() === !1 && (u = !1), s());
  }
}
const ee = {
  playQueue(e) {
    if (h = e.name || "B站电台", a = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], g = e.resolveTrack, O = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, f() && !e.resolveTrack && !e.onReady) {
      w("bili", "play-queue", {
        name: h,
        items: a,
        startIndex: e.startIndex || 0,
        autoplay: e.autoplay !== !1,
        mode: o.mode || "order"
      });
      return;
    }
    m(e.startIndex || 0);
  },
  playAt(e) {
    if (a.length) {
      if (f() && !g) {
        w("bili", "play-at", { index: e });
        return;
      }
      m(e);
    }
  },
  next() {
    if (f() && !g) {
      w("bili", "next");
      return;
    }
    if ((o.mode || "order") === "shuffle" && a.length > 1) {
      let t = Math.floor(Math.random() * a.length);
      t === d && (t = (d + 1) % a.length), m(t);
    } else
      m(d + 1);
  },
  prev() {
    if (f() && !g) {
      w("bili", "prev");
      return;
    }
    if ((o.mode || "order") === "shuffle" && a.length > 1) {
      let t = Math.floor(Math.random() * a.length);
      t === d && (t = ((d - 1) % a.length + a.length) % a.length), m(t);
    } else
      m(d - 1);
  },
  toggle() {
    if (f() && !g) {
      w("bili", "toggle");
      return;
    }
    const e = b();
    if (!u && !e.src) {
      a.length > 0 && m(d >= 0 ? d : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), s();
  },
  seek(e) {
    if (f() && !g) {
      w("bili", "seek", { percent: e });
      return;
    }
    const t = b();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, s());
  },
  getAudioElement() {
    return r;
  },
  getState() {
    return f() && !g ? {
      active: u,
      loading: x,
      name: h,
      items: a,
      index: d,
      track: l,
      currentTime: D,
      duration: I || l?.duration || 0,
      playing: U
    } : {
      active: u,
      loading: x,
      name: h,
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
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = ee);
export {
  o as a,
  ee as b,
  F as r
};
