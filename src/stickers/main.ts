import { createApp } from "vue";
import { ensureImeDocumentTracker } from "../core/ime-keyboard";
ensureImeDocumentTracker();
import StickerStandalone from "./StickerStandalone.vue";

const root = document.getElementById("vue-sticker-standalone-root");
if (root) createApp(StickerStandalone).mount(root);
