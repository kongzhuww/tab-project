import {
  fullscreenCardState,
  bindFullscreenCardActions,
  type CardId,
  ACTIVE_CARD_SESSION_KEY
} from "./fullscreen-card-state";
export { fullscreenCardState } from "./fullscreen-card-state";
import { getDockModule, touchDockModuleTransition } from "../modules/registry";
import { windowManagerController } from "./window-manager.store";

const cards: CardId[] = ["workbench", "todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube", "daily-pricing"];

let pausedBackgroundVideo: HTMLVideoElement | null = null;

function pauseBackgroundVideo(): void {
  if (pausedBackgroundVideo) return;
  const video = document.querySelector<HTMLVideoElement>("#hero-background-media video");
  if (video && !video.paused) {
    pausedBackgroundVideo = video;
    video.pause();
  }
}

function resumeBackgroundVideo(): void {
  const video = pausedBackgroundVideo;
  pausedBackgroundVideo = null;
  if (video?.isConnected) void video.play().catch(() => {});
}

export const fullscreenCardsController = {
  get activeId(): CardId | null { return fullscreenCardState.activeId; },
  enter(id: string): void {
    if (!cards.includes(id as CardId)) return;
    const module = getDockModule(id);
    if (module?.lifecycle.canOpen && !module.lifecycle.canOpen()) return;
    if (fullscreenCardState.activeId) touchDockModuleTransition(fullscreenCardState.activeId);
    if (module) touchDockModuleTransition(id);
    // The selected card is rendered by Vue; never change a card's class from a classic script.
    pauseBackgroundVideo();
    try { sessionStorage.setItem(ACTIVE_CARD_SESSION_KEY, id); } catch {}
    fullscreenCardState.activeId = id as CardId;
    const win = window as any;
    if (id === "daily-bilibili") {
      win.LogicWeaverBiliFavorites?.loadOrganizer?.();
      requestAnimationFrame(() => win.ensureDailyDataLoaded?.());
    }
    // Pricing, AI HOT, YouTube and GitHub own first activation; the host selects their cards.
  },
  exit(): void {
    if (!fullscreenCardState.activeId) return;
    const leavingId = fullscreenCardState.activeId;
    touchDockModuleTransition(fullscreenCardState.activeId);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    fullscreenCardState.activeId = null;
    try { sessionStorage.removeItem(ACTIVE_CARD_SESSION_KEY); } catch {}
    windowManagerController.releaseFocus(leavingId);
    resumeBackgroundVideo();
  },
  cycle(): void {
    const current = fullscreenCardState.activeId;
    this.enter(cards[(cards.indexOf(current as CardId) + 1) % cards.length]);
  }
};
bindFullscreenCardActions({ enter: id => fullscreenCardsController.enter(id), exit: () => fullscreenCardsController.exit() });
