import { reactive, readonly, type DeepReadonly } from "vue";

export interface BiliRadioTapeState {
  active: boolean;
  loading: boolean;
  playing: boolean;
  title: string;
  coverUrl?: string;
  seriesName: string;
  trackIndex: number;
  totalTracks: number;
  currentTime: number;
  duration: number;
  formattedCurrent: string;
  formattedDuration: string;
  progressPercent: number;
  lyric: string;
}

function fmtTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

const initialState = (): BiliRadioTapeState => ({
  active: false,
  loading: false,
  playing: false,
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
  lyric: "B站电台 · 点击磁带或下方队列开始播放",
});

export const radioTapeState = reactive<BiliRadioTapeState>(initialState());

export interface RadioTapeController {
  getSnapshot(): DeepReadonly<BiliRadioTapeState>;
  update(partial: Partial<BiliRadioTapeState>): void;
  setProgress(currentTime: number, duration: number): void;
  togglePlay(): void;
  seek(percent: number): void;
  prev(): void;
  next(): void;
  insertAndPlay(track: { bvid: string; title: string; cover?: string; author?: string; duration?: number }): void;
}

export const radioTapeController: RadioTapeController = {
  getSnapshot() {
    return readonly(radioTapeState);
  },
  update(partial) {
    for (const key of Object.keys(partial) as Array<keyof BiliRadioTapeState>) {
      if (radioTapeState[key] !== partial[key]) {
        (radioTapeState as any)[key] = partial[key];
      }
    }
    if (typeof partial.currentTime === "number" || typeof partial.duration === "number") {
      const cur = partial.currentTime ?? radioTapeState.currentTime;
      const dur = partial.duration ?? radioTapeState.duration;
      const fCur = fmtTime(cur);
      const fDur = fmtTime(dur);
      if (radioTapeState.formattedCurrent !== fCur) radioTapeState.formattedCurrent = fCur;
      if (radioTapeState.formattedDuration !== fDur) radioTapeState.formattedDuration = fDur;
      if (dur > 0) {
        const pct = Math.round(Math.min(100, Math.max(0, (cur / dur) * 100)) * 10) / 10;
        if (Math.abs(radioTapeState.progressPercent - pct) >= 0.2) {
          radioTapeState.progressPercent = pct;
        }
      } else {
        radioTapeState.progressPercent = 0;
      }
    }
  },
  setProgress(currentTime, duration) {
    radioTapeState.currentTime = currentTime;
    radioTapeState.duration = duration;
    const fCur = fmtTime(currentTime);
    const fDur = fmtTime(duration);
    if (radioTapeState.formattedCurrent !== fCur) radioTapeState.formattedCurrent = fCur;
    if (radioTapeState.formattedDuration !== fDur) radioTapeState.formattedDuration = fDur;
    if (duration > 0) {
      const pct = Math.round(Math.min(100, Math.max(0, (currentTime / duration) * 100)) * 10) / 10;
      if (Math.abs(radioTapeState.progressPercent - pct) >= 0.2) {
        radioTapeState.progressPercent = pct;
      }
    } else {
      radioTapeState.progressPercent = 0;
    }
  },
  togglePlay() {
    const player = (window as any).LogicWeaverBiliRadioPlayer;
    if (player) {
      const s = typeof player.getState === "function" ? player.getState() : null;
      if (!s?.active && !s?.playing) {
        if (typeof (window as any).playBiliRadioQueue === "function") {
          (window as any).playBiliRadioQueue(0);
          return;
        }
      }
      if (typeof player.toggle === "function") {
        player.toggle();
        return;
      }
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-toggle"));
  },
  seek(percent) {
    const player = (window as any).LogicWeaverBiliRadioPlayer;
    if (typeof player?.seek === "function") {
      player.seek(percent);
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-seek", { detail: { percent } }));
  },
  prev() {
    if (typeof (window as any).LogicWeaverBiliRadioPlayer?.prev === "function") {
      (window as any).LogicWeaverBiliRadioPlayer.prev();
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-prev"));
  },
  next() {
    if (typeof (window as any).LogicWeaverBiliRadioPlayer?.next === "function") {
      (window as any).LogicWeaverBiliRadioPlayer.next();
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-next"));
  },
  insertAndPlay(track) {
    const player = (window as any).LogicWeaverBiliRadioPlayer;
    if (player && typeof player.playQueue === "function") {
      player.playQueue({
        name: "📼 装填卡带",
        items: [{
          bvid: track.bvid,
          title: track.title,
          cover: track.cover,
          author: track.author,
          duration: track.duration
        }],
        startIndex: 0
      });
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-insert", { detail: track }));
  }
};

// Global mount for music.js integration
if (typeof window !== "undefined") {
  (window as any).LogicWeaverBiliRadioTape = radioTapeController;
}
