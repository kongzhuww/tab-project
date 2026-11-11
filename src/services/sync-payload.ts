/** Shared backup validation. Never truncate user data to fit a transport limit. */
export const SYNC_FORMAT_VERSION = 2;
export const MAX_SAFE_SYNC_PAYLOAD_BYTES = 58 * 1024;
/** Safe, value-free validation messages that may be shown to the user. */
export class SyncBackupError extends Error {}

const booleanKeys = new Set([
  "showWeather", "showSites", "showBili", "showYouTube", "showTodo",
  "showLeftNavigation", "showNavBall", "showBookmarkPanel", "showBookmarkFoldersTop",
  "showStartupAnimation", "singleNewTab", "showHomeMusicVisualizer"
]);
const arrayKeys = new Set([
  "searchIgnoredBookmarkFolders", "wereadSortIds",
  "foGroups", "launcherGroups", "quickLinks", "launcherPages",
  "foCollapsedGroupsV1", "biliFollowingGroupsV1", "biliSubCustomChannelsV1", "biliRadioSeriesV1",
  "gh_my_repo_groups_v2", "heroBackgroundHistory"
]);
const objectKeys = new Set([
  "customShortcuts", "launcherFolders", "quickLinkGroupSizes",
  "launcherPageLabels", "launcherFolderPositionV1",
  "foTree", "ghRepoRemarksV1", "ghLocalStarGroupsV1",
  "lw_private_chat_v1", "lw_webdav_config", "googleCalendarSessionTokenV1",
  "gh_my_repo_groups_map_v2"
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
  const fail = (detail?: string) => { throw new SyncBackupError(`配置项 ${key} 格式无效${detail ? ` (${detail})` : ""}，操作已取消`); };
  if (key === "heroBackground") {
    if (typeof value !== "string" && !isRecord(value)) fail("非字符串或对象");
  } else if (["foGroups", "launcherGroups"].includes(key)) {
    // Historical versions used both keyed maps and arrays for these collections.
    if (!Array.isArray(value) && !isRecord(value)) fail("非数组或字典");
  } else if (booleanKeys.has(key)) {
    if (typeof value !== "boolean") fail("非布尔值");
  } else if (arrayKeys.has(key)) {
    if (!Array.isArray(value)) fail("非数组");
  } else if (objectKeys.has(key)) {
    if (!isRecord(value)) fail("非对象");
  } else if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    fail("非基本类型");
  }
  if (key === "quickLinks" && Array.isArray(value)) {
    for (const link of value) {
      if (!isRecord(link) || typeof link.url !== "string" || !link.url.trim()) fail("网站链接为空");
      if (typeof link.title !== "string") {
        (link as Record<string, unknown>).title = link.url;
      }
    }
  }
  if (key === "launcherPages" && Array.isArray(value)
    && !value.every((page) => typeof page === "string")) fail("launcherPages元素非字符串");
  if (["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(key)
    && isRecord(value)
    && !Object.values(value).every((item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean")) {
    fail("字典属性值非基本类型");
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
    if (!Object.hasOwn(data, key) || data[key] === undefined || data[key] === null) continue;
    try {
      validateJson(data[key]);
      // Validation may fill legacy defaults; never mutate the caller or an in-flight snapshot.
      const value = JSON.parse(JSON.stringify(data[key]));
      validateSetting(key, value);
      selected[key] = value;
    } catch (err) {
      // 如果本地或远端某单个历史配置项格式不合规（如残留的旧版本缓存或空字符串），跳过该脏字段，绝不因单个脏字段导致整个备份崩溃！
      console.warn(`[SyncPayload] 跳过格式不匹配的配置项 "${key}":`, err);
    }
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
  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch {}
  }
  if (!isRecord(data)) throw new SyncBackupError("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(data, "formatVersion") && data.formatVersion !== 1 && data.formatVersion !== SYNC_FORMAT_VERSION) {
    throw new SyncBackupError("不支持此备份版本，请先更新插件；未写入本地数据");
  }
  if ((data as any).credentialsIncluded === true) {
    throw new SyncBackupError("备份中包含凭据信息，拒绝恢复到普通配置；未写入本地数据");
  }
  // Legacy backups use the SAME ordinary-data whitelist; credentials/connections are never restored.
  const rawSettings = (Object.hasOwn(data, "settings") && isRecord(data.settings)) ? data.settings : data;
  const result = selectSyncSettings(rawSettings, keys);
  if (!result.count) throw new SyncBackupError("云端备份中未包含有效的设置数据");
  return {
    ...result,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(data.clientDevice)) ? String(data.clientDevice) : "其他设备"
  };
}
