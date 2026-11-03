<script setup lang="ts">
import { watch, nextTick, onMounted, onUnmounted, computed } from "vue";
import { todoistModuleState, onTodoistPause, pauseTodoistReads } from "./module-state";
import { todoistTaskListController, todoistTaskListState, cancelTodoistWorkspaceReads } from "./task-list-store";
import { cancelTodoistDateReads } from "./calendar-sidebar-store";
import { cancelTodoistLabelReads } from "./labels";
import { useWindowDraggable } from "../core/useWindowDraggable";
import { windowManagerController } from "../core/window-manager.store";
import {
  todoistMainWorkspaceState,
  todoistMainWorkspaceController
} from "./main-workspace-store";
import TodoistWorkspaceTabs from "./TodoistWorkspaceTabs.vue";
import AccountSetupGuide from "../core/AccountSetupGuide.vue";
import TodoistCalendarSidebar from "./TodoistCalendarSidebar.vue";
import TodoistTaskList from "./TodoistTaskList.vue";
import TodoistInspectorDrawer from "./TodoistInspectorDrawer.vue";
import { todoistInspectorState, todoistInspectorController } from "./inspector-store";
import { todoistLabelController } from "./labels";
import { todoistService } from "../services/todoist.service";
import { ref, defineAsyncComponent } from "vue";
import { pendingTodoistTask } from "./task-navigation";
import { notificationController } from "../notifications/store";
import { getDockModuleTransition } from "../modules/registry";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { hideRegisteredCard } from "../core/fullscreen-card-state";
import { useTaskInvalidation } from "./use-task-invalidation";
import { t } from "../i18n";
const taskNavigationMounted = ref(false);
const TodoistAccountSettings = defineAsyncComponent(() => import("./TodoistAccountSettings.vue"));
const accountSettingsOpen = ref(false);
const accountSettingsMounted = ref(false);
const pageVisible = ref(!document.hidden);
const isFullscreen = ref(false);
const active = computed(() => todoistModuleState.visible && pageVisible.value);
todoistModuleState.session++;
todoistModuleState.active = active.value;
useTaskInvalidation(() => active.value && !todoistTaskListState.movingTaskId,
  cancelTodoistWorkspaceReads, () => todoistTaskListController.loadWorkspace(undefined, undefined, true));
let firstRequested = false;
const accountSettingsButton = ref<HTMLElement | null>(null);

const state = todoistMainWorkspaceState;

function clearInlineStyles() {
  if (panelRef.value) {
    panelRef.value.style.removeProperty("width");
    panelRef.value.style.removeProperty("height");
    panelRef.value.style.removeProperty("left");
    panelRef.value.style.removeProperty("top");
    panelRef.value.style.removeProperty("right");
    panelRef.value.style.removeProperty("bottom");
    panelRef.value.style.removeProperty("margin");
    panelRef.value.style.removeProperty("transform");
  }
}

watch(() => todoistModuleState.visible, val => {
  if (val) {
    state.isOpen = true;
    todoistModuleState.active = pageVisible.value;
    void todoistTaskListController.loadWorkspace();
  }
}, { immediate: true });

const TODOIST_WORKSPACE_POSITION_KEY = "todoistWorkspacePosition";

const {
  panelRef,
  headerRef,
  initialStyle,
  stopInteractions,
  onHeaderPointerDown,
  onResizePointerDown,
  bringToFront
} = useWindowDraggable({
  windowId: "todoist",
  storageKey: TODOIST_WORKSPACE_POSITION_KEY,
  defaultWidth: 980,
  defaultHeight: 640,
  defaultLeft: Math.max(340, typeof window !== "undefined" ? Math.floor(window.innerWidth - 1000) : 480),
  defaultTop: 68,
  minWidth: 520,
  minHeight: 380,
  active: () => active.value
});

const getWindowElement = () => panelRef.value;
function pause() {
  cancelTodoistWorkspaceReads(); cancelTodoistDateReads(); cancelTodoistLabelReads();
  todoistInspectorController.cancelReads();
  stopInteractions(); window.removeEventListener("keydown", onKeydown);
}
const detachPause = onTodoistPause(pause);
function visibility() { pageVisible.value = !document.hidden; }
function onKeydown(event: KeyboardEvent) {
  // Esc 键在 Todoist 工作台中用于收起拓展栏或取消编辑，绝不退出工作台
  if (event.key === "Escape") {
    if (todoistInspectorState.isOpen) {
      event.preventDefault();
      event.stopPropagation();
      todoistInspectorController.close();
    }
  }
}
watch(active, visible => {
  todoistModuleState.active = visible;
  if (!visible) pause();
  else {
    window.addEventListener("keydown", onKeydown);
    if (!firstRequested) { firstRequested = true; void todoistTaskListController.loadWorkspace(); }
    nextTick(() => { if (active.value) bringToFront(); });
  }
}, { flush: "sync" });
watch(accountSettingsOpen, open => { if (open) accountSettingsMounted.value = true; });
watch([active, taskNavigationMounted, pendingTodoistTask], ([visible, mounted, request]) => {
  if (!visible || !mounted || !request) return;
  pendingTodoistTask.value = null;
  if (getDockModuleTransition("todoist") !== request.transition) return;
  if (todoistModuleState.pendingWrites || (todoistInspectorState.isOpen && todoistInspectorState.taskId !== request.id)) {
    notificationController.show({ appName: "Todoist", title: t("todoist.retainDetailTitle"), message: t("todoist.retainDetailMsg"), showActions: false });
    return;
  }
  if (todoistInspectorState.isOpen && todoistInspectorState.taskId === request.id) return;
  void todoistInspectorController.openTask(request.id);
}, { flush: "post" });
onMounted(() => {
  taskNavigationMounted.value = true;
  if (isFullscreen.value) nextTick(clearInlineStyles);
  windowManagerController.register({ id: "todoist", title: "Todoist", icon: "✅", getElement: getWindowElement });
  document.addEventListener("visibilitychange", visibility);
  if (active.value) {
    window.addEventListener("keydown", onKeydown);
    if (!firstRequested) { firstRequested = true; void todoistTaskListController.loadWorkspace(); }
    void todoistLabelController.refresh();
  }
});
onUnmounted(() => {
  pauseTodoistReads(); detachPause();
  document.removeEventListener("visibilitychange", visibility);
  windowManagerController.unregister("todoist", getWindowElement);
  todoistInspectorController.close();
  Object.assign(todoistInspectorState, { title: "", description: "", taskId: "", comments: [], availableLabels: [], labels: [], error: "" });
  todoistTaskListController.updateState({ loading: false, addingSection: false, activeComposerSectionId: null });
  todoistMainWorkspaceController.updateState({ title: t("todoist.inbox"), isSaving: false, isCalendarOpen: true, isLabelPopoverOpen: false });
  todoistLabelController.update([]);
});

function handleToggleCalendar() {
  todoistMainWorkspaceController.toggleCalendar();
}

function handleRefresh() {
  todoistMainWorkspaceController.refresh();
}

function handleAccountSaved() {
  todoistTaskListController.updateState({ accountConfigured: true });
  if (active.value) void todoistTaskListController.loadWorkspace(undefined, undefined, true);
}

function handleMinimize() {
  windowManagerController.minimize("todoist");
}
function handleClose() {
  todoistModuleState.visible = false;
  state.isOpen = false;
  void windowManagerController.close("todoist");
}
</script>

<template>
  <div class="vue-todoist-workspace-wrapper">
    <section
      id="todoist-workspace"
      ref="panelRef"
      class="card wide todoist-workspace"
      :style="initialStyle"
      :aria-label="t('todoist.workspaceAria')"
      v-show="todoistModuleState.visible"
    >
      <header ref="headerRef" class="todoist-workspace-head" @pointerdown="onHeaderPointerDown($event)">
        <div class="todoist-head-title-wrap">
          <span class="todoist-mark" aria-hidden="true">✓</span>
          <h2 id="todoist-workspace-title">{{ state.title }}</h2>
        </div>

        <nav id="todoist-view-tabs" class="todoist-view-tabs" :aria-label="t('todoist.viewAria')">
          <TodoistWorkspaceTabs />
        </nav>


        <button
          id="todoist-calendar-toggle-btn"
          class="todoist-shelf-tool todoist-calendar-toggle-btn"
          :class="{ on: state.isCalendarOpen }"
          type="button"
          :title="t('todoist.calendarToggleTitle')"
          @click="handleToggleCalendar"
        >
          📅 {{ t('todoist.calendar') }}
        </button>

        <span class="grow"></span>

        <span class="muted small" role="status">{{ todoistModuleState.pendingWrites ? t('todoist.pendingWrites') : t('todoist.idleStatus') }}</span>

        <button
          id="todoist-settings-open"
          ref="accountSettingsButton"
          type="button"
          class="no-drag"
          :title="t('todoist.settingsTitle')"
          :aria-expanded="accountSettingsOpen"
          @click.stop="accountSettingsOpen = !accountSettingsOpen"
        >
          ⚙️
        </button>
        <TodoistAccountSettings v-if="accountSettingsMounted" :visible="active && accountSettingsOpen" :anchor="accountSettingsButton" @close="accountSettingsOpen = false" @account-saved="handleAccountSaved" />


        <button
          id="todoist-workspace-refresh"
          type="button"
          :title="t('common.refresh')"
          @click="handleRefresh"
        >
          ↻
        </button>

        <button
          id="todoist-workspace-minimize"
          class="no-drag"
          type="button"
          :title="t('todoist.minimizeHint')"
          @pointerdown.stop
          @click.stop="handleMinimize"
        >
          −
        </button>

        <button
          id="todoist-workspace-close"
          class="no-drag"
          type="button"
          :title="t('todoist.closeHint')"
          @pointerdown.stop
          @click.stop="handleClose"
        >
          ✕
        </button>
      </header>

      <AccountSetupGuide
        v-if="todoistTaskListState.accountConfigured === false"
        icon="✅"
        :title="t('todoist.tokenMissingTitle')"
        :description="t('todoist.tokenMissingDesc')"
        secondary-url="https://app.todoist.com/app/settings/integrations/developer"
        :secondary-label="t('todoist.getToken')"
        @configure="accountSettingsOpen = true"
      />
      <div v-else class="todoist-workspace-main-wrap">
        <div v-show="state.isCalendarOpen" class="todoist-workspace-cal-area">
          <TodoistCalendarSidebar />
        </div>
        <div class="todoist-workspace-task-area">
          <TodoistTaskList />
        </div>
      </div>

      <!-- 独立无模态任务属性浮动窗口 (可在屏幕任意位置自由移动摆放，不再挤占看板) -->
      <TodoistInspectorDrawer />

      <div id="todoist-toast-container" class="todoist-toast-container" aria-live="polite"></div>

      <template v-if="!isFullscreen">
        <i class="todoist-resize-handle todoist-resize-n" data-resize-edge="n" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'n')"></i>
        <i class="todoist-resize-handle todoist-resize-e" data-resize-edge="e" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'e')"></i>
        <i class="todoist-resize-handle todoist-resize-s" data-resize-edge="s" aria-hidden="true" @pointerdown="onResizePointerDown($event, 's')"></i>
        <i class="todoist-resize-handle todoist-resize-w" data-resize-edge="w" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'w')"></i>
      </template>
    </section>
  </div>
</template>
