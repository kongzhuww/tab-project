import type { MyRepoItem } from './my-repos-store';

/** Mirrors the GitHub board's existing suggestions without persisting them. */
export function inferGroupsForRepo(repo: MyRepoItem, groups: string[]): string[] {
  const matched: string[] = [];
  const name = repo.name.toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  for (const group of groups || []) {
    const g = group.toLowerCase();
    if ((g.includes('fork') || group.includes('分支')) && (repo.isFork || topics.includes('fork'))) { matched.push(group); continue; }
    if ((g.includes('浏览器') || g.includes('browser') || g.includes('chrome') || g.includes('edge')) && (topics.some(t => t.includes('extension') || t.includes('browser') || t.includes('newtab')) || name.includes('tab-project'))) { matched.push(group); continue; }
    if ((g.includes('pi') || group.includes('PI')) && (topics.some(t => t.includes('pi') || t.includes('grounding-pi')) || name.includes('pi-') || name.includes('-pi'))) { matched.push(group); continue; }
    if (g.includes('herdr') && (topics.some(t => t.includes('herdr')) || name.includes('herdr'))) { matched.push(group); continue; }
    if ((g.includes('嵌入式') || g.includes('embedded') || g.includes('单片机')) && (topics.some(t => t.includes('embedded') || t.includes('zephyr') || t.includes('stm32') || t.includes('k230')) || name.includes('k230') || name.includes('mspm0') || name.includes('pid-') || name.includes('zephyr'))) { matched.push(group); continue; }
    if ((g.includes('美化') || g.includes('theme') || g.includes('style')) && (topics.some(t => t.includes('theme') || t.includes('beauty') || t.includes('ui')) || name.includes('theme') || name.includes('style'))) { matched.push(group); }
  }
  return matched;
}
