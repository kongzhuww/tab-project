export type CommandConcurrency = "parallel" | "replace" | "drop";

export interface CommandContext {
  signal: AbortSignal;
  source: string;
}

export interface CommandDefinition<TPayload = unknown, TResult = unknown> {
  id: string;
  title: string;
  category: string;
  description?: string;
  keywords?: readonly string[];
  concurrency?: CommandConcurrency;
  enabled?: () => boolean;
  run(payload: TPayload, context: CommandContext): TResult | Promise<TResult>;
}

export interface CommandMetadata {
  id: string;
  title: string;
  category: string;
  description: string;
  keywords: readonly string[];
  concurrency: CommandConcurrency;
  enabled: boolean;
  running: boolean;
}

export interface CommandRegistry {
  register<TPayload = unknown, TResult = unknown>(definition: CommandDefinition<TPayload, TResult>): () => void;
  execute<TResult = unknown>(id: string, payload?: unknown, source?: string): Promise<TResult | undefined>;
  cancel(id: string): boolean;
  has(id: string): boolean;
  list(): readonly CommandMetadata[];
  search(query: string, limit?: number): readonly CommandMetadata[];
}

const commandIdPattern = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;

export function createCommandRegistry(): CommandRegistry {
  const definitions = new Map<string, CommandDefinition<any, any>>();
  const running = new Map<string, AbortController>();

  function register<TPayload = unknown, TResult = unknown>(definition: CommandDefinition<TPayload, TResult>): () => void {
    if (!definition || !commandIdPattern.test(definition.id)) throw new TypeError(`Invalid command id: ${definition?.id || ""}`);
    if (!definition.title?.trim() || !definition.category?.trim() || typeof definition.run !== "function") {
      throw new TypeError(`Command ${definition.id} requires title, category and run()`);
    }
    if (definitions.has(definition.id)) throw new Error(`Command already registered: ${definition.id}`);
    definitions.set(definition.id, Object.freeze({
      ...definition,
      description: definition.description || "",
      keywords: Object.freeze([...(definition.keywords || [])]),
      concurrency: definition.concurrency || "replace"
    }));
    return () => {
      cancel(definition.id);
      definitions.delete(definition.id);
    };
  }

  function cancel(id: string): boolean {
    const controller = running.get(id);
    if (!controller) return false;
    controller.abort();
    running.delete(id);
    return true;
  }

  async function execute<TResult = unknown>(id: string, payload?: unknown, source = "api"): Promise<TResult | undefined> {
    const definition = definitions.get(id);
    if (!definition) throw new Error(`Unknown command: ${id}`);
    if (definition.enabled && !definition.enabled()) return undefined;

    const concurrency = definition.concurrency || "replace";
    if (running.has(id)) {
      if (concurrency === "drop") return undefined;
      if (concurrency === "replace") cancel(id);
    }

    const controller = new AbortController();
    if (concurrency !== "parallel") running.set(id, controller);
    try {
      return await definition.run(payload, { signal: controller.signal, source }) as TResult;
    } finally {
      if (running.get(id) === controller) running.delete(id);
    }
  }

  function metadata(definition: CommandDefinition): CommandMetadata {
    return Object.freeze({
      id: definition.id,
      title: definition.title,
      category: definition.category,
      description: definition.description || "",
      keywords: Object.freeze([...(definition.keywords || [])]),
      concurrency: definition.concurrency || "replace",
      enabled: definition.enabled ? Boolean(definition.enabled()) : true,
      running: running.has(definition.id)
    });
  }

  function list(): readonly CommandMetadata[] {
    return Object.freeze([...definitions.values()].map(metadata).sort((a, b) => a.category.localeCompare(b.category, "zh") || a.title.localeCompare(b.title, "zh")));
  }

  function search(query: string, limit = 20): readonly CommandMetadata[] {
    const terms = String(query || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return list().slice(0, limit);
    const scored = [...definitions.values()].map((definition) => {
      const item = metadata(definition);
      const title = item.title.toLocaleLowerCase();
      const haystack = `${item.id} ${title} ${item.category} ${item.description} ${item.keywords.join(" ")}`.toLocaleLowerCase();
      if (!terms.every((term) => haystack.includes(term))) return null;
      let score = 0;
      for (const term of terms) {
        if (item.id === term) score += 200;
        else if (item.id.startsWith(term)) score += 120;
        if (title === term) score += 160;
        else if (title.startsWith(term)) score += 100;
        else if (title.includes(term)) score += 60;
        if (item.keywords.some((keyword) => keyword.toLocaleLowerCase().startsWith(term))) score += 40;
      }
      return { item, score };
    }).filter((entry): entry is { item: CommandMetadata; score: number } => Boolean(entry));
    scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "zh"));
    return Object.freeze(scored.slice(0, Math.max(1, limit)).map((entry) => entry.item));
  }

  return Object.freeze({ register, execute, cancel, has: (id: string) => definitions.has(id), list, search });
}

export const commandRegistry = createCommandRegistry();
