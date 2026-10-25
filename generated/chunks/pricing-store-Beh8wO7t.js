import { r as n } from "./vendor-vue-CjOHdfe5.js";
const a = n({
  view: "price",
  sortMode: "cheap-in",
  searchQuery: "",
  favoritesOnly: !1,
  favoritesCount: 0,
  sourceText: "OpenRouter 定价内置示例",
  sourceUrl: "https://openrouter.ai/models",
  currentPage: 1,
  totalPages: 1,
  isLoading: !1,
  selectedImageModelId: "flux-2-klein-4b",
  hasOpenRouterKey: !1,
  hasAaApiKey: !1,
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
      inputPrice: 3,
      outputPrice: 15,
      contextLength: 2e5,
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
      contextLength: 2e5,
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
      contextLength: 128e3,
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
}), i = /* @__PURE__ */ new Set(), u = {
  get state() {
    return a;
  },
  updateState(e) {
    Object.assign(a, e);
  },
  setModels(e) {
    a.models = [...e];
  },
  setRanking(e) {
    a.ranking = [...e];
  },
  setView(e) {
    a.view = e;
  },
  selectImageModel(e) {
    a.selectedImageModelId = e, this.dispatch("select-image-model", e);
  },
  setSortMode(e) {
    a.sortMode = e;
  },
  setPage(e) {
    a.currentPage = Math.max(1, Math.min(e, a.totalPages));
  },
  toggleFavorite(e) {
    const l = a.models.find((t) => t.id === e || t.name === e);
    l && (l.isFavorite = !l.isFavorite);
    const r = a.ranking.find((t) => t.name === e);
    r && (r.isFavorite = !r.isFavorite);
    const o = a.models.filter((t) => t.isFavorite).length, s = a.ranking.filter((t) => t.isFavorite).length;
    a.favoritesCount = Math.max(o, s), this.dispatch("toggle-favorite", e);
  },
  onAction(e) {
    return i.add(e), () => {
      i.delete(e);
    };
  },
  dispatch(e, l) {
    if (e === "refresh" && !i.size)
      return a.infoText = "实时数据刷新尚未接入，当前仅为内置示例。", !1;
    for (const r of i)
      try {
        r(e, l);
      } catch (o) {
        console.error("[Pricing] Action handler error:", o);
      }
  }
};
export {
  a,
  u as p
};
