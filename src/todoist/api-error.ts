export type TodoistErrorKind = 'configuration' | 'auth' | 'rate-limit' | 'not-found' | 'network' | 'timeout' | 'cancelled' | 'invalid-response' | 'http';
export class TodoistApiError extends Error {
  constructor(public readonly kind: TodoistErrorKind, public readonly status?: number,
    public readonly retryAfterMs?: number, public readonly submitted = false) {
    super(todoistErrorText({ kind, status, retryAfterMs }));
    this.name = kind === 'cancelled' ? 'AbortError' : 'TodoistApiError';
  }
}
export function retryAfterMs(value: string | null, now = Date.now()): number {
  if (!value) return 60000;
  const numeric = Number(value);
  const delay = Number.isFinite(numeric) ? numeric * 1000 : Date.parse(value) - now;
  return Number.isFinite(delay) ? Math.max(1000, delay) : 60000;
}
export function todoistHttpError(response: Response, submitted = false): TodoistApiError {
  const status = response.status;
  return new TodoistApiError(status === 401 || status === 403 ? 'auth' : status === 429 ? 'rate-limit' :
    status === 404 || status === 410 ? 'not-found' : 'http', status,
    status === 429 ? retryAfterMs(response.headers.get('retry-after')) : undefined, submitted);
}
export function todoistErrorText(error: unknown): string {
  const item = error as Partial<TodoistApiError> | undefined;
  switch (item?.kind) {
    case 'configuration': return 'Todoist 配置不可用，请检查账号设置。';
    case 'auth': return 'Todoist 账号或权限不可用，请检查账号设置。';
    case 'rate-limit': return `Todoist 请求受限，请约 ${Math.ceil((item.retryAfterMs || 60000) / 1000)} 秒后手动刷新；未自动重试。`;
    case 'not-found': return 'Todoist 资源不存在或接口不可用，请在 Todoist 中核对；未删除本机关联。';
    case 'timeout': return 'Todoist 请求超时，请检查网络后手动核对。';
    case 'cancelled': return 'Todoist 读取已取消。';
    case 'invalid-response': return 'Todoist 返回的数据格式异常，请稍后刷新。';
    case 'network': return 'Todoist 网络连接失败，请检查网络后重试读取。';
    case 'http': return `Todoist 请求失败${item.status ? `（HTTP ${item.status}）` : ''}，请稍后核对。`;
    default: return 'Todoist 读取失败，请手动刷新核对。';
  }
}
