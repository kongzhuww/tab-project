<script setup lang="ts">
import { ref, onMounted } from "vue";
import { homePrefsState } from "../launcher/home-prefs.store";
import DockCardModuleHost from "../modules/DockCardModuleHost.vue";
import { fullscreenCardState } from "../core/fullscreen-cards.store";

// 若刷新前已在全屏卡片（如 Todoist），首屏直接就绪，零延迟同步挂载；否则空闲时预热
const isDailyReady = ref(Boolean(fullscreenCardState.activeId));

onMounted(() => {
  if (isDailyReady.value) return;
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => { isDailyReady.value = true; }, { timeout: 80 });
  } else {
    setTimeout(() => { isDailyReady.value = true; }, 40);
  }
});
</script>

<template>
  <div class="logicweaver-workspaces-layer">
    <!-- 原位模块宿主：空闲时准备容器，加载时机由各卡片注册策略保留。 -->
    <main id="daily-section" class="wrap" v-if="isDailyReady">
      <!-- 聚集工作台 -->
      <div id="vue-workbench-root">
        <DockCardModuleHost id="workbench" />
      </div>

      <!-- Todoist 全屏任务工作区 -->
      <div id="vue-todoist-root">
        <DockCardModuleHost id="todoist" />
      </div>

      <!-- b站插件 -->
      <div id="vue-bili-favorites-root">
        <DockCardModuleHost id="daily-bilibili" />
      </div>

      <!-- YouTube -->
      <div v-show="homePrefsState.showYouTube" id="vue-youtube-root">
        <DockCardModuleHost id="daily-youtube" />
      </div>

      <!-- 模型插件 -->
      <div id="vue-pricing-root">
        <DockCardModuleHost id="daily-pricing" />
      </div>

      <!-- AI HOT -->
      <div id="vue-aihot-root">
        <DockCardModuleHost id="daily-aihot" />
      </div>

      <!-- GitHub 综合仪表盘（纯血 Vue 3 统一卡片工作台） -->
      <DockCardModuleHost id="card-github" />



    </main>
  </div>
</template>
