// BYOK credentials and conversations are device-local and intentionally absent from sync whitelists.
declare const chrome: any;
export const BYOK_PROVIDERS = [{ id: 'deepseek', name: 'DeepSeek', defaultModel: 'deepseek-flash' }] as const;
export type ProviderId = typeof BYOK_PROVIDERS[number]['id'];
export type OpenAiCompatPresetId =
  | 'deepseek'
  | 'siliconflow'
  | 'moonshot'
  | 'zhipu'
  | 'dashscope'
  | 'openai'
  | 'openrouter'
  | 'ollama'
  | 'lmstudio'
  | 'custom';

export interface OpenAiCompatPreset {
  id: OpenAiCompatPresetId;
  name: string;
  shortTag: string;
  group: 'cn' | 'global' | 'local' | 'custom';
  baseUrl: string;
  defaultModel: string;
  suggestedModels: string[];
  requiresKey: boolean;
  keyPlaceholder: string;
  docsUrl: string;
  docsLabel: string;
  note: string;
}

export const OPENAI_COMPAT_PRESETS: readonly OpenAiCompatPreset[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    shortTag: '国内推荐',
    group: 'cn',
    baseUrl: 'https://api.deepseek.com',
    defaultModel: 'deepseek-chat',
    suggestedModels: ['deepseek-chat', 'deepseek-reasoner', 'deepseek-flash', 'deepseek-v4-pro'],
    requiresKey: true,
    keyPlaceholder: 'sk-...',
    docsUrl: 'https://platform.deepseek.com/api_keys',
    docsLabel: '获取 DeepSeek Key / 查看价格 ↗',
    note: '直连 DeepSeek 官方接口，高性价比中文推理。',
  },
  {
    id: 'siliconflow',
    name: '硅基流动 SiliconFlow',
    shortTag: '国内聚合',
    group: 'cn',
    baseUrl: 'https://api.siliconflow.cn/v1',
    defaultModel: 'deepseek-ai/DeepSeek-V3',
    suggestedModels: ['deepseek-ai/DeepSeek-V3', 'deepseek-ai/DeepSeek-R1', 'Qwen/Qwen2.5-72B-Instruct'],
    requiresKey: true,
    keyPlaceholder: 'sk-...',
    docsUrl: 'https://cloud.siliconflow.cn/account/ak',
    docsLabel: '前往硅基流动控制台 ↗',
    note: '国内直连聚合平台，注册即有体验额度，支持 DeepSeek / Qwen / GLM 等。',
  },
  {
    id: 'moonshot',
    name: 'Kimi（月之暗面）',
    shortTag: '长文本',
    group: 'cn',
    baseUrl: 'https://api.moonshot.cn/v1',
    defaultModel: 'moonshot-v1-8k',
    suggestedModels: ['moonshot-v1-8k', 'moonshot-v1-32k', 'kimi-latest'],
    requiresKey: true,
    keyPlaceholder: 'sk-...',
    docsUrl: 'https://platform.moonshot.cn/console/api-keys',
    docsLabel: '前往 Moonshot 开放平台 ↗',
    note: '擅长中文长文阅读与总结。',
  },
  {
    id: 'zhipu',
    name: '智谱 GLM',
    shortTag: '国内',
    group: 'cn',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4-flash',
    suggestedModels: ['glm-4-flash', 'glm-4-plus', 'glm-z1-flash'],
    requiresKey: true,
    keyPlaceholder: '输入智谱 API Key',
    docsUrl: 'https://open.bigmodel.cn/usercenter/apikeys',
    docsLabel: '前往智谱开放平台 ↗',
    note: '提供免费 glm-4-flash 与高阶 GLM 模型。',
  },
  {
    id: 'dashscope',
    name: '阿里百炼（通义千问）',
    shortTag: '国内',
    group: 'cn',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    defaultModel: 'qwen-plus',
    suggestedModels: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwq-plus'],
    requiresKey: true,
    keyPlaceholder: 'sk-...',
    docsUrl: 'https://bailian.console.aliyun.com/',
    docsLabel: '前往阿里云百炼控制台 ↗',
    note: '使用阿里云百炼 OpenAI 兼容接口调用 Qwen 系列。',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    shortTag: '海外',
    group: 'global',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
    suggestedModels: ['gpt-4o-mini', 'gpt-4o', 'o4-mini'],
    requiresKey: true,
    keyPlaceholder: 'sk-...',
    docsUrl: 'https://platform.openai.com/api-keys',
    docsLabel: 'OpenAI API Keys ↗',
    note: 'OpenAI 官方接口（可配合自定义中转 Base URL 使用）。',
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    shortTag: '全球聚合',
    group: 'global',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'openai/gpt-4o-mini',
    suggestedModels: ['openai/gpt-4o-mini', 'anthropic/claude-3.7-sonnet', 'google/gemini-2.5-flash'],
    requiresKey: true,
    keyPlaceholder: 'sk-or-...',
    docsUrl: 'https://openrouter.ai/keys',
    docsLabel: '前往 OpenRouter ↗',
    note: '一个 Key 统一调用 Claude / GPT / Gemini / DeepSeek 等数百款模型。',
  },
  {
    id: 'ollama',
    name: 'Ollama（本机免费）',
    shortTag: '本机免 Key',
    group: 'local',
    baseUrl: 'http://localhost:11434/v1',
    defaultModel: 'qwen2.5:7b',
    suggestedModels: ['qwen2.5:7b', 'deepseek-r1:7b', 'llama3.2:latest'],
    requiresKey: false,
    keyPlaceholder: '可留空（本机免 Key）',
    docsUrl: 'https://ollama.com/',
    docsLabel: '了解 Ollama 本地部署 ↗',
    note: '直接连接本机 Ollama 端口，无需命令行桥接也不用 API Key。若遇 403，请配置 OLLAMA_ORIGINS="*" 后重启 Ollama。',
  },
  {
    id: 'lmstudio',
    name: 'LM Studio（本机免费）',
    shortTag: '本机免 Key',
    group: 'local',
    baseUrl: 'http://localhost:1234/v1',
    defaultModel: 'local-model',
    suggestedModels: ['local-model'],
    requiresKey: false,
    keyPlaceholder: '可留空（或按需填写）',
    docsUrl: 'https://lmstudio.ai/',
    docsLabel: '了解 LM Studio ↗',
    note: '开启 LM Studio Local Server（默认 1234 端口）即可离线免费调用本地模型。',
  },
  {
    id: 'custom',
    name: '自定义 OpenAI 兼容',
    shortTag: '自定义',
    group: 'custom',
    baseUrl: '',
    defaultModel: '',
    suggestedModels: [],
    requiresKey: false,
    keyPlaceholder: '按服务端要求填写（可留空）',
    docsUrl: '',
    docsLabel: '',
    note: '支持 vLLM、OneAPI / NewAPI、企业内网网关或任意 OpenAI /v1/chat/completions 兼容地址。',
  },
] as const;

export function findOpenAiCompatPreset(id?: string | null): OpenAiCompatPreset {
  return OPENAI_COMPAT_PRESETS.find(item => item.id === id) || OPENAI_COMPAT_PRESETS[0];
}

export type ReasoningEffort = 'none' | 'low' | 'high' | 'max';
export interface ChatMessage { role: 'user' | 'assistant'; content: string; reasoning?: string; incomplete?: boolean; createdAt?: number; durationMs?: number }
export interface LocalConversation { id: string; provider: ProviderId; model: string; title: string; updatedAt: number; messages: ChatMessage[]; reasoningEffort?: ReasoningEffort }
export function supportsReasoningEffort(model: string): boolean {
  return model === 'deepseek-flash' || model === 'deepseek-v4-pro' || model === 'deepseek-reasoner';
}

const MODEL_ID_RE = /^[a-zA-Z0-9._:/@-]{1,160}$/;
export function isValidModelId(model: unknown): model is string {
  return typeof model === 'string' && MODEL_ID_RE.test(model.trim());
}

function isLocalOrLanHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1' || host.endsWith('.local')) return true;
  if (/^10\.\d+\.\d+\.\d+$/.test(host) || /^192\.168\.\d+\.\d+$/.test(host)) return true;
  const m = /^172\.(\d+)\.\d+\.\d+$/.exec(host);
  if (m) {
    const second = Number(m[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

export function isLocalBaseUrl(baseUrl: string): boolean {
  try {
    const u = new URL(baseUrl);
    return isLocalOrLanHost(u.hostname);
  } catch {
    return false;
  }
}

export function normalizeBaseUrl(raw: string): string {
  const trimmed = String(raw || '').trim();
  if (!trimmed) throw new Error('请填写接口地址（Base URL）。');
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error('接口地址格式无效，请以 https:// 或 http://localhost 开头。');
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error('接口地址不能包含账号密码或查询参数。');
  }
  if (url.protocol === 'http:') {
    if (!isLocalOrLanHost(url.hostname)) {
      throw new Error('远程接口请使用 https:// 安全连接（本机或局域网服务可使用 http://）。');
    }
  } else if (url.protocol !== 'https:') {
    throw new Error('接口地址仅支持 https:// 或本机 http:// 协议。');
  }
  let cleanPath = url.pathname.replace(/\/+$/, '');
  if (cleanPath.endsWith('/chat/completions')) {
    cleanPath = cleanPath.slice(0, -'/chat/completions'.length);
  } else if (cleanPath.endsWith('/models')) {
    cleanPath = cleanPath.slice(0, -'/models'.length);
  }
  return `${url.origin}${cleanPath}`;
}

export function baseUrlRequiresKey(presetId: string, baseUrl: string): boolean {
  if (presetId === 'ollama' || presetId === 'lmstudio') return false;
  if (presetId === 'custom') return false;
  return !isLocalBaseUrl(baseUrl);
}

const CONFIG = 'byokConfigV1';
export const BYOK_HISTORY_KEY = 'byokConversationsV1';
const HISTORY = BYOK_HISTORY_KEY;
const area = () => chrome.storage.local;

export interface ByokConfig {
  presetId: OpenAiCompatPresetId;
  label: string;
  baseUrl: string;
  key: string;
  model: string;
  models: string[];
  requiresKey: boolean;
  configured: boolean;
}

export interface SaveByokConfigInput {
  presetId?: OpenAiCompatPresetId | string;
  label?: string;
  baseUrl?: string;
  key?: string;
  model: string;
  models?: string[];
}

export interface OpenAiCompatEndpoint {
  baseUrl?: string;
  key?: string;
  label?: string;
  requiresKey?: boolean;
}

function sanitizeModels(models: unknown): string[] {
  return Array.isArray(models)
    ? models.map(m => (typeof m === 'string' ? m.trim() : '')).filter(isValidModelId).slice(0, 200)
    : [];
}

export async function loadConfig(): Promise<ByokConfig> {
  const root = (await area().get(CONFIG))[CONFIG];
  const compat = root?.openaiCompat;
  const legacyDeepSeek = root?.deepseek;

  if (compat && typeof compat === 'object' && typeof compat.baseUrl === 'string' && compat.baseUrl) {
    const preset = findOpenAiCompatPreset(compat.presetId);
    const presetId: OpenAiCompatPresetId = preset.id === compat.presetId ? preset.id : 'custom';
    let safeBaseUrl = preset.baseUrl || 'https://api.deepseek.com';
    try {
      safeBaseUrl = normalizeBaseUrl(compat.baseUrl);
    } catch { /* fallback to preset default */ }
    const key = typeof compat.key === 'string' ? compat.key : '';
    const models = sanitizeModels(compat.models);
    const model = isValidModelId(compat.model) ? compat.model.trim() : (preset.defaultModel || 'deepseek-flash');
    const label = typeof compat.label === 'string' && compat.label.trim() ? compat.label.trim().slice(0, 40) : preset.name;
    const requiresKey = baseUrlRequiresKey(presetId, safeBaseUrl);
    const configured = Boolean(safeBaseUrl && model && (!requiresKey || key));
    return { presetId, label, baseUrl: safeBaseUrl, key, model, models, requiresKey, configured };
  }

  const key = typeof legacyDeepSeek?.key === 'string' ? legacyDeepSeek.key : '';
  const models = sanitizeModels(legacyDeepSeek?.models);
  const model = isValidModelId(legacyDeepSeek?.model) ? legacyDeepSeek.model.trim() : 'deepseek-flash';
  const configured = Boolean(key);
  return {
    presetId: 'deepseek',
    label: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com',
    key,
    model,
    models,
    requiresKey: true,
    configured,
  };
}

export async function saveConfig(
  keyOrInput: string | SaveByokConfigInput,
  legacyModel?: string,
  legacyModels?: string[]
): Promise<void> {
  const input: SaveByokConfigInput = typeof keyOrInput === 'string'
    ? { presetId: 'deepseek', label: 'DeepSeek', baseUrl: 'https://api.deepseek.com', key: keyOrInput, model: legacyModel || '', models: legacyModels }
    : keyOrInput;

  const preset = findOpenAiCompatPreset(input.presetId);
  const presetId: OpenAiCompatPresetId = input.presetId && preset.id === input.presetId ? preset.id : (input.baseUrl ? 'custom' : 'deepseek');
  const rawBaseUrl = typeof input.baseUrl === 'string' ? input.baseUrl : preset.baseUrl;
  const baseUrl = normalizeBaseUrl(rawBaseUrl);
  const requiresKey = baseUrlRequiresKey(presetId, baseUrl);
  const cleanKey = (input.key || '').trim();

  if (requiresKey && !cleanKey) {
    throw new Error(`请填写有效的 ${preset.name} API Key，不能包含空格或换行。`);
  }
  if (cleanKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error('API Key 格式无效，不能包含空格或换行。');
  }
  const chosenModel = (input.model || '').trim();
  if (!isValidModelId(chosenModel)) {
    throw new Error('模型名称格式无效。');
  }

  const existingRoot = (await area().get(CONFIG))[CONFIG];
  const prevCompat = existingRoot?.openaiCompat;
  const prevLegacy = existingRoot?.deepseek;
  const prevKey = typeof prevCompat?.key === 'string' ? prevCompat.key : (typeof prevLegacy?.key === 'string' ? prevLegacy.key : '');
  const prevBaseUrl = typeof prevCompat?.baseUrl === 'string' ? prevCompat.baseUrl : 'https://api.deepseek.com';
  const prevModels = prevCompat?.models ?? prevLegacy?.models;

  const reusedModels = prevKey === cleanKey && prevBaseUrl === baseUrl && Array.isArray(prevModels) ? prevModels : [];
  const safeModels = sanitizeModels(input.models ?? reusedModels);
  const label = typeof input.label === 'string' && input.label.trim()
    ? input.label.trim().slice(0, 40)
    : preset.id === presetId && presetId !== 'custom'
      ? preset.name
      : (() => {
          try { return new URL(baseUrl).host; } catch { return '自定义模型'; }
        })();

  const nextRoot: Record<string, unknown> = {
    ...(existingRoot && typeof existingRoot === 'object' ? existingRoot : {}),
    openaiCompat: { presetId, label, baseUrl, key: cleanKey, model: chosenModel, models: safeModels },
  };
  if (presetId === 'deepseek') {
    nextRoot.deepseek = { key: cleanKey, model: chosenModel, models: safeModels };
  } else {
    delete nextRoot.deepseek;
  }

  await area().set({ [CONFIG]: nextRoot });
}

export async function fetchOpenAiCompatibleModels(endpoint: OpenAiCompatEndpoint): Promise<string[]> {
  const baseUrl = normalizeBaseUrl(endpoint.baseUrl || 'https://api.deepseek.com');
  const label = (endpoint.label || '').trim() || '模型服务';
  const cleanKey = (endpoint.key || '').trim();
  const requiresKey = endpoint.requiresKey ?? !isLocalBaseUrl(baseUrl);
  if (requiresKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error(`请先填写有效的 ${label} API Key。`);
  }
  if (cleanKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error('API Key 格式无效，不能包含空格或换行。');
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/models`, {
      headers: {
        ...(cleanKey ? { Authorization: `Bearer ${cleanKey}` } : {}),
        Accept: 'application/json',
      },
      credentials: 'omit',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    if (isLocalBaseUrl(baseUrl)) {
      throw new Error(`无法连接 ${label}（${baseUrl}）。请确认本地服务已启动，若用 Ollama 请配置 OLLAMA_ORIGINS="*" 后重启。`);
    }
    throw new Error(`无法连接 ${label} 获取模型，请检查接口地址与网络后重试。`);
  }

  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    if (response.status === 401) throw new Error(`${label} API Key 无效或已过期（401）。`);
    if (response.status === 403 && isLocalBaseUrl(baseUrl)) {
      throw new Error(`${label} 拒绝了扩展请求（403）：请设置环境变量 OLLAMA_ORIGINS="*" 后重启本机服务。`);
    }
    throw new Error(`获取 ${label} 模型失败（HTTP ${response.status}），也可手动输入模型 ID 后直接保存。`);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new Error(`${label} 返回的模型列表格式无效。`);
  }

  const dataList = Array.isArray((body as { data?: unknown })?.data)
    ? (body as { data: unknown[] }).data
    : Array.isArray((body as { models?: unknown })?.models)
      ? (body as { models: unknown[] }).models
      : null;

  if (!dataList) throw new Error(`${label} 返回的模型列表格式无效。`);
  const models = [...new Set(
    dataList
      .map(item => (item as any)?.id ?? (item as any)?.name)
      .filter(isValidModelId)
      .map(id => id.trim())
  )].slice(0, 200);
  if (!models.length) throw new Error(`${label} 未返回可用模型，请手动输入模型 ID。`);
  return models;
}

export async function fetchDeepSeekModels(key: string): Promise<string[]> {
  return fetchOpenAiCompatibleModels({
    baseUrl: 'https://api.deepseek.com',
    key,
    label: 'DeepSeek',
    requiresKey: true,
  });
}

export async function clearConfig(): Promise<void> {
  const existing = (await area().get(CONFIG))[CONFIG];
  const next = { ...(existing && typeof existing === 'object' ? existing : {}) };
  delete next.deepseek;
  delete next.openaiCompat;
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

export interface DeepSeekToolCall {
  id: string;
  name: string;
  argumentsJson: string;
}

export interface DeepSeekAgentMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }>;
  tool_call_id?: string;
}

function throwEndpointHttpError(label: string, baseUrl: string, status: number): never {
  if (status === 401) throw new Error(`${label} API Key 无效或已过期（401）。`);
  if (status === 402) throw new Error(`${label} 余额不足（402），请检查账户额度。`);
  if (status === 403 && isLocalBaseUrl(baseUrl)) {
    throw new Error(`${label} 拒绝了扩展请求（403）：请设置 OLLAMA_ORIGINS="*" 后重启本机服务。`);
  }
  if (status === 429) throw new Error(`${label} 请求过于频繁（429），请稍后再试。`);
  throw new Error(`${label} 请求失败（HTTP ${status}），请检查模型名称、余额或网络。`);
}

export async function runOpenAiCompatibleToolTurn(
  endpoint: OpenAiCompatEndpoint,
  model: string,
  messages: DeepSeekAgentMessage[],
  tools: Array<{ type: 'function'; function: { name: string; description: string; parameters: Record<string, unknown> } }>,
  signal: AbortSignal,
  effort?: ReasoningEffort
): Promise<{ content: string; reasoning: string; toolCalls: DeepSeekToolCall[] }> {
  const baseUrl = normalizeBaseUrl(endpoint.baseUrl || 'https://api.deepseek.com');
  const label = (endpoint.label || '').trim() || '模型服务';
  const cleanKey = (endpoint.key || '').trim();
  const requiresKey = endpoint.requiresKey ?? !isLocalBaseUrl(baseUrl);
  if (requiresKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error(`请先在设置中填写有效的 ${label} API Key。`);
  }
  if (cleanKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error('API Key 格式无效，不能包含空格或换行。');
  }
  const cleanModel = (model || '').trim();
  if (!isValidModelId(cleanModel)) throw new Error('模型名称格式无效。');

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      ...(cleanKey ? { Authorization: `Bearer ${cleanKey}` } : {}),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model: cleanModel,
      messages,
      tools,
      stream: false,
      ...(supportsReasoningEffort(cleanModel) && effort && ['none', 'low', 'high', 'max'].includes(effort) ? { reasoning_effort: effort } : {}),
    }),
    signal,
    credentials: 'omit',
    redirect: 'error',
    referrerPolicy: 'no-referrer',
    cache: 'no-store',
  });
  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    throwEndpointHttpError(label, baseUrl, response.status);
  }
  const body = await response.json() as any;
  const message = body?.choices?.[0]?.message;
  if (!message || typeof message !== 'object') throw new Error(`${label} 返回格式异常。`);
  const rawCalls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
  const toolCalls: DeepSeekToolCall[] = rawCalls
    .filter((item: any) => item && typeof item.id === 'string' && item.function && typeof item.function.name === 'string')
    .map((item: any) => ({
      id: item.id,
      name: item.function.name,
      argumentsJson: typeof item.function.arguments === 'string' ? item.function.arguments : '{}',
    }));
  return {
    content: typeof message.content === 'string' ? message.content : '',
    reasoning: typeof message.reasoning_content === 'string'
      ? message.reasoning_content
      : typeof message.reasoning === 'string'
        ? message.reasoning
        : '',
    toolCalls,
  };
}

export async function runDeepSeekToolTurn(
  key: string,
  model: string,
  messages: DeepSeekAgentMessage[],
  tools: Array<{ type: 'function'; function: { name: string; description: string; parameters: Record<string, unknown> } }>,
  signal: AbortSignal,
  effort?: ReasoningEffort
): Promise<{ content: string; reasoning: string; toolCalls: DeepSeekToolCall[] }> {
  return runOpenAiCompatibleToolTurn(
    { baseUrl: 'https://api.deepseek.com', key, label: 'DeepSeek', requiresKey: true },
    model,
    messages,
    tools,
    signal,
    effort
  );
}

/** Send once only: the request may have been billed even when the stream fails. */
export async function streamOpenAiCompatible(
  endpoint: OpenAiCompatEndpoint,
  model: string,
  messages: ChatMessage[],
  signal: AbortSignal,
  onText: (text: string) => void,
  effort?: ReasoningEffort,
  onReasoning?: (text: string) => void
): Promise<void> {
  const baseUrl = normalizeBaseUrl(endpoint.baseUrl || 'https://api.deepseek.com');
  const label = (endpoint.label || '').trim() || '模型服务';
  const cleanKey = (endpoint.key || '').trim();
  const requiresKey = endpoint.requiresKey ?? !isLocalBaseUrl(baseUrl);
  if (requiresKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error(`请先在设置中填写有效的 ${label} API Key。`);
  }
  if (cleanKey && !/^[\x21-\x7e]{1,512}$/.test(cleanKey)) {
    throw new Error('API Key 格式无效，不能包含空格或换行。');
  }
  const cleanModel = (model || '').trim();
  if (!isValidModelId(cleanModel)) throw new Error('模型名称格式无效。');

  const history = messages.filter(m => !m.incomplete && (m.role === 'user' || m.role === 'assistant')).map(m => ({ role: m.role, content: m.content }));
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      ...(cleanKey ? { Authorization: `Bearer ${cleanKey}` } : {}),
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify({
      model: cleanModel,
      messages: history,
      stream: true,
      ...(supportsReasoningEffort(cleanModel) && effort && ['none', 'low', 'high', 'max'].includes(effort) ? { reasoning_effort: effort } : {}),
    }),
    signal,
    credentials: 'omit',
    redirect: 'error',
    referrerPolicy: 'no-referrer',
    cache: 'no-store',
  });
  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    throwEndpointHttpError(label, baseUrl, response.status);
  }
  if (!response.body) throw new Error(`${label} 未返回回复流。`);
  const reader = response.body.getReader(), decoder = new TextDecoder();
  let buffer = '', done = false, length = 0;
  const process = (event: string) => {
    const data = event.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
    if (!data) return;
    if (data.trim() === '[DONE]') { done = true; return; }
    let chunk: any;
    try { chunk = JSON.parse(data); } catch { throw new Error(`${label} 回复流格式异常。`); }
    if (chunk.error) throw new Error(`${label} 回复流出现错误，请检查模型或账户后重试。`);
    const delta = chunk?.choices?.[0]?.delta;
    const reasoningText = delta?.reasoning_content ?? delta?.reasoning;
    for (const [text, callback] of [[delta?.content, onText], [reasoningText, onReasoning]] as const) {
      if (typeof text === 'string' && text) { length += text.length; if (length > 1000000) throw new Error('回复过长，已停止接收。'); callback?.(text); }
    }
  };
  try {
    while (!done) {
      const part = await reader.read();
      buffer += decoder.decode(part.value, { stream: !part.done }).replace(/\r\n/g, '\n');
      let end: number;
      while ((end = buffer.indexOf('\n\n')) >= 0) { const event = buffer.slice(0, end); buffer = buffer.slice(end + 2); process(event); }
      if (buffer.length > 2000000) throw new Error(`${label} 回复流过大。`);
      if (part.done) break;
    }
    if (!done) throw new Error('回复连接提前中断，内容可能不完整；请求可能已计费。');
  } finally { void reader.cancel().catch(() => {}); reader.releaseLock(); }
}

/** Send once only: the request may have been billed even when the stream fails. */
export async function streamDeepSeek(
  key: string,
  model: string,
  messages: ChatMessage[],
  signal: AbortSignal,
  onText: (text: string) => void,
  effort?: ReasoningEffort,
  onReasoning?: (text: string) => void
): Promise<void> {
  return streamOpenAiCompatible(
    { baseUrl: 'https://api.deepseek.com', key, label: 'DeepSeek', requiresKey: true },
    model,
    messages,
    signal,
    onText,
    effort,
    onReasoning
  );
}
