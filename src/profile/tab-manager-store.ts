import { reactive } from 'vue';
export const tabManagerState = reactive({ isOpen: false });
export const tabManagerController = {
  state: tabManagerState,
  open() { tabManagerState.isOpen = true; },
  close() { tabManagerState.isOpen = false; }
};
