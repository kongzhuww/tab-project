const u = "logicweaver-bili-cache-v1", d = "biliCacheDirectory", y = "activeDirectoryId", D = "logicweaver-bili-cache", E = "video-folder";
async function f(e) {
  return new Promise((r, t) => {
    const n = indexedDB.open(e, 1);
    n.onupgradeneeded = () => {
      n.result.objectStoreNames.contains("handles") || n.result.createObjectStore("handles");
    };
    let o = !1;
    n.onsuccess = () => {
      o ? n.result.close() : r(n.result);
    }, n.onerror = () => t(new Error("缓存目录存储无法打开")), n.onblocked = () => {
      o = !0, t(new Error("缓存目录存储正被其他页面占用，请关闭旧页面后重试"));
    };
  });
}
async function i(e, r) {
  const t = await f(e);
  try {
    return await new Promise((n, o) => {
      const c = t.transaction("handles", "readonly"), a = c.objectStore("handles"), s = [];
      r.forEach((h, b) => {
        const l = a.get(h);
        l.onsuccess = () => {
          s[b] = l.result;
        };
      }), c.oncomplete = () => n(s), c.onerror = c.onabort = () => o(new Error("缓存目录读取失败"));
    });
  } finally {
    t.close();
  }
}
async function g() {
  const [e, r] = await i(u, [d, y]);
  if (e?.kind === "directory") return { handle: e, id: typeof r == "string" ? r : void 0 };
  const [t] = await i(D, [E]);
  return t?.kind === "directory" ? { handle: t } : null;
}
async function C() {
  return (await g())?.handle || null;
}
async function w(e, r) {
  const t = crypto.randomUUID(), n = await f(u);
  try {
    return await new Promise((o, c) => {
      const a = n.transaction("handles", "readwrite"), s = a.objectStore("handles");
      s.put(e, `directory:${t}`), r && (s.put(e, d), s.put(t, y)), a.oncomplete = () => o(), a.onerror = a.onabort = () => c(new Error("缓存目录保存未确认，请重读核对后再试"));
    }), t;
  } finally {
    n.close();
  }
}
function m(e) {
  return w(e, !0);
}
function p(e) {
  return w(e, !1);
}
async function v(e) {
  const [r] = await i(u, [`directory:${e}`]);
  return r?.kind === "directory" ? r : null;
}
async function _(e, r) {
  if (await e.queryPermission({ mode: r }) !== "granted" && await e.requestPermission({ mode: r }) !== "granted")
    throw new Error("未取得缓存目录权限，请在设置中重新选择或授权");
}
export {
  p as a,
  v as b,
  C as c,
  g,
  _ as r,
  m as s
};
