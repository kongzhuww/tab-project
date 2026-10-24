import { reactive } from "vue";

export interface BookmarkFolderChip {
  id: string;
  title: string;
  parentId?: string;
}

export interface BookmarkFolderStripState {
  mounted: boolean;
  enabled: boolean;
  folders: BookmarkFolderChip[];
  emptyMessage: string;
}

export const bookmarkFolderStripState = reactive<BookmarkFolderStripState>({
  mounted: false,
  enabled: false,
  folders: [],
  emptyMessage: "书签栏没有文件夹"
});

const state = bookmarkFolderStripState;

type BookmarkFolderActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: BookmarkFolderActionCallback | null = null;

export const bookmarkFolderStripController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  updateState(partial: Partial<BookmarkFolderStripState>) {
    Object.assign(state, partial);
  },

  setEnabled(enabled: boolean) {
    state.enabled = enabled;
  },

  setFolders(folders: BookmarkFolderChip[]) {
    state.folders = Array.isArray(folders) ? [...folders] : [];
  },

  onAction(cb: BookmarkFolderActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    return undefined;
  },

  openFolder(id: string) {
    this.dispatch("open-folder", { id });
  },

  openContextMenu(folder: BookmarkFolderChip, clientX: number, clientY: number) {
    this.dispatch("context-menu", { folder, clientX, clientY });
  }
};
