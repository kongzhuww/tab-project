/**
 * OptionsService — 现代化设置与多端同步纯数据服务 (Pure TypeScript, Zero DOM)
 * 职责：
 * 1. 核心首选项读写与跨窗口广播 (Storage Engine)；
 * 2. 自定义工具全局快捷键管理；
 * 3. 搜索排除书签文件夹管理与收集；
 * 5. Limbus 沉浸歌词样式参数模型与预设；
 * 6. Native Messaging 通信与 Git 版本热更新；
 * 7. 多端私有云配置安全同步与白名单校验。
 */

import { sameSettingValue, cloneSettingValue, SettingsSaveUnconfirmedError } from "../settings/draft-values";
import { mergeShortcutDraft, mergeIgnoredFolderDraft } from "../settings/entry-preferences";
import { mergePreferenceFields } from "../settings/field-preferences";
import { sendNativeRequest } from "../core/native-messaging";
import { type NativeRequest } from "../core/native-protocol";
import { parseGitCheckReply, type GitCheckReply } from "../settings/git-native-reply";
import { extractSyncPayload, type SyncPayloadResult } from "./sync.service";
export { SYNC_WHITELIST_KEYS } from "./sync.service";

declare const chrome: any;

export interface GlobalSettingsConfig {
  displaySize: string;
  city: string;
  showWeather: boolean;
  showSites: boolean;
  showBili: boolean;
  showYouTube: boolean;
  showTodo: boolean;
  showLeftNavigation: boolean;
  showNavBall: boolean;
  showBookmarkPanel: boolean;
  showBookmarkFoldersTop: boolean;
  showStartupAnimation: boolean;
  startupAnimationStyle: string;
  searchEngine?: string;
  singleNewTab: boolean;
  showHomeMusicVisualizer: boolean;
  showLimbusLyricEffect: boolean;
  dockPosition?: "bottom" | "left" | "right" | "top";
  deepseekApiKey?: string;
  deepseekBaseUrl?: string;
  deepseekModel?: string;
  customAvatarUrl?: string;
}

export interface ShortcutTool {
  id: string;
  label: string;
  defaultKey: string;
}

export interface IgnoredBookmarkFolder {
  id: string;
  title: string;
  path: string;
}

export interface LimbusConfig {
  preset: string;
  coverAdaptive: boolean;
  textColor: string;
  strokeColor: string;
  strokeWidth: string;
  outlineEnabled: boolean;
  glowColor: string;
  glowEnabled: boolean;
  shadowColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  perspectiveStrength: string;
  charSpeedMode: string;
  fadeDuration: string;
}

// Explicit allowlist: global UI must never read or overwrite module credentials.
export const GLOBAL_SETTINGS_KEYS: (keyof GlobalSettingsConfig)[] = [
  "displaySize", "city", "showWeather", "showSites", "showBili", "showYouTube", "showTodo",
  "showLeftNavigation", "showNavBall", "showBookmarkPanel", "showBookmarkFoldersTop",
  "showStartupAnimation", "startupAnimationStyle", "searchEngine", "singleNewTab",
  "showHomeMusicVisualizer", "showLimbusLyricEffect", "dockPosition",
  "deepseekApiKey", "deepseekBaseUrl", "deepseekModel"
];

export const SETTINGS_TOGGLE_KEYS: (keyof GlobalSettingsConfig)[] = [
  "showStartupAnimation", "showWeather", "showSites", "showBili", "showYouTube",
  "showTodo", "showLeftNavigation", "showNavBall", "showBookmarkPanel",
  "showBookmarkFoldersTop", "singleNewTab", "showHomeMusicVisualizer", "showLimbusLyricEffect"
];

export const SHORTCUT_STORAGE_KEY = "customShortcuts";
export const LIMBUS_STORAGE_KEY = "limbusLyricConfig";
export const CUSTOM_AVATAR_STORAGE_KEY = "customNewtabAvatar";
export const SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY = "searchIgnoredBookmarkFolders";

export const DEFAULT_LIMBUS_CONFIG: LimbusConfig = {
  preset: "cover",
  coverAdaptive: true,
  textColor: "#fffeef",
  strokeColor: "#d8a523",
  strokeWidth: "2.2",
  outlineEnabled: true,
  glowColor: "#d8a523",
  glowEnabled: true,
  shadowColor: "#000000",
  fontFamily: "'Cinzel', 'Source Han Serif SC', 'Noto Serif SC', 'Songti SC', 'SimSun', serif",
  fontSize: "36",
  fontWeight: "900",
  perspectiveStrength: "1.0",
  charSpeedMode: "adaptive",
  fadeDuration: "2.8"
};

export const LIMBUS_PRESETS: Record<string, Partial<LimbusConfig>> = {
  default: {
    textColor: "#fffeef", strokeColor: "#d8a523", glowColor: "#d8a523", shadowColor: "#000000",
    strokeWidth: "2.2", outlineEnabled: true, glowEnabled: true
  },
  heartbreak: {
    textColor: "#b223cb", strokeColor: "#991eaf", glowColor: "#b223cb", shadowColor: "#000000",
    strokeWidth: "2.2", outlineEnabled: true, glowEnabled: true
  },
  command: {
    textColor: "#00ffff", strokeColor: "#00aaff", glowColor: "#00aaff", shadowColor: "#000000",
    strokeWidth: "2.2", outlineEnabled: true, glowEnabled: true
  }
};

export const AVAILABLE_SHORTCUT_TOOLS: ShortcutTool[] = [
  { id: "nav-wheel", label: "🎯 轮盘快捷导航 (Fortnite风格)", defaultKey: "Alt+E" },
  { id: "toolbox", label: "🧰 常用工具轮盘", defaultKey: "Alt+Q" },
  { id: "todoist", label: "✅ Todoist 任务看板", defaultKey: "Alt+D" },
  { id: "bookmarks", label: "🔖 浏览器书签侧栏", defaultKey: "Alt+K" },
  { id: "wallpaper", label: "🖼 壁纸库", defaultKey: "" },
  { id: "stickers", label: "😺 本地表情包", defaultKey: "" },
  { id: "pricing", label: "💠 模型价格与排行", defaultKey: "" },
  { id: "settings", label: "⚙️ 新标签页设置", defaultKey: "Alt+," },
  { id: "search", label: "🔍 聚焦主搜索框", defaultKey: "/" },
  { id: "todoist-new-task", label: "➕ Todoist 快速新建任务", defaultKey: "Alt+A" }
];

export class OptionsService {
  private static instance: OptionsService;

  private constructor() {}

  public static getInstance(): OptionsService {
    if (!OptionsService.instance) {
      OptionsService.instance = new OptionsService();
    }
    return OptionsService.instance;
  }

  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  public async loadGlobalSettings(): Promise<Record<string, any>> {
    if (typeof chrome === "undefined" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    return chrome.storage.local.get([
      ...GLOBAL_SETTINGS_KEYS, SHORTCUT_STORAGE_KEY, CUSTOM_AVATAR_STORAGE_KEY,
      SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY, LIMBUS_STORAGE_KEY
    ]);
  }

  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  public async saveSettings(data: Record<string, any>, expected: Record<string, unknown>,
    draftExpected?: Record<string, unknown>, limbusFields: readonly string[] = []): Promise<Record<string, any>> {
    if (typeof chrome === "undefined" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const allowed = new Set<string>([
      ...GLOBAL_SETTINGS_KEYS, SHORTCUT_STORAGE_KEY, CUSTOM_AVATAR_STORAGE_KEY,
      SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY, LIMBUS_STORAGE_KEY
    ]);
    const keys = Object.keys(data);
    if (keys.some(key => !allowed.has(key) || !Object.prototype.hasOwnProperty.call(expected, key))) {
      throw new Error("保存范围或草稿基线无效，未提交设置");
    }
    if (!keys.length) return {};
    if (keys.includes(LIMBUS_STORAGE_KEY) && (!draftExpected ||
        !Object.prototype.hasOwnProperty.call(draftExpected, LIMBUS_STORAGE_KEY))) {
      throw new Error("歌词草稿基线缺失，未提交设置");
    }
    if (typeof navigator === "undefined" || !navigator.locks?.request) {
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    }
    const submitted = cloneSettingValue(data);
    const baseline = cloneSettingValue(expected);
    const draftBaseline = cloneSettingValue(draftExpected || {});
    const explicitLimbusFields = [...limbusFields];
    const controller = new AbortController();
    const deadline = Date.now() + 10000;
    const timer = setTimeout(() => controller.abort(), 10000);
    let writeStarted = false;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: controller.signal }, async () => {
        const latest = await chrome.storage.local.get(keys);
        if (controller.signal.aborted || Date.now() >= deadline) {
          throw new Error("等待设置保存超时，未提交本次修改");
        }
        const accepted: Record<string, unknown> = {};
        for (const key of keys) {
          if (key === SHORTCUT_STORAGE_KEY) {
            accepted[key] = mergeShortcutDraft(baseline[key], submitted[key], latest[key]);
          } else if (key === SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY) {
            accepted[key] = mergeIgnoredFolderDraft(baseline[key], submitted[key], latest[key]);
          } else if (key === LIMBUS_STORAGE_KEY) {
            accepted[key] = mergePreferenceFields(baseline[key], draftBaseline[key], submitted[key],
              latest[key], { ...DEFAULT_LIMBUS_CONFIG }, explicitLimbusFields);
          } else {
            if (!sameSettingValue(latest[key], baseline[key]) && !sameSettingValue(latest[key], submitted[key])) {
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            }
            accepted[key] = submitted[key];
          }
        }
        const patch: Record<string, unknown> = {};
        for (const key of keys) {
          if (!sameSettingValue(latest[key], accepted[key])) patch[key] = accepted[key];
        }
        if (Object.keys(patch).length) {
          // Once issued, do not timeout/release the lock while storage might still commit.
          clearTimeout(timer);
          writeStarted = true;
          await chrome.storage.local.set(patch);
          const confirmed = await chrome.storage.local.get(keys);
          if (keys.some(key => !sameSettingValue(confirmed[key], accepted[key]))) {
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
          }
        }
        // Update only edited fast-start fields, still under the same cooperating-writer lock.
        try {
          if (Object.prototype.hasOwnProperty.call(submitted, "showStartupAnimation")) {
            localStorage.setItem("showStartupAnimation", submitted.showStartupAnimation ? "1" : "0");
            localStorage.setItem("logicweaverEndfieldLoader", submitted.showStartupAnimation ? "1" : "0");
          }
          if (Object.prototype.hasOwnProperty.call(submitted, "startupAnimationStyle")) {
            localStorage.setItem("startupAnimationStyle", submitted.startupAnimationStyle || "endfield");
          }
          if (Object.prototype.hasOwnProperty.call(submitted, "searchEngine")) {
            localStorage.setItem("searchEngine", submitted.searchEngine || "bing");
            window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: submitted.searchEngine }));
          }
        } catch {
          throw new SettingsSaveUnconfirmedError("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try { window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*"); } catch {}
        return cloneSettingValue(accepted);
      });
    } catch (error) {
      if (error instanceof SettingsSaveUnconfirmedError) throw error;
      if (writeStarted) throw new SettingsSaveUnconfirmedError();
      if (controller.signal.aborted) throw new Error("等待设置保存超时，未提交本次修改");
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * 收集书签树中的全部文件夹路径
   */
  public collectBookmarkFolders(node: any, path = "", out: IgnoredBookmarkFolder[] = []): IgnoredBookmarkFolder[] {
    if (!node) return out;
    const isRoot = !node.parentId || node.id === "0";
    let title = node.title || "";
    if (!title) {
      if (node.id === "1") title = "书签栏";
      else if (node.id === "2") title = "其他书签";
      else if (node.id === "mobile" || node.id === "3") title = "移动设备书签";
    }
    const nextPath = isRoot ? path : (path ? `${path} / ${title}` : title);
    if (!node.url && !isRoot) {
      out.push({
        id: String(node.id),
        title: title || "未命名文件夹",
        path: nextPath || title || "书签文件夹"
      });
    }
    for (const child of node.children || []) {
      if (!child.url) this.collectBookmarkFolders(child, nextPath, out);
    }
    return out;
  }

  /**
   * 调用 Native Messaging 桥接服务
   */
  public async callNativeHost(payload: NativeRequest): Promise<GitCheckReply> {
    if (payload.command !== "git-check-update" && payload.command !== "git-apply-update") {
      return { ok: false, error: "设置服务不允许此原生命令；未发送请求" };
    }
    const reply = await sendNativeRequest(payload);
    return payload.command === "git-check-update" ? parseGitCheckReply(reply) : reply;
  }

  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  public extractSyncPayload(allData: Record<string, unknown>): SyncPayloadResult {
    return extractSyncPayload(allData);
  }

}

export const optionsService = OptionsService.getInstance();
