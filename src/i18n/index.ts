import { ref, computed } from "vue";
import zh, { type TranslationKey } from "./locales/zh";
import en from "./locales/en";

export type LanguageCode = "zh" | "en";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "zh", label: "简体中文", nativeLabel: "中文" },
  { code: "en", label: "English", nativeLabel: "English" }
];

function detectInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "zh";
  try {
    const saved = localStorage.getItem("app_language");
    if (saved === "zh" || saved === "en") return saved;
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith("zh")) return "zh";
    return "en";
  } catch {
    return "zh";
  }
}

export const currentLanguage = ref<LanguageCode>(detectInitialLanguage());

export function setLanguage(lang: LanguageCode): void {
  currentLanguage.value = lang;
  try {
    localStorage.setItem("app_language", lang);
    document.documentElement.lang = lang;
  } catch {}
  if (typeof chrome !== "undefined" && chrome?.storage?.local) {
    void chrome.storage.local.set({ app_language: lang });
  }
}

export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const lang = currentLanguage.value;
  const dict = lang === "en" ? en : zh;
  let text = dict[key] || zh[key] || key;

  if (params && typeof text === "string") {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }

  return text;
}
