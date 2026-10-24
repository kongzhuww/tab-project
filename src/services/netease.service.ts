/**
 * NeteaseService — 网易云音乐纯数据服务 (Pure TypeScript, Zero DOM)
 * 物理抽离自历史巨型脚本 music.js，具备完整强类型接口定义：
 * 扫码登录、Cookie 自动嗅探、用户信息解析、歌单/榜单获取、歌曲搜索、无损音源提取与歌词同步
 */

import { loadEndpoint, validateEndpoint } from "../music/settings";

declare const chrome: any;
export const NETEASE_COOKIE_KEY = "neteaseCookie";
export const NETEASE_USER_KEY = "neteaseUserInfo";
export const NETEASE_LIKES_KEY = "neteaseLikedSongIds";
export const NETEASE_RECENT_KEY = "neteaseRecentPlayedSongs";

export interface NeteaseUser {
  uid: string | number;
  nickname: string;
  avatarUrl: string;
  vipType: number;
  isVip: boolean;
  loggedIn: boolean;
}

export interface NeteaseArtist {
  id?: number | string;
  name: string;
}

export interface NeteaseAlbum {
  id?: number | string;
  name?: string;
  picUrl?: string;
}

export interface NeteaseSong {
  id: number | string;
  name: string;
  artists?: NeteaseArtist[];
  ar?: NeteaseArtist[];
  album?: NeteaseAlbum;
  al?: NeteaseAlbum;
  picUrl?: string;
  coverUrl?: string;
  dt?: number;
  duration?: number;
  [key: string]: any;
}

export interface NeteasePlaylist {
  id: number | string;
  name: string;
  coverImgUrl?: string;
  trackCount?: number;
  creator?: {
    userId?: number | string;
    nickname?: string;
  };
  subscribed?: boolean;
  [key: string]: any;
}

export interface NeteaseQrStatus {
  code: number;
  message: string;
  cookie?: string;
}

export class NeteaseService {
  private static instance: NeteaseService;

  private cookie: string = "";
  private user: NeteaseUser | null = null;
  private likedSongIds: Set<number> = new Set();
  private recentSongs: NeteaseSong[] = [];
  private playlistCache: Map<string | number, { songs: NeteaseSong[]; at: number }> = new Map();
  private pendingRequests: Map<string | number, Promise<NeteaseSong[]>> = new Map();

  private readonly storageReady: Promise<void>;
  private constructor() { this.storageReady = this.initStorage(); }
  public whenReady(): Promise<void> { return this.storageReady; }

  public static getInstance(): NeteaseService {
    if (!NeteaseService.instance) {
      NeteaseService.instance = new NeteaseService();
    }
    return NeteaseService.instance;
  }

  public async initStorage(): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const res = await chrome.storage.local.get([
          NETEASE_COOKIE_KEY,
          NETEASE_USER_KEY,
          NETEASE_LIKES_KEY,
          NETEASE_RECENT_KEY
        ]);
        if (res[NETEASE_COOKIE_KEY]) this.cookie = res[NETEASE_COOKIE_KEY];
        if (res[NETEASE_USER_KEY]) this.user = res[NETEASE_USER_KEY];
        if (Array.isArray(res[NETEASE_LIKES_KEY])) {
          this.likedSongIds = new Set(res[NETEASE_LIKES_KEY]);
        }
        if (Array.isArray(res[NETEASE_RECENT_KEY])) {
          this.recentSongs = res[NETEASE_RECENT_KEY];
        }
      } catch (err) {
        console.warn("[NeteaseService] Init storage error:", err);
      }
    }
    // localStorage 兼容与兜底 (确保无扩展环境下或多页即时唤醒)
    if (!this.recentSongs.length && typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(NETEASE_RECENT_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length) {
            this.recentSongs = parsed;
          }
        }
      } catch {}
    }

    // 关键：初始化完成后分发事件，使已挂载的 Vue 组件与 Store 能够即时响应
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
    }
  }

  // ==========================================================================
  // HTTP 底层通用请求封装 (带时间戳、Cookie、超时防抖)
  // ==========================================================================
  public async request<T = any>(endpoint: string, params: Record<string, any> = {}, signal?: AbortSignal): Promise<T> {
    signal?.throwIfAborted();
    const base = validateEndpoint(await loadEndpoint());
    if (!base) throw new Error("尚未配置网易云音乐节点，请在音乐工作区右上角节点设置中填写");
    signal?.throwIfAborted();
    const url = new URL(endpoint.startsWith("http") ? endpoint : `${base}${endpoint}`);
    if (url.origin !== new URL(base).origin || url.username || url.password) throw new Error("网易云请求必须使用已配置节点");

    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    });

    if (this.cookie && !url.searchParams.has("cookie")) {
      url.searchParams.set("cookie", this.cookie);
    }
    url.searchParams.set("timestamp", String(Date.now()));

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" }, credentials: "omit", redirect: "error",
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000)
    });

    if (!res.ok) {
      throw new Error(`[NeteaseAPI] HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    signal?.throwIfAborted();
    return data as T;
  }

  // ==========================================================================
  // 用户鉴权与状态
  // ==========================================================================
  public getUser(): NeteaseUser | null {
    return this.user;
  }

  public getCookie(): string {
    return this.cookie;
  }

  public async fetchUserProfile(): Promise<NeteaseUser | null> {
    try {
      let uid: string | number | null = null;
      let nickname = "网易云用户";
      let avatarUrl = "";
      let vipType = 0;

      // 1. 优先尝试 /login/status
      try {
        const statusRes = await this.request<any>("/login/status");
        const profile = statusRes?.data?.profile || statusRes?.profile;
        const account = statusRes?.data?.account || statusRes?.account;
        uid = profile?.userId || profile?.id || account?.id || account?.userId || null;
        nickname = profile?.nickname || account?.userName || "网易云用户";
        avatarUrl = profile?.avatarUrl || "";
        vipType = profile?.vipType || account?.vipType || 0;
      } catch (e1) {
        console.warn("[NeteaseService] /login/status warning:", e1);
      }

      // 2. 若未拿到 uid，降级尝试 /user/account
      if (!uid) {
        try {
          const accRes = await this.request<any>("/user/account");
          const profile = accRes?.profile;
          const account = accRes?.account;
          uid = profile?.userId || profile?.id || account?.id || account?.userId || null;
          if (profile?.nickname) nickname = profile.nickname;
          if (profile?.avatarUrl) avatarUrl = profile.avatarUrl;
          if (profile?.vipType || account?.vipType) vipType = profile?.vipType || account?.vipType || 0;
        } catch (e2) {
          console.warn("[NeteaseService] /user/account warning:", e2);
        }
      }

      // 3. 补充 /user/detail
      if (uid && (!avatarUrl || nickname === "网易云用户")) {
        try {
          const detailRes = await this.request<any>("/user/detail", { uid });
          if (detailRes?.profile) {
            nickname = detailRes.profile.nickname || nickname;
            avatarUrl = detailRes.profile.avatarUrl || avatarUrl;
            vipType = detailRes.profile.vipType || vipType;
          }
        } catch {}
      }

      if (uid) {
        this.user = {
          uid,
          nickname,
          avatarUrl,
          vipType,
          isVip: Number(vipType) > 0,
          loggedIn: true
        };
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          await chrome.storage.local.set({ [NETEASE_USER_KEY]: this.user });
        }
        await this.fetchLikedSongs();
        return this.user;
      }
    } catch (e) {
      console.warn("[NeteaseService] fetchUserProfile failed:", e);
    }
    return null;
  }

  // ==========================================================================
  // Cookie 自动嗅探与应用登录
  // ==========================================================================
  public async detectBrowserCookie(): Promise<string | null> {
    const map = new Map<string, string>();

    // 1. 从扩展 cookies API 获取
    try {
      if (typeof chrome !== "undefined" && chrome.cookies?.getAll) {
        const queryPromises = [
          chrome.cookies.getAll({ url: "https://music.163.com" }).catch(() => []),
          chrome.cookies.getAll({ url: "https://music.163.com/" }).catch(() => []),
          chrome.cookies.getAll({ domain: "163.com" }).catch(() => []),
          chrome.cookies.getAll({ domain: ".163.com" }).catch(() => []),
          chrome.cookies.getAll({ domain: "music.163.com" }).catch(() => []),
          chrome.cookies.getAll({ domain: ".music.163.com" }).catch(() => []),
          chrome.cookies.getAll({ domain: "126.net" }).catch(() => []),
          chrome.cookies.getAll({ domain: ".126.net" }).catch(() => [])
        ];
        const resultsArray = await Promise.all(queryPromises);
        for (const list of resultsArray) {
          if (Array.isArray(list)) {
            list.forEach((c: any) => {
              if (c?.name && c?.value) map.set(c.name, c.value);
            });
          }
        }

        if (!map.has("MUSIC_U") && chrome.cookies.get) {
          const directU = await chrome.cookies.get({ url: "https://music.163.com", name: "MUSIC_U" }).catch(() => null);
          if (directU?.value) map.set("MUSIC_U", directU.value);
        }
      }
    } catch (e) {
      console.warn("[NeteaseService] Detect browser cookie from Cookies API failed:", e);
    }

    if (map.has("MUSIC_U")) {
      const pairs: string[] = [];
      map.forEach((val, name) => pairs.push(`${name}=${val}`));
      return pairs.join("; ");
    }

    // 2. 从已打开标签页探测
    try {
      if (typeof chrome !== "undefined" && chrome.tabs?.query && chrome.scripting?.executeScript) {
        const tabs = await chrome.tabs.query({});
        const neteaseTabs = (tabs || []).filter((t: any) => {
          const u = (t.url || "").toLowerCase();
          return u.includes("163.com") || u.includes("music.163.com");
        });
        for (const t of neteaseTabs) {
          if (!t.id) continue;
          try {
            const results = await chrome.scripting.executeScript({
              target: { tabId: t.id, allFrames: true },
              func: () => document.cookie || ""
            });
            for (const r of results || []) {
              const docCookie: string = r?.result || "";
              if (docCookie && docCookie.includes("MUSIC_U")) {
                return docCookie;
              }
            }
          } catch {}
        }
      }
    } catch (e) {
      console.warn("[NeteaseService] Detect browser cookie from tabs failed:", e);
    }

    if (map.size > 0 && (map.has("__csrf") || map.has("MUSIC_A") || map.has("NMTID"))) {
      const pairs: string[] = [];
      map.forEach((val, name) => pairs.push(`${name}=${val}`));
      return pairs.join("; ");
    }

    return null;
  }

  public async applyCookieAndLogin(cookie: string): Promise<NeteaseUser | null> {
    if (!cookie) return null;
    let cleanCookie = cookie.trim();
    if (!cleanCookie.includes("=") && cleanCookie.length > 20) {
      cleanCookie = `MUSIC_U=${cleanCookie}`;
    }
    this.cookie = cleanCookie;
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ [NETEASE_COOKIE_KEY]: cleanCookie });
    }
    const user = await this.fetchUserProfile();
    return user;
  }

  // ==========================================================================
  // 二维码扫码登录
  // ==========================================================================
  public async generateQrKey(signal?: AbortSignal): Promise<string> {
    // 1. 优先尝试本地自建节点
    try {
      const res = await this.request<any>("/login/qr/key", {}, signal);
      const unikey = res?.data?.unikey;
      if (unikey) return unikey;
    } catch {}

    // 2. 备用：直连网易云官方接口 (无需启动本地服务，直接可用)
    try {
      const res = await fetch("https://music.163.com/api/login/qrcode/unikey?type=1", {
        method: "POST",
        headers: { "Referer": "https://music.163.com" },
        signal
      });
      const data = await res.json();
      if (data?.unikey) return data.unikey;
    } catch (e) {
      console.warn("[NeteaseService] official generateQrKey error:", e);
    }

    throw new Error("获取网易云扫码凭据失败，请检查网络连接");
  }

  public async createQrImage(unikey: string, signal?: AbortSignal): Promise<string> {
    // 1. 优先尝试本地自建节点
    try {
      const res = await this.request<any>("/login/qr/create", { key: unikey, qrimg: "true" }, signal);
      const qrimg = res?.data?.qrimg;
      if (qrimg) return qrimg;
    } catch {}

    // 2. 备用：生成标准网易云 App 扫码登录链接二维码图片
    const targetUrl = `https://music.163.com/login?codekey=${encodeURIComponent(unikey)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(targetUrl)}`;
  }

  public async checkQrStatus(unikey: string): Promise<NeteaseQrStatus> {
    // 1. 优先尝试本地自建节点
    try {
      const res = await this.request<any>("/login/qr/check", { key: unikey, noCookie: "true" });
      if (res && typeof res.code !== "undefined") {
        return await this.handleQrStatusResult(Number(res.code), res.cookie);
      }
    } catch {}

    // 2. 备用：官方直接接口
    try {
      const res = await fetch(`https://music.163.com/api/login/qrcode/client/login?type=1&key=${encodeURIComponent(unikey)}`, {
        method: "POST",
        headers: { "Referer": "https://music.163.com" }
      });
      const data = await res.json();
      if (data && typeof data.code !== "undefined") {
        const code = Number(data.code);
        let cookie = data.cookie || "";
        if (code === 803 && !cookie) {
          cookie = (await this.detectBrowserCookie()) || "";
        }
        return await this.handleQrStatusResult(code, cookie);
      }
    } catch (e) {
      console.warn("[NeteaseService] official checkQrStatus error:", e);
    }

    return { code: 800, message: "二维码已过期，请刷新" };
  }

  private async handleQrStatusResult(code: number, cookie?: string): Promise<NeteaseQrStatus> {
    let message = "等待扫码…";
    if (code === 800) message = "二维码已过期，请刷新";
    else if (code === 801) message = "等待扫码…";
    else if (code === 802) message = "已扫码，请在手机上点击确认登录…";
    else if (code === 803) {
      message = "扫码登录成功！";
      if (typeof localStorage !== "undefined") {
        try { localStorage.removeItem("netease_explicit_logout"); } catch {}
      }
      if (cookie) {
        this.cookie = cookie;
        this.user = null;
        this.likedSongIds.clear();
        this.playlistCache.clear();
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          await chrome.storage.local.remove([NETEASE_USER_KEY, NETEASE_LIKES_KEY]);
          await chrome.storage.local.set({ [NETEASE_COOKIE_KEY]: cookie });
        }
        try { await this.fetchUserProfile(); } catch {}
      }
      window.dispatchEvent(new Event("netease:account-updated"));
    }

    return { code, message, cookie };
  }

  public async logout(): Promise<void> {
    try {
      await this.request("/logout");
    } catch {}
    this.cookie = "";
    this.user = null;
    this.playlistCache.clear();
    this.pendingRequests.clear();
    this.likedSongIds.clear();
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.remove([NETEASE_COOKIE_KEY, NETEASE_USER_KEY, NETEASE_LIKES_KEY]);
    }
    window.dispatchEvent(new Event("netease:account-updated"));
  }

  // ==========================================================================
  // 喜欢歌曲管理
  // ==========================================================================
  public async fetchLikedSongs(): Promise<number[]> {
    if (!this.user?.uid) return Array.from(this.likedSongIds);
    try {
      const res = await this.request<any>("/likelist", { uid: this.user.uid });
      const ids: number[] = res?.ids || [];
      if (ids.length) {
        this.likedSongIds = new Set(ids.map(Number));
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          await chrome.storage.local.set({ [NETEASE_LIKES_KEY]: Array.from(this.likedSongIds) });
        }
      }
      return Array.from(this.likedSongIds);
    } catch (e) {
      console.warn("[NeteaseService] fetchLikedSongs failed:", e);
      return Array.from(this.likedSongIds);
    }
  }

  public getLikedSongIds(): Set<number> {
    return this.likedSongIds;
  }

  public isLiked(songId: number | string): boolean {
    return this.likedSongIds.has(Number(songId));
  }

  public async toggleLikeSong(songId: number | string, shouldLike?: boolean): Promise<boolean> {
    const id = Number(songId);
    if (!id) return false;
    const targetLike = shouldLike !== undefined ? shouldLike : !this.likedSongIds.has(id);
    try {
      await this.request("/like", { id, like: targetLike });
      if (targetLike) {
        this.likedSongIds.add(id);
      } else {
        this.likedSongIds.delete(id);
      }
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [NETEASE_LIKES_KEY]: Array.from(this.likedSongIds) });
      }
      return true;
    } catch (e) {
      console.warn("[NeteaseService] toggleLikeSong failed:", e);
      return false;
    }
  }

  // ==========================================================================
  // 歌单与歌曲检索
  // ==========================================================================
  public async getUserPlaylists(uid?: string | number): Promise<NeteasePlaylist[]> {
    const targetUid = uid || this.user?.uid;
    if (!targetUid) return [];
    try {
      const res = await this.request<any>("/user/playlist", { uid: targetUid, limit: 100 });
      return res?.playlist || [];
    } catch (e) {
      console.warn("[NeteaseService] getUserPlaylists failed:", e);
      return [];
    }
  }

  public async getToplists(): Promise<NeteasePlaylist[]> {
    try {
      const res = await this.request<any>("/toplist");
      return res?.list || [];
    } catch (e) {
      console.warn("[NeteaseService] getToplists failed:", e);
      return [];
    }
  }

  /**
   * 综合歌单获取（自动识别用户状态，登录时返回用户歌单，未登录或为空时返回官方热门榜单）
   */
  public async getPlaylists(): Promise<NeteasePlaylist[]> {
    if (this.user?.loggedIn) {
      const userLists = await this.getUserPlaylists();
      if (userLists && userLists.length) return userLists;
    }
    const topLists = await this.getToplists();
    if (topLists && topLists.length) return topLists;

    // 内置经典热门官方榜单兜底 (离线保障)
    return [
      { id: 3778678, name: "云音乐热歌榜", trackCount: 200, coverImgUrl: "https://p1.music.126.net/Gh3G65F3eJ9vP_aQc6t2YQ==/109951165682855118.jpg" },
      { id: 3779629, name: "云音乐新歌榜", trackCount: 100, coverImgUrl: "https://p1.music.126.net/N2HO5xfYEqyvgnqfMrrKPA==/109951165682845667.jpg" },
      { id: 19723756, name: "云音乐飙升榜", trackCount: 100, coverImgUrl: "https://p1.music.126.net/sBzD11nforcuh1urispgOQ==/109951165682860472.jpg" },
      { id: 2884035, name: "网易原创歌曲榜", trackCount: 100, coverImgUrl: "https://p1.music.126.net/H4a8b79k8O9Zl_Kx_Yn16Q==/109951165682859758.jpg" }
    ];
  }

  public addRecentSong(song: NeteaseSong): void {
    this.recordRecentSong(song);
  }

  public async autoDetectAndLogin(): Promise<NeteaseUser | null> {
    if (this.user?.loggedIn) return this.user;
    if (typeof localStorage !== "undefined" && localStorage.getItem("netease_explicit_logout") === "true") {
      return null;
    }
    try {
      const detectedCookie = await this.detectBrowserCookie();
      if (detectedCookie) {
        return await this.applyCookieAndLogin(detectedCookie);
      }
    } catch (e) {
      console.warn("[NeteaseService] autoDetectAndLogin failed:", e);
    }
    return null;
  }

  public async getPlaylistTracks(playlistId: string | number, targetLimit = 500, offset = 0): Promise<NeteaseSong[]> {
    if (!playlistId) return [];

    // 缓存命中 (10 分钟有效，仅针对全量缓存)
    if (this.playlistCache.has(playlistId) && targetLimit >= 500 && offset === 0) {
      const hit = this.playlistCache.get(playlistId)!;
      if (Date.now() - hit.at < 10 * 60 * 1000 && hit.songs && hit.songs.length) {
        return hit.songs;
      }
    }

    // 请求合并与防抖
    const requestKey = `${playlistId}_${targetLimit}_${offset}`;
    if (this.pendingRequests.has(requestKey)) {
      return await this.pendingRequests.get(requestKey)!;
    }

    const requestPromise = (async () => {
      let tracks: NeteaseSong[] = [];
      try {
        try {
          const res = await this.request<any>("/playlist/track/all", {
            id: playlistId,
            limit: targetLimit,
            offset
          });
          tracks = res?.songs || [];
        } catch (e1) {
          console.warn("[NeteaseService] /playlist/track/all error, fallback to detail:", e1);
        }

        if (!tracks.length && offset === 0) {
          const detailRes = await this.request<any>("/playlist/detail", { id: playlistId });
          tracks = detailRes?.playlist?.tracks || [];
        }

        if (tracks.length && targetLimit >= 500 && offset === 0) {
          this.playlistCache.set(playlistId, { songs: tracks, at: Date.now() });
        }
      } finally {
        this.pendingRequests.delete(requestKey);
      }
      return tracks;
    })();

    this.pendingRequests.set(requestKey, requestPromise);
    return await requestPromise;
  }

  public async searchSongs(keyword: string, limit = 60): Promise<NeteaseSong[]> {
    const cleanKw = keyword.trim();
    if (!cleanKw) return [];

    let songs: NeteaseSong[] = [];
    try {
      const res = await this.request<any>("/cloudsearch", { keywords: cleanKw, type: 1, limit });
      songs = res?.result?.songs || [];
    } catch (e1) {
      console.warn("[NeteaseService] /cloudsearch failed, fallback to /search:", e1);
    }

    if (!songs.length) {
      try {
        const resLegacy = await this.request<any>("/search", { keywords: cleanKw, limit });
        songs = resLegacy?.result?.songs || [];
      } catch (e2) {
        console.warn("[NeteaseService] /search failed:", e2);
      }
    }

    return songs;
  }

  // ==========================================================================
  // 音源 URL 与 歌词获取
  // ==========================================================================
  public async getSongAudioUrl(songId: string | number, level = "standard"): Promise<string> {
    let audioUrl = "";
    try {
      const res = await this.request<any>("/song/url/v1", { id: songId, level });
      audioUrl = res?.data?.[0]?.url || "";
    } catch {}

    if (!audioUrl) {
      try {
        const legacyRes = await this.request<any>("/song/url", { id: songId });
        audioUrl = legacyRes?.data?.[0]?.url || "";
      } catch {}
    }

    if (!audioUrl) {
      // 备用兜底外链
      audioUrl = `https://music.163.com/song/media/outer/url?id=${songId}.mp3`;
    }

    return audioUrl;
  }

  public async getSongLyric(songId: string | number): Promise<string> {
    try {
      const res = await this.request<any>("/lyric", { id: songId });
      return res?.lrc?.lyric || "";
    } catch {
      return "";
    }
  }

  // ==========================================================================
  // 最近播放记录
  // ==========================================================================
  public recordRecentSong(song: NeteaseSong): void {
    if (!song || !song.id) return;
    this.recentSongs = this.recentSongs.filter((s) => String(s.id) !== String(song.id));
    this.recentSongs.unshift(song);
    if (this.recentSongs.length > 50) this.recentSongs = this.recentSongs.slice(0, 50);
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [NETEASE_RECENT_KEY]: this.recentSongs });
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(NETEASE_RECENT_KEY, JSON.stringify(this.recentSongs));
      } catch {}
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
    }
  }

  public async clearRecentSongs(): Promise<void> {
    await this.whenReady();
    this.recentSongs = [];
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.remove(NETEASE_RECENT_KEY);
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(NETEASE_RECENT_KEY);
      } catch {}
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: [] }));
    }
  }

  public getRecentSongs(): NeteaseSong[] {
    return [...this.recentSongs];
  }

  /**
   * 从网易云官方账户拉取真实的云端最近播放 / 听歌历史记录
   */
  public async fetchAccountRecentSongs(limit = 60): Promise<NeteaseSong[]> {
    try {
      // 1. 尝试从 /record/recent/song 拉取（网易云官方最近播放列表）
      let rawList: any[] = [];
      try {
        const res = await this.request<any>("/record/recent/song", { limit });
        if (Array.isArray(res?.data?.list) && res.data.list.length > 0) {
          rawList = res.data.list;
        }
      } catch {}

      // 2. 若最近播放为空，且存在用户 UID，尝试从 /user/record (用户听歌排行周榜) 补充
      if (!rawList.length && this.user?.uid) {
        try {
          const recordRes = await this.request<any>("/user/record", { uid: this.user.uid, type: 1 });
          if (Array.isArray(recordRes?.weekData) && recordRes.weekData.length > 0) {
            rawList = recordRes.weekData;
          } else if (Array.isArray(recordRes?.allData) && recordRes.allData.length > 0) {
            rawList = recordRes.allData;
          }
        } catch {}
      }

      if (rawList.length > 0) {
        const cloudSongs: NeteaseSong[] = rawList
          .map((item: any) => {
            const s = item.data || item.song || item;
            if (!s || !s.id) return null;
            return {
              id: s.id,
              name: s.name || s.title || "未知曲目",
              artists: s.ar || s.artists || [],
              ar: s.ar || s.artists || [],
              album: s.al || s.album || {},
              al: s.al || s.album || {},
              dt: s.dt || s.duration || 0,
              duration: s.dt || s.duration || 0,
              picUrl: s.al?.picUrl || s.album?.picUrl || s.picUrl || "",
              coverUrl: s.al?.picUrl || s.album?.picUrl || s.picUrl || "",
              playTime: item.playTime || 0
            };
          })
          .filter(Boolean) as NeteaseSong[];

        if (cloudSongs.length > 0) {
          // 合并云端与本地记录，去重后取前 60 首
          const cloudIds = new Set(cloudSongs.map((s) => String(s.id)));
          const extraLocal = this.recentSongs.filter((s) => !cloudIds.has(String(s.id)));
          this.recentSongs = [...cloudSongs, ...extraLocal].slice(0, 60);

          if (typeof chrome !== "undefined" && chrome.storage?.local) {
            await chrome.storage.local.set({ [NETEASE_RECENT_KEY]: this.recentSongs });
          }
          if (typeof localStorage !== "undefined") {
            try {
              localStorage.setItem(NETEASE_RECENT_KEY, JSON.stringify(this.recentSongs));
            } catch {}
          }
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
          }
        }
      }
    } catch (err) {
      console.warn("[NeteaseService] fetchAccountRecentSongs failed:", err);
    }
    return this.recentSongs;
  }
}

export const neteaseService = NeteaseService.getInstance();

// 挂载到全局以支持过渡期经典脚本无缝调用
if (typeof window !== "undefined") {
  (window as any).LogicWeaverNeteaseService = neteaseService;
}
