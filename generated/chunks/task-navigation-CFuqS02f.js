import { w as t, b as n } from "./window-manager.store-DgNn9Rtk.js";
import { O as i } from "./vendor-vue-wIH4jcna.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
