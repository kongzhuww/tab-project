/** Shared backup validation. Never truncate user data to fit a transport limit. */
export const SYNC_FORMAT_VERSION = 2;
export const MAX_SAFE_SYNC_PAYLOAD_BYTES = 58 * 1024;
/** Safe, value-free validation messages that may be shown to the user. */
export class SyncBackupError extends Error {}

const booleanKeys = new Set([
  "showWeather", "showSites", "showBili", "showYouTube", "showTodo",
  "showLeftNavigation", "showNavBall", "showBookmarkPanel", "showBookmarkFoldersTop",
  "showStartupAnimation", "singleNewTab", "showHomeMusicVisualizer",
  "showLimbusLyricEffect"
]);
const arrayKeys = new Set([
  "searchIgnoredBookmarkFolders", "wereadSortIds",
  "foGroups", "launcherGroups", "quickLinks", "launcherPages",
  "foCollapsedGroupsV1", "biliFollowingGroupsV1", "biliSubCustomChannelsV1", "biliRadioSeriesV1",
  "ghCats", "ghUsed"
]);
const objectKeys = new Set([
  "customShortcuts", "limbusLyricConfig", "launcherFolders", "quickLinkGroupSizes",
  "launcherPageLabels", "launcherFolderPositionV1",
  "foTree", "ghMap", "ghRepoRemarksV1",
  "lw_private_chat_v1", "lw_webdav_config", "googleCalendarSessionTokenV1"
]);

export function isRecord(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function isCredentialField(key: string): boolean {
  return /(?:token|password|passwd|secret|cookie|apikey|authorization|credentials?|signature|privatekey|secretkey|sessionid|jwt|bearer)$/.test(key.toLowerCase().replace(/[^a-z0-9]/g, ""));
}
function validateBackupString(value: string): void {
  if (!/^(?:https?|wss?):\/\//i.test(value.trim())) return;
  try { new URL(value.trim()); }
  catch { throw new SyncBackupError("备份包含无效链接，请先修正；没有删除或截断数据"); }
  // Trust the user: URL query params, authentication strings, or hash fragments
  // are user-owned preferences and will not block local or WebDAV backups.
}
function validateJson(value: unknown, depth = 0): void {
  if (depth > 40) throw new SyncBackupError("备份数据嵌套过深或存在循环引用");
  if (typeof value === "string") { validateBackupString(value); return; }
  if (value === null || typeof value === "boolean") return;
  if (typeof value === "number" && Number.isFinite(value)) return;
  if (Array.isArray(value)) {
    value.forEach((item) => validateJson(item, depth + 1));
    return;
  }
  if (isRecord(value)) {
    for (const [key, item] of Object.entries(value)) {
      if (["__proto__", "prototype", "constructor"].includes(key)) {
        throw new SyncBackupError("备份包含不安全的对象字段");
      }
      // Trust the user: do not block nested fields.
      validateJson(item, depth + 1);
    }
    return;
  }
  throw new SyncBackupError("备份包含无法完整保存为 JSON 的数据");
}

function validateSetting(key: string, value: unknown): void {
  const fail = () => { throw new SyncBackupError(`配置项 ${key} 格式无效，操作已取消`); };
  if (["foGroups", "launcherGroups", "ghUsed"].includes(key)) {
    // Historical versions used both keyed maps and arrays for these collections.
    if (!Array.isArray(value) && !isRecord(value)) fail();
  } else if (booleanKeys.has(key)) {
    if (typeof value !== "boolean") fail();
  } else if (arrayKeys.has(key)) {
    if (!Array.isArray(value)) fail();
  } else if (objectKeys.has(key)) {
    if (!isRecord(value)) fail();
  } else if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    fail();
  }
  if (key === "quickLinks" && Array.isArray(value)) {
    for (const link of value) {
      if (!isRecord(link) || typeof link.url !== "string" || !link.url.trim()) fail();
      if (typeof link.title !== "string") {
        (link as Record<string, unknown>).title = link.url;
      }
    }
  }
  if (key === "launcherPages" && Array.isArray(value)
    && !value.every((page) => typeof page === "string")) fail();
  if (["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(key)
    && isRecord(value)
    && !Object.values(value).every((item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean")) {
    fail();
  }
  validateJson(value);
}

export interface SyncPayloadResult {
  sanitized: Record<string, unknown>;
  count: number;
  byteLength: number;
}

export function selectSyncSettings(data: unknown, keys: readonly string[]): SyncPayloadResult {
  if (!isRecord(data)) throw new SyncBackupError("备份配置必须是对象，操作已取消");
  const selected: Record<string, unknown> = {};
  for (const key of keys) {
    if (!Object.hasOwn(data, key) || data[key] === undefined) continue;
    validateJson(data[key]);
    // Validation may fill legacy defaults; never mutate the caller or an in-flight snapshot.
    const value = JSON.parse(JSON.stringify(data[key]));
    validateSetting(key, value);
    selected[key] = value;
  }
  // Detach the snapshot so later UI changes cannot change an in-flight backup.
  const json = JSON.stringify(selected);
  return {
    sanitized: JSON.parse(json) as Record<string, unknown>,
    count: Object.keys(selected).length,
    byteLength: new TextEncoder().encode(json).length
  };
}

export function parseSyncBackup(data: unknown, keys: readonly string[]) {
  if (!isRecord(data)) throw new SyncBackupError("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(data, "formatVersion") && data.formatVersion !== 1 && data.formatVersion !== SYNC_FORMAT_VERSION) {
    throw new SyncBackupError("不支持此备份版本，请先更新插件；未写入本地数据");
  }
  if (data.formatVersion === SYNC_FORMAT_VERSION && (data.backupKind !== "preferences" || data.credentialsIncluded !== false || !isRecord(data.settings))) {
    throw new SyncBackupError("备份范围标记无效，未写入本地数据");
  }
  // Legacy backups use the SAME ordinary-data whitelist; credentials/connections are never restored.
  const result = selectSyncSettings(Object.hasOwn(data, "settings") ? data.settings : data, keys);
  if (!result.count) throw new SyncBackupError("云端备份中未包含有效的设置数据");
  return {
    ...result,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(data.clientDevice)) ? String(data.clientDevice) : "其他设备"
  };
}
