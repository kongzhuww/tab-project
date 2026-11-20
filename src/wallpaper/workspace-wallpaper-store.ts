export type WallpaperWorkspace = 'bilibili' | 'todoist' | 'github';
export interface WorkspaceWallpaperSelection {
  kind: 'image' | 'video' | 'web' | 'css';
  sourceId: string;
  blob?: Blob;
  src?: string;
  background?: string;
  pack?: { type: 'web' | 'video'; entry?: string; name?: string; files: Array<{ path: string; file: Blob; mime?: string }>; properties?: Record<string, unknown> };
}
export interface WorkspaceWallpaper { enabled: boolean; image: Blob | null; name: string; selection?: WorkspaceWallpaperSelection }
const DB = 'tab-project-workspace-wallpapers';
const STORE = 'wallpapers';
export const WORKSPACE_WALLPAPER_EVENT = 'workspace-wallpaper-changed';
export const WORKSPACE_WALLPAPER_REVISION = 'workspaceWallpaperRevision:';
const MAX_BYTES = 20 * 1024 * 1024;
declare const chrome: any;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('无法打开壁纸存储'));
  });
}

export async function readWorkspaceWallpaper(id: WallpaperWorkspace): Promise<WorkspaceWallpaper> {
  const db = await openDb();
  try {
    return await new Promise((resolve, reject) => {
      const request = db.transaction(STORE, 'readonly').objectStore(STORE).get(id);
      request.onsuccess = () => resolve(request.result || { enabled: false, image: null, name: '' });
      request.onerror = () => reject(request.error || new Error('读取背景失败'));
    });
  } finally { db.close(); }
}

export async function saveWorkspaceWallpaper(id: WallpaperWorkspace, change: { enabled?: boolean; image?: Blob | null; name?: string; selection?: WorkspaceWallpaperSelection }): Promise<void> {
  if (change.image && (!change.image.type.startsWith('image/') || change.image.size > MAX_BYTES)) {
    throw new Error('请选择不超过 20 MB 的图片。');
  }
  const db = await openDb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const store = tx.objectStore(STORE);
      const request = store.get(id);
      request.onsuccess = () => {
        const previous = request.result || { enabled: false, image: null, name: '' };
        store.put({ ...previous, ...change }, id);
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('保存背景失败'));
      tx.onabort = () => reject(tx.error || new Error('保存背景失败'));
    });
  } finally { db.close(); }
  window.dispatchEvent(new CustomEvent(WORKSPACE_WALLPAPER_EVENT, { detail: id }));
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    void chrome.storage.local.set({ [WORKSPACE_WALLPAPER_REVISION + id]: `${Date.now()}-${Math.random()}` }).catch(() => {});
  }
}
