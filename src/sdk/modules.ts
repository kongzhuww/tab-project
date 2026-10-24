// The existing registry is the only source of truth. Trusted compiled-in modules only.
// Capabilities are documentation, NOT an enforced permission boundary.
export { registerDockModule, getDockModule, listDockModuleMetadata } from "../modules/registry";
export type { DockModuleDefinition } from "../modules/registry";
