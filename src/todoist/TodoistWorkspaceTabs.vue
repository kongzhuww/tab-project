<script setup lang="ts">
import { todoistWorkspaceController as controller, todoistWorkspaceState as state } from "./workspace";
import { t } from "../i18n";
</script>

<template>
  <button type="button" data-view="inbox" :class="{ on: state.view === 'inbox' }" :title="t('todoist.inbox')" @click="controller.switchView('inbox')">
    <span class="todoist-tab-icon">📥</span><span class="todoist-tab-text">{{ t('todoist.inbox') }}</span>
  </button>
  <button type="button" data-view="projects" :class="{ on: state.view === 'projects' }" :title="t('todoist.projects')" @click="controller.switchView('projects')">
    <span class="todoist-tab-icon">📁</span><span class="todoist-tab-text">{{ t('todoist.projects') }}</span>
  </button>
</template>
