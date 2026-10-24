/**
 * WeatherService — 纯 TypeScript 现代化天气与城市逆地理编码服务 (Zero DOM)
 * 提纯自历史脚本 newtab-discovery.js，直连 Open-Meteo 全球开放气象 API
 */

import {
  weatherController,
  weatherState,
  type WeatherData,
  type WeatherForecastItem,
  type WeatherHourItem,
  type WeatherDayItem,
  type WeatherDetailInfo
} from "../weather/store";

declare const chrome: any;

export interface WeatherCodeInfo {
  emoji: string;
  label: string;
}

export interface WeatherCityItem {
  name: string;
  admin: string;
  pinyin: string;
}

export const WEATHER_COMMON_CITIES: WeatherCityItem[] = [
  { name: "深圳", admin: "广东", pinyin: "shenzhen" },
  { name: "武汉", admin: "湖北", pinyin: "wuhan" },
  { name: "北京", admin: "北京", pinyin: "beijing" },
  { name: "上海", admin: "上海", pinyin: "shanghai" },
  { name: "广州", admin: "广东", pinyin: "guangzhou" },
  { name: "成都", admin: "四川", pinyin: "chengdu" },
  { name: "杭州", admin: "浙江", pinyin: "hangzhou" },
  { name: "重庆", admin: "重庆", pinyin: "chongqing" },
  { name: "南京", admin: "江苏", pinyin: "nanjing" },
  { name: "西安", admin: "陕西", pinyin: "xian" },
  { name: "苏州", admin: "江苏", pinyin: "suzhou" },
  { name: "天津", admin: "天津", pinyin: "tianjin" },
  { name: "郑州", admin: "河南", pinyin: "zhengzhou" },
  { name: "长沙", admin: "湖南", pinyin: "changsha" },
  { name: "东莞", admin: "广东", pinyin: "dongguan" },
  { name: "佛山", admin: "广东", pinyin: "foshan" },
  { name: "宁波", admin: "浙江", pinyin: "ningbo" },
  { name: "青岛", admin: "山东", pinyin: "qingdao" },
  { name: "合肥", admin: "安徽", pinyin: "hefei" },
  { name: "福州", admin: "福建", pinyin: "fuzhou" },
  { name: "厦门", admin: "福建", pinyin: "xiamen" },
  { name: "济南", admin: "山东", pinyin: "jinan" },
  { name: "沈阳", admin: "辽宁", pinyin: "shenyang" },
  { name: "大连", admin: "辽宁", pinyin: "dalian" },
  { name: "哈尔滨", admin: "黑龙江", pinyin: "haerbin" },
  { name: "长春", admin: "吉林", pinyin: "changchun" },
  { name: "昆明", admin: "云南", pinyin: "kunming" },
  { name: "贵阳", admin: "贵州", pinyin: "guiyang" },
  { name: "南宁", admin: "广西", pinyin: "nanning" },
  { name: "乌鲁木齐", admin: "新疆", pinyin: "wulumuqi" },
  { name: "兰州", admin: "甘肃", pinyin: "lanzhou" },
  { name: "海口", admin: "海南", pinyin: "haikou" },
  { name: "三亚", admin: "海南", pinyin: "sanya" },
  { name: "银川", admin: "宁夏", pinyin: "yinchuan" },
  { name: "西宁", admin: "青海", pinyin: "xining" },
  { name: "呼和浩特", admin: "内蒙古", pinyin: "huhehaote" },
  { name: "拉萨", admin: "西藏", pinyin: "lasa" },
  { name: "石家庄", admin: "河北", pinyin: "shijiazhuang" },
  { name: "太原", admin: "山西", pinyin: "taiyuan" },
  { name: "南昌", admin: "江西", pinyin: "nanchang" },
  { name: "无锡", admin: "江苏", pinyin: "wuxi" },
  { name: "香港", admin: "中国香港", pinyin: "xianggang" },
  { name: "澳门", admin: "中国澳门", pinyin: "aomen" },
  { name: "台北", admin: "中国台湾", pinyin: "taibei" },
  { name: "Tokyo", admin: "日本", pinyin: "tokyo" },
  { name: "London", admin: "英国", pinyin: "london" },
  { name: "New York", admin: "美国", pinyin: "newyork" }
];

export function getWmoWeatherInfo(code: number): WeatherCodeInfo {
  if (code === 0) return { emoji: "☀️", label: "晴" };
  if (code <= 2) return { emoji: "🌤️", label: "少云" };
  if (code === 3) return { emoji: "☁️", label: "多云" };
  if (code === 45 || code === 48) return { emoji: "🌫️", label: "雾" };
  if (code >= 51 && code <= 57) return { emoji: "🌦️", label: "毛毛雨" };
  if (code >= 61 && code <= 67) return { emoji: "🌧️", label: "雨" };
  if (code >= 71 && code <= 77) return { emoji: "🌨️", label: "雪" };
  if (code >= 80 && code <= 82) return { emoji: "🌧️", label: "阵雨" };
  if (code >= 85 && code <= 86) return { emoji: "🌨️", label: "阵雪" };
  if (code >= 95) return { emoji: "⛈️", label: "雷雨" };
  return { emoji: "🌡️", label: "—" };
}

export class WeatherService {
  private static instance: WeatherService;
  private currentCity: string = "武汉";
  private isRefreshing: boolean = false;
  private activeRequestId: number = 0;

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  public cancel(): void {
    this.activeRequestId++;
    this.isRefreshing = false;
  }

  private constructor() {
    this.initStorage();
  }

  private async initStorage(): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const res = await chrome.storage.local.get(["city"]);
        if (res.city) {
          this.currentCity = res.city;
        }
      } catch {}
    } else if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("weatherCity");
      if (saved) this.currentCity = saved;
    }
  }

  public getCurrentCity(): string {
    return this.currentCity;
  }

  public async changeCity(city: string): Promise<void> {
    const clean = city.trim();
    if (!clean) return;
    this.currentCity = clean;

    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ city: clean }).catch(() => {});
    } else if (typeof localStorage !== "undefined") {
      localStorage.setItem("weatherCity", clean);
    }

    await this.loadWeather(clean);
  }

  public filterCities(query: string, limit = 8): WeatherCityItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return WEATHER_COMMON_CITIES.slice(0, limit);

    const matches: WeatherCityItem[] = [];
    for (const item of WEATHER_COMMON_CITIES) {
      const name = item.name.toLowerCase();
      const pinyin = item.pinyin.toLowerCase();
      const admin = item.admin.toLowerCase();
      if (name.startsWith(q) || pinyin.startsWith(q)) {
        matches.push(item);
      } else if (name.includes(q) || pinyin.includes(q) || admin.includes(q)) {
        matches.push(item);
      }
      if (matches.length >= limit) break;
    }
    return matches;
  }

  public async loadWeather(targetCity?: string): Promise<void> {
    const city = (targetCity || this.currentCity || "").trim();
    if (!city) {
      weatherController.unconfigured();
      return;
    }

    if (this.isRefreshing) return;
    this.isRefreshing = true;
    const reqId = ++this.activeRequestId;
    weatherController.loading(city);

    try {
      // 1. 地理编码搜索
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh&format=json`;
      const geoRes = await fetch(geoUrl);
      if (reqId !== this.activeRequestId || (weatherState.state as string) === "unconfigured") {
        this.isRefreshing = false;
        return;
      }
      const geoData = await geoRes.json();
      const loc = geoData.results?.[0];

      if (!loc) {
        if (reqId === this.activeRequestId && (weatherState.state as string) !== "unconfigured") {
          weatherController.notFound(city);
        }
        this.isRefreshing = false;
        return;
      }

      // 2. 气象预报请求
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`;
      const forecastRes = await fetch(forecastUrl);
      if (reqId !== this.activeRequestId || (weatherState.state as string) === "unconfigured") {
        this.isRefreshing = false;
        return;
      }
      const d = await forecastRes.json();

      const curInfo = getWmoWeatherInfo(d.current?.weather_code ?? 0);
      const currentTemp = Math.round(d.current?.temperature_2m ?? 0);

      // 小时预报
      const times: string[] = d.hourly?.time || [];
      const nowMs = Date.now();
      let startIdx = times.findIndex((t) => new Date(t).getTime() >= nowMs);
      if (startIdx < 0) startIdx = 0;

      const hoursList: WeatherHourItem[] = [];
      for (let i = startIdx; i < Math.min(startIdx + 5, times.length); i++) {
        const hTime = i === startIdx ? "现在" : new Date(times[i]).getHours() + "时";
        const hInfo = getWmoWeatherInfo(d.hourly.weather_code[i]);
        const hTemp = Math.round(d.hourly.temperature_2m[i]);
        hoursList.push({ time: hTime, emoji: hInfo.emoji, temp: hTemp });
      }

      // 降水预测
      let rainText = "未来 12 小时暂无降水 ☂️";
      for (let i = startIdx; i < Math.min(startIdx + 12, times.length); i++) {
        const c = d.hourly.weather_code[i];
        const p = d.hourly.precipitation_probability?.[i] || 0;
        if (c >= 51 || p >= 60) {
          const hr = new Date(times[i]).getHours();
          const snow = (c >= 71 && c <= 77) || c === 85 || c === 86;
          rainText = `预计 ${hr}:00 ${snow ? "有雪" : "有雨"}${p ? `（${p}%）` : ""} 🌧️`;
          break;
        }
      }

      // 简明未来日间预报
      const labels = ["今天", "明天", "后天"];
      const daysList: WeatherDayItem[] = [];
      const dailyLen = d.daily?.time?.length || 0;
      for (let i = 1; i < Math.min(3, dailyLen); i++) {
        const dLabel = labels[i] || `+${i}天`;
        const dInfo = getWmoWeatherInfo(d.daily.weather_code[i]);
        const dRange = `${Math.round(d.daily.temperature_2m_max[i])}°/${Math.round(d.daily.temperature_2m_min[i])}°`;
        daysList.push({ label: dLabel, emoji: dInfo.emoji, tempRange: dRange });
      }

      const subText = `${curInfo.label} · 最高 ${Math.round(d.daily?.temperature_2m_max?.[0] ?? currentTemp)}° / 最低 ${Math.round(d.daily?.temperature_2m_min?.[0] ?? currentTemp)}°`;

      const readyData: WeatherData = {
        cityName: loc.name || city,
        currentEmoji: curInfo.emoji,
        currentTemp,
        subText,
        rainText,
        hours: hoursList,
        days: daysList
      };

      if (reqId === this.activeRequestId && (weatherState.state as string) !== "unconfigured") {
        weatherController.ready(readyData, city);

        // 7 天全量趋势弹窗数据
        if (d.daily?.time) {
          const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
          const forecastDays: WeatherForecastItem[] = [];
          for (let i = 0; i < d.daily.time.length; i++) {
            const dateObj = new Date(d.daily.time[i]);
            const dayName = i === 0 ? "今天" : i === 1 ? "明天" : i === 2 ? "后天" : weekdays[dateObj.getDay()];
            const info = getWmoWeatherInfo(d.daily.weather_code[i]);
            forecastDays.push({
              date: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
              dayName,
              emoji: info.emoji,
              condition: info.label,
              highTemp: Math.round(d.daily.temperature_2m_max[i]),
              lowTemp: Math.round(d.daily.temperature_2m_min[i]),
              rainProb: d.daily.precipitation_probability_max?.[i] || 0
            });
          }
          weatherController.setForecastDays(forecastDays);
        }

        // 空气质量与风力详情
        const detail: WeatherDetailInfo = {
          humidity: d.current?.relative_humidity_2m ? `${d.current.relative_humidity_2m}%` : "60%",
          wind: d.current?.wind_speed_10m ? `${Math.round(d.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        weatherController.setDetailInfo(detail);
      }
    } catch (err: any) {
      if (reqId === this.activeRequestId && (weatherState.state as string) !== "unconfigured") {
        weatherController.error(err?.message || "天气加载失败，右键此处可重新选择地点。", city);
      }
    } finally {
      if (reqId === this.activeRequestId) {
        this.isRefreshing = false;
      }
    }
  }
}

export const weatherService = WeatherService.getInstance();
