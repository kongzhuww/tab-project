import { ref } from "vue";
import type { ChatMessage } from "./chat-state";
import { normalizeMessage } from "./chat-security";

export const historyError = ref("");
export const historyBrowsing = ref(false);
export const pendingHistoryCount = ref(0);
type Row = { scope: string; id: string; timestamp: number; message: ChatMessage };
let database: Promise<IDBDatabase> | undefined;
let queue: Promise<void> = Promise.resolve();
const pending = new Map<string, Row>();

export function historyScope(uid: string, endpoint: string, roomId: string): string {
  return JSON.stringify([uid, endpoint, roomId]);
}
function openDatabase(): Promise<IDBDatabase> {
  if (!database) database = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("lw-chat-history", 2);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains("messages")) {
        const store = request.result.createObjectStore("messages", { keyPath: ["scope", "id"] });
        store.createIndex("timeline", ["scope", "timestamp", "id"], { unique: true });
      }
      if (!request.result.objectStoreNames.contains("relay-cursors")) request.result.createObjectStore("relay-cursors");
    };
    request.onerror = () => reject(request.error);
    request.onblocked = () => { historyError.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试"; };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => { db.close(); database = undefined; };
      resolve(db);
    };
  }).catch(error => { database = undefined; throw error; });
  return database;
}

// Each scope/message is a separate record; concurrent tabs cannot overwrite a whole room.
export function archiveMessages(scope: string, messages: ChatMessage[]): Promise<void> {
  for (const value of messages) {
    const message = normalizeMessage(value);
    if (!message || message.id === "sys-welcome") continue;
    // Vue proxies cannot be passed to IndexedDB structured clone.
    const row: Row = { scope, id: message.id, timestamp: message.timestamp, message: JSON.parse(JSON.stringify(message)) };
    pending.set(JSON.stringify([scope, row.id]), row);
  }
  pendingHistoryCount.value = pending.size;
  return retryHistoryWrites();
}
export function retryHistoryWrites(): Promise<void> {
  queue = queue.then(async () => {
    if (!pending.size) return;
    const batch = [...pending.entries()];
    try {
      const db = await openDatabase();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction("messages", "readwrite");
        tx.oncomplete = () => resolve();
        tx.onabort = () => reject(tx.error);
        tx.onerror = () => reject(tx.error);
        const store = tx.objectStore("messages");
        for (const [, row] of batch) store.put(row);
      });
      for (const [key, row] of batch) if (pending.get(key) === row) pending.delete(key);
      pendingHistoryCount.value = pending.size;
      historyError.value = "";
    } catch {
      historyError.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  });
  return queue;
}

export async function readRelayCursor(scope: string): Promise<number> {
  await queue;
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("relay-cursors", "readonly");
    const r = tx.objectStore("relay-cursors").get(scope);
    tx.oncomplete = () => resolve(Number.isSafeInteger(r.result) ? r.result : 0);
    tx.onabort = () => reject(tx.error); r.onerror = () => reject(r.error);
  });
}
export function commitRelayPage(scope: string, messages: ChatMessage[], cursor: number): Promise<void> {
  const result = queue.then(async () => {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(["messages", "relay-cursors"], "readwrite");
      const store = tx.objectStore("messages");
      for (const message of messages) store.put({ scope, id: message.id, timestamp: message.timestamp, message: JSON.parse(JSON.stringify(message)) });
      const cursors = tx.objectStore("relay-cursors");
      const r = cursors.get(scope);
      r.onsuccess = () => cursors.put(Math.max(Number(r.result) || 0, cursor), scope);
      tx.oncomplete = () => resolve(); tx.onabort = () => reject(tx.error); tx.onerror = () => reject(tx.error);
    });
  });
  queue = result.catch(() => {});
  return result;
}

export async function readArchivedMessage(scope: string, id: string): Promise<ChatMessage | undefined> {
  await queue;
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("messages", "readonly");
    const r = tx.objectStore("messages").get([scope, id]);
    tx.oncomplete = () => resolve(normalizeMessage(r.result?.message));
    tx.onabort = () => reject(tx.error);
    r.onerror = () => reject(r.error);
  });
}

export async function readHistoryPage(scope: string, before?: { timestamp: number; id: string }, limit = 200): Promise<ChatMessage[]> {
  await queue;
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("messages", "readonly");
    const lower = [scope, -Number.MAX_VALUE, ""];
    const upper = before ? [scope, before.timestamp, before.id] : [scope, Number.MAX_VALUE, "\uffff"];
    const range = IDBKeyRange.bound(lower, upper, false, !!before);
    const req = tx.objectStore("messages").index("timeline").openCursor(range, "prev");
    const result: ChatMessage[] = [];
    req.onerror = () => reject(req.error);
    tx.onabort = () => reject(tx.error);
    req.onsuccess = () => {
      const cursor = req.result;
      if (!cursor || result.length >= limit) { resolve(result.reverse()); return; }
      const message = normalizeMessage((cursor.value as Row).message);
      if (message) result.push(message);
      cursor.continue();
    };
  });
}

export async function exportHistory(scope: string): Promise<ChatMessage[]> {
  const records = new Map<string, ChatMessage>();
  let before: { timestamp: number; id: string } | undefined;
  for (;;) {
    const page = await readHistoryPage(scope, before, 500);
    for (const message of page) records.set(message.id, message);
    if (page.length < 500) break;
    before = page[0];
  }
  for (const row of pending.values()) if (row.scope === scope) records.set(row.id, row.message);
  return [...records.values()].sort((a, b) => a.timestamp - b.timestamp || a.id.localeCompare(b.id));
}
export function pendingHistorySnapshot(scope: string): ChatMessage[] {
  return [...pending.values()].filter(row => row.scope === scope).map(row => row.message);
}
