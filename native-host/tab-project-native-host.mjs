#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { accessSync, constants, mkdirSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const HOST_VERSION = '1.2.0';
export const PROTOCOL_VERSION = 1;
export const MAX_INCOMING_BYTES = 1024 * 1024;
export const MAX_OUTPUT_BYTES = 192 * 1024;
export const DEFAULT_TIMEOUT_MS = 20000;
export const MAX_TIMEOUT_MS = 300000;

export const BUILTIN_AGENTS = [
  { id: 'pi', name: 'Pi', bin: 'pi', protocol: 'pi-json', supportsModels: true },
  { id: 'claude', name: 'Claude Code', bin: 'claude', protocol: 'claude-json', supportsModels: false },
  { id: 'codex', name: 'Codex CLI', bin: 'codex', protocol: 'codex-json', supportsModels: false },
  { id: 'gemini', name: 'Gemini CLI (ACP)', bin: 'gemini', protocol: 'acp', acpArgs: ['--acp'], supportsModels: false },
  { id: 'opencode', name: 'OpenCode', bin: 'opencode', protocol: 'opencode-json', supportsModels: false },
  { id: 'claude-agent-acp', name: 'Claude ACP', bin: 'claude-agent-acp', protocol: 'acp', acpArgs: [], supportsModels: false },
  { id: 'codex-acp', name: 'Codex ACP', bin: 'codex-acp', protocol: 'acp', acpArgs: [], supportsModels: false },
];

/** Encode a JSON payload using Chrome Native Messaging 4-byte LE framing. */
export function encodeNativeMessage(payload) {
  const json = Buffer.from(JSON.stringify(payload), 'utf8');
  const header = Buffer.allocUnsafe(4);
  header.writeUInt32LE(json.length, 0);
  return Buffer.concat([header, json]);
}

/** Incrementally decode Chrome Native Messaging frames from a byte stream. */
export function createMessageDecoder(onMessage, onError) {
  let buffer = Buffer.alloc(0);
  return (chunk) => {
    buffer = buffer.length ? Buffer.concat([buffer, chunk]) : Buffer.from(chunk);
    while (buffer.length >= 4) {
      const length = buffer.readUInt32LE(0);
      if (length > MAX_INCOMING_BYTES) {
        onError(new Error(`Incoming message exceeds ${MAX_INCOMING_BYTES} bytes`));
        buffer = Buffer.alloc(0);
        return;
      }
      if (buffer.length < 4 + length) return;
      const body = buffer.subarray(4, 4 + length).toString('utf8');
      buffer = buffer.subarray(4 + length);
      try {
        onMessage(JSON.parse(body));
      } catch (err) {
        onError(err instanceof Error ? err : new Error('Invalid JSON payload'));
      }
    }
  };
}

export function resolveWorkingDirectory(rawCwd, baseCwd = os.homedir()) {
  const candidate = typeof rawCwd === 'string' && rawCwd.trim()
    ? rawCwd.trim().replace(/^~(?=$|[\\/])/, os.homedir())
    : baseCwd;
  const resolved = path.isAbsolute(candidate) ? path.normalize(candidate) : path.resolve(baseCwd, candidate);
  const info = statSync(resolved);
  if (!info.isDirectory()) throw new Error(`Target path is not a directory: ${resolved}`);
  return resolved;
}

function clampTimeout(value, fallback = DEFAULT_TIMEOUT_MS) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.max(1000, Math.min(MAX_TIMEOUT_MS, Math.floor(value)));
}

function isExecutableFile(filePath) {
  try {
    const stat = statSync(filePath);
    if (!stat.isFile()) return false;
    if (process.platform !== 'win32') accessSync(filePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export function buildAugmentedEnv() {
  const sep = process.platform === 'win32' ? ';' : ':';
  const home = os.homedir();
  const extraDirs = process.platform === 'win32'
    ? [
        path.dirname(process.execPath),
        path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'npm'),
        path.join(home, '.local', 'bin'),
      ]
    : [
        path.dirname(process.execPath),
        path.join(home, '.local', 'bin'),
        path.join(home, '.npm-global', 'bin'),
        path.join(home, '.volta', 'bin'),
        '/opt/homebrew/bin',
        '/usr/local/bin',
        '/usr/bin',
        '/bin',
      ];
  const existing = (process.env.PATH || '').split(sep).filter(Boolean);
  const merged = [...new Set([...extraDirs, ...existing])];
  return { ...process.env, PATH: merged.join(sep) };
}

export function findBinary(name, envOverrideKey) {
  if (envOverrideKey && process.env[envOverrideKey] && isExecutableFile(process.env[envOverrideKey])) {
    return process.env[envOverrideKey];
  }
  if (path.isAbsolute(name)) return isExecutableFile(name) ? name : null;
  const candidates = process.platform === 'win32' ? [`${name}.cmd`, `${name}.exe`, name] : [name];
  const env = buildAugmentedEnv();
  const sep = process.platform === 'win32' ? ';' : ':';
  for (const dir of (env.PATH || '').split(sep)) {
    if (!dir) continue;
    for (const item of candidates) {
      const full = path.join(dir, item);
      if (isExecutableFile(full)) return full;
    }
  }
  return null;
}

export function findPiBinary() {
  return findBinary('pi', 'TAB_PROJECT_PI_BIN');
}

export function discoverBuiltinAgents() {
  const envKeys = {
    pi: 'TAB_PROJECT_PI_BIN',
    claude: 'TAB_PROJECT_CLAUDE_BIN',
    codex: 'TAB_PROJECT_CODEX_BIN',
    gemini: 'TAB_PROJECT_GEMINI_BIN',
    opencode: 'TAB_PROJECT_OPENCODE_BIN',
    'claude-agent-acp': 'TAB_PROJECT_CLAUDE_ACP_BIN',
    'codex-acp': 'TAB_PROJECT_CODEX_ACP_BIN',
  };
  return BUILTIN_AGENTS.map(agent => {
    const resolved = findBinary(agent.bin, envKeys[agent.id]);
    return {
      id: agent.id,
      name: agent.name,
      protocol: agent.protocol,
      installed: Boolean(resolved),
      path: resolved,
      supportsModels: agent.supportsModels,
    };
  });
}

/** Split a command line string into argv tokens without invoking a shell. */
export function splitCommandArgs(commandText) {
  const tokens = [];
  let current = '';
  let quote = '';
  let escaped = false;
  for (const ch of String(commandText || '').trim()) {
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\' && quote !== "'") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (ch === quote) quote = '';
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (/\s/.test(ch)) {
      if (current) { tokens.push(current); current = ''; }
      continue;
    }
    current += ch;
  }
  if (quote) throw new Error('ACP 命令中存在未闭合的引号。');
  if (current) tokens.push(current);
  return tokens;
}

function runProcess(command, args, options) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const child = spawn(command, args, { ...options, stdio: ['ignore', 'pipe', 'pipe'] });

    let stdoutBytes = 0;
    let stderrBytes = 0;
    let truncated = false;
    let timedOut = false;
    let settled = false;
    const stdoutChunks = [];
    const stderrChunks = [];
    const maxStdoutBytes = typeof options.maxStdoutBytes === 'number' && options.maxStdoutBytes > 0
      ? options.maxStdoutBytes
      : MAX_OUTPUT_BYTES;

    const appendChunk = (chunks, getCount, setCount, maxBytes, chunk) => {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      const remaining = maxBytes - getCount();
      if (remaining <= 0) { truncated = true; return; }
      if (buf.length > remaining) {
        chunks.push(buf.subarray(0, remaining));
        setCount(maxBytes);
        truncated = true;
      } else {
        chunks.push(buf);
        setCount(getCount() + buf.length);
      }
    };

    child.stdout?.on('data', chunk => appendChunk(stdoutChunks, () => stdoutBytes, v => { stdoutBytes = v; }, maxStdoutBytes, chunk));
    child.stderr?.on('data', chunk => appendChunk(stderrChunks, () => stderrBytes, v => { stderrBytes = v; }, MAX_OUTPUT_BYTES, chunk));

    const timer = setTimeout(() => {
      timedOut = true;
      try { child.kill('SIGTERM'); } catch {}
      setTimeout(() => { try { child.kill('SIGKILL'); } catch {} }, 800).unref();
    }, options.timeoutMs);

    const finish = (exitCode, signal, spawnError) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const stdout = Buffer.concat(stdoutChunks).toString('utf8');
      const stderrText = Buffer.concat(stderrChunks).toString('utf8');
      const stderr = spawnError ? `${stderrText}${stderrText ? '\n' : ''}${spawnError.message}` : stderrText;
      resolve({
        ok: !spawnError && !timedOut && exitCode === 0,
        cwd: options.cwd,
        exitCode: typeof exitCode === 'number' ? exitCode : null,
        signal: signal || null,
        timedOut,
        truncated,
        durationMs: Date.now() - startedAt,
        stdout,
        stderr,
      });
    };

    child.on('error', err => finish(null, null, err));
    child.on('close', (code, signal) => finish(code, signal, null));
  });
}

function runShellCommand(command, cwd, timeoutMs) {
  const isWindows = process.platform === 'win32';
  const env = buildAugmentedEnv();
  return isWindows
    ? runProcess(process.env.COMSPEC || 'cmd.exe', ['/d', '/s', '/c', command], { cwd, env, windowsHide: true, timeoutMs })
    : runProcess(process.env.SHELL || '/bin/sh', ['-lc', command], { cwd, env, windowsHide: true, timeoutMs });
}

/** Parse output of `pi --list-models` into structured model records. */
export function parsePiListModels(rawOutput) {
  const models = [];
  const seen = new Set();
  for (const line of String(rawOutput || '').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const cols = trimmed.split(/\s+/);
    if (cols.length < 2) continue;
    if (cols[0].toLowerCase() === 'provider' && cols[1].toLowerCase() === 'model') continue;
    if (/^[-=]+$/.test(cols[0])) continue;
    const provider = cols[0];
    const model = cols[1];
    const id = `${provider}/${model}`;
    if (seen.has(id)) continue;
    seen.add(id);
    models.push({
      id,
      provider,
      model,
      context: cols[2] || '',
      maxOut: cols[3] || '',
      thinking: cols[4] === 'yes',
      images: cols[5] === 'yes',
    });
  }
  return models;
}

/** Extract reply text, thinking blocks, tool activity, and model metadata from `pi --mode json` lines. */
export function parsePiJsonEvents(rawOutput) {
  let sessionId = '';
  let provider = '';
  let model = '';
  let thinkingLevel = '';
  let durationMs = 0;
  let usage = null;
  let errorMessage = '';
  const textTurns = [];
  const thinkingParts = [];
  const toolSteps = [];
  let streamTexts = [];
  let streamThinking = [];

  for (const line of String(rawOutput || '').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('{')) continue;
    let event;
    try { event = JSON.parse(trimmed); } catch { continue; }
    if (!event || typeof event !== 'object') continue;
    if (event.type === 'session' && typeof event.id === 'string') sessionId = event.id;
    if (event.type === 'message_start' && event.message?.role === 'assistant') {
      const msg = event.message;
      if (typeof msg.provider === 'string' && msg.provider) provider = msg.provider;
      if (typeof msg.model === 'string' && msg.model) model = msg.model;
      if (typeof msg.thinkingLevel === 'string' && msg.thinkingLevel) thinkingLevel = msg.thinkingLevel;
      streamTexts = [];
      streamThinking = [];
    }
    if (event.type === 'message_update' && event.assistantMessageEvent && typeof event.assistantMessageEvent === 'object') {
      const ev = event.assistantMessageEvent;
      if (ev.type === 'text_delta' && typeof ev.delta === 'string') {
        streamTexts.push(ev.delta);
      } else if (ev.type === 'text_end' && typeof ev.content === 'string' && !streamTexts.length) {
        streamTexts.push(ev.content);
      } else if (ev.type === 'thinking_delta' && typeof ev.delta === 'string') {
        streamThinking.push(ev.delta);
      } else if (ev.type === 'thinking_end' && typeof ev.content === 'string' && !streamThinking.length) {
        streamThinking.push(ev.content);
      }
    }
    if (event.type === 'message_end' && event.message?.role === 'assistant') {
      const msg = event.message;
      if (typeof msg.provider === 'string' && msg.provider) provider = msg.provider;
      if (typeof msg.model === 'string' && msg.model) model = msg.model;
      if (typeof msg.thinkingLevel === 'string' && msg.thinkingLevel) thinkingLevel = msg.thinkingLevel;
      if (typeof msg.durationMs === 'number') durationMs += msg.durationMs;
      if (msg.usage && typeof msg.usage === 'object') usage = msg.usage;
      if (typeof msg.errorMessage === 'string' && msg.errorMessage) errorMessage = msg.errorMessage;
      const blocks = Array.isArray(msg.content) ? msg.content : [];
      const turnTexts = [];
      for (const block of blocks) {
        if (!block || typeof block !== 'object') continue;
        if (block.type === 'text' && typeof block.text === 'string' && block.text.trim()) turnTexts.push(block.text);
        else if (block.type === 'thinking' && typeof block.thinking === 'string' && block.thinking.trim()) thinkingParts.push(block.thinking.trim());
        else if (block.type === 'toolCall' && typeof block.name === 'string') toolSteps.push({ name: block.name, args: block.arguments });
      }
      if (turnTexts.length) {
        textTurns.push(turnTexts.join('\n'));
      } else if (streamTexts.length) {
        const joinedStream = streamTexts.join('').trim();
        if (joinedStream) textTurns.push(joinedStream);
      }
      if (!blocks.some(b => b?.type === 'thinking' && typeof b.thinking === 'string' && b.thinking.trim()) && streamThinking.length) {
        const joinedThink = streamThinking.join('').trim();
        if (joinedThink) thinkingParts.push(joinedThink);
      }
      streamTexts = [];
      streamThinking = [];
    }
    if (event.type === 'agent_end' && Array.isArray(event.messages)) {
      for (const msg of event.messages) {
        if (msg?.role !== 'assistant') continue;
        if (typeof msg.errorMessage === 'string' && msg.errorMessage && !errorMessage) errorMessage = msg.errorMessage;
        if (!textTurns.length && Array.isArray(msg.content)) {
          const turnTexts = msg.content.filter(b => b?.type === 'text' && typeof b.text === 'string' && b.text.trim()).map(b => b.text);
          if (turnTexts.length) textTurns.push(turnTexts.join('\n'));
        }
      }
    }
  }

  // Recover streamed output if stdout ended or truncated before message_end arrived.
  if (streamTexts.length) {
    const recovered = streamTexts.join('').trim();
    if (recovered) textTurns.push(recovered);
  }
  if (streamThinking.length) {
    const recoveredThink = streamThinking.join('').trim();
    if (recoveredThink) thinkingParts.push(recoveredThink);
  }

  return {
    sessionId, provider, model, thinkingLevel, durationMs, usage, errorMessage,
    text: textTurns.length ? textTurns[textTurns.length - 1] : '',
    allTexts: textTurns,
    thinking: thinkingParts.join('\n\n'),
    toolSteps,
  };
}

/** Parse Claude Code `claude -p --output-format json` output. */
export function parseClaudeJsonOutput(rawOutput) {
  let sessionId = '';
  let text = '';
  let durationMs = 0;
  let usage = null;
  let errorMessage = '';
  let model = '';
  const toolSteps = [];

  const handleObj = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    if (typeof obj.session_id === 'string' && obj.session_id) sessionId = obj.session_id;
    if (typeof obj.duration_ms === 'number') durationMs = obj.duration_ms;
    if (obj.usage && typeof obj.usage === 'object') usage = obj.usage;
    if (typeof obj.model === 'string' && obj.model) model = obj.model;
    if (obj.type === 'assistant' && Array.isArray(obj.message?.content)) {
      for (const block of obj.message.content) {
        if (block?.type === 'tool_use' && typeof block.name === 'string') {
          toolSteps.push({ name: block.name, args: block.input && typeof block.input === 'object' ? block.input : undefined });
        }
        if (block?.type === 'text' && typeof block.text === 'string' && block.text.trim()) text = block.text;
      }
    }
    if (obj.type === 'result') {
      if (typeof obj.result === 'string') text = obj.result;
      if (obj.is_error && typeof obj.result === 'string') errorMessage = obj.result;
    }
  };

  const trimmedAll = String(rawOutput || '').trim();
  if (trimmedAll.startsWith('[') || trimmedAll.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmedAll);
      if (Array.isArray(parsed)) parsed.forEach(handleObj);
      else handleObj(parsed);
      return { sessionId, text, durationMs, usage, errorMessage, model, toolSteps };
    } catch {}
  }
  for (const line of trimmedAll.split(/\r?\n/)) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try { handleObj(JSON.parse(t)); } catch {}
  }
  return { sessionId, text, durationMs, usage, errorMessage, model, toolSteps };
}

/** Parse Codex CLI `codex exec --json` NDJSON events. */
export function parseCodexJsonEvents(rawOutput) {
  let sessionId = '';
  let text = '';
  let errorMessage = '';
  const toolSteps = [];
  for (const line of String(rawOutput || '').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('{')) continue;
    let event;
    try { event = JSON.parse(trimmed); } catch { continue; }
    if (event.type === 'thread.started' && typeof event.thread_id === 'string') sessionId = event.thread_id;
    if ((event.type === 'item.completed' || event.type === 'item.updated') && event.item) {
      const item = event.item;
      if (item.type === 'agent_message' && typeof item.text === 'string' && item.text.trim()) text = item.text;
      else if (item.type === 'command_execution' && event.type === 'item.completed') toolSteps.push({ name: 'shell' });
      else if (item.type === 'mcp_tool_call' && event.type === 'item.completed') toolSteps.push({ name: item.tool || 'mcp' });
      else if (item.type === 'file_change' && event.type === 'item.completed') toolSteps.push({ name: 'file_change', args: item.changes ? { changes: item.changes } : undefined });
    }
    if (event.type === 'error' && typeof event.message === 'string') errorMessage = event.message;
  }
  return { sessionId, text, errorMessage, toolSteps };
}

/** Parse OpenCode `opencode run --format json` NDJSON events. */
export function parseOpencodeJsonEvents(rawOutput) {
  let sessionId = '';
  const textParts = [];
  const toolSteps = [];
  let errorMessage = '';
  for (const line of String(rawOutput || '').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('{')) continue;
    let event;
    try { event = JSON.parse(trimmed); } catch { continue; }
    if (typeof event.sessionID === 'string' && event.sessionID) sessionId = event.sessionID;
    if (event.type === 'text' && typeof event.part?.text === 'string') textParts.push(event.part.text);
    if (event.type === 'tool_use' && typeof event.part?.tool === 'string') toolSteps.push({ name: event.part.tool });
    if (event.type === 'error' && typeof event.error?.message === 'string') errorMessage = event.error.message;
  }
  return { sessionId, text: textParts.join(''), toolSteps, errorMessage };
}

/** Pick the safest matching option for an ACP `session/request_permission` call. */
export function pickAcpPermissionOption(options, allowTools) {
  const list = Array.isArray(options) ? options : [];
  if (allowTools) {
    return list.find(o => o?.kind === 'allow_once')?.optionId
      || list.find(o => o?.kind === 'allow_always')?.optionId
      || list.find(o => /allow/i.test(String(o?.kind || o?.name || '')))?.optionId
      || list[0]?.optionId;
  }
  return list.find(o => o?.kind === 'reject_once')?.optionId
    || list.find(o => /reject|deny|cancel/i.test(String(o?.kind || o?.name || '')))?.optionId
    || null;
}

/** Execute a single turn over standard ACP (Agent Client Protocol, JSON-RPC 2.0 over stdio). */
export function runAcpPrompt(command, args, options) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const env = buildAugmentedEnv();
    const child = spawn(command, args, { cwd: options.cwd, env, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });

    let nextRpcId = 1;
    let settled = false;
    let stdoutBuf = '';
    let stderrText = '';
    const textChunks = [];
    const thoughtChunks = [];
    const toolSteps = [];
    const seenToolIds = new Set();
    const pending = new Map();
    let activeSessionId = '';

    const cleanup = () => {
      clearTimeout(timer);
      try { child.stdin.end(); } catch {}
      setTimeout(() => { try { if (!child.killed) child.kill('SIGTERM'); } catch {} }, 100).unref();
    };

    const finish = (result) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const sendRpc = (method, params) => new Promise((res, rej) => {
      const id = nextRpcId++;
      pending.set(id, { res, rej });
      try {
        child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
      } catch (err) {
        pending.delete(id);
        rej(err);
      }
    });

    const handleUpdate = (params) => {
      const update = params?.update;
      if (!update || typeof update !== 'object') return;
      const kind = update.sessionUpdate || update.type || '';
      if (kind === 'agent_message_chunk' && update.content?.type === 'text' && typeof update.content.text === 'string') {
        textChunks.push(update.content.text);
      } else if (kind === 'agent_thought_chunk' && update.content?.type === 'text' && typeof update.content.text === 'string') {
        thoughtChunks.push(update.content.text);
      } else if ((kind === 'tool_call' || kind === 'tool_call_update') && typeof update.title === 'string') {
        const key = update.toolCallId || update.title;
        if (!seenToolIds.has(key)) {
          seenToolIds.add(key);
          toolSteps.push({ name: update.title });
        }
      }
    };

    const handleLine = (line) => {
      const trimmed = line.trim();
      if (!trimmed.startsWith('{')) return;
      let msg;
      try { msg = JSON.parse(trimmed); } catch { return; }

      if (msg.id !== undefined && (msg.result !== undefined || msg.error !== undefined)) {
        const entry = pending.get(msg.id);
        if (!entry) return;
        pending.delete(msg.id);
        if (msg.error) entry.rej(new Error(msg.error.message || 'ACP JSON-RPC error'));
        else entry.res(msg.result);
        return;
      }

      if (msg.method === 'session/update') {
        handleUpdate(msg.params);
        return;
      }

      if (msg.id !== undefined && msg.method === 'session/request_permission') {
        const optionId = pickAcpPermissionOption(msg.params?.options, options.toolsEnabled !== false);
        const outcome = optionId ? { outcome: 'selected', optionId } : { outcome: 'cancelled' };
        try {
          child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: { outcome } })}\n`);
        } catch {}
      } else if (msg.id !== undefined && msg.method) {
        try {
          child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id: msg.id, error: { code: -32601, message: `Unsupported client method: ${msg.method}` } })}\n`);
        } catch {}
      }
    };

    const timer = setTimeout(() => {
      try { child.kill('SIGTERM'); } catch {}
      finish({ ok: false, timedOut: true, error: `ACP Agent 执行超时（超过 ${Math.round(options.timeoutMs / 1000)} 秒）` });
    }, options.timeoutMs);

    child.stdout.on('data', (chunk) => {
      stdoutBuf += chunk.toString('utf8');
      let idx;
      while ((idx = stdoutBuf.indexOf('\n')) >= 0) {
        const line = stdoutBuf.slice(0, idx);
        stdoutBuf = stdoutBuf.slice(idx + 1);
        handleLine(line);
      }
    });

    child.stderr.on('data', (chunk) => {
      if (stderrText.length < 16384) stderrText += chunk.toString('utf8');
    });

    child.on('error', (err) => finish({ ok: false, error: err.message || '无法启动 ACP Agent' }));
    child.on('close', (code) => {
      if (!settled) {
        finish({ ok: false, error: stderrText.trim() || `ACP Agent 提前退出（退出码 ${code ?? '未知'}）` });
      }
    });

    (async () => {
      const init = await sendRpc('initialize', {
        protocolVersion: 1,
        clientCapabilities: { fs: { readTextFile: false, writeTextFile: false }, terminal: false },
      });
      const canLoad = Boolean(init?.agentCapabilities?.loadSession);
      if (options.externalSessionId && canLoad) {
        try {
          await sendRpc('session/load', { sessionId: options.externalSessionId, cwd: options.cwd, mcpServers: [] });
          activeSessionId = options.externalSessionId;
        } catch {}
      }
      if (!activeSessionId) {
        const created = await sendRpc('session/new', { cwd: options.cwd, mcpServers: [] });
        activeSessionId = created?.sessionId || '';
      }
      if (!activeSessionId) throw new Error('ACP Agent 未返回有效 sessionId。');

      await sendRpc('session/prompt', {
        sessionId: activeSessionId,
        prompt: [{ type: 'text', text: options.prompt }],
      });

      finish({
        ok: true,
        cwd: options.cwd,
        externalSessionId: activeSessionId,
        provider: 'acp',
        model: init?.agentInfo?.name || options.agentName || 'ACP Agent',
        durationMs: Date.now() - startedAt,
        text: textChunks.join('').trim() || '（无输出内容）',
        thinking: thoughtChunks.join('\n\n').trim(),
        toolSteps,
      });
    })().catch((err) => {
      finish({ ok: false, error: err instanceof Error ? err.message : 'ACP 会话执行失败' });
    });
  });
}

function sanitizeSessionId(rawId) {
  if (typeof rawId !== 'string') return '';
  return rawId.trim().replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 80);
}

async function runPiAgent(request, cwd) {
  const piPath = findPiBinary();
  if (!piPath) return { ok: false, error: '未在本机检测到 pi CLI，请先安装并登录 pi。' };
  const sessionDir = path.join(os.homedir(), '.tab-project-native-host', 'pi-sessions');
  mkdirSync(sessionDir, { recursive: true });
  const args = ['-p', '--mode', 'json', '--session-dir', sessionDir];
  const sid = sanitizeSessionId(request?.sessionId);
  if (sid) args.push('--session-id', sid);
  if (typeof request?.model === 'string' && /^[a-zA-Z0-9._:/-]{1,120}$/.test(request.model.trim())) {
    args.push('--model', request.model.trim());
  }
  if (typeof request?.thinking === 'string' && ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'].includes(request.thinking)) {
    args.push('--thinking', request.thinking);
  }
  if (request?.toolsEnabled === false) args.push('--no-tools');
  args.push('--', request.prompt.trim());

  const timeoutMs = clampTimeout(request?.timeoutMs, 120000);
  const proc = await runProcess(piPath, args, {
    cwd,
    env: buildAugmentedEnv(),
    windowsHide: true,
    timeoutMs,
    maxStdoutBytes: 4 * 1024 * 1024,
  });
  const parsed = parsePiJsonEvents(proc.stdout);
  const finalText = (parsed.text || parsed.allTexts.join('\n\n') || '').trim();
  const cleanStderr = proc.stderr
    .split(/\r?\n/)
    .filter(line => !/^Warning:\s+No project session found with id\b/i.test(line.trim()))
    .join('\n')
    .trim();
  if (!finalText) {
    return {
      ok: false,
      cwd,
      timedOut: proc.timedOut,
      error: proc.timedOut
        ? `pi 执行超时（超过 ${Math.round(timeoutMs / 1000)} 秒）`
        : parsed.errorMessage
          || (proc.truncated ? 'pi JSON 输出流超出缓冲区上限，未能提取最终回复。' : '')
          || cleanStderr
          || (proc.ok ? '本机 pi 未返回有效文本内容，请检查模型或额度配置。' : `pi 执行失败（退出码 ${proc.exitCode ?? '未知'}）`),
    };
  }
  return {
    ok: true,
    cwd,
    sessionId: parsed.sessionId || sid,
    externalSessionId: parsed.sessionId || sid,
    provider: parsed.provider,
    model: parsed.model,
    thinkingLevel: parsed.thinkingLevel,
    durationMs: parsed.durationMs || proc.durationMs,
    usage: parsed.usage,
    text: finalText,
    thinking: parsed.thinking,
    toolSteps: parsed.toolSteps,
    truncated: proc.truncated,
  };
}

async function runClaudeAgent(request, cwd) {
  const claudePath = findBinary('claude', 'TAB_PROJECT_CLAUDE_BIN');
  if (!claudePath) return { ok: false, error: '未在本机检测到 Claude Code (claude) CLI。' };
  const args = ['-p', '--output-format', 'json'];
  if (typeof request?.externalSessionId === 'string' && /^[a-zA-Z0-9_-]{4,120}$/.test(request.externalSessionId)) {
    args.push('--resume', request.externalSessionId);
  }
  if (typeof request?.model === 'string' && /^[a-zA-Z0-9._:-]{1,120}$/.test(request.model.trim())) {
    args.push('--model', request.model.trim());
  }
  if (request?.toolsEnabled === false) {
    args.push('--tools', '');
  } else {
    args.push('--permission-mode', 'acceptEdits');
  }
  args.push('--', request.prompt.trim());

  const timeoutMs = clampTimeout(request?.timeoutMs, 120000);
  const proc = await runProcess(claudePath, args, { cwd, env: buildAugmentedEnv(), windowsHide: true, timeoutMs, maxStdoutBytes: 4 * 1024 * 1024 });
  const parsed = parseClaudeJsonOutput(proc.stdout);
  if (!proc.ok && !parsed.text) {
    return {
      ok: false,
      cwd,
      timedOut: proc.timedOut,
      error: proc.timedOut ? `Claude Code 执行超时（超过 ${Math.round(timeoutMs / 1000)} 秒）` : parsed.errorMessage || proc.stderr.trim() || `Claude Code 执行失败（退出码 ${proc.exitCode ?? '未知'}）`,
    };
  }
  return {
    ok: true,
    cwd,
    externalSessionId: parsed.sessionId,
    provider: 'claude-code',
    model: parsed.model || 'Claude Code',
    durationMs: parsed.durationMs || proc.durationMs,
    usage: parsed.usage,
    text: parsed.text,
    thinking: '',
    toolSteps: parsed.toolSteps,
  };
}

async function runCodexAgent(request, cwd) {
  const codexPath = findBinary('codex', 'TAB_PROJECT_CODEX_BIN');
  if (!codexPath) return { ok: false, error: '未在本机检测到 Codex CLI (codex)。' };
  const args = ['exec'];
  if (typeof request?.externalSessionId === 'string' && /^[a-zA-Z0-9_-]{4,120}$/.test(request.externalSessionId)) {
    args.push('resume', request.externalSessionId);
  }
  args.push('--json', '--skip-git-repo-check');
  if (request?.toolsEnabled !== false) args.push('--full-auto');
  else args.push('--sandbox', 'read-only');
  if (typeof request?.model === 'string' && /^[a-zA-Z0-9._:-]{1,120}$/.test(request.model.trim())) {
    args.push('--model', request.model.trim());
  }
  args.push(request.prompt.trim());

  const timeoutMs = clampTimeout(request?.timeoutMs, 120000);
  const proc = await runProcess(codexPath, args, { cwd, env: buildAugmentedEnv(), windowsHide: true, timeoutMs, maxStdoutBytes: 4 * 1024 * 1024 });
  const parsed = parseCodexJsonEvents(proc.stdout);
  if (!proc.ok && !parsed.text) {
    return {
      ok: false,
      cwd,
      timedOut: proc.timedOut,
      error: proc.timedOut ? `Codex 执行超时（超过 ${Math.round(timeoutMs / 1000)} 秒）` : parsed.errorMessage || proc.stderr.trim() || `Codex 执行失败（退出码 ${proc.exitCode ?? '未知'}）`,
    };
  }
  return {
    ok: true,
    cwd,
    externalSessionId: parsed.sessionId,
    provider: 'codex',
    model: request?.model || 'Codex CLI',
    durationMs: proc.durationMs,
    text: parsed.text,
    thinking: '',
    toolSteps: parsed.toolSteps,
  };
}

async function runOpencodeAgent(request, cwd) {
  const ocPath = findBinary('opencode', 'TAB_PROJECT_OPENCODE_BIN');
  if (!ocPath) return { ok: false, error: '未在本机检测到 OpenCode CLI (opencode)。' };
  const args = ['run', '--format', 'json'];
  if (typeof request?.externalSessionId === 'string' && /^[a-zA-Z0-9_-]{4,120}$/.test(request.externalSessionId)) {
    args.push('--session', request.externalSessionId);
  }
  if (typeof request?.model === 'string' && /^[a-zA-Z0-9._:/-]{1,120}$/.test(request.model.trim())) {
    args.push('--model', request.model.trim());
  }
  args.push(request.prompt.trim());

  const timeoutMs = clampTimeout(request?.timeoutMs, 120000);
  const proc = await runProcess(ocPath, args, { cwd, env: buildAugmentedEnv(), windowsHide: true, timeoutMs, maxStdoutBytes: 4 * 1024 * 1024 });
  const parsed = parseOpencodeJsonEvents(proc.stdout);
  if (!proc.ok && !parsed.text) {
    return {
      ok: false,
      cwd,
      timedOut: proc.timedOut,
      error: proc.timedOut ? `OpenCode 执行超时` : parsed.errorMessage || proc.stderr.trim() || `OpenCode 执行失败（退出码 ${proc.exitCode ?? '未知'}）`,
    };
  }
  return {
    ok: true,
    cwd,
    externalSessionId: parsed.sessionId,
    provider: 'opencode',
    model: request?.model || 'OpenCode',
    durationMs: proc.durationMs,
    text: parsed.text,
    thinking: '',
    toolSteps: parsed.toolSteps,
  };
}

function decodeHtmlBasic(str) {
  return String(str || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => {
      const n = Number(code);
      return Number.isFinite(n) ? String.fromCodePoint(n) : '';
    })
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNativeCount(raw) {
  const clean = String(raw || '').replace(/,/g, '').trim().toLowerCase();
  if (!clean) return 0;
  if (clean.endsWith('k')) return Math.round(parseFloat(clean) * 1000) || 0;
  if (clean.endsWith('m')) return Math.round(parseFloat(clean) * 1000000) || 0;
  const n = Number.parseInt(clean, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function cleanNativeReadmeExcerpt(raw, maxChars = 1400) {
  const cleaned = String(raw || '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<img\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]{600,}?```/g, '[代码示例略]')
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return cleaned.length <= maxChars ? cleaned : `${cleaned.slice(0, maxChars).trim()}…`;
}

export async function runNativeGitHubTrending(request) {
  const rawTopN = Number(request?.topN);
  const topN = Number.isFinite(rawTopN) ? Math.max(1, Math.min(25, Math.round(rawTopN))) : 10;
  const since = request?.since === 'weekly' || request?.since === 'monthly' ? request.since : 'daily';

  let repos = [];
  let sourceLabel = '';
  let primaryErr = '';

  try {
    const resp = await fetch(`https://github.com/trending?since=${since}`, {
      headers: { Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'tab-project-native-host' },
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const html = await resp.text();
    const rows = html.match(/<article[^>]*class="[^"]*Box-row[^"]*"[^>]*>[\s\S]*?<\/article>/gi) || [];
    const seen = new Set();
    for (const row of rows) {
      if (repos.length >= topN) break;
      const m = row.match(/<h2[^>]*>[\s\S]*?<a[^>]*href="\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)"/i);
      const fullName = m?.[1]?.trim() || '';
      if (!fullName || seen.has(fullName) || fullName.split('/').some(p => p === '.' || p === '..')) continue;
      seen.add(fullName);
      const [owner, name] = fullName.split('/');
      const descM = row.match(/<p[^>]*class="[^"]*color-fg-muted[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      const langM = row.match(/itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/i);
      const starM = row.match(/href="\/[^"]+\/stargazers"[^>]*>[\s\S]*?<\/svg>([\s\S]*?)<\/a>/i);
      const todayM = row.match(/([\d,]+)\s+stars?\s+(?:today|this week|this month)/i);
      repos.push({
        rank: repos.length + 1,
        fullName,
        owner,
        name,
        url: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
        description: descM ? decodeHtmlBasic(descM[1]) : '',
        language: langM ? decodeHtmlBasic(langM[1]) : '',
        stars: starM ? parseNativeCount(decodeHtmlBasic(starM[1])) : 0,
        todayStars: todayM ? parseNativeCount(todayM[1]) : 0,
      });
    }
    if (repos.length) {
      sourceLabel = since === 'weekly' ? 'GitHub 本周官方 Trending 榜（本机桥接）' : since === 'monthly' ? 'GitHub 本月官方 Trending 榜（本机桥接）' : 'GitHub 今日官方 Trending 榜（本机桥接）';
    } else {
      primaryErr = 'Trending 页面未匹配到仓库列表';
    }
  } catch (err) {
    primaryErr = err instanceof Error ? err.message : String(err);
  }

  if (!repos.length) {
    const days = since === 'weekly' ? 7 : since === 'monthly' ? 30 : 2;
    const date = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
    try {
      const apiResp = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(`is:public created:>${date}`)}&sort=stars&order=desc&per_page=${topN}`,
        { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tab-project-native-host' }, signal: AbortSignal.timeout(15000) }
      );
      if (!apiResp.ok) throw new Error(`HTTP ${apiResp.status}`);
      const data = await apiResp.json();
      for (const item of Array.isArray(data?.items) ? data.items.slice(0, topN) : []) {
        const fullName = typeof item?.full_name === 'string' ? item.full_name.trim() : '';
        if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName)) continue;
        const [owner, name] = fullName.split('/');
        repos.push({
          rank: repos.length + 1,
          fullName,
          owner,
          name,
          url: `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
          description: typeof item.description === 'string' ? item.description.trim() : '',
          language: typeof item.language === 'string' ? item.language.trim() : '',
          stars: Number(item.stargazers_count) || 0,
          todayStars: 0,
        });
      }
      sourceLabel = `GitHub Search 热榜（${date} 起 · 本机桥接）`;
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      return { ok: false, error: `本机节点读取 GitHub 失败（Trending: ${primaryErr || '空结果'}；API: ${msg}）` };
    }
  }

  if (!repos.length) {
    return { ok: false, error: '未能从 GitHub 获取到榜单仓库。' };
  }

  const out = new Array(repos.length);
  let cursor = 0;
  const worker = async () => {
    while (cursor < repos.length) {
      const idx = cursor++;
      const repo = repos[idx];
      let excerpt = '';
      let readmeSource = 'description-only';
      for (const branch of ['HEAD', 'main', 'master']) {
        try {
          const r = await fetch(`https://raw.githubusercontent.com/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}/${branch}/README.md`, {
            headers: { 'User-Agent': 'tab-project-native-host' },
            signal: AbortSignal.timeout(8000),
          });
          if (r.ok) {
            const txt = await r.text();
            excerpt = cleanNativeReadmeExcerpt(txt, 1400);
            if (excerpt) { readmeSource = 'raw'; break; }
          }
        } catch {}
      }
      if (!excerpt) {
        try {
          const r = await fetch(`https://api.github.com/repos/${repo.fullName}/readme`, {
            headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tab-project-native-host' },
            signal: AbortSignal.timeout(8000),
          });
          if (r.ok) {
            const d = await r.json();
            if (d?.encoding === 'base64' && typeof d.content === 'string') {
              const txt = Buffer.from(d.content.replace(/\s/g, ''), 'base64').toString('utf8');
              excerpt = cleanNativeReadmeExcerpt(txt, 1400);
              if (excerpt) readmeSource = 'api';
            }
          }
        } catch {}
      }
      out[idx] = {
        ...repo,
        readmeExcerpt: excerpt || repo.description || '（该仓库未提供 README 说明，请结合仓库描述判断）',
        readmeSource,
      };
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, repos.length) }, () => worker()));
  return { ok: true, sourceLabel, repos: out };
}

/** Handle a single decoded Native Messaging request object. */
export async function handleNativeRequest(request) {
  const id = typeof request?.id === 'string' || typeof request?.id === 'number' ? request.id : null;
  const action = typeof request?.action === 'string' ? request.action : '';

  if (action === 'ping') {
    const agents = discoverBuiltinAgents();
    const pi = agents.find(a => a.id === 'pi');
    return {
      ok: true,
      id,
      action: 'ping',
      protocolVersion: PROTOCOL_VERSION,
      hostVersion: HOST_VERSION,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      homeDir: os.homedir(),
      defaultCwd: os.homedir(),
      piAvailable: Boolean(pi?.installed),
      piPath: pi?.path || null,
      agents,
    };
  }

  if (action === 'check_dir') {
    try {
      const baseCwd = typeof request?.baseCwd === 'string' && request.baseCwd.trim()
        ? resolveWorkingDirectory(request.baseCwd)
        : os.homedir();
      const cwd = resolveWorkingDirectory(request?.path, baseCwd);
      return { ok: true, id, action: 'check_dir', cwd };
    } catch (err) {
      return { ok: false, id, action: 'check_dir', error: err instanceof Error ? err.message : 'Invalid directory' };
    }
  }

  if (action === 'exec') {
    const command = typeof request?.command === 'string' ? request.command.trim() : '';
    if (!command) return { ok: false, id, action: 'exec', error: 'Command must be a non-empty string' };
    if (command.length > 16000) return { ok: false, id, action: 'exec', error: 'Command exceeds 16000 character limit' };
    let cwd;
    try { cwd = resolveWorkingDirectory(request?.cwd); }
    catch (err) { return { ok: false, id, action: 'exec', error: err instanceof Error ? err.message : 'Invalid working directory' }; }
    const result = await runShellCommand(command, cwd, clampTimeout(request?.timeoutMs));
    return { id, action: 'exec', ...result };
  }

  if (action === 'github_trending') {
    const res = await runNativeGitHubTrending(request);
    return { id, action, ...res };
  }

  if (action === 'pi_models' || action === 'agent_models') {
    const piPath = findPiBinary();
    if (!piPath) return { ok: false, id, action, error: '未在本机检测到 pi CLI，请先安装并登录 pi。' };
    const res = await runProcess(piPath, ['--list-models'], { cwd: os.homedir(), env: buildAugmentedEnv(), windowsHide: true, timeoutMs: 15000 });
    if (!res.ok) return { ok: false, id, action, error: res.stderr.trim() || '读取 pi 模型列表失败。' };
    return { ok: true, id, action, models: parsePiListModels(res.stdout) };
  }

  if (action === 'pi_run' || action === 'agent_run') {
    const prompt = typeof request?.prompt === 'string' ? request.prompt.trim() : '';
    if (!prompt) return { ok: false, id, action, error: 'Prompt must be a non-empty string' };
    if (prompt.length > 100000) return { ok: false, id, action, error: 'Prompt exceeds 100000 character limit' };

    let cwd;
    try { cwd = resolveWorkingDirectory(request?.cwd); }
    catch (err) { return { ok: false, id, action, error: err instanceof Error ? err.message : 'Invalid working directory' }; }

    const agentId = typeof request?.agentId === 'string' && request.agentId ? request.agentId : 'pi';
    let res;
    if (agentId === 'pi') {
      res = await runPiAgent(request, cwd);
    } else if (agentId === 'claude') {
      res = await runClaudeAgent(request, cwd);
    } else if (agentId === 'codex') {
      res = await runCodexAgent(request, cwd);
    } else if (agentId === 'opencode') {
      res = await runOpencodeAgent(request, cwd);
    } else if (agentId === 'gemini' || agentId === 'claude-agent-acp' || agentId === 'codex-acp') {
      const def = BUILTIN_AGENTS.find(a => a.id === agentId);
      const binPath = def ? findBinary(def.bin) : null;
      if (!binPath) {
        return { ok: false, id, action, error: `未在本机检测到 ${def?.name || agentId} (${def?.bin})。` };
      }
      res = await runAcpPrompt(binPath, def.acpArgs || [], {
        cwd,
        prompt,
        externalSessionId: request?.externalSessionId,
        toolsEnabled: request?.toolsEnabled !== false,
        timeoutMs: clampTimeout(request?.timeoutMs, 120000),
        agentName: def.name,
      });
    } else if (agentId.startsWith('acp:')) {
      const acpCommand = typeof request?.acpCommand === 'string' ? request.acpCommand.trim() : '';
      if (!acpCommand) return { ok: false, id, action, error: '未提供自定义 ACP 启动命令。' };
      let tokens;
      try { tokens = splitCommandArgs(acpCommand); }
      catch (err) { return { ok: false, id, action, error: err instanceof Error ? err.message : 'ACP 命令格式无效。' }; }
      if (!tokens.length) return { ok: false, id, action, error: 'ACP 命令不能为空。' };
      const resolvedBin = findBinary(tokens[0]);
      if (!resolvedBin) return { ok: false, id, action, error: `未找到可执行命令：${tokens[0]}` };
      res = await runAcpPrompt(resolvedBin, tokens.slice(1), {
        cwd,
        prompt,
        externalSessionId: request?.externalSessionId,
        toolsEnabled: request?.toolsEnabled !== false,
        timeoutMs: clampTimeout(request?.timeoutMs, 120000),
        agentName: typeof request?.agentName === 'string' ? request.agentName : tokens[0],
      });
    } else {
      return { ok: false, id, action, error: `未知的本机 Agent 类型：${agentId}` };
    }

    return { id, action, ...res };
  }

  return { ok: false, id, error: `Unsupported action: ${action || '(empty)'}` };
}

function startStdioLoop() {
  const writeMessage = (payload) => {
    try { process.stdout.write(encodeNativeMessage(payload)); } catch {}
  };

  let chain = Promise.resolve();
  const decode = createMessageDecoder(
    (msg) => {
      chain = chain
        .then(() => handleNativeRequest(msg))
        .then(writeMessage)
        .catch(err => writeMessage({ ok: false, id: msg?.id ?? null, error: err instanceof Error ? err.message : 'Host execution failed' }));
    },
    (err) => writeMessage({ ok: false, id: null, error: err.message })
  );

  process.stdin.on('data', decode);
  process.stdin.on('end', () => {
    chain.finally(() => process.exit(0));
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startStdioLoop();
}
