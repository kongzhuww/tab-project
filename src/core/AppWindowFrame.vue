<template>
  <section
    :id="id || `${windowId}-workspace`"
    ref="panelRef"
    class="lw-window-frame"
    :class="[
      customClass,
      {
        'is-active': isActive,
        'workspace-focused': isActive,
        'is-dragging': isDragging,
        'is-resizing': isResizing,
        'is-maximized': isMaximized
      }
    ]"
    :style="[customStyle, initialStyle]"
    v-show="visible && !isLocallyClosed"
    :aria-label="title"
    @pointerdown="handlePanelPointerDown"
  >
    <!-- 统一窗口标题栏 -->
    <header
      ref="headerRef"
      class="lw-window-header ms-drag-handle"
      @pointerdown="onHeaderPointerDown"
      @dblclick="onHeaderDblClick"
    >
      <div class="lw-window-header-left">
        <slot name="title">
          <img
            v-if="icon && (icon.includes('/') || icon.endsWith('.png') || icon.endsWith('.svg'))"
            :src="icon"
            class="lw-window-icon-img"
            alt=""
          />
          <span v-else-if="icon" class="lw-window-icon" aria-hidden="true">{{ icon }}</span>
          <h2 class="lw-window-title">{{ title }}</h2>
        </slot>
        <slot name="header-left" />
      </div>

      <div class="lw-window-header-center">
        <slot name="header-center" />
      </div>

      <div class="lw-window-header-right">
        <slot name="header-actions" />
        <slot name="window-controls">
          <div class="lw-window-controls">
            <button
              v-if="showMinimize"
              type="button"
              class="lw-win-btn lw-win-minimize"
              title="最小化"
              aria-label="最小化窗口"
              @click.stop="handleMinimize"
            >
              −
            </button>
            <button
              v-if="showMaximize && resizable"
              type="button"
              class="lw-win-btn lw-win-maximize"
              :title="isMaximized ? '向下还原' : '最大化'"
              aria-label="最大化或还原窗口"
              @click.stop="toggleMaximize"
            >
              {{ isMaximized ? '❐' : '□' }}
            </button>
            <button
              v-if="showClose"
              type="button"
              class="lw-win-btn lw-win-close"
              title="关闭窗口"
              aria-label="关闭窗口"
              @click.stop="handleClose"
            >
              ✕
            </button>
          </div>
        </slot>
      </div>
    </header>

    <!-- 窗口主内容区 (带 Error Boundary 崩溃保护) -->
    <div class="lw-window-body">
      <div v-if="hasRenderError" class="lw-window-error-boundary">
        <div class="lw-error-card">
          <span class="lw-error-icon">⚠️</span>
          <h3 class="lw-error-title">{{ title }} 遇到了局部渲染错误</h3>
          <p class="lw-error-desc">已自动拦截异常，主屏与其他窗口运行正常。</p>
          <div class="lw-error-details">
            <code>{{ renderErrorMessage }}</code>
          </div>
          <div class="lw-error-actions">
            <button type="button" class="lw-error-btn primary" @click="resetError">
              🔄 尝试恢复运行
            </button>
            <button type="button" class="lw-error-btn secondary" @click="handleClose">
              关闭此窗口
            </button>
          </div>
        </div>
      </div>
      <slot v-else />
    </div>

    <!-- 可选窗口底部区域 -->
    <footer v-if="$slots.footer" class="lw-window-footer">
      <slot name="footer" />
    </footer>

    <!-- 8向拖拽缩放手柄（当启用且非最大化时） -->
    <template v-if="resizable && !isMaximized">
      <i class="lw-resize-edge lw-resize-n" @pointerdown.stop="onResizePointerDown($event, 'n')" />
      <i class="lw-resize-edge lw-resize-e" @pointerdown.stop="onResizePointerDown($event, 'e')" />
      <i class="lw-resize-edge lw-resize-s" @pointerdown.stop="onResizePointerDown($event, 's')" />
      <i class="lw-resize-edge lw-resize-w" @pointerdown.stop="onResizePointerDown($event, 'w')" />
      <i class="lw-resize-corner lw-resize-se" @pointerdown.stop="onResizePointerDown($event, 'se')" />
      <i class="lw-resize-corner lw-resize-sw" @pointerdown.stop="onResizePointerDown($event, 'sw')" />
      <i class="lw-resize-corner lw-resize-ne" @pointerdown.stop="onResizePointerDown($event, 'ne')" />
      <i class="lw-resize-corner lw-resize-nw" @pointerdown.stop="onResizePointerDown($event, 'nw')" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onErrorCaptured, watch } from "vue";
import { useWindowDraggable } from "./useWindowDraggable";
import { windowManagerController, windowManagerState } from "./window-manager.store";

const props = withDefaults(
  defineProps<{
    windowId: string;
    id?: string;
    title: string;
    icon?: string;
    visible?: boolean;
    defaultWidth?: number;
    defaultHeight?: number;
    minWidth?: number;
    minHeight?: number;
    resizable?: boolean;
    showMinimize?: boolean;
    showMaximize?: boolean;
    showClose?: boolean;
    customClass?: string;
    customStyle?: Record<string, string>;
    storageKey?: string;
  }>(),
  {
    visible: true,
    defaultWidth: 840,
    defaultHeight: 580,
    minWidth: 380,
    minHeight: 260,
    resizable: true,
    showMinimize: true,
    showMaximize: true,
    showClose: true
  }
);

const emit = defineEmits<{
  (e: "minimize"): void;
  (e: "close"): void;
  (e: "activate"): void;
}>();

const {
  panelRef,
  headerRef,
  initialStyle,
  isDragging,
  isResizing,
  isMaximized,
  bringToFront,
  restoreSavedPosition,
  onHeaderPointerDown,
  onResizePointerDown,
  toggleMaximize
} = useWindowDraggable({
  windowId: props.windowId,
  storageKey: props.storageKey,
  defaultWidth: props.defaultWidth,
  defaultHeight: props.defaultHeight,
  minWidth: props.minWidth,
  minHeight: props.minHeight,
  resizable: props.resizable,
  onFocus: () => {
    emit("activate");
  }
});

const isActive = computed(() => {
  return windowManagerState.activeId === props.windowId;
});

function handlePanelPointerDown() {
  bringToFront();
}

function onHeaderDblClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target || target.closest("button, a, input, select, textarea, [draggable='true']")) return;
  if (props.resizable && props.showMaximize) {
    toggleMaximize();
  }
}

function handleMinimize() {
  emit("minimize");
  windowManagerController.minimize(props.windowId);
}

const isLocallyClosed = ref(false);

const hasRenderError = ref(false);
const renderErrorMessage = ref("");

onErrorCaptured((err: any, instance: any, info: string) => {
  console.error(`[AppWindowFrame:${props.windowId}] 捕获到组件内部错误:`, err, info);
  hasRenderError.value = true;
  renderErrorMessage.value = err?.message || String(err) || "未知渲染异常";
  // 返回 false 阻止错误继续向上传播击穿全局 Vue 实例
  return false;
});

function resetError() {
  hasRenderError.value = false;
  renderErrorMessage.value = "";
}

function handleClose() {
  // 1. 0ms 乐观瞬间消失：视窗在鼠标松开瞬间立即不可见！
  isLocallyClosed.value = true;
  if (panelRef.value) {
    panelRef.value.style.display = "none";
  }

  // 2. 后台异步执行清理与事件派发，绝不阻塞用户感知！
  emit("close");
  void windowManagerController.close(props.windowId);
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      isLocallyClosed.value = false;
      if (panelRef.value) {
        panelRef.value.style.display = "";
      }
      bringToFront();
      restoreSavedPosition();
    }
  }
);

const getWindowElement = () => panelRef.value;
onMounted(() => {
  windowManagerController.register({
    id: props.windowId,
    title: props.title,
    icon: props.icon,
    getElement: getWindowElement,
    onActivate: () => {
      emit("activate");
      bringToFront();
    },
    onMinimize: () => {
      handleMinimize();
    },
    onClose: () => {
      handleClose();
      return true;
    }
  });

  if (props.visible) {
    restoreSavedPosition();
  }
});

onUnmounted(() => {
  windowManagerController.unregister(props.windowId, getWindowElement);
});

defineExpose({
  panelRef,
  bringToFront,
  restoreSavedPosition,
  toggleMaximize
});
</script>

<style scoped>
.lw-window-frame {
  position: fixed;
  z-index: 60;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: var(--panel, rgba(28, 28, 35, 0.95));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  color: var(--text, #f1f5f9);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  box-sizing: border-box;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.lw-window-frame.is-active,
.lw-window-frame.workspace-focused {
  border-color: rgba(244, 63, 94, 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(244, 63, 94, 0.25);
}

.lw-window-frame.is-dragging {
  will-change: left, top;
  user-select: none !important;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65) !important;
}

.lw-window-frame.is-maximized {
  border-radius: 0 !important;
  border: none !important;
}

/* 统一头部 */
.lw-window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  height: 44px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  cursor: grab;
  touch-action: none;
  user-select: none;
  flex-shrink: 0;
}

.lw-window-frame.is-dragging .lw-window-header {
  cursor: grabbing;
}

.lw-window-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-shrink: 0;
}

.lw-window-icon {
  font-size: 15px;
  line-height: 1;
}

.lw-window-icon-img {
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.lw-window-title {
  margin: 0;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text, #f1f5f9);
}

.lw-window-header-center {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}

.lw-window-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 控制按钮 */
.lw-window-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 4px;
}

.lw-win-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted, #94a3b8);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 0;
  line-height: 1;
}

.lw-win-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text, #f1f5f9);
}

.lw-win-close:hover {
  background: #ef4444 !important;
  color: #ffffff !important;
}

/* 内容主体 */
.lw-window-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.lw-window-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  background: rgba(0, 0, 0, 0.15);
}

/* 边缘缩放手柄 */
.lw-resize-edge {
  position: absolute;
  z-index: 20;
}
.lw-resize-edge.lw-resize-n {
  top: 0;
  left: 8px;
  right: 8px;
  height: 6px;
  cursor: n-resize;
}
.lw-resize-edge.lw-resize-s {
  bottom: 0;
  left: 8px;
  right: 8px;
  height: 6px;
  cursor: s-resize;
}
.lw-resize-edge.lw-resize-w {
  top: 8px;
  bottom: 8px;
  left: 0;
  width: 6px;
  cursor: w-resize;
}
.lw-resize-edge.lw-resize-e {
  top: 8px;
  bottom: 8px;
  right: 0;
  width: 6px;
  cursor: e-resize;
}

.lw-resize-corner {
  position: absolute;
  z-index: 21;
  width: 12px;
  height: 12px;
}
.lw-resize-corner.lw-resize-se {
  right: 0;
  bottom: 0;
  cursor: se-resize;
}
.lw-resize-corner.lw-resize-sw {
  left: 0;
  bottom: 0;
  cursor: sw-resize;
}
.lw-resize-corner.lw-resize-ne {
  right: 0;
  top: 0;
  cursor: ne-resize;
}
.lw-resize-corner.lw-resize-nw {
  left: 0;
  top: 0;
  cursor: nw-resize;
}

/* 错误边界 Error Boundary 隔离视觉 */
.lw-window-error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}

.lw-error-card {
  max-width: 440px;
  background: rgba(25, 18, 22, 0.95);
  border: 1px solid rgba(248, 113, 113, 0.35);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
}

.lw-error-icon {
  font-size: 34px;
}

.lw-error-title {
  margin: 0;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
}

.lw-error-desc {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

.lw-error-details {
  width: 100%;
  background: rgba(0, 0, 0, 0.45);
  padding: 8px 12px;
  border-radius: 6px;
  overflow-x: auto;
  text-align: left;
  box-sizing: border-box;
}

.lw-error-details code {
  font-size: 11px;
  color: #fca5a5;
  font-family: ui-monospace, monospace;
}

.lw-error-actions {
  display: flex;
  gap: 12px;
  margin-top: 6px;
}

.lw-error-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  transition: all 0.15s ease;
}

.lw-error-btn.primary {
  background: #38bdf8;
  color: #0f172a;
}

.lw-error-btn.primary:hover {
  background: #0ea5e9;
}

.lw-error-btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.lw-error-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.16);
}
</style>
