import { computed, nextTick, onBeforeUnmount, ref, watch, type CSSProperties } from "vue";

export interface ContextMenuOptions {
  visible: () => boolean;
  anchor: () => { x: number; y: number };
  placement?: "above" | "below";
  align?: "start" | "center";
  gap?: number;
  dismiss: () => void;
}

/** Owns only a menu's geometry and active listeners, never its actions or target data. */
export function useContextMenu(options: ContextMenuOptions) {
  const menuRef = ref<HTMLElement | null>(null);
  const left = ref(8), top = ref(8);
  const positioned = ref(false);
  const viewportWidth = ref(0), viewportHeight = ref(0);
  let observer: ResizeObserver | undefined;
  let generation = 0;
  let disposed = false;
  const style = computed<CSSProperties>(() => ({
    position: "fixed", left: `${left.value}px`, top: `${top.value}px`, bottom: "auto",
    maxWidth: `${Math.max(0, viewportWidth.value - 16)}px`,
    maxHeight: `${Math.max(0, viewportHeight.value - 16)}px`,
    overflowY: "auto", boxSizing: "border-box",
    visibility: positioned.value ? "visible" : "hidden"
  }));
  function place() {
    if (!options.visible() || !menuRef.value) return;
    viewportWidth.value = window.innerWidth;
    viewportHeight.value = window.innerHeight;
    // Layout dimensions exclude any entrance transform/scale.
    const width = menuRef.value.offsetWidth, height = menuRef.value.offsetHeight;
    const anchor = options.anchor();
    const x = Number.isFinite(anchor.x) ? anchor.x : 8;
    const y = Number.isFinite(anchor.y) ? anchor.y : 8;
    const gap = options.gap ?? 0;
    const desiredTop = options.placement === "above" ? y - height - gap : y + gap;
    const desiredLeft = options.align === "center" ? x - width / 2 : x;
    left.value = Math.max(8, Math.min(desiredLeft, viewportWidth.value - width - 8));
    top.value = Math.max(8, Math.min(desiredTop, viewportHeight.value - height - 8));
    positioned.value = true;
  }
  function outside(event: PointerEvent) {
    if (!menuRef.value || event.composedPath().includes(menuRef.value)) return;
    options.dismiss();
  }
  function key(event: KeyboardEvent) {
    if (event.key !== "Escape" || event.isComposing || event.keyCode === 229) return;
    event.preventDefault(); event.stopPropagation(); options.dismiss();
  }
  function hidePage() { options.dismiss(); }
  function visibility() { if (document.hidden) options.dismiss(); }
  function detach() {
    ++generation;
    observer?.disconnect(); observer = undefined;
    window.removeEventListener("resize", place);
    document.removeEventListener("pointerdown", outside, true);
    window.removeEventListener("keydown", key, true);
    window.removeEventListener("pagehide", hidePage);
    document.removeEventListener("visibilitychange", visibility);
  }
  watch(() => [options.visible(), options.anchor().x, options.anchor().y] as const, async ([visible]) => {
    detach();
    positioned.value = false;
    if (!visible || disposed) return;
    const current = generation;
    // Set viewport bounds before measuring (including a menu taller than the viewport).
    viewportWidth.value = window.innerWidth;
    viewportHeight.value = window.innerHeight;
    await nextTick();
    if (disposed || generation !== current || !options.visible() || !menuRef.value) return;
    place();
    observer = new ResizeObserver(place);
    observer.observe(menuRef.value);
    window.addEventListener("resize", place);
    document.addEventListener("pointerdown", outside, true);
    window.addEventListener("keydown", key, true);
    window.addEventListener("pagehide", hidePage);
    document.addEventListener("visibilitychange", visibility);
  }, { immediate: true, flush: "post" });
  onBeforeUnmount(() => { disposed = true; detach(); });
  return { menuRef, style };
}
