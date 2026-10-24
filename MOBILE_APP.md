# LogicWeaver Android App

> This describes the separate mobile source tree, not the extension runtime. Capability and updater notes are source-level boundaries, not a current device/build acceptance report. See [current source guidance](docs/CURRENT_STATE.md); do not restore deleted desktop modules to satisfy old bridge/cache descriptions.

## Architecture

The Android app is a Capacitor wrapper around the dedicated mobile UI. It is not an 8088-only web wrapper.

### Works without Tailscale or a PC

- Bilibili account login stored in the Android WebView cookie jar, including the owner's private favorite folders and in-app playback; public UID access remains as a fallback
- Todoist task list, completion, creation, recurring/time scheduling and an integrated calendar
- Android home-screen Todoist widget (up to five active tasks)
- GitHub Stars
- Translation
- Mobile notes, AI configuration, launchers and mobile themes
- GitHub Release update checks

### Optional desktop bridge (marked `需桥接` in the app)

These features depend on browser-extension or PC-only capabilities and use the most recent synchronized cache when the bridge is offline:

- Chrome/Edge bookmarks and extension storage
- Obsidian desktop Vault and File System Access handles
- Desktop IndexedDB wallpaper and sticker libraries
- YouTube browser OAuth session and desktop feed cache
- AI HOT desktop cache when the configured bridge actually provides it; historical channel/WeRead caches do not imply those desktop modules still exist
- Native Messaging, DSH and client-certificate n8n access

Tailscale is optional. It is the recommended remote transport for the desktop bridge because it avoids opening a public port. The app remains usable when Tailscale is stopped.

## Local preparation

```powershell
npm install
npm run android:sync
```

`npm run mobile:prepare` creates the ignored `dist-mobile/` web bundle. `npx cap sync android` copies it into the native project.

Before a local Gradle build, check that the selected machine has a compatible JDK and Android SDK configured. Do not infer today's environment from an old machine snapshot. SDK installation and device operations require separate approval.

## Android packaging and signing boundary

The current repository contains `ci.yml` and `release.yml` for extension builds; `.github/workflows/android.yml` is absent. Do not promise automatic APK artifacts or publication from a mobile branch/tag, and do not create a workflow merely to make old documentation true.

An Android build/signing pipeline needs separate design and authorization. Keep any existing signing key and passwords private and backed up; updates must retain the application's identity and signing compatibility. Never generate a replacement production key or publish an APK as an audit step.

## In-app updater

The System section contains **Software Update**. For a private repository, a fine-grained GitHub token with read-only access to Contents/Releases may be required; do not assume current repository visibility from this document. The native updater encrypts that token with Android Keystore and does not place it in web storage or source code.

Update flow:

1. Request `/repos/kongzhuww/tab-Project/releases/latest`.
2. Compare its tag with the installed `versionName`.
3. Download the `.apk` asset only from `api.github.com`.
4. Open Android's package installer.
5. The user explicitly confirms installation.

The app declares `REQUEST_INSTALL_PACKAGES` solely for this user-triggered sideload update flow. It cannot silently install updates. This distribution method is intended for private/direct APK use and may not satisfy Google Play policy; a Play Store build should use Play in-app updates and omit this permission.
