import { onUnmounted, watch } from 'vue';
import { todoistModuleState } from './module-state';

/** Coalesce notifications; hidden pages and local writes defer reads, never writes. */
export function useTaskInvalidation(ready: () => boolean, cancel: () => void, refresh: () => unknown) {
  let dirty = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stop = watch(() => [todoistModuleState.dataRevision, ready(), todoistModuleState.pendingWrites] as const,
    ([revision, active, writes], previous) => {
      if (previous && revision !== previous[0]) { dirty = true; cancel(); }
      if (timer) clearTimeout(timer);
      if (!dirty || !active || writes) return;
      timer = setTimeout(() => {
        timer = undefined;
        if (!ready() || todoistModuleState.pendingWrites) return;
        dirty = false;
        void refresh();
      }, 150);
    });
  onUnmounted(() => { stop(); if (timer) clearTimeout(timer); });
}
