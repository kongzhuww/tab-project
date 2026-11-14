import { reactive } from "vue";

export interface BackpackModuleState {
  visible: boolean;
  pendingWrites: number;
}

export const backpackModuleState = reactive<BackpackModuleState>({
  visible: false,
  pendingWrites: 0
});
