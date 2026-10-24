import "./page-copy-policy.css";

function isEditing(target: EventTarget | null): boolean {
  const element = target instanceof Element ? target : target instanceof Node ? target.parentElement : null;
  if (!element) return false;
  return Boolean(element.closest("input, textarea")) ||
    (element instanceof HTMLElement && element.isContentEditable);
}

/** UI preference, not DRM. Explicit copy buttons and cross-origin frames are unaffected. */
export function installPageCopyPolicy(): void {
  if (document.documentElement.classList.contains("lw-display-copy-disabled")) return;
  document.documentElement.classList.add("lw-display-copy-disabled");
  document.addEventListener("copy", event => {
    if (isEditing(event.target)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, { capture: true });
  document.addEventListener("selectstart", event => {
    if (!isEditing(event.target)) event.preventDefault();
  });
}
