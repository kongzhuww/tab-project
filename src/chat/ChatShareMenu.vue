<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type CSSProperties } from "vue";
import { useContextMenu } from "../sdk/interactions";
import { privateChatConfig } from "./private-chat-config";
import { loadChatShareTargets, type ChatShareTarget } from "./private-chat-client";
const props = withDefaults(defineProps<{ visible?: boolean; disabled?: boolean; label?: string; compact?: boolean; matchMenuItem?: boolean }>(), { visible: true, disabled: false, label: "发送到", compact: false, matchMenuItem: false });
const emit = defineEmits<{ select: [target: ChatShareTarget]; open: [] }>();
const trigger = ref<HTMLElement | null>(null);
const referenceFont = ref<CSSProperties>({});
const labelIcon = computed(() => props.label.startsWith("🚀") ? "🚀" : "💬");
const labelText = computed(() => props.label.replace(/^(?:💬|🚀)\s*/, ""));
function matchReferenceFont(): void {
  referenceFont.value = {};
  if (!props.matchMenuItem) return;
  // Browser buttons need not inherit their parent's font. Match the actual peer,
  // not the body font or a guessed Windows/Chinese fallback family.
  const peer = trigger.value?.closest('[role="menu"]')?.querySelector<HTMLElement>(':scope > button[role="menuitem"]');
  if (!peer || peer === trigger.value) return;
  const font = getComputedStyle(peer);
  referenceFont.value = {
    fontFamily: font.fontFamily, fontSize: font.fontSize, fontWeight: font.fontWeight,
    fontStyle: font.fontStyle, fontVariant: font.fontVariant, lineHeight: font.lineHeight,
    letterSpacing: font.letterSpacing, wordSpacing: font.wordSpacing, textTransform: font.textTransform
  };
}
onMounted(matchReferenceFont);
watch(() => [props.visible, props.matchMenuItem], matchReferenceFont, { flush: "post" });
const opened = ref(false), loading = ref(false);
const targets = ref<ChatShareTarget[]>([]);
const error = ref("");
const anchor = ref({ x: 0, y: 0 });
let generation = 0, timer: ReturnType<typeof setTimeout> | undefined;
const groups = computed(() => {
  const result = new Map<string, ChatShareTarget[]>();
  for (const target of targets.value) {
    const group = target.name.split(" / ")[0];
    result.set(group, [...(result.get(group) || []), target]);
  }
  return [...result.entries()];
});
function clearTimer() { clearTimeout(timer); timer = undefined; }
function close() { clearTimer(); opened.value = false; generation++; }
const { menuRef, style } = useContextMenu({ visible: () => opened.value && props.visible, anchor: () => anchor.value, dismiss: close });
async function openMenu() {
  clearTimer();
  if (props.disabled || !props.visible || opened.value) return;
  matchReferenceFont();
  const bounds = trigger.value?.getBoundingClientRect(); if (!bounds) return;
  anchor.value = { x: bounds.right + 240 > window.innerWidth ? bounds.left - 240 : bounds.right + 4, y: bounds.top - 4 };
  opened.value = true; loading.value = true; error.value = ""; targets.value = [];
  emit("open");
  const version = ++generation;
  try { const result = await loadChatShareTargets(); if (version === generation) targets.value = result; }
  catch (e) { if (version === generation) error.value = e instanceof Error ? e.message : "房间列表读取失败，请重试。"; }
  finally { if (version === generation) loading.value = false; }
}
function delayClose() { clearTimer(); timer = setTimeout(close, 280); }
function select(target: ChatShareTarget) { const frozen = { ...target }; close(); emit("select", frozen); }
watch(() => [props.visible, props.disabled, JSON.stringify(privateChatConfig.room)], () => { close(); });
onBeforeUnmount(close);
</script>
<template>
  <div class="chat-share-menu" :class="{ compact }" :style="{ fontFamily: referenceFont.fontFamily }" @mouseenter="openMenu" @mouseleave="delayClose" @keydown.esc.stop.prevent="close">
    <button ref="trigger" type="button" class="chat-share-trigger" :style="referenceFont" :disabled="disabled" aria-haspopup="menu" :aria-expanded="opened" @click.stop="openMenu" @keydown.right.stop.prevent="openMenu" @keydown.down.stop.prevent="openMenu"><span class="chat-share-label-wrap"><span class="chat-share-icon" aria-hidden="true">{{ labelIcon }}</span><span>{{ labelText }}</span></span><span class="share-arrow" aria-hidden="true">›</span></button>
    <div v-if="opened && visible" ref="menuRef" class="share-room-flyout" :style="[style, { maxHeight: 'min(360px, calc(100vh - 16px))' }]" role="menu" aria-label="选择目标聊天室房间" @mouseenter="clearTimer" @mouseleave="delayClose" @click.stop @wheel.stop>
      <p v-if="loading" class="share-hint" role="status">正在读取房间…</p>
      <template v-else-if="error"><p class="share-hint" role="status">{{ error }}</p><button type="button" class="share-room-item" :style="referenceFont" @click.stop="close(); openMenu()">重新读取</button></template>
      <template v-else>
        <p v-if="!targets.length" class="share-hint">暂无可发送的房间</p>
        <div v-for="[group, rooms] in groups" :key="group" role="group" :aria-label="group">
          <div class="share-space-label">{{ group }}</div>
          <button v-for="target in rooms" :key="target.channel" type="button" class="share-room-item" :style="referenceFont" role="menuitem" :title="target.name" @click.stop="select(target)"><span aria-hidden="true">#</span><span>{{ target.name.slice(target.name.indexOf(' / ') + 3) }}</span></button>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.chat-share-menu { position: relative; width: 100%; min-width: 0; }
.chat-share-menu.compact { width: auto; display: inline-flex; }
/* Parent scoped .fo-context-icon does not reach this component. */
.chat-share-icon { font-size: 13px; opacity: 0.8; flex-shrink: 0; }
.chat-share-label-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-share-menu .chat-share-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text, #1e293b);
  cursor: pointer;
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  text-align: left;
  transition: background 0.12s ease, color 0.12s ease;
  box-sizing: border-box;
}
.chat-share-trigger:hover, .chat-share-trigger[aria-expanded="true"] {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: #0284c7;
}
:root[data-theme="dark"] .chat-share-trigger {
  color: var(--text, #f1f5f9);
}
:root[data-theme="dark"] .chat-share-trigger:hover,
:root[data-theme="dark"] .chat-share-trigger[aria-expanded="true"] {
  background: rgba(255, 255, 255, 0.08);
  color: #38bdf8;
}
.compact .chat-share-trigger { border: 1px solid var(--border); background: var(--panel); }
.share-arrow {
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
  line-height: 1;
}
.share-room-flyout {
  z-index: 100010;
  width: 200px;
  padding: 6px;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 10px;
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0, 0, 0, 0.08);
  overscroll-behavior: contain;
  scrollbar-width: thin;
  font-family: inherit;
  user-select: none;
}
:root[data-theme="dark"] .share-room-flyout {
  background: var(--panel, #1e293b);
  border-color: var(--border, rgba(255, 255, 255, 0.14));
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.45);
  color: var(--text, #f8fafc);
}
.share-room-flyout .share-room-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  padding: 6px 9px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text, #1e293b);
  text-align: left;
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}
:root[data-theme="dark"] .share-room-flyout .share-room-item {
  color: var(--text, #f1f5f9);
}
.share-room-item:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: #0284c7;
}
:root[data-theme="dark"] .share-room-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #38bdf8;
}
.share-room-item > span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.share-space-label {
  padding: 6px 8px 3px;
  color: var(--muted, #64748b);
  font-size: 10.5px;
  font-weight: 700;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  margin-bottom: 3px;
}
.share-hint { padding: 8px; margin: 0; font-size: 12px; color: var(--muted); overflow-wrap: anywhere; line-height: 1.6; }
button:disabled { opacity: .5; cursor: default; }
button:focus-visible { outline: 2px solid var(--heading); outline-offset: -2px; }
</style>
