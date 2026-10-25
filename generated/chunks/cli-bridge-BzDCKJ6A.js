import { f as M } from "./fullscreen-cards.store-C8zt8knq.js";
import { M as oe, N as re, l as m, h as z, y as w, q as ne, K as ae, O as G, P as se, Q as H, I as C, j as I, d as le, R as q, w as F, c as D, e as T, L as y, s as V, m as ce, F as de, C as ue } from "./search.service-CzxjlNxM.js";
import { k as me, w as pe, d as ge } from "./read-session-C1M3QoXl.js";
import { t as fe, a as Q, c as h, d as J, b as he } from "./main-workspace-store-R_88lOV_.js";
import { t as U } from "./module-state-EdOqm0KR.js";
import { r as be, e as we, s as Z } from "./sync.service-DTh6oAhK.js";
import { w as B } from "./webdav.service-BlfwrB2s.js";
import { b as k, c as f, d as W, r as O, e as Se, a as b } from "./bili-favorites-store-LYdQqMAq.js";
import { d as g } from "./dock-lifecycle.store-sB0Ll9yF.js";
import { y as ee } from "./youtube.service-CWf8dKym.js";
import { a as x } from "./youtube-store-DQLV3CK_.js";
const X = "http://127.0.0.1:19826", Y = `page_${Math.random().toString(36).slice(2, 9)}`;
let j = !1, A = null;
function ve(c) {
  const p = c.getBoundingClientRect(), i = window.getComputedStyle(c);
  return i.display !== "none" && i.visibility !== "hidden" && parseFloat(i.opacity || "1") > 0 && p.width > 0 && p.height > 0;
}
function P(c) {
  const p = c.getBoundingClientRect(), i = window.getComputedStyle(c);
  return {
    tag: c.tagName.toLowerCase(),
    id: c.id || void 0,
    className: typeof c.className == "string" ? c.className : void 0,
    title: c.title || void 0,
    src: c.src || void 0,
    text: (c.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
    visible: ve(c),
    rect: {
      left: Math.round(p.left * 10) / 10,
      top: Math.round(p.top * 10) / 10,
      right: Math.round(p.right * 10) / 10,
      bottom: Math.round(p.bottom * 10) / 10,
      width: Math.round(p.width * 10) / 10,
      height: Math.round(p.height * 10) / 10
    },
    style: {
      display: i.display,
      position: i.position,
      zIndex: i.zIndex,
      opacity: i.opacity,
      visibility: i.visibility,
      userSelect: i.userSelect,
      transform: i.transform !== "none" ? i.transform : void 0
    }
  };
}
function ye(c, p) {
  const i = c.rect, e = p.rect, o = Math.max(0, Math.min(i.right, e.right) - Math.max(i.left, e.left)), t = Math.max(0, Math.min(i.bottom, e.bottom) - Math.max(i.top, e.top)), n = o > 0 && t > 0, r = e.left >= i.right ? e.left - i.right : i.left >= e.right ? i.left - e.right : -o, a = e.top >= i.bottom ? e.top - i.bottom : i.top >= e.bottom ? i.top - e.bottom : -t;
  return {
    isOverlapping: n,
    overlapArea: Math.round(o * t),
    overlapX: Math.round(o * 10) / 10,
    overlapY: Math.round(t * 10) / 10,
    horizontalGap: Math.round(r * 10) / 10,
    verticalGap: Math.round(a * 10) / 10
  };
}
async function K(c) {
  const { action: p, params: i = {} } = c;
  switch (p) {
    case "status": {
      const e = m.getState();
      return {
        clientId: Y,
        url: location.href,
        pathname: location.pathname,
        title: document.title,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        pageMode: document.body?.dataset?.page || "home",
        hasCardFullscreen: document.body?.classList.contains("has-card-fullscreen") || !1,
        activeFullscreenCard: ue.activeId,
        activeDockTarget: de.activeTargetId,
        activeWindow: ge.activeId,
        todoistOpen: J.isOpen,
        todoistView: h.view,
        todoistActiveProject: h.activeProjectName,
        todoistTaskCount: h.columns.reduce((o, t) => o + (t.tasks?.length || 0), 0),
        search: {
          mode: y.mode,
          webScope: T.webScope,
          query: y.query,
          placeholder: y.placeholder,
          suggestionsCount: y.suggestions.length
        },
        launcher: {
          linksCount: e.links.length,
          foldersCount: Object.keys(e.folders || {}).length,
          pages: e.pages,
          activePage: e.activePage
        },
        bookmarks: {
          stripFoldersCount: F.folders.length,
          panelOpen: q.open
        },
        bili: {
          mode: f.organizer.mode,
          activeFolderId: f.activeFolderId,
          radioPlaying: b.playing,
          radioTitle: b.title,
          radioSeriesCount: f.radioSeries.length
        },
        music: {
          playing: w.playing,
          title: w.title,
          artist: w.artist
        },
        theme: {
          current: document.documentElement.dataset.theme,
          localStorageTheme: localStorage.getItem("theme"),
          currentWallpaper: localStorage.getItem("lw-current-wallpaper")
        }
      };
    }
    case "theme": {
      const e = i.name ? String(i.name) : void 0;
      if (e) {
        document.documentElement.dataset.theme = e;
        try {
          localStorage.setItem("theme", e), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: e });
        } catch {
        }
      }
      return {
        theme: document.documentElement.dataset.theme,
        localStorageTheme: localStorage.getItem("theme")
      };
    }
    case "nav": {
      const e = String(i.target || "home").toLowerCase();
      if (e === "home")
        ce.triggerItem("home", "home");
      else if (e === "bilibili" || e === "daily-bilibili")
        M.enter("daily-bilibili");
      else if (e === "github" || e === "card-github")
        M.enter("card-github");
      else if (e === "youtube" || e === "daily-youtube")
        M.enter("daily-youtube");
      else if (e === "aihot" || e === "daily-aihot")
        M.enter("daily-aihot");
      else if (e === "pricing" || e === "daily-pricing")
        M.enter("daily-pricing");
      else if (e === "todoist")
        he.open();
      else if (e === "settings")
        window.openSettingsModal?.() || pe.open("settings");
      else if (e === "daily")
        document.body && (document.body.dataset.page = "daily");
      else
        throw new Error(`未知导航目标: ${e}`);
      return await new Promise((o) => setTimeout(o, 80)), K({ action: "status" });
    }
    case "inspect": {
      const e = String(i.selector || "body"), o = i.compareSelector ? String(i.compareSelector) : "", t = Array.from(document.querySelectorAll(e)), n = t.slice(0, 20).map(P);
      let r;
      if (o) {
        const a = document.querySelector(o);
        if (t[0] && a) {
          const s = P(t[0]), l = P(a);
          r = {
            targetA: s,
            targetB: l,
            metrics: ye(s, l)
          };
        }
      }
      return {
        selector: e,
        matchCount: t.length,
        items: n,
        comparison: r
      };
    }
    case "qq-messages": {
      const e = window.__qqState, o = e?.activeSessionId, t = o && e?.messages ? e.messages[o] : [];
      return {
        activeSessionId: o,
        messageCount: t?.length || 0,
        messages: t?.slice(-15) || []
      };
    }
    case "search": {
      if (i.mode && T.setMode(i.mode), i.scope) {
        const e = i.scope;
        T.webScope = e;
        const o = {
          all: "搜索，或输入网址直接打开",
          bookmarks: "在书签中搜索…",
          launcher: "在常用网站中搜索…"
        };
        y.mode === "web" && o[e] && V.update({ placeholder: o[e] });
      }
      if (i.query !== void 0) {
        const e = String(i.query);
        V.update({ query: e }), e.trim() ? await T.fetchSuggestions(e.trim()) : V.setSuggestions([]);
      }
      return i.submit && T.submit(), {
        mode: y.mode,
        webScope: T.webScope,
        query: y.query,
        placeholder: y.placeholder,
        suggestions: y.suggestions.slice(0, 15)
      };
    }
    case "bookmarks": {
      const e = String(i.sub || "status");
      if (e === "status" || e === "folders") {
        const o = await le.getIgnoredFolders();
        return {
          stripEnabled: F.enabled,
          stripFolders: F.folders,
          panelOpen: q.open,
          panelItemsCount: q.items.length,
          ignoredFolders: Array.from(o)
        };
      }
      if (e === "search") {
        const o = String(i.query || "").trim();
        if (!o || typeof chrome > "u" || !chrome.bookmarks?.search)
          return { query: o, results: [] };
        const t = await chrome.bookmarks.search(o);
        return {
          query: o,
          count: t.length,
          results: t.slice(0, 30).map((n) => ({ id: n.id, title: n.title, url: n.url, parentId: n.parentId }))
        };
      }
      if (e === "panel") {
        const o = String(i.state || "toggle");
        return o === "open" ? D.updateState({ open: !0 }) : o === "close" ? D.updateState({ open: !1 }) : D.updateState({ open: !q.open }), { open: q.open };
      }
      throw new Error(`未知 bookmarks 子命令: ${e}`);
    }
    case "bili":
    case "bilibili": {
      const e = String(i.sub || "status");
      if (e === "mode") {
        const t = String(i.mode || "organizer");
        t === "radio" ? k.dispatch("open-radio") : t === "sub-video" ? k.dispatch("open-sub-video") : t === "feed" || t === "following" ? k.dispatch("open-following") : t === "rcmd" ? k.dispatch("open-recommendations") : t === "cache" ? k.dispatch("open-cache") : k.dispatch("organizer-open"), await new Promise((n) => setTimeout(n, 200));
      } else if (e === "folder")
        k.dispatch("select-folder", Number(i.folderId)), await new Promise((t) => setTimeout(t, 250));
      else if (e === "radio-play") {
        f.radioSeries.length || await W.init();
        const t = Number(i.index || 0);
        k.dispatch("radio-play-index", t), await new Promise((n) => setTimeout(n, 250));
      } else if (e === "radio-series") {
        f.radioSeries.length || await W.init();
        const t = String(i.seriesId || ""), n = Number(i.index || 0), r = f.radioSeries.find((a) => a.id === t || a.name === t);
        if (!r) throw new Error(`未找到电台系列: ${t}`);
        k.dispatch("radio-play-series", { id: r.id, startIndex: n }), await new Promise((a) => setTimeout(a, 250));
      } else if (e === "radio-toggle")
        O.togglePlay();
      else if (e === "radio-next")
        O.next();
      else if (e === "radio-prev")
        O.prev();
      else if (e === "radio-seek")
        O.seek(Number(i.percent || 0));
      else {
        if (e === "radio-repair")
          return await W.repairStoredSeries();
        if (e === "folders-list")
          return {
            folders: f.organizer.folders.map((t) => ({
              id: t.id,
              title: t.title,
              count: t.count
            }))
          };
        if (e === "list-folders") {
          const [t, n] = await Promise.all([
            I.getCreatedFolders().catch(() => []),
            I.getCollectedFolders().catch(() => ({ list: [], count: 0, has_more: !1 }))
          ]);
          return {
            created: (t || []).map((r) => ({
              id: r.id,
              title: r.title,
              count: r.media_count,
              type: "created"
            })),
            collected: (n.list || []).map((r) => ({
              id: r.id,
              title: r.title,
              count: r.media_count,
              upper: r.upper ? { mid: r.upper.mid, name: r.upper.name } : null,
              type: "collected"
            }))
          };
        } else if (e === "list-videos") {
          const t = i.folderId || i.folder;
          if (!t) throw new Error("缺少参数 folderId");
          const n = Number(i.page || i.pn || 1), r = Math.min(Number(i.pageSize || i.ps || 20), 50), a = String(i.order || "mtime"), s = await I.getFolderVideos(t, n, r, a);
          return {
            total: s.total,
            hasMore: s.hasMore,
            page: n,
            pageSize: r,
            folderInfo: {
              title: s.info?.title || "",
              media_count: s.info?.media_count || s.total
            },
            medias: (s.medias || []).map((l) => ({
              bvid: l.bvid,
              aid: l.id || l.aid,
              title: l.title,
              intro: l.intro,
              duration: l.duration,
              upper: l.upper ? { mid: l.upper.mid, name: l.upper.name } : null,
              pubtime: l.pubtime || l.ctime || 0,
              url: `https://www.bilibili.com/video/${l.bvid}`
            }))
          };
        } else if (e === "video-info") {
          const t = String(i.bvid || "");
          if (!t) throw new Error("缺少参数 bvid");
          const n = await I.getVideoView(t);
          return {
            bvid: n.bvid,
            aid: n.aid,
            title: n.title,
            desc: n.desc,
            duration: n.duration,
            owner: n.owner ? { mid: n.owner.mid, name: n.owner.name } : null,
            pages: (n.pages || []).map((r) => ({
              cid: r.cid,
              page: r.page,
              part: r.part,
              duration: r.duration
            }))
          };
        } else if (e === "video-subtitles") {
          const t = String(i.bvid || "");
          if (!t) throw new Error("缺少参数 bvid");
          const n = i.cid ? Number(i.cid) : void 0, r = await I.fetchVideoSubtitleDetails(t, n);
          return {
            bvid: t,
            cid: n || void 0,
            available: !!r.ok,
            reason: r.reason || (r.ok ? "" : "暂无可用字幕"),
            fullText: r.bodyText || "",
            charCount: (r.bodyText || "").length,
            cues: (r.cues || []).map((a) => ({
              from: a.from,
              to: a.to,
              content: a.content
            }))
          };
        } else if (e === "video-comments") {
          const t = i.aid ? String(i.aid) : "";
          if (!t) throw new Error("缺少参数 aid");
          const n = Number(i.page || i.pn || 1), r = Math.min(Number(i.pageSize || i.ps || 20), 40), a = Number(i.sort ?? 0), s = await I.api(
            `https://api.bilibili.com/x/v2/reply?type=1&oid=${t}&pn=${n}&ps=${r}&sort=${a}`
          ), l = Number(s?.upper?.mid || 0), E = s?.top?.upper || s?.top?.admin || null, N = Array.isArray(s?.replies) ? s.replies : [], u = (d) => {
            const $ = d.match(/https?:\/\/[^\s\u4e00-\u9fa5<>'"()[\]{}]+/gi) || [];
            return [...new Set($.map((R) => R.replace(/[.,;!?]+$/, "")))];
          }, S = (d, $ = !1) => {
            const R = String(d?.content?.message || ""), te = d?.content?.jump_url && typeof d.content.jump_url == "object" ? Object.values(d.content.jump_url).map((v) => v?.pc_url || v?.app_url_path).filter(Boolean) : [], ie = [.../* @__PURE__ */ new Set([...u(R), ...te])];
            return {
              rpid: d.rpid,
              oid: Number(t),
              mid: Number(d.mid || 0),
              uname: String(d.member?.uname || "B站用户"),
              message: R,
              is_top: $,
              is_up: Number(d.mid || 0) === l,
              like: Number(d.like || 0),
              rcount: Number(d.rcount || 0),
              ctime: Number(d.ctime || 0),
              timeText: new Date(Number(d.ctime || 0) * 1e3).toLocaleString(),
              extracted_links: ie,
              sub_replies_preview: Array.isArray(d.replies) ? d.replies.slice(0, 3).map((v) => ({
                rpid: v.rpid,
                mid: Number(v.mid || 0),
                uname: String(v.member?.uname || ""),
                message: String(v.content?.message || ""),
                is_up: Number(v.mid || 0) === l,
                extracted_links: u(String(v.content?.message || ""))
              })) : []
            };
          }, L = E && n === 1 ? S(E, !0) : null, _ = N.map((d) => S(d, !1));
          return L && !_.some((d) => d.rpid === L.rpid) && _.unshift(L), {
            aid: Number(t),
            page: n,
            pageSize: r,
            total: Number(s?.page?.count || 0),
            upperMid: l,
            hasTopComment: !!L,
            comments: _
          };
        } else if (e === "comment-replies") {
          const t = i.aid ? String(i.aid) : "", n = i.rootRpid || i.root;
          if (!t || !n) throw new Error("缺少参数 aid 或 rootRpid");
          const r = Number(i.page || i.pn || 1), a = Math.min(Number(i.pageSize || i.ps || 10), 30), s = await I.api(
            `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${n}&pn=${r}&ps=${a}`
          ), l = Number(s?.upper?.mid || 0), E = Array.isArray(s?.replies) ? s.replies : [], N = (u) => {
            const S = u.match(/https?:\/\/[^\s\u4e00-\u9fa5<>'"()[\]{}]+/gi) || [];
            return [...new Set(S.map((L) => L.replace(/[.,;!?]+$/, "")))];
          };
          return {
            aid: Number(t),
            rootRpid: n,
            page: r,
            pageSize: a,
            total: Number(s?.page?.count || 0),
            replies: E.map((u) => ({
              rpid: u.rpid,
              root: u.root,
              parent: u.parent,
              mid: Number(u.mid || 0),
              uname: String(u.member?.uname || "B站用户"),
              message: String(u.content?.message || ""),
              is_up: Number(u.mid || 0) === l,
              like: Number(u.like || 0),
              ctime: Number(u.ctime || 0),
              extracted_links: N(String(u.content?.message || ""))
            }))
          };
        } else if (e === "storage-debug") {
          const t = await (chrome?.storage?.local?.get ? chrome.storage.local.get(null) : Promise.resolve({})), n = await (chrome?.storage?.sync?.get ? chrome.storage.sync.get(null) : Promise.resolve({})), r = {};
          for (let a = 0; a < localStorage.length; a++) {
            const s = localStorage.key(a);
            s && (s.toLowerCase().includes("bili") || s.toLowerCase().includes("radio") || s.toLowerCase().includes("series")) && (r[s] = localStorage.getItem(s) || "");
          }
          return {
            chromeStorageLocalKeys: Object.keys(t),
            biliRadioSeriesV1: t.biliRadioSeriesV1,
            matchingLocal: Object.fromEntries(
              Object.entries(t).filter(([a]) => a.toLowerCase().includes("radio") || a.toLowerCase().includes("series") || a.toLowerCase().includes("bili"))
            ),
            matchingSync: Object.fromEntries(
              Object.entries(n).filter(([a]) => a.toLowerCase().includes("radio") || a.toLowerCase().includes("series") || a.toLowerCase().includes("bili"))
            ),
            localStorageMatching: r
          };
        }
      }
      const o = Se.getState();
      return {
        mode: f.organizer.mode,
        activeFolderId: f.activeFolderId,
        foldersCount: f.organizer.folders.length,
        videosCount: f.organizer.videos.length,
        radio: {
          active: b.active,
          playing: b.playing,
          loading: b.loading,
          seriesName: b.seriesName,
          title: b.title,
          trackIndex: b.trackIndex,
          totalTracks: b.totalTracks,
          formattedCurrent: b.formattedCurrent,
          formattedDuration: b.formattedDuration,
          lyric: b.lyric,
          queueCount: f.radioQueue.length,
          queue: f.radioQueue.map((t, n) => ({
            index: n,
            bvid: t.bvid,
            title: t.title,
            playing: o.active && o.index === n
          })),
          savedSeries: f.radioSeries.map((t) => ({
            id: t.id,
            name: t.name,
            count: t.count
          }))
        }
      };
    }
    case "github": {
      const e = String(i.sub || "status");
      e === "category" && i.category ? ne.select(String(i.category)) : e === "search" && i.query !== void 0 && ae.setSearchQuery(String(i.query));
      const o = i.fullName || i.query || i.category;
      e === "open-detail" && o ? (console.log("[CLI Bridge] Opening GitHub detail for:", o), G.open(String(o))) : e === "close-detail" && G.close();
      const t = se;
      return {
        receivedParams: i,
        detailDrawer: {
          isOpen: C.isOpen,
          fullName: C.fullName,
          stars: C.stars,
          language: C.language,
          headingsCount: C.headings.length,
          readmeLength: C.readmeMarkdown.length,
          isLoading: C.isLoading,
          error: C.error
        },
        folders: H.folders,
        activeFolder: H.folders.find((n) => n.active)?.title || "全部",
        totalItems: t.totalItems,
        loadedItems: t.loadedItems,
        page: t.page,
        totalPages: t.totalPages,
        sampleCards: t.cards.slice(0, 8).map((n) => ({
          fullName: n.fullName,
          folder: n.folder,
          stars: n.stars,
          description: n.description
        }))
      };
    }
    case "music": {
      const e = String(i.sub || "status");
      return e === "toggle" ? z.togglePlay() : e === "next" ? z.next() : e === "prev" && z.prev(), {
        playing: w.playing,
        title: w.title,
        artist: w.artist,
        formattedCurrent: w.formattedCurrent,
        formattedDuration: w.formattedDuration,
        mode: w.mode,
        isNetease: w.isNetease,
        favoritesCount: w.favorites.length
      };
    }
    case "launcher": {
      const e = String(i.sub || "list");
      if (await m.ready, e === "list") {
        const o = m.getState();
        return {
          linksCount: o.links.length,
          pages: o.pages,
          pageLabels: o.pageLabels,
          activePage: o.activePage,
          folders: o.folders,
          links: o.links
        };
      }
      if (e === "add") {
        let o = i.page ? String(i.page) : void 0;
        if (o) {
          const t = m.getState();
          for (const [n, r] of Object.entries(t.pageLabels || {}))
            if (r === o && t.pages.includes(n)) {
              o = n;
              break;
            }
        }
        return await m.saveLink({
          title: String(i.title || ""),
          url: String(i.url || ""),
          group: i.group ? String(i.group) : void 0,
          page: o,
          note: i.note ? String(i.note) : void 0
        }), { ok: !0, linksCount: m.getState().links.length };
      }
      if (e === "merge-page") {
        const o = String(i.from || ""), t = String(i.to || "");
        for (const n of m.getState().links)
          n.page === o && (n.page = t);
        return await m.deletePage(o), { ok: !0, pages: m.getState().pages, pageLabels: m.getState().pageLabels };
      }
      if (e === "delete-page") {
        const o = String(i.page || "");
        return await m.deletePage(o), { ok: !0, pages: m.getState().pages, pageLabels: m.getState().pageLabels };
      }
      if (e === "rename") {
        const o = String(i.id || ""), t = String(i.title || "").trim(), n = m.getState().links.find((r) => String(r.id) === o);
        if (!n) throw new Error(`未找到 ID 为 ${o} 的常用网站`);
        return await m.saveLink({ id: n.id, title: t, url: n.url, group: n.group, note: n.note }), { ok: !0, id: o, title: t };
      }
      if (e === "note") {
        const o = String(i.id || ""), t = String(i.note || "").trim();
        return await m.saveLinkNote(o, t), { ok: !0, id: o, note: t };
      }
      if (e === "delete")
        return await m.deleteLink(String(i.id || "")), { ok: !0, linksCount: m.getState().links.length };
      throw new Error(`未知 launcher 子命令: ${e}`);
    }
    case "todoist": {
      const e = String(i.sub || "status");
      if (!["status", "view", "project", "refresh"].includes(e)) throw new Error("未知 Todoist 子命令");
      if (e !== "status" && !U.active) throw new Error("Todoist 窗口未就绪或已隐藏；请先显式打开窗口，未执行读取。");
      if (e === "view") {
        const o = i.view || "inbox";
        if (!["inbox", "projects", "today"].includes(o)) throw new Error("Todoist 视图无效");
        await fe.switchView(o);
      } else e === "project" ? await Q.loadWorkspace("projects", String(i.projectId || "")) : e === "refresh" && await Q.loadWorkspace(
        h.view,
        h.activeProjectId,
        !0
      );
      if (e !== "status" && !U.active) throw new Error("Todoist 已隐藏，读取结果未应用；没有自动重新打开。");
      return {
        isOpen: J.isOpen,
        view: h.view,
        loading: h.loading,
        activeProjectId: h.activeProjectId,
        activeProjectName: h.activeProjectName,
        projects: h.projects,
        totalTaskCount: h.columns.reduce((o, t) => o + (t.tasks?.length || 0), 0),
        columns: h.columns.map((o) => ({
          sectionId: o.sectionId,
          title: o.title,
          taskCount: o.tasks.length,
          sampleTasks: o.tasks.slice(0, 5).map((t) => ({ id: t.id, content: t.content, dueText: t.dueText }))
        }))
      };
    }
    case "sync": {
      const e = String(i.sub || "status");
      if (e === "status") {
        const r = await be(), a = we(r);
        return {
          backupKind: "preferences",
          credentialsIncluded: !1,
          syncItemCount: a.count,
          byteLength: a.byteLength,
          quickLinksCount: Array.isArray(a.sanitized.quickLinks) ? a.sanitized.quickLinks.length : 0,
          keys: Object.keys(a.sanitized)
        };
      }
      const { loadWebDavSettings: o, toWebDavConfig: t } = await import("./settings-IMXKhcVf.js"), n = t(await o());
      if (e === "webdav-test")
        return await B.testConnection(n);
      if (e === "webdav-push")
        return await B.pushCurrentConfig(n);
      if (e === "webdav-pull")
        return await B.pullCurrentConfig(n);
      if (e === "cloud-push")
        return await Z.pushConfig();
      if (e === "cloud-pull")
        return await Z.pullConfig();
      throw new Error(`未知 sync 子命令: ${e}`);
    }
    case "eval": {
      const e = String(i.code || "");
      try {
        return { ok: !0, result: await new Function("return " + e)() };
      } catch (o) {
        return { ok: !1, error: o?.message || String(o) };
      }
    }
    case "diagnose-loading": {
      const e = performance.getEntriesByType("resource").map((r) => ({
        name: r.name,
        initiatorType: r.initiatorType,
        duration: Math.round(r.duration),
        transferSize: r.transferSize
      })), o = Array.from(document.querySelectorAll("link")).map((r) => ({
        rel: r.rel,
        href: r.href,
        sizes: r.sizes?.value,
        type: r.type
      })), t = Array.from(document.querySelectorAll("audio, video")).map((r) => ({
        tag: r.tagName,
        src: r.src?.slice(0, 100),
        id: r.id,
        className: r.className,
        parentTag: r.parentElement?.tagName,
        parentId: r.parentElement?.id,
        parentClass: r.parentElement?.className,
        paused: r.paused,
        muted: r.muted,
        readyState: r.readyState,
        networkState: r.networkState
      })), n = Array.from(document.querySelectorAll("img")).filter((r) => !r.complete).map((r) => ({
        src: r.src?.slice(0, 100),
        loading: r.loading,
        className: r.className,
        parentClass: r.parentElement?.className
      }));
      return {
        readyState: document.readyState,
        windowLoaded: document.documentElement.dataset.windowLoaded === "true",
        title: document.title,
        pendingImagesCount: n.length,
        pendingImages: n.slice(0, 10),
        links: o,
        media: t,
        resourceCount: e.length,
        slowestResources: e.sort((r, a) => a.duration - r.duration).slice(0, 10),
        pendingLikeResources: e.filter((r) => r.duration === 0 || r.duration > 2e3)
      };
    }
    case "dock": {
      const e = String(i.sub || "list").toLowerCase(), o = String(i.id || "").toLowerCase();
      if (e === "modules") return { modules: me(), compiledInOnly: !0 };
      if (e === "list")
        return {
          cards: oe,
          tools: re.map((t) => ({
            ...t,
            running: g.isRunning(t.id),
            visible: g.isVisible(t.id)
          }))
        };
      if (!o) throw new Error("dock 命令需要指定目标应用 id，例如: monitor, workflow, stickers");
      if (e === "open" || e === "show")
        return g.openApp(o), { ok: !0, action: "open", id: o, running: g.isRunning(o), visible: g.isVisible(o) };
      if (e === "hide")
        return g.hideApp(o), { ok: !0, action: "hide", id: o, running: g.isRunning(o), visible: !1 };
      if (e === "quit" || e === "close") {
        const t = await g.quitApp(o);
        return t?.ok === !1 ? { ...t, action: "quit", id: o, running: g.isRunning(o), visible: g.isVisible(o) } : { ok: !0, action: "quit", id: o, running: g.isRunning(o), visible: g.isVisible(o) };
      }
      if (e === "reload" || e === "restart") {
        const t = await g.reloadApp(o);
        return t?.ok === !1 ? { ...t, action: "reload", id: o, running: g.isRunning(o), visible: g.isVisible(o) } : { ok: !0, action: "reload", id: o, running: g.isRunning(o), visible: g.isVisible(o) };
      }
      throw new Error(`未知的 dock 子命令: ${e}`);
    }
    case "youtube": {
      const e = String(i.sub || "status").toLowerCase();
      if (e === "status")
        return {
          currentView: x.currentView,
          exploreCount: x.exploreVideos.length,
          exploreFirst3: x.exploreVideos.slice(0, 3).map((o) => ({ title: o.title, channel: o.channelTitle })),
          favCount: x.favorites.length,
          isLoading: x.isLoading,
          error: x.error
        };
      if (e === "load-recommend") {
        const o = await ee.loadRecommend(!0, new AbortController().signal);
        return {
          count: o.length,
          first3: o.slice(0, 3).map((t) => ({ id: t.id, title: t.title, channel: t.channelTitle }))
        };
      }
      if (e === "favorites") {
        const o = await ee.loadFavorites();
        return {
          count: o.length,
          first3: o.slice(0, 3).map((t) => ({ id: t.id, title: t.title }))
        };
      }
      throw new Error(`未知 youtube 子命令: ${e}`);
    }
    case "dom": {
      const e = String(i.sub || "click"), o = String(i.selector || "");
      if (!o) throw new Error("需要提供 CSS selector");
      const t = document.querySelector(o);
      if (!t) throw new Error(`未找到匹配元素: ${o}`);
      if (e === "click") {
        const n = t.getBoundingClientRect(), r = n.left + n.width / 2, a = n.top + n.height / 2, s = { bubbles: !0, cancelable: !0, clientX: r, clientY: a, view: window };
        try {
          t.dispatchEvent(new PointerEvent("pointerdown", s)), t.dispatchEvent(new MouseEvent("mousedown", s)), t.dispatchEvent(new PointerEvent("pointerup", s)), t.dispatchEvent(new MouseEvent("mouseup", s));
        } catch {
        }
        return t.click(), await new Promise((l) => setTimeout(l, 60)), { ok: !0, clicked: o, element: P(t) };
      }
      if (e === "contextmenu") {
        const n = t.getBoundingClientRect(), r = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: n.left + n.width / 2,
          clientY: n.top + n.height / 2,
          button: 2
        });
        return t.dispatchEvent(r), await new Promise((a) => setTimeout(a, 60)), { ok: !0, contextmenu: o, element: P(t) };
      }
      if (e === "input") {
        const n = String(i.value ?? "");
        return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement ? (t.focus(), t.value = n, t.dispatchEvent(new Event("input", { bubbles: !0 })), t.dispatchEvent(new Event("change", { bubbles: !0 }))) : t.isContentEditable && (t.focus(), t.textContent = n, t.dispatchEvent(new Event("input", { bubbles: !0 }))), await new Promise((r) => setTimeout(r, 60)), { ok: !0, selector: o, value: n };
      }
      if (e === "drag") {
        const n = Number(i.dx || 100), r = Number(i.dy || 100), a = t.getBoundingClientRect(), s = a.left + 40, l = a.top + 15, E = new PointerEvent("pointerdown", { bubbles: !0, cancelable: !0, clientX: s, clientY: l, button: 0, pointerId: 1 });
        t.dispatchEvent(E), await new Promise((S) => setTimeout(S, 60));
        const N = new PointerEvent("pointermove", { bubbles: !0, cancelable: !0, clientX: s + n, clientY: l + r, button: 0, pointerId: 1 });
        t.dispatchEvent(N), window.dispatchEvent(N), await new Promise((S) => setTimeout(S, 60));
        const u = new PointerEvent("pointerup", { bubbles: !0, cancelable: !0, clientX: s + n, clientY: l + r, button: 0, pointerId: 1 });
        return t.dispatchEvent(u), window.dispatchEvent(u), await new Promise((S) => setTimeout(S, 100)), { ok: !0, dragged: o, dx: n, dy: r, finalRect: P(t).rect };
      }
      if (e === "text")
        return { ok: !0, selector: o, text: (t.textContent || "").trim() };
      throw new Error(`未知 dom 子命令: ${e}`);
    }
    case "reload":
      return setTimeout(() => location.reload(), 80), { ok: !0, reloading: !0, clientId: Y };
    default:
      throw new Error(`未知 CLI 指令: ${p}`);
  }
}
async function ke() {
  for (; j; )
    try {
      A = new AbortController();
      const c = {
        clientId: Y,
        role: "page",
        url: location.href,
        pathname: location.pathname,
        title: document.title,
        active: !document.hidden
      }, p = await fetch(`${X}/poll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
        signal: A.signal
      });
      if (!p.ok) {
        await new Promise((e) => setTimeout(e, 2500));
        continue;
      }
      const i = await p.json();
      if (i && i.command && i.requestId)
        try {
          const e = await K(i.command);
          await fetch(`${X}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestId: i.requestId, ok: !0, result: e })
          });
        } catch (e) {
          await fetch(`${X}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requestId: i.requestId,
              ok: !1,
              error: e?.message || String(e)
            })
          }).catch(() => {
          });
        }
    } catch {
      await new Promise((c) => setTimeout(c, 3e3));
    }
}
const Oe = {
  start() {
    j || typeof window > "u" || (j = !0, window.LogicWeaverCLI = {
      exec: K
    }, ke());
  },
  stop() {
    j = !1, A?.abort(), A = null;
  }
};
export {
  Oe as cliBridgeRuntime
};
