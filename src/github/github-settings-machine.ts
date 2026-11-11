/**
 * GitHub Module Settings Modal Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Prevents concurrent token verification tests while saving, provides clean status feedback.
 * - DX: Consolidates isTesting, isSaving, ready, testResult into deterministic phases.
 * - AX: AI agents can trace token validation and settings persistence.
 */

export type GitHubSettingsPhase =
  | "uninitialized"
  | "idle"
  | "testing"
  | "saving"
  | "failed_load";

export interface GitHubTestResult {
  readonly success: boolean;
  readonly message: string;
  readonly rateLimit?: { readonly remaining: number; readonly limit: number };
}

export interface GitHubSettingsMachineState {
  readonly phase: GitHubSettingsPhase;
  readonly message: string;
  readonly testResult: GitHubTestResult | null;
}

export type GitHubSettingsMachineEvent =
  | { type: "LOAD_SUCCESS" }
  | { type: "LOAD_FAILURE"; message: string }
  | { type: "START_TEST" }
  | { type: "TEST_SUCCESS"; result: GitHubTestResult }
  | { type: "TEST_FAILURE"; message: string }
  | { type: "START_SAVE" }
  | { type: "SAVE_COMPLETE"; message: string }
  | { type: "SAVE_FAILURE"; message: string }
  | { type: "RESET_MESSAGE" };

const INITIAL_GH_SETTINGS_STATE: GitHubSettingsMachineState = {
  phase: "uninitialized",
  message: "",
  testResult: null
};

export class GitHubSettingsMachine {
  private _state: GitHubSettingsMachineState = { ...INITIAL_GH_SETTINGS_STATE };
  private readonly _listeners = new Set<(state: GitHubSettingsMachineState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["githubSettings"] = this;
    }
  }

  public get state(): GitHubSettingsMachineState {
    return this._state;
  }

  public get phase(): GitHubSettingsPhase {
    return this._state.phase;
  }

  public get isReady(): boolean {
    return this._state.phase !== "uninitialized" && this._state.phase !== "failed_load";
  }

  public get isTesting(): boolean {
    return this._state.phase === "testing";
  }

  public get isSaving(): boolean {
    return this._state.phase === "saving";
  }

  public get isBusy(): boolean {
    return this._state.phase === "testing" || this._state.phase === "saving";
  }

  public get message(): string {
    return this._state.message;
  }

  public get testResult(): GitHubTestResult | null {
    return this._state.testResult;
  }

  public subscribe(listener: (state: GitHubSettingsMachineState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: GitHubSettingsMachineState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: GitHubSettingsMachineEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "LOAD_SUCCESS": {
        this._setState({
          phase: "idle",
          message: "",
          testResult: null
        });
        return true;
      }

      case "LOAD_FAILURE": {
        this._setState({
          phase: "failed_load",
          message: event.message,
          testResult: null
        });
        return true;
      }

      case "START_TEST": {
        if (!this.isReady || this.isBusy) return false;
        this._setState({
          ...current,
          phase: "testing",
          testResult: null
        });
        return true;
      }

      case "TEST_SUCCESS": {
        this._setState({
          ...current,
          phase: "idle",
          testResult: event.result
        });
        return true;
      }

      case "TEST_FAILURE": {
        this._setState({
          ...current,
          phase: "idle",
          testResult: { success: false, message: event.message }
        });
        return true;
      }

      case "START_SAVE": {
        if (!this.isReady || this.isBusy) return false;
        this._setState({
          ...current,
          phase: "saving"
        });
        return true;
      }

      case "SAVE_COMPLETE": {
        this._setState({
          ...current,
          phase: "idle",
          message: event.message
        });
        return true;
      }

      case "SAVE_FAILURE": {
        this._setState({
          ...current,
          phase: "idle",
          message: event.message
        });
        return true;
      }

      case "RESET_MESSAGE": {
        this._setState({
          ...current,
          message: ""
        });
        return true;
      }

      default:
        return false;
    }
  }
}
