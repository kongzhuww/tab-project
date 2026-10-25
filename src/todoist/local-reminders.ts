import { notificationHistoryOperation } from "../notifications/history-repository";
declare const chrome: any;
const PREFIX = 'todoist_reminder_v2:';
export const REMINDER_ALARM = 'todoist_remind_';
export interface LocalReminder { time: string; title: string }
export async function readReminder(taskId: string): Promise<LocalReminder | undefined> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return undefined;
  const key = PREFIX + taskId;
  const stored = await chrome.storage.local.get([key, 'todoist_reminders_map_v1']);
  if (Object.prototype.hasOwnProperty.call(stored, key)) return stored[key] || undefined;
  return stored.todoist_reminders_map_v1?.[taskId];
}
export async function saveReminder(taskId: string, time: string, title: string): Promise<void> {
  if (!chrome?.alarms || !chrome?.notifications) throw new Error('当前环境不支持浏览器提醒。');
  const timestamp = new Date(time).getTime();
  if (time && (!Number.isFinite(timestamp) || timestamp <= Date.now())) throw new Error('请选择未来的提醒时间。');
  if (time && await chrome.notifications.getPermissionLevel() !== 'granted') throw new Error('请先在浏览器和系统设置中允许通知。');
  const key = PREFIX + taskId, name = REMINDER_ALARM + taskId;
  // One task per key: unrelated task writes cannot overwrite each other.
  await chrome.alarms.clear(name);
  await chrome.storage.local.set({ [key]: time ? { time, title } : null });
  if (time) await chrome.alarms.create(name, { when: timestamp });
}
export async function deliverReminder(taskId: string): Promise<void> {
  const reminder = await readReminder(taskId);
  if (!reminder) return;
  const when = new Date(reminder.time).getTime();
  if (!Number.isFinite(when)) return;
  if (when > Date.now() + 1000) { await chrome.alarms.create(REMINDER_ALARM + taskId, { when }); return; }
  try {
    await notificationHistoryOperation('append', {
      id: 'reminder_' + taskId + '_' + when, appType: 'todoist', appName: 'Todoist',
      title: '任务提醒', subtitle: '', message: reminder.title || '任务时间已到',
      level: 'info', createdAt: Date.now(), read: false, target: { type: 'todoist-task', taskId }
    });
  } catch { console.warn('[Todoist Alarm] Notification history was not confirmed.'); }
  await chrome.notifications.create(REMINDER_ALARM + taskId, { type: 'basic', iconUrl: chrome.runtime.getURL('assets/icon-128.png'), title: '待办提醒', message: reminder.title || '任务时间已到', priority: 2 });
  await chrome.storage.local.set({ [PREFIX + taskId]: null });
}
export async function restoreReminderAlarms(): Promise<void> {
  const stored = await chrome.storage.local.get(null);
  const tasks = new Map<string, LocalReminder | null>();
  for (const [id, value] of Object.entries(stored.todoist_reminders_map_v1 || {})) tasks.set(id, value as LocalReminder);
  for (const [key, value] of Object.entries(stored)) if (key.startsWith(PREFIX)) tasks.set(key.slice(PREFIX.length), value as LocalReminder | null);
  for (const [id, value] of tasks) {
    if (!value) continue;
    const time = new Date(value.time).getTime();
    if (Number.isFinite(time)) await chrome.alarms.create(REMINDER_ALARM + id, { when: Math.max(Date.now() + 1000, time) });
  }
}
