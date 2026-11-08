/** Default only: saved drag order remains authoritative in the Dock store. */
export function defaultDockCards<T extends { id: string }>(cards: readonly T[]): T[] {
  const first = cards.find(card => card.id === "daily-bilibili");
  return first ? [first, ...cards.filter(card => card !== first)] : [...cards];
}
