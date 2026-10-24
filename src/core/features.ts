import type { App } from "vue";
import type { CommandRegistry } from "./commands";

export type FeatureCleanup = void | (() => void | Promise<void>) | { unmount(): void } | App<Element>;

export interface FeatureContext {
  signal: AbortSignal;
  commands: CommandRegistry;
  getRoot(id: string): HTMLElement | null;
}

export interface FeatureDefinition {
  id: string;
  title: string;
  order?: number;
  eager?: boolean;
  roots?: readonly string[];
  capabilities?: readonly string[];
  mount(context: FeatureContext): FeatureCleanup | Promise<FeatureCleanup>;
}

export interface FeatureMetadata {
  id: string;
  title: string;
  order: number;
  eager: boolean;
  roots: readonly string[];
  capabilities: readonly string[];
  status: "registered" | "mounting" | "mounted" | "failed";
  error: string;
}

export interface FeatureRegistry {
  register(definition: FeatureDefinition): () => void;
  start(id: string): Promise<unknown>;
  startEager(): Promise<void>;
  stop(id: string): Promise<void>;
  stopAll(): Promise<void>;
  has(id: string): boolean;
  list(): readonly FeatureMetadata[];
}

const featureIdPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

export function createFeatureRegistry(commands: CommandRegistry): FeatureRegistry {
  const definitions = new Map<string, Readonly<FeatureDefinition>>();
  const mounted = new Map<string, { cleanup: FeatureCleanup; controller: AbortController }>();
  const mounting = new Map<string, Promise<unknown>>();
  const failures = new Map<string, unknown>();

  function register(definition: FeatureDefinition): () => void {
    if (!definition || !featureIdPattern.test(definition.id)) throw new TypeError(`Invalid feature id: ${definition?.id || ""}`);
    if (!definition.title?.trim() || typeof definition.mount !== "function") throw new TypeError(`Feature ${definition.id} requires title and mount()`);
    if (definitions.has(definition.id)) throw new Error(`Feature already registered: ${definition.id}`);
    definitions.set(definition.id, Object.freeze({
      ...definition,
      order: Number(definition.order) || 100,
      eager: definition.eager === true,
      roots: Object.freeze([...(definition.roots || [])]),
      capabilities: Object.freeze([...(definition.capabilities || [])])
    }));
    return () => {
      void stop(definition.id);
      failures.delete(definition.id);
      definitions.delete(definition.id);
    };
  }

  function normalizeCleanup(cleanup: FeatureCleanup): () => void | Promise<void> {
    if (typeof cleanup === "function") return cleanup;
    if (cleanup && typeof cleanup.unmount === "function") return () => cleanup.unmount();
    return () => {};
  }

  function start(id: string): Promise<unknown> {
    if (mounted.has(id)) return Promise.resolve(mounted.get(id)?.cleanup);
    if (mounting.has(id)) return mounting.get(id) as Promise<unknown>;
    const definition = definitions.get(id);
    if (!definition) return Promise.reject(new Error(`Unknown feature: ${id}`));

    failures.delete(id);
    const controller = new AbortController();
    const context: FeatureContext = Object.freeze({
      signal: controller.signal,
      commands,
      getRoot: (rootId: string) => document.getElementById(rootId)
    });
    const operation = Promise.resolve().then(() => definition.mount(context)).then((cleanup) => {
      mounting.delete(id);
      mounted.set(id, { cleanup, controller });
      return cleanup;
    }, (error) => {
      mounting.delete(id);
      failures.set(id, error);
      controller.abort();
      throw error;
    });
    mounting.set(id, operation);
    return operation;
  }

  async function stop(id: string): Promise<void> {
    const pending = mounting.get(id);
    if (pending) {
      try { await pending; } catch { return; }
    }
    const record = mounted.get(id);
    if (!record) return;
    mounted.delete(id);
    record.controller.abort();
    await normalizeCleanup(record.cleanup)();
  }

  async function startEager(): Promise<void> {
    const isSpa = typeof document !== "undefined" && Boolean(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root"));
    const eager = [...definitions.values()]
      .filter((definition) => {
        if (!definition.eager) return false;
        if (!isSpa && definition.roots && definition.roots.length > 0) {
          const hasAnyRoot = definition.roots.some((rootId) => Boolean(document.getElementById(rootId)));
          if (!hasAnyRoot) return false;
        }
        return true;
      })
      .sort((a, b) => (a.order || 100) - (b.order || 100));
    const results = await Promise.allSettled(eager.map((definition) => start(definition.id)));
    const failures = results.flatMap((result, index) => result.status === "rejected" ? [{ id: eager[index].id, reason: result.reason }] : []);
    if (failures.length) console.warn("LogicWeaver Vue features failed to mount", failures);
  }

  async function stopAll(): Promise<void> {
    const ids = [...mounted.keys()].reverse();
    await Promise.allSettled(ids.map(stop));
  }

  function list(): readonly FeatureMetadata[] {
    return Object.freeze([...definitions.values()].map((definition) => Object.freeze({
      id: definition.id,
      title: definition.title,
      order: definition.order || 100,
      eager: definition.eager === true,
      roots: Object.freeze([...(definition.roots || [])]),
      capabilities: Object.freeze([...(definition.capabilities || [])]),
      status: mounting.has(definition.id) ? "mounting" as const : mounted.has(definition.id) ? "mounted" as const : failures.has(definition.id) ? "failed" as const : "registered" as const,
      error: failures.has(definition.id) ? String((failures.get(definition.id) as { message?: unknown })?.message || failures.get(definition.id) || "Feature mount failed") : ""
    })).sort((a, b) => a.order - b.order));
  }

  return Object.freeze({ register, start, startEager, stop, stopAll, has: (id: string) => definitions.has(id), list });
}
