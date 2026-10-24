export interface ImageGenDimensionScore {
  name: string;
  key: string;
  score: number;
  rank: number;
  benchmarkScore: number;
}

export type ModelGroupKey = "open-source" | "commercial" | "lightweight";

export interface ImageGenBenchmarkModel {
  id: string;
  name: string;
  creator: string;
  creatorLogo?: string;
  badge?: string;
  group: ModelGroupKey;
  groupName: string;
  isOpenSource: boolean;
  releaseDate: string;
  modality: string;
  generationLatencySec: number;
  pricePerHundred: number;
  priceText: string;
  aaElo: {
    score: number;
    rank: number;
    total: number;
    samples: number;
  };
  arenaElo: {
    score: number;
    rank: number;
    total: number;
    votes: number;
  };
  daElo: {
    score: number;
    rank: number;
    total: number;
    votes: number;
  };
  pareto: {
    price: number;
    elo: number;
    isFrontier?: boolean;
  };
  radarMean: number;
  radarBenchmarkMean: number;
  dimensions: ImageGenDimensionScore[];
}

export const IMAGE_GEN_BENCHMARK_MODELS: ImageGenBenchmarkModel[] = [
  // ---------- 开源前沿矩阵 ----------
  {
    id: "flux-2-klein-4b",
    name: "FLUX.2 klein 4B",
    creator: "Black Forest Labs",
    badge: "图灵坐标",
    group: "open-source",
    groupName: "开源前沿矩阵",
    isOpenSource: true,
    releaseDate: "2026.01.15",
    modality: "T",
    generationLatencySec: 5.4,
    pricePerHundred: 1.40,
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
      price: 1.40,
      elo: 1065,
      isFrontier: false
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
    isOpenSource: true,
    releaseDate: "2024.08.01",
    modality: "T",
    generationLatencySec: 7.2,
    pricePerHundred: 2.50,
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
      price: 2.50,
      elo: 1172,
      isFrontier: true
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
    isOpenSource: true,
    releaseDate: "2024.10.22",
    modality: "T",
    generationLatencySec: 6.5,
    pricePerHundred: 2.00,
    priceText: "$2.00 / 百张",
    aaElo: {
      score: 1060,
      rank: 8,
      total: 19,
      samples: 21000
    },
    arenaElo: {
      score: 1115,
      rank: 9,
      total: 19,
      votes: 180000
    },
    daElo: {
      score: 1135,
      rank: 8,
      total: 19,
      votes: 165000
    },
    pareto: {
      price: 2.00,
      elo: 1135,
      isFrontier: true
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
    isOpenSource: true,
    releaseDate: "2024.05.14",
    modality: "T",
    generationLatencySec: 8.0,
    pricePerHundred: 1.80,
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
      votes: 125000
    },
    daElo: {
      score: 1098,
      rank: 11,
      total: 19,
      votes: 118000
    },
    pareto: {
      price: 1.80,
      elo: 1098,
      isFrontier: false
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
    isOpenSource: false,
    releaseDate: "2024.10.30",
    modality: "T",
    generationLatencySec: 6.8,
    pricePerHundred: 4.00,
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
      votes: 421000
    },
    daElo: {
      score: 1246,
      rank: 1,
      total: 19,
      votes: 398000
    },
    pareto: {
      price: 4.00,
      elo: 1246,
      isFrontier: true
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
    isOpenSource: false,
    releaseDate: "2024.07.30",
    modality: "T",
    generationLatencySec: 12.0,
    pricePerHundred: 5.00,
    priceText: "$5.00 / 百张",
    aaElo: {
      score: 1130,
      rank: 3,
      total: 19,
      samples: 52000
    },
    arenaElo: {
      score: 1185,
      rank: 3,
      total: 19,
      votes: 560000
    },
    daElo: {
      score: 1208,
      rank: 3,
      total: 19,
      votes: 520000
    },
    pareto: {
      price: 5.00,
      elo: 1208,
      isFrontier: false
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
    isOpenSource: false,
    releaseDate: "2024.08.21",
    modality: "T",
    generationLatencySec: 8.5,
    pricePerHundred: 3.50,
    priceText: "$3.50 / 百张",
    aaElo: {
      score: 1145,
      rank: 2,
      total: 19,
      samples: 34000
    },
    arenaElo: {
      score: 1192,
      rank: 2,
      total: 19,
      votes: 380000
    },
    daElo: {
      score: 1220,
      rank: 2,
      total: 19,
      votes: 360000
    },
    pareto: {
      price: 3.50,
      elo: 1220,
      isFrontier: true
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
    isOpenSource: false,
    releaseDate: "2023.10.01",
    modality: "T",
    generationLatencySec: 10.5,
    pricePerHundred: 4.00,
    priceText: "$4.00 / 百张",
    aaElo: {
      score: 1075,
      rank: 7,
      total: 19,
      samples: 48000
    },
    arenaElo: {
      score: 1130,
      rank: 7,
      total: 19,
      votes: 490000
    },
    daElo: {
      score: 1150,
      rank: 7,
      total: 19,
      votes: 450000
    },
    pareto: {
      price: 4.00,
      elo: 1150,
      isFrontier: false
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
    isOpenSource: true,
    releaseDate: "2024.08.01",
    modality: "T",
    generationLatencySec: 1.5,
    pricePerHundred: 0.50,
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
      votes: 160000
    },
    daElo: {
      score: 1110,
      rank: 10,
      total: 19,
      votes: 152000
    },
    pareto: {
      price: 0.50,
      elo: 1110,
      isFrontier: true
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
    isOpenSource: true,
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
      votes: 89000
    },
    daElo: {
      score: 995,
      rank: 18,
      total: 19,
      votes: 84000
    },
    pareto: {
      price: 0.25,
      elo: 995,
      isFrontier: true
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
];

export const PARETO_CURVE_POINTS = [
  { price: 0.25, elo: 995, name: "SDXL Turbo" },
  { price: 0.50, elo: 1110, name: "FLUX.1 [schnell]" },
  { price: 2.00, elo: 1135, name: "SD 3.5 Large" },
  { price: 2.50, elo: 1172, name: "FLUX.1 [dev]" },
  { price: 3.50, elo: 1220, name: "Ideogram v2" },
  { price: 4.00, elo: 1246, name: "Recraft V3" }
];
