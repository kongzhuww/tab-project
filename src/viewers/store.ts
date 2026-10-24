import { reactive, readonly, type DeepReadonly } from "vue";

export interface AihotArticleItem {
  id?: string | number;
  title?: string;
  headline?: string;
  name?: string;
  summary?: string;
  description?: string;
  excerpt?: string;
  digest?: string;
  abstract?: string;
  reason?: string;
  sourceName?: string;
  source?: { name?: string };
  published?: string;
  publishedAt?: string;
  time?: string;
  date?: string;
  score?: string | number;
  url?: string;
  sourceUrl?: string;
  source_url?: string;
  originalUrl?: string;
  link?: string;
  readUrl?: string;
  content?: string;
  isAiHot?: boolean;
  platformBadge?: string;
}

export interface AihotViewerState {
  open: boolean;
  item: AihotArticleItem | null;
  title: string;
  sourceName: string;
  published: string;
  score: string;
  summary: string;
  reason: string;
  url: string;
  content: string;
  loading: boolean;
  copied: boolean;
  importing: boolean;
  imported: boolean;
  isAiHot: boolean;
  platformBadge: string;
}

export interface AihotViewerActions {
  onClose?: () => void;
  onCopy?: () => Promise<boolean> | boolean;
  onOpenOriginal?: () => void;
}

export interface AihotViewerController {
  getSnapshot(): DeepReadonly<AihotViewerState>;
  update(partial: Partial<AihotViewerState>): void;
  openArticle(item: AihotArticleItem, content?: string): void;
  close(): void;
  setContent(content: string): void;
  setImportState(importing: boolean, imported: boolean): void;
  setActions(actions: Partial<AihotViewerActions>): void;
}

const initialAihotState = (): AihotViewerState => ({
  open: false,
  item: null,
  title: "",
  sourceName: "AI HOT",
  published: "",
  score: "",
  summary: "",
  reason: "",
  url: "#",
  content: "",
  loading: false,
  copied: false,
  importing: false,
  imported: false,
  isAiHot: true,
  platformBadge: "AI HOT"
});

export const aihotViewerState = reactive<AihotViewerState>(initialAihotState());
let aihotBoundActions: AihotViewerActions = {};

export const aihotViewerController: AihotViewerController = {
  getSnapshot() {
    return readonly(aihotViewerState);
  },
  update(partial) {
    Object.assign(aihotViewerState, partial);
  },
  openArticle(item, content = "") {
    const title = item.title || item.headline || item.name || "无标题";
    const sum = item.summary || item.description || item.excerpt || item.digest || item.abstract || "";
    const sourceName = item.source?.name || item.sourceName || "AI HOT";
    const published = item.published || item.publishedAt || item.time || item.date || "";
    const score = item.score ? String(item.score) : "";
    const url = item.sourceUrl || item.source_url || item.originalUrl || item.url || item.link || "#";

    const hasInitialContent = Boolean(content && content.trim());
    const isAiHot = item.isAiHot !== false && !hasInitialContent;
    const platformBadge = item.platformBadge || (isAiHot ? "AI HOT" : "资讯");

    Object.assign(aihotViewerState, {
      open: true,
      item,
      title,
      sourceName,
      published,
      score,
      summary: sum,
      reason: item.reason || "",
      url,
      content: content || "",
      loading: !hasInitialContent,
      copied: false,
      importing: false,
      imported: false,
      isAiHot,
      platformBadge
    });

    if (!hasInitialContent) {
      const targetId = item.id;
      void import("../services/aihot.service")
        .then(({ aiHotService }) => aiHotService.fetchArticleContent({ id: targetId, url, summary: sum, title }))
        .then((articleHtml) => {
          if (aihotViewerState.open && aihotViewerState.item?.id === targetId) {
            aihotViewerController.setContent(articleHtml);
          }
        })
        .catch(() => {
          if (aihotViewerState.open && aihotViewerState.item?.id === targetId) {
            aihotViewerController.setContent(
              `<div class="aihot-article-fallback"><p class="muted">正文加载超时，请查阅上方 AI 导读或点击右上角「原文 ↗」访问源网页。</p></div>`
            );
          }
        });

      // 4.5 秒兜底超时计时器，杜绝无限加载
      setTimeout(() => {
        if (aihotViewerState.loading && aihotViewerState.item?.id === targetId) {
          aihotViewerController.setContent(
            `<div class="aihot-article-fallback"><p class="muted">正文加载超时，您可以点击右上角「原文 ↗」直接访问原文站点。</p></div>`
          );
        }
      }, 4500);
    }
  },
  close() {
    aihotViewerState.open = false;
    if (aihotBoundActions.onClose) {
      aihotBoundActions.onClose();
    }
  },
  setContent(content: string) {
    aihotViewerState.content = content;
    aihotViewerState.loading = false;
  },
  setImportState(importing: boolean, imported: boolean) {
    aihotViewerState.importing = importing;
    aihotViewerState.imported = imported;
  },
  setActions(actions) {
    aihotBoundActions = { ...aihotBoundActions, ...actions };
  }
};
