/**
 * Steam 工坊壁纸一键克隆与即时应用器
 * 将用户选中的本地壁纸文件夹 assets 毫秒级打包并克隆写入 OPFS 活跃私有目录
 * 随即热通知 WallpaperService 完成背景零闪烁切换
 */

import type { WorkshopItemInfo } from "./workshop-scanner";
import { saveActiveWallpaperToOpfs } from "./opfs-storage";
import { WallpaperService, backgroundDbPut } from "../services/wallpaper.service";

/**
 * 递归收集工坊子目录下的所有文件 (保留相对路径)
 */
async function collectFolderFiles(
  dirHandle: FileSystemDirectoryHandle,
  basePath = ""
): Promise<Array<{ path: string; file: File; mime?: string }>> {
  const result: Array<{ path: string; file: File; mime?: string }> = [];

  // @ts-ignore
  for await (const [name, handle] of (dirHandle as any).entries()) {
    const relPath = basePath ? `${basePath}/${name}` : name;
    if (handle.kind === "file") {
      const file = await (handle as FileSystemFileHandle).getFile();
      result.push({
        path: relPath,
        file,
        mime: file.type || undefined,
      });
    } else if (handle.kind === "directory") {
      // 避免无限递归过深的目录
      if (basePath.split("/").length < 8) {
        const sub = await collectFolderFiles(handle as FileSystemDirectoryHandle, relPath);
        result.push(...sub);
      }
    }
  }

  return result;
}

/**
 * 应用指定的本地 Steam 创意工坊壁纸
 */
export async function applyWorkshopWallpaper(item: WorkshopItemInfo): Promise<boolean> {
  if (!item.folderHandle) return false;

  try {
    // 1. 递归读取该壁纸文件夹下的所有资源
    const files = await collectFolderFiles(item.folderHandle);
    if (!files.length) {
      throw new Error("壁纸文件夹为空或无法读取");
    }

    const pack = {
      type: item.type === "video" ? ("video" as const) : ("web" as const),
      entry: item.entryFile || (item.type === "video" ? files[0]?.path : "index.html"),
      name: item.title,
      properties: item.properties || {},
      files,
    };

    // 2. 写入 OPFS 私有文件系统 (实现此后冷启动零弹窗秒读)
    await saveActiveWallpaperToOpfs(pack);

    // 3. 同时在 IndexedDB 中持久化当前壁纸包以支持回退与历史管理
    const historyId = `workshop-${item.id}`;
    await backgroundDbPut(pack, historyId);

    // 4. 添加到壁纸历史记录并激活
    const wallpaperVal = {
      type: pack.type,
      storageKey: historyId,
      name: item.title,
      workshopId: item.id,
    };

    await WallpaperService.addHistory(wallpaperVal, pack);
    await WallpaperService.applyWallpaper(wallpaperVal);

    return true;
  } catch (err) {
    console.error("[Workshop Applier] Failed to apply wallpaper:", err);
    throw err;
  }
}
