import { reactive } from "vue";
import { todoistModuleState } from "../todoist/module-state";

export const calendarModuleState = reactive({ visible: false, active: false });
const pausers = new Set<() => void>();
export function onCalendarPause(pause: () => void): () => void {
  pausers.add(pause); return () => { pausers.delete(pause); };
}
export function pauseCalendarReads(): void {
  calendarModuleState.active = false;
  for (const pause of pausers) pause();
}
export function canUnmountCalendar(): boolean {
  // Includes calendar mutations and same-page Todoist/account writes; never cancels a posted write.
  return todoistModuleState.pendingWrites === 0;
}
