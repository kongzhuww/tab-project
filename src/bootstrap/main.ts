declare const chrome: any;

const homeUrl = chrome.runtime.getURL('newtab.html');
const searchUrl = chrome.runtime.getURL('newtab-search.html');
let finished = false;

function navigate(target: string): void {
  if (finished) return;
  finished = true;
  location.replace(target);
}

// Select the configured new-tab view without closing or reusing other tabs.
const fallbackTimer = setTimeout(() => navigate(homeUrl), 5000);
try {
  chrome.runtime.sendMessage({ type: 'routeNewTab' }, (response: any) => {
    clearTimeout(fallbackTimer);
    if (chrome.runtime.lastError) { navigate(homeUrl); return; }
    navigate(response?.action === 'open-search' ? searchUrl : homeUrl);
  });
} catch {
  clearTimeout(fallbackTimer);
  navigate(homeUrl);
}
