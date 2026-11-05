# Dock Home: persistent startup marker hid the launcher

## Confirmed source-level cause

`src/intro/page-init.ts` previously marked BOTH `html` and `body` with `has-card-fullscreen` when a module was restored from the URL hash or `sessionStorage.lw_active_card`. `newtab.html` contained critical inline CSS hiding `.launcher` and `#hero-background-media` for either marker.

Runtime fullscreen exit and the App watcher removed only the body marker. Thus the selected module disappeared, while the html marker continued to hide the Home launcher. Switching Bilibili/GitHub still worked because those module cards were not hidden by the html rule. A fresh Home-first session would not set this marker, explaining the conditional behavior. Earlier Home fixes covered body/navigation state but missed this entry-point CSS owner.

## Source changes

- Early-paint bootstrap now marks only body, which already exists at its script location. The body critical CSS remains, preventing a Home flash when restoring an active module.
- Remove the legacy html selectors from `newtab.html`.
- `fullscreen-presentation.ts` reconciles body fullscreen class and home/daily page attribute, and clears any legacy html marker. The App synchronous watcher, enter/exit actions, Dock Home fallback and module-host fallback use the same helper.
- Exiting with no active card also reconciles presentation; an already-Home click can repair stale DOM flags without reloading the page.
- Standalone workspace Home behavior remains: activate the existing main tab when available. No forced reload, new persistent listener/polling loop, storage clearing or module-state reset was added.

## Verification and limits

`tests/dock-home-navigation.test.mjs` uses TypeScript's compiler, real Vue reactivity and synthetic DOM/storage/tab APIs. It executes the actual bootstrap, fullscreen state/actions and Dock handler. Cases cover Bilibili/GitHub startup from hash/session, legacy html flags, repeated switching/Home clicks, exit with no selected card, and standalone tab activation. The entry critical CSS's relevant selectors are checked against fixture flags. The older fullscreen-exit test now executes the shared presentation helper too.

These are isolated code/critical-selector regressions, NOT real-browser rendering measurements. No user tabs, account data or extension reload were accessed. User acceptance after reloading the extension: open Bilibili/GitHub, refresh while that module is active, then press Dock Home; repeat switching and returning. Other independent rendering/runtime failures are not ruled out by this fix.
