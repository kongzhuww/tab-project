import { reactive } from "vue";

export interface ModelPricingItem {
  id: string;
  name: string;
  creator: string;
  inputPrice: number;
  outputPrice: number;
  contextLength: number;
  isFree?: boolean;
  isFavorite?: boolean;
  score?: number;
  url?: string;
  releaseDate?: string;
}

export interface ModelRankItem {
  id?: string;
  name: string;
  creator: string;
  score: number;
  url?: string;
  releaseDate?: string;
  metrics?: Array<{ label: string; value: string }>;
  evaluations?: Record<string, number | string>;
  isFavorite?: boolean;
}

export interface PricingState {
  view: "price" | "rank" | "image-eval";
  sortMode: "cheap-in" | "cheap-out" | "free" | "context";
  searchQuery: string;
  favoritesOnly: boolean;
  favoritesCount: number;
  sourceText: string;
  sourceUrl: string;
  currentPage: number;
  totalPages: number;
  models: ModelPricingItem[];
  ranking: ModelRankItem[];
  infoText: string;
  isLoading: boolean;
  selectedImageModelId: string;
  rankModelType?: string;
  hasOpenRouterKey?: boolean;
  hasAaApiKey?: boolean;
}

export const pricingState = reactive<PricingState>({
  view: "price",
  sortMode: "cheap-in",
  searchQuery: "",
  favoritesOnly: false,
  favoritesCount: 0,
  sourceText: "OpenRouter 定价内置示例",
  sourceUrl: "https://openrouter.ai/models",
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  selectedImageModelId: "flux-2-klein-4b",
  hasOpenRouterKey: false,
  hasAaApiKey: false,
  infoText: "内置示例数据，未实时拉取；关注仅保留在本页内存。",
  models: [
    {
      id: "deepseek/deepseek-chat",
      name: "DeepSeek-V3",
      creator: "DeepSeek",
      inputPrice: 0.14,
      outputPrice: 0.28,
      contextLength: 65536,
      score: 82.5,
      url: "https://deepseek.com",
      releaseDate: "2025-01"
    },
    {
      id: "deepseek/deepseek-r1",
      name: "DeepSeek-R1",
      creator: "DeepSeek",
      inputPrice: 0.55,
      outputPrice: 2.19,
      contextLength: 65536,
      score: 88.2,
      url: "https://deepseek.com",
      releaseDate: "2025-01"
    },
    {
      id: "anthropic/claude-3.7-sonnet",
      name: "Claude 3.7 Sonnet (Thinking)",
      creator: "Anthropic",
      inputPrice: 3.0,
      outputPrice: 15.0,
      contextLength: 200000,
      score: 89.4,
      url: "https://anthropic.com",
      releaseDate: "2025-02"
    },
    {
      id: "openai/o3-mini",
      name: "OpenAI o3-mini",
      creator: "OpenAI",
      inputPrice: 1.1,
      outputPrice: 4.4,
      contextLength: 200000,
      score: 87.2,
      url: "https://openai.com",
      releaseDate: "2025-01"
    },
    {
      id: "google/gemini-2.0-flash",
      name: "Gemini 2.0 Flash",
      creator: "Google",
      inputPrice: 0.1,
      outputPrice: 0.4,
      contextLength: 1048576,
      score: 84.1,
      url: "https://ai.google.dev",
      releaseDate: "2025-02"
    },
    {
      id: "qwen/qwen-2.5-max",
      name: "Qwen 2.5 Max",
      creator: "Alibaba",
      inputPrice: 0.28,
      outputPrice: 1.12,
      contextLength: 128000,
      score: 85.3,
      url: "https://qwenlm.github.io",
      releaseDate: "2025-01"
    }
  ],
  ranking: [
    {
      name: "DeepSeek-R1",
      creator: "DeepSeek",
      score: 88.2,
      url: "https://artificialanalysis.ai/models/deepseek-r1",
      releaseDate: "2025-01",
      metrics: [
        { label: "MATH-500", value: "97.3%" },
        { label: "AIME 2025", value: "79.8%" },
        { label: "LiveCodeBench", value: "65.9%" },
        { label: "输出速度", value: "28 tok/s" }
      ]
    },
    {
      name: "Claude 3.5 Sonnet",
      creator: "Anthropic",
      score: 87.8,
      url: "https://artificialanalysis.ai/models/claude-3-5-sonnet",
      releaseDate: "2024-10",
      metrics: [
        { label: "MMLU-Pro", value: "78.0%" },
        { label: "GPQA", value: "65.0%" },
        { label: "LiveCodeBench", value: "62.3%" },
        { label: "输出速度", value: "72 tok/s" }
      ]
    },
    {
      name: "o3-mini",
      creator: "OpenAI",
      score: 87.2,
      url: "https://artificialanalysis.ai/models/o3-mini",
      releaseDate: "2025-01",
      metrics: [
        { label: "AIME 2025", value: "87.3%" },
        { label: "MATH-500", value: "97.9%" },
        { label: "LiveCodeBench", value: "72.4%" },
        { label: "输出速度", value: "48 tok/s" }
      ]
    },
    {
      name: "GPT-4o",
      creator: "OpenAI",
      score: 86.4,
      url: "https://artificialanalysis.ai/models/gpt-4o",
      releaseDate: "2024-08",
      metrics: [
        { label: "MMLU-Pro", value: "72.6%" },
        { label: "GPQA", value: "53.6%" },
        { label: "MATH-500", value: "74.6%" },
        { label: "输出速度", value: "112 tok/s" }
      ]
    },
    {
      name: "Gemini 2.0 Flash",
      creator: "Google",
      score: 84.1,
      url: "https://artificialanalysis.ai/models/gemini-2-0-flash",
      releaseDate: "2024-12",
      metrics: [
        { label: "MMLU-Pro", value: "75.4%" },
        { label: "GPQA", value: "58.1%" },
        { label: "LiveCodeBench", value: "54.2%" },
        { label: "输出速度", value: "148 tok/s" }
      ]
    },
    {
      name: "Qwen 2.5 Max",
      creator: "Alibaba",
      score: 83.9,
      url: "https://artificialanalysis.ai/models/qwen-2-5-max",
      releaseDate: "2025-01",
      metrics: [
        { label: "MMLU-Pro", value: "71.0%" },
        { label: "GPQA", value: "51.2%" },
        { label: "MATH-500", value: "84.3%" },
        { label: "输出速度", value: "65 tok/s" }
      ]
    }
  ]
});

export type PricingAction =
  | "switch-view"
  | "set-sort"
  | "search"
  | "toggle-favorites-only"
  | "toggle-favorite"
  | "set-page"
  | "select-image-model"
  | "refresh";

export type PricingActionHandler = (action: PricingAction, payload?: any) => void;

const actionHandlers = new Set<PricingActionHandler>();

export const pricingController = {
  get state() {
    return pricingState;
  },
  updateState(partial: Partial<PricingState>) {
    Object.assign(pricingState, partial);
  },
  setModels(models: ModelPricingItem[]) {
    pricingState.models = [...models];
  },
  setRanking(ranking: ModelRankItem[]) {
    pricingState.ranking = [...ranking];
  },
  setView(view: PricingState["view"]) {
    pricingState.view = view;
  },
  selectImageModel(id: string) {
    pricingState.selectedImageModelId = id;
    this.dispatch("select-image-model", id);
  },
  setSortMode(mode: PricingState["sortMode"]) {
    pricingState.sortMode = mode;
  },
  setPage(page: number) {
    pricingState.currentPage = Math.max(1, Math.min(page, pricingState.totalPages));
  },
  toggleFavorite(idOrName: string) {
    const pItem = pricingState.models.find((m) => m.id === idOrName || m.name === idOrName);
    if (pItem) {
      pItem.isFavorite = !pItem.isFavorite;
    }
    const rItem = pricingState.ranking.find((m) => m.name === idOrName);
    if (rItem) {
      rItem.isFavorite = !rItem.isFavorite;
    }
    const favP = pricingState.models.filter((m) => m.isFavorite).length;
    const favR = pricingState.ranking.filter((m) => m.isFavorite).length;
    pricingState.favoritesCount = Math.max(favP, favR);
    this.dispatch("toggle-favorite", idOrName);
  },
  onAction(handler: PricingActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },
  dispatch(action: PricingAction, payload?: any) {
    if (action === "refresh" && !actionHandlers.size) {
      pricingState.infoText = "实时数据刷新尚未接入，当前仅为内置示例。";
      return false;
    }
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[Pricing] Action handler error:`, err);
      }
    }
  }
};
