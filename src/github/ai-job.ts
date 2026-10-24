import { reactive } from "vue";
// Page-local only; never contains credentials or complete endpoint URLs.
export const githubAiJob = reactive({ busy: false, message: "", repo: "", completed: 0, total: 0,
  uncertain: false, unlockConfirmation: false });
