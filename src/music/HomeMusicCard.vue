<script setup lang="ts">
import { computed, onMounted } from "vue";
import {
  homeMusicState,
  homeMusicController,
  initHomeMusicService
} from "./store";
import { musicModuleState } from "./module-state";
import { togetherPartyState } from "../chat/together-listen.store";

onMounted(() => {
  // 延后 200ms 触发音频服务初始化，脱离首屏阻塞队列
  setTimeout(() => {
    void initHomeMusicService();
  }, 200);
});

const isPartyOrConsoleActive = computed(() => {
  return musicModuleState.visible || togetherPartyState.djModalOpen || (togetherPartyState.isActive && togetherPartyState.isJoined);
});

const isTogetherListening = computed(() => {
  return togetherPartyState.isActive && togetherPartyState.isJoined;
});

const modeEmoji = computed(() => {
  if (homeMusicState.mode === "shuffle") return "🔀";
  if (homeMusicState.mode === "one") return "🔂";
  return "🔁";
});

function onSeek(event: Event) {
  const target = event.target as HTMLInputElement;
  const val = Number(target.value);
  homeMusicController.seek(val);
}

function onCoverError() {
  homeMusicController.update({ coverUrl: "" });
}
</script>

<template>
  <div id="home-music-player-view" class="home-music-player-view" :class="{ 'is-degraded': isPartyOrConsoleActive }">
    <!-- 1. 降级极简模式：当工作区/调音台打开或一起听时呈现，停止黑胶高频渲染与重绘 -->
    <template v-if="isPartyOrConsoleActive">
      <div class="home-music-degraded-box">
        <div class="degraded-badge-row">
          <span class="degraded-icon">🎧</span>
          <strong class="degraded-status">
            {{ isTogetherListening ? '正在一起听' : '后台收听中' }}
          </strong>
          <span v-if="isTogetherListening" class="degraded-host-tag">
            DJ: {{ togetherPartyState.hostName }}
          </span>
          <span v-else class="degraded-host-tag">
            工作区就绪
          </span>
        </div>

        <div class="degraded-title-row">
          <h3 class="degraded-track-title" :title="homeMusicState.title">
            {{ homeMusicState.title || "待机中" }}
          </h3>
          <p class="degraded-track-artist">{{ homeMusicState.artist }}</p>
        </div>

        <!-- 纯百分比驱动轻量进度条 (无复杂计算，纯 CSS 宽度平滑过渡) -->
        <div class="degraded-progress-bar-wrap">
          <div
            class="degraded-progress-bar-fill"
            :style="{ width: homeMusicState.progressPercent + '%' }"
          ></div>
        </div>

        <div class="degraded-actions">
          <button
            type="button"
            class="degraded-btn"
            @click="homeMusicController.togglePlay()"
          >
            {{ homeMusicState.playing ? '⏸ 暂停' : '▶ 播放' }}
          </button>
          <span class="degraded-time">
            {{ homeMusicState.formattedCurrent }} / {{ homeMusicState.formattedDuration }}
          </span>
        </div>
      </div>
    </template>

    <!-- 2. 常规模式：完整黑胶播放器 -->
    <template v-else>
      <div class="home-vinyl-box">
        <div
          id="home-vinyl-needle"
          class="home-vinyl-needle"
          :class="{ playing: homeMusicState.playing }"
        >
          <svg viewBox="0 0 32 52" fill="none">
            <circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
            <circle cx="26" cy="4" r="1.5" fill="#64748b" />
            <path
              d="M26 4 L14 26 L11 44"
              stroke="#cbd5e1"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="7"
              y="42"
              width="8"
              height="9"
              rx="1.5"
              fill="#f43f5e"
              transform="rotate(-15 11 46)"
            />
          </svg>
        </div>

        <div
          id="home-vinyl-disc"
          class="home-vinyl-disc"
          :class="{ playing: homeMusicState.playing }"
          title="点击播放 / 暂停"
          @click="homeMusicController.togglePlay()"
        >
          <img
            v-if="homeMusicState.coverUrl"
            id="home-vinyl-cover"
            class="home-vinyl-cover"
            referrerpolicy="no-referrer"
            :src="homeMusicState.coverUrl"
            alt="音乐封面"
            @error="onCoverError"
          />
          <div class="home-vinyl-hole"></div>
        </div>
      </div>

      <div class="home-music-right">
        <h3
          id="home-music-title"
          class="home-music-meta-title"
          :title="homeMusicState.title"
        >
          {{ homeMusicState.title }}
        </h3>
        <p id="home-music-artist" class="home-music-meta-artist">{{ homeMusicState.artist }}</p>

        <div class="home-music-seek-row">
          <span id="home-music-cur" class="home-music-time">{{ homeMusicState.formattedCurrent }}</span>
          <input
            id="home-music-seek"
            class="home-music-seek-bar"
            type="range"
            min="0"
            max="100"
            :value="homeMusicState.progressPercent"
            @input="onSeek"
          />
          <span id="home-music-dur" class="home-music-time">{{ homeMusicState.formattedDuration }}</span>
        </div>

        <div class="home-music-actions">
          <button
            id="home-music-prev"
            class="home-music-btn"
            type="button"
            title="上一首"
            @click="homeMusicController.prev()"
          >
            ⏮
          </button>
          <button
            id="home-music-play"
            class="home-music-btn play-btn"
            type="button"
            title="播放 / 暂停"
            @click="homeMusicController.togglePlay()"
          >
            {{ homeMusicState.playing ? "⏸" : "▶" }}
          </button>
          <button
            id="home-music-next"
            class="home-music-btn"
            type="button"
            title="下一首"
            @click="homeMusicController.next()"
          >
            ⏭
          </button>
          <button
            id="home-music-like"
            class="home-music-btn like-btn"
            :class="{ liked: homeMusicState.liked }"
            type="button"
            title="收藏"
            @click="homeMusicController.toggleLike()"
          >
            {{ homeMusicState.liked ? "♥" : "♡" }}
          </button>
          <button
            id="home-music-mode"
            class="home-music-btn"
            type="button"
            title="播放模式"
            @click="homeMusicController.cycleMode()"
          >
            {{ modeEmoji }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.home-music-lyric-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 3px 0 6px;
  padding: 3px 8px;
  background: color-mix(in srgb, var(--primary, #3b82f6) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary, #3b82f6) 20%, transparent);
  border-radius: 6px;
  font-size: 11px;
  color: var(--text, #1e293b);
  overflow: hidden;
  max-width: 100%;
}
.home-music-lyric-icon {
  font-size: 10px;
  color: var(--primary, #3b82f6);
  flex-shrink: 0;
}
.home-music-lyric-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.2px;
}

/* 降级极简同频卡片样式 */
.home-music-player-view.is-degraded {
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-music-degraded-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 4px;
}
.degraded-badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
}
.degraded-icon {
  font-size: 13px;
}
.degraded-status {
  color: #10b981;
  font-weight: 700;
}
.degraded-host-tag {
  font-size: 10.5px;
  color: var(--muted);
  background: var(--surface);
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
}
.degraded-title-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.degraded-track-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}
.degraded-track-artist {
  font-size: 11px;
  color: var(--muted);
  margin: 0;
}
.degraded-progress-bar-wrap {
  width: 100%;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  margin: 2px 0;
}
.degraded-progress-bar-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.25s linear;
}
.degraded-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.degraded-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--heading);
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.degraded-btn:hover {
  border-color: #10b981;
  color: #10b981;
}
.degraded-time {
  font-size: 11px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
</style>
