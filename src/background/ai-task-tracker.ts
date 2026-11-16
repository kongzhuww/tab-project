import { multicaService, MulticaRequestError } from '../services/multica.service';
import { publishAiNotification } from '../multica/ai-notifications';
import { classifyRun, trackedRun, trackingDelay, type TrackedMulticaTask } from '../multica/task-tracking';
declare const chrome:any;
const KEY = 'aiTrackedMulticaTasksV1', ALARM = 'ai-workspace-track-v1', MAX = 100;
const LIMIT_AGE = 48 * 60 * 60 * 1000;
let queue:Promise<unknown> = Promise.resolve();
function serial<T>(run:()=>Promise<T>):Promise<T> { const result=queue.then(run); queue=result.catch(()=>{}); return result; }
async function read():Promise<TrackedMulticaTask[]> {
  const value=(await chrome.storage.local.get(KEY))[KEY];
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > MAX || value.some(item => !item || typeof item.id !== 'string' || typeof item.workspaceId !== 'string' || typeof item.issueId !== 'string' || typeof item.title !== 'string' || !Array.isArray(item.knownRunIds) || !Number.isFinite(item.createdAt) || !Number.isFinite(item.failures) || !Number.isFinite(item.retryAt))) throw new Error('任务追踪记录格式异常，未覆盖原数据');
  return value;
}
async function ensureAlarm(tasks:TrackedMulticaTask[]):Promise<void> {
  if (!tasks.length) { await chrome.alarms.clear(ALARM); return; }
  if (!await chrome.alarms.get(ALARM)) await chrome.alarms.create(ALARM, {delayInMinutes:1,periodInMinutes:2});
}
export async function trackMulticaTask(issueId:string, title:string, knownRunIds:string[], workspaceId:string):Promise<void> {
  return serial(async () => {
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(issueId) || !/^[A-Za-z0-9_-]{1,100}$/.test(workspaceId) || !Array.isArray(knownRunIds) || knownRunIds.length > 200 || knownRunIds.some(id => typeof id !== 'string' || id.length > 100)) throw new Error('任务追踪参数无效');
    if (await multicaService.activeWorkspaceId() !== workspaceId) throw new Error('发送后工作区已切换，未启动追踪；请回原工作区查看。');
    const tasks=await read(); if (tasks.length >= MAX) throw new Error('待追踪任务过多，请先检查已有任务。');
    tasks.push({id:crypto.randomUUID(),workspaceId,issueId,title:String(title).slice(0,160),knownRunIds,createdAt:Date.now(),failures:0,retryAt:0});
    await chrome.storage.local.set({[KEY]:tasks});
    await ensureAlarm(tasks);
  });
}
export async function checkTrackedMulticaTasks():Promise<void> {
  return serial(async () => {
    const tasks=await read(), now=Date.now();
    const workspace=await multicaService.activeWorkspaceId();
    const remaining:TrackedMulticaTask[]=[];
    for (const task of tasks) {
      if (task.workspaceId !== workspace || task.retryAt > now) { remaining.push(task); continue; }
      if (now-task.createdAt > LIMIT_AGE) {
        try { await publishAiNotification(`ai_mc_${task.id}`, 'Multica', task.title, 'unknown'); }
        catch { remaining.push(task); }
        continue;
      }
      try {
        const run=trackedRun(task, await multicaService.issueRuns(task.issueId, task.workspaceId));
        const result=run && classifyRun(run);
        if (!result) { task.failures=0; task.retryAt=0; remaining.push(task); continue; }
        await publishAiNotification(`ai_mc_${task.id}`, 'Multica', task.title, result);
      } catch (error) {
        task.failures++;
        const delay=error instanceof MulticaRequestError && error.retryAfterMs ? Math.max(trackingDelay(task.failures),error.retryAfterMs) : trackingDelay(task.failures);
        task.retryAt=now+delay; remaining.push(task);
      }
    }
    await chrome.storage.local.set({[KEY]:remaining});
    await ensureAlarm(remaining);
  });
}
export function initAiTaskTracker():void {
  chrome.runtime.onMessage.addListener((message:any,sender:any,reply:(value:any)=>void) => {
    if (message?.type !== 'ai-workspace:track-multica') return;
    if (sender.id !== chrome.runtime.id || !String(sender.url || '').startsWith(chrome.runtime.getURL(''))) { reply({ok:false,error:'无权追踪任务'}); return; }
    void trackMulticaTask(message.issueId,message.title,message.knownRunIds,message.workspaceId)
      .then(()=>reply({ok:true})).catch(error=>reply({ok:false,error:error instanceof Error ? error.message : '任务追踪未确认'}));
    return true;
  });
  chrome.alarms.onAlarm.addListener((alarm:any) => { if (alarm?.name === ALARM) void checkTrackedMulticaTasks().catch(()=>console.warn('[AI] Task tracking check not confirmed.')); });
  void serial(async()=>ensureAlarm(await read())).catch(()=>console.warn('[AI] Task tracking restore not confirmed.'));
}
