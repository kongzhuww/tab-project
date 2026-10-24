/** Read-only lifecycle ownership. No Vue, storage, network, retries or global singleton. */
export type ReadStopReason = "cancelled" | "replaced" | "parent" | "timeout";
export interface ReadSessionOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  isCurrent?: () => boolean;
  /** Owner-only cancellation notification. Never submit/retry writes from this callback. */
  onStop?: (reason: ReadStopReason) => void;
}
export interface ReadSession {
  readonly signal: AbortSignal;
  /** Ownership is independent of activity; use finish() to release your own busy state. */
  owns(): boolean;
  current(): boolean;
  /** Stop waiting on non-abortable storage/native reads; does not roll back their effects. */
  wait<T>(operation: () => Promise<T>): Promise<T>;
  /** True only if this completion still owns the slot after resource cleanup. */
  finish(): boolean;
}
type Ticket = ReadSession & { stop(reason?: ReadStopReason): boolean };

/** One slot per independent read lane. Starting a read replaces only that lane's old read. */
export class ReadSessionSlot {
  private active?: Ticket;
  private sequence = 0;
  get pending(): boolean { return !!this.active; }
  cancel(): void { this.active?.stop("cancelled"); }

  begin(options: ReadSessionOptions = {}): ReadSession {
    const { timeoutMs, signal: parent, isCurrent: guard, onStop: notify } = options;
    if (timeoutMs !== undefined && (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 300000)) {
      throw new RangeError("Read timeout must be between 1 and 300000 milliseconds");
    }
    const serial = ++this.sequence, controller = new AbortController();
    let closed = false, timer: ReturnType<typeof setTimeout> | undefined;
    const owns = () => !closed && this.active === ticket;
    const current = () => owns() && !controller.signal.aborted && (guard?.() ?? true);
    const parentAbort = () => { ticket.stop("parent"); };
    const stop = (reason?: ReadStopReason): boolean => {
      if (closed) return false;
      const owned = owns();
      closed = true;
      if (owned) this.active = undefined;
      clearTimeout(timer);
      parent?.removeEventListener("abort", parentAbort);
      controller.abort(new DOMException(reason === "timeout" ? "Read session timed out" : "Read session ended", reason === "timeout" ? "TimeoutError" : "AbortError"));
      // Abort listeners may synchronously start another read. Never clear that new owner's UI.
      const released = owned && this.sequence === serial && !this.active;
      if (reason && released) { try { notify?.(reason); } catch { /* Cleanup must remain complete. */ } }
      return released;
    };
    const wait = <T>(operation: () => Promise<T>): Promise<T> => {
      if (!current()) return Promise.reject(controller.signal.reason || new DOMException("Read session is no longer current", "AbortError"));
      return new Promise<T>((resolve, reject) => {
        const abort = () => { detach(); reject(controller.signal.reason); };
        const detach = () => controller.signal.removeEventListener("abort", abort);
        controller.signal.addEventListener("abort", abort, { once: true });
        try {
          Promise.resolve(operation()).then(value => {
            detach();
            try {
              if (current()) resolve(value);
              else reject(controller.signal.reason || new DOMException("Read session is no longer current", "AbortError"));
            } catch (error) { reject(error); }
          }, error => { detach(); reject(error); });
        } catch (error) { detach(); reject(error); }
        // Both handlers stay attached to the underlying operation after cancellation,
        // so its late rejection is consumed even though the caller has stopped waiting.
      });
    };
    const ticket: Ticket = { signal: controller.signal, owns, current, wait, finish: () => stop(), stop };
    const old = this.active;
    this.active = ticket;
    old?.stop("replaced");
    if (!owns()) return ticket;
    if (parent?.aborted) ticket.stop("parent");
    else {
      parent?.addEventListener("abort", parentAbort, { once: true });
      if (timeoutMs !== undefined) timer = setTimeout(() => ticket.stop("timeout"), timeoutMs);
    }
    return ticket;
  }
}
