/**
 * GitHub 仓库 README 详情抽屉状态与逻辑控制器
 */
import { reactive, readonly } from "vue";
import { ReadSessionSlot } from "../core/read-session";
import { markdownAstEngine } from "../utils/markdown-ast";
import { GitHubDetailReadError, readRepositoryDocument } from "./detail-read";
import { githubTaskCreation } from "../todoist/github-task-target";

export interface RepoHeadingItem {
  id: string;
  level: number;
  text: string;
}

export interface RepoDetailState {
  isOpen: boolean;
  revision: number;
  hasReadme: boolean;
  notice: string;
  owner: string;
  repo: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
  license: string;
  pushedAt: string;
  defaultBranch: string;
  topics: string[];
  readmeMarkdown: string;
  readmeHtml: string;
  headings: RepoHeadingItem[];
  isZh: boolean;
  isLoading: boolean;
  error: string | null;
}

const state = reactive<RepoDetailState>({
  isOpen: false,
  revision: 0,
  hasReadme: false,
  notice: "",
  owner: "",
  repo: "",
  fullName: "",
  description: "",
  htmlUrl: "",
  stars: 0,
  forks: 0,
  openIssues: 0,
  language: "",
  license: "",
  pushedAt: "",
  defaultBranch: "main",
  topics: [],
  readmeMarkdown: "",
  readmeHtml: "",
  headings: [],
  isZh: false,
  isLoading: false,
  error: null
});

/**
 * 修复 Markdown 中相对路径的图片与链接，使其指向 raw.githubusercontent.com
 */
function resolveRelativeMarkdown(md: string, owner: string, repo: string, branch: string, path: string): string {
  const prefix = `${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const directory = path.includes("/") ? path.slice(0, path.lastIndexOf("/") + 1) : "";
  const rawRoot = `https://raw.githubusercontent.com/${prefix}/${encodeURIComponent(branch)}/`;
  const blobRoot = `https://github.com/${prefix}/blob/${encodeURIComponent(branch)}/`;
  const resolve = (value: string, root: string) => {
    if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(value)) return value;
    return new URL(value.startsWith("/") ? value.slice(1) : `${directory}${value}`, root).href;
  };

  // 1. 替换 Markdown 图片语法: ![alt](relative/path) 或 ![alt](/images/...) 或 ![alt](./...)
  let normalized = md.replace(/!\[([^\]]*)\]\((?!https?:\/\/|data:)([^)]+)\)/g, (_match, alt, p) => {
    return `![${alt}](${resolve(p, rawRoot)})`;
  });

  // 2. 替换 HTML <img> 标签中的 src: <img src="relative/path" ...> 或 src="/images/..."
  normalized = normalized.replace(/<img([^>]+)src=["'](?!https?:\/\/|data:)([^"']+)["']([^>]*)>/gi, (_match, pre, p, post) => {
    return `<img${pre}src="${resolve(p, rawRoot)}"${post}>`;
  });

  // 3. 替换相对链接语法: [text](docs/xxx.md) 或 [text](/docs/xxx.md)
  normalized = normalized.replace(/\[([^\]]+)\]\((?!https?:\/\/|#|mailto:)([^)]+)\)/g, (_match, text, p) => {
    return `[${text}](${resolve(p, blobRoot)})`;
  });

  return normalized;
}

/**
 * 清洗与修复 GitHub README 中常见的 HTML 标签与相对媒体，并将开头的大 Logo 智能嵌入 H1 标题右侧
 */
function cleanAndNormalizeReadme(md: string, owner: string, repo: string, branch: string, path: string): string {
  let text = resolveRelativeMarkdown(md, owner, repo, branch, path);

  // 1. 智能提取开头的 Logo 图片并并排移至 H1 标题右侧
  let extractedLogoSrc = "";
  let extractedLogoAlt = "";

  const logoPattern = /<(?:p|div)\s+align=["']center["']>\s*(?:<a\b[^>]*>\s*)?<img\b[^>]*src=["']([^"']+)["'][^>]*alt=["']?([^"'>]*)["']?[^>]*>(?:\s*<\/a>)?\s*<\/(?:p|div)>/i;
  const match = text.slice(0, 1500).match(logoPattern);
  if (match) {
    const src = match[1];
    if (/logo|icon|avatar|brand|lumaring/i.test(src) || src.includes("assets/") || /width=["']\d+["']/i.test(match[0])) {
      extractedLogoSrc = src;
      extractedLogoAlt = match[2] || "logo";
      text = text.replace(match[0], "");
    }
  }

  // 2. 如果成功提取了 Logo，将其作为内联小图标追加到首个 H1 标题中
  if (extractedLogoSrc) {
    text = text.replace(/^(#\s+[^\n]+)/m, `$1 <img class="gh-inline-header-logo" src="${extractedLogoSrc}" alt="${extractedLogoAlt}">`);
  }

  return text;
}

/**
 * 从 Markdown 中提取 H1, H2, H3 标题构建目录（TOC）
 */
function extractHeadings(md: string): RepoHeadingItem[] {
  const headings: RepoHeadingItem[] = [];
  const lines = md.split(/\r?\n/);
  let idCounter = 1;

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawText = match[2].trim().replace(/[*_`[\]]/g, "");
      const slugId = `gh-heading-${idCounter++}-${encodeURIComponent(rawText.slice(0, 30).replace(/\s+/g, "-"))}`;
      headings.push({
        id: slugId,
        level,
        text: rawText
      });
    }
  }

  return headings;
}

/**
 * 将相对时间转换为友好中文
 */
export function formatTimeAgo(isoString: string): string {
  if (!isoString) return "";
  try {
    const now = Date.now();
    const past = new Date(isoString).getTime();
    if (isNaN(past)) return "";
    const diffSec = Math.floor((now - past) / 1000);
    if (diffSec < 60) return "刚刚更新";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} 分钟前更新`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} 小时前更新`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay} 天前更新`;
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth} 个月前更新`;
    return `${Math.floor(diffDay / 365)} 年前更新`;
  } catch {
    return "";
  }
}

class GitHubRepoDetailController {
  private readonly reads = new ReadSessionSlot();
  private pageActive = typeof document !== "undefined" && !document.hidden;
  private watchingAccount = false;
  private invalidateAccount = (): void => {
    if (!state.isOpen) return;
    this.stopReading(); ++state.revision;
    state.readmeMarkdown = ""; state.readmeHtml = ""; state.headings = [];
    state.hasReadme = false; state.isZh = false; state.notice = "";
    state.error = "GitHub 账号设置已变化，已停止旧请求；请关闭并重新打开仓库详情以使用最新配置。";
  };
  private accountStorageChanged = (changes: Record<string, unknown>, area: string): void => {
    if (area === "local" && ("ghUser" in changes || "ghToken" in changes)) this.invalidateAccount();
  };
  private accountWindowChanged = (event: StorageEvent): void => {
    if (event.key === null || event.key === "ghUser" || event.key === "ghToken") this.invalidateAccount();
  };
  private watchAccount(): void {
    if (this.watchingAccount) return;
    this.watchingAccount = true;
    if (typeof chrome !== "undefined") chrome.storage?.onChanged?.addListener(this.accountStorageChanged);
    if (typeof window !== "undefined") window.addEventListener("storage", this.accountWindowChanged);
  }
  private unwatchAccount(): void {
    if (!this.watchingAccount) return;
    this.watchingAccount = false;
    if (typeof chrome !== "undefined") chrome.storage?.onChanged?.removeListener(this.accountStorageChanged);
    if (typeof window !== "undefined") window.removeEventListener("storage", this.accountWindowChanged);
  }

  public open(fullNameOrOwner: string, repoName?: string, initialMeta?: any): void {
    if (githubTaskCreation.saving) return;
    const fullName = repoName ? `${fullNameOrOwner.trim()}/${repoName.trim()}` : fullNameOrOwner.trim();
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName) || fullName.split("/").some(part => part === "." || part === "..")) return;
    this.stopReading(); this.watchAccount();
    ++state.revision;
    const [owner, repo] = fullName.split("/");
    Object.assign(state, {
      isOpen: true, owner, repo, fullName, htmlUrl: `https://github.com/${owner}/${repo}`,
      description: typeof initialMeta?.description === "string" ? initialMeta.description : "",
      stars: Number(initialMeta?.stargazers_count ?? initialMeta?.stars) || 0,
      forks: Number(initialMeta?.forks_count ?? initialMeta?.forks) || 0,
      openIssues: Number(initialMeta?.open_issues_count ?? initialMeta?.openIssues) || 0,
      language: typeof initialMeta?.language === "string" ? initialMeta.language : "",
      license: typeof initialMeta?.license === "string" ? initialMeta.license : initialMeta?.license?.spdx_id || "",
      pushedAt: initialMeta?.pushed_at || initialMeta?.updated_at || "",
      defaultBranch: "", topics: Array.isArray(initialMeta?.topics) ? initialMeta.topics.filter((t: unknown) => typeof t === "string") : [],
      readmeMarkdown: "", readmeHtml: "", headings: [], isZh: false,
      hasReadme: false, notice: "", error: null
    });
    if (this.pageActive) void this.readOnOpen();
    else state.error = "读取已暂停，请返回页面后重新打开仓库详情。";
  }

  private stopReading(): void {
    this.reads.cancel(); state.isLoading = false;
  }

  public close(): void {
    if (githubTaskCreation.saving) return;
    this.stopReading(); this.unwatchAccount(); ++state.revision; state.isOpen = false;
  }

  public setPageActive(active: boolean): void {
    this.pageActive = active;
    if (!active && this.reads.pending) {
      this.stopReading();
      state.error = "读取已暂停，请返回页面后重新打开仓库详情。";
    }
  }

  private async readOnOpen(): Promise<void> {
    if (!state.isOpen || !this.pageActive || state.isLoading) return;
    const revision = ++state.revision;
    const { owner, repo } = state;
    const request = this.reads.begin({
      timeoutMs: 45000,
      isCurrent: () => state.isOpen && this.pageActive && state.revision === revision,
      onStop: reason => {
        state.isLoading = false;
        if (reason === "timeout") state.error = "README 读取超过整体 45 秒上限，请重新打开仓库详情。";
      }
    });
    const current = request.current;
    if (!current()) return;
    state.isLoading = true; state.error = null; state.notice = "";
    try {
      const result = await request.wait(() => readRepositoryDocument(owner, repo, request.signal));
      request.signal.throwIfAborted();
      if (!current()) return;
      const markdown = cleanAndNormalizeReadme(result.markdown, owner, repo, result.branch, result.path);
      const html = markdownAstEngine.renderMarkdown(markdown, { renderMode: "rendered" });
      if (!current()) return;
      const data = result.metadata;
      if (data) {
        state.description = typeof data.description === "string" ? data.description : "";
        state.stars = Number(data.stargazers_count) || 0;
        state.forks = Number(data.forks_count) || 0;
        state.openIssues = Number(data.open_issues_count) || 0;
        state.language = typeof data.language === "string" ? data.language : "";
        state.license = data.license?.spdx_id || data.license?.name || "";
        state.pushedAt = data.pushed_at || "";
        state.topics = Array.isArray(data.topics) ? data.topics.filter((t: unknown) => typeof t === "string") : [];
      }
      state.defaultBranch = result.branch; state.isZh = result.isZh; state.notice = result.notice;
      state.readmeMarkdown = markdown; state.readmeHtml = html;
      state.headings = extractHeadings(markdown); state.hasReadme = true;
    } catch (error) {
      if (current()) state.error = error instanceof GitHubDetailReadError ? error.message
        : request.signal.aborted ? "README 读取已取消或超过整体 45 秒上限，请重新打开仓库详情。"
        : "README 内容解析失败，请重新打开仓库详情或到 GitHub 查看。";
    } finally {
      if (request.finish()) state.isLoading = false;
    }
  }
}

export const githubRepoDetailState = readonly(state);
export const githubRepoDetailController = new GitHubRepoDetailController();
