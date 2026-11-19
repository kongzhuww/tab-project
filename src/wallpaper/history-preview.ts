export function selectHistoryPreview(
  workshop: { previewUrl?: string; previewBase64?: string } | undefined,
  saved: unknown[],
  libraryUrl: string | undefined,
  failed: readonly string[] = []
): string {
  const durable = saved.filter((url): url is string => typeof url === 'string' && !!url && !url.startsWith('blob:'));
  return [workshop?.previewUrl, workshop?.previewBase64, ...durable, libraryUrl]
    .find((url): url is string => !!url && !failed.includes(url)) || '';
}
