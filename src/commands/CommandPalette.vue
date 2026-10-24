<template>
  <Teleport to="body">
    <div
      v-if="state.isOpen"
      class="lw-cmd-overlay"
      @mousedown.self="handleBackdropClick"
    >
      <div class="lw-cmd-modal" role="dialog" aria-modal="true" aria-label="全局命令中心">
        <!-- 搜索输入头栏 -->
        <div class="lw-cmd-input-bar">
          <span class="lw-cmd-search-icon" aria-hidden="true">⌕</span>
          <input
            ref="inputRef"
            type="text"
            class="lw-cmd-input"
            placeholder="搜索全局功能、工具操作或输入命令关键词…"
            v-model="query"
            @input="onInput"
            @keydown="onKeyDown"
            autocomplete="off"
            spellcheck="false"
          />
          <kbd class="lw-cmd-badge">ESC 关闭</kbd>
        </div>

        <!-- 命令结果列表 -->
        <div class="lw-cmd-list-wrap" ref="listRef">
          <template v-if="filteredCommands.length > 0">
            <div
              v-for="(cmd, idx) in filteredCommands"
              :key="cmd.id"
              class="lw-cmd-item"
              :class="{ 'is-selected': idx === state.selectedIndex }"
              :data-index="idx"
              @mouseenter="state.selectedIndex = idx"
              @click="execute(cmd)"
            >
              <div class="lw-cmd-item-main">
                <span class="lw-cmd-category-tag" :class="getCategoryClass(cmd.category)">
                  {{ cmd.category }}
                </span>
                <span class="lw-cmd-title">{{ cmd.title }}</span>
                <span v-if="cmd.description" class="lw-cmd-desc">{{ cmd.description }}</span>
              </div>
              <div class="lw-cmd-item-meta">
                <span v-if="cmd.running" class="lw-cmd-running-dot">执行中…</span>
                <kbd v-if="idx === state.selectedIndex" class="lw-cmd-enter-hint">↵ 执行</kbd>
              </div>
            </div>
          </template>

          <!-- 空结果提示 -->
          <div v-else class="lw-cmd-empty">
            <span style="font-size: 26px;">🔍</span>
            <p>未找到匹配的命令或操作</p>
            <small>尝试搜索如“音乐”、“待办”、“刷新”、“课表”或“开屏”</small>
          </div>
        </div>

        <!-- 底部快捷提示栏 -->
        <footer class="lw-cmd-footer">
          <div class="lw-cmd-footer-tips">
            <span><kbd>↑</kbd><kbd>↓</kbd> 移动选择</span>
            <span><kbd>↵</kbd> 执行操作</span>
            <span><kbd>Ctrl+K</kbd> 唤出面板</span>
          </div>
          <div class="lw-cmd-footer-stats">
            共 {{ filteredCommands.length }} 项操作可用
          </div>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { commandRegistry, type CommandMetadata } from "../core/commands";
import { commandPaletteState as state, commandPaletteController as controller } from "./command-palette-store";

const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const query = computed({
  get: () => state.query,
  set: (val: string) => controller.setQuery(val)
});

const filteredCommands = computed<readonly CommandMetadata[]>(() => {
  return commandRegistry.search(state.query, 40);
});

watch(
  () => state.isOpen,
  (open) => {
    if (open) {
      void nextTick(() => {
        inputRef.value?.focus();
        inputRef.value?.select();
      });
    }
  }
);

function onInput() {
  state.selectedIndex = 0;
}

function onKeyDown(e: KeyboardEvent) {
  const total = filteredCommands.value.length;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    controller.selectNext(total);
    scrollToSelected();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    controller.selectPrev(total);
    scrollToSelected();
  } else if (e.key === "Enter") {
    e.preventDefault();
    const target = filteredCommands.value[state.selectedIndex];
    if (target) {
      void controller.executeCommand(target);
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    controller.close();
  }
}

function scrollToSelected() {
  void nextTick(() => {
    const listEl = listRef.value;
    if (!listEl) return;
    const selectedEl = listEl.querySelector(`.lw-cmd-item[data-index="${state.selectedIndex}"]`) as HTMLElement | null;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });
}

function execute(cmd: CommandMetadata) {
  void controller.executeCommand(cmd);
}

function handleBackdropClick() {
  controller.close();
}

function getCategoryClass(cat: string): string {
  switch (cat) {
    case "界面": return "cat-ui";
    case "音乐": return "cat-music";
    case "待办": return "cat-todoist";
    case "系统": return "cat-system";
    case "通知": return "cat-notify";
    case "课表": return "cat-schedule";
    case "天气": return "cat-weather";
    case "壁纸": return "cat-wallpaper";
    default: return "cat-default";
  }
}
</script>

<style scoped>
.lw-cmd-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 14vh;
  background: var(--lw-modal-overlay, rgba(0, 0, 0, 0.72));
  animation: lwFadeIn 0.15s ease-out;
}

@keyframes lwFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lw-cmd-modal {
  width: 640px;
  max-width: calc(100vw - 32px);
  max-height: 72vh;
  display: flex;
  flex-direction: column;
  background: var(--panel, #18181b);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  border-radius: 16px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08);
  overflow: hidden;
  animation: lwScaleUp 0.16s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes lwScaleUp {
  from { transform: scale(0.96) translateY(-8px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

/* 顶部搜索输入 */
.lw-cmd-input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  background: rgba(255, 255, 255, 0.02);
}

.lw-cmd-search-icon {
  font-size: 20px;
  color: var(--muted, #94a3b8);
  user-select: none;
}

.lw-cmd-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  color: var(--text, #f1f5f9);
  line-height: 1.4;
}

.lw-cmd-input::placeholder {
  color: var(--dim, #64748b);
}

.lw-cmd-badge {
  font-family: inherit;
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--muted, #94a3b8);
  user-select: none;
}

/* 命令列表 */
.lw-cmd-list-wrap {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 140px;
}

.lw-cmd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.12s ease;
  user-select: none;
}

.lw-cmd-item.is-selected {
  background: rgba(244, 63, 94, 0.14);
  box-shadow: inset 0 0 0 1px rgba(244, 63, 94, 0.35);
}

.lw-cmd-item-main {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}

.lw-cmd-category-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 5px;
  white-space: nowrap;
  flex-shrink: 0;
}

.cat-ui { background: rgba(59, 130, 246, 0.18); color: #60a5fa; }
.cat-music { background: rgba(244, 63, 94, 0.18); color: #fb7185; }
.cat-todoist { background: rgba(16, 185, 129, 0.18); color: #34d399; }
.cat-system { background: rgba(234, 179, 8, 0.18); color: #facc15; }
.cat-notify { background: rgba(168, 85, 247, 0.18); color: #c084fc; }
.cat-schedule { background: rgba(14, 165, 233, 0.18); color: #38bdf8; }
.cat-weather { background: rgba(249, 115, 22, 0.18); color: #fb923c; }
.cat-wallpaper { background: rgba(236, 72, 153, 0.18); color: #f472b6; }
.cat-default { background: rgba(255, 255, 255, 0.1); color: var(--muted, #94a3b8); }

.lw-cmd-title {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text, #f1f5f9);
  white-space: nowrap;
}

.lw-cmd-desc {
  font-size: 12px;
  color: var(--muted, #94a3b8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.lw-cmd-item-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 10px;
}

.lw-cmd-enter-hint {
  font-family: inherit;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(244, 63, 94, 0.25);
  color: #f43f5e;
  font-weight: 600;
}

.lw-cmd-running-dot {
  font-size: 11px;
  color: #38bdf8;
  animation: lwBlink 1s infinite alternate;
}

@keyframes lwBlink {
  from { opacity: 0.5; }
  to { opacity: 1; }
}

.lw-cmd-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: var(--muted, #94a3b8);
  gap: 6px;
}
.lw-cmd-empty p { margin: 0; font-size: 14px; font-weight: 500; }
.lw-cmd-empty small { font-size: 11.5px; color: var(--dim, #64748b); }

/* 底部状态 */
.lw-cmd-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.25);
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  font-size: 11.5px;
  color: var(--muted, #94a3b8);
  user-select: none;
}

.lw-cmd-footer-tips {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lw-cmd-footer-tips kbd {
  font-family: inherit;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  margin-right: 4px;
}

.lw-cmd-footer-stats {
  color: var(--dim, #64748b);
}
</style>
