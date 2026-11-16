import type { AiSchedule, ScheduleState } from './schedule-contract';

export type ScheduleColumnId = 'pending' | 'running' | 'completed' | 'attention';
export const SCHEDULE_COLUMNS: readonly { id:ScheduleColumnId; title:string; description:string }[] = [
  { id:'pending', title:'等待执行', description:'按计划时间自动开始' },
  { id:'running', title:'执行中', description:'请求或派发正在进行' },
  { id:'completed', title:'已执行', description:'Multica 为已派发，并非结果已审核' },
  { id:'attention', title:'需处理', description:'已暂停、跳过或需要核对' }
];
export function scheduleColumn(state:ScheduleState):ScheduleColumnId {
  if (state === 'pending' || state === 'running' || state === 'completed') return state;
  return 'attention';
}
export function groupScheduleJobs(items:readonly AiSchedule[]):Record<ScheduleColumnId,AiSchedule[]> {
  const groups:Record<ScheduleColumnId,AiSchedule[]> = {pending:[],running:[],completed:[],attention:[]};
  for (const item of items) groups[scheduleColumn(item.state)].push(item);
  groups.pending.sort((a,b)=>a.runAt-b.runAt);
  groups.running.sort((a,b)=>(b.startedAt||b.runAt)-(a.startedAt||a.runAt));
  groups.completed.sort((a,b)=>b.runAt-a.runAt);
  groups.attention.sort((a,b)=>b.runAt-a.runAt);
  return groups;
}
export function scheduleStatusLabel(job:AiSchedule):string {
  if (job.state === 'completed' && job.provider === 'multica') return '已派发';
  const names:Record<ScheduleState,string>={pending:'等待执行',running:'执行中',completed:'已执行',failed:'失败 · 已停止',unknown:'结果未确认',paused:'已暂停',skipped:'已跳过'};
  return names[job.state];
}
