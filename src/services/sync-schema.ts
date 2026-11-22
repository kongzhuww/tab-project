/**
 * Single authoritative schema & canonical serialization helpers shared by
 * backup snapshots, WebDAV encryption baseline checks, and diff reporting.
 */

export const SYNC_CONNECTION_GROUPS: readonly (readonly string[])[] = [
  ["ghUser", "ghToken"],
  ["todoistToken", "todoistActiveProjectIdV1"],
  ["googleCalendarSessionTokenV1"],
  ["lw_webdav_config"]
];

export const SENSITIVE_SYNC_KEYS = new Set<string>([
  "ghToken",
  "todoistToken",
  "googleCalendarSessionTokenV1",
  "lw_webdav_config"
]);

export const SYNC_DIFF_SETTING_LABELS: Record<string, string> = {
  enableQuickSearch: "极速搜索",
  theme: "界面主题",
  showWeather: "天气挂件",
  showSites: "常用网站和书签",
  showHomeNews: "AI HOT 资讯",
  showHomePlayer: "音乐播放器",
  showBili: "B站卡片",
  showTodo: "待办卡片",
  showBookmarkPanel: "书签栏",
  singleNewTab: "极速搜索（旧设置）",
  city: "天气城市"
};

export function canonicalJson(value: unknown, depth = 0): string {
  if (depth > 64) return JSON.stringify(value) ?? "null";
  if (value === null || typeof value !== "object") return JSON.stringify(value) ?? "null";
  if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item, depth + 1)).join(",")}]`;
  const obj = value as Record<string, unknown>;
  return `{${Object.keys(obj)
    .sort()
    .filter((key) => obj[key] !== undefined)
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(obj[key], depth + 1)}`)
    .join(",")}}`;
}
