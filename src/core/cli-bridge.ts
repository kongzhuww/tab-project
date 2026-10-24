/**
 * LogicWeaver CLI Bridge — 插件前端内建命令行 RPC 桥接器
 * 仅连接本机回环地址 127.0.0.1:19826，支持全模块毫秒级状态自检、排版测量、导航切换、数据同步与自动化操作
 */

import { fullscreenCardState, fullscreenCardsController } from "./fullscreen-cards.store";
import { macDockState, macDockController } from "../dock/store";
import { windowManagerState, windowManagerController } from "./window-manager.store";
import { searchState, searchController } from "../search/store";
import { searchService, type WebSearchScope } from "../services/search.service";
import { launcherService } from "../services/launcher.service";
import { todoistTaskListState, todoistTaskListController } from "../todoist/task-list-store";
import { todoistModuleState } from "../todoist/module-state";
import { todoistMainWorkspaceState, todoistMainWorkspaceController } from "../todoist/main-workspace-store";
import { todoistWorkspaceController } from "../todoist/workspace";
import { syncService, readSyncSettings, extractSyncPayload } from "../services/sync.service";
import { webDavService } from "../services/webdav.service";
import { bookmarkFolderStripState } from "../bookmarks/folder-strip-store";
import { bookmarkPanelState, bookmarkPanelController } from "../bookmarks/panel-store";
import { bookmarksService } from "../services/bookmarks.service";
import { biliFavoritesState, biliFavoritesController } from "../bilibili/bili-favorites-store";
import { radioTapeState, radioTapeController } from "../bilibili/radio-tape-store";
import { biliRadioPlayer } from "../bilibili/radio-player";
import { biliRadioController } from "../bilibili/radio-store";
import { bilibiliService } from "../services/bilibili.service";
import { githubRepositoryState } from "../github/repositories";
import { githubFolderState, githubFolderController } from "../github/folders";
import { gitHubService } from "../services/github.service";
import { githubRepoDetailController, githubRepoDetailState } from "../github/repo-detail-store";
import { homeMusicState, homeMusicController } from "../music/store";
import { dockLifecycleController } from "../dock/dock-lifecycle.store";
import { DOCK_TOOLS, DOCK_CARDS } from "../dock/store";
import { listDockModuleMetadata } from "../modules/registry";
import { youTubeService } from "../services/youtube.service";
import { youTubeState } from "../youtube/youtube-store";

declare const chrome: any;

const CLI_BROKER_URL = "http://127.0.0.1:19826";
const CLIENT_ID = `page_${Math.random().toString(36).slice(2, 9)}`;

let running = false;
let pollAbortController: AbortController | null = null;

function isElementVisible(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    parseFloat(style.opacity || "1") > 0 &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function inspectElement(el: Element) {
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  return {
    tag: el.tagName.toLowerCase(),
    id: el.id || undefined,
    className: typeof el.className === "string" ? el.className : undefined,
    title: (el as HTMLElement).title || undefined,
    src: (el as HTMLImageElement).src || undefined,
    text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
    visible: isElementVisible(el),
    rect: {
      left: Math.round(rect.left * 10) / 10,
      top: Math.round(rect.top * 10) / 10,
      right: Math.round(rect.right * 10) / 10,
      bottom: Math.round(rect.bottom * 10) / 10,
      width: Math.round(rect.width * 10) / 10,
      height: Math.round(rect.height * 10) / 10
    },
    style: {
      display: style.display,
      position: style.position,
      zIndex: style.zIndex,
      opacity: style.opacity,
      visibility: style.visibility,
      userSelect: style.userSelect,
      transform: style.transform !== "none" ? style.transform : undefined
    }
  };
}

function computeOverlap(a: ReturnType<typeof inspectElement>, b: ReturnType<typeof inspectElement>) {
  const r1 = a.rect;
  const r2 = b.rect;
  const overlapX = Math.max(0, Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left));
  const overlapY = Math.max(0, Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top));
  const isOverlapping = overlapX > 0 && overlapY > 0;
  const horizontalGap = r2.left >= r1.right ? r2.left - r1.right : r1.left >= r2.right ? r1.left - r2.right : -overlapX;
  const verticalGap = r2.top >= r1.bottom ? r2.top - r1.bottom : r1.top >= r2.bottom ? r1.top - r2.bottom : -overlapY;
  return {
    isOverlapping,
    overlapArea: Math.round(overlapX * overlapY),
    overlapX: Math.round(overlapX * 10) / 10,
    overlapY: Math.round(overlapY * 10) / 10,
    horizontalGap: Math.round(horizontalGap * 10) / 10,
    verticalGap: Math.round(verticalGap * 10) / 10
  };
}

async function executeCommand(cmd: { action: string; params?: Record<string, any> }): Promise<any> {
  const { action, params = {} } = cmd;

  switch (action) {
    case "status": {
      const launcherState = launcherService.getState();
      return {
        clientId: CLIENT_ID,
        url: location.href,
        pathname: location.pathname,
        title: document.title,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        pageMode: document.body?.dataset?.page || "home",
        hasCardFullscreen: document.body?.classList.contains("has-card-fullscreen") || false,
        activeFullscreenCard: fullscreenCardState.activeId,
        activeDockTarget: macDockState.activeTargetId,
        activeWindow: windowManagerState.activeId,
        todoistOpen: todoistMainWorkspaceState.isOpen,
        todoistView: todoistTaskListState.view,
        todoistActiveProject: todoistTaskListState.activeProjectName,
        todoistTaskCount: todoistTaskListState.columns.reduce((sum, c) => sum + (c.tasks?.length || 0), 0),
        search: {
          mode: searchState.mode,
          webScope: searchService.webScope,
          query: searchState.query,
          placeholder: searchState.placeholder,
          suggestionsCount: searchState.suggestions.length
        },
        launcher: {
          linksCount: launcherState.links.length,
          foldersCount: Object.keys(launcherState.folders || {}).length,
          pages: launcherState.pages,
          activePage: launcherState.activePage
        },
        bookmarks: {
          stripFoldersCount: bookmarkFolderStripState.folders.length,
          panelOpen: bookmarkPanelState.open
        },
        bili: {
          mode: biliFavoritesState.organizer.mode,
          activeFolderId: biliFavoritesState.activeFolderId,
          radioPlaying: radioTapeState.playing,
          radioTitle: radioTapeState.title,
          radioSeriesCount: biliFavoritesState.radioSeries.length
        },
        music: {
          playing: homeMusicState.playing,
          title: homeMusicState.title,
          artist: homeMusicState.artist
        },
        theme: {
          current: document.documentElement.dataset.theme,
          localStorageTheme: localStorage.getItem("theme"),
          currentWallpaper: localStorage.getItem("lw-current-wallpaper")
        }
      };
    }

    case "theme": {
      const target = params.name ? String(params.name) : undefined;
      if (target) {
        document.documentElement.dataset.theme = target;
        try {
          localStorage.setItem("theme", target);
          if (typeof chrome !== "undefined" && chrome?.storage?.local) {
            void chrome.storage.local.set({ theme: target });
          }
        } catch {}
      }
      return {
        theme: document.documentElement.dataset.theme,
        localStorageTheme: localStorage.getItem("theme")
      };
    }

    case "nav": {
      const target = String(params.target || "home").toLowerCase();
      if (target === "home") {
        macDockController.triggerItem("home", "home");
      } else if (target === "bilibili" || target === "daily-bilibili") {
        fullscreenCardsController.enter("daily-bilibili");
      } else if (target === "github" || target === "card-github") {
        fullscreenCardsController.enter("card-github");
      } else if (target === "youtube" || target === "daily-youtube") {
        fullscreenCardsController.enter("daily-youtube");
      } else if (target === "aihot" || target === "daily-aihot") {
        fullscreenCardsController.enter("daily-aihot");
      } else if (target === "pricing" || target === "daily-pricing") {
        fullscreenCardsController.enter("daily-pricing");
      } else if (target === "todoist") {
        todoistMainWorkspaceController.open();
      } else if (target === "settings") {
        (window as any).openSettingsModal?.() || windowManagerController.open("settings");

      } else if (target === "daily") {
        if (document.body) document.body.dataset.page = "daily";
      } else {
        throw new Error(`未知导航目标: ${target}`);
      }
      await new Promise((r) => setTimeout(r, 80));
      return executeCommand({ action: "status" });
    }

    case "inspect": {
      const selector = String(params.selector || "body");
      const compareSelector = params.compareSelector ? String(params.compareSelector) : "";
      const elements = Array.from(document.querySelectorAll(selector));
      const items = elements.slice(0, 20).map(inspectElement);

      let comparison = undefined;
      if (compareSelector) {
        const compareEl = document.querySelector(compareSelector);
        if (elements[0] && compareEl) {
          const itemA = inspectElement(elements[0]);
          const itemB = inspectElement(compareEl);
          comparison = {
            targetA: itemA,
            targetB: itemB,
            metrics: computeOverlap(itemA, itemB)
          };
        }
      }

      return {
        selector,
        matchCount: elements.length,
        items,
        comparison
      };
    }

    case "qq-messages": {
      const q = (window as any).__qqState;
      const activeId = q?.activeSessionId;
      const msgs = activeId && q?.messages ? q.messages[activeId] : [];
      return {
        activeSessionId: activeId,
        messageCount: msgs?.length || 0,
        messages: msgs?.slice(-15) || []
      };
    }

    case "search": {
      if (params.mode) {
        searchService.setMode(params.mode);
      }
      if (params.scope) {
        const scope = params.scope as WebSearchScope;
        searchService.webScope = scope;
        const placeholders: Record<WebSearchScope, string> = {
          all: "搜索，或输入网址直接打开",
          bookmarks: "在书签中搜索…",
          launcher: "在常用网站中搜索…"
        };
        if (searchState.mode === "web" && placeholders[scope]) {
          searchController.update({ placeholder: placeholders[scope] });
        }
      }
      if (params.query !== undefined) {
        const q = String(params.query);
        searchController.update({ query: q });
        if (q.trim()) {
          await searchService.fetchSuggestions(q.trim());
        } else {
          searchController.setSuggestions([]);
        }
      }
      if (params.submit) {
        searchService.submit();
      }
      return {
        mode: searchState.mode,
        webScope: searchService.webScope,
        query: searchState.query,
        placeholder: searchState.placeholder,
        suggestions: searchState.suggestions.slice(0, 15)
      };
    }

    case "bookmarks": {
      const sub = String(params.sub || "status");
      if (sub === "status" || sub === "folders") {
        const ignored = await bookmarksService.getIgnoredFolders();
        return {
          stripEnabled: bookmarkFolderStripState.enabled,
          stripFolders: bookmarkFolderStripState.folders,
          panelOpen: bookmarkPanelState.open,
          panelItemsCount: bookmarkPanelState.items.length,
          ignoredFolders: Array.from(ignored)
        };
      }
      if (sub === "search") {
        const q = String(params.query || "").trim();
        if (!q || typeof chrome === "undefined" || !chrome.bookmarks?.search) {
          return { query: q, results: [] };
        }
        const results = await chrome.bookmarks.search(q);
        return {
          query: q,
          count: results.length,
          results: results.slice(0, 30).map((b: any) => ({ id: b.id, title: b.title, url: b.url, parentId: b.parentId }))
        };
      }
      if (sub === "panel") {
        const target = String(params.state || "toggle");
        if (target === "open") bookmarkPanelController.updateState({ open: true });
        else if (target === "close") bookmarkPanelController.updateState({ open: false });
        else bookmarkPanelController.updateState({ open: !bookmarkPanelState.open });
        return { open: bookmarkPanelState.open };
      }
      throw new Error(`未知 bookmarks 子命令: ${sub}`);
    }

    case "bili":
    case "bilibili": {
      const sub = String(params.sub || "status");
      if (sub === "mode") {
        const mode = String(params.mode || "organizer");
        if (mode === "radio") biliFavoritesController.dispatch("open-radio");
        else if (mode === "sub-video") biliFavoritesController.dispatch("open-sub-video");
        else if (mode === "feed" || mode === "following") biliFavoritesController.dispatch("open-following");
        else if (mode === "rcmd") biliFavoritesController.dispatch("open-recommendations");
        else if (mode === "cache") biliFavoritesController.dispatch("open-cache");
        else biliFavoritesController.dispatch("organizer-open");
        await new Promise((r) => setTimeout(r, 200));
      } else if (sub === "folder") {
        biliFavoritesController.dispatch("select-folder", Number(params.folderId));
        await new Promise((r) => setTimeout(r, 250));
      } else if (sub === "radio-play") {
        if (!biliFavoritesState.radioSeries.length) await biliRadioController.init();
        const idx = Number(params.index || 0);
        biliFavoritesController.dispatch("radio-play-index", idx);
        await new Promise((r) => setTimeout(r, 250));
      } else if (sub === "radio-series") {
        if (!biliFavoritesState.radioSeries.length) await biliRadioController.init();
        const seriesId = String(params.seriesId || "");
        const startIndex = Number(params.index || 0);
        const found = biliFavoritesState.radioSeries.find((s) => s.id === seriesId || s.name === seriesId);
        if (!found) throw new Error(`未找到电台系列: ${seriesId}`);
        biliFavoritesController.dispatch("radio-play-series", { id: found.id, startIndex });
        await new Promise((r) => setTimeout(r, 250));
      } else if (sub === "radio-toggle") {
        radioTapeController.togglePlay();
      } else if (sub === "radio-next") {
        radioTapeController.next();
      } else if (sub === "radio-prev") {
        radioTapeController.prev();
      } else if (sub === "radio-seek") {
        radioTapeController.seek(Number(params.percent || 0));
      } else if (sub === "radio-repair") {
        return await biliRadioController.repairStoredSeries();
      } else if (sub === "folders-list") {
        return {
          folders: biliFavoritesState.organizer.folders.map((f) => ({
            id: f.id,
            title: f.title,
            count: f.count
          }))
        };
      } else if (sub === "list-folders") {
        const [created, collected] = await Promise.all([
          bilibiliService.getCreatedFolders().catch(() => []),
          bilibiliService.getCollectedFolders().catch(() => ({ list: [], count: 0, has_more: false }))
        ]);
        return {
          created: (created || []).map((f) => ({
            id: f.id,
            title: f.title,
            count: f.media_count,
            type: "created"
          })),
          collected: (collected.list || []).map((f) => ({
            id: f.id,
            title: f.title,
            count: f.media_count,
            upper: f.upper ? { mid: f.upper.mid, name: f.upper.name } : null,
            type: "collected"
          }))
        };
      } else if (sub === "list-videos") {
        const folderId = params.folderId || params.folder;
        if (!folderId) throw new Error("缺少参数 folderId");
        const page = Number(params.page || params.pn || 1);
        const pageSize = Math.min(Number(params.pageSize || params.ps || 20), 50);
        const order = String(params.order || "mtime");
        const res = await bilibiliService.getFolderVideos(folderId, page, pageSize, order);
        return {
          total: res.total,
          hasMore: res.hasMore,
          page,
          pageSize,
          folderInfo: {
            title: res.info?.title || "",
            media_count: res.info?.media_count || res.total
          },
          medias: (res.medias || []).map((v) => ({
            bvid: v.bvid,
            aid: v.id || (v as any).aid,
            title: v.title,
            intro: v.intro,
            duration: v.duration,
            upper: v.upper ? { mid: v.upper.mid, name: v.upper.name } : null,
            pubtime: (v as any).pubtime || (v as any).ctime || 0,
            url: `https://www.bilibili.com/video/${v.bvid}`
          }))
        };
      } else if (sub === "video-info") {
        const bvid = String(params.bvid || "");
        if (!bvid) throw new Error("缺少参数 bvid");
        const view = await bilibiliService.getVideoView(bvid);
        return {
          bvid: view.bvid,
          aid: view.aid,
          title: view.title,
          desc: view.desc,
          duration: view.duration,
          owner: view.owner ? { mid: view.owner.mid, name: view.owner.name } : null,
          pages: (view.pages || []).map((p: any) => ({
            cid: p.cid,
            page: p.page,
            part: p.part,
            duration: p.duration
          }))
        };
      } else if (sub === "video-subtitles") {
        const bvid = String(params.bvid || "");
        if (!bvid) throw new Error("缺少参数 bvid");
        const cid = params.cid ? Number(params.cid) : undefined;
        const res = await bilibiliService.fetchVideoSubtitleDetails(bvid, cid);
        return {
          bvid,
          cid: cid || undefined,
          available: Boolean(res.ok),
          reason: res.reason || (res.ok ? "" : "暂无可用字幕"),
          fullText: res.bodyText || "",
          charCount: (res.bodyText || "").length,
          cues: (res.cues || []).map((c) => ({
            from: c.from,
            to: c.to,
            content: c.content
          }))
        };
      } else if (sub === "video-comments") {
        const aid = params.aid ? String(params.aid) : "";
        if (!aid) throw new Error("缺少参数 aid");
        const page = Number(params.page || params.pn || 1);
        const pageSize = Math.min(Number(params.pageSize || params.ps || 20), 40);
        const sort = Number(params.sort ?? 0); // 0=时间, 1=点赞, 2=热度

        const raw = await (bilibiliService as any).api(
          `https://api.bilibili.com/x/v2/reply?type=1&oid=${aid}&pn=${page}&ps=${pageSize}&sort=${sort}`
        );
        const upperMid = Number(raw?.upper?.mid || 0);
        const topReply = raw?.top?.upper || raw?.top?.admin || null;
        const replies = Array.isArray(raw?.replies) ? raw.replies : [];

        const extractLinks = (text: string): string[] => {
          const matched = text.match(/https?:\/\/[^\s\u4e00-\u9fa5<>'"()[\]{}]+/gi) || [];
          return [...new Set(matched.map((u) => u.replace(/[.,;!?]+$/, "")))];
        };

        const transformComment = (r: any, isTop = false) => {
          const msg = String(r?.content?.message || "");
          const jumpUrls = (r?.content?.jump_url && typeof r.content.jump_url === "object")
            ? Object.values(r.content.jump_url).map((j: any) => j?.pc_url || j?.app_url_path).filter(Boolean)
            : [];
          const allLinks = [...new Set([...extractLinks(msg), ...jumpUrls])];

          return {
            rpid: r.rpid,
            oid: Number(aid),
            mid: Number(r.mid || 0),
            uname: String(r.member?.uname || "B站用户"),
            message: msg,
            is_top: isTop,
            is_up: Number(r.mid || 0) === upperMid,
            like: Number(r.like || 0),
            rcount: Number(r.rcount || 0),
            ctime: Number(r.ctime || 0),
            timeText: new Date(Number(r.ctime || 0) * 1000).toLocaleString(),
            extracted_links: allLinks,
            sub_replies_preview: Array.isArray(r.replies)
              ? r.replies.slice(0, 3).map((sub: any) => ({
                  rpid: sub.rpid,
                  mid: Number(sub.mid || 0),
                  uname: String(sub.member?.uname || ""),
                  message: String(sub.content?.message || ""),
                  is_up: Number(sub.mid || 0) === upperMid,
                  extracted_links: extractLinks(String(sub.content?.message || ""))
                }))
              : []
          };
        };

        const topItem = topReply && page === 1 ? transformComment(topReply, true) : null;
        const commentItems = replies.map((r: any) => transformComment(r, false));
        if (topItem && !commentItems.some((c: any) => c.rpid === topItem.rpid)) {
          commentItems.unshift(topItem);
        }

        return {
          aid: Number(aid),
          page,
          pageSize,
          total: Number(raw?.page?.count || 0),
          upperMid,
          hasTopComment: Boolean(topItem),
          comments: commentItems
        };
      } else if (sub === "comment-replies") {
        const aid = params.aid ? String(params.aid) : "";
        const rootRpid = params.rootRpid || params.root;
        if (!aid || !rootRpid) throw new Error("缺少参数 aid 或 rootRpid");
        const page = Number(params.page || params.pn || 1);
        const pageSize = Math.min(Number(params.pageSize || params.ps || 10), 30);

        const raw = await (bilibiliService as any).api(
          `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${aid}&root=${rootRpid}&pn=${page}&ps=${pageSize}`
        );
        const upperMid = Number(raw?.upper?.mid || 0);
        const replies = Array.isArray(raw?.replies) ? raw.replies : [];

        const extractLinks = (text: string): string[] => {
          const matched = text.match(/https?:\/\/[^\s\u4e00-\u9fa5<>'"()[\]{}]+/gi) || [];
          return [...new Set(matched.map((u) => u.replace(/[.,;!?]+$/, "")))];
        };

        return {
          aid: Number(aid),
          rootRpid,
          page,
          pageSize,
          total: Number(raw?.page?.count || 0),
          replies: replies.map((r: any) => ({
            rpid: r.rpid,
            root: r.root,
            parent: r.parent,
            mid: Number(r.mid || 0),
            uname: String(r.member?.uname || "B站用户"),
            message: String(r.content?.message || ""),
            is_up: Number(r.mid || 0) === upperMid,
            like: Number(r.like || 0),
            ctime: Number(r.ctime || 0),
            extracted_links: extractLinks(String(r.content?.message || ""))
          }))
        };
      } else if (sub === "storage-debug") {
        const localAll = await (chrome?.storage?.local?.get ? chrome.storage.local.get(null) : Promise.resolve({}));
        const syncAll = await (chrome?.storage?.sync?.get ? chrome.storage.sync.get(null) : Promise.resolve({}));
        const lsKeys: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && (k.toLowerCase().includes("bili") || k.toLowerCase().includes("radio") || k.toLowerCase().includes("series"))) {
            lsKeys[k] = localStorage.getItem(k) || "";
          }
        }
        return {
          chromeStorageLocalKeys: Object.keys(localAll),
          biliRadioSeriesV1: localAll["biliRadioSeriesV1"],
          matchingLocal: Object.fromEntries(
            Object.entries(localAll).filter(([k]) => k.toLowerCase().includes("radio") || k.toLowerCase().includes("series") || k.toLowerCase().includes("bili"))
          ),
          matchingSync: Object.fromEntries(
            Object.entries(syncAll).filter(([k]) => k.toLowerCase().includes("radio") || k.toLowerCase().includes("series") || k.toLowerCase().includes("bili"))
          ),
          localStorageMatching: lsKeys
        };
      }

      const playerState = biliRadioPlayer.getState();
      return {
        mode: biliFavoritesState.organizer.mode,
        activeFolderId: biliFavoritesState.activeFolderId,
        foldersCount: biliFavoritesState.organizer.folders.length,
        videosCount: biliFavoritesState.organizer.videos.length,
        radio: {
          active: radioTapeState.active,
          playing: radioTapeState.playing,
          loading: radioTapeState.loading,
          seriesName: radioTapeState.seriesName,
          title: radioTapeState.title,
          trackIndex: radioTapeState.trackIndex,
          totalTracks: radioTapeState.totalTracks,
          formattedCurrent: radioTapeState.formattedCurrent,
          formattedDuration: radioTapeState.formattedDuration,
          lyric: radioTapeState.lyric,
          queueCount: biliFavoritesState.radioQueue.length,
          queue: biliFavoritesState.radioQueue.map((item, i) => ({
            index: i,
            bvid: item.bvid,
            title: item.title,
            playing: playerState.active && playerState.index === i
          })),
          savedSeries: biliFavoritesState.radioSeries.map((s) => ({
            id: s.id,
            name: s.name,
            count: s.count
          }))
        }
      };
    }

    case "github": {
      const sub = String(params.sub || "status");
      if (sub === "category" && params.category) {
        githubFolderController.select(String(params.category));
      } else if (sub === "search" && params.query !== undefined) {
        gitHubService.setSearchQuery(String(params.query));
      }
      const targetRepo = params.fullName || params.query || params.category;
      if (sub === "open-detail" && targetRepo) {
        console.log("[CLI Bridge] Opening GitHub detail for:", targetRepo);
        githubRepoDetailController.open(String(targetRepo));
      } else if (sub === "close-detail") {
        githubRepoDetailController.close();
      }
      const snap = githubRepositoryState;
      return {
        receivedParams: params,
        detailDrawer: {
          isOpen: githubRepoDetailState.isOpen,
          fullName: githubRepoDetailState.fullName,
          stars: githubRepoDetailState.stars,
          language: githubRepoDetailState.language,
          headingsCount: githubRepoDetailState.headings.length,
          readmeLength: githubRepoDetailState.readmeMarkdown.length,
          isLoading: githubRepoDetailState.isLoading,
          error: githubRepoDetailState.error
        },
        folders: githubFolderState.folders,
        activeFolder: githubFolderState.folders.find((f) => f.active)?.title || "全部",
        totalItems: snap.totalItems,
        loadedItems: snap.loadedItems,
        page: snap.page,
        totalPages: snap.totalPages,
        sampleCards: snap.cards.slice(0, 8).map((c) => ({
          fullName: c.fullName,
          folder: c.folder,
          stars: c.stars,
          description: c.description
        }))
      };
    }

    case "music": {
      const sub = String(params.sub || "status");
      if (sub === "toggle") homeMusicController.togglePlay();
      else if (sub === "next") homeMusicController.next();
      else if (sub === "prev") homeMusicController.prev();
      return {
        playing: homeMusicState.playing,
        title: homeMusicState.title,
        artist: homeMusicState.artist,
        formattedCurrent: homeMusicState.formattedCurrent,
        formattedDuration: homeMusicState.formattedDuration,
        mode: homeMusicState.mode,
        isNetease: homeMusicState.isNetease,
        favoritesCount: homeMusicState.favorites.length
      };
    }

    case "launcher": {
      const sub = String(params.sub || "list");
      await launcherService.ready;
      if (sub === "list") {
        const st = launcherService.getState();
        return {
          linksCount: st.links.length,
          pages: st.pages,
          pageLabels: st.pageLabels,
          activePage: st.activePage,
          folders: st.folders,
          links: st.links
        };
      }
      if (sub === "add") {
        let targetPage = params.page ? String(params.page) : undefined;
        if (targetPage) {
          const st = launcherService.getState();
          for (const [k, v] of Object.entries(st.pageLabels || {})) {
            if (v === targetPage && st.pages.includes(k)) {
              targetPage = k;
              break;
            }
          }
        }
        await launcherService.saveLink({
          title: String(params.title || ""),
          url: String(params.url || ""),
          group: params.group ? String(params.group) : undefined,
          page: targetPage,
          note: params.note ? String(params.note) : undefined
        });
        return { ok: true, linksCount: launcherService.getState().links.length };
      }
      if (sub === "merge-page") {
        const fromPage = String(params.from || "");
        const toPage = String(params.to || "");
        for (const link of launcherService.getState().links) {
          if (link.page === fromPage) {
            link.page = toPage;
          }
        }
        await launcherService.deletePage(fromPage);
        return { ok: true, pages: launcherService.getState().pages, pageLabels: launcherService.getState().pageLabels };
      }
      if (sub === "delete-page") {
        const pageName = String(params.page || "");
        await launcherService.deletePage(pageName);
        return { ok: true, pages: launcherService.getState().pages, pageLabels: launcherService.getState().pageLabels };
      }
      if (sub === "rename") {
        const id = String(params.id || "");
        const title = String(params.title || "").trim();
        const link = launcherService.getState().links.find((l) => String(l.id) === id);
        if (!link) throw new Error(`未找到 ID 为 ${id} 的常用网站`);
        await launcherService.saveLink({ id: link.id, title, url: link.url, group: link.group, note: link.note });
        return { ok: true, id, title };
      }
      if (sub === "note") {
        const id = String(params.id || "");
        const note = String(params.note || "").trim();
        await launcherService.saveLinkNote(id, note);
        return { ok: true, id, note };
      }
      if (sub === "delete") {
        await launcherService.deleteLink(String(params.id || ""));
        return { ok: true, linksCount: launcherService.getState().links.length };
      }
      throw new Error(`未知 launcher 子命令: ${sub}`);
    }

    case "todoist": {
      const sub = String(params.sub || "status");
      if (!["status", "view", "project", "refresh"].includes(sub)) throw new Error("未知 Todoist 子命令");
      if (sub !== "status" && !todoistModuleState.active) throw new Error("Todoist 窗口未就绪或已隐藏；请先显式打开窗口，未执行读取。");
      if (sub === "view") {
        const view = (params.view || "inbox") as "inbox" | "projects" | "today";
        if (!["inbox", "projects", "today"].includes(view)) throw new Error("Todoist 视图无效");
        await todoistWorkspaceController.switchView(view);
      } else if (sub === "project") {
        await todoistTaskListController.loadWorkspace("projects", String(params.projectId || ""));
      } else if (sub === "refresh") {
        await todoistTaskListController.loadWorkspace(
          todoistTaskListState.view,
          todoistTaskListState.activeProjectId,
          true
        );
      }
      if (sub !== "status" && !todoistModuleState.active) throw new Error("Todoist 已隐藏，读取结果未应用；没有自动重新打开。");
      return {
        isOpen: todoistMainWorkspaceState.isOpen,
        view: todoistTaskListState.view,
        loading: todoistTaskListState.loading,
        activeProjectId: todoistTaskListState.activeProjectId,
        activeProjectName: todoistTaskListState.activeProjectName,
        projects: todoistTaskListState.projects,
        totalTaskCount: todoistTaskListState.columns.reduce((acc, col) => acc + (col.tasks?.length || 0), 0),
        columns: todoistTaskListState.columns.map((c) => ({
          sectionId: c.sectionId,
          title: c.title,
          taskCount: c.tasks.length,
          sampleTasks: c.tasks.slice(0, 5).map((t) => ({ id: t.id, content: t.content, dueText: t.dueText }))
        }))
      };
    }

    case "sync": {
      const sub = String(params.sub || "status");
      if (sub === "status") {
        const raw = await readSyncSettings();
        const payload = extractSyncPayload(raw);
        return {
          backupKind: "preferences",
          credentialsIncluded: false,
          syncItemCount: payload.count,
          byteLength: payload.byteLength,
          quickLinksCount: Array.isArray(payload.sanitized.quickLinks) ? payload.sanitized.quickLinks.length : 0,
          keys: Object.keys(payload.sanitized)
        };
      }
      const { loadWebDavSettings, toWebDavConfig } = await import("../sync/settings");
      const webdavConfig = toWebDavConfig(await loadWebDavSettings());
      if (sub === "webdav-test") {
        return await webDavService.testConnection(webdavConfig);
      }
      if (sub === "webdav-push") {
        return await webDavService.pushCurrentConfig(webdavConfig);
      }
      if (sub === "webdav-pull") {
        return await webDavService.pullCurrentConfig(webdavConfig);
      }
      if (sub === "cloud-push") {
        return await syncService.pushConfig();
      }
      if (sub === "cloud-pull") {
        return await syncService.pullConfig();
      }
      throw new Error(`未知 sync 子命令: ${sub}`);
    }

    case "eval": {
      const code = String(params.code || "");
      try {
        const fn = new Function("return " + code);
        const res = await fn();
        return { ok: true, result: res };
      } catch (err: any) {
        return { ok: false, error: err?.message || String(err) };
      }
    }

    case "diagnose-loading": {
      const resources = performance.getEntriesByType("resource").map((r: any) => ({
        name: r.name,
        initiatorType: r.initiatorType,
        duration: Math.round(r.duration),
        transferSize: r.transferSize
      }));
      const links = Array.from(document.querySelectorAll("link")).map((l) => ({
        rel: l.rel,
        href: l.href,
        sizes: (l as any).sizes?.value,
        type: l.type
      }));
      const media = Array.from(document.querySelectorAll("audio, video")).map((m: any) => ({
        tag: m.tagName,
        src: m.src?.slice(0, 100),
        id: m.id,
        className: m.className,
        parentTag: m.parentElement?.tagName,
        parentId: m.parentElement?.id,
        parentClass: m.parentElement?.className,
        paused: m.paused,
        muted: m.muted,
        readyState: m.readyState,
        networkState: m.networkState
      }));
      const pendingImages = Array.from(document.querySelectorAll("img"))
        .filter((img: HTMLImageElement) => !img.complete)
        .map((img: HTMLImageElement) => ({
          src: img.src?.slice(0, 100),
          loading: img.loading,
          className: img.className,
          parentClass: img.parentElement?.className
        }));

      return {
        readyState: document.readyState,
        windowLoaded: document.documentElement.dataset.windowLoaded === "true",
        title: document.title,
        pendingImagesCount: pendingImages.length,
        pendingImages: pendingImages.slice(0, 10),
        links,
        media,
        resourceCount: resources.length,
        slowestResources: resources.sort((a, b) => b.duration - a.duration).slice(0, 10),
        pendingLikeResources: resources.filter((r) => r.duration === 0 || r.duration > 2000)
      };
    }

    case "dock": {
      const sub = String(params.sub || "list").toLowerCase();
      const id = String(params.id || "").toLowerCase();

      if (sub === "modules") return { modules: listDockModuleMetadata(), compiledInOnly: true };

      if (sub === "list") {
        return {
          cards: DOCK_CARDS,
          tools: DOCK_TOOLS.map((t) => ({
            ...t,
            running: dockLifecycleController.isRunning(t.id),
            visible: dockLifecycleController.isVisible(t.id)
          }))
        };
      }

      if (!id) throw new Error("dock 命令需要指定目标应用 id，例如: monitor, workflow, stickers");

      if (sub === "open" || sub === "show") {
        dockLifecycleController.openApp(id);
        return { ok: true, action: "open", id, running: dockLifecycleController.isRunning(id), visible: dockLifecycleController.isVisible(id) };
      }

      if (sub === "hide") {
        dockLifecycleController.hideApp(id);
        return { ok: true, action: "hide", id, running: dockLifecycleController.isRunning(id), visible: false };
      }

      if (sub === "quit" || sub === "close") {
        const result = await dockLifecycleController.quitApp(id);
        if (result?.ok === false) return { ...result, action: "quit", id, running: dockLifecycleController.isRunning(id), visible: dockLifecycleController.isVisible(id) };
        return { ok: true, action: "quit", id, running: dockLifecycleController.isRunning(id), visible: dockLifecycleController.isVisible(id) };
      }

      if (sub === "reload" || sub === "restart") {
        const result = await dockLifecycleController.reloadApp(id);
        if (result?.ok === false) return { ...result, action: "reload", id, running: dockLifecycleController.isRunning(id), visible: dockLifecycleController.isVisible(id) };
        return { ok: true, action: "reload", id, running: dockLifecycleController.isRunning(id), visible: dockLifecycleController.isVisible(id) };
      }

      throw new Error(`未知的 dock 子命令: ${sub}`);
    }

    case "youtube": {
      const sub = String(params.sub || "status").toLowerCase();
      if (sub === "status") {
        return {
          currentView: youTubeState.currentView,
          exploreCount: youTubeState.exploreVideos.length,
          exploreFirst3: youTubeState.exploreVideos.slice(0, 3).map((v) => ({ title: v.title, channel: v.channelTitle })),
          favCount: youTubeState.favorites.length,
          isLoading: youTubeState.isLoading,
          error: youTubeState.error
        };
      }
      if (sub === "load-recommend") {
        // Explicit CLI read is independent of the card visibility signal.
        const vids = await youTubeService.loadRecommend(true, new AbortController().signal);
        return {
          count: vids.length,
          first3: vids.slice(0, 3).map((v) => ({ id: v.id, title: v.title, channel: v.channelTitle }))
        };
      }
      if (sub === "favorites") {
        const vids = await youTubeService.loadFavorites();
        return {
          count: vids.length,
          first3: vids.slice(0, 3).map((v) => ({ id: v.id, title: v.title }))
        };
      }
      throw new Error(`未知 youtube 子命令: ${sub}`);
    }

    case "dom": {
      const sub = String(params.sub || "click");
      const selector = String(params.selector || "");
      if (!selector) throw new Error("需要提供 CSS selector");
      const el = document.querySelector(selector) as HTMLElement | null;
      if (!el) throw new Error(`未找到匹配元素: ${selector}`);

      if (sub === "click") {
        const rect = el.getBoundingClientRect();
        const clientX = rect.left + rect.width / 2;
        const clientY = rect.top + rect.height / 2;
        const opts = { bubbles: true, cancelable: true, clientX, clientY, view: window };
        try {
          el.dispatchEvent(new PointerEvent("pointerdown", opts));
          el.dispatchEvent(new MouseEvent("mousedown", opts));
          el.dispatchEvent(new PointerEvent("pointerup", opts));
          el.dispatchEvent(new MouseEvent("mouseup", opts));
        } catch {
          // ignore
        }
        el.click();
        await new Promise((r) => setTimeout(r, 60));
        return { ok: true, clicked: selector, element: inspectElement(el) };
      }
      if (sub === "contextmenu") {
        const rect = el.getBoundingClientRect();
        const ev = new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
          button: 2
        });
        el.dispatchEvent(ev);
        await new Promise((r) => setTimeout(r, 60));
        return { ok: true, contextmenu: selector, element: inspectElement(el) };
      }
      if (sub === "input") {
        const val = String(params.value ?? "");
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          el.focus();
          el.value = val;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (el.isContentEditable) {
          el.focus();
          el.textContent = val;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
        await new Promise((r) => setTimeout(r, 60));
        return { ok: true, selector, value: val };
      }
      if (sub === "drag") {
        const dx = Number(params.dx || 100);
        const dy = Number(params.dy || 100);
        const rect = el.getBoundingClientRect();
        const startX = rect.left + 40;
        const startY = rect.top + 15;
        const downEv = new PointerEvent("pointerdown", { bubbles: true, cancelable: true, clientX: startX, clientY: startY, button: 0, pointerId: 1 });
        el.dispatchEvent(downEv);
        await new Promise((r) => setTimeout(r, 60));
        const moveEv = new PointerEvent("pointermove", { bubbles: true, cancelable: true, clientX: startX + dx, clientY: startY + dy, button: 0, pointerId: 1 });
        el.dispatchEvent(moveEv);
        window.dispatchEvent(moveEv);
        await new Promise((r) => setTimeout(r, 60));
        const upEv = new PointerEvent("pointerup", { bubbles: true, cancelable: true, clientX: startX + dx, clientY: startY + dy, button: 0, pointerId: 1 });
        el.dispatchEvent(upEv);
        window.dispatchEvent(upEv);
        await new Promise((r) => setTimeout(r, 100));
        return { ok: true, dragged: selector, dx, dy, finalRect: inspectElement(el).rect };
      }
      if (sub === "text") {
        return { ok: true, selector, text: (el.textContent || "").trim() };
      }
      throw new Error(`未知 dom 子命令: ${sub}`);
    }

    case "reload": {
      setTimeout(() => location.reload(), 80);
      return { ok: true, reloading: true, clientId: CLIENT_ID };
    }

    default:
      throw new Error(`未知 CLI 指令: ${action}`);
  }
}

async function pollLoop(): Promise<void> {
  while (running) {
    try {
      pollAbortController = new AbortController();
      const meta = {
        clientId: CLIENT_ID,
        role: "page",
        url: location.href,
        pathname: location.pathname,
        title: document.title,
        active: !document.hidden
      };
      const resp = await fetch(`${CLI_BROKER_URL}/poll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
        signal: pollAbortController.signal
      });

      if (!resp.ok) {
        await new Promise((r) => setTimeout(r, 2500));
        continue;
      }

      const data = await resp.json();
      if (data && data.command && data.requestId) {
        try {
          const result = await executeCommand(data.command);
          await fetch(`${CLI_BROKER_URL}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: data.requestId, ok: true, result })
          });
        } catch (err: any) {
          await fetch(`${CLI_BROKER_URL}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requestId: data.requestId,
              ok: false,
              error: err?.message || String(err)
            })
          }).catch(() => {});
        }
      }
    } catch {
      // Broker 未启动时静默等待，不污染控制台
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

export const cliBridgeRuntime = {
  start(): void {
    if (running || typeof window === "undefined") return;
    running = true;
    (window as any).LogicWeaverCLI = {
      exec: executeCommand
    };
    void pollLoop();
  },
  stop(): void {
    running = false;
    pollAbortController?.abort();
    pollAbortController = null;
  }
};
