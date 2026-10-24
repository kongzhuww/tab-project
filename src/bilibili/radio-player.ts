import { bilibiliService } from "../services/bilibili.service";
import { radioTapeController } from "./radio-tape-store";
import { homeMusicController } from "../music/store";

type Track = {
  bvid: string;
  title: string;
  cid?: number | string;
  cover?: string;
  author?: string;
  upper?: string;
  duration?: number;
  streamUrl?: string;
  url?: string;
  streamUrls?: string[];
  cues?: Array<{ from: number; to: number; content: string }>;
};
type QueueOptions = {
  name?: string;
  items: Track[];
  startIndex?: number;
  resolveTrack?: (track: Track) => Promise<Track>;
  isCurrent?: () => boolean;
  autoplay?: boolean;
  onReady?: (audio: HTMLAudioElement) => void;
};

let audio: HTMLAudioElement | null = null;
let active = false;
let loading = false;
let name = "B站电台";
let items: Track[] = [];
let index = -1;
let track: Track | null = null;
let resolver: QueueOptions["resolveTrack"];
let queuePlayback: Pick<QueueOptions, "isCurrent" | "autoplay" | "onReady"> = {};
let generation = 0;
let playbackError = "";

function getAudio(): HTMLAudioElement {
  if (audio) return audio;
  audio = new Audio();
  audio.id = "bili-radio-audio";
  audio.crossOrigin = "anonymous";
  audio.addEventListener("ended", () => { void playIndex(index + 1); });
  audio.addEventListener("timeupdate", syncTape);
  audio.addEventListener("play", syncTape);
  audio.addEventListener("pause", syncTape);
  audio.addEventListener("loadedmetadata", syncTape);
  return audio;
}

function syncTape(): void {
  const media = audio;
  const playing = Boolean(media && !media.paused && !media.ended && active);
  const duration = media?.duration && Number.isFinite(media.duration) ? media.duration : track?.duration || 0;
  const cue = track?.cues?.find((item) => (media?.currentTime || 0) >= item.from && (media?.currentTime || 0) < item.to);
  const currentLyricText = playbackError || cue?.content || (playing ? "♪ 伴奏播放中…" : track ? `已暂停 · 《${track.title}》` : "点击磁带继续播放");
  radioTapeController.update({
    active, loading, playing,
    title: track?.title || "B站电台",
    coverUrl: track?.cover || "",
    seriesName: name,
    trackIndex: index >= 0 ? index + 1 : 1,
    totalTracks: items.length || 1,
    currentTime: media?.currentTime || 0,
    duration,
    lyric: currentLyricText
  });
  if (active && track) {
    homeMusicController.syncFromBiliRadio({
      playing,
      title: track.title || "B站电台",
      artist: track.upper || track.author || name || "哔哩哔哩电台",
      coverUrl: track.cover || "",
      currentTime: media?.currentTime || 0,
      duration,
      lyric: currentLyricText,
      seriesName: name
    });
  }
}

async function resolveTrack(item: Track): Promise<Track> {
  if (item.streamUrl || item.url) return item;
  const view = await bilibiliService.getVideoView(item.bvid);
  if (!view?.cid) throw new Error("视频信息不可用");
  const stream = await bilibiliService.fetchPlayStream(item.bvid, view.cid, 64);
  if (!stream.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...item,
    title: view.title || item.title,
    cover: String(view.pic || item.cover || "").replace(/^http:/, "https:"),
    upper: view.owner?.name || item.upper || item.author || "Bilibili",
    duration: Number(view.duration || item.duration || 0),
    cid: view.cid,
    streamUrl: stream.sources[0],
    streamUrls: stream.sources
  };
}

async function playIndex(nextIndex: number): Promise<void> {
  const playback = queuePlayback;
  if (!items.length || playback.isCurrent?.() === false) return;
  const current = ++generation;
  index = ((nextIndex % items.length) + items.length) % items.length;
  loading = true;
  active = true;
  playbackError = "";
  getAudio().pause();
  syncTape();
  try {
    const next = resolver ? await resolver(items[index]) : await resolveTrack(items[index]);
    if (current !== generation || playback.isCurrent?.() === false) return;
    track = next;
    const url = next.streamUrl || next.url || next.streamUrls?.[0];
    if (!url) throw new Error("没有取得视频播放地址");
    getAudio().src = url;
    playback.onReady?.(getAudio());
    if (playback.autoplay !== false) void getAudio().play().catch((error: unknown) => console.warn("[BiliRadio] 播放失败", error));
    if (next.bvid && !next.cues?.length) {
      void bilibiliService.fetchVideoSubtitleDetails(next.bvid, next.cid).then((subtitle) => {
        if (current === generation && subtitle.ok && track) track.cues = subtitle.cues;
      }).catch(() => {});
    }
  } catch (error) {
    if (current !== generation || playback.isCurrent?.() === false) return;
    active = false;
    console.warn("[BiliRadio] 解析音轨失败", error);
    playbackError = error instanceof Error ? error.message : "播放失败";
  } finally {
    if (current === generation) {
      loading = false;
      if (playback.isCurrent?.() === false) active = false;
      syncTape();
    }
  }
}

export const biliRadioPlayer = {
  playQueue(options: QueueOptions): void {
    name = options.name || "B站电台";
    items = Array.isArray(options.items) ? options.items.map((item) => ({ ...item })) : [];
    resolver = options.resolveTrack;
    queuePlayback = { isCurrent: options.isCurrent, autoplay: options.autoplay, onReady: options.onReady };
    void playIndex(options.startIndex || 0);
  },
  playAt(targetIndex: number): void {
    if (!items.length) return;
    void playIndex(targetIndex);
  },
  next(): void { void playIndex(index + 1); },
  prev(): void { void playIndex(index - 1); },
  toggle(): void {
    const media = getAudio();
    if (!active && !media.src) {
      if (items.length > 0) {
        void playIndex(index >= 0 ? index : 0);
      }
      return;
    }
    if (media.paused) void media.play().catch(() => {});
    else media.pause();
    syncTape();
  },
  seek(percent: number): void {
    const media = getAudio();
    if (Number.isFinite(media.duration) && media.duration > 0) {
      media.currentTime = Math.min(100, Math.max(0, percent)) / 100 * media.duration;
      syncTape();
    }
  },
  getAudioElement(): HTMLAudioElement | null { return audio; },
  getState() {
    return { active, loading, name, items, index, track,
      currentTime: audio?.currentTime || 0, duration: audio?.duration || 0,
      playing: Boolean(audio && !audio.paused && !audio.ended && active) };
  },
  syncTape
};

if (typeof window !== "undefined") {
  (window as any).LogicWeaverBiliRadioPlayer = biliRadioPlayer;
}
