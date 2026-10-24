"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  function toast(msg, ms = 2200) {
    const el = document.getElementById("mobile-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove("show"), ms);
  }
  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c] || c));
  }

  // ================= 1. 黑夜 / 白天主题切换引擎 =================
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeToggleIcon = document.getElementById("theme-toggle-icon");
  const themeToggleText = document.getElementById("theme-toggle-text");
  const metaThemeColor = document.getElementById("meta-theme-color");

  function applyTheme(themeName) {
    const isLight = themeName === "light";
    document.body.classList.toggle("theme-light", isLight);
    document.body.classList.toggle("theme-dark", !isLight);
    if (themeToggleIcon) themeToggleIcon.textContent = isLight ? "🌙" : "☀️";
    if (themeToggleText) themeToggleText.textContent = isLight ? "夜间" : "日间";
    if (metaThemeColor) metaThemeColor.content = isLight ? "#f3f4f6" : "#0b0f19";
    localStorage.setItem("mobileThemePreference", themeName);
  }

  const savedTheme = localStorage.getItem("mobileThemePreference") || "dark";
  applyTheme(savedTheme);

  themeToggleBtn?.addEventListener("click", () => {
    const current = document.body.classList.contains("theme-light") ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    toast(next === "light" ? "☀️ 已切换为白昼明亮模式" : "🌙 已切换为极客暗夜模式");
  });

  // ================= 2. 状态栏时钟 =================
  function tickClock() {
    const now = new Date();
    const timeText = document.getElementById("top-time-text");
    if (timeText) timeText.textContent = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ================= 3. 底部导航切换 =================
  const navBtns = document.querySelectorAll(".nav-tab-btn");
  const pages = document.querySelectorAll(".mobile-page");

  function switchTab(pageId) {
    navBtns.forEach((b) => b.classList.toggle("active", b.dataset.page === pageId));
    pages.forEach((p) => p.classList.toggle("active", p.id === pageId));
  }
  window.mobileSwitchTab = switchTab;

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.page));
  });

  document.getElementById("top-bili-pill")?.addEventListener("click", () => switchTab("page-media"));
  document.getElementById("home-goto-bili-fav")?.addEventListener("click", () => switchTab("page-media"));
  document.getElementById("home-open-tasks-btn")?.addEventListener("click", () => switchTab("page-tasks"));

  // ================= 4. 搜索框 =================
  const searchInput = document.getElementById("mobile-search-input");
  const searchGo = document.getElementById("mobile-search-go");
  function executeSearch() {
    const q = searchInput?.value.trim();
    if (!q) return;
    if (q.startsWith("http://") || q.startsWith("https://")) {
      window.open(q, "_blank");
    } else {
      window.open(`https://search.bilibili.com/all?keyword=${encodeURIComponent(q)}`, "_blank");
    }
  }
  searchGo?.addEventListener("click", executeSearch);
  searchInput?.addEventListener("keydown", (e) => { if (e.key === "Enter") executeSearch(); });

  // ================= 5. 一键电脑过继配置 =================
  const syncBtn = document.getElementById("top-sync-pill");
  syncBtn?.addEventListener("click", async () => {
    toast("正在从电脑拉取配置…");
    if (typeof window.syncConfigFromComputer === "function") {
      const res = await window.syncConfigFromComputer();
      if (res.ok) {
        toast(`✓ 成功过继 ${res.count} 项配置！`);
        renderLauncher();
        loadBiliFavorites();
        loadTodoistTasks();
      } else {
        toast(res.error || res.message || "请先在电脑插件选项页点击一键同步");
      }
    }
  });

  window.addEventListener("mobile-config-synced", (e) => {
    console.log("[Mobile] 收到电脑端配置同步广播，正在刷新界面数据…");
    const detail = e?.detail || {};
    if (detail.biliUserMid) userBiliMid = String(detail.biliUserMid).replace(/^"|"$/g, "").trim();
    renderLauncher();
    loadBiliFavorites();
    loadTodoistTasks();
  });

  // ================= 6. B站收藏夹核心模块 (重点打造) =================
  // 结构预置 + 模拟/真实结合收藏夹
  let currentActiveFolderId = "default";
  let biliFolderLoadSequence = 0;
  let userBiliMid = localStorage.getItem("biliUserMid") || "";

  let biliFavFolders = [
    {
      id: "default",
      name: "默认收藏夹",
      count: 6,
      medias: [
        { bvid: "BV1GJ411x7h7", title: "【明日方舟】塞壬唱片 MSR 概念现场新曲精选", upper: "塞壬唱片-MSR", play: "54.2万", duration: "03:45", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80" },
        { bvid: "BV1xx411c7mD", title: "2026 前端全栈开发指南：从 Chrome 扩展到手机 App", upper: "极客工作流", play: "19.5万", duration: "14:20", cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80" },
        { bvid: "BV1b54y1d7Vn", title: "真我 Neo 极客玩法：Termux 与 Scrcpy 超深度实战", upper: "数码探索者", play: "9.8万", duration: "09:12", cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80" }
      ]
    },
    {
      id: "tech",
      name: "💻 编程与开源技术",
      count: 4,
      medias: [
        { bvid: "BV1ys411F7wN", title: "效率翻倍！如何打造自己的跨平台个人信息中枢", upper: "高效学习社", play: "24.1万", duration: "11:05", cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
        { bvid: "BV17x411w7KC", title: "Gemini 2.0 与本地大模型自动化工作流深度对比", upper: "AI前沿速报", play: "31.2万", duration: "16:42", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" }
      ]
    },
    {
      id: "music",
      name: "🎵 音乐与电台",
      count: 3,
      medias: [
        { bvid: "BV1pJ411L73A", title: "Limbus Company 边狱公司战斗原声 OST 纯享版", upper: "ProjectMoon", play: "42.0万", duration: "25:30", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80" }
      ]
    }
  ];

  function readStoredJson(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function renderBiliGroupTree() {
    const host = document.getElementById("mobile-bili-group-tree");
    if (!host) return;
    const tree = readStoredJson("foTree", null);
    const folderMap = new Map(biliFavFolders.map((folder) => [String(folder.id), folder]));
    if (!tree?.children?.length) {
      host.hidden = true;
      host.innerHTML = "";
      return;
    }

    const makeFolderButton = (node) => {
      const folder = folderMap.get(String(node.id));
      if (!folder) return null;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mobile-group-folder${String(folder.id) === String(currentActiveFolderId) ? " active" : ""}`;
      button.textContent = `${folder.name} · ${folder.count || 0}`;
      button.addEventListener("click", () => {
        currentActiveFolderId = String(folder.id);
        renderBiliFavoritesUI();
        fetchFolderVideos(folder.id);
      });
      return button;
    };

    const makeGroup = (node, depth = 0) => {
      const section = document.createElement("section");
      section.className = "mobile-bili-group";
      section.style.setProperty("--group-depth", String(depth));
      const head = document.createElement("button");
      head.type = "button";
      head.className = "mobile-bili-group-head";
      head.innerHTML = `<span>⌄</span><b></b>`;
      head.querySelector("b").textContent = node.name || "未命名分组";
      const body = document.createElement("div");
      body.className = "mobile-bili-group-body";
      (node.children || []).forEach((child) => {
        const element = child.type === "folder" ? makeGroup(child, depth + 1) : makeFolderButton(child);
        if (element) body.appendChild(element);
      });
      head.addEventListener("click", () => {
        const collapsed = body.hidden;
        body.hidden = !collapsed;
        head.querySelector("span").textContent = collapsed ? "⌄" : "›";
      });
      section.append(head, body);
      return section;
    };

    host.innerHTML = "";
    tree.children.filter((node) => node.type === "folder").forEach((node) => host.appendChild(makeGroup(node)));
    host.hidden = !host.children.length;
  }

  async function loadBiliComments(bvid) {
    const list = document.getElementById("mobile-bili-comments-list");
    const count = document.getElementById("mobile-comments-count");
    if (!list) return;
    list.innerHTML = '<div class="mobile-empty-hint">正在加载评论…</div>';
    if (count) count.textContent = "";
    try {
      const response = await fetch(`/api/bili/comments?bvid=${encodeURIComponent(bvid)}`);
      const payload = await response.json();
      if (!response.ok || payload?.code !== 0) throw new Error(payload?.message || `HTTP ${response.status}`);
      const replies = payload?.data?.replies || [];
      const total = payload?.data?.page?.count;
      if (count) count.textContent = Number.isFinite(total) ? `${total} 条` : `${replies.length} 条热门评论`;
      list.innerHTML = "";
      if (!replies.length) {
        list.innerHTML = '<div class="mobile-empty-hint">暂无评论</div>';
        return;
      }
      replies.forEach((reply) => {
        const item = document.createElement("article");
        item.className = "mobile-comment-item";
        const head = document.createElement("div");
        head.className = "mobile-comment-meta";
        const author = document.createElement("b");
        author.textContent = reply?.member?.uname || "B站用户";
        const stats = document.createElement("small");
        stats.textContent = `👍 ${reply?.like || 0}${reply?.rcount ? ` · ${reply.rcount} 回复` : ""}`;
        head.append(author, stats);
        const message = document.createElement("p");
        message.textContent = reply?.content?.message || "";
        item.append(head, message);
        list.appendChild(item);
      });
    } catch (error) {
      list.innerHTML = "";
      const message = document.createElement("div");
      message.className = "mobile-empty-hint";
      message.textContent = `评论加载失败：${error.message}`;
      list.appendChild(message);
    }
  }

  function openBiliTheater(video) {
    const overlay = document.getElementById("mobile-bili-theater");
    const frame = document.getElementById("mobile-bili-player");
    const title = document.getElementById("mobile-theater-title");
    const meta = document.getElementById("mobile-theater-meta");
    const external = document.getElementById("mobile-theater-external");
    if (!overlay || !frame || !video?.bvid) return;
    title.textContent = video.title || "B站视频";
    meta.textContent = video.upper || "";
    external.href = `https://www.bilibili.com/video/${video.bvid}`;
    frame.src = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(video.bvid)}&page=1&high_quality=1&autoplay=1`;
    overlay.hidden = false;
    loadBiliComments(video.bvid);
  }

  const closeBiliTheater = () => {
    const overlay = document.getElementById("mobile-bili-theater");
    const frame = document.getElementById("mobile-bili-player");
    if (frame) frame.src = "about:blank";
    const comments = document.getElementById("mobile-bili-comments-list");
    if (comments) comments.replaceChildren();
    if (overlay) overlay.hidden = true;
  };
  document.getElementById("mobile-theater-close")?.addEventListener("click", closeBiliTheater);
  document.getElementById("mobile-bili-theater")?.addEventListener("click", (event) => {
    if (event.target.id === "mobile-bili-theater") closeBiliTheater();
  });

  // 渲染收藏夹药丸与卡片
  function renderBiliFavoritesUI() {
    const homeChips = document.getElementById("home-fav-folders-chips");
    const fullChips = document.getElementById("bili-full-folders-bar");
    const homeList = document.getElementById("home-fav-videos-list");
    const fullGrid = document.getElementById("bili-full-fav-grid");
    const topCountBadge = document.getElementById("top-bili-count");

    // 计算总数
    const totalCount = biliFavFolders.reduce((sum, f) => sum + (f.count || f.medias?.length || 0), 0);
    if (topCountBadge) topCountBadge.textContent = `${totalCount}篇`;

    // 渲染药丸
    const createChip = (folder) => {
      const btn = document.createElement("button");
      btn.className = `fav-folder-chip${folder.id === currentActiveFolderId ? " active" : ""}`;
      btn.innerHTML = `<span>${folder.name}</span><span class="fav-count-badge">${folder.medias?.length || folder.count}</span>`;
      btn.addEventListener("click", () => {
        currentActiveFolderId = folder.id;
        renderBiliFavoritesUI();
        if (!folder.medias || !folder.medias.length) {
          fetchFolderVideos(folder.id);
        }
      });
      return btn;
    };

    if (homeChips) {
      homeChips.innerHTML = "";
      biliFavFolders.forEach((f) => homeChips.appendChild(createChip(f)));
    }
    if (fullChips) {
      fullChips.innerHTML = "";
      biliFavFolders.forEach((f) => fullChips.appendChild(createChip(f)));
    }

    // 获取当前激活文件夹的视频
    const activeFolder = biliFavFolders.find((f) => f.id === currentActiveFolderId) || biliFavFolders[0];
    const medias = activeFolder?.medias || [];

    // 卡片生成器
    const createFavCard = (video) => {
      const card = document.createElement("article");
      card.className = "bili-fav-card";
      card.innerHTML = `
        <div class="bili-fav-thumb-box">
          <img src="${escapeHtml(video.cover)}" alt="" loading="lazy" referrerpolicy="no-referrer" />
          <span class="bili-fav-duration">${escapeHtml(video.duration || "00:00")}</span>
        </div>
        <div class="bili-fav-details">
          <div class="bili-fav-title">${escapeHtml(video.title)}</div>
          <div class="bili-fav-meta-row">
            <span>${escapeHtml(video.upper || "UP主")}</span>
            <span class="bili-fav-play-tag">▶ 播放</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => openBiliTheater(video));
      return card;
    };

    if (homeList) {
      homeList.innerHTML = "";
      if (!medias.length) {
        homeList.innerHTML = '<div class="mobile-empty-hint">正在拉取收藏夹视频或暂无视频…</div>';
      } else {
        medias.slice(0, 8).forEach((v) => homeList.appendChild(createFavCard(v)));
      }
    }

    if (fullGrid) {
      fullGrid.innerHTML = "";
      if (!medias.length) {
        fullGrid.innerHTML = '<div class="mobile-empty-hint">正在拉取收藏夹视频或暂无视频…</div>';
      } else {
        medias.forEach((v) => fullGrid.appendChild(createFavCard(v)));
      }
    }
    renderBiliGroupTree();
  }

  // 尝试拉取线上/过继数据并动态抓取视频
  async function fetchFolderVideos(folderId) {
    if (!folderId || folderId === "default" || folderId === "tech" || folderId === "music") return;
    const sequence = ++biliFolderLoadSequence;
    const target = biliFavFolders.find((f) => String(f.id) === String(folderId));
    if (!target) return;
    const collected = [];
    const expectedPages = Math.max(1, Math.ceil(Number(target.count || 0) / 20));
    try {
      for (let page = 1; page <= Math.min(expectedPages, 100); page++) {
        const res = await fetch(`/api/bili/folder-items?id=${folderId}&pn=${page}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const medias = json?.data?.medias || [];
        collected.push(...medias);
        if (sequence !== biliFolderLoadSequence) return;
        target.medias = collected.map((m) => {
          const min = Math.floor((m.duration || 0) / 60);
          const sec = (m.duration || 0) % 60;
          return {
            aid: m.id || m.aid || 0,
            bvid: m.bvid,
            title: m.title || "无标题视频",
            upper: m.upper?.name || "B站UP主",
            play: m.cnt_info?.play ? (m.cnt_info.play > 10000 ? (m.cnt_info.play / 10000).toFixed(1) + "万" : m.cnt_info.play) : "播放",
            duration: `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`,
            cover: m.cover
              ? (window.LogicWeaverMobileRuntime?.isNative
                ? String(m.cover).replace(/^http:/, "https:")
                : `/api/bili/cover?url=${encodeURIComponent(String(m.cover).replace(/^http:/, "https:"))}`)
              : ""
          };
        });
        renderBiliFavoritesUI();
        if (!json?.data?.has_more || medias.length < 20) break;
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    } catch (e) {
      console.warn("[BiliMobile] 抓取收藏夹视频失败:", e);
      toast(`收藏夹已加载 ${collected.length} 条，继续加载失败`);
    }
  }

  async function loadBiliFavorites() {
    // App 登录后优先使用本机 WebView Cookie，可读取账号自己的私密收藏夹。
    const auth = window.Capacitor?.Plugins?.BilibiliAuth;
    const loginButton = document.getElementById("bili-uid-setting-btn");
    if (auth?.getStatus) {
      try {
        const status = await auth.getStatus();
        if (loginButton) loginButton.textContent = status.loggedIn ? "已登录" : "登录";
        if (status.loggedIn) {
          if (status.uid) {
            userBiliMid = String(status.uid);
            localStorage.setItem("biliUserMid", JSON.stringify(userBiliMid));
          }
          const res = await fetch(`/api/bili/folders?mid=${encodeURIComponent(status.uid || userBiliMid)}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const list = json?.data?.list || [];
          biliFavFolders = list.map((f) => ({
            id: String(f.id),
            name: f.title,
            count: f.media_count,
            medias: []
          }));
          if (biliFavFolders.length) {
            currentActiveFolderId = biliFavFolders[0].id;
            renderBiliFavoritesUI();
            fetchFolderVideos(currentActiveFolderId);
            return;
          }
        }
      } catch (error) {
        console.warn("[BiliMobile] 登录态收藏夹读取失败，回退到缓存/公开接口:", error);
      }
    }

    // 1. 优先检查本地/过继是否有 biliFoldersCache
    try {
      const cachedFoldersRaw = localStorage.getItem("biliFoldersCache");
      let realFolders = [];
      if (cachedFoldersRaw) {
        try { realFolders = JSON.parse(cachedFoldersRaw); } catch {}
      }
      if (Array.isArray(realFolders) && realFolders.length) {
        biliFavFolders = realFolders.map((f) => ({
          id: String(f.id),
          name: f.title || "收藏夹",
          count: f.media_count || 0,
          medias: []
        }));
        currentActiveFolderId = biliFavFolders[0].id;
        renderBiliFavoritesUI();
        fetchFolderVideos(currentActiveFolderId);
        return;
      }
    } catch {}

    // 2. 检查是否有绑定的 UID，如有则通过服务端代理获取收藏夹列表
    let mid = userBiliMid || localStorage.getItem("biliUserMid") || "";
    if (typeof mid === "string") {
      try { mid = JSON.parse(mid); } catch {}
      mid = String(mid).replace(/^"|"$/g, "").trim();
    }
    if (mid) {
      try {
        const res = await fetch(`/api/bili/folders?mid=${encodeURIComponent(mid)}`);
        if (res.ok) {
          const json = await res.json();
          const list = json?.data?.list || [];
          if (list.length) {
            biliFavFolders = list.map((f) => ({
              id: String(f.id),
              name: f.title,
              count: f.media_count,
              medias: []
            }));
            currentActiveFolderId = biliFavFolders[0].id;
            renderBiliFavoritesUI();
            fetchFolderVideos(currentActiveFolderId);
            return;
          }
        }
      } catch (e) {
        console.warn("[BiliMobile] 通过UID拉取收藏夹失败:", e);
      }
    }

    renderBiliFavoritesUI();
  }
  loadBiliFavorites();

  document.getElementById("bili-fav-refresh-btn")?.addEventListener("click", () => {
    toast("正在刷新收藏夹与视频…");
    loadBiliFavorites();
    if (currentActiveFolderId) fetchFolderVideos(currentActiveFolderId);
  });

  // App 内登录的 Cookie 仅保存在 Android WebView；浏览器预览继续支持公开 UID。
  document.getElementById("bili-uid-setting-btn")?.addEventListener("click", async () => {
    const auth = window.Capacitor?.Plugins?.BilibiliAuth;
    if (auth?.openLogin) {
      try {
        const result = await auth.openLogin();
        if (result.loggedIn) {
          toast("B站登录成功，正在读取完整收藏夹…");
          await loadBiliFavorites();
        } else {
          toast("尚未完成 B站登录");
        }
      } catch (error) {
        toast(`B站登录失败：${error.message}`);
      }
      return;
    }
    const input = prompt("请输入你的 B站 用户 UID（仅能读取公开收藏夹）：", userBiliMid);
    if (input !== null) {
      userBiliMid = input.trim();
      localStorage.setItem("biliUserMid", JSON.stringify(userBiliMid));
      toast(userBiliMid ? `已绑定 B站 UID: ${userBiliMid}` : "已清空 B站 UID");
      loadBiliFavorites();
    }
  });

  // ================= 7. 常用网站磁贴 (支持多分区) =================
  let currentLauncherCategory = "常用网站";
  const shelfTabs = document.querySelectorAll(".shelf-tab");
  shelfTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      shelfTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentLauncherCategory = tab.dataset.page || "常用网站";
      renderLauncher();
    });
  });

  function renderLauncher() {
    const grid = document.getElementById("home-launcher-grid");
    if (!grid) return;
    grid.innerHTML = "";

    let allLinks = [];
    try {
      const stored = localStorage.getItem("customLaunchers") || localStorage.getItem("launchers");
      if (stored) allLinks = JSON.parse(stored);
    } catch {}

    if (!Array.isArray(allLinks) || !allLinks.length) {
      allLinks = [
        { title: "B站", url: "https://bilibili.com", icon: "📺", group: "常用网站" },
        { title: "GitHub", url: "https://github.com", icon: "🐙", group: "常用网站" },
        { title: "Linux.do", url: "https://linux.do", icon: "🐧", group: "常用网站" },
        { title: "Gmail", url: "https://mail.google.com", icon: "✉️", group: "常用网站" },
        { title: "DeepSeek", url: "https://chat.deepseek.com", icon: "🐳", group: "工作学习" },
        { title: "Claude", url: "https://claude.ai", icon: "🤖", group: "工作学习" },
        { title: "YouTube", url: "https://youtube.com", icon: "▶️", group: "娱乐摸鱼" },
        { title: "小黑盒", url: "https://xiaoheihe.cn", icon: "🎮", group: "娱乐摸鱼" }
      ];
    }

    const filtered = allLinks.filter((it) => {
      if (currentLauncherCategory === "常用网站") return !it.group || it.group === "常用网站";
      return it.group === currentLauncherCategory;
    });

    const displayItems = filtered.length ? filtered : allLinks.slice(0, 8);

    displayItems.forEach((item) => {
      const a = document.createElement("a");
      a.className = "launcher-item";
      a.href = item.url || "#";
      a.target = "_blank";
      a.rel = "noreferrer";

      const iconHtml = item.favicon || item.iconUrl
        ? `<img src="${item.favicon || item.iconUrl}" alt="" />`
        : (item.icon || "🌐");

      a.innerHTML = `<div class="launcher-icon">${iconHtml}</div><span class="launcher-name">${item.title || "快捷方式"}</span>`;
      grid.appendChild(a);
    });
  }
  renderLauncher();

  // ================= 8. Todoist 待办模块 =================
  let currentTaskFilter = "today";
  let todoCalendarCursor = new Date();
  let todoCalendarSelectedDate = new Date().toLocaleDateString("sv-SE");
  const taskFilterPills = document.querySelectorAll(".filter-pill-bar .pill-btn");
  taskFilterPills.forEach((btn) => {
    btn.addEventListener("click", () => {
      taskFilterPills.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentTaskFilter = btn.dataset.filter || "today";
      renderTasksUI();
    });
  });

  let cachedTasks = [];

  function getTodoistToken() {
    try {
      let raw = localStorage.getItem("todoistToken");
      if (!raw) return "";
      try { raw = JSON.parse(raw); } catch {}
      return typeof raw === "string" ? raw.replace(/^"|"$/g, "").trim() : String(raw || "").trim();
    } catch { return ""; }
  }

  function syncTodoistWidget() {
    const widget = window.Capacitor?.Plugins?.HomeWidget;
    if (!widget?.updateTasks) return;
    const active = cachedTasks.filter((task) => !task.is_completed && !task.checked).slice(0, 8).map((task) => ({
      content: task.content || "未命名任务",
      due: task.due?.datetime || task.due?.date || "",
      recurring: Boolean(task.due?.is_recurring)
    }));
    widget.updateTasks({ payload: JSON.stringify(active) }).catch(() => {});
  }

  async function loadTodoistTasks() {
    const token = getTodoistToken();
    try {
      // 优先通过中继代理获取最新 /api/v1/tasks 任务，避开手机跨域限制与 v2 废弃 410 错误
      const res = await fetch("/api/todoist/tasks", {
        headers: token ? { "Authorization": `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const payload = await res.json();
        const apiTasks = Array.isArray(payload)
          ? payload
          : (Array.isArray(payload?.results) ? payload.results : []);
        if (apiTasks.length) {
          cachedTasks = apiTasks;
          renderTasksUI();
          syncTodoistWidget();
          return;
        }
      }
    } catch (err) {
      console.warn("Todoist proxy load fallback:", err);
    }

    // 备用直连 (v1)
    if (token) {
      try {
        const res = await fetch("https://api.todoist.com/api/v1/tasks", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const payload = await res.json();
          const apiTasks = Array.isArray(payload)
            ? payload
            : (Array.isArray(payload?.results) ? payload.results : []);
          if (apiTasks.length) cachedTasks = apiTasks;
        }
      } catch (err) {
        console.warn("Todoist direct load fallback:", err);
      }
    }
    renderTasksUI();
    syncTodoistWidget();
  }

  function taskDueDate(task) {
    return String(task?.due?.datetime || task?.due?.date || "").slice(0, 10);
  }

  function renderTodoistCalendar() {
    const host = document.getElementById("todoist-inline-calendar");
    if (!host) return;
    host.hidden = currentTaskFilter !== "calendar";
    if (host.hidden) return;
    const year = todoCalendarCursor.getFullYear();
    const month = todoCalendarCursor.getMonth();
    const first = new Date(year, month, 1);
    const days = new Date(year, month + 1, 0).getDate();
    const dueMap = new Map();
    cachedTasks.forEach((task) => {
      const date = taskDueDate(task);
      if (!date) return;
      if (!dueMap.has(date)) dueMap.set(date, []);
      dueMap.get(date).push(task);
    });
    host.innerHTML = "";
    const head = document.createElement("div");
    head.className = "mobile-calendar-head";
    const prev = document.createElement("button");
    prev.type = "button"; prev.className = "action-btn"; prev.textContent = "‹";
    const label = document.createElement("b");
    label.textContent = `${year} 年 ${month + 1} 月`;
    const next = document.createElement("button");
    next.type = "button"; next.className = "action-btn"; next.textContent = "›";
    prev.addEventListener("click", () => { todoCalendarCursor = new Date(year, month - 1, 1); renderTasksUI(); });
    next.addEventListener("click", () => { todoCalendarCursor = new Date(year, month + 1, 1); renderTasksUI(); });
    head.append(prev, label, next);
    const grid = document.createElement("div");
    grid.className = "mobile-calendar-grid";
    ["日", "一", "二", "三", "四", "五", "六"].forEach((day) => {
      const item = document.createElement("span"); item.className = "mobile-calendar-week"; item.textContent = day; grid.appendChild(item);
    });
    for (let index = 0; index < first.getDay(); index++) {
      const blank = document.createElement("span"); blank.className = "mobile-calendar-day blank"; grid.appendChild(blank);
    }
    for (let day = 1; day <= days; day++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const tasks = dueMap.get(key) || [];
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mobile-calendar-day${tasks.length ? " has-task" : ""}${key === todoCalendarSelectedDate ? " selected" : ""}`;
      button.textContent = String(day);
      if (tasks.length) { const badge = document.createElement("small"); badge.textContent = String(tasks.length); button.appendChild(badge); }
      button.addEventListener("click", () => { todoCalendarSelectedDate = key; renderTasksUI(); });
      grid.appendChild(button);
    }
    host.append(head, grid);
  }

  function renderTasksUI() {
    const homeBox = document.getElementById("home-tasks-list");
    const fullBox = document.getElementById("tasks-full-list");

    renderTodoistCalendar();
    const filtered = cachedTasks.filter((t) => {
      if (currentTaskFilter === "calendar") return taskDueDate(t) === todoCalendarSelectedDate;
      if (currentTaskFilter === "today") {
        const todayStr = new Date().toLocaleDateString("sv-SE");
        return taskDueDate(t) === todayStr || t.due?.string?.toLowerCase()?.includes("today");
      }
      if (currentTaskFilter === "inbox") return !t.project_id || t.project_id === "inbox";
      return true;
    });

    const buildTaskRow = (task) => {
      const row = document.createElement("div");
      row.className = `todo-item-row${task.is_completed || task.checked ? " done" : ""}`;
      const pCls = task.priority === 4 ? "p1" : task.priority === 3 ? "p2" : task.priority === 2 ? "p3" : "p4";
      const check = document.createElement("button");
      check.type = "button"; check.className = `todo-check-btn ${pCls}`;
      const copy = document.createElement("span");
      copy.className = "todo-copy";
      const text = document.createElement("span");
      text.className = "todo-text"; text.textContent = task.content || "未命名任务";
      const meta = document.createElement("small");
      meta.className = "todo-due-meta";
      const dueValue = task.due?.datetime || task.due?.date || "";
      const dueDate = taskDueDate(task);
      const dueTime = task.due?.datetime ? new Date(task.due.datetime).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) : "";
      const today = new Date().toLocaleDateString("sv-SE");
      const parts = [];
      if (dueDate) parts.push(dueDate === today ? "今天" : dueDate);
      if (dueTime) parts.push(`⏰ ${dueTime}`);
      if (task.due?.is_recurring) parts.push(`🔁 ${task.due?.string || "循环"}`);
      meta.textContent = parts.join(" · ");
      copy.append(text);
      if (dueValue || task.due?.is_recurring) copy.append(meta);
      row.append(check, copy);

      row.querySelector(".todo-check-btn")?.addEventListener("click", async () => {
        task.is_completed = !task.is_completed;
        row.classList.toggle("done", task.is_completed);
        const token = getTodoistToken();
        if (task.is_completed && !String(task.id).startsWith("temp_")) {
          fetch(`/api/todoist/close/${task.id}`, {
            method: "POST",
            headers: token ? { "Authorization": `Bearer ${token}` } : {}
          }).catch(() => {});
        }
        toast(task.is_completed ? (task.due?.is_recurring ? "✓ 本次已完成，下一周期将自动生成" : "✓ 任务已完成") : "已重新打开");
        syncTodoistWidget();
        if (task.is_completed && task.due?.is_recurring) setTimeout(loadTodoistTasks, 900);
      });
      return row;
    };

    if (homeBox) {
      homeBox.innerHTML = "";
      const todayList = cachedTasks.filter((t) => !t.is_completed && !t.checked).slice(0, 5);
      if (!todayList.length) homeBox.innerHTML = '<div class="mobile-empty-hint">暂无待办任务 🎉</div>';
      else todayList.forEach((t) => homeBox.appendChild(buildTaskRow(t)));
    }

    if (fullBox) {
      fullBox.innerHTML = "";
      if (!filtered.length) fullBox.innerHTML = `<div class="mobile-empty-hint">${currentTaskFilter === "calendar" ? `${todoCalendarSelectedDate} 暂无任务` : "当前分栏暂无任务"}</div>`;
      else filtered.forEach((t) => fullBox.appendChild(buildTaskRow(t)));
    }
  }
  loadTodoistTasks();

  document.getElementById("task-widget-btn")?.addEventListener("click", async () => {
    const widget = window.Capacitor?.Plugins?.HomeWidget;
    if (!widget?.requestPin) {
      toast("请在手机桌面长按空白处，从小组件列表添加 LogicWeaver");
      return;
    }
    const result = await widget.requestPin();
    toast(result.requested ? "请在系统弹窗中确认添加桌面小组件" : "当前桌面不支持自动添加，请从小组件列表手动添加");
  });

  document.getElementById("task-refresh-btn")?.addEventListener("click", () => {
    toast("正在刷新 Todoist…");
    loadTodoistTasks();
  });

  document.getElementById("task-token-btn")?.addEventListener("click", () => {
    const cur = getTodoistToken();
    const input = prompt("请输入 Todoist API Token（如已从电脑同步可直接留空）：", cur);
    if (input !== null) {
      const val = input.trim();
      localStorage.setItem("todoistToken", JSON.stringify(val));
      toast(val ? "已保存 Todoist Token" : "已清空 Todoist Token");
      loadTodoistTasks();
    }
  });

  const newTaskDate = document.getElementById("new-task-date");
  if (newTaskDate && !newTaskDate.value) newTaskDate.value = new Date().toLocaleDateString("sv-SE");

  document.getElementById("mobile-add-task-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("new-task-input");
    const dateInput = document.getElementById("new-task-date");
    const timeInput = document.getElementById("new-task-time");
    const repeatInput = document.getElementById("new-task-repeat");
    const content = input?.value.trim();
    if (!content) return;
    const date = dateInput?.value || new Date().toLocaleDateString("sv-SE");
    const time = timeInput?.value || "";
    const repeat = repeatInput?.value || "";
    const dueString = repeat
      ? `${repeat}${time ? ` at ${time}` : ""}${date ? ` starting ${date}` : ""}`
      : `${date}${time ? ` ${time}` : ""}`;
    input.value = "";

    const newTask = {
      id: "temp_" + Date.now(),
      content,
      priority: 1,
      is_completed: false,
      due: {
        string: repeat || dueString,
        date,
        ...(time ? { datetime: `${date}T${time}:00` } : {}),
        is_recurring: Boolean(repeat)
      }
    };
    cachedTasks.unshift(newTask);
    renderTasksUI();
    toast("＋ 任务已添加");

    const token = getTodoistToken();
    if (token) {
      try {
        const r = await fetch("/api/todoist/tasks", {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ content, due_string: dueString })
        });
        if (r.ok) {
          const created = await r.json();
          Object.assign(newTask, created);
          renderTasksUI();
          syncTodoistWidget();
        }
      } catch {}
    }
  });

  // ================= 9. 随身笔记 =================
  const notesContainer = document.getElementById("notes-list");
  const noteComposer = document.getElementById("note-composer");
  const newNoteBtn = document.getElementById("notes-new-btn");
  const cancelNoteBtn = document.getElementById("note-cancel-btn");
  const saveNoteBtn = document.getElementById("note-save-btn");

  function getLocalNotes() {
    try {
      const raw = localStorage.getItem("mobileNotes");
      return raw ? JSON.parse(raw) : [
        { id: "1", title: "B站随身收藏夹已就绪", content: "把 B 站收藏夹搬到了手机端第一优先级，支持多个收藏夹分类无缝切换！", time: "刚刚" },
        { id: "2", title: "黑白双主题适配心得", content: "极客暗夜黑 + 纯净白昼明亮模式，切换丝滑无闪烁。", time: "今天" }
      ];
    } catch { return []; }
  }

  function saveLocalNotes(notes) {
    try { localStorage.setItem("mobileNotes", JSON.stringify(notes)); } catch {}
  }

  function renderNotesList() {
    if (!notesContainer) return;
    notesContainer.innerHTML = "";
    const notes = getLocalNotes();
    notes.forEach((n, idx) => {
      const card = document.createElement("div");
      card.className = "note-item-card";
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div class="note-item-title">${escapeHtml(n.title)}</div>
          <button type="button" style="background:none;border:none;color:var(--text-dim);font-size:12px;cursor:pointer;">⌫</button>
        </div>
        <div class="note-item-snippet">${escapeHtml(n.content)}</div>
        <div class="note-item-time">${escapeHtml(n.time)}</div>
      `;
      card.querySelector("button")?.addEventListener("click", (e) => {
        e.stopPropagation();
        notes.splice(idx, 1);
        saveLocalNotes(notes);
        renderNotesList();
        toast("笔记已删除");
      });
      notesContainer.appendChild(card);
    });
  }
  renderNotesList();

  newNoteBtn?.addEventListener("click", () => {
    noteComposer.style.display = "block";
    document.getElementById("note-title-input")?.focus();
  });
  cancelNoteBtn?.addEventListener("click", () => {
    noteComposer.style.display = "none";
  });
  saveNoteBtn?.addEventListener("click", () => {
    const title = document.getElementById("note-title-input")?.value.trim() || "未命名笔记";
    const content = document.getElementById("note-content-input")?.value.trim() || "无内容";
    const notes = getLocalNotes();
    notes.unshift({ id: String(Date.now()), title, content, time: "刚刚" });
    saveLocalNotes(notes);
    renderNotesList();
    noteComposer.style.display = "none";
    document.getElementById("note-title-input").value = "";
    document.getElementById("note-content-input").value = "";
    toast("✓ 笔记已保存");
  });

  // ================= 10. AI 随身智脑 =================
  const aiInput = document.getElementById("ai-user-input");
  const aiSubmit = document.getElementById("ai-submit-btn");
  const aiChatBox = document.getElementById("ai-chat-thread");

  function getGeminiKey() {
    try {
      const cfg = JSON.parse(localStorage.getItem("ghAiConfig") || "{}");
      if (cfg.apiKey) return cfg.apiKey;
      const raw = localStorage.getItem("artificialAnalysisApiKey") || localStorage.getItem("openRouterApiKey");
      return raw ? String(raw).replace(/^"|"$/g, "") : "";
    } catch { return ""; }
  }

  async function handleAiChat(promptText) {
    const text = promptText || aiInput?.value.trim();
    if (!text) return;
    if (aiInput) aiInput.value = "";

    const userRow = document.createElement("div");
    userRow.className = "ai-bubble-row user";
    const userBubble = document.createElement("div");
    userBubble.className = "ai-bubble";
    userBubble.textContent = text;
    userRow.appendChild(userBubble);
    aiChatBox.appendChild(userRow);

    const botRow = document.createElement("div");
    botRow.className = "ai-bubble-row bot";
    botRow.innerHTML = `<div class="ai-avatar">✨</div><div class="ai-bubble">正在深度思考…</div>`;
    aiChatBox.appendChild(botRow);
    const bubbleText = botRow.querySelector(".ai-bubble");

    const apiKey = getGeminiKey();
    if (!apiKey) {
      setTimeout(() => {
        bubbleText.innerHTML = "💡 <b>未检测到 Gemini API Key</b><br>请在电脑端插件「选项」页面底部点击 <b>「📲 一键同步到手机 App」</b>，然后点击手机顶部「同步」，即可直接开启智能对话！";
      }, 400);
      return;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text }] }] })
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        bubbleText.innerHTML = escapeHtml(reply).replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
      } else {
        bubbleText.textContent = "AI 响应：" + (data.error?.message || "未返回结果");
      }
    } catch (e) {
      bubbleText.textContent = "请求异常：" + e.message;
    }
  }

  aiSubmit?.addEventListener("click", () => handleAiChat());
  aiInput?.addEventListener("keydown", (e) => { if (e.key === "Enter") handleAiChat(); });

  document.querySelectorAll(".ai-quick-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const prompt = chip.dataset.prompt;
      if (prompt) handleAiChat(prompt);
    });
  });

  window.addEventListener("mobile-config-synced", () => {
    toast("✓ 电脑端配置已全部同步生效！");
    renderLauncher();
    loadBiliFavorites();
    loadTodoistTasks();
  });
});
