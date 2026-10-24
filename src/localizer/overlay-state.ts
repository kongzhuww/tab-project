import { reactive } from "vue";

export const overlayState = reactive({
  visible: false,
  original: "",
  translated: "",
  toast: "",
  saving: false
});

export let saveTranslation: (original: string, translated: string) => Promise<void> = async () => {};
export function setSaveTranslation(handler: typeof saveTranslation): void { saveTranslation = handler; }
let toastTimer = 0;
export function showLocalizerToast(message: string): void {
  overlayState.toast = message;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { overlayState.toast = ""; }, 3500);
}
export function openTranslation(original: string, translated: string): void {
  overlayState.original = original;
  overlayState.translated = translated;
  overlayState.visible = true;
}
