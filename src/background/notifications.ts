/**
 * LogicWeaver 新标签页 - 系统级通知、徽章反馈与 SidePanel 行为 (TypeScript 模块)
 */

import { deliverReminder, restoreReminderAlarms } from "../todoist/local-reminders";
declare const chrome: any;

export function flashBadge(text: string, color: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color });
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 2000);
    resolve();
  });
}

export function initNotificationListeners(): void {
  if (typeof chrome === "undefined") return;
  void restoreReminderAlarms().catch(() => console.warn("[Todoist Alarm] Restore failed."));

  chrome.alarms?.onAlarm?.addListener?.(async (alarm: any) => {
    if (alarm.name === "clear-badge") {
      chrome.action.setBadgeText({ text: "" });
    } else if (alarm.name?.startsWith("todoist_remind_")) {
      try { await deliverReminder(alarm.name.slice("todoist_remind_".length)); }
      catch { console.warn("[Todoist Alarm] Notification not confirmed; reminder retained."); }
    }
  });


}
