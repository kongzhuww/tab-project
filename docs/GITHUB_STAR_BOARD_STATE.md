# Star board loading and skeleton state

Source fixes, pending real-browser visual verification:

- Top-row skeletons now use the same `shelf-card` class and non-shrinking 270px flex basis as real cards. Standard 126px card height and single-row pagination remain unchanged.
- `GitHubService` is not a Vue reactive object. Reading its fields directly inside a computed value cached stale loading state; ordinary template reads also depended on incidental rerenders. The board now consumes `stars-board-data.ts`, a shallow-reactive public snapshot published by the service. The snapshot contains repository/list/membership data and an explicit read-loading flag, not account headers or credentials.
- Membership snapshots replace the Map even when the service updated the original Map in place. Repository data, lists and context-menu membership update without switching views.
- Initialization, page reads, full Star reads, Lists reads and cancellation publish their actual loading state, including terminal/finally paths. Read loading is not inferred from empty data and is not shared with list write-operation feedback. Late cancelled reads cannot settle newer reads.
- Empty/error outcomes stop skeletons and show the existing status/error plus an empty unclassified shelf. Existing cards remain visible during background refresh. The refresh button is disabled while a read is pending to prevent overlapping refresh restarts.

`tests/github-stars-board.test.mjs` runs real Vue computed/snapshot reactivity with isolated service fixtures and no network/account/browser access. It covers data and membership updates without remounting, success/failure/empty outcomes, initialization, Lists reads, cancellation/replacement and skeleton-width source contracts. The CSS contract is not a browser layout measurement; screenshot verification remains manual.
