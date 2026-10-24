import type { DockModuleDefinition } from "../modules/registry";
import { calendarModuleState, canUnmountCalendar, pauseCalendarReads } from "./module-state";

export const calendarDockModule = {
  schemaVersion: 1, id: "calendar", title: "日历模块", emoji: "▦", showInDock: false,
  rootId: "vue-calendar-workspace-root", settingsKeys: [],
  capabilities: ["calendar:shared-todoist-data", "window:auxiliary"],
  loadView: () => import("./CalendarWorkspace.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => calendarModuleState.visible,
    open: () => { calendarModuleState.visible = true; },
    hide: () => { calendarModuleState.visible = false; pauseCalendarReads(); },
    canUnmount: canUnmountCalendar,
    unmountBlockedMessage: "Todoist 任务或设置正在提交，不能退出或重载日历；可以隐藏，已提交操作继续。"
  }
} satisfies DockModuleDefinition;
