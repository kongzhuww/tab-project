/**
 * My Repositories & Topic Board Store
 * 纯 TypeScript 领域模型与响应式状态
 * 支持：
 * - 个人仓库读取与 SWR 本地存储缓存
 * - Todoist 风格看板：左侧默认板块（未分类/全量），右侧各 Topic 聚合板块
 * - GitHub REST API Topic 同步写入 (PUT /repos/{owner}/{repo}/topics)
 * - Topic 板块重命名（自动批量替换远端仓库对应的 topic 并同步）
 */

import { reactive, computed } from "vue";
import { loadGitHubAccountSettings } from "./account-settings";
import { createGitHubReadHeaders, GitHubReadError } from "./api-client";
import { storageCache } from "../services/storage-cache.service";

declare const chrome: any;

const CACHE_KEY = "gh_my_repos_cache_v1";
const CUSTOM_TOPICS_KEY = "gh_my_repo_custom_topics_v1";

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
  updatedAt: string;
  pushedAt: string;
  defaultBranch: string;
}

export interface MyRepoBoardColumn {
  id: string; // "default" or topic name
  title: string;
  isDefault: boolean;
  topicName: string;
}

interface MyReposState {
  loading: boolean;
  syncingTopic: boolean;
  errorMessage: string;
  repos: MyRepoItem[];
  customTopicNames: string[];
  searchQuery: string;
  editingColumnTopic: string | null;
  composerActiveColumnId: string | null;
}

export const myReposState = reactive<MyReposState>({
  loading: false,
  syncingTopic: false,
  errorMessage: "",
  repos: [],
  customTopicNames: [],
  searchQuery: "",
  editingColumnTopic: null,
  composerActiveColumnId: null
});

/**
 * 校验并清理 GitHub Topic 字符串
 * GitHub 规则：1~35 字符，仅限小写字母、数字和连字符 '-'
 */
export function sanitizeGitHubTopic(input: string): string {
  let s = input.trim().toLowerCase();
  // 替换空格与下划线为连字符
  s = s.replace(/[\s_]+/g, "-");
  // 移除非英文字母、数字和连字符
  s = s.replace(/[^a-z0-9-]/g, "");
  // 移除开头和结尾的连字符，压缩连续连字符
  s = s.replace(/^-+|-+$/g, "").replace(/-+/g, "-");
  if (s.length > 35) s = s.slice(0, 35).replace(/-+$/, "");
  return s;
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

    // 1. 读取自定义 Topic 列表与本地离线缓存
    await this.loadPersistedCustomTopics();
    const cached = await storageCache.get<MyRepoItem[]>(CACHE_KEY);
    if (cached && cached.length) {
      myReposState.repos = cached;
    }

    if (!forceRemote && cached && cached.length) {
      // SWR 后台静默刷新
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
      // 匿名回退到公开仓库列表
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

    const parsed: MyRepoItem[] = rawList.map((item: any) => ({
      id: item.id,
      name: item.name,
      fullName: item.full_name || `${item.owner?.login || ghUser}/${item.name}`,
      description: item.description || "",
      isPrivate: Boolean(item.private),
      isFork: Boolean(item.fork),
      htmlUrl: item.html_url || `https://github.com/${ghUser}/${item.name}`,
      language: item.language || null,
      stargazersCount: Number(item.stargazers_count) || 0,
      forksCount: Number(item.forks_count) || 0,
      openIssuesCount: Number(item.open_issues_count) || 0,
      topics: Array.isArray(item.topics) ? item.topics.map((t: any) => String(t).toLowerCase()) : [],
      updatedAt: item.updated_at || "",
      pushedAt: item.pushed_at || "",
      defaultBranch: item.default_branch || "main"
    }));

    myReposState.repos = parsed;
    // 写入离线缓存（30天保留）
    await storageCache.set(CACHE_KEY, parsed, { ttlMs: 30 * 86400 * 1000 });
  }

  /**
   * 提交单个仓库的 Topics 到 GitHub 远端
   */
  public async syncRepoTopics(repo: MyRepoItem, newTopics: string[]): Promise<boolean> {
    const { ghToken } = await loadGitHubAccountSettings();
    if (!ghToken) {
      alert("向 GitHub 更新 Topic 需要在 GitHub 设置中配置具备 repo 写入权限的 Token。");
      return false;
    }

    // 格式化并去重
    const cleanedTopics = Array.from(new Set(newTopics.map(sanitizeGitHubTopic).filter(Boolean))).slice(0, 20);
    const [owner, repoName] = repo.fullName.split("/");
    const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}/topics`;

    myReposState.syncingTopic = true;
    try {
      const headers = createGitHubReadHeaders(ghToken);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ names: cleanedTopics })
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Token 权限不足。修改 Topics 需要包含 repo（或 Administration:write）作用域。");
        }
        if (response.status === 404) {
          throw new Error("仓库未找到或无权修改。");
        }
        throw new Error(`GitHub 远端保存失败 (HTTP ${response.status})`);
      }

      const result = await response.json();
      const updatedNames = Array.isArray(result.names) ? result.names : cleanedTopics;

      // 实时更新本地内存
      repo.topics = updatedNames;
      // 写入持久化存储
      await storageCache.set(CACHE_KEY, myReposState.repos, { ttlMs: 30 * 86400 * 1000 });
      return true;
    } catch (err: any) {
      alert(`更新 GitHub Topics 失败：${err.message || err}`);
      return false;
    } finally {
      myReposState.syncingTopic = false;
    }
  }

  /**
   * 将仓库添加到指定 Topic（若远端不存在则新增并提交）
   */
  public async addRepoToTopic(repo: MyRepoItem, topic: string): Promise<boolean> {
    const safeTopic = sanitizeGitHubTopic(topic);
    if (!safeTopic) return false;
    if (repo.topics.includes(safeTopic)) return true;
    const nextTopics = [...repo.topics, safeTopic];
    return this.syncRepoTopics(repo, nextTopics);
  }

  /**
   * 将仓库从指定 Topic 移除
   */
  public async removeRepoFromTopic(repo: MyRepoItem, topic: string): Promise<boolean> {
    const safeTopic = sanitizeGitHubTopic(topic);
    if (!repo.topics.includes(safeTopic)) return true;
    const nextTopics = repo.topics.filter(t => t !== safeTopic);
    return this.syncRepoTopics(repo, nextTopics);
  }

  /**
   * 新建一个 Topic 列（本地与远端集合）
   */
  public async createTopicColumn(rawName: string): Promise<string | null> {
    const safeName = sanitizeGitHubTopic(rawName);
    if (!safeName) {
      alert("Topic 名称无效。GitHub 规范：仅限 1~35 位小写英文字母、数字和连字符 '-'。");
      return null;
    }
    if (myReposState.customTopicNames.includes(safeName)) {
      alert(`Topic「${safeName}」板块已存在。`);
      return null;
    }

    myReposState.customTopicNames.push(safeName);
    await this.persistCustomTopics();
    return safeName;
  }

  /**
   * 重命名 Topic 列：同步将该板块下所有仓库的旧 Topic 替换为新 Topic 并提交到 GitHub
   */
  public async renameTopicColumn(oldTopic: string, rawNewTopic: string): Promise<boolean> {
    const newTopic = sanitizeGitHubTopic(rawNewTopic);
    if (!newTopic) {
      alert("新 Topic 名称无效。仅限小写英文、数字与中划线。");
      return false;
    }
    if (oldTopic === newTopic) return true;

    // 找到所有携带旧 topic 的仓库
    const affectedRepos = myReposState.repos.filter(r => r.topics.includes(oldTopic));

    if (affectedRepos.length > 0) {
      const confirmed = confirm(
        `确定将板块「${oldTopic}」重命名为「${newTopic}」吗？\n这将调用 GitHub API 同步更新该板块下的 ${affectedRepos.length} 个仓库的远端 Topic。`
      );
      if (!confirmed) return false;

      myReposState.syncingTopic = true;
      let successCount = 0;
      let failCount = 0;

      for (const repo of affectedRepos) {
        const nextTopics = repo.topics.map(t => (t === oldTopic ? newTopic : t));
        const ok = await this.syncRepoTopics(repo, nextTopics);
        if (ok) successCount++;
        else failCount++;
      }

      myReposState.syncingTopic = false;
      if (failCount > 0) {
        alert(`重命名完成，成功更新 ${successCount} 个仓库，失败 ${failCount} 个。`);
      }
    }

    // 更新自定义列表
    myReposState.customTopicNames = myReposState.customTopicNames.map(t => (t === oldTopic ? newTopic : t));
    await this.persistCustomTopics();
    return true;
  }

  /**
   * 删除 Topic 板块：从该板块下所有仓库中移除该 topic
   */
  public async deleteTopicColumn(topic: string): Promise<boolean> {
    const affectedRepos = myReposState.repos.filter(r => r.topics.includes(topic));
    const msg = affectedRepos.length > 0
      ? `确定删除板块「${topic}」吗？\n将从该板块下的 ${affectedRepos.length} 个仓库中移除此 Topic 并在 GitHub 远端同步。`
      : `确定删除空板块「${topic}」吗？`;

    if (!confirm(msg)) return false;

    if (affectedRepos.length > 0) {
      myReposState.syncingTopic = true;
      for (const repo of affectedRepos) {
        await this.removeRepoFromTopic(repo, topic);
      }
      myReposState.syncingTopic = false;
    }

    myReposState.customTopicNames = myReposState.customTopicNames.filter(t => t !== topic);
    await this.persistCustomTopics();
    return true;
  }

  private async loadPersistedCustomTopics(): Promise<void> {
    try {
      const stored = typeof chrome !== "undefined" && chrome.storage?.local
        ? await chrome.storage.local.get([CUSTOM_TOPICS_KEY])
        : { [CUSTOM_TOPICS_KEY]: JSON.parse(localStorage.getItem(CUSTOM_TOPICS_KEY) || "[]") };
      const list = stored?.[CUSTOM_TOPICS_KEY];
      if (Array.isArray(list)) {
        myReposState.customTopicNames = list.map(sanitizeGitHubTopic).filter(Boolean);
      }
    } catch {}
  }

  private async persistCustomTopics(): Promise<void> {
    const list = Array.from(new Set(myReposState.customTopicNames.map(sanitizeGitHubTopic).filter(Boolean)));
    try {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [CUSTOM_TOPICS_KEY]: list });
      } else {
        localStorage.setItem(CUSTOM_TOPICS_KEY, JSON.stringify(list));
      }
    } catch {}
  }
}

export const myReposController = MyReposController.getInstance();
