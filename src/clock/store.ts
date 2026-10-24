import { reactive, readonly } from "vue";

export interface ClockSnapshot {
  timeText: string;
  secsText: string;
  greetingText: string;
  dateText: string;
  fontFamily: string;
  colorHex: string;
  greetColor: string;
  dateColor: string;
  isBlack: boolean;
  isCustomColor: boolean;
  updatedAt: number | null;
}

export interface ClockController {
  update(snapshot: Partial<ClockSnapshot>): void;
  updateTime(timeText: string, secsText: string, greetingText: string, dateText: string): void;
  applyConfig(config: {
    fontFamily?: string;
    colorHex?: string;
    greetColor?: string;
    dateColor?: string;
    isBlack?: boolean;
    isCustomColor?: boolean;
  }): void;
  openSettings(event?: MouseEvent): void;
  setOpenSettingsAction(handler: (event?: MouseEvent) => void): void;
  readonly snapshot: Readonly<ClockSnapshot>;
}

const initialState = (): ClockSnapshot => ({
  timeText: "--:--",
  secsText: ":--",
  greetingText: "你好",
  dateText: "",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  colorHex: "#ffffff",
  greetColor: "#ffffff",
  dateColor: "#ffffff",
  isBlack: false,
  isCustomColor: false,
  updatedAt: null
});

export const clockState = reactive<ClockSnapshot>(initialState());

let openSettingsHandler: ((event?: MouseEvent) => void) | null = null;

export const clockController: ClockController = {
  get snapshot() {
    return readonly(clockState);
  },
  update(snapshot) {
    Object.assign(clockState, snapshot);
  },
  updateTime(timeText, secsText, greetingText, dateText) {
    clockState.timeText = timeText;
    clockState.secsText = secsText;
    clockState.greetingText = greetingText;
    clockState.dateText = dateText;
    clockState.updatedAt = Date.now();
  },
  applyConfig(config) {
    if (config.fontFamily !== undefined) clockState.fontFamily = config.fontFamily;
    if (config.colorHex !== undefined) clockState.colorHex = config.colorHex;
    if (config.greetColor !== undefined) clockState.greetColor = config.greetColor;
    if (config.dateColor !== undefined) clockState.dateColor = config.dateColor;
    if (config.isBlack !== undefined) clockState.isBlack = config.isBlack;
    if (config.isCustomColor !== undefined) clockState.isCustomColor = config.isCustomColor;
    clockState.updatedAt = Date.now();
  },
  openSettings(event) {
    if (openSettingsHandler) openSettingsHandler(event);
    else window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: event?.clientX, clientY: event?.clientY } }));
  },
  setOpenSettingsAction(handler) {
    openSettingsHandler = handler;
  }
};
