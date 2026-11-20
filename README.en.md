# tab-project

<p align="center">
  <img src="assets/icon-128.png" alt="tab-project" width="80" height="80" />
</p>

<p align="center"><strong>A personal productivity command center built around your browser New Tab</strong></p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/tab-project-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/hogpkihhicjhiakkgjkbchpdoicmbolj"><img src="https://img.shields.io/badge/Chrome_Web_Store-Install-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Install from Chrome Web Store" /></a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/tabproject-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/dbkaiojfbolnkpaegflocfbdgpmhjcco"><img src="https://img.shields.io/badge/Microsoft_Edge-Install-0078D4?style=for-the-badge&logo=microsoftedge&logoColor=white" alt="Install from Microsoft Edge Add-ons" /></a>
</p>

<p align="center">
  <strong>English</strong> · <a href="README.md">简体中文</a>
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/tab-project-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/hogpkihhicjhiakkgjkbchpdoicmbolj"><strong>Chrome Web Store</strong></a> ·
  <a href="https://microsoftedge.microsoft.com/addons/detail/tabproject-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/dbkaiojfbolnkpaegflocfbdgpmhjcco"><strong>Edge Add-ons</strong></a> ·
  <a href="https://github.com/kongzhuww/tab-project/releases/latest">Releases</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#installation">Install</a> ·
  <a href="#development">Development</a>
</p>

> **Core Concept**: `tab-project` is a desktop Chromium New Tab workspace extension built with **Vue 3, TypeScript, Rust WebAssembly, and Manifest V3** (for Chrome & Edge). It unifies quick-access sites, bookmark kanban boards, aggregated search, Todoist, GitHub, Bilibili tools & audio radio, music playback, and local-first AI workflows into one adaptive interface.

> **Repository Version**: **1.0.27**, featuring the redesigned 2×7 Bilibili radio cards and playlist manager, per-workspace wallpapers, the Site Finder digital employee, RSS channels, and sub-view refresh persistence. Store editions are updated after platform review and may lag behind `main`. See [CHANGELOG.md](CHANGELOG.md).

## Feedback & Updates

[Report a Bug](https://github.com/kongzhuww/tab-project/issues/new?template=bug_report.yml) · [Request a Feature](https://github.com/kongzhuww/tab-project/issues/new?template=feature_request.yml) · [Discussions](https://github.com/kongzhuww/tab-project/discussions) · [Releases](https://github.com/kongzhuww/tab-project/releases)

When filing an issue, include your extension version, browser version, and reproduction steps. Redact private information from screenshots and never share tokens, cookies, or credentials.

---

## Feature Overview

| Module | Highlights | Requirements & Notes |
| :--- | :--- | :--- |
| **Live Wallpapers & Workshop** | Pure-browser Wallpaper Engine runtime (OPFS instant boot, Steam Workshop `431960` scanning, 4K Video / Web / Scene playback, 128-band logarithmic audio visualizer), 5 high-refresh/Retina cooling safeguards, and **per-workspace custom wallpapers** | Available by default; links directly to local Steam Workshop or custom folders |
| **Quick Sites & Bookmark Board** | Multi-group site shelves, `2×2` large folders, drag-and-drop reordering, organizer assistant, flat/nested bookmark view, and Rust/Worker fuzzy pinyin search | Available by default; requires `bookmarks` permission and only edits items upon user action |
| **Quick Search & Home** | Unified search across history, bookmarks, and saved sites (`/bm`, `/sites` filters + GitHub, Bilibili, NetEase, Qichacha); 3D clock, color presets, motto wheel switcher, and Open-Meteo weather | Available by default; weather uses read-only requests to Open-Meteo |
| **Bilibili Workspace & Radio** | Favorites organizer with top global search bar, personalized feed, following groups; **compact 2×7 radio grid** (`♥` likes, custom playlist management & delete, dashed-arrow queue drag-and-drop, Offscreen playback & refresh restore prompt); floating player (danmaku, playback speed, comments/sub-replies viewer, subtitle modal) and local video cache | Public browsing needs no login; personal favorites/following require signing into Bilibili in the same browser; preserves active sub-view on refresh |
| **GitHub Workspace** | Starred repository Lists, Topic kanban drag-and-drop sync, cached PRs & recent repos, Markdown README reader, and linked repository Todoist tasks | Public browsing works unauthenticated; private data & actions require a personal GitHub Token |
| **Todoist Kanban** | Local-first caching, ordered Today queue, calendar sidebar, attachment image viewer, and GitHub-linked tasks | Requires a Todoist API Token in settings |
| **Music Workspace** | Dual separated queues for NetEase Cloud (browser session login) and Monster Siren Records (built-in), 3D spinning player, lyrics, and tab-close audio controls | Monster Siren works immediately; NetEase requires browser login |
| **AIHOT News & RSS** | AIHOT curated feed, model rankings, daily digests, and custom RSS / Atom channel subscriptions | Available by default; preserves active sub-view across page refreshes |
| **AI Workspace & Digital Employees** | Multi-provider OpenAI-compatible support (DeepSeek, Kimi, SiliconFlow, GLM, Bailian, OpenAI, OpenRouter, local Ollama / LM Studio) with model picker; **Native Messaging** bridge for local CLI agents (Pi, Claude Code, Codex, OpenCode, ACP); digital employees (GitHub Trending assistant, Site Finder, etc.) and scheduled runs with live/replay peek inspection | Configure API keys or local host bridge as needed; see [AI Scheduling Docs](docs/AI_WORKSPACE_SCHEDULING.md) |
| **AI Library** | Manage local prompts, variable templates, saved articles, and stickers; article images open in the wheel-zoomable floating image viewer | Available by default with local storage and backup export |

### Optional Self-Hosted / Cloud Services

| Service | Summary | Requirements |
| :--- | :--- | :--- |
| **WebDAV Cloud Sync** | Client-side encrypted backup and smart diff/merge for quick sites, settings, library, and radio series | Bring your own HTTPS WebDAV endpoint, credentials, and backup passphrase |
| **Beaver Chatroom** | Self-hosted private rooms, resource card sharing, and listen-together rooms | Disabled by default; requires a self-hosted server ([Server Guide](server/private-chat/README.md)) |
| **Sticker Directory** | Chat picker & local folder mounting via File System Access API | Opt-in local directory access from chat/library |

> **Themes & Layout**: Unified `light`, `dark`, and warm-paper (`lonetrail`) themes plus independent startup animations (`endfield` / `rhinelab`). Trigger the non-intrusive overlay sidebar anytime with `Alt+W`.

---

## Recent Highlights

- **v1.0.27**:
  - Revamped Bilibili radio into compact 2×7 cards with `♥` favorites, custom playlist popover & delete support, dashed-arrow drag cue, favorites hero search bar, and removed legacy tape bar, subscription sidebar entry, and newspaper mode.
  - Added sub-view refresh persistence across Bilibili, GitHub, Agent, and AIHOT; cached GitHub PRs/recent repos and Todoist views; enabled mouse-wheel zoom on Agent library images via `FloatingImageViewer`; added the Site Finder employee and AIHOT RSS channels.
  - Added independent per-workspace wallpapers, intermittent tab-return video click fix, music resume toast, and local legal/privacy documentation views.
- **v1.0.24 – v1.0.26**: Unified state machines and Vue 3 bridge, universal OpenAI-compatible presets + local CLI Native Messaging bridge, GitHub Trending scheduled digest with peek monitoring, bookmark/site organizer assistant, and regression hardening.

> See [CHANGELOG.md](CHANGELOG.md) for the complete release history.

---

## Installation

### Recommended: Official Browser Stores (Auto-Updates)

- **Google Chrome**: Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/tab-project-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/hogpkihhicjhiakkgjkbchpdoicmbolj).
- **Microsoft Edge**: Install from [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tabproject-%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/dbkaiojfbolnkpaegflocfbdgpmhjcco).

> **Migrating from an unpacked build?** Store builds may use a different extension ID and do not inherit local data automatically. Export your settings first and keep your unpacked copy until migration is verified.

### Manual Installation (Release Zip)

1. Download `tab-project-v<version>-extension.zip` from [GitHub Releases](https://github.com/kongzhuww/tab-project/releases/latest) (do not use GitHub's `Source code` archives directly).
2. Extract it to a permanent folder, open `chrome://extensions` or `edge://extensions`, and enable **Developer mode**.
3. Click **Load unpacked** and select the folder containing `manifest.json`.

### Build from Source

```bash
git clone https://github.com/kongzhuww/tab-project.git
cd tab-project
npm ci
npm run check
```

Load the repository root in Developer mode, or run `npm run release:build` to output a clean isolated extension package. See [DEVELOPMENT_BUILD.md](docs/DEVELOPMENT_BUILD.md).

---

## Permissions & Privacy

`tab-project` follows **Chromium Manifest V3** guidelines with **zero analytics or telemetry servers**. User settings and caches stay locally in `chrome.storage.local`, IndexedDB, and OPFS unless you explicitly configure third-party APIs or self-hosted services.

| Permission | Purpose |
| :--- | :--- |
| `storage` / `unlimitedStorage` | Store local settings, sites, library items, radio series, and caches. |
| `bookmarks` / `favicon` | Render and organize bookmarks with site icons in the local Worker search index. |
| `tabs` / `activeTab` | Support the top tab manager tree and focus existing workspace tabs. |
| `cookies` | Read Bilibili's `bili_jct` CSRF cookie when performing user-initiated Bilibili actions. |
| `declarativeNetRequest` | Attach required media/image headers for extension-initiated Bilibili requests. |
| `scripting` | Inject the overlay sidebar (`Alt+W`) or page translator only when explicitly triggered. |
| `alarms` / `notifications` | Run user-scheduled AI tasks and deliver local completion notifications. |
| `downloads` | Export backups, save wallpapers, and download user-requested cached media. |
| `identity` | Optional Google Calendar OAuth2 sign-in. |
| `nativeMessaging` | Communicate with user-configured local AI CLI agent hosts (e.g., Pi / Claude Code / Codex / OpenCode / ACP) when enabled. |
| `offscreen` | Host continuous background audio playback via MV3 Offscreen Documents. |
| `contextMenus` / `clipboardWrite` | Context actions and one-click copy of links, articles, and transcripts. |

See [PRIVACY.md](PRIVACY.md), [THIRD-PARTY-SERVICES.md](THIRD-PARTY-SERVICES.md), and [MANIFEST_PERMISSION_AUDIT.md](docs/MANIFEST_PERMISSION_AUDIT.md).

---

## Development

```bash
npm test              # Run offline regression & policy suite
npm run ui:watch      # Watch and rebuild frontend modules
npm run check         # Validate locales, vue-tsc typecheck, and build bundles
npm run release:build # Produce isolated extension release directory & zip
```

Key directories:

```text
src/                 Frontend modules, SDK, workspaces, and background worker
crates/fast-search/  Rust / WebAssembly local search engine
server/private-chat/ Optional self-hosted private chatroom server
tests/               Unit & policy regression tests
docs/                Architecture docs, module index, and historical archives
generated/           Built runtime artifacts
manifest.json        Chromium MV3 extension manifest
```

### Further Reading

- **Architecture & Modules**: [ARCHITECTURE.md](ARCHITECTURE.md) · [CURRENT_STATE.md](docs/CURRENT_STATE.md) · [MODULE_INDEX.md](docs/MODULE_INDEX.md)
- **Licensing & Legal**: [LICENSE](LICENSE) · [THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md) · [ATTRIBUTION.md](ATTRIBUTION.md) · [PRIVACY.md](PRIVACY.md)
