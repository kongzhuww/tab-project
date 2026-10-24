// Shared, bounded cache for the two legacy playlist keys. Keep the storage format
// compatible with existing installs and invalidate parsed values across tabs.
export const CACHED_PLAYLISTS_KEY = "netease_cached_playlists";
export const CACHED_FAVORITES_KEY = "netease_cached_favorites_songs";
type CacheKey = typeof CACHED_PLAYLISTS_KEY | typeof CACHED_FAVORITES_KEY;
const parsed = new Map<CacheKey, { raw: string | null; value: unknown[] }>();
const pending = new Map<CacheKey, unknown[]>();
let timer: ReturnType<typeof setTimeout> | undefined;

export function readPlaylistCache<T>(key: CacheKey): T[] {
  const queued = pending.get(key);
  if (queued) return queued as T[];
  try {
    const raw = localStorage.getItem(key);
    const cached = parsed.get(key);
    if (cached?.raw === raw) return cached.value as T[];
    const value = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(value) ? value : [];
    parsed.set(key, { raw, value: list });
    return list;
  } catch {
    return [];
  }
}

function flush() {
  clearTimeout(timer);
  timer = undefined;
  for (const [key, value] of pending) {
    try {
      const raw = JSON.stringify(value);
      if (localStorage.getItem(key) !== raw) localStorage.setItem(key, raw);
      parsed.set(key, { raw, value });
    } catch {
      // This is a replaceable offline cache, never the authoritative library.
      parsed.delete(key);
    }
  }
  pending.clear();
}

export function writePlaylistCache(key: CacheKey, value: unknown[]): void {
  pending.set(key, value);
  // Coalesce writes and move serialization out of the current rendering task.
  if (timer === undefined) timer = setTimeout(flush, 250);
}

export function removePlaylistCache(key: CacheKey): void {
  pending.delete(key);
  parsed.delete(key);
  try { localStorage.removeItem(key); } catch {}
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flush);
  window.addEventListener("storage", (event) => {
    if (event.storageArea !== localStorage) return;
    for (const key of [CACHED_PLAYLISTS_KEY, CACHED_FAVORITES_KEY] as const) {
      if (event.key === null || event.key === key) {
        parsed.delete(key);
        pending.delete(key);
      }
    }
  });
}
