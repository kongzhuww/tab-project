export const AIHOT_API_BASE = "https://aihot.news/api/v1";

/**
 * Pure fetch adapter for the launcher AI Hot quick-picks card (no Vue store dependency).
 */
export async function fetchAiHotQuickSelectedItems(
  limit = 24,
  signal?: AbortSignal,
  apiBase = AIHOT_API_BASE
): Promise<any[]> {
  const params = new URLSearchParams({ mode: "selected", window: "24h", limit: String(limit) });
  const res = await fetch(`${apiBase}/items?${params}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const payload = await res.json();
  const fresh = Array.isArray(payload)
    ? payload
    : payload?.items || payload?.data || payload?.results || [];
  return Array.isArray(fresh) ? fresh : [];
}
