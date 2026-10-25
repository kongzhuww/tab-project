import { NOTIFICATION_HISTORY_KEY, HISTORY_LIMIT, safeArchive, safeSnapshot, type HistorySnapshot, type ArchivedNotification } from './history-contract';
declare const chrome: any;

let queue: Promise<unknown> = Promise.resolve();

/**
 * 直接操作 chrome.storage.local 的通知历史原子读写器。
 * 无论是主屏界面还是 Background Service Worker，均可通过此函数操作，自带安全格式化与并发队列保护。
 */
export function notificationHistoryOperation(action: 'list' | 'append' | 'read-all' | 'read' | 'remove' | 'clear', payload?: unknown): Promise<HistorySnapshot> {
  const operation = queue.then(async () => {
    if (typeof chrome === 'undefined' || !chrome.storage?.local) {
      throw new Error('Chrome storage API unavailable');
    }
    const stored = await chrome.storage.local.get(NOTIFICATION_HISTORY_KEY);
    const snapshot = safeSnapshot(stored[NOTIFICATION_HISTORY_KEY]);

    if (action === 'list') {
      return snapshot;
    }

    if (action === 'append') {
      const item = safeArchive(payload);
      item.createdAt = Date.now();
      item.read = false;
      if (!snapshot.items.some(entry => entry.id === item.id)) {
        snapshot.items.unshift(item);
      }
      snapshot.items = snapshot.items.slice(0, HISTORY_LIMIT);
    } else if (action === 'read-all') {
      snapshot.items = snapshot.items.map(item => ({ ...item, read: true }));
    } else if (action === 'clear') {
      snapshot.items = [];
    } else if (action === 'read' || action === 'remove') {
      if (typeof payload !== 'string' || payload.length > 200) {
        throw new Error('Invalid notification id');
      }
      if (action === 'remove') {
        snapshot.items = snapshot.items.filter(item => item.id !== payload);
      } else {
        snapshot.items = snapshot.items.map(item => item.id === payload ? { ...item, read: true } : item);
      }
    } else {
      throw new Error('Invalid history operation');
    }

    snapshot.version++;
    await chrome.storage.local.set({ [NOTIFICATION_HISTORY_KEY]: snapshot });
    return snapshot;
  });

  queue = operation.catch(() => {});
  return operation;
}
