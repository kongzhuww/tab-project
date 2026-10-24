<script setup lang="ts">
import { ref } from "vue";
import { biliUpPreviewController as controller, biliUpPreviewState as state } from "./up-preview-store";
const fallbackAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

const armUnfollow = ref(false);

function handleButtonClick() {
  if (state.submitting) return;
  if (!state.followed) {
    // 关注操作直接执行
    armUnfollow.value = false;
    void controller.toggleFollow();
    return;
  }
  // 如果当前是已关注状态，第一次点击进入就地确认态
  if (!armUnfollow.value) {
    armUnfollow.value = true;
    return;
  }
  // 第二次点击直接触发取消关注
  armUnfollow.value = false;
  void controller.toggleFollow();
}

function handleClose() {
  armUnfollow.value = false;
  controller.close();
}
</script>

<template>
  <div v-if="state.open" class="fo-up-preview-backdrop" @pointerdown.self="handleClose">
    <aside class="fo-up-preview-popover" :style="{ left: `${state.left}px`, top: `${state.top}px` }" @keydown.esc.stop.prevent="handleClose">
      <div class="fo-up-preview-head">
        <img class="fo-up-preview-avatar" :src="state.face || fallbackAvatar" alt="" referrerpolicy="no-referrer" />
        <div class="fo-up-preview-meta">
          <div class="fo-up-preview-name-row">
            <a class="fo-up-preview-name" :href="`https://space.bilibili.com/${state.mid}`" target="_blank" rel="noreferrer">{{ state.name }}</a>
            <button
              type="button"
              :class="[
                state.followed ? 'fo-up-preview-unfollow' : 'fo-up-preview-follow',
                { 'is-armed': armUnfollow }
              ]"
              :disabled="state.submitting"
              @click="handleButtonClick"
            >
              {{ state.submitting ? '处理中…' : armUnfollow ? '确定取消？' : state.followed ? '取消关注' : '＋ 关注' }}
            </button>
          </div>
          <p class="fo-up-preview-sign">{{ state.sign || '暂无个人简介' }}</p>
        </div>
        <button type="button" class="fo-up-preview-close" aria-label="关闭预览" @click="handleClose">✕</button>
      </div>
      <div class="fo-up-preview-title-tag">近期投稿视频（最新 2~3 个）</div>
      <div class="fo-up-preview-videos"><div v-if="state.loading" class="fo-up-preview-loading"><i></i><span>正在读取近期投稿…</span></div><p v-else-if="state.error" class="fo-up-preview-empty">{{ state.error }}</p><p v-else-if="!state.videos.length" class="fo-up-preview-empty">该 UP 主近期暂无视频动态</p><article v-for="video in state.videos" v-else :key="video.bvid" class="fo-up-preview-video"><a class="fo-up-preview-thumb" :href="video.url" target="_blank" rel="noreferrer"><img :src="video.cover" alt="" loading="lazy" referrerpolicy="no-referrer" /><span v-if="video.duration" class="fo-bili-duration">{{ video.duration }}</span></a><div class="fo-up-preview-video-info"><a class="fo-up-preview-video-title" :href="video.url" target="_blank" rel="noreferrer">{{ video.title }}</a><div class="fo-up-preview-video-meta"><span>▣ {{ video.playCount }}</span><span>{{ video.published }}</span></div></div></article></div>
    </aside>
  </div>
</template>

<style scoped>
.fo-up-preview-backdrop { position: fixed; inset: 0; z-index: 2147483646; }
.fo-up-preview-popover { position: fixed; margin: 0; z-index: 2147483647; }
.fo-up-preview-unfollow.is-armed {
  background: #dc2626 !important;
  border-color: #dc2626 !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  box-shadow: 0 2px 10px rgba(220, 38, 38, 0.45) !important;
}
.fo-up-preview-name {
  color: #0f172a !important;
  font-weight: 700 !important;
}
.fo-up-preview-name:hover {
  color: #00aeec !important;
}
.fo-up-preview-video-title {
  color: #0f172a !important;
  font-weight: 600 !important;
}
.fo-up-preview-video-title:hover {
  color: #00aeec !important;
}
:global(html[data-theme="dark"]) .fo-up-preview-name,
:global(html[data-theme="endfield"]) .fo-up-preview-name {
  color: #f8fafc !important;
}
:global(html[data-theme="dark"]) .fo-up-preview-video-title,
:global(html[data-theme="endfield"]) .fo-up-preview-video-title {
  color: #e2e8f0 !important;
}
</style>
