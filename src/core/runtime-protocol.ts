/**
 * 扩展运行时（Content / UI Pages / Side Panel / Offscreen / Background Service Worker）
 * 统一强类型消息协议与路由分发器。
 */

declare const chrome: any;

export type BackgroundRuntimeRequest =
  | { type: "routeNewTab" }
  | { type: "cleanupNativeTabs" }
  | { type: "cleanupBrowserDefaultTabs" }
  | { type: "fetchImageForClipboard"; url: string }
  | { type: "saveToFavorites"; url?: string; dataUrl?: string }
  | { type: "bookmarkCurrentPage"; tab: Record<string, unknown>; targetPage?: string }
  | { type: "searchWebImages"; query: string; limit?: number }
  | { type: "fetchSiteImages"; url: string }
  | { type: "downloadBiliVideo"; url?: string; bvid?: string; aid?: number; cid?: number; title?: string }
  | { type: "native-bridge:send"; hostName: string; payload: Record<string, unknown> }
  | { type: "audio-bg:get-state" }
  | { type: "audio-bg:command"; target: string; action: string; [key: string]: unknown }
  | { type: "offscreen-audio:get-state" }
  | { type: "offscreen-audio:command"; target: string; action: string; [key: string]: unknown }
  | { type: "TOGGLE_SIDE_DRAWER"; targetTabId?: number }
  | { type: "AUTHORIZE_SIDE_DRAWER_EMBED"; token: string };

export interface BackgroundRuntimeResponseMap {
  routeNewTab: { ok?: boolean; action?: string } | undefined;
  cleanupNativeTabs: { ok?: boolean } | undefined;
  cleanupBrowserDefaultTabs: { ok?: boolean } | undefined;
  fetchImageForClipboard: { ok?: boolean; dataUrl?: string; error?: string } | undefined;
  saveToFavorites: { ok?: boolean; error?: string } | undefined;
  bookmarkCurrentPage: { ok?: boolean; existed?: boolean; error?: string } | undefined;
  searchWebImages: { ok?: boolean; results?: unknown[]; error?: string } | undefined;
  fetchSiteImages: { ok?: boolean; images?: unknown[]; error?: string } | undefined;
  downloadBiliVideo: { ok?: boolean; error?: string } | undefined;
  "native-bridge:send": { ok?: boolean; response?: unknown; error?: string } | undefined;
  "audio-bg:get-state": { ok?: boolean; available?: boolean; state?: unknown; error?: string } | undefined;
  "audio-bg:command": { ok?: boolean; state?: unknown; error?: string } | undefined;
  "offscreen-audio:get-state": { ok?: boolean; state?: unknown; error?: string } | undefined;
  "offscreen-audio:command": { ok?: boolean; state?: unknown; error?: string } | undefined;
  TOGGLE_SIDE_DRAWER: { ok?: boolean } | undefined;
  AUTHORIZE_SIDE_DRAWER_EMBED: { ok?: boolean } | undefined;
}

export type BackgroundMessageType = BackgroundRuntimeRequest["type"];

export type BackgroundRequestByType<K extends BackgroundMessageType> = Extract<
  BackgroundRuntimeRequest,
  { type: K }
>;

export interface RuntimeLike {
  sendMessage?: (message: unknown, callback?: (response: unknown) => void) => unknown;
  lastError?: { message?: string } | null;
}

function resolveRuntime(customRuntime?: RuntimeLike): RuntimeLike | null {
  if (customRuntime?.sendMessage) return customRuntime;
  if (typeof chrome !== "undefined" && chrome?.runtime?.sendMessage) {
    return chrome.runtime as RuntimeLike;
  }
  return null;
}

/**
 * 统一发送 runtime 消息，自动兼容 callback 与 Promise 两种 MV3/Mock 形态，
 * 并消费 `chrome.runtime.lastError` 避免控制台未捕获错误。
 */
export function sendRuntimeMessage<K extends BackgroundMessageType>(
  request: BackgroundRequestByType<K>,
  options?: { runtime?: RuntimeLike; throwOnError?: false }
): Promise<BackgroundRuntimeResponseMap[K]>;
export function sendRuntimeMessage<K extends BackgroundMessageType>(
  request: BackgroundRequestByType<K>,
  options: { runtime?: RuntimeLike; throwOnError: true }
): Promise<BackgroundRuntimeResponseMap[K]>;
export function sendRuntimeMessage<K extends BackgroundMessageType>(
  request: BackgroundRequestByType<K>,
  options?: { runtime?: RuntimeLike; throwOnError?: boolean }
): Promise<BackgroundRuntimeResponseMap[K]> {
  const runtime = resolveRuntime(options?.runtime);
  const throwOnError = Boolean(options?.throwOnError);
  if (!runtime?.sendMessage) {
    if (throwOnError) return Promise.reject(new Error("RUNTIME_UNAVAILABLE"));
    return Promise.resolve(undefined as BackgroundRuntimeResponseMap[K]);
  }

  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (response: unknown, err?: unknown) => {
      if (settled) return;
      settled = true;
      const lastErr = runtime.lastError;
      if (lastErr || err) {
        if (throwOnError) {
          reject(err instanceof Error ? err : new Error(lastErr?.message || String(err || "RUNTIME_ERROR")));
        } else {
          resolve(undefined as BackgroundRuntimeResponseMap[K]);
        }
        return;
      }
      resolve(response as BackgroundRuntimeResponseMap[K]);
    };

    try {
      const maybePromise = runtime.sendMessage!(request, (response: unknown) => finish(response));
      if (maybePromise && typeof (maybePromise as Promise<unknown>).then === "function") {
        (maybePromise as Promise<unknown>).then(
          (res) => finish(res),
          (err) => finish(undefined, err)
        );
      }
    } catch (err) {
      finish(undefined, err);
    }
  });
}

export type RuntimeMessageHandler<TMessage = any> = (
  message: TMessage,
  sender: any,
  sendResponse: (response?: unknown) => void
) => boolean | void | Promise<unknown>;

/**
 * 构建表驱动的 `chrome.runtime.onMessage` 路由器：
 * - 若 handler 返回 Promise，自动接管 `sendResponse` 并在结束前保活端口 (`return true`)。
 * - 若 handler 返回 `true`，保留原有手动异步 `sendResponse` 控制权。
 */
export function createRuntimeMessageRouter(
  handlers: Record<string, RuntimeMessageHandler | undefined>
): (message: any, sender: any, sendResponse: (res: any) => void) => boolean {
  return (message: any, sender: any, sendResponse: (res: any) => void): boolean => {
    const type = typeof message?.type === "string" ? message.type : "";
    const handler = type ? handlers[type] : undefined;
    if (!handler) return false;
    try {
      const outcome = handler(message, sender, sendResponse);
      if (outcome && typeof (outcome as Promise<unknown>).then === "function") {
        (outcome as Promise<unknown>).then(
          (value) => sendResponse(value),
          (error) => sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) })
        );
        return true;
      }
      return outcome === true;
    } catch (error) {
      sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) });
      return false;
    }
  };
}
