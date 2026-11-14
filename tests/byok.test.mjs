import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const api = await loadTsModule('src/services/byok.service.ts');
const { extractSyncPayload } = await loadTsModule('src/services/sync.service.ts');
const data = {};
globalThis.chrome = { storage: { local: {
  async get(key) { return { [key]: data[key] }; },
  async set(value) { Object.assign(data, structuredClone(value)); }
} } };
const originalFetch = globalThis.fetch;
function sse(chunks) { const encoder = new TextEncoder(); return new Response(new ReadableStream({ start(c) { for (const part of chunks) c.enqueue(encoder.encode(part)); c.close(); } }), { headers: { 'content-type': 'text/event-stream' } }); }

test('BYOK config stays local and is absent from ordinary backups', async () => {
  await api.saveConfig('example-key', 'deepseek-flash');
  assert.equal((await api.loadConfig()).key, 'example-key');
  const payload = extractSyncPayload({ ...data, showWeather: true });
  assert.doesNotMatch(JSON.stringify(payload), /example-key|byokConfigV1/);
  await api.clearConfig(); assert.equal((await api.loadConfig()).key, '');
});

test('fetches and validates DeepSeek models with a read-only request', async () => {
  let request;
  globalThis.fetch = async (url, init) => { request = { url, init }; return Response.json({ data: [{id:'deepseek-flash'}, {id:'deepseek-v4-pro'}, {id:'deepseek-flash'}, {id:'invalid model'}] }); };
  try {
    const models = await api.fetchDeepSeekModels('example-key');
    assert.deepEqual(models, ['deepseek-flash','deepseek-v4-pro']);
    assert.equal(request.url, 'https://api.deepseek.com/models'); assert.equal(request.init.method, undefined); assert.equal(request.init.credentials,'omit'); assert.equal(request.init.redirect,'error');
    await api.saveConfig('example-key',models[0],models);
    assert.deepEqual((await api.loadConfig()).models, models);
    await api.saveConfig('different-key',models[0]);
    assert.deepEqual((await api.loadConfig()).models, []);
    await api.clearConfig();
  } finally { globalThis.fetch = originalFetch; }
});

test('model discovery refuses HTTP errors and malformed payloads without exposing credentials', async () => {
  globalThis.fetch = async () => new Response('example-key secret', {status:401});
  try {
    await assert.rejects(api.fetchDeepSeekModels('example-key'), e => /401/.test(e.message) && !e.message.includes('example-key'));
    globalThis.fetch = async () => Response.json({data:{}});
    await assert.rejects(api.fetchDeepSeekModels('example-key'), /格式无效/);
  } finally { globalThis.fetch = originalFetch; }
});

test('DeepSeek streams split SSE events once without leaking to another endpoint', async () => {
  let calls = 0, request;
  globalThis.fetch = async (url, init) => { calls++; request = { url, init }; return sse(['data: {"choices":[{"delta":{"content":"你"}}]}\r', '\n\r\ndata: {"choices":[{"delta":{"content":"好"}}]}\n\ndata: [DO', 'NE]\n\n']); };
  try {
    let result = '';
    await api.streamDeepSeek('example-key', 'deepseek-flash', [{ role:'user', content:'hello' }, {role:'assistant',content:'partial',incomplete:true}], new AbortController().signal, t => result += t);
    assert.equal(result, '你好'); assert.equal(calls, 1);
    assert.equal(request.url, 'https://api.deepseek.com/chat/completions');
    assert.equal(request.init.credentials, 'omit'); assert.equal(request.init.redirect, 'error');
    assert.deepEqual(JSON.parse(request.init.body).messages, [{ role:'user', content:'hello' }]);
  } finally { globalThis.fetch = originalFetch; }
});

test('supported DeepSeek thinking effort and streamed reasoning stay separate from history', async () => {
  let request;
  globalThis.fetch = async (_url, init) => { request = JSON.parse(init.body); return sse(['data: {"choices":[{"delta":{"reasoning_content":"思考","content":"回答"}}]}\n\ndata: [DONE]\n\n']); };
  try {
    let answer='', reasoning='';
    await api.streamDeepSeek('example-key','deepseek-flash',[{role:'assistant',content:'old',reasoning:'private thought'},{role:'user',content:'next'}],new AbortController().signal,t=>answer+=t,'max',t=>reasoning+=t);
    assert.equal(request.reasoning_effort,'max'); assert.equal(reasoning,'思考'); assert.equal(answer,'回答');
    assert.deepEqual(request.messages,[{role:'assistant',content:'old'},{role:'user',content:'next'}]);
    await api.streamDeepSeek('example-key','unknown-model',[{role:'user',content:'x'}],new AbortController().signal,()=>{},'high');
    assert.equal(request.reasoning_effort,undefined);
  } finally { globalThis.fetch = originalFetch; }
});

test('truncated stream errors and a write is never retried', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return sse(['data: {"choices":[{"delta":{"content":"partial"}}]}\n\n']); };
  try { await assert.rejects(api.streamDeepSeek('example-key','deepseek-flash',[{role:'user',content:'hello'}],new AbortController().signal,()=>{}), /提前中断/); assert.equal(calls,1); }
  finally { globalThis.fetch = originalFetch; }
});

test('streaming cancellation aborts without retry', async () => {
  let calls = 0;
  const controller = new AbortController();
  globalThis.fetch = async (_url, init) => { calls++; return new Response(new ReadableStream({ start(c) { init.signal.addEventListener('abort', () => c.error(new DOMException('aborted', 'AbortError'))); } })); };
  try {
    const operation = api.streamDeepSeek('example-key', 'deepseek-flash', [{role:'user', content:'hello'}], controller.signal, () => {});
    controller.abort();
    await assert.rejects(operation, {name:'AbortError'}); assert.equal(calls, 1);
  } finally { globalThis.fetch = originalFetch; }
});

test('API error text does not expose response bodies or secrets', async () => {
  globalThis.fetch = async () => new Response('example-key secret', {status:401});
  try { await assert.rejects(api.streamDeepSeek('example-key','deepseek-flash',[{role:'user',content:'hello'}],new AbortController().signal,()=>{}), e => /401/.test(e.message) && !e.message.includes('example-key')); }
  finally { globalThis.fetch = originalFetch; }
});

test('history limit never silently discards an existing conversation', async () => {
  data.byokConversationsV1 = Array.from({length:50}, (_,i) => ({id:String(i),provider:'deepseek',model:'deepseek-flash',title:'x',updatedAt:i,messages:[]}));
  await assert.rejects(api.saveConversation({id:'new',provider:'deepseek',model:'deepseek-flash',title:'new',updatedAt:1,messages:[]}), /50 条/);
  assert.equal((await api.loadConversations()).length,50);
  delete data.byokConversationsV1;
});

test('local conversations roundtrip and deletion does not affect Key', async () => {
  await api.saveConfig('example-key','deepseek-flash');
  await api.saveConversation({id:'one',provider:'deepseek',model:'deepseek-flash',title:'hello',updatedAt:1,messages:[{role:'user',content:'hello'}]});
  assert.equal((await api.loadConversations())[0].messages[0].content,'hello');
  assert.doesNotMatch(JSON.stringify(extractSyncPayload({ ...data })), /byokConversationsV1|hello|example-key/);
  await api.deleteConversation('one'); assert.equal((await api.loadConversations()).length,0); assert.equal((await api.loadConfig()).key,'example-key');
  await api.clearConfig();
});
