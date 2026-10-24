import { reactive, readonly } from "vue";
import { todoistTaskListController } from "./task-list-store";

export type TodoistWorkspaceView = "inbox" | "projects" | "today";

export interface TodoistWorkspaceActions {
  switchView?(view: TodoistWorkspaceView): void | Promise<void>;
}

export interface TodoistWorkspaceController {
  update(view: TodoistWorkspaceView): void;
  setActions(actions: TodoistWorkspaceActions): void;
  setMounted(mounted: boolean): void;
  switchView(view: TodoistWorkspaceView): Promise<void>;
  readonly active: boolean;
}

const state = reactive<{ view: TodoistWorkspaceView }>({ view: "inbox" });
let actions: TodoistWorkspaceActions = {};
let active = false;

function update(view: TodoistWorkspaceView): void { state.view = view; }
function setActions(nextActions: TodoistWorkspaceActions): void { actions = Object.freeze({ ...nextActions }); }
function setMounted(mounted: boolean): void { active = mounted; }
async function switchView(view: TodoistWorkspaceView): Promise<void> {
  update(view);
  await todoistTaskListController.loadWorkspace(view);
  if (actions.switchView) {
    await actions.switchView(view);
  }
}

export const todoistWorkspaceState = readonly(state);
export const todoistWorkspaceController: TodoistWorkspaceController = Object.freeze({
  update, setActions, setMounted, switchView,
  get active() { return active; }
});
