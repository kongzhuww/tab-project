import { createGitHubReadHeaders, readGitHubJson } from '../github/api-client';
import { loadGitHubAccountSettings } from '../github/account-settings';
import type { MyRepoItem } from '../github/my-repos-store';
import { inferGroupsForRepo } from '../github/repo-group-inference';

declare const chrome: any;
export interface OwnRepositorySnapshot { repos: MyRepoItem[]; customGroups: string[]; repoGroupsMap: Record<string, string[]>; warning: string }
const GROUP_KEY = 'gh_my_repo_groups_v2', MAP_KEY = 'gh_my_repo_groups_map_v2';

/** Read-only snapshot: never seed, infer, or persist the GitHub plugin's groups. */
export async function loadOwnRepositorySnapshot(signal: AbortSignal): Promise<OwnRepositorySnapshot> {
  const { ghUser, ghToken } = await loadGitHubAccountSettings();
  signal.throwIfAborted();
  if (!ghUser && !ghToken) throw new Error('请先在 GitHub 插件设置用户名或 Token。');
  if (ghUser && !/^[a-z0-9-]{1,39}$/i.test(ghUser)) throw new Error('GitHub 用户名格式无效，请检查设置。');
  let groups: unknown, mapping: unknown;
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    const data = await chrome.storage.local.get([GROUP_KEY, MAP_KEY]);
    groups = data[GROUP_KEY]; mapping = data[MAP_KEY];
  }
  if (typeof localStorage !== 'undefined') {
    if (groups == null) { const raw = localStorage.getItem(GROUP_KEY); if (raw) groups = JSON.parse(raw); }
    if (mapping == null) { const raw = localStorage.getItem(MAP_KEY); if (raw) mapping = JSON.parse(raw); }
  }
  if (groups != null && !Array.isArray(groups)) throw new Error('本地仓库分组格式异常，未修改任何数据。');
  if (mapping != null && (typeof mapping !== 'object' || Array.isArray(mapping))) throw new Error('本地仓库分类格式异常，未修改任何数据。');
  const customGroups = Array.isArray(groups) ? groups.filter((value): value is string => typeof value === 'string') : [];
  const repoGroupsMap: Record<string, string[]> = Object.create(null);
  for (const [key, value] of Object.entries(mapping || {})) if (Array.isArray(value) && value.every(item => typeof item === 'string')) repoGroupsMap[key] = value;
  const headers = createGitHubReadHeaders(ghToken);
  const sources = [ghUser ? `/users/${encodeURIComponent(ghUser)}/repos?type=owner&sort=updated&per_page=100` : '', ghToken ? '/user/repos?affiliation=owner&sort=updated&per_page=100' : ''].filter(Boolean);
  const results = await Promise.allSettled(sources.map(async (source) => {
    const items: any[] = []; let partial = false;
    for (let page = 1; page <= 10; page++) {
      const result = await readGitHubJson<unknown>(`${source}&page=${page}`, { headers, maxBytes:4*1024*1024, timeoutMs:15000, signal });
      if (!Array.isArray(result.data)) throw new Error('GitHub 返回的仓库列表格式异常。');
      items.push(...result.data);
      if (!/rel="next"/.test(result.link)) break;
      if (page === 10) partial = true;
    }
    return { items, partial };
  }));
  signal.throwIfAborted();
  const successes = results.filter((result): result is PromiseFulfilledResult<{ items: any[]; partial: boolean }> => result.status === 'fulfilled');
  if (!successes.length) throw new Error((results.find(result => result.status === 'rejected') as PromiseRejectedResult | undefined)?.reason?.message || 'GitHub 仓库读取失败。');
  const rawItems = successes.flatMap(result => result.value.items);
  const seen = new Set<string>();
  const repos: MyRepoItem[] = [];
  for (const item of rawItems) {
    if (!item || !/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(item.full_name || '') || !Number.isSafeInteger(item.id) || typeof item.private !== 'boolean' || seen.has(item.full_name.toLowerCase())) continue;
    seen.add(item.full_name.toLowerCase());
    repos.push({ id:item.id, name:String(item.name || item.full_name.split('/')[1]), fullName:item.full_name, description:typeof item.description === 'string' ? item.description : '', isPrivate:item.private === true, isFork:item.fork === true, htmlUrl:`https://github.com/${item.full_name}`, language:typeof item.language === 'string' ? item.language : null, stargazersCount:Number(item.stargazers_count) || 0, forksCount:Number(item.forks_count) || 0, openIssuesCount:Number(item.open_issues_count) || 0, topics:Array.isArray(item.topics) ? item.topics.filter((x: unknown) => typeof x === 'string') : [], localGroups:[], updatedAt:String(item.updated_at || ''), pushedAt:String(item.pushed_at || ''), defaultBranch:String(item.default_branch || '') });
  }
  // Match the main GitHub board's inferred categories, but keep them in this
  // snapshot only: opening the assistant must not rewrite the user's groups.
  for (const repo of repos) {
    const mapped = repoGroupsMap[repo.fullName] || repoGroupsMap[repo.name] || repoGroupsMap[repo.fullName.toLowerCase()] || repoGroupsMap[repo.name.toLowerCase()];
    const assigned = mapped?.length ? mapped : inferGroupsForRepo(repo, customGroups);
    if (assigned.length) repoGroupsMap[repo.fullName] = [...assigned];
  }
  const latestAccount = await loadGitHubAccountSettings();
  signal.throwIfAborted();
  if (latestAccount.ghUser !== ghUser || latestAccount.ghToken !== ghToken) throw new Error('GitHub 账号已切换，请重新加载仓库。');
  const warning = results.some(result => result.status === 'rejected') ? '部分仓库来源读取失败，当前仅显示成功读取的内容。' : successes.some(result => result.value.partial) ? '仓库数量较多，当前每个来源最多显示前 1000 条。' : '';
  return { repos, customGroups, repoGroupsMap, warning };
}
