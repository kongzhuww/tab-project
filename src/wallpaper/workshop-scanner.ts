/**
 * Steam 创意工坊本地目录扫描器与 project.json 解析器
 * 支持纯浏览器 File System Access API (showDirectoryPicker)
 * 智能识别 431960 根目录或单个壁纸文件夹，解析 Web / Video / Scene 资产元数据
 */

import { openBackgroundDb } from "../services/wallpaper.service";

export interface WorkshopItemInfo {
  id: string;
  title: string;
  description?: string;
  type: "web" | "video" | "scene" | "unknown";
  entryFile?: string;
  previewUrl?: string;
  previewBase64?: string;
  properties?: Record<string, any>;
  tags?: string[];
  folderHandle?: FileSystemDirectoryHandle;
}

const DB_STORE_NAME = "files";
const DB_WORKSHOP_HANDLE_KEY = "we-workshop-dir-handle";
const DB_CACHED_WORKSHOP_ITEMS_KEY = "we-cached-workshop-items-meta";

let previewUrls: string[] = [];

/**
 * 将 Blob 图片极速转为 Base64 便于离线永久缓存
 */
async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(blob);
  });
}

/**
 * 持久化缓存已扫描的工坊壁纸元数据与封面图 (刷新页面秒级呈现，无需重复加载)
 */
export async function saveCachedWorkshopItems(items: WorkshopItemInfo[]): Promise<void> {
  try {
    const db = await openBackgroundDb();
    const storable = items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      entryFile: item.entryFile,
      previewBase64: item.previewBase64 || (item.previewUrl?.startsWith("data:") ? item.previewUrl : undefined),
      properties: item.properties,
      tags: item.tags,
    }));
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, "readwrite");
      tx.objectStore(DB_STORE_NAME).put(storable, DB_CACHED_WORKSHOP_ITEMS_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("[Workshop Scanner] Failed to cache workshop items:", err);
  }
}

/**
 * 从本地存储中秒级读取已缓存的工坊壁纸 (0 弹窗、0 毫秒等待)
 */
export async function loadCachedWorkshopItems(): Promise<WorkshopItemInfo[]> {
  try {
    const db = await openBackgroundDb();
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE_NAME, "readonly");
      const req = tx.objectStore(DB_STORE_NAME).get(DB_CACHED_WORKSHOP_ITEMS_KEY);
      req.onsuccess = () => {
        const raw = req.result;
        if (!Array.isArray(raw)) return resolve([]);
        const list: WorkshopItemInfo[] = raw.map((r: any) => ({
          ...r,
          previewUrl: r.previewBase64 || undefined,
        }));
        resolve(list);
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

/**
 * 释放扫描生成的预览封面图 ObjectURL
 */
export function revokeWorkshopPreviews(): void {
  for (const url of previewUrls) {
    try {
      URL.revokeObjectURL(url);
    } catch (_) {}
  }
  previewUrls = [];
}

/**
 * 从 IndexedDB 获取已保存的工坊目录句柄
 */
export async function getSavedWorkshopDirectoryHandle(): Promise<FileSystemDirectoryHandle | null> {
  try {
    const db = await openBackgroundDb();
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE_NAME, "readonly");
      const req = tx.objectStore(DB_STORE_NAME).get(DB_WORKSHOP_HANDLE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * 将工坊目录句柄持久化写入 IndexedDB
 */
export async function saveWorkshopDirectoryHandle(handle: FileSystemDirectoryHandle): Promise<void> {
  try {
    const db = await openBackgroundDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(DB_STORE_NAME, "readwrite");
      tx.objectStore(DB_STORE_NAME).put(handle, DB_WORKSHOP_HANDLE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("[Workshop Scanner] Failed to persist directory handle:", err);
  }
}

/**
 * 检查并请求目录句柄的只读权限 (支持在用户手势下恢复)
 */
export async function verifyDirectoryPermission(
  handle: FileSystemDirectoryHandle,
  requestIfNeeded = false
): Promise<boolean> {
  if (!handle || typeof (handle as any).queryPermission !== "function") return false;
  try {
    const status = await (handle as any).queryPermission({ mode: "read" });
    if (status === "granted") return true;
    if (requestIfNeeded && typeof (handle as any).requestPermission === "function") {
      const reqStatus = await (handle as any).requestPermission({ mode: "read" });
      return reqStatus === "granted";
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * 弹出原生文件夹选择器，供用户关联本地 Steam 431960 工坊目录
 */
export async function pickWorkshopDirectory(): Promise<FileSystemDirectoryHandle | null> {
  if (typeof window === "undefined" || typeof (window as any).showDirectoryPicker !== "function") {
    throw new Error("当前浏览器环境不支持 File System Access API");
  }

  const handle = await (window as any).showDirectoryPicker({
    id: "steam-wallpaper-engine-431960",
    mode: "read",
  });

  if (handle) {
    await saveWorkshopDirectoryHandle(handle);
  }
  return handle;
}

/**
 * 尝试从指定文件夹中提取封面缩略图并生成 Blob URL
 */
async function extractPreviewUrl(
  dirHandle: FileSystemDirectoryHandle,
  specifiedFile?: string
): Promise<string | undefined> {
  const candidateNames = [
    specifiedFile,
    "preview.jpg",
    "preview.png",
    "preview.gif",
    "preview.webp",
  ].filter(Boolean) as string[];

  for (const name of candidateNames) {
    try {
      const fileHandle = await dirHandle.getFileHandle(name, { create: false });
      const file = await fileHandle.getFile();
      if (file && file.size > 0) {
        const url = URL.createObjectURL(file);
        previewUrls.push(url);
        return url;
      }
    } catch (_) {
      // 当前候选名不存在，继续尝试下一个
    }
  }
  return undefined;
}

/**
 * 解析单个壁纸文件夹内的 project.json
 */
async function parseSingleWorkshopFolder(
  folderHandle: FileSystemDirectoryHandle,
  fallbackId: string
): Promise<WorkshopItemInfo | null> {
  let projectHandle: FileSystemFileHandle;
  try {
    projectHandle = await folderHandle.getFileHandle("project.json", { create: false });
  } catch {
    return null;
  }

  try {
    const file = await projectHandle.getFile();
    const text = await file.text();
    const json = JSON.parse(text);

    let rawType = String(json.type || "").toLowerCase();
    const entryFile = json.file || "";

    // 智能推断类型
    let type: "web" | "video" | "scene" | "unknown" = "unknown";
    if (rawType === "web" || /\.html?$/i.test(entryFile)) {
      type = "web";
    } else if (rawType === "video" || /\.(mp4|webm|mkv|mov)$/i.test(entryFile)) {
      type = "video";
    } else if (rawType === "scene" || /\.pkg$/i.test(entryFile)) {
      type = "scene";
    }

    const previewUrl = await extractPreviewUrl(folderHandle, json.preview);

    return {
      id: String(json.workshopid || fallbackId),
      title: json.title || fallbackId || "未命名工坊壁纸",
      description: json.description || "",
      type,
      entryFile,
      previewUrl,
      properties: json.general?.properties || undefined,
      tags: Array.isArray(json.tags) ? json.tags : undefined,
      folderHandle,
    };
  } catch (err) {
    console.warn("[Workshop Scanner] Failed to parse project.json in", fallbackId, err);
    return null;
  }
}

/**
 * 递归扫描工坊根目录下的所有壁纸文件夹
 */
export async function scanWorkshopDirectory(
  rootHandle: FileSystemDirectoryHandle
): Promise<WorkshopItemInfo[]> {
  revokeWorkshopPreviews();
  const results: WorkshopItemInfo[] = [];

  // 1. 若用户直接选择的是单个壁纸文件夹
  const directSingle = await parseSingleWorkshopFolder(rootHandle, rootHandle.name);
  if (directSingle) {
    return [directSingle];
  }

  // 2. 遍历其所有子目录 (通常对应各个工坊 ID 文件夹)
  const subDirs: Array<{ name: string; handle: FileSystemDirectoryHandle }> = [];
  // @ts-ignore
  for await (const [name, handle] of (rootHandle as any).entries()) {
    if (handle.kind === "directory") {
      subDirs.push({ name, handle: handle as FileSystemDirectoryHandle });
    }
  }

  // 限制或并发解析前 150 款本地壁纸
  const parsePromises = subDirs.slice(0, 150).map(async (dir) => {
    return parseSingleWorkshopFolder(dir.handle, dir.name);
  });

  const parsedList = await Promise.all(parsePromises);
  for (const item of parsedList) {
    if (item) {
      results.push(item);
    }
  }

  // 按照有封面和标题排序
  results.sort((a, b) => {
    if (a.previewUrl && !b.previewUrl) return -1;
    if (!a.previewUrl && b.previewUrl) return 1;
    return a.title.localeCompare(b.title, "zh-CN");
  });

  // 异步自动持久化缓存壁纸卡片，保证页面刷新秒开不闪退
  void saveCachedWorkshopItems(results);

  return results;
}
