/** Runtime handoff from the early-paint bootstrap: body alone owns fullscreen CSS. */
export function syncFullscreenPresentation(activeId: string | null): void {
  if (typeof document === "undefined") return;
  // Older bootstraps marked html too. That marker used to hide the launcher forever.
  document.documentElement?.classList.remove("has-card-fullscreen");
  if (!document.body) return;
  document.body.classList.toggle("has-card-fullscreen", Boolean(activeId));
  document.body.dataset.page = activeId ? "daily" : "home";
}
