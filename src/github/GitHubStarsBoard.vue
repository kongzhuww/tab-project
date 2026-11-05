<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import { gitHubService, type GitHubRawRepo } from "../services/github.service";
import { starBoardController as controller, starBoardState as state } from "./stars-board-store";
import { starBoardData, getStarBoardRepoFolders } from "./stars-board-data";
import { githubRepoDetailController } from "./repo-detail-store";
import { REPOSITORY_DRAG_TYPE, readRepositoryDrag } from "./repository-drag";
import { t } from "../i18n";

const props = defineProps<{
  active?: boolean;
}>();

// 看板横向滚动容器引用
const boardViewportRef = ref<HTMLElement | null>(null);
const shelfScrollRef = ref<HTMLElement | null>(null);

// 顶部托盘是否折叠
const isDefaultShelfCollapsed = ref(false);
function toggleShelfCollapse() {
  isDefaultShelfCollapsed.value = !isDefaultShelfCollapsed.value;
}

// 托盘滚轮横向滚动映射
function onShelfWheel(event: WheelEvent) {
  const el = shelfScrollRef.value;
  if (!el) return;
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && event.deltaX !== 0) return;
  if (event.deltaY !== 0) {
    event.preventDefault();
    el.scrollLeft += event.deltaY;
  }
}

// 是否正在加载
const isLoading = computed(() => starBoardData.loading);
const showShelfSkeleton = computed(() => isLoading.value && !starBoardData.repos.length);

// 拖拽状态
const activeDragRepo = ref<GitHubRawRepo | null>(null);
const activeDragFromList = ref<string | null>(null);
const hoverTargetColumn = ref<string | null>(null);

// 边缘自动滚动状态
let autoScrollTimer: number | null = null;
let autoScrollVelocity = 0;

function startAutoScroll() {
  if (autoScrollTimer !== null) return;
  autoScrollTimer = window.setInterval(() => {
    if (!boardViewportRef.value || autoScrollVelocity === 0) return;
    boardViewportRef.value.scrollLeft += autoScrollVelocity;
  }, 16);
}

function stopAutoScroll() {
  if (autoScrollTimer !== null) {
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
  autoScrollVelocity = 0;
}

// 列表列更多操作上下文菜单
const listMenuState = reactive<{
  visible: boolean;
  x: number;
  y: number;
  list: any | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  list: null
});

function closeListMenu(): void {
  listMenuState.visible = false;
  listMenuState.list = null;
}

function handleOpenListMenu(e: MouseEvent, list: any) {
  e.preventDefault();
  e.stopPropagation();
  closeContextMenu();
  const menuWidth = 150;
  const menuHeight = 130;
  const x = Math.min(e.clientX, window.innerWidth - menuWidth - 10);
  const y = Math.min(e.clientY, window.innerHeight - menuHeight - 10);
  listMenuState.x = x;
  listMenuState.y = y;
  listMenuState.list = list;
  listMenuState.visible = true;
}

async function handleRenameList() {
  const l = listMenuState.list;
  closeListMenu();
  if (!l) return;
  await gitHubService.renameFolder(l.id, l.name);
}

async function handlePinList() {
  const l = listMenuState.list;
  closeListMenu();
  if (!l) return;
  await gitHubService.pinFolder(l.id);
}

async function handleDeleteList() {
  const l = listMenuState.list;
  closeListMenu();
  if (!l) return;
  await gitHubService.deleteFolder(l.name);
}

// 分组列拖拽换位
const draggingColumnId = ref<string | null>(null);
const hoverColumnId = ref<string | null>(null);

function onColDragStart(event: DragEvent, list: any) {
  closeListMenu();
  closeContextMenu();
  draggingColumnId.value = list.id;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/x-gh-col-id", list.id);
  }
}

function onColDragEnd() {
  draggingColumnId.value = null;
  hoverColumnId.value = null;
}

function onColDragOver(event: DragEvent, targetListId: string) {
  if (!draggingColumnId.value || draggingColumnId.value === targetListId) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  hoverColumnId.value = targetListId;
}

function onColDragLeave(event: DragEvent, targetListId: string) {
  if (hoverColumnId.value === targetListId) {
    hoverColumnId.value = null;
  }
}

async function onColDrop(event: DragEvent, targetListId: string) {
  if (!draggingColumnId.value || draggingColumnId.value === targetListId) return;
  event.preventDefault();
  const fromId = draggingColumnId.value;
  onColDragEnd();
  await gitHubService.reorderFolders(fromId, targetListId);
}

// 右键上下文菜单
const contextMenuState = reactive<{
  visible: boolean;
  x: number;
  y: number;
  repo: GitHubRawRepo | null;
  fromList: string | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  repo: null,
  fromList: null
});

const activeSubMenu = ref<string | null>(null);
const isFlyoutLeft = ref(false);

function closeContextMenu(): void {
  contextMenuState.visible = false;
  contextMenuState.repo = null;
  contextMenuState.fromList = null;
  activeSubMenu.value = null;
}

function handleOpenContextMenu(e: MouseEvent, repo: GitHubRawRepo, fromList: string | null) {
  e.preventDefault();
  e.stopPropagation();

  const menuWidth = 190;
  const menuHeight = 220;
  const x = Math.min(e.clientX, window.innerWidth - menuWidth - 10);
  const y = Math.min(e.clientY, window.innerHeight - menuHeight - 10);

  contextMenuState.x = x;
  contextMenuState.y = y;
  contextMenuState.repo = repo;
  contextMenuState.fromList = fromList;
  contextMenuState.visible = true;
  activeSubMenu.value = "folder";
  isFlyoutLeft.value = x > window.innerWidth - 380;
}

async function handleMoveToDefault() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  await controller.moveRepoToList(repo.full_name, gitHubService.UNCAT);
}

async function handleMoveToList(targetList: string) {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo) return;
  await controller.moveRepoToList(repo.full_name, targetList);
}

async function handleCopyRepoUrl() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo?.html_url) return;
  try {
    await navigator.clipboard.writeText(repo.html_url);
  } catch {}
}

async function handleCopyCloneCommand() {
  const repo = contextMenuState.repo;
  closeContextMenu();
  if (!repo?.full_name) return;
  try {
    await navigator.clipboard.writeText(`git clone https://github.com/${repo.full_name}.git`);
  } catch {}
}

function onGlobalPointerDown(event: PointerEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target?.closest(".fo-cover-context-menu") && !target?.closest(".col-popover-menu") && !target?.closest(".gh-list-col-menu")) {
    closeContextMenu();
    closeListMenu();
  }
}

function onGlobalKeyDown(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    closeContextMenu();
    closeListMenu();
  }
}

// 看板横向滚轮映射
function onViewportWheel(event: WheelEvent) {
  const vp = boardViewportRef.value;
  if (!vp) return;

  const target = event.target as HTMLElement | null;
  const colScroll = target?.closest(".column-cards-scroll");
  if (colScroll && colScroll.scrollHeight > colScroll.clientHeight && !event.shiftKey && event.deltaX === 0) {
    const isAtTop = colScroll.scrollTop === 0 && event.deltaY < 0;
    const isAtBottom = Math.ceil(colScroll.scrollTop + colScroll.clientHeight) >= colScroll.scrollHeight && event.deltaY > 0;
    if (!isAtTop && !isAtBottom) {
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
  const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
  boardViewportRef.value.scrollLeft += delta;
}

function checkEdgeAutoScroll(clientX: number) {
  const vp = boardViewportRef.value;
  if (!vp) return;

  const rect = vp.getBoundingClientRect();
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
  checkEdgeAutoScroll(event.clientX);
}

function onDragStart(event: DragEvent, repo: GitHubRawRepo, fromList: string | null) {
  closeContextMenu();
  activeDragRepo.value = repo;
  activeDragFromList.value = fromList;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(REPOSITORY_DRAG_TYPE, repo.full_name);
    event.dataTransfer.setData("text/plain", `${repo.full_name}:${fromList || "uncategorized"}`);
  }
  window.addEventListener("wheel", onWindowWheelWhileDragging, { passive: false });
}

function onDragEnd() {
  activeDragRepo.value = null;
  activeDragFromList.value = null;
  hoverTargetColumn.value = null;
  stopAutoScroll();
  window.removeEventListener("wheel", onWindowWheelWhileDragging);
}

function onDragOver(event: DragEvent, columnId: string) {
  if (!props.active || (!activeDragRepo.value && !Array.from(event.dataTransfer?.types || []).includes(REPOSITORY_DRAG_TYPE))) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
  hoverTargetColumn.value = columnId;
}

function onDragLeave(event: DragEvent, columnId: string) {
  const current = event.currentTarget as HTMLElement | null;
  if (current && event.relatedTarget instanceof Node && current.contains(event.relatedTarget)) {
    return;
  }
  if (hoverTargetColumn.value === columnId) {
    hoverTargetColumn.value = null;
  }
}

async function onDropToColumn(event: DragEvent, targetList: string) {
  event.preventDefault();
  const fullName = activeDragRepo.value?.full_name || readRepositoryDrag(event.dataTransfer);
  onDragEnd();
  if (!props.active || !fullName) return;
  await controller.moveRepoToList(fullName, targetList === "uncategorized" ? gitHubService.UNCAT : targetList);
}

function openRepoDetail(repo: GitHubRawRepo) {
  githubRepoDetailController.open(repo.full_name, undefined, repo);
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

onMounted(() => {
  window.addEventListener("pointerdown", onGlobalPointerDown);
  window.addEventListener("keydown", onGlobalKeyDown);
});

onUnmounted(() => {
  stopAutoScroll();
  window.removeEventListener("wheel", onWindowWheelWhileDragging);
  window.removeEventListener("pointerdown", onGlobalPointerDown);
  window.removeEventListener("keydown", onGlobalKeyDown);
});
</script>

<template>
  <div class="stars-board-workspace">
    <!-- 1. 上方：未分类 Star 仓库全宽长方形单排托盘 -->
    <section
      class="default-shelf-area"
      :data-gh-list-drop="gitHubService.UNCAT"
      :class="{ 'is-collapsed': isDefaultShelfCollapsed, 'drop-active': hoverTargetColumn === 'uncategorized' }"
      @dragover="onDragOver($event, 'uncategorized')"
      @dragleave="onDragLeave($event, 'uncategorized')"
      @drop="onDropToColumn($event, 'uncategorized')"
    >
      <header class="shelf-header">
        <div class="shelf-left">
          <span class="shelf-icon">📁</span>
          <span class="shelf-title">未分类 Star 收藏</span>
          <span class="shelf-badge">{{ controller.filteredUncatRepos.length }}</span>
          <span class="shelf-sub-tip">（拖入此处即可取消本地分组归属；单排 10 个一页）</span>
        </div>

        <div class="shelf-right">
          <!-- 顶栏分页器：[ < 1/5页 > ] -->
          <div v-if="controller.filteredUncatRepos.length > state.pageSize" class="shelf-pager">
            <button
              type="button"
              class="pager-btn"
              :disabled="controller.uncatPage <= 1"
              title="上一页"
              @click="controller.prevUncatPage"
            >‹</button>
            <span class="pager-text">{{ controller.uncatPage }} / {{ controller.uncatTotalPages }} 页</span>
            <button
              type="button"
              class="pager-btn"
              :disabled="controller.uncatPage >= controller.uncatTotalPages"
              title="下一页"
              @click="controller.nextUncatPage"
            >›</button>
          </div>

          <!-- 刷新按钮 -->
          <button
            type="button"
            class="shelf-btn-refresh"
            title="刷新 Star 列表"
            :disabled="isLoading"
            :aria-busy="isLoading"
            @click="gitHubService.refreshRepositories()"
          >
            <span :class="{ spinning: isLoading }">🔄</span>
            <span>{{ isLoading ? '读取中…' : '刷新' }}</span>
          </button>

          <!-- 折叠切换 -->
          <button
            v-if="controller.filteredUncatRepos.length"
            type="button"
            class="shelf-toggle-btn"
            :title="isDefaultShelfCollapsed ? '展开托盘' : '收起托盘'"
            @click="toggleShelfCollapse"
          >
            {{ isDefaultShelfCollapsed ? '展开 ▼' : '收起 ▲' }}
          </button>
        </div>
      </header>

      <!-- 骨架屏占位（当加载中且暂无卡片时展示） -->
      <div
        v-if="showShelfSkeleton"
        v-show="!isDefaultShelfCollapsed"
        class="shelf-cards-scroll"
      >
        <div v-for="i in 6" :key="'skel-shelf-' + i" class="repo gh-card shelf-card skel-card">
          <div class="skel-line skel-title"></div>
          <div class="skel-line skel-desc"></div>
          <div class="skel-line skel-meta"></div>
        </div>
      </div>

      <!-- 单排横向切片容器：严格标准 126px 高度卡片 -->
      <div
        v-else-if="controller.filteredUncatRepos.length"
        v-show="!isDefaultShelfCollapsed"
        ref="shelfScrollRef"
        class="shelf-cards-scroll"
        @wheel="onShelfWheel"
      >
        <article
          v-for="repo in controller.pagedUncatRepos"
          :key="repo.full_name"
          class="repo gh-card shelf-card"
          :class="{ 'card-dragging': activeDragRepo?.full_name === repo.full_name }"
          draggable="true"
          @click="openRepoDetail(repo)"
          @dragstart="onDragStart($event, repo, null)"
          @dragend="onDragEnd"
          @contextmenu="handleOpenContextMenu($event, repo, null)"
        >
          <button class="fo-card-more" type="button" aria-label="更多操作" title="更多操作" @click.stop="handleOpenContextMenu($event, repo, null)">⋮</button>

          <!-- 头部：头像 + 仓库名 (owner/name) -->
          <div class="gh-card-head">
            <img
              class="gh-owner-avatar"
              :src="repo.owner?.avatar_url || 'assets/github-star.svg'"
              alt=""
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="($event.target as HTMLImageElement).src='assets/github-star.svg'"
            >
            <a
              :href="repo.html_url"
              target="_blank"
              rel="noreferrer"
              class="name"
              :title="repo.full_name"
              @click.stop
            >
              <span class="owner">{{ repo.owner?.login || repo.full_name.split('/')[0] }}/</span>{{ repo.name }}
            </a>
          </div>

          <!-- 卡片内容 -->
          <div class="gh-card-body">
            <div class="gh-card-badges">
              <span class="gh-badge-folder uncat">＋ 未分类</span>
              <!-- 折叠的 Topics 标签：最多展示前 2 个，超出显示 +N，绝对不撑大卡片 -->
              <template v-if="repo.topics && repo.topics.length">
                <span
                  v-for="t in repo.topics.slice(0, 2)"
                  :key="t"
                  class="gh-badge-topic-chip"
                  :title="'Topic: ' + t"
                >
                  #{{ t }}
                </span>
                <span
                  v-if="repo.topics.length > 2"
                  class="gh-badge-topic-chip more"
                  :title="repo.topics.slice(2).map(t => '#' + t).join(' ')"
                >
                  +{{ repo.topics.length - 2 }}
                </span>
              </template>
            </div>

            <p class="desc" :title="repo.description || ''">
              {{ repo.description || "暂无描述" }}
            </p>
          </div>

          <!-- 底栏元数据 -->
          <div class="meta">
            <span class="gh-stars">★ {{ repo.stargazers_count }}</span>
            <span v-if="repo.language" class="gh-lang">{{ repo.language }}</span>
            <span class="gh-updated">更新 {{ formatDate(repo.updated_at) }}</span>
          </div>
        </article>

        <!-- 末尾快捷翻页卡片：直接点击翻到下一页，高度严格与标准卡片对齐 -->
        <div
          v-if="controller.uncatPage < controller.uncatTotalPages"
          class="repo gh-card shelf-card shelf-next-card"
          title="点击翻到下一页"
          @click="controller.nextUncatPage"
        >
          <div class="shelf-next-content">
            <span class="shelf-next-icon">➔</span>
            <span class="shelf-next-title">下一页</span>
            <span class="shelf-next-sub">{{ controller.uncatPage + 1 }} / {{ controller.uncatTotalPages }} 页</span>
          </div>
        </div>
      </div>
      <p v-else-if="!isDefaultShelfCollapsed" class="shelf-empty" role="status">
        {{ starBoardData.searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库" }}
      </p>
    </section>

    <!-- 2. 下方：各个 GitHub 原生 Lists 看板横向多列滚动区 -->
    <div
      ref="boardViewportRef"
      class="board-viewport"
      @wheel="onViewportWheel"
      @dragover="onViewportDragOver"
    >
      <!-- 骨架屏占位（当加载中且暂无 Lists 时展示） -->
      <div v-if="isLoading && !controller.lists.length" class="board-columns-track">
        <div v-for="c in 4" :key="'skel-col-' + c" class="board-column skel-column">
          <div class="column-header">
            <div class="skel-line" style="width: 120px; height: 16px;"></div>
          </div>
          <div class="column-cards-scroll">
            <div v-for="r in 3" :key="'skel-col-card-' + r" class="repo gh-card skel-card">
              <div class="skel-line skel-title"></div>
              <div class="skel-line skel-desc"></div>
              <div class="skel-line skel-meta"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 真实各 Lists 看板列 -->
      <div v-else class="board-columns-track">
        <section
          v-for="list in controller.lists"
          :key="list.id"
          class="board-column list-column"
          :data-gh-list-drop="list.name"
          :class="{
            'drop-active': hoverTargetColumn === list.name,
            'col-dragging': draggingColumnId === list.id,
            'col-hover-target': hoverColumnId === list.id
          }"
          @dragover="activeDragRepo ? onDragOver($event, list.name) : onColDragOver($event, list.id)"
          @dragleave="activeDragRepo ? onDragLeave($event, list.name) : onColDragLeave($event, list.id)"
          @drop="activeDragRepo ? onDropToColumn($event, list.name) : onColDrop($event, list.id)"
        >
          <header
            class="column-header"
            :title="'拖动此列可调换位置；右侧更多可重命名、置顶或删除'"
          >
            <div class="column-title-group">
              <span class="col-dot list-dot"></span>
              <h3 class="column-title" :title="list.description || ('本地分组: ' + list.name)">
                📁 {{ list.name }}
              </h3>
              <span v-if="list.pinned" class="col-pinned-icon" title="已置顶分组">📌</span>
              <span class="badge-count">{{ controller.getReposForList(list.name).length }}</span>
            </div>

            <div class="column-actions">
              <button
                type="button"
                class="col-more-btn col-drag-handle"
                title="按住拖动可调换分组位置；点击打开更多操作"
                draggable="true"
                aria-label="分组操作与拖拽手柄"
                @dragstart="onColDragStart($event, list)"
                @dragend="onColDragEnd"
                @click.stop="handleOpenListMenu($event, list)"
              >⋮</button>
            </div>
          </header>

          <div class="column-cards-scroll">
            <article
              v-for="repo in controller.getReposForList(list.name)"
              :key="repo.full_name"
              class="repo gh-card"
              :class="{ 'card-dragging': activeDragRepo?.full_name === repo.full_name }"
              draggable="true"
              @click="openRepoDetail(repo)"
              @dragstart="onDragStart($event, repo, list.name)"
              @dragend="onDragEnd"
              @contextmenu="handleOpenContextMenu($event, repo, list.name)"
            >
              <button class="fo-card-more" type="button" aria-label="更多操作" title="更多操作" @click.stop="handleOpenContextMenu($event, repo, list.name)">⋮</button>

              <!-- 头部：头像 + 仓库名 -->
              <div class="gh-card-head">
                <img
                  class="gh-owner-avatar"
                  :src="repo.owner?.avatar_url || 'assets/github-star.svg'"
                  alt=""
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  @error="($event.target as HTMLImageElement).src='assets/github-star.svg'"
                >
                <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noreferrer"
                  class="name"
                  :title="repo.full_name"
                  @click.stop
                >
                  <span class="owner">{{ repo.owner?.login || repo.full_name.split('/')[0] }}/</span>{{ repo.name }}
                </a>
              </div>

              <!-- 卡片内容 -->
              <div class="gh-card-body">
                <div class="gh-card-badges">
                  <span class="gh-badge-folder" :title="'属于列表: ' + list.name">
                    📁 {{ list.name }}
                    <span
                      class="btn-inline-remove"
                      title="从该列表中移出"
                      role="button"
                      tabindex="0"
                      @click.stop="controller.removeRepoFromList(repo.full_name, list.name)"
                    >×</span>
                  </span>
                  <!-- 折叠的 Topics 标签：最多展示前 2 个，超出显示 +N，绝对不撑大卡片 -->
                  <template v-if="repo.topics && repo.topics.length">
                    <span
                      v-for="t in repo.topics.slice(0, 2)"
                      :key="t"
                      class="gh-badge-topic-chip"
                      :title="'Topic: ' + t"
                    >
                      #{{ t }}
                    </span>
                    <span
                      v-if="repo.topics.length > 2"
                      class="gh-badge-topic-chip more"
                      :title="repo.topics.slice(2).map(t => '#' + t).join(' ')"
                    >
                      +{{ repo.topics.length - 2 }}
                    </span>
                  </template>
                </div>

                <p class="desc" :title="repo.description || ''">
                  {{ repo.description || "暂无描述" }}
                </p>
              </div>

              <!-- 底栏元数据 -->
              <div class="meta">
                <span class="gh-stars">★ {{ repo.stargazers_count }}</span>
                <span v-if="repo.language" class="gh-lang">{{ repo.language }}</span>
                <span class="gh-updated">更新 {{ formatDate(repo.updated_at) }}</span>
              </div>
            </article>

            <div v-if="!controller.getReposForList(list.name).length" class="empty-column-dropzone">
              <span>暂无仓库，可从上方或其它列拖入</span>
            </div>
          </div>
        </section>

        <!-- 新建本地分组卡片列 -->
        <section class="board-column add-column-panel">
          <button
            type="button"
            class="btn-trigger-add-col"
            @click="gitHubService.promptCreateFolder()"
          >
            <span class="plus-icon">＋</span>
            <span>新建本地分组</span>
          </button>
        </section>
      </div>
    </div>

    <!-- 3. 右键上下文菜单 -->
    <Teleport to="body">
      <div
        v-if="contextMenuState.visible && contextMenuState.repo"
        class="fo-cover-context-menu gh-repo-context-menu"
        :style="{ left: `${contextMenuState.x}px`, top: `${contextMenuState.y}px` }"
        @click.stop
        @contextmenu.prevent
      >
        <!-- 移动到列表 -->
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
            <span>移动/加入本地分组</span>
            <span class="sub-arrow">›</span>
          </button>

          <div
            class="gh-sub-flyout"
            :class="{ 'flyout-left': isFlyoutLeft }"
            @click.stop
          >
            <button
              class="fo-cover-menu-item"
              type="button"
              @click="handleMoveToDefault"
            >
              设为未分类
            </button>
            <button
              v-for="l in controller.lists"
              :key="l.id"
              class="fo-cover-menu-item"
              :class="{ primary: getStarBoardRepoFolders(contextMenuState.repo.full_name).includes(l.name) }"
              type="button"
              @click="handleMoveToList(l.name)"
            >
              {{ getStarBoardRepoFolders(contextMenuState.repo.full_name).includes(l.name) ? "✓ " : "  " }}📁 {{ l.name }}
            </button>
          </div>
        </div>

        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="openRepoDetail(contextMenuState.repo!)"
        >
          查看仓库详情
        </button>

        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="handleCopyRepoUrl"
        >
          复制仓库链接
        </button>

        <button
          class="fo-cover-menu-item"
          type="button"
          @mouseenter="activeSubMenu = null"
          @click="handleCopyCloneCommand"
        >
          复制克隆命令 (git clone)
        </button>
      </div>

      <!-- 分组列更多操作菜单 (重命名、置顶、删除) -->
      <div
        v-if="listMenuState.visible && listMenuState.list"
        class="fo-cover-context-menu gh-list-col-menu"
        :style="{ left: `${listMenuState.x}px`, top: `${listMenuState.y}px` }"
        @click.stop
        @contextmenu.prevent
      >
        <button
          class="fo-cover-menu-item"
          type="button"
          @click="handleRenameList"
        >
          ✏️ 重命名分组
        </button>
        <button
          class="fo-cover-menu-item"
          type="button"
          @click="handlePinList"
        >
          <span>{{ listMenuState.list?.pinned ? '📍 取消置顶' : '📌 置顶此分组' }}</span>
        </button>
        <button
          class="fo-cover-menu-item danger"
          type="button"
          @click="handleDeleteList"
        >
          🗑️ 删除分组
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.stars-board-workspace {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg, #f1f5f9);
}

/* 顶部全宽长方形单排托盘 */
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
  width: 220px;
  height: 28px;
  padding: 0 24px 0 26px;
  font-size: 11.5px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  background: var(--surface, #ffffff);
  color: var(--text, #1e293b);
  outline: none;
  transition: all 0.15s ease;
}

.shelf-search-input:focus {
  width: 260px;
  border-color: #0284c7;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15);
}

.clear-search-btn {
  position: absolute;
  right: 6px;
  background: none;
  border: none;
  color: var(--muted, #94a3b8);
  font-size: 11px;
  cursor: pointer;
}

/* 顶栏分页器 */
.shelf-pager {
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--surface, #f1f5f9);
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0,0,0,0.08));
}

.pager-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: var(--text, #1e293b);
  padding: 0 4px;
  border-radius: 4px;
  line-height: 1;
}

.pager-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pager-btn:not(:disabled):hover {
  background: rgba(0,0,0,0.06);
}

.pager-text {
  font-size: 11px;
  color: var(--muted, #64748b);
  font-weight: 500;
  user-select: none;
}

.shelf-btn-refresh,
.shelf-toggle-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  padding: 0 10px;
  font-size: 11.5px;
  color: var(--text, #334155);
  background: var(--surface, #f8fafc);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.shelf-btn-refresh:hover,
.shelf-toggle-btn:hover {
  background: var(--panel, #ffffff);
  border-color: #0284c7;
  color: #0284c7;
}

.shelf-empty {
  padding: 12px 16px;
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.shelf-btn-refresh:disabled {
  cursor: default;
  opacity: 0.7;
}

.spinning {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 单排横向卡片托盘 */
.shelf-cards-scroll {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 8px 16px 12px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

/* 顶部托盘中的标准卡片（严格 126px 高度） */
.shelf-card {
  width: 270px;
  min-width: 270px;
  max-width: 270px;
  flex: 0 0 270px;
  box-sizing: border-box;
  margin-bottom: 0 !important;
}

/* 末尾下一页快捷卡片：尺寸与标准 126px 卡片完全对齐 */
.shelf-next-card {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 2px dashed #0284c7 !important;
  background: rgba(2, 132, 199, 0.04) !important;
  cursor: pointer !important;
  transition: all 0.2s ease;
}

.shelf-next-card:hover {
  background: rgba(2, 132, 199, 0.1) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
}

.shelf-next-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #0284c7;
  text-align: center;
}

.shelf-next-icon {
  font-size: 18px;
  font-weight: bold;
}

.shelf-next-title {
  font-size: 13px;
  font-weight: 600;
}

.shelf-next-sub {
  font-size: 11px;
  opacity: 0.8;
}

/* 优雅 Topics 标签折叠 */
.gh-badge-topic-chip {
  font-size: 10px;
  background: var(--panel, rgba(0, 0, 0, 0.04));
  color: var(--muted, #64748b);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  line-height: 1.3;
}

.gh-badge-topic-chip.more {
  background: rgba(2, 132, 199, 0.08);
  color: #0284c7;
  font-weight: 600;
  cursor: help;
}

.btn-inline-remove {
  font-size: 13px;
  font-weight: bold;
  margin-left: 4px;
  cursor: pointer;
  opacity: 0.7;
}

.btn-inline-remove:hover {
  opacity: 1;
  color: #ef4444;
}

/* 下方横向看板 */
.board-viewport {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px 16px 14px 16px;
  min-height: 0;
}

.board-columns-track {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
  height: 100%;
}

.board-column {
  display: flex;
  flex-direction: column;
  width: 290px;
  min-width: 290px;
  max-width: 290px;
  height: 100%;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.15s ease;
}

.board-column.drop-active {
  background: rgba(2, 132, 199, 0.05);
  border-color: #0284c7;
  outline: 2px dashed #0284c7;
  outline-offset: -2px;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  flex-shrink: 0;
}

.column-title-group {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.col-dot.list-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0284c7;
  flex-shrink: 0;
}

.column-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.col-pinned-icon {
  font-size: 11px;
  flex-shrink: 0;
  line-height: 1;
  margin-left: -2px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
}

.badge-count {
  font-size: 11px;
  background: var(--surface, #f1f5f9);
  color: var(--muted, #64748b);
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 600;
  margin-left: 2px;
  flex-shrink: 0;
}

.col-more-btn {
  background: none;
  border: none;
  color: var(--muted, #94a3b8);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  user-select: none;
}

.col-more-btn:hover {
  background: var(--surface, #f1f5f9);
  color: #0284c7;
}

.col-drag-handle {
  cursor: grab;
}

.col-drag-handle:active {
  cursor: grabbing;
}

.board-column.col-dragging {
  opacity: 0.35;
  transform: scale(0.98);
}

.board-column.col-hover-target {
  outline: 2px dashed #0284c7;
  outline-offset: -2px;
  background: rgba(2, 132, 199, 0.05);
}

.gh-list-col-menu {
  min-width: 140px;
}

.gh-list-col-menu .fo-cover-menu-item.danger {
  color: var(--danger, #ef4444);
}

.gh-list-col-menu .fo-cover-menu-item.danger:hover {
  background: rgba(239, 68, 68, 0.08);
  color: #dc2626;
}

.column-cards-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

/* 看板内的卡片 */
.column-cards-scroll .repo.gh-card {
  width: 100% !important;
  box-sizing: border-box !important;
  margin-bottom: 0 !important;
}

.empty-column-dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
  border: 1px dashed var(--border, rgba(0, 0, 0, 0.15));
  border-radius: 8px;
  color: var(--muted, #94a3b8);
  font-size: 11.5px;
  text-align: center;
}

/* 新建列表卡片列 */
.add-column-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px dashed var(--border, rgba(0, 0, 0, 0.12));
  box-shadow: none;
}

.btn-trigger-add-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;
}

.btn-trigger-add-col:hover {
  color: #0284c7;
}

.btn-trigger-add-col .plus-icon {
  font-size: 24px;
  font-weight: 300;
}

/* 骨架屏 (Skeleton Screen) 样式 */
.skel-card {
  pointer-events: none !important;
  opacity: 0.65;
  background: var(--surface, #ffffff) !important;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.06)) !important;
}

.skel-column {
  opacity: 0.7;
}

.skel-line {
  background: linear-gradient(90deg, rgba(150, 150, 150, 0.1) 25%, rgba(150, 150, 150, 0.22) 50%, rgba(150, 150, 150, 0.1) 75%);
  background-size: 200% 100%;
  animation: skel-shimmer 1.4s ease-in-out infinite;
  border-radius: 4px;
}

.skel-title {
  width: 60%;
  height: 15px;
  margin-bottom: 10px;
}

.skel-desc {
  width: 90%;
  height: 28px;
  margin-bottom: 12px;
}

.skel-meta {
  width: 40%;
  height: 12px;
}

@keyframes skel-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 右键菜单 */
.gh-repo-context-menu {
  position: fixed;
  z-index: 10000;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 4px 0;
  min-width: 170px;
}

.fo-cover-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 7px 12px;
  background: none;
  border: none;
  font-size: 12px;
  color: var(--text, #1e293b);
  cursor: pointer;
  text-align: left;
}

.fo-cover-menu-item:hover {
  background: var(--surface, #f1f5f9);
}

.fo-cover-menu-item.primary {
  color: #0284c7;
  font-weight: 600;
}

.gh-menu-has-sub {
  position: relative;
}

.sub-arrow {
  font-size: 14px;
  color: var(--muted, #94a3b8);
}

.gh-sub-flyout {
  position: absolute;
  left: 100%;
  top: 0;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 4px 0;
  min-width: 160px;
  max-height: 260px;
  overflow-y: auto;
  z-index: 10001;
}

.gh-sub-flyout.flyout-left {
  left: auto;
  right: 100%;
}
</style>
