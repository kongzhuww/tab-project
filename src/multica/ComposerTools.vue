<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
const props = defineProps<{ panelOpen: boolean; openUp?: boolean; selected?: 'aihot' | 'bilibili' | 'github' | 'todoist' | null }>();
const emit = defineEmits<{ select: [kind: 'aihot' | 'bilibili' | 'github' | 'todoist'] }>();
const open = ref(false);
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const firstOption = ref<HTMLButtonElement | null>(null);
function close(focus = false) { open.value = false; if (focus) void nextTick(() => trigger.value?.focus()); }
function selectTool(kind: 'aihot' | 'bilibili' | 'github' | 'todoist') { close(true); emit('select', kind); }
function onOutside(event: PointerEvent) { if (root.value && !root.value.contains(event.target as Node)) close(); }
function onFocusOut(event: FocusEvent) { if (root.value && !root.value.contains(event.relatedTarget as Node | null)) close(); }
function onTriggerKey(event: KeyboardEvent) { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open.value = true; void nextTick(() => firstOption.value?.focus()); } }
function onMenuKey(event: KeyboardEvent) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const options = Array.from(root.value?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') || []);
  if (!options.length) return;
  const current = options.indexOf(document.activeElement as HTMLButtonElement);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : event.key === 'ArrowDown' ? (current + 1) % options.length : (current <= 0 ? options.length - 1 : current - 1);
  options[next]?.focus();
}
onMounted(() => document.addEventListener('pointerdown', onOutside));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside));
</script>
<template>
  <div ref="root" class="tools" @focusout="onFocusOut" @keydown.esc.stop.prevent="close(true)">
    <button ref="trigger" type="button" class="tools-trigger" :class="{active:open || props.panelOpen}" aria-label="添加工具" aria-haspopup="menu" :aria-expanded="open" @click="open=!open" @keydown="onTriggerKey">{{ open ? '×' : '＋' }}</button>
    <Transition name="tools-pop"><div v-if="open" class="tools-menu" :class="{above:openUp}" role="menu" aria-label="添加工具" @keydown="onMenuKey"><button ref="firstOption" type="button" role="menuitem" :class="{chosen:selected==='aihot'}" @click="selectTool('aihot')"><span class="tool-icon">✦</span><span>AI Hot 文章</span><span class="arrow">{{ selected==='aihot'?'✓':'›' }}</span></button><button type="button" role="menuitem" :class="{chosen:selected==='bilibili'}" @click="selectTool('bilibili')"><span class="tool-icon bili-icon">▶</span><span>B 站视频</span><span class="arrow">{{ selected==='bilibili'?'✓':'›' }}</span></button><button type="button" role="menuitem" :class="{chosen:selected==='github'}" @click="selectTool('github')"><span class="tool-icon github-icon">⌘</span><span>GitHub 仓库</span><span class="arrow">{{ selected==='github'?'✓':'›' }}</span></button><button type="button" role="menuitem" :class="{chosen:selected==='todoist'}" @click="selectTool('todoist')"><span class="tool-icon todoist-icon">✓</span><span>Todoist 待办</span><span class="arrow">{{ selected==='todoist'?'✓':'›' }}</span></button></div></Transition>
  </div>
</template>
<style scoped>
.tools { flex:none; position:relative; }.tools-trigger { width:34px; height:34px; display:grid; place-items:center; padding:0; border:0; border-radius:50%; background:transparent; color:var(--text,#52627a); font:inherit; font-size:21px; line-height:1; cursor:pointer; }.tools-trigger:hover,.tools-trigger.active { background:#ebedff; color:#7569ec; }.tools-trigger:focus-visible,.tools-menu button:focus-visible { outline:2px solid #64b5ef; outline-offset:2px; }.tools-menu { position:absolute; z-index:25; left:0; top:calc(100% + 12px); width:220px; padding:6px; border:1px solid var(--border,#e4e8ef); border-radius:12px; background:var(--panel,#fff); box-shadow:0 8px 26px #17243b24; }.tools-menu.above { top:auto; bottom:calc(100% + 12px); }.tools-menu button { width:100%; display:flex; align-items:center; gap:10px; padding:10px; border:0; border-radius:8px; background:transparent; color:var(--text,#29364b); font:inherit; font-size:13px; text-align:left; cursor:pointer; }.tools-menu button:hover { background:var(--surface,#f2f4f8); }.tool-icon { width:26px; height:26px; display:grid; place-items:center; border-radius:8px; color:#7569ec; background:rgba(129,112,244,.1); }.arrow { margin-left:auto; color:#9aa8bc; font-size:18px; }
.todoist-icon { color:#dc4c3e; background:rgba(220,76,62,.1); }.bili-icon { color:#fb7299; background:rgba(251,114,153,.1); }.github-icon { color:#64748b; background:rgba(100,116,139,.1); }
.tools-trigger{transition:background-color .18s ease,color .18s ease,transform .18s ease}.tools-trigger:active{transform:scale(.91)}.tools-menu{transform-origin:top left}.tools-menu.above{transform-origin:bottom left}.tools-menu button{transition:background-color .16s ease,color .16s ease}.tools-menu button.chosen{background:rgba(117,105,236,.09);color:#7569ec}.tools-menu button.chosen .arrow{color:#7569ec;font-size:13px}.tool-icon{transition:transform .18s ease}.tools-menu button:hover .tool-icon,.tools-menu button:focus-visible .tool-icon{transform:scale(1.08)}.tools-pop-enter-active{transition:opacity .16s ease,transform .2s cubic-bezier(.2,.8,.2,1)}.tools-pop-leave-active{transition:opacity .1s ease,transform .1s ease}.tools-pop-enter-from,.tools-pop-leave-to{opacity:0;transform:translateY(-4px) scale(.97)}.tools-menu.above.tools-pop-enter-from,.tools-menu.above.tools-pop-leave-to{transform:translateY(4px) scale(.97)}@media(prefers-reduced-motion:reduce){.tools-trigger,.tools-menu button,.tool-icon,.tools-pop-enter-active,.tools-pop-leave-active{transition:none!important}}
</style>
