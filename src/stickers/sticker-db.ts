/**
 * Native IndexedDB Storage Engine for Stickers (tab-project)
 * 零本地文件夹依赖、零开屏常驻消耗、图片冷存储在浏览器沙箱 IndexedDB
 */

declare const chrome: any;
function changed(owner: string) {
  try { void chrome.storage.local.set({ stickerLibraryIndexRevision: `${owner}:${crypto.randomUUID()}` }).catch(() => {}); } catch {}
}

export interface StickerRecord {
  id: string;
  name: string;
  group: string;
  mimeType: string;
  blob: Blob;
  size: number;
  createdAt: number;
}

export interface StickerMetadata {
  id: string;
  name: string;
  group: string;
  mimeType: string;
  size: number;
  sizeText: string;
  createdAt: number;
  url?: string;
}

export interface StickerGroupRecord {
  name: string;
  order: number;
  createdAt: number;
}

const DB_NAME = "tab_project_stickers_v2";
const DB_VERSION = 1;

let dbInstance: IDBDatabase | null = null;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function getStickerDb(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("stickers")) {
        const stickerStore = db.createObjectStore("stickers", { keyPath: "id" });
        stickerStore.createIndex("group", "group", { unique: false });
        stickerStore.createIndex("createdAt", "createdAt", { unique: false });
      }
      if (!db.objectStoreNames.contains("groups")) {
        const groupStore = db.createObjectStore("groups", { keyPath: "name" });
        groupStore.createIndex("order", "order", { unique: false });
      }
    };
    request.onsuccess = () => {
      dbInstance = request.result;
      dbInstance.onversionchange = () => {
        dbInstance?.close();
        dbInstance = null;
      };
      resolve(dbInstance);
    };
    request.onerror = () => reject(request.error);
  });
}

/** 获取所有分组，至少保证包含“默认”分组 */
export async function getStickerGroups(): Promise<string[]> {
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("groups", "readonly");
    const store = tx.objectStore("groups");
    const req = store.getAll();
    req.onsuccess = () => {
      const list = (req.result as StickerGroupRecord[] || [])
        .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, "zh-CN"))
        .map((g) => g.name);
      if (!list.includes("默认")) {
        list.unshift("默认");
      }
      resolve(list);
    };
    req.onerror = () => reject(req.error);
  });
}

/** 创建新分组 */
export async function createStickerGroup(name: string, owner = "external"): Promise<void> {
  const trimmed = name.trim();
  if (!trimmed) return;
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("groups", "readwrite");
    const store = tx.objectStore("groups");
    store.add({
      name: trimmed,
      order: Date.now(),
      createdAt: Date.now()
    });
    tx.oncomplete = () => { changed(owner); resolve(); };
    tx.onerror = tx.onabort = () => reject(tx.error || new Error("分类创建未完成"));
  });
}

/** 删除分组，并将该分组下的表情转移到“默认”分组 */
export async function deleteStickerGroup(groupName: string, owner = "external"): Promise<void> {
  if (groupName === "默认") return;
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["groups", "stickers"], "readwrite");
    const groupStore = tx.objectStore("groups");
    const stickerStore = tx.objectStore("stickers");
    let failure: Error | undefined;
    const existing = groupStore.get(groupName);
    existing.onsuccess = () => {
      if (!existing.result) {
        failure = new Error("分类已被其他页面修改，请重新打开模块核对。"); tx.abort(); return;
      }
      groupStore.delete(groupName);
      const request = stickerStore.index("group").openCursor(IDBKeyRange.only(groupName));
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        cursor.update({ ...cursor.value, group: "默认" }); cursor.continue();
      };
    };
    tx.oncomplete = () => { changed(owner); resolve(); };
    tx.onerror = tx.onabort = () => reject(failure || tx.error || new Error("分类删除未完成"));
  });
}

/** Rename a sandbox category and its records atomically; never merge names implicitly. */
export async function renameStickerGroup(oldName: string, newName: string, owner = "external"): Promise<void> {
  if (oldName === "默认" || !newName.trim() || newName === "默认") throw new Error("默认分类不能重命名或覆盖");
  if (oldName === newName) return;
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["groups", "stickers"], "readwrite");
    const groups = tx.objectStore("groups"), stickers = tx.objectStore("stickers");
    const existing = groups.getAll(), destination = stickers.index("group").count(newName);
    let failure: Error | undefined;
    let ready = 0;
    const proceed = () => {
      if (++ready !== 2) return;
      const records = existing.result as StickerGroupRecord[];
      const original = records.find(group => group.name === oldName);
      if (!original || records.some(group => group.name === newName) || destination.result) {
        failure = new Error("分类已不存在或新名称已被使用，请重新打开模块核对。"); tx.abort(); return;
      }
      groups.delete(oldName);
      groups.add({ ...original, name: newName });
      const cursor = stickers.index("group").openCursor(IDBKeyRange.only(oldName));
      cursor.onsuccess = () => {
        const current = cursor.result;
        if (!current) return;
        current.update({ ...current.value, group: newName }); current.continue();
      };
    };
    existing.onsuccess = destination.onsuccess = proceed;
    tx.oncomplete = () => { changed(owner); resolve(); };
    tx.onerror = tx.onabort = () => reject(failure || tx.error || new Error("分类重命名未完成"));
  });
}

/** Persist a complete same-level order, rejecting stale membership. */
export async function reorderStickerGroups(paths: string[], owner = "external"): Promise<void> {
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("groups", "readwrite"), store = tx.objectStore("groups");
    let failure: Error | undefined;
    const request = store.getAll();
    request.onsuccess = () => {
      const records = request.result as StickerGroupRecord[];
      const names = new Set(["默认", ...records.map(group => group.name)]);
      if (paths.length !== names.size || new Set(paths).size !== names.size || paths.some(path => !names.has(path))) {
        failure = new Error("分类列表已变化，请重新打开模块后再排序。"); tx.abort(); return;
      }
      paths.forEach((name, order) => store.put({ ...(records.find(group => group.name === name) || { createdAt: Date.now() }), name, order }));
    };
    tx.oncomplete = () => { changed(owner); resolve(); };
    tx.onerror = tx.onabort = () => reject(failure || tx.error || new Error("排序保存未完成"));
  });
}

/** 添加表情包（支持 File / Blob） */
export async function saveSticker(file: File | Blob, name: string, group = "默认", owner = "external"): Promise<StickerMetadata> {
  const db = await getStickerDb();
  const id = `stk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const mimeType = file.type || "image/png";
  const size = file.size;
  const record: StickerRecord = {
    id,
    name: name || `表情_${Date.now().toString().slice(-4)}`,
    group: group || "默认",
    mimeType,
    blob: file,
    size,
    createdAt: Date.now()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction("stickers", "readwrite");
    const store = tx.objectStore("stickers");
    store.put(record);
    tx.oncomplete = () => {
      changed(owner);
      resolve({
        id: record.id,
        name: record.name,
        group: record.group,
        mimeType: record.mimeType,
        size: record.size,
        sizeText: formatBytes(record.size),
        createdAt: record.createdAt
      });
    };
    tx.onerror = () => reject(tx.error);
  });
}

/** 获取指定分组的表情包列表（默认不携带 Blob URL，由展示层按需生成） */
export async function listStickersByGroup(group?: string): Promise<StickerRecord[]> {
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("stickers", "readonly");
    const store = tx.objectStore("stickers");
    let req: IDBRequest<StickerRecord[]>;
    if (group && group !== "全部") {
      const idx = store.index("group");
      req = idx.getAll(group);
    } else {
      req = store.getAll();
    }
    req.onsuccess = () => {
      const list = req.result || [];
      // 按创建时间倒序排
      list.sort((a, b) => b.createdAt - a.createdAt);
      resolve(list);
    };
    req.onerror = () => reject(req.error);
  });
}

/** Fetch only one original for explicit preview/copy, never from a thumbnail URL. */
export async function getStickerRecord(id: string): Promise<StickerRecord | undefined> {
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("stickers", "readonly"), request = tx.objectStore("stickers").get(id);
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = tx.onabort = () => reject(tx.error || new Error("图片读取失败"));
  });
}

/** Read visible sandbox rows only. The existing createdAt index needs no schema upgrade. */
export async function readStickerPage(group: string | undefined, offset: number, limit: number): Promise<StickerRecord[]> {
  if (limit <= 0) return [];
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("stickers", "readonly");
    const request = tx.objectStore("stickers").index("createdAt").openCursor(null, "prev");
    const rows: StickerRecord[] = [];
    let skip = Math.max(0, offset);
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor || rows.length >= limit) return;
      const row = cursor.value as StickerRecord;
      if (!group || row.group === group) {
        if (skip) skip--; else rows.push(row);
      }
      if (rows.length < limit) cursor.continue();
    };
    tx.oncomplete = () => resolve(rows);
    tx.onerror = tx.onabort = () => reject(tx.error || new Error("图片分页读取失败"));
  });
}

/** 删除单个表情包 */
export async function deleteStickerRecord(id: string, owner = "external"): Promise<void> {
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("stickers", "readwrite");
    const store = tx.objectStore("stickers");
    store.delete(id);
    tx.oncomplete = () => { changed(owner); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}

/** 获取表情包总数量与各分组数量统计 */
export async function getStickersCountSummary(): Promise<{ total: number; groupCounts: Record<string, number> }> {
  const db = await getStickerDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("stickers", "readonly");
    const store = tx.objectStore("stickers");
    const counts: Record<string, number> = Object.create(null);
    const totalRequest = store.count(), groups = store.index("group");
    const request = groups.openKeyCursor(null, "nextunique");
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      const name = String(cursor.key), count = groups.count(cursor.key);
      count.onsuccess = () => { counts[name] = count.result; };
      cursor.continue();
    };
    tx.oncomplete = () => resolve({ total: totalRequest.result, groupCounts: counts });
    tx.onerror = tx.onabort = () => reject(tx.error || new Error("图片统计读取失败"));
  });
}
