import { reactive, computed } from "vue";
import { bilibiliService } from "../services/bilibili.service";

declare const chrome: any;

export const BILI_LOCAL_KNOWN_KEY = "biliLocallyKnownMessageIdsV1";

export interface BiliMessageItem {
  id: string;
  title: string;
  content?: string;
  time?: string;
  avatar?: string;
  url?: string;
  isKnown: boolean;
  image?: string;
  talkerId?: string;
  sessionType?: number;
  ackSeqno?: number | string;
}

export type BiliMessageKind = "reply" | "at" | "like" | "system" | "private";

export interface BiliMessagePanelState {
  isOpen: boolean;
  loading: boolean;
  userAvatar: string;
  userName: string;
  userMid: string;
  activeKind: BiliMessageKind;
  unreadCounts: Record<BiliMessageKind, number>;
  items: BiliMessageItem[];
  emptyText: string;
}

export const biliMessagePanelState = reactive<BiliMessagePanelState>({
  isOpen: false,
  loading: false,
  userAvatar: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  userMid: "",
  activeKind: "reply",
  unreadCounts: {
    reply: 0,
    at: 0,
    like: 0,
    system: 0,
    private: 0
  },
  items: [],
  emptyText: ""
});

export const unreadTotal = computed(() => {
  const c = biliMessagePanelState.unreadCounts;
  return (c.reply || 0) + (c.at || 0) + (c.like || 0) + (c.system || 0) + (c.private || 0);
});

export type BiliMessageAction =
  | "switch-kind"
  | "mark-known"
  | "mark-all-known"
  | "open-item"
  | "refresh"
  | "open-web"
  | "close";

export type BiliMessageActionHandler = (action: BiliMessageAction, payload?: any) => void;

const actionHandlers = new Set<BiliMessageActionHandler>();

export async function getStoredKnownIds(): Promise<Record<string, string[]>> {
  if (typeof chrome !== "undefined" && chrome?.storage?.local) {
    try {
      const data = await chrome.storage.local.get([BILI_LOCAL_KNOWN_KEY]);
      const res = data?.[BILI_LOCAL_KNOWN_KEY];
      if (res && typeof res === "object") return res;
    } catch {}
  }
  return {};
}

async function saveLocallyKnownId(kind: BiliMessageKind, id: string, talkerId?: string): Promise<void> {
  if (typeof chrome === "undefined" || !chrome?.storage?.local) return;
  try {
    const map = await getStoredKnownIds();
    const list = Array.isArray(map[kind]) ? [...map[kind]] : [];
    if (id && !list.includes(id)) list.push(id);
    if (talkerId && !list.includes(talkerId)) list.push(talkerId);
    map[kind] = list;
    await chrome.storage.local.set({ [BILI_LOCAL_KNOWN_KEY]: map });
  } catch {}
}

async function saveAllLocallyKnown(kind: BiliMessageKind, ids: string[], talkerIds: string[] = []): Promise<void> {
  if (typeof chrome === "undefined" || !chrome?.storage?.local) return;
  try {
    const map = await getStoredKnownIds();
    const set = new Set<string>(Array.isArray(map[kind]) ? map[kind] : []);
    for (const id of ids) if (id) set.add(id);
    for (const tid of talkerIds) if (tid) set.add(tid);
    const currentCount = Number(biliMessagePanelState.unreadCounts[kind] || 0);
    if (set.size < currentCount) {
      const diff = currentCount - set.size;
      for (let i = 0; i < diff; i++) set.add(`__pad_${Date.now()}_${i}`);
    }
    map[kind] = Array.from(set);
    await chrome.storage.local.set({ [BILI_LOCAL_KNOWN_KEY]: map });
  } catch {}
}

export async function ackPrivateSession(
  talkerId: string | number,
  sessionType = 1,
  ackSeqno?: string | number
): Promise<boolean> {
  if (!talkerId) return false;
  try {
    const csrf = await bilibiliService.getBiliJct();
    if (!csrf) return false;
    const body = new URLSearchParams({
      talker_id: String(talkerId),
      session_type: String(sessionType || 1),
      csrf,
      csrf_token: csrf,
      build: "0",
      mobi_app: "web"
    });
    if (ackSeqno) {
      body.set("ack_seqno", String(ackSeqno));
    }
    const res = await fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/update_ack", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      credentials: "include",
      body
    });
    const json = await res.json();
    return json?.code === 0;
  } catch {
    return false;
  }
}

export async function loadBiliMessages(kind: BiliMessageKind): Promise<void> {
  biliMessagePanelState.activeKind = kind;
  biliMessagePanelState.loading = true;
  biliMessagePanelState.emptyText = "";

  try {
    const storedKnownMap = await getStoredKnownIds();
    const storedKnownSet = new Set<string>(Array.isArray(storedKnownMap[kind]) ? storedKnownMap[kind] : []);
    const isCategoryAllRead = Number(biliMessagePanelState.unreadCounts[kind] || 0) <= 0;
    let items: BiliMessageItem[] = [];

    if (kind === "reply") {
      const res = await fetch("https://api.bilibili.com/x/msgfeed/reply?platform=web&build=0&mobi_app=web", { credentials: "include" });
      const json = await res.json();
      const raw = Array.isArray(json?.data?.items) ? json.data.items : [];
      items = raw.map((it: any) => {
        const id = String(it.id || it.cursor || Math.random());
        return {
          id,
          title: it.user?.nickname || "回复了你",
          content: it.item?.source_content || it.item?.target_reply_content || it.item?.title || "",
          time: it.reply_time ? new Date(it.reply_time * 1000).toLocaleString() : "",
          avatar: it.user?.avatar || "assets/bilibili.svg",
          url: it.item?.uri || (it.item?.subject_id ? `https://www.bilibili.com/video/av${it.item.subject_id}` : "https://message.bilibili.com/"),
          isKnown: isCategoryAllRead || storedKnownSet.has(id)
        };
      });
    } else if (kind === "at") {
      const res = await fetch("https://api.bilibili.com/x/msgfeed/at?build=0&mobi_app=web", { credentials: "include" });
      const json = await res.json();
      const raw = Array.isArray(json?.data?.items) ? json.data.items : [];
      items = raw.map((it: any) => {
        const id = String(it.id || Math.random());
        return {
          id,
          title: it.user?.nickname ? `@${it.user.nickname}` : "@了我",
          content: it.item?.source_content || it.item?.title || "",
          time: it.at_time ? new Date(it.at_time * 1000).toLocaleString() : "",
          avatar: it.user?.avatar || "assets/bilibili.svg",
          url: it.item?.uri || "https://message.bilibili.com/",
          isKnown: isCategoryAllRead || storedKnownSet.has(id)
        };
      });
    } else if (kind === "like") {
      const res = await fetch("https://api.bilibili.com/x/msgfeed/like?platform=web&build=0&mobi_app=web", { credentials: "include" });
      const json = await res.json();
      const raw = Array.isArray(json?.data?.total?.items) ? json.data.total.items : (Array.isArray(json?.data?.items) ? json.data.items : []);
      items = raw.map((it: any) => {
        const u = Array.isArray(it.users) && it.users.length ? it.users[0] : null;
        const name = it.users?.map((x: any) => x.nickname).filter(Boolean).join("、") || "B站用户";
        const id = String(it.id || Math.random());
        return {
          id,
          title: `${name} 赞了你`,
          content: it.item?.title || it.item?.desc || it.item?.business || "点赞了你的评论或动态",
          time: it.like_time ? new Date(it.like_time * 1000).toLocaleString() : "",
          avatar: u?.avatar || "assets/bilibili.svg",
          url: it.item?.uri || "https://message.bilibili.com/",
          isKnown: isCategoryAllRead || storedKnownSet.has(id)
        };
      });
    } else if (kind === "system") {
      let raw: any[] = [];
      try {
        const res = await fetch("https://message.bilibili.com/api/notify/query.sysnotify.list.do?data_type=1&page_size=20", { credentials: "include" });
        const text = await res.text();
        if (text.trim().startsWith("{")) {
          const json = JSON.parse(text);
          raw = Array.isArray(json?.data) ? json.data : (Array.isArray(json?.data?.result) ? json.data.result : []);
        }
      } catch {}

      if (!raw.length) {
        try {
          const res = await fetch("https://api.vc.bilibili.com/sys_msg/v1/sys_msg/query_notify_list?page_size=20&build=0&mobi_app=web", { credentials: "include" });
          const text = await res.text();
          if (text.trim().startsWith("{")) {
            const json = JSON.parse(text);
            raw = Array.isArray(json?.data) ? json.data : (Array.isArray(json?.data?.result) ? json.data.result : []);
          }
        } catch {}
      }

      items = raw.map((it: any) => {
        const id = String(it.id || it.cursor || Math.random());
        return {
          id,
          title: it.title || "系统通知",
          content: String(it.content || it.text || it.msg || "").replace(/<[^>]+>/g, ""),
          time: it.time ? (typeof it.time === "number" ? new Date(it.time * 1000).toLocaleString() : String(it.time)) : "",
          avatar: "assets/bilibili.svg",
          url: it.url || it.link || "https://message.bilibili.com/",
          isKnown: isCategoryAllRead || storedKnownSet.has(id)
        };
      });
    } else if (kind === "private") {
      const res = await fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions?session_type=1&group_fold=1&unfollow_fold=0&sort_rule=2&build=0&mobi_app=web", { credentials: "include" });
      const json = await res.json();
      const raw = Array.isArray(json?.data?.session_list) ? json.data.session_list : [];

      // 提取所有 talker_id，批量查询用户卡片（昵称与头像）
      const uids = raw.map((it: any) => it.talker_id).filter(Boolean);
      const userMap = new Map<string, { name: string; avatar: string }>();

      if (uids.length > 0) {
        try {
          const cardsRes = await fetch(`https://api.vc.bilibili.com/account/v1/user/cards?uids=${uids.slice(0, 50).join(",")}`, { credentials: "include" });
          const cardsJson = await cardsRes.json();
          const cardList = Array.isArray(cardsJson?.data) ? cardsJson.data : [];
          for (const card of cardList) {
            const uidStr = String(card.mid || card.uid || "");
            if (uidStr) {
              userMap.set(uidStr, {
                name: card.name || card.uname || "",
                avatar: card.face || card.avatar || ""
              });
            }
          }
        } catch {}
      }

      items = raw.map((it: any) => {
        let text = "";
        let imageUrl: string | undefined = undefined;
        try {
          const contentStr = typeof it.last_msg?.content === "string" ? it.last_msg.content.trim() : "";
          if (contentStr.startsWith("{") && contentStr.endsWith("}")) {
            const parsed = JSON.parse(contentStr);
            if (parsed && typeof parsed === "object") {
              if (typeof parsed.url === "string" && parsed.url.trim()) {
                imageUrl = parsed.url.trim().replace(/^http:/, "https:");
                text = parsed.text || "[图片]";
              } else if (parsed.title) {
                const attach = parsed.attach_msg?.content ? ` · ${parsed.attach_msg.content}` : "";
                text = `[视频分享] ${parsed.title}${attach}`;
              } else if (parsed.content || parsed.text) {
                text = parsed.content || parsed.text;
              }
            }
          } else {
            text = contentStr;
          }
        } catch {
          text = String(it.last_msg?.content || "");
        }

        if (!imageUrl && text.startsWith("{") && text.includes('"url"')) {
          try {
            const recheck = JSON.parse(text);
            if (typeof recheck?.url === "string" && recheck.url.trim()) {
              imageUrl = recheck.url.trim().replace(/^http:/, "https:");
              text = recheck.text || "[图片]";
            }
          } catch {}
        }

        if (!text && !imageUrl) {
          text = "一条私信消息";
        }

        const talkerIdStr = String(it.talker_id || "");
        const uinfo = userMap.get(talkerIdStr);
        const displayName = uinfo?.name ? uinfo.name : `用户 ${talkerIdStr}`;
        const displayAvatar = uinfo?.avatar ? uinfo.avatar.replace(/^http:/, "https:") : "assets/bilibili.svg";
        const id = String(it.session_ts || it.talker_id || Math.random());
        const isServerUnread = Number(it.unread_count || 0) > 0;
        const isLocallyKnown = storedKnownSet.has(id) || (talkerIdStr && storedKnownSet.has(talkerIdStr));
        const isKnown = isCategoryAllRead || (!isServerUnread) || Boolean(isLocallyKnown);

        return {
          id,
          talkerId: talkerIdStr,
          sessionType: Number(it.session_type || 1),
          ackSeqno: it.last_msg?.msg_seqno || it.max_seqno || it.ack_seqno,
          title: displayName,
          content: text,
          image: imageUrl,
          time: it.session_ts ? new Date(Number(String(it.session_ts).slice(0, 13))).toLocaleString() : "",
          avatar: displayAvatar,
          url: `https://message.bilibili.com/#/whisper/mid${it.talker_id}`,
          isKnown
        };
      });
    }

    biliMessagePanelState.items = items;
    if (items.length === 0) {
      biliMessagePanelState.emptyText = "暂无相关互动消息";
    }
  } catch (err: any) {
    biliMessagePanelState.emptyText = `获取消息失败：${err?.message || "网络错误"}`;
  } finally {
    biliMessagePanelState.loading = false;
  }
}

export const biliMessagePanelController = {
  get state() {
    return biliMessagePanelState;
  },
  updateState(partial: Partial<BiliMessagePanelState>) {
    Object.assign(biliMessagePanelState, partial);
  },
  openPanel() {
    biliMessagePanelState.isOpen = true;
    if (biliMessagePanelState.items.length === 0 && !biliMessagePanelState.loading) {
      void loadBiliMessages(biliMessagePanelState.activeKind);
    }
  },
  closePanel() {
    biliMessagePanelState.isOpen = false;
    this.dispatch("close");
  },
  togglePanel(open?: boolean) {
    const next = open !== undefined ? open : !biliMessagePanelState.isOpen;
    biliMessagePanelState.isOpen = next;
    if (next) {
      if (biliMessagePanelState.items.length === 0 && !biliMessagePanelState.loading) {
        void loadBiliMessages(biliMessagePanelState.activeKind);
      }
    } else {
      this.dispatch("close");
    }
  },
  switchKind(kind: BiliMessageKind) {
    void loadBiliMessages(kind);
  },
  markAllKnown(kind: BiliMessageKind) {
    biliMessagePanelState.unreadCounts[kind] = 0;
    const unreadItems = biliMessagePanelState.items.filter((it) => !it.isKnown);
    biliMessagePanelState.items.forEach((it) => (it.isKnown = true));

    if (kind === "private") {
      const ackPromises = unreadItems
        .filter((it) => Boolean(it.talkerId))
        .map((it) => ackPrivateSession(it.talkerId!, it.sessionType || 1, it.ackSeqno));
      void Promise.allSettled(ackPromises);
    }

    const ids = unreadItems.map((it) => it.id).filter(Boolean);
    const talkerIds = unreadItems.map((it) => it.talkerId).filter(Boolean) as string[];
    void saveAllLocallyKnown(kind, ids, talkerIds);
    this.dispatch("mark-all-known", { kind, ids, talkerIds });
  },
  markKnown(kind: BiliMessageKind, id: string) {
    const it = biliMessagePanelState.items.find((i) => i.id === id);
    if (it && !it.isKnown) {
      it.isKnown = true;
      if (biliMessagePanelState.unreadCounts[kind] > 0) {
        biliMessagePanelState.unreadCounts[kind]--;
      }
      if (kind === "private" && it.talkerId) {
        void ackPrivateSession(it.talkerId, it.sessionType || 1, it.ackSeqno);
      }
      void saveLocallyKnownId(kind, id, it?.talkerId);
      this.dispatch("mark-known", { kind, id, talkerId: it?.talkerId });
    }
  },
  setLoading(loading: boolean) {
    biliMessagePanelState.loading = loading;
  },
  setItems(items: BiliMessageItem[]) {
    biliMessagePanelState.items = [...items];
  },
  onAction(handler: BiliMessageActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },
  dispatch(action: BiliMessageAction, payload?: any) {
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[BiliMessagePanel] Handler error for action ${action}:`, err);
      }
    }
  }
};
