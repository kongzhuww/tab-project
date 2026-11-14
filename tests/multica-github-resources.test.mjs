import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { loadOwnRepositorySnapshot } = await loadTsModule('src/multica/github-resources.ts');
const { repositoriesInBoard } = await loadTsModule('src/multica/board-filters.ts');
const repo = (id,name,privateValue=false) => ({id,name,full_name:`owner/${name}`,private:privateValue,fork:false});

test('loads repositories and groups without writing or inferring classifications', async () => {
  const originalChrome=globalThis.chrome, originalFetch=globalThis.fetch;
  const data={ghUser:'owner',ghToken:'',gh_my_repo_groups_v2:['分类','浏览器插件'],gh_my_repo_groups_map_v2:{'owner/a':['分类']}};
  const calls=[];
  globalThis.chrome={storage:{local:{async get(keys) { return Object.fromEntries(keys.map(key=>[key,data[key]])); }, async set() { throw Error('unexpected write'); }}}};
  globalThis.fetch=async (url) => { calls.push(url); return url.includes('page=2') ? Response.json([repo(2,'b'),repo(3,'tab-project')]) : Response.json([repo(1,'a')],{headers:{link:'<https://api.github.com/next>; rel="next"'}}); };
  try {
    const result=await loadOwnRepositorySnapshot(new AbortController().signal);
    assert.equal(calls.length,2); assert.equal(result.repos.length,3); assert.deepEqual(result.customGroups,['分类','浏览器插件']);
    assert.deepEqual(repositoriesInBoard(result.repos,result.repoGroupsMap,'group:浏览器插件').map(r=>r.name),['tab-project']);
    assert.deepEqual(data.gh_my_repo_groups_map_v2,{'owner/a':['分类']});
    assert.deepEqual(repositoriesInBoard(result.repos,result.repoGroupsMap,'ungrouped').map(r=>r.name),['b']);
    assert.deepEqual(repositoriesInBoard(result.repos,result.repoGroupsMap,'group:分类').map(r=>r.name),['a']);
  } finally { globalThis.chrome=originalChrome; globalThis.fetch=originalFetch; }
});

test('failed or changed account does not produce an empty successful snapshot', async () => {
  const originalChrome=globalThis.chrome, originalFetch=globalThis.fetch;
  let user='owner';
  globalThis.chrome={storage:{local:{async get(keys) { return Object.fromEntries(keys.map(key=>[key,key==='ghUser'?user:key==='ghToken'?'':undefined])); }}}};
  try {
    globalThis.fetch=async ()=>new Response('',{status:403});
    await assert.rejects(loadOwnRepositorySnapshot(new AbortController().signal),/GitHub/);
    globalThis.fetch=async ()=>{user='other';return Response.json([repo(1,'a')]);};
    await assert.rejects(loadOwnRepositorySnapshot(new AbortController().signal),/账号已切换/);
  } finally { globalThis.chrome=originalChrome; globalThis.fetch=originalFetch; }
});
