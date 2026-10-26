import { d as Q, o as n, e as c, f as e, m as u, F as p, h as k, t as o, u as f, B as g, g as m, H as D, b as W, s as y } from "./vendor-vue-DokqDua_.js";
import { _ as Z } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const ee = [
  // ---------- 开源前沿矩阵 ----------
  {
    id: "flux-2-klein-4b",
    name: "FLUX.2 klein 4B",
    creator: "Black Forest Labs",
    badge: "图灵坐标",
    group: "open-source",
    groupName: "开源前沿矩阵",
    isOpenSource: !0,
    releaseDate: "2026.01.15",
    modality: "T",
    generationLatencySec: 5.4,
    pricePerHundred: 1.4,
    priceText: "$1.40 / 百张",
    aaElo: {
      score: 864,
      rank: 19,
      total: 19,
      samples: 6037
    },
    arenaElo: {
      score: 1030,
      rank: 19,
      total: 19,
      votes: 144483
    },
    daElo: {
      score: 1065,
      rank: 19,
      total: 19,
      votes: 132248
    },
    pareto: {
      price: 1.4,
      elo: 1065,
      isFrontier: !1
    },
    radarMean: 1004,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 951, rank: 18, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1064, rank: 17, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 993, rank: 19, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1020, rank: 19, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1044, rank: 19, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 984, rank: 19, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1006, rank: 19, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 967, rank: 19, benchmarkScore: 1177 }
    ]
  },
  {
    id: "flux-1-dev",
    name: "FLUX.1 [dev]",
    creator: "Black Forest Labs",
    badge: "开源标杆",
    group: "open-source",
    groupName: "开源前沿矩阵",
    isOpenSource: !0,
    releaseDate: "2024.08.01",
    modality: "T",
    generationLatencySec: 7.2,
    pricePerHundred: 2.5,
    priceText: "$2.50 / 百张",
    aaElo: {
      score: 1088,
      rank: 6,
      total: 19,
      samples: 25410
    },
    arenaElo: {
      score: 1148,
      rank: 5,
      total: 19,
      votes: 310890
    },
    daElo: {
      score: 1172,
      rank: 5,
      total: 19,
      votes: 295400
    },
    pareto: {
      price: 2.5,
      elo: 1172,
      isFrontier: !0
    },
    radarMean: 1162,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1150, rank: 6, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1168, rank: 6, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1190, rank: 4, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1185, rank: 5, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1174, rank: 7, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1142, rank: 8, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1152, rank: 6, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1135, rank: 6, benchmarkScore: 1177 }
    ]
  },
  {
    id: "sd-3-5-large",
    name: "Stable Diffusion 3.5 Large",
    creator: "Stability AI",
    badge: "开源主力",
    group: "open-source",
    groupName: "开源前沿矩阵",
    isOpenSource: !0,
    releaseDate: "2024.10.22",
    modality: "T",
    generationLatencySec: 6.5,
    pricePerHundred: 2,
    priceText: "$2.00 / 百张",
    aaElo: {
      score: 1060,
      rank: 8,
      total: 19,
      samples: 21e3
    },
    arenaElo: {
      score: 1115,
      rank: 9,
      total: 19,
      votes: 18e4
    },
    daElo: {
      score: 1135,
      rank: 8,
      total: 19,
      votes: 165e3
    },
    pareto: {
      price: 2,
      elo: 1135,
      isFrontier: !0
    },
    radarMean: 1138,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1115, rank: 9, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1130, rank: 9, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1155, rank: 8, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1160, rank: 7, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1150, rank: 9, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1135, rank: 9, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1125, rank: 8, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1134, rank: 8, benchmarkScore: 1177 }
    ]
  },
  {
    id: "hunyuan-dit",
    name: "Tencent Hunyuan-DiT",
    creator: "Tencent",
    badge: "中文精调",
    group: "open-source",
    groupName: "开源前沿矩阵",
    isOpenSource: !0,
    releaseDate: "2024.05.14",
    modality: "T",
    generationLatencySec: 8,
    pricePerHundred: 1.8,
    priceText: "$1.80 / 百张",
    aaElo: {
      score: 1010,
      rank: 12,
      total: 19,
      samples: 14200
    },
    arenaElo: {
      score: 1072,
      rank: 12,
      total: 19,
      votes: 125e3
    },
    daElo: {
      score: 1098,
      rank: 11,
      total: 19,
      votes: 118e3
    },
    pareto: {
      price: 1.8,
      elo: 1098,
      isFrontier: !1
    },
    radarMean: 1085,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1140, rank: 7, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1080, rank: 12, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1105, rank: 11, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1095, rank: 11, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1110, rank: 11, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1118, rank: 10, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1020, rank: 14, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1012, rank: 13, benchmarkScore: 1177 }
    ]
  },
  // ---------- 商业闭源标杆矩阵 ----------
  {
    id: "recraft-v3",
    name: "Recraft V3",
    creator: "Recraft AI",
    badge: "设计排版王者",
    group: "commercial",
    groupName: "商业标杆矩阵",
    isOpenSource: !1,
    releaseDate: "2024.10.30",
    modality: "T",
    generationLatencySec: 6.8,
    pricePerHundred: 4,
    priceText: "$4.00 / 百张",
    aaElo: {
      score: 1172,
      rank: 1,
      total: 19,
      samples: 38200
    },
    arenaElo: {
      score: 1215,
      rank: 1,
      total: 19,
      votes: 421e3
    },
    daElo: {
      score: 1246,
      rank: 1,
      total: 19,
      votes: 398e3
    },
    pareto: {
      price: 4,
      elo: 1246,
      isFrontier: !0
    },
    radarMean: 1238,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1280, rank: 1, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1240, rank: 2, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1210, rank: 3, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1225, rank: 2, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1260, rank: 1, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1205, rank: 2, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1230, rank: 2, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1254, rank: 1, benchmarkScore: 1177 }
    ]
  },
  {
    id: "midjourney-v6-1",
    name: "Midjourney v6.1",
    creator: "Midjourney",
    badge: "美学巅峰",
    group: "commercial",
    groupName: "商业标杆矩阵",
    isOpenSource: !1,
    releaseDate: "2024.07.30",
    modality: "T",
    generationLatencySec: 12,
    pricePerHundred: 5,
    priceText: "$5.00 / 百张",
    aaElo: {
      score: 1130,
      rank: 3,
      total: 19,
      samples: 52e3
    },
    arenaElo: {
      score: 1185,
      rank: 3,
      total: 19,
      votes: 56e4
    },
    daElo: {
      score: 1208,
      rank: 3,
      total: 19,
      votes: 52e4
    },
    pareto: {
      price: 5,
      elo: 1208,
      isFrontier: !1
    },
    radarMean: 1210,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1120, rank: 8, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1180, rank: 5, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1245, rank: 1, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1240, rank: 1, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1250, rank: 2, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1218, rank: 1, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1215, rank: 3, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1212, rank: 4, benchmarkScore: 1177 }
    ]
  },
  {
    id: "ideogram-v2",
    name: "Ideogram v2",
    creator: "Ideogram",
    badge: "图文海报标杆",
    group: "commercial",
    groupName: "商业标杆矩阵",
    isOpenSource: !1,
    releaseDate: "2024.08.21",
    modality: "T",
    generationLatencySec: 8.5,
    pricePerHundred: 3.5,
    priceText: "$3.50 / 百张",
    aaElo: {
      score: 1145,
      rank: 2,
      total: 19,
      samples: 34e3
    },
    arenaElo: {
      score: 1192,
      rank: 2,
      total: 19,
      votes: 38e4
    },
    daElo: {
      score: 1220,
      rank: 2,
      total: 19,
      votes: 36e4
    },
    pareto: {
      price: 3.5,
      elo: 1220,
      isFrontier: !0
    },
    radarMean: 1215,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1275, rank: 2, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1205, rank: 4, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1215, rank: 2, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1220, rank: 3, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1235, rank: 3, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1195, rank: 3, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1205, rank: 4, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1248, rank: 2, benchmarkScore: 1177 }
    ]
  },
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    creator: "OpenAI",
    badge: "指令遵循王",
    group: "commercial",
    groupName: "商业标杆矩阵",
    isOpenSource: !1,
    releaseDate: "2023.10.01",
    modality: "T",
    generationLatencySec: 10.5,
    pricePerHundred: 4,
    priceText: "$4.00 / 百张",
    aaElo: {
      score: 1075,
      rank: 7,
      total: 19,
      samples: 48e3
    },
    arenaElo: {
      score: 1130,
      rank: 7,
      total: 19,
      votes: 49e4
    },
    daElo: {
      score: 1150,
      rank: 7,
      total: 19,
      votes: 45e4
    },
    pareto: {
      price: 4,
      elo: 1150,
      isFrontier: !1
    },
    radarMean: 1145,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1180, rank: 5, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1150, rank: 7, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1140, rank: 9, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1125, rank: 10, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1190, rank: 5, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1165, rank: 6, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1140, rank: 7, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1170, rank: 5, benchmarkScore: 1177 }
    ]
  },
  // ---------- 极速与端侧轻量矩阵 ----------
  {
    id: "flux-1-schnell",
    name: "FLUX.1 [schnell]",
    creator: "Black Forest Labs",
    badge: "极速4步",
    group: "lightweight",
    groupName: "极速轻量矩阵",
    isOpenSource: !0,
    releaseDate: "2024.08.01",
    modality: "T",
    generationLatencySec: 1.5,
    pricePerHundred: 0.5,
    priceText: "$0.50 / 百张",
    aaElo: {
      score: 1025,
      rank: 10,
      total: 19,
      samples: 19500
    },
    arenaElo: {
      score: 1085,
      rank: 10,
      total: 19,
      votes: 16e4
    },
    daElo: {
      score: 1110,
      rank: 10,
      total: 19,
      votes: 152e3
    },
    pareto: {
      price: 0.5,
      elo: 1110,
      isFrontier: !0
    },
    radarMean: 1092,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 1080, rank: 11, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 1095, rank: 11, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 1115, rank: 10, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 1120, rank: 9, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1105, rank: 12, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1090, rank: 12, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 1085, rank: 11, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 1075, rank: 11, benchmarkScore: 1177 }
    ]
  },
  {
    id: "sdxl-turbo",
    name: "SDXL Turbo",
    creator: "Stability AI",
    badge: "1步实时",
    group: "lightweight",
    groupName: "极速轻量矩阵",
    isOpenSource: !0,
    releaseDate: "2023.11.28",
    modality: "T",
    generationLatencySec: 0.35,
    pricePerHundred: 0.25,
    priceText: "$0.25 / 百张",
    aaElo: {
      score: 910,
      rank: 18,
      total: 19,
      samples: 9800
    },
    arenaElo: {
      score: 975,
      rank: 18,
      total: 19,
      votes: 89e3
    },
    daElo: {
      score: 995,
      rank: 18,
      total: 19,
      votes: 84e3
    },
    pareto: {
      price: 0.25,
      elo: 995,
      isFrontier: !0
    },
    radarMean: 980,
    radarBenchmarkMean: 1196,
    dimensions: [
      { name: "文字排版", key: "text", score: 880, rank: 19, benchmarkScore: 1180 },
      { name: "图片编辑", key: "editing", score: 960, rank: 18, benchmarkScore: 1218 },
      { name: "人像", key: "portraits", score: 990, rank: 18, benchmarkScore: 1185 },
      { name: "写实风格", key: "photorealism", score: 995, rank: 18, benchmarkScore: 1177 },
      { name: "艺术风格", key: "artistic", score: 1010, rank: 18, benchmarkScore: 1229 },
      { name: "动漫风格", key: "anime", score: 1025, rank: 17, benchmarkScore: 1181 },
      { name: "三维空间", key: "spatial_3d", score: 970, rank: 18, benchmarkScore: 1179 },
      { name: "商业设计", key: "commercial", score: 955, rank: 18, benchmarkScore: 1177 }
    ]
  }
], ae = [
  { price: 0.25, elo: 995, name: "SDXL Turbo" },
  { price: 0.5, elo: 1110, name: "FLUX.1 [schnell]" },
  { price: 2, elo: 1135, name: "SD 3.5 Large" },
  { price: 2.5, elo: 1172, name: "FLUX.1 [dev]" },
  { price: 3.5, elo: 1220, name: "Ideogram v2" },
  { price: 4, elo: 1246, name: "Recraft V3" }
], re = { class: "image-benchmark-view light-mode" }, oe = { class: "benchmark-subbar" }, se = { class: "model-select-group" }, te = ["value"], ne = { label: "🌟 开源前沿矩阵" }, ce = ["value"], le = { label: "💎 商业标杆矩阵" }, ie = ["value"], de = { label: "⚡ 极速轻量矩阵" }, me = ["value"], ue = { class: "model-select-group" }, pe = ["value"], ke = { label: "🌟 开源模型对比" }, he = ["value"], ve = { label: "💎 商业标杆对比" }, ye = ["value"], xe = { label: "⚡ 极速轻量对比" }, _e = ["value"], ge = { class: "model-quick-tags" }, be = { class: "quick-tag badge" }, Se = { class: "quick-tag time" }, fe = { class: "quick-tag cost" }, Ee = { class: "turing-card" }, Me = { class: "turing-card-header" }, Le = { class: "header-left" }, Te = { class: "creator-badge" }, Pe = { class: "creator-name" }, Fe = { class: "title-row" }, $e = { class: "model-title" }, Ie = { class: "lock-icon" }, Be = {
  key: 0,
  class: "vs-badge"
}, De = { class: "turing-body-grid" }, Ne = { class: "grid-left-col" }, Oe = { class: "elo-capsules-container" }, we = { class: "elo-capsule" }, Ce = { class: "capsule-header" }, Ae = { class: "capsule-rank" }, Xe = { class: "capsule-main" }, He = { class: "capsule-score" }, Ve = { class: "capsule-footer" }, Ge = { class: "muted-text" }, je = { class: "elo-capsule" }, Re = { class: "capsule-header" }, Ye = { class: "capsule-rank" }, Ue = { class: "capsule-main" }, qe = { class: "capsule-score" }, Ke = { class: "capsule-footer" }, ze = { class: "muted-text" }, Je = { class: "elo-capsule" }, Qe = { class: "capsule-header" }, We = { class: "capsule-rank" }, Ze = { class: "capsule-main" }, ea = { class: "capsule-score" }, aa = { class: "capsule-footer" }, ra = { class: "muted-text" }, oa = { class: "pareto-card" }, sa = { class: "pareto-header" }, ta = { class: "pareto-legend" }, na = {
  key: 0,
  class: "legend-item"
}, ca = { class: "pareto-svg-box" }, la = {
  viewBox: "0 0 540 220",
  class: "pareto-svg",
  role: "img",
  "aria-label": "性价比前沿分析图"
}, ia = ["d"], da = ["onClick"], ma = ["cx", "cy", "r"], ua = ["x", "y"], pa = { class: "model-meta-bar" }, ka = { class: "meta-item" }, ha = { class: "meta-val" }, va = { class: "meta-item" }, ya = { class: "meta-val text-brand" }, xa = { class: "meta-item" }, _a = { class: "meta-val" }, ga = { class: "meta-item" }, ba = { class: "meta-val text-cost" }, Sa = { class: "grid-right-col" }, fa = { class: "radar-card" }, Ea = { class: "radar-card-header" }, Ma = { class: "radar-title-group" }, La = { class: "mean-badge primary" }, Ta = { class: "mean-val" }, Pa = {
  key: 0,
  class: "mean-badge compare"
}, Fa = { class: "radar-legend" }, $a = { class: "radar-legend-item" }, Ia = {
  key: 0,
  class: "radar-legend-item compare"
}, Ba = {
  key: 1,
  class: "radar-legend-item benchmark"
}, Da = { class: "radar-chart-box" }, Na = {
  viewBox: "0 0 460 430",
  class: "radar-svg",
  role: "img",
  "aria-label": "八维能力雷达图"
}, Oa = ["points"], wa = ["x2", "y2"], Ca = ["points"], Aa = ["points"], Xa = ["points"], Ha = { key: 2 }, Va = ["cx", "cy"], Ga = ["cx", "cy"], ja = ["x", "y", "text-anchor"], Ra = ["x", "y", "text-anchor"], Ya = { class: "score-pri" }, Ua = {
  key: 0,
  class: "score-vs"
}, E = 230, M = 210, L = 140, qa = /* @__PURE__ */ Q({
  __name: "ImageBenchmarkView",
  props: {
    selectedModelId: {}
  },
  emits: ["select-model"],
  setup(N, { emit: O }) {
    const w = N, C = O, h = ee, b = W("midjourney-v6-1"), s = y(() => h.find((t) => t.id === w.selectedModelId) || h[0]), l = y(() => b.value === "__benchmark__" ? null : h.find((t) => t.id === b.value) || null);
    function A(t) {
      C("select-model", t), b.value === t && (b.value = t === "midjourney-v6-1" ? "recraft-v3" : "midjourney-v6-1");
    }
    function X(t) {
      t !== s.value.id && (b.value = t);
    }
    function T(t, r) {
      return t > r ? "win" : t < r ? "lose" : "draw";
    }
    function P(t, r) {
      const a = t - r;
      return a >= 0 ? `+${a}` : `${a}`;
    }
    function F(t) {
      const i = Math.log10(0.25), d = Math.log10(12);
      return 75 + (Math.log10(Math.max(0.25, t)) - i) / (d - i) * 385;
    }
    function $(t) {
      return 180 - (t - 900) / 400 * 155;
    }
    const H = y(() => ae.map((t, r) => {
      const a = F(t.price).toFixed(1), i = $(t.elo).toFixed(1);
      return `${r === 0 ? "M" : "L"} ${a} ${i}`;
    }).join(" "));
    function V(t) {
      const r = [], a = L * t;
      for (let i = 0; i < 8; i++) {
        const d = Math.PI / 4 * i - Math.PI / 2, x = E + a * Math.cos(d), v = M + a * Math.sin(d);
        r.push(`${x.toFixed(1)},${v.toFixed(1)}`);
      }
      return r.join(" ");
    }
    const G = y(() => {
      const t = [];
      for (let r = 0; r < 8; r++) {
        const a = Math.PI / 4 * r - Math.PI / 2;
        t.push({
          x: E + L * Math.cos(a),
          y: M + L * Math.sin(a)
        });
      }
      return t;
    });
    function I(t) {
      const i = [];
      for (let d = 0; d < 8; d++) {
        const x = t[d] || 1e3, v = Math.max(0.15, Math.min(1, (x - 750) / 600)), _ = L * v, S = Math.PI / 4 * d - Math.PI / 2, z = E + _ * Math.cos(S), J = M + _ * Math.sin(S);
        i.push(`${z.toFixed(1)},${J.toFixed(1)}`);
      }
      return i.join(" ");
    }
    const j = y(() => I(s.value.dimensions.map((t) => t.score))), R = y(() => l.value ? I(l.value.dimensions.map((t) => t.score)) : ""), Y = y(() => I(s.value.dimensions.map((t) => t.benchmarkScore)));
    function B(t) {
      const i = [];
      for (let d = 0; d < 8; d++) {
        const x = t[d] || 1e3, v = Math.max(0.15, Math.min(1, (x - 750) / 600)), _ = L * v, S = Math.PI / 4 * d - Math.PI / 2;
        i.push({
          x: E + _ * Math.cos(S),
          y: M + _ * Math.sin(S)
        });
      }
      return i;
    }
    const U = y(() => B(s.value.dimensions.map((t) => t.score))), q = y(() => l.value ? B(l.value.dimensions.map((t) => t.score)) : []), K = y(() => {
      const t = L + 32;
      return s.value.dimensions.map((r, a) => {
        const i = Math.PI / 4 * a - Math.PI / 2, d = E + t * Math.cos(i), x = M + t * Math.sin(i);
        let v = "middle";
        Math.cos(i) > 0.3 ? v = "start" : Math.cos(i) < -0.3 && (v = "end");
        const _ = l.value ? l.value.dimensions[a]?.score : void 0, S = _ !== void 0 ? r.score - _ : void 0;
        return {
          name: r.name,
          key: r.key,
          score: r.score,
          compareScore: _,
          diff: S,
          x: Number(d.toFixed(1)),
          y: Number(x.toFixed(1)),
          anchor: v
        };
      });
    });
    return (t, r) => (n(), c("div", re, [
      e("div", oe, [
        e("div", se, [
          r[2] || (r[2] = e("label", {
            for: "benchmark-model-picker",
            class: "picker-label primary"
          }, [
            e("span", { class: "color-dot primary" }),
            u(" 主测模型： ")
          ], -1)),
          e("select", {
            id: "benchmark-model-picker",
            class: "benchmark-select primary",
            value: s.value.id,
            onChange: r[0] || (r[0] = (a) => A(a.target.value))
          }, [
            e("optgroup", ne, [
              (n(!0), c(p, null, k(f(h).filter((a) => a.group === "open-source"), (a) => (n(), c("option", {
                key: a.id,
                value: a.id
              }, o(a.name) + " (" + o(a.creator) + ") ", 9, ce))), 128))
            ]),
            e("optgroup", le, [
              (n(!0), c(p, null, k(f(h).filter((a) => a.group === "commercial"), (a) => (n(), c("option", {
                key: a.id,
                value: a.id
              }, o(a.name) + " (" + o(a.creator) + ") ", 9, ie))), 128))
            ]),
            e("optgroup", de, [
              (n(!0), c(p, null, k(f(h).filter((a) => a.group === "lightweight"), (a) => (n(), c("option", {
                key: a.id,
                value: a.id
              }, o(a.name) + " (" + o(a.creator) + ") ", 9, me))), 128))
            ])
          ], 40, te)
        ]),
        e("div", ue, [
          r[4] || (r[4] = e("label", {
            for: "benchmark-compare-picker",
            class: "picker-label compare"
          }, [
            e("span", { class: "color-dot compare" }),
            u(" 对比基准： ")
          ], -1)),
          e("select", {
            id: "benchmark-compare-picker",
            class: "benchmark-select compare",
            value: b.value,
            onChange: r[1] || (r[1] = (a) => b.value = a.target.value)
          }, [
            r[3] || (r[3] = e("option", { value: "__benchmark__" }, "📐 行业基准均值线 (Top19)", -1)),
            e("optgroup", ke, [
              (n(!0), c(p, null, k(f(h).filter((a) => a.group === "open-source" && a.id !== s.value.id), (a) => (n(), c("option", {
                key: a.id,
                value: a.id
              }, o(a.name) + " (" + o(a.creator) + ") ", 9, he))), 128))
            ]),
            e("optgroup", ve, [
              (n(!0), c(p, null, k(f(h).filter((a) => a.group === "commercial" && a.id !== s.value.id), (a) => (n(), c("option", {
                key: a.id,
                value: a.id
              }, o(a.name) + " (" + o(a.creator) + ") ", 9, ye))), 128))
            ]),
            e("optgroup", xe, [
              (n(!0), c(p, null, k(f(h).filter((a) => a.group === "lightweight" && a.id !== s.value.id), (a) => (n(), c("option", {
                key: a.id,
                value: a.id
              }, o(a.name) + " (" + o(a.creator) + ") ", 9, _e))), 128))
            ])
          ], 40, pe)
        ]),
        e("div", ge, [
          e("span", be, o(s.value.badge || "评测标杆"), 1),
          e("span", {
            class: g(["quick-tag", s.value.isOpenSource ? "open" : "closed"])
          }, o(s.value.isOpenSource ? "🔓 开源" : "🔒 闭源"), 3),
          e("span", Se, "⏱ 平均 " + o(s.value.generationLatencySec) + "s", 1),
          e("span", fe, "💰 " + o(s.value.priceText), 1)
        ])
      ]),
      e("div", Ee, [
        e("div", Me, [
          e("div", Le, [
            e("div", Te, [
              r[5] || (r[5] = e("span", { class: "creator-icon" }, "⬡", -1)),
              e("span", Pe, o(s.value.creator) + " · " + o(s.value.groupName), 1)
            ]),
            e("div", Fe, [
              e("h3", $e, o(s.value.name), 1),
              e("span", {
                class: g(["license-tag", { "is-open": s.value.isOpenSource }])
              }, [
                e("span", Ie, o(s.value.isOpenSource ? "🔓" : "🔒"), 1),
                u(" " + o(s.value.isOpenSource ? "开源" : "闭源"), 1)
              ], 2),
              l.value ? (n(), c("span", Be, [
                r[6] || (r[6] = u(" PK ", -1)),
                e("b", null, o(l.value.name), 1)
              ])) : m("", !0)
            ])
          ]),
          r[7] || (r[7] = e("div", { class: "header-right" }, [
            e("div", { class: "source-tag" }, [
              e("span", { class: "compass-icon" }, "🧭"),
              e("span", null, "图灵坐标全景")
            ])
          ], -1))
        ]),
        e("div", De, [
          e("div", Ne, [
            e("div", Oe, [
              e("div", we, [
                e("div", Ce, [
                  r[8] || (r[8] = e("span", { class: "capsule-name" }, "AA 文生图 Elo", -1)),
                  e("span", Ae, "#" + o(s.value.aaElo.rank) + " / " + o(s.value.aaElo.total), 1)
                ]),
                e("div", Xe, [
                  e("span", He, o(s.value.aaElo.score), 1),
                  r[9] || (r[9] = e("span", { class: "capsule-unit" }, "分", -1)),
                  l.value ? (n(), c("span", {
                    key: 0,
                    class: g(["capsule-diff", T(s.value.aaElo.score, l.value.aaElo.score)])
                  }, o(P(s.value.aaElo.score, l.value.aaElo.score)), 3)) : m("", !0)
                ]),
                e("div", Ve, [
                  e("span", Ge, "样本量: " + o(s.value.aaElo.samples.toLocaleString()), 1)
                ])
              ]),
              e("div", je, [
                e("div", Re, [
                  r[10] || (r[10] = e("span", { class: "capsule-name" }, "Arena 文生图 Elo", -1)),
                  e("span", Ye, "#" + o(s.value.arenaElo.rank) + " / " + o(s.value.arenaElo.total), 1)
                ]),
                e("div", Ue, [
                  e("span", qe, o(s.value.arenaElo.score), 1),
                  r[11] || (r[11] = e("span", { class: "capsule-unit" }, "分", -1)),
                  l.value ? (n(), c("span", {
                    key: 0,
                    class: g(["capsule-diff", T(s.value.arenaElo.score, l.value.arenaElo.score)])
                  }, o(P(s.value.arenaElo.score, l.value.arenaElo.score)), 3)) : m("", !0)
                ]),
                e("div", Ke, [
                  e("span", ze, "投票数: " + o(s.value.arenaElo.votes.toLocaleString()), 1)
                ])
              ]),
              e("div", Je, [
                e("div", Qe, [
                  r[12] || (r[12] = e("span", { class: "capsule-name" }, "DA 文生图 Elo", -1)),
                  e("span", We, "#" + o(s.value.daElo.rank) + " / " + o(s.value.daElo.total), 1)
                ]),
                e("div", Ze, [
                  e("span", ea, o(s.value.daElo.score), 1),
                  r[13] || (r[13] = e("span", { class: "capsule-unit" }, "分", -1)),
                  l.value ? (n(), c("span", {
                    key: 0,
                    class: g(["capsule-diff", T(s.value.daElo.score, l.value.daElo.score)])
                  }, o(P(s.value.daElo.score, l.value.daElo.score)), 3)) : m("", !0)
                ]),
                e("div", aa, [
                  e("span", ra, "投票数: " + o(s.value.daElo.votes.toLocaleString()), 1)
                ])
              ])
            ]),
            e("div", oa, [
              e("div", sa, [
                r[17] || (r[17] = e("div", { class: "pareto-title" }, [
                  e("span", { class: "chart-icon" }, "📈"),
                  e("span", null, "性价比前沿分析 (DesignArena)"),
                  e("span", { class: "pareto-hint" }, "（点击点位可一键设为对比组）")
                ], -1)),
                e("div", ta, [
                  r[15] || (r[15] = e("span", { class: "legend-item" }, [
                    e("i", { class: "dash-line" }),
                    u(" 性价比前沿")
                  ], -1)),
                  r[16] || (r[16] = e("span", { class: "legend-item" }, [
                    e("i", { class: "dot active" }),
                    u(" 主测模型")
                  ], -1)),
                  l.value ? (n(), c("span", na, [...r[14] || (r[14] = [
                    e("i", { class: "dot compare" }, null, -1),
                    u(" 对比模型", -1)
                  ])])) : m("", !0)
                ])
              ]),
              e("div", ca, [
                (n(), c("svg", la, [
                  r[18] || (r[18] = D('<line x1="50" y1="180" x2="510" y2="180" class="axis-line" data-v-60c97c96></line><line x1="50" y1="20" x2="50" y2="180" class="axis-line" data-v-60c97c96></line><line x1="50" y1="130" x2="510" y2="130" class="grid-line" data-v-60c97c96></line><line x1="50" y1="75" x2="510" y2="75" class="grid-line" data-v-60c97c96></line><text x="42" y="184" class="axis-text" text-anchor="end" data-v-60c97c96>900</text><text x="42" y="134" class="axis-text" text-anchor="end" data-v-60c97c96>1050</text><text x="42" y="79" class="axis-text" text-anchor="end" data-v-60c97c96>1175</text><text x="42" y="24" class="axis-text" text-anchor="end" data-v-60c97c96>1300</text><text x="75" y="198" class="axis-text" text-anchor="middle" data-v-60c97c96>$0.25</text><text x="145" y="198" class="axis-text" text-anchor="middle" data-v-60c97c96>$0.5</text><text x="215" y="198" class="axis-text" text-anchor="middle" data-v-60c97c96>$1</text><text x="285" y="198" class="axis-text" text-anchor="middle" data-v-60c97c96>$2.5</text><text x="365" y="198" class="axis-text" text-anchor="middle" data-v-60c97c96>$5</text><text x="450" y="198" class="axis-text" text-anchor="middle" data-v-60c97c96>$10</text>', 14)),
                  e("path", {
                    d: H.value,
                    class: "frontier-path"
                  }, null, 8, ia),
                  (n(!0), c(p, null, k(f(h), (a) => (n(), c("g", {
                    key: a.id,
                    class: "pareto-dot-group",
                    onClick: (i) => X(a.id)
                  }, [
                    e("circle", {
                      cx: F(a.pareto.price),
                      cy: $(a.pareto.elo),
                      r: a.id === s.value.id ? 8 : l.value && a.id === l.value.id ? 7 : 5,
                      class: g([
                        "model-dot",
                        a.id === s.value.id ? "is-active" : "",
                        l.value && a.id === l.value.id ? "is-compare" : "",
                        a.pareto.isFrontier ? "is-frontier" : ""
                      ])
                    }, null, 10, ma),
                    e("text", {
                      x: F(a.pareto.price),
                      y: $(a.pareto.elo) - 10,
                      class: g([
                        "dot-label",
                        a.id === s.value.id ? "label-active" : "",
                        l.value && a.id === l.value.id ? "label-compare" : ""
                      ]),
                      "text-anchor": "middle"
                    }, o(a.name), 11, ua)
                  ], 8, da))), 128))
                ]))
              ])
            ]),
            e("div", pa, [
              e("div", ka, [
                r[19] || (r[19] = e("span", { class: "meta-title" }, "发布时间", -1)),
                e("strong", ha, o(s.value.releaseDate), 1)
              ]),
              e("div", va, [
                r[20] || (r[20] = e("span", { class: "meta-title" }, "输入模态", -1)),
                e("strong", ya, o(s.value.modality) + " (Text)", 1)
              ]),
              e("div", xa, [
                r[21] || (r[21] = e("span", { class: "meta-title" }, "生成耗时", -1)),
                e("strong", _a, o(s.value.generationLatencySec) + " 秒", 1)
              ]),
              e("div", ga, [
                r[22] || (r[22] = e("span", { class: "meta-title" }, "计费价格", -1)),
                e("strong", ba, o(s.value.priceText), 1)
              ])
            ])
          ]),
          e("div", Sa, [
            e("div", fa, [
              e("div", Ea, [
                e("div", Ma, [
                  r[23] || (r[23] = e("h4", { class: "radar-heading" }, "八维全景能力图谱", -1)),
                  e("span", La, [
                    u(o(s.value.name) + " 均值: ", 1),
                    e("b", Ta, o(s.value.radarMean), 1)
                  ]),
                  l.value ? (n(), c("span", Pa, [
                    u(o(l.value.name) + " 均值: ", 1),
                    e("b", null, o(l.value.radarMean), 1)
                  ])) : m("", !0)
                ]),
                e("div", Fa, [
                  e("span", $a, [
                    r[24] || (r[24] = e("i", { class: "legend-box active" }, null, -1)),
                    u(" " + o(s.value.name), 1)
                  ]),
                  l.value ? (n(), c("span", Ia, [
                    r[25] || (r[25] = e("i", { class: "legend-box compare" }, null, -1)),
                    u(" " + o(l.value.name), 1)
                  ])) : m("", !0),
                  l.value ? m("", !0) : (n(), c("span", Ba, [...r[26] || (r[26] = [
                    e("i", { class: "legend-dash" }, null, -1),
                    u(" 行业基准线 ", -1)
                  ])]))
                ])
              ]),
              e("div", Da, [
                (n(), c("svg", Na, [
                  r[27] || (r[27] = D('<defs data-v-60c97c96><radialGradient id="radarGlowPrimary" cx="50%" cy="50%" r="50%" data-v-60c97c96><stop offset="0%" stop-color="#2563eb" stop-opacity="0.35" data-v-60c97c96></stop><stop offset="100%" stop-color="#2563eb" stop-opacity="0.08" data-v-60c97c96></stop></radialGradient><radialGradient id="radarGlowCompare" cx="50%" cy="50%" r="50%" data-v-60c97c96><stop offset="0%" stop-color="#f97316" stop-opacity="0.3" data-v-60c97c96></stop><stop offset="100%" stop-color="#f97316" stop-opacity="0.06" data-v-60c97c96></stop></radialGradient></defs>', 1)),
                  (n(), c(p, null, k([0.35, 0.6, 0.85, 1], (a, i) => e("polygon", {
                    key: i,
                    points: V(a),
                    class: g(i === 3 ? "radar-grid-outer" : "radar-grid-inner")
                  }, null, 10, Oa)), 64)),
                  (n(!0), c(p, null, k(G.value, (a, i) => (n(), c("line", {
                    key: i,
                    x1: E,
                    y1: M,
                    x2: a.x,
                    y2: a.y,
                    class: "radar-axis-line"
                  }, null, 8, wa))), 128)),
                  l.value ? m("", !0) : (n(), c("polygon", {
                    key: 0,
                    points: Y.value,
                    class: "radar-benchmark-polygon"
                  }, null, 8, Ca)),
                  l.value ? (n(), c("polygon", {
                    key: 1,
                    points: R.value,
                    fill: "url(#radarGlowCompare)",
                    class: "radar-compare-polygon"
                  }, null, 8, Aa)) : m("", !0),
                  e("polygon", {
                    points: j.value,
                    fill: "url(#radarGlowPrimary)",
                    class: "radar-primary-polygon"
                  }, null, 8, Xa),
                  l.value ? (n(), c("g", Ha, [
                    (n(!0), c(p, null, k(q.value, (a, i) => (n(), c("circle", {
                      key: "cmp-" + i,
                      cx: a.x,
                      cy: a.y,
                      r: "4",
                      class: "radar-vertex-dot compare"
                    }, null, 8, Va))), 128))
                  ])) : m("", !0),
                  e("g", null, [
                    (n(!0), c(p, null, k(U.value, (a, i) => (n(), c("circle", {
                      key: "pri-" + i,
                      cx: a.x,
                      cy: a.y,
                      r: "5",
                      class: "radar-vertex-dot primary"
                    }, null, 8, Ga))), 128))
                  ]),
                  (n(!0), c(p, null, k(K.value, (a, i) => (n(), c("g", {
                    key: a.key
                  }, [
                    e("text", {
                      x: a.x,
                      y: a.y - 14,
                      class: "dim-label-title",
                      "text-anchor": a.anchor
                    }, o(a.name), 9, ja),
                    e("text", {
                      x: a.x,
                      y: a.y + 4,
                      class: "dim-label-score",
                      "text-anchor": a.anchor
                    }, [
                      e("tspan", Ya, o(a.score), 1),
                      a.compareScore ? (n(), c("tspan", Ua, " vs " + o(a.compareScore), 1)) : m("", !0),
                      a.diff !== void 0 ? (n(), c("tspan", {
                        key: 1,
                        class: g(a.diff >= 0 ? "score-win" : "score-lose")
                      }, " (" + o(a.diff >= 0 ? "+" + a.diff : a.diff) + ") ", 3)) : m("", !0)
                    ], 8, Ra)
                  ]))), 128))
                ]))
              ])
            ])
          ])
        ])
      ])
    ]));
  }
}), Ja = /* @__PURE__ */ Z(qa, [["__scopeId", "data-v-60c97c96"]]);
export {
  Ja as default
};
