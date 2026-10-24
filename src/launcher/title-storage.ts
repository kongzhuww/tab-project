import { sameSettingValue } from "../settings/draft-values";

export class LauncherTitleUnconfirmedError extends Error {
  constructor() {
    super("保存结果未确认，未自动重试。请复制草稿后刷新页面核对，再决定是否修改。");
  }
}
let unconfirmed = false;

async function read(keys: string[]): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (data: Record<string, any>) => {
      if (chrome.runtime.lastError) reject(new Error("无法读取网站数据，本次未提交；请稍后再试。"));
      else resolve(data);
    });
  });
}

/** Cooperating title writers only; legacy move/delete/sync writers do not take this lock. */
export async function saveLauncherTitle(
  keys: string[],
  merge: (latest: Record<string, any>) => Record<string, any>
): Promise<Record<string, any>> {
  if (unconfirmed) throw new LauncherTitleUnconfirmedError();
  if (typeof chrome === "undefined" || !chrome.storage?.local) {
    throw new Error("浏览器存储不可用，未保存；请在扩展页面操作。");
  }
  if (typeof navigator === "undefined" || !navigator.locks?.request) {
    throw new Error("当前环境不支持标题保存保护，未提交修改。");
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  let issued = false;
  try {
    return await navigator.locks.request("logicweaver:launcher-titles", { signal: controller.signal }, async () => {
      if (unconfirmed) throw new LauncherTitleUnconfirmedError();
      const latest = await read(keys);
      if (controller.signal.aborted) throw new Error("等待保存超时，本次未提交。");
      const desired = merge(latest);
      const patch = Object.fromEntries(keys.filter(key => !sameSettingValue(latest[key], desired[key]))
        .map(key => [key, desired[key]]));
      if (Object.keys(patch).length) {
        clearTimeout(timer); // Never release a lock by timing out an already issued write.
        issued = true;
        await new Promise<void>((resolve, reject) => {
          chrome.storage.local.set(patch, () => {
            if (chrome.runtime.lastError) reject(new LauncherTitleUnconfirmedError());
            else resolve();
          });
        });
        const actual = await read(keys);
        if (keys.some(key => !sameSettingValue(actual[key], desired[key]))) {
          throw new LauncherTitleUnconfirmedError();
        }
      }
      // Optional startup mirror is not the source of truth; never use it as a fallback write.
      try {
        for (const key of keys) if (desired[key] !== undefined) {
          localStorage.setItem(`logicweaver:${key}`, JSON.stringify(desired[key]));
        }
      } catch { /* Chrome storage has already been confirmed. */ }
      return desired;
    });
  } catch (error) {
    if (issued || error instanceof LauncherTitleUnconfirmedError) {
      unconfirmed = true;
      throw new LauncherTitleUnconfirmedError();
    }
    if (controller.signal.aborted) throw new Error("等待保存超时，本次未提交。");
    throw error;
  } finally { clearTimeout(timer); }
}

export function titleLinks(value: unknown): Record<string, any>[] {
  if (!Array.isArray(value) || value.some(item => !item || typeof item !== "object" || Array.isArray(item))) {
    throw new Error("网站数据格式异常，未覆盖已有数据。");
  }
  return value;
}
export function titleMap(value: unknown): Record<string, any> {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("文件夹数据格式异常，未覆盖已有数据。");
  }
  return value as Record<string, any>;
}
export function cleanFolderTitle(value: string): string {
  const clean = value.trim().replace(/\s+/g, " ");
  if (!clean) throw new Error("文件夹名称不能为空。");
  if (clean.length > 20) throw new Error("文件夹名称最多20个字符，请缩短后再保存。");
  if (["__proto__", "constructor", "prototype"].includes(clean)) throw new Error("这个名称不可用，请换一个名称。");
  return clean;
}
