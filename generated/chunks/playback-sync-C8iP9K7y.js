import { c as h } from "./view-styles-CDVJ_n-J.js";
import { b as L } from "./bili-favorites-store-CnLjsBCI.js";
const o = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
let n = null;
function d() {
  const t = n ? o.get(n) : void 0, e = t && t.cueIndex >= 0 ? t.cues[t.cueIndex] : void 0, l = t?.video.title || "";
  let s = "点击视频播放，实时台词在此居中呈现", c = "支持 B站 收藏夹与订阅视频";
  if (e) {
    s = e.content;
    const f = Math.floor(e.from);
    c = `⏱ [${String(Math.floor(f / 60)).padStart(2, "0")}:${String(f % 60).padStart(2, "0")}] · AI 字幕实时同步中`;
  } else t?.cues.length ? (s = t.media.paused ? "⏸ 视频已暂停 · 点击继续播放" : "♪ 伴奏音乐中…", c = `✓ 已加载 ${t.cues.length} 句字幕`) : l && (s = `正在播放：${l}`, c = "当前视频暂无 AI 字幕");
  L.updateOrganizer({ heroTrackTitle: l || "暂无播放视频", heroLyricText: s, heroLyricStatus: c });
}
function g() {
  for (const [t] of o)
    if (!t.paused && !t.ended && t instanceof HTMLVideoElement)
      return t;
  for (const [t] of o)
    if (!t.paused && !t.ended)
      return t;
  return n && o.has(n) ? n : o.keys().next().value || null;
}
function x(t) {
  p.get(t)?.(), p.delete(t), o.delete(t), n === t && (n = g()), d();
}
async function I(t, e) {
  const l = o.get(e);
  if (l?.video.bvid === t.bvid) {
    l.video = t, n === e && d();
    return;
  }
  x(e);
  const s = { video: t, media: e, cues: [], cueIndex: -1 };
  o.set(e, s), (!n || e instanceof HTMLVideoElement && !e.paused) && (n = e);
  const c = () => {
    if (o.get(e) !== s) return;
    const a = !e.paused && !e.ended;
    if (n !== e)
      if (!n || n.paused || n.ended)
        if (a)
          n = e;
        else
          return;
      else if (e instanceof HTMLVideoElement && !(n instanceof HTMLVideoElement))
        n = e;
      else
        return;
    const r = e.currentTime;
    let v = s.cues.findIndex((u, i) => r >= u.from && (r < u.to || !u.to && (!s.cues[i + 1] || r < s.cues[i + 1].from)));
    if (v !== -1)
      s.cueIndex = v;
    else if (s.cues.length > 0)
      if (r < s.cues[0].from)
        s.cueIndex = -1;
      else {
        let u = -1;
        for (let i = s.cues.length - 1; i >= 0; i--)
          if (r >= s.cues[i].from) {
            u = i;
            break;
          }
        s.cueIndex = u;
      }
    d();
  }, f = () => {
    (!Array.from(o.keys()).some(
      (r) => r !== e && r instanceof HTMLVideoElement && !r.paused && !r.ended
    ) || e instanceof HTMLVideoElement) && (n = e), c();
  }, y = () => {
    n === e && (n = g()), c();
  };
  e.addEventListener("timeupdate", c), e.addEventListener("play", f), e.addEventListener("pause", y), p.set(e, () => {
    e.removeEventListener("timeupdate", c), e.removeEventListener("play", f), e.removeEventListener("pause", y);
  }), d();
  try {
    const a = await h.fetchVideoSubtitleDetails(t.bvid);
    if (o.get(e) !== s) return;
    s.cues = a.ok ? a.cues : [], c();
  } catch {
    n === e && d();
  }
}
export {
  I as a,
  x as d
};
