import { reactive, ref, computed } from "vue";
import { commandRegistry, type CommandMetadata } from "../core/commands";
import { windowManagerController } from "../core/window-manager.store";

export interface CommandPaletteState {
  isOpen: boolean;
  query: string;
  selectedIndex: number;
}

export const commandPaletteState = reactive<CommandPaletteState>({
  isOpen: false,
  query: "",
  selectedIndex: 0
});

let unregisterModalCloser: (() => void) | null = null;

export const commandPaletteController = {
  get state() {
    return commandPaletteState;
  },

  open(): void {
    if (commandPaletteState.isOpen) return;
    commandPaletteState.isOpen = true;
    commandPaletteState.query = "";
    commandPaletteState.selectedIndex = 0;

    // 注册到全局 Escape 关闭链栈顶
    unregisterModalCloser = windowManagerController.pushModalCloser(() => {
      this.close();
      return true;
    });
  },

  close(): void {
    if (!commandPaletteState.isOpen) return;
    commandPaletteState.isOpen = false;
    commandPaletteState.query = "";
    commandPaletteState.selectedIndex = 0;

    if (unregisterModalCloser) {
      unregisterModalCloser();
      unregisterModalCloser = null;
    }
  },

  toggle(): void {
    if (commandPaletteState.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  setQuery(q: string): void {
    commandPaletteState.query = q;
    commandPaletteState.selectedIndex = 0;
  },

  selectNext(total: number): void {
    if (total <= 0) return;
    commandPaletteState.selectedIndex = (commandPaletteState.selectedIndex + 1) % total;
  },

  selectPrev(total: number): void {
    if (total <= 0) return;
    commandPaletteState.selectedIndex = (commandPaletteState.selectedIndex - 1 + total) % total;
  },

  async executeCommand(cmd: CommandMetadata): Promise<void> {
    this.close();
    try {
      await commandRegistry.execute(cmd.id, undefined, "command-palette");
    } catch (err: any) {
      console.warn(`[CommandPalette] Failed to execute ${cmd.id}:`, err);
    }
  }
};

// 全局监听快捷键 Ctrl+K / Cmd+K 与 Alt+Space
if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    const key = (e.key || "").toLowerCase();
    const isCtrlK = (e.ctrlKey || e.metaKey) && key === "k";
    const isAltSpace = e.altKey && (e.code === "Space" || key === " ");

    if (isCtrlK || isAltSpace) {
      e.preventDefault();
      e.stopPropagation();
      commandPaletteController.toggle();
    }
  }, true);
}
