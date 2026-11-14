import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { encryptBackup, decryptBackup } = await loadTsModule('src/services/webdav-crypto.ts');
const { webdavVault } = await loadTsModule('src/services/webdav-vault.ts');
const { webDavService } = await loadTsModule('src/services/webdav.service.ts');
const { parseSyncBackup } = await loadTsModule('src/services/sync-payload.ts');
const { runWebDavAutoSync } = await loadTsModule('src/services/webdav-auto-sync.ts');
const config = { url:'https://dav.example.test/folder/', username:'user', password:'webdav-password', filename:'backup.json' };
let local = {}, session = {}, files = new Map(), requests = [], failGet = false, force412 = false, omitEtag = false, changePassOnMkcol = false, changeSettingOnMkcol = false, changeConfigOnMkcol = false;
let localMap = new Map();
function storageArea(source) {
  return {
    get(keys, callback) { const data = source(); const result = keys == null ? {...data} : Object.fromEntries((Array.isArray(keys) ? keys : [keys]).filter(k => Object.hasOwn(data,k)).map(k => [k,data[k]])); if (callback) callback(result); return Promise.resolve(result); },
    set(values, callback) { Object.assign(source(), values); if (callback) callback(); return Promise.resolve(); },
    remove(keys, callback) { for (const key of Array.isArray(keys) ? keys : [keys]) delete source()[key]; if (callback) callback(); return Promise.resolve(); },
    async setAccessLevel() {}
  };
}
globalThis.chrome = { runtime:{ id:'test-extension', lastError:null }, storage:{ local:storageArea(() => local), session:storageArea(() => session) }, declarativeNetRequest:{ async getSessionRules() { return []; }, async updateSessionRules() {} } };
globalThis.localStorage = { getItem:key => localMap.get(key) ?? null, setItem:(key,value) => localMap.set(key,String(value)), removeItem:key => localMap.delete(key), key:index => [...localMap.keys()][index] || null, get length() { return localMap.size; } };
globalThis.fetch = async (url, init) => {
  const method = init.method || 'GET'; requests.push({ url:String(url), method, headers:init.headers, body:init.body });
  if (method === 'MKCOL') { if (changePassOnMkcol) local.webdavBackupPassphraseV1 = 'changed-password'; if (changeSettingOnMkcol) local.city = 'changed-while-uploading'; if (changeConfigOnMkcol) local.webdavFilename = 'different-target.json'; return new Response(null,{status:201}); }
  if (method === 'GET') {
    if (failGet) return new Response(null,{status:503});
    const item = files.get(String(url)); if (!item) return new Response(null,{status:404});
    return new Response(item.body,{status:200,headers:omitEtag ? {} : {'etag':item.etag}});
  }
  if (method === 'PUT') {
    const item = files.get(String(url));
    if (force412 || (item && init.headers['If-Match'] !== item.etag) || (!item && init.headers['If-None-Match'] !== '*')) return new Response(null,{status:412});
    files.set(String(url),{body:String(init.body),etag:`"v${requests.filter(r=>r.method==='PUT').length}"`});
    return new Response(null,{status:201});
  }
  throw Error('unexpected method');
};
function reset() { local = { showWeather:true, ghUser:'alice', ghToken:'gh-secret', todoistToken:'todo-secret', multicaCredentialV1:{token:'multica-secret',workspaceId:'workspace-a'} }; session = {}; files = new Map(); requests = []; localMap = new Map(); failGet = false; force412 = false; omitEtag = false; changePassOnMkcol = false; changeSettingOnMkcol = false; changeConfigOnMkcol = false; }
function enableAuto() { Object.assign(local, { webdavUrl:config.url, webdavUsername:config.username, webdavPassword:config.password, webdavFilename:config.filename, webdavAutoEnabledV1:true }); }
async function withBrowserLocks(action) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {configurable:true, value:{userAgent:'test',locks:{request:async (_name, options, callback) => typeof options === 'function' ? options({}) : callback({})}}});
  try { return await action(); } finally { if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor); else delete globalThis.navigator; }
}

test('Web Crypto encrypts and authenticates the entire backup', async () => {
  const payload = { settings:{ ghToken:'secret-test', showWeather:true }, multicaCredential:{token:'multica-secret',workspaceId:'w'} };
  const first = await encryptBackup(payload,'independent-password');
  const second = await encryptBackup(payload,'independent-password');
  assert.notEqual(first.salt,second.salt); assert.notEqual(first.iv,second.iv);
  assert.doesNotMatch(JSON.stringify(first), /secret-test|multica-secret/);
  assert.deepEqual(await decryptBackup(first,'independent-password'),payload);
  await assert.rejects(decryptBackup(first,'wrong-password'), /口令错误|损坏/);
  const bad = {...first, ciphertext:(first.ciphertext[0] === 'A' ? 'B' : 'A') + first.ciphertext.slice(1)};
  await assert.rejects(decryptBackup(bad,'independent-password'), /口令错误|损坏/);
  await assert.rejects(decryptBackup({...first,iterations:1},'independent-password'), /格式/);
});

test('encrypted WebDAV upload, wrong-password protection, restore and remembered password', async () => {
  reset();
  assert.equal((await webDavService.pushCurrentConfig(config)).ok,false);
  assert.equal(requests.length,0);
  await webdavVault.remember('independent-password',true);
  const pushed = await webDavService.pushCurrentConfig(config);
  assert.equal(pushed.ok,true, pushed.error);
  const body = [...files.values()][0].body;
  assert.doesNotMatch(body,/gh-secret|todo-secret|multica-secret|independent-password/);
  assert.equal(JSON.parse(body).kind,'tab-project-webdav-encrypted');
  const decoded = await decryptBackup(JSON.parse(body),'independent-password');
  assert.equal(decoded.credentialsIncluded,true);
  assert.throws(() => parseSyncBackup(decoded,['showWeather']), /凭据/);
  const putCount = requests.filter(r=>r.method==='PUT').length;
  await webdavVault.remember('incorrect-password',true);
  const wrong = await webDavService.pushCurrentConfig(config,{mergeRemote:true});
  assert.equal(wrong.ok,false); assert.match(wrong.error,/口令错误|损坏/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,putCount);
  await webdavVault.remember('independent-password',true);
  local = { webdavBackupPassphraseV1:'independent-password' }; session = {};
  const restored = await webDavService.pullCurrentConfig(config,{merge:true});
  assert.equal(restored.ok,true,restored.error);
  assert.equal(local.multicaCredentialV1.token,'multica-secret');
  assert.equal(local.ghToken,'gh-secret');
  assert.equal(await webdavVault.get(),'independent-password');
  await webdavVault.forget();
  assert.equal(await webdavVault.get(),null);
  assert.equal(local.multicaCredentialV1.token,'multica-secret');
  const cloudBefore = [...files.values()][0].body;
  const afterForget = await webDavService.pushCurrentConfig(config);
  assert.equal(afterForget.ok,false);
  assert.equal([...files.values()][0].body,cloudBefore);
});

test('repeat encrypted upload verifies the old password and uses conditional overwrite', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).ok,true);
  const first = [...files.values()][0].body;
  const second = await webDavService.pushCurrentConfig(config);
  assert.equal(second.ok,true,second.error);
  assert.notEqual([...files.values()][0].body,first);
  const puts = requests.filter(r => r.method === 'PUT');
  assert.equal(puts[0].headers['If-None-Match'],'*');
  assert.equal(puts[1].headers['If-Match'],'"v1"');
});

test('preflight failures, legacy backup, missing ETag and concurrent changes never overwrite', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  failGet = true; let result = await webDavService.pushCurrentConfig(config,{mergeRemote:true});
  assert.equal(result.ok,false); assert.equal(requests.filter(r=>r.method==='PUT').length,0); failGet = false;
  const url = 'https://dav.example.test/folder/backup.json';
  files.set(url,{body:JSON.stringify({formatVersion:2,credentialsIncluded:false,settings:{showWeather:true}}),etag:'"legacy"'});
  result = await webDavService.pushCurrentConfig(config); assert.equal(result.ok,false); assert.match(result.error,/明文/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,0);
  omitEtag = true; result = await webDavService.pushCurrentConfig(config,{mergeRemote:true,migrateLegacy:true}); assert.equal(result.ok,false); assert.match(result.error,/ETag/); omitEtag = false;
  force412 = true; result = await webDavService.pushCurrentConfig(config,{mergeRemote:true,migrateLegacy:true}); assert.equal(result.ok,false); assert.match(result.error,/已变化/); assert.equal(files.get(url).etag,'"legacy"');
  force412 = false; result = await webDavService.pushCurrentConfig(config,{mergeRemote:true,migrateLegacy:true}); assert.equal(result.ok,true,result.error);
  assert.equal(JSON.parse(files.get(url).body).kind,'tab-project-webdav-encrypted');
});

test('a passphrase changed during upload stops the PUT', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  changePassOnMkcol = true;
  const result = await webDavService.pushCurrentConfig(config);
  assert.equal(result.ok,false); assert.match(result.error,/口令已在其他页面变更/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,0);
});

test('migration refuses unknown legacy content instead of dropping it', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  const url = 'https://dav.example.test/folder/backup.json';
  const legacy = JSON.stringify({formatVersion:2,credentialsIncluded:false,settings:{showWeather:true, unknownPersonalData:'keep-me'}});
  files.set(url,{body:legacy,etag:'"legacy"'});
  const result = await webDavService.pushCurrentConfig(config,{migrateLegacy:true,mergeRemote:true});
  assert.equal(result.ok,false); assert.match(result.error,/未知|完整/);
  assert.equal(files.get(url).body,legacy); assert.equal(requests.filter(r=>r.method==='PUT').length,0);
});

test('session-only password does not survive session reset and does not remove local credentials', async () => {
  reset(); await webdavVault.remember('session-password',false);
  assert.equal(await webdavVault.get(),'session-password');
  assert.equal(local.webdavBackupPassphraseV1,undefined);
  session = {};
  assert.equal(await webdavVault.get(),null);
  assert.equal(local.multicaCredentialV1.token,'multica-secret');
});

test('malformed encrypted Multica credential is rejected before restoring settings', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  const encrypted = await encryptBackup({formatVersion:2,credentialsIncluded:false,settings:{showWeather:true},multicaCredential:{token:42,workspaceId:'workspace-a'}},'independent-password');
  files.set('https://dav.example.test/folder/backup.json',{body:JSON.stringify(encrypted),etag:'"invalid"'});
  local = {webdavBackupPassphraseV1:'independent-password',showWeather:false};
  const result = await webDavService.pullCurrentConfig(config,{merge:true});
  assert.equal(result.ok,false); assert.match(result.error,/格式无效/);
  assert.equal(local.showWeather,false); assert.equal(local.multicaCredentialV1,undefined);
});

test('a different Multica account cannot silently replace the cloud connection', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).ok,true);
  const url = 'https://dav.example.test/folder/backup.json';
  const original = files.get(url).body;
  const puts = requests.filter(r=>r.method==='PUT').length;
  local.multicaCredentialV1 = {token:'different-account-token',workspaceId:'workspace-a'};
  const result = await webDavService.pushCurrentConfig(config,{mergeRemote:true});
  assert.equal(result.ok,false); assert.match(result.error,/连接不同/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,puts);
  assert.equal(files.get(url).body,original);
});

test('wrong password restore never writes local settings', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).ok,true);
  local = {webdavBackupPassphraseV1:'wrong-password',showWeather:false}; session = {};
  const result = await webDavService.pullCurrentConfig(config,{merge:true});
  assert.equal(result.ok,false); assert.equal(local.showWeather,false); assert.equal(local.multicaCredentialV1,undefined);
});

test('removed YouTube data is excluded from new encrypted backups', async () => {
  reset(); local.youtubeFavoritesV1=[{id:'yt-video',title:'Private local video'}]; local.youtubeFavGroupsV1=['Study'];
  await webdavVault.remember('independent-password',true);
  const result=await webDavService.pushCurrentConfig(config); assert.equal(result.ok,true,result.error);
  const cloud=await decryptBackup(JSON.parse([...files.values()][0].body),'independent-password');
  assert.equal(cloud.settings.youtubeFavoritesV1,undefined); assert.equal(cloud.settings.youtubeFavGroupsV1,undefined);
});

test('legacy YouTube data in an old encrypted backup is not restored', async () => withBrowserLocks(async () => {
  reset(); await webdavVault.remember('independent-password',true);
  const cloud={formatVersion:2,credentialsIncluded:true,settings:{showWeather:false,youtubeFavoritesV1:[{id:'video',title:'Cloud'}],youtubeFavGroupsV1:['Study']}};
  const url='https://dav.example.test/folder/backup.json', body=JSON.stringify(await encryptBackup(cloud,'independent-password'));
  files.set(url,{body,etag:'"cloud"'});
  const restored=await webDavService.pullCurrentConfig(config); assert.equal(restored.ok,true,restored.error);
  assert.equal(local.showWeather,false); assert.equal(local.youtubeFavoritesV1,undefined); assert.equal(local.youtubeFavGroupsV1,undefined);
}));

test('encrypted backup includes prompt and article data and their categories', async () => {
  reset();
  local.logicweaver_prompt_backpack_v1 = [{id:'p1',title:'private prompt',content:'secret prompt'}];
  local.logicweaver_prompt_backpack_categories_v1 = [{id:'c1',name:'Prompt category'}];
  local.logicweaver_saved_articles_v1 = [{id:'a1',title:'private article',content:'secret article'}];
  local.logicweaver_saved_article_categories_v1 = [{id:'c2',name:'Article category'}];
  await webdavVault.remember('independent-password',true);
  const result = await webDavService.pushCurrentConfig(config); assert.equal(result.ok,true,result.error);
  const text = [...files.values()][0].body; assert.equal(text.includes('secret prompt'),false); assert.equal(text.includes('secret article'),false);
  const cloud = await decryptBackup(JSON.parse(text),'independent-password');
  assert.equal(cloud.settings.logicweaver_prompt_backpack_v1[0].content,'secret prompt');
  assert.equal(cloud.settings.logicweaver_saved_articles_v1[0].content,'secret article');
  assert.equal(cloud.settings.logicweaver_prompt_backpack_categories_v1[0].id,'c1');
  assert.equal(cloud.settings.logicweaver_saved_article_categories_v1[0].id,'c2');
});

test('backpack restore without a cross-tab lock fails before any local writes', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  const cloud = {formatVersion:2, credentialsIncluded:true,settings:{showWeather:false,logicweaver_prompt_backpack_v1:[{id:'cloud',title:'Cloud'}]}};
  files.set('https://dav.example.test/folder/backup.json',{body:JSON.stringify(await encryptBackup(cloud,'independent-password')),etag:'"cloud"'});
  local.logicweaver_prompt_backpack_v1 = [{id:'local',title:'Local'}];
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {configurable:true,value:{userAgent:'test'}});
  try {
    const result=await webDavService.pullCurrentConfig(config); assert.equal(result.ok,false); assert.match(result.error,/缺少背包写入锁/);
    assert.equal(local.showWeather,true); assert.equal(local.logicweaver_prompt_backpack_v1[0].id,'local');
  } finally { if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor); else delete globalThis.navigator; }
});

test('backpack restore updates revision and writes both categories atomically', async () => withBrowserLocks(async () => {
  reset(); await webdavVault.remember('independent-password',true);
  const cloud = {formatVersion:2, credentialsIncluded:true,settings:{showWeather:false,logicweaver_prompt_backpack_v1:[{id:'p',title:'Prompt'}],logicweaver_prompt_backpack_categories_v1:[{id:'pc',name:'Prompt category'}],logicweaver_saved_articles_v1:[{id:'a',title:'Article'}],logicweaver_saved_article_categories_v1:[{id:'ac',name:'Article category'}]}};
  files.set('https://dav.example.test/folder/backup.json',{body:JSON.stringify(await encryptBackup(cloud,'independent-password')),etag:'"cloud"'});
  local.logicweaver_prompt_backpack_revision_v1 = 4; local.logicweaver_saved_articles_revision_v1 = 6;
  const result=await webDavService.pullCurrentConfig(config); assert.equal(result.ok,true,result.error);
  assert.equal(local.logicweaver_prompt_backpack_v1[0].id,'p'); assert.equal(local.logicweaver_saved_articles_v1[0].id,'a');
  assert.equal(local.logicweaver_prompt_backpack_categories_v1[0].id,'pc'); assert.equal(local.logicweaver_saved_article_categories_v1[0].id,'ac');
  assert.equal(local.logicweaver_prompt_backpack_revision_v1,5); assert.equal(local.logicweaver_saved_articles_revision_v1,7);
}));

test('upload does not replace cloud backpack with an empty local list', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  const cloud = {formatVersion:2,credentialsIncluded:true,settings:{showWeather:true,logicweaver_saved_articles_v1:[{id:'cloud',title:'Cloud'}]}};
  const url='https://dav.example.test/folder/backup.json'; const body=JSON.stringify(await encryptBackup(cloud,'independent-password'));
  files.set(url,{body,etag:'"cloud"'}); local.logicweaver_saved_articles_v1=[];
  const result=await webDavService.pushCurrentConfig(config); assert.equal(result.ok,false); assert.match(result.error,/缺少云端已有的背包内容/);
  assert.equal(files.get(url).body,body); assert.equal(requests.filter(r=>r.method==='PUT').length,0);
});

test('explicitly empty quick links are not resurrected from a stale local mirror', async () => {
  reset(); local.quickLinks = [];
  localStorage.setItem('logicweaver:quickLinks', JSON.stringify([{id:'old',url:'https://old.example',title:'Old'}]));
  await webdavVault.remember('independent-password', true);
  const result = await webDavService.pushCurrentConfig(config); assert.equal(result.ok,true,result.error);
  const cloud = await decryptBackup(JSON.parse([...files.values()][0].body),'independent-password');
  assert.deepEqual(cloud.settings.quickLinks, []);
});

test('automatic sync requires an initial baseline and never overwrites without one', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  const cloud = {formatVersion:2, credentialsIncluded:true, settings:{showWeather:false}};
  files.set('https://dav.example.test/folder/backup.json',{body:JSON.stringify(await encryptBackup(cloud,'independent-password')),etag:'"remote"'});
  const result = await runWebDavAutoSync(); assert.equal(result.status,'conflict');
  assert.equal(requests.filter(r=>r.method==='PUT').length,0); assert.equal(local.showWeather,true);
}));

test('automatic sync uploads a local-only change after a verified baseline', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  const first = await webDavService.pushCurrentConfig(config); assert.equal(first.ok,true,first.error); assert.equal(first.baselineRecorded,true);
  local.showWeather = false;
  const result = await runWebDavAutoSync(); assert.equal(result.status,'uploaded',result.message);
  const cloud = await decryptBackup(JSON.parse([...files.values()][0].body),'independent-password');
  assert.equal(cloud.settings.showWeather,false);
  assert.equal((await runWebDavAutoSync()).status,'noop');
}));

test('automatic sync restores cloud-only changes when the baseline is unchanged locally', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  const first = await webDavService.pushCurrentConfig(config); assert.equal(first.baselineRecorded,true);
  const url = 'https://dav.example.test/folder/backup.json';
  const cloud = await decryptBackup(JSON.parse(files.get(url).body),'independent-password');
  cloud.settings.showWeather = false;
  files.set(url,{body:JSON.stringify(await encryptBackup(cloud,'independent-password')),etag:'"external-v2"'});
  const result = await runWebDavAutoSync(); assert.equal(result.status,'downloaded',result.message);
  assert.equal(local.showWeather,false); assert.equal(local.multicaCredentialV1.token,'multica-secret');
}));

test('automatic upload asks before deleting previously synced content', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); local.quickLinks = [{url:'https://example.com',title:'Saved'}]; await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).baselineRecorded,true);
  local.quickLinks = []; const before = requests.filter(r=>r.method==='PUT').length;
  const result = await runWebDavAutoSync(); assert.equal(result.status,'conflict'); assert.match(result.message,/缺少部分云端内容/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,before);
}));

test('automatic sync pauses when both sides changed', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).baselineRecorded,true);
  const url = 'https://dav.example.test/folder/backup.json';
  const cloud = await decryptBackup(JSON.parse(files.get(url).body),'independent-password');
  cloud.settings.city = 'remote-city';
  files.set(url,{body:JSON.stringify(await encryptBackup(cloud,'independent-password')),etag:'"external-v2"'});
  local.showWeather = false; const before = requests.filter(r=>r.method==='PUT').length;
  const result = await runWebDavAutoSync(); assert.equal(result.status,'conflict');
  assert.equal(requests.filter(r=>r.method==='PUT').length,before); assert.equal(local.city,undefined); assert.equal(local.showWeather,false);
}));

test('automatic sync pauses when cloud account credentials changed', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).baselineRecorded,true);
  const url = 'https://dav.example.test/folder/backup.json';
  const cloud = await decryptBackup(JSON.parse(files.get(url).body),'independent-password');
  cloud.settings.ghToken = 'different-remote-account';
  files.set(url,{body:JSON.stringify(await encryptBackup(cloud,'independent-password')),etag:'"external-v2"'});
  const result = await runWebDavAutoSync(); assert.equal(result.status,'conflict');
  assert.equal(local.ghToken,'gh-secret');
}));

test('automatic upload stops when WebDAV target changes during preflight', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).baselineRecorded,true);
  local.showWeather = false; changeConfigOnMkcol = true;
  const before = requests.filter(r=>r.method==='PUT').length;
  const result = await runWebDavAutoSync(); assert.equal(result.status,'error'); assert.match(result.message,/同步设置或口令已变化/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,before);
}));

test('automatic upload stops if local settings change during preflight', async () => withBrowserLocks(async () => {
  reset(); enableAuto(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).baselineRecorded,true);
  local.showWeather = false; changeSettingOnMkcol = true;
  const before = requests.filter(r=>r.method==='PUT').length;
  const result = await runWebDavAutoSync(); assert.equal(result.status,'error'); assert.match(result.message,/本地配置已变化/);
  assert.equal(requests.filter(r=>r.method==='PUT').length,before);
}));

test('restore keeps existing local accounts and Multica connection', async () => {
  reset(); await webdavVault.remember('independent-password',true);
  assert.equal((await webDavService.pushCurrentConfig(config)).ok,true);
  local = { webdavBackupPassphraseV1:'independent-password', ghUser:'bob', ghToken:'bob-secret', todoistToken:'local-todo', multicaCredentialV1:{token:'local-multica',workspaceId:'workspace-b'} };
  const result = await webDavService.pullCurrentConfig(config,{merge:true});
  assert.equal(result.ok,true,result.error); assert.equal(result.credentialResult,'kept');
  assert.equal(local.ghUser,'bob'); assert.equal(local.ghToken,'bob-secret'); assert.equal(local.todoistToken,'local-todo'); assert.equal(local.multicaCredentialV1.token,'local-multica');
});
