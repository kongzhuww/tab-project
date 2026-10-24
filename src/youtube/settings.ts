export interface YouTubeModuleSettings {
  preferAccount: boolean;
  fallbackChannels: string[];
}
export const YOUTUBE_SETTINGS_KEY = "youtubeModuleSettingsV1";
// Preserve the existing recommendation sources for existing users.
export const DEFAULT_YOUTUBE_SETTINGS: YouTubeModuleSettings = {
  preferAccount: true,
  fallbackChannels: []
};
export function normalizeYouTubeSettings(input: unknown = {}): YouTubeModuleSettings {
  const value = input && typeof input === "object" && !Array.isArray(input)
    ? input as Partial<YouTubeModuleSettings> : {};
  return {
    preferAccount: value.preferAccount !== false,
    fallbackChannels: Array.isArray(value.fallbackChannels)
      ? [...new Set(value.fallbackChannels.filter(id => typeof id === "string" && /^UC[\w-]{22}$/.test(id)))]
      : [...DEFAULT_YOUTUBE_SETTINGS.fallbackChannels]
  };
}
export async function loadYouTubeSettings(): Promise<YouTubeModuleSettings> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    const data = await chrome.storage.local.get(YOUTUBE_SETTINGS_KEY);
    return normalizeYouTubeSettings(data[YOUTUBE_SETTINGS_KEY]);
  }
  try { return normalizeYouTubeSettings(JSON.parse(localStorage.getItem(YOUTUBE_SETTINGS_KEY) || "{}")); }
  catch { return normalizeYouTubeSettings(); }
}
export async function saveYouTubeSettings(settings: YouTubeModuleSettings, initial?: YouTubeModuleSettings): Promise<YouTubeModuleSettings> {
  const latest = await loadYouTubeSettings();
  const value = normalizeYouTubeSettings(settings);
  if (initial && settings.preferAccount === initial.preferAccount) value.preferAccount = latest.preferAccount;
  if (initial && JSON.stringify(settings.fallbackChannels) === JSON.stringify(initial.fallbackChannels)) value.fallbackChannels = latest.fallbackChannels;
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    await chrome.storage.local.set({ [YOUTUBE_SETTINGS_KEY]: value });
  } else localStorage.setItem(YOUTUBE_SETTINGS_KEY, JSON.stringify(value));
  return value;
}
