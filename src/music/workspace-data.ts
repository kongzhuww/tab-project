import { reactive } from "vue";
import { neteaseService, type NeteasePlaylist, type NeteaseSong, type NeteaseUser } from "../services/netease.service";
import { musicModuleState, withMusicWrite } from "./module-state";

import { CACHED_PLAYLISTS_KEY, CACHED_FAVORITES_KEY, readPlaylistCache, writePlaylistCache, removePlaylistCache } from "./playlist-cache";

// This view owns browsing and explicit website-session connection, not the shared player.
export function createMusicWorkspaceData(canRead: () => boolean) {
  const state = reactive({
    neteaseUser: null as NeteaseUser | null,
    neteasePlaylists: [] as NeteasePlaylist[], neteaseActivePlaylist: null as NeteasePlaylist | null,
    neteaseSongs: [] as NeteaseSong[], neteaseSearchResults: [] as NeteaseSong[],
    neteaseRecentSongs: [] as NeteaseSong[],
    neteaseLoading: false, message: ""
  });
  let disposed = false, version = 0;
  let request: AbortController | undefined;
  let pollTimer: ReturnType<typeof setTimeout> | undefined;
  function syncLocal() {
    if (disposed) return;
    state.neteaseUser = neteaseService.getUser();
    state.neteaseRecentSongs = neteaseService.getRecentSongs();
    if (!state.neteasePlaylists.length) {
      try {
        const parsed = readPlaylistCache<NeteasePlaylist>(CACHED_PLAYLISTS_KEY);
        if (parsed.length) {
          if (Array.isArray(parsed) && parsed.length) {
            state.neteasePlaylists = parsed;
            const fav = parsed.find(p => p.name?.includes("喜欢的音乐") || p.specialType === 5) || parsed[0];
            if (fav && !state.neteaseActivePlaylist) state.neteaseActivePlaylist = fav;
          }
        }
      } catch {}
    }
    if (!state.neteaseSongs.length) {
      try {
        const parsed = readPlaylistCache<NeteaseSong>(CACHED_FAVORITES_KEY);
        if (parsed.length) {
          if (Array.isArray(parsed) && parsed.length) {
            state.neteaseSongs = parsed;
          }
        }
      } catch {}
    }
  }
  function pause() {
    version++; request?.abort(); request = undefined; state.neteaseLoading = false;
    if (pollTimer !== undefined) clearTimeout(pollTimer);
    pollTimer = undefined;

  }
  async function read(operation: (signal: AbortSignal, current: () => boolean) => Promise<void>) {
    if (disposed || !canRead()) return;
    if (musicModuleState.pendingWrites) { state.message = "音乐操作正在处理，请稍候；未自动排队。"; return; }
    pause(); const controller = new AbortController(), generation = version;
    request = controller; state.neteaseLoading = true; state.message = "";
    const current = () => !disposed && canRead() && version === generation && !controller.signal.aborted;
    try { await neteaseService.whenReady(); if (current()) await operation(controller.signal, current); }
    catch (err: any) {
      if (current()) {
        state.message = err?.message || "读取失败，请检查节点设置或网络后手动重试。";
      }
    }
    finally { if (request === controller) { request = undefined; state.neteaseLoading = false; } }
  }
  async function tracks(id: string | number, signal: AbortSignal, limit = 500, offset = 0): Promise<NeteaseSong[]> {
    try {
      const data = await neteaseService.request("/playlist/track/all", { id, limit, offset }, signal);
      if (data.songs?.length) return data.songs;
    } catch { signal.throwIfAborted(); }
    if (offset === 0) {
      const data = await neteaseService.request("/playlist/detail", { id }, signal);
      return data.playlist?.tracks || [];
    }
    return [];
  }
  async function refresh() {
    await read(async (signal, current) => {
      syncLocal();
      const user = state.neteaseUser;
      const uid = user?.uid;
      let lists: NeteasePlaylist[] = [];
      if (uid) {
        try {
          const res = await neteaseService.request("/user/playlist", { uid, limit: 100 }, signal);
          lists = res.playlist || [];
        } catch (e: any) {
          if (current()) state.message = e?.message || "官网歌单读取失败，请重新连接账户。";
          return;
        }
      }
      if (!lists.length) {
        try {
          const res = await neteaseService.request("/toplist", {}, signal);
          lists = res.list || [];
        } catch {}
      }
      if (!current()) return;
      if (lists.length) {
        state.neteasePlaylists = lists;
        try {
          writePlaylistCache(CACHED_PLAYLISTS_KEY, lists);
        } catch {}
      }
      const selected = lists.find(p => p.id === state.neteaseActivePlaylist?.id)
        || lists.find(p => p.name?.includes("喜欢的音乐") || p.specialType === 5)
        || lists[0];
      if (!selected) return;

      // 阶段 1：首屏快速就绪（先拉前 10 首让界面瞬间渲染完成）
      if (!state.neteaseSongs.length) {
        try {
          const first10 = await tracks(selected.id, signal, 10, 0);
          if (current() && !state.neteaseSongs.length) {
            state.neteaseActivePlaylist = selected;
            state.neteaseSongs = first10;
            state.neteaseLoading = false;
          }
        } catch {}
      }

      // 阶段 2：后台静默加载好全量曲目
      const songs = await tracks(selected.id, signal, 500, 0);
      if (current()) {
        state.neteaseActivePlaylist = selected;
        state.neteaseSongs = songs;
        if (selected.name?.includes("喜欢的音乐") || selected.specialType === 5) {
          try {
            writePlaylistCache(CACHED_FAVORITES_KEY, songs);
          } catch {}
        }
      }
    });
  }
  async function selectPlaylist(playlist: NeteasePlaylist) {
    await read(async (signal, current) => {
      const uid = neteaseService.getUser()?.uid;
      state.neteaseActivePlaylist = playlist;

      // 阶段 1：首屏先拉前 10 首瞬间加载展现
      if (!state.neteaseSongs.length || state.neteaseActivePlaylist?.id !== playlist.id) {
        try {
          const first10 = await tracks(playlist.id, signal, 10, 0);
          if (current() && uid === neteaseService.getUser()?.uid && (!state.neteaseSongs.length || state.neteaseActivePlaylist?.id !== playlist.id)) {
            state.neteaseSongs = first10;
            state.neteaseLoading = false;
          }
        } catch {}
      }

      // 阶段 2：后台静默加载好（拉取全量曲库并在内存中就绪，翻页 0 延迟）
      const songs = await tracks(playlist.id, signal, 500, 0);
      if (current() && uid === neteaseService.getUser()?.uid) {
        state.neteaseActivePlaylist = playlist;
        state.neteaseSongs = songs;
      }
    });
  }
  async function search(query: string) {
    if (!query.trim()) { pause(); state.neteaseSearchResults = []; return; }
    await read(async (signal, current) => {
      state.neteaseSearchResults = [];
      const uid = neteaseService.getUser()?.uid;
      let songs: NeteaseSong[] = [];
      try { songs = (await neteaseService.request("/cloudsearch", { keywords: query.trim(), type: 1, limit: 60 }, signal)).result?.songs || []; }
      catch { signal.throwIfAborted(); }
      if (!songs.length) songs = (await neteaseService.request("/search", { keywords: query.trim(), limit: 60 }, signal)).result?.songs || [];
      if (current() && uid === neteaseService.getUser()?.uid) state.neteaseSearchResults = songs;
    });
  }
  async function mutate(operation: () => Promise<void>) {
    if (disposed || !canRead()) return;
    if (musicModuleState.pendingWrites) { state.message = "音乐操作正在处理，请稍候；未自动排队。"; return; }
    try { await withMusicWrite(operation); }
    catch { if (!disposed) state.message = "操作未完整完成，部分变更可能已保存，请重读核对；未自动重试。"; }
  }
  async function connectWebsite() {
    if (disposed || !canRead()) throw new Error("请先打开网易云模块。");
    pause();
    await neteaseService.connectWebsiteAccount();
    removePlaylistCache(CACHED_PLAYLISTS_KEY);
    removePlaylistCache(CACHED_FAVORITES_KEY);
    if (disposed || !canRead()) return;
    syncLocal();
    await refresh();
  }
  async function logout() {
    pause();
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("netease_explicit_logout", "true");
        removePlaylistCache(CACHED_FAVORITES_KEY);
        removePlaylistCache(CACHED_PLAYLISTS_KEY);
      } catch {}
    }
    await mutate(async () => {
      await neteaseService.logout();
      state.neteaseUser = null;
      state.neteasePlaylists = [];
      state.neteaseActivePlaylist = null;
      state.neteaseSongs = [];
      state.neteaseSearchResults = [];
      state.message = "已断开插件账户；可点击「连接官网账户」重新连接，不影响官网登录。";
    });
  }
  async function syncHistory() {
    await mutate(async () => {
      // Revalidate using the website session, without extracting cookies.
      await neteaseService.connectWebsiteAccount();
      // 2. 拉取最近播放
      await neteaseService.fetchAccountRecentSongs(60);
      syncLocal();
      // 3. 刷新最新歌单与喜欢歌曲
      void refresh();
      state.message = "✓ 账号历史与歌单已同步刷新！";
    });
  }
  async function clearRecent() { await mutate(async () => { await neteaseService.clearRecentSongs(); syncLocal(); }); }
  function accountChanged() {
    if (disposed) return;
    pause(); syncLocal();
    state.neteasePlaylists = []; state.neteaseSongs = []; state.neteaseSearchResults = [];
    state.neteaseActivePlaylist = null;
    state.message = "账号资料发生变化，请核对；需要时手动刷新歌单。";

  }
  function dispose() { disposed = true; pause(); }
  return { state, refresh, selectPlaylist, search, connectWebsite, logout, clearRecent, syncLocal, pause, dispose, accountChanged, syncHistory };
}
