import type { Component } from "vue";

/** Trusted, compiled-in Vue modules only. Metadata is not a security sandbox. */
export interface DockModuleDefinition {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly title: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly dockBefore?: string;
  /** Fullscreen cards stay in their original workspace slot, not the floating window host. */
  readonly presentation?: "window" | "card";
  /** Card-only migration policy; default on-open. workspace-ready preserves legacy startup timing. */
  readonly mountPolicy?: "on-open" | "workspace-ready";
  /** Auxiliary registered windows share lifecycle without adding a Dock icon. */
  readonly showInDock?: boolean;
  readonly rootId: string;
  readonly settingsKeys: readonly string[];
  readonly capabilities: readonly string[];
  /** Lightweight reactive presentation only; never loads the service or credentials. */
  readonly badgeCount?: () => number;
  readonly loadView: () => Promise<Component>;
  readonly lifecycle: {
    readonly isVisible: () => boolean;
    /** Synchronous guard checked before window state or transition changes. */
    readonly canOpen?: () => boolean;
    readonly open: () => void;
    readonly hide: () => void;
    readonly canUnmount?: () => boolean;
    /** Explicit Dock Quit only. Never called for Hide or Reload. Failure preserves the view. */
    readonly beforeQuit?: () => Promise<void>;
    readonly unmountBlockedMessage?: string;
  };
}

const definitions = new Map<string, DockModuleDefinition>();
const transitionVersions = new Map<string, number>();
export function touchDockModuleTransition(id: string): number {
  const version = (transitionVersions.get(id) || 0) + 1;
  transitionVersions.set(id, version);
  return version;
}
export function getDockModuleTransition(id: string): number {
  return transitionVersions.get(id) || 0;
}
export function registerDockModule(definition: DockModuleDefinition): void {
  if (definition.schemaVersion !== 1 || !/^[a-z][a-z0-9-]*$/.test(definition.id) || !definition.rootId || !definition.title) {
    throw new Error("Invalid built-in Dock module definition");
  }
  if (definition.presentation === "card" && !definition.icon) throw new Error("Workspace card requires its original Dock icon");
  if (definitions.has(definition.id)) throw new Error("Duplicate built-in Dock module ID");
  definitions.set(definition.id, Object.freeze({
    ...definition,
    settingsKeys: Object.freeze([...definition.settingsKeys]),
    capabilities: Object.freeze([...definition.capabilities]),
    lifecycle: Object.freeze({ ...definition.lifecycle })
  }));
}
export function getDockModule(id: string): DockModuleDefinition | undefined {
  return definitions.get(id);
}
export function listDockModules(): readonly DockModuleDefinition[] {
  return [...definitions.values()];
}
export function listDockModuleMetadata() {
  return listDockModules().map(({ schemaVersion, id, title, rootId, settingsKeys, capabilities, showInDock, presentation }) => ({
    schemaVersion, id, title, rootId, presentation: presentation || "window", showInDock: showInDock !== false, settingsKeys: [...settingsKeys], capabilities: [...capabilities]
  }));
}
