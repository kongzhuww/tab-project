<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { loadGitHubAccountSettings } from "./account-settings";
import { createGitHubReadHeaders, readGitHubJson } from "./api-client";
import { githubRepoDetailController } from "./repo-detail-store";
import { loadConfig, loadConversations } from "../services/byok.service";
import { loadNativeBridgeConfig } from "../services/native-bridge.service";
import { requestAiConversation, requestAiDraft, type AiDraftTarget } from "../multica/workspace-bridge";
import { openRegisteredCard } from "../core/fullscreen-card-state";
import { loadOwnRepositorySnapshot } from "../multica/github-resources";
import type { MyRepoItem } from "./my-repos-store";
import type { ResourceAttachment } from "../multica/resource-content";

const props = defineProps<{ active: boolean; accountRevision: number; showResults?: boolean }>();
const emit = defineEmits<{ channel: [name: "stars" | "repos" | "trending"]; settings: [anchor: HTMLElement]; notifications: [] }>();
type Repo = { full_name: string; description?: string; language?: string; stargazers_count?: number; forks_count?: number; updated_at?: string };
type Pull = { number: number; title: string; html_url: string; updated_at?: string; comments?: number; repository_url?: string };
type Session = { kind: "deepseek"; id: string; title: string; updated: number; model: string };
const username = ref("");
const input = ref("");
const repoPickerOpen = ref(false), repoPickerLoading = ref(false), repoPickerError = ref(""), repoPickerWarning = ref("");
const ownRepos = ref<MyRepoItem[]>([]), selectedRepo = ref<MyRepoItem | null>(null), repoQuery = ref("");
const filteredOwnRepos = computed(() => { const q = repoQuery.value.trim().toLowerCase(); return q ? ownRepos.value.filter(repo => repo.fullName.toLowerCase().includes(q)) : ownRepos.value; });
let pickerRequest: AbortController | undefined;
async function loadOwnRepos(): Promise<void> {
  pickerRequest?.abort();
  const request = new AbortController(); pickerRequest = request;
  repoPickerLoading.value = true; repoPickerError.value = ""; repoPickerWarning.value = "";
  try {
    const snapshot = await loadOwnRepositorySnapshot(request.signal);
    if (pickerRequest !== request || request.signal.aborted) return;
    ownRepos.value = snapshot.repos; repoPickerWarning.value = snapshot.warning;
  } catch (error) {
    if (pickerRequest === request && !request.signal.aborted) repoPickerError.value = error instanceof Error ? error.message : "仓库读取失败。";
  } finally { if (pickerRequest === request) repoPickerLoading.value = false; }
}
function toggleRepoPicker(): void {
  repoPickerOpen.value = !repoPickerOpen.value;
  if (repoPickerOpen.value && !ownRepos.value.length && !repoPickerLoading.value) void loadOwnRepos();
}
function chooseRepo(repo: MyRepoItem): void { selectedRepo.value = repo; repoPickerOpen.value = false; repoQuery.value = ""; }
watch(() => props.accountRevision, () => { pickerRequest?.abort(); pickerRequest = undefined; ownRepos.value = []; selectedRepo.value = null; repoPickerLoading.value = false; repoPickerOpen.value = false; });
const repos = ref<Repo[]>([]), pulls = ref<Pull[]>([]), sessions = ref<Session[]>([]);
const githubLoading = ref(false), sessionLoading = ref(false);
const accountError = ref(""), reposError = ref(""), pullsError = ref(""), sessionsError = ref("");
const loadedRevision = ref<number | null>(null);
const inFlight = ref(false);
let controller: AbortController | undefined;
let version = 0;

interface ModelOption {
  key: string;
  label: string;
  provider: string;
  target: AiDraftTarget;
}
const modelPickerOpen = ref(false);
const modelOptions = ref<ModelOption[]>([]);
const selectedModelKey = ref("");
const selectedModelOption = computed(() =>
  modelOptions.value.find(o => o.key === selectedModelKey.value) || modelOptions.value[0] || null
);

async function loadAiModels(): Promise<void> {
  const [byokResult, nativeResult] = await Promise.allSettled([loadConfig(), loadNativeBridgeConfig()]);
  const opts: ModelOption[] = [];
  if (byokResult.status === "fulfilled" && byokResult.value.configured) {
    const cfg = byokResult.value;
    const list = cfg.models.length ? cfg.models : (cfg.model ? [cfg.model] : []);
    for (const m of list) {
      opts.push({
        key: `deepseek:${m}`,
        label: m,
        provider: cfg.label || "AI 模型",
        target: { service: "deepseek", model: m },
      });
    }
  }
  const nativeCfg = nativeResult.status === "fulfilled" ? nativeResult.value : null;
  const nativeAgentId = nativeCfg?.selectedAgentId || "pi";
  const nativeModel = nativeCfg?.piModel || "";
  opts.push({
    key: `native:${nativeAgentId}:${nativeModel}`,
    label: nativeModel ? (nativeModel.includes("/") ? nativeModel.split("/").slice(1).join("/") : nativeModel) : "本地 Agent",
    provider: nativeAgentId === "pi" ? "Pi 本地" : nativeAgentId,
    target: { service: "native", nativeAgentId, model: nativeModel },
  });
  modelOptions.value = opts;
  if (!opts.some(o => o.key === selectedModelKey.value)) {
    selectedModelKey.value = opts[0]?.key || "";
  }
}
function toggleModelPicker(): void {
  repoPickerOpen.value = false;
  modelPickerOpen.value = !modelPickerOpen.value;
  if (modelPickerOpen.value) void loadAiModels();
}
function chooseModelOption(opt: ModelOption): void {
  selectedModelKey.value = opt.key;
  modelPickerOpen.value = false;
}
function onDocPointerDown(event: PointerEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target?.closest(".repo-picker-anchor")) repoPickerOpen.value = false;
  if (!target?.closest(".model-picker-anchor")) modelPickerOpen.value = false;
}
onMounted(() => {
  document.addEventListener("pointerdown", onDocPointerDown);
  void loadAiModels();
});
const greeting = computed(() => { const h = new Date().getHours(); return h < 6 ? "夜深了" : h < 11 ? "早上好" : h < 14 ? "中午好" : h < 18 ? "下午好" : "晚上好"; });
function relativeTime(date?: string | number): string {
  if (!date) return "";
  const time = new Date(date).getTime();
  if (!Number.isFinite(time)) return "";
  const mins = Math.max(0, Math.floor((Date.now() - time) / 60000));
  if (mins < 60) return mins < 1 ? "刚刚" : `${mins} 分钟前`;
  if (mins < 1440) return `${Math.floor(mins / 60)} 小时前`;
  if (mins < 43200) return `${Math.floor(mins / 1440)} 天前`;
  return new Date(time).toLocaleDateString();
}
const errorText = (error: unknown) => error instanceof Error ? error.message : "读取失败，请稍后重试。";
function validRepo(value: any): value is Repo { return typeof value?.full_name === "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value.full_name); }
function safePullUrl(value: unknown): string {
  try { const url = new URL(String(value)); return url.protocol === "https:" && url.hostname === "github.com" && /^\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/\d+\/?$/.test(url.pathname) ? url.href : ""; } catch { return ""; }
}
const GITHUB_DASHBOARD_CACHE_KEY = "lw-gh-dashboard-cache-v1";
const GITHUB_DASHBOARD_CACHE_TTL_MS = 5 * 60 * 1000;

interface GitHubDashboardCache {
  username: string;
  repos: Repo[];
  pulls: Pull[];
  cachedAt: number;
}

function readDashboardCache(): GitHubDashboardCache | null {
  try {
    const raw = localStorage.getItem(GITHUB_DASHBOARD_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.username !== "string" || !Array.isArray(parsed.repos) || !Array.isArray(parsed.pulls)) {
      return null;
    }
    return {
      username: parsed.username,
      repos: parsed.repos.filter(validRepo).slice(0, 6),
      pulls: parsed.pulls.filter((p: any) => p && typeof p.title === "string" && safePullUrl(p.html_url)).slice(0, 5),
      cachedAt: Number(parsed.cachedAt) || 0,
    };
  } catch {
    return null;
  }
}

function writeDashboardCache(data: GitHubDashboardCache): void {
  try {
    localStorage.setItem(GITHUB_DASHBOARD_CACHE_KEY, JSON.stringify(data));
  } catch {}
}

async function load(force = false): Promise<void> {
  if (!force && loadedRevision.value === props.accountRevision) return;
  controller?.abort();
  const scope = new AbortController(); controller = scope;
  const current = ++version;
  const targetRevision = props.accountRevision;
  const alive = () => props.active && current === version && !scope.signal.aborted;
  inFlight.value = true;

  const cached = readDashboardCache();
  const hasCached = Boolean(cached && cached.username);
  if (hasCached && cached && !force) {
    username.value = cached.username;
    repos.value = cached.repos;
    pulls.value = cached.pulls;
    accountError.value = "";
    reposError.value = "";
    pullsError.value = "";
  } else if (force || loadedRevision.value === null || loadedRevision.value !== targetRevision) {
    username.value = ""; repos.value = []; pulls.value = []; sessions.value = [];
    accountError.value = ""; reposError.value = ""; pullsError.value = ""; sessionsError.value = "";
  }
  githubLoading.value = !hasCached || force;
  sessionLoading.value = !sessions.value.length;
  void loadAiModels();
  void (async () => {
    try {
      const local = await loadConversations();
      if (!alive()) return;
      const list: Session[] = local.map(chat => ({
        kind: "deepseek",
        id: chat.id,
        title: chat.title || "未命名对话",
        updated: Number(chat.updatedAt) || 0,
        model: chat.model
      }));
      sessions.value = list.sort((a, b) => b.updated - a.updated).slice(0, 4);
    } catch {
      if (alive()) sessionsError.value = "DeepSeek 本机会话读取失败";
    } finally {
      if (alive()) sessionLoading.value = false;
    }
  })();
  if (!force && hasCached && cached && Date.now() - cached.cachedAt < GITHUB_DASHBOARD_CACHE_TTL_MS) {
    loadedRevision.value = targetRevision;
    inFlight.value = false;
    githubLoading.value = false;
    return;
  }
  try {
    const account = await loadGitHubAccountSettings();
    if (!alive()) return;
    const headers = createGitHubReadHeaders(account.ghToken);
    let user = account.ghUser.trim();
    if (!user && account.ghToken) {
      const me = await readGitHubJson<{ login?: string }>("/user", { headers, signal: scope.signal, maxBytes: 128 * 1024 });
      user = typeof me.data?.login === "string" ? me.data.login : "";
    }
    if (!alive()) return;
    if (!user) {
      accountError.value = "配置 GitHub 用户名后即可查看仓库和 Pull Request。";
      loadedRevision.value = targetRevision;
      return;
    }
    if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(user)) throw new Error("GitHub 用户名格式无效，请检查设置。");
    username.value = user;
    const params = new URLSearchParams({ q: `is:pr is:open author:${user}`, sort: "updated", order: "desc", per_page: "5" });
    const [repositoryResult, pullResult] = await Promise.allSettled([
      readGitHubJson<unknown>(`/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&per_page=6`, { headers, signal: scope.signal, maxBytes: 1024 * 1024 }),
      readGitHubJson<{ items?: unknown }>(`/search/issues?${params}`, { headers, signal: scope.signal, maxBytes: 1024 * 1024 })
    ]);
    if (!alive()) return;
    if (repositoryResult.status === "fulfilled" && Array.isArray(repositoryResult.value.data)) repos.value = repositoryResult.value.data.filter(validRepo).slice(0, 6);
    else if (!hasCached) reposError.value = repositoryResult.status === "rejected" ? errorText(repositoryResult.reason) : "仓库响应格式异常。";
    if (pullResult.status === "fulfilled" && Array.isArray(pullResult.value.data?.items)) pulls.value = pullResult.value.data.items.filter((p: any) => p && typeof p.title === "string" && safePullUrl(p.html_url)).slice(0, 5);
    else if (!hasCached) pullsError.value = pullResult.status === "rejected" ? errorText(pullResult.reason) : "Pull Request 响应格式异常。";
    if (repositoryResult.status === "fulfilled" || pullResult.status === "fulfilled") {
      writeDashboardCache({
        username: user,
        repos: repos.value,
        pulls: pulls.value,
        cachedAt: Date.now(),
      });
    }
    loadedRevision.value = targetRevision;
  } catch (error) {
    if (alive()) accountError.value = errorText(error);
  } finally {
    if (current === version) {
      inFlight.value = false;
      githubLoading.value = false;
      sessionLoading.value = false;
    }
  }
}
watch(() => [props.active, props.accountRevision] as const, ([active, rev]) => {
  if (active) {
    if (loadedRevision.value !== rev) void load();
  } else if (inFlight.value) {
    ++version;
    controller?.abort();
    inFlight.value = false;
  }
}, { immediate: true });
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocPointerDown);
  ++version;
  controller?.abort();
  pickerRequest?.abort();
});
function openDraft(): void {
  if (!input.value.trim()) return;
  const repo = selectedRepo.value;
  const resource: ResourceAttachment | undefined = repo ? { kind:"github", id:repo.fullName, title:repo.fullName, url:`https://github.com/${repo.fullName}`, description:repo.description, language:repo.language, visibility:repo.isPrivate ? "private" : "public" } : undefined;
  requestAiDraft(input.value.trim(), resource, selectedModelOption.value?.target);
  openRegisteredCard("multica");
}
function openSession(item: Session): void {
  requestAiConversation("deepseek", item.id);
  openRegisteredCard("multica");
}
function openAi(): void { openRegisteredCard("multica"); }
function repoNameFromPull(pull: Pull): string { const url = safePullUrl(pull.html_url); return url ? new URL(url).pathname.split("/").slice(1, 3).join("/") : ""; }

const quickPrompts = [
  "总结这个仓库的核心架构",
  "帮我起草一个 PR 描述",
  "排查最近的构建或类型报错",
  "梳理下一步优化清单"
];
function applyQuickPrompt(prompt: string): void {
  const current = input.value.trim();
  input.value = current ? `${current}\n${prompt}` : prompt;
}
function splitRepoName(fullName: string): { owner: string; name: string } {
  const idx = fullName.indexOf("/");
  if (idx === -1) return { owner: "", name: fullName };
  return { owner: fullName.slice(0, idx), name: fullName.slice(idx + 1) };
}
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Vue: "#41b883",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Dart: "#00b4ab",
};
function languageColor(language?: string): string {
  return (language && LANGUAGE_COLORS[language]) || "#94a3b8";
}
</script>

<template>
  <div class="gh-dashboard">
    <div class="dashboard-layout">
      <main class="dashboard-main">
        <div class="dashboard-search"><slot name="search" /></div>
        <div v-if="showResults"><slot name="results" /></div>
        <div v-show="!showResults" class="dashboard-home-content">
          <div class="dashboard-heading">
            <div class="heading-copy">
              <div class="eyebrow-row">
                <span class="eyebrow">GITHUB WORKSPACE</span>
                <span v-if="username" class="user-pill">
                  <i class="user-pill-dot" aria-hidden="true" />
                  @{{ username }}
                </span>
              </div>
              <h2>{{ greeting }}<template v-if="username">，{{ username }}</template>。</h2>
            </div>
            <button type="button" class="refresh-btn" :disabled="githubLoading" title="刷新 GitHub 数据" @click="load(true)">
              ↻ {{ githubLoading ? '刷新中' : '刷新' }}
            </button>
          </div>

          <div class="dashboard-composer">
            <textarea
              v-model="input"
              placeholder="有什么想法？输入问题或选择仓库，在 AI 工作区继续探索…"
              aria-label="发送到 AI 工作区的草稿"
              maxlength="100000"
            ></textarea>
            <div class="composer-prompts" aria-label="快捷提问">
              <button
                v-for="prompt in quickPrompts"
                :key="prompt"
                type="button"
                class="prompt-chip"
                @click="applyQuickPrompt(prompt)"
              >
                + {{ prompt }}
              </button>
            </div>
            <div class="composer-bottom">
              <div class="composer-left">
                <div class="repo-picker-anchor">
                  <button
                    type="button"
                    class="repo-picker-toggle"
                    :class="{ selected: Boolean(selectedRepo) }"
                    :aria-expanded="repoPickerOpen"
                    @click="toggleRepoPicker"
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/></svg>
                    <span>{{ selectedRepo ? selectedRepo.fullName : '选择仓库' }}</span>
                    <span class="caret">▾</span>
                  </button>
                  <div v-if="repoPickerOpen" class="repo-picker">
                    <div class="repo-picker-head">
                      <strong>选择我的仓库</strong>
                      <button type="button" title="刷新仓库" :disabled="repoPickerLoading" @click="loadOwnRepos">↻</button>
                    </div>
                    <input v-model="repoQuery" placeholder="搜索仓库名称…" aria-label="搜索我的仓库" />
                    <p v-if="repoPickerLoading" class="repo-picker-hint">正在读取仓库…</p>
                    <p v-else-if="repoPickerError" class="repo-picker-hint" role="alert">{{ repoPickerError }} <button type="button" @click="loadOwnRepos">重试</button></p>
                    <p v-if="repoPickerWarning" class="repo-picker-hint">{{ repoPickerWarning }}</p>
                    <div class="repo-picker-list">
                      <button v-for="repo in filteredOwnRepos" :key="repo.fullName" type="button" @click="chooseRepo(repo)">
                        <span>{{ repo.fullName }}</span>
                        <small>{{ repo.isPrivate ? '私有' : '公开' }}</small>
                      </button>
                      <p v-if="!repoPickerLoading && !repoPickerError && !filteredOwnRepos.length" class="repo-picker-hint">没有找到仓库。</p>
                    </div>
                    <button v-if="selectedRepo" type="button" class="repo-picker-clear" @click="selectedRepo = null; repoPickerOpen = false">不选择仓库</button>
                    <p class="repo-picker-hint">仅附带仓库链接与简介；发送时会共享所选信息，README 需手动读取。</p>
                  </div>
                </div>
                <div class="model-picker-anchor">
                  <button
                    type="button"
                    class="repo-picker-toggle model-toggle"
                    :aria-expanded="modelPickerOpen"
                    @click="toggleModelPicker"
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.2l1.65 4.15L13.8 7l-4.15 1.65L8 12.8 6.35 8.65 2.2 7l4.15-1.65L8 1.2Z"/></svg>
                    <span>{{ selectedModelOption ? selectedModelOption.label : '选择模型' }}</span>
                    <span class="caret">▾</span>
                  </button>
                  <div v-if="modelPickerOpen" class="repo-picker model-picker">
                    <div class="repo-picker-head">
                      <strong>选择 AI 模型（同步 Agent / AI 设置）</strong>
                      <button type="button" title="刷新模型列表" @click="loadAiModels">↻</button>
                    </div>
                    <div class="repo-picker-list">
                      <button
                        v-for="opt in modelOptions"
                        :key="opt.key"
                        type="button"
                        :class="{ chosen: selectedModelOption?.key === opt.key }"
                        @click="chooseModelOption(opt)"
                      >
                        <span>{{ opt.label }}</span>
                        <small>{{ opt.provider }}</small>
                      </button>
                    </div>
                    <p class="repo-picker-hint">模型列表读取自 AI 工作区 / 数字员工同一套配置，跳转后不会自动发送。</p>
                  </div>
                </div>
                <span class="ai-safe-tag">
                  <small>· 不会自动发送</small>
                </span>
              </div>
              <button type="button" class="composer-submit" :disabled="!input.trim()" @click="openDraft">
                继续到 AI 工作区 <span>↗</span>
              </button>
            </div>
          </div>

          <section class="dashboard-section">
            <div class="section-heading">
              <div>
                <h3>最近会话</h3>
                <small>DeepSeek 本机记录</small>
              </div>
              <button type="button" @click="openAi">查看全部 <span>→</span></button>
            </div>
            <div class="dashboard-list">
              <div v-if="sessionLoading" class="skeleton-list" aria-hidden="true">
                <div class="skeleton-row"><i class="sk-dot" /><div class="sk-lines"><span class="sk-line w-60" /><span class="sk-line w-35" /></div></div>
                <div class="skeleton-row"><i class="sk-dot" /><div class="sk-lines"><span class="sk-line w-48" /><span class="sk-line w-30" /></div></div>
              </div>
              <p v-else-if="!sessions.length" class="empty">暂无可显示的会话，打开 AI 工作区开始对话。</p>
              <button v-for="session in sessions" :key="`${session.kind}:${session.id}`" type="button" class="list-row" @click="openSession(session)">
                <span class="row-badge session">
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M2.75 2h10.5c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0 1 13.25 12H6.81l-2.93 2.56A.5.5 0 0 1 3 14.18V12h-.25A1.75 1.75 0 0 1 1 10.25v-6.5C1 2.784 1.784 2 2.75 2Z"/></svg>
                </span>
                <span class="row-copy">
                  <strong>{{ session.title }}</strong>
                  <small>
                    <span class="meta-pill">DeepSeek</span>
                    <span>{{ session.model }}</span>
                    <template v-if="session.updated"> · {{ relativeTime(session.updated) }}</template>
                  </small>
                </span>
                <span class="row-arrow">↗</span>
              </button>
              <p v-if="sessionsError" class="inline-error">{{ sessionsError }}</p>
            </div>
          </section>

          <section class="dashboard-section">
            <div class="section-heading">
              <div>
                <h3>Pull requests</h3>
                <small>由你创建、尚未关闭</small>
              </div>
              <a v-if="username" :href="`https://github.com/pulls?q=${encodeURIComponent(`is:pr is:open author:${username}`)}`" target="_blank" rel="noopener noreferrer">查看全部 ↗</a>
            </div>
            <div class="dashboard-list">
              <div v-if="githubLoading" class="skeleton-list" aria-hidden="true">
                <div class="skeleton-row"><i class="sk-dot" /><div class="sk-lines"><span class="sk-line w-65" /><span class="sk-line w-40" /></div></div>
                <div class="skeleton-row"><i class="sk-dot" /><div class="sk-lines"><span class="sk-line w-52" /><span class="sk-line w-32" /></div></div>
              </div>
              <p v-else-if="accountError" class="empty">{{ accountError }}</p>
              <p v-else-if="pullsError" class="inline-error">{{ pullsError }}</p>
              <p v-else-if="!pulls.length" class="empty">没有找到未关闭的 Pull Request。</p>
              <a v-for="pull in pulls" :key="pull.html_url" class="list-row" :href="safePullUrl(pull.html_url)" target="_blank" rel="noopener noreferrer">
                <span class="row-badge pull">
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/></svg>
                </span>
                <span class="row-copy">
                  <strong>{{ pull.title }}</strong>
                  <small>
                    <span class="meta-pill">{{ repoNameFromPull(pull) }}</span>
                    <span>#{{ pull.number }}</span>
                    <template v-if="pull.updated_at"> · 更新于 {{ relativeTime(pull.updated_at) }}</template>
                  </small>
                </span>
                <span class="row-meta">{{ pull.comments || 0 }} 条评论 ↗</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <aside class="dashboard-side">
        <section class="side-card">
          <div class="side-heading">
            <div>
              <h3>最近更新的仓库</h3>
              <small>GitHub 公开仓库</small>
            </div>
            <button type="button" @click="emit('channel','repos')">全部 →</button>
          </div>
          <div v-if="githubLoading" class="skeleton-list compact" aria-hidden="true">
            <div class="skeleton-row"><i class="sk-dot sm" /><div class="sk-lines"><span class="sk-line w-70" /><span class="sk-line w-45" /></div></div>
            <div class="skeleton-row"><i class="sk-dot sm" /><div class="sk-lines"><span class="sk-line w-60" /><span class="sk-line w-40" /></div></div>
            <div class="skeleton-row"><i class="sk-dot sm" /><div class="sk-lines"><span class="sk-line w-65" /><span class="sk-line w-35" /></div></div>
          </div>
          <p v-else-if="accountError" class="side-empty">{{ accountError }}</p>
          <p v-else-if="reposError" class="inline-error">{{ reposError }}</p>
          <p v-else-if="!repos.length" class="side-empty">暂无公开仓库。</p>
          <div v-else class="repo-rows">
            <button v-for="repo in repos" :key="repo.full_name" type="button" class="repo-row" @click="githubRepoDetailController.open(repo.full_name, undefined, repo)">
              <span class="repo-lang-dot" :style="{ background: languageColor(repo.language) }" :title="repo.language || '仓库'" />
              <span class="repo-info">
                <strong>
                  <span v-if="splitRepoName(repo.full_name).owner" class="repo-owner">{{ splitRepoName(repo.full_name).owner }}/</span>{{ splitRepoName(repo.full_name).name }}
                </strong>
                <small>
                  {{ repo.language || '仓库' }}
                  <template v-if="repo.stargazers_count"> · ★ {{ repo.stargazers_count }}</template>
                  <template v-if="repo.updated_at"> · {{ relativeTime(repo.updated_at) }}</template>
                </small>
              </span>
            </button>
          </div>
        </section>

        <section class="side-card quick-card">
          <div class="side-heading">
            <div>
              <h3>快捷入口</h3>
              <small>你的 GitHub 工作台</small>
            </div>
          </div>
          <div class="quick-links">
            <button type="button" @click="emit('channel','stars')">
              <span class="quick-left">
                <i class="quick-icon star"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg></i>
                Star 收藏
              </span>
              <span class="quick-arrow">→</span>
            </button>
            <button type="button" @click="emit('channel','trending')">
              <span class="quick-left">
                <i class="quick-icon trending"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/></svg></i>
                开源发现
              </span>
              <span class="quick-arrow">→</span>
            </button>
            <button type="button" @click="emit('notifications')">
              <span class="quick-left">
                <i class="quick-icon notify"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.519 1.519 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947V5Z"/></svg></i>
                GitHub 通知
              </span>
              <span class="quick-arrow">→</span>
            </button>
            <button type="button" @click="emit('settings', $event.currentTarget as HTMLElement)">
              <span class="quick-left">
                <i class="quick-icon settings"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.162 1.4l.164.716a.25.25 0 0 0 .353.17l.657-.329c.688-.344 1.5-.195 2.02.371.482.523.597 1.31.287 1.948l-.33.658a.25.25 0 0 0 .171.353l.716.164c.755.172 1.305.718 1.369 1.461a8.2 8.2 0 0 1 0 1.402c-.064.743-.614 1.289-1.369 1.461l-.716.164a.25.25 0 0 0-.171.353l.33.658c.31.638.195 1.425-.287 1.948-.52.566-1.332.715-2.02.371l-.657-.329a.25.25 0 0 0-.353.17l-.164.716c-.172.755-.718 1.305-1.461 1.369a8.2 8.2 0 0 1-1.402 0c-.743-.064-1.289-.614-1.461-1.369l-.164-.716a.25.25 0 0 0-.353-.17l-.657.329c-.688.344-1.5.195-2.02-.371-.482-.523-.597-1.31-.287-1.948l.33-.658a.25.25 0 0 0-.171-.353l-.716-.164C.645 9.99.095 9.444.031 8.701a8.2 8.2 0 0 1 0-1.402C.095 6.556.645 6.01 1.4 5.838l.716-.164a.25.25 0 0 0 .17-.353l-.33-.658c-.31-.638-.195-1.425.287-1.948.52-.566 1.332-.715 2.02-.371l.657.329a.25.25 0 0 0 .353-.17l.164-.716C6.01.645 6.556.095 7.299.031A8.2 8.2 0 0 1 8 0ZM5.5 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"/></svg></i>
                账号设置
              </span>
              <span class="quick-arrow">→</span>
            </button>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.gh-dashboard {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
}
.dashboard-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 296px;
  gap: 28px;
  max-width: 1260px;
  margin: 0 auto;
  padding: 28px 34px 56px;
  box-sizing: border-box;
}
.dashboard-main,
.dashboard-side {
  min-width: 0;
}
.dashboard-search {
  margin-bottom: 24px;
}
.dashboard-search :deep(.card-fullscreen-gh-search) {
  width: 100%;
  max-width: none;
  min-width: 0;
  margin: 0;
}

/* Heading */
.dashboard-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}
.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.eyebrow {
  color: var(--muted, #64748b);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  font-weight: 700;
}
.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, #0284c7 10%, var(--surface, #f1f5f9));
  color: #0369a1;
  font-size: 11px;
  font-weight: 600;
}
.user-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}
.dashboard-heading h2 {
  font-size: 26px;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: var(--heading, #0f172a);
  margin: 6px 0 0;
  font-weight: 750;
}
.refresh-btn {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 999px;
  padding: 5px 11px;
  background: var(--panel, #ffffff);
  color: var(--muted, #64748b);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
}
.refresh-btn:hover:not(:disabled) {
  border-color: #93c5fd;
  color: #0284c7;
  background: var(--surface, #f8fafc);
}
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

/* AI Composer */
.dashboard-composer {
  position: relative;
  border: 1px solid var(--border, #dbe3ee);
  border-radius: 16px;
  background: var(--panel, #ffffff);
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.045), 0 1px 2px rgba(15, 23, 42, 0.03);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.dashboard-composer:focus-within {
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.14), 0 8px 24px rgba(15, 23, 42, 0.06);
}
.dashboard-composer textarea {
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-height: 86px;
  max-height: 220px;
  resize: vertical;
  border: 0;
  outline: none;
  padding: 16px 18px 10px;
  background: transparent;
  color: var(--text, #0f172a);
  font: inherit;
  font-size: 13.5px;
  line-height: 1.6;
}
.dashboard-composer textarea::placeholder {
  color: var(--muted, #94a3b8);
}
.composer-prompts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 16px 12px;
}
.prompt-chip {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 999px;
  padding: 4px 10px;
  background: var(--surface, #f8fafc);
  color: var(--muted, #64748b);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.prompt-chip:hover {
  border-color: #7dd3fc;
  background: color-mix(in srgb, #0284c7 8%, var(--panel, #ffffff));
  color: #0284c7;
}
.composer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-top: 1px solid var(--border, #eef2f6);
  background: color-mix(in srgb, var(--surface, #f8fafc) 65%, var(--panel, #ffffff));
  border-radius: 0 0 15px 15px;
  color: var(--muted, #64748b);
  font-size: 12px;
}
.composer-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-wrap: wrap;
}
.repo-picker-anchor,
.model-picker-anchor {
  position: relative;
  min-width: 0;
}
.model-toggle svg {
  color: #6366f1;
}
.repo-picker-list button.chosen {
  background: color-mix(in srgb, #0284c7 10%, var(--surface, #f1f5f9));
  color: #0369a1;
  font-weight: 600;
}
.repo-picker-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 240px;
  border: 1px solid var(--border, #dbe3ee);
  border-radius: 9px;
  padding: 6px 10px;
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.repo-picker-toggle:hover {
  border-color: #93c5fd;
}
.repo-picker-toggle.selected {
  border-color: #7dd3fc;
  background: color-mix(in srgb, #0284c7 8%, var(--panel, #ffffff));
  color: #0369a1;
}
.repo-picker-toggle svg,
.ai-safe-tag svg {
  width: 13px;
  height: 13px;
  flex: none;
}
.repo-picker-toggle span:nth-child(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.repo-picker-toggle .caret {
  font-size: 10px;
  opacity: 0.7;
}
.ai-safe-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--muted, #64748b);
}
.ai-safe-tag svg {
  color: #6366f1;
}
.ai-safe-tag small {
  font-size: 11px;
  opacity: 0.85;
}
.composer-submit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  border-radius: 9px;
  padding: 7px 14px;
  background: linear-gradient(135deg, #0284c7, #2563eb);
  color: #ffffff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(37, 99, 235, 0.24);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}
.composer-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(37, 99, 235, 0.3);
}
.composer-submit:disabled {
  background: var(--border, #e2e8f0);
  color: var(--muted, #94a3b8);
  box-shadow: none;
  cursor: not-allowed;
}

/* Repo Picker Popover */
.repo-picker {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 60;
  width: 310px;
  max-width: 78vw;
  padding: 12px;
  border: 1px solid var(--border, #dbe3ee);
  border-radius: 14px;
  background: var(--panel, #ffffff);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.16);
  color: var(--text, #334155);
}
.repo-picker-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.repo-picker-head strong {
  font-size: 12px;
}
.repo-picker-head button {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  padding: 2px 7px;
  background: var(--surface, #f8fafc);
  color: var(--text, #334155);
  cursor: pointer;
}
.repo-picker input {
  box-sizing: border-box;
  width: 100%;
  padding: 7px 10px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 8px;
  background: var(--surface, #f8fafc);
  color: var(--text, #334155);
  font: inherit;
  font-size: 12px;
  outline: none;
}
.repo-picker input:focus {
  border-color: #38bdf8;
}
.repo-picker-list {
  max-height: 220px;
  overflow: auto;
  margin-top: 8px;
}
.repo-picker-list button {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border: 0;
  border-radius: 8px;
  text-align: left;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.repo-picker-list button:hover {
  background: var(--surface, #f1f5f9);
}
.repo-picker-list button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.repo-picker-list small {
  flex: none;
  font-size: 10.5px;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--surface, #f1f5f9);
  color: var(--muted, #64748b);
}
.repo-picker-hint {
  font-size: 11px;
  line-height: 1.5;
  color: var(--muted, #64748b);
  margin: 8px 0 0;
}
.repo-picker-clear {
  margin-top: 8px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 7px;
  padding: 5px 9px;
  background: var(--surface, #f8fafc);
  color: var(--muted, #64748b);
  font-size: 11px;
  cursor: pointer;
}

/* Main Sections */
.dashboard-section {
  margin-top: 26px;
}
.section-heading,
.side-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}
.section-heading h3,
.side-heading h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  margin: 0;
}
.section-heading small,
.side-heading small {
  display: block;
  color: var(--muted, #94a3b8);
  font-size: 11px;
  margin-top: 2px;
}
.section-heading a,
.section-heading button,
.side-heading button {
  border: 0;
  background: none;
  color: #0284c7;
  font: inherit;
  font-size: 11.5px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}
.section-heading a:hover,
.section-heading button:hover,
.side-heading button:hover {
  background: color-mix(in srgb, #0284c7 10%, transparent);
}
.dashboard-list {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 14px;
  overflow: hidden;
  background: var(--panel, #ffffff);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.025);
}
.list-row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 13px 16px;
  border: 0;
  border-bottom: 1px solid var(--border, #eef2f6);
  background: transparent;
  color: inherit;
  text-decoration: none;
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.list-row:last-child {
  border-bottom: 0;
}
.list-row:hover {
  background: var(--surface, #f8fafc);
}
.list-row:hover .row-arrow {
  transform: translate(2px, -2px);
  color: #0284c7;
}
.row-badge {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  flex: none;
}
.row-badge svg {
  width: 14px;
  height: 14px;
}
.row-badge.session {
  background: rgba(99, 102, 241, 0.11);
  color: #4f46e5;
}
.row-badge.pull {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}
.row-copy {
  flex: 1;
  min-width: 0;
}
.row-copy strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 650;
  color: var(--heading, #0f172a);
}
.row-copy small {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 4px;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.meta-pill {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--surface, #f1f5f9);
  color: var(--text, #334155);
  font-size: 10.5px;
  font-weight: 600;
}
.row-arrow,
.row-meta {
  color: var(--muted, #94a3b8);
  font-size: 11.5px;
  white-space: nowrap;
  transition: transform 0.15s ease, color 0.15s ease;
}

/* Skeleton Loader */
.skeleton-list {
  padding: 8px 16px;
}
.skeleton-list.compact {
  padding: 4px 0 2px;
}
.skeleton-row {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 8px 0;
}
.sk-dot {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: var(--surface, #eef2f6);
  flex: none;
  animation: skPulse 1.3s ease-in-out infinite;
}
.sk-dot.sm {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.sk-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sk-line {
  height: 10px;
  border-radius: 999px;
  background: var(--surface, #eef2f6);
  animation: skPulse 1.3s ease-in-out infinite;
}
.sk-line.w-70 { width: 70%; }
.sk-line.w-65 { width: 65%; }
.sk-line.w-60 { width: 60%; }
.sk-line.w-52 { width: 52%; }
.sk-line.w-48 { width: 48%; }
.sk-line.w-45 { width: 45%; }
.sk-line.w-40 { width: 40%; }
.sk-line.w-35 { width: 35%; }
.sk-line.w-32 { width: 32%; }
.sk-line.w-30 { width: 30%; }
@keyframes skPulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

.empty,
.side-empty,
.inline-error {
  margin: 0;
  padding: 18px 16px;
  color: var(--muted, #64748b);
  font-size: 12px;
  line-height: 1.55;
}
.side-empty {
  padding: 10px 2px 4px;
}
.inline-error {
  color: #c2410c;
  overflow-wrap: anywhere;
}

/* Right Sidebar */
.dashboard-side {
  position: sticky;
  top: 20px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.side-card {
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 16px;
  padding: 16px;
  background: var(--panel, #ffffff);
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.025);
}
.repo-rows,
.quick-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.repo-row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  border: 0;
  border-radius: 10px;
  padding: 8px 8px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.repo-row:hover {
  background: var(--surface, #f8fafc);
}
.repo-lang-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: none;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.06);
}
.repo-info {
  flex: 1;
  min-width: 0;
}
.repo-row strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12.5px;
  font-weight: 650;
  color: var(--heading, #0f172a);
}
.repo-owner {
  font-weight: 450;
  color: var(--muted, #64748b);
}
.repo-row small {
  display: block;
  margin-top: 3px;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.quick-card button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 10px;
  padding: 8px 8px;
  background: transparent;
  color: var(--text, #1e293b);
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.quick-card button:hover {
  background: var(--surface, #f8fafc);
}
.quick-card button:hover .quick-arrow {
  transform: translateX(2px);
  color: #0284c7;
}
.quick-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.quick-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex: none;
}
.quick-icon svg {
  width: 13px;
  height: 13px;
}
.quick-icon.star {
  background: rgba(245, 158, 11, 0.14);
  color: #d97706;
}
.quick-icon.trending {
  background: rgba(139, 92, 246, 0.12);
  color: #7c3aed;
}
.quick-icon.notify {
  background: rgba(14, 165, 233, 0.12);
  color: #0284c7;
}
.quick-icon.settings {
  background: rgba(100, 116, 139, 0.12);
  color: #475569;
}
.quick-arrow {
  color: var(--muted, #94a3b8);
  transition: transform 0.15s ease, color 0.15s ease;
}

@media (max-width: 1050px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 22px;
  }
  .dashboard-side {
    position: static;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }
}
@media (max-width: 600px) {
  .dashboard-layout {
    padding: 20px 16px;
  }
  .dashboard-heading h2 {
    font-size: 22px;
  }
  .row-meta {
    display: none;
  }
  .composer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
