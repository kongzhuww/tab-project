import { reactive } from "vue";
import { ReadSessionSlot } from "../core/read-session";
import { readGitHubJson, loadGitHubReadHeaders, GitHubReadError } from "./api-client";

export interface GitHubTrendingRepo {
  id?: number | string;
  name: string;
  full_name?: string;
  owner?: { login: string; avatar_url?: string };
  description?: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  html_url: string;
}

export interface GitHubTrendingState {
  currentTab: "stars" | "trending";
  rangeText: string;
  sinceDays: number;
  repos: GitHubTrendingRepo[];
  isLoading: boolean;
  errorMessage: string;
  sourceText: string;
  fetchedAt: number;
  hasLoaded: boolean;
}

export const gitHubTrendingState = reactive<GitHubTrendingState>({
  currentTab: "stars", rangeText: "近 7 天", sinceDays: 7, repos: [],
  isLoading: false, errorMessage: "", sourceText: "", fetchedAt: 0, hasLoaded: false
});

export type GitHubTrendingAction = "switch-tab" | "switch-range" | "refresh" | "select-repo";
export type GitHubTrendingActionHandler = (action: GitHubTrendingAction, payload?: any) => void;
const actionHandlers = new Set<GitHubTrendingActionHandler>();
let viewSignal: AbortSignal | undefined;
const reads = new ReadSessionSlot();
let attempted = false;

async function readThirdPartyJson(url: string, parent: AbortSignal): Promise<any> {
  parent.throwIfAborted();
  if (new URL(url).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const controller = new AbortController();
  const abort = () => controller.abort();
  parent.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(abort, 15000);
  try {
    const response = await fetch(url, {
      signal: controller.signal, credentials: "omit", redirect: "error", referrerPolicy: "no-referrer", cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!response.ok) { void response.body?.cancel().catch(() => undefined); throw new Error("Source unavailable"); }
    if (!response.body) throw new Error("Empty public source");
    const reader = response.body.getReader(), decoder = new TextDecoder("utf-8", { fatal: true });
    let size = 0, text = "";
    try {
      for (;;) {
        controller.signal.throwIfAborted();
        const part = await reader.read(); if (part.done) break;
        size += part.value.byteLength;
        if (size > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        text += decoder.decode(part.value, { stream: true });
      }
      controller.signal.throwIfAborted();
      return JSON.parse(text + decoder.decode());
    } finally { void reader.cancel().catch(() => undefined); reader.releaseLock(); }
  } finally { clearTimeout(timer); parent.removeEventListener("abort", abort); }
}

function normalizeRepo(item: any, thirdParty: boolean): GitHubTrendingRepo {
  const candidate = item?.name || item?.repository;
  const fullName = thirdParty
    ? (item?.full_name || (typeof candidate === "string" && candidate.includes("/") ? candidate : item?.author && candidate ? `${item.author}/${candidate}` : ""))
    : item?.full_name;
  if (typeof fullName !== "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName) || fullName.split("/").some(part => part === "." || part === "..")) throw new Error("Invalid repository");
  const [owner, name] = fullName.split("/");
  const count = (value: unknown) => typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
  return {
    name, full_name: fullName, owner: { login: owner },
    description: typeof item.description === "string" ? item.description : "",
    language: typeof item.language === "string" ? item.language : "",
    stargazers_count: count(thirdParty ? item.stars ?? item.stargazers_count : item.stargazers_count),
    forks_count: count(thirdParty ? item.forks ?? item.forks_count : item.forks_count),
    html_url: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`
  };
}

async function fetchRepos(days: number, signal: AbortSignal): Promise<{ repos: GitHubTrendingRepo[]; sourceText: string }> {
  const date = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
  let primaryError = "";
  try {
    const headers = await loadGitHubReadHeaders(signal);
    const { data } = await readGitHubJson<{ items?: unknown; incomplete_results?: boolean }>(`/search/repositories?q=${encodeURIComponent(`is:public created:>${date}`)}&sort=stars&order=desc&per_page=30`, { headers, signal, maxBytes: 2 * 1024 * 1024 });
    signal.throwIfAborted();
    if (!Array.isArray(data?.items)) throw new Error("Invalid search response");
    return {
      repos: data.items.slice(0, 30).map((item: any) => normalizeRepo(item, false)),
      sourceText: `GitHub Search：UTC 日期 ${date} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${data.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (error) {
    signal.throwIfAborted(); // Hiding or selecting another range must not start a fallback.
    primaryError = error instanceof GitHubReadError ? error.message : "主源响应格式无效。";
  }
  const period = days === 1 ? "daily" : days === 7 ? "weekly" : "monthly";
  const list = await readThirdPartyJson(`https://ghapi.h11.dev/repositories?since=${period}`, signal);
  signal.throwIfAborted();
  if (!Array.isArray(list)) throw new Error("Invalid fallback response");
  return {
    repos: list.slice(0, 30).map(item => normalizeRepo(item, true)),
    sourceText: `GitHub Search 不可用：${primaryError} 改用第三方 ghapi.h11.dev 的 ${period} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}

export const gitHubTrendingController = {
  get state() { return gitHubTrendingState; },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(signal: AbortSignal): () => void {
    reads.cancel(); gitHubTrendingState.isLoading = false;
    viewSignal = signal;
    const cancel = () => {
      if (viewSignal !== signal) return;
      if (reads.pending) {
        reads.cancel();
        gitHubTrendingState.isLoading = false;
        gitHubTrendingState.errorMessage = "读取已暂停，返回后可点击刷新。";
      }
    };
    signal.addEventListener("abort", cancel, { once: true });
    if (!signal.aborted && !attempted) void this.refresh();
    return () => {
      signal.removeEventListener("abort", cancel);
      if (viewSignal === signal) { cancel(); viewSignal = undefined; }
    };
  },
  switchTab(tab: "stars" | "trending") {
    gitHubTrendingState.currentTab = tab;
    this.dispatch("switch-tab", tab);
  },
  async switchRange(days: number, _text?: string) {
    if (!viewSignal || viewSignal.aborted || ![1, 7, 30].includes(days) || days === gitHubTrendingState.sinceDays) return;
    reads.cancel();
    Object.assign(gitHubTrendingState, {
      sinceDays: days, rangeText: `近 ${days} 天`, repos: [], sourceText: "",
      fetchedAt: 0, hasLoaded: false, errorMessage: "", isLoading: false
    });
    this.dispatch("switch-range", { days, text: gitHubTrendingState.rangeText });
    await this.refresh();
  },
  async refresh() {
    const parent = viewSignal;
    if (!parent || parent.aborted || gitHubTrendingState.isLoading) return;
    const days = gitHubTrendingState.sinceDays;
    const own = reads.begin({
      signal: parent, timeoutMs: 45000,
      isCurrent: () => viewSignal === parent && gitHubTrendingState.sinceDays === days,
      onStop: reason => {
        gitHubTrendingState.isLoading = false;
        if (reason === "timeout") gitHubTrendingState.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。";
      }
    });
    const current = own.current;
    if (!current()) return;
    attempted = true;
    gitHubTrendingState.isLoading = true; gitHubTrendingState.errorMessage = "";
    try {
      const result = await own.wait(() => fetchRepos(days, own.signal));
      if (!current()) return;
      gitHubTrendingState.repos = result.repos;
      gitHubTrendingState.sourceText = result.sourceText;
      gitHubTrendingState.fetchedAt = Date.now();
      gitHubTrendingState.hasLoaded = true;
    } catch {
      if (current()) gitHubTrendingState.errorMessage = gitHubTrendingState.hasLoaded
        ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。"
        : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。";
    } finally {
      if (own.finish()) { gitHubTrendingState.isLoading = false; this.dispatch("refresh"); }
    }
  },
  selectRepo(repo: GitHubTrendingRepo) { this.dispatch("select-repo", repo); },
  onAction(handler: GitHubTrendingActionHandler): () => void {
    actionHandlers.add(handler); return () => { actionHandlers.delete(handler); };
  },
  dispatch(action: GitHubTrendingAction, payload?: any) {
    for (const handler of actionHandlers) { try { handler(action, payload); } catch { /* Isolate optional compatibility observers. */ } }
  }
};
