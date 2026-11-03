<template>
  <section v-if="state.isOpen" ref="panel" id="notification-center" popover="manual" class="notification-center" :aria-label="t('notifications.centerTitle')">
    <header><div><h2>{{ t('notifications.centerTitle') }} <span v-if="unread">{{ t('notifications.unreadCountOnly', { count: unread }) }}</span></h2><small>{{ t('notifications.retention') }}</small></div><button type="button" :aria-label="t('window.close')" @click="controller.close">×</button></header>
    <nav :aria-label="t('notifications.centerTitle')"><button type="button" :disabled="state.saving || !unread" @click="controller.markAllRead">{{ t('notifications.markAllRead') }}</button><button type="button" :disabled="state.saving || !state.items.length" @click="confirmClear = !confirmClear">{{ t('notifications.clear') }}</button><button type="button" :disabled="state.loading" @click="controller.refresh">{{ t('notifications.reload') }}</button></nav>
    <div v-if="confirmClear" class="clear-confirm">{{ t('notifications.clearConfirm') }}<button type="button" :disabled="state.saving" @click="clearHistory">{{ t('notifications.confirmClearBtn') }}</button><button type="button" @click="confirmClear = false">{{ t('common.cancel') }}</button></div>
    <p v-if="state.error" class="center-error" role="alert">{{ state.error }}</p>
    <div class="center-list">
      <p v-if="state.loading && !state.items.length" class="center-empty">{{ t('notifications.reading') }}</p>
      <div v-else-if="!state.items.length" class="center-empty"><strong>{{ t('notifications.emptyTitle') }}</strong><p>{{ t('notifications.emptyDesc') }}</p></div>
      <article v-for="item in state.items" :key="item.id" class="history-card" :class="{ unread: !item.read }">
        <div class="history-meta"><img :src="item.appType === 'bili' ? 'assets/bilibili.svg' : 'assets/icon-48.png'" alt="" /><strong>{{ item.appName }}</strong><span v-if="!item.read" class="unread-dot" aria-label="未读"></span><time :datetime="new Date(item.createdAt).toISOString()" :title="formatTime(item.createdAt)">{{ formatTime(item.createdAt) }}</time><button type="button" :disabled="state.saving" aria-label="删除此通知" @click="controller.remove(item.id)">×</button></div>
        <button type="button" class="history-content" :disabled="state.saving" @click="controller.activate(item)">
          <strong>{{ item.title }}</strong><small v-if="item.subtitle">{{ item.subtitle }}</small><p v-if="item.message">{{ item.message }}</p><span class="history-action">{{ item.target ? t('notifications.openTarget') : item.read ? t('notifications.isRead') : t('notifications.markRead') }}</span>
        </button>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue';
import { notificationHistoryController as controller, notificationHistoryState as state, notificationUnreadCount as unread } from './history-store';
import { t, currentLanguage } from '../i18n';
const panel = ref<HTMLElement | null>(null), confirmClear = ref(false);
function place() {
  const el = panel.value; if (!el) return;
  const anchor = document.getElementById('bili-profile-button')?.getBoundingClientRect();
  const width = Math.min(320, window.innerWidth - 24);
  el.style.width = width + 'px';
  el.style.left = Math.max(12, Math.min(anchor?.left || 16, window.innerWidth - width - 12)) + 'px';
  el.style.top = Math.max(12, Math.min((anchor?.bottom || 46) + 10, window.innerHeight - 120)) + 'px';
  const availHeight = window.innerHeight - parseFloat(el.style.top) - 16;
  el.style.maxHeight = Math.max(100, Math.min(520, availHeight)) + 'px';
}
function outside(event: PointerEvent) {
  const target = event.target as Node;
  if (!panel.value?.contains(target) && !document.getElementById('bili-profile-button')?.contains(target)) controller.close();
}
function key(event: KeyboardEvent) { if (event.key === 'Escape' && !event.defaultPrevented) { event.stopPropagation(); controller.close(); } }
function visibility() { if (document.hidden) controller.close(); }
function detach() { window.removeEventListener('pointerdown', outside); window.removeEventListener('keydown', key); window.removeEventListener('resize', place); document.removeEventListener('visibilitychange', visibility); }
watch(() => state.isOpen, async (open, _old, cleanup) => {
  let cancelled = false; cleanup(() => { cancelled = true; detach(); });
  confirmClear.value = false;
  if (!open) return;
  await nextTick(); if (cancelled) return;
  panel.value?.showPopover(); place();
  window.addEventListener('pointerdown', outside); window.addEventListener('keydown', key); window.addEventListener('resize', place); document.addEventListener('visibilitychange', visibility);
}, { immediate: true, flush: 'post' });
onUnmounted(detach);
function formatTime(time: number) {
  const locale = currentLanguage.value === 'en' ? 'en-US' : 'zh-CN';
  return new Date(time).toLocaleString(locale, { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
async function clearHistory() { await controller.clear(); confirmClear.value = false; }
</script>
<style scoped>
.notification-center { position: fixed; margin: 0; inset: auto; box-sizing: border-box; padding: 0; border: 1px solid var(--border); border-radius: 12px; background: var(--panel); color: var(--text); box-shadow: 0 12px 36px #0002; font: 12px/1.5 var(--font-family, 'Segoe UI', sans-serif); }
.notification-center:popover-open { display: flex; flex-direction: column; }
header { display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 11px 14px 8px; }
h2 { margin: 0; color: var(--heading); font-size: 13.5px; }
h2 span { color: var(--accent); margin-left: 5px; font-size: 10.5px; font-weight: 500; }
header small { color: var(--muted); font-size: 9.5px; }
button { color: inherit; font: inherit; border: 0; background: transparent; cursor: pointer; border-radius: 5px; padding: 3px 5px; }
button:hover { background: var(--surface); }
button:disabled { cursor: default; opacity: .5; }
header > button { font-size: 18px; }
nav { display: flex; gap: 4px; padding: 0 10px 7px; border-bottom: 1px solid var(--border); color: var(--muted); font-size: 11px; }
nav button:last-child { margin-left: auto; }
.center-list { min-height: 0; overflow: auto; padding: 8px 10px; display: flex; flex-direction: column; gap: 7px; overscroll-behavior: contain; scrollbar-width: thin; }
.center-empty { text-align: center; padding: 24px 16px; color: var(--muted); }
.center-empty strong { display: block; color: var(--heading); font-size: 13px; }
.center-error, .clear-confirm { padding: 6px 10px; margin: 0; color: var(--muted); background: var(--surface); overflow-wrap: anywhere; font-size: 11px; }
.clear-confirm button { color: var(--accent); }
.history-card { border: 1px solid var(--border); border-radius: 8px; background: var(--panel); overflow: hidden; flex-shrink: 0; }
.history-card.unread { border-left: 3px solid var(--accent); }
.history-meta { display: flex; align-items: center; gap: 5px; padding: 6px 8px 0; color: var(--muted); font-size: 9.5px; }
.history-meta img { width: 14px; height: 14px; object-fit: contain; }
.history-meta strong { font-weight: 500; max-width: 110px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.history-meta time { margin-left: auto; white-space: nowrap; }
.unread-dot { width: 4.5px; height: 4.5px; border-radius: 50%; background: var(--accent); }
.history-content { display: block; width: 100%; text-align: left; padding: 6px 9px 8px; overflow-wrap: anywhere; }
.history-content > strong { display: block; font-size: 12px; color: var(--heading); line-height: 1.35; }
.history-content > small { display: block; margin-top: 2px; color: var(--muted); font-size: 10.5px; }
.history-content p { margin: 4px 0; white-space: pre-wrap; font-size: 11px; line-height: 1.4; }
.history-action { display: block; margin-top: 5px; color: var(--muted); font-size: 9.5px; }
</style>
