import { safeSnapshot, type ArchivedNotification } from '../notifications/history-contract';
export function unreadAiCount(items:readonly ArchivedNotification[]):number {
  return items.filter(item => item.appType === 'ai-workspace' && !item.read).length;
}
export function newAiNotifications(oldValue:unknown,newValue:unknown,now=Date.now()):ArchivedNotification[] {
  const previous=new Set(safeSnapshot(oldValue).items.map(item=>item.id));
  return safeSnapshot(newValue).items.filter(item=>item.appType==='ai-workspace' && !item.read && !previous.has(item.id) && now-item.createdAt<=60000);
}
