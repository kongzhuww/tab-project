<template>
  <dialog
    id="bili-theater-dialog"
    class="bili-theater-dialog"
    :open="state.isOpen || undefined"
  >
    <header class="bili-theater-header">
      <div class="bili-theater-meta">
        <button
          id="bili-theater-srt-toggle"
          class="bili-theater-btn bili-theater-srt-toggle-btn"
          type="button"
          title="展开/收起字幕抽屉面板 (快捷键 S)"
          @click="handleToggleSrt"
        >
          📝 字幕
        </button>
        <span class="bili-theater-badge">本地播放</span>
        <h3 id="bili-theater-title" class="bili-theater-title">{{ state.title }}</h3>
        <span id="bili-theater-author" class="bili-theater-author">{{ state.author }}</span>
      </div>
      <div class="bili-theater-controls">
        <select
          v-if="!state.useIframe && state.acceptQualities.length"
          class="bili-theater-quality-select"
          :value="state.currentQuality"
          title="切换视频画质清晰度"
          @change="handleQualityChange"
        >
          <option v-for="q in state.acceptQualities" :key="q.qn" :value="q.qn">
            {{ q.label }}
          </option>
        </select>
        <button
          v-if="state.canDirectPlay"
          class="bili-theater-btn"
          type="button"
          :title="state.useIframe ? '切换至原生 HTML5 直链播放器' : '切换至官方 iframe 内嵌播放器'"
          @click="handleTogglePlayerMode"
        >
          {{ state.useIframe ? '直链播放' : '官方内嵌' }}
        </button>
        <a
          id="bili-theater-open-bili"
          class="bili-theater-btn"
          target="_blank"
          rel="noreferrer"
          title="在 B站 网页中打开"
          :href="state.openBiliUrl || undefined"
        >
          B站播放 ↗
        </a>
        <button
          id="bili-theater-close"
          class="bili-theater-btn close"
          type="button"
          title="关闭 (Esc / Alt+W / Q)"
          @click="handleClose"
        >
          ✕
        </button>
      </div>
    </header>
    <div class="bili-theater-content-wrapper">
      <div class="bili-theater-body">
        <div class="bili-theater-player-box">
          <video
            id="bili-theater-video"
            class="bili-theater-video"
            controls
            autoplay
            playsinline
            preload="metadata"
            :src="state.videoSrc || undefined"
            :poster="state.cover || undefined"
            :hidden="state.useIframe"
          ></video>
          <iframe
            id="bili-theater-iframe"
            class="bili-theater-iframe"
            allowfullscreen="true"
            allow="autoplay; fullscreen; encrypted-media"
            :src="state.iframeSrc || undefined"
            :hidden="!state.useIframe"
          ></iframe>
        </div>
        <div class="bili-theater-comments-section">
          <div class="bili-theater-comments-head">
            <div class="bili-theater-comments-title">
              <strong>💬 评论区</strong>
              <span id="bili-theater-comments-count" class="muted small">{{ state.commentsCountText }}</span>
            </div>
            <div class="bili-theater-comments-sort">
              <button
                type="button"
                class="bili-comments-sort-btn"
                :class="{ active: state.commentsSort === 1 }"
                data-sort="1"
                @click="handleSort(1)"
              >
                按热度
              </button>
              <button
                type="button"
                class="bili-comments-sort-btn"
                :class="{ active: state.commentsSort === 0 }"
                data-sort="0"
                @click="handleSort(0)"
              >
                按最新
              </button>
            </div>
          </div>
          <div id="bili-theater-comments-list" class="bili-theater-comments-list">
            <p v-if="state.commentsLoading && !state.comments.length" class="muted small" style="padding: 12px 0;">正在加载评论…</p>
            <p v-else-if="state.commentsStatus && !state.comments.length" class="muted small" style="padding: 12px 0;">{{ state.commentsStatus }}</p>
            <div
              v-for="c in state.comments"
              :key="c.id"
              class="bili-theater-comment-item"
            >
              <img
                v-if="c.avatar"
                class="bili-theater-comment-avatar"
                :src="c.avatar"
                alt=""
                loading="lazy"
              />
              <div class="bili-theater-comment-main">
                <div class="bili-theater-comment-user">{{ c.userName }} <small v-if="c.level">LV{{ c.level }}</small></div>
                <div class="bili-theater-comment-text"><BiliRichText :text="c.message" /></div>
                <div v-if="c.pictures?.length" class="bili-comment-picture-grid"><a v-for="picture in c.pictures" :key="picture" :href="picture" target="_blank" rel="noreferrer"><img :src="picture" alt="评论图片" loading="lazy" referrerpolicy="no-referrer" /></a></div>
                <div class="bili-theater-comment-meta muted small"><span>{{ c.timeStr || '' }}</span><span v-if="c.likeCount">👍 {{ c.likeCount }}</span><span v-if="c.replyCount">💬 {{ c.replyCount }}</span></div>
                <div v-if="c.replies?.length" class="bili-comment-sub-list">
                  <div v-for="reply in c.replies" :key="reply.id" class="bili-comment-sub-item">
                    <strong class="bili-comment-sub-uname">{{ reply.userName }}:</strong> <BiliRichText :text="reply.message" />
                  </div>
                  <!-- 原地展开 / 点击查看楼中楼控制条 -->
                  <div class="bili-comment-sub-more">
                    <template v-if="!c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length">
                      <span>共 {{ c.replyCount }} 条回复，</span>
                      <button
                        type="button"
                        class="bili-comment-sub-expand-btn"
                        :disabled="c.subRepliesLoading"
                        @click.stop="biliTheaterController.expandSubReplies(c.id)"
                      >
                        {{ c.subRepliesLoading ? '正在加载回复…' : '点击查看 ›' }}
                      </button>
                    </template>
                    <template v-else-if="c.subRepliesExpanded">
                      <button
                        v-if="c.subRepliesHasMore"
                        type="button"
                        class="bili-comment-sub-expand-btn"
                        :disabled="c.subRepliesLoading"
                        @click.stop="biliTheaterController.expandSubReplies(c.id)"
                      >
                        {{ c.subRepliesLoading ? '正在加载更多…' : '加载更多回复 ›' }}
                      </button>
                      <button
                        type="button"
                        class="bili-comment-sub-collapse-btn"
                        @click.stop="biliTheaterController.collapseSubReplies(c.id)"
                      >
                        收起 ▴
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bili-theater-comments-more">
            <button
              id="bili-theater-comments-more"
              class="bili-theater-load-more"
              type="button"
              :hidden="!state.hasMoreComments"
              @click="handleLoadMore"
            >
              加载更多评论
            </button>
          </div>
        </div>
      </div>
      <aside
        id="bili-theater-srt-drawer"
        class="bili-theater-srt-drawer"
        :hidden="!state.srtDrawerOpen"
      >
        <div class="bili-srt-head">
          <div class="bili-srt-meta">
            <strong class="bili-srt-title">📝 视频字幕 (SRT)</strong>
            <span id="bili-srt-count" class="muted small">{{ state.srtCountText }}</span>
          </div>
          <div class="bili-srt-actions">
            <button
              id="bili-srt-ai"
              class="bili-theater-btn"
              type="button"
              title="把字幕填入 AI 草稿，发送前不会上传"
              @click="handleAiAnalyze"
            >
              ✦ AI 分析
            </button>
            <button
              id="bili-srt-copy"
              class="bili-theater-btn"
              type="button"
              title="复制纯文本字幕"
              @click="handleCopySrt"
            >
              📋 复制
            </button>
            <button
              id="bili-srt-close"
              class="bili-theater-btn close"
              type="button"
              title="收起字幕面板"
              @click="handleToggleSrt"
            >
              ✕
            </button>
          </div>
        </div>
        <div id="bili-srt-list" class="bili-srt-list" tabindex="0">
          <p
            v-if="!state.srtLines.length && !state.srtLoading"
            class="muted small bili-srt-placeholder"
            style="padding: 12px 6px;"
          >
            点击左上方“📝 字幕”即可获取该视频的字幕稿…
          </p>
          <div
            v-for="line in state.srtLines"
            :key="line.id"
            class="bili-srt-line"
            :data-from="line.from"
            :data-to="line.to"
            @click="handleSeekSrt(line.from)"
          >
            <span class="bili-srt-time muted">{{ Math.floor(line.from) }}s</span>
            <span class="bili-srt-text">{{ line.content }}</span>
          </div>
        </div>
      </aside>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { biliTheaterController } from "./theater-store";
import BiliRichText from "./BiliRichText.vue";

// B站剧场响应式状态
const state = biliTheaterController.state;

// 关闭剧场视窗
function handleClose() {
  biliTheaterController.close();
}

// 展开/收起字幕抽屉
function handleToggleSrt() {
  biliTheaterController.toggleSrt();
}

// 切换原生直链与官方内嵌 iframe
function handleTogglePlayerMode() {
  biliTheaterController.togglePlayerMode();
}

// 切换画质清晰度
function handleQualityChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  if (target) {
    biliTheaterController.switchQuality(Number(target.value));
  }
}

// 切换评论排序
function handleSort(sort: number) {
  biliTheaterController.setSort(sort);
}

// 加载更多评论
function handleLoadMore() {
  biliTheaterController.loadMoreComments();
}

// AI 分析字幕
function handleAiAnalyze() {
  biliTheaterController.analyzeSrtWithAi();
}

// 复制纯文本字幕
function handleCopySrt() {
  biliTheaterController.copySrt();
}

function handleSeekSrt(from: number) {
  biliTheaterController.seekSrt(from);
}
</script>

<style scoped>
/* 评论图片网格：严格限制图片尺寸，彻底消除撑爆屏幕的 Bug */
.bili-comment-picture-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
}
.bili-comment-picture-grid a {
  display: inline-block;
  max-width: 130px;
  max-height: 130px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  background: var(--surface, rgba(15, 23, 42, 0.6));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.bili-comment-picture-grid img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 130px;
  max-height: 130px;
  object-fit: cover;
  border-radius: 5px;
  transition: transform 0.18s ease;
}
.bili-comment-picture-grid a:hover img {
  transform: scale(1.05);
}
</style>
