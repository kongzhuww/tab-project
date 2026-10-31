// One bounded invalidation marker, never task contents or raw credentials.
const KEY = 'todoist_change_revision_v1';
interface Marker { version: 1; scope: string; revision: string }
async function scopeFor(token: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('todoist-invalidation-v1:' + token));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}
export function createTodoistChangeChannel(getToken: () => Promise<string>, invalidate: () => void) {
  let seen = '';
  async function receive(raw: string | null) {
    try {
      if (!raw || raw.length > 512) return;
      const marker = JSON.parse(raw) as Marker;
      if (marker.version !== 1 || !/^[a-f0-9]{64}$/.test(marker.scope) ||
          typeof marker.revision !== 'string' || !/^[a-f0-9-]{36}$/.test(marker.revision)) return;
      const token = await getToken();
      if (!token || marker.scope !== await scopeFor(token) || token !== await getToken()) return;
      if (seen === marker.revision) return;
      seen = marker.revision;
      invalidate();
    } catch { /* A missing invalidation hint must not change a confirmed write result. */ }
  }
  function reconcile() {
    if (!document.hidden) {
      try { void receive(localStorage.getItem(KEY)); } catch { /* Storage unavailable: manual refresh remains available. */ }
    }
  }
  // TodoistService is also imported by the MV3 worker, which has no DOM.
  // Page-to-page localStorage reconciliation belongs only to document contexts.
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('storage', event => { if (event.key === KEY) void receive(event.newValue); });
    document.addEventListener('visibilitychange', reconcile);
    window.addEventListener('pageshow', reconcile);
  }
  return {
    async publish(token: string) {
      try {
        if (!token) return;
        const marker: Marker = { version: 1, scope: await scopeFor(token), revision: crypto.randomUUID() };
        localStorage.setItem(KEY, JSON.stringify(marker));
        // Do not mark another account's delayed write as the current page's revision.
        if (token === await getToken()) seen = marker.revision;
      } catch { console.warn('[Todoist] Cross-page invalidation unavailable; refresh other pages manually.'); }
    }
  };
}
