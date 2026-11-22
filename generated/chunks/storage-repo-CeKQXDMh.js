function c() {
  return typeof chrome < "u" && !!chrome.storage?.local;
}
async function i(e) {
  return c() ? new Promise((o, n) => {
    const a = (r) => {
      const t = chrome.runtime?.lastError;
      if (t) {
        n(new Error(t.message || "读取扩展存储失败"));
        return;
      }
      o(r && typeof r == "object" ? r : {});
    };
    try {
      const r = chrome.storage.local.get(e, a);
      r && typeof r.then == "function" && r.then((t) => o(t || {}), n);
    } catch (r) {
      n(r);
    }
  }) : {};
}
async function s(e) {
  if (c())
    return new Promise((o, n) => {
      const a = () => {
        const r = chrome.runtime?.lastError;
        if (r) {
          n(new Error(r.message || "写入扩展存储失败"));
          return;
        }
        o();
      };
      try {
        const r = chrome.storage.local.set(e, a);
        r && typeof r.then == "function" && r.then(() => o(), n);
      } catch (r) {
        n(r);
      }
    });
}
function f(e) {
  if (typeof localStorage > "u") return;
  const o = localStorage.getItem(e);
  if (o !== null)
    try {
      return JSON.parse(o);
    } catch {
      return o;
    }
}
function u(e, o) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(e, JSON.stringify(o));
    } catch {
    }
}
export {
  f as a,
  u as b,
  c as h,
  i as r,
  s as w
};
