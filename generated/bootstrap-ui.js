import { s as o } from "./chunks/runtime-protocol-C_r09aKr.js";
const t = chrome.runtime.getURL("newtab.html"), c = chrome.runtime.getURL("newtab-search.html");
let r = !1;
function a(e) {
  r || (r = !0, location.replace(e));
}
const n = setTimeout(() => a(t), 5e3);
o({ type: "routeNewTab" }).then((e) => {
  clearTimeout(n), a(e?.action === "open-search" ? c : t);
}).catch(() => {
  clearTimeout(n), a(t);
});
