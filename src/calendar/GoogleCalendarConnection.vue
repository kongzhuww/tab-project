<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { withTodoistWrite, todoistModuleState } from "../todoist/module-state";

const props = defineProps<{ visible: boolean }>();
// Keep the original key: existing CalendarService users must not lose configuration.
const KEY = "gmailOAuthClientId";
const clientId = ref("");
const ready = ref(false);
const busy = ref(false);
const status = ref("");
let baseline: unknown;
let version = 0;
let disposed = false;

async function load() {
  if (!props.visible || busy.value || ready.value) return;
  const current = ++version;
  try {
    if (typeof chrome === "undefined" || !chrome.storage?.local) throw new Error();
    const data = await chrome.storage.local.get(KEY);
    if (disposed || !props.visible || current !== version) return;
    baseline = data[KEY];
    clientId.value = typeof baseline === "string" ? baseline : "";
    ready.value = true;
    status.value = "";
  } catch {
    if (!disposed && current === version) status.value = "配置读取失败，保存已禁用。";
  }
}
async function save() {
  if (!props.visible || !ready.value || busy.value || todoistModuleState.pendingWrites) return true;
  const value = clientId.value.trim();
  // 允许留空！如果用户留空，清空存储中的 Client ID
  if (value && !/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(value)) {
    status.value = "请输入有效的 Google OAuth Client ID（以 .apps.googleusercontent.com 结尾），或留空使用纯本地模式。";
    return false;
  }
  if (value === baseline) { status.value = ""; return true; }
  busy.value = true;
  try {
    await withTodoistWrite(async () => {
      if (!navigator.locks) throw new Error();
      await navigator.locks.request("lw-google-calendar-config", { signal: AbortSignal.timeout(10000) }, async () => {
        const latest = await chrome.storage.local.get(KEY);
        if (latest[KEY] !== baseline) throw new Error();
        if (value) {
          await chrome.storage.local.set({ [KEY]: value });
        } else {
          await chrome.storage.local.remove(KEY);
        }
      });
    });
    if (!disposed) {
      baseline = value;
      clientId.value = value;
      status.value = value ? "Google 日历 Client ID 已保存" : "已清除 Google 日历绑定（采用纯本地模式）";
    }
    return true;
  } catch {
    if (!disposed) status.value = "保存未确认或配置已被修改；草稿保留。";
    return false;
  } finally { busy.value = false; }
}

defineExpose({ save, load });
watch(() => props.visible, visible => { if (visible) void load(); else ++version; }, { immediate: true });
onBeforeUnmount(() => { disposed = true; ++version; clientId.value = ""; baseline = undefined; });
</script>

<template>
  <section class="calendar-connection">
    <div class="field-label-row">
      <label for="google-calendar-client-id">
        Google 日历 OAuth Client ID
        <small style="font-weight: normal; color: var(--muted); margin-left: 4px;">(可选 · 高级云端同步)</small>
      </label>
      <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" class="api-link">🔗 获取 Client ID</a>
    </div>
    <input id="google-calendar-client-id" v-model="clientId" :disabled="!ready || busy" autocomplete="off" spellcheck="false" placeholder="选填；留空不连接 Google 日历" />
    <p>选填：连接后可读取和管理 Google 日程；留空不启用 Google 日历，不影响 Todoist 的独立账号配置。</p>
    <p v-if="status" role="status" class="status-msg">{{ status }}</p>
  </section>
</template>

<style scoped>
.calendar-connection { margin-top:14px; padding-top:12px; border-top:1px solid var(--border); }
.field-label-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.field-label-row label { margin:0; font-size:13px; font-weight:600; }
.api-link { font-size:11px; color:var(--accent, #2563eb); text-decoration:none; font-weight:500; display:inline-flex; align-items:center; gap:3px; }
.api-link:hover { text-decoration:underline; }
input { width:100%; box-sizing:border-box; padding:8px; border:1px solid var(--border); border-radius:6px; background:var(--panel); color:var(--text); }
p { font-size:11px; line-height:1.5; color:var(--muted); margin-top:4px; }
.status-msg { color:var(--accent, #ea6418); font-weight:600; }
</style>
