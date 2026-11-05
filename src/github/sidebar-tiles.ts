import type { GitHubRawRepo } from "../services/github.service";
import type { GitHubUserList } from "./lists-client";
import type { LauncherLink } from "../launchers/store";

export type GitHubSidebarTile =
  | { key: string; kind: "folder"; title: string; list: GitHubUserList; repos: GitHubRawRepo[] }
  | { key: string; kind: "repo"; title: string; repo: GitHubRawRepo };

export function repositoryShortcut(repo: GitHubRawRepo): LauncherLink {
  return { id: repo.full_name, title: repo.name, url: repo.html_url || `https://github.com/${repo.full_name}`,
    customIcon: repo.owner?.avatar_url || "assets/github-star.svg" };
}

export function buildSidebarTiles(
  repos: readonly GitHubRawRepo[],
  lists: readonly GitHubUserList[],
  memberships: ReadonlyMap<string, string[]>,
  order: readonly string[],
  activeSection?: string
): GitHubSidebarTile[] {
  const currentSec = activeSection || "默认";
  const filteredLists = lists.filter(list => (list.section || "默认") === currentSec);
  const tiles: GitHubSidebarTile[] = filteredLists.map(list => ({
    key: `list:${list.id}`, kind: "folder", title: list.name, list,
    repos: repos.filter(repo => memberships.get(repo.full_name.toLowerCase())?.includes(list.name))
  }));
  for (const repo of repos) {
    if (!memberships.get(repo.full_name.toLowerCase())?.length) {
      tiles.push({ key: `repo:${repo.full_name.toLowerCase()}`, kind: "repo", title: repo.name, repo });
    }
  }
  const rank = new Map(order.map((key, index) => [key, index]));
  return tiles.sort((a, b) => (rank.get(a.key) ?? order.length) - (rank.get(b.key) ?? order.length));
}

/** Reordering is local presentation only, never a membership change. */
export function reorderSidebarTiles(keys: readonly string[], source: string, target: string): string[] {
  const from = keys.indexOf(source), to = keys.indexOf(target);
  if (from < 0 || to < 0 || from === to) return [...keys];
  const next = [...keys]; next.splice(from, 1); next.splice(to, 0, source);
  return next;
}

export function validateSidebarOrder(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((key): key is string => typeof key === "string" && key.length <= 300 && /^(list|repo):.+/.test(key)))].slice(0, 2000);
}
