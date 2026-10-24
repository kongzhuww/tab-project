import { ReadSessionSlot, type ReadSession } from "../core/read-session";
import type { PrivateChatDestination } from "./private-chat-types";

export type PrivateSyncFailure = "retry" | "auth" | "missing-room";
export interface PrivateSyncRound extends Pick<ReadSession, "signal" | "current" | "wait"> {
  readonly visible: boolean;
  phase(name: string): void;
  restoring(): boolean;
  caughtUp(): void;
}
export interface PrivateSyncPorts {
  active(destination: PrivateChatDestination): boolean;
  visible(): boolean;
  poll(destination: PrivateChatDestination, round: PrivateSyncRound): Promise<{ hasMore: boolean } | undefined>;
  classify(error: unknown, destination: PrivateChatDestination): PrivateSyncFailure;
  started(): void;
  idle(): void;
  failed(kind: PrivateSyncFailure, phase: string, failures: number): void;
  restart(): void;
}

/** Read scheduling only. Parent authentication, messages and writes belong to their domain owners. */
export class PrivateChatSyncCoordinator {
  private generation = 0;
  private halted = true;
  private liveGeneration = -1;
  private timer?: ReturnType<typeof setTimeout>;
  private running?: symbol;
  private readonly reads = new ReadSessionSlot();
  constructor(private readonly ports: PrivateSyncPorts) {}
  get stopped(): boolean { return this.halted; }

  cancel(): void { this.invalidate(); }
  private invalidate(): number {
    const version = ++this.generation; this.halted = true;
    clearTimeout(this.timer); this.timer = undefined;
    this.reads.cancel();
    if (version === this.generation && this.halted) this.ports.idle();
    return version;
  }
  start(destination: PrivateChatDestination): void {
    const frozen = Object.freeze({ ...destination });
    const version = this.invalidate();
    if (version !== this.generation || !this.ports.active(frozen)) return;
    this.halted = false;
    // Pending admission behind an older round is still a visible sync operation.
    this.ports.started();
    void this.tick(frozen, version, 0);
  }
  private owns(destination: PrivateChatDestination, version: number): boolean {
    return this.generation === version && !this.halted && this.ports.active(destination);
  }
  private schedule(work: () => void, delay: number, version: number): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = undefined;
      if (version === this.generation) work();
    }, delay);
  }
  private async tick(destination: PrivateChatDestination, version: number, failures: number): Promise<void> {
    if (!this.owns(destination, version)) return;
    if (this.running) { this.schedule(() => { void this.tick(destination, version, failures); }, 250, version); return; }
    const token = Symbol("chat-sync"); this.running = token;
    const visible = this.ports.visible();
    const read = this.reads.begin({ timeoutMs: visible ? 25000 : 20000, isCurrent: () => this.owns(destination, version) });
    let delay = visible ? 2500 : 10000, phase = "读取本地历史";
    const round: PrivateSyncRound = {
      signal: read.signal, current: read.current, wait: read.wait, visible,
      phase: value => { phase = value; },
      restoring: () => this.liveGeneration !== version,
      caughtUp: () => { if (read.current()) this.liveGeneration = version; }
    };
    try {
      this.ports.started();
      const result = await read.wait(() => this.ports.poll(destination, round));
      if (!read.current()) return;
      failures = 0;
      if (result?.hasMore) delay = 250;
    } catch (error) {
      // Timeout ends the read slot, not ownership of this loop generation.
      if (!this.owns(destination, version)) return;
      const kind = this.ports.classify(error, destination);
      if (kind === "retry") { ++failures; delay = Math.min(60000, 1500 * 2 ** Math.min(failures, 4)); }
      else this.halted = true;
      this.ports.failed(kind, phase, failures);
      if (kind === "missing-room" && version === this.generation && this.halted) {
        this.schedule(() => this.ports.restart(), 0, version);
      }
    } finally {
      read.finish();
      if (this.running === token) this.running = undefined;
      if (version === this.generation) {
        if (!this.ports.active(destination)) this.halted = true;
        this.ports.idle();
      }
      if (this.owns(destination, version)) {
        this.schedule(() => { void this.tick(destination, version, failures); }, delay, version);
      }
    }
  }
}
