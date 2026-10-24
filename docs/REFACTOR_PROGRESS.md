# Refactor progress and acceptance (stage records)

> These are historical implementation and acceptance notes, not a live backlog or current file-size inventory. Read [CURRENT_STATE.md](CURRENT_STATE.md) and [AGENTS.md](../AGENTS.md) before editing. Past user feedback, line counts, deferred work and test-file references do not authorize new browser, network, fault-injection or data-write checks.

## Implemented

- Todoist title/description writes are serialized snapshots tied to task IDs. Later edits are not discarded by a global `saving` early return.
- Revisioned, session-only drafts survive drawer close/reopen; failures expose explicit retry. An older completion cannot remove a newer draft. Drafts do NOT survive page reload.
- Input composition, field-specific watchers, debounce flush on task switch/unmount, and description-image versus comment-attachment separation were added. Upload waits for text writes and rejects unresolved text drafts.
- Component-level board/calendar text mutation was moved behind the inspector controller's shared preview function. This is not a complete normalized task entity store.
- `activeViewId` derives presentation from fullscreen selection and visible window focus. Dock selection derives from fullscreen selection or standalone pathname, not another mutable copy. Fullscreen cards no longer take floating-window focus/z-order. `releaseFocus` owns external focus clearing.
- `npm run release:build` performs typecheck/build in an isolated copied workspace and assembles a fresh extension directory without touching live generated chunks or publishing.
- Removed unused `spa-hub.ts`, its App Teleport loop and ui-features imports. Standalone-page mounting remains intact.
- Included sandbox/localizer Vite configuration in TypeScript checks. Clarified historical architecture documentation and current validation rules.

## Settings update extraction

- `SettingsView.vue` decreased from 1219 to 974 lines. `useExtensionUpdates.ts` owns update state, network/native orchestration and cleanup; `release-model.ts` owns typed Release parsing, version comparison and extension-asset selection.
- The new update path uses a narrow browser API interface and `unknown` at external JSON/native boundaries instead of `ref<any>` release data. Unrelated settings APIs still need type work.
- Release selection requires an `-extension.zip` asset; it never silently chooses a source archive. A newer release without an installer is reported separately.
- Checks reset stale Git availability and use generation guards. Closing a retained settings window cancels HTTP work and invalidates late native results, without cancelling a submitted Git mutation. Explicit Git writes remain locked until settled.
- Downloads have a size/time bound, ZIP header validation, typed chunks and delayed Blob URL release. Browser handoff is no longer presented as confirmed disk completion.
- Independent options pages remain active by default; retained settings dialogs pass their actual open state.
- `tests/ai.test.mjs` was reviewed but NOT deleted: it mixes obsolete UI checks with native bridge checks. Blanket removal is not justified.

## Todoist board and style boundaries

- Extracted drag state, hit-slot snapshots, preview calculation, drop routing and lifecycle cleanup into `useTodoistBoardDrag.ts` (199 lines). The board supplies typed activity/editing predicates and move/label callbacks; the composable does not import the service or own persistence.
- Preserved existing drag thresholds, MIME payloads, parent/overdue restrictions, and move-controller behavior. Lifecycle watchers now live with the gesture state instead of in two owners.
- `TodoistTaskList.vue` decreased from 1760 to 1604 lines. Rename/delete modal payloads now use explicit union types with property guards rather than `any`.
- Moved the inspector's existing 727 CSS lines to `todoist-inspector.css`, loaded with Vue's `<style scoped src>` so component scoping is retained. `TodoistInspectorDrawer.vue` is now 660 lines. This is ownership cleanup, not a claim of reduced CSS bytes or changed appearance.
- Comment attachment image detection now accepts the declared `InspectorComment` attachment type and returns a boolean.
- Final `npm run check`, isolated `release:build`, background syntax check and `git diff --check` passed after these edits. Browser drag/theme acceptance remains outstanding.
- Manual checks for this round: same-column sorting, cross-column moves, release outside the board/cancel, switching away while dragging, and inspector layout under existing themes. Rename/delete controls retain the same confirmation flow; do not delete real tasks merely to validate refactoring.

## Validation performed

- `npm run check`: passed after final source edits.
- `npm run release:build`: passed after final source edits; 111 fresh chunks.
- `node --check scripts/build-release.mjs`: passed.
- `node --check generated/background.js`: passed.
- `git diff --check`: passed.
- No assertion tests, headless E2E, browser reload, Git commit/push, version change or release upload performed.

## User feedback and manual acceptance

The user reported no issues after the preceding Todoist/navigation round. This is user feedback, not an automated browser test or proof of every failure-path case below. The settings extraction is newer and still needs manual verification: check updates, close/reopen during a check, and confirm normal download handling when an update is available. Do not apply a Git update merely to test this refactor.

### Earlier acceptance checklist

1. Todoist: type continuously during a slow save; switch tasks before the debounce ends; close/reopen the drawer. Check both remote content and the selected task.
2. Simulate a failed save manually; confirm draft restoration and explicit retry. Confirm the page-only retention warning is clear.
3. Edit title and description with Chinese input; upload an image after editing. Confirm comment attachments are not copied into description.
4. Switch Todoist -> GitHub -> home and return repeatedly; check dock/title/favicon, window layering, and companion windows.
5. Open supported standalone pages and confirm their dock indicators still work.
6. Load the isolated extension in a separate profile and inspect assets/settings/independent entries before distribution.

## Remaining work

- Normalize task entities across board/calendar/inspector; serializing priority/labels and other mutation sources needs a separate pass.
- Finish large-component extraction and Chrome/message/API boundary typing, then modular CSS ownership cleanup.
- Review obsolete tests and historical docs individually before deletion. Do not infer all tests or legacy mounts are dead.
- Root compatibility workers still exist because of CLI references. Live historical chunks remain deliberately retained.
- Failed title drafts are in memory only; cross-refresh recovery requires an explicit persistence/privacy design.
- Clean release assembly intentionally excludes personal schedule/account configuration. It is an allowlist, not a full secret audit or browser certification.
