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
      <button type="button" class="bili-sub-head-btn bili-sub-script-mode-btn" :class="{ 'is-newspaper': biliFavoritesState.organizer.subscriptionScriptMode === 'newspaper' }" @click="dispatch('subscription-script-mode')">
        <span class="bili-sub-mode-icon">{{ biliFavoritesState.organizer.subscriptionScriptMode === 'newspaper' ? '📰' : '📜' }}</span>
        <span class="bili-sub-mode-text">{{ biliFavoritesState.organizer.subscriptionScriptMode === 'newspaper' ? '报纸模式' : '滚动台词' }}</span>
      </button>
      <details class="bili-sub-dropdown-wrap bili-sub-vue-dropdown">
        <summary class="bili-sub-head-btn bili-sub-dropdown-btn"><span>关注 UP 主：<b>{{ biliFavoritesState.organizer.subscriptionTitle }}</b></span><i class="bili-sub-dropdown-arrow">▾</i></summary>
        <div class="bili-sub-dropdown-panel">
          <div class="bili-sub-dropdown-title">已关注的 UP 主</div>
          <div class="bili-sub-dropdown-list">
            <button v-for="channel in biliFavoritesState.organizer.subscriptionChannels" :key="channel.id" type="button" class="bili-sub-dropdown-item" :class="{ active: channel.active }" @click="dispatch('subscription-channel', channel.id)"><span class="bili-sub-dot"></span><span class="bili-sub-item-text">{{ channel.name }}</span><span v-if="channel.active" class="bili-sub-item-check">✓</span></button>
          </div>
          <div class="bili-sub-dropdown-foot"><button type="button" class="bili-sub-dropdown-foot-btn" @click="dispatch('subscription-add-channel')">＋ UP 主</button></div>
        </div>
      </details>
      <details class="bili-sub-dropdown-wrap bili-sub-vue-dropdown">
        <summary class="bili-sub-head-btn bili-sub-dropdown-btn"><span>视频 <b>({{ biliFavoritesState.organizer.subscriptionVideos.length }})</b></span><i class="bili-sub-dropdown-arrow">▾</i></summary>
        <div class="bili-sub-dropdown-panel bili-sub-video-dropdown-panel">
          <div class="bili-sub-dropdown-title">最近投稿视频 ({{ biliFavoritesState.organizer.subscriptionVideos.length }})</div>
          <div class="bili-sub-dropdown-list">
            <button v-for="(video, index) in biliFavoritesState.organizer.subscriptionVideos" :key="video.bvid" type="button" class="bili-sub-dropdown-item bili-sub-video-item" :class="{ active: video.active }" :title="video.title" @click="dispatch('subscription-video', video.bvid)"><span class="bili-sub-video-num">{{ index + 1 }}.</span><span class="bili-sub-item-text">{{ video.title }}</span><small v-if="video.duration" class="bili-sub-video-duration">{{ video.duration }}</small></button>
          </div>
          <div class="bili-sub-dropdown-foot"><button type="button" class="bili-sub-dropdown-foot-btn" :disabled="biliFavoritesState.organizer.subscriptionLoading" @click="dispatch('subscription-load-more')">继续获取</button></div>
        </div>
      </details>
      <button
        type="button"
        class="bili-sub-head-btn"
        @click="dispatch(biliFavoritesState.organizer.showFullDescInRightPanel ? 'subscription-copy-description' : 'subscription-copy-script')"
      >
        {{ biliFavoritesState.organizer.showFullDescInRightPanel ? '复制简介' : '复制稿子' }}
      </button>
      <button type="button" class="bili-sub-head-btn" @click="dispatch('subscription-refresh')">↻ 刷新</button>
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
