<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { loadConfig } from '../services/byok.service';
import { pingNativeHost } from '../services/native-bridge.service';
import {
  AI_SCHEDULE_KEY,
  AI_SCHEDULE_WORKER_STAMP,
  configCredentialFingerprint,
  isApiScheduleProvider,
  nextDaily,
  safeScheduleList,
  type AiSchedule,
  type SchedulePeekSnapshot,
} from './schedule-contract';
import { scheduleStatusLabel } from './schedule-board';
import { callScheduleBackend } from './schedule-client';
import MessageMarkdown from './MessageMarkdown.vue';
import SchedulePeekModal from './SchedulePeekModal.vue';

declare const chrome: any;

const props = defineProps<{
  model: string;
  embedded?: boolean;
  active?: boolean;
  nativeConnected?: boolean;
  nativeAgentLabel?: string;
}>();

const emit = defineEmits<{ close: []; createWithPrompt: []; openSettings: [tab: 'deepseek' | 'native'] }>();

type FilterTab = 'all' | 'pending' | 'running' | 'completed' | 'attention';

const repeat = ref<'once' | 'daily'>('daily');
const provider = ref<'auto' | 'native-pi' | 'openai-compat'>('auto');
const apiLabel = ref('云端/兼容模型');
const apiModel = ref('');
const apiPresetId = ref('deepseek');
const detectedNative = ref(false);
const detectedNativeLabel = ref('');
const runGuide = ref<{
  open: boolean;
  job: AiSchedule | null;
  reason: 'auto-unconfigured' | 'missing-api' | 'missing-native';
  title: string;
  desc: string;
}>({ open: false, job: null, reason: 'auto-unconfigured', title: '', desc: '' });
const jobKind = ref<'prompt' | 'github-trending'>('prompt');
const githubTopN = ref(10);
const githubSince = ref<'daily' | 'weekly' | 'monthly'>('daily');
const githubSaveToLibrary = ref(true);
const title = ref('');
const prompt = ref('');
const dailyTime = ref('09:00');
const when = ref(defaultOnceValue());
const confirmed = ref(true);
const filterTab = ref<FilterTab>('all');

const jobs = ref<AiSchedule[]>([]);
const loadError = ref('');
const actionError = ref('');
const notice = ref('');
const busy = ref(false);
const runningJobId = ref('');
const loading = ref(true);
const loaded = ref(false);
const backendReady = ref(false);
const backendStale = ref(false);
const fingerprint = ref('');
const showCreator = ref(false);
const editingJobId = ref<string | null>(null);
const readingJob = ref<AiSchedule | null>(null);
const copyOk = ref(false);
const peekModal = ref<{
  open: boolean;
  mode: 'live' | 'replay';
  jobId?: string;
  jobTitle?: string;
  replayFrames?: SchedulePeekSnapshot[];
}>({ open: false, mode: 'live' });

function openLivePeek(job: AiSchedule) {
  peekModal.value = {
    open: true,
    mode: 'live',
    jobId: job.id,
    jobTitle: splitJobHeadline(job.prompt).head,
  };
}

function openReplayPeek(job: AiSchedule) {
  peekModal.value = {
    open: true,
    mode: 'replay',
    jobId: job.id,
    jobTitle: splitJobHeadline(job.prompt).head,
    replayFrames: job.peekFrames || [],
  };
}

const closeButton = ref<HTMLButtonElement | null>(null);
const promptInput = ref<HTMLTextAreaElement | null>(null);

const gmtLabel = computed(() => {
  const offsetMin = -new Date().getTimezoneOffset();
  const sign = offsetMin >= 0 ? '+' : '-';
  const abs = Math.abs(offsetMin);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m ? `GMT${sign}${h}:${String(m).padStart(2, '0')}` : `GMT${sign}${h}`;
});

function defaultOnceValue(): string {
  const d = new Date(Date.now() + 3600_000);
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function nextDailyTimestamp(hhmm: string): number {
  const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  const hh = match ? Math.min(23, Math.max(0, Number(match[1]))) : 9;
  const mm = match ? Math.min(59, Math.max(0, Number(match[2]))) : 0;
  const target = new Date();
  target.setHours(hh, mm, 0, 0);
  if (target.getTime() <= Date.now() + 15_000) {
    target.setDate(target.getDate() + 1);
  }
  return target.getTime();
}

const composedPrompt = computed(() => {
  const t = title.value.trim();
  const body = prompt.value.trim();
  if (t && body) return `${t}\n\n${body}`;
  return body || t;
});

const canCreate = computed(
  () =>
    backendReady.value &&
    !busy.value &&
    confirmed.value &&
    Boolean(composedPrompt.value) &&
    (repeat.value === 'daily' ? Boolean(dailyTime.value) : Boolean(when.value)) &&
    (provider.value !== 'openai-compat' || Boolean(fingerprint.value))
);

const counts = computed(() => {
  const map: Record<FilterTab, number> = {
    all: jobs.value.length,
    pending: 0,
    running: 0,
    completed: 0,
    attention: 0,
  };
  for (const job of jobs.value) {
    if (job.state === 'pending') map.pending++;
    else if (job.state === 'running') map.running++;
    else if (job.state === 'completed') map.completed++;
    else map.attention++;
  }
  return map;
});

const filteredJobs = computed(() => {
  if (filterTab.value === 'all') return jobs.value;
  if (filterTab.value === 'attention') {
    return jobs.value.filter(j => !['pending', 'running', 'completed'].includes(j.state));
  }
  return jobs.value.filter(j => j.state === filterTab.value);
});

let refreshVersion = 0;
let disposed = false;

async function invoke(action: string, fields: Record<string, unknown> = {}) {
  return callScheduleBackend(typeof chrome === 'undefined' ? null : chrome.runtime, action, fields);
}

async function refresh() {
  const version = ++refreshVersion;
  loading.value = true;
  try {
    const [response, stampRes] = await Promise.all([
      invoke('list'),
      invoke('stamp').catch(() => null) as Promise<{ stamp?: string } | null>,
    ]);
    if (!Array.isArray(response)) throw new Error('后台返回的任务列表格式异常，未覆盖本机记录。');
    const result = safeScheduleList(response);
    if (disposed || version !== refreshVersion) return;
    jobs.value = result;
    loaded.value = true;
    backendReady.value = true;
    backendStale.value = typeof chrome !== 'undefined' && stampRes?.stamp !== AI_SCHEDULE_WORKER_STAMP;
    loadError.value = '';
    if (result.length > 0 && !title.value.trim() && !prompt.value.trim()) {
      showCreator.value = false;
    }
  } catch (e) {
    if (disposed || version !== refreshVersion) return;
    backendReady.value = false;
    const message = e instanceof Error ? e.message : '定时任务读取失败。';
    try {
      if (typeof chrome === 'undefined' || !chrome.storage?.local) throw new Error('本机存储不可用');
      const data = await chrome.storage.local.get(AI_SCHEDULE_KEY);
      const result = safeScheduleList(data[AI_SCHEDULE_KEY]);
      if (disposed || version !== refreshVersion) return;
      jobs.value = result;
      loaded.value = true;
      loadError.value = `${message} 当前为本机只读预览，不能确认实际执行状态。`;
      if (result.length > 0 && !title.value.trim() && !prompt.value.trim()) {
        showCreator.value = false;
      }
    } catch {
      if (disposed || version !== refreshVersion) return;
      loadError.value = `${message} 本机记录也无法读取，已有任务未被修改。`;
    }
  } finally {
    if (!disposed && version === refreshVersion) loading.value = false;
  }
}

function reloadExtensionWorker() {
  if (typeof chrome !== 'undefined' && chrome.runtime?.reload) {
    chrome.runtime.reload();
  }
}

function openCreator(withStarter = false) {
  actionError.value = '';
  notice.value = '';
  editingJobId.value = null;
  provider.value = 'auto';
  jobKind.value = 'prompt';
  confirmed.value = true;
  if (!when.value) when.value = defaultOnceValue();
  if (withStarter && !prompt.value.trim()) {
    title.value = title.value.trim() || '早间汇总';
    prompt.value = '汇总昨日项目变更、新增任务与重要更新。';
  }
  showCreator.value = true;
  void nextTick(() => promptInput.value?.focus());
}

function selectGitHubModeTab() {
  jobKind.value = 'github-trending';
  if (!title.value.trim() && !prompt.value.trim()) {
    title.value = 'GitHub 今日榜单精选助手';
    prompt.value = '每天抓取 GitHub 今日 Trending 榜前 10 个仓库，全部通读 README 与说明后判断哪些真正有作用，并逐一介绍一遍。';
  }
}

function formatDatetimeLocal(ts: number): string {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return defaultOnceValue();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function openEditor(job: AiSchedule) {
  actionError.value = '';
  notice.value = '';
  editingJobId.value = job.id;
  provider.value = job.provider === 'auto' ? 'auto' : isApiScheduleProvider(job.provider) ? 'openai-compat' : 'native-pi';
  jobKind.value = job.kind === 'github-trending' ? 'github-trending' : 'prompt';
  repeat.value = job.repeat;
  const pad = (n: number) => String(n).padStart(2, '0');
  dailyTime.value = `${pad(job.localHour)}:${pad(job.localMinute)}`;
  when.value = formatDatetimeLocal(Math.max(job.runAt, Date.now() + 60_000));
  const split = splitJobHeadline(job.prompt);
  if (split.body !== split.head) {
    title.value = split.head;
    prompt.value = split.body;
  } else {
    title.value = '';
    prompt.value = job.prompt;
  }
  githubTopN.value = job.githubConfig?.topN || 10;
  githubSince.value = job.githubConfig?.since || 'daily';
  githubSaveToLibrary.value = job.githubConfig?.saveToLibrary !== false;
  confirmed.value = true;
  showCreator.value = true;
  void nextTick(() => promptInput.value?.focus());
}

function cancelCreator() {
  actionError.value = '';
  editingJobId.value = null;
  title.value = '';
  prompt.value = '';
  jobKind.value = 'prompt';
  confirmed.value = false;
  showCreator.value = false;
}

async function create(runImmediately = false) {
  if (!canCreate.value) return;
  actionError.value = '';
  notice.value = '';
  const time = repeat.value === 'daily' ? nextDailyTimestamp(dailyTime.value) : new Date(when.value).getTime();
  if (!Number.isFinite(time) || time <= Date.now() + 10_000) {
    actionError.value = '请选择至少 10 秒之后的时间。';
    return;
  }
  const safeTopN = Math.max(1, Math.min(25, Math.round(Number(githubTopN.value) || 10)));
  const resolvedProvider = provider.value === 'auto'
    ? 'auto'
    : provider.value === 'openai-compat'
      ? (apiPresetId.value === 'deepseek' ? 'deepseek' : 'openai-compat')
      : 'native-pi';
  const payloadInput = {
    provider: resolvedProvider,
    kind: jobKind.value,
    repeat: repeat.value,
    prompt: composedPrompt.value,
    runAt: time,
    ...(provider.value === 'auto' ? { providerLabel: '智能自动' } : {}),
    ...(provider.value === 'openai-compat'
      ? {
          providerLabel: apiLabel.value,
          model: apiModel.value || props.model,
          keyFingerprint: fingerprint.value,
        }
      : {}),
    ...(jobKind.value === 'github-trending'
      ? {
          githubConfig: {
            topN: safeTopN,
            since: githubSince.value,
            focus: prompt.value.trim(),
            saveToLibrary: githubSaveToLibrary.value,
          },
        }
      : {}),
  };
  busy.value = true;
  try {
    const isUpdate = Boolean(editingJobId.value);
    const saved = (
      isUpdate
        ? await invoke('update', { id: editingJobId.value, input: payloadInput })
        : await invoke('create', { input: payloadInput })
    ) as AiSchedule | undefined;
    editingJobId.value = null;
    title.value = '';
    prompt.value = '';
    when.value = defaultOnceValue();
    confirmed.value = false;
    showCreator.value = false;
    if (runImmediately && saved?.id) {
      runningJobId.value = saved.id;
      notice.value = jobKind.value === 'github-trending'
        ? `已保存任务，正在抓取 GitHub 榜单前 ${safeTopN} 个仓库并逐一阅读分析（约需 15~60 秒）…`
        : '已保存任务，正在立即运行一次…';
      await refresh();
      const res = await invoke('run-now', { id: saved.id }) as { message?: string; item?: AiSchedule } | undefined;
      notice.value = res?.message || '已完成一次试跑。';
      await refresh();
      if (res?.item?.lastReportContent) {
        readingJob.value = res.item;
      }
    } else {
      notice.value = isUpdate ? '自动化配置已更新。' : '自动化任务已创建。';
      await refresh();
    }
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : '保存结果未确认，请先检查列表，勿重复创建。';
    await refresh();
  } finally {
    runningJobId.value = '';
    busy.value = false;
  }
}

async function requestRunJob(job: AiSchedule) {
  if (!backendReady.value || busy.value || job.state === 'running') return;
  await refreshCredential();
  const hasNative = Boolean(props.nativeConnected) || detectedNative.value;

  if (isApiScheduleProvider(job.provider)) {
    const matchesCurrentApi = Boolean(fingerprint.value && job.keyFingerprint && fingerprint.value === job.keyFingerprint);
    if (!matchesCurrentApi) {
      runGuide.value = {
        open: true,
        job,
        reason: 'missing-api',
        title: `需要配置「${job.providerLabel || '模型服务'}」后才能运行`,
        desc: job.kind === 'github-trending'
          ? '当前配置尚未就绪或已更换。你可以去 30 秒配置云端 Key / 本机 Ollama，或者切换成「免配置直出」先看基础结构化简报。'
          : '请前往 AI 设置确认模型服务 Key 或本机 Ollama 配置后再试跑。',
      };
      return;
    }
  } else if (job.provider === 'native-pi' && !hasNative) {
    runGuide.value = {
      open: true,
      job,
      reason: 'missing-native',
      title: '当前电脑未连接本机 Pi 终端',
      desc: job.kind === 'github-trending'
        ? '普通电脑不需要装命令行也能用！建议填入模型 Key（或接本机免费 Ollama），也可以先免配置直接抓取生成基础简报。'
        : '该任务指定使用本机 Pi CLI 执行，当前未检测到本机连接。',
    };
    return;
  } else if (job.provider === 'auto' && !fingerprint.value && !hasNative) {
    runGuide.value = {
      open: true,
      job,
      reason: 'auto-unconfigured',
      title: job.kind === 'github-trending' ? '尚未配置 AI 模型，选择本次试跑方式' : '还差一步：配置一个可用的 AI 引擎',
      desc: job.kind === 'github-trending'
        ? '你无需安装本机 Pi 终端：既可以直接先抓今日榜单与 README 生成「结构化基础简报」（立即体验窥屏），也可以 30 秒配置模型 Key / 本机免 Key Ollama 解锁深度点评。'
        : '纯提示词任务需要大模型来生成回复。推荐 30 秒填入 DeepSeek / 硅基流动 / Kimi / OpenRouter Key，或连接本机免 Key Ollama。',
    };
    return;
  }

  await runNow(job);
}

async function runGuideContinueWithFallback() {
  const job = runGuide.value.job;
  runGuide.value.open = false;
  if (!job) return;
  if (job.provider !== 'auto') {
    try {
      const nextRunAt = job.repeat === 'daily'
        ? nextDaily(job.localHour, job.localMinute, Date.now())
        : Math.max(job.runAt, Date.now() + 60_000);
      await invoke('update', {
        id: job.id,
        input: {
          provider: 'auto',
          kind: job.kind === 'github-trending' ? 'github-trending' : 'prompt',
          repeat: job.repeat,
          prompt: job.prompt,
          runAt: nextRunAt,
          ...(job.githubConfig ? { githubConfig: job.githubConfig } : {}),
        },
      });
      await refresh();
    } catch {}
  }
  const latest = jobs.value.find(j => j.id === job.id) || { ...job, provider: 'auto' as const };
  await runNow(latest);
}

function runGuideOpenSettings(targetTab: 'deepseek' | 'native') {
  runGuide.value.open = false;
  peekModal.value.open = false;
  if (props.embedded) {
    emit('openSettings', targetTab);
  } else {
    notice.value = '请在 AI 工作区右上角打开「设置 → 模型服务」完成配置。';
  }
}

async function runNow(job: AiSchedule) {
  if (!backendReady.value || busy.value || job.state === 'running') return;
  busy.value = true;
  runningJobId.value = job.id;
  actionError.value = '';
  notice.value = job.kind === 'github-trending'
    ? `正在抓取 ${job.githubConfig?.since === 'weekly' ? '本周' : job.githubConfig?.since === 'monthly' ? '本月' : '今日'} GitHub 榜单前 ${job.githubConfig?.topN || 10} 个仓库并逐一分析…`
    : '正在立即执行自动化任务…';
  try {
    const res = await invoke('run-now', { id: job.id }) as { message?: string; item?: AiSchedule } | undefined;
    notice.value = res?.message || '执行完成。';
    await refresh();
    if (!peekModal.value.open && res?.item?.lastReportContent) {
      readingJob.value = res.item;
    }
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : '执行失败。';
    notice.value = '';
    await refresh();
  } finally {
    runningJobId.value = '';
    busy.value = false;
  }
}

async function copyReport(content?: string) {
  if (!content) return;
  try {
    await navigator.clipboard.writeText(content);
    copyOk.value = true;
    setTimeout(() => { copyOk.value = false; }, 1600);
  } catch {}
}

function canResume(job: AiSchedule): boolean {
  return (
    (job.repeat === 'daily' && ['paused', 'failed', 'unknown'].includes(job.state)) ||
    (job.repeat === 'once' && job.state === 'paused' && job.runAt > Date.now() + 10_000)
  );
}

async function change(action: 'pause' | 'resume' | 'delete', job: AiSchedule) {
  if (!backendReady.value || busy.value || (action === 'delete' && !window.confirm('删除这条自动化任务？已派发或正在执行的外部任务不会被取消。'))) {
    return;
  }
  busy.value = true;
  actionError.value = '';
  notice.value = '';
  try {
    await invoke(action, { id: job.id });
    await refresh();
  } catch (e) {
    actionError.value = e instanceof Error ? e.message : '操作未确认，请先检查任务列表。';
    await refresh();
  } finally {
    busy.value = false;
  }
}

function dateText(timestamp: number): string {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime())
    ? '时间不可用'
    : date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function splitJobHeadline(raw: string): { head: string; body: string } {
  const parts = raw.trim().split(/\n{2,}/);
  if (parts.length > 1 && parts[0].length <= 80) {
    return { head: parts[0], body: parts.slice(1).join('\n\n') };
  }
  const firstLine = raw.trim().split('\n')[0];
  return { head: firstLine.slice(0, 72) || '未命名任务', body: raw.trim() };
}

function agentText(job: AiSchedule): string {
  if (job.provider === 'auto') {
    if (fingerprint.value) {
      return `智能自动 · ${apiLabel.value}${apiModel.value ? ` (${apiModel.value})` : ''}`;
    }
    if (props.nativeConnected || detectedNative.value) {
      return `智能自动 · ${props.nativeAgentLabel || detectedNativeLabel.value || '本机助手'}`;
    }
    return job.kind === 'github-trending' ? '智能自动（免配可用基础版）' : '智能自动（待配模型）';
  }
  if (job.provider === 'native-pi') return '本机 Pi Agent';
  const name = job.providerLabel || 'DeepSeek';
  return job.model ? `${name} · ${job.model}` : name;
}

function githubPeriodLabel(since?: string): string {
  if (since === 'weekly') return '本周榜';
  if (since === 'monthly') return '本月榜';
  return '今日榜';
}

function onStorage(changes: any, area: string) {
  if (area === 'local' && changes[AI_SCHEDULE_KEY]) void refresh();
  if (area === 'local' && changes['byokConfigV1']) void refreshCredential();
}

async function refreshCredential() {
  try {
    const config = await loadConfig();
    apiPresetId.value = config.presetId;
    apiLabel.value = config.label || '模型服务';
    apiModel.value = config.model || '';
    fingerprint.value = config.configured ? await configCredentialFingerprint(config) : '';
  } catch {
    fingerprint.value = '';
  }
  if (!props.nativeConnected) {
    try {
      const ping = await pingNativeHost();
      const installed = ping?.agents?.filter(a => a.installed) || [];
      const chosen = installed.find(a => a.id === 'pi') || installed[0];
      detectedNative.value = Boolean(chosen || ping?.piAvailable);
      detectedNativeLabel.value = chosen ? `本机 ${chosen.name}` : ping?.piAvailable ? '本机 Pi' : '';
    } catch {
      detectedNative.value = false;
      detectedNativeLabel.value = '';
    }
  } else {
    detectedNative.value = true;
    detectedNativeLabel.value = props.nativeAgentLabel || '本机助手';
  }
}

function handleEscape() {
  if (showCreator.value) showCreator.value = false;
  else if (!props.embedded) emit('close');
}

watch(
  () => props.active,
  active => {
    if (active) {
      void refreshCredential();
      void refresh();
    }
  }
);

onMounted(async () => {
  if (!props.embedded) closeButton.value?.focus();
  if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(onStorage);
  await refreshCredential();
  await refresh();
});

onBeforeUnmount(() => {
  disposed = true;
  ++refreshVersion;
  if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(onStorage);
});
</script>

<template>
  <div class="schedule-overlay" :class="{ embedded }" @click.self="!embedded && emit('close')" @keydown.esc.stop="handleEscape">
    <section
      class="schedule-dialog"
      :role="embedded ? 'region' : 'dialog'"
      :aria-modal="embedded ? undefined : 'true'"
      aria-labelledby="schedule-title"
    >
      <div v-if="backendStale" class="auto-banner warning" role="alert">
        <span>!</span>
        <p>检测到扩展后台服务脚本尚未重载（仍在使用旧版代码），默认任务与最新能力需重启后台后生效。</p>
        <button type="button" @click="reloadExtensionWorker">🔄 立即热重载扩展</button>
      </div>
      <div v-if="loadError" class="auto-banner warning" role="alert">
        <span>!</span>
        <p>{{ loadError }}</p>
        <button type="button" :disabled="loading" @click="refresh">重新检查</button>
      </div>
      <div v-if="actionError" class="auto-banner warning" role="alert">
        <span>!</span>
        <p>{{ actionError }}</p>
        <button type="button" aria-label="关闭操作提示" @click="actionError = ''">×</button>
      </div>
      <div v-else-if="notice" class="auto-banner success" role="status">
        <span>✓</span>
        <p>{{ notice }}</p>
        <button type="button" aria-label="关闭提示" @click="notice = ''">×</button>
      </div>

      <!-- Automations Landing / List View (Always visible; drawer floats above right edge) -->
      <div class="auto-list-shell">
        <header class="auto-list-head">
          <div class="auto-list-title">
            <h2 id="schedule-title">自动化</h2>
          </div>
          <div class="auto-head-actions">
            <button type="button" class="pill-btn subtle with-icon" :disabled="busy" @click="emit('createWithPrompt')">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M8 2.2l1.1 2.9 2.9 1.1-2.9 1.1L8 10.2 6.9 7.3 4 6.2l2.9-1.1L8 2.2Z" />
                <path d="M12.5 10.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5Z" />
              </svg>
              <span>提示词创建</span>
            </button>
            <button type="button" class="pill-btn subtle" :disabled="!backendReady || busy" @click="openCreator(false)">
              ＋ 新建
            </button>
            <button v-if="!embedded" ref="closeButton" type="button" class="pill-btn subtle" aria-label="关闭定时任务" @click="emit('close')">×</button>
          </div>
        </header>

        <div v-if="!loaded && loading" class="auto-landing-empty" role="status">
          <p>正在读取自动化任务…</p>
        </div>
        <div v-else-if="!jobs.length" class="auto-landing-empty">
          <h3>暂无自动化任务</h3>
          <p>按计划定时运行提示词或 GitHub 榜单助手，执行记录也会显示在这里。</p>
        </div>
        <template v-else>
          <div class="auto-filter-tabs" role="tablist">
            <button
              v-for="tab in [
                { id: 'all', label: '全部', count: counts.all },
                { id: 'pending', label: '等待执行', count: counts.pending },
                { id: 'running', label: '运行中', count: counts.running },
                { id: 'completed', label: '已完成', count: counts.completed },
                { id: 'attention', label: '需关注', count: counts.attention },
              ]"
              :key="tab.id"
              type="button"
              role="tab"
              :aria-selected="filterTab === tab.id"
              :class="{ active: filterTab === tab.id }"
              @click="filterTab = tab.id as FilterTab"
            >
              {{ tab.label }}
              <span class="tab-num">{{ tab.count }}</span>
            </button>
            <button type="button" class="tab-refresh" :disabled="loading" title="刷新任务列表" @click="refresh">↻</button>
          </div>

          <div v-if="!filteredJobs.length" class="auto-landing-empty">
            <p>当前分类暂无自动化任务。</p>
          </div>
          <div v-else class="auto-job-list">
            <article v-for="job in filteredJobs" :key="job.id" class="auto-job-card">
              <div class="job-main">
                <div class="job-top-line">
                  <span class="state-dot" :class="job.state" />
                  <strong class="job-headline">{{ splitJobHeadline(job.prompt).head }}</strong>
                  <span v-if="job.isDefault || job.id === 'preset-github-trending-daily'" class="default-badge">默认</span>
                  <span class="state-badge" :class="job.state">{{ scheduleStatusLabel(job) }}</span>
                </div>
                <p v-if="splitJobHeadline(job.prompt).body !== splitJobHeadline(job.prompt).head" class="job-body">
                  {{ splitJobHeadline(job.prompt).body }}
                </p>
                <div class="job-meta-row">
                  <span class="meta-chip">{{ agentText(job) }}</span>
                  <span v-if="job.kind === 'github-trending'" class="meta-chip gh-chip">
                    GitHub {{ githubPeriodLabel(job.githubConfig?.since) }} · Top {{ job.githubConfig?.topN || 10 }}
                  </span>
                  <span class="meta-time">
                    <template v-if="job.repeat === 'daily'">↻ 每天 · </template>
                    ◷ {{ dateText(job.runAt) }}
                  </span>
                </div>
                <p v-if="job.lastResult" class="job-last-result">{{ job.lastResult }}</p>
              </div>
              <div class="job-controls">
                <button
                  type="button"
                  title="打开实时窥屏"
                  @click="openLivePeek(job)"
                >
                  窥屏
                </button>
                <button
                  v-if="job.peekFrames?.length"
                  type="button"
                  title="回放最近一次窥屏轨迹"
                  @click="openReplayPeek(job)"
                >
                  ▶ 回放窥屏
                </button>
                <button
                  v-if="job.lastReportContent"
                  type="button"
                  class="report-btn"
                  @click="readingJob = job"
                >
                  📄 查看报告
                </button>
                <button
                  type="button"
                  class="run-now-btn"
                  :disabled="!backendReady || busy || job.state === 'running'"
                  @click="requestRunJob(job)"
                >
                  {{ runningJobId === job.id || job.state === 'running' ? '运行中…' : '▶ 立即试跑' }}
                </button>
                <button
                  type="button"
                  :disabled="!backendReady || busy || job.state === 'running'"
                  @click="openEditor(job)"
                >
                  编辑
                </button>
                <button v-if="job.state === 'pending'" type="button" :disabled="!backendReady || busy" @click="change('pause', job)">暂停</button>
                <button v-if="canResume(job)" type="button" :disabled="!backendReady || busy" @click="change('resume', job)">恢复</button>
                <button type="button" class="danger" :disabled="!backendReady || busy || job.state === 'running'" @click="change('delete', job)">删除</button>
              </div>
            </article>
          </div>
        </template>
      </div>

      <!-- 右侧浮层编辑 / 新建抽屉（不隐藏或挤压左侧任务列表） -->
      <aside v-if="showCreator" class="auto-editor-drawer" aria-label="编辑自动化任务">
        <form class="auto-editor-form" @submit.prevent="create(false)">
          <header class="auto-editor-head">
            <h3>{{ editingJobId ? '编辑自动化任务' : '新建自动化任务' }}</h3>
            <button type="button" class="pill-btn subtle" aria-label="关闭抽屉" @click="cancelCreator">×</button>
          </header>

          <div class="auto-editor-body">
            <input
              v-model="title"
              type="text"
              class="auto-title-input"
              maxlength="100"
              placeholder="任务标题（例如：GitHub 今日榜单助手）"
              aria-label="自动化任务标题"
            />

            <div class="auto-mode-tabs" role="tablist">
              <button type="button" role="tab" :aria-selected="jobKind === 'prompt'" :class="{ active: jobKind === 'prompt' }" @click="jobKind = 'prompt'">
                💬 定时提示词
              </button>
              <button type="button" role="tab" :aria-selected="jobKind === 'github-trending'" :class="{ active: jobKind === 'github-trending' }" @click="selectGitHubModeTab">
                🔥 GitHub 榜单助手
              </button>
            </div>

            <div class="auto-context-row">
              <div class="auto-selectors">
                <label class="select-pill">
                  <select v-model="provider" aria-label="选择执行引擎">
                    <option value="auto">智能自动选择（推荐 · 优先已配模型，未配也能出基础榜单）</option>
                    <option value="openai-compat">{{ apiLabel }} · {{ apiModel || model || '未配置模型' }}</option>
                    <option value="native-pi">本机 Pi Agent（需本机终端）</option>
                  </select>
                </label>
              </div>
              <p class="auto-subhint">
                <template v-if="provider === 'auto'">
                  {{ fingerprint ? `将自动使用当前「${apiLabel}（${apiModel || model}）」运行。` : (props.nativeConnected || detectedNative) ? `将自动使用「${props.nativeAgentLabel || detectedNativeLabel || '本机终端'}」运行。` : (jobKind === 'github-trending' ? '即使暂未配模型，也能先抓取榜单与 README 生成基础简报；配置云端 Key 或 Ollama 后自动升级为 AI 深度点评。' : '将优先使用你配置好的模型服务或本机终端。') }}
                </template>
                <template v-else-if="provider === 'openai-compat' && !fingerprint">请先在「AI 设置 → 模型服务」中选择 DeepSeek / 硅基流动 / Kimi / 智谱 / 百炼 / OpenRouter / 本机 Ollama 并保存。</template>
                <template v-else-if="provider === 'native-pi'">通过本机 Pi CLI 执行，需电脑已安装终端桥接与 Pi。</template>
                <template v-else>将使用已配置的「{{ apiLabel }}（{{ apiModel || model }}）」按计划执行。</template>
              </p>
            </div>

            <div v-if="jobKind === 'github-trending'" class="auto-section github-cfg-card">
              <label class="section-label">GitHub 榜单抓取与分析配置</label>
              <div class="gh-cfg-row">
                <div class="gh-cfg-field">
                  <span class="gh-cfg-lbl">读取榜单前 N 个仓库（自选数量）</span>
                  <div class="gh-topn-pills">
                    <button v-for="n in [5, 10, 15, 20]" :key="n" type="button" class="topn-pill" :class="{ active: githubTopN === n }" @click="githubTopN = n">
                      Top {{ n }}
                    </button>
                    <input v-model.number="githubTopN" type="number" min="1" max="25" class="topn-input" aria-label="自定义抓取数量" />
                  </div>
                </div>
                <div class="gh-cfg-field">
                  <span class="gh-cfg-lbl">榜单范围</span>
                  <select v-model="githubSince" class="gh-cfg-select" aria-label="榜单周期">
                    <option value="daily">今日榜单 (Daily)</option>
                    <option value="weekly">本周榜单 (Weekly)</option>
                    <option value="monthly">本月榜单 (Monthly)</option>
                  </select>
                </div>
              </div>
              <label class="auto-confirm" style="margin-top: 4px;">
                <input v-model="githubSaveToLibrary" type="checkbox" />
                <span>分析完成后自动写入「资料库 → 文章（GitHub 每日榜单）」</span>
              </label>
            </div>

            <div class="auto-section">
              <label class="section-label">触发时间</label>
              <div class="trigger-card">
                <div class="trigger-controls">
                  <label class="control-pill">
                    <select v-model="repeat" aria-label="重复周期">
                      <option value="daily">每天</option>
                      <option value="once">仅一次</option>
                    </select>
                    <span class="chev">⌄</span>
                  </label>
                  <span class="at-label">于</span>
                  <label v-if="repeat === 'daily'" class="control-pill">
                    <input v-model="dailyTime" type="time" required aria-label="每天执行时间" />
                  </label>
                  <label v-else class="control-pill">
                    <input v-model="when" type="datetime-local" required aria-label="单次执行时间" />
                  </label>
                  <span class="tz-label">{{ gmtLabel }}</span>
                </div>
              </div>
            </div>

            <div class="auto-section">
              <label class="section-label" for="auto-instructions">任务指令</label>
              <textarea
                id="auto-instructions"
                ref="promptInput"
                v-model="prompt"
                class="instructions-box"
                maxlength="10000"
                rows="4"
                placeholder="描述希望自动化执行的指令内容…"
              />
            </div>

            <label class="auto-confirm">
              <input v-model="confirmed" type="checkbox" />
              <span>确认启用（浏览器开启时按本机时间触发；列表上可随时点「▶ 立即试跑」）</span>
            </label>
          </div>

          <footer class="auto-editor-foot">
            <button type="button" class="pill-btn subtle" @click="cancelCreator">取消</button>
            <button type="submit" class="pill-btn primary" :disabled="!canCreate">
              {{ busy ? '保存中…' : (editingJobId ? '保存修改' : '创建任务') }}
            </button>
          </footer>
        </form>
      </aside>

      <!-- 报告浮层阅读抽屉 -->
      <aside v-if="readingJob" class="auto-report-drawer" aria-label="自动化执行报告">
        <header class="auto-report-head">
          <div>
            <strong>{{ splitJobHeadline(readingJob.prompt).head }}</strong>
            <small>{{ agentText(readingJob) }} · {{ readingJob.lastResult || '最新生成报告' }}</small>
          </div>
          <div class="auto-head-actions">
            <button type="button" class="pill-btn subtle" @click="copyReport(readingJob.lastReportContent)">
              {{ copyOk ? '✓ 已复制' : '复制全文' }}
            </button>
            <button type="button" class="pill-btn subtle" @click="readingJob = null">关闭</button>
          </div>
        </header>
        <div class="auto-report-body">
          <MessageMarkdown :content="readingJob.lastReportContent || ''" />
        </div>
      </aside>

      <SchedulePeekModal
        v-if="peekModal.open"
        :mode="peekModal.mode"
        :job-id="peekModal.jobId"
        :job-title="peekModal.jobTitle"
        :replay-frames="peekModal.replayFrames"
        :running="Boolean(runningJobId)"
        :backend-stale="backendStale"
        @close="peekModal.open = false"
        @run-now="id => { const target = jobs.find(j => j.id === id); if (target) void requestRunJob(target); }"
        @reload-extension="reloadExtensionWorker"
      />

      <!-- 试跑前就绪检查引导弹窗 -->
      <div v-if="runGuide.open" class="guide-overlay" @click.self="runGuide.open = false" @keydown.esc.stop="runGuide.open = false">
        <section class="guide-dialog" role="dialog" aria-modal="true" :aria-label="runGuide.title">
          <header class="guide-head">
            <h3>{{ runGuide.title }}</h3>
            <button type="button" class="pill-btn subtle" aria-label="关闭引导" @click="runGuide.open = false">✕</button>
          </header>
          <p class="guide-desc">{{ runGuide.desc }}</p>
          <div class="guide-actions">
            <button
              v-if="runGuide.job?.kind === 'github-trending'"
              type="button"
              class="pill-btn primary"
              @click="runGuideContinueWithFallback"
            >
              {{ runGuide.reason === 'auto-unconfigured' ? '直接抓取并生成基础简报（立即体验）' : '改用智能自动并生成基础简报' }}
            </button>
            <button
              type="button"
              class="pill-btn"
              :class="{ primary: runGuide.job?.kind !== 'github-trending' }"
              @click="runGuideOpenSettings('deepseek')"
            >
              配置模型 Key / 本机 Ollama（推荐 · 30 秒可用）
            </button>
            <button
              type="button"
              class="pill-btn subtle"
              @click="runGuideOpenSettings('native')"
            >
              配置本机终端引擎（开发者）
            </button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
.schedule-overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.36);
  backdrop-filter: blur(8px);
}
.schedule-overlay.embedded {
  position: relative;
  inset: auto;
  display: block;
  padding: 0;
  background: transparent;
  backdrop-filter: none;
  height: 100%;
  overflow: auto;
}
.schedule-dialog {
  box-sizing: border-box;
  width: min(860px, 100%);
  max-height: 100%;
  overflow: auto;
  background: color-mix(in srgb, var(--panel, #ffffff) 92%, transparent);
  color: var(--text, #1f2937);
  border: 1px solid var(--border, #e5e8f0);
  border-radius: 16px;
  padding: 28px 32px;
}
.embedded .schedule-dialog {
  width: 100%;
  min-height: 100%;
  max-height: none;
  border: 0;
  border-radius: 0;
  background: transparent;
  padding: 32px clamp(20px, 5vw, 56px);
}

.auto-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 720px;
  margin: 0 auto 16px;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 12px;
}
.auto-banner.warning { background: rgba(245, 158, 11, 0.12); color: #b45309; }
.auto-banner.success { background: rgba(22, 163, 74, 0.1); color: #15803d; }
.auto-banner p { margin: 0; flex: 1; }
.auto-banner button { border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; }

.auto-creator,
.auto-list-shell {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auto-creator-head,
.auto-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.auto-title-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text, #1f2937);
  font: inherit;
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.02em;
  padding: 2px 0;
}
.auto-title-input::placeholder {
  color: var(--muted, #8e96a4);
  opacity: 0.72;
}

.auto-head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
}

.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  border-radius: 999px;
  padding: 6px 14px;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 140ms ease, opacity 140ms ease;
}
.pill-btn.with-icon svg {
  width: 14px;
  height: 14px;
  flex: none;
  color: var(--muted, #64748b);
}
.pill-btn.subtle {
  background: color-mix(in srgb, var(--text, #1e293b) 6%, transparent);
  color: var(--text, #334155);
}
.pill-btn.subtle:hover:not(:disabled) {
  background: color-mix(in srgb, var(--text, #1e293b) 10%, transparent);
}
.pill-btn.primary {
  background: #6f86f6;
  color: #ffffff;
}
.pill-btn.primary:hover:not(:disabled) {
  background: #5872f2;
}
.pill-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.auto-context-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: -8px;
}
.auto-selectors {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.context-badge {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text, #334155);
}
.select-pill,
.control-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border, #dce1ea);
  border-radius: 8px;
  background: color-mix(in srgb, var(--panel, #ffffff) 82%, transparent);
  padding: 0 10px;
  height: 32px;
  color: var(--text, #1f2937);
  font-size: 12.5px;
}
.select-pill select,
.control-pill select {
  appearance: none;
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  padding-right: 16px;
  cursor: pointer;
}
.control-pill input {
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-variant-numeric: tabular-nums;
}
.chev {
  pointer-events: none;
  margin-left: -12px;
  font-size: 12px;
  color: var(--muted, #64748b);
}
.auto-subhint {
  margin: 0;
  font-size: 12px;
  color: var(--muted, #64748b);
}

.auto-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.section-label {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--muted, #64748b);
}

.trigger-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border, #dce1ea);
  border-radius: 12px;
  background: color-mix(in srgb, var(--panel, #ffffff) 82%, transparent);
}
.trigger-title {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text, #1f2937);
}
.trigger-title svg {
  width: 15px;
  height: 15px;
  color: var(--muted, #64748b);
}
.trigger-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.at-label,
.tz-label {
  font-size: 12.5px;
  color: var(--muted, #64748b);
}

.instructions-box {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border, #dce1ea);
  border-radius: 12px;
  background: color-mix(in srgb, var(--panel, #ffffff) 86%, transparent);
  color: var(--text, #1f2937);
  padding: 12px 14px;
  font: inherit;
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
  min-height: 112px;
  outline-color: #6f86f6;
}
.instructions-box::placeholder {
  color: var(--muted, #8e96a4);
}

.auto-confirm {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--muted, #64748b);
  cursor: pointer;
}
.auto-confirm input {
  margin-top: 3px;
  accent-color: #6f86f6;
}

.auto-list-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.auto-list-title h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 550;
  letter-spacing: -0.015em;
}
.count-pill {
  padding: 1px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text, #1e293b) 7%, transparent);
  font-size: 11.5px;
  color: var(--muted, #64748b);
  font-variant-numeric: tabular-nums;
}

.auto-filter-tabs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid var(--border, #e5e8f0);
  padding-bottom: 10px;
}
.auto-filter-tabs button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 0;
  background: transparent;
  padding: 5px 10px;
  border-radius: 7px;
  font: inherit;
  font-size: 12.5px;
  color: var(--muted, #64748b);
  cursor: pointer;
}
.auto-filter-tabs button.active {
  background: color-mix(in srgb, var(--text, #1e293b) 7.5%, transparent);
  color: var(--text, #1f2937);
  font-weight: 550;
}
.tab-num {
  font-size: 11px;
  opacity: 0.7;
  font-variant-numeric: tabular-nums;
}

.tab-refresh {
  margin-left: auto;
  font-size: 14px;
}
.auto-landing-empty {
  padding: 64px 0 32px;
  text-align: left;
}
.auto-landing-empty h3 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 550;
  color: var(--text, #1f2937);
}
.auto-landing-empty p {
  margin: 0;
  max-width: 460px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--muted, #64748b);
}
.inline-link {
  border: 0;
  background: transparent;
  color: #5b7bf9;
  font: inherit;
  cursor: pointer;
  margin-left: 4px;
}

.auto-job-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.auto-job-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border, #e2e6ef);
  background: color-mix(in srgb, var(--panel, #ffffff) 86%, transparent);
}
.job-main {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.job-top-line {
  display: flex;
  align-items: center;
  gap: 8px;
}
.state-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex: none;
  background: #94a3b8;
}
.state-dot.pending { background: #6f86f6; }
.state-dot.running { background: #38bdf8; }
.state-dot.completed { background: #16a34a; }
.state-dot.failed, .state-dot.unknown, .state-dot.skipped { background: #d97706; }

.job-headline {
  font-size: 13.5px;
  font-weight: 550;
  color: var(--text, #1f2937);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.state-badge {
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text, #1e293b) 6%, transparent);
  color: var(--muted, #64748b);
  white-space: nowrap;
}
.state-badge.completed { color: #16a34a; background: rgba(22, 163, 74, 0.1); }
.state-badge.failed, .state-badge.unknown, .state-badge.skipped { color: #b45309; background: rgba(245, 158, 11, 0.12); }

.job-body {
  margin: 0;
  font-size: 12.5px;
  color: var(--muted, #526075);
  line-height: 1.5;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.job-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: var(--muted, #64748b);
}
.meta-chip {
  padding: 1px 7px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--text, #1e293b) 5%, transparent);
}
.job-last-result {
  margin: 2px 0 0;
  font-size: 11.5px;
  color: var(--muted, #64748b);
  overflow-wrap: anywhere;
}
.job-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: none;
}
.job-controls button {
  border: 0;
  background: transparent;
  padding: 4px 8px;
  border-radius: 6px;
  font: inherit;
  font-size: 11.5px;
  color: var(--muted, #64748b);
  cursor: pointer;
}
.job-controls button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--text, #1e293b) 7%, transparent);
  color: var(--text, #1f2937);
}
.job-controls button.danger:hover:not(:disabled) {
  color: #dc2626;
}
.job-controls button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.job-controls button.run-now-btn {
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.1);
  font-weight: 550;
}
.job-controls button.run-now-btn:hover:not(:disabled) {
  background: #6366f1;
  color: #ffffff;
}
.job-controls button.report-btn {
  color: #0284c7;
  background: rgba(14, 165, 233, 0.1);
  font-weight: 550;
}
.meta-chip.gh-chip {
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
  font-weight: 550;
}
.auto-mode-tabs {
  display: inline-flex;
  gap: 6px;
  padding: 4px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--text, #1e293b) 5%, transparent);
  align-self: flex-start;
}
.auto-mode-tabs button {
  border: 0;
  background: transparent;
  padding: 5px 12px;
  border-radius: 7px;
  font: inherit;
  font-size: 12px;
  font-weight: 550;
  color: var(--muted, #64748b);
  cursor: pointer;
}
.auto-mode-tabs button.active {
  background: var(--panel, #ffffff);
  color: #4f46e5;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
}
.github-cfg-card {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.24);
  background: rgba(99, 102, 241, 0.04);
}
.gh-cfg-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: flex-end;
}
.gh-cfg-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.gh-cfg-lbl {
  font-size: 11.5px;
  color: var(--muted, #64748b);
}
.gh-topn-pills {
  display: flex;
  align-items: center;
  gap: 6px;
}
.topn-pill {
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.topn-pill.active {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
  font-weight: 600;
}
.topn-input {
  width: 60px;
  height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--text, #1f2937);
  font: inherit;
  font-size: 12px;
}
.gh-cfg-select {
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  color: var(--text, #1f2937);
  font: inherit;
  font-size: 12px;
}
.auto-report-drawer {
  position: fixed;
  top: 24px;
  right: 24px;
  bottom: 24px;
  width: min(680px, calc(100vw - 48px));
  z-index: 80;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  border: 1px solid var(--border, #dce2ec);
  background: var(--panel, #ffffff);
  box-shadow: -16px 0 42px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}
.auto-report-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, #6366f1 4%, var(--panel, #ffffff));
}
.auto-report-head strong {
  display: block;
  font-size: 14px;
  color: var(--heading, #0f172a);
}
.auto-report-head small {
  font-size: 11.5px;
  color: var(--muted, #64748b);
}
.auto-report-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 18px 22px;
}
.default-badge {
  font-size: 10.5px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 5px;
  background: rgba(99, 102, 241, 0.14);
  color: #4f46e5;
  flex: none;
}
.auto-editor-drawer {
  position: fixed;
  top: 24px;
  right: 24px;
  bottom: 24px;
  width: min(490px, calc(100vw - 48px));
  z-index: 75;
  border-radius: 14px;
  border: 1px solid var(--border, #dce2ec);
  background: color-mix(in srgb, var(--panel, #ffffff) 97%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: -16px 0 42px rgba(15, 23, 42, 0.18);
  overflow: hidden;
}
.auto-editor-form {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.auto-editor-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, #6366f1 3%, var(--panel, #ffffff));
}
.auto-editor-head h3 {
  margin: 0;
  font-size: 14.5px;
  font-weight: 650;
  color: var(--heading, #0f172a);
}
.auto-editor-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.auto-editor-foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid var(--border, #e5e8ef);
  background: color-mix(in srgb, var(--surface, #f8fafc) 75%, transparent);
}
.guide-overlay {
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
}
.guide-dialog {
  width: min(460px, 100%);
  padding: 20px 22px;
  border-radius: 14px;
  border: 1px solid var(--border, #e2e8f0);
  background: var(--panel, #ffffff);
  box-shadow: 0 20px 56px rgba(15, 23, 42, 0.28);
  color: var(--text, #1f2937);
}
.guide-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.guide-head h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 650;
  color: var(--heading, #0f172a);
}
.guide-desc {
  margin: 10px 0 16px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--muted, #475569);
}
.guide-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.guide-actions .pill-btn {
  width: 100%;
  justify-content: center;
  padding: 9px 14px;
}
</style>
