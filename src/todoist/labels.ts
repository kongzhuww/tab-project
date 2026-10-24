import { reactive, readonly } from "vue";
import { todoistModuleState } from "./module-state";
import { todoistService } from "../services/todoist.service";

export interface TodoistLabelView {
  id: string;
  name: string;
}

export interface TodoistLabelActions {
  startDrag?(name: string, event: DragEvent): void;
}

export interface TodoistLabelController {
  update(labels: readonly TodoistLabelView[]): void;
  refresh(): Promise<void>;
  setActions(actions: TodoistLabelActions): void;
  setMounted(mounted: boolean): void;
  startDrag(name: string, event: DragEvent): void;
  readonly active: boolean;
}

const state = reactive<{ labels: TodoistLabelView[] }>({ labels: [] });
let actions: TodoistLabelActions = {};
let active = false;
let labelVersion = 0, labelAbort: AbortController | undefined;
export function cancelTodoistLabelReads() {
  labelVersion++; labelAbort?.abort(); labelAbort = undefined;
}

function update(labels: readonly TodoistLabelView[]): void {
  state.labels = labels.map((label) => ({ ...label }));
}

async function refresh(): Promise<void> {
  if (!todoistModuleState.active) return;
  cancelTodoistLabelReads();
  const request = new AbortController(); labelAbort = request;
  const version = labelVersion, session = todoistModuleState.session;
  try {
    const list = await todoistService.getLabels(request.signal);
    if (!request.signal.aborted && version === labelVersion &&
        session === todoistModuleState.session && todoistModuleState.active && Array.isArray(list)) {
      update(list.map((l) => ({ id: l.id, name: l.name })));
    }
  } catch (err) {
    if (!request.signal.aborted) console.warn("[Todoist Labels] Cloud refresh failed.");
  } finally { if (labelAbort === request) labelAbort = undefined; }
}

function setActions(nextActions: TodoistLabelActions): void { actions = Object.freeze({ ...nextActions }); }
function setMounted(mounted: boolean): void { active = mounted; }
function startDrag(name: string, event: DragEvent): void { actions.startDrag?.(name, event); }

export const todoistLabelState = readonly(state);
export const todoistLabelController: TodoistLabelController = Object.freeze({
  update, refresh, setActions, setMounted, startDrag,
  get active() { return active; }
});
