import { reactive } from "vue";

export const todoistModuleState = reactive({ visible: false, active: false, pendingWrites: 0, session: 0, dataRevision: 0 });
const pausers = new Set<() => void>();
export function onTodoistPause(pause: () => void): () => void {
  pausers.add(pause); return () => { pausers.delete(pause); };
}
export function pauseTodoistReads(): void {
  todoistModuleState.active = false;
  for (const pause of pausers) pause();
}
export async function withTodoistWrite<T>(operation: () => Promise<T>): Promise<T> {
  // Count, do not serialize/retry or cancel posted mutations. Shared home/calendar writes also count.
  todoistModuleState.pendingWrites++;
  try { return await operation(); } finally { todoistModuleState.pendingWrites--; }
}
/** Stable wrappers at the exported domain boundary; never a process-global abort controller. */
export function trackTodoistWrites<T extends object>(
  target: T, methods: readonly string[], apiMethod = false
): T {
  const names = new Set(methods);
  const wrappers = new Map<PropertyKey, unknown>();
  return new Proxy(target, {
    get(object, key, receiver) {
      const value = Reflect.get(object, key, receiver);
      if (typeof key !== "string" || typeof value !== "function" ||
          (!names.has(key) && !(apiMethod && key === "api"))) return value;
      if (!wrappers.has(key)) wrappers.set(key, (...args: any[]) => {
        const method = String(args[1]?.method || "GET").toUpperCase();
        if (key === "api" && (method === "GET" || method === "HEAD"))
          return Reflect.apply(value, receiver, args);
        return withTodoistWrite(() => Reflect.apply(value, receiver, args));
      });
      return wrappers.get(key);
    }
  });
}
