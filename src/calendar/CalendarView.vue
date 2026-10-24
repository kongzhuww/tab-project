<script setup lang="ts">
import type { CalendarTaskView } from "./store";
import { calendarViewController as controller, calendarViewState as state } from "./store";

const TASK_DRAG_TYPE = "application/x-logicweaver-todoist-task";

function hasTaskDrag(event: DragEvent): boolean {
  return Array.from(event.dataTransfer?.types || []).includes(TASK_DRAG_TYPE);
}

function onDragOver(event: DragEvent, date: string): void {
  if (!hasTaskDrag(event)) return;
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  controller.highlightDrop(date);
}

function onDragLeave(event: DragEvent, date: string): void {
  const current = event.currentTarget;
  if (current instanceof Node && event.relatedTarget instanceof Node && current.contains(event.relatedTarget)) return;
  if (state.dropDate === date) controller.highlightDrop("");
}

async function onDrop(event: DragEvent, date: string): Promise<void> {
  if (!hasTaskDrag(event)) return;
  event.preventDefault();
  const taskId = event.dataTransfer?.getData(TASK_DRAG_TYPE) || "";
  controller.highlightDrop("");
  if (taskId) await controller.dropTask(taskId, date);
}

function onTaskClick(event: MouseEvent, task: CalendarTaskView): void {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  controller.openTask(task.id, false);
}

function priorityClass(task: CalendarTaskView): string {
  return `p${Math.max(1, Math.min(4, 5 - Number(task.priority || 1)))}`;
}
</script>

<template>
  <div class="calendar-main-pane">
    <div class="calendar-toolbar">
      <button id="calendar-prev" type="button" title="上个月" @click="controller.previousMonth()">‹</button>
      <button id="calendar-today" type="button" @click="controller.goToday()">今天</button>
      <button id="calendar-next" type="button" title="下个月" @click="controller.nextMonth()">›</button>
      <strong id="calendar-month-title">{{ state.monthTitle }}</strong>
      <span class="grow"></span>
      <small>拖放任务可修改截止日</small>
    </div>
    <div class="calendar-weekdays" aria-hidden="true">
      <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
    </div>
    <div id="calendar-month-grid" class="calendar-month-grid" role="grid">
      <button
        v-for="cell in state.cells"
        :key="cell.date"
        class="calendar-day"
        :class="{
          outside: cell.outside,
          today: cell.today,
          selected: cell.selected,
          'calendar-drop-target': state.dropDate === cell.date
        }"
        type="button"
        role="gridcell"
        :data-date="cell.date"
        :title="cell.title"
        @click="controller.selectDate(cell.date)"
        @dragover="onDragOver($event, cell.date)"
        @dragleave="onDragLeave($event, cell.date)"
        @drop="onDrop($event, cell.date)"
      >
        <span>{{ cell.day }}</span>
        <b v-if="cell.taskCount" :title="`${cell.taskCount} 个任务`">{{ cell.taskCount }}</b>
        <span v-if="cell.hasDot" class="calendar-day-dot" aria-hidden="true"></span>
      </button>
    </div>
  </div>
  <section id="calendar-day-detail" class="calendar-day-detail" :hidden="!state.selectedDate">
    <header>
      <div><strong id="calendar-detail-date">{{ state.detailDate }}</strong><small id="calendar-detail-count">{{ state.detailCount }}</small></div>
      <button id="calendar-detail-close" type="button" title="收起详情" @click="controller.closeDetail()">×</button>
    </header>
    <div id="calendar-detail-list">
      <!-- 1. Google 日程 -->
      <div v-if="state.detailEvents && state.detailEvents.length > 0" class="calendar-detail-events-group">
        <div class="calendar-detail-section-title">📅 日程安排 ({{ state.detailEvents.length }})</div>
        <div
          v-for="ev in state.detailEvents"
          :key="ev.id"
          class="calendar-detail-event-card"
          :style="ev.color ? { borderLeftColor: ev.color } : undefined"
        >
          <span class="event-chip-time">{{ ev.time }}</span>
          <div class="event-chip-body">
            <strong>{{ ev.summary }}</strong>
            <small>{{ ev.subtitle }}</small>
          </div>
          <a
            v-if="ev.htmlLink"
            :href="ev.htmlLink"
            target="_blank"
            rel="noreferrer"
            class="event-external-link"
            title="在 Google 日历中打开"
          >🔗</a>
        </div>
      </div>

      <!-- 2. Todoist 截止任务 -->
      <div class="calendar-detail-section-title">✓ Todoist 任务 ({{ state.detailTasks.length }})</div>
      <p v-if="!state.detailTasks.length" class="calendar-detail-empty">这一天没有特殊的截止任务</p>
      <a
        v-for="task in state.detailTasks"
        :key="task.id"
        class="calendar-detail-task"
        :href="task.url || `https://app.todoist.com/app/task/${task.id}`"
        target="_blank"
        rel="noreferrer"
        title="点击在内置 Todoist 中打开任务（按住 Ctrl/Cmd 访问官方网页）"
        @click="onTaskClick($event, task)"
      >
        <i :class="priorityClass(task)"></i>
        <div>
          <strong>{{ task.content || '未命名任务' }}</strong>
          <p v-if="task.description">{{ task.description }}</p>
          <small>{{ task.labels.length ? `◇ ${task.labels.join(' · ')}` : 'Todoist 任务' }}</small>
        </div>
        <span>✓</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.calendar-day-dot {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent, #10b981);
}

.calendar-detail-section-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--muted, #64748b);
  padding: 6px 12px 2px;
  letter-spacing: 0.5px;
}

.calendar-detail-events-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.calendar-detail-event-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  margin: 0 12px;
  border-radius: 6px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-left: 3px solid var(--accent, #10b981);
}

.event-chip-time {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
  white-space: nowrap;
}

.event-chip-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.event-chip-body strong {
  font-size: 12px;
  color: var(--heading, #1e293b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-chip-body small {
  font-size: 11px;
  color: var(--muted, #64748b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-external-link {
  font-size: 12px;
  color: var(--muted, #64748b);
  text-decoration: none;
  padding: 2px 4px;
  border-radius: 4px;
}

.event-external-link:hover {
  color: var(--accent, #2563eb);
}
</style>
