import { p as f, c as h, e as p, r as g, S as l, a as m, b as y } from "./sync.service-DTh6oAhK.js";
class c {
  constructor() {
  }
  static getInstance() {
    return c.instance || (c.instance = new c()), c.instance;
  }
  /**
   * 生成 Base64 Basic Auth 凭据
   */
  getAuthHeader(e) {
    const t = `${e.username}:${e.password}`;
    try {
      return `Basic ${btoa(unescape(encodeURIComponent(t)))}`;
    } catch {
      return `Basic ${btoa(t)}`;
    }
  }
  /**
   * 规范化与提取坚果云可用的目录候选列表
   * 核心原因：坚果云 WebDAV 严禁在根目录 /dav/ 直接创建文件，否则服务器必然返回 HTTP 403 Forbidden！
   */
  getCandidateUrls(e) {
    let t = (e.url || "https://dav.jianguoyun.com/dav/").trim();
    t.endsWith("/") || (t += "/");
    const s = (e.filename || "logicweaver-settings.json").trim().replace(/^\//, "");
    if (t.includes("dav.jianguoyun.com"))
      try {
        const r = new URL(t), a = r.pathname.replace(/\/+$/, "");
        if (a === "/dav" || a === "") {
          const i = r.origin;
          return [
            {
              dirUrl: `${i}/dav/LogicWeaver/`,
              fileUrl: `${i}/dav/LogicWeaver/${s}`
            },
            {
              dirUrl: `${i}/dav/我的坚果云/`,
              fileUrl: `${i}/dav/我的坚果云/${s}`
            }
          ];
        }
      } catch {
      }
    return [
      {
        dirUrl: t,
        fileUrl: t + s
      }
    ];
  }
  /**
   * 拼接最终完整的文件远程 URL（取首选候选）
   */
  getFullFileUrl(e) {
    return this.getCandidateUrls(e)[0].fileUrl;
  }
  /**
   * 确保 WebDAV 目录存在（使用 MKCOL 创建集合目录）
   */
  async ensureDirectory(e, t) {
    try {
      const s = await fetch(e, {
        method: "MKCOL",
        headers: { Authorization: t },
        signal: AbortSignal.timeout(6e3)
      });
      return s.status === 201 || s.status === 405 || s.ok;
    } catch {
      return !1;
    }
  }
  /**
   * 测试 WebDAV 连通性
   */
  async testConnection(e) {
    if (!e.url || !e.username || !e.password)
      return { ok: !1, message: "请完整填写 WebDAV 服务器地址、账号和应用密码" };
    const t = this.getAuthHeader(e), n = this.getCandidateUrls(e)[0].dirUrl;
    try {
      await this.ensureDirectory(n, t);
      const r = await fetch(n, {
        method: "PROPFIND",
        headers: {
          Authorization: t,
          Depth: "0"
        },
        signal: AbortSignal.timeout(1e4)
      });
      return r.status === 207 || r.status === 200 ? { ok: !0, message: `✓ 坚果云认证成功！同步目标目录: ${new URL(n).pathname}` } : r.status === 401 ? { ok: !1, message: "认证失败 (401): 必须在坚果云网页版【安全选项】中生成“应用专用密码”，不能用登录密码！" } : r.status === 403 ? {
        ok: !1,
        message: "坚果云返回 403: 坚果云根目录不可直接访问或本月免费流量已耗尽。请在地址后追加同步文件夹，如 /dav/我的坚果云/"
      } : r.status === 404 ? { ok: !1, message: "目录不存在 (404)，请在坚果云网页版创建对应文件夹" } : (await fetch(n, {
        method: "OPTIONS",
        headers: { Authorization: t },
        signal: AbortSignal.timeout(6e3)
      })).ok ? { ok: !0, message: "✓ WebDAV 服务握手成功！" } : { ok: !1, message: `服务器返回状态 HTTP ${r.status}` };
    } catch (r) {
      return { ok: !1, message: `网络连接异常: ${r?.message || "请求超时或受阻"}` };
    }
  }
  /**
   * 上传配置到 WebDAV (PUT)
   * 包含自动 MKCOL 目录创建与坚果云 403 智能回退
   */
  async upload(e, t) {
    if (!e.url || !e.username || !e.password)
      return { ok: !1, error: "请先在设置中填写坚果云 WebDAV 账号与应用密码" };
    const s = this.getAuthHeader(e), n = f(t, y), r = JSON.stringify(h(n.sanitized), null, 2), a = new TextEncoder().encode(r).length, i = this.getCandidateUrls(e);
    let u = "";
    for (const d of i)
      try {
        await this.ensureDirectory(d.dirUrl, s);
        const o = await fetch(d.fileUrl, {
          method: "PUT",
          headers: {
            Authorization: s,
            "Content-Type": "application/json; charset=utf-8"
          },
          body: r,
          signal: AbortSignal.timeout(2e4)
        });
        if (o.status === 200 || o.status === 201 || o.status === 204)
          return { ok: !0, byteLength: a };
        if (o.status === 401)
          return { ok: !1, error: "坚果云鉴权失败 (401): 请检查账号和应用专用密码（不能使用网页登录密码）" };
        if (o.status === 403) {
          u = "坚果云返回 HTTP 403: 坚果云根目录不允许直接存放文件（已尝试自动创建子目录）。请检查：1. 是否在坚果云网页版已建有该文件夹；2. 坚果云免费账号本月上传流量是否已达到 1GB 上限；3. 稍后重试以解除短时频次保护。";
          continue;
        }
        if (o.status === 404 || o.status === 409) {
          u = `父目录不存在 (HTTP ${o.status})，请在坚果云网页端新建对应同步文件夹`;
          continue;
        }
        u = `坚果云返回 HTTP ${o.status}`;
      } catch (o) {
        u = `网络异常: ${o?.message || "请求失败"}`;
      }
    return { ok: !1, error: u || "上传失败" };
  }
  /**
   * 从 WebDAV 下载配置 (GET)
   * 支持多候选目录智能查找
   */
  async download(e) {
    if (!e.url || !e.username || !e.password)
      return { ok: !1, error: "请先在设置中填写坚果云 WebDAV 账号与应用密码" };
    const t = this.getAuthHeader(e), s = this.getCandidateUrls(e);
    let n = "";
    for (const r of s)
      try {
        const a = await fetch(r.fileUrl, {
          method: "GET",
          headers: {
            Authorization: t,
            Accept: "application/json, text/plain, */*"
          },
          signal: AbortSignal.timeout(15e3)
        });
        if (a.status === 200) {
          const i = await a.text();
          try {
            return { ok: !0, data: JSON.parse(i) };
          } catch {
            return { ok: !1, error: "云端返回的文件内容并非合法的 JSON 格式" };
          }
        }
        if (a.status === 401)
          return { ok: !1, error: "坚果云 WebDAV 鉴权失败，请核对账号与应用密码" };
        if (a.status === 403) {
          n = "坚果云返回 HTTP 403: 无权访问该路径或本月流量达到上限";
          continue;
        }
        if (a.status === 404) {
          n = "云端未找到备份文件，请确认是否已先在另一台电脑上执行过备份";
          continue;
        }
        n = `拉取失败: HTTP ${a.status}`;
      } catch (a) {
        n = `拉取网络异常: ${a?.message || "连接超时"}`;
      }
    return { ok: !1, error: n || "未找到可恢复的备份文件" };
  }
  /**
   * 一键将本机全部配置与常用网站清洗打包并推送到 WebDAV
   */
  async pushCurrentConfig(e) {
    try {
      const { sanitized: t, count: s, byteLength: n } = p(await g());
      if (s === 0)
        return { ok: !1, errorKind: "policy", error: "未检测到有效的普通备份配置项" };
      const r = h(t), a = await this.upload(e, r);
      return a.ok ? { ok: !0, count: s, byteLength: a.byteLength || n } : { ok: !1, error: a.error || "上传坚果云失败" };
    } catch (t) {
      return { ok: !1, errorKind: t instanceof l ? "policy" : "operation", error: t instanceof l ? t.message : "备份过程发生异常" };
    }
  }
  /**
   * 一键从 WebDAV 拉取配置并对齐恢复到本地
   */
  async pullCurrentConfig(e) {
    try {
      const t = await this.download(e);
      return !t.ok || !t.data ? { ok: !1, error: t.error || "拉取失败" } : { ok: !0, ...await m(t.data) };
    } catch (t) {
      return { ok: !1, errorKind: t instanceof l ? "policy" : "operation", error: t instanceof l ? t.message : "恢复过程发生异常，请检查实际写入结果；未自动重试" };
    }
  }
}
const w = c.getInstance();
export {
  w
};
