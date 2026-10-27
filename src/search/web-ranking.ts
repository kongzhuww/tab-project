import type { SearchSuggestionItem } from './store';

export interface WebCandidate {
  item: SearchSuggestionItem;
  source: 'history' | 'launcher' | 'bookmark' | 'plugin';
  visitedAt?: number;
  // Preserve existing bookmark worker pinyin/fuzzy matches when literal matching fails.
  fuzzyMatch?: boolean;
}
export function searchUrlKey(raw: string): string {
  try {
    const url = new URL(raw.trim());
    if (!['http:', 'https:', 'ftp:', 'file:', 'chrome:', 'edge:', 'about:'].includes(url.protocol) || url.username || url.password) return '';
    return url.href; // Keep path, query and fragment semantics; do not merge different documents.
  } catch { return ''; }
}
export function webMatchScore(query: string, title: string, url: string): number {
  const normalize = (value: string) => value.normalize('NFKC').toLowerCase().trim();
  const q = normalize(query), t = normalize(title), u = normalize(url);
  if (!q) return 0;
  const titleScore = t === q ? 100 : t.startsWith(q) ? 85 : t.includes(q) ? 70 : 0;
  let host = '';
  try { host = new URL(url).hostname.replace(/^www\./, '').toLowerCase(); } catch {}
  const urlScore = host === q ? 95 : host.startsWith(q) ? 80 : u.includes(q) ? 60 : 0;
  if (titleScore || urlScore) return Math.max(titleScore, urlScore);
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every(token => t.includes(token))) return 55;
  if (tokens.length > 1 && tokens.every(token => (t + ' ' + u).includes(token))) return 45;
  return 0;
}
export function rankWebCandidates(query: string, candidates: WebCandidate[], limit = 40): SearchSuggestionItem[] {
  const merged = new Map<string, { candidate: WebCandidate; score: number; visitedAt: number; sources: Set<string>; order: number }>();
  for (const candidate of candidates) {
    const { item } = candidate;
    const key = item.url ? searchUrlKey(item.url) : candidate.source === 'plugin' ? 'plugin:' + item.id : '';
    if (!key) continue;
    const score = webMatchScore(query, item.title || '', item.url || '') || (candidate.fuzzyMatch ? 15 : 0);
    if (!score) continue;
    const previous = merged.get(key);
    if (!previous) {
      merged.set(key, { candidate, score, visitedAt: candidate.visitedAt || 0, sources: new Set([candidate.source]), order: merged.size });
    } else {
      previous.sources.add(candidate.source);
      previous.visitedAt = Math.max(previous.visitedAt, candidate.visitedAt || 0);
      previous.score = Math.max(previous.score, score);
      // A live saved title takes precedence over an outdated history snapshot.
      if (previous.candidate.source === 'history' && candidate.source !== 'history') previous.candidate = candidate;
    }
  }
  return [...merged.values()].sort((a, b) => b.score - a.score || b.visitedAt - a.visitedAt || a.order - b.order)
    .slice(0, limit).map(({ candidate, sources }) => {
      const labels = [sources.has('launcher') ? '常用网站' : '', sources.has('bookmark') ? '书签' : '', sources.has('history') ? '历史' : ''].filter(Boolean);
      return { ...candidate.item, badge: labels.length ? { ...candidate.item.badge, text: labels.join(' · ') } : candidate.item.badge };
    });
}
