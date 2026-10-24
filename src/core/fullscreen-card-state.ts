import { reactive, watch } from "vue";
export type CardId = "todoist" | "card-github" | "daily-aihot" | "daily-bilibili" | "daily-youtube" | "daily-pricing" | "workbench";

export const VALID_FULLSCREEN_CARDS: readonly CardId[] = [
  "workbench",
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube",
  "daily-pricing"
];
export const ACTIVE_CARD_SESSION_KEY = "lw_active_card";

export function getInitialActiveCardId(): CardId | null {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(ACTIVE_CARD_SESSION_KEY);
    }
    if (typeof window !== "undefined" && window.location?.hash) {
      const hash = window.location.hash.replace(/^#/, "");
      if ((VALID_FULLSCREEN_CARDS as readonly string[]).includes(hash)) {
        return hash as CardId;
      }
    }
    if (typeof sessionStorage !== "undefined") {
      const saved = sessionStorage.getItem(ACTIVE_CARD_SESSION_KEY);
      if (saved && (VALID_FULLSCREEN_CARDS as readonly string[]).includes(saved)) {
        return saved as CardId;
      }
    }
  } catch {}
  return null;
}

export const fullscreenCardState = reactive<{ activeId: CardId | null }>({
  activeId: getInitialActiveCardId()
});

if (typeof window !== "undefined") {
  watch(
    () => fullscreenCardState.activeId,
    (id) => {
      try {
        if (id) {
          sessionStorage.setItem(ACTIVE_CARD_SESSION_KEY, id);
          if (window.location.hash !== `#${id}`) {
            history.replaceState(null, "", `#${id}`);
          }
        } else {
          sessionStorage.removeItem(ACTIVE_CARD_SESSION_KEY);
          if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname + window.location.search);
          }
        }
      } catch {}
    },
    { immediate: true }
  );
}
// Lightweight bridge avoids registry -> module -> Dock store registration cycles.
let actions: { enter: (id: string) => void; exit: () => void } | undefined;
export function bindFullscreenCardActions(next: NonNullable<typeof actions>): void { actions = next; }
export function openRegisteredCard(id: CardId): void {
  if (!actions) throw new Error("Fullscreen card host not ready");
  actions.enter(id);
}
export function hideRegisteredCard(id: CardId): void {
  if (fullscreenCardState.activeId === id) actions?.exit();
}
