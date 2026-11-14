/** Normalize legacy and unknown appearance themes without affecting startup animations. */
export function normalizeSystemTheme(value: unknown): 'light' | 'dark' | 'lonetrail' {
  if (value === 'lonetrail') return 'lonetrail';
  return value === 'dark' || value === 'endfield' ? 'dark' : 'light';
}
