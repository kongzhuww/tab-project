// Keys belonged exclusively to the removed YouTube workspace, not browser cookies.
export const REMOVED_YOUTUBE_KEYS = [
  "youtubeFavoritesV1", "youtubeFavGroupsV1", "youtubeModuleSettingsV1",
  "youtubeRssChannelsV1", "youtubeCustomGroupsV1", "youtubeRssVideosCacheV1",
  "youtubePlaylistsV1", "youtubeRecommendBatchV1", "logicweaver_youtube_explore_cache",
  "showYouTube"
] as const;

/** Retry on each worker start so a transient storage failure does not preserve old data forever. */
export async function removeRetiredYouTubeStorage(): Promise<void> {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return;
  await chrome.storage.local.remove([...REMOVED_YOUTUBE_KEYS]);
}

/** Extension localStorage is only accessible from a page, not the service worker. */
export function removeRetiredYouTubePageStorage(): void {
  if (typeof localStorage === "undefined") return;
  for (const key of REMOVED_YOUTUBE_KEYS) {
    localStorage.removeItem(key);
    localStorage.removeItem(`logicweaver:${key}`);
  }
}
