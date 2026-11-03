import { w as t, b as n } from "./window-manager.store-BaRzBtVM.js";
import { O as i } from "./vendor-vue-dDCd4-uG.js";
const s = i(null);
function e(o) {
  o && (t.open("todoist"), s.value = { id: o, transition: n("todoist") });
}
export {
  e as openTodoistTask,
  s as pendingTodoistTask
};
