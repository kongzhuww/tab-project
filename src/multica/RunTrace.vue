<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { multicaService, type MulticaRun, type MulticaRunMessage } from "../services/multica.service";

const props = defineProps<{ issueId: string; active: boolean }>();
const expanded = ref(false);
const runs = ref<MulticaRun[]>([]);
const runId = ref("");
const messages = ref<MulticaRunMessage[]>([]);
const loading = ref(false);
const error = ref("");
let generation = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const currentRun = computed(() => runs.value.find(r => r.id === runId.value));
const visibleMessages = computed(() => messages.value.filter(m => ["tool_use", "tool_result", "text", "error"].includes(m.type || "")));
function redact(input: string) {
  return input
    .replace(/(Bearer\s+)[A-Za-z0-9._~+\/-]+/gi, "$1[已隐藏]")
    .replace(/((?:api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret|authorization)\s*[=:]\s*[\"']?)[^\s\"',;]+/gi, "$1[已隐藏]")
    .replace(/\b(?:sk-[A-Za-z0-9_-]{12,}|mul_[A-Za-z0-9_-]{12,}|mat_[A-Za-z0-9_-]{12,})\b/g, "[已隐藏]")
    .slice(0, 8000);
}
function toText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") {
    // Pi tool results may be JSON envelopes; extract just their textual output.
    if (value.startsWith("{")) {
      try {
        const parsed = JSON.parse(value);
        if (typeof parsed?.structuredContent?.output === "string") return redact(parsed.structuredContent.output);
      } catch { /* plain text */ }
    }
    return redact(value);
  }
  if (typeof value === "object") {
    const item = value as Record<string, unknown>;
    if (typeof item.command === "string") return redact(item.command);
    return redact(JSON.stringify(value, (key, val) => /token|password|secret|api.?key|authorization/i.test(key) ? "[已隐藏]" : val, 2));
  }
  return redact(String(value));
}
function label(message: MulticaRunMessage): string {
  if (message.type === "tool_use") return `› ${message.tool || "工具调用"}`;
  if (message.type === "tool_result") return "↳ 输出";
  if (message.type === "error") return "! 错误";
  return "● 回复";
}
function body(message: MulticaRunMessage): string {
  return toText(message.type === "tool_use" ? message.input : message.type === "tool_result" ? message.output : message.content);
}
function stop() { generation++; if (timer) clearTimeout(timer); timer = undefined; }
async function refresh() {
  if (!expanded.value || !props.active || document.visibilityState !== 'visible') return;
  stop();
  const g = generation; loading.value = true; error.value = "";
  try {
    const issueId = props.issueId;
    const list = await multicaService.issueRuns(issueId);
    if (g !== generation) return;
    runs.value = [...list].sort((a,b) => (b.created_at || b.started_at || "").localeCompare(a.created_at || a.started_at || ""));
    if (!runs.value.some(r => r.id === runId.value)) runId.value = runs.value[0]?.id || "";
    if (runId.value) {
      const result = await multicaService.runMessages(runId.value);
      if (g !== generation) return;
      messages.value = result;
    } else messages.value = [];
    if (currentRun.value && ["queued", "dispatched", "running", "waiting_local_directory"].includes(currentRun.value.status)) {
      timer = setTimeout(() => void refresh(), 7000);
    }
  } catch (e) { if (g === generation) error.value = e instanceof Error ? e.message : "执行记录读取失败"; }
  finally { if (g === generation) loading.value = false; }
}
function toggle() { expanded.value = !expanded.value; if (expanded.value) void refresh(); else { stop(); loading.value = false; } }
function changeRun() { messages.value = []; void refresh(); }
watch(() => props.issueId, () => { stop(); runId.value = ""; runs.value = []; messages.value = []; error.value = ""; loading.value = false; if (expanded.value && props.active) void refresh(); });
watch(() => props.active, active => { if (!active) { stop(); loading.value = false; } else if (expanded.value) void refresh(); });
function onVisibilityChange() {
  if (document.visibilityState !== 'visible') { stop(); loading.value = false; }
  else if (expanded.value && props.active) void refresh();
}
onMounted(() => document.addEventListener('visibilitychange', onVisibilityChange));
onBeforeUnmount(() => { stop(); document.removeEventListener('visibilitychange', onVisibilityChange); });
</script>
<template>
  <section class="trace-section">
    <div class="trace-head"><div><strong>执行过程</strong><small>真实运行记录 · 可随时收起</small></div><button type="button" :aria-expanded="expanded" @click="toggle">{{ expanded ? '隐藏操作' : '显示操作' }}</button></div>
    <div v-if="expanded" class="trace-panel">
      <div class="toolbar"><span><span class="indicator" :class="{running: currentRun?.status === 'running'}"></span> {{ currentRun?.status || '暂无运行' }}</span><select v-if="runs.length > 1" v-model="runId" aria-label="选择运行记录" @change="changeRun"><option v-for="run in runs" :key="run.id" :value="run.id">{{ run.created_at ? new Date(run.created_at).toLocaleString() : run.id.slice(0,8) }} · {{ run.status }}</option></select><button type="button" :disabled="loading" @click="refresh">{{ loading ? '读取中…' : '刷新' }}</button></div>
      <p class="warning">记录可能包含路径、命令或敏感信息；已做基础遮盖，但不能保证完全脱敏。运行中的记录约每 7 秒刷新。</p>
      <p v-if="error" class="error" role="alert">{{ error }}（已暂停自动刷新，可手动重试）</p>
      <p v-if="!runs.length && !loading && !error" class="placeholder">这条任务还没有运行记录。</p>
      <p v-else-if="runs.length && !visibleMessages.length && !loading && !error" class="placeholder">该次运行暂无可展示的操作。</p>
      <div v-for="(message, i) in visibleMessages" :key="message.seq ?? i" class="entry"><div class="entry-label">{{ label(message) }}</div><pre>{{ body(message) || '（无文本）' }}</pre></div>
      <div v-if="currentRun?.error" class="entry"><div class="entry-label fail">! 运行错误</div><pre>{{ toText(currentRun.error) }}</pre></div>
    </div>
  </section>
</template>
<style scoped>
.trace-section { margin-top:18px; border:1px solid var(--border,#e2e8f0); border-radius:9px; overflow:hidden; }.trace-head { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; }.trace-head strong,.trace-head small { display:block; }.trace-head small { margin-top:3px; color:var(--muted,#64748b); font-size:10px; }.trace-head button { border:1px solid var(--border,#cbd5e1); border-radius:6px; background:var(--surface,#fff); color:var(--text,#334155); padding:5px 9px; cursor:pointer; font-size:11px; }.trace-panel { background:#111827; color:#d1d5db; padding:12px; max-height:400px; overflow:auto; font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace; }.toolbar { display:flex; gap:8px; align-items:center; color:#a5b4fc; }.toolbar span:first-child { flex:1; }.toolbar select,.toolbar button { color:#d1d5db; background:#1f2937; border:1px solid #475569; border-radius:5px; padding:3px 7px; font:inherit; }.indicator { display:inline-block; width:7px; height:7px; border-radius:50%; background:#64748b; }.indicator.running { background:#4ade80; }.warning,.placeholder { color:#94a3b8; }.warning { font-family:system-ui,sans-serif; font-size:11px; }.error,.fail { color:#fbbf24; }.entry { border-top:1px solid #334155; padding:8px 0; }.entry-label { color:#93c5fd; margin-bottom:3px; }.entry pre { margin:0; white-space:pre-wrap; overflow-wrap:anywhere; font:inherit; }
</style>
