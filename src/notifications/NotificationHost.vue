<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { notificationController, notificationItems, type NotificationItem } from "./store";
import { notificationHistoryController } from "./history-store";

const timers = new Map<string, number>();
const startedAt = new Map<string, number>();
const remaining = new Map<string, number>();
const progress = ref<Record<string, number>>({});
const paused = ref<Record<string, boolean>>({});
let observer: MutationObserver | null = null;

function clearTimer(id: string): void {
  const timer = timers.get(id);
  if (timer !== undefined) clearTimeout(timer);
  timers.delete(id);
}

function startTimer(item: NotificationItem, duration = item.duration): void {
  clearTimer(item.id);
  remaining.set(item.id, duration);
  startedAt.set(item.id, Date.now());
  paused.value[item.id] = false;
  progress.value[item.id] = Math.max(0, Math.min(100, (duration / item.duration) * 100));
  nextTick(() => requestAnimationFrame(() => {
    progress.value[item.id] = 0;
  }));
  timers.set(item.id, window.setTimeout(() => {
    timers.delete(item.id);
    notificationController.close(item.id);
  }, duration));
}

function pause(item: NotificationItem): void {
  clearTimer(item.id);
  const elapsed = Date.now() - (startedAt.get(item.id) || Date.now());
  const timeLeft = Math.max(0, (remaining.get(item.id) ?? item.duration) - elapsed);
  remaining.set(item.id, timeLeft);
  paused.value[item.id] = true;
  progress.value[item.id] = Math.max(0, Math.min(100, (timeLeft / item.duration) * 100));
}

function resume(item: NotificationItem): void {
  startTimer(item, Math.max(1500, remaining.get(item.id) ?? item.duration));
}

function close(item: NotificationItem): void {
  clearTimer(item.id);
  notificationController.close(item.id);
}

function activate(item: NotificationItem): void {
  void notificationHistoryController.markRead(item.id);
  close(item);
  if (!item.onClick) { if (item.target) void notificationHistoryController.openTarget(item.target); return; }
  try {
    Promise.resolve(item.onClick()).catch((error) => console.warn("Notification action failed", error));
  } catch (error) {
    console.warn("Notification action failed", error);
  }
}

function progressStyle(item: NotificationItem): Record<string, string> {
  const timeLeft = Math.max(500, remaining.get(item.id) ?? item.duration);
  return {
    width: `${progress.value[item.id] ?? 100}%`,
    transition: paused.value[item.id] ? "none" : `width ${timeLeft}ms linear`
  };
}

onMounted(() => {
  observer = new MutationObserver(() => {
    const activeIds = new Set(notificationItems.map((item) => item.id));
    for (const item of notificationItems) {
      if (!item.closing && !timers.has(item.id) && !remaining.has(item.id)) startTimer(item);
    }
    for (const id of remaining.keys()) {
      if (activeIds.has(id)) continue;
      clearTimer(id);
      remaining.delete(id);
      startedAt.delete(id);
      delete progress.value[id];
      delete paused.value[id];
    }
  });
  const host = document.getElementById("win-toast-container");
  if (host) observer.observe(host, { childList: true });
  for (const item of notificationItems) startTimer(item);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  for (const timer of timers.values()) clearTimeout(timer);
  timers.clear();
});
</script>

<template>
  <Teleport to="body">
    <div id="win-toast-container" class="win-toast-container" aria-live="polite" aria-relevant="additions">
    <TransitionGroup name="win-toast">
      <article
        v-for="item in notificationItems"
        :key="item.id"
        class="win-toast-card"
        :class="[item.appType, { closing: item.closing }]"
        :data-toast-fingerprint="item.fingerprint"
        @mouseenter="pause(item)"
        @mouseleave="resume(item)"
      >
        <header class="win-toast-head">
          <img :src="item.icon" class="win-toast-icon" alt="">
          <span class="win-toast-app">{{ item.appName }}</span>
          <span class="win-toast-time">刚刚</span>
          <button type="button" class="win-toast-close" title="关闭" aria-label="关闭通知" @click="close(item)">✕</button>
        </header>
        <button type="button" class="win-toast-body win-toast-body-button" @click="activate(item)">
          <span class="win-toast-title">{{ item.title }}</span>
          <span v-if="item.subtitle" class="win-toast-subtitle">{{ item.subtitle }}</span>
          <span v-if="item.message" class="win-toast-snippet">{{ item.message }}</span>
        </button>
        <footer v-if="item.showActions && item.actionLabel" class="win-toast-actions">
          <button type="button" class="win-toast-btn primary" @click="activate(item)">{{ item.actionLabel }}</button>
          <button type="button" class="win-toast-btn" @click="close(item)">关闭</button>
        </footer>
        <div class="win-toast-progress" :style="progressStyle(item)"></div>
      </article>
    </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.win-toast-enter-active {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease-out;
}
.win-toast-leave-active {
  transition: transform 0.22s ease-in, opacity 0.22s ease-in;
}
.win-toast-enter-from {
  opacity: 0;
  transform: translateX(110%);
}
.win-toast-leave-to {
  opacity: 0;
  transform: translateX(110%);
}
.win-toast-move {
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
