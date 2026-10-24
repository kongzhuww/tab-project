"use strict";

(function initMobileTools() {
  const $ = (id) => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const TOOLS = [
    { id: "calendar", group: "效率", icon: "🗓️", title: "任务日历", desc: "Todoist 截止日期月历", mode: "native" },
    { id: "translator", group: "效率", icon: "🌐", title: "快速翻译", desc: "自动识别与多语言翻译", mode: "native" },
    { id: "github", group: "内容", icon: "⭐", title: "GitHub Star", desc: "最近更新的星标仓库", mode: "native" },
    { id: "youtube", group: "内容", icon: "▶️", title: "YouTube", desc: "订阅与播放列表镜像", mode: "cache", requiresBridge: true },
    { id: "aihot", group: "内容", icon: "🔥", title: "AI HOT", desc: "AI 与科技资讯缓存", mode: "cache", requiresBridge: true },
    { id: "channels", group: "内容", icon: "📡", title: "频道聚合", desc: "Telegram 与 LINUX DO", mode: "cache", requiresBridge: true },
    { id: "books", group: "资料", icon: "📚", title: "我的书架", desc: "微信读书与本地书籍", mode: "cache", requiresBridge: true },
    { id: "bookmarks", group: "资料", icon: "🔖", title: "快捷入口", desc: "电脑同步的网站入口", mode: "native", requiresBridge: true },
    { id: "obsidian", group: "资料", icon: "💎", title: "Obsidian", desc: "电脑 Vault 文件工作台", mode: "cache", requiresBridge: true },
    { id: "notes", group: "资料", icon: "📝", title: "随身笔记", desc: "手机本地笔记工作台", mode: "route", page: "page-notes" },
    { id: "music", group: "娱乐", icon: "🎵", title: "音乐中心", desc: "塞壬唱片与 B站电台", mode: "links" },
    { id: "stickers", group: "娱乐", icon: "🖼️", title: "表情包", desc: "移动文件选择与图库入口", mode: "cache", requiresBridge: true },
    { id: "wallpaper", group: "外观", icon: "🌌", title: "壁纸库", desc: "移动端主题与壁纸", mode: "native" },
    { id: "task-shelf", group: "效率", icon: "🧩", title: "任务材料架", desc: "本地目标与材料清单", mode: "cache", requiresBridge: true },
    { id: "monitor", group: "系统", icon: "📊", title: "服务监控", desc: "手机中继与接口状态", mode: "native" },
    { id: "n8n", group: "系统", icon: "⚙️", title: "n8n 自动化", desc: "安全打开控制台", mode: "links", requiresBridge: true },
    { id: "update", group: "系统", icon: "⬆️", title: "软件更新", desc: "从 GitHub Release 更新 APK", mode: "native" },
    { id: "settings", group: "系统", icon: "🔧", title: "移动设置", desc: "账号、桥接与本地数据", mode: "native" },
    { id: "bili", group: "核心", icon: "📺", title: "B站收藏", desc: "分组、收藏与站内播放", mode: "route", page: "page-media" },
    { id: "todoist", group: "核心", icon: "✅", title: "Todoist", desc: "任务、筛选与完成", mode: "route", page: "page-tasks" },
    { id: "ai", group: "核心", icon: "✨", title: "AI 智脑", desc: "移动 AI 对话", mode: "route", page: "page-ai" }
  ];

  const CACHE_TOOL_KEYS = {
    youtube: ["youtubeRssVideosCacheV1", "youtubeDataCacheV1", "youtubeSubscriptionsV1"],
    aihot: ["lw-aihot-cached-feed-v1", "lw-aihot-cached-daily-latest-v1", "lw-aihot-cached-topics-v1"],
    channels: ["channelsWorkspaceFeedCacheV1", "telegramPublicChannelsCacheV1", "linuxDoTelegramCacheV1"],
    books: ["wereadShelfCacheV7", "booksLibraryV1"],
    obsidian: ["obsidianIndexCacheV1", "obsidianRecentNotesV1", "obsidianVaultsV1"],
    stickers: ["stickers", "stickerGroups", "stickerLibraryV1"],
    "task-shelf": ["taskThreads", "taskShelfState", "siteShelfLinks"]
  };

  function toast(message) {
    const node = $("mobile-toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(node._toolTimer);
    node._toolTimer = setTimeout(() => node.classList.remove("show"), 2400);
  }

  function readJson(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  }

  function openSheet(tool) {
    const overlay = $("mobile-tool-sheet");
    const body = $("mobile-tool-sheet-body");
    if (!overlay || !body) return;
    $("mobile-tool-sheet-title").textContent = `${tool.icon} ${tool.title}`;
    $("mobile-tool-sheet-desc").textContent = tool.desc;
    body.replaceChildren(el("div", "mobile-loading", "正在加载…"));
    overlay.hidden = false;
    renderTool(tool, body).catch((error) => {
      body.replaceChildren(el("div", "mobile-tool-error", `加载失败：${error.message}`));
    });
  }

  function closeSheet() {
    const overlay = $("mobile-tool-sheet");
    if (overlay) overlay.hidden = true;
  }

  function safeOpen(url) {
    try {
      const parsed = new URL(url, location.href);
      if (!["http:", "https:"].includes(parsed.protocol)) return;
      window.open(parsed.href, "_blank", "noopener,noreferrer");
    } catch {}
  }

  function normalizeArray(value) {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== "object") return [];
    for (const key of ["items", "results", "videos", "books", "tasks", "repos", "entries", "list"]) {
      if (Array.isArray(value[key])) return value[key];
    }
    if (value.pages && typeof value.pages === "object") return Object.values(value.pages).flatMap((page) => Array.isArray(page) ? page : []);
    return [];
  }

  function itemSummary(item) {
    if (typeof item === "string") return { title: item, detail: "", url: "" };
    if (!item || typeof item !== "object") return { title: String(item ?? ""), detail: "", url: "" };
    return {
      title: item.title || item.name || item.content || item.full_name || item.repo || item.subject || "未命名项目",
      detail: item.description || item.desc || item.summary || item.author || item.channel || item.html_url || "",
      url: item.url || item.html_url || item.link || item.webUrl || ""
    };
  }

  function renderList(body, items, emptyText) {
    const list = el("div", "mobile-data-list");
    if (!items.length) {
      list.appendChild(el("div", "mobile-empty-hint", emptyText));
      body.replaceChildren(list);
      return;
    }
    items.slice(0, 60).forEach((item) => {
      const data = itemSummary(item);
      const row = el(data.url ? "button" : "article", "mobile-data-row");
      if (data.url) row.type = "button";
      row.append(el("b", "", data.title), el("small", "", String(data.detail).slice(0, 180)));
      if (data.url) row.addEventListener("click", () => safeOpen(data.url));
      list.appendChild(row);
    });
    body.replaceChildren(list);
  }

  async function renderCalendar(body) {
    const payload = await fetch("/api/todoist/tasks").then((r) => {
      if (!r.ok) throw new Error("Todoist 未连接");
      return r.json();
    });
    const tasks = Array.isArray(payload) ? payload : (payload.results || []);
    let cursor = new Date();

    const render = () => {
      const year = cursor.getFullYear();
      const month = cursor.getMonth();
      const first = new Date(year, month, 1);
      const days = new Date(year, month + 1, 0).getDate();
      const dueMap = new Map();
      tasks.forEach((task) => {
        const date = task.due?.date?.slice(0, 10);
        if (!date) return;
        if (!dueMap.has(date)) dueMap.set(date, []);
        dueMap.get(date).push(task);
      });
      const wrap = el("div", "mobile-calendar");
      const head = el("div", "mobile-calendar-head");
      const prev = el("button", "action-btn", "‹");
      const next = el("button", "action-btn", "›");
      const label = el("b", "", `${year} 年 ${month + 1} 月`);
      prev.addEventListener("click", () => { cursor = new Date(year, month - 1, 1); render(); });
      next.addEventListener("click", () => { cursor = new Date(year, month + 1, 1); render(); });
      head.append(prev, label, next);
      const grid = el("div", "mobile-calendar-grid");
      ["日", "一", "二", "三", "四", "五", "六"].forEach((day) => grid.appendChild(el("span", "mobile-calendar-week", day)));
      for (let i = 0; i < first.getDay(); i++) grid.appendChild(el("span", "mobile-calendar-day blank", ""));
      for (let day = 1; day <= days; day++) {
        const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const due = dueMap.get(key) || [];
        const button = el("button", `mobile-calendar-day${due.length ? " has-task" : ""}`, String(day));
        button.type = "button";
        if (due.length) button.appendChild(el("small", "", String(due.length)));
        button.addEventListener("click", () => renderList(body, due, `${key} 暂无任务`));
        grid.appendChild(button);
      }
      wrap.append(head, grid, el("p", "mobile-tool-note", `已读取 ${tasks.length} 条 Todoist 任务；点击日期查看。`));
      body.replaceChildren(wrap);
    };
    render();
  }

  function renderTranslator(body) {
    const form = el("form", "mobile-translator");
    const input = document.createElement("textarea");
    input.rows = 7;
    input.placeholder = "输入需要翻译的内容…";
    const controls = el("div", "mobile-inline-actions");
    const target = document.createElement("select");
    [["zh-CN", "中文"], ["en", "英语"], ["ja", "日语"], ["ko", "韩语"], ["fr", "法语"], ["de", "德语"]].forEach(([value, label]) => {
      const option = document.createElement("option"); option.value = value; option.textContent = label; target.appendChild(option);
    });
    const submit = el("button", "mobile-primary-button", "翻译"); submit.type = "submit";
    controls.append(target, submit);
    const output = el("div", "mobile-translation-output", "译文将在这里显示");
    const copy = el("button", "action-btn", "复制译文"); copy.type = "button";
    copy.addEventListener("click", () => navigator.clipboard?.writeText(output.textContent || "").then(() => toast("已复制译文")));
    form.append(input, controls, output, copy);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!input.value.trim()) return;
      submit.disabled = true; output.textContent = "翻译中…";
      try {
        const response = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: input.value, target: target.value }) });
        const data = await response.json();
        if (!response.ok || !data.ok) throw new Error(data.error || "翻译失败");
        output.textContent = data.translated;
      } catch (error) { output.textContent = `翻译失败：${error.message}`; }
      finally { submit.disabled = false; }
    });
    body.replaceChildren(form);
  }

  async function renderGitHub(body) {
    const response = await fetch("/api/github/stars");
    const data = await response.json();
    if (!response.ok || !Array.isArray(data)) throw new Error(data.error || "GitHub 配置尚未同步");
    renderList(body, data, "暂无 Star 仓库");
  }

  function renderCacheTool(tool, body) {
    const keys = CACHE_TOOL_KEYS[tool.id] || [];
    let found = [];
    let source = "";
    for (const key of keys) {
      const value = readJson(key, null);
      const items = normalizeArray(value);
      if (items.length) { found = items; source = key; break; }
    }
    if (!found.length) {
      const box = el("div", "mobile-tool-empty");
      box.append(el("b", "", "电脑端缓存尚未同步"), el("p", "", "在电脑插件中打开一次该模块，再点击“一键同步到手机”，这里会显示最近缓存。"));
      const external = externalLinkFor(tool.id);
      if (external) {
        const button = el("button", "mobile-primary-button", "先打开网页版 ↗");
        button.addEventListener("click", () => safeOpen(external));
        box.appendChild(button);
      }
      body.replaceChildren(box);
      return;
    }
    renderList(body, found, "暂无缓存内容");
    body.prepend(el("p", "mobile-tool-note", `来自电脑同步缓存：${source}`));
  }

  function renderBookmarks(body) {
    const links = normalizeArray(readJson("customLaunchers", null)).concat(normalizeArray(readJson("quickLinks", null)));
    renderList(body, links, "尚未同步快捷入口");
  }

  function renderWallpaper(body) {
    const wrap = el("div", "mobile-wallpaper-options");
    const colors = [
      ["深空", "linear-gradient(145deg,#090d18,#18294a)"],
      ["孤星", "linear-gradient(145deg,#0f172a,#123f4d,#d6a523)"],
      ["终末地", "linear-gradient(145deg,#171717,#5c501e,#d8a523)"],
      ["纯白", "linear-gradient(145deg,#f8fafc,#dbeafe)"]
    ];
    colors.forEach(([name, background]) => {
      const button = el("button", "mobile-wallpaper-swatch", name);
      button.style.background = background;
      button.addEventListener("click", () => {
        document.body.style.background = background;
        localStorage.setItem("mobileCustomBackground", background);
        toast(`已应用 ${name} 壁纸`);
      });
      wrap.appendChild(button);
    });
    body.replaceChildren(wrap, el("p", "mobile-tool-note", "电脑端 IndexedDB 壁纸文件不能直接跨到手机网页；移动端先提供独立主题，后续可增加上传同步。"));
  }

  async function renderMonitor(body) {
    const checks = [
      ["配置同步池", "/api/sync-pull"],
      ["Todoist", "/api/todoist/tasks"],
      ["GitHub", "/api/github/stars"]
    ];
    const mid = readJson("biliUserMid", "") || "";
    if (mid) checks.splice(1, 0, ["B站收藏", `/api/bili/folders?mid=${encodeURIComponent(mid)}`]);
    const list = el("div", "mobile-status-list");
    await Promise.all(checks.map(async ([name, url]) => {
      const row = el("div", "mobile-status-row");
      row.append(el("b", "", name), el("span", "pending", "检测中")); list.appendChild(row);
      try {
        const response = await fetch(url);
        const badge = row.querySelector("span"); badge.className = response.ok ? "online" : "offline"; badge.textContent = response.ok ? "在线" : `HTTP ${response.status}`;
      } catch { const badge = row.querySelector("span"); badge.className = "offline"; badge.textContent = "离线"; }
    }));
    body.replaceChildren(list, el("p", "mobile-tool-note", "手机通过 USB 调试的 adb reverse 访问电脑 8088 中继。"));
  }

  function renderSettings(body) {
    const readText = (key) => {
      const value = readJson(key, "");
      return typeof value === "string" ? value : "";
    };
    const form = el("form", "mobile-settings-form");
    const fields = [
      ["biliUserMid", "B站 UID（公开回退）", "text", "优先使用 B站页的本机登录读取私密收藏夹；UID 仅作未登录时回退"],
      ["todoistToken", "Todoist Token", "password", "独立 App 直连 Todoist 官方 API"],
      ["ghUser", "GitHub 用户名", "text", "无 Token 时读取公开 Star"],
      ["ghToken", "GitHub API Token", "password", "用于私有账号 Star；不会提交到仓库"],
      ["artificialAnalysisApiKey", "AI API Key", "password", "移动 AI 对话"],
      ["desktopBridgeUrl", "电脑桥接地址（可选）", "url", "仅电脑功能使用；推荐 Tailscale Serve HTTPS 地址"]
    ];
    fields.forEach(([key, labelText, type, hint]) => {
      const label = el("label", "mobile-setting-field");
      label.append(el("b", "", labelText));
      const input = document.createElement("input");
      input.name = key; input.type = type; input.value = readText(key); input.autocomplete = "off";
      input.placeholder = key === "desktopBridgeUrl" ? "https://电脑名.tailnet.ts.net" : "未配置";
      label.append(input, el("small", "", hint));
      form.appendChild(label);
    });
    const save = el("button", "mobile-primary-button", "保存 App 设置");
    save.type = "submit";
    form.appendChild(save);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      fields.forEach(([key]) => {
        const value = String(form.elements[key]?.value || "").trim();
        if (value) localStorage.setItem(key, JSON.stringify(value)); else localStorage.removeItem(key);
      });
      toast("App 设置已保存");
    });

    const bridgeNote = el("div", "mobile-bridge-note");
    bridgeNote.append(el("b", "", "🔗 电脑增强功能（可选 Tailscale）"), el("p", "", "Obsidian Vault、浏览器书签、桌面壁纸库、Native Host、n8n 客户端证书等必须连接电脑；Todoist、GitHub、B站公开收藏、翻译和手机本地功能不需要 Tailscale。"));
    const sync = el("button", "action-btn", "从电脑桥接同步缓存");
    sync.type = "button";
    sync.addEventListener("click", async () => {
      const result = await window.syncConfigFromComputer?.();
      toast(result?.ok ? `已同步 ${result.count} 项` : (result?.error || result?.message || "未连接电脑桥接"));
    });
    bridgeNote.appendChild(sync);
    body.replaceChildren(form, bridgeNote);
  }

  function externalLinkFor(id) {
    const configuredN8n = readJson("n8nUrl", "") || readJson("vpsUrl", "");
    return {
      youtube: "https://www.youtube.com/feed/subscriptions",
      books: "https://weread.qq.com/",
      music: "https://monster-siren.hypergryph.com/",
      n8n: configuredN8n || "https://n8n.io/",
      stickers: "https://www.bilibili.com/"
    }[id] || "";
  }

  function renderLinks(tool, body) {
    const box = el("div", "mobile-link-handoff");
    box.append(el("b", "", `${tool.title} 移动入口`), el("p", "", "该模块依赖电脑浏览器 Cookie、客户端证书或本地媒体能力；手机端保留安全跳转与同步缓存。"));
    const url = externalLinkFor(tool.id);
    const button = el("button", "mobile-primary-button", "打开服务 ↗");
    button.addEventListener("click", () => safeOpen(url));
    box.appendChild(button);
    body.replaceChildren(box);
  }

  async function renderTool(tool, body) {
    if (tool.mode === "route") { closeSheet(); window.mobileSwitchTab?.(tool.page); return; }
    if (tool.id === "calendar") return renderCalendar(body);
    if (tool.id === "translator") return renderTranslator(body);
    if (tool.id === "github") return renderGitHub(body);
    if (tool.id === "bookmarks") return renderBookmarks(body);
    if (tool.id === "wallpaper") return renderWallpaper(body);
    if (tool.id === "monitor") return renderMonitor(body);
    if (tool.id === "update") return window.LogicWeaverMobileUpdater?.render(body) || renderList(body, [], "更新组件正在初始化");
    if (tool.id === "settings") return renderSettings(body);
    if (tool.mode === "cache") return renderCacheTool(tool, body);
    return renderLinks(tool, body);
  }

  function activateTool(id) {
    const tool = TOOLS.find((item) => item.id === id);
    if (!tool) return;
    if (tool.mode === "route") window.mobileSwitchTab?.(tool.page);
    else openSheet(tool);
  }

  function renderTools(filter = "全部") {
    const grid = $("mobile-tool-grid");
    const filterHost = $("mobile-tool-filter");
    if (!grid || !filterHost) return;
    const groups = ["全部", "核心", "效率", "内容", "资料", "娱乐", "外观", "系统"];
    filterHost.replaceChildren(...groups.map((group) => {
      const button = el("button", `pill-btn${group === filter ? " active" : ""}`, group);
      button.type = "button";
      button.addEventListener("click", () => renderTools(group));
      return button;
    }));
    grid.innerHTML = "";
    TOOLS.filter((tool) => filter === "全部" || tool.group === filter).forEach((tool) => {
      const button = el("button", "mobile-tool-card");
      button.type = "button";
      button.append(el("span", "mobile-tool-icon", tool.icon));
      const copy = el("span", "mobile-tool-copy");
      copy.append(el("b", "", tool.title), el("small", "", tool.desc));
      const badgeText = tool.requiresBridge ? "需桥接" : (tool.mode === "native" || tool.mode === "route" ? "可用" : (tool.mode === "cache" ? "同步" : "接力"));
      button.append(copy, el("em", `mobile-tool-badge ${tool.requiresBridge ? "bridge" : tool.mode}`, badgeText));
      button.addEventListener("click", () => activateTool(tool.id));
      grid.appendChild(button);
    });
  }

  function initWheel() {
    const host = $("mobile-wheel");
    const ball = $("mobile-wheel-ball");
    const sectors = $("mobile-wheel-sectors");
    if (!host || !ball || !sectors) return;
    const items = [
      ["home", "🏠", "page-home"], ["bili", "📺", "page-media"], ["todo", "✅", "page-tasks"],
      ["notes", "📝", "page-notes"], ["ai", "✨", "page-ai"], ["tools", "🧰", "page-tools"], ["links", "🔗", "bookmarks"]
    ];
    items.forEach(([id, icon, target], index) => {
      const angle = (-90 + (360 / items.length) * index) * Math.PI / 180;
      const button = el("button", "mobile-wheel-sector", icon);
      button.type = "button"; button.dataset.id = id;
      button.style.setProperty("--wheel-x", `${Math.cos(angle) * 92}px`);
      button.style.setProperty("--wheel-y", `${Math.sin(angle) * 92}px`);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        host.classList.remove("expanded"); ball.setAttribute("aria-expanded", "false");
        if (target.startsWith("page-")) window.mobileSwitchTab?.(target); else activateTool(target);
      });
      sectors.appendChild(button);
    });

    let dragging = false, moved = false, startX = 0, startY = 0, originX = 0, originY = 0;
    const saved = readJson("mobileWheelPosition", null);
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      host.style.left = `${saved.x}px`; host.style.top = `${saved.y}px`; host.style.right = "auto"; host.style.bottom = "auto";
    }
    ball.addEventListener("pointerdown", (event) => {
      dragging = true; moved = false; startX = event.clientX; startY = event.clientY;
      const rect = host.getBoundingClientRect(); originX = rect.left; originY = rect.top;
      ball.setPointerCapture(event.pointerId);
    });
    ball.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const dx = event.clientX - startX, dy = event.clientY - startY;
      if (Math.hypot(dx, dy) < 5) return;
      moved = true;
      const x = Math.max(8, Math.min(innerWidth - 58, originX + dx));
      const y = Math.max(8, Math.min(innerHeight - 120, originY + dy));
      host.style.left = `${x}px`; host.style.top = `${y}px`; host.style.right = "auto"; host.style.bottom = "auto";
    });
    ball.addEventListener("pointerup", () => {
      dragging = false;
      if (moved) {
        const rect = host.getBoundingClientRect();
        localStorage.setItem("mobileWheelPosition", JSON.stringify({ x: rect.left, y: rect.top }));
        return;
      }
      const expanded = host.classList.toggle("expanded");
      if (expanded) {
        const rect = host.getBoundingClientRect();
        const safeX = Math.max(90, Math.min(innerWidth - 145, rect.left));
        const safeY = Math.max(90, Math.min(innerHeight - 210, rect.top));
        host.style.left = `${safeX}px`; host.style.top = `${safeY}px`;
        host.style.right = "auto"; host.style.bottom = "auto";
        localStorage.setItem("mobileWheelPosition", JSON.stringify({ x: safeX, y: safeY }));
      }
      ball.setAttribute("aria-expanded", String(expanded));
    });
    document.addEventListener("click", (event) => {
      if (!host.contains(event.target)) { host.classList.remove("expanded"); ball.setAttribute("aria-expanded", "false"); }
    });
  }

  $("mobile-tool-sheet-close")?.addEventListener("click", closeSheet);
  $("mobile-update-btn")?.addEventListener("click", () => activateTool("update"));
  $("mobile-tool-sheet")?.addEventListener("click", (event) => { if (event.target.id === "mobile-tool-sheet") closeSheet(); });
  $("mobile-tools-sync-btn")?.addEventListener("click", async () => {
    const result = await window.syncConfigFromComputer?.();
    toast(result?.ok ? `已同步 ${result.count} 项电脑配置` : (result?.error || result?.message || "同步失败"));
    renderTools();
  });

  const savedBackground = localStorage.getItem("mobileCustomBackground");
  if (savedBackground) document.body.style.background = savedBackground;
  renderTools();
  initWheel();
  window.LogicWeaverMobileTools = { open: activateTool, render: renderTools };
})();
