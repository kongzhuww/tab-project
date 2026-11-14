import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let loadSequence = 0;
async function loadTwice(file) {
  const result=await build({entryPoints:[path.join(root,file)],bundle:true,format:'esm',write:false,platform:'node',target:'node20',external:['node:*']});
  const code=result.outputFiles[0].text;
  const sequence=++loadSequence;
  const load=i=>import('data:text/javascript;base64,'+Buffer.from(code+`\n// copy ${sequence}-${i}`).toString('base64'));
  return Promise.all([load(1),load(2)]);
}
function environment() {
  const data={}, tails=new Map();
  globalThis.chrome={runtime:{lastError:null},storage:{local:{async get(keys,cb) { const out={}; for(const key of keys===null?Object.keys(data):Array.isArray(keys)?keys:[keys]) if(key in data)out[key]=structuredClone(data[key]); if(cb)cb(out); return out; },async set(values,cb) {Object.assign(data,structuredClone(values)); if(cb)cb();}}}};
  const locks={request(name,cb){const prev=tails.get(name)||Promise.resolve();const next=prev.then(cb);tails.set(name,next.catch(()=>{}));return next;}};
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{locks}});
  return data;
}
test('a stale prompt tab cannot overwrite a newer prompt write', async () => {
  const data=environment(); const [a,b]=await loadTwice('src/backpack/backpack.service.ts');
  await a.backpackService.init(); const revision=data.logicweaver_prompt_backpack_revision_v1; await b.backpackService.init();
  assert.equal(data.logicweaver_prompt_backpack_revision_v1,revision);
  b.backpackState.prompts=[{id:'new',title:'new',content:'new',category:'default',tags:[],createdAt:1,updatedAt:1}];
  assert.equal(await b.backpackService.save(),true);
  a.backpackState.prompts=[{id:'stale',title:'stale',content:'stale',category:'default',tags:[],createdAt:1,updatedAt:1}];
  const warn=console.warn; console.warn=()=>{};
  try { assert.equal(await a.backpackService.save(),false); } finally { console.warn=warn; }
  assert.equal(data.logicweaver_prompt_backpack_v1[0].id,'new');
  assert.match(a.backpackState.statusMessage,/未保存/);
});
test('restored prompt data cannot be overwritten by a stale open tab', async () => {
  const data=environment(); const [a]=await loadTwice('src/backpack/backpack.service.ts');
  const [sync]=await loadTwice('src/services/sync.service.ts');
  await a.backpackService.init();
  await sync.restoreSyncBackup({formatVersion:2,settings:{logicweaver_prompt_backpack_v1:[{id:'cloud',title:'Cloud',content:'Cloud',category:'default',tags:[],createdAt:1,updatedAt:1}]}},{allowCredentials:true});
  a.backpackState.prompts=[{id:'old',title:'Old',content:'Old',category:'default',tags:[],createdAt:1,updatedAt:1}];
  const warn=console.warn; console.warn=()=>{};
  try { assert.equal(await a.backpackService.save(),false); } finally { console.warn=warn; }
  assert.equal(data.logicweaver_prompt_backpack_v1[0].id,'cloud');
});
test('a stale article tab cannot overwrite a newer article write', async () => {
  const data=environment(); const [a,b]=await loadTwice('src/backpack/article.service.ts');
  await a.articleService.init(); await b.articleService.init();
  b.articleState.articles=[{id:'new',title:'new',content:'new',category:'default',tags:[],createdAt:1,updatedAt:1}];
  assert.equal(await b.articleService.save(),true);
  a.articleState.articles=[{id:'stale',title:'stale',content:'stale',category:'default',tags:[],createdAt:1,updatedAt:1}];
  const warn=console.warn; console.warn=()=>{};
  try { assert.equal(await a.articleService.save(),false); } finally { console.warn=warn; }
  assert.equal(data.logicweaver_saved_articles_v1[0].id,'new');
  assert.match(a.articleState.statusMessage,/未保存/);
});
