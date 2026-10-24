import { validatePrivateRoom, isPrivateChatToken, type PrivateRoom } from "./private-chat-identity";
import { PrivateChatCredentialError } from "./private-chat-credentials";
import { HttpError, ChatCapabilityError } from "./private-chat-errors";
import { privateChatOperation } from "./private-chat-operation";
import type { PrivateChatDestination } from "./private-chat-types";

export interface PrivateChatHttpRequest {
  readonly destination: PrivateChatDestination;
  readonly path: string;
  readonly method?: string;
  readonly body?: unknown;
  readonly signal?: AbortSignal;
}
interface HttpPorts {
  credential(destination: PrivateRoom, signal: AbortSignal): Promise<string>;
  beforeSend(request: PrivateChatHttpRequest): void;
}
class PrivateChatTransportError extends Error {
  readonly name = "PrivateChatTransportError";
}
/** One attempt, own destination, no UI/store imports and no GET/write retry policy. */
export class PrivateChatHttpClient {
  constructor(private readonly ports: HttpPorts) {}
  async request(options: PrivateChatHttpRequest): Promise<any> {
    let target: Readonly<PrivateChatDestination>, url: URL;
    // Check before loading any secret, and never expose native URL errors to the caller.
    try {
      target = Object.freeze({ ...validatePrivateRoom(options.destination), channel: options.destination.channel });
      url = new URL(options.path, target.origin);
      if (!options.path.startsWith("/api/v1/") || options.path.includes("\\") || url.origin !== target.origin || url.hash || url.username || url.password || !url.pathname.startsWith("/api/v1/")) throw new Error();
    } catch { throw new PrivateChatTransportError("聊天室请求目标无效"); }
    const request = Object.freeze({ ...options, destination: target, path: url.pathname, method: (options.method || "GET").toUpperCase() });
    url.searchParams.set("room", target.room);
    url.searchParams.delete("channel");
    if (target.channel && target.channel !== "main") url.searchParams.set("channel", target.channel);
    // Existing caller budgets (12/15/20/25 seconds) win; 30s also bounds arbitrary supplied signals.
    return privateChatOperation(request.signal ? 30000 : 15000, async signal => {
      try {
        const token = await this.ports.credential(target, signal);
        signal.throwIfAborted();
        if (!isPrivateChatToken(token)) throw new PrivateChatCredentialError("invalid");
        this.ports.beforeSend(request);
        let body: string | undefined;
        try { body = request.body === undefined ? undefined : JSON.stringify(request.body); }
        catch { throw new PrivateChatTransportError("聊天室请求内容格式无效"); }
        const response = await fetch(url, { method: request.method, signal, body,
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          redirect: "error", credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
        const cancelBody = () => { void response.body?.cancel().catch(() => {}); };
        if (signal.aborted) { cancelBody(); signal.throwIfAborted(); }
        if (!response.ok) { cancelBody(); throw new HttpError(response.status); }
        const reader = response.body?.getReader();
        if (!reader) throw new PrivateChatTransportError("聊天室返回空响应");
        const cancel = () => { void reader.cancel().catch(() => {}); };
        signal.addEventListener("abort", cancel, { once: true });
        let count = 0, text = ""; const decoder = new TextDecoder();
        try {
          for (;;) {
            const part = await reader.read(); signal.throwIfAborted();
            if (part.done) break;
            count += part.value.byteLength;
            if (count > 2 * 1024 * 1024) { cancel(); throw new PrivateChatTransportError("聊天室响应超限"); }
            text += decoder.decode(part.value, { stream: true });
          }
          try { return JSON.parse(text + decoder.decode()); }
          catch { throw new PrivateChatTransportError("聊天室响应格式无效"); }
        } finally {
          signal.removeEventListener("abort", cancel);
          try { reader.releaseLock(); } catch { /* A cancelled native stream may still be settling. */ }
        }
      } catch (error) {
        if (signal.aborted) throw signal.reason;
        if (error instanceof HttpError || error instanceof ChatCapabilityError || error instanceof PrivateChatCredentialError || error instanceof PrivateChatTransportError) throw error;
        // Never propagate native URL/JSON/network errors containing request or response fragments.
        throw new PrivateChatTransportError("聊天室请求失败，请检查网络或服务配置");
      }
    }, request.signal);
  }
}
