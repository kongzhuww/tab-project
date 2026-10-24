import { bilibiliService } from "../services/bilibili.service";
import { biliMiniPlayerController } from "./mini-player-store";
import {
  getConfiguredCacheLocation, getCacheDirectoryById, getConfiguredCacheDirectory,
  rememberCacheDirectory, requireCacheDirectoryPermission
} from "./cache-directory";
export { getConfiguredCacheDirectory, saveConfiguredCacheDirectory } from "./cache-directory";

declare const chrome: any;
export const CACHE_LIST_KEY = "biliCachedVideosV1";

export interface CachedVideo {
  bvid: string;
  aid?: string | number | null;
  title: string;
  cover: string;
  fileName: string;
  directoryId?: string;
  size?: number;
  cachedAt?: number;
}

function toast(text: string): void {
  (window as any).showBiliToast?.(text);
}

const pending = new Set<string>();

async function saveCacheRecord(item: CachedVideo): Promise<void> {
  if (!navigator.locks) throw new Error("缓存索引无法锁定");
  await navigator.locks.request("logicweaver:bili-cache-index", { signal: AbortSignal.timeout(15000) }, async () => {
    const stored = await chrome.storage.local.get(CACHE_LIST_KEY);
    if (stored[CACHE_LIST_KEY] !== undefined && !Array.isArray(stored[CACHE_LIST_KEY])) {
      throw new Error("缓存索引格式异常，未覆盖原记录");
    }
    const previous: CachedVideo[] = stored[CACHE_LIST_KEY] || [];
    await chrome.storage.local.set({ [CACHE_LIST_KEY]: [item, ...previous.filter(entry => entry?.bvid !== item.bvid)] });
  });
}

export async function cacheBiliVideo(video: { bvid?: string; aid?: string | number; title?: string; cover?: string }): Promise<boolean> {
  const bvid = String(video.bvid || "");
  if (!/^BV[a-zA-Z0-9]+$/.test(bvid)) { toast("缺少有效的视频编号"); return false; }
  if (pending.has(bvid)) { toast("该视频正在缓存，请勿重复提交"); return false; }
  pending.add(bvid);
  let saved = false;
  let responseBody: ReadableStream<Uint8Array> | null = null;
  let failureMessage = "无法读取缓存目录，请在设置中选择或重新授权";
  const controller = new AbortController();
  const stop = () => controller.abort();
  const timer = setTimeout(stop, 30 * 60 * 1000);
  window.addEventListener("pagehide", stop, { once: true });
  try {
    const location = await getConfiguredCacheLocation();
    if (!location) {
      toast("请先在设置 → 文件夹与存储 → B站视频缓存目录中选择存放目录");
      return false;
    }
    await requireCacheDirectoryPermission(location.handle, "readwrite");
    const directoryId = location.id || await rememberCacheDirectory(location.handle);
    failureMessage = "播放流解析失败，请稍后手动重试";
    toast(`正在解析「${video.title || bvid}」播放流…`);
    const track = await bilibiliService.resolvePlayStream(video);
    const source = track.sources[0];
    if (!source) throw new Error("没有可缓存的播放源");
    const url = new URL(source);
    if (url.protocol !== "https:" || url.username || url.password ||
        !/(^|\.)(bilivideo\.(com|cn)|bilibili\.com|hdslb\.com)$/.test(url.hostname)) {
      throw new Error("不支持的播放源");
    }
    failureMessage = "视频下载或目录写入失败，未登记为缓存；请检查网络、目录权限和可用空间";
    const response = await fetch(url.href, { credentials: "omit", referrerPolicy: "no-referrer", signal: controller.signal });
    responseBody = response.body;
    if (!response.ok || !responseBody) throw new Error("视频流不可读取");
    const type = response.headers.get("content-type") || "";
    if (/text\/|json|html/i.test(type)) { await responseBody.cancel(); throw new Error("响应不是视频流"); }
    const safeTitle = String(track.title || video.title || bvid)
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").replace(/[. ]+$/g, "").slice(0, 100);
    // A unique destination avoids silently overwriting an existing video, including across tabs.
    const fileName = `${safeTitle}_${bvid}_${crypto.randomUUID()}.mp4`;
    const file = await location.handle.getFileHandle(fileName, { create: true });
    const writable = await file.createWritable();
    toast(`正在缓存到「${location.handle.name}」，请保持当前页面打开…`);
    await responseBody.pipeTo(writable, { signal: controller.signal });
    saved = true;
    const size = (await file.getFile()).size;
    if (!size) throw new Error("视频文件为空");
    await saveCacheRecord({
      bvid, aid: track.aid || video.aid || null,
      title: track.title || video.title || bvid,
      cover: track.poster || video.cover || "", fileName, directoryId, size, cachedAt: Date.now()
    });
    toast(`已缓存到「${location.handle.name}」`);
    return true;
  } catch {
    toast(saved ? "文件已写入，但缓存记录保存未确认；请核对目录与列表，不要重复缓存" : failureMessage);
    return false;
  } finally {
    clearTimeout(timer);
    window.removeEventListener("pagehide", stop);
    if (responseBody && !responseBody.locked) void responseBody.cancel().catch(() => {});
    pending.delete(bvid);
  }
}

export async function openCachedBiliVideo(item: CachedVideo): Promise<void> {
  let objectUrl = "";
  try {
    if (!item.fileName || /[\\/]/.test(item.fileName) || item.fileName === "." || item.fileName === "..") {
      throw new Error("缓存文件名无效");
    }
    const directory = item.directoryId
      ? await getCacheDirectoryById(item.directoryId)
      : await getConfiguredCacheDirectory();
    if (!directory) {
      toast("请在设置 → 文件夹与存储 → B站视频缓存目录中选择此视频实际所在的目录");
      return;
    }
    await requireCacheDirectoryPermission(directory, "read");
    const handle = await directory.getFileHandle(item.fileName);
    const file = await handle.getFile();
    if (!file.size) throw new Error("缓存文件为空");
    objectUrl = URL.createObjectURL(file);
    await biliMiniPlayerController.openVideo({
      bvid: item.bvid, aid: item.aid || undefined, title: item.title, cover: item.cover,
      cachedSourceUrl: objectUrl
    });
    objectUrl = ""; // The player now owns and revokes this URL on close/source change.
  } catch {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    toast("本地缓存无法打开：请核对文件是否存在，并在设置中重新授权目录；未改为在线播放");
  }
}
