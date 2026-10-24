# LogicWeaver architecture and historical migration ledger

> For current source entry points, read [docs/CURRENT_STATE.md](docs/CURRENT_STATE.md) and [AGENTS.md](AGENTS.md). Home is the Vue SPA, manifest uses `generated/background.js`, and the sidebar is `sidepanel.html` (not Popup). Runtime registration is defined by `src/modules/builtins.ts`.
> Most of this file is an archived migration ledger. Its classic-script globals, fallback renderers, test-coverage statements and registration advice are not current engineering instructions; do not restore deleted files or run old tests to satisfy it.

> Current guidance: use `AGENTS.md` and `docs/MODULE_INDEX.md`. Most sections below are a historical migration ledger, not instructions to restore deleted scripts or run obsolete tests. Current validation is `npm run check` and `git diff --check`; assertions/headless E2E are prohibited by project policy. Isolated packaging is documented in `docs/RELEASE_BUILD.md`.

## Superseded entry-point snapshot

The following paragraph records an earlier migration stage, not today's script-load list: `newtab.html` loads `theme-init.js`, an inline loader watchdog and the Vue/TypeScript bundle `generated/vue-ui.js`; it no longer loads the historical `newtab-*.js` dashboard scripts. `bilibili.html` loads the Vue bundle without legacy Bilibili action/player scripts; cached-video IO and playback lyrics now live in `src/bilibili/cache.service.ts` and `src/bilibili/playback-sync.ts`. `newtab.js` and `newtab-discovery.js` have been deleted after the GitHub independent page moved to `GitHubWorkspaceCard.vue`; the main newtab, Bilibili, AI HOT, pricing, YouTube and GitHub pages, options and popup, search launcher, ArkPets settings, and standalone sticker UIs now load Vue entry bundles without their classic UI scripts. The browser service worker, first-paint theme bootstrap, and MAIN/ISOLATED Xiaoheihe capture scripts remain plain JavaScript by design. The interactive page-localizer content script now bundles a Vue Shadow DOM editor into one classic IIFE for MV3 injection. The redirect-only `newtab-bootstrap.html` now uses a tiny compiled TS entry instead of Vue; the opaque-origin `wallpaper-sandbox.html` uses an isolated single-file TS-to-IIFE build rather than Vue modules. `mobile.html` belongs to the separate Capacitor/Android mobile application, not the extension manifest; its native UI has not been ported to Vue. Vue mounts the home SPA through `src/core/ui-features.ts` and `src/App.vue`; the unused dynamic-island registry has been removed; `src/core/globals.ts` and `ui-features.ts` retain compatibility APIs and the non-SPA island registry. Vite writes bundles to `generated/`; Chrome/Edge loads the repository directly, with no Node.js runtime. For the current domain map see [docs/MODULE_INDEX.md](docs/MODULE_INDEX.md). The ledger below is historical and must not be used as a current script-load list.

## Historical rationale for splitting the dashboard

The historical `newtab.js` and `newtab.css` became integration monoliths: unrelated features shared one file, merge conflicts were easy, domain ownership was unclear, and reviewing or removing a feature required scanning thousands of lines. The browser could execute them, but maintainability and regression isolation were poor.

The established dashboard uses ordered, domain-oriented classic scripts and stylesheets. Code order, CSS cascade order, storage keys and DOM IDs remain stable while bounded Vue islands are introduced through a local build layer; no remote runtime code is used.

## Historical JavaScript load order (archival; not the current home entry)

The following order describes the pre-SPA dashboard. Do not re-add these scripts to `newtab.html` based on this ledger:

1. `theme-init.js` — synchronous first-paint theme/loader decision.
2. `generated/vue-ui.js` is the single-root Vue SPA bundle, with lazy workspace/dialog views. The former top-bar workspace stripe, schedule/traffic/VPS probes and Phone Link status/SMS chain are retired, including their native routes and readers. Weather, calendar/Todoist and independent mobile-file notifications remain; current source and `docs/CURRENT_STATE.md` override historical island migration entries.
3. `window-tabs.js` — retained-window focus, tab and freeze infrastructure. `books.js` and `obsidian.js` are loaded on demand rather than in the initial HTML.
4. `newtab.js` — shared storage/helpers, clock, and foundational Bilibili requests.
5. Historical `newtab-youtube.js` (now deleted), `newtab-profile-hub.js`, `newtab-channels.js` — YouTube, avatar information and aggregated subscription channels.
6. `newtab-todoist.js`, `newtab-calendar.js` — Todoist workspace, timers, task facade and calendar integration.
7. `newtab-github.js`, `newtab-system.js`, `newtab-home-layout.js` — GitHub, device probes and homepage geometry.
8. `newtab-launcher-data.js`, `newtab-bookmarks.js`, `newtab-launchers.js` — launcher persistence, browser bookmarks and launcher rendering.
9. Historical classic workspace entries are no longer authoritative; the former dual-pane bookmark/launcher explorer has been removed. See `docs/MODULE_INDEX.md` for current Vue entry points.
10. Historical `newtab-discovery.js`, `newtab-shell.js`, `newtab-bilibili-subtitles.js`, `newtab-bilibili-tools.js`, `newtab-bilibili-organizer.js`, and `newtab-bilibili-channels.js` — the old discovery, shell, Bilibili subtitle, player, organizer, and UP-channel scripts. The old tools file is now deleted; do not restore these scripts to `bilibili.html`.
11. `newtab-ai.js`, `newtab-tools.js`, `newtab-boot.js` — local AI bridge UI, tool workspaces and startup orchestration.
12. `music.js`, `newtab-agents.js` and `pet.js` — independent media, agent launcher and desktop-pet surfaces.

The established dashboard domains are strict-mode classic scripts, not ES modules. Every split dashboard file starts with `"use strict";` so the original monolith's runtime semantics are preserved. Existing top-level lexical bindings are intentionally shared across ordered files while they are migrated incrementally. New Vue/TypeScript islands are source modules under `src/`, must communicate with legacy code through a narrow typed facade, and must not introduce additional implicit globals.

`window.LogicWeaverApp` is the lifecycle registry. A domain can register `mount(context)`, `refresh(context)` and `unmount(context)` hooks; the registry rejects duplicate names, deduplicates concurrent mounts, guarantees one active mount, and owns a disposable resource scope for that module. YouTube, the avatar profile hub, Todoist and system status now own their startup listeners and timers instead of placing those details in `newtab-boot.js`.

Each resource scope provides tracked `listen()`, `interval()`, `timeout()`, `controller()` and custom `add(cleanup)` operations. `pagehide` performs synchronous scope disposal, preventing tracked listeners, timers and requests from leaking across page lifetime. New cross-domain capabilities should use a narrow explicit `window.LogicWeaver…` API rather than adding implicit shared state. The former VPS facade and top-bar device probes have been deleted; historical examples below are not an instruction to restore them.

## Historical Vue-island build and ownership snapshot

- Install dependencies with `npm install --include=dev` when `NODE_ENV=production` is set on the machine.
- Run `npm run ui:typecheck` for Vue/TypeScript validation.
- Run `npm run ui:build` after changing Vue/TypeScript sources under `src/` (currently intro, notifications, weather, clock, search, music, launchers, profile, workspaces, dock, calendar, GitHub, Todoist and core registries); the extension loads `generated/vue-ui.js` directly.
- The startup loader keeps immediate static markup as a build-failure fallback. Validated GitHub and Calendar roots are intentionally empty and have no second renderer; Vue is their sole view owner. The generic mount helper can only restore markup that a root actually contains.
- `src/notifications/` owns the Windows-style toast queue, five-item bound, fingerprint deduplication, timeout pause/resume and safe text rendering. `newtab-profile-hub.js` retains a DOM fallback and maps domain-specific click actions into the typed notification controller.
- The former `src/schedule/`, `src/system/`, `src/traffic/` and `src/phone/` feature files are removed. Calendar projections no longer read/import local course data or bulk-create Google course events. Existing Google events remain ordinary user data.
- `src/services/mobile-files.service.ts` retains independent mobile-file notifications and clipboard actions. It has no VPS URL, probe interval, phone-state poller or SMS/contact/notification-database reader.
- `src/weather/` owns the reactive first-screen weather widget (`WeatherWidget.vue`). `newtab-discovery.js` fetches Open-Meteo forecasts and geocoding, publishing typed weather snapshots through `window.LogicWeaverWeather` while preserving DOM fallback.
- `src/clock/` owns the reactive first-screen center clock widget (`HeroClock.vue`). `newtab.js` manages clock interval ticks, font/color/timezone personalization, publishing typed snapshots through `window.LogicWeaverClock` while preserving DOM fallback.
- `src/search/` owns the reactive first-screen search box (`SearchBox.vue`). `newtab-discovery.js` manages search query input, mode switching (web/bilibili/github/netease), hotkeys, and suggestion containers, publishing typed snapshots through `window.LogicWeaverSearch` while preserving classic DOM fallback.
- `src/music/` owns the reactive first-screen music player card (`HomeMusicCard.vue`). `music.js` manages audio streams, Bilibili radio, albums, song lists, waveform visualizer and lyrics, publishing typed snapshots through `window.LogicWeaverHomeMusic` while preserving classic DOM fallback.
- `src/launchers/` owns the launcher groups view. `src/launcher/runtime.ts` coordinates initialization, menu/folder actions and cross-tab storage updates via `launcher.service.ts`; dialog stores own edits, moves, merges and icon selection. `newtab-launchers.js` is a thin command facade; `newtab-launcher-data.js` still provides legacy data helpers and home preference integration.
- `src/profile/` owns the reactive profile and performance right-click menu (`ProfileMenu.vue`). `newtab-profile-hub.js` manages performance sampling, user info and Bilibili account links, publishing actions through `window.LogicWeaverProfileMenu` while preserving classic DOM fallback.
- `src/workspaces/` owns the reactive top-bar workspace launchers (`WorkspaceLaunchers.vue`). It preserves all 13 native button IDs, coordinating tool activation through `window.LogicWeaverWorkspaceLaunchers` and `window.LogicWeaverWindowTabs`.
- `src/dock/` owns the reactive bottom macOS-style dock bar (`MacDock.vue`). Fullscreen card state is managed in `src/core/fullscreen-cards.store.ts`, shelf navigation in `src/shelf/runtime.ts`, radial navigation in `src/nav-wheel/runtime.ts`, and tool shortcuts in `src/services/shortcut.service.ts`. `newtab-shell.js` retains theme, settings-window and traffic bridges.
- Startup duration is not artificially extended. Real milestones at 8/24/52/66/82/96/100 drive the UI; the existing eight-second degraded-mode escape remains a failure boundary so a broken local initialization cannot permanently cover the dashboard.
- Future islands should be migrated one bounded workspace at a time. Shared cross-cutting UI belongs in the existing Vue bundle and a typed controller; do not create feature-specific global APIs or rewrite unrelated legacy domains as part of a feature change.

## Historical shared-infrastructure snapshot

- `window.LogicWeaverFeatures` is the typed lifecycle registry for Vue islands. Definitions declare roots, capabilities, eager order and one mount/cleanup boundary; failed mounts expose `status: "failed"` and an error string, while the generic island mount helper restores captured fallback markup after synchronous mount failure. `pagehide` stops all mounted islands.
- `window.LogicWeaverCommands` is the framework-neutral command registry. Commands expose metadata and search while keeping executable callbacks private, support drop/replace/parallel concurrency policies, and receive an AbortSignal. Current commands cover intro skip, notification clear, weather refresh/change-location, clock open-settings, search focus/cycle-mode, music toggle-play/next/prev/toggle-picker/open-panel, launcher next-page/prev-page, profile show-info/refresh, workspace open-ai/open-todoist/open-obsidian, dock go-home/open-bilibili/open-github, calendar open/refresh/today, GitHub refresh and Todoist open/refresh/quick-add; later workspaces should register actions here instead of creating new global functions.
- `window.LogicWeaverStorage` owns Promise-based local storage access. `repository(keys)` creates a domain facade that rejects writes outside its allowlisted keys; Todoist timers are the first migrated repository.
- `window.LogicWeaverHttp` owns timeout-aware requests, external AbortSignal forwarding, JSON status validation and in-flight keyed JSON deduplication.
- `window.LogicWeaverAssets` deduplicates optional local script loading. `books.js` and `obsidian.js` are parsed only when their workspaces are first opened, while their HTML shells remain available for immediate placement feedback.
- Background-to-Native fixed commands are declared in the `nativeMessageRoutes` allowlist rather than an expanding conditional chain.
- The Linux.do bot companion requests `https://web.telegram.org/*` only as an optional permission. `telegram-linuxdo-bridge.js` validates a fixed bot chat and command allowlist, reads only the active bot response DOM, and never accesses Telegram cookies or local databases.
- `window.LogicWeaverGitHubStatus` owns safe rendering of GitHub action messages and n8n synchronization state. `window.LogicWeaverGitHubFolders` owns folder navigation rendering, selection events and repository drop targets. `window.LogicWeaverGitHubHero` owns the active-category summary and delegates refresh, folder creation and AI actions through typed callbacks. `window.LogicWeaverGitHubRepositories` owns safe Star-card, local-search-result and paging rendering while delegating detail, context-menu, selection, category and drag actions. `newtab-github.js` still owns GitHub API/cache, repository data derivation, folder mutations, context menus and writes, and publishes typed snapshots/action adapters through those controllers. GitHub repository cards operate under a dual-path architecture: `GitHubRepositories.vue` is the primary path (mounting to `#vue-github-repositories-root` without `data-vue-recovery`); `ensureGhVueViews()` and `renderGhEmergencyRepositories()` serve as an abnormal fallback recovery path (`data-vue-recovery="1"`), which restarts the island feature and provides local DOM rendering if Vue cards fail to render. Transient menus use one tracked cleanup owner so delayed document listeners cannot survive menu replacement. `window.LogicWeaverGitHub` is the narrow refresh command facade.
- `window.LogicWeaverTodoistLabels` owns safe label-chip rendering and native label drag payloads; `window.LogicWeaverTodoistWorkspace` owns inbox/project tab state and view-switch events. The task board, kinetic sorting, editors and Todoist API/cache remain in `newtab-todoist.js`, exposed through the narrow `window.LogicWeaverTodoist` command facade. Todoist navigation and labels deliberately retain their verified classic fallback until the current project workflow receives a separate migration pass. Todoist retains 12 core workflow boundaries in classic JavaScript: (1) project entries and navigation tabs, (2) project list selector and active project state, (3) historical cache storage keys (`todoistWorkspaceCacheV1`, `todoistTaskColorsV1`; the former section-role preference has since been retired), (4) active project state restoration, (5) multi-column task board with section ordering, (6) task drawer detail editor, (7) column/task kinetic drag-sorting, (8) 'Q' key quick-add action, (9) task field mutation pipelines, (10) cross-project task relocation, (11) optimistic task completion and deletion, and (12) Todoist REST API v2 write queue with beforeunload background sync.
- `window.LogicWeaverTodoistTasks` is the calendar's only Todoist bridge: it lists active tasks, updates a task due date through official API v1, and emits narrow task-change events. `newtab-calendar.js` still owns Todoist/Google services, DayLine, drag writes and geometry; it publishes typed month/detail snapshots and action adapters through `window.LogicWeaverCalendarView`. Vue exclusively owns the floating month grid, date selection, month navigation, today and detail-close events; the removed classic month renderer is not a fallback. `window.LogicWeaverCalendar` remains the compatibility facade for opening, refreshing and drop targeting.
- Small DOM changes should update stable nodes in place. Todoist label drops, for example, patch only the card metadata instead of rebuilding all columns.

## Migration cleanup ledger

> Historical entries below are not current feature requirements: the user has since retired the top-bar workspace stripe and all schedule/traffic/VPS/Phone Link status/SMS chains, including legacy fallbacks. Do not restore them from this ledger. See CURRENT_STATE and AGENTS for current scope.

- **GitHub added:** typed Vue status, folder, hero and repository views; explicit action adapters; centralized transient-menu cleanup; emergency recovery fallback path (`renderGhEmergencyRepositories`) for runtime fault tolerance.
- **GitHub removed:** classic Star-card construction, folder/hero/status/paging rendering, DOM-derived batch selection, migrated-control listeners and obsolete global action exports.
- **Calendar added:** typed 42-cell month/detail snapshots and Vue-owned navigation, selection and task-drop events.
- **Calendar removed:** classic floating month/detail DOM construction, duplicate navigation/detail listeners and static month markup. The separate Todoist DayLine calendar remains classic by design.
- **Traffic added:** typed Vue traffic status island (`TrafficStatus.vue`, `trafficStatusController`), commands (`traffic.refresh`, `traffic.set-quota`), reactive quota calculation, and real Chrome DOM test coverage.
- **Traffic boundary:** the workspace bar's request and quota handling live in `src/schedule/runtime.ts`; `newtab-shell.js` retains its separate legacy traffic bridge.
- **Schedule added:** typed Vue ClassIsland schedule bar (`ScheduleBar.vue`, `scheduleController`), commands (`schedule.prev`, `schedule.next`, `schedule.today`), dynamic course timing status (current/passed), and real Chrome DOM test coverage.
- **Schedule migrated:** local JSON loading, date calculation and minute updates now live in `src/schedule/runtime.ts`, with lifecycle cleanup.
- **Phone Link added:** typed Vue Phone Link status island (`PhoneStatus.vue`, `phoneStatusController`), commands (`phone.refresh`, `phone.open-sms`), reactive connection/battery status, and real Chrome DOM test coverage.
- **Phone Link retained:** classic Phone Link native bridge messaging, SMS monitor background polling, expanding SMS panel behavior, and DOM element fallback in `newtab-launchers.js`.
- **Weather added:** typed Vue weather widget island (`WeatherWidget.vue`, `weatherController`), commands (`weather.refresh`, `weather.change-location`), reactive forecast/hourly/daily calculation, and real Chrome DOM test coverage.
- **Weather retained:** classic Open-Meteo geocoding and forecast requests, right-click location context menu (`showWeatherLocationContextMenu`), pet weather bubble sync, and classic DOM element fallback in `newtab-discovery.js`.
- **Hero Clock added:** typed Vue center clock island (`HeroClock.vue`, `clockController`), command (`clock.open-settings`), reactive font/color/timezone state and time ticks, and real Chrome DOM test coverage.
- **Hero Clock retained:** classic local storage configuration persistence, right-click context menu (`showClockContextMenu`), seconds tick interval in `newtab-boot.js`, and classic DOM element fallback in `newtab.js`.
- **Search Box added:** typed Vue search box island (`SearchBox.vue`, `searchController`), commands (`search.focus`, `search.cycle-mode`), reactive search mode/query state, and real Chrome DOM test coverage.
- **Search Box retained:** classic multi-engine search submission, suggestions fetch and render, hotkey bindings (`Ctrl+K`, `/`), and classic DOM element fallback in `newtab-discovery.js`.
- **Home Music Player added:** typed Vue home music island (`HomeMusicCard.vue`, `homeMusicController`), commands (`music.toggle-play`, `music.next`, `music.prev`, `music.toggle-picker`, `music.open-panel`), reactive playback/progress/track/picker snapshots, and real Chrome DOM test coverage.
- **Home Music Player retained:** classic audio element events, Bilibili radio stream, album/lyric background loader, waveform visualizer canvas painting, and classic DOM element fallback in `music.js`.
- **Launcher Groups added:** typed Vue launcher groups island (`LauncherGroups.vue`, `launcherGroupsController`), commands (`launcher.next-page`, `launcher.prev-page`; the old `launcher.open-explorer` was removed with the dual-pane window), reactive partition tabs and grouped folder derivation, and real Chrome DOM test coverage.
- **Launcher Groups retained:** classic link and folder drag-and-drop kinetics, folder dismissal/delete modal dialogs, nav wheel target injection, bookmark multi-core worker search, and classic DOM element fallback in `newtab-launchers.js`.
- **Profile Menu added:** typed Vue profile menu island (`ProfileMenu.vue`, `profileMenuController`), commands (`profile.show-info`, `profile.refresh`), reactive position/visibility snapshots, and real Chrome DOM test coverage.
- **Profile Menu retained:** classic Bilibili user API, cache clearing, performance sampling, context menu positioning, and classic DOM element fallback in `newtab-profile-hub.js`.
- **Workspace Launchers added:** typed Vue workspace launchers island (`WorkspaceLaunchers.vue`, `workspaceLaunchersController`), commands (`workspace.open-ai`, `workspace.open-channels`, `workspace.open-todoist`, `workspace.open-obsidian`), full retention of all 13 native button IDs, and real Chrome DOM test coverage.
- **Workspace Launchers retained:** classic button ID targeting, `window-tabs.js` lazy-loading activation, dynamic button appending in `music.js` and `pet.js`, and classic DOM element fallback.
- **Mac Dock added:** typed Vue dock island (`MacDock.vue`, `macDockController`), commands (`dock.go-home`, `dock.open-bilibili`, `dock.open-github`), reactive activeTarget/activeTools status, and real Chrome DOM test coverage.
- **Mac Dock retained:** classic bouncing click physics, fullscreen card transitions, tool shortcuts in `newtab-shell.js`, and classic DOM element fallback.
- **Phone SMS Panel added:** typed Vue phone sms/notifications panel island (`PhoneSmsPanel.vue`, `phonePanelController`), commands (`phone.toggle-sms-panel`, `phone.refresh-sms`), reactive tab switching, clipboard code copy, and real Chrome DOM test coverage.
- **Phone SMS Panel retained:** classic Phone Link message polling, notification bridge, zero-retention privacy clearing on close in `newtab-launchers.js`, and classic DOM element fallback.
- **Background Library added:** typed Vue background library island (`BackgroundLibrary.vue`, `wallpaperLibraryController`), commands (`wallpaper.open-dialog`, `wallpaper.close-dialog`, `wallpaper.reset`), reactive wallpaper history & active item tracking, and real Chrome DOM test coverage.
- **Background Library retained:** classic IndexedDB binary persistence, File System API directory picking, dragging events, and classic DOM fallback.
- **Profile Panel added:** typed Vue profile panel and micro-architecture tech drawer island (`ProfilePanel.vue`, `profilePanelController`), commands (`profile.open-panel`, `profile.close-panel`, `profile.toggle-tech-drawer`), reactive hardware/memory/WebGL/Canvas fingerprint sampling, and real Chrome DOM test coverage.
- **Profile Panel retained:** classic Bilibili user API, cache clearing, performance sampling timer, and classic DOM element fallback.
- **Bookmark Note Menu added:** typed Vue bookmark context menu island (`BookmarkNoteMenu.vue`, `bookmarkMenuController`), command (`bookmark.close-menu`), 5 responsive modes (actions/launcher/rename/note/delete), and real Chrome DOM test coverage.
- **Bookmark Note Menu retained:** classic Edge/Chrome bookmarks API synchronization, folder hierarchy tree pinning, and classic DOM element fallback.
- **Launcher Dialogs added:** typed Vue launcher dialogs island (`LauncherDialogs.vue`, `launcherDialogsController`), commands (`launcher.open-edit-dialog`, `launcher.open-icon-picker`), unified management of edit, merge, folder move, link move, and icon picker dialogs, and real Chrome DOM test coverage.
- **Launcher Dialogs retained:** classic link and folder mutations, multi-source icon fetching, and classic DOM element fallback.
- **Settings Dialog added:** typed Vue settings dialog island (`SettingsDialog.vue`, `settingsController`), commands (`settings.open`, `settings.close`), reactive iframe embedding and modal open/close state, and real Chrome DOM test coverage.
- **Settings Dialog retained:** classic iframe options embedding, window tabs integration, drag handle, and classic DOM fallback.
- **Traffic Quota Dialog added:** typed Vue traffic quota adjustment modal island (`TrafficQuotaDialog.vue`, `trafficQuotaController`), commands (`traffic.open-quota-dialog`, `traffic.close-quota-dialog`), preset selection (100-500 GB), and real Chrome DOM test coverage.
- **Traffic Quota Dialog retained:** classic F50 Pro data plan storage persistence, status refresh triggering, and classic DOM element fallback.
- **Clock Settings Menu added:** typed Vue clock settings context menu island (`ClockSettingsMenu.vue`, `clockSettingsController`), commands (`clock.open-settings-menu`, `clock.close-settings-menu`), reactive font/color/timezone selections, pointerdown dismiss, and real Chrome DOM test coverage.
- **Clock Settings Menu retained:** classic canvas/DOM clock font-family and hex application, storage persistence, right-click dispatch, and classic DOM fallback.
- **Bilibili Theater Dialog added:** typed Vue bilibili video theater & comments dialog island (`BiliTheaterDialog.vue`, `biliTheaterController`), commands (`bilibili.open-theater`, `bilibili.close-theater`), srt drawer toggle, comments sort/paging state, window tabs minimization, and real Chrome DOM test coverage.
- **Bilibili Theater Dialog retained:** classic video stream resolving (`resolveBiliMiniVideo`), official iframe fallback, multi-level comment tree with rich markup, header dragging, and classic DOM fallback.
- **AI Dialog added:** typed Vue AI assistant dialog and keyword extraction drawer island (`AiDialog.vue`, `aiDialogController`), commands (`ai.open-dialog`, `ai.close-dialog`), model selection, status/token count, keyword checkbox group, Obsidian batch import triggers, and real Chrome DOM test coverage.
- **AI Dialog retained:** isolated text-only Codex native bridge, ephemeral device authentication, 60,000 char safety barrier, and classic DOM element fallback.
- **Todoist section-role settings retired by later user request:** the custom master-pool/daily-target fields, name heuristics, rules controller/dialog, global bridge/commands, badges and dedicated styles have been removed. The pre-removal current implementation had no daily task-copy scheduler; historical UI copy was not proof of one.
- **Todoist retained after simplification:** normal projects/sections/tasks, account/calendar configuration, today view and native recurring-task semantics. Existing remote data is not renamed or deleted, and obsolete local role preferences are no longer read or included in ordinary backup/restore. Current source navigation takes precedence over earlier migration-only constraints below.
- **Todoist retained:** Vue navigation/label views plus verified classic dual-path fallback. Complete 12-boundary inventory retained in `newtab-todoist.js`; no project, cache, task-board or write-path cleanup is allowed in this pass.

## CSS cascade order

1. `newtab.css` — tokens, reset, top bar, first-screen launcher and base shell.
2. `newtab-components.css` — dialogs, bookmarks, cards, Todoist, media, utilities and component styling.
3. `newtab-windows.css` — Todoist, media, pet, tool windows and retained floating surfaces.
4. `newtab-calendar.css` — floating month calendar, daily ledger and drop feedback.
5. `newtab-themes.css` — Lone Trail and Endfield theme overrides.
6. `newtab-workspaces.css` — bookshelf, reader and Obsidian workspaces.
7. `newtab-integrations.css` — avatar hub, mail, Linux.do, GitHub Release and Telegram integrations.
8. `newtab-layout.css` — layout-edit mode, responsive overrides and final interaction guards.
9. `vendor/spine-player.css` — vendor-owned player stylesheet.

Do not reorder these links without checking cascade effects. Feature CSS belongs in the closest domain file; final responsive/layout overrides belong in `newtab-layout.css`.

## Historical engineering rules (not current implementation instructions)

- Keep storage keys, external APIs and DOM IDs near their owning domain.
- Use `LogicWeaverStorage.repository()` for new domain-owned persistent state; do not write arbitrary keys through another domain's repository.
- Use `LogicWeaverHttp` for new JSON requests unless a service-specific OAuth/upload transport genuinely requires custom handling.
- Optional integrations must fail without blocking `newtab-boot.js`.
- Register domain startup through `LogicWeaverApp.register()` and keep event binding, timers and refresh ownership inside that domain.
- Do not call another domain's private functions or state directly; expose the smallest stable `window.LogicWeaver…` facade when cross-domain access is necessary.
- Avoid new eager startup fetches; initialize expensive tools when opened.
- Prefer event delegation and small in-place updates over full-tree rerenders.
- Keep secrets outside source and preserve MV3 CSP.
- `src/intro/main.ts` is only the composition root. Global controller installation, command declarations and Feature definitions live in `src/core/globals.ts`, `src/core/ui-commands.ts` and `src/core/ui-features.ts`.
- Use the approved Vite layer only for bounded Vue/TypeScript islands; do not turn unrelated classic scripts into one opaque bundle solely for concatenation. Each migration needs explicit exports, compatibility testing and a rollback path.
- When removing a feature, remove its HTML entry, state, timers, messages, permissions, native commands, CSS and documentation together.

## Validation after structural edits

Run `npm run check`, `git diff --check`, and `node --check generated/background.js` as appropriate. Do not run the historical assertion tests or headless E2E. Visual/interaction acceptance remains separate and requires explicit user approval; never automatically reload Edge, start a Broker or manipulate tabs after building.
