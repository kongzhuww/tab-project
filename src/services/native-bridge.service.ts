import { NATIVE_HOST_NAME } from '../native-bridge/installer';

declare const chrome: any;

export const NATIVE_BRIDGE_CONFIG_KEY = 'nativeBridgeConfigV1';
export const NATIVE_HISTORY_KEY = 'nativeConversationsV1';

export type PiThinkingLevel = 'off' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max';

export interface DiscoveredLocalAgent {
  id: string;
  name: string;
  protocol: 'pi-json' | 'claude-json' | 'codex-json' | 'opencode-json' | 'acp';
  installed: boolean;
  path: string | null;
  supportsModels?: boolean;
}

export interface AcpProfile {
  id: string;
  name: string;
  command: string;
}

export interface NativeBridgeConfig {
  defaultCwd: string;
  selectedAgentId: string;
  piModel: string;
  piThinking: PiThinkingLevel;
  piToolsEnabled: boolean;
  acpProfiles: AcpProfile[];
}

export interface NativePingResult {
  ok: true;
  protocolVersion: number;
  hostVersion: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  homeDir: string;
  defaultCwd: string;
  piAvailable?: boolean;
  piPath?: string | null;
  agents?: DiscoveredLocalAgent[];
}

export interface PiModelInfo {
  id: string;
  provider: string;
  model: string;
  context: string;
  maxOut: string;
  thinking: boolean;
  images: boolean;
}

export interface PiToolStep {
  name: string;
  args?: Record<string, unknown>;
}

export interface PiRunResult {
  ok: boolean;
  cwd: string;
  sessionId?: string;
  externalSessionId?: string;
  provider: string;
  model: string;
  thinkingLevel?: string;
  durationMs: number;
  usage?: { input?: number; output?: number; cacheRead?: number; cacheWrite?: number; reasoning?: number; totalTokens?: number; cost?: { total?: number } } | null;
  text: string;
  thinking: string;
  toolSteps: PiToolStep[];
  truncated?: boolean;
  timedOut?: boolean;
  error?: string;
}

export interface NativeExecResult {
  ok: boolean;
  cwd: string;
  exitCode: number | null;
  signal: string | null;
  timedOut: boolean;
  truncated: boolean;
  durationMs: number;
  stdout: string;
  stderr: string;
  error?: string;
}

const DEFAULT_CONFIG: NativeBridgeConfig = {
  defaultCwd: '',
  selectedAgentId: 'pi',
  piModel: '',
  piThinking: 'medium',
  piToolsEnabled: true,
  acpProfiles: [],
};

function sanitizeAcpProfiles(raw: unknown): AcpProfile[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: AcpProfile[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const id = typeof (item as any).id === 'string' ? (item as any).id.trim() : '';
    const name = typeof (item as any).name === 'string' ? (item as any).name.trim().slice(0, 60) : '';
    const command = typeof (item as any).command === 'string' ? (item as any).command.trim().slice(0, 300) : '';
    if (!id || !name || !command || seen.has(id)) continue;
    seen.add(id);
    out.push({ id, name, command });
    if (out.length >= 20) break;
  }
  return out;
}

export async function loadNativeBridgeConfig(): Promise<NativeBridgeConfig> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return { ...DEFAULT_CONFIG };
  const raw = (await chrome.storage.local.get(NATIVE_BRIDGE_CONFIG_KEY))[NATIVE_BRIDGE_CONFIG_KEY];
  const thinking = typeof raw?.piThinking === 'string' && ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'].includes(raw.piThinking)
    ? (raw.piThinking as PiThinkingLevel)
    : 'medium';
  return {
    defaultCwd: typeof raw?.defaultCwd === 'string' ? raw.defaultCwd.trim() : '',
    selectedAgentId: typeof raw?.selectedAgentId === 'string' && raw.selectedAgentId.trim() ? raw.selectedAgentId.trim() : 'pi',
    piModel: typeof raw?.piModel === 'string' ? raw.piModel.trim() : '',
    piThinking: thinking,
    piToolsEnabled: typeof raw?.piToolsEnabled === 'boolean' ? raw.piToolsEnabled : true,
    acpProfiles: sanitizeAcpProfiles(raw?.acpProfiles),
  };
}

export async function saveNativeBridgeConfig(patch: Partial<NativeBridgeConfig>): Promise<NativeBridgeConfig> {
  const current = await loadNativeBridgeConfig();
  const next: NativeBridgeConfig = {
    defaultCwd: typeof patch.defaultCwd === 'string' ? patch.defaultCwd.trim() : current.defaultCwd,
    selectedAgentId: typeof patch.selectedAgentId === 'string' && patch.selectedAgentId.trim() ? patch.selectedAgentId.trim() : current.selectedAgentId,
    piModel: typeof patch.piModel === 'string' ? patch.piModel.trim() : current.piModel,
    piThinking: patch.piThinking ?? current.piThinking,
    piToolsEnabled: typeof patch.piToolsEnabled === 'boolean' ? patch.piToolsEnabled : current.piToolsEnabled,
    acpProfiles: patch.acpProfiles !== undefined ? sanitizeAcpProfiles(patch.acpProfiles) : current.acpProfiles,
  };
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    await chrome.storage.local.set({ [NATIVE_BRIDGE_CONFIG_KEY]: next });
  }
  return next;
}

export async function hasNativeMessagingPermission(): Promise<boolean> {
  if (typeof chrome === 'undefined') return false;
  if (typeof chrome.runtime?.sendNativeMessage === 'function') return true;
  if (!chrome.permissions?.contains) return false;
  try {
    return Boolean(await chrome.permissions.contains({ permissions: ['nativeMessaging'] }));
  } catch {
    return false;
  }
}

export async function requestNativeMessagingPermission(): Promise<boolean> {
  if (typeof chrome === 'undefined') {
    throw new Error('当前环境不支持申请本机终端权限。');
  }
  if (typeof chrome.runtime?.sendNativeMessage === 'function') return true;
  if (await hasNativeMessagingPermission()) return true;
  if (!chrome.permissions?.request) {
    throw new Error('当前环境不支持申请本机终端权限。');
  }
  try {
    return Boolean(await chrome.permissions.request({ permissions: ['nativeMessaging'] }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err || '');
    if (/Only permissions specified in the manifest/i.test(message)) {
      throw new Error('浏览器还未重新加载最新扩展配置：请打开扩展管理页（chrome://extensions 或 edge://extensions），点击本扩展的「刷新/重新加载」按钮后再试。');
    }
    throw err;
  }
}

function normalizeNativeError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err || '');
  if (message === 'UNSUPPORTED_CONTEXT') {
    return '当前浏览器（如 ego lite）未向扩展开放 Native Messaging 接口（chrome.runtime.sendNativeMessage 不可用）。建议在 Chrome / Edge 中使用，或改用本地环回桥接。';
  }
  if (/not found/i.test(message)) {
    return '未检测到本机 Native Host：请先下载并在终端运行一次安装脚本，然后再试。';
  }
  if (/forbidden/i.test(message)) {
    return 'Native Host 拒绝了当前扩展 ID：请重新下载并运行安装脚本以匹配当前扩展 ID。';
  }
  if (/exited/i.test(message)) {
    return '本机 Native Host 启动后异常退出，请确认本机已安装 Node.js >= 20。';
  }
  if (/Unsupported action: (pi_models|pi_run|agent_models|agent_run)/i.test(message)) {
    return '本机桥接脚本版本较旧，尚未包含多 Agent / ACP 支持：请在设置页「高级选项」重新下载并运行一次安装脚本升级即可。';
  }
  return message || '无法连接到本机 Native Host。';
}

async function sendNative<T>(payload: Record<string, unknown>): Promise<T> {
  if (typeof chrome === 'undefined') {
    throw new Error('当前浏览器上下文不支持扩展 Native Messaging。');
  }
  const granted = await hasNativeMessagingPermission();
  if (!granted) {
    throw new Error('尚未授予 nativeMessaging 权限，请先在扩展管理页重新加载本扩展并授权。');
  }
  const envelope = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    ...payload,
  };
  try {
    let response: unknown;
    if (typeof chrome.runtime?.sendNativeMessage === 'function') {
      response = await chrome.runtime.sendNativeMessage(NATIVE_HOST_NAME, envelope);
    } else if (typeof chrome.runtime?.sendMessage === 'function') {
      const proxy = await chrome.runtime.sendMessage({
        type: 'native-bridge:send',
        hostName: NATIVE_HOST_NAME,
        payload: envelope,
      });
      if (!proxy?.ok) {
        throw new Error(proxy?.error || 'UNSUPPORTED_CONTEXT');
      }
      response = proxy.response;
    } else {
      throw new Error('UNSUPPORTED_CONTEXT');
    }
    if (!response || typeof response !== 'object') {
      throw new Error('本机 Native Host 未返回有效响应。');
    }
    return response as T;
  } catch (err) {
    throw new Error(normalizeNativeError(err));
  }
}

export async function pingNativeHost(): Promise<NativePingResult> {
  const result = await sendNative<NativePingResult | { ok: false; error?: string }>({ action: 'ping' });
  if (!result.ok) {
    throw new Error((result as { error?: string }).error || 'Native Host 心跳校验失败。');
  }
  return result as NativePingResult;
}

export async function listPiModels(): Promise<PiModelInfo[]> {
  const result = await sendNative<{ ok: boolean; models?: PiModelInfo[]; error?: string }>({ action: 'agent_models', agentId: 'pi' });
  if (!result.ok) {
    throw new Error(normalizeNativeError(result.error || '读取 pi 模型列表失败。'));
  }
  return Array.isArray(result.models) ? result.models : [];
}

export async function fetchGitHubTrendingViaNative(options: {
  topN?: number;
  since?: 'daily' | 'weekly' | 'monthly';
}): Promise<{ sourceLabel: string; repos: any[] }> {
  const result = await sendNative<{ ok: boolean; sourceLabel?: string; repos?: any[]; error?: string }>({
    action: 'github_trending',
    topN: options.topN ?? 10,
    since: options.since ?? 'daily',
  });
  if (!result.ok || !Array.isArray(result.repos)) {
    throw new Error(normalizeNativeError(result.error || '通过本机桥接读取 GitHub 榜单失败。'));
  }
  return {
    sourceLabel: result.sourceLabel || 'GitHub 榜单（本机桥接）',
    repos: result.repos,
  };
}

export async function runLocalAgent(options: {
  agentId: string;
  acpCommand?: string;
  agentName?: string;
  prompt: string;
  cwd?: string;
  sessionId?: string;
  externalSessionId?: string;
  model?: string;
  thinking?: PiThinkingLevel;
  toolsEnabled?: boolean;
  timeoutMs?: number;
}): Promise<PiRunResult> {
  const clean = options.prompt.trim();
  if (!clean) throw new Error('消息内容不能为空。');
  const result = await sendNative<PiRunResult>({
    action: 'agent_run',
    agentId: options.agentId || 'pi',
    ...(options.acpCommand ? { acpCommand: options.acpCommand } : {}),
    ...(options.agentName ? { agentName: options.agentName } : {}),
    prompt: clean,
    ...(options.cwd ? { cwd: options.cwd } : {}),
    ...(options.sessionId ? { sessionId: options.sessionId } : {}),
    ...(options.externalSessionId ? { externalSessionId: options.externalSessionId } : {}),
    ...(options.model ? { model: options.model } : {}),
    ...(options.thinking ? { thinking: options.thinking } : {}),
    toolsEnabled: options.toolsEnabled !== false,
    ...(options.timeoutMs ? { timeoutMs: options.timeoutMs } : {}),
  });
  if (!result.ok) {
    throw new Error(normalizeNativeError(result.error || (result.timedOut ? '本机 Agent 执行超时，请缩小任务或重试。' : '本机 Agent 执行失败。')));
  }
  return result;
}

export async function runPiPrompt(options: {
  prompt: string;
  cwd?: string;
  sessionId?: string;
  model?: string;
  thinking?: PiThinkingLevel;
  toolsEnabled?: boolean;
  timeoutMs?: number;
}): Promise<PiRunResult> {
  return runLocalAgent({ ...options, agentId: 'pi' });
}

export async function checkNativeDir(targetPath: string, baseCwd?: string): Promise<string> {
  const result = await sendNative<{ ok: boolean; cwd?: string; error?: string }>({
    action: 'check_dir',
    path: targetPath,
    ...(baseCwd ? { baseCwd } : {}),
  });
  if (!result.ok || !result.cwd) throw new Error(result.error || '目录不存在或不可访问。');
  return result.cwd;
}

export async function execNativeCommand(
  command: string,
  options: { cwd?: string; timeoutMs?: number } = {}
): Promise<NativeExecResult> {
  const clean = command.trim();
  if (!clean) throw new Error('命令不能为空。');
  const result = await sendNative<NativeExecResult>({
    action: 'exec',
    command: clean,
    ...(options.cwd ? { cwd: options.cwd } : {}),
    ...(options.timeoutMs ? { timeoutMs: options.timeoutMs } : {}),
  });
  if (result.error && result.exitCode === undefined) {
    throw new Error(result.error);
  }
  return result;
}
