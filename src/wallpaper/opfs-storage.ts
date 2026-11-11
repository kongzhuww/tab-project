/**
 * OPFS (Origin Private File System) 活跃壁纸静默存储管线
 * 解决浏览器重启后 showDirectoryPicker 句柄断连需二次授权问题
 * 确保当前正在使用的壁纸 100% 零弹窗、零授权、冷启动瞬时秒读
 */

export interface OpfsFileEntry {
  path: string;
  file: Blob;
  mime?: string;
}

export interface OpfsActiveWallpaperPack {
  type: "web" | "video" | "scene" | "image";
  entry?: string;
  name?: string;
  properties?: Record<string, any>;
  files: OpfsFileEntry[];
  updatedAt?: number;
}

const ACTIVE_WALLPAPER_DIR = "active_wallpaper";
const MANIFEST_FILE_NAME = "_manifest.json";

/**
 * 检测当前环境是否支持 OPFS
 */
export function isOpfsSupported(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.storage?.getDirectory === "function";
}

/**
 * 递归清空指定目录句柄下的所有文件与子目录
 */
async function clearDirectoryHandle(dirHandle: FileSystemDirectoryHandle): Promise<void> {
  const removePromises: Promise<any>[] = [];
  // @ts-ignore - 遍历 entries
  for await (const [name, handle] of (dirHandle as any).entries()) {
    removePromises.push(dirHandle.removeEntry(name, { recursive: handle.kind === "directory" }));
  }
  await Promise.all(removePromises);
}

/**
 * 递归根据路径获取或创建目标目录句柄
 */
async function getOrCreateSubdir(
  root: FileSystemDirectoryHandle,
  pathParts: string[]
): Promise<FileSystemDirectoryHandle> {
  let curr = root;
  for (const part of pathParts) {
    if (!part || part === ".") continue;
    curr = await curr.getDirectoryHandle(part, { create: true });
  }
  return curr;
}

/**
 * 将当前活跃壁纸打包并持久化写入 OPFS 私有文件系统
 * 此后无论关机重启、重开浏览器，均可 100% 静默读取，永不弹窗
 */
export async function saveActiveWallpaperToOpfs(pack: {
  type: "web" | "video" | "scene" | "image";
  entry?: string;
  name?: string;
  properties?: Record<string, any>;
  files: Array<{ path: string; file: Blob | File; mime?: string }>;
}): Promise<boolean> {
  if (!isOpfsSupported()) return false;

  try {
    const root = await navigator.storage.getDirectory();
    const activeDir = await root.getDirectoryHandle(ACTIVE_WALLPAPER_DIR, { create: true });

    // 清理旧的活跃壁纸
    await clearDirectoryHandle(activeDir);

    // 写入清单文件
    const manifestHandle = await activeDir.getFileHandle(MANIFEST_FILE_NAME, { create: true });
    const manifestWritable = await manifestHandle.createWritable();
    const manifestData = {
      type: pack.type,
      entry: pack.entry || "",
      name: pack.name || "Active Wallpaper",
      properties: pack.properties || {},
      updatedAt: Date.now(),
      fileCount: pack.files.length,
    };
    await manifestWritable.write(JSON.stringify(manifestData));
    await manifestWritable.close();

    // 写入所有资产文件
    for (const item of pack.files) {
      const cleanPath = String(item.path || "").replace(/\\/g, "/").replace(/^\/+/, "");
      if (!cleanPath) continue;

      const segments = cleanPath.split("/");
      const fileName = segments.pop()!;
      const parentDir = await getOrCreateSubdir(activeDir, segments);

      const fileHandle = await parentDir.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(item.file);
      await writable.close();
    }

    return true;
  } catch (err) {
    console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", err);
    return false;
  }
}

/**
 * 递归读取指定目录句柄下的所有文件并保留相对路径
 */
async function collectFilesRecursively(
  dirHandle: FileSystemDirectoryHandle,
  basePath: string = ""
): Promise<OpfsFileEntry[]> {
  const result: OpfsFileEntry[] = [];
  // @ts-ignore
  for await (const [name, handle] of (dirHandle as any).entries()) {
    if (name === MANIFEST_FILE_NAME) continue;
    const relPath = basePath ? `${basePath}/${name}` : name;
    if (handle.kind === "file") {
      const file = await (handle as FileSystemFileHandle).getFile();
      result.push({
        path: relPath,
        file,
        mime: file.type || undefined,
      });
    } else if (handle.kind === "directory") {
      const subFiles = await collectFilesRecursively(handle as FileSystemDirectoryHandle, relPath);
      result.push(...subFiles);
    }
  }
  return result;
}

/**
 * 从 OPFS 静默读取当前活跃壁纸 (冷启动 0 弹窗、0 毫秒权限等待)
 */
export async function loadActiveWallpaperFromOpfs(): Promise<OpfsActiveWallpaperPack | null> {
  if (!isOpfsSupported()) return null;

  try {
    const root = await navigator.storage.getDirectory();
    let activeDir: FileSystemDirectoryHandle;
    try {
      activeDir = await root.getDirectoryHandle(ACTIVE_WALLPAPER_DIR, { create: false });
    } catch {
      // 目录尚不存在
      return null;
    }

    // 读取清单
    let manifestHandle: FileSystemFileHandle;
    try {
      manifestHandle = await activeDir.getFileHandle(MANIFEST_FILE_NAME, { create: false });
    } catch {
      return null;
    }

    const manifestFile = await manifestHandle.getFile();
    const manifestText = await manifestFile.text();
    const manifest = JSON.parse(manifestText);

    // 收集所有文件
    const files = await collectFilesRecursively(activeDir);
    if (!files.length && manifest.type !== "image") {
      return null;
    }

    return {
      type: manifest.type || "web",
      entry: manifest.entry || "",
      name: manifest.name || "Active Wallpaper",
      properties: manifest.properties || {},
      updatedAt: manifest.updatedAt || 0,
      files,
    };
  } catch (err) {
    console.warn("[OPFS Wallpaper] 读取活跃壁纸失败:", err);
    return null;
  }
}

/**
 * 清除 OPFS 中的当前活跃壁纸
 */
export async function removeActiveWallpaperFromOpfs(): Promise<boolean> {
  if (!isOpfsSupported()) return false;
  try {
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(ACTIVE_WALLPAPER_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}
