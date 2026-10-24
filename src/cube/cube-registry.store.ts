import { reactive, readonly, toRaw } from "vue";

export type CustomFaceType = "memo" | "countdown" | "link";

export interface CubeCustomData {
  text?: string;
  targetDate?: string; // YYYY-MM-DD
  url?: string;
}

export interface CubeFaceDefinition {
  id: string;
  title: string;
  icon: string;
  desc: string;
  builtIn: boolean;
  customType?: CustomFaceType;
  customData?: CubeCustomData;
}

const BUILTIN_FACES: CubeFaceDefinition[] = [
  {
    id: "music",
    title: "音乐与歌词",
    icon: "🎵",
    desc: "聚合网易云、塞壬唱片与B站电台的播放控制及同步歌词流",
    builtIn: true
  }
];

/** 所有入口共用数据校验；配置不执行脚本或 HTML。 */
export function validateCustomFace(value: any): { title: string; icon: string; desc: string; customType: CustomFaceType; customData: CubeCustomData } {
  if (!value || typeof value.title !== "string" || !value.title.trim()) throw new Error("请填写面标题");
  if (!["memo", "countdown", "link"].includes(value.customType)) throw new Error("类型仅支持 memo、countdown、link");
  const data = value.customData || {};
  const customData: CubeCustomData = {};
  if (value.customType === "memo") {
    if (typeof data.text !== "string" || !data.text.trim()) throw new Error("请填写文本");
    customData.text = data.text.slice(0, 500);
  } else if (value.customType === "countdown") {
    if (typeof data.targetDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.targetDate) || !Number.isFinite(Date.parse(data.targetDate))) throw new Error("日期格式须为 YYYY-MM-DD");
    customData.targetDate = data.targetDate;
  } else {
    const url = new URL(data.url);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("仅支持无账号密码的 HTTP(S) 链接");
    customData.url = url.href;
  }
  return { title: value.title.trim().slice(0, 60), icon: typeof value.icon === "string" ? value.icon.slice(0, 16) : "◇", desc: typeof value.desc === "string" ? value.desc.slice(0, 200) : "", customType: value.customType, customData };
}

const STORAGE_ACTIVE_KEY = "logicweaver_cube_active_face_ids";
const STORAGE_CUSTOM_KEY = "logicweaver_cube_custom_faces";

export interface CubeRegistryState {
  registeredFaces: CubeFaceDefinition[];
  activeFaceIds: string[];
  isConfigDialogOpen: boolean;
}

function loadSavedCustomFaces(): CubeFaceDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const seen = new Set<string>();
        return parsed.flatMap(item => {
          try {
            if (!item || typeof item.id !== "string" || item.builtIn || ["music", "traffic", "timer", "github", "schedule"].includes(item.id) || seen.has(item.id)) return [];
            const face = { ...validateCustomFace(item), id: item.id, builtIn: false };
            seen.add(item.id);
            return [face];
          } catch { return []; }
        });
      }
    }
  } catch {}
  return [];
}

function loadSavedActiveIds(availableIds: string[]): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_ACTIVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // 过滤掉已失效的 ID 并去重
        const valid = parsed.filter(id => typeof id === "string" && availableIds.includes(id));
        if (valid.length || parsed.length === 0) return Array.from(new Set(valid));
      }
    }
  } catch {}
  // 新安装或仅含已退役面时，默认音乐。显式空数组保持为空。
  return BUILTIN_FACES.map(f => f.id);
}

function persistConfig(activeIds: string[], customFaces: CubeFaceDefinition[]) {
  try {
    localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(activeIds));
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(customFaces));
  } catch {
    throw new Error("立方体配置保存失败；本页已变化，刷新后可能恢复，请检查浏览器存储空间。");
  }
}

const initialCustom = loadSavedCustomFaces();
const allInitialFaces = [...BUILTIN_FACES, ...initialCustom];
const initialActive = loadSavedActiveIds(allInitialFaces.map(f => f.id));

const state = reactive<CubeRegistryState>({
  registeredFaces: allInitialFaces,
  activeFaceIds: initialActive,
  isConfigDialogOpen: false
});

export const cubeRegistryStore = {
  get state() {
    return readonly(state);
  },

  /** 当前所有启用的面列表（按用户配置的旋转顺序排列） */
  getActiveFaces(): CubeFaceDefinition[] {
    const map = new Map<string, CubeFaceDefinition>();
    for (const f of state.registeredFaces) {
      map.set(f.id, f);
    }
    const result: CubeFaceDefinition[] = [];
    for (const id of state.activeFaceIds) {
      const face = map.get(id);
      if (face) result.push(face);
    }
    return result;
  },

  /** 判断某个面当前是否处于启用轮播状态 */
  isActive(faceId: string): boolean {
    return state.activeFaceIds.includes(faceId);
  },

  /** 动态注册一个新面（供模块、插件或自定义脚本注册） */
  registerFace(face: CubeFaceDefinition, autoEnable = true) {
    if (!face.id || ["music", "traffic", "timer", "github", "schedule"].includes(face.id)) throw new Error("此面 ID 为系统保留");
    face = { ...validateCustomFace(face), id: face.id, builtIn: false };
    const exists = state.registeredFaces.findIndex(f => f.id === face.id);
    if (exists >= 0) {
      state.registeredFaces[exists] = face;
    } else {
      state.registeredFaces.push(face);
    }
    if (autoEnable && !state.activeFaceIds.includes(face.id)) {
      state.activeFaceIds.push(face.id);
    }
    this.save();
    const registered = face;
    return () => {
      const current = state.registeredFaces.find(f => f.id === registered.id);
      if (current && toRaw(current) === registered) cubeRegistryStore.unregisterFace(registered.id);
    };
  },

  /** 注销一个非内置面 */
  unregisterFace(faceId: string) {
    state.registeredFaces = state.registeredFaces.filter(f => f.id !== faceId || f.builtIn);
    state.activeFaceIds = state.activeFaceIds.filter(id => id !== faceId);
    this.save();
  },

  /** 开启或关闭某个面的轮播显示 */
  toggleActive(faceId: string, enabled?: boolean) {
    const shouldEnable = enabled !== undefined ? enabled : !state.activeFaceIds.includes(faceId);
    if (shouldEnable) {
      if (!state.registeredFaces.some(f => f.id === faceId)) return;
      if (!state.activeFaceIds.includes(faceId)) {
        state.activeFaceIds.push(faceId);
      }
    } else {
      state.activeFaceIds = state.activeFaceIds.filter(id => id !== faceId);
    }
    this.save();
  },

  /** 向上移动某个面的轮播次序 */
  moveUp(faceId: string) {
    const idx = state.activeFaceIds.indexOf(faceId);
    if (idx <= 0) return;
    const temp = state.activeFaceIds[idx - 1];
    state.activeFaceIds[idx - 1] = faceId;
    state.activeFaceIds[idx] = temp;
    this.save();
  },

  /** 向下移动某个面的轮播次序 */
  moveDown(faceId: string) {
    const idx = state.activeFaceIds.indexOf(faceId);
    if (idx < 0 || idx >= state.activeFaceIds.length - 1) return;
    const temp = state.activeFaceIds[idx + 1];
    state.activeFaceIds[idx + 1] = faceId;
    state.activeFaceIds[idx] = temp;
    this.save();
  },

  /** 添加用户自定义面 */
  addCustomFace(options: {
    title: string;
    icon?: string;
    desc?: string;
    customType: CustomFaceType;
    customData: CubeCustomData;
  }) {
    options = validateCustomFace(options);
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newFace: CubeFaceDefinition = {
      id,
      title: options.title.trim() || "未命名自定义面",
      icon: options.icon?.trim() || (options.customType === "memo" ? "📝" : options.customType === "countdown" ? "⏳" : "🔗"),
      desc: options.desc?.trim() || "用户自定义立方体面",
      builtIn: false,
      customType: options.customType,
      customData: options.customData
    };
    state.registeredFaces.push(newFace);
    state.activeFaceIds.push(id);
    this.save();
    return id;
  },

  /** 删除面；音乐只移出轮播，可再次添加或恢复默认。 */
  removeCustomFace(faceId: string) {
    const target = state.registeredFaces.find(f => f.id === faceId);
    if (!target) return;
    this.unregisterFace(faceId);
  },

  /** 恢复仅音乐；保留自定义定义但移出轮播。 */
  resetDefaults() {
    state.registeredFaces = [...BUILTIN_FACES, ...state.registeredFaces.filter(f => !f.builtIn)];
    state.activeFaceIds = BUILTIN_FACES.map(f => f.id);
    this.save();
  },

  openConfigDialog() {
    state.isConfigDialogOpen = true;
  },

  closeConfigDialog() {
    state.isConfigDialogOpen = false;
  },

  save() {
    const custom = state.registeredFaces.filter(f => !f.builtIn);
    persistConfig(state.activeFaceIds, custom);
  }
};

// 暴露全局 API，允许其它模块或外部扩展通过 JS 调用注册新面
if (typeof window !== "undefined") {
  (window as any).LogicWeaverCube = {
    registerFace: (face: CubeFaceDefinition, autoEnable = true) => cubeRegistryStore.registerFace(face, autoEnable),
    unregisterFace: (faceId: string) => cubeRegistryStore.unregisterFace(faceId),
    openConfig: () => cubeRegistryStore.openConfigDialog(),
    getActiveFaces: () => cubeRegistryStore.getActiveFaces()
  };
}
