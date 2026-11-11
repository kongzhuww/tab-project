/**
 * NetEase Account Auth Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Prevents concurrent duplicate connection attempts and displays accurate auth phases.
 * - DX: Replaces dispersed boolean flags (websiteConnecting, neteaseQrStatus) with a deterministic machine.
 * - AX: AI agents can trace account auth state and transitions clearly.
 */

import type { NeteaseUser } from "../services/netease.service";

export type NeteaseAuthPhase =
  | "unauthenticated"
  | "connecting"
  | "authenticated"
  | "error";

export interface NeteaseAuthState {
  readonly phase: NeteaseAuthPhase;
  readonly user: NeteaseUser | null;
  readonly message: string;
}

export type NeteaseAuthEvent =
  | { type: "START_CONNECT" }
  | { type: "CONNECT_SUCCESS"; user: NeteaseUser | null }
  | { type: "CONNECT_FAILURE"; message: string }
  | { type: "LOGOUT" }
  | { type: "SYNC_USER"; user: NeteaseUser | null };

const INITIAL_AUTH_STATE: NeteaseAuthState = {
  phase: "unauthenticated",
  user: null,
  message: ""
};

export class NeteaseAuthMachine {
  private _state: NeteaseAuthState;
  private readonly _listeners = new Set<(state: NeteaseAuthState) => void>();

  constructor(initialUser: NeteaseUser | null = null) {
    this._state = {
      phase: initialUser ? "authenticated" : "unauthenticated",
      user: initialUser,
      message: initialUser ? "官网账户已连接" : ""
    };
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["neteaseAuth"] = this;
    }
  }

  public get state(): NeteaseAuthState {
    return this._state;
  }

  public get phase(): NeteaseAuthPhase {
    return this._state.phase;
  }

  public get isConnecting(): boolean {
    return this._state.phase === "connecting";
  }

  public get isAuthenticated(): boolean {
    return this._state.phase === "authenticated";
  }

  public subscribe(listener: (state: NeteaseAuthState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: NeteaseAuthState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: NeteaseAuthEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "START_CONNECT": {
        if (current.phase === "connecting") return false;
        this._setState({
          phase: "connecting",
          user: current.user,
          message: "正在连接官网账户…"
        });
        return true;
      }

      case "CONNECT_SUCCESS": {
        this._setState({
          phase: "authenticated",
          user: event.user,
          message: "官网账户已连接"
        });
        return true;
      }

      case "CONNECT_FAILURE": {
        this._setState({
          phase: "error",
          user: null,
          message: event.message
        });
        return true;
      }

      case "LOGOUT": {
        this._setState({
          phase: "unauthenticated",
          user: null,
          message: "已断开账户"
        });
        return true;
      }

      case "SYNC_USER": {
        this._setState({
          phase: event.user ? "authenticated" : "unauthenticated",
          user: event.user,
          message: event.user ? "官网账户已连接" : ""
        });
        return true;
      }

      default:
        return false;
    }
  }
}
