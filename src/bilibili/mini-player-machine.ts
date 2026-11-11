/**
 * Bilibili Mini Player Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Ensures mutually exclusive playback phases (closed -> loading -> playing/paused / error)
 *       and window layout consistency (collapsing automatically hides open drawers & menus).
 * - DX: Consolidates dispersed flags (isOpen, isLoading, isPlaying, errorMsg, collapsed, 3 drawers, 2 menus)
 *       into explicit transitions with clear event types.
 * - AX: AI agents can reason about player lifecycle and transitions without introducing ghost states.
 */

export type MiniPlayerPhase =
  | "closed"
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "error";

export type MiniPlayerDrawer = "episodes" | "desc" | "comments";

export interface MiniPlayerMachineState {
  readonly phase: MiniPlayerPhase;
  readonly isCollapsed: boolean;
  readonly openDrawers: ReadonlySet<MiniPlayerDrawer>;
  readonly qualityMenuOpen: boolean;
  readonly speedMenuOpen: boolean;
  readonly error: string;
}

export type MiniPlayerMachineEvent =
  | { type: "OPEN_START" }
  | { type: "STREAM_RESOLVED"; isPlaying?: boolean }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "RELOAD_START" }
  | { type: "ERROR"; message: string }
  | { type: "TOGGLE_COLLAPSE"; collapsed?: boolean }
  | { type: "TOGGLE_DRAWER"; drawer: MiniPlayerDrawer; open?: boolean }
  | { type: "SET_QUALITY_MENU"; open: boolean }
  | { type: "SET_SPEED_MENU"; open: boolean }
  | { type: "CLOSE" };

const INITIAL_PLAYER_STATE: MiniPlayerMachineState = {
  phase: "closed",
  isCollapsed: false,
  openDrawers: new Set<MiniPlayerDrawer>(),
  qualityMenuOpen: false,
  speedMenuOpen: false,
  error: ""
};

export class MiniPlayerMachine {
  private _state: MiniPlayerMachineState = { ...INITIAL_PLAYER_STATE };
  private readonly _listeners = new Set<(state: MiniPlayerMachineState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["biliMiniPlayer"] = this;
    }
  }

  public get state(): MiniPlayerMachineState {
    return this._state;
  }

  public get phase(): MiniPlayerPhase {
    return this._state.phase;
  }

  public get isOpen(): boolean {
    return this._state.phase !== "closed";
  }

  public get isLoading(): boolean {
    return this._state.phase === "loading";
  }

  public get isPlaying(): boolean {
    return this._state.phase === "playing";
  }

  public get isCollapsed(): boolean {
    return this._state.isCollapsed;
  }

  public get error(): string {
    return this._state.error;
  }

  public get qualityMenuOpen(): boolean {
    return this._state.qualityMenuOpen;
  }

  public get speedMenuOpen(): boolean {
    return this._state.speedMenuOpen;
  }

  public isDrawerOpen(drawer: MiniPlayerDrawer): boolean {
    return this._state.openDrawers.has(drawer);
  }

  public subscribe(listener: (state: MiniPlayerMachineState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: MiniPlayerMachineState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: MiniPlayerMachineEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "OPEN_START": {
        this._setState({
          phase: "loading",
          isCollapsed: false,
          openDrawers: new Set<MiniPlayerDrawer>(),
          qualityMenuOpen: false,
          speedMenuOpen: false,
          error: ""
        });
        return true;
      }

      case "STREAM_RESOLVED": {
        if (current.phase === "closed") return false;
        const willPlay = event.isPlaying !== false;
        this._setState({
          ...current,
          phase: willPlay ? "playing" : "ready",
          error: ""
        });
        return true;
      }

      case "PLAY": {
        if (current.phase === "closed" || current.phase === "loading") return false;
        this._setState({
          ...current,
          phase: "playing"
        });
        return true;
      }

      case "PAUSE": {
        if (current.phase === "playing") {
          this._setState({
            ...current,
            phase: "paused"
          });
          return true;
        }
        return false;
      }

      case "RELOAD_START": {
        if (current.phase === "closed") return false;
        this._setState({
          ...current,
          phase: "loading",
          error: ""
        });
        return true;
      }

      case "ERROR": {
        if (current.phase === "closed") return false;
        this._setState({
          ...current,
          phase: "error",
          error: event.message
        });
        return true;
      }

      case "TOGGLE_COLLAPSE": {
        if (current.phase === "closed") return false;
        const nextCollapsed = event.collapsed !== undefined ? event.collapsed : !current.isCollapsed;
        this._setState({
          ...current,
          isCollapsed: nextCollapsed,
          openDrawers: nextCollapsed ? new Set<MiniPlayerDrawer>() : current.openDrawers,
          qualityMenuOpen: nextCollapsed ? false : current.qualityMenuOpen,
          speedMenuOpen: nextCollapsed ? false : current.speedMenuOpen
        });
        return true;
      }

      case "TOGGLE_DRAWER": {
        if (current.phase === "closed" || current.isCollapsed) return false;
        const nextDrawers = new Set(current.openDrawers);
        const isOpen = nextDrawers.has(event.drawer);
        const targetOpen = event.open !== undefined ? event.open : !isOpen;
        if (targetOpen) {
          nextDrawers.add(event.drawer);
        } else {
          nextDrawers.delete(event.drawer);
        }
        this._setState({
          ...current,
          openDrawers: nextDrawers
        });
        return true;
      }

      case "SET_QUALITY_MENU": {
        if (current.phase === "closed" || current.isCollapsed) return false;
        this._setState({
          ...current,
          qualityMenuOpen: event.open,
          speedMenuOpen: event.open ? false : current.speedMenuOpen
        });
        return true;
      }

      case "SET_SPEED_MENU": {
        if (current.phase === "closed" || current.isCollapsed) return false;
        this._setState({
          ...current,
          speedMenuOpen: event.open,
          qualityMenuOpen: event.open ? false : current.qualityMenuOpen
        });
        return true;
      }

      case "CLOSE": {
        this._setState({
          phase: "closed",
          isCollapsed: false,
          openDrawers: new Set<MiniPlayerDrawer>(),
          qualityMenuOpen: false,
          speedMenuOpen: false,
          error: ""
        });
        return true;
      }

      default:
        return false;
    }
  }
}
