const n = "https://aihot.news/api/v1";
async function c(e = 24, r, i = n) {
  const o = new URLSearchParams({ mode: "selected", window: "24h", limit: String(e) }), s = await fetch(`${i}/items?${o}`, {
    headers: { Accept: "application/json" },
    signal: r
  });
  if (!s.ok) throw new Error(`HTTP ${s.status}`);
  const t = await s.json(), a = Array.isArray(t) ? t : t?.items || t?.data || t?.results || [];
  return Array.isArray(a) ? a : [];
}
export {
  n as AIHOT_API_BASE,
  c as fetchAiHotQuickSelectedItems
};
