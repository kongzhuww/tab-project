import { reactive } from "vue";
import { gitHubService } from "../services/github.service";

// One page-local draft survives filtering, hiding and the Star view unmounting.
export const remarkEditor = reactive({ repo: "", text: "", baseline: "", busy: false, message: "", storedValue: null as string | null });

export function beginRemark(repo: string, clear = false): void {
  if (!repo || remarkEditor.busy) return;
  if (remarkEditor.repo && remarkEditor.text !== remarkEditor.baseline) {
    remarkEditor.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const value = gitHubService.remarks[repo]?.userRemark;
  const baseline = typeof value === "string" ? value : "";
  Object.assign(remarkEditor, { repo, baseline, text: clear ? "" : baseline, storedValue: null,
    message: clear ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。" });
}

export function cancelRemark(): void {
  if (remarkEditor.busy) return;
  Object.assign(remarkEditor, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}

export async function saveRemark(): Promise<void> {
  if (remarkEditor.busy || !remarkEditor.repo) return;
  const { repo, text, baseline } = remarkEditor;
  remarkEditor.busy = true;
  try {
    await gitHubService.updateRepoRemark(repo, { userRemark: text.trim() }, baseline);
    Object.assign(remarkEditor, { repo: "", text: "", baseline: "", storedValue: null, message: `${repo} 的备注已保存并回读核对。` });
  } catch (error) {
    remarkEditor.message = error instanceof Error ? error.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally { remarkEditor.busy = false; }
}

export async function inspectSavedRemark(): Promise<void> {
  if (remarkEditor.busy || !remarkEditor.repo) return;
  const repo = remarkEditor.repo;
  remarkEditor.busy = true;
  try {
    const remarks = await gitHubService.reloadRepoRemarks();
    const value = remarks[repo]?.userRemark;
    if (value !== undefined && typeof value !== "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    remarkEditor.storedValue = value ?? "";
    remarkEditor.baseline = value ?? "";
    remarkEditor.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (error) {
    remarkEditor.message = error instanceof Error ? error.message : "读取失败，草稿保留。";
  } finally { remarkEditor.busy = false; }
}
