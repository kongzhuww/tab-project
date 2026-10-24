<script setup lang="ts">
import { computed } from "vue";
import { biliFavoritesController, biliFavoritesState } from "./bili-favorites-store";
import BiliRichText from "./BiliRichText.vue";

const organizer = computed(() => biliFavoritesState.organizer);
const hasTranscript = computed(() => organizer.value.subscriptionChapters.length > 0 || organizer.value.subscriptionCues.length > 0);

function dispatch(action: Parameters<typeof biliFavoritesController.dispatch>[0], payload?: unknown): void {
  biliFavoritesController.dispatch(action, payload);
}
</script>

<template>
  <section class="bili-sub-transcript-column bili-sub-vue-transcript-column">
    <article class="bili-sub-article-wrap">
      <div class="bili-sub-transcript-body">
        <!-- 模式 A：用户显式点击了“放大简介”，右侧展现大字号完整文案简介 -->
        <section v-if="organizer.showFullDescInRightPanel" class="bili-sub-description-copy" title="当前为放大简介视图">
          <header>
            <h5>视频简介</h5>
            <button type="button" class="bili-copy-desc-btn" title="切回台词展示" @click="dispatch('subscription-toggle-desc-panel')">缩小简介</button>
          </header>
          <p v-for="(paragraph, index) in organizer.subscriptionDescription" :key="index"><BiliRichText :text="paragraph" /></p>
          <p v-if="!organizer.subscriptionDescription.length" class="muted">该视频暂无可用的文字简介。</p>
        </section>

        <!-- 模式 B：默认状态，始终优先呈现报纸模式/滚动台词 -->
        <template v-else>
          <div v-if="organizer.subscriptionScriptMode === 'newspaper' && organizer.subscriptionChapters.length" class="bili-sub-newspaper-list">
            <article v-for="(chapter, index) in organizer.subscriptionChapters" :key="`${chapter.from}:${index}`" class="bili-sub-newspaper-section" :data-idx="index" :data-from="chapter.from" :data-to="chapter.to" :title="`点击跳转至 ${chapter.fromText} 播放`" @click="dispatch('subscription-seek', { from: chapter.from, index, mode: 'newspaper' })">
              <header class="bili-sub-newspaper-header">
                <span class="bili-sub-newspaper-num">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="bili-sub-newspaper-heading"><h4 class="bili-sub-newspaper-title">{{ chapter.title }}</h4><span class="bili-sub-newspaper-time">⏱ {{ chapter.fromText }} - {{ chapter.toText }}</span></div>
                <button type="button" class="bili-sub-newspaper-play-btn" aria-label="从头播放此分段" @click.stop="dispatch('subscription-seek', { from: chapter.from, index, mode: 'newspaper' })">▶</button>
              </header>
              <div class="bili-sub-newspaper-content">
                <template v-if="chapter.paragraphCues && chapter.paragraphCues.length">
                  <p v-for="(pCues, paragraphIndex) in chapter.paragraphCues" :key="paragraphIndex" class="bili-sub-newspaper-p">
                    <span
                      v-for="(cue, cueIndex) in pCues"
                      :key="`${cue.from}:${cueIndex}`"
                      class="bili-sub-newspaper-cue"
                      :data-from="cue.from"
                      :data-to="cue.to"
                      :title="`点击跳转播放此句 (⏱ ${cue.timeText || cue.from + 's'})`"
                      @click.stop="dispatch('subscription-seek', { from: cue.from, mode: 'newspaper' })"
                    >{{ cue.content }} </span>
                  </p>
                </template>
                <template v-else>
                  <p v-for="(paragraph, paragraphIndex) in chapter.paragraphs" :key="paragraphIndex" class="bili-sub-newspaper-p">{{ paragraph }}</p>
                </template>
              </div>
            </article>
          </div>
          <div v-else-if="organizer.subscriptionCues.length" class="bili-sub-srt-list">
            <button v-for="cue in organizer.subscriptionCues" :key="`${cue.from}:${cue.index}`" type="button" class="bili-sub-srt-row" :data-idx="cue.index" :data-from="cue.from" :data-to="cue.to" :title="`点击跳转至 ${cue.timeText}`" @click="dispatch('subscription-seek', { from: cue.from, index: cue.index, mode: 'lyrics' })"><span class="bili-sub-srt-time">{{ cue.timeText }}</span><span class="bili-sub-srt-text">{{ cue.content }}</span></button>
          </div>
          <div v-else class="bili-sub-no-transcript-box">
            <div class="bili-sub-no-transcript-icon">🎙️</div>
            <h5>暂无实时台词字幕</h5>
            <p class="muted">当前视频暂无可用字幕稿。如需阅读完整文案，请点击左侧视频标题旁的“放大简介”。</p>
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
