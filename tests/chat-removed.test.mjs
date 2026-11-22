import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { loadTsModule } from './helpers/load-ts.mjs';

const { REMOVED_CHAT_KEYS, removeRetiredChatStorage, removeRetiredChatPageStorage } =
  await loadTsModule('src/core/removed-chat.ts');

test('Beaver Chat module and all share integrations are completely removed', async () => {
  assert.equal(existsSync(new URL('../src/chat', import.meta.url)), false);

  const [builtins, marketStore, marketDialog, macDock, homeMusic, githubRepos, launcherMenus, biliWorkspace] =
    await Promise.all([
      readFile('src/modules/builtins.ts', 'utf8'),
      readFile('src/modules/market-store.ts', 'utf8'),
      readFile('src/modules/PluginMarketDialog.vue', 'utf8'),
      readFile('src/dock/MacDock.vue', 'utf8'),
      readFile('src/music/HomeMusicCard.vue', 'utf8'),
      readFile('src/github/GitHubRepositories.vue', 'utf8'),
      readFile('src/launcher/LauncherMenus.vue', 'utf8'),
      readFile('src/bilibili/BilibiliWorkspace.vue', 'utf8'),
    ]);

  for (const source of [builtins, marketStore, marketDialog, macDock, homeMusic, githubRepos, launcherMenus, biliWorkspace]) {
    assert.doesNotMatch(source, /\.\.\/chat\/|ChatShareMenu|ChatPrivateSetup|chatDockModule|togetherPartyState/);
  }
  assert.doesNotMatch(marketStore, /id:\s*"chat"/);
});

test('retired chat storage cleanup removes static and prefixed keys cleanly', async t => {
  const prevChrome = globalThis.chrome;
  const prevLocalStorage = globalThis.localStorage;
  t.after(() => {
    if (prevChrome === undefined) delete globalThis.chrome; else globalThis.chrome = prevChrome;
    if (prevLocalStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = prevLocalStorage;
  });

  const removedExtensionKeys = [];
  globalThis.chrome = {
    storage: {
      local: {
        async remove(keys) {
          removedExtensionKeys.push(...keys);
        }
      }
    }
  };
  await removeRetiredChatStorage();
  assert.deepEqual(removedExtensionKeys, [...REMOVED_CHAT_KEYS]);

  const map = new Map([
    ['lw_private_chat_v1', '{}'],
    ['lw_chat_room_history:https://example.com:main:u1', '[]'],
    ['lw_chat_peer_roster:main', '[]'],
    ['keep_me', 'yes'],
  ]);
  globalThis.localStorage = {
    get length() { return map.size; },
    key: i => Array.from(map.keys())[i] ?? null,
    removeItem: k => map.delete(k),
  };
  removeRetiredChatPageStorage();
  assert.equal(map.has('lw_private_chat_v1'), false);
  assert.equal(map.has('lw_chat_room_history:https://example.com:main:u1'), false);
  assert.equal(map.has('lw_chat_peer_roster:main'), false);
  assert.equal(map.get('keep_me'), 'yes');
});
