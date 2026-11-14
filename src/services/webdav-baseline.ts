import { extractSyncPayload, readSyncSettings } from './sync.service';
import { multicaService } from './multica.service';
import type { WebDavConfig } from './webdav.service';
declare const chrome: any;
const BASELINE_KEY = 'webdavAutoBaselineV1';
export const AUTO_ENABLED_KEY = 'webdavAutoEnabledV1';
export const AUTO_SESSION_KEY = 'webdavAutoAttemptedV1';
export interface SyncBaseline { configHash: string; localHash: string; etag: string; fileUrl: string }
function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const obj = value as Record<string, unknown>;
  return `{${Object.keys(obj).sort().filter(key => obj[key] !== undefined).map(key => `${JSON.stringify(key)}:${canonical(obj[key])}`).join(',')}}`;
}
async function digest(value: unknown): Promise<string> {
  const data = new TextEncoder().encode(canonical(value));
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
  return Array.from(bytes, byte => byte.toString(16).padStart(2,'0')).join('');
}
export async function configFingerprint(config: WebDavConfig): Promise<string> { return digest({url:config.url,username:config.username,filename:config.filename || ''}); }
export async function snapshotFingerprint(settings: Record<string, unknown>, credential: unknown): Promise<string> {
  return digest({ settings:extractSyncPayload(settings).sanitized, multicaCredential:credential || null });
}
export async function currentSnapshot(): Promise<{ settings: Record<string, unknown>; credential: Awaited<ReturnType<typeof multicaService.credentialForEncryptedBackup>>; hash: string }> {
  const settings = await readSyncSettings();
  const credential = await multicaService.credentialForEncryptedBackup();
  return { settings, credential, hash:await snapshotFingerprint(settings,credential) };
}
function area() { if (typeof chrome === 'undefined' || !chrome.storage?.local) throw new Error('本地存储不可用'); return chrome.storage.local; }
export async function readBaseline(config: WebDavConfig): Promise<SyncBaseline | null> {
  const value = (await area().get(BASELINE_KEY))[BASELINE_KEY];
  if (!value || typeof value !== 'object' || typeof value.etag !== 'string' || !value.etag || typeof value.fileUrl !== 'string' || !value.fileUrl || !/^[a-f0-9]{64}$/.test(value.localHash || '') || value.configHash !== await configFingerprint(config)) return null;
  return value as SyncBaseline;
}
export async function writeBaseline(config: WebDavConfig, localHash: string, etag: string, fileUrl: string): Promise<void> {
  if (!/^[a-f0-9]{64}$/.test(localHash) || !etag || !fileUrl) throw new Error('同步基准无效');
  await area().set({ [BASELINE_KEY]:{ configHash:await configFingerprint(config), localHash, etag, fileUrl } });
}
export async function autoSyncEnabled(): Promise<boolean> { return (await area().get(AUTO_ENABLED_KEY))[AUTO_ENABLED_KEY] === true; }
export async function setAutoSyncEnabled(enabled: boolean): Promise<void> {
  await area().set({ [AUTO_ENABLED_KEY]:enabled });
  if (typeof chrome !== 'undefined' && chrome.storage?.session) await chrome.storage.session.remove(AUTO_SESSION_KEY);
}
export function connectionConflict(local: Record<string, unknown>, remote: Record<string, unknown>, localCredential: unknown, remoteCredential: unknown): boolean {
  const groups = [['ghUser','ghToken'], ['todoistToken','todoistActiveProjectIdV1'], ['lw_private_chat_v1'], ['googleCalendarSessionTokenV1'], ['lw_webdav_config']];
  for (const keys of groups) {
    if (keys.some(key => local[key] !== undefined && local[key] !== null && local[key] !== '')) {
      if (canonical(keys.map(key => local[key] ?? null)) !== canonical(keys.map(key => remote[key] ?? null))) return true;
    }
  }
  return Boolean(localCredential && canonical(localCredential) !== canonical(remoteCredential || null));
}
/** Conservative: missing/emptied cloud content requires human confirmation. */
export function hasPotentialDataLoss(local: unknown, remote: unknown): boolean {
  if (remote === undefined || remote === null || remote === '') return false;
  if (local === undefined || local === null || local === '') return true;
  if (Array.isArray(remote)) {
    if (!Array.isArray(local)) return true;
    const values = new Set(local.map(canonical));
    return remote.some(item => !values.has(canonical(item)));
  }
  if (typeof remote === 'object') {
    if (!local || typeof local !== 'object' || Array.isArray(local)) return true;
    const l = local as Record<string, unknown>, r = remote as Record<string, unknown>;
    return Object.keys(r).some(key => hasPotentialDataLoss(l[key], r[key]));
  }
  return false;
}
export type AutoDecision = 'unchanged' | 'upload' | 'download' | 'conflict';
export function decideAutoSync(base: SyncBaseline, localHash: string, remoteEtag: string): AutoDecision {
  const localChanged = localHash !== base.localHash, remoteChanged = remoteEtag !== base.etag;
  return localChanged ? remoteChanged ? 'conflict' : 'upload' : remoteChanged ? 'download' : 'unchanged';
}
