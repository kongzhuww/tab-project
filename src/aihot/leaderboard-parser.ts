import type { AiHotLeaderboardItem } from './aihot-feed-store';

const ORIGIN = 'https://aihot.news';
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Parse the current AIHOT SSR table. Never trust remote links as executable URLs. */
export function parseModernLeaderboard(html: string): AiHotLeaderboardItem[] {
  if (typeof DOMParser === 'undefined') return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const result: AiHotLeaderboardItem[] = [];
  for (const table of doc.querySelectorAll('table')) {
    const rows = table.querySelectorAll('tbody tr[data-slug]');
    if (!rows.length) continue;
    const headers = Array.from(table.querySelectorAll('thead th'), th => (th.textContent || '').replace(/\s+/g, ''));
    const inputIndex = headers.findIndex(h => h.includes('输入价格'));
    const outputIndex = headers.findIndex(h => h.includes('输出价格'));
    const scoreIndex = headers.findIndex(h => h.includes('AIHOT评分'));
    if (scoreIndex < 0) continue;
    for (const row of rows) {
      const slug = row.getAttribute('data-slug') || '';
      const cells = row.querySelectorAll(':scope > td');
      if (!SLUG.test(slug) || cells.length <= scoreIndex) continue;
      const model = cells[1]?.querySelector('a strong')?.textContent?.trim() || '';
      const provider = cells[1]?.querySelector('small')?.textContent?.trim() || '';
      const rawRank = cells[0]?.textContent?.trim() || '';
      const score = cells[scoreIndex]?.querySelector('strong')?.textContent?.trim() || '';
      if (!model || !/^\d+$/.test(rawRank) || !score) continue;
      const price = (index: number) => index < 0 ? '-' : cells[index]?.textContent?.trim() || '-';
      result.push({
        href: `${ORIGIN}/leaderboard/${slug}`,
        rank: String(Number(rawRank)), model, provider,
        releaseDate: row.querySelector('time')?.textContent?.trim() || '',
        inputPrice: price(inputIndex), outputPrice: price(outputIndex), score
      });
    }
    if (result.length) break;
  }
  return result;
}
