<script setup lang="ts">
import { ref, computed } from "vue";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import LauncherTileContent from "../launchers/LauncherTileContent.vue";
import {
  workbenchState,
  setWorkbenchFocus,
  removeWorkbenchVideo,
  removeWorkbenchWeb,
  toggleWorkbenchTask,
  removeWorkbenchTask,
  addWorkbenchTask,
  removeWorkbenchRepo,
  type WorkbenchVideoItem,
  type WorkbenchRepoItem
} from "./workbench.store";

const isVisible = computed(() => fullscreenCardState.activeId === "workbench");
const newTaskText = ref("");

function handleClose() {
  fullscreenCardState.activeId = null;
}

function handleAddTask() {
  if (newTaskText.value.trim()) {
    addWorkbenchTask(newTaskText.value);
    newTaskText.value = "";
  }
}

function playVideo(video: WorkbenchVideoItem) {
  setWorkbenchFocus({
    type: "video",
    id: video.id,
    title: video.title,
    data: { bvid: video.bvid }
  });
}

function focusRepo(repo: WorkbenchRepoItem) {
  setWorkbenchFocus({
    type: "repo",
    id: repo.id,
    title: `${repo.owner}/${repo.name}`,
    data: repo
  });
}

function focusNotes() {
  setWorkbenchFocus({
    type: "note",
    id: "scratchpad",
    title: "速记与灵感草稿"
  });
}
</script>

<template>
  <section
    id="workbench-workspace"
    class="card wide workbench-container"
    :class="{ 'card-fullscreen': isVisible, 'is-active': isVisible }"
    v-show="isVisible"
  >
    <!-- 顶栏控制区与 Todoist 待办聚焦条 -->
    <header class="workbench-header">
      <div class="header-left">
        <span class="workbench-badge">WORKSPACE</span>
        <input
          v-model="workbenchState.title"
          class="workbench-title-input"
          placeholder="给工作台起个名字..."
        />
      </div>

      <!-- 正上：Todoist 任务条聚合 -->
      <div class="header-center-tasks">
        <div class="tasks-bar">
          <div class="tasks-summary">
            <span class="task-icon">✓</span>
            <span class="task-count">
              {{ workbenchState.tasks.filter(t => !t.completed).length }} 待完成
            </span>
          </div>

          <div class="tasks-scroll-list">
            <div
              v-for="task in workbenchState.tasks"
              :key="task.id"
              class="task-chip"
              :class="{ 'is-completed': task.completed }"
              @click="toggleWorkbenchTask(task.id)"
              :title="task.content"
            >
              <span class="task-check">{{ task.completed ? '✔' : '○' }}</span>
              <span class="task-text">{{ task.content }}</span>
              <button
                class="task-del-btn"
                @click.stop="removeWorkbenchTask(task.id)"
                title="移除任务"
              >×</button>
            </div>
          </div>

          <div class="task-quick-add">
            <input
              v-model="newTaskText"
              placeholder="+ 加任务"
              @keyup.enter="handleAddTask"
            />
          </div>
        </div>
      </div>

      <div class="header-right">
        <button class="action-btn" @click="focusNotes" title="聚焦编辑草稿">
          📝 笔记模式
        </button>
        <button class="close-btn" @click="handleClose" title="退出工作台 (Esc)">
          ✕
        </button>
      </div>
    </header>

    <!-- 工作台六宫格主体区域 -->
    <div class="workbench-body">
      <!-- 左栏：多媒体输入 (左上B站视频 + 左下常用网站) -->
      <aside class="workbench-col col-left">
        <!-- 左上：B站视频队列 -->
        <div class="panel-card panel-videos">
          <div class="panel-header">
            <div class="panel-title">
              <span class="panel-icon">📺</span>
              <span>B站视频</span>
              <span class="panel-count">{{ workbenchState.videos.length }}</span>
            </div>
            <span class="panel-tip">右键/移入添加</span>
          </div>

          <div class="panel-content scrollable">
            <div v-if="workbenchState.videos.length === 0" class="empty-state">
              <span>暂无视频</span>
              <span class="sub">在B站模块卡片右键可移入</span>
            </div>
            <div
              v-for="v in workbenchState.videos"
              :key="v.id"
              class="video-card bili-style-card"
              :class="{ 'is-playing': workbenchState.focus.id === v.id && workbenchState.focus.type === 'video' }"
              @click="playVideo(v)"
            >
              <div class="video-cover-wrap">
                <img
                  v-if="v.pic"
                  :src="v.pic"
                  class="video-cover-img"
                  referrerpolicy="no-referrer"
                  alt="cover"
                />
                <div v-else class="video-cover-placeholder">📺</div>
                <span v-if="v.duration" class="video-duration-badge">{{ v.duration }}</span>
                <button
                  class="video-del-float-btn"
                  @click.stop="removeWorkbenchVideo(v.id)"
                  title="从工作台移除"
                >×</button>
              </div>
              <div class="video-info">
                <div class="video-title" :title="v.title">{{ v.title }}</div>
                <div class="video-meta">
                  <span class="video-author">{{ v.owner?.name || 'UP主' }}</span>
                  <span v-if="v.bvid" class="video-dot">·</span>
                  <span v-if="v.bvid" class="video-bvid">{{ v.bvid }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 左下：常用网站与快捷书签 -->
        <div class="panel-card panel-websites">
          <div class="panel-header">
            <div class="panel-title">
              <span class="panel-icon">🔗</span>
              <span>常用网站 / 参考</span>
              <span class="panel-count">{{ workbenchState.websites.length }}</span>
            </div>
          </div>

          <div class="panel-content scrollable">
            <div v-if="workbenchState.websites.length === 0" class="empty-state">
              <span>暂无网站</span>
              <span class="sub">从常用网站或 ai hot 文章右键添加</span>
            </div>
            <div v-else class="sites-grid">
              <div v-for="site in workbenchState.websites" :key="site.id" class="site-item">
                <a :href="site.url" target="_blank" rel="noopener noreferrer" class="launcher-link site-link" :title="site.title">
                  <LauncherTileContent :link="site" />
                </a>
                <button
                  type="button"
                  class="item-remove-btn site-remove-btn"
                  @click.stop="removeWorkbenchWeb(site.id)"
                  :aria-label="`从工作台移除${site.title}`"
                  title="从工作台移除"
                >×</button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- 中间：核心焦点舞台 (Focus Stage) -->
      <main class="workbench-stage">
        <!-- 聚焦视频播放态 -->
        <div
          v-if="workbenchState.focus.type === 'video' && workbenchState.focus.data?.bvid"
          class="stage-view stage-video"
        >
          <div class="stage-header">
            <span class="stage-badge">正在播放</span>
            <span class="stage-title">{{ workbenchState.focus.title }}</span>
          </div>
          <div class="video-player-frame">
            <iframe
              :src="`https://player.bilibili.com/player.html?bvid=${workbenchState.focus.data.bvid}&page=1&high_quality=1&as_wide=1&danmaku=0`"
              scrolling="no"
              border="0"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
            ></iframe>
          </div>
        </div>

        <!-- 聚焦 GitHub 仓库态 -->
        <div
          v-else-if="workbenchState.focus.type === 'repo' && workbenchState.focus.data"
          class="stage-view stage-repo"
        >
          <div class="stage-header">
            <span class="stage-badge">代码仓库</span>
            <span class="stage-title">{{ workbenchState.focus.title }}</span>
            <a
              :href="workbenchState.focus.data.htmlUrl"
              target="_blank"
              rel="noopener"
              class="stage-ext-link"
            >在 GitHub 打开 ↗</a>
          </div>
          <div class="repo-details">
            <p class="repo-desc">{{ workbenchState.focus.data.description || '暂无仓库简介' }}</p>
            <div class="repo-stats">
              <span v-if="workbenchState.focus.data.language" class="stat-pill">
                ● {{ workbenchState.focus.data.language }}
              </span>
              <span v-if="workbenchState.focus.data.stars" class="stat-pill">
                ⭐ {{ workbenchState.focus.data.stars }}
              </span>
            </div>
            <div class="repo-readme-placeholder">
              <p>💡 点击右上角直达仓库源码，或在此关联相关 Issues 与 Commit。</p>
            </div>
          </div>
        </div>

        <!-- 聚焦大笔记编辑态 -->
        <div
          v-else-if="workbenchState.focus.type === 'note'"
          class="stage-view stage-note"
        >
          <div class="stage-header">
            <span class="stage-badge">沉浸记录</span>
            <span class="stage-title">速记草稿本</span>
          </div>
          <textarea
            v-model="workbenchState.scratchpad"
            class="stage-textarea"
            placeholder="在这里深度构思、沉浸书写笔记与想法..."
          ></textarea>
        </div>

        <!-- 空焦点状态 -->
        <div v-else class="stage-empty">
          <div class="empty-mascot">🦫</div>
          <h2>就绪工作台 · 沉浸焦点</h2>
          <p>从左侧点击视频播放，点击右侧仓库查看详情，或点击顶部聚焦笔记。</p>
        </div>
      </main>

      <!-- 右栏：产出与代码 (右上GitHub仓库 + 右下速记草稿) -->
      <aside class="workbench-col col-right">
        <!-- 右上：GitHub 关联仓库 -->
        <div class="panel-card panel-repos">
          <div class="panel-header">
            <div class="panel-title">
              <span class="panel-icon">🐙</span>
              <span>项目仓库</span>
              <span class="panel-count">{{ workbenchState.repos.length }}</span>
            </div>
          </div>

          <div class="panel-content scrollable">
            <div v-if="workbenchState.repos.length === 0" class="empty-state">
              <span>暂无仓库</span>
              <span class="sub">在 GitHub 模块右键移入</span>
            </div>
            <div
              v-for="r in workbenchState.repos"
              :key="r.id"
              class="repo-item"
              :class="{ 'is-selected': workbenchState.focus.id === r.id && workbenchState.focus.type === 'repo' }"
              @click="focusRepo(r)"
            >
              <div class="repo-item-top">
                <span class="repo-item-name">{{ r.owner }}/{{ r.name }}</span>
                <button
                  class="item-remove-btn"
                  @click.stop="removeWorkbenchRepo(r.id)"
                  title="移除仓库"
                >×</button>
              </div>
              <p v-if="r.description" class="repo-item-desc">{{ r.description }}</p>
            </div>
          </div>
        </div>

        <!-- 右下：速记草稿 -->
        <div class="panel-card panel-scratchpad">
          <div class="panel-header">
            <div class="panel-title">
              <span class="panel-icon">📝</span>
              <span>速记草稿</span>
            </div>
            <button class="small-btn" @click="focusNotes" title="全屏沉浸编辑">
              展开 ↗
            </button>
          </div>

          <div class="panel-content scratchpad-box">
            <textarea
              v-model="workbenchState.scratchpad"
              class="scratchpad-textarea"
              placeholder="随手写草稿、灵感备忘..."
            ></textarea>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
/* 严格继承全局主题 CSS 变量，绝不硬编码暗黑背景 */
.workbench-container {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9999 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  padding: 0 !important;
  margin: 0 !important;
  background-color: var(--background, #f8fafc) !important;
  color: var(--text, #1e293b) !important;
  display: flex;
  flex-direction: column !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  font-family: inherit;
}

/* 顶栏与任务条 */
.workbench-header {
  height: 56px;
  padding: 0 20px;
  background-color: var(--panel, #ffffff);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 240px;
}

.workbench-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--surface, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
  letter-spacing: 0.5px;
}

.workbench-title-input {
  font-size: 15px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  background: transparent;
  border: none;
  border-bottom: 1px dashed transparent;
  padding: 2px 4px;
  outline: none;
}
.workbench-title-input:hover,
.workbench-title-input:focus {
  border-bottom-color: var(--border, rgba(0, 0, 0, 0.2));
}

/* 顶部 Todoist 任务条 */
.header-center-tasks {
  flex: 1;
  max-width: 800px;
  display: flex;
  align-items: center;
}

.tasks-bar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  padding: 4px 10px;
}

.tasks-summary {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted, #64748b);
  white-space: nowrap;
}
.task-icon {
  color: #10b981;
}

.tasks-scroll-list {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.tasks-scroll-list::-webkit-scrollbar {
  display: none;
}

.task-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}
.task-chip:hover {
  border-color: var(--border-hover, rgba(0, 0, 0, 0.2));
}
.task-chip.is-completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.task-check {
  font-size: 11px;
  color: var(--muted, #64748b);
}

.task-del-btn {
  background: transparent;
  border: none;
  font-size: 12px;
  color: var(--muted, #94a3b8);
  cursor: pointer;
  padding: 0 2px;
}
.task-del-btn:hover {
  color: #ef4444;
}

.task-quick-add input {
  width: 70px;
  font-size: 12px;
  border: none;
  background: transparent;
  outline: none;
  color: var(--text, #1e293b);
}
.task-quick-add input:focus {
  width: 120px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  cursor: pointer;
}
.action-btn:hover {
  background: var(--surface, rgba(0, 0, 0, 0.05));
}

.close-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* 主体六宫格布局 */
.workbench-body {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: 14px;
  padding: 14px;
  box-sizing: border-box;
  overflow: hidden;
}

.workbench-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

/* 面板卡片通用 */
.panel-card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface, rgba(0, 0, 0, 0.02));
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.panel-count {
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 10px;
  background: var(--surface, rgba(0, 0, 0, 0.06));
  color: var(--muted, #64748b);
}

.panel-tip {
  font-size: 11px;
  color: var(--muted, #94a3b8);
}

.panel-content {
  flex: 1;
  min-height: 0;
  padding: 10px;
}

.panel-content.scrollable {
  overflow-y: auto;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--muted, #94a3b8);
  font-size: 13px;
  gap: 4px;
}
.empty-state .sub {
  font-size: 11px;
  opacity: 0.8;
}

.item-remove-btn {
  background: transparent;
  border: none;
  color: var(--muted, #94a3b8);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.video-card:hover .item-remove-btn,
.site-item:hover .item-remove-btn,
.repo-item:hover .item-remove-btn {
  opacity: 1;
}
.item-remove-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* 仿 B站收藏夹样式的视频卡片 */
.video-card.bili-style-card {
  padding: 8px;
  border-radius: 10px;
  background: var(--surface, rgba(0, 0, 0, 0.02));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}
.video-card.bili-style-card:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  border-color: var(--border-hover, rgba(0, 0, 0, 0.15));
  transform: translateY(-1px);
}
.video-card.bili-style-card.is-playing {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.video-cover-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
  background: #0f172a;
}
.video-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.video-cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: rgba(0, 0, 0, 0.1);
}
.video-duration-badge {
  position: absolute;
  bottom: 4px;
  right: 5px;
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.7);
  letter-spacing: 0.3px;
}
.video-del-float-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.video-card:hover .video-del-float-btn {
  opacity: 1;
}
.video-del-float-btn:hover {
  background: #ef4444;
}

.video-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.video-title {
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--heading, #0f172a);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.video-meta {
  font-size: 11px;
  color: var(--muted, #64748b);
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.video-author {
  font-weight: 500;
}
.video-dot {
  opacity: 0.6;
}
.video-bvid {
  opacity: 0.75;
  font-size: 10.5px;
}

/* Reuse the home launcher icon/title components, not a separate link-list skin. */
.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
  gap: 10px 6px;
  align-content: start;
}
.site-item { position: relative; min-width: 0; border-radius: 10px; }
.site-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  min-width: 0;
  min-height: 78px;
  padding: 4px 0;
  text-decoration: none;
  color: var(--text);
}
.site-link :deep(.launcher-favicon) {
  flex-shrink: 0;
  background: var(--panel) !important;
  border-color: var(--border) !important;
}
.site-link :deep(.launcher-fallback) { color: var(--heading); }
.site-link :deep(.launcher-title) {
  display: block;
  width: 94%;
  overflow: hidden;
  font-size: 11px;
  font-weight: 550;
  line-height: 14px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.site-link:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px; border-radius: 10px; }
.site-remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 20px;
  height: 20px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--panel);
}
.site-item:focus-within .site-remove-btn { opacity: 1; }
@media (hover: none) { .site-remove-btn { opacity: 1; } }

/* 中间焦点大舞台 */
.workbench-stage {
  min-height: 0;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.stage-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.stage-header {
  padding: 12px 18px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  display: flex;
  align-items: center;
  gap: 10px;
}
.stage-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: #3b82f6;
  color: #ffffff;
}
.stage-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stage-ext-link {
  font-size: 12px;
  color: #3b82f6;
  text-decoration: none;
}

/* 播放器区域 */
.video-player-frame {
  flex: 1;
  background: #000000;
  display: flex;
}
.video-player-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 仓库详情与笔记舞台 */
.repo-details {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}
.repo-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text, #334155);
}
.repo-stats {
  margin: 16px 0;
  display: flex;
  gap: 10px;
}
.stat-pill {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--surface, rgba(0, 0, 0, 0.04));
  color: var(--text, #334155);
}

.stage-textarea {
  flex: 1;
  padding: 20px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  font-family: inherit;
  background: transparent;
  color: var(--text, #1e293b);
}

/* 舞台空态 */
.stage-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--muted, #64748b);
  gap: 12px;
}
.empty-mascot {
  font-size: 48px;
}
.stage-empty h2 {
  font-size: 18px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  margin: 0;
}
.stage-empty p {
  font-size: 13px;
  max-width: 360px;
  text-align: center;
  line-height: 1.5;
  margin: 0;
}

/* 右栏：仓库与草稿 */
.repo-item {
  padding: 10px;
  border-radius: 8px;
  background: var(--surface, rgba(0, 0, 0, 0.02));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.05));
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.repo-item:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  border-color: var(--border-hover, rgba(0, 0, 0, 0.15));
}
.repo-item.is-selected {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}
.repo-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.repo-item-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}
.repo-item-desc {
  font-size: 11px;
  color: var(--muted, #64748b);
  margin: 4px 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scratchpad-box {
  padding: 0;
  display: flex;
}
.scratchpad-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 12px;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 1.5;
  font-family: inherit;
  background: transparent;
  color: var(--text, #1e293b);
}

.small-btn {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  background: var(--panel, #ffffff);
  color: var(--muted, #64748b);
  cursor: pointer;
}
.small-btn:hover {
  color: var(--text, #1e293b);
}
</style>
