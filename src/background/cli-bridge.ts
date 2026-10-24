/**
 * LogicWeaver 新标签页 - CLI 桥接后台长轮询守护通道 (TypeScript 模块)
 */

declare const chrome: any;

const BG_CLI_URL = "http://127.0.0.1:19826";

async function handleBgCliCommand(cmd: any): Promise<any> {
  const { action, params = {} } = cmd || {};
  const myId = chrome.runtime.id;

  if (action === "bg-status") {
    const tabs = await chrome.tabs.query({});
    const ownTabs = tabs
      .filter((t: any) => (t.url || "").includes(myId))
      .map((t: any) => ({ id: t.id, url: t.url, title: t.title, active: t.active, windowId: t.windowId }));
    return {
      extensionId: myId,
      version: chrome.runtime.getManifest().version,
      ownTabsCount: ownTabs.length,
      ownTabs
    };
  }

  if (action === "bg-open-tab") {
    const page = params.page || "newtab.html";
    const targetUrl = chrome.runtime.getURL(page);
    const tabs = await chrome.tabs.query({});
    const existing = tabs.find((t: any) => (t.url || "").startsWith(targetUrl));
    if (existing && existing.id != null) {
      await chrome.tabs.update(existing.id, { active: true });
      return { ok: true, tabId: existing.id, reused: true, url: existing.url };
    }
    const created = await chrome.tabs.create({ url: targetUrl, active: true });
    return { ok: true, tabId: created.id, reused: false, url: targetUrl };
  }

  if (action === "bg-reload-pages") {
    const tabs = await chrome.tabs.query({});
    const ownTabs = tabs.filter((t: any) => (t.url || "").includes(myId) && t.id != null);
    for (const t of ownTabs) {
      try {
        await chrome.tabs.reload(t.id);
      } catch {}
    }
    return { ok: true, reloadedTabs: ownTabs.length };
  }

  if (action === "bg-get-all-tabs") {
    const tabs = await chrome.tabs.query({});
    return {
      total: tabs.length,
      tabs: tabs.map((t: any) => ({ id: t.id, url: t.url, title: t.title, active: t.active, windowId: t.windowId }))
    };
  }

  if (action === "bg-create-tab") {
    const tab = await chrome.tabs.create({ url: params.url || chrome.runtime.getURL("newtab-bootstrap.html"), active: params.active ?? true });
    return { ok: true, tabId: tab.id };
  }

  if (action === "bg-get-storage") {
    const data = await chrome.storage.local.get(params.keys || null);
    return { ok: true, data };
  }

  if (action === "bg-set-storage") {
    await chrome.storage.local.set(params.data || {});
    return { ok: true };
  }

  if (action === "bg-reload-ext") {
    setTimeout(() => chrome.runtime.reload(), 120);
    return { ok: true, reloadingExtension: true };
  }

  throw new Error(`Unknown background CLI action: ${action}`);
}

export function startBgCliPolling(): void {
  const bgClientId = `bg_${chrome.runtime.id || "ext"}`;

  (async () => {
    while (true) {
      try {
        const resp = await fetch(`${BG_CLI_URL}/poll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId: bgClientId,
            role: "background",
            url: `chrome-extension://${chrome.runtime.id}/background.js`,
            title: "LogicWeaver Background ServiceWorker",
            active: true
          })
        });
        if (!resp.ok) {
          await new Promise((r) => setTimeout(r, 3000));
          continue;
        }
        const data = await resp.json();
        if (data && data.command && data.requestId) {
          try {
            const result = await handleBgCliCommand(data.command);
            await fetch(`${BG_CLI_URL}/reply`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ requestId: data.requestId, ok: true, result })
            });
          } catch (err: any) {
            await fetch(`${BG_CLI_URL}/reply`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ requestId: data.requestId, ok: false, error: err?.message || String(err) })
            }).catch(() => {});
          }
        }
      } catch {
        await new Promise((r) => setTimeout(r, 3500));
      }
    }
  })();
}
