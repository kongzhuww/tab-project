import { reactive } from "vue";
import { searchLauncherIcons } from "../services/launcher-icon-search.service";
import { launcherService } from "../services/launcher.service";
import { appDialog } from "../core/app-dialog.store";
import { notifications } from "../sdk/notifications";

export interface IconPickerItem {
  url: string;
  source?: string;
  name?: string;
}

export interface MoveOptionItem {
  id: string;
  name: string;
}

export interface LauncherDialogsState {
  mounted: boolean;
  editDialog: {
    isOpen: boolean;
    id: string;
    title: string;
    url: string;
    group: string;
    note: string;
    isNew: boolean;
  };
  iconPicker: {
    isOpen: boolean;
    query: string;
    targetUrl: string;
    targetId: string;
    results: IconPickerItem[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    selectedIconUrl: string;
    isSaving: boolean;
    session: number;
    previewTargetTitle: string;
    customUrl: string;
    isCustomPanelOpen: boolean;
    isLoading: boolean;
  };
  linkMove: {
    isOpen: boolean;
    linkTitle: string;
    pages: MoveOptionItem[];
    folders: MoveOptionItem[];
    targetPageId: string;
    targetFolderId: string;
    showFolderSelect: boolean;
  };
  folderMove: {
    isOpen: boolean;
    folderTitle: string;
    pages: MoveOptionItem[];
    targetPageId: string;
  };
  groupMerge: {
    isOpen: boolean;
    groupTitle: string;
    groups: string[];
    targetGroup: string;
  };
  folderDelete: {
    isOpen: boolean;
    groupName: string;
    count: number;
    hint: string;
  };
}

export const launcherDialogsState = reactive<LauncherDialogsState>({
  mounted: false,
  editDialog: {
    isOpen: false,
    id: "",
    title: "",
    url: "",
    group: "",
    note: "",
    isNew: true
  },
  iconPicker: {
    isOpen: false,
    query: "",
    targetUrl: "",
    targetId: "",
    results: [],
    currentPage: 1,
    pageSize: 8,
    totalPages: 1,
    selectedIconUrl: "",
    isSaving: false,
    session: 0,
    previewTargetTitle: "",
    customUrl: "",
    isCustomPanelOpen: false,
    isLoading: false
  },
  linkMove: {
    isOpen: false,
    linkTitle: "",
    pages: [],
    folders: [],
    targetPageId: "",
    targetFolderId: "",
    showFolderSelect: false
  },
  folderMove: {
    isOpen: false,
    folderTitle: "",
    pages: [],
    targetPageId: ""
  },
  groupMerge: {
    isOpen: false,
    groupTitle: "",
    groups: [],
    targetGroup: ""
  },
  folderDelete: {
    isOpen: false,
    groupName: "",
    count: 0,
    hint: ""
  }
});

const state = launcherDialogsState;

let folderDeleteHandlers: {
  onRelease?: () => void | Promise<void>;
  onDeleteAll?: () => void | Promise<void>;
  onCancel?: () => void;
} | null = null;

type LauncherDialogActionCallback = (dialog: string, action: string, payload?: any) => void | Promise<void>;
let actionCallback: LauncherDialogActionCallback | null = null;
let iconSearchVersion = 0;
let iconSaveHandler: ((icon: string) => Promise<void>) | undefined;
let movingLinkId = "";

export const launcherDialogsController = {
  state,

  updateState(partial: Partial<LauncherDialogsState>) {
    Object.assign(state, partial);
  },

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  onAction(cb: LauncherDialogActionCallback) {
    actionCallback = cb;
  },

  dispatch(dialog: string, action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(dialog, action, payload);
    }
    return undefined;
  },

  // --- 1. 编辑/添加弹窗 ---
  openEditDialog(data: { id?: string; title?: string; url?: string; group?: string; note?: string }) {
    state.editDialog.isOpen = true;
    state.editDialog.id = data.id || "";
    state.editDialog.title = data.title || "";
    state.editDialog.url = data.url || "";
    state.editDialog.group = data.group || "常用网站";
    state.editDialog.note = data.note || "";
    state.editDialog.isNew = !data.id;
    this.dispatch("edit", "open", data);
  },

  closeEditDialog() {
    state.editDialog.isOpen = false;
    this.dispatch("edit", "close");
  },

  async submitEditDialog(): Promise<void> {
    try {
      await launcherService.saveLink({
        id: state.editDialog.id,
        title: state.editDialog.title.trim(),
        url: state.editDialog.url.trim(),
        group: state.editDialog.group.trim(),
        note: state.editDialog.note.trim()
      });
      this.closeEditDialog();
    } catch (error) {
      console.warn("[Launcher] 保存网站失败", error);
      void appDialog.alert({ title: "保存失败", message: "保存失败，请检查网址或存储状态后重试。" });
    }
  },

  async deleteFromEditDialog(): Promise<void> {
    try {
      if (state.editDialog.id) await launcherService.deleteLink(state.editDialog.id);
      this.closeEditDialog();
    } catch (error) {
      console.warn("[Launcher] 删除网站失败", error);
      void appDialog.alert({ title: "删除失败", message: "删除失败，请重试。" });
    }
  },

  // --- 2. 图标选择弹窗 ---
  openIconPicker(targetTitle: string, initialQuery: string = "", targetUrl: string = "", targetId: string = "", saveIcon?: (icon: string) => Promise<void>) {
    if (state.iconPicker.isSaving) return;
    iconSaveHandler = saveIcon;
    state.iconPicker.session++;
    iconSearchVersion++;
    state.iconPicker.targetUrl = targetUrl;
    state.iconPicker.targetId = targetId;
    state.iconPicker.customUrl = "";
    state.iconPicker.isLoading = false;
    state.iconPicker.totalPages = 1;
    state.iconPicker.results = [];
    state.iconPicker.isOpen = true;
    state.iconPicker.previewTargetTitle = targetTitle;
    state.iconPicker.query = initialQuery || targetTitle;
    state.iconPicker.selectedIconUrl = "";
    state.iconPicker.isCustomPanelOpen = false;
    state.iconPicker.currentPage = 1;
    this.dispatch("icon-picker", "open", { targetTitle, query: state.iconPicker.query });
  },

  closeIconPicker() {
    if (state.iconPicker.isSaving) return;
    iconSaveHandler = undefined;
    state.iconPicker.session++;
    iconSearchVersion++;
    state.iconPicker.isOpen = false;
    this.dispatch("icon-picker", "close");
  },

  async searchIcons(query: string, url: string = state.iconPicker.targetUrl): Promise<void> {
    if (state.iconPicker.isSaving) return;
    const version = ++iconSearchVersion;
    state.iconPicker.query = query;
    state.iconPicker.results = [];
    state.iconPicker.currentPage = 1;
    state.iconPicker.isLoading = true;
    try {
      const results = await searchLauncherIcons(query, url, (batch) => {
        if (version === iconSearchVersion && state.iconPicker.isOpen) this.setIconPickerResults(batch);
      });
      if (version === iconSearchVersion && state.iconPicker.isOpen) this.setIconPickerResults(results);
    } finally {
      if (version === iconSearchVersion) state.iconPicker.isLoading = false;
    }
  },

  setIconPickerResults(results: IconPickerItem[], totalPages?: number) {
    state.iconPicker.results = results;
    state.iconPicker.totalPages = totalPages || Math.max(1, Math.ceil(results.length / state.iconPicker.pageSize));
    state.iconPicker.isLoading = false;
  },

  selectIcon(url: string) {
    state.iconPicker.selectedIconUrl = url;
  },

  async confirmIcon(): Promise<void> {
    const { targetId, selectedIconUrl, isOpen, isSaving } = state.iconPicker;
    const save = iconSaveHandler;
    if (!isOpen || isSaving || (!targetId && !save) || !selectedIconUrl) return;
    state.iconPicker.isSaving = true;
    try {
      if (save) await save(selectedIconUrl);
      else await launcherService.setLinkIcon(targetId, selectedIconUrl);
      state.iconPicker.isSaving = false;
      this.closeIconPicker();
    } catch (error) {
      notifications.show({ appName: '网站头像', title: '保存未完成', message: error instanceof Error ? error.message : '请核对存储状态后再操作。' });
    } finally {
      state.iconPicker.isSaving = false;
    }
  },

  // --- 3. 网站移动弹窗 ---
  openLinkMove(title: string, pages: MoveOptionItem[], folders: MoveOptionItem[], defaultPageId?: string, linkId: string = "") {
    movingLinkId = linkId;
    state.linkMove.isOpen = true;
    state.linkMove.linkTitle = title;
    state.linkMove.pages = [...pages];
    state.linkMove.folders = [...folders];
    state.linkMove.targetPageId = defaultPageId || (pages[0]?.id ?? "");
    state.linkMove.targetFolderId = "";
    state.linkMove.showFolderSelect = folders.length > 0;
    this.dispatch("link-move", "open", { title });
  },

  closeLinkMove() {
    state.linkMove.isOpen = false;
    this.dispatch("link-move", "close");
  },

  async confirmLinkMove() {
    const link = launcherService.getState().links.find((item) => item.id === movingLinkId);
    if (!link || !state.linkMove.targetPageId) return;
    try {
      await launcherService.moveLinkTo(link.id, state.linkMove.targetPageId, state.linkMove.targetFolderId || link.group);
      this.closeLinkMove();
    } catch (error) { console.warn("[Launcher] 移动网站失败", error); }
  },

  // --- 4. 文件夹跨分区移动 ---
  openFolderMove(title: string, pages: MoveOptionItem[], defaultPageId?: string) {
    state.folderMove.isOpen = true;
    state.folderMove.folderTitle = title;
    state.folderMove.pages = [...pages];
    state.folderMove.targetPageId = defaultPageId || (pages[0]?.id ?? "");
    this.dispatch("folder-move", "open", { title });
  },

  closeFolderMove() {
    state.folderMove.isOpen = false;
    this.dispatch("folder-move", "close");
  },

  async confirmFolderMove() {
    if (!state.folderMove.folderTitle || !state.folderMove.targetPageId) return;
    try {
      await launcherService.moveFolderToPage(state.folderMove.folderTitle, state.folderMove.targetPageId);
      this.closeFolderMove();
    } catch (error) { console.warn("[Launcher] 移动文件夹失败", error); }
  },

  // --- 5. 合并收藏夹 ---
  openGroupMerge(title: string, groups: string[]) {
    state.groupMerge.isOpen = true;
    state.groupMerge.groupTitle = title;
    state.groupMerge.groups = [...groups];
    state.groupMerge.targetGroup = groups[0] || "";
    this.dispatch("group-merge", "open", { title });
  },

  closeGroupMerge() {
    state.groupMerge.isOpen = false;
    this.dispatch("group-merge", "close");
  },

  async confirmGroupMerge() {
    try {
      await launcherService.mergeGroups(state.groupMerge.groupTitle, state.groupMerge.targetGroup);
      this.closeGroupMerge();
    } catch (error) { console.warn("[Launcher] 合并文件夹失败", error); }
  },

  // --- 6. 文件夹删除确认 ---
  openFolderDeleteDialog(payload: {
    groupName: string;
    count: number;
    hint?: string;
    onRelease?: () => void | Promise<void>;
    onDeleteAll?: () => void | Promise<void>;
    onCancel?: () => void;
  }) {
    state.folderDelete.isOpen = true;
    state.folderDelete.groupName = payload.groupName;
    state.folderDelete.count = payload.count;
    state.folderDelete.hint = payload.hint || "";
    folderDeleteHandlers = {
      onRelease: payload.onRelease,
      onDeleteAll: payload.onDeleteAll,
      onCancel: payload.onCancel
    };
    this.dispatch("folder-delete", "open", { groupName: payload.groupName, count: payload.count });
  },

  closeFolderDeleteDialog() {
    state.folderDelete.isOpen = false;
    const handler = folderDeleteHandlers?.onCancel;
    folderDeleteHandlers = null;
    handler?.();
    this.dispatch("folder-delete", "close");
  },

  async releaseFolderDelete() {
    state.folderDelete.isOpen = false;
    const handler = folderDeleteHandlers?.onRelease;
    folderDeleteHandlers = null;
    if (handler) await handler();
    this.dispatch("folder-delete", "release");
  },

  async deleteAllFolderDelete() {
    state.folderDelete.isOpen = false;
    const handler = folderDeleteHandlers?.onDeleteAll;
    folderDeleteHandlers = null;
    if (handler) await handler();
    this.dispatch("folder-delete", "delete-all");
  }
};
