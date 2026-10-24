# Isolated extension release build

Run `npm run release:build` from the repository using already-installed dependencies.

The command copies current working-tree source (including non-ignored new source files), build configuration, and allowlisted runtime files into a unique `dist-extension/v<version>-*/work/` directory. It runs `npm run check` there, then assembles the sibling `extension/` directory. It never cleans or copies the live `generated/` directory, overwrites an older release, installs dependencies, reloads Edge, or uploads anything.

## Output

- `dist-extension/v<version>-*/extension/`: clean load-unpacked extension directory.
- `dist-extension/v<version>-*/build-info.json`: version and file counts.
- The temporary `work/` is removed only on success; failure preserves it for diagnosis.

The output does not include source, native-host binaries, backend, mobile, tests, `.local.*`, account credentials, or personal schedule configuration. Users must configure their own integrations. Runtime assets under `assets/`, `mascot_pack/`, and `vendor/` are included only when known to Git or non-ignored. This allowlist is not a secret scanner: inspect new assets and sources before publishing.

The two root compatibility workers remain alongside `generated/` workers until their CLI references are retired. Old hash chunks in the live development directory are deliberately preserved for already-open pages.

## Manual acceptance before distribution

- Load the isolated `extension/` directory in a separate browser profile; do not replace a working installation without a backup.
- Check home, settings, all supported independent pages, sidepanel, search, wallpaper sandbox and module opening.
- Verify Todoist rapid edits, switching tasks during saves, failure/retry and image attachment handling.
- Verify home/fullscreen switching and floating-window focus, including title/favicon and dock indicators.
- Verify personal configuration is absent, version is correct, and package contents are appropriate.

No assertions or headless E2E are run. Build/typecheck success is not browser acceptance. ZIP creation and GitHub publication remain separate, explicitly authorized operations. Never package the repository's entire live `generated/` directory as the new release.
