const e = chrome.runtime.getURL("newtab.html"), n = chrome.runtime.getURL("newtab-search.html");
let a = !1;
function t(r) {
  a || (a = !0, location.replace(r));
}
const c = setTimeout(() => t(e), 5e3);
try {
  chrome.runtime.sendMessage({ type: "routeNewTab" }, (r) => {
    if (clearTimeout(c), chrome.runtime.lastError) {
      t(e);
      return;
    }
    t(r?.action === "open-search" ? n : e);
  });
} catch {
  clearTimeout(c), t(e);
}
