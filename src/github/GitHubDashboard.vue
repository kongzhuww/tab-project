<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { loadGitHubAccountSettings } from "./account-settings";
import { createGitHubReadHeaders, readGitHubJson } from "./api-client";
import { githubRepoDetailController } from "./repo-detail-store";
import { loadConversations } from "../services/byok.service";
import { requestAiConversation, requestAiDraft } from "../multica/workspace-bridge";
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
let controller: AbortController | undefined;
let version = 0;
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
async function load(): Promise<void> {
  controller?.abort();
  const scope = new AbortController(); controller = scope;
  const current = ++version;
  const alive = () => props.active && current === version && !scope.signal.aborted;
  username.value = ""; repos.value = []; pulls.value = []; sessions.value = [];
  accountError.value = ""; reposError.value = ""; pullsError.value = ""; sessionsError.value = "";
  githubLoading.value = true; sessionLoading.value = true;
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
    if (!user) { accountError.value = "配置 GitHub 用户名后即可查看仓库和 Pull Request。"; return; }
    if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(user)) throw new Error("GitHub 用户名格式无效，请检查设置。");
    username.value = user;
    const params = new URLSearchParams({ q: `is:pr is:open author:${user}`, sort: "updated", order: "desc", per_page: "5" });
    const [repositoryResult, pullResult] = await Promise.allSettled([
      readGitHubJson<unknown>(`/users/${encodeURIComponent(user)}/repos?type=owner&sort=updated&per_page=6`, { headers, signal: scope.signal, maxBytes: 1024 * 1024 }),
      readGitHubJson<{ items?: unknown }>(`/search/issues?${params}`, { headers, signal: scope.signal, maxBytes: 1024 * 1024 })
    ]);
    if (!alive()) return;
    if (repositoryResult.status === "fulfilled" && Array.isArray(repositoryResult.value.data)) repos.value = repositoryResult.value.data.filter(validRepo).slice(0, 6);
    else reposError.value = repositoryResult.status === "rejected" ? errorText(repositoryResult.reason) : "仓库响应格式异常。";
    if (pullResult.status === "fulfilled" && Array.isArray(pullResult.value.data?.items)) pulls.value = pullResult.value.data.items.filter((p: any) => p && typeof p.title === "string" && safePullUrl(p.html_url)).slice(0, 5);
    else pullsError.value = pullResult.status === "rejected" ? errorText(pullResult.reason) : "Pull Request 响应格式异常。";
  } catch (error) { if (alive()) accountError.value = errorText(error); }
  finally { if (alive()) githubLoading.value = false; }
}
watch(() => [props.active, props.accountRevision] as const, ([active]) => {
  if (active) void load();
  else { ++version; controller?.abort(); }
}, { immediate: true });
onBeforeUnmount(() => { ++version; controller?.abort(); pickerRequest?.abort(); });
function openDraft(): void {
  if (!input.value.trim()) return;
  const repo = selectedRepo.value;
  const resource: ResourceAttachment | undefined = repo ? { kind:"github", id:repo.fullName, title:repo.fullName, url:`https://github.com/${repo.fullName}`, description:repo.description, language:repo.language, visibility:repo.isPrivate ? "private" : "public" } : undefined;
  requestAiDraft(input.value.trim(), resource);
  openRegisteredCard("multica");
}
function openSession(item: Session): void {
  requestAiConversation("deepseek", item.id);
  openRegisteredCard("multica");
}
function openAi(): void { openRegisteredCard("multica"); }
function repoNameFromPull(pull: Pull): string { const url = safePullUrl(pull.html_url); return url ? new URL(url).pathname.split("/").slice(1, 3).join("/") : ""; }
</script>

<template>
  <div class="gh-dashboard">
    <div class="dashboard-layout">
      <main class="dashboard-main">
        <div class="dashboard-search"><slot name="search" /></div>
        <div v-if="showResults"><slot name="results" /></div>
        <div v-show="!showResults" class="dashboard-home-content">
        <div class="dashboard-heading"><div><span class="eyebrow">GITHUB WORKSPACE</span><h2>{{ greeting }}<template v-if="username">，{{ username }}</template>。</h2></div><button type="button" class="subtle-button" @click="load">↻ 刷新</button></div>
        <div class="dashboard-composer">
          <textarea v-model="input" placeholder="有什么想法？在 AI 工作区继续探索…" aria-label="发送到 AI 工作区的草稿" maxlength="100000"></textarea>
          <div class="composer-bottom"><div class="composer-left"><div class="repo-picker-anchor"><button type="button" class="repo-picker-toggle" :aria-expanded="repoPickerOpen" @click="toggleRepoPicker">⌘ {{ selectedRepo ? selectedRepo.fullName : '选择仓库' }} ▾</button><div v-if="repoPickerOpen" class="repo-picker"><div class="repo-picker-head"><strong>选择我的仓库</strong><button type="button" title="刷新仓库" :disabled="repoPickerLoading" @click="loadOwnRepos">↻</button></div><input v-model="repoQuery" placeholder="搜索仓库名称…" aria-label="搜索我的仓库" /><p v-if="repoPickerLoading" class="repo-picker-hint">正在读取仓库…</p><p v-else-if="repoPickerError" class="repo-picker-hint" role="alert">{{ repoPickerError }} <button type="button" @click="loadOwnRepos">重试</button></p><p v-if="repoPickerWarning" class="repo-picker-hint">{{ repoPickerWarning }}</p><div class="repo-picker-list"><button v-for="repo in filteredOwnRepos" :key="repo.fullName" type="button" @click="chooseRepo(repo)"><span>{{ repo.fullName }}</span><small>{{ repo.isPrivate ? '私有' : '公开' }}</small></button><p v-if="!repoPickerLoading && !repoPickerError && !filteredOwnRepos.length" class="repo-picker-hint">没有找到仓库。</p></div><button v-if="selectedRepo" type="button" class="repo-picker-clear" @click="selectedRepo = null; repoPickerOpen = false">不选择仓库</button><p class="repo-picker-hint">仅附带仓库链接与简介；发送时会共享所选信息，README 需手动读取。</p></div></div><span>✳ &nbsp;AI 工作区 <small>· 不会自动发送</small></span></div><button type="button" :disabled="!input.trim()" @click="openDraft">继续到 AI 工作区 <span>↗</span></button></div>
        </div>
        <section class="dashboard-section">
          <div class="section-heading"><div><h3>最近会话</h3><small>DeepSeek 本机记录</small></div><button type="button" @click="openAi">查看全部 <span>→</span></button></div>
          <div class="dashboard-list">
            <p v-if="sessionLoading" class="empty">正在读取会话…</p>
            <p v-else-if="!sessions.length" class="empty">暂无可显示的会话，打开 AI 工作区开始对话。</p>
            <button v-for="session in sessions" :key="`${session.kind}:${session.id}`" type="button" class="list-row" @click="openSession(session)"><span class="status-dot"></span><span class="row-copy"><strong>{{ session.title }}</strong><small>DeepSeek · {{ session.model }}<template v-if="session.updated"> · {{ relativeTime(session.updated) }}</template></small></span><span class="row-arrow">↗</span></button>
            <p v-if="sessionsError" class="inline-error">{{ sessionsError }}</p>
          </div>
        </section>
        <section class="dashboard-section">
          <div class="section-heading"><div><h3>Pull requests</h3><small>由你创建、尚未关闭</small></div><a v-if="username" :href="`https://github.com/pulls?q=${encodeURIComponent(`is:pr is:open author:${username}`)}`" target="_blank" rel="noopener noreferrer">查看全部 ↗</a></div>
          <div class="dashboard-list">
            <p v-if="githubLoading" class="empty">正在读取 Pull Request…</p>
            <p v-else-if="accountError" class="empty">{{ accountError }}</p>
            <p v-else-if="pullsError" class="inline-error">{{ pullsError }}</p>
            <p v-else-if="!pulls.length" class="empty">没有找到未关闭的 Pull Request。</p>
            <a v-for="pull in pulls" :key="pull.html_url" class="list-row" :href="safePullUrl(pull.html_url)" target="_blank" rel="noopener noreferrer"><span class="pull-icon">⑂</span><span class="row-copy"><strong>{{ pull.title }}</strong><small>{{ repoNameFromPull(pull) }} #{{ pull.number }}<template v-if="pull.updated_at"> · 更新于 {{ relativeTime(pull.updated_at) }}</template></small></span><span class="row-meta">{{ pull.comments || 0 }} 条评论 ↗</span></a>
          </div>
        </section>
        </div>
      </main>
      <aside class="dashboard-side">
        <section class="side-card"><div class="side-heading"><div><h3>最近更新的仓库</h3><small>GitHub 公开仓库</small></div><button type="button" @click="emit('channel','repos')">全部 →</button></div>
          <p v-if="githubLoading" class="side-empty">正在读取仓库…</p><p v-else-if="accountError" class="side-empty">{{ accountError }}</p><p v-else-if="reposError" class="inline-error">{{ reposError }}</p><p v-else-if="!repos.length" class="side-empty">暂无公开仓库。</p>
          <button v-for="repo in repos" :key="repo.full_name" type="button" class="repo-row" @click="githubRepoDetailController.open(repo.full_name, undefined, repo)"><span class="repo-mark">▣</span><span><strong>{{ repo.full_name }}</strong><small>{{ repo.language || '仓库' }}<template v-if="repo.updated_at"> · {{ relativeTime(repo.updated_at) }}</template></small></span></button>
        </section>
        <section class="side-card quick-card"><div class="side-heading"><div><h3>快捷入口</h3><small>你的 GitHub 工作台</small></div></div><button type="button" @click="emit('channel','stars')"><span>⭐ &nbsp;Star 收藏</span><span>→</span></button><button type="button" @click="emit('channel','trending')"><span>◈ &nbsp;开源发现</span><span>→</span></button><button type="button" @click="emit('notifications')"><span>♧ &nbsp;GitHub 通知</span><span>→</span></button><button type="button" @click="emit('settings', $event.currentTarget as HTMLElement)"><span>⚙ &nbsp;账号设置</span><span>→</span></button></section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.gh-dashboard{flex:1;min-width:0;min-height:0;overflow:auto;background:var(--panel,#fff);color:var(--text,#26334b)}
.dashboard-search{margin-bottom:26px}.dashboard-search :deep(.card-fullscreen-gh-search){width:100%;max-width:none;min-width:0;margin:0}
.composer-left{display:flex;align-items:center;gap:10px;min-width:0}.repo-picker-anchor{position:relative;min-width:0}.composer-bottom .repo-picker-toggle{max-width:230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.repo-picker{position:absolute;top:calc(100% + 12px);left:0;z-index:60;width:300px;max-width:75vw;padding:10px;border:1px solid var(--border,#e2e8f0);border-radius:10px;background:var(--panel,#fff);box-shadow:0 8px 28px #0003;color:var(--text,#334155)}.repo-picker-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.repo-picker-head strong{font-size:12px}.repo-picker input{box-sizing:border-box;width:100%;padding:7px 8px;border:1px solid var(--border,#e2e8f0);border-radius:6px;background:var(--surface,#f8fafc);color:var(--text,#334155);font:inherit;font-size:12px}.repo-picker-list{max-height:220px;overflow:auto;margin-top:6px}.composer-bottom .repo-picker-list button{display:flex;width:100%;justify-content:space-between;align-items:center;gap:8px;padding:8px;text-align:left;background:transparent}.repo-picker-list button:hover{background:var(--surface,#f1f5f9)}.repo-picker-list button span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.repo-picker-list small{flex:none;color:var(--muted,#64748b)}.repo-picker-hint{font-size:11px;line-height:1.5;color:var(--muted,#64748b)}.repo-picker-clear{margin-top:6px}
.dashboard-side{position:sticky;top:20px;align-self:start}
@media(max-width:1050px){.dashboard-side{position:static}}
.dashboard-layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:32px;max-width:1280px;margin:0 auto;padding:38px 38px 60px;box-sizing:border-box}.dashboard-main,.dashboard-side{min-width:0}.dashboard-heading{display:flex;align-items:end;justify-content:space-between;gap:16px}.eyebrow{color:var(--muted,#8190a4);font-size:10px;letter-spacing:.13em;font-weight:700}.dashboard-heading h2{font-size:25px;letter-spacing:-.03em;color:var(--heading,#1f2937);margin:8px 0 18px}.subtle-button,.section-heading button,.side-heading button{border:0;background:none;color:var(--muted,#64748b);font:inherit;font-size:12px;cursor:pointer}.subtle-button{margin-bottom:20px}.dashboard-composer{border:1px solid var(--border-strong,#cbd5e1);border-radius:11px;background:var(--panel,#fff);overflow:visible;box-shadow:0 2px 8px #00000008}.dashboard-composer:focus-within{border-color:#6579dc;box-shadow:0 0 0 2px #6579dc22}.dashboard-composer textarea{box-sizing:border-box;display:block;width:100%;min-height:91px;resize:vertical;max-height:230px;border:0;outline:none;padding:15px;background:transparent;color:var(--text,#26334b);font:inherit;font-size:13px}.composer-bottom{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 12px;border-top:1px solid var(--border,#e5e7eb);color:var(--muted,#64748b);font-size:12px}.composer-bottom small{font-size:11px}.composer-bottom button{border:0;border-radius:7px;padding:7px 10px;background:var(--surface,#f1f5f9);color:var(--text,#334155);font-size:11px;cursor:pointer}.composer-bottom button:disabled{opacity:.5;cursor:not-allowed}.dashboard-section{margin-top:33px}.section-heading,.side-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.section-heading h3,.side-heading h3{font-size:13px;color:var(--heading,#1f2937);margin:0}.section-heading small,.side-heading small{display:block;color:var(--muted,#94a3b8);font-size:10px;margin-top:4px}.section-heading a,.section-heading button,.side-heading button{color:#6474cc;font-size:11px;text-decoration:none;white-space:nowrap}.dashboard-list{border:1px solid var(--border,#e2e8f0);border-radius:10px;overflow:hidden}.list-row{box-sizing:border-box;display:flex;align-items:center;gap:12px;width:100%;min-width:0;padding:14px 15px;border:0;border-bottom:1px solid var(--border,#e2e8f0);background:transparent;color:inherit;text-decoration:none;text-align:left;font:inherit;cursor:pointer}.list-row:last-child{border-bottom:0}.list-row:hover,.repo-row:hover,.quick-card button:hover{background:var(--surface,#f1f5f9)}.status-dot{width:7px;height:7px;background:#a8b5c7;border-radius:50%;flex:none}.pull-icon{color:#2da06a;font-size:18px}.row-copy{flex:1;min-width:0}.row-copy strong,.repo-row strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:650;color:var(--heading,#1f2937)}.row-copy small,.repo-row small{display:block;margin-top:5px;font-size:10px;color:var(--muted,#64748b)}.row-arrow,.row-meta{color:var(--muted,#94a3b8);font-size:11px;white-space:nowrap}.empty,.side-empty,.inline-error{margin:0;padding:18px 15px;color:var(--muted,#64748b);font-size:12px;line-height:1.55}.inline-error{color:#c07832;overflow-wrap:anywhere}.dashboard-side{padding-top:3px}.side-card{border:1px solid var(--border,#e2e8f0);border-radius:11px;padding:15px;margin-bottom:16px;background:var(--panel,#fff)}.repo-row{display:flex;align-items:center;width:100%;gap:10px;border:0;border-radius:7px;padding:9px 5px;background:transparent;color:inherit;text-align:left;cursor:pointer}.repo-row>span:last-child{min-width:0}.repo-mark{color:var(--muted,#94a3b8);font-size:15px}.quick-card button{display:flex;width:100%;justify-content:space-between;border:0;border-radius:7px;padding:9px 6px;background:none;color:var(--text,#334155);font:inherit;font-size:12px;cursor:pointer}.quick-card button span:last-child{color:var(--muted,#94a3b8)}@media(max-width:1050px){.dashboard-layout{grid-template-columns:1fr;padding:28px;gap:25px}.dashboard-side{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}.side-card{margin:0}}@media(max-width:600px){.dashboard-layout{padding:22px 16px}.dashboard-heading h2{font-size:21px}.row-meta{display:none}.composer-bottom{align-items:flex-start;flex-direction:column}}
</style>
