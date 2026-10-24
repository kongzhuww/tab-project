import { reactive } from "vue";
import { todoistTaskListController } from "./task-list-store";
import { windowManagerController } from "../core/window-manager.store";
import { todoistModuleState } from "./module-state";

export interface TodoistMainWorkspaceState {
  isOpen: boolean; title: string; isSaving: boolean; timerMinutes: number;
  labelCount: number; isCalendarOpen: boolean; isLabelPopoverOpen: boolean;
}
export const todoistMainWorkspaceState = reactive<TodoistMainWorkspaceState>({
  get isOpen() { return todoistModuleState.visible; },
  set isOpen(value: boolean) { todoistModuleState.visible = value; },
  title: "收件箱", isSaving: false, timerMinutes: 30, labelCount: 0,
  isCalendarOpen: true, isLabelPopoverOpen: false
});
export type TodoistMainWorkspaceAction = "open" | "close" | "minimize" | "refresh" |
  "save" | "toggle-calendar" | "timer-click" | "toggle-label-popover";
export type TodoistMainWorkspaceActionHandler = (action: TodoistMainWorkspaceAction, payload?: any) => void;
const actionHandlers = new Set<TodoistMainWorkspaceActionHandler>();
export const todoistMainWorkspaceController = {
  get state() { return todoistMainWorkspaceState; },
  updateState(partial: Partial<TodoistMainWorkspaceState>) { Object.assign(todoistMainWorkspaceState, partial); },
  open() { windowManagerController.open("todoist"); },
  close() { return windowManagerController.close("todoist"); },
  minimize() { windowManagerController.minimize("todoist"); },
  refresh() { void todoistTaskListController.loadWorkspace(undefined, undefined, true); },
  // Compatibility bridge only; there is no remote order-save implementation.
  save() { this.dispatch("save"); },
  toggleCalendar() {
    todoistMainWorkspaceState.isCalendarOpen = !todoistMainWorkspaceState.isCalendarOpen;
    this.dispatch("toggle-calendar", { isOpen: todoistMainWorkspaceState.isCalendarOpen });
  },
  toggleLabelPopover() {
    todoistMainWorkspaceState.isLabelPopoverOpen = !todoistMainWorkspaceState.isLabelPopoverOpen;
  },
  onAction(handler: TodoistMainWorkspaceActionHandler) {
    actionHandlers.add(handler); return () => { actionHandlers.delete(handler); };
  },
  dispatch(action: TodoistMainWorkspaceAction, payload?: any) {
    for (const handler of actionHandlers) handler(action, payload);
  }
};
