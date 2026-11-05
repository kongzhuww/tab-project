# Star refresh: retain the last view until a complete replacement is ready

Source implementation, pending browser/real-account acceptance.

## Root causes

`loadGitHub` previously cleared live repository/page/category pools even for a same-account refresh, then restored disk caches that could be smaller than the live view. Separately, full-Star completion replaced the category pool with each partial page batch. Both paths could temporarily empty native List columns or the open folder window before later requests restored their cards.

## Current behavior

- For unchanged account configuration and owner identity, retain repository pools, List membership, selected folder and owner key during refresh. Do not restore older disk List/page caches over the live view.
- Verify token identity as before. Changed configuration or a different verified owner clears the previous identity's data; preserving content is never a cross-account fallback.
- Refresh and full-Star completion read 100-item pages into a private draft, following GitHub's next-page indication using generated same-endpoint requests. Only a complete, current-session read replaces repository/category pools and page caches. Repository names are deduplicated; final totals reflect actual unique items, not a rounded last-page estimate.
- Successful empty responses remove stale cards. Failed/cancelled intermediate pages never replace the old visible collection. Explicit refresh failure retains the old content with a stale-data message and does not add an automatic retry loop.
- Completed network snapshots publish before disk persistence. A page-cache write failure reports that the data updated but local caching failed; it is not falsely described as retaining old content.
- Lists still refresh through the existing separate endpoint. The refresh entry no longer dispatches an extra duplicate Lists read. Current-session checks guard late Lists publishing and List-cache hydration. Preserving an open folder depends on its List still existing; a confirmed remote deletion may close it.

Offline tests in `github-stars-board.test.mjs` exercise same-account retention across multiple pending pages, partial failure, confirmed empty collections, local cache write failure, once-only Lists scheduling, stale disk caches, account replacement/cancelled refresh and stale cache hydration. These tests do not benchmark latency or exercise live GitHub APIs.
