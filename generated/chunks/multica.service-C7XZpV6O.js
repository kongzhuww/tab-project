const k = "https://api.multica.ai", u = "multicaSessionV1", w = "multicaCredentialV1";
function h() {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("需要在扩展中使用 Multica");
  return chrome.storage.local;
}
function m(e) {
  const t = e;
  return !!(t && typeof t.token == "string" && t.token.trim() && typeof t.workspaceId == "string" && t.workspaceId.trim());
}
async function g(e) {
  const t = typeof navigator < "u" ? navigator.locks : void 0;
  return t ? await t.request("tab-project:multica-credentials", e) : await e();
}
async function i() {
  const e = h(), t = (await e.get(w))[w];
  if (t !== void 0) return m(t) ? t : null;
  const r = chrome.storage?.session;
  if (!r) return null;
  r.setAccessLevel && await r.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" });
  const o = (await r.get(u))[u];
  return m(o) ? typeof navigator > "u" || !navigator.locks ? o : g(async () => {
    const n = (await e.get(w))[w];
    if (n !== void 0) return m(n) ? n : null;
    const a = (await r.get(u))[u];
    return m(a) ? (await e.set({ [w]: a }), await r.remove(u), a) : null;
  }) : null;
}
class f extends Error {
  constructor(t, r, o) {
    super(t), this.status = r, this.retryAfterMs = o, this.name = "MulticaRequestError";
  }
}
async function s(e, t, r, o = {}) {
  const n = { Authorization: `Bearer ${e}`, Accept: "application/json" };
  r && (n["X-Workspace-ID"] = r), o.body && (n["Content-Type"] = "application/json");
  let a;
  const d = !!(o.method && o.method.toUpperCase() !== "GET");
  for (let c = 0; c < (d ? 1 : 2); c++) {
    try {
      if (a = await fetch(`${k}${t}`, { ...o, headers: n, redirect: "error", credentials: "omit", signal: AbortSignal.timeout(d ? 25e3 : 1e4) }), !d && c === 0 && [502, 503, 504].includes(a.status))
        a.body?.cancel().catch(() => {
        }), a = void 0;
      else break;
    } catch {
      if (c === (d ? 0 : 1))
        throw new f(d ? "连接中断或超时，操作可能已经成功。请先到 Multica 检查，避免重复提交。" : "连接 Multica 失败或超时，请检查浏览器网络和代理后重试。此错误不代表令牌无效。");
    }
    await new Promise((p) => setTimeout(p, 600 + Math.floor(Math.random() * 400)));
  }
  if (!a) throw new Error("连接 Multica 失败，请检查网络后重试。");
  if (!a.ok) {
    if (a.status === 401) throw new f("Multica 令牌无效或已过期（HTTP 401），请在 Multica 设置中检查令牌。", 401);
    if (a.status === 403) throw new f("Multica 拒绝访问（HTTP 403），请检查账号和工作区权限。", 403);
    const c = a.headers.get("retry-after"), p = c && /^\d+$/.test(c) ? Number(c) * 1e3 : c ? Date.parse(c) - Date.now() : NaN, y = Number.isFinite(p) ? Math.max(0, p) : void 0;
    throw new f(`Multica 请求失败（HTTP ${a.status}）。${d ? "请先检查操作是否已生效，避免重复提交。" : "请稍后重试。"}`, a.status, y);
  }
  try {
    return await a.json();
  } catch {
    throw new Error(o.method === "POST" ? "服务器响应无法确认；请先到 Multica 检查操作是否已生效，避免重复提交。" : "Multica 返回的数据无法解析");
  }
}
function l(e, t) {
  if (!Array.isArray(e)) throw new Error(`Multica 返回的${t}格式不受支持`);
  return e;
}
const E = {
  async workspaces(e) {
    if (!e.trim()) throw new Error("请填写 Multica 个人访问令牌");
    return l(await s(e.trim(), "/api/workspaces"), "工作区");
  },
  async connect(e, t) {
    const r = e.trim();
    if (!(await this.workspaces(r)).some((n) => n.id === t)) throw new Error("请选择有效的工作区");
    await g(async () => {
      await h().set({ [w]: { token: r, workspaceId: t } }), chrome.storage?.session && await chrome.storage.session.remove(u);
    });
  },
  async disconnect() {
    await g(async () => {
      const e = h();
      chrome.storage?.session && await chrome.storage.session.remove(u), await e.remove(w);
    });
  },
  async isConnected() {
    return !!await i();
  },
  /** Only call inside an encrypted backup; never include in ordinary exports. */
  async credentialForEncryptedBackup() {
    return i();
  },
  async restoreEncryptedCredential(e) {
    if (!m(e)) throw new Error("加密备份中的 Multica 连接格式无效");
    return g(async () => {
      const t = h(), r = (await t.get(w))[w], o = chrome.storage?.session ? (await chrome.storage.session.get(u))[u] : void 0;
      return r !== void 0 || o !== void 0 ? "kept" : (await t.set({ [w]: { token: e.token, workspaceId: e.workspaceId } }), "restored");
    });
  },
  async info(e = !1) {
    const t = await i();
    if (!t) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    const [r, o] = await Promise.all([
      s(t.token, "/api/runtimes", t.workspaceId),
      s(t.token, e ? "/api/agents?include_archived=true" : "/api/agents", t.workspaceId)
    ]);
    return { workspaceId: t.workspaceId, runtimes: l(r, "运行时"), agents: l(o, "智能体") };
  },
  async archiveAgent(e) {
    const t = await i();
    if (!t) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e) throw new Error("缺少智能体编号");
    await s(t.token, `/api/agents/${encodeURIComponent(e)}/archive`, t.workspaceId, { method: "POST" });
  },
  async restoreAgent(e) {
    const t = await i();
    if (!t) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e) throw new Error("缺少智能体编号");
    await s(t.token, `/api/agents/${encodeURIComponent(e)}/restore`, t.workspaceId, { method: "POST" });
  },
  async issues() {
    const e = await i();
    if (!e) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    const t = await s(e.token, "/api/issues?limit=50&sort=updated_at&direction=desc", e.workspaceId);
    return l(t?.issues, "任务");
  },
  async issueRuns(e) {
    const t = await i();
    if (!t) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e) throw new Error("缺少任务编号");
    return l(await s(t.token, `/api/issues/${encodeURIComponent(e)}/task-runs`, t.workspaceId), "运行记录");
  },
  async runMessages(e) {
    const t = await i();
    if (!t) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e) throw new Error("缺少运行编号");
    return l(await s(t.token, `/api/tasks/${encodeURIComponent(e)}/messages`, t.workspaceId), "执行记录");
  },
  async issueComments(e) {
    const t = await i();
    if (!t) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e) throw new Error("缺少任务编号");
    return l(await s(t.token, `/api/issues/${encodeURIComponent(e)}/comments`, t.workspaceId), "评论");
  },
  async switchIssueAgent(e, t, r) {
    const o = await i();
    if (!o) throw new Error("请先连接 Multica");
    if (!e || !r) throw new Error("缺少会话或助手编号");
    const n = await s(o.token, `/api/issues/${encodeURIComponent(e)}`, o.workspaceId);
    if (!n || n.id !== e || !Number.isSafeInteger(n.revision) || Number(n.revision) < 1) throw new Error("无法确认会话版本；未切换助手，请刷新后重试。");
    if ((n.assignee_id || null) !== t) throw new Error("会话负责人已在其他地方改变；未切换，请刷新后确认。");
    const a = await s(o.token, `/api/issues/${encodeURIComponent(e)}`, o.workspaceId, {
      method: "PUT",
      body: JSON.stringify({ assignee_type: "agent", assignee_id: r, expected_revision: n.revision, suppress_run: !0 })
    });
    if (!a || a.id !== e || a.assignee_id !== r || a.assignee_type !== "agent") throw new Error("切换结果无法确认；请刷新会话或到 Multica 核对，避免重复操作。");
    return a;
  },
  async renameIssue(e, t) {
    const r = await i();
    if (!r) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e || !t.trim()) throw new Error("缺少任务编号或标题");
    await s(r.token, `/api/issues/${encodeURIComponent(e)}`, r.workspaceId, {
      method: "PUT",
      body: JSON.stringify({ title: t.trim() })
    });
  },
  async addIssueComment(e, t) {
    const r = await i();
    if (!r) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e || !t.trim()) throw new Error("请填写消息");
    await s(r.token, `/api/issues/${encodeURIComponent(e)}/comments`, r.workspaceId, {
      method: "POST",
      body: JSON.stringify({ content: t.trim(), type: "comment" })
    });
  },
  async createIssue(e, t, r) {
    const o = await i();
    if (!o) throw new Error("请先在 Agent 工作台右上角设置中连接 Multica");
    if (!e.trim() || !t.trim() || !r) throw new Error("请填写任务并选择智能体");
    const n = await s(o.token, "/api/issues", o.workspaceId, {
      method: "POST",
      body: JSON.stringify({ title: e.trim(), description: t, assignee_type: "agent", assignee_id: r })
    });
    if (!n || typeof n.id != "string") throw new Error("服务器返回结果无法确认；请先到 Multica 检查是否已创建，避免重复提交。");
    return { id: n.id, identifier: typeof n.identifier == "string" ? n.identifier : void 0 };
  }
};
export {
  f as M,
  E as m,
  m as v
};
