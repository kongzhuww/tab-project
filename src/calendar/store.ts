import { reactive, readonly } from "vue";

export interface CalendarCellView {
  date: string;
  day: number;
  taskCount: number;
  outside: boolean;
  today: boolean;
  selected: boolean;
  title: string;
  hasDot?: boolean;
}

export interface CalendarEventView {
  id: string;
  time: string;
  summary: string;
  subtitle: string;
  color?: string;
  htmlLink?: string;
}

export interface CalendarTaskView {
  id: string;
  content: string;
  description: string;
  labels: readonly string[];
  priority: number;
  url: string;
}

export interface CalendarViewSnapshot {
  monthTitle: string;
  summary: string;
  selectedDate: string;
  detailDate: string;
  detailCount: string;
  cells: readonly CalendarCellView[];
  detailTasks: readonly CalendarTaskView[];
  detailEvents: readonly CalendarEventView[];
  dropDate: string;
}

export interface CalendarViewActions {
  selectDate?(date: string): void;
  previousMonth?(): void;
  nextMonth?(): void;
  goToday?(): void;
  closeDetail?(): void;
  dropTask?(taskId: string, date: string): void | Promise<void>;
  openTask?(taskId: string, openExternal: boolean): void;
  highlightDrop?(date: string): void;
}

export interface CalendarViewController {
  update(snapshot: Partial<CalendarViewSnapshot>): void;
  setActions(actions: CalendarViewActions): void;
  attachActions(actions: CalendarViewActions): () => void;
  setMounted(mounted: boolean): void;
  setDropDate(date: string): void;
  selectDate(date: string): void;
  previousMonth(): void;
  nextMonth(): void;
  goToday(): void;
  closeDetail(): void;
  dropTask(taskId: string, date: string): Promise<void>;
  openTask(taskId: string, openExternal?: boolean): void;
  highlightDrop(date: string): void;
  readonly snapshot: Readonly<CalendarViewSnapshot>;
  readonly active: boolean;
}

const state = reactive<CalendarViewSnapshot>({
  monthTitle: "",
  summary: "Todoist 截止日期",
  selectedDate: "",
  detailDate: "",
  detailCount: "",
  cells: [],
  detailTasks: [],
  detailEvents: [],
  dropDate: ""
});

let actions: CalendarViewActions = {};
let active = false;

function update(snapshot: Partial<CalendarViewSnapshot>): void {
  Object.assign(state, snapshot, {
    cells: snapshot.cells ? [...snapshot.cells] : state.cells,
    detailTasks: snapshot.detailTasks ? [...snapshot.detailTasks] : state.detailTasks,
    detailEvents: snapshot.detailEvents ? [...snapshot.detailEvents] : state.detailEvents
  });
}

function setActions(nextActions: CalendarViewActions): void {
  actions = Object.freeze({ ...nextActions });
}

function attachActions(nextActions: CalendarViewActions): () => void {
  const owned = Object.freeze({ ...nextActions });
  actions = owned;
  return () => { if (actions === owned) actions = {}; };
}

function setMounted(mounted: boolean): void {
  active = mounted;
}

function setDropDate(date: string): void {
  state.dropDate = String(date || "");
}

function selectDate(date: string): void {
  actions.selectDate?.(date);
}

function previousMonth(): void {
  actions.previousMonth?.();
}

function nextMonth(): void {
  actions.nextMonth?.();
}

function goToday(): void {
  actions.goToday?.();
}

function closeDetail(): void {
  actions.closeDetail?.();
}

async function dropTask(taskId: string, date: string): Promise<void> {
  await actions.dropTask?.(taskId, date);
}

function openTask(taskId: string, openExternal = false): void {
  actions.openTask?.(taskId, openExternal);
}

function highlightDrop(date: string): void {
  setDropDate(date);
  actions.highlightDrop?.(date);
}

export const calendarViewState = readonly(state);
export const calendarViewController: CalendarViewController = Object.freeze({
  update,
  setActions,
  attachActions,
  setMounted,
  setDropDate,
  selectDate,
  previousMonth,
  nextMonth,
  goToday,
  closeDetail,
  dropTask,
  openTask,
  highlightDrop,
  get snapshot() { return state; },
  get active() { return active; }
});
