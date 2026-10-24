import { reactive } from "vue";
export const wallpaperModuleState = reactive({ visible: false, pendingWrites: 0 });
const pausers = new Set<() => void>();
export function onWallpaperPause(pause: () => void): () => void {
  pausers.add(pause); return () => { pausers.delete(pause); };
}
export function pauseWallpaperReads(): void { for (const pause of pausers) pause(); }
export async function withWallpaperWrite<T>(operation: () => Promise<T>): Promise<T> {
  if (wallpaperModuleState.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  wallpaperModuleState.pendingWrites++;
  try { return await operation(); } finally { wallpaperModuleState.pendingWrites--; }
}
