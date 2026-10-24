import { reactive, readonly } from "vue";
import { windowManagerController, windowManagerState } from "./window-manager.store";

export type ToolModalId = "firecrawl";

export const toolModalsState = reactive({
  firecrawl: false
});

export function isToolModalId(id: string): id is ToolModalId {
  return Object.prototype.hasOwnProperty.call(toolModalsState, id);
}

export const toolModalsController = {
  get state() {
    return readonly(toolModalsState);
  },
  open(id: ToolModalId) {
    toolModalsState[id] = true;
    windowManagerController.bringToFront(id);
    windowManagerController.render();
  },
  close(id: ToolModalId) {
    toolModalsState[id] = false;
    windowManagerController.releaseFocus(id);
    const idx = windowManagerState.openOrder.indexOf(id);
    if (idx >= 0) windowManagerState.openOrder.splice(idx, 1);
    const actIdx = windowManagerState.activeTools.indexOf(id);
    if (actIdx >= 0) windowManagerState.activeTools.splice(actIdx, 1);
    windowManagerController.render();
  },
  toggle(id: ToolModalId) {
    if (toolModalsState[id]) {
      this.close(id);
    } else {
      this.open(id);
    }
  }
};
