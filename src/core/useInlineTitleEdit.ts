import { onBeforeUnmount, ref, shallowRef } from "vue";

export function useInlineTitleEdit<T>(options: {
  save: (target: T, draft: string) => Promise<string>;
  apply: (target: T, saved: string) => void;
  detachedError: (message: string) => void;
}) {
  const editing = ref(false), busy = ref(false), draft = ref(""), message = ref("");
  const failed = ref(false), revision = ref(0);
  const target = shallowRef<T | null>(null);
  let original = "", generation = 0;

  function reset() {
    ++generation; editing.value = false; message.value = ""; failed.value = false;
    target.value = null;
  }
  function start(value: T, title: string) {
    if (busy.value) return;
    reset(); target.value = value; original = title; draft.value = title; editing.value = true;
  }
  function cancel() { if (!busy.value) reset(); }
  async function commit() {
    if (!editing.value || busy.value || target.value === null) return;
    if (draft.value === original) { reset(); return; }
    const selected = target.value, session = generation, submitted = draft.value;
    busy.value = true; message.value = "保存中…"; failed.value = false;
    try {
      const saved = await options.save(selected, submitted);
      if (session !== generation) return;
      editing.value = false; message.value = "已保存";
      try { options.apply(selected, saved); }
      catch {
        // Persistence succeeded: a view error must never invite resubmission.
        message.value = "内容已保存，但界面更新失败，请刷新核对。";
        failed.value = true;
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : "保存失败，请保留草稿后核对。";
      if (session === generation) {
        failed.value = true; message.value = detail;
        ++revision.value; // Rearm the same input without dropping its draft or stealing focus.
      } else options.detachedError(detail);
    } finally { busy.value = false; }
  }
  onBeforeUnmount(reset);
  return { editing, busy, draft, message, failed, revision, start, cancel, commit, reset };
}
