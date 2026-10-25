<template>
  <section v-if="state.isOpen" ref="panel" id="notification-center" popover="manual" class="notification-center" aria-label="通知中心">
    <header><div><h2>通知中心 <span v-if="unread">{{ unread }} 条未读</span></h2><small>重要通知保留30天，最多200条 · 仅本机</small></div><button type="button" aria-label="关闭通知中心" @click="controller.close">×</button></header>
    <nav aria-label="通知操作"><button type="button" :disabled="state.saving || !unread" @click="controller.markAllRead">全部已读</button><button type="button" :disabled="state.saving || !state.items.length" @click="confirmClear = !confirmClear">清空</button><button type="button" :disabled="state.loading" @click="controller.refresh">重新读取</button></nav>
    <div v-if="confirmClear" class="clear-confirm">清空这里的全部通知？<button type="button" :disabled="state.saving" @click="clearHistory">确认清空</button><button type="button" @click="confirmClear = false">取消</button></div>
    <p v-if="state.error" class="center-error" role="alert">{{ state.error }}</p>
    <div class="center-list">
      <p v-if="state.loading && !state.items.length" class="center-empty">正在读取通知…</p>
      <div v-else-if="!state.items.length" class="center-empty"><strong>暂无通知</strong><p>错过的重要 Toast 和任务提醒会保存在这里。普通保存、复制成功提示不会堆积。</p></div>
      <article v-for="item in state.items" :key="item.id" class="history-card" :class="{ unread: !item.read }">
        <div class="history-meta"><img :src="item.appType === 'bili' ? 'assets/bilibili.svg' : 'assets/icon-48.png'" alt="" /><strong>{{ item.appName }}</strong><span v-if="!item.read" class="unread-dot" aria-label="未读"></span><time :datetime="new Date(item.createdAt).toISOString()" :title="formatTime(item.createdAt)">{{ formatTime(item.createdAt) }}</time><button type="button" :disabled="state.saving" aria-label="删除此通知" @click="controller.remove(item.id)">×</button></div>
        <button type="button" class="history-content" :disabled="state.saving" @click="controller.activate(item)">
          <strong>{{ item.title }}</strong><small v-if="item.subtitle">{{ item.subtitle }}</small><p v-if="item.message">{{ item.message }}</p><span class="history-action">{{ item.target ? '打开相关页面 →' : item.read ? '已读' : '标记已读' }}</span>
        </button>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue';
import { notificationHistoryController as controller, notificationHistoryState as state, notificationUnreadCount as unread } from './history-store';
const panel = ref<HTMLElement | null>(null), confirmClear = ref(false);
function place() {
  const el = panel.value; if (!el) return;
  const anchor = document.getElementById('bili-profile-button')?.getBoundingClientRect();
  const width = Math.min(400, window.innerWidth - 24);
  el.style.width = width + 'px';
  el.style.left = Math.max(12, Math.min(anchor?.left || 16, window.innerWidth - width - 12)) + 'px';
  el.style.top = Math.max(12, Math.min((anchor?.bottom || 46) + 10, window.innerHeight - 120)) + 'px';
  el.style.maxHeight = Math.max(100, window.innerHeight - parseFloat(el.style.top) - 12) + 'px';
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
function formatTime(time: number) { return new Date(time).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }); }
async function clearHistory() { await controller.clear(); confirmClear.value = false; }
</script>
<style scoped>
.notification-center { position: fixed; margin: 0; inset: auto; box-sizing: border-box; padding: 0; border: 1px solid var(--border); border-radius: 12px; background: var(--panel); color: var(--text); box-shadow: 0 12px 36px #0002; font: 12px/1.5 var(--font-family, 'Segoe UI', sans-serif); }
.notification-center:popover-open { display: flex; flex-direction: column; }
header { display: flex; gap: 12px; align-items: center; justify-content: space-between; padding: 15px 16px 10px; }
h2 { margin: 0; color: var(--heading); font-size: 15px; }
h2 span { color: var(--accent); margin-left: 6px; font-size: 11px; font-weight: 500; }
header small { color: var(--muted); font-size: 10px; }
button { color: inherit; font: inherit; border: 0; background: transparent; cursor: pointer; border-radius: 5px; padding: 4px 6px; }
button:hover { background: var(--surface); }
button:disabled { cursor: default; opacity: .5; }
header > button { font-size: 20px; }
nav { display: flex; gap: 5px; padding: 0 10px 9px; border-bottom: 1px solid var(--border); color: var(--muted); }
nav button:last-child { margin-left: auto; }
.center-list { min-height: 0; overflow: auto; padding: 10px; display: flex; flex-direction: column; gap: 9px; overscroll-behavior: contain; scrollbar-width: thin; }
.center-empty { text-align: center; padding: 30px 20px; color: var(--muted); }
.center-empty strong { display: block; color: var(--heading); font-size: 14px; }
.center-error, .clear-confirm { padding: 8px 12px; margin: 0; color: var(--muted); background: var(--surface); overflow-wrap: anywhere; }
.clear-confirm button { color: var(--accent); }
.history-card { border: 1px solid var(--border); border-radius: 9px; background: var(--panel); overflow: hidden; flex-shrink: 0; }
.history-card.unread { border-left: 3px solid var(--accent); }
.history-meta { display: flex; align-items: center; gap: 6px; padding: 8px 9px 0; color: var(--muted); font-size: 10px; }
.history-meta img { width: 16px; height: 16px; object-fit: contain; }
.history-meta strong { font-weight: 500; max-width: 120px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.history-meta time { margin-left: auto; white-space: nowrap; }
.unread-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
.history-content { display: block; width: 100%; text-align: left; padding: 8px 12px 11px; overflow-wrap: anywhere; }
.history-content > strong { display: block; font-size: 13px; color: var(--heading); }
.history-content > small { display: block; margin-top: 3px; color: var(--muted); }
.history-content p { margin: 6px 0; white-space: pre-wrap; }
.history-action { display: block; margin-top: 7px; color: var(--muted); font-size: 10px; }
</style>
