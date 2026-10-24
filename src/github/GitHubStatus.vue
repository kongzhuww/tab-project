<script setup lang="ts">
import { githubStatusState as state, githubStatusController } from "./store";
import { githubAiJob } from "./ai-job";
import { gitHubService } from "../services/github.service";

function clearActionText() {
  githubStatusController.update({ actionText: "", actionError: false });
}
</script>

<template>
  <section v-if="githubAiJob.message || githubAiJob.busy" aria-label="AI 分析任务">
    <p role="status">{{ githubAiJob.repo ? `原任务仓库：${githubAiJob.repo}。 ` : "" }}{{ githubAiJob.message }}</p>
    <button v-if="githubAiJob.busy" type="button" @click="gitHubService.stopAiAnalysis()">停止后续分析 / 中断等待</button>
    <template v-if="githubAiJob.uncertain">
      <p>AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。</p>
      <button v-if="!githubAiJob.unlockConfirmation" type="button" :disabled="githubAiJob.busy" @click="githubAiJob.unlockConfirmation = true">我已核对供应商记录</button>
      <template v-else>
        <p>扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。</p>
        <button type="button" :disabled="githubAiJob.busy" @click="gitHubService.acknowledgeAiChecked()">确认解除本页限制</button>
        <button type="button" @click="githubAiJob.unlockConfirmation = false">保持限制</button>
      </template>
    </template>
  </section>
  <!-- Routine progress is inline in GitHubHero; errors remain fully readable here. -->
  <div v-if="state.actionText && state.actionError" class="gh-action-status" :class="{ error: state.actionError }" role="status">
    <span>{{ state.actionText }}</span>
    <button type="button" class="gh-action-status-close" title="关闭提示" @click="clearActionText">✕</button>
  </div>
</template>

<style scoped>
.gh-action-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.gh-action-status-close {
  background: transparent;
  border: 0;
  color: inherit;
  font-size: 13px;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.7;
  transition: opacity 0.15s;
}
.gh-action-status-close:hover {
  opacity: 1;
}
</style>
