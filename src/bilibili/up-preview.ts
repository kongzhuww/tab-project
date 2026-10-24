/**
 * UP 主卡片悬停/点击浮层预览与关注操作。
 * 负责定位弹窗、空间信息补全、近期视频展示、取消关注确认及本地关注缓存维护。
 */
import { bilibiliService } from "../services/bilibili.service";
import { formatBiliCompactNumber, formatBiliDuration } from "./channel-format";
import type { BiliFollowedUp, BiliUpGroup } from "./channel-types";
import { followBiliUp, unfollowBiliUp } from "./up-relation";
import { clearUpRecentVideosCache, fetchUpLatestVideos } from "./up-videos";

declare const chrome: any;

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

function storageSet(items: Record<string, any>): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set(items, () => {
        const error = chrome.runtime?.lastError;
        if (error) reject(new Error(error.message || "存储写入失败"));
        else resolve();
      });
    } else {
      try {
        Object.entries(items).forEach(([k, v]) => {
          localStorage.setItem(k, JSON.stringify(v));
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
}

export interface CustomConfirmOptions {
  title?: string;
  content: string | Node;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm?: () => Promise<void> | void;
}

export function showCustomConfirmModal(
  options: CustomConfirmOptions,
  notify: (text: string) => void
): void {
  const g = globalThis as any;
  const controller = g.LogicWeaverBiliOrganizerDialogs;
  if (!controller) {
    notify("确认弹窗尚未加载，请刷新页面");
    return;
  }
  let message = "";
  if (options.content instanceof Node) message = options.content.textContent || "";
  else if (typeof options.content === "string") {
    message = new DOMParser().parseFromString(options.content, "text/html").body.textContent || "";
  }
  controller.openConfirm(
    {
      title: options.title || "确认提示",
      message: message.trim(),
      confirmText: options.confirmText || "确定",
      cancelText: options.cancelText || "取消",
      danger: options.danger !== false
    },
    async () => {
      if (typeof options.onConfirm === "function") await options.onConfirm();
    }
  );
}

export interface UpPreviewAdapter {
  getFollowings: () => BiliFollowedUp[];
  setFollowings: (followings: BiliFollowedUp[]) => void;
  getGroups: () => BiliUpGroup[];
  saveGroups: () => Promise<void>;
  clearAggregationCache: () => void;
  notifyToast: (msg: string) => void;
  refreshManager?: () => void;
}

export function showUpRecentVideosPreview(
  event: { preventDefault?: () => void; stopPropagation?: () => void; clientX: number; clientY: number },
  up: { mid: string | number; name?: string; face?: string; sign?: string },
  adapter: UpPreviewAdapter
): void {
  event.preventDefault?.();
  event.stopPropagation?.();

  const midStr = String(up.mid);
  const followings = adapter.getFollowings() || [];
  if (!up.face || !up.sign) {
    const cachedUp = followings.find((x) => String(x.mid) === midStr);
    if (cachedUp) {
      if (!up.face && cachedUp.face) up.face = cachedUp.face;
      if (!up.sign && cachedUp.sign) up.sign = cachedUp.sign;
    }
  }

  const isFollowed = followings.some((x) => String(x.mid) === midStr);
  const fallbackAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

  const g = globalThis as any;
  if (!g.LogicWeaverBiliUpPreview) return;

  const popWidth = 320;
  const popHeight = 280;
  let left = event.clientX + 10;
  let top = event.clientY + 10;
  if (left + popWidth > window.innerWidth - 12) left = Math.max(12, event.clientX - popWidth - 10);
  if (top + popHeight > window.innerHeight - 12) top = Math.max(12, event.clientY - popHeight - 10);

  g.LogicWeaverBiliUpPreview.open(
    {
      mid: midStr,
      name: up.name || "UP主",
      face: up.face || fallbackAvatar,
      sign: up.sign || "暂无个人简介",
      followed: isFollowed,
      left,
      top,
      loading: true,
      error: "",
      videos: []
    },
    async (nextFollow: boolean) => {
      if (!nextFollow) {
        // 原胶囊按钮二次点击即确认，不再弹任何独立遮罩确认框
        const res = await unfollowBiliUp(midStr);
        if (res.ok) {
          const currentFollowings = adapter.getFollowings();
          if (currentFollowings) {
            adapter.setFollowings(currentFollowings.filter((x) => String(x.mid) !== midStr));
          }
          (adapter.getGroups() || []).forEach((gr) => {
            gr.upMids = (gr.upMids || []).filter((m) => String(m) !== midStr);
          });
          await adapter.saveGroups();
          try {
            const stored = await storageGet(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]);
            const unfollowedArr = Array.isArray(stored.biliUnfollowedMidsV1) ? stored.biliUnfollowedMidsV1 : [];
            const unfollowedSet = new Set(unfollowedArr.map(String));
            unfollowedSet.add(midStr);
            const prevCache = stored.biliFollowingsCacheV1 || {};
            const cleanList = (prevCache.list || adapter.getFollowings() || []).filter((x: any) => String(x.mid) !== midStr);
            await storageSet({
              biliFollowingsCacheV1: { mid: prevCache.mid || "", updatedAt: Date.now(), list: cleanList },
              biliUnfollowedMidsV1: Array.from(unfollowedSet)
            });
          } catch {}
          clearUpRecentVideosCache(midStr);
          adapter.clearAggregationCache();
          adapter.refreshManager?.();
          adapter.notifyToast(`已取消关注「${up.name || midStr}」`);
          return true;
        } else {
          adapter.notifyToast(`取消关注失败：${res.reason || "网络异常"}`);
          return false;
        }
      } else {
        const res = await followBiliUp(midStr);
        if (res.ok) {
          let currentFollowings = adapter.getFollowings();
          if (!currentFollowings) {
            currentFollowings = [];
            adapter.setFollowings(currentFollowings);
          }
          if (!currentFollowings.some((x) => String(x.mid) === midStr)) {
            currentFollowings.unshift({ mid: midStr, name: up.name || "UP主", face: up.face || "", sign: up.sign || "" });
          }
          try {
            const stored = await storageGet(["biliFollowingsCacheV1", "biliUnfollowedMidsV1"]);
            const unfollowedArr = Array.isArray(stored.biliUnfollowedMidsV1) ? stored.biliUnfollowedMidsV1 : [];
            const cleanUnfollowed = unfollowedArr.filter((m) => String(m) !== midStr);
            const prevCache = stored.biliFollowingsCacheV1 || {};
            await storageSet({
              biliFollowingsCacheV1: { mid: prevCache.mid || "", updatedAt: Date.now(), list: currentFollowings },
              biliUnfollowedMidsV1: cleanUnfollowed
            });
          } catch {}
          adapter.refreshManager?.();
          adapter.notifyToast(`已关注「${up.name || midStr}」`);
          return true;
        } else {
          adapter.notifyToast(`关注失败：${res.reason || "网络异常"}`);
          return false;
        }
      }
    }
  );

  if (!up.face || !up.sign) {
    bilibiliService
      .api<any>(`https://api.bilibili.com/x/space/wbi/acc/info?mid=${midStr}`)
      .then((info) => {
        if (info) {
          const face = info.face ? String(info.face).replace(/^http:/, "https:") : up.face;
          const sign = info.sign || up.sign;
          g.LogicWeaverBiliUpPreview.update({ face, sign });
        }
      })
      .catch(() => {});
  }

  fetchUpLatestVideos(up.mid, 3)
    .then((videos) => {
      if (!videos.length) {
        g.LogicWeaverBiliUpPreview.update({ loading: false, videos: [] });
        return;
      }
      g.LogicWeaverBiliUpPreview.update({
        loading: false,
        videos: videos.slice(0, 3).map((v) => ({
          bvid: v.bvid,
          title: v.title,
          cover: v.cover,
          duration: v.duration ? formatBiliDuration(v.duration) : "",
          playCount: formatBiliCompactNumber(v.play),
          published: v.pubTimeDesc || "最新",
          url: v.bvid ? `https://www.bilibili.com/video/${v.bvid}` : "#"
        }))
      });
    })
    .catch(() => {
      g.LogicWeaverBiliUpPreview.update({ loading: false, error: "加载失败，请重试" });
    });
}
