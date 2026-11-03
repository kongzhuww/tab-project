import { ref } from "vue";
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

const LANGUAGE_KEY = "app_language";
function isLanguage(value: unknown): value is LanguageCode {
  return value === "zh" || value === "en";
}

function detectInitialLanguage(): LanguageCode {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch { /* A blocked cache must not prevent browser-language detection. */ }
  return typeof navigator !== "undefined" && !navigator.language.toLowerCase().startsWith("zh") ? "en" : "zh";
}

export const currentLanguage = ref<LanguageCode>(detectInitialLanguage());
let revision = 0;

function applyLanguage(lang: LanguageCode): void {
  currentLanguage.value = lang;
  if (typeof document !== "undefined") document.documentElement.lang = lang;
  try { localStorage.setItem(LANGUAGE_KEY, lang); }
  catch { /* chrome.storage remains the authoritative extension preference. */ }
}

const extensionStorage = typeof chrome !== "undefined" ? chrome.storage : undefined;
if (typeof document !== "undefined") document.documentElement.lang = currentLanguage.value;

// Subscribe before hydration; a late startup read must not undo a newer choice.
if (typeof window !== "undefined") {
  if (extensionStorage?.local) {
    extensionStorage.onChanged.addListener((changes: Record<string, { newValue?: unknown }>, area: string) => {
      if (area !== "local" || !isLanguage(changes[LANGUAGE_KEY]?.newValue)) return;
      revision++;
      applyLanguage(changes[LANGUAGE_KEY].newValue as LanguageCode);
    });
    const startupRevision = revision;
    void extensionStorage.local.get(LANGUAGE_KEY).then((saved: Record<string, unknown>) => {
      if (revision === startupRevision && isLanguage(saved[LANGUAGE_KEY])) {
        applyLanguage(saved[LANGUAGE_KEY] as LanguageCode);
      }
    }).catch(() => console.warn("[i18n] Could not read saved language; using local fallback."));
  } else {
    // Browser-only preview: storage events are shared across same-origin pages.
    window.addEventListener("storage", event => {
      if (event.storageArea !== localStorage || event.key !== LANGUAGE_KEY || !isLanguage(event.newValue)) return;
      revision++;
      applyLanguage(event.newValue);
    });
  }
}

let pendingWrite = Promise.resolve();
export function setLanguage(lang: LanguageCode): void {
  if (!isLanguage(lang)) return;
  revision++;
  applyLanguage(lang);
  if (extensionStorage?.local) {
    // Preserve ordering for rapid changes in this page; never echo remote events.
    pendingWrite = pendingWrite.then(() => extensionStorage.local.set({ [LANGUAGE_KEY]: lang }))
      .catch(() => console.warn("[i18n] Could not save language to extension storage."));
  }
}

export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  const lang = currentLanguage.value;
  const dict = lang === "en" ? en : zh;
  let text = dict[key] || zh[key] || key;

  if (params) {
    // One pass keeps replacement syntax and nested-looking user values literal.
    text = text.replace(/\{([^{}]+)\}/g, (placeholder, name: string) =>
      Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : placeholder);
  }

  return text;
}
