<script setup lang="ts">
import { computed, onUnmounted } from "vue";
import { biliFavoritesController, biliFavoritesState } from "./bili-favorites-store";
import BiliRichText from "./BiliRichText.vue";
import { subscriptionSubtitleFollow } from "./subtitle-follow";
onUnmounted(() => subscriptionSubtitleFollow.reset());

const organizer = computed(() => biliFavoritesState.organizer);
const hasTranscript = computed(() => organizer.value.subscriptionChapters.length > 0 || organizer.value.subscriptionCues.length > 0);

function dispatch(action: Parameters<typeof biliFavoritesController.dispatch>[0], payload?: unknown): void {
  biliFavoritesController.dispatch(action, payload);
}
</script>

<template>
  <section class="bili-sub-transcript-column bili-sub-vue-transcript-column">
    <article class="bili-sub-article-wrap">
      <div class="bili-sub-transcript-body" tabindex="0" @wheel.passive="subscriptionSubtitleFollow.interact"
        @pointerdown="subscriptionSubtitleFollow.pointerDown" @keydown="subscriptionSubtitleFollow.keyDown">
        <!-- 模式 A：用户显式点击了“放大简介”，右侧展现大字号完整文案简介 -->
        <section v-if="organizer.showFullDescInRightPanel" class="bili-sub-description-copy" title="当前为放大简介视图">
          <header>
            <h5>视频简介</h5>
            <button type="button" class="bili-copy-desc-btn" title="切回台词展示" @click="dispatch('subscription-toggle-desc-panel')">缩小简介</button>
          </header>
          <p v-for="(paragraph, index) in organizer.subscriptionDescription" :key="index"><BiliRichText :text="paragraph" /></p>
          <p v-if="!organizer.subscriptionDescription.length" class="muted">该视频暂无可用的文字简介。</p>
        </section>

        <!-- 模式 B：滚动台词列表 -->
        <template v-else>
          <div v-if="organizer.subscriptionCues.length" class="bili-sub-srt-list">
            <button v-for="cue in organizer.subscriptionCues" :key="`${cue.from}:${cue.index}`" type="button" class="bili-sub-srt-row" :data-idx="cue.index" :data-from="cue.from" :data-to="cue.to" :title="`点击跳转至 ${cue.timeText}`" @click="dispatch('subscription-seek', { from: cue.from, index: cue.index, mode: 'lyrics' })"><span class="bili-sub-srt-time">{{ cue.timeText }}</span><span class="bili-sub-srt-text">{{ cue.content }}</span></button>
          </div>
          <div v-else class="bili-sub-no-transcript-wrap">
            <div class="bili-sub-no-transcript-box" :class="{ compact: organizer.subscriptionDescription.length > 0 }">
              <div class="bili-sub-no-transcript-icon">🎙️</div>
              <h5>暂无实时台词字幕</h5>
              <p class="muted">当前视频未提供 CC / AI 字幕，可在下方查看简介或直接观看视频与评论。</p>
            </div>
            <section v-if="organizer.subscriptionDescription.length" class="bili-sub-description-copy">
              <header>
                <h5>视频简介</h5>
              </header>
              <p v-for="(paragraph, index) in organizer.subscriptionDescription" :key="index"><BiliRichText :text="paragraph" /></p>
            </section>
          </div>
        </template>
        <p v-if="!organizer.showFullDescInRightPanel && !hasTranscript && !organizer.subscriptionDescription.length" class="bili-sub-vue-empty-hint">字幕不可用时仍可在左侧播放和查看评论。</p>
      </div>
    </article>
  </section>
</template>

<style scoped>
.bili-sub-srt-row { width: 100%; border: 0; font: inherit; text-align: left; }
.bili-sub-vue-empty-hint { margin: 18px 0 0; color: var(--dim); font-size: 11px; }

.bili-sub-no-transcript-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 240px;
  padding: 40px 24px;
  text-align: center;
  color: var(--dim);
}
.bili-sub-no-transcript-box.compact {
  min-height: auto;
  padding: 16px 14px 12px;
  gap: 6px;
  border-bottom: 1px dashed var(--border);
  margin-bottom: 8px;
}
.bili-sub-no-transcript-icon {
  font-size: 30px;
  opacity: 0.75;
}
.bili-sub-no-transcript-box h5 {
  margin: 0;
  font-size: 13.5px;
  color: var(--heading);
  font-weight: 700;
}
.bili-sub-no-transcript-box p {
  margin: 0;
  max-width: 320px;
  line-height: 1.6;
  font-size: 11px;
}
</style>
