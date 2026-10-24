import { reactive } from "vue";
import { calendarModuleState } from "./module-state";
import { windowManagerController } from "../core/window-manager.store";

export const calendarWorkspaceState = reactive({
  get isOpen() { return calendarModuleState.visible; },
  title: "任务日历", summary: "Todoist 截止日期", statusText: "", isLoading: false
});
export type CalendarWorkspaceState = typeof calendarWorkspaceState;
interface WindowActions { refresh(): Promise<boolean>; goToday(): void }
let actions: WindowActions | undefined;
export const calendarWorkspaceController = {
  get state() { return calendarWorkspaceState; },
  get ready() { return Boolean(actions) && calendarModuleState.active; },
  attach(next: WindowActions): () => void {
    actions = next;
    return () => { if (actions === next) actions = undefined; };
  },
  updateState(partial: Partial<Omit<CalendarWorkspaceState, "isOpen">>) {
    Object.assign(calendarWorkspaceState, partial);
  },
  open() { windowManagerController.open("calendar"); },
  close() { void windowManagerController.close("calendar"); },
  refresh(): Promise<boolean> {
    if (!this.ready) { this.setStatusText("请先打开日历并等待窗口就绪。"); return Promise.resolve(false); }
    return actions!.refresh();
  },
  goToday() {
    if (!this.ready) { this.setStatusText("请先打开日历并等待窗口就绪。"); return; }
    actions!.goToday();
  },
  openTodoist() { windowManagerController.open("todoist"); },
  setStatusText(text: string) { calendarWorkspaceState.statusText = text; }
};
