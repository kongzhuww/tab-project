export const AI_SCHEDULE_KEY = 'aiWorkspaceSchedulesV1';
export type ScheduleProvider = 'multica' | 'deepseek';
export type ScheduleState = 'pending' | 'running' | 'completed' | 'failed' | 'unknown' | 'paused' | 'skipped';
export type RepeatRule = 'once' | 'daily';
export interface AiSchedule {
  id:string; provider:ScheduleProvider; prompt:string; runAt:number; repeat:RepeatRule;
  localHour:number; localMinute:number; state:ScheduleState; createdAt:number;
  workspaceId?:string; agentId?:string; model?:string; keyFingerprint?:string;
  runId?:string; startedAt?:number; lastResult?:string;
  notificationPending?: { runId:string; outcome:'success'|'error'|'unknown'|'skipped' };
}
export function validateScheduleInput(input:any, now=Date.now()):void {
  if (!input || !['multica','deepseek'].includes(input.provider) || !['once','daily'].includes(input.repeat)) throw new Error('请选择有效的服务与重复方式。');
  if (typeof input.prompt !== 'string' || !input.prompt.trim() || input.prompt.length > 10000) throw new Error('请输入不超过 10,000 字的任务内容。');
  if (!Number.isFinite(input.runAt) || input.runAt <= now+10000 || input.runAt > now+366*86400000) throw new Error('请选择 10 秒后至一年内的时间。');
  if (input.provider === 'multica' && (typeof input.agentId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(input.agentId) || typeof input.workspaceId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(input.workspaceId))) throw new Error('请选择当前工作区的 Multica 智能体。');
  if (input.provider === 'deepseek' && (typeof input.keyFingerprint !== 'string' || !/^[a-f0-9]{64}$/.test(input.keyFingerprint))) throw new Error('无法确认当前 DeepSeek 账号，请重新打开定时任务。');
  if (input.provider === 'deepseek' && (typeof input.model !== 'string' || !/^[A-Za-z0-9._-]{1,100}$/.test(input.model))) throw new Error('请选择有效的 DeepSeek 模型。');
}
export async function keyFingerprint(key:string):Promise<string> {
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
  return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
}
export function nextDaily(hour:number,minute:number,after:number):number {
  const next=new Date(after); next.setHours(hour,minute,0,0);
  if (next.getTime() <= after) next.setDate(next.getDate()+1);
  return next.getTime();
}
export function safeScheduleList(value:unknown):AiSchedule[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 100 || value.some(item => !item || typeof item.id !== 'string' || !['multica','deepseek'].includes(item.provider) || typeof item.prompt !== 'string' || item.prompt.length > 10000 || !Number.isFinite(item.runAt) || !Number.isFinite(item.createdAt) || !Number.isInteger(item.localHour) || item.localHour<0 || item.localHour>23 || !Number.isInteger(item.localMinute) || item.localMinute<0 || item.localMinute>59 || !['once','daily'].includes(item.repeat) || !['pending','running','completed','failed','unknown','paused','skipped'].includes(item.state))) throw new Error('定时任务数据格式异常，未覆盖原数据。');
  for (const item of value) {
    if (item.state === 'running' && (typeof item.runId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(item.runId) || !Number.isFinite(item.startedAt))) throw new Error('定时任务运行记录格式异常，未覆盖原数据。');
    if (item.notificationPending && (typeof item.notificationPending.runId !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(item.notificationPending.runId) || !['success','error','unknown','skipped'].includes(item.notificationPending.outcome))) throw new Error('定时任务通知记录格式异常，未覆盖原数据。');
  }
  return value;
}
