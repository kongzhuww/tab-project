// Playback-only deadlines: do not change unrelated Bilibili reads or writes.
export function playbackDeadline(parent: AbortSignal | undefined, ms: number) {
  const controller = new AbortController();
  const abort = () => controller.abort(parent?.reason);
  if (parent?.aborted) abort();
  else parent?.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(() => controller.abort(new DOMException('视频加载超时，请手动重试', 'TimeoutError')), ms);
  return { signal: controller.signal, dispose() { clearTimeout(timer); parent?.removeEventListener('abort', abort); controller.abort(); } };
}

export class PlaybackSession {
  private controller: AbortController | undefined;
  start(): AbortSignal { this.cancel(); this.controller = new AbortController(); return this.controller.signal; }
  cancel() { this.controller?.abort(); }
}
