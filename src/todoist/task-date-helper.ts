// Todoist 任务开始时间与区间时间管理辅助工具 (支持精确具体时间，如 12:00)

const START_DATE_STORAGE_KEY = "todoist_task_start_dates";

function getStorageMap(): Record<string, string> {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(START_DATE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStorageMap(map: Record<string, string>) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.setItem(START_DATE_STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

/**
 * 解析任意日期时间字符串为 { date: 'YYYY-MM-DD', time: 'HH:mm' }
 */
export function parseDateAndTime(raw?: string): { date: string; time: string } {
  if (!raw) return { date: "", time: "" };
  const str = String(raw).trim();
  // 支持 ISO 格式 2026-03-28T12:00:00Z，或空格分隔 2026-03-28 12:00
  const match = str.match(/^(\d{4}-\d{2}-\d{2})(?:[T\s](\d{2}:\d{2}))?/);
  if (match) {
    return {
      date: match[1] || "",
      time: match[2] || ""
    };
  }
  return { date: "", time: "" };
}

/**
 * 组装日期与时间字符串，如 2026-03-28 + 12:00 -> "2026-03-28 12:00"
 */
export function combineDateAndTime(date: string, time?: string): string {
  const d = String(date || "").trim();
  const t = String(time || "").trim();
  if (!d) return "";
  if (!t) return d;
  return `${d} ${t}`;
}

/**
 * 读取任务的开始时间（优先从本地存储读取，如无则从 description 提取，可包含具体时间）
 */
export function createTaskStartDateReader() {
  const snapshot = getStorageMap();
  return (taskId: string, description?: string) => getTaskStartDate(taskId, description, snapshot);
}

export function getTaskStartDate(taskId: string, description?: string, map = getStorageMap()): string {
  if (!taskId) return "";
  if (map[taskId]) return map[taskId];

  if (description) {
    // 兼容 <!--start:YYYY-MM-DD( HH:mm)?--> 或 [start::...]
    const match = description.match(/(?:<!--start:|\[start::)(\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2})?)(?:-->|\])/);
    if (match && match[1]) {
      return match[1].replace("T", " ");
    }
  }

  return "";
}

/**
 * 设置或清除任务的开始时间（包含可选时分）
 */
export function setTaskStartDate(taskId: string, startDateTime: string): void {
  if (!taskId) return;
  const map = getStorageMap();
  const clean = String(startDateTime || "").trim();
  if (clean && /^\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2})?$/.test(clean)) {
    map[taskId] = clean;
  } else {
    delete map[taskId];
  }
  saveStorageMap(map);
}

/**
 * 格式化精美显示：包含简短月日，若有时分则带上时分 (例如: 03-28 12:00 或 03-28)
 */
export function formatMonthDayTime(rawDate?: string, rawTime?: string): string {
  if (!rawDate && !rawTime) return "";
  const { date, time } = parseDateAndTime(rawDate);
  const effectiveTime = rawTime || time;
  if (!date) return effectiveTime ? `${effectiveTime}` : "";

  const shortDate = date.slice(5); // 03-28
  if (effectiveTime) {
    return `${shortDate} ${effectiveTime}`;
  }
  return shortDate;
}

export function formatMonthDay(dateStr?: string): string {
  return formatMonthDayTime(dateStr);
}
