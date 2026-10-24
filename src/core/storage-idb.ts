/**
 * LogicWeaver 统一轻量 IndexedDB 键值存储工具 (storage-idb.ts)
 * 零第三方依赖，异步非阻塞，自动平滑兼容与迁移 localStorage
 */

const DB_NAME = "logicweaver_kv_store";
const DB_VERSION = 1;
const STORE_NAME = "keyval";

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      return reject(new Error("当前运行环境不支持 IndexedDB"));
    }

    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error("打开 IndexedDB 失败"));
  });

  return dbPromise;
}

/**
 * 异步获取持久化数据
 * 具备自动平滑迁移机制：若 IndexedDB 中无数据但 localStorage 中存在，自动迁移并释放 localStorage 空间
 */
export async function idbGet<T = any>(key: string, defaultValue?: T): Promise<T> {
  try {
    const db = await getDb();
    const val = await new Promise<T | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => reject(req.error);
    });

    if (val !== undefined && val !== null) {
      return val;
    }

    // 平滑迁移：回退检查 localStorage
    if (typeof localStorage !== "undefined") {
      const legacy = localStorage.getItem(key);
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          void idbSet(key, parsed);
          // 延迟安全释放 localStorage
          setTimeout(() => {
            try { localStorage.removeItem(key); } catch {}
          }, 2000);
          return parsed;
        } catch {}
      }
    }

    return defaultValue as T;
  } catch (err) {
    console.warn(`[IDB] 读取 key "${key}" 失败，回退默认值:`, err);
    return defaultValue as T;
  }
}

/**
 * 异步保存持久化数据 (非阻塞)
 */
export async function idbSet<T = any>(key: string, value: T): Promise<void> {
  try {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`[IDB] 写入 key "${key}" 失败:`, err);
  }
}

/** Strict read without implicit migration or fallback-on-error. */
export async function idbReadStrict<T>(key: string): Promise<T | undefined> {
  const db = await getDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(key);
    tx.oncomplete = () => resolve(request.result);
    tx.onerror = () => reject(tx.error || new Error("IndexedDB read failed"));
    tx.onabort = () => reject(tx.error || new Error("IndexedDB read aborted"));
  });
}

/**
 * Opt-in atomic read/modify/write. Errors propagate; resolves only on transaction commit.
 * No migration/default-on-error behavior. The synchronous updater must not perform I/O.
 */
export async function idbUpdateStrict<T>(key: string, update: (current: T | undefined) => T): Promise<T> {
  const db = await getDb();
  return new Promise<T>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    let next: T;
    tx.oncomplete = () => resolve(next);
    tx.onerror = () => reject(tx.error || new Error("IndexedDB write failed"));
    tx.onabort = () => reject(tx.error || new Error("IndexedDB transaction aborted"));
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => {
      try { next = update(request.result); store.put(next, key); }
      catch (error) { tx.abort(); reject(error); }
    };
  });
}

/**
 * 异步删除某个键
 */
export async function idbDelete(key: string): Promise<void> {
  try {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`[IDB] 删除 key "${key}" 失败:`, err);
  }
}
