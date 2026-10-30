import { reactive } from "vue";
export const musicModuleState = reactive({ visible: false, pendingWrites: 0 });
const pausers = new Set<() => void>();
export function onMusicPause(pause: () => void): () => void {
  pausers.add(pause); return () => { pausers.delete(pause); };
}
export function pauseMusicReads(): void { for (const pause of pausers) pause(); }
export async function withMusicWrite<T>(operation: () => Promise<T>): Promise<T> {
  musicModuleState.pendingWrites++;
  try { return await operation(); } finally { musicModuleState.pendingWrites--; }
}
