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

function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().filter(key => record[key] !== undefined).map(key => `${JSON.stringify(key)}:${canonical(record[key])}`).join(',')}}`;
}
function equal<T>(a?: SyncRecord<T>, b?: SyncRecord<T>): boolean {
  return a === undefined ? b === undefined : b !== undefined && canonical(a) === canonical(b);
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
