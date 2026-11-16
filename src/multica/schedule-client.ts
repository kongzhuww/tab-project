export class ScheduleBackendUnavailable extends Error {
  constructor() { super('未收到定时后台的确认。请在扩展管理页重新加载扩展并刷新页面；操作结果未确认，请勿重复提交。'); this.name='ScheduleBackendUnavailable'; }
}
/** Never repeat a write: the background may have committed it before the connection failed. */
export async function callScheduleBackend(runtime:any, action:string, fields:Record<string,unknown>={}):Promise<unknown> {
  if (!runtime?.sendMessage) throw new ScheduleBackendUnavailable();
  let reply:any;
  try { reply=await runtime.sendMessage({type:`ai-schedule:${action}`,...fields}); }
  catch { throw new ScheduleBackendUnavailable(); }
  if (!reply || typeof reply.ok !== 'boolean') throw new ScheduleBackendUnavailable();
  if (!reply.ok) throw new Error(typeof reply.error === 'string' && reply.error ? reply.error : '后台拒绝操作，结果未确认，请先检查任务列表。');
  return reply.result;
}
