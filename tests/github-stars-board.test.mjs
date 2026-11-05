import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
import { shallowReactive, reactive, computed } from 'vue';
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const code = async path => stripTypeScriptTypes(await read(path))
  .replace(/^import\s[\s\S]*?;\s*$/gm, '').replace(/^export /gm, '');
function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const repo = { id: 1, name: 'one', full_name: 'fixture/one' };
async function fixture() {
  const context = vm.createContext({ shallowReactive, reactive, computed, AbortController,
    GH_REMARKS_KEY: 'fixture-remarks',
    categoryFeedback: { busy: false },
    githubStatusController: { update() {} }, githubFolderController: { update() {} },
    console: { warn() {} }
  });
  vm.runInContext(await code('src/github/stars-board-data.ts'), context);
  vm.runInContext(await code('src/github/local-star-groups.ts'), context);
  context.loadLocalStarGroups = async owner => ({ version: 1, owner, groups: [], memberships: {} });
  const service = (await code('src/services/github.service.ts'))
    .replace(/^const gitHubService = GitHubService.getInstance\(\);\s*$/m, '');
  vm.runInContext(service + '\nglobalThis.api = Object.create(GitHubService.prototype);', context);
  const api = context.api;
  Object.assign(api, {
    starWrites: 0, initializing: false, loadingPage: 0, loadingAllStars: false, listsLoading: false,
    allStarsLoaded: false, total: 1, baseUrl: 'https://api.github.com/users/fixture/starred',
    headers: {}, token: '', repos: [], pages: new Map(), categoryRepos: [], repoNodeIds: new Map(),
    repoListNames: new Map(), repoListIds: new Map(), lists: [], listsRevision: 0,
    uncertainStars: new Map(), UNCAT: '未分类', actionMessage: '', actionError: false, pageReadVersion: 0,
    page: 1, searchQuery: '', cacheKey: 'user:fixture', configuredUser: '',
    sections: ['默认'], activeSection: '默认'
  });
  // Other workspace projections are outside this fixture; keep the real board/status publishers.
  api.publishAll = () => { api.publishStatus(); api.publishFolders(); };
  context.gitHubService = api;
  vm.runInContext(await code('src/github/stars-board-store.ts') + '\nglobalThis.board = starBoardController;', context);
  vm.runInContext('globalThis.view = starBoardData;', context);
  return { api, context, board: context.board, view: context.view };
}

test('mounted board observes repository, list and in-place membership updates without navigation', async () => {
  const { api, board } = await fixture();
  const count = computed(() => board.filteredUncatRepos.length);
  const inList = computed(() => board.getReposForList('tools').length);
  assert.equal(count.value, 0); assert.equal(inList.value, 0);
  api.repos = [repo]; api.publishAll();
  assert.equal(count.value, 1);
  api.lists = [{ id: 'fixture-list', name: 'tools', totalCount: 1 }];
  api.repoListNames.set('fixture/one', ['tools']); api.publishAll();
  assert.equal(count.value, 0); assert.equal(inList.value, 1);
  assert.equal(board.lists.length, 1);
  api.repoListNames.clear(); api.publishAll();
  assert.equal(count.value, 1); assert.equal(inList.value, 0);
});

test('full Star read stops the spinner on success and commits a complete snapshot', async () => {
  const { api, view, board } = await fixture();
  const pending = deferred(); api.fetchStarredWithRetry = () => pending.promise;
  const busy = computed(() => view.loading);
  assert.equal(busy.value, false);
  const job = api.ensureAllStarsLoaded();
  assert.equal(busy.value, true);
  pending.resolve({ items: [repo] }); await job;
  assert.equal(busy.value, false); assert.equal(api.allStarsLoaded, true);
  assert.equal(board.filteredUncatRepos.length, 1);
});

test('failed and genuinely empty reads finish loading, rather than looping skeletons', async () => {
  for (const fail of [false, true]) {
    const { api, view } = await fixture();
    const pending = deferred(); api.fetchStarredWithRetry = () => pending.promise;
    const job = api.ensureAllStarsLoaded(); assert.equal(view.loading, true);
    if (fail) pending.reject(Error('fixture network failure')); else pending.resolve({ items: [] });
    await job;
    assert.equal(view.loading, false); assert.equal(view.repos.length, 0);
    assert.equal(api.actionError, fail);
  }
});

test('page reads publish both starting and settled states', async () => {
  const { api, view } = await fixture();
  const pending = deferred(); api.fetchStarredWithRetry = () => pending.promise;
  const job = api.loadPage(1); assert.equal(view.loading, true);
  pending.resolve({ items: [repo] }); await job;
  assert.equal(view.loading, false); assert.equal(view.repos.length, 1);
});

test('late completion after cancellation cannot stop a newer read spinner', async () => {
  const { api, view } = await fixture();
  const old = deferred(), next = deferred();
  api.fetchStarredWithRetry = () => old.promise;
  const first = api.ensureAllStarsLoaded();
  api.pauseRepositoryReads(); assert.equal(view.loading, false);
  api.fetchStarredWithRetry = () => next.promise;
  const second = api.loadPage(1); assert.equal(view.loading, true);
  old.resolve({ items: [repo] }); await first;
  assert.equal(view.loading, true);
  next.resolve({ items: [] }); await second;
  assert.equal(view.loading, false);
});

test('local groups read loading settles independently from Star pages', async () => {
  const { api, view, context } = await fixture();
  api.token = 'fixture-not-a-credential';
  const pending = deferred(); context.loadLocalStarGroups = () => pending.promise;
  const job = api.loadLists(); assert.equal(view.loading, true);
  pending.resolve({ version: 1, owner: 'user:fixture', groups: [], memberships: {} });
  await job; assert.equal(view.loading, false);
});

test('empty or failed initialization releases loading without a page remount', async () => {
  for (const fail of [false, true]) {
    const { api, view, context } = await fixture();
    Object.assign(api, { selectedRepos: new Set(), accountRevision: 0, remarksRevision: 0,
      configuredUser: 'previous-fixture', cacheKey: 'previous-owner',
      lists: [{ id: 'old-list', name: 'old-account-list', totalCount: 1 }],
      repoListNames: new Map([['fixture/one', ['old-account-list']]]) });
    api.stopAiAnalysis = () => {};
    api.restoreListsCache = async () => {};
    context.createGitHubReadHeaders = () => ({});
    context.isRemarkStorageBusy = () => false;
    const pending = deferred(); api.fetchStarredWithRetry = () => pending.promise;
    const job = api.loadGitHub('fixture', '');
    assert.equal(view.loading, true);
    assert.equal(view.ownerKey, '');
    assert.equal(view.lists.length, 0, 'previous account folders are not shown during identity loading');
    assert.equal(view.repoListNames.size, 0);
    if (fail) pending.reject(Error('fixture unavailable'));
    else pending.resolve({ items: [], link: '' });
    await job;
    assert.equal(view.loading, false);
    assert.equal(view.repos.length, 0);
    assert.equal(api.actionError, fail);
  }
});

async function refreshingFixture() {
  const f = await fixture();
  const old = [repo, { id: 2, name: 'two', full_name: 'fixture/two' }];
  Object.assign(f.api, { cacheKey: 'github-id:42', configuredUser: 'fixture', token: 'fixture-token',
    repos: old, categoryRepos: [...old], pages: new Map([[1, [...old]]]), total: 2, allStarsLoaded: true,
    active: 'tools', selectedRepos: new Set(), accountRevision: 0, remarksRevision: 0,
    lists: [{ id: 'tools-list', name: 'tools', totalCount: 2 }],
    repoListNames: new Map(old.map(repo => [repo.full_name, ['tools']])) });
  f.api.stopAiAnalysis = () => {};
  f.context.createGitHubReadHeaders = () => ({});
  f.context.isRemarkStorageBusy = () => false;
  f.context.readGitHubResponse = async () => ({ data: { id: 42, login: 'fixture' } });
  f.context.chrome = { storage: { local: {
    get: async () => ({ ghStarredCache: { format: 3, owner: 'github-id:42', total: 1, pages: { 1: [repo] } } }),
    set: async () => {}
  } } };
  let listReads = 0, cacheRestores = 0;
  f.api.loadLists = async () => { listReads++; };
  f.api.restoreListsCache = async () => { cacheRestores++; };
  f.api.publishAll();
  return { ...f, old, listReads: () => listReads, cacheRestores: () => cacheRestores };
}
const batch = Array.from({ length: 100 }, (_, i) => ({ id: i + 10, name: `new-${i}`, full_name: `fixture/new-${i}` }));
const tick = () => new Promise(resolve => setImmediate(resolve));

test('same-account refresh preserves open-folder data and selection until all pages commit', async () => {
  const f = await refreshingFixture();
  const first = deferred(), second = deferred(); let calls = 0;
  f.api.fetchStarredWithRetry = () => ++calls === 1 ? first.promise : second.promise;
  const job = f.api.refreshRepositories(); await tick();
  assert.equal(f.view.repos.length, 2); assert.equal(f.board.getReposForList('tools').length, 2);
  assert.equal(f.api.active, 'tools'); assert.equal(f.view.ownerKey, 'github-id:42');
  first.resolve({ items: batch, link: '<https://api.github.com/user/starred?per_page=100&page=2>; rel="next"' });
  await tick();
  assert.equal(calls, 2); assert.equal(f.view.repos.length, 2, 'partial draft is not published');
  assert.equal(f.api.repos.length, 2, 'partial draft does not mutate live service data');
  const last = { id: 999, name: 'last', full_name: 'fixture/last' };
  second.resolve({ items: [last], link: '' }); await job;
  assert.equal(f.view.repos.length, 101); assert.equal(f.api.total, 101);
  assert.equal(f.api.pages.size, 6); assert.equal(f.api.allStarsLoaded, true);
  assert.equal(f.view.repos.some(item => item.full_name === repo.full_name), false, 'confirmed removals are not kept forever');
  assert.equal(f.cacheRestores(), 0, 'stale disk cache cannot shrink the live view');
  assert.equal(f.listReads(), 1, 'refresh schedules Lists once, not twice');
  assert.equal(f.view.loading, false);
});

test('failed later refresh page retains previous complete view and reports stale data', async () => {
  const f = await refreshingFixture();
  const first = deferred(), second = deferred(); let calls = 0;
  f.api.fetchStarredWithRetry = () => ++calls === 1 ? first.promise : second.promise;
  const job = f.api.refreshRepositories(); await tick();
  first.resolve({ items: batch, link: '<https://api.github.com/user/starred?page=2>; rel="next"' }); await tick();
  second.reject(Error('fixture connection failure')); await job;
  assert.equal(f.view.repos.length, 2); assert.equal(f.board.getReposForList('tools').length, 2);
  assert.equal(f.api.total, 2); assert.equal(f.api.allStarsLoaded, true);
  assert.equal(f.api.actionError, true); assert.match(f.api.actionMessage, /保留/);
  assert.equal(f.api.pendingInitialization, undefined); assert.equal(f.view.loading, false);
});

test('cache write failure does not misreport a completed network refresh as old content', async () => {
  const f = await refreshingFixture();
  f.context.chrome.storage.local.set = async () => { throw Error('fixture storage failure'); };
  f.api.fetchStarredWithRetry = async () => ({ items: [batch[0]], link: '' });
  await f.api.refreshRepositories();
  assert.equal(f.view.repos.length, 1); assert.equal(f.view.repos[0].full_name, batch[0].full_name);
  assert.equal(f.api.actionError, true); assert.match(f.api.actionMessage, /仓库已更新.*缓存保存失败/);
  assert.equal(f.view.loading, false);
});

test('successful empty refresh clears stale cards only after response confirmation', async () => {
  const f = await refreshingFixture(); const pending = deferred();
  f.api.fetchStarredWithRetry = () => pending.promise;
  const job = f.api.refreshRepositories(); await tick();
  assert.equal(f.view.repos.length, 2);
  pending.resolve({ items: [], link: '' }); await job;
  assert.equal(f.view.repos.length, 0); assert.equal(f.api.categoryRepos.length, 0);
  assert.equal(f.api.total, 0); assert.equal(f.view.loading, false);
});

test('background full-Star completion cannot shrink existing group cards mid-read', async () => {
  const f = await refreshingFixture(); f.api.allStarsLoaded = false;
  const first = deferred(), second = deferred(); let calls = 0;
  f.api.fetchStarredWithRetry = () => ++calls === 1 ? first.promise : second.promise;
  const job = f.api.ensureAllStarsLoaded();
  first.resolve({ items: batch, link: '<https://api.github.com/user/starred?page=2>; rel="next"' }); await tick();
  assert.equal(f.board.getReposForList('tools').length, 2);
  second.reject(Error('fixture failure')); await job;
  assert.equal(f.board.getReposForList('tools').length, 2);
  assert.equal(f.api.categoryRepos.length, 2); assert.equal(f.api.allStarsLoaded, false);
  assert.equal(f.view.loading, false);
});

test('account switch clears retained view and late refresh cannot overwrite the new account', async () => {
  const f = await refreshingFixture();
  const old = deferred(), next = deferred(); let calls = 0;
  f.api.fetchStarredWithRetry = () => ++calls === 1 ? old.promise : next.promise;
  const refresh = f.api.refreshRepositories(); await tick();
  const switched = f.api.loadGitHub('new-fixture', ''); await tick();
  assert.equal(f.view.repos.length, 0); assert.equal(f.view.lists.length, 0);
  old.resolve({ items: batch, link: '' }); await refresh;
  assert.equal(f.view.repos.length, 0); assert.equal(f.view.loading, true);
  next.resolve({ items: [{ id: 777, name: 'current', full_name: 'new-fixture/current' }], link: '' }); await switched;
  assert.equal(f.view.ownerKey, 'user:new-fixture'); assert.equal(f.view.repos.length, 1);
  assert.equal(f.view.repos[0].full_name, 'new-fixture/current'); assert.equal(f.view.loading, false);
});

test('late Lists cache hydration cannot overwrite a changed account', async () => {
  const { api, context } = await fixture(); const pending = deferred();
  api.cacheKey = 'old-owner';
  context.chrome = { storage: { local: { get: () => pending.promise } } };
  const job = api.restoreListsCache('old-owner');
  api.cacheKey = 'new-owner';
  pending.resolve({ 'ghListsCache_old-owner': { lists: [{ id: 'old', name: 'old' }], cachedRepos: [repo] } });
  await job;
  assert.equal(api.lists.length, 0); assert.equal(api.repos.length, 0);
});

test('shelf skeleton uses the same non-shrinking width class as real cards', async () => {
  const sfc = await read('src/github/GitHubStarsBoard.vue');
  assert.match(sfc, /class="repo gh-card shelf-card skel-card"/);
  assert.match(sfc, /\.shelf-card\s*\{[^}]*flex:\s*0 0 270px/s);
  assert.doesNotMatch(sfc, /gitHubService\.(loadingAllStars|repos|lists|getRepoFolders)/);
  assert.match(sfc, /const isLoading = computed\(\(\) => starBoardData.loading\)/);
});
