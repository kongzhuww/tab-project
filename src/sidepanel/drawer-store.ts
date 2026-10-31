import { reactive, readonly } from "vue";

const state = reactive({
  isOpen: false
});

export const sideDrawerController = {
  open() {
    state.isOpen = true;
  },
  close() {
    state.isOpen = false;
  },
  toggle() {
    state.isOpen = !state.isOpen;
  }
};

export const sideDrawerState = readonly(state);

// Register only in the home-page host, not every entry that imports this store.
export function bindSideDrawerMessages(): () => void {
  if (typeof chrome === "undefined" || !chrome.runtime?.onMessage) return () => {};
  let disposed = false;
  let currentTabId: number | undefined;
  const listener = (message: any, sender: { id?: string }, respond: (reply: { ok: boolean }) => void) => {
    if (sender.id !== chrome.runtime.id || message?.type !== "TOGGLE_SIDE_DRAWER" ||
        currentTabId === undefined || message.targetTabId !== currentTabId) return;
    sideDrawerController.toggle();
    respond({ ok: true });
  };
  void chrome.tabs.getCurrent().then((tab: { id?: number } | undefined) => {
    if (disposed) return;
    currentTabId = tab?.id;
    chrome.runtime.onMessage.addListener(listener);
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command."));
  return () => {
    disposed = true;
    chrome.runtime.onMessage.removeListener(listener);
  };
}
