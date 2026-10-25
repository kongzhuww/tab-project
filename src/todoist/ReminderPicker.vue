<template>
  <InspectorPopover :anchor="anchor" @close="emit('close')">
    <section class="reminder-picker" aria-label="设置本机提醒">
      <header><span class="reminder-symbol">♧</span><div><strong>添加提醒</strong><small>本机浏览器通知</small></div></header>
      <div class="reminder-shortcuts">
        <button type="button" @click="setQuick(10)">10分钟后</button>
        <button type="button" @click="setQuick(60)">1小时后</button>
        <button type="button" @click="setQuick('tomorrow')">明早9点</button>
      </div>
      <fieldset :disabled="saving"><legend class="sr-only">提醒日期和时间</legend>
        <TodoistDatePickerPopover v-model="date" v-model:time-value="time" embedded @time-validity="timeValid = $event" />
      </fieldset>
      <div class="reminder-preview">{{ preview || '选择提醒的日期和时间' }}</div>
      <p class="reminder-note">仅本机提醒，不同步至 Todoist。浏览器关闭、休眠或系统禁用通知可能导致延迟或无法显示。</p>
      <p v-if="error" class="reminder-error" role="alert">{{ error }}</p>
      <footer>
        <button v-if="value" type="button" class="remove" :disabled="saving || !!todoistModuleState.pendingWrites" @click="save('')">移除提醒</button>
        <button type="button" :disabled="saving" @click="emit('close')">取消</button>
        <button type="button" class="save" :disabled="saving || !!todoistModuleState.pendingWrites || !date || !time || !timeValid" @click="save(date + 'T' + time)">{{ saving ? '保存中…' : '设置提醒' }}</button>
      </footer>
    </section>
  </InspectorPopover>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import InspectorPopover from './InspectorPopover.vue';
import TodoistDatePickerPopover from './TodoistDatePickerPopover.vue';
import { todoistInspectorController, todoistInspectorState } from './inspector-store';
import { todoistModuleState } from './module-state';
const props = defineProps<{ anchor: HTMLElement | null; taskId: string; value: string; taskDate?: string; taskTime?: string }>();
const emit = defineEmits<{ close: [] }>();
const initial = props.value || (props.taskDate ? props.taskDate + 'T' + (props.taskTime || '09:00') : '');
const date = ref(initial.slice(0, 10)), time = ref(initial.slice(11, 16));
const saving = ref(false), error = ref(''), timeValid = ref(true);
const preview = computed(() => date.value && time.value ? new Date(date.value + 'T' + time.value).toLocaleString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true }) : '');
function setQuick(delay: number | 'tomorrow') {
  if (saving.value) return;
  const next = new Date();
  if (delay === 'tomorrow') { next.setDate(next.getDate() + 1); next.setHours(9, 0, 0, 0); }
  else next.setTime(next.getTime() + delay * 60000);
  date.value = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`;
  time.value = `${String(next.getHours()).padStart(2, '0')}:${String(next.getMinutes()).padStart(2, '0')}`;
  error.value = ''; timeValid.value = true;
}
async function save(value: string) {
  if (saving.value || todoistModuleState.pendingWrites) return;
  if (value && (!Number.isFinite(Date.parse(value)) || Date.parse(value) <= Date.now())) { error.value = '请选择未来的提醒时间。'; return; }
  if (todoistInspectorState.taskId !== props.taskId) return;
  saving.value = true; error.value = '';
  try {
    await todoistInspectorController.setReminder(value);
    if (todoistInspectorState.taskId !== props.taskId) return;
    if (todoistInspectorState.error) error.value = todoistInspectorState.error;
    else if (todoistInspectorState.reminderTime === value) emit('close');
  } finally { saving.value = false; }
}
</script>
<style scoped>
.reminder-picker { color: var(--text); }
header { display: flex; gap: 9px; align-items: center; padding: 4px 4px 10px; }
header strong { font-size: 13px; color: var(--heading); }
header small { display: block; font-size: 11px; color: var(--muted); }
.reminder-symbol { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: var(--surface); color: var(--accent); font-size: 20px; }
button { color: var(--text); font: inherit; cursor: pointer; }
button:disabled { cursor: default; opacity: .5; }
.reminder-shortcuts { display: flex; gap: 5px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }
.reminder-shortcuts button { flex: 1; padding: 5px 2px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); font-size: 11px; }
fieldset { min-width: 0; padding: 7px 0 0; margin: 0; border: 0; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.reminder-preview { margin: 8px 0; padding: 7px; border-radius: 6px; background: var(--surface); color: var(--heading); font-size: 12px; }
.reminder-note, .reminder-error { margin: 6px 2px; color: var(--muted); font-size: 11px; line-height: 1.5; }
footer { display: flex; justify-content: flex-end; gap: 6px; padding-top: 10px; margin-top: 8px; border-top: 1px solid var(--border); }
footer button { padding: 5px 9px; border: 1px solid var(--border); border-radius: 6px; background: transparent; font-size: 12px; }
footer .remove { margin-right: auto; color: var(--muted); }
footer .save { background: var(--surface); color: var(--accent); font-weight: 600; }
</style>
