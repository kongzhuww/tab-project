declare const chrome: any;

const homeUrl = chrome.runtime.getURL("newtab.html");
const searchUrl = chrome.runtime.getURL("newtab-search.html");
let finished = false;

function navigate(target: string): void {
  if (finished) return;
  finished = true;
  location.replace(target);
}

// Keep this small and independent of Vue: redirect before a second new tab flashes.
const fallbackTimer = setTimeout(() => navigate(homeUrl), 500);
function isOtherHomeTab(tab: any, currentTabId: number | undefined): boolean {
  if (!tab || tab.id === currentTabId) return false;
  const url = tab.url || tab.pendingUrl || "";
  if (url.includes("newtab-bootstrap.html") || url.includes("newtab-search.html")) return false;
  if (url.includes("newtab.html")) return true;
  return url.startsWith("chrome://newtab") || url.startsWith("edge://newtab") || url.startsWith("chrome://new-tab-page");
}

chrome.storage?.local?.get(["singleNewTab"], (stored: any) => {
  if (stored?.singleNewTab !== true) {
    clearTimeout(fallbackTimer);
    navigate(homeUrl);
    return;
  }
  if (chrome.tabs?.query) {
    chrome.tabs.getCurrent((tab: any) => {
      const query = tab?.windowId != null ? { windowId: tab.windowId } : { currentWindow: true };
      chrome.tabs.query(query, (tabs: any[]) => {
        clearTimeout(fallbackTimer);
        if (chrome.runtime.lastError || !tabs) { navigate(homeUrl); return; }
        navigate(tabs.some((other) => isOtherHomeTab(other, tab?.id)) ? searchUrl : homeUrl);
      });
    });
  } else {
    try {
      chrome.runtime.sendMessage({ type: "dedupeLogicWeaverNewTab" }, (response: any) => {
        clearTimeout(fallbackTimer);
        navigate(response?.action === "open-search" ? searchUrl : homeUrl);
      });
    } catch {
      clearTimeout(fallbackTimer);
      navigate(homeUrl);
    }
  }
});
