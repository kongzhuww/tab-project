/**
 * LogicWeaver 资料库（Prompts / Articles）纯逻辑辅助函数：
 * 统一日期格式化、标签解析、文章摘要截断与本地 JSON 备份读取。
 */
import type { PromptCategory } from "./types";

export function formatBackpackShortDate(ts: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function formatBackpackFullDate(ts?: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseBackpackTagsInput(raw: string): string[] {
  return String(raw || "")
    .split(/[,，\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function excerptArticleContent(content: string, maxLength = 600): string {
  const clean = String(content || "").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength)}\n…`;
}

export function resolveCategoryName(categories: readonly PromptCategory[], categoryId?: string): string {
  return categories.find((cat) => cat.id === categoryId)?.name || "默认分组";
}

export function readTextBackupFile(event: Event, onLoaded: (text: string) => void): void {
  const input = event.target as HTMLInputElement | null;
  const file = input?.files?.[0];
  if (!file || typeof FileReader === "undefined") return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = typeof e.target?.result === "string" ? e.target.result : "";
    if (text) onLoaded(text);
    if (input) input.value = "";
  };
  reader.readAsText(file);
}
