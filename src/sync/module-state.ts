import { reactive } from "vue";

/** UI lifetime only. No credentials or persisted data live here. */
export const syncModuleState = reactive({ visible: false, busy: false });
