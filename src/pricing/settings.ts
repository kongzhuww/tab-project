export const PRICING_SETTINGS_KEYS = ["artificialAnalysisApiKey", "openRouterApiKey"] as const;
export type PricingSettings = Record<typeof PRICING_SETTINGS_KEYS[number], string>;
export async function loadPricingSettings(): Promise<PricingSettings> {
  const stored = typeof chrome !== "undefined" && chrome.storage?.local
    ? await chrome.storage.local.get([...PRICING_SETTINGS_KEYS])
    : Object.fromEntries(PRICING_SETTINGS_KEYS.map(key => [key, localStorage.getItem(key)]));
  return Object.fromEntries(PRICING_SETTINGS_KEYS.map(key => [key, typeof stored[key] === "string" ? stored[key] : ""])) as PricingSettings;
}
export async function loadPricingConnectionStatus(): Promise<{ hasOpenRouterKey: boolean; hasAaApiKey: boolean }> {
  const settings = await loadPricingSettings();
  return {
    hasOpenRouterKey: Boolean(settings.openRouterApiKey.trim()),
    hasAaApiKey: Boolean(settings.artificialAnalysisApiKey.trim())
  };
}
export async function savePricingSettings(draft: PricingSettings, initial: PricingSettings): Promise<PricingSettings> {
  const payload: Partial<PricingSettings> = {};
  for (const key of PRICING_SETTINGS_KEYS) if (draft[key] !== initial[key]) payload[key] = draft[key].trim();
  if (Object.keys(payload).length) {
    if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.set(payload);
    else for (const [key, value] of Object.entries(payload)) localStorage.setItem(key, value);
  }
  return loadPricingSettings();
}
