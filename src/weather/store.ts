import { reactive, readonly } from "vue";

export type WeatherStateKind = "unconfigured" | "loading" | "ready" | "not_found" | "error";

export interface WeatherHourItem {
  readonly time: string;
  readonly emoji: string;
  readonly temp: number | string;
}

export interface WeatherDayItem {
  readonly label: string;
  readonly emoji: string;
  readonly tempRange: string;
}

export interface WeatherForecastItem {
  readonly date: string;
  readonly dayName: string;
  readonly emoji: string;
  readonly condition: string;
  readonly highTemp: number;
  readonly lowTemp: number;
  readonly rainProb: number;
}

export interface WeatherDetailInfo {
  readonly humidity?: string;
  readonly wind?: string;
  readonly uvIndex?: string;
  readonly airQuality?: string;
}

export interface WeatherData {
  readonly cityName: string;
  readonly currentEmoji: string;
  readonly currentTemp: number | string;
  readonly subText: string;
  readonly rainText: string;
  readonly hours: readonly WeatherHourItem[];
  readonly days: readonly WeatherDayItem[];
}

export interface WeatherSnapshot {
  state: WeatherStateKind;
  city: string;
  errorMessage: string;
  data: WeatherData | null;
  updatedAt: number | null;
  forecastModalOpen: boolean;
  forecastDays: readonly WeatherForecastItem[];
  detailInfo: WeatherDetailInfo | null;
}

export interface WeatherController {
  update(snapshot: Partial<WeatherSnapshot>): void;
  unconfigured(): void;
  loading(city?: string): void;
  ready(data: WeatherData, city?: string): void;
  notFound(city?: string): void;
  error(message?: string, city?: string): void;
  refresh(): void;
  changeLocation(event?: MouseEvent): void;
  openForecastModal(): void;
  closeForecastModal(): void;
  setForecastDays(days: WeatherForecastItem[]): void;
  setDetailInfo(info: WeatherDetailInfo): void;
  applyCity(cityName: string): void;
  setRefreshAction(handler: () => void): void;
  setChangeLocationAction(handler: (event?: MouseEvent) => void): void;
  readonly snapshot: Readonly<WeatherSnapshot>;
}

const defaultForecastDays: WeatherForecastItem[] = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
];

const WEATHER_SNAPSHOT_KEY = "lw_weather_snapshot_v1";

function loadInitialWeatherSnapshot(): Partial<WeatherSnapshot> | null {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(WEATHER_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.data && parsed.data.currentTemp !== undefined) {
      return {
        state: "ready",
        city: parsed.city || parsed.data.cityName || "",
        data: parsed.data,
        forecastDays: Array.isArray(parsed.forecastDays) && parsed.forecastDays.length ? parsed.forecastDays : defaultForecastDays,
        detailInfo: parsed.detailInfo || null,
        updatedAt: parsed.savedAt || Date.now()
      };
    }
  } catch {}
  return null;
}

function persistWeatherSnapshot(state: WeatherSnapshot): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;
  try {
    if (state.data) {
      localStorage.setItem(
        WEATHER_SNAPSHOT_KEY,
        JSON.stringify({
          data: state.data,
          city: state.city,
          forecastDays: state.forecastDays,
          detailInfo: state.detailInfo,
          savedAt: state.updatedAt || Date.now()
        })
      );
    }
  } catch {}
}

const initialState = (): WeatherSnapshot => {
  const cached = loadInitialWeatherSnapshot();
  return {
    state: cached?.state || "loading",
    city: cached?.city || "",
    errorMessage: "",
    data: cached?.data || null,
    updatedAt: cached?.updatedAt || null,
    forecastModalOpen: false,
    forecastDays: cached?.forecastDays || defaultForecastDays,
    detailInfo: cached?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
};

export const weatherState = reactive<WeatherSnapshot>(initialState());

let refreshActionHandler: (() => void) | null = null;
let changeLocationActionHandler: ((event?: MouseEvent) => void) | null = null;

export const weatherController: WeatherController = {
  get snapshot() {
    return readonly(weatherState);
  },
  update(snapshot) {
    Object.assign(weatherState, snapshot);
    persistWeatherSnapshot(weatherState);
  },
  unconfigured() {
    Object.assign(weatherState, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(city = "") {
    // 若已有离线快照，保持展示已有数据与城市，不触发闪白，后台静默刷新
    if (weatherState.data) {
      if (city) weatherState.city = city;
      return;
    }
    Object.assign(weatherState, {
      state: "loading",
      city,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(data, city = "") {
    Object.assign(weatherState, {
      state: "ready",
      city: city || data.cityName,
      errorMessage: "",
      data,
      updatedAt: Date.now()
    });
    persistWeatherSnapshot(weatherState);
  },
  notFound(city = "") {
    Object.assign(weatherState, {
      state: "not_found",
      city,
      errorMessage: `找不到城市「${city}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(message = "天气加载失败，右键此处可重新选择地点。", city = "") {
    // 若已有离线快照，保留展示已有数据，避免弱网时页面变空白
    if (weatherState.data) {
      return;
    }
    Object.assign(weatherState, {
      state: "error",
      city,
      errorMessage: message,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(city?: string) {
    if (city) {
      weatherState.city = city;
    }
    weatherState.forecastModalOpen = true;
  },
  closeForecastModal() {
    weatherState.forecastModalOpen = false;
  },
  setForecastDays(days: WeatherForecastItem[]) {
    weatherState.forecastDays = Array.isArray(days)
      ? days.map((d) => ({
          dayName: d.dayName || (d as any).day || "",
          date: d.date || "",
          emoji: d.emoji || "🌤️",
          condition: d.condition || (d as any).text || "",
          rainProb: d.rainProb ?? 0,
          lowTemp: d.lowTemp ?? (d as any).tempMin ?? 0,
          highTemp: d.highTemp ?? (d as any).tempMax ?? 0
        }))
      : [];
    persistWeatherSnapshot(weatherState);
  },
  setDetailInfo(info: WeatherDetailInfo) {
    weatherState.detailInfo = { ...info };
    persistWeatherSnapshot(weatherState);
  },
  applyCity(cityName: string) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: cityName } }));
    }
    this.refresh();
  },
  refresh() {
    if (refreshActionHandler) refreshActionHandler();
    else if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(event) {
    if (changeLocationActionHandler) changeLocationActionHandler(event);
    else if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: event?.clientX, clientY: event?.clientY } }));
  },
  setRefreshAction(handler) {
    refreshActionHandler = handler;
  },
  setChangeLocationAction(handler) {
    changeLocationActionHandler = handler;
  }
};
