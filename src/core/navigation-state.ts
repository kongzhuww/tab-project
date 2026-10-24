import { computed } from "vue";
import { fullscreenCardState, type CardId } from "./fullscreen-card-state";
import { windowManagerController, windowManagerState } from "./window-manager.store";

const standaloneCards: Record<string, CardId> = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube",
  "pricing.html": "daily-pricing"
};

export function getStandaloneCardId(): CardId | null {
  if (typeof location === "undefined") return null;
  return standaloneCards[location.pathname.split("/").pop() || ""] || null;
}

// Fullscreen selection and floating-window focus remain separate owners.
// Consumers derive presentation instead of copying either ID into another store.
export const activeViewId = computed(() => {
  const card = getStandaloneCardId() || fullscreenCardState.activeId;
  if (card) return card;
  const windowId = windowManagerState.activeId;
  return windowId && windowManagerController.isActive(windowId) ? windowId : "home";
});
