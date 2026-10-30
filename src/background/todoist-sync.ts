/**
 * Todoist 后台静默预热与定时同步服务
 * 
 * 作用：
 * 1. 周期性（每 15 分钟）静默拉取 Todoist 最新快照并写入 chrome.storage.local
 * 2. 在浏览器启动 (onStartup) 或扩展安装 (onInstalled) 时静默预取一次
 * 3. 使前端打开 Todoist 时永远能 0ms 呈现最新鲜的任务数据，彻底消除全屏转圈等待
 */

import { todoistService } from "../services/todoist.service";

declare const chrome: any;

const ALARM_NAME = "todoist-background-sync";

export async function syncTodoistInBackground(): Promise<void> {
  try {
    const token = await todoistService.initToken();
    if (!token) return;

    // 获取用户偏好的最后视图与活跃项目
    let targetView: "inbox" | "today" | "projects" = "inbox";
    let targetProjectId = todoistService.getActiveProjectId();

    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      const stored = await chrome.storage.local.get(["todoist_last_active_view", "todoistActiveProjectIdV1"]);
      if (stored.todoist_last_active_view === "projects" || stored.todoist_last_active_view === "today") {
        targetView = stored.todoist_last_active_view;
      }
      if (stored.todoistActiveProjectIdV1) {
        targetProjectId = String(stored.todoistActiveProjectIdV1);
      }
    }

    // 静默拉取最新快照并持久化到 storage.local
    await todoistService.fetchWorkspaceDataOnline(targetView, targetProjectId);
  } catch (err) {
    // 后台静默处理，绝不弹窗打扰用户
    console.debug("[TodoistBgSync] Background sync skipped:", err);
  }
}

export function initTodoistBackgroundSync(): void {
  if (typeof chrome === "undefined" || !chrome.alarms) return;

  // 注册定时闹钟（15 分钟周期）
  chrome.alarms.get(ALARM_NAME, (alarm: any) => {
    if (!alarm) {
      chrome.alarms.create(ALARM_NAME, { periodInMinutes: 15, delayInMinutes: 2 });
    }
  });

  chrome.alarms.onAlarm.addListener((alarm: any) => {
    if (alarm.name === ALARM_NAME) {
      void syncTodoistInBackground();
    }
  });
}
