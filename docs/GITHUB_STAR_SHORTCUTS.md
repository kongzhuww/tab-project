# GitHub Star sidebar shortcuts

Implemented in source; browser visual/real-account acceptance is still pending.

## Scope

Only the left GitHub Lists navigation becomes a two-column shortcut grid. The separate left "All / Unclassified" navigation rows and drag-help strip have been removed at the user's request; the grid remains. The main Star board is preserved. Native Lists are folder tiles with miniature repository-avatar previews; repositories with no List membership are root shortcut tiles. Clicking a repository opens the existing README/detail window. Clicking a List opens an SDK `AppWindowFrame` containing its repository shortcuts; the existing List selection/hero action is retained.

The folder window uses solid `var(--panel)`, no backdrop, outside-pointer and Escape dismissal. Disabling/hiding the workspace or changing accounts closes the window and cancels pointer state. Delete List remains available in the folder header through the existing service confirmation path and does not unstar repositories.

## Dragging and classification

- Reuse `LauncherTileContent` and Favorite Sites' pointer threshold, center-drop geometry and swap cooldown; do not write GitHub repositories into personal launcher storage.
- Pointer dragging shows a follow-cursor tile, target outline and animated local swaps. Folder-center drop adds the repository to that native List, preserving its other memberships. Folder edges/other tiles reorder local shortcuts. Dragging folders only reorders them; GitHub Lists cannot nest. Repository-on-repository drops reorder; they do not silently create a cloud List. Use the existing + button to create Lists.
- Dropping on the main board's unclassified tray removes all native List memberships, retaining the Star. The inline per-repository buttons were removed: repository shortcuts in the folder window and root grid now have a modeless SDK context menu with "move to ungrouped" (internally the same Unclassified destination). It is disabled for already-unclassified repositories and while a List operation is busy. Opening the menu never writes data; selecting the action removes all List memberships, not the Star.
- Right-board repository native drags now include the shared validated repository MIME type so they can drop into left folders. Sidebar pointer drops can also target right-board List columns. The board's unclassified target is translated to the service's canonical Unclassified value.
- No cloud membership is changed on hover or cancel. Submit through the existing GitHub service only on release; do not optimistically claim success. Existing feedback and API permission/network errors remain authoritative.
- The source-tile fade selector is restricted to `.gh-shortcut-cell.is-dragging`, never generic `.is-dragging`: Vue also passes the parent's scoped attribute to the SDK window root, so the generic selector incorrectly faded the entire dragged folder window. The folder frame remains fully opaque with solid `var(--panel)` throughout header dragging; menus also use a solid panel background.
- Escape, pointercancel, blur, hidden document, deactivation, account change and unmount clear ghosts, scrolling timers, pointer listeners and local preview order. A completed drag suppresses its trailing click. Alt+Arrow keys reorder focused root tiles without a pointer.

## Data and local order

Use the shallow-reactive public Star-board snapshot, not raw service fields, for repository/List membership and owner identity. Local order keys use stable List IDs and repository full names; they persist under an account-scoped `ghSidebarTileOrderV1:<owner>` key. Only presentation keys are stored, no Token/headers. Writes are serialized in this page; late hydration cannot overwrite a local reorder. Sorting is not synced to GitHub or added to WebDAV sync. Storage errors retain the current view and show a message.

After initial reads settle, attempt one full-Star completion per account in the mounted view so the shortcut grid can include remaining repositories. This is a bounded service read, not a retry/poll loop. Failure retains loaded content and leaves manual retry to the existing refresh/selection actions. The service clears previous-account List/membership view data before loading a changed account.

## Verification

`tests/github-sidebar-tiles.test.mjs` covers pure tile construction, multi-membership/root exclusion, stable IDs/order, actual Vue reactivity with isolated pointer fixtures, click thresholds, drop submission, cancellation cleanup, local-only persistence, account invalidation, bounded completion attempts and shared MIME checks. Star-board initialization fixtures also check that previous-account folders are cleared. Fixtures do not launch a browser, contact GitHub or mutate a real account. Two-column layout, animations and actual GraphQL writes still require user acceptance after reloading the extension.
