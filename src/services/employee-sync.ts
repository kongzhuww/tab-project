import { isRecord, SyncBackupError } from './sync-payload';

/** Employee schedules are device-local. A backup never carries an active schedule. */
export function employeeBackup(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value) || value.some(item => !isRecord(item) || typeof item.id !== 'string')) {
    throw new SyncBackupError('数字员工配置格式无效，未生成不完整的备份');
  }
  return value.map(item => {
    const { lastRunAt, nextEligibleAt, lastError, ...config } = item;
    return { ...config, enabled: false };
  });
}

/** Existing employees keep their local run state; newly received employees start paused. */
export function employeesForRestore(incoming: unknown, local: unknown): Record<string, unknown>[] {
  const configs = employeeBackup(incoming);
  const previous = new Map((Array.isArray(local) ? local : []).filter(isRecord).map(item => [item.id, item]));
  return configs.map(item => {
    const old = previous.get(item.id);
    if (!old) return item;
    const restored: Record<string, unknown> = { ...item, enabled: old.enabled === true };
    for (const key of ['lastRunAt', 'nextEligibleAt', 'lastError']) {
      if (Object.hasOwn(old, key)) restored[key] = old[key];
    }
    return restored;
  });
}
