/**
 * Unified promise-safe adapter around `chrome.storage.local` with optional
 * non-extension `localStorage` fallback.
 */
declare const chrome: any;

export function hasExtensionLocalStorage(): boolean {
  return typeof chrome !== "undefined" && Boolean(chrome.storage?.local);
}

export async function readExtensionStorage(keys: string | string[] | null): Promise<Record<string, unknown>> {
  if (!hasExtensionLocalStorage()) return {};
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    const onDone = (items: Record<string, unknown>) => {
      const error = chrome.runtime?.lastError;
      if (error) {
        reject(new Error(error.message || "读取扩展存储失败"));
        return;
      }
      resolve(items && typeof items === "object" ? items : {});
    };
    try {
      const maybePromise = chrome.storage.local.get(keys, onDone);
      if (maybePromise && typeof maybePromise.then === "function") {
        void maybePromise.then((items: Record<string, unknown>) => resolve(items || {}), reject);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export async function writeExtensionStorage(values: Record<string, unknown>): Promise<void> {
  if (!hasExtensionLocalStorage()) return;
  return new Promise<void>((resolve, reject) => {
    const onDone = () => {
      const error = chrome.runtime?.lastError;
      if (error) {
        reject(new Error(error.message || "写入扩展存储失败"));
        return;
      }
      resolve();
    };
    try {
      const maybePromise = chrome.storage.local.set(values, onDone);
      if (maybePromise && typeof maybePromise.then === "function") {
        void maybePromise.then(() => resolve(), reject);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export async function removeExtensionStorage(keys: string | string[]): Promise<void> {
  if (!hasExtensionLocalStorage()) return;
  return new Promise<void>((resolve, reject) => {
    const onDone = () => {
      const error = chrome.runtime?.lastError;
      if (error) {
        reject(new Error(error.message || "删除扩展存储失败"));
        return;
      }
      resolve();
    };
    try {
      const maybePromise = chrome.storage.local.remove(keys, onDone);
      if (maybePromise && typeof maybePromise.then === "function") {
        void maybePromise.then(() => resolve(), reject);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function readLocalMirrorJson<T = unknown>(key: string): T | undefined {
  if (typeof localStorage === "undefined") return undefined;
  const raw = localStorage.getItem(key);
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as unknown as T;
  }
}

export function writeLocalMirrorJson(key: string, value: unknown): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Quota errors on secondary mirrors must not fail authoritative writes. */
  }
}
