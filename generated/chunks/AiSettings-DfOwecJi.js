import { d as de, b as m, B as ue, C as me, o as l, e as u, G as fe, i as n, A as R, F as x, m as c, t as p, f as q, g as D, l as O, n as H, v as ge, S as ce, j as ve, k as he, h as oe, s as E } from "./vendor-vue-BrDsOMg2.js";
import { b as F, n as W, g as ye, h as re, i as ae, j as ie, O as V, k as ne, m as be, o as ke } from "./workspace-bridge-DoEt_1yp.js";
import { d as se, b as we, c as xe, h as te, l as Ce, p as X, r as Se, s as Ie } from "./MulticaDialog-DtJF8LbO.js";
import { _ as pe } from "./_plugin-vue_export-helper-Do3lP4W5.js";
const le = `#!/usr/bin/env node
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
        onError(new Error(\`Incoming message exceeds \${MAX_INCOMING_BYTES} bytes\`));
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
    ? rawCwd.trim().replace(/^~(?=$|[\\\\/])/, os.homedir())
    : baseCwd;
  const resolved = path.isAbsolute(candidate) ? path.normalize(candidate) : path.resolve(baseCwd, candidate);
  const info = statSync(resolved);
  if (!info.isDirectory()) throw new Error(\`Target path is not a directory: \${resolved}\`);
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
  const candidates = process.platform === 'win32' ? [\`\${name}.cmd\`, \`\${name}.exe\`, name] : [name];
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
    if (ch === '\\\\' && quote !== "'") {
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
    if (/\\s/.test(ch)) {
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
      const stderr = spawnError ? \`\${stderrText}\${stderrText ? '\\n' : ''}\${spawnError.message}\` : stderrText;
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

/** Parse output of \`pi --list-models\` into structured model records. */
export function parsePiListModels(rawOutput) {
  const models = [];
  const seen = new Set();
  for (const line of String(rawOutput || '').split(/\\r?\\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const cols = trimmed.split(/\\s+/);
    if (cols.length < 2) continue;
    if (cols[0].toLowerCase() === 'provider' && cols[1].toLowerCase() === 'model') continue;
    if (/^[-=]+$/.test(cols[0])) continue;
    const provider = cols[0];
    const model = cols[1];
    const id = \`\${provider}/\${model}\`;
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

/** Extract reply text, thinking blocks, tool activity, and model metadata from \`pi --mode json\` lines. */
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

  for (const line of String(rawOutput || '').split(/\\r?\\n/)) {
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
        textTurns.push(turnTexts.join('\\n'));
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
          if (turnTexts.length) textTurns.push(turnTexts.join('\\n'));
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
    thinking: thinkingParts.join('\\n\\n'),
    toolSteps,
  };
}

/** Parse Claude Code \`claude -p --output-format json\` output. */
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
  for (const line of trimmedAll.split(/\\r?\\n/)) {
    const t = line.trim();
    if (!t.startsWith('{')) continue;
    try { handleObj(JSON.parse(t)); } catch {}
  }
  return { sessionId, text, durationMs, usage, errorMessage, model, toolSteps };
}

/** Parse Codex CLI \`codex exec --json\` NDJSON events. */
export function parseCodexJsonEvents(rawOutput) {
  let sessionId = '';
  let text = '';
  let errorMessage = '';
  const toolSteps = [];
  for (const line of String(rawOutput || '').split(/\\r?\\n/)) {
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

/** Parse OpenCode \`opencode run --format json\` NDJSON events. */
export function parseOpencodeJsonEvents(rawOutput) {
  let sessionId = '';
  const textParts = [];
  const toolSteps = [];
  let errorMessage = '';
  for (const line of String(rawOutput || '').split(/\\r?\\n/)) {
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

/** Pick the safest matching option for an ACP \`session/request_permission\` call. */
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
        child.stdin.write(\`\${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\\n\`);
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
          child.stdin.write(\`\${JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: { outcome } })}\\n\`);
        } catch {}
      } else if (msg.id !== undefined && msg.method) {
        try {
          child.stdin.write(\`\${JSON.stringify({ jsonrpc: '2.0', id: msg.id, error: { code: -32601, message: \`Unsupported client method: \${msg.method}\` } })}\\n\`);
        } catch {}
      }
    };

    const timer = setTimeout(() => {
      try { child.kill('SIGTERM'); } catch {}
      finish({ ok: false, timedOut: true, error: \`ACP Agent 执行超时（超过 \${Math.round(options.timeoutMs / 1000)} 秒）\` });
    }, options.timeoutMs);

    child.stdout.on('data', (chunk) => {
      stdoutBuf += chunk.toString('utf8');
      let idx;
      while ((idx = stdoutBuf.indexOf('\\n')) >= 0) {
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
        finish({ ok: false, error: stderrText.trim() || \`ACP Agent 提前退出（退出码 \${code ?? '未知'}）\` });
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
        thinking: thoughtChunks.join('\\n\\n').trim(),
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
  const finalText = (parsed.text || parsed.allTexts.join('\\n\\n') || '').trim();
  const cleanStderr = proc.stderr
    .split(/\\r?\\n/)
    .filter(line => !/^Warning:\\s+No project session found with id\\b/i.test(line.trim()))
    .join('\\n')
    .trim();
  if (!finalText) {
    return {
      ok: false,
      cwd,
      timedOut: proc.timedOut,
      error: proc.timedOut
        ? \`pi 执行超时（超过 \${Math.round(timeoutMs / 1000)} 秒）\`
        : parsed.errorMessage
          || (proc.truncated ? 'pi JSON 输出流超出缓冲区上限，未能提取最终回复。' : '')
          || cleanStderr
          || (proc.ok ? '本机 pi 未返回有效文本内容，请检查模型或额度配置。' : \`pi 执行失败（退出码 \${proc.exitCode ?? '未知'}）\`),
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
      error: proc.timedOut ? \`Claude Code 执行超时（超过 \${Math.round(timeoutMs / 1000)} 秒）\` : parsed.errorMessage || proc.stderr.trim() || \`Claude Code 执行失败（退出码 \${proc.exitCode ?? '未知'}）\`,
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
      error: proc.timedOut ? \`Codex 执行超时（超过 \${Math.round(timeoutMs / 1000)} 秒）\` : parsed.errorMessage || proc.stderr.trim() || \`Codex 执行失败（退出码 \${proc.exitCode ?? '未知'}）\`,
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
      error: proc.timedOut ? \`OpenCode 执行超时\` : parsed.errorMessage || proc.stderr.trim() || \`OpenCode 执行失败（退出码 \${proc.exitCode ?? '未知'}）\`,
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
    .replace(/&#(\\d+);/g, (_, code) => {
      const n = Number(code);
      return Number.isFinite(n) ? String.fromCodePoint(n) : '';
    })
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\s+/g, ' ')
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
    .replace(/<!--[\\s\\S]*?-->/g, ' ')
    .replace(/!\\[[^\\]]*\\]\\([^)]*\\)/g, ' ')
    .replace(/<img\\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\`\`\`[\\s\\S]{600,}?\`\`\`/g, '[代码示例略]')
    .replace(/\\r\\n?/g, '\\n')
    .replace(/\\n{3,}/g, '\\n\\n')
    .replace(/[ \\t]{2,}/g, ' ')
    .trim();
  return cleaned.length <= maxChars ? cleaned : \`\${cleaned.slice(0, maxChars).trim()}…\`;
}

export async function runNativeGitHubTrending(request) {
  const rawTopN = Number(request?.topN);
  const topN = Number.isFinite(rawTopN) ? Math.max(1, Math.min(25, Math.round(rawTopN))) : 10;
  const since = request?.since === 'weekly' || request?.since === 'monthly' ? request.since : 'daily';

  let repos = [];
  let sourceLabel = '';
  let primaryErr = '';

  try {
    const resp = await fetch(\`https://github.com/trending?since=\${since}\`, {
      headers: { Accept: 'text/html,application/xhtml+xml', 'User-Agent': 'tab-project-native-host' },
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) throw new Error(\`HTTP \${resp.status}\`);
    const html = await resp.text();
    const rows = html.match(/<article[^>]*class="[^"]*Box-row[^"]*"[^>]*>[\\s\\S]*?<\\/article>/gi) || [];
    const seen = new Set();
    for (const row of rows) {
      if (repos.length >= topN) break;
      const m = row.match(/<h2[^>]*>[\\s\\S]*?<a[^>]*href="\\/([A-Za-z0-9_.-]+\\/[A-Za-z0-9_.-]+)"/i);
      const fullName = m?.[1]?.trim() || '';
      if (!fullName || seen.has(fullName) || fullName.split('/').some(p => p === '.' || p === '..')) continue;
      seen.add(fullName);
      const [owner, name] = fullName.split('/');
      const descM = row.match(/<p[^>]*class="[^"]*color-fg-muted[^"]*"[^>]*>([\\s\\S]*?)<\\/p>/i);
      const langM = row.match(/itemprop="programmingLanguage"[^>]*>([\\s\\S]*?)<\\/span>/i);
      const starM = row.match(/href="\\/[^"]+\\/stargazers"[^>]*>[\\s\\S]*?<\\/svg>([\\s\\S]*?)<\\/a>/i);
      const todayM = row.match(/([\\d,]+)\\s+stars?\\s+(?:today|this week|this month)/i);
      repos.push({
        rank: repos.length + 1,
        fullName,
        owner,
        name,
        url: \`https://github.com/\${encodeURIComponent(owner)}/\${encodeURIComponent(name)}\`,
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
        \`https://api.github.com/search/repositories?q=\${encodeURIComponent(\`is:public created:>\${date}\`)}&sort=stars&order=desc&per_page=\${topN}\`,
        { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tab-project-native-host' }, signal: AbortSignal.timeout(15000) }
      );
      if (!apiResp.ok) throw new Error(\`HTTP \${apiResp.status}\`);
      const data = await apiResp.json();
      for (const item of Array.isArray(data?.items) ? data.items.slice(0, topN) : []) {
        const fullName = typeof item?.full_name === 'string' ? item.full_name.trim() : '';
        if (!/^[A-Za-z0-9_.-]+\\/[A-Za-z0-9_.-]+$/.test(fullName)) continue;
        const [owner, name] = fullName.split('/');
        repos.push({
          rank: repos.length + 1,
          fullName,
          owner,
          name,
          url: \`https://github.com/\${encodeURIComponent(owner)}/\${encodeURIComponent(name)}\`,
          description: typeof item.description === 'string' ? item.description.trim() : '',
          language: typeof item.language === 'string' ? item.language.trim() : '',
          stars: Number(item.stargazers_count) || 0,
          todayStars: 0,
        });
      }
      sourceLabel = \`GitHub Search 热榜（\${date} 起 · 本机桥接）\`;
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      return { ok: false, error: \`本机节点读取 GitHub 失败（Trending: \${primaryErr || '空结果'}；API: \${msg}）\` };
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
          const r = await fetch(\`https://raw.githubusercontent.com/\${encodeURIComponent(repo.owner)}/\${encodeURIComponent(repo.name)}/\${branch}/README.md\`, {
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
          const r = await fetch(\`https://api.github.com/repos/\${repo.fullName}/readme\`, {
            headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tab-project-native-host' },
            signal: AbortSignal.timeout(8000),
          });
          if (r.ok) {
            const d = await r.json();
            if (d?.encoding === 'base64' && typeof d.content === 'string') {
              const txt = Buffer.from(d.content.replace(/\\s/g, ''), 'base64').toString('utf8');
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
        return { ok: false, id, action, error: \`未在本机检测到 \${def?.name || agentId} (\${def?.bin})。\` };
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
      if (!resolvedBin) return { ok: false, id, action, error: \`未找到可执行命令：\${tokens[0]}\` };
      res = await runAcpPrompt(resolvedBin, tokens.slice(1), {
        cwd,
        prompt,
        externalSessionId: request?.externalSessionId,
        toolsEnabled: request?.toolsEnabled !== false,
        timeoutMs: clampTimeout(request?.timeoutMs, 120000),
        agentName: typeof request?.agentName === 'string' ? request.agentName : tokens[0],
      });
    } else {
      return { ok: false, id, action, error: \`未知的本机 Agent 类型：\${agentId}\` };
    }

    return { id, action, ...res };
  }

  return { ok: false, id, error: \`Unsupported action: \${action || '(empty)'}\` };
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
`;
function Te(S, M = se()) {
  if (M === "windows") {
    const g = "tab-project-install.cmd";
    return {
      filename: g,
      content: we(S, le),
      mimeType: "text/plain;charset=utf-8",
      runHint: `双击下载的 ${g} 即可自动安装`
    };
  }
  const h = "tab-project-install.sh";
  return {
    filename: h,
    content: xe(S, le),
    mimeType: "text/x-shellscript;charset=utf-8",
    runHint: `sh ~/Downloads/${h}`
  };
}
function Ae(S) {
  return `'${S.replace(/'/g, "'\\''")}'`;
}
async function Me(S, M) {
  if (!chrome?.downloads?.search) return "";
  for (let g = 0; g < 20; g++) {
    const [y] = await chrome.downloads.search({ id: S });
    if (y?.state === "complete" && y.filename) return y.filename;
    if (y?.state === "interrupted") return "";
    await new Promise((f) => setTimeout(f, 100));
  }
  const [h] = await chrome.downloads.search({ id: S });
  return h?.filename || M;
}
async function _e(S, M = se()) {
  const { filename: h, content: g, mimeType: y, runHint: f } = Te(S, M), a = new Blob([g], { type: y }), v = URL.createObjectURL(a);
  if (typeof chrome < "u" && chrome.downloads?.download)
    try {
      const k = await chrome.downloads.download({
        url: v,
        filename: h,
        conflictAction: "overwrite",
        saveAs: !1
      }), b = await Me(k, h);
      setTimeout(() => URL.revokeObjectURL(v), 5e3);
      const C = M === "windows" ? f : b ? `sh ${Ae(b)}` : f;
      return { filename: h, runHint: C, downloadId: k };
    } catch {
    }
  const i = document.createElement("a");
  return i.href = v, i.download = h, i.style.display = "none", document.body.appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(v), 5e3), { filename: h, runHint: f };
}
const Pe = { class: "native-settings" }, Ee = {
  key: 0,
  class: "hero-card"
}, Oe = ["disabled"], Ne = {
  key: 1,
  class: "guide-card"
}, Be = { class: "steps" }, $e = {
  key: 0,
  class: "cmd-box"
}, je = { class: "actions" }, qe = ["disabled"], Ue = ["disabled"], Le = { class: "form-card" }, Re = {
  key: 0,
  class: "agent-grid"
}, De = {
  key: 1,
  class: "warn-box"
}, He = ["disabled"], Je = { class: "row-inline" }, Ge = ["disabled"], Ve = ["disabled"], Ke = { class: "toggle-row" }, ze = ["disabled"], Fe = { class: "form-card" }, We = { class: "preset-row" }, Xe = ["onClick"], Ze = { class: "row-inline" }, Ye = ["disabled"], Qe = ["disabled"], en = ["disabled"], nn = ["disabled", "onClick"], tn = {
  key: 3,
  class: "note",
  role: "status"
}, sn = { class: "advanced" }, on = { class: "advanced-body" }, rn = { class: "row-inline" }, an = ["disabled"], ln = ["disabled"], dn = ["disabled"], un = { class: "sub" }, cn = /* @__PURE__ */ de({
  __name: "NativeSettings",
  emits: ["connectionChanged", "busyChanged"],
  setup(S, { emit: M }) {
    const h = M, g = m(se()), y = m(typeof chrome < "u" && chrome.runtime?.id ? String(chrome.runtime.id) : ""), f = m(!1), a = m(null), v = m(!1), i = m(""), k = m(!0), b = m([]), C = m(""), I = m(""), T = m(""), N = m(""), s = m(!1), d = m("");
    let w = null, $ = !1;
    const U = [
      { name: "Claude Code (ACP)", command: "claude-agent-acp" },
      { name: "Codex (ACP)", command: "codex-acp" },
      { name: "Gemini CLI (ACP)", command: "gemini --acp" }
    ];
    function _() {
      w !== null && (clearInterval(w), w = null);
    }
    function K() {
      _(), w = setInterval(async () => {
        if (!($ || a.value || !f.value)) {
          $ = !0;
          try {
            const e = await X();
            a.value = e, v.value = !1, i.value || (i.value = e.defaultCwd), d.value = "已自动检测到本机连接！", _(), h("connectionChanged");
          } catch {
          } finally {
            $ = !1;
          }
        }
      }, 2e3);
    }
    async function L() {
      f.value = await te();
      const e = await Ce();
      if (i.value = e.defaultCwd, k.value = e.piToolsEnabled, b.value = e.acpProfiles, f.value)
        try {
          a.value = await X(), v.value = !1, i.value || (i.value = a.value.defaultCwd), _();
        } catch {
          a.value = null;
        }
      else
        a.value = null;
    }
    ue(() => {
      L();
    }), me(() => {
      _();
    });
    async function z() {
      if (!y.value) throw new Error("未能获取扩展 ID，请在扩展页内打开设置。");
      const e = await _e(y.value, g.value);
      N.value = e.filename, T.value = e.runHint, v.value = !0;
      let t = !1;
      if (g.value !== "windows" && navigator.clipboard?.writeText)
        try {
          await navigator.clipboard.writeText(e.runHint), t = !0;
        } catch {
        }
      d.value = g.value === "windows" ? `已下载 ${e.filename}，直接双击运行即可完成安装。` : t ? `已下载 ${e.filename} 并自动复制安装命令！打开终端按 ⌘+V 粘贴回车即可。` : `已下载 ${e.filename}，请在终端运行下方命令完成安装。`, K();
    }
    async function Z() {
      if (!s.value) {
        s.value = !0, h("busyChanged", !0), d.value = "";
        try {
          const t = await te() || await Se();
          if (f.value = t, !t) {
            d.value = "你取消了权限授权；需要时可再次点击开启。";
            return;
          }
          try {
            const o = await X();
            a.value = o, v.value = !1, i.value || (i.value = o.defaultCwd), d.value = "本机终端与 Agent 已就绪。", h("connectionChanged");
            return;
          } catch (o) {
            const P = o instanceof Error ? o.message : "";
            if (P.includes("未向扩展开放 Native Messaging") || P.includes("尚未授予 nativeMessaging")) {
              d.value = P;
              return;
            }
            await z(), h("connectionChanged");
          }
        } catch (e) {
          d.value = e instanceof Error ? e.message : "开启失败，请重试。";
        } finally {
          s.value = !1, h("busyChanged", !1);
        }
      }
    }
    async function Y() {
      if (T.value)
        try {
          await navigator.clipboard.writeText(T.value), d.value = "已复制安装命令到剪贴板。";
        } catch {
          d.value = "复制失败，请手动选中命令复制。";
        }
    }
    async function J() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          await z();
        } catch (e) {
          d.value = e instanceof Error ? e.message : "下载失败。";
        } finally {
          s.value = !1;
        }
      }
    }
    async function G() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          f.value = await te();
          const e = await X();
          a.value = e, v.value = !1, _(), i.value || (i.value = e.defaultCwd), d.value = `连接成功：${e.platform} · Host v${e.hostVersion}`, h("connectionChanged");
        } catch (e) {
          a.value = null, d.value = e instanceof Error ? e.message : "尚未检测到本机连接。", h("connectionChanged");
        } finally {
          s.value = !1;
        }
      }
    }
    async function j() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          await Ie({
            defaultCwd: i.value,
            piToolsEnabled: k.value,
            acpProfiles: b.value
          }), d.value = "本机终端与 Agent 设置已保存。", h("connectionChanged");
        } catch (e) {
          d.value = e instanceof Error ? e.message : "保存失败。";
        } finally {
          s.value = !1;
        }
      }
    }
    function Q(e) {
      C.value = e.name, I.value = e.command;
    }
    async function ee() {
      const e = C.value.trim(), t = I.value.trim();
      !e || !t || s.value || (b.value = [...b.value, { id: crypto.randomUUID(), name: e, command: t }], C.value = "", I.value = "", await j());
    }
    async function r(e) {
      s.value || (b.value = b.value.filter((t) => t.id !== e), await j());
    }
    return (e, t) => (l(), u("div", Pe, [
      t[25] || (t[25] = fe('<p class="intro" data-v-f7457c34> 通过 Chrome 原生 Native Messaging 连接本机 Agent CLI（支持 <strong data-v-f7457c34>Pi</strong>、<strong data-v-f7457c34>Claude Code</strong>、<strong data-v-f7457c34>Codex</strong>、<strong data-v-f7457c34>Gemini CLI</strong>、<strong data-v-f7457c34>OpenCode</strong> 及任意 <strong data-v-f7457c34>ACP</strong> 协议工具）。 </p>', 1)),
      n("div", {
        class: R(["status-bar", { ready: !!a.value }])
      }, [
        t[5] || (t[5] = n("span", null, null, -1)),
        a.value ? (l(), u(x, { key: 0 }, [
          c(" 已连接（" + p(a.value.platform === "darwin" ? "macOS" : a.value.platform) + " · Node " + p(a.value.nodeVersion) + " · Host v" + p(a.value.hostVersion) + "） ", 1)
        ], 64)) : v.value ? (l(), u(x, { key: 1 }, [
          c(" 正在等待本机完成安装（安装后会自动变绿）… ")
        ], 64)) : f.value ? (l(), u(x, { key: 2 }, [
          c(" 已授权，等待完成本机一键安装 ")
        ], 64)) : (l(), u(x, { key: 3 }, [
          c(" 未开启 ")
        ], 64))
      ], 2),
      !a.value && !v.value ? (l(), u("section", Ee, [
        n("button", {
          type: "button",
          class: "primary big-btn",
          disabled: s.value,
          onClick: Z
        }, p(s.value ? "正在准备…" : "一键开启本机终端"), 9, Oe),
        t[6] || (t[6] = n("p", { class: "sub" }, " 点击后自动配置零端口本机桥接并扫描已安装的 Agent CLI（需要本机已安装 Node.js 20+）。 ", -1))
      ])) : !a.value && v.value ? (l(), u("section", Ne, [
        g.value === "windows" ? (l(), u(x, { key: 0 }, [
          t[9] || (t[9] = n("div", { class: "guide-title" }, "只差最后一步：双击运行下载的文件", -1)),
          n("ol", Be, [
            n("li", null, [
              t[7] || (t[7] = c("在浏览器右上角下载记录里，直接点击打开 ", -1)),
              n("code", null, p(N.value || "tab-project-install.cmd"), 1)
            ]),
            t[8] || (t[8] = n("li", null, "等黑框提示「完成」后，这里会自动连接，无需其他操作", -1))
          ])
        ], 64)) : (l(), u(x, { key: 1 }, [
          t[10] || (t[10] = n("div", { class: "guide-title" }, "只差最后一步：在终端粘贴回车（命令已自动复制）", -1)),
          t[11] || (t[11] = n("ol", { class: "steps" }, [
            n("li", null, [
              c("打开「终端」（Mac 按 "),
              n("code", null, "⌘ + 空格"),
              c(" 输入 "),
              n("code", null, "Terminal"),
              c(" 回车）")
            ]),
            n("li", null, [
              c("按 "),
              n("code", null, "⌘ + V"),
              c(" 粘贴并按回车运行，完成后这里会自动变为已连接")
            ])
          ], -1)),
          T.value ? (l(), u("div", $e, [
            n("code", null, p(T.value), 1),
            n("button", {
              type: "button",
              onClick: Y
            }, "复制")
          ])) : q("", !0)
        ], 64)),
        n("div", je, [
          n("button", {
            type: "button",
            disabled: s.value,
            onClick: G
          }, "立即检测", 8, qe),
          n("button", {
            type: "button",
            disabled: s.value,
            onClick: J
          }, "重新下载", 8, Ue)
        ])
      ])) : (l(), u(x, { key: 2 }, [
        n("section", Le, [
          t[15] || (t[15] = n("div", { class: "step-head" }, "已发现的本机 Agent CLI", -1)),
          a.value?.agents?.length ? (l(), u("div", Re, [
            (l(!0), u(x, null, D(a.value.agents, (o) => (l(), u("span", {
              key: o.id,
              class: R(["agent-chip", { on: o.installed }])
            }, [
              t[12] || (t[12] = n("i", null, null, -1)),
              c(p(o.name), 1)
            ], 2))), 128))
          ])) : (l(), u("div", De, [
            t[13] || (t[13] = c(" 当前本机桥接脚本版本较旧，需要更新一次才能开启多 Agent 与 ACP 支持。 ", -1)),
            n("button", {
              type: "button",
              disabled: s.value,
              onClick: J
            }, "下载最新安装脚本", 8, He)
          ])),
          t[16] || (t[16] = n("label", { for: "native-cwd" }, "默认工作目录（留空则使用主目录）", -1)),
          n("div", Je, [
            O(n("input", {
              id: "native-cwd",
              "onUpdate:modelValue": t[0] || (t[0] = (o) => i.value = o),
              type: "text",
              disabled: s.value,
              placeholder: "/Users/kongzhu/..."
            }, null, 8, Ge), [
              [H, i.value]
            ]),
            n("button", {
              type: "button",
              disabled: s.value,
              onClick: j
            }, "保存", 8, Ve)
          ]),
          n("label", Ke, [
            O(n("input", {
              "onUpdate:modelValue": t[1] || (t[1] = (o) => k.value = o),
              type: "checkbox",
              disabled: s.value,
              onChange: j
            }, null, 40, ze), [
              [ge, k.value]
            ]),
            t[14] || (t[14] = n("span", null, "允许本机 Agent 使用工具（读写文件、执行命令）", -1))
          ])
        ]),
        n("section", Fe, [
          t[17] || (t[17] = n("div", { class: "step-head" }, "自定义 ACP Agent（JSON-RPC over stdio）", -1)),
          t[18] || (t[18] = n("p", { class: "sub" }, [
            c("添加任意支持 Agent Client Protocol 的命令行工具（如 "),
            n("code", null, "claude-agent-acp"),
            c("、"),
            n("code", null, "codex-acp"),
            c("、"),
            n("code", null, "gemini --acp"),
            c("）。")
          ], -1)),
          n("div", We, [
            (l(), u(x, null, D(U, (o) => n("button", {
              key: o.command,
              type: "button",
              class: "preset-btn",
              onClick: (P) => Q(o)
            }, " + " + p(o.name), 9, Xe)), 64))
          ]),
          n("div", Ze, [
            O(n("input", {
              "onUpdate:modelValue": t[2] || (t[2] = (o) => C.value = o),
              type: "text",
              disabled: s.value,
              placeholder: "显示名称（如 Claude ACP）"
            }, null, 8, Ye), [
              [H, C.value]
            ]),
            O(n("input", {
              "onUpdate:modelValue": t[3] || (t[3] = (o) => I.value = o),
              type: "text",
              disabled: s.value,
              placeholder: "启动命令（如 npx -y @agentclientprotocol/claude-agent-acp）"
            }, null, 8, Qe), [
              [H, I.value]
            ]),
            n("button", {
              type: "button",
              disabled: s.value || !C.value.trim() || !I.value.trim(),
              onClick: ee
            }, "添加", 8, en)
          ]),
          (l(!0), u(x, null, D(b.value, (o) => (l(), u("div", {
            key: o.id,
            class: "profile-row"
          }, [
            n("div", null, [
              n("strong", null, p(o.name), 1),
              n("code", null, p(o.command), 1)
            ]),
            n("button", {
              type: "button",
              disabled: s.value,
              onClick: (P) => r(o.id)
            }, "删除", 8, nn)
          ]))), 128))
        ])
      ], 64)),
      d.value ? (l(), u("p", tn, p(d.value), 1)) : q("", !0),
      n("details", sn, [
        t[24] || (t[24] = n("summary", null, "高级选项 / 切换系统或手动检测", -1)),
        n("div", on, [
          n("div", rn, [
            O(n("select", {
              "onUpdate:modelValue": t[4] || (t[4] = (o) => g.value = o),
              "aria-label": "选择操作系统",
              disabled: s.value
            }, [...t[19] || (t[19] = [
              n("option", { value: "macos-linux" }, "macOS / Linux (.sh)", -1),
              n("option", { value: "windows" }, "Windows (.cmd)", -1)
            ])], 8, an), [
              [ce, g.value]
            ]),
            n("button", {
              type: "button",
              disabled: s.value || !y.value,
              onClick: J
            }, "下载安装脚本", 8, ln),
            n("button", {
              type: "button",
              disabled: s.value,
              onClick: G
            }, "检测连接", 8, dn)
          ]),
          n("p", un, [
            t[20] || (t[20] = c(" 扩展 ID：", -1)),
            n("code", null, p(y.value || "未知"), 1),
            t[21] || (t[21] = c(" · 如需彻底卸载，运行下载的脚本并加上 ", -1)),
            t[22] || (t[22] = n("code", null, "--uninstall", -1)),
            t[23] || (t[23] = c(" 参数即可。 ", -1))
          ])
        ])
      ])
    ]));
  }
}), pn = /* @__PURE__ */ pe(cn, [["__scopeId", "data-v-f7457c34"]]), mn = {
  class: "settings-dialog",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "ai-settings-title"
}, fn = { class: "nav" }, gn = ["disabled"], vn = ["disabled"], hn = { id: "ai-settings-title" }, yn = ["disabled"], bn = {
  class: "presets-box",
  "aria-label": "常用模型服务预设"
}, kn = { class: "preset-group-label" }, wn = { class: "preset-pills" }, xn = ["disabled", "onClick"], Cn = { class: "preset-note" }, Sn = { class: "form-card" }, In = ["disabled"], Tn = { for: "byok-key" }, An = { class: "field-tag" }, Mn = ["disabled", "placeholder"], _n = { class: "model-row" }, Pn = ["disabled"], En = ["value"], On = ["value"], Nn = ["disabled"], Bn = ["disabled"], $n = { class: "actions" }, jn = ["disabled"], qn = ["disabled"], Un = { class: "info" }, Ln = ["href"], Rn = {
  key: 0,
  class: "note",
  role: "status"
}, Dn = /* @__PURE__ */ de({
  __name: "AiSettings",
  props: {
    initialTab: {}
  },
  emits: ["close", "connectionChanged", "configChanged", "busyChanged"],
  setup(S, { emit: M }) {
    const h = S, g = M, y = m(h.initialTab), f = m("deepseek"), a = m("https://api.deepseek.com"), v = m(""), i = m(""), k = m([]), b = m(!1), C = m(""), I = m(""), T = m(""), N = m(!1), s = m(!1), d = m(""), w = E(() => ie(f.value)), $ = E(() => ke(a.value)), U = E(() => re(f.value, a.value)), _ = E(() => {
      if (!b.value || !T.value) return !1;
      try {
        return W(a.value) === T.value;
      } catch {
        return !1;
      }
    }), K = E(() => !!v.value.trim() || _.value && N.value), L = E(() => {
      const r = [
        ...k.value,
        ...w.value.suggestedModels,
        ...ne(i.value) ? [i.value.trim()] : []
      ];
      return [...new Set(r.filter(Boolean))];
    }), z = E(() => !s.value && !!a.value.trim() && (!U.value || K.value)), Z = E(() => !s.value && !!a.value.trim() && ne(i.value) && (!U.value || K.value)), Y = E(() => [
      { id: "cn", title: "国内 / 直连", items: V.filter((r) => r.group === "cn") },
      { id: "global", title: "全球 / 聚合", items: V.filter((r) => r.group === "global") },
      { id: "local", title: "本机免费（免 Key）", items: V.filter((r) => r.group === "local") },
      { id: "custom", title: "其他", items: V.filter((r) => r.group === "custom") }
    ]);
    ue(async () => {
      try {
        const r = await F();
        f.value = r.presetId, a.value = r.baseUrl, i.value = r.model, k.value = r.models, b.value = r.configured, C.value = r.label, I.value = r.model, T.value = r.baseUrl, N.value = !!r.key, r.configured && (!U.value || r.key) && j(!0);
      } catch {
        d.value = "读取本机设置失败。";
      }
    });
    function J(r) {
      if (s.value) return;
      const e = ie(r);
      f.value = e.id, d.value = "", e.baseUrl ? a.value = e.baseUrl : r === "custom" && f.value === "custom" && V.some((t) => t.id !== "custom" && t.baseUrl === a.value) && (a.value = ""), k.value = [], _.value || (v.value = ""), i.value = e.defaultModel || e.suggestedModels[0] || "";
    }
    function G(r) {
      const e = v.value.trim();
      if (e) return e;
      try {
        if (W(a.value) === r.baseUrl)
          return r.key;
      } catch {
      }
      return "";
    }
    async function j(r = !1) {
      if (!s.value) {
        s.value = !0, r || (d.value = "");
        try {
          const e = await F(), t = W(a.value);
          a.value = t;
          const o = G(e), P = f.value === "custom" ? "自定义服务" : w.value.name, B = await ye({
            baseUrl: t,
            key: o,
            label: P,
            requiresKey: re(f.value, t)
          });
          if (k.value = B, !B.includes(i.value.trim())) {
            const A = w.value.defaultModel;
            i.value = A && B.includes(A) ? A : B[0];
          }
          !v.value.trim() && _.value && e.configured && (await ae({
            presetId: f.value,
            label: f.value === "custom" ? void 0 : w.value.name,
            baseUrl: t,
            key: o,
            model: i.value.trim(),
            models: B
          }), I.value = i.value.trim(), g("configChanged")), r || (d.value = `已获取 ${B.length} 个可用模型。`);
        } catch (e) {
          r || (d.value = e instanceof Error ? e.message : "获取模型失败");
        } finally {
          s.value = !1;
        }
      }
    }
    async function Q() {
      if (!s.value) {
        s.value = !0, d.value = "";
        try {
          const r = await F(), e = W(a.value);
          a.value = e;
          const t = G(r), o = i.value.trim();
          if (!ne(o))
            throw new Error("请选择或填写有效的模型 ID（例如 deepseek-chat / qwen2.5:7b / gpt-4o-mini）。");
          const P = k.value.length ? k.value : L.value, B = [...new Set([o, ...P].filter(Boolean))];
          await ae({
            presetId: f.value,
            label: f.value === "custom" ? void 0 : w.value.name,
            baseUrl: e,
            key: t,
            model: o,
            models: B
          });
          const A = await F();
          v.value = "", b.value = A.configured, C.value = A.label, I.value = A.model, T.value = A.baseUrl, N.value = !!A.key, d.value = `已保存设置：${A.label}（${A.model}）。`, g("configChanged");
        } catch (r) {
          d.value = r instanceof Error ? r.message : "保存失败";
        } finally {
          s.value = !1;
        }
      }
    }
    async function ee() {
      if (!s.value) {
        s.value = !0;
        try {
          await be(), v.value = "", b.value = !1, C.value = "", I.value = "", T.value = "", N.value = !1, d.value = "已清除本机保存的模型接入与 Key（不会删除聊天记录）。", g("configChanged");
        } catch {
          d.value = "移除失败，请重试。";
        } finally {
          s.value = !1;
        }
      }
    }
    return (r, e) => (l(), u("div", {
      class: "settings-overlay",
      onClick: e[11] || (e[11] = oe((t) => !s.value && g("close"), ["self"])),
      onKeydown: e[12] || (e[12] = he(oe((t) => !s.value && g("close"), ["stop"]), ["esc"]))
    }, [
      n("section", mn, [
        n("aside", fn, [
          e[15] || (e[15] = n("div", { class: "nav-heading" }, [
            n("span", null, "✦"),
            n("div", null, [
              n("strong", null, "AI 工作区"),
              n("small", null, "模型与终端设置")
            ])
          ], -1)),
          e[16] || (e[16] = n("p", null, "服务提供商", -1)),
          n("button", {
            type: "button",
            disabled: s.value,
            class: R({ selected: y.value === "deepseek" }),
            onClick: e[0] || (e[0] = (t) => y.value = "deepseek")
          }, [...e[13] || (e[13] = [
            n("span", { class: "provider-icon" }, "☁", -1),
            c(" 模型服务 ", -1),
            n("i", null, "兼容", -1)
          ])], 10, gn),
          n("button", {
            type: "button",
            disabled: s.value,
            class: R({ selected: y.value === "native" }),
            onClick: e[1] || (e[1] = (t) => y.value = "native")
          }, [...e[14] || (e[14] = [
            n("span", { class: "provider-icon native" }, ">_", -1),
            c(" 本机终端 ", -1),
            n("i", null, "Native", -1)
          ])], 10, vn),
          e[17] || (e[17] = n("small", { class: "nav-foot" }, "支持国内外大模型、OpenRouter 及本机 Ollama（免 Key）", -1))
        ]),
        n("main", null, [
          n("header", null, [
            n("div", null, [
              n("small", null, "服务设置 / " + p(y.value === "deepseek" ? "通用 OpenAI 兼容 & 本机模型" : "本机终端"), 1),
              n("h2", hn, p(y.value === "deepseek" ? "模型服务接入" : "本机终端桥接"), 1)
            ]),
            n("button", {
              class: "close",
              type: "button",
              disabled: s.value,
              "aria-label": "关闭设置",
              onClick: e[2] || (e[2] = (t) => g("close"))
            }, "✕", 8, yn)
          ]),
          y.value === "deepseek" ? (l(), u(x, { key: 0 }, [
            e[24] || (e[24] = n("p", { class: "intro" }, [
              c(" 支持 "),
              n("strong", null, "OpenAI 兼容接口"),
              c(" 与 "),
              n("strong", null, "本机 Ollama / LM Studio"),
              c("：无需安装命令行桥接，对话与自动化任务都可直接调用。 ")
            ], -1)),
            n("div", {
              class: R(["status", { ready: b.value }])
            }, [
              e[18] || (e[18] = n("span", null, null, -1)),
              c(" " + p(b.value ? `已在本机就绪：${C.value} · ${I.value}` : "尚未配置可用模型服务"), 1)
            ], 2),
            n("section", bn, [
              (l(!0), u(x, null, D(Y.value, (t) => (l(), u("div", {
                key: t.id,
                class: "preset-group"
              }, [
                n("span", kn, p(t.title), 1),
                n("div", wn, [
                  (l(!0), u(x, null, D(t.items, (o) => (l(), u("button", {
                    key: o.id,
                    type: "button",
                    class: R(["preset-pill", { active: f.value === o.id }]),
                    disabled: s.value,
                    onClick: (P) => J(o.id)
                  }, [
                    n("span", null, p(o.name), 1),
                    n("small", null, p(o.shortTag), 1)
                  ], 10, xn))), 128))
                ])
              ]))), 128)),
              n("p", Cn, p(w.value.note), 1)
            ]),
            n("section", Sn, [
              e[20] || (e[20] = n("label", { for: "byok-base-url" }, "接口地址（Base URL）", -1)),
              O(n("input", {
                id: "byok-base-url",
                "onUpdate:modelValue": e[3] || (e[3] = (t) => a.value = t),
                type: "url",
                autocomplete: "off",
                disabled: s.value,
                placeholder: "例如 https://api.deepseek.com 或 http://localhost:11434/v1",
                onInput: e[4] || (e[4] = (t) => k.value = [])
              }, null, 40, In), [
                [
                  H,
                  a.value,
                  void 0,
                  { trim: !0 }
                ]
              ]),
              n("p", null, p($.value ? "本机/局域网地址可直接 HTTP 直连；无需填写完整 /chat/completions 后缀。" : "支持官方地址或兼容 OpenAI 协议的中转网关（https://）。"), 1),
              n("label", Tn, [
                e[19] || (e[19] = c(" API Key ", -1)),
                n("span", An, p(U.value ? "必填" : "本机/自定义可留空"), 1)
              ]),
              O(n("input", {
                id: "byok-key",
                "onUpdate:modelValue": e[5] || (e[5] = (t) => v.value = t),
                type: "password",
                autocomplete: "off",
                disabled: s.value,
                placeholder: _.value && N.value ? "已保存当前服务 Key；留空继续使用现有 Key" : w.value.keyPlaceholder
              }, null, 8, Mn), [
                [H, v.value]
              ]),
              e[21] || (e[21] = n("p", null, "Key 仅保存在浏览器扩展本地存储，不进入普通同步备份。", -1)),
              e[22] || (e[22] = n("label", { for: "byok-model-input" }, "默认模型", -1)),
              n("div", _n, [
                L.value.length ? O((l(), u("select", {
                  key: 0,
                  "onUpdate:modelValue": e[6] || (e[6] = (t) => i.value = t),
                  "aria-label": "选择预设或已获取的模型",
                  disabled: s.value
                }, [
                  L.value.includes(i.value) ? q("", !0) : (l(), u("option", {
                    key: 0,
                    value: i.value
                  }, p(i.value || "选择模型"), 9, En)),
                  (l(!0), u(x, null, D(L.value, (t) => (l(), u("option", {
                    key: t,
                    value: t
                  }, p(t), 9, On))), 128))
                ], 8, Pn)), [
                  [ce, i.value]
                ]) : q("", !0),
                n("button", {
                  type: "button",
                  disabled: !z.value,
                  onClick: e[7] || (e[7] = (t) => j(!1))
                }, p(s.value ? "获取中…" : $.value ? "探测本机模型" : "获取模型列表"), 9, Nn)
              ]),
              O(n("input", {
                id: "byok-model-input",
                "onUpdate:modelValue": e[8] || (e[8] = (t) => i.value = t),
                type: "text",
                autocomplete: "off",
                disabled: s.value,
                placeholder: "也可直接输入任意模型 ID，例如 qwen2.5:7b / deepseek-chat / gpt-4o-mini"
              }, null, 8, Bn), [
                [
                  H,
                  i.value,
                  void 0,
                  { trim: !0 }
                ]
              ]),
              e[23] || (e[23] = n("p", null, "若接口未开放 /models 列表，直接手动输入模型 ID 也可正常保存并使用。", -1)),
              n("div", $n, [
                n("button", {
                  class: "primary",
                  type: "button",
                  disabled: !Z.value,
                  onClick: Q
                }, "保存设置", 8, jn),
                b.value ? (l(), u("button", {
                  key: 0,
                  type: "button",
                  disabled: s.value,
                  onClick: ee
                }, "清除配置", 8, qn)) : q("", !0)
              ])
            ]),
            n("div", Un, [
              c(p($.value ? "本机推理完全免费、数据不出电脑。" : "对话与自动化摘要会发送至你所选的模型服务，并按对应平台规则计费；聊天记录仅保存在本机。") + " ", 1),
              w.value.docsUrl ? (l(), u("a", {
                key: 0,
                href: w.value.docsUrl,
                target: "_blank",
                rel: "noreferrer"
              }, p(w.value.docsLabel), 9, Ln)) : q("", !0)
            ]),
            d.value ? (l(), u("p", Rn, p(d.value), 1)) : q("", !0)
          ], 64)) : (l(), ve(pn, {
            key: 1,
            onConnectionChanged: e[9] || (e[9] = (t) => g("connectionChanged")),
            onBusyChanged: e[10] || (e[10] = (t) => {
              s.value = t, g("busyChanged", t);
            })
          }))
        ])
      ])
    ], 32));
  }
}), Kn = /* @__PURE__ */ pe(Dn, [["__scopeId", "data-v-b89fc3d0"]]);
export {
  Kn as default
};
