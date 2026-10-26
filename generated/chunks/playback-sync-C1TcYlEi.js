import { c as h } from "./view-styles-CoGPhW6D.js";
import { b as L } from "./bili-favorites-store-CzrFxlFz.js";
const r = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
let n = null;
function d() {
  const t = n ? r.get(n) : void 0, e = t && t.cueIndex >= 0 ? t.cues[t.cueIndex] : void 0, s = t?.video.title || "";
  let o = "点击视频播放，实时台词在此居中呈现", i = "支持 B站 收藏夹与订阅视频";
  if (e) {
    o = e.content;
    const f = Math.floor(e.from);
    i = `⏱ [${String(Math.floor(f / 60)).padStart(2, "0")}:${String(f % 60).padStart(2, "0")}] · AI 字幕实时同步中`;
  } else t?.cues.length ? (o = t.media.paused ? "⏸ 视频已暂停 · 点击继续播放" : "♪ 伴奏音乐中…", i = `✓ 已加载 ${t.cues.length} 句字幕`) : s && (o = `正在播放：${s}`, i = "当前视频暂无 AI 字幕");
  L.updateOrganizer({ heroTrackTitle: s || "暂无播放视频", heroLyricText: o, heroLyricStatus: i });
}
function v() {
  for (const [t] of r)
    if (!t.paused && !t.ended && t instanceof HTMLVideoElement)
      return t;
  for (const [t] of r)
    if (!t.paused && !t.ended)
      return t;
  return n && r.has(n) ? n : r.keys().next().value || null;
}
function g(t) {
  p.get(t)?.(), p.delete(t), r.delete(t), n === t && (n = v()), d();
}
async function I(t, e) {
  g(e);
  const s = { video: t, media: e, cues: [], cueIndex: -1 };
  r.set(e, s), (!n || e instanceof HTMLVideoElement && !e.paused) && (n = e);
  const o = () => {
    if (r.get(e) !== s) return;
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
    const c = e.currentTime;
    let y = s.cues.findIndex((u, l) => c >= u.from && (c < u.to || !u.to && (!s.cues[l + 1] || c < s.cues[l + 1].from)));
    if (y !== -1)
      s.cueIndex = y;
    else if (s.cues.length > 0)
      if (c < s.cues[0].from)
        s.cueIndex = -1;
      else {
        let u = -1;
        for (let l = s.cues.length - 1; l >= 0; l--)
          if (c >= s.cues[l].from) {
            u = l;
            break;
          }
        s.cueIndex = u;
      }
    d();
  }, i = () => {
    (!Array.from(r.keys()).some(
      (c) => c !== e && c instanceof HTMLVideoElement && !c.paused && !c.ended
    ) || e instanceof HTMLVideoElement) && (n = e), o();
  }, f = () => {
    n === e && (n = v()), o();
  };
  e.addEventListener("timeupdate", o), e.addEventListener("play", i), e.addEventListener("pause", f), p.set(e, () => {
    e.removeEventListener("timeupdate", o), e.removeEventListener("play", i), e.removeEventListener("pause", f);
  }), d();
  try {
    const a = await h.fetchVideoSubtitleDetails(t.bvid);
    if (r.get(e) !== s) return;
    s.cues = a.ok ? a.cues : [], o();
  } catch {
    n === e && d();
  }
}
export {
  I as a,
  g as d
};
