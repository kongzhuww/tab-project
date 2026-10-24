import { reactive } from "vue";

export type BookmarkMenuMode = "actions" | "launcher" | "rename" | "note" | "delete";

export interface BookmarkMenuItem {
  id: string;
  title?: string;
  url?: string;
  isFolder?: boolean;
  [key: string]: any;
}

export interface BookmarkNoteMenuState {
  mounted: boolean;
  isOpen: boolean;
  left: number;
  top: number;
  item: BookmarkMenuItem | null;
  isFolder: boolean;
  title: string;
  hostOrCount: string;
  iconUrl: string;
  mode: BookmarkMenuMode;
  renameValue: string;
  noteValue: string;
  launcherGroups: string[];
  selectedLauncherGroup: string;
  statusText: string;
  statusVisible: boolean;
}

const state = reactive<BookmarkNoteMenuState>({
  mounted: false,
  isOpen: false,
  left: 0,
  top: 0,
  item: null,
  isFolder: false,
  title: "",
  hostOrCount: "",
  iconUrl: "",
  mode: "actions",
  renameValue: "",
  noteValue: "",
  launcherGroups: ["常用网站"],
  selectedLauncherGroup: "常用网站",
  statusText: "",
  statusVisible: false
});

type BookmarkMenuActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: BookmarkMenuActionCallback | null = null;

export const bookmarkMenuController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  onAction(cb: BookmarkMenuActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    return undefined;
  },

  openMenu(
    item: BookmarkMenuItem,
    clientX: number,
    clientY: number,
    opts?: {
      hostOrCount?: string;
      iconUrl?: string;
      note?: string;
      launcherGroups?: string[];
    }
  ) {
    state.item = item;
    state.isFolder = item.isFolder === true || !item.url;
    state.title = item.title || (state.isFolder ? "未命名文件夹" : (item.url || ""));
    state.hostOrCount = opts?.hostOrCount || (state.isFolder ? "浏览器文件夹" : (item.url || ""));
    state.iconUrl = opts?.iconUrl || "";
    state.mode = "actions";
    state.renameValue = item.title || "";
    state.noteValue = opts?.note || "";
    if (opts?.launcherGroups?.length) {
      state.launcherGroups = [...opts.launcherGroups];
      state.selectedLauncherGroup = opts.launcherGroups[0];
    }
    state.statusVisible = false;
    state.statusText = "";

    const left = Math.max(10, Math.min(clientX, window.innerWidth - 300));
    const top = Math.max(10, Math.min(clientY, window.innerHeight - 350));
    state.left = left;
    state.top = top;
    state.isOpen = true;

    this.dispatch("open", { item, clientX, clientY });
  },

  closeMenu() {
    state.isOpen = false;
    state.mode = "actions";
    state.item = null;
    this.dispatch("close");
  },

  setMode(mode: BookmarkMenuMode) {
    state.mode = mode;
    state.statusVisible = false;
    state.statusText = "";
    this.dispatch("set-mode", mode);
  },

  setStatus(text: string) {
    state.statusText = text;
    state.statusVisible = !!text;
  },

  openBookmark() {
    this.dispatch("open-bookmark", state.item);
  },

  newSubFolder() {
    this.dispatch("new-folder", state.item);
  },

  saveToLauncher() {
    this.dispatch("save-launcher", {
      item: state.item,
      group: state.selectedLauncherGroup
    });
  },

  saveRename() {
    if (!state.renameValue.trim()) {
      this.setStatus("名称不能为空");
      return;
    }
    this.dispatch("save-rename", {
      item: state.item,
      newTitle: state.renameValue.trim()
    });
  },

  saveNote() {
    this.dispatch("save-note", {
      item: state.item,
      note: state.noteValue.trim()
    });
  },

  confirmDelete() {
    this.dispatch("delete-bookmark", state.item);
  }
};
