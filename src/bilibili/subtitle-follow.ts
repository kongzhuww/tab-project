/** Keep the active subtitle centered, except while the reader is interacting. */
export function createSubtitleFollow(
  getContainer: () => HTMLElement | null,
  getTarget: () => HTMLElement | null,
  idleMs = 5000,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let suspended = false;
  let pointerHeld = false;

  function clearTimer() {
    if (timer) clearTimeout(timer);
    timer = null;
  }
  function follow(smooth = true) {
    if (suspended || pointerHeld) return;
    const container = getContainer();
    const target = getTarget();
    if (!container || !target || !container.contains(target)) return;
    const box = container.getBoundingClientRect();
    const item = target.getBoundingClientRect();
    const top = container.scrollTop + item.top - box.top - (container.clientHeight - item.height) / 2;
    container.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  }
  function schedule() {
    clearTimer();
    if (pointerHeld) return;
    timer = setTimeout(() => {
      timer = null;
      suspended = false;
      follow();
    }, idleMs);
  }
  function interact() {
    suspended = true;
    schedule();
  }
  function releasePointer() {
    if (!pointerHeld) return;
    pointerHeld = false;
    window.removeEventListener('pointerup', releasePointer);
    window.removeEventListener('pointercancel', releasePointer);
    window.removeEventListener('blur', releasePointer);
    schedule();
  }
  function pointerDown() {
    pointerHeld = true;
    interact();
    window.addEventListener('pointerup', releasePointer);
    window.addEventListener('pointercancel', releasePointer);
    window.addEventListener('blur', releasePointer);
  }
  function keyDown(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) interact();
  }
  function reset() {
    clearTimer();
    pointerHeld = false;
    suspended = false;
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointerup', releasePointer);
      window.removeEventListener('pointercancel', releasePointer);
      window.removeEventListener('blur', releasePointer);
    }
  }
  return { follow, interact, pointerDown, keyDown, reset };
}

export const subscriptionSubtitleFollow = createSubtitleFollow(
  () => document.querySelector<HTMLElement>('.bili-sub-transcript-body'),
  () => document.querySelector<HTMLElement>('.bili-sub-newspaper-cue.cue-reading-active, .bili-sub-srt-row.active'),
);
