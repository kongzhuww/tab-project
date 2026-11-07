import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { webDavFetch } from '../src/services/webdav-request.ts';

test('WebDAV strips only the extension request authentication challenge before fetching', async () => {
  const previousChrome = globalThis.chrome;
  const previousFetch = globalThis.fetch;
  let rules = [];
  let rejectUpdate = false;
  const calls = [];
  globalThis.chrome = {
    runtime: { id: 'fixture-extension' },
    declarativeNetRequest: {
      getSessionRules: async () => rules,
      updateSessionRules: async ({ addRules }) => {
        if (rejectUpdate) throw new Error('rule failure');
        rules.push(...addRules);
      }
    }
  };
  globalThis.fetch = async (url, options) => {
    assert.ok(rules.some(rule => new RegExp(rule.condition.regexFilter).test(url)));
    calls.push({ url, options });
    return new Response('', { status: 401 });
  };
  try {
    const target = 'https://dav.example.test/dav/folder/file.json';
    const response = await webDavFetch(target, { method: 'GET', headers: { Authorization: 'Basic fixture' } });
    assert.equal(response.status, 401);
    assert.equal(rules.length, 1);
    assert.deepEqual(rules[0].condition.initiatorDomains, ['fixture-extension']);
    assert.deepEqual(rules[0].condition.resourceTypes, ['xmlhttprequest']);
    assert.deepEqual(rules[0].action.responseHeaders, [{ header: 'WWW-Authenticate', operation: 'remove' }]);
    const pattern = new RegExp(rules[0].condition.regexFilter);
    assert.equal(pattern.test(target + '/elsewhere'), false);
    assert.equal(pattern.test('https://davXexample.test/dav/folder/file.json'), false);
    assert.equal(calls[0].options.credentials, 'omit');
    assert.equal(calls[0].options.redirect, 'error');
    assert.equal(calls[0].options.headers.Authorization, 'Basic fixture');
    await webDavFetch(target, { method: 'PUT', body: '{}' });
    assert.equal(rules.length, 1);
    await Promise.all([
      webDavFetch(target + '?a=1', { method: 'MKCOL' }),
      webDavFetch(target + '?b=2', { method: 'PROPFIND' })
    ]);
    assert.equal(new Set(rules.map(rule => rule.id)).size, 3);
    const before = calls.length;
    rejectUpdate = true;
    await assert.rejects(webDavFetch(target + '?fail', {}), /rule failure/);
    assert.equal(calls.length, before);
    rejectUpdate = false;
    await webDavFetch(target + '?retry', {});
    delete globalThis.chrome;
    await assert.rejects(webDavFetch(target, {}), /未发送请求/);
    await assert.rejects(webDavFetch('https://user:password@example.test/', {}), /地址无效/);
  } finally {
    globalThis.chrome = previousChrome;
    globalThis.fetch = previousFetch;
  }
});

test('all WebDAV HTTP operations use the protected transport', async () => {
  const source = await readFile(new URL('../src/services/webdav.service.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /\bfetch\(/);
  assert.equal((source.match(/await webDavFetch\(/g) || []).length, 5);
});
