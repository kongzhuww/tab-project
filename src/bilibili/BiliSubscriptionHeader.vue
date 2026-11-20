<script setup lang="ts">
import { biliFavoritesController, biliFavoritesState } from "./bili-favorites-store";

defineProps<{ showBack?: boolean }>();

function dispatch(action: Parameters<typeof biliFavoritesController.dispatch>[0], payload?: unknown): void {
  biliFavoritesController.dispatch(action, payload);
}
</script>

<template>
  <header class="bili-sub-header bili-sub-vue-header">
    <div class="bili-sub-channel-info">
      <img class="bili-sub-avatar" :src="'assets/bilibili.svg'" alt="" />
      <div>
        <div class="bili-sub-vue-title-row"><h3 class="bili-sub-title">{{ biliFavoritesState.organizer.subscriptionTitle }}</h3></div>
        <p class="bili-sub-desc">{{ biliFavoritesState.organizer.subscriptionSubtitle }}</p>
      </div>
    </div>
    <div class="bili-sub-actions">
      <button
        type="button"
        class="bili-sub-head-btn"
        @click="dispatch(biliFavoritesState.organizer.showFullDescInRightPanel ? 'subscription-copy-description' : 'subscription-copy-script')"
      >
        {{ biliFavoritesState.organizer.showFullDescInRightPanel ? '复制简介' : '复制稿子' }}
      </button>
      <button v-if="showBack" type="button" class="bili-sub-head-btn" @click="dispatch('organizer-open')">← 返回收藏夹</button>
    </div>
  </header>
</template>

<style scoped>
.bili-sub-vue-title-row { display: flex; align-items: center; gap: 8px; }
.bili-sub-vue-dropdown > summary { list-style: none; cursor: pointer; }
.bili-sub-vue-dropdown > summary::-webkit-details-marker { display: none; }
.bili-sub-vue-dropdown[open] > .bili-sub-dropdown-panel { display: block; }
</style>
