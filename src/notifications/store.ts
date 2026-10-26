import { reactive, readonly } from "vue";
import { archiveToast } from "./history-store";
import { safeTarget, biliVideoTargetFromText, type NotificationLevel, type NotificationTarget } from "./history-contract";

export type NotificationAppType = "chat" | "qq" | "bili" | "phone" | "fetch" | string;

export interface NotificationOptions {
  id?: string;
  appType?: NotificationAppType;
  appName?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  message?: string;
  actionLabel?: string;
  showActions?: boolean;
  duration?: number;
  history?: boolean;
  level?: NotificationLevel;
  target?: NotificationTarget;
  onClick?: (() => void | Promise<void>) | null;
}

export interface NotificationHandle {
  id: string;
  close(): void;
}

export interface NotificationController {
  show(options: NotificationOptions): NotificationHandle | null;
  fetch(appName: string, title: string, subtitle?: string, icon?: string, duration?: number): NotificationHandle | null;
  close(id: string): void;
  clear(): void;
  readonly size: number;
}

export interface NotificationItem {
  id: string;
  fingerprint: string;
  appType: NotificationAppType;
  appName: string;
  icon: string;
  title: string;
  subtitle: string;
  message: string;
  actionLabel: string;
  showActions: boolean;
  duration: number;
  onClick: (() => void | Promise<void>) | null;
  closing: boolean;
  target?: NotificationTarget;
}

const items = reactive<NotificationItem[]>([]);
const recentFingerprints = new Map<string, number>();
function shouldArchive(options: NotificationOptions, text: string): boolean {
  if (options.history !== undefined) return options.history;
  if (options.level === "warning" || options.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(text)) return true;
  if (/复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(text)) return false;
  if (/^(正在|开始读取|加载中|同步中)/.test(text)) return false;
  return options.appType === "chat" || options.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(text);
}

const APP_DEFAULTS: Record<string, { name: string; icon: string; action: string }> = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  qq: { name: "QQ", icon: "assets/qq.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};

function close(id: string): void {
  const item = items.find((entry) => entry.id === id);
  if (!item || item.closing) return;
  item.closing = true;
  window.setTimeout(() => {
    const index = items.findIndex((entry) => entry.id === id);
    if (index >= 0) items.splice(index, 1);
  }, 260);
}

function clear(): void {
  for (const item of items) close(item.id);
}

function show(options: NotificationOptions): NotificationHandle | null {
  if (!options) return null;
  const appType = options.appType || "fetch";
  const defaults = APP_DEFAULTS[appType] || APP_DEFAULTS.fetch;
  const title = String(options.title || "新消息通知");
  const subtitle = String(options.subtitle || "");
  const message = String(options.message || "");
  const target = safeTarget(options.target) || (appType === "bili" ? biliVideoTargetFromText(`${title} ${subtitle} ${message}`) : undefined);
  const duration = Math.max(500, Number(options.duration) || 7000);
  const fingerprint = String(options.id || `${appType}_${title}_${subtitle}_${message}`).trim();
  const now = Date.now();

  for (const [key, time] of recentFingerprints) {
    if (now - time > 30000) recentFingerprints.delete(key);
  }
  const dedupeWindow = options.id ? 200 : (duration <= 4000 ? 1200 : 3000);
  const previous = recentFingerprints.get(fingerprint);
  if (previous && now - previous < dedupeWindow) return null;
  if (items.some((item) => item.fingerprint === fingerprint && !item.closing)) return null;
  recentFingerprints.set(fingerprint, now);

  const id = `toast_${crypto.randomUUID()}`;
  const item: NotificationItem = {
    id,
    fingerprint,
    appType,
    appName: String(options.appName || defaults.name),
    icon: String(options.icon || defaults.icon),
    title,
    subtitle,
    message,
    actionLabel: options.actionLabel === undefined ? defaults.action : String(options.actionLabel || ""),
    showActions: options.showActions !== false,
    duration,
    onClick: typeof options.onClick === "function" ? options.onClick : null,
    closing: false,
    target
  };

  items.push(item);
  const summary = title + " " + subtitle + " " + message;
  if (shouldArchive(options, summary)) {
    const level = options.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(summary) ? "error" : "info");
    const archiveTarget = target || (appType === "chat" ? { type: "module" as const, moduleId: "chat" } : undefined);
    archiveToast({ id, appType, appName: item.appName, title, subtitle, message, level, createdAt: now, read: false, target: archiveTarget });
  }
  const activeItems = items.filter((entry) => !entry.closing);
  if (activeItems.length > 5) close(activeItems[0].id);
  return Object.freeze({ id, close: () => close(id) });
}

function fetchToast(appName: string, title: string, subtitle = "", icon = "assets/logo.png", duration = 3200): NotificationHandle | null {
  return show({ appType: "fetch", appName, title, subtitle, icon, duration, showActions: false, actionLabel: "" });
}

export const notificationItems = readonly(items);
export const notificationController: NotificationController = Object.freeze({
  show,
  fetch: fetchToast,
  close,
  clear,
  get size() { return items.filter((item) => !item.closing).length; }
});
