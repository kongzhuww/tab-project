import { biliMiniPlayerState } from "../bilibili/mini-player-store";
import { homeMusicState } from "../music/store";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import type { UserActivity } from "./chat-state";

export function detectCurrentActivity(): UserActivity | undefined {
  // 1. 如果正在看 B站 视频
  if (biliMiniPlayerState.isOpen && biliMiniPlayerState.title) {
    return {
      type: "bilibili",
      title: biliMiniPlayerState.title,
      url: biliMiniPlayerState.bvid ? `https://www.bilibili.com/video/${biliMiniPlayerState.bvid}` : undefined,
      updatedAt: Date.now()
    };
  }

  // 2. 如果正在听歌 (网易云 / 塞壬)
  if (homeMusicState.playing && homeMusicState.title) {
    return {
      type: "music",
      title: `${homeMusicState.title} - ${homeMusicState.artist || "未知歌手"}`,
      updatedAt: Date.now()
    };
  }

  // 3. 根据当前激活的全屏卡片感知动态
  const activeCard = fullscreenCardState.activeId;
  if (activeCard === "card-github") {
    return { type: "github", title: "GitHub 热门开源仓库", updatedAt: Date.now() };
  }
  if (activeCard === "daily-bilibili") {
    return { type: "bilibili", title: "Bilibili 视频工作区", updatedAt: Date.now() };
  }
  if (activeCard === "daily-aihot") {
    return { type: "aihot", title: "AI HOT 热门前沿资讯", updatedAt: Date.now() };
  }
  if (activeCard === "daily-youtube") {
    return { type: "youtube", title: "YouTube 精选视频流", updatedAt: Date.now() };
  }
  if (activeCard === "daily-pricing") {
    return { type: "idle", title: "大模型 API 定价与算力比对", updatedAt: Date.now() };
  }
  if (activeCard === "todoist") {
    return { type: "idle", title: "Todoist 待办任务清单", updatedAt: Date.now() };
  }

  return undefined;
}
