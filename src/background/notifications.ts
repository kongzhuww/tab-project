/**
 * LogicWeaver 新标签页 - 系统级通知、徽章反馈与 SidePanel 行为 (TypeScript 模块)
 */

declare const chrome: any;

export function enableStickerSidePanel(): void {
  if (!chrome.sidePanel?.setPanelBehavior) return;
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
}

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

  chrome.alarms?.onAlarm?.addListener?.((alarm: any) => {
    if (alarm.name === "clear-badge") {
      chrome.action.setBadgeText({ text: "" });
    }
  });


}
