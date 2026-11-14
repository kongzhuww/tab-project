<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { multicaService, type MulticaAgent, type MulticaRuntime, type MulticaIssue, type MulticaComment } from "../services/multica.service";
import { commentPollBackoff } from './poll-backoff';
import type { AiHotFeedArticle } from "../aihot/aihot-feed-store";
import { sessionTitle, messageWithArticles } from "./session-content";
import ProviderPicker from "./ProviderPicker.vue";
import { useByokChat } from './use-byok-chat';
import ConversationSidebar from './ConversationSidebar.vue';
import ComposerTools from "./ComposerTools.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
import ResourceAttachmentCard from "./ResourceAttachment.vue";
import { messageWithResources, RESOURCE_LIMIT, type ResourceAttachment } from "./resource-content";
import { shouldSendComposer } from "./composer-keyboard";

const AiHotPanel = defineAsyncComponent(() => import('./AiHotPanel.vue'));
const ResourcePanel = defineAsyncComponent(() => import('./ResourcePanel.vue'));
const TodoistPanel = defineAsyncComponent(() => import('./TodoistPanel.vue'));
const AiSettings = defineAsyncComponent(() => import('./AiSettings.vue'));
const RunTrace = defineAsyncComponent(() => import('./RunTrace.vue'));
const MessageMarkdown = defineAsyncComponent({
  loader: () => import('./MessageMarkdown.vue'),
  loadingComponent: defineComponent({ setup: () => () => h(LoadingIndicator, { label: '正在加载内容' }) }),
  errorComponent: defineComponent({ props: { content: String }, setup: props => () => h('div', { style: 'white-space:pre-wrap' }, props.content || '') }),
  delay: 150
});

const service = ref<'multica' | 'deepseek'>('multica');
const workspaceVisible = computed(() => fullscreenCardState.activeId === 'multica');
const active = computed(() => workspaceVisible.value && service.value === 'multica');
const byok = useByokChat();
const { conversations: localConversations, current: byokCurrent, currentId: byokCurrentId, error: byokError, configured: byokConfigured, model: byokModel, effort: byokEffort, sending: byokSending } = byok;
const deepseekModels = ref<string[]>([]);
async function refreshByokConfig() { try { const c = await byok.refreshConfig(); deepseekModels.value = c.key ? c.models : []; } catch { deepseekModels.value = []; } }
async function refreshLocalConversations() { try { await byok.refreshHistory(); } catch { byokError.value = '本地会话读取失败。'; } }
onMounted(() => { void refreshByokConfig(); void refreshLocalConversations(); });
watch(workspaceVisible, visible => { if (visible) { void refreshByokConfig(); void refreshLocalConversations(); } else byok.stop(); });
function openLocalConversation(id: string) { if (byokSending.value || sending.value || switchingAgent.value) return; byok.selectChat(id); service.value = 'deepseek'; }
function chooseDeepseek(model: string) {
  if (service.value !== 'deepseek') { byok.newChat(); selected.value = null; service.value = 'deepseek'; }
  void byok.chooseModel(model);
}
function chooseAgent(id: string) {
  if (service.value === 'deepseek') { byok.newChat(); selected.value = null; agentId.value = id; service.value = 'multica'; }
  else if (selected.value) replacementAgentId.value = id;
  else agentId.value = id;
}
function openIssue(issue: MulticaIssue) { if (byokSending.value) return; service.value = 'multica'; selectIssue(issue); }
function newConversation() { if (service.value === 'deepseek') byok.newChat(); else startNew(); }
const connected = ref(false), loading = ref(false), sending = ref(false), uncertain = ref(false), switchingAgent = ref(false);
const replacementAgentId = ref('');
const issuesLoading = ref(false), agentsLoading = ref(false);
const error = ref(""), issuesError = ref(""), agentsError = ref(""), notice = ref("");
let refreshPromise: Promise<void> | null = null;
let refreshVersion = 0;
const settingsOpen = ref(false), settingsBusy = ref(false);
const settingsTab = ref<'multica' | 'deepseek'>('multica');
function openSettings(tab: 'multica' | 'deepseek' = service.value) { settingsTab.value = tab; settingsOpen.value = true; }
const agents = ref<MulticaAgent[]>([]), runtimes = ref<MulticaRuntime[]>([]), issues = ref<MulticaIssue[]>([]);
const selected = ref<MulticaIssue | null>(null), comments = ref<MulticaComment[]>([]);
const commentsLoading = ref(false), commentsError = ref("");
const commentsShown = ref(0);
const visibleComments = computed(() => comments.value.slice(0, commentsShown.value));
let commentFrame: number | undefined;
watch(comments, list => {
  if (commentFrame !== undefined) cancelAnimationFrame(commentFrame);
  commentsShown.value = Math.min(8, list.length);
  const nextBatch = () => {
    if (commentsShown.value >= comments.value.length) { commentFrame = undefined; return; }
    commentsShown.value = Math.min(commentsShown.value + 8, comments.value.length);
    commentFrame = requestAnimationFrame(nextBatch);
  };
  if (commentsShown.value < list.length) commentFrame = requestAnimationFrame(nextBatch);
}, { flush: 'sync' });
onBeforeUnmount(() => { if (commentFrame !== undefined) cancelAnimationFrame(commentFrame); clearInterval(commentPollTimer); });
const agentId = ref("");
const activePanel = ref<'aihot' | 'bilibili' | 'github' | 'todoist' | null>(null);
const composerInput = ref<HTMLTextAreaElement | null>(null);
const drafts = reactive<Record<string, { text: string; articles: AiHotFeedArticle[]; resources: ResourceAttachment[] }>>({ new: { text: "", articles: [], resources: [] } });
const draftKey = computed(() => service.value === 'deepseek' ? (byokCurrentId.value ? `byok:${byokCurrentId.value}` : 'new') : (selected.value ? `multica:${selected.value.id}` : 'new'));
const currentConversation = computed(() => service.value === 'deepseek' ? Boolean(byokCurrent.value) : Boolean(selected.value));
const anySending = computed(() => sending.value || byokSending.value);
const draft = computed(() => drafts[draftKey.value] || (drafts[draftKey.value] = { text: "", articles: [], resources: [] }));
const onlineAgents = computed(() => agents.value.filter(a => !a.archived_at && a.runtime_id && runtimes.value.some(r => r.id === a.runtime_id && r.status === "online")));
let commentRequest = 0;
const statusNames: Record<string, string> = { backlog: "待处理", todo: "待处理", in_progress: "进行中", in_review: "待审核", done: "已完成", cancelled: "已取消", canceled: "已取消" };
function statusName(issue: MulticaIssue) { return statusNames[issue.status_category || ""] || statusNames[issue.status || ""] || issue.status || "未知"; }
function statusColor(issue: MulticaIssue) {
  const name = statusName(issue);
  return name === '待审核' ? 'review' : name === '已完成' || name === '完成' ? 'done' : name === '待处理' ? 'pending' : '';
}
function agentName(id?: string | null) { return agents.value.find(a => a.id === id)?.name || "未分配或不可见"; }
function agentModel(id?: string | null) { return agents.value.find(a => a.id === id)?.model || '运行时默认模型'; }
function resizeComposer() {
  const input = composerInput.value;
  if (!input) return;
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
}
watch([draftKey, () => draft.value.text, active, connected], () => { void nextTick(resizeComposer); }, { flush: "post" });
function dateLabel(value?: string) { if (!value) return ""; const d = new Date(value); return Number.isNaN(d.getTime()) ? "" : d.toLocaleString(undefined, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
async function refresh() {
  if (refreshPromise) return refreshPromise;
  loading.value = true; issuesLoading.value = true; agentsLoading.value = true;
  error.value = ''; issuesError.value = ''; agentsError.value = '';
  const version = refreshVersion;
  refreshPromise = (async () => {
    try {
      const hasConnection = await multicaService.isConnected();
      if (version !== refreshVersion) return;
      connected.value = hasConnection;
      if (!connected.value) { issues.value = []; agents.value = []; runtimes.value = []; selected.value = null; return; }
      await Promise.all([
        (async () => {
          try {
            const list = await multicaService.issues();
            if (version !== refreshVersion) return;
            issues.value = list;
            if (selected.value) selected.value = list.find(i => i.id === selected.value?.id) || selected.value;
          } catch (e) { if (version === refreshVersion) issuesError.value = e instanceof Error ? e.message : '会话列表读取失败'; }
          finally { issuesLoading.value = false; }
        })(),
        (async () => {
          try {
            const info = await multicaService.info(true);
            if (version !== refreshVersion) return;
            runtimes.value = info.runtimes; agents.value = info.agents;
            if (!onlineAgents.value.some(a => a.id === agentId.value)) agentId.value = onlineAgents.value[0]?.id || '';
          } catch (e) { if (version === refreshVersion) agentsError.value = e instanceof Error ? e.message : '助手列表读取失败'; }
          finally { agentsLoading.value = false; }
        })()
      ]);
    } catch (e) { if (version === refreshVersion) error.value = e instanceof Error ? e.message : '读取失败'; }
    finally { loading.value = false; issuesLoading.value = false; agentsLoading.value = false; }
  })();
  try { await refreshPromise; } finally { refreshPromise = null; }
}
watch(active, visible => {
  if (visible) {
    if (selected.value && !commentsLoading.value) void loadComments(selected.value);
    const pending = refreshPromise;
    if (pending) void pending.then(() => { if (active.value) void refresh(); });
    else void refresh();
  } else {
    refreshVersion++; ++commentRequest; commentsLoading.value = false;
    activePanel.value = null; settingsOpen.value = false; settingsBusy.value = false;
  }
}, { immediate: true });
async function onConnectionChanged() {
  refreshVersion++;
  ++commentRequest;
  connected.value = false; selected.value = null; comments.value = []; commentsLoading.value = false;
  issues.value = []; agents.value = []; runtimes.value = []; agentId.value = '';
  const pending = refreshPromise;
  if (pending) await pending;
  if (active.value) await refresh();
}
let pollFailures = 0, nextCommentPollAt = 0, pollBlocked = false;
async function loadComments(issue: MulticaIssue, silent = false) {
  const current = ++commentRequest;
  if (!silent) { commentsLoading.value = true; commentsError.value = ""; }
  try {
    const result = await multicaService.issueComments(issue.id);
    if (current === commentRequest) {
      if (JSON.stringify(comments.value) !== JSON.stringify(result)) comments.value = result;
      commentsError.value = ''; pollFailures = 0; pollBlocked = false; nextCommentPollAt = Date.now() + 20000;
    }
  } catch (e) {
    if (current === commentRequest) {
      pollFailures++;
      const { delay, blocked } = commentPollBackoff(pollFailures, e);
      pollBlocked = blocked;
      nextCommentPollAt = Date.now() + delay;
      const message = e instanceof Error ? e.message : '评论加载失败';
      commentsError.value = comments.value.length ? `${message} 已保留现有内容；${blocked ? '请检查连接设置。' : '自动检查已放慢。'}` : message;
    }
  } finally { if (current === commentRequest && !silent) commentsLoading.value = false; }
}
let pollingComments = false;
const commentPollTimer = setInterval(async () => {
  if (!active.value || document.visibilityState !== 'visible' || !selected.value || commentsLoading.value || pollingComments || sending.value || switchingAgent.value || pollBlocked || Date.now() < nextCommentPollAt) return;
  pollingComments = true;
  try { await loadComments(selected.value, true); } finally { pollingComments = false; }
}, 20000);
function selectIssue(issue: MulticaIssue) {
  if (sending.value || switchingAgent.value) return;
  replacementAgentId.value = issue.assignee_id || '';
  pollFailures = 0; pollBlocked = false; nextCommentPollAt = 0;
  selected.value = issue; comments.value = []; uncertain.value = false; notice.value = "";
  void loadComments(issue);
}
function startNew() {
  if (sending.value || switchingAgent.value) return;
  replacementAgentId.value = '';
  selected.value = null; ++commentRequest; comments.value = []; commentsLoading.value = false; uncertain.value = false; notice.value = "";
}
async function switchAgent() {
  const issue = selected.value, target = replacementAgentId.value;
  if (!issue || !target || target === issue.assignee_id || switchingAgent.value || sending.value || uncertain.value || !onlineAgents.value.some(agent => agent.id === target)) return;
  switchingAgent.value = true; notice.value = '';
  try {
    const updated = await multicaService.switchIssueAgent(issue.id, issue.assignee_id || null, target);
    if (selected.value?.id === issue.id) selected.value = { ...issue, ...updated };
    issues.value = issues.value.map(item => item.id === issue.id ? { ...item, ...updated } : item);
    notice.value = `已将会话交给 ${agentName(target)}；切换不等于重试，请检查运行记录后继续。`;
  } catch (e) {
    uncertain.value = true;
    notice.value = `${e instanceof Error ? e.message : '切换结果未确认'} 请先到 Multica 核对结果，避免重复操作。`;
  } finally { switchingAgent.value = false; }
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
  activePanel.value = null;
  void nextTick(() => composerInput.value?.focus());
}
function toggleResource(resource: ResourceAttachment) {
  if (anySending.value) return;
  const list = draft.value.resources;
  const index = list.findIndex(item => item.kind === resource.kind && item.id.toLowerCase() === resource.id.toLowerCase());
  if (index >= 0) list.splice(index, 1);
  else if (list.length >= RESOURCE_LIMIT) notice.value = `每条消息最多添加 ${RESOURCE_LIMIT} 个视频或仓库。`;
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
  if (service.value === 'deepseek') {
    if (anySending.value || !draft.value.text.trim()) return;
    const currentDraft = draft.value, text = currentDraft.text.trim();
    const content = messageWithResources(messageWithArticles(text, currentDraft.articles), currentDraft.resources);
    await byok.send(text, content, () => { currentDraft.text = ''; currentDraft.articles = []; currentDraft.resources = []; });
    return;
  }
  if (sending.value || switchingAgent.value || uncertain.value || (selected.value && replacementAgentId.value !== (selected.value.assignee_id || '')) || !draft.value.text.trim()) return;
  const issue = selected.value, currentDraft = draft.value;
  const text = currentDraft.text.trim(), title = sessionTitle(text), content = messageWithResources(messageWithArticles(text, currentDraft.articles), currentDraft.resources, { multicaBridge:true });
  if (!connected.value || (!issue && (!agentId.value || agentsLoading.value || Boolean(agentsError.value)))) return;
  sending.value = true; notice.value = "";
  try {
    if (!issue) {
      const result = await multicaService.createIssue(title, content, agentId.value);
      currentDraft.text = ""; currentDraft.articles = []; currentDraft.resources = [];
      const created = issues.value.find(i => i.id === result.id) || { id: result.id, identifier: result.identifier, title, description: content, assignee_id: agentId.value };
      if (!issues.value.some(i => i.id === created.id)) issues.value = [created, ...issues.value];
      selectIssueAfterSend(created);
      notice.value = `会话 ${result.identifier || result.id} 已创建`;
      void refresh();
    } else {
      await multicaService.addIssueComment(issue.id, content);
      currentDraft.text = ""; currentDraft.articles = []; currentDraft.resources = [];
      // A successful comment must never be retried just because renaming failed.
      try {
        await multicaService.renameIssue(issue.id, title);
        issue.title = title;
        issues.value = issues.value.map(item => item.id === issue.id ? { ...item, title } : item);
      } catch { notice.value = "消息已发送，但会话标题更新失败；请刷新或到 Multica 核对。"; }
      await loadComments(issue);
    }
  } catch (e) { uncertain.value = true; notice.value = `${e instanceof Error ? e.message : "发送失败"} 请先到 Multica 核对是否已发送，避免重复。`; }
  finally { sending.value = false; }
}
function selectIssueAfterSend(issue: MulticaIssue) { replacementAgentId.value = issue.assignee_id || ''; selected.value = issue; comments.value = []; uncertain.value = false; void loadComments(issue); }
</script>
<template>
  <section v-if="workspaceVisible" id="multica" class="card wide card-fullscreen agent-workspace">
    <div class="workspace-body">
      <button type="button" class="workspace-settings-button" :disabled="anySending" aria-label="AI 设置" title="设置" @click="openSettings()">⚙ <span>设置</span></button>
      <ConversationSidebar :service="service" :selected-id="service === 'deepseek' ? byokCurrentId : selected?.id || ''" :issues="issues" :agents="agents" :conversations="localConversations" :disabled="anySending || switchingAgent" :connected="connected" :loading="issuesLoading" :error="issuesError" :comments-loading="commentsLoading || commentsShown < comments.length" @new="newConversation" @select-issue="openIssue" @select-conversation="openLocalConversation" @delete-conversation="byok.removeChat" @retry="refresh" />
      <main class="workspace-main" :class="{'new-view':!currentConversation}">
        <p v-if="service === 'multica' && error" class="alert" role="alert">{{ error }}</p>
        <p v-if="service === 'multica' && notice" class="notice" role="status">{{ notice }}</p>
        <p v-if="service === 'deepseek' && byokError" class="alert" role="alert">{{ byokError }}</p>
        <template v-if="service === 'multica' && selected">
          <div class="conversation-header"><div><small>{{ selected.identifier || '会话' }} · {{ statusName(selected) }}</small><h2>{{ selected.title }}</h2><p>{{ agentName(selected.assignee_id) }} · {{ agentModel(selected.assignee_id) }}</p></div></div>
          <div class="conversation"><div class="day-divider">任务开始</div><article class="bubble-row"><div class="avatar person">你</div><div class="bubble-content"><div class="bubble-meta"><strong>任务说明</strong></div><div class="bubble human-bubble"><MessageMarkdown :content="selected.description || '暂无任务说明'" /></div></div></article><article v-for="comment in visibleComments" :key="comment.id" class="bubble-row"><div class="avatar" :class="comment.author_type === 'agent' ? 'bot' : 'person'">{{ comment.author_type === 'agent' ? '✦' : '你' }}</div><div class="bubble-content"><div class="bubble-meta"><strong>{{ comment.author_type === 'agent' ? (comment.author_id ? agentName(comment.author_id) : '助手') : '成员' }}</strong><span>{{ dateLabel(comment.created_at) }}</span></div><div class="bubble" :class="comment.author_type === 'agent' ? 'bot-bubble' : 'human-bubble'"><MessageMarkdown :content="comment.content" /></div></div></article><p v-if="commentsLoading || commentsShown < comments.length" class="muted"><LoadingIndicator label="正在加载会话内容" /></p><p v-else-if="commentsError" class="alert">{{ commentsError }} <button type="button" @click="loadComments(selected)">重试</button></p><p v-else-if="!comments.length" class="muted">还没有评论，助手的汇报会出现在这里。</p><RunTrace :issue-id="selected.id" :active="active" /></div>
        </template>
        <template v-else-if="service === 'deepseek' && byokCurrent">
          <div class="conversation-header"><div><h2>{{ byokCurrent.title }}</h2><p>{{ byokCurrent.model }}</p></div></div>
          <div class="conversation"><article v-for="(message,index) in byokCurrent.messages" :key="index" class="bubble-row"><div class="avatar" :class="message.role === 'assistant' ? 'bot' : 'person'">{{ message.role === 'assistant' ? '✦' : '你' }}</div><div class="bubble-content"><div class="bubble-meta"><strong>{{ message.role === 'assistant' ? '助手' : '你' }}</strong></div><details v-if="message.reasoning" class="reasoning"><summary>思考过程</summary><pre>{{ message.reasoning }}</pre></details><div class="bubble" :class="message.role === 'assistant' ? 'bot-bubble' : 'human-bubble'"><MessageMarkdown v-if="message.content" :content="message.content" /><span v-else class="muted">{{ byokSending && index === byokCurrent.messages.length - 1 ? '正在生成…' : '没有回复内容' }}</span></div><small v-if="message.incomplete && !(byokSending && index >= byokCurrent.messages.length - 2)" class="incomplete">未完成 · 不会作为后续上下文</small></div></article></div>
        </template>
        <div v-else class="welcome"><h1>需要我为你做些什么？</h1><p>把问题交给你的助手，开启一段新会话。</p></div>
        <div class="composer-wrap" :class="{centered:!currentConversation}">
          <section v-if="service === 'multica' && selected && replacementAgentId && replacementAgentId !== (selected.assignee_id || '')" class="switch-agent-panel" aria-label="确认切换会话助手"><div><strong>切换到 {{ agentName(replacementAgentId) }} · {{ agentModel(replacementAgentId) }}</strong><p>会话负责人将改变，可能使用不同账号；不更改助手全局模型，不停止已有运行。请求不自动启动新运行，实际行为取决于 Multica 版本。</p></div><div class="switch-agent-actions"><button type="button" class="subtle" :disabled="switchingAgent" @click="replacementAgentId = selected.assignee_id || ''">取消</button><button type="button" class="subtle" :disabled="switchingAgent || uncertain || !onlineAgents.some(agent => agent.id === replacementAgentId)" @click="switchAgent">{{ switchingAgent ? '切换中…' : '确认切换' }}</button></div></section>
          <div v-if="draft.resources.length" class="resource-attachments"><ResourceAttachmentCard v-for="resource in draft.resources" :key="`${draftKey}:${resource.kind}:${resource.id}`" :resource="resource" :disabled="anySending" :multica="service === 'multica'" @update="updateResource" @remove="toggleResource(resource)" /></div>
          <div v-if="draft.articles.length" class="attachments"><span v-for="article in draft.articles" :key="article.url + article.title" class="attachment"><span class="attachment-title" :title="article.title">✦ {{ article.title }}</span><button type="button" class="attachment-remove" :disabled="anySending" :aria-label="`移除 ${article.title}`" title="移除文章" @click="toggleArticle(article)">×</button></span></div>
          <div class="composer"><ComposerTools :panel-open="Boolean(activePanel)" :open-up="currentConversation" @select="activePanel=$event" /><textarea ref="composerInput" v-model="draft.text" :disabled="anySending" rows="1" :placeholder="currentConversation ? '继续输入你的问题…' : '输入你的问题…'" @input="resizeComposer" @keydown="onComposerKeydown" /><ProviderPicker :service="service" :selected-id="service === 'deepseek' ? byokCurrent?.model || byokModel : selected ? replacementAgentId : agentId" :effort="byokCurrent?.reasoningEffort || byokEffort" :agents="onlineAgents" :runtimes="runtimes" :models="deepseekModels" :disabled="anySending || switchingAgent || (service === 'multica' && uncertain)" :loading="agentsLoading" :error="agentsError" :fallback-name="selected && service === 'multica' ? agentName(selected.assignee_id) : undefined" @choose-agent="chooseAgent" @choose-model="service === 'deepseek' ? byok.chooseModel($event) : chooseDeepseek($event)" @choose-effort="byok.chooseEffort" @open-settings="openSettings('deepseek')" @retry="refresh" /><button v-if="byokSending" type="button" class="send-button stop-button" aria-label="停止生成" @click="byok.stop">■</button><button v-else type="button" class="send-button" :disabled="sending || switchingAgent || !draft.text.trim() || (service === 'deepseek' ? !byokConfigured : uncertain || (selected && replacementAgentId !== (selected.assignee_id || '')) || !connected || (!selected && (!agentId || agentsLoading || Boolean(agentsError))))" aria-label="发送消息" @click="send">{{ sending ? '…' : '↑' }}</button></div>
          <p class="composer-hint"><template v-if="service === 'multica' && !connected && !loading">请先<button class="inline-setting" type="button" @click="openSettings('multica')">连接服务</button>，或选择其他模型。</template><template v-else-if="service === 'deepseek' && !byokConfigured">请先<button class="inline-setting" type="button" @click="openSettings('deepseek')">配置 API Key</button>。</template><template v-else-if="draft.articles.length || draft.resources.length">所选资源将随消息发送，请检查敏感内容。</template><span>Enter 发送 · Shift + Enter 换行</span></p>
        </div>
      </main>
      <AiHotPanel v-if="activePanel === 'aihot'" :selected="draft.articles" @close="activePanel=null" @select="selectArticle" />
      <ResourcePanel v-else-if="activePanel === 'bilibili' || activePanel === 'github'" :key="activePanel" :kind="activePanel" :selected-resources="draft.resources" :disabled="anySending" @select="toggleResource" @close="activePanel=null" />
      <TodoistPanel v-else-if="activePanel === 'todoist'" @close="activePanel=null" />
    </div>
    <AiSettings v-if="settingsOpen" :initial-tab="settingsTab" @close="!settingsBusy && (settingsOpen=false)" @connection-changed="onConnectionChanged" @config-changed="refreshByokConfig" @busy-changed="settingsBusy=$event" />
  </section>
</template>
<style scoped>
.reasoning { margin:6px 0; color:var(--muted,#7d8ba0); font-size:11px; }.reasoning summary { cursor:pointer; }.reasoning pre { white-space:pre-wrap; overflow-wrap:anywhere; max-height:240px; overflow:auto; font:inherit; line-height:1.6; }.incomplete { display:block; margin-top:4px; color:#b77912; font-size:11px; }.stop-button { font-size:12px!important; }.inline-setting { border:0; background:transparent; color:#7569ec; padding:0 3px; cursor:pointer; font:inherit; }
.service-switch { display:flex; justify-content:space-between; align-items:center; gap:5px; margin:0 2px 12px; font-size:11px; color:var(--muted,#94a3b8); }.service-switch button { border:0; background:transparent; color:#7569df; cursor:pointer; font-size:11px; }
/* Override the shared fullscreen inset while preserving space for the Dock. */
#multica.card.card-fullscreen { padding:0 0 74px !important; }
.agent-workspace { display:flex!important; flex-direction:column!important; padding:0!important; background:var(--panel,#fff)!important; color:var(--text,#26334b); font:13px/1.5 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; overflow:hidden!important; }.agent-workspace * { box-sizing:border-box; }.agent-workspace button,.agent-workspace textarea,.agent-workspace select { font:inherit; }.agent-workspace button { cursor:pointer; }.agent-workspace button:disabled { opacity:.5; cursor:not-allowed; }.agent-topbar { min-height:68px; padding:0 26px; display:flex; align-items:center; justify-content:space-between; gap:18px; border-bottom:1px solid var(--border,#e9edf4); background:var(--panel,#fff); }.brand,.top-actions { display:flex; align-items:center; gap:12px; }.brand strong,.brand small { display:block; }.brand strong { font-size:15px; }.brand small { color:#9aa6bc; font-size:9px; letter-spacing:.13em; }.logo { width:36px; height:36px; display:grid; place-items:center; border-radius:12px; color:#fff; font-size:24px; background:linear-gradient(145deg,#736af0,#6abcec); }.top-actions { gap:8px; }.top-actions button,.top-actions a,.subtle { color:var(--text,#52627a); background:var(--surface,#fff); border:1px solid var(--border,#e4e9f1); border-radius:8px; padding:7px 11px; text-decoration:none; font-size:12px; }.connection { color:#8492a8; font-size:11px; white-space:nowrap; }.connection i { display:inline-block; width:7px; height:7px; border-radius:50%; background:#cbd5e1; margin-right:6px; }.connection i.online { background:#43c893; }.workspace-body { flex:1; min-height:0; display:flex; position:relative; background:var(--bg,#f7f8fc); padding:12px; gap:12px; }.side-panel { width:248px; flex:none; min-height:0; padding:14px; display:flex; flex-direction:column; border:1px solid var(--border,#e4e9f1); border-radius:16px; background:var(--panel,#fff); box-shadow:0 4px 20px rgba(0,0,0,.04); }.new-button { width:100%; padding:12px; border:1px solid #a5d9ef; border-radius:10px; text-align:left; color:var(--text,#26334b); font-weight:650!important; background:linear-gradient(110deg,rgba(99,190,238,.16),rgba(157,139,244,.09)); }.new-button span { color:#6999e6; font-size:18px; margin-right:6px; }.session-header { display:flex; justify-content:space-between; align-items:center; margin:16px 4px 8px; }.session-header small { color:#a2aec0; font-size:10px; }.session-list { flex:1; overflow:auto; min-height:0; display:flex; flex-direction:column; gap:4px; }.session-item { display:flex; flex-direction:column; gap:4px; text-align:left; background:transparent; border:1px solid transparent; border-radius:8px; padding:9px; color:var(--text,#26334b); }.session-item:hover { background:var(--surface,#f4f6fb); }.session-item.chosen { background:rgba(111,103,232,.09); border-color:rgba(111,103,232,.14); }.session-top { display:flex; justify-content:space-between; color:#998ff1; font-size:10px; }.session-top span:last-child,.session-item small { color:#9aa7ba; }.session-top .session-status.review:last-child { color:#b77912; }.session-top .session-status.done:last-child { color:#16835a; }.session-top .session-status.pending:last-child { color:#d34545; }.session-item strong { font-size:12px; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }.session-item small { font-size:10px; }.side-footer { padding:11px; border-radius:9px; background:linear-gradient(115deg,rgba(129,112,244,.1),rgba(80,197,225,.09)); font-size:11px; }.side-footer small { display:block; margin-left:22px; color:#9caac0; font-size:10px; }
.workspace-main { flex:1; min-width:0; min-height:0; display:flex; flex-direction:column; overflow:auto; padding:24px clamp(16px,3.5vw,48px) 16px; border:1px solid var(--border,#e4e9f1); border-radius:16px; background:var(--panel,#fff); box-shadow:0 4px 20px rgba(0,0,0,.03); }.workspace-main.new-view { background:radial-gradient(ellipse at 50% 50%,rgba(128,193,248,.24),transparent 65%); }.conversation-header { display:flex; justify-content:space-between; align-items:center; gap:18px; width:100%; max-width:920px; margin:0 auto; padding-bottom:18px; border-bottom:1px solid var(--border,#e8ebf3); }.conversation-header small { color:#8f83e9; }.conversation-header h2 { margin:6px 0; font-size:20px; }.conversation-header p { margin:0; color:#98a5b9; font-size:12px; }.conversation { flex:1; min-height:0; overflow:auto; width:100%; max-width:920px; margin:0 auto; padding:20px 8px 16px; }.day-divider { text-align:center; color:#b1bbca; font-size:10px; margin-bottom:22px; }.bubble-row { display:flex; gap:10px; align-items:flex-start; margin-bottom:21px; }.avatar { flex:none; width:32px; height:32px; display:grid; place-items:center; border-radius:11px; font-size:12px; font-weight:700; }.avatar.bot { color:#fff; background:linear-gradient(140deg,#8577f1,#69b9e9); }.avatar.person { color:#8a78e4; background:#ece9fc; }.bubble-content { max-width:min(720px,90%); min-width:0; }.bubble-meta { display:flex; gap:10px; margin-bottom:6px; font-size:11px; }.bubble-meta span { color:#b1bdcd; }.bubble { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.75; padding:13px 16px; border-radius:4px 14px 14px 14px; }.bot-bubble { background:var(--panel,#fff); border:1px solid var(--border,#e9edf4); }.human-bubble { background:rgba(118,106,232,.08); border:1px solid rgba(118,106,232,.10); }.welcome { margin:auto auto 25px; text-align:center; }.welcome h1 { font-size:clamp(26px,3vw,36px); font-weight:500; margin:0 0 12px; }.welcome p { color:#98a5b9; }.composer-wrap { width:100%; max-width:920px; margin:12px auto 0; }.composer-wrap.centered { max-width:760px; margin:0 auto auto; }.composer { display:flex; align-items:center; gap:8px; padding:10px 12px; border:1px solid var(--border,#e1e6f0); border-radius:20px; background:var(--panel,#fff); box-shadow:0 7px 28px #5d6c8b18; }.centered .composer { border-radius:32px; padding:11px 14px; }.composer textarea { flex:1; min-width:0; max-height:160px; border:0; outline:0; resize:vertical; background:transparent; color:var(--text,#26334b); padding:8px 2px; }.composer select { max-width:180px; border:0; outline:0; background:transparent; color:var(--text,#52627a); font-size:12px; }.add-button,.send-button { flex:none; width:34px; height:34px; border:0; border-radius:50%; font-size:21px!important; background:transparent; color:var(--text,#52627a); }.add-button.on { background:#ebedff; color:#7569ec; }.send-button { background:#7569ec; color:white; }.composer-hint { color:#9caabd; font-size:10px; margin:8px 12px; }.composer-hint span { float:right; }.attachments { display:flex; flex-wrap:wrap; gap:6px; margin:0 8px 8px; }.attachment { max-width:270px; padding:5px 8px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; background:rgba(92,177,230,.12); border-radius:8px; color:var(--text,#456582); font-size:11px; }.attachment button { border:0; background:transparent; color:inherit; }.muted { color:#9ba8bc; font-size:12px; }.alert { color:#b45309; background:rgba(245,158,11,.12); padding:9px; border-radius:7px; }.notice { color:#a05b14; font-size:12px; }.disconnected { margin:auto; text-align:center; }.disconnected p { color:#9ba8bc; }.primary { border:0; border-radius:8px; padding:9px 15px; background:#7668e9; color:white; }
.conversation-actions,.switch-agent-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }.switch-agent-panel { width:100%; max-width:920px; box-sizing:border-box; margin:10px auto; padding:12px 14px; border:1px solid var(--border,#dfe5ed); border-radius:10px; background:var(--panel,#fff); }.switch-agent-panel p { margin:4px 0 8px; font-size:11px; color:var(--muted,#64748b); line-height:1.5; }
.resource-attachments { display:flex; flex-wrap:wrap; gap:8px; max-height:40vh; overflow:auto; margin:0 8px 8px; }
.attachment { display:inline-flex; align-items:center; gap:6px; max-width:min(320px,100%); overflow:visible; }
.attachment-title { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.attachment .attachment-remove { flex:none; display:grid; place-items:center; width:20px; height:20px; padding:0; border-radius:50%; font-size:16px; line-height:1; color:var(--text,#52627a); cursor:pointer; }
.attachment .attachment-remove:hover,.attachment .attachment-remove:focus-visible { background:rgba(82,98,122,.16); }
.workspace-settings-button { position:absolute; z-index:4; right:28px; top:24px; padding:7px 11px; border:1px solid var(--border,#e4e9f1); border-radius:8px; background:var(--panel,#fff); color:var(--text,#52627a); font-size:12px; }
.workspace-settings-button:hover { background:var(--surface,#f4f6fb); }
.conversation-header { padding-right:82px; }
.multica-settings-overlay { position:absolute; inset:0; z-index:40; display:flex; align-items:flex-start; justify-content:flex-end; padding:60px 20px 20px; background:rgba(15,23,42,.25); }
.multica-settings-dialog { width:min(480px,100%); max-height:100%; overflow:auto; padding:18px; border:1px solid var(--border,#e4e9f1); border-radius:12px; background:var(--panel,#fff); box-shadow:0 15px 40px #0f172a30; }
.multica-settings-dialog > header { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:16px; }.multica-settings-dialog h2 { margin:0; font-size:16px; }.multica-settings-dialog > header button { border:1px solid var(--border,#e4e9f1); border-radius:7px; padding:5px 9px; background:var(--surface,#fff); color:var(--text,#52627a); }
.side-loading { padding:4px 9px; }.side-error { padding:5px 9px; color:#b45309; font-size:11px; overflow-wrap:anywhere; }.side-error button { padding:2px 5px; border:0; background:transparent; color:#7569ec; }
.composer { min-height:58px; padding:8px 12px; }
.centered .composer { padding:8px 12px; }
.composer textarea { display:block; width:0; min-height:22px; max-height:160px; padding:0 2px; line-height:22px; resize:none; overflow-y:auto; }
.add-button,.send-button { display:grid; place-items:center; padding:0; line-height:1; }
@media(max-width:850px) { .side-panel { width:190px; }.connection { display:none; }.workspace-main { padding:20px; }.composer-hint span { display:none; } }
</style>
