import { w as t, b as n } from "./window-manager.store-DE8sG7Nf.js";
import { M as i } from "./vendor-vue-BrDsOMg2.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
