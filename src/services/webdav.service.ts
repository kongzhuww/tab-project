import { createSyncBackup, extractSyncPayload, readSyncSettings, restoreSyncBackup, SYNC_WHITELIST_KEYS } from "./sync.service";
import { parseSyncBackup, SyncBackupError, isRecord } from "./sync-payload";
import { webDavFetch } from "./webdav-request";
import { mergeSyncSettings } from "./sync-merger";

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
  public async upload(config: WebDavConfig, payload: Record<string, any>): Promise<WebDavOperationResult> {
    if (!config.url || !config.username || !config.password) {
      return { ok: false, error: "请先在设置中填写坚果云 WebDAV 账号与应用密码" };
    }

    const auth = this.getAuthHeader(config);
    let backupEnvelope: any;

    // 检查 payload 是否已经是合法格式的信封
    if (payload && typeof payload === "object" && payload.settings && typeof payload.settings === "object") {
      const { sanitized } = extractSyncPayload(payload.settings);
      backupEnvelope = {
        ...payload,
        settings: sanitized
      };
    } else {
      // 纯设置字典，自动打包为信封
      const { sanitized } = extractSyncPayload(payload);
      backupEnvelope = await createSyncBackup(sanitized);
    }

    const jsonStr = JSON.stringify(backupEnvelope, null, 2);
    const byteLength = new TextEncoder().encode(jsonStr).length;
    const candidates = this.getCandidateUrls(config);

    let lastError = "";

    for (const candidate of candidates) {
      try {
        // 先确保目录存在
        await this.ensureDirectory(candidate.dirUrl, auth);

        const resp = await webDavFetch(candidate.fileUrl, {
          method: "PUT",
          headers: {
            Authorization: auth,
            "Content-Type": "application/json; charset=utf-8"
          },
          body: jsonStr,
          signal: AbortSignal.timeout(20000)
        });

        if (resp.status === 200 || resp.status === 201 || resp.status === 204) {
          return { ok: true, byteLength };
        }

        if (resp.status === 401) {
          return { ok: false, error: "坚果云鉴权失败 (401): 请检查账号和应用专用密码（不能使用网页登录密码）" };
        }

        if (resp.status === 403) {
          lastError = "坚果云返回 HTTP 403: 坚果云根目录不允许直接存放文件（已尝试自动创建子目录）。请检查：1. 是否在坚果云网页版已建有该文件夹；2. 坚果云免费账号本月上传流量是否已达到 1GB 上限；3. 稍后重试以解除短时频次保护。";
          continue;
        }

        if (resp.status === 404 || resp.status === 409) {
          lastError = `父目录不存在 (HTTP ${resp.status})，请在坚果云网页端新建对应同步文件夹`;
          continue;
        }

        lastError = `坚果云返回 HTTP ${resp.status}`;
      } catch (err: any) {
        lastError = `网络异常: ${err?.message || "请求失败"}`;
      }
    }

    return { ok: false, error: lastError || "上传失败" };
  }

  /**
   * 从 WebDAV 下载配置 (GET)
   * 支持多候选目录智能查找
   */
  public async download(config: WebDavConfig): Promise<{ ok: boolean; data?: any; error?: string }> {
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
          try {
            let parsed = JSON.parse(textData);
            if (typeof parsed === "string") {
              try { parsed = JSON.parse(parsed); } catch {}
            }
            return { ok: true, data: parsed };
          } catch {
            return { ok: false, error: "云端返回的文件内容并非合法的 JSON 格式" };
          }
        }

        if (resp.status === 401) {
          return { ok: false, error: "坚果云 WebDAV 鉴权失败，请核对账号与应用密码" };
        }

        if (resp.status === 403) {
          lastError = "坚果云返回 HTTP 403: 无权访问该路径或本月流量达到上限";
          continue;
        }

        if (resp.status === 404) {
          lastError = "云端未找到备份文件，请确认是否已先在另一台电脑上执行过备份";
          continue;
        }

        lastError = `拉取失败: HTTP ${resp.status}`;
      } catch (err: any) {
        lastError = `拉取网络异常: ${err?.message || "连接超时"}`;
      }
    }

    return { ok: false, error: lastError || "未找到可恢复的备份文件" };
  }

  /**
   * 一键将本机全部配置与常用网站清洗打包并推送到 WebDAV
   * 支持 mergeRemote: true 先拉取云端无损并集合并，再上传推送（双向安全合并上传）
   */
  public async pushCurrentConfig(config: WebDavConfig, options: { mergeRemote?: boolean } = {}): Promise<WebDavOperationResult> {
    try {
      let localSettings = await readSyncSettings();

      if (options.mergeRemote) {
        // 先下载云端现有配置做预合并
        try {
          const dl = await this.download(config);
          if (dl.ok && dl.data) {
            const remoteSettings = dl.data.settings || dl.data;
            // 将本地与云端无损融合
            localSettings = mergeSyncSettings(localSettings, remoteSettings);
          }
        } catch (dlErr) {
          console.warn("[WebDAV Push] 预拉取云端数据跳过，直接上传当前本地配置:", dlErr);
        }
      }

      // 生成安全的上传信封
      const payload = await createSyncBackup(localSettings);

      const res = await this.upload(config, payload);
      if (res.ok) {
        // 上传坚果云成功后，再静默将融合后的配置固化到当前本地
        if (options.mergeRemote) {
          try {
            await restoreSyncBackup(payload);
          } catch (e) {
            console.warn("[WebDAV Push] 本地持久化融合快照告警:", e);
          }
        }
        return { ok: true, count: payload.settings ? Object.keys(payload.settings).length : 0, byteLength: res.byteLength };
      }
      return { ok: false, error: res.error || "上传坚果云失败" };
    } catch (err: any) {
      const msg = err?.message || String(err);
      return { ok: false, errorKind: err instanceof SyncBackupError ? "policy" : "operation", error: `备份过程发生异常: ${msg}` };
    }
  }

  /**
   * 一键从 WebDAV 拉取配置并对齐恢复到本地
   */
  public async pullCurrentConfig(config: WebDavConfig, options: { merge?: boolean } = {}): Promise<WebDavOperationResult> {
    try {
      const res = await this.download(config);
      if (!res.ok || !res.data) {
        return { ok: false, error: res.error || "未在服务器找到对应备份文件" };
      }

      let dataToRestore = res.data;
      if (typeof dataToRestore === "string") {
        try { dataToRestore = JSON.parse(dataToRestore); } catch {}
      }

      if (options.merge) {
        const localSettings = await readSyncSettings();
        const remoteSettings = (dataToRestore && typeof dataToRestore === "object" && dataToRestore.settings)
          ? dataToRestore.settings
          : dataToRestore;
        const merged = mergeSyncSettings(localSettings, remoteSettings);
        dataToRestore = {
          ...(typeof dataToRestore === "object" ? dataToRestore : {}),
          settings: merged
        };
      }

      const restoreResult = await restoreSyncBackup(dataToRestore);
      return { ok: true, ...restoreResult };
    } catch (err: any) {
      console.error("[WebDAV Pull] 恢复失败详情:", err);
      const msg = err?.message || String(err);
      return {
        ok: false,
        errorKind: (err instanceof SyncBackupError || err?.name === "SyncBackupError") ? "policy" : "operation",
        error: (err instanceof SyncBackupError || err?.name === "SyncBackupError") ? err.message : `恢复过程发生异常: ${msg}`
      };
    }
  }
}

export const webDavService = WebDavService.getInstance();
