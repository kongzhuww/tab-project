import { w as t, b as n } from "./window-manager.store-fHSi_Uh8.js";
import { M as i } from "./vendor-vue-BkY5-p5y.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
