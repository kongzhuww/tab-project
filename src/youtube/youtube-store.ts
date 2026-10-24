import { reactive } from "vue";

export interface YouTubeVideoItem {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
  videoUrl: string;
  views?: string;
  channelId?: string;
  duration?: string;
  group?: string;
  savedAt?: number;
}

export interface StoredYouTubePlaylist {
  id: string;
  title: string;
  channelTitle?: string;
  thumbnail?: string;
  videoCount?: number;
  customGroup?: string;
}

export interface YouTubeChannelItem {
  id: string;
  title: string;
  thumbnail?: string;
  subscriberCount?: string;
  videoCount?: string;
  handle?: string;
  group?: string;
}

export interface YouTubeFilterChip {
  id: string;
  label: string;
  query?: string;
}

export interface YouTubeState {
  currentView: "recommend" | "favorites";
  userName: string;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  favoritesBusy: boolean;
  favoritesLoading: boolean;
  favoritesNeedsReview: boolean;
  favoriteMessage: string;
  error?: string;
  exploreVideos: YouTubeVideoItem[];
  favorites: YouTubeVideoItem[];
  groups: string[];
  channels: YouTubeChannelItem[];
  videos: YouTubeVideoItem[];
  playlists: StoredYouTubePlaylist[];
  activePlaylistId: string;
  playlistVideos: YouTubeVideoItem[];
  searchResults: YouTubeVideoItem[];
  favGroups: string[];
  activeFavGroup: string;
}

export const youTubeState = reactive<YouTubeState>({
  currentView: "favorites",
  userName: "LogicWeaver 用户",
  currentPage: 1,
  pageSize: 18,
  isLoading: false,
  isLoadingMore: false,
  favoritesBusy: false, favoritesLoading: false, favoritesNeedsReview: false, favoriteMessage: "",
  error: "",
  exploreVideos: [],
  favorites: [],
  groups: [], channels: [], videos: [], playlists: [], activePlaylistId: "",
  playlistVideos: [], searchResults: [], favGroups: ["全部", "稍后观看"], activeFavGroup: "全部"
});

export type YouTubeAction =
  | "switch-view"
  | "refresh"
  | "save-favorite"
  | "remove-favorite"
  | "page-prev"
  | "page-next";

export type YouTubeActionHandler = (action: YouTubeAction, payload?: any) => void;

const actionHandlers = new Set<YouTubeActionHandler>();

export const youTubeController = {
  get state() {
    return youTubeState;
  },
  updateState(partial: Partial<YouTubeState>) {
    Object.assign(youTubeState, partial);
  },
  switchView(view: YouTubeState["currentView"]) {
    youTubeState.currentView = view;
    this.dispatch("switch-view", view);
  },
  onAction(handler: YouTubeActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },
  dispatch(action: YouTubeAction, payload?: any) {
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[YouTube] Action error:`, err);
      }
    }
  }
};
