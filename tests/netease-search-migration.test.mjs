import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
const source=async path=>stripTypeScriptTypes(await readFile(new URL('../'+path,import.meta.url),'utf8')).replace(/^import .*?;\s*$/gm,'').replace(/^export /gm,'');

test('home music mode and saved preferences are preserved without storage writes',async()=>{
 const old=[{id:'netease',isBuiltin:true,enabled:true},{id:'github',isBuiltin:true,enabled:true},{id:'custom_x',isBuiltin:false,enabled:true,name:'自定义'}];
 let writes=0;const stored=JSON.stringify(old);
 const ctx=vm.createContext({console,JSON,ref:value=>({value}),computed:fn=>({get value(){return fn();}}),
  localStorage:{getItem:()=>stored,setItem:()=>{writes++;}},chrome:{storage:{local:{get(_keys,cb){cb({tab_project_search_slots:old});},set(){writes++;}}}},getActiveSearchEngine:()=>({})});
 vm.runInContext(await source('src/search/search-slots.store.ts')+'\nglobalThis.testSlots=searchSlots;globalThis.defaults=DEFAULT_BUILTIN_SLOTS;',ctx);
 assert.deepEqual(Array.from(ctx.testSlots.value,x=>x.id),['netease','github','custom_x']);
 assert.equal(ctx.defaults.some(x=>x.id==='netease'),true);assert.equal(writes,0);
});

test('home search passes the query to the lazily mounted music workspace',async()=>{
 const ctx=vm.createContext({reactive:x=>x});
 vm.runInContext(await source('src/search/workspace-search.ts')+'\nglobalThis.queue={workspaceSearchRequests,requestWorkspaceSearch,consumeWorkspaceSearch};',ctx);
 ctx.queue.requestWorkspaceSearch('netease','  歌手  ');
 assert.equal(ctx.queue.workspaceSearchRequests.netease.keyword,'歌手');
 assert.equal(ctx.queue.consumeWorkspaceSearch('netease').keyword,'歌手');
 assert.equal(ctx.queue.consumeWorkspaceSearch('netease'),null);
 const service=await readFile(new URL('../src/services/search.service.ts',import.meta.url),'utf8');
 const workspace=await readFile(new URL('../src/music/NeteaseWorkspaceDialog.vue',import.meta.url),'utf8');
 assert.match(service,/this\.currentMode === "netease"\) \{\s*void this\.openWorkspaceSearch\(this\.currentMode, q\)/);
 assert.match(service,/item\.type === "netease-search-trigger"/);
 assert.match(service,/windowManagerController\.open\('music'\)/);
 assert.match(workspace,/consumeWorkspaceSearch\('netease'\)/);
 assert.match(workspace,/workspace\.search\(request\.keyword\)/);
});

test('initial playlist refresh does not cancel an already-started home search',async()=>{
 const component=await readFile(new URL('../src/music/NeteaseWorkspaceDialog.vue',import.meta.url),'utf8');
 const fn=component.match(/function initialRead\(\) \{[\s\S]*?\n\}/)?.[0];assert.ok(fn);
 const ctx=vm.createContext({active:{value:true},searchQuery:{value:'你好'},workspace:{refresh(){throw Error('search should not be canceled');}}});
 vm.runInContext('let initialRequested=false;'+fn+';initialRead()',ctx);
 let calls=0;const empty=vm.createContext({active:{value:true},searchQuery:{value:''},workspace:{refresh(){calls++;}}});
 vm.runInContext('let initialRequested=false;'+fn+';initialRead();initialRead()',empty);assert.equal(calls,1);
});

test('music workspace distinguishes empty search and errors without duplicate requests',async()=>{
 let calls=0,fail=false;
 const neteaseService={whenReady:async()=>{},getUser:()=>null,request:async()=>{calls++;if(fail)throw Error('官网暂不可用');return {result:{songs:[]}};}};
 const ctx=vm.createContext({console,AbortController,clearTimeout,setTimeout,reactive:x=>x,neteaseService,musicModuleState:{pendingWrites:0},withMusicWrite:fn=>fn(),CACHED_PLAYLISTS_KEY:'x',CACHED_FAVORITES_KEY:'y',readPlaylistCache:()=>[],writePlaylistCache:()=>{},removePlaylistCache:()=>{}});
 vm.runInContext(await source('src/music/workspace-data.ts')+'\nglobalThis.make=createMusicWorkspaceData;',ctx);
 const ws=ctx.make(()=>true);await ws.search('歌曲');assert.equal(calls,1);assert.equal(ws.state.neteaseSearchResults.length,0);assert.equal(ws.state.message,'');
 fail=true;await ws.search('另一个');assert.equal(calls,2);assert.match(ws.state.message,/官网暂不可用/);assert.equal(ws.state.neteaseLoading,false);ws.dispose();
});
