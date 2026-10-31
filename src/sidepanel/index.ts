import { createApp } from "vue";
import SidePanelApp from "./SidePanelApp.vue";
import "../assets/styles.css";

declare const chrome: any;

async function mountSidePanel(): Promise<void> {
  const root = document.getElementById("vue-sidepanel-root");
  if (!root) return;
  if (window.parent === window) {
    createApp(SidePanelApp).mount(root);
    return;
  }
  // Web-accessible resources are not permission to embed privileged account UI.
  // Only the background's one-time, tab-bound grant may mount an iframe instance.
  const token = new URLSearchParams(location.hash.slice(1)).get("embed");
  root.textContent = "正在验证侧栏…";
  try {
    if (!token || !/^[a-f0-9-]{36}$/.test(token)) throw new Error("Missing grant");
    const reply = await chrome.runtime.sendMessage({ type: "AUTHORIZE_SIDE_DRAWER_EMBED", token });
    if (!reply?.ok || !/^https?:\/\//i.test(reply.parentOrigin || "")) throw new Error("Invalid grant");
    const close = () => window.parent.postMessage({ type: "TAB_PROJECT_CLOSE_DRAWER", token }, reply.parentOrigin);
    window.addEventListener("keydown", event => {
      if (event.key === "Escape" && !event.defaultPrevented) close();
    });
    createApp(SidePanelApp, { inDrawer: true, onClose: close }).mount(root);
  } catch {
    root.textContent = "侧栏未获授权，请关闭后通过扩展图标或快捷键重新打开。";
  }
}

void mountSidePanel();
