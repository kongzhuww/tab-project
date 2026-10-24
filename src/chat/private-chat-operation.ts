/** Bounded waiting, not rollback or retry. Late completion/rejection is always consumed. */
export function privateChatOperation<T>(timeoutMs: number, work: (signal: AbortSignal) => Promise<T>, parent?: AbortSignal): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const controller = new AbortController();
    const stop = () => controller.abort(new DOMException("聊天室操作已停止等待", "AbortError"));
    const cleanup = () => { clearTimeout(timer); parent?.removeEventListener("abort", stop); controller.signal.removeEventListener("abort", aborted); };
    const aborted = () => { cleanup(); reject(controller.signal.reason); };
    const timer = setTimeout(() => controller.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), timeoutMs);
    controller.signal.addEventListener("abort", aborted, { once: true });
    parent?.addEventListener("abort", stop, { once: true });
    if (parent?.aborted) { stop(); return; }
    Promise.resolve().then(() => { controller.signal.throwIfAborted(); return work(controller.signal); }).then(
      value => { cleanup(); if (controller.signal.aborted) reject(controller.signal.reason); else resolve(value); },
      error => { cleanup(); reject(error); }
    );
  });
}
