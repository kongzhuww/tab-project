<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { onImeEnter } from "../core/ime-keyboard";
import BackpackFrame from "./BackpackFrame.vue";
defineProps<{ embedded?: boolean }>();
import {
  backpackService,
  backpackState,
  filteredPrompts,
  allBackpackTags,
  extractVariables,
  fillVariables
} from "./backpack.service";
import {
  articleService,
  articleState,
  filteredArticles,
  allArticleTags
} from "./article.service";
import StickerBoard from "../stickers/StickerBoard.vue";
import MessageMarkdown from "../multica/MessageMarkdown.vue";
import type { PromptCategory, PromptItem, SavedArticleItem } from "./types";

interface BackpackChannel {
  id: string;
  title: string;
  subTitle: string;
  icon: string;
  badge: string;
  themeClass: string;
}

// 快捷频道定义：提示词、文章保存、表情包管理
const CHANNELS: readonly BackpackChannel[] = [
  {
    id: "prompts",
    title: "提示词",
    subTitle: "Prompt 宝库",
    icon: "💬",
    badge: "PROMPT",
    themeClass: "bp-channel-prompts"
  },
  {
    id: "articles",
    title: "文章保存",
    subTitle: "长文收藏",
    icon: "📑",
    badge: "ARTICLE",
    themeClass: "bp-channel-articles"
  },
  {
    id: "stickers",
    title: "表情包管理",
    subTitle: "本地表情图库",
    icon: "🐱",
    badge: "STICKER",
    themeClass: "bp-channel-stickers"
  }
];

const activeChannel = ref<string>("prompts");
const isChannelsCollapsed = ref<boolean>(false);

// 提示词分组新增与编辑
const showAddCategoryInput = ref(false);
const newCategoryName = ref("");
const editingCategoryId = ref<string | null>(null);
const editingCategoryName = ref("");

// 文章分组新增与编辑
const showAddArticleCatInput = ref(false);
const newArticleCatName = ref("");
const editingArticleCatId = ref<string | null>(null);
const editingArticleCatName = ref("");

const promptFileInputRef = ref<HTMLInputElement | null>(null);
const articleFileInputRef = ref<HTMLInputElement | null>(null);
const importMessage = ref("");

// 提示词编辑表单
const formTitle = ref("");
const formContent = ref("");
const formDescription = ref("");
const formCategory = ref("default");
const formTagsInput = ref("");
const formPinned = ref(false);

// 文章编辑表单
const artFormTitle = ref("");
const artFormContent = ref("");
const artFormUrl = ref("");
const artFormSourceName = ref("");
const artFormDescription = ref("");
const artFormCategory = ref("default");
const artFormTagsInput = ref("");
const artFormPinned = ref(false);

onMounted(() => {
  void backpackService.init();
  void articleService.init();
});

function toggleChannels() {
  isChannelsCollapsed.value = !isChannelsCollapsed.value;
}

function switchChannel(channelId: string) {
  activeChannel.value = channelId;
  backpackState.isEditing = false;
  backpackState.isVariableDialogOpen = false;
  articleState.isEditing = false;
  articleState.isReading = false;
}

function selectCategory(id: string) {
  backpackState.activeCategoryId = id;
}

function selectPromptTag(tag: string) {
  backpackState.selectedTag = backpackState.selectedTag === tag ? null : tag;
}

function selectArticleCategory(id: string) {
  articleState.activeCategoryId = id;
}

function selectArticleTag(tag: string) {
  articleState.selectedTag = articleState.selectedTag === tag ? null : tag;
}

// ==================== 提示词操作 ====================
function handleCopy(item: PromptItem) {
  void backpackService.copyPromptText(item);
}

function handleOpenVariables(item: PromptItem) {
  backpackState.isEditing = false;
  backpackService.openVariableDialog(item);
}

function handleCopyFilledVariables() {
  if (!backpackState.variableTargetPrompt) return;
  const filled = fillVariables(
    backpackState.variableTargetPrompt.content,
    backpackState.variableFormValues
  );
  void backpackService.copyPromptText(backpackState.variableTargetPrompt, filled);
  backpackService.closeVariableDialog();
}

const variableFilledPreview = computed(() => {
  if (!backpackState.variableTargetPrompt) return "";
  return fillVariables(
    backpackState.variableTargetPrompt.content,
    backpackState.variableFormValues
  );
});

const editorDetectedVars = computed(() => {
  return extractVariables(formContent.value);
});

function handleCreateNewPrompt() {
  backpackState.isVariableDialogOpen = false;
  formTitle.value = "";
  formContent.value = "";
  formDescription.value = "";
  formCategory.value = backpackState.activeCategoryId === "all" || backpackState.activeCategoryId === "starred"
    ? (userPromptCategories.value[0]?.id || "default")
    : backpackState.activeCategoryId;
  formTagsInput.value = "";
  formPinned.value = false;
  backpackService.openEditor();
}

function handleEditPrompt(item: PromptItem) {
  backpackState.isVariableDialogOpen = false;
  formTitle.value = item.title;
  formContent.value = item.content;
  formDescription.value = item.description || "";
  formCategory.value = item.category;
  formTagsInput.value = item.tags.join(", ");
  formPinned.value = Boolean(item.pinned);
  backpackService.openEditor(item);
}

function handleSubmitPromptEditor() {
  if (!formTitle.value.trim() && !formContent.value.trim()) return;
  const tags = formTagsInput.value.split(/[,，\s]+/).map(t => t.trim()).filter(Boolean);
  backpackService.saveEditorData({
    title: formTitle.value.trim() || "未命名提示词",
    content: formContent.value,
    description: formDescription.value.trim(),
    category: formCategory.value || "default",
    tags,
    pinned: formPinned.value
  });
}

function handleDeletePrompt(id: string) {
  if (typeof window !== "undefined" && !window.confirm("确定要删除这条提示词吗？")) return;
  backpackService.deletePrompt(id);
}

function handleTogglePromptPin(id: string) {
  backpackService.togglePin(id);
}

function handleAddCategory() {
  const name = newCategoryName.value.trim();
  if (!name) return;
  if (backpackService.addCategory(name)) {
    newCategoryName.value = "";
    showAddCategoryInput.value = false;
  }
}

function startRenameCategory(cat: PromptCategory) {
  editingCategoryId.value = cat.id;
  editingCategoryName.value = cat.name;
}

function submitRenameCategory(id: string) {
  if (editingCategoryName.value.trim()) {
    backpackService.renameCategory(id, editingCategoryName.value.trim());
  }
  editingCategoryId.value = null;
  editingCategoryName.value = "";
}

function handleDeleteCategory(cat: PromptCategory) {
  if (typeof window !== "undefined" && !window.confirm(`确定删除分组「${cat.name}」吗？组内提示词将归入默认分组。`)) return;
  backpackService.deleteCategory(cat.id);
}

const userPromptCategories = computed(() => {
  return backpackState.categories.filter(c => c.id !== "all" && c.id !== "starred");
});

// ==================== 文章保存操作 ====================
function handleCreateNewArticle() {
  articleState.isReading = false;
  artFormTitle.value = "";
  artFormContent.value = "";
  artFormUrl.value = "";
  artFormSourceName.value = "";
  artFormDescription.value = "";
  artFormCategory.value = articleState.activeCategoryId === "all" || articleState.activeCategoryId === "starred"
    ? (userArticleCategories.value[0]?.id || "default")
    : articleState.activeCategoryId;
  artFormTagsInput.value = "";
  artFormPinned.value = false;
  articleService.openEditor();
}

function handleEditArticle(item: SavedArticleItem) {
  articleState.isReading = false;
  artFormTitle.value = item.title;
  artFormContent.value = item.content;
  artFormUrl.value = item.url || "";
  artFormSourceName.value = item.sourceName || "";
  artFormDescription.value = item.description || "";
  artFormCategory.value = item.category;
  artFormTagsInput.value = item.tags.join(", ");
  artFormPinned.value = Boolean(item.pinned);
  articleService.openEditor(item);
}

function handleOpenArticleReader(item: SavedArticleItem) {
  articleService.openReader(item);
}

function articlePreviewExcerpt(content: string): string {
  const clean = String(content || "").trim();
  if (clean.length <= 600) return clean;
  return `${clean.slice(0, 600)}\n…`;
}

function handleSubmitArticleEditor() {
  if (!artFormTitle.value.trim() && !artFormContent.value.trim()) return;
  const tags = artFormTagsInput.value.split(/[,，\s]+/).map(t => t.trim()).filter(Boolean);
  articleService.saveEditorData({
    title: artFormTitle.value.trim() || "未命名文章",
    content: artFormContent.value,
    url: artFormUrl.value.trim(),
    sourceName: artFormSourceName.value.trim(),
    description: artFormDescription.value.trim(),
    category: artFormCategory.value || "default",
    tags,
    pinned: artFormPinned.value
  });
}

function handleDeleteArticle(id: string) {
  if (typeof window !== "undefined" && !window.confirm("确定要删除这篇保存的文章吗？")) return;
  articleService.deleteArticle(id);
}

function handleToggleArticlePin(id: string) {
  articleService.togglePin(id);
}

function handleCopyArticle(item: SavedArticleItem) {
  void articleService.copyArticleText(item);
}

function handleAddArticleCategory() {
  const name = newArticleCatName.value.trim();
  if (!name) return;
  if (articleService.addCategory(name)) {
    newArticleCatName.value = "";
    showAddArticleCatInput.value = false;
  }
}

function startRenameArticleCategory(cat: PromptCategory) {
  editingArticleCatId.value = cat.id;
  editingArticleCatName.value = cat.name;
}

function submitRenameArticleCategory(id: string) {
  if (editingArticleCatName.value.trim()) {
    articleService.renameCategory(id, editingArticleCatName.value.trim());
  }
  editingArticleCatId.value = null;
  editingArticleCatName.value = "";
}

function handleDeleteArticleCategory(cat: PromptCategory) {
  if (typeof window !== "undefined" && !window.confirm(`确定删除分组「${cat.name}」吗？组内文章将归入默认分组。`)) return;
  articleService.deleteCategory(cat.id);
}

const userArticleCategories = computed(() => {
  return articleState.categories.filter(c => c.id !== "all" && c.id !== "starred");
});

// ==================== 导入导出 ====================
function triggerPromptImport() { promptFileInputRef.value?.click(); }
function triggerArticleImport() { articleFileInputRef.value?.click(); }

function handlePromptFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result as string;
    if (text) {
      const res = backpackService.importBackup(text);
      importMessage.value = res.success ? `成功导入 ${res.count} 条提示词！` : (res.error || "导入失败");
      setTimeout(() => { importMessage.value = ""; }, 3500);
    }
    input.value = "";
  };
  reader.readAsText(file);
}

function handleArticleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result as string;
    if (text) {
      const res = articleService.importBackup(text);
      importMessage.value = res.success ? `成功导入 ${res.count} 篇文章！` : (res.error || "导入失败");
      setTimeout(() => { importMessage.value = ""; }, 3500);
    }
    input.value = "";
  };
  reader.readAsText(file);
}

function formatDate(ts: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function formatFullDate(ts?: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function promptCategoryName(categoryId?: string): string {
  return backpackState.categories.find(c => c.id === categoryId)?.name || "默认分组";
}

const articleSearchQuery = ref("");
const displayedArticles = computed(() => {
  const q = articleSearchQuery.value.trim().toLowerCase();
  if (!q) return filteredArticles.value;
  return filteredArticles.value.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.sourceName?.toLowerCase().includes(q) ||
    item.content.toLowerCase().includes(q) ||
    item.tags.some(t => t.toLowerCase().includes(q))
  );
});
</script>

<template>
  <BackpackFrame>
    <!-- 嵌入式顶部频道分段切换 -->
    <template v-if="embedded" #header-tabs>
      <nav class="bp-seg-tabs" role="tablist" aria-label="资料库频道">
        <button
          type="button"
          role="tab"
          :aria-selected="activeChannel === 'prompts'"
          class="bp-seg-tab"
          :class="{ active: activeChannel === 'prompts' }"
          @click="switchChannel('prompts')"
        >
          <span>提示词</span>
          <small>{{ backpackState.prompts.length }}</small>
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="activeChannel === 'articles'"
          class="bp-seg-tab"
          :class="{ active: activeChannel === 'articles' }"
          @click="switchChannel('articles')"
        >
          <span>文章</span>
          <small>{{ articleState.articles.length }}</small>
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="activeChannel === 'stickers'"
          class="bp-seg-tab"
          :class="{ active: activeChannel === 'stickers' }"
          @click="switchChannel('stickers')"
        >
          <span>表情包</span>
        </button>
      </nav>
    </template>

    <!-- 顶栏右侧操作区 -->
    <template #header-actions>
      <div class="bp-top-actions" :class="{ 'bp-integrated': embedded }">
        <!-- 提示词频道动作 -->
        <template v-if="activeChannel === 'prompts'">
          <label v-if="embedded" class="bp-search-pill">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input v-model="backpackState.searchQuery" type="search" placeholder="搜索提示词…" aria-label="搜索提示词" />
          </label>
          <button type="button" class="bp-btn bp-btn-ghost" title="导出备份" @click="backpackService.exportBackup()">
            <svg v-if="embedded" class="bp-svg-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3"/></svg>
            <span v-else class="bp-icon">💾</span>
            <span>导出</span>
          </button>
          <button type="button" class="bp-btn bp-btn-ghost" title="从文件导入" @click="triggerPromptImport">
            <svg v-if="embedded" class="bp-svg-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3"/></svg>
            <span v-else class="bp-icon">📥</span>
            <span>导入</span>
          </button>
          <button
            type="button"
            class="bp-btn bp-btn-primary"
            :class="{ active: backpackState.isEditing }"
            title="新建提示词"
            @click="handleCreateNewPrompt"
          >
            <svg v-if="embedded" class="bp-svg-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>
            <span v-else class="bp-icon">➕</span>
            <span>{{ embedded ? '新建' : '新建提示词' }}</span>
          </button>
          <input ref="promptFileInputRef" type="file" accept=".json" style="display: none" @change="handlePromptFileChange" />
        </template>

        <!-- 文章保存频道动作 -->
        <template v-else-if="activeChannel === 'articles'">
          <label v-if="embedded" class="bp-search-pill">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input v-model="articleSearchQuery" type="search" placeholder="搜索文章…" aria-label="搜索文章" />
          </label>
          <button type="button" class="bp-btn bp-btn-ghost" title="导出文章备份" @click="articleService.exportBackup()">
            <svg v-if="embedded" class="bp-svg-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2.5v7.5M5 7l3 3 3-3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3"/></svg>
            <span v-else class="bp-icon">💾</span>
            <span>导出</span>
          </button>
          <button type="button" class="bp-btn bp-btn-ghost" title="从文件导入文章" @click="triggerArticleImport">
            <svg v-if="embedded" class="bp-svg-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 10V2.5M5 5.5l3-3 3 3M3 11.5v1.3A1.2 1.2 0 0 0 4.2 14h7.6a1.2 1.2 0 0 0 1.2-1.2v-1.3"/></svg>
            <span v-else class="bp-icon">📥</span>
            <span>导入</span>
          </button>
          <button
            type="button"
            class="bp-btn bp-btn-primary bp-btn-article-pri"
            :class="{ active: articleState.isEditing }"
            title="保存新文章"
            @click="handleCreateNewArticle"
          >
            <svg v-if="embedded" class="bp-svg-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg>
            <span v-else class="bp-icon">➕</span>
            <span>{{ embedded ? '新建' : '新建文章' }}</span>
          </button>
          <input ref="articleFileInputRef" type="file" accept=".json" style="display: none" @change="handleArticleFileChange" />
        </template>
      </div>
    </template>

    <!-- 窗口主体内容 -->
    <div class="bp-container" :class="{ 'bp-integrated': embedded }">
      <div v-if="importMessage" class="bp-alert-tip-bar">
        {{ importMessage }}
      </div>
      <div v-if="backpackState.statusMessage" class="bp-alert-tip-bar" role="alert">{{ backpackState.statusMessage }}</div>
      <div v-if="articleState.statusMessage" class="bp-alert-tip-bar" role="alert">{{ articleState.statusMessage }}</div>

      <!-- 双栏/三栏主工作区 -->
      <div class="bp-work-area">
        <!-- 1. 左侧频道与分类侧边栏 -->
        <aside v-if="!embedded || activeChannel !== 'stickers'" class="bp-bili-sidebar">
          <template v-if="!embedded">
          <!-- 快捷频道折叠栏 -->
          <div
            class="bp-sidebar-toggle-bar"
            :class="{ 'is-collapsed': isChannelsCollapsed }"
            @click="toggleChannels"
          >
            <div class="bp-sidebar-toggle-title">
              <span class="bp-sidebar-toggle-icon">⚡</span>
              <strong>快捷频道</strong>
            </div>
            <div class="bp-sidebar-toggle-action">
              <span>{{ isChannelsCollapsed ? '展开' : '收起' }}</span>
              <span class="bp-sidebar-toggle-chevron">{{ isChannelsCollapsed ? '▾' : '▴' }}</span>
            </div>
          </div>

          <!-- 快捷频道卡片列表 -->
          <div v-show="!isChannelsCollapsed" class="bp-channels-list">
            <div
              v-for="ch in CHANNELS"
              :key="ch.id"
              class="bp-channel-wrap"
              :class="ch.themeClass"
            >
              <button
                type="button"
                class="bp-channel-btn"
                :class="{ on: activeChannel === ch.id }"
                @click="switchChannel(ch.id)"
              >
                <div class="bp-channel-main">
                  <span class="bp-channel-icon">{{ ch.icon }}</span>
                  <div class="bp-channel-text">
                    <strong>{{ ch.title }}</strong>
                    <small>{{ ch.subTitle }}</small>
                  </div>
                </div>
                <span class="bp-channel-badge">{{ ch.badge }}</span>
              </button>
            </div>
          </div>
          </template>

          <!-- A. 提示词分组专属区域 -->
          <template v-if="activeChannel === 'prompts'">
            <div class="bp-sidebar-favorite-hub">
              <div class="bp-hub-main">
                <span v-if="!embedded" class="bp-hub-icon">📁</span>
                <div class="bp-hub-text">
                  <strong>提示词分组</strong>
                  <small v-if="!embedded">按自定义分组整理</small>
                </div>
              </div>
              <button type="button" class="bp-hub-add-btn" title="新增分组" @click="showAddCategoryInput = true">+</button>
            </div>

            <div v-if="showAddCategoryInput" class="bp-add-category-box">
              <input
                v-model="newCategoryName"
                type="text"
                class="bp-add-cat-input"
                placeholder="分组名称..."
                maxlength="16"
                autofocus
                @keydown="onImeEnter($event, handleAddCategory)"
                @keydown.esc="showAddCategoryInput = false"
              />
              <button type="button" class="bp-btn-mini primary" @click="handleAddCategory">✔</button>
              <button type="button" class="bp-btn-mini" @click="showAddCategoryInput = false">✕</button>
            </div>

            <div class="bp-folder-list">
              <div
                v-for="cat in backpackState.categories"
                :key="cat.id"
                class="bp-folder-row"
                :class="{ active: backpackState.activeCategoryId === cat.id }"
              >
                <div v-if="editingCategoryId === cat.id" class="bp-folder-inline-edit">
                  <input
                    v-model="editingCategoryName"
                    type="text"
                    class="bp-folder-rename-input"
                    maxlength="16"
                    autofocus
                    @keydown="onImeEnter($event, () => submitRenameCategory(cat.id))"
                    @keydown.esc="editingCategoryId = null"
                  />
                  <button type="button" class="bp-btn-mini primary" @click="submitRenameCategory(cat.id)">✔</button>
                  <button type="button" class="bp-btn-mini" @click="editingCategoryId = null">✕</button>
                </div>
                <button v-else type="button" class="bp-folder-btn" @click="selectCategory(cat.id)">
                  <span v-if="!embedded" class="bp-folder-icon">{{ cat.icon || "📁" }}</span>
                  <span class="bp-folder-name" :title="cat.name">{{ cat.name }}</span>
                  <span class="bp-folder-badge" v-if="cat.id === 'all'">{{ backpackState.prompts.length }}</span>
                  <span class="bp-folder-badge" v-else-if="cat.id === 'starred'">{{ backpackState.prompts.filter(p => p.pinned).length }}</span>
                  <span class="bp-folder-badge" v-else>{{ backpackState.prompts.filter(p => p.category === cat.id).length }}</span>
                </button>
                <div v-if="!cat.isBuiltin && editingCategoryId !== cat.id" class="bp-folder-actions">
                  <button type="button" class="bp-tool-btn" title="重命名" @click.stop="startRenameCategory(cat)">
                    <svg v-if="embedded" class="bp-svg-icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z"/></svg>
                    <template v-else>✏️</template>
                  </button>
                  <button type="button" class="bp-tool-btn danger" title="删除" @click.stop="handleDeleteCategory(cat)">
                    <svg v-if="embedded" class="bp-svg-icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5"/></svg>
                    <template v-else>🗑️</template>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="!embedded && allBackpackTags.length > 0" class="bp-tags-container">
              <div class="bp-tags-title">常用标签</div>
              <div class="bp-tags-cloud">
                <span
                  v-for="tag in allBackpackTags"
                  :key="tag"
                  class="bp-tag-pill"
                  :class="{ active: backpackState.selectedTag === tag }"
                  @click="selectPromptTag(tag)"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </template>

          <!-- B. 文章保存分组专属区域 -->
          <template v-else-if="activeChannel === 'articles'">
            <div class="bp-sidebar-favorite-hub bp-hub-article">
              <div class="bp-hub-main">
                <span v-if="!embedded" class="bp-hub-icon">📚</span>
                <div class="bp-hub-text">
                  <strong>文章分组</strong>
                  <small v-if="!embedded">文章多级分类整理</small>
                </div>
              </div>
              <button type="button" class="bp-hub-add-btn bp-btn-indigo" title="新增文章分组" @click="showAddArticleCatInput = true">+</button>
            </div>

            <div v-if="showAddArticleCatInput" class="bp-add-category-box">
              <input
                v-model="newArticleCatName"
                type="text"
                class="bp-add-cat-input bp-border-indigo"
                placeholder="分组名称..."
                maxlength="16"
                autofocus
                @keydown="onImeEnter($event, handleAddArticleCategory)"
                @keydown.esc="showAddArticleCatInput = false"
              />
              <button type="button" class="bp-btn-mini primary bp-bg-indigo" @click="handleAddArticleCategory">✔</button>
              <button type="button" class="bp-btn-mini" @click="showAddArticleCatInput = false">✕</button>
            </div>

            <div class="bp-folder-list">
              <div
                v-for="cat in articleState.categories"
                :key="cat.id"
                class="bp-folder-row bp-row-indigo"
                :class="{ active: articleState.activeCategoryId === cat.id }"
              >
                <div v-if="editingArticleCatId === cat.id" class="bp-folder-inline-edit">
                  <input
                    v-model="editingArticleCatName"
                    type="text"
                    class="bp-folder-rename-input"
                    maxlength="16"
                    autofocus
                    @keydown="onImeEnter($event, () => submitRenameArticleCategory(cat.id))"
                    @keydown.esc="editingArticleCatId = null"
                  />
                  <button type="button" class="bp-btn-mini primary bp-bg-indigo" @click="submitRenameArticleCategory(cat.id)">✔</button>
                  <button type="button" class="bp-btn-mini" @click="editingArticleCatId = null">✕</button>
                </div>
                <button v-else type="button" class="bp-folder-btn" @click="selectArticleCategory(cat.id)">
                  <span v-if="!embedded" class="bp-folder-icon">{{ cat.icon || "📑" }}</span>
                  <span class="bp-folder-name" :title="cat.name">{{ cat.name }}</span>
                  <span class="bp-folder-badge" v-if="cat.id === 'all'">{{ articleState.articles.length }}</span>
                  <span class="bp-folder-badge" v-else-if="cat.id === 'starred'">{{ articleState.articles.filter(a => a.pinned).length }}</span>
                  <span class="bp-folder-badge" v-else>{{ articleState.articles.filter(a => a.category === cat.id).length }}</span>
                </button>
                <div v-if="!cat.isBuiltin && editingArticleCatId !== cat.id" class="bp-folder-actions">
                  <button type="button" class="bp-tool-btn" title="重命名" @click.stop="startRenameArticleCategory(cat)">
                    <svg v-if="embedded" class="bp-svg-icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z"/></svg>
                    <template v-else>✏️</template>
                  </button>
                  <button type="button" class="bp-tool-btn danger" title="删除" @click.stop="handleDeleteArticleCategory(cat)">
                    <svg v-if="embedded" class="bp-svg-icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5"/></svg>
                    <template v-else>🗑️</template>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="!embedded && allArticleTags.length > 0" class="bp-tags-container">
              <div class="bp-tags-title">文章标签</div>
              <div class="bp-tags-cloud">
                <span
                  v-for="tag in allArticleTags"
                  :key="tag"
                  class="bp-tag-pill bp-tag-indigo"
                  :class="{ active: articleState.selectedTag === tag }"
                  @click="selectArticleTag(tag)"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </template>
        </aside>

        <!-- 2. 中间主内容区：提示词频道 -->
        <main v-if="activeChannel === 'prompts'" class="bp-content-pane">
          <div class="bp-pane-header">
            <div class="bp-result-stats">
              <span>共 <strong>{{ filteredPrompts.length }}</strong> 条提示词</span>
              <span v-if="backpackState.selectedTag" class="bp-active-filter-badge">
                标签: #{{ backpackState.selectedTag }}
                <button type="button" class="bp-tag-close" @click="backpackState.selectedTag = null">✕</button>
              </span>
            </div>
          </div>

          <div v-if="filteredPrompts.length === 0" class="bp-empty-state">
            <div v-if="embedded" class="bp-empty-svg" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"/><path d="M8 9h8M8 13h5"/></svg>
            </div>
            <div v-else class="bp-empty-icon">🎒</div>
            <h3 class="bp-empty-title">{{ backpackState.searchQuery.trim() || backpackState.selectedTag ? '没有匹配的提示词' : '暂无提示词' }}</h3>
            <p v-if="backpackState.searchQuery.trim() || backpackState.selectedTag" class="bp-empty-desc">试试更换搜索词或清除标签筛选。</p>
            <p v-else class="bp-empty-desc">把常用的系统提示、模板指令和 <code>&#123;&#123;变量&#125;&#125;</code> 存在这里，随时一键调用。</p>
            <button type="button" class="bp-btn bp-btn-primary" @click="handleCreateNewPrompt">新建提示词</button>
          </div>

          <div v-else class="bp-card-grid">
            <article
              v-for="item in filteredPrompts"
              :key="item.id"
              class="bp-card"
              :class="{
                'bp-compact-card': embedded,
                'is-pinned': item.pinned,
                'is-selected': backpackState.editingPrompt?.id === item.id
              }"
              @click="embedded && handleEditPrompt(item)"
            >
              <template v-if="embedded">
                <div class="bp-compact-head">
                  <h4 class="bp-compact-title" :title="item.title">{{ item.title }}</h4>
                  <div class="bp-compact-actions" @click.stop>
                    <button
                      v-if="extractVariables(item.content).length > 0"
                      type="button"
                      class="bp-compact-icon-btn accent"
                      title="填充变量并使用"
                      @click.stop="handleOpenVariables(item)"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 1.8L3.8 9h4.1L7 14.2 12.2 7H8.1L9 1.8Z"/></svg>
                    </button>
                    <button
                      type="button"
                      class="bp-compact-icon-btn"
                      :class="{ success: backpackState.copySuccessId === item.id }"
                      :title="backpackState.copySuccessId === item.id ? '已复制' : '复制提示词'"
                      @click.stop="handleCopy(item)"
                    >
                      <svg v-if="backpackState.copySuccessId === item.id" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5"/></svg>
                      <svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="7.5" height="8.5" rx="1.4"/><path d="M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3"/></svg>
                    </button>
                    <button type="button" class="bp-compact-icon-btn" title="编辑提示词" @click.stop="handleEditPrompt(item)">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z"/></svg>
                    </button>
                    <button type="button" class="bp-compact-icon-btn danger" title="删除提示词" @click.stop="handleDeletePrompt(item.id)">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5"/></svg>
                    </button>
                  </div>
                </div>

                <p class="bp-compact-desc" :title="item.description || item.content">
                  {{ item.description || item.content || '暂无内容描述' }}
                </p>

                <div class="bp-compact-chips">
                  <button
                    type="button"
                    class="bp-compact-folder-chip"
                    :title="`查看分组「${promptCategoryName(item.category)}」`"
                    @click.stop="selectCategory(item.category || 'default')"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2 4.2A1.7 1.7 0 0 1 3.7 2.5h2.5l1.3 1.4h4.8A1.7 1.7 0 0 1 14 5.6v6.2a1.7 1.7 0 0 1-1.7 1.7H3.7A1.7 1.7 0 0 1 2 11.8V4.2Z"/></svg>
                    <span>{{ promptCategoryName(item.category) }}</span>
                  </button>
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="bp-compact-tag-chip"
                    @click.stop="selectPromptTag(tag)"
                  >#{{ tag }}</span>
                  <span
                    v-for="v in extractVariables(item.content)"
                    :key="v"
                    class="bp-compact-var-chip"
                    :title="`点击填充变量 ${v}`"
                    @click.stop="handleOpenVariables(item)"
                  >{&#123;{{ v }}&#125;}</span>
                </div>

                <div class="bp-compact-meta">
                  <div class="bp-compact-meta-left">
                    <span class="bp-compact-kind">
                      <i class="bp-compact-dot" :class="{ hasVars: extractVariables(item.content).length > 0 }"></i>
                      <span>{{ extractVariables(item.content).length > 0 ? `${extractVariables(item.content).length} 变量` : 'Prompt' }}</span>
                    </span>
                    <button
                      type="button"
                      class="bp-compact-star"
                      :class="{ active: item.pinned }"
                      :title="item.pinned ? '取消置顶' : '星标置顶'"
                      @click.stop="handleTogglePromptPin(item.id)"
                    >
                      <span>{{ item.pinned ? '★' : '☆' }}</span>
                      <span v-if="item.useCount">{{ item.useCount }}</span>
                    </button>
                  </div>
                  <div class="bp-compact-meta-right">
                    <span v-if="backpackState.copySuccessId === item.id" class="bp-copied-tip">已复制</span>
                    <span v-else class="bp-compact-date">{{ formatFullDate(item.updatedAt) }}</span>
                  </div>
                </div>
              </template>

              <template v-else>
              <div class="bp-card-header">
                <div class="bp-card-title-group">
                  <button
                    type="button"
                    class="bp-pin-btn"
                    :class="{ active: item.pinned }"
                    :title="item.pinned ? '取消置顶' : '星标置顶'"
                    @click.stop="handleTogglePromptPin(item.id)"
                  >
                    {{ item.pinned ? '★' : '☆' }}
                  </button>
                  <h4 class="bp-card-title" :title="item.title">{{ item.title }}</h4>
                </div>
                <div class="bp-card-actions">
                  <button type="button" class="bp-action-btn edit" title="编辑提示词" @click.stop="handleEditPrompt(item)">✏️</button>
                  <button type="button" class="bp-action-btn delete" title="删除提示词" @click.stop="handleDeletePrompt(item.id)">🗑️</button>
                </div>
              </div>

              <p v-if="item.description" class="bp-card-desc">{{ item.description }}</p>

              <div class="bp-card-preview" :title="item.content">
                <pre><code>{{ item.content }}</code></pre>
              </div>

              <div v-if="extractVariables(item.content).length > 0" class="bp-card-vars">
                <span class="bp-vars-hint">变量:</span>
                <span
                  v-for="v in extractVariables(item.content)"
                  :key="v"
                  class="bp-var-pill"
                  :title="`在无模态侧栏中填充: ${v}`"
                  @click.stop="handleOpenVariables(item)"
                >
                  {&#123;{{ v }}&#125;}
                </span>
              </div>

              <div class="bp-card-footer">
                <div class="bp-card-tags">
                  <span v-for="tag in item.tags" :key="tag" class="bp-tag-micro" @click.stop="selectPromptTag(tag)">#{{ tag }}</span>
                </div>
                <div class="bp-card-button-row">
                  <span v-if="backpackState.copySuccessId === item.id" class="bp-copied-tip">✓ 已复制!</span>
                  <button
                    v-if="extractVariables(item.content).length > 0"
                    type="button"
                    class="bp-btn-use"
                    title="填充变量并复制"
                    @click.stop="handleOpenVariables(item)"
                  >
                    ⚡ 填充使用
                  </button>
                  <button
                    type="button"
                    class="bp-btn-copy"
                    :class="{ success: backpackState.copySuccessId === item.id }"
                    title="直接复制提示词文本"
                    @click.stop="handleCopy(item)"
                  >
                    {{ backpackState.copySuccessId === item.id ? '已复制' : '复制' }}
                  </button>
                </div>
              </div>
              </template>
            </article>
          </div>
        </main>

        <!-- 3. 中间主内容区：文章保存频道（类似提示词仓库） -->
        <main v-else-if="activeChannel === 'articles'" class="bp-content-pane">
          <div class="bp-pane-header">
            <div class="bp-result-stats">
              <span>共 <strong>{{ displayedArticles.length }}</strong> 篇文章</span>
              <span v-if="articleState.selectedTag" class="bp-active-filter-badge bp-badge-indigo">
                标签: #{{ articleState.selectedTag }}
                <button type="button" class="bp-tag-close" @click="articleState.selectedTag = null">✕</button>
              </span>
            </div>
          </div>

          <div v-if="displayedArticles.length === 0" class="bp-empty-state">
            <div v-if="embedded" class="bp-empty-svg" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v18H7.5A2.5 2.5 0 0 0 5 22z"/><path d="M5 4.5V22"/></svg>
            </div>
            <div v-else class="bp-empty-icon">📑</div>
            <h3 class="bp-empty-title">{{ articleSearchQuery.trim() || articleState.selectedTag ? '没有匹配的文章' : '暂无保存文章' }}</h3>
            <p class="bp-empty-desc">{{ articleSearchQuery.trim() || articleState.selectedTag ? '试试更换搜索词或清除标签筛选。' : '把有价值的深度长文、技术资料或视频分析笔记存在这里，随时离线阅读。' }}</p>
            <button type="button" class="bp-btn bp-btn-primary bp-btn-indigo" @click="handleCreateNewArticle">保存文章</button>
          </div>

          <div v-else class="bp-card-grid">
            <article
              v-for="item in displayedArticles"
              :key="item.id"
              class="bp-card bp-card-article"
              :class="{
                'is-pinned': item.pinned,
                'is-selected': articleState.editingArticle?.id === item.id || articleState.readingArticle?.id === item.id
              }"
            >
              <div class="bp-card-header">
                <div class="bp-card-title-group">
                  <button
                    type="button"
                    class="bp-pin-btn"
                    :class="{ active: item.pinned }"
                    :title="item.pinned ? '取消置顶' : '星标置顶'"
                    @click.stop="handleToggleArticlePin(item.id)"
                  >
                    {{ item.pinned ? '★' : '☆' }}
                  </button>
                  <h4 class="bp-card-title" :title="item.title">{{ item.title }}</h4>
                </div>
                <div class="bp-card-actions">
                  <a
                    v-if="item.url"
                    :href="item.url"
                    target="_blank"
                    rel="noreferrer"
                    class="bp-action-btn"
                    title="在浏览器中打开原文"
                  >
                    ↗
                  </a>
                  <button type="button" class="bp-action-btn edit" title="编辑文章" @click.stop="handleEditArticle(item)">
                    <svg v-if="embedded" class="bp-svg-icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z"/></svg>
                    <template v-else>✏️</template>
                  </button>
                  <button type="button" class="bp-action-btn delete" title="删除文章" @click.stop="handleDeleteArticle(item.id)">
                    <svg v-if="embedded" class="bp-svg-icon-sm" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5"/></svg>
                    <template v-else>🗑️</template>
                  </button>
                </div>
              </div>

              <!-- 来源信息与更新时间 -->
              <div v-if="item.sourceName || item.updatedAt" class="bp-article-meta-line">
                <span v-if="item.sourceName" class="bp-article-source">{{ embedded ? item.sourceName : `📰 ${item.sourceName}` }}</span>
                <span class="bp-article-date">{{ embedded ? formatDate(item.updatedAt) : `🕒 ${formatDate(item.updatedAt)}` }}</span>
              </div>

              <p v-if="item.description" class="bp-card-desc">{{ item.description }}</p>

              <!-- 文章正文预览 -->
              <div class="bp-card-preview bp-article-preview">
                <MessageMarkdown class="bp-preview-md" :content="articlePreviewExcerpt(item.content)" />
              </div>

              <div class="bp-card-footer">
                <div class="bp-card-tags">
                  <span v-for="tag in item.tags" :key="tag" class="bp-tag-micro" @click.stop="selectArticleTag(tag)">#{{ tag }}</span>
                </div>
                <div class="bp-card-button-row">
                  <span v-if="articleState.copySuccessId === item.id" class="bp-copied-tip">✓ 已复制!</span>
                  <button type="button" class="bp-btn-read" title="阅读全文" @click.stop="handleOpenArticleReader(item)">
                    {{ embedded ? '阅读全文' : '📖 阅读全文' }}
                  </button>
                  <button
                    type="button"
                    class="bp-btn-copy"
                    :class="{ success: articleState.copySuccessId === item.id }"
                    title="复制文章全文"
                    @click.stop="handleCopyArticle(item)"
                  >
                    {{ articleState.copySuccessId === item.id ? '已复制' : '复制' }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </main>

        <!-- 4. 表情包管理专属主区 -->
        <main v-else-if="activeChannel === 'stickers'" class="bp-content-pane bp-stickers-wrapper">
          <StickerBoard dock-owned :active="activeChannel === 'stickers'" />
        </main>

        <!-- 5. 提示词无模态右侧抽屉（新建/编辑） -->
        <transition name="drawer-slide">
          <aside v-if="backpackState.isEditing && activeChannel === 'prompts'" class="bp-side-drawer">
            <header class="bp-drawer-header">
              <h3 class="bp-drawer-title">{{ backpackState.editingPrompt?.id ? (embedded ? '编辑提示词' : '✏️ 编辑提示词') : (embedded ? '新建提示词' : '➕ 新建提示词') }}</h3>
              <button type="button" class="bp-btn-icon" title="收起" @click="backpackService.closeEditor()">✕</button>
            </header>
            <div class="bp-drawer-body">
              <div class="bp-form-group">
                <label class="bp-form-label">提示词标题 *</label>
                <input v-model="formTitle" type="text" class="bp-form-input" placeholder="例如：自研架构评审准则" maxlength="64" />
              </div>
              <div class="bp-form-row">
                <div class="bp-form-group flex-1">
                  <label class="bp-form-label">所属分组</label>
                  <select v-model="formCategory" class="bp-form-select">
                    <option v-for="cat in userPromptCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>
                </div>
                <div class="bp-form-group bp-form-checkbox-group">
                  <label class="bp-checkbox-label">
                    <input v-model="formPinned" type="checkbox" />
                    <span>星标置顶</span>
                  </label>
                </div>
              </div>
              <div class="bp-form-group">
                <label class="bp-form-label">简介与用途（可选）</label>
                <input v-model="formDescription" type="text" class="bp-form-input" placeholder="简短描述该 Prompt 适合什么场景" maxlength="128" />
              </div>
              <div class="bp-form-group flex-fill">
                <div class="bp-label-row">
                  <label class="bp-form-label">正文内容 *</label>
                  <span class="bp-label-tip">支持 <code>{&#123;变量&#125;}</code> 动态占位符</span>
                </div>
                <textarea v-model="formContent" class="bp-form-input bp-textarea-main" placeholder="在此输入完整的提示词内容..." />
                <div v-if="editorDetectedVars.length > 0" class="bp-detected-vars">
                  <span>检测到变量：</span>
                  <span v-for="v in editorDetectedVars" :key="v" class="bp-var-pill mini">{&#123;{{ v }}&#125;}</span>
                </div>
              </div>
              <div class="bp-form-group">
                <label class="bp-form-label">标签（用逗号或空格隔开）</label>
                <input v-model="formTagsInput" type="text" class="bp-form-input" placeholder="例如：架构设计, 审查清单" />
              </div>
            </div>
            <footer class="bp-drawer-footer">
              <button type="button" class="bp-btn bp-btn-ghost" @click="backpackService.closeEditor()">取消</button>
              <button type="button" class="bp-btn bp-btn-primary" @click="handleSubmitPromptEditor">保存提示词</button>
            </footer>
          </aside>
        </transition>

        <!-- 6. 提示词无模态变量填空抽屉 -->
        <transition name="drawer-slide">
          <aside v-if="backpackState.isVariableDialogOpen && activeChannel === 'prompts'" class="bp-side-drawer">
            <header class="bp-drawer-header">
              <h3 class="bp-drawer-title">{{ embedded ? '填充变量' : '⚡ 快速填充变量' }}</h3>
              <button type="button" class="bp-btn-icon" title="关闭" @click="backpackService.closeVariableDialog()">✕</button>
            </header>
            <div class="bp-drawer-body">
              <p class="bp-drawer-desc">正在使用：<strong>{{ backpackState.variableTargetPrompt?.title }}</strong></p>
              <div class="bp-vars-form">
                <div v-for="(val, varName) in backpackState.variableFormValues" :key="varName" class="bp-form-group">
                  <label class="bp-form-label">{&#123;{{ varName }}&#125;}</label>
                  <textarea v-model="backpackState.variableFormValues[varName]" class="bp-form-input bp-textarea-small" :placeholder="`请输入 ${varName} 的具体内容...`" rows="2" />
                </div>
              </div>
              <div class="bp-preview-box">
                <div class="bp-preview-header">实时合并预览</div>
                <pre class="bp-preview-text"><code>{{ variableFilledPreview }}</code></pre>
              </div>
            </div>
            <footer class="bp-drawer-footer">
              <button type="button" class="bp-btn bp-btn-ghost" @click="backpackService.closeVariableDialog()">取消</button>
              <button type="button" class="bp-btn bp-btn-primary" @click="handleCopyFilledVariables">一键复制填充内容</button>
            </footer>
          </aside>
        </transition>

        <!-- 7. 文章保存无模态右侧抽屉（新建/编辑） -->
        <transition name="drawer-slide">
          <aside v-if="articleState.isEditing && activeChannel === 'articles'" class="bp-side-drawer bp-drawer-article">
            <header class="bp-drawer-header">
              <h3 class="bp-drawer-title">{{ articleState.editingArticle?.id ? (embedded ? '编辑文章' : '✏️ 编辑文章') : (embedded ? '保存新文章' : '➕ 保存新文章') }}</h3>
              <button type="button" class="bp-btn-icon" title="收起" @click="articleService.closeEditor()">✕</button>
            </header>
            <div class="bp-drawer-body">
              <div class="bp-form-group">
                <label class="bp-form-label">文章标题 *</label>
                <input v-model="artFormTitle" type="text" class="bp-form-input" placeholder="例如：a16z 提出 B2A 经济架构深度解析" maxlength="128" />
              </div>
              <div class="bp-form-row">
                <div class="bp-form-group flex-1">
                  <label class="bp-form-label">所属分组</label>
                  <select v-model="artFormCategory" class="bp-form-select">
                    <option v-for="cat in userArticleCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                  </select>
                </div>
                <div class="bp-form-group bp-form-checkbox-group">
                  <label class="bp-checkbox-label">
                    <input v-model="artFormPinned" type="checkbox" />
                    <span>星标置顶</span>
                  </label>
                </div>
              </div>
              <div class="bp-form-row">
                <div class="bp-form-group flex-1">
                  <label class="bp-form-label">原文网址（可选）</label>
                  <input v-model="artFormUrl" type="url" class="bp-form-input" placeholder="https://..." />
                </div>
                <div class="bp-form-group flex-1">
                  <label class="bp-form-label">来源 / 作者（可选）</label>
                  <input v-model="artFormSourceName" type="text" class="bp-form-input" placeholder="例如：a16z News" />
                </div>
              </div>
              <div class="bp-form-group">
                <label class="bp-form-label">核心摘要与推荐理由（可选）</label>
                <input v-model="artFormDescription" type="text" class="bp-form-input" placeholder="一句话提炼文章核心看点..." maxlength="256" />
              </div>
              <div class="bp-form-group flex-fill">
                <label class="bp-form-label">文章正文内容 *</label>
                <textarea v-model="artFormContent" class="bp-form-input bp-textarea-main" placeholder="在此粘贴或撰写完整的文章长文本或 Markdown 内容..." />
              </div>
              <div class="bp-form-group">
                <label class="bp-form-label">标签（用逗号或空格隔开）</label>
                <input v-model="artFormTagsInput" type="text" class="bp-form-input" placeholder="例如：AI, 产业观察, 商业模式" />
              </div>
            </div>
            <footer class="bp-drawer-footer">
              <button type="button" class="bp-btn bp-btn-ghost" @click="articleService.closeEditor()">取消</button>
              <button type="button" class="bp-btn bp-btn-primary bp-btn-indigo" @click="handleSubmitArticleEditor">保存文章</button>
            </footer>
          </aside>
        </transition>

        <!-- 8. 文章长文沉浸阅读抽屉 (Reader Drawer) -->
        <transition name="drawer-slide">
          <aside v-if="articleState.isReading && activeChannel === 'articles'" class="bp-side-drawer bp-reader-drawer">
            <header class="bp-drawer-header">
              <div class="bp-reader-head-info">
                <span class="bp-badge-pill">{{ embedded ? '阅读模式' : '📖 阅读器' }}</span>
                <span v-if="articleState.readingArticle?.sourceName" class="bp-reader-source">{{ articleState.readingArticle.sourceName }}</span>
              </div>
              <button type="button" class="bp-btn-icon" title="关闭阅读器" @click="articleService.closeReader()">✕</button>
            </header>
            <div class="bp-drawer-body bp-reader-body">
              <h2 class="bp-reader-title">{{ articleState.readingArticle?.title }}</h2>
              <div class="bp-reader-meta">
                <span v-if="articleState.readingArticle?.sourceName">{{ embedded ? articleState.readingArticle.sourceName : `📰 ${articleState.readingArticle.sourceName}` }}</span>
                <span v-if="articleState.readingArticle?.updatedAt">{{ embedded ? formatDate(articleState.readingArticle.updatedAt) : `🕒 ${formatDate(articleState.readingArticle.updatedAt)}` }}</span>
                <a v-if="articleState.readingArticle?.url" :href="articleState.readingArticle.url" target="_blank" rel="noreferrer" class="bp-reader-link">
                  原文链接 ↗
                </a>
              </div>
              <blockquote v-if="articleState.readingArticle?.description" class="bp-reader-quote">
                {{ embedded ? articleState.readingArticle.description : `💡 ${articleState.readingArticle.description}` }}
              </blockquote>
              <div class="bp-reader-text">
                <MessageMarkdown :content="articleState.readingArticle?.content || ''" />
              </div>
            </div>
            <footer class="bp-drawer-footer">
              <button type="button" class="bp-btn bp-btn-ghost" @click="articleService.closeReader()">关闭</button>
              <button type="button" class="bp-btn bp-btn-primary bp-btn-indigo" @click="articleState.readingArticle && handleCopyArticle(articleState.readingArticle)">
                一键复制全文
              </button>
            </footer>
          </aside>
        </transition>
      </div>
    </div>
  </BackpackFrame>
</template>

<style scoped>
/* 严格遵循系统主题，学习 B 站原生侧边栏样式 */
.lw-backpack-window {
  display: flex;
  flex-direction: column;
}

.bp-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: var(--background, #f8fafc);
  color: var(--text, #1e293b);
  position: relative;
}

.bp-alert-tip-bar {
  padding: 6px 16px;
  font-size: 12px;
  color: #00aeec;
  background: var(--surface, #eff6ff);
  border-bottom: 1px solid var(--border, #bfdbfe);
}

/* 顶栏操作按钮组 */
.bp-top-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bp-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  user-select: none;
}

.bp-btn-primary {
  background: #00aeec;
  color: #ffffff;
  border-color: #00aeec;
}

.bp-btn-primary:hover {
  filter: brightness(1.08);
}

.bp-btn-article-pri {
  background: #6366f1;
  border-color: #6366f1;
}

.bp-btn-ghost {
  background: var(--surface, #ffffff);
  color: var(--text, #334155);
  border-color: var(--border, #e2e8f0);
}

.bp-btn-ghost:hover {
  background: var(--surface-hover, #f1f5f9);
}

/* 主工作区布局 */
.bp-work-area {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* ================= 1. B站格式侧边栏 ================= */
.bp-bili-sidebar {
  width: 220px;
  min-width: 200px;
  background: var(--panel, #ffffff);
  border-right: 1px solid var(--border, #e2e8f0);
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.bp-sidebar-toggle-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  margin: 0 2px 4px;
  border-radius: 8px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, #e2e8f0);
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;
}

.bp-sidebar-toggle-bar:hover {
  background: var(--surface-active, rgba(59, 130, 246, 0.08));
  border-color: rgba(59, 130, 246, 0.3);
}

.bp-sidebar-toggle-bar.is-collapsed {
  margin-bottom: 8px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02));
  border-color: rgba(59, 130, 246, 0.25);
}

.bp-sidebar-toggle-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.bp-sidebar-toggle-icon {
  font-size: 13px;
  line-height: 1;
}

.bp-sidebar-toggle-action {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--muted, #64748b);
  font-size: 10.5px;
}

.bp-sidebar-toggle-chevron {
  font-size: 11px;
}

.bp-channels-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 4px;
}

.bp-channel-wrap {
  width: 100%;
}

.bp-channel-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border-radius: 9px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  box-sizing: border-box;
}

.bp-channel-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bp-channel-icon {
  font-size: 18px;
  line-height: 1;
}

.bp-channel-text strong {
  display: block;
  font-size: 13px;
  line-height: 1.25;
  color: var(--heading, #0f172a);
}

.bp-channel-text small {
  display: block;
  font-size: 10px;
  color: var(--muted, #64748b);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bp-channel-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  color: #fff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* 提示词频道风格 (青蓝) */
.bp-channel-prompts .bp-channel-btn {
  border-color: rgba(0, 174, 236, 0.28);
  background: linear-gradient(135deg, rgba(0, 174, 236, 0.12), rgba(0, 174, 236, 0.04));
}
.bp-channel-prompts .bp-channel-btn:hover {
  background: linear-gradient(135deg, rgba(0, 174, 236, 0.22), rgba(0, 174, 236, 0.08));
  border-color: #00aeec;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 174, 236, 0.15);
}
.bp-channel-prompts .bp-channel-badge { background: #00aeec; }
.bp-channel-prompts .bp-channel-btn.on {
  background: #00aeec !important;
  color: #fff !important;
  border-color: #00aeec !important;
  box-shadow: 0 4px 14px rgba(0, 174, 236, 0.35) !important;
}
.bp-channel-prompts .bp-channel-btn.on strong,
.bp-channel-prompts .bp-channel-btn.on small { color: #fff !important; }

/* 文章保存频道风格 (靛蓝/紫罗兰) */
.bp-channel-articles .bp-channel-btn {
  border-color: rgba(99, 102, 241, 0.32);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.13), rgba(99, 102, 241, 0.04));
}
.bp-channel-articles .bp-channel-btn:hover {
  border-color: #6366f1;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.22), rgba(99, 102, 241, 0.07));
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.16);
}
.bp-channel-articles .bp-channel-badge { background: #6366f1; }
.bp-channel-articles .bp-channel-btn.on {
  border-color: #6366f1 !important;
  background: #6366f1 !important;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35) !important;
}
.bp-channel-articles .bp-channel-btn.on strong,
.bp-channel-articles .bp-channel-btn.on small { color: #fff !important; }

/* 表情包频道风格 (暖橙黄) */
.bp-channel-stickers .bp-channel-btn {
  border-color: rgba(245, 158, 11, 0.32);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.13), rgba(245, 158, 11, 0.04));
}
.bp-channel-stickers .bp-channel-btn:hover {
  border-color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(245, 158, 11, 0.07));
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.16);
}
.bp-channel-stickers .bp-channel-badge { background: #f59e0b; }
.bp-channel-stickers .bp-channel-btn.on {
  border-color: #f59e0b !important;
  background: #f59e0b !important;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35) !important;
}
.bp-channel-stickers .bp-channel-btn.on strong,
.bp-channel-stickers .bp-channel-btn.on small { color: #fff !important; }

/* 分组 Hub 标题栏 */
.bp-sidebar-favorite-hub {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 6px 2px 6px;
  padding: 8px 8px 8px 10px;
  border: 1px solid rgba(245, 158, 11, 0.34);
  border-radius: 9px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.13), rgba(245, 158, 11, 0.04));
  box-sizing: border-box;
}

.bp-hub-article {
  border-color: rgba(99, 102, 241, 0.34);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.13), rgba(99, 102, 241, 0.04));
}

.bp-hub-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bp-hub-icon {
  font-size: 16px;
  line-height: 1;
}

.bp-hub-text strong {
  display: block;
  font-size: 12.5px;
  line-height: 1.25;
  color: var(--heading, #0f172a);
}

.bp-hub-text small {
  display: block;
  font-size: 10px;
  color: var(--muted, #64748b);
  margin-top: 1px;
}

.bp-hub-add-btn {
  display: grid;
  width: 24px;
  height: 24px;
  flex: none;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #f59e0b;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  box-shadow: 0 3px 8px rgba(245, 158, 11, 0.25);
  transition: transform 0.15s, background 0.15s;
}

.bp-hub-add-btn:hover { background: #d97706; transform: translateY(-1px); }
.bp-btn-indigo { background: #6366f1 !important; box-shadow: 0 3px 8px rgba(99, 102, 241, 0.25) !important; }
.bp-btn-indigo:hover { background: #4f46e5 !important; }
.bp-bg-indigo { background: #6366f1 !important; border-color: #6366f1 !important; }
.bp-border-indigo:focus { border-color: #6366f1 !important; }

.bp-add-category-box {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  margin-bottom: 4px;
}

.bp-add-cat-input {
  flex: 1;
  padding: 4px 6px;
  border: 1px solid #00aeec;
  border-radius: 4px;
  font-size: 12px;
  background: var(--surface, #ffffff);
  color: var(--text, #0f172a);
  outline: none;
}

.bp-folder-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.bp-folder-row {
  display: flex;
  align-items: center;
  border-radius: 7px;
  transition: all 0.12s ease;
  position: relative;
}

.bp-folder-row:hover { background: var(--surface, #f1f5f9); }
.bp-folder-row.active {
  background: #00aeec !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 174, 236, 0.28);
}
.bp-folder-row.active .bp-folder-name { color: #ffffff !important; font-weight: 600; }
.bp-folder-row.active .bp-folder-badge { background: rgba(255, 255, 255, 0.25); color: #ffffff; }

/* 文章分组的紫色激活态 */
.bp-row-indigo.active {
  background: #6366f1 !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.28);
}

.bp-folder-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  flex: 1;
  padding: 7px 9px;
  border: none;
  background: transparent;
  color: var(--text, #334155);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  overflow: hidden;
}

.bp-folder-icon { font-size: 14px; }
.bp-folder-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bp-folder-badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  background: var(--surface, #e2e8f0);
  color: var(--muted, #64748b);
}

.bp-folder-actions { display: none; align-items: center; gap: 2px; padding-right: 5px; }
.bp-folder-row:hover .bp-folder-actions { display: flex; }
.bp-tool-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  padding: 2px;
  border-radius: 3px;
  opacity: 0.7;
}
.bp-tool-btn:hover { opacity: 1; background: rgba(255, 255, 255, 0.3); }

.bp-folder-inline-edit { display: flex; align-items: center; gap: 3px; width: 100%; padding: 3px; }
.bp-folder-rename-input {
  flex: 1;
  padding: 3px 5px;
  font-size: 12px;
  border: 1px solid var(--primary, #3b82f6);
  border-radius: 4px;
  outline: none;
  background: var(--surface, #ffffff);
  color: var(--text, #0f172a);
}

.bp-btn-mini {
  padding: 2px 6px;
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 4px;
  background: var(--surface, #ffffff);
  cursor: pointer;
  font-size: 11px;
}
.bp-btn-mini.primary { background: #00aeec; color: #fff; border-color: #00aeec; }

.bp-tags-container { margin-top: 10px; padding: 0 4px; }
.bp-tags-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted, #64748b);
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}
.bp-tags-cloud { display: flex; flex-wrap: wrap; gap: 4px; }
.bp-tag-pill {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--surface, #f1f5f9);
  color: var(--muted, #64748b);
  border: 1px solid var(--border, #e2e8f0);
  cursor: pointer;
  transition: all 0.12s;
}
.bp-tag-pill:hover, .bp-tag-pill.active { background: #00aeec; color: #ffffff; border-color: #00aeec; }
.bp-tag-indigo:hover, .bp-tag-indigo.active { background: #6366f1; border-color: #6366f1; color: #ffffff; }

/* ================= 2. 中间卡片展示区 ================= */
.bp-content-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 14px 18px;
  background: var(--background, #f8fafc);
  min-width: 280px;
}

.bp-stickers-wrapper { padding: 0; overflow: hidden; height: 100%; }
:deep(.vue-sticker-board-wrapper) { height: 100%; display: flex; flex-direction: column; }
:deep(.card.wide.utility-workspace-stickers) { height: 100%; margin: 0; border: none; border-radius: 0; box-shadow: none; }

.bp-pane-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.bp-result-stats { font-size: 12px; color: var(--muted, #64748b); display: flex; align-items: center; gap: 8px; }
.bp-active-filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 174, 236, 0.12);
  color: #00aeec;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}
.bp-badge-indigo { background: rgba(99, 102, 241, 0.12); color: #6366f1; }
.bp-tag-close { background: none; border: none; color: inherit; font-size: 11px; cursor: pointer; padding: 0 2px; }

.bp-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 12px;
}

.bp-card {
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 9px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  position: relative;
}

.bp-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  border-color: var(--border-hover, #cbd5e1);
}

.bp-card.is-pinned { border-color: rgba(234, 179, 8, 0.45); }
.bp-card.is-selected { border-color: #00aeec; box-shadow: 0 0 0 1px #00aeec; }
.bp-card-article.is-selected { border-color: #6366f1; box-shadow: 0 0 0 1px #6366f1; }

.bp-card-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.bp-card-title-group { display: flex; align-items: center; gap: 6px; overflow: hidden; }
.bp-pin-btn { background: none; border: none; cursor: pointer; font-size: 14px; color: var(--muted, #94a3b8); padding: 0; line-height: 1; }
.bp-pin-btn.active { color: #eab308; }
.bp-card-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bp-card-actions { display: flex; align-items: center; gap: 3px; opacity: 0.6; transition: opacity 0.15s; }
.bp-card:hover .bp-card-actions { opacity: 1; }
.bp-action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
}
.bp-action-btn:hover { background: var(--surface, #f1f5f9); }

.bp-article-meta-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--muted, #64748b);
}

.bp-card-desc {
  margin: 0;
  font-size: 12px;
  color: var(--muted, #64748b);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bp-card-preview {
  background: var(--surface, #f8fafc);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  padding: 7px 9px;
  max-height: 80px;
  overflow: hidden;
  position: relative;
}

.bp-article-preview {
  max-height: 95px;
}

.bp-card-preview pre {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  line-height: 1.4;
  color: var(--text, #334155);
  white-space: pre-wrap;
  word-break: break-word;
}

.bp-card-preview::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, var(--surface, #f8fafc));
}

.bp-card-vars { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; font-size: 11px; }
.bp-vars-hint { color: var(--muted, #64748b); font-size: 11px; }
.bp-var-pill {
  background: rgba(0, 174, 236, 0.1);
  color: #00aeec;
  border: 1px solid rgba(0, 174, 236, 0.25);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 11px;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.12s;
}
.bp-var-pill:hover { background: #00aeec; color: #ffffff; }
.bp-var-pill.mini { font-size: 10px; padding: 0 4px; }

.bp-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 6px;
  border-top: 1px solid var(--border, #f1f5f9);
}

.bp-card-tags { display: flex; flex-wrap: wrap; gap: 3px; flex: 1; overflow: hidden; }
.bp-tag-micro {
  font-size: 10px;
  color: var(--muted, #64748b);
  background: var(--surface, #f1f5f9);
  padding: 1px 4px;
  border-radius: 3px;
  cursor: pointer;
}
.bp-tag-micro:hover { color: #00aeec; }
.bp-card-button-row { display: flex; align-items: center; gap: 5px; }
.bp-copied-tip { font-size: 11px; color: #10b981; font-weight: 600; }

.bp-btn-use {
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  background: rgba(0, 174, 236, 0.12);
  color: #00aeec;
  border: 1px solid rgba(0, 174, 236, 0.25);
}
.bp-btn-use:hover { background: #00aeec; color: #ffffff; }

.bp-btn-read {
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  background: rgba(99, 102, 241, 0.12);
  color: #6366f1;
  border: 1px solid rgba(99, 102, 241, 0.25);
}
.bp-btn-read:hover { background: #6366f1; color: #ffffff; }

.bp-btn-copy {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  background: var(--surface, #f1f5f9);
  color: var(--text, #334155);
  border: 1px solid var(--border, #cbd5e1);
}
.bp-btn-copy:hover { background: var(--primary, #3b82f6); color: #ffffff; }
.bp-btn-copy.success { background: #10b981; color: #ffffff; border-color: #10b981; }

.bp-empty-state {
  margin: auto;
  text-align: center;
  padding: 36px 20px;
  max-width: 340px;
}
.bp-empty-icon { font-size: 42px; margin-bottom: 10px; }
.bp-empty-title { font-size: 15px; font-weight: 600; margin: 0 0 6px 0; color: var(--heading, #0f172a); }
.bp-empty-desc { font-size: 13px; color: var(--muted, #64748b); line-height: 1.5; margin: 0 0 14px 0; }

/* ================= 3. 浮层右侧边面板（不挤压左侧列表） ================= */
.bp-side-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(400px, calc(100% - 24px));
  max-width: 460px;
  background: var(--panel, #ffffff);
  border-left: 1px solid var(--border, #e2e8f0);
  display: flex;
  flex-direction: column;
  box-shadow: -14px 0 36px rgba(15, 23, 42, 0.14);
  z-index: 30;
  overflow: hidden;
}

.bp-reader-drawer {
  width: min(580px, calc(100% - 24px));
  max-width: 660px;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
  opacity: 0.8;
}

.bp-drawer-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bp-drawer-title { margin: 0; font-size: 14px; font-weight: 600; color: var(--heading, #0f172a); }
.bp-btn-icon {
  background: none;
  border: none;
  font-size: 13px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.bp-btn-icon:hover { background: var(--surface, #f1f5f9); color: var(--heading, #0f172a); }

.bp-drawer-body {
  padding: 14px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.bp-drawer-desc { font-size: 12px; color: var(--muted, #64748b); margin: 0; }
.bp-drawer-footer {
  padding: 10px 16px;
  border-top: 1px solid var(--border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  background: var(--surface, #f8fafc);
}

/* 阅读器模式细节 */
.bp-reader-head-info { display: flex; align-items: center; gap: 8px; }
.bp-badge-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}
.bp-reader-source { font-size: 11px; color: var(--muted, #64748b); }
.bp-reader-title { margin: 0; font-size: 16px; font-weight: 700; color: var(--heading, #0f172a); line-height: 1.4; }
.bp-reader-meta { display: flex; align-items: center; gap: 10px; font-size: 11px; color: var(--muted, #64748b); }
.bp-reader-link { color: #6366f1; text-decoration: none; }
.bp-reader-link:hover { text-decoration: underline; }
.bp-reader-quote {
  margin: 0;
  padding: 8px 12px;
  border-left: 3px solid #6366f1;
  background: rgba(99, 102, 241, 0.05);
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text, #334155);
}
.bp-reader-text {
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text, #334155);
  word-break: break-word;
  user-select: text;
}
.bp-reader-text :deep(.message-markdown) {
  font-size: 13.5px;
  line-height: 1.75;
}
.bp-reader-text :deep(.message-markdown h1) { font-size: 17px; font-weight: 700; margin: 14px 0 8px; padding-bottom: 5px; border-bottom: 1px solid var(--border, #e2e8f0); }
.bp-reader-text :deep(.message-markdown h2) { font-size: 15.5px; font-weight: 700; margin: 16px 0 8px; color: var(--heading, #0f172a); }
.bp-reader-text :deep(.message-markdown h3) { font-size: 14px; font-weight: 650; margin: 13px 0 6px; color: var(--heading, #0f172a); }
.bp-reader-text :deep(.message-markdown ul ul),
.bp-reader-text :deep(.message-markdown ol ul) { margin: 4px 0; }
.bp-reader-text :deep(.message-markdown th) { background: rgba(148, 163, 184, 0.1); font-weight: 600; font-size: 12.5px; }
.bp-reader-text :deep(.message-markdown td) { font-size: 12.5px; }
.bp-reader-text :deep(.message-markdown math) {
  font-family: "Latin Modern Math", "Cambria Math", "STIX Two Math", "Noto Sans Math", serif;
  font-size: 1.05em;
}
.bp-reader-text :deep(.message-markdown .obs-math-block) {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  margin: 12px 0;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--surface, rgba(148, 163, 184, 0.08));
  border: 1px solid var(--border, #e2e8f0);
}
.bp-preview-md {
  font-size: 11.5px !important;
  line-height: 1.48 !important;
  color: var(--text, #334155);
}
.bp-preview-md :deep(h1),
.bp-preview-md :deep(h2),
.bp-preview-md :deep(h3),
.bp-preview-md :deep(h4) {
  font-size: 11.5px;
  margin: 0 0 3px;
}
.bp-preview-md :deep(p),
.bp-preview-md :deep(ul),
.bp-preview-md :deep(ol) {
  margin: 0 0 3px;
}

/* 表单组件 */
.bp-form-row { display: flex; gap: 10px; }
.flex-1 { flex: 1; }
.flex-fill { flex: 1; display: flex; flex-direction: column; }
.bp-form-group { display: flex; flex-direction: column; gap: 4px; }
.bp-form-label { font-size: 12px; font-weight: 500; color: var(--heading, #334155); }
.bp-label-row { display: flex; align-items: center; justify-content: space-between; }
.bp-label-tip { font-size: 11px; color: var(--muted, #64748b); }
.bp-label-tip code { background: var(--surface, #f1f5f9); padding: 1px 3px; border-radius: 3px; font-size: 10px; }

.bp-form-input, .bp-form-select {
  border: 1px solid var(--border, #cbd5e1);
  border-radius: 6px;
  padding: 6px 9px;
  font-size: 12px;
  background: var(--surface, #ffffff);
  color: var(--text, #0f172a);
  outline: none;
  transition: border-color 0.12s;
}
.bp-form-input:focus, .bp-form-select:focus { border-color: #00aeec; }
.bp-drawer-article .bp-form-input:focus, .bp-drawer-article .bp-form-select:focus { border-color: #6366f1; }

.bp-textarea-main {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 1.45;
  min-height: 150px;
  resize: vertical;
}

.bp-textarea-small { resize: vertical; min-height: 48px; font-size: 12px; }
.bp-detected-vars { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; font-size: 11px; color: var(--muted, #64748b); margin-top: 4px; }
.bp-form-checkbox-group { justify-content: flex-end; padding-bottom: 6px; }
.bp-checkbox-label { display: flex; align-items: center; gap: 5px; font-size: 12px; cursor: pointer; color: var(--heading, #334155); }

.bp-preview-box { background: var(--surface, #f1f5f9); border: 1px solid var(--border, #e2e8f0); border-radius: 6px; padding: 8px 10px; }
.bp-preview-header { font-size: 11px; font-weight: 600; color: var(--muted, #64748b); margin-bottom: 5px; text-transform: uppercase; }
.bp-preview-text {
  margin: 0;
  font-family: monospace;
  font-size: 11px;
  color: var(--text, #1e293b);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 130px;
  overflow-y: auto;
}
/* AI 工作区资料库：靛蓝/晴蓝高亮与通透白底层次，不改变旧背包窗口或数据。 */
.bp-seg-tabs {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid var(--border, #e2e8f0);
  background: color-mix(in srgb, var(--surface, #f2f4f8) 88%, transparent);
}
.bp-seg-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}
.bp-seg-tab small {
  font-size: 10.5px;
  font-weight: 650;
  padding: 0 5px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text, #1e293b) 7%, transparent);
  color: var(--muted, #64748b);
  font-variant-numeric: tabular-nums;
}
.bp-seg-tab:hover { color: var(--text, #1e293b); }
.bp-seg-tab.active {
  background: var(--panel, #ffffff);
  color: #4f46e5;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(79, 70, 229, 0.12), 0 1px 2px rgba(15, 23, 42, 0.05);
}
.bp-seg-tab.active small {
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
}

.bp-search-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 31px;
  padding: 0 11px;
  border-radius: 999px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--muted, #64748b);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.bp-search-pill:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.14);
}
.bp-search-pill svg { width: 13px; height: 13px; flex: none; color: #6366f1; opacity: 0.78; }
.bp-search-pill input {
  width: 152px;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text, #1e293b);
  font-size: 12px;
}
.bp-search-pill input::placeholder { color: var(--muted, #94a3b8); }
.bp-svg-icon { width: 13.5px; height: 13.5px; flex: none; }
.bp-svg-icon-sm { width: 12.5px; height: 12.5px; flex: none; display: block; }
.bp-empty-svg {
  width: 52px;
  height: 52px;
  margin: 0 auto 14px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(59, 130, 246, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.22);
  color: #5b5bd6;
}
.bp-empty-svg svg { width: 23px; height: 23px; }

.bp-top-actions.bp-integrated .bp-btn {
  height: 31px;
  padding: 0 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 550;
}
.bp-top-actions.bp-integrated .bp-btn-ghost {
  background: var(--panel, #ffffff);
  border-color: var(--border, #dce2ec);
  color: var(--text, #334155);
}
.bp-top-actions.bp-integrated .bp-btn-ghost:hover {
  border-color: rgba(99, 102, 241, 0.35);
  color: #4f46e5;
  background: color-mix(in srgb, #6366f1 5%, var(--panel, #ffffff));
}
.bp-top-actions.bp-integrated .bp-btn-primary,
.bp-top-actions.bp-integrated .bp-btn-article-pri {
  background: linear-gradient(135deg, #6366f1, #4f6ef7);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.28);
}
.bp-top-actions.bp-integrated .bp-btn-primary:hover,
.bp-top-actions.bp-integrated .bp-btn-article-pri:hover {
  filter: brightness(1.06);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.36);
}

.bp-container.bp-integrated {
  background: transparent;
}
.bp-container.bp-integrated .bp-bili-sidebar {
  width: 196px;
  min-width: 184px;
  padding: 14px 10px;
  background: color-mix(in srgb, var(--surface, #f5f7fb) 48%, transparent);
  border-right: 1px solid var(--border, #e5e8ef);
  gap: 6px;
}
.bp-container.bp-integrated .bp-sidebar-favorite-hub,
.bp-container.bp-integrated .bp-hub-article {
  margin: 0 4px 4px;
  padding: 2px 4px 6px;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}
.bp-container.bp-integrated .bp-hub-text strong {
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.04em;
  color: var(--muted, #64748b);
}
.bp-container.bp-integrated .bp-hub-add-btn,
.bp-container.bp-integrated .bp-hub-add-btn.bp-btn-indigo {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: rgba(99, 102, 241, 0.1) !important;
  color: #5b5bd6;
  font-size: 15px;
  box-shadow: none !important;
}
.bp-container.bp-integrated .bp-hub-add-btn:hover,
.bp-container.bp-integrated .bp-hub-add-btn.bp-btn-indigo:hover {
  background: #6366f1 !important;
  color: #ffffff;
  transform: none;
}
.bp-container.bp-integrated .bp-folder-list { gap: 2px; }
.bp-container.bp-integrated .bp-folder-row {
  border-radius: 8px;
  padding: 0 2px;
}
.bp-container.bp-integrated .bp-folder-btn {
  padding: 7px 9px;
  font-size: 12.5px;
}
.bp-container.bp-integrated .bp-folder-badge {
  background: transparent;
  color: var(--muted, #94a3b8);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.bp-container.bp-integrated .bp-folder-row:hover {
  background: color-mix(in srgb, #6366f1 6%, transparent);
}
.bp-container.bp-integrated .bp-folder-row.active,
.bp-container.bp-integrated .bp-row-indigo.active {
  background: rgba(99, 102, 241, 0.11) !important;
  color: #4f46e5 !important;
  box-shadow: none;
}
.bp-container.bp-integrated .bp-folder-row.active .bp-folder-name {
  color: #4f46e5 !important;
  font-weight: 600;
}
.bp-container.bp-integrated .bp-folder-row.active .bp-folder-badge {
  background: rgba(99, 102, 241, 0.14);
  color: #4f46e5;
}
.bp-container.bp-integrated .bp-btn-mini.primary,
.bp-container.bp-integrated .bp-btn-mini.primary.bp-bg-indigo {
  background: #6366f1 !important;
  border-color: #6366f1 !important;
  color: #ffffff;
}
.bp-container.bp-integrated .bp-add-cat-input {
  border-radius: 7px;
  background: var(--panel, #ffffff);
  border-color: var(--border, #dce2ec);
}
.bp-container.bp-integrated .bp-add-cat-input:focus,
.bp-container.bp-integrated .bp-add-cat-input.bp-border-indigo:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.16);
}

.bp-container.bp-integrated .bp-content-pane {
  padding: 18px 24px 28px;
  background: transparent;
}
.bp-container.bp-integrated .bp-pane-header {
  margin-bottom: 14px;
}
.bp-container.bp-integrated .bp-result-stats {
  font-size: 12px;
  color: var(--muted, #64748b);
}
.bp-container.bp-integrated .bp-result-stats strong {
  color: #4f46e5;
}
.bp-container.bp-integrated .bp-card-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 265px));
  gap: 12px;
  align-items: stretch;
}
.bp-container.bp-integrated .bp-compact-card {
  border-radius: 12px;
  padding: 13px 14px 12px;
  gap: 8px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e4e8f0);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  cursor: pointer;
}
.bp-container.bp-integrated .bp-compact-card:hover {
  transform: translateY(-2px);
  border-color: rgba(14, 165, 233, 0.36);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}
.bp-compact-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}
.bp-compact-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 650;
  color: var(--heading, #0f172a);
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bp-compact-actions {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex: none;
  opacity: 0;
  transition: opacity 0.14s ease;
}
.bp-compact-card:hover .bp-compact-actions,
.bp-compact-card.is-selected .bp-compact-actions,
.bp-compact-actions:focus-within {
  opacity: 1;
}
.bp-compact-icon-btn {
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--muted, #64748b);
  display: grid;
  place-items: center;
  padding: 0;
  cursor: pointer;
}
.bp-compact-icon-btn svg { width: 12.5px; height: 12.5px; }
.bp-compact-icon-btn:hover { background: var(--surface, #f1f5f9); color: var(--heading, #0f172a); }
.bp-compact-icon-btn.accent:hover { background: rgba(99, 102, 241, 0.12); color: #4f46e5; }
.bp-compact-icon-btn.success { color: #16a34a; opacity: 1; }
.bp-compact-icon-btn.danger:hover { background: rgba(239, 68, 68, 0.1); color: #dc2626; }
.bp-compact-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.48;
  color: var(--muted, #52627a);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 35px;
}
.bp-compact-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}
.bp-compact-folder-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border: 0;
  border-radius: 6px;
  background: rgba(14, 165, 233, 0.12);
  color: #0284c7;
  font-size: 11px;
  font-weight: 550;
  cursor: pointer;
}
.bp-compact-folder-chip svg { width: 11px; height: 11px; flex: none; opacity: 0.85; }
.bp-compact-folder-chip:hover { background: rgba(14, 165, 233, 0.2); }
.bp-compact-tag-chip {
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--surface, #f3f5f8);
  color: var(--muted, #52627a);
  font-size: 11px;
  cursor: pointer;
}
.bp-compact-tag-chip:hover { background: rgba(99, 102, 241, 0.1); color: #4f46e5; }
.bp-compact-var-chip {
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(99, 102, 241, 0.09);
  color: #5b5bd6;
  font: 10.5px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
  cursor: pointer;
}
.bp-compact-var-chip:hover { background: #6366f1; color: #ffffff; }
.bp-compact-meta {
  margin-top: auto;
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 11.5px;
  color: var(--muted, #64748b);
}
.bp-compact-meta-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.bp-compact-kind {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.bp-compact-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0ea5e9;
  display: inline-block;
}
.bp-compact-dot.hasVars { background: #6366f1; }
.bp-compact-star {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border: 0;
  padding: 0 2px;
  background: transparent;
  color: var(--muted, #94a3b8);
  font-size: 12px;
  cursor: pointer;
}
.bp-compact-star.active,
.bp-compact-star:hover { color: #f59e0b; }
.bp-compact-date {
  font-size: 11px;
  color: var(--muted, #94a3b8);
  font-variant-numeric: tabular-nums;
}
.bp-container.bp-integrated .bp-card {
  border-radius: 12px;
  padding: 15px 16px;
  gap: 9px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e4e8f0);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
}
.bp-container.bp-integrated .bp-card:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 102, 241, 0.32);
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.08);
}
.bp-container.bp-integrated .bp-card.is-pinned {
  border-color: rgba(245, 158, 11, 0.42);
}
.bp-container.bp-integrated .bp-card.is-selected,
.bp-container.bp-integrated .bp-card-article.is-selected {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.16);
}
.bp-container.bp-integrated .bp-card-title {
  font-size: 13.5px;
  font-weight: 600;
}
.bp-container.bp-integrated .bp-card-desc {
  font-size: 12px;
  line-height: 1.5;
}
.bp-container.bp-integrated .bp-card-preview {
  border-radius: 9px;
  padding: 9px 11px;
  background: color-mix(in srgb, #6366f1 3.5%, var(--surface, #f6f8fc));
  border: 1px solid color-mix(in srgb, #6366f1 10%, var(--border, #e2e8f0));
}
.bp-container.bp-integrated .bp-card-preview::after {
  background: linear-gradient(to bottom, transparent, color-mix(in srgb, #6366f1 3.5%, var(--surface, #f6f8fc)));
}
.bp-container.bp-integrated .bp-card-footer {
  padding-top: 9px;
  border-top: 1px solid color-mix(in srgb, var(--border, #e2e8f0) 65%, transparent);
}
.bp-container.bp-integrated .bp-tag-micro {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  background: rgba(99, 102, 241, 0.08);
  color: #5b5bd6;
}
.bp-container.bp-integrated .bp-tag-micro:hover {
  background: rgba(99, 102, 241, 0.16);
  color: #4f46e5;
}
.bp-container.bp-integrated .bp-active-filter-badge {
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: #4f46e5;
  border-radius: 999px;
  padding: 2px 9px;
  font-size: 11px;
}
.bp-container.bp-integrated .bp-var-pill {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.22);
  color: #5b5bd6;
  border-radius: 6px;
  padding: 1px 6px;
  font-size: 11px;
}
.bp-container.bp-integrated .bp-var-pill:hover {
  background: #6366f1;
  color: #ffffff;
}
.bp-container.bp-integrated .bp-btn-use,
.bp-container.bp-integrated .bp-btn-read {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.24);
  color: #4f46e5;
  border-radius: 999px;
  padding: 3px 11px;
  font-size: 11px;
}
.bp-container.bp-integrated .bp-btn-use:hover,
.bp-container.bp-integrated .bp-btn-read:hover {
  background: #6366f1;
  border-color: #6366f1;
  color: #ffffff;
}
.bp-container.bp-integrated .bp-btn-copy {
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #dce2ec);
  color: var(--text, #334155);
  border-radius: 999px;
  padding: 3px 11px;
  font-size: 11px;
}
.bp-container.bp-integrated .bp-btn-copy:hover:not(.success) {
  border-color: rgba(99, 102, 241, 0.4);
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.06);
}
.bp-container.bp-integrated .bp-empty-state .bp-btn-primary,
.bp-container.bp-integrated .bp-empty-state .bp-btn-indigo {
  height: 34px;
  padding: 0 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #6366f1, #4f6ef7) !important;
  border-color: transparent !important;
  color: #ffffff;
  box-shadow: 0 3px 12px rgba(99, 102, 241, 0.28) !important;
}

.bp-container.bp-integrated .bp-side-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(410px, calc(100% - 24px));
  max-width: 480px;
  z-index: 30;
  background: color-mix(in srgb, var(--panel, #ffffff) 96%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid var(--border, #e5e8ef);
  box-shadow: -16px 0 40px rgba(15, 23, 42, 0.16);
}
.bp-container.bp-integrated .bp-reader-drawer {
  width: min(560px, calc(100% - 24px));
  max-width: 640px;
}
.bp-container.bp-integrated .bp-drawer-header {
  padding: 15px 18px;
  background: color-mix(in srgb, #6366f1 3%, var(--panel, #ffffff));
}
.bp-container.bp-integrated .bp-drawer-body { padding: 16px 18px; gap: 14px; }
.bp-container.bp-integrated .bp-drawer-footer {
  padding: 12px 18px;
  background: color-mix(in srgb, var(--surface, #f7f8fb) 65%, transparent);
}
.bp-container.bp-integrated .bp-drawer-footer .bp-btn {
  height: 32px;
  padding: 0 15px;
  border-radius: 999px;
}
.bp-container.bp-integrated .bp-drawer-footer .bp-btn-ghost {
  background: var(--panel, #ffffff);
  border-color: var(--border, #dce2ec);
}
.bp-container.bp-integrated .bp-drawer-footer .bp-btn-primary,
.bp-container.bp-integrated .bp-drawer-footer .bp-btn-indigo {
  background: linear-gradient(135deg, #6366f1, #4f6ef7) !important;
  border-color: transparent !important;
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.26);
}
.bp-container.bp-integrated .bp-form-input,
.bp-container.bp-integrated .bp-form-select {
  border-radius: 9px;
  padding: 8px 11px;
  background: var(--panel, #ffffff);
  border-color: var(--border, #dce2ec);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
}
.bp-container.bp-integrated .bp-form-input:focus,
.bp-container.bp-integrated .bp-form-select:focus {
  border-color: #6366f1 !important;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.14);
}
.bp-container.bp-integrated .bp-checkbox-label input[type="checkbox"] {
  accent-color: #6366f1;
}
.bp-container.bp-integrated .bp-label-tip code {
  background: rgba(99, 102, 241, 0.1);
  color: #5b5bd6;
  padding: 1px 5px;
  border-radius: 4px;
}
.bp-container.bp-integrated .bp-badge-pill {
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
}
.bp-container.bp-integrated .bp-reader-quote {
  border-left-color: #6366f1;
  background: rgba(99, 102, 241, 0.06);
  border-radius: 8px;
  padding: 10px 14px;
}
.bp-container.bp-integrated .bp-reader-link { color: #4f6ef7; }

.bp-container.bp-integrated :deep(.sidebar-folder-card.active) { background: rgba(99, 102, 241, 0.11) !important; border-color: rgba(99, 102, 241, 0.24) !important; box-shadow: none !important; }
.bp-container.bp-integrated :deep(.sidebar-folder-card.active .subfolder-card-name),
.bp-container.bp-integrated :deep(.sidebar-folder-card.active .subfolder-card-arrow),
.bp-container.bp-integrated :deep(#sticker-library-count) { color: #4f46e5 !important; }
.bp-container.bp-integrated :deep(.sticker-pack-form button),
.bp-container.bp-integrated :deep(.sticker-quick-import-btn:hover) { background: rgba(99, 102, 241, 0.1); border-color: rgba(99, 102, 241, 0.28); color: #4f46e5; }
.bp-container.bp-integrated button:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
@media (max-width: 780px) {
  .bp-container.bp-integrated .bp-bili-sidebar { width: 156px; min-width: 140px; }
  .bp-container.bp-integrated .bp-content-pane { padding: 14px; }
  .bp-search-pill input { width: 105px; }
}
</style>
