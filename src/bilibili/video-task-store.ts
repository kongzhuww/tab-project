import { reactive } from "vue";

export interface BiliVideoTaskTarget {
  bvid?: string;
  aid?: string | number;
  title: string;
  cover?: string;
  author?: string;
  authorMid?: string | number;
  playCount?: string | number;
  duration?: string;
  url?: string;
}

interface BiliVideoTaskState {
  isOpen: boolean;
  video: BiliVideoTaskTarget | null;
}

export const biliVideoTaskState = reactive<BiliVideoTaskState>({
  isOpen: false,
  video: null
});

export const biliVideoTaskController = {
  open(video: BiliVideoTaskTarget) {
    biliVideoTaskState.video = {
      ...video,
      url: video.url || (video.bvid ? `https://www.bilibili.com/video/${video.bvid}` : "")
    };
    biliVideoTaskState.isOpen = true;
  },

  close() {
    biliVideoTaskState.isOpen = false;
  }
};
