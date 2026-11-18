import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import {
  checkNativeDir,
  execNativeCommand,
  hasNativeMessagingPermission,
  listPiModels,
  loadNativeBridgeConfig,
  NATIVE_BRIDGE_CONFIG_KEY,
  NATIVE_HISTORY_KEY,
  pingNativeHost,
  runLocalAgent,
  saveNativeBridgeConfig,
  type AcpProfile,
  type DiscoveredLocalAgent,
  type NativeExecResult,
  type NativePingResult,
  type PiModelInfo,
  type PiThinkingLevel,
  type PiToolStep,
} from '../services/native-bridge.service';
import { sessionTitle } from './session-content';

declare const chrome: any;

export interface NativeAgentMessage {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  reasoning?: string;
  command?: string;
  cwd?: string;
  modelLabel?: string;
  toolSummary?: string;
  toolSteps?: PiToolStep[];
  durationMs?: number;
  createdAt?: number;
  usage?: { input?: number; output?: number; cacheRead?: number; cacheWrite?: number; reasoning?: number; totalTokens?: number; cost?: { total?: number } } | null;
  exitCode?: number | null;
  incomplete?: boolean;
}

export interface NativeConversation {
  id: string;
  agentId?: string;
  externalSessionId?: string;
  title: string;
  cwd: string;
  model?: string;
  thinking?: PiThinkingLevel;
  updatedAt: number;
  messages: NativeAgentMessage[];
}

function formatExecMarkdown(command: string, result: NativeExecResult): string {
  const status = result.timedOut
    ? '执行超时'
    : result.exitCode === 0
      ? '执行成功 (exit 0)'
      : `退出码 ${result.exitCode ?? '未知'}`;
  const parts = [`**命令**：\`${command}\``, `**目录**：\`${result.cwd}\` · **状态**：${status}（${result.durationMs}ms）`];
  if (result.stdout.trim()) parts.push(`\`\`\`text\n${result.stdout.trimEnd()}\n\`\`\``);
  if (result.stderr.trim()) parts.push(`**stderr**：\n\`\`\`text\n${result.stderr.trimEnd()}\n\`\`\``);
  if (!result.stdout.trim() && !result.stderr.trim()) parts.push('_（无输出）_');
  if (result.truncated) parts.push('_注：输出超过上限已截断。_');
  return parts.join('\n\n');
}

function formatToolStepsSummary(steps: PiToolStep[]): string {
  if (!steps.length) return '';
  const counts = new Map<string, number>();
  for (const step of steps) {
    counts.set(step.name, (counts.get(step.name) || 0) + 1);
  }
  const summary = Array.from(counts.entries())
    .map(([name, count]) => (count > 1 ? `${name} ×${count}` : name))
    .join(' · ');
  return `本机工具调用：${summary}`;
}

async function loadNativeConversations(): Promise<NativeConversation[]> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return [];
  const raw = (await chrome.storage.local.get(NATIVE_HISTORY_KEY))[NATIVE_HISTORY_KEY];
  return Array.isArray(raw)
    ? raw.filter((item: any) => item && typeof item.id === 'string' && Array.isArray(item.messages))
    : [];
}

async function saveNativeConversation(conversation: NativeConversation): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
  const run = async () => {
    const list = await loadNativeConversations();
    const snapshot: NativeConversation = JSON.parse(JSON.stringify(conversation));
    if (list.length >= 50 && !list.some(c => c.id === snapshot.id)) {
      throw new Error('本机终端会话已达 50 条上限，请先删除旧会话。');
    }
    await chrome.storage.local.set({ [NATIVE_HISTORY_KEY]: [snapshot, ...list.filter(c => c.id !== snapshot.id)] });
  };
  if (typeof navigator !== 'undefined' && navigator.locks) {
    await navigator.locks.request('tab-project:native-history', run);
  } else {
    await run();
  }
}

async function deleteNativeConversation(id: string): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return;
  const run = async () => {
    const list = await loadNativeConversations();
    await chrome.storage.local.set({ [NATIVE_HISTORY_KEY]: list.filter(c => c.id !== id) });
  };
  if (typeof navigator !== 'undefined' && navigator.locks) {
    await navigator.locks.request('tab-project:native-history', run);
  } else {
    await run();
  }
}

export function useNativeAgent() {
  const conversations = ref<NativeConversation[]>([]);
  const currentId = ref('');
  const error = ref('');
  const connected = ref(false);
  const permissionGranted = ref(false);
  const hostInfo = ref<NativePingResult | null>(null);
  const discoveredAgents = ref<DiscoveredLocalAgent[]>([]);
  const acpProfiles = ref<AcpProfile[]>([]);
  const selectedAgentId = ref('pi');
  const piModels = ref<PiModelInfo[]>([]);
  const piModel = ref('');
  const piThinking = ref<PiThinkingLevel>('medium');
  const piToolsEnabled = ref(true);
  const defaultCwd = ref('');
  const sending = ref(false);

  const current = computed(() => conversations.value.find(item => item.id === currentId.value));
  const activeAgentId = computed(() => current.value?.agentId || selectedAgentId.value || 'pi');
  const activeModel = computed(() => current.value?.model ?? piModel.value);
  const activeThinking = computed(() => current.value?.thinking ?? piThinking.value);

  const activeAgentLabel = computed(() => {
    const id = activeAgentId.value;
    if (id.startsWith('acp:')) {
      return acpProfiles.value.find(p => `acp:${p.id}` === id)?.name || '自定义 ACP';
    }
    const found = discoveredAgents.value.find(a => a.id === id);
    if (found) return found.name;
    return id === 'pi' ? 'Pi' : id;
  });

  let closed = false;

  const onStorageChange = (changes: any, area: string) => {
    if (area === 'local' && changes[NATIVE_HISTORY_KEY] && !sending.value) {
      void refreshHistory().catch(() => { if (!closed) error.value = '本机终端会话读取失败。'; });
    }
    if (area === 'local' && changes[NATIVE_BRIDGE_CONFIG_KEY] && !sending.value) {
      void loadNativeBridgeConfig().then(cfg => {
        if (closed) return;
        defaultCwd.value = cfg.defaultCwd || hostInfo.value?.defaultCwd || '';
        selectedAgentId.value = cfg.selectedAgentId;
        piModel.value = cfg.piModel;
        piThinking.value = cfg.piThinking;
        piToolsEnabled.value = cfg.piToolsEnabled;
        acpProfiles.value = cfg.acpProfiles;
      }).catch(() => {});
    }
  };

  onMounted(() => { if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(onStorageChange); });
  onBeforeUnmount(() => {
    closed = true;
    if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(onStorageChange);
  });

  async function refreshStatus(): Promise<void> {
    error.value = '';
    const cfg = await loadNativeBridgeConfig();
    defaultCwd.value = cfg.defaultCwd;
    selectedAgentId.value = cfg.selectedAgentId;
    piModel.value = cfg.piModel;
    piThinking.value = cfg.piThinking;
    piToolsEnabled.value = cfg.piToolsEnabled;
    acpProfiles.value = cfg.acpProfiles;

    permissionGranted.value = await hasNativeMessagingPermission();
    if (!permissionGranted.value) {
      connected.value = false;
      hostInfo.value = null;
      discoveredAgents.value = [];
      piModels.value = [];
      return;
    }
    try {
      const ping = await pingNativeHost();
      connected.value = true;
      hostInfo.value = ping;
      if (!defaultCwd.value) defaultCwd.value = ping.defaultCwd;
      if (Array.isArray(ping.agents) && ping.agents.length) {
        discoveredAgents.value = ping.agents;
      } else {
        discoveredAgents.value = ping.piAvailable
          ? [{ id: 'pi', name: 'Pi', protocol: 'pi-json', installed: true, path: ping.piPath || null, supportsModels: true }]
          : [];
      }
      if (
        !selectedAgentId.value.startsWith('acp:') &&
        !discoveredAgents.value.some(a => a.id === selectedAgentId.value && a.installed)
      ) {
        const firstInstalled = discoveredAgents.value.find(a => a.installed);
        if (firstInstalled) selectedAgentId.value = firstInstalled.id;
      }
      if (ping.piAvailable && !piModels.value.length) {
        try { piModels.value = await listPiModels(); } catch { piModels.value = []; }
      }
    } catch (err) {
      connected.value = false;
      hostInfo.value = null;
      error.value = err instanceof Error ? err.message : '本机桥接未就绪';
    }
  }

  async function refreshHistory(): Promise<void> {
    const list = await loadNativeConversations();
    if (!sending.value) conversations.value = list;
  }

  function newChat() {
    if (sending.value) return;
    currentId.value = '';
    error.value = '';
  }

  function selectChat(id: string) {
    if (sending.value) return;
    currentId.value = id;
    error.value = '';
  }

  async function removeChat(id: string) {
    if (sending.value) return;
    try {
      await deleteNativeConversation(id);
      await refreshHistory();
      if (currentId.value === id) currentId.value = '';
    } catch {
      error.value = '删除本机终端会话失败，请重试。';
    }
  }

  async function chooseAgentAndModel(agentId: string, modelId = '') {
    if (sending.value) return;
    selectedAgentId.value = agentId || 'pi';
    if (agentId === 'pi') piModel.value = modelId;
    await saveNativeBridgeConfig({
      selectedAgentId: selectedAgentId.value,
      ...(agentId === 'pi' ? { piModel: modelId } : {}),
    });
    if (current.value) {
      current.value.agentId = selectedAgentId.value;
      if (agentId === 'pi') current.value.model = modelId;
      await saveNativeConversation(current.value);
    }
  }

  async function chooseModel(modelId: string) {
    await chooseAgentAndModel('pi', modelId);
  }

  async function chooseThinking(level: PiThinkingLevel) {
    if (sending.value) return;
    piThinking.value = level;
    await saveNativeBridgeConfig({ piThinking: level });
    if (current.value) {
      current.value.thinking = level;
      await saveNativeConversation(current.value);
    }
  }

  async function toggleToolsEnabled() {
    if (sending.value) return;
    piToolsEnabled.value = !piToolsEnabled.value;
    await saveNativeBridgeConfig({ piToolsEnabled: piToolsEnabled.value });
  }

  async function runDirectShell(chat: NativeConversation, rawCommand: string) {
    const cmd = rawCommand.trim();
    const cdMatch = cmd.match(/^cd(?:\s+(.*))?$/);
    if (cdMatch) {
      const target = (cdMatch[1] || '~').trim();
      const nextCwd = await checkNativeDir(target, chat.cwd || defaultCwd.value || undefined);
      chat.cwd = nextCwd;
      chat.messages.push({ role: 'assistant', content: `已切换工作目录到：\`${nextCwd}\`` });
      return;
    }
    const result = await execNativeCommand(cmd, { cwd: chat.cwd || defaultCwd.value || undefined });
    chat.cwd = result.cwd;
    chat.messages.push({
      role: 'assistant',
      content: formatExecMarkdown(cmd, result),
      command: cmd,
      cwd: result.cwd,
      modelLabel: '本机终端',
      durationMs: result.durationMs,
      createdAt: Date.now(),
      exitCode: result.exitCode,
    });
  }

  async function send(prompt: string, content: string, accepted: () => void) {
    if (sending.value || !prompt.trim()) return;
    sending.value = true;
    error.value = '';

    let chat: NativeConversation | undefined;
    try {
      if (!connected.value) await refreshStatus();
      if (!connected.value) throw new Error(error.value || '请先在「本机终端」设置中一键开启本机桥接。');

      const targetAgentId = current.value?.agentId || selectedAgentId.value || 'pi';
      const isNew = !current.value;
      chat = current.value || reactive<NativeConversation>({
        id: crypto.randomUUID(),
        agentId: targetAgentId,
        title: sessionTitle(prompt),
        cwd: defaultCwd.value || hostInfo.value?.defaultCwd || '',
        model: targetAgentId === 'pi' ? piModel.value : '',
        thinking: piThinking.value,
        updatedAt: Date.now(),
        messages: [],
      });
      chat.messages.push({ role: 'user', content, createdAt: Date.now() });
      chat.updatedAt = Date.now();
      await saveNativeConversation(chat);
      if (isNew) {
        conversations.value.unshift(chat);
        currentId.value = chat.id;
      }
      accepted();

      const trimmed = prompt.trim();
      const explicitShell = trimmed.startsWith('!')
        ? trimmed.slice(1).trim()
        : trimmed.startsWith('/sh ')
          ? trimmed.slice(4).trim()
          : '';

      if (explicitShell) {
        await runDirectShell(chat, explicitShell);
      } else if (hostInfo.value && !('agents' in hostInfo.value) && targetAgentId !== 'pi') {
        throw new Error('本机桥接脚本版本较旧，请到设置页更新安装脚本后再调用其他 Agent / ACP。');
      } else if (targetAgentId.startsWith('acp:') || discoveredAgents.value.some(a => a.id === targetAgentId && a.installed)) {
        const customProfile = targetAgentId.startsWith('acp:')
          ? acpProfiles.value.find(p => `acp:${p.id}` === targetAgentId)
          : undefined;
        if (targetAgentId.startsWith('acp:') && !customProfile) {
          throw new Error('未找到对应的自定义 ACP 配置，请在设置页检查。');
        }
        const startedAt = Date.now();
        const res = await runLocalAgent({
          agentId: targetAgentId,
          acpCommand: customProfile?.command,
          agentName: customProfile?.name,
          prompt: content,
          cwd: chat.cwd || defaultCwd.value || undefined,
          sessionId: chat.id,
          externalSessionId: chat.externalSessionId,
          model: targetAgentId === 'pi' ? (chat.model || piModel.value || undefined) : undefined,
          thinking: chat.thinking || piThinking.value,
          toolsEnabled: piToolsEnabled.value,
        });
        chat.cwd = res.cwd || chat.cwd;
        if (res.externalSessionId) chat.externalSessionId = res.externalSessionId;
        const modelLabel = [res.provider, res.model].filter(Boolean).join('/');
        chat.messages.push({
          role: 'assistant',
          content: res.text || '（无输出内容）',
          reasoning: res.thinking || undefined,
          modelLabel: modelLabel || customProfile?.name || activeAgentLabel.value,
          toolSummary: formatToolStepsSummary(res.toolSteps) || undefined,
          toolSteps: res.toolSteps?.length ? res.toolSteps : undefined,
          durationMs: res.durationMs || (Date.now() - startedAt),
          createdAt: Date.now(),
          usage: res.usage || null,
        });
      } else {
        await runDirectShell(chat, trimmed);
      }

      chat.updatedAt = Date.now();
      await saveNativeConversation(chat);
    } catch (err) {
      if (!closed) error.value = err instanceof Error ? err.message : '本机终端执行失败';
    } finally {
      sending.value = false;
    }
  }

  return {
    conversations,
    currentId,
    current,
    error,
    connected,
    permissionGranted,
    hostInfo,
    discoveredAgents,
    acpProfiles,
    selectedAgentId,
    activeAgentId,
    activeAgentLabel,
    piModels,
    piModel,
    piThinking,
    piToolsEnabled,
    activeModel,
    activeThinking,
    defaultCwd,
    sending,
    refreshStatus,
    refreshHistory,
    newChat,
    selectChat,
    removeChat,
    chooseAgentAndModel,
    chooseModel,
    chooseThinking,
    toggleToolsEnabled,
    send,
  };
}
