<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch } from "vue";
import { myReposState, myReposController, type MyRepoItem } from "./my-repos-store";
import { notifications } from "../sdk/notifications";
import { githubTaskModalController } from "./github-task-modal-store";
import { t } from "../i18n";

const props = defineProps<{
  active?: boolean;
}>();

const newGroupInput = ref("");
const isCreatingGroup = ref(false);
const activeMenuColumn = ref<string | null>(null);
const renameGroupInput = ref("");
const renamingColumnGroup = ref<string | null>(null);

// 看板横向滚动容器引用
const boardViewportRef = ref<HTMLElement | null>(null);
const shelfScrollRef = ref<HTMLElement | null>(null);
const isDefaultShelfCollapsed = ref(false);

function toggleShelfCollapse() {
  isDefaultShelfCollapsed.value = !isDefaultShelfCollapsed.value;
}

function onShelfWheel(event: WheelEvent) {
  const shelf = shelfScrollRef.value;
  if (!shelf) return;
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && event.deltaX !== 0) {
    return;
  }
  if (event.deltaY !== 0) {
    event.preventDefault();
    shelf.scrollLeft += event.deltaY;
  }
}

// 内存直接绑定的拖拽状态
const activeDragRepo = ref<MyRepoItem | null>(null);
const activeDragFromGroup = ref<string | null>(null);
const hoverTargetColumn = ref<string | null>(null);

// 边缘自动滚动状态
let autoScrollRaf: number | null = null;
let autoScrollVelocity = 0;

// -------------------------------------------------------------
// 右键上下文菜单与级联子菜单系统（对齐 GitHubRepositories 原生菜单体验）
// -------------------------------------------------------------
const contextMenuState = reactive<{
  visible: boolean;
  x: number;
  y: number;
  repo: MyRepoItem | null;
  fromGroup: string | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  repo: null,
  fromGroup: null
});

const activeSubMenu = ref<string | null>(null);
const isFlyoutLeft = ref(false);

function closeContextMenu(): void {
  contextMenuState.visible = false;
  activeSubMenu.value = null;
}

function handleOpenContextMenu(e: MouseEvent, repo: MyRepoItem, fromGroup: string) {
  e.preventDefault();
  e.stopPropagation();

  let x = e.clientX;
  let y = e.clientY;
  if (x > window.innerWidth - 200) x = window.innerWidth - 210;
  if (y > window.innerHeight - 240) y = window.innerHeight - 245;

  contextMenuState.x = x;
  contextMenuState.y = y;
  contextMenuState.repo = repo;
  contextMenuState.fromGroup = fromGroup;
  contextMenuState.visible = true;
  activeSubMenu.value = "folder";
  isFlyoutLeft.value = x > window.innerWidth - 380;
}

async function handleMoveToDefault() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  await myReposController.moveRepoToGroup(repo, null);
}

async function handleMoveToGroup(targetGroup: string) {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  await myReposController.moveRepoToGroup(repo, targetGroup);
}

async function handleCopyRepoUrl() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  try {
    await navigator.clipboard.writeText(repo.htmlUrl);
    notifications.show({
      appName: "GitHub",
      title: t("github.myRepos.copiedUrlTitle"),
      message: t("github.myRepos.copiedUrlMsg", { name: repo.name })
    });
  } catch {}
}

async function handleCopyCloneCommand() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  try {
    const cmd = `git clone ${repo.htmlUrl}.git`;
    await navigator.clipboard.writeText(cmd);
    notifications.show({
      appName: "GitHub",
      title: t("github.myRepos.copiedCloneTitle"),
      message: cmd
    });
  } catch {}
}

function handleOpenInGitHub() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  openRepoUrl(repo.htmlUrl);
}

function handleCreateTask() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  githubTaskModalController.open({
    fullName: repo.fullName,
    description: repo.description || "",
    stars: repo.stargazersCount,
    language: repo.language || undefined,
    updated: repo.pushedAt
  });
}

function onGlobalPointerDown(event: PointerEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target?.closest(".gh-repo-context-menu")) {
    if (contextMenuState.visible) closeContextMenu();
  }
}

function onGlobalKeyDown(event: KeyboardEvent): void {
  if (event.key === "Escape" && contextMenuState.visible) {
    closeContextMenu();
  }
}

// -------------------------------------------------------------
// 数据过滤与计算
// -------------------------------------------------------------

// 活跃的分组列：用户自定义的中文/英文分组列表
const activeGroupColumns = computed(() => {
  return myReposState.customGroups;
});

// 过滤后的仓库列表
const filteredRepos = computed(() => {
  const q = myReposState.searchQuery.trim().toLowerCase();
  if (!q) return myReposState.repos;
  return myReposState.repos.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.localGroups.some(g => g.toLowerCase().includes(q)) ||
    r.topics.some(t => t.toLowerCase().includes(q)) ||
    (r.language && r.language.toLowerCase().includes(q))
  );
});

// 左侧“未分类”中的仓库：没有被赋予任何本地分组的仓库
const defaultColumnRepos = computed(() => {
  return filteredRepos.value.filter(r => !r.localGroups.length);
});

// 获取属于特定分组列的仓库
function getReposForGroup(group: string): MyRepoItem[] {
  return filteredRepos.value.filter(r => r.localGroups.includes(group));
}

// 新建分组板块
async function handleCreateGroup() {
  const name = newGroupInput.value.trim();
  if (!name) return;
  const created = await myReposController.createGroup(name);
  if (created) {
    newGroupInput.value = "";
    isCreatingGroup.value = false;
  }
}

// 开始重命名分组
function startRenameGroup(group: string) {
  renamingColumnGroup.value = group;
  renameGroupInput.value = group;
  activeMenuColumn.value = null;
}

// 确认重命名分组
async function handleConfirmRename(oldGroup: string) {
  const newName = renameGroupInput.value.trim();
  if (!newName || newName === oldGroup) {
    renamingColumnGroup.value = null;
    return;
  }
  const ok = await myReposController.renameGroup(oldGroup, newName);
  if (ok) {
    renamingColumnGroup.value = null;
  }
}

// 删除分组板块
async function handleDeleteGroup(group: string) {
  activeMenuColumn.value = null;
  await myReposController.deleteGroup(group);
}

// 从指定分组移除仓库
async function handleRemoveRepoFromGroup(repo: MyRepoItem, group: string) {
  await myReposController.removeRepoFromGroup(repo, group);
}

// -------------------------------------------------------------
// 横向滚动与拖拽交互逻辑（支持 Shift+滚轮、拖拽中直接滚轮、触边自动滚动）
// -------------------------------------------------------------

function onViewportWheel(event: WheelEvent) {
  const vp = boardViewportRef.value;
  if (!vp) return;

  const target = event.target as HTMLElement | null;
  const colScroll = target?.closest(".column-cards-scroll");
  if (colScroll && colScroll.scrollHeight > colScroll.clientHeight && !event.shiftKey && event.deltaX === 0) {
    const atTop = colScroll.scrollTop <= 0 && event.deltaY < 0;
    const atBottom = colScroll.scrollTop + colScroll.clientHeight >= colScroll.scrollHeight - 1 && event.deltaY > 0;
    if (!atTop && !atBottom) {
      return;
    }
  }

  if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && event.deltaX !== 0) {
    return;
  }

  if (event.deltaY !== 0) {
    event.preventDefault();
    vp.scrollLeft += event.deltaY;
  }
}

function onWindowWheelWhileDragging(event: WheelEvent) {
  if (!activeDragRepo.value || !boardViewportRef.value) return;
  event.preventDefault();
  const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
  boardViewportRef.value.scrollLeft += delta;
}

function startAutoScroll() {
  if (autoScrollRaf !== null) return;
  const step = () => {
    if (boardViewportRef.value && autoScrollVelocity !== 0) {
      boardViewportRef.value.scrollLeft += autoScrollVelocity;
      autoScrollRaf = requestAnimationFrame(step);
    } else {
      stopAutoScroll();
    }
  };
  autoScrollRaf = requestAnimationFrame(step);
}

function stopAutoScroll() {
  if (autoScrollRaf !== null) {
    cancelAnimationFrame(autoScrollRaf);
    autoScrollRaf = null;
  }
  autoScrollVelocity = 0;
}

function checkEdgeAutoScroll(clientX: number) {
  if (!activeDragRepo.value || !boardViewportRef.value) return;
  const rect = boardViewportRef.value.getBoundingClientRect();
  const threshold = 100;

  if (clientX > rect.right - threshold) {
    const ratio = Math.min(1, Math.max(0.1, (clientX - (rect.right - threshold)) / threshold));
    autoScrollVelocity = Math.round(ratio * 20);
    startAutoScroll();
  } else if (clientX < rect.left + threshold) {
    const ratio = Math.min(1, Math.max(0.1, ((rect.left + threshold) - clientX) / threshold));
    autoScrollVelocity = -Math.round(ratio * 20);
    startAutoScroll();
  } else {
    stopAutoScroll();
  }
}

function onViewportDragOver(event: DragEvent) {
  if (!activeDragRepo.value) return;
  event.preventDefault();
  checkEdgeAutoScroll(event.clientX);
}

function onDragStart(event: DragEvent, repo: MyRepoItem, fromGroup: string) {
  closeContextMenu();
  activeDragRepo.value = repo;
  activeDragFromGroup.value = fromGroup;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", `${repo.id}:${fromGroup}`);
  }
  window.addEventListener("wheel", onWindowWheelWhileDragging, { passive: false });
}

function onDragEnd() {
  activeDragRepo.value = null;
  activeDragFromGroup.value = null;
  hoverTargetColumn.value = null;
  stopAutoScroll();
  window.removeEventListener("wheel", onWindowWheelWhileDragging);
}

function onDragOver(event: DragEvent, columnId: string) {
  if (!activeDragRepo.value) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  hoverTargetColumn.value = columnId;
  checkEdgeAutoScroll(event.clientX);
}

function onDragLeave(event: DragEvent, columnId: string) {
  const cur = event.currentTarget as HTMLElement | null;
  const rel = event.relatedTarget as Node | null;
  if (cur?.contains(rel)) return;
  if (hoverTargetColumn.value === columnId) {
    hoverTargetColumn.value = null;
  }
}

async function onDropToGroup(event: DragEvent, targetGroup: string) {
  event.preventDefault();
  const repo = activeDragRepo.value;
  const fromGroup = activeDragFromGroup.value;
  onDragEnd();

  if (!repo) return;

  if (targetGroup === "default") {
    // 拖回默认板块（未分类）：从所有/当前分组移除
    if (fromGroup && fromGroup !== "default") {
      await myReposController.removeRepoFromGroup(repo, fromGroup);
    } else {
      await myReposController.moveRepoToGroup(repo, null);
    }
  } else {
    // 拖到指定自定义分组
    await myReposController.addRepoToGroup(repo, targetGroup);
    if (fromGroup && fromGroup !== "default" && fromGroup !== targetGroup) {
      await myReposController.removeRepoFromGroup(repo, fromGroup);
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
    window.removeEventListener("pointerdown", onGlobalPointerDown);
    window.removeEventListener("keydown", onGlobalKeyDown);
    closeContextMenu();

    if (visible) {
      window.addEventListener("pointerdown", onGlobalPointerDown);
      window.addEventListener("keydown", onGlobalKeyDown);
      void myReposController.load();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.active) {
    window.addEventListener("pointerdown", onGlobalPointerDown);
    window.addEventListener("keydown", onGlobalKeyDown);
    void myReposController.load();
  }
});

onUnmounted(() => {
  stopAutoScroll();
  window.removeEventListener("wheel", onWindowWheelWhileDragging);
  window.removeEventListener("pointerdown", onGlobalPointerDown);
  window.removeEventListener("keydown", onGlobalKeyDown);
});
</script>

<template>
  <div class="my-repos-workspace">

    <!-- 错误横幅提示 -->
    <div v-if="myReposState.errorMessage" class="error-banner">
      <span>⚠️ {{ myReposState.errorMessage }}</span>
      <button type="button" class="btn-retry" @click="myReposController.load(true)">重试</button>
    </div>

    <!-- 1. 上方：未分类与全部仓库抽屉托盘 (Default Shelf) -->
    <section
      class="default-shelf-area"
      :class="{ 'is-collapsed': isDefaultShelfCollapsed, 'drop-active': hoverTargetColumn === 'default' }"
      @dragover="onDragOver($event, 'default')"
      @dragleave="onDragLeave($event, 'default')"
      @drop="onDropToGroup($event, 'default')"
    >
      <header class="shelf-header">
        <div class="shelf-left">
          <span class="shelf-icon">📁</span>
          <span class="shelf-title">未分类仓库</span>
          <span class="shelf-badge">{{ defaultColumnRepos.length }}</span>
          <span class="shelf-sub-tip">（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）</span>
        </div>

        <div class="shelf-right">
          <!-- 搜索框 -->
          <div class="shelf-search-wrap">
            <span class="search-icon">🔍</span>
            <input
              v-model="myReposState.searchQuery"
              type="text"
              class="shelf-search-input"
              placeholder="搜索我的仓库名称、简介或语言…"
            />
            <button
              v-if="myReposState.searchQuery"
              type="button"
              class="clear-search-btn"
              @click="myReposState.searchQuery = ''"
            >✕</button>
          </div>

          <!-- 紧凑刷新按钮 -->
          <button
            type="button"
            class="shelf-btn-refresh"
            :disabled="myReposState.loading"
            :title="t('github.myRepos.refreshBtnTitle')"
            @click="myReposController.load(true)"
          >
            <span :class="{ spinning: myReposState.loading }">🔄</span>
            <span>{{ myReposState.loading ? t('github.myRepos.refreshing') : t('common.refresh') }}</span>
          </button>

          <!-- 折叠切换 -->
          <button
            type="button"
            class="shelf-toggle-btn"
            :title="isDefaultShelfCollapsed ? t('github.myRepos.expandShelf') : t('github.myRepos.collapseShelf')"
            @click="toggleShelfCollapse"
          >
            {{ isDefaultShelfCollapsed ? t('github.myRepos.expandBtn') : t('github.myRepos.collapseBtn') }}
          </button>
        </div>
      </header>

      <div
        v-show="!isDefaultShelfCollapsed"
        ref="shelfScrollRef"
        class="shelf-cards-scroll"
        @wheel="onShelfWheel"
      >
        <div
          v-for="repo in defaultColumnRepos"
          :key="repo.id"
          class="repo-card shelf-card"
          :class="{ 'card-dragging': activeDragRepo?.id === repo.id }"
          draggable="true"
          @dragstart="onDragStart($event, repo, 'default')"
          @dragend="onDragEnd"
          @contextmenu="handleOpenContextMenu($event, repo, 'default')"
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

          <div v-if="repo.topics.length" class="repo-topics-row">
            <span v-for="t in repo.topics" :key="t" class="topic-chip-tag" title="GitHub 远端引流标签">
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

        <div v-if="!defaultColumnRepos.length" class="empty-shelf-placeholder">
          <span>暂无未分类仓库，所有仓库都已归入下方自定义板块</span>
        </div>
      </div>
    </section>

    <!-- 2. 下方：各个自定义分组看板横向多列滚动区 -->
    <div
      ref="boardViewportRef"
      class="board-viewport"
      @wheel="onViewportWheel"
      @dragover="onViewportDragOver"
    >
      <div class="board-columns-track">
        <!-- 右侧各个本地自定义分组看板列 -->
        <section
          v-for="group in activeGroupColumns"
          :key="group"
          class="board-column topic-column"
          :class="{ 'drop-active': hoverTargetColumn === group }"
          @dragover="onDragOver($event, group)"
          @dragleave="onDragLeave($event, group)"
          @drop="onDropToGroup($event, group)"
        >
          <header class="column-header">
            <!-- 正常标题显示 -->
            <div v-if="renamingColumnGroup !== group" class="column-title-group">
              <span class="col-dot topic-dot"></span>
              <h3 class="column-title" :title="'自定义分组: ' + group">
                📁 {{ group }}
              </h3>
              <span class="badge-count">{{ getReposForGroup(group).length }}</span>
            </div>

            <!-- 内联重命名输入框 -->
            <div v-else class="column-rename-group">
              <input
                v-model="renameGroupInput"
                type="text"
                class="rename-input"
                @keydown.enter="handleConfirmRename(group)"
                @keydown.esc="renamingColumnGroup = null"
                autofocus
              />
              <button type="button" class="btn-confirm-rename" @click="handleConfirmRename(group)">✓</button>
              <button type="button" class="btn-cancel-rename" @click="renamingColumnGroup = null">✕</button>
            </div>

            <div class="column-actions">
              <button
                type="button"
                class="col-more-btn"
                title="分组操作"
                @click="activeMenuColumn = activeMenuColumn === group ? null : group"
              >•••</button>

              <!-- 气泡弹出菜单 -->
              <div v-if="activeMenuColumn === group" class="col-popover-menu">
                <button type="button" class="menu-item" @click="startRenameGroup(group)">
                  重命名分组
                </button>
                <button type="button" class="menu-item danger" @click="handleDeleteGroup(group)">
                  删除分组
                </button>
              </div>
            </div>
          </header>

          <div class="column-cards-scroll">
            <div
              v-for="repo in getReposForGroup(group)"
              :key="repo.id"
              class="repo-card"
              :class="{ 'card-dragging': activeDragRepo?.id === repo.id }"
              draggable="true"
              @dragstart="onDragStart($event, repo, group)"
              @dragend="onDragEnd"
              @contextmenu="handleOpenContextMenu($event, repo, group)"
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

              <!-- 仓库所属分组与移除按钮 -->
              <div class="repo-topics-row">
                <span class="topic-chip active-chip">
                  📁 {{ group }}
                  <i
                    class="remove-topic-btn"
                    title="从该分组移出"
                    @click.stop="handleRemoveRepoFromGroup(repo, group)"
                  >✕</i>
                </span>
                <!-- 显示远端 GitHub Topics 仅作标识参考 -->
                <span
                  v-for="t in repo.topics"
                  :key="t"
                  class="topic-chip-tag"
                  title="GitHub 远端引流标签"
                >
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
                <span class="meta-date">
                  {{ formatDate(repo.pushedAt || repo.updatedAt) }}
                </span>
              </div>
            </div>

            <div v-if="!getReposForGroup(group).length" class="empty-column-placeholder">
              <span>暂无仓库，可从上方或其它列拖入</span>
            </div>
          </div>
        </section>

        <!-- 3. 最右侧：＋ 新建分组板块 -->
        <section class="board-column new-column-slot">
          <div v-if="!isCreatingGroup" class="new-column-placeholder" @click="isCreatingGroup = true">
            <span class="plus-icon">＋</span>
            <span class="new-col-text">新建分组板块</span>
          </div>

          <div v-else class="new-column-composer">
            <header class="composer-header">
              <strong>新建分组板块</strong>
              <small>支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics</small>
            </header>
            <input
              v-model="newGroupInput"
              type="text"
              placeholder="输入分组名称（如：前端工具、深度学习）"
              class="composer-input"
              @keydown.enter="handleCreateGroup"
              @keydown.esc="isCreatingGroup = false"
              autofocus
            />
            <div class="composer-actions">
              <button type="button" class="btn-primary" @click="handleCreateGroup">创建</button>
              <button type="button" class="btn-cancel" @click="isCreatingGroup = false">{{ t('common.cancel') }}</button>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- 🌟 GitHub 仓库卡片右键上下文菜单（采用成熟的 fo-cover-context-menu 与 gh-sub-flyout 级联子菜单系统） -->
    <Teleport to="body">
      <div
        v-if="contextMenuState.visible && contextMenuState.repo"
        class="fo-cover-context-menu gh-repo-context-menu"
        :style="{ left: `${contextMenuState.x}px`, top: `${contextMenuState.y}px` }"
        @click.stop
        @contextmenu.prevent
      >
        <!-- 1. 移动到分组（悬停/点击展开子菜单） -->
        <div
          class="gh-menu-has-sub"
          :class="{ 'is-active': activeSubMenu === 'folder' }"
          @mouseenter="activeSubMenu = 'folder'"
        >
          <button
            class="fo-cover-menu-item with-sub-arrow"
            type="button"
            @click.stop="activeSubMenu = activeSubMenu === 'folder' ? null : 'folder'"
          >
            <span>移动到分组</span>
            <span class="sub-arrow">›</span>
          </button>

          <!-- 侧边级联飞出子菜单 -->
          <div
            class="gh-sub-flyout"
            :class="{ 'flyout-left': isFlyoutLeft }"
            @click.stop
          >
            <!-- 设为未分类 -->
            <button
              class="fo-cover-menu-item"
              :class="{ primary: !contextMenuState.repo.localGroups.length }"
              type="button"
              @click="handleMoveToDefault"
            >
              {{ !contextMenuState.repo.localGroups.length ? "✓ " : "  " }}设为未分类
            </button>

            <!-- 各个自定义分组 -->
            <button
              v-for="grp in activeGroupColumns"
              :key="grp"
              class="fo-cover-menu-item"
              :class="{ primary: contextMenuState.repo.localGroups.includes(grp) }"
              type="button"
              @click="handleMoveToGroup(grp)"
            >
              {{ contextMenuState.repo.localGroups.includes(grp) ? "✓ " : "  " }}📁 {{ grp }}
            </button>
          </div>
        </div>

        <!-- 2. 普通主菜单项，鼠标滑过自动收起子菜单 -->
        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="handleCopyRepoUrl"
        >
          {{ t('github.myRepos.copyRepoUrl') }}
        </button>

        <!-- 3. 复制克隆命令 -->
        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="handleCopyCloneCommand"
        >
          {{ t('github.myRepos.copyCloneCmd') }}
        </button>

        <!-- 4. 创建任务 -->
        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="handleCreateTask"
        >
          创建任务
        </button>

        <!-- 5. 在 GitHub 打开 -->
        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="handleOpenInGitHub"
        >
          {{ t('github.myRepos.openInGitHub') }}
        </button>
      </div>
    </Teleport>

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

.btn-retry {
  background: #ffffff;
  border: 1px solid #f87171;
  color: #b91c1c;
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
}

/* 1. 顶部默认货架区 (Shelf) */
.default-shelf-area {
  display: flex;
  flex-direction: column;
  background: var(--panel, #f8fafc);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.default-shelf-area.drop-active {
  background: rgba(2, 132, 199, 0.06);
  outline: 2px dashed #0284c7;
  outline-offset: -2px;
}

.shelf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 12px;
}

.shelf-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.shelf-icon {
  font-size: 15px;
}

.shelf-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.shelf-badge {
  background: var(--surface, #e2e8f0);
  color: var(--muted, #64748b);
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 10px;
  font-weight: 600;
}

.shelf-sub-tip {
  font-size: 11px;
  color: var(--muted, #94a3b8);
}

.shelf-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.shelf-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 8px;
  font-size: 11px;
  color: var(--muted, #94a3b8);
  pointer-events: none;
}

.shelf-search-input {
  padding: 4px 26px 4px 26px;
  font-size: 12px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #ffffff);
  color: var(--text, #1e293b);
  width: 200px;
  outline: none;
  transition: all 0.15s;
}

.shelf-search-input:focus {
  border-color: #0284c7;
  width: 250px;
}

.clear-search-btn {
  position: absolute;
  right: 6px;
  background: transparent;
  border: none;
  color: var(--muted, #94a3b8);
  font-size: 10px;
  cursor: pointer;
  padding: 2px;
}

.shelf-btn-refresh {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  background: var(--surface, #ffffff);
  color: var(--text, #334155);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.shelf-btn-refresh:hover:not(:disabled) {
  background: var(--panel, #f1f5f9);
}

.spinning {
  display: inline-block;
  animation: spin 1s linear infinite;
}

.shelf-toggle-btn {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  background: var(--surface, #ffffff);
  color: var(--muted, #64748b);
  font-size: 11.5px;
  cursor: pointer;
}

.shelf-cards-scroll {
  display: flex;
  gap: 12px;
  padding: 4px 16px 12px;
  overflow-x: auto;
  overflow-y: hidden;
  max-height: 180px;
}

.shelf-card {
  flex: 0 0 240px;
}

.empty-shelf-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100%;
  color: var(--muted, #94a3b8);
  font-size: 12px;
}

/* 2. 看板横向多列滚动视窗 */
.board-viewport {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  padding: 14px 16px;
  box-sizing: border-box;
}

.board-columns-track {
  display: flex;
  gap: 16px;
  height: 100%;
  align-items: stretch;
}

.board-column {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--panel, #f8fafc);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: background-color 0.15s, outline 0.15s;
}

.board-column.drop-active {
  background: rgba(2, 132, 199, 0.06);
  outline: 2px dashed #0284c7;
  outline-offset: -2px;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--panel, #f1f5f9);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  flex-shrink: 0;
}

.column-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.col-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0284c7;
  flex-shrink: 0;
}

.column-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge-count {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
  background: var(--surface, #e2e8f0);
  padding: 1px 6px;
  border-radius: 8px;
}

.column-rename-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.rename-input {
  flex: 1;
  font-size: 12px;
  padding: 3px 6px;
  border: 1px solid #0284c7;
  border-radius: 4px;
  background: var(--surface, #ffffff);
  color: var(--heading, #0f172a);
  outline: none;
}

.btn-confirm-rename,
.btn-cancel-rename {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  padding: 3px 5px;
  border-radius: 4px;
}

.btn-confirm-rename {
  color: #16a34a;
}

.btn-cancel-rename {
  color: #ef4444;
}

.column-actions {
  position: relative;
}

.col-more-btn {
  border: none;
  background: transparent;
  color: var(--muted, #94a3b8);
  font-size: 13px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.col-more-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--heading, #0f172a);
}

.col-popover-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  width: 110px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  z-index: 100;
}

.menu-item {
  border: none;
  background: transparent;
  color: var(--text, #334155);
  font-size: 12px;
  padding: 7px 12px;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
}

.menu-item.danger {
  color: #ef4444;
}

.menu-item.danger:hover {
  background: rgba(239, 68, 68, 0.08);
}

.column-cards-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 卡片样式 */
.repo-card {
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: grab;
  user-select: none;
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
}

.repo-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-color: var(--border, rgba(0, 0, 0, 0.16));
}

.repo-card.card-dragging {
  opacity: 0.4;
  transform: scale(0.96);
}

.repo-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.repo-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repo-name:hover {
  color: #0284c7;
  text-decoration: underline;
}

.badge-repo-visibility {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 4px;
  font-weight: 500;
  flex-shrink: 0;
}

.badge-repo-visibility.private {
  background: rgba(234, 179, 8, 0.15);
  color: #b45309;
}

.badge-repo-visibility.fork {
  background: var(--surface, #f1f5f9);
  color: var(--muted, #64748b);
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
  gap: 5px;
}

.topic-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 5px;
  font-weight: 500;
}

.topic-chip.active-chip {
  background: rgba(2, 132, 199, 0.12);
  color: #0284c7;
}

.remove-topic-btn {
  font-style: normal;
  font-size: 9px;
  cursor: pointer;
  opacity: 0.7;
}

.remove-topic-btn:hover {
  opacity: 1;
  color: #ef4444;
}

.topic-chip-tag {
  background: var(--surface, rgba(0, 0, 0, 0.04));
  color: var(--muted, #64748b);
  font-size: 10.5px;
  padding: 1px 6px;
  border-radius: 4px;
}

.repo-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--muted, #94a3b8);
  margin-top: 2px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.lang-color {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0ea5e9;
  display: inline-block;
}

.empty-column-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: var(--muted, #94a3b8);
  font-size: 12px;
  border: 1px dashed var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  margin-top: 10px;
}

/* 3. 新建分组列 */
.new-column-slot {
  background: transparent;
  border: 1px dashed var(--border, rgba(0, 0, 0, 0.18));
}

.new-column-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 8px;
  cursor: pointer;
  color: var(--muted, #64748b);
  transition: all 0.15s;
}

.new-column-placeholder:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.03));
  color: #0284c7;
}

.plus-icon {
  font-size: 20px;
  font-weight: 300;
}

.new-col-text {
  font-size: 13px;
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
  font-size: 11px;
  color: var(--muted, #64748b);
  margin-top: 2px;
}

.composer-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  font-size: 12.5px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.15));
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  outline: none;
}

.composer-input:focus {
  border-color: #0284c7;
}

.composer-actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  flex: 1;
  padding: 7px;
  border-radius: 6px;
  border: none;
  background: #0284c7;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #0369a1;
}

.btn-cancel {
  padding: 7px 12px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #ffffff);
  color: var(--muted, #64748b);
  font-size: 12px;
  cursor: pointer;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
