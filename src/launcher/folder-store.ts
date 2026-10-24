import { reactive, readonly, type DeepReadonly } from "vue";

export interface LauncherFolderLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  customIcon?: string;
  note?: string;
  group?: string;
}

export interface LauncherChildFolder {
  groupName: string;
  links: LauncherFolderLink[];
  count: number;
}

export interface LauncherFolderPosition {
  left?: number;
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  maxHeight?: number | string;
}

export interface LauncherFolderState {
  mounted: boolean;
  isOpen: boolean;
  activeFolder: string;
  links: LauncherFolderLink[];
  folders: LauncherChildFolder[];
  parentFolder: string;
  position: LauncherFolderPosition | null;
  isDragging: boolean;
  dropHoverValid: boolean;
}

export const folderState = reactive<LauncherFolderState>({
  mounted: false,
  isOpen: false,
  activeFolder: "",
  links: [],
  folders: [],
  parentFolder: "",
  position: null,
  isDragging: false,
  dropHoverValid: false
});

export type LauncherFolderActionHandler = (action: string, payload?: any) => void;
let actionHandler: LauncherFolderActionHandler | null = null;

export const launcherFolderController = {
  get state() {
    return folderState;
  },

  getSnapshot(): DeepReadonly<LauncherFolderState> {
    return readonly(folderState);
  },

  setMounted(mounted: boolean) {
    folderState.mounted = mounted;
  },

  openFolder(groupName: string, links: LauncherFolderLink[], position?: LauncherFolderPosition | null) {
    folderState.isOpen = true;
    folderState.activeFolder = groupName;
    folderState.links = [...links];
    if (position) {
      folderState.position = { ...position };
    }
  },

  closeFolder() {
    folderState.folders = [];
    folderState.parentFolder = "";
    folderState.isOpen = false;
    folderState.activeFolder = "";
    folderState.isDragging = false;
    folderState.dropHoverValid = false;
  },

  setLinks(links: LauncherFolderLink[]) {
    folderState.links = [...links];
  },

  setFolders(folders: LauncherChildFolder[], parent?: string) {
    folderState.folders = folders;
    folderState.parentFolder = parent || "";
  },

  setActiveFolder(groupName: string) {
    folderState.activeFolder = groupName;
  },

  setPosition(position: LauncherFolderPosition | null) {
    folderState.position = position ? { ...position } : null;
  },

  setDragging(isDragging: boolean) {
    folderState.isDragging = isDragging;
  },

  setDropHoverValid(valid: boolean) {
    folderState.dropHoverValid = valid;
  },

  setActionHandler(handler: LauncherFolderActionHandler | null) {
    actionHandler = handler;
  },

  dispatch(action: string, payload?: any) {
    actionHandler?.(action, payload);
  }
};
