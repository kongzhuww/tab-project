import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

// Execute the actual workflow guard, not a separately maintained copy of its policy.
const workflow = await readFile(new URL('../.github/workflows/release.yml', import.meta.url), 'utf8');
const block = workflow.match(/# BEGIN RELEASE GUARD\r?\n\s*node <<'NODE'\r?\n([\s\S]*?)\r?\n\s*NODE\r?\n\s*# END RELEASE GUARD/);
assert.ok(block, 'The production release guard must be present');
const guard = block[1].split(/\r?\n/).map(line => line.replace(/^ {10}/, '')).join('\n');
const sha = 'a'.repeat(40);
const tagSha = 'b'.repeat(40);
const archive = 'tab-project-v1.0.9-extension.zip';
const payload = Buffer.from('controlled archive fixture; unzip is mocked');
const digest = createHash('sha256').update(payload).digest('hex');

function fixture() {
  return {
    env: { VERSION: '1.0.9', GH_REPO: 'demo/extension', GH_TOKEN: 'test-only-not-a-real-token',
      SOURCE_SHA: sha, RELEASE_TAG: 'v1.0.9', GITHUB_REF_TYPE: 'tag', GITHUB_OUTPUT: 'test-output' },
    files: {
      [archive]: payload,
      'SHA256SUMS.txt': digest + '  ./' + archive + '\n',
      'build-info.json': JSON.stringify({ version: '1.0.9', commit: sha, environment: 'github-actions' }),
    },
    manifest: { manifest_version: 3, version: '1.0.9' },
    routes: {
      '': { status: 200, data: { full_name: 'demo/extension' } },
      '/releases/tags/v1.0.9': { status: 404 },
      '/git/ref/tags/v1.0.9': { status: 200, data: { object: { type: 'commit', sha } } },
    },
    nonFile: null,
  };
}

async function run(state) {
  const calls = [];
  const outputs = [];
  const logs = [];
  const process = { env: state.env, exitCode: 0 };
  const fs = {
    readdirSync: path => { assert.equal(path, 'release-assets'); return Object.keys(state.files); },
    lstatSync: path => ({ isFile: () => path !== state.nonFile }),
    readFileSync: path => {
      const value = state.files[path.replace(/^release-assets\//, '')];
      if (value === undefined) throw new Error('Missing fixture asset');
      return value;
    },
    appendFileSync: (path, text) => { assert.equal(path, 'test-output'); outputs.push(text); },
  };
  const sandbox = {
    process, AbortSignal,
    require(name) {
      if (name === 'node:fs') return fs;
      if (name === 'node:crypto') return { createHash };
      if (name === 'node:child_process') return { execFileSync(command, args) {
        assert.equal(command, 'unzip');
        assert.deepEqual(Array.from(args), ['-p', 'release-assets/' + archive, 'manifest.json']);
        return JSON.stringify(state.manifest);
      } };
      throw new Error('Unexpected import');
    },
    console: { log: text => logs.push(text), error: text => logs.push(text) },
    fetch: async (url, options) => {
      assert.equal(options.method ?? 'GET', 'GET', 'Guard must never make remote writes');
      assert.equal(options.redirect, 'error');
      assert.ok(url.startsWith('https://api.github.com/repos/demo/extension'));
      const path = url.slice('https://api.github.com/repos/demo/extension'.length);
      calls.push(path);
      const response = state.routes[path];
      if (response instanceof Error) throw response;
      assert.ok(response, 'Unexpected network request: ' + path);
      return { status: response.status, ok: response.status >= 200 && response.status < 300,
        json: async () => response.data };
    },
  };
  await vm.runInNewContext(guard, sandbox, { timeout: 1000 });
  return { exitCode: process.exitCode, calls, outputs, logs };
}

async function rejects(change, message) {
  const state = fixture();
  change(state);
  const result = await run(state);
  assert.equal(result.exitCode, 1);
  assert.deepEqual(result.outputs, [], 'Failure must not authorize the creation step');
  assert.ok(result.logs.some(line => line.includes(message)), result.logs.join('\n'));
  return result;
}

test('accept a new release only after assets, provenance and tag agree', async () => {
  const result = await run(fixture());
  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.outputs, ['tag=v1.0.9\n']);
  assert.deepEqual(result.calls, ['', '/releases/tags/v1.0.9', '/git/ref/tags/v1.0.9']);
});

test('accept checksums without a ./ prefix', async () => {
  const state = fixture();
  state.files['SHA256SUMS.txt'] = digest + '  ' + archive + '\n';
  assert.equal((await run(state)).exitCode, 0);
});

test('peel an annotated tag to the built commit', async () => {
  const state = fixture();
  state.routes['/git/ref/tags/v1.0.9'].data.object = { type: 'tag', sha: tagSha };
  state.routes['/git/tags/' + tagSha] = { status: 200, data: { object: { type: 'commit', sha } } };
  assert.equal((await run(state)).exitCode, 0);
});

test('manual dispatch derives tag from version, not the branch name', async () => {
  const state = fixture();
  Object.assign(state.env, { GITHUB_REF_TYPE: 'branch', RELEASE_TAG: 'main' });
  assert.deepEqual((await run(state)).outputs, ['tag=v1.0.9\n']);
});

for (const kind of ['published', 'draft', 'prerelease']) {
  test('refuse existing ' + kind + ' release without editing or uploading', async () => {
    const result = await rejects(state => {
      state.routes['/releases/tags/v1.0.9'] = {
        status: 200, data: { id: 1, draft: kind === 'draft', prerelease: kind === 'prerelease' },
      };
    }, 'Release already exists');
    assert.deepEqual(result.calls, ['', '/releases/tags/v1.0.9']);
  });
}

for (const status of [401, 403, 429, 500]) {
  test('fail closed when release lookup returns HTTP ' + status, async () => {
    await rejects(state => { state.routes['/releases/tags/v1.0.9'] = { status }; }, 'HTTP ' + status);
  });
}

test('repository access failure is not interpreted as an absent release', async () => {
  const result = await rejects(state => { state.routes[''] = { status: 404 }; }, 'HTTP 404');
  assert.deepEqual(result.calls, ['']);
});

test('malformed successful lookup is not mistaken for a missing release', async () => {
  await rejects(state => { state.routes['/releases/tags/v1.0.9'] = { status: 200, data: null }; }, 'Malformed release API response');
});

test('network failure never authorizes creation', async () => {
  await rejects(state => { state.routes['/releases/tags/v1.0.9'] = new Error('Network unavailable'); }, 'Network unavailable');
});

for (const version of ['1.0.9-beta', '../1.0.9', '1.0', '']) {
  test('reject invalid version ' + JSON.stringify(version), async () => {
    const result = await rejects(state => { state.env.VERSION = version; }, 'Invalid release version');
    assert.deepEqual(result.calls, []);
  });
}

test('reject mismatched tag', async () => {
  await rejects(state => { state.env.RELEASE_TAG = 'v1.0.8'; }, 'tag and version differ');
});
test('reject extra assets', async () => {
  await rejects(state => { state.files['unexpected.zip'] = payload; }, 'Unexpected release asset set');
});
test('reject missing assets', async () => {
  await rejects(state => { delete state.files['build-info.json']; }, 'Unexpected release asset set');
});
test('reject a symlink or directory masquerading as an asset', async () => {
  await rejects(state => { state.nonFile = 'release-assets/' + archive; }, 'regular files');
});
test('reject corrupt archive', async () => {
  await rejects(state => { state.files[archive] = Buffer.from('tampered'); }, 'checksum mismatch');
});
test('reject checksum paths escaping the asset folder', async () => {
  await rejects(state => { state.files['SHA256SUMS.txt'] = digest + '  ../' + archive; }, 'checksum manifest');
});
test('reject multiple checksum entries', async () => {
  await rejects(state => { state.files['SHA256SUMS.txt'] += digest + '  other.zip\n'; }, 'checksum manifest');
});
for (const field of ['version', 'commit', 'environment']) {
  test('reject mismatched provenance ' + field, async () => {
    await rejects(state => {
      const info = JSON.parse(state.files['build-info.json']);
      info[field] = 'incorrect';
      state.files['build-info.json'] = JSON.stringify(info);
    }, 'provenance mismatch');
  });
}
test('reject manifest version mismatch', async () => {
  await rejects(state => { state.manifest.version = '1.0.8'; }, 'package version or format mismatch');
});
test('reject non-MV3 package', async () => {
  await rejects(state => { state.manifest.manifest_version = 2; }, 'package version or format mismatch');
});
test('reject moved or stale tag', async () => {
  await rejects(state => { state.routes['/git/ref/tags/v1.0.9'].data.object.sha = tagSha; }, 'built commit');
});
test('reject missing tag instead of creating one automatically', async () => {
  await rejects(state => { state.routes['/git/ref/tags/v1.0.9'] = { status: 404 }; }, 'HTTP 404');
});
test('bound annotated tag traversal', async () => {
  await rejects(state => {
    state.routes['/git/ref/tags/v1.0.9'].data.object = { type: 'tag', sha: tagSha };
    state.routes['/git/tags/' + tagSha] = { status: 200, data: { object: { type: 'tag', sha: tagSha } } };
  }, 'built commit');
});

test('workflow preserves create-only publishing and least-privilege job separation', async () => {
  const publish = workflow.match(/\n  publish:([\s\S]*?)\n  edge-store:/)?.[1];
  assert.ok(publish);
  assert.doesNotMatch(publish, /--clobber|gh release (?:upload|edit|delete)/);
  const executable = publish.split(/\r?\n/).filter(line => !/^\s*#/.test(line)).join('\n');
  assert.doesNotMatch(executable, /actions\/checkout|npm (?:ci|install)|run: npm/);
  assert.match(publish, /gh release create "\$TAG"/);
  assert.match(publish, /--verify-tag --latest="\$PUBLISH_LATEST"/);
  assert.match(publish, /TAG: \$\{\{ steps\.guard\.outputs\.tag \}\}/);
  assert.match(workflow, /group: extension-release-publish\s+cancel-in-progress: false/);
  assert.match(workflow, /needs: \[build, publish\]/);
  assert.match(workflow, /run: npm test/);
  const ci = await readFile(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
  assert.match(ci, /run: npm test/);
});
