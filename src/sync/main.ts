import { createApp } from "vue";
import SyncBridgeApp from "./SyncBridgeApp.vue";

const root = document.getElementById("vue-sync-bridge-root");
if (root) createApp(SyncBridgeApp).mount(root);
