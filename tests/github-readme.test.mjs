import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const code = async path => stripTypeScriptTypes(await read(path))
  .replace(/^import .*;\s*$/gm, '').replace(/^export \{.*from .*;\s*$/gm, '').replace(/^export /gm, '');
const ctx = vm.createContext({ URL });
vm.runInContext(await code('src/github/readme-html.ts') + '\nglobalThis.resolve = resolveReadmeUrl;', ctx);
const resolve = (url, image = false) => ctx.resolve(url, 'fixture', 'repo', 'main', 'docs/README.md', image);

test('README images resolve relative to document directory or repository root', () => {
  assert.equal(resolve('./img/example.png', true), 'https://raw.githubusercontent.com/fixture/repo/main/docs/img/example.png');
  assert.equal(resolve('../assets/a.svg', true), 'https://raw.githubusercontent.com/fixture/repo/main/assets/a.svg');
  assert.equal(resolve('/assets/a.svg', true), 'https://raw.githubusercontent.com/fixture/repo/main/assets/a.svg');
  assert.equal(resolve('https://github.com/o/r/blob/main/a.png', true), 'https://raw.githubusercontent.com/o/r/main/a.png');
  assert.equal(resolve('//example.com/a.png', true), 'https://example.com/a.png');
});
test('README links retain anchors and point to GitHub, not extension origin', () => {
  assert.equal(resolve('#license'), '#license');
  assert.equal(resolve('../LICENSE'), 'https://github.com/fixture/repo/blob/main/LICENSE');
  assert.equal(resolve('README.zh-CN.md'), 'https://github.com/fixture/repo/blob/main/docs/README.zh-CN.md');
  assert.equal(resolve('/o/r/issues'), 'https://github.com/o/r/issues');
});
test('README media and links reject executable protocols and URL credentials', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'chrome-extension://id/test', 'https://user:pass@example.com/img']) {
    assert.equal(resolve(url), ''); assert.equal(resolve(url, true), '');
  }
  assert.equal(resolve('mailto:a@example.com'), 'mailto:a@example.com');
  assert.equal(resolve('mailto:a@example.com', true), '');
});

test('document reader starts metadata and README together and uses bounded HTML GET only', async () => {
  let release; const pendingMeta = new Promise(resolve => { release = resolve; });
  const calls = [];
  const scope = new AbortController();
  const context = vm.createContext({ URL, TextDecoder, Uint8Array, atob,
    GitHubDetailReadError: Error,
    loadGitHubReadHeaders: async () => ({}),
    readGitHubJson: async path => {
      calls.push(path);
      if (path === '/repos/fixture/repo') return pendingMeta;
      if (path.endsWith('/readme')) return { data: { path: 'README.zh-CN.md', encoding: 'base64', content: btoa('# fixture'), html_url: 'https://github.com/fixture/repo/blob/main/README.zh-CN.md' } };
      throw Error('Unexpected request');
    },
    readGitHubText: async (path, options) => {
      assert.equal(options.timeoutMs, 4000);
      assert.ok(path.includes('/contents/README.zh-CN.md'));
      return { data: '<h1>fixture</h1>' };
    }
  });
  vm.runInContext(await code('src/github/detail-read.ts') + '\nglobalThis.readDoc = readRepositoryDocument;', context);
  const result = context.readDoc('fixture', 'repo', scope.signal);
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(calls, ['/repos/fixture/repo', '/repos/fixture/repo/readme']);
  release({ data: { default_branch: 'main' } });
  assert.equal((await result).html, '<h1>fixture</h1>');
});

test('web rendering keeps README file links as external links, preserving note mode', async () => {
  const context = vm.createContext({});
  vm.runInContext(await code('src/utils/markdown-ast.ts') + '\nglobalThis.engine = markdownAstEngine;', context);
  const md = '[Chinese](https://github.com/o/r/blob/main/README.zh.md)';
  assert.match(context.engine.renderMarkdown(md, { linkMode: 'web' }), /href="https:\/\/github.com/);
  assert.match(context.engine.renderMarkdown(md), /obs-wikilink/);
});
