export interface UiBuildInfo { id: string; builtAt: string }
// Replaced in Vite's renderChunk, so watch rebuilds receive a fresh stamp too.
const EMBEDDED_ID = '__TAB_UI_BUILD_ID__';
const EMBEDDED_TIME = '__TAB_UI_BUILD_TIME__';

export function parseBuildInfo(value: unknown): UiBuildInfo | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(candidate.id) ||
      typeof candidate.builtAt !== 'string' || !Number.isFinite(Date.parse(candidate.builtAt))) return null;
  return { id:candidate.id, builtAt:candidate.builtAt };
}

export function embeddedBuildInfo(): UiBuildInfo | null {
  return parseBuildInfo({ id:EMBEDDED_ID, builtAt:EMBEDDED_TIME });
}

/** Unknown metadata never proves that the browser and disk are different. */
export function buildRequiresReload(running: UiBuildInfo | null, disk: UiBuildInfo | null): boolean {
  return Boolean(running && disk && running.id !== disk.id);
}
