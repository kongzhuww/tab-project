<template>
  <aside
    id="todoist-calendar-sidebar"
    class="todoist-calendar-sidebar"
    :class="{ collapsed: state.collapsed }"
    aria-label="Todoist 任务日历"
  >
    <div class="todoist-cal-head">
      <div class="todoist-cal-title-row">
        <span class="todoist-cal-logo">📅 <strong>任务日历</strong></span>
        <span id="todoist-cal-month-badge" class="todoist-cal-badge">{{ state.badgeText }}</span>
      </div>
      <div class="todoist-cal-head-actions">
        <button
          id="todoist-cal-today-btn"
          class="todoist-cal-today-btn"
          type="button"
          @click="onToday"
        >返回今天</button>
      </div>
    </div>

    <div class="todoist-cal-nav">
      <div class="todoist-cal-nav-group">
        <button
          id="todoist-cal-prev-month"
          type="button"
          class="cal-nav-btn"
          title="上个月"
          @click="onPrevMonth"
        >‹</button>
        <span id="todoist-cal-month-label" class="cal-nav-label">{{ state.monthLabel }}</span>
        <button
          id="todoist-cal-next-month"
          type="button"
          class="cal-nav-btn"
          title="下个月"
          @click="onNextMonth"
        >›</button>
      </div>
      <div class="todoist-cal-nav-group">
        <button
          id="todoist-cal-prev-year"
          type="button"
          class="cal-nav-btn"
          title="上一年"
          @click="onPrevYear"
        >‹</button>
        <span id="todoist-cal-year-label" class="cal-nav-label">{{ state.yearLabel }}</span>
        <button
          id="todoist-cal-next-year"
          type="button"
          class="cal-nav-btn"
          title="下一年"
          @click="onNextYear"
        >›</button>
      </div>
    </div>

    <div class="todoist-cal-weekdays">
      <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
    </div>

    <div id="todoist-cal-grid" class="todoist-cal-grid" role="grid">
      <button
        v-for="cell in state.cells"
        :key="cell.date"
        type="button"
        class="todoist-cal-cell"
        :class="{
          outside: cell.isOutside,
          today: cell.isToday,
          selected: cell.isSelected
        }"
        :data-date="cell.date"
        role="gridcell"
        :title="cell.title"
        @click="onSelectDate(cell.date)"
        @contextmenu.prevent="onContextMenu(cell.date, $event)"
        @dragover="onDragOver(cell.date, $event)"
        @dragleave="onDragLeave(cell.date)"
        @drop="onDrop(cell.date, $event)"
      >
        <span>{{ cell.dayNumber }}</span>
        <span v-if="cell.hasDot" class="todoist-cal-dot event" aria-hidden="true"></span>
      </button>
    </div>

    <div class="todoist-cal-agenda">
      <div class="todoist-cal-agenda-head">
        <strong class="todoist-cal-agenda-title">{{ state.agendaTitle }}</strong>
        <span id="todoist-cal-agenda-count" class="agenda-count">{{ state.todoItems.length }} 项</span>
      </div>
      <p v-if="state.writeError" class="todoist-cal-empty" role="alert">{{ state.writeError }}</p>
      <div v-if="state.emptyText" class="todoist-cal-empty" role="status">
        {{ state.emptyText }}
        <button type="button" class="todoist-cal-retry" :disabled="state.todoLoading || todoistModuleState.pendingWrites > 0"
          @click="todoistCalendarSidebarController.loadTodosForDate(state.selectedDate, true)">重试读取</button>
      </div>
      <div id="todoist-cal-todo-list" class="todoist-cal-agenda-list todoist-cal-todos">
        <div v-if="state.todoLoading && !state.todoItems.length" class="todoist-cal-empty">
          正在读取待办与完成历史…
        </div>
        <div v-else-if="state.todoItems.length === 0 && !state.emptyText" class="todoist-cal-empty">
          当天没有待办或完成任务 ☕
        </div>
        <template v-else>
          <div
            v-for="item in state.todoItems"
            :key="item.id"
            class="todoist-cal-todo-card"
            :class="{ completed: item.completed }"
            @click="onOpenTaskInspector(item)"
          >
            <div class="todoist-cal-todo-main">
              <button
                type="button"
                class="todoist-cal-check"
                :class="{ checked: item.completed }"
                :disabled="todoistModuleState.pendingWrites > 0"
                :title="item.completed ? '已完成 · 点击撤销(Reopen)' : '点击标记完成'"
                @click.stop="onToggleTodo(item)"
              >
                <span v-if="item.completed" class="check-icon">✓</span>
              </button>
              <span class="todoist-cal-todo-title" :class="{ strike: item.completed }">
                {{ item.content }}
              </span>
              <small v-if="item.time" class="todoist-cal-task-time">{{ item.time }}</small>
              <span v-if="item.completed" class="todoist-cal-completed-tag">已完成</span>
            </div>

            <!-- 🖼️ 若任务附带照片，在日历卡片下方直接展示小缩略图 -->
            <div
              v-if="item.thumbUrl"
              class="todoist-cal-thumb-box"
              title="点击在小窗查看原图"
              @click.stop="imageViewerController.open(item.thumbUrl, item.content)"
            >
              <img :src="item.thumbUrl" class="todoist-cal-thumb-img" alt="任务照片" loading="lazy" />
              <span class="todoist-cal-thumb-tag">🖼️ 照片</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { todoistModuleState } from "./module-state";
import { calendarService } from "../services/calendar.service";
import { imageViewerController } from "../viewers/image-viewer-store";
import {
  todoistCalendarSidebarState,
  todoistCalendarSidebarController,
  type CalendarTodoItem
} from "./calendar-sidebar-store";
import { todoistInspectorController } from "./inspector-store";

const state = todoistCalendarSidebarState;
onUnmounted(() => todoistCalendarSidebarController.cancelReads());

watch(() => [todoistModuleState.active, todoistModuleState.pendingWrites] as const, ([active, writes], previous) => {
  if (!active || writes) { todoistCalendarSidebarController.cancelReads(); return; }
  void todoistCalendarSidebarController.loadTodosForDate(state.selectedDate, Boolean(previous?.[1]));
}, { immediate: true, flush: "sync" });

function onToggleTodo(item: CalendarTodoItem) {
  void todoistCalendarSidebarController.toggleTodoItem(item);
}

function onOpenTaskInspector(item: CalendarTodoItem) {
  void todoistInspectorController.openTask(item.id, item);
}

onMounted(() => {
  calendarService.syncSidebarToVue();
});

function onToday() {
  todoistCalendarSidebarController.dispatch("today");
}

function onPrevMonth() {
  todoistCalendarSidebarController.dispatch("prev-month");
}

function onNextMonth() {
  todoistCalendarSidebarController.dispatch("next-month");
}

function onPrevYear() {
  todoistCalendarSidebarController.dispatch("prev-year");
}

function onNextYear() {
  todoistCalendarSidebarController.dispatch("next-year");
}

function onSelectDate(date: string) {
  todoistCalendarSidebarController.dispatch("select-date", date);
}

function onContextMenu(date: string, event: MouseEvent) {
  todoistCalendarSidebarController.dispatch("context-date", {
    date,
    clientX: event.clientX,
    clientY: event.clientY
  });
}

function onDragOver(date: string, event: DragEvent) {
  const types = Array.from(event.dataTransfer?.types || []);
  if (types.includes("application/x-todoist-task-id") || types.includes("text/plain")) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  }
}

function onDragLeave(date: string) {
  // no-op
}

function onDrop(date: string, event: DragEvent) {
  const taskId = event.dataTransfer?.getData("application/x-todoist-task-id") || event.dataTransfer?.getData("text/plain");
  if (taskId) {
    event.preventDefault();
    event.stopPropagation();
    todoistCalendarSidebarController.dispatch("drop-task", { taskId, date });
  }
}

</script>

<style scoped>
.todoist-cal-retry { border: 0; background: transparent; color: var(--accent); font: inherit; cursor: pointer; }
.todoist-cal-retry:disabled { opacity: .5; cursor: default; }
.todoist-cal-agenda-title { font-size: 12px; color: var(--heading); }
.todoist-cal-task-time { flex-shrink: 0; font-size: 10px; color: var(--muted); }

.todoist-cal-todos {
  gap: 4px;
}

.todoist-cal-todo-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.todoist-cal-todo-card:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.03));
  border-color: var(--border-strong, rgba(0, 0, 0, 0.15));
}

.todoist-cal-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--muted, #94a3b8);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.todoist-cal-check:hover {
  border-color: var(--accent, #db4035);
}

.todoist-cal-check.checked {
  background: #94a3b8;
  border-color: #94a3b8;
}

.check-icon {
  font-size: 10px;
  color: #fff;
  line-height: 1;
}

.todoist-cal-todo-title {
  flex: 1;
  font-size: 12px;
  color: var(--heading, #1e293b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 完成划灰杠效果 */
.todoist-cal-todo-title.strike {
  text-decoration: line-through;
  color: var(--muted, #94a3b8);
  opacity: 0.65;
}

.todoist-cal-todo-card.completed {
  opacity: 0.8;
  background: var(--panel-hover, rgba(0, 0, 0, 0.02));
}

.todoist-cal-completed-tag {
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 4px;
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;
  flex-shrink: 0;
}

.todoist-cal-head-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.todoist-cal-sync-btn,
.todoist-cal-import-btn {
  font-size: 11px;
  padding: 3px 6px;
}

.todoist-cal-sync-status {
  margin: 4px 8px 6px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: var(--heading, #1e293b);
  background: var(--surface, rgba(0, 0, 0, 0.05));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  text-align: center;
}
</style>
