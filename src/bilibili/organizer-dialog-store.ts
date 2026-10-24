import { reactive } from "vue";

export interface BiliCreateDialogState { open: boolean; kind: "bili" | "plugin"; name: string; privacy: 0 | 1; submitting: boolean; status: string; error: boolean; }
export interface BiliConfirmDialogState { open: boolean; title: string; message: string; confirmText: string; cancelText: string; danger: boolean; submitting: boolean; }
export interface BiliChannelPickerGroup { id: string; name: string; mids: string[]; }
export interface BiliChannelPickerItem { mid: string; name: string; face: string; added: boolean; }
export interface BiliChannelPickerState { open: boolean; loading: boolean; error: string; query: string; activeGroupId: string; groups: BiliChannelPickerGroup[]; items: BiliChannelPickerItem[]; submittingMid: string; }

export const biliOrganizerDialogState = reactive<{ create: BiliCreateDialogState; confirm: BiliConfirmDialogState; channelPicker: BiliChannelPickerState }>({
  create: { open: false, kind: "bili", name: "", privacy: 0, submitting: false, status: "", error: false },
  confirm: { open: false, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: true, submitting: false },
  channelPicker: { open: false, loading: false, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" }
});

let createSubmitter: ((payload: { name: string; privacy: 0 | 1 }) => Promise<void> | void) | null = null;
let confirmSubmitter: (() => Promise<void> | void) | null = null;
let channelPickerSubmitter: ((mid: string) => Promise<void> | void) | null = null;

export const biliOrganizerDialogController = {
  state: biliOrganizerDialogState,
  openCreate(kind: "bili" | "plugin", submitter: (payload: { name: string; privacy: 0 | 1 }) => Promise<void> | void) {
    createSubmitter = submitter;
    Object.assign(biliOrganizerDialogState.create, { open: true, kind, name: "", privacy: 0, submitting: false, status: "", error: false });
  },
  closeCreate() { if (!biliOrganizerDialogState.create.submitting) { biliOrganizerDialogState.create.open = false; createSubmitter = null; } },
  updateCreate(partial: Partial<BiliCreateDialogState>) { Object.assign(biliOrganizerDialogState.create, partial); },
  async submitCreate(payload: { name: string; privacy: 0 | 1 }) {
    if (!createSubmitter || biliOrganizerDialogState.create.submitting) return;
    biliOrganizerDialogState.create.submitting = true; biliOrganizerDialogState.create.error = false;
    try { await createSubmitter(payload); } finally { biliOrganizerDialogState.create.submitting = false; }
  },
  openConfirm(options: Partial<BiliConfirmDialogState>, submitter: () => Promise<void> | void) {
    confirmSubmitter = submitter;
    Object.assign(biliOrganizerDialogState.confirm, { open: true, title: "确认提示", message: "", confirmText: "确定", cancelText: "取消", danger: true, submitting: false }, options);
  },
  closeConfirm() { if (!biliOrganizerDialogState.confirm.submitting) { biliOrganizerDialogState.confirm.open = false; confirmSubmitter = null; } },
  async submitConfirm() {
    if (!confirmSubmitter || biliOrganizerDialogState.confirm.submitting) return;
    biliOrganizerDialogState.confirm.submitting = true;
    try { await confirmSubmitter(); biliOrganizerDialogState.confirm.open = false; } finally { biliOrganizerDialogState.confirm.submitting = false; confirmSubmitter = null; }
  },
  openChannelPicker(submitter: (mid: string) => Promise<void> | void) {
    channelPickerSubmitter = submitter;
    Object.assign(biliOrganizerDialogState.channelPicker, { open: true, loading: true, error: "", query: "", activeGroupId: "__all__", groups: [], items: [], submittingMid: "" });
  },
  updateChannelPicker(partial: Partial<BiliChannelPickerState>) { Object.assign(biliOrganizerDialogState.channelPicker, partial); },
  closeChannelPicker() {
    if (!biliOrganizerDialogState.channelPicker.submittingMid) {
      biliOrganizerDialogState.channelPicker.open = false;
      channelPickerSubmitter = null;
    }
  },
  async selectChannel(mid: string) {
    const state = biliOrganizerDialogState.channelPicker;
    if (!channelPickerSubmitter || state.submittingMid) return;
    state.submittingMid = mid;
    try {
      await channelPickerSubmitter(mid);
      state.open = false;
    } catch (error) {
      state.error = error instanceof Error ? error.message : "添加失败";
    } finally {
      state.submittingMid = "";
      if (!state.open) channelPickerSubmitter = null;
    }
  }
};
