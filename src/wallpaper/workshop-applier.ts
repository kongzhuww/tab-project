/**
 * Steam 工坊壁纸一键克隆与即时应用器
 * 1. 0 毫秒即时上屏：直接使用本地 File 实例瞬间换壁纸，UI 绝不卡顿
 * 2. 后台异步静默写入 OPFS 保证冷启动 0 弹窗
 * 3. 绕过 IndexedDB 实体写入，彻底杜绝 180MB 上限与数据库膨胀
 */

import type { WorkshopItemInfo } from "./workshop-scanner";
import { saveActiveWallpaperToOpfs } from "./opfs-storage";
import { WallpaperService } from "../services/wallpaper.service";

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
      // 避免过深的异常嵌套目录
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
    // 快速收集该文件夹下的必要资产
    const files = await collectFolderFiles(item.folderHandle);
    if (!files.length) {
      throw new Error("壁纸文件夹为空或无法读取");
    }

    const isVideo = item.type === "video" || files.some(f => /\.(mp4|webm|mkv)$/i.test(f.path));
    const pack = {
      type: isVideo ? ("video" as const) : ("web" as const),
      entry: item.entryFile || (isVideo ? files.find(f => /\.(mp4|webm|mkv)$/i.test(f.path))?.path : "index.html"),
      name: item.title,
      workshopId: item.id,
      properties: item.properties || {},
      files,
    };

    const wallpaperVal = {
      type: pack.type,
      name: item.title,
      workshopId: item.id,
      entry: pack.entry,
      isWorkshop: true
    };

    // 1. 0 毫秒即刻上屏 (直接传递已在内存中的 pack，UI 零延迟换壁纸)
    await WallpaperService.applyWallpaper(wallpaperVal, pack);

    // 2. 存入轻量历史记录 (不把几百 MB 的实体二进制存进 IndexedDB，防膨胀与 180MB 超限)
    await WallpaperService.addHistory(wallpaperVal, null);

    // 3. 后台异步静默写入 OPFS 私有文件系统 (冷启动保证 0 弹窗)
    void saveActiveWallpaperToOpfs(pack).catch(err => {
      console.warn("[Workshop Applier] Background OPFS sync warning:", err);
    });

    return true;
  } catch (err) {
    console.error("[Workshop Applier] Failed to apply wallpaper:", err);
    throw err;
  }
}
