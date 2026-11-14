// BYOK credentials and conversations are device-local and intentionally absent from sync whitelists.
declare const chrome: any;
export const BYOK_PROVIDERS = [{ id: 'deepseek', name: 'DeepSeek', defaultModel: 'deepseek-flash' }] as const;
export type ProviderId = typeof BYOK_PROVIDERS[number]['id'];
export type ReasoningEffort = 'none' | 'low' | 'high' | 'max';
export interface ChatMessage { role: 'user' | 'assistant'; content: string; reasoning?: string; incomplete?: boolean }
export interface LocalConversation { id: string; provider: ProviderId; model: string; title: string; updatedAt: number; messages: ChatMessage[]; reasoningEffort?: ReasoningEffort }
export function supportsReasoningEffort(model: string): boolean { return model === 'deepseek-flash' || model === 'deepseek-v4-pro'; }
const CONFIG = 'byokConfigV1', HISTORY = 'byokConversationsV1';
const area = () => chrome.storage.local;
export async function loadConfig(): Promise<{ key: string; model: string; models: string[] }> {
  const raw = (await area().get(CONFIG))[CONFIG]?.deepseek;
  const models = Array.isArray(raw?.models) ? raw.models.filter((m: unknown) => typeof m === 'string' && /^[a-zA-Z0-9._-]{1,100}$/.test(m)) : [];
  return { key: typeof raw?.key === 'string' ? raw.key : '', model: typeof raw?.model === 'string' && raw.model ? raw.model : 'deepseek-flash', models };
}
export async function saveConfig(key: string, model: string, models?: string[]): Promise<void> {
  const clean = key.trim(), chosen = model.trim();
  if (!clean || !/^[\x21-\x7e]{1,512}$/.test(clean)) throw new Error('请填写有效的 API Key，不能包含空格或换行。');
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(chosen)) throw new Error('模型名称格式无效。');
  const existing = (await area().get(CONFIG))[CONFIG];
  const previous = existing?.deepseek;
  const safeModels = (models || (previous?.key === clean && Array.isArray(previous?.models) ? previous.models : [])).filter((m: unknown): m is string => typeof m === 'string' && /^[a-zA-Z0-9._-]{1,100}$/.test(m)).slice(0, 200);
  await area().set({ [CONFIG]: { ...(existing && typeof existing === 'object' ? existing : {}), deepseek: { key: clean, model: chosen, models: safeModels } } });
}
export async function fetchDeepSeekModels(key: string): Promise<string[]> {
  const clean = key.trim();
  if (!/^[\x21-\x7e]{1,512}$/.test(clean)) throw new Error('请先填写有效的 DeepSeek API Key。');
  let response: Response;
  try { response = await fetch('https://api.deepseek.com/models', { headers: { Authorization: `Bearer ${clean}`, Accept: 'application/json' }, credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer', cache: 'no-store', signal: AbortSignal.timeout(15000) }); }
  catch { throw new Error('无法连接 DeepSeek 获取模型，请检查网络后重试。'); }
  if (!response.ok) { void response.body?.cancel().catch(() => {}); throw new Error(response.status === 401 ? 'DeepSeek API Key 无效或已过期（401）。' : `获取模型失败（HTTP ${response.status}），请稍后重试。`); }
  let body: unknown;
  try { body = await response.json(); } catch { throw new Error('DeepSeek 返回的模型列表格式无效。'); }
  const data = (body as { data?: unknown })?.data;
  if (!Array.isArray(data)) throw new Error('DeepSeek 返回的模型列表格式无效。');
  const models = [...new Set(data.map(item => item?.id).filter((id): id is string => typeof id === 'string' && /^[a-zA-Z0-9._-]{1,100}$/.test(id)))].slice(0, 200);
  if (!models.length) throw new Error('DeepSeek 未返回可用模型。');
  return models;
}
export async function clearConfig(): Promise<void> {
  const existing = (await area().get(CONFIG))[CONFIG];
  const next = { ...(existing && typeof existing === 'object' ? existing : {}) }; delete next.deepseek;
  await area().set({ [CONFIG]: next });
}
export async function loadConversations(): Promise<LocalConversation[]> {
  const value = (await area().get(HISTORY))[HISTORY];
  return Array.isArray(value) ? value.filter(v => v && v.provider === 'deepseek' && typeof v.id === 'string' && Array.isArray(v.messages)) : [];
}
async function historyLock<T>(action: () => Promise<T>): Promise<T> {
  return typeof navigator !== 'undefined' && navigator.locks ? navigator.locks.request('tab-project:byok-history', action) : action();
}
export async function saveConversation(conversation: LocalConversation): Promise<void> {
  await historyLock(async () => {
    const list = await loadConversations();
    const snapshot: LocalConversation = JSON.parse(JSON.stringify(conversation));
    if (list.length >= 50 && !list.some(c => c.id === snapshot.id)) throw new Error('本机会话已达 50 条，请先删除不需要的会话。');
    await area().set({ [HISTORY]: [snapshot, ...list.filter(c => c.id !== snapshot.id)] });
  });
}
export async function deleteConversation(id: string): Promise<void> {
  await historyLock(async () => { await area().set({ [HISTORY]: (await loadConversations()).filter(c => c.id !== id) }); });
}

/** Send once only: the request may have been billed even when the stream fails. */
export async function streamDeepSeek(key: string, model: string, messages: ChatMessage[], signal: AbortSignal, onText: (text: string) => void, effort?: ReasoningEffort, onReasoning?: (text: string) => void): Promise<void> {
  const clean = key.trim();
  if (!/^[\x21-\x7e]{1,512}$/.test(clean)) throw new Error('请先在设置中填写有效的 DeepSeek API Key。');
  if (!/^[a-zA-Z0-9._-]{1,100}$/.test(model)) throw new Error('模型名称格式无效。');
  const history = messages.filter(m => !m.incomplete && (m.role === 'user' || m.role === 'assistant')).map(m => ({ role: m.role, content: m.content }));
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { Authorization: `Bearer ${clean}`, 'Content-Type': 'application/json', Accept: 'text/event-stream' },
    body: JSON.stringify({ model, messages: history, stream: true, ...(supportsReasoningEffort(model) && effort && ['none','low','high','max'].includes(effort) ? { reasoning_effort: effort } : {}) }), signal, credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer', cache: 'no-store'
  });
  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    if (response.status === 401) throw new Error('DeepSeek API Key 无效或已过期（401）。');
    if (response.status === 402) throw new Error('DeepSeek API 余额不足（402），请检查 API 账户。');
    if (response.status === 429) throw new Error('DeepSeek 请求过于频繁（429），请稍后再试。');
    throw new Error(`DeepSeek 请求失败（HTTP ${response.status}），请检查模型、余额或网络。`);
  }
  if (!response.body) throw new Error('DeepSeek 未返回回复流。');
  const reader = response.body.getReader(), decoder = new TextDecoder();
  let buffer = '', done = false, length = 0;
  const process = (event: string) => {
    const data = event.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
    if (!data) return;
    if (data.trim() === '[DONE]') { done = true; return; }
    let chunk: any;
    try { chunk = JSON.parse(data); } catch { throw new Error('DeepSeek 回复流格式异常。'); }
    if (chunk.error) throw new Error('DeepSeek 回复流出现错误，请检查账户后重试。');
    const delta = chunk?.choices?.[0]?.delta;
    for (const [text, callback] of [[delta?.content, onText], [delta?.reasoning_content, onReasoning]] as const) {
      if (typeof text === 'string' && text) { length += text.length; if (length > 1000000) throw new Error('回复过长，已停止接收。'); callback?.(text); }
    }
  };
  try {
    while (!done) {
      const part = await reader.read();
      buffer += decoder.decode(part.value, { stream: !part.done }).replace(/\r\n/g, '\n');
      let end: number;
      while ((end = buffer.indexOf('\n\n')) >= 0) { const event = buffer.slice(0, end); buffer = buffer.slice(end + 2); process(event); }
      if (buffer.length > 2000000) throw new Error('DeepSeek 回复流过大。');
      if (part.done) break;
    }
    if (!done) throw new Error('回复连接提前中断，内容可能不完整；请求可能已计费。');
  } finally { void reader.cancel().catch(() => {}); reader.releaseLock(); }
}
