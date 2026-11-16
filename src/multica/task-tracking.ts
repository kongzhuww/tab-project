import type { MulticaRun } from '../services/multica.service';
export interface TrackedMulticaTask {
  id:string; workspaceId:string; issueId:string; title:string; knownRunIds:string[];
  createdAt:number; failures:number; retryAt:number;
}
export function classifyRun(run: MulticaRun): 'success' | 'error' | null {
  const status = String(run.status || '').toLowerCase();
  if (['failed','error','timed_out','timeout'].includes(status) || (['completed','succeeded','success'].includes(status) && Boolean(run.error))) return 'error';
  if (['completed','succeeded','success'].includes(status)) return 'success';
  return null;
}
export function trackedRun(task: TrackedMulticaTask, runs: MulticaRun[]): MulticaRun | undefined {
  const known = new Set(task.knownRunIds);
  return runs.filter(run => typeof run.id === 'string' && !known.has(run.id))
    .sort((a,b) => String(a.created_at || a.started_at || '').localeCompare(String(b.created_at || b.started_at || '')))[0];
}
export function trackingDelay(failures:number):number { return Math.min(60 * 60 * 1000, 2 * 60 * 1000 * 2 ** Math.min(Math.max(0,failures - 1), 5)); }
