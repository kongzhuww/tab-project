/**
 * LogicWeaver 新标签页 - Jev 扩展协作双向通道 (TypeScript 模块)
 */

declare const chrome: any;

const JEV_PEER_ID = "iidnjgdlinfhlolilcddlgeikpkfejnc";
const dockPorts = new Map<number, any>();
const dockPending = new Map<string, any>();
const dockSessions = new Map<number, any>();
const pageSessions = new Map<number, any>();

let dockPageUrl = "";
let biliPageUrl = "";

export function initJevBridge(): void {
  if (typeof chrome === "undefined" || !chrome.runtime?.getURL) return;
  dockPageUrl = chrome.runtime.getURL("newtab.html");
  biliPageUrl = chrome.runtime.getURL("bilibili.html");

  chrome.runtime.onConnect?.addListener?.((port: any) => {
    if (
      port.name !== "jev-cooperative-dock" ||
      port.sender?.id !== chrome.runtime.id ||
      ![dockPageUrl, biliPageUrl].includes(port.sender?.url) ||
      !Number.isInteger(port.sender?.tab?.id)
    ) {
      return;
    }
    const tabId = port.sender.tab.id;
    dockPorts.set(tabId, port);

    port.onMessage.addListener((message: any) => {
      if (!message || typeof message.id !== "string") return;
      const pending = dockPending.get(message.id);
      if (!pending || pending.tabId !== tabId) return;
      dockPending.delete(message.id);
      clearTimeout(pending.timer);
      pending.resolve(message);
    });

    port.onDisconnect.addListener(() => {
      if (dockPorts.get(tabId) === port) dockPorts.delete(tabId);
      for (const [id, pending] of dockPending) {
        if (pending.tabId !== tabId) continue;
        dockPending.delete(id);
        clearTimeout(pending.timer);
        pending.reject(new Error("Workspace page disconnected"));
      }
    });
  });

  chrome.runtime.onMessageExternal?.addListener?.((message: any, sender: any, sendResponse: (res: any) => void) => {
    if (sender.id !== JEV_PEER_ID || message?.type !== "jevCoopDock") return;
    const classic = ["newtab", "observe", "activate"].includes(message.op);
    const generic = ["listPages", "selectPage", "observePage", "actPage"].includes(message.op);
    if (!classic && !generic) return;
    const operation = classic ? handleJevDock(message) : handleJevPage(message);
    operation.then(sendResponse, () => sendResponse({ error: "Workspace operation rejected" }));
    return true;
  });
}

function dockRpc(tabId: number, operation: string, request?: any): Promise<any> {
  const port = dockPorts.get(tabId);
  if (!port) throw new Error("Workspace page not ready");
  const id = crypto.randomUUID();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      dockPending.delete(id);
      reject(new Error("Workspace timed out"));
    }, 4000);
    dockPending.set(id, { tabId, timer, resolve, reject });
    try {
      port.postMessage({ id, operation, ...(request ? { request } : {}) });
    } catch (error) {
      clearTimeout(timer);
      dockPending.delete(id);
      reject(error);
    }
  });
}

async function checkDockTab(tabId: number): Promise<any> {
  const session = dockSessions.get(tabId);
  if (!session || Date.now() > session.expires) throw new Error("Dock session expired");
  const tab = await chrome.tabs.get(tabId);
  if (tab.url !== dockPageUrl) throw new Error("Workspace tab changed");
  return session;
}

async function handleJevDock(message: any): Promise<any> {
  if (message.op === "newtab") {
    const tab = await chrome.tabs.create({ url: dockPageUrl, active: true });
    if (!Number.isInteger(tab.id)) throw new Error("New tab unavailable");
    const tabId = tab.id;
    dockSessions.set(tabId, { expires: Date.now() + 90000, nonce: null, consumed: false });
    pageSessions.set(tabId, { expires: Date.now() + 120000, nonce: null });
    return { tabId, created: true };
  }
  if (!Number.isInteger(message.tabId)) throw new Error("Expected owned tab ID");
  const tabId = message.tabId;
  const session = await checkDockTab(tabId);

  if (message.op === "observe") {
    if (session.consumed) throw new Error("Dock click already consumed");
    const state = await dockRpc(tabId, "observe");
    session.nonce = state.ready === true ? crypto.randomUUID() : null;
    return { ready: state.ready === true, nonce: session.nonce };
  }
  if (message.op === "activate") {
    if (session.consumed || !session.nonce || message.nonce !== session.nonce) {
      throw new Error("Stale or consumed Dock decision");
    }
    session.consumed = true;
    session.nonce = null;
    const action = await dockRpc(tabId, "activate");
    if (action.executed !== true) return { clicked: false, verified: false };
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline) {
      const tabs = await chrome.tabs.query({});
      const active = tabs.filter((tab: any) => tab.url === biliPageUrl && tab.active);
      if (active.length === 1) return { clicked: true, verified: true };
      if (active.length > 1) return { clicked: true, verified: false };
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    return { clicked: true, verified: false };
  }
  throw new Error("Unsupported Jev Dock operation");
}

async function handleJevPage(message: any): Promise<any> {
  if (message.op === "listPages") {
    const tabs = await chrome.tabs.query({});
    return {
      pages: tabs
        .filter((tab: any) => Number.isInteger(tab.id) && [dockPageUrl, biliPageUrl].includes(tab.url))
        .map((tab: any) => ({
          tabId: tab.id,
          page: tab.url === dockPageUrl ? "newtab" : "bilibili"
        }))
    };
  }
  if (!Number.isInteger(message.tabId)) throw new Error("Invalid workspace tab");
  const tabId = message.tabId;
  const tab = await chrome.tabs.get(tabId);
  if (![dockPageUrl, biliPageUrl].includes(tab.url)) throw new Error("Not a workspace page");

  if (message.op === "selectPage") {
    pageSessions.set(tabId, { expires: Date.now() + 120000, nonce: null });
    return { selected: true, page: tab.url === dockPageUrl ? "newtab" : "bilibili" };
  }
  const session = pageSessions.get(tabId);
  if (!session || Date.now() > session.expires) throw new Error("Workspace page selection expired");

  if (message.op === "observePage") {
    const response = await dockRpc(tabId, "observePage");
    if (!response.state || response.state.url !== tab.url) throw new Error("Workspace page changed");
    session.nonce = crypto.randomUUID();
    return { state: response.state, nonce: session.nonce };
  }
  if (message.op === "actPage") {
    if (!session.nonce || message.nonce !== session.nonce) throw new Error("Unobserved page action");
    session.nonce = null;
    const request = message.request;
    if (!request || !request.action || !Array.isArray(request.pageKey) || request.url !== tab.url) {
      throw new Error("Invalid observed page action");
    }
    const response = await dockRpc(tabId, "actPage", request);
    if (response.executed !== true) throw new Error("Page action not confirmed");
    const tabs = await chrome.tabs.query({});
    const next = tabs.filter((t: any) => t.active && t.url === biliPageUrl && t.windowId === tab.windowId);
    if (next.length === 1 && next[0].id !== tabId) {
      pageSessions.set(next[0].id, { expires: Date.now() + 120000, nonce: null });
      return { executed: true, nextTabId: next[0].id };
    }
    return { executed: true, nextTabId: tabId };
  }
  throw new Error("Unsupported workspace operation");
}
