/** Optimistic concurrency for backpack writes. All participating writers must
 * use the same lock and update the revision in the same storage transaction. */
export const PROMPT_REVISION_KEY = 'logicweaver_prompt_backpack_revision_v1';
export const ARTICLE_REVISION_KEY = 'logicweaver_saved_articles_revision_v1';
export interface RevisionStorage {
  get(keys: string | string[]): Promise<Record<string, unknown>>;
  set(values: Record<string, unknown>): Promise<void>;
}
export interface RevisionLocks {
  request<T>(name: string, callback: () => Promise<T>): Promise<T>;
}
export class StaleBackpackError extends Error {
  constructor() { super('背包已在其他页面更新；未覆盖，请先刷新并核对数据。'); }
}
export function parseBackpackRevision(value: unknown): number {
  if (value === undefined) return 0;
  if (!Number.isSafeInteger(value) || (value as number) < 0) throw new Error('背包版本记录无效，未写入数据');
  return value as number;
}
export async function readBackpackRevision(storage: RevisionStorage, revisionKey: string): Promise<number> {
  return parseBackpackRevision((await storage.get(revisionKey))[revisionKey]);
}
export async function writeBackpackIfCurrent(
  storage: RevisionStorage, locks: RevisionLocks, revisionKey: string, expectedRevision: number,
  values: Record<string, unknown>
): Promise<number> {
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0 || Object.hasOwn(values, revisionKey)) throw new Error('背包写入参数无效');
  return locks.request(`tab-project:backpack:${revisionKey}`, async () => {
    const current = await readBackpackRevision(storage, revisionKey);
    if (current !== expectedRevision) throw new StaleBackpackError();
    if (current >= Number.MAX_SAFE_INTEGER) throw new Error('背包版本号已耗尽，未写入数据');
    const next = current + 1;
    await storage.set({ ...values, [revisionKey]:next });
    return next;
  });
}
