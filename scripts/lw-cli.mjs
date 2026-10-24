#!/usr/bin/env node
/**
 * LogicWeaver CLI (lw-cli.mjs)
 * 集成本机 127.0.0.1:19826 长轮询 Broker 守护进程与命令行控制客户端
 *
 * 用法示例:
 *   node scripts/lw-cli.mjs status
 *   node scripts/lw-cli.mjs nav bilibili
 *   node scripts/lw-cli.mjs nav home
 *   node scripts/lw-cli.mjs inspect "#card-github .card-fullscreen-cube-host" "#card-github .card-fullscreen-gh-search"
 *   node scripts/lw-cli.mjs search "github" --scope bookmarks
 *   node scripts/lw-cli.mjs todoist view projects
 *   node scripts/lw-cli.mjs launcher list
 *   node scripts/lw-cli.mjs sync status
 *   node scripts/lw-cli.mjs sync webdav-push
 *   node scripts/lw-cli.mjs reload
 */

import http from "node:http";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import path from "node:path";
import { existsSync } from "node:fs";

const PORT = 19826;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

// ============================================================================
// 1. Broker Daemon 模式 (127.0.0.1:19826)
// ============================================================================
function startDaemon() {
  /** @type {Map<string, { clientId: string, role: string, url: string, title: string, active: boolean, lastSeen: number, res: http.ServerResponse | null }>} */
  const clients = new Map();
  /** @type {Array<{ requestId: string, targetRole: string, command: any, assignedClientId?: string }>} */
  const commandQueue = [];
  /** @type {Map<string, { resolve: (val: any) => void, timer: NodeJS.Timeout }>} */
  const pendingReplies = new Map();

  function readJson(req) {
    return new Promise((resolve) => {
      let body = "";
      req.on("data", (chunk) => { body += chunk; });
      req.on("end", () => {
        try { resolve(body ? JSON.parse(body) : {}); }
        catch { resolve({}); }
      });
    });
  }

  function sendJson(res, status, data) {
    if (res.writableEnded) return;
    const payload = JSON.stringify(data);
    res.writeHead(status, {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end(payload);
  }

  function pickBestClient(role) {
    const now = Date.now();
    const candidates = [];
    for (const c of clients.values()) {
      if (now - c.lastSeen > 30000) continue;
      if (c.role === role) candidates.push(c);
    }
    if (!candidates.length) return null;
    // 优先选正在挂起等待响应且处于 active 的页面（优先 newtab.html）
    candidates.sort((a, b) => {
      if (Boolean(a.res) !== Boolean(b.res)) return a.res ? -1 : 1;
      const aIsNewtab = (a.url || "").includes("newtab.html");
      const bIsNewtab = (b.url || "").includes("newtab.html");
      if (aIsNewtab !== bIsNewtab) return aIsNewtab ? -1 : 1;
      if (a.active !== b.active) return a.active ? -1 : 1;
      return b.lastSeen - a.lastSeen;
    });
    return candidates[0];
  }

  function flushQueue() {
    for (let i = 0; i < commandQueue.length; i++) {
      const item = commandQueue[i];
      const client = pickBestClient(item.targetRole);
      if (client && client.res && !client.res.writableEnded) {
        const res = client.res;
        client.res = null;
        commandQueue.splice(i, 1);
        i--;
        sendJson(res, 200, {
          requestId: item.requestId,
          command: item.command
        });
      }
    }
  }

  const server = http.createServer(async (req, res) => {
    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    const url = new URL(req.url || "/", BASE_URL);

    if (url.pathname === "/health") {
      const now = Date.now();
      const activeClients = [];
      for (const c of clients.values()) {
        if (now - c.lastSeen <= 25000) {
          activeClients.push({
            clientId: c.clientId,
            role: c.role,
            url: c.url,
            title: c.title,
            active: c.active,
            polling: Boolean(c.res),
            ageMs: now - c.lastSeen
          });
        }
      }
      sendJson(res, 200, {
        ok: true,
        pid: process.pid,
        port: PORT,
        clientsCount: activeClients.length,
        clients: activeClients
      });
      return;
    }

    if (url.pathname === "/qq/start-main" && req.method === "POST") {
      sendJson(res, 409, { ok: false, message: "Legacy QQ start is disabled; use the account-bound Native Messaging owner protocol" });
      return;
    }

    if (url.pathname === "/qq/stop-main" && req.method === "POST") {
      // No legacy script fallback: use the origin-restricted Native Host main-stop protocol.
      sendJson(res, 409, { ok: false, message: "Legacy QQ stop is disabled; use verified qq-stop-main Native Messaging" });
      return;
    }

    if (url.pathname === "/poll" && req.method === "POST") {
      const meta = await readJson(req);
      const clientId = String(meta.clientId || "unknown");
      const prev = clients.get(clientId);
      if (prev && prev.res && !prev.res.writableEnded) {
        sendJson(prev.res, 200, { idle: true });
      }

      const record = {
        clientId,
        role: meta.role || "page",
        url: meta.url || "",
        title: meta.title || "",
        active: Boolean(meta.active),
        lastSeen: Date.now(),
        res
      };
      clients.set(clientId, record);

      const timeout = setTimeout(() => {
        if (record.res === res) {
          record.res = null;
          sendJson(res, 200, { idle: true });
        }
      }, 18000);

      req.on("close", () => {
        clearTimeout(timeout);
        if (record.res === res) {
          record.res = null;
        }
      });

      flushQueue();
      return;
    }

    if (url.pathname === "/reply" && req.method === "POST") {
      const body = await readJson(req);
      const requestId = String(body.requestId || "");
      const pending = pendingReplies.get(requestId);
      if (pending) {
        clearTimeout(pending.timer);
        pendingReplies.delete(requestId);
        pending.resolve(body);
      }
      sendJson(res, 200, { ok: true });
      return;
    }

    if (url.pathname === "/exec" && req.method === "POST") {
      const body = await readJson(req);
      const targetRole = body.targetRole || "page";
      const command = body.command;
      const timeoutMs = Number(body.timeoutMs || 8000);

      // 若目标是 page，但当前没有任何活跃 page 客户端，且存在 background 客户端，则自动请 background 唤醒/打开 newtab.html
      if (targetRole === "page" && !pickBestClient("page") && pickBestClient("background")) {
        const openReqId = crypto.randomUUID();
        await new Promise((resolve) => {
          const t = setTimeout(() => {
            pendingReplies.delete(openReqId);
            resolve(null);
          }, 3000);
          pendingReplies.set(openReqId, { resolve, timer: t });
          commandQueue.push({
            requestId: openReqId,
            targetRole: "background",
            command: { action: "bg-open-tab", params: { page: "newtab.html" } }
          });
          flushQueue();
        });
        // 等待新打开的页面建立长轮询
        for (let w = 0; w < 15; w++) {
          if (pickBestClient("page")) break;
          await new Promise((r) => setTimeout(r, 150));
        }
      }

      if (!pickBestClient(targetRole)) {
        sendJson(res, 200, {
          ok: false,
          error: `当前没有已连接的插件 ${targetRole} 客户端。请确保在 Edge 中已重新加载插件并打开了新标签页。`
        });
        return;
      }

      const requestId = crypto.randomUUID();
      const reply = await new Promise((resolve) => {
        const timer = setTimeout(() => {
          pendingReplies.delete(requestId);
          const idx = commandQueue.findIndex((q) => q.requestId === requestId);
          if (idx !== -1) commandQueue.splice(idx, 1);
          resolve({ ok: false, error: `等待插件响应超时 (${timeoutMs}ms)` });
        }, timeoutMs);

        pendingReplies.set(requestId, { resolve, timer });
        commandQueue.push({ requestId, targetRole, command });
        flushQueue();
      });

      sendJson(res, 200, reply);
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found" });
  });

  server.listen(PORT, HOST, () => {
    // 守护进程就绪
  });
}

// ============================================================================
// 2. CLI 客户端模式
// ============================================================================
async function fetchBroker(path, method = "GET", body = undefined) {
  const resp = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  return await resp.json();
}

async function ensureDaemonRunning() {
  try {
    const health = await fetchBroker("/health");
    if (health?.ok) return health;
  } catch {}

  const scriptPath = fileURLToPath(import.meta.url);
  const child = spawn(process.execPath, [scriptPath, "--daemon"], {
    detached: true,
    stdio: "ignore",
    windowsHide: true
  });
  child.unref();

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 150));
    try {
      const health = await fetchBroker("/health");
      if (health?.ok) return health;
    } catch {}
  }
  throw new Error("无法启动本机 CLI Broker 守护进程 (127.0.0.1:19826)");
}

async function sendCommand(targetRole, action, params = {}, timeoutMs = 8000) {
  await ensureDaemonRunning();
  return await fetchBroker("/exec", "POST", {
    targetRole,
    command: { action, params },
    timeoutMs
  });
}

function parseFlags(args) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(a);
    }
  }
  return { positional, flags };
}

async function runCli() {
  const rawArgs = process.argv.slice(2);
  if (rawArgs.includes("--daemon")) {
    startDaemon();
    return;
  }

  const { positional, flags } = parseFlags(rawArgs);
  const cmd = (positional[0] || "status").toLowerCase();

  if (cmd === "daemon" || cmd === "serve") {
    const health = await ensureDaemonRunning();
    console.log(JSON.stringify({ message: "LogicWeaver CLI Broker 守护服务已在后台运行", ...health }, null, 2));
    return;
  }

  if (cmd === "health" || cmd === "clients") {
    const health = await ensureDaemonRunning();
    console.log(JSON.stringify(health, null, 2));
    return;
  }

  if (cmd === "status") {
    const health = await ensureDaemonRunning();
    const bgRes = health.clients.some((c) => c.role === "background")
      ? await sendCommand("background", "bg-status")
      : null;
    const pageRes = await sendCommand("page", "status");
    console.log(JSON.stringify({
      broker: { port: health.port, clientsCount: health.clientsCount, clients: health.clients },
      background: bgRes?.result || bgRes,
      page: pageRes?.result || pageRes
    }, null, 2));
    return;
  }

  if (cmd === "nav" || cmd === "open") {
    const target = positional[1] || "home";
    const res = await sendCommand("page", "nav", { target });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "inspect") {
    const selector = positional[1] || "body";
    const compareSelector = positional[2] || flags.compare || undefined;
    const res = await sendCommand("page", "inspect", { selector, compareSelector });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "search") {
    const query = positional[1];
    const res = await sendCommand("page", "search", {
      query,
      mode: flags.mode,
      scope: flags.scope,
      submit: Boolean(flags.submit)
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "bookmarks" || cmd === "bookmark") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "bookmarks", {
      sub,
      query: positional[2] || flags.query,
      state: positional[2] || flags.state
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "bili" || cmd === "bilibili") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "bili", {
      sub,
      mode: positional[2] || flags.mode,
      folderId: flags.folder || flags.folderId || flags.fid || positional[2],
      seriesId: flags.series || flags.seriesId || positional[2],
      bvid: flags.bvid || positional[2],
      aid: flags.aid || positional[2],
      cid: flags.cid || positional[3],
      page: flags.page || flags.pn || (positional[3] !== undefined && !isNaN(Number(positional[3])) ? Number(positional[3]) : undefined),
      pageSize: flags.pageSize || flags.ps || flags.size,
      order: flags.order,
      sort: flags.sort,
      rootRpid: flags.root || flags.rootRpid,
      index: positional[3] !== undefined ? Number(positional[3]) : (positional[2] !== undefined ? Number(positional[2]) : flags.index),
      percent: positional[2] !== undefined ? Number(positional[2]) : flags.percent
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "github" || cmd === "gh") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "github", {
      sub,
      category: positional[2] || flags.category,
      query: positional[2] || flags.query,
      fullName: positional[2] || flags.fullName || flags.repo,
      scope: flags.scope
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "obsidian" || cmd === "notes") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "obsidian", {
      sub,
      key: positional[2] || flags.key
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "music") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "music", { sub });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "diagnose-loading" || cmd === "diag") {
    const res = await sendCommand("page", "diagnose-loading");
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "eval") {
    const code = positional.slice(1).join(" ") || flags.code;
    const res = await sendCommand("page", "eval", { code });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "pet-debug") {
    const res = await sendCommand("page", "pet-debug");
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "launcher") {
    const sub = positional[1] || "list";
    const res = await sendCommand("page", "launcher", {
      sub,
      id: flags.id || (sub !== "add" ? positional[2] : undefined),
      title: flags.title || (sub === "add" ? positional[2] : positional[3]),
      url: flags.url || (sub === "add" ? positional[3] : positional[4]),
      note: flags.note,
      group: flags.group || (sub === "add" ? positional[4] : undefined),
      page: flags.page || positional[2],
      from: flags.from || positional[2],
      to: flags.to || positional[3]
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "mascot") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "mascot", {
      sub,
      args: positional.slice(1)
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "youtube" || cmd === "yt") {
    const sub = positional[1] || "status";
    const category = flags.category || positional[2];
    const res = await sendCommand("page", "youtube", { sub, category }, 35000);
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "qq") {
    const sub = positional[1] || "status";
    if (sub === "msgs" || sub === "messages") {
      const res = await sendCommand("page", "qq-messages");
      console.log(JSON.stringify(res, null, 2));
      return;
    }
  }

  if (cmd === "todoist") {
    const sub = positional[1] || "status";
    const arg = positional[2];
    const res = await sendCommand("page", "todoist", {
      sub,
      view: sub === "view" ? arg : flags.view,
      projectId: sub === "project" ? arg : flags.project
    });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "sync") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "sync", { sub }, 15000);
    console.log(JSON.stringify(res, null, 2));
    return;
  }


  if (cmd === "dock") {
    const sub = positional[1] || "list";
    const id = positional[2] || flags.id;
    const res = await sendCommand("page", "dock", { sub, id });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "monitor") {
    const sub = positional[1] || "status";
    const res = await sendCommand("page", "monitor", { sub });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "click") {
    const selector = positional[1];
    const res = await sendCommand("page", "dom", { sub: "click", selector });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "drag") {
    const selector = positional[1];
    const dx = Number(positional[2] || flags.dx || 100);
    const dy = Number(positional[3] || flags.dy || 100);
    const res = await sendCommand("page", "dom", { sub: "drag", selector, dx, dy });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "contextmenu") {
    const selector = positional[1];
    const res = await sendCommand("page", "dom", { sub: "contextmenu", selector });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "input") {
    const selector = positional[1];
    const value = positional[2] ?? "";
    const res = await sendCommand("page", "dom", { sub: "input", selector, value });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "text") {
    const selector = positional[1];
    const res = await sendCommand("page", "dom", { sub: "text", selector });
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  if (cmd === "reload") {
    const health = await ensureDaemonRunning();
    if (health.clients.some((c) => c.role === "background")) {
      const res = await sendCommand("background", "bg-reload-pages");
      console.log(JSON.stringify(res, null, 2));
    } else {
      const res = await sendCommand("page", "reload");
      console.log(JSON.stringify(res, null, 2));
    }
    return;
  }

  if (cmd === "reload-ext") {
    const res = await sendCommand("background", "bg-reload-ext");
    console.log(JSON.stringify(res, null, 2));
    return;
  }

  console.log(`LogicWeaver CLI (lw-cli)
可用命令:
  status                                    查看插件连接、后台与当前页面完整状态
  nav <home|bilibili|github|youtube|aihot|pricing|todoist|obsidian|settings>
  inspect <selector> [compareSelector]      测量元素坐标/尺寸/样式，以及双元素间距与重叠检测
  search [query] [--mode ...] [--scope all|bookmarks|launcher] [--submit]
  launcher <list|add|rename|delete> ...     查看或操作首页常用网站
  bili <list-folders|list-videos|video-info|video-subtitles|video-comments|comment-replies>
                                            B站只读数据通道（供 Agent 提取收藏、字幕与评论）
  dock <list|modules|open|hide|reload|quit> [appId] 列出内置模块元数据，或控制 Dock 运行/可见状态与重启/退出
  monitor [status|diagnose]                 查看双端(Mac + Win)与各容器链路健康诊断快照
  eval <code>                               在页面上下文中远程执行 JS 表达式
  todoist <status|view|project|refresh>     控制 Todoist 看板并查看各列任务数
  sync <status|webdav-test|webdav-push|webdav-pull|cloud-push|cloud-pull>
  click <selector>                          点击页面任意元素
  input <selector> <value>                  向输入框输入内容并触发响应式绑定
  reload                                    自动刷新所有已打开的插件页面
  reload-ext                                热重载整个浏览器扩展`);
}

runCli().catch((err) => {
  console.error(JSON.stringify({ ok: false, error: err?.message || String(err) }, null, 2));
  process.exit(1);
});
