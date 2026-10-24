import { STICKER_DB_NAME, STICKER_ROOT_REVISION_KEY } from "./settings-keys";
import { readFolderLayout, projectFolderTree } from "./folder-layout";
import { loadLibraryIndex, reconcileLibraryIndex, findLibraryIndex, saveLibraryIndex, cloneLibraryIndex, type LibraryIndex } from "./library-index";
import type { StickerDirectoryNode } from "./sticker-types";
declare const chrome: any;

/** Browser metadata only. Never creates, moves or deletes a disk image.
 * Keeps the existing database/version/keys and the index revision-CAS implementation. */
export class StickerLibraryRepository {
  constructor(private readonly owner: string) {}
  open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      let finished = false;
      const fail = () => {
        if (finished) return;
        finished = true; clearTimeout(timer);
        reject(new Error("图库句柄数据库暂不可用，请关闭占用页面后重读；未重置数据"));
      };
      const request = indexedDB.open(STICKER_DB_NAME, 1);
      const timer = setTimeout(fail, 15000);
      request.onblocked = request.onerror = fail;
      request.onupgradeneeded = () => {
        if (finished) { request.transaction?.abort(); return; }
        if (!request.result.objectStoreNames.contains("handles")) request.result.createObjectStore("handles");
      };
      request.onsuccess = () => {
        if (finished) { request.result.close(); return; }
        finished = true; clearTimeout(timer);
        request.result.onversionchange = () => request.result.close();
        resolve(request.result);
      };
    });
  }
  async readRoot(): Promise<FileSystemDirectoryHandle | null> {
    const db = await this.open();
    try {
      return await new Promise<FileSystemDirectoryHandle | null>((resolve, reject) => {
        const tx = db.transaction("handles", "readonly"), request = tx.objectStore("handles").get("root");
        tx.oncomplete = () => resolve((request.result as FileSystemDirectoryHandle) || null);
        tx.onerror = tx.onabort = () => reject(new Error("图库根句柄读取失败，未改用其他图库"));
      });
    } finally { db.close(); }
  }
  async saveRoot(handle: FileSystemDirectoryHandle): Promise<void> {
    const db = await this.open();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction("handles", "readwrite");
        tx.objectStore("handles").put(handle, "root");
        tx.oncomplete = () => resolve();
        tx.onerror = tx.onabort = () => reject(new Error("目录句柄保存未确认"));
      });
      if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.set({ [STICKER_ROOT_REVISION_KEY]: crypto.randomUUID() });
    } finally { db.close(); }
  }
  async load(root: FileSystemDirectoryHandle, source: StickerDirectoryNode, signal: AbortSignal): Promise<LibraryIndex> {
    signal.throwIfAborted();
    const db = await this.open();
    try {
      signal.throwIfAborted();
      const layout = await readFolderLayout(db, root);
      signal.throwIfAborted();
      let index = await loadLibraryIndex(db, root, projectFolderTree(source, layout), this.owner);
      signal.throwIfAborted();
      index = await reconcileLibraryIndex(db, index, source, this.owner, signal);
      signal.throwIfAborted();
      return index;
    } finally { db.close(); }
  }
  async find(root: FileSystemDirectoryHandle): Promise<LibraryIndex | null> {
    const db = await this.open();
    try { return await findLibraryIndex(db, root); }
    finally { db.close(); }
  }
  async save(next: LibraryIndex): Promise<LibraryIndex> {
    const db = await this.open();
    try { return await saveLibraryIndex(db, next, this.owner); }
    finally { db.close(); }
  }
  /** Only after the caller has confirmed successful physical removal. No delete retry. */
  async forgetDeletedImage(root: FileSystemDirectoryHandle, expectedIndexId: string, imageId: string): Promise<void> {
    const db = await this.open();
    try {
      const latest = await findLibraryIndex(db, root);
      if (!latest || latest.id !== expectedIndexId) throw new Error("图库索引已变化");
      const next = cloneLibraryIndex(latest);
      next.images = next.images.filter(image => image.id !== imageId);
      await saveLibraryIndex(db, next, this.owner);
    } finally { db.close(); }
  }
}
