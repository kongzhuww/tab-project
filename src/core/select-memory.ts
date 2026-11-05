export interface SelectScrollPosition {
  top: number;
  anchor?: string;
  offset?: number;
}

export interface SelectMemory {
  group: string;
  positions: Record<string, SelectScrollPosition>;
}

export function parseSelectMemory(raw: string | null): SelectMemory {
  const result: SelectMemory = { group: "", positions: Object.create(null) };
  try {
    const value = JSON.parse(raw || "null");
    if (!value || typeof value !== "object") return result;
    if (typeof value.group === "string") result.group = value.group;
    for (const [key, entry] of Object.entries(value.positions || {})) {
      const position = entry as SelectScrollPosition;
      if (!position || !Number.isFinite(position.top) || position.top < 0) continue;
      result.positions[key] = {
        top: position.top,
        ...(typeof position.anchor === "string" ? { anchor: position.anchor } : {}),
        ...(Number.isFinite(position.offset) ? { offset: position.offset } : {})
      };
    }
  } catch { /* A damaged preference must not prevent opening the menu. */ }
  return result;
}

export function groupSelectOptions<T extends { group?: string }>(options: T[]) {
  const counts = new Map<string, number>();
  for (const option of options) {
    if (option.group) counts.set(option.group, (counts.get(option.group) || 0) + 1);
  }
  return [...counts].map(([name, count]) => ({ name, count }));
}

export function restoredScrollTop(
  position: SelectScrollPosition,
  anchorTop?: number
): number {
  return Math.max(0, anchorTop !== undefined && position.offset !== undefined
    ? anchorTop - position.offset
    : position.top);
}
