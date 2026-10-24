import { reactive } from "vue";

export interface BiliUpPreviewVideo { bvid: string; title: string; cover: string; duration: string; playCount: string; published: string; url: string; }
export interface BiliUpPreviewState { open: boolean; loading: boolean; error: string; mid: string; name: string; face: string; sign: string; followed: boolean; submitting: boolean; left: number; top: number; videos: BiliUpPreviewVideo[]; }

export const biliUpPreviewState = reactive<BiliUpPreviewState>({ open: false, loading: false, error: "", mid: "", name: "", face: "", sign: "", followed: false, submitting: false, left: 12, top: 12, videos: [] });
let followHandler: ((follow: boolean) => Promise<boolean> | boolean) | null = null;

export const biliUpPreviewController = {
  state: biliUpPreviewState,
  open(partial: Partial<BiliUpPreviewState>, handler: (follow: boolean) => Promise<boolean> | boolean): void {
    followHandler = handler;
    Object.assign(biliUpPreviewState, { open: true, loading: true, error: "", submitting: false, videos: [] }, partial);
  },
  update(partial: Partial<BiliUpPreviewState>): void { Object.assign(biliUpPreviewState, partial); },
  close(): void { if (!biliUpPreviewState.submitting) { biliUpPreviewState.open = false; followHandler = null; } },
  async toggleFollow(): Promise<void> {
    if (!followHandler || biliUpPreviewState.submitting) return;
    biliUpPreviewState.submitting = true;
    try {
      const next = !biliUpPreviewState.followed;
      if (await followHandler(next)) biliUpPreviewState.followed = next;
    } finally { biliUpPreviewState.submitting = false; }
  }
};
