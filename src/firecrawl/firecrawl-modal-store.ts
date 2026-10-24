import { reactive, readonly } from "vue";
import { firecrawlService } from "./firecrawl.service";
import { notificationController } from "../notifications/store";
import { toolModalsState } from "../core/tool-modals.store";

export interface FirecrawlModalState {
  isOpen: boolean;
  isLoading: boolean;
  url: string;
  title: string;
  markdown: string;
  description: string;
  charCount: number;
  copied: boolean;
  error: string | null;
}

const state = reactive<FirecrawlModalState>({
  isOpen: false,
  isLoading: false,
  url: "",
  title: "",
  markdown: "",
  description: "",
  charCount: 0,
  copied: false,
  error: null
});

export const firecrawlModalState = readonly(state);

export const firecrawlModalController = {
  state,

  open(initialUrl = "") {
    state.isOpen = true;
    toolModalsState.firecrawl = true;
    if (initialUrl.trim()) {
      void this.scrape(initialUrl);
    }
  },

  close() {
    state.isOpen = false;
    toolModalsState.firecrawl = false;
  },

  reset() {
    state.url = "";
    state.title = "";
    state.markdown = "";
    state.description = "";
    state.charCount = 0;
    state.copied = false;
    state.error = null;
    state.isLoading = false;
  },

  async scrape(targetUrl: string) {
    const cleanUrl = targetUrl.trim();
    if (!cleanUrl) return;

    state.isOpen = true;
    toolModalsState.firecrawl = true;
    state.isLoading = true;
    state.url = cleanUrl;
    state.title = cleanUrl.replace(/^https?:\/\//, "");
    state.markdown = "";
    state.description = "";
    state.charCount = 0;
    state.copied = false;
    state.error = null;

    try {
      const result = await firecrawlService.scrape(cleanUrl);
      state.isLoading = false;
      if (result.success) {
        state.title = result.title;
        state.markdown = result.markdown;
        state.description = result.description || "";
        state.charCount = result.charCount;
      } else {
        state.error = result.error || "提炼失败";
      }
    } catch (e: any) {
      state.isLoading = false;
      state.error = e?.message || "网络请求异常";
    }
  },

  async copy() {
    if (!state.markdown) return;
    try {
      await navigator.clipboard.writeText(state.markdown);
      state.copied = true;
      setTimeout(() => (state.copied = false), 2000);
      notificationController.fetch("Firecrawl", "已复制", "网页 Markdown 内容已成功复制到剪贴板");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = state.markdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      state.copied = true;
      setTimeout(() => (state.copied = false), 2000);
    }
  },

  openOriginal() {
    if (!state.url) return;
    if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
      chrome.tabs.create({ url: state.url, active: true });
    } else {
      window.open(state.url, "_blank");
    }
  }
};
