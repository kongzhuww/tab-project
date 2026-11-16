import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';

test('AI Hot navigation stays to the left of its main content', async () => {
  const component = await readFile('src/aihot/AihotFeed.vue', 'utf8');
  const css = await readFile('src/styles/newtab-components.css', 'utf8');
  const workspace = component.split('<div class="aihot-workspace">')[1].split('</section>')[0];
  assert.ok(workspace.indexOf('<nav id="aihot-tabs"') < workspace.indexOf('<main class="aihot-main">'));
  assert.ok(workspace.indexOf('<main class="aihot-main">') < workspace.indexOf('id="aihot-body"'));
  assert.equal((workspace.match(/class="aihot-nav-card /g) || []).length, 3);
  assert.match(css, /\.aihot-workspace\s*\{[^}]*grid-template-columns:var\(--workspace-sidebar-width,210px\)/);
  assert.match(css, /\.aihot-tabs\s*\{[^}]*flex-direction:column/);
  assert.match(css, /@container \(max-width: 740px\)/);
  assert.match(css, /#daily-aihot\.card-fullscreen \.aihot-workspace\s*\{[^}]*--workspace-sidebar-fullscreen-width/);
});

test('Bilibili and AI Hot use shared sidebar rules and width tokens', async () => {
  const css = postcss.parse(await readFile('src/styles/sidebar-features.css', 'utf8'));
  const bili = await readFile('src/bilibili/BiliFavorites.css', 'utf8');
  const ai = await readFile('src/styles/newtab-components.css', 'utf8');
  const imports = await readFile('src/assets/styles.css', 'utf8');
  assert.match(imports, /sidebar-features\.css/);
  for (const token of ['--workspace-sidebar-width','--workspace-sidebar-compact-width','--workspace-sidebar-fullscreen-width']) {
    assert.ok(bili.includes(`var(${token},`), `Bilibili misses ${token}`);
    assert.ok(ai.includes(`var(${token},`), `AI Hot misses ${token}`);
  }
  for (const [left,right] of [
    ['.fo-sidebar-sub-wrap','.aihot-nav-wrap'], ['.fo-sidebar-sub-btn','.aihot-tabs .aihot-nav-card'],
    ['.fo-sidebar-sub-main','.aihot-nav-main'], ['.fo-sidebar-sub-icon','.aihot-nav-icon'],
    ['.fo-sidebar-sub-text','.aihot-nav-copy'], ['.fo-sidebar-sub-text strong','.aihot-nav-copy strong'],
    ['.fo-sidebar-sub-text small','.aihot-nav-copy small'], ['.fo-sidebar-sub-badge','.aihot-nav-badge']
  ]) {
    let found = false;
    css.walkRules(rule => { const selectors=rule.selectors || []; if (selectors.includes(left) && selectors.includes(right)) found=true; });
    assert.ok(found, `${left} and ${right} must share one rule`);
  }
});
