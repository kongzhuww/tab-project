import type { MusicSong, PlayMode } from "../music/store";

export interface OffscreenLyricCue {
  time: number;
  text: string;
}

export interface OffscreenMusicState {
  playing: boolean;
  currentSong: MusicSong | null;
  currentTime: number;
  duration: number;
  mode: PlayMode;
  queue: MusicSong[];
  queueIndex: number;
  currentLyric: string;
}

export interface OffscreenBiliTrack {
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
}

export interface OffscreenBiliState {
  active: boolean;
  loading: boolean;
  name: string;
  items: OffscreenBiliTrack[];
  index: number;
  track: OffscreenBiliTrack | null;
  currentTime: number;
  duration: number;
  playing: boolean;
  error: string;
  mode: "order" | "one" | "shuffle";
}

export interface OffscreenAudioSnapshot {
  music: OffscreenMusicState | null;
  bili: OffscreenBiliState | null;
}

export type AudioTarget = "music" | "bili";

export interface AudioCommandMessage {
  type: "audio-bg:command" | "offscreen-audio:command";
  target: AudioTarget;
  action: string;
  payload?: any;
}
