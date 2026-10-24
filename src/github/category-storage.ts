import { reactive } from "vue";
declare const chrome: any;
export const categoryFeedback = reactive({ busy: false, message: "", error: false });
export const CATEGORY_KEYS = ["ghCats", "ghMap", "ghUsed"];
export const USED_FOLDER = "正在使用";
export type CategoryData = { ghCats: string[]; ghMap: Record<string, string | string[]>; ghUsed: string[] };
let busy = false, uncertain = false;
export const categoryStorageBusy = () => busy;
export function categoryFingerprint(data: CategoryData): string {
  return JSON.stringify(data, (_key, value) => value && typeof value === "object" && !Array.isArray(value)
    ? Object.fromEntries(Object.keys(value).sort().map(key => [key, value[key]])) : value);
}
export function decodeCategories(stored: any): CategoryData {
  const ghCats = stored.ghCats === undefined ? [] : stored.ghCats, ghMap = stored.ghMap === undefined ? {} : stored.ghMap, ghUsed = stored.ghUsed === undefined ? [] : stored.ghUsed;
  const strings = (v: unknown): v is string[] => Array.isArray(v) && v.every(x => typeof x === "string");
  if (!strings(ghCats) || !strings(ghUsed) || !ghMap || typeof ghMap !== "object" || Array.isArray(ghMap)
    || Object.values(ghMap).some(v => typeof v !== "string" && !strings(v))) throw new Error("分类存储格式异常，拒绝以空数据覆盖。");
  return structuredClone({ ghCats, ghMap, ghUsed });
}
export function projectCategories(data: CategoryData) {
  const cats = [...new Set(data.ghCats.map(x => x.trim()).filter(Boolean))];
  const used = new Set(data.ghUsed.filter(Boolean));
  if (used.size && !cats.includes(USED_FOLDER)) cats.unshift(USED_FOLDER);
  const map: Record<string, string> = Object.create(null);
  for (const [repo, raw] of Object.entries(data.ghMap)) {
    const folder = (Array.isArray(raw) ? raw : [raw]).find(x => cats.includes(x));
    if (folder) map[repo] = folder;
  }
  for (const repo of used) if (!map[repo]) map[repo] = USED_FOLDER;
  return { cats, map, used };
}
async function exclusive<T>(work: () => Promise<T>): Promise<T> {
  if (busy) throw new Error("分类正在读取或保存，请等待完成。");
  if (typeof chrome === "undefined" || !chrome.storage?.local || typeof navigator === "undefined" || !navigator.locks) throw new Error("缺少分类存储或互斥保护，未写入。");
  busy = true;
  try {
    return await navigator.locks.request("logicweaver:github-categories:v1", { mode: "exclusive", ifAvailable: true }, async lock => {
      if (!lock) throw new Error("另一个页面正在处理分类，请稍后再操作。");
      return work();
    });
  } finally { busy = false; }
}
export async function readCategories(reconcile = false): Promise<CategoryData> {
  return exclusive(async () => {
    const data = decodeCategories(await chrome.storage.local.get(CATEGORY_KEYS));
    if (reconcile) uncertain = false;
    return data;
  });
}
export async function changeCategories(change: (data: CategoryData) => void, expected?: string): Promise<CategoryData> {
  return exclusive(async () => {
    if (uncertain) throw new Error("上次分类写入未确认，请先点击读取分类 / 核对，不要直接重试。");
    const data = decodeCategories(await chrome.storage.local.get(CATEGORY_KEYS));
    if (expected !== undefined && categoryFingerprint(data) !== expected) throw new Error("确认期间分类数据已变化，没有删除；请读取分类后重新确认。");
    change(data);
    try {
      uncertain = true;
      await chrome.storage.local.set(data);
      const actual = decodeCategories(await chrome.storage.local.get(CATEGORY_KEYS));
      if (categoryFingerprint(actual) !== categoryFingerprint(data)) throw new Error("Readback mismatch");
      uncertain = false;
      return actual;
    } catch {
      throw new Error("分类写入或回读未确认，可能已保存；请先读取分类 / 核对，不会自动重试。");
    }
  });
}
