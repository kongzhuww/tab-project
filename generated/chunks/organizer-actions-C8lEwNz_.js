import { b as t, d, c as n } from "./bili-favorites-store-B7MymppO.js";
function s(a) {
  return new Promise((i) => {
    if (typeof chrome < "u" && chrome?.storage?.local)
      chrome.storage.local.get(a, i);
    else {
      const e = {};
      a.forEach((o) => {
        try {
          const c = localStorage.getItem(o);
          c && (e[o] = JSON.parse(c));
        } catch {
        }
      }), i(e);
    }
  });
}
const r = () => n.organizer, g = {
  async openCache() {
    t.updateOrganizer({ mode: "cache", cacheLoading: !0 });
    try {
      const a = await s(["biliCachedVideosV1"]), i = Array.isArray(a.biliCachedVideosV1) ? a.biliCachedVideosV1 : [];
      t.updateOrganizer({
        cachedVideos: i.filter((e) => e?.bvid && e?.fileName).map((e) => ({
          id: String(e.bvid),
          bvid: String(e.bvid),
          aid: String(e.aid || ""),
          title: String(e.title || e.bvid),
          cover: String(e.cover || ""),
          fileName: String(e.fileName),
          directoryId: typeof e.directoryId == "string" ? e.directoryId : void 0,
          sizeText: e.size ? `${(Number(e.size) / 1048576).toFixed(1)} MB` : "大小未知",
          cachedDate: e.cachedAt ? new Date(e.cachedAt).toLocaleDateString() : "未知"
        }))
      });
    } catch (a) {
      console.warn("[Bilibili] 读取缓存列表失败", a), window.showBiliToast?.("读取缓存列表失败");
    } finally {
      t.updateOrganizer({ cacheLoading: !1 });
    }
  },
  playSpecialPage() {
    const a = r().specialVideos.filter((i) => i.bvid);
    a.length && d.playQueue({
      name: `${r().specialTitle || "B站视频"} (第${r().specialPage || 1}页)`,
      items: a.map((i) => ({
        bvid: i.bvid,
        title: i.title,
        cover: i.cover,
        author: i.author
      })),
      startIndex: 0
    });
  },
  cachedVideo(a) {
    return r().cachedVideos.find((i) => String(i.id) === a || i.bvid === a);
  },
  deleteCachedVideo(a) {
    t.updateOrganizer({
      cachedVideos: r().cachedVideos.filter((i) => String(i.id) !== a)
    }), window.showBiliToast?.("本地缓存已从列表移除");
  }
};
export {
  g as biliOrganizerActions
};
