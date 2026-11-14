import { loadWebDavSettings, toWebDavConfig } from '../sync/settings';
import { parseSyncBackup } from './sync-payload';
import { SYNC_WHITELIST_KEYS } from './sync.service';
import { webDavService } from './webdav.service';
import { webdavVault } from './webdav-vault';
import { AUTO_SESSION_KEY, autoSyncEnabled, configFingerprint, connectionConflict, currentSnapshot, decideAutoSync, hasPotentialDataLoss, readBaseline, snapshotFingerprint, writeBaseline } from './webdav-baseline';
declare const chrome: any;
export interface AutoSyncResult { status: 'disabled' | 'noop' | 'conflict' | 'error' | 'uploaded' | 'downloaded'; message?: string }
/** One guarded attempt per browser session. No automatic write without a verified baseline. */
export async function runWebDavAutoSync(): Promise<AutoSyncResult> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) return {status:'disabled'};
  if (!chrome.storage?.session || typeof navigator === 'undefined' || !navigator.locks) {
    try { return await autoSyncEnabled() ? {status:'error', message:'浏览器不支持安全的自动同步锁，请手动同步。'} : {status:'disabled'}; }
    catch { return {status:'disabled'}; }
  }
  const result = await navigator.locks.request('tab-project:webdav-auto-sync', { ifAvailable:true }, async lock => {
    if (!lock) return {status:'disabled'} as AutoSyncResult;
    try {
      if (!await autoSyncEnabled()) return {status:'disabled'} as AutoSyncResult;
      if ((await chrome.storage.session.get(AUTO_SESSION_KEY))[AUTO_SESSION_KEY]) return {status:'noop'} as AutoSyncResult;
      await chrome.storage.session.set({ [AUTO_SESSION_KEY]:true });
      const settings = await loadWebDavSettings(), config = toWebDavConfig(settings);
      if (!config.url || !config.username || !config.password) return {status:'error',message:'请先完成 WebDAV 连接设置。'} as AutoSyncResult;
      const passphrase = await webdavVault.get();
      if (!passphrase) return {status:'error',message:'请在同步设置中输入备份口令。'} as AutoSyncResult;
      const configHash = await configFingerprint(config);
      const beforeAutoWrite = async () => {
        const currentConfig = toWebDavConfig(await loadWebDavSettings());
        if (!await autoSyncEnabled() || await configFingerprint(currentConfig) !== configHash || currentConfig.password !== config.password || await webdavVault.get() !== passphrase) throw new Error('同步设置或口令已变化，自动操作已取消');
      };
      const baseline = await readBaseline(config);
      const remote = await webDavService.download(config, { passphrase });
      if (!remote.ok) return {status:'error',message:remote.notFound ? '云端尚无备份，请先手动上传一次。' : (remote.error || '无法读取云端备份。')} as AutoSyncResult;
      if (!remote.encrypted) return {status:'error',message:'云端是旧版明文备份，请到同步设置中确认迁移。'} as AutoSyncResult;
      if (!remote.etag || !remote.fileUrl) return {status:'error',message:'服务器未提供 ETag，无法安全检测冲突。'} as AutoSyncResult;
      if (baseline && remote.fileUrl !== baseline.fileUrl) return {status:'conflict',message:'云端备份位置发生变化，未自动修改数据。'} as AutoSyncResult;
      const parsed = parseSyncBackup(remote.data, SYNC_WHITELIST_KEYS, { allowCredentials:true });
      const local = await currentSnapshot();
      const cloudHash = await snapshotFingerprint(parsed.sanitized, remote.data.multicaCredential);
      if (cloudHash === local.hash) {
        await beforeAutoWrite();
        if ((await currentSnapshot()).hash !== local.hash) return {status:'conflict',message:'本地配置已变化，请在同步设置中确认。'} as AutoSyncResult;
        await writeBaseline(config, local.hash, remote.etag, remote.fileUrl);
        return {status:'noop'} as AutoSyncResult;
      }
      if (!baseline) {
        return {status:'conflict',message:'本机尚无同步基准，请先手动比较并选择上传或恢复。'} as AutoSyncResult;
      }
      const decision = decideAutoSync(baseline, local.hash, remote.etag);
      if (decision === 'unchanged') return {status:'noop'} as AutoSyncResult;
      if (decision === 'conflict' || connectionConflict(local.settings, parsed.sanitized, local.credential, remote.data.multicaCredential)) return {status:'conflict',message:'本机和云端均有变化，或账号连接不同；未自动覆盖，请到同步设置确认。'} as AutoSyncResult;
      if (decision === 'upload' && hasPotentialDataLoss(local.settings, parsed.sanitized)) return {status:'conflict',message:'本机缺少部分云端内容，可能是删除或尚未加载；未自动覆盖，请到同步设置确认。'} as AutoSyncResult;
      const result = decision === 'upload'
        ? await webDavService.pushCurrentConfig(config, { expectedRemoteEtag:baseline.etag, expectedRemoteUrl:baseline.fileUrl, expectedLocalHash:local.hash, beforeAutoWrite })
        : await webDavService.pullCurrentConfig(config, { expectedRemoteEtag:remote.etag, expectedRemoteUrl:remote.fileUrl, expectedLocalHash:local.hash, beforeAutoWrite });
      if (!result.ok) return {status:'error',message:result.error || '同步未确认，请检查云端和本机状态。'} as AutoSyncResult;
      if (!result.baselineRecorded) return {status:'conflict',message:'操作已完成，但两端数据尚未完全一致；后续自动同步已暂停，请在设置中核对。'} as AutoSyncResult;
      return {status:decision === 'upload' ? 'uploaded' : 'downloaded'} as AutoSyncResult;
    } catch { return {status:'error',message:'同步状态读取失败；未自动重试，请在设置中检查。'} as AutoSyncResult; }
  });
  return result;
}
