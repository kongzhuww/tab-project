import { createApp } from "vue";
import { installPageCopyPolicy } from "../core/page-copy-policy";
installPageCopyPolicy();
import { ensureImeDocumentTracker } from "../core/ime-keyboard";
ensureImeDocumentTracker();
import SearchLauncher from "./SearchLauncher.vue";

const root = document.getElementById("vue-search-launcher-root");
if (root) {
  createApp(SearchLauncher).mount(root);
}
