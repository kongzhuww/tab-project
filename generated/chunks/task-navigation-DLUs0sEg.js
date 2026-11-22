import { w as t, b as n } from "./window-manager.store-BoJtJrk7.js";
import { K as i } from "./vendor-vue-C-_ocEUS.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
