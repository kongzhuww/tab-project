import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { auditManifestPermissions, reviewedApiPermissions } from '../scripts/manifest-permission-policy.mjs';

const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));
const clone = () => structuredClone(manifest);

test('current manifest satisfies the reviewed permission ceiling', () => {
  assert.deepEqual(auditManifestPermissions(manifest), []);
});

test('current manifest keeps only HTTP(S) host scope and no generic all_urls', () => {
  assert.ok(!manifest.host_permissions.includes('<all_urls>'));
  assert.ok(manifest.host_permissions.every(value => /^https?:\/\//.test(value)));
  for (const group of manifest.web_accessible_resources) {
    assert.ok(!group.matches.includes('<all_urls>'));
  }
});

test('every reviewed API permission still has a source usage', async () => {
  // Coarse evidence guard: catches stale entries, not proof that every call path is necessary.
  const { execFileSync } = await import('node:child_process');
  const evidence = {
    storage: 'chrome.storage', unlimitedStorage: 'indexedDB',
    bookmarks: 'chrome.bookmarks', favicon: '_favicon', alarms: 'chrome.alarms',
    activeTab: 'chrome.tabs.query', tabs: 'chrome.tabs', cookies: 'cookies',
    declarativeNetRequest: 'declarativeNetRequest', identity: 'chrome.identity',
    scripting: 'chrome.scripting', notifications: 'chrome.notifications',
    downloads: 'downloads.download', contextMenus: 'chrome.contextMenus', clipboardWrite: 'clipboard.write',
  };
  for (const permission of manifest.permissions) {
    assert.ok(evidence[permission], 'Missing evidence mapping for ' + permission);
    const output = execFileSync('git', ['grep', '-l', '-F', evidence[permission], '--', 'src'],
      { cwd: new URL('..', import.meta.url), encoding: 'utf8' });
    assert.ok(output.trim(), 'No source evidence for ' + permission);
  }
});

for (const [name, change, message] of [
  ['unreviewed API permission', m => m.permissions.push('history'), 'Unreviewed API permission'],
  ['duplicate API permission', m => m.permissions.push('storage'), 'duplicates'],
  ['all_urls host access', m => m.host_permissions.push('<all_urls>'), 'Only HTTP(S)'],
  ['file host access', m => m.host_permissions.push('file:///*'), 'Only HTTP(S)'],
  ['retired Multica host', m => m.host_permissions.push('https://api.multica.ai/*'), 'Retired host'],
  ['retired WeRead host', m => m.host_permissions.push('https://*.weread.qq.com/*'), 'Retired host'],
  ['optional broad permission', m => { m.optional_permissions = ['history']; }, 'Unreviewed API permission'],
  ['native side panel', m => { m.side_panel = { default_path: 'sidepanel.html' }; }, 'side_panel'],
  ['automatic content script', m => { m.content_scripts = [{ matches: ['https://*/*'], js: ['x.js'] }]; }, 'content scripts'],
  ['external messaging', m => { m.externally_connectable = { matches: ['https://*/*'] }; }, 'External messaging'],
  ['all_urls web resource', m => { m.web_accessible_resources[0].matches = ['<all_urls>']; }, 'Web-accessible'],
  ['MV2 manifest', m => { m.manifest_version = 2; }, 'MV3'],
]) {
  test('reject ' + name, () => {
    const candidate = clone();
    change(candidate);
    assert.ok(auditManifestPermissions(candidate).some(error => error.includes(message)));
  });
}

test('removing a reviewed permission is allowed', () => {
  const candidate = clone();
  candidate.permissions = candidate.permissions.filter(value => value !== 'alarms');
  assert.deepEqual(auditManifestPermissions(candidate), []);
});

test('policy list matches the manifest exactly so removals update the ceiling deliberately', () => {
  assert.deepEqual([...manifest.permissions].sort(), [...reviewedApiPermissions].sort());
});
