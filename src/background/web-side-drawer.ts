declare const chrome: any;

const EMBED_KEY = "webSideDrawer:";

// Executed in the isolated content-script world, only after an explicit action.
function toggleWebDrawer(frameUrl: string, token: string): { open: boolean } {
  const scope = globalThis as any;
  const key = "__tabProjectWebDrawer";
  if (scope[key]) {
    scope[key].close();
    return { open: false };
  }
  const host = document.createElement("div");
  host.setAttribute("popover", "manual");
  host.setAttribute("aria-label", "tab-project 侧栏");
  const styles: Record<string, string> = {
    all: "initial", position: "fixed", inset: "0 0 0 auto", margin: "0", padding: "0",
    width: "min(380px, 90vw)", height: "100dvh", border: "0", display: "block",
    overflow: "hidden", background: "transparent", "z-index": "2147483647",
    "box-shadow": "-8px 0 28px color-mix(in srgb, CanvasText 15%, transparent)"
  };
  for (const [name, value] of Object.entries(styles)) host.style.setProperty(name, value, "important");
  const shadow = host.attachShadow({ mode: "closed" });
  const frame = document.createElement("iframe");
  frame.title = "网页工具与收集箱";
  frame.src = frameUrl;
  frame.style.cssText = "display:block;width:100%;height:100%;border:0;background:transparent;color-scheme:normal";
  shadow.append(frame);
  function close() {
    window.removeEventListener("message", onMessage);
    window.removeEventListener("keydown", onKeyDown);
    host.remove();
    delete scope[key];
  }
  function onMessage(event: MessageEvent) {
    if (event.source !== frame.contentWindow || event.origin !== frameUrl.split("/").slice(0, 3).join("/") ||
        event.data?.token !== token) return;
    if (event.data.type === "TAB_PROJECT_CLOSE_DRAWER") close();
  }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && !event.defaultPrevented) close();
  }
  scope[key] = { close };
  window.addEventListener("message", onMessage);
  window.addEventListener("keydown", onKeyDown);
  document.documentElement.append(host);
  try {
    // Top layer avoids host-page stacking contexts without a modal backdrop.
    host.showPopover();
  } catch (error) {
    close();
    throw error;
  }
  return { open: true };
}

export async function toggleWebSideDrawer(tabId: number): Promise<void> {
  const token = crypto.randomUUID();
  const key = EMBED_KEY + tabId;
  await chrome.storage.session.set({ [key]: { token, issuedAt: Date.now() } });
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId, frameIds: [0] },
      world: "ISOLATED",
      func: toggleWebDrawer,
      args: [chrome.runtime.getURL("sidepanel.html") + "#embed=" + token, token]
    });
    if (!results?.[0]?.result?.open) await chrome.storage.session.remove(key);
  } catch (error) {
    await chrome.storage.session.remove(key);
    throw error;
  }
}

export function initWebSideDrawer(): void {
  chrome.runtime.onMessage.addListener((message: any, sender: any, respond: (reply: any) => void) => {
    if (message?.type !== "AUTHORIZE_SIDE_DRAWER_EMBED") return;
    // A web page cannot authorize an arbitrary privileged extension iframe.
    if (sender.id !== chrome.runtime.id || !Number.isInteger(sender.tab?.id) || sender.frameId <= 0 ||
        sender.url?.split("#")[0] !== chrome.runtime.getURL("sidepanel.html")) {
      respond({ ok: false });
      return;
    }
    const key = EMBED_KEY + sender.tab.id;
    void chrome.storage.session.get(key).then(async (stored: any) => {
      const grant = stored[key];
      if (!grant || grant.token !== message.token || Date.now() - grant.issuedAt > 30000 ||
          !/^https?:\/\//i.test(sender.tab.url || "")) {
        respond({ ok: false });
        return;
      }
      // One-time bootstrap grant; no account data is exposed through postMessage.
      await chrome.storage.session.remove(key);
      respond({ ok: true, parentOrigin: new URL(sender.tab.url).origin });
    }).catch(() => respond({ ok: false }));
    return true;
  });
  chrome.tabs.onRemoved.addListener((tabId: number) => {
    void chrome.storage.session.remove(EMBED_KEY + tabId);
  });
}
