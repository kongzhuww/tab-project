/**
 * WallpaperService — 现代化壁纸管理与存储服务 (纯数据逻辑，无侵入式 DOM 操作)
 */

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

function trackUrl(url: string): string {
  activeObjectUrls.push(url);
  return url;
}

export function clearActiveWallpaperUrls(): void {
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

export const WallpaperService = {
  async loadHistory(): Promise<{ history: WallpaperHistoryItem[]; currentValue: any }> {
    const stored = await storageGet([BACKGROUND_HISTORY_KEY, "heroBackground"]);
    const history: WallpaperHistoryItem[] = Array.isArray(stored[BACKGROUND_HISTORY_KEY]) ? stored[BACKGROUND_HISTORY_KEY] : [];
    return { history, currentValue: stored.heroBackground || null };
  },

  async addHistory(value: any, payload: any = null): Promise<any> {
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
      value: itemValue
    };
    const next = [item, ...history.filter((old) => JSON.stringify(old.value) !== JSON.stringify(itemValue))].slice(
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

  async setWallpaper(value: any): Promise<void> {
    await storageSet({ heroBackground: value });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(value));
    } catch {}
    await this.applyWallpaper(value);
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

  async applyWallpaper(value: any): Promise<void> {
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
    if (value.type === "web") {
      const pack = await backgroundDbGet(value.storageKey || BACKGROUND_CURRENT_KEY);
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
