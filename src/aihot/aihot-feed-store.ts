import { shallowReactive } from "vue";

export interface AiHotLeaderboardItem {
  href: string;
  rank: string;
  model: string;
  provider: string;
  releaseDate: string;
  inputPrice: string;
  outputPrice: string;
  score: string;
}

export interface AiHotFeedArticle {
  id?: string | number;
  title: string;
  summary?: string;
  sourceName: string;
  published: string;
  category?: string;
  url: string;
  raw?: any;
}

export interface AiHotDailySection {
  label: string;
  items: AiHotFeedArticle[];
}

export interface AiHotDailyReport {
  date: string;
  leadTitle?: string;
  leadParagraph?: string;
  links?: { aihot?: string };
  sections: AiHotDailySection[];
}

export interface AiHotDailyArchive {
  date: string;
}

export type AiHotViewType = "leaderboard" | "feed" | "daily";

export interface AiHotFeedState {
  currentView: AiHotViewType;
  // 1. 大模型排行榜
  leaderboard: AiHotLeaderboardItem[];
  leaderboardSearch: string;
  leaderboardProvider: string;
  // 2. 精选资讯流
  feedArticles: AiHotFeedArticle[];
  feedCategory: string;
  feedWindow: "24h" | "7d";
  // 3. 官方日报
  dailyReport: AiHotDailyReport | null;
  dailyArchives: AiHotDailyArchive[];
  activeDailyDate: string;
  // 全局状态
  isLoading: boolean;
  errorMessage: string;
  statusMessage: string;
}

// Empty until this card is activated; do not present bundled samples as current news.
export const aihotFeedState = shallowReactive<AiHotFeedState>({
  currentView: "feed",
  leaderboard: [], leaderboardSearch: "", leaderboardProvider: "",
  feedArticles: [], feedCategory: "", feedWindow: "24h",
  dailyReport: null, dailyArchives: [], activeDailyDate: "",
  isLoading: false, errorMessage: "", statusMessage: ""
});

export type AiHotFeedAction =
  | "switch-view"
  | "refresh"
  | "select-article"
  | "change-category"
  | "change-window"
  | "search-leaderboard"
  | "select-provider"
  | "select-daily-date";

export type AiHotFeedActionHandler = (action: AiHotFeedAction, payload?: any) => void;

const actionHandlers = new Set<AiHotFeedActionHandler>();

export const aihotFeedController = {
  get state() {
    return aihotFeedState;
  },
  updateState(partial: Partial<AiHotFeedState>) {
    if ((partial.leaderboard || partial.feedArticles || partial.dailyReport) && partial.errorMessage === undefined) {
      partial.errorMessage = "";
    }
    Object.assign(aihotFeedState, partial);
  },
  switchView(view: AiHotViewType) {
    aihotFeedState.currentView = view;
    this.dispatch("switch-view", view);
  },
  refresh() {
    this.dispatch("refresh");
  },
  setLeaderboard(items: AiHotLeaderboardItem[]) {
    aihotFeedState.leaderboard = items;
  },
  setFeedArticles(items: AiHotFeedArticle[]) {
    aihotFeedState.feedArticles = items;
  },
  setDailyReport(report: AiHotDailyReport | null, archives: AiHotDailyArchive[] = []) {
    aihotFeedState.dailyReport = report;
    if (archives.length) {
      aihotFeedState.dailyArchives = archives;
    }
  },
  onAction(handler: AiHotFeedActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },
  dispatch(action: AiHotFeedAction, payload?: any) {
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[AihotFeed] Action error:`, err);
      }
    }
  }
};
