// Serializable, bounded notification data. No callbacks, credentials or arbitrary URLs.
export const NOTIFICATION_HISTORY_KEY = 'notificationHistoryV1';
export const HISTORY_MESSAGE = 'logicweaver:notification-history';
export const HISTORY_LIMIT = 200;
export const HISTORY_AGE_MS = 30 * 86400000;
export type NotificationLevel = 'info' | 'success' | 'warning' | 'error';
export type NotificationTarget = { type: 'todoist-task'; taskId: string } | { type: 'module'; moduleId: string } | { type: 'bili-messages' } | { type: 'bili-video'; bvid?: string; aid?: string } | { type: 'github-repository'; fullName: string };
export interface ArchivedNotification {
  id: string; appType: string; appName: string; title: string; subtitle: string; message: string;
  level: NotificationLevel; createdAt: number; read: boolean; target?: NotificationTarget;
}
export interface HistorySnapshot { version: number; items: ArchivedNotification[] }
export function safeTarget(raw: any): NotificationTarget | undefined {
  if (raw?.type === 'todoist-task' && typeof raw.taskId === 'string' && /^[A-Za-z0-9_-]{1,100}$/.test(raw.taskId)) return { type: raw.type, taskId: raw.taskId };
  if (raw?.type === 'module' && typeof raw.moduleId === 'string' && /^[a-z][a-z0-9-]{0,60}$/.test(raw.moduleId)) return { type: raw.type, moduleId: raw.moduleId };
  if (raw?.type === 'bili-messages') return { type: raw.type };
  if (raw?.type === 'bili-video') {
    if (typeof raw.bvid === 'string' && /^BV[A-Za-z0-9]{10}$/.test(raw.bvid)) return { type: raw.type, bvid: raw.bvid };
    if (typeof raw.aid === 'string' && /^[1-9][0-9]{0,19}$/.test(raw.aid)) return { type: raw.type, aid: raw.aid };
  }
  if (raw?.type === 'github-repository' && typeof raw.fullName === 'string' && raw.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(raw.fullName) && !raw.fullName.split('/').some((part: string) => part === '.' || part === '..')) return { type: raw.type, fullName: raw.fullName };
  return undefined;
}
export function biliVideoTargetFromUrl(value: unknown): NotificationTarget | undefined {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port || !['bilibili.com', 'www.bilibili.com', 'm.bilibili.com'].includes(url.hostname)) return undefined;
    const match = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(url.pathname);
    if (match) return match[1].startsWith('BV') ? { type: 'bili-video', bvid: match[1] } : { type: 'bili-video', aid: match[1].slice(2) };
  } catch { /* No arbitrary URL or callback is persisted. */ }
  return undefined;
}
export function biliVideoTargetFromText(text: string): NotificationTarget | undefined {
  const targets = new Map<string, NotificationTarget>();
  for (const match of text.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const target = biliVideoTargetFromUrl(match[0].replace(/[)）。，,;；]+$/, ''));
    if (target) targets.set(JSON.stringify(target), target);
  }
  return targets.size === 1 ? targets.values().next().value : undefined;
}
export function historyText(value: unknown, length: number): string {
  if (typeof value !== 'string') return '';
  return value.slice(0, 6000).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, 'Bearer [已隐藏]')
    .replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, '[已隐藏]')
    .replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, '$1[已隐藏]')
    .replace(/https?:\/\/[^\s<>"']+/gi, value => { try { const url = new URL(value); url.username = ''; url.password = ''; url.search = ''; url.hash = ''; return url.href; } catch { return '[链接]'; } })
    .slice(0, length);
}
export function safeArchive(raw: any): ArchivedNotification {
  if (!raw || typeof raw.id !== 'string' || !/^[A-Za-z0-9_:-]{1,200}$/.test(raw.id) || typeof raw.title !== 'string' || !Number.isFinite(raw.createdAt) || !['info', 'success', 'warning', 'error'].includes(raw.level)) throw new Error('Invalid notification record');
  let target = safeTarget(raw.target);
  // Recover old blanket message-center targets only when the record itself contains one exact video URL.
  if (raw.appType === 'bili' && (!target || target.type === 'bili-messages')) {
    target = biliVideoTargetFromText([raw.title, raw.subtitle, raw.message].filter(value => typeof value === 'string').join(' ')) || target;
  }
  return { id: raw.id, appType: historyText(raw.appType, 40), appName: historyText(raw.appName, 60), title: historyText(raw.title, 160), subtitle: historyText(raw.subtitle, 240), message: historyText(raw.message, 2000), level: raw.level, createdAt: raw.createdAt, read: raw.read === true, target };
}
export function safeSnapshot(raw: any): HistorySnapshot {
  if (raw == null) return { version: 0, items: [] };
  if (!raw || !Number.isSafeInteger(raw.version) || raw.version < 0 || !Array.isArray(raw.items) || raw.items.length > HISTORY_LIMIT) throw new Error('Invalid notification history');
  const now = Date.now();
  return { version: raw.version, items: raw.items.map(safeArchive).filter((item: ArchivedNotification) => item.createdAt >= now - HISTORY_AGE_MS && item.createdAt <= now + 60000).sort((a: ArchivedNotification, b: ArchivedNotification) => b.createdAt - a.createdAt) };
}
