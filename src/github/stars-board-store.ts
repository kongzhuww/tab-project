/**
 * Star Repositories Kanban Board Store
 * Star 收藏多列看板响应式数据模型
 * - 顶部未分类 Star 仓库（单排 10 个一页，支持滑至末尾快捷卡片与顶栏翻页器）
 * - 下方各本地分组横向多列看板
 * - 收藏从 GitHub 读取，拖拽归类只保存到本机
 */

import { reactive, computed } from "vue";
import { gitHubService, type GitHubRawRepo } from "../services/github.service";
import { starBoardData, getStarBoardRepoFolders } from "./stars-board-data";

interface StarBoardState {
  uncatPage: number;
  pageSize: number; // 默认 10 个一页
}

export const starBoardState = reactive<StarBoardState>({
  uncatPage: 1,
  pageSize: 10
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
    const q = starBoardData.searchQuery.trim().toLowerCase();
    const list = starBoardData.repos.filter(r => getStarBoardRepoFolders(r.full_name).length === 0);
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
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  public get lists() {
    const sec = starBoardData.activeSection || "默认";
    return starBoardData.lists.filter(l => (l.section || "默认") === sec);
  }

  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  public getReposForList(listName: string): GitHubRawRepo[] {
    const q = starBoardData.searchQuery.trim().toLowerCase();
    const list = starBoardData.repos.filter(r => getStarBoardRepoFolders(r.full_name).includes(listName));
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
