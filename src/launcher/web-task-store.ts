import { reactive } from "vue";

export interface WebSiteTaskTarget {
  id?: string;
  title: string;
  url: string;
  icon?: string;
  note?: string;
  category?: string; // 分组/分区名称，如 "常用网站"、"工作"、"书签"
  source?: "launcher" | "bookmark";
}

interface WebSiteTaskState {
  isOpen: boolean;
  target: WebSiteTaskTarget | null;
}

export const webSiteTaskState = reactive<WebSiteTaskState>({
  isOpen: false,
  target: null
});

export const webSiteTaskController = {
  open(target: WebSiteTaskTarget) {
    webSiteTaskState.target = { ...target };
    webSiteTaskState.isOpen = true;
  },

  close() {
    webSiteTaskState.isOpen = false;
  }
};
