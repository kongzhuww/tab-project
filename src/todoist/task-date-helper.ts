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

// -------------------------------------------------------------
// 自然语言日期关键词智能识别 (Local 0ms Browser Date Parser)
// -------------------------------------------------------------

export interface DateKeywordResult {
  /** 格式化日期：YYYY-MM-DD */
  date: string;
  /** 简短月日展示：MM-DD */
  formattedDate: string;
  /** 自然语言友好标签，如 "今天"、"明天"、"后天"、"下周五"、"11月15日" */
  label: string;
  /** 匹配到的原始文字，如 "明天 下午3点" */
  matchedText: string;
  /** 去除日期关键词后干净的任务名称 */
  cleanTitle: string;
  /** 可选提取出的时间：HH:mm (如 15:00) */
  time?: string;
}

function padDateZero(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatIsoDate(d: Date): string {
  return `${d.getFullYear()}-${padDateZero(d.getMonth() + 1)}-${padDateZero(d.getDate())}`;
}

/**
 * 自动识别文本中的日期关键词（如：今天、明天、后天、大后天、周五、下周一、11月15日、下午3点等）
 * 完全使用浏览器本地原生 Date（0ms 零网络延迟，严格遵循本机时区）
 */
export function parseDateKeyword(input: string, now: Date = new Date()): DateKeywordResult | null {
  if (!input || typeof input !== "string") return null;
  const rawText = input.trim();
  if (!rawText) return null;

  let text = rawText;
  let timeStr = "";
  let matchedTime = "";

  // 1. 尝试提取具体时间（如 下午3点, 18:30, 晚上8点半, 上午9点）
  const timeRegex = /(?:(上午|下午|晚上|中午|早晨|清晨|凌晨))?\s*(\d{1,2})(?:点|:|：)(\d{1,2}|半)?(?:分)?/;
  const timeMatch = text.match(timeRegex);
  if (timeMatch && (timeMatch[1] || timeMatch[0].includes("点") || timeMatch[0].includes(":") || timeMatch[0].includes("："))) {
    const period = timeMatch[1] || "";
    let hour = parseInt(timeMatch[2], 10);
    let min = 0;
    if (timeMatch[3] === "半") {
      min = 30;
    } else if (timeMatch[3]) {
      min = parseInt(timeMatch[3], 10);
    }
    if (period === "下午" || period === "晚上") {
      if (hour < 12) hour += 12;
    } else if (period === "中午") {
      if (hour < 11) hour += 12;
    } else if (period === "凌晨" && hour === 12) {
      hour = 0;
    }
    if (hour >= 0 && hour <= 23 && min >= 0 && min <= 59) {
      timeStr = `${padDateZero(hour)}:${padDateZero(min)}`;
      matchedTime = timeMatch[0];
    }
  }

  // 2. 相对日期：大后天、后天、明天、明日、次日、今天、今日、今晚、今早、昨天、昨日 (及对应英文)
  const relPatterns = [
    { regex: /(大后天)/i, offset: 3, label: "大后天" },
    { regex: /(后天)/i, offset: 2, label: "后天" },
    { regex: /(明天|明日|次日|明早|明晚|\btomorrow\b)/i, offset: 1, label: "明天" },
    { regex: /(今天|今日|今晚|今早|今夜|\btoday\b)/i, offset: 0, label: "今天" },
    { regex: /(昨天|昨日|\byesterday\b)/i, offset: -1, label: "昨天" }
  ];

  for (const p of relPatterns) {
    const match = text.match(p.regex);
    if (match) {
      const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + p.offset);
      const matchedWord = match[1];
      let clean = text.replace(matchedWord, " ");
      if (matchedTime) clean = clean.replace(matchedTime, " ");
      clean = clean.replace(/\s+/g, " ").trim() || rawText;
      return {
        date: formatIsoDate(targetDate),
        formattedDate: formatIsoDate(targetDate).slice(5),
        label: p.label,
        matchedText: (matchedWord + (matchedTime ? " " + matchedTime.trim() : "")).trim(),
        cleanTitle: clean,
        time: timeStr || undefined
      };
    }
  }

  // 3. 星期/周几
  // 支持：下周一~下周日、本周一~本周日、周一~周日、星期一~星期日、礼拜一~礼拜日、周末、下周末
  const weekRegex = /((下|本|这)?(?:个)?(?:周|星期|礼拜)([一二三四五六日天1-7]|末))/i;
  const weekMatch = text.match(weekRegex);
  if (weekMatch) {
    const matchedWord = weekMatch[1];
    const prefix = weekMatch[2] || "";
    const dayChar = weekMatch[3];
    const dayMap: Record<string, number> = {
      "一": 1, "1": 1,
      "二": 2, "2": 2,
      "三": 3, "3": 3,
      "四": 4, "4": 4,
      "五": 5, "5": 5,
      "六": 6, "6": 6,
      "末": 6,
      "日": 0, "天": 0, "7": 0
    };
    const targetDay = dayMap[dayChar];
    if (targetDay !== undefined) {
      const currentDay = now.getDay();
      let diff = targetDay - currentDay;
      if (prefix === "下") {
        diff = (diff <= 0 ? diff + 7 : diff) + 7;
      } else {
        if (diff <= 0) diff += 7;
      }
      const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diff);
      let clean = text.replace(matchedWord, " ");
      if (matchedTime) clean = clean.replace(matchedTime, " ");
      clean = clean.replace(/\s+/g, " ").trim() || rawText;
      const label = (prefix === "下" ? "下" : "") + "周" + (targetDay === 0 ? "日" : (dayChar === "末" ? "六" : dayChar));
      return {
        date: formatIsoDate(targetDate),
        formattedDate: formatIsoDate(targetDate).slice(5),
        label,
        matchedText: (matchedWord + (matchedTime ? " " + matchedTime.trim() : "")).trim(),
        cleanTitle: clean,
        time: timeStr || undefined
      };
    }
  }

  // 4. 具体日期：如 "11月15日"、"11月15号"、"2026-11-15"、"11/15"
  const monthDayRegex = /(?:(\d{4})[-/年])?(\d{1,2})[-/月](\d{1,2})[日号]?/;
  const mdMatch = text.match(monthDayRegex);
  if (mdMatch) {
    const matchedWord = mdMatch[0];
    const year = mdMatch[1] ? parseInt(mdMatch[1], 10) : now.getFullYear();
    const month = parseInt(mdMatch[2], 10);
    const day = parseInt(mdMatch[3], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const targetDate = new Date(year, month - 1, day);
      let clean = text.replace(matchedWord, " ");
      if (matchedTime) clean = clean.replace(matchedTime, " ");
      clean = clean.replace(/\s+/g, " ").trim() || rawText;
      return {
        date: formatIsoDate(targetDate),
        formattedDate: `${padDateZero(month)}-${padDateZero(day)}`,
        label: `${month}月${day}日`,
        matchedText: (matchedWord + (matchedTime ? " " + matchedTime.trim() : "")).trim(),
        cleanTitle: clean,
        time: timeStr || undefined
      };
    }
  }

  return null;
}
