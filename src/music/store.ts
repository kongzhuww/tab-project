import { reactive, readonly, type DeepReadonly } from "vue";
import { musicService } from "../services/music.service";
import { neteaseService, type NeteaseUser, type NeteasePlaylist, type NeteaseSong } from "../services/netease.service";
import { musicModuleState } from "./module-state";
import { CACHED_FAVORITES_KEY, CACHED_PLAYLISTS_KEY, readPlaylistCache } from "./playlist-cache";

export type PlayMode = "list" | "one" | "shuffle";
export type PickerTab = "songs" | "albums" | "favorites" | "netease";

let neteaseQrPollTimer: ReturnType<typeof setInterval> | null = null;

export interface MusicSong {
  cid: string | number;
  name: string;
  artists?: string[];
  coverUrl?: string;
  albumCid?: string | number;
  isNetease?: boolean;
  neteaseId?: string | number;
  rawSong?: any;
}

export interface MusicAlbum {
  cid: string | number;
  name: string;
  coverUrl?: string;
  _songs?: MusicSong[];
}

export interface HomeMusicSnapshot {
  mounted: boolean;
  playing: boolean;
  title: string;
  artist: string;
  coverUrl: string;
  currentTime: number;
  duration: number;
  formattedCurrent: string;
  formattedDuration: string;
  progressPercent: number;
  liked: boolean;
  mode: PlayMode;
  pickerOpen: boolean;
  pickerTab: PickerTab;
  searchQuery: string;
  activeAlbum: MusicAlbum | null;
  songs: MusicSong[];
  albums: MusicAlbum[];
  favorites: MusicSong[];
  loadingAlbums: boolean;
  isNetease?: boolean;
  isBiliRadio?: boolean;
  biliRadioSeriesName?: string;
  currentLyric?: string;
  neteaseUser: NeteaseUser | null;
  neteasePlaylists: NeteasePlaylist[];
  neteaseActivePlaylist: NeteasePlaylist | null;
  neteaseSongs: NeteaseSong[];
  neteaseSearchResults: NeteaseSong[];
  neteaseRecentSongs: NeteaseSong[];
  neteaseQrImg: string;
  neteaseQrStatus: string;
  neteaseLoading: boolean;
}

export interface HomeMusicActions {
  playCid?: (cid: string | number) => void;
  togglePlay?: () => void;
  prev?: () => void;
  next?: () => void;
  toggleLike?: () => void;
  cycleMode?: () => void;
  seek?: (percent: number) => void;
  openPanel?: () => void;
  loadAlbumDetail?: (album: MusicAlbum) => Promise<void>;
}

export interface HomeMusicController {
  getSnapshot(): DeepReadonly<HomeMusicSnapshot>;
  update(partial: Partial<HomeMusicSnapshot>): void;
  setMounted(mounted: boolean): void;
  setPlaying(playing: boolean): void;
  setTrack(title: string, artist: string, coverUrl: string): void;
  setProgress(currentTime: number, duration: number): void;
  setLiked(liked: boolean): void;
  setMode(mode: PlayMode): void;
  togglePicker(forceState?: boolean): void;
  setPickerTab(tab: PickerTab): void;
  setSearchQuery(query: string): void;
  setActiveAlbum(album: MusicAlbum | null): void;
  setSongs(songs: MusicSong[]): void;
  setAlbums(albums: MusicAlbum[]): void;
  setFavorites(favorites: MusicSong[]): void;
  setActions(actions: Partial<HomeMusicActions>): void;
  playTrack(cid: string | number): void;
  togglePlay(): void;
  prev(): void;
  next(): void;
  toggleLike(): void;
  cycleMode(): void;
  seek(percent: number): void;
  openPanel(): void;
  openNetease(): void;
  loadNeteaseData(): Promise<void>;
  selectNeteasePlaylist(playlist: NeteasePlaylist | null): Promise<void>;
  searchNetease(query: string): Promise<void>;
  playNeteaseTrack(rawSong: any): void;
  syncFromBiliRadio(payload: { playing: boolean; title: string; artist: string; coverUrl: string; currentTime: number; duration: number; lyric: string; seriesName?: string }): void;
  startNeteaseQrLogin(): Promise<void>;
  stopNeteaseQrLogin(): void;
  logoutNetease(): Promise<void>;
  clearNeteaseRecent(): void;
  refreshRecentSongs(): void;
}

function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  return m + ":" + String(Math.floor(s % 60)).padStart(2, "0");
}

export const DEFAULT_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E";

export const DEFAULT_SIREN_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E";

const initialState = (): HomeMusicSnapshot => ({
  mounted: false,
  playing: false,
  title: "点击播放",
  artist: "作者",
  coverUrl: DEFAULT_SIREN_COVER,
  currentTime: 0,
  duration: 0,
  formattedCurrent: "0:00",
  formattedDuration: "0:00",
  progressPercent: 0,
  liked: false,
  mode: "shuffle",
  pickerOpen: false,
  pickerTab: "songs",
  searchQuery: "",
  activeAlbum: null,
  songs: [],
  albums: [],
  favorites: [],
  loadingAlbums: false,
  isNetease: false,
  isBiliRadio: false,
  biliRadioSeriesName: "",
  currentLyric: "",
  neteaseUser: null,
  neteasePlaylists: [],
  neteaseActivePlaylist: null,
  neteaseSongs: [],
  neteaseSearchResults: [],
  neteaseRecentSongs: neteaseService.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: false
});

export const homeMusicState = reactive<HomeMusicSnapshot>(initialState());

let boundActions: HomeMusicActions = {};

export const homeMusicController: HomeMusicController = {
  getSnapshot() {
    return readonly(homeMusicState);
  },
  update(partial) {
    Object.assign(homeMusicState, partial);
  },
  setMounted(mounted) {
    homeMusicState.mounted = mounted;
  },
  setPlaying(playing) {
    homeMusicState.playing = playing;
  },
  setTrack(title, artist, coverUrl) {
    homeMusicState.title = title || "点击播放";
    homeMusicState.artist = artist || "作者";
    homeMusicState.coverUrl = coverUrl || "";
  },
  setProgress(currentTime, duration) {
    homeMusicState.currentTime = currentTime;
    homeMusicState.duration = duration;
    homeMusicState.formattedCurrent = formatTime(currentTime);
    homeMusicState.formattedDuration = formatTime(duration);
    if (duration > 0) {
      homeMusicState.progressPercent = Math.min(100, Math.max(0, (currentTime / duration) * 100));
    } else {
      homeMusicState.progressPercent = 0;
    }
  },
  setLiked(liked) {
    homeMusicState.liked = liked;
  },
  setMode(mode) {
    homeMusicState.mode = mode;
  },
  togglePicker(forceState) {
    if (forceState !== undefined) {
      musicModuleState.visible = forceState;
    } else {
      musicModuleState.visible = !musicModuleState.visible;
    }
  },
  setPickerTab(tab) {
    homeMusicState.pickerTab = tab;
    homeMusicState.activeAlbum = null;
  },
  setSearchQuery(query) {
    homeMusicState.searchQuery = query;
  },
  setActiveAlbum(album) {
    homeMusicState.activeAlbum = album;
  },
  setSongs(songs) {
    homeMusicState.songs = songs;
  },
  setAlbums(albums) {
    homeMusicState.albums = albums;
  },
  setFavorites(favorites) {
    homeMusicState.favorites = favorites;
  },
  setActions(actions) {
    boundActions = { ...boundActions, ...actions };
  },
  playTrack(cid) {
    homeMusicState.isBiliRadio = false;
    const g = window as any;
    if (g.LogicWeaverBiliRadioPlayer?.getState?.()?.playing) {
      g.LogicWeaverBiliRadioPlayer.toggle();
    }
    if (boundActions.playCid) {
      boundActions.playCid(cid);
    } else {
      const albumSongs = homeMusicState.activeAlbum?._songs || [];
      const allSongs = [...homeMusicState.songs, ...homeMusicState.favorites, ...albumSongs];
      const target = allSongs.find((s) => String(s.cid) === String(cid));
      if (target) {
        void musicService.playSong(target);
      } else {
        void musicService.playSong({ cid, name: "塞壬唱片", artists: ["塞壬唱片"] });
      }
      window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid } }));
    }
  },
  togglePlay() {
    if (homeMusicState.isBiliRadio) {
      const g = window as any;
      if (typeof g.LogicWeaverBiliRadioPlayer?.toggle === "function") {
        g.LogicWeaverBiliRadioPlayer.toggle();
        return;
      }
    }
    if (boundActions.togglePlay) {
      boundActions.togglePlay();
    } else {
      musicService.togglePlay();
      window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play"));
    }
  },
  prev() {
    if (homeMusicState.isBiliRadio) {
      const g = window as any;
      if (typeof g.LogicWeaverBiliRadioPlayer?.prev === "function") {
        g.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    if (boundActions.prev) {
      boundActions.prev();
    } else {
      musicService.prev();
      window.dispatchEvent(new CustomEvent("logicweaver:music-prev"));
    }
  },
  next() {
    if (homeMusicState.isBiliRadio) {
      const g = window as any;
      if (typeof g.LogicWeaverBiliRadioPlayer?.next === "function") {
        g.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    if (boundActions.next) {
      boundActions.next();
    } else {
      musicService.next();
      window.dispatchEvent(new CustomEvent("logicweaver:music-next"));
    }
  },
  toggleLike() {
    if (boundActions.toggleLike) {
      boundActions.toggleLike();
    } else {
      const current = musicService.getState().currentSong;
      if (current) {
        homeMusicState.liked = musicService.toggleLike(current);
        homeMusicState.favorites = musicService.getFavorites();
      }
      window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (boundActions.cycleMode) {
      boundActions.cycleMode();
    } else {
      const mode = musicService.cyclePlayMode();
      homeMusicState.mode = mode;
      window.dispatchEvent(new CustomEvent("logicweaver:music-cycle-mode"));
    }
  },
  seek(percent) {
    if (homeMusicState.isBiliRadio) {
      const g = window as any;
      if (typeof g.LogicWeaverBiliRadioPlayer?.seek === "function") {
        g.LogicWeaverBiliRadioPlayer.seek(percent);
        return;
      }
    }
    if (boundActions.seek) {
      boundActions.seek(percent);
    } else {
      musicService.seek(percent);
      window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent } }));
    }
  },
  openPanel() {
    if (boundActions.openPanel) {
      boundActions.openPanel();
    } else {
      homeMusicController.togglePicker(true);
      window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel"));
    }
  },
  openNetease() {
    homeMusicState.pickerTab = "netease";
    homeMusicState.pickerOpen = true;
    homeMusicState.activeAlbum = null;
    void this.loadNeteaseData();
  },
  async loadNeteaseData() {
    homeMusicState.neteaseUser = neteaseService.getUser();
    homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
    homeMusicState.neteaseLoading = true;
    try {
      const [playlists] = await Promise.all([
        neteaseService.getPlaylists(),
        neteaseService.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      homeMusicState.neteasePlaylists = playlists;
      homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
      if (playlists.length > 0) {
        const favPlaylist = playlists.find(p => p.name.includes("喜欢的音乐") || p.name.includes("Favorite")) || playlists[0];
        if (!homeMusicState.neteaseActivePlaylist || homeMusicState.neteaseActivePlaylist.id !== favPlaylist.id) {
          await this.selectNeteasePlaylist(favPlaylist);
        }
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      homeMusicState.neteaseLoading = false;
      homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
    }
  },
  async selectNeteasePlaylist(playlist: NeteasePlaylist | null) {
    homeMusicState.neteaseActivePlaylist = playlist;
    if (!playlist) {
      homeMusicState.neteaseSongs = [];
      return;
    }
    homeMusicState.neteaseLoading = true;
    try {
      // 阶段 1：首屏快速就绪（前 10 首瞬间加载）
      if (!homeMusicState.neteaseSongs.length) {
        try {
          const first10 = await neteaseService.getPlaylistTracks(playlist.id, 10, 0);
          if (homeMusicState.neteaseActivePlaylist?.id === playlist.id && !homeMusicState.neteaseSongs.length) {
            homeMusicState.neteaseSongs = first10;
            homeMusicState.neteaseLoading = false;
          }
        } catch {}
      }
      // 阶段 2：后台静默加载好全量曲库
      const songs = await neteaseService.getPlaylistTracks(playlist.id, 500, 0);
      if (homeMusicState.neteaseActivePlaylist?.id === playlist.id) {
        homeMusicState.neteaseSongs = songs;
      }
    } catch (e) {
      console.warn("[MusicStore] Load playlist tracks error:", e);
    } finally {
      homeMusicState.neteaseLoading = false;
    }
  },
  async searchNetease(query: string) {
    const clean = query.trim();
    if (!clean) {
      homeMusicState.neteaseSearchResults = [];
      return;
    }
    homeMusicState.neteaseLoading = true;
    try {
      const songs = await neteaseService.searchSongs(clean);
      homeMusicState.neteaseSearchResults = songs;
    } catch (e) {
      console.warn("[MusicStore] Search netease error:", e);
    } finally {
      homeMusicState.neteaseLoading = false;
    }
  },
  syncFromBiliRadio(payload: {
    playing: boolean;
    title: string;
    artist: string;
    coverUrl: string;
    currentTime: number;
    duration: number;
    lyric: string;
    seriesName?: string;
  }) {
    homeMusicState.isBiliRadio = true;
    homeMusicState.isNetease = false;
    homeMusicState.playing = payload.playing;
    homeMusicState.title = payload.title || "B站电台";
    homeMusicState.artist = payload.artist || payload.seriesName || "哔哩哔哩";
    if (payload.coverUrl) homeMusicState.coverUrl = payload.coverUrl;
    homeMusicState.currentTime = payload.currentTime;
    homeMusicState.duration = payload.duration;
    homeMusicState.formattedCurrent = formatTime(payload.currentTime);
    homeMusicState.formattedDuration = formatTime(payload.duration);
    homeMusicState.progressPercent = payload.duration > 0 ? Math.min(100, Math.max(0, (payload.currentTime / payload.duration) * 100)) : 0;
    homeMusicState.currentLyric = payload.lyric || "";
    homeMusicState.biliRadioSeriesName = payload.seriesName || "";
    const audio = musicService.getAudioElement();
    if (payload.playing && audio && !audio.paused) audio.pause();
  },
  playNeteaseTrack(rawSong: any) {
    homeMusicState.isBiliRadio = false;
    const g = window as any;
    if (g.LogicWeaverBiliRadioPlayer?.getState?.()?.playing) {
      g.LogicWeaverBiliRadioPlayer.toggle();
    }
    if (rawSong) {
      neteaseService.recordRecentSong(rawSong);
      homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
    }
    void musicService.playNeteaseSong(rawSong);
  },
  clearNeteaseRecent() {
    void neteaseService.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
  },
  stopNeteaseQrLogin() {
    if (neteaseQrPollTimer) {
      clearInterval(neteaseQrPollTimer);
      neteaseQrPollTimer = null;
    }
  },
  async startNeteaseQrLogin() {
    // Legacy controller entry now uses the official browser session.
    this.stopNeteaseQrLogin();
    try {
      await neteaseService.connectWebsiteAccount();
      homeMusicState.neteaseQrStatus = "官网账户已连接";
      await this.loadNeteaseData();
    } catch (error: any) {
      homeMusicState.neteaseQrStatus = error?.message || "请先在网易云官网登录。";
    }
  },
  async logoutNetease() {
    await neteaseService.logout();
    homeMusicState.neteaseUser = null;
    homeMusicState.neteasePlaylists = [];
    homeMusicState.neteaseActivePlaylist = null;
    homeMusicState.neteaseSongs = [];
    homeMusicState.neteaseSearchResults = [];
  }
};

// 监听 MusicService 响应式播放状态同步
if (typeof window !== "undefined") {
  window.addEventListener("netease:account-updated", () => {
    homeMusicState.neteaseUser = neteaseService.getUser();
    homeMusicState.neteasePlaylists = []; homeMusicState.neteaseSongs = [];
    homeMusicState.neteaseSearchResults = []; homeMusicState.neteaseActivePlaylist = null;
  });
  // 监听最近播放记录更新
  window.addEventListener("netease:recent-updated", (e: any) => {
    if (Array.isArray(e.detail)) {
      homeMusicState.neteaseRecentSongs = e.detail;
    } else {
      homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
    }
  });

  musicService.subscribe((state) => {
    homeMusicState.playing = state.playing;
    homeMusicState.currentTime = state.currentTime;
    homeMusicState.duration = state.duration;
    homeMusicState.formattedCurrent = formatTime(state.currentTime);
    homeMusicState.formattedDuration = formatTime(state.duration);
    if (state.duration > 0) {
      homeMusicState.progressPercent = Math.min(100, Math.max(0, (state.currentTime / state.duration) * 100));
    } else {
      homeMusicState.progressPercent = 0;
    }
    homeMusicState.mode = state.mode;
    homeMusicState.isNetease = !!state.currentSong?.isNetease;
    homeMusicState.currentLyric = state.currentLyric || "";
    if (state.currentSong) {
      homeMusicState.title = state.currentSong.name || "点击播放";
      homeMusicState.artist = (state.currentSong.artists || []).join(", ") || "作者";
      homeMusicState.coverUrl = state.currentSong.coverUrl || "";
      homeMusicState.liked = musicService.isLiked(state.currentSong.cid);
    }
  });
}

// 纯数据预加载
export async function initHomeMusicService(): Promise<void> {
  try {
    homeMusicState.favorites = musicService.getFavorites();
    homeMusicState.neteaseRecentSongs = neteaseService.getRecentSongs();
    homeMusicState.neteaseUser = neteaseService.getUser();

    // 立即秒级同步本地持久化的网易云红心歌曲与歌单
    if (typeof localStorage !== "undefined") {
      try {
        const favorites = readPlaylistCache<NeteaseSong>(CACHED_FAVORITES_KEY);
        if (favorites.length) {
          const parsed = favorites;
          if (Array.isArray(parsed) && parsed.length > 0 && homeMusicState.neteaseSongs.length === 0) {
            homeMusicState.neteaseSongs = parsed;
          }
        }
        const playlists = readPlaylistCache<NeteasePlaylist>(CACHED_PLAYLISTS_KEY);
        if (playlists.length) {
          const parsed = playlists;
          if (Array.isArray(parsed) && parsed.length > 0 && homeMusicState.neteasePlaylists.length === 0) {
            homeMusicState.neteasePlaylists = parsed;
          }
        }
      } catch {}
    }

    const [songs, albums] = await Promise.all([
      musicService.getSirenSongs().catch(() => []),
      musicService.getSirenAlbums().catch(() => [])
    ]);
    if (songs.length > 0 && homeMusicState.songs.length === 0) {
      homeMusicState.songs = songs;
      // 预置曲库队列，但不自动选中或切歌，保持黑胶唱机默认待机态（点击播放）
      musicService.setQueue(songs, -1, false);
    }
    if (albums.length > 0 && homeMusicState.albums.length === 0) {
      homeMusicState.albums = albums;
    }
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
