/**
 * Launcher Context Menu Explicit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Ensures strictly one context menu (folder / link / page / blank) is open at a time,
 *       and ties secondary delete confirmations to the active menu context.
 * - DX: Consolidates dispersed flags into an explicit state machine.
 * - AX: AI agents can trace and trigger desktop context menu interactions.
 */

export type LauncherActiveMenuKind = "none" | "folder" | "link" | "page" | "blank";
export type LauncherConfirmDeleteTarget = "none" | "link" | "folder" | "page";

export interface LauncherMenuState {
  readonly activeMenu: LauncherActiveMenuKind;
  readonly confirmingDelete: LauncherConfirmDeleteTarget;
  readonly flyoutOpen: boolean;
}

export type LauncherMenuEvent =
  | { type: "OPEN_FOLDER_MENU" }
  | { type: "OPEN_LINK_MENU" }
  | { type: "OPEN_PAGE_MENU" }
  | { type: "OPEN_BLANK_MENU" }
  | { type: "SET_FLYOUT"; open: boolean }
  | { type: "REQUEST_DELETE"; target: LauncherConfirmDeleteTarget }
  | { type: "CANCEL_DELETE" }
  | { type: "CLOSE_ALL" };

const INITIAL_LAUNCHER_MENU_STATE: LauncherMenuState = {
  activeMenu: "none",
  confirmingDelete: "none",
  flyoutOpen: false
};

export class LauncherMenuMachine {
  private _state: LauncherMenuState = { ...INITIAL_LAUNCHER_MENU_STATE };
  private readonly _listeners = new Set<(state: LauncherMenuState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["launcherMenus"] = this;
    }
  }

  public get state(): LauncherMenuState {
    return this._state;
  }

  public get activeMenu(): LauncherActiveMenuKind {
    return this._state.activeMenu;
  }

  public get confirmingDelete(): LauncherConfirmDeleteTarget {
    return this._state.confirmingDelete;
  }

  public get flyoutOpen(): boolean {
    return this._state.flyoutOpen;
  }

  public isMenuOpen(menu: LauncherActiveMenuKind): boolean {
    return this._state.activeMenu === menu;
  }

  public isConfirming(target: LauncherConfirmDeleteTarget): boolean {
    return this._state.confirmingDelete === target;
  }

  public subscribe(listener: (state: LauncherMenuState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: LauncherMenuState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: LauncherMenuEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "OPEN_FOLDER_MENU": {
        this._setState({
          activeMenu: "folder",
          confirmingDelete: "none",
          flyoutOpen: false
        });
        return true;
      }

      case "OPEN_LINK_MENU": {
        this._setState({
          activeMenu: "link",
          confirmingDelete: "none",
          flyoutOpen: false
        });
        return true;
      }

      case "OPEN_PAGE_MENU": {
        this._setState({
          activeMenu: "page",
          confirmingDelete: "none",
          flyoutOpen: false
        });
        return true;
      }

      case "OPEN_BLANK_MENU": {
        this._setState({
          activeMenu: "blank",
          confirmingDelete: "none",
          flyoutOpen: false
        });
        return true;
      }

      case "SET_FLYOUT": {
        if (current.activeMenu === "none") return false;
        this._setState({
          ...current,
          flyoutOpen: event.open
        });
        return true;
      }

      case "REQUEST_DELETE": {
        if (current.activeMenu === "none") return false;
        this._setState({
          ...current,
          confirmingDelete: event.target
        });
        return true;
      }

      case "CANCEL_DELETE": {
        if (current.confirmingDelete !== "none") {
          this._setState({
            ...current,
            confirmingDelete: "none"
          });
          return true;
        }
        return false;
      }

      case "CLOSE_ALL": {
        this._setState({ ...INITIAL_LAUNCHER_MENU_STATE });
        return true;
      }

      default:
        return false;
    }
  }
}
