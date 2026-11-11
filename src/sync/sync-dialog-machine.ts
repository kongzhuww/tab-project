/**
 * SyncWorkspaceDialog Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Prevents illegal state combinations, prevents concurrent duplicate clicks during async I/O.
 * - DX: Single source of truth for all phases, explicit transitions with guard conditions.
 * - AX: AI agents can reason about dialog lifecycle, valid states, and legal events declaratively.
 */

export type SyncOperation = "webdav-push" | "webdav-pull" | "cloud-push" | "cloud-pull";

export type SyncDialogPhase =
  | "uninitialized"
  | "idle"
  | "saving"
  | "testing"
  | "confirming"
  | "syncing"
  | "failed_init";

export interface SyncDialogState {
  readonly phase: SyncDialogPhase;
  readonly pendingOperation: SyncOperation | null;
  readonly message: string;
}

export type SyncDialogEvent =
  | { type: "INIT_SUCCESS" }
  | { type: "INIT_FAILURE"; error: string }
  | { type: "START_SAVE" }
  | { type: "START_TEST" }
  | { type: "REQUEST_OPERATION"; operation: SyncOperation }
  | { type: "CANCEL_CONFIRMATION" }
  | { type: "START_SYNC" }
  | { type: "OPERATION_COMPLETE"; message: string }
  | { type: "OPERATION_FAILED"; message: string }
  | { type: "SET_MESSAGE"; message: string };

const INITIAL_SYNC_STATE: SyncDialogState = {
  phase: "uninitialized",
  pendingOperation: null,
  message: ""
};

export class SyncDialogMachine {
  private _state: SyncDialogState = { ...INITIAL_SYNC_STATE };
  private readonly _listeners = new Set<(state: SyncDialogState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["syncDialog"] = this;
    }
  }

  public get state(): SyncDialogState {
    return this._state;
  }

  public get phase(): SyncDialogPhase {
    return this._state.phase;
  }

  public get isReady(): boolean {
    return this._state.phase !== "uninitialized" && this._state.phase !== "failed_init";
  }

  public get isBusy(): boolean {
    return (
      this._state.phase === "saving" ||
      this._state.phase === "testing" ||
      this._state.phase === "syncing"
    );
  }

  public get pendingOperation(): SyncOperation | null {
    return this._state.phase === "confirming" ? this._state.pendingOperation : null;
  }

  public get message(): string {
    return this._state.message;
  }

  public subscribe(listener: (state: SyncDialogState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: SyncDialogState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: SyncDialogEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "INIT_SUCCESS": {
        if (current.phase === "uninitialized" || current.phase === "failed_init") {
          this._setState({ phase: "idle", pendingOperation: null, message: current.message });
          return true;
        }
        return false;
      }

      case "INIT_FAILURE": {
        this._setState({ phase: "failed_init", pendingOperation: null, message: event.error });
        return true;
      }

      case "START_SAVE": {
        if (this.isReady && !this.isBusy) {
          this._setState({ phase: "saving", pendingOperation: null, message: current.message });
          return true;
        }
        return false;
      }

      case "START_TEST": {
        if (this.isReady && !this.isBusy) {
          this._setState({ phase: "testing", pendingOperation: null, message: current.message });
          return true;
        }
        return false;
      }

      case "REQUEST_OPERATION": {
        if (this.isReady && !this.isBusy) {
          this._setState({
            phase: "confirming",
            pendingOperation: event.operation,
            message: current.message
          });
          return true;
        }
        return false;
      }

      case "CANCEL_CONFIRMATION": {
        if (current.phase === "confirming") {
          this._setState({ phase: "idle", pendingOperation: null, message: current.message });
          return true;
        }
        return false;
      }

      case "START_SYNC": {
        if (current.phase === "confirming" && current.pendingOperation) {
          this._setState({
            phase: "syncing",
            pendingOperation: current.pendingOperation,
            message: current.message
          });
          return true;
        }
        return false;
      }

      case "OPERATION_COMPLETE":
      case "OPERATION_FAILED": {
        this._setState({
          phase: "idle",
          pendingOperation: null,
          message: event.message
        });
        return true;
      }

      case "SET_MESSAGE": {
        this._setState({
          ...current,
          message: event.message
        });
        return true;
      }

      default:
        return false;
    }
  }
}
