<template>
  <section class="task-repositories" aria-label="关联 GitHub 仓库">
    <header><span>关联仓库 <small>仅本插件</small></span><button type="button" @click="selecting = !selecting">＋ 关联</button></header>
    <form v-if="selecting" @submit.prevent="linkRepo(query)">
      <input v-model="query" placeholder="搜索已加载仓库，或粘贴 GitHub 仓库链接" aria-label="仓库名称或链接" />
      <button type="submit">添加</button>
    </form>
    <div v-if="selecting && candidates.length" class="repo-candidates">
      <button v-for="repo in candidates" :key="repo.full_name" type="button" @click="linkRepo(repo.full_name)">{{ repo.full_name }}</button>
    </div>
    <p v-if="error" role="alert">{{ error }}</p>
    <div class="repo-cards">
      <article v-for="repo in links" :key="repo.fullName" class="repo-card">
        <header><a :href="'https://github.com/' + repo.fullName" target="_blank" rel="noreferrer"><span class="repo-mark">⌘</span> {{ repo.fullName }}</a><button type="button" :aria-label="'移除关联 ' + repo.fullName" @click="unlink(repo.fullName)">×</button></header>
        <p>{{ repo.description || 'GitHub 仓库' }}</p>
        <footer><span v-if="repo.stars !== undefined">☆ {{ repo.stars.toLocaleString() }}</span><span v-if="repo.language">{{ repo.language }}</span><span v-if="repo.updated">{{ repo.updated.slice(0, 10) }}</span></footer>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { gitHubService } from '../services/github.service';
import { readRepositoryLinks, writeRepositoryLinks, validRepositoryName as valid, type RepositoryLink as RepoLink } from './repository-links';
const props = defineProps<{ taskId: string }>();
const links = ref<RepoLink[]>([]), query = ref(''), error = ref(''), selecting = ref(false), readable = ref(false);
function reloadLinks() {
  try { links.value = readRepositoryLinks(props.taskId); readable.value = true; }
  catch { error.value = '关联记录读取失败，未覆盖已有数据。'; readable.value = false; }
}
function onLinkChange(event: Event) {
  if (event instanceof StorageEvent || (event as CustomEvent).detail === props.taskId) reloadLinks();
}
onMounted(() => { window.addEventListener('storage', onLinkChange); window.addEventListener('todoist-repository-links-changed', onLinkChange); });
onUnmounted(() => { window.removeEventListener('storage', onLinkChange); window.removeEventListener('todoist-repository-links-changed', onLinkChange); });
watch(() => props.taskId, () => {
  links.value = []; query.value = ''; selecting.value = false; error.value = ''; readable.value = false;
  reloadLinks();
}, { immediate: true });
const candidates = computed(() => gitHubService.repos.filter(r => r.full_name.toLowerCase().includes(query.value.toLowerCase()) && !links.value.some(l => l.fullName === r.full_name)).slice(0, 6));
function persist(next: RepoLink[]) {
  if (!props.taskId || !readable.value) return;
  try { writeRepositoryLinks(props.taskId, next); links.value = next; error.value = ''; }
  catch { error.value = '本地保存失败，请检查浏览器存储。'; }
}
function linkRepo(value: string) {
  let name = value.trim();
  if (name.startsWith('https://')) {
    try { const u = new URL(name); if (u.hostname !== 'github.com' || u.username || u.password) throw new Error(); name = u.pathname.replace(/^\/|\/$/g, ''); } catch { error.value = '请填写 GitHub 仓库地址。'; return; }
  }
  if (!valid(name)) { error.value = '请输入 owner/repo 或完整仓库链接。'; return; }
  if (links.value.some(r => r.fullName.toLowerCase() === name.toLowerCase())) { error.value = '该仓库已关联。'; return; }
  const repo = gitHubService.repos.find(r => r.full_name.toLowerCase() === name.toLowerCase());
  persist([...links.value, { fullName: name, description: repo?.description || '', stars: repo?.stargazers_count, language: repo?.language || undefined, updated: repo?.updated_at }]);
  if (!error.value) { query.value = ''; selecting.value = false; }
}
function unlink(name: string) { persist(links.value.filter(r => r.fullName !== name)); }
</script>
<style scoped>
.task-repositories { padding: 10px 0; border-top: 1px solid var(--border); }
header, footer, form { display: flex; align-items: center; gap: 8px; }
header { justify-content: space-between; font-size: 12px; color: var(--muted); }
small { font-size: 10px; margin-left: 5px; }
button { border: 0; background: transparent; color: var(--muted); cursor: pointer; font: inherit; padding: 3px 5px; }
button:hover { color: var(--text); background: var(--surface); border-radius: 4px; }
form { margin-top: 8px; }
input { min-width: 0; flex: 1; padding: 6px; border: 1px solid var(--border); border-radius: 5px; background: var(--panel); color: var(--text); font: inherit; }
.repo-candidates { display: flex; flex-direction: column; max-height: 140px; overflow: auto; align-items: stretch; }
.repo-candidates button { text-align: left; overflow-wrap: anywhere; }
.repo-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 8px; margin-top: 7px; }
.repo-card { min-width: 0; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); padding: 10px 12px; }
a { color: var(--heading); font-size: 13px; text-decoration: none; font-weight: 600; overflow-wrap: anywhere; }
a:hover { text-decoration: underline; }
.repo-mark { color: var(--muted); margin-right: 4px; }
p { font-size: 12px; line-height: 1.5; color: var(--muted); overflow-wrap: anywhere; margin: 8px 0; }
footer { border-top: 1px solid var(--border); padding-top: 7px; flex-wrap: wrap; font-size: 11px; color: var(--muted); }
</style>
