<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { MulticaAgent, MulticaRuntime } from "../services/multica.service";
import LoadingIndicator from './LoadingIndicator.vue';

const props = defineProps<{ modelValue: string; agents: MulticaAgent[]; runtimes: MulticaRuntime[]; disabled?: boolean; loading?: boolean; error?: string; openUp?: boolean; fallbackName?: string }>();
const emit = defineEmits<{ 'update:modelValue': [id: string]; retry: [] }>();
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const list = ref<HTMLElement | null>(null);
const open = ref(false);
const chosen = computed(() => props.agents.find(agent => agent.id === props.modelValue));
function runtimeName(id?: string) { return props.runtimes.find(runtime => runtime.id === id)?.name || "未绑定运行时"; }
function close(restoreFocus = false) { open.value = false; if (restoreFocus) void nextTick(() => trigger.value?.focus()); }
function choose(id: string) { emit('update:modelValue', id); close(true); }
function onOutside(event: PointerEvent) { if (root.value && !root.value.contains(event.target as Node)) close(); }
function onTriggerKey(event: KeyboardEvent) {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  event.preventDefault(); open.value = true;
  void nextTick(() => {
    const options = list.value?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    if (!options?.length) return;
    const index = props.agents.findIndex(agent => agent.id === props.modelValue);
    options[index >= 0 ? index : event.key === 'ArrowUp' ? options.length - 1 : 0]?.focus();
  });
}
function onListKey(event: KeyboardEvent) {
  if (event.key === 'Escape') { event.preventDefault(); close(true); return; }
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const options = Array.from(list.value?.querySelectorAll<HTMLButtonElement>('[role="option"]') || []);
  if (!options.length) return;
  const current = options.indexOf(document.activeElement as HTMLButtonElement);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : event.key === 'ArrowDown' ? (current + 1) % options.length : (current <= 0 ? options.length - 1 : current - 1);
  options[next]?.focus();
}
function onFocusOut(event: FocusEvent) { if (root.value && !root.value.contains(event.relatedTarget as Node | null)) close(); }
watch(() => props.disabled || props.loading, disabled => { if (disabled) close(); });
onMounted(() => document.addEventListener('pointerdown', onOutside));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside));
</script>
<template>
  <div ref="root" class="agent-picker" @focusout="onFocusOut" @keydown.esc.stop.prevent="close(true)">
    <button ref="trigger" type="button" class="picker-trigger" :disabled="disabled || loading || (!agents.length && !error)" :aria-expanded="open" :aria-label="error ? '助手加载失败，点击重试' : '选择智能体'" :title="error || undefined" aria-haspopup="listbox" @click="error ? emit('retry') : open=!open" @keydown="!error && onTriggerKey($event)"><LoadingIndicator v-if="loading" label="加载助手" /><span v-else-if="error">加载失败 · 重试</span><span v-else>{{ chosen?.name || fallbackName || '没有在线助手' }}</span><span v-if="!loading && !error" class="chevron" :class="{up:open}">⌄</span></button>
    <div v-if="open" ref="list" class="picker-menu" :class="{ 'opens-up': openUp }" role="listbox" aria-label="选择在线智能体" @keydown="onListKey"><button v-for="agent in agents" :key="agent.id" type="button" role="option" :aria-selected="agent.id === modelValue" class="picker-option" :class="{chosen:agent.id===modelValue}" @click="choose(agent.id)"><span class="option-icon">✦</span><span class="option-copy"><strong>{{ agent.name }}</strong><small>{{ agent.model || '运行时默认模型' }} · {{ runtimeName(agent.runtime_id) }}</small></span><span v-if="agent.id===modelValue" class="check">✓</span></button></div>
  </div>
</template>
<style scoped>
.agent-picker { position:relative; flex:none; min-width:0; }.picker-trigger { display:flex; align-items:center; gap:8px; max-width:170px; border:0; border-radius:8px; padding:8px; background:transparent; color:var(--text,#35445d); font:inherit; font-size:12px; cursor:pointer; }.picker-trigger:hover,.picker-trigger[aria-expanded="true"] { background:var(--surface,#f2f4f8); }.picker-trigger:focus-visible { outline:2px solid #64b5ef; outline-offset:1px; }.picker-trigger span:first-child { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.chevron { color:#8290a6; font-size:15px; line-height:1; transition:transform .15s; }.chevron.up { transform:rotate(180deg); }.picker-menu { position:absolute; right:0; top:calc(100% + 10px); z-index:20; width:280px; max-width:min(280px,75vw); max-height:250px; overflow:auto; padding:5px; border:1px solid var(--border,#dce3ec); border-radius:10px; background:var(--panel,#fff); box-shadow:0 8px 24px #17243b26; }.picker-option { width:100%; display:flex; align-items:center; gap:9px; padding:8px 9px; text-align:left; border:0; border-radius:7px; background:transparent; color:var(--text,#29364b); cursor:pointer; font:inherit; }.picker-option:hover,.picker-option:focus-visible { background:var(--surface,#eef1f5); outline:none; }.picker-option.chosen { background:rgba(98,154,225,.11); }.option-icon { display:grid; place-items:center; flex:none; width:28px; height:28px; border-radius:8px; color:#806fe4; background:rgba(129,112,244,.11); }.option-copy { min-width:0; flex:1; }.option-copy strong,.option-copy small { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.option-copy strong { font-size:12px; }.option-copy small { margin-top:2px; font-size:10px; color:#97a4b8; }.check { color:#6c8fe5; font-size:13px; }
.picker-menu.opens-up { top:auto; bottom:calc(100% + 10px); }
@media(max-width:850px) { .picker-trigger { max-width:110px; } }
</style>
