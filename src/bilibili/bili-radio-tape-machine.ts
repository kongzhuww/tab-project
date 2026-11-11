/**
 * Bilibili Radio Tape Player Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Ensures cassette tape insertion animation, drag-over slot, series popover,
 *       and dock collapse are mutually exclusive and clean.
 * - DX: Consolidates isDragOver, isInserting, isCollapsed, isSeriesPickerOpen into a single state machine.
 * - AX: AI agents can predictably trace and control cassette deck interactions.
 */

export type TapePlayerPhase =
  | "idle"
  | "drag_over"
  | "inserting"
  | "collapsed";

export interface TapeMachineState {
  readonly phase: TapePlayerPhase;
  readonly isSeriesPickerOpen: boolean;
  readonly insertedTitle: string;
}

export type TapeMachineEvent =
  | { type: "DRAG_ENTER" }
  | { type: "DRAG_LEAVE" }
  | { type: "START_INSERT"; title: string }
  | { type: "FINISH_INSERT" }
  | { type: "TOGGLE_SERIES_PICKER"; open?: boolean }
  | { type: "TOGGLE_COLLAPSE"; collapsed?: boolean }
  | { type: "RESET_IDLE" };

const INITIAL_TAPE_STATE: TapeMachineState = {
  phase: "idle",
  isSeriesPickerOpen: false,
  insertedTitle: ""
};

export class BiliRadioTapeMachine {
  private _state: TapeMachineState = { ...INITIAL_TAPE_STATE };
  private readonly _listeners = new Set<(state: TapeMachineState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["biliRadioTape"] = this;
    }
  }

  public get state(): TapeMachineState {
    return this._state;
  }

  public get phase(): TapePlayerPhase {
    return this._state.phase;
  }

  public get isDragOver(): boolean {
    return this._state.phase === "drag_over";
  }

  public get isInserting(): boolean {
    return this._state.phase === "inserting";
  }

  public get isCollapsed(): boolean {
    return this._state.phase === "collapsed";
  }

  public get isSeriesPickerOpen(): boolean {
    return this._state.isSeriesPickerOpen;
  }

  public get insertedTitle(): string {
    return this._state.insertedTitle;
  }

  public subscribe(listener: (state: TapeMachineState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: TapeMachineState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: TapeMachineEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "DRAG_ENTER": {
        if (current.phase === "idle") {
          this._setState({
            ...current,
            phase: "drag_over"
          });
          return true;
        }
        return false;
      }

      case "DRAG_LEAVE": {
        if (current.phase === "drag_over") {
          this._setState({
            ...current,
            phase: "idle"
          });
          return true;
        }
        return false;
      }

      case "START_INSERT": {
        this._setState({
          phase: "inserting",
          isSeriesPickerOpen: false,
          insertedTitle: event.title
        });
        return true;
      }

      case "FINISH_INSERT": {
        if (current.phase === "inserting") {
          this._setState({
            phase: "idle",
            isSeriesPickerOpen: false,
            insertedTitle: ""
          });
          return true;
        }
        return false;
      }

      case "TOGGLE_SERIES_PICKER": {
        if (current.phase === "collapsed" || current.phase === "inserting") return false;
        const next = event.open !== undefined ? event.open : !current.isSeriesPickerOpen;
        this._setState({
          ...current,
          isSeriesPickerOpen: next
        });
        return true;
      }

      case "TOGGLE_COLLAPSE": {
        const nextCollapsed = event.collapsed !== undefined ? event.collapsed : current.phase !== "collapsed";
        this._setState({
          phase: nextCollapsed ? "collapsed" : "idle",
          isSeriesPickerOpen: false,
          insertedTitle: ""
        });
        return true;
      }

      case "RESET_IDLE": {
        this._setState({ ...INITIAL_TAPE_STATE });
        return true;
      }

      default:
        return false;
    }
  }
}
