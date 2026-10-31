<script setup lang="ts">
import { ref, reactive, computed, watch, onUnmounted } from "vue";
import GitHubRemarkEditor from "./GitHubRemarkEditor.vue";
import { remarkEditor, beginRemark } from "./remark-editor";
const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });
const draftOutsideCards = computed(() => !!remarkEditor.repo && !state.cards.some(card => card.fullName === remarkEditor.repo));
import type { GitHubRepositoryCardView } from "./repositories";
import { githubRepositoryController as controller, githubRepositoryState as state } from "./repositories";
import { githubRepoDetailController } from "./repo-detail-store";
import { gitHubService } from "../services/github.service";
import { githubStatusState } from "./store";
import ChatShareMenu from "../chat/ChatShareMenu.vue";
import { chatService } from "../chat/chat.service";
import type { ChatShareTarget } from "../chat/private-chat-client";

// 右键上下文菜单与分类选择器
const contextMenuState = reactive<{
  visible: boolean;
  x: number;
  y: number;
  fullName: string;
  folders: string[];
  hasRemark: boolean;
  url: string;
}>({
  visible: false,
  x: 0,
  y: 0,
  fullName: "",
  folders: [],
  hasRemark: false,
  url: ""
});

// 🌟 级联悬浮子菜单状态（类似浏览器书签展开，悬停即出）
const activeSubMenu = ref<"folder" | null>(null);
const isFlyoutLeft = ref(false);

function onCardClick(event: MouseEvent, card: GitHubRepositoryCardView): void {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (state.batchMode) {
    if (target.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
    event.preventDefault();
    event.stopPropagation();
    controller.toggleSelection(card.fullName);
    return;
  }
  if (target.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box")) return;
  event.preventDefault();
  event.stopPropagation();
  githubRepoDetailController.open(card.fullName, undefined, card);
}

function openCardContextMenu(event: MouseEvent, card: GitHubRepositoryCardView): void {
  if (!props.active) return;
  event.preventDefault();
  event.stopPropagation();
  const pad = 12;
  const menuWidth = 160;
  const menuHeight = 280;
  const x = Math.min(window.innerWidth - menuWidth - pad, Math.max(pad, event.clientX));
  const y = Math.min(window.innerHeight - menuHeight - pad, Math.max(pad, event.clientY));
  contextMenuState.x = x;
  contextMenuState.y = y;
  contextMenuState.fullName = card.fullName;
  contextMenuState.folders = [...(card.folders || (card.folder ? [card.folder] : []))];
  contextMenuState.hasRemark = Boolean(card.customRemark);
  contextMenuState.url = card.url;
  contextMenuState.visible = true;
  activeSubMenu.value = null;
  isFlyoutLeft.value = x > window.innerWidth - 380;
}

function openCategoryPickerDirectly(card: GitHubRepositoryCardView, event: MouseEvent): void {
  openCardContextMenu(event, card);
  activeSubMenu.value = "folder";
}

function closeContextMenu(): void {
  contextMenuState.visible = false;
  activeSubMenu.value = null;
}

function toggleFolder(folder: string): void {
  if (contextMenuState.folders.includes(folder)) {
    contextMenuState.folders = contextMenuState.folders.filter(f => f !== folder);
  } else {
    contextMenuState.folders.push(folder);
  }
  gitHubService.toggleRepoList(contextMenuState.fullName, folder);
}

function clearFolders(): void {
  contextMenuState.folders = [];
  gitHubService.clearRepoLists(contextMenuState.fullName);
  closeContextMenu();
}

function startInlineRemark(cardOrFullName?: GitHubRepositoryCardView | string): void {
  if (!props.active) return;
  const name = typeof cardOrFullName === "string" ? cardOrFullName : (cardOrFullName?.fullName || contextMenuState.fullName);
  closeContextMenu();
  beginRemark(name);
}

function clearRemark(): void {
  if (!props.active) return;
  const name = contextMenuState.fullName;
  closeContextMenu();
  beginRemark(name, true);
}

async function copyUrl(): Promise<void> {
  const url = contextMenuState.url;
  closeContextMenu();
  if (url && props.active) {
    try { await navigator.clipboard.writeText(url); } catch (_) {}
  }
}

function shareToRoom(target: ChatShareTarget): void {
  const repo = gitHubService.findRepository(contextMenuState.fullName);
  closeContextMenu();
  if (!repo) return;
  chatService.sendGitHubShare({
    fullName: repo.full_name,
    name: repo.name,
    owner: repo.owner?.login,
    ownerAvatar: repo.owner?.avatar_url,
    desc: repo.description || undefined,
    language: repo.language || undefined,
    stars: repo.stargazers_count,
    category: (contextMenuState.folders && contextMenuState.folders.length ? contextMenuState.folders.join(", ") : "未分类"),
    url: repo.html_url || `https://github.com/${repo.full_name}`,
    updatedAt: repo.updated_at ? repo.updated_at.split("T")[0] : undefined
  }, target);
}

function openExternal(): void {
  if (contextMenuState.url) {
    window.open(contextMenuState.url, "_blank", "noreferrer");
  }
  closeContextMenu();
}

async function unstar(): Promise<void> {
  const repo = gitHubService.findRepository(contextMenuState.fullName);
  if (!repo) {
    closeContextMenu();
    return;
  }
  closeContextMenu();
  await gitHubService.confirmUnstarRepository(repo);
}

function onGlobalPointerDown(event: PointerEvent): void {
  const target = event.target as HTMLElement | null;
  if (target?.closest(".gh-repo-context-menu") || target?.closest(".gh-inline-remark-box")) return;
  closeContextMenu();
}

function onGlobalKeyDown(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    if (contextMenuState.visible) closeContextMenu();
    // Only Escape inside the editor cancels its draft, not unrelated windows.
  }
}

watch(() => props.active, active => {
  window.removeEventListener("pointerdown", onGlobalPointerDown);
  window.removeEventListener("keydown", onGlobalKeyDown);
  closeContextMenu();
  if (active) {
    window.addEventListener("pointerdown", onGlobalPointerDown);
    window.addEventListener("keydown", onGlobalKeyDown);
  }
}, { immediate: true });

onUnmounted(() => {
  window.removeEventListener("pointerdown", onGlobalPointerDown);
  window.removeEventListener("keydown", onGlobalKeyDown);
});

function onDragStart(event: DragEvent, fullName: string): void {
  const target = event.target;
  if (target instanceof Element && target.closest("button,a,input,textarea,select,[contenteditable='true']")) {
    event.preventDefault();
    return;
  }
  controller.startDrag(fullName, event);
}

const isLoading = computed(() => {
  if (state.cards.length > 0) return false;
  const actionText = githubStatusState.actionText || "";
  return Boolean(actionText.includes("正在读取") || actionText.includes("正在加载") || actionText.includes("正在统计") || actionText.includes("正在同步"));
});
</script>

<template>
  <p v-if="remarkEditor.message" role="status">{{ remarkEditor.repo ? `${remarkEditor.repo}：` : "" }}{{ remarkEditor.message }}</p>
  <section v-if="draftOutsideCards" aria-label="未显示仓库的备注草稿">
    <p>备注草稿：{{ remarkEditor.repo }}（仓库不在当前列表中，草稿仍保留）</p>
    <GitHubRemarkEditor :active="props.active" />
  </section>
  <div v-if="state.searchMessage" class="gh-search-options" style="margin:0 0 10px">
    <span style="font-size:12px;color:var(--dim)">{{ state.searchMessage }}</span>
    <button type="button" class="gh-tab" style="padding:2px 8px;font-size:11px;margin-left:8px" @click="controller.resetSearch()">清空搜索</button>
  </div>

  <!-- 加载中指示器：居中转圈 -->
  <div v-if="isLoading" class="gh-repos-loading">
    <div class="gh-spinner" aria-hidden="true"></div>
    <span class="gh-loading-label">正在读取 GitHub 仓库列表中…</span>
  </div>

  <p v-else-if="state.emptyMessage" class="muted small" style="text-align: center; padding: 40px 0; font-size: 13px;">{{ state.emptyMessage }}</p>

  <div v-if="state.cards.length" class="repos gh-grid" :class="{ 'gh-batch-active': state.batchMode }">
    <article
      v-for="card in state.cards"
      :key="card.fullName"
      class="repo gh-card"
      :class="{ selected: card.selected }"
      :data-repo-name="card.fullName"
      draggable="true"
      @click="onCardClick($event, card)"
      @contextmenu="openCardContextMenu($event, card)"
      @dragstart="onDragStart($event, card.fullName)"
    >
      <button class="fo-card-more" type="button" aria-label="更多操作" title="更多操作" @click.stop="openCardContextMenu($event, card)">⋮</button>
      <div class="gh-card-head">
        <label class="gh-card-hole" title="点击勾选此仓库" @click.stop>
          <input class="gh-card-checkbox" type="checkbox" :checked="card.selected" @change="controller.setSelection(card.fullName, ($event.target as HTMLInputElement).checked)">
          <span class="gh-hole-inner"></span>
        </label>
        <img class="gh-owner-avatar" :src="card.avatarUrl || 'assets/github-star.svg'" alt="" loading="lazy" referrerpolicy="no-referrer" @error="($event.target as HTMLImageElement).src='assets/github-star.svg'">
        <a :href="card.url" target="_blank" rel="noreferrer" class="name" :title="card.fullName"><span class="owner">{{ card.owner }}/</span>{{ card.name }}</a>
      </div>
      <div class="gh-card-body">
        <div class="gh-card-badges">
          <!-- 文件夹分类标签（支持多 List 归属展示） -->
          <template v-if="card.folders && card.folders.length">
            <span
              v-for="folderName in card.folders"
              :key="folderName"
              class="gh-badge-folder"
              :title="`GitHub 列表：${folderName}（点击管理所属列表）`"
              @click.stop="openCategoryPickerDirectly(card, $event)"
            >
              📁 {{ folderName }}
            </span>
          </template>
          <span
            v-else
            class="gh-badge-folder uncat"
            title="未分类（点击加入 GitHub 列表）"
            @click.stop="openCategoryPickerDirectly(card, $event)"
          >
            ＋ 未分类
          </span>

          <!-- ✨ 紧随未分类/文件夹标签右侧的就地内联编辑框 -->
          <GitHubRemarkEditor v-if="remarkEditor.repo === card.fullName" :active="props.active" />

          <!-- ✨ 已有备注标签：仅在非编辑模式下呈现，点击直接就地编辑 -->
          <span
            v-else-if="card.customRemark"
            class="gh-badge-remark"
            :title="`备注：${card.customRemark}（点击就地修改）`"
            @click.stop="startInlineRemark(card)"
          >
            <span class="gh-badge-remark-icon">💬</span>
            <span class="gh-badge-remark-text">{{ card.customRemark }}</span>
          </span>
        </div>
        <p v-if="card.descriptionKind === 'analyzing'" class="desc gh-desc-analyzing" title="正在使用 AI 分析仓库…"><span class="gh-ai-sparkle">✨</span> 正在使用 AI 分析仓库并提炼中文介绍…</p>
        <p v-else-if="card.descriptionKind === 'ai'" class="desc gh-desc-ai" title="AI 中文简介（点击可直接修改，右键可重新分析）">
          <span class="gh-ai-tag-flag">🤖</span>{{ card.description }}
        </p>
        <p v-else-if="card.descriptionKind === 'plain'" class="desc" :title="card.description">{{ card.description }}</p>
        <p v-else class="desc dim">暂无描述</p>
      </div>
      <div class="meta">
        <span class="gh-stars">★ {{ card.stars }}</span>
        <span v-if="card.language" class="gh-lang">{{ card.language }}</span>
        <span v-if="card.updated" class="gh-updated">更新 {{ card.updated }}</span>
      </div>
    </article>
  </div>

  <div v-if="state.totalPages > 1" class="gh-pager">
    <button class="gh-page-btn" type="button" :disabled="state.page <= 1" @click="controller.changePage(state.page - 1)">‹ 上一页</button>
    <span class="gh-page-info">{{ state.page }} / {{ state.totalPages }} · 共 {{ state.totalItems }} 个{{ state.serverPaged ? ` · 已加载 ${state.loadedItems}` : '' }}</span>
    <button class="gh-page-btn" type="button" :disabled="state.page >= state.totalPages" @click="controller.changePage(state.page + 1)">下一页 ›</button>
  </div>

  <!-- 🌟 GitHub 仓库卡片右键上下文菜单与级联子菜单系统（类似浏览器书签展开，悬停即出） -->
  <Teleport to="body">
    <div
      v-if="props.active && contextMenuState.visible"
      class="fo-cover-context-menu gh-repo-context-menu"
      :style="{ left: `${contextMenuState.x}px`, top: `${contextMenuState.y}px` }"
      @click.stop
      @contextmenu.prevent
    >
      <!-- 1. 所属 GitHub 列表（悬停即展开子菜单） -->
      <div
        class="gh-menu-has-sub"
        :class="{ 'is-active': activeSubMenu === 'folder' }"
        @mouseenter="activeSubMenu = 'folder'"
      >
        <button class="fo-cover-menu-item with-sub-arrow" type="button">
          <span>📁 所属 GitHub 列表</span>
          <span class="sub-arrow">›</span>
        </button>
        <!-- 侧边级联飞出子菜单 -->
        <div class="gh-sub-flyout" :class="{ 'flyout-left': isFlyoutLeft }" @click.stop>
          <button
            class="fo-cover-menu-item"
            :class="{ primary: contextMenuState.folders.length === 0 }"
            type="button"
            @click="clearFolders"
          >
            {{ contextMenuState.folders.length === 0 ? "✓ " : "  " }}＋ 设为未分类（清空列表）
          </button>
          <button
            v-for="cat in gitHubService.cats"
            :key="cat"
            class="fo-cover-menu-item"
            :class="{ primary: contextMenuState.folders.includes(cat) }"
            type="button"
            @click="toggleFolder(cat)"
          >
            {{ contextMenuState.folders.includes(cat) ? "✓ " : "  " }}📁 {{ cat }}
          </button>
        </div>
      </div>

      <!-- 其他普通主菜单项，鼠标滑过自动收起子菜单 -->
      <button class="fo-cover-menu-item" type="button" @mouseenter="activeSubMenu = null" @click="startInlineRemark()">
        ✏️ 编辑备注…
      </button>
      <ChatShareMenu
        label="💬 发送到聊天室"
        :visible="contextMenuState.visible"
        @open="activeSubMenu = null"
        @select="shareToRoom"
      />
      <button v-if="contextMenuState.hasRemark" class="fo-cover-menu-item" type="button" @mouseenter="activeSubMenu = null" @click="clearRemark">
        🗑️ 清除备注
      </button>
      <button class="fo-cover-menu-item" type="button" @mouseenter="activeSubMenu = null" @click="copyUrl">
        📋 复制仓库链接
      </button>
      <button class="fo-cover-menu-item" type="button" @mouseenter="activeSubMenu = null" @click="openExternal">
        ↗ 在 GitHub 打开
      </button>
      <button class="fo-cover-menu-item danger" type="button" @mouseenter="activeSubMenu = null" @click="unstar">
        ⭐ 取消 Star
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.gh-repos-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 0;
  width: 100%;
}

.gh-spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid rgba(2, 132, 199, 0.15);
  border-top-color: #0284c7;
  animation: gh-spin 0.8s linear infinite;
}

@keyframes gh-spin {
  to { transform: rotate(360deg); }
}

.gh-loading-label {
  font-size: 13px;
  color: var(--muted, #64748b);
  font-weight: 500;
}
</style>
