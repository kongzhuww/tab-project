<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { clockState } from "./store";
import { mottoState, mottoController } from "./motto-store";
import { notificationController } from "../notifications/store";

const isEditingMotto = ref(false);
const editingInput = ref("");
const mottoInputRef = ref<HTMLInputElement | null>(null);

const currentGreetingText = computed(() => {
  return mottoState.customText || clockState.greetingText;
});

function startEditMotto() {
  mottoController.closeMenu();
  editingInput.value = mottoState.customText || clockState.greetingText;
  isEditingMotto.value = true;
  void nextTick(() => {
    mottoInputRef.value?.focus();
    mottoInputRef.value?.select();
  });
}

function saveMotto() {
  if (!isEditingMotto.value) return;
  isEditingMotto.value = false;
  const val = editingInput.value.trim();
  mottoController.setCustomMotto(val);
  if (val) {
    notificationController.fetch("标语", `已更新标语: ${val}`);
  }
}

function cancelEditMotto() {
  isEditingMotto.value = false;
}

function onMottoKeydown(e: KeyboardEvent) {
  if (e.key === "Enter") {
    e.preventDefault();
    saveMotto();
  } else if (e.key === "Escape") {
    e.preventDefault();
    cancelEditMotto();
  }
}

function onMottoWheel(e: WheelEvent) {
  if (isEditingMotto.value) return;
  e.preventDefault();
  e.stopPropagation();
  mottoController.stepHistory(e.deltaY > 0 ? 1 : -1);
}

function onMottoContextMenu(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  mottoController.openMenu(e.clientX, e.clientY);
}

function onWindowClick(e: MouseEvent) {
  if (mottoState.menuOpen) {
    const target = e.target as HTMLElement;
    if (!target.closest(".motto-context-menu")) {
      mottoController.closeMenu();
    }
  }
}

onMounted(() => {
  void mottoController.init();
  window.addEventListener("click", onWindowClick);
});

onUnmounted(() => {
  window.removeEventListener("click", onWindowClick);
});
</script>

<template>
  <!-- 可编辑标语区域 -->
  <div
    class="hero-motto-wrapper"
    title="点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单"
    @wheel="onMottoWheel"
    @contextmenu="onMottoContextMenu"
  >
    <input
      v-if="isEditingMotto"
      ref="mottoInputRef"
      v-model="editingInput"
      class="hero-motto-input"
      type="text"
      placeholder="写下你此刻的个性标语…"
      maxlength="60"
      @blur="saveMotto"
      @keydown="onMottoKeydown"
    />
    <p
      v-else
      id="greeting"
      class="hero-motto-text"
      :style="{ color: clockState.greetColor }"
      @click="startEditMotto"
    >
      <span class="motto-content">{{ currentGreetingText }}</span>
      <span v-if="mottoState.history.length > 1" class="motto-scroll-hint" title="滚动鼠标滚轮快速切换历史标语">⇕</span>
    </p>
  </div>

  <!-- 标语专属右键菜单 -->
  <Teleport to="body">
    <div
      v-if="mottoState.menuOpen"
      class="motto-context-menu"
      :style="{ left: `${mottoState.menuPos.x}px`, top: `${mottoState.menuPos.y}px` }"
      @click.stop
      @contextmenu.prevent
    >
      <div class="motto-menu-header">
        <span>🏷️ 自定义标语</span>
        <small class="dim">{{ mottoState.history.length }} 条记录</small>
      </div>

      <button type="button" class="motto-menu-action" @click="startEditMotto">
        <i>✎</i>
        <span>编辑当前标语</span>
      </button>

      <div class="motto-menu-divider"></div>

      <div class="motto-history-label">历史标语记录（点击切换）：</div>
      <div class="motto-history-list">
        <div v-if="!mottoState.history.length" class="motto-history-empty dim">
          暂无历史标语，自定义的每一条标语都会沉淀在此
        </div>
        <template v-else>
          <div
            v-for="item in mottoState.history"
            :key="item.id"
            class="motto-history-item"
            :class="{ active: mottoState.customText === item.text }"
            @click="mottoController.selectHistory(item)"
          >
            <span class="motto-item-date">{{ item.date }}</span>
            <span class="motto-item-text" :title="item.text">{{ item.text }}</span>
            <button
              type="button"
              class="motto-item-del"
              title="删除此条标语"
              @click.stop="mottoController.deleteEntry(item.id)"
            >×</button>
          </div>
        </template>
      </div>

      <div class="motto-menu-divider"></div>

      <button
        type="button"
        class="motto-menu-action reset-btn"
        @click="mottoController.resetToSystem"
      >
        <i>↻</i>
        <span>恢复系统自动问候（早安/午安/晚安）</span>
      </button>

      <button
        v-if="mottoState.history.length"
        type="button"
        class="motto-menu-action danger-btn"
        @click="mottoController.clearHistory"
      >
        <i>🗑</i>
        <span>清空全部历史标语</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
.hero-motto-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  min-height: 28px;
  margin-bottom: 2px;
}

.hero-motto-text {
  margin: 0;
  font-size: 14.5px;
  font-weight: 500;
  letter-spacing: 0.5px;
  opacity: 0.88;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid transparent;
}

.hero-motto-wrapper:hover .hero-motto-text {
  opacity: 1;
  background: var(--surface-hover, rgba(255, 255, 255, 0.08));
  border-color: var(--border, rgba(255, 255, 255, 0.1));
}

.motto-scroll-hint {
  font-size: 11px;
  opacity: 0.45;
  transition: opacity 0.2s;
}

.hero-motto-wrapper:hover .motto-scroll-hint {
  opacity: 0.85;
}

.hero-motto-input {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border-strong, #3b82f6);
  border-radius: 6px;
  padding: 3px 12px;
  outline: none;
  width: 280px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.motto-context-menu {
  position: fixed;
  z-index: 9999;
  min-width: 250px;
  max-width: 320px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 12.5px;
  color: var(--text);
  user-select: none;
}

.motto-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;
}

.motto-menu-action {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border-radius: 7px;
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 12.5px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;
}

.motto-menu-action:hover {
  background: var(--surface-hover);
}

.motto-menu-action i {
  font-style: normal;
  font-size: 13px;
  opacity: 0.8;
}

.motto-menu-divider {
  height: 1px;
  background: var(--border);
  margin: 4px 0;
}

.motto-history-label {
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
}

.motto-history-list {
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 2px;
}

.motto-history-empty {
  padding: 8px;
  text-align: center;
  font-size: 11px;
}

.motto-history-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.motto-history-item:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.06));
}

.motto-history-item.active {
  background: rgba(59, 130, 246, 0.16);
  color: #60a5fa;
  font-weight: 600;
}

.motto-item-date {
  font-size: 10px;
  opacity: 0.5;
  white-space: nowrap;
}

.motto-item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.motto-item-del {
  border: none;
  background: transparent;
  color: var(--muted, #94a3b8);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.15s;
}

.motto-history-item:hover .motto-item-del {
  opacity: 1;
}

.motto-item-del:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.reset-btn {
  color: #60a5fa;
}

.danger-btn {
  color: #f87171;
}
</style>
