import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { handoffQuickSearch, installQuickSearchReceiver, validateQuickSearch }=await loadTsModule('src/search/quick-search-bridge.ts');
const HOME='chrome-extension://test/newtab.html', QUICK='chrome-extension://test/newtab-search.html';
function environment(){
 let listener,assigned='',written=new Map(),focused=[];
 const chrome={runtime:{id:'test',getURL:path=>`chrome-extension://test/${path}`,sendMessage:async msg=>new Promise(resolve=>{const ret=listener?.(msg,{id:'test',url:QUICK},resolve);if(ret!==true)resolve(undefined);}),onMessage:{addListener(fn){listener=fn},removeListener(fn){if(listener===fn)listener=null}}},tabs:{query:async()=>[{id:7,windowId:4,url:HOME,lastAccessed:50}],getCurrent:async()=>({id:7}),update:async(id,opts)=>{focused.push(['tab',id,opts]);}},windows:{update:async(id,opts)=>{focused.push(['window',id,opts]);}}};
 const sessionStorage={getItem:k=>written.get(k)||null,setItem:(k,v)=>written.set(k,v),removeItem:k=>written.delete(k)};
 return {chrome,sessionStorage,location:{pathname:'/newtab-search.html',assign:url=>{assigned=url;}},get assigned(){return assigned},get focused(){return focused},get written(){return written},get listener(){return listener}};
}
async function withEnv(run){const env=environment(), old={chrome:globalThis.chrome,location:globalThis.location,sessionStorage:globalThis.sessionStorage};Object.assign(globalThis,{chrome:env.chrome,location:env.location,sessionStorage:env.sessionStorage});try{await run(env)}finally{for(const [k,v] of Object.entries(old)){if(v===undefined)delete globalThis[k];else globalThis[k]=v}}}

test('delivers to the mounted home and focuses it without reloading',()=>withEnv(async env=>{
 const received=[];const close=installQuickSearchReceiver(req=>received.push(req));
 await handoffQuickSearch({target:'github',keyword:' vue ',githubRule:'topic'});
 assert.deepEqual(received,[{target:'github',keyword:'vue',githubRule:'topic'}]);assert.equal(env.assigned,'');assert.equal(env.focused.length,2);assert.equal(env.written.size,0);close();
}));

test('promotes quick tab with a one-time session request when home is unavailable',()=>withEnv(async env=>{
 env.chrome.tabs.query=async()=>[];await handoffQuickSearch({target:'netease',keyword:'你好'});assert.equal(env.assigned,HOME);assert.equal(env.written.size,1);
 const received=[];const close=installQuickSearchReceiver(req=>received.push(req));assert.deepEqual(received,[{target:'netease',keyword:'你好'}]);assert.equal(env.written.size,0);close();
}));

test('rejects unknown targets and messages from non-search pages',()=>withEnv(async env=>{
 assert.equal(validateQuickSearch({target:'other',keyword:'x'}),null);assert.equal(validateQuickSearch({target:'github',keyword:' '.repeat(5)}),null);
 const received=[];const close=installQuickSearchReceiver(req=>received.push(req));
 const ret=env.listener({type:'tab-project:quick-workspace-search',targetTabId:7,expires:Date.now()+1000,request:{target:'bilibili',keyword:'测试'}},{id:'test',url:'https://evil.example/'},()=>{});
 assert.equal(ret,undefined);assert.equal(received.length,0);close();
}));

test('does not duplicate a delivered search if focusing the main tab fails',()=>withEnv(async env=>{
 const received=[];const close=installQuickSearchReceiver(req=>received.push(req));env.chrome.windows.update=async()=>{throw Error('denied')};
 await assert.rejects(handoffQuickSearch({target:'bilibili',keyword:'测试'}),/已发送/);assert.equal(received.length,1);assert.equal(env.assigned,'');assert.equal(env.written.size,0);close();
}));
