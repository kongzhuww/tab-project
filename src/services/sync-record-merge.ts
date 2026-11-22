import { canonicalJson } from './sync-schema';

/**
 * Three-way merge for individually identified sync records.
 * Missing records are not deletion evidence: only an explicit tombstone is.
 * The common ancestor must be a confirmed, identical snapshot from both sides.
 */
export interface SyncRecord<T> {
  id: string;
  modifiedAt: number;
  deviceId: string;
  deletedAt?: number;
  value?: T;
}
export interface RecordConflict<T> {
  id: string;
  reason: 'concurrent-change' | 'missing-record' | 'duplicate-id' | 'invalid-record';
  local?: SyncRecord<T>;
  remote?: SyncRecord<T>;
}
export interface RecordMergeResult<T> {
  records: SyncRecord<T>[];
  conflicts: RecordConflict<T>[];
}

function equal<T>(a?: SyncRecord<T>, b?: SyncRecord<T>): boolean {
  return a === undefined ? b === undefined : b !== undefined && canonicalJson(a) === canonicalJson(b);
}
function valid<T>(record: SyncRecord<T>): boolean {
  return !!record && typeof record.id === 'string' && record.id.length > 0 && record.id.length <= 512
    && typeof record.deviceId === 'string' && record.deviceId.length > 0 && record.deviceId.length <= 512
    && Number.isSafeInteger(record.modifiedAt) && record.modifiedAt > 0
    && (record.deletedAt === undefined
      ? record.value !== undefined
      : Number.isSafeInteger(record.deletedAt) && record.deletedAt > 0 && record.value === undefined);
}

/**
 * Never choose a winner for concurrent edits, even if wall clocks differ:
 * clocks may be wrong and delete-vs-edit must be confirmed. The caller must
 * not apply or upload the partial result while conflicts is non-empty.
 */
export function mergeSyncRecords<T>(
  base: readonly SyncRecord<T>[], local: readonly SyncRecord<T>[], remote: readonly SyncRecord<T>[]
): RecordMergeResult<T> {
  const conflicts: RecordConflict<T>[] = [];
  const maps = [base, local, remote].map(records => {
    const map = new Map<string, SyncRecord<T>>();
    for (const record of records) {
      if (!valid(record)) { conflicts.push({id:typeof record?.id === 'string' ? record.id : '', reason:'invalid-record'}); continue; }
      if (map.has(record.id)) { conflicts.push({id:record.id, reason:'duplicate-id'}); continue; }
      map.set(record.id, record);
    }
    return map;
  });
  if (conflicts.length) return {records:[], conflicts};
  const [ancestor, left, right] = maps;
  const ids = new Set([...ancestor.keys(), ...left.keys(), ...right.keys()]);
  const records: SyncRecord<T>[] = [];
  for (const id of ids) {
    const a = ancestor.get(id), l = left.get(id), r = right.get(id);
    if (equal(l, r)) { if (l) records.push(l); continue; }
    // A previously known record must never disappear without a tombstone.
    if (a && (!l || !r)) { conflicts.push({id, reason:'missing-record', local:l, remote:r}); continue; }
    if (equal(a, l)) { if (r) records.push(r); continue; }
    if (equal(a, r)) { if (l) records.push(l); continue; }
    conflicts.push({id, reason:'concurrent-change', local:l, remote:r});
  }
  return {records:conflicts.length ? [] : records, conflicts};
}

export interface IdentifiableRecord {
  id: string;
  updatedAt?: number;
  deletedAt?: number;
  deviceId?: string;
  [key: string]: unknown;
}

export interface TombstoneMergeResult<T extends IdentifiableRecord> {
  ok: boolean;
  items: T[];
  tombstones: SyncRecord<T>[];
  conflicts: RecordConflict<T>[];
}

export function toSyncRecordsWithTombstones<T extends IdentifiableRecord>(
  items: readonly T[] | undefined,
  deletedItems?: readonly { id: string; deletedAt: number; updatedAt?: number; deviceId?: string }[]
): SyncRecord<T>[] {
  const byId = new Map<string, SyncRecord<T>>();
  for (const item of items || []) {
    if (!item || typeof item.id !== "string" || !item.id) continue;
    const isDeleted = typeof item.deletedAt === "number" && Number.isFinite(item.deletedAt);
    byId.set(item.id, {
      id: item.id,
      modifiedAt: typeof item.updatedAt === "number" ? item.updatedAt : (isDeleted ? item.deletedAt! : 0),
      deviceId: typeof item.deviceId === "string" && item.deviceId ? item.deviceId : "local",
      deletedAt: isDeleted ? item.deletedAt : undefined,
      value: isDeleted ? undefined : ({ ...item } as T),
    });
  }
  for (const tomb of deletedItems || []) {
    if (!tomb || typeof tomb.id !== "string" || !tomb.id) continue;
    if (byId.has(tomb.id)) continue;
    byId.set(tomb.id, {
      id: tomb.id,
      modifiedAt: tomb.updatedAt ?? tomb.deletedAt,
      deviceId: typeof tomb.deviceId === "string" && tomb.deviceId ? tomb.deviceId : "local",
      deletedAt: tomb.deletedAt,
    });
  }
  return Array.from(byId.values());
}

/**
 * 基于 `mergeSyncRecords` 的带墓碑记录三向合并适配器：
 * - 已删除条目转为 `deletedAt` 墓碑，避免触发 `missing-record` 误报冲突。
 * - 支持按 `purgeDeletedBefore` 过期清理已同步的旧墓碑。
 */
export function mergeIdentifiableWithTombstones<T extends IdentifiableRecord>(
  base: readonly SyncRecord<T>[],
  local: readonly SyncRecord<T>[],
  remote: readonly SyncRecord<T>[],
  options?: { purgeDeletedBefore?: number }
): TombstoneMergeResult<T> {
  const merged = mergeSyncRecords(base, local, remote);
  if (merged.conflicts.length > 0) {
    return { ok: false, items: [], tombstones: [], conflicts: merged.conflicts };
  }
  const items: T[] = [];
  const tombstones: SyncRecord<T>[] = [];
  const cutoff = options?.purgeDeletedBefore;
  for (const record of merged.records) {
    if (typeof record.deletedAt === "number") {
      if (typeof cutoff !== "number" || record.deletedAt >= cutoff) {
        tombstones.push(record);
      }
      continue;
    }
    if (record.value !== undefined) {
      items.push(record.value);
    }
  }
  return { ok: true, items, tombstones, conflicts: [] };
}
