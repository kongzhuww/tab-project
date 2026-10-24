import type { YouTubeVideoItem } from "./youtube-store";
export const FAVORITES_KEY = "youtubeFavoritesV1";
export const FAVORITE_GROUPS_KEY = "youtubeFavGroupsV1";
export interface FavoriteSnapshot { favorites: YouTubeVideoItem[]; groups: string[] }

async function readKeys(): Promise<Record<string, unknown>> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([FAVORITES_KEY, FAVORITE_GROUPS_KEY], (data: Record<string, unknown>) => {
        if (chrome.runtime.lastError) reject(new Error("收藏存储读取失败"));
        else resolve(data);
      });
    });
  }
  const result: Record<string, unknown> = {};
  for (const key of [FAVORITES_KEY, FAVORITE_GROUPS_KEY]) {
    const raw = localStorage.getItem(key);
    if (raw !== null) result[key] = JSON.parse(raw);
  }
  return result;
}

export async function readFavoriteSnapshot(): Promise<FavoriteSnapshot> {
  const data = await readKeys();
  const favorites = data[FAVORITES_KEY] === undefined ? [] : data[FAVORITES_KEY];
  const groups = data[FAVORITE_GROUPS_KEY] === undefined ? ["全部", "稍后观看"] : data[FAVORITE_GROUPS_KEY];
  if (!Array.isArray(favorites) || !favorites.every(item => item && typeof item.id === "string" && typeof item.title === "string")) {
    throw new Error("收藏数据格式异常，未覆盖原记录");
  }
  if (!Array.isArray(groups) || !groups.every(group => typeof group === "string")) throw new Error("收藏分组格式异常，未覆盖原记录");
  return { favorites: favorites.map(item => ({ ...item })), groups: [...groups] };
}

function canonical(value: any): any {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().filter(key => value[key] !== undefined).map(key => [key, canonical(value[key])]));
  return value;
}

/** One submission, then readback; this is not a cross-tab atomic transaction. */
export async function writeFavoriteSnapshot(snapshot: FavoriteSnapshot): Promise<void> {
  const payload = { [FAVORITES_KEY]: snapshot.favorites, [FAVORITE_GROUPS_KEY]: snapshot.groups };
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    await new Promise<void>((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) reject(new Error("收藏保存结果未确认"));
        else resolve();
      });
    });
  } else {
    // A failure on the second key can mean partial persistence; never claim rollback.
    for (const [key, value] of Object.entries(payload)) localStorage.setItem(key, JSON.stringify(value));
  }
  const actual = await readFavoriteSnapshot();
  if (JSON.stringify(canonical(actual)) !== JSON.stringify(canonical(snapshot))) throw new Error("收藏保存后的核对不一致，请重读确认");
}
