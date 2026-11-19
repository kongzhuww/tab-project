import { w as t, b as n } from "./window-manager.store-D9RSYghK.js";
import { K as i } from "./vendor-vue-BbmU9NUg.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
