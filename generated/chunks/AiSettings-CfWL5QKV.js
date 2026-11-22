import { d as fe, b as c, o as ve, G as we, f as d, g as u, y as xe, h as e, q as K, F as C, m, t as v, j as R, i as W, p as j, v as V, L as Ce, M as ge, l as Se, I as Ie, k as de, s as L } from "./vendor-vue-C-_ocEUS.js";
import { q as le, t as Ae, u as Te, j as ae, a as Me, p as ee, v as _e, i as Pe, l as ne, w as Ee, x as te, y as Oe, z as ue, A as ce, C as pe, D as je, E as ie, O as Y, F as Ne, G as Be, H as $e } from "./workspace-bridge-Cv_xUC_B.js";
import { _ as he } from "./_plugin-vue_export-helper-CUD1GoS1.js";
const me = `#!/usr/bin/env node
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
function qe(T, N = le()) {
  if (N === "windows") {
    const y = "tab-project-install.cmd";
    return {
      filename: y,
      content: Ae(T, me),
      mimeType: "text/plain;charset=utf-8",
      runHint: `双击下载的 ${y} 即可自动安装`
    };
  }
  const k = "tab-project-install.sh";
  return {
    filename: k,
    content: Te(T, me),
    mimeType: "text/x-shellscript;charset=utf-8",
    runHint: `sh ~/Downloads/${k}`
  };
}
function Ue(T) {
  return `'${T.replace(/'/g, "'\\''")}'`;
}
async function Le(T, N) {
  if (!chrome?.downloads?.search) return "";
  for (let y = 0; y < 20; y++) {
    const [h] = await chrome.downloads.search({ id: T });
    if (h?.state === "complete" && h.filename) return h.filename;
    if (h?.state === "interrupted") return "";
    await new Promise((g) => setTimeout(g, 100));
  }
  const [k] = await chrome.downloads.search({ id: T });
  return k?.filename || N;
}
async function Re(T, N = le()) {
  const { filename: k, content: y, mimeType: h, runHint: g } = qe(T, N), i = new Blob([y], { type: h }), b = URL.createObjectURL(i);
  if (typeof chrome < "u" && chrome.downloads?.download)
    try {
      const x = await chrome.downloads.download({
        url: b,
        filename: k,
        conflictAction: "overwrite",
        saveAs: !1
      }), w = await Le(x, k);
      setTimeout(() => URL.revokeObjectURL(b), 5e3);
      const S = N === "windows" ? g : w ? `sh ${Ue(w)}` : g;
      return { filename: k, runHint: S, downloadId: x };
    } catch {
    }
  const l = document.createElement("a");
  return l.href = b, l.download = k, l.style.display = "none", document.body.appendChild(l), l.click(), l.remove(), setTimeout(() => URL.revokeObjectURL(b), 5e3), { filename: k, runHint: g };
}
const Je = { class: "native-settings" }, De = {
  key: 0,
  class: "hero-card"
}, He = ["disabled"], Ke = {
  key: 1,
  class: "guide-card"
}, Ve = { class: "steps" }, Ge = {
  key: 0,
  class: "cmd-box"
}, ze = { class: "actions" }, Fe = ["disabled"], We = ["disabled"], Xe = { class: "form-card" }, Ze = {
  key: 0,
  class: "agent-grid"
}, Ye = {
  key: 1,
  class: "warn-box"
}, Qe = ["disabled"], en = { class: "row-inline" }, nn = ["disabled"], tn = ["disabled"], sn = { class: "toggle-row" }, on = ["disabled"], rn = { class: "form-card" }, an = { class: "preset-row" }, ln = ["onClick"], dn = { class: "row-inline" }, un = ["disabled"], cn = ["disabled"], pn = ["disabled"], mn = ["disabled", "onClick"], fn = {
  key: 3,
  class: "note",
  role: "status"
}, vn = { class: "advanced" }, gn = { class: "advanced-body" }, hn = { class: "row-inline" }, yn = ["disabled"], bn = ["disabled"], kn = ["disabled"], wn = { class: "sub" }, xn = /* @__PURE__ */ fe({
  __name: "NativeSettings",
  emits: ["connectionChanged", "busyChanged"],
  setup(T, { emit: N }) {
    const k = N, y = c(le()), h = c(typeof chrome < "u" && chrome.runtime?.id ? String(chrome.runtime.id) : ""), g = c(!1), i = c(null), b = c(!1), l = c(""), x = c(!0), w = c([]), S = c(""), M = c(""), P = c(""), J = c(""), t = c(!1), p = c("");
    let I = null, B = !1;
    const $ = [
      { name: "Claude Code (ACP)", command: "claude-agent-acp" },
      { name: "Codex (ACP)", command: "codex-acp" },
      { name: "Gemini CLI (ACP)", command: "gemini --acp" }
    ];
    function E() {
      I !== null && (clearInterval(I), I = null);
    }
    function G() {
      E(), I = setInterval(async () => {
        if (!(B || i.value || !g.value)) {
          B = !0;
          try {
            const r = await ee();
            i.value = r, b.value = !1, l.value || (l.value = r.defaultCwd), p.value = "已自动检测到本机连接！", E(), k("connectionChanged");
          } catch {
          } finally {
            B = !1;
          }
        }
      }, 2e3);
    }
    async function q() {
      g.value = await ae();
      const r = await Me();
      if (l.value = r.defaultCwd, x.value = r.piToolsEnabled, w.value = r.acpProfiles, g.value)
        try {
          i.value = await ee(), b.value = !1, l.value || (l.value = i.value.defaultCwd), E();
        } catch {
          i.value = null;
        }
      else
        i.value = null;
    }
    ve(() => {
      q();
    }), we(() => {
      E();
    });
    async function A() {
      if (!h.value) throw new Error("未能获取扩展 ID，请在扩展页内打开设置。");
      const r = await Re(h.value, y.value);
      J.value = r.filename, P.value = r.runHint, b.value = !0;
      let s = !1;
      if (y.value !== "windows" && navigator.clipboard?.writeText)
        try {
          await navigator.clipboard.writeText(r.runHint), s = !0;
        } catch {
        }
      p.value = y.value === "windows" ? `已下载 ${r.filename}，直接双击运行即可完成安装。` : s ? `已下载 ${r.filename} 并自动复制安装命令！打开终端按 ⌘+V 粘贴回车即可。` : `已下载 ${r.filename}，请在终端运行下方命令完成安装。`, G();
    }
    async function X() {
      if (!t.value) {
        t.value = !0, k("busyChanged", !0), p.value = "";
        try {
          const s = await ae() || await _e();
          if (g.value = s, !s) {
            p.value = "你取消了权限授权；需要时可再次点击开启。";
            return;
          }
          try {
            const f = await ee();
            i.value = f, b.value = !1, l.value || (l.value = f.defaultCwd), p.value = "本机终端与 Agent 已就绪。", k("connectionChanged");
            return;
          } catch (f) {
            const z = f instanceof Error ? f.message : "";
            if (z.includes("未向扩展开放 Native Messaging") || z.includes("尚未授予 nativeMessaging")) {
              p.value = z;
              return;
            }
            await A(), k("connectionChanged");
          }
        } catch (r) {
          p.value = r instanceof Error ? r.message : "开启失败，请重试。";
        } finally {
          t.value = !1, k("busyChanged", !1);
        }
      }
    }
    async function F() {
      if (P.value)
        try {
          await navigator.clipboard.writeText(P.value), p.value = "已复制安装命令到剪贴板。";
        } catch {
          p.value = "复制失败，请手动选中命令复制。";
        }
    }
    async function D() {
      if (!t.value) {
        t.value = !0, p.value = "";
        try {
          await A();
        } catch (r) {
          p.value = r instanceof Error ? r.message : "下载失败。";
        } finally {
          t.value = !1;
        }
      }
    }
    async function Z() {
      if (!t.value) {
        t.value = !0, p.value = "";
        try {
          g.value = await ae();
          const r = await ee();
          i.value = r, b.value = !1, E(), l.value || (l.value = r.defaultCwd), p.value = `连接成功：${r.platform} · Host v${r.hostVersion}`, k("connectionChanged");
        } catch (r) {
          i.value = null, p.value = r instanceof Error ? r.message : "尚未检测到本机连接。", k("connectionChanged");
        } finally {
          t.value = !1;
        }
      }
    }
    async function U() {
      if (!t.value) {
        t.value = !0, p.value = "";
        try {
          await Pe({
            defaultCwd: l.value,
            piToolsEnabled: x.value,
            acpProfiles: w.value
          }), p.value = "本机终端与 Agent 设置已保存。", k("connectionChanged");
        } catch (r) {
          p.value = r instanceof Error ? r.message : "保存失败。";
        } finally {
          t.value = !1;
        }
      }
    }
    function se(r) {
      S.value = r.name, M.value = r.command;
    }
    async function oe() {
      const r = S.value.trim(), s = M.value.trim();
      !r || !s || t.value || (w.value = [...w.value, { id: crypto.randomUUID(), name: r, command: s }], S.value = "", M.value = "", await U());
    }
    async function re(r) {
      t.value || (w.value = w.value.filter((s) => s.id !== r), await U());
    }
    return (r, s) => (d(), u("div", Je, [
      s[25] || (s[25] = xe('<p class="intro" data-v-f7457c34> 通过 Chrome 原生 Native Messaging 连接本机 Agent CLI（支持 <strong data-v-f7457c34>Pi</strong>、<strong data-v-f7457c34>Claude Code</strong>、<strong data-v-f7457c34>Codex</strong>、<strong data-v-f7457c34>Gemini CLI</strong>、<strong data-v-f7457c34>OpenCode</strong> 及任意 <strong data-v-f7457c34>ACP</strong> 协议工具）。 </p>', 1)),
      e("div", {
        class: K(["status-bar", { ready: !!i.value }])
      }, [
        s[5] || (s[5] = e("span", null, null, -1)),
        i.value ? (d(), u(C, { key: 0 }, [
          m(" 已连接（" + v(i.value.platform === "darwin" ? "macOS" : i.value.platform) + " · Node " + v(i.value.nodeVersion) + " · Host v" + v(i.value.hostVersion) + "） ", 1)
        ], 64)) : b.value ? (d(), u(C, { key: 1 }, [
          m(" 正在等待本机完成安装（安装后会自动变绿）… ")
        ], 64)) : g.value ? (d(), u(C, { key: 2 }, [
          m(" 已授权，等待完成本机一键安装 ")
        ], 64)) : (d(), u(C, { key: 3 }, [
          m(" 未开启 ")
        ], 64))
      ], 2),
      !i.value && !b.value ? (d(), u("section", De, [
        e("button", {
          type: "button",
          class: "primary big-btn",
          disabled: t.value,
          onClick: X
        }, v(t.value ? "正在准备…" : "一键开启本机终端"), 9, He),
        s[6] || (s[6] = e("p", { class: "sub" }, " 点击后自动配置零端口本机桥接并扫描已安装的 Agent CLI（需要本机已安装 Node.js 20+）。 ", -1))
      ])) : !i.value && b.value ? (d(), u("section", Ke, [
        y.value === "windows" ? (d(), u(C, { key: 0 }, [
          s[9] || (s[9] = e("div", { class: "guide-title" }, "只差最后一步：双击运行下载的文件", -1)),
          e("ol", Ve, [
            e("li", null, [
              s[7] || (s[7] = m("在浏览器右上角下载记录里，直接点击打开 ", -1)),
              e("code", null, v(J.value || "tab-project-install.cmd"), 1)
            ]),
            s[8] || (s[8] = e("li", null, "等黑框提示「完成」后，这里会自动连接，无需其他操作", -1))
          ])
        ], 64)) : (d(), u(C, { key: 1 }, [
          s[10] || (s[10] = e("div", { class: "guide-title" }, "只差最后一步：在终端粘贴回车（命令已自动复制）", -1)),
          s[11] || (s[11] = e("ol", { class: "steps" }, [
            e("li", null, [
              m("打开「终端」（Mac 按 "),
              e("code", null, "⌘ + 空格"),
              m(" 输入 "),
              e("code", null, "Terminal"),
              m(" 回车）")
            ]),
            e("li", null, [
              m("按 "),
              e("code", null, "⌘ + V"),
              m(" 粘贴并按回车运行，完成后这里会自动变为已连接")
            ])
          ], -1)),
          P.value ? (d(), u("div", Ge, [
            e("code", null, v(P.value), 1),
            e("button", {
              type: "button",
              onClick: F
            }, "复制")
          ])) : R("", !0)
        ], 64)),
        e("div", ze, [
          e("button", {
            type: "button",
            disabled: t.value,
            onClick: Z
          }, "立即检测", 8, Fe),
          e("button", {
            type: "button",
            disabled: t.value,
            onClick: D
          }, "重新下载", 8, We)
        ])
      ])) : (d(), u(C, { key: 2 }, [
        e("section", Xe, [
          s[15] || (s[15] = e("div", { class: "step-head" }, "已发现的本机 Agent CLI", -1)),
          i.value?.agents?.length ? (d(), u("div", Ze, [
            (d(!0), u(C, null, W(i.value.agents, (f) => (d(), u("span", {
              key: f.id,
              class: K(["agent-chip", { on: f.installed }])
            }, [
              s[12] || (s[12] = e("i", null, null, -1)),
              m(v(f.name), 1)
            ], 2))), 128))
          ])) : (d(), u("div", Ye, [
            s[13] || (s[13] = m(" 当前本机桥接脚本版本较旧，需要更新一次才能开启多 Agent 与 ACP 支持。 ", -1)),
            e("button", {
              type: "button",
              disabled: t.value,
              onClick: D
            }, "下载最新安装脚本", 8, Qe)
          ])),
          s[16] || (s[16] = e("label", { for: "native-cwd" }, "默认工作目录（留空则使用主目录）", -1)),
          e("div", en, [
            j(e("input", {
              id: "native-cwd",
              "onUpdate:modelValue": s[0] || (s[0] = (f) => l.value = f),
              type: "text",
              disabled: t.value,
              placeholder: "/Users/kongzhu/..."
            }, null, 8, nn), [
              [V, l.value]
            ]),
            e("button", {
              type: "button",
              disabled: t.value,
              onClick: U
            }, "保存", 8, tn)
          ]),
          e("label", sn, [
            j(e("input", {
              "onUpdate:modelValue": s[1] || (s[1] = (f) => x.value = f),
              type: "checkbox",
              disabled: t.value,
              onChange: U
            }, null, 40, on), [
              [Ce, x.value]
            ]),
            s[14] || (s[14] = e("span", null, "允许本机 Agent 使用工具（读写文件、执行命令）", -1))
          ])
        ]),
        e("section", rn, [
          s[17] || (s[17] = e("div", { class: "step-head" }, "自定义 ACP Agent（JSON-RPC over stdio）", -1)),
          s[18] || (s[18] = e("p", { class: "sub" }, [
            m("添加任意支持 Agent Client Protocol 的命令行工具（如 "),
            e("code", null, "claude-agent-acp"),
            m("、"),
            e("code", null, "codex-acp"),
            m("、"),
            e("code", null, "gemini --acp"),
            m("）。")
          ], -1)),
          e("div", an, [
            (d(), u(C, null, W($, (f) => e("button", {
              key: f.command,
              type: "button",
              class: "preset-btn",
              onClick: (z) => se(f)
            }, " + " + v(f.name), 9, ln)), 64))
          ]),
          e("div", dn, [
            j(e("input", {
              "onUpdate:modelValue": s[2] || (s[2] = (f) => S.value = f),
              type: "text",
              disabled: t.value,
              placeholder: "显示名称（如 Claude ACP）"
            }, null, 8, un), [
              [V, S.value]
            ]),
            j(e("input", {
              "onUpdate:modelValue": s[3] || (s[3] = (f) => M.value = f),
              type: "text",
              disabled: t.value,
              placeholder: "启动命令（如 npx -y @agentclientprotocol/claude-agent-acp）"
            }, null, 8, cn), [
              [V, M.value]
            ]),
            e("button", {
              type: "button",
              disabled: t.value || !S.value.trim() || !M.value.trim(),
              onClick: oe
            }, "添加", 8, pn)
          ]),
          (d(!0), u(C, null, W(w.value, (f) => (d(), u("div", {
            key: f.id,
            class: "profile-row"
          }, [
            e("div", null, [
              e("strong", null, v(f.name), 1),
              e("code", null, v(f.command), 1)
            ]),
            e("button", {
              type: "button",
              disabled: t.value,
              onClick: (z) => re(f.id)
            }, "删除", 8, mn)
          ]))), 128))
        ])
      ], 64)),
      p.value ? (d(), u("p", fn, v(p.value), 1)) : R("", !0),
      e("details", vn, [
        s[24] || (s[24] = e("summary", null, "高级选项 / 切换系统或手动检测", -1)),
        e("div", gn, [
          e("div", hn, [
            j(e("select", {
              "onUpdate:modelValue": s[4] || (s[4] = (f) => y.value = f),
              "aria-label": "选择操作系统",
              disabled: t.value
            }, [...s[19] || (s[19] = [
              e("option", { value: "macos-linux" }, "macOS / Linux (.sh)", -1),
              e("option", { value: "windows" }, "Windows (.cmd)", -1)
            ])], 8, yn), [
              [ge, y.value]
            ]),
            e("button", {
              type: "button",
              disabled: t.value || !h.value,
              onClick: D
            }, "下载安装脚本", 8, bn),
            e("button", {
              type: "button",
              disabled: t.value,
              onClick: Z
            }, "检测连接", 8, kn)
          ]),
          e("p", wn, [
            s[20] || (s[20] = m(" 扩展 ID：", -1)),
            e("code", null, v(h.value || "未知"), 1),
            s[21] || (s[21] = m(" · 如需彻底卸载，运行下载的脚本并加上 ", -1)),
            s[22] || (s[22] = e("code", null, "--uninstall", -1)),
            s[23] || (s[23] = m(" 参数即可。 ", -1))
          ])
        ])
      ])
    ]));
  }
}), Cn = /* @__PURE__ */ he(xn, [["__scopeId", "data-v-f7457c34"]]), Sn = {
  class: "settings-dialog",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "ai-settings-title"
}, In = { class: "nav" }, An = ["disabled"], Tn = ["disabled"], Mn = ["disabled"], _n = { id: "ai-settings-title" }, Pn = ["disabled"], En = {
  class: "presets-box",
  "aria-label": "常用模型服务预设"
}, On = { class: "preset-group-label" }, jn = { class: "preset-pills" }, Nn = ["disabled", "onClick"], Bn = { class: "preset-note" }, $n = { class: "form-card" }, qn = ["disabled"], Un = { for: "byok-key" }, Ln = { class: "field-tag" }, Rn = ["disabled", "placeholder"], Jn = { class: "model-row" }, Dn = ["disabled"], Hn = ["value"], Kn = ["value"], Vn = ["disabled"], Gn = ["disabled"], zn = { class: "actions" }, Fn = ["disabled"], Wn = ["disabled"], Xn = { class: "info" }, Zn = ["href"], Yn = {
  key: 0,
  class: "note",
  role: "status"
}, Qn = { class: "form-card" }, et = ["disabled"], nt = ["disabled", "placeholder"], tt = { class: "actions" }, st = ["disabled"], ot = ["disabled"], rt = {
  key: 0,
  class: "note",
  role: "status"
}, at = /* @__PURE__ */ fe({
  __name: "AiSettings",
  props: {
    initialTab: {}
  },
  emits: ["close", "connectionChanged", "configChanged", "busyChanged"],
  setup(T, { emit: N }) {
    const k = T, y = N, h = c(k.initialTab), g = c("deepseek"), i = c("https://api.deepseek.com"), b = c(""), l = c(""), x = c([]), w = c(!1), S = c(""), M = c(""), P = c(""), J = c(!1), t = c(!1), p = c(""), I = c(""), B = c(""), $ = c(!1), E = c(""), G = c(!1), q = c(""), A = L(() => pe(g.value)), X = L(() => je(i.value)), F = L(() => ue(g.value, i.value)), D = L(() => {
      if (!w.value || !P.value) return !1;
      try {
        return te(i.value) === P.value;
      } catch {
        return !1;
      }
    }), Z = L(() => !!b.value.trim() || D.value && J.value), U = L(() => {
      const a = [
        ...x.value,
        ...A.value.suggestedModels,
        ...ie(l.value) ? [l.value.trim()] : []
      ];
      return [...new Set(a.filter(Boolean))];
    }), se = L(() => !t.value && !!i.value.trim() && (!F.value || Z.value)), oe = L(() => !t.value && !!i.value.trim() && ie(l.value) && (!F.value || Z.value)), re = L(() => [
      { id: "cn", title: "国内 / 直连", items: Y.filter((a) => a.group === "cn") },
      { id: "global", title: "全球 / 聚合", items: Y.filter((a) => a.group === "global") },
      { id: "local", title: "本机免费（免 Key）", items: Y.filter((a) => a.group === "local") },
      { id: "custom", title: "其他", items: Y.filter((a) => a.group === "custom") }
    ]);
    ve(async () => {
      try {
        const [a, n] = await Promise.all([ne(), Ee()]);
        g.value = a.presetId, i.value = a.baseUrl, l.value = a.model, x.value = a.models, w.value = a.configured, S.value = a.label, M.value = a.model, P.value = a.baseUrl, J.value = !!a.key, I.value = n.endpoint, $.value = n.configured, E.value = n.endpoint, G.value = !!n.key, a.configured && (!F.value || a.key) && f(!0);
      } catch {
        p.value = "读取本机设置失败。";
      }
    });
    function r(a) {
      if (t.value) return;
      const n = pe(a);
      g.value = n.id, p.value = "", n.baseUrl ? i.value = n.baseUrl : a === "custom" && g.value === "custom" && Y.some((o) => o.id !== "custom" && o.baseUrl === i.value) && (i.value = ""), x.value = [], D.value || (b.value = ""), l.value = n.defaultModel || n.suggestedModels[0] || "";
    }
    function s(a) {
      const n = b.value.trim();
      if (n) return n;
      try {
        if (te(i.value) === a.baseUrl)
          return a.key;
      } catch {
      }
      return "";
    }
    async function f(a = !1) {
      if (!t.value) {
        t.value = !0, a || (p.value = "");
        try {
          const n = await ne(), o = te(i.value);
          i.value = o;
          const _ = s(n), Q = g.value === "custom" ? "自定义服务" : A.value.name, H = await Oe({
            baseUrl: o,
            key: _,
            label: Q,
            requiresKey: ue(g.value, o)
          });
          if (x.value = H, !H.includes(l.value.trim())) {
            const O = A.value.defaultModel;
            l.value = O && H.includes(O) ? O : H[0];
          }
          !b.value.trim() && D.value && n.configured && (await ce({
            presetId: g.value,
            label: g.value === "custom" ? void 0 : A.value.name,
            baseUrl: o,
            key: _,
            model: l.value.trim(),
            models: H
          }), M.value = l.value.trim(), y("configChanged")), a || (p.value = `已获取 ${H.length} 个可用模型。`);
        } catch (n) {
          a || (p.value = n instanceof Error ? n.message : "获取模型失败");
        } finally {
          t.value = !1;
        }
      }
    }
    async function z() {
      if (!t.value) {
        t.value = !0, p.value = "";
        try {
          const a = await ne(), n = te(i.value);
          i.value = n;
          const o = s(a), _ = l.value.trim();
          if (!ie(_))
            throw new Error("请选择或填写有效的模型 ID（例如 deepseek-chat / qwen2.5:7b / gpt-4o-mini）。");
          const Q = x.value.length ? x.value : U.value, H = [...new Set([_, ...Q].filter(Boolean))];
          await ce({
            presetId: g.value,
            label: g.value === "custom" ? void 0 : A.value.name,
            baseUrl: n,
            key: o,
            model: _,
            models: H
          });
          const O = await ne();
          b.value = "", w.value = O.configured, S.value = O.label, M.value = O.model, P.value = O.baseUrl, J.value = !!O.key, p.value = `已保存设置：${O.label}（${O.model}）。`, y("configChanged");
        } catch (a) {
          p.value = a instanceof Error ? a.message : "保存失败";
        } finally {
          t.value = !1;
        }
      }
    }
    async function ye() {
      if (!t.value) {
        t.value = !0;
        try {
          await Ne(), b.value = "", w.value = !1, S.value = "", M.value = "", P.value = "", J.value = !1, p.value = "已清除本机保存的模型接入与 Key（不会删除聊天记录）。", y("configChanged");
        } catch {
          p.value = "移除失败，请重试。";
        } finally {
          t.value = !1;
        }
      }
    }
    async function be() {
      if (!t.value) {
        t.value = !0, q.value = "";
        try {
          const a = $.value && I.value.trim() === E.value, n = B.value.trim() ? B.value.trim() : a && G.value ? void 0 : "", o = await Be({
            endpoint: I.value,
            ...n !== void 0 ? { key: n } : {}
          });
          B.value = "", I.value = o.endpoint, $.value = o.configured, E.value = o.endpoint, G.value = !!o.key, q.value = `已保存 Jev API：${o.endpoint}`;
        } catch (a) {
          q.value = a instanceof Error ? a.message : "保存 Jev 设置失败";
        } finally {
          t.value = !1;
        }
      }
    }
    async function ke() {
      if (!t.value) {
        t.value = !0;
        try {
          await $e(), I.value = "", B.value = "", $.value = !1, E.value = "", G.value = !1, q.value = "已清除本机保存的 Jev API 配置。";
        } catch {
          q.value = "清除失败，请重试。";
        } finally {
          t.value = !1;
        }
      }
    }
    return (a, n) => (d(), u("div", {
      class: "settings-overlay",
      onClick: n[14] || (n[14] = de((o) => !t.value && y("close"), ["self"])),
      onKeydown: n[15] || (n[15] = Ie(de((o) => !t.value && y("close"), ["stop"]), ["esc"]))
    }, [
      e("section", Sn, [
        e("aside", In, [
          n[19] || (n[19] = e("div", { class: "nav-heading" }, [
            e("span", null, "✦"),
            e("div", null, [
              e("strong", null, "AI 工作区"),
              e("small", null, "模型与终端设置")
            ])
          ], -1)),
          n[20] || (n[20] = e("p", null, "服务提供商", -1)),
          e("button", {
            type: "button",
            disabled: t.value,
            class: K({ selected: h.value === "deepseek" }),
            onClick: n[0] || (n[0] = (o) => h.value = "deepseek")
          }, [...n[16] || (n[16] = [
            e("span", { class: "provider-icon" }, "☁", -1),
            m(" 模型服务 ", -1),
            e("i", null, "兼容", -1)
          ])], 10, An),
          e("button", {
            type: "button",
            disabled: t.value,
            class: K({ selected: h.value === "jev" }),
            onClick: n[1] || (n[1] = (o) => h.value = "jev")
          }, [...n[17] || (n[17] = [
            e("span", { class: "provider-icon" }, "⚡", -1),
            m(" Jev 快筛 ", -1),
            e("i", null, "API", -1)
          ])], 10, Tn),
          e("button", {
            type: "button",
            disabled: t.value,
            class: K({ selected: h.value === "native" }),
            onClick: n[2] || (n[2] = (o) => h.value = "native")
          }, [...n[18] || (n[18] = [
            e("span", { class: "provider-icon native" }, ">_", -1),
            m(" 本机终端 ", -1),
            e("i", null, "Native", -1)
          ])], 10, Mn),
          n[21] || (n[21] = e("small", { class: "nav-foot" }, "支持国内外大模型、OpenRouter、Jev 快筛与本机 Ollama（免 Key）", -1))
        ]),
        e("main", null, [
          e("header", null, [
            e("div", null, [
              e("small", null, "服务设置 / " + v(h.value === "deepseek" ? "通用 OpenAI 兼容 & 本机模型" : h.value === "jev" ? "Jev 快筛接口" : "本机终端"), 1),
              e("h2", _n, v(h.value === "deepseek" ? "模型服务接入" : h.value === "jev" ? "Jev API 配置" : "本机终端桥接"), 1)
            ]),
            e("button", {
              class: "close",
              type: "button",
              disabled: t.value,
              "aria-label": "关闭设置",
              onClick: n[3] || (n[3] = (o) => y("close"))
            }, "✕", 8, Pn)
          ]),
          h.value === "deepseek" ? (d(), u(C, { key: 0 }, [
            n[28] || (n[28] = e("p", { class: "intro" }, [
              m(" 支持 "),
              e("strong", null, "OpenAI 兼容接口"),
              m(" 与 "),
              e("strong", null, "本机 Ollama / LM Studio"),
              m("：无需安装命令行桥接，对话与自动化任务都可直接调用。 ")
            ], -1)),
            e("div", {
              class: K(["status", { ready: w.value }])
            }, [
              n[22] || (n[22] = e("span", null, null, -1)),
              m(" " + v(w.value ? `已在本机就绪：${S.value} · ${M.value}` : "尚未配置可用模型服务"), 1)
            ], 2),
            e("section", En, [
              (d(!0), u(C, null, W(re.value, (o) => (d(), u("div", {
                key: o.id,
                class: "preset-group"
              }, [
                e("span", On, v(o.title), 1),
                e("div", jn, [
                  (d(!0), u(C, null, W(o.items, (_) => (d(), u("button", {
                    key: _.id,
                    type: "button",
                    class: K(["preset-pill", { active: g.value === _.id }]),
                    disabled: t.value,
                    onClick: (Q) => r(_.id)
                  }, [
                    e("span", null, v(_.name), 1),
                    e("small", null, v(_.shortTag), 1)
                  ], 10, Nn))), 128))
                ])
              ]))), 128)),
              e("p", Bn, v(A.value.note), 1)
            ]),
            e("section", $n, [
              n[24] || (n[24] = e("label", { for: "byok-base-url" }, "接口地址（Base URL）", -1)),
              j(e("input", {
                id: "byok-base-url",
                "onUpdate:modelValue": n[4] || (n[4] = (o) => i.value = o),
                type: "url",
                autocomplete: "off",
                disabled: t.value,
                placeholder: "例如 https://api.deepseek.com 或 http://localhost:11434/v1",
                onInput: n[5] || (n[5] = (o) => x.value = [])
              }, null, 40, qn), [
                [
                  V,
                  i.value,
                  void 0,
                  { trim: !0 }
                ]
              ]),
              e("p", null, v(X.value ? "本机/局域网地址可直接 HTTP 直连；无需填写完整 /chat/completions 后缀。" : "支持官方地址或兼容 OpenAI 协议的中转网关（https://）。"), 1),
              e("label", Un, [
                n[23] || (n[23] = m(" API Key ", -1)),
                e("span", Ln, v(F.value ? "必填" : "本机/自定义可留空"), 1)
              ]),
              j(e("input", {
                id: "byok-key",
                "onUpdate:modelValue": n[6] || (n[6] = (o) => b.value = o),
                type: "password",
                autocomplete: "off",
                disabled: t.value,
                placeholder: D.value && J.value ? "已保存当前服务 Key；留空继续使用现有 Key" : A.value.keyPlaceholder
              }, null, 8, Rn), [
                [V, b.value]
              ]),
              n[25] || (n[25] = e("p", null, "Key 仅保存在浏览器扩展本地存储，不进入普通同步备份。", -1)),
              n[26] || (n[26] = e("label", { for: "byok-model-input" }, "默认模型", -1)),
              e("div", Jn, [
                U.value.length ? j((d(), u("select", {
                  key: 0,
                  "onUpdate:modelValue": n[7] || (n[7] = (o) => l.value = o),
                  "aria-label": "选择预设或已获取的模型",
                  disabled: t.value
                }, [
                  U.value.includes(l.value) ? R("", !0) : (d(), u("option", {
                    key: 0,
                    value: l.value
                  }, v(l.value || "选择模型"), 9, Hn)),
                  (d(!0), u(C, null, W(U.value, (o) => (d(), u("option", {
                    key: o,
                    value: o
                  }, v(o), 9, Kn))), 128))
                ], 8, Dn)), [
                  [ge, l.value]
                ]) : R("", !0),
                e("button", {
                  type: "button",
                  disabled: !se.value,
                  onClick: n[8] || (n[8] = (o) => f(!1))
                }, v(t.value ? "获取中…" : X.value ? "探测本机模型" : "获取模型列表"), 9, Vn)
              ]),
              j(e("input", {
                id: "byok-model-input",
                "onUpdate:modelValue": n[9] || (n[9] = (o) => l.value = o),
                type: "text",
                autocomplete: "off",
                disabled: t.value,
                placeholder: "也可直接输入任意模型 ID，例如 qwen2.5:7b / deepseek-chat / gpt-4o-mini"
              }, null, 8, Gn), [
                [
                  V,
                  l.value,
                  void 0,
                  { trim: !0 }
                ]
              ]),
              n[27] || (n[27] = e("p", null, "若接口未开放 /models 列表，直接手动输入模型 ID 也可正常保存并使用。", -1)),
              e("div", zn, [
                e("button", {
                  class: "primary",
                  type: "button",
                  disabled: !oe.value,
                  onClick: z
                }, "保存设置", 8, Fn),
                w.value ? (d(), u("button", {
                  key: 0,
                  type: "button",
                  disabled: t.value,
                  onClick: ye
                }, "清除配置", 8, Wn)) : R("", !0)
              ])
            ]),
            e("div", Xn, [
              m(v(X.value ? "本机推理完全免费、数据不出电脑。" : "对话与自动化摘要会发送至你所选的模型服务，并按对应平台规则计费；聊天记录仅保存在本机。") + " ", 1),
              A.value.docsUrl ? (d(), u("a", {
                key: 0,
                href: A.value.docsUrl,
                target: "_blank",
                rel: "noreferrer"
              }, v(A.value.docsLabel), 9, Zn)) : R("", !0)
            ]),
            p.value ? (d(), u("p", Yn, v(p.value), 1)) : R("", !0)
          ], 64)) : h.value === "jev" ? (d(), u(C, { key: 1 }, [
            n[34] || (n[34] = e("p", { class: "intro" }, [
              m(" 配置你自己的 "),
              e("strong", null, "Jev 快筛 API"),
              m("：数字员工启用「外部 Jev 决策端点」且未单独指定接口时，将自动调用这里的 Jev 接口与 Key 进行快速分拣。 ")
            ], -1)),
            e("div", {
              class: K(["status", { ready: $.value }])
            }, [
              n[29] || (n[29] = e("span", null, null, -1)),
              m(" " + v($.value ? `已在本机就绪：${E.value}` : "尚未配置全局 Jev API（未配置时默认使用上方的轻模型做快筛）"), 1)
            ], 2),
            e("section", Qn, [
              n[30] || (n[30] = e("label", { for: "jev-endpoint" }, "Jev 接口地址（Endpoint URL）", -1)),
              j(e("input", {
                id: "jev-endpoint",
                "onUpdate:modelValue": n[10] || (n[10] = (o) => I.value = o),
                type: "url",
                autocomplete: "off",
                disabled: t.value,
                placeholder: "例如 http://127.0.0.1:8787/decide 或 https://your-jev-api.example/decide"
              }, null, 8, et), [
                [
                  V,
                  I.value,
                  void 0,
                  { trim: !0 }
                ]
              ]),
              n[31] || (n[31] = e("p", null, "支持本地部署服务（http://127.0.0.1:...）或自定义 HTTPS 端点，接收 `tab-project-jev-v1` JSON 请求。", -1)),
              n[32] || (n[32] = e("label", { for: "jev-key" }, [
                m(" Jev API Key "),
                e("span", { class: "field-tag" }, "可选 · Bearer Token")
              ], -1)),
              j(e("input", {
                id: "jev-key",
                "onUpdate:modelValue": n[11] || (n[11] = (o) => B.value = o),
                type: "password",
                autocomplete: "off",
                disabled: t.value,
                placeholder: $.value && G.value ? "已保存 Jev Key；留空继续使用现有 Key" : "本地端口可留空；远程服务填写 API Key"
              }, null, 8, nt), [
                [V, B.value]
              ]),
              n[33] || (n[33] = e("p", null, "Key 仅保存在浏览器扩展本地存储，不进入普通同步备份；填写后会附带在 `Authorization: Bearer ...` 请求头中。", -1)),
              e("div", tt, [
                e("button", {
                  class: "primary",
                  type: "button",
                  disabled: t.value || !I.value.trim(),
                  onClick: be
                }, "保存 Jev 设置", 8, st),
                $.value ? (d(), u("button", {
                  key: 0,
                  type: "button",
                  disabled: t.value,
                  onClick: ke
                }, "清除配置", 8, ot)) : R("", !0)
              ])
            ]),
            q.value ? (d(), u("p", rt, v(q.value), 1)) : R("", !0)
          ], 64)) : (d(), Se(Cn, {
            key: 2,
            onConnectionChanged: n[12] || (n[12] = (o) => y("connectionChanged")),
            onBusyChanged: n[13] || (n[13] = (o) => {
              t.value = o, y("busyChanged", o);
            })
          }))
        ])
      ])
    ], 32));
  }
}), ut = /* @__PURE__ */ he(at, [["__scopeId", "data-v-e4458628"]]);
export {
  ut as default
};
