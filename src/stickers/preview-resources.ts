import { createStickerPreview } from "./image-preview";

/** One service instance owns these display URLs; original bytes never enter this cache. */
export class StickerPreviewResources {
  private readonly urls = new Map<string, string>();
  private generation = 0;
  private running = 0;
  private readonly pending: { current: () => boolean; resolve: (acquired: boolean) => void }[] = [];
  private readonly limit = 120;
  get(key: string): string { return this.urls.get(key) || ""; }
  has(key: string): boolean { return this.urls.has(key); }
  private release(key: string): void {
    const url = this.urls.get(key);
    if (url) { try { URL.revokeObjectURL(url); } catch {} }
    this.urls.delete(key);
  }
  /** In-flight native decode cannot be physically aborted, but cannot publish after this. */
  cancelPending(): void {
    ++this.generation;
    for (const waiter of this.pending.splice(0)) waiter.resolve(false);
  }
  delete(key: string): void { this.cancelPending(); this.release(key); }
  retain(keys: ReadonlySet<string>): void {
    this.cancelPending();
    for (const key of this.urls.keys()) if (!keys.has(key)) this.release(key);
  }
  clear(): void {
    this.cancelPending();
    for (const key of this.urls.keys()) this.release(key);
  }
  private acquire(current: () => boolean): Promise<boolean> {
    if (!current()) return Promise.resolve(false);
    if (this.running < 2) { ++this.running; return Promise.resolve(true); }
    return new Promise(resolve => this.pending.push({ current, resolve }));
  }
  private releaseSlot(): void {
    --this.running;
    while (this.running < 2 && this.pending.length) {
      const waiter = this.pending.shift()!;
      const active = waiter.current();
      if (active) ++this.running;
      waiter.resolve(active);
    }
  }
  async prepare(key: string, read: () => Promise<Blob>, current: () => boolean): Promise<string> {
    const generation = this.generation;
    const active = () => generation === this.generation && current();
    if (!active()) return "";
    const cached = this.get(key); if (cached) return cached;
    if (!await this.acquire(active)) return "";
    try {
      if (!active()) return "";
      const blob = await read(); if (!active()) return "";
      const preview = await createStickerPreview(blob); if (!active()) return "";
      const existing = this.get(key); if (existing) return existing;
      while (this.urls.size >= this.limit) {
        const first = this.urls.keys().next(); if (first.done) break;
        this.release(first.value);
      }
      const url = URL.createObjectURL(preview);
      this.urls.set(key, url);
      return url;
    } finally { this.releaseSlot(); }
  }
}
