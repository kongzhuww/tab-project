import { b as g } from "./github.service-mYu1TuZI.js";
import { b as L } from "./bili-favorites-store-CdbdVJvS.js";
import { t as x } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const o = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
let n = null;
function d() {
  const t = n ? o.get(n) : void 0, e = t && t.cueIndex >= 0 ? t.cues[t.cueIndex] : void 0, l = t?.video.title || "";
  let s = x("bili.hero.defaultLyric"), r = "支持 B站 收藏夹与订阅视频";
  if (e) {
    s = e.content;
    const f = Math.floor(e.from);
    r = `⏱ [${String(Math.floor(f / 60)).padStart(2, "0")}:${String(f % 60).padStart(2, "0")}] · AI 字幕实时同步中`;
  } else t?.cues.length ? (s = t.media.paused ? "⏸ 视频已暂停 · 点击继续播放" : "♪ 伴奏音乐中…", r = `✓ 已加载 ${t.cues.length} 句字幕`) : l && (s = `正在播放：${l}`, r = "当前视频暂无 AI 字幕");
  L.updateOrganizer({ heroTrackTitle: l || "暂无播放视频", heroLyricText: s, heroLyricStatus: r });
}
function h() {
  for (const [t] of o)
    if (!t.paused && !t.ended && t instanceof HTMLVideoElement)
      return t;
  for (const [t] of o)
    if (!t.paused && !t.ended)
      return t;
  return n && o.has(n) ? n : o.keys().next().value || null;
}
function b(t) {
  p.get(t)?.(), p.delete(t), o.delete(t), n === t && (n = h()), d();
}
async function M(t, e) {
  const l = o.get(e);
  if (l?.video.bvid === t.bvid) {
    l.video = t, n === e && d();
    return;
  }
  b(e);
  const s = { video: t, media: e, cues: [], cueIndex: -1 };
  o.set(e, s), (!n || e instanceof HTMLVideoElement && !e.paused) && (n = e);
  const r = () => {
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
    const c = e.currentTime;
    let v = s.cues.findIndex((u, i) => c >= u.from && (c < u.to || !u.to && (!s.cues[i + 1] || c < s.cues[i + 1].from)));
    if (v !== -1)
      s.cueIndex = v;
    else if (s.cues.length > 0)
      if (c < s.cues[0].from)
        s.cueIndex = -1;
      else {
        let u = -1;
        for (let i = s.cues.length - 1; i >= 0; i--)
          if (c >= s.cues[i].from) {
            u = i;
            break;
          }
        s.cueIndex = u;
      }
    d();
  }, f = () => {
    (!Array.from(o.keys()).some(
      (c) => c !== e && c instanceof HTMLVideoElement && !c.paused && !c.ended
    ) || e instanceof HTMLVideoElement) && (n = e), r();
  }, y = () => {
    n === e && (n = h()), r();
  };
  e.addEventListener("timeupdate", r), e.addEventListener("play", f), e.addEventListener("pause", y), p.set(e, () => {
    e.removeEventListener("timeupdate", r), e.removeEventListener("play", f), e.removeEventListener("pause", y);
  }), d();
  try {
    const a = await g.fetchVideoSubtitleDetails(t.bvid);
    if (o.get(e) !== s) return;
    s.cues = a.ok ? a.cues : [], r();
  } catch {
    n === e && d();
  }
}
export {
  M as a,
  b as d
};
