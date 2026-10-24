// Module scope, rather than <script setup> instance scope: share successful
// image sources across all tiles, folder previews and drag ghosts in this tab.
export const memoryResolvedSources = new Map<string, string>();
export const memoryLoadedSources = new Set<string>();

export function rememberIconSource(url: string, source: string): void {
  memoryResolvedSources.delete(url);
  memoryResolvedSources.set(url, source);
  memoryLoadedSources.delete(source);
  memoryLoadedSources.add(source);
  while (memoryResolvedSources.size > 512) {
    memoryResolvedSources.delete(memoryResolvedSources.keys().next().value!);
  }
  while (memoryLoadedSources.size > 512) {
    memoryLoadedSources.delete(memoryLoadedSources.values().next().value!);
  }
}
