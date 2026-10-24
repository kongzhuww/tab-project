import { ref } from "vue";
import { launcherService, type LauncherDataState } from "../services/launcher.service";

export const isGuestPreviewActive = ref(false);

// 真实数据快照备份（内存中持有，随时无损恢复）
let realLauncherSnapshot: LauncherDataState | null = null;

export const guestPreviewController = {
  get isActive() {
    return isGuestPreviewActive.value;
  },

  /**
   * 进入新用户页面内空态预览沙箱（常用网站变为空无一物）
   */
  enter() {
    if (isGuestPreviewActive.value) return;

    // 1. 深度备份当前真实的常用网站状态
    const liveLauncher = launcherService.getState();
    realLauncherSnapshot = JSON.parse(JSON.stringify(liveLauncher));

    // 2. 内存清空为真实新用户刚安装时的状态（空列表）
    launcherService.updateState({
      links: [],
      groupSizes: {},
      folders: {},
      pages: ["常用网站"],
      pageLabels: {},
      activePage: "常用网站"
    });

    isGuestPreviewActive.value = true;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
        detail: { active: true }
      }));
    }
  },

  /**
   * 退出新用户预览沙箱，原样恢复用户的真实数据
   */
  exit() {
    if (!isGuestPreviewActive.value) return;

    // 1. 恢复常用网站真实状态
    if (realLauncherSnapshot) {
      launcherService.updateState(realLauncherSnapshot);
      realLauncherSnapshot = null;
    }

    isGuestPreviewActive.value = false;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
        detail: { active: false }
      }));
    }
  },

  toggle() {
    if (isGuestPreviewActive.value) {
      this.exit();
    } else {
      this.enter();
    }
  }
};
