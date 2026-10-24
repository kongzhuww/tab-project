import { reactive } from "vue";
import { bilibiliService } from "../services/bilibili.service";

export interface SubtitleModalState {
  isOpen: boolean;
  loading: boolean;
  error: string;
  title: string;
  bvid: string;
  cid?: string | number;
  fullText: string;
  charCount: number;
  copied: boolean;
}

export const subtitleModalState = reactive<SubtitleModalState>({
  isOpen: false,
  loading: false,
  error: "",
  title: "",
  bvid: "",
  cid: undefined,
  fullText: "",
  charCount: 0,
  copied: false
});

export const subtitleModalController = {
  get state() {
    return subtitleModalState;
  },
  async open(params: { bvid: string; cid?: string | number; title?: string }) {
    if (!params.bvid) return;
    subtitleModalState.isOpen = true;
    subtitleModalState.loading = true;
    subtitleModalState.error = "";
    subtitleModalState.fullText = "";
    subtitleModalState.title = params.title || params.bvid;
    subtitleModalState.bvid = params.bvid;
    subtitleModalState.cid = params.cid;
    subtitleModalState.copied = false;

    try {
      const res = await bilibiliService.fetchVideoSubtitleDetails(params.bvid, params.cid);
      if (!res.ok || !res.cues || !res.cues.length) {
        subtitleModalState.error = res.reason || "该视频暂无可用字幕轨道";
        return;
      }
      const lines = res.cues.map((c) => c.content.trim()).filter(Boolean);
      const full = lines.join("\n");
      subtitleModalState.fullText = full;
      subtitleModalState.charCount = full.length;
    } catch (err: any) {
      subtitleModalState.error = err?.message || "提取字幕失败，请检查网络";
    } finally {
      subtitleModalState.loading = false;
    }
  },
  close() {
    subtitleModalState.isOpen = false;
  },
  async copy() {
    if (!subtitleModalState.fullText) return;
    try {
      await navigator.clipboard.writeText(subtitleModalState.fullText);
      subtitleModalState.copied = true;
      setTimeout(() => {
        subtitleModalState.copied = false;
      }, 2000);
    } catch {}
  },
  downloadTxt() {
    if (!subtitleModalState.fullText) return;
    const blob = new Blob([subtitleModalState.fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(subtitleModalState.title || subtitleModalState.bvid).replace(/[\\/:*?"<>|]/g, "_")}_字幕.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
};
