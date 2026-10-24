/* Generic, page-owned Jev DOM adapter. No site-specific selectors or command IDs.
 * This service only runs on the two explicitly allowed LogicWeaver workspace pages.
 * It reads visible controls, keeps real node identity locally, and refuses stale input.
 */

type Action = {
  id: string; node?: number; kind: "click" | "fill" | "select" | "scroll" | "wait";
  label: string; role?: string; value?: string; current_value?: string; delta?: number;
};
type State = {
  url: string; title: string; text: string; actions: Action[];
  scroll: { y: number; height: number }; marker: string; page_key: unknown[];
  guards: Record<string, string>;
};

const ids = new WeakMap<Element, number>();
const nodes = new Map<number, Element>();
let nextId = 1;
let lastState: State | null = null;
const prohibited = /\b(?:buy|purchase|pay|checkout|order|delete|remove|erase|send|post|publish|submit|transfer|withdraw|reset password)\b|购买|支付|下单|删除|移除|发送|发布|提交|转账|提现|修改密码/i;

function nodeId(element: Element): number {
  let id = ids.get(element);
  if (!id) { id = nextId++; ids.set(element, id); }
  nodes.set(id, element);
  return id;
}
function allowedPage(): boolean {
  return window.location.protocol === "chrome-extension:" &&
    ["/newtab.html", "/bilibili.html"].includes(window.location.pathname);
}
function visible(element: Element): boolean {
  return element.isConnected && !element.closest('[aria-hidden="true"],[inert]') &&
    element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
}
function safe(element: Element): boolean {
  const input = element as HTMLInputElement;
  return !["password", "file", "hidden"].includes(input.type || "") &&
    !element.matches(":disabled") && !element.closest('[aria-disabled="true"]');
}
function label(element: Element): string {
  const e = element as HTMLElement;
  const reference = e.getAttribute("aria-labelledby")?.split(/\s+/).map((id) =>
    document.getElementById(id)?.textContent?.trim() || "").filter(Boolean).join(" ") || "";
  const associated = "labels" in e ? [...((e as HTMLInputElement).labels || [])].map((x) => x.textContent?.trim() || "")
    .filter(Boolean).join(" ") : "";
  return (reference || e.getAttribute("aria-label") || associated || e.getAttribute("title") ||
    e.getAttribute("placeholder") || e.innerText || e.textContent || "").trim().slice(0, 160);
}
function role(element: Element): string {
  const e = element as HTMLInputElement;
  return element.getAttribute("role") || ({ A: "link", BUTTON: "button", SELECT: "combobox", TEXTAREA: "textbox" } as Record<string, string>)[element.tagName] ||
    (element.tagName === "INPUT" ? (["checkbox", "radio"].includes(e.type) ? e.type :
      ["submit", "button", "reset"].includes(e.type) ? "button" : "textbox") : "button");
}
function valueOf(element: Element): string {
  const e = element as HTMLInputElement;
  return "value" in e ? String(e.value || "").slice(0, 200) : "";
}
function pageKey(): unknown[] {
  return [performance.timeOrigin, location.href, scrollX, scrollY, innerWidth, innerHeight,
    [...document.querySelectorAll("input,textarea,select")].filter(safe)
      .map((e) => [nodeId(e), valueOf(e), (e as HTMLInputElement).checked, (e as HTMLSelectElement).selectedIndex])];
}
function guard(element: Element | undefined): string {
  if (!element || !visible(element) || !safe(element)) return "";
  const context = element.closest("form,dialog,[role=dialog],article,li,tr") || element.parentElement;
  return JSON.stringify([nodeId(element), role(element), label(element), valueOf(element),
    (element as HTMLInputElement).checked, element.getAttribute("href"),
    element.getAttribute("aria-expanded"), context?.textContent?.trim().slice(0, 250) || ""]);
}

export function observeJevPage(): State {
  if (!allowedPage() || !document.body) throw new Error("Unsupported workspace page");
  for (const [id, element] of nodes) if (!element.isConnected) nodes.delete(id);
  const actions: Action[] = [];
  const selector = 'a[href],button,input,textarea,select,summary,[contenteditable="true"],'+
    '[role="button"],[role="link"],[role="checkbox"],[role="tab"],[role="menuitem"],[role="textbox"]';
  for (const element of document.querySelectorAll(selector)) {
    if (!safe(element) || !visible(element)) continue;
    const rect = element.getBoundingClientRect();
    const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
    if (!rect.width || !rect.height || x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
    const id = nodeId(element), r = role(element), name = label(element) || r;
    if (element.tagName === "SELECT") {
      const select = element as HTMLSelectElement;
      for (const option of select.options) if (!option.disabled && !option.selected) {
        actions.push({ id: "e" + (actions.length + 1), kind: "select", node: id, role: r,
          label: name + " -> " + option.label.slice(0, 100), value: option.value,
          current_value: select.selectedOptions[0]?.label || "" });
      }
    } else {
      const input = element as HTMLInputElement;
      const editable = !input.readOnly && (element.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]),textarea,[contenteditable="true"]') ||
        ["textbox", "searchbox"].includes(element.getAttribute("role") || ""));
      actions.push({ id: "e" + (actions.length + 1), kind: editable ? "fill" : "click", node: id,
        role: r, label: name, value: valueOf(element) });
      if (editable) actions.push({ id: "e" + (actions.length + 1), kind: "click", node: id,
        role: r, label: "Open " + name, value: valueOf(element) });
    }
    if (actions.length >= 120) break;
  }
  const height = document.documentElement.scrollHeight;
  const clipped = actions.slice(0, 120);
  if (scrollY + innerHeight < height - 2) clipped.push({ id: "scroll_down", kind: "scroll", label: "Scroll down", delta: 560 });
  if (scrollY > 0) clipped.push({ id: "scroll_up", kind: "scroll", label: "Scroll up", delta: -560 });
  clipped.push({ id: "wait", kind: "wait", label: "Wait for page" });
  const words: string[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let textLength = 0, textNode: Node | null;
  while ((textNode = walker.nextNode()) && textLength < 4000) {
    const parent = textNode.parentElement;
    const part = textNode.textContent?.trim() || "";
    if (!parent || !part || !visible(parent) || parent.closest("script,style,noscript,template")) continue;
    range.selectNodeContents(textNode);
    const rect = range.getBoundingClientRect();
    if (!rect.width || !rect.height || rect.bottom <= 0 || rect.top >= innerHeight ||
        rect.right <= 0 || rect.left >= innerWidth) continue;
    words.push(part); textLength += part.length;
  }
  const text = words.join("\n").slice(0, 4000);
  const key = pageKey();
  const guards: Record<string, string> = {};
  for (const action of clipped) if (action.node) guards[String(action.node)] = guard(nodes.get(action.node));
  const state: State = { url: location.href, title: document.title.slice(0, 160), text,
    actions: clipped, scroll: { y: scrollY, height }, page_key: key, guards,
    marker: JSON.stringify([key, text, clipped.map((a) => [a.kind, a.label, a.value])]) };
  lastState = state;
  return state;
}

export function actJevPage(request: unknown): { executed: boolean } {
  if (!allowedPage() || !lastState || !request || typeof request !== "object") throw new Error("No observed page");
  const r = request as { action?: Action; pageKey?: unknown[]; expectedGuard?: string; url?: string; text?: string };
  const action = lastState.actions.find((a) => a.id === r.action?.id && a.kind === r.action?.kind &&
    a.node === r.action?.node && a.label === r.action?.label && a.value === r.action?.value);
  if (!action || r.url !== location.href || JSON.stringify(r.pageKey) !== JSON.stringify(pageKey())) {
    throw new Error("STALE_PAGE");
  }
  if (action.node) {
    const element = nodes.get(action.node);
    if (!element || !visible(element) || !safe(element) || guard(element) !== r.expectedGuard ||
        lastState.guards[String(action.node)] !== r.expectedGuard) throw new Error("STALE_PAGE");
    const rect = element.getBoundingClientRect();
    const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
    if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight || !element.contains(document.elementFromPoint(x, y))) {
      throw new Error("STALE_PAGE");
    }
    const href = element.getAttribute("href") || "";
    if (action.kind === "click" && (prohibited.test(action.label + " " + href) ||
        (href && new URL(href, location.href).origin !== location.origin))) throw new Error("NEEDS_CONFIRMATION");
    if (action.kind === "select") {
      if (prohibited.test(action.label) || element.tagName !== "SELECT") throw new Error("NEEDS_CONFIRMATION");
      const select = element as HTMLSelectElement;
      if (![...select.options].some((o) => o.value === action.value && !o.disabled)) throw new Error("STALE_PAGE");
      select.value = action.value || "";
      select.dispatchEvent(new Event("input", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (action.kind === "fill") {
      if (typeof r.text !== "string" || !r.text.trim() || r.text.length > 2000) throw new Error("Invalid text");
      const field = element as HTMLInputElement;
      if (field.readOnly) throw new Error("STALE_PAGE");
      if (element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement) {
        const proto = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(element, r.text);
      } else if ((element as HTMLElement).isContentEditable) (element as HTMLElement).textContent = r.text;
      else throw new Error("STALE_PAGE");
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    } else if (action.kind === "click") (element as HTMLElement).click();
  } else if (action.kind === "scroll") window.scrollBy({ top: action.delta, behavior: "instant" });
  // `wait` is read-only. Consume the snapshot before the next action.
  lastState = null;
  return { executed: true };
}
