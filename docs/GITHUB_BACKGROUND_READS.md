# GitHub background reads

User-requested behavior: switching workspace/channel or hiding the browser tab must not discard an already requested read.

- Discovery: the store owns the bounded 45-second read, independently of the mounted view. Detachment preserves pending work and results. Returning with no successful result starts a new read unless one is already pending. Changing the time range still replaces the old request.
- Repository details: visibility suspends UI work, not README fetching. Closing details, opening another repository or changing account settings still cancels the previous session and prevents late results from committing. The existing 45-second initial-read and 30-second language-switch limits remain.
- Star repositories: the mounted workspace owns the read signal; hiding it no longer aborts its signal. Returning does not restart an initializing or paging request. Unmount still cancels the owner.
- Navigation: Dock Home uses the registered fullscreen action instead of optional window globals. The root watcher keeps body fullscreen class and home/daily marker synchronized with fullscreen state. Unmounting an unrelated module no longer removes the current fullscreen marker.

This is background work within a living page, not a durable MV3 service-worker job. Browser discard, page closure, network errors, rate limits and invalid credentials can still stop a read. No perpetual retries or automatic write retries were introduced.

Verification: isolated tests execute the actual read-session, discovery, detail and fullscreen-exit code with deferred synthetic responses. No real account or daily browser profile is used. Build and unit checks do not prove the intermittent Home white screen is fully fixed; return-to-Home, tab visibility changes and opening/closing details require user verification.
