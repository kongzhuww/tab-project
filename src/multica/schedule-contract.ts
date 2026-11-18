export const AI_SCHEDULE_KEY = 'aiWorkspaceSchedulesV1';
export const AI_SCHEDULE_SEEDED_KEY = 'aiWorkspaceSchedulePresetSeededV1';
export const AI_SCHEDULE_LIVE_PEEK_KEY = 'aiScheduleLivePeekV1';
export const AI_SCHEDULE_WORKER_STAMP = 'sched-auto-fallback-v6';
export type ScheduleProvider = 'auto' | 'deepseek' | 'openai-compat' | 'native-pi';
export type ScheduleKind = 'prompt' | 'github-trending';
export type ScheduleState = 'pending' | 'running' | 'completed' | 'failed' | 'unknown' | 'paused' | 'skipped';
export type RepeatRule = 'once' | 'daily';

export type SchedulePeekPhase = 'fetching' | 'trending' | 'readme' | 'analyzing' | 'saving' | 'done' | 'error';
export type SchedulePeekTarget = 'source' | 'repo-card' | 'readme-panel' | 'ai-panel' | 'library-save' | 'report-done';

export interface SchedulePeekRepoItem {
  rank: number;
  fullName: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  todayStars: number;
  status?: 'pending' | 'reading' | 'done';
  readmeExcerpt?: string;
}

export interface SchedulePeekSnapshot {
  jobId: string;
  jobTitle: string;
  kind: ScheduleKind;
  provider: ScheduleProvider;
  providerLabel?: string;
  active: boolean;
  phase: SchedulePeekPhase;
  cursorTarget: SchedulePeekTarget;
  cursorLabel: string;
  sourceLabel?: string;
  repos?: SchedulePeekRepoItem[];
  activeRepoIndex?: number;
  activeRepo?: SchedulePeekRepoItem;
  reportPreview?: string;
  timelineSteps: string[];
  updatedAt: number;
}

export interface GitHubTrendingScheduleConfig {
  topN: number;
  since: 'daily' | 'weekly' | 'monthly';
  focus?: string;
  saveToLibrary?: boolean;
}

export interface AiSchedule {
  id:string; provider:ScheduleProvider; providerLabel?:string; providerExplicit?:boolean; kind?:ScheduleKind; isDefault?:boolean; prompt:string; runAt:number; repeat:RepeatRule;
  localHour:number; localMinute:number; state:ScheduleState; createdAt:number;
  model?:string; keyFingerprint?:string;
  githubConfig?: GitHubTrendingScheduleConfig;
  runId?:string; startedAt?:number; lastResult?:string;
  lastReportContent?: string; lastArticleId?: string; lastConversationId?: string;
  peekFrames?: SchedulePeekSnapshot[];
  notificationPending?: { runId:string; outcome:'success'|'error'|'unknown'|'skipped' };
}
export function isApiScheduleProvider(provider: string | undefined): boolean {
  return provider === 'deepseek' || provider === 'openai-compat';
}
export function validateScheduleInput(input:any, now=Date.now()):void {
  if (!input || !['auto', 'deepseek', 'openai-compat', 'native-pi'].includes(input.provider) || !['once','daily'].includes(input.repeat)) throw new Error('请选择有效的服务与重复方式。');
  const kind: ScheduleKind = input.kind === 'github-trending' ? 'github-trending' : 'prompt';
  if (kind === 'github-trending') {
    const topN = Number(input.githubConfig?.topN ?? 10);
    if (!Number.isFinite(topN) || topN < 1 || topN > 25) throw new Error('GitHub 榜单抓取数量请设置在 1 ~ 25 之间。');
    if (input.githubConfig?.since && !['daily', 'weekly', 'monthly'].includes(input.githubConfig.since)) {
      throw new Error('GitHub 榜单周期无效。');
    }
  }
  if (typeof input.prompt !== 'string' || !input.prompt.trim() || input.prompt.length > 10000) throw new Error('请输入不超过 10,000 字的任务内容。');
  if (!Number.isFinite(input.runAt) || input.runAt <= now+10000 || input.runAt > now+366*86400000) throw new Error('请选择 10 秒后至一年内的时间。');
  if (isApiScheduleProvider(input.provider)) {
    if (typeof input.keyFingerprint !== 'string' || !/^[a-f0-9]{64}$/.test(input.keyFingerprint)) throw new Error('无法确认当前模型服务配置，请重新打开定时任务。');
    if (typeof input.model !== 'string' || !/^[a-zA-Z0-9._:/@-]{1,160}$/.test(input.model.trim())) throw new Error('请选择有效的模型名称。');
  }
}
export async function keyFingerprint(key:string):Promise<string> {
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
  return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function configCredentialFingerprint(config: { presetId?: string; baseUrl?: string; key?: string }): Promise<string> {
  if (config.presetId === 'deepseek' && config.key) {
    return keyFingerprint(config.key);
  }
  return keyFingerprint(`${config.baseUrl || ''}::${config.key || ''}`);
}
export function nextDaily(hour:number,minute:number,after:number):number {
  const next=new Date(after); next.setHours(hour,minute,0,0);
  if (next.getTime() <= after) next.setDate(next.getDate()+1);
  return next.getTime();
}
export function createDefaultGitHubTrendingSchedule(now=Date.now()):AiSchedule {
  return {
    id: 'preset-github-trending-daily',
    provider: 'auto',
    providerLabel: '智能自动',
    kind: 'github-trending',
    isDefault: true,
    prompt: 'GitHub 今日榜单精选助手\n\n每天抓取 GitHub 今日 Trending 榜前 10 个仓库，全部通读 README 与说明后判断哪些真正有作用，并逐一介绍一遍。',
    runAt: nextDaily(9, 0, now),
    repeat: 'daily',
    localHour: 9,
    localMinute: 0,
    state: 'pending',
    createdAt: now,
    githubConfig: {
      topN: 10,
      since: 'daily',
      focus: '重点判断哪些仓库真正有实用价值、能落地到日常开发或 Agent 工作流；前 N 个全部看一遍并逐一介绍。',
      saveToLibrary: true,
    },
  };
}
export function safeScheduleList(value:unknown):AiSchedule[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 100 || value.some(item => !item || typeof item.id !== 'string' || !['auto','deepseek','openai-compat','native-pi','multica'].includes(item.provider) || typeof item.prompt !== 'string' || item.prompt.length > 10000 || !Number.isFinite(item.runAt) || !Number.isFinite(item.createdAt) || !Number.isInteger(item.localHour) || item.localHour<0 || item.localHour>23 || !Number.isInteger(item.localMinute) || item.localMinute<0 || item.localMinute>59 || !['once','daily'].includes(item.repeat) || !['pending','running','completed','failed','unknown','paused','skipped'].includes(item.state))) throw new Error('定时任务数据格式异常，未覆盖原数据。');
  const active = value.filter((item): item is AiSchedule => item.provider === 'auto' || item.provider === 'deepseek' || item.provider === 'openai-compat' || item.provider === 'native-pi');
  for (const item of active) {
    if (item.state === 'running' && (typeof item.runId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(item.runId) || !Number.isFinite(item.startedAt))) throw new Error('定时任务运行记录格式异常，未覆盖原数据。');
    if (item.notificationPending && (typeof item.notificationPending.runId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(item.notificationPending.runId) || !['success','error','unknown','skipped'].includes(item.notificationPending.outcome))) throw new Error('定时任务通知记录格式异常，未覆盖原数据。');
  }
  return active;
}
