import { AI_SCHEDULE_KEY, keyFingerprint as keyFingerprintForConfig, nextDaily, safeScheduleList, validateScheduleInput, type AiSchedule } from '../multica/schedule-contract';
import { publishAiNotification } from '../multica/ai-notifications';
import { multicaService, MulticaRequestError } from '../services/multica.service';
import { loadConfig, saveConversation, streamDeepSeek, type LocalConversation } from '../services/byok.service';
import { sessionTitle } from '../multica/session-content';
import { trackMulticaTask } from './ai-task-tracker';
declare const chrome:any;
const ALARM='ai-workspace-schedule-v1', MAX_LATE=10*60*1000, WATCHDOG=10*60*1000;
let queue:Promise<unknown> = Promise.resolve();
function serial<T>(fn:()=>Promise<T>):Promise<T> { const result=queue.then(fn); queue=result.catch(()=>{}); return result; }
async function read():Promise<AiSchedule[]> { return safeScheduleList((await chrome.storage.local.get(AI_SCHEDULE_KEY))[AI_SCHEDULE_KEY]); }
async function write(items:AiSchedule[]):Promise<void> { await chrome.storage.local.set({[AI_SCHEDULE_KEY]:items}); }
async function arm(items:AiSchedule[]):Promise<void> {
  const running=items.some(item=>item.state==='running');
  const due=items.flatMap(item => [item.notificationPending ? Date.now()+60000 : Infinity, item.state==='pending' && !running && !item.notificationPending ? item.runAt : item.state==='running' && Number.isFinite(item.startedAt) ? item.startedAt!+WATCHDOG : Infinity]).filter(Number.isFinite);
  if (!due.length) { await chrome.alarms.clear(ALARM); return; }
  await chrome.alarms.create(ALARM,{when:Math.max(Date.now()+1000,Math.min(...due))});
}
export async function createAiSchedule(input:any):Promise<AiSchedule> {
  validateScheduleInput(input);
  let workspaceId:string|undefined, keyFingerprint:string|undefined;
  if (input.provider==='multica') {
    workspaceId=await multicaService.activeWorkspaceId() || undefined;
    if (!workspaceId) throw new Error('请先连接 Multica 工作区。');
    if (workspaceId!==input.workspaceId) throw new Error('工作区已更换，请重新选择智能体。');
  } else {
    const config=await loadConfig(); if (!config.key) throw new Error('请先配置 DeepSeek API Key。');
    keyFingerprint=await keyFingerprintForConfig(config.key);
    if (keyFingerprint!==input.keyFingerprint) throw new Error('DeepSeek 账号已更换，请重新打开定时任务。');
  }
  const date=new Date(input.runAt);
  const item:AiSchedule={id:crypto.randomUUID(),provider:input.provider,prompt:input.prompt.trim(),runAt:input.runAt,repeat:input.repeat,localHour:date.getHours(),localMinute:date.getMinutes(),state:'pending',createdAt:Date.now(),
    ...(workspaceId ? {workspaceId,agentId:input.agentId} : {keyFingerprint,model:input.model})};
  return serial(async()=>{
    const all=await read(); if (all.length>=100) throw new Error('定时任务已达上限，请先删除旧记录。');
    all.unshift(item); await write(all);
    try { await arm(all); } catch { throw new Error('任务已保存，但浏览器定时唤醒未确认；请查看列表，勿重复创建。'); }
    return item;
  });
}
export async function listAiSchedules():Promise<AiSchedule[]> { return serial(read); }
export async function changeAiSchedule(action:'pause'|'resume'|'delete',id:string):Promise<void> {
  return serial(async()=>{
    const all=await read(), index=all.findIndex(item=>item.id===id);
    if (index<0) throw new Error('定时任务不存在。');
    const item=all[index];
    if (item.state==='running') throw new Error('任务已开始执行，不能假装取消；请等待结果。');
    if (action==='delete') all.splice(index,1);
    else if (action==='pause') { if (item.state!=='pending') throw new Error('该任务当前不能暂停。'); item.state='paused'; }
    else {
      if (item.repeat==='daily' && ['paused','failed','unknown'].includes(item.state)) item.runAt=nextDaily(item.localHour,item.localMinute,Date.now());
      else if (!(item.repeat==='once' && item.state==='paused' && item.runAt>Date.now()+10000)) throw new Error('此任务不能恢复，请重新创建。');
      item.state='pending'; item.lastResult='已恢复';
    }
    await write(all); await arm(all);
  });
}
async function execute(item:AiSchedule):Promise<{outcome:'success'|'error'|'unknown';message:string;notify:boolean}> {
  if (item.provider==='multica') {
    if (!item.workspaceId || !item.agentId || await multicaService.activeWorkspaceId()!==item.workspaceId) return {outcome:'error',message:'工作区已更换或未连接，未派发。',notify:true};
    let sent=false;
    try {
      const result=await multicaService.createIssue(sessionTitle(item.prompt),item.prompt,item.agentId,item.workspaceId); sent=true;
      await trackMulticaTask(result.id,sessionTitle(item.prompt),[],item.workspaceId);
      return {outcome:'success',message:'已派发，等待智能体执行结束。',notify:false};
    } catch (error) {
      const definite=!sent && error instanceof MulticaRequestError && [400,401,403,404,422].includes(error.status || 0);
      return {outcome:definite?'error':'unknown',message:sent?'派发已确认但完成追踪未启用，请到 Multica 核对。':'派发结果未确认，请到 Multica 核对，勿重复提交。',notify:true};
    }
  }
  const config=await loadConfig();
  if (!config.key || !item.keyFingerprint || await keyFingerprintForConfig(config.key)!==item.keyFingerprint || !item.model) return {outcome:'error',message:'DeepSeek 账号已更换或未配置，未发起请求。',notify:true};
  const chat:LocalConversation={id:crypto.randomUUID(),provider:'deepseek',model:item.model,title:sessionTitle(item.prompt),updatedAt:Date.now(),messages:[{role:'user',content:item.prompt,incomplete:true},{role:'assistant',content:'',incomplete:true}]};
  try { await saveConversation(chat); } catch { return {outcome:'error',message:'会话未能保存，请求未发送。',notify:true}; }
  try {
    await streamDeepSeek(config.key,item.model,[{role:'user',content:item.prompt}],AbortSignal.timeout(9*60*1000),text=>{chat.messages[1].content+=text;},undefined,text=>{chat.messages[1].reasoning=(chat.messages[1].reasoning||'')+text;});
    if (!chat.messages[1].content.trim()) throw new Error('没有返回可显示的正文');
    chat.messages[0].incomplete=false; chat.messages[1].incomplete=false; chat.updatedAt=Date.now();
    try { await saveConversation(chat); } catch { return {outcome:'unknown',message:'回复保存未确认，请在本机会话核对。',notify:true}; }
    return {outcome:'success',message:'回复已保存到本机会话。',notify:true};
  } catch (error) {
    chat.updatedAt=Date.now(); try { await saveConversation(chat); } catch { /* partial output is best effort */ }
    const definite=error instanceof Error && /（(?:401|402|429)）|HTTP (?:400|401|402|403|404|422|429)\b/.test(error.message);
    return {outcome:definite?'error':'unknown',message:definite?'请求失败，请检查 DeepSeek 配置。':'请求中断或结果不确定，可能已计费；请先核对，勿自动重试。',notify:true};
  }
}
async function flushNotifications():Promise<void> {
  await serial(async()=>{
    const all=await read();
    for (const item of all) {
      const pending=item.notificationPending;
      if (!pending) continue;
      try {
        await publishAiNotification(`ai_sched_${pending.runId}`,item.provider==='multica'?'Multica':'DeepSeek',sessionTitle(item.prompt),pending.outcome);
        delete item.notificationPending;
        await write(all);
      } catch { /* Keep the durable outbox for a later alarm. */ }
    }
    await arm(all);
  });
}
export async function runDueAiSchedules():Promise<void> {
  await flushNotifications();
  const selected=await serial(async()=>{
    const all=await read(),now=Date.now();
    // A watchdog cannot establish whether an interrupted network write happened.
    for (const item of all) if (item.state==='running' && item.startedAt && now-item.startedAt>=WATCHDOG) { item.state='unknown'; item.lastResult='执行中断或超时，结果未确认；未自动重试。'; if (item.runId) item.notificationPending={runId:item.runId,outcome:'unknown'}; }
    if (all.some(item=>item.state==='running')) { await write(all); await arm(all); return null; }
    const item=all.filter(x=>x.state==='pending' && !x.notificationPending && x.runAt<=now).sort((a,b)=>a.runAt-b.runAt)[0];
    if (!item) { await write(all); await arm(all); return null; }
    const runId=crypto.randomUUID();
    if (now-item.runAt>MAX_LATE) {
      item.lastResult='错过计划时间超过 10 分钟，本次未执行。'; item.runId=runId; item.notificationPending={runId,outcome:'skipped'};
      if (item.repeat==='daily') item.runAt=nextDaily(item.localHour,item.localMinute,now); else item.state='skipped';
      await write(all); await arm(all); return {item:{...item},runId,missed:true};
    }
    item.state='running'; item.startedAt=now; item.runId=runId;
    await write(all); await arm(all);
    return {item:{...item},runId,missed:false};
  });
  if (!selected) { await flushNotifications(); return; }
  if (selected.missed) { await flushNotifications(); void runDueAiSchedules().catch(()=>{}); return; }
  let result:Awaited<ReturnType<typeof execute>>;
  try { result=await execute(selected.item); } catch { result={outcome:'unknown',message:'运行中断，结果未确认；请核对后再操作。',notify:true}; }
  const committed=await serial(async()=>{
    const all=await read(), live=all.find(x=>x.id===selected.item.id);
    if (!live || live.state!=='running' || live.runId!==selected.runId) return false;
    live.lastResult=result.message;
    if (result.notify) live.notificationPending={runId:selected.runId,outcome:result.outcome};
    if (result.outcome==='success' && live.repeat==='daily') { live.state='pending'; live.runAt=nextDaily(live.localHour,live.localMinute,Date.now()); }
    else live.state=result.outcome==='success'?'completed':result.outcome==='error'?'failed':'unknown';
    await write(all); await arm(all); return true;
  });
  if (committed && result.notify) await flushNotifications();
  void runDueAiSchedules().catch(()=>{});
}
export function initAiScheduler():void {
  chrome.runtime.onMessage.addListener((message:any,sender:any,reply:(value:any)=>void)=>{
    if (typeof message?.type!=='string' || !message.type.startsWith('ai-schedule:')) return;
    if (sender.id!==chrome.runtime.id || !String(sender.url||'').startsWith(chrome.runtime.getURL(''))) { reply({ok:false,error:'无权操作定时任务'}); return; }
    const action=message.type.slice('ai-schedule:'.length);
    const operation=action==='list'?listAiSchedules():action==='create'?createAiSchedule(message.input):['pause','resume','delete'].includes(action)?changeAiSchedule(action as 'pause'|'resume'|'delete',message.id):Promise.reject(new Error('未知操作'));
    void operation.then(result=>reply({ok:true,result})).catch(error=>reply({ok:false,error:error instanceof Error?error.message:'操作未确认'}));
    return true;
  });
  chrome.alarms.onAlarm.addListener((alarm:any)=>{ if(alarm?.name===ALARM) void runDueAiSchedules().catch(()=>console.warn('[AI schedule] Execution not confirmed.')); });
  // On worker restart, in-flight requests may already have reached the remote service.
  void serial(async()=>{
    const all=await read();
    for(const item of all) if(item.state==='running') { item.state='unknown'; item.lastResult='后台已重启，结果未确认；未自动重试。'; if (item.runId) item.notificationPending={runId:item.runId,outcome:'unknown'}; }
    await write(all); await arm(all);
  }).then(()=>flushNotifications()).catch(()=>console.warn('[AI schedule] Restore not confirmed.'));
}
