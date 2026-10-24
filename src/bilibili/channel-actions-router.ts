/**
 * B站收藏夹与快捷频道动作事件路由总线。
 * 将 biliFavoritesController 的用户交互 action 派发至对应的服务执行器。
 */
import { biliFavoritesController } from "./bili-favorites-store";
import { biliTheaterController } from "./theater-store";
import { settingsController } from "../settings/store";
import { windowManagerController } from "../core/window-manager.store";
import type {
  BiliFeedState,
  BiliSubChannelInfo,
  BiliSubDocument,
  BiliSubState,
  BiliUpGroupsState
} from "./channel-types";

declare const chrome: any;

function notifyToast(text: string): void {
  const g = globalThis as any;
  if (typeof g.showBiliToast === "function") {
    g.showBiliToast(text);
  } else {
    console.log("[ChannelActionToast]", text);
  }
}

export interface ChannelActionsTarget {
  feedState: BiliFeedState;
  upGroupsState: BiliUpGroupsState;
  subChannels: Record<string, BiliSubChannelInfo>;
  subState: BiliSubState;
  recommendations: {
    refresh: () => Promise<void>;
    goToPage: (page: number) => Promise<void>;
  };
  openBiliUpGroupManagerDialog: (targetGroupId?: string, searchKeyword?: string, autoCreate?: boolean) => Promise<void>;
  openSubVideoView: () => Promise<void>;
  openCachedView: () => Promise<void>;
  openFollowingView: () => void;
  openRecommendationView: () => void;
  loadFollowing: (reset?: boolean, selection?: any) => Promise<void>;
  showUpRecentVideosPreview: (event: any, up: any) => void;
  loadSubVideo: (force?: boolean, selection?: any) => Promise<void>;
  publishSubscriptionSnapshot: () => void;
  addBiliSubChannel: () => Promise<void>;
  copyActiveSubscriptionScript: () => Promise<void>;
  getActiveSubscriptionDocument: () => BiliSubDocument | null;
}

export function bindChannelFavoritesActions(target: ChannelActionsTarget): void {
      biliFavoritesController.onAction((action: string, payload?: any) => {
      switch (action) {
        case "open-up-manager":
        case "manage-up-groups":
          void target.openBiliUpGroupManagerDialog();
          break;
        case "open-sub-video":
          void target.openSubVideoView();
          break;
        case "open-cache":
          void target.openCachedView();
          break;
        case "cache-open-settings":
          settingsController.open("storage", "bili-cache");
          windowManagerController.activate("settings");
          break;
        case "cache-play": {
          const item = biliFavoritesController.state.organizer.cachedVideos.find((v) => v.id === String(payload));
          if (item) void import("../bilibili/cache.service").then(({ openCachedBiliVideo }) => openCachedBiliVideo(item));
          break;
        }
        case "cache-open-web": {
          const item = biliFavoritesController.state.organizer.cachedVideos.find((v) => v.id === String(payload));
          if (item?.bvid) chrome?.tabs?.create?.({ url: `https://www.bilibili.com/video/${item.bvid}`, active: true });
          break;
        }
        case "cache-delete":
          notifyToast("删除缓存请先在缓存文件夹中手动处理");
          break;
        case "special-play-page":
          void import("../bilibili/organizer-actions").then(({ biliOrganizerActions }) => biliOrganizerActions.playSpecialPage());
          break;
        case "open-following":
          target.openFollowingView();
          break;
        case "open-recommendations":
          target.openRecommendationView();
          break;
        case "recommendations-refresh":
          void target.recommendations.refresh();
          break;
        case "recommendations-page":
          void target.recommendations.goToPage(Number(payload));
          break;
        case "following-refresh":
          void target.loadFollowing(true);
          break;
        case "following-group":
          void target.loadFollowing(false, { currentGroupId: String(payload || "__all__"), selectedUpMid: "", page: 1 });
          break;
        case "following-member":
          void target.loadFollowing(false, { selectedUpMid: String(payload || ""), page: 1 });
          break;
        case "following-page": {
          const page = Number(payload);
          if (target.feedState.loading || !Number.isInteger(page) || page < 1 || Math.abs(page - target.feedState.page) !== 1) break;
          if (page > target.feedState.page && (!target.feedState.hasMore || (target.feedState.currentGroupId === "__all__" && !target.feedState.nextOffset))) break;
          void target.loadFollowing(false, { page, pendingScroll: true });
          break;
        }
        case "following-manage-groups": {
          const activeGroupId = target.feedState.currentGroupId !== "__all__" ? target.feedState.currentGroupId : "";
          void target.openBiliUpGroupManagerDialog(activeGroupId, "", payload === "create");
          break;
        }
        case "following-preview-member": {
          const member = (target.upGroupsState.followingsCache || []).find((item) => String(item.mid) === String(payload?.id));
          if (member) {
            target.showUpRecentVideosPreview(
              { preventDefault() {}, stopPropagation() {}, clientX: payload?.clientX || 0, clientY: payload?.clientY || 0 },
              { mid: String(member.mid), name: member.name, face: member.face, sign: member.sign || "" }
            );
          }
          break;
        }
        case "subscription-channel": {
          const channelKey = String(payload || "");
          if (channelKey && target.subChannels[channelKey]) {
            void target.loadSubVideo(false, { channelKey });
          }
          break;
        }
        case "subscription-video": {
          const bvid = String(payload || "");
          if (bvid && bvid !== target.subState.activeDocBvid) {
            target.subState.activeDocBvid = bvid;
            const edition = (target.subState.editions || []).find((item) => (item.documents || []).some((doc) => doc.bvid === bvid));
            if (edition) target.subState.activeDate = edition.date;
            target.publishSubscriptionSnapshot();
          }
          break;
        }
        case "subscription-add-channel":
          void target.addBiliSubChannel();
          break;
        case "subscription-load-more": {
          if (target.subState.loading) break;
          const key = target.subState.channelKey || "shana";
          const visibleCount = Math.max(3, Number(target.subState.visibleCounts[key] || 3)) + 3;
          void target.loadSubVideo(true, { visibleCount });
          break;
        }
        case "subscription-copy-script":
          void target.copyActiveSubscriptionScript();
          break;
        case "subscription-refresh":
          void target.loadSubVideo(true);
          break;
        case "subscription-script-mode": {
          const nextMode = (localStorage.getItem("biliSubScriptMode") || "newspaper") === "newspaper" ? "lyrics" : "newspaper";
          localStorage.setItem("biliSubScriptMode", nextMode);
          target.publishSubscriptionSnapshot();
          break;
        }
        case "subscription-seek": {
          const from = Number(payload?.from);
          const doc = target.getActiveSubscriptionDocument();
          if (doc && Number.isFinite(from)) {
            const embeddedVideo = document.querySelector<HTMLMediaElement>(".bili-sub-native-video");
            if (embeddedVideo) {
              embeddedVideo.currentTime = Math.max(0, from - 0.1);
              embeddedVideo.play().catch(() => {});
            } else {
              biliTheaterController.openVideo({
                bvid: doc.bvid,
                aid: String(doc.aid || ""),
                title: doc.title || doc.bvid,
                cover: doc.cover
              });
              setTimeout(() => {
                const video = document.querySelector<HTMLMediaElement>("#bili-theater-video");
                if (video) {
                  video.currentTime = Math.max(0, from - 0.1);
                  video.play().catch(() => {});
                }
              }, 100);
            }
          }
          break;
        }
        case "subscription-copy-description": {
          const doc = target.getActiveSubscriptionDocument();
          if (doc?.desc || doc?.text) {
            navigator.clipboard.writeText(doc.desc || doc.text || "").then(() => {
              notifyToast("视频简介已复制");
            }).catch(() => {
              notifyToast("复制简介失败");
            });
          }
          break;
        }
        case "subscription-open-player": {
          const doc = target.getActiveSubscriptionDocument();
          if (doc) {
            biliTheaterController.openVideo({
              bvid: doc.bvid,
              aid: String(doc.aid || ""),
              title: doc.title || doc.bvid,
              cover: doc.cover
            });
          }
          break;
        }
        // special-play-video 已由 bili-favorites-store 的 dispatch 直接处理（打开迷你播放器），此处不再重复处理
        default:
          break;
      }
    });
}
