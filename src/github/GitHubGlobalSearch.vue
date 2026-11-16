<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { GitHubReadError, loadGitHubReadHeaders, readGitHubJson } from "./api-client";
import { githubRepoDetailController } from "./repo-detail-store";
import GitHubStarButton from "./GitHubStarButton.vue";
import { GH_SEARCH_SYNONYMS, type GitHubSearchRule } from "../services/github.service";

const props = defineProps<{ query: string; requestId: number; rule: GitHubSearchRule; embedded?: boolean }>();
const emit = defineEmits<{ back: [] }>();
const input = ref(props.query);
const keyword = ref("");
const page = ref(1);
const total = ref(0);
const incomplete = ref(false);
const results = ref<any[]>([]);
const loading = ref(false);
const error = ref("");
let request: AbortController | undefined;
const perPage = 20;

function buildQuery(query: string): string {
  if (props.rule === "exact") return `"${query.replace(/"/g, "")}" in:name,description`;
  if (props.rule === "topic") return `topic:${query.replace(/\s+/g, "-")}`;
  if (props.rule === "smart") {
    const synonyms = (GH_SEARCH_SYNONYMS as Record<string, string[]>)[query.toLowerCase()] || [];
    if (synonyms.length) return `${query} ${synonyms.slice(0, 3).join(" OR ")}`;
  }
  return query;
}

async function search(query: string, nextPage = 1): Promise<void> {
  const q = query.trim();
  if (!q) return;
  request?.abort();
  const current = new AbortController();
  request = current;
  input.value = q;
  keyword.value = q;
  page.value = nextPage;
  results.value = [];
  total.value = 0;
  incomplete.value = false;
  error.value = "";
  loading.value = true;
  try {
    const headers = await loadGitHubReadHeaders(current.signal);
    const params = new URLSearchParams({ q: buildQuery(q), sort: "stars", order: "desc", per_page: String(perPage), page: String(nextPage) });
    const { data } = await readGitHubJson<{ items?: unknown; total_count?: number; incomplete_results?: boolean }>(`/search/repositories?${params}`, { headers, signal: current.signal, maxBytes: 2 * 1024 * 1024 });
    if (request !== current || current.signal.aborted) return;
    if (!Array.isArray(data?.items)) throw new Error("GitHub 搜索响应格式异常");
    results.value = data.items.filter((item: any) => typeof item?.full_name === "string" && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(item.full_name));
    total.value = typeof data.total_count === "number" ? Math.max(0, data.total_count) : 0;
    incomplete.value = data.incomplete_results === true;
  } catch (err) {
    if (request !== current || current.signal.aborted) return;
    error.value = err instanceof GitHubReadError || err instanceof Error ? err.message : "请稍后重试";
  } finally {
    if (request === current) loading.value = false;
  }
}

function openRepo(repo: any): void {
  githubRepoDetailController.open(repo.full_name, undefined, repo);
}
watch(() => props.requestId, () => { void search(props.query); }, { immediate: true });
onBeforeUnmount(() => { request?.abort(); });
</script>

<template>
  <div class="gh-global-search" :class="{ 'is-embedded': embedded }">
    <header class="gh-global-header">
      <div><h3>GitHub 仓库搜索</h3><p>在插件内查看公开仓库和 README</p></div>
      <button type="button" class="gh-global-back" @click="emit('back')">{{ embedded ? '返回首页' : '返回收藏' }}</button>
    </header>
    <form v-if="!embedded" class="gh-global-form" role="search" @submit.prevent="search(input)">
      <input v-model="input" type="search" placeholder="搜索 GitHub 仓库…" aria-label="搜索 GitHub 仓库" />
      <button type="submit">搜索</button>
    </form>
    <p v-if="loading" class="gh-global-message" role="status">正在搜索 GitHub 仓库…</p>
    <div v-else-if="error" class="gh-global-message" role="alert"><p>搜索失败：{{ error }}</p><button type="button" class="gh-global-back" @click="search(keyword, page)">重试</button></div>
    <template v-else>
      <p class="gh-global-summary">“{{ keyword }}” · {{ total.toLocaleString() }} 个结果<span v-if="incomplete"> · GitHub 标记为不完整结果</span></p>
      <p v-if="!results.length" class="gh-global-message">没有找到仓库，换个关键词试试。</p>
      <div v-else class="gh-global-grid">
        <article v-for="repo in results" :key="repo.full_name" class="gh-global-card">
          <div class="gh-global-card-head"><button type="button" class="gh-global-repo" @click="openRepo(repo)">{{ repo.full_name }}</button><GitHubStarButton :repo="repo" /></div>
          <p>{{ repo.description || '暂无描述' }}</p>
          <div class="gh-global-meta"><span v-if="repo.language">{{ repo.language }}</span><span>★ {{ (repo.stargazers_count || 0).toLocaleString() }}</span><span>⑂ {{ (repo.forks_count || 0).toLocaleString() }}</span></div>
        </article>
      </div>
      <div v-if="page > 1 || page * perPage < Math.min(total, 1000)" class="gh-global-pager">
        <button type="button" :disabled="page <= 1" @click="search(keyword, page - 1)">‹ 上一页</button>
        <span>第 {{ page }} 页</span>
        <button type="button" :disabled="page * perPage >= Math.min(total, 1000)" @click="search(keyword, page + 1)">下一页 ›</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.gh-global-search { flex:1; min-height:0; overflow:auto; padding:20px 22px 28px; color:var(--text,#334155); }
.gh-global-search.is-embedded { overflow:visible; padding:0; }
.gh-global-search.is-embedded .gh-global-summary { margin-top:18px; }
.gh-global-header { display:flex; align-items:center; justify-content:space-between; gap:16px; }
.gh-global-header h3 { margin:0; color:var(--heading,#0f172a); font-size:19px; }
.gh-global-header p,.gh-global-summary { color:var(--muted,#64748b); font-size:12px; margin:7px 0 0; }
.gh-global-form { display:flex; gap:8px; margin:20px 0 16px; }
.gh-global-form input { flex:1; min-width:0; padding:10px 12px; border:1px solid var(--border,#e2e8f0); border-radius:8px; background:var(--panel,#fff); color:var(--text,#334155); }
.gh-global-form button,.gh-global-back,.gh-global-pager button { border:1px solid var(--border,#e2e8f0); border-radius:8px; background:var(--surface,#f1f5f9); color:var(--text,#334155); padding:8px 13px; cursor:pointer; }
.gh-global-form button:hover,.gh-global-back:hover,.gh-global-pager button:hover:not(:disabled) { background:var(--surface-hover,#e2e8f0); }
.gh-global-message { padding:35px 0; color:var(--muted,#64748b); text-align:center; }
.gh-global-summary { margin-bottom:12px; }
.gh-global-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr)); gap:12px; }
.gh-global-card-head { display:flex; align-items:flex-start; justify-content:space-between; gap:8px; min-width:0; }
.gh-global-card { position:relative; box-sizing:border-box; display:flex; flex-direction:column; height:164px; min-width:0; overflow:hidden; border:1px solid var(--border,#e2e8f0); border-radius:10px; padding:14px; background:var(--panel,#fff); }
.gh-global-repo { display:-webkit-box; flex:1; max-width:100%; min-height:0; overflow:hidden; -webkit-box-orient:vertical; -webkit-line-clamp:2; padding:0; border:0; background:none; color:var(--heading,#0f172a); font-size:14px; font-weight:650; text-align:left; overflow-wrap:anywhere; cursor:pointer; }
.gh-global-repo:hover { text-decoration:underline; }
.gh-global-card p { display:-webkit-box; overflow:hidden; -webkit-box-orient:vertical; -webkit-line-clamp:3; margin:9px 0; color:var(--muted,#64748b); font-size:12px; line-height:1.45; overflow-wrap:anywhere; }
.gh-global-meta { display:flex; gap:14px; margin-top:auto; color:var(--muted,#64748b); font-size:11px; }
.gh-global-pager { display:flex; justify-content:center; align-items:center; gap:12px; margin-top:22px; font-size:12px; }
.gh-global-pager button:disabled { opacity:.4; cursor:not-allowed; }
</style>
