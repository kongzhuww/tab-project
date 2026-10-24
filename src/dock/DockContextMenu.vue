<script setup lang="ts">
import { computed } from "vue";
import { useContextMenu } from "../sdk/interactions";
import { dockLifecycleController } from "./dock-lifecycle.store";
import { macDockState } from "./store";
import { notificationController } from "../notifications/store";
import { pluginMarketController } from "../modules/market-store";

export interface ContextTarget {
  type: "tool" | "card" | "home";
  id: string;
  title: string;
  icon?: string;
  emoji?: string;
  url?: string;
  x: number;
  y: number;
}

const props = defineProps<{
  target: ContextTarget | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "action", action: string, target: ContextTarget): void;
}>();

const isRunning = computed(() => {
  if (!props.target || props.target.type !== "tool") return false;
  return dockLifecycleController.isRunning(props.target.id);
});

const isVisible = computed(() => {
  if (!props.target || props.target.type !== "tool") return false;
  return dockLifecycleController.isVisible(props.target.id);
});

const { menuRef, style: menuStyle } = useContextMenu({
  visible: () => Boolean(props.target),
  anchor: () => props.target || { x: 0, y: 0 },
  placement: macDockState.position === "top" ? "below" : "above",
  align: "center", gap: 12,
  dismiss: () => emit("close")
});

function handleOpen() {
  if (!props.target) return;
  dockLifecycleController.openApp(props.target.id);
  emit("close");
}

function handleHide() {
  if (!props.target) return;
  dockLifecycleController.hideApp(props.target.id);
  emit("close");
}

async function handleReload() {
  if (!props.target) return;
  await dockLifecycleController.reloadApp(props.target.id);
  emit("close");
}

async function handleQuit() {
  if (!props.target) return;
  const target = props.target;
  const result = await dockLifecycleController.quitApp(target.id);
  if (result?.ok === false) { emit("close"); return; }
  notificationController.show({
    appName: target.title,
    title: "已退出应用",
    subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
    icon: target.icon || "assets/logo.png",
    duration: 2800
  });
  emit("close");
}

async function handleRemoveFromDock() {
  if (!props.target) return;
  const target = props.target;
  const saving = pluginMarketController.uninstall(target.id);
  emit("close");
  if (!await saving) {
    notificationController.show({
      appName: target.title,
      title: "入口停用未确认",
      subtitle: pluginMarketController.state.errorMessage || "请打开模块管理核对当前启用状态",
      icon: target.icon || "assets/logo.png",
      duration: 4000
    });
  }
}

function handleExternalOpen() {
  if (!props.target) return;
  const urls: Record<string, string> = {
    "daily-bilibili": "https://www.bilibili.com",
    "card-github": "https://github.com",
    "daily-aihot": "https://news.ycombinator.com",
    "daily-youtube": "https://www.youtube.com",
    "daily-pricing": "https://openai.com/api/pricing"
  };
  const url = urls[props.target.id] || "https://www.bilibili.com";
  window.open(url, "_blank");
  emit("close");
}

</script>

<template>
  <Teleport to="body">
    <div
      v-if="target"
      ref="menuRef"
      role="group"
      :aria-label="`${target.title}操作`"
      class="dock-context-menu"
      :style="menuStyle"
      @click.stop
      @contextmenu.prevent
    >
      <!-- 菜单顶部 Header -->
      <div class="dock-menu-head">
        <div class="dock-menu-title">
          <img v-if="target.icon" class="dock-menu-icon" :src="target.icon" :alt="target.title" />
          <span v-else-if="target.emoji" class="dock-menu-emoji">{{ target.emoji }}</span>
          <strong>{{ target.title }}</strong>
        </div>
        <span v-if="target.type === 'tool'" class="dock-status-tag" :class="{ 'is-running': isRunning }">
          <span class="dock-status-dot"></span>
          {{ isRunning ? "运行中" : "未启动" }}
        </span>
      </div>

      <div class="dock-menu-divider"></div>

      <!-- 工具类专属菜单 -->
      <template v-if="target.type === 'tool'">
        <button
          v-if="!isVisible"
          type="button"
          class="dock-menu-item"
          @click="handleOpen"
        >
          <span class="dock-menu-symbol">↗</span>
          <span>打开窗口</span>
        </button>

        <button
          v-else
          type="button"
          class="dock-menu-item"
          @click="handleHide"
        >
          <span class="dock-menu-symbol">−</span>
          <span>隐藏窗口</span>
        </button>

        <button
          type="button"
          class="dock-menu-item"
          @click="handleReload"
        >
          <span class="dock-menu-symbol">⟲</span>
          <div class="dock-menu-text">
            <span>重新加载</span>
            <small>单应用热重启</small>
          </div>
        </button>

        <div class="dock-menu-divider"></div>

        <button
          type="button"
          class="dock-menu-item"
          @click="handleRemoveFromDock"
        >
          <span class="dock-menu-symbol">📌</span>
          <div class="dock-menu-text">
            <span>从 Dock 栏移出</span>
            <small>可在模块管理中重新添加</small>
          </div>
        </button>

        <button
          type="button"
          class="dock-menu-item item-danger"
          @click="handleQuit"
        >
          <span class="dock-menu-symbol">✕</span>
          <div class="dock-menu-text">
            <span>真正的关闭</span>
            <small>退出并释放内存</small>
          </div>
        </button>
      </template>

      <!-- 卡片类快捷菜单 -->
      <template v-else-if="target.type === 'card'">
        <button
          type="button"
          class="dock-menu-item"
          @click="handleExternalOpen"
        >
          <span class="dock-menu-symbol">↗</span>
          <span>在新标签页打开官网</span>
        </button>
      </template>

      <template v-else>
        <button
          type="button"
          class="dock-menu-item"
          @click="emit('close')"
        >
          <span class="dock-menu-symbol">🏠</span>
          <span>返回常用主页</span>
        </button>
      </template>
    </div>
  </Teleport>
</template>

<style scoped>
.dock-context-menu {
  position: fixed;
  z-index: 999999;
  min-width: 180px;
  /* 深度继承页面当前主题变量（莱茵生命米纸质感、深色模式等） */
  background: var(--panel, var(--surface, rgba(241, 237, 226, 0.95)));
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid var(--border, rgba(38, 34, 26, 0.22));
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px var(--border, rgba(0, 0, 0, 0.08));
  animation: dockMenuPop 0.16s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--text, #26221a);
  font-size: 13px;
  user-select: none;
}

@keyframes dockMenuPop {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dock-menu-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px 6px 6px;
}
.dock-menu-title {
  display: flex;
  align-items: center;
  gap: 6px;
}
.dock-menu-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}
.dock-menu-emoji {
  font-size: 14px;
}
.dock-menu-title strong {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading, #1f2937);
}

.dock-status-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted, var(--dim, #78716c));
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  padding: 2px 6px;
  border-radius: 4px;
}
.dock-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted, #94a3b8);
}
.dock-status-tag.is-running {
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
}
.dock-status-tag.is-running .dock-status-dot {
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

.dock-menu-divider {
  height: 1px;
  background: var(--border, rgba(0, 0, 0, 0.08));
  margin: 4px 0;
}

.dock-menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border: none;
  background: transparent;
  color: var(--text, #26221a);
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.12s;
  font-size: 13px;
}
.dock-menu-item:hover:not(:disabled) {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
}
.dock-menu-item:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.dock-menu-symbol {
  font-size: 14px;
  width: 16px;
  text-align: center;
  color: var(--text-muted, var(--dim, #78716c));
  flex-shrink: 0;
}
.dock-menu-text {
  display: flex;
  flex-direction: column;
}
.dock-menu-text small {
  font-size: 10px;
  color: var(--text-muted, var(--dim, #78716c));
  margin-top: -1px;
}

.dock-menu-item.item-danger:hover:not(:disabled) {
  background: rgba(220, 38, 38, 0.12);
  color: #dc2626;
}
.dock-menu-item.item-danger:hover:not(:disabled) .dock-menu-symbol,
.dock-menu-item.item-danger:hover:not(:disabled) small {
  color: #dc2626;
}
</style>
