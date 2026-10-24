import { shallowRef } from "vue";
import { windowManagerController } from "../core/window-manager.store";
import { getDockModuleTransition } from "../modules/registry";

// Page-memory routing intent only. The mounted Todoist View owns consumption and detail reads.
export const pendingTodoistTask = shallowRef<{ id: string; transition: number } | null>(null);
export function openTodoistTask(id: string): void {
  if (!id) return;
  windowManagerController.open("todoist");
  pendingTodoistTask.value = { id, transition: getDockModuleTransition("todoist") };
}
