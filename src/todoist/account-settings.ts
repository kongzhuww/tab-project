import { todoistService, TODOIST_TOKEN_KEY } from "../services/todoist.service";
export async function loadTodoistAccountToken(): Promise<string> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    const data = await chrome.storage.local.get(TODOIST_TOKEN_KEY);
    return typeof data[TODOIST_TOKEN_KEY] === "string" ? data[TODOIST_TOKEN_KEY] : "";
  }
  return localStorage.getItem(TODOIST_TOKEN_KEY) || "";
}
export async function saveTodoistAccountToken(value: string): Promise<void> {
  const token = value.trim();
  if (!token) throw new Error("请输入 Token；此入口不执行解除账号绑定。");
  await todoistService.saveAccountToken(token);
}
