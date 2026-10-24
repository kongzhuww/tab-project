<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import { calendarWorkspaceState as state, calendarWorkspaceController } from "./workspace-store";
import { calendarModuleState, onCalendarPause } from "./module-state";
import { calendarViewController } from "./store";
import { calendarService } from "../services/calendar.service";
import { todoistModuleState } from "../todoist/module-state";
import { useWindowDraggable } from "../core/useWindowDraggable";
import { windowManagerController } from "../core/window-manager.store";
import CalendarView from "./CalendarView.vue";

const pageVisible = ref(!document.hidden);
const active = computed(() => calendarModuleState.visible && pageVisible.value);
const pendingWrites = computed(() => todoistModuleState.pendingWrites);
const { panelRef, headerRef, initialStyle, onHeaderPointerDown, onResizePointerDown, stopInteractions } =
  useWindowDraggable({ windowId: "calendar", defaultWidth: 560, defaultHeight: 680,
    minWidth: 320, minHeight: 360, active: () => active.value });
const getWindowElement = () => panelRef.value;
let mounted = false, disposed = false, firstRequested = false, viewVersion = 0;
let read: AbortController | undefined;
let detachActions: (() => void) | undefined;
let detachView: (() => void) | undefined;

async function refresh(): Promise<boolean> {
  if (!mounted || !active.value || disposed) return false;
  read?.abort();
  const request = new AbortController(), version = ++viewVersion;
  read = request;
  const current = () => !disposed && active.value && version === viewVersion && !request.signal.aborted;
  try {
    await calendarService.init(); // Shared initialization must survive one consumer hiding.
    if (!current()) return false;
    return await calendarService.loadTodoistCalendar(true, request.signal);
  } catch {
    if (current()) calendarWorkspaceController.setStatusText("日历初始化未完成，请手动刷新。");
    return false;
  } finally {
    if (read === request) read = undefined;
  }
}
function pause() {
  ++viewVersion;
  const reading = Boolean(read);
  read?.abort(); read = undefined;
  stopInteractions();
  calendarService.highlightDrop("");
  if (reading && !pendingWrites.value) calendarWorkspaceController.setStatusText("读取已暂停，可点击刷新。");
}
const detachPause = onCalendarPause(pause);
function activate() {
  calendarModuleState.active = active.value;
  if (!active.value) { pause(); return; }
  calendarService.publishCalendarViews();
  if (!firstRequested) { firstRequested = true; void refresh(); }
}
function visibility() { pageVisible.value = !document.hidden; }
watch(active, () => { if (mounted) activate(); }, { flush: "sync" });

function handleOpenTodoist() { calendarWorkspaceController.openTodoist(); }
function handleRefresh() { void calendarWorkspaceController.refresh(); }
function handleClose() { calendarWorkspaceController.close(); }

onMounted(() => {
  mounted = true;
  windowManagerController.register({ id: "calendar", title: "日历模块", icon: "▦", getElement: getWindowElement });
  document.addEventListener("visibilitychange", visibility);
  detachActions = calendarWorkspaceController.attach({ refresh, goToday: () => calendarService.goToday() });
  detachView = calendarViewController.attachActions({
    selectDate: date => { if (active.value) calendarService.selectDate(date); },
    previousMonth: () => { if (active.value) calendarService.changeMonth(-1); },
    nextMonth: () => { if (active.value) calendarService.changeMonth(1); },
    goToday: () => { if (active.value) calendarService.goToday(); },
    closeDetail: () => { if (active.value) calendarService.closeDetail(); },
    highlightDrop: date => { if (active.value) calendarService.highlightDrop(date); },
    dropTask: async (id, date) => { if (active.value && !pendingWrites.value) await calendarService.assignTaskToDate(id, date); },
    openTask: (id, external) => { if (active.value) calendarService.openTask(id, external); }
  });
  calendarViewController.setMounted(true);
  activate();
});
onBeforeUnmount(() => {
  disposed = true; mounted = false;
  pause(); detachPause(); detachActions?.(); detachView?.();
  calendarModuleState.active = false;
  calendarViewController.setMounted(false);
  document.removeEventListener("visibilitychange", visibility);
  windowManagerController.unregister("calendar", getWindowElement);
  // Do not clear shared months, task cache, Google data, sidebar or Todoist timers.
});
</script>

<template>
  <div class="vue-calendar-workspace-wrapper">
    <section
      id="calendar-workspace"
      ref="panelRef"
      :style="initialStyle"
      :inert="!active"
      @pointerdown="windowManagerController.bringToFront('calendar')"
      class="calendar-workspace"
      aria-label="Todoist 日历"
      data-open-tool="calendar"
      :hidden="!state.isOpen"
    >
      <header ref="headerRef" class="calendar-workspace-head" @pointerdown="onHeaderPointerDown">
        <div>
          <span class="calendar-mark" aria-hidden="true">▦</span>
          <div>
            <h2>{{ state.title }}</h2>
            <small id="calendar-workspace-summary">{{ state.summary }}</small>
          </div>
        </div>
        <span class="grow"></span>
        <button
          id="calendar-todoist-open"
          type="button"
          title="打开 Todoist"
          @click="handleOpenTodoist"
        >
          ✓
        </button>
        <button
          id="calendar-workspace-refresh"
          type="button"
          title="刷新 Todoist 任务"
          :disabled="state.isLoading || pendingWrites > 0"
          @click="handleRefresh"
        >
          ↻
        </button>
        <button
          id="calendar-workspace-close"
          type="button"
          title="关闭日历"
          @click="handleClose"
        >
          ✕
        </button>
      </header>

      <div id="vue-calendar-root" class="calendar-body-wrap">
        <CalendarView />
      </div>

      <div
        id="calendar-status"
        class="calendar-status"
        aria-live="polite"
        v-if="state.statusText"
      >
        {{ state.statusText }}
      </div>
      <i v-for="edge in (['n', 'e', 's', 'w'] as const)" :key="edge" class="todoist-resize-handle" :class="`todoist-resize-${edge}`" aria-hidden="true" @pointerdown.stop="onResizePointerDown($event, edge)"></i>
    </section>
  </div>
</template>

<style scoped>
.calendar-workspace { right: auto; resize: none; transition: none; }
</style>
