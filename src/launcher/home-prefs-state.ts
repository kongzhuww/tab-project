import { reactive } from "vue";

// Presentation-only state: importing module metadata must not initialize launcher services.
export const homePrefsState = reactive({
  showWeather: true,
  showSites: true,
  showBili: true,
  showYouTube: true,
  showTodo: true,
  showBookmarkPanel: true
});
