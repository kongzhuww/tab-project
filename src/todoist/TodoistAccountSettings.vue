<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import { todoistModuleState } from "./module-state";
import { ModuleSettingsPanel } from "../sdk/ui";
import { loadTodoistAccountToken, saveTodoistAccountToken } from "./account-settings";
const props = defineProps<{ anchor: HTMLElement | null; visible: boolean }>();
const emit = defineEmits<{ close: []; accountSaved: [] }>();
const token = ref("");
const ready = ref(false);
const busy = ref(false);
const message = ref("");
let initial = "";
let loadVersion = 0;

async function load() {
  if (ready.value || !props.visible) return;
  const version = ++loadVersion;
  try {
    const value = await loadTodoistAccountToken();
    if (version !== loadVersion || !props.visible) return;
    initial = value; token.value = value; ready.value = true;
  } catch { if (version === loadVersion) message.value = "读取失败，保存禁用，请重新读取。"; }
}
watch(() => props.visible, visible => { if (visible) void load(); else loadVersion++; }, { immediate: true });
onUnmounted(() => { loadVersion++; token.value = ""; initial = ""; });
async function saveAll() {
  if (!ready.value || busy.value || !props.visible) return;
  if (todoistModuleState.pendingWrites) { message.value = "任务或配置正在写入，请稍后再保存。"; return; }
  busy.value = true;
  message.value = "";
  try {
    let changed = false;
    if (token.value !== initial) {
      await saveTodoistAccountToken(token.value);
      initial = token.value.trim();
      token.value = initial;
      changed = true;
      emit("accountSaved");
    }

    message.value = changed ? "✅ 配置已成功保存！" : "配置未变动。";
  } catch (err: any) {
    message.value = `❌ 保存失败：${err?.message || "请检查输入后重试"}`;
  } finally {
    busy.value = false;
  }
}
</script>
<template>
  <ModuleSettingsPanel :anchor="anchor" :visible="visible" label="Todoist 设置" @close="emit('close')">
    <div class="todoist-account-settings">
      <header><strong>Todoist 与日程配置</strong><button type="button" aria-label="关闭设置" @click="emit('close')">✕</button></header>
      <p>配置保存在本地浏览器；连接服务时，必要的账号信息会发送给对应服务。</p>

      <div class="field-label-row">
        <label for="todoist-account-token">Todoist API Token</label>
        <a href="https://app.todoist.com/app/settings/integrations/developer" target="_blank" rel="noreferrer" class="api-link">🔗 获取 Todoist Token</a>
      </div>
      <input id="todoist-account-token" v-model="token" type="password" autocomplete="off" :disabled="!ready || busy" placeholder="请输入你的 Todoist API Token" />

      <p v-if="message" role="status" class="status-msg">{{ message }}</p>
      <button v-if="!ready" type="button" @click="load">重新读取</button>
      <footer style="justify-content: flex-end;">
        <button type="button" class="btn-primary-save" :disabled="!ready || busy" @click="saveAll">
          {{ busy ? '保存中…' : '💾 保存全部配置' }}
        </button>
      </footer>
    </div>
  </ModuleSettingsPanel>
</template>
<style scoped>
.todoist-account-settings { padding:14px; }
header, footer { display:flex; align-items:center; justify-content:space-between; gap:8px; }
p { font-size:12px; line-height:1.5; color:var(--muted); }
.hint { font-size:11px; margin-top:4px; opacity:0.85; }
.status-msg { color:var(--accent, #ea6418); font-weight:600; margin-top:8px; }
label { display:block; margin:0; font-size:13px; font-weight:600; }
.field-label-row { display:flex; align-items:center; justify-content:space-between; margin:12px 0 6px; }
.api-link { font-size:11px; color:var(--accent, #2563eb); text-decoration:none; font-weight:500; display:inline-flex; align-items:center; gap:3px; }
.api-link:hover { text-decoration:underline; }
.sub-hint { font-size:11px; color:var(--muted); font-weight:normal; }
.btn-primary-save { background:var(--accent, #10b981) !important; color:#fff !important; border-color:transparent !important; font-weight:600; padding:7px 16px !important; border-radius:6px; }
.btn-primary-save:hover:not(:disabled) { opacity:0.9; }
input { width:100%; box-sizing:border-box; padding:8px; border:1px solid var(--border); border-radius:6px; background:var(--panel); color:inherit; }
button { background:var(--panel); color:inherit; border:1px solid var(--border); border-radius:6px; padding:6px 8px; cursor:pointer; }
button:disabled { opacity:.5; cursor:default; }
footer { margin-top:14px; flex-wrap:wrap; }
</style>
