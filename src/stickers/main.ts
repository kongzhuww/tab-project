import { createApp } from "vue";
import StickerStandalone from "./StickerStandalone.vue";

const root = document.getElementById("vue-sticker-standalone-root");
if (root) createApp(StickerStandalone).mount(root);
