import { reactive, readonly } from "vue";
import { notificationController } from "../notifications/store";

export interface ImagePreviewHandle {
  /** Close only this preview, not one subsequently opened by another application. */
  close(): void;
}

export interface ImageViewerState {
  isOpen: boolean;
  src: string;
  alt: string;
  zoom: number; // 0.2 ~ 4.0
  naturalWidth: number;
  naturalHeight: number;
}

const state = reactive<ImageViewerState>({
  isOpen: false,
  src: "",
  alt: "",
  zoom: 1.0,
  naturalWidth: 0,
  naturalHeight: 0
});

export const imageViewerState = readonly(state);

let ownedPreviewUrl = "";
let previewVersion = 0;
function releasePreviewUrl() {
  if (ownedPreviewUrl) URL.revokeObjectURL(ownedPreviewUrl);
  ownedPreviewUrl = "";
}
export const imageViewerController = {
  state,

  open(src: string | Blob, alt = "图片预览"): ImagePreviewHandle | null {
    if (!src) return null;
    // Prepare first: failure must leave the previous preview intact.
    const nextOwnedUrl = src instanceof Blob ? URL.createObjectURL(src) : "";
    const version = ++previewVersion;
    releasePreviewUrl();
    ownedPreviewUrl = nextOwnedUrl;
    state.src = typeof src === "string" ? src : ownedPreviewUrl;
    state.alt = alt || "图片预览";
    state.zoom = 1.0;
    state.naturalWidth = 0;
    state.naturalHeight = 0;
    state.isOpen = true;
    return Object.freeze({ close() {
      if (version === previewVersion) imageViewerController.close();
    } });
  },

  close() {
    ++previewVersion;
    state.isOpen = false;
    state.src = "";
    state.alt = "";
    state.naturalWidth = 0;
    state.naturalHeight = 0;
    releasePreviewUrl();
  },

  setDimensions(width: number, height: number) {
    state.naturalWidth = width;
    state.naturalHeight = height;
  },

  setZoom(zoom: number) {
    state.zoom = Math.max(0.2, Math.min(4.0, Number(zoom.toFixed(2))));
  },

  zoomIn() {
    this.setZoom(state.zoom + 0.2);
  },

  zoomOut() {
    this.setZoom(state.zoom - 0.2);
  },

  resetZoom() {
    state.zoom = 1.0;
  },

  async copyImage() {
    if (!state.isOpen || !state.src) return;
    const source = state.src, version = previewVersion;
    const current = () => state.isOpen && previewVersion === version;
    try {
      const resp = await fetch(source, { signal: AbortSignal.timeout(15000) });
      if (!resp.ok) throw new Error("Image read failed");
      const blob = await resp.blob();
      if (!current()) return;
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      if (!current()) return;
      notificationController.show({
        title: "已复制",
        message: "图片已成功复制到剪贴板",
        appType: "fetch", appName: "图片查看器", showActions: false
      });
    } catch {
      if (!current()) return;
      // Do not overwrite the clipboard with a different payload after an uncertain write.
      notificationController.show({
        title: "图片复制未确认",
        message: "图片格式或剪贴板权限不支持本次操作，未自动改为复制链接。",
        appType: "fetch", appName: "图片查看器", showActions: false
      });
    }
  },

  openOriginal() {
    if (!state.src) return;
    if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
      chrome.tabs.create({ url: state.src, active: true });
    } else {
      window.open(state.src, "_blank");
    }
  }
};
