import { c as i } from "./chunks/vendor-vue-_upDT3S_.js";
import { e } from "./chunks/_plugin-vue_export-helper-DtNgUcga.js";
import { _ as t } from "./chunks/TodoistWorkspace.vue_vue_type_script_setup_true_lang-5AKb_CGV.js";
import { t as a } from "./chunks/module-state-BGAOq8La.js";
import { h as r } from "./chunks/calendar.service-l2hESSGs.js";
e();
r.isCalendarOpen = !1;
window.addEventListener("message", (o) => {
  o.source !== window.parent || o.origin !== window.location.origin || o.data?.type !== "tab-todoist-embedded-visibility" || typeof o.data.visible != "boolean" || (a.visible = o.data.visible);
});
i(t, { embedded: !0 }).mount("#todoist-embedded-root");
