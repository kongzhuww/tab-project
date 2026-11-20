/**
 * MusicService — 现代化音频播放与塞壬唱片/网易云音乐纯数据服务 (Pure TypeScript, Zero DOM)
 * 封装塞壬唱片 (Monster Siren) API、网易云音乐接口、音频回放控制及离线收藏
 */

import type { MusicSong, MusicAlbum, PlayMode } from "../music/store";
import { neteaseService } from "./netease.service";
import {
  canUseOffscreenAudio,
  fetchOffscreenAudioState,
  sendAudioCommand,
  subscribeOffscreenAudioState,
} from "../offscreen/audio-client";
import type { OffscreenMusicState } from "../offscreen/audio-protocol";

declare const chrome: any;

export const MONSTER_SIREN_API = "https://monster-siren.hypergryph.com/api";
export const MUSIC_FAV_KEY = "msFavoriteSongs";

export interface MusicPlaybackState {
  playing: boolean;
  currentSong: MusicSong | null;
  currentTime: number;
  duration: number;
  mode: PlayMode;
  queue: MusicSong[];
  queueIndex: number;
  currentLyric?: string;
}

export function toNeteaseMusicSong(rawSong: any): MusicSong {
  const artists = (rawSong.ar || rawSong.artists || []).map((a: any) => typeof a === 'string' ? a : a.name);
  return {
    cid: `ne_${rawSong.id}`,
    name: rawSong.name || '网易云音乐',
    artists: artists.length ? artists : ['网易云音乐'],
    coverUrl: rawSong.al?.picUrl || rawSong.album?.picUrl || rawSong.picUrl || rawSong.coverUrl || '',
    isNetease: true,
    neteaseId: rawSong.id,
    rawSong
  };
}

export type MusicStateListener = (state: MusicPlaybackState) => void;
export interface MusicPlayOptions { isCurrent?: () => boolean; autoplay?: boolean }

export class MusicService {
  private static instance: MusicService;
  private audio: HTMLAudioElement | null = null;
  private playVersion = 0;
  private lyrics: Array<{ time: number; text: string }> = [];

  private setLyrics(raw: string): void {
    this.lyrics = raw.split(/\r?\n/).flatMap(line => {
      const matches = [...line.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
      const text = line.replace(/\[[^\]]*\]/g, '').trim();
      return text ? matches.map(m => ({ time: Number(m[1]) * 60 + Number(m[2]), text })) : [];
    }).sort((a, b) => a.time - b.time);
    this.updateLyric();
  }

  private updateLyric(): void {
    let text = '';
    for (const line of this.lyrics) {
      if (line.time > this.state.currentTime) break;
      text = line.text;
    }
    this.state.currentLyric = text;
  }
  private state: MusicPlaybackState = {
    playing: false,
    currentSong: null,
    currentTime: 0,
    duration: 0,
    mode: "shuffle",
    queue: [],
    queueIndex: -1
  };

  private listeners: MusicStateListener[] = [];
  private favorites: Record<string, MusicSong> = {};
  private albumDetailCache: Map<string, MusicSong[]> = new Map();
  private albumCoverMap: Map<string, string> = new Map();

  private constructor() {
    if (canUseOffscreenAudio()) {
      subscribeOffscreenAudioState((source, remote) => {
        if (source === "music") this.applyOffscreenState(remote as OffscreenMusicState);
      });
      void fetchOffscreenAudioState().then((snapshot) => {
        if (snapshot?.music) this.applyOffscreenState(snapshot.music);
      });
    } else if (typeof window !== "undefined" && typeof Audio !== "undefined") {
      this.audio = new Audio();
      this.audio.crossOrigin = "anonymous";
      this.audio.preload = "none";
      this.bindAudioEvents();
    }
    this.initStorage();
    if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
      chrome.storage.onChanged.addListener((changes: Record<string, any>, area: string) => {
        if (area !== 'local' || !changes[MUSIC_FAV_KEY]) return;
        const next = changes[MUSIC_FAV_KEY].newValue;
        this.favorites = next && typeof next === 'object' && !Array.isArray(next) ? next : {};
        this.notify();
      });
    }
  }

  public static getInstance(): MusicService {
    if (!MusicService.instance) {
      MusicService.instance = new MusicService();
    }
    return MusicService.instance;
  }

  public getAudioElement(): HTMLAudioElement | null {
    return this.audio;
  }

  private async initStorage(): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const res = await chrome.storage.local.get([MUSIC_FAV_KEY]);
      if (res[MUSIC_FAV_KEY]) {
        this.favorites = res[MUSIC_FAV_KEY];
      }
    }
  }

  private bindAudioEvents(): void {
    if (!this.audio) return;

    let lastTimeUpdate = 0;
    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio) return;
      const now = performance.now();
      // 节流约束为最多每 250ms 通知一次，防止高频触发全局多个组件虚拟 DOM Diff
      if (now - lastTimeUpdate < 250) return;
      lastTimeUpdate = now;
      this.state.currentTime = this.audio.currentTime || 0;
      this.updateLyric();
      if (this.audio.duration && !Number.isNaN(this.audio.duration)) {
        this.state.duration = this.audio.duration;
      }
      this.notify();
    });

    const updateDuration = () => {
      if (!this.audio) return;
      if (this.audio.duration && !Number.isNaN(this.audio.duration)) {
        this.state.duration = this.audio.duration;
        this.notify();
      }
    };
    this.audio.addEventListener("loadedmetadata", updateDuration);
    this.audio.addEventListener("durationchange", updateDuration);
    this.audio.addEventListener("canplay", updateDuration);

    this.audio.addEventListener("play", () => {
      this.state.playing = true;
      this.notify();
    });

    this.audio.addEventListener("pause", () => {
      this.state.playing = false;
      this.notify();
    });

    this.audio.addEventListener("ended", () => {
      this.handleSongEnded();
    });

    this.audio.addEventListener("error", (err) => {
      console.warn("[MusicService] Audio playback error:", err);
      this.state.playing = false;
      this.notify();
    });
  }

  private handleSongEnded(): void {
    if (this.state.mode === "one") {
      if (this.audio) {
        this.audio.currentTime = 0;
        void this.audio.play();
      }
      return;
    }
    this.next();
  }

  public subscribe(listener: MusicStateListener): () => void {
    this.listeners.push(listener);
    listener({ ...this.state });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    const copy = { ...this.state };
    for (const l of this.listeners) {
      try {
        l(copy);
      } catch (err) {
        console.error("[MusicService] Listener error:", err);
      }
    }
  }

  public getState(): MusicPlaybackState {
    return { ...this.state };
  }

  // ==========================================================================
  // 塞壬唱片 (Monster Siren) API
  // ==========================================================================
  public async getSirenSongs(): Promise<MusicSong[]> {
    if (this.albumCoverMap.size === 0) {
      try {
        await this.getSirenAlbums();
      } catch {}
    }
    const res = await fetch(`${MONSTER_SIREN_API}/songs`, { headers: { Accept: "application/json" } });
    const json = await res.json();
    const list = json.data?.list || json.data || [];
    return list.map((item: any) => ({
      cid: item.cid,
      name: item.name,
      artists: item.artists || [],
      albumCid: item.albumCid,
      coverUrl: (item.albumCid && this.albumCoverMap.get(String(item.albumCid))) || ""
    }));
  }

  public async getSirenAlbums(): Promise<MusicAlbum[]> {
    const res = await fetch(`${MONSTER_SIREN_API}/albums`, { headers: { Accept: "application/json" } });
    const json = await res.json();
    const list = json.data || [];
    const albums: MusicAlbum[] = list.map((item: any) => ({
      cid: item.cid,
      name: item.name,
      coverUrl: item.coverUrl
    }));
    for (const a of albums) {
      if (a.cid && a.coverUrl) {
        this.albumCoverMap.set(String(a.cid), a.coverUrl);
      }
    }
    return albums;
  }

  public async getSirenAlbumDetail(albumCid: string | number): Promise<MusicSong[]> {
    const cacheKey = String(albumCid);
    if (this.albumDetailCache.has(cacheKey)) {
      return this.albumDetailCache.get(cacheKey)!;
    }

    const res = await fetch(`${MONSTER_SIREN_API}/album/${albumCid}/detail`, { headers: { Accept: "application/json" } });
    const json = await res.json();
    const songsRaw = json.data?.songs || [];
    const coverUrl = json.data?.coverUrl || "";

    const songs: MusicSong[] = songsRaw.map((s: any) => ({
      cid: s.cid,
      name: s.name,
      artists: s.artists || s.artistes || [],
      albumCid,
      coverUrl
    }));

    this.albumDetailCache.set(cacheKey, songs);
    return songs;
  }

  public async getSirenSongUrl(cid: string | number): Promise<{ sourceUrl: string; lyricUrl?: string }> {
    const res = await fetch(`${MONSTER_SIREN_API}/song/${cid}`, { headers: { Accept: "application/json" } });
    const json = await res.json();
    return {
      sourceUrl: json.data?.sourceUrl || "",
      lyricUrl: json.data?.lyricUrl
    };
  }

  // ==========================================================================
  // 回放控制
  // ==========================================================================
  private applyOffscreenState(remote: OffscreenMusicState): void {
    this.state.playing = Boolean(remote.playing);
    this.state.currentSong = remote.currentSong;
    this.state.currentTime = Number(remote.currentTime) || 0;
    this.state.duration = Number(remote.duration) || 0;
    this.state.mode = remote.mode || this.state.mode;
    this.state.queue = Array.isArray(remote.queue) ? remote.queue : [];
    this.state.queueIndex = typeof remote.queueIndex === "number" ? remote.queueIndex : -1;
    this.state.currentLyric = remote.currentLyric || "";
    this.notify();
  }

  public async playSong(song: MusicSong, options: MusicPlayOptions = {}): Promise<boolean> {
    const useOffscreen = canUseOffscreenAudio();
    if ((!useOffscreen && !this.audio) || options.isCurrent?.() === false) return false;
    const version = ++this.playVersion;
    const current = () => version === this.playVersion && options.isCurrent?.() !== false;

    if (!song.coverUrl && song.albumCid) {
      song.coverUrl = this.albumCoverMap.get(String(song.albumCid)) || "";
    }
    this.state.currentSong = song;
    this.state.currentTime = 0;
    this.lyrics = [];
    this.state.currentLyric = '';

    // A directly selected song must not inherit another source's queue.
    if (this.state.queue.some(s => !!s.isNetease !== !!song.isNetease)) this.state.queue = [];
    if (!this.state.queue.some((s) => String(s.cid) === String(song.cid))) {
      this.state.queue.push(song);
    }
    this.state.queueIndex = this.state.queue.findIndex((s) => String(s.cid) === String(song.cid));

    try {
      let playUrl = "";
      if (song.isNetease && song.neteaseId) {
        // 网易云音乐 URL 获取：优先通过 NeteaseService 获取，带外链兜底
        void neteaseService.getSongLyric(song.neteaseId).then(raw => {
          if (current()) {
            this.setLyrics(raw);
            this.notify();
            if (useOffscreen) void sendAudioCommand("music", "set-lyrics", { lyrics: this.lyrics });
          }
        });
        playUrl = await neteaseService.getSongAudioUrl(song.neteaseId);
      } else {
        // 塞壬唱片
        const detail = await this.getSirenSongUrl(song.cid);
        if (detail.lyricUrl) {
          void fetch(detail.lyricUrl).then(res => res.ok ? res.text() : '').then(raw => {
            if (current()) {
              this.setLyrics(raw);
              this.notify();
              if (useOffscreen) void sendAudioCommand("music", "set-lyrics", { lyrics: this.lyrics });
            }
          }).catch(() => {});
        }
        playUrl = detail.sourceUrl;
      }

      if (!current()) return false;
      if (playUrl) {
        if (useOffscreen) {
          await sendAudioCommand("music", "play-url", {
            song,
            url: playUrl,
            lyrics: this.lyrics,
            queue: this.state.queue,
            queueIndex: this.state.queueIndex,
            mode: this.state.mode,
            autoplay: options.autoplay !== false,
          });
          if (!current()) return false;
          this.state.playing = options.autoplay !== false;
          this.notify();
          return true;
        }
        this.audio!.src = playUrl;
        if (options.autoplay !== false) await this.audio!.play();
        if (!current()) return false;
        this.state.playing = !this.audio!.paused;
        this.notify();
        return true;
      }
    } catch (err) {
      if (!current()) return false;
      console.error("[MusicService] Play song failed:", err);
      this.state.playing = false;
      this.notify();
    }
    return false;
  }

  public async playNeteaseSong(rawSong: any, options: MusicPlayOptions = {}): Promise<boolean> {
    if (!rawSong || options.isCurrent?.() === false) return false;
    neteaseService.addRecentSong(rawSong);
    return this.playSong(toNeteaseMusicSong(rawSong), options);
  }

  public togglePlay(): void {
    if (canUseOffscreenAudio()) {
      void sendAudioCommand("music", "toggle");
      return;
    }
    if (!this.audio) return;
    if (this.state.playing) {
      this.audio.pause();
    } else if (this.audio.src) {
      void this.audio.play();
    }
  }

  public seek(percent: number): void {
    if (canUseOffscreenAudio()) {
      void sendAudioCommand("music", "seek", { percent });
      return;
    }
    if (!this.audio || !this.audio.duration) return;
    const target = (Math.max(0, Math.min(100, percent)) / 100) * this.audio.duration;
    this.audio.currentTime = target;
  }

  public setPlayMode(mode: PlayMode): void {
    this.state.mode = mode;
    if (canUseOffscreenAudio()) void sendAudioCommand("music", "set-mode", { mode });
    this.notify();
  }

  public cyclePlayMode(): PlayMode {
    const modes: PlayMode[] = ["list", "one", "shuffle"];
    const curIdx = modes.indexOf(this.state.mode);
    const nextMode = modes[(curIdx + 1) % modes.length];
    this.setPlayMode(nextMode);
    return nextMode;
  }

  public next(): void {
    if (!this.state.queue.length) return;
    if (this.state.mode === "shuffle") {
      const randIdx = Math.floor(Math.random() * this.state.queue.length);
      void this.playSong(this.state.queue[randIdx]);
    } else {
      const nextIdx = (this.state.queueIndex + 1) % this.state.queue.length;
      void this.playSong(this.state.queue[nextIdx]);
    }
  }

  public prev(): void {
    if (!this.state.queue.length) return;
    if (this.state.mode === "shuffle") {
      const randIdx = Math.floor(Math.random() * this.state.queue.length);
      void this.playSong(this.state.queue[randIdx]);
    } else {
      const prevIdx = (this.state.queueIndex - 1 + this.state.queue.length) % this.state.queue.length;
      void this.playSong(this.state.queue[prevIdx]);
    }
  }

  public setQueue(songs: MusicSong[], startIndex = -1, autoPlay = false): void {
    this.state.queue = [...songs];
    this.state.queueIndex = startIndex;
    if (canUseOffscreenAudio()) {
      void sendAudioCommand("music", "set-queue", { queue: this.state.queue, queueIndex: startIndex });
    }
    if (startIndex >= 0 && songs[startIndex]) {
      this.state.currentSong = songs[startIndex];
      this.notify();
      if (autoPlay) {
        void this.playSong(songs[startIndex]);
      }
    }
  }

  // ==========================================================================
  // 收藏管理
  // ==========================================================================
  public isLiked(cid: string | number): boolean {
    return Boolean(this.favorites[String(cid)]);
  }

  public toggleLike(song: MusicSong): boolean {
    const key = String(song.cid);
    const nowLiked = !this.favorites[key];
    if (nowLiked) {
      this.favorites[key] = song;
    } else {
      delete this.favorites[key];
    }
    this.persistFavorites();
    this.notify();
    return nowLiked;
  }

  public getFavorites(): MusicSong[] {
    return Object.values(this.favorites);
  }

  private persistFavorites(): void {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [MUSIC_FAV_KEY]: this.favorites });
    }
  }
}

export const musicService = MusicService.getInstance();
