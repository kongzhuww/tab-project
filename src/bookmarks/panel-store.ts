import { shallowReactive } from "vue";

export interface BookmarkItem {
  id: string;
  title: string;
  url?: string;
  folder?: string;
  icon?: string;
  isFolder?: boolean;
  parentId?: string;
  level?: number;
  expanded?: boolean;
}

export interface BookmarkPanelState {
  open: boolean;
  pinned: boolean;
  title: string;
  feedbackText: string;
  feedbackError: boolean;
  feedbackVisible: boolean;
  positionLeft: number | null;
  items: BookmarkItem[];
  searchQuery: string;
  emptyText: string;
}

export const bookmarkPanelState = shallowReactive<BookmarkPanelState>({
  open: false,
  pinned: false,
  title: "浏览器书签",
  feedbackText: "",
  feedbackError: false,
  feedbackVisible: false,
  positionLeft: null,
  items: [],
  searchQuery: "",
  emptyText: "书签栏为空"
});

export type BookmarkPanelAction = "toggle-pin" | "close";
export type BookmarkPanelActionHandler = (action: BookmarkPanelAction, payload?: any) => void;

const actionHandlers = new Set<BookmarkPanelActionHandler>();

let feedbackTimer: ReturnType<typeof setTimeout> | null = null;

export const bookmarkPanelController = {
  state: bookmarkPanelState,
  open(title?: string) {
    bookmarkPanelState.open = true;
    if (title) bookmarkPanelState.title = title;
  },
  close() {
    bookmarkPanelState.open = false;
  },
  toggle() {
    bookmarkPanelState.open = !bookmarkPanelState.open;
  },
  setPinned(pinned: boolean) {
    bookmarkPanelState.pinned = !!pinned;
  },
  setTitle(title: string) {
    bookmarkPanelState.title = title;
  },
  setPosition(left: number | null) {
    bookmarkPanelState.positionLeft = left;
  },
  showFeedback(message: string, error = false) {
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
      feedbackTimer = null;
    }
    bookmarkPanelState.feedbackText = message;
    bookmarkPanelState.feedbackError = error;
    bookmarkPanelState.feedbackVisible = true;
    feedbackTimer = setTimeout(() => {
      bookmarkPanelState.feedbackVisible = false;
      bookmarkPanelState.feedbackText = "";
      bookmarkPanelState.feedbackError = false;
    }, 2600);
  },
  hideFeedback() {
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
      feedbackTimer = null;
    }
    bookmarkPanelState.feedbackVisible = false;
    bookmarkPanelState.feedbackText = "";
    bookmarkPanelState.feedbackError = false;
  },
  setBookmarks(items: BookmarkItem[], emptyText?: string) {
    bookmarkPanelState.items = Array.isArray(items) ? [...items] : [];
    if (emptyText !== undefined) bookmarkPanelState.emptyText = emptyText;
  },
  setSearchQuery(query: string) {
    bookmarkPanelState.searchQuery = query;
  },
  openBookmark(item: BookmarkItem) {
    this.dispatch("open-bookmark" as any, item);
  },
  openContextMenu(item: BookmarkItem, clientX: number, clientY: number) {
    this.dispatch("context-menu" as any, { item, clientX, clientY });
  },
  updateState(partial: Partial<BookmarkPanelState>) {
    Object.assign(bookmarkPanelState, partial);
  },
  onAction(handler: BookmarkPanelActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },
  dispatch(action: BookmarkPanelAction, payload?: any) {
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[BookmarkPanel] Handler error for action ${action}:`, err);
      }
    }
  }
};
