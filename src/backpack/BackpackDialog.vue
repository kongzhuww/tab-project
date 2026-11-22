<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
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
import type { PromptCategory, PromptItem, SavedArticleItem } from "./types";
import {
  formatBackpackShortDate as formatDate,
  formatBackpackFullDate as formatFullDate,
  parseBackpackTagsInput,
  excerptArticleContent as articlePreviewExcerpt,
  readTextBackupFile,
  resolveCategoryName,
} from "./backpack-helpers";
const MessageMarkdown = defineAsyncComponent(() => import("../multica/MessageMarkdown.vue"));
const BackpackArticleReaderDrawer = defineAsyncComponent(() => import("./BackpackArticleReaderDrawer.vue"));

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
  const tags = parseBackpackTagsInput(formTagsInput.value);
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

function handleSubmitArticleEditor() {
  if (!artFormTitle.value.trim() && !artFormContent.value.trim()) return;
  const tags = parseBackpackTagsInput(artFormTagsInput.value);
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

function showImportStatus(res: { success: boolean; count?: number; error?: string }, unit: string) {
  importMessage.value = res.success ? `成功导入 ${res.count} ${unit}！` : (res.error || "导入失败");
  setTimeout(() => { importMessage.value = ""; }, 3500);
}

function handlePromptFileChange(event: Event) {
  readTextBackupFile(event, (text) => showImportStatus(backpackService.importBackup(text), "条提示词"));
}

function handleArticleFileChange(event: Event) {
  readTextBackupFile(event, (text) => showImportStatus(articleService.importBackup(text), "篇文章"));
}

function promptCategoryName(categoryId?: string): string {
  return resolveCategoryName(backpackState.categories, categoryId);
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
        <BackpackArticleReaderDrawer
          :visible="articleState.isReading && activeChannel === 'articles'"
          :embedded="embedded"
          :article="articleState.readingArticle"
          @close="articleService.closeReader()"
          @copy="handleCopyArticle"
        />
      </div>
    </div>
  </BackpackFrame>
</template>

<style scoped src="./backpack-dialog.css"></style>
