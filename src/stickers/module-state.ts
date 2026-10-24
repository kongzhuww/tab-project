import { reactive } from "vue";
export const stickersModuleState = reactive({ visible: false, pendingWrites: 0 });
const pausers = new Set<() => void>();
export function onStickersPause(pause: () => void): () => void {
  pausers.add(pause);
  return () => { pausers.delete(pause); };
}
export function pauseStickersReads(): void { for (const pause of pausers) pause(); }
export async function withStickersWrite<T>(operation: () => Promise<T>): Promise<T> {
  stickersModuleState.pendingWrites++;
  try { return await operation(); }
  finally { stickersModuleState.pendingWrites--; }
}
