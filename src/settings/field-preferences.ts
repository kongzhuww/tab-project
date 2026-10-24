import { sameSettingValue } from "./draft-values";

const owns = (value: object, key: string): boolean => Object.prototype.hasOwnProperty.call(value, key);
function record(value: unknown): Record<string, unknown> {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("歌词配置格式异常，未覆盖已有数据");
  }
  return value as Record<string, unknown>;
}

// UI defaults establish edit intent; raw defaults establish semantic conflict comparison.
// Do not materialize every missing default or overwrite untouched / unknown stored fields.
export function mergePreferenceFields(storedBaseline: unknown, draftBaseline: unknown,
  submitted: unknown, latest: unknown, defaults: Record<string, unknown>,
  explicitFields: readonly string[] = []): Record<string, unknown> {
  const original = record(storedBaseline), before = record(draftBaseline);
  const desired = record(submitted), current = record(latest);
  const merged: Record<string, unknown> = Object.assign(Object.create(null), current);
  const explicit = new Set(explicitFields);
  if ([...explicit].some(field => !owns(defaults, field))) {
    throw new Error("歌词字段修改范围无效，未提交修改");
  }
  for (const field of new Set([...Object.keys(before), ...Object.keys(desired)])) {
    if (!owns(defaults, field) &&
        (owns(before, field) !== owns(desired, field) || !sameSettingValue(before[field], desired[field]))) {
      throw new Error("未知歌词字段不由本面板编辑，未提交修改");
    }
  }
  for (const field of Object.keys(defaults)) {
    if (!owns(before, field) || !owns(desired, field)) {
      throw new Error("歌词草稿基线不完整，未提交修改");
    }
    if (sameSettingValue(before[field], desired[field]) && !explicit.has(field)) continue;
    if (typeof desired[field] !== typeof defaults[field]) {
      throw new Error("待保存的歌词字段格式异常，草稿保留");
    }
    const expected = owns(original, field) ? original[field] : defaults[field];
    const observed = owns(current, field) ? current[field] : defaults[field];
    if (!sameSettingValue(observed, expected) && !sameSettingValue(observed, desired[field])) {
      throw new Error("其他页面已修改同一歌词字段，未覆盖；本页草稿保留。可重读设置后重新编辑。");
    }
    if (!sameSettingValue(observed, desired[field])) merged[field] = desired[field];
  }
  return merged;
}
