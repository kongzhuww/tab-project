import { reactive } from "vue";
import { neteaseService, type NeteasePlaylist, type NeteaseSong, type NeteaseUser } from "../services/netease.service";
import { musicModuleState, withMusicWrite } from "./module-state";

import { CACHED_PLAYLISTS_KEY, CACHED_FAVORITES_KEY, readPlaylistCache, writePlaylistCache, removePlaylistCache } from "./playlist-cache";

// This view owns browsing and QR scheduling, never the shared player or home QR timer.
export function createMusicWorkspaceData(canRead: () => boolean) {
  const state = reactive({
    neteaseUser: null as NeteaseUser | null,
    neteasePlaylists: [] as NeteasePlaylist[], neteaseActivePlaylist: null as NeteasePlaylist | null,
    neteaseSongs: [] as NeteaseSong[], neteaseSearchResults: [] as NeteaseSong[],
    neteaseRecentSongs: [] as NeteaseSong[], neteaseQrImg: "", neteaseQrStatus: "",
    neteaseLoading: false, message: ""
  });
  let disposed = false, version = 0;
  let request: AbortController | undefined;
  let pollTimer: ReturnType<typeof setTimeout> | undefined;
  let qrPollTimer: ReturnType<typeof setTimeout> | undefined;
  let qrAbortController: AbortController | null = null;

  function stopQr() {
    if (qrPollTimer !== undefined) {
      clearTimeout(qrPollTimer);
      qrPollTimer = undefined;
    }
    if (qrAbortController) {
      qrAbortController.abort();
      qrAbortController = null;
    }
  }
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
    stopQr();
    if (state.neteaseQrImg) state.neteaseQrStatus = "轮询已暂停，需要时重新扫码；已提交登录确认不会撤回。";
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
          console.warn("[Netease] Fetch user playlist failed:", e);
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
  async function startQr() {
    if (musicModuleState.pendingWrites) return;
    stopQr();

    qrAbortController = new AbortController();
    const signal = qrAbortController.signal;
    state.neteaseQrImg = "";
    state.neteaseQrStatus = "正在生成网易云官方二维码…";

    try {
      await neteaseService.whenReady();
      const key = await neteaseService.generateQrKey(signal);
      if (signal.aborted || disposed) return;
      const image = await neteaseService.createQrImage(key, signal);
      if (signal.aborted || disposed) return;

      state.neteaseQrImg = image;
      state.neteaseQrStatus = "请使用网易云音乐 App 扫码登录";

      const poll = async () => {
        if (signal.aborted || disposed || !canRead()) return;
        try {
          const result = await neteaseService.checkQrStatus(key);
          if (signal.aborted || disposed) return;
          syncLocal();
          if (result.code === 803) {
            state.neteaseQrImg = "";
            state.neteaseQrStatus = "扫码登录成功！正在读取个人歌单…";
            stopQr();
            if (typeof localStorage !== "undefined") {
              try { localStorage.removeItem("netease_explicit_logout"); } catch {}
            }
            void refresh();
            return;
          }
          state.neteaseQrStatus = result.message;
          if (result.code !== 800) {
            qrPollTimer = setTimeout(poll, 2500);
          }
        } catch {
          if (!signal.aborted && !disposed) {
            qrPollTimer = setTimeout(poll, 3000);
          }
        }
      };
      qrPollTimer = setTimeout(poll, 2500);
    } catch (err: any) {
      if (!signal.aborted && !disposed) {
        state.neteaseQrStatus = err?.message || "二维码生成失败，请点击刷新重试";
      }
    }
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
      state.neteaseQrImg = "";
      state.message = "已退出当前网易云账号，可随时点击上方「扫码登录」重新扫码绑定。";
    });
  }
  async function syncHistory() {
    await mutate(async () => {
      // 1. 尝试从浏览器嗅探最新 Cookie 续期
      try {
        const cookie = await neteaseService.detectBrowserCookie();
        if (cookie) await neteaseService.applyCookieAndLogin(cookie);
      } catch {}
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
    state.neteaseActivePlaylist = null; state.neteaseQrImg = "";
    state.message = "账号资料发生变化，请核对；需要时手动刷新歌单。";
  }
  function dispose() { disposed = true; pause(); }
  return { state, refresh, selectPlaylist, search, startQr, logout, clearRecent, syncLocal, pause, dispose, accountChanged, syncHistory };
}
