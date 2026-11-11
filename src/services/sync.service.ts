import {
  MAX_SAFE_SYNC_PAYLOAD_BYTES, SYNC_FORMAT_VERSION, SyncBackupError, parseSyncBackup,
  selectSyncSettings, type SyncPayloadResult
} from "./sync-payload";

import { sendNativeRequest } from "../core/native-messaging";
import { nativeRecord, type NativeReply, type NativeRequest } from "../core/native-protocol";
import { getLocalDeviceInfo, type DeviceInfo } from "./device-identity";
import { computeConfigDiff, type ChangeSummary } from "./sync-diff";
import { mergeSyncSettings } from "./sync-merger";

export { MAX_SAFE_SYNC_PAYLOAD_BYTES } from "./sync-payload";
export type { SyncPayloadResult } from "./sync-payload";

declare const chrome: any;

export const BASE_KEYS = [
  "displaySize", "city", "showWeather", "showSites", "showBili", "showYouTube",
  "showTodo", "showLeftNavigation", "showNavBall", "showBookmarkPanel",
  "showBookmarkFoldersTop", "showStartupAnimation", "startupAnimationStyle",
  "singleNewTab", "showHomeMusicVisualizer"
];
export const SHORTCUT_KEY = "customShortcuts";
export const SEARCH_IGNORED_BOOKMARK_FOLDERS_KEY = "searchIgnoredBookmarkFolders";
export const CUSTOM_AVATAR_KEY = "customNewtabAvatar";
export const LEGACY_AVATAR_KEY = "customAvatar";
// Ordinary backups only. Exclude whole connection/account objects, not just obvious token keys.
// New module settings are NOT backed up unless explicitly classified and reviewed here.
export const SYNC_WHITELIST_KEYS: readonly string[] = [
  ...BASE_KEYS, SHORTCUT_KEY, SEARCH_IGNORED_BOOKMARK_FOLDERS_KEY,
  "wereadSortIds", "foGroups",
  "foTree", "foCollapsedGroupsV1", "biliFollowingGroupsV1", "biliSubCustomChannelsV1", "biliRadioSeriesV1",
  "ghRepoRemarksV1", "ghLocalStarGroupsV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2",
  "ghUser", "ghToken", "todoistToken", "todoistActiveProjectIdV1", "lw_private_chat_v1", "googleCalendarSessionTokenV1", "lw_webdav_config",
  "launcherGroups", "launcherFolders", "quickLinks", "quickLinkGroupSizes",
  "launcherPages", "launcherPageLabels", "launcherActivePage", "launcherFolderPositionV1",
  "heroBackground", "heroBackgroundHistory",
  CUSTOM_AVATAR_KEY, LEGACY_AVATAR_KEY
];

export interface SyncOperationResult {
  ok: boolean;
  count?: number;
  byteLength?: number;
  restoredCount?: number;
  clientDevice?: string;
  error?: string;
  errorKind?: "policy" | "operation";
  found?: boolean;
}

export function extractSyncPayload(allData: Record<string, unknown>): SyncPayloadResult {
  return selectSyncSettings(allData, SYNC_WHITELIST_KEYS);
}

const launcherMirrorKeys = new Set([
  "quickLinks", "quickLinkGroupSizes", "launcherFolders", "launcherPages",
  "launcherPageLabels", "launcherActivePage", "quickLinksReady"
]);

/** Read only backup keys, not unrelated caches or other local credentials. */
export async function readSyncSettings(): Promise<Record<string, unknown>> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    const data = await new Promise<Record<string, unknown>>((resolve, reject) => {
      chrome.storage.local.get(null, (res: Record<string, unknown>) => {
        const error = chrome.runtime.lastError;
        if (error) {
          reject(new Error(error.message || "读取本地配置失败"));
          return;
        }
        const filtered: Record<string, unknown> = {};
        const all = res || {};
        for (const k of SYNC_WHITELIST_KEYS) {
          if (all[k] !== undefined) filtered[k] = all[k];
        }
        // 自动汇聚所有按账号划分的 ghLocalStarGroupsV1: 前缀配置
        const starGroupKeys = Object.keys(all).filter(k => k.startsWith("ghLocalStarGroupsV1:"));
        if (starGroupKeys.length) {
          const map: Record<string, unknown> = {};
          for (const gk of starGroupKeys) map[gk] = all[gk];
          filtered["ghLocalStarGroupsV1"] = map;
        }
        resolve(filtered);
      });
    });
    // Include localStorage items (e.g. private chat config) if not present in chrome.storage.local
    if (typeof localStorage !== "undefined") {
      const extraKeys = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2"];
      for (const k of extraKeys) {
        if (data[k] === undefined) {
          const val = localStorage.getItem(k) ?? (k === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (val !== null) {
            try { data[k] = JSON.parse(val); } catch { data[k] = val; }
          }
        }
      }
      // 聚合备份所有以 ghLocalStarGroupsV1: 为前缀的账号分组，确保多账号与切换账号时完整持久化与云同步
      const localStarGroupKeys = Object.keys(localStorage).filter(k => k.startsWith("ghLocalStarGroupsV1:"));
      if (localStarGroupKeys.length && !data["ghLocalStarGroupsV1"]) {
        const groupsMap: Record<string, unknown> = {};
        for (const gk of localStarGroupKeys) {
          const raw = localStorage.getItem(gk);
          if (raw) {
            try { groupsMap[gk] = JSON.parse(raw); } catch { groupsMap[gk] = raw; }
          }
        }
        if (Object.keys(groupsMap).length) {
          data["ghLocalStarGroupsV1"] = groupsMap;
        }
      }
      for (const key of launcherMirrorKeys) {
        if (!SYNC_WHITELIST_KEYS.includes(key)) continue;
        const current = data[key];
        const isEmpty = current === undefined || (Array.isArray(current) && current.length === 0);
        if (isEmpty) {
          const raw = localStorage.getItem(`logicweaver:${key}`) ?? localStorage.getItem(key);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              if (parsed !== undefined && (!Array.isArray(parsed) || parsed.length > 0)) {
                data[key] = parsed;
              }
            } catch {}
          }
        }
      }
    }
    return data;
  }
  if (typeof localStorage === "undefined") throw new Error("本地存储不可用");
  const result: Record<string, unknown> = {};
  for (const key of SYNC_WHITELIST_KEYS) {
    const raw = (launcherMirrorKeys.has(key) ? localStorage.getItem(`logicweaver:${key}`) : null)
      ?? localStorage.getItem(key);
    if (raw === null) continue;
    try { result[key] = JSON.parse(raw); } catch { result[key] = raw; }
  }
  return result;
}

/** All validation happens before the first write. Storage errors must propagate. */
export async function restoreSyncBackup(data: unknown) {
  const parsed = parseSyncBackup(data, SYNC_WHITELIST_KEYS);
  const settings = { ...parsed.sanitized };
  if (Object.hasOwn(settings, "quickLinks")) settings.quickLinksReady = true;
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    await new Promise<void>((resolve, reject) => {
      chrome.storage.local.set(settings, () => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message || "写入本地配置失败"));
        else resolve();
      });
    });
    // 恢复 ghLocalStarGroupsV1 复合分组映射或按 key 还原到存储
    if (settings["ghLocalStarGroupsV1"] && typeof settings["ghLocalStarGroupsV1"] === "object") {
      const gMap = settings["ghLocalStarGroupsV1"] as Record<string, unknown>;
      const toSet: Record<string, unknown> = {};
      for (const [gk, gVal] of Object.entries(gMap)) {
        if (gk.startsWith("ghLocalStarGroupsV1:")) {
          toSet[gk] = gVal;
          if (typeof localStorage !== "undefined") {
            try { localStorage.setItem(gk, JSON.stringify(gVal)); } catch {}
          }
        }
      }
      // 容错兼容：如果远端存储的是单一账号的 LocalStarGroups 结构（包含 owner 字段），自动还原对应账号的前缀 key
      if (typeof (gMap as any).owner === "string" && (gMap as any).owner) {
        const ownerKey = `ghLocalStarGroupsV1:${(gMap as any).owner}`;
        toSet[ownerKey] = gMap;
        if (typeof localStorage !== "undefined") {
          try { localStorage.setItem(ownerKey, JSON.stringify(gMap)); } catch {}
        }
      }
      if (Object.keys(toSet).length) {
        await new Promise<void>((res) => {
          chrome.storage.local.set(toSet, () => res());
        });
      }
    }
    if (typeof localStorage !== "undefined") {
      for (const [key, value] of Object.entries(settings)) {
        try {
          const json = JSON.stringify(value);
          if (launcherMirrorKeys.has(key)) {
            localStorage.setItem(`logicweaver:${key}`, json);
          }
          localStorage.setItem(key, json);
        } catch {}
      }
    }
  } else {
    if (typeof localStorage === "undefined") throw new Error("本地存储不可用");
    const writes = Object.entries(settings).flatMap(([key, value]) => {
      const json = JSON.stringify(value);
      return launcherMirrorKeys.has(key)
        ? [[key, json], [`logicweaver:${key}`, json]] : [[key, json]];
    });
    const previous = new Map(writes.map(([key]) => [key, localStorage.getItem(key)]));
    try {
      for (const [key, value] of writes) localStorage.setItem(key, value);
    } catch {
      let rolledBack = true;
      for (const [key, value] of previous) {
        try {
          if (value === null) localStorage.removeItem(key);
          else localStorage.setItem(key, value);
        } catch { rolledBack = false; }
      }
      throw new Error(rolledBack
        ? "恢复失败，已回滚本次写入；请检查本地存储空间"
        : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  if (typeof localStorage !== "undefined" && Object.hasOwn(settings, "biliRadioSeriesV1")) {
    try {
      const json = JSON.stringify(settings.biliRadioSeriesV1);
      localStorage.setItem("biliRadioSeriesV1", json);
      localStorage.setItem("lw_backup_bili_radio_series", json);
    } catch {}
  }
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("logicweaver:sync-restored", { detail: settings }));
    } catch {}
  }
  return { restoredCount: parsed.count, clientDevice: parsed.clientDevice };
}

export interface SyncBackupEnvelope {
  formatVersion: number;
  clientDevice: string;
  deviceId?: string;
  deviceName?: string;
  exportedAt: string;
  backupKind: string;
  credentialsIncluded: boolean;
  changeSummary?: ChangeSummary[];
  settings: Record<string, unknown>;
}

export const LAST_SYNCED_SNAPSHOT_KEY = "lw_last_synced_snapshot_v1";

export async function createSyncBackup(settings: Record<string, unknown>, device?: DeviceInfo): Promise<SyncBackupEnvelope> {
  const dev = device || await getLocalDeviceInfo();
  let prevSnapshot: Record<string, any> | null = null;
  if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(LAST_SYNCED_SNAPSHOT_KEY);
    if (raw) {
      try { prevSnapshot = JSON.parse(raw); } catch {}
    }
  }

  const sanitized = extractSyncPayload(settings).sanitized;
  const changes = computeConfigDiff(prevSnapshot, sanitized);

  // 记录本次本地同步基准
  if (typeof localStorage !== "undefined") {
    try { localStorage.setItem(LAST_SYNCED_SNAPSHOT_KEY, JSON.stringify(sanitized)); } catch {}
  }

  return {
    formatVersion: SYNC_FORMAT_VERSION,
    clientDevice: dev.os === "macOS" ? "macOS" : dev.os === "Windows" ? "Windows" : "PC",
    deviceId: dev.deviceId,
    deviceName: dev.deviceName,
    exportedAt: new Date().toISOString(),
    backupKind: "preferences",
    credentialsIncluded: false,
    changeSummary: changes,
    settings: sanitized
  };
}

export class SyncService {
  private static instance: SyncService;
  private constructor() {}
  private configOperationRunning = false;

  public static getInstance(): SyncService {
    if (!SyncService.instance) SyncService.instance = new SyncService();
    return SyncService.instance;
  }

  /** 历史兼容存根：Native Host 已在 v1.0.2 彻底移除，调用立即以错误拒绝 */
  public async callNativeHost(message: NativeRequest): Promise<NativeReply> {
    if (message.command !== "logicweaver-sync-get" && message.command !== "logicweaver-sync-put") {
      return { ok: false, error: "同步服务不允许此原生命令；未发送请求" };
    }
    return sendNativeRequest(message);
  }

  /** Compatibility entry point; now intentionally reads only whitelisted settings. */
  public async getAllLocalStorage(): Promise<Record<string, unknown>> {
    return readSyncSettings();
  }

  public async pushConfig(): Promise<SyncOperationResult> {
    if (this.configOperationRunning) return { ok: false, errorKind: "operation", error: "备份或恢复正在进行；未重复提交" };
    this.configOperationRunning = true;
    try {
      const { sanitized, count } = extractSyncPayload(await readSyncSettings());
      if (!count) return { ok: false, errorKind: "policy", error: "未检测到有效的普通备份配置项" };
      const payload = await createSyncBackup(sanitized);
      const message = { command: "logicweaver-sync-put", key: "ui.settings", value: payload };
      // Include envelope overhead, not just the settings object. Never slice user data.
      const byteLength = new TextEncoder().encode(JSON.stringify(message)).length;
      if (byteLength > MAX_SAFE_SYNC_PAYLOAD_BYTES) {
        return { ok: false, errorKind: "policy", byteLength, error: `完整备份为 ${(byteLength / 1024).toFixed(1)} KB，超过原生云同步的 58 KB 安全预算。未上传、未截断数据；请改用 WebDAV 完整备份。` };
      }
      const res = await this.callNativeHost(message);
      if (res.ok === true && res.cloudSynced === false) {
        return { ok: false, errorKind: "operation", error: "宿主仅保存本地快照，云端备份未确认；未自动重试" };
      }
      if (res.ok === true) return { ok: true, count, byteLength };
      return { ok: false, errorKind: "operation", error: "备份结果未确认，请核对云端状态；未自动重试" };
    } catch (err: any) {
      return { ok: false, errorKind: err instanceof SyncBackupError ? "policy" : "operation", error: err instanceof SyncBackupError ? err.message : "备份过程中发生异常，结果未确认；未自动重试" };
    } finally { this.configOperationRunning = false; }
  }

  public async pullConfig(): Promise<SyncOperationResult> {
    if (this.configOperationRunning) return { ok: false, errorKind: "operation", error: "备份或恢复正在进行；未重复提交" };
    this.configOperationRunning = true;
    try {
      const res = await this.callNativeHost({ command: "logicweaver-sync-get", key: "ui.settings" });
      if (res?.ok && res.found === false) {
        return { ok: false, found: false, error: "云端暂无备份配置，请先在另一台电脑上备份" };
      }
      const data = nativeRecord(res.data);
      if (res.ok === true && data && Object.hasOwn(data, "value")) {
        return { ok: true, ...await restoreSyncBackup(data.value) };
      }
      return { ok: false, errorKind: "operation", error: "云端未返回有效配置" };
    } catch (err: any) {
      return { ok: false, errorKind: err instanceof SyncBackupError ? "policy" : "operation", error: err instanceof SyncBackupError ? err.message : "恢复过程中发生异常，请检查实际写入结果；未自动重试" };
    } finally { this.configOperationRunning = false; }
  }
}

export const syncService = SyncService.getInstance();
