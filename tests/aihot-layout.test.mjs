import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import postcss from 'postcss';

test('AI Hot navigation is a vertical left column beside its main content', async () => {
  const component = await readFile('src/aihot/AihotFeed.vue', 'utf8');
  const css = await readFile('src/styles/newtab-components.css', 'utf8');
  const workspace = component.split('<div class="aihot-workspace">')[1].split('</section>')[0];
  assert.ok(workspace.indexOf('<nav id="aihot-tabs"') < workspace.indexOf('<main class="aihot-main">'));
  assert.ok(workspace.indexOf('<main class="aihot-main">') < workspace.indexOf('id="aihot-body"'));
  assert.equal((workspace.match(/class="aihot-nav-card /g) || []).length, 3);
  assert.match(css, /\.aihot-workspace\s*\{[^}]*grid-template-columns:210px minmax\(0,1fr\)/);
  assert.match(css, /\.aihot-tabs\s*\{[^}]*flex-direction:column/);
  assert.match(css, /@container \(max-width: 740px\)/);
  assert.match(css, /#daily-aihot\.card-fullscreen \.aihot-workspace\s*\{[^}]*grid-template-columns:220px minmax\(0,1fr\)/);
});

test('AI Hot sidebar uses the Bilibili sidebar and card dimensions', async () => {
  const bili = postcss.parse(await readFile('src/bilibili/BiliFavorites.css', 'utf8'));
  const ai = postcss.parse(await readFile('src/styles/newtab-components.css', 'utf8'));
  function properties(root, selector) {
    let found;
    root.walkRules(rule => { if (!found && rule.selector === selector && rule.parent.type === 'root') found = rule; });
    assert.ok(found, `missing ${selector}`);
    return Object.fromEntries(found.nodes.filter(n => n.type === 'decl').map(n => [n.prop, n.value.replace(/\s+/g, '')]));
  }
  for (const [left,right,keys] of [
    ['.fo-bili-layout','.aihot-workspace',['grid-template-columns','border-radius']],
    ['.fo-bili-sidebar','.aihot-tabs',['padding','border-right']],
    ['.fo-sidebar-sub-wrap','.aihot-nav-wrap',['padding','margin-bottom','border-bottom']],
    ['.fo-sidebar-sub-btn','.aihot-tabs .aihot-nav-card',['padding','border-radius','width']],
    ['.fo-sidebar-sub-icon','.aihot-nav-icon',['font-size','line-height']],
    ['.fo-sidebar-sub-text strong','.aihot-nav-copy strong',['font-size','font-weight','line-height']],
    ['.fo-sidebar-sub-text small','.aihot-nav-copy small',['font-size','white-space']],
    ['.fo-sidebar-sub-badge','.aihot-nav-badge',['font-size','font-weight','padding','border-radius','letter-spacing']]
  ]) {
    const a = properties(bili,left), b = properties(ai,right);
    for (const key of keys) assert.equal(b[key],a[key], `${right} ${key} differs from ${left}`);
  }
});
