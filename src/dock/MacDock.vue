<script setup lang="ts">
import { computed, ref, reactive, onBeforeUnmount, TransitionGroup } from "vue";
import { macDockController, macDockState } from "./store";
import { dockLifecycleController } from "./dock-lifecycle.store";
import DockContextMenu, { type ContextTarget } from "./DockContextMenu.vue";
import { getDockModule } from "../modules/registry";
import { pluginMarketController } from "../modules/market-store";
import { privateChatConfigured } from "../chat/private-chat-config";

const snapshot = computed(() => macDockState);
const contextTarget = ref<ContextTarget | null>(null);
const badges = computed(() => Object.fromEntries(macDockState.tools.map(tool => {
  const count = getDockModule(tool.id)?.badgeCount?.() || 0;
  return [tool.id, Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0];
})));

function onMarketClick(event: MouseEvent) {
  event.stopPropagation();
  contextTarget.value = null;
  bounceElement(event.currentTarget as HTMLElement);
  pluginMarketController.open();
}

function onCardClick(id: string, event: MouseEvent) {
  event.stopPropagation();
  contextTarget.value = null;
  bounceElement(event.currentTarget as HTMLElement);
  macDockController.triggerItem("target", id);
}

function onCardContextMenu(card: any, event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const pos = macDockState.position;
  const isVertical = pos === "left" || pos === "right";
  contextTarget.value = {
    type: "card",
    id: card.id,
    title: card.title,
    icon: card.icon,
    x: isVertical ? (pos === "left" ? rect.right + 8 : rect.left - 8) : (rect.left + rect.width / 2),
    y: isVertical ? (rect.top + rect.height / 2) : (pos === "top" ? rect.bottom + 8 : rect.top)
  };
}

function onHomeClick(event: MouseEvent) {
  event.stopPropagation();
  contextTarget.value = null;
  bounceElement(event.currentTarget as HTMLElement);
  macDockController.triggerItem("home", "home-launcher");
}

function onToolClick(id: string, event: MouseEvent) {
  event.stopPropagation();
  contextTarget.value = null;
  bounceElement(event.currentTarget as HTMLElement);
  // Registered modules mark themselves only when their local view is requested.
  if (!getDockModule(id)) dockLifecycleController.markRunning(id);
  macDockController.triggerItem("tool", id);
}

function onToolContextMenu(tool: any, event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const pos = macDockState.position;
  const isVertical = pos === "left" || pos === "right";
  contextTarget.value = {
    type: "tool",
    id: tool.id,
    title: tool.title,
    icon: tool.icon,
    emoji: tool.emoji,
    x: isVertical ? (pos === "left" ? rect.right + 8 : rect.left - 8) : (rect.left + rect.width / 2),
    y: isVertical ? (rect.top + rect.height / 2) : (pos === "top" ? rect.bottom + 8 : rect.top)
  };
}

const bounceAnimations = new Map<HTMLElement, Animation>();
function bounceElement(el: HTMLElement | null) {
  if (!el) return;
  bounceAnimations.get(el)?.cancel();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Animate the independent translate property; no layout read or hover-transform override.
  const animation = el.animate([
    { translate: "0 0", offset: 0 },
    { translate: "0 -8px", offset: 0.35 },
    { translate: "0 0", offset: 0.65 },
    { translate: "0 -2px", offset: 0.85 },
    { translate: "0 0", offset: 1 }
  ], { duration: 350, easing: "ease" });
  bounceAnimations.set(el, animation);
  const cleanup = () => { if (bounceAnimations.get(el) === animation) bounceAnimations.delete(el); };
  animation.onfinish = cleanup;
  animation.oncancel = cleanup;
}

// ==================== 浮动跟手拖拽与就地换位预览 (Dock Smooth Drag & Live Swap) ====================
interface DraggingDockItem {
  type: "card" | "tool";
  id: string;
  item: any;
  startX: number;
  startY: number;
  initialLeft: number;
  initialTop: number;
  width: number;
  height: number;
}

const activeDragItem = ref<DraggingDockItem | null>(null);
const ghostState = reactive({
  visible: false,
  x: 0,
  y: 0,
  width: 40,
  height: 40,
  item: null as any,
  type: "tool" as "card" | "tool"
});

const previewCards = ref<any[] | null>(null);
const previewTools = ref<any[] | null>(null);
const displayedCards = computed(() => previewCards.value || snapshot.value.cards);
const displayedTools = computed(() => previewTools.value || snapshot.value.tools);

let lastSwapTargetId = "";
let lastSwapTime = 0;
let hasDragged = false;
let suppressClickUntil = 0;

function onDockPointerDown(type: "card" | "tool", item: any, event: PointerEvent) {
  if (event.button !== 0) return;
  const target = event.target as HTMLElement;
  if (target.closest(".mac-dock-market-btn")) return;

  const btn = event.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();

  hasDragged = false;
  activeDragItem.value = {
    type,
    id: item.id,
    item,
    startX: event.clientX,
    startY: event.clientY,
    initialLeft: rect.left,
    initialTop: rect.top,
    width: rect.width,
    height: rect.height
  };

  window.addEventListener("pointermove", onDockPointerMove);
  window.addEventListener("pointerup", onDockPointerUp);
  window.addEventListener("pointercancel", onDockPointerUp);
}

function onDockPointerMove(event: PointerEvent) {
  if (!activeDragItem.value) return;
  const dx = event.clientX - activeDragItem.value.startX;
  const dy = event.clientY - activeDragItem.value.startY;
  const dist = Math.hypot(dx, dy);

  if (!hasDragged && dist > 5) {
    hasDragged = true;
    ghostState.visible = true;
    ghostState.item = activeDragItem.value.item;
    ghostState.type = activeDragItem.value.type;
    ghostState.width = activeDragItem.value.width;
    ghostState.height = activeDragItem.value.height;
    if (activeDragItem.value.type === "card") {
      previewCards.value = [...snapshot.value.cards];
    } else {
      previewTools.value = [...snapshot.value.tools];
    }
  }

  if (!hasDragged) return;

  ghostState.x = event.clientX - ghostState.width / 2;
  ghostState.y = event.clientY - ghostState.height / 2;

  // 识别光标悬停的目标 Dock 图标
  const hitElements = document.elementsFromPoint(event.clientX, event.clientY);
  const targetBtn = hitElements.find(
    (el) => el.classList.contains("mac-dock-item") && !el.classList.contains("mac-dock-market-btn")
  ) as HTMLElement | null;

  if (!targetBtn) return;

  const targetCardId = targetBtn.getAttribute("data-dock-target");
  const targetToolId = targetBtn.getAttribute("data-dock-tool");

  const currentType = activeDragItem.value.type;
  const currentId = activeDragItem.value.id;
  const now = Date.now();

  if (currentType === "card" && targetCardId && targetCardId !== currentId && targetCardId !== "home-launcher") {
    const rect = targetBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    if (Math.abs(event.clientX - centerX) > rect.width * 0.55) return;
    if (targetCardId === lastSwapTargetId && now - lastSwapTime < 180) return;

    const list = [...(previewCards.value || snapshot.value.cards)];
    const fromIdx = list.findIndex(c => c.id === currentId);
    const toIdx = list.findIndex(c => c.id === targetCardId);
    if (fromIdx >= 0 && toIdx >= 0 && fromIdx !== toIdx) {
      const moved = list.splice(fromIdx, 1)[0];
      list.splice(toIdx, 0, moved);
      previewCards.value = list;
      lastSwapTargetId = targetCardId;
      lastSwapTime = now;
    }
  } else if (currentType === "tool" && targetToolId && targetToolId !== currentId) {
    const rect = targetBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    if (Math.abs(event.clientX - centerX) > rect.width * 0.55) return;
    if (targetToolId === lastSwapTargetId && now - lastSwapTime < 180) return;

    const list = [...(previewTools.value || snapshot.value.tools)];
    const fromIdx = list.findIndex(t => t.id === currentId);
    const toIdx = list.findIndex(t => t.id === targetToolId);
    if (fromIdx >= 0 && toIdx >= 0 && fromIdx !== toIdx) {
      const moved = list.splice(fromIdx, 1)[0];
      list.splice(toIdx, 0, moved);
      previewTools.value = list;
      lastSwapTargetId = targetToolId;
      lastSwapTime = now;
    }
  }
}

function onDockPointerUp() {
  window.removeEventListener("pointermove", onDockPointerMove);
  window.removeEventListener("pointerup", onDockPointerUp);
  window.removeEventListener("pointercancel", onDockPointerUp);

  if (hasDragged && activeDragItem.value) {
    suppressClickUntil = Date.now() + 250;
    if (activeDragItem.value.type === "card" && previewCards.value) {
      macDockController.reorderCards(previewCards.value.map(c => c.id));
    } else if (activeDragItem.value.type === "tool" && previewTools.value) {
      macDockController.reorderTools(previewTools.value.map(t => t.id));
    }
  }

  ghostState.visible = false;
  ghostState.item = null;
  previewCards.value = null;
  previewTools.value = null;
  activeDragItem.value = null;
  hasDragged = false;
  lastSwapTargetId = "";
}

function handleCardItemClick(id: string, event: MouseEvent) {
  if (Date.now() < suppressClickUntil) return;
  onCardClick(id, event);
}

function handleToolItemClick(id: string, event: MouseEvent) {
  if (Date.now() < suppressClickUntil) return;
  onToolClick(id, event);
}

onBeforeUnmount(() => {
  for (const animation of bounceAnimations.values()) animation.cancel();
  bounceAnimations.clear();
  window.removeEventListener("pointermove", onDockPointerMove);
  window.removeEventListener("pointerup", onDockPointerUp);
  window.removeEventListener("pointercancel", onDockPointerUp);
});
</script>

<template>
  <div class="mac-dock-shelf">
    <TransitionGroup tag="div" class="mac-dock-group mac-dock-cards-group" name="dock-item-motion">
      <button
        v-for="card in displayedCards"
        :key="card.id"
        class="mac-dock-item"
        :class="{
          'is-active': snapshot.activeTargetId === card.id,
          'is-drag-origin': activeDragItem && activeDragItem.id === card.id
        }"
        type="button"
        :data-dock-target="card.id"
        :title="card.title"
        @pointerdown="onDockPointerDown('card', card, $event)"
        @click.stop="handleCardItemClick(card.id, $event)"
        @contextmenu.prevent="onCardContextMenu(card, $event)"
      >
        <img class="mac-dock-icon" :src="card.icon" :alt="card.title" />
        <span v-if="snapshot.activeTargetId === card.id" class="mac-dock-dot" aria-hidden="true"></span>
      </button>
    </TransitionGroup>

    <div class="mac-dock-divider" aria-hidden="true"></div>

    <button
      class="mac-dock-item"
      type="button"
      data-dock-target="home-launcher"
      title="常用主页"
      @click.stop="onHomeClick($event)"
    >
      <img class="mac-dock-icon" :src="'assets/nav-home.svg'" alt="主页" />
    </button>

    <div class="mac-dock-divider mac-dock-divider-dark" aria-hidden="true"></div>

    <TransitionGroup tag="div" class="mac-dock-group mac-dock-tools-group" name="dock-item-motion">
      <button
        v-for="tool in displayedTools"
        :key="tool.id"
        class="mac-dock-item"
        :class="{
          'is-active': dockLifecycleController.isRunning(tool.id),
          'is-drag-origin': activeDragItem && activeDragItem.id === tool.id
        }"
        type="button"
        :data-dock-tool="tool.id"
        :title="tool.title"
        @pointerdown="onDockPointerDown('tool', tool, $event)"
        @click.stop="handleToolItemClick(tool.id, $event)"
        @contextmenu.prevent="onToolContextMenu(tool, $event)"
      >
        <img v-if="tool.icon" class="mac-dock-icon" :src="tool.icon" :alt="tool.title" />
        <span v-else-if="tool.emoji" class="mac-dock-emoji" aria-hidden="true">{{ tool.emoji }}</span>
        <span v-if="dockLifecycleController.isRunning(tool.id)" class="mac-dock-dot" aria-hidden="true"></span>
        <span v-if="badges[tool.id] > 0" class="mac-dock-badge">{{ badges[tool.id] > 99 ? '99+' : badges[tool.id] }}</span>
      </button>
    </TransitionGroup>

    <!-- 🧩 模块管理入口 -->
    <button
      class="mac-dock-item mac-dock-market-btn"
      :class="{ 'is-active': pluginMarketController.state.isOpen }"
      type="button"
      title="模块与全屏插件管理"
      @click.stop="onMarketClick($event)"
    >
      <span class="mac-dock-market-icon" aria-hidden="true">🧩</span>
    </button>
  </div>

  <!-- macOS 质感 跟手浮动幽灵 (Floating Drag Ghost) -->
  <Teleport to="body">
    <div
      v-if="ghostState.visible && ghostState.item"
      class="mac-dock-drag-ghost"
      :style="{
        width: ghostState.width + 'px',
        height: ghostState.height + 'px',
        transform: 'translate3d(' + ghostState.x + 'px,' + ghostState.y + 'px, 0)'
      }"
      aria-hidden="true"
    >
      <img v-if="ghostState.item.icon" class="mac-dock-icon" :src="ghostState.item.icon" alt="" />
      <span v-else-if="ghostState.item.emoji" class="mac-dock-emoji">{{ ghostState.item.emoji }}</span>
    </div>
  </Teleport>

  <!-- macOS 质感 Dock 图标右键菜单 -->
  <DockContextMenu
    :target="contextTarget"
    @close="contextTarget = null"
  />
</template>

<style scoped>
.mac-dock-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.mac-dock-item.is-drag-origin {
  opacity: 0.35;
  filter: grayscale(0.2);
}
.dock-item-motion-move {
  transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
}
.mac-dock-drag-ghost {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2147483647;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: color-mix(in srgb, var(--panel, #ffffff) 80%, transparent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28), 0 0 0 1.5px var(--primary, #00aeec);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  opacity: 0.95;
  transform-origin: center center;
}
</style>
