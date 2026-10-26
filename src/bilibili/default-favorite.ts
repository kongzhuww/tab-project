/**
 * 保存视频到默认 B站 收藏夹（优先收集箱/收件箱/默认收藏夹）。
 */
import { bilibiliService, type BiliFolderData } from "../services/bilibili.service";

function notifyToast(text: string): void {
  const g = globalThis as any;
  if (typeof g.showBiliToast === "function") {
    g.showBiliToast(text);
  }
}

export interface SaveDefaultFavoriteResult {
  ok: boolean;
  reason?: string;
  targetFolder?: BiliFolderData;
}

export async function saveBiliVideoToDefaultFavorite(
  video: { aid?: string | number; bvid?: string; [key: string]: any },
  notify: (text: string) => void = notifyToast
): Promise<SaveDefaultFavoriteResult> {
  let aid = video.aid;
  const bvid = video.bvid || "";
  if (!aid && bvid) {
    try {
      const detail = await bilibiliService.api<any>(
        `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`
      );
      aid = detail?.aid;
      if (aid) video.aid = aid;
    } catch (e) {
      console.error("解析视频 aid 失败", e);
    }
  }
  if (!aid) {
    notify("未能获取到该视频 AID，请稍后重试");
    return { ok: false, reason: "未能获取到该视频 AID" };
  }

  const user = await bilibiliService.getUserNav();
  if (!user.isLogin) {
    notify("未能获取到 B站收藏夹，请确认已登录 B站");
    return { ok: false, reason: "未能获取到 B站收藏夹" };
  }

  const folders = await bilibiliService.getCreatedFolders(user.mid);
  if (!folders || !folders.length) {
    notify("未能获取到 B站收藏夹，请确认已登录 B站");
    return { ok: false, reason: "未能获取到 B站收藏夹" };
  }

  const targetFolder =
    folders.find((f) => f.title === "收集箱") ||
    folders.find((f) => f.title && f.title.includes("收集箱")) ||
    folders.find((f) => f.title && f.title.includes("收件箱")) ||
    folders.find((f) => f.title === "默认收藏夹") ||
    folders.find((f) => f.title && f.title.includes("默认")) ||
    folders[0];

  if (!targetFolder?.id) {
    notify("未找到目标收藏夹，请检查 B站 收藏夹设置");
    return { ok: false, reason: "未找到目标收藏夹" };
  }

  notify(`正在保存至「${targetFolder.title}」…`);
  const result = await bilibiliService.addVideoToFavorite(targetFolder.id, aid);
  if (result.ok) {
    notify(`已成功保存到「${targetFolder.title}」`);
    return { ok: true, targetFolder };
  } else {
    const reason = result.reason || "保存失败";
    if (reason.includes("已") || reason.includes("exist") || reason.includes("11201")) {
      notify(`该视频已在「${targetFolder.title}」中`);
    } else {
      notify(`保存失败：${reason}`);
    }
    return result;
  }
}
