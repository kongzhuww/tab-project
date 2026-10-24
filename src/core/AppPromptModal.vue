<template>
  <Teleport to="body">
    <transition name="app-dialog-fade">
      <div
        v-if="state.isOpen"
        class="app-dialog-backdrop"
        @click.self="state.type !== 'alert' && appDialog.handleCancel()"
        @keydown.esc="appDialog.handleCancel()"
      >
        <div
          class="app-dialog-card"
          :class="{ 'is-danger': state.danger }"
          role="dialog"
          aria-modal="true"
        >
          <header class="app-dialog-head">
            <h3 class="app-dialog-title">{{ state.title }}</h3>
            <button
              v-if="state.type !== 'alert'"
              type="button"
              class="app-dialog-close"
              title="关闭 (Esc)"
              @click="appDialog.handleCancel()"
            >
              ✕
            </button>
          </header>

          <div class="app-dialog-body">
            <p v-if="state.message" class="app-dialog-msg">{{ state.message }}</p>

            <div v-if="state.type === 'prompt'" class="app-dialog-input-wrap">
              <input
                ref="inputRef"
                v-model="state.value"
                :type="state.inputType"
                class="app-dialog-input"
                :placeholder="state.placeholder || '请输入…'"
                @keydown.enter.prevent="appDialog.handleConfirm()"
              />
            </div>
          </div>

          <footer class="app-dialog-foot">
            <button
              v-if="state.type !== 'alert'"
              type="button"
              class="app-dialog-btn cancel"
              @click="appDialog.handleCancel()"
            >
              {{ state.cancelText || '取消' }}
            </button>
            <button
              type="button"
              class="app-dialog-btn confirm"
              :class="{ danger: state.danger }"
              @click="appDialog.handleConfirm()"
            >
              {{ state.confirmText || '确定' }}
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { appDialog, appDialogState } from "./app-dialog.store";

const state = appDialogState;
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => state.isOpen,
  (open) => {
    if (open && state.type === "prompt") {
      nextTick(() => {
        inputRef.value?.focus();
        inputRef.value?.select();
      });
    }
  }
);
</script>

<style scoped>
.app-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: grid;
  place-items: center;
  background: transparent;
  pointer-events: none;
  padding: 16px;
}

.app-dialog-card {
  pointer-events: auto;
  width: 100%;
  max-width: 400px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 14px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.28);
  color: var(--text, #1e293b);
  overflow: hidden;
  animation: appDialogPopIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

html[data-theme="dark"] .app-dialog-card {
  background: #18181b;
  border-color: rgba(255, 255, 255, 0.12);
  color: #f4f4f5;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
}

@keyframes appDialogPopIn {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.app-dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 8px;
}

.app-dialog-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--heading, #0f172a);
}

html[data-theme="dark"] .app-dialog-title {
  color: #ffffff;
}

.app-dialog-close {
  background: transparent;
  border: 0;
  color: var(--muted, #94a3b8);
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;
}

.app-dialog-close:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--text, #0f172a);
}

.app-dialog-body {
  padding: 6px 18px 14px;
}

.app-dialog-msg {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--muted, #64748b);
  white-space: pre-wrap;
  word-break: break-word;
}

html[data-theme="dark"] .app-dialog-msg {
  color: #a1a1aa;
}

.app-dialog-input {
  width: 100%;
  box-sizing: border-box;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid var(--border, #cbd5e1);
  background: var(--surface, #ffffff);
  color: var(--text, #0f172a);
  font-size: 13.5px;
  outline: none;
  transition: all 0.15s;
}

html[data-theme="dark"] .app-dialog-input {
  background: #27272a;
  border-color: rgba(255, 255, 255, 0.14);
  color: #ffffff;
}

.app-dialog-input:focus {
  border-color: #00aeec;
  box-shadow: 0 0 0 3px rgba(0, 174, 236, 0.18);
}

.app-dialog-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 18px 14px;
  background: color-mix(in srgb, var(--surface, #f8fafc) 60%, transparent);
  border-top: 1px solid var(--border, rgba(0, 0, 0, 0.06));
}

html[data-theme="dark"] .app-dialog-foot {
  background: rgba(255, 255, 255, 0.02);
  border-top-color: rgba(255, 255, 255, 0.06);
}

.app-dialog-btn {
  padding: 7px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.14s ease;
}

.app-dialog-btn.cancel {
  background: transparent;
  border-color: var(--border, #cbd5e1);
  color: var(--muted, #64748b);
}

.app-dialog-btn.cancel:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--text, #0f172a);
}

html[data-theme="dark"] .app-dialog-btn.cancel {
  border-color: rgba(255, 255, 255, 0.14);
  color: #a1a1aa;
}

.app-dialog-btn.confirm {
  background: #00aeec;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 174, 236, 0.35);
}

.app-dialog-btn.confirm:hover {
  background: #0ea5e9;
  box-shadow: 0 3px 12px rgba(0, 174, 236, 0.5);
}

.app-dialog-btn.confirm.danger {
  background: #ef4444;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.35);
}

.app-dialog-btn.confirm.danger:hover {
  background: #dc2626;
  box-shadow: 0 3px 12px rgba(239, 68, 68, 0.5);
}

.app-dialog-fade-enter-active,
.app-dialog-fade-leave-active {
  transition: opacity 0.15s ease;
}

.app-dialog-fade-enter-from,
.app-dialog-fade-leave-to {
  opacity: 0;
}
</style>
