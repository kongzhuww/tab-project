import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { fullscreenCardState } from "./fullscreen-cards.store";

/** A retained fullscreen card and its standalone page share activity, not window Quit semantics. */
export function useCardActivity(id: NonNullable<typeof fullscreenCardState.activeId>, standalonePath: string) {
  const standalone = typeof location !== "undefined" && location.pathname.endsWith(standalonePath);
  const mounted = ref(false);
  const pageVisible = ref(typeof document !== "undefined" && !document.hidden);
  const pagePresent = ref(true);
  const active = computed(() => mounted.value && pagePresent.value && pageVisible.value &&
    (standalone || fullscreenCardState.activeId === id));
  function visibility() { pageVisible.value = !document.hidden; }
  function hide() { pagePresent.value = false; }
  function show() { pagePresent.value = true; visibility(); }
  onMounted(() => {
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", hide);
    window.addEventListener("pageshow", show);
    visibility(); mounted.value = true;
  });
  onBeforeUnmount(() => {
    mounted.value = false;
    document.removeEventListener("visibilitychange", visibility);
    window.removeEventListener("pagehide", hide);
    window.removeEventListener("pageshow", show);
  });
  return { active, standalone };
}
