import { computed, onBeforeUnmount, reactive, ref } from 'vue';
import { deleteConversation, loadConfig, loadConversations, saveConversation, streamDeepSeek, type ChatMessage, type LocalConversation, type ReasoningEffort } from '../services/byok.service';
import { sessionTitle } from './session-content';

/** Local chat state only; the workbench owns the single shared UI and composer. */
export function useByokChat() {
  const conversations = ref<LocalConversation[]>([]), currentId = ref(''), error = ref('');
  const configured = ref(false), model = ref('deepseek-flash'), effort = ref<ReasoningEffort>('high'), loading = ref(false), sending = ref(false);
  const current = computed(() => conversations.value.find(item => item.id === currentId.value));
  let controller: AbortController | null = null, closed = false;
  onBeforeUnmount(() => { closed = true; controller?.abort(); });
  async function refreshConfig() { const config = await loadConfig(); configured.value = Boolean(config.key); if (!current.value) model.value = config.model; return config; }
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
    try {
      const config = await loadConfig(); if (!config.key) throw new Error('请先在设置中配置 DeepSeek API Key。');
      chat = current.value || reactive<LocalConversation>({ id: crypto.randomUUID(), provider: 'deepseek', model: model.value, reasoningEffort: effort.value, title: sessionTitle(prompt), updatedAt: Date.now(), messages: [] });
      const history: ChatMessage[] = [...chat.messages.filter(m => !m.incomplete), { role: 'user', content }];
      user = { role: 'user', content, incomplete: true }; assistant = { role: 'assistant', content: '', incomplete: true };
      chat.messages.push(user, assistant); user = chat.messages[chat.messages.length - 2]; assistant = chat.messages[chat.messages.length - 1]; chat.updatedAt = Date.now();
      await saveConversation(chat);
      if (controller.signal.aborted || closed) { chat.messages.splice(-2); if (chat.messages.length) await saveConversation(chat); else await deleteConversation(chat.id); throw new DOMException('已停止生成。', 'AbortError'); }
      if (!current.value) { conversations.value.unshift(chat); currentId.value = chat.id; }
      accepted(); sent = true;
      await streamDeepSeek(config.key, chat.model, history, controller.signal, chunk => { if (assistant) assistant.content += chunk; }, chat.reasoningEffort || 'high', chunk => { if (assistant) assistant.reasoning = (assistant.reasoning || '') + chunk; });
      if (!assistant.content.trim()) throw new Error('没有返回可显示的正文。');
      user.incomplete = false; assistant.incomplete = false;
    } catch (e) {
      if (chat && user && assistant && !sent) chat.messages = chat.messages.filter(m => m !== user && m !== assistant);
      if (!closed) error.value = controller?.signal.aborted ? '已停止生成；请求可能已计费。未完成的内容不会加入后续上下文。' : `${e instanceof Error ? e.message : '请求失败'}${sent ? ' 请求可能已计费，未完成内容不会加入后续上下文。' : ''}`;
    } finally {
      if (chat && sent) { chat.updatedAt = Date.now(); try { await saveConversation(chat); } catch { if (!closed) error.value = '回复保存失败，请勿关闭页面并检查浏览器存储。'; } }
      controller = null; sending.value = false;
    }
  }
  return { conversations, currentId, current, error, configured, model, effort, loading, sending, refreshConfig, refreshHistory, newChat, selectChat, removeChat, chooseModel, chooseEffort, stop, send };
}
