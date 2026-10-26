import { w as t, b as n } from "./window-manager.store-Dfe7fisV.js";
import { N as i } from "./vendor-vue-DokqDua_.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
