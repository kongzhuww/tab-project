import type { WorkspaceSearchTarget } from './workspace-search';

declare const chrome:any;
const TYPE = 'tab-project:quick-workspace-search';
const PENDING_KEY = 'tab-project:quick-workspace-search:v1';
export type QuickSearchRequest = { target:WorkspaceSearchTarget; keyword:string; githubRule?:'exact'|'fuzzy'|'topic'|'smart' };

export function validateQuickSearch(value:any): QuickSearchRequest | null {
  if (!value || !['bilibili','github','netease'].includes(value.target) || typeof value.keyword !== 'string') return null;
  const keyword=value.keyword.trim();
  if (!keyword || keyword.length>1024) return null;
  const result:QuickSearchRequest={target:value.target,keyword};
  if (value.target==='github' && ['exact','fuzzy','topic','smart'].includes(value.githubRule)) result.githubRule=value.githubRule;
  return result;
}
export function isQuickSearchPage():boolean { return typeof location!=='undefined' && location.pathname.endsWith('/newtab-search.html'); }

/** Deliver to a mounted home tab without reloading it; otherwise promote this tab. */
export async function handoffQuickSearch(input:QuickSearchRequest):Promise<void> {
  const request=validateQuickSearch(input);
  if (!request) throw new Error('搜索内容无效或过长。');
  const homeUrl=chrome.runtime.getURL('newtab.html');
  let tabs:any[]=[];
  try { tabs=await chrome.tabs.query({}); } catch { /* Fall back to this tab below. */ }
  const homes=tabs.filter(t=>Number.isInteger(t.id) && typeof t.url==='string' && t.url.split(/[?#]/,1)[0]===homeUrl)
    .sort((a,b)=>(b.lastAccessed||0)-(a.lastAccessed||0));
  for (const tab of homes) {
    const expires=Date.now()+1500;
    let response:any;
    try {
      response=await Promise.race([
        chrome.runtime.sendMessage({type:TYPE,targetTabId:tab.id,expires,request}),
        new Promise<null>(resolve=>setTimeout(()=>resolve(null),1500))
      ]);
    } catch { /* A closing or not-yet-ready home can be skipped. */ }
    if (response?.ok===true) {
      try {
        if (tab.windowId!=null) await chrome.windows.update(tab.windowId,{focused:true});
        await chrome.tabs.update(tab.id,{active:true});
      } catch { throw new Error('搜索已发送到主标签页，但未能切换过去；请手动打开主标签页查看。'); }
      return;
    }
  }
  // sessionStorage is scoped to this tab, not shared with unrelated searches.
  try { sessionStorage.setItem(PENDING_KEY,JSON.stringify({request,expires:Date.now()+60000})); }
  catch { throw new Error('无法保存搜索请求，请先打开主标签页重试。'); }
  location.assign(homeUrl);
}

/** Installed only after the full home UI mounts. */
export function installQuickSearchReceiver(accept:(request:QuickSearchRequest)=>void):()=>void {
  let alive=true;
  const listener=(message:any,sender:any,respond:(response:any)=>void)=>{
    if (message?.type!==TYPE || sender?.id!==chrome.runtime.id ||
        typeof sender?.url!=='string' || sender.url.split(/[?#]/,1)[0]!==chrome.runtime.getURL('newtab-search.html')) return;
    const request=validateQuickSearch(message.request);
    if (!request || !Number.isInteger(message.targetTabId) || typeof message.expires!=='number' || message.expires<=Date.now() || message.expires>Date.now()+5000) return;
    void chrome.tabs.getCurrent().then((tab:any)=>{
      if (!alive || tab?.id!==message.targetTabId || Date.now()>=message.expires) return;
      accept(request); respond({ok:true});
    }).catch(()=>{});
    return true;
  };
  chrome.runtime.onMessage.addListener(listener);
  try {
    const raw=sessionStorage.getItem(PENDING_KEY);
    if (raw) {
      sessionStorage.removeItem(PENDING_KEY);
      const pending=JSON.parse(raw),request=validateQuickSearch(pending?.request);
      if (request && typeof pending.expires==='number' && pending.expires>Date.now() && pending.expires<=Date.now()+60000) accept(request);
    }
  } catch { /* Invalid or unavailable session storage does not block normal home use. */ }
  return ()=>{alive=false;chrome.runtime.onMessage.removeListener(listener);};
}
