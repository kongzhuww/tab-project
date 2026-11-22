import { c as i } from "./chunks/vendor-vue-C-_ocEUS.js";
import { e } from "./chunks/_plugin-vue_export-helper-CUD1GoS1.js";
import { _ as t } from "./chunks/TodoistWorkspace.vue_vue_type_script_setup_true_lang-CY13N1Y3.js";
import { t as a } from "./chunks/module-state-CL24MXdf.js";
import { h as r } from "./chunks/calendar.service-Bm_mVIJW.js";
e();
r.isCalendarOpen = !1;
window.addEventListener("message", (o) => {
  o.source !== window.parent || o.origin !== window.location.origin || o.data?.type !== "tab-todoist-embedded-visibility" || typeof o.data.visible != "boolean" || (a.visible = o.data.visible);
});
i(t, { embedded: !0 }).mount("#todoist-embedded-root");
