import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';

const source = async path => stripTypeScriptTypes(await readFile(new URL('../' + path, import.meta.url), 'utf8'))
  .replace(/^import .*?;\s*$/gm, '').replace(/^export /gm, '');
const slot = await source('src/core/read-session.ts');
const flush = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };
function sandbox(extra = {}) {
  return vm.createContext({ AbortController, DOMException, URL, setTimeout, clearTimeout,
    reactive: x => x, readonly: x => x, ...extra });
}

test('discovery read survives view detach and returns without duplicate fetch', async () => {
  const pending = deferred(); let calls = 0;
  const ctx = sandbox({ loadGitHubReadHeaders: async () => ({}),
    readGitHubJson: async () => { calls++; return pending.promise; }, GitHubReadError: Error });
  vm.runInContext(slot + '\n' + await source('src/github/trending-store.ts') + '\nglobalThis.api = gitHubTrendingController;', ctx);
  const first = new AbortController();
  const detach = ctx.api.attachView(first.signal);
  await flush(); first.abort(); detach();
  assert.equal(ctx.api.state.isLoading, true);
  const second = new AbortController(); ctx.api.attachView(second.signal);
  pending.resolve({ data: { items: [{ full_name: 'fixture/repo' }] } });
  await flush();
  assert.equal(calls, 1);
  assert.equal(ctx.api.state.hasLoaded, true);
  assert.equal(ctx.api.state.errorMessage, '');
});

async function details() {
  const pending = [];
  const ctx = sandbox({ document: { hidden: false }, githubTaskCreation: { saving: false },
    GitHubDetailReadError: Error, prepareReadmeHtml: html => html, markdownAstEngine: { renderMarkdown: () => '<p>fixture</p>' },
    readRepositoryDocument: async () => { const task = deferred(); pending.push(task); return task.promise; } });
  vm.runInContext(slot + '\n' + await source('src/github/repo-detail-store.ts') + '\nglobalThis.api = githubRepoDetailController; globalThis.state = githubRepoDetailState;', ctx);
  return { ctx, pending };
}
const documentResult = text => ({ markdown: text, html: '', metadata: null, branch: 'main', path: 'README.md', isZh: false, notice: '' });

test('README completes while page hidden', async () => {
  const { ctx, pending } = await details();
  ctx.api.open('fixture/first'); ctx.api.setPageActive(false);
  pending[0].resolve(documentResult('background result')); await flush();
  assert.equal(ctx.state.hasReadme, true);
  assert.equal(ctx.state.readmeMarkdown, 'background result');
  assert.equal(ctx.state.isLoading, false);
  assert.equal(ctx.state.error, null);
});

test('replaced README cannot overwrite new repository or clear its loading', async () => {
  const { ctx, pending } = await details();
  ctx.api.open('fixture/first'); ctx.api.open('fixture/second');
  pending[0].resolve(documentResult('old')); await flush();
  assert.equal(ctx.state.fullName, 'fixture/second');
  assert.equal(ctx.state.isLoading, true);
  assert.equal(ctx.state.readmeMarkdown, '');
  pending[1].resolve(documentResult('new')); await flush();
  assert.equal(ctx.state.readmeMarkdown, 'new');
});

test('account change invalidates background README and rejects stale content', async () => {
  const { ctx, pending } = await details();
  ctx.api.open('fixture/first'); ctx.api.setPageActive(false);
  ctx.api.accountStorageChanged({ ghToken: {} }, 'local');
  pending[0].resolve(documentResult('stale account')); await flush();
  assert.equal(ctx.state.hasReadme, false);
  assert.equal(ctx.state.isLoading, false);
  assert.match(ctx.state.error, /账号/);
});

test('recent README reopens from memory; account change while closed clears cache', async () => {
  const { ctx, pending } = await details();
  ctx.api.open('fixture/first');
  pending[0].resolve(documentResult('cached')); await flush();
  ctx.api.close(); ctx.api.open('fixture/first');
  assert.equal(pending.length, 1);
  assert.equal(ctx.state.readmeMarkdown, 'cached');
  assert.equal(ctx.state.isLoading, false);
  ctx.api.close(); ctx.api.accountStorageChanged({ ghUser: {} }, 'local');
  ctx.api.open('fixture/first');
  assert.equal(pending.length, 2);
  pending[1].resolve(documentResult('fresh')); await flush();
});

test('closed README ignores late completion', async () => {
  const { ctx, pending } = await details();
  ctx.api.open('fixture/first'); ctx.api.close();
  pending[0].resolve(documentResult('late')); await flush();
  assert.equal(ctx.state.isOpen, false);
  assert.equal(ctx.state.hasReadme, false);
});

test('home exit synchronizes fullscreen state and body navigation markers', async () => {
  const classes = new Set(['has-card-fullscreen']); const storage = new Map();
  const ctx = sandbox({ fullscreenCardState: { activeId: 'card-github' }, ACTIVE_CARD_SESSION_KEY: 'active',
    getDockModule: () => undefined, touchDockModuleTransition: () => {}, bindFullscreenCardActions: () => {},
    windowManagerController: { releaseFocus: () => {} },
    window: { scrollTo: () => {} }, sessionStorage: { removeItem: k => storage.delete(k) },
    document: { body: { dataset: { page: 'daily' }, classList: { remove: k => classes.delete(k) } } } });
  // This module has one multiline import and one re-export in addition to normal imports.
  let code = await source('src/core/fullscreen-cards.store.ts');
  code = code.replace(/import \{[\s\S]*?\} from "\.\/fullscreen-card-state";/, '')
    .replace(/^\{ fullscreenCardState \} from .*;$/gm, '');
  vm.runInContext(code + '\nfullscreenCardsController.exit();', ctx);
  assert.equal(ctx.fullscreenCardState.activeId, null);
  assert.equal(ctx.document.body.dataset.page, 'home');
  assert.equal(classes.has('has-card-fullscreen'), false);
});
