import { reactive } from "vue";

export type SettingsSection = "modules" | "shortcuts" | "privacy" | "limbus" | "wallpaper" | "sync" | "storage" | "bili-cache" | "stickers";
export type StorageSettingsTarget = "stickers" | "bili-cache";

export interface SettingsDialogState {
  mounted: boolean;
  isOpen: boolean;
  frameSrc: string;
  requestedSection: SettingsSection | null;
  requestedStorageTarget: StorageSettingsTarget | null;
  sectionRequest: number;
}

const state = reactive<SettingsDialogState>({
  mounted: false,
  isOpen: false,
  frameSrc: "",
  requestedSection: null,
  requestedStorageTarget: null,
  sectionRequest: 0
});

type SettingsActionCallback = (action: string, payload?: any) => void | Promise<void>;
let actionCallback: SettingsActionCallback | null = null;

export const settingsController = {
  state,

  setMounted(mounted: boolean) {
    state.mounted = mounted;
  },

  onAction(cb: SettingsActionCallback) {
    actionCallback = cb;
  },

  dispatch(action: string, payload?: any) {
    if (actionCallback) {
      return actionCallback(action, payload);
    }
    return undefined;
  },

  open(section?: SettingsSection, storageTarget?: StorageSettingsTarget) {
    if (section) {
      // Preserve old module deep links without keeping duplicate settings categories.
      const legacyDirectory = section === "bili-cache" || section === "stickers";
      state.requestedSection = legacyDirectory ? "storage" : section;
      state.requestedStorageTarget = legacyDirectory ? section : section === "storage" ? storageTarget ?? null : null;
      ++state.sectionRequest;
    }
    state.isOpen = true;
    this.dispatch("open");
  },

  minimize() {
    state.isOpen = false;
    this.dispatch("minimize");
  },

  close() {
    state.isOpen = false;
    this.dispatch("close");
  },

  toggle() {
    if (state.isOpen) this.minimize();
    else this.open();
  }
};
