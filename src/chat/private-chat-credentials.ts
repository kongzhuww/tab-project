import { privateChatIdentityKey, isPrivateChatToken, type PrivateRoom } from "./private-chat-identity";
import { privateChatOperation } from "./private-chat-operation";

export class PrivateChatCredentialError extends Error {
  readonly name = "PrivateChatCredentialError";
  constructor(public readonly code: "blocked" | "storage" | "timeout" | "invalid" | "missing") {
    super({ blocked: "凭证数据库被旧标签页阻塞，请关闭旧页后重试", storage: "无法读写聊天室凭证，请检查浏览器存储",
      timeout: "凭证存储超时，结果可能尚未确认，请勿重复导入", invalid: "凭证格式无效，请重新导入邀请", missing: "凭证不存在，请重新导入邀请" }[code]);
  }
}
/** Same database/version/store/key as before. No token cache or I/O in the constructor. */
export class PrivateChatCredentialRepository {
  private database?: Promise<IDBDatabase>;
  constructor(private readonly onBlocked: () => void = () => {}) {}
  private open(): Promise<IDBDatabase> {
    if (this.database) return this.database;
    const opening = new Promise<IDBDatabase>((resolve, reject) => {
      let done = false;
      const fail = (error: PrivateChatCredentialError) => {
        if (done) return;
        done = true; clearTimeout(timer); reject(error);
      };
      const timer = setTimeout(() => fail(new PrivateChatCredentialError("timeout")), 8000);
      try {
        const request = indexedDB.open("lw-private-chat-credentials", 1);
        request.onupgradeneeded = () => {
          if (done) { request.transaction?.abort(); return; }
          request.result.createObjectStore("credentials");
        };
        request.onsuccess = () => {
          const db = request.result;
          if (done) { db.close(); return; }
          done = true; clearTimeout(timer);
          db.onversionchange = () => { db.close(); if (this.database === opening) this.database = undefined; };
          resolve(db);
        };
        request.onerror = () => fail(new PrivateChatCredentialError("storage"));
        request.onblocked = () => {
          if (done) return;
          fail(new PrivateChatCredentialError("blocked"));
          try { this.onBlocked(); } catch { /* UI diagnostics cannot change storage ownership. */ }
        };
      } catch { fail(new PrivateChatCredentialError("storage")); }
    });
    this.database = opening;
    void opening.catch(() => { if (this.database === opening) this.database = undefined; });
    return opening;
  }
  read(destination: PrivateRoom, signal?: AbortSignal): Promise<string> { return this.access(destination, undefined, signal); }
  async write(destination: PrivateRoom, value: string): Promise<void> {
    if (!isPrivateChatToken(value)) throw new PrivateChatCredentialError("invalid");
    await this.access(destination, value);
  }
  private access(destination: PrivateRoom, value?: string, parent?: AbortSignal): Promise<string> {
    const key = privateChatIdentityKey(destination);
    return privateChatOperation(8000, async signal => {
      try {
        const db = await this.open();
        // An expired caller must not create a late transaction after open finally succeeds.
        signal.throwIfAborted();
        return await new Promise<string>((resolve, reject) => {
          const tx = db.transaction("credentials", value === undefined ? "readonly" : "readwrite");
          const store = tx.objectStore("credentials");
          const request = value === undefined ? store.get(key) : store.put(value, key);
          const abortRead = () => { try { tx.abort(); } catch { /* Already settled. */ } };
          const cleanup = () => signal.removeEventListener("abort", abortRead);
          if (value === undefined) signal.addEventListener("abort", abortRead, { once: true });
          tx.oncomplete = () => {
            cleanup();
            const result: unknown = value === undefined ? request.result : value;
            if (result === undefined || result === "") reject(new PrivateChatCredentialError("missing"));
            else if (!isPrivateChatToken(result)) reject(new PrivateChatCredentialError("invalid"));
            else resolve(result);
          };
          tx.onabort = tx.onerror = request.onerror = () => { cleanup(); reject(new PrivateChatCredentialError("storage")); };
          // No abort-on-view-change: a transaction already accepted may still commit to this key.
        });
      } catch (error) {
        if (signal.aborted) throw signal.reason;
        if (error instanceof PrivateChatCredentialError) throw error;
        throw new PrivateChatCredentialError("storage");
      }
    }, parent);
  }
}
