export const DEFAULT_IME_COOLDOWN_MS = 100;

export type ImeKeyEventLike = Pick<KeyboardEvent, "key" | "isComposing" | "keyCode"> &
  Partial<Pick<KeyboardEvent, "which" | "code" | "shiftKey" | "ctrlKey" | "metaKey" | "altKey" | "repeat" | "target" | "preventDefault" | "stopPropagation">>;

export interface EnterSubmitOptions {
  /** Allow Ctrl/Meta+Enter in addition to plain Enter (Shift+Enter still inserts newline). */
  allowCtrlOrMeta?: boolean;
  /** Require Ctrl/Meta+Enter instead of plain Enter. */
  requireCtrlOrMeta?: boolean;
  /** Cooldown window in ms after compositionend before allowing Enter to submit. */
  cooldownMs?: number;
}

export interface ImeEnterHandlerOptions extends EnterSubmitOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

interface ImeTrackerEntry {
  composing: boolean;
  endedAt: number;
  lastKeyCode: string;
  endedBySelectionKey: boolean;
  now?: () => number;
}

const SELECTION_KEY_CODE_RE = /^(Space|Digit[1-9]|Numpad[1-9])$/;

export function isSelectionKeyCode(code?: string | null): boolean {
  return Boolean(code && SELECTION_KEY_CODE_RE.test(code));
}

function getDefaultNow(): number {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}

function isWithinPostCompositionCooldown(
  entry: ImeTrackerEntry | undefined,
  nowMs: number,
  cooldownMs: number
): boolean {
  if (!entry || entry.composing || entry.endedBySelectionKey || entry.endedAt <= 0) {
    return false;
  }
  const elapsed = nowMs - entry.endedAt;
  return elapsed >= 0 && elapsed < cooldownMs;
}

export function createImeGuard(options?: { cooldownMs?: number; now?: () => number }) {
  const cooldownMs = options?.cooldownMs ?? DEFAULT_IME_COOLDOWN_MS;
  const now = options?.now ?? getDefaultNow;
  const entry: ImeTrackerEntry = {
    composing: false,
    endedAt: 0,
    lastKeyCode: "",
    endedBySelectionKey: false
  };

  return {
    onCompositionStart() {
      entry.composing = true;
      entry.endedAt = 0;
      entry.lastKeyCode = "";
      entry.endedBySelectionKey = false;
    },
    onCompositionEnd() {
      entry.composing = false;
      entry.endedAt = now();
      entry.endedBySelectionKey = isSelectionKeyCode(entry.lastKeyCode);
    },
    onBlur() {
      entry.composing = false;
    },
    onKeyDown(event: Pick<KeyboardEvent, "code">) {
      if (entry.composing && event.code) {
        entry.lastKeyCode = event.code;
      }
    },
    isComposing(event?: Pick<ImeKeyEventLike, "isComposing" | "keyCode" | "which">): boolean {
      if (event && (event.isComposing || event.keyCode === 229 || event.which === 229)) {
        return true;
      }
      if (entry.composing) return true;
      return isWithinPostCompositionCooldown(entry, now(), cooldownMs);
    },
    shouldSubmitOnEnter(event: ImeKeyEventLike, submitOptions?: EnterSubmitOptions): boolean {
      if (event.key !== "Enter" || event.repeat) return false;
      if (this.isComposing(event)) return false;
      return matchesEnterModifiers(event, submitOptions);
    }
  };
}

function matchesEnterModifiers(event: ImeKeyEventLike, options?: EnterSubmitOptions): boolean {
  if (event.shiftKey || event.altKey) return false;
  const hasCtrlOrMeta = Boolean(event.ctrlKey || event.metaKey);
  if (options?.requireCtrlOrMeta) return hasCtrlOrMeta;
  if (options?.allowCtrlOrMeta) return true;
  return !hasCtrlOrMeta;
}

const imeGlobal = globalThis as typeof globalThis & {
  [key: symbol]: unknown;
};
const TRACKED_DOCS_SYM = Symbol.for("tab-project.imeTrackedDocuments");
const TARGET_STATES_SYM = Symbol.for("tab-project.imeTargetStates");

const trackedDocuments =
  (imeGlobal[TRACKED_DOCS_SYM] as WeakSet<Document> | undefined) ??
  ((imeGlobal[TRACKED_DOCS_SYM] = new WeakSet<Document>()) as WeakSet<Document>);

const targetStates =
  (imeGlobal[TARGET_STATES_SYM] as WeakMap<EventTarget, ImeTrackerEntry> | undefined) ??
  ((imeGlobal[TARGET_STATES_SYM] = new WeakMap<EventTarget, ImeTrackerEntry>()) as WeakMap<EventTarget, ImeTrackerEntry>);

function getOrCreateTargetEntry(target: EventTarget): ImeTrackerEntry {
  let entry = targetStates.get(target);
  if (!entry) {
    entry = {
      composing: false,
      endedAt: 0,
      lastKeyCode: "",
      endedBySelectionKey: false
    };
    targetStates.set(target, entry);
  }
  return entry;
}

export function ensureImeDocumentTracker(
  doc: Document | undefined = typeof document !== "undefined" ? document : undefined,
  now: () => number = getDefaultNow
): void {
  if (!doc || trackedDocuments.has(doc)) return;
  trackedDocuments.add(doc);

  doc.addEventListener("compositionstart", (event) => {
    if (!event.target) return;
    const entry = getOrCreateTargetEntry(event.target);
    entry.composing = true;
    entry.endedAt = 0;
    entry.lastKeyCode = "";
    entry.endedBySelectionKey = false;
    entry.now = now;
  }, true);

  doc.addEventListener("compositionend", (event) => {
    if (!event.target) return;
    const entry = getOrCreateTargetEntry(event.target);
    entry.composing = false;
    entry.now = now;
    entry.endedAt = now();
    entry.endedBySelectionKey = isSelectionKeyCode(entry.lastKeyCode);
  }, true);

  doc.addEventListener("blur", (event) => {
    if (!event.target) return;
    const entry = targetStates.get(event.target);
    if (entry) entry.composing = false;
  }, true);

  doc.addEventListener("keydown", (event) => {
    if (!event.target) return;
    const entry = targetStates.get(event.target);
    if (entry?.composing && event.code) {
      entry.lastKeyCode = event.code;
    }

    // Some macOS/WebKit/IME engines commit English text on Enter via compositionend
    // and then immediately dispatch a non-composing keydown(Enter) for the same keypress.
    // Swallow only that trailing Enter so forms, textareas, and @keydown.enter handlers
    // do not submit or insert a stray newline.
    const nativeComposing = Boolean(event.isComposing || event.keyCode === 229 || event.which === 229);
    if (
      event.key === "Enter" &&
      !nativeComposing &&
      !entry?.composing &&
      isWithinPostCompositionCooldown(entry, now(), DEFAULT_IME_COOLDOWN_MS)
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
}

if (typeof document !== "undefined") {
  ensureImeDocumentTracker(document);
}

export function isImeComposing(
  event: Pick<ImeKeyEventLike, "isComposing" | "keyCode" | "which" | "target"> | undefined | null,
  cooldownMs = DEFAULT_IME_COOLDOWN_MS
): boolean {
  if (!event) return false;
  if (event.isComposing || event.keyCode === 229 || event.which === 229) {
    return true;
  }
  if (typeof document !== "undefined") {
    ensureImeDocumentTracker(document);
  }
  if (!event.target) return false;
  const entry = targetStates.get(event.target);
  if (!entry) return false;
  if (entry.composing) return true;
  return isWithinPostCompositionCooldown(entry, (entry.now ?? getDefaultNow)(), cooldownMs);
}

export function shouldSubmitOnEnter(
  event: ImeKeyEventLike,
  options?: EnterSubmitOptions
): boolean {
  if (event.key !== "Enter" || event.repeat) return false;
  if (isImeComposing(event, options?.cooldownMs)) return false;
  return matchesEnterModifiers(event, options);
}

export function onImeEnter(
  event: KeyboardEvent,
  action: (event: KeyboardEvent) => void,
  options?: ImeEnterHandlerOptions
): void {
  if (!shouldSubmitOnEnter(event, options)) return;
  if (options?.preventDefault !== false) event.preventDefault();
  if (options?.stopPropagation) event.stopPropagation();
  action(event);
}
