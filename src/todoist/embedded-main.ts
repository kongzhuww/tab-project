import { createApp } from 'vue';
import { ensureImeDocumentTracker } from '../core/ime-keyboard';
ensureImeDocumentTracker();
import TodoistWorkspace from './TodoistWorkspace.vue';
import { todoistModuleState } from './module-state';
import { todoistMainWorkspaceState } from './main-workspace-store';

// This extension-owned frame isolates the existing workspace's singleton state,
// window registration and DOM IDs from the main Todoist window.
// The frame has its own store instance; leave the standalone workspace default unchanged.
todoistMainWorkspaceState.isCalendarOpen = false;
window.addEventListener('message', event => {
  if (event.source !== window.parent || event.origin !== window.location.origin) return;
  if (event.data?.type !== 'tab-todoist-embedded-visibility' || typeof event.data.visible !== 'boolean') return;
  todoistModuleState.visible = event.data.visible;
});
createApp(TodoistWorkspace, { embedded:true }).mount('#todoist-embedded-root');
