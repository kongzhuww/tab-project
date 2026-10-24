<template>
  <dialog
    id="settings-dialog"
    ref="dialogRef"
    class="settings-dialog"
    :open="state.isOpen || undefined"
  >
    <div class="settings-dialog-shell">
      <div class="settings-dialog-body">
        <SettingsView v-if="state.isOpen || wasOpened" :active="state.isOpen" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent, onMounted } from "vue";
import { settingsController } from "./store";
import { windowManagerController } from "../core/window-manager.store";

const SettingsView = defineAsyncComponent(() => import("./SettingsView.vue"));

// 全局设置弹窗响应式状态
const state = settingsController.state;
const dialogRef = ref<HTMLDialogElement | null>(null);
const wasOpened = ref(false);

watch(() => state.isOpen, (open) => {
  if (open) wasOpened.value = true;
});

onMounted(() => {
  settingsController.setMounted(true);
  const dialogEl = dialogRef.value;

  // 注册到 WindowManager
  windowManagerController.register({
    id: "settings",
    title: "设置",
    icon: "⚙",
    element: dialogEl,
    getElement: () => dialogRef.value,
    onActivate: () => {
      settingsController.open();
    },
    onMinimize: () => {
      settingsController.minimize();
    },
    onClose: () => {
      settingsController.close();
      return true;
    }
  });
  // A deep link can arrive before the lazy dialog has registered its DOM window.
  if (state.isOpen) windowManagerController.activate("settings");
});
</script>

<style scoped>
.settings-dialog-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.settings-dialog-body {
  flex: 1;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
