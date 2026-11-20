import type { MusicSong, PlayMode } from "../music/store";
import { bilibiliService } from "../services/bilibili.service";
import { neteaseService } from "../services/netease.service";
import type {
  AudioTarget,
  OffscreenBiliState,
  OffscreenBiliTrack,
  OffscreenLyricCue,
  OffscreenMusicState,
} from "./audio-protocol";

declare const chrome: any;

const MONSTER_SIREN_API = "https://monster-siren.hypergryph.com/api";

function broadcastState(source: AudioTarget, state: OffscreenMusicState | OffscreenBiliState): void {
  try {
    const res = chrome.runtime?.sendMessage?.({ type: "offscreen-audio:state", source, state });
    if (res && typeof res.catch === "function") res.catch(() => {});
  } catch {}
}

// ============================================================================
// 1. 首页音乐引擎 (塞壬唱片 / 网易云)
// ============================================================================
const musicAudio = new Audio();
musicAudio.crossOrigin = "anonymous";
musicAudio.preload = "none";

let musicLyrics: OffscreenLyricCue[] = [];
let musicPlayVersion = 0;
let musicLastBroadcast = 0;

const musicState: OffscreenMusicState = {
  playing: false,
  currentSong: null,
  currentTime: 0,
  duration: 0,
  mode: "shuffle",
  queue: [],
  queueIndex: -1,
  currentLyric: "",
};

function parseMusicLyrics(raw: string): OffscreenLyricCue[] {
  return raw
    .split(/\r?\n/)
    .flatMap((line) => {
      const matches = [...line.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
      const text = line.replace(/\[[^\]]*\]/g, "").trim();
      return text ? matches.map((m) => ({ time: Number(m[1]) * 60 + Number(m[2]), text })) : [];
    })
    .sort((a, b) => a.time - b.time);
}

function updateMusicLyric(): void {
  let text = "";
  for (const line of musicLyrics) {
    if (line.time > musicState.currentTime) break;
    text = line.text;
  }
  musicState.currentLyric = text;
}

function emitMusicState(force = false): void {
  const now = Date.now();
  if (!force && now - musicLastBroadcast < 380) return;
  musicLastBroadcast = now;
  broadcastState("music", { ...musicState });
}

function pauseBiliIfActive(): void {
  if (!biliAudio.paused || biliActive) {
    biliAudio.pause();
    emitBiliState(true);
  }
}

function pauseMusicIfActive(): void {
  if (!musicAudio.paused || musicState.playing) {
    musicAudio.pause();
    musicState.playing = false;
    emitMusicState(true);
  }
}

async function resolveAndPlayMusicSong(song: MusicSong, autoplay = true): Promise<void> {
  pauseBiliIfActive();
  const version = ++musicPlayVersion;
  musicState.currentSong = song;
  musicState.currentTime = 0;
  musicState.duration = 0;
  musicLyrics = [];
  musicState.currentLyric = "";

  if (musicState.queue.some((s) => !!s.isNetease !== !!song.isNetease)) {
    musicState.queue = [];
  }
  const existingIdx = musicState.queue.findIndex((s) => String(s.cid) === String(song.cid));
  if (existingIdx === -1) {
    musicState.queue = [...musicState.queue, song];
    musicState.queueIndex = musicState.queue.length - 1;
  } else {
    musicState.queueIndex = existingIdx;
  }
  emitMusicState(true);

  try {
    let playUrl = "";
    if (song.isNetease && song.neteaseId) {
      void neteaseService.getSongLyric(song.neteaseId).then((raw) => {
        if (version !== musicPlayVersion) return;
        musicLyrics = parseMusicLyrics(raw);
        updateMusicLyric();
        emitMusicState(true);
      });
      playUrl = await neteaseService.getSongAudioUrl(song.neteaseId);
    } else {
      const res = await fetch(`${MONSTER_SIREN_API}/song/${song.cid}`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      playUrl = json.data?.sourceUrl || "";
      const lyricUrl = json.data?.lyricUrl;
      if (lyricUrl) {
        void fetch(lyricUrl)
          .then((r) => (r.ok ? r.text() : ""))
          .then((raw) => {
            if (version !== musicPlayVersion) return;
            musicLyrics = parseMusicLyrics(raw);
            updateMusicLyric();
            emitMusicState(true);
          })
          .catch(() => {});
      }
    }
    if (version !== musicPlayVersion || !playUrl) return;
    musicAudio.src = playUrl;
    if (autoplay) await musicAudio.play();
    if (version !== musicPlayVersion) return;
    musicState.playing = !musicAudio.paused;
    emitMusicState(true);
  } catch (err) {
    if (version === musicPlayVersion) {
      console.warn("[OffscreenAudio] 音乐播放失败", err);
      musicState.playing = false;
      emitMusicState(true);
    }
  }
}

function advanceMusic(step: 1 | -1): void {
  const queue = musicState.queue;
  if (!queue.length) return;
  let nextIdx = 0;
  if (musicState.mode === "shuffle" && queue.length > 1) {
    nextIdx = Math.floor(Math.random() * queue.length);
    if (nextIdx === musicState.queueIndex) nextIdx = (musicState.queueIndex + 1) % queue.length;
  } else if (step > 0) {
    nextIdx = (musicState.queueIndex + 1) % queue.length;
  } else {
    nextIdx = (musicState.queueIndex - 1 + queue.length) % queue.length;
  }
  const target = queue[nextIdx];
  if (target) void resolveAndPlayMusicSong(target, true);
}

musicAudio.addEventListener("timeupdate", () => {
  musicState.currentTime = musicAudio.currentTime || 0;
  if (Number.isFinite(musicAudio.duration)) musicState.duration = musicAudio.duration;
  updateMusicLyric();
  emitMusicState(false);
});
musicAudio.addEventListener("loadedmetadata", () => {
  if (Number.isFinite(musicAudio.duration)) musicState.duration = musicAudio.duration;
  emitMusicState(true);
});
musicAudio.addEventListener("play", () => {
  pauseBiliIfActive();
  musicState.playing = true;
  emitMusicState(true);
});
musicAudio.addEventListener("pause", () => {
  musicState.playing = false;
  emitMusicState(true);
});
musicAudio.addEventListener("ended", () => {
  if (musicState.mode === "one") {
    musicAudio.currentTime = 0;
    void musicAudio.play().catch(() => {});
  } else {
    advanceMusic(1);
  }
});

// ============================================================================
// 2. B站随身听引擎
// ============================================================================
const biliAudio = new Audio();
biliAudio.preload = "auto";

let biliActive = false;
let biliLoading = false;
let biliName = "B站电台";
let biliItems: OffscreenBiliTrack[] = [];
let biliIndex = -1;
let biliTrack: OffscreenBiliTrack | null = null;
let biliGeneration = 0;
let biliError = "";
let biliMode: "order" | "one" | "shuffle" = "order";
let biliSources: string[] = [];
let biliTriedSources = new Set<string>();
let biliResumePos: { time: number; paused: boolean } | null = null;
let biliLastProgressTime = 0;
let biliLastProgressTs = Date.now();
let biliLastBufferEnd = 0;
let biliFailoverTimer: ReturnType<typeof setInterval> | null = null;
let biliLastBroadcast = 0;

function stopBiliWatchdog(): void {
  if (biliFailoverTimer !== null) {
    clearInterval(biliFailoverTimer);
    biliFailoverTimer = null;
  }
}

function getBiliSnapshot(): OffscreenBiliState {
  const duration = biliAudio.duration && Number.isFinite(biliAudio.duration)
    ? biliAudio.duration
    : biliTrack?.duration || 0;
  return {
    active: biliActive,
    loading: biliLoading,
    name: biliName,
    items: biliItems,
    index: biliIndex,
    track: biliTrack,
    currentTime: biliAudio.currentTime || 0,
    duration,
    playing: Boolean(!biliAudio.paused && !biliAudio.ended && biliActive),
    error: biliError,
    mode: biliMode,
  };
}

function emitBiliState(force = false): void {
  const now = Date.now();
  if (!force && now - biliLastBroadcast < 380) return;
  biliLastBroadcast = now;
  broadcastState("bili", getBiliSnapshot());
}

function advanceBiliFailover(): void {
  if (!biliActive || !biliTrack) return;
  const nextUrl = biliSources.find((u) => !biliTriedSources.has(u) && /^https?:\/\//i.test(u));
  if (!nextUrl || biliTriedSources.size >= 3) {
    stopBiliWatchdog();
    biliError = "音频连接中断，已尝试所有备用线路";
    emitBiliState(true);
    return;
  }
  biliTriedSources.add(nextUrl);
  biliResumePos = {
    time: Number.isFinite(biliAudio.currentTime) ? biliAudio.currentTime : 0,
    paused: biliAudio.paused,
  };
  biliError = "网络波动，正在切换备用线路…";
  emitBiliState(true);
  biliAudio.src = nextUrl;
  biliAudio.load();
  if (!biliResumePos.paused) {
    void biliAudio.play().catch(() => {});
  }
}

function startBiliWatchdog(): void {
  stopBiliWatchdog();
  biliLastProgressTs = Date.now();
  biliLastProgressTime = biliAudio.currentTime || 0;
  biliLastBufferEnd = biliAudio.buffered.length ? biliAudio.buffered.end(biliAudio.buffered.length - 1) : 0;

  biliFailoverTimer = setInterval(() => {
    if (!biliActive || biliAudio.paused || biliAudio.ended) {
      biliLastProgressTs = Date.now();
      return;
    }
    const curTime = biliAudio.currentTime;
    const bufEnd = biliAudio.buffered.length ? biliAudio.buffered.end(biliAudio.buffered.length - 1) : 0;
    if (curTime !== biliLastProgressTime || bufEnd > biliLastBufferEnd) {
      biliLastProgressTs = Date.now();
      biliLastProgressTime = curTime;
      biliLastBufferEnd = bufEnd;
      if (biliError === "网络波动，正在切换备用线路…") {
        biliError = "";
        emitBiliState(true);
      }
      return;
    }
    if (Date.now() - biliLastProgressTs >= 8000 && biliAudio.readyState < 3) {
      advanceBiliFailover();
    }
  }, 1000);
}

async function resolveBiliTrack(item: OffscreenBiliTrack): Promise<OffscreenBiliTrack> {
  if (item.streamUrl || item.url) return item;
  const view = await bilibiliService.getVideoView(item.bvid);
  if (!view?.cid) throw new Error("视频信息不可用");
  const stream = await bilibiliService.fetchAudioStream(item.bvid, view.cid);
  if (!stream.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...item,
    title: view.title || item.title,
    cover: String(view.pic || item.cover || "").replace(/^http:/, "https:"),
    upper: view.owner?.name || item.upper || item.author || "Bilibili",
    duration: Number(view.duration || item.duration || 0),
    cid: view.cid,
    streamUrl: stream.sources[0],
    streamUrls: stream.sources,
  };
}

async function playBiliIndex(nextIndex: number, autoplay = true): Promise<void> {
  if (!biliItems.length) return;
  pauseMusicIfActive();
  const current = ++biliGeneration;
  biliIndex = ((nextIndex % biliItems.length) + biliItems.length) % biliItems.length;
  biliLoading = true;
  biliActive = true;
  biliError = "";
  stopBiliWatchdog();
  biliResumePos = null;
  biliAudio.pause();
  emitBiliState(true);

  try {
    const next = await resolveBiliTrack(biliItems[biliIndex]);
    if (current !== biliGeneration) return;
    biliTrack = next;
    const sources = next.streamUrls?.length
      ? next.streamUrls
      : next.streamUrl || next.url
        ? [next.streamUrl || next.url!]
        : [];
    const url = sources[0];
    if (!url) throw new Error("没有取得视频播放地址");
    biliSources = sources;
    biliTriedSources = new Set([url]);
    biliAudio.src = url;
    startBiliWatchdog();
    if (autoplay) {
      void biliAudio.play().catch((err: unknown) => console.warn("[OffscreenAudio] B站电台播放失败", err));
    }
    if (next.bvid && !next.cues?.length) {
      void bilibiliService
        .fetchVideoSubtitleDetails(next.bvid, next.cid)
        .then((sub) => {
          if (current === biliGeneration && sub.ok && biliTrack) {
            biliTrack = { ...biliTrack, cues: sub.cues };
            emitBiliState(true);
          }
        })
        .catch(() => {});
    }
  } catch (err) {
    if (current !== biliGeneration) return;
    biliActive = false;
    biliError = err instanceof Error ? err.message : "播放失败";
  } finally {
    if (current === biliGeneration) {
      biliLoading = false;
      emitBiliState(true);
    }
  }
}

function advanceBili(step: 1 | -1): void {
  if (!biliItems.length) return;
  if (biliMode === "shuffle" && biliItems.length > 1) {
    let nextIdx = Math.floor(Math.random() * biliItems.length);
    if (nextIdx === biliIndex) nextIdx = (biliIndex + 1) % biliItems.length;
    void playBiliIndex(nextIdx, true);
  } else {
    void playBiliIndex(biliIndex + step, true);
  }
}

biliAudio.addEventListener("timeupdate", () => {
  biliLastProgressTs = Date.now();
  biliLastProgressTime = biliAudio.currentTime;
  if (biliError === "网络波动，正在切换备用线路…") biliError = "";
  emitBiliState(false);
});
biliAudio.addEventListener("loadedmetadata", () => {
  if (biliResumePos) {
    const resume = biliResumePos;
    biliResumePos = null;
    if (resume.time > 0 && resume.time < (biliAudio.duration || Infinity)) {
      try { biliAudio.currentTime = resume.time; } catch {}
    }
    if (!resume.paused) void biliAudio.play().catch(() => {});
  }
  emitBiliState(true);
});
biliAudio.addEventListener("play", () => {
  pauseMusicIfActive();
  emitBiliState(true);
});
biliAudio.addEventListener("pause", () => emitBiliState(true));
biliAudio.addEventListener("error", () => {
  if (biliActive && biliAudio.error) advanceBiliFailover();
});
biliAudio.addEventListener("ended", () => {
  if (biliMode === "one") {
    biliAudio.currentTime = 0;
    void biliAudio.play().catch(() => {});
    emitBiliState(true);
  } else {
    advanceBili(1);
  }
});

// ============================================================================
// 3. 消息路由
// ============================================================================
chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: (res: any) => void) => {
  if (message?.type === "offscreen-audio:get-state") {
    sendResponse({
      ok: true,
      music: musicState.currentSong || musicState.queue.length ? { ...musicState } : null,
      bili: biliActive || biliItems.length ? getBiliSnapshot() : null,
    });
    return true;
  }

  if (message?.type !== "offscreen-audio:command") return false;
  const { target, action, payload } = message;

  if (target === "music") {
    if (action === "play-url") {
      pauseBiliIfActive();
      const version = ++musicPlayVersion;
      musicState.currentSong = payload.song || null;
      musicState.queue = Array.isArray(payload.queue) ? payload.queue : [];
      musicState.queueIndex = typeof payload.queueIndex === "number" ? payload.queueIndex : -1;
      if (payload.mode) musicState.mode = payload.mode;
      musicLyrics = Array.isArray(payload.lyrics) ? payload.lyrics : [];
      musicState.currentTime = 0;
      musicState.duration = 0;
      updateMusicLyric();
      if (payload.url) {
        musicAudio.src = payload.url;
        if (payload.autoplay !== false) {
          void musicAudio
            .play()
            .then(() => {
              if (version === musicPlayVersion) {
                musicState.playing = !musicAudio.paused;
                emitMusicState(true);
              }
            })
            .catch(() => emitMusicState(true));
        }
      }
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-lyrics") {
      musicLyrics = Array.isArray(payload?.lyrics) ? payload.lyrics : [];
      updateMusicLyric();
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-queue") {
      if (Array.isArray(payload?.queue)) musicState.queue = payload.queue;
      if (typeof payload?.queueIndex === "number") musicState.queueIndex = payload.queueIndex;
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-mode") {
      musicState.mode = (payload?.mode as PlayMode) || musicState.mode;
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "toggle") {
      if (!musicAudio.paused) musicAudio.pause();
      else if (musicAudio.src) {
        pauseBiliIfActive();
        void musicAudio.play().catch(() => {});
      }
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "pause") {
      musicAudio.pause();
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "seek") {
      if (Number.isFinite(musicAudio.duration) && musicAudio.duration > 0) {
        musicAudio.currentTime = (Math.min(100, Math.max(0, Number(payload?.percent) || 0)) / 100) * musicAudio.duration;
        updateMusicLyric();
        emitMusicState(true);
      }
      sendResponse({ ok: true });
      return true;
    }
    if (action === "next") {
      advanceMusic(1);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "prev") {
      advanceMusic(-1);
      sendResponse({ ok: true });
      return true;
    }
  }

  if (target === "bili") {
    if (action === "play-queue") {
      biliName = payload?.name || "B站电台";
      biliItems = Array.isArray(payload?.items) ? payload.items : [];
      if (payload?.mode) biliMode = payload.mode;
      void playBiliIndex(Number(payload?.startIndex) || 0, payload?.autoplay !== false);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "play-resolved") {
      pauseMusicIfActive();
      ++biliGeneration;
      biliName = payload?.name || "B站电台";
      biliItems = Array.isArray(payload?.items) ? payload.items : [];
      biliIndex = Number(payload?.index) || 0;
      biliTrack = payload?.track || null;
      biliActive = true;
      biliLoading = false;
      biliError = "";
      if (payload?.mode) biliMode = payload.mode;
      const sources: string[] = Array.isArray(payload?.sources) ? payload.sources : [];
      if (sources[0]) {
        biliSources = sources;
        biliTriedSources = new Set([sources[0]]);
        biliAudio.src = sources[0];
        startBiliWatchdog();
        if (payload?.autoplay !== false) void biliAudio.play().catch(() => {});
      }
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "play-at") {
      void playBiliIndex(Number(payload?.index) || 0, true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-mode") {
      if (payload?.mode) biliMode = payload.mode;
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "toggle") {
      if (!biliActive && !biliAudio.src) {
        if (biliItems.length > 0) void playBiliIndex(biliIndex >= 0 ? biliIndex : 0, true);
      } else if (biliAudio.paused) {
        pauseMusicIfActive();
        void biliAudio.play().catch(() => {});
      } else {
        biliAudio.pause();
      }
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "pause") {
      biliAudio.pause();
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "seek") {
      if (Number.isFinite(biliAudio.duration) && biliAudio.duration > 0) {
        biliAudio.currentTime = (Math.min(100, Math.max(0, Number(payload?.percent) || 0)) / 100) * biliAudio.duration;
        emitBiliState(true);
      }
      sendResponse({ ok: true });
      return true;
    }
    if (action === "next") {
      advanceBili(1);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "prev") {
      advanceBili(-1);
      sendResponse({ ok: true });
      return true;
    }
  }

  sendResponse({ ok: false });
  return true;
});
