import { b as A } from "./bilibili.service-Brip_1AT.js";
import { c as m, s as w, b as V, f as q, h as $ } from "./store-DnPgWHLm.js";
import { a as j, r as z } from "./vendor-vue-_upDT3S_.js";
function M(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const S = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, G = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: S === "order" || S === "one" || S === "shuffle" ? S : "order",
  bvid: "",
  title: "B站电台",
  author: "",
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
}), a = z(G()), F = {
  getSnapshot() {
    return j(a);
  },
  update(e) {
    for (const t of Object.keys(e))
      a[t] !== e[t] && (a[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? a.currentTime, i = e.duration ?? a.duration, o = M(t), c = M(i);
      if (a.formattedCurrent !== o && (a.formattedCurrent = o), a.formattedDuration !== c && (a.formattedDuration = c), i > 0) {
        const h = Math.round(Math.min(100, Math.max(0, t / i * 100)) * 10) / 10;
        Math.abs(a.progressPercent - h) >= 0.2 && (a.progressPercent = h);
      } else
        a.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    a.currentTime = e, a.duration = t;
    const i = M(e), o = M(t);
    if (a.formattedCurrent !== i && (a.formattedCurrent = i), a.formattedDuration !== o && (a.formattedDuration = o), t > 0) {
      const c = Math.round(Math.min(100, Math.max(0, e / t * 100)) * 10) / 10;
      Math.abs(a.progressPercent - c) >= 0.2 && (a.progressPercent = c);
    } else
      a.progressPercent = 0;
  },
  togglePlay() {
    const e = window.LogicWeaverBiliRadioPlayer;
    if (e) {
      const t = typeof e.getState == "function" ? e.getState() : null;
      if (!t?.active && !t?.playing && !t?.track && !a.active && typeof window.playBiliRadioQueue == "function") {
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
    const e = a.mode || "order", i = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    a.mode = i;
    try {
      localStorage.setItem("bili_radio_mode", i);
    } catch {
    }
    m() && w("bili", "set-mode", { mode: i });
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
let r = null, u = !1, b = !1, p = "B站电台", n = [], d = -1, l = null, g, O = {}, B = 0, f = "", P = null, Q = [], C = /* @__PURE__ */ new Set(), x = null, k = 0, E = Date.now(), R = 0;
function L() {
  P !== null && (clearInterval(P), P = null);
}
function _(e) {
  const t = r;
  if (!t || !u || !l) return;
  const i = Q.find((o) => !C.has(o) && /^https?:\/\//i.test(o));
  if (!i || C.size >= 3) {
    L(), f = "音频连接中断，已尝试所有备用线路", s();
    return;
  }
  C.add(i), x = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, f = "网络波动，正在切换备用线路…", s(), t.src = i, t.load(), x.paused || t.play().catch(() => {
  });
}
function H() {
  L(), E = Date.now(), k = r?.currentTime || 0, R = r?.buffered.length ? r.buffered.end(r.buffered.length - 1) : 0, P = setInterval(() => {
    const e = r;
    if (!e || !u || e.paused || e.ended) {
      E = Date.now();
      return;
    }
    const t = e.currentTime, i = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== k || i > R) {
      E = Date.now(), k = t, R = i, f === "网络波动，正在切换备用线路…" && (f = "", s());
      return;
    }
    Date.now() - E >= 8e3 && e.readyState < 3 && _();
  }, 1e3);
}
function J() {
  r && (E = Date.now(), k = r.currentTime, f === "网络波动，正在切换备用线路…" && (f = "")), s();
}
function K() {
  const e = r;
  if (e && x) {
    const t = x;
    if (x = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  s();
}
function X() {
  u && r?.error && _(`音频解码或网络错误 [代码: ${r.error.code}]`);
}
function T() {
  return r || (r = new Audio(), r.id = "bili-radio-audio", r.preload = "auto", r.addEventListener("ended", Y), r.addEventListener("timeupdate", J), r.addEventListener("play", s), r.addEventListener("pause", s), r.addEventListener("loadedmetadata", K), r.addEventListener("error", X), r);
}
function Y() {
  const e = a.mode || "order";
  if (e === "one")
    r && (r.currentTime = 0, r.play().catch(() => {
    }), s());
  else if (e === "shuffle")
    if (n.length <= 1)
      v(0);
    else {
      let t = Math.floor(Math.random() * n.length);
      t === d && n.length > 1 && (t = (d + 1) % n.length), v(t);
    }
  else
    v(d + 1);
}
let I = 0, D = 0, U = !1;
function W(e) {
  u = !!e.active, b = !!e.loading, p = e.name || "B站电台", n = Array.isArray(e.items) ? e.items : [], d = typeof e.index == "number" ? e.index : -1, l = e.track || null, I = Number(e.currentTime) || 0, D = Number(e.duration) || 0, U = !!e.playing, f = e.error || "", s();
}
m() && (V((e, t) => {
  e === "bili" && W(t);
}), q().then((e) => {
  e?.bili && W(e.bili);
}));
function s() {
  const e = m(), t = e ? null : r, i = e ? U : !!(t && !t.paused && !t.ended && u), o = e ? I : t?.currentTime || 0, c = e ? D || l?.duration || 0 : t?.duration && Number.isFinite(t.duration) ? t.duration : l?.duration || 0, h = l?.cues?.find((N) => o >= N.from && o < N.to), y = f || h?.content || (i ? "♪ 伴奏播放中…" : l ? `已暂停 · 《${l.title}》` : "点击磁带继续播放");
  F.update({
    active: u,
    loading: b,
    playing: i,
    bvid: l?.bvid || "",
    title: l?.title || "B站电台",
    author: l?.upper || l?.author || "",
    coverUrl: l?.cover || "",
    seriesName: p,
    trackIndex: d >= 0 ? d + 1 : 1,
    totalTracks: n.length || 1,
    currentTime: o,
    duration: c,
    lyric: y
  }), u && l && $.syncFromBiliRadio({
    playing: i,
    title: l.title || "B站电台",
    artist: l.upper || l.author || p || "哔哩哔哩电台",
    coverUrl: l.cover || "",
    currentTime: o,
    duration: c,
    lyric: y,
    seriesName: p
  });
}
async function Z(e) {
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
async function v(e) {
  const t = O;
  if (!n.length || t.isCurrent?.() === !1) return;
  const i = ++B;
  d = (e % n.length + n.length) % n.length, b = !0, u = !0, f = "", L(), x = null, T().pause(), s();
  try {
    const o = g ? await g(n[d]) : await Z(n[d]);
    if (i !== B || t.isCurrent?.() === !1) return;
    l = o;
    const c = o.streamUrls?.length ? o.streamUrls : o.streamUrl || o.url ? [o.streamUrl || o.url] : [], h = c[0];
    if (!h) throw new Error("没有取得视频播放地址");
    Q = c, C = /* @__PURE__ */ new Set([h]), T().src = h, H(), t.onReady?.(T()), t.autoplay !== !1 && T().play().catch((y) => console.warn("[BiliRadio] 播放失败", y)), o.bvid && !o.cues?.length && A.fetchVideoSubtitleDetails(o.bvid, o.cid).then((y) => {
      i === B && y.ok && l && (l.cues = y.cues);
    }).catch(() => {
    });
  } catch (o) {
    if (i !== B || t.isCurrent?.() === !1) return;
    u = !1, console.warn("[BiliRadio] 解析音轨失败", o), f = o instanceof Error ? o.message : "播放失败";
  } finally {
    i === B && (b = !1, t.isCurrent?.() === !1 && (u = !1), s());
  }
}
const ee = {
  playQueue(e) {
    if (p = e.name || "B站电台", n = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], g = e.resolveTrack, O = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, m() && !e.resolveTrack && !e.onReady) {
      const t = Math.max(0, Math.min(n.length - 1, Number(e.startIndex) || 0));
      d = n.length ? t : -1, l = n[t] || null, u = !!n.length, b = !!n.length, f = "", s(), w("bili", "play-queue", {
        name: p,
        items: n,
        startIndex: e.startIndex || 0,
        autoplay: e.autoplay !== !1,
        mode: a.mode || "order"
      });
      return;
    }
    v(e.startIndex || 0);
  },
  playAt(e) {
    if (n.length) {
      if (m() && !g) {
        w("bili", "play-at", { index: e });
        return;
      }
      v(e);
    }
  },
  next() {
    if (m() && !g) {
      w("bili", "next");
      return;
    }
    if ((a.mode || "order") === "shuffle" && n.length > 1) {
      let t = Math.floor(Math.random() * n.length);
      t === d && (t = (d + 1) % n.length), v(t);
    } else
      v(d + 1);
  },
  prev() {
    if (m() && !g) {
      w("bili", "prev");
      return;
    }
    if ((a.mode || "order") === "shuffle" && n.length > 1) {
      let t = Math.floor(Math.random() * n.length);
      t === d && (t = ((d - 1) % n.length + n.length) % n.length), v(t);
    } else
      v(d - 1);
  },
  toggle() {
    if (m() && !g) {
      w("bili", "toggle");
      return;
    }
    const e = T();
    if (!u && !e.src) {
      n.length > 0 && v(d >= 0 ? d : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), s();
  },
  seek(e) {
    if (m() && !g) {
      w("bili", "seek", { percent: e });
      return;
    }
    const t = T();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, s());
  },
  getAudioElement() {
    return r;
  },
  getState() {
    return m() && !g ? {
      active: u,
      loading: b,
      name: p,
      items: n,
      index: d,
      track: l,
      currentTime: I,
      duration: D || l?.duration || 0,
      playing: U
    } : {
      active: u,
      loading: b,
      name: p,
      items: n,
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
  a,
  ee as b,
  F as r
};
