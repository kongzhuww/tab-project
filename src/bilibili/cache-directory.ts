// Browser-granted handles stay in IndexedDB, never in synced preferences or source paths.
const DB_NAME = "logicweaver-bili-cache-v1";
const DIRECTORY_KEY = "biliCacheDirectory";
const ACTIVE_ID_KEY = "activeDirectoryId";
const LEGACY_DB_NAME = "logicweaver-bili-cache";
const LEGACY_DIRECTORY_KEY = "video-folder";

export type CacheDirectoryHandle = FileSystemDirectoryHandle & {
  queryPermission(options: { mode: "read" | "readwrite" }): Promise<PermissionState>;
  requestPermission(options: { mode: "read" | "readwrite" }): Promise<PermissionState>;
};
export interface CacheDirectory {
  handle: CacheDirectoryHandle;
  id?: string;
}

async function openDb(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("handles")) request.result.createObjectStore("handles");
    };
    let abandoned = false;
    request.onsuccess = () => {
      if (abandoned) request.result.close();
      else resolve(request.result);
    };
    request.onerror = () => reject(new Error("缓存目录存储无法打开"));
    request.onblocked = () => {
      abandoned = true;
      reject(new Error("缓存目录存储正被其他页面占用，请关闭旧页面后重试"));
    };
  });
}

async function readValues(name: string, keys: string[]): Promise<any[]> {
  const db = await openDb(name);
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction("handles", "readonly");
      const store = tx.objectStore("handles");
      const values: any[] = [];
      keys.forEach((key, index) => {
        const request = store.get(key);
        request.onsuccess = () => { values[index] = request.result; };
      });
      tx.oncomplete = () => resolve(values);
      tx.onerror = tx.onabort = () => reject(new Error("缓存目录读取失败"));
    });
  } finally { db.close(); }
}

export async function getConfiguredCacheLocation(): Promise<CacheDirectory | null> {
  const [handle, id] = await readValues(DB_NAME, [DIRECTORY_KEY, ACTIVE_ID_KEY]);
  if (handle?.kind === "directory") return { handle, id: typeof id === "string" ? id : undefined };
  const [legacy] = await readValues(LEGACY_DB_NAME, [LEGACY_DIRECTORY_KEY]);
  return legacy?.kind === "directory" ? { handle: legacy } : null;
}

export async function getConfiguredCacheDirectory(): Promise<CacheDirectoryHandle | null> {
  return (await getConfiguredCacheLocation())?.handle || null;
}

async function storeDirectory(handle: FileSystemDirectoryHandle, activate: boolean): Promise<string> {
  const id = crypto.randomUUID();
  const db = await openDb(DB_NAME);
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("handles", "readwrite");
      const store = tx.objectStore("handles");
      // Retain earlier handles: switching the destination must not redirect existing records.
      store.put(handle, `directory:${id}`);
      if (activate) {
        store.put(handle, DIRECTORY_KEY);
        store.put(id, ACTIVE_ID_KEY);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => reject(new Error("缓存目录保存未确认，请重读核对后再试"));
    });
    return id;
  } finally { db.close(); }
}

export function saveConfiguredCacheDirectory(handle: FileSystemDirectoryHandle): Promise<string> {
  return storeDirectory(handle, true);
}

export function rememberCacheDirectory(handle: FileSystemDirectoryHandle): Promise<string> {
  return storeDirectory(handle, false);
}

export async function getCacheDirectoryById(id: string): Promise<CacheDirectoryHandle | null> {
  const [handle] = await readValues(DB_NAME, [`directory:${id}`]);
  return handle?.kind === "directory" ? handle : null;
}

export async function requireCacheDirectoryPermission(handle: CacheDirectoryHandle, mode: "read" | "readwrite"): Promise<void> {
  if (await handle.queryPermission({ mode }) !== "granted" &&
      await handle.requestPermission({ mode }) !== "granted") {
    throw new Error("未取得缓存目录权限，请在设置中重新选择或授权");
  }
}
