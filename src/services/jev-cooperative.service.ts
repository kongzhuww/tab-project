import { commandRegistry } from "../core/commands";
import { actJevPage, observeJevPage } from "./jev-page-adapter";

declare const chrome: {
  runtime: {
    connect(options: { name: string }): {
      onMessage: { addListener(listener: (message: unknown) => void): void };
      postMessage(message: object): void;
    };
  };
};

// This is deliberately not a generic DOM bridge. Only the existing Vue Dock
// command can be observed and invoked by the paired local Jev extension.
export function registerJevCooperativeDock(): void {
  if (window.location.protocol !== "chrome-extension:" || typeof chrome === "undefined" ||
      !chrome.runtime?.connect || !["/newtab.html", "/bilibili.html"].includes(window.location.pathname)) return;
  const port = chrome.runtime.connect({ name: "jev-cooperative-dock" });
  port.onMessage.addListener((message: unknown) => {
    if (!message || typeof message !== "object") return;
    const item = message as { id?: unknown; operation?: unknown; request?: unknown };
    if (item.operation === "observePage" && typeof item.id === "string") {
      try { port.postMessage({ id: item.id, state: observeJevPage() }); }
      catch { port.postMessage({ id: item.id, error: "Page unavailable" }); }
      return;
    }
    if (item.operation === "actPage" && typeof item.id === "string") {
      try { port.postMessage({ id: item.id, ...actJevPage(item.request) }); }
      catch { port.postMessage({ id: item.id, error: "Page action rejected" }); }
      return;
    }
    if (typeof item.id !== "string" || item.id.length > 100) return;
    if (item.operation === "observe") {
      const dock = commandRegistry.list().find((command) => command.id === "dock.open-bilibili");
      port.postMessage({ id: item.id, ready: dock?.enabled === true });
      return;
    }
    if (item.operation === "activate") {
      const dock = commandRegistry.list().find((command) => command.id === "dock.open-bilibili");
      if (dock?.enabled !== true) {
        port.postMessage({ id: item.id, executed: false });
        return;
      }
      // Command registration owns the UI mutation; this service never selects
      // DOM nodes, reads private settings, or accepts arbitrary command names.
      void commandRegistry.execute("dock.open-bilibili", undefined, "jev-cooperative")
        .then(() => port.postMessage({ id: item.id, executed: true }),
              () => port.postMessage({ id: item.id, executed: false }));
    }
  });
}
