// No dependencies. Credentials are provided only to this process by Actions Secrets.
import fs from 'node:fs/promises';

const base = 'https://api.addons.microsoftedge.microsoft.com';
const product = process.env.EDGE_PRODUCT_ID;
const client = process.env.EDGE_CLIENT_ID?.trim();
const key = process.env.EDGE_API_KEY?.trim();
const tag = process.env.EDGE_RELEASE_TAG;
if (!/^[0-9a-f-]{36}$/i.test(product ?? '') || !client || !key ||
    !/^v\d+\.\d+\.\d+(?:\.\d+)?$/.test(tag ?? '')) {
  throw new Error('Missing or invalid Edge publishing configuration');
}
const prefix = '/v1/products/' + product + '/submissions';
const headers = { Authorization: 'ApiKey ' + key, 'X-ClientID': client };
const summary = async (message) => {
  console.log(message);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, message + '\n');
  }
};
async function request(path, method = 'GET', body, contentType) {
  // Never follow redirects with credentials, log response bodies or retry writes.
  const response = await fetch(base + path, {
    method, redirect: 'error',
    headers: { ...headers, ...(contentType ? { 'Content-Type': contentType } : {}) },
    body, signal: AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error('Edge API ' + method + ' returned HTTP ' + response.status);
  return response;
}
function operationPath(response, kind) {
  const location = response.headers.get('location');
  if (!location) throw new Error('Edge API did not return an operation location');
  const root = prefix + (kind === 'upload' ? '/draft/package' : '');
  if (/^[0-9a-f-]{36}$/i.test(location)) return root + '/operations/' + location;
  const url = new URL(location, base);
  if (url.origin !== base || !url.pathname.startsWith(root + '/operations/') || url.search) {
    throw new Error('Unexpected Edge operation location');
  }
  return url.pathname;
}
async function poll(path, kind) {
  for (let attempt = 0; attempt < 40; attempt++) {
    const result = await (await request(path)).json();
    const status = result.status;
    if (typeof status !== 'string') throw new Error('Missing operation status');
    const normalized = status.toLowerCase();
    // Print only a constrained status, never arbitrary server response text.
    console.log(kind + ': ' + (/^[a-z ]{1,40}$/i.test(status) ? status : 'unknown'));
    if (normalized === 'succeeded') return true;
    if (['failed', 'canceled', 'cancelled'].includes(normalized)) {
      throw new Error('Edge ' + kind + ' operation failed; inspect Partner Center');
    }
    await new Promise(resolve => setTimeout(resolve, 15000));
  }
  return false;
}
try {
  const zip = await fs.readFile('release-assets/tab-project-' + tag + '-extension.zip');
  const upload = await request(prefix + '/draft/package', 'POST', zip, 'application/zip');
  if (upload.status !== 202) throw new Error('Unexpected upload response status');
  const uploaded = await poll(operationPath(upload, 'upload'), 'upload');
  if (!uploaded) throw new Error('Upload still pending; inspect Partner Center before retrying');
  await summary('Package upload succeeded for ' + tag + '.');
  const submission = await request(prefix, 'POST',
    JSON.stringify({ notes: 'Update to tab-project ' + tag + '. Release details: https://github.com/kongzhuww/tab-project/releases/tag/' + tag }),
    'application/json');
  if (submission.status !== 202) throw new Error('Unexpected submission response status');
  await summary('Edge accepted the submission request. This is not certification approval.');
  const done = await poll(operationPath(submission, 'publish'), 'submission');
  await summary(done
    ? 'Submission operation succeeded. Check Partner Center for certification and public availability.'
    : 'Submission is still processing. Do not automatically resubmit; check Partner Center.');
} catch (error) {
  // Native fetch exceptions can include request details; do not dump those.
  const message = error instanceof Error ? error.message : '';
  const safe = /^(Edge API |Edge upload |Edge submission |Upload still |Unexpected |Missing )/.test(message);
  console.error(safe ? message : 'Edge publishing failed; inspect configuration and Partner Center.');
  process.exitCode = 1;
}
