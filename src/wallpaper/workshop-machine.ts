/**
 * Wallpaper Engine Workshop & Import Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Prevents concurrent scans, double-applying, or drag-and-drop collisions during OPFS writes.
 * - DX: Consolidates dispersed flags (isScanningWorkshop, applyingWorkshopId, isDraggingOver) into deterministic phases.
 * - AX: AI agents can trace workshop connection and wallpaper application states.
 */

export type WorkshopPhase =
  | "idle"
  | "scanning"
  | "applying"
  | "dragging_file"
  | "error";

export interface WorkshopMachineState {
  readonly phase: WorkshopPhase;
  readonly applyingId: string | null;
  readonly error: string;
}

export type WorkshopMachineEvent =
  | { type: "START_SCAN" }
  | { type: "SCAN_COMPLETE"; count?: number }
  | { type: "START_APPLY"; itemId: string }
  | { type: "APPLY_COMPLETE" }
  | { type: "ERROR"; message: string }
  | { type: "DRAG_ENTER" }
  | { type: "DRAG_LEAVE" }
  | { type: "RESET_IDLE" };

const INITIAL_WORKSHOP_STATE: WorkshopMachineState = {
  phase: "idle",
  applyingId: null,
  error: ""
};

export class WorkshopMachine {
  private _state: WorkshopMachineState = { ...INITIAL_WORKSHOP_STATE };
  private readonly _listeners = new Set<(state: WorkshopMachineState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["wallpaperWorkshop"] = this;
    }
  }

  public get state(): WorkshopMachineState {
    return this._state;
  }

  public get phase(): WorkshopPhase {
    return this._state.phase;
  }

  public get isScanning(): boolean {
    return this._state.phase === "scanning";
  }

  public get isApplying(): boolean {
    return this._state.phase === "applying";
  }

  public get applyingId(): string | null {
    return this._state.phase === "applying" ? this._state.applyingId : null;
  }

  public get isDraggingOver(): boolean {
    return this._state.phase === "dragging_file";
  }

  public subscribe(listener: (state: WorkshopMachineState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: WorkshopMachineState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: WorkshopMachineEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "START_SCAN": {
        if (current.phase === "scanning" || current.phase === "applying") return false;
        this._setState({
          phase: "scanning",
          applyingId: null,
          error: ""
        });
        return true;
      }

      case "SCAN_COMPLETE": {
        if (current.phase === "scanning") {
          this._setState({
            phase: "idle",
            applyingId: null,
            error: ""
          });
          return true;
        }
        return false;
      }

      case "START_APPLY": {
        if (current.phase === "applying" || current.phase === "scanning") return false;
        this._setState({
          phase: "applying",
          applyingId: event.itemId,
          error: ""
        });
        return true;
      }

      case "APPLY_COMPLETE": {
        if (current.phase === "applying") {
          this._setState({
            phase: "idle",
            applyingId: null,
            error: ""
          });
          return true;
        }
        return false;
      }

      case "ERROR": {
        this._setState({
          phase: "error",
          applyingId: null,
          error: event.message
        });
        return true;
      }

      case "DRAG_ENTER": {
        if (current.phase === "idle") {
          this._setState({
            ...current,
            phase: "dragging_file"
          });
          return true;
        }
        return false;
      }

      case "DRAG_LEAVE": {
        if (current.phase === "dragging_file") {
          this._setState({
            ...current,
            phase: "idle"
          });
          return true;
        }
        return false;
      }

      case "RESET_IDLE": {
        this._setState({ ...INITIAL_WORKSHOP_STATE });
        return true;
      }

      default:
        return false;
    }
  }
}
