"use strict";

(function initMobileShim() {
  const isExtension = typeof chrome !== "undefined" && Boolean(chrome?.runtime?.id);

  if (!isExtension) {
    window.chrome = window.chrome || {};

    if (!window.chrome.storage) {
      window.chrome.storage = {
        local: {
          get(keys, callback) {
            return new Promise((resolve) => {
              const result = {};
              if (keys === null || keys === undefined) {
                for (let i = 0; i < localStorage.length; i++) {
                  const k = localStorage.key(i);
                  try { result[k] = JSON.parse(localStorage.getItem(k)); } catch { result[k] = localStorage.getItem(k); }
                }
              } else {
                const keyList = Array.isArray(keys) ? keys : (typeof keys === "object" ? Object.keys(keys) : [String(keys)]);
                keyList.forEach((k) => {
                  const raw = localStorage.getItem(k);
                  if (raw !== null) {
                    try { result[k] = JSON.parse(raw); } catch { result[k] = raw; }
                  } else if (typeof keys === "object" && !Array.isArray(keys) && keys[k] !== undefined) {
                    result[k] = keys[k];
                  }
                });
              }
              if (typeof callback === "function") callback(result);
              resolve(result);
            });
          },
          set(items, callback) {
            return new Promise((resolve) => {
              if (items && typeof items === "object") {
                Object.entries(items).forEach(([k, v]) => {
                  try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { console.warn("[MobileShim] set err:", k, e); }
                });
              }
              if (typeof callback === "function") callback();
              resolve();
            });
          },
          remove(keys, callback) {
            return new Promise((resolve) => {
              const list = Array.isArray(keys) ? keys : [keys];
              list.forEach((k) => localStorage.removeItem(k));
              if (typeof callback === "function") callback();
              resolve();
            });
          },
          clear(callback) {
            return new Promise((resolve) => {
              localStorage.clear();
              if (typeof callback === "function") callback();
              resolve();
            });
          }
        },
        sync: null
      };
      window.chrome.storage.sync = window.chrome.storage.local;
    }

    if (!window.chrome.runtime) {
      window.chrome.runtime = {
        id: "mobile-standalone",
        getURL(path) { return path.startsWith("/") ? path.slice(1) : path; },
        sendMessage(msg, cb) { if (cb) cb({ ok: false }); return Promise.resolve({ ok: false }); },
        onMessage: { addListener() {}, removeListener() {} }
      };
    }
  }

  // 自动从电脑端拉取过继配置
  window.syncConfigFromComputer = async function() {
    try {
      const res = await fetch("/api/sync-pull");
      if (!res.ok) return { ok: false, error: "无法连接到电脑同步服务" };
      const data = await res.json();
      if (data && !data.empty && typeof data === "object") {
        delete data._updatedAt;
        delete data.ok;
        delete data.message;
        let count = 0;
        Object.entries(data).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            try { localStorage.setItem(k, JSON.stringify(v)); count++; } catch {}
          }
        });
        console.log(`[MobileShim] 成功从电脑过继同步 ${count} 项配置！`);
        window.dispatchEvent(new CustomEvent("mobile-config-synced", { detail: data }));
        return { ok: true, count };
      }
      return { ok: false, message: data.message || "电脑端尚未上传配置" };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  // 启动即尝试静默同步
  setTimeout(window.syncConfigFromComputer, 300);
})();
