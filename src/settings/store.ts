import { reactive } from "vue";

export type SettingsSection = "modules" | "shortcuts" | "privacy" | "wallpaper" | "sync";

export interface SettingsDialogState {
  mounted: boolean;
  isOpen: boolean;
  frameSrc: string;
  requestedSection: SettingsSection | null;
  sectionRequest: number;
}

const state = reactive<SettingsDialogState>({
  mounted: false,
  isOpen: false,
  frameSrc: "",
  requestedSection: null,
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

  open(section?: SettingsSection) {
    if (section) {
      state.requestedSection = section;
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
