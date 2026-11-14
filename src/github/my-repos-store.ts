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
import { inferGroupsForRepo } from "./repo-group-inference";
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
  private inFlightPromise: Promise<void> | null = null;

  public static getInstance(): MyReposController {
    if (!MyReposController.instance) {
      MyReposController.instance = new MyReposController();
    }
    return MyReposController.instance;
  }

  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  public async load(forceRemote = false): Promise<void> {
    if (!forceRemote && this.inFlightPromise) {
      return this.inFlightPromise;
    }

    if (forceRemote) {
      this.abortController?.abort();
      this.inFlightPromise = null;
    }

    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    const task = (async () => {
      // 1. 读取本地分组与本地仓库映射
      await this.loadPersistedGroups();

      // 2. 尝试读取离线缓存
      const cached = await storageCache.get<MyRepoItem[]>(CACHE_KEY);
      if (cached && cached.length) {
        this.hydrateRepos(cached);
      } else if (myReposState.repos.length) {
        this.hydrateRepos(myReposState.repos);
      }

      // 如果还没有仓库数据，或者用户明确点击刷新，则立刻请求远端
      const shouldFetch = forceRemote || !myReposState.repos.length;
      if (shouldFetch) {
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
      } else {
        // SWR 后台静默刷新，不打扰当前界面
        void this.fetchRemote(signal).catch(() => {});
      }
    })();

    this.inFlightPromise = task.finally(() => {
      if (this.inFlightPromise === task) {
        this.inFlightPromise = null;
      }
    });

    return this.inFlightPromise;
  }

  private async fetchRemote(signal: AbortSignal): Promise<void> {
    const { ghUser, ghToken } = await loadGitHubAccountSettings();
    if (!ghUser && !ghToken) {
      myReposState.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }

    const headers = createGitHubReadHeaders(ghToken);
    const combinedRawList: any[] = [];
    const seenIds = new Set<number>();

    // 1. 核心基准源：若配置了用户名，以 users/:ghUser/repos 为最高确定性基准（无论是公开还是私有，绝不丢弃）
    if (ghUser) {
      try {
        const userReposUrl = `https://api.github.com/users/${encodeURIComponent(ghUser)}/repos?type=owner&sort=updated&per_page=100`;
        const resp = await fetch(userReposUrl, { method: "GET", headers, signal });
        if (resp.ok) {
          const list = await resp.json();
          if (Array.isArray(list)) {
            for (const item of list) {
              if (item && item.id && !seenIds.has(item.id)) {
                seenIds.add(item.id);
                combinedRawList.push(item);
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") throw err;
      }
    }

    // 2. 互补源：若配置了 Token，尝试请求 /user/repos 以拉取包括私有仓库在内的全量归属仓库
    if (ghToken) {
      try {
        const authReposUrl = "https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100";
        const resp = await fetch(authReposUrl, { method: "GET", headers, signal });
        if (resp.ok) {
          const list = await resp.json();
          if (Array.isArray(list)) {
            for (const item of list) {
              if (item && item.id && !seenIds.has(item.id)) {
                seenIds.add(item.id);
                combinedRawList.push(item);
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") throw err;
      }
    }

    // 3. 安全防腐：若远端接口未能获取到任何仓库（例如瞬时断网），但本地已有数据，则不抹白已有仓库
    if (!combinedRawList.length) {
      if (!myReposState.repos.length) {
        myReposState.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。";
      }
      return;
    }

    const parsed: MyRepoItem[] = combinedRawList.map((item: any) => {
      const fullName = item.full_name || `${item.owner?.login || ghUser}/${item.name}`;
      const repoName = item.name;
      // 容错匹配：支持完整 "owner/repo" 或仅仓库名 "repo"
      const localGroups = myReposState.repoGroupsMap[fullName] ||
                          myReposState.repoGroupsMap[repoName] ||
                          myReposState.repoGroupsMap[fullName.toLowerCase()] ||
                          myReposState.repoGroupsMap[repoName.toLowerCase()] || [];
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
    let mappingChanged = false;
    myReposState.repos = rawRepos.map(repo => {
      // 优先级 1: 历史已存在的分组映射 (fullName, repoName, 小写全名, 小写仓库名)
      const mapped = myReposState.repoGroupsMap[repo.fullName] ||
                     myReposState.repoGroupsMap[repo.name] ||
                     myReposState.repoGroupsMap[repo.fullName.toLowerCase()] ||
                     myReposState.repoGroupsMap[repo.name.toLowerCase()];

      // 优先级 2: 仓库自带显式 localGroups（若非空）
      const existingLocal = repo.localGroups && repo.localGroups.length ? repo.localGroups : null;

      // 优先级 3: 智能规则对齐（若尚未分类，根据 topics/name/isFork 自动对齐到已有分组中）
      const inferred = inferGroupsForRepo(repo, myReposState.customGroups);

      const assigned = (mapped && mapped.length ? mapped : null) || existingLocal || inferred;

      const validGroups = assigned ? [...new Set(assigned.filter(Boolean))] : [];

      // 同步回写映射
      if (validGroups.length && (!myReposState.repoGroupsMap[repo.fullName] || !myReposState.repoGroupsMap[repo.fullName].length)) {
        myReposState.repoGroupsMap[repo.fullName] = validGroups;
        mappingChanged = true;
      }

      return {
        ...repo,
        localGroups: validGroups
      };
    });

    if (mappingChanged) {
      void this.persistGroupsMap();
    }
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
    await storageCache.set(CACHE_KEY, myReposState.repos, { ttlMs: 30 * 86400 * 1000 });
  }

  /**
   * 将仓库从指定本地分组中移出
   */
  public async removeRepoFromGroup(repo: MyRepoItem, group: string): Promise<void> {
    repo.localGroups = repo.localGroups.filter(g => g !== group);
    myReposState.repoGroupsMap[repo.fullName] = [...repo.localGroups];
    await this.persistGroupsMap();
    await storageCache.set(CACHE_KEY, myReposState.repos, { ttlMs: 30 * 86400 * 1000 });
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
    await storageCache.set(CACHE_KEY, myReposState.repos, { ttlMs: 30 * 86400 * 1000 });
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
      let groups: any = null;
      let mapping: any = null;

      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        const stored = await chrome.storage.local.get([GROUPS_KEY, REPO_GROUPS_MAPPING_KEY]);
        groups = stored?.[GROUPS_KEY];
        mapping = stored?.[REPO_GROUPS_MAPPING_KEY];
      }

      if (!groups || !Array.isArray(groups)) {
        const rawGroups = localStorage.getItem(GROUPS_KEY);
        if (rawGroups) groups = JSON.parse(rawGroups);
      }

      if (!mapping || typeof mapping !== "object") {
        const rawMap = localStorage.getItem(REPO_GROUPS_MAPPING_KEY);
        if (rawMap) mapping = JSON.parse(rawMap);
      }

      if (Array.isArray(groups)) {
        myReposState.customGroups = groups.map(sanitizeGroupName).filter(Boolean);
      }
      if (mapping && typeof mapping === "object") {
        myReposState.repoGroupsMap = mapping;
      }
    } catch {}
  }

  private async persistGroupsMap(): Promise<void> {
    try {
      const data = { ...myReposState.repoGroupsMap };
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [REPO_GROUPS_MAPPING_KEY]: data });
      }
      localStorage.setItem(REPO_GROUPS_MAPPING_KEY, JSON.stringify(data));
    } catch {}
  }

  private async persistGroups(): Promise<void> {
    const list = Array.from(new Set(myReposState.customGroups.map(sanitizeGroupName).filter(Boolean)));
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [GROUPS_KEY]: list });
      }
      localStorage.setItem(GROUPS_KEY, JSON.stringify(list));
    } catch {}
  }
}

export const myReposController = MyReposController.getInstance();
