/**
 * Lightweight BaseStateMachine & DevTools / Agent Diagnostics Bridge
 *
 * Provides a uniform foundation for all explicit state machines across tab-project:
 * - Deterministic event-driven transitions
 * - Type-safe state subscriptions
 * - Circular transition history buffer (last 20 state transitions)
 * - Zero external runtime dependencies
 * - Global dev registry for developer inspection and AI Agent diagnostics (`window.__TAB_MACHINES__`)
 *   with `.list()`, `.snapshot()`, `.exportTrace()`, and `.get()` helper APIs.
 */

export interface TransitionRecord<TState = any, TEvent = any> {
  readonly timestamp: number;
  readonly fromState: TState;
  readonly event: TEvent;
  readonly toState: TState;
}

export interface IStateMachine<TState, TEvent> {
  readonly name?: string;
  readonly state: TState;
  readonly history: ReadonlyArray<TransitionRecord<TState, TEvent>>;
  send(event: TEvent): boolean;
  subscribe(listener: (state: TState) => void): () => void;
}

export abstract class BaseStateMachine<TState, TEvent> implements IStateMachine<TState, TEvent> {
  protected _state: TState;
  protected readonly _listeners = new Set<(state: TState) => void>();
  protected readonly _history: TransitionRecord<TState, TEvent>[] = [];
  protected readonly _maxHistory = 20;
  public readonly name?: string;

  constructor(initialState: TState, name?: string) {
    this._state = initialState;
    this.name = name;
    if (name) {
      registerMachineForDiagnostics(name, this);
    }
  }

  public get state(): TState {
    return this._state;
  }

  public get history(): ReadonlyArray<TransitionRecord<TState, TEvent>> {
    return this._history;
  }

  public clearHistory(): void {
    this._history.length = 0;
  }

  public subscribe(listener: (state: TState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  protected setState(next: TState, event?: TEvent): void {
    const prev = this._state;
    this._state = next;

    if (event !== undefined) {
      this._history.push({
        timestamp: Date.now(),
        fromState: prev,
        event,
        toState: next
      });
      if (this._history.length > this._maxHistory) {
        this._history.shift();
      }
    }

    for (const listener of this._listeners) {
      listener(next);
    }

    notifyGlobalDiagnostics(this.name || "anonymous", next, this._history[this._history.length - 1]);
  }

  public abstract send(event: TEvent): boolean;
}

export interface TabMachinesTraceReport {
  readonly version: number;
  readonly exportedAt: string;
  readonly machinesCount: number;
  readonly machines: Record<
    string,
    {
      readonly state: any;
      readonly historyCount: number;
      readonly history: ReadonlyArray<TransitionRecord>;
    }
  >;
}

export interface TabMachinesBridge {
  get(name: string): any;
  list(): Record<string, any>;
  snapshot(): Record<string, { state: any; historyLength: number; lastTransition?: TransitionRecord }>;
  exportTrace(): TabMachinesTraceReport;
  subscribeAll(listener: (name: string, nextState: any, lastTransition?: TransitionRecord) => void): () => void;
  [name: string]: any;
}

const globalRegistry: Record<string, any> = {};
const globalWatchers = new Set<(name: string, nextState: any, lastTransition?: TransitionRecord) => void>();

function notifyGlobalDiagnostics(name: string, nextState: any, lastTransition?: TransitionRecord): void {
  for (const watcher of globalWatchers) {
    watcher(name, nextState, lastTransition);
  }
}

function createBridge(): TabMachinesBridge {
  return new Proxy(globalRegistry as any, {
    get(target, prop: string) {
      if (prop === "get") {
        return (name: string) => target[name];
      }
      if (prop === "list") {
        return () => {
          const summary: Record<string, any> = {};
          for (const [k, m] of Object.entries(target)) {
            summary[k] = (m as any)?.state ?? m;
          }
          return summary;
        };
      }
      if (prop === "snapshot") {
        return () => {
          const snap: Record<string, any> = {};
          for (const [k, m] of Object.entries(target)) {
            const hist = (m as any)?.history || [];
            snap[k] = {
              state: (m as any)?.state ?? m,
              historyLength: hist.length,
              lastTransition: hist.length ? hist[hist.length - 1] : undefined
            };
          }
          return snap;
        };
      }
      if (prop === "exportTrace") {
        return (): TabMachinesTraceReport => {
          const report: TabMachinesTraceReport = {
            version: 1,
            exportedAt: new Date().toISOString(),
            machinesCount: Object.keys(target).length,
            machines: {}
          };
          for (const [k, m] of Object.entries(target)) {
            const hist = (m as any)?.history || [];
            (report.machines as any)[k] = {
              state: (m as any)?.state ?? m,
              historyCount: hist.length,
              history: [...hist]
            };
          }
          return report;
        };
      }
      if (prop === "subscribeAll") {
        return (listener: (name: string, nextState: any, lastTransition?: TransitionRecord) => void) => {
          globalWatchers.add(listener);
          return () => {
            globalWatchers.delete(listener);
          };
        };
      }
      return target[prop];
    }
  });
}

export function registerMachineForDiagnostics(name: string, machine: any): void {
  globalRegistry[name] = machine;
  if (typeof window !== "undefined") {
    (window as any).__TAB_MACHINES__ = createBridge();
  }
}

export function getDiagnosticsMachines(): TabMachinesBridge {
  return createBridge();
}
