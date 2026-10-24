<script setup lang="ts">
import { todoistWorkspaceController as controller, todoistWorkspaceState as state } from "./workspace";
</script>

<template>
  <button type="button" data-view="inbox" :class="{ on: state.view === 'inbox' }" title="收件箱" @click="controller.switchView('inbox')">
    <span class="todoist-tab-icon">📥</span><span class="todoist-tab-text">收件箱</span>
  </button>
  <button type="button" data-view="projects" :class="{ on: state.view === 'projects' }" title="项目" @click="controller.switchView('projects')">
    <span class="todoist-tab-icon">📁</span><span class="todoist-tab-text">项目</span>
  </button>
</template>
