/**
 * My Repositories & Local Custom Groups Store
 * 纯 TypeScript 领域模型与响应式状态
 * 支持：
 * - 个人仓库读取与 SWR 本地存储缓存
 * - 纯本地自定义分组（中文/英文自由命名，如“前端工具”、“自建脚本”、“待重构”等）
 * - 拖拽自由归类，完全不改动 GitHub 远端 Topics（保留线上引流效果）
 * - 多分组、重命名、删除分组、卡片批量整理
 */

import { reactive } from "vue";
import { loadGitHubAccountSettings } from "./account-settings";
import { createGitHubReadHeaders } from "./api-client";
import { storageCache } from "../services/storage-cache.service";

declare const chrome: any;

const CACHE_KEY = "gh_my_repos_cache_v1";
// 本地分组列表存储 Key (如 ["前端工具", "AI与模型", "日常维护"])
const GROUPS_KEY = "gh_my_repo_groups_v2";
// 仓库 -> 分组映射存储 Key (记录每个仓库 fullName 所归属的本地分组，支持一个仓库属于一个或多个分组)
const REPO_GROUPS_MAPPING_KEY = "gh_my_repo_groups_map_v2";

export interface MyRepoItem {
  id: number;
  name: string;
  fullName: string;
  description: string;
  isPrivate: boolean;
  isFork: boolean;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  topics: string[];
  localGroups: string[]; // 纯本地自定义分组
  updatedAt: string;
  pushedAt: string;
  defaultBranch: string;
}

interface MyReposState {
  loading: boolean;
  errorMessage: string;
  repos: MyRepoItem[];
  customGroups: string[]; // 用户创建的自定义分组列表
  // 仓库 -> 分组映射: Record<fullName, string[]>
  repoGroupsMap: Record<string, string[]>;
  searchQuery: string;
  editingColumnGroup: string | null;
  composerActiveColumnId: string | null;
}

export const myReposState = reactive<MyReposState>({
  loading: false,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});

/**
 * 校验并清理自定义分组名称（支持中文、英文、符号等，长度 1~50）
 */
export function sanitizeGroupName(input: string): string {
  return input.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}

export class MyReposController {
  private static instance: MyReposController;
  private abortController: AbortController | null = null;

  public static getInstance(): MyReposController {
    if (!MyReposController.instance) {
      MyReposController.instance = new MyReposController();
    }
    return MyReposController.instance;
  }

  /**
   * 初始化并加载数据（SWR 策略）
   */
  public async load(forceRemote = false): Promise<void> {
    this.abortController?.abort();
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    // 1. 读取本地分组与本地仓库映射
    await this.loadPersistedGroups();
    const cached = await storageCache.get<MyRepoItem[]>(CACHE_KEY);
    if (cached && cached.length) {
      this.hydrateRepos(cached);
    }

    if (!forceRemote && cached && cached.length) {
      void this.fetchRemote(signal).catch(() => {});
      return;
    }

    myReposState.loading = true;
    myReposState.errorMessage = "";
    try {
      await this.fetchRemote(signal);
    } catch (err: any) {
      if (err.name === "AbortError") return;
      myReposState.errorMessage = err.message || "获取个人仓库失败";
    } finally {
      myReposState.loading = false;
    }
  }

  private async fetchRemote(signal: AbortSignal): Promise<void> {
    const { ghUser, ghToken } = await loadGitHubAccountSettings();
    if (!ghUser && !ghToken) {
      myReposState.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }

    let url = "https://api.github.com/user/repos?type=owner&sort=updated&per_page=100";
    if (!ghToken) {
      url = `https://api.github.com/users/${encodeURIComponent(ghUser)}/repos?type=owner&sort=updated&per_page=100`;
    }

    const headers = createGitHubReadHeaders(ghToken);
    const response = await fetch(url, {
      method: "GET",
      headers,
      signal
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error("GitHub Token 无效或已过期，请在设置中更新。");
      if (response.status === 403) throw new Error("GitHub API 频率受限或无权访问，请检查 Token 权限。");
      throw new Error(`GitHub 请求失败 (HTTP ${response.status})`);
    }

    const rawList = await response.json();
    if (!Array.isArray(rawList)) {
      throw new Error("GitHub 返回数据格式异常");
    }

    const parsed: MyRepoItem[] = rawList.map((item: any) => {
      const fullName = item.full_name || `${item.owner?.login || ghUser}/${item.name}`;
      const localGroups = myReposState.repoGroupsMap[fullName] || [];
      return {
        id: item.id,
        name: item.name,
        fullName,
        description: item.description || "",
        isPrivate: Boolean(item.private),
        isFork: Boolean(item.fork),
        htmlUrl: item.html_url || `https://github.com/${ghUser}/${item.name}`,
        language: item.language || null,
        stargazersCount: Number(item.stargazers_count) || 0,
        forksCount: Number(item.forks_count) || 0,
        openIssuesCount: Number(item.open_issues_count) || 0,
        topics: Array.isArray(item.topics) ? item.topics.map((t: any) => String(t).toLowerCase()) : [],
        localGroups,
        updatedAt: item.updated_at || "",
        pushedAt: item.pushed_at || "",
        defaultBranch: item.default_branch || "main"
      };
    });

    this.hydrateRepos(parsed);
    await storageCache.set(CACHE_KEY, parsed, { ttlMs: 30 * 86400 * 1000 });
  }

  private hydrateRepos(rawRepos: MyRepoItem[]): void {
    myReposState.repos = rawRepos.map(repo => {
      const assigned = myReposState.repoGroupsMap[repo.fullName] || repo.localGroups || [];
      return {
        ...repo,
        localGroups: [...new Set(assigned.filter(Boolean))]
      };
    });
  }

  /**
   * 将仓库添加到本地自定义分组
   */
  public async addRepoToGroup(repo: MyRepoItem, group: string): Promise<void> {
    const safe = sanitizeGroupName(group);
    if (!safe) return;
    if (!repo.localGroups.includes(safe)) {
      repo.localGroups.push(safe);
    }
    myReposState.repoGroupsMap[repo.fullName] = [...repo.localGroups];
    await this.persistGroupsMap();
  }

  /**
   * 将仓库从指定本地分组中移出
   */
  public async removeRepoFromGroup(repo: MyRepoItem, group: string): Promise<void> {
    repo.localGroups = repo.localGroups.filter(g => g !== group);
    myReposState.repoGroupsMap[repo.fullName] = [...repo.localGroups];
    await this.persistGroupsMap();
  }

  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  public async moveRepoToGroup(repo: MyRepoItem, targetGroup: string | null): Promise<void> {
    if (!targetGroup) {
      // 设为未分类
      repo.localGroups = [];
    } else {
      const safe = sanitizeGroupName(targetGroup);
      if (!safe) return;
      repo.localGroups = [safe];
    }
    myReposState.repoGroupsMap[repo.fullName] = [...repo.localGroups];
    await this.persistGroupsMap();
  }

  /**
   * 新建一个本地分组板块
   */
  public async createGroup(rawName: string): Promise<string | null> {
    const safe = sanitizeGroupName(rawName);
    if (!safe) {
      alert("分组名称不能为空。");
      return null;
    }
    if (myReposState.customGroups.includes(safe)) {
      alert(`分组「${safe}」已存在。`);
      return null;
    }

    myReposState.customGroups.push(safe);
    await this.persistGroups();
    return safe;
  }

  /**
   * 重命名本地分组
   */
  public async renameGroup(oldName: string, rawNewName: string): Promise<boolean> {
    const newName = sanitizeGroupName(rawNewName);
    if (!newName) {
      alert("新分组名称不能为空。");
      return false;
    }
    if (oldName === newName) return true;
    if (myReposState.customGroups.includes(newName)) {
      alert(`已存在名为「${newName}」的分组。`);
      return false;
    }

    // 更新列表
    myReposState.customGroups = myReposState.customGroups.map(g => (g === oldName ? newName : g));

    // 更新所有归属该分组的仓库
    myReposState.repos.forEach(repo => {
      if (repo.localGroups.includes(oldName)) {
        repo.localGroups = repo.localGroups.map(g => (g === oldName ? newName : g));
        myReposState.repoGroupsMap[repo.fullName] = [...repo.localGroups];
      }
    });

    await this.persistGroups();
    await this.persistGroupsMap();
    return true;
  }

  /**
   * 删除本地分组
   */
  public async deleteGroup(group: string): Promise<boolean> {
    const count = myReposState.repos.filter(r => r.localGroups.includes(group)).length;
    const msg = count > 0
      ? `确定删除分组「${group}」吗？\n该分组下的 ${count} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。`
      : `确定删除空分组「${group}」吗？`;

    if (!confirm(msg)) return false;

    myReposState.customGroups = myReposState.customGroups.filter(g => g !== group);
    myReposState.repos.forEach(repo => {
      if (repo.localGroups.includes(group)) {
        repo.localGroups = repo.localGroups.filter(g => g !== group);
        myReposState.repoGroupsMap[repo.fullName] = [...repo.localGroups];
      }
    });

    await this.persistGroups();
    await this.persistGroupsMap();
    return true;
  }

  private async loadPersistedGroups(): Promise<void> {
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        const stored = await chrome.storage.local.get([GROUPS_KEY, REPO_GROUPS_MAPPING_KEY]);
        const groups = stored?.[GROUPS_KEY];
        if (Array.isArray(groups)) {
          myReposState.customGroups = groups.map(sanitizeGroupName).filter(Boolean);
        }
        const mapping = stored?.[REPO_GROUPS_MAPPING_KEY];
        if (mapping && typeof mapping === "object") {
          myReposState.repoGroupsMap = mapping;
        }
      } else {
        const rawGroups = localStorage.getItem(GROUPS_KEY);
        if (rawGroups) {
          myReposState.customGroups = JSON.parse(rawGroups);
        }
        const rawMap = localStorage.getItem(REPO_GROUPS_MAPPING_KEY);
        if (rawMap) {
          myReposState.repoGroupsMap = JSON.parse(rawMap);
        }
      }
    } catch {}
  }

  private async persistGroups(): Promise<void> {
    const list = Array.from(new Set(myReposState.customGroups.map(sanitizeGroupName).filter(Boolean)));
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [GROUPS_KEY]: list });
      } else {
        localStorage.setItem(GROUPS_KEY, JSON.stringify(list));
      }
    } catch {}
  }

  private async persistGroupsMap(): Promise<void> {
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [REPO_GROUPS_MAPPING_KEY]: myReposState.repoGroupsMap });
      } else {
        localStorage.setItem(REPO_GROUPS_MAPPING_KEY, JSON.stringify(myReposState.repoGroupsMap));
      }
    } catch {}
  }
}

export const myReposController = MyReposController.getInstance();
