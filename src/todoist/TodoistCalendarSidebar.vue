<template>
  <aside
    id="todoist-calendar-sidebar"
    class="todoist-calendar-sidebar"
    :class="{ collapsed: state.collapsed }"
    aria-label="DayLine 日历拓展"
  >
    <div class="todoist-cal-head">
      <div class="todoist-cal-title-row">
        <span class="todoist-cal-logo">📅 <strong>Google 日历</strong></span>
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
        <div class="todoist-cal-tab-switch">
          <button
            type="button"
            class="cal-tab-btn"
            :class="{ active: state.tabMode === 'agenda' }"
            @click="setTabMode('agenda')"
          >
            {{ state.agendaTitle.includes(' ') ? state.agendaTitle.split(' ')[0] + ' 日程' : state.agendaTitle }}
          </button>
          <button
            type="button"
            class="cal-tab-btn"
            :class="{ active: state.tabMode === 'todo' }"
            @click="setTabMode('todo')"
          >
            待办
          </button>
        </div>
        <span id="todoist-cal-agenda-count" class="agenda-count">
          {{ state.tabMode === 'agenda' ? state.agendaCount : `${state.todoItems.length} 项` }}
        </span>
      </div>

      <!-- 1. Google 日程列表 -->
      <div
        v-if="state.tabMode === 'agenda'"
        id="todoist-cal-agenda-list"
        class="todoist-cal-agenda-list"
      >
        <div v-if="state.agendaItems.length === 0" class="todoist-cal-empty">
          {{ state.emptyText }}
        </div>
        <template v-else>
          <template v-for="item in state.agendaItems" :key="item.id">
            <a
              v-if="item.htmlLink"
              :href="item.htmlLink"
              target="_blank"
              rel="noreferrer"
              class="todoist-cal-agenda-item todoist-cal-event-item google-calendar-agenda-item"
              :style="item.color ? { '--google-event-color': item.color } : undefined"
              title="点击打开 Google 日历；右键可修改、复制或删除"
              @contextmenu.prevent="onAgendaContextMenu(item, $event)"
            >
              <span class="agenda-event-time">{{ item.time }}</span>
              <span class="agenda-event-copy">
                <b :title="item.summary">{{ item.summary }}</b>
                <small>{{ item.subtitle }}</small>
              </span>
            </a>
            <div
              v-else
              class="todoist-cal-agenda-item todoist-cal-event-item google-calendar-agenda-item"
              :style="item.color ? { '--google-event-color': item.color } : undefined"
              title="Google 日历日程；右键可修改、复制或删除"
              @contextmenu.prevent="onAgendaContextMenu(item, $event)"
            >
              <span class="agenda-event-time">{{ item.time }}</span>
              <span class="agenda-event-copy">
                <b :title="item.summary">{{ item.summary }}</b>
                <small>{{ item.subtitle }}</small>
              </span>
            </div>
          </template>
        </template>
      </div>

      <!-- 2. 待办与历史完成任务列表 (灰杠保持+撤销) -->
      <div
        v-else
        id="todoist-cal-todo-list"
        class="todoist-cal-agenda-list todoist-cal-todos"
      >
        <div v-if="state.todoLoading" class="todoist-cal-empty">
          正在读取待办与完成历史…
        </div>
        <div v-else-if="state.todoItems.length === 0" class="todoist-cal-empty">
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
                :title="item.completed ? '已完成 · 点击撤销(Reopen)' : '点击标记完成'"
                @click.stop="onToggleTodo(item)"
              >
                <span v-if="item.completed" class="check-icon">✓</span>
              </button>
              <span class="todoist-cal-todo-title" :class="{ strike: item.completed }">
                {{ item.content }}
              </span>
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
import { onMounted } from "vue";
import { imageViewerController } from "../viewers/image-viewer-store";
import {
  todoistCalendarSidebarState,
  todoistCalendarSidebarController,
  type CalendarAgendaItem,
  type CalendarTodoItem,
  type CalendarTabMode
} from "./calendar-sidebar-store";
import { todoistInspectorController } from "./inspector-store";

const state = todoistCalendarSidebarState;

function setTabMode(mode: CalendarTabMode) {
  todoistCalendarSidebarController.setTabMode(mode);
}

function onToggleTodo(item: CalendarTodoItem) {
  void todoistCalendarSidebarController.toggleTodoItem(item);
}

function onOpenTaskInspector(item: CalendarTodoItem) {
  void todoistInspectorController.openTask(item.id, item);
}

onMounted(() => {
  todoistCalendarSidebarController.dispatch("init");
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

function onAgendaContextMenu(item: CalendarAgendaItem, event: MouseEvent) {
  todoistCalendarSidebarController.dispatch("context-agenda", {
    item,
    clientX: event.clientX,
    clientY: event.clientY
  });
}
</script>

<style scoped>
.todoist-cal-tab-switch {
  display: inline-flex;
  align-items: center;
  background: var(--panel-hover, rgba(0, 0, 0, 0.05));
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.cal-tab-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cal-tab-btn.active {
  background: var(--panel, #ffffff);
  color: var(--heading, #1e293b);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

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
