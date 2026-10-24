# Ten hotspot changes: implementation and verification boundary

This is a source-level optimization record, not a measured FPS or latency report.
No browser, real Todoist account, real task mutations or assertion/headless tests were used.

| Hotspot | Current change |
| --- | --- |
| Time edit reloads the whole board | Start edits update local task fields. Due writes are serialized, revision-guarded and project only the returned date fields; today-view membership follows the returned due date. Unconfirmed writes remain visible as errors, without automatic retries. |
| Start-date storage parsed once per task | Each task mapping/application captures one start-date table reader. The existing localStorage key is retained. Start dates remain local; this does not add cloud description metadata writes. |
| Duplicate workspace persistence | New results use one Chrome Storage snapshot per view/project plus in-memory aliases. No new synchronous localStorage serialization or legacy aggregate writes. Existing legacy caches are read-only fallbacks; account changes clear the new snapshots too. |
| Full JSON stringify/parse clone | Copy the editable board projection, label arrays and editable raw due objects; do not serialize the entire board just to detach UI state. |
| All task DOM remains mounted | TodoistVirtualList renders a viewport window with overscan, measured variable heights and a full-height logical canvas. Native drag source and editing row remain mounted. |
| Repeated description regular expressions | WeakMap cache keyed by task identity and source description; changed descriptions invalidate the derived text/thumbnail. |
| Full-board drag measurements | Drag slots come from virtual-list logical heights; only the list viewport and actual drag image need geometry reads. Pointer previews coalesce per animation frame; slot lookup uses binary search. Height changes update logical geometry without measuring every DOM card. |
| Workbench saves on every edit | Batch serialization after 400ms of inactivity, with a 2-second maximum delay during continuous editing. Flush on pagehide/visibility loss; HMR cleanup removes listeners and flushes pending changes. |
| Mascot per-frame work/backlog | Preserve existing visibility pause and DOM-write deduplication. Cap decorative paint at about 60Hz, keep direct drag unthrottled, and cap catch-up to three ticks / a cooperative 3ms budget (one tick cannot be interrupted). Excess backlog is dropped during contention. |
| Dock animation forces layout | Use a cancellable Web Animations translate animation, no offsetWidth read. Respect reduced motion and cancel owned animations on unmount. |

## Manual checks still required

- Scroll long Todoist columns with mixed text/images; edit a card, scroll, and verify focus and row heights.
- Drag within/between columns, scroll during drag, release/cancel, and verify saved ordering after explicit refresh.
- Edit only start time, only due time, both ends, and clear dates; inspect save failure feedback and today/overdue membership.
- Type in workbench notes and reload after saving; compare dock click feedback and mascot movement on high-refresh screens.

Virtualization intentionally mounts only nearby rows: browser find-in-page/tab traversal cannot discover all unmounted card DOM at once. Initial unseen row heights are estimates and are corrected as rows enter the window. Actual scroll/drag behavior and performance improvement require manual browser acceptance.
