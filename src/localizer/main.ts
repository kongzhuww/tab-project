import { createApp } from "vue";
import LocalizerOverlay from "./LocalizerOverlay.vue";
import { openTranslation, setSaveTranslation, showLocalizerToast } from "./overlay-state";

declare const chrome: any;
type LocalizerWindow = Window & { __LW_LOCALIZER_ACTIVE__?: boolean; __LW_REFRESH_DICT__?: () => Promise<void> };
const page = window as LocalizerWindow;
const hostName = location.hostname.replace(/^www\./, "");
const storageKey = `lw_dict_${hostName}`;
let dict: Record<string, string> = {};
let observer: MutationObserver | null = null;
const ignoreTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "CODE", "PRE"]);

function translateNode(node: Node): void {
  if (node.nodeType !== Node.TEXT_NODE || !node.parentNode || ignoreTags.has(node.parentNode.nodeName)) return;
  const text = node.nodeValue || "";
  const trimmed = text.trim();
  if (!trimmed) return;
  if (dict[trimmed]) {
    const next = text.replace(trimmed, dict[trimmed]);
    if (next !== text) node.nodeValue = next;
    return;
  }
  let next = text;
  for (const key of Object.keys(dict).sort((a, b) => b.length - a.length)) {
    if (key.length > 2 && next.includes(key)) next = next.replaceAll(key, dict[key]);
  }
  if (next !== text) node.nodeValue = next;
}
function translatePage(): void {
  if (!document.body || !Object.keys(dict).length) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) { return node.parentNode && !ignoreTags.has(node.parentNode.nodeName) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
  });
  let node: Node | null;
  while ((node = walker.nextNode())) translateNode(node);
}
function startObserver(): void {
  if (!document.body) return;
  observer?.disconnect();
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") { translateNode(mutation.target); continue; }
      for (const added of mutation.addedNodes) {
        if (added.nodeType === Node.TEXT_NODE) translateNode(added);
        else if (added.nodeType === Node.ELEMENT_NODE && !ignoreTags.has(added.nodeName)) {
          const walker = document.createTreeWalker(added, NodeFilter.SHOW_TEXT);
          let child: Node | null;
          while ((child = walker.nextNode())) translateNode(child);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}
async function refreshDict(): Promise<void> {
  const stored = await chrome.storage.local.get(storageKey);
  dict = stored?.[storageKey] && typeof stored[storageKey] === "object" ? { ...stored[storageKey] } : {};
  translatePage();
}
function attachOverlay(): void {
  const host = document.createElement("div");
  host.id = "lw-localizer-modal-host";
  host.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;";
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = `
    *{box-sizing:border-box}
    .overlay-layer{position:fixed;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(2px);display:grid;place-items:center;pointer-events:auto;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
    .editor-card{width:min(360px,calc(100vw - 32px));background:#0f172a;border:1px solid rgba(56,189,248,.35);border-radius:14px;padding:18px;color:#f8fafc;box-shadow:0 20px 25px -5px rgba(0,0,0,.5)}
    .editor-title{display:flex;gap:8px;font-size:13px;font-weight:700;color:#38bdf8;margin-bottom:12px}
    .editor-field{margin-bottom:12px}.editor-field label{display:block;font-size:11px;color:#94a3b8;margin-bottom:4px}
    .original{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 10px;font-size:12px;word-break:break-all;color:#cbd5e1}
    input{width:100%;background:rgba(255,255,255,.08);border:1px solid rgba(56,189,248,.4);border-radius:8px;padding:8px 10px;font-size:13px;color:#fff;outline:none}
    input:focus{border-color:#38bdf8;box-shadow:0 0 0 2px rgba(56,189,248,.25)}
    .editor-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}
    button{padding:7px 14px;border:0;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer}
    .cancel{background:rgba(255,255,255,.08);color:#cbd5e1}.save{background:linear-gradient(135deg,#0284c7,#38bdf8);color:#fff}
    button:disabled{opacity:.55;cursor:default}
    .localizer-toast{position:fixed;top:20px;right:20px;background:#0f172a;color:#38bdf8;border:1px solid rgba(56,189,248,.4);padding:10px 16px;border-radius:10px;font-size:12px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 10px 15px -3px rgba(0,0,0,.4);pointer-events:none;white-space:pre-line;line-height:1.4}
  `;
  const mount = document.createElement("div");
  shadow.append(style, mount);
  document.documentElement.appendChild(host);
  createApp(LocalizerOverlay).mount(mount);
}
function init(): void {
  if (page.__LW_LOCALIZER_ACTIVE__) { void page.__LW_REFRESH_DICT__?.(); return; }
  page.__LW_LOCALIZER_ACTIVE__ = true;
  page.__LW_REFRESH_DICT__ = async () => {
    try { await refreshDict(); showLocalizerToast(`🌐 汉化词典已重新同步（词条数: ${Object.keys(dict).length}）`); }
    catch { showLocalizerToast("汉化词典同步失败"); }
  };
  attachOverlay();
  setSaveTranslation(async (original, translated) => {
    const next = { ...dict };
    if (translated) next[original] = translated;
    else delete next[original];
    await chrome.storage.local.set({ [storageKey]: next });
    dict = next;
    translatePage();
  });
  document.addEventListener("click", (event: MouseEvent) => {
    if (!event.altKey || !(event.target instanceof Element)) return;
    const original = (event.target.textContent || "").trim();
    if (!original || original.length > 100) return;
    event.preventDefault();
    event.stopPropagation();
    openTranslation(original, dict[original] || "");
  }, true);
  void refreshDict().then(() => {
    startObserver();
    showLocalizerToast(`🌐 LogicWeaver 汉化已激活（当前固化词条: ${Object.keys(dict).length} 个）\n提示：按住 Alt 点击文字即可修正固化`);
  }).catch((error) => console.error("[LogicWeaver Localizer] 初始化词典失败", error));
}
init();
