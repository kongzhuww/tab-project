import { reactive } from "vue";

// Presentation-only state: importing module metadata must not initialize launcher services.
export const homePrefsState = reactive({
  showWeather: true,
  showSites: true,
  showHomeNews: true,
  showHomePlayer: true,
  showBili: true,
  showTodo: true,
  showBookmarkPanel: true
});
