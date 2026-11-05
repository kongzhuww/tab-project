# README rendering and latency

Implementation (pending real-browser verification):

- Official HTML and local fallback both pass through `readme-html.ts` before insertion. GitHub heading permalink controls are removed. Document-relative image/link URLs resolve against the repository and README directory, not the extension origin. GitHub blob/raw image links become raw-content URLs. Executable URL schemes, event handlers and active embedded content are removed; no credential is attached to image hosts.
- Heading anchors scroll within the README container, without changing the extension page hash used for workspace navigation.
- Images use lazy loading, async decoding and no referrer. Failed Camo images may try the supplied, validated canonical URL once; otherwise a failure indicator retains the alternative text and source in its tooltip. This cannot grant access to private images or fix deleted/unreachable remote resources. No image proxy or token forwarding was added.
- Metadata and default README GETs start concurrently. Chinese document selection remains. Optional official HTML uses the common bounded GET transport with a 4-second budget; the extra POST /markdown fallback is removed. Local rendering remains the fallback and preserves web document links instead of treating README.md as an Obsidian note.
- Completed detail snapshots stay in page memory for five minutes, at most eight repositories. Reopening uses the cached document, not a new network request; repeated clicks during the same read reuse the pending view. Account changes invalidate snapshots even while details are closed. No README or credentials are persisted to disk. Closing a tab discards these snapshots; fresh data is read after expiry.

Checks: synthetic tests cover URL resolution and unsafe schemes, parallel request start, bounded HTML GET, web/note link separation, cache reuse and account invalidation. Existing read cancellation tests remain. No authenticated GitHub API or user browser was used. Screenshot-specific image availability and visual behavior still require user verification; no latency benchmark or guaranteed speedup is claimed.
