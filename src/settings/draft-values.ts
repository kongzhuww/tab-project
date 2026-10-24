export class SettingsSaveUnconfirmedError extends Error {
  constructor(message = "设置保存结果未确认，请重读核对；未自动重试") {
    super(message);
    this.name = "SettingsSaveUnconfirmedError";
  }
}

// Settings values are JSON-compatible storage data; compare object keys without relying on insertion order.
export function sameSettingValue(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.every((value, index) => sameSettingValue(value, b[index]));
  }
  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  const keys = Object.keys(left);
  return keys.length === Object.keys(right).length && keys.every(key =>
    Object.prototype.hasOwnProperty.call(right, key) && sameSettingValue(left[key], right[key]));
}

export function cloneSettingValue<T>(value: T): T {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}
