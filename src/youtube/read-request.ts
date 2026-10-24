// Read-only transport helpers. Cancelling a runtime message only stops this page waiting.
export async function readYouTubeMessage(message: object, signal?: AbortSignal, timeoutMs = 8000): Promise<any> {
  signal?.throwIfAborted();
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error?: Error, data?: unknown) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      if (error) reject(error); else resolve(data);
    };
    const abort = () => finish(new DOMException("Read cancelled", "AbortError"));
    const timer = setTimeout(() => finish(new Error("YouTube read timeout")), timeoutMs);
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) { abort(); return; }
    try {
      if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) throw new Error("Extension transport unavailable");
      chrome.runtime.sendMessage(message, (response: any) => {
        const error = chrome.runtime.lastError;
        if (settled) return;
        if (error || !response?.ok) finish(new Error("YouTube background read failed"));
        else finish(undefined, response);
      });
    } catch { finish(new Error("YouTube background transport unavailable")); }
  });
}

export async function readYouTubeText(url: string, options: RequestInit, parent?: AbortSignal, timeoutMs = 8000): Promise<string> {
  parent?.throwIfAborted();
  const controller = new AbortController();
  const abort = () => controller.abort();
  parent?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(abort, timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    controller.signal.throwIfAborted();
    return text;
  } finally {
    clearTimeout(timer);
    parent?.removeEventListener("abort", abort);
  }
}
