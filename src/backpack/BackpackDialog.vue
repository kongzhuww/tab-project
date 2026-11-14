<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AppWindowFrame from "../core/AppWindowFrame.vue";
import { windowManagerController } from "../core/window-manager.store";
import { backpackModuleState } from "./module-state";
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

function handleClose() {
  void windowManagerController.close("backpack");
}

function handleMinimize() {
  windowManagerController.minimize("backpack");
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
</script>

<template>
  <AppWindowFrame
    id="backpack-workspace-dialog"
    window-id="backpack"
    title="背包工作台"
    icon="🎒"
    :visible="backpackModuleState.visible"
    :default-width="980"
    :default-height="660"
    :min-width="740"
    :min-height="500"
    custom-class="lw-backpack-window"
    @close="handleClose"
    @minimize="handleMinimize"
  >
    <!-- 顶栏右侧操作区 -->
    <template #header-actions>
      <div class="bp-top-actions">
        <!-- 提示词频道动作 -->
        <template v-if="activeChannel === 'prompts'">
          <button
            type="button"
            class="bp-btn bp-btn-primary"
            :class="{ active: backpackState.isEditing }"
            title="新建提示词"
            @click="handleCreateNewPrompt"
          >
            <span class="bp-icon">➕</span>
            <span>新建提示词</span>
          </button>
          <button type="button" class="bp-btn bp-btn-ghost" title="导出备份" @click="backpackService.exportBackup()">
            <span class="bp-icon">💾</span>
            <span>导出</span>
          </button>
          <button type="button" class="bp-btn bp-btn-ghost" title="从文件导入" @click="triggerPromptImport">
            <span class="bp-icon">📥</span>
            <span>导入</span>
          </button>
          <input ref="promptFileInputRef" type="file" accept=".json" style="display: none" @change="handlePromptFileChange" />
        </template>

        <!-- 文章保存频道动作 -->
        <template v-else-if="activeChannel === 'articles'">
          <button
            type="button"
            class="bp-btn bp-btn-primary bp-btn-article-pri"
            :class="{ active: articleState.isEditing }"
            title="保存新文章"
            @click="handleCreateNewArticle"
          >
            <span class="bp-icon">➕</span>
            <span>新建文章</span>
          </button>
          <button type="button" class="bp-btn bp-btn-ghost" title="导出文章备份" @click="articleService.exportBackup()">
            <span class="bp-icon">💾</span>
            <span>导出</span>
          </button>
          <button type="button" class="bp-btn bp-btn-ghost" title="从文件导入文章" @click="triggerArticleImport">
            <span class="bp-icon">📥</span>
            <span>导入</span>
          </button>
          <input ref="articleFileInputRef" type="file" accept=".json" style="display: none" @change="handleArticleFileChange" />
        </template>
      </div>
    </template>

    <!-- 窗口主体内容 -->
    <div class="bp-container">
      <div v-if="importMessage" class="bp-alert-tip-bar">
        {{ importMessage }}
      </div>
      <div v-if="backpackState.statusMessage" class="bp-alert-tip-bar" role="alert">{{ backpackState.statusMessage }}</div>
      <div v-if="articleState.statusMessage" class="bp-alert-tip-bar" role="alert">{{ articleState.statusMessage }}</div>

      <!-- 双栏/三栏主工作区 -->
      <div class="bp-work-area">
        <!-- 1. 左侧频道与分类侧边栏（B 站格式 UI） -->
        <aside class="bp-bili-sidebar">
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

          <!-- A. 提示词分组专属区域 -->
          <template v-if="activeChannel === 'prompts'">
            <div class="bp-sidebar-favorite-hub">
              <div class="bp-hub-main">
                <span class="bp-hub-icon">📁</span>
                <div class="bp-hub-text">
                  <strong>提示词分组</strong>
                  <small>按自定义分组整理</small>
                </div>
              </div>
              <button type="button" class="bp-hub-add-btn" title="新增分组" @click="showAddCategoryInput = true">＋</button>
            </div>

            <div v-if="showAddCategoryInput" class="bp-add-category-box">
              <input
                v-model="newCategoryName"
                type="text"
                class="bp-add-cat-input"
                placeholder="分组名称..."
                maxlength="16"
                autofocus
                @keydown.enter="handleAddCategory"
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
                    @keydown.enter="submitRenameCategory(cat.id)"
                    @keydown.esc="editingCategoryId = null"
                  />
                  <button type="button" class="bp-btn-mini primary" @click="submitRenameCategory(cat.id)">✔</button>
                  <button type="button" class="bp-btn-mini" @click="editingCategoryId = null">✕</button>
                </div>
                <button v-else type="button" class="bp-folder-btn" @click="selectCategory(cat.id)">
                  <span class="bp-folder-icon">{{ cat.icon || "📁" }}</span>
                  <span class="bp-folder-name" :title="cat.name">{{ cat.name }}</span>
                  <span class="bp-folder-badge" v-if="cat.id === 'all'">{{ backpackState.prompts.length }}</span>
                  <span class="bp-folder-badge" v-else-if="cat.id === 'starred'">{{ backpackState.prompts.filter(p => p.pinned).length }}</span>
                  <span class="bp-folder-badge" v-else>{{ backpackState.prompts.filter(p => p.category === cat.id).length }}</span>
                </button>
                <div v-if="!cat.isBuiltin && editingCategoryId !== cat.id" class="bp-folder-actions">
                  <button type="button" class="bp-tool-btn" title="重命名" @click.stop="startRenameCategory(cat)">✏️</button>
                  <button type="button" class="bp-tool-btn danger" title="删除" @click.stop="handleDeleteCategory(cat)">🗑️</button>
                </div>
              </div>
            </div>

            <div v-if="allBackpackTags.length > 0" class="bp-tags-container">
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
                <span class="bp-hub-icon">📚</span>
                <div class="bp-hub-text">
                  <strong>文章分组</strong>
                  <small>文章多级分类整理</small>
                </div>
              </div>
              <button type="button" class="bp-hub-add-btn bp-btn-indigo" title="新增文章分组" @click="showAddArticleCatInput = true">＋</button>
            </div>

            <div v-if="showAddArticleCatInput" class="bp-add-category-box">
              <input
                v-model="newArticleCatName"
                type="text"
                class="bp-add-cat-input bp-border-indigo"
                placeholder="分组名称..."
                maxlength="16"
                autofocus
                @keydown.enter="handleAddArticleCategory"
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
                    @keydown.enter="submitRenameArticleCategory(cat.id)"
                    @keydown.esc="editingArticleCatId = null"
                  />
                  <button type="button" class="bp-btn-mini primary bp-bg-indigo" @click="submitRenameArticleCategory(cat.id)">✔</button>
                  <button type="button" class="bp-btn-mini" @click="editingArticleCatId = null">✕</button>
                </div>
                <button v-else type="button" class="bp-folder-btn" @click="selectArticleCategory(cat.id)">
                  <span class="bp-folder-icon">{{ cat.icon || "📑" }}</span>
                  <span class="bp-folder-name" :title="cat.name">{{ cat.name }}</span>
                  <span class="bp-folder-badge" v-if="cat.id === 'all'">{{ articleState.articles.length }}</span>
                  <span class="bp-folder-badge" v-else-if="cat.id === 'starred'">{{ articleState.articles.filter(a => a.pinned).length }}</span>
                  <span class="bp-folder-badge" v-else>{{ articleState.articles.filter(a => a.category === cat.id).length }}</span>
                </button>
                <div v-if="!cat.isBuiltin && editingArticleCatId !== cat.id" class="bp-folder-actions">
                  <button type="button" class="bp-tool-btn" title="重命名" @click.stop="startRenameArticleCategory(cat)">✏️</button>
                  <button type="button" class="bp-tool-btn danger" title="删除" @click.stop="handleDeleteArticleCategory(cat)">🗑️</button>
                </div>
              </div>
            </div>

            <div v-if="allArticleTags.length > 0" class="bp-tags-container">
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
            <div class="bp-empty-icon">🎒</div>
            <h3 class="bp-empty-title">提示词背包空空如也</h3>
            <p class="bp-empty-desc">创建你的第一个提示词，永久收纳属于你的 Prompt 宝库！</p>
            <button type="button" class="bp-btn bp-btn-primary" @click="handleCreateNewPrompt">立即新建提示词</button>
          </div>

          <div v-else class="bp-card-grid">
            <article
              v-for="item in filteredPrompts"
              :key="item.id"
              class="bp-card"
              :class="{
                'is-pinned': item.pinned,
                'is-selected': backpackState.editingPrompt?.id === item.id
              }"
            >
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
            </article>
          </div>
        </main>

        <!-- 3. 中间主内容区：文章保存频道（类似提示词仓库） -->
        <main v-else-if="activeChannel === 'articles'" class="bp-content-pane">
          <div class="bp-pane-header">
            <div class="bp-result-stats">
              <span>共 <strong>{{ filteredArticles.length }}</strong> 篇保存文章</span>
              <span v-if="articleState.selectedTag" class="bp-active-filter-badge bp-badge-indigo">
                标签: #{{ articleState.selectedTag }}
                <button type="button" class="bp-tag-close" @click="articleState.selectedTag = null">✕</button>
              </span>
            </div>
          </div>

          <div v-if="filteredArticles.length === 0" class="bp-empty-state">
            <div class="bp-empty-icon">📑</div>
            <h3 class="bp-empty-title">文章收藏库空空如也</h3>
            <p class="bp-empty-desc">在此保存精选长文、技术博客与深度报道，随时随地离线畅读！</p>
            <button type="button" class="bp-btn bp-btn-primary bp-btn-indigo" @click="handleCreateNewArticle">立即保存第一篇文章</button>
          </div>

          <div v-else class="bp-card-grid">
            <article
              v-for="item in filteredArticles"
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
                  <button type="button" class="bp-action-btn edit" title="编辑文章" @click.stop="handleEditArticle(item)">✏️</button>
                  <button type="button" class="bp-action-btn delete" title="删除文章" @click.stop="handleDeleteArticle(item.id)">🗑️</button>
                </div>
              </div>

              <!-- 来源信息与更新时间 -->
              <div v-if="item.sourceName || item.updatedAt" class="bp-article-meta-line">
                <span v-if="item.sourceName" class="bp-article-source">📰 {{ item.sourceName }}</span>
                <span class="bp-article-date">🕒 {{ formatDate(item.updatedAt) }}</span>
              </div>

              <p v-if="item.description" class="bp-card-desc">{{ item.description }}</p>

              <!-- 文章正文预览 -->
              <div class="bp-card-preview bp-article-preview" :title="item.content">
                <pre><code>{{ item.content }}</code></pre>
              </div>

              <div class="bp-card-footer">
                <div class="bp-card-tags">
                  <span v-for="tag in item.tags" :key="tag" class="bp-tag-micro" @click.stop="selectArticleTag(tag)">#{{ tag }}</span>
                </div>
                <div class="bp-card-button-row">
                  <span v-if="articleState.copySuccessId === item.id" class="bp-copied-tip">✓ 已复制!</span>
                  <button type="button" class="bp-btn-read" title="阅读全文" @click.stop="handleOpenArticleReader(item)">
                    📖 阅读全文
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
              <h3 class="bp-drawer-title">{{ backpackState.editingPrompt?.id ? '✏️ 编辑提示词' : '➕ 新建提示词' }}</h3>
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
              <h3 class="bp-drawer-title">⚡ 快速填充变量</h3>
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
              <h3 class="bp-drawer-title">{{ articleState.editingArticle?.id ? '✏️ 编辑文章' : '➕ 保存新文章' }}</h3>
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
                <span class="bp-badge-pill">📖 阅读器</span>
                <span v-if="articleState.readingArticle?.sourceName" class="bp-reader-source">{{ articleState.readingArticle.sourceName }}</span>
              </div>
              <button type="button" class="bp-btn-icon" title="关闭阅读器" @click="articleService.closeReader()">✕</button>
            </header>
            <div class="bp-drawer-body bp-reader-body">
              <h2 class="bp-reader-title">{{ articleState.readingArticle?.title }}</h2>
              <div class="bp-reader-meta">
                <span v-if="articleState.readingArticle?.sourceName">📰 {{ articleState.readingArticle.sourceName }}</span>
                <span v-if="articleState.readingArticle?.updatedAt">🕒 {{ formatDate(articleState.readingArticle.updatedAt) }}</span>
                <a v-if="articleState.readingArticle?.url" :href="articleState.readingArticle.url" target="_blank" rel="noreferrer" class="bp-reader-link">
                  原文链接 ↗
                </a>
              </div>
              <blockquote v-if="articleState.readingArticle?.description" class="bp-reader-quote">
                💡 {{ articleState.readingArticle.description }}
              </blockquote>
              <div class="bp-reader-text">
                <pre><code>{{ articleState.readingArticle?.content }}</code></pre>
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
  </AppWindowFrame>
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
  background: var(--bg, #f8fafc);
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
  background: var(--bg, #f8fafc);
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

/* ================= 3. 无模态右侧边面板 ================= */
.bp-side-drawer {
  width: 380px;
  min-width: 330px;
  max-width: 460px;
  background: var(--panel, #ffffff);
  border-left: 1px solid var(--border, #e2e8f0);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.05);
  z-index: 10;
  overflow: hidden;
}

.bp-reader-drawer {
  width: 480px;
  max-width: 560px;
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
  font-size: 13px;
  line-height: 1.8;
  color: var(--text, #334155);
  white-space: pre-wrap;
  word-break: break-word;
}
.bp-reader-text pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
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
</style>
