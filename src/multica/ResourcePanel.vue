<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import type { BiliFolderData, BiliVideoData } from '../services/bilibili.service';
import type { MyRepoItem } from '../github/my-repos-store';
import type { GitHubRawRepo } from '../services/github.service';
import type { GitHubUserList } from '../github/lists-client';
import BoardSelector from './BoardSelector.vue';
import { repositoriesInBoard } from './board-filters';
import LoadingIndicator from './LoadingIndicator.vue';
import type { ResourceAttachment } from './resource-content';
const props = defineProps<{ kind: 'bilibili' | 'github'; selectedResources: ResourceAttachment[]; disabled?: boolean }>();
const emit = defineEmits<{ close: []; select: [resource: ResourceAttachment] }>();
function isSelected(kind: ResourceAttachment['kind'], id: string) { return props.selectedResources.some(item => item.kind === kind && item.id.toLowerCase() === id.toLowerCase()); }
function selectVideo(video: BiliVideoData) {
  if (!/^BV[0-9A-Za-z]{10}$/.test(video.bvid || '')) return;
  emit('select', { kind:'bilibili', id:video.bvid, title:video.title, url:`https://www.bilibili.com/video/${video.bvid}`, author:video.upper?.name, duration:video.duration });
}
function selectRepo(repo: { fullName: string; description: string | null; language: string | null; visibility: 'public' | 'private' | 'unknown' }) {
  if (!/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(repo.fullName)) return;
  emit('select', { kind:'github', id:repo.fullName, title:repo.fullName, url:`https://github.com/${repo.fullName}`, description:repo.description || '', language:repo.language, visibility:repo.visibility });
}
const ready = ref(false), loading = ref(false), error = ref(''), warning = ref('');
const reposLoading = ref(false), reposError = ref(''), reposWarning = ref('');
let repoRequest: AbortController | null = null;
const selectedId = ref(''), folders = ref<BiliFolderData[]>([]), videos = ref<BiliVideoData[]>([]), total = ref(0);
const repoData = shallowRef<() => { repos: MyRepoItem[]; customGroups: string[]; repoGroupsMap: Record<string, string[]>; loading: boolean }>(() => ({ repos: [], customGroups: [], repoGroupsMap: {}, loading: false }));
const starData = shallowRef<() => { repos: GitHubRawRepo[]; lists: GitHubUserList[]; repoListNames: Map<string, string[]>; loading: boolean }>(() => ({ repos: [], lists: [], repoListNames: new Map(), loading: false }));
let generation = 0, alive = true;
function folderKey(folder: BiliFolderData) { return folder.isSeason ? `season:${folder.id}` : String(folder.id || folder.fid); }
const options = computed(() => {
  if (props.kind === 'bilibili') return folders.value.map(folder => ({ id: folderKey(folder), label: folder.title, group: folder.isOther ? '其他收藏' : folder.isCollected ? '收藏的合集 / 收藏夹' : '我创建的收藏夹' }));
  return [{ id: 'all', label: '我的全部仓库' }, { id: 'ungrouped', label: '未分类', group:'我的仓库' }, ...repoData.value().customGroups.map(name => ({ id:`group:${name}`, label:name, group:'我的仓库分组' })), { id:'star-all', label:'全部 Star 收藏' }, ...starData.value().lists.map(list => ({ id:`star-group:${list.name}`, label:list.name, group:'Star 收藏分组' }))];
});
const selected = computed(() => options.value.find(item => item.id === selectedId.value));
const isStarBoard = computed(() => selectedId.value === 'star-all' || selectedId.value.startsWith('star-group:'));
const displayedRepos = computed(() => {
  if (!isStarBoard.value) return repositoriesInBoard(repoData.value().repos, repoData.value().repoGroupsMap, selectedId.value).map(repo => ({ id:repo.id, fullName:repo.fullName, description:repo.description, language:repo.language, stargazersCount:repo.stargazersCount, badge:repo.isPrivate ? '私有' : '公开', visibility:repo.isPrivate ? 'private' as const : 'public' as const }));
  const data = starData.value(), group = selectedId.value.slice('star-group:'.length);
  return data.repos.filter(repo => selectedId.value === 'star-all' || (data.repoListNames.get(repo.full_name.toLowerCase()) || []).includes(group)).map(repo => ({ id:repo.id, fullName:repo.full_name, description:repo.description, language:repo.language, stargazersCount:repo.stargazers_count, badge:'Star', visibility: (repo as GitHubRawRepo & { private?: boolean }).private === true ? 'private' as const : (repo as GitHubRawRepo & { private?: boolean }).private === false ? 'public' as const : 'unknown' as const }));
});
function duration(seconds: number) { if (!Number.isFinite(seconds) || seconds <= 0) return ''; const n = Math.floor(seconds); return `${Math.floor(n / 60)}:${String(n % 60).padStart(2,'0')}`; }
function count(value?: number) { if (!Number.isFinite(value)) return '播放量未知'; return Number(value) >= 10000 ? `${(Number(value) / 10000).toFixed(1)}万` : String(value); }
async function loadFolder(id: string) {
  const seq = ++generation; selectedId.value = id; videos.value = []; total.value = 0; loading.value = true; error.value = '';
  try { const { bilibiliService } = await import('../services/bilibili.service'); const data = await bilibiliService.getFolderVideos(id, 1, 30); if (alive && seq === generation) { videos.value = data.medias; total.value = data.total; } }
  catch (e) { if (alive && seq === generation) error.value = e instanceof Error ? e.message : '视频读取失败'; }
  finally { if (alive && seq === generation) loading.value = false; }
}
async function loadFolders() {
  const seq = ++generation; loading.value = true; error.value = ''; warning.value = ''; videos.value = []; folders.value = []; selectedId.value = '';
  try {
    const { bilibiliService } = await import('../services/bilibili.service');
    const user = await bilibiliService.getUserNav();
    if (!alive || seq !== generation) return;
    if (!user.isLogin || !user.mid) throw new Error('未登录 B 站，请先在 B 站插件中登录。');
    const [created, collected] = await Promise.allSettled([bilibiliService.getCreatedFolders(user.mid), bilibiliService.getCollectedFolders(1, 50, user.mid)]);
    if (!alive || seq !== generation) return;
    if (created.status === 'rejected' && collected.status === 'rejected') throw new Error('收藏夹读取失败，请检查网络后重试。');
    if (created.status === 'rejected' || collected.status === 'rejected') warning.value = '部分收藏夹读取失败，当前显示可用内容。';
    else if (collected.value.count > collected.value.list.length) warning.value = '收藏的合集和收藏夹仅显示前 50 个。';
    folders.value = [...(created.status === 'fulfilled' ? created.value : []), ...(collected.status === 'fulfilled' ? collected.value.list : []), ...bilibiliService.getOtherFolders()];
    const first = folders.value.find(folder => !folder.isOther) || folders.value[0];
    if (first) { await loadFolder(folderKey(first)); return; }
  } catch (e) { if (alive && seq === generation) error.value = e instanceof Error ? e.message : '收藏夹读取失败'; }
  finally { if (alive && seq === generation) loading.value = false; }
}
async function loadOwnRepos() {
  repoRequest?.abort();
  const request = new AbortController(); repoRequest = request; reposLoading.value = true; reposError.value = ''; reposWarning.value = '';
  try {
    const { loadOwnRepositorySnapshot } = await import('./github-resources');
    const result = await loadOwnRepositorySnapshot(request.signal);
    if (alive && repoRequest === request) { repoData.value = () => ({ ...result, loading:false }); reposWarning.value = result.warning; }
  } catch (e) { if (alive && repoRequest === request && !request.signal.aborted) reposError.value = e instanceof Error ? e.message : '仓库读取失败'; }
  finally { if (alive && repoRequest === request) { repoRequest = null; reposLoading.value = false; } }
}
function selectBoard(id: string) { if (props.kind === 'bilibili') void loadFolder(id); else selectedId.value = id; }
onMounted(async () => {
  if (props.kind === 'bilibili') { ready.value = true; void loadFolders(); return; }
  try { const { starBoardData } = await import('../github/stars-board-data'); if (alive) { starData.value = () => starBoardData; selectedId.value = 'all'; ready.value = true; void loadOwnRepos(); } }
  catch { if (alive) { error.value = '无法读取 GitHub 仓库状态。'; ready.value = true; } }
});
onBeforeUnmount(() => { alive = false; generation++; repoRequest?.abort(); repoRequest = null; });
</script>
<template>
  <aside class="resource-panel" :aria-label="kind === 'bilibili' ? 'B站视频' : 'GitHub 仓库'"><header><div><strong><span :class="kind">{{ kind === 'bilibili' ? '▶' : '⌘' }}</span> {{ kind === 'bilibili' ? 'B 站视频' : 'GitHub 仓库' }}</strong><small>{{ kind === 'bilibili' ? '浏览收藏夹' : '浏览个人仓库与分组' }}</small></div><button class="close" type="button" aria-label="关闭侧栏" @click="emit('close')">✕</button></header>
    <div class="toolbar"><strong>{{ selected?.label || '选择板块' }}</strong><div class="toolbar-actions"><button v-if="kind === 'bilibili'" class="refresh" type="button" :disabled="loading" title="刷新收藏夹" @click="loadFolders">↻</button><button v-else-if="!isStarBoard" class="refresh" type="button" :disabled="reposLoading" title="刷新仓库" @click="loadOwnRepos">↻</button><BoardSelector :options="options" :selected="selectedId" :disabled="!ready || !options.length" @select="selectBoard" /></div></div>
    <div class="panel-content"><p v-if="!ready || loading || (kind === 'github' && (isStarBoard ? starData().loading : reposLoading))" class="hint"><LoadingIndicator label="正在读取板块" /></p><p v-if="error" class="error" role="alert">{{ error }} <button v-if="kind === 'bilibili'" type="button" @click="loadFolders">重试</button></p><p v-if="warning" class="hint">{{ warning }}</p><p v-if="kind === 'github' && !isStarBoard && reposError" class="error" role="alert">{{ reposError }} <button type="button" @click="loadOwnRepos">重试</button></p><p v-if="kind === 'github' && !isStarBoard && reposWarning" class="hint">{{ reposWarning }}</p>
      <template v-if="ready && kind === 'bilibili'"><p v-if="!loading && !error && !videos.length" class="hint">该收藏夹暂无视频。</p><article v-for="video in videos" :key="`${video.bvid}-${video.id}`" class="video-card"><div class="cover"><img v-if="video.cover" :src="video.cover.replace(/^http:/,'https:')" alt="" loading="lazy" referrerpolicy="no-referrer" /><span v-else class="cover-placeholder">▶</span><span v-if="duration(video.duration)" class="duration">{{ duration(video.duration) }}</span></div><div class="video-info"><strong>{{ video.title }}</strong><small>{{ video.upper?.name || 'UP 主未知' }}</small><div class="video-meta">▶ {{ count(video.cnt_info?.play) }}</div><button type="button" class="add-resource" :disabled="disabled || !/^BV[0-9A-Za-z]{10}$/.test(video.bvid || '')" @click="selectVideo(video)">{{ isSelected('bilibili', video.bvid) ? '✓ 已添加' : '＋ 添加到消息' }}</button></div></article><p v-if="!loading && total > videos.length" class="hint">当前显示前 {{ videos.length }} 条，共 {{ total }} 条。</p></template>
      <template v-else-if="ready && kind === 'github'"><p v-if="isStarBoard && !starData().loading && !starData().repos.length" class="hint">暂无已加载的 Star 仓库。请先打开 GitHub 插件的「Star 收藏」加载数据。</p><p v-else-if="!isStarBoard && !reposLoading && !reposError && !repoData().repos.length" class="hint">该账号暂无可显示的个人仓库。</p><p v-else-if="!reposLoading && !reposError && !displayedRepos.length" class="hint">该分组暂无仓库。</p><article v-for="repo in displayedRepos" :key="repo.id" class="repo-card"><div class="repo-top"><span class="repo-icon">⌘</span><span class="repo-name">{{ repo.fullName }}</span><span class="visibility">{{ repo.badge }}</span></div><p>{{ repo.description || '暂无仓库介绍' }}</p><div class="repo-meta"><span v-if="repo.language"><i></i>{{ repo.language }}</span><span>☆ {{ repo.stargazersCount }}</span></div><button type="button" class="add-resource" :disabled="disabled" @click="selectRepo(repo)">{{ isSelected('github', repo.fullName) ? '✓ 已添加' : '＋ 添加到消息' }}</button></article></template>
    </div><footer>添加到草稿后不会立即发送；正文需手动读取并确认附带。</footer>
  </aside>
</template>
<style scoped>
.resource-panel { position:absolute; right:0; top:0; bottom:0; z-index:30; width:min(380px,90vw); max-width:calc(100% - 12px); display:flex; flex-direction:column; min-height:0; background:var(--panel,#fff); border-left:1px solid var(--border,#e4e8ef); color:var(--text,#26334b); box-shadow:-10px 0 30px #15253a20; }.resource-panel * { box-sizing:border-box; }.resource-panel header { display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid var(--border,#e8ebf1); }.resource-panel header strong,.resource-panel header small { display:block; }.resource-panel header strong { font-size:14px; }.resource-panel header small { color:#98a5b8; margin-top:4px; font-size:11px; }.bilibili { color:#fb7299; }.github { color:#8174da; }.close,.refresh { cursor:pointer; border:1px solid var(--border,#e4e8ef); border-radius:6px; background:var(--surface,#fff); color:var(--text,#52627a); padding:5px 8px; font:inherit; font-size:11px; }.refresh:disabled { opacity:.5; }.toolbar { display:flex; justify-content:space-between; align-items:center; gap:8px; padding:12px 14px 8px; font-size:12px; }.toolbar strong { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.toolbar-actions { display:flex; align-items:center; gap:6px; }.panel-content { overflow:auto; flex:1; padding:2px 12px 16px; }.hint { color:#9ba8bc; font-size:11px; line-height:1.6; }.error { color:#b45309; font-size:11px; overflow-wrap:anywhere; }.error button { border:0; background:transparent; color:#7569ec; cursor:pointer; }.video-card,.repo-card { margin-bottom:7px; border:1px solid var(--border,#e6eaf0); border-radius:8px; background:var(--surface,#fafbfc); overflow:hidden; }.video-card { display:flex; gap:10px; padding:8px; }.cover { width:112px; aspect-ratio:16/10; position:relative; flex:none; overflow:hidden; border-radius:6px; background:linear-gradient(140deg,#e9eef8,#f8e7f0); }.cover img { width:100%; height:100%; object-fit:cover; }.cover-placeholder { position:absolute; inset:0; display:grid; place-items:center; color:#d994b4; font-size:22px; }.duration { position:absolute; right:5px; bottom:5px; padding:1px 4px; border-radius:3px; color:white; background:#182333a6; font-size:10px; }.video-info { flex:1; min-width:0; display:flex; flex-direction:column; }.video-info strong { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; font-size:12px; line-height:1.5; }.video-info small { margin-top:5px; color:#9ba8bc; font-size:11px; }.video-meta { margin-top:auto; color:#a5b1c1; font-size:10px; }.repo-card { padding:12px; }.repo-top { display:flex; align-items:center; gap:8px; }.repo-icon { color:#8c80df; font-size:16px; }.repo-name { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#756be0; font-size:12px; font-weight:650; }.visibility { flex:none; border:1px solid var(--border,#e1e5ed); border-radius:20px; padding:1px 7px; color:#9aa7b9; font-size:10px; }.repo-card p { color:#8d9bb0; font-size:11px; line-height:1.6; }.repo-meta { display:flex; gap:16px; color:#a0adbd; font-size:11px; }.repo-meta i { display:inline-block; width:8px; height:8px; margin-right:5px; border-radius:50%; background:#8f80e8; }footer { padding:11px 14px; border-top:1px solid var(--border,#e8ebf1); color:#9ba8bc; font-size:10px; }
.add-resource { align-self:flex-start; margin-top:6px; padding:4px 8px; border:1px solid var(--border,#dfe5ed); border-radius:6px; color:#7569ec; background:var(--panel,#fff); cursor:pointer; font:inherit; font-size:11px; }.add-resource:disabled { opacity:.5; cursor:not-allowed; }
</style>
