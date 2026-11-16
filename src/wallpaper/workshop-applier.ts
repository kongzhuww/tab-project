/**
 * Steam 工坊壁纸应用器：读取本地壁纸文件，尝试写入 OPFS，
 * 应用壁纸并保存元数据。文件访问和后续恢复仍可能受权限或存储状态影响。
 */

import type { WorkshopItemInfo } from "./workshop-scanner";
import { getSavedWorkshopDirectoryHandle, verifyDirectoryPermission } from "./workshop-scanner";
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
  let folderHandle = item.folderHandle;

  // 若从离线缓存恢复，自动通过已保存的根目录句柄恢复子文件夹引用
  if (!folderHandle) {
    const rootHandle = await getSavedWorkshopDirectoryHandle();
    if (rootHandle) {
      const hasPerm = await verifyDirectoryPermission(rootHandle, true);
      if (hasPerm) {
        try {
          folderHandle = await rootHandle.getDirectoryHandle(item.id, { create: false });
        } catch {
          folderHandle = rootHandle;
        }
      }
    }
  }

  if (!folderHandle) {
    throw new Error("无法访问壁纸文件夹，请点击重新扫描关联目录");
  }

  try {
    const files = await collectFolderFiles(folderHandle);
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

    const previewImage = item.previewUrl || item.previewBase64;
    const wallpaperVal = {
      type: pack.type,
      name: item.title,
      workshopId: item.id,
      entry: pack.entry,
      previewUrl: previewImage,
      isWorkshop: true
    };

    // 1. 尝试缓存文件到 OPFS，失败时继续应用本次选择的壁纸。
    try {
      await saveActiveWallpaperToOpfs(pack);
    } catch (e) {
      console.warn("[Workshop Applier] OPFS save warning:", e);
    }

    // 2. 应用壁纸并保存配置。
    await WallpaperService.setWallpaper(wallpaperVal, pack);

    // 3. 存入轻量历史记录元数据 (附带封面图，绝不重复生成卡片)
    await WallpaperService.addHistory(wallpaperVal, null, previewImage);

    return true;
  } catch (err) {
    console.error("[Workshop Applier] Failed to apply wallpaper:", err);
    throw err;
  }
}
