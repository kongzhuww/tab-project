<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import type { AiHotFeedArticle } from "../aihot/aihot-feed-store";
import { messageWithArticles } from "./session-content";
import ProviderPicker from "./ProviderPicker.vue";
import { useByokChat } from './use-byok-chat';
import { useNativeAgent } from './use-native-agent';
import ConversationSidebar from './ConversationSidebar.vue';
import ComposerTools from "./ComposerTools.vue";
import ClawdMascot from "./ClawdMascot.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
import ResourceAttachmentCard from "./ResourceAttachment.vue";
import { messageWithResources, RESOURCE_LIMIT, type ResourceAttachment } from "./resource-content";
import { parseTodoistResource, TODOIST_RESOURCE_MIME } from '../todoist/task-resource';
import { shouldSendComposer } from "./composer-keyboard";
import { aiWorkspaceBridge } from "./workspace-bridge";
import { buildSessionTelemetry, extractChangedFiles, formatCompactK, parseContextWindowSize, type HudTurnInput } from "./token-hud";

const TokenHudPopover = defineAsyncComponent(() => import('./TokenHudPopover.vue'));
const CipherRippleCanvas = defineAsyncComponent(() => import('./CipherRippleCanvas.vue'));
const HomeUsageCard = defineAsyncComponent(() => import('./HomeUsageCard.vue'));

const AiHotPanel = defineAsyncComponent(() => import('./AiHotPanel.vue'));
const ResourcePanel = defineAsyncComponent(() => import('./ResourcePanel.vue'));
const TodoistPanel = defineAsyncComponent(() => import('./TodoistPanel.vue'));
const AiSettings = defineAsyncComponent(() => import('./AiSettings.vue'));
const AiSchedulePanel = defineAsyncComponent(() => import('./AiSchedulePanel.vue'));
const EmployeesPanel = defineAsyncComponent(() => import('../agents/EmployeesPanel.vue'));
const BackpackLibrary = defineAsyncComponent(() => import('../backpack/BackpackDialog.vue'));
const MessageMarkdown = defineAsyncComponent({
  loader: () => import('./MessageMarkdown.vue'),
  loadingComponent: defineComponent({ setup: () => () => h(LoadingIndicator, { label: '正在加载内容' }) }),
  errorComponent: defineComponent({ props: { content: String }, setup: props => () => h('div', { style: 'white-space:pre-wrap' }, props.content || '') }),
  delay: 150
});

const service = ref<'deepseek' | 'native'>('native');
const workspaceSection = ref<'chat' | 'library' | 'schedule' | 'agents'>('chat');
const libraryOpened = ref(false), scheduleOpened = ref(false), agentsOpened = ref(false);
const workspaceVisible = computed(() => fullscreenCardState.activeId === 'multica');
const byok = useByokChat();
const { conversations: localConversations, current: byokCurrent, currentId: byokCurrentId, error: byokError, configured: byokConfigured, model: byokModel, providerLabel: byokLabel, effort: byokEffort, sending: byokSending } = byok;
const nativeAgent = useNativeAgent();
const { conversations: nativeConversations, current: nativeCurrent, currentId: nativeCurrentId, error: nativeError, connected: nativeConnected, hostInfo: nativeHostInfo, discoveredAgents: nativeDiscoveredAgents, acpProfiles: nativeAcpProfiles, activeAgentId: nativeActiveAgentId, activeAgentLabel: nativeActiveAgentLabel, piModels: nativePiModels, activeModel: nativeActiveModel, activeThinking: nativeActiveThinking, piToolsEnabled: nativeToolsEnabled, sending: nativeSending } = nativeAgent;
const deepseekModels = ref<string[]>([]);
async function refreshByokConfig() { try { const c = await byok.refreshConfig(); deepseekModels.value = c.configured ? (c.models.length ? c.models : [c.model].filter(Boolean)) : []; } catch { deepseekModels.value = []; } }
async function refreshLocalConversations() { try { await byok.refreshHistory(); } catch { byokError.value = '本地会话读取失败。'; } }
async function refreshNativeAgent() { await Promise.all([nativeAgent.refreshStatus(), nativeAgent.refreshHistory()]); }
onMounted(() => { void refreshByokConfig(); void refreshLocalConversations(); void refreshNativeAgent(); });
watch(workspaceVisible, visible => {
  if (visible) {
    void refreshByokConfig();
    void refreshLocalConversations();
    void refreshNativeAgent();
  } else {
    activePanel.value = null;
    settingsOpen.value = false;
    settingsBusy.value = false;
  }
});
function openLocalConversation(id: string) { if (anySending.value) return; workspaceSection.value = 'chat'; byok.selectChat(id); service.value = 'deepseek'; }
function openNativeConversation(id: string) { if (anySending.value) return; workspaceSection.value = 'chat'; nativeAgent.selectChat(id); service.value = 'native'; }
function chooseDeepseek(model: string) {
  if (service.value !== 'deepseek') { byok.newChat(); service.value = 'deepseek'; }
  void byok.chooseModel(model);
}
function chooseNative(agentId = 'pi', modelId = '') {
  if (anySending.value) return;
  workspaceSection.value = 'chat';
  if (service.value !== 'native') nativeAgent.newChat();
  service.value = 'native';
  void nativeAgent.chooseAgentAndModel(agentId, modelId);
  void nativeAgent.refreshStatus();
}
function newConversation() { if (anySending.value) return; workspaceSection.value = 'chat'; if (service.value === 'deepseek') byok.newChat(); else nativeAgent.newChat(); }
const notice = ref("");
const settingsOpen = ref(false), settingsBusy = ref(false);
const settingsTab = ref<'deepseek' | 'native'>('native');
function openSettings(tab: 'deepseek' | 'native' = service.value) { settingsTab.value = tab; settingsOpen.value = true; }
const activePanel = ref<'aihot' | 'bilibili' | 'github' | 'todoist' | null>(null);
const todoistPanelOpened = ref(false);
watch(activePanel, panel => { if (panel === 'todoist') todoistPanelOpened.value = true; });
const resourceBrowserOpen = computed(() => workspaceSection.value === 'chat' && Boolean(activePanel.value));
const composerWrap = ref<HTMLElement | null>(null);
let composerMotion: Animation | undefined;
let composerMotionVersion = 0;
watch([resourceBrowserOpen, () => currentConversation.value], async () => {
  const node = composerWrap.value;
  if (!node || !workspaceVisible.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const before = node.getBoundingClientRect();
  composerMotion?.cancel();
  const version = ++composerMotionVersion;
  await nextTick();
  if (version !== composerMotionVersion || !node.isConnected || node !== composerWrap.value || !workspaceVisible.value) return;
  const after = node.getBoundingClientRect();
  const x = before.left - after.left, y = before.top - after.top;
  if (Math.abs(x) < 1 && Math.abs(y) < 1) return;
  composerMotion = node.animate(
    [{ transform: `translate3d(${x}px, ${y}px, 0)` }, { transform: 'translate3d(0, 0, 0)' }],
    { duration: 640, easing: 'cubic-bezier(.25, .9, .3, 1)' }
  );
}, { flush: 'pre' });
onBeforeUnmount(() => { composerMotionVersion++; composerMotion?.cancel(); });
const dragged = ref<{ kind:'resource'; value:ResourceAttachment } | { kind:'article'; value:AiHotFeedArticle } | null>(null);
const todoistDragOver = ref(false);
function hasTodoistDrag(event:DragEvent) { return activePanel.value === 'todoist' && Array.from(event.dataTransfer?.types || []).includes(TODOIST_RESOURCE_MIME); }
function acceptDrag(event:DragEvent) { if ((dragged.value || hasTodoistDrag(event)) && !anySending.value) { event.preventDefault(); if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'; todoistDragOver.value = hasTodoistDrag(event); } }
function leaveComposer(event:DragEvent) { if (!event.currentTarget || !(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) todoistDragOver.value = false; }
function dropResource(event:DragEvent) {
  const todoist = hasTodoistDrag(event);
  todoistDragOver.value = false;
  if ((!dragged.value && !todoist) || anySending.value) return;
  event.preventDefault();
  if (todoist) {
    const resource = parseTodoistResource(event.dataTransfer?.getData(TODOIST_RESOURCE_MIME) || '');
    if (resource && !draft.value.resources.some(item => item.kind === 'todoist' && item.id === resource.id)) toggleResource(resource);
  } else {
    const item=dragged.value; dragged.value=null;
    if (!item) return;
    if (item.kind === 'article') {
      if (!draft.value.articles.some(article => article.url === item.value.url && article.title === item.value.title)) toggleArticle(item.value);
    } else if (!draft.value.resources.some(resource => resource.kind === item.value.kind && resource.id.toLowerCase() === item.value.id.toLowerCase())) toggleResource(item.value);
  }
  void nextTick(() => composerInput.value?.focus());
}
const composerInput = ref<HTMLTextAreaElement | null>(null);
const drafts = reactive<Record<string, { text: string; articles: AiHotFeedArticle[]; resources: ResourceAttachment[] }>>({ new: { text: "", articles: [], resources: [] } });
const draftKey = computed(() => service.value === 'native' ? (nativeCurrentId.value ? `native:${nativeCurrentId.value}` : 'new') : (byokCurrentId.value ? `byok:${byokCurrentId.value}` : 'new'));
const currentConversation = computed(() => service.value === 'native' ? Boolean(nativeCurrent.value) : Boolean(byokCurrent.value));
const anySending = computed(() => byokSending.value || nativeSending.value);
const draft = computed(() => drafts[draftKey.value] || (drafts[draftKey.value] = { text: "", articles: [], resources: [] }));
watch(() => [workspaceVisible.value, aiWorkspaceBridge.pending?.id, anySending.value] as const, async ([visible, id, busy]) => {
  if (!visible || !id || busy) return;
  const request = aiWorkspaceBridge.pending;
  if (!request || request.id !== id) return;
  if (request.kind === 'deepseek') {
    await refreshLocalConversations();
    if (!workspaceVisible.value || aiWorkspaceBridge.pending?.id !== id || anySending.value) return;
    if (!localConversations.value.some(item => item.id === request.conversationId)) { byokError.value = '该本地会话已不存在。'; aiWorkspaceBridge.pending = null; return; }
    openLocalConversation(request.conversationId);
  } else {
    newConversation();
    const existing = draft.value.text;
    draft.value.text = existing.trim() ? `${existing}\n\n${request.text}` : request.text;
    if (request.resource && !draft.value.resources.some(item => item.kind === request.resource!.kind && item.id.toLowerCase() === request.resource!.id.toLowerCase())) {
      if (draft.value.resources.length < RESOURCE_LIMIT) draft.value.resources.push(request.resource);
      else {
        const message = `草稿已有 ${RESOURCE_LIMIT} 个资源，仓库 ${request.resource.id} 未添加；请先移除一个资源再添加。`;
        if (service.value === 'deepseek') byokError.value = message; else notice.value = message;
      }
    }
    activePanel.value = null;
    void nextTick(() => composerInput.value?.focus());
  }
  if (aiWorkspaceBridge.pending?.id === id) aiWorkspaceBridge.pending = null;
}, { immediate: true });
function navigateWorkspace(section: 'library' | 'schedule' | 'agents') {
  workspaceSection.value = section; activePanel.value = null;
  if (section === 'library') libraryOpened.value = true;
  if (section === 'schedule') scheduleOpened.value = true;
  if (section === 'agents') agentsOpened.value = true;
}
function resizeComposer() {
  const input = composerInput.value;
  if (!input) return;
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
}
watch([draftKey, () => draft.value.text, workspaceVisible], () => { void nextTick(resizeComposer); }, { flush: "post" });
const copiedKey = ref('');
let copiedTimer: ReturnType<typeof setTimeout> | null = null;
async function copyMessage(text: string, key: string) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copiedKey.value = key;
    if (copiedTimer) clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => { if (copiedKey.value === key) copiedKey.value = ''; }, 1500);
  } catch {}
}
function relativeTimeLabel(ts?: number) {
  if (!ts) return '';
  const mins = Math.floor(Math.max(0, Date.now() - ts) / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  return `${Math.floor(hours / 24)}天前`;
}
function durationLabel(ms?: number) {
  if (typeof ms !== 'number' || !Number.isFinite(ms) || ms <= 0) return '';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms / 60000)}分钟`;
}
function usageDetail(
  usage?: { input?: number; output?: number; cacheRead?: number; reasoning?: number; totalTokens?: number } | null,
  durationMs?: number,
  stepsCount?: number
) {
  const input = usage?.input || 0;
  const output = usage?.output || 0;
  const cacheRead = usage?.cacheRead || 0;
  const reasoning = usage?.reasoning || 0;
  const ctxTotal = input + cacheRead;
  const totalTok = usage?.totalTokens || ctxTotal + output;
  const cachePct = ctxTotal > 0 && cacheRead > 0 ? Math.round((cacheRead / ctxTotal) * 100) : 0;
  const speed = durationMs && durationMs > 0 && output > 0 ? Math.round(output / (durationMs / 1000)) : 0;
  const ctxLabel = ctxTotal > 0 ? formatCompactK(ctxTotal) : totalTok > 0 ? formatCompactK(totalTok) : '';
  const deltaLabel = input > 0 && cacheRead > 0 ? `+${formatCompactK(input)}` : '';
  const outLabel = output > 0 ? formatCompactK(output) : '';
  const reasoningLabel = reasoning > 0 ? formatCompactK(reasoning) : '';
  return {
    hasAny: Boolean(ctxLabel || outLabel || reasoningLabel || stepsCount || speed || cachePct),
    ctxLabel,
    deltaLabel,
    outLabel,
    reasoningLabel,
    stepsCount: stepsCount || 0,
    speed,
    cachePct,
  };
}
function turnIndexOf(messages: Array<{ role: string }>, index: number) {
  let count = 0;
  for (let i = 0; i <= index; i++) {
    if (messages[i]?.role === 'assistant') count++;
  }
  return count;
}
function shortCwdLabel(cwd?: string) {
  if (!cwd) return '本机';
  const normalized = cwd.replace(/^\/Users\/[^/]+/, '~').replace(/^[A-Za-z]:\\Users\\[^\\]+/, '~');
  if (normalized.length <= 24) return normalized;
  const parts = normalized.split(/[\\/]/).filter(Boolean);
  return parts.length ? `…/${parts[parts.length - 1]}` : normalized;
}
const turnCountLabel = computed(() => {
  const list = service.value === 'native'
    ? nativeCurrent.value?.messages
    : byokCurrent.value?.messages;
  if (!list?.length) return '';
  const turns = list.filter((m: any) => m.role === 'assistant').length;
  return turns ? `${turns} 轮` : '';
});
const conversationEl = ref<HTMLElement | null>(null);
const activeRailIndex = ref(0);
const railAnchors = computed(() => {
  if (service.value === 'native' && nativeCurrent.value) {
    return nativeCurrent.value.messages
      .map((m, idx) => ({ idx, role: m.role, label: m.content.slice(0, 42) }))
      .filter(item => item.role === 'user');
  }
  if (service.value === 'deepseek' && byokCurrent.value) {
    return byokCurrent.value.messages
      .map((m, idx) => ({ idx, role: m.role, label: m.content.slice(0, 42) }))
      .filter(item => item.role === 'user');
  }
  return [];
});
function scrollToTurn(idx: number) {
  activeRailIndex.value = idx;
  const target = conversationEl.value?.querySelector<HTMLElement>(`[data-turn-anchor="${idx}"]`);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
watch(railAnchors, anchors => {
  if (anchors.length) activeRailIndex.value = anchors[anchors.length - 1].idx;
}, { immediate: true });
const hudOpen = ref(false);
const hudAnchorEl = ref<HTMLElement | null>(null);
const hudAnchorRect = ref<{ left: number; right: number; top: number; bottom: number } | null>(null);
const hudAlign = ref<'left' | 'right'>('right');
const isPetThinking = computed(() => {
  if (service.value === 'deepseek' && byokSending.value && byokCurrent.value) {
    const last = byokCurrent.value.messages[byokCurrent.value.messages.length - 1];
    return Boolean(last && last.role === 'assistant' && !last.content);
  }
  if (service.value === 'native' && nativeSending.value) return true;
  return false;
});
const activePetError = computed(() => {
  if (service.value === 'native') return Boolean(nativeError.value);
  return Boolean(byokError.value);
});
watch([workspaceVisible, workspaceSection], ([visible, sec]) => {
  if (!visible || sec !== 'chat') {
    hudOpen.value = false;
    hudAnchorEl.value = null;
  }
});
function syncHudAnchorRect() {
  const el = hudAnchorEl.value;
  if (!hudOpen.value || !el || !el.isConnected) return;
  const rect = el.getBoundingClientRect();
  hudAnchorRect.value = { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
}
function toggleHud(event: MouseEvent, align: 'left' | 'right') {
  const el = event.currentTarget as HTMLElement | null;
  if (hudOpen.value && hudAlign.value === align) {
    hudOpen.value = false;
    hudAnchorEl.value = null;
    return;
  }
  hudAlign.value = align;
  hudAnchorEl.value = el;
  const rect = el ? el.getBoundingClientRect() : null;
  hudAnchorRect.value = rect ? { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom } : null;
  hudOpen.value = true;
}
function refreshHudTelemetry() {
  void refreshByokConfig();
  void refreshLocalConversations();
  void refreshNativeAgent();
  syncHudAnchorRect();
}
onMounted(() => { window.addEventListener('resize', syncHudAnchorRect); });
onBeforeUnmount(() => { window.removeEventListener('resize', syncHudAnchorRect); });
const activeModelLabelForHud = computed(() => {
  if (service.value === 'native') {
    if (nativeActiveAgentId.value === 'pi') return nativeCurrent.value?.model || nativeActiveModel.value || 'Pi 默认模型';
    return nativeActiveAgentLabel.value;
  }
  return byokCurrent.value?.model || byokModel.value || 'DeepSeek';
});
const activeMaxContextForHud = computed(() => {
  if (service.value === 'native' && nativeActiveAgentId.value === 'pi') {
    const target = (nativeCurrent.value?.model || nativeActiveModel.value || '').toLowerCase();
    const matched = nativePiModels.value.find(m => m.id.toLowerCase() === target || m.model.toLowerCase() === target);
    const parsed = parseContextWindowSize(matched?.context);
    if (parsed > 0) return parsed;
  }
  return service.value === 'deepseek' ? 128_000 : 200_000;
});
const sessionTelemetry = computed(() => {
  const turns: HudTurnInput[] = [];
  if (service.value === 'native' && nativeCurrent.value) {
    let lastUser = '';
    let turnNum = 0;
    for (const msg of nativeCurrent.value.messages) {
      if (msg.role === 'user') lastUser = msg.content;
      else if (msg.role === 'assistant') {
        turnNum++;
        turns.push({
          turn: turnNum,
          model: msg.modelLabel || activeModelLabelForHud.value,
          userPreview: lastUser,
          durationMs: msg.durationMs,
          toolCalls: msg.toolSteps?.length || 0,
          toolNames: (msg.toolSteps || []).map(s => s.name),
          usage: msg.usage || null,
        });
      }
    }
  } else if (service.value === 'deepseek' && byokCurrent.value) {
    let lastUser = '';
    let turnNum = 0;
    for (const msg of byokCurrent.value.messages) {
      if (msg.role === 'user') lastUser = msg.content;
      else if (msg.role === 'assistant' && !msg.incomplete) {
        turnNum++;
        turns.push({
          turn: turnNum,
          model: byokCurrent.value.model,
          userPreview: lastUser,
          durationMs: msg.durationMs,
          toolCalls: 0,
          toolNames: [],
        });
      }
    }
  }
  return buildSessionTelemetry({
    modelName: activeModelLabelForHud.value,
    maxContext: activeMaxContextForHud.value,
    draftText: draft.value.text,
    turns,
  });
});
function fillCompactCommand() {
  draft.value.text = '/compact';
  hudOpen.value = false;
  void nextTick(() => composerInput.value?.focus());
}
function createAutomationWithPrompt() {
  newConversation();
  draft.value.text = '';
  void nextTick(() => {
    resizeComposer();
    composerInput.value?.focus();
  });
}
function onConnectionChanged() {
  void nativeAgent.refreshStatus();
}
function toggleArticle(article: AiHotFeedArticle) {
  if (anySending.value) return;
  const list = draft.value.articles;
  const index = list.findIndex(item => item.url === article.url && item.title === article.title);
  if (index >= 0) list.splice(index, 1); else list.push(article);
}
function selectArticle(article: AiHotFeedArticle) {
  if (anySending.value) return;
  toggleArticle(article);
}
function toggleResource(resource: ResourceAttachment) {
  if (anySending.value) return;
  const list = draft.value.resources;
  const index = list.findIndex(item => item.kind === resource.kind && item.id.toLowerCase() === resource.id.toLowerCase());
  if (index >= 0) list.splice(index, 1);
  else if (list.length >= RESOURCE_LIMIT) notice.value = `每条消息最多添加 ${RESOURCE_LIMIT} 个资源。`;
  else { list.push(resource); notice.value = ''; }
}
function updateResource(resource: ResourceAttachment) {
  const list = draft.value.resources;
  const index = list.findIndex(item => item.kind === resource.kind && item.id.toLowerCase() === resource.id.toLowerCase());
  if (index >= 0) list[index] = resource;
}
function onComposerKeydown(event: KeyboardEvent) {
  if (!shouldSendComposer(event)) return;
  event.preventDefault();
  void send();
}
async function send() {
  if (service.value === 'native') {
    if (anySending.value || !draft.value.text.trim()) return;
    const currentDraft = draft.value, text = currentDraft.text.trim();
    const content = messageWithResources(messageWithArticles(text, currentDraft.articles), currentDraft.resources);
    await nativeAgent.send(text, content, () => { currentDraft.text = ''; currentDraft.articles = []; currentDraft.resources = []; });
    return;
  }
  if (anySending.value || !draft.value.text.trim()) return;
  const currentDraft = draft.value, text = currentDraft.text.trim();
  const content = messageWithResources(messageWithArticles(text, currentDraft.articles), currentDraft.resources);
  await byok.send(text, content, () => { currentDraft.text = ''; currentDraft.articles = []; currentDraft.resources = []; });
}
</script>
<template>
  <section v-show="workspaceVisible" id="multica" class="card wide agent-workspace" :class="{ 'card-fullscreen': workspaceVisible, 'workspace-hidden': !workspaceVisible }">
    <div class="workspace-body">
      <ConversationSidebar :section="workspaceSection" :service="service" :selected-id="service === 'native' ? nativeCurrentId : byokCurrentId" :conversations="localConversations" :native-conversations="nativeConversations" :disabled="anySending" @new="newConversation" @navigate="navigateWorkspace" @select-conversation="openLocalConversation" @delete-conversation="byok.removeChat" @select-native-conversation="openNativeConversation" @delete-native-conversation="nativeAgent.removeChat" @open-settings="openSettings()" />
      <main class="workspace-main" :class="{'new-view':workspaceSection === 'chat' && !currentConversation, 'embedded-view':workspaceSection !== 'chat', 'browsing-resources':resourceBrowserOpen}">
        <nav v-if="workspaceSection === 'chat' && railAnchors.length > 1" class="turn-rail" aria-label="对话轮次导航">
          <button v-for="anchor in railAnchors" :key="anchor.idx" type="button" class="rail-dot" :class="{ active: activeRailIndex === anchor.idx }" :title="anchor.label" :aria-label="`跳转到：${anchor.label}`" @click="scrollToTurn(anchor.idx)" />
        </nav>
        <template v-if="workspaceSection === 'chat'">
        <p v-if="notice" class="notice" role="status">{{ notice }}</p>
        <p v-if="service === 'deepseek' && byokError" class="alert" role="alert">{{ byokError }}</p>
        <CipherRippleCanvas v-if="workspaceSection === 'chat' && !currentConversation && !resourceBrowserOpen" />
        <HomeUsageCard v-if="workspaceSection === 'chat' && !currentConversation && !resourceBrowserOpen" :native-conversations="nativeConversations" :local-conversations="localConversations" />
        <template v-if="service === 'deepseek' && byokCurrent">
          <header class="conversation-header"><h2 class="conv-title">{{ byokCurrent.title }}</h2><span class="conv-meta">{{ byokCurrent.model }}</span></header>
          <div ref="conversationEl" class="conversation"><article v-for="(message,index) in byokCurrent.messages" :key="index" :data-turn-anchor="index" class="msg-row" :class="message.role === 'assistant' ? 'is-assistant' : 'is-user'"><template v-if="message.role === 'user'"><div class="msg-user-meta"><span v-if="message.createdAt">{{ relativeTimeLabel(message.createdAt) }}</span><button type="button" class="copy-btn" :title="copiedKey === `ds-${index}` ? '已复制' : '复制'" aria-label="复制" @click="copyMessage(message.content, `ds-${index}`)"><svg v-if="copiedKey === `ds-${index}`" class="copied-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5"/></svg><svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="7.5" height="8.5" rx="1.4"/><path d="M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3"/></svg></button></div><div class="bubble human-bubble"><MessageMarkdown :content="message.content" /></div></template><template v-else><details v-if="message.reasoning || message.durationMs" class="run-summary"><summary>{{ message.reasoning ? '已思考' : '已完成' }}<template v-if="message.durationMs"> · 已运行 {{ durationLabel(message.durationMs) }}</template></summary><pre v-if="message.reasoning">{{ message.reasoning }}</pre></details><div class="assistant-body"><MessageMarkdown v-if="message.content" :content="message.content" /><span v-else class="muted">{{ byokSending && index === byokCurrent.messages.length - 1 ? '正在生成…' : '没有回复内容' }}</span></div><small v-if="message.incomplete && !(byokSending && index >= byokCurrent.messages.length - 2)" class="incomplete">未完成 · 不会作为后续上下文</small><template v-if="message.content && !message.incomplete"><div class="turn-telemetry"><span class="telemetry-turn">#T{{ turnIndexOf(byokCurrent.messages, index) }}</span><span class="telemetry-model">{{ byokCurrent.model }}</span><template v-if="message.durationMs"><span class="telemetry-sep">·</span><span>{{ durationLabel(message.durationMs) }}</span></template></div><div class="msg-actions"><span v-if="message.createdAt">{{ relativeTimeLabel(message.createdAt) }}</span><button type="button" class="copy-btn" :title="copiedKey === `ds-${index}` ? '已复制' : '复制回复'" aria-label="复制回复" @click="copyMessage(message.content, `ds-${index}`)"><svg v-if="copiedKey === `ds-${index}`" class="copied-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5"/></svg><svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="7.5" height="8.5" rx="1.4"/><path d="M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3"/></svg></button></div></template></template></article></div>
        </template>
        <template v-else-if="service === 'native' && nativeCurrent">
          <header class="conversation-header"><h2 class="conv-title">{{ nativeCurrent.title }}</h2><span class="conv-meta">{{ nativeActiveAgentLabel }}{{ nativeActiveAgentId === 'pi' ? ` (${nativeCurrent.model || nativeActiveModel || '默认模型'})` : '' }} · {{ shortCwdLabel(nativeCurrent.cwd || '默认目录') }}</span></header>
          <div ref="conversationEl" class="conversation"><article v-for="(message,index) in nativeCurrent.messages" :key="index" :data-turn-anchor="index" class="msg-row" :class="message.role === 'user' ? 'is-user' : 'is-assistant'"><template v-if="message.role === 'user'"><div class="msg-user-meta"><span v-if="message.createdAt">{{ relativeTimeLabel(message.createdAt) }}</span><button type="button" class="copy-btn" :title="copiedKey === `na-${index}` ? '已复制' : '复制'" aria-label="复制" @click="copyMessage(message.content, `na-${index}`)"><svg v-if="copiedKey === `na-${index}`" class="copied-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5"/></svg><svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="7.5" height="8.5" rx="1.4"/><path d="M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3"/></svg></button></div><div class="bubble human-bubble"><MessageMarkdown :content="message.content" /></div></template><template v-else><details v-if="message.reasoning" class="run-summary"><summary>已思考<template v-if="message.durationMs"> · 已运行 {{ durationLabel(message.durationMs) }}</template></summary><pre>{{ message.reasoning }}</pre></details><div class="assistant-body"><MessageMarkdown :content="message.content" /></div><template v-for="changes in [extractChangedFiles(message.toolSteps)]" :key="`chg-${index}`"><details v-if="changes.files.length || message.toolSteps?.length || message.toolSummary" class="turn-steps-card"><summary><span class="steps-summary-left"><template v-if="changes.files.length"><span class="steps-count">{{ changes.files.length }}个文件已更改</span><span v-if="changes.totalAdded" class="diff-add">+{{ changes.totalAdded }}</span><span v-if="changes.totalRemoved" class="diff-del">-{{ changes.totalRemoved }}</span></template><template v-else><span class="steps-count">{{ message.toolSteps?.length ? `${message.toolSteps.length} 步工具操作` : '工具执行' }}</span><span v-if="message.toolSummary" class="steps-summary-text">{{ message.toolSummary }}</span></template><span class="steps-chev">›</span></span><span class="steps-action-pill"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="2" width="10" height="12" rx="1.6"/><path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3"/></svg><span>{{ changes.files.length ? '审阅' : '详情' }}</span></span></summary><div v-if="changes.files.length" class="changed-files-list"><div v-for="f in changes.files" :key="f.path" class="changed-file-row" :title="f.path"><span class="changed-file-name">{{ f.name }}</span><span class="changed-file-path">{{ f.path }}</span><span class="changed-file-diff"><span v-if="f.added" class="diff-add">+{{ f.added }}</span><span v-if="f.removed" class="diff-del">-{{ f.removed }}</span></span></div></div><div v-if="message.toolSteps?.length" class="tool-step-list"><span v-for="(step, si) in message.toolSteps" :key="si" class="tool-step-pill">{{ step.name }}</span></div></details></template><div v-for="u in [usageDetail(message.usage, message.durationMs, message.toolSteps?.length)]" :key="index" class="turn-telemetry"><span class="telemetry-turn">#T{{ turnIndexOf(nativeCurrent.messages, index) }}</span><span class="telemetry-model">{{ message.modelLabel || nativeActiveAgentLabel }}</span><template v-if="u.ctxLabel"><span class="telemetry-sep">·</span><span>上下文 <strong class="telemetry-val">{{ u.ctxLabel }}</strong></span></template><span v-if="u.deltaLabel" class="telemetry-delta">{{ u.deltaLabel }}</span><template v-if="u.outLabel"><span class="telemetry-sep">·</span><span>输出 <strong class="telemetry-val">{{ u.outLabel }}</strong></span></template><span v-if="u.reasoningLabel" class="telemetry-thinking">思考 {{ u.reasoningLabel }}</span><span v-if="u.stepsCount" class="telemetry-steps"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.8 2.3a3.3 3.3 0 0 0-3.7 4.9L2.5 10.8a1.2 1.2 0 0 0 1.7 1.7l3.6-3.6a3.3 3.3 0 0 0 4.9-3.7l-1.9 1.9-1.9-1.9 1.9-1.9Z"/></svg><strong>×{{ u.stepsCount }}</strong></span><span v-if="u.speed" class="telemetry-speed"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M9.2 1.5L3.6 8.8h4L6.8 14.5l5.6-7.3h-4l.8-5.7Z"/></svg>{{ u.speed }} tok/s</span><span v-if="u.cachePct">缓存 {{ u.cachePct }}%</span><template v-if="!u.ctxLabel && message.durationMs"><span class="telemetry-sep">·</span><span>{{ durationLabel(message.durationMs) }}</span></template></div><div class="msg-actions"><span v-if="message.createdAt">{{ relativeTimeLabel(message.createdAt) }}</span><button type="button" class="copy-btn" :title="copiedKey === `na-${index}` ? '已复制' : '复制回复'" aria-label="复制回复" @click="copyMessage(message.content, `na-${index}`)"><svg v-if="copiedKey === `na-${index}`" class="copied-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5"/></svg><svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="7.5" height="8.5" rx="1.4"/><path d="M10.5 5.5V3.6A1.4 1.4 0 0 0 9.1 2.2H4.2a1.4 1.4 0 0 0-1.4 1.4v6.7a1.4 1.4 0 0 0 1.4 1.4h1.3"/></svg></button></div></template></article><p v-if="nativeSending" class="muted"><LoadingIndicator :label="`本机 ${nativeActiveAgentLabel} 正在处理`" /></p></div>
        </template>
        <div v-else class="welcome"><h1>需要我为你做些什么？</h1><p>把问题交给你的助手，开启一段新会话。</p></div>
        <div ref="composerWrap" class="composer-wrap" :class="{centered:!currentConversation, 'drag-over-available':Boolean(dragged) || todoistDragOver}" @dragover="acceptDrag" @dragleave="leaveComposer" @drop="dropResource">
          <TokenHudPopover v-if="hudOpen" :telemetry="sessionTelemetry" :can-compact="service === 'native' && nativeActiveAgentId === 'pi'" :service="service" :pi-models="nativePiModels" :deepseek-models="deepseekModels" :anchor-rect="hudAnchorRect" :align="hudAlign" @close="hudOpen = false" @compact="fillCompactCommand" @refresh="refreshHudTelemetry" />
          <p v-if="service === 'native' && nativeError" class="alert" role="alert">{{ nativeError }}</p>
          <div v-if="draft.resources.length" class="resource-attachments"><ResourceAttachmentCard v-for="resource in draft.resources" :key="`${draftKey}:${resource.kind}:${resource.id}`" :resource="resource" :disabled="anySending" @update="updateResource" @remove="toggleResource(resource)" /></div>
          <div v-if="draft.articles.length" class="attachments"><span v-for="article in draft.articles" :key="article.url + article.title" class="attachment"><span class="attachment-title" :title="article.title">✦ {{ article.title }}</span><button type="button" class="attachment-remove" :disabled="anySending" :aria-label="`移除 ${article.title}`" title="移除文章" @click="toggleArticle(article)">×</button></span></div>
          <div class="composer"><ClawdMascot :is-running="anySending" :is-thinking="isPetThinking" :has-error="activePetError" :hidden="Boolean(activePanel)" /><div class="composer-input-row"><textarea ref="composerInput" v-model="draft.text" :disabled="anySending" rows="1" :placeholder="service === 'native' ? `描述任务或提出问题（${nativeActiveAgentLabel} · ! 开头直跑命令）…` : '描述任务或提出问题…'" @input="resizeComposer" @keydown="onComposerKeydown" /><button v-if="byokSending" type="button" class="send-button stop-button" aria-label="停止生成" @click="byok.stop">■</button><button v-else type="button" class="send-button" :class="{ ready: Boolean(draft.text.trim()) }" :disabled="nativeSending || !draft.text.trim() || (service === 'native' ? !nativeConnected : !byokConfigured)" aria-label="发送消息" @click="send">{{ nativeSending ? '…' : '↵' }}</button></div><div class="composer-toolbar"><div class="composer-left"><button v-if="service === 'native'" type="button" class="turbo-btn" :class="{ active: nativeToolsEnabled }" :disabled="anySending" :title="nativeToolsEnabled ? 'Turbo 已开启：允许本机 Agent 自动调用读写/终端工具（点击切换只读）' : '只读模式：禁止工具修改（点击开启 Turbo）'" @click="nativeAgent.toggleToolsEnabled()"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 1.6L13 3.5V7.7C13 10.9 10.8 13.3 8 14.4C5.2 13.3 3 10.9 3 7.7V3.5L8 1.6Z"/><path d="M6.4 8.2L7.6 9.4L10 6.8"/></svg><span>{{ nativeToolsEnabled ? 'Turbo' : '只读' }}</span></button><ComposerTools :panel-open="Boolean(activePanel)" :selected="activePanel" :open-up="currentConversation" @select="activePanel=$event" /><span v-if="service === 'native'" class="composer-chip" :title="nativeCurrent?.cwd || nativeAgent.defaultCwd.value">{{ shortCwdLabel(nativeCurrent?.cwd || nativeAgent.defaultCwd.value) }}</span><button type="button" class="hud-stats-trigger" data-hud-trigger="1" :aria-expanded="hudOpen" title="查看上下文窗口与 Token 监控" @click="toggleHud($event, 'left')"><template v-if="sessionTelemetry.hasTelemetry">{{ sessionTelemetry.turnCount }} 轮 {{ sessionTelemetry.totalToolCalls }} 步<template v-if="sessionTelemetry.lastSpeed"> · {{ sessionTelemetry.lastSpeed }} tok/s</template> · {{ formatCompactK(sessionTelemetry.totalTokens) }} tok<template v-if="sessionTelemetry.cacheHitPct > 0"> · {{ sessionTelemetry.cacheHitPct.toFixed(0) }}% 缓存</template></template><template v-else-if="turnCountLabel">{{ turnCountLabel }} · 0 步</template><template v-else>0 轮 · 0 步</template></button></div><div class="composer-right"><ProviderPicker :service="service" :selected-id="service === 'native' ? (nativeActiveModel || 'native') : byokCurrent?.model || byokModel" :effort="byokCurrent?.reasoningEffort || byokEffort" :pi-thinking="nativeActiveThinking" :models="deepseekModels" :byok-label="byokLabel" :byok-configured="byokConfigured" :pi-models="nativePiModels" :native-agents="nativeDiscoveredAgents" :acp-profiles="nativeAcpProfiles" :native-agent-id="nativeActiveAgentId" :native-agent-label="nativeActiveAgentLabel" :native-connected="nativeConnected" :pi-available="Boolean(nativeHostInfo?.piAvailable)" :disabled="anySending" @choose-model="service === 'deepseek' ? byok.chooseModel($event) : chooseDeepseek($event)" @choose-native="chooseNative" @choose-effort="byok.chooseEffort" @choose-pi-thinking="nativeAgent.chooseThinking" @open-settings="openSettings('deepseek')" @open-native-settings="openSettings('native')" /><button type="button" class="hud-ring-btn" data-hud-trigger="1" :aria-expanded="hudOpen" title="上下文剩余容量与 Token 监控" @click="toggleHud($event, 'right')"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.6" fill="none" stroke="var(--border,#dce3ec)" stroke-width="2.1"/><circle cx="8" cy="8" r="5.6" fill="none" :stroke="sessionTelemetry.ringColor" stroke-width="2.1" :stroke-dasharray="`${((sessionTelemetry.remainingPct / 100) * 35.19).toFixed(2)} 35.19`" stroke-linecap="round"/></svg><span>{{ sessionTelemetry.hasTelemetry ? `${Math.round(sessionTelemetry.remainingPct)}%` : '--%' }}</span></button></div></div></div>
          <p class="composer-hint"><template v-if="service === 'deepseek' && !byokConfigured">请先<button class="inline-setting" type="button" @click="openSettings('deepseek')">配置模型服务（或本机 Ollama）</button>。</template><template v-else-if="service === 'native' && !nativeConnected">请先<button class="inline-setting" type="button" @click="openSettings('native')">一键开启本机终端</button>（或切换右上角模型服务使用云端/Ollama）。</template><template v-else-if="service === 'native'">本机 {{ nativeActiveAgentLabel }} 已就绪{{ nativeActiveAgentId === 'pi' ? `（${nativeActiveModel || '默认模型'}）` : '' }} · 零端口直连</template><template v-else-if="draft.articles.length || draft.resources.length">所选资源将随消息发送，请检查敏感内容。</template><span>Enter 发送 · Shift + Enter 换行</span></p>
        </div>
        <AiHotPanel v-if="activePanel === 'aihot'" class="tool-resource-enter" :selected="draft.articles" :disabled="anySending" @close="activePanel=null" @select="selectArticle" @drag-start="dragged={kind:'article',value:$event}" @drag-end="dragged=null" />
        <ResourcePanel v-else-if="activePanel === 'bilibili' || activePanel === 'github'" class="tool-resource-enter" :key="activePanel" :kind="activePanel" :selected-resources="draft.resources" :disabled="anySending" @select="toggleResource" @close="activePanel=null" @drag-start="dragged={kind:'resource',value:$event}" @drag-end="dragged=null" />
        </template>
        <Transition name="tool-panel"><TodoistPanel v-if="todoistPanelOpened" v-show="workspaceSection === 'chat' && activePanel === 'todoist'" :active="workspaceVisible && workspaceSection === 'chat' && activePanel === 'todoist'" @close="activePanel=null" /></Transition>
        <BackpackLibrary v-if="libraryOpened" v-show="workspaceSection === 'library'" embedded />
        <EmployeesPanel v-if="agentsOpened" v-show="workspaceSection === 'agents'" :active="workspaceVisible && workspaceSection === 'agents'" @open-library="navigateWorkspace('library')" />
        <AiSchedulePanel v-if="scheduleOpened" v-show="workspaceSection === 'schedule'" embedded :active="workspaceVisible && workspaceSection === 'schedule'" :model="byokCurrent?.model || byokModel" :native-connected="nativeConnected" :native-agent-label="nativeActiveAgentLabel" @create-with-prompt="createAutomationWithPrompt" @open-settings="openSettings" />
      </main>
    </div>
    <AiSettings v-if="settingsOpen" :initial-tab="settingsTab" @close="!settingsBusy && (settingsOpen=false)" @connection-changed="onConnectionChanged" @config-changed="refreshByokConfig" @busy-changed="settingsBusy=$event" />
  </section>
</template>
<style scoped>
.reasoning { margin:6px 0; color:var(--muted,#7d8ba0); font-size:11px; }.reasoning summary { cursor:pointer; }.reasoning pre { white-space:pre-wrap; overflow-wrap:anywhere; max-height:240px; overflow:auto; font:inherit; line-height:1.6; }.incomplete { display:block; margin-top:4px; color:#b77912; font-size:11px; }.stop-button { font-size:12px!important; }.inline-setting { border:0; background:transparent; color:#7569ec; padding:0 3px; cursor:pointer; font:inherit; }
.service-switch { display:flex; justify-content:space-between; align-items:center; gap:5px; margin:0 2px 12px; font-size:11px; color:var(--muted,#94a3b8); }.service-switch button { border:0; background:transparent; color:#7569df; cursor:pointer; font-size:11px; }
/* Override the shared fullscreen inset while preserving space for the Dock. */
#multica.card.card-fullscreen { padding:0 0 74px !important; }
.agent-workspace.workspace-hidden { display:none !important; }
.agent-workspace { display:flex!important; flex-direction:column!important; padding:0!important; background:color-mix(in srgb,var(--panel,#f4f6fa) 80%,transparent)!important; backdrop-filter:blur(26px) saturate(1.25); -webkit-backdrop-filter:blur(26px) saturate(1.25); color:var(--text,#26334b); font:13.5px/1.55 Inter,-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC","Segoe UI",sans-serif; -webkit-font-smoothing:antialiased; overflow:hidden!important; }.agent-workspace * { box-sizing:border-box; }.agent-workspace button,.agent-workspace textarea,.agent-workspace select { font:inherit; }.agent-workspace button { cursor:pointer; }.agent-workspace button:disabled { opacity:.5; cursor:not-allowed; }.subtle { color:var(--text,#52627a); background:var(--surface,#fff); border:1px solid var(--border,#e4e9f1); border-radius:8px; padding:7px 11px; text-decoration:none; font-size:12px; }.workspace-body { flex:1; min-height:0; display:flex; position:relative; background:transparent; padding:0; gap:0; }
.workspace-main { position:relative; flex:1; min-width:0; min-height:0; display:flex; flex-direction:column; overflow:auto; padding:0 clamp(20px,4vw,48px) 12px; border:0; border-radius:0; background:color-mix(in srgb,var(--panel,#ffffff) 58%,var(--surface,#eef2f7)); }
.turn-rail { position:absolute; left:12px; top:50%; transform:translateY(-50%); z-index:5; display:flex; flex-direction:column; gap:8px; padding:4px 2px; }
.rail-dot { width:6px; height:6px; padding:0; border:0; border-radius:50%; background:var(--muted,#cbd5e1); opacity:.45; transition:background-color .15s,opacity .15s; }
.rail-dot:hover { background:var(--muted,#6b7280); opacity:.78; }
.rail-dot.active { background:var(--muted,#6b7280); opacity:1; }.workspace-main.new-view { background:color-mix(in srgb,var(--panel,#ffffff) 58%,var(--surface,#eef2f7)); padding-top:24px; }.conversation-header { display:flex; justify-content:space-between; align-items:center; gap:14px; width:100%; max-width:800px; min-height:44px; margin:0 auto; padding:10px 4px; border-bottom:1px solid var(--border,#e4e8f0); flex:none; }.conv-title { margin:0; font-size:13.5px; font-weight:500; color:var(--muted,#526075); min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.conv-meta { flex:none; font-size:11px; color:var(--muted,#94a3b8); white-space:nowrap; }.conversation { flex:1; min-height:0; overflow:auto; width:100%; max-width:800px; margin:0 auto; padding:22px 4px 56px; display:flex; flex-direction:column; gap:24px; }.day-divider { text-align:center; color:var(--muted,#94a3b8); font-size:10px; margin-bottom:2px; }
.msg-row { display:flex; flex-direction:column; min-width:0; }
.msg-row.is-user { align-items:flex-end; align-self:flex-end; max-width:min(540px,84%); }
.msg-row.is-assistant { align-items:flex-start; width:100%; }
.msg-user-meta { display:flex; align-items:center; gap:6px; margin-bottom:4px; font-size:11px; color:var(--muted,#94a3b8); opacity:.78; transition:opacity .14s; }
.msg-row.is-user:hover .msg-user-meta { opacity:1; }
.human-bubble { padding:9px 14px; border-radius:12px; background:color-mix(in srgb,var(--panel,#ffffff) 74%,var(--surface,#eef2f7)); border:1px solid var(--border,#e2e7f0); color:var(--text,#26334b); overflow-wrap:anywhere; }
.run-summary { margin-bottom:8px; font-size:12px; color:var(--muted,#8492a8); width:100%; }
.run-summary summary { cursor:pointer; user-select:none; list-style:none; display:inline-flex; align-items:center; gap:5px; padding:2px 0; }
.run-summary summary::-webkit-details-marker { display:none; }
.run-summary summary::after { content:'›'; font-size:13px; transition:transform .15s; opacity:.75; }
.run-summary[open] summary::after { transform:rotate(90deg); }
.run-summary pre { margin:6px 0 0; padding:10px 12px; border-radius:9px; border:1px solid var(--border,#e4e9f1); background:var(--surface,#f7f8fb); white-space:pre-wrap; overflow-wrap:anywhere; max-height:220px; overflow:auto; font:11.5px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--text,#475569); }
.tool-step-list { display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
.tool-step-pill { padding:2px 8px; border-radius:6px; border:1px solid var(--border,#dce3ed); background:var(--surface,#f5f7fb); font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--text,#475569); }
.turn-steps-card { width:100%; margin-top:10px; border:1px solid var(--border,#e2e6ef); border-radius:11px; background:color-mix(in srgb,var(--panel,#ffffff) 86%,transparent); }
.turn-steps-card summary { cursor:pointer; user-select:none; list-style:none; display:flex; align-items:center; justify-content:space-between; gap:10px; padding:8px 10px 8px 14px; font-size:12.5px; color:var(--text,#334155); }
.turn-steps-card summary::-webkit-details-marker { display:none; }
.steps-summary-left { display:inline-flex; align-items:center; gap:7px; min-width:0; font-variant-numeric:tabular-nums; }
.steps-count { font-weight:500; white-space:nowrap; }
.diff-add { color:#16a34a; font-weight:600; font-size:12px; }
.diff-del { color:#dc2626; font-weight:600; font-size:12px; }
.steps-summary-text { color:var(--muted,#64748b); font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.steps-chev { color:var(--muted,#94a3b8); font-size:14px; transition:transform .15s; }
.turn-steps-card[open] .steps-chev { transform:rotate(90deg); }
.steps-action-pill { flex:none; display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:7px; border:1px solid var(--border,#e4e8f0); background:var(--surface,#f8fafc); font-size:12px; color:var(--text,#475569); }
.steps-action-pill svg { width:13px; height:13px; color:var(--muted,#64748b); }
.changed-files-list { display:flex; flex-direction:column; gap:4px; padding:2px 14px 8px; }
.changed-file-row { display:flex; align-items:center; gap:8px; padding:4px 8px; border-radius:7px; background:var(--surface,#f5f7fb); font-size:12px; }
.changed-file-name { font-weight:550; color:var(--text,#26334b); white-space:nowrap; }
.changed-file-path { min-width:0; flex:1; font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--muted,#94a3b8); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.changed-file-diff { display:inline-flex; gap:5px; font-variant-numeric:tabular-nums; white-space:nowrap; }
.turn-steps-card .tool-step-list { padding:0 14px 10px; margin-top:0; }
.assistant-body { width:100%; color:var(--text,#1f2937); padding:2px 0; }
.turn-telemetry { width:fit-content; max-width:100%; display:inline-flex; flex-wrap:wrap; align-items:center; gap:6px; margin-top:10px; padding:4px 12px; border-radius:999px; border:1px solid var(--border,#e2e6ef); background:color-mix(in srgb,var(--panel,#ffffff) 86%,transparent); font-size:11.5px; color:var(--muted,#64748b); font-variant-numeric:tabular-nums; }
.telemetry-turn { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:11px; font-weight:650; color:#4f6ef7; }
.telemetry-model { color:var(--text,#1f2937); font-weight:600; }
.telemetry-sep { opacity:.45; }
.telemetry-val { color:var(--text,#1f2937); font-weight:600; }
.telemetry-delta { padding:1px 6px; border-radius:5px; background:rgba(245,158,11,.14); color:#b45309; font-weight:600; font-size:11px; }
.telemetry-thinking { color:#7c3aed; font-weight:500; }
.telemetry-steps { display:inline-flex; align-items:center; gap:3px; color:var(--muted,#64748b); }
.telemetry-steps svg { width:12px; height:12px; color:#64748b; }
.telemetry-steps strong { color:var(--text,#334155); font-weight:600; }
.telemetry-speed { display:inline-flex; align-items:center; gap:2px; color:var(--muted,#64748b); }
.telemetry-speed svg { width:12px; height:12px; color:#f59e0b; }
.msg-actions { width:100%; display:flex; align-items:center; justify-content:flex-end; gap:6px; margin-top:4px; font-size:11px; color:var(--muted,#94a3b8); }
.copy-btn { width:24px; height:24px; display:inline-grid; place-items:center; border:0; background:transparent; color:var(--muted,#94a3b8); padding:0; border-radius:6px; cursor:pointer; transition:background-color .14s,color .14s; }
.copy-btn svg { width:13.5px; height:13.5px; }
.copy-btn .copied-icon { color:#16a34a; }
.copy-btn:hover { background:var(--surface,#f2f4f8); color:var(--text,#26334b); }
.welcome { position:relative; z-index:1; margin:auto auto 22px; text-align:center; }.welcome h1 { font-size:clamp(26px,3vw,34px); font-weight:500; letter-spacing:-.015em; margin:0 0 10px; color:var(--text,#1f2937); }.welcome p { color:var(--muted,#94a3b8); margin:0; }.composer-wrap { position:relative; z-index:2; width:100%; max-width:800px; margin:6px auto 0; will-change:transform; }.composer-wrap.centered { max-width:800px; margin:0 auto auto; }.composer { position:relative; display:flex; flex-direction:column; gap:6px; padding:11px 14px 8px; border:1px solid var(--border,#dce2ec); border-radius:14px; background:color-mix(in srgb,var(--panel,#ffffff) 90%,transparent); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); box-shadow:0 4px 18px rgba(15,23,42,.06); }.composer-input-row { display:flex; align-items:flex-end; gap:8px; }.composer textarea { flex:1; width:100%; min-width:0; min-height:24px; max-height:160px; border:0; outline:0; resize:none; background:transparent; color:var(--text,#26334b); padding:2px; line-height:1.55; overflow-y:auto; }.composer-toolbar { display:flex; align-items:center; justify-content:space-between; gap:8px; padding-top:2px; }.composer-left,.composer-right { display:flex; align-items:center; gap:6px; min-width:0; }.composer-chip { max-width:170px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding:3px 6px; border-radius:6px; background:transparent; font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace; color:var(--muted,#64748b); }.composer-chip:hover { background:var(--surface,#f2f4f8); }.turbo-btn { display:inline-flex; align-items:center; gap:4px; border:0; background:transparent; padding:3px 6px; border-radius:6px; font-size:11.5px; color:var(--muted,#64748b); white-space:nowrap; cursor:pointer; transition:background .15s,color .15s; }.turbo-btn svg { width:13px; height:13px; flex:none; }.turbo-btn:hover:not(:disabled) { background:var(--surface,#f2f4f8); color:var(--text,#26334b); }.turbo-btn.active { color:var(--text,#26334b); font-weight:500; }.turbo-btn.active svg { color:#16a34a; }.turbo-btn:disabled { opacity:.5; cursor:not-allowed; }.hud-stats-trigger { border:0; background:transparent; padding:3px 6px; border-radius:6px; font-size:11px; color:var(--muted,#64748b); white-space:nowrap; font-variant-numeric:tabular-nums; cursor:pointer; }.hud-stats-trigger:hover { background:var(--surface,#f2f4f8); color:var(--text,#26334b); }.hud-ring-btn { display:inline-flex; align-items:center; gap:5px; border:0; background:transparent; padding:4px 6px; border-radius:7px; font-size:11.5px; font-weight:550; color:var(--text,#35445d); font-variant-numeric:tabular-nums; cursor:pointer; }.hud-ring-btn:hover { background:var(--surface,#f2f4f8); }.hud-ring-btn svg { width:15px; height:15px; transform:rotate(-90deg); flex:none; }.send-button { flex:none; width:28px; height:28px; border:0; border-radius:7px; font-size:14px!important; font-weight:600; background:transparent; color:var(--muted,#94a3b8); display:grid; place-items:center; padding:0; line-height:1; transition:background .15s,color .15s; }.send-button.ready:not(:disabled) { background:rgba(99,102,241,.11); color:#5b5bd6; }.send-button.ready:not(:disabled):hover { background:#5b5bd6; color:#fff; }.stop-button { background:rgba(239,68,68,.12); color:#dc2626; }.composer-hint { color:var(--muted,#9aa6b8); font-size:10.5px; margin:7px 6px 0; opacity:.88; }.composer-hint span { float:right; }.attachments { display:flex; flex-wrap:wrap; gap:6px; margin:0 8px 8px; }.attachment { max-width:270px; padding:5px 8px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; background:rgba(92,177,230,.12); border-radius:8px; color:var(--text,#456582); font-size:11px; }.attachment button { border:0; background:transparent; color:inherit; }.muted { color:var(--muted,#94a3b8); font-size:12px; }.alert { color:#b45309; background:rgba(245,158,11,.12); padding:9px; border-radius:7px; }.notice { color:#a05b14; font-size:12px; }.disconnected { margin:auto; text-align:center; }.disconnected p { color:#9ba8bc; }.primary { border:0; border-radius:8px; padding:9px 15px; background:#7668e9; color:white; }
.conversation-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.resource-attachments { display:flex; flex-wrap:wrap; gap:8px; max-height:40vh; overflow:auto; margin:0 8px 8px; }
.attachment { display:inline-flex; align-items:center; gap:6px; max-width:min(320px,100%); overflow:visible; }
.attachment-title { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.attachment .attachment-remove { flex:none; display:grid; place-items:center; width:20px; height:20px; padding:0; border-radius:50%; font-size:16px; line-height:1; color:var(--text,#52627a); cursor:pointer; }
.attachment .attachment-remove:hover,.attachment .attachment-remove:focus-visible { background:rgba(82,98,122,.16); }
.workspace-settings-button { position:absolute; z-index:4; right:28px; top:24px; padding:7px 11px; border:1px solid var(--border,#e4e9f1); border-radius:8px; background:var(--panel,#fff); color:var(--text,#52627a); font-size:12px; }
.workspace-settings-button:hover { background:var(--surface,#f4f6fb); }
.workspace-main.embedded-view { padding:0; overflow:hidden; }
.workspace-main.browsing-resources { overflow:hidden; padding-top:18px; }
.workspace-main.browsing-resources .welcome,.workspace-main.browsing-resources .conversation,.workspace-main.browsing-resources .conversation-header { display:none; }
.workspace-main.browsing-resources .composer-wrap,.workspace-main.browsing-resources .composer-wrap.centered { flex:none; max-width:800px; margin:0 auto 12px; padding-right:0; }
.workspace-main.browsing-resources .resource-attachments { max-height:18vh; }
.tool-resource-enter { animation:tool-resource-in .56s cubic-bezier(.22,1,.36,1); }
.tool-panel-enter-active { transition:opacity .44s ease,transform .56s cubic-bezier(.22,1,.36,1); }
.tool-panel-enter-from { opacity:0; transform:translateY(22px); }
@keyframes tool-resource-in { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
@media(prefers-reduced-motion:reduce) { .tool-resource-enter { animation:none; } .tool-panel-enter-active { transition:none; } }
.composer-wrap.drag-over-available .composer { outline:2px dashed #7569ec; outline-offset:3px; }
@media(max-width:850px) { .workspace-main.browsing-resources .composer-wrap,.workspace-main.browsing-resources .composer-wrap.centered { margin-top:12px; } }
.side-loading { padding:4px 9px; }.side-error { padding:5px 9px; color:#b45309; font-size:11px; overflow-wrap:anywhere; }.side-error button { padding:2px 5px; border:0; background:transparent; color:#7569ec; }
@media(max-width:850px) { .side-panel { width:190px; }.connection,.composer-chip,.composer-stat { display:none; }.workspace-main { padding:20px; }.composer-hint span { display:none; }.msg-row.is-user { max-width:92%; } }
</style>
