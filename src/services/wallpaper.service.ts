/**
 * WallpaperService — 现代化壁纸管理与存储服务 (纯数据逻辑，无侵入式 DOM 操作)
 */

import { loadActiveWallpaperFromOpfs, saveActiveWallpaperToOpfs } from "../wallpaper/opfs-storage";
import { startAudioSpectrumStream, stopAudioSpectrumStream } from "../wallpaper/audio-visualizer";

declare const chrome: any;

export interface WallpaperHistoryItem {
  id: string;
  title: string;
  kind?: string;
  value: any;
  createdAt?: number;
  previewUrl?: string;
}

export const BACKGROUND_DB_NAME = "leaf-newtab-backgrounds";
export const BACKGROUND_DB_VERSION = 1;
export const BACKGROUND_CURRENT_KEY = "current-background";
export const BACKGROUND_HISTORY_KEY = "heroBackgroundHistory";
export const BACKGROUND_HISTORY_LIMIT = 30;
export const DEFAULT_MOUNTAIN_VALUE = "assets/newtab-mountains.png";

const WALLPAPER_MAX_FILES = 450;
const WALLPAPER_MAX_BYTES = 180 * 1024 * 1024;

let activeObjectUrls: string[] = [];
let applyVersion = 0;
let currentInteractionCleanup: (() => void) | null = null;

function trackUrl(url: string): string {
  activeObjectUrls.push(url);
  return url;
}

export function teardownWallpaperInteractions(): void {
  if (currentInteractionCleanup) {
    try { currentInteractionCleanup(); } catch (_) {}
    currentInteractionCleanup = null;
  }
}

function setupWallpaperInteractions(targetWin: Window): void {
  teardownWallpaperInteractions();

  let rafId: number | null = null;
  let lastX = 0;
  let lastY = 0;

  const onPointerMove = (e: PointerEvent | MouseEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        try {
          targetWin.postMessage({
            type: "WE_MOUSE_MOVE",
            x: lastX,
            y: lastY,
          }, "*");
        } catch (_) {}
      });
    }
  };

  const onPointerDown = (e: MouseEvent) => {
    try {
      targetWin.postMessage({
        type: "WE_MOUSE_DOWN",
        x: e.clientX,
        y: e.clientY,
      }, "*");
    } catch (_) {}
  };

  const onPointerUp = (e: MouseEvent) => {
    try {
      targetWin.postMessage({
        type: "WE_MOUSE_UP",
        x: e.clientX,
        y: e.clientY,
      }, "*");
    } catch (_) {}
  };

  const onVisibilityChange = () => {
    const isPaused = document.hidden;
    try {
      targetWin.postMessage({
        type: "WE_SET_PAUSED",
        isPaused,
      }, "*");
    } catch (_) {}
    if (isPaused) {
      stopAudioSpectrumStream();
    } else {
      startAudioSpectrumStream(targetWin);
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("mousedown", onPointerDown, { passive: true });
  window.addEventListener("mouseup", onPointerUp, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  currentInteractionCleanup = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("mousedown", onPointerDown);
    window.removeEventListener("mouseup", onPointerUp);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}

export function clearActiveWallpaperUrls(): void {
  stopAudioSpectrumStream();
  teardownWallpaperInteractions();
  activeObjectUrls.forEach((url) => {
    try {
      URL.revokeObjectURL(url);
    } catch (_) {}
  });
  activeObjectUrls = [];
}

/**
 * 打开 IndexedDB 数据库
 */
export function openBackgroundDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const request = indexedDB.open(BACKGROUND_DB_NAME, BACKGROUND_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function backgroundDbPut(value: any, key: string = BACKGROUND_CURRENT_KEY): Promise<void> {
  const db = await openBackgroundDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readwrite");
    tx.objectStore("files").put(value, key);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
    tx.onabort = tx.onerror;
  });
}

export async function openLegacyBackgroundDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not supported"));
      return;
    }
    const request = indexedDB.open("my-newtab-background", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function legacyBackgroundDbGet<T = any>(key: string = "hero"): Promise<T | null> {
  try {
    const db = await openLegacyBackgroundDb();
    return new Promise((resolve) => {
      const tx = db.transaction("files", "readonly");
      const request = tx.objectStore("files").get(key);
      request.onsuccess = () => {
        db.close();
        resolve((request.result as T) || null);
      };
      request.onerror = () => {
        db.close();
        resolve(null);
      };
      tx.oncomplete = () => db.close();
    });
  } catch {
    return null;
  }
}

export async function backgroundDbGet<T = any>(key: string = BACKGROUND_CURRENT_KEY): Promise<T | null> {
  try {
    const db = await openBackgroundDb();
    const result = await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction("files", "readonly");
      const request = tx.objectStore("files").get(key);
      request.onsuccess = () => resolve((request.result as T) || null);
      tx.oncomplete = () => db.close();
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
    if (result) return result;
  } catch {
    // ignore primary db error and fallback
  }

  const legacyVal = await legacyBackgroundDbGet<T>(key);
  if (legacyVal) return legacyVal;
  if (key === BACKGROUND_CURRENT_KEY) {
    return legacyBackgroundDbGet<T>("hero");
  }
  return null;
}

export async function backgroundDbClear(key: string = BACKGROUND_CURRENT_KEY): Promise<void> {
  const db = await openBackgroundDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readwrite");
    tx.objectStore("files").delete(key);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
    tx.onabort = tx.onerror;
  });
}

function storageGet(keys: string[]): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === "undefined" || !chrome.storage?.local?.get) { reject(new Error("壁纸存储不可用")); return; }
    chrome.storage.local.get(keys, (res: any) => {
      if (chrome.runtime?.lastError) reject(new Error("壁纸配置读取失败"));
      else resolve(res || {});
    });
  });
}
function storageSet(items: Record<string, any>): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === "undefined" || !chrome.storage?.local?.set) { reject(new Error("壁纸存储不可用")); return; }
    chrome.storage.local.set(items, () => {
      if (chrome.runtime?.lastError) reject(new Error("壁纸配置保存失败"));
      else resolve();
    });
  });
}

export function isBackgroundMedia(file: any): boolean {
  return Boolean(
    file &&
      (/^image\//i.test(file.type || "") ||
        /^video\//i.test(file.type || "") ||
        /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(file.name || ""))
  );
}

export function normalizeWallpaperPath(path: string): string {
  return String(path || "")
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "");
}

export function resolveWallpaperPath(fromPath: string, target: string): string {
  const raw = String(target || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  if (!raw || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(raw)) return "";
  const [pathname] = raw.split(/[?#]/);
  if (!pathname) return "";
  const base = raw.startsWith("/") ? "" : normalizeWallpaperPath(fromPath).split("/").slice(0, -1).join("/");
  const parts = `${base ? base + "/" : ""}${pathname.replace(/^\/+/, "")}`.split("/");
  const stack: string[] = [];
  parts.forEach((part) => {
    if (!part || part === ".") return;
    if (part === "..") stack.pop();
    else stack.push(part);
  });
  return stack.join("/").toLowerCase();
}

export function getWallpaperMime(path: string, file: File): string {
  if (file.type) return file.type;
  if (/\.html?$/i.test(path)) return "text/html";
  if (/\.css$/i.test(path)) return "text/css";
  if (/\.m?js$/i.test(path)) return "text/javascript";
  if (/\.png$/i.test(path)) return "image/png";
  if (/\.jpe?g$/i.test(path)) return "image/jpeg";
  if (/\.webp$/i.test(path)) return "image/webp";
  if (/\.gif$/i.test(path)) return "image/gif";
  if (/\.mp4$/i.test(path)) return "video/mp4";
  if (/\.webm$/i.test(path)) return "video/webm";
  return "application/octet-stream";
}

export async function collectWallpaperFiles(handle: any): Promise<Array<{ path: string; file: File }>> {
  const files: Array<{ path: string; file: File }> = [];
  let total = 0;
  async function walk(dir: any, prefix = "", depth = 0): Promise<void> {
    if (depth > 4 || files.length >= WALLPAPER_MAX_FILES || total >= WALLPAPER_MAX_BYTES) return;
    for await (const entry of dir.values()) {
      if (files.length >= WALLPAPER_MAX_FILES || total >= WALLPAPER_MAX_BYTES) break;
      const path = normalizeWallpaperPath(prefix ? `${prefix}/${entry.name}` : entry.name);
      if (entry.kind === "file") {
        const file: File = await entry.getFile();
        total += file.size || 0;
        if (total <= WALLPAPER_MAX_BYTES) files.push({ path, file });
      } else if (entry.kind === "directory") {
        await walk(entry, path, depth + 1);
      }
    }
  }
  await walk(handle);
  return files;
}

export function findWebWallpaperEntry(entries: Array<{ path: string; file: File }>): { path: string; file: File } | null {
  return (
    entries
      .filter((entry) => /(^|\/)index\.html?$/i.test(entry.path) || /\.html?$/i.test(entry.path))
      .sort((a, b) => {
        const score = (entry: { path: string }) =>
          /^index\.html?$/i.test(entry.path) ? 0 : /(^|\/)index\.html?$/i.test(entry.path) ? 1 : 2;
        return score(a) - score(b) || a.path.length - b.path.length;
      })[0] || null
  );
}

function collectProjectMediaRefs(value: any, refs: string[] = []): string[] {
  if (typeof value === "string") {
    if (/\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(value)) refs.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectProjectMediaRefs(item, refs));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectProjectMediaRefs(item, refs));
  }
  return refs;
}

export async function pickProjectReferencedMedia(entries: Array<{ path: string; file: File }>): Promise<File | null> {
  const map = new Map(entries.map((entry) => [normalizeWallpaperPath(entry.path).toLowerCase(), entry]));
  const projects = entries.filter((entry) => /(^|\/)project\.json$/i.test(entry.path));
  for (const project of projects) {
    try {
      const json = JSON.parse(await project.file.text());
      for (const ref of collectProjectMediaRefs(json)) {
        const entry = map.get(resolveWallpaperPath(project.path, ref));
        if (entry && isBackgroundMedia(entry.file)) return entry.file;
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

export function buildWebWallpaperPack(dirName: string, entry: { path: string }, entries: Array<{ path: string; file: File }>) {
  const usable = entries
    .filter((item) => !/\.(pkg|mpkg)$/i.test(item.path))
    .map((item) => ({ path: item.path, file: item.file, mime: getWallpaperMime(item.path, item.file) }));
  return { type: "web", name: dirName || "Web Wallpaper", entry: entry.path, files: usable };
}

export async function pickWallpaperMediaFromDirectory(handle: any): Promise<any> {
  const entries = await collectWallpaperFiles(handle);
  const webEntry = findWebWallpaperEntry(entries);
  if (webEntry) return buildWebWallpaperPack(handle.name, webEntry, entries);

  const projectMedia = await pickProjectReferencedMedia(entries);
  if (projectMedia) return projectMedia;

  const files = entries.map((entry) => entry.file).filter(isBackgroundMedia);
  return (
    files.sort((a, b) => {
      const score = (f: File) =>
        /\.(mp4|webm)$/i.test(f.name)
          ? 0
          : /\.gif$/i.test(f.name)
            ? 1
            : /^preview\./i.test(f.name)
              ? 2
              : /cover|thumb|poster/i.test(f.name)
                ? 3
                : 4;
      return score(a) - score(b) || b.size - a.size;
    })[0] || null
  );
}

function backgroundHistoryTitle(value: any): string {
  if (!value) return "默认背景";
  if (typeof value === "string") return "自定义图片";
  return value.name || (value.type === "web" ? "Web Wallpaper" : "自定义背景");
}

function backgroundHistoryType(value: any): string {
  if (typeof value === "string") return "图片";
  if (value?.type === "web") return "Web Wallpaper";
  if (value?.type === "db") return /video/i.test(value.mediaType || "") ? "视频" : "图片/GIF";
  return "背景";
}

function isSameWallpaper(a: any, b: any): boolean {
  if (!a || !b) return false;
  const valA = a.value || a;
  const valB = b.value || b;
  // 1. 如果带有 workshopId，只要工坊 ID 相同即为同一款壁纸
  if (valA.workshopId && valB.workshopId && String(valA.workshopId) === String(valB.workshopId)) return true;
  // 2. 标题和类型完全相同
  const titleA = a.title || valA.name || valA.title;
  const titleB = b.title || valB.name || valB.title;
  if (titleA && titleB && titleA === titleB && valA.type === valB.type) return true;
  // 3. 剥离随机 storageKey 后的配置相同
  const cleanA = { ...valA, storageKey: undefined };
  const cleanB = { ...valB, storageKey: undefined };
  return JSON.stringify(cleanA) === JSON.stringify(cleanB);
}

export const WallpaperService = {
  async loadHistory(): Promise<{ history: WallpaperHistoryItem[]; currentValue: any }> {
    const stored = await storageGet([BACKGROUND_HISTORY_KEY, "heroBackground"]);
    let history: WallpaperHistoryItem[] = Array.isArray(stored[BACKGROUND_HISTORY_KEY]) ? stored[BACKGROUND_HISTORY_KEY] : [];

    // 智能去重清洗历史记录：同一款壁纸只保留最新的一份，自动合并历史残留重复项
    const seen = new Set<string>();
    const deduped: WallpaperHistoryItem[] = [];
    for (const item of history) {
      const key = item.value?.workshopId
        ? `ws-${item.value.workshopId}`
        : (item.title ? `${item.kind || ''}-${item.title}` : JSON.stringify({ ...item.value, storageKey: undefined }));
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(item);
      }
    }
    if (deduped.length !== history.length) {
      history = deduped;
      void storageSet({ [BACKGROUND_HISTORY_KEY]: deduped });
    }

    return { history, currentValue: stored.heroBackground || null };
  },

  async addHistory(value: any, payload: any = null, previewUrl?: string): Promise<any> {
    const id = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let itemValue = value;
    if (value && typeof value === "object") itemValue = { ...value, storageKey: id };
    if (payload) await backgroundDbPut(payload, id);
    const stored = await storageGet([BACKGROUND_HISTORY_KEY, "heroBackground"]);
    const history: WallpaperHistoryItem[] = Array.isArray(stored[BACKGROUND_HISTORY_KEY]) ? stored[BACKGROUND_HISTORY_KEY] : [];
    const item: WallpaperHistoryItem = {
      id,
      title: backgroundHistoryTitle(itemValue),
      kind: backgroundHistoryType(itemValue),
      createdAt: Date.now(),
      previewUrl: previewUrl || itemValue.previewUrl || itemValue.previewBase64,
      value: itemValue
    };
    // 严格去重：如果已有该壁纸，先剔除旧位置，只在最前展示一次
    const next = [item, ...history.filter((old) => !isSameWallpaper(old, item))].slice(
      0,
      BACKGROUND_HISTORY_LIMIT
    );
    const dropped = history.slice(BACKGROUND_HISTORY_LIMIT - 1).filter((old) => old.value?.storageKey && old.value.storageKey !== stored.heroBackground?.storageKey);
    await Promise.all(dropped.map((old) => backgroundDbClear(old.value.storageKey)));
    await storageSet({ [BACKGROUND_HISTORY_KEY]: next });
    return itemValue;
  },

  async deleteHistory(item: WallpaperHistoryItem): Promise<void> {
    const stored = await storageGet([BACKGROUND_HISTORY_KEY, "heroBackground"]);
    const next = (stored[BACKGROUND_HISTORY_KEY] || []).filter((old: WallpaperHistoryItem) => old.id !== item.id);
    if (item.value?.storageKey) await backgroundDbClear(item.value.storageKey);
    await storageSet({ [BACKGROUND_HISTORY_KEY]: next });
    if (JSON.stringify(stored.heroBackground) === JSON.stringify(item.value)) {
      await this.clearWallpaper();
    }
  },

  async clearWallpaper(): Promise<void> {
    const value = { type: "none" };
    await storageSet({ heroBackground: value });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(value));
    } catch {}
    await this.applyWallpaper(null);
  },

  async setMountain(): Promise<void> {
    await storageSet({ heroBackground: DEFAULT_MOUNTAIN_VALUE });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(DEFAULT_MOUNTAIN_VALUE));
    } catch {}
    await this.applyWallpaper(DEFAULT_MOUNTAIN_VALUE);
  },

  async setWallpaper(value: any, instantPayload: any = null): Promise<void> {
    await storageSet({ heroBackground: value });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(value));
    } catch {}
    await this.applyWallpaper(value, instantPayload);
  },

  async chooseBackgroundFile(kind: "all" | "image" | "video" = "all"): Promise<File[]> {
    if (typeof document === "undefined") return [];
    // One request-owned input. Chromium cancel settles the promise and releases the node.
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file"; input.hidden = true; input.multiple = true;
      input.accept = kind === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif"
        : kind === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const finish = (files: File[]) => {
        input.removeEventListener("change", changed); input.removeEventListener("cancel", cancelled);
        input.remove(); resolve(files);
      };
      const changed = () => finish(Array.from(input.files || []));
      const cancelled = () => finish([]);
      input.addEventListener("change", changed); input.addEventListener("cancel", cancelled);
      document.body.appendChild(input);
      try { input.click(); } catch (error) { input.remove(); reject(error); }
    });
  },

  async importBackgroundFile(file: any, { apply = true } = {}): Promise<any> {
    if (!file) return null;
    let value: any;
    let payload: any = null;
    if (file.type === "web") {
      payload = file;
      value = { type: "web", name: file.name, entry: file.entry };
    } else if (!isBackgroundMedia(file)) {
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    } else {
      payload = file;
      value = { type: "db", name: file.name, mediaType: file.type || "application/octet-stream" };
    }
    value = await this.addHistory(value, payload);
    if (apply) {
      await storageSet({ heroBackground: value });
      await this.applyWallpaper(value);
    }
    return value;
  },

  async importWallpaperDirectory(): Promise<any> {
    const win = window as any;
    if (!win.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const directory = await win.showDirectoryPicker();
    const file = await pickWallpaperMediaFromDirectory(directory);
    if (!file) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(file);
  },

  async applyWallpaper(value: any, instantPayload: any = null): Promise<void> {
    const version = ++applyVersion;
    if (typeof document === "undefined") return;
    const launcher = document.getElementById("launcher");
    const host = document.getElementById("hero-background-media");
    if (!launcher || !host) return;

    clearActiveWallpaperUrls();
    host.replaceChildren();
    launcher.style.removeProperty("--launcher-image");

    if (!value) return;
    if (typeof value === "string") {
      const chromeApi = typeof chrome !== "undefined" ? chrome : null;
      const resolvedUrl = value.startsWith("chrome-extension://") || value.startsWith("http") || value.startsWith("data:")
        ? value
        : (chromeApi?.runtime?.getURL ? chromeApi.runtime.getURL(value) : value);
      const img = document.createElement("img");
      img.src = resolvedUrl;
      img.alt = "";
      img.decoding = "async";
      (img as any).fetchPriority = "high";
      host.appendChild(img);
      return;
    }
    if (value.type === "style") {
      const surface = document.createElement("div");
      surface.style.cssText = value.style || "";
      surface.style.position = "absolute"; surface.style.inset = "0";
      host.appendChild(surface); return;
    }

    // 原生 4K 视频壁纸即时硬解流式播放
    if (value.type === "video") {
      let videoBlob: Blob | null = null;
      if (instantPayload?.files) {
        const f = instantPayload.files.find((item: any) => item.path === instantPayload.entry) || instantPayload.files[0];
        videoBlob = f?.file || null;
      } else if (instantPayload instanceof Blob) {
        videoBlob = instantPayload;
      }
      if (!videoBlob) {
        const opfsPack = await loadActiveWallpaperFromOpfs();
        if (opfsPack?.files?.length) {
          const f = opfsPack.files.find(item => item.path === opfsPack.entry) || opfsPack.files[0];
          videoBlob = f?.file || null;
        }
      }
      if (videoBlob instanceof Blob && version === applyVersion) {
        const url = trackUrl(URL.createObjectURL(videoBlob));
        const video = document.createElement("video");
        video.src = url;
        video.autoplay = true;
        video.preload = "metadata";
        video.loop = true;
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        video.setAttribute("muted", "");
        video.playsInline = true;
        video.disablePictureInPicture = true;
        video.setAttribute("disablepictureinpicture", "");
        video.setAttribute("disableremoteplayback", "");
        host.appendChild(video);
        return;
      }
    }

    if (value.type === "web") {
      // 若提供了即时包 (例如刚点击工坊壁纸)，直接零延迟秒开
      let pack = instantPayload;
      if (!pack || pack.type !== "web") {
        pack = await loadActiveWallpaperFromOpfs();
        if (!pack || pack.type !== "web") {
          pack = await backgroundDbGet(value.storageKey || BACKGROUND_CURRENT_KEY);
          if (pack && pack.type === "web") {
            void saveActiveWallpaperToOpfs(pack);
          }
        }
      }

      if (version !== applyVersion) return;
      if (pack?.type === "web") {
        const iframe = document.createElement("iframe");
        iframe.title = pack.name || "Web Wallpaper";
        const chromeApi = typeof chrome !== "undefined" ? chrome : null;
        iframe.src = chromeApi?.runtime?.getURL ? chromeApi.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
        // 增加 1.5 秒白屏自愈守护：若 iframe 异常或无法通讯，自动降级为默认自然壁纸，绝不呈现大白屏
        const fallbackTimer = setTimeout(() => {
          if (version === applyVersion && iframe.parentNode) {
            console.warn("[Wallpaper] Web wallpaper timeout or failed, auto fallback to mountain");
            void WallpaperService.setMountain();
          }
        }, 1500);
        iframe.onload = () => {
          clearTimeout(fallbackTimer);
          iframe.contentWindow?.postMessage(pack, "*");
          if (iframe.contentWindow) {
            setupWallpaperInteractions(iframe.contentWindow);
            startAudioSpectrumStream(iframe.contentWindow);
          }
        };
        host.appendChild(iframe);
      } else {
        void WallpaperService.setMountain();
      }
      return;
    }
    if (value.type === "db") {
      const file = await backgroundDbGet(value.storageKey || BACKGROUND_CURRENT_KEY);
      if (version !== applyVersion) return;
      if (!(file instanceof Blob)) return;
      const url = trackUrl(URL.createObjectURL(file));
      if (/^video\//i.test(file.type || "") || /\.(mp4|webm)$/i.test((file as File).name || "")) {
        const video = document.createElement("video");
        video.src = url;
        video.autoplay = true;
        video.preload = "metadata";
        video.loop = true;
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        video.setAttribute("muted", "");
        video.playsInline = true;
        video.disablePictureInPicture = true;
        video.setAttribute("disablepictureinpicture", "");
        video.setAttribute("disableremoteplayback", "");
        host.appendChild(video);
      } else {
        const image = document.createElement("img");
        image.src = url;
        image.alt = "";
        image.decoding = "async";
        (image as any).fetchPriority = "high";
        host.appendChild(image);
      }
    }
  },

  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(storageKey?: string, signal?: AbortSignal): Promise<string | null> {
    signal?.throwIfAborted();
    const file = await backgroundDbGet(storageKey || BACKGROUND_CURRENT_KEY);
    signal?.throwIfAborted();
    if (file instanceof Blob) return URL.createObjectURL(file);
    // Web packages stay in sandbox only when explicitly applied; no iframe thumbnails.
    return null;
  },

  async updateHistoryTitle(id: string, newTitle: string): Promise<void> {
    const stored = await storageGet([BACKGROUND_HISTORY_KEY]);
    const history: WallpaperHistoryItem[] = Array.isArray(stored[BACKGROUND_HISTORY_KEY]) ? stored[BACKGROUND_HISTORY_KEY] : [];
    if (!history.some(item => item.id === id)) throw new Error("壁纸条目已变化，请刷新");
    const next = history.map((item) => {
      if (item.id === id) {
        return { ...item, title: newTitle.trim() || item.title };
      }
      return item;
    });
    await storageSet({ [BACKGROUND_HISTORY_KEY]: next });
  },

  async initWallpaper(): Promise<void> {
    try {
      // 1. 优先尝试从同步 localStorage 极速恢复用户之前选择的壁纸
      let current: any = null;
      try {
        const cached = localStorage.getItem("lw-current-wallpaper");
        if (cached !== null) {
          current = JSON.parse(cached);
        }
      } catch {}

      // 2. 若同步缓存不存在，读取 chrome.storage.local
      if (current === null) {
        const stored = await storageGet(["heroBackground"]);
        if (stored.heroBackground !== undefined) {
          current = stored.heroBackground;
        }
      }

      // 3. 用户如果明确选择了纯色背景/无壁纸 ({ type: "none" })，严格保持纯色，绝不覆盖回雪山默认图
      if (current && (current === "none" || current.type === "none")) {
        await this.applyWallpaper(null);
        return;
      }

      if (!current) {
        const historyData = await this.loadHistory();
        if (historyData.currentValue) {
          current = historyData.currentValue;
        } else if (historyData.history.length > 0) {
          current = historyData.history[0].value;
        }
      }
      if (!current) {
        // 尝试检查旧库是否有默认 hero 文件
        const legacyHero = await legacyBackgroundDbGet("hero");
        if (legacyHero) {
          current = {
            type: "db",
            name: (legacyHero as any).name || "当前壁纸",
            mediaType: (legacyHero as any).type || "application/octet-stream"
          };
        }
      }
      if (!current) {
        current = DEFAULT_MOUNTAIN_VALUE;
      }

      // 4. 同步写入 localStorage 便于下次刷新 0ms 呈现
      try {
        localStorage.setItem("lw-current-wallpaper", JSON.stringify(current));
      } catch {}

      await this.applyWallpaper(current);
    } catch (err) {
      console.warn("[WallpaperService] Failed to init wallpaper", err);
    }
  }
};

if (typeof chrome !== "undefined" && chrome?.storage?.onChanged) {
  chrome.storage.onChanged.addListener((changes: any, area: string) => {
    if (area === "local" && changes.heroBackground) {
      void WallpaperService.applyWallpaper(changes.heroBackground.newValue);
    }
  });
}

// 全局性能守护：当页面切入后台（如切换标签页或最小化浏览器）时，自动休眠视频壁纸解码；切回时自动恢复
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    const video = document.querySelector<HTMLVideoElement>("#hero-background-media video");
    if (!video) return;
    if (document.hidden) {
      if (!video.paused) video.pause();
    } else {
      if (video.paused) void video.play().catch(() => {});
    }
  });
}
