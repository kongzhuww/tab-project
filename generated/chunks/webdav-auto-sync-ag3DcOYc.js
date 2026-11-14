import { a as c, A as l, l as g, t as p, w as h, d as w, r as v, b as d, e as m, f as C, g as E, h as U, i as x, j as A } from "./webdav.service-21-_tXW6.js";
import { p as D, S as H } from "./sync.service-DU_NQoTG.js";
async function T() {
  if (typeof chrome > "u" || !chrome.storage?.local) return { status: "disabled" };
  if (!chrome.storage?.session || typeof navigator > "u" || !navigator.locks)
    try {
      return await c() ? { status: "error", message: "浏览器不支持安全的自动同步锁，请手动同步。" } : { status: "disabled" };
    } catch {
      return { status: "disabled" };
    }
  return await navigator.locks.request("tab-project:webdav-auto-sync", { ifAvailable: !0 }, async (b) => {
    if (!b) return { status: "disabled" };
    try {
      if (!await c()) return { status: "disabled" };
      if ((await chrome.storage.session.get(l))[l]) return { status: "noop" };
      await chrome.storage.session.set({ [l]: !0 });
      const S = await g(), e = p(S);
      if (!e.url || !e.username || !e.password) return { status: "error", message: "请先完成 WebDAV 连接设置。" };
      const n = await h.get();
      if (!n) return { status: "error", message: "请在同步设置中输入备份口令。" };
      const y = await w(e), o = async () => {
        const f = p(await g());
        if (!await c() || await w(f) !== y || f.password !== e.password || await h.get() !== n) throw new Error("同步设置或口令已变化，自动操作已取消");
      }, s = await v(e), t = await d.download(e, { passphrase: n });
      if (!t.ok) return { status: "error", message: t.notFound ? "云端尚无备份，请先手动上传一次。" : t.error || "无法读取云端备份。" };
      if (!t.encrypted) return { status: "error", message: "云端是旧版明文备份，请到同步设置中确认迁移。" };
      if (!t.etag || !t.fileUrl) return { status: "error", message: "服务器未提供 ETag，无法安全检测冲突。" };
      if (s && t.fileUrl !== s.fileUrl) return { status: "conflict", message: "云端备份位置发生变化，未自动修改数据。" };
      const i = D(t.data, H, { allowCredentials: !0 }), a = await m();
      if (await C(i.sanitized, t.data.multicaCredential) === a.hash)
        return await o(), (await m()).hash !== a.hash ? { status: "conflict", message: "本地配置已变化，请在同步设置中确认。" } : (await E(e, a.hash, t.etag, t.fileUrl), { status: "noop" });
      if (!s)
        return { status: "conflict", message: "本机尚无同步基准，请先手动比较并选择上传或恢复。" };
      const r = U(s, a.hash, t.etag);
      if (r === "unchanged") return { status: "noop" };
      if (r === "conflict" || x(a.settings, i.sanitized, a.credential, t.data.multicaCredential)) return { status: "conflict", message: "本机和云端均有变化，或账号连接不同；未自动覆盖，请到同步设置确认。" };
      if (r === "upload" && A(a.settings, i.sanitized)) return { status: "conflict", message: "本机缺少部分云端内容，可能是删除或尚未加载；未自动覆盖，请到同步设置确认。" };
      const u = r === "upload" ? await d.pushCurrentConfig(e, { expectedRemoteEtag: s.etag, expectedRemoteUrl: s.fileUrl, expectedLocalHash: a.hash, beforeAutoWrite: o }) : await d.pullCurrentConfig(e, { expectedRemoteEtag: t.etag, expectedRemoteUrl: t.fileUrl, expectedLocalHash: a.hash, beforeAutoWrite: o });
      return u.ok ? u.baselineRecorded ? { status: r === "upload" ? "uploaded" : "downloaded" } : { status: "conflict", message: "操作已完成，但两端数据尚未完全一致；后续自动同步已暂停，请在设置中核对。" } : { status: "error", message: u.error || "同步未确认，请检查云端和本机状态。" };
    } catch {
      return { status: "error", message: "同步状态读取失败；未自动重试，请在设置中检查。" };
    }
  });
}
export {
  T as runWebDavAutoSync
};
