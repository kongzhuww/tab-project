<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from "vue";
import { homeMusicState, homeMusicController } from "../music/store";
import { windowManagerController } from "../core/window-manager.store";
import { cubeRegistryStore } from "../cube/cube-registry.store";
import CubeConfigDialog from "../cube/CubeConfigDialog.vue";
import { useContextMenu } from "../core/useContextMenu";
import { notifications } from "../sdk/notifications";
import { musicModuleState } from "../music/module-state";
import { togetherPartyState } from "../chat/together-listen.store";

const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });

const isPartyOrConsoleActive = computed(() => {
  return musicModuleState.visible || togetherPartyState.djModalOpen || (togetherPartyState.isActive && togetherPartyState.isJoined);
});

const isTogetherListening = computed(() => {
  return togetherPartyState.isActive && togetherPartyState.isJoined;
});

const activeFaces = computed(() => cubeRegistryStore.getActiveFaces());
const activeFaceId = ref<string>("music");
const cubeRotation = ref<number>(0);
let wheelLocked = false;
let wheelTimeout: ReturnType<typeof setTimeout> | undefined;

// 确保 activeFaceId 始终指向有效已启用的面
watch(
  () => activeFaces.value,
  (faces) => {
    if (!faces.some(f => f.id === activeFaceId.value)) {
      activeFaceId.value = faces[0]?.id || "";
    }
  },
  { immediate: true }
);

// 提取当前启用的自定义面板列表
const customActiveFaces = computed(() => {
  return activeFaces.value.filter(f => !f.builtIn);
});

// 右键上下文菜单状态
const contextMenuVisible = ref(false);
const contextMenuPos = ref({ x: 0, y: 0 });
// Keep the home face/rotation, but suspend home-only UI when another workspace opens.
watch(() => props.active, active => {
  if (active) return;
  contextMenuVisible.value = false;
  cubeRegistryStore.closeConfigDialog();
  clearTimeout(wheelTimeout);
  wheelLocked = false;
}, { immediate: true });
const { menuRef, style: menuStyle } = useContextMenu({
  visible: () => contextMenuVisible.value,
  anchor: () => contextMenuPos.value,
  dismiss: () => { contextMenuVisible.value = false; }
});

function onContextMenu(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  contextMenuPos.value = { x: event.clientX, y: event.clientY };
  contextMenuVisible.value = true;
}

function selectFaceFromMenu(faceId: string) {
  setTopCubeFace(faceId);
  contextMenuVisible.value = false;
}

function openConfigFromMenu() {
  contextMenuVisible.value = false;
  cubeRegistryStore.openConfigDialog();
}

function resetDefaultsFromMenu() {
  contextMenuVisible.value = false;
  runCubeAction(() => cubeRegistryStore.resetDefaults());
  setTopCubeFace("music");
}

function runCubeAction(action: () => void) {
  contextMenuVisible.value = false;
  try { action(); } catch (e) {
    notifications.show({ appName: "滚动立方体", title: "保存失败", message: e instanceof Error ? e.message : "请检查浏览器存储" });
  }
}

function formatCountdownDays(dateStr?: string): string {
  if (!dateStr) return "未设置目标日";
  const target = new Date(dateStr).getTime();
  const diffMs = target - nowTs.value;
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (days > 0) return `还剩 ${days} 天`;
  if (days === 0) return `就是今天！`;
  return `已过去 ${Math.abs(days)} 天`;
}

// 1. Music Face State
const musicSourceText = computed(() => {
  if (homeMusicState.isBiliRadio) return "B站电台";
  if (homeMusicState.isNetease) return "网易云";
  if (homeMusicState.playing) return "塞壬";
  return "待机";
});

const displayLyric = computed(() => {
  if (homeMusicState.currentLyric) return homeMusicState.currentLyric;
  if (homeMusicState.playing) return "♪ 伴奏播放中…";
  return "选择塞壬歌曲、网易云或B站电台后在这里显示歌词";
});

function openMusicPicker() {
  if (homeMusicState.isNetease) {
    windowManagerController.handleToolClick("music");
  } else {
    windowManagerController.handleToolClick("siren");
  }
}

const nowTs = ref(Date.now());
let countdownInterval: number | undefined;
watch(() => props.active && activeFaces.value.some(f => f.id === activeFaceId.value && f.customType === "countdown"), (enabled) => {
  if (enabled) nowTs.value = Date.now();
  clearInterval(countdownInterval);
  countdownInterval = enabled ? window.setInterval(() => { if (!document.hidden) nowTs.value = Date.now(); }, 60000) : undefined;
}, { immediate: true });

// Cube Rotation and Face Selection
function setTopCubeFace(faceId: string, requestedRotation: number | null = null) {
  const list = activeFaces.value;
  const target = list.find(f => f.id === faceId) || list[0];
  if (!target) return;

  if (Number.isFinite(requestedRotation)) {
    cubeRotation.value = requestedRotation!;
  } else if (target.id !== activeFaceId.value) {
    const currentIndex = list.findIndex(f => f.id === activeFaceId.value);
    const nextIndex = list.findIndex(f => f.id === target.id);
    let delta = (nextIndex - currentIndex + list.length) % list.length;
    if (delta > list.length / 2) delta -= list.length;
    cubeRotation.value += delta * 90;
  }
  activeFaceId.value = target.id;
}

function stepTopCubeFace(step: number) {
  const list = activeFaces.value;
  if (list.length <= 1) return;
  const currentIndex = list.findIndex(f => f.id === activeFaceId.value);
  const safeCurrent = currentIndex >= 0 ? currentIndex : 0;
  const nextIndex = (safeCurrent + step + list.length) % list.length;
  const nextFace = list[nextIndex];
  if (nextFace) {
    setTopCubeFace(nextFace.id, cubeRotation.value + step * 90);
  }
}

function onWheel(event: WheelEvent) {
  if (activeFaces.value.length <= 1 || event.altKey || Math.abs(event.deltaY) < 2) return;
  event.preventDefault();
  if (wheelLocked) return;
  wheelLocked = true;
  stepTopCubeFace(event.deltaY > 0 ? 1 : -1);
  wheelTimeout = setTimeout(() => { wheelLocked = false; }, 420);
}

function onKeydown(event: KeyboardEvent) {
  if (!["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(event.key) || (event.target as HTMLElement)?.closest?.("input")) return;
  event.preventDefault();
  stepTopCubeFace(["ArrowDown", "PageDown"].includes(event.key) ? 1 : -1);
}

function getActiveFaceTransform(faceId: string, defaultAngleDeg: number) {
  if (activeFaceId.value === faceId) {
    return {
      transform: `rotateX(${-cubeRotation.value}deg) translateZ(22px)`,
      visibility: "visible" as const
    };
  }
  return {
    transform: `rotateX(-${defaultAngleDeg}deg) translateZ(22px)`,
    visibility: "hidden" as const
  };
}

function onCubeCopy(e: ClipboardEvent) {
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
}

function onCubeSelectStart(e: Event) {
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
    return;
  }
  e.preventDefault();
}

onUnmounted(() => {
  clearInterval(countdownInterval);
  clearTimeout(wheelTimeout);
});
</script>

<template>
    <div
      v-show="props.active"
      class="ms-top-player"
      :data-face="activeFaceId"
      tabindex="0"
      title="滚动立方体 · 滚轮切换面板，右键可自由增删与排序"
      aria-label="滚动立方体"
      @wheel="onWheel"
      @keydown="onKeydown"
      @contextmenu="onContextMenu"
      @copy="onCubeCopy"
      @selectstart="onCubeSelectStart"
    >
      <button v-if="!activeFaces.length" type="button" class="ms-cube-cm-action" @click="openConfigFromMenu">＋ 添加面（右键管理）</button>
      <div
        class="ms-top-cube"
        :style="{ transform: `translateZ(-22px) rotateX(${cubeRotation}deg)` }"
      >
        <!-- 内置面 1: 音乐歌词面 -->
        <section
          v-if="cubeRegistryStore.isActive('music') && activeFaceId === 'music'"
          class="ms-top-face ms-top-face-music"
          aria-label="音乐歌词面"
          :style="getActiveFaceTransform('music', 0)"
        >
          <div class="ms-top-side">
            <button class="ms-top-prev" title="上一首" type="button" @click.stop="homeMusicController.prev()">⏮</button>
            <button class="ms-top-play" title="播放/暂停" type="button" @click.stop="homeMusicController.togglePlay()">
              {{ homeMusicState.playing ? "⏸" : "▶" }}
            </button>
          </div>
          <button class="ms-top-main" title="打开音乐播放器" type="button" @click.stop="openMusicPicker">
            <!-- 降级模式：当工作区/调音台打开或一起听时，收敛为醒目极简状态，停止深层 Diff -->
            <template v-if="isPartyOrConsoleActive">
              <div class="ms-top-meta">
                <span class="ms-top-title" style="color: #10b981; font-weight: 700;">
                  🎧 {{ isTogetherListening ? '正在一起听' : '正在收听' }}：{{ homeMusicState.title || "待机中" }}
                </span>
                <span class="ms-top-artist">{{ homeMusicState.artist }}</span>
              </div>
            </template>
            <template v-else>
              <div class="ms-top-meta">
                <span class="ms-top-title" :title="homeMusicState.title || '音乐播放器'">{{ homeMusicState.title || "音乐播放器" }}</span>
                <span class="ms-top-artist" :title="homeMusicState.artist || '待机中'">{{ homeMusicState.artist || "待机中" }}</span>
                <span class="ms-top-source" :class="{ idle: !homeMusicState.playing }">{{ musicSourceText }}</span>
                <span v-if="displayLyric" class="ms-top-divider"></span>
              </div>
              <span v-if="displayLyric" class="ms-top-lyric" :title="displayLyric">{{ displayLyric }}</span>
            </template>
            <!-- 仅百分比驱动微型进度指示条 -->
            <div class="ms-top-mini-progress">
              <div class="ms-top-mini-fill" :style="{ width: homeMusicState.progressPercent + '%' }"></div>
            </div>
          </button>
          <div class="ms-top-side">
            <button class="ms-top-next" title="下一首" type="button" @click.stop="homeMusicController.next()">⏭</button>
            <button class="ms-top-open" title="打开歌单" type="button" @click.stop="openMusicPicker">🎵</button>
          </div>
        </section>

        <!-- 自定义扩展面板渲染 -->
        <section
          v-for="(face, idx) in customActiveFaces"
          :key="face.id"
          class="ms-top-face ms-top-face-custom"
          :aria-label="face.title"
          :style="getActiveFaceTransform(face.id, (idx + 1) * 90)"
        >
          <div v-if="activeFaceId === face.id" class="ms-cube-custom-body" :title="face.desc">
            <span class="ms-cube-custom-icon">{{ face.icon }}</span>
            <strong class="ms-cube-custom-title">{{ face.title }}</strong>
            <span class="ms-cube-divider"></span>
            <!-- 便签 -->
            <span v-if="face.customType === 'memo'" class="ms-cube-custom-text" :title="face.customData?.text">
              {{ face.customData?.text || "（点击右键配置便签内容）" }}
            </span>
            <!-- 倒数日 -->
            <span v-else-if="face.customType === 'countdown'" class="ms-cube-custom-text countdown">
              {{ formatCountdownDays(face.customData?.targetDate) }}
            </span>
            <!-- 快捷链接 -->
            <a
              v-else-if="face.customType === 'link'"
              :href="face.customData?.url"
              target="_blank"
              rel="noreferrer"
              class="ms-cube-custom-link"
              @click.stop
            >
              {{ face.customData?.url }} ↗
            </a>
          </div>
          <button
            type="button"
            class="ms-cube-config-trigger"
            title="管理立方体面"
            @click.stop="cubeRegistryStore.openConfigDialog()"
          >
            ⚙
          </button>
        </section>
      </div>

      <!-- 动态状态指示点 -->
      <div class="ms-cube-dots" aria-hidden="true">
        <i
          v-for="face in activeFaces"
          :key="face.id"
          :class="{ on: activeFaceId === face.id }"
          :title="face.title"
          @click.stop="setTopCubeFace(face.id)"
        ></i>
      </div>

      <!-- 菜单脱离含 perspective 的立方体祖先，使用视口坐标。 -->
      <Teleport to="body">
      <div
        ref="menuRef"
        v-if="props.active && contextMenuVisible"
        class="ms-cube-context-menu"
        :style="menuStyle"
        @click.stop
      >
        <div class="ms-cube-cm-header">
          <span>🎲 滚动立方体面</span>
          <button type="button" class="ms-cube-cm-close" @click="contextMenuVisible = false">×</button>
        </div>

        <div class="ms-cube-cm-list">
          <button
            v-for="face in activeFaces"
            :key="face.id"
            type="button"
            class="ms-cube-cm-item"
            :class="{ active: activeFaceId === face.id }"
            @click="selectFaceFromMenu(face.id)"
          >
            <span class="ms-cube-cm-icon">{{ face.icon }}</span>
            <span class="ms-cube-cm-title">{{ face.title }}</span>
            <span v-if="activeFaceId === face.id" class="ms-cube-cm-check">✓</span>
          </button>
        </div>

        <div class="ms-cube-cm-divider"></div>

        <button type="button" class="ms-cube-cm-action" @click="openConfigFromMenu">
          <span>＋ 添加面 / 管理面</span>
        </button>
        <button type="button" class="ms-cube-cm-action" @click="stepTopCubeFace(-1); contextMenuVisible = false">
          <span>⏮ 上一个面板</span>
        </button>
        <button type="button" class="ms-cube-cm-action" @click="stepTopCubeFace(1); contextMenuVisible = false">
          <span>⏭ 下一个面板</span>
        </button>
        <button v-if="activeFaceId" type="button" class="ms-cube-cm-action danger" @click="runCubeAction(() => cubeRegistryStore.removeCustomFace(activeFaceId))">删除当前面</button>
        <button type="button" class="ms-cube-cm-action danger" @click="resetDefaultsFromMenu">
          <span>↺ 恢复默认（仅音乐）</span>
        </button>
      </div>

      </Teleport>
      <!-- 全局立方体客制化设置弹窗 -->
      <CubeConfigDialog v-if="props.active" />
    </div>
</template>

<style scoped>
.ms-top-player {
  position: relative !important;
  flex: 0 1 680px !important;
  max-width: min(720px, 42vw) !important;
  min-width: 220px !important;
  height: 38px !important;
  margin: 4px auto 0 8px !important;
  align-self: center !important;
  transition: max-width 0.2s ease, width 0.2s ease;
  user-select: none;
}

/* 彻底解决音乐面按钮和文字偏下问题：绝对几何中心对齐 */
:deep(.ms-top-face),
.ms-top-face {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 38px !important;
  box-sizing: border-box !important;
  padding: 0 5px !important;
  overflow: hidden !important;
}

:deep(.ms-top-side),
.ms-top-side {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  height: 100% !important;
  flex-shrink: 0 !important;
}

:deep(.ms-top-side button),
.ms-top-side button {
  display: grid !important;
  place-items: center !important;
  width: 28px !important;
  height: 28px !important;
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 999px !important;
  font-size: 11.5px !important;
  line-height: 1 !important;
  align-self: center !important;
}

:deep(.ms-top-main),
.ms-top-main {
  position: relative !important;
  min-width: 0 !important;
  height: 30px !important;
  margin: 0 !important;
  padding: 0 8px !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: transparent !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  text-align: left !important;
  cursor: pointer !important;
  flex: 1 1 auto !important;
  align-self: center !important;
}

:deep(.ms-top-meta),
.ms-top-meta {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
}

:deep(.ms-top-title),
:deep(.ms-top-artist),
:deep(.ms-top-source),
:deep(.ms-top-lyric),
.ms-top-title,
.ms-top-artist,
.ms-top-source,
.ms-top-lyric {
  line-height: 1.2 !important;
}

/* 自定义面样式 */
.ms-top-face-custom {
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  color: var(--text, #0f172a);
}

.ms-cube-custom-body {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  padding: 0 4px;
}

.ms-cube-custom-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.ms-cube-custom-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text, #0f172a);
  flex-shrink: 0;
}

.ms-cube-custom-text {
  font-size: 12px;
  color: var(--muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.ms-cube-custom-text.countdown {
  font-weight: 700;
  color: var(--accent, #6366f1);
}

.ms-cube-custom-link {
  font-size: 11px;
  color: var(--accent, #6366f1);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ms-cube-custom-link:hover {
  text-decoration: underline;
}

.ms-cube-config-trigger {
  background: transparent;
  border: none;
  font-size: 13px;
  cursor: pointer;
  color: var(--muted, #64748b);
  padding: 4px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.ms-cube-config-trigger:hover {
  background: var(--surface, rgba(0, 0, 0, 0.05));
  color: var(--text, #0f172a);
}

/* 右键上下文菜单 */
.ms-cube-context-menu {
  position: fixed;
  z-index: 999999;
  width: 220px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.14));
  border-radius: 10px;
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  padding: 6px;
  box-sizing: border-box;
  animation: cm-fade 0.15s ease;
}

@keyframes cm-fade {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.ms-cube-cm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px 4px 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted, #64748b);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  margin-bottom: 4px;
}

.ms-cube-cm-close {
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 0 2px;
}

.ms-cube-cm-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ms-cube-cm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  color: var(--text, #0f172a);
  cursor: pointer;
  text-align: left;
  transition: all 0.12s ease;
}

.ms-cube-cm-item:hover {
  background: var(--surface, rgba(0, 0, 0, 0.06));
}

.ms-cube-cm-item.active {
  background: rgba(99, 102, 241, 0.12);
  color: var(--accent, #6366f1);
  font-weight: 600;
}

.ms-cube-cm-icon {
  font-size: 14px;
}

.ms-cube-cm-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ms-cube-cm-check {
  font-size: 11px;
  font-weight: 700;
}

.ms-cube-cm-divider {
  height: 1px;
  background: var(--border, rgba(0, 0, 0, 0.08));
  margin: 4px 0;
}

.ms-cube-cm-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  color: var(--text, #0f172a);
  cursor: pointer;
  text-align: left;
  transition: all 0.12s ease;
}

.ms-cube-cm-action:hover {
  background: var(--surface, rgba(0, 0, 0, 0.06));
}

.ms-cube-cm-action.danger {
  color: var(--muted, #64748b);
  font-size: 11px;
}

.ms-cube-cm-action.danger:hover {
  color: #ef4444;
}

/* 指示点支持点击 */
.ms-cube-dots i {
  cursor: pointer;
  pointer-events: auto !important;
}

/* 小屏幕自适应优雅退让（小电脑模式） */
@media (max-width: 1366px) {
  .ms-top-player {
    min-width: 160px !important;
    max-width: min(480px, 36vw) !important;
  }
}

@media (max-width: 1080px) {
  .ms-top-player {
    min-width: 140px !important;
    max-width: 320px !important;
  }
}

/* 顶部微型百分比进度线 */
.ms-top-mini-progress {
  position: absolute;
  bottom: 0;
  left: 6px;
  right: 6px;
  height: 2px;
  background: transparent;
  overflow: hidden;
  border-radius: 1px;
}
.ms-top-mini-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.25s linear;
}
</style>
