<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { myReposState, myReposController, sanitizeGitHubTopic, type MyRepoItem } from "./my-repos-store";

const props = defineProps<{
  active?: boolean;
}>();

const newTopicInput = ref("");
const isCreatingTopic = ref(false);
const activeMenuColumn = ref<string | null>(null);
const renameTopicInput = ref("");
const renamingColumnTopic = ref<string | null>(null);
const activeAddRepoColumnTopic = ref<string | null>(null);

// 内存直接绑定的拖拽状态（绝不依赖 dataTransfer 序列化，100% 可靠）
const activeDragRepo = ref<MyRepoItem | null>(null);
const activeDragFromTopic = ref<string | null>(null);
const hoverTargetColumn = ref<string | null>(null);

// 提取所有活跃的 Topic 列：包含用户自定义的 topic 和仓库中现有的 topics
const activeTopicColumns = computed(() => {
  const set = new Set<string>(myReposState.customTopicNames);
  for (const r of myReposState.repos) {
    for (const t of r.topics) {
      if (t) set.add(t);
    }
  }
  return Array.from(set).sort();
});

// 过滤后的仓库列表
const filteredRepos = computed(() => {
  const q = myReposState.searchQuery.trim().toLowerCase();
  if (!q) return myReposState.repos;
  return myReposState.repos.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.topics.some(t => t.includes(q)) ||
    (r.language && r.language.toLowerCase().includes(q))
  );
});

// 左侧“默认板块”中的仓库：没有打任何已知活跃 Topic 的仓库，或未分类
const defaultColumnRepos = computed(() => {
  const topicsSet = new Set(activeTopicColumns.value);
  return filteredRepos.value.filter(r => {
    if (!r.topics.length) return true;
    return !r.topics.some(t => topicsSet.has(t));
  });
});

// 获取属于特定 Topic 列的仓库
function getReposForTopic(topic: string): MyRepoItem[] {
  return filteredRepos.value.filter(r => r.topics.includes(topic));
}

// 可选添加到指定 Topic 的备选仓库
function getCandidateReposForTopic(topic: string): MyRepoItem[] {
  return myReposState.repos.filter(r => !r.topics.includes(topic));
}

// 新建 Topic 板块
async function handleCreateTopic() {
  const name = newTopicInput.value.trim();
  if (!name) return;
  const created = await myReposController.createTopicColumn(name);
  if (created) {
    newTopicInput.value = "";
    isCreatingTopic.value = false;
  }
}

// 开始重命名 Topic
function startRenameTopic(topic: string) {
  renamingColumnTopic.value = topic;
  renameTopicInput.value = topic;
  activeMenuColumn.value = null;
}

// 确认重命名
async function handleConfirmRename(oldTopic: string) {
  const newName = renameTopicInput.value.trim();
  if (!newName || newName === oldTopic) {
    renamingColumnTopic.value = null;
    return;
  }
  const ok = await myReposController.renameTopicColumn(oldTopic, newName);
  if (ok) {
    renamingColumnTopic.value = null;
  }
}

// 删除 Topic 板块
async function handleDeleteTopic(topic: string) {
  activeMenuColumn.value = null;
  await myReposController.deleteTopicColumn(topic);
}

// 添加仓库到指定 Topic
async function handleAddRepoToTopic(repo: MyRepoItem, topic: string) {
  await myReposController.addRepoToTopic(repo, topic);
  activeAddRepoColumnTopic.value = null;
}

// 从指定 Topic 移除仓库
async function handleRemoveRepoFromTopic(repo: MyRepoItem, topic: string) {
  await myReposController.removeRepoFromTopic(repo, topic);
}

// -------------------------------------------------------------
// 原生极简且 100% 稳定的 HTML5 拖拽（恢复上版本清爽结构）
// -------------------------------------------------------------

function onDragStart(event: DragEvent, repo: MyRepoItem, fromTopic: string) {
  activeDragRepo.value = repo;
  activeDragFromTopic.value = fromTopic;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${repo.id}:${fromTopic}`);
  }
}

function onDragEnd() {
  activeDragRepo.value = null;
  activeDragFromTopic.value = null;
  hoverTargetColumn.value = null;
}

function onDragOver(event: DragEvent, columnId: string) {
  if (!activeDragRepo.value) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  hoverTargetColumn.value = columnId;
}

function onDragLeave(event: DragEvent, columnId: string) {
  const cur = event.currentTarget as HTMLElement | null;
  const rel = event.relatedTarget as Node | null;
  if (cur?.contains(rel)) return;
  if (hoverTargetColumn.value === columnId) {
    hoverTargetColumn.value = null;
  }
}

async function onDropToTopic(event: DragEvent, targetTopic: string) {
  event.preventDefault();
  const repo = activeDragRepo.value;
  const fromTopic = activeDragFromTopic.value;
  onDragEnd();

  if (!repo) return;

  if (targetTopic === "default") {
    // 拖回默认板块：从原 topic 移除
    if (fromTopic && fromTopic !== "default") {
      await myReposController.removeRepoFromTopic(repo, fromTopic);
    }
  } else {
    // 拖到新 topic 板块
    if (fromTopic && fromTopic !== "default" && fromTopic !== targetTopic) {
      const next = repo.topics.filter(t => t !== fromTopic);
      if (!next.includes(targetTopic)) next.push(targetTopic);
      await myReposController.syncRepoTopics(repo, next);
    } else {
      await myReposController.addRepoToTopic(repo, targetTopic);
    }
  }
}

function openRepoUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  } catch {
    return "";
  }
}

watch(
  () => props.active,
  (visible) => {
    if (visible && !myReposState.repos.length) {
      void myReposController.load();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.active && !myReposState.repos.length) {
    void myReposController.load();
  }
});
</script>

<template>
  <div class="my-repos-workspace">
    <!-- 顶栏工具区 -->
    <header class="my-repos-header">
      <div class="header-left">
        <h2 class="title">
          <span class="icon">📦</span>
          <span>我的仓库 · Topic 看板</span>
          <span class="count-pill">{{ myReposState.repos.length }} 个项目</span>
        </h2>
        <span v-if="myReposState.syncingTopic" class="sync-status">
          <i class="spin-icon">⏳</i> 正在同步 GitHub 远端 Topics…
        </span>
      </div>

      <div class="header-right">
        <div class="search-box">
          <input
            v-model="myReposState.searchQuery"
            type="text"
            placeholder="过滤仓库名 / 描述 / 标签..."
            class="search-input"
          />
          <button
            v-if="myReposState.searchQuery"
            type="button"
            class="clear-btn"
            @click="myReposState.searchQuery = ''"
          >✕</button>
        </div>

        <button
          type="button"
          class="btn-refresh"
          :disabled="myReposState.loading || myReposState.syncingTopic"
          title="重新从 GitHub 拉取仓库列表"
          @click="myReposController.load(true)"
        >
          <span :class="{ spinning: myReposState.loading }">🔄</span>
          <span>{{ myReposState.loading ? '正在刷新…' : '刷新仓库' }}</span>
        </button>
      </div>
    </header>

    <!-- 错误状态提示条 -->
    <div v-if="myReposState.errorMessage" class="error-banner">
      <span>⚠️ {{ myReposState.errorMessage }}</span>
      <button type="button" @click="myReposController.load(true)">重试</button>
    </div>

    <!-- 看板横向多列滚动区 -->
    <div class="board-viewport">
      <div class="board-columns-track">
        
        <!-- 1. 左侧第一列：默认板块 (未分配 Topic / 基础列表) -->
        <section
          class="board-column default-column"
          :class="{ 'drop-active': hoverTargetColumn === 'default' }"
          @dragover="onDragOver($event, 'default')"
          @dragleave="onDragLeave($event, 'default')"
          @drop="onDropToTopic($event, 'default')"
        >
          <header class="column-header">
            <div class="column-title-group">
              <span class="col-dot default-dot"></span>
              <h3 class="column-title">默认板块</h3>
              <span class="badge-count">{{ defaultColumnRepos.length }}</span>
            </div>
            <div class="column-actions">
              <span class="column-hint" title="未分配到右侧任何 Topic 的项目自动归入此板块">未分类</span>
            </div>
          </header>

          <div class="column-cards-scroll">
            <div
              v-for="repo in defaultColumnRepos"
              :key="repo.id"
              class="repo-card"
              :class="{ 'card-dragging': activeDragRepo?.id === repo.id }"
              draggable="true"
              @dragstart="onDragStart($event, repo, 'default')"
              @dragend="onDragEnd"
            >
              <div class="repo-card-head">
                <span class="repo-name" :title="repo.fullName" @click="openRepoUrl(repo.htmlUrl)">
                  {{ repo.name }}
                </span>
                <span v-if="repo.isPrivate" class="badge-repo-visibility private">私有</span>
                <span v-if="repo.isFork" class="badge-repo-visibility fork">Fork</span>
              </div>

              <p v-if="repo.description" class="repo-desc" :title="repo.description">
                {{ repo.description }}
              </p>

              <!-- 已有 Topics 标签 -->
              <div v-if="repo.topics.length" class="repo-topics-row">
                <span v-for="t in repo.topics" :key="t" class="topic-chip">
                  #{{ t }}
                </span>
              </div>

              <div class="repo-card-footer">
                <div class="meta-left">
                  <span v-if="repo.language" class="meta-item lang">
                    <span class="lang-color"></span>{{ repo.language }}
                  </span>
                  <span class="meta-item">⭐ {{ repo.stargazersCount }}</span>
                  <span v-if="repo.forksCount" class="meta-item">🍴 {{ repo.forksCount }}</span>
                </div>
                <span class="meta-date" :title="'最后更新：' + repo.updatedAt">
                  {{ formatDate(repo.pushedAt || repo.updatedAt) }}
                </span>
              </div>
            </div>

            <div v-if="!defaultColumnRepos.length" class="empty-column-placeholder">
              <span>暂无未分类仓库</span>
            </div>
          </div>
        </section>

        <!-- 2. 右侧各个 Topic 看板列 -->
        <section
          v-for="topic in activeTopicColumns"
          :key="topic"
          class="board-column topic-column"
          :class="{ 'drop-active': hoverTargetColumn === topic }"
          @dragover="onDragOver($event, topic)"
          @dragleave="onDragLeave($event, topic)"
          @drop="onDropToTopic($event, topic)"
        >
          <header class="column-header">
            <!-- 正常标题显示 -->
            <div v-if="renamingColumnTopic !== topic" class="column-title-group">
              <span class="col-dot topic-dot"></span>
              <h3 class="column-title" :title="'GitHub Topic: ' + topic">
                #{{ topic }}
              </h3>
              <span class="badge-count">{{ getReposForTopic(topic).length }}</span>
            </div>

            <!-- 内联重命名输入框 -->
            <div v-else class="column-rename-group">
              <input
                v-model="renameTopicInput"
                type="text"
                class="rename-input"
                @keydown.enter="handleConfirmRename(topic)"
                @keydown.esc="renamingColumnTopic = null"
                autofocus
              />
              <button type="button" class="btn-confirm-rename" @click="handleConfirmRename(topic)">✓</button>
              <button type="button" class="btn-cancel-rename" @click="renamingColumnTopic = null">✕</button>
            </div>

            <div class="column-actions">
              <button
                type="button"
                class="col-more-btn"
                title="板块操作（重命名 / 删除）"
                @click="activeMenuColumn = activeMenuColumn === topic ? null : topic"
              >•••</button>

              <!-- 气泡弹出菜单 -->
              <div v-if="activeMenuColumn === topic" class="col-popover-menu">
                <button type="button" class="menu-item" @click="startRenameTopic(topic)">
                  ✏️ 重命名 Topic 并同步
                </button>
                <button type="button" class="menu-item danger" @click="handleDeleteTopic(topic)">
                  🗑️ 删除板块并从远端移除
                </button>
              </div>
            </div>
          </header>

          <!-- 添加仓库内嵌按钮 -->
          <div class="column-add-wrap">
            <button
              v-if="activeAddRepoColumnTopic !== topic"
              type="button"
              class="btn-column-add"
              @click="activeAddRepoColumnTopic = topic"
            >
              ＋ 添加仓库到此 Topic
            </button>

            <!-- 选仓库下拉面板 -->
            <div v-else class="add-repo-picker">
              <div class="picker-head">
                <span>选择要加入 #{{ topic }} 的仓库：</span>
                <button type="button" class="picker-close" @click="activeAddRepoColumnTopic = null">✕</button>
              </div>
              <div class="picker-list">
                <button
                  v-for="cand in getCandidateReposForTopic(topic)"
                  :key="cand.id"
                  type="button"
                  class="picker-repo-item"
                  @click="handleAddRepoToTopic(cand, topic)"
                >
                  <span class="cand-name">{{ cand.name }}</span>
                  <span class="cand-visibility">{{ cand.isPrivate ? '私有' : '公开' }}</span>
                </button>
                <div v-if="!getCandidateReposForTopic(topic).length" class="picker-empty">
                  全部仓库均已加入此 Topic
                </div>
              </div>
            </div>
          </div>

          <div class="column-cards-scroll">
            <div
              v-for="repo in getReposForTopic(topic)"
              :key="repo.id"
              class="repo-card"
              :class="{ 'card-dragging': activeDragRepo?.id === repo.id }"
              draggable="true"
              @dragstart="onDragStart($event, repo, topic)"
              @dragend="onDragEnd"
            >
              <div class="repo-card-head">
                <span class="repo-name" :title="repo.fullName" @click="openRepoUrl(repo.htmlUrl)">
                  {{ repo.name }}
                </span>
                <span v-if="repo.isPrivate" class="badge-repo-visibility private">私有</span>
                <span v-if="repo.isFork" class="badge-repo-visibility fork">Fork</span>
              </div>

              <p v-if="repo.description" class="repo-desc" :title="repo.description">
                {{ repo.description }}
              </p>

              <!-- 卡片上的 Topic 标签，带快速移除按钮 -->
              <div class="repo-topics-row">
                <span class="topic-chip active-chip">
                  #{{ topic }}
                  <i
                    class="remove-topic-btn"
                    title="从当前 Topic 移除并同步到 GitHub"
                    @click.stop="handleRemoveRepoFromTopic(repo, topic)"
                  >✕</i>
                </span>
                <!-- 其他附带的 topics -->
                <span
                  v-for="other in repo.topics.filter(t => t !== topic)"
                  :key="other"
                  class="topic-chip other-chip"
                >
                  #{{ other }}
                </span>
              </div>

              <div class="repo-card-footer">
                <div class="meta-left">
                  <span v-if="repo.language" class="meta-item lang">
                    <span class="lang-color"></span>{{ repo.language }}
                  </span>
                  <span class="meta-item">⭐ {{ repo.stargazersCount }}</span>
                  <span v-if="repo.forksCount" class="meta-item">🍴 {{ repo.forksCount }}</span>
                </div>
                <span class="meta-date">
                  {{ formatDate(repo.pushedAt || repo.updatedAt) }}
                </span>
              </div>
            </div>

            <div v-if="!getReposForTopic(topic).length" class="empty-column-placeholder">
              <span>暂无项目，可从左侧拖拽或点击上方添加</span>
            </div>
          </div>
        </section>

        <!-- 3. 最右侧：＋ 新建 Topic 板块 -->
        <section class="board-column new-column-slot">
          <div v-if="!isCreatingTopic" class="new-column-placeholder" @click="isCreatingTopic = true">
            <span class="plus-icon">＋</span>
            <span class="new-col-text">新建 Topic 板块</span>
          </div>

          <div v-else class="new-column-composer">
            <header class="composer-header">
              <strong>新建 Topic 分组</strong>
              <small>将作为 GitHub 远端标签同步</small>
            </header>
            <input
              v-model="newTopicInput"
              type="text"
              placeholder="例如 tools, vue3, robotics..."
              class="composer-input"
              @keydown.enter="handleCreateTopic"
              @keydown.esc="isCreatingTopic = false"
              autofocus
            />
            <div class="composer-actions">
              <button type="button" class="btn-primary" @click="handleCreateTopic">创建板块</button>
              <button type="button" class="btn-cancel" @click="isCreatingTopic = false">取消</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>
.my-repos-workspace {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--surface, #ffffff);
  color: var(--text, #1e293b);
  overflow: hidden;
}

/* 顶栏 */
.my-repos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: var(--panel, #ffffff);
  flex-shrink: 0;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  display: flex;
  align-items: center;
  gap: 8px;
}

.count-pill {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 9999px;
  color: var(--muted, #64748b);
}

.sync-status {
  font-size: 12px;
  color: var(--muted, #64748b);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.spin-icon {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 220px;
  padding: 6px 26px 6px 10px;
  font-size: 12px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  outline: none;
  transition: border-color 0.15s ease;
}

.search-input:focus {
  border-color: #0284c7;
}

.clear-btn {
  position: absolute;
  right: 6px;
  background: none;
  border: none;
  color: var(--muted, #94a3b8);
  cursor: pointer;
  font-size: 12px;
  padding: 2px;
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-refresh:hover:not(:disabled) {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  border-color: var(--border-strong, rgba(0, 0, 0, 0.2));
}

.error-banner {
  padding: 8px 16px;
  background: #fef2f2;
  border-bottom: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-banner button {
  background: none;
  border: 1px solid #f87171;
  color: #b91c1c;
  border-radius: 4px;
  padding: 2px 8px;
  cursor: pointer;
}

/* 看板视口 */
.board-viewport {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 16px 20px;
}

.board-columns-track {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  height: 100%;
}

/* 列基础容器 */
.board-column {
  width: 290px;
  min-width: 290px;
  max-width: 290px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--panel, #f8fafc);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

/* 拖拽悬停反馈 */
.board-column.drop-active {
  border-color: #0284c7 !important;
  background: rgba(2, 132, 199, 0.04) !important;
}

.default-column {
  background: var(--surface, #f8fafc);
  border-color: var(--border, rgba(0, 0, 0, 0.1));
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 10px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.05));
  flex-shrink: 0;
  position: relative;
}

.column-title-group {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.col-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.default-dot {
  background: #94a3b8;
}

.topic-dot {
  background: #0284c7;
}

.column-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-count {
  font-size: 11px;
  color: var(--muted, #64748b);
  margin-left: 2px;
}

.column-hint {
  font-size: 11px;
  color: var(--muted, #94a3b8);
}

.col-more-btn {
  background: none;
  border: none;
  color: var(--muted, #94a3b8);
  font-size: 13px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
}

.col-more-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--text, #1e293b);
}

/* 列菜单气泡 */
.col-popover-menu {
  position: absolute;
  top: 36px;
  right: 10px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 4px;
  z-index: 50;
  min-width: 170px;
}

.menu-item {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 6px 10px;
  font-size: 12px;
  color: var(--text, #334155);
  border-radius: 4px;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
}

.menu-item.danger {
  color: #dc2626;
}

.menu-item.danger:hover {
  background: #fef2f2;
}

/* 重命名列控件 */
.column-rename-group {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.rename-input {
  flex: 1;
  font-size: 12px;
  padding: 3px 6px;
  border: 1px solid #0284c7;
  border-radius: 4px;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
}

.btn-confirm-rename, .btn-cancel-rename {
  border: none;
  border-radius: 4px;
  padding: 3px 6px;
  font-size: 11px;
  cursor: pointer;
}

.btn-confirm-rename {
  background: #0284c7;
  color: #ffffff;
}

.btn-cancel-rename {
  background: var(--surface-hover, #e2e8f0);
  color: var(--muted, #64748b);
}

/* ＋ 添加仓库区 */
.column-add-wrap {
  padding: 8px 12px 4px;
  position: relative;
}

.btn-column-add {
  width: 100%;
  padding: 6px 10px;
  font-size: 11.5px;
  color: var(--muted, #64748b);
  background: var(--surface-hover, rgba(0, 0, 0, 0.02));
  border: 1px dashed var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.btn-column-add:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: #0284c7;
  border-color: #0284c7;
}

.add-repo-picker {
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.15));
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 8px;
  position: absolute;
  top: 100%;
  left: 10px;
  right: 10px;
  z-index: 60;
  max-height: 220px;
  display: flex;
  flex-direction: column;
}

.picker-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
  margin-bottom: 6px;
}

.picker-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted, #94a3b8);
}

.picker-list {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.picker-repo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border: none;
  background: var(--surface-hover, rgba(0, 0, 0, 0.02));
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}

.picker-repo-item:hover {
  background: #f0f9ff;
  color: #0284c7;
}

.cand-name {
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cand-visibility {
  font-size: 9.5px;
  color: var(--muted, #94a3b8);
}

.picker-empty {
  font-size: 11px;
  color: var(--muted, #94a3b8);
  text-align: center;
  padding: 12px;
}

/* 卡片滚动列表 */
.column-cards-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 仓库卡片基础样式：设置 flex-shrink: 0 彻底防止卡片被纵向挤压压缩 */
.repo-card {
  flex-shrink: 0;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  cursor: grab;
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
}

.repo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border-color: var(--border-strong, rgba(0, 0, 0, 0.18));
  transform: translateY(-1px);
}

.repo-card:active {
  cursor: grabbing;
}

.repo-card.card-dragging {
  opacity: 0.4;
  border-style: dashed;
  border-color: #0284c7;
}

.repo-card-head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.repo-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.repo-name:hover {
  color: #0284c7;
  text-decoration: underline;
}

.badge-repo-visibility {
  font-size: 9px;
  font-weight: 500;
  padding: 1px 5px;
  border-radius: 4px;
}

.badge-repo-visibility.private {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

.badge-repo-visibility.fork {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.repo-desc {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--muted, #64748b);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-topics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.topic-chip {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  color: var(--muted, #64748b);
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.active-chip {
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 500;
}

.remove-topic-btn {
  cursor: pointer;
  font-style: normal;
  font-size: 9px;
  opacity: 0.6;
}

.remove-topic-btn:hover {
  opacity: 1;
  color: #b91c1c;
}

.repo-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  color: var(--muted, #94a3b8);
  margin-top: 2px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-color {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0284c7;
  margin-right: 3px;
}

.empty-column-placeholder {
  padding: 30px 10px;
  text-align: center;
  font-size: 11.5px;
  color: var(--muted, #94a3b8);
  border: 1px dashed var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  margin-top: 4px;
}

/* 新建板块插槽 */
.new-column-slot {
  background: transparent;
  border: 1px dashed var(--border, rgba(0, 0, 0, 0.15));
}

.new-column-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--muted, #64748b);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.15s ease;
}

.new-column-placeholder:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.03));
  color: #0284c7;
  border-color: #0284c7;
}

.plus-icon {
  font-size: 24px;
  font-weight: 300;
}

.new-col-text {
  font-size: 12.5px;
  font-weight: 500;
}

.new-column-composer {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.composer-header strong {
  display: block;
  font-size: 13px;
  color: var(--heading, #0f172a);
}

.composer-header small {
  display: block;
  font-size: 10.5px;
  color: var(--muted, #94a3b8);
  margin-top: 2px;
}

.composer-input {
  width: 100%;
  box-sizing: border-box;
  padding: 7px 10px;
  font-size: 12px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.15));
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  outline: none;
}

.composer-input:focus {
  border-color: #0284c7;
}

.composer-actions {
  display: flex;
  gap: 8px;
}

.composer-actions .btn-primary {
  flex: 1;
  padding: 6px 10px;
  background: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
}

.composer-actions .btn-primary:hover {
  background: #0369a1;
}

.composer-actions .btn-cancel {
  padding: 6px 10px;
  background: var(--surface-hover, #f1f5f9);
  color: var(--muted, #64748b);
  border: none;
  border-radius: 6px;
  font-size: 11.5px;
  cursor: pointer;
}
</style>
