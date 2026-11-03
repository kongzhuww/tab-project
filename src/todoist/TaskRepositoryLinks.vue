<template>
  <section class="task-associations" aria-label="关联资源">
    <header class="associations-head">
      <span class="associations-title">关联 <small>仅本插件</small></span>
      <button v-if="!hasAnyLinks" type="button" class="btn-add-link" @click="selecting = !selecting">
        {{ selecting ? "取消" : "＋ 关联 GitHub" }}
      </button>
    </header>

    <!-- 1. GitHub 仓库关联输入框 -->
    <form v-if="selecting" class="association-form" @submit.prevent="linkRepo(query)">
      <input
        v-model="query"
        placeholder="搜索已加载仓库，或粘贴 GitHub 仓库链接"
        aria-label="仓库名称或链接"
      />
      <button type="submit">添加</button>
    </form>
    <div v-if="selecting && candidates.length" class="repo-candidates">
      <button
        v-for="repo in candidates"
        :key="repo.full_name"
        type="button"
        @click="linkRepo(repo.full_name)"
      >
        {{ repo.full_name }}
      </button>
    </div>
    <p v-if="error" class="association-error" role="alert">{{ error }}</p>

    <!-- 2. B站 视频卡片展示与即时播放 -->
    <div v-if="biliVideos.length" class="bili-cards-grid">
      <article
        v-for="video in biliVideos"
        :key="video.bvid"
        class="bili-assoc-card"
        :title="'点击播放视频: ' + video.title"
        @click="playBiliVideo(video)"
      >
        <div class="bili-assoc-thumb-wrap">
          <img
            v-if="video.cover"
            :src="video.cover.replace(/^http:/, 'https:')"
            alt=""
            class="bili-assoc-thumb"
            referrerpolicy="no-referrer"
          />
          <span v-else class="bili-assoc-no-thumb">📺</span>
          <span class="bili-assoc-play-btn">▶</span>
        </div>
        <div class="bili-assoc-meta">
          <header class="bili-assoc-header">
            <span class="bili-assoc-title" :title="video.title">{{ video.title }}</span>
            <button
              type="button"
              class="bili-assoc-unlink-btn"
              title="移除该视频关联"
              @click.stop="handleUnlinkBili(video.bvid)"
            >
              ×
            </button>
          </header>
          <div class="bili-assoc-sub">
            <span v-if="video.author" class="bili-assoc-author">👤 {{ video.author }}</span>
            <span class="bili-assoc-bvid">{{ video.bvid }}</span>
          </div>
        </div>
      </article>
    </div>

    <!-- 3. GitHub 仓库卡片展示 -->
    <div v-if="links.length" class="repo-cards">
      <article v-for="repo in links" :key="repo.fullName" class="repo-card">
        <header>
          <a
            :href="'https://github.com/' + repo.fullName"
            target="_blank"
            rel="noreferrer"
            @click.stop="openGitHubDetail(repo.fullName, $event)"
          >
            <span class="repo-mark">🐙</span> {{ repo.fullName }}
          </a>
          <button
            type="button"
            :aria-label="'移除关联 ' + repo.fullName"
            @click="unlink(repo.fullName)"
          >
            ×
          </button>
        </header>
        <p>{{ repo.description || 'GitHub 仓库' }}</p>
        <footer>
          <span v-if="repo.stars !== undefined">☆ {{ repo.stars.toLocaleString() }}</span>
          <span v-if="repo.language">{{ repo.language }}</span>
          <span v-if="repo.updated">{{ repo.updated.slice(0, 10) }}</span>
        </footer>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { gitHubService } from '../services/github.service';
import { readRepositoryLinks, writeRepositoryLinks, validRepositoryName as valid, type RepositoryLink as RepoLink } from './repository-links';
import { readBiliVideoLinks, unlinkBiliVideo, getTaskBiliVideoLinks, type BiliVideoLink } from './bili-video-links';
import { biliMiniPlayerController } from '../bilibili/mini-player-store';
import { githubRepoDetailController } from '../github/repo-detail-store';

const props = defineProps<{ taskId: string; description?: string; title?: string }>();
const links = ref<RepoLink[]>([]);
const biliVideos = ref<BiliVideoLink[]>([]);
const query = ref('');
const error = ref('');
const selecting = ref(false);
const readable = ref(false);

const hasAnyLinks = computed(() => links.value.length > 0 || biliVideos.value.length > 0);

function reloadLinks() {
  try {
    links.value = readRepositoryLinks(props.taskId);
    biliVideos.value = getTaskBiliVideoLinks(props.taskId, props.description, props.title);
    readable.value = true;
  } catch {
    error.value = '关联记录读取失败，未覆盖已有数据。';
    readable.value = false;
  }
}

function onLinkChange(event: Event) {
  if (
    event instanceof StorageEvent ||
    (event as CustomEvent).detail === props.taskId
  ) {
    reloadLinks();
  }
}

onMounted(() => {
  window.addEventListener('storage', onLinkChange);
  window.addEventListener('todoist-repository-links-changed', onLinkChange);
  window.addEventListener('todoist-bili-links-changed', onLinkChange);
});

onUnmounted(() => {
  window.removeEventListener('storage', onLinkChange);
  window.removeEventListener('todoist-repository-links-changed', onLinkChange);
  window.removeEventListener('todoist-bili-links-changed', onLinkChange);
});

watch(
  () => [props.taskId, props.description, props.title],
  () => {
    links.value = [];
    biliVideos.value = [];
    query.value = '';
    selecting.value = false;
    error.value = '';
    readable.value = false;
    reloadLinks();
  },
  { immediate: true }
);

const candidates = computed(() =>
  gitHubService.repos
    .filter(
      r =>
        r.full_name.toLowerCase().includes(query.value.toLowerCase()) &&
        !links.value.some(l => l.fullName === r.full_name)
    )
    .slice(0, 6)
);

function persist(next: RepoLink[]) {
  if (!props.taskId || !readable.value) return;
  try {
    writeRepositoryLinks(props.taskId, next);
    links.value = next;
    error.value = '';
  } catch {
    error.value = '本地保存失败，请检查浏览器存储。';
  }
}

function linkRepo(value: string) {
  let name = value.trim();
  if (name.startsWith('https://')) {
    try {
      const u = new URL(name);
      if (u.hostname !== 'github.com' || u.username || u.password) throw new Error();
      name = u.pathname.replace(/^\/|\/$/g, '');
    } catch {
      error.value = '请填写 GitHub 仓库地址。';
      return;
    }
  }
  if (!valid(name)) {
    error.value = '请输入 owner/repo 或完整仓库链接。';
    return;
  }
  if (links.value.some(r => r.fullName.toLowerCase() === name.toLowerCase())) {
    error.value = '该仓库已关联。';
    return;
  }
  const repo = gitHubService.repos.find(r => r.full_name.toLowerCase() === name.toLowerCase());
  persist([
    ...links.value,
    {
      fullName: name,
      description: repo?.description || '',
      stars: repo?.stargazers_count,
      language: repo?.language || undefined,
      updated: repo?.updated_at
    }
  ]);
  if (!error.value) {
    query.value = '';
    selecting.value = false;
  }
}

function unlink(name: string) {
  persist(links.value.filter(r => r.fullName !== name));
}

function handleUnlinkBili(bvid: string) {
  unlinkBiliVideo(props.taskId, bvid);
  biliVideos.value = biliVideos.value.filter(v => v.bvid !== bvid);
}

function playBiliVideo(v: BiliVideoLink) {
  biliMiniPlayerController.openVideo({
    bvid: v.bvid,
    aid: v.aid ? String(v.aid) : undefined,
    title: v.title,
    author: v.author,
    cover: v.cover,
    url: v.url
  });
}

function openGitHubDetail(fullName: string, e: MouseEvent) {
  e.preventDefault();
  githubRepoDetailController.open(fullName);
}
</script>

<style scoped>
.task-associations {
  padding: 10px 0;
  border-top: 1px solid var(--border);
}

.associations-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.associations-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

.associations-title small {
  font-size: 10px;
  font-weight: normal;
  margin-left: 4px;
}

.btn-add-link {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font: inherit;
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 4px;
  transition: all 0.15s;
}

.btn-add-link:hover {
  color: var(--heading);
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
}

.association-form {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.association-form input {
  min-width: 0;
  flex: 1;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel);
  color: var(--text);
  font: inherit;
  font-size: 12px;
}

.association-form button {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  font-size: 12px;
}

.association-error {
  color: #ef4444;
  font-size: 11px;
  margin: 6px 0 0;
}

.repo-candidates {
  display: flex;
  flex-direction: column;
  max-height: 140px;
  overflow: auto;
  align-items: stretch;
  margin-top: 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel);
}

.repo-candidates button {
  text-align: left;
  overflow-wrap: anywhere;
  padding: 6px 10px;
  border: 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font-size: 11.5px;
}

.repo-candidates button:hover {
  background: var(--surface-hover);
  color: #0284c7;
}

/* 📺 B站 视频卡片样式 */
.bili-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: 8px;
  margin-top: 8px;
}

.bili-assoc-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.bili-assoc-card:hover {
  border-color: #0284c7;
  background: var(--surface-hover, rgba(0, 0, 0, 0.03));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.bili-assoc-thumb-wrap {
  position: relative;
  width: 68px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 5px;
  overflow: hidden;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bili-assoc-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bili-assoc-no-thumb {
  font-size: 18px;
}

.bili-assoc-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.15s;
}

.bili-assoc-card:hover .bili-assoc-play-btn {
  opacity: 1;
  background: rgba(2, 132, 199, 0.65);
}

.bili-assoc-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.bili-assoc-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
}

.bili-assoc-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bili-assoc-unlink-btn {
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 14px;
  padding: 0 4px;
  cursor: pointer;
  line-height: 1;
  border-radius: 4px;
}

.bili-assoc-unlink-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.bili-assoc-sub {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--muted);
}

.bili-assoc-author {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bili-assoc-bvid {
  font-family: monospace;
  font-size: 10px;
  opacity: 0.8;
}

/* 🐙 GitHub 仓库卡片样式 */
.repo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
  gap: 8px;
  margin-top: 8px;
}

.repo-card {
  padding: 8px 10px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.repo-card header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.repo-card header a {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repo-card header a:hover {
  color: #0284c7;
  text-decoration: underline;
}

.repo-card header button {
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 14px;
  padding: 0 4px;
  cursor: pointer;
  line-height: 1;
}

.repo-card header button:hover {
  color: #ef4444;
}

.repo-card p {
  margin: 0;
  font-size: 11px;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-card footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10.5px;
  color: var(--muted);
  margin-top: 2px;
}
</style>
