import { shallowReactive } from "vue";

export interface StickerFolderNode {
  name: string;
  path: string;
  depth: number;
  itemCount: number;
  subDirs: StickerFolderNode[];
  isExpanded?: boolean;
}

export interface StickerCardItem {
  id: string;
  file: string;
  relPath: string;
  folderName?: string;
  size: number;
  sizeText: string;
  url?: string;
}

export interface StickerSubnavPill {
  name: string;
  path: string;
  count: number;
  isActive: boolean;
}

export interface StickerBreadcrumb {
  name: string;
  path: string;
}

export interface StickerSubFolderCard {
  name: string;
  path: string;
  count: number;
}

export interface StickerBoardState {
  storageKind: "directory" | "indexeddb" | null;
  hasFolder: boolean;
  folderPath: string;
  folderSummary: string;
  rootName: string;
  libraryImageCount: number | null;
  needsReadPermission: boolean;
  activePath: string;
  displayTitle: string;
  breadcrumb: string;
  breadcrumbs: StickerBreadcrumb[];
  parentPath: string | null;
  subFolders: StickerSubFolderCard[];
  dropPrompt: string;
  totalCountText: string;
  folders: StickerFolderNode[];
  subnavPills: StickerSubnavPill[];
  items: StickerCardItem[];
  emptyText: string;
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

const initialState = (): StickerBoardState => ({
  storageKind: null,
  hasFolder: false,
  folderPath: "正在读取图片库…",
  folderSummary: "0 个分类",
  rootName: "",
  libraryImageCount: null,
  needsReadPermission: false,
  activePath: "",
  displayTitle: "请选择表情包",
  breadcrumb: "",
  breadcrumbs: [],
  parentPath: null,
  subFolders: [],
  dropPrompt: "拖入图片，自动保存到当前选中的文件夹",
  totalCountText: "0 张",
  folders: [],
  subnavPills: [],
  items: [],
  emptyText: "",
  loading: false,
  hasMore: false,
  currentPage: 1,
  pageSize: 12,
  totalPages: 1,
  totalCount: 0
});
export type StickerBoardAction =
  | "choose-folder" | "refresh" | "create-folder" | "select-folder"
  | "rename-folder" | "delete-folder" | "reorder-folders" | "assign-item"
  | "load-more" | "prev-page" | "next-page" | "go-page"
  | "toggle-expand" | "select-pill" | "pick-files" | "copy-item" | "delete-item";
export type StickerBoardActionHandler = (action: StickerBoardAction, payload?: any) => void | Promise<void>;
export function createStickerBoardController() {
  const state = shallowReactive<StickerBoardState>(initialState());
  const handlers = new Set<StickerBoardActionHandler>();
  return {
    get state() { return state; },
    reset() { Object.assign(state, initialState()); },
    updateState(partial: Partial<StickerBoardState>) { Object.assign(state, partial); },
    setItems(items: StickerCardItem[]) { state.items = [...items]; },
    onAction(handler: StickerBoardActionHandler): () => void {
      handlers.add(handler); return () => { handlers.delete(handler); };
    },
    async dispatch(action: StickerBoardAction, payload?: any): Promise<void> {
      for (const handler of handlers) await handler(action, payload);
    }
  };
}
export type StickerBoardController = ReturnType<typeof createStickerBoardController>;
export const stickerBoardController = createStickerBoardController();
export const stickerBoardState = stickerBoardController.state;
