import { c as o } from "./chunks/vendor-vue-BbmU9NUg.js";
import { _ as t } from "./chunks/TodoistWorkspace.vue_vue_type_script_setup_true_lang-DHSBfg8m.js";
import { t as e } from "./chunks/module-state-C_zTFjJe.js";
import { h as a } from "./chunks/calendar.service-mpptDPpa.js";
a.isCalendarOpen = !1;
window.addEventListener("message", (i) => {
  i.source !== window.parent || i.origin !== window.location.origin || i.data?.type !== "tab-todoist-embedded-visibility" || typeof i.data.visible != "boolean" || (e.visible = i.data.visible);
});
o(t, { embedded: !0 }).mount("#todoist-embedded-root");
