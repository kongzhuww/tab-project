import { bilibiliService, type BiliSubtitleCue } from "../services/bilibili.service";
import { biliFavoritesController } from "./bili-favorites-store";

type PlaybackVideo = { bvid: string; title?: string; cover?: string };
type PlaybackState = { video: PlaybackVideo; media: HTMLMediaElement; cues: BiliSubtitleCue[]; cueIndex: number };
const states = new Map<HTMLMediaElement, PlaybackState>();
const cleanups = new Map<HTMLMediaElement, () => void>();
let active: HTMLMediaElement | null = null;

function updateLyrics(): void {
  const state = active ? states.get(active) : undefined;
  const cue = state && state.cueIndex >= 0 ? state.cues[state.cueIndex] : undefined;
  const title = state?.video.title || "";
  let text = "点击视频播放，实时台词在此居中呈现";
  let status = "支持 B站 收藏夹与订阅视频";
  if (cue) {
    text = cue.content;
    const seconds = Math.floor(cue.from);
    status = `⏱ [${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}] · AI 字幕实时同步中`;
  } else if (state?.cues.length) {
    text = state.media.paused ? "⏸ 视频已暂停 · 点击继续播放" : "♪ 伴奏音乐中…";
    status = `✓ 已加载 ${state.cues.length} 句字幕`;
  } else if (title) {
    text = `正在播放：${title}`;
    status = "当前视频暂无 AI 字幕";
  }
  biliFavoritesController.updateOrganizer({ heroTrackTitle: title || "暂无播放视频", heroLyricText: text, heroLyricStatus: status });
}

function pickBestActive(): HTMLMediaElement | null {
  // 优先级 1: 正在播放的视频元素 (用户注意力在视频上)
  for (const [media] of states) {
    if (!media.paused && !media.ended && media instanceof HTMLVideoElement) {
      return media;
    }
  }
  // 优先级 2: 正在播放的音频元素 (电台等)
  for (const [media] of states) {
    if (!media.paused && !media.ended) {
      return media;
    }
  }
  // 优先级 3: 保持当前 active (如果它还在 states 中)
  if (active && states.has(active)) {
    return active;
  }
  // 兜底: 任意已注册媒体
  return states.keys().next().value || null;
}

export function detachBiliPlaybackSync(media: HTMLMediaElement): void {
  cleanups.get(media)?.();
  cleanups.delete(media);
  states.delete(media);
  if (active === media) {
    active = pickBestActive();
  }
  updateLyrics();
}

export async function attachBiliPlaybackSync(video: PlaybackVideo, media: HTMLMediaElement): Promise<void> {
  detachBiliPlaybackSync(media);
  const state: PlaybackState = { video, media, cues: [], cueIndex: -1 };
  states.set(media, state);

  // 若当前无活跃媒体或新接入的是正在播放的视频，优先将其设为 active
  if (!active || (media instanceof HTMLVideoElement && !media.paused)) {
    active = media;
  }

  const sync = () => {
    if (states.get(media) !== state) return;

    // 关键防抖裁决：当多个媒体同时播放时（例如一边放电台音频，一边放小窗视频），
    // 只有当 media 正是当前 active，或者当前 active 已经暂停而当前 media 正在播放时，才允许更新活跃源！
    // 绝不允许两个都在播放的媒体在各自的 timeupdate 循环里互相争夺 active 导致台词疯狂跳动！
    const isPlaying = !media.paused && !media.ended;
    if (active !== media) {
      if (!active || active.paused || active.ended) {
        if (isPlaying) {
          active = media;
        } else {
          return; // 非活跃且未在播放，静默返回，不篡改当前展示
        }
      } else {
        // 当前 active 正在播放中，如果当前 media 不是高优先级的视频且 active 也是视频，不予抢占
        if (media instanceof HTMLVideoElement && !(active instanceof HTMLVideoElement)) {
          active = media;
        } else {
          return; // 保持当前 active，不予抢占
        }
      }
    }

    const curTime = media.currentTime;
    let exactIdx = state.cues.findIndex((cue, index) =>
      curTime >= cue.from && (curTime < cue.to ||
        (!cue.to && (!state.cues[index + 1] || curTime < state.cues[index + 1].from))));

    if (exactIdx !== -1) {
      state.cueIndex = exactIdx;
    } else if (state.cues.length > 0) {
      // 处于真空期（未找到任何正在生效的字幕）：
      if (curTime < state.cues[0].from) {
        state.cueIndex = -1;
      } else {
        let lastPlayedIdx = -1;
        for (let i = state.cues.length - 1; i >= 0; i--) {
          if (curTime >= state.cues[i].from) {
            lastPlayedIdx = i;
            break;
          }
        }
        state.cueIndex = lastPlayedIdx;
      }
    }
    updateLyrics();
  };

  const onPlay = () => {
    // 主动播放时：如果是视频，立即提权为 active；如果是音频且无播放中视频，也设为 active
    const hasPlayingVideo = Array.from(states.keys()).some(
      (m) => m !== media && m instanceof HTMLVideoElement && !m.paused && !m.ended
    );
    if (!hasPlayingVideo || media instanceof HTMLVideoElement) {
      active = media;
    }
    sync();
  };

  const onPause = () => {
    if (active === media) {
      active = pickBestActive();
    }
    sync();
  };

  media.addEventListener("timeupdate", sync);
  media.addEventListener("play", onPlay);
  media.addEventListener("pause", onPause);
  cleanups.set(media, () => {
    media.removeEventListener("timeupdate", sync);
    media.removeEventListener("play", onPlay);
    media.removeEventListener("pause", onPause);
  });
  updateLyrics();
  try {
    const result = await bilibiliService.fetchVideoSubtitleDetails(video.bvid);
    if (states.get(media) !== state) return;
    state.cues = result.ok ? result.cues : [];
    sync();
  } catch {
    if (active === media) updateLyrics();
  }
}
