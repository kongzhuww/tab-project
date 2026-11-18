/**
 * Pixel crab mascot (Clawd) state machine & sprite frame helpers.
 * Adapted from 0DNANCY/agy-claude-style mascot-core.js (MIT License).
 */

export const MIN_SHOW_MS = 1000;
export const SLEEP_AFTER_MS = 30_000;
export const EXTRA_MIN_MS = 18_000;
export const EXTRA_SPAN_MS = 18_000;
export const REACTION_PRIORITY = 10;
export const CRAB_EXTRAS = ['idle-look', 'idle-wave', 'idle-laptop'] as const;

export type CrabMomentName = 'error' | 'attention';

export interface CrabLevel {
  state: 'idle' | 'typing' | 'thinking' | 'error' | 'attention';
  animation: string;
  priority: number;
}

export interface CrabMoment extends CrabLevel {
  until: number;
}

export interface CrabReaction {
  key: string;
  mode: 'once' | 'loop';
  fresh: boolean;
}

export interface CrabCurrent {
  key: string;
  mode: 'once' | 'loop';
  priority: number;
  start: number;
  done?: boolean;
}

export interface CrabPress {
  id: number;
  x: number;
  y: number;
  lifted: boolean;
}

export interface CrabStage {
  sessionId: string | null;
  level: CrabLevel;
  moment: CrabMoment | null;
  queued: CrabMomentName | null;
  reaction: CrabReaction | null;
  extra: string | null;
  waking: boolean;
  asleep: boolean;
  quietSince: number;
  nextExtraAt: number;
  current: CrabCurrent | null;
  animation: Animation | null;
  timer: ReturnType<typeof setTimeout> | null;
  clicks: number[];
  press: CrabPress | null;
}

export interface CrabDecision {
  key: string;
  mode: 'once' | 'loop';
  priority: number;
}

export interface CrabSheetMeta {
  frames: number;
  box: readonly [number, number, number, number];
  still: number;
  columns?: number;
}

export interface ActivePetInfo {
  isRunning?: boolean;
  isThinking?: boolean;
  hasError?: boolean;
}

export const MOMENTS: Record<CrabMomentName, Omit<CrabMoment, 'until'> & { holdMs: number }> = {
  error: { state: 'error', animation: 'error', priority: 8, holdMs: 4800 },
  attention: { state: 'attention', animation: 'happy', priority: 5, holdMs: 5200 },
};

export function freshStage(now: number): CrabStage {
  return {
    sessionId: null,
    level: { state: 'idle', animation: 'idle', priority: 1 },
    moment: null,
    queued: null,
    reaction: null,
    extra: null,
    waking: false,
    asleep: false,
    quietSince: now,
    nextExtraAt: 0,
    current: null,
    animation: null,
    timer: null,
    clicks: [],
    press: null,
  };
}

function startMoment(stage: CrabStage, name: CrabMomentName, now: number): void {
  const next = MOMENTS[name];
  stage.moment = {
    state: next.state,
    animation: next.animation,
    priority: next.priority,
    until: now + next.holdMs,
  };
}

export function takeMoment(stage: CrabStage, name: CrabMomentName, now: number): boolean {
  if (!MOMENTS[name]) return false;
  if (stage.moment !== null && now < stage.moment.until && stage.moment.priority > MOMENTS[name].priority) {
    stage.queued = name;
    return false;
  }
  startMoment(stage, name, now);
  return true;
}

export function levelFromActiveInfo(info?: ActivePetInfo | null): CrabLevel {
  if (!info) return { state: 'idle', animation: 'idle', priority: 1 };
  if (info.hasError) return { state: 'error', animation: 'error', priority: 8 };
  if (info.isThinking) return { state: 'thinking', animation: 'thinking', priority: 6 };
  if (info.isRunning) return { state: 'typing', animation: 'typing', priority: 5 };
  return { state: 'idle', animation: 'idle', priority: 1 };
}

export function decideStage(
  stage: CrabStage,
  now: number,
  level: CrabLevel,
  around: { extras: readonly string[]; extrasAllowed: boolean; random: () => number }
): CrabDecision {
  if (stage.moment !== null && now >= stage.moment.until) {
    stage.moment = null;
    if (stage.queued !== null) startMoment(stage, stage.queued, now);
    stage.queued = null;
  }
  if (stage.reaction !== null) {
    return { key: stage.reaction.key, mode: stage.reaction.mode, priority: REACTION_PRIORITY };
  }
  const held = stage.moment;
  const pick: CrabLevel = held !== null && held.priority >= level.priority ? held : level;
  if (pick.state !== 'idle') {
    stage.asleep = false;
    stage.waking = false;
    stage.extra = null;
    stage.nextExtraAt = 0;
    stage.quietSince = now;
    return { key: pick.animation, mode: 'loop', priority: pick.priority };
  }
  if (!stage.asleep && now - stage.quietSince >= SLEEP_AFTER_MS) {
    stage.asleep = true;
    stage.extra = null;
  }
  if (stage.asleep) return { key: 'sleeping', mode: 'loop', priority: 1 };
  if (stage.waking) return { key: 'waking', mode: 'once', priority: 1 };
  if (stage.extra === null && around.extrasAllowed && around.extras.length > 0) {
    if (stage.nextExtraAt === 0) {
      stage.nextExtraAt = now + EXTRA_MIN_MS + around.random() * EXTRA_SPAN_MS;
    } else if (now >= stage.nextExtraAt) {
      stage.extra = around.extras[Math.floor(around.random() * around.extras.length)] ?? null;
    }
  }
  if (stage.extra !== null) return { key: stage.extra, mode: 'once', priority: 1 };
  return { key: 'idle', mode: 'loop', priority: 1 };
}

export function finishStage(stage: CrabStage, key: string, now: number, random: () => number): void {
  if (stage.reaction !== null && stage.reaction.key === key && !stage.reaction.fresh) stage.reaction = null;
  if (stage.extra === key) {
    stage.extra = null;
    stage.nextExtraAt = now + EXTRA_MIN_MS + random() * EXTRA_SPAN_MS;
  }
  if (key === 'waking') stage.waking = false;
}

export function switchSettles(stage: CrabStage, next: CrabDecision, now: number): boolean {
  const current = stage.current;
  return (
    current === null ||
    current.mode !== 'loop' ||
    current.priority === REACTION_PRIORITY ||
    next.priority > current.priority ||
    now - current.start >= MIN_SHOW_MS
  );
}

export function nextDecisionAt(
  stage: CrabStage,
  now: number,
  waitSettle: boolean,
  playMs: (key: string) => number
): number {
  let at = Infinity;
  if (stage.moment !== null) at = Math.min(at, stage.moment.until);
  if (waitSettle && stage.current !== null) at = Math.min(at, stage.current.start + MIN_SHOW_MS);
  if (stage.current !== null && stage.current.mode === 'once' && stage.current.done !== true) {
    at = Math.min(at, stage.current.start + playMs(stage.current.key));
  }
  if (!stage.asleep && stage.level.state === 'idle') {
    at = Math.min(at, stage.quietSince + SLEEP_AFTER_MS);
  }
  if (stage.extra === null && stage.nextExtraAt > now) at = Math.min(at, stage.nextExtraAt);
  return at;
}

export function cellSize(sheet: CrabSheetMeta, gutter: number): [number, number] {
  return [sheet.box[2] + gutter * 2, sheet.box[3] + gutter * 2];
}

export function frameOffset(sheet: CrabSheetMeta, frame: number, gutter: number): string {
  const [cw, ch] = cellSize(sheet, gutter);
  const cols = sheet.columns || 8;
  return `translate(${-((frame % cols) * cw + gutter) * 2}px, ${-(Math.floor(frame / cols) * ch + gutter) * 2}px)`;
}
