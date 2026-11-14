import { BACKPACK_SYNC_KEYS, createSyncBackup, extractSyncPayload, readSyncSettings, restoreSyncBackup, SYNC_WHITELIST_KEYS } from "./sync.service";
import { parseSyncBackup, SyncBackupError, isRecord } from "./sync-payload";
import { webDavFetch } from "./webdav-request";
import { mergeSyncSettings } from "./sync-merger";
import { encryptBackup, decryptBackup, isEncryptedBackup } from './webdav-crypto';
import { webdavVault } from './webdav-vault';
import { multicaService, validMulticaCredential } from './multica.service';
import { currentSnapshot, hasPotentialDataLoss, snapshotFingerprint, writeBaseline } from './webdav-baseline';

export interface WebDavConfig {
  url: string;
  username: string;
  password: string;
  filename?: string;
}

export interface WebDavOperationResult {
  ok: boolean;
  count?: number;
  byteLength?: number;
  restoredCount?: number;
  clientDevice?: string;
  error?: string;
  errorKind?: "policy" | "operation";
  credentialResult?: 'restored' | 'kept';
  etag?: string;
  fileUrl?: string;
  baselineRecorded?: boolean;
}

interface WebDavDownloadResult { ok: boolean; data?: any; error?: string; notFound?: boolean; encrypted?: boolean; fileUrl?: string; etag?: string | null }
const CONNECTION_GROUPS = [['ghUser','ghToken'], ['todoistToken','todoistActiveProjectIdV1'], ['lw_private_chat_v1'], ['googleCalendarSessionTokenV1'], ['lw_webdav_config']];
function preserveLocalConnections(local: Record<string, any>, merged: Record<string, any>): Record<string, any> {
  for (const keys of CONNECTION_GROUPS) {
    if (!keys.some(key => local[key] !== undefined && local[key] !== null && local[key] !== '')) continue;
    for (const key of keys) { if (local[key] !== undefined) merged[key] = local[key]; else delete merged[key]; }
  }
  return merged;
}
function mergeProtectingConnections(local: Record<string, any>, remote: Record<string, any>): Record<string, any> {
  return preserveLocalConnections(local, mergeSyncSettings(local, remote));
}
async function recordAlignedBaseline(config: WebDavConfig, backup: Record<string, any>, etag?: string | null, fileUrl?: string): Promise<boolean> {
  if (!etag || !fileUrl) return false;
  try {
    const current = await currentSnapshot();
    const cloudHash = await snapshotFingerprint(backup.settings || {}, backup.multicaCredential);
    if (current.hash !== cloudHash) return false;
    await writeBaseline(config, current.hash, etag, fileUrl);
    return true;
  } catch { return false; /* Without a baseline, automatic sync asks for confirmation. */ }
}

export class WebDavService {
  private static instance: WebDavService;

  private constructor() {}

  public static getInstance(): WebDavService {
    if (!WebDavService.instance) {
      WebDavService.instance = new WebDavService();
    }
    return WebDavService.instance;
  }

  /**
   * 生成 Base64 Basic Auth 凭据
   */
  private getAuthHeader(config: WebDavConfig): string {
    const raw = `${config.username}:${config.password}`;
    try {
      // 兼容 Unicode 字符的安全 base64 编码
      const b64 = btoa(unescape(encodeURIComponent(raw)));
      return `Basic ${b64}`;
    } catch {
      return `Basic ${btoa(raw)}`;
    }
  }

  /**
   * 规范化与提取坚果云可用的目录候选列表
   * 核心原因：坚果云 WebDAV 严禁在根目录 /dav/ 直接创建文件，否则服务器必然返回 HTTP 403 Forbidden！
   */
  public getCandidateUrls(config: WebDavConfig): { dirUrl: string; fileUrl: string }[] {
    let base = (config.url || "https://dav.jianguoyun.com/dav/").trim();
    if (!base.endsWith("/")) base += "/";
    const filename = (config.filename || "logicweaver-settings.json").trim().replace(/^\//, "");

    const isJianguo = base.includes("dav.jianguoyun.com");
    if (isJianguo) {
      try {
        const u = new URL(base);
        const path = decodeURIComponent(u.pathname.replace(/\/+$/, ""));
        // 如果用户只填写了 https://dav.jianguoyun.com/dav/ 或根目录，自动生成子目录候选
        if (path === "/dav" || path === "") {
          const origin = u.origin;
          return [
            {
              dirUrl: `${origin}/dav/%E6%88%91%E7%9A%84%E5%9D%9A%E6%9E%9C%E4%BA%91/`,
              fileUrl: `${origin}/dav/%E6%88%91%E7%9A%84%E5%9D%9A%E6%9E%9C%E4%BA%91/${filename}`
            },
            {
              dirUrl: `${origin}/dav/LogicWeaver/`,
              fileUrl: `${origin}/dav/LogicWeaver/${filename}`
            }
          ];
        }
      } catch (_) {}
    }

    return [
      {
        dirUrl: base,
        fileUrl: base + filename
      }
    ];
  }

  /**
   * 拼接最终完整的文件远程 URL（取首选候选）
   */
  public getFullFileUrl(config: WebDavConfig): string {
    const candidates = this.getCandidateUrls(config);
    return candidates[0].fileUrl;
  }

  /**
   * 确保 WebDAV 目录存在（使用 MKCOL 创建集合目录）
   */
  public async ensureDirectory(dirUrl: string, auth: string): Promise<boolean> {
    try {
      const resp = await webDavFetch(dirUrl, {
        method: "MKCOL",
        headers: { Authorization: auth },
        signal: AbortSignal.timeout(6000)
      });
      // 201 Created 创建成功；405 Method Not Allowed 表明目录已存在；均代表可用
      return resp.status === 201 || resp.status === 405 || resp.ok;
    } catch {
      return false;
    }
  }

  /**
   * 测试 WebDAV 连通性
   */
  public async testConnection(config: WebDavConfig): Promise<{ ok: boolean; message: string }> {
    if (!config.url || !config.username || !config.password) {
      return { ok: false, message: "请完整填写 WebDAV 服务器地址、账号和应用密码" };
    }

    const auth = this.getAuthHeader(config);
    const candidates = this.getCandidateUrls(config);
    const targetUrl = candidates[0].dirUrl;

    try {
      // 优先尝试探测目录或建目录
      await this.ensureDirectory(targetUrl, auth);

      const resp = await webDavFetch(targetUrl, {
        method: "PROPFIND",
        headers: {
          Authorization: auth,
          Depth: "0"
        },
        signal: AbortSignal.timeout(10000)
      });

      if (resp.status === 207 || resp.status === 200) {
        return { ok: true, message: `✓ 坚果云认证成功！同步目标目录: ${new URL(targetUrl).pathname}` };
      }

      if (resp.status === 401) {
        return { ok: false, message: "认证失败 (401): 必须在坚果云网页版【安全选项】中生成“应用专用密码”，不能用登录密码！" };
      }

      if (resp.status === 403) {
        return {
          ok: false,
          message: "坚果云返回 403: 坚果云根目录不可直接访问或本月免费流量已耗尽。请在地址后追加同步文件夹，如 /dav/我的坚果云/"
        };
      }

      if (resp.status === 404) {
        return { ok: false, message: `目录不存在 (404)，请在坚果云网页版创建对应文件夹` };
      }

      const optResp = await webDavFetch(targetUrl, {
        method: "OPTIONS",
        headers: { Authorization: auth },
        signal: AbortSignal.timeout(6000)
      });
      if (optResp.ok) {
        return { ok: true, message: "✓ WebDAV 服务握手成功！" };
      }

      return { ok: false, message: `服务器返回状态 HTTP ${resp.status}` };
    } catch (err: any) {
      return { ok: false, message: `网络连接异常: ${err?.message || "请求超时或受阻"}` };
    }
  }

  /**
   * 上传配置到 WebDAV (PUT)
   * 包含自动 MKCOL 目录创建与坚果云 403 智能回退
   */
  private async upload(config: WebDavConfig, payload: Record<string, any>, options: { preflight?: WebDavDownloadResult; migrateLegacy?: boolean; passphrase?: string; beforePut?: () => Promise<void> } = {}): Promise<WebDavOperationResult> {
    if (!config.url || !config.username || !config.password) return { ok:false, error:'请先填写 WebDAV 连接设置' };
    let submitted = false;
    try {
      const passphrase = options.passphrase || await webdavVault.get();
      if (!passphrase) return { ok:false, errorKind:'policy', error:'请先在设置 → 同步中设置备份加密口令' };
      const remote = options.preflight || await this.download(config, { passphrase });
      if (!remote.ok && !remote.notFound) return { ok:false, error:remote.error || '无法确认云端备份，未上传' };
      if (remote.ok && !remote.encrypted && !options.migrateLegacy) return { ok:false, errorKind:'policy', error:'云端是旧版明文备份；请先使用「迁移旧备份并加密」，未覆盖原文件' };
      if (remote.ok) parseSyncBackup(remote.data, SYNC_WHITELIST_KEYS, { allowCredentials:remote.encrypted === true });
      if (remote.ok && !remote.etag) return { ok:false, errorKind:'policy', error:'服务器未提供 ETag，无法安全防止并发覆盖；未上传' };
      let backup: Record<string, any>;
      if (payload && typeof payload === 'object' && payload.settings && typeof payload.settings === 'object') {
        const { sanitized } = extractSyncPayload(payload.settings);
        backup = { ...payload, settings:sanitized };
      } else backup = await createSyncBackup(extractSyncPayload(payload).sanitized);
      const encrypted = await encryptBackup(backup, passphrase);
      const json = JSON.stringify(encrypted);
      const candidate = remote.fileUrl ? this.getCandidateUrls(config).find(item => item.fileUrl === remote.fileUrl) : this.getCandidateUrls(config)[0];
      if (!candidate) return { ok:false, error:'无法确定云端备份位置，未上传' };
      const auth = this.getAuthHeader(config);
      await this.ensureDirectory(candidate.dirUrl, auth);
      if (await webdavVault.get() !== passphrase) return { ok:false, error:'备份口令已在其他页面变更；未上传，请重新操作' };
      if (options.beforePut) await options.beforePut();
      submitted = true;
      const response = await webDavFetch(candidate.fileUrl, { method:'PUT', headers:{ Authorization:auth, 'Content-Type':'application/json; charset=utf-8', ...(remote.ok ? { 'If-Match':remote.etag! } : { 'If-None-Match':'*' }) }, body:json, signal:AbortSignal.timeout(20000) });
      if ([200,201,204].includes(response.status)) return { ok:true, byteLength:new TextEncoder().encode(json).length, etag:response.headers.get('etag') || undefined, fileUrl:candidate.fileUrl };
      if (response.status === 412 || response.status === 409) return { ok:false, error:'云端备份已变化，请重新读取后再试；未覆盖' };
      return { ok:false, error:`WebDAV 上传失败（HTTP ${response.status}），请检查权限和目录` };
    } catch (error) { return { ok:false, error:submitted ? '上传结果未确认；可能已生效，请先刷新云端核对，勿重复上传' : error instanceof Error ? error.message : '加密上传失败；未提交云端' }; }
  }

  /**
   * 从 WebDAV 下载配置 (GET)
   * 支持多候选目录智能查找
   */
  public async download(config: WebDavConfig, options: { passphrase?: string } = {}): Promise<WebDavDownloadResult> {
    if (!config.url || !config.username || !config.password) {
      return { ok: false, error: "请先在设置中填写坚果云 WebDAV 账号与应用密码" };
    }

    const auth = this.getAuthHeader(config);
    const candidates = this.getCandidateUrls(config);

    let lastError = "";

    for (const candidate of candidates) {
      try {
        const resp = await webDavFetch(candidate.fileUrl, {
          method: "GET",
          headers: {
            Authorization: auth,
            Accept: "application/json, text/plain, */*"
          },
          signal: AbortSignal.timeout(15000)
        });

        if (resp.status === 200) {
          const textData = await resp.text();
          if (textData.length > 30 * 1024 * 1024) return { ok:false, error:'云端备份过大，未读取或修改本地数据' };
          let parsed: unknown;
          try { parsed = JSON.parse(textData); if (typeof parsed === 'string') parsed = JSON.parse(parsed); }
          catch { return { ok:false, error:'云端备份格式无效，未修改本地数据' }; }
          const encrypted = isEncryptedBackup(parsed);
          if (encrypted) {
            try {
              const passphrase = options.passphrase || await webdavVault.get();
              if (!passphrase) return { ok:false, error:'云端备份已加密；请先在设置 → 同步中输入备份口令' };
              parsed = await decryptBackup(parsed, passphrase);
            } catch (e) { return { ok:false, error:e instanceof Error ? e.message : '无法解密云端备份，未修改数据' }; }
          }
          if (!isRecord(parsed)) return { ok:false, error:'云端备份格式无效，未修改本地数据' };
          return { ok:true, data:parsed, encrypted, fileUrl:candidate.fileUrl, etag:resp.headers.get('etag') };
        }

        if (resp.status === 401) {
          return { ok: false, error: "坚果云 WebDAV 鉴权失败，请核对账号与应用密码" };
        }

        if (resp.status === 403) return { ok:false, error:'WebDAV 返回 HTTP 403，无法确认云端备份，未修改数据' };

        if (resp.status === 404) {
          lastError = "云端未找到备份文件，请确认是否已先在另一台电脑上执行过备份";
          continue;
        }

        return { ok:false, error:`读取云端失败（HTTP ${resp.status}），未修改数据` };
      } catch {
        return { ok:false, error:'读取云端失败或超时，未修改数据' };
      }
    }

    return { ok: false, notFound:true, error: lastError || '未找到可恢复的备份文件' };
  }

  /**
   * 一键将本机全部配置与常用网站清洗打包并推送到 WebDAV
   * 支持 mergeRemote: true 先拉取云端无损并集合并，再上传推送（双向安全合并上传）
   */
  public async pushCurrentConfig(config: WebDavConfig, options: { mergeRemote?: boolean; migrateLegacy?: boolean; expectedRemoteEtag?: string; expectedRemoteUrl?: string; expectedLocalHash?: string; beforeAutoWrite?: () => Promise<void> } = {}): Promise<WebDavOperationResult> {
    try {
      const passphrase = await webdavVault.get();
      if (!passphrase) return { ok:false, errorKind:'policy', error:'请先在设置 → 同步中设置备份加密口令' };
      const remote = await this.download(config, { passphrase });
      if (!remote.ok && !remote.notFound) return { ok:false, error:remote.error || '无法读取云端备份，未上传' };
      if (options.expectedRemoteEtag && (!remote.ok || remote.etag !== options.expectedRemoteEtag || remote.fileUrl !== options.expectedRemoteUrl)) return { ok:false, error:'云端备份已变化，请确认后再同步；未上传' };
      if (remote.ok) {
        const parsedRemote = parseSyncBackup(remote.data, SYNC_WHITELIST_KEYS, { allowCredentials:remote.encrypted === true });
        if (options.migrateLegacy && !remote.encrypted) {
          const raw = isRecord(remote.data.settings) ? remote.data.settings : remote.data;
          const metadata = new Set(['formatVersion','clientDevice','deviceId','deviceName','exportedAt','backupKind','credentialsIncluded','changeSummary']);
          const unsafe = Object.keys(raw).some(key => !metadata.has(key) && (!SYNC_WHITELIST_KEYS.includes(key) || (raw[key] != null && !Object.hasOwn(parsedRemote.sanitized, key))));
          if (unsafe) return { ok:false, errorKind:'policy', error:'旧备份含未知或无法完整迁移的数据；请保留原文件并使用新文件名备份，未覆盖' };
        }
        if (!remote.encrypted && !options.migrateLegacy) return { ok:false, errorKind:'policy', error:'云端是旧版明文备份；请先使用「迁移旧备份并加密」，未覆盖原文件' };
        if (!remote.etag) return { ok:false, errorKind:'policy', error:'服务器未提供 ETag，无法安全防止并发覆盖；未上传' };
      } else if (options.migrateLegacy) return { ok:false, error:'没有找到旧版明文备份，未上传' };
      if (options.migrateLegacy && remote.encrypted) return { ok:false, error:'云端备份已经加密，无需迁移；未上传' };
      let localSettings = await readSyncSettings();
      if (remote.ok && remote.encrypted) {
        const cloudSettings = isRecord(remote.data.settings) ? remote.data.settings : remote.data;
        if (BACKPACK_SYNC_KEYS.some(key => Array.isArray(cloudSettings[key]) && hasPotentialDataLoss(localSettings[key], cloudSettings[key]))) {
          return { ok:false, errorKind:'policy', error:'本机缺少云端已有的背包内容；未上传，以免覆盖提示词或文章。请先分别导出备份并核对。' };
        }
      }
      if ((options.mergeRemote || options.migrateLegacy) && remote.ok) localSettings = mergeProtectingConnections(localSettings, remote.data.settings || remote.data);
      const localCredential = await multicaService.credentialForEncryptedBackup();
      if (options.expectedLocalHash && await snapshotFingerprint(await readSyncSettings(), localCredential) !== options.expectedLocalHash) return { ok:false, error:'本地配置已变化，请确认后再同步；未上传' };
      const remoteCredential = remote.encrypted ? remote.data?.multicaCredential : undefined;
      if (remoteCredential !== undefined && !validMulticaCredential(remoteCredential)) return { ok:false, error:'云端 Multica 凭证格式无效，未上传' };
      if (localCredential && validMulticaCredential(remoteCredential) && (localCredential.token !== remoteCredential.token || localCredential.workspaceId !== remoteCredential.workspaceId)) return { ok:false, error:'本机与云端 Multica 连接不同；为避免覆盖其他账号，已取消上传。可使用独立的备份文件名' };
      const payload = await createSyncBackup(localSettings);
      const backup = { ...payload, credentialsIncluded:true, ...(localCredential || remoteCredential ? { multicaCredential:localCredential || remoteCredential } : {}) };
      const beforePut = options.expectedLocalHash || options.beforeAutoWrite ? async () => { if (options.beforeAutoWrite) await options.beforeAutoWrite(); if (options.expectedLocalHash && (await currentSnapshot()).hash !== options.expectedLocalHash) throw new Error('本地配置已变化，请确认后再同步；未上传'); } : undefined;
      const res = await this.upload(config, backup, { preflight:remote, migrateLegacy:options.migrateLegacy, passphrase, beforePut });
      if (!res.ok) return { ok:false, error:res.error || '加密上传失败', errorKind:res.errorKind };
      let etag = res.etag;
      if (!etag) {
        const verified = await this.download(config, { passphrase });
        if (verified.ok && verified.encrypted && verified.etag && verified.fileUrl === res.fileUrl && await snapshotFingerprint(verified.data.settings || {}, verified.data.multicaCredential) === await snapshotFingerprint(backup.settings, backup.multicaCredential)) etag = verified.etag;
      }
      const baselineRecorded = await recordAlignedBaseline(config, backup, etag, res.fileUrl);
      // Upload never silently mutates local settings or credentials.
      return { ok:true, count:Object.keys(payload.settings).length, byteLength:res.byteLength, etag, baselineRecorded };
    } catch (err) {
      return { ok:false, errorKind:err instanceof SyncBackupError ? 'policy' : 'operation', error:err instanceof Error ? err.message : '加密备份失败；未确认上传' };
    }
  }

  /**
   * 一键从 WebDAV 拉取配置并对齐恢复到本地
   */
  public async pullCurrentConfig(config: WebDavConfig, options: { merge?: boolean; expectedRemoteEtag?: string; expectedRemoteUrl?: string; expectedLocalHash?: string; beforeAutoWrite?: () => Promise<void> } = {}): Promise<WebDavOperationResult> {
    try {
      const res = await this.download(config);
      if (!res.ok || !res.data) {
        return { ok: false, error: res.error || "未在服务器找到对应备份文件" };
      }

      if (!res.encrypted) return { ok:false, errorKind:'policy', error:'云端为旧版明文备份；请先通过「迁移旧备份并加密」确认迁移，未恢复数据' };
      if (options.expectedRemoteEtag && (res.etag !== options.expectedRemoteEtag || res.fileUrl !== options.expectedRemoteUrl)) return { ok:false, error:'云端备份已变化，请确认后再同步；未恢复数据' };
      let dataToRestore = res.data;
      const parsed = parseSyncBackup(dataToRestore, SYNC_WHITELIST_KEYS, { allowCredentials:true });
      const credential = res.encrypted ? dataToRestore.multicaCredential : undefined;
      if (credential !== undefined && !validMulticaCredential(credential)) return { ok:false, error:'备份中的 Multica 连接格式无效，未恢复任何数据' };
      const localSettings = await readSyncSettings();
      const settings = options.merge ? mergeProtectingConnections(localSettings, parsed.sanitized) : preserveLocalConnections(localSettings, { ...parsed.sanitized });
      dataToRestore = { ...dataToRestore, settings };
      const beforeCommit = options.expectedLocalHash || options.beforeAutoWrite ? async () => { if (options.beforeAutoWrite) await options.beforeAutoWrite(); if (options.expectedLocalHash && (await currentSnapshot()).hash !== options.expectedLocalHash) throw new Error('本地配置已变化，请确认后再同步；未恢复数据'); } : undefined;
      const restoreResult = await restoreSyncBackup(dataToRestore, { allowCredentials:true, beforeCommit });
      let credentialResult: 'restored' | 'kept' | undefined;
      if (credential !== undefined) {
        try { credentialResult = await multicaService.restoreEncryptedCredential(credential); }
        catch { return { ok:false, error:'普通配置已恢复，但 Multica 连接保存失败；请在工作台检查后重试连接' }; }
      }
      const baselineRecorded = await recordAlignedBaseline(config, res.data, res.etag, res.fileUrl);
      return { ok:true, ...restoreResult, credentialResult, etag:res.etag || undefined, baselineRecorded };
    } catch (err: any) {
      const msg = err?.message || '恢复失败';
      return {
        ok: false,
        errorKind: (err instanceof SyncBackupError || err?.name === "SyncBackupError") ? "policy" : "operation",
        error: (err instanceof SyncBackupError || err?.name === "SyncBackupError") ? err.message : `恢复过程发生异常: ${msg}`
      };
    }
  }
}

export const webDavService = WebDavService.getInstance();
