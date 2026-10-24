<script setup lang="ts">
import { githubHeroController as controller, githubHeroState as state } from "./hero";
import { githubStatusState as status, githubStatusController } from "./store";
const emit = defineEmits<{ "open-ai-settings": [] }>();
</script>

<template>
  <div id="gh-hero-cover" class="gh-bili-cover">
    <span v-if="state.kind === 'all'">⭐</span>
    <span v-else-if="state.kind === 'used'">⚡</span>
    <span v-else-if="state.kind === 'uncategorized'">📄</span>
    <i v-else class="fo-folder-icon"></i>
  </div>
  <div class="gh-bili-heading">
    <div class="gh-hero-title-row">
      <h3 id="gh-hero-title" :title="state.title">{{ state.title }}</h3>
      <div v-if="status.actionText && !status.actionError" class="gh-hero-inline-status" role="status" aria-live="polite" aria-atomic="true">
        <span class="gh-hero-status-text" :title="status.actionText">{{ status.actionText }}</span>
        <button type="button" title="关闭提示" aria-label="关闭同步状态提示" @click="githubStatusController.update({ actionText: '', actionError: false })">×</button>
      </div>
    </div>
    <p id="gh-hero-desc">{{ state.description }}</p>
  </div>
  <div class="gh-bili-actions">
    <button id="gh-ai-analyze-all-btn" type="button" class="gh-hero-btn" title="仅分析当前筛选下已加载且没有摘要的仓库，不代表全部远端收藏" @click="controller.analyzeAll()">✨ AI 分析已加载项</button>
    <button id="gh-ai-settings-btn" type="button" class="gh-hero-btn" title="配置 AI 服务（DeepSeek、Gemini、OpenAI等）" @click="emit('open-ai-settings')">🤖 AI 设置</button>
    <button id="gh-batch-toggle-btn" type="button" class="gh-hero-btn gh-batch-toggle-btn" :class="{ active: state.batchMode }" title="批量多选操作" @click="controller.toggleBatch()">
      <span class="gh-batch-btn-icon">☑</span>
      <span class="gh-batch-btn-text">{{ state.batchMode ? '返回' : '批量操作' }}</span>
    </button>
    <button id="gh-refresh-btn" type="button" class="gh-hero-btn" title="只读核对未确认的 Star 状态并刷新列表，不重发远端操作" @click="controller.refresh()">↻ 刷新 / 核对</button>
    <button id="gh-hero-add-folder-btn" type="button" class="gh-hero-btn primary" @click="controller.createFolder()">＋ 新建文件夹</button>
  </div>
</template>

<style scoped>
/* The status shares the title's existing line, never a row above the repository grid. */
.gh-hero-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  height: 23px;
}
.gh-hero-title-row h3 {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
</style>
