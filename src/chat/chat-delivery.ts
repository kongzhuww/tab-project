import { ref } from "vue";
import type { ChatMessage } from "./chat-state";

export type Delivery = { scope: string; id: string; uid: string; message?: ChatMessage; attempts: number; lastAttempt: number; received: boolean; failure?: "rejected" | "unconfirmed" | "paused" };
export const deliveryRevision = ref(0);
export const deliveryError = ref("");
const cache = new Map<string, Map<string, Delivery[]>>();
let database: Promise<IDBDatabase> | undefined;
function open(): Promise<IDBDatabase> {
  return database ||= new Promise<IDBDatabase>((resolve, reject) => {
    const r = indexedDB.open("lw-chat-delivery", 1);
    r.onupgradeneeded = () => {
      const s = r.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] });
      s.createIndex("scope", "scope");
    };
    r.onsuccess = () => { r.result.onversionchange = () => { r.result.close(); database = undefined; }; resolve(r.result); };
    r.onerror = () => reject(r.error);
    r.onblocked = () => { deliveryError.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。"; };
  }).catch(e => { database = undefined; throw e; });
}
async function rows(scope: string): Promise<Delivery[]> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("deliveries", "readonly");
    const r = tx.objectStore("deliveries").index("scope").getAll(scope);
    tx.oncomplete = () => resolve(r.result);
    tx.onabort = () => reject(tx.error);
    r.onerror = () => reject(r.error);
  });
}
// Serialize this window's mutations; read-modify-write stays in one IDB transaction across windows.
let queue = Promise.resolve();
function serialized(work: () => Promise<void>): Promise<void> {
  const result = queue.then(work);
  queue = result.catch(() => {});
  return result;
}
export async function refreshDeliveries(scope: string): Promise<void> {
  try {
    const grouped = new Map<string, Delivery[]>();
    for (const row of await rows(scope)) {
      const entries = grouped.get(row.id) || []; entries.push(row); grouped.set(row.id, entries);
    }
    cache.set(scope, grouped); deliveryRevision.value++;
  }
  catch { deliveryError.value = "无法读取发送确认记录，请检查浏览器存储。"; }
}
export function deliveryState(scope: string, id: string): "none" | "sending" | "failed" | "stored" {
  void deliveryRevision.value;
  const list = cache.get(scope)?.get(id) || [];
  if (!list.length) return "none";
  const pending = list.filter(row => !row.received);
  if (!pending.length) return "stored";
  return pending.some(row => row.failure === "rejected" || row.failure === "paused" ||
    (row.attempts >= 5 && (row.failure === "unconfirmed" || Date.now() - row.lastAttempt > 15000))) ? "failed" : "sending";
}
export function deliveryLabel(scope: string, id: string): string {
  void deliveryRevision.value;
  const list = cache.get(scope)?.get(id) || [];
  if (!list.length) return "无送达确认";
  const received = list.filter(r => r.received).length;
  if (received === list.length) return list.every(r => r.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${received}/${list.length}（非已读）`;
  const pending = list.filter(row => !row.received);
  if (pending.some(row => row.failure === "rejected")) return "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存";
  if (deliveryState(scope, id) === "failed") return "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试";
  return "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
export async function enqueueDelivery(scope: string, message: ChatMessage, uids: string[]): Promise<void> {
  await serialized(async () => {
    const db = await open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("deliveries", "readwrite");
      const store = tx.objectStore("deliveries");
      for (const uid of new Set(uids)) {
        const r = store.get([scope, message.id, uid]);
        r.onsuccess = () => {
          if (r.result?.received) return;
          const row: Delivery = { scope, id: message.id, uid, message: JSON.parse(JSON.stringify(message)), attempts: 0, lastAttempt: 0, received: false };
          store.put(row);
        };
      }
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
    });
    await refreshDeliveries(scope);
  });
}
export async function pauseDelivery(scope: string, id: string): Promise<void> {
  try {
    await serialized(async () => {
      const db = await open();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction("deliveries", "readwrite");
        const r = tx.objectStore("deliveries").index("scope").openCursor(scope);
        r.onsuccess = () => {
          const cursor = r.result;
          if (!cursor) return;
          const row = cursor.value as Delivery;
          if (row.id === id && !row.received) cursor.update({ ...row, attempts: 5, failure: "paused" });
          cursor.continue();
        };
        tx.oncomplete = () => resolve();
        tx.onabort = () => reject(tx.error);
        tx.onerror = () => reject(tx.error);
      });
      await refreshDeliveries(scope);
    });
  } catch { deliveryError.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。"; }
}
export async function acknowledgeDelivery(scope: string, id: string, uid: string): Promise<void> {
  return acknowledgeDeliveries(scope, [id], uid);
}
export async function acknowledgeDeliveries(scope: string, ids: string[], uid: string): Promise<void> {
  if (!ids.length) return;
  await serialized(async () => {
    const db = await open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("deliveries", "readwrite");
      const store = tx.objectStore("deliveries");
      for (const id of new Set(ids)) {
        const r = store.get([scope, id, uid]);
        r.onsuccess = () => { if (r.result) store.put({ ...r.result, received: true, failure: undefined, message: undefined }); };
      }
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
    });
    await refreshDeliveries(scope);
  });
}
export async function markDeliveryFailure(scope: string, id: string, uid: string, rejected = false, lastAttempt?: number, paused = false): Promise<void> {
  await serialized(async () => {
    const db = await open();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("deliveries", "readwrite"), store = tx.objectStore("deliveries");
      const r = store.get([scope, id, uid]);
      r.onsuccess = () => {
        const row = r.result as Delivery | undefined;
        if (row && !row.received && (lastAttempt === undefined || row.lastAttempt === lastAttempt)) store.put({ ...row,
          attempts: rejected || paused ? 5 : row.attempts,
          failure: paused ? "paused" : rejected ? "rejected" : row.failure === "paused" ? "paused" : "unconfirmed" });
      };
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => reject(tx.error);
    });
    await refreshDeliveries(scope);
  });
}
export async function pendingDeliveryScopes(uid: string): Promise<string[]> {
  const db = await open();
  const prefix = `[${JSON.stringify(uid)},`;
  return new Promise((resolve, reject) => {
    const tx = db.transaction("deliveries", "readonly");
    const result = new Set<string>();
    const r = tx.objectStore("deliveries").index("scope").openCursor(IDBKeyRange.bound(prefix, prefix + "\uffff"));
    r.onsuccess = () => {
      const cursor = r.result; if (!cursor) return;
      const row = cursor.value as Delivery;
      if (!row.received && row.attempts < 5 && row.uid === "private-relay-server") result.add(row.scope);
      cursor.continue();
    };
    tx.oncomplete = () => resolve([...result]);
    tx.onabort = () => reject(tx.error); r.onerror = () => reject(r.error);
  });
}
export async function pumpDeliveries(scope: string, online: string[], stillCurrent: () => boolean, send: (uid: string, message: ChatMessage, lastAttempt: number) => boolean, limit = 4, canSend: (message: ChatMessage) => boolean = () => true): Promise<void> {
  await serialized(async () => {
    const db = await open();
    const selected: Delivery[] = [];
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("deliveries", "readwrite");
      const r = tx.objectStore("deliveries").index("scope").openCursor(scope);
      r.onsuccess = () => {
        const cursor = r.result;
        if (!cursor || selected.length >= limit || !stillCurrent()) return;
        const row = cursor.value as Delivery;
        if (!row.received && row.message && row.attempts < 5 && Date.now() - row.lastAttempt >= 10000 && online.includes(row.uid)) {
          if (!canSend(row.message)) {
            cursor.update({ ...row, attempts: 5, failure: "paused" }); cursor.continue(); return;
          }
          const next = { ...row, attempts: row.attempts + 1, lastAttempt: Date.now(), failure: undefined };
          cursor.update(next); selected.push(next);
        }
        cursor.continue();
      };
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
    });
    for (const row of selected) if (stillCurrent()) send(row.uid, row.message!, row.lastAttempt);
    await refreshDeliveries(scope);
  });
}
