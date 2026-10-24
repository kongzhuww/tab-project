import { createApp } from "vue";
import SidePanelApp from "./SidePanelApp.vue";
import "../assets/styles.css";

const root = document.getElementById("vue-sidepanel-root");
if (root) {
  const app = createApp(SidePanelApp);
  app.mount(root);
}
