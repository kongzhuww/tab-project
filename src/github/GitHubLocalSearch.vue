<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { gitHubService } from "../services/github.service";
import { starBoardData } from "./stars-board-data";
import { githubRepoDetailController } from "./repo-detail-store";
import GitHubStarButton from "./GitHubStarButton.vue";
import { githubStatusState } from "./store";
const emit = defineEmits<{ back: [] }>();
const page = ref(1);
const results = computed(() => {
  // The service publishes fresh board snapshots after any category, data or search change.
  void starBoardData.repos; void starBoardData.repoListNames; void starBoardData.searchQuery; void starBoardData.activeSection; void starBoardData.loading;
  return gitHubService.getDashboardSearchResults();
});
const items = computed(() => results.value.slice((page.value - 1) * 20, page.value * 20));
const totalPages = computed(() => Math.max(1, Math.ceil(results.value.length / 20)));
watch(() => starBoardData.searchQuery, () => { page.value = 1; });
watch(totalPages, total => { if (page.value > total) page.value = total; });
</script>
<template>
  <div class="local-search">
    <header><div><h3>当前分类搜索</h3><p>{{ gitHubService.active }} · “{{ starBoardData.searchQuery }}”</p></div><button type="button" @click="emit('back')">返回首页</button></header>
    <p v-if="githubStatusState.accountConfigured === false" class="notice">请先在账号设置中配置 GitHub 用户名，然后搜索已加载的 Star 仓库。</p>
    <p v-else class="summary">{{ starBoardData.loading ? '正在读取 Star 仓库，结果可能尚未完整 · ' : '' }}{{ results.length }} 个结果</p>
    <p v-if="!results.length && githubStatusState.accountConfigured !== false" class="notice">{{ starBoardData.loading ? '正在读取仓库…' : '当前分类没有匹配的仓库。' }}</p>
    <div v-if="items.length" class="grid">
      <article v-for="repo in items" :key="repo.full_name" class="repo-card">
        <div class="repo-head"><button type="button" class="repo-name" @click="githubRepoDetailController.open(repo.full_name, undefined, repo)">{{ repo.full_name }}</button><GitHubStarButton :repo="repo" already-starred /></div>
        <p>{{ repo.description || '暂无描述' }}</p>
        <div class="meta"><span v-if="repo.language">{{ repo.language }}</span><span>★ {{ (repo.stargazers_count || 0).toLocaleString() }}</span><span>⑂ {{ (repo.forks_count || 0).toLocaleString() }}</span></div>
      </article>
    </div>
    <div v-if="totalPages > 1" class="pager"><button type="button" :disabled="page <= 1" @click="page--">‹ 上一页</button><span>{{ page }} / {{ totalPages }}</span><button type="button" :disabled="page >= totalPages" @click="page++">下一页 ›</button></div>
  </div>
</template>
<style scoped>
.local-search{min-width:0;color:var(--text,#334155)}header{display:flex;justify-content:space-between;align-items:center;gap:16px}h3{margin:0;color:var(--heading,#0f172a);font-size:19px}header p,.summary{color:var(--muted,#64748b);font-size:12px;margin:7px 0 0}header button,.pager button{border:1px solid var(--border,#e2e8f0);border-radius:8px;background:var(--surface,#f1f5f9);color:var(--text,#334155);padding:8px 13px;cursor:pointer}.summary{margin:18px 0 12px}.notice{padding:35px 0;text-align:center;color:var(--muted,#64748b);font-size:12px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:12px}.repo-head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;min-width:0}.repo-card{position:relative;box-sizing:border-box;display:flex;flex-direction:column;height:164px;min-width:0;overflow:hidden;border:1px solid var(--border,#e2e8f0);border-radius:10px;padding:14px;background:var(--panel,#fff)}.repo-name{display:-webkit-box;flex:1;max-width:100%;min-height:0;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2;padding:0;border:0;background:none;color:var(--heading,#0f172a);font-size:14px;font-weight:650;text-align:left;overflow-wrap:anywhere;cursor:pointer}.repo-name:hover{text-decoration:underline}.repo-card p{display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:3;margin:9px 0;color:var(--muted,#64748b);font-size:12px;line-height:1.45;overflow-wrap:anywhere}.meta{display:flex;gap:14px;margin-top:auto;color:var(--muted,#64748b);font-size:11px}.pager{display:flex;justify-content:center;align-items:center;gap:12px;margin-top:22px;font-size:12px}.pager button:disabled{opacity:.4;cursor:not-allowed}
</style>
