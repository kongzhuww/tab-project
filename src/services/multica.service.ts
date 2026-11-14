// Multica Cloud integration. Credentials persist in extension local storage;
// they are excluded from ordinary unencrypted settings backups.
declare const chrome: any;

const BASE = "https://api.multica.ai";
const KEY = "multicaSessionV1";
const PERSISTENT_KEY = "multicaCredentialV1";
export interface MulticaWorkspace { id: string; name: string; slug?: string }
export interface MulticaRuntime { id: string; name: string; status: string; provider?: string; device_info?: string }
export interface MulticaAgent { id: string; name: string; runtime_id?: string; model?: string; archived_at?: string | null; runtime_bound?: boolean }
export interface MulticaIssue { id: string; identifier?: string; title: string; description?: string; status?: string; status_category?: string; assignee_id?: string | null; assignee_type?: string | null; revision?: number; updated_at?: string }
export interface MulticaComment { id: string; content: string; author_type?: string; author_id?: string; created_at?: string }
export interface MulticaRun { id: string; status: string; created_at?: string; started_at?: string; error?: string | null }
export interface MulticaRunMessage { seq?: number; type?: string; tool?: string; content?: unknown; input?: unknown; output?: unknown; created_at?: string }
interface Session { token: string; workspaceId: string }

function localStorageArea(): any {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) throw new Error('需要在扩展中使用 Multica');
  return chrome.storage.local;
}
export function validMulticaCredential(value: unknown): value is Session {
  const item = value as Partial<Session> | null;
  return Boolean(item && typeof item.token === 'string' && item.token.trim() && typeof item.workspaceId === 'string' && item.workspaceId.trim());
}
async function withCredentialLock<T>(action: () => Promise<T>): Promise<T> {
  const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined;
  return locks ? await locks.request('tab-project:multica-credentials', action) : await action();
}
async function session(): Promise<Session | null> {
  const local = localStorageArea();
  const value = (await local.get(PERSISTENT_KEY))[PERSISTENT_KEY];
  if (value !== undefined) return validMulticaCredential(value) ? value : null;
  const legacy = chrome.storage?.session;
  if (!legacy) return null;
  if (legacy.setAccessLevel) await legacy.setAccessLevel({ accessLevel: 'TRUSTED_CONTEXTS' });
  const previous = (await legacy.get(KEY))[KEY];
  if (!validMulticaCredential(previous)) return null;
  // Migration is cross-context serialized with disconnect. Without Web Locks,
  // keep the legacy session rather than risk resurrecting a logged-out token.
  if (typeof navigator === 'undefined' || !navigator.locks) return previous;
  return withCredentialLock(async () => {
    const current = (await local.get(PERSISTENT_KEY))[PERSISTENT_KEY];
    if (current !== undefined) return validMulticaCredential(current) ? current : null;
    const live = (await legacy.get(KEY))[KEY];
    if (!validMulticaCredential(live)) return null;
    await local.set({ [PERSISTENT_KEY]: live });
    await legacy.remove(KEY);
    return live;
  });
}
export class MulticaRequestError extends Error {
  constructor(message: string, public status?: number, public retryAfterMs?: number) { super(message); this.name = 'MulticaRequestError'; }
}

async function request<T>(token: string, path: string, workspaceId?: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, Accept: "application/json" };
  if (workspaceId) headers["X-Workspace-ID"] = workspaceId;
  if (init.body) headers["Content-Type"] = "application/json";
  let response: Response | undefined;
  const isWrite = Boolean(init.method && init.method.toUpperCase() !== "GET");
  // Writes may already have succeeded; only transient GET failures get one retry.
  for (let attempt = 0; attempt < (isWrite ? 1 : 2); attempt++) {
    try {
      response = await fetch(`${BASE}${path}`, { ...init, headers, redirect: "error", credentials: "omit", signal: AbortSignal.timeout(isWrite ? 25000 : 10000) });
      if (!isWrite && attempt === 0 && [502, 503, 504].includes(response.status)) {
        void response.body?.cancel().catch(() => {});
        response = undefined;
      } else break;
    } catch {
      if (attempt === (isWrite ? 0 : 1)) {
        throw new MulticaRequestError(isWrite
          ? "连接中断或超时，操作可能已经成功。请先到 Multica 检查，避免重复提交。"
          : "连接 Multica 失败或超时，请检查浏览器网络和代理后重试。此错误不代表令牌无效。");
      }
    }
    await new Promise(resolve => setTimeout(resolve, 600 + Math.floor(Math.random() * 400)));
  }
  if (!response) throw new Error("连接 Multica 失败，请检查网络后重试。");
  if (!response.ok) {
    if (response.status === 401) throw new MulticaRequestError("Multica 令牌无效或已过期（HTTP 401），请在 Multica 设置中检查令牌。", 401);
    if (response.status === 403) throw new MulticaRequestError("Multica 拒绝访问（HTTP 403），请检查账号和工作区权限。", 403);
    const retryAfter = response.headers.get('retry-after');
    const seconds = retryAfter && /^\d+$/.test(retryAfter) ? Number(retryAfter) * 1000 : retryAfter ? Date.parse(retryAfter) - Date.now() : NaN;
    const retryAfterMs = Number.isFinite(seconds) ? Math.max(0, seconds) : undefined;
    throw new MulticaRequestError(`Multica 请求失败（HTTP ${response.status}）。${isWrite ? "请先检查操作是否已生效，避免重复提交。" : "请稍后重试。"}`, response.status, retryAfterMs);
  }
  try { return await response.json() as T; }
  catch { throw new Error(init.method === "POST" ? "服务器响应无法确认；请先到 Multica 检查操作是否已生效，避免重复提交。" : "Multica 返回的数据无法解析"); }
}
function array<T>(data: unknown, label: string): T[] {
  if (!Array.isArray(data)) throw new Error(`Multica 返回的${label}格式不受支持`);
  return data as T[];
}
export const multicaService = {
  async workspaces(token: string): Promise<MulticaWorkspace[]> {
    if (!token.trim()) throw new Error("请填写 Multica 个人访问令牌");
    return array(await request(token.trim(), "/api/workspaces"), "工作区");
  },
  async connect(token: string, workspaceId: string): Promise<void> {
    const clean = token.trim();
    const list = await this.workspaces(clean);
    if (!list.some(w => w.id === workspaceId)) throw new Error("请选择有效的工作区");
    await withCredentialLock(async () => {
      const local = localStorageArea();
      await local.set({ [PERSISTENT_KEY]: { token: clean, workspaceId } });
      if (chrome.storage?.session) await chrome.storage.session.remove(KEY);
    });
  },
  async disconnect(): Promise<void> {
    await withCredentialLock(async () => {
      const local = localStorageArea();
      if (chrome.storage?.session) await chrome.storage.session.remove(KEY);
      await local.remove(PERSISTENT_KEY);
    });
  },
  async isConnected(): Promise<boolean> { return Boolean(await session()); },
  /** Only call inside an encrypted backup; never include in ordinary exports. */
  async credentialForEncryptedBackup(): Promise<Session | null> { return session(); },
  async restoreEncryptedCredential(value: unknown): Promise<'restored' | 'kept'> {
    if (!validMulticaCredential(value)) throw new Error('加密备份中的 Multica 连接格式无效');
    return withCredentialLock(async () => {
      const local = localStorageArea();
      const current = (await local.get(PERSISTENT_KEY))[PERSISTENT_KEY];
      const legacy = chrome.storage?.session ? (await chrome.storage.session.get(KEY))[KEY] : undefined;
      if (current !== undefined || legacy !== undefined) return 'kept';
      await local.set({ [PERSISTENT_KEY]: { token:value.token, workspaceId:value.workspaceId } });
      return 'restored';
    });
  },
  async info(includeArchived = false): Promise<{ workspaceId: string; runtimes: MulticaRuntime[]; agents: MulticaAgent[] }> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    const [runtimes, agents] = await Promise.all([
      request<unknown>(current.token, "/api/runtimes", current.workspaceId),
      request<unknown>(current.token, includeArchived ? "/api/agents?include_archived=true" : "/api/agents", current.workspaceId)
    ]);
    return { workspaceId: current.workspaceId, runtimes: array(runtimes, "运行时"), agents: array(agents, "智能体") };
  },
  async archiveAgent(agentId: string): Promise<void> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!agentId) throw new Error("缺少智能体编号");
    await request<unknown>(current.token, `/api/agents/${encodeURIComponent(agentId)}/archive`, current.workspaceId, { method: "POST" });
  },
  async restoreAgent(agentId: string): Promise<void> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!agentId) throw new Error("缺少智能体编号");
    await request<unknown>(current.token, `/api/agents/${encodeURIComponent(agentId)}/restore`, current.workspaceId, { method: "POST" });
  },
  async issues(): Promise<MulticaIssue[]> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    const data = await request<{ issues?: unknown }>(current.token, "/api/issues?limit=50&sort=updated_at&direction=desc", current.workspaceId);
    return array<MulticaIssue>(data?.issues, "任务");
  },
  async issueRuns(issueId: string): Promise<MulticaRun[]> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!issueId) throw new Error("缺少任务编号");
    return array<MulticaRun>(await request(current.token, `/api/issues/${encodeURIComponent(issueId)}/task-runs`, current.workspaceId), "运行记录");
  },
  async runMessages(runId: string): Promise<MulticaRunMessage[]> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!runId) throw new Error("缺少运行编号");
    return array<MulticaRunMessage>(await request(current.token, `/api/tasks/${encodeURIComponent(runId)}/messages`, current.workspaceId), "执行记录");
  },
  async issueComments(issueId: string): Promise<MulticaComment[]> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!issueId) throw new Error("缺少任务编号");
    return array<MulticaComment>(await request(current.token, `/api/issues/${encodeURIComponent(issueId)}/comments`, current.workspaceId), "评论");
  },
  async switchIssueAgent(issueId: string, expectedAssigneeId: string | null, agentId: string): Promise<MulticaIssue> {
    const current = await session();
    if (!current) throw new Error('请先连接 Multica');
    if (!issueId || !agentId) throw new Error('缺少会话或助手编号');
    const latest = await request<MulticaIssue>(current.token, `/api/issues/${encodeURIComponent(issueId)}`, current.workspaceId);
    if (!latest || latest.id !== issueId || !Number.isSafeInteger(latest.revision) || Number(latest.revision) < 1) throw new Error('无法确认会话版本；未切换助手，请刷新后重试。');
    if ((latest.assignee_id || null) !== expectedAssigneeId) throw new Error('会话负责人已在其他地方改变；未切换，请刷新后确认。');
    const updated = await request<MulticaIssue>(current.token, `/api/issues/${encodeURIComponent(issueId)}`, current.workspaceId, {
      method: 'PUT', body: JSON.stringify({ assignee_type:'agent', assignee_id:agentId, expected_revision:latest.revision, suppress_run:true })
    });
    if (!updated || updated.id !== issueId || updated.assignee_id !== agentId || updated.assignee_type !== 'agent') throw new Error('切换结果无法确认；请刷新会话或到 Multica 核对，避免重复操作。');
    return updated;
  },
  async renameIssue(issueId: string, title: string): Promise<void> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!issueId || !title.trim()) throw new Error("缺少任务编号或标题");
    await request<unknown>(current.token, `/api/issues/${encodeURIComponent(issueId)}`, current.workspaceId, {
      method: "PUT", body: JSON.stringify({ title: title.trim() })
    });
  },
  async addIssueComment(issueId: string, content: string): Promise<void> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!issueId || !content.trim()) throw new Error("请填写消息");
    await request<unknown>(current.token, `/api/issues/${encodeURIComponent(issueId)}/comments`, current.workspaceId, {
      method: "POST", body: JSON.stringify({ content: content.trim(), type: "comment" })
    });
  },
  async createIssue(title: string, description: string, agentId: string): Promise<{ id: string; identifier?: string }> {
    const current = await session();
    if (!current) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!title.trim() || !description.trim() || !agentId) throw new Error("请填写任务并选择智能体");
    const result = await request<{ id?: unknown; identifier?: unknown }>(current.token, "/api/issues", current.workspaceId, {
      method: "POST", body: JSON.stringify({ title: title.trim(), description, assignee_type: "agent", assignee_id: agentId })
    });
    if (!result || typeof result.id !== "string") throw new Error("服务器返回结果无法确认；请先到 Multica 检查是否已创建，避免重复提交。");
    return { id: result.id, identifier: typeof result.identifier === "string" ? result.identifier : undefined };
  }
};
