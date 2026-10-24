<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { chatModuleState as state } from "./chat-state";
import { exportHistory, historyScope, historyError, pendingHistoryCount, pendingHistorySnapshot, readHistoryPage, retryHistoryWrites, historyBrowsing } from "./chat-history";
const props = defineProps<{ container: HTMLElement | null }>();
const scope = computed(() => historyScope(state.currentUser.uid, state.serverUrl, state.currentRoomId));
const loading = ref(false);
const notice = ref("");
const exhausted = ref(false);
watch(scope, () => { exhausted.value = false; notice.value = ""; historyBrowsing.value = false; });
async function older() {
  if (loading.value) return;
  const key = scope.value;
  loading.value = true;
  historyBrowsing.value = true;
  try {
    const first = state.messages.find(m => m.id !== "sys-welcome");
    const page = await readHistoryPage(key, first);
    if (key !== scope.value) return;
    const existing = new Set(state.messages.map(m => m.id));
    const additions = page.filter(m => !existing.has(m.id));
    const height = props.container?.scrollHeight || 0;
    const top = props.container?.scrollTop || 0;
    state.messages = [...additions, ...state.messages];
    exhausted.value = page.length < 200;
    notice.value = additions.length ? `已加载 ${additions.length} 条历史` : "没有更早记录";
    await nextTick();
    if (key === scope.value && props.container) props.container.scrollTop = top + props.container.scrollHeight - height;
  } catch { notice.value = "读取失败，原记录未删除"; }
  finally { loading.value = false; historyBrowsing.value = false; }
}
function download(value: unknown, name: string) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
async function backup() {
  const key = scope.value;
  const visible = state.messages.map(m => JSON.parse(JSON.stringify(m)));
  try {
    const messages = await exportHistory(key);
    const merged = new Map(messages.map(m => [m.id, m]));
    for (const message of visible) merged.set(message.id, message);
    download({ version: 1, scope: JSON.parse(key), messages: [...merged.values()] }, "chat-room-history.json");
    notice.value = "已发起导出；文件包含聊天内容及房间地址，请妥善保管";
  } catch {
    download({ partial: true, scope: JSON.parse(key), visible, pending: pendingHistorySnapshot(key) }, "chat-history-emergency.json");
    notice.value = "数据库不可读，仅导出当前窗口和待存消息，不是完整归档";
  }
}
</script>
<template>
  <div class="history-tools">
    <details :key="scope">
      <summary>聊天记录</summary>
      <div class="history-options">
        <button type="button" :disabled="loading || exhausted" @click="older">{{ loading ? '读取中…' : '加载更早消息' }}</button>
        <button type="button" @click="backup">导出聊天记录</button>
      </div>
    </details>
    <span v-if="pendingHistoryCount">{{ pendingHistoryCount }} 条待写入</span>
    <p v-if="historyError" role="alert">{{ historyError }} <button type="button" @click="retryHistoryWrites">重试保存</button></p>
    <p v-if="notice" role="status">{{ notice }}</p>
  </div>
</template>
<style scoped>
.history-tools { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; color: var(--muted); font-size: 11px; min-width: 0; }
summary { cursor: pointer; border-radius: 6px; padding: 4px 8px; color: var(--text); }
summary:hover { background: var(--surface); }
summary:focus-visible { outline: 2px solid var(--heading); outline-offset: 2px; }
.history-options { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 6px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); }
button { background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: 6px; padding: 4px 8px; cursor: pointer; font: inherit; }
button:disabled { opacity: .5; cursor: default; }
button:focus-visible { outline: 2px solid var(--heading); outline-offset: 2px; }
p { flex-basis: 100%; margin: 2px 0; overflow-wrap: anywhere; }
</style>
