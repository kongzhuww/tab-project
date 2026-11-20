import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('legal documents and local viewer are included in release inputs', async () => {
  const build = await read('scripts/build-release.mjs');
  for (const file of ['legal.css', 'legal.js', 'THIRD-PARTY-LICENSES.md', 'THIRD-PARTY-SERVICES.md', 'PRIVACY.md']) {
    assert.ok(build.includes(`"${file}"`), `${file} missing from release inputs`);
  }
  const html = await read('legal.html');
  assert.match(html, /legal\.js/);
  const settings = await read('src/settings/SettingsView.vue');
  for (const key of ['licenses', 'services', 'privacy']) assert.ok(settings.includes(`legal.html?doc=${key}`));
});

test('locked Rust dependencies have preserved upstream license files', async () => {
  const lock = await read('crates/fast-search/Cargo.lock');
  for (const block of lock.split('[[package]]').slice(1)) {
    const name = block.match(/^name = "([^"]+)"/m)?.[1];
    const version = block.match(/^version = "([^"]+)"/m)?.[1];
    if (!name || name === 'fast-search') continue;
    const files = await readdir(new URL(`../third_party/rust/${name}-${version}/`, import.meta.url));
    assert.ok(files.some(file => /^license/i.test(file)), `Missing license for ${name} ${version}`);
  }
});

test('viewer loads local notices and turns license references into links', async () => {
  const children = [];
  const output = { textContent: '', append: (node) => children.push(node), replaceChildren: () => { children.length = 0; } };
  const document = {
    getElementById: () => output,
    createTextNode: (text) => ({ text }),
    createElement: () => ({})
  };
  const location = new URL('chrome-extension://example/legal.html?doc=licenses');
  vm.runInNewContext(await read('legal.js'), {
    document, location, URL, URLSearchParams,
    fetch: async (file) => ({ ok: true, text: () => read(file) })
  });
  await new Promise(resolve => setTimeout(resolve, 30));
  assert.ok(children.some(node => node.href?.endsWith('/third_party/vue/LICENSE')));
  assert.ok(children.some(node => node.href?.endsWith('/legal.html?doc=services')));
});

test('derived projects retain their upstream copyright and license', async () => {
  assert.match(await read('third_party/agy-claude-style/LICENSE'), /Copyright \(c\) 2026 0DNANCY/);
  assert.match(await read('third_party/dsh-claude-style/LICENSE'), /Copyright \(c\) 2026 Nwflower/);
});
