<script setup lang="ts">
import { githubHeroController as controller, githubHeroState as state } from "./hero";
import { githubStatusState as status, githubStatusController } from "./store";
import { starBoardData } from "./stars-board-data";
import { gitHubService } from "../services/github.service";
import { appDialog } from "../core/app-dialog.store";
import { t } from "../i18n";
const emit = defineEmits<{
  "open-ai-settings": [];
  "open-guide": [];
}>();

async function handleAddSection() {
  let name: string | null;
  try {
    name = await appDialog.prompt({
      title: "新建分组标签",
      message: "创建一个新的顶层分组标签（类似常用网站的分区）：",
      placeholder: "分组名称（如：工作区、AI、工具）…"
    });
  } catch { return; }
  const trimmed = name?.trim();
  if (!trimmed) return;
  await gitHubService.createSection(trimmed);
}

async function handleSectionContextMenu(event: MouseEvent, sectionName: string) {
  event.preventDefault();
  event.stopPropagation();
  if (sectionName === "默认" && starBoardData.sections.length === 1) return;
  const confirmed = await appDialog.confirm({
    title: "删除分组标签",
    message: `确定删除分组标签「${sectionName}」吗？里面的文件夹会自动合并至默认分组，仓库不会丢失。`,
    danger: true
  });
  if (confirmed) {
    await gitHubService.deleteSection(sectionName);
  }
}
</script>

<template>
  <!-- 🌟 左侧信息区：封面与文字紧密靠拢 -->
  <div class="gh-hero-left">
    <div id="gh-hero-cover" class="gh-bili-cover">
      <span v-if="state.kind === 'all'">⭐</span>
      <span v-else-if="state.kind === 'uncategorized'">📄</span>
      <i v-else class="fo-folder-icon"></i>
    </div>
    <div class="gh-bili-heading">
      <div class="gh-hero-title-row">
        <h3 id="gh-hero-title" :title="state.title">{{ state.title }}</h3>

        <!-- 🌟 常用网站同款：大分组标签栏 (Tabs) -->
        <div class="gh-hero-sections-tabs" role="tablist" aria-label="收藏大分组标签">
          <button
            v-for="sec in starBoardData.sections"
            :key="sec"
            type="button"
            class="gh-section-tab"
            :class="{ active: sec === starBoardData.activeSection }"
            :title="`切换到分组「${sec}」；右键可删除此标签`"
            @click="gitHubService.switchSection(sec)"
            @contextmenu="handleSectionContextMenu($event, sec)"
          >
            {{ sec }}
          </button>
          <button
            type="button"
            class="gh-section-add-btn"
            title="添加新分组标签"
            aria-label="添加新分组标签"
            @click="handleAddSection"
          >
            ＋
          </button>
        </div>

        <div v-if="status.actionText" class="gh-hero-inline-status" :class="{ 'is-error': status.actionError }" :role="status.actionError ? 'alert' : 'status'" :aria-live="status.actionError ? 'assertive' : 'polite'" aria-atomic="true">
          <span class="gh-hero-status-text" :title="status.actionText">{{ status.actionText }}</span>
          <button type="button" :title="t('github.hero.closeTip')" :aria-label="t('github.hero.closeTip')" @click="githubStatusController.update({ actionText: '', actionError: false })">×</button>
        </div>
      </div>
      <p id="gh-hero-desc">{{ state.description }}</p>
    </div>
  </div>

  <!-- 🌟 中间插槽：放置搜索栏 -->
  <div class="gh-hero-search-area">
    <slot name="search" />
  </div>

  <div class="gh-bili-actions">
    <!-- 🌟 右侧操作栏前缀：放置消息、设置按钮 -->
    <slot name="actions-prefix" />
    <button
      type="button"
      class="gh-hero-btn gh-github-help-btn"
      title="GitHub 使用手册"
      aria-label="打开 GitHub 使用手册"
      @click="emit('open-guide')"
    >?</button>
    <button id="gh-batch-toggle-btn" type="button" class="gh-hero-btn gh-batch-toggle-btn" :class="{ active: state.batchMode }" :title="t('github.hero.batchToggle')" @click="controller.toggleBatch()">
      <span class="gh-batch-btn-icon">☑</span>
      <span class="gh-batch-btn-text">{{ state.batchMode ? t('github.hero.batchBack') : t('github.hero.batch') }}</span>
    </button>
    <button id="gh-refresh-btn" type="button" class="gh-hero-btn" :title="t('github.hero.refreshTitle')" @click="controller.refresh()">{{ t('github.hero.refresh') }}</button>
    <button id="gh-hero-add-folder-btn" type="button" class="gh-hero-btn primary" :title="t('github.hero.addFolderTitle')" @click="controller.createFolder()">{{ t('github.hero.addFolder') }}</button>
  </div>
</template>

<style scoped>
.gh-hero-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-width: 0;
}

/* The status shares the title's existing line, never a row above the repository grid. */
.gh-hero-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  height: 27px;
}
.gh-hero-title-row h3 {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 🌟 大分组标签栏样式：纯血常用网站质感胶囊 pill 风格 */
.gh-hero-sections-tabs {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
}
.gh-hero-sections-tabs::-webkit-scrollbar {
  display: none;
}

.gh-section-tab,
.gh-section-add-btn {
  height: 25px;
  flex: none;
  padding: 0 11px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 999px;
  background: var(--surface, rgba(0, 0, 0, 0.04));
  color: var(--text, #475569);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.gh-section-tab:hover,
.gh-section-add-btn:hover {
  border-color: rgba(2, 132, 199, 0.4);
  background: rgba(2, 132, 199, 0.08);
  color: #0284c7;
}

.gh-section-tab.active {
  border-color: #0284c7 !important;
  background: #0284c7 !important;
  color: #ffffff !important;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.35);
  font-weight: 700;
}

.gh-section-add-btn {
  padding: 0 8px;
  font-size: 13px;
  font-weight: 700;
}

.gh-hero-inline-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: 0 1 auto;
  min-width: 0;
  max-width: min(320px, 60%);
  height: 20px;
  padding: 0 6px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--muted);
  font-size: 10px;
  line-height: 1;
}
.gh-hero-inline-status.is-error {
  color: var(--danger, #ef4444);
  border-color: color-mix(in srgb, var(--danger, #ef4444) 35%, var(--border));
}
.gh-hero-status-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gh-hero-inline-status button {
  flex-shrink: 0;
  padding: 0 2px;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}
.gh-hero-inline-status button:hover { color: var(--heading); }
.gh-hero-inline-status button:focus-visible { outline: 2px solid var(--primary); outline-offset: 1px; }

.gh-github-help-btn {
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  color: var(--muted);
  border-radius: 8px;
}
.gh-github-help-btn:hover {
  color: var(--heading);
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
}
</style>
