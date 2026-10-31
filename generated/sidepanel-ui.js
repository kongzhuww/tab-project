import { c as i } from "./chunks/vendor-vue-wIH4jcna.js";
import { S as a } from "./chunks/SidePanelApp-HPlwxVhs.js";
/* empty css                       */
async function s() {
  const e = document.getElementById("vue-sidepanel-root");
  if (!e) return;
  if (window.parent === window) {
    i(a).mount(e);
    return;
  }
  const t = new URLSearchParams(location.hash.slice(1)).get("embed");
  e.textContent = "正在验证侧栏…";
  try {
    if (!t || !/^[a-f0-9-]{36}$/.test(t)) throw new Error("Missing grant");
    const n = await chrome.runtime.sendMessage({ type: "AUTHORIZE_SIDE_DRAWER_EMBED", token: t });
    if (!n?.ok || !/^https?:\/\//i.test(n.parentOrigin || "")) throw new Error("Invalid grant");
    const o = () => window.parent.postMessage({ type: "TAB_PROJECT_CLOSE_DRAWER", token: t }, n.parentOrigin);
    window.addEventListener("keydown", (r) => {
      r.key === "Escape" && !r.defaultPrevented && o();
    }), i(a, { inDrawer: !0, onClose: o }).mount(e);
  } catch {
    e.textContent = "侧栏未获授权，请关闭后通过扩展图标或快捷键重新打开。";
  }
}
s();
