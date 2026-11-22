// One bounded invalidation marker, never task contents or raw credentials.
const KEY = 'todoist_change_revision_v1';
const SYNCED_KEY = 'todoist_synced_revision_v1';
interface Marker { version: 1; scope: string; revision: string }

function parseMarker(raw: string | null): Marker | null {
  if (!raw || raw.length > 512) return null;
  try {
    const marker = JSON.parse(raw) as Marker;
    if (
      marker.version !== 1 ||
      !/^[a-f0-9]{64}$/.test(marker.scope) ||
      typeof marker.revision !== 'string' ||
      !/^[a-f0-9-]{36}$/.test(marker.revision)
    ) {
      return null;
    }
    return marker;
  } catch {
    return null;
  }
}

async function scopeFor(token: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('todoist-invalidation-v1:' + token));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}

export function createTodoistChangeChannel(getToken: () => Promise<string>, invalidate: () => void) {
  let seen = '';
  let startupChecked = false;

  async function receive(raw: string | null, fromStartupReconcile = false) {
    try {
      const marker = parseMarker(raw);
      if (!marker) return;
      const token = await getToken();
      if (!token) return;
      const scope = await scopeFor(token);
      if (marker.scope !== scope || token !== await getToken()) return;
      if (seen === marker.revision) return;

      // On fresh New Tab / page startup, if the latest write revision was already
      // persisted into the cached snapshot, adopt it without invalidating cache.
      if (fromStartupReconcile && !startupChecked) {
        startupChecked = true;
        const synced = parseMarker(localStorage.getItem(SYNCED_KEY));
        if (synced && synced.scope === scope && synced.revision === marker.revision) {
          seen = marker.revision;
          return;
        }
      }
      startupChecked = true;
      seen = marker.revision;
      invalidate();
    } catch { /* A missing invalidation hint must not change a confirmed write result. */ }
  }

  function reconcile() {
    if (!document.hidden) {
      try { void receive(localStorage.getItem(KEY), !startupChecked); } catch { /* Storage unavailable: manual refresh remains available. */ }
    }
  }

  // TodoistService is also imported by the MV3 worker, which has no DOM.
  // Page-to-page localStorage reconciliation belongs only to document contexts.
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('storage', event => { if (event.key === KEY) void receive(event.newValue, false); });
    document.addEventListener('visibilitychange', reconcile);
    window.addEventListener('pageshow', reconcile);
  }

  return {
    async publish(token: string) {
      try {
        if (!token) return;
        const marker: Marker = { version: 1, scope: await scopeFor(token), revision: crypto.randomUUID() };
        localStorage.setItem(KEY, JSON.stringify(marker));
        startupChecked = true;
        // Do not mark another account's delayed write as the current page's revision.
        if (token === await getToken()) seen = marker.revision;
      } catch { console.warn('[Todoist] Cross-page invalidation unavailable; refresh other pages manually.'); }
    },
    async markSynced(token: string) {
      try {
        if (!token || typeof localStorage === 'undefined') return;
        const scope = await scopeFor(token);
        const current = parseMarker(localStorage.getItem(KEY));
        if (current && current.scope === scope) {
          localStorage.setItem(SYNCED_KEY, JSON.stringify(current));
          seen = current.revision;
        }
        startupChecked = true;
      } catch {}
    },
    clear() {
      seen = '';
      startupChecked = false;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(KEY);
          localStorage.removeItem(SYNCED_KEY);
        }
      } catch {}
    }
  };
}
