declare const chrome: any;

import { biliMessagePanelController } from "../bilibili/message-panel-store";
import { notificationHistoryController } from "../notifications/history-store";
import { tabManagerController } from "../profile/tab-manager-store";
import { notificationController } from "../notifications/store";
import { topProfileState, profileMenuState, profileMenuController } from "../profile/store";

export const BILI_PROFILE_CACHE_KEY = "biliProfileCacheV1";
export const BILI_LOCAL_KNOWN_KEY = "biliLocallyKnownMessageIdsV1";
export const BILI_MESSAGE_USER_CACHE_KEY = "biliMessageUserCacheV1";
export const GITHUB_UPDATE_KNOWN_KEY = "githubKnownReleaseVersionsV1";
export const CUSTOM_NEWTAB_AVATAR_KEY = "customNewtabAvatar";
export const BILI_TOAST_KNOWN_KEY = "biliToastKnownCountsV1";

export interface GitHubUpdateItem {
  repository: string;
  version: string;
  known?: boolean;
  [key: string]: any;
}

export interface GitHubUpdateSnapshot {
  updates: GitHubUpdateItem[];
  unread: number;
  tracked: number;
  lastRun: string;
  loading: boolean;
}

export interface BiliProfileData {
  mid: number | string;
  uname: string;
  face: string;
}

export interface BiliUnreadCounts {
  reply?: number;
  at?: number;
  like?: number;
  system?: number;
  private?: number;
}

export class ProfileService {
  private customAvatar: string = "";
  private profile: BiliProfileData | null = null;
  private unread: BiliUnreadCounts = {};
  private locallyKnownIds: Record<string, string[]> = {};
  private userCache: Record<string, any> = {};
  private activeKind: string = "reply";
  private messageRequestId: number = 0;
  private isBiliRefreshing: boolean = false;
  private biliToastKnownCounts: BiliUnreadCounts | null = null;

  private githubUpdates: GitHubUpdateItem[] = [];
  private githubResults: any[] = [];
  private githubLastRun: string = "";
  private githubTracked: number = 0;
  private githubLoading: boolean = false;
  private githubKnownVersions: Record<string, string> = {};
  private githubListeners = new Set<(snapshot: GitHubUpdateSnapshot) => void>();

  private initialized: boolean = false;

  // ---------- GitHub Star Release Updates ----------
  public getGitHubSnapshot(): GitHubUpdateSnapshot {
    const unreadCount = this.githubUpdates.filter(
      (item) => item.repository && item.version && this.githubKnownVersions[item.repository] !== item.version
    ).length;

    return {
      updates: this.githubUpdates.map((item) => ({
        ...item,
        known: this.githubKnownVersions[item.repository] === item.version
      })),
      unread: unreadCount,
      tracked: this.githubTracked,
      lastRun: this.githubLastRun,
      loading: this.githubLoading
    };
  }

  private notifyGitHubListeners(): void {
    const snapshot = this.getGitHubSnapshot();
    for (const listener of this.githubListeners) {
      try {
        listener(snapshot);
      } catch {}
    }
  }

  public subscribeGitHubUpdates(listener: (snapshot: GitHubUpdateSnapshot) => void): () => void {
    this.githubListeners.add(listener);
    listener(this.getGitHubSnapshot());
    return () => this.githubListeners.delete(listener);
  }

  public async acknowledgeGitHubUpdate(item: GitHubUpdateItem): Promise<void> {
    if (!item?.repository || !item?.version) return;
    this.githubKnownVersions[item.repository] = item.version;
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      await chrome.storage.local.set({ [GITHUB_UPDATE_KNOWN_KEY]: this.githubKnownVersions });
    }
    this.notifyGitHubListeners();
  }

  public async loadGitHubUpdates(force = false): Promise<void> {
    if (this.githubLoading && !force) return;
    this.githubLoading = true;
    this.notifyGitHubListeners();
    try {
      this.githubUpdates = [];
      this.githubResults = [];
      this.githubLastRun = "";
      this.githubTracked = 0;
    } finally {
      this.githubLoading = false;
      this.notifyGitHubListeners();
    }
  }

  // ---------- B站用户资料与消息 ----------
  public getVisibleUnread(): BiliUnreadCounts {
    const visible: BiliUnreadCounts = {};
    let changed = false;
    const kinds: (keyof BiliUnreadCounts)[] = ["reply", "at", "like", "system", "private"];

    kinds.forEach((kind) => {
      const current = Math.max(0, Number(this.unread?.[kind] || 0));
      let knownIds = Array.isArray(this.locallyKnownIds?.[kind]) ? this.locallyKnownIds[kind] : [];
      if (current < knownIds.length) {
        knownIds = [];
        this.locallyKnownIds[kind] = [];
        changed = true;
      }
      visible[kind] = Math.max(0, current - knownIds.length);
    });

    if (changed && typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set({ [BILI_LOCAL_KNOWN_KEY]: this.locallyKnownIds }).catch(() => {});
    }
    return visible;
  }

  public markKnown(kind: string, id: string, talkerId?: string): void {
    if (!this.locallyKnownIds[kind]) this.locallyKnownIds[kind] = [];
    let updated = false;
    if (id && !this.locallyKnownIds[kind].includes(id)) {
      this.locallyKnownIds[kind].push(id);
      updated = true;
    }
    if (talkerId && !this.locallyKnownIds[kind].includes(talkerId)) {
      this.locallyKnownIds[kind].push(talkerId);
      updated = true;
    }
    if (updated && typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set({ [BILI_LOCAL_KNOWN_KEY]: this.locallyKnownIds }).catch(() => {});
    }
    this.applyBiliProfile(this.profile, this.unread);
  }

  public markAllKnown(kind: string, ids: string[] = []): void {
    if (!this.locallyKnownIds[kind]) this.locallyKnownIds[kind] = [];
    const set = new Set(this.locallyKnownIds[kind]);
    for (const id of ids) if (id) set.add(id);
    const current = Math.max(0, Number(this.unread?.[kind as keyof BiliUnreadCounts] || 0));
    if (set.size < current) {
      const diff = current - set.size;
      for (let i = 0; i < diff; i++) set.add(`__pad_${Date.now()}_${i}`);
    }
    this.locallyKnownIds[kind] = Array.from(set);
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set({ [BILI_LOCAL_KNOWN_KEY]: this.locallyKnownIds }).catch(() => {});
    }
    this.applyBiliProfile(this.profile, this.unread);
  }

  public applyBiliProfile(profile: BiliProfileData | null, unread: BiliUnreadCounts = {}): void {
    this.profile = profile || null;
    this.unread = unread || {};
    const fallback = "assets/bilibili.svg";
    const avatar = this.customAvatar || String(profile?.face || fallback).replace(/^http:/, "https:");

    const visibleUnread = this.getVisibleUnread();

    topProfileState.avatarUrl = avatar;
    topProfileState.userName = profile?.uname || "哔哩哔哩用户";
    topProfileState.buttonTitle = "通知中心";

    profileMenuState.avatarUrl = avatar;
    profileMenuState.userName = profile?.uname || "用户";
    profileMenuState.mid = profile?.mid;

    if (typeof document !== "undefined") {
      const topAvatar = document.getElementById("bili-profile-avatar") as HTMLImageElement | null;
      if (topAvatar) topAvatar.src = avatar;
      const topBtn = document.getElementById("bili-profile-button") as HTMLButtonElement | null;
      if (topBtn) topBtn.title = topProfileState.buttonTitle;
    }


    biliMessagePanelController.updateState({
      userName: profile?.uname || "哔哩哔哩用户",
      userMid: profile?.mid ? String(profile.mid) : "",
      userAvatar: avatar,
      unreadCounts: {
        reply: Number(visibleUnread.reply || 0),
        at: Number(visibleUnread.at || 0),
        like: Number(visibleUnread.like || 0),
        system: Number(visibleUnread.system || 0),
        private: Number(visibleUnread.private || 0)
      }
    });
  }

  public async refreshBiliProfile(): Promise<void> {
    if (this.isBiliRefreshing) return;
    this.isBiliRefreshing = true;
    try {
      const navRes = await fetch("https://api.bilibili.com/x/web-interface/nav", { credentials: "include" });
      const nav = await navRes.json();
      if (!nav?.data?.isLogin) throw new Error("未登录");

      const profile: BiliProfileData = {
        mid: nav.data.mid,
        uname: nav.data.uname,
        face: nav.data.face
      };

      const [legacyFeedRes, modernFeedRes, privateRes] = await Promise.allSettled([
        fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((r) => r.json()),
        fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((r) => r.json()),
        fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((r) => r.json())
      ]);

      const legacyFeed = legacyFeedRes.status === "fulfilled" ? legacyFeedRes.value?.data || {} : {};
      const modernFeed = modernFeedRes.status === "fulfilled" ? modernFeedRes.value?.data || {} : {};
      const privateData = privateRes.status === "fulfilled" ? privateRes.value?.data || {} : {};
      const modernAt = Number(modernFeed.at || 0);
      const modernReply =
        modernFeed.reply != null
          ? Number(modernFeed.reply || 0)
          : Math.max(0, Number(modernFeed.recv_reply || 0) - modernAt);

      const unread: BiliUnreadCounts = {
        reply: Math.max(Number(legacyFeed.reply || 0), modernReply),
        at: Math.max(Number(legacyFeed.at || 0), modernAt),
        like: Math.max(
          Number(legacyFeed.like || legacyFeed.praise || 0),
          Number(modernFeed.like || modernFeed.recv_like || 0)
        ),
        system: Math.max(Number(legacyFeed.sys_msg || legacyFeed.system || 0), Number(modernFeed.sys_msg || 0)),
        private: Number(
          legacyFeed.chat ||
            modernFeed.chat ||
            Number(privateData.follow_unread || 0) +
              Number(privateData.unfollow_unread || 0) +
              Number(privateData.dustbin_push_msg || 0)
        )
      };

      this.applyBiliProfile(profile, unread);
      if (typeof chrome !== "undefined" && chrome?.storage?.local) {
        await chrome.storage.local.set({ [BILI_PROFILE_CACHE_KEY]: { profile, unread, savedAt: Date.now() } });
      }
      this.checkAndNotifyBiliInteractions(unread);
    } catch {
      this.applyBiliProfile(null, {});
    } finally {
      this.isBiliRefreshing = false;
    }
  }

  private checkAndNotifyBiliInteractions(currentUnread: BiliUnreadCounts): void {
    if (!currentUnread || typeof currentUnread !== "object") return;
    const current = {
      like: Number(currentUnread.like || 0),
      private: Number(currentUnread.private || 0),
      reply: Number(currentUnread.reply || 0),
      at: Number(currentUnread.at || 0),
      system: Number(currentUnread.system || 0)
    };

    if (this.biliToastKnownCounts === null) {
      this.biliToastKnownCounts = { ...current };
      if (typeof chrome !== "undefined" && chrome?.storage?.local) {
        chrome.storage.local.set({ [BILI_TOAST_KNOWN_KEY]: this.biliToastKnownCounts }).catch(() => {});
      }
      return;
    }

    const diffPrivate = current.private - Number(this.biliToastKnownCounts.private || 0);
    const diffLike = current.like - Number(this.biliToastKnownCounts.like || 0);
    const diffReply = current.reply - Number(this.biliToastKnownCounts.reply || 0);
    const diffAt = current.at - Number(this.biliToastKnownCounts.at || 0);
    const diffSystem = current.system - Number(this.biliToastKnownCounts.system || 0);

    this.biliToastKnownCounts = { ...current };
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.set({ [BILI_TOAST_KNOWN_KEY]: this.biliToastKnownCounts }).catch(() => {});
    }

    if (diffPrivate > 0) {
      notificationController.show({
        appType: "bili",
        appName: "哔哩哔哩",
        icon: "assets/bilibili.svg",
        title: diffPrivate > 1 ? `收到 ${diffPrivate} 条新私信` : "收到新的私信",
        subtitle: "B站私信消息",
        message: "有人给你发送了私信，点击查看对话",
        actionLabel: "查看私信",
        showActions: true,
        onClick: () => {
          biliMessagePanelController.openPanel();
        }
      });
    }

    if (diffReply > 0) {
      notificationController.show({
        appType: "bili",
        appName: "哔哩哔哩",
        icon: "assets/bilibili.svg",
        title: diffReply > 1 ? `收到 ${diffReply} 条新回复` : "收到新的评论回复",
        subtitle: "评论回复通知",
        message: "有人在评论区回复了你",
        actionLabel: "查看回复",
        showActions: true,
        onClick: () => {
          biliMessagePanelController.openPanel();
        }
      });
    }

    if (diffAt > 0) {
      notificationController.show({
        appType: "bili",
        appName: "哔哩哔哩",
        icon: "assets/bilibili.svg",
        title: diffAt > 1 ? `收到 ${diffAt} 次新提及` : "有人 @了你",
        subtitle: "提到我的通知",
        message: "有人在动态或评论中 @了你",
        actionLabel: "查看提及",
        showActions: true,
        onClick: () => {
          biliMessagePanelController.openPanel();
        }
      });
    }
  }

  constructor() {
    this.init();
  }

  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    profileMenuController.setActions({
      onAction: async (action) => {
        if (action === "messages") {
          notificationHistoryController.open();
        } else if (action === "tabs") {
          tabManagerController.open();
        } else if (action === "refresh") {
          await this.refreshBiliProfile();
        } else if (action === "switch") {
          if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
            chrome.tabs.create({ url: "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", active: true });
          } else {
            window.open("https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", "_blank");
          }
        } else if (action === "web") {
          const mid = this.profile?.mid;
          const url = mid ? `https://space.bilibili.com/${mid}` : "https://www.bilibili.com/";
          if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
            chrome.tabs.create({ url, active: true });
          } else {
            window.open(url, "_blank");
          }
        }
      }
    });

    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      chrome.storage.local.get([
        BILI_PROFILE_CACHE_KEY,
        BILI_LOCAL_KNOWN_KEY,
        BILI_MESSAGE_USER_CACHE_KEY,
        GITHUB_UPDATE_KNOWN_KEY,
        CUSTOM_NEWTAB_AVATAR_KEY
      ]).then((stored: any) => {
        this.customAvatar = stored[CUSTOM_NEWTAB_AVATAR_KEY] || "";
        this.locallyKnownIds =
          stored[BILI_LOCAL_KNOWN_KEY] && typeof stored[BILI_LOCAL_KNOWN_KEY] === "object"
            ? stored[BILI_LOCAL_KNOWN_KEY]
            : {};
        this.userCache =
          stored[BILI_MESSAGE_USER_CACHE_KEY] && typeof stored[BILI_MESSAGE_USER_CACHE_KEY] === "object"
            ? stored[BILI_MESSAGE_USER_CACHE_KEY]
            : {};
        this.githubKnownVersions =
          stored[GITHUB_UPDATE_KNOWN_KEY] && typeof stored[GITHUB_UPDATE_KNOWN_KEY] === "object"
            ? stored[GITHUB_UPDATE_KNOWN_KEY]
            : {};

        const cached = stored[BILI_PROFILE_CACHE_KEY];
        if (cached?.profile) {
          this.applyBiliProfile(cached.profile, cached.unread || {});
        } else {
          this.applyBiliProfile(null, {});
        }
      }).catch(() => {});

      if (chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener((changes: any, area: string) => {
          if (area === "local") {
            if (changes[CUSTOM_NEWTAB_AVATAR_KEY]) {
              this.customAvatar = changes[CUSTOM_NEWTAB_AVATAR_KEY].newValue || "";
              this.applyBiliProfile(this.profile, this.unread);
            }
            if (changes[BILI_LOCAL_KNOWN_KEY]) {
              this.locallyKnownIds = changes[BILI_LOCAL_KNOWN_KEY].newValue || {};
              this.applyBiliProfile(this.profile, this.unread);
            }
          }
        });
      }
    }

    biliMessagePanelController.onAction((action, payload) => {
      if (action === "mark-known") {
        this.markKnown(payload.kind, payload.id, payload.talkerId);
      } else if (action === "mark-all-known") {
        this.markAllKnown(payload.kind, payload.ids);
      }
    });

    void this.refreshBiliProfile();
    setTimeout(() => {
      void this.loadGitHubUpdates();
    }, 3500);
  }
}

export const profileService = new ProfileService();
