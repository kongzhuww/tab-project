<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  EMPLOYEE_LIVE_PEEK_KEY,
  type EmployeePeekSnapshot,
  type PeekPhase,
} from './employee-contract';

declare const chrome: any;

const props = defineProps<{
  mode: 'live' | 'replay';
  employeeId?: string;
  employeeName?: string;
  replayFrames?: EmployeePeekSnapshot[];
  running?: boolean;
  backendStale?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  runNow: [employeeId?: string];
  reloadExtension: [];
}>();

const stageRef = ref<HTMLElement | null>(null);
const liveSnapshot = ref<EmployeePeekSnapshot | null>(null);
const liveTimeline = ref<string[]>([]);
const replayIndex = ref(0);
const playing = ref(true);
let replayTimer: ReturnType<typeof setInterval> | null = null;
let livePollTimer: ReturnType<typeof setInterval> | null = null;

const cursorPos = ref<{ x: number; y: number; visible: boolean }>({ x: 80, y: 80, visible: false });
const pulseKey = ref(0);

const currentSnapshot = computed<EmployeePeekSnapshot | null>(() => {
  if (props.mode === 'replay') {
    const frames = props.replayFrames || [];
    if (!frames.length) return null;
    return frames[Math.min(replayIndex.value, frames.length - 1)] || frames[0];
  }
  return liveSnapshot.value;
});

const displayLiveTimeline = computed<string[]>(() => {
  const backendSteps = currentSnapshot.value?.timelineSteps;
  if (Array.isArray(backendSteps) && backendSteps.length) {
    return backendSteps;
  }
  if (liveTimeline.value.length) {
    return liveTimeline.value;
  }
  return currentSnapshot.value?.cursorLabel ? [currentSnapshot.value.cursorLabel] : [];
});

const activeTab = computed<'info' | 'comments' | 'subtitle'>(() => {
  const phase: PeekPhase | undefined = currentSnapshot.value?.phase;
  if (phase === 'comments') return 'comments';
  if (phase === 'subtitle') return 'subtitle';
  return 'info';
});

function formatDuration(sec?: number): string {
  const s = Math.max(0, Math.floor(Number(sec || 0)));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function formatCompactCount(n?: number): string {
  const v = Number(n || 0);
  if (v >= 10000) return `${(v / 10000).toFixed(1)}万`;
  return String(v);
}

async function updateCursorPosition() {
  await nextTick();
  const stage = stageRef.value;
  const snap = currentSnapshot.value;
  if (!stage || !snap) {
    cursorPos.value.visible = false;
    return;
  }
  const stageRect = stage.getBoundingClientRect();
  const target = stage.querySelector<HTMLElement>(`[data-peek-target="${snap.cursorTarget}"]`);
  if (!target) {
    cursorPos.value = { x: Math.round(stageRect.width * 0.45), y: Math.round(stageRect.height * 0.42), visible: true };
    return;
  }
  const rect = target.getBoundingClientRect();
  const x = Math.max(16, Math.min(stageRect.width - 140, rect.left - stageRect.left + Math.min(rect.width * 0.42, 110)));
  const y = Math.max(16, Math.min(stageRect.height - 36, rect.top - stageRect.top + Math.min(rect.height * 0.48, 52)));
  cursorPos.value = { x: Math.round(x), y: Math.round(y), visible: true };
  pulseKey.value++;
}

watch(currentSnapshot, () => {
  void updateCursorPosition();
}, { immediate: true, deep: true });

function stopReplayTimer() {
  if (replayTimer) {
    clearInterval(replayTimer);
    replayTimer = null;
  }
}

function startReplayTimer() {
  stopReplayTimer();
  if (props.mode !== 'replay') return;
  const frames = props.replayFrames || [];
  if (frames.length <= 1) return;
  replayTimer = setInterval(() => {
    if (!playing.value) return;
    if (replayIndex.value < frames.length - 1) {
      replayIndex.value++;
    } else {
      playing.value = false;
    }
  }, 1500);
}

function togglePlay() {
  const frames = props.replayFrames || [];
  if (!frames.length) return;
  if (!playing.value && replayIndex.value >= frames.length - 1) {
    replayIndex.value = 0;
  }
  playing.value = !playing.value;
}

function applyLiveSnapshot(snap: EmployeePeekSnapshot | undefined) {
  if (!snap || (props.employeeId && snap.employeeId !== props.employeeId)) return;
  const prev = liveSnapshot.value;
  if (
    prev &&
    prev.updatedAt === snap.updatedAt &&
    prev.bvid === snap.bvid &&
    prev.cursorTarget === snap.cursorTarget &&
    prev.cursorLabel === snap.cursorLabel &&
    prev.active === snap.active &&
    prev.activeVideo?.desc === snap.activeVideo?.desc &&
    prev.activeVideo?.descStatus === snap.activeVideo?.descStatus &&
    (prev.toolHistory?.length || 0) === (snap.toolHistory?.length || 0) &&
    (prev.timelineSteps?.length || 0) === (snap.timelineSteps?.length || 0)
  ) {
    return;
  }
  if (snap.phase === 'source' && snap.cursorTarget === 'folder') {
    liveTimeline.value = snap.cursorLabel ? [snap.cursorLabel] : [];
  } else if (snap.cursorLabel) {
    const last = liveTimeline.value[liveTimeline.value.length - 1];
    if (last !== snap.cursorLabel) {
      liveTimeline.value = [...liveTimeline.value.slice(-19), snap.cursorLabel];
    }
  }
  liveSnapshot.value = snap;
}

async function loadInitialLive() {
  if (props.mode !== 'live' || typeof chrome === 'undefined' || !chrome.storage?.local) return;
  try {
    const stored = await chrome.storage.local.get(EMPLOYEE_LIVE_PEEK_KEY);
    applyLiveSnapshot(stored?.[EMPLOYEE_LIVE_PEEK_KEY] as EmployeePeekSnapshot | undefined);
  } catch {}
}

function onStorageChanged(changes: any, area: string) {
  if (props.mode !== 'live' || area !== 'local' || !changes[EMPLOYEE_LIVE_PEEK_KEY]) return;
  applyLiveSnapshot(changes[EMPLOYEE_LIVE_PEEK_KEY].newValue as EmployeePeekSnapshot | undefined);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.stopPropagation();
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('resize', updateCursorPosition);
  if (props.mode === 'live') {
    void loadInitialLive();
    if (typeof chrome !== 'undefined' && chrome.storage?.onChanged?.addListener) {
      chrome.storage.onChanged.addListener(onStorageChanged);
    }
    livePollTimer = setInterval(() => {
      void loadInitialLive();
    }, 400);
  } else {
    replayIndex.value = 0;
    playing.value = true;
    startReplayTimer();
  }
  void updateCursorPosition();
});

onBeforeUnmount(() => {
  stopReplayTimer();
  if (livePollTimer) {
    clearInterval(livePollTimer);
    livePollTimer = null;
  }
  document.removeEventListener('keydown', onKeydown);
  window.removeEventListener('resize', updateCursorPosition);
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged?.removeListener) {
    chrome.storage.onChanged.removeListener(onStorageChanged);
  }
});
</script>

<template>
  <div class="peek-overlay" @click.self="emit('close')">
    <section class="peek-window" role="dialog" aria-modal="true" aria-label="数字员工实时窥屏监视器">
      <header class="peek-win-bar">
        <div class="peek-win-left">
          <span class="peek-status-badge" :class="{ live: mode === 'live' && currentSnapshot?.active }">
            <i class="peek-status-dot"></i>
            <span>{{ mode === 'live' ? (currentSnapshot?.active ? 'LIVE 实况窥屏' : '最近一次实况') : '历史轨迹回放' }}</span>
          </span>
          <strong>{{ currentSnapshot?.employeeName || employeeName || '数字员工' }}</strong>
          <span v-if="currentSnapshot" class="peek-action-text">{{ currentSnapshot.cursorLabel }}</span>
        </div>
        <div class="peek-win-controls">
          <button
            v-if="mode === 'live' && employeeId"
            type="button"
            class="peek-ctl-btn"
            :disabled="running || Boolean(currentSnapshot?.active)"
            @click="emit('runNow', employeeId)"
          >
            {{ running || currentSnapshot?.active ? '执行中…' : '▶ 立即试跑 1 条' }}
          </button>
          <template v-if="mode === 'replay' && (replayFrames?.length || 0) > 1">
            <button type="button" class="peek-ctl-btn" @click="togglePlay">
              {{ playing ? '暂停' : (replayIndex >= (replayFrames?.length || 1) - 1 ? '重播' : '继续') }}
            </button>
            <span class="peek-step-count">{{ replayIndex + 1 }} / {{ replayFrames?.length }}</span>
          </template>
          <button type="button" class="peek-close-btn" aria-label="关闭监视器" @click="emit('close')">×</button>
        </div>
      </header>

      <div v-if="mode === 'live' && backendStale" class="peek-stale-bar" role="alert">
        <span>检测到扩展后台 `background.js` 尚未重载，当前不会推送实时窥屏画面。</span>
        <button type="button" class="peek-ctl-btn" @click="emit('reloadExtension')">🔄 立即热重载扩展</button>
      </div>

      <div v-if="!currentSnapshot" class="peek-empty">
        <h3>暂无可展示的窥屏实况</h3>
        <p>请点击下方「立即试跑 1 条」或开启后台巡检，员工读取收藏夹、视频简介、评论区与字幕的每一步动作都会在这里实时呈现。</p>
        <button
          v-if="mode === 'live' && employeeId"
          type="button"
          class="peek-ctl-btn"
          style="margin-top: 12px;"
          :disabled="running"
          @click="emit('runNow', employeeId)"
        >
          {{ running ? '执行中…' : '▶ 立即试跑 1 条' }}
        </button>
      </div>

      <div v-else class="peek-workspace">
        <!-- 左侧模拟浏览器插件界面 -->
        <div ref="stageRef" class="peek-stage">
          <div class="sim-address-bar">
            <span class="sim-lock">Bilibili · 插件视野仿真</span>
            <span class="sim-url">
              {{ currentSnapshot.bvid ? `bilibili.com/video/${currentSnapshot.bvid}` : `bilibili.com · ${currentSnapshot.sourceTitle}` }}
            </span>
          </div>

          <div class="sim-body">
            <!-- 模拟左侧 B站收藏夹栏 -->
            <aside class="sim-sidebar">
              <div class="sim-side-label">数据源</div>
              <div
                class="sim-folder-item"
                :class="{ active: currentSnapshot.phase === 'source' }"
                data-peek-target="folder"
              >
                <span class="sim-folder-dot"></span>
                <span>{{ currentSnapshot.sourceTitle }}</span>
              </div>
              <div class="sim-side-label" style="margin-top: 10px;">工作状态</div>
              <div class="sim-state-box" data-peek-target="decision-badge">
                <template v-if="currentSnapshot.verdict">
                  <strong :class="{ ok: currentSnapshot.verdict.worth, skip: !currentSnapshot.verdict.worth }">
                    {{ currentSnapshot.verdict.worth ? '推荐沉淀' : '判定跳过' }}
                  </strong>
                  <span>{{ currentSnapshot.verdict.category }} · {{ Math.round(currentSnapshot.verdict.score * 100) }}分</span>
                </template>
                <template v-else>
                  <strong>自主探索中</strong>
                  <span>按需调用工具研判</span>
                </template>
              </div>
              <div
                v-if="currentSnapshot.phase === 'done' || currentSnapshot.cursorTarget === 'library-save'"
                class="sim-save-chip"
                data-peek-target="library-save"
              >
                ✓ 已写入资料库
              </div>
            </aside>

            <!-- 模拟主画布：列表选择阶段 vs 视频详情阶段 -->
            <main class="sim-canvas">
              <!-- A. 列表浏览阶段 -->
              <template v-if="currentSnapshot.phase === 'source' || !currentSnapshot.activeVideo">
                <div class="sim-section-head">
                  <strong>{{ currentSnapshot.sourceTitle }}</strong>
                  <small>扫描前 {{ currentSnapshot.sourceVideos.length }} 条候选视频</small>
                </div>
                <div class="sim-video-grid">
                  <div
                    v-for="v in currentSnapshot.sourceVideos"
                    :key="v.bvid"
                    class="sim-video-card"
                    :class="{ picked: v.bvid === currentSnapshot.bvid }"
                    :data-peek-target="v.bvid === currentSnapshot.bvid ? 'video-card' : undefined"
                  >
                    <div class="sim-cover-wrap">
                      <img v-if="v.cover" :src="v.cover" alt="" />
                      <span class="sim-dur">{{ formatDuration(v.duration) }}</span>
                    </div>
                    <div class="sim-v-title" :title="v.title">{{ v.title }}</div>
                    <div class="sim-v-up">{{ v.author }}</div>
                  </div>
                </div>
              </template>

              <!-- B. 视频内部视图：简介 / 评论区 / 字幕切换 -->
              <template v-else>
                <div class="sim-video-banner">
                  <img v-if="currentSnapshot.activeVideo.cover" class="sim-banner-cover" :src="currentSnapshot.activeVideo.cover" alt="" />
                  <div class="sim-banner-info">
                    <h4>{{ currentSnapshot.activeVideo.title }}</h4>
                    <div class="sim-banner-meta">
                      <span>UP：{{ currentSnapshot.activeVideo.author }}</span>
                      <span v-if="currentSnapshot.activeVideo.tname">{{ currentSnapshot.activeVideo.tname }}</span>
                      <span>{{ currentSnapshot.activeVideo.bvid }}</span>
                    </div>
                    <div v-if="currentSnapshot.activeVideo.stat" class="sim-banner-stats">
                      <span>播放 {{ formatCompactCount(currentSnapshot.activeVideo.stat.view) }}</span>
                      <span>点赞 {{ formatCompactCount(currentSnapshot.activeVideo.stat.like) }}</span>
                      <span>投币 {{ formatCompactCount(currentSnapshot.activeVideo.stat.coin) }}</span>
                      <span>收藏 {{ formatCompactCount(currentSnapshot.activeVideo.stat.favorite) }}</span>
                    </div>
                  </div>
                </div>

                <div class="sim-tabs">
                  <span class="sim-tab" :class="{ active: activeTab === 'info' }" data-peek-target="tab-info">简介与分P</span>
                  <span class="sim-tab" :class="{ active: activeTab === 'comments' }" data-peek-target="tab-comments">评论区</span>
                  <span class="sim-tab" :class="{ active: activeTab === 'subtitle' }" data-peek-target="tab-subtitle">字幕正文</span>
                </div>

                <div class="sim-tab-panel">
                  <div v-if="activeTab === 'info'" class="sim-info-panel" data-peek-target="info-desc">
                    <div v-if="currentSnapshot.activeVideo.pages?.length" class="sim-pages">
                      <span v-for="p in currentSnapshot.activeVideo.pages" :key="p.page" class="sim-page-pill">
                        P{{ p.page }} {{ p.part || '正片' }}
                      </span>
                    </div>
                    <p class="sim-desc">{{ currentSnapshot.activeVideo.desc || (currentSnapshot.activeVideo.descStatus === 'loading' ? '正在获取视频简介内容…' : currentSnapshot.activeVideo.descStatus === 'unavailable' ? '暂时无法获取视频简介。' : '该视频暂无简介。') }}</p>
                  </div>

                  <div v-else-if="activeTab === 'comments'" class="sim-comments-panel" data-peek-target="comments-list">
                    <div v-if="!currentSnapshot.comments?.length" class="sim-loading-note">正在拉取 UP 主置顶与高赞评论…</div>
                    <div v-for="(c, ci) in currentSnapshot.comments" :key="ci" class="sim-comment-row" :class="{ pinned: c.isTop }">
                      <div class="sim-comment-head">
                        <span v-if="c.isTop" class="sim-top-tag">📌 置顶</span>
                        <strong>{{ c.author }}</strong>
                        <span class="sim-likes">👍 {{ c.likes }}</span>
                      </div>
                      <p>{{ c.message }}</p>
                    </div>
                  </div>

                  <div v-else class="sim-subtitle-panel" data-peek-target="subtitle-lines">
                    <div v-if="!currentSnapshot.subtitleLines?.length" class="sim-loading-note">正在加载 WBI 字幕轨道…</div>
                    <div v-for="(line, li) in currentSnapshot.subtitleLines" :key="li" class="sim-sub-line">
                      {{ line }}
                    </div>
                  </div>
                </div>

                <div v-if="currentSnapshot.verdict" class="sim-verdict-bar">
                  <strong>{{ currentSnapshot.verdict.category }} · {{ Math.round(currentSnapshot.verdict.score * 100) }}分</strong>
                  <span>{{ currentSnapshot.verdict.reason }}</span>
                </div>
              </template>
            </main>
          </div>

          <!-- 仿真 AI 鼠标指针 -->
          <div
            v-if="cursorPos.visible"
            class="peek-cursor"
            :style="{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }"
          >
            <span :key="pulseKey" class="peek-cursor-ripple"></span>
            <svg class="peek-cursor-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 3.5l14.5 7.2-6.2 1.8-3.1 5.9L4.5 3.5z" fill="#6366f1" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round" />
            </svg>
            <span class="peek-cursor-tag">{{ currentSnapshot.cursorLabel }}</span>
          </div>
        </div>

        <!-- 右侧轨迹步数时间轴 -->
        <aside class="peek-timeline" aria-label="行为轨迹">
          <div class="peek-tl-head">AI 行为时间轴</div>
          <div v-if="mode === 'replay' && replayFrames?.length" class="peek-tl-list">
            <button
              v-for="(frame, idx) in replayFrames"
              :key="idx"
              type="button"
              class="peek-tl-item"
              :class="{ active: idx === replayIndex, done: idx < replayIndex }"
              @click="replayIndex = idx; playing = false"
            >
              <span class="peek-tl-idx">{{ idx + 1 }}</span>
              <span class="peek-tl-label">{{ frame.cursorLabel }}</span>
            </button>
          </div>
          <div v-else class="peek-tl-list">
            <div
              v-for="(label, li) in displayLiveTimeline"
              :key="`tl-${li}`"
              class="peek-tl-item"
              :class="li === displayLiveTimeline.length - 1 ? 'active' : 'done'"
            >
              <span class="peek-tl-idx">{{ li === displayLiveTimeline.length - 1 && currentSnapshot.active ? '•' : li + 1 }}</span>
              <span class="peek-tl-label">{{ label }}</span>
            </div>
            <div v-for="(step, si) in currentSnapshot.toolHistory" :key="si" class="peek-tl-item done">
              <span class="peek-tl-idx">✓</span>
              <span class="peek-tl-label">{{ step.summary }}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.peek-overlay {
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
}
.peek-window {
  width: min(1040px, 100%);
  height: min(670px, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.34);
}
.peek-win-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, #6366f1 4%, var(--panel, #ffffff));
}
.peek-win-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}
.peek-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--surface, #f1f5f9);
  color: var(--muted, #64748b);
  font-size: 11px;
  font-weight: 600;
  flex: none;
}
.peek-status-badge.live {
  background: rgba(16, 185, 129, 0.14);
  color: #059669;
}
.peek-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}
.peek-stale-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(245, 158, 11, 0.14);
  border-bottom: 1px solid rgba(245, 158, 11, 0.35);
  color: #b45309;
  font-size: 12px;
}
.peek-status-badge.live .peek-status-dot {
  animation: peek-pulse 1.3s ease-in-out infinite;
}
@keyframes peek-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.8); }
}
.peek-action-text {
  font-size: 12px;
  color: #4f46e5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.peek-win-controls { display: flex; align-items: center; gap: 8px; }
.peek-ctl-btn {
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(99, 102, 241, 0.28);
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  font: inherit;
  font-size: 11.5px;
  font-weight: 550;
  cursor: pointer;
}
.peek-step-count { font-size: 11.5px; color: var(--muted, #64748b); font-variant-numeric: tabular-nums; }
.peek-close-btn {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 20px;
  cursor: pointer;
}
.peek-close-btn:hover { background: var(--surface, #f1f5f9); color: var(--heading, #0f172a); }

.peek-empty {
  margin: auto;
  text-align: center;
  max-width: 380px;
  padding: 24px;
  color: var(--muted, #64748b);
}
.peek-empty h3 { margin: 0 0 8px; color: var(--heading, #0f172a); }
.peek-empty p { margin: 0; font-size: 12.5px; line-height: 1.6; }

.peek-workspace {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}
.peek-stage {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--background, #f6f8fc);
}
.sim-address-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  font-size: 11px;
}
.sim-lock {
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(0, 174, 236, 0.12);
  color: #0284c7;
  font-weight: 600;
}
.sim-url {
  color: var(--muted, #64748b);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.sim-body {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}
.sim-sidebar {
  width: 156px;
  flex: none;
  padding: 12px 10px;
  border-right: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sim-side-label {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--muted, #94a3b8);
  padding: 0 4px;
}
.sim-folder-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 9px;
  border-radius: 8px;
  font-size: 12px;
  background: var(--surface, #f3f5f8);
  color: var(--text, #334155);
}
.sim-folder-item.active {
  background: rgba(14, 165, 233, 0.14);
  color: #0284c7;
  font-weight: 600;
}
.sim-folder-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  flex: none;
}
.sim-state-box {
  padding: 8px 9px;
  border-radius: 8px;
  background: var(--surface, #f6f8fc);
  border: 1px solid var(--border, #e2e8f0);
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
}
.sim-state-box strong.ok { color: #059669; }
.sim-state-box strong.skip { color: #d97706; }
.sim-save-chip {
  margin-top: 4px;
  padding: 6px 9px;
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.14);
  color: #059669;
  font-size: 11.5px;
  font-weight: 600;
}

.sim-canvas {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sim-section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 13px;
}
.sim-section-head small { color: var(--muted, #94a3b8); font-size: 11px; }
.sim-video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
  gap: 10px;
}
.sim-video-card {
  padding: 7px;
  border-radius: 9px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.sim-video-card.picked {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.22);
}
.sim-cover-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  overflow: hidden;
  background: #e2e8f0;
}
.sim-cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.sim-dur {
  position: absolute;
  right: 4px;
  bottom: 4px;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;
  font-size: 10px;
}
.sim-v-title {
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sim-v-up { font-size: 10.5px; color: var(--muted, #64748b); }

.sim-video-banner {
  display: flex;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
}
.sim-banner-cover {
  width: 132px;
  height: 76px;
  border-radius: 7px;
  object-fit: cover;
  flex: none;
  background: #e2e8f0;
}
.sim-banner-info { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 4px; }
.sim-banner-info h4 { margin: 0; font-size: 13px; color: var(--heading, #0f172a); line-height: 1.35; }
.sim-banner-meta, .sim-banner-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.sim-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 3px;
  border-radius: 9px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  width: fit-content;
}
.sim-tab {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 550;
  color: var(--muted, #64748b);
}
.sim-tab.active {
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
}
.sim-tab-panel {
  flex: 1;
  min-height: 160px;
  padding: 12px;
  border-radius: 10px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  overflow-y: auto;
}
.sim-pages { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
.sim-page-pill {
  padding: 2px 7px;
  border-radius: 5px;
  background: rgba(14, 165, 233, 0.1);
  color: #0284c7;
  font-size: 11px;
}
.sim-desc { margin: 0; font-size: 12px; line-height: 1.65; white-space: pre-wrap; color: var(--text, #334155); }
.sim-loading-note { font-size: 12px; color: var(--muted, #94a3b8); padding: 14px 4px; }
.sim-comments-panel { display: flex; flex-direction: column; gap: 8px; }
.sim-comment-row {
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--surface, #f8fafc);
  border: 1px solid var(--border, #e2e8f0);
}
.sim-comment-row.pinned { border-color: rgba(245, 158, 11, 0.45); background: rgba(245, 158, 11, 0.06); }
.sim-comment-head { display: flex; align-items: center; gap: 6px; font-size: 11px; margin-bottom: 3px; }
.sim-top-tag { color: #d97706; font-weight: 600; }
.sim-likes { margin-left: auto; color: var(--muted, #64748b); }
.sim-comment-row p { margin: 0; font-size: 11.5px; line-height: 1.5; }
.sim-subtitle-panel { display: flex; flex-direction: column; gap: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; }
.sim-sub-line { padding: 3px 6px; border-radius: 5px; background: var(--surface, #f8fafc); color: var(--text, #334155); }
.sim-verdict-bar {
  padding: 8px 12px;
  border-radius: 9px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.24);
  font-size: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.sim-verdict-bar strong { color: #4f46e5; white-space: nowrap; }

/* 仿真 AI 光标 */
.peek-cursor {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 40;
  pointer-events: none;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  align-items: flex-start;
  gap: 4px;
}
.peek-cursor-arrow {
  width: 22px;
  height: 22px;
  filter: drop-shadow(0 3px 6px rgba(15, 23, 42, 0.28));
}
.peek-cursor-ripple {
  position: absolute;
  left: -6px;
  top: -6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #6366f1;
  animation: cursor-click 0.7s ease-out forwards;
}
@keyframes cursor-click {
  from { transform: scale(0.4); opacity: 0.95; }
  to { transform: scale(2.1); opacity: 0; }
}
.peek-cursor-tag {
  margin-top: 14px;
  padding: 3px 9px;
  border-radius: 999px;
  background: linear-gradient(135deg, #6366f1, #4f6ef7);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
}

/* 右侧行为时间轴 */
.peek-timeline {
  width: 220px;
  flex: none;
  border-left: 1px solid var(--border, #e5e8ef);
  background: var(--panel, #ffffff);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}
.peek-tl-head { font-size: 11.5px; font-weight: 650; color: var(--muted, #64748b); }
.peek-tl-list { display: flex; flex-direction: column; gap: 6px; }
.peek-tl-item {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  padding: 7px 8px;
  border-radius: 8px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--surface, #f8fafc);
  text-align: left;
  font: inherit;
  font-size: 11.5px;
  color: var(--text, #334155);
  cursor: pointer;
}
.peek-tl-item.active {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  font-weight: 600;
}
.peek-tl-item.done { opacity: 0.78; }
.peek-tl-idx {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.14);
  color: #4f46e5;
  display: grid;
  place-items: center;
  font-size: 10px;
  font-weight: 700;
  flex: none;
}
.peek-tl-label { flex: 1; min-width: 0; line-height: 1.4; }
@media (max-width: 780px) {
  .peek-timeline, .sim-sidebar { display: none; }
}
</style>
