<script setup lang="ts">
import { ref, shallowRef, watch } from "vue";
import { githubBatchBarController as controller, githubBatchBarState as state } from "./batch-bar";
import { githubFolderState } from "./folders";
import { categoryFeedback } from "./category-storage";
import { gitHubService } from "../services/github.service";
const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });
const pendingMove = shallowRef<ReturnType<typeof gitHubService.prepareBatchMove>>();
const folder = ref<string | null>(null);
function prepareMove() {
  if (!props.active) return;
  pendingMove.value = gitHubService.prepareBatchMove(); folder.value = null;
}
async function submitMove() {
  const task = pendingMove.value, destination = folder.value;
  if (!props.active || !task || destination === null || categoryFeedback.busy) return;
  const saved = await task.submit(destination);
  if (saved && pendingMove.value === task) pendingMove.value = undefined;
}
watch(() => props.active && state.active, active => { if (!active) pendingMove.value = undefined; });
</script>

<template>
  <div class="gh-batch-bar-left">
    <button type="button" class="gh-batch-action-btn" id="gh-batch-select-all-btn" @click="controller.toggleSelectAll()">
      {{ state.allSelected ? "取消全选" : "全选" }}
    </button>
    <span class="gh-batch-count-tip">已选择 <b id="gh-batch-selected-count">{{ state.selectedCount }}</b> 项</span>
  </div>
  <section v-if="pendingMove" aria-label="批量归属列表确认">
    <p>仅操作打开选择器时的 {{ pendingMove.names.length }} 个仓库；后来勾选的仓库不加入。</p>
    <details><summary>查看本次仓库清单</summary><ul><li v-for="name in pendingMove.names" :key="name">{{ name }}</li></ul></details>
    <select v-model="folder" aria-label="目标列表" :disabled="categoryFeedback.busy">
      <option :value="null" disabled>请选择目标列表</option>
      <option value="">未分类（清空所选仓库的所有列表所属）</option>
      <option v-for="item in githubFolderState.folders.filter(item => item.kind === 'custom')" :key="item.title" :value="item.title">{{ item.title }}</option>
    </select>
    <button type="button" :disabled="!props.active || categoryFeedback.busy || folder === null" @click="submitMove">确认加入列表</button>
    <button type="button" :disabled="categoryFeedback.busy" @click="pendingMove = undefined">取消</button>
  </section>
  <div class="gh-batch-bar-right">
    <button
      type="button"
      class="gh-batch-action-btn"
      id="gh-batch-move-btn"
      :disabled="!props.active || categoryFeedback.busy || state.selectedCount === 0"
      title="固定当前选择，批量加入所选 GitHub 列表"
      @click="prepareMove"
    >
      📁 归入 GitHub 列表
    </button>
    <button
      type="button"
      class="gh-batch-action-btn"
      id="gh-batch-ai-btn"
      :disabled="state.selectedCount === 0"
      title="批量使用 AI 生成中文介绍"
      @click="controller.analyzeAi()"
    >
      ✨ 批量 AI 分析
    </button>
    <button
      type="button"
      class="gh-batch-action-btn danger"
      id="gh-batch-unstar-btn"
      :disabled="state.selectedCount === 0"
      title="从 GitHub 批量取消 Star 收藏"
      @click="controller.unstar()"
    >
      🗑 取消收藏
    </button>
  </div>
</template>
