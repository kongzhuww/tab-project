import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { mkdtempSync, rmSync, writeFileSync, chmodSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  createMessageDecoder,
  encodeNativeMessage,
  handleNativeRequest,
  MAX_INCOMING_BYTES,
  parseClaudeJsonOutput,
  parseCodexJsonEvents,
  parseOpencodeJsonEvents,
  parsePiJsonEvents,
  parsePiListModels,
  pickAcpPermissionOption,
  splitCommandArgs,
} from '../native-host/tab-project-native-host.mjs';
import { loadTsModule } from './helpers/load-ts.mjs';

const installer = await loadTsModule('src/native-bridge/installer.ts');

test('native message framing encodes and decodes fragmented or batched chunks', () => {
  const first = encodeNativeMessage({ id: 1, action: 'ping' });
  const second = encodeNativeMessage({ id: 2, action: 'exec', command: 'echo ok' });
  const combined = Buffer.concat([first, second]);

  const received = [];
  const errors = [];
  const decode = createMessageDecoder(msg => received.push(msg), err => errors.push(err));

  // Feed byte-by-byte across frame boundaries to exercise incremental buffering.
  decode(combined.subarray(0, 3));
  decode(combined.subarray(3, first.length + 2));
  decode(combined.subarray(first.length + 2));

  assert.equal(errors.length, 0);
  assert.deepEqual(received, [
    { id: 1, action: 'ping' },
    { id: 2, action: 'exec', command: 'echo ok' },
  ]);
});

test('native decoder rejects oversized payloads and malformed json', () => {
  const errors = [];
  const decode = createMessageDecoder(() => {}, err => errors.push(err));

  const badHeader = Buffer.alloc(4);
  badHeader.writeUInt32LE(MAX_INCOMING_BYTES + 1, 0);
  decode(badHeader);
  assert.match(errors[0].message, /exceeds/);

  const badJson = Buffer.from('{not-json', 'utf8');
  const header = Buffer.alloc(4);
  header.writeUInt32LE(badJson.length, 0);
  decode(Buffer.concat([header, badJson]));
  assert.equal(errors.length, 2);
});

test('native host handles ping, check_dir, exec, and invalid inputs', async () => {
  const ping = await handleNativeRequest({ id: 'p1', action: 'ping' });
  assert.equal(ping.ok, true);
  assert.equal(ping.id, 'p1');
  assert.equal(ping.protocolVersion, 1);
  assert.ok(ping.nodeVersion.startsWith('v'));

  const dir = await handleNativeRequest({ id: 'd1', action: 'check_dir', path: os.tmpdir() });
  assert.equal(dir.ok, true);
  assert.ok(dir.cwd);

  const okExec = await handleNativeRequest({
    id: 'e1',
    action: 'exec',
    cwd: os.tmpdir(),
    command: `"${process.execPath}" -e "process.stdout.write('hello-native')"`,
  });
  assert.equal(okExec.ok, true);
  assert.equal(okExec.exitCode, 0);
  assert.equal(okExec.stdout, 'hello-native');

  const failExec = await handleNativeRequest({
    id: 'e2',
    action: 'exec',
    cwd: os.tmpdir(),
    command: `"${process.execPath}" -e "process.stderr.write('err'); process.exit(3)"`,
  });
  assert.equal(failExec.ok, false);
  assert.equal(failExec.exitCode, 3);
  assert.equal(failExec.stderr, 'err');

  const badAction = await handleNativeRequest({ id: 'x1', action: 'unknown' });
  assert.equal(badAction.ok, false);
  assert.match(badAction.error, /Unsupported action/);
});

test('installer generators validate extension ID and produce valid scripts', async () => {
  const hostSource = await readFile(new URL('../native-host/tab-project-native-host.mjs', import.meta.url), 'utf8');
  const fakeExtId = 'abcdefghijklmnopabcdefghijklmnop';

  assert.throws(() => installer.buildMacLinuxInstaller('not-an-id', hostSource), /无效的浏览器扩展 ID/);

  const sh = installer.buildMacLinuxInstaller(fakeExtId, hostSource);
  assert.match(sh, new RegExp(`chrome-extension://${fakeExtId}/`));
  assert.match(sh, /Citro Labs\/ego lite\/NativeMessagingHosts/);
  assert.match(sh, /--uninstall/);
  assert.ok(sh.includes('export async function handleNativeRequest'));
  // Syntax check generated POSIX sh script with both sh -n and bash -n.
  execFileSync('sh', ['-n'], { input: sh, encoding: 'utf8' });
  execFileSync('bash', ['-n'], { input: sh, encoding: 'utf8' });

  const ps1 = installer.buildWindowsInstaller(fakeExtId, hostSource);
  assert.match(ps1, new RegExp(`chrome-extension://${fakeExtId}/`));
  assert.match(ps1, /\$Uninstall/);
  assert.ok(ps1.includes('export async function handleNativeRequest'));

  const cmd = installer.buildWindowsCmdInstaller(fakeExtId, hostSource);
  assert.match(cmd, /-EncodedCommand /);
});

test('native-bridge service enforces optional permission and wraps sendNativeMessage', async t => {
  const before = globalThis.chrome;
  t.after(() => { globalThis.chrome = before; });

  const service = await loadTsModule('src/services/native-bridge.service.ts');

  globalThis.chrome = {
    permissions: {
      contains: async () => false,
      request: async () => { throw new Error('Only permissions specified in the manifest may be requested.'); },
    },
    runtime: {},
  };
  await assert.rejects(() => service.requestNativeMessagingPermission(), /刷新\/重新加载/);
  await assert.rejects(() => service.pingNativeHost(), /尚未授予 nativeMessaging/);

  // Test Service Worker proxy fallback when page context lacks sendNativeMessage.
  globalThis.chrome = {
    permissions: { contains: async () => true },
    runtime: {
      sendMessage: async (msg) => {
        assert.equal(msg.type, 'native-bridge:send');
        return { ok: true, response: { ok: true, id: msg.payload.id, action: 'ping', protocolVersion: 1, hostVersion: '1.0.0', nodeVersion: 'v24.0.0', platform: 'darwin', arch: 'arm64', homeDir: '/Users/test', defaultCwd: '/Users/test' } };
      },
    },
  };
  const proxiedPing = await service.pingNativeHost();
  assert.equal(proxiedPing.platform, 'darwin');

  let sentPayload = null;
  globalThis.chrome = {
    permissions: { contains: async () => true, request: async () => true },
    runtime: {
      sendNativeMessage: async (name, payload) => {
        assert.equal(name, installer.NATIVE_HOST_NAME);
        sentPayload = payload;
        return { ok: true, id: payload.id, action: 'ping', protocolVersion: 1, hostVersion: '1.0.0', nodeVersion: 'v24.0.0', platform: 'darwin', arch: 'arm64', homeDir: '/Users/test', defaultCwd: '/Users/test' };
      },
    },
  };
  const ping = await service.pingNativeHost();
  assert.equal(ping.platform, 'darwin');
  assert.equal(sentPayload.action, 'ping');
});

test('pi list-models and json event parsers extract models, thinking, tools, and final text', () => {
  const models = parsePiListModels([
    'provider      model                     context  max-out  thinking  images',
    'antigravity   claude-opus-5-5           1M       128K     yes       yes   ',
    'openai-codex  gpt-6.1-sol               500K     128K     yes       yes   ',
  ].join('\n'));
  assert.equal(models.length, 2);
  assert.deepEqual(models[0], {
    id: 'antigravity/claude-opus-5-5',
    provider: 'antigravity',
    model: 'claude-opus-5-5',
    context: '1M',
    maxOut: '128K',
    thinking: true,
    images: true,
  });

  const parsed = parsePiJsonEvents([
    JSON.stringify({ type: 'session', id: 'sess-123' }),
    JSON.stringify({
      type: 'message_end',
      message: {
        role: 'assistant',
        provider: 'openai-codex',
        model: 'gpt-6.1-sol',
        durationMs: 1200,
        thinkingLevel: 'medium',
        content: [
          { type: 'thinking', thinking: 'Checking cwd first' },
          { type: 'toolCall', name: 'bash', arguments: { command: 'pwd' } },
        ],
      },
    }),
    JSON.stringify({
      type: 'message_end',
      message: {
        role: 'assistant',
        provider: 'openai-codex',
        model: 'gpt-6.1-sol',
        durationMs: 800,
        content: [{ type: 'text', text: 'Done!' }],
      },
    }),
  ].join('\n'));

  assert.equal(parsed.sessionId, 'sess-123');
  assert.equal(parsed.provider, 'openai-codex');
  assert.equal(parsed.model, 'gpt-6.1-sol');
  assert.equal(parsed.durationMs, 2000);
  assert.equal(parsed.thinking, 'Checking cwd first');
  assert.equal(parsed.toolSteps.length, 1);
  assert.equal(parsed.toolSteps[0].name, 'bash');
  assert.equal(parsed.text, 'Done!');
});

test('native host executes pi_models and pi_run against configured pi CLI binary', async t => {
  const prevPi = process.env.TAB_PROJECT_PI_BIN;
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tab-pi-mock-'));
  t.after(() => {
    if (prevPi === undefined) delete process.env.TAB_PROJECT_PI_BIN;
    else process.env.TAB_PROJECT_PI_BIN = prevPi;
    rmSync(dir, { recursive: true, force: true });
  });

  const fakePi = path.join(dir, 'pi-mock.mjs');
  writeFileSync(fakePi, `#!/usr/bin/env node
const args = process.argv.slice(2);
if (args.includes('--list-models')) {
  console.log('provider      model           context  max-out  thinking  images');
  console.log('antigravity   claude-opus-5-5 1M       128K     yes       yes');
  process.exit(0);
}
console.log(JSON.stringify({ type: 'session', id: 's-mock' }));
console.log(JSON.stringify({
  type: 'message_end',
  message: { role: 'assistant', provider: 'antigravity', model: 'claude-opus-5-5', durationMs: 42, content: [{ type: 'text', text: 'mocked-pi-ok' }] }
}));
`, 'utf8');
  chmodSync(fakePi, 0o755);
  process.env.TAB_PROJECT_PI_BIN = fakePi;

  const ping = await handleNativeRequest({ id: 'p-pi', action: 'ping' });
  assert.equal(ping.piAvailable, true);

  const models = await handleNativeRequest({ id: 'm1', action: 'pi_models' });
  assert.equal(models.ok, true);
  assert.equal(models.models[0].id, 'antigravity/claude-opus-5-5');

  const run = await handleNativeRequest({
    id: 'r1',
    action: 'pi_run',
    cwd: os.tmpdir(),
    sessionId: 'unit-test-session',
    model: 'antigravity/claude-opus-5-5',
    thinking: 'high',
    prompt: 'hello',
  });
  assert.equal(run.ok, true);
  assert.equal(run.text, 'mocked-pi-ok');
  assert.equal(run.model, 'claude-opus-5-5');
});

test('multi-CLI parsers and ACP helpers handle Claude, Codex, OpenCode, and command splitting', () => {
  const claude = parseClaudeJsonOutput(JSON.stringify({
    type: 'result',
    session_id: 'claude-sess-1',
    duration_ms: 510,
    is_error: false,
    result: 'Claude result',
  }));
  assert.equal(claude.sessionId, 'claude-sess-1');
  assert.equal(claude.text, 'Claude result');

  const codex = parseCodexJsonEvents([
    JSON.stringify({ type: 'thread.started', thread_id: 'thread-9' }),
    JSON.stringify({ type: 'item.completed', item: { type: 'command_execution' } }),
    JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: 'Codex done' } }),
  ].join('\n'));
  assert.equal(codex.sessionId, 'thread-9');
  assert.equal(codex.toolSteps[0].name, 'shell');
  assert.equal(codex.text, 'Codex done');

  const opencode = parseOpencodeJsonEvents([
    JSON.stringify({ type: 'text', sessionID: 'oc-1', part: { text: 'Hello ' } }),
    JSON.stringify({ type: 'tool_use', sessionID: 'oc-1', part: { tool: 'bash' } }),
    JSON.stringify({ type: 'text', sessionID: 'oc-1', part: { text: 'OpenCode' } }),
  ].join('\n'));
  assert.equal(opencode.sessionId, 'oc-1');
  assert.equal(opencode.text, 'Hello OpenCode');
  assert.equal(opencode.toolSteps[0].name, 'bash');

  assert.deepEqual(splitCommandArgs(`npx -y "@agentclientprotocol/claude-agent-acp" --flag 'a b'`), [
    'npx', '-y', '@agentclientprotocol/claude-agent-acp', '--flag', 'a b',
  ]);
  assert.throws(() => splitCommandArgs('acp "unclosed'), /未闭合/);

  const opts = [{ optionId: 'deny', kind: 'reject_once' }, { optionId: 'allow', kind: 'allow_once' }];
  assert.equal(pickAcpPermissionOption(opts, true), 'allow');
  assert.equal(pickAcpPermissionOption(opts, false), 'deny');
});

test('native host drives ACP JSON-RPC stdio agent and discovers Claude/Codex CLIs', async t => {
  const prevClaude = process.env.TAB_PROJECT_CLAUDE_BIN;
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tab-acp-mock-'));
  t.after(() => {
    if (prevClaude === undefined) delete process.env.TAB_PROJECT_CLAUDE_BIN;
    else process.env.TAB_PROJECT_CLAUDE_BIN = prevClaude;
    rmSync(dir, { recursive: true, force: true });
  });

  const fakeClaude = path.join(dir, 'claude-mock.mjs');
  writeFileSync(fakeClaude, `#!/usr/bin/env node
console.log(JSON.stringify({ type: 'result', session_id: 'cs-1', duration_ms: 15, is_error: false, result: 'claude-ok' }));
`, 'utf8');
  chmodSync(fakeClaude, 0o755);
  process.env.TAB_PROJECT_CLAUDE_BIN = fakeClaude;

  const ping = await handleNativeRequest({ id: 'p-multi', action: 'ping' });
  assert.ok(Array.isArray(ping.agents));
  assert.equal(ping.agents.find(a => a.id === 'claude')?.installed, true);

  const claudeRun = await handleNativeRequest({
    id: 'c1',
    action: 'agent_run',
    agentId: 'claude',
    cwd: os.tmpdir(),
    prompt: 'hi',
  });
  assert.equal(claudeRun.ok, true);
  assert.equal(claudeRun.text, 'claude-ok');
  assert.equal(claudeRun.externalSessionId, 'cs-1');

  const fakeAcp = path.join(dir, 'acp-mock.mjs');
  writeFileSync(fakeAcp, `#!/usr/bin/env node
import readline from 'node:readline';
const rl = readline.createInterface({ input: process.stdin });
const send = obj => process.stdout.write(JSON.stringify(obj) + '\\n');
let permWaiter = null;
rl.on('line', line => {
  const msg = JSON.parse(line);
  if (msg.id && msg.result && permWaiter) { permWaiter(msg.result); permWaiter = null; return; }
  if (msg.method === 'initialize') {
    send({ jsonrpc: '2.0', id: msg.id, result: { protocolVersion: 1, agentCapabilities: { loadSession: true }, agentInfo: { name: 'MockACP' } } });
  } else if (msg.method === 'session/new') {
    send({ jsonrpc: '2.0', id: msg.id, result: { sessionId: 'acp-sess-1' } });
  } else if (msg.method === 'session/load') {
    send({ jsonrpc: '2.0', id: msg.id, result: {} });
  } else if (msg.method === 'session/prompt') {
    const sid = msg.params.sessionId;
    send({ jsonrpc: '2.0', method: 'session/update', params: { sessionId: sid, update: { sessionUpdate: 'agent_thought_chunk', content: { type: 'text', text: 'thinking...' } } } });
    send({ jsonrpc: '2.0', method: 'session/update', params: { sessionId: sid, update: { sessionUpdate: 'tool_call', toolCallId: 'tc1', title: 'read_file' } } });
    permWaiter = (res) => {
      send({ jsonrpc: '2.0', method: 'session/update', params: { sessionId: sid, update: { sessionUpdate: 'agent_message_chunk', content: { type: 'text', text: 'ACP-' + res.outcome.optionId } } } });
      send({ jsonrpc: '2.0', id: msg.id, result: { stopReason: 'end_turn' } });
    };
    send({ jsonrpc: '2.0', id: 99, method: 'session/request_permission', params: { sessionId: sid, options: [{ optionId: 'allow_once', kind: 'allow_once' }] } });
  }
});
`, 'utf8');
  chmodSync(fakeAcp, 0o755);

  const acpRun = await handleNativeRequest({
    id: 'a1',
    action: 'agent_run',
    agentId: 'acp:custom-1',
    acpCommand: `"${process.execPath}" "${fakeAcp}"`,
    agentName: 'MockACP',
    cwd: os.tmpdir(),
    prompt: 'test acp',
  });
  assert.equal(acpRun.ok, true);
  assert.equal(acpRun.externalSessionId, 'acp-sess-1');
  assert.equal(acpRun.text, 'ACP-allow_once');
  assert.equal(acpRun.thinking, 'thinking...');
  assert.equal(acpRun.toolSteps[0].name, 'read_file');

  const acpTurn2 = await handleNativeRequest({
    id: 'a2',
    action: 'agent_run',
    agentId: 'acp:custom-1',
    acpCommand: `"${process.execPath}" "${fakeAcp}"`,
    externalSessionId: 'acp-sess-1',
    cwd: os.tmpdir(),
    prompt: 'turn 2',
  });
  assert.equal(acpTurn2.ok, true);
  assert.equal(acpTurn2.externalSessionId, 'acp-sess-1');
});

test('pi JSON parser and runner recover streamed deltas, handle >192KB logs, and surface empty/error turns', async t => {
  const partialStream = parsePiJsonEvents([
    JSON.stringify({ type: 'session', id: 's-stream' }),
    JSON.stringify({ type: 'message_start', message: { role: 'assistant', provider: 'openai-codex', model: 'gpt-6.1-sol' } }),
    JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'thinking_delta', delta: 'step1 ' } }),
    JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: '{"worth":true,' } }),
    JSON.stringify({ type: 'message_update', assistantMessageEvent: { type: 'text_delta', delta: '"score":0.88}' } }),
  ].join('\n'));
  assert.equal(partialStream.text, '{"worth":true,"score":0.88}');
  assert.equal(partialStream.thinking, 'step1');

  const prevPi = process.env.TAB_PROJECT_PI_BIN;
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tab-pi-large-'));
  t.after(() => {
    if (prevPi === undefined) delete process.env.TAB_PROJECT_PI_BIN;
    else process.env.TAB_PROJECT_PI_BIN = prevPi;
    rmSync(dir, { recursive: true, force: true });
  });

  const fakePiLarge = path.join(dir, 'pi-large.mjs');
  writeFileSync(fakePiLarge, `#!/usr/bin/env node
const args = process.argv.slice(2);
const prompt = args[args.length - 1] || '';
if (prompt === 'EMPTY') {
  console.log(JSON.stringify({ type: 'session', id: 's-empty' }));
  console.log(JSON.stringify({ type: 'message_end', message: { role: 'assistant', errorMessage: 'Upstream quota exceeded', content: [] } }));
  process.exit(0);
}
console.log(JSON.stringify({ type: 'session', id: 's-big' }));
console.log(JSON.stringify({ type: 'message_start', message: { role: 'assistant', provider: 'openai-codex', model: 'gpt-6.1-sol' } }));
for (let i = 0; i < 1200; i++) {
  console.log(JSON.stringify({
    type: 'message_update',
    usage: { input: 100, output: i, totalTokens: 100 + i },
    assistantMessageEvent: { type: 'text_delta', contentIndex: 0, delta: '字' }
  }));
}
console.log(JSON.stringify({
  type: 'message_end',
  message: {
    role: 'assistant',
    provider: 'openai-codex',
    model: 'gpt-6.1-sol',
    durationMs: 250,
    content: [{ type: 'text', text: 'FINAL_REPORT_AFTER_250KB' }]
  }
}));
`, 'utf8');
  chmodSync(fakePiLarge, 0o755);
  process.env.TAB_PROJECT_PI_BIN = fakePiLarge;

  const bigRun = await handleNativeRequest({ id: 'big-1', action: 'pi_run', cwd: os.tmpdir(), prompt: 'BIG' });
  assert.equal(bigRun.ok, true);
  assert.equal(bigRun.text, 'FINAL_REPORT_AFTER_250KB');

  const emptyRun = await handleNativeRequest({ id: 'empty-1', action: 'pi_run', cwd: os.tmpdir(), prompt: 'EMPTY' });
  assert.equal(emptyRun.ok, false);
  assert.match(emptyRun.error, /Upstream quota exceeded/);
});

test('native host github_trending action parses trending HTML and reads READMEs', async t => {
  const prevFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = prevFetch; });

  globalThis.fetch = async url => {
    const s = String(url);
    if (s.startsWith('https://github.com/trending')) {
      return new Response(
        '<article class="Box-row"><h2 class="h3"><a href="/acme/cool-tool">acme / cool-tool</a></h2><p class="col-9 color-fg-muted">CLI helper</p><span itemprop="programmingLanguage">Go</span><a href="/acme/cool-tool/stargazers"><svg></svg>1,500</a><span>230 stars today</span></article>',
        { status: 200 }
      );
    }
    if (s.includes('raw.githubusercontent.com/acme/cool-tool/HEAD/README.md')) {
      return new Response('# Cool Tool\nFast CLI automation helper.', { status: 200 });
    }
    return new Response('Not Found', { status: 404 });
  };

  const res = await handleNativeRequest({ id: 'gh-1', action: 'github_trending', topN: 5, since: 'daily' });
  assert.equal(res.ok, true);
  assert.equal(res.repos.length, 1);
  assert.equal(res.repos[0].fullName, 'acme/cool-tool');
  assert.equal(res.repos[0].stars, 1500);
  assert.equal(res.repos[0].todayStars, 230);
  assert.match(res.repos[0].readmeExcerpt, /Fast CLI automation helper/);
});
