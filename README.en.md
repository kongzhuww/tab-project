# tab-project

<p align="center">
  <img src="assets/icon-128.png" alt="tab-project" width="80" height="80" />
</p>

<p align="center"><strong>A Browser New-Tab Personal Productivity Workspace</strong></p>

<p align="center">
  <strong>English</strong> · <a href="README.md">简体中文</a>
</p>

<p align="center">
  <a href="https://github.com/kongzhuww/tab-project/releases/latest">Download Latest Release</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#quick-guide-which-path-fits-you">Quick Start</a> ·
  <a href="#installation">Installation Guide</a> ·
  <a href="#development">Development</a>
</p>

> **Core Concept**: `tab-project` is a browser new-tab workspace extension built with **Vue 3, TypeScript, and Chromium Manifest V3** (for Microsoft Edge and Google Chrome). It unifies frequently visited websites, bookmark kanban boards, daily tasks, and multimedia widgets—which are typically scattered across different tabs and apps—into a clean, responsive, theme-adaptive command center for your daily workflows.

> **Current Version**: **1.0.5**. This release introduces the brand new GitHub workspace with a "My Repositories · Topic Kanban", bidirectional drag-and-drop with remote GitHub Topics synchronization, edge auto-scrolling with horizontal wheel support, a native cascading right-click context menu, compression-resistant card layouts, and numerous interaction refinements. User data is strictly preserved without restoring deprecated debug bridges. Passing build checks does not imply browser or web store review completion. See the [Changelog](CHANGELOG.md) and [Release Notes](docs/RELEASE_1.0.5.md).

---

## Core Features & Module Status

| Capability / Module | Core Functionality | Status Level | Conditions & Requirements |
| :--- | :--- | :--- | :--- |
| **Favorite Sites & Large Folders** | Multi-group workspaces, 2x2 large folders, drag-and-drop reordering, inline quick title & URL editing | **Available by default** | Stored in local browser storage; basic features are completely offline |
| **Bookmark Kanban & Search** | Grid/tile layout for browser bookmarks, folder tree navigation, drag-and-drop organization, offline Pinyin/fuzzy search via Web Worker | **Available by default** | Requires browser bookmark read permission; never mutates untouched items |
| **Multi-Engine Unified Search** | Blended keyword matching across history, bookmarks, and shortcuts; `/bm` and `/sites` filters; instant redirect to GitHub, Bilibili, NetEase Music, and Qichacha | **Available by default** | Offline-first suggestions; Enter submits query directly to the selected search engine |
| **Clock, Mottos & Weather** | 3D clock with Solar & Lunar calendar, scroll-to-switch mottos, real-time Open-Meteo temperature & urban weather conditions | **Available by default** | Weather fetched via direct, read-only browser requests to Open-Meteo API |
| **Bilibili Plugin & Radio** | Dual-column favorite organization, AI subtitle extraction, picture-in-picture mini-player; Radio uses DASH pure audio streams (~3MB) with auto-failover | **Optional Module** | Public browsing requires no login; accessing personal collections/following requires existing login session in the same browser |
| **GitHub Workspace** | Starred repository classification, multi-rule search, distraction-free Markdown README viewer, one-click issue-to-todo linking | **Optional Module** | Public viewing needs no token; deep queries and task integration require a personal GitHub Token |
| **Todoist Task Kanban** | 0ms offline instant rendering, auto-hierarchical layout mapped from linked GitHub repos, task calendar, and real-time cross-tab cache invalidation | **Optional Module** | Requires a Todoist API Token entered in settings |
| **Music Workspace** | NetEase Cloud Music direct web session login, Monster Siren Records album library, 3D rotating vinyl turntable with synced lyrics display | **Optional Module** | Monster Siren is available out-of-the-box; NetEase requires logging in on the official site in the same browser |
| **AI HOT / Model Pricing** | Curated daily AI news headlines with an immersive reader; LLM token pricing radar and cost-efficiency benchmark chart | **Optional Module** | Ships with curated news feeds and built-in baseline model price tables |

### Optional Components & Extended Services

| Extended Capability | Core Functionality | Status Level | Conditions & Requirements |
| :--- | :--- | :--- | :--- |
| **Beaver Chatroom** | Private secure chatroom, shared rooms, activity sensing, interactive card sharing, and restricted image messages | **Optional Service (Experimental)** | Disabled by default; toggle in Store; requires self-hosted HTTPS server and dedicated invite |
| **My Memes & Sticker Library** | Sticker picker inside chatroom, local directory mounting via File System Access API, and categorized sticker management | **Auxiliary Module** | Invoked inside the chatroom without a standalone dock icon; mounting local disk requires explicit browser grant |
| **WebDAV Cloud Roaming** | Backup to Nutstore (坚果云) or private WebDAV; one-click restore for site shortcuts, preferences, and custom radio stations | **Optional Service** | Requires a personal WebDAV server address, account, and application-specific password |
| **Android / Mobile App** | Standalone mobile app and Android APK build pipeline | **Archived / Retired** | Deprecated and archived; project now focuses exclusively on desktop Chromium with built-in responsive narrow layout |
| **Cloudflare Worker Proxy** | Historical reverse proxy and relay server | **Archived Architecture** | Completely transitioned to direct standard browser API requests; no cloud relay required |

---

## 🎨 Theme & Design Philosophy

- **Unified CSS Variable Theming**: Strictly styled against theme variables (`var(--panel)`, `var(--text)`, etc.) to prevent jarring unstyled flashes. Supports 4 official themes (click `#theme-toggle` in the top right to switch):
  - **Light (`light`)**: Clean white background with optimal contrast and high readability;
  - **Dark (`dark`)**: Immersive dark background, easy on the eyes in dim lighting;
  - **Endfield (`endfield`)**: Industrial dark-gray palette with engineering hazard yellow accents;
  - **Lone Trail (`lonetrail`)**: Rice-paper textured background, engineering blueprint grid, and aerospace tricolor identification strip.
  > *Historical note: Early design documents used names like "Lone Trail" or "Endfield" with spaces/caps; internal keys are strictly lowercase. Independent startup animations (`rhinelab` / `endfield`) are controlled by `startupAnimationStyle` and operate independently of UI themes.*
- **Autonomous Modular Design**: Clear boundaries between workspaces and auxiliary plugins, with standardized integration into `src/sdk/` for windows, context menus, notifications, and image viewports.
- **Pure Browser Extension**: Native Host, Native Messaging, hardware device probes, and desktop pets have been completely removed. Media caching and sticker storage use standard browser permissions and APIs.

*Some features remain in active iteration. The appearance of an entry in older screenshots, documentation, or codebase does not guarantee it is enabled by default or stable.*

---

## 🧭 Quick Guide: Which Path Fits You?

Choose the best path for your needs:

- **Daily User**: Read [Recommended: Using Prebuilt Release Packages](#recommended-using-prebuilt-release-packages), download the unpacked archive, and load it into your browser in seconds.
- **Developer / Contributor**: Read [Building from Source](#building-from-source) and [Development Commands](#development).
- **Self-Hosting Beaver Chatroom**: Read the [Private Chat Server Deployment Guide](server/private-chat/README.md).
- **Mobile Support Inquiries**: The project focuses solely on desktop Chromium browsers (Edge / Chrome). Standalone Android / Capacitor builds are retired; the desktop layout features responsive mobile-width adaptation.
- **System Architecture**: Read [System Architecture Design](ARCHITECTURE.md) and [Developer Current State & Actual Entry Points](docs/CURRENT_STATE.md).

---

## 📦 Installation

### Recommended: Using Prebuilt Release Packages

If you only want to use the extension, download the latest Release asset directly.

1. Open [Latest Releases](https://github.com/kongzhuww/tab-project/releases/latest).
2. Download `tab-project-v<version>-extension.zip` and extract it to a persistent local folder.
3. In Microsoft Edge navigate to `edge://extensions`, or in Google Chrome navigate to `chrome://extensions`.
4. Turn on **Developer mode** (toggle in the top-right or sidebar).
5. Click **Load unpacked**, and select the extracted directory containing `manifest.json`.

> **Note**: Do not use GitHub's auto-generated "Source code (zip)" download—it contains uncompiled sources, not the ready-to-run extension build.

*Before upgrading, consider exporting your settings. Keep your extension directory in place; do not uninstall the extension simply to upgrade, as clearing extension data will delete locally stored records.*

### Building from Source

```bash
git clone https://github.com/kongzhuww/tab-project.git
cd tab-project
npm ci
npm run check
```

Once built, load the repository root directory as an unpacked extension following the steps above.

---

## 🚀 Recent Updates

### v1.0.5 · My Repositories Topic Kanban, Two-Way Drag & Drop, and Remote Topic Sync

- **GitHub Workspace: "My Repositories · Topic Kanban"**: Left navigation adds an entry to view your repositories arranged in a multi-column horizontal kanban board, with unclassified repositories on the left and GitHub Topics categorized on the right.
- **Bidirectional Drag-and-Drop with Automatic GitHub Sync**: Drag cards between columns; dragging into a Topic column attaches the topic tag and syncs remotely via GitHub API; dragging back removes the tag.
- **Comprehensive Horizontal Navigation**: Supports dragging cards while scrolling the wheel horizontally, `Shift` + mouse wheel scrolling, and auto-scrolling when hovering near board edges (100px).
- **Native Cascading Context Menus**: Right-click cards for options; hover/click "Move to Group" to open a secondary pane with boundary flipping; includes one-click link copying, clone command copying, and GitHub navigation.
- **Layout & Visual Polishing**: Fixed a CSS bug where cards could collapse under vertical pressure (`flex-shrink: 0`), fully conforming to light and dark theme variables.

### v1.0.4 · Radio Safeguards, Smart Failover, and 3-Tier Docs

- **Radio Collection Overwrite Protection**: Eliminated implicit overwrites when saving empty playlist names; empty fields trigger a highlighted shake animation and focus prompt.
- **Smart Failover & Anti-Stall**: Automatically aborts dead retries on timeouts, network errors, or auth limits, with up to 3 fallback source switches.
- **WebDAV Cloud Roaming**: Custom radio station playlists are now backed up and restored via Nutstore / self-hosted WebDAV (`bili_radio_custom_series`).
- **YouTube Recommendations**: Upgraded to a soft purple gradient card with capsule badges.
- **Three-Tier Documentation & Official Theme System**: Established 4 official themes (`light`, `dark`, `endfield`, `lonetrail`) and startup animations (`rhinelab` / `endfield`).
- **Build Optimization**: Cleaned up 847 unused legacy chunk artifacts.

> For older release history and detailed migration logs, see the complete [Changelog (CHANGELOG.md)](CHANGELOG.md).

---

## 🔒 Configuration & Data Boundaries

- Features like GitHub, Todoist, music, and self-hosted chatrooms require their respective user accounts, tokens, or services.
- Chatrooms run on self-hosted servers with personal invite codes; consult the [Server Guide](server/private-chat/README.md).
- `chrome.storage.local` and IndexedDB reside inside the browser sandboxed profile. **This does not equal enterprise end-to-end encryption**; local storage simply means data does not leave your machine unless requested.
- API calls communicate directly with target providers; chat messages are stored on your designated self-hosted server.
- Backing up configurations does not duplicate original media files on disk.
- Never commit private tokens, session cookies, invite credentials, or server keys into public repositories.

---

## 🛡️ Permissions & Privacy Policy

This extension strictly adheres to the **Chromium Manifest V3** security standard. All configurations, bookmark caches, and preferences are **stored locally within your browser by default**. There are zero analytics trackers, telemetry libraries, or commercial ad servers.

### 1. Why Are These Permissions Declared?

| Declared Permission | Purpose & Necessity |
| :--- | :--- |
| `storage` / `unlimitedStorage` | Store shortcuts, custom groups, theme settings, radio queues, and offline caches locally in `chrome.storage.local` and IndexedDB. |
| `bookmarks` | Read browser bookmarks to display in the new-tab kanban grid; support organization, folder creation, and drag-and-drop sorting (indexed locally via Web Worker). |
| `tabs` / `activeTab` | Power the top-bar tab manager (tree display of open tabs, one-click switching), avoiding duplicate opened tabs. |
| `cookies` | **Read-only** check for active login sessions on `bilibili.com` and `music.163.com` in the same browser profile to display your favorites and playlists. **Cookies are never uploaded, collected, or exported.** |
| `sidePanel` | Support opening the workspace directly in the Chromium native side panel (recommended shortcut: `Alt+W`). |
| `downloads` | Triggered strictly by user action: exporting configuration backups, downloading cached audio/video, and saving wallpapers. |
| `scripting` | Web translation helper: injects a lightweight Shadow DOM floating overlay for translation upon explicit user invocation. Never modifies webpage logic. |
| `identity` | Optional Google Calendar OAuth2 authorization for agenda synchronization. |
| `declarativeNetRequest` | Rewrite anti-hotlinking headers: appends necessary `Referer` headers when requesting stream fragments or cover art from official Bilibili/YouTube CDNs to ensure smooth playback. |
| `contextMenus` / `clipboardWrite` | Context menus for shortcut cards, and one-click copying of URLs, clone commands, or AI news summaries to clipboard. |

### 2. Where Does Data Go?

- **Zero Third-Party Telemetry**: We do not operate telemetry servers. We do not track user habits, statistics, or navigation history.
- **Direct Official API Communications**:
  - When utilizing Bilibili favorites, GitHub Stars, Todoist tasks, NetEase Cloud Music, or Open-Meteo weather, requests **travel directly between your browser and the respective official service**.
  - Your API tokens and keys remain strictly in local storage and are only sent in request headers to the corresponding official endpoint.
- **Self-Hosted Beaver Chatroom**: Chatrooms are entirely self-hosted. Messages sync only with your specified server address after you manually provide an invite code; no public relay exists.
- **WebDAV Cloud Sync**: Backups transfer via HTTPS strictly to your configured Nutstore or private WebDAV server when you click backup or restore.

---

## 💻 Development

```bash
# Watch UI sources and recompile; refresh your browser page to view changes
npm run ui:watch

# Run TypeScript checks and multi-entry builds
npm run check

# Create a clean release package
npm run release:build
```

The project is dedicated to desktop Chromium browsers. Legacy Android / Capacitor toolchains have been removed; responsive styling for narrower browser windows is preserved.

### Directory Structure

```text
src/                 Frontend modules, SDK, and background service workers
server/private-chat/ Self-hosted private chatroom backend
docs/                Architecture, module index, and deployment guides
docs/history/        Historical migration ledgers and audit records
generated/           Compiled assets
manifest.json        Chromium extension manifest (MV3)
```

### Three-Tier Documentation Navigation

- **Tier 1 · Visitors & Everyday Users**: Read this [README.md](README.md) and the [Changelog](CHANGELOG.md).
- **Tier 2 · Developers & Current Entries**: Read [System Architecture](ARCHITECTURE.md) and [Current State & Actual Entry Points](docs/CURRENT_STATE.md).
- **Tier 3 · Module Index & SDK**: Read [Module & Component Index](docs/MODULE_INDEX.md) and [SDK Documentation](src/sdk/README.md).
- **Archives**: Historical migration records and retired proposals are preserved in the [docs/history/ Archive](docs/history/README.md).

---

## 📄 License & Attribution

Original code is licensed under the [MIT License](LICENSE). Third-party components, runtimes, and graphical assets follow their respective licenses. The MIT license of the original code does not imply commercial license for all bundled assets. See [ATTRIBUTION.md](ATTRIBUTION.md) for full details.
