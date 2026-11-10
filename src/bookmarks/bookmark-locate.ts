export const pendingBookmarkLocate = {
  nodeId: "",
  url: "",
  timestamp: 0
};

export function requestLocateBookmark(nodeId?: string, url?: string): void {
  pendingBookmarkLocate.nodeId = nodeId || "";
  pendingBookmarkLocate.url = url || "";
  pendingBookmarkLocate.timestamp = Date.now();
  window.dispatchEvent(new CustomEvent("logicweaver:locate-bookmark", {
    detail: { nodeId, url }
  }));
}
