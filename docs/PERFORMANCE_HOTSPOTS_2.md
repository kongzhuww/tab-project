# Second performance pass

Source-level optimizations, not a measured FPS/latency report. No browser, live account, real vault, filesystem permission request or assertion/headless test was used.

| Source hotspot | Change |
| --- | --- |
| Shared window resizing | Coalesce pointer movement into one animation frame. Flush the final pending size on gesture cleanup, then use the existing position-save path. Keep original minimum sizes and lifecycle cancellation. |
| Spine web-pet dragging | Cache gesture dimensions at pointerdown; paint left/top together once per frame without offsetWidth/offsetHeight reads. Preserve per-event velocity estimation and companion throwing. Pin to the initiating pointer, flush on release, discard pending paints on cancel/capture loss. This is separate from the earlier MascotEngine changes. |
| Favorite-sites drag preview | Read the existing item array without copying each frame. Search/copy/splice only after a valid swap target passes the existing cooldown/core-area guards. Keep the original animation-frame event coalescing. |
| Vault metadata scan | Share a maximum of four getFile operations across recursive traversal; reserve traversal positions so completion order cannot reorder notes. Yield periodically, check cancellation and settle already-started metadata reads before leaving. Do not read note contents, write files, add persistent scan caches or parallelize whole subtrees without a bound. |
| Vault file-list DOM | Flatten expanded folder headers/notes into a measured virtual list. Collapsed notes are excluded. Keep full file metadata, original path-based operations, folder labels and indentation. Preserve folder collapse choices when the manager rebuilds the projection. |
| Favorite flags | Replace deep traversal/writes of every note with a Set projection and O(1) membership checks on mounted rows. Reload on list replacement or cross-tab storage changes; keep the same storage key. Toggle persistence failures remain visible and do not claim successful saving. |
| Markdown preview | Run the existing pure Markdown/MathML renderer in an owned Worker. Terminate superseded/hidden/unmounted work, bound waiting to 30 seconds, cache at most three small rendered documents in memory, and surface failures without changing note text. Worker URL is emitted relative to the generated bundle, with no broad asset-base or CSP change. Offscreen top-level preview blocks can skip layout/paint. |
| GitHub projections | Compute the filtered repository array once per publishAll call and share it with header/cards/batch bar. Tokenize a fuzzy query once per filtering pass, not once per repository. Independent publication calls still compute a fresh snapshot; no persistent result cache to become stale. |
| Bookmark suggestions | Distinguish a successful empty result from Worker failure. Wait for initial indexing before treating zero matches as authoritative. Abort pending Worker waits and check cancellation before/after subsequent asynchronous stages; fall back to the native API only on failure. |
| Chat history DOM | Keep the original message/history data and export paths; virtualize only the displayed rows. Keep the existing history-prepend scroll-height compensation, and compensate measured-height changes while following the bottom or retaining a visible row anchor. Mounted message rows report actual heights rather than content-visibility estimates. |

## Shared virtual-list behavior

`src/core/MeasuredVirtualList.vue` renders a viewport window with overscan, uses ResizeObserver for variable heights, and performs binary searches over logical offsets. Focused and native-drag source rows stay mounted while the gesture/focus belongs to them. Observers, listeners and pending frames are cleaned up when inactive/unmounted. Height caches are reset for a new vault/chat scope; no private message or note content is persisted by this component.

All loaded data still exists in the original model; this reduces DOM, not the in-memory history model itself. Native browser find/tab traversal cannot discover unmounted rows at once. Offscreen row heights are estimates until measured; image loading, resizing and very tall rows need real scroll acceptance. DOM-only transient states can be recreated when a row leaves and re-enters the window.

Markdown conversion is off-thread, but delivering HTML still requires main-thread HTML parsing/DOM creation. A single huge table/formula or very large document can remain expensive. File metadata APIs and already-dispatched native bookmark/Worker work cannot be physically rolled back by cancelling the wait.

## Manual acceptance still required

1. Resize windows rapidly, then release/cancel/hide; verify final size and restored position.
2. Drag and throw Spine pets; drag websites within/between pages and into folders.
3. Open a large disposable vault, scroll the file list, fold folders, switch notes, toggle favorites and check cross-tab updates.
4. Preview long Markdown with tables/formulas; switch notes rapidly and switch to/from source mode. Check preview interactions and unchanged draft/save protection.
5. Search GitHub and bookmarks, including no-match queries and rapid replacement of input.
6. Load several pages of chat history, scroll both directions, load images, resize the window, use message actions and switch rooms. Check prepend anchoring and bottom-follow behavior.

Build/type/syntax checks do not replace these browser checks and do not establish a measured performance improvement.
