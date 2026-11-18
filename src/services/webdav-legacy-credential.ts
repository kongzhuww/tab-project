/**
 * Minimal local-storage credential compatibility for encrypted WebDAV backups.
 * Preserves legacy `multicaCredentialV1` backup fields cleanly without network calls.
 */
declare const chrome: any;

const KEY = 'multicaSessionV1';
const PERSISTENT_KEY = 'multicaCredentialV1';

export interface LegacyCredential {
  token: string;
  workspaceId: string;
}

function localStorageArea(): any {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) {
    throw new Error('需要在扩展中访问本机凭据存储');
  }
  return chrome.storage.local;
}

export function validMulticaCredential(value: unknown): value is LegacyCredential {
  const item = value as Partial<LegacyCredential> | null;
  return Boolean(
    item &&
      typeof item.token === 'string' &&
      item.token.trim() &&
      typeof item.workspaceId === 'string' &&
      item.workspaceId.trim()
  );
}

async function withCredentialLock<T>(action: () => Promise<T>): Promise<T> {
  const locks = typeof navigator !== 'undefined' ? navigator.locks : undefined;
  return locks ? await locks.request('tab-project:multica-credentials', action) : await action();
}

export async function credentialForEncryptedBackup(): Promise<LegacyCredential | null> {
  const local = localStorageArea();
  const value = (await local.get(PERSISTENT_KEY))[PERSISTENT_KEY];
  if (value !== undefined) return validMulticaCredential(value) ? value : null;
  const legacy = chrome.storage?.session;
  if (!legacy) return null;
  const previous = (await legacy.get(KEY))[KEY];
  return validMulticaCredential(previous) ? previous : null;
}

export async function restoreEncryptedCredential(value: unknown): Promise<'restored' | 'kept'> {
  if (!validMulticaCredential(value)) throw new Error('加密备份中的历史连接格式无效');
  return withCredentialLock(async () => {
    const local = localStorageArea();
    const current = (await local.get(PERSISTENT_KEY))[PERSISTENT_KEY];
    const legacy = chrome.storage?.session ? (await chrome.storage.session.get(KEY))[KEY] : undefined;
    if (current !== undefined || legacy !== undefined) return 'kept';
    await local.set({ [PERSISTENT_KEY]: { token: value.token, workspaceId: value.workspaceId } });
    return 'restored';
  });
}
