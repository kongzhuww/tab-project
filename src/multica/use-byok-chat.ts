import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import {
  BYOK_HISTORY_KEY,
  deleteConversation,
  loadConfig,
  loadConversations,
  saveConversation,
  streamOpenAiCompatible,
  type ChatMessage,
  type LocalConversation,
  type ReasoningEffort,
} from '../services/byok.service';
import { sessionTitle } from './session-content';
import { publishAiNotification } from './ai-notifications';

/** Local chat state only; the workbench owns the single shared UI and composer. */
export function useByokChat() {
  const conversations = ref<LocalConversation[]>([]), currentId = ref(''), error = ref('');
  const configured = ref(false), model = ref('deepseek-flash'), providerLabel = ref('DeepSeek'), effort = ref<ReasoningEffort>('high'), loading = ref(false), sending = ref(false);
  const current = computed(() => conversations.value.find(item => item.id === currentId.value));
  let controller: AbortController | null = null, closed = false;
  const onHistoryChange = (changes: any, area: string) => {
    if (area === 'local' && changes[BYOK_HISTORY_KEY] && !sending.value) void refreshHistory().catch(() => { if (!closed) error.value = '本地会话读取失败。'; });
  };
  onMounted(() => { if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(onHistoryChange); });
  onBeforeUnmount(() => { closed = true; controller?.abort(); if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(onHistoryChange); });
  async function refreshConfig() {
    const config = await loadConfig();
    configured.value = config.configured;
    providerLabel.value = config.label || 'DeepSeek';
    if (!current.value) model.value = config.model;
    return config;
  }
  async function refreshHistory() { const list = await loadConversations(); if (!sending.value) conversations.value = list; }
  function newChat() { if (!sending.value) { currentId.value = ''; error.value = ''; } }
  function selectChat(id: string) { if (!sending.value) { currentId.value = id; error.value = ''; } }
  async function removeChat(id: string) {
    if (sending.value) return;
    try { await deleteConversation(id); await refreshHistory(); if (currentId.value === id) currentId.value = ''; }
    catch { error.value = '删除本地会话失败，请重试。'; }
  }
  async function chooseModel(chosen: string) {
    if (sending.value) return;
    if (!current.value) { model.value = chosen; return; }
    const chat = current.value, previous = chat.model; chat.model = chosen;
    try { await saveConversation(chat); }
    catch { chat.model = previous; error.value = '保存模型选择失败，请重试。'; }
  }
  async function chooseEffort(value: ReasoningEffort) {
    if (sending.value) return;
    if (!current.value) { effort.value = value; return; }
    const chat = current.value, previous = chat.reasoningEffort; chat.reasoningEffort = value;
    try { await saveConversation(chat); } catch { chat.reasoningEffort = previous; error.value = '保存思考强度失败，请重试。'; }
  }
  function stop() { controller?.abort(); }
  async function send(prompt: string, content: string, accepted: () => void) {
    if (sending.value || loading.value || !configured.value || !prompt.trim()) return;
    if (content.length > 100000) { error.value = '消息及附件内容过长，请控制在 100,000 字符以内。'; return; }
    sending.value = true; error.value = ''; controller = new AbortController();
    let chat: LocalConversation | undefined, user: ChatMessage | undefined, assistant: ChatMessage | undefined, sent = false;
    let outcome: 'success' | 'error' | 'unknown' | null = null;
    let activeLabel = providerLabel.value || 'AI 模型';
    try {
      const config = await loadConfig();
      if (!config.configured) throw new Error('请先在设置中配置云端模型 API Key 或本机 Ollama。');
      activeLabel = config.label || 'AI 模型';
      providerLabel.value = activeLabel;
      chat = current.value || reactive<LocalConversation>({ id: crypto.randomUUID(), provider: 'deepseek', model: model.value, reasoningEffort: effort.value, title: sessionTitle(prompt), updatedAt: Date.now(), messages: [] });
      const history: ChatMessage[] = [...chat.messages.filter(m => !m.incomplete), { role: 'user', content }];
      const startedAt = Date.now();
      user = { role: 'user', content, incomplete: true, createdAt: startedAt }; assistant = { role: 'assistant', content: '', incomplete: true, createdAt: startedAt };
      chat.messages.push(user, assistant); user = chat.messages[chat.messages.length - 2]; assistant = chat.messages[chat.messages.length - 1]; chat.updatedAt = Date.now();
      await saveConversation(chat);
      if (controller.signal.aborted || closed) { chat.messages.splice(-2); if (chat.messages.length) await saveConversation(chat); else await deleteConversation(chat.id); throw new DOMException('已停止生成。', 'AbortError'); }
      if (!current.value) { conversations.value.unshift(chat); currentId.value = chat.id; }
      accepted(); sent = true;
      await streamOpenAiCompatible(
        config,
        chat.model,
        history,
        controller.signal,
        chunk => { if (assistant) assistant.content += chunk; },
        chat.reasoningEffort || 'high',
        chunk => { if (assistant) assistant.reasoning = (assistant.reasoning || '') + chunk; }
      );
      if (!assistant.content.trim()) throw new Error('没有返回可显示的正文。');
      user.incomplete = false; assistant.incomplete = false; assistant.durationMs = Date.now() - startedAt; assistant.createdAt = Date.now();
      outcome = 'success';
    } catch (e) {
      if (sent && !controller?.signal.aborted) outcome = e instanceof Error && /（(?:401|402|429)）|HTTP \d{3}/.test(e.message) ? 'error' : 'unknown';
      if (chat && user && assistant && !sent) chat.messages = chat.messages.filter(m => m !== user && m !== assistant);
      if (!closed) error.value = controller?.signal.aborted ? '已停止生成；请求可能已计费。未完成的内容不会加入后续上下文。' : `${e instanceof Error ? e.message : '请求失败'}${sent ? ' 请求可能已计费，未完成内容不会加入后续上下文。' : ''}`;
    } finally {
      if (chat && sent) {
        chat.updatedAt = Date.now();
        try { await saveConversation(chat); }
        catch { outcome = 'unknown'; if (!closed) error.value = '回复保存失败，请勿关闭页面并检查浏览器存储。'; }
        if (outcome) {
          try { await publishAiNotification(`ai_ds_${crypto.randomUUID()}`, activeLabel, chat.title, outcome); }
          catch { if (!closed) error.value = '回复已结束，但通知未能保存，请在当前会话查看结果。'; }
        }
      }
      controller = null; sending.value = false;
    }
  }
  return { conversations, currentId, current, error, configured, model, providerLabel, effort, loading, sending, refreshConfig, refreshHistory, newChat, selectChat, removeChat, chooseModel, chooseEffort, stop, send };
}
