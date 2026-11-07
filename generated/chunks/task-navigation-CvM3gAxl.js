import { w as t, b as n } from "./window-manager.store-BdI_8a-H.js";
import { M as i } from "./vendor-vue-9b0eS4bW.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
