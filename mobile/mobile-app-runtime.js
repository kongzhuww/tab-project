"use strict";

(function initNativeRuntime() {
  const isNative = Boolean(window.Capacitor?.isNativePlatform?.());
  const originalFetch = window.fetch.bind(window);

  function readString(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return "";
    try {
      const value = JSON.parse(raw);
      return typeof value === "string" ? value.trim() : String(value || "").trim();
    } catch { return raw.trim(); }
  }

  function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  async function nativeJson(url, headers = {}) {
    const http = window.Capacitor?.Plugins?.CapacitorHttp;
    if (!http?.get) return originalFetch(url, { headers });
    const result = await http.get({ url, headers });
    let data = result.data;
    if (typeof data === "string") {
      try { data = JSON.parse(data); } catch {}
    }
    return jsonResponse(data, Number(result.status || 200));
  }

  function bridgeBase() {
    const value = readString("desktopBridgeUrl").replace(/\/$/, "");
    try {
      const parsed = new URL(value);
      return parsed.protocol === "https:" || parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost" ? parsed.href.replace(/\/$/, "") : "";
    } catch { return ""; }
  }

  async function routeNativeApi(pathname, init = {}) {
    const todoistToken = readString("todoistToken");
    const githubToken = readString("ghToken");
    const githubUser = readString("ghUser");
    const biliMid = readString("biliUserMid");

    if (pathname === "/api/sync-pull") {
      const bridge = bridgeBase();
      if (!bridge) return jsonResponse({ ok: false, empty: true, message: "独立 App 模式；未配置电脑桥接" });
      return originalFetch(`${bridge}/api/sync-pull`, init);
    }
    if (pathname.startsWith("/api/bili/folders")) {
      const auth = window.Capacitor?.Plugins?.BilibiliAuth;
      if (auth?.getStatus) {
        const status = await auth.getStatus();
        if (status.loggedIn) return jsonResponse(await auth.getFolders());
      }
      const inputUrl = new URL(pathname, "https://localhost");
      const mid = inputUrl.searchParams.get("mid") || biliMid;
      if (!mid) return jsonResponse({ ok: false, error: "请先登录 B站或配置 UID" }, 400);
      return nativeJson(`https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${encodeURIComponent(mid)}`, {
        "Referer": "https://www.bilibili.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/128 Mobile Safari/537.36"
      });
    }
    if (pathname.startsWith("/api/bili/folder-items")) {
      const inputUrl = new URL(pathname, "https://localhost");
      const id = inputUrl.searchParams.get("id") || "";
      const page = inputUrl.searchParams.get("pn") || "1";
      const auth = window.Capacitor?.Plugins?.BilibiliAuth;
      if (auth?.getStatus) {
        const status = await auth.getStatus();
        if (status.loggedIn) return jsonResponse(await auth.getFolderItems({ folderId: id, page: Number(page) || 1 }));
      }
      return nativeJson(`https://api.bilibili.com/x/v3/fav/resource/list?media_id=${encodeURIComponent(id)}&pn=${encodeURIComponent(page)}&ps=20&platform=web`, {
        "Referer": "https://www.bilibili.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/128 Mobile Safari/537.36"
      });
    }
    if (pathname.startsWith("/api/bili/comments")) {
      const inputUrl = new URL(pathname, "https://localhost");
      const bvid = inputUrl.searchParams.get("bvid") || "";
      if (!/^BV[0-9A-Za-z]+$/.test(bvid)) return jsonResponse({ ok: false, error: "视频 BV 号无效" }, 400);
      const headers = {
        "Referer": `https://www.bilibili.com/video/${bvid}`,
        "User-Agent": "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/128 Mobile Safari/537.36"
      };
      const viewResponse = await nativeJson(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`, headers);
      const view = await viewResponse.json();
      const aid = view?.data?.aid;
      if (!aid) return jsonResponse({ ok: false, error: "无法解析视频评论 ID" }, 502);
      return nativeJson(`https://api.bilibili.com/x/v2/reply?type=1&oid=${encodeURIComponent(aid)}&sort=2&pn=1&ps=20`, headers);
    }
    if (pathname === "/api/todoist/tasks") {
      if (!todoistToken) return jsonResponse({ ok: false, error: "请先配置 Todoist Token" }, 401);
      const headers = { ...(init.headers || {}), "Authorization": `Bearer ${todoistToken}`, "Content-Type": "application/json" };
      if (String(init.method || "GET").toUpperCase() !== "GET") {
        return originalFetch("https://api.todoist.com/api/v1/tasks", { ...init, headers });
      }
      const results = [];
      let cursor = "";
      for (let page = 0; page < 20; page++) {
        const endpoint = `https://api.todoist.com/api/v1/tasks${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`;
        const response = await originalFetch(endpoint, { headers });
        if (!response.ok) return response;
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : (payload?.results || []);
        results.push(...items);
        cursor = payload?.next_cursor || "";
        if (!cursor) break;
      }
      return jsonResponse({ results, next_cursor: null });
    }
    if (pathname.startsWith("/api/todoist/close/")) {
      if (!todoistToken) return jsonResponse({ ok: false, error: "请先配置 Todoist Token" }, 401);
      const id = pathname.slice("/api/todoist/close/".length);
      return originalFetch(`https://api.todoist.com/api/v1/tasks/${encodeURIComponent(id)}/close`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${todoistToken}` }
      });
    }
    if (pathname === "/api/github/stars") {
      if (!githubToken && !githubUser) return jsonResponse({ ok: false, error: "请先配置 GitHub 用户或 Token" }, 401);
      const endpoint = githubToken
        ? "https://api.github.com/user/starred?per_page=50&sort=updated"
        : `https://api.github.com/users/${encodeURIComponent(githubUser)}/starred?per_page=50&sort=updated`;
      return originalFetch(endpoint, {
        headers: {
          "Accept": "application/vnd.github+json",
          ...(githubToken ? { "Authorization": `Bearer ${githubToken}` } : {})
        }
      });
    }
    if (pathname === "/api/translate") {
      const body = typeof init.body === "string" ? JSON.parse(init.body || "{}") : (init.body || {});
      const text = String(body.text || "").trim().slice(0, 5000);
      const target = String(body.target || "zh-CN");
      if (!text) return jsonResponse({ ok: false, error: "请输入内容" }, 400);
      const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await originalFetch(endpoint);
      if (!response.ok) return response;
      const data = await response.json();
      const translated = Array.isArray(data?.[0]) ? data[0].map((part) => part?.[0] || "").join("") : "";
      return jsonResponse({ ok: true, translated });
    }
    return jsonResponse({ ok: false, error: `App 尚未实现接口：${pathname}` }, 404);
  }

  if (isNative) {
    window.fetch = (input, init = {}) => {
      const raw = typeof input === "string" ? input : input?.url || "";
      if (raw.startsWith("/api/")) return routeNativeApi(raw, init);
      return originalFetch(input, init);
    };
    document.documentElement.dataset.nativeApp = "true";
  }

  window.LogicWeaverMobileRuntime = { isNative, bridgeBase, readString };
})();
