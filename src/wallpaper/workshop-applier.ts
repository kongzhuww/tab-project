/**
 * Steam 工坊壁纸一键克隆与即时应用器
 * 1. 0 毫秒即时上屏：直接使用本地 File 实例瞬间换壁纸，UI 绝不卡顿
 * 2. 持久化存储 heroBackground：确保页面刷新后 100% 保持当前壁纸不失效
 * 3. 写入 OPFS 私有文件系统：保证关机重启、重开浏览器 0 弹窗秒播
 * 4. 绕过 IndexedDB 实体大二进制写入：防止 180MB 限制报错
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

    // 1. 0 毫秒即刻上屏并持久化 heroBackground (保证页面刷新不失效)
    await WallpaperService.setWallpaper(wallpaperVal, pack);

    // 2. 存入轻量历史记录元数据 (附带封面图，绝不重复生成卡片)
    await WallpaperService.addHistory(wallpaperVal, null, previewImage);

    // 3. 完整写入 OPFS 私有文件系统 (冷启动保证 0 弹窗秒播)
    await saveActiveWallpaperToOpfs(pack);

    return true;
  } catch (err) {
    console.error("[Workshop Applier] Failed to apply wallpaper:", err);
    throw err;
  }
}
