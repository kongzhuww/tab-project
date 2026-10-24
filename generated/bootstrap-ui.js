const n = chrome.runtime.getURL("newtab.html"), c = chrome.runtime.getURL("newtab-search.html");
let s = !1;
function i(e) {
  s || (s = !0, location.replace(e));
}
const o = setTimeout(() => i(n), 500);
function l(e, t) {
  if (!e || e.id === t) return !1;
  const r = e.url || e.pendingUrl || "";
  return r.includes("newtab-bootstrap.html") || r.includes("newtab-search.html") ? !1 : r.includes("newtab.html") ? !0 : r.startsWith("chrome://newtab") || r.startsWith("edge://newtab") || r.startsWith("chrome://new-tab-page");
}
chrome.storage?.local?.get(["singleNewTab"], (e) => {
  if (e?.singleNewTab !== !0) {
    clearTimeout(o), i(n);
    return;
  }
  if (chrome.tabs?.query)
    chrome.tabs.getCurrent((t) => {
      const r = t?.windowId != null ? { windowId: t.windowId } : { currentWindow: !0 };
      chrome.tabs.query(r, (a) => {
        if (clearTimeout(o), chrome.runtime.lastError || !a) {
          i(n);
          return;
        }
        i(a.some((u) => l(u, t?.id)) ? c : n);
      });
    });
  else
    try {
      chrome.runtime.sendMessage({ type: "dedupeLogicWeaverNewTab" }, (t) => {
        clearTimeout(o), i(t?.action === "open-search" ? c : n);
      });
    } catch {
      clearTimeout(o), i(n);
    }
});
