<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  AI_SCHEDULE_LIVE_PEEK_KEY,
  type SchedulePeekSnapshot,
} from './schedule-contract';

declare const chrome: any;

const props = defineProps<{
  mode: 'live' | 'replay';
  jobId?: string;
  jobTitle?: string;
  replayFrames?: SchedulePeekSnapshot[];
  running?: boolean;
  backendStale?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  runNow: [jobId?: string];
  reloadExtension: [];
}>();

const stageRef = ref<HTMLElement | null>(null);
const liveSnapshot = ref<SchedulePeekSnapshot | null>(null);
const replayIndex = ref(0);
const playing = ref(true);
let replayTimer: ReturnType<typeof setInterval> | null = null;
let livePollTimer: ReturnType<typeof setInterval> | null = null;

const cursorPos = ref<{ x: number; y: number; visible: boolean }>({ x: 80, y: 80, visible: false });
const pulseKey = ref(0);

const currentSnapshot = computed<SchedulePeekSnapshot | null>(() => {
  if (props.mode === 'replay') {
    const frames = props.replayFrames || [];
    if (!frames.length) return null;
    return frames[Math.min(replayIndex.value, frames.length - 1)] || frames[0];
  }
  return liveSnapshot.value;
});

const displayTimeline = computed<string[]>(() => {
  const steps = currentSnapshot.value?.timelineSteps;
  if (Array.isArray(steps) && steps.length) return steps;
  return currentSnapshot.value?.cursorLabel ? [currentSnapshot.value.cursorLabel] : [];
});

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
    cursorPos.value = { x: Math.round(stageRect.width * 0.45), y: Math.round(stageRect.height * 0.4), visible: true };
    return;
  }
  const rect = target.getBoundingClientRect();
  const x = Math.max(16, Math.min(stageRect.width - 150, rect.left - stageRect.left + Math.min(rect.width * 0.36, 95)));
  const y = Math.max(16, Math.min(stageRect.height - 36, rect.top - stageRect.top + Math.min(rect.height * 0.45, 42)));
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
  }, 1100);
}

function togglePlay() {
  const frames = props.replayFrames || [];
  if (!frames.length) return;
  if (!playing.value && replayIndex.value >= frames.length - 1) {
    replayIndex.value = 0;
  }
  playing.value = !playing.value;
}

function applyLiveSnapshot(snap: SchedulePeekSnapshot | undefined) {
  if (!snap || (props.jobId && snap.jobId !== props.jobId)) return;
  const prev = liveSnapshot.value;
  if (
    prev &&
    prev.updatedAt === snap.updatedAt &&
    prev.phase === snap.phase &&
    prev.cursorTarget === snap.cursorTarget &&
    prev.cursorLabel === snap.cursorLabel &&
    prev.active === snap.active &&
    prev.activeRepoIndex === snap.activeRepoIndex &&
    (prev.timelineSteps?.length || 0) === (snap.timelineSteps?.length || 0)
  ) {
    return;
  }
  liveSnapshot.value = snap;
}

async function loadInitialLive() {
  if (props.mode !== 'live' || typeof chrome === 'undefined' || !chrome.storage?.local) return;
  try {
    const stored = await chrome.storage.local.get(AI_SCHEDULE_LIVE_PEEK_KEY);
    applyLiveSnapshot(stored?.[AI_SCHEDULE_LIVE_PEEK_KEY] as SchedulePeekSnapshot | undefined);
  } catch {}
}

function onStorageChanged(changes: any, area: string) {
  if (props.mode !== 'live' || area !== 'local' || !changes[AI_SCHEDULE_LIVE_PEEK_KEY]) return;
  applyLiveSnapshot(changes[AI_SCHEDULE_LIVE_PEEK_KEY].newValue as SchedulePeekSnapshot | undefined);
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
    }, 350);
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
  <div class="speek-overlay" @click.self="emit('close')">
    <section class="speek-window" role="dialog" aria-modal="true" aria-label="自动化任务实时窥屏监视器">
      <header class="speek-win-bar">
        <div class="speek-win-left">
          <span class="speek-status-badge" :class="{ live: mode === 'live' && currentSnapshot?.active }">
            <i class="speek-status-dot"></i>
            <span>{{ mode === 'live' ? (currentSnapshot?.active ? 'LIVE 实况窥屏' : '最近一次实况') : '历史轨迹回放' }}</span>
          </span>
          <strong>{{ currentSnapshot?.jobTitle || jobTitle || '自动化任务' }}</strong>
          <span v-if="currentSnapshot" class="speek-action-text">{{ currentSnapshot.cursorLabel }}</span>
        </div>
        <div class="speek-win-controls">
          <button
            v-if="mode === 'live' && jobId"
            type="button"
            class="speek-ctl-btn"
            :disabled="running || Boolean(currentSnapshot?.active)"
            @click="emit('runNow', jobId)"
          >
            {{ running || currentSnapshot?.active ? '执行中…' : '▶ 立即试跑' }}
          </button>
          <template v-if="mode === 'replay' && (replayFrames?.length || 0) > 1">
            <button type="button" class="speek-ctl-btn" @click="togglePlay">
              {{ playing ? '暂停' : (replayIndex >= (replayFrames?.length || 1) - 1 ? '重播' : '继续') }}
            </button>
            <span class="speek-step-count">{{ replayIndex + 1 }} / {{ replayFrames?.length }}</span>
          </template>
          <button type="button" class="speek-close-btn" aria-label="关闭监视器" @click="emit('close')">×</button>
        </div>
      </header>

      <div v-if="mode === 'live' && backendStale" class="speek-stale-bar" role="alert">
        <span>检测到扩展后台 `background.js` 尚未重载，实况窥屏需要重启后台后推送。</span>
        <button type="button" class="speek-ctl-btn" @click="emit('reloadExtension')">🔄 立即热重载扩展</button>
      </div>

      <div v-if="!currentSnapshot" class="speek-empty">
        <h3>暂无可展示的窥屏实况</h3>
        <p>点击上方或下方「立即试跑」，从连接 GitHub Trending、逐个打开仓库阅读 README 到总结出报告的每一步都会在这里实时上演。</p>
        <button
          v-if="mode === 'live' && jobId"
          type="button"
          class="speek-ctl-btn"
          style="margin-top: 12px;"
          :disabled="running"
          @click="emit('runNow', jobId)"
        >
          {{ running ? '执行中…' : '▶ 立即试跑' }}
        </button>
      </div>

      <div v-else class="speek-workspace">
        <!-- 左侧模拟浏览器 + GitHub 榜单阅读画布 -->
        <div ref="stageRef" class="speek-stage">
          <div class="sim-address-bar">
            <span class="sim-lock">GitHub · 自动化视野仿真</span>
            <span class="sim-url">
              {{
                currentSnapshot.activeRepo?.fullName
                  ? `github.com/${currentSnapshot.activeRepo.fullName}`
                  : currentSnapshot.kind === 'github-trending'
                    ? 'github.com/trending'
                    : 'workspace://automation'
              }}
            </span>
          </div>

          <div class="sim-body">
            <!-- 左侧榜单列表目录 -->
            <aside v-if="currentSnapshot.kind === 'github-trending'" class="sim-sidebar" data-peek-target="source">
              <div class="sim-side-head">
                <strong>今日榜单目录</strong>
                <small v-if="currentSnapshot.repos?.length">{{ currentSnapshot.repos.length }} 个</small>
              </div>
              <div v-if="!currentSnapshot.repos?.length" class="sim-side-loading">正在拉取排行榜…</div>
              <div v-else class="sim-repo-list">
                <div
                  v-for="(repo, idx) in currentSnapshot.repos"
                  :key="repo.fullName"
                  class="sim-repo-row"
                  :class="{ active: idx === currentSnapshot.activeRepoIndex, done: repo.status === 'done' }"
                  :data-peek-target="idx === currentSnapshot.activeRepoIndex ? 'repo-card' : undefined"
                >
                  <span class="sim-rank">#{{ repo.rank }}</span>
                  <div class="sim-repo-mini">
                    <div class="sim-repo-name" :title="repo.fullName">{{ repo.fullName.split('/')[1] || repo.fullName }}</div>
                    <div class="sim-repo-sub">
                      <span>{{ repo.language || 'Code' }}</span>
                      <span v-if="repo.todayStars">+{{ repo.todayStars }}★</span>
                    </div>
                  </div>
                  <span class="sim-state-mark">
                    {{ repo.status === 'done' ? '✓' : idx === currentSnapshot.activeRepoIndex ? '👁' : '·' }}
                  </span>
                </div>
              </div>
            </aside>

            <!-- 主工作画布：仓库详情 + README 实读 + AI 综合分析 -->
            <main class="sim-canvas">
              <template v-if="currentSnapshot.kind === 'github-trending'">
                <div v-if="currentSnapshot.activeRepo" class="sim-repo-banner">
                  <div class="sim-banner-top">
                    <strong>#{{ currentSnapshot.activeRepo.rank }} {{ currentSnapshot.activeRepo.fullName }}</strong>
                    <div class="sim-banner-stats">
                      <span v-if="currentSnapshot.activeRepo.language">{{ currentSnapshot.activeRepo.language }}</span>
                      <span>★ {{ currentSnapshot.activeRepo.stars }}</span>
                      <span v-if="currentSnapshot.activeRepo.todayStars" class="today">+{{ currentSnapshot.activeRepo.todayStars }} today</span>
                    </div>
                  </div>
                  <p class="sim-banner-desc">{{ currentSnapshot.activeRepo.description || '暂无官方简介' }}</p>
                </div>
                <div v-else class="sim-repo-banner placeholder">
                  <strong>{{ currentSnapshot.sourceLabel || '正在准备 GitHub 今日榜单' }}</strong>
                  <p class="sim-banner-desc">{{ currentSnapshot.cursorLabel }}</p>
                </div>

                <div class="sim-readme-box" data-peek-target="readme-panel">
                  <div class="sim-box-head">
                    <span>README.md 实读视窗</span>
                    <small v-if="currentSnapshot.activeRepo">
                      {{ currentSnapshot.activeRepo.readmeExcerpt ? '已读取正文' : '打开仓库主页…' }}
                    </small>
                  </div>
                  <pre class="sim-readme-pre">{{ currentSnapshot.activeRepo?.readmeExcerpt || '等待依次打开仓库并读取 README 说明…' }}</pre>
                </div>
              </template>

              <div
                class="sim-ai-box"
                :class="{ active: ['analyzing', 'saving', 'done'].includes(currentSnapshot.phase) }"
                data-peek-target="ai-panel"
              >
                <div class="sim-box-head">
                  <span>{{ currentSnapshot.provider === 'native-pi' ? '本机 Pi Agent 综合研判' : `${currentSnapshot.providerLabel || (currentSnapshot.provider === 'auto' ? '智能引擎' : 'DeepSeek')} 综合研判` }}</span>
                  <div class="sim-ai-badges">
                    <span
                      v-if="currentSnapshot.phase === 'saving' || currentSnapshot.phase === 'done'"
                      class="sim-chip save"
                      data-peek-target="library-save"
                    >
                      {{ currentSnapshot.phase === 'saving' ? '正在写入资料库…' : '✓ 已写入资料库' }}
                    </span>
                    <span
                      v-if="currentSnapshot.phase === 'done'"
                      class="sim-chip done"
                      data-peek-target="report-done"
                    >
                      ✓ 报告已完成
                    </span>
                  </div>
                </div>
                <p v-if="!currentSnapshot.reportPreview" class="sim-ai-status">
                  {{
                    currentSnapshot.phase === 'analyzing'
                      ? '正在结合刚才通读的所有 README 逐个评估价值并生成中文介绍报告…'
                      : currentSnapshot.phase === 'error'
                        ? currentSnapshot.cursorLabel
                        : '将在通读完所有候选仓库后，统一对比筛选并撰写详细介绍…'
                  }}
                </p>
                <pre v-else class="sim-report-preview">{{ currentSnapshot.reportPreview }}</pre>
              </div>
            </main>
          </div>

          <!-- 仿真 AI 鼠标指针 -->
          <div
            v-if="cursorPos.visible"
            class="speek-cursor"
            :style="{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }"
          >
            <span :key="pulseKey" class="speek-cursor-ripple"></span>
            <svg class="speek-cursor-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 3.5l14.5 7.2-6.2 1.8-3.1 5.9L4.5 3.5z" fill="#6366f1" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round" />
            </svg>
            <span class="speek-cursor-tag">{{ currentSnapshot.cursorLabel }}</span>
          </div>
        </div>

        <!-- 右侧轨迹步数时间轴 -->
        <aside class="speek-timeline" aria-label="行为时间轴">
          <div class="speek-tl-head">AI 行为时间轴</div>
          <div v-if="mode === 'replay' && replayFrames?.length" class="speek-tl-list">
            <button
              v-for="(frame, idx) in replayFrames"
              :key="idx"
              type="button"
              class="speek-tl-item"
              :class="{ active: idx === replayIndex, done: idx < replayIndex }"
              @click="replayIndex = idx; playing = false"
            >
              <span class="speek-tl-idx">{{ idx + 1 }}</span>
              <span class="speek-tl-label">{{ frame.cursorLabel }}</span>
            </button>
          </div>
          <div v-else class="speek-tl-list">
            <div
              v-for="(label, li) in displayTimeline"
              :key="`tl-${li}`"
              class="speek-tl-item"
              :class="li === displayTimeline.length - 1 ? 'active' : 'done'"
            >
              <span class="speek-tl-idx">{{ li === displayTimeline.length - 1 && currentSnapshot.active ? '•' : li + 1 }}</span>
              <span class="speek-tl-label">{{ label }}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.speek-overlay {
  position: fixed;
  inset: 0;
  z-index: 2100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
}
.speek-window {
  width: min(1060px, 100%);
  height: min(680px, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.34);
}
.speek-win-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, #6366f1 4%, var(--panel, #ffffff));
}
.speek-win-left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
.speek-status-badge {
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
.speek-status-badge.live { background: rgba(16, 185, 129, 0.14); color: #059669; }
.speek-status-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.speek-status-badge.live .speek-status-dot { animation: speek-pulse 1.3s ease-in-out infinite; }
@keyframes speek-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.8); }
}
.speek-action-text { font-size: 12px; color: #4f46e5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.speek-win-controls { display: flex; align-items: center; gap: 8px; }
.speek-ctl-btn {
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
.speek-ctl-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.speek-step-count { font-size: 11.5px; color: var(--muted, #64748b); font-variant-numeric: tabular-nums; }
.speek-close-btn {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 18px;
  cursor: pointer;
}
.speek-close-btn:hover { background: var(--surface, #f1f5f9); color: var(--heading, #0f172a); }
.speek-stale-bar {
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
.speek-empty { margin: auto; max-width: 440px; padding: 36px 24px; text-align: center; color: var(--muted, #64748b); }
.speek-empty h3 { margin: 0 0 8px; color: var(--heading, #0f172a); }
.speek-empty p { margin: 0; font-size: 12.5px; line-height: 1.65; }
.speek-workspace { flex: 1; min-height: 0; display: flex; }
.speek-stage {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: var(--background, #f6f8fc);
  overflow: hidden;
}
.sim-address-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  background: var(--surface, #eef2f7);
  border-bottom: 1px solid var(--border, #dfe4ee);
  font-size: 11.5px;
}
.sim-lock { color: #059669; font-weight: 600; }
.sim-url {
  flex: 1;
  padding: 3px 10px;
  border-radius: 7px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, #dfe4ee);
  color: var(--muted, #475569);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sim-body { flex: 1; min-height: 0; display: flex; overflow: hidden; }
.sim-sidebar {
  width: 220px;
  flex: none;
  padding: 10px;
  border-right: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}
.sim-side-head { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--muted, #64748b); }
.sim-side-head strong { color: var(--heading, #0f172a); }
.sim-side-loading { font-size: 11.5px; color: var(--muted, #94a3b8); padding: 8px 4px; }
.sim-repo-list { display: flex; flex-direction: column; gap: 5px; }
.sim-repo-row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid var(--border, #e5e8ef);
  background: var(--panel, #ffffff);
  font-size: 11.5px;
  transition: all 0.18s ease;
}
.sim-repo-row.done { background: rgba(16, 185, 129, 0.06); border-color: rgba(16, 185, 129, 0.25); }
.sim-repo-row.active { border-color: #6366f1; background: rgba(99, 102, 241, 0.1); box-shadow: 0 2px 8px rgba(99, 102, 241, 0.14); }
.sim-rank { font-size: 10.5px; font-weight: 700; color: #4f46e5; min-width: 20px; }
.sim-repo-mini { flex: 1; min-width: 0; }
.sim-repo-name { font-weight: 600; color: var(--heading, #0f172a); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sim-repo-sub { display: flex; gap: 6px; font-size: 10px; color: var(--muted, #64748b); }
.sim-state-mark { font-size: 11px; color: var(--muted, #94a3b8); }
.sim-repo-row.done .sim-state-mark { color: #059669; font-weight: 700; }

.sim-canvas {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}
.sim-repo-banner {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
}
.sim-banner-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.sim-banner-top strong { font-size: 13px; color: var(--heading, #0f172a); }
.sim-banner-stats { display: flex; gap: 8px; font-size: 11px; color: var(--muted, #64748b); }
.sim-banner-stats .today { color: #d97706; font-weight: 600; }
.sim-banner-desc { margin: 4px 0 0; font-size: 12px; color: var(--text, #334155); line-height: 1.45; }

.sim-readme-box,
.sim-ai-box {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  overflow: hidden;
}
.sim-readme-box { flex: 1.2; min-height: 0; }
.sim-ai-box { flex: 0.9; min-height: 0; transition: border-color 0.2s ease; }
.sim-ai-box.active { border-color: rgba(99, 102, 241, 0.45); box-shadow: 0 2px 10px rgba(99, 102, 241, 0.08); }
.sim-box-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 11px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  background: var(--surface, #f8fafc);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}
.sim-box-head small { font-weight: 400; color: var(--muted, #64748b); }
.sim-ai-badges { display: flex; gap: 6px; }
.sim-chip { padding: 1px 7px; border-radius: 999px; font-size: 10.5px; font-weight: 600; }
.sim-chip.save { background: rgba(14, 165, 233, 0.14); color: #0284c7; }
.sim-chip.done { background: rgba(16, 185, 129, 0.15); color: #059669; }

.sim-readme-pre,
.sim-report-preview {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0;
  padding: 10px 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11.5px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--text, #334155);
}
.sim-ai-status { margin: 12px; font-size: 12px; color: var(--muted, #64748b); line-height: 1.55; }

.speek-cursor {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 25;
  pointer-events: none;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
}
.speek-cursor-arrow { width: 22px; height: 22px; filter: drop-shadow(0 3px 6px rgba(15, 23, 42, 0.28)); }
.speek-cursor-ripple {
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #6366f1;
  animation: speek-ripple 0.65s ease-out forwards;
}
@keyframes speek-ripple {
  0% { transform: scale(0.4); opacity: 0.9; }
  100% { transform: scale(2.1); opacity: 0; }
}
.speek-cursor-tag {
  margin-top: 14px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.86);
  color: #ffffff;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.22);
}

.speek-timeline {
  width: 245px;
  flex: none;
  border-left: 1px solid var(--border, #e5e8ef);
  background: var(--panel, #ffffff);
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.speek-tl-head {
  padding: 11px 13px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  font-size: 12px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}
.speek-tl-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.speek-tl-item {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  width: 100%;
  padding: 7px 8px;
  border-radius: 8px;
  border: 1px solid var(--border, #e5e8ef);
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  font: inherit;
  font-size: 11.5px;
  text-align: left;
  cursor: pointer;
}
.speek-tl-item.done { opacity: 0.85; }
.speek-tl-item.active {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
  color: #4338ca;
  font-weight: 600;
}
.speek-tl-idx {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.14);
  color: #4f46e5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  flex: none;
}
.speek-tl-label { flex: 1; line-height: 1.38; word-break: break-word; }
</style>
