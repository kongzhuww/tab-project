import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { posix } from 'node:path';
import ts from 'typescript';
import * as vue from 'vue';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const paths = ['src/core/fullscreen-card-state.ts', 'src/core/fullscreen-presentation.ts', 'src/core/fullscreen-cards.store.ts', 'src/dock/store.ts', 'src/dock/default-order.ts'];
const compiled = new Map(await Promise.all(paths.map(async path => [path, ts.transpileModule(await read(path), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText])));
const bootstrap = ts.transpileModule(await read('src/intro/page-init.ts'), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
const entry = await read('newtab.html');
const criticalCss = entry.match(/<style>([\s\S]*?)<\/style>/)[1];
function classList(initial = []) {
  const values = new Set(initial);
  return { add: value => values.add(value), remove: value => values.delete(value), contains: value => values.has(value),
    toggle(value, enabled) { const next = enabled ?? !values.has(value); if (next) values.add(value); else values.delete(value); return next; } };
}
function storage(initial = []) {
  const map = new Map(initial);
  return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, String(value)), removeItem: key => map.delete(key) };
}
function launcherHidden(document) {
  // Evaluate only the actual entry-point critical selectors relevant to this regression.
  for (const match of criticalCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!/display:\s*none\s*!important/.test(match[2])) continue;
    for (const selector of match[1].split(',').map(value => value.trim())) {
      if (selector === 'html.has-card-fullscreen .launcher' && document.documentElement.classList.contains('has-card-fullscreen')) return true;
      if (selector === 'body.has-card-fullscreen .launcher' && document.body.classList.contains('has-card-fullscreen')) return true;
    }
  }
  return false;
}
function fixture({ hash = '', saved = null, path = '/newtab.html' } = {}) {
  const scope = vue.effectScope(), modules = new Map(), calls = [];
  const location = new URL('https://fixture.invalid' + path + hash);
  const document = { documentElement: { classList: classList(), dataset: {} }, body: { classList: classList(), dataset: {} },
    getElementById: () => null, querySelector: () => null };
  const session = storage(saved ? [['lw_active_card', saved]] : []);
  const local = storage();
  const window = { location, addEventListener() {}, scrollTo: () => calls.push('scroll'),
    chrome: { runtime: { getURL: target => 'https://fixture.invalid/' + target }, tabs: {
      query: (_options, callback) => callback([{ id: 11, url: 'https://fixture.invalid/newtab.html', windowId: 1 }]),
      update: (id, values) => calls.push(['tab', id, values.active]), create: () => calls.push('create-tab')
    }, windows: { update() {} } }, setTimeout: () => 1 };
  const context = vm.createContext({ window, document, location, sessionStorage: session, localStorage: local,
    history: { replaceState(_state, _title, url) { location.href = new URL(url, location.href).href; } },
    requestAnimationFrame: callback => { callback(); return 1; }, clearTimeout() {} });
  const windowManager = { releaseFocus: id => calls.push(['release', id]), onStateChange() {} };
  const dependencies = {
    'src/core/window-manager.store.ts': { windowManagerController: windowManager },
    'src/core/navigation-state.ts': { getStandaloneCardId: () => null },
    'src/modules/registry.ts': { getDockModule: () => undefined, touchDockModuleTransition: () => {} },
    'src/modules/builtins.ts': { mergeBuiltinDockCards: () => [], mergeBuiltinDockTools: () => [] },
    'src/modules/market-store.ts': { pluginMarketController: { isInstalled: () => true } }
  };
  function load(path) {
    if (dependencies[path]) return dependencies[path];
    if (modules.has(path)) return modules.get(path).exports;
    const source = compiled.get(path); if (!source) throw Error('Unexpected dependency: ' + path);
    const module = { exports: {} }; modules.set(path, module);
    const run = vm.runInContext('(function(require, module, exports) {\n' + source + '\n})', context);
    run(name => name === 'vue' ? vue : load(posix.normalize(posix.join(posix.dirname(path), name + '.ts'))), module, module.exports);
    return module.exports;
  }
  vm.runInContext(bootstrap, context);
  let state, controller, dock, sync;
  scope.run(() => {
    state = load('src/core/fullscreen-card-state.ts').fullscreenCardState;
    sync = load('src/core/fullscreen-presentation.ts').syncFullscreenPresentation;
    controller = load('src/core/fullscreen-cards.store.ts').fullscreenCardsController;
    dock = load('src/dock/store.ts').macDockController;
    // App.vue owns this synchronous runtime presentation watch.
    vue.watch(() => state.activeId, sync, { immediate: true, flush: 'sync' });
  });
  return { document, state, controller, dock, session, location, calls, sync, dispose: () => scope.stop() };
}

for (const card of ['daily-bilibili', 'card-github']) {
  for (const restore of ['hash', 'session']) {
    test(`Dock Home restores launcher after ${card} startup via ${restore}`, async () => {
      const f = fixture(restore === 'hash' ? { hash: '#' + card } : { saved: card });
      try {
        assert.equal(f.state.activeId, card); assert.equal(launcherHidden(f.document), true);
        // Also repair markers left by a prior version's bootstrap.
        f.document.documentElement.classList.add('has-card-fullscreen');
        f.dock.triggerItem('home', 'home-launcher'); await vue.nextTick();
        assert.equal(f.state.activeId, null); assert.equal(launcherHidden(f.document), false);
        assert.equal(f.document.documentElement.classList.contains('has-card-fullscreen'), false);
        assert.equal(f.document.body.classList.contains('has-card-fullscreen'), false);
        assert.equal(f.document.body.dataset.page, 'home');
        assert.equal(f.session.getItem('lw_active_card'), null); assert.equal(f.location.hash, '');
      } finally { f.dispose(); }
    });
  }
}

test('normal Bilibili/GitHub switching and repeated Home do not leave stale fullscreen CSS', () => {
  const f = fixture();
  try {
    for (let round = 0; round < 3; round++) {
      f.controller.enter('daily-bilibili'); f.controller.enter('card-github');
      assert.equal(launcherHidden(f.document), true);
      f.dock.triggerItem('home', 'home-launcher'); assert.equal(launcherHidden(f.document), false);
      f.document.documentElement.classList.add('has-card-fullscreen');
      f.document.body.classList.add('has-card-fullscreen');
      f.dock.triggerItem('home', 'home-launcher'); assert.equal(launcherHidden(f.document), false);
    }
  } finally { f.dispose(); }
});

test('exit with no selected card still reconciles legacy fullscreen markers', () => {
  const f = fixture();
  try {
    f.document.documentElement.classList.add('has-card-fullscreen');
    f.document.body.classList.add('has-card-fullscreen');
    f.controller.exit();
    assert.equal(launcherHidden(f.document), false);
    assert.equal(f.document.documentElement.classList.contains('has-card-fullscreen'), false);
    assert.equal(f.document.body.dataset.page, 'home');
  } finally { f.dispose(); }
});

test('standalone workspace Home still activates the existing main tab, not local navigation', () => {
  const f = fixture({ path: '/github.html' });
  try {
    f.dock.triggerItem('home', 'home-launcher');
    assert.deepEqual(f.calls.find(call => Array.isArray(call) && call[0] === 'tab'), ['tab', 11, true]);
    assert.equal(f.calls.includes('create-tab'), false);
  } finally { f.dispose(); }
});

test('early-paint entry rules no longer hide Home via a persistent html marker', () => {
  assert.doesNotMatch(criticalCss, /html\.has-card-fullscreen/);
  assert.match(criticalCss, /body\.has-card-fullscreen \.launcher/);
});
