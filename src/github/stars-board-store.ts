/**
 * Star Repositories Kanban Board Store
 * Star 收藏多列看板响应式数据模型
 * - 顶部未分类 Star 仓库（单排 10 个一页，支持滑至末尾快捷卡片与顶栏翻页器）
 * - 下方各 GitHub 原生 Lists 横向多列看板
 * - 拖拽就地归类，实时与 GitHub 官方 Lists GraphQL 同步
 */

import { reactive, computed } from "vue";
import { gitHubService, type GitHubRawRepo } from "../services/github.service";

interface StarBoardState {
  uncatPage: number;
  pageSize: number; // 默认 10 个一页
  searchQuery: string;
}

export const starBoardState = reactive<StarBoardState>({
  uncatPage: 1,
  pageSize: 10,
  searchQuery: ""
});

export class StarBoardController {
  private static instance: StarBoardController;

  public static getInstance(): StarBoardController {
    if (!StarBoardController.instance) {
      StarBoardController.instance = new StarBoardController();
    }
    return StarBoardController.instance;
  }

  public nextUncatPage(): void {
    if (this.uncatPage < this.uncatTotalPages) {
      starBoardState.uncatPage++;
    }
  }

  public prevUncatPage(): void {
    if (starBoardState.uncatPage > 1) {
      starBoardState.uncatPage--;
    }
  }

  public setUncatPage(page: number): void {
    const clamped = Math.max(1, Math.min(page, this.uncatTotalPages));
    starBoardState.uncatPage = clamped;
  }

  public get uncatPage(): number {
    return starBoardState.uncatPage;
  }

  public get uncatTotalPages(): number {
    const total = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(total / starBoardState.pageSize));
  }

  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  public get filteredUncatRepos(): GitHubRawRepo[] {
    const q = starBoardState.searchQuery.trim().toLowerCase();
    const list = gitHubService.repos.filter(r => gitHubService.getRepoFolders(r.full_name).length === 0);
    if (!q) return list;
    return list.filter(r =>
      r.full_name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q)) ||
      (r.topics && r.topics.some(t => t.toLowerCase().includes(q)))
    );
  }

  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  public get pagedUncatRepos(): GitHubRawRepo[] {
    const all = this.filteredUncatRepos;
    const page = Math.min(starBoardState.uncatPage, this.uncatTotalPages);
    const start = (page - 1) * starBoardState.pageSize;
    return all.slice(start, start + starBoardState.pageSize);
  }

  /**
   * 各个 GitHub 原生 Lists 板块列表
   */
  public get lists() {
    return gitHubService.lists;
  }

  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  public getReposForList(listName: string): GitHubRawRepo[] {
    const q = starBoardState.searchQuery.trim().toLowerCase();
    const list = gitHubService.repos.filter(r => gitHubService.getRepoFolders(r.full_name).includes(listName));
    if (!q) return list;
    return list.filter(r =>
      r.full_name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q)) ||
      (r.language && r.language.toLowerCase().includes(q)) ||
      (r.topics && r.topics.some(t => t.toLowerCase().includes(q)))
    );
  }

  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  public async moveRepoToList(fullName: string, targetList: string): Promise<void> {
    await gitHubService.dropRepositoryIntoFolder(fullName, targetList);
  }

  /**
   * 从指定 List 移出仓库
   */
  public async removeRepoFromList(fullName: string, listName: string): Promise<void> {
    await gitHubService.toggleRepoList(fullName, listName);
  }
}

export const starBoardController = StarBoardController.getInstance();
