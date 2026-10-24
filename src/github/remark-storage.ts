declare const chrome: any;

export const GH_REMARKS_KEY = "ghRepoRemarksV1";
export type RemarkMap = Record<string, Record<string, any>>;
let busy = false;
let uncertain = false;
export const isRemarkStorageBusy = () => busy;

function validate(value: unknown): RemarkMap {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.values(value).some(row => !row || typeof row !== "object" || Array.isArray(row))) {
    throw new Error("备注存储格式异常，拒绝以空数据覆盖。请先检查备份。");
  }
  return value as RemarkMap;
}

async function exclusive<T>(work: () => Promise<T>): Promise<T> {
  if (busy) throw new Error("备注正在读取或保存，请等待完成。");
  if (typeof chrome === "undefined" || !chrome.storage?.local || typeof navigator === "undefined" || !navigator.locks) {
    throw new Error("当前环境缺少备注存储或互斥保护，没有写入。");
  }
  busy = true;
  try {
    return await navigator.locks.request("logicweaver:github-remarks:v1", { mode: "exclusive", ifAvailable: true }, async lock => {
      if (!lock) throw new Error("另一个页面正在处理备注，请稍后再操作。");
      return work();
    });
  } finally { busy = false; }
}

export async function readRemarks(): Promise<RemarkMap> {
  return exclusive(async () => {
    const result = validate((await chrome.storage.local.get(GH_REMARKS_KEY))[GH_REMARKS_KEY]);
    uncertain = false;
    return result;
  });
}

function comparable(value: unknown): string {
  return JSON.stringify(value, (_key, item) => item && typeof item === "object" && !Array.isArray(item)
    ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);
}

export async function patchRemark(fullName: string, patch: Record<string, unknown>, expectedUserRemark?: string, beforeWrite?: () => void): Promise<RemarkMap> {
  if (!/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(fullName)) throw new Error("仓库名称无效，没有写入备注。");
  const snapshot = structuredClone(patch);
  return exclusive(async () => {
    if (uncertain) throw new Error("上次写入结果未确认，请先点击读取已保存值核对，不要直接重试。");
    const stored = validate((await chrome.storage.local.get(GH_REMARKS_KEY))[GH_REMARKS_KEY]);
    const previous = stored[fullName] || {};
    if (expectedUserRemark !== undefined && (previous.userRemark ?? "") !== expectedUserRemark) {
      throw new Error("已保存备注发生变化，未覆盖。请读取已保存值，与保留的草稿比较后再决定。");
    }
    const next = { ...stored, [fullName]: { ...previous, ...snapshot, updatedAt: Date.now() } };
    beforeWrite?.();
    try {
      uncertain = true;
      await chrome.storage.local.set({ [GH_REMARKS_KEY]: next });
      const actual = validate((await chrome.storage.local.get(GH_REMARKS_KEY))[GH_REMARKS_KEY]);
      if (comparable(actual) !== comparable(next)) throw new Error("Readback mismatch");
      uncertain = false;
      return actual;
    } catch {
      throw new Error("备注写入或回读未确认，可能已保存。草稿保留；请先读取已保存值核对，不会自动重试。");
    }
  });
}
