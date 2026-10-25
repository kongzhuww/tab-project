<template>
  <component :is="embedded ? 'div' : InspectorPopover" :anchor="embedded ? undefined : anchorEl || null" @close="emit('close')">
      <div class="todoist-date-popover">
        <!-- 顶部快捷日期选项 -->
        <div v-if="!embedded" class="quick-dates-list">
          <button type="button" class="quick-date-item" @click="applyQuick('today')">
            <span class="q-icon">📅</span>
            <span class="q-label">今天</span>
            <span class="q-day">{{ getWeekDayName(0) }}</span>
          </button>
          <button type="button" class="quick-date-item" @click="applyQuick('tomorrow')">
            <span class="q-icon">☀️</span>
            <span class="q-label">明天</span>
            <span class="q-day">{{ getWeekDayName(1) }}</span>
          </button>
          <button type="button" class="quick-date-item" @click="applyQuick('weekend')">
            <span class="q-icon">🛋️</span>
            <span class="q-label">这个周末</span>
            <span class="q-day">{{ getNextWeekendDayName() }}</span>
          </button>
          <button type="button" class="quick-date-item" @click="applyQuick('clear')">
            <span class="q-icon">⊘</span>
            <span class="q-label">没有日期</span>
          </button>
        </div>

        <div v-if="!embedded" class="popover-divider"></div>

        <!-- 迷你月份日历 -->
        <div class="mini-calendar-section">
          <div class="cal-nav-row">
            <span class="cal-month-title">{{ viewYear }}年 {{ viewMonth + 1 }}月</span>
            <div class="cal-nav-btns">
              <button type="button" class="cal-arrow-btn" @click="prevMonth">‹</button>
              <button type="button" class="cal-arrow-btn" @click="goToday">○</button>
              <button type="button" class="cal-arrow-btn" @click="nextMonth">›</button>
            </div>
          </div>

          <div class="cal-weekdays-row">
            <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
          </div>

          <div class="cal-days-grid">
            <button
              v-for="cell in calendarCells"
              :key="cell.dateStr"
              type="button"
              class="cal-day-cell"
              :class="{
                'is-other-month': cell.isOtherMonth,
                'is-today': cell.isToday,
                'is-selected': cell.dateStr === modelValue
              }"
              @click="selectDate(cell.dateStr)"
            >
              {{ cell.dayNum }}
            </button>
          </div>
        </div>

        <div class="popover-divider"></div>

        <div class="cal-footer-section">
          <div class="time-picker-row">
            <label :for="timeInputId" class="time-icon">时间</label>
            <div class="time-input-wrap">
              <input :id="timeInputId" v-model="timeDraft" type="text" class="inline-time-input"
                placeholder="例如 11:45 PM" autocomplete="off" spellcheck="false"
                role="combobox" aria-autocomplete="list" aria-haspopup="listbox"
                :aria-expanded="showTimeOptions" :aria-controls="timeListId"
                :aria-activedescendant="showTimeOptions && activeTimeIndex >= 0 ? timeListId + '-' + activeTimeIndex : undefined"
                :aria-invalid="Boolean(timeError)" :aria-describedby="timeError ? timeInputId + '-error' : undefined"
                @focus="openTimeOptions" @click="!showTimeOptions && openTimeOptions()" @input="onTimeInput" @blur="finishTimeInput" @keydown="onTimeKeydown" />
              <div v-if="showTimeOptions" :id="timeListId" ref="timeListRef" class="time-suggestions" role="listbox" aria-label="每15分钟的推荐时间">
                <button v-for="(option, index) in visibleTimeOptions" :id="timeListId + '-' + index"
                  :key="option.value" type="button" class="time-option" role="option" tabindex="-1"
                  :aria-selected="index === activeTimeIndex"
                  @pointerdown.prevent @click="chooseTime(option.value)">{{ option.label }}</button>
                <small v-if="!visibleTimeOptions.length" class="time-input-hint">支持任意分钟，按 Enter 确认</small>
              </div>
            </div>
            <button v-if="timeValue || timeDraft" type="button" class="time-clear-btn" title="清除具体时间"
              @pointerdown.prevent @click="clearTime">×</button>
          </div>
          <small v-if="timeError" :id="timeInputId + '-error'" class="time-input-error" role="alert">{{ timeError }}</small>
        </div>
      </div>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, useId } from "vue";
import InspectorPopover from "./InspectorPopover.vue";

const props = defineProps<{
  modelValue: string; // YYYY-MM-DD
  timeValue?: string; // HH:mm
  anchorEl?: HTMLElement | null;
  embedded?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [val: string];
  'update:timeValue': [val: string];
  'change': [];
  'timeValidity': [valid: boolean];
  'close': [];
}>();

const now = props.modelValue ? new Date(props.modelValue + "T00:00:00") : new Date();
const viewYear = ref(now.getFullYear());
const viewMonth = ref(now.getMonth());
watch(() => props.modelValue, value => {
  const date = new Date(value + "T00:00:00");
  if (Number.isFinite(date.getTime())) { viewYear.value = date.getFullYear(); viewMonth.value = date.getMonth(); }
});

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value--;
  } else {
    viewMonth.value--;
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value++;
  } else {
    viewMonth.value++;
  }
}

function goToday() {
  const d = new Date();
  viewYear.value = d.getFullYear();
  viewMonth.value = d.getMonth();
}

function getWeekDayName(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const map = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return map[d.getDay()];
}

function getNextWeekendDayName(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function formatDateStr(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function applyQuick(type: "today" | "tomorrow" | "weekend" | "clear") {
  if (type === "clear") {
    emit("update:modelValue", "");
    emit("update:timeValue", "");
    emit("change");
    if (!props.embedded) emit("close");
    return;
  }
  const d = new Date();
  if (type === "tomorrow") {
    d.setDate(d.getDate() + 1);
  } else if (type === "weekend") {
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
  }
  const str = formatDateStr(d);
  emit("update:modelValue", str);
  emit("change");
  if (!props.embedded) emit("close");
}

function selectDate(dateStr: string) {
  emit("update:modelValue", dateStr);
  emit("change");
  if (!props.embedded) emit("close");
}

const timeInputId = useId();
const timeListId = timeInputId + "-options";
const timeDraft = ref(formatTimeLabel(props.timeValue || ""));
const timeError = ref("");
const showTimeOptions = ref(false);
const isTypingTime = ref(false);
const activeTimeIndex = ref(-1);
const timeListRef = ref<HTMLElement | null>(null);
const timeOptions = Array.from({ length: 96 }, (_, index) => {
  const value = `${String(Math.floor(index / 4)).padStart(2, "0")}:${String((index % 4) * 15).padStart(2, "0")}`;
  return { value, label: formatTimeLabel(value) };
});
const visibleTimeOptions = computed(() => {
  const query = timeDraft.value.trim().toUpperCase().replace(/\s/g, "");
  return !isTypingTime.value || !query ? timeOptions : timeOptions.filter(option =>
    option.label.replace(/\s/g, "").startsWith(query) || option.value.startsWith(query));
});
watch(() => props.timeValue, value => {
  timeDraft.value = formatTimeLabel(value || ""); timeError.value = "";
});
function formatTimeLabel(value: string): string {
  if (!value) return "";
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}
function parseTimeInput(value: string): string | null {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || 0), period = match[3]?.toUpperCase();
  if (minute > 59 || (period ? hour < 1 || hour > 12 : hour > 23)) return null;
  if (period) hour = hour % 12 + (period === "PM" ? 12 : 0);
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
function scrollTimeOption() {
  void nextTick(() => {
    const option = timeListRef.value?.querySelector<HTMLElement>('[aria-selected="true"]');
    const list = timeListRef.value;
    if (option && list) list.scrollTop = Math.max(0, option.offsetTop - list.clientHeight / 2 + option.offsetHeight / 2);
  });
}
function openTimeOptions() {
  showTimeOptions.value = true; isTypingTime.value = false;
  const current = props.timeValue || `${String(new Date().getHours()).padStart(2, "0")}:00`;
  activeTimeIndex.value = Math.max(0, timeOptions.findIndex(option => option.value >= current));
  scrollTimeOption();
}
function onTimeInput() {
  showTimeOptions.value = true; isTypingTime.value = true;
  activeTimeIndex.value = -1; timeError.value = "";
  emit("timeValidity", !timeDraft.value.trim() || parseTimeInput(timeDraft.value) !== null);
  if (timeListRef.value) timeListRef.value.scrollTop = 0;
}
function chooseTime(value: string) {
  showTimeOptions.value = false; timeError.value = ""; emit("timeValidity", true);
  timeDraft.value = formatTimeLabel(value);
  if (value !== (props.timeValue || "")) onTimeChange(value);
}
function clearTime() {
  showTimeOptions.value = false; timeError.value = ""; timeDraft.value = ""; emit("timeValidity", true);
  if (props.timeValue) { emit("update:timeValue", ""); emit("change"); }
}
function commitTimeInput(): boolean {
  if (!timeDraft.value.trim()) { clearTime(); return true; }
  const value = parseTimeInput(timeDraft.value);
  if (value === null) { emit("timeValidity", false); timeError.value = "请输入有效时间，如 11:45 PM、12:00 AM 或 23:45"; return false; }
  chooseTime(value); return true;
}
function finishTimeInput() { showTimeOptions.value = false; commitTimeInput(); }
function onTimeKeydown(event: KeyboardEvent) {
  if (event.isComposing) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault(); event.stopPropagation();
    if (!showTimeOptions.value) openTimeOptions();
    const length = visibleTimeOptions.value.length;
    if (length) activeTimeIndex.value = (activeTimeIndex.value + (event.key === "ArrowDown" ? 1 : -1) + length) % length;
    scrollTimeOption();
  } else if (event.key === "Enter") {
    event.preventDefault(); event.stopPropagation();
    const option = showTimeOptions.value ? visibleTimeOptions.value[activeTimeIndex.value] : undefined;
    if (option) chooseTime(option.value); else commitTimeInput();
  } else if (event.key === "Escape") {
    event.preventDefault(); event.stopPropagation();
    if (!showTimeOptions.value) { emit("close"); return; }
    showTimeOptions.value = false; timeError.value = ""; timeDraft.value = formatTimeLabel(props.timeValue || ""); emit("timeValidity", true);
  }
}
function onTimeChange(val: string) {
  emit("update:timeValue", val);
  if (!props.modelValue) {
    emit("update:modelValue", formatDateStr(new Date()));
  }
  emit("change");
}

const calendarCells = computed(() => {
  const y = viewYear.value;
  const m = viewMonth.value;
  const firstDay = new Date(y, m, 1);
  const startDayOfWeek = firstDay.getDay(); // 0 is Sunday
  const cursor = new Date(y, m, 1 - startDayOfWeek);
  const todayStr = formatDateStr(new Date());

  const cells = [];
  for (let i = 0; i < 42; i++) {
    const cur = new Date(cursor);
    cur.setDate(cursor.getDate() + i);
    const dateStr = formatDateStr(cur);
    cells.push({
      dateStr,
      dayNum: cur.getDate(),
      isOtherMonth: cur.getMonth() !== m,
      isToday: dateStr === todayStr
    });
  }
  return cells;
});
</script>

<style scoped>
.todoist-date-popover { display: flex; flex-direction: column; color: var(--text); }

.quick-dates-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.quick-date-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border: none;
  background: transparent;
  color: var(--text, inherit);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  text-align: left;
}

.quick-date-item:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.05));
}

.q-icon {
  font-size: 14px;
  margin-right: 8px;
}

.q-label {
  flex: 1;
}

.q-day {
  font-size: 12px;
  color: var(--muted, #94a3b8);
}

.popover-divider {
  height: 1px;
  background: var(--border, rgba(0, 0, 0, 0.08));
  margin: 6px 0;
}

.cal-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px;
}

.cal-month-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--heading, #1f2937);
}

.cal-nav-btns {
  display: flex;
  gap: 4px;
}

.cal-arrow-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.cal-arrow-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.06));
}

.cal-weekdays-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #94a3b8);
  margin: 4px 0;
}

.cal-days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.cal-day-cell {
  background: none;
  border: none;
  height: 26px;
  font-size: 12px;
  color: var(--text, inherit);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
}

.cal-day-cell:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.08));
}

.cal-day-cell.is-other-month {
  color: var(--muted, #94a3b8);
  opacity: 0.4;
}

.cal-day-cell.is-today {
  font-weight: 700;
  color: #d1453b;
}

.cal-day-cell.is-selected {
  background: #d1453b !important;
  color: #fff !important;
  font-weight: 700;
}

.cal-footer-section {
  padding: 4px 6px;
}

.time-picker-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.time-icon {
  font-size: 12px;
  color: var(--muted, #64748b);
  font-weight: 500;
}

.time-input-wrap { position: relative; flex: 1; min-width: 0; }
.inline-time-input { width: 100%; box-sizing: border-box; border: 1px solid var(--border); border-radius: 5px; padding: 5px 7px; font: inherit; background: var(--panel); color: var(--text); outline: none; }
.inline-time-input:focus { border-color: var(--accent); }
.time-suggestions { position: absolute; z-index: 1; bottom: calc(100% + 6px); left: 0; right: 0; max-height: 196px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; border: 1px solid var(--border); border-radius: 7px; background: var(--panel); box-shadow: 0 6px 18px #0002; padding: 4px; }
.time-option { display: block; width: 100%; box-sizing: border-box; padding: 8px; border: 0; border-radius: 4px; background: transparent; color: var(--text); font: inherit; text-align: left; cursor: pointer; white-space: nowrap; }
.time-option:hover, .time-option[aria-selected="true"] { background: var(--surface); color: var(--heading); }
.time-input-error, .time-input-hint { display: block; padding: 4px; color: var(--muted); font-size: 11px; }
.time-clear-btn {
  background: none;
  border: none;
  color: var(--muted, #94a3b8);
  font-size: 13px;
  cursor: pointer;
}
</style>
