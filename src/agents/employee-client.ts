import type { DigitalEmployee, EmployeeRunRecord } from './employee-contract';

export class EmployeeBackendUnavailable extends Error {
  constructor(message = '扩展后台服务暂不可用，请刷新扩展页面后重试。') {
    super(message);
    this.name = 'EmployeeBackendUnavailable';
  }
}

export async function callEmployeeBackend<T = unknown>(
  runtime: { sendMessage(message: any): Promise<any> } | null | undefined,
  action: string,
  fields: Record<string, unknown> = {}
): Promise<T> {
  if (!runtime?.sendMessage) {
    throw new EmployeeBackendUnavailable();
  }
  let reply: any;
  try {
    reply = await runtime.sendMessage({ type: `employee:${action}`, ...fields });
  } catch {
    throw new EmployeeBackendUnavailable();
  }
  if (!reply || typeof reply !== 'object') {
    throw new EmployeeBackendUnavailable();
  }
  if (!reply.ok) {
    throw new Error(typeof reply.error === 'string' && reply.error ? reply.error : '后台数字员工操作未确认。');
  }
  return reply.result as T;
}

export interface EmployeeSnapshotResult {
  employees: DigitalEmployee[];
  runs: EmployeeRunRecord[];
  workerStamp?: string;
}
