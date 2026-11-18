import { c as o } from "./chunks/vendor-vue-BrDsOMg2.js";
import { _ as t } from "./chunks/TodoistWorkspace.vue_vue_type_script_setup_true_lang-DsEeIULX.js";
import { t as e } from "./chunks/module-state-B7yI5akm.js";
import { h as a } from "./chunks/calendar.service-qmuavbmM.js";
a.isCalendarOpen = !1;
window.addEventListener("message", (i) => {
  i.source !== window.parent || i.origin !== window.location.origin || i.data?.type !== "tab-todoist-embedded-visibility" || typeof i.data.visible != "boolean" || (e.visible = i.data.visible);
});
o(t, { embedded: !0 }).mount("#todoist-embedded-root");
