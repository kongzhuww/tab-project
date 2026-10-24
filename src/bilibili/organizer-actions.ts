declare const chrome: any;

import { biliFavoritesController, biliFavoritesState } from "./bili-favorites-store";
import { biliRadioPlayer } from "./radio-player";

function storageGet(keys: string[]): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.get(keys, resolve);
    } else {
      const res: Record<string, any> = {};
      keys.forEach((k) => {
        try {
          const val = localStorage.getItem(k);
          if (val) res[k] = JSON.parse(val);
        } catch {}
      });
      resolve(res);
    }
  });
}

const organizer = () => biliFavoritesState.organizer;

export const biliOrganizerActions = {
  async openCache(): Promise<void> {
    biliFavoritesController.updateOrganizer({ mode: "cache", cacheLoading: true });
    try {
      const stored = await storageGet(["biliCachedVideosV1"]);
      const records = Array.isArray(stored.biliCachedVideosV1) ? stored.biliCachedVideosV1 : [];
      biliFavoritesController.updateOrganizer({
        cachedVideos: records.filter((item: any) => item?.bvid && item?.fileName).map((item: any) => ({
          id: String(item.bvid),
          bvid: String(item.bvid),
          aid: String(item.aid || ""),
          title: String(item.title || item.bvid),
          cover: String(item.cover || ""),
          fileName: String(item.fileName),
          directoryId: typeof item.directoryId === "string" ? item.directoryId : undefined,
          sizeText: item.size ? `${(Number(item.size) / 1048576).toFixed(1)} MB` : "大小未知",
          cachedDate: item.cachedAt ? new Date(item.cachedAt).toLocaleDateString() : "未知"
        }))
      });
    } catch (error) {
      console.warn("[Bilibili] 读取缓存列表失败", error);
      (window as any).showBiliToast?.("读取缓存列表失败");
    } finally {
      biliFavoritesController.updateOrganizer({ cacheLoading: false });
    }
  },
  playSpecialPage(): void {
    const videos = organizer().specialVideos.filter((video) => video.bvid);
    if (!videos.length) return;
    biliRadioPlayer.playQueue({
      name: `${organizer().specialTitle || "B站视频"} (第${organizer().specialPage || 1}页)`,
      items: videos.map((video) => ({
        bvid: video.bvid, title: video.title, cover: video.cover, author: video.author
      })),
      startIndex: 0
    });
  },
  cachedVideo(id: string) {
    return organizer().cachedVideos.find((video) => String(video.id) === id || video.bvid === id);
  },
  deleteCachedVideo(id: string): void {
    biliFavoritesController.updateOrganizer({
      cachedVideos: organizer().cachedVideos.filter((video) => String(video.id) !== id)
    });
    (window as any).showBiliToast?.("本地缓存已从列表移除");
  }
};
