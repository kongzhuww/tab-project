// Re-export the existing UI implementations. No second renderer, state or theme.
// Import this subpath only in application views, never in lightweight module metadata.
export { default as AppWindowFrame } from "../core/AppWindowFrame.vue";
export { default as ModuleSettingsPanel } from "../components/ModuleSettingsPanel.vue";
export { useWindowDraggable } from "../core/useWindowDraggable";
export type { UseWindowDraggableOptions, WindowRect } from "../core/useWindowDraggable";
