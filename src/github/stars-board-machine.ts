/**
 * GitHub Stars Board Interaction State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Ensures strict mutual exclusivity between card dragging, column reordering,
 *       and context/popover menus, eliminating race conditions and ghost menus.
 * - DX: Replaces fragmented refs (activeDragRepo, activeDragFromList, hoverTargetColumn,
 *       draggingColumnId, hoverColumnId, listMenuState, contextMenuState) with a single
 *       strongly typed state machine.
 * - AX: AI agents can predictably trace and trigger kanban interactions without DOM guesswork.
 */

import type { GitHubRawRepo } from "../services/github.service";

export type BoardInteractionMode =
  | "idle"
  | "dragging_repo"
  | "dragging_column"
  | "repo_context_menu"
  | "column_menu";

export interface RepoContextMenuPayload {
  x: number;
  y: number;
  repo: GitHubRawRepo;
  fromList: string | null;
  activeSubMenu?: string | null;
  isFlyoutLeft?: boolean;
}

export interface ColumnMenuPayload {
  x: number;
  y: number;
  list: any;
}

export interface BoardInteractionState {
  readonly mode: BoardInteractionMode;
  readonly activeDragRepo: GitHubRawRepo | null;
  readonly activeDragFromList: string | null;
  readonly hoverTargetColumn: string | null;
  readonly draggingColumnId: string | null;
  readonly hoverColumnId: string | null;
  readonly repoMenu: RepoContextMenuPayload | null;
  readonly columnMenu: ColumnMenuPayload | null;
}

export type BoardInteractionEvent =
  | { type: "START_DRAG_REPO"; repo: GitHubRawRepo; fromList: string | null }
  | { type: "HOVER_TARGET_COLUMN"; columnId: string | null }
  | { type: "END_DRAG_REPO" }
  | { type: "START_DRAG_COLUMN"; columnId: string }
  | { type: "HOVER_COLUMN_REORDER"; columnId: string | null }
  | { type: "END_DRAG_COLUMN" }
  | { type: "OPEN_REPO_MENU"; payload: RepoContextMenuPayload }
  | { type: "CLOSE_REPO_MENU" }
  | { type: "OPEN_COLUMN_MENU"; payload: ColumnMenuPayload }
  | { type: "CLOSE_COLUMN_MENU" }
  | { type: "RESET_IDLE" };

const IDLE_STATE: BoardInteractionState = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};

export class BoardInteractionMachine {
  private _state: BoardInteractionState = { ...IDLE_STATE };
  private readonly _listeners = new Set<(state: BoardInteractionState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["githubStarsBoard"] = this;
    }
  }

  public get state(): BoardInteractionState {
    return this._state;
  }

  public get mode(): BoardInteractionMode {
    return this._state.mode;
  }

  public get isDraggingRepo(): boolean {
    return this._state.mode === "dragging_repo";
  }

  public get isDraggingColumn(): boolean {
    return this._state.mode === "dragging_column";
  }

  public get activeDragRepo(): GitHubRawRepo | null {
    return this._state.activeDragRepo;
  }

  public get activeDragFromList(): string | null {
    return this._state.activeDragFromList;
  }

  public get hoverTargetColumn(): string | null {
    return this._state.hoverTargetColumn;
  }

  public get draggingColumnId(): string | null {
    return this._state.draggingColumnId;
  }

  public get hoverColumnId(): string | null {
    return this._state.hoverColumnId;
  }

  public get repoMenu(): RepoContextMenuPayload | null {
    return this._state.repoMenu;
  }

  public get columnMenu(): ColumnMenuPayload | null {
    return this._state.columnMenu;
  }

  public subscribe(listener: (state: BoardInteractionState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: BoardInteractionState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: BoardInteractionEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "START_DRAG_REPO": {
        this._setState({
          mode: "dragging_repo",
          activeDragRepo: event.repo,
          activeDragFromList: event.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        });
        return true;
      }

      case "HOVER_TARGET_COLUMN": {
        if (current.mode === "dragging_repo") {
          this._setState({
            ...current,
            hoverTargetColumn: event.columnId
          });
          return true;
        }
        return false;
      }

      case "END_DRAG_REPO": {
        if (current.mode === "dragging_repo") {
          this._setState({ ...IDLE_STATE });
          return true;
        }
        return false;
      }

      case "START_DRAG_COLUMN": {
        this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: event.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        });
        return true;
      }

      case "HOVER_COLUMN_REORDER": {
        if (current.mode === "dragging_column") {
          this._setState({
            ...current,
            hoverColumnId: event.columnId
          });
          return true;
        }
        return false;
      }

      case "END_DRAG_COLUMN": {
        if (current.mode === "dragging_column") {
          this._setState({ ...IDLE_STATE });
          return true;
        }
        return false;
      }

      case "OPEN_REPO_MENU": {
        this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: event.payload,
          columnMenu: null
        });
        return true;
      }

      case "CLOSE_REPO_MENU": {
        if (current.mode === "repo_context_menu") {
          this._setState({ ...IDLE_STATE });
          return true;
        }
        return false;
      }

      case "OPEN_COLUMN_MENU": {
        this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: event.payload
        });
        return true;
      }

      case "CLOSE_COLUMN_MENU": {
        if (current.mode === "column_menu") {
          this._setState({ ...IDLE_STATE });
          return true;
        }
        return false;
      }

      case "RESET_IDLE": {
        this._setState({ ...IDLE_STATE });
        return true;
      }

      default:
        return false;
    }
  }
}
