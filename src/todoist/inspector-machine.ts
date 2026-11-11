/**
 * Todoist Task Inspector Popover & Edit State Machine
 *
 * Elevates UX, DX, and AX:
 * - UX: Ensures strictly one active inspector popover at any time (no overlapping popovers).
 * - DX: Replaces 5 independent popover booleans and manual synchronization with a single source of truth.
 * - AX: AI agents can predictably query and transition popovers via explicit events.
 */

export type InspectorPopover =
  | "none"
  | "start_date"
  | "due_date"
  | "priority"
  | "labels"
  | "reminder";

export interface InspectorMachineState {
  readonly activePopover: InspectorPopover;
  readonly isDescEditing: boolean;
}

export type InspectorMachineEvent =
  | { type: "OPEN_POPOVER"; popover: InspectorPopover }
  | { type: "TOGGLE_POPOVER"; popover: InspectorPopover }
  | { type: "CLOSE_POPOVER" }
  | { type: "START_DESC_EDIT" }
  | { type: "FINISH_DESC_EDIT" }
  | { type: "RESET_ALL" };

const INITIAL_INSPECTOR_STATE: InspectorMachineState = {
  activePopover: "none",
  isDescEditing: false
};

export class TodoistInspectorMachine {
  private _state: InspectorMachineState = { ...INITIAL_INSPECTOR_STATE };
  private readonly _listeners = new Set<(state: InspectorMachineState) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      (window as any).__TAB_MACHINES__ = (window as any).__TAB_MACHINES__ || {};
      (window as any).__TAB_MACHINES__["todoistInspector"] = this;
    }
  }

  public get state(): InspectorMachineState {
    return this._state;
  }

  public get activePopover(): InspectorPopover {
    return this._state.activePopover;
  }

  public get isDescEditing(): boolean {
    return this._state.isDescEditing;
  }

  public isPopoverOpen(popover: InspectorPopover): boolean {
    return this._state.activePopover === popover;
  }

  public subscribe(listener: (state: InspectorMachineState) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  private _setState(next: InspectorMachineState): void {
    this._state = next;
    for (const listener of this._listeners) {
      listener(next);
    }
  }

  public send(event: InspectorMachineEvent): boolean {
    const current = this._state;

    switch (event.type) {
      case "OPEN_POPOVER": {
        this._setState({
          ...current,
          activePopover: event.popover
        });
        return true;
      }

      case "TOGGLE_POPOVER": {
        const next = current.activePopover === event.popover ? "none" : event.popover;
        this._setState({
          ...current,
          activePopover: next
        });
        return true;
      }

      case "CLOSE_POPOVER": {
        if (current.activePopover !== "none") {
          this._setState({
            ...current,
            activePopover: "none"
          });
          return true;
        }
        return false;
      }

      case "START_DESC_EDIT": {
        this._setState({
          ...current,
          isDescEditing: true,
          activePopover: "none"
        });
        return true;
      }

      case "FINISH_DESC_EDIT": {
        if (current.isDescEditing) {
          this._setState({
            ...current,
            isDescEditing: false
          });
          return true;
        }
        return false;
      }

      case "RESET_ALL": {
        this._setState({ ...INITIAL_INSPECTOR_STATE });
        return true;
      }

      default:
        return false;
    }
  }
}
